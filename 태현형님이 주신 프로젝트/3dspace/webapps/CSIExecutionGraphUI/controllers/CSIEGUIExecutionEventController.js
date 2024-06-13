/// <amd-module name='DS/CSIExecutionGraphUI/controllers/CSIEGUIExecutionEventController'/>
define("DS/CSIExecutionGraphUI/controllers/CSIEGUIExecutionEventController", ["require", "exports", "DS/CSIExecutionGraphUI/tools/CSIEGUITools", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphContainerBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayConcatBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayGetBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayGetIndexBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayInsertBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayLengthBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayPopBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayPushBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayRemoveBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArraySetBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayShiftBlock", "DS/EPSSchematicsCoreLibrary/array/EPSArrayUnshiftBlock", "DS/EPSSchematicsCoreLibrary/calculator/EPSAddBlock", "DS/EPSSchematicsCoreLibrary/calculator/EPSDivideBlock", "DS/EPSSchematicsCoreLibrary/calculator/EPSIsEqualBlock", "DS/EPSSchematicsCoreLibrary/calculator/EPSMultiplyBlock", "DS/EPSSchematicsCoreLibrary/calculator/EPSSetValueBlock", "DS/EPSSchematicsCoreLibrary/calculator/EPSSubstractBlock", "DS/EPSSchematicsCoreLibrary/flow/EPSIfBlock", "DS/EPSSchematicsCoreLibrary/flow/EPSOnlyOneBlock", "DS/EPSSchematicsCSI/EPSSchematicsCSIExport", "DS/EPSSchematicsCSI/EPSSchematicsCSIIntrospection"], function (require, exports, CSIEGUITools, EventServices, ExecutionEvents, ExecutionEnums, Tools, ModelEnums, GraphContainerBlock, ArrayConcatBlock, ArrayGetBlock, ArrayGetIndexBlock, ArrayInsertBlock, ArrayLengthBlock, ArrayPopBlock, ArrayPushBlock, ArrayRemoveBlock, ArraySetBlock, ArrayShiftBlock, ArrayUnshiftBlock, AddBlock, DivideBlock, IsEqualBlock, MultiplyBlock, SetValueBlock, SubstractBlock, IfBlock, OnlyOneBlock, CSIExport, CSIIntrospection) {
    "use strict";
    /**
     * This class defines the CSI Execution Graph UI execution event controller.
     * @class CSIEGUIExecutionEventController
     * @alias module:DS/CSIExecutionGraphUI/controllers/CSIEGUIExecutionEventController
     * @private
     */
    var CSIEGUIExecutionEventController = /** @class */ (function () {
        /**
         * @constructor
         * @param {CSIExecutionGraphUIEditor} editor - The CSI Execution Graph UI editor.
         */
        function CSIEGUIExecutionEventController(editor) {
            this._pendingBlocks = {};
            this._connectionStatesBySelector = {};
            this._connectionStatesByPool = {};
            this._editor = editor;
        }
        /**
         * Removes the controller.
         * @public
         */
        CSIEGUIExecutionEventController.prototype.remove = function () {
            this._editor = undefined;
            this._pendingBlocks = undefined;
            this._debugId = undefined;
            this._connectionStatesBySelector = undefined;
            this._connectionStatesByPool = undefined;
        };
        /**
         * Clears the controller.
         * @public
         */
        CSIEGUIExecutionEventController.prototype.clear = function () {
            this._pendingBlocks = {};
            this._debugId = undefined;
            this._connectionStatesBySelector = {};
            this._connectionStatesByPool = {};
        };
        /**
         * Gets the debugId.
         * @public
         * @returns {number} The debugId.
         */
        CSIEGUIExecutionEventController.prototype.getDebugId = function () {
            return this._debugId;
        };
        /**
         * Handles debug event.
         * @public
         * @param {Parameters} parameters - The debug event parameters.
         */
        CSIEGUIExecutionEventController.prototype.debugEvent = function (parameters) {
            var portParam = parameters.readParameters('port', 'Parameters');
            var port = portParam.readString('name');
            var subPort = port.split('.')[1];
            var block = portParam.readString('block');
            var dataParam = parameters.readParameters('data', 'Parameters');
            if (subPort === 'id' && block === Tools.rootPath) { // We only need root debugId for the moment
                this._debugId = dataParam.readUint32('debugId');
            }
            else if (subPort === 'break') {
                this._breakEvent(dataParam);
            }
            else if (subPort === 'unbreak') {
                this._unbreakEvent(dataParam);
            }
            else if (subPort === 'info') {
                this.debugEvent(dataParam);
            }
            else if (subPort === 'progress') {
                this._progressEvent(dataParam);
            }
            else if (subPort === 'blockState') {
                this._blockStateEvent(dataParam);
            }
            else if (subPort === 'connectionState') {
                this._connectionStateEvent(dataParam);
            }
        };
        /**
         * Computes the trace data port events to send for the root graph.
         * @public
         * @param {string} portName - The name of the data port.
         * @param {object} data - The sub data port structure.
         */
        CSIEGUIExecutionEventController.prototype.executionGraphDataEvent = function (portName, data) {
            this._executionDataEvent(Tools.rootPath, portName, data);
        };
        /**
         * Sends a trace stop event.
         * @public
         */
        // eslint-disable-next-line class-methods-use-this
        CSIEGUIExecutionEventController.prototype.traceStop = function () {
            EventServices.dispatchEvent(new ExecutionEvents.TraceStopEvent());
        };
        /**
         * Handles break event.
         * @private
         * @param {Parameters} parameters - The break event parameters.
         */
        CSIEGUIExecutionEventController.prototype._breakEvent = function (parameters) {
            var breakPortParam = parameters.readParameters('port', 'Parameters');
            var breakPort = breakPortParam.readString('name');
            var breakBlock = breakPortParam.readString('block').replace(/\//g, '.');
            var breakDataParam = parameters.readParameters('data', 'Parameters');
            var breakData = breakDataParam !== undefined ? breakDataParam.toJSObject() : {};
            var debugBreakEvent = new ExecutionEvents.DebugBreakEvent();
            debugBreakEvent.path = Tools.rootPath + '.' + breakBlock;
            EventServices.dispatchEvent(debugBreakEvent);
            if (breakData !== undefined) {
                this._executionDataEvent(breakBlock, breakPort, breakData);
            }
        };
        /**
         * Handles unbreak event.
         * @private
         * @param {Parameters} parameters - The unbreak event parameters.
         */
        // eslint-disable-next-line class-methods-use-this
        CSIEGUIExecutionEventController.prototype._unbreakEvent = function (parameters) {
            var unbreakPortParam = parameters.readParameters('port', 'Parameters');
            var unbreakBlock = unbreakPortParam.readString('block').replace(/\//g, '.');
            var debugUnbreakEvent = new ExecutionEvents.DebugUnbreakEvent();
            debugUnbreakEvent.path = Tools.rootPath + '.' + unbreakBlock;
            EventServices.dispatchEvent(debugUnbreakEvent);
        };
        /**
         * Handles block state event.
         * @private
         * @param {Parameters} parameters - The block state event parameters.
         */
        CSIEGUIExecutionEventController.prototype._blockStateEvent = function (parameters) {
            var blockStatePortParam = parameters.readParameters('port', 'Parameters');
            var blockStatePortName = blockStatePortParam.readString('name');
            var blockState = blockStatePortName.split('.')[1];
            var blockId = blockStatePortParam.readString('block');
            var blockPath = Tools.rootPath + '.' + blockId.replace(/\//g, '.');
            var alreadyConnected = false;
            if (blockState === 'calling') {
                var blockStateDataParam = parameters.readParameters('data', 'Parameters');
                var selector = blockStateDataParam.readString('selector');
                if (selector === '_') {
                    alreadyConnected = true;
                }
                else {
                    var instance = blockStateDataParam.readUint32('instance');
                    var graphModel = this._editor.getGraphModel();
                    var blockModel = blockPath === Tools.rootPath ? graphModel : graphModel.getObjectFromPath(blockPath);
                    var graphPath = blockModel.graph.toPath();
                    var pool = CSIIntrospection.getFunctionPool(blockModel.getUid()) || 'CSIExecutionGraph';
                    var connectionState = this._getConnectionState(graphPath, selector, pool, instance);
                    connectionState.blockPaths.push(blockPath);
                    alreadyConnected = connectionState.status === 'connected';
                }
            }
            if (blockState !== 'calling' || alreadyConnected) {
                var debugBlockEvent = new ExecutionEvents.DebugBlockEvent();
                debugBlockEvent.path = blockPath;
                switch (blockState) {
                    case 'pending':
                        {
                            debugBlockEvent.state = ExecutionEnums.EBlockState.ePending;
                            break;
                        }
                    case 'connecting':
                        {
                            debugBlockEvent.state = ExecutionEnums.EBlockState.eConnecting;
                            break;
                        }
                    case 'calling':
                        {
                            debugBlockEvent.state = ExecutionEnums.EBlockState.eExecuting;
                            break;
                        }
                    case 'terminated':
                        {
                            debugBlockEvent.state = ExecutionEnums.EBlockState.eTerminated;
                            break;
                        }
                }
                EventServices.dispatchEvent(debugBlockEvent);
            }
        };
        /**
         * Gets connection state.
         * @private
         * @param {string} graphPath - The connection state graph path.
         * @param {string} selector - The connection state selector.
         * @param {string} pool - The connection state pool.
         * @param {number} instance - The connection state instance.
         * @returns {IConnectionState} The connection state.
         */
        CSIEGUIExecutionEventController.prototype._getConnectionState = function (graphPath, selector, pool, instance) {
            var connectionState = undefined;
            if (selector !== '_') {
                var connectionStates = void 0;
                if (selector !== '') {
                    var graphSelector = graphPath + '.' + selector;
                    connectionStates = this._connectionStatesBySelector[graphSelector];
                    if (connectionStates === undefined) {
                        connectionStates = [];
                        this._connectionStatesBySelector[graphSelector] = connectionStates;
                    }
                }
                else {
                    var graphPool = graphPath + '.' + pool;
                    connectionStates = this._connectionStatesByPool[graphPool];
                    if (connectionStates === undefined) {
                        connectionStates = [];
                        this._connectionStatesByPool[graphPool] = connectionStates;
                    }
                }
                connectionState = connectionStates[instance];
                if (connectionState === undefined) {
                    connectionState = {};
                    connectionState.status = '';
                    connectionState.blockPaths = [];
                    connectionStates[instance] = connectionState;
                }
            }
            return connectionState;
        };
        /**
         * Handles connection state event.
         * @private
         * @param {Parameters} parameters - The connection state event parameters.
         */
        CSIEGUIExecutionEventController.prototype._connectionStateEvent = function (parameters) {
            var connectionStatePortParam = parameters.readParameters('port', 'Parameters');
            var graphId = connectionStatePortParam.readString('block');
            var isRootGraph = graphId === Tools.rootPath;
            var graphPath = isRootGraph ? graphId : Tools.rootPath + '.' + graphId.replace(/\//g, '.');
            var connectionStateDataParam = parameters.readParameters('data', 'Parameters');
            var selector = connectionStateDataParam.readString('selector');
            if (selector !== '_') {
                var pool = connectionStateDataParam.readString('pool');
                var instance = connectionStateDataParam.readUint32('instance');
                var status_1 = connectionStateDataParam.readString('status');
                var connectionState = this._getConnectionState(graphPath, selector, pool, instance);
                connectionState.status = status_1;
                if (status_1 === 'connected') {
                    connectionState.blockPaths.forEach(function (blockPath) {
                        var debugBlockEvent = new ExecutionEvents.DebugBlockEvent();
                        debugBlockEvent.path = blockPath;
                        debugBlockEvent.state = ExecutionEnums.EBlockState.eExecuting;
                        EventServices.dispatchEvent(debugBlockEvent);
                    });
                }
            }
        };
        /**
         * Computes the trace data port events to send.
         * @private
         * @param {string} blockId - The id of the block.
         * @param {string} portName - The name of the data port.
         * @param {object} data - The sub data port structure.
         */
        CSIEGUIExecutionEventController.prototype._executionDataEvent = function (blockId, portName, data) {
            var graphModel = this._editor && this._editor.getGraphModel();
            if (graphModel !== undefined) {
                var blockPath = Tools.rootPath + '.' + blockId.replace(/\//g, '.');
                var blockModel_1 = blockId === Tools.rootPath ? graphModel : graphModel.getObjectFromPath(blockPath);
                var blockCtrs = [GraphContainerBlock, IfBlock, IsEqualBlock, SetValueBlock, OnlyOneBlock,
                    ArrayConcatBlock, ArrayGetBlock, ArrayGetIndexBlock, ArrayInsertBlock, ArrayLengthBlock, ArrayPopBlock,
                    ArrayPushBlock, ArrayRemoveBlock, ArraySetBlock, ArrayShiftBlock, ArrayUnshiftBlock,
                    AddBlock, DivideBlock, MultiplyBlock, SubstractBlock];
                if (CSIEGUITools.isInstanceOf(blockModel_1, blockCtrs)) {
                    Object.keys(data).forEach(function (subDataPortName) {
                        var subDataPortValue = data[subDataPortName];
                        var subDataPortModel = blockModel_1.getDataPortByName(subDataPortName) || blockModel_1.getDataPortByName(subDataPortName.charAt(0).toUpperCase() + subDataPortName.slice(1));
                        if (subDataPortModel && subDataPortValue !== undefined) {
                            CSIEGUIExecutionEventController._recTraceDataPortEvent(blockModel_1, subDataPortModel, subDataPortValue, portName + '.');
                            CSIEGUIExecutionEventController._traceDataPortEvent(subDataPortModel, subDataPortValue);
                        }
                    });
                }
                else {
                    var dataPortModel = blockModel_1.getDataPortByName(portName) || blockModel_1.getDataPortByName(portName.charAt(0).toUpperCase() + portName.slice(1));
                    if (dataPortModel && data !== undefined) {
                        CSIEGUIExecutionEventController._recTraceDataPortEvent(blockModel_1, dataPortModel, data, portName + '.');
                        CSIEGUIExecutionEventController._traceDataPortEvent(dataPortModel, data);
                    }
                }
            }
        };
        /**
         * Sends a trace data port event for each sub data port.
         * @private
         * @static
         * @param {Block} blockModel - The block model.
         * @param {DataPort} dataPortModel - The data port model.
         * @param {object} data - The sub data port structure.
         * @param {string} path - The path of the data port.
         */
        CSIEGUIExecutionEventController._recTraceDataPortEvent = function (blockModel, dataPortModel, data, path) {
            var _this = this;
            if (dataPortModel && typeof data === 'object') {
                Object.keys(data).forEach(function (subDataPortName) {
                    var subDataPortValue = data[subDataPortName];
                    if (subDataPortValue !== undefined) {
                        var subDataPortModel = dataPortModel.getDataPortByName(subDataPortName) || blockModel.getDataPortByName(path + subDataPortName);
                        var subDataPortPath = path + subDataPortName + '.';
                        if (subDataPortModel) {
                            _this._recTraceDataPortEvent(blockModel, subDataPortModel, subDataPortValue, subDataPortPath);
                            if (subDataPortModel.getDataLinks().length > 0) {
                                _this._traceDataPortEvent(subDataPortModel, subDataPortValue);
                            }
                        }
                        else {
                            _this._recTraceDataPortEvent(blockModel, dataPortModel, subDataPortValue, subDataPortPath);
                        }
                    }
                });
            }
        };
        /**
         * Sends a trace data port event with the associated trace data link events.
         * @private
         * @static
         * @param {DataPort} dataPortModel - The data port model.
         * @param {*} value - The data port value.
         */
        CSIEGUIExecutionEventController._traceDataPortEvent = function (dataPortModel, value) {
            var event = new ExecutionEvents.TraceDataPortEvent();
            event.path = dataPortModel.toPath();
            event.value = value;
            event.valueType = dataPortModel.getValueType();
            EventServices.dispatchEvent(event);
            dataPortModel.getDataLinks().forEach(function (dataLink) {
                var eventLink = new ExecutionEvents.TraceDataLinkEvent();
                eventLink.path = dataLink.toPath();
                EventServices.dispatchEvent(eventLink);
            });
        };
        /**
         * Dispatches the trace block event.
         * @private
         * @static
         * @param {TraceBlockEvent} traceBlockEvent - The trace block event to dispatch.
         * @param {string} path - The path of the block in the CSI map.
         * @returns {boolean} True if the event has been dispatched else false.
         */
        CSIEGUIExecutionEventController._dispatchTraceBlockEvent = function (traceBlockEvent, path) {
            var result = false;
            if (traceBlockEvent) {
                EventServices.dispatchEvent(traceBlockEvent);
                if (!traceBlockEvent.errorStack) {
                    var portPaths = CSIExport.mapCSItoSchematics[path] || [];
                    portPaths.forEach(function (portPath) {
                        var eventPort = new ExecutionEvents.TracePortEvent();
                        eventPort.path = portPath;
                        EventServices.dispatchEvent(eventPort);
                    });
                    var linkPaths = CSIExport.mapSchematicsLinks[path] || [];
                    linkPaths.forEach(function (linkPath) {
                        var eventLink = new ExecutionEvents.TraceLinkEvent();
                        eventLink.path = linkPath;
                        EventServices.dispatchEvent(eventLink);
                    });
                }
            }
            return result;
        };
        /**
         * Handles progress event.
         * @private
         * @param {Parameters} parameters - The progress event parameters.
         */
        CSIEGUIExecutionEventController.prototype._progressEvent = function (parameters) {
            var portParam = parameters.readParameters('port', 'Parameters');
            var dataParam = parameters.readParameters('data', 'Parameters');
            var data = (dataParam === null || dataParam === void 0 ? void 0 : dataParam.toJSObject()) || {};
            var blockId = portParam.readString('block');
            var port = portParam.readString('name');
            var path = blockId + '.' + port;
            var isRootGraph = blockId === Tools.rootPath;
            var blockPath = Tools.rootPath + '.' + blockId.replace(/\//g, '.');
            var graphModel = this._editor.getGraphModel();
            var blockModel = (graphModel ? (isRootGraph ? graphModel : graphModel.getObjectFromPath(blockPath)) : undefined);
            if (path && blockId && port) {
                var traceBlockEvent = new ExecutionEvents.TraceBlockEvent();
                traceBlockEvent.path = blockPath;
                if (isRootGraph) {
                    traceBlockEvent.path = blockId;
                    if (port.startsWith('call')) {
                        EventServices.dispatchEvent(new ExecutionEvents.TraceStopEvent());
                        EventServices.dispatchEvent(new ExecutionEvents.TraceStartEvent());
                    }
                }
                this._executionDataEvent(blockId, port, data);
                if (port.startsWith('call')) {
                    traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionPending;
                    var uid = blockModel.getUid();
                    if (this._pendingBlocks[blockId] && port === 'call' && uid !== CSIEGUITools.AndAndBlockUid && uid !== CSIEGUITools.OrOrBlockUid) {
                        this._pendingBlocks[blockId] += 1;
                    }
                    else {
                        this._pendingBlocks[blockId] = 1;
                    }
                }
                else if (port.startsWith('success')) {
                    if (this._pendingBlocks[blockId] === undefined || this._pendingBlocks[blockId] === 1) {
                        traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionFinished;
                        this._pendingBlocks[blockId] = undefined;
                    }
                    else {
                        this._pendingBlocks[blockId] -= 1;
                        traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionPending;
                    }
                }
                else if (port.startsWith('error')) {
                    if (parameters.exists('data') && parameters.readParameters('data', 'Parameters').getObjectType() === 'CSISystemError') {
                        traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionError;
                        traceBlockEvent.errorStack = parameters.readString('description');
                    }
                    else if (this._pendingBlocks[blockId] === undefined || this._pendingBlocks[blockId] === 1) {
                        traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionWarning;
                        if (blockModel instanceof IfBlock || blockModel instanceof IsEqualBlock) {
                            traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionFinished;
                        }
                        this._pendingBlocks[blockId] = undefined;
                    }
                    else {
                        this._pendingBlocks[blockId] -= 1;
                        traceBlockEvent.executionResult = ModelEnums.EExecutionResult.eExecutionPending;
                    }
                }
                else if (!port.startsWith('progress')) {
                    traceBlockEvent = undefined;
                }
                CSIEGUIExecutionEventController._dispatchTraceBlockEvent(traceBlockEvent, path);
            }
        };
        return CSIEGUIExecutionEventController;
    }());
    return CSIEGUIExecutionEventController;
});
