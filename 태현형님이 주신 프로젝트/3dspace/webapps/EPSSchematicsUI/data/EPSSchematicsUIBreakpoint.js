/// <amd-module name='DS/EPSSchematicsUI/data/EPSSchematicsUIBreakpoint'/>
define("DS/EPSSchematicsUI/data/EPSSchematicsUIBreakpoint", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI breakpoint.
     * @class UIBreakpoint
     * @alias module:DS/EPSSchematicsUI/data/EPSSchematicsUIBreakpoint
     * @private
     * @param {UIBlock} block - The UI block.
     */
    var UIBreakpoint = /** @class */ (function () {
        /**
         * @constructor
         * @param {Block} block - The block.
         */
        function UIBreakpoint(block) {
            this._block = block;
        }
        return UIBreakpoint;
    }());
    return UIBreakpoint;
});
