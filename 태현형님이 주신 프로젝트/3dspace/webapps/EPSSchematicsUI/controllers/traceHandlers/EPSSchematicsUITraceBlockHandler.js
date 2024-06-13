/// <amd-module name='DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceBlockHandler'/>
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
define("DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceBlockHandler", ["require", "exports", "DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceHandler", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph"], function (require, exports, UITraceHandler, UIDom, ModelEnums, UIGraph) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI trace block handler.
     * @class UITraceBlockHandler
     * @alias module:DS/EPSSchematicsUI/controllers/traceHandlers/EPSSchematicsUITraceBlockHandler
     * @extends UITraceHandler
     * @private
     */
    var UITraceBlockHandler = /** @class */ (function (_super) {
        __extends(UITraceBlockHandler, _super);
        /**
         * @constructor
         * @param {UITraceController} controller - The UI trace controller.
         * @param {UIBlock|UIGraph} elementUI - The UI block element.
         */
        function UITraceBlockHandler(controller, elementUI) {
            var blockElementUI = elementUI instanceof UIGraph ? elementUI.getBlockView() : elementUI;
            return _super.call(this, controller, blockElementUI) || this;
        }
        /**
         * Enables the trace capacity.
         * @public
         * @param {boolean} skipAnimation - True to skip the trace animation.
         * @param {ITraceOptions} [options] - The trace options
         */
        UITraceBlockHandler.prototype.enable = function (skipAnimation, options) {
            if (options !== undefined && options.executionResult !== undefined) {
                if (options.executionResult === ModelEnums.EExecutionResult.eExecutionPending) {
                    UIDom.addClassName(this._element, 'sch-trace-pending');
                }
                else if (options.executionResult === ModelEnums.EExecutionResult.eExecutionWorker) {
                    UIDom.addClassName(this._element, 'sch-trace-worker');
                }
                else {
                    if (options.executionResult === ModelEnums.EExecutionResult.eExecutionError) {
                        UIDom.addClassName(this._element, 'sch-trace-error');
                        this.displayError(options);
                    }
                    else if (options.executionResult === ModelEnums.EExecutionResult.eExecutionWarning) {
                        UIDom.addClassName(this._element, 'sch-trace-warning');
                    }
                    UIDom.removeClassName(this._element, ['sch-trace-pending', 'sch-trace-worker']);
                }
            }
            _super.prototype.enable.call(this, skipAnimation);
        };
        /**
         * Disables the trace capacity.
         * @private
         */
        UITraceBlockHandler.prototype.disable = function () {
            UIDom.removeClassName(this._element, [
                'sch-trace-error', 'sch-trace-warning',
                'sch-trace-pending', 'sch-trace-worker'
            ]);
            _super.prototype.disable.call(this);
        };
        return UITraceBlockHandler;
    }(UITraceHandler));
    return UITraceBlockHandler;
});
