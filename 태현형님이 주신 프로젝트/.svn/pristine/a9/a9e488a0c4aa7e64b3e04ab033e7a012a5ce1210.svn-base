/* global define, window */

define('DS/MediaLinksWdg/Controllers/Controller', [
    // UWA
    'UWA/Utils',
    'UWA/Class',

    // MediaLinks
    'DS/MediaLinksWdg/Collections/Links',
    'DS/MediaLinksWdg/Views/EditLink',
    'DS/MediaLinksWdg/Views/Links',
    'DS/MediaLinksWdg/Views/Menu',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks'
],
function (
    // UWA
    Utils,
    Class,

    // MediaLinks
    LinksCollection,
    EditLinkView,
    LinksView,
    MenuView,

    // NLS
    Nls
) {
    'use strict';

    var Controller = Class.extend({

        widgetHelper: null,

        linksCollection: null,

        views: [],

        view: null,

        editLinkView: null,
        linksView: null,
        menuView: null,

        /**
         * Init the Controller.
         * @param {Object} options - Options.
         * @param {Object} options.widgetHelper
         */
        init: function (options) {
            options = options || {};

            var that = this;

            that.widgetHelper = options.widgetHelper;

            that.linksCollection = new LinksCollection([], {
                widgetHelper: that.widgetHelper
            });
        },

        /**
         * @param {Object}  options - Options.
         */
        onLoad: function (/* options */) {
            // options = options || {};

            var that = this,
                linksCollection = that.linksCollection,
                isReadOnly = that.widgetHelper.isReadOnly();

            linksCollection.fetch();

            that.showMenuView();

            that[linksCollection.length || isReadOnly ? 'showLinksView' : 'showAddLinkView']();

            return that;
        },

        showMenuView: function () {
            var that = this;

            if (that.widgetHelper.isReadOnly()) {
                return that;
            }

            if (!that.menuView) {
                that.menuView = new MenuView({
                    widgetHelper: that.widgetHelper,
                    controller: that
                });
                that.views.push(that.menuView);
            }

            that.menuView.show();

            return that;
        },

        hideMenuView: function () {
            this.menuView && this.menuView.hide();
            return this;
        },

        showAddLinkView: function () {
            this.showEditLinkView('add');
            return this;
        },

        showEditLinkView: function (model) {
            var that = this,
                widgetHelper = that.widgetHelper;

            model = model !== 'add' ? model || that.view.getCurrentModel() : null;

            that.hideCurrentView();
            that.hideMenuView();

            if (!that.editLinkView) {
                that.editLinkView = new EditLinkView({
                    widgetHelper: widgetHelper,
                    controller: that
                });
                that.views.push(that.editLinkView);
            }

            that.view = that.editLinkView;

            that.view.show({
                linkModel: model
            });

            return that;
        },

        showLinksView: function (options) {
            var that = this;

            that.hideCurrentView();
            that.showMenuView();

            if (!that.linksView) {
                that.linksView = new LinksView({
                    widgetHelper: that.widgetHelper,
                    controller: that
                });
                that.views.push(that.linksView);
            }

            that.view = that.linksView;
            that.view.show(options);

            return that;
        },

        hideCurrentView: function () {
            var view = this.view;

            view && view.hide();

            return this;
        },

        deleteLink: function (model) {
            var that = this;

            that.linksView && that.linksView.onDeleteLink(model);

            that.linksCollection.remove(model);

            that[that.linksCollection.length
                ? 'showLinksView'
                : 'showAddLinkView']();

            return that;
        },

        /**
         * @param {Object} linkHash - Link info in a literal object.
         */
        onSaveEditLink: function (linkHash) {
            var that = this;

            // If link hash has no id, so it is a new link.
            if (!linkHash.id) {

                linkHash.id = Utils.getUUID();
                that.widgetHelper.addLinkId(linkHash.id);
                that.widgetHelper.setLastLinkDisplayed(linkHash.id);
                that.linksCollection.add(linkHash);

            } else {
                // Else it is an update of existing link.
                that.linksCollection.get(linkHash.id).set(linkHash);
            }

            that.showLinksView({ refresh: true });

            return that;
        },

        onCancelEditLink: function () {
            var that = this;

            // Do nothing if no links in the collection.
            if (!that.linksCollection.length) {
                return that;
            }

            that.showLinksView();

            return that;
        },

        onDeleteEditLink: function (linkModel) {
            this.deleteLink(linkModel);
            return this;
        },

        onDeleteMenuLink: function () {
            var that = this,
                view = that.view,
                currentLinkModel = view.getCurrentModel && view.getCurrentModel();

            if (!currentLinkModel) {
                return that;
            }

            that.deleteLink(currentLinkModel);

            return that;
        },

        onLinkClick: function (linkModel) {
            var linkUrl = linkModel.getLinkUrl();

            if (linkModel.getUrlType() === 'video') {
                top.require(['DS/Dashboard/DashboardManager'], function (DashboardManager) {
                    DashboardManager.showVideoPlayer({
                        videoUrl: linkUrl
                    });
                });
            } else {
                try {
                    linkUrl && window.open(linkUrl, '_blank');
                } catch (e) {
                    var widgetHelper = this.widgetHelper;

                    widgetHelper.showAlert({
                        msg: widgetHelper.replace(
                            Nls.unableOpenInvalidUrl,
                            { url: linkUrl }
                        )
                    });
                }
            }

            return this;
        },

        onHeightOverflow: function (reset) {
            var that = this;

            that.menuView && that.menuView.onHeightOverflow(reset);

            return that;
        },

        /**
         * On resize, resize the view.
         */
        onResize: function () {
            var that = this;

            that.menuView && that.menuView.closeMenu();
            that.view && that.view.onResize();

            return that;
        },

        /**
         * On view change, change the view.
         * @param {Object} data - OnViewChange data.
         */
        onViewChange: function (data) {
            this.onResize();
            return this;
        },

        onDestroy: function () {
            var that = this;

            that.widgetHelper = null;

            that.linksCollection = null;

            that.views.forEach(function (view) {
                view.destroy();
            });
            that.views = null;
            that.editLinkView = null;
            that.linksView = null;
            that.menuView = null;

            that._parent.apply(that, arguments);
        }
    });

    return Controller;
});
