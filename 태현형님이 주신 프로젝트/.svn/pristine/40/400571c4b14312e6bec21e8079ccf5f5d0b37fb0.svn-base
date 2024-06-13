/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIThumbnailViewer'/>
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
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIThumbnailViewer", ["require", "exports", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIEGraphViewer", "DS/EPSSchematicsUI/groups/EPSSchematicsUIThumbnailGraph", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/controllers/EPSSchematicsUILabelController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock"], function (require, exports, UIEGraphViewer, UIThumbnailGraph, UIBlock, UILabelController, UIContextualBarController, GraphBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI Thumbnail viewer used for block
     * thumbnail generation in the block library documentation.
     * @class UIThumbnailViewer
     * @alias module:DS/EPSSchematicsUI/viewersEPSSchematicsUIThumbnailViewer
     * @extends UIEGraphViewer
     * @private
     */
    var UIThumbnailViewer = /** @class */ (function (_super) {
        __extends(UIThumbnailViewer, _super);
        /**
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         * @param {string} blockUid - The uid of the block definition.
         */
        function UIThumbnailViewer(container, editor, blockUid) {
            var _this = _super.call(this, container, editor) || this;
            _this.blockUid = blockUid;
            // Creates a thumbnail block
            _this.graphUI = new UIThumbnailGraph(_this, new GraphBlock());
            _this.blockModel = _this.graphUI.getModel().createBlock(_this.blockUid);
            _this.blockUI = new UIBlock(_this.graphUI, _this.blockModel, 0, 0);
            _this.display.addNode(_this.blockUI.getDisplay());
            _this.contextualBarController = new UIContextualBarController(_this);
            // Display the block labels
            _this.labelController = new UILabelController(_this);
            _this.labelController.displayBlockLabels(_this.blockUI, 0 /* eDirect */);
            _this.resize();
            _this.labelController.updateLabels(_this.getViewpoint());
            return _this;
        }
        /**
         * Removes the viewer.
         * @public
         */
        UIThumbnailViewer.prototype.remove = function () {
            this.labelController.remove();
            this.contextualBarController.remove();
            this.blockUI.remove();
            this.graphUI.remove();
            this.blockUid = undefined;
            this.labelController = undefined;
            this.contextualBarController = undefined;
            this.graphUI = undefined;
            this.blockUI = undefined;
            this.blockModel = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the main graph of the viewer.
         * @public
         * @returns {UIThumbnailGraph} The main graph of the viewer.
         */
        UIThumbnailViewer.prototype.getMainGraph = function () {
            return this.graphUI;
        };
        /**
         * Gets the contextual bar controller.
         * @public
         * @returns {UIContextualBarController} The contextual bar controller.
         */
        UIThumbnailViewer.prototype.getContextualBarController = function () {
            return this.contextualBarController;
        };
        /**
         * Gets the label controller.
         * @public
         * @returns {UILabelController} The label controller.
         */
        UIThumbnailViewer.prototype.getLabelController = function () {
            return this.labelController;
        };
        /**
         * Resizes the view of the graph.
         * @private
         */
        UIThumbnailViewer.prototype.resize = function () {
            var kBorderGap = 10;
            var labelsBB = this.labelController.getBlockLabelsBoundingBox();
            var blockBB = this.blockUI.getElement().getBoundingClientRect();
            // Set the dimension of the viewer
            var viewerWidth = labelsBB.width + (kBorderGap * 2);
            var viewerHeight = labelsBB.height + (kBorderGap * 2);
            this.container.style.width = viewerWidth + 'px';
            this.container.style.minWidth = viewerWidth + 'px';
            this.container.style.height = viewerHeight + 'px';
            // Set the position of the block by intersecting the 2 bounding boxes
            var blockLeft = labelsBB.left < blockBB.left ? blockBB.left - labelsBB.left + kBorderGap : kBorderGap;
            var blockTop = labelsBB.top < blockBB.top ? blockBB.top - labelsBB.top + kBorderGap : kBorderGap;
            this.blockUI.setPosition(blockLeft, blockTop);
        };
        return UIThumbnailViewer;
    }(UIEGraphViewer));
    return UIThumbnailViewer;
});
