/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer'/>
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
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer", ["require", "exports", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer"], function (require, exports, UIViewer) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defgines the graph block viewer.
     * @class UIGraphBlockViewer
     * @alias module:DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer
     * @extends UIViewer
     * @private
     */
    var UIGraphBlockViewer = /** @class */ (function (_super) {
        __extends(UIGraphBlockViewer, _super);
        /**
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         * @param {UIGraphBlock} graphBlockUI - The graph block.
         */
        function UIGraphBlockViewer(container, editor, graphBlockUI) {
            var _this = _super.call(this, container, editor) || this;
            _this.graphBlockUI = undefined;
            _this.graphBlockUI = graphBlockUI;
            _this.initialize();
            return _this;
        }
        /**
         * Removes the viewer.
         * @public
         */
        UIGraphBlockViewer.prototype.remove = function () {
            var traceController = this.editor.getTraceController();
            if (traceController) {
                traceController.removeSubGraphEvents(this.graphBlockUI);
            }
            this.editor.getDebugController().onSubGraphRemoved(this.graphBlockUI);
            this.graphBlockUI.removeGraphView();
            this.graphBlockUI = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Initializes the graph block viewer.
         * @private
         */
        UIGraphBlockViewer.prototype.initialize = function () {
            this.createGraph(this.graphBlockUI.getModel(), this.graphBlockUI.getJSONGraphBlockUI());
            this.graphBlockUI.setGraphView(this.getMainGraph());
            this.getMainGraph().setBlockView(this.graphBlockUI);
            this.zoomGraphToFitInView();
            var traceController = this.editor.getTraceController();
            if (traceController) {
                traceController.dispatchSubGraphEvents(this.graphBlockUI);
            }
            this.editor.getDebugController().onSubGraphOpened(this.graphBlockUI);
        };
        return UIGraphBlockViewer;
    }(UIViewer));
    return UIGraphBlockViewer;
});
