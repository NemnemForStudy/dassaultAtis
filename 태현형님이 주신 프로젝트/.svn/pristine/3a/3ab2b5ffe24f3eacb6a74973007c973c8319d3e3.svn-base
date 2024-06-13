/// <amd-module name='DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceGraphHandler'/>
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
define("DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceGraphHandler", ["require", "exports", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceHandler", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UITraceHandler, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI trace graph handler.
     * Graph have no UI element representation that can be traced but
     * need to display error message notification.
     * @class UITraceGraphHandler
     * @alias module:DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceGraphHandler
     * @extends UITraceHandler
     * @private
     */
    var UITraceGraphHandler = /** @class */ (function (_super) {
        __extends(UITraceGraphHandler, _super);
        /**
         * @constructor
         * @param {UITraceController} controller - The UI trace controller.
         * @param {UIGraph} elementUI - The UI graph element.
         */
        function UITraceGraphHandler(controller, elementUI) {
            return _super.call(this, controller, elementUI) || this;
        }
        /**
         * Enables the graph trace capacity.
         * @public
         * @param {boolean} skipAnimation - True to skip the trace animation.
         * @param {ITraceOptions} [options] - The trace options
         */
        UITraceGraphHandler.prototype.enable = function (skipAnimation, options) {
            if (options !== undefined && options.executionResult !== undefined) {
                if (options.executionResult === ModelEnums.EExecutionResult.eExecutionError) {
                    this.displayError(options);
                }
            }
        };
        /**
         * Disables the trace capacity.
         * @private
         */
        // eslint-disable-next-line class-methods-use-this
        UITraceGraphHandler.prototype.disable = function () { };
        return UITraceGraphHandler;
    }(UITraceHandler));
    return UITraceGraphHandler;
});
