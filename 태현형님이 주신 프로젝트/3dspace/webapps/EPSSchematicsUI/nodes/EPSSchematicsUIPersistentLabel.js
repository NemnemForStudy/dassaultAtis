/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIPersistentLabelView", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIPersistentLabelConnector", "DS/EPSSchematicsUI/edges/EPSSchematicsUIPersistentLabelEdge", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort"], function (require, exports, UINode, UIPersistentLabelView, UIPersistentLabelConnector, UIPersistentLabelEdge, DataPort) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Find a way to bring edges in front of nodes!
    // TODO: Rework the edge position from the label so that the attach point be on left, middle or right!
    // TODO: Manage history!
    /**
     * This class defines a UI persistent label.
     * @private
     * @class UIPersistentLabel
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel
     * @extends UINode
     */
    var UIPersistentLabel = /** @class */ (function (_super) {
        __extends(UIPersistentLabel, _super);
        /**
         * @public
         * @constructor
         * @param {UIPort} port - The UI port.
         */
        function UIPersistentLabel(port) {
            var _this = _super.call(this, { graph: port.getParentGraph(), isDraggable: true }) || this;
            _this._portUI = port;
            _this._parent = _this._portUI.getParent();
            _this.setView(new UIPersistentLabelView(_this));
            _this.setDimension(100, 30);
            _this.setMinDimension(100, 30);
            _this._alignPositionOnPort();
            _this.addNodeToGraph();
            _this._offsetLeft = _this._parent.getLeft() - _this.getLeft();
            _this._offsetTop = _this._parent.getTop() - _this.getTop();
            // Add connector
            _this._connector = new UIPersistentLabelConnector(_this);
            _this.appendConnector(_this._connector);
            // Add edge
            var viewer = _this._graph.getViewer().getDisplay();
            _this._edge = new UIPersistentLabelEdge();
            viewer.addEdge(_this._connector.getDisplay(), _this._portUI.getDisplay(), _this._edge.getDisplay());
            return _this;
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
        UIPersistentLabel.prototype.remove = function () {
            this._edge.remove();
            this._connector.remove();
            this._portUI = undefined;
            this._parent = undefined;
            this._offsetLeft = undefined;
            this._offsetTop = undefined;
            this._connector = undefined;
            this._edge = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the main view of the node.
         * @public
         * @returns {UIPersistentLabelView} The main view of the node.
         */
        UIPersistentLabel.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Projects the specified JSON object to the label.
         * @public
         * @param {IJSONLabelUI} iJSONLabel - The JSON projected label.
         */
        UIPersistentLabel.prototype.fromJSON = function (iJSONLabel) {
            if (iJSONLabel) {
                this.setPosition(iJSONLabel.left, iJSONLabel.top, true);
                this.setDimension(iJSONLabel.width, iJSONLabel.height);
            }
        };
        /**
         * Projects the label to the specified JSON object.
         * @public
         * @param {IJSONLabelUI} oJSONLabel - The JSON projected label.
         */
        UIPersistentLabel.prototype.toJSON = function (oJSONLabel) {
            if (oJSONLabel) {
                oJSONLabel.top = this.getActualTop();
                oJSONLabel.left = this.getActualLeft();
                oJSONLabel.height = this._display.actualHeight;
                oJSONLabel.width = this._display.actualWidth;
            }
        };
        /**
         * Synchronizes the persistent label position when moving associated parent node.
         * @public
         */
        UIPersistentLabel.prototype.synchronizePositionWithParentNode = function () {
            var left = this._parent.getLeft() - this._offsetLeft;
            var top = this._parent.getTop() - this._offsetTop;
            this.setLeft(left);
            this.setTop(top);
        };
        /**
         * Sets the label position relative to its parent graph.
         * @public
         * @param {number} left - The left position of the label.
         * @param {number} top - The top position of the label.
         * @param {boolean} [relativeToGraph=false] - True to compute position relative to its parent graph, false otherwise.
         */
        UIPersistentLabel.prototype.setPosition = function (left, top, relativeToGraph) {
            if (relativeToGraph === void 0) { relativeToGraph = false; }
            var newLeft = relativeToGraph ? left - this._graph.getLeft() : left;
            var newTop = relativeToGraph ? top - this._graph.getTop() : top;
            this._offsetLeft = this._parent.getLeft() - newLeft;
            this._offsetTop = this._parent.getTop() - newTop;
            _super.prototype.setPosition.call(this, left, top, relativeToGraph);
        };
        /**
         * Gets the associated UI port.
         * @public
         * @returns {UIPort} - The associated port.
         */
        UIPersistentLabel.prototype.getUIPort = function () {
            return this._portUI;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Aligns the persistent label position on its port.
         * @private
         */
        UIPersistentLabel.prototype._alignPositionOnPort = function () {
            var kLabelTopGap = 50;
            var vpt = this._portUI.getParentGraph().getViewer().getViewpoint();
            var portBBox = this._portUI.getBoundingBox(vpt);
            var left = this._portUI.getLeft() - (this.getWidth() / 2); // The attach point of the connector is on center so no need to (width / 2)
            var top;
            var isDataPort = this._portUI.getModel() instanceof DataPort;
            if (isDataPort) {
                var isOnTopOfPort = this._portUI.isDataPortLabelOnTop();
                if (isOnTopOfPort) {
                    top = this._portUI.getTop() - this.getHeight() - (portBBox.height / vpt.scale) - kLabelTopGap;
                }
                else {
                    top = this._portUI.getTop() + (portBBox.height / vpt.scale) + kLabelTopGap;
                }
            }
            top = Math.round(top);
            this.setPosition(left, top);
        };
        return UIPersistentLabel;
    }(UINode));
    return UIPersistentLabel;
});
