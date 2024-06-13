/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIShortcutView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIShortcutView", ["require", "exports", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/nodes/EPSSchematicsUIShortcut"], function (require, exports, UINodeView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI shortcut view.
     * @class UIShortcutView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIShortcutView
     * @extends UINodeView
     * @private
     */
    var UIShortcutView = /** @class */ (function (_super) {
        __extends(UIShortcutView, _super);
        /**
         * @constructor
         */
        function UIShortcutView() {
            return _super.call(this) || this;
        }
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {IHTMLElement} The node HTML element.
         */
        UIShortcutView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            UIDom.addClassName(this._element, 'sch-node-shortcut');
            return this._element;
        };
        return UIShortcutView;
    }(UINodeView));
    return UIShortcutView;
});
