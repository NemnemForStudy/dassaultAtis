/// <amd-module name='DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph'/>
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
define("DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph", ["require", "exports", "DS/EPSSchematicsUI/groups/EPSSchematicsUIGroup", "DS/EPSSchematicsUI/groups/views/EPSSchematicsUIGraphView", "DS/EPSSchematicsUI/geometries/EPSSchematicsUIGraphGeometry", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIScriptBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphContainerBlock", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIComment", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataDrawer", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphDataTestDrawer", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphControlButton", "DS/EPSSchematicsUI/tools/EPSSchematicsUIMath", "DS/EPSSchematicsUI/components/EPSSchematicsUISmartSearch", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphEventPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIGraphControlPortView", "DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIJSONConverter", "DS/EPSSchematicsUI/libraries/EPSSchematicsUILocalTemplateLibrary", "DS/EPSSchematicsUI/components/EPSSchematicsUIGraphToolbar", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIShortcut", "DS/EPSSchematicsUI/edges/EPSSchematicsUIControlLink", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIGraphDataPort", "DS/EPSSchematicsUI/controllers/EPSSchematicsUINodeIdSelectorController", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsDataLink", "DS/EPSSchematicsModelWeb/EPSSchematicsControlLink", "DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphContainerBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsUI/connectors/EPSSchematicsUISubDataPort"], function (require, exports, UIGroup, UIGraphView, UIGraphGeometry, UIBlock, UIGraphBlock, UIScriptBlock, UIGraphContainerBlock, UIComment, UIGraphDataDrawer, UIGraphDataTestDrawer, UIGraphControlButton, UIMath, UISmartSearch, UIGraphControlPort, UIGraphEventPort, UIGraphControlPortView, UIDataLink, UITools, UIJSONConverter, UILocalTemplateLibrary, UIGraphToolbar, UIShortcut, UIControlLink, UIShortcutDataPort, UIGraphDataPort, UINodeIdSelectorController, Events, ModelEnums, DataLink, ControlLink, ContainedGraphBlock, ScriptBlock, GraphContainerBlock, EventPort, Tools, TypeLibrary, UILink, DataPort, GraphBlock, UISubDataPort) {
    "use strict";
    /**
     * This class defines a UI graph.
     * @private
     * @class UIGraph
     * @alias module:DS/EPSSchematicsUI/groups/EPSSchematicsUIGraph
     * @extends UIGroup
     */
    var UIGraph = /** @class */ (function (_super) {
        __extends(UIGraph, _super);
        /**
         * @public
         * @constructor
         * @param {UIViewer} viewer - The graph viewer.
         * @param {GraphBlock} model - The graph model.
         * @param {IJSONGraphUI} [modelUI] - The graph model UI.
         */
        function UIGraph(viewer, model, modelUI) {
            var _this = _super.call(this, viewer) || this;
            _this.blocks = [];
            _this.comments = [];
            _this.controlLinks = [];
            _this.dataLinks = [];
            _this.shortcuts = [];
            _this.controlPorts = [];
            _this.dataLinksMinimizerState = false;
            // Analyzer
            _this.graphAnalyserState = false;
            _this.controlWaitingDataBlocks = [];
            _this.dataLoopBlocks = [];
            _this.controlLoopBlocks = [];
            _this.onBlockAddCB = _this._onBlockAdd.bind(_this);
            _this.onBlockRemoveCB = _this._onBlockRemove.bind(_this);
            _this.onDataPortAddCB = _this._onDataPortAdd.bind(_this);
            _this.onDataPortRemoveCB = _this._onDataPortRemove.bind(_this);
            _this.onControlPortAddCB = _this._onControlPortAdd.bind(_this);
            _this.onControlPortRemoveCB = _this._onControlPortRemove.bind(_this);
            _this.onDataLinkAddCB = _this._onDataLinkAdd.bind(_this);
            _this.onDataLinkRemoveCB = _this._onDataLinkRemove.bind(_this);
            _this.onControlLinkAddCB = _this._onControlLinkAdd.bind(_this);
            _this.onControlLinkRemoveCB = _this._onControlLinkRemove.bind(_this);
            _this.kGraphPaddingTop = 70;
            _this.kGraphPaddingBottom = 50;
            _this.kGraphPaddingLeft = 50;
            _this.kGraphPaddingRight = 50;
            _this.model = model;
            _this.setView(new UIGraphView(_this));
            //this.display.geometry = new UIGraphGeometry(0, 0, 800, 400);
            _this.display.set('geometry', new UIGraphGeometry(0, 0, 800, 400));
            _this.inputControlPortButton = new UIGraphControlButton(_this, true);
            _this.outputControlPortButton = new UIGraphControlButton(_this, false);
            _this._nodeIdSelectorController = new UINodeIdSelectorController(_this);
            _this.localTemplateLibrary = new UILocalTemplateLibrary(_this.model.getGraphContext());
            _this.toolbar = _this.createGraphToolBar();
            // Initialize model callbacks
            _this.model.addListener(Events.BlockAddEvent, _this.onBlockAddCB);
            _this.model.addListener(Events.BlockRemoveEvent, _this.onBlockRemoveCB);
            _this.model.addListener(Events.DataPortAddEvent, _this.onDataPortAddCB);
            _this.model.addListener(Events.DataPortRemoveEvent, _this.onDataPortRemoveCB);
            _this.model.addListener(Events.ControlPortAddEvent, _this.onControlPortAddCB);
            _this.model.addListener(Events.ControlPortRemoveEvent, _this.onControlPortRemoveCB);
            _this.model.addListener(Events.DataLinkAddEvent, _this.onDataLinkAddCB);
            _this.model.addListener(Events.DataLinkRemoveEvent, _this.onDataLinkRemoveCB);
            _this.model.addListener(Events.ControlLinkAddEvent, _this.onControlLinkAddCB);
            _this.model.addListener(Events.ControlLinkRemoveEvent, _this.onControlLinkRemoveCB);
            // Initialize drawers
            _this.inputDataDrawer = new UIGraphDataDrawer(_this, ModelEnums.EDataPortType.eInput);
            _this.outputDataDrawer = new UIGraphDataDrawer(_this, ModelEnums.EDataPortType.eOutput);
            _this.inputLocalDataDrawer = new UIGraphDataDrawer(_this, ModelEnums.EDataPortType.eLocal, true);
            var options = _this.viewer.getEditor().getOptions();
            if (!options.hideOutputLocalDataDrawer) {
                _this.outputLocalDataDrawer = new UIGraphDataDrawer(_this, ModelEnums.EDataPortType.eLocal, false);
            }
            var isTestEditorEnabled = options.tabViewMode !== undefined && options.tabViewMode.testEditor !== undefined;
            if (isTestEditorEnabled && _this.model.graph === undefined && !(_this.model instanceof ContainedGraphBlock)) { // Test drawers only available on root graph!
                _this.inputDataTestDrawer = new UIGraphDataTestDrawer(_this, ModelEnums.EDataPortType.eInput);
                _this.outputDataTestDrawer = new UIGraphDataTestDrawer(_this, ModelEnums.EDataPortType.eOutput);
            }
            // Add the graph node to the graph view
            _this.viewer.getDisplay().updateLock();
            try {
                _this.viewer.getDisplay().addNode(_this.display);
            }
            finally {
                _this.viewer.getDisplay().updateUnlock();
            }
            _this._buildFromModel();
            if (modelUI !== undefined) {
                _this.fromJSON(modelUI);
            }
            var alwaysMinimizeDataLink = _this.getEditor().getLocalStorageController().getAlwaysMinimizeDataLinksSetting();
            _this.setDataLinksMinimizerState(alwaysMinimizeDataLink);
            return _this;
        }
        /**
         * Removes the graph.
         * @public
         */
        UIGraph.prototype.remove = function () {
            this.viewer.getDisplay().updateLock();
            try {
                this._nodeIdSelectorController.remove();
                this.inputControlPortButton.remove();
                this.outputControlPortButton.remove();
                this.removeComments(this.comments);
                this._removeBlockView();
                this.removeSmartSearch();
                this._removeAllDataLinks();
                this._removeAllControlLinks();
                this._removeAllBlocks();
                this._removeAllControlPorts();
                if (this.inputDataDrawer !== undefined) {
                    this.inputDataDrawer.remove();
                }
                if (this.outputDataDrawer !== undefined) {
                    this.outputDataDrawer.remove();
                }
                if (this.inputLocalDataDrawer !== undefined) {
                    this.inputLocalDataDrawer.remove();
                }
                if (this.outputLocalDataDrawer !== undefined) {
                    this.outputLocalDataDrawer.remove();
                }
                if (this.inputDataTestDrawer !== undefined) {
                    this.inputDataTestDrawer.remove();
                }
                if (this.outputDataTestDrawer !== undefined) {
                    this.outputDataTestDrawer.remove();
                }
                this.removeGraphToolbar();
                this.model.removeListener(Events.BlockAddEvent, this.onBlockAddCB);
                this.model.removeListener(Events.BlockRemoveEvent, this.onBlockRemoveCB);
                this.model.removeListener(Events.DataPortAddEvent, this.onDataPortAddCB);
                this.model.removeListener(Events.DataPortRemoveEvent, this.onDataPortRemoveCB);
                this.model.removeListener(Events.ControlPortAddEvent, this.onControlPortAddCB);
                this.model.removeListener(Events.ControlPortRemoveEvent, this.onControlPortRemoveCB);
                this.model.removeListener(Events.DataLinkAddEvent, this.onDataLinkAddCB);
                this.model.removeListener(Events.DataLinkRemoveEvent, this.onDataLinkRemoveCB);
                this.model.removeListener(Events.ControlLinkAddEvent, this.onControlLinkAddCB);
                this.model.removeListener(Events.ControlLinkRemoveEvent, this.onControlLinkRemoveCB);
                this.viewer.getDisplay().removeNode(this.display);
            }
            finally {
                this.viewer.getDisplay().updateUnlock();
            }
            this.model = undefined;
            this.blocks = undefined;
            this.comments = undefined;
            this.controlLinks = undefined;
            this.dataLinks = undefined;
            this.shortcuts = undefined;
            this.controlPorts = undefined;
            this._nodeIdSelectorController = undefined;
            this.inputDataDrawer = undefined;
            this.outputDataDrawer = undefined;
            this.inputLocalDataDrawer = undefined;
            this.outputLocalDataDrawer = undefined;
            this.inputDataTestDrawer = undefined;
            this.outputDataTestDrawer = undefined;
            this.inputControlPortButton = undefined;
            this.outputControlPortButton = undefined;
            this.localTemplateLibrary = undefined;
            this.smartSearch = undefined;
            this.blockView = undefined;
            this.graphContext = undefined;
            this.dataLinksMinimizerState = undefined;
            this.toolbar = undefined;
            this.graphAnalyserState = undefined;
            this.controlWaitingDataBlocks = undefined;
            this.dataLoopBlocks = undefined;
            this.controlLoopBlocks = undefined;
            this.onBlockAddCB = undefined;
            this.onBlockRemoveCB = undefined;
            this.onDataPortAddCB = undefined;
            this.onDataPortRemoveCB = undefined;
            this.onControlPortAddCB = undefined;
            this.onControlPortRemoveCB = undefined;
            this.onDataLinkAddCB = undefined;
            this.onDataLinkRemoveCB = undefined;
            this.onControlLinkAddCB = undefined;
            this.onControlLinkRemoveCB = undefined;
            _super.prototype.remove.call(this);
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                   _     ___    _    ____        __   ____    ___     _______                   //
        //                  | |   / _ \  / \  |  _ \      / /  / ___|  / \ \   / / ____|                  //
        //                  | |  | | | |/ _ \ | | | |    / /   \___ \ / _ \ \ / /|  _|                    //
        //                  | |__| |_| / ___ \| |_| |   / /     ___) / ___ \ V / | |___                   //
        //                  |_____\___/_/   \_\____/   /_/     |____/_/   \_\_/  |_____|                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Builds the graph from the provided model.
         * @private
         */
        UIGraph.prototype._buildFromModel = function () {
            var _this = this;
            var blocksModel = this.model.getBlocks();
            var controlPortsModel = this.model.getControlPorts();
            var dataPortsModel = this.model.getDataPorts();
            var dataLinksModel = this.model.getDataLinks();
            var controlLinksModel = this.model.getControlLinks();
            var nodeIdSelectorsModel = this.model.getNodeIdSelectors();
            blocksModel.forEach(function (model) { return _this.createBlockFromModel(model); });
            controlPortsModel.forEach(function (model) { return _this._createControlPortFromModel(model); });
            dataPortsModel.forEach(function (model) { return _this._createDataPortFromModel(model); });
            dataLinksModel.forEach(function (model) { return _this.createDataLinkFromModel(model); });
            controlLinksModel.forEach(function (model) { return _this.createControlLinkFromModel(model); });
            nodeIdSelectorsModel.forEach(function (model) { return _this._nodeIdSelectorController.createNodeIdSelectorNodeModel(model); });
        };
        /**
         * Saves a graph to json object.
         * @public
         * @returns {IJSONGraphWithUI} The json object representing the graph.
         */
        UIGraph.prototype.save = function () {
            var jsonObject = {};
            jsonObject.version = Tools.version;
            jsonObject.model = {};
            this.model.toJSON(jsonObject.model);
            jsonObject.ui = {};
            this.toJSON(jsonObject.ui);
            if (this.getGraphContext() === this) {
                this.localTemplateLibrary.toJSON(jsonObject);
                jsonObject.types = {};
                jsonObject.types.model = {};
                TypeLibrary.toLocalCustomJSON(this.model, jsonObject.types.model);
            }
            return jsonObject;
        };
        /**
         * Loads a graph from a json object.
         * @public
         * @param {IJSONGraphWithUI} iJSONGraph - The json object reprensenting the graph.
         */
        UIGraph.prototype.load = function (iJSONGraph) {
            this.removeComments(this.comments);
            if (this.inputDataTestDrawer !== undefined) {
                this.inputDataTestDrawer.resetTestValues();
            }
            if (this.outputDataTestDrawer !== undefined) {
                this.outputDataTestDrawer.resetTestValues();
            }
            UIJSONConverter.convertGraph(iJSONGraph);
            if (this.getGraphContext() === this) {
                if (iJSONGraph.types !== undefined) {
                    TypeLibrary.fromLocalCustomJSON(this.model, iJSONGraph.types.model);
                }
                this.localTemplateLibrary.fromJSON(iJSONGraph);
            }
            this.model.fromJSON(iJSONGraph.model);
            this.fromJSON(iJSONGraph.ui);
        };
        /**
         * Loads the provided blocks into the graph.
         * @public
         * @param {IJSONBlockCopyPaste[]} blocks - The list of blocks.
         */
        UIGraph.prototype.loadBlocks = function (blocks) {
            var _this = this;
            if (Array.isArray(blocks) && blocks.length > 0) {
                blocks.forEach(function (block) {
                    var position = _this.getAvailableBlockPosition(block.ui.top, block.ui.left);
                    block.ui.top = position.top;
                    block.ui.left = position.left;
                    var blockUI = _this.createBlock(block.model.definition.uid, block.ui.left, block.ui.top);
                    blockUI.load(block.model, block.ui);
                });
            }
        };
        /**
         * Projects the graph from the provided JSON.
         * TODO: Only public for CSI execution graph access! Find a better solution!
         * @public
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype.fromJSON = function (iJSONGraph) {
            if (iJSONGraph !== undefined) {
                this.viewer.getDisplay().updateLock();
                try {
                    if (iJSONGraph.graphLeft !== undefined) {
                        this.setLeft(iJSONGraph.graphLeft);
                    }
                    if (iJSONGraph.graphTop !== undefined) {
                        this.setTop(iJSONGraph.graphTop);
                    }
                    if (iJSONGraph.width !== undefined) {
                        this.setWidth(iJSONGraph.width);
                    }
                    if (iJSONGraph.height !== undefined) {
                        this.setHeight(iJSONGraph.height);
                    }
                    if (this.shortcuts.length > 0) {
                        this.removeShortcuts(this.shortcuts.slice(), true);
                    }
                    this._fromJSONBlocks(iJSONGraph);
                    this.fromJSONDataPorts(iJSONGraph);
                    this._fromJSONControlPorts(iJSONGraph);
                    this._fromJSONShortcuts(iJSONGraph);
                    this._fromJSONDataLinks(iJSONGraph);
                    this._fromJSONControlLinks(iJSONGraph);
                    this._nodeIdSelectorController.fromJSON(iJSONGraph);
                    this._fromJSONComments(iJSONGraph);
                }
                finally {
                    this.viewer.getDisplay().updateUnlock();
                }
            }
            else {
                this.viewer.getDisplay().updateLock();
                try {
                    this.setDefaultBlocksPosition();
                    this.unexposeAllDrawerSubDataPorts();
                }
                finally {
                    this.viewer.getDisplay().updateUnlock();
                    this.updateSizeFromBlocks();
                }
            }
        };
        /**
         * Projects the blocks from the provided JSON.
         * @private
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype._fromJSONBlocks = function (iJSONGraph) {
            if (iJSONGraph.blocks !== undefined) {
                this.blocks.forEach(function (block, index) { return block.fromJSON(iJSONGraph.blocks[index]); });
            }
        };
        /**
         * Projects the comments from the provided JSON.
         * @private
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype._fromJSONComments = function (iJSONGraph) {
            var _this = this;
            if (iJSONGraph.comments !== undefined) {
                iJSONGraph.comments.forEach(function (jsonComment) { return _this.createComment(0, 0, jsonComment, false, false); });
            }
        };
        /**
         * Projects the control links from the provided JSON.
         * @private
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype._fromJSONControlLinks = function (iJSONGraph) {
            if (iJSONGraph.controlLinks !== undefined) {
                this.controlLinks.forEach(function (controlLink, index) { return controlLink.fromJSON(iJSONGraph.controlLinks[index]); });
            }
        };
        /**
         * Projects the control ports from the provided JSON.
         * @private
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype._fromJSONControlPorts = function (iJSONGraph) {
            if (iJSONGraph.controlPorts !== undefined) {
                this.controlPorts.forEach(function (controlPort, index) { return controlPort.fromJSON(iJSONGraph.controlPorts[index]); });
            }
        };
        /**
         * Projects the data links from the provided JSON.
         * @private
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype._fromJSONDataLinks = function (iJSONGraph) {
            var _this = this;
            if (iJSONGraph.dataLinks !== undefined) {
                this.dataLinks.forEach(function (dataLink, index) { return dataLink.fromJSON(iJSONGraph.dataLinks[index]); });
                iJSONGraph.dataLinks.forEach(function (jsonLink, index) {
                    if (jsonLink.shortcut !== undefined) {
                        var startPort = void 0, endPort = void 0;
                        var dataLink = _this.dataLinks[index];
                        if (jsonLink.shortcut.startPort !== undefined) {
                            var shortcut = _this.getObjectFromPath(jsonLink.shortcut.startPort);
                            startPort = shortcut.getShortcutDataPort();
                            endPort = dataLink.getEndPort();
                        }
                        if (jsonLink.shortcut.endPort !== undefined) {
                            var shortcut = _this.getObjectFromPath(jsonLink.shortcut.endPort);
                            startPort = dataLink.getStartPort();
                            endPort = shortcut.getShortcutDataPort();
                        }
                        _this.rerouteUIDataLink(dataLink, startPort, endPort);
                    }
                });
            }
        };
        /**
         * Projects the data ports from the provided JSON.
         * @public
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype.fromJSONDataPorts = function (iJSONGraph) {
            var _this = this;
            if (iJSONGraph.dataPorts !== undefined) {
                this.model.getDataPorts().forEach(function (dataPortModel, index) {
                    var dataPortJSON = iJSONGraph.dataPorts[index];
                    if (dataPortJSON !== undefined) {
                        if (dataPortModel.getType() !== ModelEnums.EDataPortType.eLocal) {
                            var dataPortUI = _this.getUIDataPortFromModel(dataPortModel);
                            dataPortUI.fromJSON(dataPortJSON);
                        }
                        else {
                            var localJSONDataPorts = dataPortJSON.dataPorts;
                            if (localJSONDataPorts !== undefined) {
                                var inLocalJSON_1 = { dataPorts: [] };
                                var outLocalJSON_1 = { dataPorts: [] };
                                localJSONDataPorts.forEach(function (localJSONDataPort) {
                                    inLocalJSON_1.dataPorts.push({ localInput: localJSONDataPort.localInput });
                                    outLocalJSON_1.dataPorts.push({ localOutput: localJSONDataPort.localOutput });
                                });
                                var inLocalDataPortUI = _this.getUIDataPortFromModel(dataPortModel, true);
                                inLocalDataPortUI.fromJSON(inLocalJSON_1);
                                var options = _this.viewer.getEditor().getOptions();
                                if (!options.hideOutputLocalDataDrawer) {
                                    var outLocalDataPortUI = _this.getUIDataPortFromModel(dataPortModel, false);
                                    outLocalDataPortUI.fromJSON(outLocalJSON_1);
                                }
                            }
                        }
                    }
                });
            }
        };
        /**
         * Projects the shortcuts from the provided JSON.
         * @private
         * @param {IJSONGraphUI} iJSONGraph - The JSON graph.
         */
        UIGraph.prototype._fromJSONShortcuts = function (iJSONGraph) {
            var _this = this;
            if (iJSONGraph.shortcuts !== undefined) {
                iJSONGraph.shortcuts.forEach(function (shortcut) {
                    var dataPortUI;
                    var dataPortModel = _this.model.getObjectFromPath(shortcut.port);
                    if (dataPortModel.block instanceof GraphBlock && dataPortModel.block === _this.model) {
                        var isInputLocal = shortcut.shortcutType === 0 /* eStartPort */;
                        if (dataPortModel.dataPort !== undefined) { // Manage shortcut on sub data ports
                            var parentDataPortUI = _this.getUIDataPortFromModel(dataPortModel.dataPort, isInputLocal);
                            dataPortUI = parentDataPortUI.getUISubDataPortFromModel(dataPortModel);
                        }
                        else {
                            dataPortUI = _this.getUIDataPortFromModel(dataPortModel, isInputLocal);
                        }
                    }
                    else {
                        if (dataPortModel.dataPort !== undefined) { // Manage shortcut on sub data ports
                            var blockUI = _this.getUIBlockFromModel(dataPortModel.block);
                            var parentDataPortUI = blockUI.getUIDataPortFromModel(dataPortModel.dataPort);
                            dataPortUI = parentDataPortUI.getUISubDataPortFromModel(dataPortModel);
                        }
                        else {
                            dataPortUI = _this.getObjectFromPath(shortcut.port);
                        }
                    }
                    var shortcutUI = _this.createShortcut(dataPortUI, shortcut.left, shortcut.top, shortcut.shortcutType);
                    shortcutUI.fromJSON(shortcut);
                });
            }
        };
        /**
         * Projects the graph into the provided JSON.
         * @public
         * @param {IJSONGraphUI} oJSONGraph - The JSON graph.
         */
        UIGraph.prototype.toJSON = function (oJSONGraph) {
            var _this = this;
            oJSONGraph.graphLeft = this.display.actualLeft;
            oJSONGraph.graphTop = this.display.actualTop;
            oJSONGraph.width = this.display.actualWidth;
            oJSONGraph.height = this.display.actualHeight;
            oJSONGraph.blocks = [];
            oJSONGraph.dataPorts = [];
            oJSONGraph.controlPorts = [];
            oJSONGraph.dataLinks = [];
            oJSONGraph.controlLinks = [];
            oJSONGraph.shortcuts = [];
            this.blocks.forEach(function (block) {
                var oJSONBlock = {};
                block.toJSON(oJSONBlock);
                oJSONGraph.blocks.push(oJSONBlock);
            });
            var hideOutputLocalDataDrawer = this.getEditor().getOptions().hideOutputLocalDataDrawer;
            this.model.getDataPorts().forEach(function (dataPort) {
                var oJSONDataPort = {};
                if (dataPort.getType() !== ModelEnums.EDataPortType.eLocal) {
                    var dataPortUI = _this.getUIDataPortFromModel(dataPort);
                    dataPortUI.toJSON(oJSONDataPort);
                }
                else {
                    var oJSONInputDataPort = {};
                    var inputLocalDataPortUI = _this.getUIDataPortFromModel(dataPort, true);
                    inputLocalDataPortUI.toJSON(oJSONInputDataPort);
                    oJSONDataPort.dataPorts = [];
                    oJSONInputDataPort.dataPorts.forEach(function (localDataPort) {
                        oJSONDataPort.dataPorts.push({
                            localInput: localDataPort.localInput,
                            localOutput: !hideOutputLocalDataDrawer ? localDataPort.localOutput : undefined
                        });
                    });
                }
                oJSONGraph.dataPorts.push(oJSONDataPort);
            });
            this.controlPorts.forEach(function (controlPort) {
                var oJSONControlPort = {};
                controlPort.toJSON(oJSONControlPort);
                oJSONGraph.controlPorts.push(oJSONControlPort);
            });
            this.shortcuts.forEach(function (shortcut) {
                var oJSONShortcut = {};
                shortcut.toJSON(oJSONShortcut);
                oJSONGraph.shortcuts.push(oJSONShortcut);
            });
            this.dataLinks.forEach(function (dataLink) {
                var oJSONDataLink = {};
                dataLink.toJSON(oJSONDataLink);
                oJSONGraph.dataLinks.push(oJSONDataLink);
            });
            this.controlLinks.forEach(function (controlLink) {
                var oJSONControlLink = {};
                controlLink.toJSON(oJSONControlLink);
                oJSONGraph.controlLinks.push(oJSONControlLink);
            });
            this._nodeIdSelectorController.toJSON(oJSONGraph);
            if (this.comments.length) {
                oJSONGraph.comments = [];
            }
            this.comments.forEach(function (comment) {
                var oJSONComment = {};
                comment.toJSON(oJSONComment);
                oJSONGraph.comments.push(oJSONComment);
            });
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //     __  __  ___  ____  _____ _        ____    _    _     _     ____    _    ____ _  ______     //
        //    |  \/  |/ _ \|  _ \| ____| |      / ___|  / \  | |   | |   | __ )  / \  / ___| |/ / ___|    //
        //    | |\/| | | | | | | |  _| | |     | |     / _ \ | |   | |   |  _ \ / _ \| |   | ' /\___ \    //
        //    | |  | | |_| | |_| | |___| |___  | |___ / ___ \| |___| |___| |_) / ___ \ |___| . \ ___) |   //
        //    |_|  |_|\___/|____/|_____|_____|  \____/_/   \_\_____|_____|____/_/   \_\____|_|\_\____/    //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * The callback on the model change event.
         * @public
         */
        UIGraph.prototype.onModelChange = function () {
            this.editor.onChange();
        };
        /**
         * The callback on the UI change event.
         * @public
         */
        UIGraph.prototype.onUIChange = function () {
            if (this.editor !== undefined) {
                this.editor.onChange();
            }
        };
        /**
         * The callback on the model block add event.
         * @private
         * @param {Events.BlockAddEvent} event - The model block add event.
         */
        UIGraph.prototype._onBlockAdd = function (event) {
            this.createBlockFromModel(event.getBlock());
            this.onModelChange();
            this.analyze();
        };
        /**
         * The callback on the model block remove event.
         * @private
         * @param {Events.BlockRemoveEvent} event - The model block remove event.
         */
        UIGraph.prototype._onBlockRemove = function (event) {
            this._removeBlockAtIndex(event.getIndex());
            this.onModelChange();
            this.editor.getBreakpointController().sendBreakpointList();
            this.analyze();
        };
        /**
         * The callback on the model control port add event.
         * @private
         * @param {Events.ControlPortAddEvent} event - The model control port add event.
         */
        UIGraph.prototype._onControlPortAdd = function (event) {
            this._createControlPortFromModel(event.getControlPort());
            this.onModelChange();
        };
        /**
         * The callback on the model control port remove event.
         * @private
         * @param {Events.ControlPortRemoveEvent} event - The model control port remove event.
         */
        UIGraph.prototype._onControlPortRemove = function (event) {
            this.removeControlPortAtIndex(event.getIndex());
            this.onModelChange();
        };
        /**
         * The callback on the model data port add event.
         * @private
         * @param {Events.DataPortAddEvent} event - The model data port add event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIGraph.prototype._onDataPortAdd = function (event) {
            this.onModelChange();
        };
        /**
         * The callback on the model data port remove event.
         * @private
         * @param {Events.DataPortRemoveEvent} event - The model data port remove event.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        UIGraph.prototype._onDataPortRemove = function (event) {
            this.onModelChange();
        };
        /**
         * The callback on the model control link add event.
         * @private
         * @param {Events.ControlLinkAddEvent} event - The model control link add event.
         */
        UIGraph.prototype._onControlLinkAdd = function (event) {
            var controlLink = this.createControlLinkFromModel(event.getControlLink());
            this.viewer.replaceSelection(controlLink.getDisplay());
            this.onModelChange();
            this.analyze();
        };
        /**
         * The callback on the model control link remove event.
         * @private
         * @param {Events.ControlLinkRemoveEvent} event - The model control link remove event.
         */
        UIGraph.prototype._onControlLinkRemove = function (event) {
            this._removeControlLinkAtIndex(event.getIndex());
            this.onModelChange();
            this.analyze();
        };
        /**
         * The callback on the model data link add event.
         * @private
         * @param {Events.DataLinkAddEvent} event - The model data link add event.
         */
        UIGraph.prototype._onDataLinkAdd = function (event) {
            var dataLink = this.createDataLinkFromModel(event.getDataLink());
            this.viewer.replaceSelection(dataLink.getDisplay());
            this.onModelChange();
            this.analyze();
        };
        /**
         * The callback on the model data link remove event.
         * @private
         * @param {Events.DataLinkRemoveEvent} event - The model data link remove event.
         */
        UIGraph.prototype._onDataLinkRemove = function (event) {
            this._removeDataLinkAtIndex(event.getIndex());
            this.onModelChange();
            this.analyze();
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //   ____ _____ _____ _____ _____ ____  ____       __  ____  _____ _____ _____ _____ ____  ____   //
        //  / ___| ____|_   _|_   _| ____|  _ \/ ___|     / / / ___|| ____|_   _|_   _| ____|  _ \/ ___|  //
        // | |  _|  _|   | |   | | |  _| | |_) \___ \    / /  \___ \|  _|   | |   | | |  _| | |_) \___ \  //
        // | |_| | |___  | |   | | | |___|  _ < ___) |  / /    ___) | |___  | |   | | | |___|  _ < ___) | //
        //  \____|_____| |_|   |_| |_____|_| \_\____/  /_/    |____/|_____| |_|   |_| |_____|_| \_\____/  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the viewer.
         * @returns {UIViewer} The viewer.
         */
        UIGraph.prototype.getViewer = function () {
            return _super.prototype.getViewer.call(this);
        };
        /**
         * Gets the list of blocks.
         * @public
         * @returns {UIBlock[]} The list of blocks.
         */
        UIGraph.prototype.getBlocks = function () {
            return this.blocks;
        };
        /**
         * Gets the graph comments.
         * @public
         * @returns {UIComment[]} The graph comments.
         */
        UIGraph.prototype.getComments = function () {
            return this.comments;
        };
        /**
         * Gets the graph control links.
         * @public
         * @returns {UIControlLink[]} The graph control links.
         */
        UIGraph.prototype.getControlLinks = function () {
            return this.controlLinks;
        };
        /**
         * Gets the graph data links.
         * @public
         * @returns {UIDataLink[]} The graph data links.
         */
        UIGraph.prototype.getDataLinks = function () {
            return this.dataLinks;
        };
        /**
         * Gets the graph control ports.
         * @public
         * @returns {UIGraphControlPort[]} The graph control ports.
         */
        UIGraph.prototype.getControlPorts = function () {
            return this.controlPorts;
        };
        /**
         * Gets the input data drawer.
         * @public
         * @returns {UIGraphDataDrawer} The input data drawer.
         */
        UIGraph.prototype.getInputDataDrawer = function () {
            return this.inputDataDrawer;
        };
        /**
         * Gets the output data drawer.
         * @public
         * @returns {UIGraphDataDrawer} The output data drawer.
         */
        UIGraph.prototype.getOutputDataDrawer = function () {
            return this.outputDataDrawer;
        };
        /**
         * Gets the input local data drawer.
         * @public
         * @returns {UIGraphDataDrawer} The input local data drawer.
         */
        UIGraph.prototype.getInputLocalDataDrawer = function () {
            return this.inputLocalDataDrawer;
        };
        /**
         * Gets the output local data drawer.
         * @public
         * @returns {UIGraphDataDrawer} The output local data drawer.
         */
        UIGraph.prototype.getOutputLocalDataDrawer = function () {
            return this.outputLocalDataDrawer;
        };
        /**
         * Gets the input data test drawer.
         * @public
         * @returns {UIGraphDataTestDrawer} The input data test drawer.
         */
        UIGraph.prototype.getInputDataTestDrawer = function () {
            return this.inputDataTestDrawer;
        };
        /**
         * Gets the output data test drawer.
         * @public
         * @returns {UIGraphDataTestDrawer} The output data test drawer.
         */
        UIGraph.prototype.getOutputDataTestDrawer = function () {
            return this.outputDataTestDrawer;
        };
        /**
         * Gets the graph block model.
         * @public
         * @returns {GraphBlock} The graph block model.
         */
        UIGraph.prototype.getModel = function () {
            return this.model;
        };
        /**
         * Gets the smart search.
         * @public
         * @returns {UISmartSearch} The graph smart Search.
         */
        UIGraph.prototype.getSmartSearch = function () {
            return this.smartSearch;
        };
        /**
         * Gets the graph toolbar.
         * @public
         * @returns {UIGraphToolbar} The graph toolbar.
         */
        UIGraph.prototype.getToolbar = function () {
            return this.toolbar;
        };
        /**
         * Gets the list of shortcuts.
         * @public
         * @returns {UIShortcut[]} The list of shortcuts;
         */
        UIGraph.prototype.getShortcuts = function () {
            return this.shortcuts;
        };
        /**
         * Gets the local template library.
         * @public
         * @returns {UILocalTemplateLibrary} The local template library.
         */
        UIGraph.prototype.getLocalTemplateLibrary = function () {
            return this.localTemplateLibrary;
        };
        /**
         * Gets the input control port button.
         * @public
         * @returns {UIGraphControlButton} The input control port button.
         */
        UIGraph.prototype.getInputControlPortButton = function () {
            return this.inputControlPortButton;
        };
        /**
         * Gets the output control port button.
         * @public
         * @returns {UIGraphControlButton} The input output port button.
         */
        UIGraph.prototype.getOutputControlPortButton = function () {
            return this.outputControlPortButton;
        };
        /**
         * Gets the graph padding top value.
         * @public
         * @returns {number} The graph padding top value.
         */
        UIGraph.prototype.getPaddingTop = function () {
            return this.kGraphPaddingTop;
        };
        /**
         * Gets the graph padding bottom value.
         * @public
         * @returns {number} The graph padding bottom value.
         */
        UIGraph.prototype.getPaddingBottom = function () {
            return this.kGraphPaddingBottom;
        };
        /**
         * Gets the graph padding left value.
         * @public
         * @returns {number} The graph padding left value.
         */
        UIGraph.prototype.getPaddingLeft = function () {
            return this.kGraphPaddingLeft;
        };
        /**
         * Gets the graph padding right value.
         * @public
         * @returns {number} The graph padding right value.
         */
        UIGraph.prototype.getPaddingRight = function () {
            return this.kGraphPaddingRight;
        };
        /**
         * Gets the graph view.
         * @public
         * @returns {UIGraphView} The graph view.
         */
        UIGraph.prototype.getView = function () {
            return this.display.views.main;
        };
        /**
         * Gets the graph view element.
         * @public
         * @returns {SVGElement} The graph view element.
         */
        UIGraph.prototype.getElement = function () {
            return this.getView().getContainer();
        };
        /**
         * Gets the graph data drawer of the provided port type.
         * @public
         * @param {ModelEnums.EDataPortType} portType - The data port type
         * @param {boolean} [isInputLocal] - True for input local data port else false.
         * @returns {UIGraphDataDrawer} The graph data drawer.
         */
        UIGraph.prototype.getDataDrawer = function (portType, isInputLocal) {
            var drawer;
            if (portType === ModelEnums.EDataPortType.eInput) {
                drawer = this.inputDataDrawer;
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                drawer = this.outputDataDrawer;
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                drawer = isInputLocal ? this.inputLocalDataDrawer : this.outputLocalDataDrawer;
            }
            return drawer;
        };
        /**
         * Gets the graph context.
         * @public
         * @returns {UIGraph} The UI graph context.
         */
        UIGraph.prototype.getGraphContext = function () {
            return this.graphContext !== undefined ? this.graphContext : this.getRootGraph();
        };
        /**
         * Sets the graph context.
         * @public
         * @param {UIGraph} graphContext - The UI graph context.
         */
        UIGraph.prototype.setGraphContext = function (graphContext) {
            this.graphContext = graphContext;
        };
        /**
         * Gets the data links minimizer state.
         * @public
         * @returns {boolean} The data links minimizer state.
         */
        UIGraph.prototype.getDataLinksMinimizerState = function () {
            return this.dataLinksMinimizerState;
        };
        /**
         * Sets the data links minimizer state.
         * @public
         * @param {boolean} state - The data links minimizer state.
         */
        UIGraph.prototype.setDataLinksMinimizerState = function (state) {
            var _this = this;
            this.dataLinksMinimizerState = state;
            this.viewer.getDisplay().updateLock();
            try {
                this.dataLinks.forEach(function (dataLink) { return dataLink.getView().updateMinimizedLinkState(_this.dataLinksMinimizerState); });
            }
            finally {
                this.viewer.getDisplay().updateUnlock();
            }
            var graphDataLinkMinimizerButton = this.getToolbar().getGraphDataLinkMinimizerButton();
            if (graphDataLinkMinimizerButton) { // Button could be hidden via editor options!
                graphDataLinkMinimizerButton.setCheckedState(state);
            }
        };
        /**
         * Gets the nodeId selector controller.
         * @public
         * @returns {UINodeIdSelectorController} The nodeId selector controller.
         */
        UIGraph.prototype.getNodeIdSelectorController = function () {
            return this._nodeIdSelectorController;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                       _____ ____   ___  __  __      ____   _  _____ _   _                      //
        //                      |  ___|  _ \ / _ \|  \/  |    |  _ \ / \|_   _| | | |                     //
        //                      | |_  | |_) | | | | |\/| |    | |_) / _ \ | | | |_| |                     //
        //                      |  _| |  _ <| |_| | |  | |    |  __/ ___ \| | |  _  |                     //
        //                      |_|   |_| \_\\___/|_|  |_|    |_| /_/   \_\_| |_| |_|                     //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the object corresponding to the given path.
         * @public
         * @param {string} path - The path of the object to find in the graph.
         * @returns {UIGraph|UIBlock|UIPort|UILink|UIShortcut} The UI object corresponding to the given path.
         */
        UIGraph.prototype.getObjectFromPath = function (path) {
            var object = this;
            var elements = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
            for (var e = 1; e < elements.length; e++) {
                var property = elements[e];
                if (object instanceof UIBlock) {
                    if (property === 'controlPorts') {
                        object = object.getUIControlPorts()[elements[++e]];
                    }
                    else if (property === 'dataPorts') {
                        object = object.getUIDataPorts()[elements[++e]];
                    }
                    else {
                        object = undefined;
                    }
                }
                else {
                    object = object[property];
                }
                if (object === undefined) {
                    break;
                }
                else if (object instanceof UIGraphBlock && object.getGraphView() !== undefined) {
                    object = object.getGraphView();
                }
            }
            return object;
        };
        /**
         * Opens the graph block from the provided path.
         * @public
         * @param {string} path - The graph block path to open.
         */
        UIGraph.prototype.openGraphBlockFromPath = function (path) {
            this.editor.getViewerController().removeAllViewers();
            var object = this;
            var elements = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
            for (var e = 1; e < elements.length; e++) {
                var property = elements[e];
                object = object[property];
                if (Array.isArray(object)) {
                    continue;
                }
                else if (object instanceof UIGraphBlock) {
                    if (object.getGraphView() === undefined) {
                        object.openGraphBlockViewer();
                    }
                    object = object.getGraphView();
                }
                else if (object instanceof UIGraphContainerBlock && elements[e + 1] === 'containedGraph') {
                    var graphContainerViewer = object.openGraphContainerViewer();
                    object = graphContainerViewer.getMainGraph();
                    e++;
                }
                else {
                    break;
                }
            }
        };
        /**
         * Gets the outside control port from the given path.
         * @public
         * @param {string} path - The path of the outside control port.
         * @returns {UIBlockControlPort} The outside control port.
         */
        UIGraph.prototype.getOutsideControlPortFromPath = function (path) {
            var controlPort = this.getObjectFromPath(path);
            if (controlPort instanceof UIGraphControlPort) { // If graph view is opened
                var graphBlockUI = controlPort.getParent().getBlockView();
                controlPort = graphBlockUI !== undefined ? graphBlockUI.getUIControlPortFromModel(controlPort.getModel()) : undefined;
            }
            return controlPort;
        };
        /**
         * Gets the inside control port from the given path.
         * @public
         * @param {string} path - The path of the inside control port.
         * @returns {UIGraphControlPort} The inside control port.
         */
        UIGraph.prototype.getInsideControlPortFromPath = function (path) {
            var controlPort = this.getObjectFromPath(path);
            return controlPort instanceof UIGraphControlPort ? controlPort : undefined;
        };
        /**
         * Gets the outside data port from the given path.
         * @public
         * @param {string} path - The path of the outside data port.
         * @returns {UIBlockDataPort} The outside data port.
         */
        UIGraph.prototype.getOutsideDataPortFromPath = function (path) {
            var dataPort;
            var dataPortModel = this.model.getObjectFromPath(path);
            var parentUI = this.getObjectFromPath(dataPortModel.block.toPath());
            if (parentUI !== undefined) {
                if (parentUI instanceof UIGraph && parentUI.getBlockView() !== undefined) {
                    parentUI = parentUI.getBlockView();
                }
                dataPort = parentUI.getUIDataPortFromModel(dataPortModel);
            }
            return dataPort;
        };
        /**
         * Gets the inside data port from the given path.
         * @public
         * @param {string} path - The path of the inside data port.
         * @returns {UIGraphDataPort} The inside data port.
         */
        UIGraph.prototype.getInsideDataPortFromPath = function (path) {
            var dataPort;
            var dataPortModel = this.model.getObjectFromPath(path);
            var parentUI = this.getObjectFromPath(dataPortModel.block.toPath());
            if (parentUI instanceof UIGraph) {
                dataPort = parentUI.getUIDataPortFromModel(dataPortModel);
            }
            return dataPort;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                              ____ ____  _____    _  _____ _____                                //
        //                             / ___|  _ \| ____|  / \|_   _| ____|                               //
        //                            | |   | |_) |  _|   / _ \ | | |  _|                                 //
        //                            | |___|  _ <| |___ / ___ \| | | |___                                //
        //                             \____|_| \_\_____/_/   \_\_| |_____|                               //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Creates a block in the graph.
         * @public
         * @param {string} uid - The uid of the block definition.
         * @param {number} left - The left position of the block in the graph.
         * @param {number} top - The top position of the block in the graph.
         * @returns {UIBlock} The created block.
         */
        UIGraph.prototype.createBlock = function (uid, left, top) {
            var block;
            if (this.model.createBlock(uid) !== undefined) {
                block = this.blocks[this.blocks.length - 1];
                block.setPosition(left, top);
                this.updateSizeFromBlocks();
                this.getViewer().replaceSelection(block.getDisplay());
                this.editor.getHistoryController().registerCreateAction(block);
            }
            return block;
        };
        /**
         * Creates a block in the middle of the graph.
         * @public
         * @param {string} uid - The uid of the block definition.
         * @returns {UIBlock} The created block.
         */
        UIGraph.prototype.createBlockInMiddle = function (uid) {
            var middleViewpointPosition = this.getViewer().getMiddleViewpointPosition();
            var block = this.createBlock(uid, middleViewpointPosition.left, middleViewpointPosition.top);
            block.setPosition(middleViewpointPosition.left - block.getWidth() / 2, middleViewpointPosition.top - block.getHeight() / 2);
            return block;
        };
        /**
         * Creates the block from the provided model.
         * @private
         * @param {Block} blockModel - The block model.
         */
        UIGraph.prototype.createBlockFromModel = function (blockModel) {
            var lastPosition = { left: 0, top: 0 };
            if (this.blocks.length > 0) {
                lastPosition = this.blocks[this.blocks.length - 1].getPosition();
            }
            var position = this.getAvailableBlockPosition(lastPosition.top, lastPosition.left);
            var block;
            if (blockModel instanceof GraphBlock) {
                block = new UIGraphBlock(this, blockModel, position.left, position.top);
            }
            else if (blockModel instanceof ScriptBlock) {
                block = new UIScriptBlock(this, blockModel, position.left, position.top);
            }
            else if (blockModel instanceof GraphContainerBlock) {
                block = new UIGraphContainerBlock(this, blockModel, position.left, position.top);
            }
            else {
                block = new UIBlock(this, blockModel, position.left, position.top);
            }
            this.blocks.push(block);
            block.addNodeToGraph();
            block.computeWidth();
            block.computeHeight();
        };
        /**
         * Creates a comment.
         * @public
         * @param {number} [left] - The left position of the comment.
         * @param {number} [top] - The top position of the comment.
         * @param {IJSONCommentUI} [jsonComment] - The JSON comment configuration.
         * @param {boolean} [registerHistory=true] - True to register the create action in history, false otherwise.
         * @param {boolean} [updateGraphSize=true] - True to update the graph size from the created comment node.
         * @returns {UIComment} The created comment.
         */
        UIGraph.prototype.createComment = function (left, top, jsonComment, registerHistory, updateGraphSize) {
            if (registerHistory === void 0) { registerHistory = true; }
            if (updateGraphSize === void 0) { updateGraphSize = true; }
            var doCenterLeft = left === undefined;
            var doCenterTop = top === undefined;
            left = left || 0;
            top = top || 0;
            var comment = new UIComment(this, left, top);
            if (jsonComment !== undefined) {
                comment.fromJSON(jsonComment);
            }
            else if (doCenterLeft || doCenterTop) {
                var middlePosition = this.viewer.getMiddleViewpointPosition();
                // TODO: Apply directly the Math.round into the UINode class (Impact for block?)
                comment.setPosition(Math.round(middlePosition.left - comment.getWidth() / 2), Math.round(middlePosition.top - comment.getHeight() / 2));
            }
            comment.addNodeToGraph();
            this.comments.push(comment);
            if (updateGraphSize) {
                this.updateSizeFromBlocks();
            }
            if (registerHistory) {
                this.editor.getHistoryController().registerCreateAction(comment);
            }
            this.onUIChange();
            return comment;
        };
        /**
         * Creates the control link from the specified model.
         * @protected
         * @param {ControlLink} controlLinkModel - The control link model.
         * @returns {UIControlLink} The UI control link.
         */
        UIGraph.prototype.createControlLinkFromModel = function (controlLinkModel) {
            var controlLink = new UIControlLink(this, controlLinkModel);
            var startPortModel = controlLinkModel.getStartPort();
            var startBlockModel = startPortModel.block;
            var startBlock = startBlockModel === this.model ? this : this.getUIBlockFromModel(startBlockModel);
            var startPort = startBlock.getUIControlPortFromModel(startPortModel);
            controlLink.setStartPort(startPort);
            var endPortModel = controlLinkModel.getEndPort();
            var endBlockModel = endPortModel.block;
            var endBlock = endBlockModel === this.model ? this : this.getUIBlockFromModel(endBlockModel);
            var endPort = endBlock.getUIControlPortFromModel(endPortModel);
            controlLink.setEndPort(endPort);
            this.viewer.getDisplay().addEdge(startPort.getDisplay(), endPort.getDisplay(), controlLink.getDisplay());
            this.controlLinks.push(controlLink);
            return controlLink;
        };
        /**
         * Creates the data link from the specified model.
         * @protected
         * @param {DataLink} dataLinkModel - The data link model.
         * @returns {UIDataLink} The UI data link.
         */
        UIGraph.prototype.createDataLinkFromModel = function (dataLinkModel) {
            var dataLink = new UIDataLink(this, dataLinkModel);
            var shortcutPorts = this._getShortcutPorts(dataLinkModel);
            var startPort = shortcutPorts.startPort ? shortcutPorts.startPort : this._findDataPort(dataLinkModel, true);
            dataLink.setStartPort(startPort);
            var endPort = shortcutPorts.endPort ? shortcutPorts.endPort : this._findDataPort(dataLinkModel, false);
            dataLink.setEndPort(endPort);
            this.viewer.getDisplay().addEdge(startPort.getDisplay(), endPort.getDisplay(), dataLink.getDisplay());
            this.dataLinks.push(dataLink);
            // Refreshes the persistent labels
            var startPortLabel = startPort.getPersistentLabel();
            if (startPortLabel) {
                startPortLabel.getView().refreshLabelDisplay();
            }
            var endPortLabel = endPort.getPersistentLabel();
            if (endPortLabel) {
                endPortLabel.getView().refreshLabelDisplay();
            }
            return dataLink;
        };
        /**
         * Creates a graph control port from the specified type and name.
         * @public
         * @param {ModelEnums.EControlPortType} type - The control port type.
         * @param {string} [name] - The name of the control port.
         * @returns {UIGraphControlPort} The created graph control port.
         */
        UIGraph.prototype.createControlPort = function (type, name) {
            var controlPort;
            if (this.model.createDynamicControlPort(type, name) !== undefined) {
                controlPort = this.controlPorts[this.controlPorts.length - 1];
                this.getViewer().replaceSelection(controlPort.getDisplay());
                this.editor.getHistoryController().registerCreateAction(controlPort);
            }
            return controlPort;
        };
        /**
         * Creates the graph control port from the specified model.
         * @private
         * @param {ControlPort} controlPortModel - The control port model.
         * @returns {UIGraphControlPort} The created graph control port.
         */
        UIGraph.prototype._createControlPortFromModel = function (controlPortModel) {
            var offset = this._getMaxPortOffset(controlPortModel.isStartPort(this.model));
            var GraphControlPortCtr = controlPortModel instanceof EventPort ? UIGraphEventPort : UIGraphControlPort;
            var controlPort = new GraphControlPortCtr(this, controlPortModel, offset);
            this.controlPorts.push(controlPort);
            this.display.appendConnector(controlPort.getDisplay());
            return controlPort;
        };
        /**
         * Creates a graph data port into the corresponding drawer from the specified model.
         * @private
         * @param {DataPort} dataPortModel - The data port model.
         * @returns {UIGraphDataPort} - The graph data port.
         */
        UIGraph.prototype._createDataPortFromModel = function (dataPortModel) {
            var dataPort;
            var portType = dataPortModel.getType();
            if (portType === ModelEnums.EDataPortType.eInput) {
                dataPort = this.inputDataDrawer.createUIDataPort(dataPortModel);
                if (this.inputDataTestDrawer !== undefined) {
                    dataPort = this.inputDataTestDrawer.createUIDataPort(dataPortModel);
                }
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                dataPort = this.outputDataDrawer.createUIDataPort(dataPortModel);
                if (this.outputDataTestDrawer !== undefined) {
                    dataPort = this.outputDataTestDrawer.createUIDataPort(dataPortModel);
                }
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                dataPort = this.inputLocalDataDrawer.createUIDataPort(dataPortModel);
                var options = this.viewer.getEditor().getOptions();
                if (!options.hideOutputLocalDataDrawer) {
                    dataPort = this.outputLocalDataDrawer.createUIDataPort(dataPortModel);
                }
            }
            return dataPort;
        };
        /**
         * Creates the smart search.
         * @public
         * @param {number} left - The left position of the smart search.
         * @param {number} top - The top position of the smart search.
         * @param {number} blockLeft - The left position of the block.
         * @param {number} blockTop - The top position of the block.
         */
        UIGraph.prototype.createSmartSearch = function (left, top, blockLeft, blockTop) {
            this.smartSearch = new UISmartSearch(this, left, top, blockLeft, blockTop);
        };
        /**
         * Creates a shortcut.
         * @public
         * @param {UIDataPort} dataPortUI - The data port reference.
         * @param {number} left - The left position of the shortcut.
         * @param {number} top - The top position of the shortcut.
         * @param {UIEnums.EShortcutType} [shortcutType] - The type of shortcut.
         * @returns {UIShortcut} The UI Shortcut.
         */
        UIGraph.prototype.createShortcut = function (dataPortUI, left, top, shortcutType) {
            var shortcut = new UIShortcut(this, dataPortUI, left, top, shortcutType);
            shortcut.addNodeToGraph();
            this.shortcuts.push(shortcut);
            return shortcut;
        };
        /**
         * Creates the graph toolbar.
         * @protected
         * @returns {UIGraphToolbar} The graph toolbar.
         */
        UIGraph.prototype.createGraphToolBar = function () {
            return new UIGraphToolbar(this);
        };
        UIGraph.prototype.removeGraphToolbar = function () {
            if (this.toolbar !== undefined) {
                this.toolbar.remove();
                this.toolbar = undefined;
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _____ __  __  _____     _______                              //
        //                            |  _ \| ____|  \/  |/ _ \ \   / / ____|                             //
        //                            | |_) |  _| | |\/| | | | \ \ / /|  _|                               //
        //                            |  _ <| |___| |  | | |_| |\ V / | |___                              //
        //                            |_| \_\_____|_|  |_|\___/  \_/  |_____|                             //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes all the persistent label from the graph.
         * @public
         */
        UIGraph.prototype.removeAllPersitentLabels = function () {
            var _a, _b, _c, _d;
            var dataPorts = [];
            Array.prototype.push.apply(dataPorts, (_a = this.inputDataDrawer) === null || _a === void 0 ? void 0 : _a.getUIDataPorts(true));
            Array.prototype.push.apply(dataPorts, (_b = this.outputDataDrawer) === null || _b === void 0 ? void 0 : _b.getUIDataPorts(true));
            Array.prototype.push.apply(dataPorts, (_c = this.inputLocalDataDrawer) === null || _c === void 0 ? void 0 : _c.getUIDataPorts(true));
            Array.prototype.push.apply(dataPorts, (_d = this.outputLocalDataDrawer) === null || _d === void 0 ? void 0 : _d.getUIDataPorts(true));
            this.blocks.forEach(function (block) { return Array.prototype.push.apply(dataPorts, block.getUIDataPorts(undefined, true)); });
            dataPorts.forEach(function (dataPort) { return dataPort.removePersistentLabel(); });
        };
        /**
         * Removes a comment from the graph.
         * @public
         * @param {UIComment} comment - The comment to remove.
         */
        UIGraph.prototype.removeComment = function (comment) {
            var index = this.comments.indexOf(comment);
            if (index !== -1) {
                comment.remove();
                this.comments.splice(index, 1);
                this.onUIChange();
            }
        };
        /**
         * Removes an array of comments from the graph.
         * @public
         * @param {UIComment[]} comments - The array of comments to remove.
         */
        UIGraph.prototype.removeComments = function (comments) {
            var _this = this;
            comments.forEach(function (comment) { return _this.removeComment(comment); });
        };
        /**
         * Removes a link from the graph.
         * @public
         * @param {UILink} link - The link to remove.
         * @returns {boolean} True if the link has been removed else false.
         */
        UIGraph.prototype.removeLink = function (link) {
            var result = false;
            var linkModel = link === null || link === void 0 ? void 0 : link.getModel();
            if (linkModel instanceof DataLink) {
                result = this.model.removeDataLink(linkModel);
            }
            else if (linkModel instanceof ControlLink) {
                result = this.model.removeControlLink(linkModel);
            }
            return result;
        };
        /**
         * Removes a list of links from the graph.
         * @public
         * @param {UILink[]} links - The list of links to remove.
         */
        UIGraph.prototype.removeLinks = function (links) {
            var _this = this;
            links.forEach(function (link) { return _this.removeLink(link); });
        };
        /**
         * Removes the provided block from the graph.
         * @public
         * @param {UIBlock} block - The block to remove.
         */
        UIGraph.prototype.removeBlock = function (block) {
            this.model.removeBlock(block.getModel());
        };
        /**
         * Removes a list of blocks from the graph.
         * @public
         * @param {UIBlock[]} blocks - The list of block to remove.
         */
        UIGraph.prototype.removeBlocks = function (blocks) {
            var _this = this;
            blocks.forEach(function (block) { return _this.removeBlock(block); });
        };
        /**
         * Removes the provided control port from its parent.
         * Removing a control port that doesn't belong to that graph is handled.
         * @private
         * @param {UIControlPort} controlPort - The control port to remove.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraph.prototype._removeControlPort = function (controlPort) {
            var parent = controlPort.getParent();
            if (parent) {
                parent.getModel().removeControlPort(controlPort.getModel());
            }
        };
        /**
         * Removes a list of control ports.
         * Removing a control port that doesn't belong to that graph is handled.
         * @public
         * @param {UIControlPort[]} controlPorts - The list of control ports to remove.
         */
        UIGraph.prototype.removeControlPorts = function (controlPorts) {
            var _this = this;
            controlPorts.forEach(function (controlPort) { return _this._removeControlPort(controlPort); });
        };
        /**
         * Removes the provided data port from its parent.
         * Removing a data port that doesn't belong to that graph is handled.
         * @private
         * @param {UIDataPort} dataPort - The data port to remove.
         */
        UIGraph.prototype._removeDataPort = function (dataPort) {
            if (dataPort) {
                if (dataPort.getModel().isOptional()) {
                    dataPort.setExposedState(false);
                    this.getEditor().getHistoryController().registerHideOptionalDataPortAction();
                }
                else {
                    var isSubDataPort = dataPort instanceof UISubDataPort;
                    var parent_1 = isSubDataPort ? dataPort.getParentPort() : dataPort.getParent();
                    if (parent_1) {
                        parent_1.getModel().removeDataPort(dataPort.getModel());
                    }
                }
            }
        };
        /**
         * Removes a list of data ports.
         * Removing a data port that doesn't belong to that graph is handled.
         * public
         * @param {UIDataPort[]} dataPorts - The list of data ports to remove.
         */
        UIGraph.prototype.removeDataPorts = function (dataPorts) {
            var _this = this;
            dataPorts.forEach(function (dataPort) { return _this._removeDataPort(dataPort); });
        };
        /**
         * Removes the block at specified index.
         * @private
         * @param {number} index - The index of the block to remove.
         */
        UIGraph.prototype._removeBlockAtIndex = function (index) {
            if (index < this.blocks.length) {
                var block = this.blocks[index];
                block.remove();
                this.blocks.splice(index, 1);
            }
        };
        /**
         * Removes the control link at specified index.
         * @private
         * @param {number} index - The index of the control link to remove.
         */
        UIGraph.prototype._removeControlLinkAtIndex = function (index) {
            if (index < this.controlLinks.length) {
                var controlLink = this.controlLinks[index];
                this.controlLinks.splice(index, 1);
                controlLink.remove();
            }
        };
        /**
         * Removes the data link at specified index.
         * @private
         * @param {number} index - The index of the data link to remove.
         */
        UIGraph.prototype._removeDataLinkAtIndex = function (index) {
            if (index < this.dataLinks.length) {
                var dataLink = this.dataLinks[index];
                var startPort = dataLink.getStartPort();
                var endPort = dataLink.getEndPort();
                this.dataLinks.splice(index, 1);
                dataLink.remove();
                // Refreshes the display of the persistent labels
                var startPortLabel = startPort.getPersistentLabel();
                if (startPortLabel) {
                    startPortLabel.getView().refreshLabelDisplay();
                }
                var endPortLabel = endPort.getPersistentLabel();
                if (endPortLabel) {
                    endPortLabel.getView().refreshLabelDisplay();
                }
            }
        };
        /**
         * Removes the control port at specified index.
         * @public
         * @param {number} index - The index of the control port to remove.
         */
        UIGraph.prototype.removeControlPortAtIndex = function (index) {
            if (index < this.controlPorts.length) {
                var controlPort = this.controlPorts[index];
                this.controlPorts.splice(index, 1);
                controlPort.remove();
            }
        };
        /**
         * Removes all the blocks from the graph.
         * @private
         */
        UIGraph.prototype._removeAllBlocks = function () {
            while (this.blocks.length > 0) {
                this._removeBlockAtIndex(0);
            }
        };
        /**
         * Removes all the control links from the graph.
         * @private
         */
        UIGraph.prototype._removeAllControlLinks = function () {
            while (this.controlLinks.length > 0) {
                this._removeControlLinkAtIndex(0);
            }
        };
        /**
         * Removes all the data links from the graph.
         * @private
         */
        UIGraph.prototype._removeAllDataLinks = function () {
            while (this.dataLinks.length > 0) {
                this._removeDataLinkAtIndex(0);
            }
        };
        /**
         * Removes all the control ports from the graph.
         * @private
         */
        UIGraph.prototype._removeAllControlPorts = function () {
            while (this.controlPorts.length > 0) {
                this.removeControlPortAtIndex(0);
            }
        };
        /**
         * Removes the smart search.
         * @public
         */
        UIGraph.prototype.removeSmartSearch = function () {
            if (this.smartSearch !== undefined) {
                this.smartSearch.remove();
                this.smartSearch = undefined;
            }
        };
        /**
         * Removes a shortcut from the graph.
         * @public
         * @param {UIShortcut} shortcut - The shortcut to remove.
         * @param {boolean} [rerouteLinks=false] - True to retoute links on ref, default is false.
         */
        UIGraph.prototype.removeShortcut = function (shortcut, rerouteLinks) {
            if (rerouteLinks === void 0) { rerouteLinks = false; }
            var index = this.shortcuts.indexOf(shortcut);
            if (index !== -1) {
                shortcut.remove(rerouteLinks);
                this.shortcuts.splice(index, 1);
            }
        };
        /**
         * Removes a list of shortcuts.
         * @public
         * @param {UIShortcut[]} shortcuts - The list of shortcuts to remove.
         * @param {boolean} [rerouteLinks=false] - True to retoute links on ref, default is false.
         */
        UIGraph.prototype.removeShortcuts = function (shortcuts, rerouteLinks) {
            var _this = this;
            if (rerouteLinks === void 0) { rerouteLinks = false; }
            shortcuts.forEach(function (shortcut) { return _this.removeShortcut(shortcut, rerouteLinks); });
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           _   _ _____ _     ____  _____ ____  ____                             //
        //                          | | | | ____| |   |  _ \| ____|  _ \/ ___|                            //
        //                          | |_| |  _| | |   | |_) |  _| | |_) \___ \                            //
        //                          |  _  | |___| |___|  __/| |___|  _ < ___) |                           //
        //                          |_| |_|_____|_____|_|   |_____|_| \_\____/                            //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the maximum offset position available among the specified list of ports.
         * @private
         * @param {boolean} startPort - True for start port, false for end port.
         * @returns {number} the maximum offset position for the port.
         */
        UIGraph.prototype._getMaxPortOffset = function (startPort) {
            var _this = this;
            var maxOffset = this.getPaddingTop();
            this.controlPorts.forEach(function (controlPort) {
                if (controlPort.getModel().isStartPort(_this.model) === startPort) {
                    var offset = controlPort.getDisplay().offset;
                    if (offset > maxOffset) {
                        maxOffset = offset;
                    }
                }
            });
            return maxOffset + 30;
        };
        /**
         * Gets the UI block from the provided block model.
         * @public
         * @param {Block} blockModel - The block model.
         * @returns {UIBlock} The UI block.
         */
        UIGraph.prototype.getUIBlockFromModel = function (blockModel) {
            return this.blocks.find(function (block) { return block.getModel() === blockModel; });
        };
        /**
         * Gets the UI control port from the provided control port model.
         * @public
         * @param {ControlPort} controlPortModel - The control port model.
         * @returns {UIControlPort} The UI control port.
         */
        UIGraph.prototype.getUIControlPortFromModel = function (controlPortModel) {
            return this.controlPorts.find(function (controlPort) { return controlPort.getModel() === controlPortModel; });
        };
        /**
         * Gets the UI data port from the provided data port model.
         * @public
         * @param {DataPort} dataPortModel - The data port model.
         * @param {boolean} [isInputLocal] - True for input local data port, else false.
         * @returns {UIDataPort} The UI data port.
         */
        UIGraph.prototype.getUIDataPortFromModel = function (dataPortModel, isInputLocal) {
            var ports = this.getDataDrawer(dataPortModel.getType(), isInputLocal).getUIDataPorts(true);
            return ports.find(function (port) { return port.getModel() === dataPortModel; });
        };
        /**
         * Find the UI data port connected to the provided link model.
         * @private
         * @param {DataLink} dataLinkModel - The data link model.
         * @param {boolean} isStartPort - True for the start port, false for the end port.
         * @returns {UIDataPort} The found UI data port.
         */
        UIGraph.prototype._findDataPort = function (dataLinkModel, isStartPort) {
            var port;
            var portModel = isStartPort ? dataLinkModel.getStartPort() : dataLinkModel.getEndPort();
            var blockModel = portModel.block;
            var block;
            if (blockModel === this.model) {
                var portType = portModel.getType();
                if (isStartPort) {
                    block = portType === ModelEnums.EDataPortType.eInput ? this.inputDataDrawer : this.inputLocalDataDrawer;
                }
                else {
                    block = portType === ModelEnums.EDataPortType.eOutput ? this.outputDataDrawer : this.outputLocalDataDrawer;
                }
            }
            else {
                block = this.getUIBlockFromModel(blockModel);
            }
            port = block.getUIDataPortFromModel(portModel);
            if (port === undefined) {
                if (portModel.isOptional()) { // Expose optional data port so data links can be created!
                    port = block.getUIDataPortFromModel(portModel, true, true);
                    port.setExposedState(true);
                }
                else if (portModel.dataPort !== undefined) { // Fixing incremental build issue where subDataPort is reused on model only (exposed inside subgraph but not outside).
                    var parentPort = block.getUIDataPortFromModel(portModel.dataPort);
                    port = parentPort.createUIBlockSubDataPort(portModel, portModel.getIndex());
                }
            }
            return port;
        };
        /**
         * Gets the shortcuts start and end ports from the data link model.
         * @private
         * @param {DataLink} dataLinkModel - The data link model.
         * @returns {Object} The start and end shortcut ports.
         */
        UIGraph.prototype._getShortcutPorts = function (dataLinkModel) {
            var shortcutPorts = {};
            var tempEdge = this._getTemporaryEdge(dataLinkModel);
            if (tempEdge !== undefined) {
                var startPort = tempEdge.cl1.c.data.uiElement;
                var endPort = tempEdge.cl2.c.data.uiElement;
                if (startPort instanceof UIShortcutDataPort) {
                    if (dataLinkModel.getStartPort() === startPort.getModel()) {
                        shortcutPorts.startPort = startPort;
                    }
                    else if (dataLinkModel.getEndPort() === startPort.getModel()) {
                        shortcutPorts.endPort = startPort;
                    }
                }
                if (endPort instanceof UIShortcutDataPort) {
                    if (dataLinkModel.getStartPort() === endPort.getModel()) {
                        shortcutPorts.startPort = endPort;
                    }
                    else if (dataLinkModel.getEndPort() === endPort.getModel()) {
                        shortcutPorts.endPort = endPort;
                    }
                }
            }
            return shortcutPorts;
        };
        /**
         * Gets the temporary edge corresponding to the data link model.
         * @private
         * @param {DataLink} dataLinkModel - The data link model.
         * @returns {EGraphCore.Edge} The temporary edge.
         */
        UIGraph.prototype._getTemporaryEdge = function (dataLinkModel) {
            var tempEdge;
            var edges = this.viewer.getDisplay().edges;
            for (var edge = edges.first; edge; edge = edge.next) {
                var linkUI = edge.data.uiElement;
                if (linkUI instanceof UILink) {
                    var linkModel = linkUI.getModel();
                    if (linkModel.getStartPort() === undefined && linkModel.getEndPort() === undefined) {
                        var startPort = edge.cl1.c.data.uiElement;
                        var endPort = edge.cl2.c.data.uiElement;
                        if ((startPort.getModel() === dataLinkModel.getStartPort() && endPort.getModel() === dataLinkModel.getEndPort()) ||
                            (startPort.getModel() === dataLinkModel.getEndPort() && endPort.getModel() === dataLinkModel.getStartPort())) {
                            tempEdge = edge;
                            break;
                        }
                    }
                }
            }
            return tempEdge;
        };
        /**
         * Gets the control links bounding box.
         * @public
         * @param {boolean} fixedPath - True to limit the bounding box to fixed paths segment only else false.
         * @returns {EGraphUtils.BoundingRect} The control links bounding box.
         */
        UIGraph.prototype.getControlLinkBounds = function (fixedPath) {
            var bounds = {};
            if (this.controlLinks.length > 0) {
                bounds = this.controlLinks[0].getBoundingBox(fixedPath);
                this.controlLinks.forEach(function (controlLink) {
                    var bb = controlLink.getBoundingBox(fixedPath);
                    bounds.xmin = UIMath.getMin(bb.xmin, bounds.xmin);
                    bounds.xmax = UIMath.getMax(bb.xmax, bounds.xmax);
                    bounds.ymin = UIMath.getMin(bb.ymin, bounds.ymin);
                    bounds.ymax = UIMath.getMax(bb.ymax, bounds.ymax);
                });
            }
            return bounds;
        };
        /**
         * Gets the control port minimum and maximum bounds top position.
         * @public
         * @returns {Object} The control port minimum and maximum bounds top position.
         */
        UIGraph.prototype.getControlPortBounds = function () {
            var bounds = {};
            if (this.controlPorts.length > 0) {
                bounds.ymin = this.controlPorts[0].getTop();
                bounds.ymax = this.controlPorts[0].getTop() + UIGraphControlPortView.kPortHeight;
                this.controlPorts.forEach(function (controlPort) {
                    var min = controlPort.getTop();
                    var max = controlPort.getTop() + UIGraphControlPortView.kPortHeight;
                    bounds.ymin = min < bounds.ymin ? min : bounds.ymin;
                    bounds.ymax = max > bounds.ymax ? max : bounds.ymax;
                });
            }
            return bounds;
        };
        /**
         * Gets the minimum width of the graph width from the data drawers width.
         * @public
         * @returns {number} The minimum width of the graph.
         */
        UIGraph.prototype.getMinimumGraphWidthFromDrawers = function () {
            var inputWidth = this.inputDataDrawer !== undefined ? this.inputDataDrawer.getWidth() : 0;
            var outputWidth = this.outputDataDrawer !== undefined ? this.outputDataDrawer.getWidth() : 0;
            var localInputWidth = this.inputLocalDataDrawer !== undefined ? this.inputLocalDataDrawer.getWidth() : 0;
            var localOutputWidth = this.outputLocalDataDrawer !== undefined ? this.outputLocalDataDrawer.getWidth() : 0;
            var topWidth = this.getPaddingLeft() + localInputWidth + inputWidth + this.getPaddingRight();
            var bottomWidth = this.getPaddingRight() + outputWidth + localOutputWidth + this.getPaddingLeft();
            return topWidth > bottomWidth ? topWidth : bottomWidth;
        };
        /**
         * Gets the maximum width of the specified graph control ports.
         * @public
         * @param {ModelEnums.EControlPortType} [portType] - The control port type.
         * @returns {number} The control port maximum width.
         */
        UIGraph.prototype.getControlPortsMaxWidth = function (portType) {
            return Math.max.apply(Math, this.controlPorts.filter(function (controlPort) { return portType !== undefined ? controlPort.getModel().getType() === portType : true; }).map(function (controlPort) { return controlPort.getView().getBoundingBox().width; }));
        };
        /**
         * Gets the root graph of the graph.
         * @public
         * @returns {UIGraph} The root graph.
         */
        UIGraph.prototype.getRootGraph = function () {
            var root = this;
            while (root.blockView !== undefined) {
                root = root.blockView.getGraph();
            }
            return root;
        };
        /**
         * Reroutes an UI Data Link by deleting the link and creating a new one at same index.
         * @public
         * @param {UIDataLink} dataLink - The UI Data Link to reroute.
         * @param {UIDataPort} startPort - The UI start port of the new link.
         * @param {UIDataPort} endPort - The UI end port of the new link.
         * @returns {UIDataLink} The rerouted new data link.
         */
        UIGraph.prototype.rerouteUIDataLink = function (dataLink, startPort, endPort) {
            var index = this.dataLinks.indexOf(dataLink);
            var model = dataLink.getModel();
            this._removeDataLinkAtIndex(index);
            var newDataLink = new UIDataLink(this, model);
            newDataLink.setStartPort(startPort);
            newDataLink.setEndPort(endPort);
            this.viewer.getDisplay().addEdge(startPort.getDisplay(), endPort.getDisplay(), newDataLink.getDisplay());
            this.dataLinks.splice(index, 0, newDataLink);
            return newDataLink;
        };
        /**
         * Set a default block position for each block in the graph.
         * @public
         */
        UIGraph.prototype.setDefaultBlocksPosition = function () {
            var _this = this;
            var startBlocks = [];
            this.blocks.forEach(function (block) {
                var predecessors = Tools.getFirstControlPredecessors(block.getModel(), true, false);
                if (predecessors.length === 0 || predecessors.indexOf(_this.model) !== -1) {
                    startBlocks.push(block);
                }
            });
            var xSpace = 50, ySpace = 50;
            var processedBlock = [];
            var setLinePositions = function (block, posX, posY) {
                var _this = this;
                processedBlock.push(block);
                block.setPosition(posX, posY);
                var successors = Tools.getFirstControlSuccessors(block.getModel(), true, false);
                var newPosX = posX + block.getWidth() + xSpace;
                var newPosY = posY;
                successors.forEach(function (successor) {
                    var successorUI = _this.getUIBlockFromModel(successor);
                    if (processedBlock.indexOf(successorUI) === -1) {
                        newPosY = setLinePositions.call(_this, successorUI, newPosX, newPosY);
                        newPosY = newPosY + ySpace;
                    }
                });
                posY = Math.max(posY + block.getHeight(), newPosY - ySpace);
                return posY;
            };
            var startPosX = 60, startPosY = 50;
            startBlocks.forEach(function (block) { startPosY = setLinePositions.call(_this, block, startPosX, startPosY) + ySpace; });
            this.blocks.forEach(function (block) {
                if (processedBlock.indexOf(block) === -1) {
                    startPosY = setLinePositions.call(_this, block, startPosX, startPosY) + ySpace;
                }
            });
            this.updateSizeFromBlocks();
        };
        /**
         * Gets the next available block's position related to another block's position.
         * @public
         * @param {number} top - The top position of the block in the graph.
         * @param {number} left - The left position of the block in the graph.
         * @returns {IDomPosition} The next available top and left position.
         */
        UIGraph.prototype.getAvailableBlockPosition = function (top, left) {
            var nextTop = top, nextLeft = left, found = true, offset = 20;
            if (this.blocks.length > 0) {
                nextTop += offset;
                nextLeft += offset;
                while (found) {
                    for (var i = 0; i < this.blocks.length; i++) {
                        var position = this.blocks[i].getPosition();
                        if (position.top === nextTop && position.left === nextLeft) {
                            nextTop += offset;
                            nextLeft += offset;
                            found = true;
                            break;
                        }
                        else {
                            found = false;
                        }
                    }
                }
            }
            return { top: nextTop, left: nextLeft };
        };
        /**
         * Updates the graph size when the control ports position exceed the graph borders.
         * @public
         * @returns {boolean} True if the graph size has been updated else false.
         */
        UIGraph.prototype.updateSizeFromControlPorts = function () {
            var updated = false;
            if (this.controlPorts.length > 0) {
                var offsetMin = this.controlPorts[0].getOffset();
                var offsetMax = this.controlPorts[0].getOffset();
                for (var cp = 1; cp < this.controlPorts.length; cp++) {
                    var offset = this.controlPorts[cp].getOffset();
                    offsetMax = offset > offsetMax ? offset : offsetMax;
                    offsetMin = offset < offsetMin ? offset : offsetMin;
                }
                var geometry = this.display.geometry;
                if (offsetMax + UIGraphControlPortView.kPortHeight > geometry.height - this.getPaddingBottom()) {
                    this.display.setPath(['geometry', 'height'], offsetMax + UIGraphControlPortView.kPortHeight + this.getPaddingBottom());
                    updated = true;
                }
                if (offsetMin < this.getPaddingTop()) {
                    var diff_1 = this.getPaddingTop() - offsetMin;
                    this.viewer.getDisplay().updateLock();
                    try {
                        this.display.multiset(['geometry', 'top'], geometry.top - diff_1, ['geometry', 'height'], geometry.height + diff_1);
                        this.controlPorts.forEach(function (controlPort) { return controlPort.setOffset(controlPort.getOffset() + diff_1); });
                    }
                    finally {
                        this.viewer.getDisplay().updateUnlock();
                    }
                    updated = true;
                }
            }
            return updated;
        };
        /**
         * Updates the graph size according to the data drawers width.
         * @public
         */
        UIGraph.prototype.updateSizeFromDataDrawers = function () {
            var minWidth = this.getMinimumGraphWidthFromDrawers();
            var geometry = this.display.geometry;
            if (geometry.width < minWidth) {
                this.display.setPath(['geometry', 'width'], minWidth);
            }
            else {
                this.getView().updateDataDrawersPosition();
            }
        };
        /**
         * Unexpose all drawer sub data ports.
         * @public
         */
        UIGraph.prototype.unexposeAllDrawerSubDataPorts = function () {
            if (this.inputDataDrawer !== undefined) {
                this.inputDataDrawer.unexposeAllUISubDataPorts();
            }
            if (this.outputDataDrawer !== undefined) {
                this.outputDataDrawer.unexposeAllUISubDataPorts();
            }
            if (this.inputLocalDataDrawer !== undefined) {
                this.inputLocalDataDrawer.unexposeAllUISubDataPorts();
            }
            if (this.outputLocalDataDrawer !== undefined) {
                this.outputLocalDataDrawer.unexposeAllUISubDataPorts();
            }
        };
        /**
         * Updates the graph size only when the blocks positions exceed the graph borders.
         * @public
         * @returns {boolean} True if the graph size has been updated else false.
         */
        UIGraph.prototype.updateSizeFromBlocks = function () {
            var updated = false;
            if (this.display !== undefined) {
                var gg = this.display.geometry;
                var cb = this.display.childrenBounds;
                var options = this.viewer.getEditor().getOptions();
                var cbxMin = options.gridSnapping ? UIMath.snapValue(cb.xmin) : cb.xmin;
                var cbyMin = options.gridSnapping ? UIMath.snapValue(cb.ymin) : cb.ymin;
                var cbxMax = options.gridSnapping ? UIMath.snapValue(cb.xmax) : cb.xmax;
                var cbyMax = options.gridSnapping ? UIMath.snapValue(cb.ymax) : cb.ymax;
                if (gg.left > cbxMin - this.getPaddingLeft()) {
                    this.display.multiset(['geometry', 'left'], cbxMin - this.getPaddingLeft(), ['geometry', 'width'], gg.width + gg.left - cbxMin + this.getPaddingLeft());
                    updated = true;
                }
                if (gg.top > cbyMin - this.getPaddingTop()) {
                    this.display.multiset(['geometry', 'top'], cbyMin - this.getPaddingTop(), ['geometry', 'height'], gg.height + gg.top - cbyMin + this.getPaddingTop());
                    updated = true;
                }
                if (gg.left + gg.width < cbxMax + this.getPaddingRight()) {
                    this.display.setPath(['geometry', 'width'], cbxMax - gg.left + this.getPaddingRight());
                    updated = true;
                }
                if (gg.top + gg.height < cbyMax + this.getPaddingBottom()) {
                    this.display.setPath(['geometry', 'height'], cbyMax - gg.top + this.getPaddingBottom());
                    updated = true;
                }
            }
            return updated;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           _    _   _    _    _  __   ____________ ____                         //
        //                          / \  | \ | |  / \  | | \ \ / /__  / ____|  _ \                        //
        //                         / _ \ |  \| | / _ \ | |  \ V /  / /|  _| | |_) |                       //
        //                        / ___ \| |\  |/ ___ \| |___| |  / /_| |___|  _ <                        //
        //                       /_/   \_\_| \_/_/   \_\_____|_| /____|_____|_| \_\                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Analyzes the graph.
         * @puublic
         */
        UIGraph.prototype.analyze = function () {
            if (this.getGraphAnalyzerState()) {
                this.analyzeGraphLoops();
            }
        };
        /**
         * Gets the graph analyzer state.
         * @public
         * @returns {boolean} True if the graph analyzer is activated else false.
         */
        UIGraph.prototype.getGraphAnalyzerState = function () {
            return this.graphAnalyserState;
        };
        /**
         * Sets the graph analyzer state.
         * @public
         * @param {boolean} state - True to activate the graph analyzer else false.
         */
        UIGraph.prototype.setGraphAnalyzerState = function (state) {
            this.graphAnalyserState = state;
            if (state) {
                this.analyzeGraphLoops();
            }
            else {
                this._clearAnalyzedGraphLoops();
            }
        };
        /**
         * Analyzes the graph loops.
         * @public
         */
        UIGraph.prototype.analyzeGraphLoops = function () {
            this._clearAnalyzedGraphLoops();
            this.controlLoopBlocks = this._showAnalyzedGraphLoops(Tools.findGraphControlLoops, false, 'Infinite control loop detected!');
            this.dataLoopBlocks = this._showAnalyzedGraphLoops(Tools.findGraphDataLoops, true, 'Infinite data loop detected!');
            this.controlWaitingDataBlocks = this._showAnalyzedGraphLoops(Tools.findGraphControlWaitingData, true, 'Block is waiting for unreachable data!');
        };
        /**
         * Clears the analyzed graph loops.
         * @private
         */
        UIGraph.prototype._clearAnalyzedGraphLoops = function () {
            this._hideAnalyzedGraphLoops(this.controlLoopBlocks);
            this._hideAnalyzedGraphLoops(this.dataLoopBlocks);
            this._hideAnalyzedGraphLoops(this.controlWaitingDataBlocks);
        };
        /**
         * Shows the analyzed graph loops.
         * @private
         * @param {Function} findFct - The global analyzer find function.
         * @param {boolean} isError - True if the message should be considered as error else false.
         * @param {string} message - The message to be displayed.
         * @returns {Array<UIBlock[]>} The list of UI blocks involved in a graph loop.
         */
        UIGraph.prototype._showAnalyzedGraphLoops = function (findFct, isError, message) {
            var _this = this;
            var graphLoops = [];
            var loops = findFct(this.model, false);
            loops.forEach(function (blocks) {
                var lUIBlocks = [];
                blocks.forEach(function (blockModel) {
                    var blockUI = _this.getUIBlockFromModel(blockModel);
                    blockUI.getView().showInfoIcon(isError, message);
                    lUIBlocks.push(blockUI);
                });
                if (lUIBlocks.length > 0) {
                    graphLoops.push(lUIBlocks);
                }
            });
            return graphLoops;
        };
        /**
         * Hides the info icon of the provided analyzed graph loop blocks.
         * @private
         * @param {UIBlock[][]} analyzedBlocks - The list of analyzed blocks.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraph.prototype._hideAnalyzedGraphLoops = function (analyzedBlocks) {
            analyzedBlocks.forEach(function (blocks) { return blocks.forEach(function (block) { return block.getView().hideInfoIcon(); }); });
            analyzedBlocks = [];
        };
        /**
         * Selects the blocks concerned by the analyzed graph loops.
         * @public
         * @param {UIBlock} blockUI - The UI block.
         */
        UIGraph.prototype.selectAnalyzedGraphLoops = function (blockUI) {
            var _this = this;
            var analyzedBlocks = this._getMatchingErrorBlocks(this.controlWaitingDataBlocks, blockUI);
            analyzedBlocks = analyzedBlocks.length > 0 ? analyzedBlocks : this._getMatchingErrorBlocks(this.dataLoopBlocks, blockUI);
            analyzedBlocks = analyzedBlocks.length > 0 ? analyzedBlocks : this._getMatchingErrorBlocks(this.controlLoopBlocks, blockUI);
            this.viewer.clearSelection();
            analyzedBlocks.forEach(function (block) { return _this.viewer.addToSelection(block.getDisplay()); });
        };
        /**
         * Gets the matching error blocks from the given block list and block reference.
         * @private
         * @param {UIBlock[][]} errorBlocks - The list of error blocks.
         * @param {UIBlock} blockUI - The error block reference.
         * @returns {UIBlock[]} The list of matching error blocks.
         */
        // eslint-disable-next-line class-methods-use-this
        UIGraph.prototype._getMatchingErrorBlocks = function (errorBlocks, blockUI) {
            var analyzedBlocks = [];
            for (var eb = 0; eb < errorBlocks.length && analyzedBlocks.length === 0; eb++) {
                var blocks = errorBlocks[eb];
                for (var b = 0; b < blocks.length && analyzedBlocks.length === 0; b++) {
                    var block = blocks[b];
                    if (block === blockUI) {
                        analyzedBlocks = blocks;
                    }
                }
            }
            return analyzedBlocks;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                _   _ ___ ____ _   _ _     ___ ____ _   _ _____ ___ _   _  ____                 //
        //               | | | |_ _/ ___| | | | |   |_ _/ ___| | | |_   _|_ _| \ | |/ ___|                //
        //               | |_| || | |  _| |_| | |    | | |  _| |_| | | |  | ||  \| | |  _                 //
        //               |  _  || | |_| |  _  | |___ | | |_| |  _  | | |  | || |\  | |_| |                //
        //               |_| |_|___\____|_| |_|_____|___\____|_| |_| |_| |___|_| \_|\____|                //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Highlights elements corresponding to the provided model occurences.
         * @public
         * @param {(DataPort|EventPort)[]} modelOccurences - The model occurences to highlight.
         * @param {ModelEnums.ESeverity} severity - The severity of the compatibility.
         */
        UIGraph.prototype.highlightUIElementsFromModel = function (modelOccurences, severity) {
            var _this = this;
            var dataPorts = [];
            modelOccurences.forEach(function (model) {
                if (model instanceof DataPort) {
                    var parentModel = model.block;
                    if (parentModel === _this.model) { // Is current graph ?
                        var dataPortUI = _this.getUIDataPortFromModel(model, true);
                        if (dataPortUI) {
                            dataPorts = dataPorts.concat(dataPortUI);
                            if (_this.outputLocalDataDrawer !== undefined && model.getType() === ModelEnums.EDataPortType.eLocal) {
                                var dpOutputLocalUI = _this.getUIDataPortFromModel(model, false);
                                if (dpOutputLocalUI) {
                                    dataPorts = dataPorts.concat(dpOutputLocalUI);
                                }
                            }
                        }
                    }
                    else if ((parentModel === null || parentModel === void 0 ? void 0 : parentModel.graph) === _this.model) { // Is block ?
                        var blockUI = _this.getUIBlockFromModel(parentModel);
                        if (blockUI) {
                            var dataPortUI = blockUI.getUIDataPortFromModel(model);
                            dataPorts = dataPortUI ? dataPorts.concat(dataPortUI) : dataPorts;
                        }
                    }
                } // TODO: Manage EventPort highlight!
            });
            dataPorts.forEach(function (dataPort) { return dataPort.compatibilityHighlight(severity); });
        };
        /**
         * Highlights the compatible UI data ports.
         * @public
         * @param {UIDataPort} dataPort - The source UI data port.
         */
        UIGraph.prototype.highlightCompatibleDataPorts = function (dataPort) {
            var compatiblePorts = this._getCompatibleDataPorts(dataPort);
            compatiblePorts.forEach(function (compatiblePort) { return compatiblePort.compatibilityHighlight(ModelEnums.ESeverity.eSuccess); });
            var compatiblePortsWithChange = this._getCompatibleDataPorts(dataPort, [], true);
            // Highlight ports with change only
            var compatiblePortsWithChangeOnly = compatiblePortsWithChange.filter(function (compatiblePortWithChange) { return compatiblePorts.indexOf(compatiblePortWithChange) === -1; });
            compatiblePortsWithChangeOnly.forEach(function (compatiblePortWithChangeOnly) { return compatiblePortWithChangeOnly.compatibilityHighlight(ModelEnums.ESeverity.eWarning); });
        };
        /**
         * Highlights the compatible UI data ports from a list of UI data ports.
         * @public
         * @param {UIDataPort[]} dataPorts - The source list of UI data ports.
         * @param {DataLink[]} [ignoredLinks] - The list of model data links to ignore during the check.
         */
        UIGraph.prototype.highlightCompatibleDataPortsFromList = function (dataPorts, ignoredLinks) {
            var _this = this;
            var compatiblePorts = [];
            // Get compatible ports list for each data port
            var arrayList = dataPorts.map(function (dataPort) { return _this._getCompatibleDataPorts(dataPort, ignoredLinks); });
            // Intersection on each array to reduce possible ports
            if (arrayList.length > 0) {
                compatiblePorts = arrayList[0];
                for (var i = 1; i < arrayList.length; i++) {
                    compatiblePorts = UITools.arrayIntersection(compatiblePorts, arrayList[i]);
                }
            }
            compatiblePorts.forEach(function (compatiblePort) { return compatiblePort.compatibilityHighlight(ModelEnums.ESeverity.eSuccess); });
            var compatiblePortsWithChange = [];
            // Get compatible ports list with change for each data port
            var arrayListWithChange = dataPorts.map(function (dataPort) { return _this._getCompatibleDataPorts(dataPort, ignoredLinks, true); });
            // Intersection on each array with change to reduce possible ports
            if (arrayListWithChange.length > 0) {
                compatiblePortsWithChange = arrayListWithChange[0];
                for (var i = 1; i < arrayListWithChange.length; i++) {
                    compatiblePortsWithChange = UITools.arrayIntersection(compatiblePortsWithChange, arrayListWithChange[i]);
                }
            }
            // Highlight ports with change only
            var compatiblePortsWithChangeOnly = compatiblePortsWithChange.filter(function (compatiblePortWithChange) { return compatiblePorts.indexOf(compatiblePortWithChange) === -1; });
            compatiblePortsWithChangeOnly.forEach(function (compatiblePortWithChangeOnly) { return compatiblePortWithChangeOnly.compatibilityHighlight(ModelEnums.ESeverity.eWarning); });
        };
        /**
         * Unhighlights every UI block data ports in the current graph.
         * @public
         */
        UIGraph.prototype.unhighlightCompatibleDataPorts = function () {
            this.blocks.forEach(function (block) {
                block.getUIDataPorts(undefined, true).forEach(function (dataPort) { return dataPort.compatibilityUnhighlight(); });
            });
            this.inputDataDrawer.getUIDataPorts(true).forEach(function (dataPort) { return dataPort.compatibilityUnhighlight(); });
            this.outputDataDrawer.getUIDataPorts(true).forEach(function (dataPort) { return dataPort.compatibilityUnhighlight(); });
            this.inputLocalDataDrawer.getUIDataPorts(true).forEach(function (dataPort) { return dataPort.compatibilityUnhighlight(); });
            if (this.outputLocalDataDrawer !== undefined) {
                this.outputLocalDataDrawer.getUIDataPorts(true).forEach(function (dataPort) { return dataPort.compatibilityUnhighlight(); });
            }
            this.shortcuts.forEach(function (shortcut) { return shortcut.getShortcutDataPort().compatibilityUnhighlight(); });
        };
        /**
         * Gets the list of compatible UI data ports according to their cast level.
         * @private
         * @param {UIDataPort} dataPort - The source UI data port.
         * @param {DataLink[]} [ignoredLinks] - The list of model data links to ignore during the check.
         * @param {boolean} [withChange] - If the data port needs a change to be compatible.
         * @returns {UIDataPort[]} The list of compatible UI data ports.
         */
        UIGraph.prototype._getCompatibleDataPorts = function (dataPort, ignoredLinks, withChange) {
            var _this = this;
            var compatiblePorts = [];
            this.blocks.forEach(function (block) {
                compatiblePorts = compatiblePorts.concat(_this._getCompatibleDataPortsFromList(dataPort, block.getUIDataPorts(undefined, true), ignoredLinks, withChange));
            });
            compatiblePorts = compatiblePorts.concat(this._getCompatibleDataPortsFromList(dataPort, this.inputDataDrawer.getUIDataPorts(true), ignoredLinks, withChange));
            compatiblePorts = compatiblePorts.concat(this._getCompatibleDataPortsFromList(dataPort, this.outputDataDrawer.getUIDataPorts(true), ignoredLinks, withChange));
            compatiblePorts = compatiblePorts.concat(this._getCompatibleDataPortsFromList(dataPort, this.inputLocalDataDrawer.getUIDataPorts(true), ignoredLinks, withChange));
            if (this.outputLocalDataDrawer !== undefined) {
                compatiblePorts = compatiblePorts.concat(this._getCompatibleDataPortsFromList(dataPort, this.outputLocalDataDrawer.getUIDataPorts(true), ignoredLinks, withChange));
            }
            if (!(dataPort instanceof UIShortcutDataPort)) {
                compatiblePorts = compatiblePorts.concat(this._getCompatibleDataPortsFromList(dataPort, this.shortcuts.map(function (shortcut) { return shortcut.getShortcutDataPort(); }), ignoredLinks, withChange));
            }
            return compatiblePorts;
        };
        /**
         * Gets the compatible data port list from the provided data port list.
         * @private
         * @param {UIDataPort} dataPortRef - The UI data port reference.
         * @param {UIDataPort[]} dataPorts - The UI data port list.
         * @param {DataLink[]} [ignoredLinks] - The list of model data links to ignore during the check.
         * @param {boolean} [withChange] - If the data port needs a change to be compatible.
         * @returns {UIDataPort[]} The list of compatible data ports.
         */
        UIGraph.prototype._getCompatibleDataPortsFromList = function (dataPortRef, dataPorts, ignoredLinks, withChange) {
            var _this = this;
            var compatibleDataPorts = [];
            dataPorts.forEach(function (dataPort) {
                if (_this.isDataPortLinkable(dataPortRef, dataPort, ignoredLinks, withChange)) {
                    compatibleDataPorts.push(dataPort);
                }
            });
            return compatibleDataPorts;
        };
        /**
         * Checks if the provided data ports are linkable.
         * @public
         * @param {UIDataPort} dataPort1 - The source UI data port.
         * @param {UIDataPort} dataPort2 - The target UI data port.
         * @param {DataLink[]} [ignoredLinks] - The list of model data links to ignore during the check.
         * @param {boolean} [withChange] - If the data port needs a change to be compatible.
         * @returns {boolean} True if the data ports are linkable else false.
         */
        UIGraph.prototype.isDataPortLinkable = function (dataPort1, dataPort2, ignoredLinks, withChange) {
            if (dataPort1 instanceof UIShortcutDataPort) {
                if (dataPort2 instanceof UIShortcutDataPort) {
                    return false;
                }
                return this.isDataPortLinkable(dataPort1.getParent().getDataPortUI(), dataPort2, ignoredLinks, withChange);
            }
            else if (dataPort2 instanceof UIShortcutDataPort) {
                return this.isDataPortLinkable(dataPort1, dataPort2.getParent().getDataPortUI(), ignoredLinks, withChange);
            }
            else if (dataPort1 instanceof UIGraphDataPort) {
                if (dataPort1.getModel().getType() === ModelEnums.EDataPortType.eLocal) {
                    if (dataPort1.getInputLocalState() && !dataPort2.getModel().isEndPort(dataPort1.getModel().block)) {
                        return false;
                    }
                    else if (!dataPort1.getInputLocalState() && !dataPort2.getModel().isStartPort(dataPort1.getModel().block)) {
                        return false;
                    }
                }
            }
            else if (dataPort2 instanceof UIGraphDataPort) {
                return this.isDataPortLinkable(dataPort2, dataPort1, ignoredLinks, withChange);
            }
            return this.model.isDataLinkable(dataPort1.getModel(), dataPort2.getModel(), ignoredLinks, withChange);
        };
        /**
         * Highlights the shortcuts of the specified UI data port.
         * @public
         * @param {UIDataPort} dataPort - The UI data port.
         */
        UIGraph.prototype.highlightShortcuts = function (dataPort) {
            this.shortcuts.forEach(function (shortcut) {
                if (shortcut.getDataPortModel() === dataPort.getModel()) {
                    shortcut.getShortcutDataPort().highlight();
                }
            });
        };
        /**
         * Unhighlights the shortcuts of the specified UI data port.
         * @public
         * @param {UIDataPort} dataPort - The UI data port.
         */
        UIGraph.prototype.unhighlightShortcuts = function (dataPort) {
            this.shortcuts.forEach(function (shortcut) {
                if (shortcut.getDataPortModel() === dataPort.getModel()) {
                    shortcut.getShortcutDataPort().unhighlight();
                }
            });
        };
        /**
         * Hides all blocks halo.
         * @public
         */
        UIGraph.prototype.hideAllBlocksHalo = function () {
            this.blocks.forEach(function (block) { return block.getView().hideHalo(); });
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                   ____  _     ___   ____ _  __  __     _____ _______        __                 //
        //                  | __ )| |   / _ \ / ___| |/ /  \ \   / /_ _| ____\ \      / /                 //
        //                  |  _ \| |  | | | | |   | ' /    \ \ / / | ||  _|  \ \ /\ / /                  //
        //                  | |_) | |__| |_| | |___| . \     \ V /  | || |___  \ V  V /                   //
        //                  |____/|_____\___/ \____|_|\_\     \_/  |___|_____|  \_/\_/                    //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the block view associated to this graph.
         * @public
         * @returns {UIGraphBlock} The block view associated to this graph.
         */
        UIGraph.prototype.getBlockView = function () {
            return this.blockView;
        };
        /**
         * Sets the block view associated to this graph.
         * @public
         * @param {UIGraphBlock} blockView - The block view associated to this graph.
         */
        UIGraph.prototype.setBlockView = function (blockView) {
            this.blockView = blockView;
        };
        /**
         * Removes the block view associated to this graph.
         * @private
         */
        UIGraph.prototype._removeBlockView = function () {
            this.blockView = undefined;
        };
        return UIGraph;
    }(UIGroup));
    return UIGraph;
});
