/* global define */

define('DS/MediaLinksWdg/Models/Link', [
    // UWA
    'UWA/Class/Model'
],
function (Model) {
    'use strict';

    var Link = Model.extend({

        defaults: {
            id: '',
            url: '',      // Link url
            thumb: '',    // Thumb url
            thumbPos: '',
            tooltip: '',  // Tooltip text
            urlType: ''   // Type of url (video, img, audio, etc...) only video is manage for now.
        },

        widgetHelper: null,

        setup: function (options) {
            var that = this;

            that.addEvent('onChange', that.onUpdate.bind(that));

            that.widgetHelper = options.widgetHelper || that.collection.widgetHelper;
        },


        sync: function (method) {
            var that = this;

            // If the method is not the delete method, call the parent.
            // The parent try to call the url of the model on delete method which here doesn't exist.
            method !== 'delete' && that._parent.apply(that, arguments);
        },


        getId: function () {
            return this.get('id');
        },


        getLinkUrl: function () {
            return this.get('url');
        },


        setLinkUrl: function (url, silent) {
            this.set('url', this.widgetHelper.formatUrl(url), { silent: !!silent });
        },


        getThumbUrl: function () {
            return this.get('thumb');
        },


        setThumbUrl: function (url, silent) {
            this.set('thumb', this.widgetHelper.formatUrl(url), { silent: !!silent });
        },


        getThumbPos: function () {
            return this.get('thumbPos');
        },


        setThumbPos: function (pos, silent) {
            this.set('thumbPos', pos, { silent: !!silent });
        },


        getTooltip: function () {
            return this.get('tooltip');
        },


        setTooltip: function (tooltip, silent) {
            this.set('tooltip', tooltip, { silent: !!silent });
        },


        getUrlType: function () {
            return this.get('urlType');
        },


        setUrlType: function (urlType, silent) {
            this.set('urlType', urlType, { silent: !!silent });
        },

        /**
         * On model change, update widget data.
         */
        onUpdate: function () {
            var that = this;

            that.setLinkUrl(that.getLinkUrl(), true);
            that.setThumbUrl(that.getThumbUrl(), true);

            that.collection && that.collection.updateData();
        },


        onAdd: function () {
            this.setLinkUrl(this.getLinkUrl(), true);
            this.setThumbUrl(this.getThumbUrl(), true);
        },


        destroy: function () {
            this._parent.apply(this, arguments);
        }
    });

    return Link;
});
