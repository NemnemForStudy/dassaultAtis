/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVEditorSettings'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVEditorSettings", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools"], function (require, exports, UIDataGridView, UINLS, UIWUXTools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view editor settings.
     * @class UIDGVEditorSettings
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVEditorSettings
     * @extends UIDataGridView
     * @private
     */
    var UIDGVEditorSettings = /** @class */ (function (_super) {
        __extends(UIDGVEditorSettings, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIDGVEditorSettings(editor) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-editor-settings',
                columnDragEnabledFlag: false,
                showAlternateBackgroundFlag: false,
                showCellActivationFlag: false,
                showCellPreselectionFlag: false,
                cellSelection: 'none',
                rowSelection: 'single',
                showRowBorderFlag: true,
                //cellActivationFeedback: 'none'
                placeholder: '',
                rowsHeader: false,
                defaultColumnDef: {
                    width: 'auto',
                    typeRepresentation: 'string'
                }
            }) || this;
            _this._editor = editor;
            _this._readSettingValues();
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
        UIDGVEditorSettings.prototype.remove = function () {
            this._editor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Writes the setting values.
         * @private
         */
        UIDGVEditorSettings.prototype.writeSettingValues = function () {
            var roots = this.getTreeDocument().getRoots();
            if (roots.length > 0) {
                var localStorageController = this._editor.getLocalStorageController();
                localStorageController.setMaxSplitDataPortCountEditorSetting(roots[0].getAttributeValue('settingValue'));
                localStorageController.setAlwaysMinimizeDataLinksSetting(roots[1].getAttributeValue('settingValue'));
            }
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
         * Defines the data grid view columns.
         * @protected
         */
        UIDGVEditorSettings.prototype._defineColumns = function () {
            _super.prototype._defineColumns.call(this);
            this._defineSettingNameColumn();
            this._defineSettingValueColumn();
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
         * Defines the setting name column.
         * @private
         */
        UIDGVEditorSettings.prototype._defineSettingNameColumn = function () {
            this._columns.push({
                dataIndex: 'settingName',
                text: 'Setting',
                sortableFlag: true,
                editableFlag: false,
                typeRepresentation: 'string',
                getCellClassName: function () { return 'sch-dgv-settings-name'; },
                getCellTooltip: function (cellInfos) {
                    var tooltip = {};
                    if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options) {
                        tooltip = cellInfos.nodeModel.options.tooltip || {};
                    }
                    return tooltip;
                }
            });
        };
        /**
         * Defines the setting value column.
         * @private
         */
        UIDGVEditorSettings.prototype._defineSettingValueColumn = function () {
            this._columns.push({
                dataIndex: 'settingValue',
                text: 'Value',
                sortableFlag: true,
                editableFlag: true,
                alignment: 'near',
                //editionPolicy: 'EditionInPlace',
                editionPolicy: 'EditionOnOver',
                getCellClassName: function () { return 'sch-dgv-settings-value'; },
                getCellTypeRepresentation: function (cellInfos) {
                    var typeRepresentation = 'string';
                    if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options) {
                        typeRepresentation = cellInfos.nodeModel.options.typeRepresentation || 'string';
                    }
                    return typeRepresentation;
                }
            });
        };
        /**
         * Reads the setting values.
         * @private
         */
        UIDGVEditorSettings.prototype._readSettingValues = function () {
            this._addTreeNodeModel({
                label: 'maxSplitDataPortCount',
                grid: {
                    settingName: UINLS.get('settingNameMaxSplit'),
                    settingValue: this._editor.getLocalStorageController().getMaxSplitDataPortCountEditorSetting()
                },
                typeRepresentation: 'integer',
                tooltip: UIWUXTools.createTooltip({
                    title: UINLS.get('settingTitleMaxSplit'),
                    shortHelp: UINLS.get('settingShortHelpMaxSplit'),
                    longHelp: UINLS.get('settingLongHelpMaxSplit')
                })
            });
            this._addTreeNodeModel({
                label: 'alwaysMinimizeDataLinks',
                grid: {
                    settingName: UINLS.get('alwaysMinimizeDataLinksSettingName'),
                    settingValue: this._editor.getLocalStorageController().getAlwaysMinimizeDataLinksSetting()
                },
                typeRepresentation: 'boolean',
                tooltip: UIWUXTools.createTooltip({
                    title: UINLS.get('alwaysMinimizeDataLinksSettingTooltipTitle'),
                    shortHelp: UINLS.get('alwaysMinimizeDataLinksSettingTooltipShortHelp'),
                    longHelp: UINLS.get('alwaysMinimizeDataLinksSettingTooltipLongHelp')
                })
            });
        };
        return UIDGVEditorSettings;
    }(UIDataGridView));
    return UIDGVEditorSettings;
});
