
/**
 * @overview GraphReader Screen Denied.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Screens/Denied',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Model',

    // UIKIT
    'DS/UIKIT/Alert',

    // GraphReaderWdg
    'DS/GraphReaderWdg/Screens/Screen',

    // NLS
    'i18n!DS/GraphReaderWdg/assets/nls/GraphReader'
],

/**
 * @module DS/GraphReaderWdg/Screens/Denied
 *
 * @requires UWA/Core
 * @requires UWA/Class/Model
 *
 * @requires DS/UIKIT/Alert
 *
 * @requires DS/GraphReaderWdg/Screens/Screen
 *
 * @requires i18n!DS/GraphReaderWdg/assets/nls/GraphReader
 */
function (
    // UWA
    UWA,
    Model,

    // UIKIT
    UIKITAlert,

    // GraphReaderWdg
    ScreenAbstract,

    // NLS
    Nls
) {
    'use strict';

    var Screen = ScreenAbstract.extend({


        _alert: null,

        /**
         * Show the screen.
         */
        show: function (options) {
            var message, screenCtn,
                that = this;

            options = options || {};
            message = options.message || Nls.NoAccessToData;

            if (!that._isBuilt) {
                that._build();
                that._isBuilt = true;
            }

            screenCtn = that.elements.screenCtn;

            if (that._alert) {
                that._alert.destroy();
            }

            screenCtn.empty();

            that._alert = new UIKITAlert({
                className: 'alert denied-notif',
                closable: false,
                visible: true,
                messages: message,
                messageClassName: this.View.ALERT_ERROR_CLASS
            }).inject(screenCtn);

            screenCtn.show();

            that._parent();
        },


        /**
         * Destroy the screen.
         */
        destroy: function () {
            this._parent();
        },


        /**
         * Build the screen.
         * @private
         */
        _build: function () {
            this.elements.screenCtn = UWA.createElement('div', {
                'class': 'screen-denied'
            }).inject(this.widgetBody);
        }
    });


    /**
     * Screen name.
     * @constant {String} NAME
     * @memberOf module:DS/GraphReaderWdg/Screens/Denied
     */
    Screen.NAME = 'denied';


    return Screen;
});
