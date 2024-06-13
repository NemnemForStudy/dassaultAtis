/* global define */

define('DS/MailWdg/Views/Provider',
[
    // UWA
    'UWA/Core',
    'UWA/Element',
    'UWA/Class/View',

    // Webapps
    'DS/WebappsUtils/WebappsUtils',
],
function (UWA, Element, View, WebappsUtils) {
    'use strict';

    var ProviderView = View.extend({

        className: 'email-provider',

        setup: function () {
            
        },

        render: function() {
            var that = this,
                model = this.model,
                elements = this.elements,
                container = this.container,
                assetUrl = WebappsUtils.getWebappsAssetUrl('MailWdg', 'images');

            // Create the provider link
            elements.link = new Element('a', {
                'class': 'email-provider-link',
                'events': {
                    click: function () {
                        that.dispatchEvent('onItemViewClick', that);
                    }
                }
            }).inject(container);

            // Create the provider logo if available.
            if (model.get('image')) {
                elements.image = new Element('img', {
                    'class': 'email-provider-logo',
                    'src':   assetUrl + '/' + model.get('image')
                }).inject(elements.link);
            // Else create the provider text.
            } else {
                elements.text = new Element('p', {
                    'class': 'email-provider-text',
                    'html':   model.get('name')
                }).inject(elements.link);
            }

            return that;
        },


    });

    return ProviderView;

});

