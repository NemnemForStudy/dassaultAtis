/**
 * @overview GraphReader Controller.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Controller',
[
    // UWA
    'UWA/Core',
    'UWA/Data',
    'UWA/Utils',
    'UWA/Class',

    // GraphReader
    'DS/GraphReaderWdg/Model',
    'DS/GraphReaderWdg/View',

    // DS/W3DXComponents
    'DS/W3DXComponents/Views/GraphView',

    // NLS
    'i18n!DS/GraphReaderWdg/assets/nls/GraphReader'
],

/**
 * @module DS/GraphReaderWdg/Controller
 *
 * @requires UWA/Core
 * @requires UWA/Data
 * @requires UWA/Utils
 * @requires UWA/Class
 *
 * @requires DS/GraphReaderWdg/Model
 * @requires DS/GraphReaderWdg/View
 *
 * @requires DS/W3DXComponents/Views/GraphView
 *
 * @requires i18n!DS/GraphReaderWdg/assets/nls/GraphReader
 */
function (
    // UWA
    UWA,
    Data,
    Utils,
    Class,

    // GraphReader
    GraphReaderModel,
    GraphReaderView,

    // W3DXComponents
    GraphView,

    // NLS
    Nls
) {
    'use strict';

    var FUNCTION_TYPE = 'function',

        GRAPH_TYPE_LINE = GraphView.TYPE_LINE,
        GRAPH_TYPE_COLUMN = GraphView.TYPE_COLUMN,
        GRAPH_TYPE_PIE = GraphView.TYPE_PIE,
        GRAPH_TYPE_DONUT = GraphView.TYPE_DONUT,
        GRAPH_TYPE_TABLE = GraphView.TYPE_TABLE,

        GRAPH_XAXIS_TYPE_DATETIME = GraphView.XAXIS_TYPE_DATETIME,
        GRAPH_XAXIS_TYPE_LINEAR = GraphView.XAXIS_TYPE_LINEAR,

        SCREEN_HOME,
        SCREEN_OPTS,
        SCREEN_GRAPH,

        DEFAULT_CSV_STR_DELIMITER = ';',
        CSV_STR_CATEGORIES = 'categories',

        TAG_URI_SEP = '@##!-::-!##@',
        PREDICATE_TYPE = 'ds6w:what/ds6w:type',
        PREDICATE_UNIT = 'ds6w:what/ds6w:unit',
        PREDICATE_CAT = 'ds6w:what/ds6w:category',
        PREDICATE_STARTS = 'ds6w:when/ds6w:starts',
        PREDICATE_ENDS = 'ds6w:when/ds6w:ends',
        PREDICATE_SERIE = 'ds6w:what/ds6w:constituent',

        VALID_MIME_TYPES = [
            '',
            'application/json',
            'application/vnd.ms-excel',
            'application/csv',
            'application/octet-stream',
            'text/csv',
            'text/plain',
            'text/comma-separated-values'
        ];


    var Controller = Class.extend({

        /**
         * @constant {String} CSV_STR_CATEGORIES - Key word to separate categories from series data.
         */
        CSV_STR_CATEGORIES: CSV_STR_CATEGORIES,

        /**
         * @constant {String} DEFAULT_CSV_STR_DELIMITER - Default char to separate csv values.
         */
        DEFAULT_CSV_STR_DELIMITER: DEFAULT_CSV_STR_DELIMITER,

        /**
         * @constant {Object} DEFAULT_DATA - Default data.
         */
        DEFAULT_DATA: {
            url: '',
            isUrlAuth: false,
            type: GRAPH_TYPE_LINE,
            originalType: GRAPH_TYPE_LINE,
            // title: '',
            xAxis: {
                // title: '',
                categories: [],
                useCategories: false,
                type: GRAPH_XAXIS_TYPE_LINEAR
            },
            yAxis: {
                // title: '',
                thresholdMin: {},
                thresholdMax: {}
            },
            // unit: '',
            stacking: 'none',
            series: []
        },



        // PUBLIC vars
        // -----------

        /**
         * @property {UWA/Widget} widgetCtx - Widget instance.
         */
        widgetCtx: null,

        /**
         * @property {Object} TagNavProxy - TagNavigatorProxy module.
         */
        TagNavProxy: null,

        /**
         * @property {Boolean} readOnly - Is the widget is readOnly.
         */
        readOnly: false,

        /**
         * @property {DS/GraphReaderWdg/Model} Model - GraphReader Model instance.
         */
        Model: null,

        /**
         * @property {DS/GraphReaderWdg/View} View - GraphReader View instance.
         */
        View: null,




        // PRIVATE vars
        // ------------

        /**
         * @property {Boolean} _needToSendTags.
         * @private
         */
        _needToSendTags: true,

        /**
         * @property {Object} _dataToParseSave.
         * @private
         */
        _dataToParseSave: null,

        /**
         * @property {TagNavigatorProxy/TagNavigatorProxy} _taggerProxy - TagNavProxy instance.
         * @private
         */
        _taggerProxy: null,

        /**
         * @property {Integer} _intervalRefreshUrl.
         * @private
         */
        _intervalRefreshUrl: null,




        // =========================
        // PUBLIC API
        // =========================


        /**
         * Init the Controller.
         * @param {Object} options - Options hash.
         * @param {DS/GraphReaderWdg/GraphReader} options.GraphReader - GraphReader instance.
         * @param {TagNavigatorProxy/TagNavigatorProxy} options.TagNavigatorProxy - TagNavigatorProxy module.
         */
        init: function (options) {
            var widget,
                that = this;

            options = options || {};

            // Init PUBLIC vars.
            that.GraphReader = options.GraphReader;
            that.widgetCtx = widget = options.widgetCtx;
            that.TagNavProxy = options.TagNavigatorProxy;
            that.readOnly = options.readOnly;


            that.Model = new GraphReaderModel({
                widgetCtx: widget
            });

            // Init the View.
            that.View = new GraphReaderView({
                Model: that.Model,
                Controller: that,
                widgetBody: widget.body
            });

            // Init constantes from the View.
            SCREEN_HOME = GraphReaderView.SCREEN_HOME;
            SCREEN_OPTS = GraphReaderView.SCREEN_OPTS;
            SCREEN_GRAPH = GraphReaderView.SCREEN_GRAPH;
        }, // End function init()


        /**
         * Function taken from ds/i18n.
         * Replace words from 'message' by the corresponding one in values
         * @param {String} message - The message in which the values are replaced.
         * @param {Object} values - The values use as replacements.
         * @return {String} - The message string with the replacements.
         */
        replace: function (message, values) {
            return message.replace(/\{([\w\-]+)\}/g,
                function(m, name){
                    return values[name] !== undefined ? values[name] : '';
                }
            );
        }, // End function replace()


        /**
         * Convert data into data compatible with the given type.
         * @param {Object} data - Data to convert.
         * @param {String} typeFrom - Chart type data to convert.
         * @param {String} typeTo - Convert data to be compatible with this type.
         * @param {Object} options - Options hash.
         * @param {Boolean} options.isPreview - If TRUE, convert only the first data element.
         * @return {Object} Converted data.
         */
        convertDataType: function (data, typeFrom, typeTo, options) {
            var MAX_TOOLTIP_DATA_EL = 15,
                MAX_TOOLTIP_PREVIEW_DATA_EL = 8,
                MAX_PREVIEW_DATA_EL = 10, // 10
                MAX_PREVIEW_DATA_EL_TABLE_COLUMNS = 8, // 8
                isPreview,
                that = this,
                convertedData = UWA.clone(data);

            /**
             * @private
             */
            function convertPieToTable (dataToConvert) {
                var i, u, nbData, row, val, rowValues = [[]], columns = [],
                    data = dataToConvert.series[0].data || [],
                    hasCategories = dataToConvert.xAxis.categories.length;

                for (i = 0, nbData = data.length; i < nbData; i++) {
                    if (isPreview && i >= MAX_PREVIEW_DATA_EL_TABLE_COLUMNS) {
                        break;
                    }

                    row = data[i];

                    columns.push('' + (row.name || row[0] || ''));

                    val = '' + (row.y || row[1] || '');

                    if (hasCategories) {
                        rowValues[i] = [];
                        for (u = 0; u < nbData; u++) {
                            rowValues[i].push(u === i ? val : '');
                        }
                    } else {
                        rowValues[0].push(val);
                    }

                }

                dataToConvert.series = [{
                    columns: columns,
                    data: rowValues
                }];

                return dataToConvert;
            } // End function convertPieToTable()

            /**
             * @private
             */
            function convertLineToTable (dataToConvert) {
                var n, i, j, colValues = [], rowValues, serie, p = [], max, columns = [],
                    series = dataToConvert.series || [],
                    nbSeries = series.length;

                for (n = 0; n < nbSeries; n++) {
                    if (isPreview && n >= MAX_PREVIEW_DATA_EL_TABLE_COLUMNS) {
                        break;
                    }

                    serie = series[n];

                    p.push(serie.data.length);
                    columns.push(serie.name || '');
                }

                max = Math.max.apply(null, p);

                for (i = 0; i < max; i++) {
                    if (isPreview && i >= MAX_PREVIEW_DATA_EL) {
                        break;
                    }

                    rowValues = [];

                    for (j = 0; j < nbSeries; j++) {
                        if (isPreview && j >= MAX_PREVIEW_DATA_EL_TABLE_COLUMNS) {
                            break;
                        }

                        rowValues.push('' + (series[j].data[i] || '-'));
                    }

                    colValues.push(rowValues);
                }

                dataToConvert.series = [{
                    columns: columns || [],
                    data: colValues || []
                }];

                return dataToConvert;
            } // End function convertLineToTable()

            /**
             * @private
             */
            function convertLineToPie (dataToConvert) {
                var i, p, nbSeries, serie, sum, serieName, val, category, nbData,
                    subPoints, subPoint, data, serieData, tooltipSerie,
                    tooltipSeries = {},
                    categories = dataToConvert.xAxis.categories,
                    hasCategories = !!categories.length,
                    series = dataToConvert.series || [],
                    drilldownSeries = [],
                    pieData = [];

                // For each series, calc the sum of values as primary pie value.
                for (i = 0, nbSeries = series.length; i < nbSeries; i++) {
                    serie = series[i];
                    sum = 0;
                    tooltipSerie = '';
                    serieName = serie.name || 's' + (i + 1);
                    subPoints = [];
                    serieData = serie.data || [];

                    // Calc the sum of the serie.
                    for (p = 0, nbData = serieData.length; p < nbData; p++) {
                        if (isPreview && p > MAX_PREVIEW_DATA_EL) {
                            break;
                        }

                        val = that._parseFloat(serieData[p]);
                        category = categories[p] || '';

                        if (
                            (!isPreview && p <= MAX_TOOLTIP_DATA_EL) ||
                            (isPreview && p <= MAX_TOOLTIP_PREVIEW_DATA_EL)
                        ) {
                            tooltipSerie += (category ? '<i>' + category + ':</i>' : '') + '<b> ' + val + '</b><br/>';
                        } else {
                            if (
                                (!isPreview && p === MAX_TOOLTIP_DATA_EL + 1) ||
                                (isPreview && p === MAX_TOOLTIP_PREVIEW_DATA_EL + 1)
                            ) {
                                tooltipSerie += '...';
                            }
                        }

                        sum += val;

                        subPoint = [
                            hasCategories ? category : 'p' + (p + 1),
                            val
                        ];

                        subPoints.push(subPoint);
                    }

                    tooltipSeries[serieName] = tooltipSerie;

                    drilldownSeries.push({
                        name: serieName,
                        id: serieName,
                        data: subPoints
                    });

                    data = {
                        name: serieName,
                        y: Math.round(sum * 1000) / 1000
                    };

                    // Only for pie, drilldown doesnt work on donut.
                    if (typeTo === GRAPH_TYPE_PIE) {
                        data.drilldown = serieName;
                    }

                    pieData.push(data);
                }

                dataToConvert.series = [{
                    colorByPoint: true,
                    data: pieData || []
                }];

                // Save tooltip info.
                dataToConvert.tooltipSeries = tooltipSeries;

                dataToConvert.expertOpts = {
                    drilldown: {
                        series: drilldownSeries
                    }
                };

                return dataToConvert;
            } // End function convertLineToPie()

            /**
             * @private
             */
            function convertTableToPie (dataToConvert) {
                var i, p, sum, serieName, val, subPoint, subPoints, dataP, category,
                    tooltipSerie,
                    tooltipSeries = {},
                    pieData = [],
                    drilldownSeries = [],
                    categories = dataToConvert.xAxis.categories,
                    hasCategories = !!categories.length,
                    serie = dataToConvert.series[0] || {},
                    columns = serie.columns || [],
                    data = serie.data || [],
                    nbRow = data.length,
                    nbColumns = nbRow ? data[0].length || 0 : 0;

                for (i = 0; i < nbColumns; i++) {
                    sum = 0;
                    serieName = columns[i] || 's' + (i + 1);
                    subPoints = [];
                    tooltipSerie = '';

                    for (p = 0; p < nbRow; p++) {
                        if (isPreview && p > MAX_PREVIEW_DATA_EL) {
                            break;
                        }

                        val = that._parseFloat(data[p][i]);
                        sum += val;
                        category = categories[p] || '';

                        if (
                            (!isPreview && p <= MAX_TOOLTIP_DATA_EL) ||
                            (isPreview && p <= MAX_TOOLTIP_PREVIEW_DATA_EL)
                        ) {
                            tooltipSerie += (category ? '<i>' + category + ':</i>' : '') + '<b> ' + val + '</b><br/>';
                        } else {
                            if (
                                (!isPreview && p === MAX_TOOLTIP_DATA_EL + 1) ||
                                (isPreview && p === MAX_TOOLTIP_PREVIEW_DATA_EL + 1)
                            ) {
                                tooltipSerie += '...';
                            }
                        }

                        subPoint = [
                            hasCategories ? category : 'p' + (p + 1),
                            val
                        ];

                        subPoints.push(subPoint);
                    }

                    tooltipSeries[serieName] = tooltipSerie;

                    drilldownSeries.push({
                        name: serieName,
                        id: serieName,
                        data: subPoints
                    });

                    dataP = {
                        name: serieName,
                        y: Math.round(sum * 1000) / 1000
                    };

                    // Only for pie, drilldown doesn't work on donut.
                    if (typeTo === GRAPH_TYPE_PIE) {
                        dataP.drilldown = serieName;
                    }

                    pieData.push(dataP);
                }

                dataToConvert.series = [{
                    // colorByPoint: true,
                    data: pieData || []
                }];

                // Save tooltip info.
                dataToConvert.tooltipSeries = tooltipSeries;

                dataToConvert.expertOpts = {
                    drilldown: {
                        series: drilldownSeries
                    }
                };

                return dataToConvert;
            } // End function convertTableToPie()

            /**
             * @private
             */
            function convertPieToLine (dataToConvert) {
                var j, dataJ, val, u, newData,
                    newSeries = [],
                    serie = dataToConvert.series[0] || {},
                    data = serie.data || [],
                    nbData = data.length;

                for (j = 0; j < nbData; j++) {
                    if (isPreview && j >= MAX_PREVIEW_DATA_EL_TABLE_COLUMNS) {
                        break;
                    }

                    dataJ = data[j];

                    val = dataJ.y || that._parseFloat(dataJ[1]);

                    newData = [];

                    for (u = 0; u < nbData; u++) {
                        newData.push(u === j ? val : 0);
                    }

                    newSeries.push({
                        name: '' + (dataJ.name || dataJ[0] || '' + j),
                        data: newData
                    });
                }

                dataToConvert.series = newSeries;

                dataToConvert.showPlot = true;

                return dataToConvert;
            } // End function convertPieToLine()

            /**
             * @private
             */
            function convertTableToLine (dataToConvert) {
                var i, j, nbColumns, lineData, column,
                    lineSerie = [],
                    serie = dataToConvert.series[0] || {},
                    columns = serie.columns || [],
                    data = serie.data || [],
                    nbData = data.length,
                    nbColumns = nbData ? data[0].length : 0;

                for (i = 0; i < nbColumns; i++) {
                    lineData = [];
                    column = columns[i];

                    for (j = 0; j < nbData; j++) {
                        if (isPreview && j > MAX_PREVIEW_DATA_EL) {
                            break;
                        }

                        lineData.push(that._parseFloat(data[j][i]));
                    }

                    lineSerie.push({
                        name: column ? '' + columns[i] : 's' + (i + 1),
                        data: lineData
                    });
                }

                dataToConvert.series = lineSerie;

                return dataToConvert;
            } // End function convertTableToLine()

            /**
             * @private
             */
            function makeTablePreview (dataToConvert) {
                var i,
                    serie = dataToConvert.series[0] || {},
                    columns = serie.columns || [],
                    data = serie.data || [];

                serie.columns = columns.slice(0, MAX_PREVIEW_DATA_EL_TABLE_COLUMNS);
                data = data.slice(0, MAX_PREVIEW_DATA_EL);

                for (i = data.length - 1; i >= 0; i--) {
                    data[i] = data[i].slice(0, MAX_PREVIEW_DATA_EL_TABLE_COLUMNS);
                }

                serie.data = data;

                return dataToConvert;
            } // End function makeTablePreview()

            /**
             * @private
             */
            function makeLinePreview (dataToConvert) {
                var i, data, serie,
                    series = dataToConvert.series || [];

                for (i = series.length - 1; i >= 0; i--) {
                    serie = series[i];
                    data = serie.data || [];
                    data = data.slice(0, MAX_PREVIEW_DATA_EL);
                    serie.data = data;
                }

                return dataToConvert;
            } // End function makeLinePreview()

            /**
             * @private
             */
            function normalizePie (dataToConvert) {
                var i, nbData, dataI,
                    tooltipSeries = {},
                    serie = dataToConvert.series[0] || {},
                    data = serie.data || [],
                    categories = dataToConvert.xAxis.categories || [],
                    hasCategories = categories.length;

                if (isPreview) {
                    data = data.slice(0, MAX_PREVIEW_DATA_EL_TABLE_COLUMNS);
                }

                if (hasCategories) {
                    for (i = 0, nbData = data.length; i < nbData; i++) {
                        dataI = data[i];

                        tooltipSeries[(dataI.name || dataI[0])] = '<i>' + (categories[i] || i) + ':</i>' + '<b> ' + (dataI.y || dataI[1]) + '</b><br/>';
                    }
                }

                serie.data = data;

                // Save tooltip info.
                dataToConvert.tooltipSeries = tooltipSeries;

                return dataToConvert;
            } // End function normalizePie()


            // ===================================
            // Start of function convertDataType()
            // ===================================

            options = options || {};
            isPreview = options.isPreview;

            switch (typeFrom) {

            case GRAPH_TYPE_PIE:
            case GRAPH_TYPE_DONUT:
                switch (typeTo) {

                case GRAPH_TYPE_LINE:
                case GRAPH_TYPE_COLUMN:
                    convertedData = convertPieToLine(convertedData);
                    break;

                case GRAPH_TYPE_PIE:
                case GRAPH_TYPE_DONUT:
                    convertedData = normalizePie(convertedData);
                    break;

                case GRAPH_TYPE_TABLE:
                    convertedData = convertPieToTable(convertedData);
                    break;
                } // End switch ( typeTo )
                break;

            case GRAPH_TYPE_LINE:
            case GRAPH_TYPE_COLUMN:
                switch (typeTo) {

                case GRAPH_TYPE_LINE:
                case GRAPH_TYPE_COLUMN:
                    if (isPreview) {
                        convertedData = makeLinePreview(convertedData);
                    }
                    break;

                case GRAPH_TYPE_PIE:
                case GRAPH_TYPE_DONUT:
                    convertedData = convertLineToPie(convertedData);
                    break;

                case GRAPH_TYPE_TABLE:
                    convertedData = convertLineToTable(convertedData);
                    break;
                } // End switch ( typeTo )
                break;

            case GRAPH_TYPE_TABLE:
                switch (typeTo) {

                case GRAPH_TYPE_TABLE:
                    if (isPreview) {
                        convertedData = makeTablePreview(convertedData);
                    }
                    break;

                case GRAPH_TYPE_PIE:
                case GRAPH_TYPE_DONUT:
                    convertedData = convertTableToPie(convertedData);
                    break;

                case GRAPH_TYPE_LINE:
                case GRAPH_TYPE_COLUMN:
                    convertedData = convertTableToLine(convertedData);
                    break;
                } // End switch ( typeTo )
                break;

            default:
                convertedData.type = typeTo;
            } // End switch ( typeFrom )

            return convertedData;
        }, // End function convertDataType()


        /**
         * Is the type is a supported type.
         * @param {String} type - Type to check is is valid.
         * @return {Boolean} TRUE is the type is valid else FALSE.
         */
        isValidType: function (type) {
            return [
                GRAPH_TYPE_LINE,
                GRAPH_TYPE_COLUMN,
                GRAPH_TYPE_PIE,
                GRAPH_TYPE_DONUT,
                GRAPH_TYPE_TABLE
            ].indexOf(type) >= 0;
        }, // End function isValidType(),


        _isValidContentType: function (contentType) {
            var isValid = false;

            VALID_MIME_TYPES.forEach(function (el) {
                if (
                    (el === '' && contentType === el) ||
                    (el !== '' && contentType.contains(el))
                ) {
                    isValid = true;
                }
            });

            return isValid;
        },


        /**
         * Is the widget is readOnly.
         * @return {Boolean} TRUE if the widget is readOnly else FALSE.
         */
        isReadOnly: function () {
            return this.readOnly;
        }, // End function isReadOnly()


        /**
         * @param {Object}   options          - Hash options.
         * @param {String}   options.url      - Url to check.
         * @param {Boolean}  options.isAuth   - Is the url need authentification (use of passport).
         * @param {function} options.callback - Callback function.
         */
        hasAccessToUrl: function (options) {
            var that = this;

            function onSuccess (data, headers) {
                var contentType = headers['Content-Type'] || '';

                if (!that._isValidContentType(contentType)) {
                    onFailure();
                    return;
                }

                options.callback(true);
            }

            function onFailure () {
                options.callback(false);
            }

            Data.request(options.url, {
                proxy: options.isAuth ? 'passport' : '',
                onComplete: onSuccess,
                onFailure: onFailure
            });
        },


        /**
         * On set new data (save data into model and create tags).
         * @param {Object} data - Parsed data to save into model.
         */
        onSetData: function (data) {
            var that = this;

            that.Model.setData(data);
            that._createTags();
            that._needToSendTags = true;
        }, // End function onSetData()


        /**
         * On set url to fetch data from Home screen.
         * @param {Object} options - Options hash.
         * @param {String}  options.url - Url where to fetch data.
         * @param {Boolean} options.isUrlAuth - TRUE if the request to the url must use the passport proxy.
         * @param {Integer} options.refreshUrl - Number of miliseconde to wait before re-fetching data from the url.
         * @param {Function} options.success - Function fired on success (Fired when on fetching data success).
         * @param {Function} options.failure - Function fired on failure (url not valid or bad file extention).
         */
        onSetUrl: function (options) {
            var protocol,
                that = this,
                url = options.url || '',
                re = new RegExp('https{0,1}://', 'i'),
                Model = that.Model;

            url = url.replace(/\s+/g, ''); // Supp all spaces.

            // Format the protocol (put it in lowerCase)
            protocol = url.match(re) || '';

            if (protocol) {
                url = url.replace(re, protocol[0].toLowerCase());
            }

            if (url.test(/^.*\.(csv|txt|json)$/i) || url.test(/^.*\/([^.]+)$/i)) {

                Model.setPrefUrl(url);
                Model.setPrefIsUrlAuth(options.isUrlAuth);
                Model.setPrefRefreshUrl(options.refreshUrl);

                that._fetchDataByUrl(options);

            } else {
                options.failure({
                    message: Nls.errorUrlProvided,
                    url: url
                });
            }
        }, // End function onSetUrl()


        /**
         * On set pasted data from Home screen.
         * @param {Object} options - Options hash.
         * @param {String} options.pasteData - String to parse to get data.
         * @param {Boolean} options.checkData - TRUE if User has clicked on check data link from Home screen.
         * @param {Function} options.success - Function fired on success (Fired when parsing data successed).
         * @param {Function} options.failure - Function fired on failure (Fired when the parsing data failed).
         */
        onSetPasteData: function (options) {
            var parsedData,
                that = this,
                pasteData = options.pasteData;

            /**
             * @private
             */
            function dataParser (dataToParse) {
                var parsedData;

                try {

                    parsedData = that._parseProvidedData(dataToParse);

                } catch (e) {
                    if (UWA.is(options.failure, FUNCTION_TYPE)) {
                        options.failure({
                            message: Nls.errorParsingData + ' ' + (e.message ? that.replace(Nls.errorCustomMessage, {message: e.message}) : '')
                        });
                    }
                    parsedData = {error: true};
                }

                return parsedData;
            } // End function dataParser()

            /**
             * @private
             */
            function onParseDataEnd (parsedData) {
                if (options.checkData) {
                    that.Model.setCheckedData(parsedData);
                } else {
                    that._resetPrefUrl();
                    that._onProvideNewData({
                        data: parsedData,
                        screen: SCREEN_OPTS
                    });
                }

                if (UWA.is(options.success, FUNCTION_TYPE)) {
                    options.success();
                }
            } // End function onParseDataEnd()


            // ==================================
            // Start of function onSetPasteData()
            // ==================================

            parsedData = dataParser(pasteData);

            if (parsedData.error) {
                return;
            } else if (parsedData.askSeparator) {
                that.View.askCsvSeparator(function () {
                    onParseDataEnd(dataParser(pasteData));
                });
            } else {
                onParseDataEnd(parsedData);
            }
        }, // End function onSetPasteData()



        /**
         * @param {Object}  options              - Hash options.
         * @param {Boolean} options.forceRefresh - Has the data must be refresh immediately.
         */
        onLoad: function (options) {
            var forceRefresh,
                that = this,
                Model = that.Model,
                View = that.View,
                urlPref = Model.getPrefUrl(),
                widgetCtxId = that.widgetCtx.id,
                currentData = Model.getData(),
                urlData = currentData.url,
                isUrlDataAuth = currentData.isUrlAuth;


            function goToLastScreen () {
                View.showScreen(Model.getPrefLastScreen() || SCREEN_OPTS, forceRefresh);
            }


            function checkUrlData (callback) {

                callback = callback || function (hasAccess) {
                    View.setAccessToExistingData(hasAccess);

                    if (hasAccess) {
                        goToLastScreen();
                    } else {
                        View.setError({message: Nls.NoAccessToData});
                        View.showScreen(SCREEN_HOME, forceRefresh);
                    }
                };

                if (urlData) {
                    that.hasAccessToUrl({
                        url: urlData,
                        isAuth: isUrlDataAuth,
                        callback: callback
                    });
                } else {
                    View.setAccessToExistingData(true);
                    goToLastScreen();
                }
            }


            options = options || {};
            forceRefresh = options.forceRefresh;

            // Set Widget title.
            Model.setPrefTitle();


            if (!that._taggerProxy) {
                that._taggerProxy = that._initTaggerProxy(widgetCtxId, that._onTagsFiltering);
            } else {
                that._removeTags();
            }


            if (that.readOnly) {
                if (urlData) {
                    that.hasAccessToUrl({
                        url: urlData,
                        isAuth: isUrlDataAuth,
                        callback: function (hasAccess) {
                            if (hasAccess) {
                                that._setRefreshInterval();
                                View.showScreen(SCREEN_GRAPH, forceRefresh);
                            } else {
                                View.showDeniedScreen();
                            }
                        }
                    });
                } else {
                    View.showScreen(SCREEN_GRAPH, forceRefresh);
                }
                return;
            }
            // End of Check if the widget is read only.


            if (Model.hasCurrentData()) {

                if (urlPref) {

                    if (
                        forceRefresh ||
                        urlPref !== urlData ||
                        that._needToRefreshUrl()
                    ) {

                        that._fetchDataByUrl({
                            usePreviousOpts: true,
                            success: function () {
                                that._setRefreshInterval();
                                goToLastScreen();
                            },
                            failure: function (error) {
                                View.setError({message: error.message || ''});

                                checkUrlData(function (hasAccess) {
                                    View.setAccessToExistingData(hasAccess);
                                    View.showScreen(SCREEN_HOME, forceRefresh);
                                });
                            }
                        });

                    }
                    // No need to refresh, use current data.
                    else {
                        that._setRefreshInterval();
                        checkUrlData();
                    }
                }
                // Has no URL pref, use current data.
                else {
                    checkUrlData();
                }
            }
            // Has no current data, ask for data.
            else {
                View.showScreen(SCREEN_HOME, forceRefresh);
            }
        }, // End function onLoad()


        /**
         * On drop data on the widget.
         * @param {Object} event - Native Drop event containing data.
         * @param {Object} options - Options hash.
         * @param {Function} options.success - Function fired on success (Fired when parsing data successed).
         * @param {Function} options.failure - Function fired on failure (Fired when parsing data failed).
         */
        onDrop: function (event, options) {
            var dt = event.dataTransfer,
                that = this,
                files = dt.files;

            /**
             * @private
             */
            function onParseDataEnd (parsedData, theScreen) {
                that._resetPrefUrl();

                that._onProvideNewData({
                    data: parsedData,
                    screen: theScreen || SCREEN_HOME
                });

                if (UWA.is(options.success, FUNCTION_TYPE)) {
                    options.success();
                }
            } // End function onParseDataEnd()

            /**
             * @private
             */
            function onFailure (callbackParams) {
                if (UWA.is(options.failure, FUNCTION_TYPE)) {
                    options.failure(callbackParams);
                }
            } // End function onParseError()

            /**
             * @private
             */
            function manageExternalFile () {
                var i, reader, file, typeFile, nbFiles;

                if (window.FileReader) {

                    nbFiles = files.length;

                    for (i = 0; i < nbFiles; i++) {
                        file = files[i];
                        reader = new FileReader();
                        typeFile = file.type;

                        if (!that._isValidContentType(typeFile)) {
                            if (nbFiles === 1) {
                                onFailure({
                                    message: that.replace(Nls.mimeTypeNotValid, {format: typeFile})
                                });
                                break;
                            } else {
                                continue;
                            }
                        }

                        reader.onload = function () {
                            var parsedDataTemp,
                                dataToParse = reader.result;

                            function parseData (dataToParse) {
                                var parsedDataTemp;

                                try {
                                    parsedDataTemp = that._parseProvidedData(dataToParse);
                                } catch (e) {
                                    onFailure({
                                        message: Nls.errorParsingData
                                    });
                                    return {error: true};
                                }

                                return parsedDataTemp;
                            }

                            parsedDataTemp = parseData(dataToParse);

                            if (parsedDataTemp.error) {
                                return;
                            } else if (parsedDataTemp.askSeparator) {
                                that.View.askCsvSeparator(function () {
                                    onParseDataEnd(parseData(dataToParse));
                                });
                            } else {
                                onParseDataEnd(parsedDataTemp);
                            }
                        };

                        reader.readAsText(file);
                        break;
                    }

                } else {
                    onFailure({
                        message: Nls.fileReaderNotSupported
                    });
                }
            } // End function manageExternalFile()

            /**
             * @private
             */
            function manageDragAndCompare () {
                var i, droppedData, currentData, screenToLoad, from, currentDataType,
                    FROM_DRAGNCOMPARE = GraphReaderView.FROM_DRAGNCOMPARE;

                try {
                    // Get data from the dropped drag and compare element.
                    droppedData = that._parseProvidedData(
                        dt.getData(GraphReaderView.DRAGNCOMPARE_MIME_TYPE)
                    );

                } catch (e) {
                    onFailure({
                        message: Nls.errorParsingData
                    });
                    that.View.showScreen(SCREEN_HOME, true);
                    return;
                }

                from = droppedData.from || '';

                // If no current data or drop selected text, set the data as provided data.
                if (!that.Model.hasCurrentData() || from !== FROM_DRAGNCOMPARE) {
                    currentData = droppedData;
                    screenToLoad = SCREEN_OPTS;
                }
                // Data come from an drag and compare and there is already current data.
                else {

                    currentData = that.Model.getData();
                    currentDataType = currentData.type;

                    // If the chart type is not line or column, cancel the drop.
                    if (currentDataType !== GRAPH_TYPE_LINE && currentDataType !== GRAPH_TYPE_COLUMN) {
                        that.View.showScreen(that.Model.getPreviousScreen());
                        return;
                    }

                    for (i = 0; i < droppedData.series.length; i++) {
                        currentData.series.push(droppedData.series[i]);
                    }

                    screenToLoad = SCREEN_GRAPH;
                }

                currentData.originalType = currentData.type;
                delete currentData.from;
                that._dataToParseSave = that._dataToParseSave.replace(
                    new RegExp( ',\"from\":\"' + FROM_DRAGNCOMPARE + '\"', 'g' ),
                    ''
                );

                onParseDataEnd(currentData, screenToLoad);
            } // End function manageDragAndCompare()



            // ==========================
            // Start of function onDrop()
            // ==========================

            options = options || {};

            // It is a drop from an external file.
            if (UWA.is(files) && files.length !== 0) {
                manageExternalFile();
            }
            // It is a drop from a drag and compare.
            else {
                manageDragAndCompare();
            }
        }, // End function onDrop()


        /**
         * On show screen.
         * @param {String} screenName - Screen name showed.
         */
        onShowScreen: function (screenName) {
            var that = this;

            switch (screenName) {
            case SCREEN_HOME:
                that._clearRefreshInterval();
                that._removeTags();
                break;

            case SCREEN_OPTS:
                that._clearRefreshInterval();
                that._removeTags();
                break;

            case SCREEN_GRAPH:
                that._sendTags();
                that._setRefreshInterval();
                break;
            }
        }, // End function onShowScreen()


        /**
         * On disable the view, remove tags.
         */
        onDisableView: function () {
            this._removeTags();
        }, // End function onDisableView()


        /**
         * On enable the view, send tags.
         */
        onEnableView: function () {
            this._sendTags();
        }, // End function onEnableView()


        /**
         * On resize, resize the view.
         */
        onResize: function () {
            this.View.onResize();
        }, // End function onResize()


        /**
         * On view change, change the view.
         * @param {Object} data - OnViewChange data.
         */
        onViewChange: function (data) {
            this.View.onViewChange(data);
        }, // End function onViewChange()


        /**
         * On search, disable the view.
         * TODO: filter the widget instead of disabling the view.
         */
        onSearch: function () {
            this.View.disable();
        }, // End function onSearch()


        /**
         * On reset search, enable the view.
         * TODO: reset filter.
         */
        onResetSearch: function () {
            this.View.enable();
        }, // End function onResetSearch()


        /**
         * On context change, do nothing.
         */
        onContextChange: function () {
        }, // End function onContextChange()


        /**
         * On destroy, destroy the Model and the View then reset the Controller.
         */
        onDestroy: function () {
            var that = this;

            that.Model.destroy();
            that.View.destroy();

            if (that._taggerProxy) {
                that._taggerProxy.die();
            }
            that._taggerProxy = null;

            that._clearRefreshInterval();

            that.TagNavProxy = null;
            that.readOnly = false;
            that.widgetCtx = null;

            that._intervalRefreshUrl = null;
            that._dataToParseSave = null;
            that._needToSendTags = true;
        }, // End function onDestroy()



        // =========================
        // PRIVATE API
        // =========================


        /**
         * Init Tagger proxy.
         * @param {String} widgetId - Widget id.
         * @param {Function} addFilterSubjectsListener - Function fire on tags filtering.
         * @return {Object} TagNavigatorProxy instance.
         */
        _initTaggerProxy: function (widgetId, addFilterSubjectsListener) {
            var that = this;

            return that.TagNavProxy.createProxy({
                widgetId: widgetId,
                filteringMode: 'WithFilteringServices',
                events: {
                    addFilterSubjectsListener: addFilterSubjectsListener.bind(that)
                }
            });
        }, // End function _initTaggerProxy()


        /**
         * Fired when tags filtering, filter data.
         * @param {Object} filteredItems - Filtered items sent by the tagger.
         */
        _onTagsFiltering: function (filteredItems) {
            var i, currentData, allFilters, predicateSerieList, hasPredicate, predicateUnitChart, catToShow, filteredSubjectList,
                predicate, seriesToShow, predicateTypeChart, chartType, chartUnit, predicateCatList, predicateStartsList,
                predicateEndsList, chartAxisType, serieName, split,
                that = this,
                View = that.View,
                enableView = false,
                filteredData = that.Model.getData();

            /**
             *  @private
             */
            function hasFilter (filters) {
                var prop,
                    hasFilter = false;

                for (prop in filters) {
                    if (filters.hasOwnProperty(prop)) {
                        hasFilter = true;
                        break;
                    }
                }

                return hasFilter;
            } // End function hasFilter()

            /**
             *  @private
             */
            function isFilteredSubject (filteredSubjects) {
                filteredSubjects = filteredSubjects || [];

                return !!filteredSubjects.length;
            } // End function hasFilter()


            // ====================================
            // Start of function _onTagsFiltering()
            // ====================================

            filteredItems = filteredItems || {};
            allFilters = filteredItems.allfilters || {};
            filteredSubjectList = filteredItems.filteredSubjectList || [];

            if (!hasFilter(allFilters)) {
                View.enable(true);
                return;
            }

            if (!View.isGraphScreenDisplay()) {
                View.disable();
                return;
            }

            currentData = that.Model.getData();

            predicateSerieList = allFilters[PREDICATE_SERIE];
            predicateTypeChart = allFilters[PREDICATE_TYPE];
            predicateUnitChart = allFilters[PREDICATE_UNIT];
            predicateCatList = allFilters[PREDICATE_CAT];
            predicateStartsList = allFilters[PREDICATE_STARTS];
            predicateEndsList = allFilters[PREDICATE_ENDS];

            // Chart type and axis type predicate.
            // -----------------------------------
            if (predicateTypeChart) {

                chartType = currentData.type;
                chartAxisType = currentData.xAxis ? currentData.xAxis.type : '';
                hasPredicate = true;

                for (i = predicateTypeChart.length - 1; i >= 0; i--) {
                    predicate = predicateTypeChart[i].object;

                    if (
                        chartType !== predicate &&
                        (chartAxisType !== predicate || !that._isTypeLineOrColumn(chartType))
                    ) {
                        hasPredicate = false;
                        break;
                    }
                }

                if (!hasPredicate) {
                    View.disable();
                    return;
                } else {
                    enableView = true;
                }

            }

            // Chart unit predicate.
            // ---------------------
            if (predicateUnitChart) {

                chartUnit = currentData.unit;
                hasPredicate = false;

                for (i = predicateUnitChart.length - 1; i >= 0; i--) {
                    predicate = predicateUnitChart[i];

                    if (chartUnit === predicate.object) {
                        hasPredicate = true;
                        break;
                    }
                }

                if (!hasPredicate) {
                    View.disable();
                    return;
                } else {
                    enableView = true;
                }

            }

            // Categories predicate.
            // ---------------------
            if (predicateCatList) {

                for (i = predicateCatList.length - 1, catToShow = []; i >= 0; i--) {
                    predicate = predicateCatList[i];
                    catToShow.push(predicate.object);
                }

                filteredData = View.showSelectiveCategories({
                    filteredData: filteredData,
                    catToShow: catToShow
                });

            } else {
                View.showAllCategories({
                    filteredData: filteredData
                });
            }

            // Series Name predicate OR start date OR end date.
            // ------------------------------------------------
            if ((predicateSerieList || predicateStartsList || predicateEndsList) && isFilteredSubject(filteredSubjectList)) {
                seriesToShow = [];

                for (i = filteredSubjectList.length - 1; i >= 0; i--) {
                    split = filteredSubjectList[i].split(TAG_URI_SEP, 2);
                    serieName = split && split.length === 2 ? split[1] : '';

                    if (serieName) {
                        seriesToShow.push(serieName);
                    }

                }

                filteredData = View.showSelectiveSeries({
                    filteredData: filteredData,
                    seriesToShow: seriesToShow
                });

            } else {
                View.showAllSeries({
                    filteredData: filteredData
                });
            }

            if (enableView) {
                View.enable();
            } else if (!isFilteredSubject(filteredSubjectList)) {
                View.disable();
            }
        }, // End function _onTagsFiltering()


        /**
         * Send tags (created from data) to the tagger.
         */
        _sendTags: function () {
            var that = this,
                taggerProxy = that._taggerProxy;

            if (
                taggerProxy &&
                that._needToSendTags &&
                that.View.isGraphScreenDisplay()
            ) {

                taggerProxy.setSubjectsTags(that.Model.getPrefTags());
                that._needToSendTags = false;

            }
        }, // End function _sendTags()


        /**
         * Remove tags from the tagger.
         */
        _removeTags: function () {
            var that = this,
                taggerProxy = that._taggerProxy;

            if (taggerProxy) {
                taggerProxy.unsetTags();
                that._needToSendTags = true;
            }
        }, // End function _removeTags()


        /**
         * Create tags from data.
         * @return {Object} Created tags.
         */
        _createTags: function () {
            var i, tag, currentData, chartType, chartSeries, chartUnit, chartAxisType, chartCategories,
                serie, date, data, pointStart, nbData, serieName, isTypeLineOrColumn,
                that = this,
                STRING_TYPE = 'string',
                DATE_TYPE = 'date',
                DATE_TAG_FORMAT = '%Y/%m/%d',
                TAG_BASE_URI = 'GraphReader:' + that.widgetCtx.id,
                tags = {};

            /**
             * @private
             */
            function addSerieTag (serieName, object, predicate, type, dispValue) {
                var serieTagUri = TAG_BASE_URI + TAG_URI_SEP + serieName,
                    serieTags = tags[serieTagUri] || [],
                    tag = {
                        dispValue: dispValue || object,
                        object: object,
                        sixw: predicate,
                        type: type
                    };

                if (serieTags.length) {
                    serieTags.push(tag);
                } else {
                    tags[serieTagUri] = [tag];
                }
            }

            /**
             * @private
             */
            function addSerieTagPie (series) {
                var i, dataI, serieName,
                    serie = series[0] || {},
                    data = serie.data || [],
                    nbData = data.length;

                for (i = 0; i < nbData; i++) {
                    dataI = data[i];
                    serieName = '' + (dataI.name || dataI[0]);

                    if (serieName) {
                        addSerieTag(serieName, serieName, PREDICATE_SERIE, STRING_TYPE);
                    }
                }
            } // End function addSerieTagPie()

            /**
             * @private
             */
            function addSerieTagLine (series) {
                var i, nbSeries, serie, serieName;

                for (i = 0, nbSeries = series.length; i < nbSeries; i++) {
                    serie = series[i];
                    serieName = serie.name;

                    if (serieName) {
                        addSerieTag(serieName, serieName, PREDICATE_SERIE, STRING_TYPE);
                    }
                }
            } // End function addSerieTagLine()

            /**
             * @private
             */
            function addSerieTagTable (series) {
                var i, nbColumns, serieName,
                    serie = series[0] || {},
                    columns = serie.columns || [],
                    data = serie.data[0] || [];

                for (i = 0, nbColumns = data.length; i < nbColumns; i++) {
                    serieName = columns[i];

                    if (serieName) {
                        addSerieTag(serieName, serieName, PREDICATE_SERIE, STRING_TYPE);
                    }
                }
            } // End function addSerieTagTable()


            // ===============================
            // Start of function _createTags()
            // ===============================

            if (!that.Model.hasCurrentData()) {
                return tags; // return empty tags.
            }

            currentData = that.Model.getData();
            chartType = currentData.type;
            chartUnit = currentData.unit;
            chartCategories = currentData.xAxis ? currentData.xAxis.categories || [] : [];
            chartAxisType = currentData.xAxis ? currentData.xAxis.type : '';
            chartSeries = currentData.series || [];
            isTypeLineOrColumn = that._isTypeLineOrColumn(chartType);

            // Main tags object.
            // -----------------
            tags[TAG_BASE_URI] = tag = [];

            // Chart type tag.
            // ---------------
            if (chartType) {
                tag.push({
                    object: chartType,
                    dispValue: (chartType + ' chart').ucfirst(),
                    sixw: PREDICATE_TYPE,
                    type: STRING_TYPE
                });
            }

            // Chart axis type tag.
            // --------------------
            if (chartAxisType && isTypeLineOrColumn) {
                tag.push({
                    object: chartAxisType,
                    dispValue: (chartAxisType + ' axis').ucfirst(),
                    sixw: PREDICATE_TYPE,
                    type: STRING_TYPE
                });
            }

            // Chart unit tag.
            // ---------------
            if (chartUnit) {
                tag.push({
                    object: chartUnit,
                    sixw: PREDICATE_UNIT,
                    type: STRING_TYPE
                });
            }

            // Chart start and end date.
            // -------------------------
            if (chartAxisType === GRAPH_XAXIS_TYPE_DATETIME && isTypeLineOrColumn) {
                // For each series.
                for (i = chartSeries.length - 1; i >= 0; i--) {
                    serie = chartSeries[i] || {};
                    serieName = serie.name;
                    data = serie.data || [];
                    nbData = data.length;
                    pointStart = serie.pointStart;

                    // Start date.
                    date = new Date(pointStart || data[0][0]);
                    if (date.valueOf()) { // Test if the date is valid.

                        date = date.strftime(DATE_TAG_FORMAT);
                        addSerieTag(serieName, date, PREDICATE_STARTS, DATE_TYPE);
                    }


                    // End date.
                    date = new Date(
                        pointStart ?
                            pointStart + (nbData - 1) * serie.pointInterval
                            :
                            data[nbData - 1][0]
                    );

                    if (date.valueOf()) { // Test if the date is valid.

                        date = date.strftime(DATE_TAG_FORMAT);
                        addSerieTag(serieName, date, PREDICATE_ENDS, DATE_TYPE);
                    }
                }
            }

            // Chart categories tag.
            // ---------------------
            if (chartCategories.length) {
                for (i = chartCategories.length - 1; i >= 0; i--) {
                    tag.push({
                        object: chartCategories[i],
                        sixw: PREDICATE_CAT,
                        type: STRING_TYPE
                    });
                }
            }

            // Series name tags.
            // -----------------
            switch (chartType) {

            case GRAPH_TYPE_PIE:
            case GRAPH_TYPE_DONUT:
                addSerieTagPie(chartSeries);
                break;

            case GRAPH_TYPE_LINE:
            case GRAPH_TYPE_COLUMN:
                addSerieTagLine(chartSeries);
                break;

            case GRAPH_TYPE_TABLE:
                addSerieTagTable(chartSeries);
            }

            that.Model.setPrefTags(tags);

            return tags;
        }, // End function _createTags()


        /**
         * Is the type is a LINE or COLUMN type.
         * @param {String} type - Type to check.
         * @return {Boolean} TRUE if it is a LINE or a COLUMN.
         */
        _isTypeLineOrColumn: function (type) {
            return type === GRAPH_TYPE_LINE || type === GRAPH_TYPE_COLUMN;
        }, // End function _isTypeLineOrColumn()


        /**
         * Check if data get from url need to be refreshed.
         * @return {Boolean} TRUE if data need to be refreshed.
         */
        _needToRefreshUrl: function () {
            var currentTime,
                Model = this.Model,
                needToRefreshUrl = false,
                lastRefreshUrl = Model.getPrefLastRefreshUrl(),
                refreshUrl = Model.getPrefRefreshUrl();

            currentTime = Date.now();

            if (refreshUrl && (!lastRefreshUrl || (lastRefreshUrl + refreshUrl - currentTime <= 0))) {
                needToRefreshUrl = true;
            }

            return needToRefreshUrl;
        }, // End function _needToRefreshUrl()


        /**
         * Reset pref url and other pref link to the pref url.
         */
        _resetPrefUrl: function () {
            var that = this,
                Model = that.Model;

            Model.setPrefUrl();
            Model.setPrefIsUrlAuth();
            Model.setPrefRefreshUrl();
            Model.setPrefLastRefreshUrl();

            that._clearRefreshInterval();
        },


        /**
         * Set the interval for the refresh url.
         */
        _setRefreshInterval: function () {
            var remainingTime,
                THRESHOLD_TIME = 60000, // 1 min in ms
                that = this,
                Model = that.Model,
                refreshUrl = Model.getPrefRefreshUrl();

            that._clearRefreshInterval();

            if (!refreshUrl || !Model.hasPrefUrl()) {
                return;
            }

            if (refreshUrl > THRESHOLD_TIME * 5) {
                remainingTime = Model.getPrefLastRefreshUrl() + refreshUrl - Date.now();

                refreshUrl = remainingTime > THRESHOLD_TIME ? remainingTime : THRESHOLD_TIME;
            }

            // UWA.log('GraphReader says: Refresh url is on.');

            that._intervalRefreshUrl = setInterval(function () {
                var isReadOnly,
                    View = that.View;

                if (that.Model && View) {
                    isReadOnly = that.isReadOnly();

                    that._fetchDataByUrl({
                        usePreviousOpts: true,
                        success: function () {
                            View.setAccessToExistingData(true);
                        },
                        failure: function (error) {
                            View.setAccessToExistingData(false);

                            if (isReadOnly) {
                                View.showDeniedScreen();
                                return;
                            }

                            View.setError({ message: error.message || ''});
                            View.showHomeScreen();
                        }
                    });
                }
            }, refreshUrl);
        }, // End function _setRefreshInterval()


        /**
         * Clear the intreval for the refresh url.
         */
        _clearRefreshInterval: function () {
            // UWA.log('GraphReader says: Refresh url is off.');
            clearInterval(this._intervalRefreshUrl);
        }, // End function _clearRefreshInterval()


        /**
         * Fetch data from pref url.
         * @param {Object}   options                   - Options hash.
         * @param {Boolean}  [options.checkData]       - If the fetch come from Home screen check data link.
         * @param {String}   [options.screen]          - Screen to show after parsing success.
         * @param {Function} [options.success]         - Success callback, fired if fetch from url succeed.
         * @param {Function} [options.failure]         - Failure callback, fired if fetch from url failed.
         * @param {Boolean}  [options.usePreviousOpts] - Does the new fetched data has to use previous chart options.
         */
        _fetchDataByUrl: function (options) {
            var that = this,
                Model = that.Model,
                View = that.View,
                dataUrl = Model.getPrefUrl(),
                isUrlAuth = Model.getPrefIsUrlAuth(),
                ERROR_MESSAGE_TEXT = Nls.fetchUrlError;

            /**
             * @private
             */
            function onSuccess (data, headers) {
                var parsedDataTemp,
                    contentType = headers['Content-Type'] || '';

                if (!that._isValidContentType(contentType)) {
                    onFailure({
                        customErrorMessage: that.replace(Nls.mimeTypeNotValid, {format: contentType})
                    });
                    return;
                }

                /**
                 * @private
                 */
                function parseData (dataToParse) {
                    var parsedDataTemp;

                    try {

                        parsedDataTemp = that._parseProvidedData(dataToParse);

                    } catch (e) {
                        onFailure({
                            customErrorMessage: that.replace(ERROR_MESSAGE_TEXT, {action: Nls.parsingAction, url: dataUrl})
                        });
                        parsedDataTemp = {error: true};
                    }

                    return parsedDataTemp;
                }

                /**
                 * @private
                 */
                function onParseDataEnd (parsedData) {
                    if (options.checkData) {

                        Model.setCheckedData(parsedData);

                    } else {

                        Model.setPrefLastRefreshUrl(Date.now());

                        parsedData.url = dataUrl;
                        parsedData.isUrlAuth = isUrlAuth;

                        that._onProvideNewData({
                            data: parsedData,
                            screen: options.screen,
                            usePreviousOpts: options.usePreviousOpts
                        });

                    }

                    if (UWA.is(options.success, FUNCTION_TYPE)) {
                        options.success();
                    }
                }

                parsedDataTemp = parseData(data);

                if (parsedDataTemp.error) {
                    return;
                } else if (parsedDataTemp.askSeparator) {
                    View.askCsvSeparator(function () {
                        onParseDataEnd(parseData(data));
                    });
                } else {
                    onParseDataEnd(parsedDataTemp);
                }
            } // End function onSuccess()

            /**
             * @private
             * @param {Object} failureOptions                    - Hash options.
             * @param {String} failureOptions.customErrorMessage - Custom error message.
             */
            function onFailure (failureOptions) {
                var errorMessage;

                failureOptions = failureOptions || {};

                errorMessage = failureOptions.customErrorMessage || that.replace(ERROR_MESSAGE_TEXT, {action: Nls.retrievingAction, url: dataUrl});

                if (UWA.is(options.failure, FUNCTION_TYPE)) {

                    options.failure({
                        message: errorMessage
                    });

                } else {

                    View.setError({message: errorMessage});
                    View.showHomeScreen(true);

                }
            }  // End function onFailure()


            // ===================================
            // Start of function _fetchDataByUrl()
            // ===================================

            options = options || {};

            if (!dataUrl) {
                onFailure({customErrorMessage: Nls.noUrlProvided});
                return;
            }

            // UWA.log('GraphReader says: Fetching data by url.');

            Data.request(dataUrl, {
                proxy: isUrlAuth ? 'passport' : '',
                onComplete: onSuccess,
                onFailure: onFailure
            });
        }, // End function _fetchDataByUrl()


        /**
         * Save new data.
         * @param {Object}  options                 - Options.
         * @param {Object}  options.data            - New data to save.
         * @param {String}  options.screen          - Screen to show after saving data.
         * @param {Boolean} options.usePreviousOpts - Does the new fetched data has to use previous chart options.
         */
        _onProvideNewData: function (options) {
            var screenToShow, newProvidedData,
                that = this,
                Model = that.Model,
                View = that.View;

            screenToShow = options.screen || Model.getPrefLastScreen() || SCREEN_OPTS;
            newProvidedData = options.data;

            // Force to show Options screen after provided new data if home screen was the last screen shown.
            if (screenToShow === SCREEN_HOME) {
                screenToShow = SCREEN_OPTS;
            }

            // Force the last screen saving.
            Model.setPrefLastScreen(screenToShow);

            // Save new data as Original.
            Model.setOriginalData(newProvidedData);

            if (options.usePreviousOpts && Model.hasCurrentData()) {
                var previousData = Model.getData(),
                    newCategories = newProvidedData.xAxis.categories || [];

                // Get new data.
                previousData.series = newProvidedData.series;

                // Get new categories.
                if (newCategories.length) {
                    previousData.xAxis.categories = newCategories;
                }

                try {
                    // Convert new data in previous chart type data.
                    newProvidedData = that.convertDataType(previousData, newProvidedData.originalType, previousData.type);
                } catch (e) {
                    View.setError({message: Nls.errorParsingData});
                    View.showHomeScreen();
                    return;
                }
            }

            // Save new data as Custom data.
            that.onSetData(newProvidedData);

            // Save raw data provided by the user.
            if (that._dataToParseSave) {
                Model.setPrefRawData(that._dataToParseSave);
                that._dataToParseSave = null;
            }

            View.setAccessToExistingData(true);

            // Change the current screen or force to refresh the current.
            View.showScreen(screenToShow, true);
        }, // End function _onProvideNewData()


        /**
         * Parse raw data to create valid and normalized data.
         * @param {String} dataToParse - Raw data to parse.
         * @return {Object} Valid and normalized data, ready to save.
         */
        _parseProvidedData: function (dataToParse) {
            var json, columns, categories, reg, regDragCompare, csvSeparator,
                hasCommaSeparator, hasSemiColonSeparator,
                COMMA = ',',
                SEMICOLON = ';',
                that = this,
                mergeData = UWA.clone(that.DEFAULT_DATA),
                hasSeriesName = false,
                hasFirstComma = false,
                hasCat = false,
                hasDragCompare = false;

            /**
             * This will parse a delimited string into an array of
             * arrays. The default delimiter is the comma, but this
             * can be overriden in the second argument.
             * @private
             */
            function parseCSVToArray (strData, strDelimiter) {
                var objPattern, arrData, arrMatches, strMatchedDelimiter, strMatchedValue;

                // Check to see if the delimiter is defined. If not, then default to comma.
                strDelimiter = strDelimiter || DEFAULT_CSV_STR_DELIMITER;

                // Create a regular expression to parse the CSV values.
                objPattern = new RegExp(
                    (
                        // Delimiters.
                        '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +

                        // Quoted fields.
                        '(?:\\s*\"([^\"]*(?:\"\"[^\"]*)*)\"|' +

                        // Standard fields.
                        '([^\"\\' + strDelimiter + '\\r\\n]*))'
                    ),
                    'gi'
                );


                // Create an array to hold our data. Give the array
                // a default empty first row.
                arrData = [[]];

                // Create an array to hold our individual pattern
                // matching groups.
                arrMatches = null;


                // Keep looping over the regular expression matches
                // until we can no longer find a match.
                while (arrMatches = objPattern.exec(strData)) {

                    // Get the delimiter that was found.
                    strMatchedDelimiter = arrMatches[1];

                    // Check to see if the given delimiter has a length
                    // (is not the start of string) and if it matches
                    // field delimiter. If id does not, then we know
                    // that this delimiter is a row delimiter.
                    if (
                        strMatchedDelimiter.length &&
                        (strMatchedDelimiter !== strDelimiter)
                    ) {

                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push([]);
                    }

                    // Now that we have our delimiter out of the way,
                    // let's check to see which kind of value we
                    // captured (quoted or unquoted).
                    if (arrMatches[2]) {
                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        strMatchedValue = arrMatches[2].replace(
                            new RegExp( '\"\"', 'g' ),
                            '\"'
                        );
                    } else {
                        // We found a non-quoted value.
                        strMatchedValue = arrMatches[3];
                    }

                    // Now that we have our value string, let's add
                    // it to the data array.
                    arrData[arrData.length - 1].push(strMatchedValue);
                }

                // Return the parsed data.
                return arrData;
            } // End function parseCSVToArray()

            /**
             * @private
             */
            function extractSeriesName (parsedData) {
                var i, el, firstLine, firstRow, nbSeriesName, nbRow;

                columns = [];

                if (hasFirstComma) {
                    // remove first line from data.
                    firstLine = parsedData.shift();

                    // remove first empty el.
                    firstLine.shift();

                    // get series name.
                    columns = firstLine || [];

                } else {
                    firstRow = parsedData[0] || '';
                    nbRow = firstRow.length;
                    nbSeriesName = 0;

                    for (i = 0; i < nbRow; i++) {
                        el = firstRow[i];

                        // Test if first el of the first row is a serie name or a value.
                        if (el && !el.test(/^(-)?[0-9]+[.,]?[0-9]*$/i)) {
                            columns[i] = el; // set the el as serie name.
                            firstRow[i] = 0; // reset its value
                            nbSeriesName++;
                        }
                    }

                    // If only first cel is a name so it is categorie.
                    if (nbSeriesName === 1) {
                        categories = [];
                        categories.push(columns[0]);
                        columns = [];
                        firstRow.shift();
                    }
                    // If all cells are names so it is series name.
                    else if (nbRow === nbSeriesName) {
                        parsedData.shift();
                    }
                    // If at least there are two cells which are names so we concider that all cells are series name.
                    else if (nbSeriesName >= 2 || nbSeriesName > nbRow / 2) {

                        for (i = 0; i < nbRow; i++) {
                            el = firstRow[i];

                            if (el !== 0) {
                                columns[i] = el; // set the el as serie name.
                            }
                        }

                        parsedData.shift();
                    }
                }

                return parsedData;
            } // End function extractSeriesName()

            /**
             * @private
             */
            function extractCategories (parsedData) {
                var firstEl,
                    i = 0,
                    nbLines = parsedData.length,
                    firstColumnIsCategory = false;

                categories = categories || [];

                if (hasFirstComma) {
                    for (; i < nbLines; i++) {
                        categories.push(parsedData[i].shift());
                    }
                } else {
                    for (; i < nbLines; i++) {
                        firstEl = parsedData[i][0];

                        // Test if first el of each line is a category or a value.
                        if (firstEl && (firstColumnIsCategory || !firstEl.test(/^(-)?[0-9]+[.,]?[0-9]*$/i))) {
                            firstColumnIsCategory = true;
                            categories.push(parsedData[i].shift());
                        }
                    }
                }

                return parsedData;
            } // End function extractCategories()

            /**
             * @private
             */
            function formatData (parsedData) {
                var type;

                /**
                 * @private
                 */
                function formatTable (parsedData) {
                    var i, u, nbRow, nbCol, data, row, hasColumnName, indice, el,
                        serie = parsedData.series[0] || '',
                        emptySeries = [],
                        emptySeriesIndexes = [],
                        reg = new RegExp(',', 'g'); // To replace all "," to "." for float.

                    function filterEmptySeries (value, index) {
                        return emptySeriesIndexes.indexOf(index) < 0;
                    }

                    if (!serie) {
                        return parsedData;
                    }

                    data = serie.data || [];
                    nbRow = data.length;
                    nbCol = 0;
                    columns = serie.columns || [];
                    hasColumnName = !!columns.length;

                    // Get the max column length.
                    for (i = 0; i < nbRow; i++) {
                        nbCol = Math.max(nbCol, data[i].length);
                    }

                    // init emptySeries array.
                    for (u = 0; u < nbCol; u++) {
                        emptySeries[u] = 0;
                    }

                    // Format the table data.
                    for (i = 0, nbRow = data.length; i < nbRow; i++) {
                        row = data[i];

                        for (u = 0; u < nbCol; u++) {
                            el = row[u];

                            if (!el) {
                                row[u] = 0;
                                emptySeries[u]++;
                            } else {
                                row[u] = UWA.is(el, 'string') ? el.replace(reg, '.') : el;
                            }
                        }
                    }

                    // Get empty series indexes.
                    for (u = 0; u < nbCol; u++) {
                        // If series has 0 value into each row and has no column name.
                        if (emptySeries[u] === nbRow && !columns[u]) {
                            emptySeriesIndexes.push(u);
                        }
                    }

                    // remove empty series
                    if (emptySeriesIndexes.length) {
                        for (i = 0; i < nbRow; i++) {
                            data[i] = data[i].filter(filterEmptySeries);
                        }

                        columns = columns.filter(filterEmptySeries);

                        nbCol = data[0].length;
                    }

                    // Fill empty column name.
                    if (hasColumnName) {
                        indice = 1;

                        for (u = 0; u < nbCol; u++) {

                            if (!columns[u]) {
                                columns[u] = 's' + indice++;
                            }
                        }

                        serie.columns = columns;
                    }

                    return parsedData;
                } // End function formatTable()

                /**
                 * @private
                 */
                function formatLine (parsedData) {
                    var series = parsedData.series || [];

                    parsedData.series = series.filter(function (serie) {
                        return !!((serie.data && serie.data.length) || serie.name);
                    });

                    return parsedData;
                } // End function formatLine()

                /**
                 * @private
                 */
                function formatPie (parsedData) {
                    var series = parsedData.series || [{}],
                        data = series[0].data || [];

                    series[0].data = data.filter(function (data) {
                        return !!((data.name || data[0]) || (data.y) || data[1]);
                    });

                    return parsedData;
                } // End function formatPie()


                // ==============================
                // Start of function formatData()
                // ==============================

                type = parsedData.type || parsedData.originalType;

                switch (type) {
                case GRAPH_TYPE_TABLE:
                    formatTable(parsedData);
                    break;
                case GRAPH_TYPE_LINE:
                case GRAPH_TYPE_COLUMN:
                    formatLine(parsedData);
                    break;
                case GRAPH_TYPE_PIE:
                case GRAPH_TYPE_DONUT:
                    formatPie(parsedData);
                    break;
                }

                return parsedData;
            } // End function formatData()


            // ======================================
            // Start of function _parseProvidedData()
            // ======================================

            that._dataToParseSave = dataToParse;

            try {
                dataToParse = dataToParse.trim();
                json = JSON.parse(dataToParse);

            } catch (e) {
                try {

                    /* jshint evil: true */
                    json = new Function('return (' + dataToParse + ')')();
                    /* jshint evil: false */


                    if (!UWA.is(json, 'object')) {
                        throw(e);
                    }

                } catch (e) {
                    try {

                        csvSeparator = that.Model.getPrefCsvSeparator();

                        if (!csvSeparator) {

                            hasCommaSeparator = dataToParse.indexOf(COMMA) >= 0;
                            hasSemiColonSeparator = dataToParse.indexOf(SEMICOLON) >= 0;

                            if (hasCommaSeparator && hasSemiColonSeparator) {
                                return {askSeparator: true};
                            }

                            if (hasCommaSeparator && !hasSemiColonSeparator){
                                csvSeparator = COMMA;
                            } else if (!hasCommaSeparator && hasSemiColonSeparator) {
                                csvSeparator = SEMICOLON;
                            }

                        }

                        csvSeparator = csvSeparator || DEFAULT_CSV_STR_DELIMITER;

                        // Regex for keyword categories at begining to define the first column as categories.
                        reg = new RegExp(
                            // if data begin by the categories key word.
                            '(^' + CSV_STR_CATEGORIES + '\\s*' + csvSeparator + ')|' +
                            '(^\"' + CSV_STR_CATEGORIES  + '\"\\s*' + csvSeparator + ')|' +

                            // if data begin by CSV_STR_DELIMITER.
                            '(^' + csvSeparator + ')|' +
                            '(^\"\"\\s*' + csvSeparator + ')',
                        'i');

                        // Regex for keyword dragcompare at begining to activate the drag and compare.
                        regDragCompare = new RegExp(
                            '(^dragcompare\\s*' + csvSeparator + ')|' +
                            '(^\"dragcompare\"\\s*' + csvSeparator + ')',
                        'i');


                        // If data begin by the dragcompare key word.
                        if (regDragCompare.test(dataToParse)) {

                            dataToParse = dataToParse.replace(regDragCompare, ''); // Remove dragcompare key word from data.
                            dataToParse = dataToParse.trim();
                            hasDragCompare = true;
                        }

                        // If data has categories key word.
                        if (reg.test(dataToParse)) {
                            dataToParse = dataToParse.replace(reg, ''); // Remove categories key word from data.
                            dataToParse = dataToParse.trim();

                            dataToParse = '""' + csvSeparator + dataToParse; // Add an empty value at begin.
                            hasFirstComma = true;
                            hasCat = true;
                            hasSeriesName = true;
                        }

                        // Parse CSV.
                        json = parseCSVToArray(dataToParse, csvSeparator) || [];

                        // Extract meta data from parsed data.
                        extractSeriesName(json);
                        extractCategories(json);

                        // Build a new Data set with table type.
                        json = {
                            type: GRAPH_TYPE_TABLE,
                            xAxis: {
                                categories: categories
                            },
                            series: [{
                                columns: columns,
                                data: json
                            }]
                        };

                        if (hasDragCompare) {
                            json.dragcompare = true;
                        }
                    } catch (e) {
                        throw e;
                    }
                }
            }

            if (!UWA.is(json, 'object')) {
                throw '';
            }

            // Merge default and parse data.
            UWA.extend(mergeData, json, true);
            mergeData.originalType = mergeData.type || GRAPH_TYPE_LINE;

            mergeData.xAxis.useCategories = !!mergeData.xAxis.categories.length;

            formatData(mergeData);

            return mergeData;
        }, // End function _parseProvidedData()


        /**
         * @param {String} stringToParse - String to parse in float.
         * @return {Float} Float parsed from given string.
         * @private
         */
        _parseFloat: function (stringToParse) {
            return parseFloat(stringToParse, 10) || 0;
        } // End function _parseFloat()
    });

    return Controller;
});
