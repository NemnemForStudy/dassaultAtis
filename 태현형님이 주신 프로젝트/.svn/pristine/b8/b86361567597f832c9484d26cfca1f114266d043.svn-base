/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIControlLinkLabel'/>
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
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIControlLinkLabel", ["require", "exports", "DS/EPSSchematicsUI/labels/EPSSchematicsUILinkLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel", "DS/EPSSchematicsUI/labels/EPSSchematicsUIControlPortLabel"], function (require, exports, UILinkLabel, UIPortLabel, UIControlPortLabel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI control link label.
     * @class UIControlLinkLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIControlLinkLabel
     * @extends UILinkLabel
     * @private
     */
    var UIControlLinkLabel = /** @class */ (function (_super) {
        __extends(UIControlLinkLabel, _super);
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIControlLink} linkUI - The UI data link.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         */
        function UIControlLinkLabel(controller, linkUI, displaySpeed) {
            return _super.call(this, controller, linkUI, displaySpeed) || this;
        }
        /**
         * Updates the start/end label and lines position.
         * @public
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIControlLinkLabel.prototype.updatePosition = function (vpt) {
            var startPort = this._linkUI.getStartPort();
            var endPort = this._linkUI.getEndPort();
            var startPortBBox = startPort.getBoundingBox(vpt);
            var endPortBBox = endPort.getBoundingBox(vpt);
            var parentBBox = this._linkUI.getParentGraph().getViewer().getClientRect();
            var startLabelBBox = this._startPortLabel.getElement().getBoundingClientRect();
            var endLabelBBox = this._endPortLabel.getElement().getBoundingClientRect();
            var gap = vpt.scale < 1 ? UIPortLabel.kLabelToPortXYGap * vpt.scale : UIPortLabel.kLabelToPortXYGap;
            var isStartUpperEnd = startPortBBox.top <= endPortBBox.top;
            // Compute possible positions
            var startLabelTopBorder = startPortBBox.top - parentBBox.top - startLabelBBox.height - gap;
            var startLabelBottomBorder = startPortBBox.top - parentBBox.top + startPortBBox.height + gap;
            var endLabelTopBorder = endPortBBox.top - parentBBox.top - endLabelBBox.height - gap;
            var endLabelBottomBorder = endPortBBox.top - parentBBox.top + endPortBBox.height + gap;
            // Compute start/end top/left positions
            var startLabelTop = isStartUpperEnd ? startLabelTopBorder : startLabelBottomBorder;
            var endLabelTop = isStartUpperEnd ? endLabelBottomBorder : endLabelTopBorder;
            var startLabelLeft = startPortBBox.left - parentBBox.left + startPortBBox.width + gap;
            var endLabelLeft = endPortBBox.left - parentBBox.left - endLabelBBox.width - gap;
            UILinkLabel.prototype.updatePosition.call(this, vpt, startLabelLeft, startLabelTop, endLabelLeft, endLabelTop);
        };
        /**
         * Creates the data link label element.
         * @protected
         */
        UIControlLinkLabel.prototype._createElement = function () {
            var startPort = this._linkUI.getStartPort();
            var endPort = this._linkUI.getEndPort();
            this._startPortLabel = new UIControlPortLabel(this._controller, startPort, this._displaySpeed, false);
            this._endPortLabel = new UIControlPortLabel(this._controller, endPort, this._displaySpeed, false);
            _super.prototype._createElement.call(this);
        };
        return UIControlLinkLabel;
    }(UILinkLabel));
    return UIControlLinkLabel;
});
