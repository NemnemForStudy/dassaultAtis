/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionControlLinkContext'/>
define("DS/EPSSchematicEngine/EPSSchematicsExecutionControlLinkContext", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics execution control link context.
     * @class ExecutionControlLinkContext
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionControlLinkContext
     * @private
     * @param {ExecutionControlLink} link - The execution control link.
     */
    var ExecutionControlLinkContext = /** @class */ (function () {
        /**
         * @constructor
         * @param {ExecutionControlLink} link - The execution control link.
         */
        function ExecutionControlLinkContext(link) {
            this.link = link;
            this.waitCount = this.link.model.getWaitCount();
        }
        /**
         * Activates the execution control link context.
         * @private
         * @returns {boolean} True if the waitCount is lower or equal to zero else false.
         */
        ExecutionControlLinkContext.prototype.activate = function () {
            this.link.trace();
            var result = this.waitCount <= 0;
            this.waitCount--;
            return result;
        };
        return ExecutionControlLinkContext;
    }());
    return ExecutionControlLinkContext;
});
