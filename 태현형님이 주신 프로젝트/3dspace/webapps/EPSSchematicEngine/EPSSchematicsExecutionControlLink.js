/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionControlLink'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionControlLink", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionLink", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums"], function (require, exports, ExecutionLink, EventServices, ExecutionEvents, ExecutionEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class define a schematics execution control link.
     * @class ExecutionControlLink
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionControlLink
     * @extends ExecutionLink
     * @private
     */
    var ExecutionControlLink = /** @class */ (function (_super) {
        __extends(ExecutionControlLink, _super);
        /**
         * @constructor
         * @param {ControlLink} model - The control link model.
         * @param {ExecutionGraph} graph - The parent execution graph.
         */
        function ExecutionControlLink(model, graph) {
            return _super.call(this, model, graph) || this;
        }
        /**
         * Traces the execution control link.
         * @private
         */
        ExecutionControlLink.prototype.trace = function () {
            if (this.getTraceMode() & ExecutionEnums.FTraceEvent.fControlLink) {
                var event_1 = new ExecutionEvents.TraceLinkEvent();
                event_1.path = this.model.toPath();
                EventServices.dispatchEvent(event_1);
            }
        };
        return ExecutionControlLink;
    }(ExecutionLink));
    return ExecutionControlLink;
});
