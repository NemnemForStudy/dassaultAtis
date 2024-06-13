/// <amd-module name='DS/CSIExecutionGraphUI/components/CSIEGUIClient'/>
define("DS/CSIExecutionGraphUI/components/CSIEGUIClient", ["require", "exports", "DS/CSIExecutionGraphUI/controllers/CSIEGUIExecutionEventController", "DS/CSIExecutionGraphUI/tools/CSIEGUITools", "DS/CSIExecutionGraphUI/typings/ExperienceKernel/CSIEGUIExperienceKernel", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/CSIExecutionGraphUI/typings/CSIIntrospectionWeb/CSIEGUICSIExecutionGraph", "DS/EPSSchematicsCSI/EPSSchematicsCSITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/CSIExecutionGraphUI/typings/CSICommandBinder/CSIEGUICommandBinder", "DS/EPSSchematicsUI/EPSSchematicsUIEnums"], function (require, exports, CSIEGUIExecutionEventController, CSIEGUITools, EK, Tools, CSIExecutionGraph, CSITools, UITools, EventServices, ExecutionEvents, CSI, UIEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a CSI Execution Graph UI Client component.
     * @class CSIEGUIClient
     * @alias module:DS/CSIExecutionGraphUI/components/CSIEGUIClient
     * @private
     */
    var CSIEGUIClient = /** @class */ (function () {
        /**
         * @constructor
         * @param {CSIExecutionGraphUIEditor} editor - The CSI Execution Graph UI editor.
         */
        function CSIEGUIClient(editor) {
            this._requestedDisconnection = false;
            this._requestedReconnection = false;
            this._nonSelectablePools = [];
            this._kTimeout = 10;
            this._isBlockDebugCallEnabled = false;
            this._executionGraphEditor = editor;
            this._eventController = new CSIEGUIExecutionEventController(editor);
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
         * Removes the client.
         * @public
         */
        CSIEGUIClient.prototype.remove = function () {
            if (this._eventController) {
                this._eventController.remove();
            }
            this.disconnect();
            this._executionGraphEditor = undefined;
            this._eventController = undefined;
            this._nodeId = undefined;
            this._nodeWebapp = undefined;
            this._poolName = undefined;
            this._inputs = undefined;
            this._outputs = undefined;
            this._progresses = undefined;
            this._breakpoints = undefined;
            this._interruption = undefined;
            this._expectedStatus = undefined;
            this._requestedDisconnection = undefined;
            this._requestedReconnection = undefined;
            this._nonSelectablePools = undefined;
            this._isBlockDebugCallEnabled = undefined;
        };
        /**
         * Checks if the client is connected.
         * @public
         * @returns {boolean} True if the client is connected, false otherwise.
         */
        CSIEGUIClient.prototype.isConnected = function () {
            return this._nodeId && this._nodeId.getStatus() === EK.Status.connected;
        };
        /**
         * Connects the client.
         * @public
         * @param {IConnectionOptions} options - The connection options.
         */
        CSIEGUIClient.prototype.connect = function (options) {
            var _a, _b;
            this._requestedDisconnection = false;
            this._requestedReconnection = false;
            this._poolName = options.poolName;
            this._resetNodes();
            var poolWebapp = CSI.getPool('executionGraph');
            this._nodeWebapp = poolWebapp.createNode({
                hypervisorUrl: options.hypervisorUrl,
                onError: (_a = options.onError) === null || _a === void 0 ? void 0 : _a.bind(this),
                authentication: (_b = options.authentication) === null || _b === void 0 ? void 0 : _b.bind(this)
            });
            this._nodeWebapp.isPoolSelectable(this._poolName, this._checkPoolSelectability.bind(this));
            var noIdentifier = !options.identifier || options.identifier === 'none' || options.identifier.trim() === '';
            var criterion = noIdentifier ? EK.Criterion.timeout(this._kTimeout) : EK.Criterion.identifier(options.identifier).withTimeout(this._kTimeout);
            this._nodeId = this._nodeWebapp.select(this._poolName, criterion);
            if (options.onStatusChange) {
                this._nodeId.onStatusChange(options.onStatusChange.bind(this));
                options.onStatusChange.call(this, this._nodeId, this._poolName);
            }
        };
        /**
         * Disconnects the client.
         * @public
         */
        CSIEGUIClient.prototype.disconnect = function () {
            this._requestedDisconnection = true;
            this.interruptPlay();
            this._resetNodes();
        };
        /**
         * Reconnects the client.
         * @public
         */
        CSIEGUIClient.prototype.reconnect = function () {
            this.disconnect();
            this._requestedReconnection = true;
        };
        /**
         * Interrupts the play.
         * @public
         */
        CSIEGUIClient.prototype.interruptPlay = function () {
            if (this._interruption) {
                try {
                    this._interruption.interrupt();
                }
                catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            }
            this._eventController.traceStop();
        };
        /**
         * Resets the inputs, outputs and progresses of the client.
         * @public
         */
        CSIEGUIClient.prototype.resetIO = function () {
            this._inputs = undefined;
            this._outputs = undefined;
            this._progresses = [];
        };
        /**
         * Continues the execution.
         * @public
         * @param {Function} [onSuccess] - the onSuccess callback.
         */
        CSIEGUIClient.prototype.continue = function (onSuccess) {
            var debugParameters = new CSI.Parameters();
            debugParameters.writeString('debugRequest', 'continue');
            this._debuggerCall(debugParameters, onSuccess);
        };
        /**
         * Breaks all the execution.
         * @public
         */
        CSIEGUIClient.prototype.breakAll = function () {
            var debugParameters = new CSI.Parameters();
            debugParameters.writeString('debugRequest', 'breakAll');
            this._debuggerCall(debugParameters);
        };
        /**
         * Steps over the execution.
         * @public
         * @param {string} contextPath - The context path.
         */
        CSIEGUIClient.prototype.stepOver = function (contextPath) {
            this._stepDebug(contextPath, 'stepOver');
        };
        /**
         * Steps into the execution.
         * @public
         * @param {string} contextPath - The context path.
         */
        CSIEGUIClient.prototype.stepInto = function (contextPath) {
            this._stepDebug(contextPath, 'stepInto');
        };
        /**
         * Steps out the execution.
         * @public
         * @param {string} contextPath - The context path.
         */
        CSIEGUIClient.prototype.stepOut = function (contextPath) {
            this._stepDebug(contextPath, 'stepOut');
        };
        /**
         * Updates the breakpoints.
         * @public
         * @param {IBreakpoint[]} breakpoints - The list of breakpoints.
         */
        CSIEGUIClient.prototype.updateBreakPoints = function (breakpoints) {
            this._breakpoints = breakpoints;
            if (CSIEGUITools.hasExecGraphDebugNewUpdateBreakPoints()) {
                var debugParameters = new CSI.Parameters();
                debugParameters.writeString('debugRequest', 'breakPoints');
                this._addBreakPoints(debugParameters);
                this._debuggerCall(debugParameters);
            }
        };
        /**
         * Updates the break block data.
         * @public
         * @param {IDebugValue[]} breakBlockData - The break block data.
         */
        CSIEGUIClient.prototype.updateBreakBlockData = function (breakBlockData) {
            if (CSIEGUITools.hasExecGraphDebugBreakBlockData()) {
                var events_1 = [];
                var debugParameters = new CSI.Parameters();
                debugParameters.writeString('debugRequest', 'breakBlockData');
                var breakBlockParameters_1 = new CSI.Parameters();
                breakBlockData.forEach(function (debugValue) {
                    var dataPort = debugValue.dataPort;
                    var value = debugValue.value;
                    var fromDebug = debugValue.fromDebug;
                    var valueType = dataPort.getValueType();
                    if (fromDebug) {
                        var event_1 = new ExecutionEvents.TraceDataPortEvent();
                        event_1.path = dataPort.toPath();
                        event_1.value = value;
                        event_1.valueType = valueType;
                        event_1.fromDebug = fromDebug;
                        events_1.push(event_1);
                    }
                    var nameWithoutSpaces = dataPort.getName().replace(/\s/g, '');
                    var csiName = nameWithoutSpaces.charAt(0).toLowerCase() + nameWithoutSpaces.slice(1);
                    CSITools.writePropertyParameters(csiName, valueType, value, dataPort.getGraphContext(), breakBlockParameters_1);
                    if (csiName === 'call' && breakBlockData.length === 1) {
                        breakBlockParameters_1 = breakBlockParameters_1.readParameters(csiName, breakBlockParameters_1.getObjectType());
                    }
                });
                debugParameters.writeParameters('breakBlockData', 'Parameters', breakBlockParameters_1);
                var onSuccess = function () { return events_1.forEach(function (event) { return EventServices.dispatchEvent(event); }); };
                this._debuggerCall(debugParameters, onSuccess);
            }
        };
        /**
         * Launches the play process.
         * @public
         * @param {IPlayOptions} [options] - The play options.
         */
        CSIEGUIClient.prototype.play = function (options) {
            var _this = this;
            var _a, _b;
            this.resetIO();
            this._eventController.clear();
            var inputJSON = this._executionGraphEditor.getJSONFunction(true);
            var parameters = new CSI.Parameters();
            var definition = JSON.parse(inputJSON).implementation.settings;
            var graphDefinition = new CSIExecutionGraph.CSIExecGraphBlock(definition);
            parameters.writeObject('definition', 'CSIExecGraphBlock', graphDefinition);
            this._inputs = this._getInputParameters();
            parameters.writeParameters('inputs', 'Parameters', this._inputs);
            var debugConfig = new CSI.Parameters();
            var currentViewMode = (_b = (_a = this._executionGraphEditor) === null || _a === void 0 ? void 0 : _a._getTabViewSwitcher()) === null || _b === void 0 ? void 0 : _b.getCurrentViewMode();
            if (currentViewMode === UIEnums.EViewMode.eDebug) {
                var breakOnStart = this._executionGraphEditor.getPlayPanel().getBreakOnStartToggleCheckedState();
                debugConfig.writeBool('breakOnStart', breakOnStart);
                this._addBreakPoints(debugConfig);
                debugConfig.writeBool('blockDebugCall', this._isBlockDebugCallEnabled);
                if (CSIEGUITools.hasExecGraphDebugBlockState()) {
                    debugConfig.writeBool('blockState', true);
                }
                if (CSIEGUITools.hasExecGraphDebugConnectionState()) {
                    debugConfig.writeBool('connectionState', true);
                }
            }
            debugConfig.writeBool('progressEvents', true);
            parameters.writeObject('debugConfig', 'Parameters', debugConfig);
            this._interruption = new EK.Interruption;
            this._getRequiredPools().forEach(function (poolName) {
                _this._nodeWebapp.isPoolSelectable(poolName, _this._checkPoolSelectability.bind(_this));
            });
            this._nodeWebapp.call({
                destinationNodeId: this._nodeId,
                name: 'csiExecutionGraphFunction',
                version: 1,
                parameters: parameters,
                onSuccess: function (param) {
                    _this._expectedStatus = 'success';
                    _this._outputs = param;
                    _this._updateTempRecordInfo();
                    _this._eventController.executionGraphDataEvent('success', param.toJSObject());
                    _this._eventController.clear();
                    if (options === null || options === void 0 ? void 0 : options.onSuccess) {
                        options.onSuccess.call(_this, param);
                    }
                },
                onError: function (param) {
                    _this._expectedStatus = 'error';
                    _this._outputs = param;
                    _this._updateTempRecordInfo();
                    _this._eventController.executionGraphDataEvent('error', param.toJSObject());
                    _this._eventController.clear();
                    if (options === null || options === void 0 ? void 0 : options.onError) {
                        options.onError.call(_this, param);
                    }
                },
                onProgress: function (param) {
                    var objParam = param.toJSObject();
                    if (objParam && objParam.port && objParam.port.name.startsWith('debug')) {
                        _this._eventController.debugEvent(param);
                    }
                    else {
                        _this._progresses.push(param);
                        if (options === null || options === void 0 ? void 0 : options.onProgress) {
                            options.onProgress.call(_this, param);
                        }
                    }
                    _this._updateTempRecordInfo();
                }
            }, this._interruption);
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
         * Resets the nodeId and the nodeWebapp.
         * @protected
         */
        CSIEGUIClient.prototype._resetNodes = function () {
            if (this._nodeId) {
                this._nodeId.close();
                this._nodeId = undefined;
            }
            if (this._nodeWebapp) {
                this._nodeWebapp.stop();
                this._nodeWebapp = undefined;
            }
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
         * Abstract step debug.
         * @private
         * @param {string} contextPath - The context path.
         * @param {string} stepType - The step type.
         */
        CSIEGUIClient.prototype._stepDebug = function (contextPath, stepType) {
            var parameters = new CSI.Parameters();
            parameters.writeString('debugRequest', stepType);
            if (CSIEGUITools.hasExecGraphDebugContextId()) {
                if (contextPath !== Tools.rootPath) {
                    var contextId = contextPath.replace(Tools.rootPath + '.', '');
                    contextId = contextId.replace(/\.containedGraph/g, '');
                    contextId = contextId.replace(/\./g, '/');
                    parameters.writeString('contextId', contextId);
                }
            }
            this._debuggerCall(parameters);
        };
        /**
         * Gets the inputs object.
         * @private
         * @returns {object} The inputs object.
         */
        CSIEGUIClient.prototype._getInputs = function () {
            var inputs;
            if (this._inputs && this._inputs.exportToString) {
                inputs = JSON.parse(this._inputs.exportToString());
            }
            return inputs;
        };
        /**
         * Gets the outputs object.
         * @private
         * @returns {object} The outputs object.
         */
        CSIEGUIClient.prototype._getOutputs = function () {
            var outputs;
            if (this._outputs && this._outputs.exportToString) {
                outputs = JSON.parse(this._outputs.exportToString());
            }
            return outputs;
        };
        /**
         * Gets the progresses object.
         * @private
         * @returns {object[]} The progresses object.
         */
        CSIEGUIClient.prototype._getProgresses = function () {
            var progresses;
            if (this._progresses && this._progresses.length > 0) {
                progresses = this._progresses.map(function (p) { return JSON.parse(p.exportToString()); });
            }
            return progresses;
        };
        /**
         * Updates the temporary record info.
         * @private
         */
        CSIEGUIClient.prototype._updateTempRecordInfo = function () {
            var inputs = this._getInputs();
            var outputs = this._getOutputs();
            var progresses = this._getProgresses();
            this._executionGraphEditor._setTempRecordInfo(this._poolName, this._expectedStatus, inputs, outputs, progresses);
        };
        /**
         * Add breakpoints.
         * @private
         * @param {CSI.Parameters} parameters - The CSI parameters.
         */
        CSIEGUIClient.prototype._addBreakPoints = function (parameters) {
            if (this._breakpoints) {
                var parametersBreakPoints_1 = [];
                this._breakpoints.forEach(function (bp) {
                    var pbp = new CSI.Parameters();
                    pbp.writeString('blockId', CSIEGUITools.pathToCSIid(bp.path));
                    parametersBreakPoints_1.push(pbp);
                });
                parameters.writeParametersArray('breakPoints', 'Parameters', parametersBreakPoints_1);
            }
        };
        /**
         * Calls the debugger.
         * @private
         * @param {CSI.Parameters} parameters - The CSI parameters.
         * @param {Function} [onSuccess] - the onSuccess callback.
         */
        CSIEGUIClient.prototype._debuggerCall = function (parameters, onSuccess) {
            var debugId = this._eventController.getDebugId();
            if (debugId !== undefined) {
                parameters.writeUint32('debugId', debugId);
                if (!CSIEGUITools.hasExecGraphDebugNewUpdateBreakPoints()) {
                    this._addBreakPoints(parameters);
                }
                if (this._nodeWebapp !== undefined) {
                    this._nodeWebapp.call({
                        destinationNodeId: this._nodeId,
                        name: 'csiExecutionGraphDebugger',
                        version: 1,
                        onSuccess: onSuccess,
                        parameters: parameters
                    });
                }
            }
        };
        /**
         * Checks the pool selectability.
         * @private
         * @param {string} poolName - The pool name.
         * @param {boolean} isSelectable - True if selectable else false.
         */
        CSIEGUIClient.prototype._checkPoolSelectability = function (poolName, isSelectable) {
            if (!isSelectable && this._nonSelectablePools.indexOf(poolName) === -1) {
                this._nonSelectablePools.push(poolName);
                this._executionGraphEditor.displayNotification({
                    level: 'warning',
                    title: poolName,
                    subtitle: 'non-provisionable',
                    message: 'The Play can be deadlocked. Check your server Hypervisor settings.'
                });
            }
        };
        /**
         * Gets the input parameters.
         * @private
         * @returns {CSI.Parameters} The input parameters.
         */
        CSIEGUIClient.prototype._getInputParameters = function () {
            var graphModel = this._executionGraphEditor.getGraphModel();
            var callDataPort = graphModel.getDataPortByName('Call');
            var inputParameters;
            try {
                // we use also the defaultValue because we don't send the complete function declaration of the graph
                var inputValue = UITools.mergeObject(callDataPort.getDefaultValue(), callDataPort.getTestValues()[0], false);
                inputParameters = CSITools.createParameters(callDataPort.getValueType(), inputValue, graphModel);
            }
            catch (error) {
                inputParameters = CSI.createParameters();
            }
            return inputParameters;
        };
        /**
         * Gets the list of required pools.
         * @private
         * @returns {string[]} The list of required pools.
         */
        CSIEGUIClient.prototype._getRequiredPools = function () {
            var jsonFct = this._executionGraphEditor.getJSONFunction(true);
            var json = JSON.parse(jsonFct);
            var pools = CSIEGUITools.getRequiredPoolsOf(json.implementation.settings);
            pools.push(this._poolName);
            pools.filter(function (pool, index) { return pools.indexOf(pool) === index; });
            return pools;
        };
        /**
         * (DO NOT USE) Enables the block debug call.
         * @private
         * @ignore
         * @param {boolean} isEnabled - true to enable block debug call else false.
         */
        CSIEGUIClient.prototype._setBlockDebugCall = function (isEnabled) {
            this._isBlockDebugCallEnabled = isEnabled;
        };
        return CSIEGUIClient;
    }());
    return CSIEGUIClient;
});
