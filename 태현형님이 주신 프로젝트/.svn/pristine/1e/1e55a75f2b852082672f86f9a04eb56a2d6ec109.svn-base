/* eslint-disable class-methods-use-this */
/// <amd-module name='DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView'/>
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
define("DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom"], function (require, exports, EGraphViews, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI node view.
     * @private
     * @class UINodeView
     * @alias module:DS/EPSSchematicsUI/nodes/views/EPSSchematicsUINodeView
     * @extends EGraphViews.HTMLNodeView
     */
    var UINodeView = /** @class */ (function (_super) {
        __extends(UINodeView, _super);
        /**
         * @public
         * @constructor
         */
        function UINodeView() {
            return _super.call(this) || this;
        }
        /**
         * Gets the node HTML element.
         * @public
         * @returns {IHTMLElement} The node HTML element.
         */
        UINodeView.prototype.getElement = function () {
            return this._element;
        };
        /**
         * Gets the node bounding box.
         * @public
         * @returns {IDOMRect} The node bounding box.
         */
        UINodeView.prototype.getBoundingBox = function () {
            return this._element.getBoundingClientRect();
        };
        /**
         * Checks if the provided element is a node draggable element.
         * @public
         * @param {Element} element - The element to check.
         * @returns {boolean} True if the provided element is a node draggable element else false.
         */
        UINodeView.prototype.isNodeDraggableElement = function (element) {
            return UIDom.hasClassName(element, 'sch-node-draggable');
        };
        /**
         * Destroys the view of the element.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view that called this callback.
         */
        UINodeView.prototype.ondestroy = function (elt, grView) {
            _super.prototype.ondestroy.call(this, elt, grView);
        };
        /**
         * Removes the customized default view of the node.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UINodeView.prototype.ondestroyDisplay = function (elt, grView) {
            this._element = undefined;
            _super.prototype.ondestroyDisplay.call(this, elt, grView);
        };
        /**
         * Builds the node HTML element.
         * @protected
         * @param {module:DS/egraph/core.Node} node - The graph node.
         * @returns {HTMLDivElement} The node HTML element.
         */
        UINodeView.prototype.buildNodeElement = function (node) {
            _super.prototype.buildNodeElement.call(this, node);
            this._element = UIDom.createElement('div');
            return this._element;
        };
        /**
         * The callback on the node display modification.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.PathSetTrie} changes - Changes set of paths of modified properties.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         */
        UINodeView.prototype.onmodifyDisplay = function (elt, changes, grView) {
            _super.prototype.onmodifyDisplay.call(this, elt, changes, grView);
        };
        /**
         * The callback on the node insert event.
         * @protected
         * @param {module:DS/egraph/core.Element} elt - The element using this view.
         * @param {module:DS/egraph/core.PathSetTrie} changes - Changes set of paths of modified properties.
         * @param {module:DS/egraph/core.GraphView} grView - The graph view.
         * @param {module:DS/egraph/core.GraphView} nextWithView - The view of the next.
         */
        UINodeView.prototype.oninsert = function (elt, changes, grView, nextWithView) {
            _super.prototype.oninsert.call(this, elt, changes, grView, nextWithView);
        };
        return UINodeView;
    }(EGraphViews.HTMLNodeView));
    return UINodeView;
});
