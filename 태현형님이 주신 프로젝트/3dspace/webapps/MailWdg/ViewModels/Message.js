define('DS/MailWdg/ViewModels/Message', [
    'UWA/Core',
    'UWA/Class',
    'DS/WebappsUtils/Map'
], function (UWA, Class, Map) {
    'use strict';

    var MessageViewModel = Class.extend({

        init: function (model) {
            this.model = model;
        },

        _getExpectedDomContent: function () {
            if (this._expectedDomContent) {
                return this._expectedDomContent;
            }

            // NOTE: the HTML is parsed both here (without the overhead of UWA) and in the equivalent View class.
            // This is inefficient but it prevents inline enclosure detection from being coupled with the state of the
            // DOM of the message view, which is updated when images are required to be displayed.
            // Note that the rendering time far greater than the cost of parsing, so the perceived impact on
            // performance should be negligible.
            var el = document.createElement('html');
            el.innerHTML = this.model.get('content');
            return (this._expectedDomContent = el);
        },

        /**
         * Maps enclosures to the src of the image element that uses them (as a cid), no matter their declared type
         * (inline or attachment)
         * @returns {Map<Object, string>} where the Object is an enclosure and the string a cid.
         */
        getEnclosureToInlineUse: function () {
            if (this._enclosureToInlineUse) {
                return this._enclosureToInlineUse;
            }

            var images = this._getExpectedDomContent().querySelectorAll('img'),
                enclosures = this.model.get('enclosures'),
                result = new Map();

            function getEnclosureFromCid (cid) {
                return enclosures.filter(function (enclosure) {
                    return enclosure.cid && enclosure.cid.split('@')[0] === cid;
                })[0];
            }

            [].forEach.call(images, function (image) {
                // If a `cid` is found.
                if (/^cid\:/i.test(image.src)) {
                    // Catch the value after `cid` token.
                    var cid = image.src.match(/cid\:(.*)/i),
                        enclosure;
                    // Always try to split on `@` (servers may return different cid kind: "image001.png" or "image001.png@ABC.123.DEF.456").
                    cid = cid[1] && cid[1].split('@')[0];
                    // Look for matching inline file within enclosures.
                    enclosure = getEnclosureFromCid(cid);
                    if (enclosure) {
                        result.set(enclosure, image.src);
                    }
                }
            });

            return (this._enclosureToInlineUse = result);
        },
    });

    return MessageViewModel;
});
