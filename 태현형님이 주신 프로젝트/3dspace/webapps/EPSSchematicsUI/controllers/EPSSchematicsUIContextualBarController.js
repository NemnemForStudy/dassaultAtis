/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/components/EPSSchematicsUIContextualBar", "DS/EPSSchematicsCSI/EPSSchematicsCSITools"], function (require, exports, UIBlock, UIContextualBar, CSITools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI contextual bar controller.
     * @class UIContextualBarController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController
     * @private
     */
    var UIContextualBarController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIViewer} viewer - The viewer.
         */
        function UIContextualBarController(viewer) {
            this._commands = [];
            this._viewer = viewer;
        }
        /**
         * Removes the controller.
         * @public
         */
        UIContextualBarController.prototype.remove = function () {
            this._viewer = undefined;
            this._contextualBar = undefined;
            this._commands = undefined;
        };
        /**
         * Gets the list of commands.
         * @public
         * @returns {UICommand[]} The list of commands.
         */
        UIContextualBarController.prototype.getCommands = function () {
            return this._commands;
        };
        /**
         * Gets the contextual bar.
         * @public
         * @returns {UIContextualBar} The contextual bar.
         */
        UIContextualBarController.prototype.getContextualBar = function () {
            return this._contextualBar;
        };
        /**
         * Displays the contextual bar.
         * @public
         * @param {number} mouseLeft - The mouse left position.
         * @param {number} mouseTop - The mouse top position.
         */
        UIContextualBarController.prototype.displayContextualBar = function (mouseLeft, mouseTop) {
            if (this._contextualBar === undefined && this._commands.length > 0) {
                this._contextualBar = new UIContextualBar(this._viewer, this, this._commands);
                this._contextualBar.setPosition(mouseLeft, mouseTop);
            }
        };
        /**
         * Hides the contextual bar.
         * @public
         */
        UIContextualBarController.prototype.hideContextualBar = function () {
            if (this._contextualBar !== undefined) {
                this._contextualBar.remove();
                this.clearContextualBar();
            }
        };
        /**
         * Clears the contextual bar.
         * @public
         */
        UIContextualBarController.prototype.clearContextualBar = function () {
            this._contextualBar = undefined;
        };
        /**
         * Checks if the contextual bar is displayed.
         * @public
         * @returns {boolean} True if the contextual bar is displayed else false.
         */
        UIContextualBarController.prototype.isContextualBarDisplayed = function () {
            return this._contextualBar !== undefined;
        };
        /**
         * Registers a selection.
         * @public
         * @param {Array<UINode|UILink|UIPort>} selection - A list of blocks, links and ports.
         */
        UIContextualBarController.prototype.registerSelection = function (selection) {
            this.hideContextualBar();
            if (selection.length > 0) {
                if (selection.length === 1) {
                    this._commands = selection[0].getCommands();
                }
                else {
                    var blocks = selection.filter(function (elt) { return elt instanceof UIBlock; });
                    if (blocks.length > 1) {
                        if (this._viewer.areSelectedBlocksConsistent()) {
                            var options = this._viewer.getEditor().getOptions();
                            if (!options.hideDefaultGraph) {
                                this._commands = [blocks[0].getCreateGraphFromSelectionCommand()];
                            }
                            if (CSITools.isCSIGraphBlockRegistered()) {
                                this._commands.push(blocks[0].getCreateCSIGraphFromSelectionCommand());
                            }
                        }
                    }
                }
            }
        };
        /**
         * Clears the registered commands.
         * @public
         */
        UIContextualBarController.prototype.clearCommands = function () {
            this._commands = [];
            this.hideContextualBar();
        };
        return UIContextualBarController;
    }());
    return UIContextualBarController;
});
