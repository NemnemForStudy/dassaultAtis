/// <amd-module name='DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockSubDataPortBorderCstr'/>
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
define("DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockSubDataPortBorderCstr", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a block sub data port border constraint.
     * @class UIBlockSubDataPortBorderCstr
     * @alias module:DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockSubDataPortBorderCstr
     * @extends BorderCstr
     * @private
     */
    var UIBlockSubDataPortBorderCstr = /** @class */ (function (_super) {
        __extends(UIBlockSubDataPortBorderCstr, _super);
        /**
         * @constructor
         * @param {UIBlockSubDataPort} subDataPort - The block sub data port.
         */
        function UIBlockSubDataPortBorderCstr(subDataPort) {
            var _this = _super.call(this) || this;
            _this._subDataPort = subDataPort;
            return _this;
        }
        /**
         * The callback on the update constraint.
         * @protected
         * @param {EGraphCore.Connector} connector - The connector.
         */
        UIBlockSubDataPortBorderCstr.prototype.onupdate = function (connector) {
            _super.prototype.onupdate.call(this, connector);
            var borderWidth = 0.5;
            var offset = 3 + borderWidth;
            var isStartPort = this._subDataPort.getParentPort().isStartPort();
            var top = isStartPort ? connector.top - offset : connector.top + offset;
            connector.multiset('top', top);
        };
        return UIBlockSubDataPortBorderCstr;
    }(EGraphCore.BorderCstr));
    return UIBlockSubDataPortBorderCstr;
});
