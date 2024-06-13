/* global define */

define('DS/MailWdg/Models/Contact',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Model',

    // UWP
    'DS/UWPCrypto/UWPCrypto',

    // Utils
    'DS/WebappsUtils/WebappsUtils',
],
function (UWA, Model, Crypto, WebappsUtils) {
    'use strict';

        var ContactModel = Model.extend({

        defaults: {
            name: '',
            address : '',
            role : '', // 'cc' or 'to' or 'from'
            imageUrl: 'https://www.gravatar.com/avatar/',
            imageParam: '?d=mm'
        },

        parse: function (data) {
            var defaults = this.defaults;

            return {
                name: UWA.is(data.name, 'string') ? data.name : defaults.name,
                address: UWA.is(data.address, 'string') ? data.address : defaults.address,
                role: UWA.is(data.role, 'string') ? data.role : defaults.role,
            };
        },

        getImageUrl: function () {
            var address = this.get('address');
            return this.defaults.imageUrl + Crypto.md5(address.toLowerCase()) + this.defaults.imageParam;
        },

        getIconUrl: function () {
            var role = this.get('role'),
                icon;

            if (role === 'from') {
                icon = 'paper-plane'; 
            }

            if (role === 'to') {
                icon = 'inbox'; 
            }

            if (role === 'cc') {
                icon = 'docs'; 
            }

            return WebappsUtils.getWebappsAssetUrl('MailWdg', 'images/') + icon + '.png';
        }

    });

    return ContactModel;

});

