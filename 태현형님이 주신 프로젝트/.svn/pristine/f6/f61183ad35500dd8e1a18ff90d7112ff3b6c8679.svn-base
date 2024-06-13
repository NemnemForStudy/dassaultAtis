/**
 * @overview GraphReader Model.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Model',
[
    // UWA
    'UWA/Core',
    'UWA/Class'
],

/**
 * @module DS/GraphReaderWdg/Model
 *
 * @requires UWA/Core
 * @requires UWA/Class
 */
function (UWA, Class) {
    'use strict';

    var PREF_DATA = 'data',
        PREF_ORIGINAL_DATA = 'originalData',
        PREF_RAW_DATA = 'rawData',
        PREF_REFRESH_URL = 'refreshUrl',
        PREF_LAST_REFRESH_URL = 'lastRefreshUrl',
        PREF_IS_URL_AUTH = 'isUrlAuth',
        PREF_URL = 'url',
        PREF_TITLE = 'title',
        PREF_LAST_SCREEN = 'lastScreen',
        PREF_TAGS = 'tags',
        PREF_CSV_SEPARATOR = 'csvSeparator';


    var Model = Class.extend({

        /**
         * @property {UWA/Widget} _widgetCtx.
         * @private
         */
        _widgetCtx: null,

        /**
         * @property {Object} _originalData.
         * @private
         */
        _originalData: null,

        /**
         * @property {Object} _currentData.
         * @private
         */
        _currentData: null,

        /**
         * @property {Object} _checkedData.
         * @private
         */
        _checkedData: null,

        /**
         * @property {String} _previousScreen.
         * @private
         */
        _previousScreen: '',


        // =========================
        // PUBLIC API
        // =========================


        /**
         * Init the GraphReader Model.
         * @param {Object} options - Hash options.
         * @param {UWA/Widget} options.widgetCtx - Widget instance context.
         */
        init: function (options) {
            this._widgetCtx = options.widgetCtx;

            this._originalData = this._getPrefOriginalData();
            this._currentData = this._getPrefData();

            this._previousScreen = this.getPrefLastScreen();
        }, // End function init()


        /**
         * @return {Integer} RefreshUrl widget preference, number of miliseconde before re-fetching data from the url.
         */
        getPrefRefreshUrl: function () {
            return parseInt(this._widgetCtx.getValue(PREF_REFRESH_URL), 10) || 0;
        },


        /**
         * @param {Integer} refreshUrl - RefreshUrl widget preference, number of miliseconde before re-fetching data from the url.
         */
        setPrefRefreshUrl: function (refreshUrl) {
            this._widgetCtx.setValue(PREF_REFRESH_URL, refreshUrl || 0);
        },


        /**
         * @return {Integer} LastRefreshUrl widget preference, timestamp of the last re-fetching data from the url.
         */
        getPrefLastRefreshUrl: function () {
            return parseInt(this._widgetCtx.getValue(PREF_LAST_REFRESH_URL), 10) || 0;
        },


        /**
         * @param {Integer} lastRefreshUrl - LastRefreshUrl widget preference, timestamp of the last re-fetching data from the url.
         */
        setPrefLastRefreshUrl: function (lastRefreshUrl) {
            this._widgetCtx.setValue(PREF_LAST_REFRESH_URL, lastRefreshUrl || 0);
        },


        /**
         * @return {Boolean} IsUrlAuth widget preference, is the url need to use the passport proxy.
         */
        getPrefIsUrlAuth: function () {
            return this._widgetCtx.getValue(PREF_IS_URL_AUTH);
        },


        /**
         * @param {Boolean} isUrlAuth - IsUrlAuth widget preference, is the url need to use the passport proxy.
         */
        setPrefIsUrlAuth: function (isUrlAuth) {
            this._widgetCtx.setValue(PREF_IS_URL_AUTH, !!isUrlAuth);
        },


        /**
         * @return {String} Url widget preference, url to fetch data.
         */
        getPrefUrl: function () {
            return this._widgetCtx.getValue(PREF_URL) || '';
        },


        /**
         * @param {String} url - Url widget preference, url to fetch data.
         */
        setPrefUrl: function (url) {
            this._widgetCtx.setValue(PREF_URL, url || '');
        },


        /**
         * @return {Boolean} Is an url is set.
         */
        hasPrefUrl: function () {
            return !!this.getPrefUrl();
        },


        /**
         * @return {String} Title widget preference, widget title.
         */
        getPrefTitle: function () {
            return this._widgetCtx.getValue(PREF_TITLE) || '';
        },


        /**
         * If title widget preference isn't empty, set the title of the widget.
         * @param {String} title - Title widget preference, widget title.
         */
        setPrefTitle: function (title) {
            var t = title || this.getPrefTitle();

            if (title) {
                this._widgetCtx.setValue(PREF_TITLE, title);
            }

            this._widgetCtx.setTitle(t);
        }, // End function setPrefTitle()


        /**
         * Clear the title widget preference.
         */
        clearPrefTitle: function () {
            this._widgetCtx.setValue(PREF_TITLE, '');
            this._widgetCtx.setTitle('');
        }, // End function clearTitle()


        /**
         * @return {String} LastScreen widget preference, last screen shown.
         */
        getPrefLastScreen: function () {
            return this._widgetCtx.getValue(PREF_LAST_SCREEN) || '';
        },


        /**
         * @param {String} lastScreen - LastScreen widget preference, last screen shown.
         */
        setPrefLastScreen: function (lastScreen) {
            this._widgetCtx.setValue(PREF_LAST_SCREEN, lastScreen || '');
        },


        /**
         * @return {Object} Tags widget preference, tags created from data.
         */
        getPrefTags: function () {
            return this._widgetCtx.getValue(PREF_TAGS) || {};
        },


        /**
         * @param {Object} tags - Tags widget preference, tags created from data.
         */
        setPrefTags: function (tags) {
            this._widgetCtx.setValue(PREF_TAGS, tags);
        },


        /**
         * @return {String} CsvSeparator widget preference, csv separator choosen by the user.
         */
        getPrefCsvSeparator: function () {
            return this._widgetCtx.getValue(PREF_CSV_SEPARATOR) || '';
        },


        /**
         * @param {String} csvSeparator - CsvSeparator widget preference, csv separator choosen by the user.
         */
        setPrefCsvSeparator: function (csvSeparator) {
            this._widgetCtx.setValue(PREF_CSV_SEPARATOR, csvSeparator);
        },


        /**
         * @return {String} RawData widget preference, raw data provided by the user (by url or by text input).
         */
        getPrefRawData: function () {
            return UWA.clone(this._widgetCtx.getValue(PREF_RAW_DATA)) || '';
        },


        /**
         * @param {String} data - RawData widget preference, raw data provided by the user (by url or by text input).
         */
        setPrefRawData: function (data) {
            this._widgetCtx.setValue(PREF_RAW_DATA, UWA.clone(data));
        },


        /**
         * @return {Object} Current Data used to draw the chart.
         */
        getData: function () {
            return UWA.clone(this._currentData) || {};
        },


        /**
         * Set the Data widget preference.
         * @param {Object} data - Current Data which will be used to draw the chart.
         */
        setData: function (data) {
            this._currentData = UWA.clone(data);
            this._setPrefData(data);
        },


        /**
         * @return {Object} Original data, result of the raw data parsing.
         */
        getOriginalData: function () {
            return UWA.clone(this._originalData) || {};
        },


        /**
         * Set the OriginalData widget preference.
         * @param {Object} data - Original data, result of the raw data parsing.
         */
        setOriginalData: function (data) {
            this._originalData = UWA.clone(data);
            this._setPrefOriginalData(data);
        },


        /**
         * @return {String} Get the chart type of the current data.
         */
        getDataType: function () {
            return this._currentData ? (this._currentData.type || '') : '';
        },


        /**
         * @return {String} Get the chart type of the original data.
         */
        getDataOriginalType: function () {
            return this._currentData ? (this._currentData.originalType || '') : '';
        },


        /**
         * @return {Object} Get the data used to display the check data chart.
         */
        getCheckedData: function () {
            return UWA.clone(this._checkedData) || {};
        },


        /**
         * @param {Object} data - Set data used to display the check data chart.
         */
        setCheckedData: function (data) {
            this._checkedData = UWA.clone(data);
        },


        /**
         * Clear the saved check data.
         */
        clearCheckedData: function () {
            this._checkedData = null;
        },


        /**
         * @return {Boolean} Widget has current data.
         */
        hasCurrentData: function () {
            return !!this._currentData;
        },


        /**
         * @param {String} Set the previous screen shown (use to rollback to the previous screen).
         */
        setPreviousScreen: function (previousScreen) {
            this._previousScreen = previousScreen;
        },


        /**
         * @return {String} Get the previous screen shown.
         */
        getPreviousScreen: function () {
            return this._previousScreen;
        },


        /**
         * Destroy the GraphReader Model.
         */
        destroy: function () {
            this._widgetCtx =
                this._originalData =
                    this._currentData =
                        this._checkedData =
                            this._previousScreen = null;
        },




        // =========================
        // PRIVATE API
        // =========================


        /**
         * @private
         * @return {Object} Get data widget preference.
         */
        _getPrefData: function () {
            return this._widgetCtx.getValue(PREF_DATA);
        }, // End function _getPrefData()


        /**
         * @private
         * @param {Object} data - Set data widget preference.
         */
        _setPrefData: function (data) {
            var dataToSave = UWA.clone(data);

            if (dataToSave.container) { // Cannot save HTML ref element into widget pref.
                delete dataToSave.container;
            }

            this._widgetCtx.setValue(PREF_DATA, dataToSave);
        }, // End function _setPrefData()


        /**
         * @private
         * @return {Object} Get original data widget preference.
         */
        _getPrefOriginalData: function () {
            return this._widgetCtx.getValue(PREF_ORIGINAL_DATA);
        }, // End function _getPrefOriginalData()


        /**
         * @private
         * @param {Object} data - Set original data widget preference.
         */
        _setPrefOriginalData: function (data) {
            var dataToSave = UWA.clone(data);

            if (dataToSave.container) { // Cannot save HTML ref element into widget pref.
                delete dataToSave.container;
            }

            this._widgetCtx.setValue(PREF_ORIGINAL_DATA, dataToSave);
        } // End function _setPrefOriginalData()
    });

    return Model;
});
