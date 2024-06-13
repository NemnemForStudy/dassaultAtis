/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsLocalTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsNodeIdSelector", "DS/EPSSchematicsModelWeb/EPSSchematicsDataLink", "DS/EPSSchematicsModelWeb/EPSSchematicsControlLink", "DS/EPSSchematicsModelWeb/EPSSchematicsLocalTemplateLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsInvalidBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter"], function (require, exports, DynamicBlock, Block, LocalTypeLibrary, TypeLibrary, BlockLibrary, NodeIdSelector, DataLink, ControlLink, LocalTemplateLibrary, ControlPortDefinitions, SettingDefinitions, Enums, InvalidBlock, Events, Tools, JSONConverter) {
    "use strict";
    var GraphBlock = /** @class */ (function (_super) {
        __extends(GraphBlock, _super);
        function GraphBlock() {
            var _this = _super.call(this) || this;
            _this.nodeIdSelectors = [];
            _this.nodeIdSelectorsByName = {};
            _this.blocks = [];
            _this.dataLinks = [];
            _this.controlLinks = [];
            _this.localTemplateLibrary = new LocalTemplateLibrary();
            var controlPort = _this.createControlPort(new ControlPortDefinitions.Input('In'));
            controlPort.setRenamable(true);
            _this.setStartupPort(controlPort);
            _this.createSetting(new SettingDefinitions.Basic('CastLevel', 'ECastLevel', Enums.ECastLevel.eLossless));
            _this.setSettingRules({ dynamicCount: 0 });
            return _this;
        }
        /**
         * Construct graph block from JSON.
         * @private
         * @param {IJSONGraphBlock} iJSONGraphBlock - JSON graph block.
         */
        GraphBlock.prototype.fromJSON = function (iJSONGraphBlock) {
            _super.prototype.fromJSON.call(this, iJSONGraphBlock);
            this.fromJSONStartupPort(iJSONGraphBlock);
            this.fromJSONNodeIdSelectors(iJSONGraphBlock);
            this.fromJSONBlocks(iJSONGraphBlock);
            this.fromJSONLinks(iJSONGraphBlock);
        };
        GraphBlock.prototype.fromJSONStartupPort = function (iJSONGraphBlock) {
            if (iJSONGraphBlock.startupPort !== undefined) {
                var startupPort = this.getObjectFromPath(iJSONGraphBlock.startupPort);
                this.setStartupPort(startupPort);
            }
        };
        GraphBlock.prototype.fromJSONNodeIdSelectors = function (iJSONGraphBlock) {
            var nis = 0;
            while (nis < iJSONGraphBlock.nodeIdSelectors.length || nis < this.nodeIdSelectors.length) {
                var jsonNodeIdSelector = iJSONGraphBlock.nodeIdSelectors[nis];
                var nodeIdSelector = this.nodeIdSelectors[nis];
                if (jsonNodeIdSelector === undefined) {
                    this.removeNodeIdSelector(nodeIdSelector);
                    continue;
                }
                else {
                    if (nodeIdSelector === undefined) {
                        nodeIdSelector = this.createNodeIdSelector();
                    }
                    nodeIdSelector.fromJSON(jsonNodeIdSelector);
                }
                nis++;
            }
        };
        GraphBlock.prototype.fromJSONBlocks = function (iJSONGraphBlock) {
            var b = 0;
            while (b < iJSONGraphBlock.blocks.length || b < this.blocks.length) {
                var jsonBlock = iJSONGraphBlock.blocks[b];
                var block = this.blocks[b];
                if (jsonBlock === undefined) {
                    this.removeBlock(block);
                    continue;
                }
                else {
                    var jsonUid = jsonBlock.definition.uid;
                    if (block === undefined) {
                        block = this.createBlock(jsonUid);
                        if (block === undefined) {
                            block = new InvalidBlock();
                            this.addBlock(block);
                        }
                    }
                    else {
                        var uid = block.getUid();
                        if (jsonUid !== uid) {
                            this.removeBlock(block);
                            continue;
                        }
                    }
                    block.fromJSON(jsonBlock);
                }
                b++;
            }
        };
        GraphBlock.prototype.fromJSONLinks = function (iJSONGraphBlock) {
            var dl = 0;
            while (dl < iJSONGraphBlock.dataLinks.length || dl < this.dataLinks.length) {
                var jsonDataLink = iJSONGraphBlock.dataLinks[dl];
                var dataLink = this.dataLinks[dl];
                if (jsonDataLink === undefined) {
                    this.removeDataLink(dataLink);
                    continue;
                }
                else {
                    var jsonStartPort = this.getObjectFromPath(jsonDataLink.startPort);
                    var jsonEndPort = this.getObjectFromPath(jsonDataLink.endPort);
                    if (dataLink === undefined) {
                        dataLink = this.createDataLink(jsonStartPort, jsonEndPort);
                        if (dataLink === undefined) {
                            dataLink = this.createInvalidDataLink(jsonStartPort, jsonEndPort);
                        }
                    }
                    else {
                        var startPort = dataLink.getStartPort();
                        var endPort = dataLink.getEndPort();
                        if (jsonStartPort !== startPort || jsonEndPort !== endPort) {
                            this.removeDataLink(dataLink);
                            continue;
                        }
                    }
                    dataLink.fromJSON(jsonDataLink);
                }
                dl++;
            }
            var cl = 0;
            while (cl < iJSONGraphBlock.controlLinks.length || cl < this.controlLinks.length) {
                var jsonControlLink = iJSONGraphBlock.controlLinks[cl];
                var controlLink = this.controlLinks[cl];
                if (jsonControlLink === undefined) {
                    this.removeControlLink(controlLink);
                    continue;
                }
                else {
                    var jsonStartPort = this.getObjectFromPath(jsonControlLink.startPort);
                    var jsonEndPort = this.getObjectFromPath(jsonControlLink.endPort);
                    if (controlLink === undefined) {
                        controlLink = this.createControlLink(jsonStartPort, jsonEndPort);
                        if (controlLink === undefined) {
                            controlLink = this.createInvalidControlLink(jsonStartPort, jsonEndPort);
                        }
                    }
                    else {
                        var startPort = controlLink.getStartPort();
                        var endPort = controlLink.getEndPort();
                        if (jsonStartPort !== startPort || jsonEndPort !== endPort) {
                            this.removeControlLink(controlLink);
                            continue;
                        }
                    }
                    controlLink.fromJSON(jsonControlLink);
                }
                cl++;
            }
        };
        /**
         * Construct JSON from graph block.
         * @private
         * @param {IJSONGraphBlock} oJSONGraphBlock - The JSON graph block.
         */
        GraphBlock.prototype.toJSON = function (oJSONGraphBlock) {
            _super.prototype.toJSON.call(this, oJSONGraphBlock);
            var startupPort = this.getStartupPort();
            if (startupPort !== undefined) {
                oJSONGraphBlock.startupPort = startupPort.toPath(this);
            }
            oJSONGraphBlock.nodeIdSelectors = [];
            oJSONGraphBlock.blocks = [];
            oJSONGraphBlock.dataLinks = [];
            oJSONGraphBlock.controlLinks = [];
            for (var nis = 0; nis < this.nodeIdSelectors.length; nis++) {
                var nodeIdSelector = {};
                this.nodeIdSelectors[nis].toJSON(nodeIdSelector);
                oJSONGraphBlock.nodeIdSelectors.push(nodeIdSelector);
            }
            for (var b = 0; b < this.blocks.length; b++) {
                var block = {};
                this.blocks[b].toJSON(block);
                oJSONGraphBlock.blocks.push(block);
            }
            for (var dl = 0; dl < this.dataLinks.length; dl++) {
                var dataLink = {};
                this.dataLinks[dl].toJSON(dataLink);
                oJSONGraphBlock.dataLinks.push(dataLink);
            }
            for (var cl = 0; cl < this.controlLinks.length; cl++) {
                var controlLink = {};
                this.controlLinks[cl].toJSON(controlLink);
                oJSONGraphBlock.controlLinks.push(controlLink);
            }
        };
        /**
         * This factory creates a graph instance from the specified JSON.
         * @protected
         * @param {string|Object} json - The JSON string or object representing the graph model.
         * @return {GraphBlock} The graph instance.
         */
        GraphBlock.createGraph = function (json) {
            if (typeof json === 'string') {
                json = JSON.parse(json);
            }
            JSONConverter.convertGraph(json);
            var GraphBlockCtor = BlockLibrary.getBlock(json.model.definition.uid).constructor;
            var graph = new GraphBlockCtor();
            graph.buildFromJSONObject(json);
            return graph;
        };
        /**
         * This method generates the graph model JSON object.
         * @protected
         * @return {IJSONGraph} The JSON object structure representing the graph model.
         */
        GraphBlock.prototype.generateJSONObject = function () {
            var jsonObject = {};
            jsonObject.version = Tools.version;
            jsonObject.model = {};
            this.toJSON(jsonObject.model);
            jsonObject.templates = {};
            jsonObject.templates.model = {};
            jsonObject.types = {};
            jsonObject.types.model = {};
            this.getGraphContext().localTemplateLibrary.toJSON(jsonObject.templates.model);
            TypeLibrary.toLocalCustomJSON(this.getGraphContext(), jsonObject.types.model);
            return jsonObject;
        };
        /**
         * This method generates the graph model JSON object.
         * @protected
         * @return {string} The JSON string representing the graph model.
         */
        GraphBlock.prototype.generateJSON = function () {
            return JSON.stringify(this.generateJSONObject());
        };
        /**
         * This method builds the graph model from the specified JSON object.
         * @protected
         * @param {IJSONGraph} jsonObject - The JSON object structure representing the graph model.
         */
        GraphBlock.prototype.buildFromJSONObject = function (jsonObject) {
            JSONConverter.convertGraph(jsonObject);
            if (this.getGraphContext() === this) {
                TypeLibrary.fromLocalCustomJSON(this, jsonObject.types.model);
                this.localTemplateLibrary.fromJSON(jsonObject.templates.model);
            }
            this.fromJSON(jsonObject.model);
        };
        /**
         * This method builds the graph model from the specified JSON string.
         * @protected
         * @param {string} json - The JSON string representing the graph model.
         */
        GraphBlock.prototype.buildFromJSON = function (json) {
            this.buildFromJSONObject(JSON.parse(json));
        };
        /**
         * Set input test values.
         * @private
         * @param {Object} iInputTestValues - The input test values to set.
         */
        GraphBlock.prototype.setInputTestValues = function (iInputTestValues) {
            var dataPortNames = Object.keys(iInputTestValues);
            for (var dpn = 0; dpn < dataPortNames.length; dpn++) {
                var dataPortName = dataPortNames[dpn];
                var dataPort = this.getDataPortByName(dataPortName);
                if (dataPort !== undefined && dataPort.getType() === Enums.EDataPortType.eInput) {
                    dataPort.setTestValues(iInputTestValues[dataPortName]);
                }
            }
        };
        /**
         * Get input test values.
         * @private
         * @return {Object} The input test values.
         */
        GraphBlock.prototype.getInputTestValues = function () {
            var inputTestValues = {};
            var dataPorts = this.getDataPorts(Enums.EDataPortType.eInput);
            for (var dp = 0; dp < dataPorts.length; dp++) {
                var dataPort = dataPorts[dp];
                inputTestValues[dataPort.getName()] = dataPort.getTestValues();
            }
            return inputTestValues;
        };
        /**
         * Set output test values.
         * @private
         * @param {Object} iOutputTestValues - The output test values to set.
         */
        GraphBlock.prototype.setOutputTestValues = function (iOutputTestValues) {
            var dataPortNames = Object.keys(iOutputTestValues);
            for (var dpn = 0; dpn < dataPortNames.length; dpn++) {
                var dataPortName = dataPortNames[dpn];
                var dataPort = this.getDataPortByName(dataPortName);
                if (dataPort !== undefined && dataPort.getType() === Enums.EDataPortType.eOutput) {
                    dataPort.setTestValues(iOutputTestValues[dataPortName]);
                }
            }
        };
        /**
         * Get output test values.
         * @private
         * @return {Object} The output test values.
         */
        GraphBlock.prototype.getOutputTestValues = function () {
            var inputTestValues = {};
            var dataPorts = this.getDataPorts(Enums.EDataPortType.eOutput);
            for (var dp = 0; dp < dataPorts.length; dp++) {
                var dataPort = dataPorts[dp];
                inputTestValues[dataPort.getName()] = dataPort.getTestValues();
            }
            return inputTestValues;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        GraphBlock.prototype.getGraphContext = function () {
            return _super.prototype.getGraphContext.call(this) || this;
        };
        /**
         * Get the local type library (create it if necessary).
         * @private
         * @returns {LocalTypeLibrary} THe local type library.
         */
        GraphBlock.prototype.getLocalTypeLibrary = function () {
            this.localTypeLibrary = this.localTypeLibrary || new LocalTypeLibrary();
            return this.localTypeLibrary;
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} True if valid, false otherwise.
         */
        GraphBlock.prototype.computeValidity = function () {
            var result = _super.prototype.computeValidity.call(this);
            result = result && this.blocks.every(function (block) { return block.isValid(); });
            result = result && this.controlLinks.every(function (controlLink) { return controlLink.isValid(); });
            result = result && this.dataLinks.every(function (dataLink) { return dataLink.isValid(); });
            return result;
        };
        /**
         * Is global templatable.
         * @private
         * @return {boolean} True if global templatable, false otherwise.
         */
        GraphBlock.prototype.isGlobalTemplatable = function () {
            var result = this.isValid();
            result = result && !this.isFromTemplate();
            result = result && this.hasDefinition();
            result = result && !this.hasLocalTemplate();
            result = result && !this.hasLocalCustomType();
            return result;
        };
        /**
         * Is local templatable.
         * @private
         * @return {boolean} True if local templatable, false otherwise.
         */
        GraphBlock.prototype.isLocalTemplatable = function () {
            var result = this.isValid();
            result = result && !this.isFromTemplate();
            result = result && this.hasDefinition();
            result = result && this.getGraphContext() !== this;
            result = result && !this.hasLocalCustomType();
            return result;
        };
        /**
         * Has local template.
         * @private
         * @return {boolean} True if graph block has local template, false otherwise.
         */
        GraphBlock.prototype.hasLocalTemplate = function () {
            var result = this.blocks.some(function (block) { return block.isLocalTemplate() || block.hasLocalTemplate(); });
            return result;
        };
        /**
         * Has local custom type.
         * @private
         * @return {boolean} True if graph block has local custom type, false otherwise.
         */
        GraphBlock.prototype.hasLocalCustomType = function () {
            var result = _super.prototype.hasLocalCustomType.call(this);
            result = result || this.blocks.some(function (block) { return block.hasLocalCustomType(); });
            return result;
        };
        /**
         * Template.
         * @private
         * @param {string} iUid - The template Uid.
         * @return {boolean} True if the graph block has been templatised, false otherwise.
         */
        GraphBlock.prototype.template = function (iUid) {
            var result = false;
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            var jsonObjectGraph = {};
            this.toJSON(jsonObjectGraph);
            var jsonGraph = JSON.stringify(jsonObjectGraph);
            var jsonObjectTemplate = TemplateLibrary.getJSONObjectGraph(iUid);
            if (jsonObjectTemplate !== undefined) {
                result = this.isGlobalTemplatable();
                result = result && jsonGraph === JSON.stringify(jsonObjectTemplate);
            }
            else {
                jsonObjectTemplate = TemplateLibrary.getJSONObjectLocalGraph(this.getGraphContext(), iUid);
                result = this.isLocalTemplatable();
                result = result && jsonGraph === JSON.stringify(jsonObjectTemplate);
            }
            if (result) {
                var TemplateGraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock');
                TemplateGraphBlockCtor.prototype.template.call(this, iUid);
                var event_1 = new Events.BlockTemplateChangeEvent();
                event_1.block = this;
                event_1.index = this.getIndex();
                this.dispatchEvent(event_1);
            }
            return result;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The name to check.
         * @return {boolean} True if name is settable, false otherwise
         */
        GraphBlock.prototype.isNameSettable = function (iName) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
            }
            return result;
        };
        /**
         * Is description settable.
         * @private
         * @param {string} [iDescription] - The description to check.
         * @return {boolean} True if the description is settable, false otherwise.
         */
        GraphBlock.prototype.isDescriptionSettable = function (iDescription) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (arguments.length !== 0) {
                result = result && typeof iDescription === 'string';
                result = result && iDescription.length !== 0;
                result = result && iDescription !== this.description;
            }
            return result;
        };
        /**
         * Is startup port settable
         *
         * @private
         * @param {ControlPort} [iControlPort] - The port to check.
         * @return {boolean} True if the port is settable, false otherwise
         */
        GraphBlock.prototype.isStartupPortSettable = function (iControlPort) {
            var result = this.graph === undefined;
            result = result && this.controlPorts.length > 0;
            if (this.startupPort !== undefined) {
                result = result && this.controlPorts.length > 1;
            }
            if (arguments.length !== 0) {
                result = result && iControlPort.getType() === Enums.EControlPortType.eInput;
                result = result && this.hasControlPort(iControlPort);
                result = result && iControlPort !== this.startupPort;
            }
            return result;
        };
        /**
         * Set startup port
         * @private
         * @param {ControlPort} iControlPort - The port to set.
         * @return {boolean} True if the port has been set, false otherwise.
         */
        GraphBlock.prototype.setStartupPort = function (iControlPort) {
            var result = arguments.length === 1;
            result = result && this.isStartupPortSettable(iControlPort);
            if (result) {
                this.startupPort = iControlPort;
                var event_2 = new Events.BlockStartupPortChangeEvent();
                event_2.block = this;
                event_2.index = this.getIndex();
                event_2.startupPort = this.startupPort;
                this.dispatchEvent(event_2);
            }
            return result;
        };
        /**
         * Get startup port
         * @private
         * @return {ControlPort} The startup port.
         */
        GraphBlock.prototype.getStartupPort = function () {
            return this.startupPort;
        };
        /**
         * Is control port removable.
         * @private
         * @param {ControlPort} iControlPort - The control port to check.
         * @return {boolean} True if the control port is removable, false otherwise.
         */
        GraphBlock.prototype.isControlPortRemovable = function (iControlPort) {
            var result = _super.prototype.isControlPortRemovable.call(this, iControlPort);
            result = result && iControlPort !== this.startupPort;
            return result;
        };
        /**
         * On add.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        GraphBlock.prototype.onAdd = function (iGraphBlock) {
            this.onGraphContextOut();
            this.startupPort = undefined;
            _super.prototype.onAdd.call(this, iGraphBlock);
        };
        /**
         * On remove.
         * @private
         * @param {GraphBlock} iGraphBlock - The graph block.
         */
        GraphBlock.prototype.onRemove = function (iGraphBlock) {
            _super.prototype.onRemove.call(this, iGraphBlock);
            this.setStartupPort(this.controlPorts[0]);
            this.onGraphContextIn();
        };
        /**
         * On graph context in.
         * @private
         */
        GraphBlock.prototype.onGraphContextIn = function () {
            _super.prototype.onGraphContextIn.call(this);
            for (var nis = 0; nis < this.nodeIdSelectors.length; nis++) {
                this.nodeIdSelectors[nis].onGraphContextIn();
            }
            for (var b = 0; b < this.blocks.length; b++) {
                this.blocks[b].onGraphContextIn();
            }
            for (var dl = 0; dl < this.dataLinks.length; dl++) {
                this.dataLinks[dl].onGraphContextIn();
            }
            for (var cl = 0; cl < this.controlLinks.length; cl++) {
                this.controlLinks[cl].onGraphContextIn();
            }
        };
        /**
         * On graph context out.
         * @private
         */
        GraphBlock.prototype.onGraphContextOut = function () {
            _super.prototype.onGraphContextOut.call(this);
            for (var nis = 0; nis < this.nodeIdSelectors.length; nis++) {
                this.nodeIdSelectors[nis].onGraphContextOut();
            }
            for (var b = 0; b < this.blocks.length; b++) {
                this.blocks[b].onGraphContextOut();
            }
            for (var dl = 0; dl < this.dataLinks.length; dl++) {
                this.dataLinks[dl].onGraphContextOut();
            }
            for (var cl = 0; cl < this.controlLinks.length; cl++) {
                this.controlLinks[cl].onGraphContextOut();
            }
        };
        GraphBlock.prototype.getNewNodeIdSelectorName = function (iName) {
            var index = 1;
            var name = iName + String(index);
            while (this.nodeIdSelectorsByName[name] !== undefined) {
                index++;
                name = iName + String(index);
            }
            return name;
        };
        /**
         * Create nodeId selector.
         * @private
         * @return {NodeIdSelector} The created nodeId selector.
         */
        GraphBlock.prototype.createNodeIdSelector = function () {
            var nodeIdSelector = new NodeIdSelector();
            nodeIdSelector.setName(this.getNewNodeIdSelectorName('NodeIdSelector'));
            nodeIdSelector.setPool('PoolName');
            nodeIdSelector = this.addNodeIdSelector(nodeIdSelector) ? nodeIdSelector : undefined;
            return nodeIdSelector;
        };
        /**
         * Is nodeId selector addable.
         * @private
         * @param {NodeIdSelector} iNodeIdSelector - The nodeId selector to check.
         * @return {boolean} True if the nodeId selector is addable, false otherwise.
         */
        GraphBlock.prototype.isNodeIdSelectorAddable = function (iNodeIdSelector) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iNodeIdSelector instanceof NodeIdSelector;
            result = result && iNodeIdSelector.name !== undefined;
            result = result && iNodeIdSelector.pool !== undefined;
            result = result && iNodeIdSelector.graph === undefined;
            result = result && !this.hasNodeIdSelector(iNodeIdSelector);
            result = result && !this.hasNodeIdSelectorName(iNodeIdSelector.name);
            return result;
        };
        /**
         * Add nodeId selector.
         * @private
         * @param {NodeIdSelector} iNodeIdSelector - The nodeId selector to add.
         * @return {boolean} True if the nodeId selector has been added, false otherwise.
         */
        GraphBlock.prototype.addNodeIdSelector = function (iNodeIdSelector) {
            var result = this.isNodeIdSelectorAddable(iNodeIdSelector);
            if (result) {
                this.nodeIdSelectors.push(iNodeIdSelector);
                this.nodeIdSelectorsByName[iNodeIdSelector.name] = iNodeIdSelector;
                iNodeIdSelector.onAdd(this);
                var event_3 = new Events.NodeIdSelectorAddEvent();
                event_3.nodeIdSelector = iNodeIdSelector;
                event_3.index = iNodeIdSelector.getIndex();
                this.dispatchEvent(event_3);
            }
            return result;
        };
        /**
         * Remove nodeId selector.
         * @private
         * @param {NodeIdSelector} iNodeIdSelector - The nodeId selector to remove.
         * @return {boolean} True if the nodeId selector has been removed, false otherwise.
         */
        GraphBlock.prototype.removeNodeIdSelector = function (iNodeIdSelector) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iNodeIdSelector.graph === this;
            result = result && this.hasNodeIdSelector(iNodeIdSelector);
            if (result) {
                var index = iNodeIdSelector.getIndex();
                iNodeIdSelector.onRemove();
                delete this.nodeIdSelectorsByName[iNodeIdSelector.name];
                this.nodeIdSelectors.splice(index, 1);
                iNodeIdSelector.graph = undefined;
                var event_4 = new Events.NodeIdSelectorRemoveEvent();
                event_4.nodeIdSelector = iNodeIdSelector;
                event_4.index = index;
                this.dispatchEvent(event_4);
            }
            return result;
        };
        /**
         * Has nodeId selector.
         * @private
         * @param {NodeIdSelector} iNodeIdSelector - The nodeId selector to check.
         * @return {boolean} True if the graph block has the nodeId selector, false otherwise.
         */
        GraphBlock.prototype.hasNodeIdSelector = function (iNodeIdSelector) {
            return this.nodeIdSelectors.indexOf(iNodeIdSelector) !== -1;
        };
        /**
         * Has nodeId selector name.
         * @private
         * @param {string} iName - The name to check.
         * @return {boolean} True if the graph block has the nodeId selector name, false otherwise.
         */
        GraphBlock.prototype.hasNodeIdSelectorName = function (iName) {
            return this.nodeIdSelectorsByName[iName] !== undefined;
        };
        /**
         * Get nodeId selector by name.
         * @private
         * @param {string} iName - The nodeId selector name.
         * @return {NodeIdSelector} The corresponding nodeId selector.
         */
        GraphBlock.prototype.getNodeIdSelectorByName = function (iName) {
            return this.nodeIdSelectorsByName[iName];
        };
        /**
         * Get nodeId selectors.
         * @private
         * @return {NodeIdSelector[]} The list of nodeId selectors.
         */
        GraphBlock.prototype.getNodeIdSelectors = function () {
            return this.nodeIdSelectors.slice(0);
        };
        /**
         * Create and add block.
         * @private
         * @param {string} iUid - The Uid of the block.
         * @return {Block} The created block.
         */
        GraphBlock.prototype.createBlock = function (iUid) {
            var result = false;
            var block;
            var blockDefinition = BlockLibrary.getBlock(iUid);
            if (blockDefinition !== undefined) {
                var BlockCtor = blockDefinition.constructor;
                block = new BlockCtor();
                result = this.addBlock(block);
            }
            else {
                var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
                if (TemplateLibrary.hasGraph(iUid) || (this.getGraphContext() !== undefined && TemplateLibrary.hasLocalGraph(this.getGraphContext(), iUid))) {
                    var TemplateGraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock');
                    block = new TemplateGraphBlockCtor(iUid, this.getGraphContext());
                    block.graphContext = this.getGraphContext();
                    block.template(iUid);
                    block.graphContext = undefined;
                    result = this.addBlock(block);
                }
                else if (TemplateLibrary.hasScript(iUid) || (this.getGraphContext() !== undefined && TemplateLibrary.hasLocalScript(this.getGraphContext(), iUid))) {
                    var TemplateGraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateScriptBlock');
                    block = new TemplateGraphBlockCtor(iUid, this.getGraphContext());
                    block.graphContext = this.getGraphContext();
                    block.template(iUid);
                    block.graphContext = undefined;
                    result = this.addBlock(block);
                }
            }
            return result ? block : undefined;
        };
        /**
         * Add block.
         * @private
         * @param {Block} iBlock - The block to add.
         * @return {boolean} True if the block has been added, false otherwise
         */
        GraphBlock.prototype.addBlock = function (iBlock) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iBlock instanceof Block;
            result = result && iBlock.graph === undefined;
            result = result && !this.hasBlock(iBlock);
            if (result) {
                this.blocks.push(iBlock);
                iBlock.onAdd(this);
                var event_5 = new Events.BlockAddEvent();
                event_5.block = iBlock;
                event_5.index = iBlock.getIndex();
                this.dispatchEvent(event_5);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Remove block.
         * @private
         * @param {Block} iBlock - The block to remove.
         * @return {boolean} True if the block has been removed, false otherwise.
         */
        GraphBlock.prototype.removeBlock = function (iBlock) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iBlock.graph === this;
            result = result && this.hasBlock(iBlock);
            if (result) {
                var index = iBlock.getIndex();
                iBlock.onRemove(this);
                this.blocks.splice(index, 1);
                var event_6 = new Events.BlockRemoveEvent();
                event_6.block = iBlock;
                event_6.index = index;
                this.dispatchEvent(event_6);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Has block.
         * @private
         * @param {Block} iBlock - The block to check.
         * @return {boolean} True if the graph block has the block, false otherwise.
         */
        GraphBlock.prototype.hasBlock = function (iBlock) {
            return this.blocks.indexOf(iBlock) !== -1;
        };
        /**
         * Get blocks.
         * @private
         * @return {Block[]} The list of blocks.
         */
        GraphBlock.prototype.getBlocks = function () {
            return this.blocks.slice(0);
        };
        /**
         * Is data linkable.
         * @private
         * @param {DataPort} iPort1 - The first data port.
         * @param {DataPort} iPort2 - The second data port.
         * @param {DataLink[]} [iLinksToReroute] - The list of data links to reroute.
         * @param {boolean} [iWithChange] - True to authorize value type change, false otherwise.
         * @return {boolean} True if the data ports are linkable, false otherwise.
         */
        GraphBlock.prototype.isDataLinkable = function (iPort1, iPort2, iLinksToReroute, iWithChange) {
            var dataLink = new DataLink();
            return dataLink.isLinkable(iPort1, iPort2, this, iLinksToReroute, iWithChange);
        };
        /**
         * Create invalid data link.
         * @private
         * @param {DataPort} iPort1 - The first data port.
         * @param {DataPort} iPort2 - The second data port.
         * @return {DataLink} The created invalid data link.
         */
        GraphBlock.prototype.createInvalidDataLink = function (iPort1, iPort2) {
            var dataLink = new DataLink();
            dataLink.valid = false;
            dataLink = dataLink.link(iPort1, iPort2, this) ? dataLink : undefined;
            return dataLink;
        };
        /**
         * Create data link.
         * @private
         * @param {DataPort} iPort1 - The first data port.
         * @param {DataPort} iPort2 - The second data port.
         * @param {boolean} [iWithChange] - True to authorize value type change, false otherwise.
         * @return {DataLink} The created data link.
         */
        GraphBlock.prototype.createDataLink = function (iPort1, iPort2, iWithChange) {
            var dataLink = new DataLink();
            dataLink = dataLink.link(iPort1, iPort2, this, iWithChange) ? dataLink : undefined;
            return dataLink;
        };
        /**
         * Add data link.
         * @private
         * @param {DataLink} iDataLink - The data link to add.
         * @return {boolean} True if the data link was added, false otherwise.
         */
        GraphBlock.prototype.addDataLink = function (iDataLink) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iDataLink instanceof DataLink;
            result = result && iDataLink.graph === undefined;
            result = result && !this.hasDataLink(iDataLink);
            if (result) {
                this.dataLinks.push(iDataLink);
                iDataLink.onAdd(this);
                var event_7 = new Events.DataLinkAddEvent();
                event_7.dataLink = iDataLink;
                event_7.index = this.dataLinks.length - 1;
                this.dispatchEvent(event_7);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Remove data link.
         * @private
         * @param {DataLink} iDataLink - The data link to remove.
         * @return {boolean} True if the data link was removed, false otherwise.
         */
        GraphBlock.prototype.removeDataLink = function (iDataLink) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iDataLink.graph === this;
            result = result && this.hasDataLink(iDataLink);
            if (result) {
                var index = iDataLink.getIndex();
                iDataLink.onRemove(this);
                this.dataLinks.splice(index, 1);
                var event_8 = new Events.DataLinkRemoveEvent();
                event_8.dataLink = iDataLink;
                event_8.index = index;
                this.dispatchEvent(event_8);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Has data link.
         * @private
         * @param {DataLink} iDataLink - The data link to check.
         * @return {boolean} True if the graph block has the data link, false otherwise.
         */
        GraphBlock.prototype.hasDataLink = function (iDataLink) {
            return this.dataLinks.indexOf(iDataLink) !== -1;
        };
        /**
         * Get data links.
         * @private
         * @return {DataLink[]} The data links.
         */
        GraphBlock.prototype.getDataLinks = function () {
            return this.dataLinks.slice(0);
        };
        /**
         * Is control linkable.
         * @private
         * @param {ControlPort} iPort1 - The first control port.
         * @param {ControlPort} iPort2 - The second control port.
         * @return {boolean} True if the control ports are linkable, false otherwise.
         */
        GraphBlock.prototype.isControlLinkable = function (iPort1, iPort2) {
            var controlLink = new ControlLink();
            return controlLink.isLinkable(iPort1, iPort2, this);
        };
        GraphBlock.prototype.createInvalidControlLink = function (iPort1, iPort2) {
            var controlLink = new ControlLink();
            controlLink.valid = false;
            controlLink = controlLink.link(iPort1, iPort2, this) ? controlLink : undefined;
            return controlLink;
        };
        /**
         * Create control link.
         * @private
         * @param {ControlPort} iPort1 - The first control port.
         * @param {ControlPort} iPort2 - The second control port.
         * @return {ControlLink} The created control link.
         */
        GraphBlock.prototype.createControlLink = function (iPort1, iPort2) {
            var controlLink = new ControlLink();
            controlLink = controlLink.link(iPort1, iPort2, this) ? controlLink : undefined;
            return controlLink;
        };
        /**
         * Add control link.
         * @private
         * @param {ControlLink} iControlLink - The control link to add.
         * @return {boolean} True if the control link has been added, false otherwise.
         */
        GraphBlock.prototype.addControlLink = function (iControlLink) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iControlLink instanceof ControlLink;
            result = result && iControlLink.graph === undefined;
            result = result && !this.hasControlLink(iControlLink);
            if (result) {
                this.controlLinks.push(iControlLink);
                iControlLink.onAdd(this);
                var event_9 = new Events.ControlLinkAddEvent();
                event_9.controlLink = iControlLink;
                event_9.index = iControlLink.getIndex();
                this.dispatchEvent(event_9);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Remove control link.
         * @private
         * @param {ControlLink} iControlLink - The control link to remove.
         * @return {boolean} True if the control link has been removed, false otherwise.
         */
        GraphBlock.prototype.removeControlLink = function (iControlLink) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && iControlLink.graph === this;
            result = result && this.hasControlLink(iControlLink);
            if (result) {
                var index = iControlLink.getIndex();
                iControlLink.onRemove(this);
                this.controlLinks.splice(index, 1);
                var event_10 = new Events.ControlLinkRemoveEvent();
                event_10.controlLink = iControlLink;
                event_10.index = index;
                this.dispatchEvent(event_10);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Has control link.
         * @private
         * @param {ControlLink} iControlLink - The control link to check.
         * @return {boolean} True if the graph block has the control link, false otherwise.
         */
        GraphBlock.prototype.hasControlLink = function (iControlLink) {
            return this.controlLinks.indexOf(iControlLink) !== -1;
        };
        /**
         * Get control links.
         * @private
         * @return {ControlLink[]} The list of control links.
         */
        GraphBlock.prototype.getControlLinks = function () {
            return this.controlLinks.slice(0);
        };
        /**
         * Get objects by type.
         * @private
         * @param {IBlockElementsByType} [ioObjectsByType] - The objects by type.
         * @return {IBlockElementsByType} The objects by type.
         */
        GraphBlock.prototype.getObjectsByType = function (ioObjectsByType) {
            ioObjectsByType = _super.prototype.getObjectsByType.call(this, ioObjectsByType);
            for (var b = 0; b < this.blocks.length; b++) {
                this.blocks[b].getObjectsByType(ioObjectsByType);
            }
            return ioObjectsByType;
        };
        /**
         * Get blocks by uid.
         * @private
         * @param {IBlocksByUid} [ioBlocksByUid] - The blocks by Uid.
         * @return {IBlocksByUid} The blocks by Uid.
         */
        GraphBlock.prototype.getBlocksByUid = function (ioBlocksByUid) {
            ioBlocksByUid = _super.prototype.getBlocksByUid.call(this, ioBlocksByUid);
            for (var b = 0; b < this.blocks.length; b++) {
                this.blocks[b].getBlocksByUid(ioBlocksByUid);
            }
            return ioBlocksByUid;
        };
        /**
         * Is exportable.
         * @private
         * @return {boolean} True if exportable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        GraphBlock.prototype.isExportable = function () {
            return true;
        };
        /**
         * Export content.
         * @private
         * @return {string} The exported content.
         */
        GraphBlock.prototype.exportContent = function () {
            return JSON.stringify(this.generateJSONObject(), undefined, 2);
        };
        GraphBlock.toPascalCase = function (iString) {
            var pascalCaseString = iString.replace(/[^a-zA-Z0-9]+(.)/g, function (match, char) { return char.toUpperCase(); });
            return pascalCaseString;
        };
        /**
         * Export file name.
         * @private
         * @return {string} The export file name.
         */
        GraphBlock.prototype.exportFileName = function () {
            var blockName = this.getName();
            var blockPascalCaseName = GraphBlock.toPascalCase(blockName);
            var blockFileName = blockPascalCaseName + '.json';
            return blockFileName;
        };
        /**
         * This method defines the post execution function that will be triggered by the Schematics Engine
         * in the context of the corresponding graph block.
         * @private
         */
        // eslint-disable-next-line class-methods-use-this
        GraphBlock.prototype.onPostExecute = function () { };
        /**
         * Handle step into.
         * @private
         * @return {boolean} The handling result of the step into.
         */
        // eslint-disable-next-line class-methods-use-this
        GraphBlock.prototype.handleStepInto = function () {
            return true;
        };
        return GraphBlock;
    }(DynamicBlock));
    GraphBlock.prototype.uid = 'c839f268-7348-4a4c-9d3f-7a08dbb90f59';
    GraphBlock.prototype.name = 'Graph';
    GraphBlock.prototype.category = '';
    GraphBlock.prototype.documentation = 'i18n!DS/EPSSchematicsModelWeb/assets/nls/EPSSchematicsGraphBlockDoc';
    Object.defineProperty(TypeLibrary, '__GraphBlock', { value: GraphBlock });
    TypeLibrary.registerGlobalEnumType('ECastLevel', Enums.ECastLevel);
    BlockLibrary.registerBlock(GraphBlock);
    return GraphBlock;
});
