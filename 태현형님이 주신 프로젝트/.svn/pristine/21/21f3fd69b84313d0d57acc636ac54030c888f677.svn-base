/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionEvents'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", ["require", "exports", "DS/EPEventServices/EPEvent", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, EPEvent, EventServices, TypeLibrary, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ExecutionEvents;
    (function (ExecutionEvents) {
        /**
         * class ExecutionControlPortEvent
         * @extends Event
         * @private
         */
        var ExecutionControlPortEvent = /** @class */ (function (_super) {
            __extends(ExecutionControlPortEvent, _super);
            function ExecutionControlPortEvent() {
                return _super.call(this) || this;
            }
            /**
             * Gets the execution control port.
             * @private
             * @returns {ExecutionControlPort} The execution control port.
             */
            ExecutionControlPortEvent.prototype.getControlPort = function () {
                return this.controlPort;
            };
            return ExecutionControlPortEvent;
        }(EPEvent));
        ExecutionEvents.ExecutionControlPortEvent = ExecutionControlPortEvent;
        ExecutionControlPortEvent.prototype.type = 'ExecutionControlPortEvent';
        EventServices.registerEvent(ExecutionControlPortEvent);
        /**
         * class ExecutionControlPortActivateEvent
         * @extends ExecutionControlPortEvent
         * @private
         */
        var ExecutionControlPortActivateEvent = /** @class */ (function (_super) {
            __extends(ExecutionControlPortActivateEvent, _super);
            function ExecutionControlPortActivateEvent() {
                return _super.call(this) || this;
            }
            return ExecutionControlPortActivateEvent;
        }(ExecutionControlPortEvent));
        ExecutionEvents.ExecutionControlPortActivateEvent = ExecutionControlPortActivateEvent;
        ExecutionControlPortActivateEvent.prototype.type = 'ExecutionControlPortActivateEvent';
        EventServices.registerEvent(ExecutionControlPortActivateEvent);
        /**
         * class ExecutionDataPortEvent
         * @extends Event
         * @private
         */
        var ExecutionDataPortEvent = /** @class */ (function (_super) {
            __extends(ExecutionDataPortEvent, _super);
            function ExecutionDataPortEvent() {
                return _super.call(this) || this;
            }
            /**
             * Gets the execution data port.
             * @private
             * @returns {ExecutionDataPort} The execution data port.
             */
            ExecutionDataPortEvent.prototype.getDataPort = function () {
                return this.dataPort;
            };
            return ExecutionDataPortEvent;
        }(EPEvent));
        ExecutionEvents.ExecutionDataPortEvent = ExecutionDataPortEvent;
        ExecutionDataPortEvent.prototype.type = 'ExecutionDataPortEvent';
        EventServices.registerEvent(ExecutionDataPortEvent);
        /**
         * class ExecutionDataPortValueChangeEvent
         * @extends ExecutionDataPortEvent
         * @private
         */
        var ExecutionDataPortValueChangeEvent = /** @class */ (function (_super) {
            __extends(ExecutionDataPortValueChangeEvent, _super);
            function ExecutionDataPortValueChangeEvent() {
                return _super.call(this) || this;
            }
            /**
             * Gets the execution data port value.
             * @private
             * @returns {*} The execution data port value.
             */
            ExecutionDataPortValueChangeEvent.prototype.getValue = function () {
                return this.value;
            };
            return ExecutionDataPortValueChangeEvent;
        }(ExecutionDataPortEvent));
        ExecutionEvents.ExecutionDataPortValueChangeEvent = ExecutionDataPortValueChangeEvent;
        ExecutionDataPortValueChangeEvent.prototype.type = 'ExecutionDataPortValueChangeEvent';
        EventServices.registerEvent(ExecutionDataPortValueChangeEvent);
        /**
         * class TraceStartEvent
         * @extends Event
         * @private
         */
        var TraceStartEvent = /** @class */ (function (_super) {
            __extends(TraceStartEvent, _super);
            function TraceStartEvent() {
                return _super.call(this) || this;
            }
            return TraceStartEvent;
        }(EPEvent));
        ExecutionEvents.TraceStartEvent = TraceStartEvent;
        TraceStartEvent.prototype.type = 'TraceStartEvent';
        EventServices.registerEvent(TraceStartEvent);
        /**
         * class TracePauseEvent
         * @extends Event
         * @private
         */
        var TracePauseEvent = /** @class */ (function (_super) {
            __extends(TracePauseEvent, _super);
            function TracePauseEvent() {
                return _super.call(this) || this;
            }
            return TracePauseEvent;
        }(EPEvent));
        ExecutionEvents.TracePauseEvent = TracePauseEvent;
        TracePauseEvent.prototype.type = 'TracePauseEvent';
        EventServices.registerEvent(TracePauseEvent);
        /**
         * class TraceResumeEvent
         * @extends Event
         * @private
         */
        var TraceResumeEvent = /** @class */ (function (_super) {
            __extends(TraceResumeEvent, _super);
            function TraceResumeEvent() {
                return _super.call(this) || this;
            }
            return TraceResumeEvent;
        }(EPEvent));
        ExecutionEvents.TraceResumeEvent = TraceResumeEvent;
        TraceResumeEvent.prototype.type = 'TraceResumeEvent';
        EventServices.registerEvent(TraceResumeEvent);
        /**
         * class TraceStopEvent
         * @extends Event
         * @private
         */
        var TraceStopEvent = /** @class */ (function (_super) {
            __extends(TraceStopEvent, _super);
            function TraceStopEvent() {
                return _super.call(this) || this;
            }
            return TraceStopEvent;
        }(EPEvent));
        ExecutionEvents.TraceStopEvent = TraceStopEvent;
        TraceStopEvent.prototype.type = 'TraceStopEvent';
        EventServices.registerEvent(TraceStopEvent);
        /**
         * class TraceBlockEvent
         * @extends Event
         * @private
         */
        var TraceBlockEvent = /** @class */ (function (_super) {
            __extends(TraceBlockEvent, _super);
            function TraceBlockEvent() {
                return _super.call(this) || this;
            }
            TraceBlockEvent.prototype.getPath = function () {
                return this.path;
            };
            TraceBlockEvent.prototype.getExecutionResult = function () {
                return this.executionResult;
            };
            TraceBlockEvent.prototype.getErrorStack = function () {
                return this.errorStack;
            };
            TraceBlockEvent.prototype.getErrorMessage = function () {
                return this.errorMessage;
            };
            return TraceBlockEvent;
        }(EPEvent));
        ExecutionEvents.TraceBlockEvent = TraceBlockEvent;
        TraceBlockEvent.prototype.type = 'TraceBlockEvent';
        EventServices.registerEvent(TraceBlockEvent);
        /**
         * class TracePortEvent
         * @extends Event
         * @private
         */
        var TracePortEvent = /** @class */ (function (_super) {
            __extends(TracePortEvent, _super);
            function TracePortEvent() {
                return _super.call(this) || this;
            }
            TracePortEvent.prototype.getPath = function () {
                return this.path;
            };
            return TracePortEvent;
        }(EPEvent));
        ExecutionEvents.TracePortEvent = TracePortEvent;
        TracePortEvent.prototype.type = 'TracePortEvent';
        EventServices.registerEvent(TracePortEvent);
        /**
         * class TraceDataPortEvent
         * @extends Event
         * @private
         */
        var TraceDataPortEvent = /** @class */ (function (_super) {
            __extends(TraceDataPortEvent, _super);
            function TraceDataPortEvent() {
                var _this = _super.call(this) || this;
                _this.fromDebug = false;
                return _this;
            }
            TraceDataPortEvent.prototype.getPath = function () {
                return this.path;
            };
            TraceDataPortEvent.prototype.getValue = function (iGraphContext) {
                if (this.jsonValue !== undefined) {
                    this.value = TypeLibrary.getValueFromJSONValue(iGraphContext, this.jsonValue, this.valueType);
                    this.jsonValue = undefined;
                }
                return this.value;
            };
            TraceDataPortEvent.prototype.isFromDebug = function () {
                return this.fromDebug;
            };
            return TraceDataPortEvent;
        }(EPEvent));
        ExecutionEvents.TraceDataPortEvent = TraceDataPortEvent;
        TraceDataPortEvent.prototype.type = 'TraceDataPortEvent';
        EventServices.registerEvent(TraceDataPortEvent);
        /**
         * class TraceLinkEvent
         * @extends Event
         * @private
         */
        var TraceLinkEvent = /** @class */ (function (_super) {
            __extends(TraceLinkEvent, _super);
            function TraceLinkEvent() {
                return _super.call(this) || this;
            }
            TraceLinkEvent.prototype.getPath = function () {
                return this.path;
            };
            return TraceLinkEvent;
        }(EPEvent));
        ExecutionEvents.TraceLinkEvent = TraceLinkEvent;
        TraceLinkEvent.prototype.type = 'TraceLinkEvent';
        EventServices.registerEvent(TraceLinkEvent);
        /**
         * class TraceDataLinkEvent
         * @extends Event
         * @private
         */
        var TraceDataLinkEvent = /** @class */ (function (_super) {
            __extends(TraceDataLinkEvent, _super);
            function TraceDataLinkEvent() {
                return _super.call(this) || this;
            }
            TraceDataLinkEvent.prototype.getPath = function () {
                return this.path;
            };
            return TraceDataLinkEvent;
        }(EPEvent));
        ExecutionEvents.TraceDataLinkEvent = TraceDataLinkEvent;
        TraceDataLinkEvent.prototype.type = 'TraceDataLinkEvent';
        EventServices.registerEvent(TraceDataLinkEvent);
        /**
         * class DebugBreakEvent
         * @extends Event
         * @private
         */
        var DebugBreakEvent = /** @class */ (function (_super) {
            __extends(DebugBreakEvent, _super);
            function DebugBreakEvent() {
                return _super.call(this) || this;
            }
            DebugBreakEvent.prototype.getPath = function () {
                return this.path;
            };
            return DebugBreakEvent;
        }(EPEvent));
        ExecutionEvents.DebugBreakEvent = DebugBreakEvent;
        DebugBreakEvent.prototype.type = 'DebugBreakEvent';
        EventServices.registerEvent(DebugBreakEvent);
        /**
         * class DebugUnbreakEvent
         * @extends Event
         * @private
         */
        var DebugUnbreakEvent = /** @class */ (function (_super) {
            __extends(DebugUnbreakEvent, _super);
            function DebugUnbreakEvent() {
                return _super.call(this) || this;
            }
            DebugUnbreakEvent.prototype.getPath = function () {
                return this.path;
            };
            return DebugUnbreakEvent;
        }(EPEvent));
        ExecutionEvents.DebugUnbreakEvent = DebugUnbreakEvent;
        DebugUnbreakEvent.prototype.type = 'DebugUnbreakEvent';
        EventServices.registerEvent(DebugUnbreakEvent);
        /**
         * class DebugBlockEvent
         * @extends Event
         * @private
         */
        var DebugBlockEvent = /** @class */ (function (_super) {
            __extends(DebugBlockEvent, _super);
            function DebugBlockEvent() {
                return _super.call(this) || this;
            }
            DebugBlockEvent.prototype.getPath = function () {
                return this.path;
            };
            DebugBlockEvent.prototype.getState = function () {
                return this.state;
            };
            return DebugBlockEvent;
        }(EPEvent));
        ExecutionEvents.DebugBlockEvent = DebugBlockEvent;
        DebugBlockEvent.prototype.type = 'DebugBlockEvent';
        EventServices.registerEvent(DebugBlockEvent);
        /**
         * class NotifyEvent
         * @extends Event
         * @private
         */
        var NotifyEvent = /** @class */ (function (_super) {
            __extends(NotifyEvent, _super);
            function NotifyEvent() {
                return _super.call(this) || this;
            }
            NotifyEvent.prototype.getSeverity = function () {
                return this.severity;
            };
            NotifyEvent.prototype.getTitle = function () {
                return this.title;
            };
            NotifyEvent.prototype.getMessage = function () {
                return this.message;
            };
            return NotifyEvent;
        }(EPEvent));
        ExecutionEvents.NotifyEvent = NotifyEvent;
        NotifyEvent.prototype.type = 'NotifyEvent';
        EventServices.registerEvent(NotifyEvent);
        /**
         * class PrintEvent
         * @extends Event
         * @private
         */
        var PrintEvent = /** @class */ (function (_super) {
            __extends(PrintEvent, _super);
            function PrintEvent() {
                return _super.call(this) || this;
            }
            PrintEvent.prototype.getPath = function () {
                return this.path;
            };
            PrintEvent.prototype.getSeverity = function () {
                return this.severity;
            };
            PrintEvent.prototype.getContent = function () {
                if (this.jsonContent !== undefined) {
                    this.content = Tools.jsonParse(this.jsonContent);
                    this.jsonContent = undefined;
                }
                return this.content;
            };
            return PrintEvent;
        }(EPEvent));
        ExecutionEvents.PrintEvent = PrintEvent;
        PrintEvent.prototype.type = 'PrintEvent';
        EventServices.registerEvent(PrintEvent);
    })(ExecutionEvents || (ExecutionEvents = {}));
    return ExecutionEvents;
});
