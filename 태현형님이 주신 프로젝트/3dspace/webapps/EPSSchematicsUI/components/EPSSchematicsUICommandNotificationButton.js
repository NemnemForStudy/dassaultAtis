/// <amd-module name='DS/EPSSchematicsUI/components/EPSSchematicsUICommandNotificationButton'/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("DS/EPSSchematicsUI/components/EPSSchematicsUICommandNotificationButton", ["require", "exports", "DS/EPSSchematicsUI/components/EPSSchematicsUICommandButton", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, UICommandButton, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI command notification button.
     * @class UICommandNotificationButton
     * @alias module:DS/EPSSchematicsUI/components/EPSSchematicsUICommandNotificationButton
     * @extends UICommandButton
     * @private
     */
    var UICommandNotificationButton = /** @class */ (function (_super) {
        __extends(UICommandNotificationButton, _super);
        /**
         * @constructor
         * @param {ICommandButtonOptions} options - The command button options.
         * @param {UIDebugConsoleController} controller - The UI debug console controller.
         */
        function UICommandNotificationButton(options, controller) {
            var _this = _super.call(this, options) || this;
            _this._controller = controller;
            var notificationCount = _this._controller.getNotificationCount();
            if (notificationCount) {
                var notificationStrength = _this._controller.getNotificationStrength();
                _this.displayNotification(notificationCount, notificationStrength);
            }
            return _this;
        }
        /**
         * Removes the command button.
         * @public
         */
        UICommandNotificationButton.prototype.remove = function () {
            this._controller = undefined;
            this._icon = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Displays a notification.
         * @public
         * @param {number} count - The notification count.
         * @param {number} strength - The notification strength.
         */
        UICommandNotificationButton.prototype.displayNotification = function (count, strength) {
            this._icon.textContent = String(count > 9 ? '9+' : count);
            UIDom.removeClassName(this._icon, UICommandNotificationButton.severityClassNameByStrength);
            UIDom.addClassName(this._icon, ['visible', UICommandNotificationButton.severityClassNameByStrength[strength]]);
        };
        /**
         * Clear the notifications icon.
         * @public
         */
        UICommandNotificationButton.prototype.clearNotifications = function () {
            UIDom.removeClassName(this._icon, 'visible');
        };
        /**
         * Initializes the command button.
         * @protected
         */
        UICommandNotificationButton.prototype._initialize = function () {
            _super.prototype._initialize.call(this);
            UIDom.addClassName(this._buttonElt, 'sch-notification-command-button');
            this._icon = UIDom.createElement('span', { parent: this._buttonElt, className: 'sch-notification-icon' });
        };
        UICommandNotificationButton.severityClassNameByStrength = ['debug', 'info', 'success', 'warning', 'error'];
        return UICommandNotificationButton;
    }(UICommandButton));
    return UICommandNotificationButton;
});
