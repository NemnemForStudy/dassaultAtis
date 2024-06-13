/**
 * @overview GraphReader View.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/View',
[
    // UWA
    'UWA/Core',
    'UWA/Event',
    'UWA/Class/Model',
    'UWA/Json',
    'UWA/Class',

    // UIKIT
    'DS/UIKIT/Input/Button',
    'DS/UIKIT/Input/Select',
    'DS/UIKIT/Alert',
    'DS/UIKIT/Modal',

    // DS/W3DXComponents
    'DS/W3DXComponents/Views/GraphView',

    // GraphReader Screens
    'DS/GraphReaderWdg/Screens/Home',
    'DS/GraphReaderWdg/Screens/Options',
    'DS/GraphReaderWdg/Screens/Graph',
    'DS/GraphReaderWdg/Screens/Denied',

    // NLS
    'i18n!DS/GraphReaderWdg/assets/nls/GraphReader',

    // CSS
    'css!DS/GraphReaderWdg/View'
],

/**
 * @module DS/GraphReaderWdg/View
 *
 * @requires UWA/Core
 * @requires UWA/Event
 * @requires UWA/Class/Model
 * @requires UWA/Json
 * @requires UWA/Class
 *
 * @requires DS/UIKIT/Input/Button
 * @requires DS/UIKIT/Input/Select
 * @requires DS/UIKIT/Alert
 * @requires DS/UIKIT/Modal
 *
 * @requires DS/W3DXComponents/Views/GraphView
 *
 * @requires DS/GraphReaderWdg/Screens/Home
 * @requires DS/GraphReaderWdg/Screens/Options
 * @requires DS/GraphReaderWdg/Screens/Graph
 * @requires DS/GraphReaderWdg/Screens/Denied
 *
 * @requires i18n!DS/GraphReaderWdg/assets/nls/GraphReader
 *
 * @requires css!DS/GraphReaderWdg/View
 */
