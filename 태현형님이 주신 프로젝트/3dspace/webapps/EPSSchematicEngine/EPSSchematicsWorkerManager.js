/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsWorkerManager'/>
define("DS/EPSSchematicEngine/EPSSchematicsWorkerManager", ["require", "exports", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, EventServices, Tools, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var workers = [];
    /**
     * The worker manager is a static class allowing to get, create and manage web workers.
     * @class WorkerManager
     * @private
     */
    var WorkerManager = /** @class */ (function () {
        function WorkerManager() {
        }
        /**
         * Terminate all the workers.
         * @private
         * @returns {boolean} True if all workers have been terminated else false.
         */
        WorkerManager.terminateWorkers = function () {
            for (var sw = workers.length - 1; sw >= 0; sw--) {
                var schematicsWorker = workers[sw];
                if (schematicsWorker.terminate() !== false) {
                    workers.splice(sw, 1);
                }
            }
            return workers.length === 0;
        };
        WorkerManager.activateWorker = function () {
            WorkerManager.workerActivated = true;
        };
        WorkerManager.deactivateWorker = function () {
            WorkerManager.workerActivated = false;
        };
        /**
         * Gets an available worker or create one if none are available.
         * @private
         * @returns {SchematicsWorker} A web worker.
         */
        WorkerManager.getAvailableWorker = function () {
            var workerChoosen;
            if (workers.length !== 0) {
                workerChoosen = workers[0];
                if (workerChoosen.isAvailable()) {
                    return workerChoosen;
                }
                var lessTaskRunning = workers[0].currentExecutingBlocks.length;
                for (var wk = 1; wk < workers.length; wk++) {
                    if (workers[wk].isAvailable()) {
                        return workers[wk];
                    }
                    if (workers[wk].currentExecutingBlocks.length < lessTaskRunning) {
                        workerChoosen = workers[wk];
                        lessTaskRunning = workers[wk].currentExecutingBlocks.length;
                    }
                }
            }
            if (workers.length < WorkerManager.kMaximumCreatedWorkers) {
                workerChoosen = new SchematicsWorker();
            }
            return workerChoosen;
        };
        /**
         * Add a worker event to be trigger.
         * @private
         * @param {ExecutionBlock} executionBlock - The execution block.
         * @param {EPEvent} event - The event.
         */
        WorkerManager.addWorkerEvent = function (executionBlock, event) {
            if (executionBlock.workerEvents === undefined) {
                executionBlock.workerEvents = [];
            }
            executionBlock.workerEvents.push(event);
        };
        /**
         * Dispatch worker events.
         * @private
         * @param {ExecutionBlock} executionBlock - The execution block.
         */
        WorkerManager.dispatchWorkerEvents = function (executionBlock) {
            if (executionBlock.workerEvents !== undefined) {
                while (executionBlock.workerEvents.length !== 0) {
                    var event_1 = executionBlock.workerEvents.shift();
                    EventServices.dispatchEvent(event_1);
                }
            }
        };
        /**
         * Execute the execution block given.
         * @public
         * @param {ExecutionBlock} executionBlock - The execution block.
         * @param {IRunParameters} runParams - The run parameters.
         * @return {EP.EExecutionResult} The execution result.
         */
        WorkerManager.executeBlock = function (executionBlock, runParams) {
            var result = Enums.EExecutionResult.eExecutionWorker;
            if (executionBlock.workerExecutionResult !== undefined) {
                result = executionBlock.workerExecutionResult;
                executionBlock.workerExecutionResult = undefined;
            }
            else if (executionBlock.executionResult === Enums.EExecutionResult.eExecutionWorker) {
                executionBlock.trace(result);
            }
            else {
                var jsonExecutionBlock = {
                    runParams: runParams,
                    modules: executionBlock.parent.getModules()
                };
                executionBlock.inputsToJSON(jsonExecutionBlock);
                // Execute with a web worker
                var worker = WorkerManager.getAvailableWorker();
                worker.addTask(executionBlock, jsonExecutionBlock);
                executionBlock.trace(result);
            }
            this.dispatchWorkerEvents(executionBlock);
            return result;
        };
        WorkerManager.workerActivated = true;
        WorkerManager.kMaximumCreatedWorkers = (typeof navigator === 'undefined' || navigator.hardwareConcurrency === undefined) ? 8 : navigator.hardwareConcurrency;
        return WorkerManager;
    }());
    var SchematicsWorker = /** @class */ (function () {
        /**
         * @constructor
         */
        function SchematicsWorker() {
            this.currentExecutingBlocks = [];
            this.worker = new Worker('../EPSSchematicsWorker/EPSSchematicsWorker.js');
            workers.push(this);
            var that = this;
            this.worker.onmessage = function (event) {
                // Event receive from the worker
                if (event.data.eventMessage) {
                    var executionBlock = that.currentExecutingBlocks[that.currentExecutingBlocks.length - 1];
                    var EventCtor = EventServices.getEventByType(event.data.type);
                    var eventToDispatch = new EventCtor();
                    var eventObj = event.data.eventObj;
                    if (eventObj.path !== undefined) {
                        eventObj.path = eventObj.path.replace(Tools.rootPath, executionBlock.model.toPath());
                    }
                    SchematicsWorker._mergeObject(eventObj, eventToDispatch);
                    WorkerManager.addWorkerEvent(executionBlock, eventToDispatch);
                }
                else if (event.data.executionMessage) { // Execution result receive from the worker
                    var executionBlock = that.currentExecutingBlocks.shift();
                    // Control et data port from json
                    executionBlock.outputsFromJSON(event.data.jsonExecutionBlock);
                    executionBlock.workerExecutionResult = event.data.executionStatus;
                }
            };
        }
        SchematicsWorker.prototype.isAvailable = function () {
            return this.currentExecutingBlocks.length === 0;
        };
        SchematicsWorker.prototype.addTask = function (executionBlock, postMsg) {
            this.currentExecutingBlocks.push(executionBlock);
            this.worker.postMessage(postMsg);
        };
        SchematicsWorker.prototype.terminate = function () {
            return this.worker.terminate();
        };
        /**
         * Used to merge two object for worker event.
         * @private
         * @static
         * @param {Object} fromObject - The source object.
         * @param {Object} toObject - The target object.
         */
        SchematicsWorker._mergeObject = function (fromObject, toObject) {
            var keys = Object.keys(fromObject);
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                toObject[key] = fromObject[key];
            }
        };
        return SchematicsWorker;
    }());
    return WorkerManager;
});
