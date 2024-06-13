/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsTask'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsTask", ["require", "exports", "DS/EPSSchematicEngine/typings/EPTaskPlayer/EPTask", "DS/EPSSchematicEngine/EPSSchematicsExecutionBlock", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums"], function (require, exports, EPTask, ExecutionBlock, EventServices, ExecutionEvents, ExecutionEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics task.
     * The task is in charge of the schematics execution work flow.
     * An execution graph instance must be provided to the task so
     * the task be able to execute the graph.
     * @protected
     */
    var SchematicsTask = /** @class */ (function (_super) {
        __extends(SchematicsTask, _super);
        /**
         * @constructor
         * @param {ExecutionGraph} executionGraph - The execution graph instance to execute.
         * @param {boolean|FTraceEvent} traceMode - True to enable the trace mode else false or use FTraceEvent
         */
        function SchematicsTask(executionGraph, traceMode) {
            var _this = _super.call(this) || this;
            _this.timeDelay = 0.0; // Accumulated time during pauses
            _this.pauseTimeStamp = 0.0; // Time stamp information when pause was triggered
            _this.runsCount = 0; // Counter to know how many times this task has been run
            _this.graph = executionGraph;
            // Keep trace mode state
            _this.traceMode = traceMode;
            if (_this.traceMode === true) {
                _this.traceMode = ExecutionEnums.FTraceEvent.fAll;
            }
            else if (_this.traceMode === false) {
                _this.traceMode = ExecutionEnums.FTraceEvent.fNone;
            }
            _this.graph.traceMode = _this.traceMode;
            return _this;
        }
        /**
         * Starts the execution of the task.
         * @private
         */
        SchematicsTask.prototype.onStart = function () {
            if (this.traceMode !== ExecutionEnums.FTraceEvent.fNone) {
                var event_1 = new ExecutionEvents.TraceStartEvent();
                EventServices.dispatchEvent(event_1);
            }
            var startupPortName = this.graph.model.getStartupPort().getName();
            this.graph.activateInputControlPort(startupPortName);
            this.graph.subscribeEventListeners();
        };
        /**
         * Stops the execution of the task.
         * @private
         */
        SchematicsTask.prototype.onStop = function () {
            this.graph.unsubscribeEventListeners();
            this.graph.disconnect();
            if (this.traceMode !== ExecutionEnums.FTraceEvent.fNone) {
                var event_2 = new ExecutionEvents.TraceStopEvent();
                EventServices.dispatchEvent(event_2);
            }
        };
        /**
         * Pauses the execution of the task.
         * @private
         */
        SchematicsTask.prototype.onPause = function () {
            this.pauseTimeStamp = (new Date()).getTime();
            if (this.traceMode !== ExecutionEnums.FTraceEvent.fNone) {
                var event_3 = new ExecutionEvents.TracePauseEvent();
                EventServices.dispatchEvent(event_3);
            }
        };
        /**
         * Resumes the execution of the task.
         * @private
         */
        SchematicsTask.prototype.onResume = function () {
            if (this.traceMode !== ExecutionEnums.FTraceEvent.fNone) {
                var event_4 = new ExecutionEvents.TraceResumeEvent();
                EventServices.dispatchEvent(event_4);
            }
            this.timeDelay += (new Date()).getTime() - this.pauseTimeStamp;
        };
        /**
         * Executes the task.
         * @private
         * @param {EPPlayerContext} playerContext - The execution context of the player.
         */
        SchematicsTask.prototype.onExecute = function (playerContext) {
            // Start the task execution
            this.runsCount++;
            // Initialize run parameters
            var runParams = new ExecutionBlock.RunParameters();
            runParams.globalStepsCount = this.runsCount;
            runParams.currentTime = Date.now() - this.timeDelay;
            runParams.deltaTime = playerContext.deltaTime;
            // Execute this graph
            this.graph.execute(runParams);
        };
        return SchematicsTask;
    }(EPTask));
    return SchematicsTask;
});
