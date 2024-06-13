/* global Set */
define('DS/TransientWidget/Controller/Transient', [
    // UWA
    'UWA/Class',

    // TransientWidget
    'DS/TransientWidget/Tool/Mapping',
    'DS/TransientWidget/Tool/TransientMessaging'
],
function (
    // UWA
    Class,

    // TransientWidget
    Mapping,
    TransientMessaging
) {
    'use strict';

    var Transient = Class.extend({

        _opened: new Set(),

        init: function () {
            var that = this;

            TransientMessaging.getInstance().on(Mapping.TransientMessaging.ShowWidget, function (args) {
                args = args || {};
                that._opened.add(args.appId || 'unknown');
            });

            TransientMessaging.getInstance().on(Mapping.TransientMessaging.CloseWidget, function (args) {
                args = args || {};
                if (args.appId) {
                    that._opened.delete(args.appId);
                } else {
                    that._opened.clear();
                }
            });

            // Tell if this Transient instance is visible or not
            Object.defineProperty(that, 'isOpen', {
                get: function () {
                    return (window.widget && window !== top)
                        ? top.require('DS/TransientWidget/TransientWidget').isOpen
                        : that._opened.size > 0;
                }
            });
        },

        /**
         * Displays a Widget Preview (aka Transient Widget).
         *
         * @param {String} widgetUrl        - Url of the Widget Preview or app id.
         * @param {Object} [widgetTitle=''] - Title of the Widget Preview.
         *                                    It will be concatenated to the widget "source" title
         *                                    (in the <title> markup).
         * @param {String|Object} [widgetData={}] - Set of preferences of the Widget Preview
         *                                          or the url to retrieve the preferences.
         */
        showWidget: function (widgetUrl, widgetTitle, widgetData, options) {
            function fireShowWidgetEvent () {
                TransientMessaging.getInstance().fire(
                    Mapping.TransientMessaging.ShowWidget, {
                        appId: widgetUrl,
                        title: widgetTitle,
                        data: widgetData,
                        options: options
                    }
                );
            }

            // Fire the event immediately, in case the loading of TopFrameMananger has already finished
            fireShowWidgetEvent();

            // In case the TopFrameManegr hasn't loaded yet, re-fire the event later
            require([['DS', 'PubSub', 'PubSub'].join('/')], function (PubSub) {
                PubSub.addOnce('loadedTopFrameManager', fireShowWidgetEvent);
            });

        },

        /**
         * Closes any existing Widget Preview (aka Transient Widget).
         * @param {string} [appId] - Url of the Widget Preview or app id to be closed.
         *     Defaults to the currently opened Widget Preview.
         */
        closeWidget: function (appId) {
            TransientMessaging.getInstance().fire(Mapping.TransientMessaging.CloseWidget, { appId: appId });
        },

        /**
         * Hides the currently opened Widget Preview (aka Transient Widget)
         * without closing it and without destroying it.
         * WARNING: This method does not close the Widget Preview!
         *          #isWidgetOpen will still returns TRUE after hidding a Widget Preview.
         */
        hide: function () {
            TransientMessaging.getInstance().fire(Mapping.TransientMessaging.Hide);
        },

        /**
         * Tells if a Widget Preview (aka Transient Widget) is open.
         * Note1: Will return TRUE even if a Floating Widget Preview is open.
         * Note2: Can be called from either the top document or from a widget context.
         * @param {string} [appId] - The appId to check as being open
         * @returns {boolean} Is a Widget Preview is open OR Does the provided Widget Preview is Open.
         */
        isWidgetOpen: function (appId) {
            var widget = window.widget,
                widgetId, isWidgetPreview;

            // If there is no widget object in the window object, that means the
            // code is triggered outside a framed widget.
            if (!widget) {
                // When not inside a framed widget, we can use 'isOpen', since
                // the state is being correctly updated when open & close happens.
                return !!(appId
                    ? this._opened.has(appId)
                    : this.isOpen);
            } else {
                // Inside an framed widget, another instance is created. So use the widget id
                widgetId = widget.id || '';
                isWidgetPreview = widgetId.contains('preview');

                if (!appId || (appId && widget.getValue('appId') === appId)) {
                    return isWidgetPreview;
                } else {
                    return false;
                }
            }
        },

        /**
         * Show the currently opened Widget Preview (aka Transient Widget)
         * (The one which was hidden by hide method).
         */
        show: function () {
            TransientMessaging.getInstance().fire(Mapping.TransientMessaging.Show);
        }
    });

    return Transient;
});
