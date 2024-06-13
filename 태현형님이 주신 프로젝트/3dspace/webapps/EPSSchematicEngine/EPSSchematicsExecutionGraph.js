/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionGraph'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionGraph", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionBlock", "DS/EPSSchematicEngine/EPSSchematicsExecutionScriptBlock", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicEngine/typings/ExperienceKernel/EPSSEExperienceKernel", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock", "DS/EPSSchematicEngine/EPSSchematicsExecutionDataLink", "DS/EPSSchematicEngine/EPSSchematicsExecutionControlLink", "DS/EPSSchematicEngine/EPSSchematicsExecutionControlLinkContext", "DS/EPSSchematicEngine/EPSSchematicsExecutionDataPort", "DS/EPSSchematicEngine/EPSSchematicsExecutionControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock"], function (require, exports, ExecutionBlock, ExecutionScriptBlock, EventServices, Enums, TypeLibrary, ExecutionEvents, Tools, EK, GraphBlock, ScriptBlock, ExecutionDataLink, ExecutionControlLink, ExecutionControlLinkContext, ExecutionDataPort, ExecutionControlPort, TemplateGraphBlock) {
    "use strict";
    var EDebugRequest;
    (function (EDebugRequest) {
        EDebugRequest[EDebugRequest["eContinue"] = 0] = "eContinue";
        EDebugRequest[EDebugRequest["eBreakAll"] = 1] = "eBreakAll";
        EDebugRequest[EDebugRequest["eStepOver"] = 2] = "eStepOver";
        EDebugRequest[EDebugRequest["eStepInto"] = 3] = "eStepInto";
    })(EDebugRequest || (EDebugRequest = {}));
    /**
     * This class defines a schematics execution graph.
     * @class ExecutionGraph
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionGraph
     * @private
     */
    var ExecutionGraph = /** @class */ (function (_super) {
        __extends(ExecutionGraph, _super);
        /**
         * @constructor
         * @param {GraphBlock} model - The graph block model.
         * @param {ExecutionGraph} parent - The parent execution block.
         * @param {string} version - The JSON graph version.
         * @param {string[]} [modules] - The modules to be load by workers.
         * @param {INode} [node] - The node to be used by graph.
         * @param {INodeId} [nodeId] - The nodeId to be used by graph.
         * @param {boolean} [breakOnStart] - Request to break before executing first block.
         * @param {IBreakpoint[]} [breakpoints] - Breakpoints.
         */
        function ExecutionGraph(model, parent, version, modules, node, nodeId, breakOnStart, breakpoints) {
            var _this = _super.call(this, model, parent) || this;
            _this.blocks = [];
            _this.dataLinks = [];
            _this.controlLinks = [];
            _this.waitingCursors = [];
            _this.nodeIdsBySelector = {};
            _this.nodeIds = [];
            _this.version = version;
            _this.modules = modules;
            _this.node = node;
            _this.nodeId = nodeId;
            _this.debugRequest = breakOnStart ? EDebugRequest.eBreakAll : EDebugRequest.eContinue;
            _this.updateBreakpoints(breakpoints || []);
            _this.buildFromGraphModel();
            return _this;
        }
        /**
         * Creates the execution graph instance from the specified json graph and
         * the wanted input/output data overrides.
         * @public
         * @static
         * @param {string|IJSONGraph} json - The JSON string or object representing the graph
         * @param {string[]} [modules] - The modules to be load by workers.
         * @param {INode} [node] - The node to be used by graph.
         * @param {INodeId} [nodeId] - The nodeId to be used by graph.
         * @param {boolean} [breakOnStart] - Request to break before executing first block.
         * @param {IBreakpoint[]} [breakpoints] - Breakpoints.
         * @returns {ExecutionGraph} The execution graph instance.
         */
        ExecutionGraph.createExecutionGraph = function (json, modules, node, nodeId, breakOnStart, breakpoints) {
            var jsonGraph;
            // Parse the json
            if (typeof json === 'string') {
                jsonGraph = JSON.parse(json);
            }
            else if (typeof json === 'object') {
                jsonGraph = json;
            }
            else {
                throw new Error('Invalid JSON graph!');
            }
            // Get the json version
            var version = jsonGraph.version === undefined ? '0.0.0' : jsonGraph.version;
            // Create the execution graph
            var graphBlockModel = new GraphBlock();
            graphBlockModel.buildFromJSONObject(jsonGraph);
            var graph = new ExecutionGraph(graphBlockModel, undefined, version, modules, node, nodeId, breakOnStart, breakpoints);
            return graph;
        };
        /**
         * @private
         */
        ExecutionGraph.prototype.buildFromGraphModel = function () {
            var blocksModel = this.model instanceof TemplateGraphBlock ? this.model.getBlocks(false) : this.model.getBlocks();
            for (var b = 0; b < blocksModel.length; b++) {
                this.createBlockPlay(blocksModel[b]);
            }
            var dataLinksModel = this.model instanceof TemplateGraphBlock ? this.model.getDataLinks(false) : this.model.getDataLinks();
            for (var dl = 0; dl < dataLinksModel.length; dl++) {
                this.createDataLinkPlay(dataLinksModel[dl]);
            }
            var controlLinksModel = this.model instanceof TemplateGraphBlock ? this.model.getControlLinks(false) : this.model.getControlLinks();
            for (var cl = 0; cl < controlLinksModel.length; cl++) {
                this.createControlLinkPlay(controlLinksModel[cl]);
            }
        };
        /**
         * Get object from path.
         * @private
         * @param {string} iPath - The object path.
         * @returns {ExecutionPort} - The object corresponding to the path.
         */
        ExecutionGraph.prototype.getObjectFromPath = function (iPath) {
            var elements = iPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
            var object = this;
            for (var e = 1; e < elements.length; e++) {
                var property = elements[e];
                if (object instanceof ExecutionDataPort) {
                    property = elements.slice(e).join('.');
                    e = elements.length - 1;
                    object = object.dataPortsByName[property];
                }
                else {
                    object = object[property];
                }
            }
            return object;
        };
        /**
         * Creates an execution block.
         * @private
         * @param {Block} blockModel - The block model.
         */
        ExecutionGraph.prototype.createBlockPlay = function (blockModel) {
            var block;
            if (blockModel instanceof GraphBlock) {
                block = new ExecutionGraph(blockModel, this, undefined, this.getModules(), this.getNode(), this.getNodeId(), false, this.breakpoints);
            }
            else if (blockModel instanceof ScriptBlock) {
                block = new ExecutionScriptBlock(blockModel, this);
            }
            else {
                block = new ExecutionBlock(blockModel, this);
            }
            this.blocks.push(block);
        };
        /**
         * Creates an execution data link.
         * @private
         * @param {DataLink} model - The data link model.
         */
        ExecutionGraph.prototype.createDataLinkPlay = function (model) {
            var dataLink = new ExecutionDataLink(model, this);
            this.dataLinks.push(dataLink);
        };
        /**
         * Creates an execution control link.
         * @private
         * @param {ControlLink} model - The control link model.
         */
        ExecutionGraph.prototype.createControlLinkPlay = function (model) {
            var controlLink = new ExecutionControlLink(model, this);
            this.controlLinks.push(controlLink);
        };
        /**
         * Subscribes event listeners for each graph input execution ports
         * declared as event ports.
         * @private
         */
        ExecutionGraph.prototype.subscribeEventListeners = function () {
            var ports = this.getControlPorts(Enums.EControlPortType.eInputEvent);
            for (var p = 0; p < ports.length; p++) {
                var port = ports[p];
                var eventCtr = EventServices.getEventByType(port.model.getEventType());
                if (eventCtr !== undefined) {
                    EventServices.addObjectListener(eventCtr, this, 'onEvent');
                }
            }
        };
        /**
         * Unsubscribes event listeners for each graph input execution ports
         * declared as event ports.
         * @private
         */
        ExecutionGraph.prototype.unsubscribeEventListeners = function () {
            var ports = this.getControlPorts(Enums.EControlPortType.eInputEvent);
            for (var p = 0; p < ports.length; p++) {
                var port = ports[p];
                var eventCtr = EventServices.getEventByType(port.model.getEventType());
                if (eventCtr !== undefined) {
                    EventServices.removeObjectListener(eventCtr, this, 'onEvent');
                }
            }
        };
        /**
         * The graph callback to subscribed events.
         * @private
         * @param {EPEvent} event - The subscribed event.
         */
        ExecutionGraph.prototype.onEvent = function (event) {
            if (TypeLibrary.hasType(this.model.getGraphContext(), event.getType(), Enums.FTypeCategory.fEvent)) {
                var ports = this.getControlPorts(Enums.EControlPortType.eInputEvent).filter(function (controlPort) {
                    return event instanceof EventServices.getEventByType(controlPort.model.getEventType());
                });
                for (var p = 0; p < ports.length; p++) {
                    var port = ports[p];
                    port.setEvent(event);
                    port.activate(); // TODO: a ajouter dans le waitingcursor? surement probleme de stacking des valeur des events!
                }
            }
        };
        /**
         * Copies the each unique linked data port value into
         * each input data ports of the specified block.
         * @private
         * @static
         * @param {ExecutionBlock} block - The block to copy the input parameter values to.
         * @returns {boolean} True if each data link value are ready else false.
         */
        ExecutionGraph.copyInputDataLinkValues = function (block) {
            var result = true;
            var copyLinkValue = function (dataPort) {
                var dataLink = dataPort.getInputDataLinks()[0];
                var valued = dataLink === undefined || dataLink.startPort.isValued();
                if (valued && dataLink !== undefined) {
                    dataLink.copyDataLinkValue();
                }
                return valued;
            };
            var dataPorts = block.getDataPorts(Enums.EDataPortType.eInput);
            for (var dp = 0; dp < dataPorts.length && result; dp++) {
                result = copyLinkValue(dataPorts[dp]);
                var subDataPorts = dataPorts[dp].dataPorts;
                for (var sdp = 0; sdp < subDataPorts.length && result; sdp++) {
                    result = copyLinkValue(subDataPorts[sdp]);
                }
            }
            return result;
        };
        /**
         * Copies the output parameter values from the specified block
         * to the connected linked ports.
         * Output parameter values are propagated through each graph block
         * @private
         * @static
         * @param {ExecutionBlock} block - The block to copy the output parameter values from.
         */
        ExecutionGraph.copyOutputDataLinkValues = function (block) {
            var copyLinkValue = function (dataPort) {
                var dataLinks = dataPort.getOutputDataLinks();
                for (var dl = 0; dl < dataLinks.length; dl++) {
                    var dataLink = dataLinks[dl];
                    if (dataPort.model.block.graph === dataLink.endPort.model.block) {
                        dataLink.copyDataLinkValue();
                    }
                }
            };
            var dataPorts = block.getDataPorts(Enums.EDataPortType.eOutput);
            for (var dp = 0; dp < dataPorts.length; dp++) {
                copyLinkValue(dataPorts[dp]);
                var subDataPorts = dataPorts[dp].dataPorts;
                for (var sdp = 0; sdp < subDataPorts.length; sdp++) {
                    copyLinkValue(subDataPorts[sdp]);
                }
            }
        };
        /**
         * Sends the event defined by the port.
         * @private
         * @param {ExecutionControlPort} port - The execution control port.
         */
        // eslint-disable-next-line class-methods-use-this
        ExecutionGraph.prototype.sendEvent = function (port) {
            var EventCtor = EventServices.getEventByType(port.model.getEventType());
            var event = port.getEvent() || new EventCtor();
            EventServices.dispatchEvent(event);
        };
        // eslint-disable-next-line class-methods-use-this
        ExecutionGraph.prototype.sendBreakEvent = function (iCursor) {
            var event = new ExecutionEvents.DebugBreakEvent();
            event.path = iCursor.model.toPath();
            EventServices.dispatchEvent(event);
        };
        // eslint-disable-next-line class-methods-use-this
        ExecutionGraph.prototype.sendUnbreakEvent = function (iCursor) {
            var event = new ExecutionEvents.DebugUnbreakEvent();
            event.path = iCursor.model.toPath();
            EventServices.dispatchEvent(event);
        };
        /**
         * @public
         */
        ExecutionGraph.prototype.continue = function () {
            for (var wc = 0; wc < this.waitingCursors.length; wc++) {
                var waitingCursor = this.waitingCursors[wc];
                if (waitingCursor instanceof ExecutionGraph) {
                    waitingCursor.continue();
                }
            }
            this.debugRequest = EDebugRequest.eContinue;
        };
        /**
         * @public
         */
        ExecutionGraph.prototype.breakAll = function () {
            for (var wc = 0; wc < this.waitingCursors.length; wc++) {
                var waitingCursor = this.waitingCursors[wc];
                if (waitingCursor instanceof ExecutionGraph && waitingCursor.isExecuting()) {
                    waitingCursor.breakAll();
                }
            }
            this.debugRequest = EDebugRequest.eBreakAll;
        };
        /**
         * @public
         * @param {string} contextPath - The context path.
         */
        ExecutionGraph.prototype.stepOver = function (contextPath) {
            if (this.model.toPath() === contextPath) {
                this.debugRequest = EDebugRequest.eStepOver;
            }
            else {
                for (var wc = 0; wc < this.waitingCursors.length; wc++) {
                    var waitingCursor = this.waitingCursors[wc];
                    if (waitingCursor instanceof ExecutionGraph && contextPath.startsWith(waitingCursor.model.toPath())) {
                        waitingCursor.stepOver(contextPath);
                        break;
                    }
                }
            }
        };
        /**
         * @public
         * @param {string} contextPath - The context path.
         */
        ExecutionGraph.prototype.stepInto = function (contextPath) {
            if (this.model.toPath() === contextPath) {
                if (this.breakCursor !== undefined && this.breakCursor.model.handleStepInto()) {
                    this.debugRequest = EDebugRequest.eStepInto;
                }
            }
            else {
                for (var wc = 0; wc < this.waitingCursors.length; wc++) {
                    var waitingCursor = this.waitingCursors[wc];
                    if (waitingCursor instanceof ExecutionGraph && contextPath.startsWith(waitingCursor.model.toPath())) {
                        waitingCursor.stepInto(contextPath);
                        break;
                    }
                }
            }
        };
        /**
         * @public
         * @param {string} contextPath - The context path.
         */
        ExecutionGraph.prototype.stepOut = function (contextPath) {
            if (this.model.toPath() === contextPath) {
                this.continue();
            }
            else {
                for (var wc = 0; wc < this.waitingCursors.length; wc++) {
                    var waitingCursor = this.waitingCursors[wc];
                    if (waitingCursor instanceof ExecutionGraph && contextPath.startsWith(waitingCursor.model.toPath())) {
                        waitingCursor.stepOut(contextPath);
                        break;
                    }
                }
            }
        };
        /**
         * @public
         * @param {IBreakpoint[]} breakpoints - Breakpoints.
         */
        ExecutionGraph.prototype.updateBreakpoints = function (breakpoints) {
            this.breakpoints = breakpoints;
            this.breakpointsByPath = {};
            for (var b = 0; b < this.blocks.length; b++) {
                var block = this.blocks[b];
                if (block instanceof ExecutionGraph) {
                    block.updateBreakpoints(breakpoints);
                }
            }
            for (var bp = 0; bp < breakpoints.length; bp++) {
                var breakpoint = breakpoints[bp];
                this.breakpointsByPath[breakpoint.path] = undefined;
            }
        };
        /**
         * @private
         * @param {ExecutionBlock} block - The block.
         * @return {boolean} True if the block has breakpoint on given block, false otherwise.
         */
        ExecutionGraph.prototype.hasBreakpointOn = function (block) {
            var result = this.breakCursor !== block;
            result = result && this.breakpointsByPath.hasOwnProperty(block.model.toPath());
            return result;
        };
        /**
         * @private
         */
        ExecutionGraph.prototype.onBlockBreak = function () {
            this.breakAll();
        };
        /**
         * @private
         * @param {ExecutionBlock} block - The block.
         * @returns {boolean} True if the block has to break, false otherwise.
         */
        ExecutionGraph.prototype.hasToBreak = function (block) {
            var result = this.debugRequest === EDebugRequest.eBreakAll || this.hasBreakpointOn(block);
            if (result) {
                this.debugRequest = EDebugRequest.eBreakAll;
                if (this.breakCursor === undefined) {
                    this.breakCursor = block;
                    this.sendBreakEvent(this.breakCursor);
                    this.breakAll();
                    if (this.parent !== undefined) {
                        this.parent.onBlockBreak();
                    }
                }
            }
            else if (this.breakCursor !== undefined) {
                this.sendUnbreakEvent(this.breakCursor);
                this.breakCursor = undefined;
            }
            if (this.debugRequest === EDebugRequest.eStepOver) {
                this.debugRequest = EDebugRequest.eBreakAll;
            }
            return result;
        };
        /**
         * @private
         * @returns {boolean} True if the graph has to step into.
         */
        ExecutionGraph.prototype.hasToStepInto = function () {
            var result = this.debugRequest === EDebugRequest.eStepInto;
            if (result) {
                this.debugRequest = EDebugRequest.eBreakAll;
            }
            return result;
        };
        /**
         * Executes the loop of the graph.
         * @private
         * @param {IRunParameters} runParams - The parameters of the loop.
         * @returns {EExecutionResult} The graph execution result.
         */
        ExecutionGraph.prototype.onExecute = function (runParams) {
            var currentCursor;
            // Merge previous waiting cursors and clear it
            var cursorToExecute = this.waitingCursors;
            this.waitingCursors = [];
            // Expand if template
            if (this.model.isTemplate() && this.model.expand()) {
                this.buildFromGraphModel();
            }
            // Get the activated graph input control ports
            var nextInputControlPortCursors = this.getActivatedInputControlPorts();
            cursorToExecute = cursorToExecute.concat(nextInputControlPortCursors);
            var blocksCount = 0;
            while (undefined !== (currentCursor = cursorToExecute.shift())) {
                // Check maximum graph executed blocks during one frame
                if (blocksCount > ExecutionGraph.kMaximumExecutedBlocks) {
                    throw new Error('Graph ' + this.model.getName() + ' has reached maximum authorized executed blocks!');
                }
                if (currentCursor instanceof ExecutionControlPort) {
                    var port = currentCursor;
                    port.deactivate();
                    var nextLinkCursors = port.getLinksToExecute();
                    cursorToExecute = cursorToExecute.concat(nextLinkCursors);
                }
                else if (currentCursor instanceof ExecutionControlLinkContext) {
                    var linkCtx = currentCursor;
                    if (linkCtx.activate()) {
                        var link = linkCtx.link;
                        var block = link.endPort.parent;
                        if (block !== this && block.executionResult === Enums.EExecutionResult.eExecutionWorker) {
                            this.waitingCursors.push(linkCtx);
                        }
                        else {
                            link.endPort.setEvent(link.startPort.getEvent());
                            link.endPort.activate();
                            if (block !== this) {
                                cursorToExecute.unshift(block);
                            }
                        }
                    }
                    else {
                        this.waitingCursors.push(linkCtx);
                    }
                }
                else if (currentCursor instanceof ExecutionBlock) {
                    var block = currentCursor;
                    // Copy values linked to this block input data ports
                    var dataReady = ExecutionGraph.copyInputDataLinkValues(block);
                    if (!dataReady) {
                        // If at least one data port is not ready then stacks the block and differs its execution next frame
                        this.waitingCursors.push(currentCursor);
                        blocksCount++;
                    }
                    else {
                        if (!block.isExecuting() && this.hasToBreak(block)) {
                            this.waitingCursors.push(currentCursor);
                            this.waitingCursors.push.apply(this.waitingCursors, cursorToExecute);
                            cursorToExecute.length = 0;
                        }
                        else {
                            if (this.hasToStepInto()) {
                                block.breakAll();
                            }
                            var result = block.execute(runParams);
                            blocksCount++;
                            if (block.isExecuting()) {
                                this.waitingCursors.push(currentCursor);
                            }
                            else if (result === Enums.EExecutionResult.eExecutionError || !ExecutionGraph.isExecutionResult(result)) {
                                throw new Error('Failed to execute block ' + block.model.getName() + ' in graph ' + this.model.getName());
                            }
                            ExecutionGraph.copyOutputDataLinkValues(block);
                            var nextOutputControlPortCursors = block.getActivatedOutputControlPorts();
                            cursorToExecute.unshift.apply(cursorToExecute, nextOutputControlPortCursors);
                        }
                    }
                }
            }
            return this.waitingCursors.length > 0 ? Enums.EExecutionResult.eExecutionPending : Enums.EExecutionResult.eExecutionFinished;
        };
        ExecutionGraph.isExecutionResult = function (result) {
            return Enums.EExecutionResult.hasOwnProperty(result);
        };
        ExecutionGraph.prototype.getModules = function () {
            return this.modules;
        };
        ExecutionGraph.prototype.getNodeIdFromSelector = function (nodeIdSelectorName) {
            var nodeId;
            if (nodeIdSelectorName === Tools.parentNodeIdSelector) {
                nodeId = this.getNodeId();
            }
            else {
                nodeId = this.nodeIdsBySelector[nodeIdSelectorName];
                if (nodeId === undefined) {
                    var nodeIdSelector = this.model.getNodeIdSelectorByName(nodeIdSelectorName);
                    if (nodeIdSelector !== undefined) {
                        var pool = nodeIdSelector.getPool();
                        var criterionEnumValue = nodeIdSelector.getCriterion();
                        var criterion = void 0;
                        switch (criterionEnumValue) {
                            case Enums.ECriterion.eIdentifier:
                                {
                                    var identifier = nodeIdSelector.getIdentifier();
                                    criterion = EK.Criterion.identifier(identifier);
                                    break;
                                }
                            case Enums.ECriterion.eOnlyMyHypervisor:
                                {
                                    criterion = EK.Criterion.onlyMyHypervisor();
                                    break;
                                }
                            case Enums.ECriterion.eNotMyHypervisor:
                                {
                                    criterion = EK.Criterion.notMyHypervisor();
                                    break;
                                }
                            case Enums.ECriterion.ePreferMyHypervisor:
                                {
                                    criterion = EK.Criterion.preferMyHypervisor();
                                    break;
                                }
                            default:
                                {
                                    criterion = undefined;
                                    break;
                                }
                        }
                        var timeout = nodeIdSelector.getTimeout();
                        if (timeout !== undefined) {
                            if (criterion === undefined) {
                                criterion = EK.Criterion.timeout(timeout);
                            }
                            else {
                                criterion.withTimeout(timeout);
                            }
                        }
                        var queuing = nodeIdSelector.getQueuing();
                        if (!queuing) {
                            if (criterion === undefined) {
                                criterion = EK.Criterion.noQueuing();
                            }
                            else {
                                criterion.withoutQueuing();
                            }
                        }
                        var cmdLine = nodeIdSelector.getCmdLine();
                        if (cmdLine !== undefined) {
                            if (criterion === undefined) {
                                criterion = EK.Criterion.none();
                            }
                            criterion.withCmdLine(cmdLine);
                        }
                        var node = this.getNode();
                        nodeId = node.select(pool, criterion);
                        this.nodeIdsBySelector[nodeIdSelectorName] = nodeId;
                    }
                }
            }
            return nodeId;
        };
        ExecutionGraph.prototype.getNodeIdFromPool = function (pool) {
            var node = this.getNode();
            var nodeId = node.select(pool);
            this.nodeIds.push(nodeId);
            return nodeId;
        };
        ExecutionGraph.prototype.disconnect = function () {
            for (var b = 0; b < this.blocks.length; b++) {
                var block = this.blocks[b];
                if (block instanceof ExecutionGraph) {
                    block.disconnect();
                }
            }
            var selectors = Object.keys(this.nodeIdsBySelector);
            for (var s = 0; s < selectors.length; s++) {
                var selector = selectors[s];
                this.nodeIdsBySelector[selector].close();
                delete this.nodeIdsBySelector[selector];
            }
            for (var nid = 0; nid < this.nodeIds.length; nid++) {
                this.nodeIds[nid].close();
            }
            this.nodeIds.length = 0;
        };
        ExecutionGraph.kMaximumExecutedBlocks = 1024;
        return ExecutionGraph;
    }(ExecutionBlock));
    return ExecutionGraph;
});
