/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary"], function (require, exports, Block, DynamicBlock, GraphBlock, Events, Tools, BlockLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var TemplateGraphBlock = /** @class */ (function (_super) {
        __extends(TemplateGraphBlock, _super);
        /**
         * @constructor
         * @param {string} iUID - The template UID.
         * @param {GraphBlock} iGraphContext - The graph context.
         */
        function TemplateGraphBlock(iUID, iGraphContext) {
            var _this = _super.call(this) || this;
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            _this.jsonObjectGraph = TemplateLibrary.getJSONObjectGraph(iUID) || TemplateLibrary.getJSONObjectLocalGraph(iGraphContext, iUID);
            _this.GraphBlockCtor = BlockLibrary.getBlock(_this.jsonObjectGraph.definition.uid).constructor;
            _this.GraphBlockCtor();
            _this.onTemplateChangeBind = undefined;
            _this.expanded = false;
            return _this;
        }
        /**
         * Construct template graph block from JSON.
         * @private
         * @param {IJSONBlock} iJSONTemplateGraphBlock - The template graph block.
         */
        TemplateGraphBlock.prototype.fromJSON = function (iJSONTemplateGraphBlock) {
            Block.prototype.fromJSON.call(this, iJSONTemplateGraphBlock);
        };
        /**
         * Construct JSON from template graph block.
         * @private
         * @param {IJSONBlock} oJSONTemplateGraphBlock - The template graph block.
         */
        TemplateGraphBlock.prototype.toJSON = function (oJSONTemplateGraphBlock) {
            Block.prototype.toJSON.call(this, oJSONTemplateGraphBlock);
        };
        /**
         * Expand.
         * @private
         * @return {boolean} True if the expand has been performed, false otherwise.
         */
        TemplateGraphBlock.prototype.expand = function () {
            var result = !this.expanded;
            if (result) {
                this.expanded = true;
                var uid = this.uid;
                delete this.uid;
                this.fromJSONNodeIdSelectors(this.jsonObjectGraph);
                this.fromJSONBlocks(this.jsonObjectGraph);
                this.fromJSONLinks(this.jsonObjectGraph);
                this.uid = uid;
            }
            return result;
        };
        TemplateGraphBlock.prototype._update = function () {
            var jsonObjectTemplateGraphBlock = {};
            this.toJSON(jsonObjectTemplateGraphBlock);
            var uid = this.uid;
            delete this.uid;
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            this.jsonObjectGraph = TemplateLibrary.getJSONObjectGraph(uid) || TemplateLibrary.getJSONObjectLocalGraph(this.getGraphContext(), uid);
            this.GraphBlockCtor = BlockLibrary.getBlock(this.jsonObjectGraph.definition.uid).constructor;
            if (this.expanded) {
                this.GraphBlockCtor.prototype.fromJSON.call(this, this.jsonObjectGraph);
            }
            else {
                DynamicBlock.prototype.fromJSON.call(this, this.jsonObjectGraph);
                this.fromJSONStartupPort(this.jsonObjectGraph);
            }
            this._templateDataPorts();
            this._templateSettings();
            this.uid = uid;
            this.fromJSON(jsonObjectTemplateGraphBlock);
        };
        TemplateGraphBlock.prototype._templateDataPorts = function () {
            var dataPorts = this.getDataPorts();
            for (var dp = 0; dp < dataPorts.length; dp++) {
                var dataPort = dataPorts[dp];
                if (dataPort.isOverride()) {
                    dataPort.defaultValues[dataPort.getValueType()] = dataPort.getDefaultValue();
                    dataPort.resetDefaultValue();
                }
            }
        };
        TemplateGraphBlock.prototype._untemplateDataPorts = function () {
            var dataPorts = this.getDataPorts();
            for (var dp = 0; dp < dataPorts.length; dp++) {
                var dataPort = dataPorts[dp];
                var jsonDataPort = this.jsonObjectGraph.dataPorts[dp];
                if (jsonDataPort.override) {
                    var blockDefinition = BlockLibrary.getBlock(this.GraphBlockCtor.prototype.uid);
                    var dataPortDefinition = blockDefinition.dataPorts[dataPort.getIndex()] || this.dataPortRules[dataPort.getType()];
                    dataPort.defaultValues = Tools.copyValue(dataPortDefinition.defaultValues);
                    dataPort.setDefaultValue(dataPort.getDefaultValue());
                }
            }
        };
        TemplateGraphBlock.prototype._templateSettings = function () {
            var settings = this.getSettings();
            for (var s = 0; s < settings.length; s++) {
                var setting = settings[s];
                if (setting.isOverride()) {
                    setting.defaultValues[setting.getValueType()] = setting.getValue();
                    setting.resetValue();
                }
            }
        };
        TemplateGraphBlock.prototype._untemplateSettings = function () {
            var settings = this.getSettings();
            for (var s = 0; s < settings.length; s++) {
                var setting = settings[s];
                var jsonSetting = this.jsonObjectGraph.settings[s];
                if (jsonSetting.override) {
                    var blockDefinition = BlockLibrary.getBlock(this.GraphBlockCtor.prototype.uid);
                    var settingDefinition = blockDefinition.settings[setting.getIndex()] || this.settingRules;
                    setting.defaultValues = Tools.copyValue(settingDefinition.defaultValues);
                    setting.setValue(setting.getValue());
                }
            }
        };
        TemplateGraphBlock.prototype.onTemplateChange = function (iEvent) {
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
        TemplateGraphBlock.prototype.isGlobalTemplatable = function () {
            return false;
        };
        /**
         * Is local templatable.
         * @private
         * @return {boolean} True if local templatable, false otherwise.
         */
        // eslint-disable-next-line class-methods-use-this
        TemplateGraphBlock.prototype.isLocalTemplatable = function () {
            return false;
        };
        /**
         * Is template.
         * @private
         * @return {boolean} True if this is a template, false otherwise.
         */
        TemplateGraphBlock.prototype.isTemplate = function () {
            var result = this.hasOwnProperty('uid');
            return result;
        };
        /**
         * Is global template.
         * @private
         * @return {boolean} True this is a global template, false otherwise.
         */
        TemplateGraphBlock.prototype.isGlobalTemplate = function () {
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            var result = this.isTemplate();
            result = result && TemplateLibrary.hasGraph(this.uid);
            return result;
        };
        /**
         * Is local template.
         * @private
         * @return {boolean} True if this is a local template, false otherwise.
         */
        TemplateGraphBlock.prototype.isLocalTemplate = function () {
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            var result = this.isTemplate();
            result = result && TemplateLibrary.hasLocalGraph(this.getGraphContext(), this.uid);
            return result;
        };
        /**
         * Template.
         * @private
         * @param {string} iUid - The Uid.
         * @return {boolean} True if the block has been templated, false otherwise.
         */
        TemplateGraphBlock.prototype.template = function (iUid) {
            var result = !this.isTemplate();
            if (result) {
                var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
                if (Object.getPrototypeOf(this) === TemplateGraphBlock.prototype) {
                    DynamicBlock.prototype.fromJSON.call(this, this.jsonObjectGraph);
                }
                else {
                    this.jsonObjectGraph = TemplateLibrary.getJSONObjectGraph(iUid) || TemplateLibrary.getJSONObjectLocalGraph(this.getGraphContext(), iUid);
                    this.GraphBlockCtor = BlockLibrary.getBlock(this.jsonObjectGraph.definition.uid).constructor;
                    this.expanded = true;
                    Object.setPrototypeOf(this, TemplateGraphBlock.prototype);
                }
                this._templateDataPorts();
                this._templateSettings();
                this.uid = iUid;
                this.onTemplateChangeBind = this.onTemplateChange.bind(this);
                TemplateLibrary.addListener(Events.TemplateLibraryGraphChangeEvent, this.onTemplateChangeBind);
                this.getGraphContext().localTemplateLibrary.addListener(Events.TemplateLibraryGraphChangeEvent, this.onTemplateChangeBind);
            }
            return result;
        };
        /**
         * Untemplate.
         * @private
         * @return {boolean} True if the block has been untemplate, false otherwise.
         */
        TemplateGraphBlock.prototype.untemplate = function () {
            var TemplateLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary');
            TemplateLibrary.removeListener(Events.TemplateLibraryGraphChangeEvent, this.onTemplateChangeBind);
            this.getGraphContext().localTemplateLibrary.removeListener(Events.TemplateLibraryGraphChangeEvent, this.onTemplateChangeBind);
            this._untemplateDataPorts();
            this._untemplateSettings();
            this.expand();
            Object.setPrototypeOf(this, this.GraphBlockCtor.prototype);
            delete this.onTemplateChangeBind;
            delete this.jsonObjectGraph;
            delete this.GraphBlockCtor;
            delete this.expanded;
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
        TemplateGraphBlock.prototype.isFromTemplate = function () {
            var result = this.isTemplate();
            result = result && this.GraphBlockCtor.prototype.isFromTemplate.call(this);
            return result;
        };
        /**
         * Has definition.
         * @private
         * @return {boolean} True if block has definition, false otherwise.
         */
        TemplateGraphBlock.prototype.hasDefinition = function () {
            var result = true;
            if (!this.isTemplate()) {
                result = this.GraphBlockCtor.prototype.hasDefinition();
            }
            return result;
        };
        /**
         * Get definition.
         * @private
         * @return {Block} The definition.
         */
        TemplateGraphBlock.prototype.getDefinition = function () {
            var _a;
            var definition = this;
            if (!this.isTemplate()) {
                definition = (_a = this.GraphBlockCtor) === null || _a === void 0 ? void 0 : _a.prototype.getDefinition();
            }
            return definition;
        };
        /**
         * Get blocks.
         * @private
         * @param {boolean} [expand=true] - True to expand the template, false otherwise.
         * @returns {Block[]} The blocks.
         */
        TemplateGraphBlock.prototype.getBlocks = function (expand) {
            if (expand === void 0) { expand = true; }
            if (expand) {
                this.expand();
            }
            return this.GraphBlockCtor.prototype.getBlocks.call(this);
        };
        /**
         * Get data links.
         * @private
         * @param {boolean} [expand=true] - True to expand the template, false otherwise.
         * @returns {DataLink[]} The data links.
         */
        TemplateGraphBlock.prototype.getDataLinks = function (expand) {
            if (expand === void 0) { expand = true; }
            if (expand) {
                this.expand();
            }
            return this.GraphBlockCtor.prototype.getDataLinks.call(this);
        };
        /**
         * Get control links.
         * @private
         * @param {boolean} [expand=true] - True to expand the template, false otherwise.
         * @returns {ControlLink[]} The control links.
         */
        TemplateGraphBlock.prototype.getControlLinks = function (expand) {
            if (expand === void 0) { expand = true; }
            if (expand) {
                this.expand();
            }
            return this.GraphBlockCtor.prototype.getControlLinks.call(this);
        };
        /**
         * Get nodeId selectors.
         * @private
         * @param {boolean} [expand=true] - True to expand the template, false otherwise.
         * @returns {NodeIdSelector[]} The NodeId selectors.
         */
        TemplateGraphBlock.prototype.getNodeIdSelectors = function (expand) {
            if (expand === void 0) { expand = true; }
            if (expand) {
                this.expand();
            }
            return this.GraphBlockCtor.prototype.getNodeIdSelectors.call(this);
        };
        /**
         * Get objects by type.
         * @private
         * @param {IBlockElementsByType} [ioObjectsByType] - The objects by type.
         * @return {IBlockElementsByType} The objects by type.
         */
        TemplateGraphBlock.prototype.getObjectsByType = function (ioObjectsByType) {
            return DynamicBlock.prototype.getObjectsByType.call(this, ioObjectsByType);
        };
        /**
         * Get blocks by uid.
         * @private
         * @param {IBlocksByUid} [ioBlocksByUid] - The blocks by Uid.
         * @return {IBlocksByUid} The blocks by Uid.
         */
        TemplateGraphBlock.prototype.getBlocksByUid = function (ioBlocksByUid) {
            return DynamicBlock.prototype.getBlocksByUid.call(this, ioBlocksByUid);
        };
        return TemplateGraphBlock;
    }(GraphBlock));
    TemplateGraphBlock.prototype.isExportable = DynamicBlock.prototype.isExportable;
    TemplateGraphBlock.prototype.exportContent = DynamicBlock.prototype.exportContent;
    TemplateGraphBlock.prototype.exportFileName = DynamicBlock.prototype.exportFileName;
    return TemplateGraphBlock;
});
