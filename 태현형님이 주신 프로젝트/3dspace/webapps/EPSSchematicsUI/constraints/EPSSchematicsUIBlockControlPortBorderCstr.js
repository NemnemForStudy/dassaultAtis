/// <amd-module name='DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockControlPortBorderCstr'/>
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
define("DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockControlPortBorderCstr", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, ModelEnums, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a block control port border constraint.
     * @class UIBlockControlPortBorderCstr
     * @alias module:DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockControlPortBorderCstr
     * @extends BorderCstr
     * @private
     */
    var UIBlockControlPortBorderCstr = /** @class */ (function (_super) {
        __extends(UIBlockControlPortBorderCstr, _super);
        /**
         * @constructor
         * @param {UIBlockControlPort} controlPort - The control port.
         */
        function UIBlockControlPortBorderCstr(controlPort) {
            var _this = _super.call(this) || this;
            _this._controlPort = controlPort;
            return _this;
        }
        /**
         * The callback on the update constraint.
         * @protected
         * @param {EGraphCore.Connector} connector - The connector.
         */
        UIBlockControlPortBorderCstr.prototype.onupdate = function (connector) {
            _super.prototype.onupdate.call(this, connector);
            var halfBorderWidth = 0.75 / 2;
            var isInput = this._controlPort.getModel().getType() === ModelEnums.EControlPortType.eInput;
            var left = isInput ? connector.left - halfBorderWidth : connector.left + halfBorderWidth;
            connector.multiset('left', left);
        };
        return UIBlockControlPortBorderCstr;
    }(EGraphCore.BorderCstr));
    return UIBlockControlPortBorderCstr;
});