function (
    // UWA
    UWA,
    UWAEvent,
    Model,
    Json,
    Class,

    // UIKIT
    UIKITButton,
    UIKITInputSelect,
    UIKITAlert,
    UIKITModal,

    // W3DXComponents
    GraphView,

    // GraphReader Screens
    HomeScreen,
    OptionsScreen,
    GraphScreen,
    DeniedScreen,

    // NLS
    Nls
) {
    'use strict';

    var GRAPH_TYPE_LINE = GraphView.TYPE_LINE,
        GRAPH_TYPE_COLUMN = GraphView.TYPE_COLUMN,
        GRAPH_TYPE_PIE = GraphView.TYPE_PIE,
        GRAPH_TYPE_DONUT = GraphView.TYPE_DONUT,
        GRAPH_TYPE_TABLE = GraphView.TYPE_TABLE,

        SCREEN_HOME = HomeScreen.NAME,
        SCREEN_OPTS = OptionsScreen.NAME,
        SCREEN_GRAPH = GraphScreen.NAME,

        ALERT_ERROR_CLASS = 'error',
        ALERT_WARNING_CLASS = 'warning',
        ALERT_INFO_CLASS = 'info',
        DISABLED_VIEW_CLASS = 'gr-disable',

        FROM_DRAGNCOMPARE = 'dragNcompareFeature',
        DRAGNCOMPARE_MIME_TYPE = 'Text';


    var View = Class.extend({

        /**
         * @constant {String} ALERT_ERROR_CLASS - Class for ERROR alert message.
         */
        ALERT_ERROR_CLASS: ALERT_ERROR_CLASS,

        /**
         * @constant {String} ALERT_WARNING_CLASS - Class for WARNING alert message.
         */
        ALERT_WARNING_CLASS: ALERT_WARNING_CLASS,

        /**
         * @constant {String} ALERT_INFO_CLASS - Class for INFO alert message.
         */
        ALERT_INFO_CLASS: ALERT_INFO_CLASS,

        /**
         * @constant {String} SCREEN_HOME - Screen home name.
         */
        SCREEN_HOME: HomeScreen.NAME,

        /**
         * @constant {String} SCREEN_OPTS - Screen options name.
         */
        SCREEN_OPTS: OptionsScreen.NAME,

        /**
         * @constant {String} SCREEN_GRAPH - Screen graph name.
         */
        SCREEN_GRAPH: GraphScreen.NAME,



        // PUBLIC vars
        // -----------

        /**
         * @property {DS/GraphReaderWdg/Model} Model - GraphReader Model instance.
         */
        Model: null,

        /**
         * @property {DS/GraphReaderWdg/Controller} Controller - GraphReader Controller instance.
         */
        Controller: null,

        /**
         * @property {UWA/Element} widgetBody - Widget body element.
         */
        widgetBody: null,

        /**
         * @property {DS/GraphReaderWdg/Screens/Home} HomeScreen - GraphReader Home screen instance.
         */
        HomeScreen: null,

        /**
         * @property {DS/GraphReaderWdg/Screens/Options} OptionsScreen - GraphReader Options screen instance.
         */
        OptionsScreen: null,

        /**
         * @property {DS/GraphReaderWdg/Screens/Graph} GraphScreen - GraphReader Graph screen instance.
         */
        GraphScreen: null,

        /**
         * @property {DS/GraphReaderWdg/Screens/Graph} GraphScreen - GraphReader Graph screen instance.
         */
        DeniedScreen: null,




        // PRIVATE vars
        // ------------

        /**
         * @property {Boolean} _isHomeScreenDisplay.
         * @private
         */
        _isHomeScreenDisplay: false,

        /**
         * @property {Boolean} _isOptionsScreenDisplay.
         * @private
         */
        _isOptionsScreenDisplay: false,

        /**
         * @property {Boolean} _isGraphScreenDisplay.
         * @private
         */
        _isGraphScreenDisplay: false,

        /**
         * @property {Boolean} _isDragNcompareActive.
         * @private
         */
        _isDragNcompareActive: false,

        /**
         * @property {Boolean} _isDropSuccess.
         * @private
         */
        _isDropSuccess: true,

        /**
         * @property {Boolean} _isDragging.
         * @private
         */
        _isDragging: false,

        /**
         * @property {Boolean} _isDisabled.
         * @private
         */
        _isDisabled: false,

        /**
         * @property {Integer} _timeoutDraggingEnd.
         * @private
         */
        _timeoutDraggingEnd: null,

        /**
         * @property {String} _currentScreenDisplay.
         * @private
         */
        _currentScreenDisplay: '',

        /**
         * @property {Boolean} _hasAccessToExistingData.
         * @private
         */
        _hasAccessToExistingData: true,



        // =========================
        // PUBLIC API
        // =========================


        /**
         * Init the GraphReader View. Init the three views: Home ; Options ; Graph.
         * @param {Object}                       options            - Hash options.
         * @param {Element}                      options.widgetBody - Widget body DOM element.
         * @param {DS/GraphReaderWdg/Model}      options.Model      - GraphReader Model instance.
         * @param {DS/GraphReaderWdg/Controller} options.Controller - GraphReader Controller instance.
         */
        init: function (options) {
            var widgetBody,
                that = this;

            options = options || {};

            that.widgetBody = widgetBody = options.widgetBody;
            that.Model = options.Model;
            that.Controller = options.Controller;

            // Add drag and drop listener.
            widgetBody.addEventListener('dragenter', that._dragOver.bind(that), false);
            widgetBody.addEventListener('dragover', that._dragOver.bind(that), false);
            widgetBody.addEventListener('dragleave', that._dragLeave.bind(that), false);
            widgetBody.addEventListener('dragend', that._dragEnd.bind(that), false);
            widgetBody.addEventListener('drop', that._drop.bind(that), false);

            that.HomeScreen = new HomeScreen({
                widgetBody: widgetBody,
                Model: that.Model,
                View: that,
                Controller: that.Controller
            });

            that.OptionsScreen = new OptionsScreen({
                widgetBody: widgetBody,
                Model: that.Model,
                View: that,
                Controller: that.Controller
            });

            that.GraphScreen = new GraphScreen({
                widgetBody: widgetBody,
                Model: that.Model,
                View: that,
                Controller: that.Controller
            });

            that.DeniedScreen = new DeniedScreen({
                widgetBody: widgetBody,
                Model: that.Model,
                View: that,
                Controller: that.Controller
            });
        }, // End function init()


        /**
         * Start the drag for drag and compare feature.
         * @param {Event} event - Drag event, containing the data transfer.
         */
        dragStart: function (event) {
            var that = this,
                currentDataToDrag = that.Model.getData();

            if (currentDataToDrag.container) {
                delete currentDataToDrag.container;
            }

            currentDataToDrag.from = FROM_DRAGNCOMPARE;

            event.dataTransfer.setData(
                DRAGNCOMPARE_MIME_TYPE,
                JSON.stringify(currentDataToDrag)
            );

            that._isDragNcompareActive = true;
        }, // End function dragStart()


        /**
         * Is the user is dragging over the GraphReader widget.
         * @return {Boolean} Is the user is dragging over the GraphReader widget.
         */
        isDragging: function () {
            return this._isDragging;
        },  // End function isDragging()


        /**
         * Tooltip formater for pie chart.
         * @param {Object} highchartsData - Highcharts data.
         * @param {Object} data           - GraphReader widget data of the graph.
         * @return {String} Tool tip content to display over the hovered pie section.
         */
        tooltipFormaterPie: function (highchartsData, data) {
            var key = highchartsData.key || '';

            return (key ? '<b>' + key.escapeHTML() + '</b>' : '') +
                '<br/>Total: <b>' + highchartsData.y + '</b> (' + (Math.round(highchartsData.percentage * 100) / 100) +
                ' %)<br/>' + (data.tooltipSeries ? data.tooltipSeries[key] || '' : '') + '';
        }, // End function tooltipFormaterPie()


        /**
         * Show a screen.
         * @param {String}  screenName   - Name of screen to show.
         * @param {Boolean} forceRefresh - Force the refresh of the screen if it is already displayed.
         */
        showScreen: function (screenName, forceRefresh) {
            var that = this,
                Controller = that.Controller,
                isReadOnly = Controller.isReadOnly();

            function fireOnShowScreen (screenName) {
                Controller.onShowScreen(screenName);
            }

            screenName = screenName || SCREEN_HOME;

            if (isReadOnly) {
                screenName = SCREEN_GRAPH;
            }

            // If the screen is already displayed.
            if (screenName === that._currentScreenDisplay && !forceRefresh) {
                fireOnShowScreen(screenName);
                return;
            }

            if (!isReadOnly) {
                that.Model.setPreviousScreen(that.Model.getPrefLastScreen());
                that.Model.setPrefLastScreen(screenName);
            }

            that._currentScreenDisplay = screenName;

            that.DeniedScreen.hide();

            switch (screenName) {
            case SCREEN_HOME:
                that.OptionsScreen.hide();
                that.GraphScreen.hide();

                that._isOptionsScreenDisplay = false;
                that._isGraphScreenDisplay = false;

                that._isHomeScreenDisplay = true;

                that.HomeScreen.show({
                    isReadOnly: isReadOnly
                });

                break;

            case SCREEN_OPTS:
                that.HomeScreen.hide();
                that.GraphScreen.hide();

                that._isHomeScreenDisplay = false;
                that._isGraphScreenDisplay = false;

                that._isOptionsScreenDisplay = true;
                that.OptionsScreen.show({
                    isReadOnly: isReadOnly
                });

                break;

            case SCREEN_GRAPH:
                that.HomeScreen.hide();
                that.OptionsScreen.hide();

                that._isHomeScreenDisplay = false;
                that._isOptionsScreenDisplay = false;

                that._isGraphScreenDisplay = true;

                that.GraphScreen.show({
                    isReadOnly: isReadOnly
                });

                break;
            }

            fireOnShowScreen(screenName);
        }, // End function showScreen()


        /**
         * Show the Home screen.
         * @param {Boolean} forceRefresh - Force the refresh of the screen if it is already displayed.
         */
        showHomeScreen: function (forceRefresh) {
            this.showScreen(SCREEN_HOME, forceRefresh);
        },  // End function showHomeScreen()


        /**
         * Show the Options screen.
         * @param {Boolean} forceRefresh - Force the refresh of the screen if it is already displayed.
         */
        showOptionsScreen: function (forceRefresh) {
            this.showScreen(SCREEN_OPTS, forceRefresh);
        },  // End function showOptionsScreen()


        /**
         * Show the Graph screen.
         * @param {Boolean} forceRefresh - Force the refresh of the screen if it is already displayed.
         */
        showGraphScreen: function (forceRefresh) {
            this.showScreen(SCREEN_GRAPH, forceRefresh);
        },  // End function showGraphScreen()


        /**
         * Show the Denied screen.
         */
        showDeniedScreen: function () {
            var that = this;

            that.HomeScreen.hide();
            that._isHomeScreenDisplay = false;

            that.OptionsScreen.hide();
            that._isOptionsScreenDisplay = false;

            that.GraphScreen.hide();
            that._isGraphScreenDisplay = false;

            that.DeniedScreen.show();
        },  // End function showGraphScreen()


        /**
         * Show the Denied screen.
         */
        hideDeniedScreen: function () {
            this.DeniedScreen.hide();
        },


        /**
         * Show only some series, hide the others.
         * @param {options}  options              - Options hash.
         * @param {Boolean}  options.showAll      - Show all series.
         * @param {String[]} options.seriesToShow - List of series name to show.
         * @param {Object}   options.filteredData - Graph data of which show/hide series.
         *
         * @return {Object} filteredData - Data with showed/hidden series.
         */
        showSelectiveSeries: function (options) {
            var chartType, seriesToShow, showAll, filteredData,
                that = this;

            /**
             * @private
             */
            function showPieSerie (filteredData, seriesToShow) {
                var i, nbData, section, sectionName, series, data,
                    highcharts = that.GraphScreen._theGraph._highcharts;

                if (!highcharts) {
                    that.GraphScreen.drawTheGraph();
                    return;
                }

                series = highcharts.series || [];
                data = series[0].data || [];

                for (i = 0, nbData = data.length; i < nbData; i++) {
                    section = data[i];
                    sectionName = '' + (section.name || section[0]);

                    if (!showAll && seriesToShow.indexOf(sectionName) < 0) {
                        section.setVisible(false, false);
                    } else if (!section.visible) {
                        section.setVisible(true, false);
                    }
                }

                highcharts.redraw();

                return filteredData;
            } // End function showPieSerie()

            /**
             * @private
             */
            function showLineSerie (filteredData, seriesToShow) {
                var i, serie, series,
                    highcharts = that.GraphScreen._theGraph._highcharts;

                if (!highcharts) {
                    that.GraphScreen.drawTheGraph();
                    return;
                }

                series = highcharts.series || [];

                for (i = series.length - 1; i >= 0; i--) {
                    serie = series[i];

                    serie.setVisible((showAll || seriesToShow.indexOf(serie.name) >= 0), false);
                }

                highcharts.redraw();

                return filteredData;
            } // End function showLineSerie()

            /**
             * @private
             */
            function showTableSerie (filteredData, seriesToShow) {
                var i, j, nbColumns, column, series, serie, columns, rows, nbRow, nbColumns;

                if (!showAll) {

                    series = filteredData.series || [],
                    serie = series[0] || {},
                    columns = serie.columns || [],
                    rows = serie.data || [],
                    nbRow = rows.length,
                    nbColumns = nbRow ? rows[0].length : 0;

                    // For each columns.
                    for (i = nbColumns - 1; i >= 0; i--) {
                        column = columns[i];

                        if (seriesToShow.indexOf(column) < 0) {
                            columns.splice(i, 1); // Remove the hidden column name.

                            // For each row, remove hidden column.
                            for (j = 0; j < nbRow; j++) {
                                rows[j].splice(i, 1);
                            }
                        }
                    }

                }

                that.GraphScreen.drawTheGraph(filteredData);

                return filteredData;
            } // End function showTableSerie()


            // =======================================
            // Start of function showSelectiveSeries()
            // =======================================

            options = options || {};
            showAll = options.showAll;
            seriesToShow = options.seriesToShow || [];
            filteredData = options.filteredData || {};

            if (!that._isGraphScreenDisplay) {
                return;
            }

            chartType = that.Model.getDataType();

            // Series name tags.
            // -----------------
            switch (chartType) {

            case GRAPH_TYPE_PIE:
            case GRAPH_TYPE_DONUT:
                filteredData = showPieSerie(filteredData, seriesToShow);
                break;

            case GRAPH_TYPE_LINE:
            case GRAPH_TYPE_COLUMN:
                filteredData = showLineSerie(filteredData, seriesToShow);
                break;

            case GRAPH_TYPE_TABLE:
                filteredData = showTableSerie(filteredData, seriesToShow);
            }

            return filteredData;
        }, // End function showSelectiveSeries()


        /**
         * Show only some categories, hide the others.
         * @param {options}  options              - Options hash.
         * @param {Boolean}  options.showAll      - Show all categories.
         * @param {String[]} options.catToShow    - List of categories name to show.
         * @param {Object}   options.filteredData - Graph data of which show/hide categories.
         *
         * @return {Object} filteredData - Data with showed/hidden categories.
         */
        showSelectiveCategories: function (options) {
            var chartType, filteredData, categories, showAll, catToShow,
                that = this;

            /**
             * @private
             */
            function showLineCategories (filteredData, catToShow) {
                var i, u, data, serie, catIndex, newData, nbCat,
                    series = filteredData.series,
                    nbSeries = series.length;

                // For every series.
                for (u = nbSeries - 1; u >= 0; u--) {
                    newData = [];
                    serie = series[u] || {};
                    data = serie.data || [];

                    if (!data.length) {
                        continue;
                    }

                    // For every categories to show.
                    for (i = 0, nbCat = catToShow.length; i < nbCat; i++) {

                        catIndex = categories.indexOf(catToShow[i]);

                        if (catIndex < 0) {
                            continue;
                        }

                        newData.push(data[catIndex]);
                    }

                    // Override data by showed categories data.
                    serie.data = newData;
                }

                return filteredData;
            } // End function showLineCategories()

            /**
             * @private
             */
            function showPieCategories (filteredData, catToShow) {
                var i, u, data, serie, catIndex, newData, nbCat, originalData,
                    series = filteredData.series,
                    nbSeries = series.length,
                    originalType = filteredData.originalType,
                    type = filteredData.type;

                if ([GRAPH_TYPE_PIE, GRAPH_TYPE_DONUT].indexOf(originalType) >= 0) {
                    // For every series.
                    for (u = nbSeries - 1; u >= 0; u--) {
                        newData = [];
                        serie = series[u] || {};
                        data = serie.data || [];

                        if (!data.length) {
                            continue;
                        }

                        // For every categories to show.
                        for (i = 0, nbCat = catToShow.length; i < nbCat; i++) {

                            catIndex = categories.indexOf(catToShow[i]);

                            if (catIndex < 0) {
                                continue;
                            }

                            newData.push(data[catIndex]);
                        }

                        // Override data by showed categories data.
                        serie.data = newData;
                    }
                } else {
                    originalData = that.Model.getOriginalData();
                    if (originalType === GRAPH_TYPE_TABLE) {
                        filteredData = showTableCategories(originalData, catToShow);
                    } else {
                        filteredData = showLineCategories(originalData, catToShow);
                    }

                    filteredData = that.Controller.convertDataType(filteredData, originalType, type);
                    filteredData.type = type;
                }

                return filteredData;
            } // End function showPieCategories

            /**
             * @private
             */
            function showTableCategories (filteredData, catToShow) {
                var i, data, serie, catIndex, nbCat,
                    newData = [],
                    series = filteredData.series,
                    serie = series[0] || {},
                    data = serie.data || [];

                // For every categories to show.
                for (i = 0, nbCat = catToShow.length; i < nbCat; i++) {

                    catIndex = categories.indexOf(catToShow[i]);

                    if (catIndex < 0) {
                        continue;
                    }

                    newData.push(data[catIndex]);
                }

                // Override data by showed categories data.
                serie.data = newData;

                return filteredData;
            } // End function showTableCategories



            // ===========================================
            // Start of function showSelectiveCategories()
            // ===========================================

            options = options || {};
            showAll = options.showAll;
            catToShow = options.catToShow || [];
            filteredData = options.filteredData || {};

            chartType = that.Model.getDataType();

            if (!that._isGraphScreenDisplay) {
                return;
            }

            categories = filteredData.xAxis ? filteredData.xAxis.categories || [] : [];

            if (!showAll && categories.length) {

                catToShow.sort(function (a, b) {
                    return categories.indexOf(a) > categories.indexOf(b);
                });

                switch (chartType) {

                case GRAPH_TYPE_PIE:
                case GRAPH_TYPE_DONUT:
                    filteredData = showPieCategories(filteredData, catToShow);
                    break;

                case GRAPH_TYPE_LINE:
                case GRAPH_TYPE_COLUMN:
                    filteredData = showLineCategories(filteredData, catToShow);
                    break;

                case GRAPH_TYPE_TABLE:
                    filteredData = showTableCategories(filteredData, catToShow);
                }

                filteredData.xAxis.categories = catToShow;

                if (catToShow.length === 1) {
                    filteredData.showPlot = true;
                }
            }

            that.GraphScreen.drawTheGraph(filteredData);

            return filteredData;
        }, // End function showSelectiveCategories()


        /**
         * Show all series.
         * @param {options} options              - Options hash.
         * @param {Object}  options.filteredData - Graph data of which show/hide series.
         */
        showAllSeries: function (options) {
            options = options || {};
            this.showSelectiveSeries({
                filteredData: options.filteredData,
                showAll: true
            });
        }, // End function showSelectiveSeries()


        /**
         * Show all categories.
         * @param {options} options              - Options hash.
         * @param {Object}  options.filteredData - Graph data of which show/hide categories.
         */
        showAllCategories: function (options) {
            options = options || {};
            this.showSelectiveCategories({
                filteredData: options.filteredData,
                showAll: true
            });
        }, // End function showSelectiveSeries()


        /**
         * Is the Home screen is currently dispayed.
         * @return {Boolean} Is the Home screen is currently dispayed.
         */
        isHomeScreenDisplay: function () {
            return this._isHomeScreenDisplay;
        }, // End function isHomeScreenDisplay()


        /**
         * Is the Options screen is currently dispayed.
         * @return {Boolean} Is the Options screen is currently dispayed.
         */
        isOptionsScreenDisplay: function () {
            return this._isOptionsScreenDisplay;
        }, // End function isOptionsScreenDisplay()


        /**
         * Is the Graph screen is currently dispayed.
         * @return {Boolean} Is the Graph screen is currently dispayed.
         */
        isGraphScreenDisplay: function () {
            return this._isGraphScreenDisplay;
        }, // End function isGraphScreenDisplay()


        /**
         * Disable the view.
         */
        disable: function () {
            var that = this;

            if (that.widgetBody) {
                that.widgetBody.addClassName(DISABLED_VIEW_CLASS);
            }

            that._isDisabled = true;
            that.Controller.onDisableView();
        }, // End function disable()


        /**
         * Enable the view.
         * @param {Boolean} reset - If TRUE, display the graph without filters.
         */
        enable: function (reset) {
            var currentData,
                that = this;

            if (that.widgetBody) {
                that.widgetBody.removeClassName(DISABLED_VIEW_CLASS);
            }

            that._isDisabled = false;

            if (reset) {
                currentData = that.Model.getData();

                that.showAllSeries({
                    filteredData: currentData
                });

                that.showAllCategories({
                    filteredData: currentData
                });
            }

            that.Controller.onEnableView();
        }, // End function enable()


        /**
         * Fired when the view is resized.
         */
        onResize: function () {
            var that = this;

            if (that._isGraphScreenDisplay) {

                that.GraphScreen.onResize();

            } else if (that._isOptionsScreenDisplay) {

                that.OptionsScreen.onResize();
            }
        }, // End function onResize()


        /**
         * Fired on view change (Maximize/Minimize).
         */
        onViewChange: function () {
            this.onResize();
        }, // End function onViewChange()


        /**
         * Ask to the user which csv separator to use. (";" or ",")
         * and save it into widget pref.
         * @param {function} callback - callback function to fire when the user has choosen its csv separator. (Not fire if user click on cancel btn)
         */
        askCsvSeparator: function (callback) {
            var myModal,
                that = this,
                DEFAULT_CSV_STR_DELIMITER = that.Controller.DEFAULT_CSV_STR_DELIMITER,
                csvSeparatorEl = new UIKITInputSelect({
                    className: 'gr-input-select csvseparator-input',
                    placeholder: DEFAULT_CSV_STR_DELIMITER,
                    options: [{
                        value: DEFAULT_CSV_STR_DELIMITER,
                        label: Nls.semicolon + ' (;)',
                        selected: true
                    }, {
                        value: ',',
                        label: Nls.comma + ' (,)',
                    }]
                });

            myModal = new UIKITModal({
                overlay: true,
                renderTo: that.widgetBody,
                header: '<h4>' + Nls.modalTitleCsvSeparator + '</h4>',
                visible: true,
                body: [{
                    tag: 'div',
                    html: Nls.modalTextCsvSeparator
                },
                    csvSeparatorEl
                ],
                footer: [
                    new UIKITButton({
                        value: Nls.doneBtn,
                        className: 'primary',
                        events: {
                            onClick: function () {
                                var val = csvSeparatorEl.getValue()[0];

                                that.Model.setPrefCsvSeparator(val);

                                that.HomeScreen.setCsvSeparatorInput(val);

                                myModal.hide();
                                callback();
                            }
                        }
                    }),
                    new UIKITButton({
                        value: Nls.cancelBtn,
                        events: {
                            onClick: function () {
                                myModal.hide();
                            }
                        }
                    })
                ],
                events: {
                    onHide: function () {
                        this.destroy();
                    }
                }
            });
        }, // End function askCsvSeparator()


        /**
         * Set error to display in home screen.
         * @parma {Object} error         - Error options.
         * @parma {String} error.message - Error message.
         * @parma {String} error.type    - Error type.
         */
        setError: function (error) {
            this.HomeScreen.setError(error);
        },


        /**
         * Set the fact that the user can access or not to existing data.
         * @param {Boolean} hasAccess - TRUE if user has access to existing data.
         */
        setAccessToExistingData: function (hasAccess) {
            this._hasAccessToExistingData = hasAccess;
        },


        /**
         * Get the fact that the user can access or not to existing data.
         * @return {Boolean} TRUE if user has access to existing data.
         */
        hasAccessToExistingData: function () {
            return this._hasAccessToExistingData;
        },


        /**
         * Destroy all the view.
         */
        destroy: function () {
            var that = this;

            that.HomeScreen.destroy();
            that.OptionsScreen.destroy();
            that.GraphScreen.destroy();

            clearTimeout(that._timeoutDraggingEnd);
            that._timeoutDraggingEnd = null;

            that._currentScreenDisplay = '';

            that._isHomeScreenDisplay = false;
            that._isOptionsScreenDisplay = false;
            that._isGraphScreenDisplay = false;

            that._isDragNcompareActive = false;
            that._isDropSuccess = true;
            that._isDragging = false;
            that._isDisabled = false;
            that._hasAccessToExistingData = true;

            if (that.widgetBody) {
                that.widgetBody.destroy();
            }
            that.widgetBody = null;
        }, // End function destroy()




        // =========================
        // PRIVATE API
        // =========================


        /**
         * Fired when user drag over the widget.
         * @param {Event} event - Drag event.
         */
        _dragOver: function (event) {
            var dropZoneHomeScreen, typesDataTransfer, key,
                that = this,
                isDragNcompare = false,
                homeScreenEls = that.HomeScreen.elements;

            that._isDropSuccess = false;
            that._isDragging = true;

            if (that._isDragNcompareActive || that.Controller.isReadOnly()) {
                return;
            }

            typesDataTransfer = event.dataTransfer.types || [];

            if (UWA.is(typesDataTransfer, 'array')) {

                isDragNcompare = typesDataTransfer.indexOf(DRAGNCOMPARE_MIME_TYPE) >= 0;

            } else if (UWA.is(typesDataTransfer, 'object')) {

                if (typesDataTransfer.contains) {

                    isDragNcompare = typesDataTransfer.contains(DRAGNCOMPARE_MIME_TYPE);

                } else {

                    for (key in typesDataTransfer) {
                        if (
                            typesDataTransfer.hasOwnProperty(key) &&
                            typesDataTransfer[key] === DRAGNCOMPARE_MIME_TYPE
                        ) {
                            isDragNcompare = true;
                            break;
                        }
                    }

                }

            }

            if (
                isDragNcompare &&
                that.Model.getDataType() !== GRAPH_TYPE_LINE &&
                that.Model.getDataType() !== GRAPH_TYPE_COLUMN
            ) {
                return;
            }

            that.showHomeScreen();

            dropZoneHomeScreen = homeScreenEls.dropZone;

            homeScreenEls.pasteDataRadio.check().dispatchEvent('onClick');

            homeScreenEls.dataInput.hide();
            dropZoneHomeScreen.show();

            if (event.target === dropZoneHomeScreen) {
                dropZoneHomeScreen.addClassName('hover');
            } else {
                dropZoneHomeScreen.removeClassName('hover');
            }

            UWAEvent.stopPropagation(event);
            UWAEvent.preventDefault(event);
        }, // End function _dragOver()


        /**
         * Fired when the user leave the drag from the widget.
         * @param {Event} event - Drag event.
         */
        _dragLeave: function (event) {
            var that = this,
                homeScreenEls = that.HomeScreen.elements,
                dataInputHomeScreen = homeScreenEls.dataInput,
                dropZoneHomeScreen = homeScreenEls.dropZone,
                target = event.target;

            UWAEvent.stopPropagation(event);
            UWAEvent.preventDefault(event);

            that._isDropSuccess = false;

            if (!dataInputHomeScreen || !dropZoneHomeScreen) {
                return;
            }

            if (
                target === dropZoneHomeScreen ||
                target === dataInputHomeScreen.getContent() ||
                target === homeScreenEls.ctn ||
                target === homeScreenEls.form
            ) {
                return;
            }

            that._hideDropZone();

            clearTimeout(that._timeoutDraggingEnd);

            that._timeoutDraggingEnd = setTimeout(function () {

                if (that._isHomeScreenDisplay && !that._isDropSuccess) {
                    that._dragEnd(event);
                    that.showScreen(that.Model.getPreviousScreen() || SCREEN_HOME);
                }

            }, 2000);
        }, // End function _dragLeave()


        /**
         * Hide the drop zone on the Home screen.
         */
        _hideDropZone: function () {
            var dropZoneHomeScreen,
                that = this,
                homeScreenEls = that.HomeScreen.elements;

            if (!that._isHomeScreenDisplay) {
                return;
            }

            dropZoneHomeScreen = homeScreenEls.dropZone;

            homeScreenEls.dataInput.show();
            dropZoneHomeScreen.hide();
            dropZoneHomeScreen.removeClassName('hover');
        }, // End function _hideDropZone()


        /**
         * Fired when the drag end.
         * @param {Event} event - Drag event.
         */
        _dragEnd: function (event) {
            var that = this;

            UWAEvent.stopPropagation(event);
            UWAEvent.preventDefault(event);

            that._hideDropZone();

            that._isDragNcompareActive = false;
            that._isDragging = false;
        }, // End function _dragEnd()


        /**
         * Fire when the user drop is drag over the widget.
         * @param {Event} event - Drag event.
         */
        _drop: function (event) {
            var that = this;

            that._dragEnd(event);
            that._isDropSuccess = true;

            that.Controller.onDrop(event, {
                failure: function (options) {
                    that.HomeScreen.setError({
                        message: options.message,
                        type: options.typeMessage
                    });
                    that.showScreen(SCREEN_HOME, true);
                }
            });

            UWAEvent.preventDefault(event);
        } // End function _drop()

    }); // End View


    /**
     * Screen Home name.
     * @constant {String} SCREEN_HOME
     * @memberOf module:DS/GraphReaderWdg/View
     */
    View.SCREEN_HOME = SCREEN_HOME;

    /**
     * Screen Options name.
     * @constant {String} SCREEN_OPTS
     * @memberOf module:DS/GraphReaderWdg/View
     */
    View.SCREEN_OPTS = SCREEN_OPTS;

    /**
     * Screen Graph name.
     * @constant {String} SCREEN_GRAPH
     * @memberOf module:DS/GraphReaderWdg/View
     */
    View.SCREEN_GRAPH = SCREEN_GRAPH;

    /**
     * Key to indicate that data come from drag and compare feature.
     * @constant {String} FROM_DRAGNCOMPARE
     * @memberOf module:DS/GraphReaderWdg/View
     */
    View.FROM_DRAGNCOMPARE = FROM_DRAGNCOMPARE;

    /**
     * Drag and compare mime type.
     * @constant {String} DRAGNCOMPARE_MIME_TYPE
     * @memberOf module:DS/GraphReaderWdg/View
     */
    View.DRAGNCOMPARE_MIME_TYPE = DRAGNCOMPARE_MIME_TYPE;


    return View;
});
