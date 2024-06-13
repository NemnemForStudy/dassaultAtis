/// <amd-module name='DS/EPSSchematicsUI/edges/views/EPSSchematicsUIPersistentLabelEdgeView'/>
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
define("DS/EPSSchematicsUI/edges/views/EPSSchematicsUIPersistentLabelEdgeView", ["require", "exports", "DS/EPSSchematicsUI/edges/views/EPSSchematicsUIEdgeView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/edges/EPSSchematicsUIPersistentLabelEdge"], function (require, exports, UIEdgeView, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI permanent label edge view.
     * @class UIPersistentLabelEdgeView
     * @alias module:DS/EPSSchematicsUI/edges/views/EPSSchematicsUIPersistentLabelEdgeView
     * @abstract
     * @private
     */
    var UIPersistentLabelEdgeView = /** @class */ (function (_super) {
        __extends(UIPersistentLabelEdgeView, _super);
        /**
         * @constructor
         */
        function UIPersistentLabelEdgeView() {
            return _super.call(this, 'sch-edge-persistent-label-path') || this;
        }
        /**
         * Creates the edge view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIPersistentLabelEdgeView.prototype.oncreateDisplay = function (elt, grView) {
            _super.prototype.oncreateDisplay.call(this, elt, grView);
            UIDom.addClassName(this.structure.root, 'sch-edge-persistent-label');
        };
        return UIPersistentLabelEdgeView;
    }(UIEdgeView));
    return UIPersistentLabelEdgeView;
});
