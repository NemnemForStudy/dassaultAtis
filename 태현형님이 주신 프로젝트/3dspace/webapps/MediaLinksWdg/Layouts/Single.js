/* global define */

define('DS/MediaLinksWdg/Layouts/Single', [
    // UWA
    'UWA/Core',
    'UWA/Event',
    'UWA/Utils/Client',
    'UWA/Class/View',

    // UIKIT
    'DS/UIKIT/Touch',

    // MediaLinks
    'DS/MediaLinksWdg/Components/Item',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks',

    // Css
    'css!DS/MediaLinksWdg/Layouts/Single'
],
function (
    // UWA
    UWA,
    UWAEvent,
    Client,
    View,

    // UIKIT
    Touch,

    // MediaLinks
    Item,

    // NLS
    Nls
) {
    'use strict';

    var layout = View.extend({

        tagName: 'div',

        className: 'single-layout layout',

        widgetHelper: null,

        view: null,

        currentItem: null,

        items: null,

        scrollbarWidth: Client.getScrollbarWidth(),


        /**
         * @param {Object} options              - Options
         * @param {Object} options.widgetHelper - Widget helper.
         * @param {Object} options.view         - Links view instance.
         */
        setup: function (options) {
            options = options || {};

            var that = this;

            that.widgetHelper = options.widgetHelper;
            that.view = options.view;
            that.items = [];
        },


        render: function () {
            var that = this,
                createElement = UWA.createElement,
                els = that.elements,
                widgetHelper = that.widgetHelper,
                container = that.container,
                linkIds = widgetHelper.getLinkIds(),
                lastLinkDisplayed = widgetHelper.getLastLinkDisplayed(),
                touch = Touch(container),
                i, linkModel, linkId, linkUrl, wrapperItem;

            els.nextBtn = createElement('div', {
                'class': 'next-btn nav-btn',
                title: Nls.next,
                html: createElement('div', {
                    'class': 'next-ui-btn nav-ui-btn fonticon fonticon-open-right'
                }),
                events: {
                    click: that.showNextItem.bind(that)
                }
            });

            els.previousBtn = createElement('div', {
                'class': 'previous-btn nav-btn',
                title: Nls.previous,
                html: createElement('div', {
                    'class': 'previous-ui-btn nav-ui-btn fonticon fonticon-open-left'
                }),
                events: {
                    click: that.showPreviousItem.bind(that)
                }
            });

            touch.on('swipeleft', that.showNextItem.bind(that));
            touch.on('swiperight', that.showPreviousItem.bind(that));

            container.addContent([
                els.previousBtn,
                els.nextBtn
            ]);

            that.items = [];

            for (i = 0; i < linkIds.length; i++) {
                linkId = linkIds[i];
                linkModel = that.getModel(linkId);
                linkUrl = linkModel.getLinkUrl();

                wrapperItem = createElement('div', {
                    'class': 'wrapper-item ' + (linkUrl ? 'has-link' : ''),
                    id: 'item_' + linkId,
                    title: linkModel.getTooltip(),
                    data: {
                        id: linkId,
                        linkUrl: linkUrl
                    },
                    events: {
                        click: that.onItemClick.bind(that)
                    }
                }).inject(container).hide();

                that.items.push(
                    new Item({
                        model: linkModel,
                        widgetHelper: widgetHelper,
                        view: that,
                        wrapper: wrapperItem
                    })
                );
            }

            that.showItem(lastLinkDisplayed || linkIds[0]);

            // Hide nav btns if only 1 link to display.
            linkIds.length === 1 && that.hideNavBtn();

            return that;
        },

        hideNavBtn: function () {
            var that = this,
                els = that.elements;

            els.nextBtn.hide();
            els.previousBtn.hide();

            return that;
        },

        showItem: function (linkId) {
            var that = this,
                item = that.getItem(linkId),
                currentItem = that.currentItem;

            if (!item) {
                return that;
            }

            currentItem && currentItem.wrapper.hide();
            that.currentItem = item;

            item.wrapper.show();
            item.show();

            that.widgetHelper.setLastLinkDisplayed(linkId);

            return that;
        },


        showNextItem: function (event) {
            var that = this,
                linkIds = that.widgetHelper.getLinkIds(),
                currentId = that.currentItem.getModel().get('id'),
                nextIndex;

            if (event) {
                UWAEvent.stopPropagation(event);
                UWAEvent.preventDefault(event);
            }

            nextIndex = linkIds.indexOf(currentId) + 1;
            nextIndex = nextIndex < linkIds.length ? nextIndex : 0;

            that.showItem(linkIds[nextIndex]);

            return that;
        },


        showPreviousItem: function (event) {
            var that = this,
                linkIds = that.widgetHelper.getLinkIds(),
                currentId = that.currentItem.getModel().get('id'),
                previousIndex;

            if (event) {
                UWAEvent.stopPropagation(event);
                UWAEvent.preventDefault(event);
            }

            previousIndex = linkIds.indexOf(currentId) - 1;
            previousIndex = previousIndex >= 0 ? previousIndex : linkIds.length - 1;

            that.showItem(linkIds[previousIndex]);

            return that;
        },


        getCurrentItem: function () {
            return this.currentItem;
        },


        getCurrentModel: function () {
            return this.currentItem.getModel();
        },


        getItem: function (id) {
            return this.items.filter(function (item) {
                return item.getModel().get('id') === id;
            })[0];
        },

        getModel: function (id) {
            return this.view.controller && this.view.controller.linksCollection.get(id);
        },


        updateNavPosition: function (hasOverflowItem) {
            var that = this,
                scrollbarWidth = that.scrollbarWidth,
                els = that.elements,
                reset = false;

            // Update nav btns position only for orignal thumb postion due to scroll.
            if (that.currentItem.model.getThumbPos() === 'original') {
                hasOverflowItem = hasOverflowItem ? hasOverflowItem : that.hasOverflowCurrentItem();
            } else {
                reset = true;
                hasOverflowItem = {
                    width: false,
                    height: false
                };
            }

            els.nextBtn.setStyles({
                right: hasOverflowItem.height && !reset ? scrollbarWidth + 'px' : null,
                height: hasOverflowItem.width && !reset ? 'calc(100% - ' + scrollbarWidth + 'px)' : null
            });

            els.previousBtn.setStyles({
                height: hasOverflowItem.width && !reset ? 'calc(100% - ' + scrollbarWidth + 'px)' : null
            });

            that.view.controller.onHeightOverflow(!hasOverflowItem.height || reset);

            return that;
        },


        updateCurrentItemPosition: function (hasOverflowItem) {
            var that = this,
                currentItem = that.currentItem,
                currentItemCtn = currentItem.container;

            hasOverflowItem = hasOverflowItem ? hasOverflowItem : that.hasOverflowCurrentItem();

            // Add specific css for original thumb position to center thumb when no overflow.
            if (currentItem.model.getThumbPos() === 'original') {
                currentItemCtn
                    .toggleClassName('overflow-width', hasOverflowItem.width)
                    .toggleClassName('overflow-height', hasOverflowItem.height);
            } else {
                currentItemCtn
                    .removeClassName('overflow-width')
                    .removeClassName('overflow-height');
            }

            return that;
        },


        hasOverflowCurrentItem: function () {
            var currentItemCtn = this.currentItem.container;

            return {
                width: currentItemCtn.clientWidth !== currentItemCtn.scrollWidth,
                height: currentItemCtn.clientHeight !== currentItemCtn.scrollHeight
            };
        },


        onItemClick: function () {
            this.view.controller.onLinkClick(this.currentItem.getModel());
            return this;
        },


        onLoadItem: function () {
            this.updateCurrentItemPosition()
                .updateNavPosition();

            return this;
        },


        onDeleteItem: function (model) {
            var that = this,
                items = that.items,
                itemToDeleteIndex = items.indexOf(that.currentItem),
                itemToDelete;

            // Display next item if there is at least 2 item before deleting.
            items.length > 1 && that.showNextItem();

            // Remove item from items list.
            itemToDelete = items[itemToDeleteIndex];
            items.splice(itemToDeleteIndex, 1);
            itemToDelete.destroy();

            // Remove item wrapper.
            that.container.getElement('#item_' + model.getId()).remove();

            // Hide nav btns if only one item in the list.
            items.length === 1 && that.hideNavBtn();

            return that;
        },


        onResize: function () {
            var that = this,
                items = that.items,
                hasOverflowCurrentItem;

            if (!items) {
                return;
            }

            items.forEach(function (item) {
                item.onResize();
            });

            hasOverflowCurrentItem = that.hasOverflowCurrentItem();

            that.updateNavPosition(hasOverflowCurrentItem)
                .updateCurrentItemPosition(hasOverflowCurrentItem);

            return that;
        },


        destroy: function () {
            var that = this;

            that.widgetHelper = null;
            that.view = null;
            that.currentItem = null;

            that.items.forEach(function (item) {
                item.destroy();
            });
            that.items = null;

            that._parent.apply(that, arguments);
        }
    });

    return layout;
});
