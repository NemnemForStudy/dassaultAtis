/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleDataPort'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleDataPort", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVSinglePort"], function (require, exports, UIDataGridView, UIFontIcon, UIWUXTools, UIDGVTools, UINLS, ModelEnums, WUXTreeNodeModel) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view single data port.
     * @class UIDGVSingleDataPort
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleDataPort
     * @extends UIDataGridView
     * @private
     */
    var UIDGVSingleDataPort = /** @class */ (function (_super) {
        __extends(UIDGVSingleDataPort, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         * @param {string} path - The data port model path.
         */
        function UIDGVSingleDataPort(editor, blockModel, path) {
            var _this = _super.call(this, {
                className: ['sch-datagridview-single-port', 'sch-datagridview-single-data-port'],
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: false,
                columnDragEnabledFlag: false,
                rowsHeader: false,
                cellActivationFeedback: 'none',
                cellSelection: 'none',
                cellPreselectionFeedback: 'row',
                rowSelection: 'none'
                //onContextualEvent: () => []
            }) || this;
            _this._resetPortIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools', func: 'onResetPortButtonClick' };
            _this._editor = editor;
            _this._blockModel = blockModel;
            _this._dataPortPath = path;
            _this._dataPort = _this._blockModel.getObjectFromPath(_this._dataPortPath);
            _this._registerTypeRepresentation();
            _this._updateContent();
            // Update Default value column title
            if (_this._editor.getTraceController().getPlayingState()) {
                var defaultValueColumn = _this._dataGridView.columns.find(function (column) { return column.dataIndex === 'defaultValue'; });
                defaultValueColumn.text = UINLS.get('treeListColumnPlayValue');
            }
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
        UIDGVSingleDataPort.prototype.remove = function () {
            _super.prototype.remove.call(this); // Parent class removes the tree document and triggers some callbacks!
            this._editor = undefined;
            this._blockModel = undefined;
            this._dataPortPath = undefined;
            this._dataPort = undefined;
            this._resetPortIconCB = undefined;
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
         * @override
         */
        UIDGVSingleDataPort.prototype._defineColumns = function () {
            this._defineNameColumn();
            this._defineValueTypeColumn();
            this._defineDefaultValueColumn();
            this._defineResetColumn();
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
         * Defines the data grid view name column.
         * @private
         */
        UIDGVSingleDataPort.prototype._defineNameColumn = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'tree',
                text: UINLS.get('treeListColumnName'),
                typeRepresentation: 'string',
                editionPolicy: 'EditionOnOver',
                sortableFlag: false,
                getCellEditableState: function (cellInfos) { return UIDGVTools.getDataItemNameCellEditableState(_this._editor, cellInfos, _this._dataPort); },
                setCellValue: function (cellInfos, newName) { return UIDGVTools.setDataItemNameCellValue(cellInfos, _this._dataPort, newName); }
            });
        };
        /**
         * Defines the data grid view value type column.
         * @private
         */
        UIDGVSingleDataPort.prototype._defineValueTypeColumn = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'valueType',
                text: UINLS.get('treeListColumnValueType'),
                typeRepresentation: 'valueTypeCombo',
                editionPolicy: 'EditionOnOver',
                sortableFlag: false,
                getCellEditableState: function (cellInfos) { return UIDGVTools.getDataItemValueTypeCellEditableState(_this._editor, cellInfos, _this._dataPort); },
                getCellSemantics: function (cellInfos) { return UIDGVTools.getDataItemValueTypeSemantics(_this._editor, cellInfos, _this._dataPort); },
                setCellValue: function (cellInfos, newValueType) { return UIDGVTools.setDataItemValueTypeCellValue(cellInfos, _this._dataPort, newValueType); }
            });
        };
        /**
         * Defines the data grid view default value column.
         * @private
         */
        UIDGVSingleDataPort.prototype._defineDefaultValueColumn = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'defaultValue',
                text: UINLS.get('treeListColumnDefaultValue'),
                typeRepresentation: 'string',
                editionPolicy: 'EditionOnOver',
                alignment: 'near',
                sortableFlag: false,
                getCellEditableState: function (cellInfos) { return UIDGVTools.getDataItemDefaultValueCellEditableState(_this._editor, cellInfos, _this._dataPort); },
                getCellTypeRepresentation: function (cellInfos) { return UIDGVTools.getDataItemDefaultValueCellTypeRepresentation(cellInfos); },
                getCellValue: function (cellInfos) { return UIDGVTools.getDataItemDefaultValueCellValue(_this._editor, cellInfos, _this._dataPort); },
                setCellValue: function (cellInfos, newDefaultValue) { return UIDGVTools.setDataItemDefaultValueCellValue(_this._editor, cellInfos, _this._dataPort, newDefaultValue); },
                getCellClassName: function (cellInfos) { return UIDGVTools.getDataPortDefaultValueCellClassName(_this._editor, cellInfos, _this._dataPort); }
            });
        };
        /**
         * Defines the data grid view reset column.
         * @private
         */
        UIDGVSingleDataPort.prototype._defineResetColumn = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'reset',
                text: UINLS.get('treeListColumnReset'),
                typeRepresentation: 'resetFunction',
                editionPolicy: 'EditionOnOver',
                width: 40,
                minWidth: 40,
                alignment: 'center',
                sortableFlag: false,
                getCellClassName: function (cellInfos) { return UIDGVTools.getDataItemResetCellClassName(_this._editor, cellInfos, _this._dataPort); },
                getCellTooltip: function (cellInfos) {
                    var tooltip;
                    if (cellInfos.nodeModel) {
                        tooltip = UIWUXTools.createTooltip({
                            title: UINLS.get('resetDefaultValueTitle'),
                            shortHelp: UINLS.get('resetDefaultValueShortHelp'),
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                }
            });
        };
        /**
         * Register the specific type representation.
         * @private
         */
        UIDGVSingleDataPort.prototype._registerTypeRepresentation = function () {
            var typeReps = {
                resetFunction: {
                    stdTemplate: 'functionIcon',
                    semantics: { icon: UIFontIcon.getWUX3DSIconDefinition('reset') }
                }
            };
            var typeRepFactory = this._dataGridView.getTypeRepresentationFactory();
            typeRepFactory.registerTypeRepresentations(JSON.stringify(typeReps));
        };
        /**
         * Updates the data grid view content.
         * @private
         */
        UIDGVSingleDataPort.prototype._updateContent = function () {
            if (UIDGVTools.isReadOnlyRoot(this._editor, this._dataPort)) {
                var defaultValueColumn = this._dataGridView.columns.find(function (column) { return column.dataIndex === 'defaultValue'; });
                defaultValueColumn.text = UINLS.get('treeListColumnCSIDefaultValue');
            }
            var hideDefaultValueColumn = this._dataPort.getType() === ModelEnums.EDataPortType.eOutput;
            var hideResetColumn = hideDefaultValueColumn || this._dataPort.dataPort !== undefined; // Can't reset value on sub data port!
            this._dataGridView.layout.setColumnVisibleFlag('defaultValue', !hideDefaultValueColumn);
            this._dataGridView.layout.setColumnVisibleFlag('reset', !hideResetColumn);
            var nodeModel = new WUXTreeNodeModel({
                label: this._dataPort.getName(),
                grid: {
                    dataPort: this._dataPort,
                    valueType: this._dataPort.getValueType(),
                    defaultValue: this._dataPort.getDefaultValue(),
                    reset: this._resetPortIconCB,
                    fromDebug: false
                }
            });
            this._treeDocument.addRoot(nodeModel);
        };
        return UIDGVSingleDataPort;
    }(UIDataGridView));
    return UIDGVSingleDataPort;
});
