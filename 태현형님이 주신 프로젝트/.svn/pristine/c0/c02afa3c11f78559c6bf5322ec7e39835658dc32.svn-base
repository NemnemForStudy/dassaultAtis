/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUITemplatableBlock", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, UITemplatableBlock, UITemplateLibrary, UICommand, UICommandType, Events, ModelEnums, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI graph block.
     * @class UIGraphBlock
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIGraphBlock
     * @extends UIBlock
     * @private
     */
    var UIGraphBlock = /** @class */ (function (_super) {
        __extends(UIGraphBlock, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The graph that owns this block.
         * @param {GraphBlock} model - The block model.
         * @param {number} left - The left position of the block.
         * @param {number} top - The top position of the block.
         */
        function UIGraphBlock(graph, model, left, top) {
            var _this = _super.call(this, graph, model, left, top) || this;
            _this._onSubDataPortAddCB = _this._onSubDataPortAdd.bind(_this);
            _this._onSubDataPortRemoveCB = _this._onSubDataPortRemove.bind(_this);
            var jsonObjectModel = {};
            model.toJSON(jsonObjectModel);
            var jsonModel = JSON.stringify(jsonObjectModel);
            var jsonObjectDefinition = {};
            model.getDefinition().toJSON(jsonObjectDefinition);
            var jsonDefinition = JSON.stringify(jsonObjectDefinition, function (key, value) { return key === 'startupPort' ? undefined : value; });
            if (jsonModel === jsonDefinition) {
                // Add a default output control port
                model.createDynamicControlPort(ModelEnums.EControlPortType.eOutput, 'Out');
            }
            // The build from model exposes all sub data port sby default!
            // So we hide by default all the not linked sub data ports!
            // The JSON with sub data ports configuration is loaded afterwards by the fromJSON of the graph.
            _this._dataPorts.forEach(function (dataPort) { return dataPort.unexposeAllUISubDataPorts(); });
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
        UIGraphBlock.prototype.remove = function () {
            var _this = this;
            this._model.getDataPorts().forEach(function (dataPort) {
                if (dataPort.getType() !== ModelEnums.EDataPortType.eLocal) {
                    _this._removeDataPortListeners(dataPort);
                }
            });
            this._graphView = undefined;
            this._jsonUIGraph = undefined;
            this._onSubDataPortAddCB = undefined;
            this._onSubDataPortRemoveCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the graph block model.
         * @public
         * @returns {GraphBlock} The graph block model.
         */
        UIGraphBlock.prototype.getModel = function () {
            return _super.prototype.getModel.call(this);
        };
        /**
         * Projects the specified JSON object to the block.
         * @public
         * @param {IJSONGraphUI} iJSONBlock - The JSON projected block.
         */
        UIGraphBlock.prototype.fromJSON = function (iJSONBlock) {
            _super.prototype.fromJSON.call(this, iJSONBlock);
            this._dataPorts.forEach(function (dataPort, index) { return dataPort.fromJSON(iJSONBlock.dataPorts[index]); });
            this._jsonUIGraph = JSON.parse(JSON.stringify(iJSONBlock));
            delete this._jsonUIGraph.left;
            delete this._jsonUIGraph.top;
        };
        /**
         * Projects the block to the specified JSON object.
         * @public
         * @param {IJSONGraphUI} oJSONBlock - The JSON projected block.
         */
        UIGraphBlock.prototype.toJSON = function (oJSONBlock) {
            var _this = this;
            _super.prototype.toJSON.call(this, oJSONBlock);
            // Update the JSON with the current graph viewer content
            if (this._graphView !== undefined) {
                this._jsonUIGraph = {};
                this._graphView.toJSON(this._jsonUIGraph);
            }
            // Fill the oJSONBlock with copied properties (must keep oJSONBlock instance)!
            if (this._jsonUIGraph !== undefined) {
                Object.keys(this._jsonUIGraph).forEach(function (key) { oJSONBlock[key] = _this._jsonUIGraph[key]; });
            }
            // Updates the outside graph block sub data port exposition state
            this._dataPorts.forEach(function (dataPort, dp) {
                if (oJSONBlock.dataPorts[dp] === undefined) {
                    oJSONBlock.dataPorts[dp] = {
                        dataPorts: []
                    };
                }
                dataPort.getAllSubDataPorts().forEach(function (subDataPort, sdp) {
                    if (oJSONBlock.dataPorts[dp].dataPorts === undefined) {
                        oJSONBlock.dataPorts[dp].dataPorts = [];
                    }
                    if (oJSONBlock.dataPorts[dp].dataPorts[sdp] === undefined) {
                        oJSONBlock.dataPorts[dp].dataPorts[sdp] = { inside: { show: false } };
                    }
                    oJSONBlock.dataPorts[dp].dataPorts[sdp].outside = { show: subDataPort.isExposed() };
                });
            });
        };
        /**
         * The callback on the block double click event.
         * @public
         */
        UIGraphBlock.prototype.onBlockDblClick = function () {
            if (!this._model.isTemplate()) {
                this.openGraphBlockViewer();
                this._graph.getViewer().getEditor().getHistoryController().registerViewerChangeAction();
            }
        };
        /**
         * Flattens the graph block.
         * @public
         */
        UIGraphBlock.prototype.flattenGraphBlock = function () {
            Tools.createBlocksFromGraphBlock(this._model);
        };
        /**
         * Opens the graph block viewer.
         * @public
         */
        UIGraphBlock.prototype.openGraphBlockViewer = function () {
            if (!this._model.isTemplate()) {
                this._graph.getViewer().getEditor().getViewerController().createGraphBlockViewer(this);
            }
        };
        /**
         * Gets the block graph view if it is opened.
         * @public
         * @returns {UIGraph} The block graph view.
         */
        UIGraphBlock.prototype.getGraphView = function () {
            return this._graphView;
        };
        /**
         * Gets the JSON graph block UI.
         * @public
         * @returns {IJSONGraphUI} THe JSON graph block UI.
         */
        UIGraphBlock.prototype.getJSONGraphBlockUI = function () {
            return this._jsonUIGraph;
        };
        /**
         * Sets the graph view of this block.
         * @public
         * @param {UIGraph} graphView - The graph view of this block.
         */
        UIGraphBlock.prototype.setGraphView = function (graphView) {
            this._graphView = graphView;
            if (this._jsonUIGraph !== undefined) {
                this._graphView.fromJSONDataPorts(this._jsonUIGraph);
            }
            else {
                this._graphView.setDefaultBlocksPosition();
                this._graphView.unexposeAllDrawerSubDataPorts();
            }
        };
        /**
         * Checks whether the graph view is opened.
         * @public
         * @returns {boolean} True if the graph view is opened else false.
         */
        UIGraphBlock.prototype.isGraphViewOpened = function () {
            return this._graphView !== undefined;
        };
        /**
         * Removes the graph view of this block.
         * @public
         */
        UIGraphBlock.prototype.removeGraphView = function () {
            this._jsonUIGraph = {};
            this._graphView.toJSON(this._jsonUIGraph);
            this._graphView = undefined;
        };
        /**
         * Gets the internal sub data port exposed state.
         * @public
         * @param {number} dataPortIndex - The index of the data port.
         * @param {number} subDataPortIndex - The index of the sub data port.
         * @returns {boolean} True if the sub data port is exposed else false.
         */
        UIGraphBlock.prototype.getInternalSubDataPortExposedState = function (dataPortIndex, subDataPortIndex) {
            var state = false;
            if (this._jsonUIGraph !== undefined) {
                state = this._jsonUIGraph.dataPorts[dataPortIndex].dataPorts[subDataPortIndex].inside.show;
            }
            return state;
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
         * Gets the list of available templatable block related commands.
         * @private
         * @returns {UICommand[]} The list of available templatable block related commands.
         */
        UIGraphBlock.prototype._getCommandsFromTemplatableBlock = function () {
            var commands = _super.prototype._getCommandsFromTemplatableBlock.call(this);
            commands.unshift(new UICommand(UICommandType.eOpen, this.onBlockDblClick.bind(this)));
            commands.push(new UICommand(UICommandType.eFlattenGraph, this.flattenGraphBlock.bind(this)));
            return commands;
        };
        /**
         * Creates a local template from the block.
         * @protected
         */
        UIGraphBlock.prototype._createLocalTemplate = function () {
            if (!this._model.isTemplate()) {
                this._graph.getLocalTemplateLibrary().registerGraph(this);
            }
        };
        /**
         * Creates a global template from the block.
         * @protected
         */
        UIGraphBlock.prototype._createGlobalTemplate = function () {
            if (!this._model.isTemplate()) {
                UITemplateLibrary.registerGraph(this);
            }
        };
        /**
         * Converts the local template reference of the block to a global template reference.
         * @protected
         */
        UIGraphBlock.prototype._convertLocalTemplateToGlobalTemplate = function () {
            if (this._model.isLocalTemplate()) {
                var templateUid = this._model.getUid();
                UITemplateLibrary.registerGraphFromLocal(templateUid, this._graph.getGraphContext());
            }
        };
        /**
         * Edits the template reference.
         * This will impact all the template instances.
         * @protected
         */
        UIGraphBlock.prototype._editTemplateReference = function () {
            if (this._model.isTemplate()) {
                var isLocalTemplate = this._model.isLocalTemplate();
                var templateUid = this._model.getUid();
                var graphContext = this._graph.getGraphContext();
                this._graph.getViewer().getEditor().getViewerController().createGraphTemplateViewer(templateUid, isLocalTemplate, graphContext);
            }
        };
        /**
         * The callback on the model control port remove event.
         * @protected
         * @param {Events.ControlPortRemoveEvent} event - The model control port remove event.
         */
        UIGraphBlock.prototype._onControlPortRemove = function (event) {
            if (this._jsonUIGraph !== undefined && this._jsonUIGraph.controlPorts !== undefined) {
                // Removes the control port from the JSON to delete previous UI definition.
                var index = event.getIndex();
                if (index > -1) {
                    this._jsonUIGraph.controlPorts.splice(index, 1);
                }
            }
            _super.prototype._onControlPortRemove.call(this, event);
        };
        /**
         * The callback on the model data port add event.
         * @protected
         * @param {Events.DataPortAddEvent} event - The model data port add event.
         * @returns {boolean} True if the data port has been added else false.
         */
        UIGraphBlock.prototype._onDataPortAdd = function (event) {
            var result = _super.prototype._onDataPortAdd.call(this, event);
            var dataPortModel = event.getDataPort();
            if (dataPortModel.getType() !== ModelEnums.EDataPortType.eLocal) {
                this._addDataPortListeners(dataPortModel);
                if (this._jsonUIGraph !== undefined) {
                    var index = event.getIndex();
                    this._jsonUIGraph.dataPorts.splice(index, 0, { dataPorts: [] });
                }
            }
            return result;
        };
        /**
         * The callback on the model data port remove event.
         * @protected
         * @param {Events.DataPortRemoveEvent} event - The model data port remove event.
         * @returns {boolean} True if the data port has been removed else false.
         */
        UIGraphBlock.prototype._onDataPortRemove = function (event) {
            var dataPortModel = event.getDataPort();
            if (dataPortModel.getType() !== ModelEnums.EDataPortType.eLocal) {
                this._removeDataPortListeners(dataPortModel);
                if (this._jsonUIGraph !== undefined) {
                    var index = event.getIndex();
                    this._jsonUIGraph.dataPorts.splice(index, 1);
                }
            }
            return _super.prototype._onDataPortRemove.call(this, event);
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
         * Sdds listeners on the provided model data port.
         * @private
         * @param {DataPort} dataPortModel - The model data port.
         */
        UIGraphBlock.prototype._addDataPortListeners = function (dataPortModel) {
            dataPortModel.addListener(Events.DataPortAddEvent, this._onSubDataPortAddCB);
            dataPortModel.addListener(Events.DataPortRemoveEvent, this._onSubDataPortRemoveCB);
        };
        /**
         * Removes listeners from the provided model data port.
         * @private
         * @param {DataPort} dataPortModel - The model data port.
         */
        UIGraphBlock.prototype._removeDataPortListeners = function (dataPortModel) {
            dataPortModel.removeListener(Events.DataPortAddEvent, this._onSubDataPortAddCB);
            dataPortModel.removeListener(Events.DataPortRemoveEvent, this._onSubDataPortRemoveCB);
        };
        /**
         * The callback on the sub data port add event.
         * @private
         * @param {Events.DataPortAddEvent} event - The model sub data port add event.
         */
        UIGraphBlock.prototype._onSubDataPortAdd = function (event) {
            if (this._jsonUIGraph !== undefined) {
                var subDataPortModel = event.getDataPort();
                if (subDataPortModel.dataPort !== undefined) { // Fix model to ignore main data port
                    var parentDataPortModel = subDataPortModel.dataPort;
                    var parentIndex = parentDataPortModel.block.getDataPorts().indexOf(parentDataPortModel);
                    var index = event.getIndex();
                    var isInside = this.isGraphViewOpened();
                    this._jsonUIGraph.dataPorts[parentIndex].dataPorts.splice(index, 0, {
                        outside: !isInside ? { show: true } : undefined,
                        inside: isInside ? { show: true } : undefined
                    });
                }
            }
        };
        /**
         * The callback on the sub data port remove event.
         * @private
         * @param {Events.DataPortRemoveEvent} event - The model sub data port remove event.
         */
        UIGraphBlock.prototype._onSubDataPortRemove = function (event) {
            if (this._jsonUIGraph !== undefined) {
                var subDataPortModel = event.getDataPort();
                if (subDataPortModel.dataPort !== undefined) { // Fix model to ignore main data port
                    var parentDataPortModel = subDataPortModel.dataPort;
                    var parentIndex = parentDataPortModel.block.getDataPorts().indexOf(parentDataPortModel);
                    var index = event.getIndex();
                    this._jsonUIGraph.dataPorts[parentIndex].dataPorts.splice(index, 1);
                }
            }
        };
        return UIGraphBlock;
    }(UITemplatableBlock));
    return UIGraphBlock;
});
