/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphContainerViewer'/>
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
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphContainerViewer", ["require", "exports", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer"], function (require, exports, UIViewer) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the graph container viewer.
     * @class UIGraphContainerViewer
     * @alias module:DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphContainerViewer
     * @extends UIViewer
     * @private
     */
    var UIGraphContainerViewer = /** @class */ (function (_super) {
        __extends(UIGraphContainerViewer, _super);
        /**
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         * @param {UIGraphContainerBlock} graphContainerBlockUI - The graph container block.
         */
        function UIGraphContainerViewer(container, editor, graphContainerBlockUI) {
            var _this = _super.call(this, container, editor) || this;
            _this.graphContainerBlockUI = undefined;
            _this.graphContainerBlockUI = graphContainerBlockUI;
            _this.initialize();
            return _this;
        }
        /**
         * Removes the viewer.
         * @public
         */
        UIGraphContainerViewer.prototype.remove = function () {
            var jsonGraph = this.save();
            this.graphContainerBlockUI.setContainedGraphUI(jsonGraph.ui);
            this.graphContainerBlockUI.removeGraphContainerVieweReference();
            this.graphContainerBlockUI = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Initializes the viewer.
         * @private
         */
        UIGraphContainerViewer.prototype.initialize = function () {
            var containedGraph = this.graphContainerBlockUI.getModel().getContainedGraph();
            var containedGraphUI = this.graphContainerBlockUI.getContainedGraphUI();
            this.createGraph(containedGraph, containedGraphUI);
            this.getMainGraph().setGraphContext(this.graphContainerBlockUI.getGraph().getGraphContext());
            this.zoomGraphToFitInView();
        };
        return UIGraphContainerViewer;
    }(UIViewer));
    return UIGraphContainerViewer;
});
