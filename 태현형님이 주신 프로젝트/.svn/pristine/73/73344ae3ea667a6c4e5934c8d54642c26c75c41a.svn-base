/* global widget, define */

define('DS/decDashboardCommon/decDashboardEmbeded3DSpace',
    [
        // UWA
        'UWA/Core',
        'UWA/Utils',
        'UWA/Event',
        'UWA/Promise',
        
		'DS/PlatformAPI/PlatformAPI',
        'DS/UIKIT/Input/Text',
        'DS/UIKIT/Input/Button',
        'DS/UIKIT/Alert',

        'DS/Bookmarklet/Notification',

        'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',

        'DS/WAFData/WAFData',

        'i18n!DS/DelmiaWorksReader/assets/nls/delmiaWorksReader',
        
        'css!WebPageWdg/WebPage'
    ],
    function (
        UWA,
        Utils,
        Event,
        Promise,

		PlatformAPI,
        UIKitText,
        UIKitButton,
        UIKitAlert,

        Bookmarklet,

        CompassPlatformServices,

        WAFData,

        nls
        
    ) {
        'use strict';
        var embeded3DSpace;

        embeded3DSpace = {
    		topicName: "ProjectInfo",
            alertContainer: {},
            iframeContainer: {},
            isInternalService: false,
            readOnly: widget.readOnly,

            bookmarklet: null,
            queryStr: null,
            
            setQueryStr: function(queryStrParam){
				embeded3DSpace.queryStr = queryStrParam;
			},
			
            /**
             * Init the web page loading.
             */
            load: function () {
                var url;

                embeded3DSpace.destroyBookmarklet();
                widget.body.empty();

                url = embeded3DSpace.getUrl();
                widget.setValue('x3dUntrustedContent', !!url);

                if (!url) {
                } else {
                    embeded3DSpace.displayContentFromUrl(url);
                }

                widget.setTitle(widget.getValue('title'));
            },
            
            /**
             * Pop a notification within the widget
             * @param {string} message the message to display in the notification pop-up
             * @param {string} [type='error'] the type of the alert (warning, error)
             */
            notify: function (message, inputAlertType) {
                if ((widget.getValue('suppressMessages') || false).toString() === 'true') return;

                var alertType, defaultAlertType = 'error';

                alertType = (['warning', 'error'].indexOf(inputAlertType) > -1) ? inputAlertType : defaultAlertType;

                new UIKitAlert({
                    closable: true,
                    className: 'webpagereader-notify',
                    visible: true,
                    messages: [{
                        message: UWA.createElement('div', {
                            html: [UWA.createElement('span', { text: message })].concat(embeded3DSpace.readOnly ? [] : [
                                UWA.createElement('br'),
                                UWA.createElement('span', {
                                    text: nls.doNotShowErrorsAgain,
                                    styles: {
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        'text-decoration': 'underline'
                                    },
                                    events: {
                                        click: function () {
                                            widget.setValue('suppressMessages', true);
                                            new UIKitAlert({
                                                visible: true,
                                                closable: true,
                                                autoHide: true,
                                                hideDelay: 3000,
                                                messages: [{ message: nls.doNotShowErrorsAgainConfirmation }]
                                            }).inject(embeded3DSpace.alertContainer, 'before');
                                        }
                                    }
                                })
                            ])
                        }),
                        className: alertType
                    }]
                }).inject(embeded3DSpace.alertContainer);
            },

            createBookmarklet: function () {
                // If do not show again is true, don't create the bookmarklet.
                if ((widget.getValue('suppressBookmarklet') || false).toString() === 'true') {
                    return;
                }

                embeded3DSpace.bookmarklet = new Bookmarklet({
                    onDoNotShowAgain: !embeded3DSpace.readOnly && function () {
                        widget.setValue('suppressBookmarklet', true);
                    }
                });

                embeded3DSpace.bookmarklet.render().inject(widget.body);
            },

            destroyBookmarklet: function () {
                embeded3DSpace.bookmarklet && embeded3DSpace.bookmarklet.destroy();
                embeded3DSpace.bookmarklet = null;
            },

            /**
             * Inject the add feed form in the widget body
             */
            displayAddUrl: function () {
                var createElement = UWA.createElement,
                    mainContainer,
                    addUrlContainer,
                    addUrlForm,
                    addUrlFieldset,
                    addUrlSubmit,
                    addUrlInput;

                embeded3DSpace.createBookmarklet();

                // build the main container
                mainContainer = createElement('div', {
                    'class': 'container',
                    events: {
                        click: function () {
                            embeded3DSpace.destroyBookmarklet();
                        }
                    }
                }).inject(widget.body);

                // build the add feed container
                addUrlContainer = createElement('div', { 'class': 'addUrl' }).inject(mainContainer);

                // build the add feed form
                addUrlForm = createElement('form', { 'class': 'urlform' }).inject(addUrlContainer);

                // 1 - the field set
                addUrlFieldset = createElement('fieldset').inject(addUrlForm);

                // 2 - the input text field
                addUrlInput = new UIKitText({
                    events: {
                        onKeyDown: function (e) {
                            var value, key;

                            key = Event.whichKey(e);

                            value = this.getValue().trim();
                            if (value && key === 'return') {
                                widget.setValue('projectCode', value);
                                embeded3DSpace.load();
                            }
                        }
                    },
                    attributes: {
                        autofocus: true,
                        placeholder: nls.placeHolderEnterURL
                    }
                });

                // 3 - the submit button
                addUrlSubmit = new UIKitButton({
                    className: 'input-submit primary',
                    value: nls.submitURLBtn,
                    events: {
                        onClick: function (e) {
                            Event.stop(e);
                            var value = addUrlInput.getValue().trim();
                            if (value) {
                                widget.setValue('projectCode', value);
                                embeded3DSpace.load();
                            }
                        }
                    }
                });

                addUrlSubmit.inject(addUrlFieldset);

                createElement('span', { html: [addUrlInput] }).inject(addUrlFieldset);

            },

            /**
             * Build webpage viewer.
             * @param {string} url - The url to load
             * @param {boolean} [asPdfFallback] - Specify it as true to load the url as PDF fallback
             */
            buildWebpageViewer: function (url, asPdfFallback) {
                var objectContainer, iframe;

                widget.body.addClassName('no-padding');
                embeded3DSpace.iframeContainer.empty();
                embeded3DSpace.alertContainer.empty();

                iframe = UWA.createElement('iframe', {
                    frameborder: 0,
                    src: url,
                    width: '100%',
                    height: '100%',
                    scrolling: widget.getValue('scrolling'),
                    sandbox: 'allow-same-origin allow-forms allow-scripts allow-popups' // Block 'iframe busters'
                });

                // Using an <object> with an <iframe> fallback will be compatible with most browsers.
                if (asPdfFallback) {
                    objectContainer = UWA.createElement('object', {
                        type: 'application/pdf',
                        width: '100%',
                        height: '100%',
                        typemustmatch: 'true'
                    });
                    objectContainer.setAttribute('data', url);
                    iframe.inject(objectContainer);
                    objectContainer.inject(embeded3DSpace.iframeContainer);
                } else {
                    iframe.inject(embeded3DSpace.iframeContainer);
                }

                if (url.indexOf('http://') === 0) {
                    embeded3DSpace.notify(nls.warningMessage, 'warning');
                }
                embeded3DSpace.alertContainer.classList.remove('webpagereader-lower');
            },

            /**
             * Build PDF Viewer.
             * @param {String} url - Url to load into the PDF Viewer.
             * @param {String} authentication - authentication type (passport or none).
             */
            buildPdfViewer: function (url, authentication) {
                embeded3DSpace.alertContainer.empty();

                require(['DS/W3DXComponents/PDFViewer'], function (PDFViewer) {
                    var pdfViewer = new PDFViewer({
                        url: url,
                        requestsOptions: {
                            'authentication': authentication,
                            onFailure: function () {
                                embeded3DSpace.buildWebpageViewer(url, true);
                            }
                        }
                    });
                    pdfViewer.render().inject(embeded3DSpace.iframeContainer);
                    embeded3DSpace.alertContainer.classList.add('webpagereader-lower'); // push lower to avoid overlap with pdf topbar
                });
            },

            /**
             * Get the url to load into the iframe.
             * @return {String} urlResult - Url with protocol and source.
             */
            getUrl: function () {
				if(widget.getValue('projectCode')){
					var useUrl = null;
					if ( widget.getValue("widgetHost") )
					{
						useUrl = widget.getValue("widgetHost");
					}
					else
					{
						useUrl = widget.getUrl();
						useUrl = useUrl.substring(0, useUrl.indexOf('3dspace'));
					}
                var urlProtocol, url = Utils.parseUrl(useUrl + "3dspace/webapps/decDashboardCommon/decDashboardEmbeded3DSpace.jsp?dashboard=true&projectCode=" + widget.getValue('projectCode') + (embeded3DSpace.queryStr !== null && embeded3DSpace.queryStr !== "" ? "&" + embeded3DSpace.queryStr : "")),
                    urlResult = '',
                    urlSource = url.source;
				}else{
                var urlProtocol, url = '',
                    urlResult = '',
                    urlSource = url.source;
				}
				

                if (urlSource && urlSource !== 'about:blank') {
                    urlProtocol = url.protocol;
                    if (urlProtocol === 'https') {
                        urlResult = urlSource;
                    } else if (urlProtocol === 'http') {
                        urlResult = urlSource;
                    } else {
                        urlResult = 'http://' + urlSource;
                    }
                }
                return urlResult.trim();
            },

            /**
             * Process the URL and populate the widget content with either a
             * normal HTML webpage or a PDF file (using a PDF reader).
             * @param {String} url - Url to process and get the contend from.
             */
            displayContentFromUrl: function (url) {
                var authentication;

                // Get the list of user known services, identified by their URL origin
                function getServices () {
                    return new Promise(function (resolve, reject) {
                        CompassPlatformServices.getPlatformServices({
                            onComplete: function (data) {
                                resolve(data || []);
                            },
                            onFailure: reject
                        });
                    });
                }

                // Makes a request in order to read the content type (asnc)
                function pokeTarget (url, authentication) {
                    return new Promise(function (resolve, reject) {
                        WAFData.handleRequest(url, {
                            onComplete: function (resp, headers) {
                                resolve({
                                    value: resp,
                                    headers: headers
                                });
                            },
                            onFailure: reject,
                            onTimeout: reject,
                            authentication: authentication
                        });
                    });
                }

                // Checks if the input URL matches any known internal services of 'ANY' of the users' tenants
                function checkMatchingService (url, tenantsServices) {
                    var serviceFound;

                    tenantsServices.forEach(function (tenantServices) {
                        for (var serviceKey in tenantServices) {
                            if (url.indexOf(tenantServices[serviceKey]) === 0) {
                                serviceFound = true;
                            }
                        }
                    });
                    return serviceFound;
                }

                // Returns the origin from a URL
                function getOrigin (url) {
                    var a = document.createElement('a');
                    a.href = url;

                    // a.origin doesn't work on IE, and a.host always include a port number on IE
                    return ['http:', 'https:'].indexOf(a.protocol) > -1 && a.host
                        ? a.protocol + '//' + a.hostname
                            + ((!a.port || a.protocol === 'http:' && a.port === '80'
                                || a.protocol === 'https:' && a.port === '443'
                            )
                                ? ''
                                : ':' + a.port)
                        : '';
                }

                // Tests a string against a wildcard scheme (with '*'s)
                function testWildcardScheme (rule, str) {
                    return new RegExp('^' + rule.split('*').map(function escapeRegex (s) {
                        return s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
                    }).join('.*') + '$').test(str);
                }

                // Provides the value of an HTML header
                function getHeader (headers, name) {
                    return headers[name] || headers[name.toLowerCase()] || '';
                }

                // Checks that the content security policy of the target url matches the current location
                function hasValidCSP (headers) {
                    var xFrameOptions = getHeader(headers, 'X-Frame-Options'),
                        contentSecurityPolicy = getHeader(headers, 'Content-Security-Policy'),
                        widgetOrigin = getOrigin(window.location.origin),
                        targetOrigin = getOrigin(url);

                    return !(xFrameOptions.toLowerCase() === 'deny'
                        || (xFrameOptions.toLowerCase() === 'sameorigin' && targetOrigin !== widgetOrigin)
                        || (xFrameOptions.toLowerCase().indexOf('allow-from') === 0
                            && getOrigin(xFrameOptions.split(' ')[1]) !== origin)
                        || contentSecurityPolicy.split(';').reduce(function (blocked, cspItem) {
                            var acceptedAncestors;

                            cspItem = cspItem.trim();

                            if (cspItem.toLowerCase().indexOf('frame-ancestors') !== 0) {
                                return blocked;
                            }

                            acceptedAncestors = cspItem.split(' ').slice(1);

                            return blocked
                                || acceptedAncestors[0] === '\'none\''
                                || (acceptedAncestors[0] === '\'self\'' && targetOrigin !== widgetOrigin)
                                || !acceptedAncestors.reduce(function (matchingOriginFound, source) {
                                    return matchingOriginFound || (source.indexOf(':') === source.length - 1
                                        // scheme source
                                        ? widgetOrigin.indexOf(source) === 0
                                        // host source, possibly with wildcard
                                        : testWildcardScheme(
                                            decodeURIComponent(getOrigin(source)), // normalize origin wildcard scheme
                                            widgetOrigin
                                        )
                                    );
                                }, false);
                        }, false)
                    );
                }

                embeded3DSpace.alertContainer = UWA.createElement('div', { 'class': 'alert-container' }).inject(widget.body);

                embeded3DSpace.iframeContainer = UWA.createElement('div', {
                    'class': 'iframe-container ' + (widget.getValue('scrolling') === 'no' ? '' : 'scrolling')
                }).inject(widget.body);

                // Determine if the URL belongs to a known internal service. If so, use authentication
                getServices()
                    .then(function (services) {
                        embeded3DSpace.isInternalService = checkMatchingService(url, services);

                        authentication = embeded3DSpace.isInternalService ? 'passport' : '';

                        return pokeTarget(url, authentication);
                    })
                    ['catch'](function (e) {
                        UWA.log(e);
                    })
                    .then(function (response) {
                        var contentType = response && getHeader(response.headers, 'Content-Type');

                        if (url.slice(-4).toLowerCase() === '.pdf'
                            || typeof contentType === 'string' && (
                                contentType === 'application/pdf' || (
                                    embeded3DSpace.isInternalService
                                        && contentType.indexOf('application/octet-stream') > -1
                                )
                            )
                        ) {
                            embeded3DSpace.buildPdfViewer(url, authentication);
                        } else {
                            embeded3DSpace.buildWebpageViewer(url);
                            if (response && !hasValidCSP(response.headers)) {
                                embeded3DSpace.notify(nls.unsupportedContentSecurityPolicy);
                            }
                        }

                        if (!response) {
                            embeded3DSpace.notify(nls.unreachableUrl);
                        }
                    });

            }
        };
        
        return embeded3DSpace;
    });
