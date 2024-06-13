/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphTemplateViewer'/>
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
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphTemplateViewer", ["require", "exports", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary"], function (require, exports, UIViewer, UITemplateLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Display template name inside viewer!
    /**
     * This class defines the graph template viewer.
     * @class UIGraphTemplateViewer
     * @alias module:DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphTemplateViewer
     * @extends UIViewer
     * @private
     */
    var UIGraphTemplateViewer = /** @class */ (function (_super) {
        __extends(UIGraphTemplateViewer, _super);
        /**
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         * @param {string} templateUid - The template uid.
         * @param {boolean} isLocalTemplate - True for a local template else false.
         * @param {UIGraph} graphContext - The graph context.
         */
        function UIGraphTemplateViewer(container, editor, templateUid, isLocalTemplate, graphContext) {
            var _this = _super.call(this, container, editor) || this;
            _this.templateUid = undefined;
            _this.isLocalTemplate = undefined;
            _this.graphContext = undefined;
            _this.templateLibrary = undefined;
            _this.templateUid = templateUid;
            _this.isLocalTemplate = isLocalTemplate;
            _this.graphContext = graphContext;
            _this.templateLibrary = _this.isLocalTemplate ? _this.graphContext.getLocalTemplateLibrary() : UITemplateLibrary;
            _this.initialize();
            return _this;
        }
        /**
         * Removes the viewer.
         * @public
         */
        UIGraphTemplateViewer.prototype.remove = function () {
            var graphBlockModel = this.getMainGraph().getModel();
            var jsonGraph = this.save();
            this.templateLibrary.updateGraph(this.templateUid, graphBlockModel, jsonGraph.ui);
            _super.prototype.remove.call(this);
        };
        /**
         * Initializes the viewer.
         * @private
         */
        UIGraphTemplateViewer.prototype.initialize = function () {
            var graph = this.templateLibrary.getGraph(this.templateUid);
            this.createGraph(graph.model, graph.ui);
            this.getMainGraph().setGraphContext(this.graphContext);
            this.zoomGraphToFitInView();
        };
        return UIGraphTemplateViewer;
    }(UIViewer));
    return UIGraphTemplateViewer;
});
