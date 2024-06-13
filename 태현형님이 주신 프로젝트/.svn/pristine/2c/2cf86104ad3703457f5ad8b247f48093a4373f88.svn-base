/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionPort'/>
define("DS/EPSSchematicEngine/EPSSchematicsExecutionPort", ["require", "exports", "DS/EPEventServices/EPEventTarget"], function (require, exports, EventTarget) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics execution port.
     * @class ExecutionPort
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionPort
     * @private
     */
    var ExecutionPort = /** @class */ (function () {
        /**
         * @constructor
         * @param {DataPort|ControlPort} model - The port model.
         * @param {ExecutionBlock} parent - The parent execution block.
         */
        function ExecutionPort(model, parent) {
            this.links = [];
            this.eventTarget = new EventTarget();
            this.model = model;
            this.parent = parent;
        }
        /**
         * Gets the trace mode state.
         * @private
         * @return {FTraceEvent} The trace mode state.
         */
        ExecutionPort.prototype.getTraceMode = function () {
            if (this.traceMode === undefined && this.parent !== undefined) {
                this.traceMode = this.parent.getTraceMode();
            }
            return this.traceMode;
        };
        return ExecutionPort;
    }());
    return ExecutionPort;
});
