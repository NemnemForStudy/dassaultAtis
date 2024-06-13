/* global define */

define('DS/MailWdg/Collections/Messages',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Collection',
    // Mail
    'DS/MailWdg/Models/Message',
    // i18n
    'i18n!MailWdg/assets/nls/Mail'
],
function (UWA, Collection, Message, NLS) {
    'use strict';

    var MessageCollection = Collection.extend({

        model: Message,

        setup : function () {
            this.tags = {};
        },

        parse: function (response) {

            var ids;

            if (response && UWA.is(response.items, 'array')) {
                // Save the tagData entry
                if (response.tagData) {
                    // Translate "status" tags (read/unread).
                    Object.keys(response.tagData).forEach(function(key) {
                        response.tagData[key].forEach(function(tag) { 
                            if (tag.sixw === Message.predicates.state && NLS[tag.object]) {
                                tag.object = NLS[tag.object].ucfirst();
                            }
                        });
                    });
                    // Add new tags to the current ones.
                    UWA.merge(this.tags, response.tagData);
                }

                // FIXME: Messages with same id (yes, it may happen, on iCloud for e.g) raise a loop of infinite scroll events
                // because ids should be unique in a collection. Let's fix this by appending some random string as an id suffix.
                ids = response.items.map(function (item) {
                    return item.id;
                });
                response.items.forEach(function (item, index) {
                    // Add suffix only if item already in the collection or in the the current array.
                    var pos = ids.indexOf(item.id);
                    if (this.get(item.id) || (pos !== -1 && pos !==  index)) {
                        item.id += '-' + Math.random().toString().split('.')[1];
                    }
                }, this);

                // Return the items entry
                return response.items;
            } else {
                return [this._models];
            }

        }

    });

    return MessageCollection;

});

