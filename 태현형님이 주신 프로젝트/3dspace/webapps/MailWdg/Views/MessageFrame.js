/* global define */

define('DS/MailWdg/Views/MessageFrame',
[
    // UWA
    'UWA/Core',
    'UWA/Element',
    'UWA/Utils',
    'UWA/Class/View',

    // UIKit
    'DS/UIKIT/Alert',

    // i18n
    'i18n!MailWdg/assets/nls/Mail'
],
function (UWA, Element, Utils, View, Alert, Nls) {
    'use strict';

    var MessageFrameView = View.extend({

        tagName: 'div',

        className: 'message-body',

        destroy: function () {
            /* FIXME: avoid IE "Permission Denied" error when destroying this view from the parent frame.
             * Since the HTML has been added with `innerHTML` we only need to remove the frame.
             */
            if (this.elements.frame) {
                this.elements.frame.remove();
                delete this.elements.frame;
            }

            // this._parent();  // Destroying with UWA takes a looong time with big email content.
        },

        /*
            Use of `onload` event because `iframe.contentWindow` does not exist if iframe is not injected and ready.
         */
        onLoad: function () {

            function alertClickHandler () {
                var alert = that.elements.alert;

                that.renderImages();
                alert.remove(alert.elements.container.firstElementChild);
            }

            var that = this,
                content = that.model.get('content'),
                body = UWA.extendElement(that.elements.frame.contentWindow.document.body);

            // Append the HTML message to the frame body replacing new lines characters by BR tag.
            body.innerHTML = content;

            // Apply some style specfic to the frame body
            body.setStyles({
                'padding': '20px',
                'margin': 0
            });

            // Keep some aliases.
            that.elements.body = body;

            // Alert message about inline images if needed.
            if (that.model.viewModel.getEnclosureToInlineUse().size > 0) {
                that.elements.alert.show();
                that.elements.alert.add({
                    html: [
                        { tag: 'span', text: Nls.containsImages + ' ' },
                        { tag: 'span', 'class': 'fonticon fonticon-picture'},
                        {
                            tag: 'span',
                            'class': 'display-link',
                            text: Nls.displayImages,
                            events: { click: alertClickHandler }
                        }
                    ],
                    className: 'default'
                });
            }
        },

        render: function () {
            var that = this,
                container = that.container,
                alert, frame;

            // Global alert.
            alert = new Alert({
                closable: true,
                closeOnClick: false
            }).inject(container);

            frame = UWA.createElement('iframe', {
                events: { load: this.onLoad.bind(this) }
            }).inject(container);

            // Keep some aliases.
            that.elements.alert = alert;
            that.elements.frame = frame;

            return this;
        },

        renderImages: function () {
            var that = this;

            that.model.viewModel.getEnclosureToInlineUse().forEach(function (src, enclosure) {
                that.elements.frame.contentWindow.document.body.getElements('img[src="' + src + '"]')
                    .forEach(function (img) {
                        img.src = enclosure.url;
                    });
            });
        }

    });

    return MessageFrameView;

});

