/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, DynamicBlock, Events, Enums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var ScriptBlock = /** @class */ (function (_super) {
        __extends(ScriptBlock, _super);
        function ScriptBlock() {
            return _super.call(this) || this;
        }
        /**
         * Construct script block from JSON.
         * @private
         * @param {IJSONScriptBlock} iJSONScriptBlock - The JSON script block.
         */
        ScriptBlock.prototype.fromJSON = function (iJSONScriptBlock) {
            var _a, _b;
            _super.prototype.fromJSON.call(this, iJSONScriptBlock);
            this.setScriptLanguage((_a = iJSONScriptBlock.script) === null || _a === void 0 ? void 0 : _a.language);
            this.setScriptContent((_b = iJSONScriptBlock.script) === null || _b === void 0 ? void 0 : _b.content);
        };
        /**
         * Construct JSON from script block.
         * @private
         * @param {IJSONScriptBlock} oJSONScriptBlock - The JSON script block.
         */
        ScriptBlock.prototype.toJSON = function (oJSONScriptBlock) {
            _super.prototype.toJSON.call(this, oJSONScriptBlock);
            oJSONScriptBlock.script = {};
            oJSONScriptBlock.script.language = this.getScriptLanguage();
            oJSONScriptBlock.script.content = this.getScriptContent();
        };
        /**
         * Is global templatable.
         * @private
         * @return {boolean} True if global templatable, false otherwise.
         */
        ScriptBlock.prototype.isGlobalTemplatable = function () {
            var result = this.isValid();
            result = result && !this.isFromTemplate();
            result = result && this.hasDefinition();
            result = result && !this.hasLocalCustomType();
            return result;
        };
        /**
         * Is local templatable.
         * @private
         * @return {boolean} True if local templatable, false otherwise.
         */
        ScriptBlock.prototype.isLocalTemplatable = function () {
            var result = this.isValid();
            result = result && !this.isFromTemplate();
            result = result && this.hasDefinition();
            result = result && !this.hasLocalCustomType();
            return result;
        };
        /**
         * Template.
         * @private
         * @param {string} iUid - The Uid.
         * @return {boolean} True if the block has been templatised, false otherwise.
         */
        ScriptBlock.prototype.template = function (iUid) {
            var result = false;
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            var jsonObjectScript = {};
            this.toJSON(jsonObjectScript);
            var dataPorts = jsonObjectScript.dataPorts;
            for (var dp = 0; dp < dataPorts.length; dp++) {
                dataPorts[dp].dataPorts.length = 0;
            }
            var jsonScript = JSON.stringify(jsonObjectScript);
            var jsonObjectTemplate = TemplateLibrary.getJSONObjectScript(iUid);
            if (jsonObjectTemplate !== undefined) {
                result = this.isGlobalTemplatable();
                result = result && jsonScript === JSON.stringify(jsonObjectTemplate);
            }
            else {
                jsonObjectTemplate = TemplateLibrary.getJSONObjectLocalScript(this.getGraphContext(), iUid);
                result = this.isLocalTemplatable();
                result = result && jsonScript === JSON.stringify(jsonObjectTemplate);
            }
            if (result) {
                var TemplateScriptBlock = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateScriptBlock');
                TemplateScriptBlock.prototype.template.call(this, iUid); // TODO:!!!!
                var event_1 = new Events.BlockTemplateChangeEvent();
                event_1.block = this;
                event_1.index = this.getIndex();
                this.dispatchEvent(event_1);
            }
            return result;
        };
        /**
         * Is name settable.
         * @private
         * @param {string} [iName] The name to check.
         * @return {boolean} True if name is settable, false otherwise.
         */
        ScriptBlock.prototype.isNameSettable = function (iName) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (arguments.length !== 0) {
                result = result && typeof iName === 'string';
                result = result && iName.length !== 0;
                result = result && iName !== this.name;
            }
            return result;
        };
        /**
         * Is description settable.
         * @private
         * @param {string} [iDescription] The description to check.
         * @return {boolean} True if description is settable, false otherwise.
         */
        ScriptBlock.prototype.isDescriptionSettable = function (iDescription) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            if (arguments.length !== 0) {
                result = result && typeof iDescription === 'string';
                result = result && iDescription.length !== 0;
                result = result && iDescription !== this.description;
            }
            return result;
        };
        /**
         * Get script language.
         * @private
         * @return {EP.EScriptLanguage} The script language.
         */
        ScriptBlock.prototype.getScriptLanguage = function () {
            return this.scriptLanguage;
        };
        /**
         * Set script language.
         * @private
         * @param {EP.EScriptLanguage} iScriptLanguage - The script language to set.
         * @return {boolean} True if the script language was set, false otherwise.
         */
        ScriptBlock.prototype.setScriptLanguage = function (iScriptLanguage) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && this.scriptLanguage === undefined;
            result = result && Object.keys(Enums.EScriptLanguage).some(function (key) { return Enums.EScriptLanguage[key] === iScriptLanguage; });
            if (result) {
                this.scriptLanguage = iScriptLanguage;
            }
            return result;
        };
        /**
         * Get script content.
         * @private
         * @return {string} The script content.
         */
        ScriptBlock.prototype.getScriptContent = function () {
            return this.scriptContent;
        };
        /**
         * Is script content settable.
         * @private
         * @param {string} [iScriptContent] The script content to check.
         * @return {boolean} True if script content is settable, false otherwise.
         */
        ScriptBlock.prototype.isScriptContentSettable = function (iScriptContent) {
            var result = !this.isTemplate();
            result = result && !this.isFromTemplate();
            result = result && this.scriptLanguage !== undefined;
            if (arguments.length !== 0) {
                result = result && typeof iScriptContent === 'string';
                result = result && this.scriptContent !== iScriptContent;
            }
            return result;
        };
        /**
         * Set script content.
         * @private
         * @param {string} iScriptContent - The script content to set.
         * @return {boolean} True if script content was set, false otherwise.
         */
        ScriptBlock.prototype.setScriptContent = function (iScriptContent) {
            var result = arguments.length === 1;
            result = result && this.isScriptContentSettable(iScriptContent);
            if (result) {
                this.scriptContent = iScriptContent;
                var event_2 = new Events.BlockScriptContentChangeEvent();
                event_2.block = this;
                event_2.index = this.getIndex();
                event_2.scriptContent = this.scriptContent;
                this.dispatchEvent(event_2);
            }
            return result;
        };
        return ScriptBlock;
    }(DynamicBlock));
    return ScriptBlock;
});
