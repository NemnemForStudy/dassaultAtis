/* global require, widget */

define('DS/MailWdg/Mail', [
    // UWA
    'UWA/Core',
    'UWA/Class',
    'UWA/Utils',
    'UWA/Element',

    // Tag navigator
    'DS/TagNavigatorProxy/TagNavigatorProxy',

    // W3DXComponents
    'DS/W3DXComponents/Skeleton',
    'DS/W3DXComponents/Views/Layout/ListView',
    'DS/W3DXComponents/Views/Layout/GridScrollView',
    'DS/W3DXComponents/Views/EmptyView',
    'DS/W3DXComponents/Views/Item/TileView',
    'DS/W3DXComponents/Views/Item/ThumbnailView',

    // Mail Components
    'DS/MailWdg/Models/Message',
    'DS/MailWdg/Collections/Messages',
    'DS/MailWdg/Collections/Attachments',
    'DS/MailWdg/Collections/Contacts',
    'DS/MailWdg/Collections/Providers',
    'DS/MailWdg/Views/MessageFrame',
    'DS/MailWdg/Views/Provider',

    // Webapps
    'DS/WebappsUtils/WebappsUtils',

    // UIKit
    'DS/UIKIT/Alert',

    // Mail Auth
    'DS/MailWdg/PopupMailAuth',

    // i18n
    'i18n!MailWdg/assets/nls/Mail',

    'css!MailWdg/Mail'
], function (
    UWA,
    Class,
    Utils,
    Element,

    TagNavProxy,

    Skeleton,
    ListView,
    GridScrollView,
    EmptyView,
    TileView,
    ThumbnailView,

    MessageModel,
    MessageCollection,
    AttachmentCollection,
    ContactCollection,
    ProviderCollection,
    MessageFrameView,
    ProviderView,

    WebappsUtils,

    Alert,

    PopupMailAuth,

    Nls,
) {
    'use strict';

    // Default providers
    var _displayedProviders = ['yahoo', 'outlook', 'gmail'],

        // To enable Oauth2
        _oauth2EnabledProviders = ['gmail'],

        // Oauth2 provider details, which contains provider and scope.
        _oauth2ProvidersDetails = null,

        // Active Outh2 provider
        _activeOauth2Provider = null,

        _appPasswordProvider = 'yahoo',

        // Offset at fetching time.
        _offset = 0,

        // Amount of emails to get for each call to the mail service.
        _moreStep = 5,

        // Reference to the tagger proxy.
        _taggerProxy = null,

        // current matching subjects by tag refinement (tag nav search/filter).
        _taggerQuery = null, // Array

        // Current search by string (top bar search/filter).
        _stringQuery = null, // String

        // Widget's elements.
        _elements = {},

        // Reference to the skeleton instance.
        _skeleton = null,

        // Reference to the skeleton's renderers.
        _renderers,

        // Reference to the Alert instance.
        _alert = null;

    /**
     *
     */
    function onLoad () {
        var providers = widget.getValue('displayedProviders'), // Get the preconfigured providers
            server = widget.getValue('server'),
            login = widget.getValue('login'),
            password = widget.getValue('password');

        // Init the number of emails
        widget.setCounter(0, 'init');

        // Init tagger proxy
        initTagger();

        // Init title
        updateTitle();

        // Main Container
        _elements.container = new Element('div', {
            'class': 'mail' + (widget.getBool('profile') ? '' : ' no-thumbnail')
        }).inject(widget.body.empty());

        if (providers) {
            _displayedProviders = providers;
        }

        _activeOauth2Provider = _oauth2EnabledProviders.find(function (provider) { return server.includes(provider); });

        if (!server && !_activeOauth2Provider) {
            displayProviders();
            return;
        }

        if (!_activeOauth2Provider && (!login || !password)) {
            notify({
                message: Nls.accountNotConfError,
                type: 'error'
            });
        }

        /*
         * Display disconnect in menu only and to hide login and password input boxes
         * in edit preferences when oauth2 provider is enabled
         * if in future all providers support Oauth2, there is no need of showing all prefernces except title
         */
        if (server && _activeOauth2Provider) {
            updateOauth2Preferences();
            displayDisconnect();
        }

        // get the messages
        displayMessages();

        // TODO: Find a better way than using widget metas...
        // Widget has to set that meta to tell to the environment
        // that the widget is ready to react to the search event.
        widget.setMetas({
            _readyForSearchEvent: true
        });
    }

    /**
     * To get active provider outh2 all details from provider configurations
     */
    function getActiveOuth2ProviderDetails (activeProvider) {
        _oauth2ProvidersDetails =  !_oauth2ProvidersDetails && activeProvider
            ? ProviderCollection.getProviderConfigurations(_oauth2EnabledProviders)
            : _oauth2ProvidersDetails;

        return activeProvider && _oauth2ProvidersDetails.find(function (a) {
            return activeProvider.includes(a.id);
        });
    }

    /**
     *
     */
    function notify (options) {
        if (options.closable) {
            _alert.destroy();
            _alert = null;
        }

        // If no alert container exist then create it
        if (!_alert || !_alert.elements.container.isInjected()) {
            _alert = new Alert({
                closable: options.closable || true,
                visible: true
            });

            _alert.inject(widget.body, 'top');
        // If it exists then remove old messages
        } else {
            _alert.getMessages().forEach(function (message) {
                _alert.remove(message);
            });
        }

        _alert.add({
            message: [{
                tag: 'span',
                text: options.message + ' '
            }, {
                tag: 'span',
                text: Nls.providersList,
                styles: {
                    'text-decoration': 'underline',
                    'cursor': 'pointer'
                },
                events: {
                    click: function () {
                        widget.setValue('server', '');
                        widget.setValue('title', '');

                        // If error accoure after clicking on oauth2 provider(gmail) then update preferences
                        if (_activeOauth2Provider) {
                            updateNonOauth2Preferences();
                        }

                        onLoad();
                    }
                }
            }],
            className: options.type || options.className
        });
    }

    /**
     * Updates the title
     */
    function updateTitle () {
        var existingTitle = widget.getValue('title');
        if (existingTitle !== '') {
            widget.setTitle(existingTitle);
        } else {
            var widgetTitle = Nls.inboxTitle,
                login = widget.getValue('login') || '',
                server = widget.getValue('server') || '';

            // Set the login@server in the title if a login is found
            if (UWA.is(login, 'string') && login.length > 0) {
                widgetTitle += login;
                widgetTitle += (server && login.indexOf('@') !== -1 ? '' : '@' + server);
            // Else empty title
            } else {
                widgetTitle = '';
            }

            widget.setTitle(widgetTitle);
        }
    }

    /**
     *
     */
    function displayProviders () {
        var container = _elements.container,
            configurations = ProviderCollection.getProviderConfigurations(_displayedProviders);

        // Clean the widget body and create the provider list
        container.empty();

        // Add the "other" provider.
        configurations.push({
            'id': '_other_',
            'name': Nls.other,
            'imap': {
                'server': '',
                'ssl': 'ssl'
            }
        });

        // Build the ListView with a specific ItemView.
        _elements.providerList = new ListView({
            collection: new ProviderCollection(configurations, {
                preconfigurations: _displayedProviders
            }),
            itemView: ProviderView,
            useInfiniteScroll: false,
            usePullToRefresh: false,
            itemViewOptions: {
                events: {
                    onItemViewClick: function (itemView) {
                        var model = itemView.model,
                            imap = model && model.get('imap'),
                            pop = model && model.get('pop'),
                            name = model && model.get('name'),
                            auth =  model && model.get('auth'),
                            server, ssl;

                        if (imap && imap.server) {
                            server = imap.server;
                            ssl = imap.ssl === 'ssl';
                        } else if (pop && pop.server) {
                            server = pop.server;
                            ssl = pop.ssl === 'ssl';
                        }

                        widget.setValue('title', name === Nls.other ? '' : name);
                        widget.setValue('server', server);
                        widget.setValue('ssl', ssl);
                        widget.setValue('login', '');
                        widget.setValue('password', '');

                        if (auth) {
                            var options = model._attributes;
                            options.success = onLoad;
                            PopupMailAuth.popupAuth(options);
                        } else {
                            updateNonOauth2Preferences();
                            widget.dispatchEvent('onEdit');
                        }
                    }
                }
            }
        });

        _elements.providerList.render().inject(container);
    }

    /**
     * Display the messages
     */
    function displayMessages () {
        var container = _elements.container;

        if (_skeleton) {
            _skeleton.destroy();
            _skeleton = null;
        }

        _skeleton = new Skeleton(_renderers, {
            rendererOptions: {
                swipe: false
            }
        });

        container.empty();
        _skeleton.render().inject(container);
    }

    // Display disconnect item in menu
    function displayDisconnect () {
        widget.setMetas({
            _isCustomItemToDisplay: true,
            _customItem: {
                id: 'disconnect',
                name: 'disconnect',
                text: Nls.disconnectText,
                icon: 'disconnect-icon fonticon fonticon-logout',
                event: 'onDisconnect'
            }
        });
    }

    // Display linkes in edit prefernces panel with metas, temporary workaround fix
    function displayLinksInEditPreferences () {
        widget.setMetas({
            _isLinksToDisplay: true,
            _linksDetails: {
                target: 'input[name="password"]',
                delimiter: '\xa0|\xa0',
                links: [
                    {
                        name: 'app_token',
                        text: Nls.generateAppToken,
                        href: 'https://login.yahoo.com/?done=https%3A%2F%2Flogin.yahoo.com%2Faccount%2Fsecurity%3F.scrumb%3D0&src=mc'
                    },
                    {
                        name: 'app_token_help',
                        text: Nls.appTokenHelp,
                        href: 'https://help.yahoo.com/kb/generate-third-party-passwords-sln15241.html'
                    }
                ]
            }
        });
    }

    // Remove disconnect item from menu
    function removeDisconnect () {
        widget.setMetas({
            _isCustomItemToDisplay: false,
            _customItem: {
                id: 'disconnect',
                name: 'disconnect'
            }
        });
    }

    /**
     *
     */
    function fetchMore (scrollview) {
        var collection = scrollview.view.collection,
            server = widget.getValue('server'),
            login = widget.getValue('login'),
            password = widget.getValue('password');

        /**
         * @private
         */
        function onComplete (collection, resp) {
            if (resp.error || resp.errorMessage) {
                notify({ className: 'warning', message: getErrorMessage(resp.error || resp.errorMessage) });
            } else {
                _taggerProxy.setSubjectsTags(collection.tags);
                scrollview.endLoading();
                if (UWA.is(resp.items, 'array') && resp.items.length === 0) {
                    scrollview.useInfiniteScroll(false);
                }
            }
        }

        /**
         * @private
         */
        function onFailure (collection, resp) {
            if (_activeOauth2Provider) {
                removeDisconnect();
            }

            if (resp) {
                notify({ className: 'warning', message: getErrorMessage(resp.error || resp.errorMessage) });
            }
            scrollview.endLoading();
            scrollview.useInfiniteScroll(false);
        }

        /**
         * @private
         */
        function onTimeout () {
            notify({ className: 'warning', message: Nls.serverNotRespond });
            scrollview.endLoading();
            scrollview.useInfiniteScroll(false);
        }

        if ((_activeOauth2Provider) || (server && login && password)) {
            collection.fetch(getFetchOptions({
                remove: false,
                // FIXME: set merge false to avoid merging messages with the same ID (yes, it may happen...).
                // Messages with same ID also trigger an infinite scroll issue because the IDs should be unique in a collection.
                merge: false,
                offset: collection.length,
                onComplete: onComplete,
                onFailure: onFailure,
                onTimeout: onTimeout
            }));
        } else {
            scrollview.useInfiniteScroll(false);
        }

    }

    /**
     *
     */
    function getFetchOptions (options) {
        var opts = options || {},
            params,
            serverPref = widget.getValue('server'),
            protocolPref = widget.getValue('protocol'),
            messagesUrl = UWA.hosts.exposition + '/proxy/mail/messages/',
            provider;

        params = {
            host: serverPref,
            ssl: widget.getBool('ssl'),
            password: widget.getValue('password'),
            protocol: protocolPref,
            login: widget.getValue('login')
        };

        if (_activeOauth2Provider) {
            var oauth2ProviderAdapterOptions = getActiveOuth2ProviderDetails(_activeOauth2Provider)
                .auth.options.adapterOptions;

            provider = oauth2ProviderAdapterOptions && oauth2ProviderAdapterOptions.provider;
        }

        return UWA.extend({
            timeout: 20000,
            method: 'post', // avoid letting hashed credentials transit in plain text
            type: 'json',
            url: _activeOauth2Provider ? (messagesUrl + provider) : messagesUrl,
            data: {
                hash: Utils.base64Encode(JSON.stringify(params)),
                count: UWA.is(opts.count) ? opts.count : _moreStep, // Fallback to widget value
                offset: UWA.is(opts.offset) ? opts.offset : _offset
            }
        }, options);
    }

    /**
     *
     */
    function refreshMessages (scrollview) {

        var collection = scrollview.view.collection,
            server = widget.getValue('server'),
            login = widget.getValue('login'),
            password = widget.getValue('password');

        /**
         * @private
         */
        function onComplete (collection, resp) {

            if (resp.error || resp.errorMessage) {
                notify({ className: 'warning', message: getErrorMessage(resp.error || resp.errorMessage) });
            } else {
                _taggerProxy.setSubjectsTags(collection.tags);
                scrollview.endLoading();
            }

        }

        /**
         * @private
         */
        function onFailure (collection, resp) {
            if (resp) {
                notify({ className: 'warning', message: getErrorMessage(resp.error || resp.errorMessage) });
            }
            scrollview.usePullToRefresh(false);
        }

        /**
         * @private
         */
        function onTimeout () {
            notify({ className: 'warning', message: Nls.serverNotRespond });
            scrollview.usePullToRefresh(false);
        }


        if (server && login && password) {
            collection.fetch(getFetchOptions({
                offset: 0,
                reset: true,
                // FIXME: set merge false to avoid merging messages with the same ID (yes, it may happen...).
                // Messages with same ID also trigger an infinite scroll issue because the IDs should be unique in a collection.
                merge: false,
                onComplete: onComplete,
                onFailure: onFailure,
                onTimeout: onTimeout
            }));
        } else {
            scrollview.usePullToRefresh(false);
        }

    }

    /**
     *
     */
    function initTagger () {
        // Clean former tags and destroy the proxy.
        _taggerProxy && _taggerProxy.die();

        // Create a new proxy.
        _taggerProxy = TagNavProxy.createProxy({
            widgetId: widget.id,
            filteringMode: 'WithFilteringServices',
            proxyDisplayName: 'Mail-' + widget.id,
            events: {
                addFilterSubjectsListener: onFilter
            }
        });
    }

    /**
     *
     */
    function getErrorMessage (error) {
        var message = ''; // Add default message

        if (error && error.test('.*server.*unreachable.*', 'i')) {
            message = Nls.serverUnavailable;
        } else if (error && error.test('.*connection.*refused.*', 'i')) {
            message = Nls.serverRefuseConnection;
        } else if (error && error.test('.*wrong.*username.*password.*', 'i')) {
            message = Nls.checkLoginPassword;
        } else {
            message = Nls.errorOccurred;
        }

        UWA.log(error);

        return message;
    }

    /**
     *
     */
    function replyMessage (action, view) {
        var mailto = action === 'all' ? view.model.buildReplyAllString() : view.model.buildReplyString();

        if (mailto) {
            window.open('mailto:' + mailto, '_parent');
        }
    }

    /**
     * Filter the messages from a search by string and/or by tag refinement.
     * @param {String|Object} query
     */
    function onFilter (query) {
        var listView, collectionView, scrollView, collection, tagFilters, tagMatches, stringMatches;

        if (_skeleton && _taggerProxy) {

            // Get references on the views.
            listView = _skeleton.getViewAt(0);
            scrollView = listView.scrollView;
            collectionView = listView.nestedView;
            collection = collectionView.collection;
            tagFilters = _taggerProxy.getCurrentFilter().allfilters;
            tagMatches = []; // contains several MessageModel's ID.
            stringMatches = []; // contains several MessageModel.

            // Temporary disable the IFS and PTR.
            scrollView.useInfiniteScroll(false);
            scrollView.usePullToRefresh(false);

            // Save the string query
            if (UWA.is(query, 'object') && UWA.Object.keys(tagFilters).length > 0) { // search by tag refinement
                _taggerQuery = query.filteredSubjectList;
            } else if (UWA.is(query, 'object') && UWA.Object.keys(tagFilters).length === 0) { // reset search by tag refinement
                _taggerQuery = null;
            } else { // search by string and reset search by string (onSearch and onResetSearch)
                _stringQuery = query;
            }

            // Compute matches by string query.
            if (_stringQuery && _stringQuery.length > 0) {

                // Adding matching models.
                stringMatches = stringMatches.concat(collection.filter(function (message) {
                    return message.get('subject').test(_stringQuery, 'gi') ||     // search in the subject
                        message.get('author').test(_stringQuery, 'gi');         // search in the sender name
                }));
            // No string query
            } else {
                stringMatches = null;
            }

            // Compute matches by tag refinement query.
            if (_taggerQuery) {

                // Adding matching models.
                tagMatches = tagMatches.concat(_taggerQuery);

            // No tag refinement query
            } else {
                tagMatches = null;
            }

            // Apply all the filters (by tags and by string).
            if (stringMatches || tagMatches) {
                collectionView.filter(function (model) {
                    // An item is displayed if it match the 2 ways of filtering (i.e. by tag and  by string)).
                    var tagMatch = tagMatches ? tagMatches.indexOf(model.id) !== -1 : true;
                    var stringMatch = stringMatches ? stringMatches.indexOf(model) !== -1 : true;
                    return tagMatch && stringMatch;
                });
            // Else reset all the filters.
            } else {
                collectionView.filter(null);
                // Re-enable the IFS and PTR.
                scrollView.useInfiniteScroll(true);
                scrollView.usePullToRefresh(true);
            }

            // Finally send tags for items matching the string query only when the initial caller is the search by string handler.
            // This is to avoid looping on this method (sending tags triggers a filter, then tags are resent and so on...).
            if (!UWA.is(query, 'object')) {
                if (stringMatches) {
                    var tags = {};
                    stringMatches.forEach(function (message) {
                        tags[message.id] = collection.tags[message.id];
                    });
                    _taggerProxy.setSubjectsTags(tags);
                } else {
                    _taggerProxy.setSubjectsTags(collection.tags);
                }
            }

        }

    }

    function onDisconnect () {
        if (_activeOauth2Provider) {
            var oauth2ActiveProviderAuth = getActiveOuth2ProviderDetails(_activeOauth2Provider)
                .auth;
            oauth2ActiveProviderAuth && oauth2ActiveProviderAuth.clearIdentity(displayProviders);
            widget.setValue('server', '');
            widget.setValue('title', '');
            updateNonOauth2Preferences();
            removeDisconnect();
        }
    }

    /*
     * Update edit preferences to hide login and password input boxes,
     * Oauth2 does not need user login and password inputs.
     * if in future all providers support Oauth2, there is no need of showing all prefernces except title.
     */
    function updateOauth2Preferences () {
        var loginPreference = widget.getPreference('login'),
            passwordPreference = widget.getPreference('password');

        loginPreference.type = 'hidden';
        passwordPreference.type = 'hidden';
        widget.addPreference(loginPreference);
        widget.addPreference(passwordPreference);
    }

    /*
     * Update edit preferences to show login and password input boxes,
     * for non Oauth2 providers (yahoo, outlook), need user login and password inputs, also updated label
     * text for provider(yahoo) which require app password.
     */
    function updateNonOauth2Preferences () {
        var loginPreference = widget.getPreference('login'),
            passwordPreference = widget.getPreference('password'),
            server = widget.getValue('server');

        loginPreference.type = 'text';
        passwordPreference.type = 'password';

        if (server.includes(_appPasswordProvider)) {
            passwordPreference.label = Nls.appTokenLabel_html;
            displayLinksInEditPreferences();
        } else {
            // Set to false so, it should not display links
            widget.setMetas({
                _isLinksToDisplay: false,
            });

            passwordPreference.label = Nls.passwordLabel_html;
        }

        widget.addPreference(loginPreference);
        widget.addPreference(passwordPreference);
    }

    // Skeleton Renderers
    // ------------------
    _renderers = {
        messages: {
            collection: MessageCollection, // TODO: Check if attribute mapping is available,
            fetchMode: 'never',
            idKey: 'encodedId',
            view: ListView,
            viewOptions: {
                itemViewOptions: {
                    mapping: {
                        title: 'subject',
                        subtitle: 'author',
                        content: 'summary',
                        icon: function  () {
                            // FIXME: The skeleton build a fake model and trigger this handler (it should not). So we need to check the model type before.
                            if (this.model instanceof MessageModel) {
                                return this.model.getAttachments().length > 0 ?
                                    WebappsUtils.getWebappsAssetUrl('MailWdg', 'images') + '/attach.png' : undefined;
                            }
                        },
                        image: function () {
                            return widget.getBool('profile') ? this.model.get('image') : undefined;
                        }
                    },
                    icon: 'mail',
                    title: Nls.emptyInbox
                },
                emptyView: EmptyView,
                events: {
                    onInfiniteScroll: function () {
                        fetchMore.apply(null, arguments);
                    },
                    onPullToRefresh: function () {
                        refreshMessages.apply(null, arguments);
                    },
                    onItemViewSelect: function (collectionView, itemView) {
                        _taggerProxy.focusOnSubjects([itemView.model.id]);
                    },
                    onItemViewUnSelect: function () {
                        _taggerProxy.unfocus();
                    }
                }
            },

            idCardOptions: {
                attributesMapping: {
                    title: 'subject',
                    date: function () {
                        return new Date(this.get('date')).toLocaleDateString(widget.lang, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        });
                    },
                    ownerName: function () {
                        var from = this.get('people').from;
                        if (UWA.is(from, 'array') && from.length > 0) {
                            from = from[0];
                            return from.name ? from.name : from.address;
                        }
                    }
                },
                actions: [{
                    text: Nls.reply,
                    icon: 'reply',
                    handler: function () {
                        Array.prototype.unshift.call(arguments, 'single');
                        replyMessage.apply(null, arguments);
                    }
                }, {
                    text: Nls.replyAll,
                    icon: 'reply-all',
                    handler: function () {
                        Array.prototype.unshift.call(arguments, 'all');
                        replyMessage.apply(null, arguments);
                    }
                }],
                facetsLikeTabs: true,
                facets: function () {

                    var facets = [],
                        attachments;

                    if (this instanceof MessageModel) {

                        attachments = this.getAttachments();

                        facets.push({
                            text: Nls.messageFacet,
                            icon: 'mail',
                            handler: Skeleton.getRendererHandler(MessageFrameView, {
                                viewOptions: {
                                    namespace: widget.environment instanceof UWA.Environments.Frame ? '' : ('wi-' + widget.id)
                                }
                            })
                        });

                        facets.push({
                            text: Nls.contactsFacet,
                            icon: 'users',
                            handler: Skeleton.getRendererHandler('contacts', { key: 'message' })
                        });

                        if (attachments.length > 0) {
                            facets.push({
                                text: Nls.attachmentsFacet,
                                icon: 'attach',
                                getter: function () { return attachments.length; },
                                handler: Skeleton.getRendererHandler('attachments', { key: 'message' })
                            });
                        }

                    }

                    return facets;
                }
            }
        },
        contacts: {
            collection: ContactCollection,
            fetchMode: 'once',
            view: GridScrollView,
            viewOptions: {
                useInfiniteScroll: false,
                usePullToRefresh: false,
                className: 'message-contacts',
                itemView: TileView,
                itemViewOptions: {
                    className: 'contact',
                    mapping: {
                        title: function () {
                            return this.model.get('name')  || this.model.get('address');
                        },
                        subtitle: 'address',
                        content: function () {
                            var role = this.model.get('role');

                            switch (role) {
                                case 'from':
                                    return Nls.fromRole;
                                case 'to':
                                    return Nls.toRole;
                                case 'cc':
                                    return Nls.ccRole;
                            }
                        },
                        image: function () {
                            return widget.getBool('profile') ? this.model.getImageUrl() : undefined;
                        },
                        icon: function () {
                            return this.model.getIconUrl();
                        }
                    }
                }
            }
        },
        attachments: {
            collection: AttachmentCollection,
            fetchMode: 'once',
            view: GridScrollView,
            viewOptions: {
                useInfiniteScroll: false,
                usePullToRefresh: false,
                itemView: ThumbnailView,
                className: 'message-attachments',
                itemViewOptions: {
                    className: 'attachment',
                    mapping: {
                        title: 'filename',
                        subtitle: 'type',
                        content: function () {
                            /* FIXME: find a proper implem */
                            return (
                                '<a href="' + this.model.url() + '" class="attachment-link">' +
                                    '<span class="center-block fonticon fonticon-download"></span>' +
                                    '<span class="center-block attachment-size">' + this.model.getSize() + '</span>' +
                                '</a>'
                            );
                        },
                        image: function () {
                            return WebappsUtils.getWebappsAssetUrl('MailWdg', 'images/') + this.model.getIcon() + '.png';
                        }
                    }
                }
            }
        }
    }; // End renderers

    var Mail = Class.extend({

        options: {},

        widget: null,

        isReadOnly: false,

        init: function (widget) {
            // Init variables
            var that = this,
                isReadOnly = widget.readOnly;

            that.options = { isReadOnly: isReadOnly };
            that.isReadOnly = isReadOnly;
            that.widget = widget;

            that.initWidgetEvents();
        },

        initWidgetEvents: function () {
            var that = this,
                widget =  that.widget;

            widget.addEvents({
                onLoad: onLoad,
                onRefresh: onLoad,
                onSearch: onFilter,
                onResetSearch: onFilter,
                onDisconnect: onDisconnect
            });
        }
    });

    return Mail;
});
