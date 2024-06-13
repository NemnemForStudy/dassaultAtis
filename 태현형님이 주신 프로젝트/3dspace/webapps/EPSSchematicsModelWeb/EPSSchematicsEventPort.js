/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsEventPort'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, ControlPort, Enums, TypeLibrary, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var EventPort = /** @class */ (function (_super) {
        __extends(EventPort, _super);
        /**
         * @constructor
         */
        function EventPort() {
            var _this = _super.call(this) || this;
            _this.typeCategory = Enums.FTypeCategory.fNone;
            _this.eventTypes = [];
            _this.listDataPortValueType = [];
            return _this;
        }
        /**
         * Construct event port from JSON.
         * @private
         * @param {IJSONEventPort} iJSONEventPort - The JSON event port.
         */
        EventPort.prototype.fromJSON = function (iJSONEventPort) {
            _super.prototype.fromJSON.call(this, iJSONEventPort);
            if (TypeLibrary.hasType(this.getGraphContext(), iJSONEventPort.eventType, Enums.FTypeCategory.fEvent)) {
                this.setEventType(iJSONEventPort.eventType);
            }
            else if (typeof iJSONEventPort.eventType === 'string') {
                this.setInvalidEventType(iJSONEventPort.eventType);
            }
        };
        /**
         * Construct JSON from event port.
         * @private
         * @param {IJSONEventPort} oJSONEventPort - The JSON event port.
         */
        EventPort.prototype.toJSON = function (oJSONEventPort) {
            _super.prototype.toJSON.call(this, oJSONEventPort);
            oJSONEventPort.eventType = this.getEventType();
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} The validity result.
         */
        EventPort.prototype.computeValidity = function () {
            var result = this.eventType !== this.invalidEventType;
            return result;
        };
        /**
         * On validity change.
         * @private
         */
        EventPort.prototype.onValidityChange = function () {
            var newValid = this.computeValidity();
            if (this.valid !== newValid) {
                this.valid = newValid;
                if (this.valid) {
                    this.invalidEventType = undefined;
                }
                var event_1 = new Events.ControlPortValidityChangeEvent();
                event_1.controlPort = this;
                event_1.index = this.getIndex();
                event_1.indexByType = this.getIndexByType();
                this.dispatchEvent(event_1);
                if (this.block !== undefined) {
                    this.block.onValidityChange();
                }
            }
        };
        /**
         * Set invalid event type.
         * @private
         * @param {string} iEventType - The event type.
         * @return {boolean} - The result.
         */
        EventPort.prototype.setInvalidEventType = function (iEventType) {
            this.invalidEventType = iEventType;
            var result = this.setEventType(iEventType);
            return result;
        };
        /**
         * Get allowed event types.
         * @private
         * @return {string[]} The allowed event types.
         */
        EventPort.prototype.getAllowedEventTypes = function () {
            var _this = this;
            var allowedEventTypes = TypeLibrary.getTypeNameList(this.getGraphContext(), this.typeCategory);
            if (this.type === Enums.EControlPortType.eOutputEvent) {
                allowedEventTypes = allowedEventTypes.filter(function (eventType) { return TypeLibrary.getType(_this.getGraphContext(), eventType).sendable; });
            }
            for (var et = 0; et < this.eventTypes.length; et++) {
                var eventType = this.eventTypes[et];
                if (!TypeLibrary.hasType(this.getGraphContext(), eventType, this.typeCategory)) {
                    allowedEventTypes.push(eventType);
                }
            }
            if (this.invalidEventType !== undefined) {
                allowedEventTypes.push(this.invalidEventType);
            }
            return allowedEventTypes;
        };
        /**
         * Set type category.
         * @private
         * @param {EP.FTypeCategory} iTypeCategory - The type category.
         * @return {boolean} The result.
         */
        EventPort.prototype.setTypeCategory = function (iTypeCategory) {
            var result = iTypeCategory === Enums.FTypeCategory.fNone;
            result = result || iTypeCategory === Enums.FTypeCategory.fEvent;
            if (result) {
                this.typeCategory = iTypeCategory;
                var allowedEventTypes = this.getAllowedEventTypes();
                if (allowedEventTypes.indexOf(this.eventType) === -1) {
                    this.setEventType(allowedEventTypes[0]);
                }
            }
            return result;
        };
        /**
         * Set event types.
         * @private
         * @param {string[]} iEventTypes - The list of event types.
         * @return {boolean} The result.
         */
        EventPort.prototype.setEventTypes = function (iEventTypes) {
            var _this = this;
            var result = Array.isArray(iEventTypes);
            result = result && iEventTypes.every(function (eventType) {
                var isEventType = TypeLibrary.hasType(_this.getGraphContext(), eventType, Enums.FTypeCategory.fEvent);
                if (_this.type === Enums.EControlPortType.eOutputEvent) {
                    isEventType = isEventType && TypeLibrary.getType(_this.getGraphContext(), eventType).sendable;
                }
                return isEventType;
            });
            if (result) {
                this.eventTypes = iEventTypes.slice();
                var allowedEventTypes = this.getAllowedEventTypes();
                if (allowedEventTypes.indexOf(this.eventType) === -1) {
                    this.setEventType(allowedEventTypes[0]);
                }
            }
            return result;
        };
        /**
         * Get event type.
         * @private
         * @return {string} The event type.
         */
        EventPort.prototype.getEventType = function () {
            return this.eventType;
        };
        /**
         * Is event type settable.
         * @private
         * @param {string} [iEventType] - The event type.
         * @return {boolean} Whether event type is settable.
         */
        EventPort.prototype.isEventTypeSettable = function (iEventType) {
            var allowedEventTypes = this.getAllowedEventTypes();
            var result = !this.isFromInvalid();
            result = result && !this.isFromTemplate();
            result = result && allowedEventTypes.length > 0;
            if (arguments.length !== 0) {
                result = result && iEventType !== this.eventType;
                result = result && allowedEventTypes.indexOf(iEventType) !== -1;
            }
            if (this.eventType !== undefined) {
                result = result && allowedEventTypes.length > 1;
            }
            return result;
        };
        /**
         * Set event type.
         * @private
         * @param {string} iEventType - The event type.
         * @return {boolean} The result.
         */
        EventPort.prototype.setEventType = function (iEventType) {
            var result = arguments.length === 1;
            result = result && this.isEventTypeSettable(iEventType);
            if (result) {
                this.eventType = iEventType;
                if (this.block !== undefined) {
                    var event_2 = new Events.ControlPortEventTypeChangeEvent();
                    event_2.controlPort = this;
                    event_2.index = this.getIndex();
                    event_2.indexByType = this.getIndexByType();
                    event_2.eventType = this.getEventType();
                    this.dispatchEvent(event_2);
                }
                this.onValidityChange();
                for (var dpvt = 0; dpvt < this.listDataPortValueType.length; dpvt++) {
                    this.listDataPortValueType[dpvt].onRefValueTypeChanged();
                }
            }
            return result;
        };
        return EventPort;
    }(ControlPort));
    return EventPort;
});
