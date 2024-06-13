/// <amd-module name='DS/EPSSchematicsUI/edges/views/EPSSchematicsUIEdgeView'/>
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
define("DS/EPSSchematicsUI/edges/views/EPSSchematicsUIEdgeView", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews"], function (require, exports, EGraphViews) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI edge view.
     * @class UIEdgeView
     * @alias module:DS/EPSSchematicsUI/edges/views/EPSSchematicsUIEdgeView
     * @extends SVGEdgeView
     * @abstract
     * @private
     */
    var UIEdgeView = /** @class */ (function (_super) {
        __extends(UIEdgeView, _super);
        /**
         * @constructor
         * @param {string} className - The name of the CSS class to use for displaying the edge.
         */
        function UIEdgeView(className) {
            return _super.call(this, className) || this;
        }
        /**
         * Gets the link SVG element.
         * @public
         * @returns {SVGElement} The SVG element representing the link.
         */
        UIEdgeView.prototype.getElement = function () {
            return this.structure.root;
        };
        /**
         * Gets the link SVG path element.
         * @public
         * @returns {SVGPathElement} The link SVG path element.
         */
        UIEdgeView.prototype.getPath = function () {
            return this.display.elt;
        };
        /**
         * Removes the link view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIEdgeView.prototype.ondestroyDisplay = function (elt, grView) {
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Creates the edge view.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIEdgeView.prototype.oncreateDisplay = function (elt, grView) {
            _super.prototype.oncreateDisplay.call(this, elt, grView);
        };
        /**
         * The callback to apply modified properties to the display.
         * @protected
         * @param {EGraphCore.Element} elt - The element using this view.
         * @param {EGraphCore.PathSetTrie} changes - Set of paths of modified properties.
         * @param {EGraphCore.GraphView} grView - The graph view that called this callback.
         */
        UIEdgeView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
        };
        return UIEdgeView;
    }(EGraphViews.SVGEdgeView));
    return UIEdgeView;
});
