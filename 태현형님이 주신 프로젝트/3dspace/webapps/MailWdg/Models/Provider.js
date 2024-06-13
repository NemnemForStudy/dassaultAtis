/* global define */

define('DS/MailWdg/Models/Provider',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Model'
],
function (UWA, Model) {
    'use strict';

        var ProviderModel = Model.extend({

        defaults: {
            name: '',
            image: '',
            imap: {
                'server': 'localhost',
                'ssl': 'ssl' // ssl, tls, false.
            },
            /*pop: {
                'server': 'localhost',
                'ssl': false // ssl, tls, false.
            }*/
        }

    });

    return ProviderModel;

});

