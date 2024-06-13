/// <amd-module name='DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceControlPortHandler'/>
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
define("DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceControlPortHandler", ["require", "exports", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceHandler", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITracePortHandler"], function (require, exports, UITraceHandler, UITracePortHandler) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI trace control port handler.
     * It provides enabling and disabling trace capacities.
     * @class UITraceControlPortHandler
     * @alias module:DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceControlPortHandler
     * @extends UITracePortHandler
     * @private
     */
    var UITraceControlPortHandler = /** @class */ (function (_super) {
        __extends(UITraceControlPortHandler, _super);
        /**
         * @constructor
         * @param {UITraceController} controller - The UI trace controller.
         * @param {UIGraph} graph - The UI graph.
         * @param {string} path - The path of the port to trace.
         */
        function UITraceControlPortHandler(controller, graph, path) {
            return _super.call(this, controller, graph, path) || this;
        }
        /**
         * Enables the trace capacity.
         * @public
         * @param {boolean} skipAnimation - True to skip the trace animation.
         */
        UITraceControlPortHandler.prototype.enable = function (skipAnimation) {
            if (this._outsideHandler === undefined) {
                this._outsideElementUI = this._graph.getOutsideControlPortFromPath(this._path);
                if (this._outsideElementUI !== undefined) {
                    this._outsideHandler = new UITraceHandler(this._controller, this._outsideElementUI);
                }
            }
            if (this._insideHandler === undefined) {
                var elementUI = this._graph.getInsideControlPortFromPath(this._path);
                if (elementUI !== undefined) {
                    this._insideHandler = new UITraceHandler(this._controller, elementUI);
                }
            }
            _super.prototype.enable.call(this, skipAnimation);
        };
        return UITraceControlPortHandler;
    }(UITracePortHandler));
    return UITraceControlPortHandler;
});
