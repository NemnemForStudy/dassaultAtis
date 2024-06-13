/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUINode", "DS/EPSSchematicsUI/nodes/views/EPSSchematicsUIBlockView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIMath", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockDataPort", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBlockDialog", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortVisibilityDialog", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, UINode, UIBlockView, UIMath, UIDom, UIBlockControlPort, UIBlockDataPort, UIBlockEventPort, UIBlockDialog, UIDataPortVisibilityDialog, UICommand, UICommandType, UIFileSaver, UITools, Events, EventPort, ModelEnums, Tools) {
    "use strict";
    /**
     * This class defines a UI Block.
     * @private
     * @class UIBlock
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlocks
     * @extends UINode
     */
    var UIBlock = /** @class */ (function (_super) {
        __extends(UIBlock, _super);
        /**
         * @public
         * @constructor
         * @param {UIGraph} graph - The graph that owns this block.
         * @param {Block} model - The block model.
         * @param {number} left - The left position of the block.
         * @param {number} top - The top position of the block.
         * @param {IUIBlockViewCtr} [ViewCtr] - The optional block view constructor.
         */
        function UIBlock(graph, model, left, top, ViewCtr) {
            var _this = _super.call(this, { graph: graph, isDraggable: true }) || this;
            _this._dataPorts = [];
            _this._controlPorts = [];
            _this._visibilityDialog = new UIDataPortVisibilityDialog(_this.getEditor(), _this);
            _this._fileSaver = new UIFileSaver();
            _this._onBlockNameChangeCB = _this._onBlockNameChange.bind(_this);
            _this._onDataPortAddCB = _this._onDataPortAdd.bind(_this);
            _this._onDataPortRemoveCB = _this._onDataPortRemove.bind(_this);
            _this._onControlPortAddCB = _this._onControlPortAdd.bind(_this);
            _this._onControlPortRemoveCB = _this._onControlPortRemove.bind(_this);
            _this._onSettingAddCB = _this._onSettingAdd.bind(_this);
            _this._onSettingRemoveCB = _this._onSettingRemove.bind(_this);
            _this._onBlockNodeIdSelectorChangeCB = _this._onBlockNodeIdSelectorChange.bind(_this);
            _this._onSettingNameChangeCB = _this._onSettingNameChange.bind(_this);
            _this._onSettingValueChangeCB = _this._onSettingValueChange.bind(_this);
            _this._onSettingOverrideChangeCB = _this._onSettingOverrideChange.bind(_this);
            _this._kBorderToExecPortSize = 20;
            _this._kBorderToParamPortSize = 20;
            _this._kExecPortToPortSize = 40;
            _this._kParamPortToPortSize = 20;
            _this._model = model;
            _this._configurationDialog = new UIBlockDialog(_this);
            // Configure block display
            var view = ViewCtr ? new ViewCtr(_this) : new UIBlockView(_this);
            _this.setView(view);
            _this._display.data.name = _this._model.getName();
            _this._display.customPropertyFlags = {
                name: 1 /* VIEW */
            };
            _this.setPosition(left, top);
            _this._model.addListener(Events.BlockNameChangeEvent, _this._onBlockNameChangeCB);
            _this._model.addListener(Events.DataPortAddEvent, _this._onDataPortAddCB);
            _this._model.addListener(Events.DataPortRemoveEvent, _this._onDataPortRemoveCB);
            _this._model.addListener(Events.ControlPortAddEvent, _this._onControlPortAddCB);
            _this._model.addListener(Events.ControlPortRemoveEvent, _this._onControlPortRemoveCB);
            _this._model.addListener(Events.SettingAddEvent, _this._onSettingAddCB);
            _this._model.addListener(Events.SettingRemoveEvent, _this._onSettingRemoveCB);
            _this._model.addListener(Events.BlockNodeIdSelectorChangeEvent, _this._onBlockNodeIdSelectorChangeCB);
            _this._model.getSettings().forEach(function (setting) {
                setting.addListener(Events.SettingNameChangeEvent, _this._onSettingNameChangeCB);
                setting.addListener(Events.SettingValueChangeEvent, _this._onSettingValueChangeCB);
                setting.addListener(Events.SettingOverrideChangeEvent, _this._onSettingOverrideChangeCB);
            });
            _this._buildFromModel();
            return _this;
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
         * Removes the node from its parent graph.
         * @public
         */
        UIBlock.prototype.remove = function () {
            var _this = this;
            if (this._visibilityDialog !== undefined) {
                this._visibilityDialog.remove();
                this._visibilityDialog = undefined;
            }
            if (this._model !== undefined) {
                this._model.getSettings().forEach(function (setting) {
                    setting.removeListener(Events.SettingNameChangeEvent, _this._onSettingNameChangeCB);
                    setting.removeListener(Events.SettingValueChangeEvent, _this._onSettingValueChangeCB);
                    setting.removeListener(Events.SettingOverrideChangeEvent, _this._onSettingOverrideChangeCB);
                });
                this._model.removeListener(Events.BlockNameChangeEvent, this._onBlockNameChangeCB);
                this._model.removeListener(Events.DataPortAddEvent, this._onDataPortAddCB);
                this._model.removeListener(Events.DataPortRemoveEvent, this._onDataPortRemoveCB);
                this._model.removeListener(Events.ControlPortAddEvent, this._onControlPortAddCB);
                this._model.removeListener(Events.ControlPortRemoveEvent, this._onControlPortRemoveCB);
                this._model.removeListener(Events.SettingAddEvent, this._onSettingAddCB);
                this._model.removeListener(Events.SettingRemoveEvent, this._onSettingRemoveCB);
                this._model.removeListener(Events.BlockNodeIdSelectorChangeEvent, this._onBlockNodeIdSelectorChangeCB);
            }
            this._dataPorts.forEach(function (dataPort) { return dataPort.remove(); });
            this._controlPorts.forEach(function (controlPort) { return controlPort.remove(); });
            this._graph.getViewer().getContextualBarController().clearCommands();
            if (this._configurationDialog) {
                this._configurationDialog.remove();
                this._configurationDialog = undefined;
            }
            this._model = undefined;
            this._fileSaver = undefined;
            this._dataPorts = undefined;
            this._controlPorts = undefined;
            this._onBlockNameChangeCB = undefined;
            this._onDataPortAddCB = undefined;
            this._onDataPortRemoveCB = undefined;
            this._onControlPortAddCB = undefined;
            this._onControlPortRemoveCB = undefined;
            this._onSettingAddCB = undefined;
            this._onSettingRemoveCB = undefined;
            this._onBlockNodeIdSelectorChangeCB = undefined;
            this._onSettingNameChangeCB = undefined;
            this._onSettingValueChangeCB = undefined;
            this._onSettingOverrideChangeCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the main view of the node.
         * @public
         * @returns {UIBlockView} The main view of the node.
         */
        UIBlock.prototype.getView = function () {
            return _super.prototype.getView.call(this);
        };
        /**
         * Gets the optional data ports visibility dialog.
         * @public
         * @returns {UIDataPortVisibilityDialog} The optional data ports visibility dialog.
         */
        UIBlock.prototype.getOptionalDataPortsVisibilityDialog = function () {
            return this._visibilityDialog;
        };
        /**
         * Projects the specified JSON object to the block.
         * @public
         * @param {IJSONBlockUI} iJSONBlock - The JSON projected block.
         */
        UIBlock.prototype.fromJSON = function (iJSONBlock) {
            if (iJSONBlock !== undefined) {
                this.setPosition(iJSONBlock.left, iJSONBlock.top, true);
                if (iJSONBlock.dataPorts) {
                    this.getUIDataPorts(undefined, false, true).forEach(function (dataPortUI, index) {
                        dataPortUI.fromJSON(iJSONBlock.dataPorts[index]);
                    });
                }
            }
        };
        /**
         * Projects the block to the specified JSON object.
         * @public
         * @param {IJSONBlockUI} oJSONBlock - The JSON projected block.
         */
        UIBlock.prototype.toJSON = function (oJSONBlock) {
            if (oJSONBlock !== undefined) {
                oJSONBlock.top = this.getActualTop();
                oJSONBlock.left = this.getActualLeft();
                oJSONBlock.dataPorts = [];
                this.getUIDataPorts(undefined, false, true).forEach(function (dataPortUI) {
                    var oJSONDataPort = {};
                    dataPortUI.toJSON(oJSONDataPort);
                    oJSONBlock.dataPorts.push(oJSONDataPort);
                });
            }
        };
        /**
         * Saves the block to JSON.
         * Used by the clipboard when copying a block.
         * @public
         * @returns {IJSONBlockCopyPaste} The JSON representing the saved block.
         */
        UIBlock.prototype.save = function () {
            var json = {
                model: {},
                ui: {}
            };
            this._model.toJSON(json.model);
            this.toJSON(json.ui);
            return json;
        };
        /**
         * Loads a block from the given JSON object.
         * Used by the clipboard when pasting a block.
         * @public
         * @param {object} model - The JSON model projected block.
         * @param {IJSONBlockUI} ui - The JSON ui projected block.
         */
        UIBlock.prototype.load = function (model, ui) {
            this._model.fromJSON(model);
            this.fromJSON(ui);
        };
        /**
         * Sets the block position relative to its parent graph.
         * @public
         * @param {number} left - The left position of the block.
         * @param {number} top - The top position of the block.
         * @param {boolean} [relativeToGraph=false] - True to compute position relative to its parent graph, false otherwise.
         */
        UIBlock.prototype.setPosition = function (left, top, relativeToGraph) {
            if (relativeToGraph === void 0) { relativeToGraph = false; }
            var editor = this._graph.getEditor();
            var gridSnapping = editor !== undefined ? editor.getOptions().gridSnapping : false;
            var posLeft = gridSnapping ? UIMath.snapValue(left) : left;
            var posTop = gridSnapping ? UIMath.snapValue(top) : top;
            if (this._display.top !== posTop || this._display.left !== posLeft) {
                this._graph.onUIChange();
            }
            _super.prototype.setPosition.call(this, posLeft, posTop, relativeToGraph);
        };
        /**
         * Computes the height of the block according to its control port list.
         * @public
         */
        UIBlock.prototype.computeHeight = function () {
            var blockView = this.getView();
            if (blockView.getElement() !== undefined) {
                // Compute the ports height
                var controlIn = this._model.getControlPorts(ModelEnums.EControlPortType.eInput);
                var controlInEvent = this._model.getControlPorts(ModelEnums.EControlPortType.eInputEvent);
                var controlOut = this._model.getControlPorts(ModelEnums.EControlPortType.eOutput);
                var controlOutEvent = this._model.getControlPorts(ModelEnums.EControlPortType.eOutputEvent);
                var controlInCount = controlIn.length + controlInEvent.length;
                var controlOutCount = controlOut.length + controlOutEvent.length;
                var maxPorts = (controlInCount > controlOutCount) ? controlInCount : controlOutCount;
                maxPorts = maxPorts > 0 ? maxPorts - 1 : 0;
                var portHeight = this._kBorderToExecPortSize * 2 + this._kExecPortToPortSize * maxPorts;
                //const height = portHeight > minHeight ? portHeight : minHeight;
                // Impose a minimum block height
                var minHeight = UIDom.getComputedStyleMinDimension(blockView.getElement()).height;
                var height = minHeight > portHeight ? minHeight : portHeight;
                // Set the block height
                this._display.set('height', height);
                // Dispatch each control ports
                this._dispatchControlPorts();
            }
        };
        /**
         * Computes the width of the block according to its data port list.
         * @public
         */
        UIBlock.prototype.computeWidth = function () {
            var blockView = this.getView();
            if (blockView.getElement() !== undefined) {
                // Get the minimum block width
                var leftWidth = UIDom.getComputedStyleBBox(blockView.getBlockContainerLeftElement()).width;
                var rightWidth = UIDom.getComputedStyleBBox(blockView.getBlockContainerRightElement()).width;
                var middleWidth = UIDom.getComputedStyleBBox(blockView.getBlockNameElement()).width;
                var blockBorderWidth = UIDom.getComputedStyleBorderWidth(blockView.getElement());
                var width = blockBorderWidth.left + leftWidth + middleWidth + rightWidth + blockBorderWidth.right;
                // Compute the ports width
                var dataInCount = this.getUIDataPorts(ModelEnums.EDataPortType.eInput, true).length;
                var dataOutCount = this.getUIDataPorts(ModelEnums.EDataPortType.eOutput, true).length;
                var maxPorts = (dataInCount > dataOutCount) ? dataInCount : dataOutCount;
                maxPorts = maxPorts > 0 ? maxPorts - 1 : 0;
                var portWidth = this._kBorderToParamPortSize * 2 + this._kParamPortToPortSize * maxPorts;
                width = width > portWidth ? width : portWidth;
                // Impose a minimum block width
                var minWidth = UIDom.getComputedStyleMinDimension(blockView.getElement()).width;
                width = width > minWidth ? width : minWidth;
                width = UIMath.upperSnapValue(width, 20);
                // Set the block width
                this._display.set('width', width);
                // Dispatch the data ports
                this._dispatchDataPortsByType(ModelEnums.EDataPortType.eInput);
                this._dispatchDataPortsByType(ModelEnums.EDataPortType.eOutput);
            }
        };
        /**
         * Opens the block configuration dialog.
         * @public
         */
        UIBlock.prototype.openConfigurationDialog = function () {
            this._configurationDialog.open();
        };
        /**
         * The callback on the block double click event.
         * @public
         */
        UIBlock.prototype.onBlockDblClick = function () {
            this.openConfigurationDialog();
        };
        /**
         * The callback on the block info icon click event.
         * @public
         */
        UIBlock.prototype.onInfoIconClick = function () {
            this._graph.selectAnalyzedGraphLoops(this);
        };
        /**
         * The callback on the block category icon click event.
         * @public
         */
        UIBlock.prototype.onCategoryIconClick = function () {
            this._openBlockDocumentation();
        };
        /**
         * The callback on the block breakpoint icon click event.
         * @public
         */
        UIBlock.prototype.onBreakpointIconClick = function () {
            this.toggleBreakpoint();
        };
        /**
         * Gets the block model.
         * @public
         * @returns {Block} The block model.
         */
        UIBlock.prototype.getModel = function () {
            return this._model;
        };
        /**
         * Gets the list of available commands.
         * @public
         * @returns {UICommand[]} The list of available commands.
         */
        UIBlock.prototype.getCommands = function () {
            var _this = this;
            var viewer = this._graph.getViewer();
            var commands = [];
            var isDebuggable = UITools.isBlockDataPortDebuggable(this.getEditor(), this._model);
            commands.push(new UICommand(isDebuggable ? UICommandType.eDebug : UICommandType.eEdit, this.openConfigurationDialog.bind(this)));
            commands.push(new UICommand(UICommandType.eOpenBlockDocumentation, this._openBlockDocumentation.bind(this)));
            if (this._model.isExportable()) {
                var sessionStorageController = this.getEditor().getSessionStorageController();
                var exportJSBlock = sessionStorageController.getHiddenSettingValue('exportJSBlock');
                var fileName = this._model.exportFileName();
                if (exportJSBlock || fileName.endsWith('.json')) {
                    commands.push(new UICommand(UICommandType.eExportBlock, function () { _this.exportBlock(); }));
                }
            }
            if (Tools.isJoinAllBlock(this._model)) {
                commands.push(new UICommand(UICommandType.eShowBlockPredecessors, function () {
                    var blocks = Tools.getAllControlPredecessors(_this._model);
                    blocks.forEach(function (block) { return _this.getGraph().getUIBlockFromModel(block).getView().showHalo(); });
                }));
            }
            if (this._model.hasOptionalDataPort()) {
                commands.push(new UICommand(UICommandType.eEditOptionalDataPorts, function (event) {
                    _this._visibilityDialog.setMousePosition({ left: event.clientX, top: event.clientY });
                    _this._visibilityDialog.open();
                }));
            }
            commands.push(new UICommand(UICommandType.eRemove, viewer.deleteSelection.bind(viewer)));
            return commands;
        };
        /**
         * Exports the block if it is exportable.
         * @public
         */
        UIBlock.prototype.exportBlock = function () {
            if (this._model.isExportable()) {
                var sessionStorageController = this.getEditor().getSessionStorageController();
                var exportJSBlock = sessionStorageController.getHiddenSettingValue('exportJSBlock');
                var fileName = this._model.exportFileName();
                if (exportJSBlock || fileName.endsWith('.json')) {
                    var jsonUI = {};
                    this.toJSON(jsonUI);
                    var modelContent = this._model.exportContent();
                    var jsonModel = JSON.parse(modelContent);
                    jsonModel.ui = jsonUI;
                    var fileContent = JSON.stringify(jsonModel, undefined, 2);
                    this._fileSaver.saveTextFile(fileContent, fileName);
                }
            }
        };
        /**
         * Gets the block file saver.
         * @public
         * @returns {UIFileSaver} The block file saver.
         */
        UIBlock.prototype.getFileSaver = function () {
            return this._fileSaver;
        };
        /**
         * Gets the create graph from selection command.
         * @public
         * @returns {UICommand} The created command.
         */
        UIBlock.prototype.getCreateGraphFromSelectionCommand = function () {
            var viewer = this._graph.getViewer();
            return new UICommand(UICommandType.eCreateGraphFromSelection, viewer.createGraphFromSelection.bind(viewer));
        };
        /**
         * Gets the create CSI graph from selection command.
         * @public
         * @returns {UICommand} The created command.
         */
        UIBlock.prototype.getCreateCSIGraphFromSelectionCommand = function () {
            var viewer = this._graph.getViewer();
            return new UICommand(UICommandType.eCreateCSIGraphFromSelection, viewer.createCSIGraphFromSelection.bind(viewer));
        };
        /**
         * Gets the block UI control ports.
         * @public
         * @returns {UIBlockControlPort[]} The block UI control ports.
         */
        UIBlock.prototype.getUIControlPorts = function () {
            return this._controlPorts;
        };
        /**
         * Gets the list of block UI data ports.
         * If portType is undefined then the whole UI data ports list will be returned.
         * @public
         * @param {ModelEnums.EDataPortType} [portType] - The data port type.
         * @param {boolean} [includeSubDataPorts=false] - True to include sub data ports else false.
         * @param {boolean} [includeUnexposed=false] - True to include unexposed data ports else false.
         * @returns {UIDataPort[]} The list of block UI data ports.
         */
        UIBlock.prototype.getUIDataPorts = function (portType, includeSubDataPorts, includeUnexposed) {
            if (includeSubDataPorts === void 0) { includeSubDataPorts = false; }
            if (includeUnexposed === void 0) { includeUnexposed = false; }
            var dataPorts = [];
            this._dataPorts.filter(function (dp) { return !includeUnexposed ? dp.isExposed() === true : true; }).forEach(function (dataPort) {
                if (portType === undefined || dataPort.getModel().getType() === portType) {
                    dataPorts.push(dataPort);
                    if (includeSubDataPorts) {
                        var subDataPorts = includeUnexposed ? dataPort.getAllSubDataPorts() : dataPort.getExposedSubDataPorts();
                        dataPorts = dataPorts.concat(subDataPorts);
                    }
                }
            });
            return dataPorts;
        };
        /**
         * Gets the list of block UI data links.
         * If portType is undefined then all the block data link list will be returned.
         * @public
         * @param {ModelEnums.EDataPortType} [portType] - The data port type.
         * @returns {UIDataLink[]} The list of block UI datalinks.
         */
        UIBlock.prototype.getUIDataLinks = function (portType) {
            var dataLinks = [];
            this._dataPorts.forEach(function (dataPort) {
                if (portType === undefined || dataPort.getModel().getType() === portType) {
                    dataLinks.push(dataPort.getLinks());
                }
            });
            return UIDom.flatDeep(dataLinks);
        };
        /**
         * Gets the list of block UI control links.
         * If portType is undefined then all the block control link list will be returned.
         * @public
         * @param {ModelEnums.EControlPortType} [portType] - The control port type.
         * @returns {ControlLink[]} The list of block model control links.
         */
        UIBlock.prototype.getUIControlLinks = function (portType) {
            var controlLinks = [];
            this._controlPorts.forEach(function (controlPort) {
                if (portType === undefined || controlPort.getModel().getType() === portType) {
                    controlLinks.push(controlPort.getModel().getControlLinks());
                }
            });
            return UIDom.flatDeep(controlLinks);
        };
        /**
         * Gets the UI data port or sub data port from the provided data port model.
         * @public
         * @param {DataPort} dataPortModel - The data port model.
         * @param {boolean} [includeSubDataPorts=false] - True to include sub data ports else false.
         * @param {boolean} [includeUnexposed=false] - True to include unexposed data ports else false.
         * @returns {UIDataPort} The UI data port.
         */
        UIBlock.prototype.getUIDataPortFromModel = function (dataPortModel, includeSubDataPorts, includeUnexposed) {
            if (includeSubDataPorts === void 0) { includeSubDataPorts = true; }
            if (includeUnexposed === void 0) { includeUnexposed = false; }
            var dataPorts = this.getUIDataPorts(dataPortModel.getType(), includeSubDataPorts, includeUnexposed);
            return dataPorts.find(function (dataPort) { return dataPort.getModel() === dataPortModel; });
        };
        /**
         * Gets the UI control port from the provided control port model.
         * @public
         * @param {ControlPort} controlPortModel - The control port model.
         * @returns {UIControlPort} The UI control port.
         */
        UIBlock.prototype.getUIControlPortFromModel = function (controlPortModel) {
            return this._controlPorts.find(function (controlPort) { return controlPort.getModel() === controlPortModel; });
        };
        /**
         * Gets the configuration dialog.
         * @public
         * @returns {UIBlockDialog} The block configuration dialog.
         */
        UIBlock.prototype.getConfigurationDialog = function () {
            return this._configurationDialog;
        };
        /**
         * Gets the editor.
         * @public
         * @returns {UIEditor} The editor.
         */
        UIBlock.prototype.getEditor = function () {
            return this.getGraph().getEditor();
        };
        /**
         * Toggles the breakpoint on the block.
         * @public
         */
        UIBlock.prototype.toggleBreakpoint = function () {
            if (this.getEditor()._areBreakpointsEnabled()) {
                var breakpointController = this.getEditor().getBreakpointController();
                if (breakpointController.hasBreakpoint(this)) {
                    this.getView().hideBreakpoint();
                    breakpointController.unregisterBreakpoint(this);
                }
                else {
                    this.getView().showBreakpoint();
                    breakpointController.registerBreakpoint(this);
                }
            }
        };
        /**
         * Automatic expand data ports according to the maxSplitDataPort editor setting.
         * The logic is all or nothing:
         * - If the number of input data ports + the number of their sub data ports exceed maxSplitDataPort value,
         *   then we don't expand any data ports else we expand every thing.
         * - If the number of output data ports + the number of their sub data ports exceed maxSplitDataPort value,
         *   then we don't expand any data ports else we expand every thing.
         * @public
         */
        UIBlock.prototype.automaticExpandDataPorts = function () {
            var maxSplitDataPort = this._graph.getEditor().getLocalStorageController().getMaxSplitDataPortCountEditorSetting();
            var inputDataPorts = this.getUIDataPorts(ModelEnums.EDataPortType.eInput, false);
            var inputSubDataPortCount = inputDataPorts.length;
            for (var idp = 0; (idp < inputDataPorts.length) && (inputSubDataPortCount <= maxSplitDataPort); idp++) {
                var iValueTypeDescriptor = inputDataPorts[idp].getValueTypeDescriptor() || {};
                inputSubDataPortCount += Object.keys(iValueTypeDescriptor).length;
            }
            if (inputSubDataPortCount <= maxSplitDataPort) {
                var outputDataPorts = this.getUIDataPorts(ModelEnums.EDataPortType.eOutput, false);
                var outputDataPortCount = outputDataPorts.length;
                for (var odp = 0; (odp < outputDataPorts.length) && (outputDataPortCount <= maxSplitDataPort); odp++) {
                    var oValueTypeDescriptor = outputDataPorts[odp].getValueTypeDescriptor() || {};
                    outputDataPortCount += Object.keys(oValueTypeDescriptor).length;
                }
                if (outputDataPortCount <= maxSplitDataPort) {
                    inputDataPorts.forEach(function (inputDataPort) { return inputDataPort.getModel().expand(); });
                    outputDataPorts.forEach(function (outputDataPort) { return outputDataPort.getModel().expand(); });
                }
            }
            this._graph.updateSizeFromBlocks();
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
         * The callback on the model data port add event.
         * @protected
         * @param {Events.DataPortAddEvent} event - The model data port add event.
         * @returns {boolean} True if the data port has been added else false.
         */
        UIBlock.prototype._onDataPortAdd = function (event) {
            var result = false;
            var dataPortModel = event.getDataPort();
            if (dataPortModel.getType() !== ModelEnums.EDataPortType.eLocal) {
                var dataPort = new UIBlockDataPort(this, dataPortModel);
                this._dataPorts.push(dataPort);
                this.addPort(dataPort);
                this.computeWidth();
                result = true;
            }
            this.getGraph().updateSizeFromBlocks();
            this.getGraph().onModelChange();
            return result;
        };
        /**
         * The callback on the model data port remove event.
         * @protected
         * @param {Events.DataPortRemoveEvent} event - The model data port remove event.
         * @returns {boolean} True if the data port has been removed else false.
         */
        UIBlock.prototype._onDataPortRemove = function (event) {
            var result = false;
            var dataPortModel = event.getDataPort();
            var dataPortType = dataPortModel.getType();
            if (dataPortType !== ModelEnums.EDataPortType.eLocal) {
                var dataPorts = this.getUIDataPorts(dataPortType);
                var index = event.getIndexByType();
                this._removeUIDataPort(dataPorts[index]);
                result = true;
            }
            this.getGraph().onModelChange();
            return result;
        };
        /**
         * The callback on the model control port add event.
         * @protected
         * @param {Events.ControlPortAddEvent} event - The model control port add event.
         */
        UIBlock.prototype._onControlPortAdd = function (event) {
            var controlPortModel = event.getControlPort();
            var isEventPort = controlPortModel instanceof EventPort;
            var UIBlockPortCtr = isEventPort ? UIBlockEventPort : UIBlockControlPort;
            var controlPort = new UIBlockPortCtr(this, controlPortModel);
            this._controlPorts.push(controlPort);
            this.addPort(controlPort);
            this.computeHeight();
            this.getGraph().updateSizeFromBlocks();
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model control port remove event.
         * @protected
         * @param {Events.ControlPortRemoveEvent} event - The model control port remove event.
         */
        UIBlock.prototype._onControlPortRemove = function (event) {
            var index = event.getIndex();
            var controlPort = this._controlPorts[index];
            controlPort.remove();
            this._controlPorts.splice(index, 1);
            this.computeHeight();
            this.getGraph().onModelChange();
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
         * Opens the block documentation.
         * @private
         */
        UIBlock.prototype._openBlockDocumentation = function () {
            var uid = this._model.getUid();
            var blockLibraryPanel = this._graph.getEditor().getBlockLibraryPanel();
            blockLibraryPanel.open(function () {
                blockLibraryPanel.getBlockLibraryDataGridView().selectBlock(uid);
            });
        };
        /**
         * Dispatches the control ports along the block height.
         * @private
         */
        UIBlock.prototype._dispatchControlPorts = function () {
            var _this = this;
            var inputIndex = 0, outputIndex = 0;
            this._controlPorts.forEach(function (controlPort) {
                if (controlPort.isStartPort()) {
                    controlPort.setOffset(_this._kBorderToExecPortSize + inputIndex * _this._kExecPortToPortSize);
                    inputIndex++;
                }
                else {
                    controlPort.setOffset(_this._kBorderToExecPortSize + outputIndex * _this._kExecPortToPortSize);
                    outputIndex++;
                }
            });
        };
        /**
         * Dispatches the data ports from the provided type
         * along the block width.
         * @private
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         */
        UIBlock.prototype._dispatchDataPortsByType = function (portType) {
            var dataPorts = this.getUIDataPorts(portType, true);
            var centerIndex = Math.floor(dataPorts.length / 2);
            var isEven = dataPorts.length % 2 === 0;
            var center = this._display.width / 2;
            var gap = this._kParamPortToPortSize;
            dataPorts.forEach(function (dataPort, index) {
                var offset;
                if (index < centerIndex) {
                    if (isEven) {
                        var diff = centerIndex - index - 1;
                        offset = center - (gap / 2) - (diff * gap);
                    }
                    else {
                        var diff = centerIndex - index;
                        offset = center - diff * gap;
                    }
                }
                else {
                    var diff = index - centerIndex;
                    if (isEven) {
                        offset = center + (gap / 2) + (diff * gap);
                    }
                    else {
                        offset = center + diff * gap;
                    }
                }
                dataPort.setOffset(offset);
            });
        };
        /**
         * Builds the UI block from the model.
         * @private
         */
        UIBlock.prototype._buildFromModel = function () {
            var _this = this;
            var dataPortsModel = this._model.getDataPorts();
            dataPortsModel.forEach(function (dataPortModel) {
                if (dataPortModel.getType() !== ModelEnums.EDataPortType.eLocal) {
                    var dataPortUI = new UIBlockDataPort(_this, dataPortModel);
                    _this._dataPorts.push(dataPortUI);
                    _this.addPort(dataPortUI);
                }
            });
            var controlPortsModel = this._model.getControlPorts();
            controlPortsModel.forEach(function (controlPortModel) {
                var isEventPort = controlPortModel instanceof EventPort;
                var UIBlockPortCtr = isEventPort ? UIBlockEventPort : UIBlockControlPort;
                var controlPortUI = new UIBlockPortCtr(_this, controlPortModel);
                _this._controlPorts.push(controlPortUI);
                _this.addPort(controlPortUI);
            });
            this.computeWidth();
            this.computeHeight();
        };
        /**
         * The callback on the model block name change event.
         * @private
         * @param {Events.BlockNameChangeEvent} event - The model block name change event.
         */
        UIBlock.prototype._onBlockNameChange = function (event) {
            this._display.setPath(['data', 'name'], event.getName());
            this.computeWidth();
            this.getGraph().updateSizeFromBlocks();
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model setting add event.
         * @private
         * @param {Events.SettingAddEvent} event - The model setting add event.
         */
        UIBlock.prototype._onSettingAdd = function (event) {
            var setting = event.getSetting();
            setting.addListener(Events.SettingNameChangeEvent, this._onSettingNameChangeCB);
            setting.addListener(Events.SettingValueChangeEvent, this._onSettingValueChangeCB);
            setting.addListener(Events.SettingOverrideChangeEvent, this._onSettingOverrideChangeCB);
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model setting remove event.
         * @private
         * @param {Events.SettingRemoveEvent} event - The model setting remove event.
         */
        UIBlock.prototype._onSettingRemove = function (event) {
            var setting = event.getSetting();
            setting.removeListener(Events.SettingNameChangeEvent, this._onSettingNameChangeCB);
            setting.removeListener(Events.SettingValueChangeEvent, this._onSettingValueChangeCB);
            setting.removeListener(Events.SettingOverrideChangeEvent, this._onSettingOverrideChangeCB);
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model setting name change event.
         * @private
         */
        UIBlock.prototype._onSettingNameChange = function () {
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model setting value change event.
         * @private
         */
        UIBlock.prototype._onSettingValueChange = function () {
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model setting override change event.
         * @private
         */
        UIBlock.prototype._onSettingOverrideChange = function () {
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the block nodeId selector change event.
         * @private
         */
        UIBlock.prototype._onBlockNodeIdSelectorChange = function () {
            var nodeIdSelectorsPanel = this._graph.getEditor().getNodeIdSelectorsPanel();
            if (nodeIdSelectorsPanel.isOpen() === true) {
                nodeIdSelectorsPanel.colorizeBlock(this);
            }
            this.getGraph().onModelChange();
        };
        /**
         * Removes the given UI data port from the block.
         * @private
         * @param {UIBlockDataPort} dataPortUI - The UI data port.
         */
        UIBlock.prototype._removeUIDataPort = function (dataPortUI) {
            var index = this._dataPorts.indexOf(dataPortUI);
            if (index !== -1) {
                var dataPort = this._dataPorts[index];
                dataPort.remove();
                this._dataPorts.splice(index, 1);
                this.computeWidth();
            }
        };
        return UIBlock;
    }(UINode));
    return UIBlock;
});
