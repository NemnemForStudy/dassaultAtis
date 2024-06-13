/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsSetting'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsSetting", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPEventServices/EPEventTarget", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, TypeLibrary, Events, EventTarget, Tools, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var Setting = /** @class */ (function () {
        /**
         * @constructor
         */
        function Setting() {
            this.valid = true;
            this.typeCategory = Enums.FTypeCategory.fNone;
            this.valueTypes = [];
            this.defaultValues = {};
            this.override = false;
            this.onTypeLibraryLocalCustomEventBind = this.onTypeLibraryLocalCustomEvent.bind(this);
            this.eventTarget = new EventTarget();
        }
        /**
         * Construct setting from JSON.
         * @private
         * @param {IJSONSetting} iJSONSetting - The JSON setting.
         */
        Setting.prototype.fromJSON = function (iJSONSetting) {
            var settingByName = this.block.getSettingByName(iJSONSetting.name);
            if (settingByName !== undefined) {
                if (this.getIndex() < settingByName.getIndex()) {
                    settingByName.setName(Tools.generateGUID());
                }
            }
            this.setName(iJSONSetting.name);
            if (TypeLibrary.hasType(this.getGraphContext(), iJSONSetting.valueType, Enums.FTypeCategory.fAll)) {
                this.setValueType(iJSONSetting.valueType);
                if (this.getValueType() === iJSONSetting.valueType && (iJSONSetting.override || this.block.hasOwnProperty('json'))) {
                    this.setValue(TypeLibrary.getValueFromJSONValue(this.getGraphContext(), iJSONSetting.value, iJSONSetting.valueType));
                }
                else {
                    this.resetValue();
                }
            }
            else if (typeof iJSONSetting.valueType === 'string') {
                this.setInvalidValueType(iJSONSetting.valueType);
                this.setInvalidValue(iJSONSetting.value);
                this.setOverride(iJSONSetting.override);
            }
        };
        /**
         * Construct JSON from setting.
         * @private
         * @param {IJSONSetting} oJSONSetting - The JSON setting.
         */
        Setting.prototype.toJSON = function (oJSONSetting) {
            oJSONSetting.name = this.name;
            oJSONSetting.valueType = this.getValueType();
            oJSONSetting.override = this.isOverride();
            oJSONSetting.value = TypeLibrary.getJSONValueFromValue(this.getGraphContext(), this.getValue(), this.getValueType());
        };
        /**
         * Add listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        Setting.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        /**
         * Remove listener.
         * @private
         * @param {EP.Event} iEventCtor - The event constructor.
         * @param {function(EP.Event)} iListener - The event listener.
         */
        Setting.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        /**
         * Dispatch event.
         * @private
         * @param {EP.Event} iEvent - The event to dispatch.
         */
        Setting.prototype.dispatchEvent = function (iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        };
        /**
         * From definition.
         * @private
         */
        Setting.prototype.fromDefinition = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            if (this.block instanceof BlockCtr &&
                this.block.hasDefinition()) {
                var definition = this.block.getDefinition().settings[this.getIndex()];
                if (definition !== undefined) {
                    var jsonSetting = {};
                    definition.toJSON(jsonSetting);
                    this.fromJSON(jsonSetting);
                }
            }
        };
        /**
         * Is from definition.
         * @private
         * @return {boolean} True if from definition, false otherwise.
         */
        Setting.prototype.isFromDefinition = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            if (result && this.block.hasDefinition()) {
                result = this.block.getDefinition().settings[this.getIndex()] !== undefined;
            }
            return result;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if from template, false otherwise.
         */
        Setting.prototype.isFromTemplate = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            if (result && !this.block.isTemplate()) {
                result = this.block.isFromTemplate();
            }
            return result;
        };
        /**
         * Is from invalid.
         * @private
         * @return {boolean} True if from invalid, false otherwise.
         */
        Setting.prototype.isFromInvalid = function () {
            var BlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
            var result = this.block instanceof BlockCtr;
            result = result && this.block.json !== undefined;
            return result;
        };
        /**
         * Has local custom type.
         * @private
         * @return {boolean} True if has local custom type, false otherwise.
         */
        Setting.prototype.hasLocalCustomType = function () {
            var graphContext = this.getGraphContext();
            var result = graphContext !== undefined;
            result = result && TypeLibrary.hasLocalCustomType(graphContext, this.getValueType(), Enums.FTypeCategory.fAll);
            return result;
        };
        /**
         * Is valid.
         * @private
         * @return {boolean} True if valid, false otherwise.
         */
        Setting.prototype.isValid = function () {
            return this.valid;
        };
        Setting.prototype.updateValueType = function () {
            var valueType = this.valueType;
            this.invalidValueType = undefined;
            this.valueType = undefined;
            if (!this.isValueTypeSettable(valueType)) {
                this.invalidValueType = valueType;
            }
            this.valueType = valueType;
        };
        Setting.prototype.updateValue = function () {
            if (this.computeValidity()) {
                this.invalidValue = undefined;
                if ((this.isValueSettable() && !this.isValueSettable(this.value)) ||
                    !this.isOverride()) {
                    this._setValue(this.getDefaultValueByType(this.getValueType()));
                    this.setOverride(false);
                }
            }
            else {
                this.invalidValue = this.value;
            }
        };
        Setting.prototype.update = function () {
            if (!this.isFromTemplate()) {
                this.updateValueType();
                this.updateValue();
                this.onValidityChange();
            }
        };
        /**
         * Compute validity.
         * @private
         * @return {boolean} True if valid, false otherwise.
         */
        Setting.prototype.computeValidity = function () {
            var result = this.valueType !== this.invalidValueType;
            return result;
        };
        /**
         * On validity change.
         * @private
         */
        Setting.prototype.onValidityChange = function () {
            var newValid = this.computeValidity();
            if (this.valid !== newValid) {
                this.valid = newValid;
                if (this.valid) {
                    this.invalidValueType = undefined;
                    this.invalidValue = undefined;
                }
                var event_1 = new Events.SettingValidityChangeEvent();
                event_1.setting = this;
                event_1.index = this.getIndex();
                this.dispatchEvent(event_1);
                if (this.block !== undefined) {
                    this.block.onValidityChange();
                }
            }
        };
        /**
         * Get documentation description.
         * @private
         * @return {string} The documentation description.
         */
        Setting.prototype.getDocumentationDescription = function () {
            var documentationDescription;
            if (this.block !== undefined) {
                var documentation = this.block.getDocumentation();
                if (documentation !== undefined) {
                    documentationDescription = documentation.getSettingByName(this.name);
                }
            }
            return documentationDescription;
        };
        /**
         * Get index.
         * @private
         * @return {number} The index of the setting.
         */
        Setting.prototype.getIndex = function () {
            var index;
            if (this.block !== undefined) {
                index = this.block.getSettings().indexOf(this);
            }
            return index;
        };
        /**
         * Get graph context.
         * @private
         * @return {GraphBlock} The graph context.
         */
        Setting.prototype.getGraphContext = function () {
            var graphContext;
            if (this.block !== undefined) {
                graphContext = this.block.getGraphContext();
            }
            return graphContext;
        };
        Setting.prototype.onTypeLibraryLocalCustomEvent = function (iEvent) {
            if (this.getGraphContext() === iEvent.getGraphContext()) {
                this.update();
            }
        };
        /**
         * On add.
         * @private
         * @param {Block} iBlock - The block.
         */
        Setting.prototype.onAdd = function (iBlock) {
            this.block = iBlock;
            if (this.getGraphContext() !== undefined) {
                this.onGraphContextIn();
            }
        };
        /**
         * On remove.
         * @private
         */
        Setting.prototype.onRemove = function () {
            if (this.getGraphContext() !== undefined) {
                this.onGraphContextOut();
            }
            this.block = undefined;
        };
        /**
         * On graph context in.
         * @private
         */
        Setting.prototype.onGraphContextIn = function () {
            TypeLibrary.addListener(Events.TypeLibraryRegisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.addListener(Events.TypeLibraryUpdateLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.addListener(Events.TypeLibraryUnregisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
        };
        /**
         * On graph context out.
         * @private
         */
        Setting.prototype.onGraphContextOut = function () {
            TypeLibrary.removeListener(Events.TypeLibraryRegisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.removeListener(Events.TypeLibraryUpdateLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
            TypeLibrary.removeListener(Events.TypeLibraryUnregisterLocalCustomEvent, this.onTypeLibraryLocalCustomEventBind);
        };
        /**
         * Get name.
         * @private
         * @return {string} The setting name.
         */
        Setting.prototype.getName = function () {
            return this.name;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] - The setting name.
         * @return {boolean} Whether the setting name is settable.
         */
        Setting.prototype.isNameSettable = function (iName) {
            var result = true;
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
                if (this.block !== undefined) {
                    result = result && this.block.settingsByName[iName] === undefined;
                }
            }
            if (this.name !== undefined) {
                result = result && !this.isFromInvalid();
                result = result && !this.isFromTemplate();
                result = result && !this.isFromDefinition();
                var DynamicBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock');
                if (this.block instanceof DynamicBlockCtr) {
                    result = result && !this.block.settingRules.nameReadonly;
                }
            }
            return result;
        };
        /**
         * Set name.
         * @private
         * @param {string} iName - The setting name.
         * @return {boolean} True if the name has been set, false otherwise.
         */
        Setting.prototype.setName = function (iName) {
            var result = arguments.length === 1;
            result = result && this.isNameSettable(iName);
            if (result) {
                if (this.block !== undefined) {
                    delete this.block.settingsByName[this.name];
                    this.block.settingsByName[iName] = this;
                }
                this.name = iName;
                if (this.block !== undefined) {
                    var event_2 = new Events.SettingNameChangeEvent();
                    event_2.setting = this;
                    event_2.index = this.getIndex();
                    event_2.name = this.name;
                    this.dispatchEvent(event_2);
                }
            }
            return result;
        };
        /**
         * Set invalid value type.
         * @private
         * @param {string} iValueType - The value type.
         * @return {boolean} The result.
         */
        Setting.prototype.setInvalidValueType = function (iValueType) {
            this.invalidValueType = iValueType;
            var result = this.setValueType(iValueType);
            return result;
        };
        /**
         * Get allowed value types.
         * @private
         * @return {string[]} The allowed value types.
         */
        Setting.prototype.getAllowedValueTypes = function () {
            var allowedValueTypes = TypeLibrary.getTypeNameList(this.getGraphContext(), this.typeCategory);
            for (var vt = 0; vt < this.valueTypes.length; vt++) {
                var valueType = this.valueTypes[vt];
                if (!TypeLibrary.hasType(this.getGraphContext(), valueType, this.typeCategory)) {
                    allowedValueTypes.push(valueType);
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
         * @param {EP.FTypeCategory} iTypeCategory - The type category.
         * @return {boolean} True if the type category has been set, false otherwise.
         */
        Setting.prototype.setTypeCategory = function (iTypeCategory) {
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
        Setting.prototype.setValueTypes = function (iValueTypes) {
            var _this = this;
            var result = Array.isArray(iValueTypes);
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
         * Set default values.
         * @private
         * @param {IDefaultValues} iDefaultValues - The default values.
         * @return {boolean} True if the default values have been set, false otherwise.
         */
        Setting.prototype.setDefaultValues = function (iDefaultValues) {
            var _this = this;
            var result = iDefaultValues instanceof Object;
            var valueTypes = Object.keys(iDefaultValues);
            result = result && valueTypes.every(function (valueType) { return TypeLibrary.isValueType(_this.getGraphContext(), valueType, iDefaultValues[valueType]); });
            if (result) {
                this.defaultValues = Tools.copyValue(iDefaultValues);
                if (this.getValueType() !== undefined && !this.isOverride()) {
                    this._setValue(this.getDefaultValueByType(this.getValueType()));
                }
            }
            return result;
        };
        /**
         * Get default value by type.
         * @private
         * @param {string} iType - The type.
         * @return {*} The default value.
         */
        Setting.prototype.getDefaultValueByType = function (iType) {
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
         * @return {string} The value type.
         */
        Setting.prototype.getValueType = function () {
            return this.valueType;
        };
        /**
         * Is value type settable.
         * @private
         * @param {string} [iValueType] - The value type.
         * @return {boolean} True if the value type is settable, false otherwise.
         */
        Setting.prototype.isValueTypeSettable = function (iValueType) {
            var allowedValueTypes = this.getAllowedValueTypes();
            var result = !this.isFromInvalid();
            result = result && !this.isFromTemplate();
            result = result && allowedValueTypes.length > 0;
            if (arguments.length !== 0) {
                result = result && iValueType !== this.valueType;
                result = result && allowedValueTypes.indexOf(iValueType) !== -1;
            }
            if (this.valueType !== undefined) {
                result = result && allowedValueTypes.length > 1;
            }
            return result;
        };
        /**
         * Set value type.
         * @private
         * @param {string} iValueType - The value type.
         * @return {boolean} True if the value type has been set, false otherwise.
         */
        Setting.prototype.setValueType = function (iValueType) {
            var result = arguments.length === 1;
            result = result && this.isValueTypeSettable(iValueType);
            if (result) {
                this.valueType = iValueType;
                this.value = this.getDefaultValueByType(this.getValueType());
                if (this.block !== undefined && this.getIndex() !== -1) {
                    var event_3 = new Events.SettingValueTypeChangeEvent();
                    event_3.setting = this;
                    event_3.index = this.getIndex();
                    event_3.valueType = this.getValueType();
                    event_3.value = this.getValue();
                    this.dispatchEvent(event_3);
                }
                this.onValidityChange();
                this.setOverride(false);
            }
            return result;
        };
        /**
         * Set invalid value.
         * @private
         * @param {*} iValue - The value.
         * @return {boolean} True if the invalid value has been set, false otherwise.
         */
        Setting.prototype.setInvalidValue = function (iValue) {
            this.invalidValue = Tools.copyValue(iValue);
            var result = this.setValue(iValue);
            return result;
        };
        /**
         * Get value.
         * @private
         * @return {*} The setting value.
         */
        Setting.prototype.getValue = function () {
            return Tools.copyValue(this.value);
        };
        /**
         * Is value settable.
         * @private
         * @param {*} [iValue] - The setting value to set.
         * @return {boolean} True if the setting value is settable, false otherwise.
         */
        Setting.prototype.isValueSettable = function (iValue) {
            var result = !this.isFromInvalid();
            result = result && !this.block.isFromTemplate();
            var isValueType = TypeLibrary.isValueType(this.getGraphContext(), this.getValueType(), iValue);
            isValueType = isValueType || (this.invalidValue !== undefined && JSON.stringify(this.invalidValue) === JSON.stringify(iValue));
            result = result && isValueType;
            return result;
        };
        Setting.prototype._setValue = function (iValue) {
            this.value = Tools.copyValue(iValue);
            if (this.block !== undefined) {
                var event = new Events.SettingValueChangeEvent();
                event.setting = this;
                event.index = this.getIndex();
                event.value = this.getValue();
                this.dispatchEvent(event);
            }
        };
        /**
         * Set value.
         * @private
         * @param {*} iValue - The setting value.
         * @return {boolean} True if the setting value has been set, false otherwise.
         */
        Setting.prototype.setValue = function (iValue) {
            var result = this.isValueSettable(iValue);
            if (result) {
                this._setValue(iValue);
                if (this.isValid()) {
                    this.setOverride(true);
                }
            }
            return result;
        };
        Setting.prototype.setOverride = function (iOverride) {
            if (this.override !== iOverride) {
                this.override = iOverride;
                if (this.block !== undefined) {
                    var event_4 = new Events.SettingOverrideChangeEvent();
                    event_4.setting = this;
                    event_4.index = this.getIndex();
                    event_4.override = this.isOverride();
                    this.dispatchEvent(event_4);
                }
            }
        };
        /**
         * Is override.
         * @private
         * @return {boolean} True if setting is overriden, false otherwise.
         */
        Setting.prototype.isOverride = function () {
            return this.override;
        };
        /**
         * Reset value.
         * @private
         * @return {boolean} True if the setting value has been reset, false otherwise.
         */
        Setting.prototype.resetValue = function () {
            var result = this.isOverride();
            result = result && this.isValueSettable();
            if (result) {
                this.setValue(this.getDefaultValueByType(this.getValueType()));
                this.setOverride(false);
            }
            return result;
        };
        return Setting;
    }());
    return Setting;
});
