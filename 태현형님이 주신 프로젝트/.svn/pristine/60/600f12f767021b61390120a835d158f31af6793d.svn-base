/// <amd-module name='DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphTestSubDataPortBorderCstr'/>
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
define("DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphTestSubDataPortBorderCstr", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a graph test sub data port border constraint.
     * @class UIGraphTestSubDataPortBorderCstr
     * @alias module:DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphTestSubDataPortBorderCstr
     * @extends BorderCstr
     * @private
     */
    var UIGraphTestSubDataPortBorderCstr = /** @class */ (function (_super) {
        __extends(UIGraphTestSubDataPortBorderCstr, _super);
        /**
         * @constructor
         * @param {UIGraphTestSubDataPort} subDataPort - The graph test sub data port.
         */
        function UIGraphTestSubDataPortBorderCstr(subDataPort) {
            var _this = _super.call(this) || this;
            _this._subDataPort = subDataPort;
            return _this;
        }
        /**
         * The callback on the update constraint.
         * @protected
         * @param {EGraphCore.Connector} connector - The connector.
         */
        UIGraphTestSubDataPortBorderCstr.prototype.onupdate = function (connector) {
            _super.prototype.onupdate.call(this, connector);
            var halfBorderWidth = 0.5 / 2;
            var offset = 3 + halfBorderWidth;
            var isStartPort = this._subDataPort.getParentPort().isStartPort();
            var top = isStartPort ? connector.top - offset : connector.top + offset;
            connector.multiset('top', top);
        };
        return UIGraphTestSubDataPortBorderCstr;
    }(EGraphCore.BorderCstr));
    return UIGraphTestSubDataPortBorderCstr;
});
