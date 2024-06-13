/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphControlButton'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphControlButton", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIGraphControlButtonView"], function (require, exports, UINode, UIGraphControlButtonView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a graph control button.
     * @class UIGraphControlButton
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphControlButton
     * @extends UINode
     * @private
     */
    var UIGraphControlButton = /** @class */ (function (_super) {
        __extends(UIGraphControlButton, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The parent graph.
         * @param {boolean} isInput - True for input, false for output.
         */
        function UIGraphControlButton(graph, isInput) {
            var _this = _super.call(this, { graph: graph, isDraggable: false }) || this;
            _this._isInput = undefined;
            _this._isInput = isInput;
            _this.setView(new UIGraphControlButtonView(_this, isInput));
            _this.setDimension(20, 20);
            _this.addNodeToViewer();
            return _this;
        }
        /**
         * Removes the node from its parent graph.
         * @public
         */
        UIGraphControlButton.prototype.remove = function () {
            this._isInput = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the main view if the node.
         * @public
         * @returns {UIGraphControlButtonView} The main view of the node.
         */
        UIGraphControlButton.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Checks if the node is selectable.
         * @public
         * @returns {boolean} True if the node is selectable else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraphControlButton.prototype.isSelectable = function () {
            return false;
        };
        return UIGraphControlButton;
    }(UINode));
    return UIGraphControlButton;
});
