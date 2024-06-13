/* global define */

define('DS/MailWdg/Collections/Providers',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Collection',

    // Auth
    'UWA/Services/Auth',
    'UWA/Services/Auth/Adapter/Exposition',

    // Mail
    'DS/MailWdg/Models/Provider',
],
function (UWA, Collection, Auth, Exposition,  Provider) {
    'use strict';

    function getAuth (options) {
        return new Auth({
            adapter: 'Exposition',
            adapterOptions: options
        });
    }

    var preconfiguredProviders = [{
            'id':    '3ds_eu',
            'image': 'dassaultsystemes.png',
            'name':  'Dassault Systèmes EMEA',
            'imap': {
                'server': 'message.emea.3ds.com',
                'ssl':    'ssl'
            }
        }, {
            'id':      'gmail',
            'image':   'gmail.svg',
            'name':    'Gmail',
            'imap': {
                'server': 'imap.gmail.com',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop.gmail.com',
                'ssl':    false
            },
            'auth': getAuth({
                provider: 'google2',
                data: {
                    scope: 'https://mail.google.com'
                }
            })
        }, {
            'id':    'yahoo',
            'image': 'yahoo.svg',
            'name':  'Yahoo Mail',
            'imap': {
                'server': 'imap.mail.yahoo.com',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop.mail.yahoo.com',
                'ssl':    'ssl'
            }
        }, {
            'id':    'icloud',
            'image': 'icloud.png',
            'name':  'iCloud',
            'imap': {
                'server': 'imap.mail.me.com',
                'ssl':    'ssl'
            }
        }, {
            'id':    'aol',
            'image': 'aol.png',
            'name':  'Aol',
            'imap': {
                'server': 'imap.aol.com',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop.aol.com',
                'ssl':    false
            }
        }, {
            'id':    'free',
            'image': 'free.png',
            'name':  'Free',
            'imap': {
                'server': 'imap.free.fr',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop.free.fr',
                'ssl':    false
            }
        }, {
            'id':    'sfr',
            'image': 'sfr.png',
            'name':  'SFR',
            'imap': {
                'server': 'imap.sfr.fr',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop.sfr.fr',
                'ssl':    false
            }
        }, {
            'id':    'orange',
            'image': 'orange.png',
            'name':  'Orange',
            'imap': {
                'server': 'imap.orange.fr',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop.orange.fr',
                'ssl':    false
            }
        }, {
            'id':   'outlook',
            'image':'outlook.svg',
            'name': 'Outlook.com',
            'imap': {
                'server': 'imap-mail.outlook.com',
                'ssl':    'ssl'
            },
            'pop': {
                'server': 'pop-mail.outlook.com',
                'ssl':    'ssl'
            }
        }
    ];

    var ProviderCollection = Collection.extend({

        model: Provider

    });

    /**
     * Helper to retrieve famous provider configrations by ids.
     * @param {Array<String>}  [providerIds] A list of preconfigured providers (id).
     */
    ProviderCollection.getProviderConfigurations = function(providerIds) {
        return preconfiguredProviders.filter(function(provider) {
                return providerIds.indexOf(provider.id) !== -1;
        });
    };

    return ProviderCollection;

});

