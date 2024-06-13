/* global define */

define('DS/MailWdg/Collections/Contacts',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Collection',

    // Mail
    'DS/MailWdg/Models/Contact',
],
function (UWA, Collection, Contact) {
    'use strict';

    var ContactCollection = Collection.extend({
        model: Contact,

        // Keep a reference to the message owning that attachments collection.
        _message: undefined,

        setup: function(models, options) {
            if (options.message) {
                this._message = options.message;
            }
        },

        sync: function (method, collection, options) {
            var people = this._message && this._message.get('people');
            if (people) {
                this.add(people, {parse: true});
                if (options && options.onComplete) {
                    options.onComplete(people);
                }
            }

            return {
                cancel: function () {
                    return;
                }
            };
        },

        parse: function(data) {

            var people = [],
                froms = data && data.from,
                tos = data && data.to,
                ccs = data && data.cc;

            if (UWA.is(froms, 'array')) {
                froms.forEach(function (contact) { contact.role = 'from'; });
                people = people.concat(froms);
            }

            if (UWA.is(tos, 'array')) {
                tos.forEach(function (contact) { contact.role = 'to'; });
                people = people.concat(tos);
            }

            if (UWA.is(ccs, 'array')) {
                ccs.forEach(function (contact) { contact.role = 'cc'; });
                people = people.concat(ccs);
            }

            return people;

        }

    });

    return ContactCollection;

});

