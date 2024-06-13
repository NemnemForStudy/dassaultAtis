/// <amd-module name='DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockDataPortBorderCstr'/>
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
define("DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockDataPortBorderCstr", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, ModelEnums, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a block data port border constraint.
     * @class UIBlockDataPortBorderCstr
     * @alias module:DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockDataPortBorderCstr
     * @extends BorderCstr
     * @private
     */
    var UIBlockDataPortBorderCstr = /** @class */ (function (_super) {
        __extends(UIBlockDataPortBorderCstr, _super);
        /**
         * @constructor
         * @param {UIBlockDataPort} dataPort - The block data port.
         */
        function UIBlockDataPortBorderCstr(dataPort) {
            var _this = _super.call(this) || this;
            _this._dataPort = dataPort;
            return _this;
        }
        /**
         * The callback on the update constraint.
         * @protected
         * @param {EGraphCore.Connector} connector - The connector.
         */
        UIBlockDataPortBorderCstr.prototype.onupdate = function (connector) {
            _super.prototype.onupdate.call(this, connector);
            var halfBorderWidth = 0.5 / 2;
            var isInput = this._dataPort.getModel().getType() === ModelEnums.EDataPortType.eInput;
            var top = isInput ? connector.top - halfBorderWidth : connector.top + halfBorderWidth;
            connector.multiset('top', top);
        };
        return UIBlockDataPortBorderCstr;
    }(EGraphCore.BorderCstr));
    return UIBlockDataPortBorderCstr;
});
