/* global define */

define('DS/MediaLinksWdg/Components/Item', [
    // UWA
    'UWA/Core',
    'UWA/String',
    'UWA/Class/View',

    // UIKIT
    'DS/UIKIT/Image',
    'DS/UIKIT/Mask',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks',

    // CSS
    'css!DS/MediaLinksWdg/Components/Item'
],
function (
    // UWA
    UWA,
    UWAString,
    View,

    // UIKIT
    Image,
    Mask,

    // NLS
    Nls
) {
    'use strict';

    var DEFAULT_THUMB_CLASS = 'default-item',
        FIT_THUMB_POS_CLASS = 'pos-fit',
        FILL_THUMB_POS_CLASS = 'pos-fill',
        STRETCH_THUMB_POS_CLASS = 'pos-stretch',
        ORG_THUMB_POS_CLASS = 'pos-original',
        ROW_DIRECTION_CLASS = 'row',
        COLUMN_DIRECTION_CLASS = 'column',
        layout;

    layout = View.extend({

        tagName: 'div',

        className: 'item',

        widgetHelper: null,

        view: null,

        model: null,

        isRendered: false,

        wrapper: null,

        _isThumbnailLoadError: false,

        _isDefaultThumbnail: false,

        /**
         * @param {Object} options - Options
         * @param {Object} options.widgetHelper - Widget helper.
         * @param {Object} options.view - Links view instance.
         */
        setup: function (options) {
            options = options || {};

            var that = this;

            that.widgetHelper = options.widgetHelper;
            that.view = options.view;
            that.wrapper = options.wrapper;

            // that.listenTo(that.model, 'onChange:url', that.onLinkUrlChange.bind(that));
            // that.listenTo(that.model, 'onChange:thumbPos', that.onPositionChange.bind(that));
            // that.listenTo(that.model, 'onChange:tooltip', that.onTooltipChange.bind(that));
        },

        render: function () {
            var that = this;

            // setTimeout(that.renderImg.bind(that), 50);
            that.renderImg();

            return that;
        },

        renderImg: function () {
            var that = this,
                model = that.model,
                thumbUrl = model.getThumbUrl(),
                container = that.container,
                img, config;

            config = {
                className: 'img',
                events: {
                    onLoad: function (img) {
                        Mask.unmask(container);

                        img.setAttributes({ width: '', height: '' }); // Remove attributes put by Image UIKIT.
                        img.inject(container);

                        if (model.getUrlType() === 'video') {
                            container.addContent(
                                UWA.createElement('span', {
                                    'class': 'fonticon fonticon-4x fonticon-play play-icon'
                                })
                            );
                        }

                        that.onPositionChange();
                        that.dispatchLoadItem();
                    },
                    onError: function (img) {
                        that._isThumbnailLoadError = true;

                        Mask.unmask(container);

                        img.remove();

                        that.renderDefaultImg();
                        that.widgetHelper.showAlert({
                            msg: that.widgetHelper.replace(
                                Nls.failLoadThumb, { url: thumbUrl }
                            )
                        });
                    }
                }
            };

            if (thumbUrl) {
                that._isDefaultThumbnail = false;

                img = new Image(config);
                Mask.mask(container);
                img.load(thumbUrl);
            } else {
                that.renderDefaultImg();
            }

            return that;
        },

        renderDefaultImg: function () {
            var that = this,
                createElement = UWA.createElement,
                els = that.elements,
                container = that.container,
                model = that.model,
                imgCtn, infoCtn;

            imgCtn = createElement('div', {
                'class': 'default-img-ctn',
                html: [
                    createElement('img', {
                        'class': 'img default-img',
                        src: that.getDefaultImgUrl()
                    })
                ]
            });

            infoCtn = createElement('div', {
                'class': 'info-ctn',
                html: [
                    els.tooltipCtn = createElement('div', {
                        'class': 'tooltip-ctn',
                        text: model.getTooltip()
                    }),
                    els.linkUrlCtn = createElement('div', {
                        'class': 'url-ctn',
                        text: model.getLinkUrl()
                    })
                ]
            });

            container.addContent([
                infoCtn,
                imgCtn
            ]).addClassName(DEFAULT_THUMB_CLASS);

            if (model.getUrlType() === 'video') {
                container.addContent(
                    createElement('span', {
                        'class': 'fonticon fonticon-4x fonticon-play play-icon'
                    })
                );
            }

            that._isDefaultThumbnail = true;

            that.setPosDefault();

            return that;
        },

        show: function () {
            var that = this,
                isFreshRender = false;

            that.widgetHelper.removeAlert();

            if (that._isThumbnailLoadError) {
                that.isRendered = false;
                that._isThumbnailLoadError = false;
                that._resetView();
            }

            // If img not yet rendered.
            if (!that.isRendered) {
                that.render().inject(that.wrapper);
                that.isRendered = isFreshRender = true;
            }

            if (!isFreshRender) {
                that.onPositionChange();
                that.dispatchLoadItem();
            }

            that.container.show();

            return that;
        },

        hide: function () {
            var container = this.container;

            container && container.hide();

            return this;
        },

        isDefaultItem: function () {
            return this._isDefaultThumbnail;
        },

        getDefaultImgUrl: function () {
            return this.widgetHelper.getAssetsUrl() + '/picture.png';
        },

        getImg: function () {
            return this.container.getElement('.img');
        },

        getModel: function () {
            return this.model;
        },

        setPosDefault: function () {
            var that = this,
                defaultImgCtn = that.container.getElement('.default-img-ctn');

            if (that.widgetHelper.getBody().getDimensions().height < 200) {
                defaultImgCtn.hide();
            } else {
                defaultImgCtn.show();
            }

            return that;
        },

        setPosFit: function () {
            var that = this,
                css, dw, dh, adjustedWidth, adjustedHeight, img, widthImg,
                heightImg, containerDimensions, widthView, heightView, container;

            img = that.getImg();

            if (!img) {
                return;
            }

            container = that.container;
            containerDimensions = container.getDimensions();

            widthImg = img.naturalWidth;
            heightImg = img.naturalHeight;

            widthView = containerDimensions.width;
            heightView = containerDimensions.height;

            if (!widthImg || !heightImg || !widthView || !heightView) {
                return;
            }

            dw = widthView / widthImg;
            dh = heightView / heightImg;

            if (dh >= dw) {
                adjustedHeight = Math.round(widthView * heightImg / widthImg);
                css = { width: widthView, height: adjustedHeight };
            } else {
                adjustedWidth = Math.round(heightView * widthImg / heightImg);
                css = { width: adjustedWidth, height: heightView };
            }

            img.setStyles(css);

            that.removePosClassName();
            container.addClassName(FIT_THUMB_POS_CLASS);

            return that;
        },

        setPosFill: function () {
            var that = this,
                css, adjustedWidth, adjustedHeight, img, widthImg, dw, dh,
                heightImg, containerDimensions, widthView, heightView, container, direction;

            img = that.getImg();

            if (!img) {
                return;
            }

            container = that.container;
            containerDimensions = container.getDimensions();

            widthImg = img.naturalWidth;
            heightImg = img.naturalHeight;

            widthView = containerDimensions.width;
            heightView = containerDimensions.height;

            if (!widthImg || !heightImg || !widthView || !heightView) {
                return;
            }

            dw = widthView / widthImg;
            dh = heightView / heightImg;

            if (dw >= dh) {
                adjustedHeight = Math.round(widthView * heightImg / widthImg);
                css = { width: widthView, height: adjustedHeight };
                direction = ROW_DIRECTION_CLASS; // only used by ie11
            } else {
                adjustedWidth = Math.round(heightView * widthImg / heightImg);
                css = { width: adjustedWidth, height: heightView };
                direction = COLUMN_DIRECTION_CLASS; // only used by ie11
            }

            img.setStyles(css);

            that.removePosClassName();
            container
                .removeClassName(ROW_DIRECTION_CLASS) // only used by ie11
                .removeClassName(COLUMN_DIRECTION_CLASS) // only used by ie11
                .addClassName(FILL_THUMB_POS_CLASS + ' ' + direction);

            return that;
        },

        setPosStretch: function () {
            var that = this,
                img, containerDimensions, widthView,
                heightView, container;

            img = that.getImg();

            if (!img) {
                return;
            }

            container = that.container;
            containerDimensions = container.getDimensions();

            widthView = containerDimensions.width;
            heightView = containerDimensions.height;

            if (!widthView || !heightView) {
                return;
            }

            img.setStyles({
                width: widthView,
                height: heightView
            });

            that.removePosClassName();
            container.addClassName(STRETCH_THUMB_POS_CLASS);

            return that;
        },

        setPosOriginal: function () {
            var that = this,
                img, widthImg, heightImg;

            img = that.getImg();

            if (!img) {
                return;
            }

            widthImg = img.naturalWidth;
            heightImg = img.naturalHeight;

            if (!widthImg || !heightImg) {
                return;
            }

            img.setStyles({
                width: widthImg,
                height: heightImg
            });

            that.removePosClassName();
            that.container.addClassName(ORG_THUMB_POS_CLASS);

            return that;
        },

        removePosClassName: function () {
            var that = this,
                container = that.container;

            [
                ROW_DIRECTION_CLASS,
                COLUMN_DIRECTION_CLASS,
                FIT_THUMB_POS_CLASS,
                FILL_THUMB_POS_CLASS,
                STRETCH_THUMB_POS_CLASS,
                ORG_THUMB_POS_CLASS
            ].forEach(function (className) {
                container.removeClassName(className);
            });

            return that;
        },

        dispatchLoadItem: function () {
            var that = this;

            setTimeout(function () {
                that.view.dispatchEvent('onLoadItem');
            }, 0);

            return that;
        },

        onPositionChange: function () {
            var that = this;

            that['setPos' + (
                that.isDefaultItem()
                    ? 'Default'
                    : UWAString.ucfirst(that.model.getThumbPos()) || 'Fit'
            )]();

            return that;
        },

        onLinkUrlChange: function () {
            var that = this,
                els = that.elements;

            els.linkUrlCtn && els.linkUrlCtn.setText(that.model.getLinkUrl());

            return that;
        },

        onTooltipChange: function () {
            var that = this,
                els = that.elements;

            els.tooltipCtn && els.tooltipCtn.setText(that.model.getTooltip());

            return that;
        },

        onResize: function () {
            var that = this;

            that.onPositionChange();

            return that;
        },

        _resetView: function () {
            var that = this;

            that.removePosClassName();

            that.container.empty()
                .removeClassName(DEFAULT_THUMB_CLASS);

            Object.values(that.elements || {})
                .forEach(function (el) { el.destroy && el.destroy(); });

            that.elements = {};
        },

        destroy: function () {
            var that = this;

            // that.stopListening();

            that.widgetHelper = null;
            that.view = null;
            that.model = null;
            that.isRendered = false;

            that._isThumbnailLoadError = null;

            that._parent.apply(that, arguments);
        }
    });

    return layout;
});
