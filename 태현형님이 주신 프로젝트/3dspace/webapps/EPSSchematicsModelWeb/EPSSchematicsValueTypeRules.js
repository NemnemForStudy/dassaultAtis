/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ValueTypeRules;
    (function (ValueTypeRules) {
        var ValueTypeRule = /** @class */ (function () {
            function ValueTypeRule() {
            }
            return ValueTypeRule;
        }());
        var Basic = /** @class */ (function (_super) {
            __extends(Basic, _super);
            function Basic(iValueType, iDefaultValue) {
                var _this = _super.call(this) || this;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = [iValueType];
                _this.valueType = undefined;
                _this.defaultValues = {};
                _this.defaultValues[iValueType] = iDefaultValue;
                return _this;
            }
            return Basic;
        }(ValueTypeRule));
        ValueTypeRules.Basic = Basic;
        var List = /** @class */ (function (_super) {
            __extends(List, _super);
            function List(iValueTypes, iValueType, iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.typeCategory = Enums.FTypeCategory.fNone;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return List;
        }(ValueTypeRule));
        ValueTypeRules.List = List;
        var Category = /** @class */ (function (_super) {
            __extends(Category, _super);
            function Category(iTypeCategory, iValueType, iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return Category;
        }(ValueTypeRule));
        ValueTypeRules.Category = Category;
        var All = /** @class */ (function (_super) {
            __extends(All, _super);
            function All(iValueType, iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.typeCategory = Enums.FTypeCategory.fAll;
                _this.valueTypes = [];
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return All;
        }(ValueTypeRule));
        ValueTypeRules.All = All;
        var Advanced = /** @class */ (function (_super) {
            __extends(Advanced, _super);
            function Advanced(iTypeCategory, iValueTypes, iValueType, iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.typeCategory = iTypeCategory;
                _this.valueTypes = iValueTypes;
                _this.valueType = iValueType;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return Advanced;
        }(ValueTypeRule));
        ValueTypeRules.Advanced = Advanced;
        var RefValueTypeRule = /** @class */ (function () {
            function RefValueTypeRule() {
            }
            return RefValueTypeRule;
        }());
        var Ref = /** @class */ (function (_super) {
            __extends(Ref, _super);
            function Ref(iRefPort, iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.refPort = iRefPort;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return Ref;
        }(RefValueTypeRule));
        ValueTypeRules.Ref = Ref;
        var RefArrayValue = /** @class */ (function (_super) {
            __extends(RefArrayValue, _super);
            function RefArrayValue(iRefPort, iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.refPort = iRefPort;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return RefArrayValue;
        }(RefValueTypeRule));
        ValueTypeRules.RefArrayValue = RefArrayValue;
        var RefIndex = /** @class */ (function (_super) {
            __extends(RefIndex, _super);
            function RefIndex(iDefaultValues) {
                var _this = _super.call(this) || this;
                _this.defaultValues = iDefaultValues || {};
                return _this;
            }
            return RefIndex;
        }(RefValueTypeRule));
        ValueTypeRules.RefIndex = RefIndex;
    })(ValueTypeRules || (ValueTypeRules = {}));
    return ValueTypeRules;
});
