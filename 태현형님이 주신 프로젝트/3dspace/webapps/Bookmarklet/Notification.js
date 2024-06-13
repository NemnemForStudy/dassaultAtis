/* global define */
define('DS/Bookmarklet/Notification', [
    'UWA/Class/View',
    'UWA/Utils',

    'DS/UIKIT/Alert',

    'DS/UWPClientControls/Utils',

    'DS/Bookmarklet/GettingTheBookmarklet',

    'i18n!DS/Bookmarklet/assets/nls/bookmarklet',

    'css!DS/Bookmarklet/Notification'
], function (
    View,
    Utils,

    UIKitAlert,

    WPUtils,

    GettingTheBookmarklet,

    nls
) {
    'use strict';

    return View.extend({

        tagName: 'div',

        className: 'bookmarklet-notification',

        alert: null,

        AUTO_CLOSE_TIME: 10000,

        /**
         * @param {object} [options]
         * @param {function} [options.onDoNotShowAgain] - If set, shows a "Do not show again" option in the alert.
         *    When clicked on, the callback is invoked.
         */
        setup: function (options) {
            this.options = options || {};
        },

        /**
         * Render Bookmarklet notifictation.
         */
        render: function () {

            this.alert = new UIKitAlert({
                className: 'bookmarklet',
                closable: false,
                closeOnClick: false,
                visible: true,
                messages: [{
                    'class': 'default',
                    html: [{
                        tag: 'div',
                        'class': 'bookmarkletTitle',
                        text: nls.title
                    }, {
                        tag: 'a',
                        title: nls.button,
                        'class': 'draggableBookmarklet btn btn-primary',
                        href: GettingTheBookmarklet.url(),
                        onclick: 'return false',
                        text: nls.button
                    }].concat(typeof this.options.onDoNotShowAgain === 'function' ? [{
                        tag: 'div',
                        'class': 'do-not-show-again-ctn',
                        html: {
                            tag: 'a',
                            'class': 'do-not-show-again',
                            text: nls.doNotShowAgain,
                            events: {
                                click: (function () {
                                    this.options.onDoNotShowAgain();
                                    this.hideAlert();
                                }).bind(this)
                            }
                        }
                    }] : [])
                }]
            });

            // Timer to autoclose of Bookmarklet after 10sec
            setTimeout(this.hideAlert.bind(this), this.AUTO_CLOSE_TIME);

            return this;
        },

        /**
         * Inject the alert and show it.
         * Note1: Bookmarklet should not be displayed on touch device.
         * Note2: Bookmarklet should not be displayed on a widget that was added
         *       via the Bookmarklet. If the widget was added through the
         *       Bookmarklet, the URL will contain a pattern '__x3dshare'.
         */
        onPostInject: function () {
            this.alert.inject(this.container);

            this._hasBeenOpenedByBookmarklet() || WPUtils.hasTouch()
                ? this.hideAlert()
                : this.showAlert();
        },

        hideAlert: function () {
            this.alert && this.alert.isVisible && this.alert.hide();
            this.hide();
        },

        showAlert: function () {
            this.show();
            this.alert && !this.alert.isVisible && this.alert.show();
        },

        destroy: function () {
            this.alert && this.alert.destroy();
            this.alert = null;

            this._parent.apply(this, arguments);
        },

        /**
         * Return TRUE if a widget was added by a bookmarklet else FALSE.
         * @returns {boolean} - Return TRUE if a widget was added by a bookmarklet.
         * @private
         *
         * Note: If the widget was added through the Bookmarklet, the URL will
         *       contain a pattern '__x3dshare'.
         */
        _hasBeenOpenedByBookmarklet: function () {
            return Object.keys(Utils.parseQuery(top.window.location.search || ''))
                .some(function (key) { return key === '__x3dsharer'; });
        }
    });
});
