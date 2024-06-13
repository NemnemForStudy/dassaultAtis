/**
 * @overview Extends `UWA/Ajax` for handling passport auth redirect.
 */

/* global define:false */

define('ds/Ajax',
    [
        'UWA/Core',
        'UWA/Ajax',
        'UWA/Utils',
        'DS/PlatformAPI/PlatformAPI',
        'DS/WAFData/WAFData'
    ],

    /**
     * Extends `UWA/Ajax` for handling passport auth redirect.
     *
     * @module ds/Ajax
     *
     * @requires module:UWA/Core
     * @requires module:UWA/Ajax
     * @requires module:UWA/Utils
     * @requires module:ds/PlatformAPI/PlatformAPI
     * @requires module:DS/WAFData/WAFData
     *
     * @extends  module:UWA/Core
     */
    function (UWA, UWAAjax, Utils, PlatformAPI, WAFData) {

        'use strict';

        var exports = {},
            onStateChangePrototype = UWAAjax.onStateChange,
            requestReload = function (url) {
                var env = window === window.top ? window : window.top;

                if (url) {
                    env.location = url;
                } else {
                    env.location.reload();
                }
            };

        /**
         * Returns true if the parent frame is accessible else returns false.
         * @param {object} [p] - Parent window. (if undefined, will use the current parent window)
         * @returns {boolean}
         * @private
         */
        function isParentAccessible (p) {
            p = p || parent;

            var isAccessible;

            try {
                isAccessible = !!(p && p.document);
            } catch (e) {
                isAccessible = false;
            }

            return isAccessible;
        }

        /**
         * Returns top parent window if accessible else returns undefined.
         * Iterates recursively from parent frame to parent frame to get the top frame window.
         * @param {object} [p] - Parent window. (if undefined, will use the current parent window)
         * @returns {object | undefined}
         * @private
         */
        function getTopParent (p) {
            p = p || parent;

            if (!isParentAccessible(p)) {
                return undefined;
            }

            if (p === p.parent) {
                return p;
            } else {
                return getTopParent(p.parent);
            }
        }

        /**
         * Is the provided url is the same passport as the one in app property.
         * @param {string} url - Url to check.
         * @returns {boolean}
         * @private
         */
        function isSamePassport (url) {
            var passportURL = PlatformAPI.getApplicationConfiguration('app.urls.passport'),
                parsedPassportURL = passportURL && Utils.parseUrl(passportURL),
                parsedUrl = url && Utils.parseUrl(url);

            return passportURL && url && parsedUrl
                && (parsedPassportURL.domain === parsedUrl.domain
                    || parsedUrl.domain.endsWith(parsedPassportURL.domain)
                    || parsedPassportURL.domain.endsWith(parsedUrl.domain)
                )
                && parsedPassportURL.port === parsedUrl.port;
        }

        /**
         * Logout the user.
         * @private
         */
        function requestLogout () {
            var topWindow = getTopParent();

            if (topWindow) {
                topWindow.location.replace(
                    topWindow.dsBaseUrl
                        + 'logout?redirectUrl='
                        + encodeURIComponent(topWindow.location.href)
                );
            }
        }

        /**
         * Generic handling of CORS / Passport flow errors.
         * This could be called from a framed widget so be careful with the window object to use.
         */
        exports.setWAFDataErrorHandler = function () {
            // WAFData 401 / 403 Passport error : logout.
            // IMPORTANT : only if the provided Passport url is same as Widget Platform Passport.
            if (!WAFData.passportErrorHandler) {
                WAFData.setErrorHandler(function (errorMessage, authURL) {
                    isSamePassport(authURL) && requestLogout();
                });
            }
        };

        // Set error handler for current environment
        exports.setWAFDataErrorHandler();

        /* eslint-disable no-magic-numbers */
        UWAAjax.onStateChange = function (request, options, xhr) {
            var response, responseText;

            if (request.readyState === 4) {
                if (request.status && !request.timedout && !request.aborted) {
                    responseText = request.responseType === '' || request.responseType === 'text'
                        ? request.responseText
                        : String(request.response);

                    // Proxy passport auth session/PGt error
                    if ((request.status === 403 && responseText === 'PGT is no more valid')
                        || (request.status === 401 && responseText.indexOf('Invalid, expired or missing authenticated session.') >= 0)
                    ) {
                        requestReload();
                    }

                    // CORS Passport session/PGT error
                    if (request.status === 401) {
                        try {
                            response = JSON.parse(request.responseText);

                            if (response.error === 'invalid_client'
                                && typeof response.x3ds_auth_url === 'string'
                            ) {
                                isSamePassport(response.x3ds_auth_url) && requestLogout();
                                return;
                            }
                        } catch (e) {
                            // do nothing
                        }
                    }
                    // CORS Passport client
                    if (request.status === 400) {
                        var _options = options;
                        try {
                            response = JSON.parse(request.responseText);
                            if (typeof response === 'object' && response.error === 'invalid_grant' && typeof response.x3ds_auth_url === 'string') {
                                options = {};
                                // Add empty onFailure function to avoid printing error on console
                                options.onFailure = function () { };
                                UWAAjax.request(response.x3ds_auth_url, {
                                    cors: true,
                                    withCredentials: true,
                                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                                    onComplete: function (result) {
                                        var o = JSON.parse(result);
                                        if (typeof o === 'object' && o.access_token && o.x3ds_service_url) {
                                            var serviceUrl = Utils.parseUrl(o.x3ds_service_url);
                                            if (serviceUrl.query === '') {
                                                serviceUrl.query = 'ticket=' + o.access_token;
                                            } else {
                                                var queriesString = Utils.parseQuery(serviceUrl.query);
                                                queriesString.ticket = o.access_token;
                                                serviceUrl.query = Utils.toQueryString(queriesString);
                                            }
                                            UWAAjax.request(Utils.composeUrl(serviceUrl), _options);
                                        }
                                    }
                                });
                            }
                        } catch (e) {
                            // do nothing
                        }
                    }
                }
                onStateChangePrototype(request, options, xhr);
            }
        };

        return exports;
    });
