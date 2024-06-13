/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockEventPortView"], function (require, exports, UIBlockControlPort, UIBlockEventPortView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block event port.
     * @class UIBlockEventPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort
     * @extends UIBlockControlPort
     * @private
     */
    var UIBlockEventPort = /** @class */ (function (_super) {
        __extends(UIBlockEventPort, _super);
        /**
         * @constructor
         * @param {UIBlock} parent - The UI block that owns this UI block event port.
         * @param {EventPort} model - The event port model.
         */
        function UIBlockEventPort(parent, model) {
            return _super.call(this, parent, model) || this;
        }
        /**
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIBlockEventPortView} The view of the connector.
         */
        UIBlockEventPort.prototype._createView = function () {
            return new UIBlockEventPortView(this);
        };
        return UIBlockEventPort;
    }(UIBlockControlPort));
    return UIBlockEventPort;
});
