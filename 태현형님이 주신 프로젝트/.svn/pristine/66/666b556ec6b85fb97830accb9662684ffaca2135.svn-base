/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionLink'/>
define("DS/EPSSchematicEngine/EPSSchematicsExecutionLink", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics execution link.
     * @class ExecutionLink
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionLink
     * @private
     */
    var ExecutionLink = /** @class */ (function () {
        /**
         * @constructor
         * @param {DataLink|ControlLink} model - The data link or control link model.
         * @param {ExecutionGraph} graph - The parent execution graph.
         */
        function ExecutionLink(model, graph) {
            this.model = model;
            this.graph = graph;
            this.startPort = this.graph.getObjectFromPath(this.model.getStartPort().toPath(this.graph.model));
            this.startPort.links.push(this);
            this.endPort = this.graph.getObjectFromPath(this.model.getEndPort().toPath(this.graph.model));
            this.endPort.links.push(this);
        }
        /**
         * Gets the trace mode state.
         * @private
         * @return {FTraceEvent} The trace mode state.
         */
        ExecutionLink.prototype.getTraceMode = function () {
            if (this.traceMode === undefined && this.graph !== undefined) {
                this.traceMode = this.graph.getTraceMode();
            }
            return this.traceMode;
        };
        return ExecutionLink;
    }());
    return ExecutionLink;
});
