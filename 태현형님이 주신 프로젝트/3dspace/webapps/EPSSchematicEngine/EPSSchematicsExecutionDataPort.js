/// <amd-module name='DS/EPSSchematicEngine/EPSSchematicsExecutionDataPort'/>
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
define("DS/EPSSchematicEngine/EPSSchematicsExecutionDataPort", ["require", "exports", "DS/EPSSchematicEngine/EPSSchematicsExecutionPort", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicEngine/EPSSchematicsExecutionEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPEventServices/EPEventServices"], function (require, exports, ExecutionPort, ExecutionEvents, ExecutionEnums, GraphBlock, Enums, EventServices) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a schematics execution data port.
     * @class ExecutionDataPort
     * @alias module:DS/EPSSchematicEngine/EPSSchematicsExecutionDataPort
     * @private
     */
    var ExecutionDataPort = /** @class */ (function (_super) {
        __extends(ExecutionDataPort, _super);
        /**
         * @constructor
         * @param {DataPort} model - The data port model.
         * @param {ExecutionBlock|ExecutionDataPort} parent - The parent execution block.
         */
        function ExecutionDataPort(model, parent) {
            var _this = _super.call(this, model, parent) || this;
            _this.portValued = false;
            _this.isValueInitialized = false;
            _this.executionValue = undefined;
            _this.dataPorts = [];
            _this.dataPortsByName = {};
            _this.buildFromModel();
            return _this;
        }
        /**
         * @private
         */
        ExecutionDataPort.prototype.buildFromModel = function () {
            var dataPortsModel = this.model.getDataPorts();
            for (var dp = 0; dp < dataPortsModel.length; dp++) {
                this.createDataPortPlay(dataPortsModel[dp]);
            }
        };
        /**
         * Creates the execution data port.
         * @private
         * @param {DataPort} dataPortModel - The data port model.
         */
        ExecutionDataPort.prototype.createDataPortPlay = function (dataPortModel) {
            var dataPort = new ExecutionDataPort(dataPortModel, this);
            this.dataPorts.push(dataPort);
            this.dataPortsByName[dataPortModel.name] = dataPort;
        };
        /**
         * Adds a value change listener on the data port.
         * @protected
         * @param {Function} callback - The callback that will be called on event reception.
         */
        ExecutionDataPort.prototype.addValueChangeListener = function (callback) {
            if (this.model.getType() === Enums.EDataPortType.eOutput) {
                this.eventTarget.addListener(ExecutionEvents.ExecutionDataPortValueChangeEvent, callback);
            }
        };
        /**
         * Removes a value change listener from the data port.
         * @protected
         * @param {Function} callback - The callback that will be called on event reception.
         */
        ExecutionDataPort.prototype.removeValueChangeListener = function (callback) {
            if (this.model.getType() === Enums.EDataPortType.eOutput) {
                this.eventTarget.removeListener(ExecutionEvents.ExecutionDataPortValueChangeEvent, callback);
            }
        };
        /**
         * Gets the execution links connected to that input data port.
         * If the port is an input graph port then only graph external links will be selected.
         * If the port is an output graph port then only graph internal links will be selected.
         * If the port is an output block port then no links will be selected.
         * @private
         * @returns {ExecutionDataLink[]} The list of execution links connected to that input data port.
         */
        ExecutionDataPort.prototype.getInputDataLinks = function () {
            var _this = this;
            var links = [];
            if (this.model.block instanceof GraphBlock) {
                links = this.links.filter(function (link) { return link.endPort === _this; });
            }
            else if (this.model.getType() === Enums.EDataPortType.eInput) {
                links = this.links.slice(0);
            }
            return links;
        };
        /**
         * Gets the execution links connected to that output data port.
         * If the port is an input graph port then only graph internal links will be selected.
         * If the port is an output graph port then only graph external links will be selected.
         * If the port is an input block port then no links will be selected.
         * @private
         * @return {ExecutionDataLink[]} The list of execution links connected to that output data port.
         */
        ExecutionDataPort.prototype.getOutputDataLinks = function () {
            var _this = this;
            var links = [];
            if (this.model.block instanceof GraphBlock) {
                links = this.links.filter(function (link) { return link.startPort === _this; });
            }
            else if (this.model.getType() === Enums.EDataPortType.eOutput) {
                links = this.links.slice(0);
            }
            return links;
        };
        /**
         * Checks whether the data port has been valued or not.
         * @private
         * @return {boolean} True if the data port is valued else false.
         */
        ExecutionDataPort.prototype.isValued = function () {
            var portValued = this.portValued;
            if (this.parent instanceof ExecutionDataPort) {
                portValued = this.parent.isValued();
            }
            else if (this.model.block instanceof GraphBlock) {
                if (this.model.getType() !== Enums.EDataPortType.eOutput) {
                    portValued = true;
                }
            }
            return portValued;
        };
        /**
         * Gets the port's value.
         * @protected
         * @returns {*} The port's value.
         */
        ExecutionDataPort.prototype.getValue = function () {
            var value;
            if (this.parent instanceof ExecutionDataPort) {
                value = this.parent.getValue();
                var propertyList = this.model.getName().split('.');
                while (value !== undefined && propertyList.length > 0) {
                    value = value[propertyList.shift()];
                }
            }
            else {
                if (!this.isValueInitialized) {
                    this.executionValue = this.model.getDefaultValue();
                    this.isValueInitialized = true;
                }
                value = this.executionValue;
            }
            return value;
        };
        /**
         * Sets the port's value.
         * @protected
         * @param {*} value - The port's value.
         */
        ExecutionDataPort.prototype.setValue = function (value) {
            if (value !== this.getValue()) {
                if (this.parent instanceof ExecutionDataPort) {
                    var parentValue = this.parent.getValue();
                    var propertyList = this.model.getName().split('.');
                    while (parentValue !== undefined && propertyList.length > 0) {
                        if (propertyList.length === 1) {
                            parentValue[propertyList.shift()] = value;
                        }
                        else {
                            parentValue = parentValue[propertyList.shift()];
                        }
                    }
                }
                else {
                    this.executionValue = value;
                    this.isValueInitialized = true;
                }
                this.onValueChange();
            }
            this.portValued = true;
            this.trace();
        };
        ExecutionDataPort.prototype.onValueChange = function () {
            if (this.parent instanceof ExecutionDataPort) {
                this.parent.onValueChange();
            }
            else {
                var event_1 = new ExecutionEvents.ExecutionDataPortValueChangeEvent();
                event_1.dataPort = this;
                event_1.value = this.getValue();
                this.eventTarget.dispatchEvent(event_1);
            }
        };
        /**
         * Gets the port's value type.
         * @protected
         * @return {string} The port's value type.
         */
        ExecutionDataPort.prototype.getValueType = function () {
            return this.model.getValueType();
        };
        /**
         * Traces the execution of the data port.
         * @private
         */
        ExecutionDataPort.prototype.trace = function () {
            if (this.getTraceMode() & ExecutionEnums.FTraceEvent.fDataPort) {
                var event_2 = new ExecutionEvents.TraceDataPortEvent();
                event_2.path = this.model.toPath();
                event_2.value = this.getValue();
                event_2.valueType = this.getValueType();
                EventServices.dispatchEvent(event_2);
                if (this.parent instanceof ExecutionDataPort) {
                    this.parent.trace();
                }
            }
        };
        return ExecutionDataPort;
    }(ExecutionPort));
    return ExecutionDataPort;
});
