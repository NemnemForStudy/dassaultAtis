/* global define */

define('DS/MediaLinksWdg/Views/Links', [
    // UWA
    'UWA/Core',
    'UWA/Class/View',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks'
],
function (
    // UWA
    UWA,
    View,

    // NLS
    Nls
) {
    'use strict';

    var LinksView = View.extend({

        tagName: 'div',

        className: 'links-view view',

        widgetHelper: null,

        controller: null,

        isRendered: false,

        layout: null,

        /**
         * @param {Object} options - Options
         * @param {Object} options.widgetHelper - Widget helper.
         * @param {Object} options.controller - Controller instance.
         */
        setup: function (options) {
            options = options || {};

            var that = this;

            that.widgetHelper = options.widgetHelper;
            that.controller = options.controller;
        },

        render: function () {
            var that = this;

            that.renderLayout();

            return that;
        },

        renderLayout: function () {
            var that = this,
                widgetHelper = that.widgetHelper,
                layoutName = widgetHelper.getLayout();

            if (that.layout) {
                that.layout.destroy();
            }

            if (widgetHelper.isReadOnly && !that.controller.linksCollection.length) {

                that.container.addContent(
                    UWA.createElement('h3', {
                        'class': 'no-link-reader',
                        text: Nls.noLinkToDisplay
                    })
                );

            } else {
                require(['DS/MediaLinksWdg/Layouts/' + layoutName], function (Layout) {
                    that.layout = new Layout({
                        widgetHelper: widgetHelper,
                        view: that
                    }).render().inject(that.container);
                });
            }

            return that;
        },

        /**
         * @param {Object} options - Options
         */
        show: function (options) {
            options = options || {};

            var that = this,
                ignoreRefreshOption = false;

            if (!that.isRendered) {

                that.render().inject(that.widgetHelper.getBody());
                that.isRendered = true;
                ignoreRefreshOption = true;
            }

            that.container.show();

            if (!ignoreRefreshOption && options.refresh) {
                that.renderLayout();
            }

            return that;
        },

        getCurrentModel: function () {
            return this.layout.getCurrentModel();
        },

        hide: function () {
            var container = this.container;

            container && container.hide();

            return this;
        },

        onDeleteLink: function (model) {
            var that = this;

            that.layout && that.layout.onDeleteItem(model);

            return that;
        },

        onResize: function () {
            var that = this;
            that.layout && that.layout.onResize();

            return that;
        },

        destroy: function () {
            var that = this;

            that.widgetHelper = null;
            that.controller = null;

            that.layout && that.layout.destroy();
            that.layout = null;

            that.isRendered = false;

            that._parent.apply(that, arguments);
        }
    });

    return LinksView;
});
