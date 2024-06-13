/* eslint-disable no-unused-vars */
/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", ["require", "exports", "DS/EP/EP"], function (require, exports, EP) {
    "use strict";
    var ModelEnums;
    (function (ModelEnums) {
        /**
         * Removes the TypeScript reverse mapping generated for number enumeration.
         * TypeScript automatically generates a reverse mapping for number enumeration only.
         * The drawback of this approach is that an Object.keys will return these extra keys
         * an pollute the display of an enumeration in the Schematics!
         * @private
         * @param {Object} enumeration - The enumeration.
         */
        var removeTSEnumReverseMapping = function (enumeration) {
            Object.keys(enumeration).forEach(function (prop) {
                if (!isNaN(Number(prop))) {
                    delete enumeration[prop];
                }
            });
        };
        /**
         * This enumeration defines the available execution results.
         * @protected
         */
        var EExecutionResult;
        (function (EExecutionResult) {
            EExecutionResult[EExecutionResult["eExecutionError"] = 0] = "eExecutionError";
            EExecutionResult[EExecutionResult["eExecutionFinished"] = 1] = "eExecutionFinished";
            EExecutionResult[EExecutionResult["eExecutionPending"] = 2] = "eExecutionPending";
            EExecutionResult[EExecutionResult["eExecutionWarning"] = 3] = "eExecutionWarning";
            EExecutionResult[EExecutionResult["eExecutionWorker"] = 4] = "eExecutionWorker";
        })(EExecutionResult = ModelEnums.EExecutionResult || (ModelEnums.EExecutionResult = {}));
        EP.EExecutionResult = EExecutionResult;
        /**
         * This enumeration defines the available data port types.
         * @protected
         */
        var EDataPortType;
        (function (EDataPortType) {
            EDataPortType[EDataPortType["eInput"] = 0] = "eInput";
            EDataPortType[EDataPortType["eOutput"] = 1] = "eOutput";
            EDataPortType[EDataPortType["eLocal"] = 2] = "eLocal";
        })(EDataPortType = ModelEnums.EDataPortType || (ModelEnums.EDataPortType = {}));
        EP.EDataPortType = EDataPortType;
        /**
         * This enumeration defines the available control port types.
         * @protected
         */
        var EControlPortType;
        (function (EControlPortType) {
            EControlPortType[EControlPortType["eInput"] = 0] = "eInput";
            EControlPortType[EControlPortType["eOutput"] = 1] = "eOutput";
            EControlPortType[EControlPortType["eInputEvent"] = 2] = "eInputEvent";
            EControlPortType[EControlPortType["eOutputEvent"] = 3] = "eOutputEvent";
        })(EControlPortType = ModelEnums.EControlPortType || (ModelEnums.EControlPortType = {}));
        EP.EControlPortType = EControlPortType;
        /**
         * This enumeration defines the available value types.
         * @protected
         * @deprecated
         */
        var EValueType;
        (function (EValueType) {
            EValueType["eBoolean"] = "Boolean";
            EValueType["eDouble"] = "Double";
            EValueType["eInteger"] = "Integer";
            EValueType["eObject"] = "Object";
            EValueType["eString"] = "String";
            EValueType["eArray"] = "Array";
        })(EValueType = ModelEnums.EValueType || (ModelEnums.EValueType = {}));
        EP.EValueType = EValueType;
        /**
         * This enumeration defines the available value categories.
         * @protected
         * @deprecated
         */
        var EValueCategory;
        (function (EValueCategory) {
        })(EValueCategory = ModelEnums.EValueCategory || (ModelEnums.EValueCategory = {}));
        EP.EValueCategory = EValueCategory;
        /**
         * This enumeration defines the available value categories.
         * @protected
         */
        var FTypeCategory;
        (function (FTypeCategory) {
            FTypeCategory[FTypeCategory["fNone"] = 0] = "fNone";
            FTypeCategory[FTypeCategory["fNumerical"] = 1] = "fNumerical";
            FTypeCategory[FTypeCategory["fBase"] = 3] = "fBase";
            FTypeCategory[FTypeCategory["fEnum"] = 4] = "fEnum";
            FTypeCategory[FTypeCategory["fObject"] = 8] = "fObject";
            FTypeCategory[FTypeCategory["fClass"] = 16] = "fClass";
            FTypeCategory[FTypeCategory["fEvent"] = 32] = "fEvent";
            FTypeCategory[FTypeCategory["fArray"] = 64] = "fArray";
            FTypeCategory[FTypeCategory["fAll"] = 127] = "fAll";
        })(FTypeCategory = ModelEnums.FTypeCategory || (ModelEnums.FTypeCategory = {}));
        EP.FTypeCategory = FTypeCategory;
        /**
         * This enumeration defines the available cast's types.
         * @private
         */
        var ECastLevel;
        (function (ECastLevel) {
            ECastLevel[ECastLevel["eNoCast"] = 0] = "eNoCast";
            ECastLevel[ECastLevel["eLossless"] = 1] = "eLossless";
            ECastLevel[ECastLevel["eLossy"] = 2] = "eLossy";
            ECastLevel[ECastLevel["eUnsafe"] = 3] = "eUnsafe";
        })(ECastLevel = ModelEnums.ECastLevel || (ModelEnums.ECastLevel = {}));
        removeTSEnumReverseMapping(ECastLevel);
        EP.ECastLevel = ECastLevel;
        /**
         * This enumeration defines the available severities.
         * @private
         */
        var ESeverity;
        (function (ESeverity) {
            ESeverity[ESeverity["eInfo"] = 0] = "eInfo";
            ESeverity[ESeverity["eWarning"] = 1] = "eWarning";
            ESeverity[ESeverity["eDebug"] = 2] = "eDebug";
            ESeverity[ESeverity["eError"] = 3] = "eError";
            ESeverity[ESeverity["eSuccess"] = 4] = "eSuccess";
        })(ESeverity = ModelEnums.ESeverity || (ModelEnums.ESeverity = {}));
        removeTSEnumReverseMapping(ESeverity);
        EP.ESeverity = ESeverity;
        /**
         * This enumeration defines the available script languages.
         * @private
         */
        var EScriptLanguage;
        (function (EScriptLanguage) {
            EScriptLanguage["eJavaScript"] = "JavaScript";
            EScriptLanguage["ePython"] = "Python";
        })(EScriptLanguage = ModelEnums.EScriptLanguage || (ModelEnums.EScriptLanguage = {}));
        EP.EScriptLanguage = EScriptLanguage;
        /**
         * This enumeration defines the available criterions.
         * @private
         */
        var ECriterion;
        (function (ECriterion) {
            ECriterion[ECriterion["eIdentifier"] = 0] = "eIdentifier";
            ECriterion[ECriterion["eOnlyMyHypervisor"] = 1] = "eOnlyMyHypervisor";
            ECriterion[ECriterion["eNotMyHypervisor"] = 2] = "eNotMyHypervisor";
            ECriterion[ECriterion["ePreferMyHypervisor"] = 3] = "ePreferMyHypervisor";
        })(ECriterion = ModelEnums.ECriterion || (ModelEnums.ECriterion = {}));
        EP.ECriterion = ECriterion;
    })(ModelEnums || (ModelEnums = {}));
    return ModelEnums;
});
