/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphEventPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphEventPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphEventPortView"], function (require, exports, UIGraphControlPort, UIGraphEventPortView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph event port.
     * @class UIGraphEventPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphEventPort
     * @extends UIGraphControlPort
     * @private
     */
    var UIGraphEventPort = /** @class */ (function (_super) {
        __extends(UIGraphEventPort, _super);
        /**
         * @constructor
         * @param {UIGraph} parent - The parent UI graph that owns this UI graph port.
         * @param {EventPort} model - The event port model.
         * @param {number} offset - The position of the event port.
         */
        function UIGraphEventPort(parent, model, offset) {
            return _super.call(this, parent, model, offset) || this;
        }
        /**
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIGraphEventPortView} The view of the connector.
         */
        UIGraphEventPort.prototype._createView = function () {
            return new UIGraphEventPortView(this);
        };
        return UIGraphEventPort;
    }(UIGraphControlPort));
    return UIGraphEventPort;
});
