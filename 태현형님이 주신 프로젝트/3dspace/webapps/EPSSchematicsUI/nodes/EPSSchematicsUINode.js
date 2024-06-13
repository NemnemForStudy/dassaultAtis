/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUINode'/>
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView"], function (require, exports, EGraphCore, UINodeView) {
    "use strict";
    /**
     * This class define the UI Egraph base node element.
     * @private
     * @abstract
     * @class UINode
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUINode
     */
    var UINode = /** @class */ (function () {
        /**
         * @public
         * @constructor
         * @param {INodeOptions} options - The parent graph.
         */
        function UINode(options) {
            this._graph = options.graph;
            this._isDraggable = options.isDraggable || false;
            this._minHeight = 0;
            this._minWidth = 0;
            this._createDisplay();
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the node from its parent graph.
         * @public
         */
        UINode.prototype.remove = function () {
            var _a;
            if (this._display.getParent() === this._graph.getDisplay()) {
                this._graph.getDisplay().removeNode(this._display);
            }
            else if (this._display.getParent() === ((_a = this._graph.getViewer()) === null || _a === void 0 ? void 0 : _a.getDisplay())) {
                this._graph.getViewer().getDisplay().removeNode(this._display);
            }
            this._display = undefined;
            this._graph = undefined;
        };
        /**
         * Gets the node display.
         * @public
         * @returns {Node} The node display.
         */
        UINode.prototype.getDisplay = function () {
            return this._display;
        };
        /**
         * Adds the node to the graph.
         * @public
         */
        UINode.prototype.addNodeToGraph = function () {
            this._graph.getDisplay().addNode(this._display);
        };
        /**
         * Adds the node to the graph viewer.
         * @public
         */
        UINode.prototype.addNodeToViewer = function () {
            this._graph.getViewer().getDisplay().addNode(this._display);
        };
        /**
         * Gets the main view if the node.
         * @public
         * @returns {UINodeView} The main view of the node.
         */
        UINode.prototype.getView = function () {
            return this._display.views.main;
        };
        /**
         * Sets the main view of the node.
         * @public
         * @param {UINodeView} view - The main view of the node.
         */
        UINode.prototype.setView = function (view) {
            if (view !== undefined && view instanceof UINodeView) {
                this._display.views.main = view;
            }
        };
        /**
         * Gets the node's actual left position.
         * @public
         * @returns {number} The node's actual left position.
         */
        UINode.prototype.getActualLeft = function () {
            return this._display.actualLeft;
        };
        /**
         * Gets the node's left position.
         * @public
         * @returns {number} The node's left position.
         */
        UINode.prototype.getLeft = function () {
            return this._display.left;
        };
        /**
         * Sets the node's left position.
         * @public
         * @param {number} left - The node's left position.
         */
        UINode.prototype.setLeft = function (left) {
            this._display.set('left', left);
        };
        /**
         * Gets the node's actual top position.
         * @public
         * @returns {number} The node's actual top position.
         */
        UINode.prototype.getActualTop = function () {
            return this._display.actualTop;
        };
        /**
         * Gets the node's top position.
         * @public
         * @returns {number} The node's top position.
         */
        UINode.prototype.getTop = function () {
            return this._display.top;
        };
        /**
         * Sets the node's top position.
         * @public
         * @param {number} top - The node's top position.
         */
        UINode.prototype.setTop = function (top) {
            this._display.set('top', top);
        };
        /**
         * Gets the node's position relative to its parent graph.
         * @public
         * @returns {IDomPosition} The left and top position of the node.
         */
        UINode.prototype.getPosition = function () {
            return { left: this._display.left, top: this._display.top };
        };
        /**
         * Sets the node's position relative to its parent graph.
         * @public
         * @param {number} left - The left position of the node.
         * @param {number} top - The top position of the node.
         * @param {boolean} [relativeToGraph=false] - True to compute position relative to its parent graph, false otherwise.
         */
        UINode.prototype.setPosition = function (left, top, relativeToGraph) {
            if (relativeToGraph === void 0) { relativeToGraph = false; }
            var newLeft = relativeToGraph ? left - this._graph.getLeft() : left;
            var newTop = relativeToGraph ? top - this._graph.getTop() : top;
            this._display.multiset('left', newLeft, 'top', newTop);
        };
        /**
         * Gets the node's height.
         * @public
         * @returns {number} The node's height.
         */
        UINode.prototype.getHeight = function () {
            return this._display.height;
        };
        /**
         * Sets the node's height.
         * @public
         * @param {number} height - The node's height.
         */
        UINode.prototype.setHeight = function (height) {
            this._display.set('height', height);
        };
        /**
         * Gets the node's width.
         * @public
         * @returns {number} The node's width.
         */
        UINode.prototype.getWidth = function () {
            return this._display.width;
        };
        /**
         * Sets the node's width.
         * @public
         * @param {number} width - The node's width.
         */
        UINode.prototype.setWidth = function (width) {
            this._display.set('width', width);
        };
        /**
         * Gets the node's width and height dimension.
         * @public
         * @returns {IDomDimension} The width and height dimension of the node.
         */
        UINode.prototype.getDimension = function () {
            return { width: this._display.width, height: this._display.height };
        };
        /**
         * Sets the node's width and height dimension.
         * @public
         * @param {number} width - The node's width.
         * @param {number} height - The node's height.
         */
        UINode.prototype.setDimension = function (width, height) {
            this._display.multiset('width', width, 'height', height);
        };
        /**
         * Sets the minimum width and height of the node.
         * @public
         * @param {number} minWidth - The minimum node's width.
         * @param {number} minHeight - The minimum node's height.
         */
        UINode.prototype.setMinDimension = function (minWidth, minHeight) {
            this._minWidth = minWidth;
            this._minHeight = minHeight;
        };
        /**
         * Gets the minimum height of the node.
         * @public
         * @returns {number} The minimum node's height.
         */
        UINode.prototype.getMinHeight = function () {
            return this._minHeight;
        };
        /**
         * Gets the minimum width of the node.
         * @public
         * @returns {number} The minimum node's width.
         */
        UINode.prototype.getMinWidth = function () {
            return this._minWidth;
        };
        // TODO: Migrate addPort to appendConnector!
        /**
         * Adds a port to the node.
         * @public
         * @param {UIPort} port - The port to add to the node.
         */
        UINode.prototype.addPort = function (port) {
            if (port !== undefined && port.getDisplay() !== undefined) {
                this._display.appendConnector(port.getDisplay());
            }
        };
        /**
         * Appends the provided connector to the node.
         * @public
         * @param {UIConnector} connector - The connector to append.
         */
        UINode.prototype.appendConnector = function (connector) {
            if (connector && connector.getDisplay()) {
                this._display.appendConnector(connector.getDisplay());
            }
        };
        /**
         * Checks if the node is selected.
         * @public
         * @returns {boolean} True if the node is selected else false.
         */
        UINode.prototype.isSelected = function () {
            return this._graph.getViewer().isSelected(this._display);
        };
        /**
         * Checks if the node is draggable.
         * @public
         * @returns {boolean} True if the node is draggable else false.
         */
        UINode.prototype.isDraggable = function () {
            return this._isDraggable;
        };
        /**
         * Checks if the node is selectable.
         * @public
         * @returns {boolean} True if the node is selectable else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UINode.prototype.isSelectable = function () {
            return true;
        };
        /**
         * Gets the graph editor immersive frame.
         * @public
         * @returns {WUXImmersiveFrame} The graph editor immersive frame.
         */
        UINode.prototype.getImmersiveFrame = function () {
            return this._graph.getViewer().getEditor().getImmersiveFrame();
        };
        /**
         * Gets the graph.
         * @public
         * @returns {UIGraph} The graph.
         */
        UINode.prototype.getGraph = function () {
            return this._graph;
        };
        /**
         * Gets the main node html element.
         * @public
         * @returns {HTMLElement} The html element that represents the node.
         */
        UINode.prototype.getElement = function () {
            return this.getView().getElement();
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {UICommand[]} The list of available commands.
         */
        // eslint-disable-next-line class-methods-use-this
        UINode.prototype.getCommands = function () { return []; };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Creates the node display.
         * @private
         */
        UINode.prototype._createDisplay = function () {
            this._display = new EGraphCore.Node();
            this._display.data = { uiElement: this };
        };
        return UINode;
    }());
    return UINode;
});
