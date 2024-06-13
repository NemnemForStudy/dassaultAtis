/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIDebugCursorView'/>
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIDebugCursorView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIDebugCursor"], function (require, exports, UINodeView, UIDom, UIFontIcon) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the view of a debug cursor.
     * @private
     * @class UIDebugCursorView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIDebugCursorView
     * @extends UINodeView
     */
    var UIDebugCursorView = /** @class */ (function (_super) {
        __extends(UIDebugCursorView, _super);
        /**
         * @public
         * @constructor
         * @param {boolean} isParent - True if this is a parent debug cursor else false.
         */
        function UIDebugCursorView(isParent) {
            var _this = _super.call(this) || this;
            _this._isParent = isParent;
            return _this;
        }
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UIDebugCursorView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            var classNames = __spreadArray([
                'sch-debug-cursor'
            ], (this._isParent ? ['sch-debug-cursor-parent'] : []), true);
            UIDom.addClassName(this._element, classNames);
            UIFontIcon.create3DSFontIcon('down', {
                className: [UIFontIcon.getWUX3DSClassName('1x')],
                parent: this._element
            });
            return this._element;
        };
        return UIDebugCursorView;
    }(UINodeView));
    return UIDebugCursorView;
});
