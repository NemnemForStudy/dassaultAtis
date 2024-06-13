/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings'/>
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractDataItem", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel"], function (require, exports, UIDGVAbstractDataItem, UIWUXTools, UIDGVTools, UINLS, Events, WUXTreeNodeModel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view settings.
     * @class UIDGVSettings
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings
     * @extends UIDGVAbstractDataItem
     * @private
     */
    var UIDGVSettings = /** @class */ (function (_super) {
        __extends(UIDGVSettings, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         */
        function UIDGVSettings(editor, blockModel) {
            var _this = _super.call(this, { className: 'sch-datagridview-settings' }, editor, blockModel) || this;
            _this._onSettingAddCB = _this._onSettingAdd.bind(_this);
            _this._onSettingRemoveCB = _this._onSettingRemove.bind(_this);
            _this._onSettingValueChangeCB = _this._onSettingValueChange.bind(_this);
            _this._onSettingOverrideChangeCB = _this._onSettingOverrideChange.bind(_this);
            _this._addItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings', func: '_onAddSettingButtonClick' };
            _this._deleteItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings', func: '_onDeleteSettingButtonClick' };
            _this._resetItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSettings', func: '_onResetSettingButtonClick' };
            _this._updateContent();
            _this._blockModel.addListener(Events.SettingAddEvent, _this._onSettingAddCB);
            _this._blockModel.addListener(Events.SettingRemoveEvent, _this._onSettingRemoveCB);
            return _this;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the data grid view.
         * @public
         */
        UIDGVSettings.prototype.remove = function () {
            var _this = this;
            this._blockModel.removeListener(Events.SettingAddEvent, this._onSettingAddCB);
            this._blockModel.removeListener(Events.SettingRemoveEvent, this._onSettingRemoveCB);
            this._blockModel.getSettings().forEach(function (setting) {
                setting.removeListener(Events.SettingValueChangeEvent, _this._onSettingValueChangeCB);
                setting.removeListener(Events.SettingOverrideChangeEvent, _this._onSettingOverrideChangeCB);
            });
            _super.prototype.remove.call(this); // Parent class removes the tree document and triggers some callbacks!
            this._settingsSectionNodeModel = undefined;
            this._onSettingAddCB = undefined;
            this._onSettingRemoveCB = undefined;
            this._onSettingValueChangeCB = undefined;
            this._onSettingOverrideChangeCB = undefined;
        };
        /**
         * Gets the settings section node model.
         * @public
         * @returns {WUXTreeNodeModel} The settings section node model.
         */
        UIDGVSettings.prototype.getSettingsSectionNodeModel = function () {
            return this._settingsSectionNodeModel;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Gets the name cell editable state.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} - The name cell editable state.
         */
        UIDGVSettings.prototype._getNameCellEditableState = function (cellInfos) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemNameCellEditableState(this._editor, cellInfos, setting);
        };
        /**
         * Sets the name cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {string} newName - The new name.
         */
        UIDGVSettings.prototype._setNameCellValue = function (cellInfos, newName) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            UIDGVTools.setDataItemNameCellValue(cellInfos, setting, newName);
        };
        /**
         * Gets the value type cell semantics.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {Object} The value type cell semantics.
         */
        UIDGVSettings.prototype._getValueTypeSemantics = function (cellInfos) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemValueTypeSemantics(this._editor, cellInfos, setting);
        };
        /**
         * Gets the value type cell editable state.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} - The value type cell editable state.
         */
        UIDGVSettings.prototype._getValueTypeCellEditableState = function (cellInfos) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemValueTypeCellEditableState(this._editor, cellInfos, setting);
        };
        /**
         * Sets the value type cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {string} newValueType - The new value type.
         */
        UIDGVSettings.prototype._setValueTypeCellValue = function (cellInfos, newValueType) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            UIDGVTools.setDataItemValueTypeCellValue(cellInfos, setting, newValueType);
        };
        /**
         * Gets the default value cell type representation.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The default value cell type representation.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVSettings.prototype._getDefaultValueCellTypeRepresentation = function (cellInfos) {
            return UIDGVTools.getDataItemDefaultValueCellTypeRepresentation(cellInfos);
        };
        /**
         * Gets the default value cell class name.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} The default value cell class name.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVSettings.prototype._getDefaultValueCellClassName = function (cellInfos) {
            var _a;
            var result = ((_a = cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) ? 'sch-dgv-node-root' : '';
            return result;
        };
        /**
         * Gets the default value cell editable state.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} - The default value cell editable state.
         */
        UIDGVSettings.prototype._getDefaultValueCellEditableState = function (cellInfos) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemDefaultValueCellEditableState(this._editor, cellInfos, setting);
        };
        /**
         * Gets the default value cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {*} - The default value cell value.
         */
        UIDGVSettings.prototype._getDefaultValueCellValue = function (cellInfos) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemDefaultValueCellValue(this._editor, cellInfos, setting);
        };
        /**
         * Sets the default value cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {*} newDefaultValue - The new default value.
         */
        UIDGVSettings.prototype._setDefaultValueCellValue = function (cellInfos, newDefaultValue) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            UIDGVTools.setDataItemDefaultValueCellValue(this._editor, cellInfos, setting, newDefaultValue);
        };
        /**
         * Gets the reset cell class name.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} The reset cell class name.
         */
        UIDGVSettings.prototype._getResetCellClassName = function (cellInfos) {
            var setting = this._getSettingFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemResetCellClassName(this._editor, cellInfos, setting);
        };
        /**
         * Gets the action cell tooltip.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {Object} The action cell tooltip.
         */
        UIDGVSettings.prototype._getActionCellTooltip = function (cellInfos) {
            var _a;
            var tooltip;
            var action = (_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('action');
            if (action) {
                var isActionAdd = action === this._addItemFunctionIconCB;
                var title = UINLS.get(isActionAdd ? 'createSettingTitle' : 'deleteSettingTitle');
                var shortHelp = UINLS.get(isActionAdd ? 'createSettingShortHelp' : 'deleteSettingShortHelp');
                tooltip = UIWUXTools.createTooltip({
                    title: title,
                    shortHelp: shortHelp,
                    initialDelay: 500
                });
            }
            return tooltip;
        };
        /**
         * The callback on the add setting button click event.
         * @protected
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVSettings._onAddSettingButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var block = nodeModel.getAttributeValue('block');
                block.createDynamicSetting();
            }
        };
        /**
         * The callback on the delete setting button click event.
         * @protected
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVSettings._onDeleteSettingButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var setting = nodeModel.getAttributeValue('setting');
                if (setting.block.isSettingRemovable(setting)) {
                    setting.block.removeSetting(setting);
                }
            }
        };
        /**
         * The callback on the reset setting button click event.
         * @protected
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVSettings._onResetSettingButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var setting = nodeModel.getAttributeValue('setting');
                setting.resetValue();
                nodeModel.updateOptions({ grid: { defaultValue: setting.getValue() } });
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Updates the data grid view content.
         * @private
         */
        UIDGVSettings.prototype._updateContent = function () {
            var _this = this;
            this._settingsSectionNodeModel = new WUXTreeNodeModel({
                grid: __assign({ block: this._blockModel }, (this._blockModel.isSettingTypeAddable() && { action: this._addItemFunctionIconCB }))
            });
            this._treeDocument.addRoot(this._settingsSectionNodeModel);
            var settings = this._blockModel.getSettings();
            settings.forEach(function (setting) { return _this._createSettingNodeModel(setting); });
            this._updateSectionNodeModelLabel();
        };
        /**
         * Creates a setting node model.
         * @private
         * @param {Setting} setting - The setting model.
         * @returns {WUXTreeNodeModel} The created setting node model.
         */
        UIDGVSettings.prototype._createSettingNodeModel = function (setting) {
            var nodeModel = new WUXTreeNodeModel({
                label: setting.getName(),
                grid: __assign({ setting: setting, valueType: setting.getValueType(), defaultValue: setting.getValue(), reset: this._resetItemFunctionIconCB }, (this._blockModel.isSettingRemovable(setting) && { action: this._deleteItemFunctionIconCB }))
            });
            this._settingsSectionNodeModel.addChild(nodeModel);
            this._settingsSectionNodeModel.expand();
            this._updateSectionNodeModelLabel();
            setting.addListener(Events.SettingValueChangeEvent, this._onSettingValueChangeCB);
            setting.addListener(Events.SettingOverrideChangeEvent, this._onSettingOverrideChangeCB);
            return nodeModel;
        };
        /**
         * Updates the setting section node model label.
         * @private
         */
        UIDGVSettings.prototype._updateSectionNodeModelLabel = function () {
            var _a;
            var label = UINLS.get('categorySettings') + ' (' + (((_a = this._settingsSectionNodeModel.getChildren()) === null || _a === void 0 ? void 0 : _a.length) || 0) + ')';
            this._settingsSectionNodeModel.setLabel(label);
        };
        /**
         * Gets the setting from the provided WUX cell infos.
         * @private
         * @param {IWUXCellInfos} cellInfos - The WUX cell infos.
         * @returns {Setting} The setting.
         */
        UIDGVSettings.prototype._getSettingFromCellInfos = function (cellInfos) {
            var setting;
            if (cellInfos.nodeModel && !cellInfos.nodeModel.isRoot()) {
                var settingName = cellInfos.nodeModel.getLabel();
                setting = this._blockModel.getSettingByName(settingName);
            }
            return setting;
        };
        /**
          * The callback on the model setting add event.
          * @private
          * @param {Events.SettingAddEvent} event - The model setting add event.
          */
        UIDGVSettings.prototype._onSettingAdd = function (event) {
            var setting = event.getSetting();
            this._createSettingNodeModel(setting);
        };
        /**
         * The callback on the model setting remove event.
         * @private
         * @param {Events.DataPortRemoveEvent} event - The model setting remove event.
         */
        UIDGVSettings.prototype._onSettingRemove = function (event) {
            var setting = event.getSetting();
            setting.removeListener(Events.SettingValueChangeEvent, this._onSettingValueChangeCB);
            setting.removeListener(Events.SettingOverrideChangeEvent, this._onSettingOverrideChangeCB);
            var childrenNodeModel = this._settingsSectionNodeModel.getChildren() || [];
            var settingNodeModel = childrenNodeModel.find(function (node) { return node.getAttributeValue('setting') === setting; });
            if (settingNodeModel) {
                this._settingsSectionNodeModel.removeChild(settingNodeModel);
            }
            this._updateSectionNodeModelLabel();
        };
        /**
         * The callback on the model setting value change event.
         * @private
         * @param {Events.SettingValueChangeEvent} event - The model setting value change event.
         */
        UIDGVSettings.prototype._onSettingValueChange = function (event) {
            var setting = event.getSetting();
            var nodeModel = this._getNodeModelFromSettingModel(setting);
            if (nodeModel) {
                var valueType = setting.getValueType();
                nodeModel.setAttribute('valueType', valueType);
                var defaultValue = setting.getValue();
                nodeModel.setAttribute('defaultValue', defaultValue);
            }
        };
        /**
         * The callback on the model setting override change event.
         * @private
         * @param {Events.SettingOverrideChangeEvent} event - The model setting override change event.
         */
        UIDGVSettings.prototype._onSettingOverrideChange = function (event) {
            var setting = event.getSetting();
            var nodeModel = this._getNodeModelFromSettingModel(setting);
            if (nodeModel) {
                nodeModel.updateOptions({ grid: { reset: this._resetItemFunctionIconCB } });
            }
        };
        /**
         * Gets the node model from the given setting model.
         * @private
         * @param {Setting} setting - The setting model.
         * @returns {WUXTreeNodeModel} The corresponding node model.
         */
        UIDGVSettings.prototype._getNodeModelFromSettingModel = function (setting) {
            return (this._settingsSectionNodeModel.getChildren() || []).find(function (child) { return child.getAttributeValue('setting') === setting; });
        };
        return UIDGVSettings;
    }(UIDGVAbstractDataItem));
    return UIDGVSettings;
});
