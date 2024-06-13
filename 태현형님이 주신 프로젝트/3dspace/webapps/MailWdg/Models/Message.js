/* global define */

define('DS/MailWdg/Models/Message',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Model',

    // UWP
    'DS/UWPCrypto/UWPCrypto',

    // Mail
    'DS/MailWdg/ViewModels/Message',

    // i18n
    'i18n!MailWdg/assets/nls/Mail'
],
function (UWA, Model, Crypto, MessageViewModel, Nls) {
    'use strict';

    var MessageModel = Model.extend({

        defaults: {
            number: undefined,
            id : '',
            subject : Nls.noSubject,
            author : Nls.noAuthor,
            people: {},
            flags: {},
            content: Nls.emptyMessageBody,
            summary: '',
            enclosures: [],
            date: undefined,
            encodedId: ''
        },

        setup: function () {

            var author, address,
                image = this.get('image'),
                people = this.get('people'),
                fromPeople = people.from;

            this.set('encodedId', this.id.replace(/%/gi,'_'));

            this.viewModel = new MessageViewModel(this);

            // Get Gravatar profile image
            if (!image && fromPeople && fromPeople.length) {
                author = fromPeople[0];
                address = author.address;

                if (author) {
                    this.set('image', 'https://www.gravatar.com/avatar/' + Crypto.md5(address.toLowerCase()) + '?d=mm');
                    //this.set('content', author.name || address); // This should be done in attributesMapping, not here ! Check if views support attributes mapping
                }
            }
        },

        parse: function (data) {

            var defaults = this.defaults,
                content, summary;

            // Compute a summary if there is message body.
            if (UWA.is(data.content, 'string') && data.content.length > 0) {

                content = data.content;
                summary = content
                    // Removes HTML tags.
                    .stripTags()
                    // Removes scripts.
                    .stripScripts()
                    // Removes styles between <style> tags.
                    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
                    // Removes inlined styles (no <style> tag).
                    .replace(/(([.#*]|(html|head|body|div|br|dt|dd|table|th|tr|td|p|pre|h1|h2|h3|h4|h5)).*{.*})/gi, '')
                    // Remove unwanted sequences ('&nbsp;' and 'v\:').
                    .replace(/(&nbsp;)|(v\\\:)/gi, '')
                    // To finish, trim it bro ! Then, you're done.
                    .trim();

                summary = summary.truncate(250);

            // Else use the defaults values for content and summary.
            } else {
                content = defaults.content;
                summary = defaults.summary;
            }

            return {
                number: UWA.is(data.number, 'number') ? data.number : defaults.number,
                id : UWA.is(data.id, 'string') ? data.id : defaults.id,
                subject : UWA.is(data.title, 'string') && data.title.length > 0 ? data.title : defaults.subject,
                author : UWA.is(data.author, 'string') && data.author.length > 0 ? data.author : defaults.author,
                people:  UWA.is(data.people, 'object') ? data.people : defaults.people,
                flags: UWA.is(data.flags, 'object') ? data.flags : defaults.flags,
                content: content,
                summary: summary,
                enclosures: UWA.is(data.enclosures, 'array') ? data.enclosures : defaults.enclosures,
                date: UWA.is(data.date, 'number') ? data.date : defaults.date
            };
        },

        getAttachments: function () {
            var enclosures = this.get('enclosures'),
                inlines = this.getInlines();

            // Attachments are all attachment-type enclosure that are not effectively used as inline
            return enclosures.filter(function (enclosure) {
                return enclosure.disposition && enclosure.disposition.toLowerCase() === 'attachment'
                    && inlines.indexOf(enclosure) === -1;
            });
        },

        getInlines: function () {
            var inlines = [];
            // We consider inline all elements that are part of the mail body.
            this.viewModel.getEnclosureToInlineUse().forEach(function (src, enclosure) {
                inlines.push(enclosure);
            });
            return inlines;
        },

        buildReplyString: function () {
            var people = this.get('people'),
                subject = this.get('subject'),
                from = people && people.from && people.from[0].address;

            // Adds "Re:" prefix if not already in the subject
            if (subject && !subject.match(/^re\:/i)) {
                subject = 'Re: ' + subject;
            }

            if (from) {
                return '{0}?subject={1}'.format(
                    from.escapeHTML(),
                    subject.escapeHTML()
                );
            } else {
                return null;
            }
        },

        buildReplyAllString: function () {
            var people = this.get('people') || {},
                from = people.from && people.from[0].address,
                tos = people.to,
                ccs = people.cc,
                subject = this.get('subject'),
                mailtoto = from + ';',
                mailtocc = '',
                mailto = null;

            if (tos && tos.length) {
                tos.forEach(function (to) {
                    mailtoto += to.address + ';';
                });
            }

            if (ccs && ccs.length) {
                ccs.forEach(function (cc) {
                    mailtocc += cc.address + ';';
                });
            }

            // Adds "Re:" prefix if not already in the subject
            if (subject && !subject.match(/^re\:/i)) {
                subject = 'Re: ' + subject;
            }

            if (mailtoto) {
                mailto = '{0}?subject={1}&cc={2}'.format(
                    mailtoto.escapeHTML(),
                    subject.escapeHTML(),
                    (mailtocc ? mailtocc.escapeHTML() : '')
                );
            }

            return mailto;
        }
    });

    MessageModel.predicates = {
        state: 'ds6w:what/ds6w:status',
        sender: 'ds6w:who/ds6w:responsible/ds6w:originator',
        date: 'ds6w:when/ds6w:created'
    };

    return MessageModel;

});

