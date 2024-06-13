/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsDataPort'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPEventServices/EPEventTarget", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsPolyfill", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, TypeLibrary, EventTarget, Tools, Events, Polyfill, Enums) {
    "use strict";
    var DataPort = /** @class */ (function () {
        /**
         * @constructor
         */
        function DataPort() {
            this.valid = true;
            this.typeCategory = Enums.FTypeCategory.fNone;
            this.valueTypes = [];
            this.defaultValues = {};
            this.listDataPortValueType = [];
            this.override = false;
            this.maxTestValues = 0;
            this.testValues = [];
            this.dataLinks = [];
            this.dataPorts = [];
            this.dataPortsByName = {};
            this.onTypeLibraryLocalCustomEventBind = this.onTypeLibraryLocalCustomEvent.bind(this);
            this.eventTarget = new EventTarget();
        }
        /**
         * Construct data port from JSON.
         * @private
         * @param {IJSONDataPort} iJSONDataPort - The JSON data port.
         */
        DataPort.prototype.fromJSON = function (iJSONDataPort) {
            var dataPortByName = this.block.getDataPortByName(iJSONDataPort.name);
            if (dataPortByName !== undefined) {
                if (this.getIndex() < dataPortByName.getIndex()) {
                    dataPortByName.setName(Tools.generateGUID());
                }
            }
            this.setName(iJSONDataPort.name);
            this.setType(iJSONDataPort.portType);
            if (TypeLibrary.hasType(this.getGraphContext(), iJSONDataPort.valueType, Enums.FTypeCategory.fAll)) {
                this.setValueType(iJSONDataPort.valueType);
                if (this.getValueType() === iJSONDataPort.valueType && (iJSONDataPort.override || this.block.hasOwnProperty('json'))) {
                    this.setDefaultValue(TypeLibrary.getValueFromJSONValue(this.getGraphContext(), iJSONDataPort.value, iJSONDataPort.valueType));
                }
                else {
                    this.resetDefaultValue();
                }
            }
            else if (typeof iJSONDataPort.valueType === 'string') {
                this.setInvalidValueType(iJSONDataPort.valueType);
                this.setInvalidDefaultValue(iJSONDataPort.value);
                this.setOverride(iJSONDataPort.override);
            }
            // If it is a template that is updating we don't update the data ports
            if (this.block === undefined || this.block.onTemplateChangeBind === undefined || this.block.isTemplate()) {
                var dataPortNames = iJSONDataPort.dataPorts.map(function (jsonDataPort) { return jsonDataPort.name; });
                if (!this.updateDataPorts(dataPortNames)) {
                    for (var dp = 0; dp < iJSONDataPort.dataPorts.length; dp++) {
                        var jsonDataPort = iJSONDataPort.dataPorts[dp];
                        if (this.getDataPortByName(jsonDataPort.name) === undefined) {
                            this.createInvalidDataPort(jsonDataPort.name, jsonDataPort.valueType, dp);
                        }
                    }
                }
            }
        };
        /**
         * Construct JSON from data port.
         * @private
         * @param {IJSONDataPort} oJSONDataPort - The JSON data port.
         */
        DataPort.prototype.toJSON = function (oJSONDataPort) {
            oJSONDataPort.name = this.name;
            oJSONDataPort.portType = this.type;
            oJSONDataPort.valueType = this.getValueType();
            if (this.type !== Enums.EDataPortType.eOutput) {
                oJSONDataPort.override = this.isOverride();
                oJSONDataPort.value = TypeLibrary.getJSONValueFromValue(this.getGraphContext(), this.getDefaultValue(), this.getValueType());
            }
            oJSONDataPort.dataPorts = [];
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                var dataPort = {};
                this.dataPorts[dp].toJSON(dataPort);
                oJSONDataPort.dataPorts.push(dataPort);
            }
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        DataPort.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        DataPort.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        DataPort.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * Get data port path.
         * @private
         * @param {Block} [iGraph] - The graph block.
         * @return {string} The data port path.
         */
        DataPort.prototype.toPath = function (iGraph) {
            var path;
            if (this.dataPort !== undefined) {
                path = this.dataPort.toPath(iGraph) + '.' + this.name;
            }
            else {
                if (this.block !== undefined) {
                    path = this.block.toPath(iGraph) + '.dataPorts[' + this.getIndex() + ']';
                }
            }
            return path;
        };
        /**
         * From definition.
         * @private
         */
        DataPort.prototype.fromDefinition = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            if (this.block instanceof BlockCtr &&
                this.dataPort === undefined &&
                this.block.hasDefinition()) {
                var definition = this.block.getDefinition().dataPorts[this.getIndex()];
                if (definition !== undefined) {
                    var jsonDataPort = {};
                    definition.toJSON(jsonDataPort);
                    this.fromJSON(jsonDataPort);
                }
            }
        };
        /**
         * Is from definition.
         * @private
         * @return {boolean} True if data port is from definition, false otherwise.
         */
        DataPort.prototype.isFromDefinition = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            result = result && this.dataPort === undefined;
            result = result && (!this.block.hasDefinition() || this.block.getDefinition().dataPorts[this.getIndex()] !== undefined);
            return result;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if data port is from template, false otherwise.
         */
        DataPort.prototype.isFromTemplate = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            result = result && (this.block.isTemplate() || this.block.isFromTemplate());
            return result;
        };
        /**
         * Is from invalid.
         * @private
         * @return {boolean} True if data port if from invalid, false otherwise.
         */
        DataPort.prototype.isFromInvalid = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            result = result && this.block.json !== undefined;
            return result;
        };
        /**
         * Has local custom type.
         * @private
         * @return {boolean} True if data port has local custom type, false otherwise.
         */
        DataPort.prototype.hasLocalCustomType = function () {
            var graphContext = this.getGraphContext();
            var result = graphContext !== undefined;
            result = result && TypeLibrary.hasLocalCustomType(graphContext, this.getValueType(), Enums.FTypeCategory.fAll);
            return result;
        };
        /**
         * Is valid.
         * @private
         * @return {boolean} True if data port is valid, false otherwise.
         */
        DataPort.prototype.isValid = function () {
            return this.valid;
        };
        DataPort.prototype.updateValueType = function () {
            if (this.refPort === undefined) {
                var valueType = this.valueType;
                this.invalidValueType = undefined;
                if (this.dataPort === undefined) {
                    this.valueType = undefined;
                    if (!this.isValueTypeSettable(valueType)) {
                        this.invalidValueType = valueType;
                    }
                    this.valueType = valueType;
                }
                else {
                    this.valueTypes = [];
                    var propertyValueType = this.getValueTypeByPropertyPath.call(this.dataPort, this.getName());
                    if (propertyValueType !== undefined) {
                        this.valueTypes.push(propertyValueType);
                        if (propertyValueType !== valueType) {
                            this.valueType = undefined;
                            this.setValueType(propertyValueType);
                        }
                    }
                    else {
                        this.invalidValueType = valueType;
                    }
                }
            }
        };
        DataPort.prototype.updateDefaultValue = function () {
            if (this.dataPort === undefined) {
                if (this.computeValidity()) {
                    this.invalidDefaultValue = undefined;
                    if ((this.isDefaultValueSettable() && !this.isDefaultValueSettable(this.defaultValue)) ||
                        !this.isOverride()) {
                        this._setDefaultValue(this.getDefaultValueByType(this.getValueType()));
                        this.setOverride(false);
                    }
                }
                else {
                    this.invalidDefaultValue = this.defaultValue;
                }
            }
        };
        DataPort.prototype.update = function () {
            if (!this.isFromTemplate()) {
                this.updateValueType();
                this.updateDefaultValue();
                this.onValidityChange();
            }
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} True if data port is valid, false otherwise.
         */
        DataPort.prototype.computeValidity = function () {
            var result = this.valueType !== this.invalidValueType;
            if (this.refPort !== undefined) {
                result = this.refPort.isValid();
            }
            return result;
        };
        /**
         * On validity change.
         * @private
         */
        DataPort.prototype.onValidityChange = function () {
            var newValid = this.computeValidity();
            if (this.valid !== newValid) {
                this.valid = newValid;
                if (this.valid) {
                    this.invalidValueType = undefined;
                    this.invalidIndex = undefined;
                    this.invalidDefaultValue = undefined;
                }
                var event_1 = new Events.DataPortValidityChangeEvent();
                event_1.dataPort = this;
                event_1.index = this.getIndex();
                event_1.indexByType = this.getIndexByType();
                this.dispatchEvent(event_1);
                if (this.block !== undefined) {
                    this.block.onValidityChange();
                }
            }
        };
        /**
         * Is start port.
         * @private
         * @param {GraphBlock} iGraph - The graph block.
         * @return {boolean} True if data port is a start port, false otherwise.
         */
        DataPort.prototype.isStartPort = function (iGraph) {
            var result = false;
            if (this.block === iGraph) {
                result = this.type === Enums.EDataPortType.eInput;
                result = result || this.type === Enums.EDataPortType.eLocal;
            }
            else {
                result = this.type === Enums.EDataPortType.eOutput;
                result = result && this.block !== undefined;
                result = result && this.block.graph === iGraph;
            }
            return result;
        };
        /**
         * Is end port.
         * @private
         * @param {GraphBlock} iGraph - The graph block.
         * @return {boolean} True if data port is a end port, false otherwise.
         */
        DataPort.prototype.isEndPort = function (iGraph) {
            var result = false;
            if (this.block === iGraph) {
                result = this.type === Enums.EDataPortType.eOutput;
                result = result || this.type === Enums.EDataPortType.eLocal;
            }
            else {
                result = this.type === Enums.EDataPortType.eInput;
                result = result && this.block !== undefined;
                result = result && this.block.graph === iGraph;
            }
            return result;
        };
        /**
         * Get documentation description.
         * @private
         * @return {string} The documentation description.
         */
        DataPort.prototype.getDocumentationDescription = function () {
            var documentationDescription;
            if (this.block !== undefined) {
                var documentation = this.block.getDocumentation();
                if (documentation !== undefined) {
                    documentationDescription = documentation.getDataPortByName(this.name);
                }
            }
            return documentationDescription;
        };
        /**
         * Get index.
         * @private
         * @return {number} the data port index.
         */
        DataPort.prototype.getIndex = function () {
            var index;
            if (this.dataPort !== undefined) {
                index = this.dataPort.getDataPorts().indexOf(this);
            }
            else {
                if (this.block !== undefined) {
                    index = this.block.getDataPorts().indexOf(this);
                }
            }
            return index;
        };
        /**
         * Get index by type.
         * @private
         * @return {number} The data port index by type.
         */
        DataPort.prototype.getIndexByType = function () {
            var indexByType;
            if (this.dataPort !== undefined) {
                indexByType = this.getIndex();
            }
            else {
                if (this.block !== undefined) {
                    indexByType = this.block.getDataPorts(this.type).indexOf(this);
                }
            }
            return indexByType;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        DataPort.prototype.getGraphContext = function () {
            var graphContext;
            if (this.block !== undefined) {
                graphContext = this.block.getGraphContext();
            }
            return graphContext;
        };
        DataPort.prototype.onTypeLibraryLocalCustomEvent = function (iEvent) {
            if (this.getGraphContext() === iEvent.getGraphContext()) {
                this.update();
            }
        };
        /**
         * On add.
         * @private
         * @param {Block} iBlock - The block.
         * @param {DataPort} [iDataPort] - The data port.
         */
        DataPort.prototype.onAdd = function (iBlock, iDataPort) {
            this.block = iBlock;
            this.dataPort = iDataPort;
            if (this.getGraphContext() !== undefined) {
                this.onGraphContextIn();
            }
        };
        /**
         * On remove.
         * @private
         */
        DataPort.prototype.onRemove = function () {
            if (this.getGraphContext() !== undefined) {
                this.onGraphContextOut();
            }
            if (this.dataPort === undefined) {
                this.collapse();
            }
            this.unlink();
            this.block = undefined;
            this.dataPort = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        DataPort.prototype.onGraphContextIn = function () {
            TypeLibrary.addListener(Events.TypeLibraryRegisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.addListener(Events.TypeLibraryUpdateLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.addListener(Events.TypeLibraryUnregisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
        };
        /**
         * On graph context out.
         * @private
         */
        DataPort.prototype.onGraphContextOut = function () {
            TypeLibrary.removeListener(Events.TypeLibraryRegisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.removeListener(Events.TypeLibraryUpdateLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.removeListener(Events.TypeLibraryUnregisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
        };
        /**
         * Get type.
         * @private
         * @return {EP.EDataPortType} The data port type.
         */
        DataPort.prototype.getType = function () {
            return this.type;
        };
        /**
         * Set type.
         * @private
         * @param {EP.EDataPortType} iType - The data port type.
         * @return {boolean} True if data port type has been set, false otherwise.
         */
        DataPort.prototype.setType = function (iType) {
            var result = this.type === undefined;
            result = result && Object.keys(Enums.EDataPortType).some(function (key) { return iType === Enums.EDataPortType[key]; });
            if (result) {
                this.type = iType;
            }
            return result;
        };
        /**
         * Get name.
         * @private
         * @return {string} The data port name.
         */
        DataPort.prototype.getName = function () {
            return this.name;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The data port name.
         * @return {boolean} True if the name is settable, false otherwise.
         */
        DataPort.prototype.isNameSettable = function (iName) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
                if (this.block !== undefined) {
                    result = result && this.block.dataPortsByName[iName] === undefined;
                }
            }
            if (this.name !== undefined) {
                result = result && this.dataPort === undefined;
                result = result && !this.isFromInvalid();
                result = result && !this.isFromTemplate();
                result = result && !this.isFromDefinition();
                var DynamicBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock');
                if (this.block instanceof DynamicBlockCtr) {
                    result = result && !this.block.dataPortRules[this.type].nameReadonly;
                }
            }
            return result;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The data port name.
         * @return {boolean} True if data port name has been set, false otherwise.
         */
        DataPort.prototype.setName = function (iName) {
            var result = arguments.length === 1;
            result = result && this.isNameSettable(iName);
            if (result) {
                if (this.block !== undefined) {
                    delete this.block.dataPortsByName[this.name];
                    this.block.dataPortsByName[iName] = this;
                }
                this.name = iName;
                if (this.block !== undefined) {
                    var event_2 = new Events.DataPortNameChangeEvent();
                    event_2.dataPort = this;
                    event_2.index = this.getIndex();
                    event_2.indexByType = this.getIndexByType();
                    event_2.name = this.name;
                    this.dispatchEvent(event_2);
                }
            }
            return result;
        };
        /**
         * Set invalid value type.
         * @private
         * @param {string} iValueType - The data port value type.
         * @return {boolean} True if data port invalud value type has been set, false otherwise.
         */
        DataPort.prototype.setInvalidValueType = function (iValueType) {
            this.invalidValueType = iValueType;
            var result = this.setValueType(iValueType);
            return result;
        };
        /**
         * Get allowed value types.
         * @private
         * @return {string[]} The allowed value types.
         */
        DataPort.prototype.getAllowedValueTypes = function () {
            var _this = this;
            var EventPortCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsEventPort');
            var allowedValueTypes;
            if (this.refPort instanceof DataPort) {
                allowedValueTypes = this.refPort.getAllowedValueTypes();
                if (this.refTypeReplacer !== undefined) {
                    allowedValueTypes = allowedValueTypes.map(function (valueType) { return _this.refTypeReplacer(valueType); });
                }
            }
            else if (this.refPort instanceof EventPortCtr) {
                allowedValueTypes = this.refPort.getAllowedEventTypes();
            }
            else {
                allowedValueTypes = TypeLibrary.getTypeNameList(this.getGraphContext(), this.typeCategory);
                for (var vt = 0; vt < this.valueTypes.length; vt++) {
                    var valueType = this.valueTypes[vt];
                    if (!TypeLibrary.hasType(this.getGraphContext(), valueType, this.typeCategory)) {
                        allowedValueTypes.push(valueType);
                    }
                }
            }
            if (this.invalidValueType !== undefined) {
                allowedValueTypes.push(this.invalidValueType);
            }
            return allowedValueTypes;
        };
        /**
         * Set type category.
         * @private
         * @param {EP.FTypeCategory} iTypeCategory - The data port type category.
         * @return {boolean} True if data port type category has been set, false otherwise.
         */
        DataPort.prototype.setTypeCategory = function (iTypeCategory) {
            var result = this.refPort === undefined;
            result = result && iTypeCategory >= Enums.FTypeCategory.fNone;
            result = result && iTypeCategory <= Enums.FTypeCategory.fAll;
            if (result) {
                this.typeCategory = iTypeCategory;
                var allowedValueTypes = this.getAllowedValueTypes();
                if (allowedValueTypes.indexOf(this.valueType) === -1) {
                    this.setValueType(allowedValueTypes[0]);
                }
            }
            return result;
        };
        /**
         * Set value types.
         * @private
         * @param {string[]} iValueTypes - The data port value types.
         * @return {boolean} True if data port value types have been set, false otherwise.
         */
        DataPort.prototype.setValueTypes = function (iValueTypes) {
            var _this = this;
            var result = this.refPort === undefined;
            result = result && Array.isArray(iValueTypes);
            result = result && iValueTypes.every(function (valueType) { return TypeLibrary.hasType(_this.getGraphContext(), valueType, Enums.FTypeCategory.fAll); });
            if (result) {
                this.valueTypes = iValueTypes.slice();
                var allowedValueTypes = this.getAllowedValueTypes();
                if (allowedValueTypes.indexOf(this.valueType) === -1) {
                    this.setValueType(allowedValueTypes[0]);
                }
            }
            return result;
        };
        /**
         * Set ref.
         * @private
         * @param {DataPort|EventPort} iRefPort - The port reference.
         * @return {boolean} True if the port reference has been set, false otherwise.
         */
        DataPort.prototype.setRef = function (iRefPort) {
            var EventPortCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsEventPort');
            var result = this.isValid();
            result = result && this.block === undefined;
            result = result && this.refPort === undefined;
            if (!(iRefPort instanceof EventPortCtr)) {
                result = result && iRefPort instanceof DataPort;
                result = result && iRefPort !== this;
                result = result && iRefPort.refPort === undefined;
            }
            if (result) {
                this.refPort = iRefPort;
                if (this.type !== Enums.EDataPortType.eOutput) {
                    if (iRefPort instanceof DataPort) {
                        var refValueTypes = Object.keys(this.refPort.defaultValues);
                        for (var rvt = 0; rvt < refValueTypes.length; rvt++) {
                            var valueType = refValueTypes[rvt];
                            if (!this.defaultValues.hasOwnProperty(valueType)) {
                                this.defaultValues[valueType] = Tools.copyValue(this.refPort.defaultValues[valueType]);
                            }
                        }
                    }
                    this.defaultValue = this.getDefaultValueByType(this.getValueType());
                }
                this.refPort.listDataPortValueType.push(this);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Set ref array value type.
         * @private
         * @param {DataPort} iRefPort - The data port reference.
         * @return {boolean} True if the data port ref value type has been set, false otherwise.
         */
        DataPort.prototype.setRefArrayValue = function (iRefPort) {
            var _this = this;
            var result = this.isValid();
            result = result && this.block === undefined;
            result = result && this.refPort === undefined;
            result = result && iRefPort instanceof DataPort;
            result = result && iRefPort !== this;
            result = result && iRefPort.refPort === undefined;
            result = result && (iRefPort.typeCategory === Enums.FTypeCategory.fArray || iRefPort.typeCategory === Enums.FTypeCategory.fNone);
            result = result && iRefPort.valueTypes.every(function (valueType) { return TypeLibrary.hasType(_this.getGraphContext(), valueType, Enums.FTypeCategory.fArray); });
            if (result) {
                this.refPort = iRefPort;
                this.refTypeReplacer = TypeLibrary.getArrayValueTypeName;
                if (this.type !== Enums.EDataPortType.eOutput) {
                    this.defaultValue = this.getDefaultValueByType(this.getValueType());
                }
                this.refPort.listDataPortValueType.push(this);
                this.onValidityChange();
            }
            return result;
        };
        /**
         * Set default values.
         * @private
         * @param {IDefaultValues} iDefaultValues - The default values.
         * @return {boolean} True if the default values have been set, false otherwise.
         */
        DataPort.prototype.setDefaultValues = function (iDefaultValues) {
            var _this = this;
            var result = iDefaultValues instanceof Object;
            var valueTypes = Object.keys(iDefaultValues);
            result = result && valueTypes.every(function (valueType) { return TypeLibrary.isValueType(_this.getGraphContext(), valueType, iDefaultValues[valueType]); });
            if (result) {
                this.defaultValues = Tools.copyValue(iDefaultValues);
                if (this.getValueType() !== undefined && !this.isOverride()) {
                    this._setDefaultValue(this.getDefaultValueByType(this.getValueType()));
                }
            }
            return result;
        };
        /**
         * Get default value by type.
         * @private
         * @param {string} iType - The default value type.
         * @return {*} The default value.
         */
        DataPort.prototype.getDefaultValueByType = function (iType) {
            var defaultValue;
            if (this.defaultValues.hasOwnProperty(iType)) {
                defaultValue = this.defaultValues[iType];
            }
            else {
                defaultValue = TypeLibrary.getDefaultValue(this.getGraphContext(), iType);
            }
            return Tools.copyValue(defaultValue);
        };
        /**
         * Get value type.
         * @private
         * @return {string} The data port value type.
         */
        DataPort.prototype.getValueType = function () {
            var EventPortCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsEventPort');
            var valueType = this.valueType;
            if (this.refPort instanceof DataPort) {
                valueType = this.refPort.getValueType();
                if (this.refTypeReplacer !== undefined) {
                    valueType = this.refTypeReplacer(valueType);
                }
            }
            else if (this.refPort instanceof EventPortCtr) {
                valueType = this.refPort.getEventType();
            }
            return valueType;
        };
        /**
         * Is value type settable.
         * @private
         * @param {string} [iValueType] - The data port value type.
         * @return {boolean} True if data port value type is settable, false otherwise.
         */
        DataPort.prototype.isValueTypeSettable = function (iValueType) {
            var allowedValueTypes = this.getAllowedValueTypes();
            var result = this.refPort === undefined;
            result = result && allowedValueTypes.length > 0;
            if (arguments.length !== 0) {
                result = result && iValueType !== this.valueType;
                result = result && allowedValueTypes.indexOf(iValueType) !== -1;
            }
            if (this.valueType !== undefined) {
                result = result && !this.isFromInvalid();
                result = result && !this.isFromTemplate();
                result = result && allowedValueTypes.length > 1;
            }
            return result;
        };
        /**
         * Set value type.
         * @private
         * @param {string} iValueType - the data port value type.
         * @return {boolean} True if data port value type has been set, false otherwise.
         */
        DataPort.prototype.setValueType = function (iValueType) {
            var result = arguments.length === 1;
            result = result && this.isValueTypeSettable(iValueType);
            if (result) {
                this.collapse();
                this.valueType = iValueType;
                this.defaultValue = this.getDefaultValueByType(this.getValueType());
                this.setTestValues([]);
                if (this.block !== undefined) {
                    var event_3 = new Events.DataPortValueTypeChangeEvent();
                    event_3.dataPort = this;
                    event_3.index = this.getIndex();
                    event_3.indexByType = this.getIndexByType();
                    event_3.valueType = this.getValueType();
                    event_3.defaultValue = this.getDefaultValue();
                    this.dispatchEvent(event_3);
                }
                this.onValidityChange();
                this.setOverride(false);
                for (var dpvt = 0; dpvt < this.listDataPortValueType.length; dpvt++) {
                    this.listDataPortValueType[dpvt].onRefValueTypeChanged();
                }
            }
            return result;
        };
        DataPort.prototype.isReferenced = function () {
            var result = this.listDataPortValueType.length > 0;
            return result;
        };
        /**
         * On ref value type changed.
         * @private
         */
        DataPort.prototype.onRefValueTypeChanged = function () {
            this.collapse();
            this.defaultValue = this.getDefaultValueByType(this.getValueType());
            this.setTestValues([]);
            if (this.block !== undefined) {
                var event_4 = new Events.DataPortValueTypeChangeEvent();
                event_4.dataPort = this;
                event_4.index = this.getIndex();
                event_4.indexByType = this.getIndexByType();
                event_4.valueType = this.getValueType();
                event_4.defaultValue = this.getDefaultValue();
                this.dispatchEvent(event_4);
            }
            this.onValidityChange();
            this.setOverride(false);
        };
        /**
         * Set invalid default value.
         * @private
         * @param {*} iDefaultValue - The data port invalid default value.
         * @return {boolean} True if the data port invalid default value has been set, false otherwise.
         */
        DataPort.prototype.setInvalidDefaultValue = function (iDefaultValue) {
            this.invalidDefaultValue = Tools.copyValue(iDefaultValue);
            var result = this.setDefaultValue(iDefaultValue);
            return result;
        };
        /**
         * Get default value.
         * @private
         * @return {*} The data port default value.
         */
        DataPort.prototype.getDefaultValue = function () {
            var defaultValue = Tools.copyValue(this.defaultValue);
            if (this.dataPort !== undefined) {
                defaultValue = this.dataPort.getDefaultValue();
                var propertyList = this.name.split('.');
                while (defaultValue !== undefined && propertyList.length > 0) {
                    defaultValue = defaultValue[propertyList.shift()];
                }
            }
            return defaultValue;
        };
        /**
         * Is default value settable.
         * @private
         * @param {*} [iDefaultValue] - The data port default value.
         * @return {boolean} True if data port default value is settable, false otherwise.
         */
        DataPort.prototype.isDefaultValueSettable = function (iDefaultValue) {
            var result = !this.isFromInvalid();
            result = result && (!this.isFromTemplate() || (!this.block.isFromTemplate() && this.type === Enums.EDataPortType.eInput));
            result = result && (!this.block.isContainedGraph() || this.type === Enums.EDataPortType.eLocal);
            result = result && this.type !== Enums.EDataPortType.eOutput;
            var isValueType = TypeLibrary.isValueType(this.getGraphContext(), this.getValueType(), iDefaultValue);
            result = result && (isValueType || (this.invalidDefaultValue !== undefined && JSON.stringify(this.invalidDefaultValue) === JSON.stringify(iDefaultValue)));
            return result;
        };
        DataPort.prototype._setDefaultValue = function (iDefaultValue) {
            this.defaultValue = Tools.copyValue(iDefaultValue);
            if (this.block !== undefined) {
                var event_5 = new Events.DataPortDefaultValueChangeEvent();
                event_5.dataPort = this;
                event_5.index = this.getIndex();
                event_5.indexByType = this.getIndexByType();
                event_5.defaultValue = this.getDefaultValue();
                this.dispatchEvent(event_5);
            }
        };
        /**
         * Set default value.
         * @private
         * @param {*} iDefaultValue - The data port default value.
         * @return {boolean} True if the data port default value has been set, false otherwise.
         */
        DataPort.prototype.setDefaultValue = function (iDefaultValue) {
            var result = this.isDefaultValueSettable(iDefaultValue);
            if (result) {
                if (this.dataPort === undefined) {
                    this._setDefaultValue(iDefaultValue);
                    if (this.isValid()) {
                        this.setOverride(true);
                    }
                }
                else {
                    var currentValueType = this.dataPort.getValueType();
                    var rootDefaultValue = this.dataPort.getDefaultValue() || TypeLibrary.getDefaultValue(this.getGraphContext(), currentValueType);
                    var propertyList = this.name.split('.');
                    var currentDefaultValue = rootDefaultValue;
                    var property = void 0, currentTypeDesc = void 0;
                    while (propertyList.length > 1) {
                        property = propertyList.shift();
                        if (TypeLibrary.hasType(this.getGraphContext(), currentValueType, Enums.FTypeCategory.fObject)) {
                            currentTypeDesc = TypeLibrary.getType(this.getGraphContext(), currentValueType);
                        }
                        else if (TypeLibrary.hasType(this.getGraphContext(), currentValueType, Enums.FTypeCategory.fClass | Enums.FTypeCategory.fEvent)) {
                            currentTypeDesc = TypeLibrary.getType(this.getGraphContext(), currentValueType).descriptor;
                        }
                        currentValueType = currentTypeDesc[property].type;
                        if (currentDefaultValue[property] === undefined) {
                            currentDefaultValue[property] = TypeLibrary.getDefaultValue(this.getGraphContext(), currentValueType);
                        }
                        currentDefaultValue = currentDefaultValue[property];
                    }
                    currentDefaultValue[propertyList.shift()] = Tools.copyValue(iDefaultValue);
                    result = this.dataPort.setDefaultValue(rootDefaultValue);
                }
            }
            return result;
        };
        DataPort.prototype.setOverride = function (iOverride) {
            if (this.override !== iOverride) {
                this.override = iOverride;
                if (this.block !== undefined) {
                    var event_6 = new Events.DataPortOverrideChangeEvent();
                    event_6.dataPort = this;
                    event_6.index = this.getIndex();
                    event_6.indexByType = this.getIndexByType();
                    event_6.override = this.isOverride();
                    this.dispatchEvent(event_6);
                }
            }
        };
        /**
         * Is override.
         * @private
         * @return {boolean} True if data port is ovveriden, false otherwise.
         */
        DataPort.prototype.isOverride = function () {
            return this.override;
        };
        /**
         * Reset default value.
         * @private
         * @return {boolean} True if data port default value has been reset, false otherwise.
         */
        DataPort.prototype.resetDefaultValue = function () {
            var result = this.isOverride();
            result = result && this.isDefaultValueSettable();
            if (result) {
                this.setDefaultValue(this.getDefaultValueByType(this.getValueType()));
                this.setOverride(false);
            }
            return result;
        };
        /**
         * Is optional.
         * @private
         * @return {boolean} True if the data port is optional.
         */
        DataPort.prototype.isOptional = function () {
            return this.dataPort !== undefined ? this.dataPort.isOptional() : this.optional;
        };
        /**
         * Set optional.
         * @private
         * @param {boolean} iOptional - If the data port is optional.
         * @return {boolean} True if data port optional status has been set, false otherwise.
         */
        DataPort.prototype.setOptional = function (iOptional) {
            var result = typeof iOptional === 'boolean';
            result = result && this.optional === undefined;
            if (result) {
                this.optional = iOptional;
            }
            return result;
        };
        /**
         * Set max test values.
         * @private
         * @param {number} iMaxTestValues - The data port maximum test values.
         * @return {boolean} True if data port max values have been set, false otherwise.
         */
        DataPort.prototype.setMaxTestValues = function (iMaxTestValues) {
            var result = this.dataPort === undefined;
            result = result && this.getGraphContext() === this.block;
            result = result && this.type !== Enums.EDataPortType.eLocal;
            result = result && Polyfill.isInteger(iMaxTestValues);
            result = result && iMaxTestValues >= 0;
            if (iMaxTestValues > 1) {
                result = result && this.type === Enums.EDataPortType.eOutput;
            }
            if (result) {
                this.setTestValues([]);
                this.maxTestValues = iMaxTestValues;
            }
            return result;
        };
        /**
         * Get max test values.
         * @private
         * @return {number} The data port maximum test values.
         */
        DataPort.prototype.getMaxTestValues = function () {
            return this.maxTestValues;
        };
        /**
         * Get test values.
         * @private
         * @return {any[]} The data port test values.
         */
        DataPort.prototype.getTestValues = function () {
            var testValues = Tools.copyValue(this.testValues);
            if (this.dataPort !== undefined) {
                var propertyList_1 = this.name.split('.');
                testValues = this.dataPort.getTestValues().map(function (testValue) {
                    while (testValue !== undefined && propertyList_1.length > 0) {
                        testValue = testValue[propertyList_1.shift()];
                    }
                    return testValue;
                });
            }
            return testValues;
        };
        /**
         * Is test values settable.
         * @private
         * @param {*} [iTestValues] - The data port test values.
         * @return {boolean} True if data port test values are settable, false otherwise.
         */
        DataPort.prototype.isTestValuesSettable = function (iTestValues) {
            var _this = this;
            var result = this.dataPort === undefined;
            result = result && this.getGraphContext() === this.block;
            result = result && this.type !== Enums.EDataPortType.eLocal;
            result = result && this.maxTestValues > 0;
            if (iTestValues !== undefined) {
                result = result && Array.isArray(iTestValues);
                result = result && iTestValues.length <= this.maxTestValues;
                result = result && iTestValues.every(function (testValue) { return TypeLibrary.isValueType(_this.getGraphContext(), _this.getValueType(), testValue); });
            }
            return result;
        };
        /**
         * Set test values.
         * @private
         * @param {any[]} iTestValues - The data port test values.
         * @return {boolean} True if data port test values have been set, false otherwise.
         */
        DataPort.prototype.setTestValues = function (iTestValues) {
            var result = arguments.length === 1;
            result = result && this.isTestValuesSettable(iTestValues);
            if (result) {
                this.testValues = Tools.copyValue(iTestValues);
                if (this.block !== undefined) {
                    var event_7 = new Events.DataPortTestValuesChangeEvent();
                    event_7.dataPort = this;
                    event_7.index = this.getIndex();
                    event_7.indexByType = this.getIndexByType();
                    event_7.testValues = this.getTestValues();
                    this.dispatchEvent(event_7);
                }
            }
            return result;
        };
        /**
         * Get data links.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {DataLink[]} The data links.
         */
        DataPort.prototype.getDataLinks = function (iGraph) {
            var dataLinks;
            if (iGraph === undefined) {
                dataLinks = this.dataLinks.slice(0);
            }
            else {
                dataLinks = this.dataLinks.filter(function (iDataLink) { return iDataLink.graph === iGraph; });
            }
            return dataLinks;
        };
        /**
         * Unlink.
         * @private
         * @param {GraphBlock} [iGraph] - The graph block.
         * @return {boolean} True if data port has been unlinked, false otherwise.
         */
        DataPort.prototype.unlink = function (iGraph) {
            var result = true;
            var dataLinks = this.getDataLinks(iGraph);
            for (var dl = 0; dl < dataLinks.length; dl++) {
                result = dataLinks[dl].unlink() && result;
            }
            var dataPorts = this.getDataPorts();
            for (var dp = 0; dp < dataPorts.length; dp++) {
                result = dataPorts[dp].unlink() && result;
            }
            return result;
        };
        DataPort.prototype.getValueTypeDescriptor = function (iValueType) {
            var Type = TypeLibrary.getType(this.getGraphContext(), iValueType);
            var descriptor;
            if (TypeLibrary.hasType(this.getGraphContext(), iValueType, Enums.FTypeCategory.fObject)) {
                descriptor = Type;
            }
            else if (TypeLibrary.hasType(this.getGraphContext(), iValueType, Enums.FTypeCategory.fClass | Enums.FTypeCategory.fEvent)) {
                descriptor = Type.descriptor;
            }
            return descriptor;
        };
        DataPort.prototype.getValueTypeByPropertyPath = function (iPropertyPath) {
            var propertyList = iPropertyPath.split('.');
            var valueType = this.getValueType();
            while (valueType !== undefined && propertyList.length > 0) {
                var descriptor = this.getValueTypeDescriptor(valueType);
                valueType = undefined;
                var property = propertyList.shift();
                if (descriptor instanceof Object && descriptor.hasOwnProperty(property)) {
                    valueType = descriptor[property].type;
                }
            }
            return valueType;
        };
        /**
         * Is expandable.
         * @private
         * @return {boolean} True if data port is expandable, false otherwise.
         */
        DataPort.prototype.isExpandable = function () {
            var descriptor = this.getValueTypeDescriptor(this.getValueType());
            var result = true;
            if (this.block !== undefined) {
                result = result && !this.block.isFromTemplate();
            }
            result = result && descriptor instanceof Object;
            var parent = this.dataPort || this;
            var prefixName = this.dataPort !== undefined ? this.name + '.' : '';
            result = result && Object.keys(descriptor).some(function (propertyName) { return parent.getDataPortByName(prefixName + propertyName) === undefined; });
            return result;
        };
        /**
         * Expand.
         * @private
         * @return {boolean} True if the data port has been expanded, false otherwise.
         */
        DataPort.prototype.expand = function () {
            var result = this.isExpandable();
            if (result) {
                var descriptor = this.getValueTypeDescriptor(this.getValueType());
                var propertyNames = Object.keys(descriptor);
                var parent_1 = this.dataPort || this;
                var prefixName = this.dataPort !== undefined ? this.name + '.' : '';
                for (var pn = 0; pn < propertyNames.length; pn++) {
                    var propertyPath = prefixName + propertyNames[pn];
                    if (parent_1.getDataPortByName(propertyPath) === undefined) {
                        result = parent_1.createDataPort(propertyPath) && result;
                    }
                }
            }
            return result;
        };
        /**
         * Is collapsible.
         * @private
         * @return {boolean} True if data port is collapsible, false otherwise.
         */
        DataPort.prototype.isCollapsible = function () {
            var result = true;
            if (this.block !== undefined) {
                result = result && !this.block.isFromTemplate();
            }
            var dataPorts = this.dataPorts;
            if (this.dataPort !== undefined) {
                dataPorts = this.dataPort.searchDataPortByName(RegExp(this.name + '\\..*'));
            }
            result = result && dataPorts.length > 0;
            result = result && dataPorts.every(function (dataPort) { return dataPort.dataPort.isDataPortRemovable(dataPort); });
            return result;
        };
        /**
         * Collapse.
         * @private
         * @return {boolean} True if data port has been collapsed, false otherwise.
         */
        DataPort.prototype.collapse = function () {
            var result = this.isCollapsible();
            if (result) {
                var parent_2;
                var dataPorts = void 0;
                if (this.dataPort !== undefined) {
                    parent_2 = this.dataPort;
                    dataPorts = this.dataPort.searchDataPortByName(RegExp(this.name + '\\..*'));
                }
                else {
                    parent_2 = this;
                    dataPorts = this.getDataPorts();
                }
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    result = parent_2.removeDataPort(dataPorts[dp]) && result;
                }
            }
            return result;
        };
        /**
         * Update data ports.
         * @private
         * @param {string[]} iPropertyPaths - The data port property paths.
         * @return {boolean} True if the data ports have been updated, false otherwise.
         */
        DataPort.prototype.updateDataPorts = function (iPropertyPaths) {
            var result = true;
            if (this.block !== undefined) {
                result = result && !this.block.isFromTemplate();
            }
            result = result && Array.isArray(iPropertyPaths);
            result = result && iPropertyPaths.every(function (propertyPath) { return typeof propertyPath === 'string'; });
            if (result) {
                var parent_3;
                var prefixName = void 0;
                var dataPorts = void 0;
                if (this.dataPort !== undefined) {
                    parent_3 = this.dataPort;
                    prefixName = this.name + '.';
                    dataPorts = this.dataPort.searchDataPortByName(RegExp(this.name + '\\..*'));
                }
                else {
                    parent_3 = this;
                    prefixName = '';
                    dataPorts = this.getDataPorts();
                }
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    var dataPort = dataPorts[dp];
                    if (iPropertyPaths.indexOf(prefixName + dataPort.getName()) === -1) {
                        result = parent_3.removeDataPort(dataPort) && result;
                    }
                }
                for (var pp = 0; pp < iPropertyPaths.length; pp++) {
                    var propertyPath = prefixName + iPropertyPaths[pp];
                    if (parent_3.getDataPortByName(propertyPath) === undefined) {
                        result = parent_3.createDataPort(propertyPath) && result;
                    }
                }
            }
            return result;
        };
        /**
         * Create and add data port.
         * @private
         * @param {string} iPropertyPath - The data port property path.
         * @return {DataPort|undefined} The created data port.
         */
        DataPort.prototype.createDataPort = function (iPropertyPath) {
            var dataPort = new DataPort();
            var result = typeof iPropertyPath === 'string';
            result = result && iPropertyPath.length !== 0;
            result = result && dataPort.setType(this.type);
            result = result && dataPort.setName(iPropertyPath);
            var propertyValueType = this.getValueTypeByPropertyPath(iPropertyPath);
            result = result && propertyValueType !== undefined;
            dataPort.block = this.block;
            result = result && dataPort.setValueTypes([propertyValueType]);
            dataPort.block = undefined;
            result = result && this.addDataPort(dataPort);
            dataPort = result ? dataPort : undefined;
            return dataPort;
        };
        /**
         * Create and add invalid data port.
         * @private
         * @param {string} iPropertyPath - The data port property path.
         * @param {string} iValueType - The data port value type.
         * @param {number} iIndex - The data port index.
         * @return {DataPort|undefined} The created invalid data port.
         */
        DataPort.prototype.createInvalidDataPort = function (iPropertyPath, iValueType, iIndex) {
            var dataPort = new DataPort();
            dataPort.setType(this.getType());
            dataPort.setName(iPropertyPath);
            this.setInvalidValueType.call(dataPort, iValueType);
            this.invalidIndex = iIndex;
            var result = this.addDataPort(dataPort);
            dataPort = result ? dataPort : undefined;
            return dataPort;
        };
        /**
         * Is data port addable.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port is addable, false otherwise.
         */
        DataPort.prototype.isDataPortAddable = function (iDataPort) {
            var result = true;
            if (this.block !== undefined) {
                result = result && !this.block.isFromTemplate();
            }
            result = result && this.dataPort === undefined;
            result = result && iDataPort instanceof DataPort;
            result = result && iDataPort.name.length !== 0;
            result = result && iDataPort.type === this.type;
            var propertyValueType = iDataPort.isValid() ? this.getValueTypeByPropertyPath(iDataPort.name) : iDataPort.invalidValueType;
            result = result && propertyValueType !== undefined;
            result = result && iDataPort.refPort === undefined;
            result = result && iDataPort.getAllowedValueTypes().length === 1;
            result = result && iDataPort.defaultValues[propertyValueType] === undefined;
            result = result && iDataPort.valueType === propertyValueType;
            result = result && iDataPort.block === undefined;
            result = result && iDataPort.dataPort === undefined;
            result = result && this.dataPorts.indexOf(iDataPort) === -1;
            result = result && this.dataPortsByName[iDataPort.name] === undefined;
            return result;
        };
        DataPort.prototype.checkDataPortsOrder = function (iDataPort1, iDataPort2) {
            var result;
            var propertyList1 = iDataPort1.getName().split('.');
            var propertyList2 = iDataPort2.getName().split('.');
            var valueType = this.getValueType();
            while (valueType !== undefined && propertyList1.length > 0 && propertyList2.length > 0 && result === undefined) {
                var descriptor = this.getValueTypeDescriptor(valueType);
                valueType = undefined;
                var property1 = propertyList1.shift();
                var property2 = propertyList2.shift();
                if (property1 === property2) {
                    valueType = descriptor[property1].type;
                }
                else {
                    var propertyList = Object.keys(descriptor);
                    result = propertyList.indexOf(property1) < propertyList.indexOf(property2);
                }
            }
            result = result !== undefined ? result : propertyList1.length < propertyList2.length;
            return result;
        };
        DataPort.prototype.insertDataPort = function (iDataPort) {
            var index = 0;
            if (!iDataPort.isValid()) {
                index = this.invalidIndex;
            }
            else {
                for (var dp = this.dataPorts.length - 1; dp >= 0 && index === 0; dp--) {
                    if (this.dataPorts[dp].isValid() && this.checkDataPortsOrder(this.dataPorts[dp], iDataPort)) {
                        index = dp + 1;
                    }
                }
            }
            this.dataPorts.splice(index, 0, iDataPort);
        };
        /**
         * Add data port.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port has been added, false otherwise.
         */
        DataPort.prototype.addDataPort = function (iDataPort) {
            var result = this.isDataPortAddable(iDataPort);
            if (result) {
                this.insertDataPort(iDataPort);
                this.dataPortsByName[iDataPort.name] = iDataPort;
                iDataPort.onAdd(this.block, this);
                var event_8 = new Events.DataPortAddEvent();
                event_8.dataPort = iDataPort;
                event_8.index = iDataPort.getIndex();
                event_8.indexByType = iDataPort.getIndexByType();
                this.dispatchEvent(event_8);
            }
            return result;
        };
        /**
         * Is data port removable.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port is removable, false otherwise.
         */
        DataPort.prototype.isDataPortRemovable = function (iDataPort) {
            var result = true;
            if (this.block !== undefined) {
                result = result && !this.block.isFromTemplate();
            }
            result = result && iDataPort instanceof DataPort;
            result = result && iDataPort.dataPort === this;
            result = result && !iDataPort.isFromDefinition();
            result = result && this.dataPorts.indexOf(iDataPort) !== -1;
            result = result && this.dataPortsByName[iDataPort.name] === iDataPort;
            return result;
        };
        /**
         * Remove data port.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the data port has been removed, false otherwise.
         */
        DataPort.prototype.removeDataPort = function (iDataPort) {
            var result = this.isDataPortRemovable(iDataPort);
            if (result) {
                var index = iDataPort.getIndex();
                var indexByType = iDataPort.getIndexByType();
                iDataPort.onRemove();
                this.dataPorts.splice(index, 1);
                delete this.dataPortsByName[iDataPort.name];
                var event_9 = new Events.DataPortRemoveEvent();
                event_9.dataPort = iDataPort;
                event_9.index = index;
                event_9.indexByType = indexByType;
                this.dispatchEvent(event_9);
            }
            return result;
        };
        /**
         * Get data port by name.
         * @private
         * @param {string} iName - The data port name.
         * @return {DataPort} The data port.
         */
        DataPort.prototype.getDataPortByName = function (iName) {
            return this.dataPortsByName[iName];
        };
        /**
         * Search data port by name.
         * @private
         * @param {RegExp} iRegExpName - The RegExp.
         * @return {DataPort[]} The data port search results.
         */
        DataPort.prototype.searchDataPortByName = function (iRegExpName) {
            return this.dataPorts.filter(function (dataPort) { return iRegExpName.test(dataPort.getName()); });
        };
        /**
         * Get data ports.
         * @private
         * @return {DataPort[]} The data ports.
         */
        DataPort.prototype.getDataPorts = function () {
            return this.dataPorts.slice(0);
        };
        DataPort.pushObjectsByType = function (ioObjectsByType, iTypeName, iObject) {
            if (!ioObjectsByType.hasOwnProperty(iTypeName)) {
                ioObjectsByType[iTypeName] = [];
            }
            ioObjectsByType[iTypeName].push(iObject);
        };
        /**
         * Get objects by type.
         * @private
         * @param {IObjectsByType} [ioObjectsByType] - The objects by type.
         * @return {IObjectsByType} The objects by type.
         */
        DataPort.prototype.getObjectsByType = function (ioObjectsByType) {
            ioObjectsByType = ioObjectsByType || {};
            var typeName = this.getValueType();
            DataPort.pushObjectsByType(ioObjectsByType, typeName, this);
            for (var dp = 0; dp < this.dataPorts.length; dp++) {
                var dataPort = this.dataPorts[dp];
                typeName = dataPort.getValueType();
                DataPort.pushObjectsByType(ioObjectsByType, typeName, dataPort);
            }
            return ioObjectsByType;
        };
        return DataPort;
    }());
    return DataPort;
});
