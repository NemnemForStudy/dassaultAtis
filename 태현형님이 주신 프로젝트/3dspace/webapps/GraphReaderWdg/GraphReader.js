/**
 * @overview GraphReader Widget.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/GraphReader', [
    // UWA
    'UWA/Core',
    'UWA/Class',

    // GraphReaderWdg
    'DS/GraphReaderWdg/Controller',
],
function (
    UWA,
    Class,

    GraphReaderController
) {

    'use strict';

    var GraphReader = Class.extend({


        // PUBLIC vars
        // -----------

        /**
         * @property {Object} options hash.
         */
        options: {},

        /**
         * @property {UWA/Widget} widget instance.
         */
        widget: null,

        /**
         * @property {DS/GraphReaderWdg/Controller} GraphReader Controller instance.
         */
        Controller: null,


        // PRIVATE vars
        // ------------

        /**
         * @property {Boolean} _isFirstLoad.
         * @private
         */
        _isFirstLoad: true,

        /**
         * @property {Boolean} _readOnly.
         * @private
         */
        _readOnly: false,


        // =========================
        // PUBLIC API
        // =========================


        /**
         * Init the GraphReader Widget.
         * @param {Object}     options          - Hash options.
         * @param {UWA/Widget} options.widget   - Widget instance.
         * @param {TagNavigatorProxy/TagNavigatorProxy} options.TagNavigatorProxy - TagNavigatorProxy module.
         */
        init: function (options) {
            var that = this;

            // Init variables
            that.options = UWA.extend({}, UWA.clone(options, false) || {});

            that.widget = options.widget;
            that._readOnly = that.widget.readOnly;

            // Init widget object events
            that.initWidgetEvents();
        },


        /**
         * Init the widget events.
         */
        initWidgetEvents: function () {
            var that = this;

            // Add widget events
            that.widget.addEvents({
                onLoad: that.onLoad.bind(that),
                onRefresh: that.onRefresh.bind(that),
                onDestroy: that.onDestroy.bind(that)
            });
        },


        /**
         * Init the widget events using Controller,
         * Need to be called after Controller creation.
         */
        initControllerEvents: function () {
            var that = this,
                Controller = that.Controller;

                // Add widget events using controller.
            that.widget.addEvents({
                onResize: Controller.onResize.bind(Controller),
                onViewChange: Controller.onViewChange.bind(Controller),
                onSearch: Controller.onSearch.bind(Controller),
                onResetSearch: Controller.onResetSearch.bind(Controller),
                onContextChange: Controller.onContextChange.bind(Controller)
            });
        },


        /**
         * Get widget id.
         * @return {String} Widget id.
         */
        getWidgetId: function () {
            return this.widget.id || '';
        },


        /**
         * On widget load.
         * @param {Object}  options              - Options hash.
         * @param {Boolean} options.forceRefresh - Force the refresh by retrieving data.
         */
        onLoad: function (options) {
            var widget,
                that = this;

            if (that._isFirstLoad) {
                widget = that.widget;

                widget.body.empty(); // Empty widget body.

                that.Controller = new GraphReaderController({
                    GraphReader: that,
                    widgetCtx: widget,
                    TagNavigatorProxy: that.options.TagNavigatorProxy,
                    readOnly: that._readOnly
                });

                that.initControllerEvents();

                that._isFirstLoad = false;
            }

            that.Controller.onLoad(options || {});
        },


        /**
         * On widget refresh.
         */
        onRefresh: function () {
            this.onLoad({
                forceRefresh: true
            });
        },


        /**
         * Init the GraphReader Model.
         * @param {Object} data - OnViewChange data.
         */
        // onViewChange: function (data) {
        // },


        /**
         * On widet destroy.
         */
        onDestroy: function () {
            this.Controller.onDestroy();
        }
    });

    return GraphReader;
});
