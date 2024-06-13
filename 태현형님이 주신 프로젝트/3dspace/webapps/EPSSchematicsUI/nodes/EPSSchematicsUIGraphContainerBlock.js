/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphContainerBlock'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphContainerBlock", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphContainerBlockView", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType"], function (require, exports, UIBlock, UIGraphContainerBlockView, UICommand, UICommandType) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph container block.
     * @class UIGraphContainerBlock
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphContainerBlock
     * @extends UIBlock
     * @private
     */
    var UIGraphContainerBlock = /** @class */ (function (_super) {
        __extends(UIGraphContainerBlock, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The graph that owns this block.
         * @param {Block} model - The block model.
         * @param {number} left - The left position of the block.
         * @param {number} top - The top position of the block.
         */
        function UIGraphContainerBlock(graph, model, left, top) {
            return _super.call(this, graph, model, left, top, UIGraphContainerBlockView) || this;
        }
        /**
         * Removes the node from its parent graph.
         * @public
         */
        UIGraphContainerBlock.prototype.remove = function () {
            this._containedGraphUI = undefined;
            this._graphContainerViewer = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Projects the specified JSON object to the block.
         * @public
         * @param {IJSONGraphContainerBlockUI} iJSONBlock - The JSON projected block.
         */
        UIGraphContainerBlock.prototype.fromJSON = function (iJSONBlock) {
            _super.prototype.fromJSON.call(this, iJSONBlock);
            this._containedGraphUI = iJSONBlock.containedGraph;
        };
        /**
         * Projects the block to the specified JSON object.
         * @public
         * @param {IJSONGraphContainerBlockUI} oJSONBlock - The JSON projected block.
         */
        UIGraphContainerBlock.prototype.toJSON = function (oJSONBlock) {
            _super.prototype.toJSON.call(this, oJSONBlock);
            if (this._graphContainerViewer) { // If graph container viewer is opened and save is asked!
                var jsonGraph = this._graphContainerViewer.save();
                this._containedGraphUI = jsonGraph.ui;
            }
            oJSONBlock.containedGraph = this._containedGraphUI;
        };
        /**
         * Gets the block model.
         * @public
         * @returns {GraphContainerBlock} The block model.
         */
        UIGraphContainerBlock.prototype.getModel = function () {
            return _super.prototype.getModel.call(this);
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {UICommand[]} The list of available commands.
         */
        UIGraphContainerBlock.prototype.getCommands = function () {
            var commands = _super.prototype.getCommands.call(this);
            commands.splice(1, 0, new UICommand(UICommandType.eOpen, this.onBlockDblClick.bind(this)));
            return commands;
        };
        /**
         * The callback on the block double click event.
         * @public
         */
        UIGraphContainerBlock.prototype.onBlockDblClick = function () {
            this._graphContainerViewer = this.openGraphContainerViewer();
            this._graph.getViewer().getEditor().getHistoryController().registerViewerChangeAction();
        };
        /**
         * Opens the graph container viewer.
         * @public
         * @returns {UIGraphContainerViewer} The graph container viewer.
         */
        UIGraphContainerBlock.prototype.openGraphContainerViewer = function () {
            this._graphContainerViewer = this._graph.getViewer().getEditor().getViewerController().createGraphContainerViewer(this);
            return this._graphContainerViewer;
        };
        /**
         * Gets the UI contained graph.
         * @public
         * @returns {IJSONGraphUI} The UI contained graph.
         */
        UIGraphContainerBlock.prototype.getContainedGraphUI = function () {
            return this._containedGraphUI;
        };
        /**
         * Sets the UI contained graph.
         * @public
         * @param {IJSONGraphUI} containedGraphUI - The UI contained graph.
         */
        UIGraphContainerBlock.prototype.setContainedGraphUI = function (containedGraphUI) {
            this._containedGraphUI = containedGraphUI;
        };
        /**
         * Removes the reference on the opened graph container viewer.
         * @public
         */
        UIGraphContainerBlock.prototype.removeGraphContainerVieweReference = function () {
            this._graphContainerViewer = undefined;
        };
        return UIGraphContainerBlock;
    }(UIBlock));
    return UIGraphContainerBlock;
});
