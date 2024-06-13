/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer'/>
/// <reference path='../interfaces/EPSSchematicsUIJSONInterfaces.ts'/>
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
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer", ["require", "exports", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIEGraphViewer", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIClearGraphDialog", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUILabelController", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphSubDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockSubDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", "DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", "DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFileLoader", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsCSI/EPSSchematicsCSITools", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIPort", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIStateMachineController", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "css!DS/EPSSchematicsUI/css/viewers/EPSSchematicsUIViewer", "css!DS/egraph/views", "css!DS/EPSSchematicsUI/css/EPSSchematicsUIFont"], function (require, exports, UIEGraphViewer, UIDom, UIGraph, UIClearGraphDialog, UIContextualBarController, UILabelController, UIBlock, UIComment, UIControlPort, UIDataPort, UIGraphDataPort, UIGraphSubDataPort, UIGraphControlPort, UIBlockDataPort, UIBlockSubDataPort, UIBlockControlPort, UIShortcut, UIShortcutDataPort, UIDataLink, UIControlLink, UITemplateLibrary, UIFileSaver, UIFileLoader, ModelEnums, Tools, CSITools, UINode, UIPort, UILink, UIStateMachineController, GraphBlock) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the graph viewer.
     * @class UIViewer
     * @alias module:DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer
     * @private
     */
    var UIViewer = /** @class */ (function (_super) {
        __extends(UIViewer, _super);
        /**
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         */
        function UIViewer(container, editor) {
            var _this = this;
            container = UIDom.createElement('div', {
                className: ['epsGraphViewer', 'epsNoSelect'],
                parent: container,
                attributes: { tabIndex: 0 }
            });
            _this = _super.call(this, container, editor) || this;
            _this.loading = false;
            _this.fileLoader = new UIFileLoader(_this);
            _this.fileSaverGraph = new UIFileSaver();
            _this.fileSaverTemplates = new UIFileSaver();
            _this.onAnimviewpointCB = _this.onAnimviewpoint.bind(_this);
            // Configure graph viewer display
            _this.display.setZoomOpts({ customMgt: true, min: 0.05, max: 10 });
            _this.display.views.main.addListener('animviewpoint', _this.onAnimviewpointCB); // Handling fixed drawers
            // Initialize controllers
            _this.clearGraphDialog = new UIClearGraphDialog(_this.editor);
            _this.contextualBarController = new UIContextualBarController(_this);
            _this.labelController = new UILabelController(_this);
            _this.createStateMachineController();
            return _this;
        }
        /**
         * Removes the viewer.
         * @public
         */
        UIViewer.prototype.remove = function () {
            this.display.views.main.removeListener('animviewpoint', this.onAnimviewpointCB);
            this.fileLoader.remove();
            this.removeStateMachineController();
            if (this.mainGraph !== undefined) {
                this.mainGraph.remove();
            }
            if (this.labelController !== undefined) {
                this.labelController.remove();
                this.labelController = undefined;
            }
            this.contextualBarController.remove();
            this.clearGraphDialog.remove();
            this.stateMachineController = undefined;
            this.mainGraph = undefined;
            this.contextualBarController = undefined;
            this.labelController = undefined;
            this.clearGraphDialog = undefined;
            this.editionMode = undefined;
            this.loading = undefined;
            this.onAnimviewpointCB = undefined;
            this.fileSaverGraph = undefined;
            this.fileSaverTemplates = undefined;
            this.fileLoader = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Saves the graph into JSON.
         * @public
         * @returns {IJSONGraph} The JSON object representing the graph model and ui.
         */
        UIViewer.prototype.save = function () {
            return this.mainGraph.save();
        };
        /**
         * Loads a JSON string representing a graph into the graph viewer.
         * @public
         * @param {string} jsonGraph - The JSON string representing the graph to load into the viewer.
         */
        UIViewer.prototype.load = function (jsonGraph) {
            this.labelController.clearAllLabels();
            var jsonObject = JSON.parse(jsonGraph);
            if (jsonObject !== undefined && jsonObject.model !== undefined) {
                if (jsonObject.model.graphs !== undefined && jsonObject.ui !== undefined && jsonObject.ui.graphs !== undefined) {
                    UITemplateLibrary.fromJSON(jsonObject);
                }
                else {
                    if (this.mainGraph === undefined) {
                        var graphModel = GraphBlock.createGraph(jsonObject);
                        this.createGraph(graphModel);
                    }
                    this.loading = true;
                    this.mainGraph.load(jsonObject);
                    this.zoomGraphToFitInView(false);
                    this.clearSelection();
                    this.loading = false;
                    this.editor.getTypeLibraryController().updateOccurenceCount();
                }
            }
            else {
                this.editor.displayNotification({ level: 'error', title: 'Invalid JSON graph!' });
            }
        };
        /**
         * Saves the current graph into a JSON file.
         * @public
         */
        UIViewer.prototype.saveFile = function () {
            var _this = this;
            var graph = this.save();
            var graphString = JSON.stringify(graph, undefined, 2);
            this.fileSaverGraph.saveTextFile(graphString, 'SchematicsGraph.json');
            if (UITemplateLibrary.getGraphUidList().length > 0) {
                var jsonTemplates = {};
                UITemplateLibrary.toJSON(jsonTemplates);
                var templatesString_1 = JSON.stringify(jsonTemplates, undefined, 2);
                setTimeout(function () { return _this.fileSaverTemplates.saveTextFile(templatesString_1, 'SchematicsGlobalTemplates.json'); }, 100);
            }
        };
        /**
         * Loads a JSON file into the current graph viewer.
         * @public
         */
        UIViewer.prototype.loadFile = function () {
            this.fileLoader.loadFile();
        };
        /**
         * Checks if the viewer is loading a JSON.
         * @public
         * @returns {boolean} True if the viewer is loading a JSON else false.
         */
        UIViewer.prototype.isLoading = function () {
            return this.loading;
        };
        /**
         * Loads the default graph.
         * @public
         */
        UIViewer.prototype.loadDefaultGraph = function () {
            this.load(this.editor.getOptions().defaultJSONGraph);
        };
        /**
         * Gets the main graph of the viewer.
         * @public
         * @returns {UIGraph} The main graph of the viewer.
         */
        UIViewer.prototype.getMainGraph = function () {
            return this.mainGraph;
        };
        /**
         * Gets the clear graph dialog.
         * @public
         * @returns {UIClearGraphDialog} The clear graph dialog.
         */
        UIViewer.prototype.getClearGraphDialog = function () {
            return this.clearGraphDialog;
        };
        /**
         * Gets the contextual bar controller.
         * @public
         * @returns {UIContextualBarController} The contextual bar controller.
         */
        UIViewer.prototype.getContextualBarController = function () {
            return this.contextualBarController;
        };
        /**
         * Gets the label controller.
         * @public
         * @returns {UILabelController} The label controller.
         */
        UIViewer.prototype.getLabelController = function () {
            return this.labelController;
        };
        /**
         * Gets the state machine controller.
         * @public
         * @returns {UIStateMachineController} The state machine controllerr.
         */
        UIViewer.prototype.getStateMachineController = function () {
            return this.stateMachineController;
        };
        /**
         * Gets the file loader.
         * @public
         * @returns {UIFileLoader} The file loader.
         */
        UIViewer.prototype.getFileLoader = function () {
            return this.fileLoader;
        };
        /**
         * Gets the file saver graph.
         * @public
         * @returns {UIFileSaver} The file saver graph.
         */
        UIViewer.prototype.getFileSaverGraph = function () {
            return this.fileSaverGraph;
        };
        /**
         * Gets the file saver templates.
         * @public
         * @returns {UIFileSaver} The file saver templates.
         */
        UIViewer.prototype.getFileSaverTemplates = function () {
            return this.fileSaverTemplates;
        };
        /**
         * Creates a main graph and adds it to the viewer.
         * The main graph will be removed if it already exists.
         * @public
         * @param {GraphBlock} model - The graph model.
         * @param {IJSONGraphUI} [modelUI] - The graph model UI.
         * @returns {UIGraph} The created graph.
         */
        UIViewer.prototype.createGraph = function (model, modelUI) {
            if (this.mainGraph !== undefined) {
                this.mainGraph.remove();
            }
            this.mainGraph = new UIGraph(this, model, modelUI);
            this.zoomGraphToFitInView(true);
            return this.mainGraph;
        };
        /**
         * Clears the graph.
         * @public
         */
        UIViewer.prototype.clearGraph = function () {
            this.clearGraphDialog.open();
        };
        /**
         * Creates the state machine controller.
         * @public
         */
        UIViewer.prototype.createStateMachineController = function () {
            if (this.stateMachineController === undefined) {
                this.stateMachineController = new UIStateMachineController(this);
            }
        };
        /**
         * Removes the state machine controller.
         * @private
         */
        UIViewer.prototype.removeStateMachineController = function () {
            if (this.stateMachineController !== undefined) {
                this.stateMachineController.remove();
                this.stateMachineController = undefined;
            }
        };
        /**
         * Add the provided link to the viewer.
         * @public
         * @param {UIPort} startPort - The UI start port.
         * @param {UIPort} endPort - The UI end port.
         * @param {UILink} link - The UI link.
         */
        UIViewer.prototype.addLinkToViewer = function (startPort, endPort, link) {
            this.display.addEdge(startPort.getDisplay(), endPort.getDisplay(), link.getDisplay());
        };
        /**
         * Removes the provided link from the viewer.
         * @public
         * @param {UILink} link - The UI link to remove.
         */
        UIViewer.prototype.removeLinkFromViewer = function (link) {
            this.display.removeEdge(link.getDisplay());
        };
        /**
         * Centers the view on the provided node.
         * @public
         * @param {UINode|UIGraph} [node] - The node that need to be centered on.
         */
        UIViewer.prototype.centerView = function (node) {
            node = node || this.mainGraph;
            var viewWidth = this.getWidth();
            var viewHeight = this.getHeight();
            var scale = this.getViewpoint().scale;
            var nodeWidth = node.getDisplay().actualWidth * scale;
            var nodeHeight = node.getDisplay().actualHeight * scale;
            var nodeLeft = node.getDisplay().actualLeft * scale;
            var nodeTop = node.getDisplay().actualTop * scale;
            var x = Math.round((viewWidth / 2) - (nodeWidth / 2) - nodeLeft);
            var y = Math.round((viewHeight / 2) - (nodeHeight / 2) - nodeTop);
            this.setViewpoint({ translationX: x, translationY: y, scale: scale });
        };
        /**
         * Zooms the graph so it can be fit in the viewer.
         * TODO: Detect viewer size change and trigger zoomGraphToFitInView!
         * @public
         * @param {boolean} [keepScaleOne=false] - True to only zoom the graph if it does not fit in the view.
         */
        UIViewer.prototype.zoomGraphToFitInView = function (keepScaleOne) {
            if (keepScaleOne === void 0) { keepScaleOne = false; }
            var viewWidth = this.getWidth();
            var viewHeight = this.getHeight();
            if (viewWidth > 0 && viewHeight > 0) {
                var vpt = this.getViewpoint();
                // Get graph control ports width
                var controlPortMaxWidth = (this.mainGraph.getControlPortsMaxWidth() / vpt.scale) - 20; // UIGraphControlPortView.kPortLeftOffset = 20;
                controlPortMaxWidth = controlPortMaxWidth < 20 ? 20 : controlPortMaxWidth;
                var margin = 40;
                var drawerHeight = 20;
                var graphWidth = this.mainGraph.getWidth();
                var graphHeight = this.mainGraph.getHeight();
                var fullWidth = graphWidth + (controlPortMaxWidth * 2) + (margin * 2);
                var fullHeight = graphHeight + (drawerHeight * 2) + (margin * 2);
                var scaleWidth = viewWidth / fullWidth;
                var scaleHeight = viewHeight / fullHeight;
                var scale = keepScaleOne ? 1 : (scaleWidth < scaleHeight ? scaleWidth : scaleHeight);
                this.setViewpoint({ translationX: vpt.translationX, translationY: vpt.translationY, scale: scale });
                this.centerView();
            }
        };
        /**
         * Zooms the graph so that one pixel of the graph
         * corresponds to one pixel of the screen.
         * @public
         */
        UIViewer.prototype.zoomOneToOne = function () {
            var vpt = this.getViewpoint();
            vpt.scale = 1;
            this.setViewpoint(vpt);
            this.centerView(this.mainGraph);
        };
        /**
         * Switches the graph contrast.
         * @public
         */
        UIViewer.prototype.switchGraphContrast = function () {
            var emptyFilter = '';
            var contrastFilter = 'brightness(70%) contrast(150%)';
            var blackFilter = 'hue-rotate(190deg) invert(80%)';
            var currentFilter = this.container.style.filter;
            var filter = emptyFilter;
            if (currentFilter === emptyFilter) {
                filter = contrastFilter;
            }
            else if (currentFilter === contrastFilter) {
                filter = blackFilter;
            }
            this.container.style.filter = filter;
        };
        /**
         * Sets the edition mode state of the graph.
         * @public
         * @param {boolean} state - True/false to enable/disable the edition mode.
         */
        UIViewer.prototype.setEditionMode = function (state) {
            if (state === true) {
                if (this.editionMode === undefined) {
                    this.editionMode = UIDom.createElement('div', {
                        className: ['epsEditionMode', 'epsNoSelect'],
                        parent: this.container
                    });
                }
            }
            else if (state === false && this.editionMode !== undefined) {
                this.container.removeChild(this.editionMode);
                this.editionMode = undefined;
            }
        };
        /**
         * Gets the edition mode state of the graph.
         * @public
         * @returns {boolean} True if the edition mode is enabled else false.
         */
        UIViewer.prototype.getEditionMode = function () {
            return this.editionMode !== undefined && this.editionMode !== null;
        };
        /**
         * Toggles the breakpoint on the selected blocks.
         * @public
         */
        UIViewer.prototype.toggleBreakpointOnSelectedBlocks = function () {
            var breakpointController = this.getEditor().getBreakpointController();
            var blocks = this.getSelectedBlocks();
            var breakpointCount = 0;
            blocks.forEach(function (block) { breakpointCount += breakpointController.hasBreakpoint(block) ? 1 : -1; });
            if (Math.abs(breakpointCount) === blocks.length) {
                blocks.forEach(function (block) { return block.toggleBreakpoint(); });
            }
        };
        /**
         * Creates a shortcut for each selected data ports.
         * @public
         */
        UIViewer.prototype.createShortcutFromSelection = function () {
            var _this = this;
            var graph = this.getMainGraph();
            var blockDataPorts = this.getSelectedBlockDataPorts();
            var graphDataPorts = this.getSelectedGraphDataPorts();
            var dataPorts = blockDataPorts.concat(graphDataPorts);
            var vpt = this.getViewpoint();
            dataPorts.forEach(function (dataPort) {
                var portType = dataPort.getModel().getType();
                var dataPortBB = dataPort.getBoundingBox(vpt);
                var coord = _this.clientToViewpoint(dataPortBB.left + dataPortBB.width, dataPortBB.top + dataPortBB.height);
                var left = coord[0];
                var top = portType === ModelEnums.EDataPortType.eOutput ? coord[1] : coord[1] - dataPortBB.height;
                graph.createShortcut(dataPort, left, top);
            });
        };
        /**
         * Clears the selection.
         * @public
         */
        UIViewer.prototype.clearSelection = function () {
            this.display.clearSelection();
            this.editor.getTypeLibraryController().updateApplyButtonDisabledState();
        };
        /**
         * Updates the selection with the provided graph selectable elements.
         * @public
         * @param {EGraphCore.Selectable[]} elements - The selectable graph elements.
         * @param {EGraphCore.SelectionMode} [mode=EGraphCore.SelectionMode#REPLACE] - The update mode.
         */
        UIViewer.prototype.updateSelection = function (elements, mode) {
            var filteredElements = this.filterSelection(elements);
            this.display.updateSelection(filteredElements, mode);
            this.contextualBarController.registerSelection(this.getSelection());
            this.editor.getTypeLibraryController().updateApplyButtonDisabledState();
        };
        /**
         * Checks if the element is in the selection.
         * @public
         * @param {EGraphCore.Selectable} element - The selectable graph element.
         * @returns {boolean} True if the element is selected, else false.
         */
        UIViewer.prototype.isSelected = function (element) {
            return this.display.isSelected(element);
        };
        /**
         * Checks if the provided element is selectable.
         * Only blocks, ports and links need to be selectable.
         * @public
         * @param {EGraphCore.Selectable} element - The selectable graph element.
         * @returns {boolean} True if the element is selectable else false.
         */
        // eslint-disable-next-line class-methods-use-this
        UIViewer.prototype.isElementSelectable = function (element) {
            var result = false;
            if (element !== undefined && element.data !== undefined && element.data.uiElement !== undefined) {
                var uiElt = element.data.uiElement;
                if ((uiElt instanceof UINode && uiElt.isSelectable()) || uiElt instanceof UIPort || uiElt instanceof UILink) {
                    result = true;
                }
            }
            return result;
        };
        /**
         * Adds the element to the selection.
         * @public
         * @param {EGraphCore.Selectable} element - The selectable graph element.
         */
        UIViewer.prototype.addToSelection = function (element) {
            if (this.isElementSelectable(element)) {
                this.display.addToSelection(element);
                this.editor.getTypeLibraryController().updateApplyButtonDisabledState();
            }
        };
        /**
         * Removes the element from the selection.
         * @public
         * @param {EGraphCore.Selectable} element - The selectable graph element.
         */
        UIViewer.prototype.removeFromSelection = function (element) {
            this.display.removeFromSelection(element);
            this.editor.getTypeLibraryController().updateApplyButtonDisabledState();
        };
        /**
         * Replaces the selection with the provided graph selectable element
         * if not already selected and brings it to the front if possible.
         * @public
         * @param {EGraphCore.Selectable} element - The selectable graph element.
         */
        UIViewer.prototype.replaceSelection = function (element) {
            if (element !== undefined && element !== null && !this.display.isSelected(element)) {
                this.display.updateLock();
                try {
                    this.display.replaceSelectionWith(element);
                    if (element.bringToFront !== undefined) {
                        element.bringToFront();
                    }
                }
                finally {
                    this.display.updateUnlock();
                    this.takeFocus();
                }
            }
            this.contextualBarController.registerSelection(this.getSelection());
            this.editor.getTypeLibraryController().updateApplyButtonDisabledState();
        };
        /**
         * Gets the selected elements in this viewer.
         * @public
         * @returns {(UINode|UIPort|UILink)[]} The selected nodes, ports and links.
         */
        UIViewer.prototype.getSelection = function () {
            var selection = [];
            var blocks = this.getSelectedBlocks();
            var blockControlPorts = this.getSelectedBlockControlPorts();
            var blockDataPorts = this.getSelectedBlockDataPorts();
            var graphDataPorts = this.getSelectedGraphDataPorts();
            var graphControlPorts = this.getSelectedGraphControlPorts();
            var dataLinks = this.getSelectedDataLinks();
            var controlLinks = this.getSelectedControlLinks();
            var comments = this.getSelectedComments();
            selection = selection.concat(blocks, blockControlPorts, blockDataPorts, graphDataPorts, graphControlPorts, dataLinks, controlLinks, comments);
            return selection;
        };
        /**
         * Gets the list of selected graph and block data ports.
         * @public
         * @returns {UIDataPort[]} The list of selected graph and block data ports.
         */
        UIViewer.prototype.getSelectedDataPorts = function () {
            var graphDataPorts = this.getSelectedGraphDataPorts();
            var blockDataPorts = this.getSelectedBlockDataPorts();
            return graphDataPorts.concat(blockDataPorts);
        };
        /**
         * Gets the list of selected blocks model in this viewer.
         * @public
         * @returns {Block[]} The list of selected blocks model.
         */
        UIViewer.prototype.getSelectedBlocksModel = function () {
            return this.getSelectedBlocks().map(function (block) { return block.getModel(); });
        };
        /**
         * Gets the list of selected blocks in this viewer
         * @public
         * @returns {UIBlock[]} The list of selected blocks.
         */
        UIViewer.prototype.getSelectedBlocks = function () {
            return this.parseSelectedElements([UIBlock]);
        };
        /**
         * Gets the list of selected comments in this viewer.
         * @public
         * @returns {UIComment[]} The list of selected comments.
         */
        UIViewer.prototype.getSelectedComments = function () {
            return this.parseSelectedElements([UIComment]);
        };
        /**
         * Gets the list of selected shortcuts in this viewer.
         * @public
         * @returns {UIShortcut[]} The list of selected shortcuts.
         */
        UIViewer.prototype.getSelectedShortcuts = function () {
            return this.parseSelectedElements([UIShortcut]);
        };
        /**
         * Gets the list of selected graph control ports in this viewer.
         * @public
         * @returns {UIGraphControlPort[]} The list of selected graph control ports.
         */
        UIViewer.prototype.getSelectedGraphControlPorts = function () {
            return this.parseSelectedElements([UIGraphControlPort]);
        };
        /**
         * Gets the list of selected block control ports in this viewer.
         * @public
         * @returns {UIBlockControlPort[]} The list of selected block control ports.
         */
        UIViewer.prototype.getSelectedBlockControlPorts = function () {
            return this.parseSelectedElements([UIBlockControlPort]);
        };
        /**
         * Gets the list of selected graph data ports in this viewer.
         * @public
         * @returns {UIDataPort[]} The list of selected graph data ports.
         */
        UIViewer.prototype.getSelectedGraphDataPorts = function () {
            return this.parseSelectedElements([UIGraphDataPort, UIGraphSubDataPort]);
        };
        /**
         * Gets the list of selected block data ports in this viewer.
         * @public
         * @returns {UIDataPort[]} The list of selected block data ports.
         */
        UIViewer.prototype.getSelectedBlockDataPorts = function () {
            return this.parseSelectedElements([UIBlockDataPort, UIBlockSubDataPort]);
        };
        /**
         * Gets the list of selected data links in this viewer.
         * @public
         * @returns {UIDataLink[]} The list of selected data links.
         */
        UIViewer.prototype.getSelectedDataLinks = function () {
            return this.parseSelectedElements([UIDataLink]);
        };
        /**
         * Gets the list of selected control links in this viewer.
         * @public
         * @returns {UIControlLink[]} The list of selected control links.
         */
        UIViewer.prototype.getSelectedControlLinks = function () {
            return this.parseSelectedElements([UIControlLink]);
        };
        /**
         * Checks if the selection of blocks is consistent.
         * @public
         * @returns {boolean} True if the selection of blocks is consistent else false.
         */
        UIViewer.prototype.areSelectedBlocksConsistent = function () {
            var blocks = this.getSelectedBlocksModel();
            return Tools.areSelectedBlocksConsistent(blocks);
        };
        /**
         * Creates a graph from the selected blocks.
         * @public
         */
        UIViewer.prototype.createGraphFromSelection = function () {
            var options = this.getEditor().getOptions();
            if (!options.hideDefaultGraph) {
                var blocks = this.getSelectedBlocksModel();
                if (Tools.areSelectedBlocksConsistent(blocks)) {
                    Tools.createGraphBlockFromBlocks(blocks);
                }
            }
        };
        /**
         * Creates a CSI graph from the selected blocks.
         * @public
         */
        UIViewer.prototype.createCSIGraphFromSelection = function () {
            var blocks = this.getSelectedBlocksModel();
            if (Tools.areSelectedBlocksConsistent(blocks)) {
                CSITools.createCSIGraphBlockFromBlocks(blocks);
            }
        };
        /**
         * Moves the selected blocks and graph ports in the graph in the desired direction.
         * @public
         * @param {boolean} moveLeft - True to move to the left else false.
         * @param {boolean} moveUp - True to move to the up else false.
         * @param {boolean} moveRight - True to move to the right else false.
         * @param {boolean} moveDown - True to move to the down else false.
         */
        UIViewer.prototype.moveSelection = function (moveLeft, moveUp, moveRight, moveDown) {
            var kGap = 10;
            this.labelController.clearAllLabels();
            this.display.updateLock();
            try {
                // Move selected blocks and shortcuts
                var blocks = this.getSelectedBlocks();
                var shortcuts = this.getSelectedShortcuts();
                var nodes = [].concat(blocks, shortcuts);
                nodes.forEach(function (node) {
                    var pos = node.getPosition();
                    pos.left -= moveLeft ? kGap : 0;
                    pos.left += moveRight ? kGap : 0;
                    pos.top -= moveUp ? kGap : 0;
                    pos.top += moveDown ? kGap : 0;
                    node.setPosition(pos.left, pos.top);
                });
                // Move selected graph ports
                var ports = [];
                if (moveUp || moveDown) {
                    ports = this.getSelectedGraphControlPorts();
                    ports.forEach(function (port) { return port.setOffset(port.getOffset() + (moveUp ? -kGap : kGap)); });
                }
                // Store the move action in the history
                var elements = [].concat(nodes, ports);
                var historyController = this.getEditor().getHistoryController();
                historyController.registerMoveAction(elements);
            }
            finally {
                this.display.updateUnlock();
                var graph = this.getMainGraph();
                graph.updateSizeFromBlocks();
            }
        };
        /**
         * Deletes the selected elements of the main graph.
         * @public
         */
        UIViewer.prototype.deleteSelection = function () {
            this.labelController.clearAllLabels();
            var blocks = [];
            var comments = [];
            var links = [];
            var shortcuts = [];
            var dataPorts = [];
            var controlPorts = [];
            for (var elt = this.display.selection.first; elt; elt = elt.nextSel) {
                var uiElement = elt.data.uiElement;
                if (elt.type === 1 /* NODE */ && uiElement !== undefined) {
                    if (uiElement instanceof UIBlock) {
                        blocks.push(uiElement);
                    }
                    else if (uiElement instanceof UIShortcut) {
                        shortcuts.push(uiElement);
                    }
                    else if (uiElement instanceof UIComment) {
                        comments.push(uiElement);
                    }
                }
                else if (elt.type === 4 /* EDGE */) {
                    links.push(uiElement);
                }
                else if (elt.type === 3 /* CONNECTOR */) {
                    if (uiElement instanceof UIShortcutDataPort) {
                        var shortcut = uiElement.getParent();
                        if (shortcuts.indexOf(shortcut) === -1) {
                            shortcuts.push(shortcut);
                        }
                    }
                    else if (uiElement instanceof UIControlPort) {
                        controlPorts.push(uiElement);
                    }
                    else if (uiElement instanceof UIDataPort) {
                        dataPorts.push(uiElement);
                    }
                }
            }
            if (blocks.length || links.length || controlPorts.length || dataPorts.length || shortcuts.length || comments.length) {
                this.display.updateLock();
                try {
                    var graph = this.getMainGraph();
                    graph.removeLinks(links);
                    graph.removeBlocks(blocks);
                    graph.removeControlPorts(controlPorts);
                    graph.removeDataPorts(dataPorts);
                    graph.removeShortcuts(shortcuts);
                    graph.removeComments(comments);
                }
                finally {
                    this.display.updateUnlock();
                }
                var elements = [].concat(blocks, controlPorts, links, shortcuts, dataPorts, comments);
                this.editor.getHistoryController().registerRemoveAction(elements);
                this.editor.getTypeLibraryController().updateApplyButtonDisabledState();
            }
        };
        /**
         * Takes the focus.
         * @public
         */
        UIViewer.prototype.takeFocus = function () {
            this.container.focus();
        };
        /**
         * Parses the selected elements according to the provided list of constructors.
         * @private
         * @param {Function[]} constructors - The list of constructors.
         * @returns {UINode[]|UIPort[]|UILink[]} The list of selected elements.
         */
        UIViewer.prototype.parseSelectedElements = function (constructors) {
            var elements = [];
            var _loop_1 = function (elt) {
                if (constructors.some(function (constructor) { return elt.data.uiElement instanceof constructor; })) {
                    elements.push(elt.data.uiElement);
                }
            };
            for (var elt = this.display.selection.first; elt; elt = elt.nextSel) {
                _loop_1(elt);
            }
            return elements;
        };
        /**
         * Filters the provided selectable elements to only blocks, ports and links.
         * @private
         * @param {EGraphCore.Selectable[]} elements - The selectable graph elements.
         * @returns {EGraphCore.Selectable[]} The filtered list of selectable blocks, ports or links elements.
         */
        UIViewer.prototype.filterSelection = function (elements) {
            var _this = this;
            var filteredElts = [];
            elements.forEach(function (element) {
                if (_this.isElementSelectable(element)) {
                    filteredElts.push(element);
                }
            });
            return filteredElts;
        };
        /**
         * The callback on the animation viewpoint event.
         * @private
         * @param {EGraphViews.AnimViewpointEvent} event - The animation viewpoint event.
         */
        UIViewer.prototype.onAnimviewpoint = function (event) {
            if (this.mainGraph !== undefined) {
                var vpt = {
                    translationX: event.vpt[0],
                    translationY: event.vpt[1],
                    scale: event.vpt[2]
                };
                this.mainGraph.getToolbar().updatePosition(vpt);
                this.labelController.updateLabels(vpt);
            }
        };
        return UIViewer;
    }(UIEGraphViewer));
    return UIViewer;
});
