/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUINodeMoveDrag'/>
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
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUINodeMoveDrag", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphIact", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIPersistentLabel"], function (require, exports, EGraphIact, UINode, UIDom, UIBlock, UIPersistentLabel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines UI node move drag interaction.
     * @private
     * @class UINodeMoveDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUINodeMoveDrag
     * @extends EGraphIact.NodeDrag
     */
    var UINodeMoveDrag = /** @class */ (function (_super) {
        __extends(UINodeMoveDrag, _super);
        /**
         * @public
         * @constructor
         * @param {EGraphCore.EGraph} gr - The concerned graph.
         */
        function UINodeMoveDrag(gr) {
            return _super.call(this, gr) || this;
        }
        /**
         * The node move callback.
         * The graph size is modified according to the position of the node.
         * @override
         * @protected
         * @param {EGraphIact.IMouseMoveData} data - The move data.
         */
        UINodeMoveDrag.prototype.onmove = function (data) {
            _super.prototype.onmove.call(this, data);
            if (Array.isArray(this.nodes) && this.nodes.length > 0) {
                this.gr.updateLock();
                try {
                    var viewer_1 = this.gr.data.uiElement;
                    // Automatic grid snapping
                    this.nodes.forEach(function (node) {
                        var uiElement = node.data.uiElement;
                        if (uiElement !== undefined) {
                            UIDom.addClassName(uiElement.getView().getElement(), 'move');
                            if (uiElement instanceof UINode && uiElement.isDraggable()) {
                                uiElement.setPosition(Math.round(node.left), Math.round(node.top));
                                if (uiElement instanceof UIBlock) {
                                    uiElement.getUIDataPorts(undefined, true).forEach(function (dataPort) {
                                        var persistentLabel = dataPort.getPersistentLabel();
                                        if (persistentLabel) {
                                            persistentLabel.synchronizePositionWithParentNode();
                                        }
                                    });
                                }
                                else if (uiElement instanceof UIPersistentLabel) {
                                    viewer_1.getEditor().getHistoryController().registerMoveAction(uiElement);
                                }
                            }
                        }
                    });
                    // Automatic resize of the parent graph
                    var graph = viewer_1.getMainGraph();
                    var updated = graph.updateSizeFromBlocks();
                    if (updated) {
                        graph.onUIChange();
                    }
                }
                finally {
                    this.gr.updateUnlock();
                }
            }
        };
        /**
         * The node move end callback.
         * @override
         * @protected
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        UINodeMoveDrag.prototype.onend = function (cancel) {
            _super.prototype.onend.call(this, cancel);
            if (Array.isArray(this.nodes) && this.nodes.length > 0) {
                var uiElements = this.nodes.map(function (node) { return node.data.uiElement; });
                uiElements.forEach(function (uiElement) { return UIDom.removeClassName(uiElement.getView().getElement(), 'move'); });
                var viewer = this.gr.data.uiElement;
                var historyController = viewer.getEditor().getHistoryController();
                historyController.registerMoveAction(uiElements);
            }
        };
        return UINodeMoveDrag;
    }(EGraphIact.NodeDrag));
    return UINodeMoveDrag;
});
