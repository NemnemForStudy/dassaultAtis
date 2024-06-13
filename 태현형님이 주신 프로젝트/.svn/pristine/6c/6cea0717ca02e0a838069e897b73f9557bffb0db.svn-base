/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIDataLinkLabel'/>
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
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIDataLinkLabel", ["require", "exports", "DS/EPSSchematicsUI/labels/EPSSchematicsUILinkLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel"], function (require, exports, UILinkLabel, UIPortLabel, UIDataPortLabel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data link label.
     * @class UIDataLinkLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIDataLinkLabel
     * @extends UILinkLabel
     * @private
     */
    var UIDataLinkLabel = /** @class */ (function (_super) {
        __extends(UIDataLinkLabel, _super);
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIDataLink} linkUI - The UI data link.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        function UIDataLinkLabel(controller, linkUI, displaySpeed) {
            return _super.call(this, controller, linkUI, displaySpeed) || this;
        }
        /**
         * Creates the data link label element.
         * @protected
         */
        UIDataLinkLabel.prototype._createElement = function () {
            var startPort = this._linkUI.getStartPort();
            var endPort = this._linkUI.getEndPort();
            this._startPortLabel = new UIDataPortLabel(this._controller, startPort, this._displaySpeed, false);
            this._endPortLabel = new UIDataPortLabel(this._controller, endPort, this._displaySpeed, false);
            _super.prototype._createElement.call(this);
        };
        /**
         * Updates the start/end label and lines position.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIDataLinkLabel.prototype.updatePosition = function (vpt) {
            var startPort = this._linkUI.getStartPort();
            var endPort = this._linkUI.getEndPort();
            var startPortBBox = startPort.getBoundingBox(vpt);
            var endPortBBox = endPort.getBoundingBox(vpt);
            var parentBBox = this._linkUI.getParentGraph().getViewer().getClientRect();
            var startLabelBBox = this._startPortLabel.getElement().getBoundingClientRect();
            var endLabelBBox = this._endPortLabel.getElement().getBoundingClientRect();
            var gap = vpt.scale < 1 ? UIPortLabel.kLabelToPortXYGap * vpt.scale : UIPortLabel.kLabelToPortXYGap;
            var isStartLefterEnd = startPortBBox.left <= endPortBBox.left;
            // Compute possible positions
            var startLabelLeftBorder = startPortBBox.left - parentBBox.left - startLabelBBox.width - gap;
            var startLabelRightBorder = startPortBBox.left - parentBBox.left + startPortBBox.width + gap;
            var endLabelLeftBorder = endPortBBox.left - parentBBox.left - endLabelBBox.width - gap;
            var endLabelRightBorder = endPortBBox.left - parentBBox.left + endPortBBox.width + gap;
            // Compute start/end top/left positions
            var startLabelLeft = isStartLefterEnd ? startLabelLeftBorder : startLabelRightBorder;
            var endLabelLeft = isStartLefterEnd ? endLabelRightBorder : endLabelLeftBorder;
            var startLabelTop = startPortBBox.top - parentBBox.top + startPortBBox.height + gap;
            var endLabelTop = endPortBBox.top - parentBBox.top - endLabelBBox.height - gap;
            _super.prototype.updatePosition.call(this, vpt, startLabelLeft, startLabelTop, endLabelLeft, endLabelTop);
        };
        return UIDataLinkLabel;
    }(UILinkLabel));
    return UIDataLinkLabel;
});
