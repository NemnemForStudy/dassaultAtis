/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionDataLink'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionDataLink", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionLink", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary"], function (require, exports, ExecutionLink, EventServices, ExecutionEvents, ExecutionEnums, TypeLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class define a schematics execution data link.
     * @class ExecutionDataLink
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionDataLink
     * @extends ExecutionLink
     * @private
     */
    var ExecutionDataLink = /** @class */ (function (_super) {
        __extends(ExecutionDataLink, _super);
        /**
         * @constructor
         * @param {DataLink} model - The data link model.
         * @param {ExecutionGraph} graph - The parent execution graph.
         */
        function ExecutionDataLink(model, graph) {
            return _super.call(this, model, graph) || this;
        }
        /**
         * Traces the execution data link.
         * @private
         */
        ExecutionDataLink.prototype.trace = function () {
            if (this.getTraceMode() & ExecutionEnums.FTraceEvent.fDataLink) {
                var event_1 = new ExecutionEvents.TraceDataLinkEvent();
                event_1.path = this.model.toPath();
                EventServices.dispatchEvent(event_1);
            }
        };
        /**
         * This method copies the data link value from the start port to the end port.
         * @private
         */
        ExecutionDataLink.prototype.copyDataLinkValue = function () {
            var value = this.startPort.getValue();
            value = TypeLibrary.castValueType(this.endPort.getValueType(), value);
            this.endPort.setValue(value);
            this.trace();
        };
        return ExecutionDataLink;
    }(ExecutionLink));
    return ExecutionDataLink;
});
