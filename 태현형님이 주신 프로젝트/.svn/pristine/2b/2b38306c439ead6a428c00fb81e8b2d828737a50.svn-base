/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsTemplateScriptBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsTemplateScriptBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary"], function (require, exports, Block, ScriptBlock, Events, Tools, BlockLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var TemplateScriptBlock = /** @class */ (function (_super) {
        __extends(TemplateScriptBlock, _super);
        /**
         * @constructor
         * @param {string} iUID - The template UID.
         * @param {GraphBlock} iGraphContext - The graph context.
         */
        function TemplateScriptBlock(iUID, iGraphContext) {
            var _this = _super.call(this) || this;
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            _this.jsonObjectScript = TemplateLibrary.getJSONObjectScript(iUID) || TemplateLibrary.getJSONObjectLocalScript(iGraphContext, iUID);
            _this.ScriptBlockCtor = BlockLibrary.getBlock(_this.jsonObjectScript.definition.uid).constructor;
            _this.ScriptBlockCtor();
            _this.onTemplateChangeBind = undefined;
            return _this;
        }
        /**
         * Construct template script block from JSON.
         * @private
         * @param {IJSONBlock} iJSONTemplateScriptBlock - The JSON template script block.
         */
        TemplateScriptBlock.prototype.fromJSON = function (iJSONTemplateScriptBlock) {
            Block.prototype.fromJSON.call(this, iJSONTemplateScriptBlock);
        };
        /**
         * Construct JSON from template script block.
         * @private
         * @param {IJSONBlock} oJSONTemplateScriptBlock - The JSON template script block.
         */
        TemplateScriptBlock.prototype.toJSON = function (oJSONTemplateScriptBlock) {
            Block.prototype.toJSON.call(this, oJSONTemplateScriptBlock);
        };
        TemplateScriptBlock.prototype._update = function () {
            var jsonObjectTemplateScriptBlock = {};
            this.toJSON(jsonObjectTemplateScriptBlock);
            var uid = this.uid;
            delete this.uid;
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            this.jsonObjectScript = TemplateLibrary.getJSONObjectScript(uid) || TemplateLibrary.getJSONObjectLocalScript(this.getGraphContext(), uid);
            this.ScriptBlockCtor = BlockLibrary.getBlock(this.jsonObjectScript.definition.uid).constructor;
            this.ScriptBlockCtor.prototype.fromJSON.call(this, this.jsonObjectScript);
            this._templateDataPorts();
            this._templateSettings();
            this.uid = uid;
            this.fromJSON(jsonObjectTemplateScriptBlock);
        };
        TemplateScriptBlock.prototype._templateDataPorts = function () {
            var dataPorts = this.getDataPorts();
            for (var dp = 0; dp < dataPorts.length; dp++) {
                var dataPort = dataPorts[dp];
                if (dataPort.isOverride()) {
                    dataPort.defaultValues[dataPort.getValueType()] = dataPort.getDefaultValue();
                    dataPort.resetDefaultValue();
                }
            }
        };
        TemplateScriptBlock.prototype._untemplateDataPorts = function () {
            var dataPorts = this.getDataPorts();
            for (var dp = 0; dp < dataPorts.length; dp++) {
                var dataPort = dataPorts[dp];
                var jsonDataPort = this.jsonObjectScript.dataPorts[dp];
                if (jsonDataPort.override) {
                    var blockDefinition = BlockLibrary.getBlock(this.ScriptBlockCtor.prototype.uid);
                    var dataPortDefinition = blockDefinition.dataPorts[dataPort.getIndex()] || this.dataPortRules[dataPort.getType()];
                    dataPort.defaultValues = Tools.copyValue(dataPortDefinition.defaultValues);
                    dataPort.setDefaultValue(dataPort.getDefaultValue());
                }
            }
        };
        TemplateScriptBlock.prototype._templateSettings = function () {
            var settings = this.getSettings();
            for (var s = 0; s < settings.length; s++) {
                var setting = settings[s];
                if (setting.isOverride()) {
                    setting.defaultValues[setting.getValueType()] = setting.getValue();
                    setting.resetValue();
                }
            }
        };
        TemplateScriptBlock.prototype._untemplateSettings = function () {
            var settings = this.getSettings();
            for (var s = 0; s < settings.length; s++) {
                var setting = settings[s];
                var jsonSetting = this.jsonObjectScript.settings[s];
                if (jsonSetting.override) {
                    var blockDefinition = BlockLibrary.getBlock(this.ScriptBlockCtor.prototype.uid);
                    var settingDefinition = blockDefinition.settings[setting.getIndex()] || this.settingRules;
                    setting.defaultValues = Tools.copyValue(settingDefinition.defaultValues);
                    setting.setValue(setting.getValue());
                }
            }
        };
        TemplateScriptBlock.prototype.onTemplateChange = function (iEvent) {
            if (this.uid === iEvent.getUid()) {
                this._update();
            }
        };
        /**
         * Is global templatable.
         * @private
         * @return {boolean} True if global templatable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        TemplateScriptBlock.prototype.isGlobalTemplatable = function () {
            return false;
        };
        /**
         * Is local templatable.
         * @private
         * @return {boolean} True if local templatable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        TemplateScriptBlock.prototype.isLocalTemplatable = function () {
            return false;
        };
        /**
         * Is template.
         * @private
         * @return {boolean} True if this is a template, false otherwise.
         */
        TemplateScriptBlock.prototype.isTemplate = function () {
            var result = this.hasOwnProperty('uid');
            return result;
        };
        /**
         * Is global template.
         * @private
         * @return {boolean} True this is a global template, false otherwise.
         */
        TemplateScriptBlock.prototype.isGlobalTemplate = function () {
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            var result = this.isTemplate();
            result = result && TemplateLibrary.hasScript(this.uid);
            return result;
        };
        /**
         * Is local template.
         * @private
         * @return {boolean} True if this is a local template, false otherwise.
         */
        TemplateScriptBlock.prototype.isLocalTemplate = function () {
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            var result = this.isTemplate();
            result = result && TemplateLibrary.hasLocalScript(this.getGraphContext(), this.uid);
            return result;
        };
        /**
         * Template.
         * @private
         * @param {string} iUID - The UID.
         * @return {boolean} True if the block has been templated, false otherwise.
         */
        TemplateScriptBlock.prototype.template = function (iUID) {
            var result = !this.isTemplate();
            if (result) {
                var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
                if (Object.getPrototypeOf(this) === TemplateScriptBlock.prototype) {
                    this.ScriptBlockCtor.prototype.fromJSON.call(this, this.jsonObjectScript);
                }
                else {
                    this.jsonObjectScript = TemplateLibrary.getJSONObjectScript(iUID) || TemplateLibrary.getJSONObjectLocalScript(this.getGraphContext(), iUID);
                    this.ScriptBlockCtor = BlockLibrary.getBlock(this.jsonObjectScript.definition.uid).constructor;
                    this.name = this.getName();
                    Object.setPrototypeOf(this, TemplateScriptBlock.prototype);
                }
                this._templateDataPorts();
                this._templateSettings();
                this.uid = iUID;
                this.onTemplateChangeBind = this.onTemplateChange.bind(this);
                TemplateLibrary.addListener(Events.TemplateLibraryScriptChangeEvent, this.onTemplateChangeBind);
                this.getGraphContext().localTemplateLibrary.addListener(Events.TemplateLibraryScriptChangeEvent, this.onTemplateChangeBind);
            }
            return result;
        };
        /**
         * Untemplate.
         * @private
         * @return {boolean} True if the block has been untemplate, false otherwise.
         */
        TemplateScriptBlock.prototype.untemplate = function () {
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            TemplateLibrary.removeListener(Events.TemplateLibraryScriptChangeEvent, this.onTemplateChangeBind);
            this.getGraphContext().localTemplateLibrary.removeListener(Events.TemplateLibraryScriptChangeEvent, this.onTemplateChangeBind);
            this._untemplateDataPorts();
            this._untemplateSettings();
            Object.setPrototypeOf(this, this.ScriptBlockCtor.prototype);
            delete this.onTemplateChangeBind;
            delete this.jsonObjectScript;
            delete this.ScriptBlockCtor;
            delete this.uid;
            var event = new Events.BlockTemplateChangeEvent();
            event.block = this;
            event.index = this.getIndex();
            this.dispatchEvent(event);
            return true;
        };
        /**
         * Is from template.
         * @private
         * @return {boolean} True if is from template, false otherwise.
         */
        TemplateScriptBlock.prototype.isFromTemplate = function () {
            var result = this.isTemplate();
            result = result && this.ScriptBlockCtor.prototype.isFromTemplate.call(this);
            return result;
        };
        /**
         * Has definition.
         * @private
         * @return {boolean} True if block has definition, false otherwise.
         */
        TemplateScriptBlock.prototype.hasDefinition = function () {
            var result = true;
            if (!this.isTemplate()) {
                result = this.ScriptBlockCtor.prototype.hasDefinition();
            }
            return result;
        };
        /**
         * Get definition.
         * @private
         * @return {Block} The definition.
         */
        TemplateScriptBlock.prototype.getDefinition = function () {
            var definition = this;
            if (!this.isTemplate()) {
                definition = this.ScriptBlockCtor.prototype.getDefinition();
            }
            return definition;
        };
        return TemplateScriptBlock;
    }(ScriptBlock));
    return TemplateScriptBlock;
});
