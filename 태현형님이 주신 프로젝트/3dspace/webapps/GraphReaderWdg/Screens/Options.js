
/**
 * @overview GraphReader Screen Options.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Screens/Options',
[
    // UWA
    'UWA/Core',
    'UWA/Event',

    // UIKIT
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Input/Text',
    'DS/UIKIT/Input/Toggle',
    'DS/UIKIT/Alert',

    // W3DDComponents
    'DS/W3DDComponents/Views/RadioListView',

    // W3DXComponents
    'DS/W3DXComponents/Views/GraphView',

    // GraphReaderWdg
    'DS/GraphReaderWdg/Screens/Screen',

    // NLS
    'i18n!DS/GraphReaderWdg/assets/nls/GraphReader'
],

/**
 * @module DS/GraphReaderWdg/Screens/Options
 *
 * @requires UWA/Core
 * @requires UWA/Event
 *
 * @requires DS/UIKIT/Input/Button
 * @requires DS/UIKIT/Input/Text
 * @requires DS/UIKIT/Input/Toggle
 * @requires DS/UIKIT/Alert
 *
 * @requires DS/W3DDComponents/Views/RadioListView
 *
 * @requires DS/W3DXComponents/Views/GraphView
 *
 * @requires DS/GraphReaderWdg/Screens/Screen
 *
 * @requires i18n!DS/GraphReaderWdg/assets/nls/GraphReader
 */
