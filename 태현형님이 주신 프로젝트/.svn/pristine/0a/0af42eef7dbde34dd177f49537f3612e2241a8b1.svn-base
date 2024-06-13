/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIDebugCursor'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIDebugCursor", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIDebugCursorView"], function (require, exports, UINode, UIDebugCursorView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a debug cursor.
     * @class UIDebugCursor
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIDebugCursor
     * @extends UINode
     * @private
     */
    var UIDebugCursor = /** @class */ (function (_super) {
        __extends(UIDebugCursor, _super);
        /**
         * @constructor
         * @param {UIBlock} block - The block where to place the debug cursor.
         * @param {boolean} isParent - True if this is a parent debug cursor else false.
         */
        function UIDebugCursor(block, isParent) {
            var _this = _super.call(this, { graph: block.getGraph(), isDraggable: false }) || this;
            _this._kDataPortGap = 20;
            _this._kControlPortGap = 20;
            _this._block = block;
            _this._isParent = isParent;
            _this.setView(new UIDebugCursorView(_this._isParent));
            _this._updatePosition();
            _this._updateDimension();
            _this.addNodeToViewer();
            return _this;
        }
        /**
         * Removes the node from its parent graph.
         * @public
         */
        UIDebugCursor.prototype.remove = function () {
            this._block = undefined;
            this._isParent = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the block of the debug cursor.
         * @public
         * @returns {UIBlock} The ui block.
         */
        UIDebugCursor.prototype.getBlock = function () {
            return this._block;
        };
        /**
         * Updates the debug cursor position.
         * @private
         */
        UIDebugCursor.prototype._updatePosition = function () {
            var position = this._block.getPosition();
            var left = position.left - this._kControlPortGap;
            var top = position.top - this._kDataPortGap;
            this.setPosition(left, top);
        };
        /**
         * Updates the debug cursor dimension.
         * @private
         */
        UIDebugCursor.prototype._updateDimension = function () {
            var dimension = this._block.getDimension();
            var width = dimension.width + (this._kDataPortGap * 2);
            var height = dimension.height + (this._kControlPortGap * 2);
            this.setDimension(width, height);
        };
        return UIDebugCursor;
    }(UINode));
    return UIDebugCursor;
});
