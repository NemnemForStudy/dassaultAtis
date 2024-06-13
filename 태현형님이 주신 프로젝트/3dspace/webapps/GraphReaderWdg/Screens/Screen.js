
/**
 * @overview GraphReader Screen.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Screens/Screen',
[
    // UWA
    'UWA/Core',
    'UWA/Class'
],

/**
 * @module DS/GraphReaderWdg/Screens/Screen
 *
 * @requires UWA/Core
 * @requires UWA/Class
 */
function (UWA, Class) {
    'use strict';

    var Screen = Class.extend({

        // PUBLIC vars
        // -----------

        /**
         * @property {DS/GraphReaderWdg/Model} Model - GraphReader Model instance.
         */
        Model: null,

        /**
         * @property {DS/GraphReaderWdg/View} View - GraphReader View instance.
         */
        View: null,

        /**
         * @property {DS/GraphReaderWdg/Controller} Controller - GraphReader Controller instance.
         */
        Controller: null,

        /**
         * @property {Object} elements - Screen DOM elements.
         */
        elements: null,

        /**
         * @property {Element} widgetBody - Widget body DOM element.
         */
        widgetBody: null,




        // PRIVATE vars
        // ------------

        /**
         * @property {Boolean} _isBuilt - Is the screen is built.
         * @private
         */
        _isBuilt: false,




        // =========================
        // PUBLIC API
        // =========================


        /**
         * Init the screen view.
         * @param {Object}                       options            - Hash options.
         * @param {Element}                      options.widgetBody - Widget body DOM element.
         * @param {DS/GraphReaderWdg/Model}      options.Model      - GraphReader Model instance.
         * @param {DS/GraphReaderWdg/View}       options.View       - GraphReader View instance.
         * @param {DS/GraphReaderWdg/Controller} options.Controller - GraphReader Controller instance.
         */
        init: function (options) {
            this._parent(options);

            this.widgetBody = options.widgetBody;
            this.Model = options.Model;
            this.View = options.View;
            this.Controller = options.Controller;

            this._isBuilt = false;
            this.elements = {};
        }, // End function init()


        /**
         * Show the screen.
         */
        show: function () {
            if (this._isBuilt) {
                this.elements.screenCtn.show();
            }
        }, // End function show()


        /**
         * Hide the screen.
         */
        hide: function () {
            if (this._isBuilt) {
                this.elements.screenCtn.hide();
            }
        }, // End function hide()


        /**
         * Destroy the screen.
         */
        destroy: function () {
            // Destroy DOM elements.
            if (this._isBuilt) {
                this.elements.screenCtn.destroy();
                this._isBuilt = false;
            }

            this.elements = {};

            this._parent();
        } // End function destroy()
    });

    return Screen;
});