function (
    // UWA
    UWA,
    UWAEvent,

    // UIKIT
    UIKITButton,
    UIKITInputText,
    UIKITInputToggle,
    UIKITAlert,

    // W3DDComponents
    RadioListView,

    // W3DXComponents
    GraphView,

    // GraphReaderWdg
    ScreenAbstract,

    // NLS
    Nls
) {
    'use strict';

    var GRAPH_TYPE_LINE = GraphView.TYPE_LINE,
        GRAPH_TYPE_COLUMN = GraphView.TYPE_COLUMN,
        GRAPH_TYPE_PIE = GraphView.TYPE_PIE,
        GRAPH_TYPE_DONUT = GraphView.TYPE_DONUT,
        GRAPH_TYPE_TABLE = GraphView.TYPE_TABLE,

        GRAPH_XAXIS_TYPE_LINEAR = GraphView.XAXIS_TYPE_LINEAR,
        GRAPH_XAXIS_TYPE_DATETIME = GraphView.XAXIS_TYPE_DATETIME,
        GRAPH_XAXIS_TYPE_CATEGORY = 'category',

        STACKING_NONE = GraphView.STACKING_NONE,
        STACKING_NORMAL = GraphView.STACKING_NORMAL,
        STACKING_PERCENT = GraphView.STACKING_PERCENT,

        DIV = 'div',
        RETURN_KEY = 'return',

        GRAPH_PREVIEW_MIN_WIDTH = 300,
        GRAPH_PREVIEW_MIN_HEIGHT = 200,
        ADVANCED_OPTIONS_HEIGHT = 562;



    var Screen = ScreenAbstract.extend({

        /**
         * @property {Integer} resizeTimeout - Resize timeout.
         * @private
         */
        resizeTimeout: 0,

        /**
         * @property {Boolean} _hasToDrawRealChart - If true, draw preview chart with all data.
         * @private
         */
        _hasToDrawRealChart: false,

        /**
         * @property {Boolean} _isAdvancedOptionOpened - If advanced options container is open.
         * @private
         */
        _isAdvancedOptionOpened: false,

        /**
         * @property {Boolean} _isScreenLoading.
         * @private
         */
        _isScreenLoading: true,

        /**
         * @property {Object} _currentCustomData.
         * @private
         */
        _currentCustomData: {},

        /**
         * @property {DS/W3DXComponents/Views/GraphView} _previewGraph - Graph view instance.
         * @private
         */
        _previewGraph: null,

        /**
         * @property {DS/UIKIT/Alert} _alert.
         * @private
         */
        _alert: null,



        // =========================
        // PUBLIC API
        // =========================


        /**
         * Show the screen.
         * @param {Object}  options            - Hash options.
         * @param {Boolean} options.isReadOnly - Is the widget is readOnly.
         */
        show: function (options) {
            var els,
                that = this;

            options = options || {};

            if (options.isReadOnly) {
                that.View.showGraphScreen();
                return;
            }

            that._isScreenLoading = true;
            that._currentCustomData = that.Model.getData();


            if (!that._isBuilt) {
                that._build();
                that._isBuilt = true;
            }

            // init vars
            els = that.elements;

            // Clear potentially checked data setted from home screen.
            that.Model.clearCheckedData();

            // Close advanced options if opened.
            if (that._isAdvancedOptionOpened) {
                that._toggleAdvancedOptions();
            }

            // Set chart name.
            els.graphTitleInput.setValue(that._currentCustomData.title || '');

            // Set advanced options.
            that._setAdvancedOptions(that._currentCustomData);

            // Set chart type. (Has to be the last one to execute, because uses advanced options)
            els.radioListType.setChecked(that._currentCustomData.type || GRAPH_TYPE_LINE);

            that._isScreenLoading = false;

            that._parent(options);

            // Update chart preview.
            that._updateGraphPreview();
        }, // End function show()


        resizeGraphPreview: function () {
            var dim, width,
                that = this;

            if (!that._previewGraph) {
                return;
            }

            dim = that.elements.graphPreviewCtn.getDimensions();
            width = dim.width - 20; // 20 is the offset to avoid the preview to resize in loop due to the overflow of the screen.

            if (width < GRAPH_PREVIEW_MIN_WIDTH) {
                width = GRAPH_PREVIEW_MIN_WIDTH;
            }

            that._previewGraph.setSize(width, GRAPH_PREVIEW_MIN_HEIGHT);
        },


        /**
         * Fired when the view is resized.
         */
        onResize: function () {
            var that = this;

            if (that.resizeTimeout) {
                clearTimeout(that.resizeTimeout);
                that.resizeTimeout = null;
            }

            that.resizeTimeout = setTimeout(that.resizeGraphPreview.bind(that), 1000);
        }, // End function onResize()


        /**
         * Destroy the screen.
         */
        destroy: function () {
            var that = this;

            if (that._previewGraph) {
                that._previewGraph.destroy();
            }
            that._previewGraph = null;

            if (that._alert) {
                that._alert.destroy();
            }
            that._alert = null;

            that._currentCustomData = {};

            that._hasToDrawRealChart = false;
            that._isAdvancedOptionOpened = false;
            that._isScreenLoading = true;

            that._parent();
        }, // End function destroy()




        // =========================
        // PRIVATE API
        // =========================


        /**
         * Draw the preview chart.
         * @private
         */
        _updateGraphPreview: function () {
            var width, type,
                that = this,
                els = that.elements,
                data = UWA.clone(that._currentCustomData),
                xAxisData = data.xAxis || {},
                graphPreviewCtn = els.graphPreviewCtn,
                originalData = that.Model.getOriginalData();

            // Get Options and Advanced Options.
            data.title = els.graphTitleInput.getValue();
            xAxisData.title = els.titleXAxisInput.getValue();
            xAxisData.type = els.radioListXAxisType.getChecked().value;
            data.yAxis = data.yAxis || {};
            data.yAxis.title = els.titleYAxisInput.getValue();
            data.unit = els.dataUnitInput.getValue();
            data.subtitle = ''; // Force removing subtitle.
            data.height = GRAPH_PREVIEW_MIN_HEIGHT; // Force height

            width = graphPreviewCtn.getDimensions().width;

            if (width < GRAPH_PREVIEW_MIN_WIDTH) {
                width = GRAPH_PREVIEW_MIN_WIDTH;
            }

            data.width = width; // Force width.
            type = data.type;

            // Get categories.
            xAxisData.categories = xAxisData.useCategories ? that._getCategoriesAdvOpts() : [];

            // Use all data in preview.
            that._hasToDrawRealChart = els.drawRealChartInput.isChecked();

            // Convert Original data into new chart type data for preview.
            data.series = originalData.series;

            if (that._alert) {
                that._alert.destroy();
            }

            try {
                data = that.Controller.convertDataType(
                    data,
                    data.originalType,
                    data.type, {
                        isPreview: !that._hasToDrawRealChart
                    }
                );
            } catch (e) {
                that._alert = new UIKITAlert({
                    className: 'alert',
                    closable: true,
                    visible: true,
                    messages: Nls.errorParsingData,
                    messageClassName: that.View.ALERT_ERROR_CLASS
                }).inject(graphPreviewCtn);
            }


            if ([GRAPH_TYPE_DONUT, GRAPH_TYPE_PIE].indexOf(type) >= 0) {
                data.expertOpts = data.expertOpts || {};

                UWA.extend(data.expertOpts, {
                    tooltip: {
                        formatter: function () {
                            return that.View.tooltipFormaterPie(this, data);
                        }
                    }
                }, true);
            }

            if (that._previewGraph) {
                that._previewGraph.destroy();
            }

            that._previewGraph = new GraphView(data)
                .render()
                .inject(graphPreviewCtn);
        }, // End _updateGraphPreview()


        /**
         * Fill advanced options inputs.
         * @private
         * @param {Object} currentCustomData - Current custom data.
         */
        _setAdvancedOptions: function (currentCustomData) {
            var xAxisType,
                that = this,
                els = that.elements,
                currentCustomDataxAxis = currentCustomData.xAxis || {},
                currentCustomDatayAxis = currentCustomData.yAxis || {},
                categoriesInput = els.categoriesInput,
                useCategories = currentCustomDataxAxis.useCategories;

            // Set categories.
            categoriesInput.setValue(currentCustomDataxAxis.categories.join(that.Controller.DEFAULT_CSV_STR_DELIMITER + ' ') || '');

            // Set chart x-axis title and type.
            if (useCategories) {
                xAxisType = GRAPH_XAXIS_TYPE_CATEGORY;
            } else {
                xAxisType = currentCustomDataxAxis.type || GRAPH_XAXIS_TYPE_LINEAR;
            }

            els.radioListXAxisType.setChecked(xAxisType);

            els.titleXAxisInput.setValue(currentCustomDataxAxis.title || '');

            // Set chart y-axis title.
            els.titleYAxisInput.setValue(currentCustomDatayAxis.title || '');

            // Set Unit.
            els.dataUnitInput.setValue(currentCustomData.unit || '');

            // Set stacking type.
            els.radioListStacking.setChecked(currentCustomData.stacking || STACKING_NONE);
        }, // End function _setAdvancedOptions()


        /**
         * Get categories from the advanced opts input categories.
         * @private
         * @return {String[]} List of categories enter by the user.
         */
        _getCategoriesAdvOpts: function () {
            var categoriesOptions,
                that = this,
                DEFAULT_CSV_STR_DELIMITER = that.Controller.DEFAULT_CSV_STR_DELIMITER,
                categoriesInput = that.elements.categoriesInput;

            // Get categories.
            categoriesOptions = categoriesInput.getValue().trim();

            if (categoriesOptions.charAt(0) === DEFAULT_CSV_STR_DELIMITER) {
                categoriesOptions = categoriesOptions.substr(1);
            }

            if (categoriesOptions.charAt(categoriesOptions.length - 1) === DEFAULT_CSV_STR_DELIMITER) {
                categoriesOptions = categoriesOptions.substr(0, categoriesOptions.length - 1);
            }

            // Update input with the clean value.
            categoriesInput.setValue(categoriesOptions);

            if (categoriesOptions) {
                categoriesOptions = categoriesOptions.split(DEFAULT_CSV_STR_DELIMITER);
                categoriesOptions = categoriesOptions.map(function (el) {
                    return el.trim();
                });
            }

            return categoriesOptions || [];
        }, // End function _getCategoriesAdvOpts()


        /**
         * Go to the Graph screen.
         * @private
         * @param {Event} e - Event of the next btn.
         */
        _goToGraphScreen: function (e) {
            var currentCustomDataxAxis,
                that = this,
                els = that.elements,
                radioListType = els.radioListType,
                widgetTitleInput = els.widgetTitleInput,
                graphTitleInput = els.graphTitleInput,
                radioListTypeCheckedItem = radioListType.getChecked(),
                widgetTitle = widgetTitleInput.getValue();

            UWAEvent.stop(e);

            if (!radioListTypeCheckedItem) {
                return;
            }

            // Force last screen to be Graph screen.
            that.Model.setPrefLastScreen(that.View.SCREEN_GRAPH);

            if (widgetTitle) {
                that.Model.setPrefTitle(widgetTitle);
            } else {
                that.Model.clearPrefTitle();
            }

            currentCustomDataxAxis = that._currentCustomData.xAxis;

            that._currentCustomData.title = graphTitleInput.getValue();
            that._currentCustomData.subtitle = ''; // Force removing subtitle.

            that._currentCustomData.type = radioListTypeCheckedItem.value;

            // get advanced options.
            currentCustomDataxAxis.title = els.titleXAxisInput.getValue();
            currentCustomDataxAxis.type = els.radioListXAxisType.getChecked().value;
            that._currentCustomData.yAxis.title = els.titleYAxisInput.getValue();
            that._currentCustomData.unit = els.dataUnitInput.getValue();
            that._currentCustomData.stacking = els.radioListStacking.getChecked().value;

            // Get categories.
            currentCustomDataxAxis.categories = that._getCategoriesAdvOpts();

            // Save graph data into widget data.
            that.Controller.onSetData(that._currentCustomData);
            that.View.showGraphScreen();

            // Clean some variable.
            that._currentCustomData = {};
            if (that._previewGraph) {
                that._previewGraph.destroy();
            }
        }, // End function _goToGraphScreen()


        /**
         * Toggle advanced options.
         * @private
         */
        _toggleAdvancedOptions: function () {
            var that = this,
                newHeight = !that._isAdvancedOptionOpened ? ADVANCED_OPTIONS_HEIGHT : 0,
                els = that.elements;

            els.advancedOptionsCtn.setStyles({
                height: newHeight
            });

            els.screenCtn.toggleClassName('advanced-options-show');

            that._isAdvancedOptionOpened = !that._isAdvancedOptionOpened;
        }, // End function _toggleAdvancedOptions()


        /**
         * Build advanced options.
         * @private
         */
        _buildAdvancedOptions: function () {
            var advancedOptionsCtn, titleXAxisInput, titleYAxisInput, drawRealChartInput,
                useFirstLineAsSeriesNameInput, useFirstRowAsCatInput, radioListXAxisType,
                radioListXAxisTypeCtn, dataUnitInput, radioListStackingCtn, timeoutCategories,
                radioListXAxisType, categoriesInput, advancedOptionsSubCtn,
                that = this,
                createElement = UWA.createElement,
                els = that.elements,
                form = els.form,
                xAxisData = that._currentCustomData.xAxis || {},
                yAxisData = that._currentCustomData.yAxis || {},
                stackingType = that._currentCustomData.stacking || STACKING_NONE,
                parsedDataXAxisType = xAxisData.type || GRAPH_XAXIS_TYPE_LINEAR,
                useCategories = xAxisData.useCategories;

            /**
             * @private
             */
            function onKeyDown (e) {
                if (UWAEvent.whichKey(e) === RETURN_KEY) {
                    that._updateGraphPreview();
                }
            } // End function onKeyDown()


            // =========================================
            // Start of function _buildAdvancedOptions()
            // =========================================

            // Advanced option ctn.
            advancedOptionsCtn = els.advancedOptionsCtn = createElement(DIV, {
                'class': 'advanced-options-ctn'
            }).inject(form);

            advancedOptionsSubCtn = createElement(DIV, {
                'class': 'adv-opts-sub-ctn'
            }).inject(advancedOptionsCtn);

            // Title of X Axis.
            advancedOptionsSubCtn.addContent({
                tag: DIV,
                'class': 'title',
                text: Nls.titlexAxis
            });

            // Input title X Axis.
            titleXAxisInput = els.titleXAxisInput = new UIKITInputText({
                className: 'gr-input-text xAxis-title-input',
                value: xAxisData.title || '',
                events: {
                    onKeyDown: onKeyDown
                }
            });

            // Sub ctn X Axis title.
            advancedOptionsSubCtn.addContent({
                tag: DIV,
                'class': 'flex sub-ctn',
                html: [{
                    tag: DIV,
                    'class': 'subtitle',
                    text: Nls.title
                }, titleXAxisInput]
            });

            radioListXAxisTypeCtn = createElement(DIV, {'class': 'xAxis-type'});

            // Sub ctn X Axis type.
            advancedOptionsSubCtn.addContent({
                tag: DIV,
                'class': 'flex sub-ctn',
                html: [{
                    tag: DIV,
                    'class': 'subtitle',
                    text: Nls.type
                }, radioListXAxisTypeCtn]
            });

            // xAxis type - Radio control.
            radioListXAxisType = els.radioListXAxisType = new RadioListView({
                displayRadio: true,
                items: [{
                    text: Nls.typeLinear,
                    value: GRAPH_XAXIS_TYPE_LINEAR,
                    checked: parsedDataXAxisType === GRAPH_XAXIS_TYPE_LINEAR && !useCategories
                }, {
                    text: Nls.typeDate,
                    value: GRAPH_XAXIS_TYPE_DATETIME,
                    checked: parsedDataXAxisType === GRAPH_XAXIS_TYPE_DATETIME
                }, {
                    text: Nls.typeCat,
                    value: GRAPH_XAXIS_TYPE_CATEGORY,
                    checked: useCategories || parsedDataXAxisType === GRAPH_XAXIS_TYPE_CATEGORY
                }],
                events: {
                    onCheckItem: function (itemRadio) {
                        var val = itemRadio.value,
                            currentCustomDataxAxis = that._currentCustomData.xAxis || {};

                        if (val === GRAPH_XAXIS_TYPE_CATEGORY) {
                            currentCustomDataxAxis.useCategories = true;

                            if (!categoriesInput.getValue().trim()) {
                                categoriesInput.setValue(that.Model.getOriginalData().xAxis.categories.join(that.Controller.DEFAULT_CSV_STR_DELIMITER + ' '));
                            }
                        } else {
                            currentCustomDataxAxis.useCategories = false;
                            currentCustomDataxAxis.type = val;
                        }

                        if (!that._isScreenLoading) {
                            that._updateGraphPreview();
                        }
                    }
                }
            }).render().inject(radioListXAxisTypeCtn);

            // Title of Y Axis.
            advancedOptionsSubCtn.addContent({
                tag: DIV,
                'class': 'title yAxis-title',
                text: Nls.titleyAxis
            });

            // Input title Y Axis.
            titleYAxisInput = els.titleYAxisInput = new UIKITInputText({
                className: 'gr-input-text',
                value: yAxisData.title || '',
                events: {
                    onKeyDown: onKeyDown
                }
            });

            // Sub ctn Y Axis title.
            advancedOptionsSubCtn.addContent({
                tag: DIV,
                'class': 'flex sub-ctn',
                html: [{
                    tag: DIV,
                    'class': 'subtitle',
                    text: Nls.title
                }, titleYAxisInput]
            });

            // Input Data unit.
            dataUnitInput = els.dataUnitInput = new UIKITInputText({
                className: 'gr-input-text',
                value: that._currentCustomData.unit || '',
                events: {
                    onKeyDown: onKeyDown
                }
            });

            // Title of Data unit.
            advancedOptionsSubCtn.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.titleDataUnit
            }, {
                tag: DIV,
                'class': 'dataUnit-input-ctn',
                html: dataUnitInput
            }]);

            radioListStackingCtn = createElement(DIV, {'class': 'stacking-type-ctn'});

            // ctn stacking type.
            advancedOptionsSubCtn.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.titleStacking
            }, {
                tag: DIV,
                'class': '',
                html: radioListStackingCtn
            }]);

            // Stacking type - Radio control.
            els.radioListStacking = new RadioListView({
                displayRadio: true,
                items: [{
                    text: Nls.stackingNone,
                    value: STACKING_NONE,
                    checked: stackingType === STACKING_NONE
                }, {
                    text: Nls.stackingNormal,
                    value: STACKING_NORMAL,
                    checked: stackingType === STACKING_NORMAL
                }, {
                    text: Nls.stackingPercent,
                    value: STACKING_PERCENT,
                    checked: stackingType === STACKING_PERCENT
                }],
                events: {
                    onCheckItem: function (itemRadio) {
                        that._currentCustomData.stacking = itemRadio.value;

                        if (!that._isScreenLoading) {
                            that._updateGraphPreview();
                        }
                    }
                }
            }).render().inject(radioListStackingCtn);

            // Use of data.
            useFirstLineAsSeriesNameInput = els.useFirstLineAsSeriesNameInput = new UIKITInputToggle({
                className: 'gr-input-toggle-switch',
                type: 'switch',
                value: 'firstLineAsSeriesName',
                label: Nls.titleDataFirstLine,
                checked: false
            });

            useFirstRowAsCatInput = els.useFirstRowAsCatInput = new UIKITInputToggle({
                className: 'gr-input-toggle-switch',
                type: 'switch',
                value: 'firstRowAsCat',
                label: Nls.titleDataFirstCol,
                checked: false
            });

            // ctn use af data.
            advancedOptionsSubCtn.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.titleUseDataAs,
                styles: {
                    display: 'none'
                }
            }, {
                tag: DIV,
                'class': 'use-data-as-ctn',
                html: [useFirstLineAsSeriesNameInput, useFirstRowAsCatInput],
                styles: {
                    display: 'none'
                }
            }]);

            // Input Categories.
            categoriesInput = els.categoriesInput = new UIKITInputText({
                className: 'gr-input-text',
                value: that._currentCustomData.xAxis.categories.join(that.Controller.DEFAULT_CSV_STR_DELIMITER + ' ') || '',
                events: {
                    onKeyDown: function (e) {
                        var that = this;

                        clearTimeout(timeoutCategories);

                        timeoutCategories = setTimeout(function () {
                            if (that.getValue()) {
                                radioListXAxisType.setChecked(GRAPH_XAXIS_TYPE_CATEGORY);
                            }
                        }, 2000);

                        onKeyDown(e);
                    }
                }
            });

            // Categories.
            advancedOptionsSubCtn.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.titleCategories
            }, {
                tag: DIV,
                'class': 'categories-input-ctn',
                html: categoriesInput
            }]);

            // Draw real chart in preview.
            drawRealChartInput = els.drawRealChartInput = new UIKITInputToggle({
                className: 'gr-input-toggle-switch',
                type: 'switch',
                value: 'drawRealChartInput',
                label: Nls.titleShowAllData,
                checked: that._hasToDrawRealChart,
                events: {
                    onChange: that._updateGraphPreview.bind(that)
                }
            });

            // ctn Draw real chart in preview.
            advancedOptionsSubCtn.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.titlePreview
            }, {
                tag: DIV,
                'class': 'preview-input-ctn',
                html: drawRealChartInput
            }]);
        }, // End function _buildAdvancedOptions()


        /**
         * Build th screen.
         * @private
         */
        _build: function () {
            var ctn, nextBtn, previousBtn, form, form, radioListType, radioListType,
                widgetTitleInput, graphTitleInput, graphPreviewCtn, refreshIcon,
                that = this,
                createElement = UWA.createElement,
                els = that.elements,
                currentDataType = that._currentCustomData.type || GRAPH_TYPE_LINE;


            // 1 - Main container of the screen.
            ctn = els.screenCtn = createElement(DIV, {
                'class': 'screen-options'
            }).inject(that.widgetBody);

            // 2 - Form.
            form = els.form = createElement('form', {
                'class' : 'form-options',
                events: {
                    submit: function (e) {
                        UWAEvent.preventDefault(e);
                        that._updateGraphPreview();
                    }
                }
            }).inject(ctn);

            // Input widget title
            widgetTitleInput = els.widgetTitleInput = new UIKITInputText({
                className: 'widget-title-input gr-input-text',
                placeholder: Nls.optionalPlaceholder,
                value: that.Model.getPrefTitle(),
                events: {
                    onKeyDown: function (e) {
                        var title;

                        if (UWAEvent.whichKey(e) === RETURN_KEY) {
                            title = widgetTitleInput.getValue();
                            if (title) {
                                that.Model.setPrefTitle(title);
                            } else {
                                that.Model.clearPrefTitle();
                            }
                        }
                    }
                }
            });

            // Title of graph main title.
            form.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.title
            }, {
                tag: DIV,
                'class': 'widgetTitle-input-ctn',
                html: widgetTitleInput
            }]);

            // Input graph main title
            graphTitleInput = els.graphTitleInput = new UIKITInputText({
                className: 'graph-title-input gr-input-text',
                placeholder: Nls.optionalPlaceholder,
                value: that._currentCustomData.title || '',
                events: {
                    onKeyDown: function (e) {
                        if (UWAEvent.whichKey(e) === RETURN_KEY) {
                            that._updateGraphPreview();
                        }
                    }
                }
            });

            // Title of graph main title.
            form.addContent([{
                tag: DIV,
                'class': 'title',
                text: Nls.titleChartName
            }, {
                tag: DIV,
                'class': 'graphTitle-input-ctn',
                html: graphTitleInput
            }]);

            // Title of graph type.
            form.addContent({
                tag: DIV,
                'class': 'title',
                text: Nls.titleChartType
            });

            // Graph type - Radio control
            radioListType = els.radioListType = new RadioListView({
                items: [{
                    text: Nls.typeLine,
                    value: GRAPH_TYPE_LINE,
                    icon: 'fonticon fonticon-chart-line',
                    checked: currentDataType === GRAPH_TYPE_LINE
                }, {
                    text: Nls.typeColumn,
                    value: GRAPH_TYPE_COLUMN,
                    icon: 'fonticon fonticon-chart-bar',
                    checked: currentDataType === GRAPH_TYPE_COLUMN
                }, {
                    text: Nls.typePie,
                    value: GRAPH_TYPE_PIE,
                    icon: 'fonticon fonticon-chart-pie',
                    checked: currentDataType === GRAPH_TYPE_PIE
                }, {
                    text: Nls.typeDonut,
                    value: GRAPH_TYPE_DONUT,
                    icon: 'fonticon fonticon-cd',
                    checked: currentDataType === GRAPH_TYPE_DONUT
                }, {
                    text: Nls.typeTable,
                    value: GRAPH_TYPE_TABLE,
                    icon: 'fonticon fonticon-doc-text',
                    checked: currentDataType === GRAPH_TYPE_TABLE
                }],
                events: {
                    onCheckItem: function (itemRadio) {
                        var originalData = that.Model.getOriginalData();

                        that._currentCustomData.type = itemRadio.value;

                        if (!that._isScreenLoading) {
                            that._updateGraphPreview();
                        }

                        that._currentCustomData.series = originalData.series;
                        that._currentCustomData.xAxis.categories = that._getCategoriesAdvOpts();

                        if (that._alert) {
                            that._alert.destroy();
                        }

                        try {
                            that._currentCustomData = that.Controller.convertDataType(
                                that._currentCustomData,
                                that._currentCustomData.originalType,
                                that._currentCustomData.type
                            );
                        } catch (e) {
                            that._alert = new UIKITAlert({
                                className: 'alert',
                                closable: true,
                                visible: true,
                                messages: Nls.errorParsingData,
                                messageClassName: that.View.ALERT_ERROR_CLASS
                            }).inject(graphPreviewCtn);
                        }
                    }
                }
            }).render().inject(
                createElement(DIV, {'class': 'graph-type-ctn'}).inject(form)
            );

            // Advanced options link
            form.addContent({
                tag: DIV,
                'class': 'advanced-options-link-ctn',
                html: {
                    tag: 'span',
                    'class': 'advanced-options-link link',
                    html: [{
                        tag: 'span',
                        'class': 'icon close-icon fonticon fonticon-right-dir'
                    }, {
                        tag: 'span',
                        'class': 'icon open-icon fonticon fonticon-down-dir'
                    }, {
                        tag: 'span',
                        'class': 'show-advanced-options',
                        text: Nls.showAdvOpts
                    }, {
                        tag: 'span',
                        'class': 'hide-advanced-options',
                        text: Nls.hideAdvOpts
                    }],
                    events: {
                        click: that._toggleAdvancedOptions.bind(that)
                    }
                }
            });

            // Build advanced options.
            // -----------------------
            that._buildAdvancedOptions();

            // graph preview
            refreshIcon = createElement('span', {
                'class': 'refresh-preview fonticon fonticon-cw',
                title: Nls.titleRefreshPreview,
                events: {
                    click: function () {
                        var CLICKED_CLASS = 'clicked',
                            icon = this;

                        if (icon.hasClassName(CLICKED_CLASS)) {
                            return;
                        }

                        icon.addClassName(CLICKED_CLASS);
                        that._updateGraphPreview();

                        icon.removeClassName(CLICKED_CLASS);
                    }
                }
            });

            graphPreviewCtn = els.graphPreviewCtn = createElement(DIV, {
                'class': 'graph-preview-ctn',
                html: {
                    tag: DIV,
                    'class': 'title',
                    html: [Nls.titlePreview, refreshIcon]
                }
            });

            els.previewsCtn = createElement(DIV, {
                'class': 'previews-ctn',
                html: graphPreviewCtn
            }).inject(form);

            // Next btn.
            nextBtn = new UIKITButton({
                className: 'gr-btn next-btn primary',
                value: Nls.doneBtn,
                events: {
                    onClick: that._goToGraphScreen.bind(that)
                }
            });

            // Previous btn.
            previousBtn = new UIKITButton({
                className: 'gr-btn previous-btn default',
                value: Nls.reviewDataBtn,
                events: {
                    onClick: function (e) {
                        UWAEvent.stop(e);
                        that.View.showHomeScreen();
                    }
                }
            });

            // Btn container to align btn to right.
            form.addContent({
                tag: DIV,
                'class': 'nav-btn-ctn',
                html: [nextBtn, previousBtn]
            });
        } // End function _build()
    });


    /**
     * Screen name.
     * @constant {String} NAME
     * @memberOf module:DS/GraphReaderWdg/Screens/Options
     */
    Screen.NAME = 'options';


    return Screen;
});
