/// <amd-module name='DS/EPSSchematicsUI/edges/EPSSchematicsUIEdge'/>
define("DS/EPSSchematicsUI/edges/EPSSchematicsUIEdge", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore"], function (require, exports, EGraphCore) {
    "use strict";
    /**
     * This class define the UI Egraph base edge element.
     * @class UIEdge
     * @alias module:DS/EPSSchematicsUI/edges/EPSSchematicsUIEdge
     * @abstract
     * @private
     */
    var UIEdge = /** @class */ (function () {
        /**
         * @constructor
         */
        function UIEdge() {
            this.createDisplay();
        }
        /**
         * Removes the edge.
         * @public
         */
        UIEdge.prototype.remove = function () {
            this._display.remove();
            this._display = undefined;
        };
        /**
         * Creates the edge display.
         * @private
         */
        UIEdge.prototype.createDisplay = function () {
            this._display = new EGraphCore.Edge();
            this._display.data = { uiElement: this };
        };
        /**
         * Gets the edge display.
         * @public
         * @returns {EgraphCore.Edge} The edge display.
         */
        UIEdge.prototype.getDisplay = function () {
            return this._display;
        };
        /**
         * Gets the edge view.
         * @public
         * @returns {EGraphViews.SVGEdgeView} The edge view.
         */
        UIEdge.prototype.getView = function () {
            return this._display.views.main;
        };
        /**
         * Sets the edge view.
         * @public
         * @param {EGraphViews.SVGEdgeView} view - The edge view.
         */
        UIEdge.prototype.setView = function (view) {
            this._display.views.main = view;
        };
        /**
         * Checks if the edge is selected.
         * @public
         * @returns {boolean} True if the edge is selected else false.
         */
        UIEdge.prototype.isSelected = function () {
            return this._display.selected;
        };
        return UIEdge;
    }());
    return UIEdge;
});
