/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionBlock'/>
define("DS/EPSSchematicEngine/EPSSchematicsExecutionBlock", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionDataPort", "DS/EPSSchematicEngine/EPSSchematicsExecutionControlPort", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsWorkerManager", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums"], function (require, exports, ExecutionDataPort, ExecutionControlPort, ExecutionEvents, EventServices, WorkerManager, Enums, ExecutionEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the schematics execution block run parameters.
     * Several time related information are available such as deltaTime, currentTime and
     * the global step count.
     * @class ExecutionBlock.RunParameters
     * @private
     */
    var RunParameters = /** @class */ (function () {
        function RunParameters() {
            this.globalStepsCount = 0;
            this.currentTime = 0.0;
            this.deltaTime = 0.0;
        }
        return RunParameters;
    }());
    /**
     * This class defines a schematics execution block.
     * @class ExecutionBlock
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionBlock
     * @private
     */
    var ExecutionBlock = /** @class */ (function () {
        /**
         * @constructor
         * @param {Block} model - The block model.
         * @param {ExecutionGraph} parent - The parent execution graph.
         */
        function ExecutionBlock(model, parent) {
            this.dataPorts = [];
            this.dataPortsByName = {};
            this.controlPorts = [];
            this.controlPortsByName = {};
            this.settings = [];
            this.settingsByName = {};
            this.executeOnWorker = false;
            this.data = {}; // User data container
            // Deprecated
            this.inputParameterPorts = [];
            this.outputParameterPorts = [];
            this.localParameterPorts = [];
            this.inputExecutionPorts = [];
            this.outputExecutionPorts = [];
            this.model = model;
            this.parent = parent;
            this.buildFromBlockModel();
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
         * Gets the data port from name.
         * @public
         * @param {string} portName - The data port's name.
         * @returns {ExecutionDataPort} The data port.
         */
        ExecutionBlock.prototype.getDataPortByName = function (portName) {
            return this.dataPortsByName[portName];
        };
        /**
         * Gets the control port from name.
         * @public
         * @param {string} portName - The control port's name.
         * @returns {ExecutionControlPort} The control port.
         */
        ExecutionBlock.prototype.getControlPortByName = function (portName) {
            return this.controlPortsByName[portName];
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //       _______ _______      ___   _________ ________   ______ _________ ________ ______         //
        //      |_   __ \_   __ \   .'   `.|  _   _  |_   __  |.' ___  |  _   _  |_   __  |_   _ `.       //
        //        | |__) || |__) | /  .-.  \_/ | | \_| | |_ \_/ .'   \_|_/ | | \_| | |_ \_| | | `. \      //
        //        |  ___/ |  __ /  | |   | |   | |     |  _| _| |          | |     |  _| _  | |  | |      //
        //       _| |_   _| |  \ \_\  `-'  /  _| |_   _| |__/ \ `.___.'\  _| |_   _| |__/ |_| |_.' /      //
        //      |_____| |____| |___|`.___.'  |_____| |________|`.____ .' |_____| |________|______.'       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the input control port name list of the block.
         * This list is sorted according to the port's creation order.
         * @protected
         * @returns {string[]} The input control port name list.
         */
        ExecutionBlock.prototype.getInputControlPortNameList = function () {
            var list = [];
            var ports = this.getControlPorts(Enums.EControlPortType.eInput).concat(this.getControlPorts(Enums.EControlPortType.eInputEvent));
            for (var i = 0; i < ports.length; i++) {
                list.push(ports[i].model.getName());
            }
            return list;
        };
        /**
         * Gets the output control port name list of the block.
         * This list is sorted according to the port's creation order.
         * @protected
         * @returns {string[]} The output control port name list.
         */
        ExecutionBlock.prototype.getOutputControlPortNameList = function () {
            var list = [];
            var ports = this.getControlPorts(Enums.EControlPortType.eOutput).concat(this.getControlPorts(Enums.EControlPortType.eOutputEvent));
            for (var i = 0; i < ports.length; i++) {
                list.push(ports[i].model.getName());
            }
            return list;
        };
        /**
         * Gets the input data port name list of the block.
         * This list is sorted according to the port's creation order.
         * @protected
         * @returns {string[]} The input data port name list.
         */
        ExecutionBlock.prototype.getInputDataPortNameList = function () {
            var list = [];
            var ports = this.getDataPorts(Enums.EDataPortType.eInput);
            for (var i = 0; i < ports.length; i++) {
                list.push(ports[i].model.getName());
            }
            return list;
        };
        /**
         * Gets the output data port name list of the block.
         * This list is sorted according to the port's creation order.
         * @protected
         * @returns {string[]} The output data port name list.
         */
        ExecutionBlock.prototype.getOutputDataPortNameList = function () {
            var list = [];
            var ports = this.getDataPorts(Enums.EDataPortType.eOutput);
            for (var i = 0; i < ports.length; i++) {
                list.push(ports[i].model.getName());
            }
            return list;
        };
        /**
         * Gets the local data port name list of the block.
         * This list is sorted according to the port's creation order.
         * @protected
         * @returns {string[]} The local data port name list.
         */
        ExecutionBlock.prototype.getLocalDataPortNameList = function () {
            var list = [];
            var ports = this.getDataPorts(Enums.EDataPortType.eLocal);
            for (var i = 0; i < ports.length; i++) {
                list.push(ports[i].model.getName());
            }
            return list;
        };
        /**
         * Checks the specified input control port is activated.
         * @protected
         * @param {string} portName - The control port's name.
         * @returns {boolean} True if the port is activated else false.
         */
        ExecutionBlock.prototype.isInputControlPortActivated = function (portName) {
            var port = this.getControlPortByName(portName);
            return port !== undefined && (port.model.getType() === Enums.EControlPortType.eInput || port.model.getType() === Enums.EControlPortType.eInputEvent) ? port.isActive() : false;
        };
        /**
         * Activates the specified output control port.
         * @protected
         * @param {string} portName - The control port's name.
         */
        ExecutionBlock.prototype.activateOutputControlPort = function (portName) {
            var port = this.getControlPortByName(portName);
            if (port !== undefined && (port.model.getType() === Enums.EControlPortType.eOutput || port.model.getType() === Enums.EControlPortType.eOutputEvent)) {
                port.activate();
            }
        };
        /**
         * Gets the input data port's value from the specified port's name.
         * @protected
         * @param {string} portName - The data port's name.
         * @returns {*} The port's value.
         */
        ExecutionBlock.prototype.getInputDataPortValue = function (portName) {
            var port = this.getDataPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EDataPortType.eInput ? port.getValue() : undefined;
        };
        /**
         * Gets the input data port's value type from the specified port's name.
         * @protected
         * @param {string} portName - The data port's name.
         * @returns {string} The data port's value type.
         */
        ExecutionBlock.prototype.getInputDataPortValueType = function (portName) {
            var port = this.getDataPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EDataPortType.eInput ? port.getValueType() : undefined;
        };
        /**
         * Sets the output data port's value from the specified port's name.
         * @protected
         * @param {string} portName - The data port's name.
         * @param {*} value - The port's value;
         */
        ExecutionBlock.prototype.setOutputDataPortValue = function (portName, value) {
            var port = this.getDataPortByName(portName);
            if (port !== undefined && port.model.getType() === Enums.EDataPortType.eOutput) {
                port.setValue(value);
            }
        };
        /**
         * Gets the local data port's value from the specified port's name.
         * @protected
         * @param {string} portName - The data port's name.
         * @returns {*} The port's value.
         */
        ExecutionBlock.prototype.getLocalDataPortValue = function (portName) {
            var port = this.getDataPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EDataPortType.eLocal ? port.getValue() : undefined;
        };
        /**
         * Sets the local data port's value from the specified port's name.
         * @protected
         * @param {string} portName - The data port's name.
         * @param {*} value - The port's value;
         */
        ExecutionBlock.prototype.setLocalDataPortValue = function (portName, value) {
            var port = this.getDataPortByName(portName);
            if (port !== undefined && port.model.getType() === Enums.EDataPortType.eLocal) {
                port.setValue(value);
            }
        };
        /**
         * Gets the setting's value from the specified setting's name.
         * @protected
         * @param {string} settingName - The setting's name.
         * @returns {*} The setting's value.
         */
        ExecutionBlock.prototype.getSettingValue = function (settingName) {
            var setting = this.getSettingByName(settingName);
            return setting !== undefined ? setting.getValue() : undefined;
        };
        /**
         * Gets the node.
         * @protected
         * @returns {INode} The node.
         */
        ExecutionBlock.prototype.getNode = function () {
            if (this.node === undefined && this.parent !== undefined) {
                this.node = this.parent.getNode();
            }
            return this.node;
        };
        /**
         * Gets the nodeId.
         * @protected
         * @param {string} [pool] - The pool used for select if nodeId selector is undefined.
         * @returns {INodeId} The nodeId.
         */
        ExecutionBlock.prototype.getNodeId = function (pool) {
            if (this.nodeId === undefined) {
                var nodeIdSelector = this.model.getNodeIdSelector();
                if (nodeIdSelector !== undefined) {
                    this.nodeId = this.parent.getNodeIdFromSelector(nodeIdSelector);
                }
                else if (typeof pool === 'string') {
                    this.nodeId = this.parent.getNodeIdFromPool(pool);
                }
            }
            return this.nodeId;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                  _______ _______    _____ ____   ____ _    _________ ________                  //
        //                 |_   __ \_   __ \  |_   _|_  _| |_  _/ \  |  _   _  |_   __  |                 //
        //                   | |__) || |__) |   | |   \ \   / // _ \ |_/ | | \_| | |_ \_|                 //
        //                   |  ___/ |  __ /    | |    \ \ / // ___ \    | |     |  _| _                  //
        //                  _| |_   _| |  \ \_ _| |_    \ ' // /   \ \_ _| |_   _| |__/ |                 //
        //                 |_____| |____| |___|_____|    \_/____| |____|_____| |________|                 //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Prints a message.
         * @private
         * @param {EP.ESeverity} severity - The print severity.
         * @param {...*} content - The content to be printed.
         */
        ExecutionBlock.prototype.print = function (severity) {
            var event = new ExecutionEvents.PrintEvent();
            event.path = this.model.toPath();
            event.severity = severity;
            event.content = Array.prototype.slice.call(arguments, 1);
            EventServices.dispatchEvent(event);
        };
        /**
         * Sends a notification.
         * @private
         * @param {EP.ESeverity} severity - The severity notification.
         * @param {string} title - The title notification.
         * @param {string} message - The message notification.
         */
        // eslint-disable-next-line class-methods-use-this
        ExecutionBlock.prototype.notify = function (severity, title, message) {
            var event = new ExecutionEvents.NotifyEvent();
            event.severity = severity;
            event.title = title;
            event.message = message;
            EventServices.dispatchEvent(event);
        };
        /**
         * @private
         */
        ExecutionBlock.prototype.buildFromBlockModel = function () {
            var dataPortsModel = this.model.getDataPorts();
            for (var dp = 0; dp < dataPortsModel.length; dp++) {
                this.createDataPortPlay(dataPortsModel[dp]);
            }
            var controlPortsModel = this.model.getControlPorts();
            for (var cp = 0; cp < controlPortsModel.length; cp++) {
                this.createControlPortPlay(controlPortsModel[cp]);
            }
            var settingsModel = this.model.getSettings();
            for (var s = 0; s < settingsModel.length; s++) {
                this.createSettingPlay(settingsModel[s]);
            }
        };
        /**
         * Creates the execution data port.
         * @private
         * @param {DataPort} dataPortModel - The data port model.
         */
        ExecutionBlock.prototype.createDataPortPlay = function (dataPortModel) {
            var dataPort = new ExecutionDataPort(dataPortModel, this);
            if (dataPortModel.getType() === Enums.EDataPortType.eInput) {
                this.inputParameterPorts.push(dataPort);
            }
            else if (dataPortModel.getType() === Enums.EDataPortType.eOutput) {
                this.outputParameterPorts.push(dataPort);
            }
            else if (dataPortModel.getType() === Enums.EDataPortType.eLocal) {
                this.localParameterPorts.push(dataPort);
            }
            this.dataPorts.push(dataPort);
            this.dataPortsByName[dataPortModel.name] = dataPort;
        };
        /**
         * Creates the execution control port.
         * @private
         * @param {ControlPort} controlPortModel - The control port model.
         */
        ExecutionBlock.prototype.createControlPortPlay = function (controlPortModel) {
            var controlPort = new ExecutionControlPort(controlPortModel, this);
            if (controlPortModel.getType() === Enums.EControlPortType.eInput || controlPortModel.getType() === Enums.EControlPortType.eInputEvent) {
                this.inputExecutionPorts.push(controlPort);
            }
            else if (controlPortModel.getType() === Enums.EControlPortType.eOutput || controlPortModel.getType() === Enums.EControlPortType.eOutputEvent) {
                this.outputExecutionPorts.push(controlPort);
            }
            this.controlPorts.push(controlPort);
            this.controlPortsByName[controlPortModel.name] = controlPort;
        };
        /**
         * Creates the execution settings.
         * @private
         * @param {Setting} settingModel - The setting model.
         */
        ExecutionBlock.prototype.createSettingPlay = function (settingModel) {
            this.settings.push(settingModel);
            this.settingsByName[settingModel.name] = settingModel;
        };
        /**
         * Constructs JSON from local data port, input control port, input data port and the model block.
         * @private
         * @param {IJSONExecutionBlock} oJSONExecutionBlock - The JSON execution block.
         */
        ExecutionBlock.prototype.inputsToJSON = function (oJSONExecutionBlock) {
            this.model.toJSON(oJSONExecutionBlock);
            for (var cp = 0; cp < oJSONExecutionBlock.controlPorts.length; cp++) {
                var oJSONControlPort = oJSONExecutionBlock.controlPorts[cp];
                if (oJSONControlPort.portType === Enums.EControlPortType.eInput) {
                    oJSONControlPort.isActive = this.isInputControlPortActivated(oJSONControlPort.name);
                }
            }
            for (var dp = 0; dp < oJSONExecutionBlock.dataPorts.length; dp++) {
                var oJSONDataPort = oJSONExecutionBlock.dataPorts[dp];
                var dataPort = this.getDataPortByName(oJSONDataPort.name);
                if (dataPort !== undefined && (oJSONDataPort.portType === Enums.EDataPortType.eInput || oJSONDataPort.portType === Enums.EDataPortType.eLocal)) {
                    oJSONDataPort.executionValue = dataPort.getValue();
                }
            }
            oJSONExecutionBlock.data = this.data;
        };
        /**
         * Replaces outputs and local values of the execution block from JSON.
         * @private
         * @param {IJSONExecutionBlock} iJSONExecutionBlock - The JSON execution block.
         */
        ExecutionBlock.prototype.outputsFromJSON = function (iJSONExecutionBlock) {
            for (var cp = 0; cp < iJSONExecutionBlock.controlPorts.length; cp++) {
                var iJSONControlPort = iJSONExecutionBlock.controlPorts[cp];
                if (iJSONControlPort.isActive && iJSONControlPort.portType === Enums.EControlPortType.eOutput) {
                    this.activateOutputControlPort(iJSONControlPort.name);
                }
            }
            var TypeLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary');
            for (var dp = 0; dp < iJSONExecutionBlock.dataPorts.length; dp++) {
                var iJSONDataPort = iJSONExecutionBlock.dataPorts[dp];
                var dataPort = this.getDataPortByName(iJSONDataPort.name);
                if (dataPort !== undefined && (iJSONDataPort.portType === Enums.EDataPortType.eOutput || iJSONDataPort.portType === Enums.EDataPortType.eLocal)) {
                    var executionValue = TypeLibrarySingleton.getValueFromJSONValue(this.model.getGraphContext(), iJSONDataPort.executionValue, iJSONDataPort.valueType);
                    dataPort.setValue(executionValue);
                }
            }
            this.data = iJSONExecutionBlock.data;
        };
        /**
         * Checks if the block is currently executing.
         * @private
         * @returns {boolean} True if it is executing else false.
         */
        ExecutionBlock.prototype.isExecuting = function () {
            var result = this.executionResult === Enums.EExecutionResult.eExecutionWorker;
            result = result || this.executionResult === Enums.EExecutionResult.eExecutionPending;
            return result;
        };
        /**
         * The callback of the execution block.
         * @private
         * @param {IRunParameters} runParams - The run parameters.
         * @returns {EP.EExecutionResult} The block execution result.
         */
        ExecutionBlock.prototype.onExecute = function (runParams) {
            return this.model.execute.call(this, runParams);
        };
        /**
         * Checks whether the block can be executed on worker.
         * @private
         * @returns {boolean} True if the block can be executed onworker else false.
         */
        ExecutionBlock.prototype.couldBeExecuteOnWorker = function () {
            return typeof Worker !== 'undefined' &&
                WorkerManager.workerActivated &&
                this.parent !== undefined &&
                this.parent.getModules() !== undefined;
        };
        /**
         * Activates the execution of the current block on worker if possible.
         * @private
         * @returns {boolean} True if the activation could be performed else false.
         */
        ExecutionBlock.prototype.activateWorker = function () {
            if (this.couldBeExecuteOnWorker()) {
                this.executeOnWorker = true;
            }
            else {
                this.executeOnWorker = false;
            }
            return this.executeOnWorker;
        };
        /**
         * Executes the block.
         * @private
         * @param {IRunParameters} runParams - The run parameters.
         * @returns {EP.EExecutionResult} The block execution result.
         */
        ExecutionBlock.prototype.execute = function (runParams) {
            var result;
            if (!this.isExecuting()) {
                this.executeOnWorker = false;
                this.model.onPreExecute.call(this);
            }
            if (this.executeOnWorker) {
                result = WorkerManager.executeBlock(this, runParams);
            }
            else {
                var errorStack = void 0, errorMessage = void 0;
                try {
                    result = this.onExecute(runParams);
                }
                catch (err) {
                    result = Enums.EExecutionResult.eExecutionError;
                    errorStack = err.stack;
                    errorMessage = err.message;
                }
                this.trace(result, errorStack, errorMessage);
            }
            if (!this.isExecuting()) {
                this.model.onPostExecute.call(this);
            }
            this.executionResult = result;
            return result;
        };
        /**
         * Gets the trace mode state.
         * @private
         * @returns {FTraceEvent} The trace mode state.
         */
        ExecutionBlock.prototype.getTraceMode = function () {
            if (this.traceMode === undefined && this.parent !== undefined) {
                this.traceMode = this.parent.getTraceMode();
            }
            return this.traceMode;
        };
        /**
         * Traces the block.
         * @private
         * @param {EExecutionResult} executionResult - The block execution result.
         * @param {string} [errorStack] - The block execution error stack.
         * @param {string} [errorMessage] - The block execution error message.
         */
        ExecutionBlock.prototype.trace = function (executionResult, errorStack, errorMessage) {
            if (this.getTraceMode() & ExecutionEnums.FTraceEvent.fBlock) {
                var event_1 = new ExecutionEvents.TraceBlockEvent();
                event_1.path = this.model.toPath();
                event_1.executionResult = executionResult;
                event_1.errorStack = errorStack;
                event_1.errorMessage = errorMessage;
                EventServices.dispatchEvent(event_1);
            }
        };
        /**
         * Gets the control ports from the specified port's type.
         * If no port's type is specified then all control ports will be retrieved.
         * @private
         * @param {EP.EControlPortType} [portType] - The control port's type.
         * @returns {ExecutionControlPort[]} The control ports.
         */
        ExecutionBlock.prototype.getControlPorts = function (portType) {
            var controlPorts;
            if (portType === undefined) {
                controlPorts = this.controlPorts.slice(0);
            }
            else {
                controlPorts = this.controlPorts.filter(function (controlPort) { return controlPort.model.type === portType; });
            }
            return controlPorts;
        };
        /**
         * Gets the data ports from the specified port's type.
         * If no port's type is specified then all data ports will be retrieved.
         * @private
         * @param {EP.EDataPortType} [portType] - The data port's type.
         * @returns {ExecutionDataPort[]} The data ports.
         */
        ExecutionBlock.prototype.getDataPorts = function (portType) {
            var dataPorts;
            if (portType === undefined) {
                dataPorts = this.dataPorts.slice(0);
            }
            else {
                dataPorts = this.dataPorts.filter(function (dataPort) { return dataPort.model.type === portType; });
            }
            return dataPorts;
        };
        /**
         * Gets the block settings.
         * @private
         * @returns {Setting[]} The settings.
         */
        ExecutionBlock.prototype.getSettings = function () {
            return this.settings.slice(0);
        };
        /**
         * Gets the block setting from the provided setting's name.
         * @private
         * @param {string} settingName - The setting's name.
         * @returns {Setting} The setting.
         */
        ExecutionBlock.prototype.getSettingByName = function (settingName) {
            return this.settingsByName[settingName];
        };
        /**
         * Checks the specified output control port is activated.
         * @private
         * @param {string} portName - The control port's name.
         * @returns {boolean} True if the port is activated else false.
         */
        ExecutionBlock.prototype.isOutputControlPortActivated = function (portName) {
            var port = this.getControlPortByName(portName);
            return port !== undefined && (port.model.getType() === Enums.EControlPortType.eOutput || port.model.getType() === Enums.EControlPortType.eOutputEvent) ? port.isActive() : false;
        };
        /**
         * Activates the specified input control port.
         * @private
         * @param {string} portName - The control port's name.
         */
        ExecutionBlock.prototype.activateInputControlPort = function (portName) {
            var port = this.getControlPortByName(portName);
            if (port !== undefined && (port.model.getType() === Enums.EControlPortType.eInput || port.model.getType() === Enums.EControlPortType.eInputEvent)) {
                port.activate();
            }
        };
        /**
         * Deactivates the specified output control port.
         * @private
         * @param {string} portName - The control port's name.
         */
        ExecutionBlock.prototype.deactivateOutputControlPort = function (portName) {
            var port = this.getControlPortByName(portName);
            if (port !== undefined && (port.model.getType() === Enums.EControlPortType.eOutput || port.model.getType() === Enums.EControlPortType.eOutputEvent)) {
                port.deactivate();
            }
        };
        /**
         * Gets the output data port's value from the specified port's name.
         * @private
         * @param {string} portName - The data port's name.
         * @returns {*} The port's value.
         */
        ExecutionBlock.prototype.getOutputDataPortValue = function (portName) {
            var port = this.getDataPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EDataPortType.eOutput ? port.getValue() : undefined;
        };
        /**
         * Sets the input data port's value type from the specified port's name.
         * @private
         * @param {string} portName - The data port's name.
         * @param {string} valueType - The data port's value type.
         * @returns {boolean} True if the data port's value type has been set else false.
         */
        ExecutionBlock.prototype.setInputDataPortValueType = function (portName, valueType) {
            var port = this.getDataPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EDataPortType.eInput ? port.model.setValueType(valueType) : false;
        };
        /**
         * Gets the output data port's value type from the specified port's name.
         * @private
         * @param {string} portName - The data port's name.
         * @returns {string} The data port's value type.
         */
        ExecutionBlock.prototype.getOutputDataPortValueType = function (portName) {
            var port = this.getDataPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EDataPortType.eOutput ? port.getValueType() : undefined;
        };
        /**
         * Sets the input data port's value from the specified port's name.
         * @private
         * @param {string} portName - The data port's name.
         * @param {*} value - The port's value;
         */
        ExecutionBlock.prototype.setInputDataPortValue = function (portName, value) {
            var port = this.getDataPortByName(portName);
            if (port !== undefined && port.model.getType() === Enums.EDataPortType.eInput) {
                port.setValue(value);
            }
        };
        /**
         * Gets the input control port event.
         * @private
         * @param {string} portName - The control port's name.
         * @return {EPEvent} The event.
         */
        ExecutionBlock.prototype.getInputControlPortEvent = function (portName) {
            var port = this.getControlPortByName(portName);
            return port !== undefined && port.model.getType() === Enums.EControlPortType.eInputEvent ? port.getEvent() : undefined;
        };
        /**
         * Sets the input control port event.
         * @private
         * @param {string} portName - The control port's name.
         * @param {EPEvent} event - The event.
         */
        ExecutionBlock.prototype.setInputControlPortEvent = function (portName, event) {
            var port = this.getControlPortByName(portName);
            if (port !== undefined && port.model.getType() === Enums.EControlPortType.eInputEvent) {
                port.setEvent(event);
            }
        };
        /**
         * Sets the output control port event.
         * @private
         * @param {string} portName - The control port's name.
         * @param {EPEvent} event - The event.
         */
        ExecutionBlock.prototype.setOutputControlPortEvent = function (portName, event) {
            var port = this.getControlPortByName(portName);
            if (port !== undefined && port.model.getType() === Enums.EControlPortType.eOutputEvent) {
                port.setEvent(event);
            }
        };
        /**
         * Gets the list of the block activated input control port.
         * @private
         * @returns {ExecutionControlPort[]} The list of activated input control port.
         */
        ExecutionBlock.prototype.getActivatedInputControlPorts = function () {
            var ports = [];
            var inputControlPorts = this.getControlPorts(Enums.EControlPortType.eInput).concat(this.getControlPorts(Enums.EControlPortType.eInputEvent));
            for (var i = 0; i < inputControlPorts.length; i++) {
                var port = inputControlPorts[i];
                if (port.isActive()) {
                    ports.push(port);
                }
            }
            return ports;
        };
        /**
         * Gets the list of the block activated output control port.
         * @private
         * @returns {ExecutionControlPort[]} The list of activated output control port.
         */
        ExecutionBlock.prototype.getActivatedOutputControlPorts = function () {
            var ports = [];
            var outputControlPorts = this.getControlPorts(Enums.EControlPortType.eOutput).concat(this.getControlPorts(Enums.EControlPortType.eOutputEvent));
            for (var i = 0; i < outputControlPorts.length; i++) {
                var port = outputControlPorts[i];
                if (port.isActive()) {
                    ports.push(port);
                }
            }
            return ports;
        };
        /**
         * Disables the block input control ports.
         * @private
         */
        ExecutionBlock.prototype.disableInputControlPorts = function () {
            var inputControlPorts = this.getControlPorts(Enums.EControlPortType.eInput).concat(this.getControlPorts(Enums.EControlPortType.eInputEvent));
            for (var i = 0; i < inputControlPorts.length; i++) {
                inputControlPorts[i].deactivate();
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //  ______  ________ _______ _______    ________   ______      _    _________ ________ ______     //
        // |_   _ `|_   __  |_   __ |_   __ \  |_   __  |.' ___  |    / \  |  _   _  |_   __  |_   _ `.   //
        //   | | `. \| |_ \_| | |__) || |__) |   | |_ \_/ .'   \_|   / _ \ |_/ | | \_| | |_ \_| | | `. \  //
        //   | |  | ||  _| _  |  ___/ |  __ /    |  _| _| |         / ___ \    | |     |  _| _  | |  | |  //
        //  _| |_.' _| |__/ |_| |_   _| |  \ \_ _| |__/ \ `.___.'\_/ /   \ \_ _| |_   _| |__/ |_| |_.' /  //
        // |______.|________|_____| |____| |___|________|`.____ .|____| |____|_____| |________|______.'   //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Checks if the specified input execution port is active.
         * @deprecated Please use isInputControlPortActivated!
         * @private
         * @param {number} index - The port's index.
         * @returns {boolean} True if the port is active else false.
         */
        ExecutionBlock.prototype.isInputExecutionPortActive = function (index) {
            var port = this.inputExecutionPorts[index];
            var isActive = false;
            if (port !== undefined) {
                isActive = port.isActive();
            }
            return isActive;
        };
        /**
         * Activates the specified output execution port and
         * provides an optional port's value.
         * @deprecated Please use activateOutputControlPort!
         * @private
         * @param {number} index - The port's index.
         * @param {*} [value] - Optional port's value to set.
         */
        ExecutionBlock.prototype.activateOutputExecutionPort = function (index, value) {
            var port = this.outputExecutionPorts[index];
            if (port !== undefined) {
                port.setEvent(value);
                port.activate();
            }
        };
        /**
         * Gets the value of the specified input parameter port.
         * @deprecated Please use getInputDataPortValue!
         * @private
         * @param {number} index - The port's index.
         * @returns {*} The port's value.
         */
        ExecutionBlock.prototype.getInputParameterPortValue = function (index) {
            var value;
            var port = this.inputParameterPorts[index];
            if (port !== undefined) {
                value = port.getValue();
            }
            return value;
        };
        /**
         * Sets the value of the specified output parameter port.
         * @deprecated Please use setOutputDataPortValue!
         * @private
         * @param {number} index - The port's index.
         * @param {*} value - The port's value.
         */
        ExecutionBlock.prototype.setOutputParameterPortValue = function (index, value) {
            var port = this.outputParameterPorts[index];
            if (port !== undefined) {
                port.setValue(value);
            }
        };
        /**
         * Checks if the specified output execution port is active.
         * @deprecated Please use isOutputControlPortActivated!
         * @private
         * @param {number} index - The port's index.
         * @returns {boolean} True if the port is active else false.
         */
        ExecutionBlock.prototype.isOutputExecutionPortActive = function (index) {
            var port = this.outputExecutionPorts[index];
            var isActive = false;
            if (port !== undefined) {
                isActive = port.isActive();
            }
            return isActive;
        };
        /**
         * Deactivates the specified input execution port.
         * @deprecated API is useless as engine automatically deactivates input execution ports!
         * @private
         * @param {number} index - The port's index.
         */
        ExecutionBlock.prototype.deactivateInputExecutionPort = function (index) {
            var port = this.inputExecutionPorts[index];
            if (port !== undefined) {
                port.deactivate();
            }
        };
        /**
         * Deactivates the specified output execution port.
         * @deprecated API is useless as engine automatically deactivates output execution ports!
         * @private
         * @param {number} index - The port's index.
         */
        ExecutionBlock.prototype.deactivateOutputExecutionPort = function (index) {
            var port = this.outputExecutionPorts[index];
            if (port !== undefined) {
                port.deactivate();
            }
        };
        /**
         * Gets the output execution port's index with the specified port's name.
         * @deprecated API is useless as ports no more identified by index!
         * @private
         * @param {string} name - The port's name.
         * @returns {number} The port's index if found else undefined.
         */
        ExecutionBlock.prototype.getOutputExecutionPortIndex = function (name) {
            return this.getPortIndex(this.outputExecutionPorts, name);
        };
        /**
         * Gets the input execution port's index with the specified port's name.
         * @deprecated API is useless as ports no more identified by index!
         * @private
         * @param {string} name - The port's name.
         * @returns {number} The port's index if found else undefined.
         */
        ExecutionBlock.prototype.getInputExecutionPortIndex = function (name) {
            return this.getPortIndex(this.inputExecutionPorts, name);
        };
        /**
         * Gets the port's index with the specified port's name in the specified port's list.
         * @deprecated API is useless as ports no more identified by index!
         * @private
         * @param {ExecutionControlPort[]} portList - The port's list.
         * @param {string} name - The port's name.
         * @returns {number} The port's index if found else undefined.
         */
        // eslint-disable-next-line class-methods-use-this
        ExecutionBlock.prototype.getPortIndex = function (portList, name) {
            var index;
            if (portList !== undefined && name !== undefined) {
                for (var i = 0; i < portList.length; i++) {
                    var port = portList[i];
                    if (port !== undefined) {
                        if (port.model.getName() === name) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
        /**
         * Activates the specified input execution port and
         * provides an optional port's value.
         * @deprecated API is useless as ports no more identified by index!
         * @private
         * @param {number} index - The port's index.
         * @param {*} [value] - Optional port's value to set.
         */
        ExecutionBlock.prototype.activateInputExecutionPort = function (index, value) {
            var port = this.inputExecutionPorts[index];
            if (port !== undefined) {
                port.setEvent(value);
                port.activate();
            }
        };
        /**
         * Gets the value of the specified input execution port.
         * @deprecated Please use getInputControlPortEvent!
         * @private
         * @param {number} index - The port's index.
         * @returns {*} The port's value.
         */
        ExecutionBlock.prototype.getInputExecutionPortValue = function (index) {
            var value;
            var port = this.inputExecutionPorts[index];
            if (port !== undefined) {
                value = port.getEvent();
            }
            return value;
        };
        /**
         * Sets the value of the specified output excution port.
         * @deprecated Please use setOutputControlPortEvent!
         * @private
         * @param {number} index - The port's index.
         * @param {*} value - The port's value.
         */
        ExecutionBlock.prototype.setOuputExecutionPortValue = function (index, value) {
            var port = this.outputExecutionPorts[index];
            if (port !== undefined) {
                port.setEvent(value);
            }
        };
        ExecutionBlock.RunParameters = RunParameters;
        return ExecutionBlock;
    }());
    return ExecutionBlock;
});
