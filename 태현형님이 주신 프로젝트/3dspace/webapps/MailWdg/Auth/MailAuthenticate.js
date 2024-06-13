/**
 * @overview Auth with this MailAuthenticate
 */
define('DS/MailWdg/Auth/MailAuthenticate', [
    // UWA
    'UWA/Services/Auth',
    'UWA/Utils',

    // Mail Auth
    'DS/MailWdg/Auth/MailAuthAdapter'
], function (
	// UWA Auth
    Auth,
    Utils,

    // Mail Auth
    MailAuthAdapter
) {
    'use strict';

    /**
     * Create auth instance to call overrided authenticate function with mail auth adapter
     * @param {object} options             - Options.
     * @param {object} options.adapterOptions - Adaper options
     * {
     *      provider: string,
     *      data: {
     *          scope: string
     *      }
     * }
     * @return {object<Auth>} auth instance
     */
    function createAuth (options) {

        return new Auth({
            adapter: new MailAuthAdapter(),
            adapterOptions: options.adapterOptions
        });
    }

    return function (options) {
        this.auths = {
            gmail: createAuth(options)
        };
    };

});
