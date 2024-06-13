
/* global define */

define('DS/MediaLinksWdg/MediaLinks', [
    // UWA
    'UWA/Core',
    'UWA/String',
    'UWA/Class/View',

    // WebappsUtils
    'DS/WebappsUtils/WebappsUtils',

    // WP
    'DS/UWPClientControls/Utils',

    // UIKIT
    'DS/UIKIT/Alert',

    // Dashboard
    'DS/Dashboard/Utils',

    // MediaLinks
    'DS/MediaLinksWdg/Controllers/Controller',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks',

    // Css
    'css!DS/MediaLinksWdg/MediaLinks'
],
function (
    // UWA
    UWA,
    UWAString,
    View,

    // WebappsUtils
    WebappsUtils,

    // WP
    WUtils,

    // UIKIT
    UIKITAlert,

    // Dashboard
    DUtils,

    // MediaLinks
    Controller
) {
    'use strict';

    var MediaLinks = View.extend({

        tagName: 'div',

        className: 'medialinks',

        /**
         * @property {UWA/Widget} Widget instance.
         */
        widget: null,

        widgetHelper: null,

        /**
         * @property {Boolean} Read only.
         */
        readOnly: false,

        controller: null,

        /**
         * Init the MediaLinks Widget.
         * @param {Object}     options          - Options.
         * @param {UWA/Widget} options.widget   - Widget instance.
         */
        setup: function (options) {
            var that = this;

            that.options = options;

            that.widget = options.widget;
            that.readOnly = that.widget.readOnly;

            that.initWidgetHelper()
                .initController()
                .initWidgetEvents();
        },

        initController: function () {
            var that = this;

            that.controller = new Controller({
                widgetHelper: that.widgetHelper
            });

            return that;
        },

        initWidgetHelper: function () {
            var that = this,
                widget = that.widget;

            that.widgetHelper = {

                replace: that.replace,

                formatUrl: DUtils.formatUrl,

                showAlert: that.showAlert.bind(that),

                removeAlert: that.removeAlert.bind(that),

                getBody: function () {
                    return that.container;
                },
                getLang: function () {
                    return widget.lang || 'en';
                },
                getValue: function () {
                    return widget.getValue.apply(widget, arguments);
                },
                setValue: function () {
                    return widget.setValue.apply(widget, arguments);
                },
                setValues: function () {
                    return widget.setValues.apply(widget, arguments);
                },
                setLastLinkDisplayed: function (id) {
                    return widget.setValue('lastLinkDisplayed', id || '');
                },
                deleteValue: function () {
                    return widget.deleteValue.apply(widget, arguments);
                },
                getLinkIds: function () {
                    return widget.getValue('linkIds') || [];
                },
                getLayout: function () {
                    return widget.getValue('layout') || 'Single';
                },
                getLink: function (id) {
                    return widget.getValue('link_' + id) || {};
                },
                getLastLinkDisplayed: function () {
                    return widget.getValue('lastLinkDisplayed') || '';
                },
                getAssetsUrl: function () {
                    return WebappsUtils.getWebappsAssetUrl('MediaLinksWdg', 'images');
                },
                addLinkId: function (id) {
                    return widget.setValue('linkIds', this.getLinkIds().concat([id]));
                },
                isReadOnly: function () {
                    return that.readOnly;
                }
            };

            return that;
        },

        /**
         * Init the widget events.
         */
        initWidgetEvents: function () {
            var that = this,
                widget =  that.widget;

            // Add widget events
            widget.addEvents({
                onLoad: that.onLoad.bind(that),
                onRefresh: that.onRefresh.bind(that),
                onDestroy: that.onDestroy.bind(that),
                onViewChange: that.onViewChange.bind(that),
                onResize: that.onResize.bind(that),
                onSortChange: that.onRefresh.bind(that)

                // onSearch: that.Controller.onSearch.bind(that.Controller),
                // onResetSearch: that.Controller.onResetSearch.bind(that.Controller),
                // onContextChange: that.Controller.onContextChange.bind(that.Controller),
            });

            return that;
        },

        /**
         * @param {Object} options                - Options.
         * @param {String} options.msg            - Message.
         * @param {String} [options.type='error'] - Type of the message.
         */
        showAlert: function (options) {
            var alert,
                that = this;

            options = options || {};

            that.removeAlert();

            that.alert = alert = new UIKITAlert({
                className: '',
                closable: true,
                visible: true,
                autoHide: false
            }).inject(that.container, 'top');

            alert.add({
                message: UWAString.stripTags(options.msg) || 'Unknown error.',
                className: options.type || 'error'
            });

            return that;
        },

        removeAlert: function () {
            var that = this;

            that.alert && that.alert.destroy();
            that.alert = null;

            return that;
        },

        updateTitle: function (newTitle) {
            var title,
                that = this,
                widget = that.widget;

            if (newTitle) {
                widget.setValue('title', newTitle);
                title = newTitle;
            } else {
                title = widget.getValue('title');
            }

            if (title) {
                widget.setTitle(title);
            } else {
                that.clearTitle();
            }

            return that;
        },

        clearTitle: function () {
            var widget = this.widget;

            widget.setValue('title', '');
            widget.setTitle('');

            return this;
        },

        render: function () {
            var that = this;

            that.widget.body.empty();

            if (!WUtils.hasTouch()) {
                that.widget.body.classList.remove('touch');
            }

            return that;
        },

        /**
         * Function taken from ds/i18n.
         * Replace words from 'message' by the corresponding one in values
         * @param  {String} message - The message in which the values are replaced.
         * @param  {Object} values  - The values use as replacements.
         * @return {String} The message string with the replacements.
         */
        replace: function (message, values) {
            return message.replace(/\{([\w\-]+)\}/g,
                function (m, name) {
                    return values[name] !== undefined ? values[name] : '';
                }
            );
        },

        /**
         * On widget load.
         */
        onLoad: function () {
            var that = this;

            that.removeAlert()
                .updateTitle()
                .render()
                .inject(that.widget.body);

            that.controller.onLoad();
        },

        /**
         * On widget refresh.
         */
        onRefresh: function () {
            this.removeAlert();
            this.controller.onDestroy();
            this.initController();
            this.onLoad();
        },

        onResize: WUtils.debounce(function () {
            this.resize();
        }, 100),

        resize: function () {
            var that = this;
            that.controller.onResize();
            return that;
        },

        onViewChange: function () {
            this.onResize();
        },

        /**
         * On widget destroy.
         */
        onDestroy: function () {
            var that = this;

            that.removeAlert();

            that.widget = null;
            that.widgetHelper = null;

            that.controller && that.controller.onDestroy();
            that.controller = null;

            that._parent.apply(that, arguments);
        }
    });

    return MediaLinks;
});
