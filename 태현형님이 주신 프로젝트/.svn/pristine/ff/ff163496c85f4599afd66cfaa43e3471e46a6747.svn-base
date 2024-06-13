/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIEGraphViewer'/>
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIEGraphViewer", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphCore", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphViews"], function (require, exports, EGraphCore, EGraphViews) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class define the UI EGraph base element.
     * @class UIEGraphViewer
     * @alias module:DS/EPSSchematicsUI/viewers/EPSSchematicsUIEGraphViewer
     * @abstract
     * @private
     */
    var UIEGraphViewer = /** @class */ (function () {
        /**
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         */
        function UIEGraphViewer(container, editor) {
            this.container = container;
            this.editor = editor;
            this.display = new EGraphCore.EGraph();
            this.display.addView('main', new EGraphViews.HTMLGraphView(this.container));
            this.display.data = { uiElement: this };
        }
        /**
         * Removes the EGraph base element.
         * @public
         */
        UIEGraphViewer.prototype.remove = function () {
            this.container.parentNode.removeChild(this.container);
            this.container = undefined;
            this.editor = undefined;
            this.display = undefined;
        };
        /**
         * Gets the viewer display.
         * @public
         * @returns {EGraphCore.EGraph} The viewer display.
         */
        UIEGraphViewer.prototype.getDisplay = function () {
            return this.display;
        };
        /**
         * Gets the main view of the EGraph viewer.
         * @public
         * @returns {EGraphViews.HTMLGraphView} The main view of the EGraph viewer.
         */
        UIEGraphViewer.prototype.getView = function () {
            return this.display.views.main;
        };
        /**
         * Gets the editor.
         * @returns {UIEditor} The editor.
         */
        UIEGraphViewer.prototype.getEditor = function () {
            return this.editor;
        };
        /**
         * Gets the viewer container.
         * @public
         * @returns {HTMLElement} The viewer container.
         */
        UIEGraphViewer.prototype.getContainer = function () {
            return this.container;
        };
        /**
         * Gets the client height of the viewer.
         * @public
         * @returns {number} The client height of the viewer.
         */
        UIEGraphViewer.prototype.getHeight = function () {
            return this.container.clientHeight;
        };
        /**
        * Gets the client width of the viewer.
        * @public
        * @returns {number} The client width of the viewer.
        */
        UIEGraphViewer.prototype.getWidth = function () {
            return this.container.clientWidth;
        };
        /**
         * Get the bounding box of the current  viewer.
         * @public
         * @returns {IDOMRect} The bounding box of the current  viewer.
         */
        UIEGraphViewer.prototype.getClientRect = function () {
            return this.container.getClientRects()[0];
        };
        /**
         * Gets the current viewpoint of the viewer.
         * @public
         * @returns {IViewpoint} The current viewpoint.
         */
        UIEGraphViewer.prototype.getViewpoint = function () {
            return {
                translationX: this.display.views.main.vpt[0],
                translationY: this.display.views.main.vpt[1],
                scale: this.display.views.main.vpt[2]
            };
        };
        /**
         * Sets the viewpoint of the  viewer.
         * @public
         * @param {IViewpoint} vpt - The viewpoint to set.
         */
        UIEGraphViewer.prototype.setViewpoint = function (vpt) {
            this.display.views.main.setViewpoint([vpt.translationX, vpt.translationY, vpt.scale]);
        };
        /**
         * Computes the coordinates relative to the viewpoint from clientX, clientY mouse coordinates.
         * @public
         * @param {number} clientX - The mouse event clientX property.
         * @param {number} clientY - The mouse event clientY property.
         * @returns {[number, number]} An array of two numbers [x,y] expressed in viewpoint coordinate system.
         */
        UIEGraphViewer.prototype.clientToViewpoint = function (clientX, clientY) {
            return this.display.views.main.clientToViewpoint(clientX, clientY);
        };
        /**
         * Gets the middle viewpoint position.
         * @public
         * @returns {IDomPosition} The left and top middle viewpoint position.
         */
        UIEGraphViewer.prototype.getMiddleViewpointPosition = function () {
            //const viewerSize = this.display.views.main.getSize(); EGraph issue: getSize()/height/width are invalid because not refreshed while resizing the browser!
            //const position = this.clientToViewpoint(viewerSize[0] /2, viewerSize[1] / 2);
            var bbox = this.display.views.main.domRoot.getBoundingClientRect();
            var position = this.clientToViewpoint(bbox.width / 2, bbox.height / 2);
            return { left: position[0], top: position[1] };
        };
        return UIEGraphViewer;
    }());
    return UIEGraphViewer;
});
