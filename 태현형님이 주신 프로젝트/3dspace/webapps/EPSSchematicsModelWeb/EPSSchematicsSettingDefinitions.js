/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var SettingDefinitions;
    (function (SettingDefinitions) {
        /**
         * @class SettingDefinition
         * @private
         */
        var SettingDefinition = /** @class */ (function () {
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the setting.
             */
            function SettingDefinition(iName) {
                this.name = iName;
            }
            return SettingDefinition;
        }());
        /**
         * @class Basic
         * @extends SettingDefinition
         * @private
         */
        var Basic = /** @class */ (function (_super) {
            __extends(Basic, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the setting.
             * @param {string} iValueType - The value type of the setting.
             * @param {*} [iDefaultValue] - The optional default value of the setting.
             */
            function Basic(iName, iValueType, iDefaultValue) {
                var _this = _super.call(this, iName) || this;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = [iValueType];
                _this.valueType = undefined;
                _this.defaultValues = {};
                _this.defaultValues[iValueType] = iDefaultValue;
                return _this;
            }
            return Basic;
        }(SettingDefinition));
        SettingDefinitions.Basic = Basic;
        /**
         * @class List
         * @extends SettingDefinition
         * @private
         */
        var List = /** @class */ (function (_super) {
            __extends(List, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the setting.
             * @param {string[]} iValueTypes - The possible value types of the setting.
             * @param {string} iValueType - The current value type of the setting.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the setting.
             */
            function List(iName, iValueTypes, iValueType, iDefaultValues) {
                var _this = _super.call(this, iName) || this;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return List;
        }(SettingDefinition));
        SettingDefinitions.List = List;
        /**
         * @class Category
         * @extends SettingDefinition
         * @private
         */
        var Category = /** @class */ (function (_super) {
            __extends(Category, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the setting.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the setting.
             * @param {string} iValueType - The value type of the setting.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the setting.
             */
            function Category(iName, iTypeCategory, iValueType, iDefaultValues) {
                var _this = _super.call(this, iName) || this;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return Category;
        }(SettingDefinition));
        SettingDefinitions.Category = Category;
        /**
         * @class All
         * @extends SettingDefinition
         * @private
         */
        var All = /** @class */ (function (_super) {
            __extends(All, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the setting.
             * @param {string} iValueType - The value type of the setting.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the setting.
             */
            function All(iName, iValueType, iDefaultValues) {
                var _this = _super.call(this, iName) || this;
                _this.typeCategory = Enums.FTypeCategory.fAll;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return All;
        }(SettingDefinition));
        SettingDefinitions.All = All;
        /**
         * @class Advanced
         * @extends SettingDefinition
         * @private
         */
        var Advanced = /** @class */ (function (_super) {
            __extends(Advanced, _super);
            /**
             * @constructor
             * @private
             * @param {string} iName - The name of the setting.
             * @param {Enums.FTypeCategory} iTypeCategory - The type category of the setting.
             * @param {string[]} iValueTypes - The possible value types of the setting.
             * @param {string} iValueType - The current value type of the setting.
             * @param {IDefaultValues} [iDefaultValues] - The optional default values of the setting.
             */
            function Advanced(iName, iTypeCategory, iValueTypes, iValueType, iDefaultValues) {
                var _this = _super.call(this, iName) || this;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return Advanced;
        }(SettingDefinition));
        SettingDefinitions.Advanced = Advanced;
        /**
         * @class ListTypes
         * @extends List
         * @deprecated
         * @private
         */
        var ListTypes = /** @class */ (function (_super) {
            __extends(ListTypes, _super);
            /**
             * @constructor
             * @private
             * @deprecated
             * @param {string} iName - The name of the setting.
             * @param {IValueType[]} iValueTypes - The possible value types of the setting.
             * @param {string} iDefaultType - The optional default type of the setting.
             */
            function ListTypes(iName, iValueTypes, iDefaultType) {
                var valueTypes = [];
                var defaultValues = {};
                for (var vt = 0; vt < iValueTypes.length; vt++) {
                    valueTypes.push(iValueTypes[vt].type);
                    if (iValueTypes[vt].defaultValue !== undefined) {
                        defaultValues[iValueTypes[vt].type] = iValueTypes[vt].defaultValue;
                    }
                }
                return _super.call(this, iName, valueTypes, iDefaultType, defaultValues) || this;
            }
            return ListTypes;
        }(List));
        SettingDefinitions.ListTypes = ListTypes;
    })(SettingDefinitions || (SettingDefinitions = {}));
    return SettingDefinitions;
});
