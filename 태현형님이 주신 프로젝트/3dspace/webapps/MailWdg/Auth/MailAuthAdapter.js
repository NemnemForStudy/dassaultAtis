/**
 * @overview Oauth2 mail authentication adapter
 */
define('DS/MailWdg/Auth/MailAuthAdapter', [
    // UWA
    'UWA/Utils',
    'UWA/Controls/Popup',

    // UWA Auth
    'UWA/Services/Auth/Adapter/Exposition'
], function (
    // UWA
    Utils,
    Popup,

    //UWA Auth
    Exposition
) {

    'use strict';

    function mailAuthAdapter () {
        var exposition = new Exposition();

        return Object.assign(exposition, {

            authenticate: function (onSuccess, onFailure) {
                exposition.request('authenticate', function (resp) {
                    if (resp.type === 'redirect') {
                        new Popup({
                            url: resp.url,
                            width: 750,
                            height: 750,
                            top: 120,
                            left: 160,
                            events: {
                                onClose: function () {
                                    onSuccess && onSuccess();
                                },

                                onBlocked: function () {
                                    if (UWA.is(onFailure)) {
                                        onFailure && onFailure('Unable to open popup due popup blocker.');
                                    }
                                }
                            }
                        }).open();
                    }
                }, onFailure);
            }
        });
    }

    return mailAuthAdapter;
});
