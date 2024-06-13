/* global define */

define('DS/MediaLinksWdg/Views/Menu', [
    // UWA
    'UWA/Core',
    'UWA/Utils/Client',
    'UWA/Class/View',

    // UIKIT
    'DS/UIKIT/DropdownMenu',
    'DS/UIKIT/SuperModal',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks',

    // Css
    'css!DS/MediaLinksWdg/Views/Menu'
],
function (
    // UWA
    UWA,
    Client,
    View,

    // UIKIT
    DropdownMenu,
    SuperModal,

    // NLS
    Nls

) {
    'use strict';

    var Menu = View.extend({

        tagName: 'div',

        className: 'menu-view view',

        widgetHelper: null,

        controller: null,

        isRendered: false,


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
            var that = this,
                els = that.elements;

            els.menuBtn = UWA.createElement('div', {
                'class': 'menu-btn fonticon fonticon-menu-dot',
                title: Nls.menu
            });

            els.dropdownMenu = new DropdownMenu({
                className: '',
                target: els.menuBtn,
                renderTo: that.container,
                altPosition: function () {
                    var menuBtnDim = els.menuBtn.getDimensions(),
                        dropdownMenuDim = els.dropdownMenu.getContent().getDimensions(),
                        dropdownMenuPos;

                    // When widget body height is too small to display ddmenu below, display it on left of menu btn.
                    if (that.widgetHelper.getBody().getDimensions().height < menuBtnDim.height + dropdownMenuDim.height) {
                        dropdownMenuPos = {
                            x: - dropdownMenuDim.width,
                            y: 0
                        };
                    } else {
                        // Else display ddmenu below menu btn.
                        dropdownMenuPos = {
                            x: menuBtnDim.width - dropdownMenuDim.width,
                            y: menuBtnDim.height
                        };
                    }

                    return dropdownMenuPos;
                },
                items: [{
                    text: Nls.addNew,
                    fonticon: 'plus',
                    handler: function () {
                        that.controller.showAddLinkView();
                    }
                }, {
                    text: Nls.edit,
                    fonticon: 'pencil',
                    handler: function () {
                        that.controller.showEditLinkView();
                    }
                }, {
                    text: Nls.deleteBtn,
                    fonticon: 'trash',
                    handler: that.onDelete.bind(that)
                }],
                events: {
                    onShow: function () {
                        els.menuBtn.addClassName('active');
                    },
                    onHide: function () {
                        els.menuBtn.removeClassName('active');
                    }
                }
            });

            that.container.addContent([
                els.menuBtn
            ]);

            return that;
        },


        closeMenu: function () {
            this.elements.dropdownMenu.hide();
            return this;
        },


        /**
         * @param {Object} options - Options
         */
        show: function () {
            var that = this;

            if (!that.isRendered) {
                that.render().inject(that.widgetHelper.getBody());
                that.isRendered = true;
            }

            that.container.show();

            return that;
        },


        hide: function () {
            var container = this.container;

            container && container.hide();

            return this;
        },


        onDelete: function () {
            var that = this;

            new SuperModal({
                closable: true
            }).confirm(
                Nls.deleteLinkModalContent,
                Nls.deleteLinkModalTitle,
                function (result) {
                    result && that.controller.onDeleteMenuLink();
                },
                Nls.deleteLinkModalApplyBtn
            );

            return that;
        },


        onHeightOverflow: function (reset) {
            var that = this;

            that.container.setStyles({
                right: !reset ? Client.getScrollbarWidth() : null
            });

            return that;
        },


        onResize: function () {},


        destroy: function () {
            var that = this;

            that.widgetHelper = null;
            that.controller = null;
            that.isRendered = false;

            that._parent.apply(that, arguments);
        }
    });

    return Menu;
});
