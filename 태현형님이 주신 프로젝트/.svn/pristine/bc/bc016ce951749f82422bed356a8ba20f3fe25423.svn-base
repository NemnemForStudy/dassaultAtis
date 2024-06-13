/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractDataItem'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractDataItem", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractModelItem", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVAbstractDataItem"], function (require, exports, UIDGVAbstractModelItem, UINLS, UIFontIcon, UIWUXTools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view abstract data item.
     * This is the base class for data port and settings DGV.
     * @class UIDGVAbstractDataItem
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractDataItem
     * @extends UIDGVAbstractModelItem
     * @abstract
     * @private
     */
    var UIDGVAbstractDataItem = /** @class */ (function (_super) {
        __extends(UIDGVAbstractDataItem, _super);
        /**
         * @constructor
         * @param {IWUXDataGridViewOptions} options - The data grid view options.
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         */
        function UIDGVAbstractDataItem(options, editor, blockModel) {
            return _super.call(this, UIDGVAbstractModelItem._mergeDataGridViewOptions({ className: 'sch-datagridview-abstract-data-item' }, options), editor, blockModel) || this;
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
        UIDGVAbstractDataItem.prototype.remove = function () {
            _super.prototype.remove.call(this); // Parent class removes the tree document and triggers some callbacks!
            this._resetItemFunctionIconCB = undefined;
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
        UIDGVAbstractDataItem.prototype._defineColumns = function () {
            this._defineNameColumn();
            this._defineValueTypeColumn();
            this._defineDefaultValueColumn();
            this._defineResetColumn();
            this._defineActionColumn();
        };
        /**
         * Registers the specific type representation.
         * @protected
         */
        UIDGVAbstractDataItem.prototype._registerTypeRepresentation = function () {
            _super.prototype._registerTypeRepresentation.call(this);
            var typeReps = {
                resetFunction: {
                    stdTemplate: 'functionIcon',
                    semantics: { icon: UIFontIcon.getWUX3DSIconDefinition('reset') }
                }
            };
            var typeRepFactory = this._dataGridView.getTypeRepresentationFactory();
            typeRepFactory.registerTypeRepresentations(JSON.stringify(typeReps));
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
         * Defines the data grid view value type column.
         * @private
         */
        UIDGVAbstractDataItem.prototype._defineValueTypeColumn = function () {
            this._columns.push({
                dataIndex: 'valueType',
                text: UINLS.get('treeListColumnValueType'),
                typeRepresentation: 'valueTypeCombo',
                editionPolicy: 'EditionOnOver',
                visibleFlag: true,
                sortableFlag: true,
                getCellClassName: function (cellInfos) { var _a; return ((_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) ? 'sch-dgv-node-root' : ''; },
                getCellSemantics: this._getValueTypeSemantics.bind(this),
                getCellEditableState: this._getValueTypeCellEditableState.bind(this),
                setCellValue: this._setValueTypeCellValue.bind(this)
            });
        };
        /**
         * Defines the data grid view default value column.
         * @private
         */
        UIDGVAbstractDataItem.prototype._defineDefaultValueColumn = function () {
            this._columns.push({
                dataIndex: 'defaultValue',
                text: UINLS.get('treeListColumnDefaultValue'),
                typeRepresentation: 'string',
                editionPolicy: 'EditionOnOver',
                alignment: 'near',
                visibleFlag: true,
                sortableFlag: true,
                getCellClassName: this._getDefaultValueCellClassName.bind(this),
                getCellTypeRepresentation: this._getDefaultValueCellTypeRepresentation.bind(this),
                getCellEditableState: this._getDefaultValueCellEditableState.bind(this),
                getCellValue: this._getDefaultValueCellValue.bind(this),
                setCellValue: this._setDefaultValueCellValue.bind(this)
            });
        };
        /**
         * Defines the data grid view reset column.
         * @private
         */
        UIDGVAbstractDataItem.prototype._defineResetColumn = function () {
            this._columns.push({
                dataIndex: 'reset',
                text: UINLS.get('treeListColumnReset'),
                typeRepresentation: 'resetFunction',
                editionPolicy: 'EditionOnOver',
                width: 50,
                minWidth: 50,
                alignment: 'center',
                visibleFlag: true,
                sortableFlag: false,
                getCellClassName: this._getResetCellClassName.bind(this),
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
        return UIDGVAbstractDataItem;
    }(UIDGVAbstractModelItem));
    return UIDGVAbstractDataItem;
});
