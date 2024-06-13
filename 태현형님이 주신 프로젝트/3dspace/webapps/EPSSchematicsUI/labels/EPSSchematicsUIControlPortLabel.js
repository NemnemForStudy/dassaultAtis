/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIControlPortLabel'/>
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
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIControlPortLabel", ["require", "exports", "DS/EPSSchematicsUI/labels/EPSSchematicsUIPortLabel", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph"], function (require, exports, UIPortLabel, UIDom, EventPort, UIGraph) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI control port label.
     * @class UIControlPortLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIControlPortLabel
     * @extends UIPortLabel
     * @private
     */
    var UIControlPortLabel = /** @class */ (function (_super) {
        __extends(UIControlPortLabel, _super);
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIControlPort} portUI - The UI control port.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         * @param {boolean} soloDisplay - Whether the label is displayed solo.
         */
        function UIControlPortLabel(controller, portUI, displaySpeed, soloDisplay) {
            return _super.call(this, controller, portUI, displaySpeed, soloDisplay) || this;
        }
        /**
         * Updates the line position.
         * @public
         * @abstract
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIControlPortLabel.prototype.updateLinePosition = function (vpt) {
            var labelBBox = this._element.getBoundingClientRect();
            var portBBox = this._portUI.getBoundingBox(vpt);
            var isStartPort = this._portUI.isStartPort();
            var isGraphPort = this._portUI.getParent() instanceof UIGraph;
            var lineX1 = labelBBox.left + labelBBox.width / 2;
            var lineY1 = labelBBox.top + labelBBox.height / 2;
            var leftBorder = portBBox.left;
            var rightBorder = portBBox.left + portBBox.width;
            var lineX2 = isGraphPort ? (isStartPort ? rightBorder : leftBorder) : (isStartPort ? leftBorder : rightBorder);
            var lineY2 = portBBox.top + portBBox.height / 2;
            this._setLinePosition(lineX1, lineY1, lineX2, lineY2);
        };
        /**
         * Creates the control port label element.
         * @protected
         */
        UIControlPortLabel.prototype._createElement = function () {
            _super.prototype._createElement.call(this);
            UIDom.addClassName(this._element, 'sch-label-controlport');
        };
        /**
         * Builds the label title element.
         * @protected
         * @returns {HTMLDivElement} The label title element
         */
        UIControlPortLabel.prototype._buildTitleElement = function () {
            var titleElt = _super.prototype._buildTitleElement.call(this);
            if (this._portUI.getModel() instanceof EventPort) {
                UIDom.createElement('span', {
                    className: 'sch-label-port-bracket',
                    textContent: ' (',
                    parent: titleElt
                });
                UIDom.createElement('span', {
                    className: 'sch-label-controlport-eventtype',
                    textContent: this._portUI.getModel().getEventType(),
                    parent: titleElt
                });
                UIDom.createElement('span', {
                    className: 'sch-label-port-bracket',
                    textContent: ')',
                    parent: titleElt
                });
            }
            return titleElt;
        };
        /**
         * Updates the label position.
         * @protected
         * @abstract
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIControlPortLabel.prototype._updateLabelPosition = function (vpt) {
            var parentBBox = this._portUI.getParentGraph().getViewer().getClientRect();
            var portBBox = this._portUI.getBoundingBox(vpt);
            var labelBBox = this._element.getBoundingClientRect();
            var isStartPort = this._portUI.isStartPort();
            var isGraphPort = this._portUI.getParent() instanceof UIGraph;
            //const gap = vpt.scale < 1 ? UIPortLabel.kLabelToPortGap * vpt.scale : UIPortLabel.kLabelToPortGap;
            var gap = UIPortLabel.kLabelToPortGap;
            // Compute the label left position
            var leftStartPort = portBBox.left - parentBBox.left - labelBBox.width - gap;
            var rightStartPort = portBBox.left - parentBBox.left + portBBox.width + gap;
            var labelLeft = isGraphPort ? (isStartPort ? rightStartPort : leftStartPort) : (isStartPort ? leftStartPort : rightStartPort);
            var leftLimit = 0;
            var rightLimit = parentBBox.width - labelBBox.width;
            labelLeft = labelLeft < leftLimit ? leftLimit : labelLeft;
            labelLeft = labelLeft > rightLimit ? rightLimit : labelLeft;
            /*
            // TODO: POC to avoid label border collision!
            const labelLeftGap = labelBBox.width + UIPortLabel.kLabelToPortGap;
            const x, y;
            if (portBBox.left - parentBBox.left > 0) {
                if (portBBox.left - parentBBox.left - labelLeftGap > 0) {
                    x = -labelLeftGap;
                } else {
                    x = -portBBox.left - parentBBox.left;
                }
            } else {
                if (portBBox.left - parentBBox.left + labelLeftGap < 0) {
                    x = labelLeftGap;
                } else {
                    x = -portBBox.left - parentBBox.left;
                }
            }
            console.log(x);
    
            y = Math.sqrt(Math.pow(labelLeftGap, 2) - Math.pow(x, 2));
            console.log(y);
    
            labelLeft = portBBox.left + x;
            const labelTop = portBBox.top - parentBBox.top + (portBBox.height / 2) - (labelBBox.height / 2) - y;
            */
            // Compute the label top position
            var labelTop = portBBox.top - parentBBox.top + (portBBox.height / 2) - (labelBBox.height / 2);
            var topLimit = 0;
            var bottomLimit = parentBBox.height - labelBBox.height;
            labelTop = labelTop < topLimit ? topLimit : labelTop;
            labelTop = labelTop > bottomLimit ? bottomLimit : labelTop;
            // Set the label position
            this.setPosition(labelLeft, labelTop);
        };
        return UIControlPortLabel;
    }(UIPortLabel));
    return UIControlPortLabel;
});
