/* global define */

define('DS/MediaLinksWdg/Collections/Links', [
    // UWA
    'UWA/Core',
    'UWA/String',
    'UWA/Json',
    'UWA/Class/Collection',

    // WP
    'DS/UWPClientControls/Utils',

    // MediaLinksWdg
    'DS/MediaLinksWdg/Models/Link'
],
function (
    // UWA
    UWA,
    UWAString,
    Json,
    Collection,

    // WP
    WUtils,

    // MediaLinksWdg
    LinkModel
) {
    'use strict';

    var Links = Collection.extend({

        model: LinkModel,

        widgetHelper: null,


        setup: function (models, options) {
            var that = this,
                opts = options || {};

            that.widgetHelper = opts.widgetHelper;
        },


        sync: function (method, collection, options) {
            var that = this,
                resp = that.parse();

            if (resp) {
                options.onComplete && options.onComplete(resp);
            } else {
                options.onFailure && options.onFailure('Error parsing data');
            }

            return {
                cancel: function () {
                    return;
                }
            };
        },


        parse: function () {
            var i, item, itemId,
                that = this,
                widgetHelper = that.widgetHelper,
                items = [],
                linkIds = widgetHelper.getLinkIds();


            for (i = 0; i < linkIds.length; i++) {
                itemId = linkIds[i];

                try {
                    item = JSON.parse(widgetHelper.getLink(itemId));

                    // Format urls, to be sure that it always well formated when displayed to the user.
                    item.url = widgetHelper.formatUrl(
                        UWAString.stripTags(item.url)
                    );
                    item.thumb = widgetHelper.formatUrl(
                        UWAString.stripTags(item.thumb)
                    );

                    item.id = itemId;

                    items.push(item);
                } catch (e) {}
            }

            return items;
        },


        onRemove: function (linkModel) {
            var that = this,
                widgetHelper = that.widgetHelper,
                linkId, index, linkIds;

            // Remove the deleted link from widget data.
            linkId = linkModel.getId();
            widgetHelper.deleteValue('link_' + linkId);
            widgetHelper.setLastLinkDisplayed(); // Empty the last displayed link info.

            // Remove the link from the link ids list.
            linkIds = UWA.clone(widgetHelper.getLinkIds()); // Clone needed because widget.setValue test with '===' and true because it is an array, so we need a new array.

            index = linkIds.indexOf(linkId);
            if (index > -1) {
                linkIds.splice(index, 1);
            }

            widgetHelper.setValue('linkIds', linkIds);
        },


        onAdd: function () {
            this.updateData();
        },


        updateData: WUtils.debounce(function () {
            var that = this,
                values = {};

            that.forEach(function (model) {
                var id = model.getId();

                try {
                    values['link_' + id] = Json.encode({
                        url: model.getLinkUrl(),
                        thumb: model.getThumbUrl(),
                        thumbPos: model.getThumbPos(),
                        tooltip: model.getTooltip(),
                        urlType: model.getUrlType()
                    });
                } catch (e) {}
            });

            that.widgetHelper.setValues(values);
        }, 100)
    });

    return Links;
});
