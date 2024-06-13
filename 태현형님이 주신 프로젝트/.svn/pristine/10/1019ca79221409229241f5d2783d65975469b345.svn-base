/* eslint-disable require-jsdoc, valid-jsdoc */
/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsTools'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsTools", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsPolyfill"], function (require, exports, Enums, Polyfill) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var Tools;
    (function (Tools) {
        Tools.version = '2.0.6';
        Tools.rootPath = '$ref:$';
        Tools.parentNodeIdSelector = 'Parent';
        Tools.regExpAlphanumeric = /^[a-z0-9_]+$/i;
        Tools.WaitAllBlockUid = '6c238a6a-9299-44c9-99a4-4d82ee8fca17';
        Tools.JoinAllBlockUid = 'a11c4b60-f396-4811-bb61-a19ae23cfc5c';
        function isJoinAllBlock(block) {
            return block.getUid() === Tools.JoinAllBlockUid;
        }
        Tools.isJoinAllBlock = isJoinAllBlock;
        /**
         * Do not use!
         * @private
         */
        function replaceGUIDCharacter(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }
        Tools.replaceGUIDCharacter = replaceGUIDCharacter;
        /**
         * Do not use!
         * @private
         */
        function generateGUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, Tools.replaceGUIDCharacter);
        }
        Tools.generateGUID = generateGUID;
        var recursiveStringify = function (obj) {
            var objDescriptor = {};
            var ref = this.references.push(objDescriptor) - 1;
            this.mapReferences[ref] = obj;
            if (obj !== null && (typeof obj === 'object' || typeof obj === 'function')) {
                var setProperty = true;
                if (Array.isArray(obj)) {
                    objDescriptor.type = 'array';
                    objDescriptor.value = [];
                }
                else if (obj.constructor === Date) {
                    objDescriptor.type = 'date';
                    objDescriptor.value = obj.toJSON();
                }
                else if (obj.constructor === RegExp) {
                    objDescriptor.type = 'regExp';
                    objDescriptor.source = obj.source;
                    objDescriptor.flags = obj.flags;
                }
                else if (typeof obj === 'function') {
                    objDescriptor.type = 'function';
                    objDescriptor.functionName = obj.name || '';
                    //objDescriptor.functionName = objDescriptor.functionName.replace(/\s/, '');
                    objDescriptor.functionConstructor = obj.toString();
                    if (/{(\s*)(\[native code\])(\s*)}/.test(objDescriptor.functionConstructor)) {
                        objDescriptor.isNativeFunction = true;
                        setProperty = false;
                    }
                    else {
                        if (obj.prototype !== undefined) {
                            if (this.mapReferences.indexOf(obj.prototype) === -1) {
                                recursiveStringify.call(this, obj.prototype);
                            }
                            objDescriptor.__prototype__ = this.mapReferences.indexOf(obj.prototype);
                            objDescriptor.isOwnConstructor = obj.prototype.constructor === obj;
                            //For inheritance class:
                            var objProtoOfPrototype = Object.getPrototypeOf(obj.prototype);
                            this.references[objDescriptor.__prototype__].inheritance = objProtoOfPrototype !== null &&
                                objProtoOfPrototype.hasOwnProperty('constructor') && objProtoOfPrototype.constructor !== Object;
                        }
                    }
                    objDescriptor.value = {};
                }
                else {
                    objDescriptor.type = 'object';
                    objDescriptor.value = {};
                    objDescriptor.inheritance = false;
                    var prototypeOfObj = Object.getPrototypeOf(obj);
                    var constructorName = prototypeOfObj !== null ? prototypeOfObj.constructor.name : undefined;
                    if (constructorName !== undefined && constructorName.length !== 0 && constructorName !== 'Object') {
                        objDescriptor.inheritance = true;
                        if (this.mapReferences.indexOf(prototypeOfObj.constructor) === -1) {
                            recursiveStringify.call(this, prototypeOfObj.constructor);
                        }
                        objDescriptor.__prototype__ = this.mapReferences.indexOf(prototypeOfObj.constructor);
                        objDescriptor.constructorName = constructorName;
                    }
                }
                if (setProperty) {
                    Object.keys(obj).forEach(function (property) {
                        if (property !== 'constructor') {
                            if (this.mapReferences.indexOf(obj[property]) === -1) {
                                recursiveStringify.call(this, obj[property]);
                            }
                            objDescriptor.value[property] = this.mapReferences.indexOf(obj[property]);
                        }
                    }, this);
                }
            }
            else {
                objDescriptor.type = 'primitive';
                objDescriptor.value = obj;
            }
            this.references[ref] = objDescriptor;
        };
        function jsonStringify(obj) {
            var objReferences = {
                references: [],
                mapReferences: []
            };
            recursiveStringify.call(objReferences, obj);
            return JSON.stringify(objReferences.references);
        }
        Tools.jsonStringify = jsonStringify;
        var recursiveParse = function (objDescriptor, refObj) {
            if (objDescriptor.type !== 'primitive' && this.processedReferences.indexOf(refObj) === -1) {
                this.processedReferences.push(refObj);
                var ref_1, objReferencesValue_1;
                var objValue_1 = {};
                if (objDescriptor.type === 'array') {
                    objValue_1 = [];
                }
                else if (objDescriptor.type === 'function') {
                    if (objDescriptor.isNativeFunction) {
                        objValue_1 = function () { };
                        objValue_1.toString = function () {
                            return objDescriptor.functionConstructor;
                        };
                    }
                    else {
                        // eslint-disable-next-line
                        objValue_1 = (Function('return ' + objDescriptor.functionConstructor + ';'))();
                        if (objDescriptor.__prototype__ !== undefined) {
                            ref_1 = objDescriptor.__prototype__;
                            objDescriptor.__prototype__ = undefined;
                            objValue_1.prototype = recursiveParse.call(this, this.references[ref_1], ref_1);
                            if (objDescriptor.isOwnConstructor) {
                                objValue_1.prototype.constructor = objValue_1;
                            }
                        }
                    }
                    if (objValue_1.name !== objDescriptor.functionName) {
                        Object.defineProperty(objValue_1, 'name', { value: objDescriptor.functionName, writable: false, enumerable: false, configurable: true });
                    }
                }
                else if (objDescriptor.type === 'date') {
                    objValue_1 = new Date(objDescriptor.value);
                }
                else if (objDescriptor.type === 'regExp') {
                    objValue_1 = new RegExp(objDescriptor.source, objDescriptor.flags);
                }
                else if (objDescriptor.type === 'object') {
                    if (objDescriptor.inheritance) {
                        // eslint-disable-next-line
                        var constructor = (Function('var ' + objDescriptor.constructorName + ' = function () {}; return ' + objDescriptor.constructorName + ';'))();
                        if (objDescriptor.__prototype__ !== undefined) {
                            ref_1 = objDescriptor.__prototype__;
                            objDescriptor.__prototype__ = undefined;
                            constructor.prototype = recursiveParse.call(this, this.references[ref_1], ref_1).prototype;
                        }
                        objValue_1 = new constructor();
                    }
                }
                objReferencesValue_1 = objDescriptor.value;
                objDescriptor.value = objValue_1;
                if (typeof objReferencesValue_1 === 'object') {
                    Object.keys(objReferencesValue_1).forEach(function (property) {
                        if (typeof objReferencesValue_1[property] === 'number') {
                            ref_1 = objReferencesValue_1[property];
                            objReferencesValue_1[property] = undefined;
                            objValue_1[property] = recursiveParse.call(this, this.references[ref_1], ref_1);
                        }
                    }, this);
                }
            }
            return objDescriptor.value;
        };
        function jsonParse(stringifyObj) {
            var objReferences = {
                references: JSON.parse(stringifyObj),
                processedReferences: []
            };
            return recursiveParse.call(objReferences, objReferences.references[0], 0);
        }
        Tools.jsonParse = jsonParse;
        function copyValue(value) {
            var copy = value;
            if (value instanceof Object) {
                var ValueCtor = value.constructor;
                if (value instanceof String || value instanceof Boolean || value instanceof Number || value instanceof Date || value instanceof RegExp) {
                    copy = new ValueCtor(value);
                }
                else if (value instanceof ArrayBuffer) {
                    copy = value.slice(0);
                }
                else if (Array.isArray(value)) {
                    copy = [];
                    for (var i = 0; i < value.length; i++) {
                        copy[i] = Tools.copyValue(value[i]);
                    }
                }
                else {
                    copy = new ValueCtor();
                    var keys = Object.keys(value);
                    var key = void 0;
                    for (var k = 0; k < keys.length; k++) {
                        key = keys[k];
                        copy[key] = Tools.copyValue(value[key]);
                    }
                }
            }
            return copy;
        }
        Tools.copyValue = copyValue;
        /**
         * Create graph block from blocks.
         * @private
         * @param {Block[]} iBlocks - The list of blocks.
         * @returns {GraphBlock} The created graph block.
         */
        function createGraphBlockFromBlocks(iBlocks) {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!Array.isArray(iBlocks)) {
                throw new TypeError('iBlocks argument is not an Array');
            }
            if (iBlocks.length === 0) {
                throw new TypeError('iBlocks argument is an empty Array');
            }
            var parentGraph;
            var block;
            var b;
            for (b = 0; b < iBlocks.length; b++) {
                block = iBlocks[b];
                if (!(block instanceof BlockCtr)) {
                    throw new TypeError('iBlocks[' + b + '] argument is not a Block');
                }
                if (block.graph === undefined || (parentGraph !== undefined && block.graph !== parentGraph)) {
                    throw new TypeError('iBlocks[' + b + '] argument is not in the parent Graph');
                }
                parentGraph = block.graph;
            }
            var graphBlock = parentGraph.createBlock(GraphBlockCtr.prototype.uid);
            var dataPortsToLink = [];
            var dataLinksToAdd = [];
            var controlPortsToLink = [];
            var controlLinksToAdd = [];
            for (b = 0; b < iBlocks.length; b++) {
                block = iBlocks[b];
                var dataPorts = block.getDataPorts();
                var dataPort = void 0;
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    dataPort = dataPorts[dp];
                    var dataLinks = dataPort.getDataLinks(parentGraph);
                    var subDataPorts = dataPort.getDataPorts();
                    for (var sdp = 0; sdp < subDataPorts.length; sdp++) {
                        dataLinks = dataLinks.concat(subDataPorts[sdp].getDataLinks(parentGraph));
                    }
                    var dataLink = void 0;
                    for (var dl = 0; dl < dataLinks.length; dl++) {
                        dataLink = dataLinks[dl];
                        if (dataLinksToAdd.indexOf(dataLink) === -1) {
                            dataPortsToLink.push({
                                startPort: dataLink.getStartPort(),
                                endPort: dataLink.getEndPort()
                            });
                            dataLinksToAdd.push(dataLink);
                        }
                    }
                }
                var controlPorts = block.getControlPorts();
                var controlPort = void 0;
                for (var cp = 0; cp < controlPorts.length; cp++) {
                    controlPort = controlPorts[cp];
                    var controlLinks = controlPort.getControlLinks(parentGraph);
                    var controlLink = void 0;
                    for (var cl = 0; cl < controlLinks.length; cl++) {
                        controlLink = controlLinks[cl];
                        if (controlLinksToAdd.indexOf(controlLink) === -1) {
                            controlPortsToLink.push({
                                startPort: controlLink.getStartPort(),
                                endPort: controlLink.getEndPort(),
                                waitCount: controlLink.getWaitCount()
                            });
                            controlLinksToAdd.push(controlLink);
                        }
                    }
                }
                var nodeIdSelectorName = block.getNodeIdSelector();
                var nodeIdSelector = parentGraph.getNodeIdSelectorByName(nodeIdSelectorName);
                if (nodeIdSelector !== undefined && !graphBlock.hasNodeIdSelectorName(nodeIdSelectorName)) {
                    var jsonNodeIdSelector = {};
                    nodeIdSelector.toJSON(jsonNodeIdSelector);
                    nodeIdSelector = graphBlock.createNodeIdSelector();
                    nodeIdSelector.fromJSON(jsonNodeIdSelector);
                }
                parentGraph.removeBlock(block);
                graphBlock.addBlock(block);
                block.setNodeIdSelector(nodeIdSelectorName);
            }
            var graphBlockInputPorts = new Polyfill.Map();
            var graphBlockOutputPorts = new Polyfill.Map();
            var startPort, endPort, link, graphBlockPort;
            var dataPortToLink;
            for (var dptl = 0; dptl < dataPortsToLink.length; dptl++) {
                dataPortToLink = dataPortsToLink[dptl];
                startPort = dataPortToLink.startPort;
                endPort = dataPortToLink.endPort;
                if (startPort.block.graph !== graphBlock) {
                    if (!graphBlockInputPorts.has(startPort)) {
                        graphBlockPort = graphBlock.createDynamicDataPort(Enums.EDataPortType.eInput);
                        graphBlockPort.setValueType(startPort.getValueType());
                        graphBlockInputPorts.set(startPort, graphBlockPort);
                        parentGraph.createDataLink(startPort, graphBlockPort);
                    }
                    startPort = graphBlockInputPorts.get(startPort);
                    graphBlock.createDataLink(startPort, endPort);
                }
                else if (endPort.block.graph !== graphBlock) {
                    if (!graphBlockOutputPorts.has(startPort)) {
                        graphBlockPort = graphBlock.createDynamicDataPort(Enums.EDataPortType.eOutput);
                        graphBlockPort.setValueType(startPort.getValueType());
                        graphBlockOutputPorts.set(startPort, graphBlockPort);
                        graphBlock.createDataLink(startPort, graphBlockPort);
                    }
                    startPort = graphBlockOutputPorts.get(startPort);
                    parentGraph.createDataLink(startPort, endPort);
                }
                else {
                    graphBlock.createDataLink(startPort, endPort);
                }
            }
            graphBlockInputPorts.clear();
            graphBlockOutputPorts.clear();
            var controlPortToLink;
            for (var cptl = 0; cptl < controlPortsToLink.length; cptl++) {
                controlPortToLink = controlPortsToLink[cptl];
                startPort = controlPortToLink.startPort;
                endPort = controlPortToLink.endPort;
                if (startPort.block.graph !== graphBlock) {
                    if (!graphBlockInputPorts.has(startPort)) {
                        graphBlockPort = graphBlock.getControlPorts(Enums.EControlPortType.eInput)[graphBlockInputPorts.size];
                        if (graphBlockPort === undefined) {
                            graphBlockPort = graphBlock.createDynamicControlPort(Enums.EControlPortType.eInput);
                        }
                        graphBlockInputPorts.set(startPort, graphBlockPort);
                        parentGraph.createControlLink(startPort, graphBlockPort);
                    }
                    startPort = graphBlockInputPorts.get(startPort);
                    link = graphBlock.createControlLink(startPort, endPort);
                    link.setWaitCount(controlPortToLink.waitCount);
                }
                else if (endPort.block.graph !== graphBlock) {
                    if (!graphBlockOutputPorts.has(startPort)) {
                        graphBlockPort = graphBlock.getControlPorts(Enums.EControlPortType.eOutput)[graphBlockOutputPorts.size];
                        if (graphBlockPort === undefined) {
                            graphBlockPort = graphBlock.createDynamicControlPort(Enums.EControlPortType.eOutput);
                        }
                        graphBlockOutputPorts.set(startPort, graphBlockPort);
                        graphBlock.createControlLink(graphBlockPort, startPort);
                    }
                    startPort = graphBlockOutputPorts.get(startPort);
                    link = parentGraph.createControlLink(startPort, endPort);
                    link.setWaitCount(controlPortToLink.waitCount);
                }
                else {
                    link = graphBlock.createControlLink(startPort, endPort);
                    link.setWaitCount(controlPortToLink.waitCount);
                }
            }
            return graphBlock;
        }
        Tools.createGraphBlockFromBlocks = createGraphBlockFromBlocks;
        function createBlocksFromGraphBlock(iGraphBlock) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!(iGraphBlock instanceof GraphBlockCtr)) {
                throw new TypeError('iGraphBlock argument is not a GraphBlock');
            }
            if (!(iGraphBlock.graph instanceof GraphBlockCtr)) {
                throw new TypeError('iGraphBlock argument is not in a Graph');
            }
            var parentGraph = iGraphBlock.graph;
            var dataPortsToLink = [];
            var controlPortsToLink = [];
            var startPort, endPort, link, graphPort;
            var graphLocalPorts = new Polyfill.Map();
            var dataLinks = iGraphBlock.getDataLinks();
            var dataLink;
            var internalDataLinks, externalDataLinks;
            var externalDataLink;
            for (var dl = 0; dl < dataLinks.length; dl++) {
                dataLink = dataLinks[dl];
                startPort = dataLink.getStartPort();
                endPort = dataLink.getEndPort();
                if (startPort.block === iGraphBlock) {
                    externalDataLinks = startPort.getDataLinks(parentGraph);
                    if (startPort.getType() === Enums.EDataPortType.eLocal || externalDataLinks.length === 0) {
                        if (!graphLocalPorts.has(startPort)) {
                            graphPort = parentGraph.createDynamicDataPort(Enums.EDataPortType.eLocal);
                            graphPort.setName(startPort.getName());
                            graphPort.setValueType(startPort.getValueType());
                            graphPort.setDefaultValue(startPort.getDefaultValue());
                            graphLocalPorts.set(startPort, graphPort);
                        }
                        startPort = graphLocalPorts.get(startPort);
                    }
                    else {
                        startPort = externalDataLinks[0].getStartPort();
                    }
                }
                else if (endPort.block === iGraphBlock) {
                    if (endPort.getType() === Enums.EDataPortType.eLocal) {
                        if (!graphLocalPorts.has(endPort)) {
                            graphPort = parentGraph.createDynamicDataPort(Enums.EDataPortType.eLocal);
                            graphPort.setName(endPort.getName());
                            graphPort.setValueType(endPort.getValueType());
                            graphPort.setDefaultValue(endPort.getDefaultValue());
                            graphLocalPorts.set(endPort, graphPort);
                        }
                        endPort = graphLocalPorts.get(endPort);
                    }
                    else {
                        externalDataLinks = endPort.getDataLinks(parentGraph);
                        internalDataLinks = endPort.getDataLinks(iGraphBlock);
                        if (externalDataLinks.length === 0) {
                            if (!graphLocalPorts.has(endPort)) {
                                graphPort = parentGraph.createDynamicDataPort(Enums.EDataPortType.eLocal);
                                graphPort.setName(endPort.getName());
                                graphPort.setValueType(endPort.getValueType());
                                graphPort.setDefaultValue(endPort.getDefaultValue());
                                graphLocalPorts.set(endPort, graphPort);
                            }
                            endPort = graphLocalPorts.get(endPort);
                        }
                        else {
                            for (var edl = 0; edl < externalDataLinks.length; edl++) {
                                externalDataLink = externalDataLinks[edl];
                                endPort = externalDataLink.getEndPort();
                                if (internalDataLinks.length > 1 && endPort.getType() !== Enums.EDataPortType.eLocal) {
                                    if (!graphLocalPorts.has(endPort)) {
                                        graphPort = parentGraph.createDynamicDataPort(Enums.EDataPortType.eLocal);
                                        graphPort.setName(endPort.getName());
                                        graphPort.setValueType(endPort.getValueType());
                                        graphPort.setDefaultValue(endPort.getDefaultValue());
                                        graphLocalPorts.set(endPort, graphPort);
                                    }
                                    graphPort = graphLocalPorts.get(endPort);
                                    dataPortsToLink.push({
                                        startPort: graphPort,
                                        endPort: endPort
                                    });
                                    endPort = graphPort;
                                }
                                dataPortsToLink.push({
                                    startPort: startPort,
                                    endPort: endPort
                                });
                            }
                            continue;
                        }
                    }
                }
                dataPortsToLink.push({
                    startPort: startPort,
                    endPort: endPort
                });
            }
            var controlLinks = iGraphBlock.getControlLinks();
            var controlLink;
            var externalControlLinks;
            var externalControlLink;
            var ecl;
            for (var cl = 0; cl < controlLinks.length; cl++) {
                controlLink = controlLinks[cl];
                startPort = controlLink.getStartPort();
                endPort = controlLink.getEndPort();
                if (startPort.block === iGraphBlock) {
                    externalControlLinks = startPort.getControlLinks(parentGraph);
                    for (ecl = 0; ecl < externalControlLinks.length; ecl++) {
                        externalControlLink = externalControlLinks[ecl];
                        startPort = externalControlLink.getStartPort();
                        controlPortsToLink.push({
                            startPort: startPort,
                            endPort: endPort
                        });
                    }
                    continue;
                }
                else if (endPort.block === iGraphBlock) {
                    externalControlLinks = endPort.getControlLinks(parentGraph);
                    for (ecl = 0; ecl < externalControlLinks.length; ecl++) {
                        externalControlLink = externalControlLinks[ecl];
                        endPort = externalControlLink.getEndPort();
                        controlPortsToLink.push({
                            startPort: startPort,
                            endPort: endPort
                        });
                    }
                    continue;
                }
                controlPortsToLink.push({
                    startPort: startPort,
                    endPort: endPort,
                    waitCount: controlLink.getWaitCount()
                });
            }
            var blocks = iGraphBlock.getBlocks();
            var block;
            var nodeIdSelectorsByName = {};
            for (var b = 0; b < blocks.length; b++) {
                block = blocks[b];
                var nodeIdSelectorName = block.getNodeIdSelector();
                var nodeIdSelector = iGraphBlock.getNodeIdSelectorByName(nodeIdSelectorName);
                var newNodeIdSelectorName = nodeIdSelectorName;
                if (nodeIdSelectorsByName[nodeIdSelectorName] !== undefined) {
                    newNodeIdSelectorName = nodeIdSelectorsByName[nodeIdSelectorName].getName();
                }
                else if (nodeIdSelector !== undefined) {
                    var jsonNodeIdSelector = {};
                    nodeIdSelector.toJSON(jsonNodeIdSelector);
                    nodeIdSelector = parentGraph.createNodeIdSelector();
                    nodeIdSelector.fromJSON(jsonNodeIdSelector);
                    nodeIdSelectorsByName[nodeIdSelectorName] = nodeIdSelector;
                    newNodeIdSelectorName = nodeIdSelector.getName();
                }
                iGraphBlock.removeBlock(block);
                parentGraph.addBlock(block);
                block.setNodeIdSelector(newNodeIdSelectorName);
            }
            parentGraph.removeBlock(iGraphBlock);
            var dataPortToLink;
            for (var dptl = 0; dptl < dataPortsToLink.length; dptl++) {
                dataPortToLink = dataPortsToLink[dptl];
                startPort = dataPortToLink.startPort;
                endPort = dataPortToLink.endPort;
                parentGraph.createDataLink(startPort, endPort);
            }
            var controlPortToLink;
            for (var cptl = 0; cptl < controlPortsToLink.length; cptl++) {
                controlPortToLink = controlPortsToLink[cptl];
                startPort = controlPortToLink.startPort;
                endPort = controlPortToLink.endPort;
                link = parentGraph.createControlLink(startPort, endPort);
                link.setWaitCount(controlPortToLink.waitCount);
            }
            return blocks;
        }
        Tools.createBlocksFromGraphBlock = createBlocksFromGraphBlock;
        var getAllControlPredecessorsFct = function (block, blocksToIgnore) {
            var predecessors = [];
            var firstPredecessors = Tools.getFirstControlPredecessors(block, true, false);
            for (var fp = 0; fp < firstPredecessors.length; fp++) {
                var firstPredecessor = firstPredecessors[fp];
                if (blocksToIgnore.indexOf(firstPredecessor) === -1) {
                    blocksToIgnore.push(firstPredecessor);
                    predecessors.push(firstPredecessor);
                    var indirectPredecessors = getAllControlPredecessorsFct(firstPredecessor, blocksToIgnore);
                    Array.prototype.push.apply(predecessors, indirectPredecessors);
                }
            }
            return predecessors;
        };
        /**
        * Get all the blocks predecessors including indirect which are link with a control link
        * @param {Block} block - The block
        * @return {Block[]} predecessors
        */
        function getAllControlPredecessors(block) {
            return getAllControlPredecessorsFct(block, [block]);
        }
        Tools.getAllControlPredecessors = getAllControlPredecessors;
        /**
         * Get the first blocks predecessors which are link with a control link
         * @param {Block} block - The block
         * @param {Boolean} insideSameGraph - If true, only blocks in the same graph of the given block will be in the predecessors list
         * @param {Boolean} ignoreFrameBreakLink - If true, only the control link without frame break will be process
         * @return {Block[]} predecessors
         */
        function getFirstControlPredecessors(block, insideSameGraph, ignoreFrameBreakLink) {
            var graphContext = insideSameGraph ? block.graph : undefined;
            var inputControlPorts = block.getControlPorts(Enums.EControlPortType.eInput).concat(block.getControlPorts(Enums.EControlPortType.eInputEvent));
            var controlLinks, link;
            var predecessors = [];
            for (var cp = 0; cp < inputControlPorts.length; cp++) {
                controlLinks = inputControlPorts[cp].getControlLinks();
                for (var cl = 0; cl < controlLinks.length; cl++) {
                    link = controlLinks[cl];
                    if (link.getStartPort() !== inputControlPorts[cp] &&
                        graphContext !== link.getStartPort().block &&
                        !(ignoreFrameBreakLink && link.getWaitCount() !== 0)) {
                        predecessors.push(link.getStartPort().block);
                    }
                }
            }
            return predecessors;
        }
        Tools.getFirstControlPredecessors = getFirstControlPredecessors;
        /**
         * Get the blocks successors wich are link with a control link
         * @param {Block} block - The block
         * @param {Boolean} insideSameGraph - If true, only blocks in the same graph of the given block will be in the successors list
         * @param {Boolean} ignoreFrameBreakLink - If true, only the control link without frame break will be process
         * @returns {Block[]} successors
         */
        function getFirstControlSuccessors(block, insideSameGraph, ignoreFrameBreakLink) {
            var graphContext = insideSameGraph ? block.graph : undefined;
            var inputControlPorts = block.getControlPorts(Enums.EControlPortType.eOutput).concat(block.getControlPorts(Enums.EControlPortType.eOutputEvent));
            var controlLinks, link;
            var successors = [];
            for (var cp = 0; cp < inputControlPorts.length; cp++) {
                controlLinks = inputControlPorts[cp].getControlLinks();
                for (var cl = 0; cl < controlLinks.length; cl++) {
                    link = controlLinks[cl];
                    if (controlLinks[cl].getEndPort() !== inputControlPorts[cp] &&
                        graphContext !== controlLinks[cl].getEndPort().block &&
                        !(ignoreFrameBreakLink && link.getWaitCount() !== 0)) {
                        successors.push(controlLinks[cl].getEndPort().block);
                    }
                }
            }
            return successors;
        }
        Tools.getFirstControlSuccessors = getFirstControlSuccessors;
        /**
         * Gets the blocks predecessors wich are link with a data link.
         * @private
         * @param {Block} block - The block
         * @returns {Block[]} predecessors
         */
        var getFirstDataPredecessors = function (block) {
            var graph = block.graph;
            var inputDataPorts = block.getDataPorts(Enums.EDataPortType.eInput);
            var dataLinks;
            var predecessors = [];
            for (var dp = 0; dp < inputDataPorts.length; dp++) {
                dataLinks = inputDataPorts[dp].getDataLinks(graph);
                var inputSubDataPorts = inputDataPorts[dp].getDataPorts();
                for (var sdp = 0; sdp < inputSubDataPorts.length; sdp++) {
                    dataLinks = dataLinks.concat(inputSubDataPorts[sdp].getDataLinks(graph));
                }
                for (var dl = 0; dl < dataLinks.length; dl++) {
                    if (dataLinks[dl].getStartPort().block !== graph) {
                        predecessors.push(dataLinks[dl].getStartPort().block);
                    }
                }
            }
            return predecessors;
        };
        /**
         * Gets the blocks successors wich are link with a data link.
         * @private
         * @param {Block} block - The block
         * @returns {Block[]} successors
         */
        var getFirstDataSuccessors = function (block) {
            var graph = block.graph;
            var outputDataPorts = block.getDataPorts(Enums.EDataPortType.eOutput);
            var dataLinks;
            var successors = [];
            for (var dp = 0; dp < outputDataPorts.length; dp++) {
                dataLinks = outputDataPorts[dp].getDataLinks(graph);
                var outputSubDataPorts = outputDataPorts[dp].getDataPorts();
                for (var sdp = 0; sdp < outputSubDataPorts.length; sdp++) {
                    dataLinks = dataLinks.concat(outputSubDataPorts[sdp].getDataLinks(graph));
                }
                for (var dl = 0; dl < dataLinks.length; dl++) {
                    if (dataLinks[dl].getEndPort().block !== graph) {
                        successors.push(dataLinks[dl].getEndPort().block);
                    }
                }
            }
            return successors;
        };
        /**
         * Checks if the second block is after the first block.
         * @private
         * @param {Block} block1 - The first block.
         * @param {Block} block2 - The second block.
         * @param {boolean} ignoreFrameBreakLink - True to ignore frame break link else false.
         * @param {Block[]} [blocksChecked] - The optional list of already checked blocks.
         * @returns {boolean} True if the second block is after the first block else false.
         */
        var isAfter = function (block1, block2, ignoreFrameBreakLink, blocksChecked) {
            blocksChecked = blocksChecked || [];
            if (block1 === block2) {
                return true;
            }
            var blockSuccessors = Tools.getFirstControlSuccessors(block1, true, ignoreFrameBreakLink);
            for (var s = 0; s < blockSuccessors.length; s++) {
                if (blocksChecked.indexOf(blockSuccessors[s]) === -1) {
                    blocksChecked.push(blockSuccessors[s]);
                    if (isAfter(blockSuccessors[s], block2, ignoreFrameBreakLink, blocksChecked)) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Checks if we must add a frame break when creating the control link between the two given port.
         * @private
         * @param {ControlPort} port1 - The first port.
         * @param {ControlPort} port2 - The second port.
         * @param {GraphBlock} context - The graph block context.
         * @returns {boolean} True if the frame break is addable else false.
         */
        function isFrameBreakAddable(port1, port2, context) {
            var result = false;
            if (port1.block !== context || port2.block !== context) {
                result = port1.isStartPort(context) ? isAfter(port2.block, port1.block, true) : isAfter(port1.block, port2.block, true);
            }
            return result;
        }
        Tools.isFrameBreakAddable = isFrameBreakAddable;
        /**
         * Checks if the selected blocks could formed a logical graph.
         * @private
         * @param {Block[]} selectedBlocks - The blocks.
         * @returns {boolean} True if selected blocks are consistent.
         */
        function areSelectedBlocksConsistent(selectedBlocks) {
            if (selectedBlocks.length === 1) {
                return true;
            }
            var blockSuccessors, successor;
            var blocksChecked = [];
            for (var b = 0; b < selectedBlocks.length; b++) {
                blockSuccessors = Tools.getFirstControlSuccessors(selectedBlocks[b], true, false);
                for (var bs = blockSuccessors.length - 1; 0 <= bs; bs--) {
                    if (selectedBlocks.indexOf(blockSuccessors[bs]) !== -1) {
                        blockSuccessors.splice(bs, 1);
                    }
                }
                while (undefined !== (successor = blockSuccessors.pop())) {
                    if (selectedBlocks.indexOf(successor) !== -1 && !isAfter(successor, selectedBlocks[b], false)) {
                        return false;
                    }
                    if (blocksChecked.indexOf(successor) === -1) {
                        blocksChecked.push(successor);
                        blockSuccessors = Tools.getFirstControlSuccessors(successor, true, false).concat(blockSuccessors);
                    }
                }
            }
            return true;
        }
        Tools.areSelectedBlocksConsistent = areSelectedBlocksConsistent;
        /**
         * Finds all the control infinite loop in a graph.
         * @private
         * @param {GraphBlock} graph - The graph.
         * @param {boolean} checkSubGraph - True to check subgraph else false.
         * @returns {Block[][]} Return an array that contain the block instance of infinite loop.
         */
        function findGraphControlLoops(graph, checkSubGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var blocksToProcess = graph.getBlocks();
            var infiniteLoops = [];
            var block;
            while (blocksToProcess.length !== 0) {
                block = blocksToProcess[blocksToProcess.length - 1];
                if (checkSubGraph && block instanceof GraphBlockCtr) {
                    infiniteLoops = infiniteLoops.concat(Tools.findGraphControlLoops(block, checkSubGraph));
                }
                findBlockControlLoops(block, [], blocksToProcess, infiniteLoops, checkSubGraph);
            }
            return infiniteLoops;
        }
        Tools.findGraphControlLoops = findGraphControlLoops;
        /**
         * Recursive method use to find the control infinite loops.
         * Must only be used by findGraphInfiniteLoops
         * @private
         * @param {Block} block
         * @param {Block[]} predecessors
         * @param {Block[]} blocksToProcess
         * @param {Block[][]} infiniteLoops
         * @param {boolean} checkSubGraph
         */
        var findBlockControlLoops = function (block, predecessors, blocksToProcess, infiniteLoops, checkSubGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var blockIndex = blocksToProcess.indexOf(block);
            if (blockIndex === -1) {
                //If the block is among the predecessors array, we found an infinite loop
                var predecessorsBlockIndex = predecessors.indexOf(block);
                if (predecessorsBlockIndex !== -1) {
                    infiniteLoops.push(predecessors.slice(predecessorsBlockIndex));
                }
                return;
            }
            blocksToProcess.splice(blockIndex, 1);
            if (checkSubGraph && block.constructor === GraphBlockCtr) {
                infiniteLoops = infiniteLoops.concat(Tools.findGraphControlLoops(block, checkSubGraph));
            }
            var outputControlPorts = block.getControlPorts(Enums.EControlPortType.eOutput).concat(block.getControlPorts(Enums.EControlPortType.eOutputEvent));
            //Block with more than one output control port cannot be involve in a infinite loop
            if (1 < outputControlPorts.length) {
                return;
            }
            var blockFirstPredecessors = Tools.getFirstControlPredecessors(block, true, true);
            predecessors = predecessors.concat(block);
            for (var pr = 0; pr < blockFirstPredecessors.length; pr++) {
                if (blockFirstPredecessors[pr] !== block.graph) {
                    findBlockControlLoops(blockFirstPredecessors[pr], predecessors, blocksToProcess, infiniteLoops, checkSubGraph);
                }
            }
        };
        /**
         * Find all the data infinite loop in a graph.
         * @private
         * @param {GraphBlock} graph - The graph.
         * @param {boolean} checkSubGraph
         * @returns {Block[][]} Return an array that contain the block instance of infinite loop.
         */
        function findGraphDataLoops(graph, checkSubGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var blocksToProcess = graph.getBlocks();
            var infiniteLoops = [];
            var block;
            while (blocksToProcess.length !== 0) {
                block = blocksToProcess[blocksToProcess.length - 1];
                if (checkSubGraph && block.constructor === GraphBlockCtr) {
                    infiniteLoops = infiniteLoops.concat(Tools.findGraphDataLoops(block, checkSubGraph));
                }
                findBlockDataLoops(block, [], blocksToProcess, infiniteLoops, checkSubGraph);
            }
            return infiniteLoops;
        }
        Tools.findGraphDataLoops = findGraphDataLoops;
        /**
         * Recursive method use to find the data infinite loops.
         * Must only be used by findGraphDataLoops.
         * @private
         * @param {Block} block
         * @param {Block[][]} predecessors
         * @param {Block[]} blocksToProcess
         * @param {Block[][]} infiniteLoops
         * @param {boolean} checkSubGraph
         */
        var findBlockDataLoops = function (block, predecessors, blocksToProcess, infiniteLoops, checkSubGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var blockIndex = blocksToProcess.indexOf(block);
            if (blockIndex === -1) {
                //If the block is among the predecessors array, we found an infinite loop
                var predecessorsBlockIndex = predecessors.indexOf(block);
                if (predecessorsBlockIndex !== -1) {
                    infiniteLoops.push(predecessors.slice(predecessorsBlockIndex));
                }
                return;
            }
            blocksToProcess.splice(blockIndex, 1);
            if (checkSubGraph && block.constructor === GraphBlockCtr) {
                infiniteLoops = infiniteLoops.concat(Tools.findGraphDataLoops(block, checkSubGraph));
            }
            //Block with more than one output control port cannot be involve in a infinite loop
            var blockFirstPredecessors = getFirstDataPredecessors(block);
            predecessors = predecessors.concat(block);
            for (var pr = 0; pr < blockFirstPredecessors.length; pr++) {
                if (blockFirstPredecessors[pr] !== block.graph) {
                    findBlockDataLoops(blockFirstPredecessors[pr], predecessors, blocksToProcess, infiniteLoops, checkSubGraph);
                }
            }
        };
        /**
         * Find all the data port which are waiting for a block before them in a graph.
         * @private
         * @param {GraphBlock} graph - The graph.
         * @param {boolean} checkSubGraph
         * @returns {Block[][]} Return an array that contain the block instance of the waiting blocks.
         */
        function findGraphControlWaitingData(graph, checkSubGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var blocks = graph.getBlocks();
            var blocksDataSuccessors = [];
            for (var b = 0; b < blocks.length; b++) {
                blocksDataSuccessors.push(getFirstDataSuccessors(blocks[b]));
            }
            //Get first control successors of the block inside the graph
            var controlLinks = graph.getControlLinks();
            var graphFirstControlSuccessors = [];
            for (var cl = 0; cl < controlLinks.length; cl++) {
                var link = controlLinks[cl];
                if (link.getStartPort().block === graph && link.getEndPort().block.graph === graph) {
                    graphFirstControlSuccessors.push(link.getEndPort().block);
                }
            }
            var blocksPotentialControlPredecessors = [];
            var ds, ns, dataSuccessors, dataNextSuccessors, index, cp, np, potentialControlPredecessors, controlNextPredecessors;
            for (var b = 0; b < blocks.length; b++) {
                //Get all the data successors of the block b
                dataSuccessors = blocksDataSuccessors[b];
                for (ds = 0; ds < dataSuccessors.length; ds++) {
                    index = blocks.indexOf(dataSuccessors[ds]);
                    dataNextSuccessors = blocksDataSuccessors[index];
                    for (ns = 0; ns < dataNextSuccessors.length; ns++) {
                        if (dataSuccessors.indexOf(dataNextSuccessors[ns]) === -1) {
                            dataSuccessors.push(dataNextSuccessors[ns]);
                        }
                    }
                }
                //Get all the blocks that could be execute before the block b
                potentialControlPredecessors = graphFirstControlSuccessors.slice(0);
                for (cp = 0; cp < potentialControlPredecessors.length; cp++) {
                    if (potentialControlPredecessors[cp] !== blocks[b]) {
                        controlNextPredecessors = Tools.getFirstControlSuccessors(potentialControlPredecessors[cp], true, false);
                        for (np = 0; np < controlNextPredecessors.length; np++) {
                            if (potentialControlPredecessors.indexOf(controlNextPredecessors[np]) === -1) {
                                potentialControlPredecessors.push(controlNextPredecessors[np]);
                            }
                        }
                    }
                }
                blocksPotentialControlPredecessors.push(potentialControlPredecessors);
            }
            var blocksWarning = [];
            for (var b = 0; b < blocks.length; b++) {
                if (checkSubGraph && blocks[b].constructor === GraphBlockCtr) {
                    blocksWarning = blocksWarning.concat(Tools.findGraphControlWaitingData(blocks[b], checkSubGraph));
                }
                for (var b2 = 0; b2 < blocks.length; b2++) {
                    if (b !== b2 && blocksPotentialControlPredecessors[b].indexOf(blocks[b2]) === -1 && blocksDataSuccessors[b2].indexOf(blocks[b]) !== -1) {
                        blocksWarning.push([blocks[b], blocks[b2]]);
                    }
                }
            }
            return blocksWarning;
        }
        Tools.findGraphControlWaitingData = findGraphControlWaitingData;
        /**
         * Find all the blocks without control predecessors.
         * @private
         * @param {GraphBlock} graph - The graph.
         * @param {boolean} checkSubGraph
         * @returns {Block[][]} Return an array that contain the blocks with no predecessors.
         */
        function findBlocksWithoutPredecessors(graph, checkSubGraph) {
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            var blocksWarning = [];
            var blocks = graph.getBlocks();
            var warning, predecessors, successors, addGhostPredecessor;
            var ghostPredecessors = [];
            for (var b = 0; b < blocks.length; b++) {
                if (checkSubGraph && blocks[b].constructor === GraphBlockCtr) {
                    blocksWarning = blocksWarning.concat(Tools.findBlocksWithoutPredecessors(blocks[b], checkSubGraph));
                }
                if (Tools.getFirstControlPredecessors(blocks[b], false, false).length === 0) {
                    warning = [blocks[b]];
                    for (var w = 0; w < warning.length; w++) {
                        successors = Tools.getFirstControlSuccessors(warning[w], true, false);
                        for (var s = 0; s < successors.length; s++) {
                            if (warning.indexOf(successors[s]) === -1) {
                                predecessors = Tools.getFirstControlPredecessors(successors[s], false, false);
                                if (predecessors.length === 1) {
                                    warning.push(successors[s]);
                                }
                                else {
                                    ghostPredecessors.push(warning[w]);
                                    addGhostPredecessor = true;
                                    for (var p = 0; p < predecessors.length; p++) {
                                        if (ghostPredecessors.indexOf(predecessors[p]) === -1) {
                                            addGhostPredecessor = false;
                                        }
                                    }
                                    if (addGhostPredecessor) {
                                        warning.push(successors[s]);
                                    }
                                }
                            }
                        }
                    }
                    blocksWarning.push(warning);
                }
            }
            return blocksWarning;
        }
        Tools.findBlocksWithoutPredecessors = findBlocksWithoutPredecessors;
    })(Tools || (Tools = {}));
    return Tools;
});
