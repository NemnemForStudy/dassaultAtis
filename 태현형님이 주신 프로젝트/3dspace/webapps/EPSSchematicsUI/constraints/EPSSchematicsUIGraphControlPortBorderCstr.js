/// <amd-module name='DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphControlPortBorderCstr'/>
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
define("DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphControlPortBorderCstr", ["require", "exports", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIGraphControlPortView, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a graph control port border constraint.
     * @class UIGraphControlPortBorderCstr
     * @alias module:DS/EPSSchematicsUI/constraints/EPSSchematicsUIGraphControlPortBorderCstr
     * @extends BorderCstr
     * @private
     */
    var UIGraphControlPortBorderCstr = /** @class */ (function (_super) {
        __extends(UIGraphControlPortBorderCstr, _super);
        /**
         * @constructor
         * @param {UIGraphControlPort} controlPort - The control port.
         */
        function UIGraphControlPortBorderCstr(controlPort) {
            var _this = _super.call(this) || this;
            _this._controlPort = controlPort;
            return _this;
        }
        /**
         * The callback on the update constraint.
         * @protected
         * @param {EGraphCore.Connector} connector - The connector.
         */
        UIGraphControlPortBorderCstr.prototype.onupdate = function (connector) {
            _super.prototype.onupdate.call(this, connector);
            if (this._controlPort.isStartPort()) {
                var portView = this._controlPort.getView();
                if (portView.getElement() !== undefined) {
                    var portBBox = portView.getBoundingBox();
                    var vpt = this._controlPort.getParentGraph().getViewer().getViewpoint();
                    var left = connector.left - (portBBox.width / vpt.scale) + UIGraphControlPortView.kPortLeftOffset;
                    connector.multiset('left', left, 'anormx', 1, 'anormy', 0);
                }
            }
            else {
                connector.multiset('left', connector.left - UIGraphControlPortView.kPortLeftOffset);
            }
        };
        return UIGraphControlPortBorderCstr;
    }(EGraphCore.BorderCstr));
    return UIGraphControlPortBorderCstr;
});
