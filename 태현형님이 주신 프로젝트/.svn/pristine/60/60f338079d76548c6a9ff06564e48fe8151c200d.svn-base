/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestSubDataPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestSubDataPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphTestSubDataPortView", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphTestSubDataPortBorderCstr"], function (require, exports, UIGraphSubDataPort, ModelEnums, UIGraphTestSubDataPortView, EGraphCore, UIGraphTestSubDataPortBorderCstr) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph test sub data port.
     * @class UIGraphTestSubDataPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphTestSubDataPort
     * @extends UIGraphSubDataPort
     * @private
     */
    var UIGraphTestSubDataPort = /** @class */ (function (_super) {
        __extends(UIGraphTestSubDataPort, _super);
        /**
         * @constructor
         * @param {UIGraphTestDataPort} parentPort - The parent UI graph test data port.
         * @param {UIGraphDataTestDrawer} parent - The parent UI graph test data drawer.
         * @param {DataPort} model - The data port model.
         */
        function UIGraphTestSubDataPort(parentPort, parent, model) {
            var _this = _super.call(this, parentPort, parent, model) || this;
            _this._setBorderConstraint({
                cstr: new UIGraphTestSubDataPortBorderCstr(_this),
                attach: _this.isStartPort() ? EGraphCore.BorderCstr.TOP : EGraphCore.BorderCstr.BOTTOM
            });
            return _this;
        }
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIGraphTestSubDataPortView} The view of the port.
         */
        UIGraphTestSubDataPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Checks if the sub data port is a start port.
         * @public
         * @returns {boolean} True if the sub data port is a start port else false.
         */
        UIGraphTestSubDataPort.prototype.isStartPort = function () {
            var portType = this._model.getType();
            return portType === ModelEnums.EDataPortType.eInput;
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @returns {UIGraphTestSubDataPortView} The view of the connector.
         */
        UIGraphTestSubDataPort.prototype._createView = function () {
            return new UIGraphTestSubDataPortView(this);
        };
        return UIGraphTestSubDataPort;
    }(UIGraphSubDataPort));
    return UIGraphTestSubDataPort;
});
