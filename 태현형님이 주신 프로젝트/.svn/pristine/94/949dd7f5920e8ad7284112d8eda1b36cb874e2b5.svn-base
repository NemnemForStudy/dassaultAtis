/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var DataPortDefinitions;
    (function (DataPortDefinitions) {
        /**
         * @class InputDefinition
         * @private
         */
        var InputDefinition = /** @class */ (function () {
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputDefinition(iName, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                this.name = iName;
                this.optional = iOptional;
            }
            return InputDefinition;
        }());
        /**
         * @class InputBasic
         * @extends InputDefinition
         * @private
         */
        var InputBasic = /** @class */ (function (_super) {
            __extends(InputBasic, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {string} iValueType - The value type of the data port.
             * @param {*} [iDefaultValue] - The optional default value of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputBasic(iName, iValueType, iDefaultValue, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = [iValueType];
                _this.valueType = undefined;
                _this.defaultValues = {};
                if (arguments.length >= 3) {
                    _this.defaultValues[iValueType] = iDefaultValue;
                }
                return _this;
            }
            return InputBasic;
        }(InputDefinition));
        DataPortDefinitions.InputBasic = InputBasic;
        /**
         * @class InputList
         * @extends InputDefinition
         * @private
         */
        var InputList = /** @class */ (function (_super) {
            __extends(InputList, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {string[]} iValueTypes - The possible value types of the data port.
             * @param {string} [iValueType] - The optional current value type of the data port.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputList(iName, iValueTypes, iValueType, iDefaultValues, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return InputList;
        }(InputDefinition));
        DataPortDefinitions.InputList = InputList;
        /**
         * @class InputCategory
         * @extends InputDefinition
         * @private
         */
        var InputCategory = /** @class */ (function (_super) {
            __extends(InputCategory, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the data port.
             * @param {string} [iValueType] - The optional value type of the data port.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputCategory(iName, iTypeCategory, iValueType, iDefaultValues, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return InputCategory;
        }(InputDefinition));
        DataPortDefinitions.InputCategory = InputCategory;
        /**
         * @class InputAll
         * @extends InputDefinition
         * @private
         */
        var InputAll = /** @class */ (function (_super) {
            __extends(InputAll, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {string} [iValueType] - The optional value type of the data port.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputAll(iName, iValueType, iDefaultValues, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.typeCategory = Enums.FTypeCategory.fAll;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return InputAll;
        }(InputDefinition));
        DataPortDefinitions.InputAll = InputAll;
        /**
         * @class InputAdvanced
         * @extends InputDefinition
         * @private
         */
        var InputAdvanced = /** @class */ (function (_super) {
            __extends(InputAdvanced, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the data port.
             * @param {string[]} iValueTypes - The possible value types of the data port.
             * @param {string} [iValueType] - The optional current value type of the data port.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputAdvanced(iName, iTypeCategory, iValueTypes, iValueType, iDefaultValues, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return InputAdvanced;
        }(InputDefinition));
        DataPortDefinitions.InputAdvanced = InputAdvanced;
        /**
         * @class RefDefinition
         * @private
         */
        var RefDefinition = /** @class */ (function () {
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {DataPort} iRefPort - The data port reference.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function RefDefinition(iName, iRefPort, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                this.name = iName;
                this.refPort = iRefPort;
                this.optional = iOptional;
            }
            return RefDefinition;
        }());
        /**
         * @class InputRef
         * @extends RefDefinition
         * @private
         */
        var InputRef = /** @class */ (function (_super) {
            __extends(InputRef, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {DataPort} iRefPort - The data port reference.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputRef(iName, iRefPort, iDefaultValues, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iRefPort, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return InputRef;
        }(RefDefinition));
        DataPortDefinitions.InputRef = InputRef;
        /**
         * @class InputRefArrayValue
         * @extends RefDefinition
         * @private
         */
        var InputRefArrayValue = /** @class */ (function (_super) {
            __extends(InputRefArrayValue, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {DataPort} iRefPort - The data port reference.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             * @param {boolean} [iOptional=false] - If the data port is optional.
             */
            function InputRefArrayValue(iName, iRefPort, iDefaultValues, iOptional) {
                if (iOptional === void 0) { iOptional = false; }
                var _this = _super.call(this, iName, iRefPort, iOptional) || this;
                _this.type = Enums.EDataPortType.eInput;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return InputRefArrayValue;
        }(RefDefinition));
        DataPortDefinitions.InputRefArrayValue = InputRefArrayValue;
        /**
         * @class OutputDefinition
         * @private
         */
        var OutputDefinition = /** @class */ (function () {
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             */
            function OutputDefinition(iName) {
                this.optional = false;
                this.name = iName;
            }
            return OutputDefinition;
        }());
        /**
         * @class OutputBasic
         * @extends OutputDefinition
         * @private
         */
        var OutputBasic = /** @class */ (function (_super) {
            __extends(OutputBasic, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {string} iValueType - The value type of the data port.
             */
            function OutputBasic(iName, iValueType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EDataPortType.eOutput;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = [iValueType];
                _this.valueType = undefined;
                return _this;
            }
            return OutputBasic;
        }(OutputDefinition));
        DataPortDefinitions.OutputBasic = OutputBasic;
        /**
         * @class OutputList
         * @extends OutputDefinition
         * @private
         */
        var OutputList = /** @class */ (function (_super) {
            __extends(OutputList, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {string[]} iValueTypes - The possible value types of the data port.
             * @param {string} [iValueType] - The optional current value type of the data port.
             */
            function OutputList(iName, iValueTypes, iValueType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EDataPortType.eOutput;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                return _this;
            }
            return OutputList;
        }(OutputDefinition));
        DataPortDefinitions.OutputList = OutputList;
        /**
         * @class OutputCategory
         * @extends OutputDefinition
         * @private
         */
        var OutputCategory = /** @class */ (function (_super) {
            __extends(OutputCategory, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the data port.
             * @param {string} [iValueType] - The optional value type of the data port.
             */
            function OutputCategory(iName, iTypeCategory, iValueType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EDataPortType.eOutput;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                return _this;
            }
            return OutputCategory;
        }(OutputDefinition));
        DataPortDefinitions.OutputCategory = OutputCategory;
        /**
         * @class OutputAll
         * @extends OutputDefinition
         * @private
         */
        var OutputAll = /** @class */ (function (_super) {
            __extends(OutputAll, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {string} [iValueType] - The optional value type of the data port.
             */
            function OutputAll(iName, iValueType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EDataPortType.eOutput;
                _this.typeCategory = Enums.FTypeCategory.fAll;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                return _this;
            }
            return OutputAll;
        }(OutputDefinition));
        DataPortDefinitions.OutputAll = OutputAll;
        /**
         * @class OutputAdvanced
         * @extends OutputDefinition
         * @private
         */
        var OutputAdvanced = /** @class */ (function (_super) {
            __extends(OutputAdvanced, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the data port.
             * @param {string[]} iValueTypes - The possible value types of the data port.
             * @param {string} [iValueType] - The optional current value type of the data port.
             */
            function OutputAdvanced(iName, iTypeCategory, iValueTypes, iValueType) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EDataPortType.eOutput;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                return _this;
            }
            return OutputAdvanced;
        }(OutputDefinition));
        DataPortDefinitions.OutputAdvanced = OutputAdvanced;
        /**
         * @class OutputRef
         * @extends RefDefinition
         * @private
         */
        var OutputRef = /** @class */ (function (_super) {
            __extends(OutputRef, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {DataPort} iRefPort - The data port reference.
             */
            function OutputRef(iName, iRefPort) {
                var _this = _super.call(this, iName, iRefPort) || this;
                _this.type = Enums.EDataPortType.eOutput;
                return _this;
            }
            return OutputRef;
        }(RefDefinition));
        DataPortDefinitions.OutputRef = OutputRef;
        /**
         * @class OutputRefArrayValue
         * @extends RefDefinition
         * @private
         */
        var OutputRefArrayValue = /** @class */ (function (_super) {
            __extends(OutputRefArrayValue, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {DataPort} iRefPort - The data port reference.
             */
            function OutputRefArrayValue(iName, iRefPort) {
                var _this = _super.call(this, iName, iRefPort) || this;
                _this.type = Enums.EDataPortType.eOutput;
                return _this;
            }
            return OutputRefArrayValue;
        }(RefDefinition));
        DataPortDefinitions.OutputRefArrayValue = OutputRefArrayValue;
        /**
         * @class LocalAdvanced
         * @extends InputDefinition
         * @private
         */
        var LocalAdvanced = /** @class */ (function (_super) {
            __extends(LocalAdvanced, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the data port.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the data port.
             * @param {string[]} iValueTypes - The possible value types of the data port.
             * @param {string} [iValueType] - The optional value type of the data port.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the data port.
             */
            function LocalAdvanced(iName, iTypeCategory, iValueTypes, iValueType, iDefaultValues) {
                var _this = _super.call(this, iName) || this;
                _this.type = Enums.EDataPortType.eLocal;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return LocalAdvanced;
        }(InputDefinition));
        DataPortDefinitions.LocalAdvanced = LocalAdvanced;
        /**
         * @class InputListTypes
         * @extends InputList
         * @deprecated
         * @private
         */
        var InputListTypes = /** @class */ (function (_super) {
            __extends(InputListTypes, _super);
            /**
             * @constructor
             * @private
             * @deprecated
             * @param {string} iName - The name of the data port.
             * @param {IValueType[]} iValueTypes - The value types of the data port.
             * @param {string} [iDefaultType] - The optional default type of the data port.
             */
            function InputListTypes(iName, iValueTypes, iDefaultType) {
                var valueTypes = [];
                var defaultValues = {};
                for (var vt = 0; vt < iValueTypes.length; vt++) {
                    valueTypes.push(iValueTypes[vt].type);
                    if (iValueTypes[vt].hasOwnProperty('defaultValue')) {
                        defaultValues[iValueTypes[vt].type] = iValueTypes[vt].defaultValue;
                    }
                }
                return _super.call(this, iName, valueTypes, iDefaultType, defaultValues) || this;
            }
            return InputListTypes;
        }(InputList));
        DataPortDefinitions.InputListTypes = InputListTypes;
        /**
         * @class OutputListTypes
         * @extends OutputList
         * @deprecated
         * @private
         */
        var OutputListTypes = /** @class */ (function (_super) {
            __extends(OutputListTypes, _super);
            /**
             * @constructor
             * @private
             * @deprecated
             * @param {string} iName - The name of the data port.
             * @param {IType[]} iTypes - The types of the data port.
             * @param {string} [iDefaultType] - The optional default type of the data port.
             */
            function OutputListTypes(iName, iTypes, iDefaultType) {
                var valueTypes = [];
                for (var t = 0; t < iTypes.length; t++) {
                    valueTypes.push(iTypes[t].type);
                }
                return _super.call(this, iName, valueTypes, iDefaultType) || this;
            }
            return OutputListTypes;
        }(OutputList));
        DataPortDefinitions.OutputListTypes = OutputListTypes;
    })(DataPortDefinitions || (DataPortDefinitions = {}));
    return DataPortDefinitions;
});
