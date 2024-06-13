/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIViewerController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIViewerController", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/components/EPSSchematicsUIBreadcrumb", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphContainerViewer", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphTemplateViewer", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "css!DS/EPSSchematicsUI/css/controllers/EPSSchematicsUIViewerController"], function (require, exports, UIDom, UIBreadcrumb, UIViewer, UIGraphBlockViewer, UIGraphContainerViewer, UIGraphTemplateViewer, UIEvents, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Manage breadcrumb expander display when the viewer is resized!
    // TODO: Add tooltip to l!
    // TODO: Add icon to breadcrumb (template edition, graph container edition or sub graph edition)
    /**
     * This class defines a viewer controller.
     * @class UIViewerController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIViewerController
     * @private
     */
    var UIViewerController = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         */
        function UIViewerController(editor) {
            this._viewers = [];
            this._onBlockNameChangeCB = this._onBlockNameChange.bind(this);
            this._editor = editor;
            this._container = this._editor.getDomElement();
            this._initialize();
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the controller.
         * @public
         */
        UIViewerController.prototype.remove = function () {
            if (this._viewers.length > 0) {
                this.removeAllViewers();
            }
            if (this._rootViewer !== undefined) {
                this._rootViewer.remove();
            }
            if (this._breadcrumb !== undefined) {
                this._breadcrumb.remove();
            }
            if (this._container !== undefined && this._element !== undefined) {
                this._container.removeChild(this._element);
            }
            this._editor = undefined;
            this._container = undefined;
            this._element = undefined;
            this._breadcrumb = undefined;
            this._rootViewer = undefined;
            this._viewers = undefined;
            this._onBlockNameChangeCB = undefined;
        };
        /**
         * Creates the root viewer.
         * @public
         * @returns {UIViewer} The root viewer.
         */
        UIViewerController.prototype.createRootViewer = function () {
            this._rootViewer = new UIViewer(this._container, this._editor);
            this._element.appendChild(this._rootViewer.getContainer());
            this._dispatchViewerChangeEvent(this._rootViewer, true);
            return this._rootViewer;
        };
        /**
         * Creates a graph block viewer.
         * @public
         * @param {UIGraphBlock} graphBlockUI - The graph block.
         */
        UIViewerController.prototype.createGraphBlockViewer = function (graphBlockUI) {
            var viewer = new UIGraphBlockViewer(this._element, this._editor, graphBlockUI);
            this._appendViewerToController(viewer);
        };
        /**
         * Creates a graph container viewer.
         * @public
         * @param {UIGraphContainerBlock} graphContainerBlockUI - The graph container block.
         * @returns {UIGraphContainerViewer} The graph container viewer.
         */
        UIViewerController.prototype.createGraphContainerViewer = function (graphContainerBlockUI) {
            var viewer = new UIGraphContainerViewer(this._element, this._editor, graphContainerBlockUI);
            this._appendViewerToController(viewer);
            return viewer;
        };
        /**
         * Creates a graph template viewer.
         * @public
         * @param {string} templateUid - The template uid.
         * @param {boolean} isLocalTemplate - True for a local template else false.
         * @param {UIGraph} graphContext - The graph context.
         */
        UIViewerController.prototype.createGraphTemplateViewer = function (templateUid, isLocalTemplate, graphContext) {
            var viewer = new UIGraphTemplateViewer(this._element, this._editor, templateUid, isLocalTemplate, graphContext);
            this._appendViewerToController(viewer);
        };
        /**
         * Gets the current displayed viewer.
         * @public
         * @returns {UIViewer} The current viewer.
         */
        UIViewerController.prototype.getCurrentViewer = function () {
            return this._viewers.length > 0 ? this._viewers[this._viewers.length - 1] : this._rootViewer;
        };
        /**
         * Gets the root viewer.
         * @public
         * @returns {UIViewer} The root viewer.
         */
        UIViewerController.prototype.getRootViewer = function () {
            return this._rootViewer;
        };
        /**
         * Gets the root viewer with all the additional viewers.
         * @public
         * @returns {Array<UIViewer>} The root viewer with all the additional viewers.
         */
        UIViewerController.prototype.getRootViewerWithAllViewers = function () {
            return UIDom.flatDeep([this._rootViewer, this._viewers]);
        };
        /**
         * Gets all the viewers without the root viewer.
         * @public
         * @returns {UIViewer[]} All the viewers without the root viewer.
         */
        UIViewerController.prototype.getAllViewersWithoutRootViewer = function () {
            return this._viewers;
        };
        /**
         * Gets the breadcrumb.
         * @public
         * @returns {UIBreadcrumb} The breadcrumb.
         */
        UIViewerController.prototype.getBreadcrumb = function () {
            return this._breadcrumb;
        };
        /**
         * Removes all the viewers except the root viewer.
         * @public
         */
        UIViewerController.prototype.removeAllViewers = function () {
            this.removeViewersUpToIndex(0);
        };
        /**
         * Removes the viewers until the provided index is reached.
         * @public
         * @param {number} index - The index of the viewer to reach.
         */
        UIViewerController.prototype.removeViewersUpToIndex = function (index) {
            while (this._viewers.length > index) {
                this._removeLastViewer();
            }
            // Initialize state machine of previous viewer
            this.getCurrentViewer().createStateMachineController();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Dispatches a viewer change event.
         * @private
         * @param {UIViewer} viewer - The viewer.
         * @param {boolean} isOpening - True for opening, false for closing.
         */
        UIViewerController.prototype._dispatchViewerChangeEvent = function (viewer, isOpening) {
            var event = new UIEvents.UIViewerChangeEvent();
            event.viewer = viewer;
            event.isOpening = isOpening;
            this._editor.dispatchEvent(event);
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Initializes the controller.
         * @private
         */
        UIViewerController.prototype._initialize = function () {
            this._element = UIDom.createElement('div', {
                className: 'sch-viewer-controller',
                parent: this._container
            });
            this._breadcrumb = new UIBreadcrumb(this, this._container);
        };
        /**
         * Appends the provided viewer to the controller.
         * @private
         * @param {UIViewer} viewer - The new viewer.
         */
        UIViewerController.prototype._appendViewerToController = function (viewer) {
            // Remove current viewer state machine
            this.getCurrentViewer().removeStateMachineController();
            // Subscribe to graph name change event
            var graphModel = viewer.getMainGraph().getModel();
            graphModel.addListener(Events.BlockNameChangeEvent, this._onBlockNameChangeCB);
            // Update the breadcrumb with graph name
            var title = graphModel.getName();
            this._breadcrumb.addListItem(title);
            // Make the new viewer the current viewer
            this._viewers.push(viewer);
            this._element.appendChild(viewer.getContainer());
            this._dispatchViewerChangeEvent(viewer, true);
        };
        /**
         * The callback on the block name change event.
         * @private
         * @param {BlockNameChangeEvent} event - The block name change event.
         */
        UIViewerController.prototype._onBlockNameChange = function (event) {
            var block = event.getBlock();
            var viewer = this._viewers.find(function (v) { return v.getMainGraph().getModel() === block; });
            if (viewer !== undefined) {
                var index = this._viewers.indexOf(viewer);
                this._breadcrumb.changeItemName(index, event.getName());
            }
        };
        /**
         * Removes the last viewer.
         * @private
         */
        UIViewerController.prototype._removeLastViewer = function () {
            var lastViewer = this._viewers.pop();
            if (lastViewer !== undefined) {
                var graphModel = lastViewer.getMainGraph().getModel();
                graphModel.removeListener(Events.BlockNameChangeEvent, this._onBlockNameChangeCB);
                this._breadcrumb.removeLastItem();
                lastViewer.remove();
                this._dispatchViewerChangeEvent(this.getCurrentViewer(), false);
            }
        };
        return UIViewerController;
    }());
    return UIViewerController;
});
