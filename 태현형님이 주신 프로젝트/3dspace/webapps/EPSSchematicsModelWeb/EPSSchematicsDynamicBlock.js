/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPort", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsPolyfill", "DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules", "DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, Block, ControlPort, DataPort, TypeLibrary, Tools, Polyfill, ValueTypeRules, DataPortDefinitions, ControlPortDefinitions, EventPortDefinitions, SettingDefinitions, Enums) {
    "use strict";
    var DynamicBlock = /** @class */ (function (_super) {
        __extends(DynamicBlock, _super);
        /**
         * @constructor
         */
        function DynamicBlock() {
            var _this = _super.call(this) || this;
            _this.dataPortRules = [];
            _this.dataPortRules[Enums.EDataPortType.eInput] = new DataPortRules();
            _this.dataPortRules[Enums.EDataPortType.eInput].type = Enums.EDataPortType.eInput;
            _this.dataPortRules[Enums.EDataPortType.eInput].block = _this;
            _this.dataPortRules[Enums.EDataPortType.eOutput] = new DataPortRules();
            _this.dataPortRules[Enums.EDataPortType.eOutput].type = Enums.EDataPortType.eOutput;
            _this.dataPortRules[Enums.EDataPortType.eOutput].block = _this;
            _this.dataPortRules[Enums.EDataPortType.eLocal] = new DataPortRules();
            _this.dataPortRules[Enums.EDataPortType.eLocal].type = Enums.EDataPortType.eLocal;
            _this.dataPortRules[Enums.EDataPortType.eLocal].block = _this;
            _this.controlPortRules = [];
            _this.controlPortRules[Enums.EControlPortType.eInput] = new ControlPortRules();
            _this.controlPortRules[Enums.EControlPortType.eInput].type = Enums.EControlPortType.eInput;
            _this.controlPortRules[Enums.EControlPortType.eInput].block = _this;
            _this.controlPortRules[Enums.EControlPortType.eOutput] = new ControlPortRules();
            _this.controlPortRules[Enums.EControlPortType.eOutput].type = Enums.EControlPortType.eOutput;
            _this.controlPortRules[Enums.EControlPortType.eOutput].block = _this;
            _this.controlPortRules[Enums.EControlPortType.eInputEvent] = new EventPortRules();
            _this.controlPortRules[Enums.EControlPortType.eInputEvent].type = Enums.EControlPortType.eInputEvent;
            _this.controlPortRules[Enums.EControlPortType.eInputEvent].block = _this;
            _this.controlPortRules[Enums.EControlPortType.eOutputEvent] = new EventPortRules();
            _this.controlPortRules[Enums.EControlPortType.eOutputEvent].type = Enums.EControlPortType.eOutputEvent;
            _this.controlPortRules[Enums.EControlPortType.eOutputEvent].block = _this;
            _this.settingRules = new SettingRules();
            _this.settingRules.block = _this;
            _this.setDataPortInputRules({
                name: { prefix: 'DataIn', readonly: false },
                valueTypes: new ValueTypeRules.All('Double', {
                    'Boolean': false,
                    'Double': 0.0,
                    'Integer': 0,
                    'String': ''
                }),
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            _this.setDataPortOutputRules({
                name: { prefix: 'DataOut', readonly: false },
                valueTypes: new ValueTypeRules.All('Double'),
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            _this._setDataPortLocalRules();
            _this.setControlPortInputRules({
                name: { prefix: 'ControlIn', readonly: false },
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            _this.setControlPortOutputRules({
                name: { prefix: 'ControlOut', readonly: false },
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            _this.setEventPortInputRules({
                name: { prefix: 'EventIn', readonly: false },
                valueTypes: new ValueTypeRules.Category(Enums.FTypeCategory.fEvent, 'Event'),
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            _this.setEventPortOutputRules({
                name: { prefix: 'EventOut', readonly: false },
                valueTypes: new ValueTypeRules.Category(Enums.FTypeCategory.fEvent, 'Event'),
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            _this.setSettingRules({
                name: { prefix: 'Setting', readonly: false },
                valueTypes: new ValueTypeRules.All('Double', {
                    'Boolean': false,
                    'Double': 0.0,
                    'Integer': 0,
                    'String': ''
                }),
                dynamicCount: Polyfill.MAX_SAFE_INTEGER
            });
            return _this;
        }
        DynamicBlock.prototype.dataPortsFromJSON = function (iJSONDynamicBlock) {
            var isControlDynamicCount = function (iDynamicCount) { return iDynamicCount.ctor === ControlPort; };
            var dp = 0;
            while (dp < iJSONDynamicBlock.dataPorts.length || dp < this.dataPorts.length) {
                var dataPort = this.dataPorts[dp];
                var jsonDataPort = iJSONDynamicBlock.dataPorts[dp];
                var portType = jsonDataPort !== undefined ? jsonDataPort.portType : dataPort.getType();
                var dataPortRules = this.dataPortRules[portType];
                var refDynamicCount = dataPortRules.getRefDynamicCount();
                if (dataPort !== undefined && (jsonDataPort === undefined || dataPort.getType() !== portType)) {
                    var result = void 0;
                    if (refDynamicCount === undefined) {
                        var listControlDynamicCount = dataPortRules.listDynamicCount.filter(isControlDynamicCount);
                        if (listControlDynamicCount.length === 1) {
                            this.controlPortsFromJSON(iJSONDynamicBlock, listControlDynamicCount[0].type);
                        }
                        result = this.removeDataPort(dataPort);
                    }
                    else {
                        this.controlPortsFromJSON(iJSONDynamicBlock, refDynamicCount.type);
                    }
                    if (result) {
                        continue;
                    }
                }
                else {
                    if (dataPort === undefined) {
                        if (refDynamicCount === undefined) {
                            var listControlDynamicCount = dataPortRules.listDynamicCount.filter(isControlDynamicCount);
                            if (listControlDynamicCount.length === 1) {
                                this.controlPortsFromJSON(iJSONDynamicBlock, listControlDynamicCount[0].type);
                            }
                            this.createDynamicDataPort(portType);
                        }
                        else {
                            this.controlPortsFromJSON(iJSONDynamicBlock, refDynamicCount.type);
                        }
                    }
                }
                dp++;
            }
        };
        DynamicBlock.prototype.controlPortsFromJSON = function (iJSONDynamicBlock, iPortType) {
            var cp = 0;
            while (cp < iJSONDynamicBlock.controlPorts.length || cp < this.controlPorts.length) {
                var controlPort = this.controlPorts[cp];
                var jsonControlPort = iJSONDynamicBlock.controlPorts[cp];
                var portType = jsonControlPort !== undefined ? jsonControlPort.portType : controlPort.getType();
                if (controlPort !== undefined && (jsonControlPort === undefined || controlPort.getType() !== portType)) {
                    var result = this.removeControlPort(controlPort);
                    if (portType === iPortType) {
                        break;
                    }
                    if (result) {
                        continue;
                    }
                }
                else {
                    if (controlPort === undefined) {
                        this.createDynamicControlPort(portType);
                        if (portType === iPortType) {
                            break;
                        }
                    }
                }
                cp++;
            }
        };
        DynamicBlock.prototype.settingsFromJSON = function (iJSONDynamicBlock) {
            var s = 0;
            while (s < iJSONDynamicBlock.settings.length || s < this.settings.length) {
                if (iJSONDynamicBlock.settings[s] === undefined) {
                    var result = this.removeSetting(this.settings[s]);
                    if (result) {
                        continue;
                    }
                }
                else {
                    if (this.settings[s] === undefined) {
                        this.createDynamicSetting();
                    }
                }
                s++;
            }
        };
        /**
         * Construct block from JSON.
         * @private
         * @param {IJSONBlock} iJSONDynamicBlock - The JSON block.
         */
        DynamicBlock.prototype.fromJSON = function (iJSONDynamicBlock) {
            this.dataPortsFromJSON(iJSONDynamicBlock);
            this.controlPortsFromJSON(iJSONDynamicBlock);
            this.settingsFromJSON(iJSONDynamicBlock);
            _super.prototype.fromJSON.call(this, iJSONDynamicBlock);
        };
        /**
         * Set data port input rules.
         * @private
         * @param {IDataPortRules} iDataPortRules - The data port rules.
         * @return {boolean} True if the data port input rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setDataPortInputRules = function (iDataPortRules) {
            var result = iDataPortRules instanceof Object;
            var dataPortRules = this.dataPortRules[Enums.EDataPortType.eInput];
            if (iDataPortRules.name instanceof Object) {
                if (iDataPortRules.name.hasOwnProperty('prefix')) {
                    result = result && dataPortRules.setName(iDataPortRules.name.prefix);
                }
                if (iDataPortRules.name.readonly) {
                    result = result && dataPortRules.setNameReadonly();
                }
            }
            if (iDataPortRules.valueTypes instanceof Object) {
                var typesWithoutRef = [ValueTypeRules.Basic, ValueTypeRules.List, ValueTypeRules.Category, ValueTypeRules.All, ValueTypeRules.Advanced];
                if (iDataPortRules.valueTypes instanceof ValueTypeRules.Ref) {
                    if (iDataPortRules.valueTypes.defaultValues !== undefined) {
                        result = result && dataPortRules.setDefaultValues(iDataPortRules.valueTypes.defaultValues);
                    }
                    result = result && dataPortRules.setRef(iDataPortRules.valueTypes.refPort);
                }
                else if (iDataPortRules.valueTypes instanceof ValueTypeRules.RefArrayValue) {
                    if (iDataPortRules.valueTypes.defaultValues !== undefined) {
                        result = result && dataPortRules.setDefaultValues(iDataPortRules.valueTypes.defaultValues);
                    }
                    result = result && dataPortRules.setRefArrayValue(iDataPortRules.valueTypes.refPort);
                }
                else if (iDataPortRules.valueTypes instanceof ValueTypeRules.RefIndex) {
                    if (iDataPortRules.valueTypes.defaultValues !== undefined) {
                        result = result && dataPortRules.setDefaultValues(iDataPortRules.valueTypes.defaultValues);
                    }
                    result = result && dataPortRules.setRefIndex();
                }
                else if (typesWithoutRef.some(function (vt) { return iDataPortRules.valueTypes instanceof vt; })) {
                    if (iDataPortRules.valueTypes.defaultValues !== undefined) {
                        result = result && dataPortRules.setDefaultValues(iDataPortRules.valueTypes.defaultValues);
                    }
                    result = result && dataPortRules.setValueTypes(iDataPortRules.valueTypes.valueTypes);
                    result = result && dataPortRules.setTypeCategory(iDataPortRules.valueTypes.typeCategory);
                    if (iDataPortRules.valueTypes.valueType !== undefined) {
                        result = result && dataPortRules.setValueType(iDataPortRules.valueTypes.valueType);
                    }
                }
            }
            if (typeof iDataPortRules.dynamicCount === 'number') {
                result = result && dataPortRules.setMaxDynamicCount(iDataPortRules.dynamicCount);
            }
            else if (iDataPortRules.dynamicCount instanceof Object) {
                result = result && dataPortRules.setRefDynamicCount(iDataPortRules.dynamicCount);
            }
            return result;
        };
        /**
         * Set data port output rules.
         * @private
         * @param {IDataPortRules} iDataPortRules - The data port rules.
         * @return {boolean} True if the data port output rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setDataPortOutputRules = function (iDataPortRules) {
            var result = iDataPortRules instanceof Object;
            var dataPortRules = this.dataPortRules[Enums.EDataPortType.eOutput];
            if (iDataPortRules.name instanceof Object) {
                if (iDataPortRules.name.hasOwnProperty('prefix')) {
                    result = result && dataPortRules.setName(iDataPortRules.name.prefix);
                }
                if (iDataPortRules.name.readonly) {
                    result = result && dataPortRules.setNameReadonly();
                }
            }
            if (iDataPortRules.valueTypes instanceof Object) {
                if (iDataPortRules.valueTypes instanceof ValueTypeRules.Ref) {
                    result = result && dataPortRules.setRef(iDataPortRules.valueTypes.refPort);
                }
                else if (iDataPortRules.valueTypes instanceof ValueTypeRules.RefArrayValue) {
                    result = result && dataPortRules.setRefArrayValue(iDataPortRules.valueTypes.refPort);
                }
                else if (iDataPortRules.valueTypes instanceof ValueTypeRules.RefIndex) {
                    result = result && dataPortRules.setRefIndex();
                }
                else if (iDataPortRules.valueTypes instanceof ValueTypeRules.Basic ||
                    iDataPortRules.valueTypes instanceof ValueTypeRules.List ||
                    iDataPortRules.valueTypes instanceof ValueTypeRules.Category ||
                    iDataPortRules.valueTypes instanceof ValueTypeRules.All ||
                    iDataPortRules.valueTypes instanceof ValueTypeRules.Advanced) {
                    result = result && dataPortRules.setValueTypes(iDataPortRules.valueTypes.valueTypes);
                    result = result && dataPortRules.setTypeCategory(iDataPortRules.valueTypes.typeCategory);
                    if (iDataPortRules.valueTypes.valueType !== undefined) {
                        result = result && dataPortRules.setValueType(iDataPortRules.valueTypes.valueType);
                    }
                }
            }
            if (typeof iDataPortRules.dynamicCount === 'number') {
                result = result && dataPortRules.setMaxDynamicCount(iDataPortRules.dynamicCount);
            }
            else if (iDataPortRules.dynamicCount instanceof Object) {
                result = result && dataPortRules.setRefDynamicCount(iDataPortRules.dynamicCount);
            }
            return result;
        };
        /**
         * Set data port local rules.
         * @private
         * @param {ILocalDataPortRules} iDataPortRules - The data port rules.
         * @return {boolean} True if the data port local rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setDataPortLocalRules = function (iDataPortRules) {
            var result = iDataPortRules instanceof Object;
            var dataPortRules = this.dataPortRules[Enums.EDataPortType.eLocal];
            if (typeof iDataPortRules.dynamicCount === 'number') {
                result = result && dataPortRules.setMaxDynamicCount(iDataPortRules.dynamicCount);
            }
            return result;
        };
        DynamicBlock.prototype._setDataPortLocalRules = function () {
            var dataPortRules = this.dataPortRules[Enums.EDataPortType.eLocal];
            dataPortRules.setName('DataLocal');
            dataPortRules.setDefaultValues({
                'Boolean': false,
                'Double': 0.0,
                'Integer': 0,
                'String': ''
            });
            dataPortRules.setTypeCategory(Enums.FTypeCategory.fAll);
            dataPortRules.setValueTypes([]);
            dataPortRules.setValueType('Double');
            dataPortRules.setMaxDynamicCount(Polyfill.MAX_SAFE_INTEGER);
        };
        /**
         * Set control port input rules.
         * @private
         * @param {IControlPortRules} iControlPortRules - The control port rules.
         * @return {boolean} True if the control port input rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setControlPortInputRules = function (iControlPortRules) {
            var result = iControlPortRules instanceof Object;
            var controlPortRules = this.controlPortRules[Enums.EControlPortType.eInput];
            if (iControlPortRules.name instanceof Object) {
                if (iControlPortRules.name.hasOwnProperty('prefix')) {
                    result = result && controlPortRules.setName(iControlPortRules.name.prefix);
                }
                if (iControlPortRules.name.readonly) {
                    result = result && controlPortRules.setNameReadonly();
                }
            }
            if (typeof iControlPortRules.dynamicCount === 'number') {
                result = result && controlPortRules.setMaxDynamicCount(iControlPortRules.dynamicCount);
            }
            else if (iControlPortRules.dynamicCount instanceof Object) {
                result = result && controlPortRules.setRefDynamicCount(iControlPortRules.dynamicCount);
            }
            return result;
        };
        /**
         * Set control port output rules.
         *
         * @private
         * @param {IControlPortRules} iControlPortRules - The control port rules.
         * @return {boolean} True if the control port output rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setControlPortOutputRules = function (iControlPortRules) {
            var result = iControlPortRules instanceof Object;
            var controlPortRules = this.controlPortRules[Enums.EControlPortType.eOutput];
            if (iControlPortRules.name instanceof Object) {
                if (iControlPortRules.name.hasOwnProperty('prefix')) {
                    result = result && controlPortRules.setName(iControlPortRules.name.prefix);
                }
                if (iControlPortRules.name.readonly) {
                    result = result && controlPortRules.setNameReadonly();
                }
            }
            if (typeof iControlPortRules.dynamicCount === 'number') {
                result = result && controlPortRules.setMaxDynamicCount(iControlPortRules.dynamicCount);
            }
            else if (iControlPortRules.dynamicCount instanceof Object) {
                result = result && controlPortRules.setRefDynamicCount(iControlPortRules.dynamicCount);
            }
            return result;
        };
        /**
         * Set event port input rules.
         * @private
         * @param {IEventPortRules} iEventPortRules - The event port rules.
         * @return {boolean} True if the event port input rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setEventPortInputRules = function (iEventPortRules) {
            var result = iEventPortRules instanceof Object;
            var eventPortRules = this.controlPortRules[Enums.EControlPortType.eInputEvent];
            if (iEventPortRules.name instanceof Object) {
                if (iEventPortRules.name.hasOwnProperty('prefix')) {
                    result = result && eventPortRules.setName(iEventPortRules.name.prefix);
                }
                if (iEventPortRules.name.readonly) {
                    result = result && eventPortRules.setNameReadonly();
                }
            }
            if (iEventPortRules.valueTypes instanceof Object) {
                if (iEventPortRules.valueTypes instanceof ValueTypeRules.Basic ||
                    iEventPortRules.valueTypes instanceof ValueTypeRules.List ||
                    iEventPortRules.valueTypes instanceof ValueTypeRules.Category) {
                    result = result && eventPortRules.setEventTypes(iEventPortRules.valueTypes.valueTypes);
                    result = result && eventPortRules.setTypeCategory(iEventPortRules.valueTypes.typeCategory);
                    if (iEventPortRules.valueTypes.valueType !== undefined) {
                        result = result && eventPortRules.setEventType(iEventPortRules.valueTypes.valueType);
                    }
                }
            }
            if (typeof iEventPortRules.dynamicCount === 'number') {
                result = result && eventPortRules.setMaxDynamicCount(iEventPortRules.dynamicCount);
            }
            else if (iEventPortRules.dynamicCount instanceof Object) {
                result = result && eventPortRules.setRefDynamicCount(iEventPortRules.dynamicCount);
            }
            return result;
        };
        /**
         * Set event port output rules.
         * @private
         * @param {IEventPortRules} iEventPortRules - The event port rules.
         * @return {boolean} True if the event port output rules have been set, false otherwise.
         */
        DynamicBlock.prototype.setEventPortOutputRules = function (iEventPortRules) {
            var result = iEventPortRules instanceof Object;
            var eventPortRules = this.controlPortRules[Enums.EControlPortType.eOutputEvent];
            if (iEventPortRules.name instanceof Object) {
                if (iEventPortRules.name.hasOwnProperty('prefix')) {
                    result = result && eventPortRules.setName(iEventPortRules.name.prefix);
                }
                if (iEventPortRules.name.readonly) {
                    result = result && eventPortRules.setNameReadonly();
                }
            }
            if (iEventPortRules.valueTypes instanceof Object) {
                if (iEventPortRules.valueTypes instanceof ValueTypeRules.Basic ||
                    iEventPortRules.valueTypes instanceof ValueTypeRules.List ||
                    iEventPortRules.valueTypes instanceof ValueTypeRules.Category) {
                    result = result && eventPortRules.setEventTypes(iEventPortRules.valueTypes.valueTypes);
                    result = result && eventPortRules.setTypeCategory(iEventPortRules.valueTypes.typeCategory);
                    if (iEventPortRules.valueTypes.valueType !== undefined) {
                        result = result && eventPortRules.setEventType(iEventPortRules.valueTypes.valueType);
                    }
                }
            }
            if (typeof iEventPortRules.dynamicCount === 'number') {
                result = result && eventPortRules.setMaxDynamicCount(iEventPortRules.dynamicCount);
            }
            else if (iEventPortRules.dynamicCount instanceof Object) {
                result = result && eventPortRules.setRefDynamicCount(iEventPortRules.dynamicCount);
            }
            return result;
        };
        /**
         * Set setting rules.
         * @private
         * @param {ISettingRules} iSettingRules - The setting rules.
         * @return {boolean} True if the setting rules has been set, false otherwise.
         */
        DynamicBlock.prototype.setSettingRules = function (iSettingRules) {
            var result = iSettingRules instanceof Object;
            var settingRules = this.settingRules;
            if (iSettingRules.name instanceof Object) {
                if (iSettingRules.name.hasOwnProperty('prefix')) {
                    result = result && settingRules.setName(iSettingRules.name.prefix);
                }
                if (iSettingRules.name.readonly) {
                    result = result && settingRules.setNameReadonly();
                }
            }
            if (iSettingRules.valueTypes instanceof Object) {
                if (iSettingRules.valueTypes instanceof ValueTypeRules.Basic ||
                    iSettingRules.valueTypes instanceof ValueTypeRules.List ||
                    iSettingRules.valueTypes instanceof ValueTypeRules.Category ||
                    iSettingRules.valueTypes instanceof ValueTypeRules.All ||
                    iSettingRules.valueTypes instanceof ValueTypeRules.Advanced) {
                    if (iSettingRules.valueTypes.defaultValues !== undefined) {
                        result = result && settingRules.setDefaultValues(iSettingRules.valueTypes.defaultValues);
                    }
                    result = result && settingRules.setValueTypes(iSettingRules.valueTypes.valueTypes);
                    result = result && settingRules.setTypeCategory(iSettingRules.valueTypes.typeCategory);
                    if (iSettingRules.valueTypes.valueType !== undefined) {
                        result = result && settingRules.setValueType(iSettingRules.valueTypes.valueType);
                    }
                }
            }
            if (typeof iSettingRules.dynamicCount === 'number') {
                result = result && this.settingRules.setMaxDynamicCount(iSettingRules.dynamicCount);
            }
            return result;
        };
        /**
         * Create and add dynamic data port.
         * @private
         * @param {EP.EDataPortType} iType - The data port type.
         * @param {string} [iName] - The name of the data port.
         * @return {DataPort|undefined} The created data port.
         */
        DynamicBlock.prototype.createDynamicDataPort = function (iType, iName) {
            var dataPortDefinition;
            var dataPortRules = this.dataPortRules[iType];
            if (this.hasDefinition() && dataPortRules !== undefined) {
                var name_1 = iName;
                if (name_1 === undefined || dataPortRules.nameReadonly) {
                    name_1 = dataPortRules.getNewName();
                }
                var defaultValues = dataPortRules.defaultValues;
                if (dataPortRules.refType !== undefined) {
                    var refPort = dataPortRules.refPort;
                    if (dataPortRules.refType === ERefType.eArrayValue) {
                        switch (iType) {
                            case Enums.EDataPortType.eInput:
                                {
                                    dataPortDefinition = new DataPortDefinitions.InputRefArrayValue(name_1, refPort, defaultValues);
                                    break;
                                }
                            case Enums.EDataPortType.eOutput:
                                {
                                    dataPortDefinition = new DataPortDefinitions.OutputRefArrayValue(name_1, refPort);
                                    break;
                                }
                        }
                    }
                    else {
                        if (dataPortRules.refType === ERefType.eIndex) {
                            refPort = this.getDataPorts().pop();
                        }
                        switch (iType) {
                            case Enums.EDataPortType.eInput:
                                {
                                    dataPortDefinition = new DataPortDefinitions.InputRef(name_1, refPort, defaultValues);
                                    break;
                                }
                            case Enums.EDataPortType.eOutput:
                                {
                                    dataPortDefinition = new DataPortDefinitions.OutputRef(name_1, refPort);
                                    break;
                                }
                        }
                    }
                }
                else {
                    var typeCategory = dataPortRules.typeCategory;
                    var valueTypes = dataPortRules.valueTypes;
                    var valueType = dataPortRules.valueType;
                    switch (iType) {
                        case Enums.EDataPortType.eInput:
                            {
                                dataPortDefinition = new DataPortDefinitions.InputAdvanced(name_1, typeCategory, valueTypes, valueType, defaultValues);
                                break;
                            }
                        case Enums.EDataPortType.eOutput:
                            {
                                dataPortDefinition = new DataPortDefinitions.OutputAdvanced(name_1, typeCategory, valueTypes, valueType);
                                break;
                            }
                        case Enums.EDataPortType.eLocal:
                            {
                                dataPortDefinition = new DataPortDefinitions.LocalAdvanced(name_1, typeCategory, valueTypes, valueType, defaultValues);
                                break;
                            }
                    }
                }
            }
            return this.createDataPort(dataPortDefinition);
        };
        /**
         * Is data port type addable.
         * @private
         * @param {EP.EDataPortType} iType - The data port type.
         * @return {boolean} True if data port type is addable, false otherwise.
         */
        DynamicBlock.prototype.isDataPortTypeAddable = function (iType) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && Object.keys(Enums.EDataPortType).some(function (key) { return Enums.EDataPortType[key] === iType; });
            var definition = this.getDefinition();
            if (definition !== undefined) {
                var definitionDataPorts = definition.getDataPorts(iType);
                var maxDynamicCount = this.dataPortRules[iType].getMaxDynamicCount();
                var dataPorts = this.getDataPorts(iType);
                result = result && definitionDataPorts.length + maxDynamicCount > dataPorts.length;
            }
            var dynamicCount = this.dataPortRules[iType].getDynamicCount();
            if (dynamicCount !== undefined) {
                var dynamicDataPorts = this.getDynamicDataPorts(iType);
                result = result && dynamicDataPorts.length + 1 === dynamicCount;
            }
            return result;
        };
        /**
         * Is data port addable.
         * @private
         * @param {DataPort} iDataPort - The data port to check.
         * @return {boolean} True if the data port is addable, false otherwise.
         */
        DynamicBlock.prototype.isDataPortAddable = function (iDataPort) {
            var result = _super.prototype.isDataPortAddable.call(this, iDataPort);
            if (result) {
                var isFromDefinition = _super.prototype.isDataPortTypeAddable.call(this, iDataPort.type);
                if (!isFromDefinition) {
                    result = this.dataPortRules[iDataPort.type].isValid(iDataPort);
                }
            }
            return result;
        };
        /**
         * Add data port.
         * @private
         * @param {DataPort} iDataPort - The data port to add.
         * @return {boolean} True if the data port was added, false otherwise.
         */
        DynamicBlock.prototype.addDataPort = function (iDataPort) {
            var dataPortRules = this.dataPortRules[iDataPort.type];
            var result = _super.prototype.addDataPort.call(this, iDataPort);
            if (result && dataPortRules.listDynamicCount.length > 0) {
                for (var dc = 0; dc < dataPortRules.listDynamicCount.length && result; dc++) {
                    var dynamicCount = dataPortRules.listDynamicCount[dc];
                    if (dynamicCount.ctor === DataPort) {
                        result = this.createDynamicDataPort(dynamicCount.type) !== undefined;
                    }
                    else if (dynamicCount.ctor === ControlPort) {
                        result = this.createDynamicControlPort(dynamicCount.type) !== undefined;
                    }
                }
            }
            return result;
        };
        /**
         * Is data port removable.
         * @private
         * @param {DataPort} iDataPort - The data port to check.
         * @return {boolean} True if the data port is removable, false otherwise.
         */
        DynamicBlock.prototype.isDataPortRemovable = function (iDataPort) {
            var result = _super.prototype.isDataPortRemovable.call(this, iDataPort);
            result = result && !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (result) {
                var dynamicCount = this.dataPortRules[iDataPort.type].getDynamicCount();
                if (dynamicCount !== undefined) {
                    var dynamicDataPorts = this.getDynamicDataPorts(iDataPort.type);
                    result = dynamicDataPorts.length - 1 === dynamicCount;
                }
            }
            return result;
        };
        /**
         * Remove data port.
         * @private
         * @param {DataPort} iDataPort - The data port to remove.
         * @return {boolean} True if the data port was removed, false otherwise.
         */
        DynamicBlock.prototype.removeDataPort = function (iDataPort) {
            var dynamicIndex;
            var dataPortRules;
            var dynamicDataPorts;
            if (iDataPort instanceof DataPort) {
                dynamicDataPorts = this.getDynamicDataPorts(iDataPort.type);
                dynamicIndex = dynamicDataPorts.indexOf(iDataPort);
                dataPortRules = this.dataPortRules[iDataPort.type];
            }
            var result = _super.prototype.removeDataPort.call(this, iDataPort);
            if (result && dynamicIndex !== -1) {
                for (var dc = 0; dc < dataPortRules.listDynamicCount.length && result; dc++) {
                    var dynamicCount = dataPortRules.listDynamicCount[dc];
                    if (dynamicCount.ctor === DataPort) {
                        dynamicDataPorts = this.getDynamicDataPorts(dynamicCount.type);
                        var dynamicDataPort = dynamicDataPorts[dynamicIndex];
                        result = this.removeDataPort(dynamicDataPort);
                    }
                    else if (dynamicCount.ctor === ControlPort) {
                        var dynamicControlPorts = this.getDynamicControlPorts(dynamicCount.type);
                        var dynamicControlPort = dynamicControlPorts[dynamicIndex];
                        result = this.removeControlPort(dynamicControlPort);
                    }
                }
            }
            return result;
        };
        /**
         * Get dynamic data ports.
         * @private
         * @param {EP.EDataPortType} [iType] - The data port type.
         * @return {DataPort[]} The dynamic data ports.
         */
        DynamicBlock.prototype.getDynamicDataPorts = function (iType) {
            var dynamicDataPorts = this.dataPorts.filter(function (iDataPort) {
                var result = iType === undefined || iDataPort.type === iType;
                result = result && !iDataPort.isFromDefinition();
                return result;
            });
            return dynamicDataPorts;
        };
        /**
         * Clear dynamic data ports.
         * @private
         * @return {boolean} True if all dynamic ports were cleared, false otherwise.
         */
        DynamicBlock.prototype.clearDynamicDataPorts = function () {
            var dynamicDataPorts = this.getDynamicDataPorts();
            var result = dynamicDataPorts.length > 0;
            for (var ddp = 0; ddp < dynamicDataPorts.length; ddp++) {
                result = this.removeDataPort(dynamicDataPorts[ddp]) && result;
            }
            return result;
        };
        /**
         * Create and add dynamic control port.
         * @private
         * @param {EP.EControlPortType} iType - The control port type.
         * @param {string} [iName] - The name of the control port.
         * @return {ControlPort|undefined} The created control port.
         */
        DynamicBlock.prototype.createDynamicControlPort = function (iType, iName) {
            var controlPortDefinition;
            var controlPortRules = this.controlPortRules[iType];
            if (this.hasDefinition() && controlPortRules !== undefined) {
                var name_2 = iName;
                if (name_2 === undefined || controlPortRules.nameReadonly) {
                    name_2 = controlPortRules.getNewName();
                }
                if (iType === Enums.EControlPortType.eInput) {
                    controlPortDefinition = new ControlPortDefinitions.Input(name_2);
                }
                else if (iType === Enums.EControlPortType.eOutput) {
                    controlPortDefinition = new ControlPortDefinitions.Output(name_2);
                }
                else if (controlPortRules.typeCategory === Enums.FTypeCategory.fEvent) {
                    switch (iType) {
                        case Enums.EControlPortType.eInputEvent:
                            {
                                controlPortDefinition = new EventPortDefinitions.InputAll(name_2, controlPortRules.eventType);
                                break;
                            }
                        case Enums.EControlPortType.eOutputEvent:
                            {
                                controlPortDefinition = new EventPortDefinitions.OutputAll(name_2, controlPortRules.eventType);
                                break;
                            }
                    }
                }
                else {
                    switch (iType) {
                        case Enums.EControlPortType.eInputEvent:
                            {
                                controlPortDefinition = new EventPortDefinitions.InputList(name_2, controlPortRules.eventTypes, controlPortRules.eventType);
                                break;
                            }
                        case Enums.EControlPortType.eOutputEvent:
                            {
                                controlPortDefinition = new EventPortDefinitions.OutputList(name_2, controlPortRules.eventTypes, controlPortRules.eventType);
                                break;
                            }
                    }
                }
            }
            return this.createControlPort(controlPortDefinition);
        };
        /**
         * Is control port type addable.
         * @private
         * @param {EP.EControlPortType} iType - The control port type.
         * @return {boolean} true if control port type is addable, false otherwise.
         */
        DynamicBlock.prototype.isControlPortTypeAddable = function (iType) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && Object.keys(Enums.EControlPortType).some(function (key) { return Enums.EControlPortType[key] === iType; });
            var definition = this.getDefinition();
            if (definition !== undefined) {
                var definitionControlPorts = definition.getControlPorts(iType);
                var maxDynamicCount = this.controlPortRules[iType].getMaxDynamicCount();
                var controlPorts = this.getControlPorts(iType);
                result = result && definitionControlPorts.length + maxDynamicCount > controlPorts.length;
            }
            var dynamicCount = this.controlPortRules[iType].getDynamicCount();
            if (dynamicCount !== undefined) {
                var dynamicControlPorts = this.getDynamicControlPorts(iType);
                result = result && dynamicControlPorts.length + 1 === dynamicCount;
            }
            return result;
        };
        /**
         * Is control port addable.
         * @private
         * @param {ControlPort} iControlPort - The control port to check.
         * @return {boolean} True if the control port is addable, false otherwise.
         */
        DynamicBlock.prototype.isControlPortAddable = function (iControlPort) {
            var result = _super.prototype.isControlPortAddable.call(this, iControlPort);
            if (result) {
                var isFromDefinition = _super.prototype.isControlPortTypeAddable.call(this, iControlPort.type);
                if (!isFromDefinition) {
                    result = this.controlPortRules[iControlPort.type].isValid(iControlPort);
                }
            }
            return result;
        };
        /**
         * Add control port.
         * @private
         * @param {ControlPort} iControlPort - The control port to add.
         * @return {boolean} True if the control port has been added, false otherwise.
         */
        DynamicBlock.prototype.addControlPort = function (iControlPort) {
            var controlPortRules = this.controlPortRules[iControlPort.type];
            var result = _super.prototype.addControlPort.call(this, iControlPort);
            if (result && controlPortRules.listDynamicCount.length > 0) {
                for (var dc = 0; dc < controlPortRules.listDynamicCount.length && result; dc++) {
                    var dynamicCount = controlPortRules.listDynamicCount[dc];
                    if (dynamicCount.ctor === DataPort) {
                        result = this.createDynamicDataPort(dynamicCount.type) !== undefined;
                    }
                    else if (dynamicCount.ctor === ControlPort) {
                        result = this.createDynamicControlPort(dynamicCount.type) !== undefined;
                    }
                }
            }
            return result;
        };
        /**
         * Is control port removable.
         * @private
         * @param {ControlPort} iControlPort - The control port to check.
         * @return {boolean} True if the control port is removable, false otherwise.
         */
        DynamicBlock.prototype.isControlPortRemovable = function (iControlPort) {
            var result = _super.prototype.isControlPortRemovable.call(this, iControlPort);
            result = result && !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (result) {
                var dynamicCount = this.controlPortRules[iControlPort.type].getDynamicCount();
                if (dynamicCount !== undefined) {
                    var dynamicControlPorts = this.getDynamicControlPorts(iControlPort.type);
                    result = dynamicControlPorts.length - 1 === dynamicCount;
                }
            }
            return result;
        };
        /**
         * Remove control port.
         * @private
         * @param {ControlPort} iControlPort - The control port to remove.
         * @return {boolean} True if the control port has been removed, false otherwise.
         */
        DynamicBlock.prototype.removeControlPort = function (iControlPort) {
            var dynamicIndex;
            var controlPortRules;
            if (iControlPort instanceof ControlPort) {
                var dynamicControlPorts = this.getDynamicControlPorts(iControlPort.type);
                dynamicIndex = dynamicControlPorts.indexOf(iControlPort);
                controlPortRules = this.controlPortRules[iControlPort.type];
            }
            var result = _super.prototype.removeControlPort.call(this, iControlPort);
            if (result && dynamicIndex !== -1) {
                for (var dc = 0; dc < controlPortRules.listDynamicCount.length && result; dc++) {
                    var dynamicCount = controlPortRules.listDynamicCount[dc];
                    if (dynamicCount.ctor === DataPort) {
                        var dynamicDataPorts = this.getDynamicDataPorts(dynamicCount.type);
                        var dynamicDataPort = dynamicDataPorts[dynamicIndex];
                        result = this.removeDataPort(dynamicDataPort);
                    }
                    else if (dynamicCount.ctor === ControlPort) {
                        var dynamicControlPorts = this.getDynamicControlPorts(dynamicCount.type);
                        var dynamicControlPort = dynamicControlPorts[dynamicIndex];
                        result = this.removeControlPort(dynamicControlPort);
                    }
                }
            }
            return result;
        };
        /**
         * Get dynamic control ports.
         * @private
         * @param {EP.EControlPortType} [iType] - The control port type.
         * @return {ControlPort[]} The dynamic control ports.
         */
        DynamicBlock.prototype.getDynamicControlPorts = function (iType) {
            var dynamicControlPorts = this.controlPorts.filter(function (iControlPort) {
                var result = iType === undefined || iControlPort.type === iType;
                result = result && !iControlPort.isFromDefinition();
                return result;
            });
            return dynamicControlPorts;
        };
        /**
         * Clear dynamic control ports.
         * @private
         * @return {boolean} True if all dynamic ports have been cleared, false otherwise.
         */
        DynamicBlock.prototype.clearDynamicControlPorts = function () {
            var dynamicControlPorts = this.getDynamicControlPorts();
            var result = dynamicControlPorts.length > 0;
            for (var dcp = 0; dcp < dynamicControlPorts.length; dcp++) {
                result = this.removeControlPort(dynamicControlPorts[dcp]) && result;
            }
            return result;
        };
        /**
         * Create and add dynamic setting.
         * @private
         * @param {string} [iName] - The name of the dynamic setting.
         * @return {Setting|undefined} The created dynamic setting.
         */
        DynamicBlock.prototype.createDynamicSetting = function (iName) {
            var settingDefinition;
            var settingRules = this.settingRules;
            if (this.hasDefinition() && settingRules !== undefined) {
                var name_3 = iName;
                if (name_3 === undefined || settingRules.nameReadonly) {
                    name_3 = settingRules.getNewName();
                }
                var defaultValues = settingRules.defaultValues;
                var typeCategory = settingRules.typeCategory;
                var valueTypes = settingRules.valueTypes;
                var valueType = settingRules.valueType;
                settingDefinition = new SettingDefinitions.Advanced(name_3, typeCategory, valueTypes, valueType, defaultValues);
            }
            return this.createSetting(settingDefinition);
        };
        /**
         * Is setting type addable.
         * @private
         * @return {boolean} True if the setting type is addable, false otherwise.
         */
        DynamicBlock.prototype.isSettingTypeAddable = function () {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            var definition = this.getDefinition();
            if (definition !== undefined) {
                var definitionSettings = definition.getSettings();
                var maxDynamicCount = this.settingRules.getMaxDynamicCount();
                var settings = this.getSettings();
                result = result && definitionSettings.length + maxDynamicCount > settings.length;
            }
            return result;
        };
        /**
         * Is setting addable.
         * @private
         * @param {Setting} iSetting - The setting to check.
         * @return {boolean} True if the setting is addable, false otherwise.
         */
        DynamicBlock.prototype.isSettingAddable = function (iSetting) {
            var result = _super.prototype.isSettingAddable.call(this, iSetting);
            if (result) {
                var isFromDefinition = _super.prototype.isSettingTypeAddable.call(this);
                if (!isFromDefinition) {
                    result = this.settingRules.isValid(iSetting);
                }
            }
            return result;
        };
        /**
         * Is setting removable.
         * @private
         * @param {Setting} iSetting - The setting to check.
         * @return {boolean} True if setting is removable, false otherwise.
         */
        DynamicBlock.prototype.isSettingRemovable = function (iSetting) {
            var result = _super.prototype.isSettingRemovable.call(this, iSetting);
            result = result && !this.isTemplate();
            result = result && !this.isFromTemplate();
            return result;
        };
        /**
         * Get dynamic settings.
         * @private
         * @return {Setting[]} The dynamic settings.
         */
        DynamicBlock.prototype.getDynamicSettings = function () {
            var dynamicSettings = this.settings.filter(function (iSetting) { return !iSetting.isFromDefinition(); });
            return dynamicSettings;
        };
        /**
         * Clear dynamic settings.
         * @private
         * @return {boolean} True if the dynamic settings have been cleared, false otherwise
         */
        DynamicBlock.prototype.clearDynamicSettings = function () {
            var dynamicSettings = this.getDynamicSettings();
            var result = dynamicSettings.length > 0;
            for (var ds = 0; ds < dynamicSettings.length; ds++) {
                result = this.removeSetting(dynamicSettings[ds]) && result;
            }
            return result;
        };
        return DynamicBlock;
    }(Block));
    /* eslint-disable no-unused-vars */
    var ERefType;
    (function (ERefType) {
        ERefType[ERefType["eBasic"] = 0] = "eBasic";
        ERefType[ERefType["eIndex"] = 1] = "eIndex";
        ERefType[ERefType["eArrayValue"] = 2] = "eArrayValue";
    })(ERefType || (ERefType = {}));
    /* eslint-enable no-unused-vars */
    var DataPortRules = /** @class */ (function () {
        /**
         * @constructor
         */
        function DataPortRules() {
            this.nameReadonly = false;
            this.typeCategory = Enums.FTypeCategory.fNone;
            this.valueTypes = [];
            this.defaultValues = {};
            this.listDynamicCount = [];
        }
        /**
         * Get name.
         * @private
         * @return {string} The name.
         */
        DataPortRules.prototype.getName = function () {
            return this.name;
        };
        /**
         * Get new name.
         * @private
         * @return {string} The new name.
         */
        DataPortRules.prototype.getNewName = function () {
            var index = 1;
            var name = this.getName() + String(index);
            while (this.block.dataPortsByName[name] !== undefined) {
                index++;
                name = this.getName() + String(index);
            }
            return name;
        };
        /**
         * Set name.
         *
         * @private
         * @param {string} iName - The name to set.
         * @return {boolean} True if the name has been set, false otherwise.
         */
        DataPortRules.prototype.setName = function (iName) {
            var result = typeof iName === 'string';
            result = result && iName.length !== 0;
            result = result && iName !== this.name;
            if (result) {
                this.name = iName;
            }
            return result;
        };
        /**
         * Set name read only.
         * @private
         * @return {boolean} True if name read only has been set, false otherwise.
         */
        DataPortRules.prototype.setNameReadonly = function () {
            var result = !this.nameReadonly;
            if (result) {
                this.nameReadonly = true;
            }
            return result;
        };
        /**
         * Get allowed value types.
         * @private
         * @return {string[]} The allowed value types.
         */
        DataPortRules.prototype.getAllowedValueTypes = function () {
            var allowedValueTypes = TypeLibrary.getTypeNameList(this.block.getGraphContext(), this.typeCategory);
            for (var vt = 0; vt < this.valueTypes.length; vt++) {
                var valueType = this.valueTypes[vt];
                if (!TypeLibrary.hasType(this.block.getGraphContext(), valueType, this.typeCategory)) {
                    allowedValueTypes.push(valueType);
                }
            }
            return allowedValueTypes;
        };
        /**
         * Set type category.
         * @private
         * @param {EP.FTypeCategory} iTypeCategory - The type category.
         * @return {boolean} True if the type category has been set, false otherwise.
         */
        DataPortRules.prototype.setTypeCategory = function (iTypeCategory) {
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
         * @param {string[]} iValueTypes - The value types.
         * @return {boolean} True if the value types have been set, false otherwise.
         */
        DataPortRules.prototype.setValueTypes = function (iValueTypes) {
            var _this = this;
            var result = this.refPort === undefined;
            result = result && Array.isArray(iValueTypes);
            result = result && iValueTypes.every(function (valueType) { return TypeLibrary.hasType(_this.block.getGraphContext(), valueType, Enums.FTypeCategory.fAll); });
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
         * Set default values.
         * @private
         * @param {IDefaultValues} iDefaultValues - The default values.
         * @return {boolean} True if the default values have been set, false otherwise.
         */
        DataPortRules.prototype.setDefaultValues = function (iDefaultValues) {
            var _this = this;
            var result = iDefaultValues instanceof Object;
            var valueTypes = Object.keys(iDefaultValues);
            result = result && valueTypes.every(function (valueType) { return TypeLibrary.isValueType(_this.block.getGraphContext(), valueType, iDefaultValues[valueType]); });
            if (result) {
                this.defaultValues = Tools.copyValue(iDefaultValues);
            }
            return result;
        };
        /**
         * Set value type.
         * @private
         * @param {string} iValueType - The value type to set.
         * @return {boolean} True if the value type was set, false otherwise.
         */
        DataPortRules.prototype.setValueType = function (iValueType) {
            var allowedValueTypes = this.getAllowedValueTypes();
            var result = this.refPort === undefined;
            result = result && allowedValueTypes.indexOf(iValueType) !== -1;
            if (result) {
                this.valueType = iValueType;
            }
            return result;
        };
        /**
         * Set ref.
         * @private
         * @param {DataPort} iRefPort - The data port reference.
         * @return {boolean} True if the data port reference has been set, false otherwise.
         */
        DataPortRules.prototype.setRef = function (iRefPort) {
            var result = this.refType === undefined;
            result = result && iRefPort instanceof DataPort;
            result = result && iRefPort.refPort === undefined;
            if (result) {
                this.refPort = iRefPort;
                this.refType = ERefType.eBasic;
            }
            return result;
        };
        /**
         * Set ref array value.
         * @private
         * @param {DataPort} iRefPort - The data port reference.
         * @return {boolean} True if the ref array value was set, false otherwise.
         */
        DataPortRules.prototype.setRefArrayValue = function (iRefPort) {
            var _this = this;
            var result = this.refType === undefined;
            result = result && iRefPort instanceof DataPort;
            result = result && iRefPort.refPort === undefined;
            result = result && (iRefPort.typeCategory === Enums.FTypeCategory.fArray || iRefPort.typeCategory === Enums.FTypeCategory.fNone);
            result = result && iRefPort.valueTypes.every(function (valueType) { return TypeLibrary.hasType(_this.block.getGraphContext(), valueType, Enums.FTypeCategory.fArray); });
            if (result) {
                this.refPort = iRefPort;
                this.refType = ERefType.eArrayValue;
            }
            return result;
        };
        /**
         * Set ref index.
         * @private
         * @return {boolean} True if the ref index has been set, false otherwise.
         */
        DataPortRules.prototype.setRefIndex = function () {
            var refDynamicCount = {};
            refDynamicCount.ctor = DataPort;
            refDynamicCount.type = this.type === Enums.EDataPortType.eInput ? Enums.EDataPortType.eOutput : Enums.EDataPortType.eInput;
            var dataPortRules = this.block.dataPortRules[refDynamicCount.type];
            var result = this.refType === undefined;
            result = result && dataPortRules.refType === undefined;
            result = result && this.setRefDynamicCount(refDynamicCount);
            if (result) {
                this.refType = ERefType.eIndex;
            }
            return result;
        };
        /**
         * Get max dynamic count.
         * @private
         * @return {number} The max dynamic count (integer).
         */
        DataPortRules.prototype.getMaxDynamicCount = function () {
            return this.maxDynamicCount;
        };
        /**
         * Set max dynamic count.
         * @private
         * @param {number} iMaxDynamicCount - The max dynamic count (integer).
         * @return {boolean} True if the the max dynamic count has been set, false otherwise.
         */
        DataPortRules.prototype.setMaxDynamicCount = function (iMaxDynamicCount) {
            var result = Polyfill.isInteger(iMaxDynamicCount);
            if (this.maxDynamicCount !== undefined) {
                result = result && iMaxDynamicCount <= this.maxDynamicCount;
            }
            if (result) {
                this.maxDynamicCount = iMaxDynamicCount;
            }
            return result;
        };
        /**
         * Get ref dynamic count.
         * @private
         * @return {IPortType|undefined} The ref dynamic count.
         */
        DataPortRules.prototype.getRefDynamicCount = function () {
            var refDynamicCount;
            if (this.refDynamicCount !== undefined) {
                refDynamicCount = {
                    ctor: this.refDynamicCount.ctor,
                    type: this.refDynamicCount.type
                };
            }
            return refDynamicCount;
        };
        /**
         * Get dynamic count.
         * @private
         * @return {number|undefined} The dynamic count.
         */
        DataPortRules.prototype.getDynamicCount = function () {
            var dynamicCount;
            var refDynamicCount = this.getRefDynamicCount();
            if (refDynamicCount !== undefined) {
                if (refDynamicCount.ctor === DataPort) {
                    dynamicCount = this.block.getDynamicDataPorts(refDynamicCount.type).length;
                }
                else if (refDynamicCount.ctor === ControlPort) {
                    dynamicCount = this.block.getDynamicControlPorts(refDynamicCount.type).length;
                }
            }
            return dynamicCount;
        };
        /**
         * Set ref dynamic count.
         * @private
         * @param {IPortType} iRefDynamicCount - The ref dynamic count.
         * @return {boolean} True if the ref dynamic count has been set, false otherwise.
         */
        DataPortRules.prototype.setRefDynamicCount = function (iRefDynamicCount) {
            var refPortRules;
            if (iRefDynamicCount instanceof Object) {
                if (iRefDynamicCount.ctor === DataPort) {
                    refPortRules = this.block.dataPortRules[iRefDynamicCount.type];
                }
                else if (iRefDynamicCount.ctor === ControlPort) {
                    refPortRules = this.block.controlPortRules[iRefDynamicCount.type];
                }
            }
            var result = this.refDynamicCount === undefined;
            result = result && refPortRules !== undefined;
            result = result && refPortRules !== this;
            result = result && refPortRules.getRefDynamicCount() === undefined;
            if (result) {
                this.refDynamicCount = {
                    ctor: iRefDynamicCount.ctor,
                    type: iRefDynamicCount.type
                };
                refPortRules.listDynamicCount.push({
                    ctor: DataPort,
                    type: this.type
                });
            }
            return result;
        };
        /**
         * Is valid.
         * @private
         * @param {DataPort} iDataPort - The data port.
         * @return {boolean} True if the port is valid, false otherwise.
         */
        DataPortRules.prototype.isValid = function (iDataPort) {
            var result;
            var refPort = this.refPort;
            if (this.refType === ERefType.eIndex) {
                refPort = this.block.getDynamicDataPorts(this.getRefDynamicCount().type).pop();
            }
            if (refPort !== undefined) {
                result = refPort === iDataPort.refPort;
                if (this.refType === ERefType.eArrayValue) {
                    result = result && iDataPort.refTypeReplacer === TypeLibrary.getArrayValueTypeName;
                }
            }
            else {
                result = this.typeCategory === iDataPort.typeCategory;
                result = result && JSON.stringify(this.valueTypes) === JSON.stringify(iDataPort.valueTypes);
                result = result && this.valueType === iDataPort.valueType;
                result = result && JSON.stringify(this.defaultValues) === JSON.stringify(iDataPort.defaultValues);
            }
            return result;
        };
        return DataPortRules;
    }());
    var ControlPortRules = /** @class */ (function () {
        /**
         * @constructor
         */
        function ControlPortRules() {
            this.nameReadonly = false;
            this.listDynamicCount = [];
        }
        /**
         * Get name.
         * @private
         * @return {string} The name.
         */
        ControlPortRules.prototype.getName = function () {
            return this.name;
        };
        /**
         * Get new name.
         * @private
         * @return {string} The new name.
         */
        ControlPortRules.prototype.getNewName = function () {
            var index = 1;
            var name = this.getName() + String(index);
            while (this.block.controlPortsByName[name] !== undefined) {
                index++;
                name = this.getName() + String(index);
            }
            return name;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The name.
         * @return {boolean} True if the name has been set, false otherwise.
         */
        ControlPortRules.prototype.setName = function (iName) {
            var result = typeof iName === 'string';
            result = result && iName.length !== 0;
            if (result) {
                this.name = iName;
            }
            return result;
        };
        /**
         * Set name read only.
         * @private
         * @return {boolean} True if the name read only has been set, false otherwise.
         */
        ControlPortRules.prototype.setNameReadonly = function () {
            var result = !this.nameReadonly;
            if (result) {
                this.nameReadonly = true;
            }
            return result;
        };
        /**
         * Get max dynamic count.
         * @private
         * @return {number} The max dynamic count (integer).
         */
        ControlPortRules.prototype.getMaxDynamicCount = function () {
            return this.maxDynamicCount;
        };
        /**
         * Set max dynamic count.
         * @private
         * @param {number} iMaxDynamicCount - The max dynamic count (integer).
         * @return {boolean} True if the max dynamic count has been set, false otherwise.
         */
        ControlPortRules.prototype.setMaxDynamicCount = function (iMaxDynamicCount) {
            var result = Polyfill.isInteger(iMaxDynamicCount);
            if (this.maxDynamicCount !== undefined) {
                result = result && iMaxDynamicCount <= this.maxDynamicCount;
            }
            if (result) {
                this.maxDynamicCount = iMaxDynamicCount;
            }
            return result;
        };
        /**
         * Get ref dynamic count.
         * @private
         * @return {IPortType|undefined} The ref dynamic count.
         */
        ControlPortRules.prototype.getRefDynamicCount = function () {
            var refDynamicCount;
            if (this.refDynamicCount !== undefined) {
                refDynamicCount = {
                    ctor: this.refDynamicCount.ctor,
                    type: this.refDynamicCount.type
                };
            }
            return refDynamicCount;
        };
        /**
         * Get dynamic count.
         * @private
         * @return {number|undefined} The dynamic count.
         */
        ControlPortRules.prototype.getDynamicCount = function () {
            var dynamicCount;
            var refDynamicCount = this.getRefDynamicCount();
            if (refDynamicCount !== undefined) {
                if (refDynamicCount.ctor === DataPort) {
                    dynamicCount = this.block.getDynamicDataPorts(refDynamicCount.type).length;
                }
                else if (refDynamicCount.ctor === ControlPort) {
                    dynamicCount = this.block.getDynamicControlPorts(refDynamicCount.type).length;
                }
            }
            return dynamicCount;
        };
        /**
         * Set ref dynamic count.
         * @private
         * @param {IPortType} iRefDynamicCount - The ref dynamic count.
         * @return {boolean} True if the ref dynamic count has been set, false otherwise.
         */
        ControlPortRules.prototype.setRefDynamicCount = function (iRefDynamicCount) {
            var refPortRules;
            if (iRefDynamicCount instanceof Object) {
                if (iRefDynamicCount.ctor === DataPort) {
                    refPortRules = this.block.dataPortRules[iRefDynamicCount.type];
                }
                else if (iRefDynamicCount.ctor === ControlPort) {
                    refPortRules = this.block.controlPortRules[iRefDynamicCount.type];
                }
            }
            var result = this.refDynamicCount === undefined;
            result = result && refPortRules !== undefined;
            result = result && refPortRules !== this;
            result = result && refPortRules.getRefDynamicCount() === undefined;
            if (result) {
                this.refDynamicCount = {
                    ctor: iRefDynamicCount.ctor,
                    type: iRefDynamicCount.type
                };
                refPortRules.listDynamicCount.push({
                    ctor: ControlPort,
                    type: this.type
                });
            }
            return result;
        };
        /**
         * Is valid.
         * @private
         * @param {ControlPort} [iControlPort] - The control port.
         * @return {boolean} True if valid, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this, no-unused-vars
        ControlPortRules.prototype.isValid = function (iControlPort) {
            return true;
        };
        return ControlPortRules;
    }());
    var EventPortRules = /** @class */ (function (_super) {
        __extends(EventPortRules, _super);
        /**
         * @constructor
         */
        function EventPortRules() {
            var _this = _super.call(this) || this;
            _this.typeCategory = Enums.FTypeCategory.fNone;
            _this.eventTypes = [];
            return _this;
        }
        /**
         * Get allowed event types.
         * @private
         * @return {string[]} The allowed event types.
         */
        EventPortRules.prototype.getAllowedEventTypes = function () {
            var _this = this;
            var allowedEventTypes = TypeLibrary.getTypeNameList(this.block.getGraphContext(), this.typeCategory);
            if (this.type === Enums.EControlPortType.eOutputEvent) {
                allowedEventTypes = allowedEventTypes.filter(function (eventType) { return TypeLibrary.getType(_this.block.getGraphContext(), eventType).sendable; });
            }
            for (var et = 0; et < this.eventTypes.length; et++) {
                var eventType = this.eventTypes[et];
                if (!TypeLibrary.hasType(this.block.getGraphContext(), eventType, this.typeCategory)) {
                    allowedEventTypes.push(eventType);
                }
            }
            return allowedEventTypes;
        };
        /**
         * Set type category.
         * @private
         * @param {EP.FTypeCategory} iTypeCategory - The type category.
         * @return {boolean} True if the category has been set, false otherwise.
         */
        EventPortRules.prototype.setTypeCategory = function (iTypeCategory) {
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
         * @param {string[]} iEventTypes - The event types.
         * @return {boolean} True if the event type have been set, false otherwise.
         */
        EventPortRules.prototype.setEventTypes = function (iEventTypes) {
            var _this = this;
            var result = Array.isArray(iEventTypes);
            result = result && iEventTypes.every(function (eventType) {
                var isEventType = TypeLibrary.hasType(_this.block.getGraphContext(), eventType, Enums.FTypeCategory.fEvent);
                if (_this.type === Enums.EControlPortType.eOutputEvent) {
                    isEventType = isEventType && TypeLibrary.getType(_this.block.getGraphContext(), eventType).sendable;
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
         * Set event type.
         * @private
         * @param {string} iEventType - The event type.
         * @return {boolean} True if the event type has been set, false otherwise.
         */
        EventPortRules.prototype.setEventType = function (iEventType) {
            var allowedEventTypes = this.getAllowedEventTypes();
            var result = allowedEventTypes.indexOf(iEventType) !== -1;
            if (result) {
                this.eventType = iEventType;
            }
            return result;
        };
        /**
         * Is valid.
         * @private
         * @param {EventPort} iEventPort - The event port.
         * @return {boolean} True if valid, false otherwise.
         */
        EventPortRules.prototype.isValid = function (iEventPort) {
            var result = this.typeCategory === iEventPort.typeCategory;
            result = result && JSON.stringify(this.eventTypes) === JSON.stringify(iEventPort.eventTypes);
            result = result && this.eventType === iEventPort.eventType;
            return result;
        };
        return EventPortRules;
    }(ControlPortRules));
    var SettingRules = /** @class */ (function () {
        /**
         * @constructor
         */
        function SettingRules() {
            this.nameReadonly = false;
            this.typeCategory = Enums.FTypeCategory.fNone;
            this.valueTypes = [];
            this.defaultValues = {};
        }
        /**
         * Get name.
         * @private
         * @return {string} The name.
         */
        SettingRules.prototype.getName = function () {
            return this.name;
        };
        /**
         * Get new name.
         * @private
         * @return {string} The new name.
         */
        SettingRules.prototype.getNewName = function () {
            var index = 1;
            var name = this.getName() + String(index);
            while (this.block.settingsByName[name] !== undefined) {
                index++;
                name = this.getName() + String(index);
            }
            return name;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The name.
         * @return {boolean} true if the name has been set, false otherwise.
         */
        SettingRules.prototype.setName = function (iName) {
            var result = typeof iName === 'string';
            result = result && iName.length !== 0;
            result = result && iName !== this.name;
            if (result) {
                this.name = iName;
            }
            return result;
        };
        /**
         * Set name read only.
         * @private
         * @return {boolean} True if the name read only has been set, false otherwise.
         */
        SettingRules.prototype.setNameReadonly = function () {
            var result = !this.nameReadonly;
            if (result) {
                this.nameReadonly = true;
            }
            return result;
        };
        /**
         * Get allowed value types.
         * @private
         * @return {string[]} The allowed value types.
         */
        SettingRules.prototype.getAllowedValueTypes = function () {
            var allowedValueTypes = TypeLibrary.getTypeNameList(this.block.getGraphContext(), this.typeCategory);
            for (var vt = 0; vt < this.valueTypes.length; vt++) {
                var valueType = this.valueTypes[vt];
                if (!TypeLibrary.hasType(this.block.getGraphContext(), valueType, this.typeCategory)) {
                    allowedValueTypes.push(valueType);
                }
            }
            return allowedValueTypes;
        };
        /**
         * Set type category.
         * @private
         * @param {EP.FTypeCategory} iTypeCategory - The type category.
         * @return {boolean} True if the type category has been set, false otherwise.
         */
        SettingRules.prototype.setTypeCategory = function (iTypeCategory) {
            var result = iTypeCategory >= Enums.FTypeCategory.fNone;
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
         * @param {string[]} iValueTypes - The value types.
         * @return {boolean} True if the value types have been set, false otherwise.
         */
        SettingRules.prototype.setValueTypes = function (iValueTypes) {
            var _this = this;
            var result = Array.isArray(iValueTypes);
            result = result && iValueTypes.every(function (valueType) { return TypeLibrary.hasType(_this.block.getGraphContext(), valueType, Enums.FTypeCategory.fAll); });
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
         * Set default values.
         * @private
         * @param {IDefaultValues} iDefaultValues - The default values.
         * @return {boolean} True if the default values have been set, false otherwise.
         */
        SettingRules.prototype.setDefaultValues = function (iDefaultValues) {
            var _this = this;
            var result = iDefaultValues instanceof Object;
            var valueTypes = Object.keys(iDefaultValues);
            result = result && valueTypes.every(function (valueType) { return TypeLibrary.isValueType(_this.block.getGraphContext(), valueType, iDefaultValues[valueType]); });
            if (result) {
                this.defaultValues = Tools.copyValue(iDefaultValues);
            }
            return result;
        };
        /**
         * Set value type.
         * @private
         * @param {string} iValueType - The value type.
         * @return {boolean} True if the value type has been set, false otherwise.
         */
        SettingRules.prototype.setValueType = function (iValueType) {
            var allowedValueTypes = this.getAllowedValueTypes();
            var result = allowedValueTypes.indexOf(iValueType) !== -1;
            if (result) {
                this.valueType = iValueType;
            }
            return result;
        };
        /**
         * Get max dynamic count.
         * @private
         * @return {number} The max dynamic count (integer).
         */
        SettingRules.prototype.getMaxDynamicCount = function () {
            return this.maxDynamicCount;
        };
        /**
         * Set max dynamic count.
         * @private
         * @param {number} iMaxDynamicCount - The max dynamic count (integer).
         * @return {boolean} True if the max dynamic count has been set, false otherwise.
         */
        SettingRules.prototype.setMaxDynamicCount = function (iMaxDynamicCount) {
            var result = Polyfill.isInteger(iMaxDynamicCount);
            if (this.maxDynamicCount !== undefined) {
                result = result && iMaxDynamicCount <= this.maxDynamicCount;
            }
            if (result) {
                this.maxDynamicCount = iMaxDynamicCount;
            }
            return result;
        };
        /**
         * Is valid.
         * @private
         * @param {Setting} iSetting - The setting.
         * @return {boolean} True if valid, false otherwise.
         */
        SettingRules.prototype.isValid = function (iSetting) {
            var result = this.typeCategory === iSetting.typeCategory;
            result = result && JSON.stringify(this.valueTypes) === JSON.stringify(iSetting.valueTypes);
            result = result && this.valueType === iSetting.valueType;
            result = result && JSON.stringify(this.defaultValues) === JSON.stringify(iSetting.defaultValues);
            return result;
        };
        return SettingRules;
    }());
    return DynamicBlock;
});
