/* global define */

define('DS/MediaLinksWdg/Views/EditLink', [
    // UWA
    'UWA/Core',
    'UWA/String',
    'UWA/Utils',
    'UWA/Class/View',

    // UIKIT
    'DS/UIKIT/Input/Text',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/SuperModal',

    // WP
    'DS/UWPClientControls/Utils',

    // Nls
    'i18n!DS/MediaLinksWdg/assets/nls/MediaLinks',

    // Css
    'css!DS/MediaLinksWdg/Views/EditLink'
],
function (
    // UWA
    UWA,
    UWAString,
    UWAUtils,
    View,

    // UIKIT
    InputText,
    InputSelect,
    InputButton,
    SuperModal,

    // WP
    WUtils,

    // NLS
    Nls
) {
    'use strict';

    var EditLink = View.extend({

        tagName: 'div',

        className: 'edit-link-view view',

        widgetHelper: null,

        controller: null,

        linkModel: null,

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
                createElement = UWA.createElement,
                container = that.container,
                els = that.elements;

            els.linkUrlCtn = createElement('div', {
                'class': 'ctn',
                html: [
                    els.linkUrlTitle = createElement('div', {
                        'class': 'ctn-title',
                        text: Nls.linkUrl
                    }),
                    createElement('div', {
                        'class': '',
                        html: [
                            els.linkUrlInputText = new InputText({
                                className: 'input-link-url',
                                placeholder: Nls.linkUrlPlaceholder,
                                events: {
                                    onChange: that.onLinkUrlChange.bind(that)
                                }
                            })
                        ]
                    })
                ]
            });
            els.linkUrlInputText.elements.input.addEvent('keyup', that.onLinkUrlChange.bind(that));

            els.thumbUrlCtn = createElement('div', {
                'class': 'ctn',
                html: [
                    els.thumbUrlTitle = createElement('div', {
                        'class': 'ctn-title',
                        text: Nls.thumbUrl
                    }),
                    createElement('div', {
                        'class': '',
                        html: [
                            els.thumbUrlInputText = new InputText({
                                className: 'input-thumb-url',
                                placeholder: Nls.thumbUrlPlaceholder
                            }),
                            createElement('div', {
                                'class': 'subctn thumb-position-ctn',
                                html: [
                                    els.thumbPositionTitle = createElement('div', {
                                        'class': 'ctn-subtitle thumb-position-title',
                                        text: Nls.thumbPos
                                    }),
                                    els.thumbPositionInputSelect = new InputSelect({
                                        className: 'input-thumb-pos',
                                        custom: false,
                                        options: [
                                            { value: 'fit', label: Nls.fitPos },
                                            { value: 'fill', label: Nls.fillPos },
                                            { value: 'stretch', label: Nls.stretchPos },
                                            { value: 'original', label: Nls.orgPos }
                                        ]
                                    }),
                                ]
                            })
                        ]
                    })
                ]
            });
            els.thumbUrlInputText.elements.input.addEvent('keyup', that.onThumbUrlChange.bind(that));

            els.tooltipCtn = createElement('div', {
                'class': 'ctn',
                html: [
                    els.tootltipTitle = createElement('div', {
                        'class': 'ctn-title',
                        text: Nls.tooltip
                    }),
                    createElement('div', {
                        'class': '',
                        html: [
                            els.tooltipInputText = new InputText({
                                className: 'input-tooltip',
                                placeholder: Nls.tooltipPlaceholder
                            })
                        ]
                    })
                ]
            });

            els.btnsCtn = createElement('div', {
                'class': 'btns-ctn',
                html: [
                    els.deleteBtn = new InputButton({
                        className: 'warning delete-btn',
                        value: Nls.deleteBtn,
                        events: {
                            onClick: that.onDelete.bind(that)
                        }
                    }),
                    els.saveBtn = new InputButton({
                        className: 'primary save-btn',
                        value: '',
                        events: {
                            onClick: that.onSave.bind(that)
                        }
                    }),
                    els.cancelBtn = new InputButton({
                        className: 'default cancel-btn',
                        value: Nls.cancelBtn,
                        events: {
                            onClick: that.onCancel.bind(that)
                        }
                    }),
                ]
            });

            els.urlTypeInput = createElement('input', {
                'class': 'input-urltype',
                type: 'hidden',
                name: 'urlType'
            });

            container.addContent([
                els.inputsCtn = createElement('div', {
                    'class': 'inputs-ctn',
                    html: [
                        els.linkUrlCtn,
                        els.thumbUrlCtn,
                        els.tooltipCtn,
                        els.urlTypeInput
                    ]
                }),
                els.btnsCtn
            ]);

            return that;
        },

        /**
         * @param {Object} options - Options
         * @param {Object} [options.linkModel] - Link's model to edit.
         */
        show: function (options) {
            options = options || {};

            var that = this;

            if (!that.isRendered) {
                that.render().inject(that.widgetHelper.getBody());
                that.isRendered = true;
            }

            that.linkModel = options.linkModel || null;

            if (that.linkModel) {
                that.container.removeClassName('add');
                that.fillView(that.linkModel);
            } else {
                that.container.addClassName('add');
                that.emptyView();
            }

            that.container.show();

            that.onResize();

            return that;
        },

        hide: function () {
            var container = this.container;

            container && container.hide();

            return this;
        },

        fillView: function (model) {
            var that = this,
                els = that.elements,
                thumbUrl = model.getThumbUrl();

            els.linkUrlInputText.setValue(model.getLinkUrl());
            els.tooltipInputText.setValue(model.getTooltip());
            els.thumbUrlInputText.setValue(thumbUrl);
            els.urlTypeInput.setAttributes({ value: model.getUrlType() });

            els.thumbPositionInputSelect.select(model.getThumbPos() || 'fit', true);
            els.thumbPositionInputSelect[thumbUrl ? 'enable' : 'disable']();

            els.saveBtn.setValue(Nls.saveBtn);

            return that;
        },

        emptyView: function () {
            var that = this,
                els = that.elements;

            els.linkUrlInputText.setValue('');
            els.tooltipInputText.setValue('');
            els.thumbUrlInputText.setValue('');
            els.urlTypeInput.setAttributes({ value: '' });

            els.thumbPositionInputSelect
                .select('fit', true)
                .disable();

            els.saveBtn.setValue(Nls.addBtn);

            return that;
        },

        onSave: function () {
            var that = this,
                els = that.elements,
                linkHash;

            linkHash = {
                id: that.linkModel ? that.linkModel.getId() : '',
                url: that._getLinkUrlInputValue(),
                thumb: that._getThumbUrlInputValue(),
                thumbPos: els.thumbPositionInputSelect.getValue()[0],
                tooltip: els.tooltipInputText.getValue(),
                urlType: els.urlTypeInput.getAttribute('value')
            };

            that.controller.onSaveEditLink(linkHash);

            return that;
        },

        onCancel: function () {
            var that = this;

            that.container.hasClassName('add') && that.emptyView();

            that.controller.onCancelEditLink();

            return that;
        },

        onDelete: function () {
            var that = this,
                linkModel = that.linkModel;

            if (!linkModel) {
                return that;
            }

            new SuperModal({
                closable: true
            }).confirm(
                Nls.deleteLinkModalContent,
                Nls.deleteLinkModalTitle,
                function (result) {
                    result && that.controller.onDeleteEditLink(linkModel);
                },
                Nls.deleteLinkModalApplyBtn
            );

            return that;
        },

        onLinkUrlChange: WUtils.debounce(function () {
            var that = this,
                els = that.elements,
                linkUrl = that._getLinkUrlInputValue(),
                thumbUrl, parsedUrl, fileName, fileNameParts;

            if (!linkUrl) {
                return;
            }

            els.urlTypeInput.setAttributes({ value: '' });

            parsedUrl = UWAUtils.parseUrl(
                that.widgetHelper.formatUrl(linkUrl)
            );
            fileName = parsedUrl.fileName;

            if (fileName) {

                fileNameParts = fileName.split('.');

                if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp']
                    .indexOf(fileNameParts[fileNameParts.length - 1].toLowerCase()) >= 0) {
                    thumbUrl = that._getThumbUrlInputValue();

                    !thumbUrl && els.thumbUrlInputText.setValue(linkUrl);
                    that.onThumbUrlChange();
                } else if (['webm', 'mp4']
                    .indexOf(fileNameParts[fileNameParts.length - 1].toLowerCase()) >= 0) {
                    els.urlTypeInput.setAttributes({ value: 'video' });
                }
            }
        }, 200),

        onThumbUrlChange: function () {
            var that = this,
                els = that.elements,
                thumbUrlValue = that._getThumbUrlInputValue();

            els.thumbPositionInputSelect[thumbUrlValue ? 'enable' : 'disable']();

            return that;
        },

        onResize: function () {
            var that = this,
                container = that.container,
                inputsCtn = that.elements.inputsCtn,
                heightThreshold = 65,
                widthThreshold = 300;

            // Add overlfow class when view became small to avoid overlap btns and thumbnail preview.
            container.toggleClassName(
                'overflow',
                inputsCtn.getPosition(container).y < heightThreshold // Working with justify-content: flex-end on .edit-link-view.overflow rule.
                || container.getDimensions().width < widthThreshold
            );

            return that;
        },

        destroy: function () {
            var that = this;

            that.widgetHelper = null;
            that.controller = null;
            that.linkModel = null;
            that.isRendered = false;

            that._parent.apply(that, arguments);
        },

        _getLinkUrlInputValue: function () {
            return UWAString.stripTags(
                this.elements.linkUrlInputText.getValue() || ''
            ).trim();
        },

        _getThumbUrlInputValue: function () {
            return UWAString.stripTags(
                this.elements.thumbUrlInputText.getValue() || ''
            ).trim();
        }
    });

    return EditLink;
});
