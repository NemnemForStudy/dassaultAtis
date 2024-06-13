/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, Enums) {
    "use strict";
    var EventPortDefinitions;
    (function (EventPortDefinitions) {
        /**
         * @class EventPortDefinition
         */
        var EventPortDefinition = /** @class */ (function () {
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             */
            function EventPortDefinition(iName) {
                this.name = iName;
            }
            return EventPortDefinition;
        }());
        /**
         * @class InputBasic
         * @extends EventPortDefinition
         * @private
         */
        var InputBasic = /** @class */ (function (_super) {
            __extends(InputBasic, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             * @param {string} iEventType - The event type.
             */
            function InputBasic(iName, iEventType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EControlPortType.eInputEvent;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.eventTypes = [iEventType];
                _this.eventType = undefined;
                return _this;
            }
            return InputBasic;
        }(EventPortDefinition));
        EventPortDefinitions.InputBasic = InputBasic;
        /**
         * @class InputList
         * @extends EventPortDefinition
         * @private
         */
        var InputList = /** @class */ (function (_super) {
            __extends(InputList, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             * @param {string[]} iEventTypes - The list of event types.
             * @param {string} [iEventType] - The optional default event type.
             */
            function InputList(iName, iEventTypes, iEventType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EControlPortType.eInputEvent;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.eventTypes = iEventTypes;
                _this.eventType = iEventType;
                return _this;
            }
            return InputList;
        }(EventPortDefinition));
        EventPortDefinitions.InputList = InputList;
        /**
         * @class InputAll
         * @extends EventPortDefinition
         * @private
         */
        var InputAll = /** @class */ (function (_super) {
            __extends(InputAll, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             * @param {string} [iEventType] - The optional event type.
             */
            function InputAll(iName, iEventType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EControlPortType.eInputEvent;
                _this.typeCategory = Enums.FTypeCategory.fEvent;
                _this.eventTypes = [];
                _this.eventType = iEventType;
                return _this;
            }
            return InputAll;
        }(EventPortDefinition));
        EventPortDefinitions.InputAll = InputAll;
        /**
         * @class OutputBasic
         * @extends EventPortDefinition
         * @private
         */
        var OutputBasic = /** @class */ (function (_super) {
            __extends(OutputBasic, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             * @param {string} iEventType - The event type.
             */
            function OutputBasic(iName, iEventType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EControlPortType.eOutputEvent;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.eventTypes = [iEventType];
                _this.eventType = undefined;
                return _this;
            }
            return OutputBasic;
        }(EventPortDefinition));
        EventPortDefinitions.OutputBasic = OutputBasic;
        /**
         * @class OutputList
         * @extends EventPortDefinition
         * @private
         */
        var OutputList = /** @class */ (function (_super) {
            __extends(OutputList, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             * @param {string[]} iEventTypes - The list of event types.
             * @param {string} [iEventType] - The optional default event type.
             */
            function OutputList(iName, iEventTypes, iEventType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EControlPortType.eOutputEvent;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.eventTypes = iEventTypes;
                _this.eventType = iEventType;
                return _this;
            }
            return OutputList;
        }(EventPortDefinition));
        EventPortDefinitions.OutputList = OutputList;
        /**
         * @class OutputAll
         * @extends EventPortDefinition
         * @private
         */
        var OutputAll = /** @class */ (function (_super) {
            __extends(OutputAll, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The event port name.
             * @param {string} [iEventType] - The optional event type.
             */
            function OutputAll(iName, iEventType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EControlPortType.eOutputEvent;
                _this.typeCategory = Enums.FTypeCategory.fEvent;
                _this.eventTypes = [];
                _this.eventType = iEventType;
                return _this;
            }
            return OutputAll;
        }(EventPortDefinition));
        EventPortDefinitions.OutputAll = OutputAll;
    })(EventPortDefinitions || (EventPortDefinitions = {}));
    return EventPortDefinitions;
});
