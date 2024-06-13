/* global define */

define('DS/MailWdg/Collections/Attachments',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Collection',

    // Mail
    'DS/MailWdg/Models/Attachment',
],
function (UWA, Collection, Attachment) {
    'use strict';

    var AttachmentCollection = Collection.extend({

        model: Attachment,

        // Keep a reference to the message owning that attachments collection.
        _message: undefined,

        setup: function (models, options) {
            if (options.message) {
                this._message = options.message;
            }
        },

        // Override fetch method to avoid call to backend.
        fetch: function () {
            if (this._message) {
                this.add(this._message.getAttachments(), {parse: true});
            }
        },

        /*parse: function (response) {
            response = UWA.is(response, 'array') ? response : response.enclosures;

            if (UWA.is(response, 'array')) {
                return response.filter(function (enclosure) {
                    return enclosure.disposition === 'attachment';
                });
            } else {
                return [];
            }
        }*/

    });

    return AttachmentCollection;

});

