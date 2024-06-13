/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIBreakpointController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIBreakpointController", ["require", "exports", "DS/EPSSchematicsUI/data/EPSSchematicsUIBreakpoint"], function (require, exports, UIBreakpoint) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI breakpoint controller.
     * @class UIBreakpointController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIBreakpointController
     * @private
     */
    var UIBreakpointController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIBreakpointController(editor) {
            this._breakpoints = new Map();
            this._editor = editor;
        }
        /**
         * Removes the controller.
         * @public
         */
        UIBreakpointController.prototype.remove = function () {
            this.unregisterAllBreakpoints();
            this._editor = undefined;
            this._breakpoints = undefined;
        };
        /**
         * Registers a breakpoint.
         * @public
         * @param {UIBlock} block - The UI block.
         */
        UIBreakpointController.prototype.registerBreakpoint = function (block) {
            this._breakpoints.set(block.getModel(), new UIBreakpoint(block.getModel()));
            this.sendBreakpointList();
        };
        /**
         * Unregisters a breakpoint.
         * @public
         * @param {UIBlock} block - The UI block.
         */
        UIBreakpointController.prototype.unregisterBreakpoint = function (block) {
            if (this.hasBreakpoint(block)) {
                this._breakpoints.delete(block.getModel());
                this.sendBreakpointList();
            }
        };
        /**
         * Unregisters all the existing breakpoints.
         * @public
         */
        UIBreakpointController.prototype.unregisterAllBreakpoints = function () {
            this._breakpoints.clear();
            this.sendBreakpointList();
        };
        /**
         * Checks if the provided block has a breakpoint.
         * @public
         * @param {UIBlock} block - The UI block.
         * @returns {boolean} True if the block has a breakpoint, else false.
         */
        UIBreakpointController.prototype.hasBreakpoint = function (block) {
            return this._breakpoints.has(block.getModel());
        };
        /**
         * Sendsthe breakpoint list to the play panel.
         * @private
         */
        UIBreakpointController.prototype.sendBreakpointList = function () {
            var playPanel = this._editor.getPlayPanel();
            if (playPanel !== undefined) {
                var bkList_1 = [];
                var graph_1 = this._editor.getGraphModel();
                this._breakpoints.forEach(function (value, key) { bkList_1.push({ path: key.toPath(graph_1), condition: undefined }); });
                playPanel.onBreakpointsChange(bkList_1);
            }
        };
        return UIBreakpointController;
    }());
    return UIBreakpointController;
});
