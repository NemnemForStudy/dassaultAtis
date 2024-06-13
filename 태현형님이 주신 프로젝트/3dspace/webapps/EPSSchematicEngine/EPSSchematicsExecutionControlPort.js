/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionControlPort'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionControlPort", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionPort", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums", "DS/EPSSchematicEngine/EPSSchematicsExecutionControlLinkContext"], function (require, exports, ExecutionPort, GraphBlock, Enums, EventServices, ExecutionEvents, ExecutionEnums, ExecutionControlLinkContext) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics execution control port.
     * @class ExecutionControlPort
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionControlPort
     * @private
     */
    var ExecutionControlPort = /** @class */ (function (_super) {
        __extends(ExecutionControlPort, _super);
        /**
         * @constructor
         * @param {ControlPort} model - The control port model.
         * @param {ExecutionBlock} parent - The parent execution block.
         */
        function ExecutionControlPort(model, parent) {
            var _this = _super.call(this, model, parent) || this;
            _this.active = false;
            return _this;
        }
        /**
         * Adds a port activate listener on the control port.
         * @protected
         * @param {Function} callback - The callback that will be called on event reception.
         */
        ExecutionControlPort.prototype.addPortActivateListener = function (callback) {
            if (this.model.getType() === Enums.EControlPortType.eOutput || this.model.getType() === Enums.EControlPortType.eOutputEvent) {
                this.eventTarget.addListener(ExecutionEvents.ExecutionControlPortActivateEvent, callback);
            }
        };
        /**
         * Removes a port activate listener from the control port.
         * @protected
         * @param {Function} callback - The callback that will be called on event reception.
         */
        ExecutionControlPort.prototype.removePortActivateListener = function (callback) {
            if (this.model.getType() === Enums.EControlPortType.eOutput || this.model.getType() === Enums.EControlPortType.eOutputEvent) {
                this.eventTarget.removeListener(ExecutionEvents.ExecutionControlPortActivateEvent, callback);
            }
        };
        /**
         * Activates the control port.
         * @private
         */
        ExecutionControlPort.prototype.activate = function () {
            if (this.model.block instanceof GraphBlock && this.model.block.graph === undefined) {
                if (this.model.getType() === Enums.EControlPortType.eOutput || this.model.getType() === Enums.EControlPortType.eOutputEvent) {
                    // Send the activate port event
                    var event_1 = new ExecutionEvents.ExecutionControlPortActivateEvent();
                    event_1.controlPort = this;
                    this.eventTarget.dispatchEvent(event_1);
                    if (this.model.getType() === Enums.EControlPortType.eOutputEvent) {
                        this.parent.sendEvent(this);
                    }
                }
            }
            this.active = true;
            this.trace();
        };
        /**
         * Deactivates the control port.
         * @private
         */
        ExecutionControlPort.prototype.deactivate = function () {
            this.active = false;
        };
        /**
         * Checks whether the port is active or not.
         * @private
         * @return {boolean} True if the port is active else false.
         */
        ExecutionControlPort.prototype.isActive = function () {
            return this.active;
        };
        /**
         * Gets the port event.
         * @private
         * @return {EPEvent} The port event.
         */
        ExecutionControlPort.prototype.getEvent = function () {
            return this.event;
        };
        /**
         * Sets the port event.
         * @private
         * @param {EPEvent} event - The port event.
         */
        ExecutionControlPort.prototype.setEvent = function (event) {
            if ((this.model.getType() === Enums.EControlPortType.eInputEvent || this.model.getType() === Enums.EControlPortType.eOutputEvent) &&
                event instanceof EventServices.getEventByType(this.model.getEventType())) {
                this.event = event;
            }
        };
        /**
         * Traces the execution of the control port.
         * @private
         */
        ExecutionControlPort.prototype.trace = function () {
            if (this.getTraceMode() & ExecutionEnums.FTraceEvent.fControlPort) {
                var event_2 = new ExecutionEvents.TracePortEvent();
                event_2.path = this.model.toPath();
                EventServices.dispatchEvent(event_2);
            }
        };
        /**
         * Gets the next links to execute connected to that port.
         * @private
         * @return {ExecutionControlLinkContext[]} The next links to execute.
         */
        ExecutionControlPort.prototype.getLinksToExecute = function () {
            var _this = this;
            var links = [];
            if (this.model.block instanceof GraphBlock) {
                links = this.links.filter(function (link) { return link.startPort === _this; });
            }
            else {
                links = this.links.slice(0);
            }
            var mappedLinks = links.map(function (link) { return new ExecutionControlLinkContext(link); });
            return mappedLinks;
        };
        return ExecutionControlPort;
    }(ExecutionPort));
    return ExecutionControlPort;
});
