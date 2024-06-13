/**
 * @overview Popup for Outh2 auhenticate
 */
define('DS/MailWdg/PopupMailAuth', [
    // Mail Auth
    'DS/MailWdg/Auth/MailAuthenticate'
], function (
    // Mail Auth
    MailAuthenticate
) {
    'use strict';

    var exports = {

        authenticate: function (options) {
            var mailAuth = new MailAuthenticate(options.adapterOptions).auths[options.id];
            mailAuth.authenticate(options.success, options.failure);
        },

        /**
        * Authenticate user with login popup
        * @param {object} options            - Options.
        * @param {string} options.id           - Mail provider id e.g gmail.
        * @param {Function} options.success    - The success function.
        * @param {Function} [options.failure]  - The failure function.
        * @param {object} options.auth         - object return via getAuth metioned in providers collection
        * @param {object} options.auth.options - auth options
        * {
        *      adapter: adapter object || string
        *      adapterOptions: {
        *          provider: string,
        *          data: {
        *              scope: string
        *          }
        *      }
        * }
        */
        popupAuth: function (options) {
            return this.authenticate({
                id: options.id,
                adapterOptions: options.auth.options,
                success: options.success,
                failure: options.failure
            });
        }
    };

    return exports;
});
