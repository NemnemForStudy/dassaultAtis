/// <amd-module name='DS/EPSSchematicsUI/labels/EPSSchematicsUIGraphTestDataPortLabel'/>
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
define("DS/EPSSchematicsUI/labels/EPSSchematicsUIGraphTestDataPortLabel", ["require", "exports", "DS/EPSSchematicsUI/labels/EPSSchematicsUIDataPortLabel"], function (require, exports, UIDataPortLabel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data port test label.
     * @class UIGraphTestDataPortLabel
     * @alias module:DS/EPSSchematicsUI/labels/EPSSchematicsUIGraphTestDataPortLabel
     * @extends UIDataPortLabel
     * @private
     */
    var UIGraphTestDataPortLabel = /** @class */ (function (_super) {
        __extends(UIGraphTestDataPortLabel, _super);
        /**
         * @constructor
         * @param {UILabelController} controller - The UI label controller.
         * @param {UIGraphTestDataPort} portUI - The UI data port.
         * @param {UIEnums.ELabelDisplaySpeed} displaySpeed - The label display speed.
         * @param {boolean} soloDisplay - Whether the label is displayed solo.
         */
        function UIGraphTestDataPortLabel(controller, portUI, displaySpeed, soloDisplay) {
            return _super.call(this, controller, portUI, displaySpeed, soloDisplay) || this;
        }
        /**
         * Updates the label line position.
         * @public
         * @override
         * @param {IViewpoint} vpt - The current graph viewpoint.
         * @param {boolean} [keepStraightLines=false] True to keep straight lines else false.
         */
        UIGraphTestDataPortLabel.prototype.updateLinePosition = function (vpt, keepStraightLines) {
            if (keepStraightLines === void 0) { keepStraightLines = false; }
            var portBBox = this._portUI.getBoundingBox(vpt);
            var labelBBox = this._element.getBoundingClientRect();
            var isStartPort = this._portUI.isStartPort();
            var bottomBorder = portBBox.top + portBBox.height;
            var middleHeight = portBBox.top + portBBox.height / 2;
            var lineX1 = portBBox.left + portBBox.width / 2;
            var lineY1 = isStartPort ? middleHeight : bottomBorder;
            var lineX2 = keepStraightLines === true ? lineX1 : labelBBox.left + labelBBox.width / 2;
            var lineY2 = isStartPort ? labelBBox.top + labelBBox.height : labelBBox.top;
            this._setLinePosition(lineX1, lineY1, lineX2, lineY2);
        };
        // TODO: Rename API because it is test value and not default value!
        /**
         * Gets the data port test value.
         * @private
         * @returns {IDataPortDefaultValue} The data port play value result.
         */
        UIGraphTestDataPortLabel.prototype._getDataPortDefaultValue = function () {
            return {
                hasDefaultValue: true,
                value: this._portUI.getModel().getTestValues()[0]
            };
        };
        /**
         * Updates the label position.
         * @protected
         * @override
         * @param {IViewpoint} vpt - The current graph viewpoint.
         */
        UIGraphTestDataPortLabel.prototype._updateLabelPosition = function (vpt) {
            var isOnTopOfPort = this._portUI.isStartPort();
            var left = this._computeLabelLeftPosition(vpt);
            var top = this._computeLabelTopPosition(vpt, isOnTopOfPort);
            this.setPosition(left, top);
        };
        return UIGraphTestDataPortLabel;
    }(UIDataPortLabel));
    return UIGraphTestDataPortLabel;
});
