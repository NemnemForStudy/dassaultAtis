/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort'/>
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
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort", "DS/EPSSchematicsUI/constraints/EPSSchematicsUIBlockControlPortBorderCstr", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockControlPortView", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, UIControlPort, UIBlockControlPortBorderCstr, UIBlockControlPortView, EGraphCore) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block control port.
     * @class UIBlockControlPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort
     * @extends UIControlPort
     * @private
     */
    var UIBlockControlPort = /** @class */ (function (_super) {
        __extends(UIBlockControlPort, _super);
        /**
         * @constructor
         * @param {UIBlock} parent - The UI block that owns this UI block control port.
         * @param {ControlPort} model - The control port model.
         */
        function UIBlockControlPort(parent, model) {
            var _this = _super.call(this, parent, model) || this;
            _this._setBorderConstraint({
                cstr: new UIBlockControlPortBorderCstr(_this),
                attach: _this.isStartPort() ? EGraphCore.BorderCstr.LEFT : EGraphCore.BorderCstr.RIGHT,
                offset: 0,
                aoffy: -12
            });
            return _this;
        }
        /**
         * Gets the view of the of.
         * @public
         * @returns {UIBlockControlPortView} The view of the port.
         */
        UIBlockControlPort.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the parent graph of the port.
         * @public
         * @returns {UIGraph} The parent graph of the port.
         */
        UIBlockControlPort.prototype.getParentGraph = function () {
            return this._parent.getGraph();
        };
        /**
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIBlockControlPortView} The view of the connector.
         */
        UIBlockControlPort.prototype._createView = function () {
            return new UIBlockControlPortView(this);
        };
        return UIBlockControlPort;
    }(UIControlPort));
    return UIBlockControlPort;
});
