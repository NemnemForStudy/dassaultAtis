/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractModelItem'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractModelItem", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVAbstractModelItem"], function (require, exports, UIDataGridView, UIFontIcon, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view abstract model item.
     * This is the base class for control port, data port and settings DGV.
     * @class UIDGVAbstractModelItem
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractModelItem
     * @extends UIDataGridView
     * @abstract
     * @private
     */
    var UIDGVAbstractModelItem = /** @class */ (function (_super) {
        __extends(UIDGVAbstractModelItem, _super);
        /**
         * @constructor
         * @param {IWUXDataGridViewOptions} options - The data grid view options.
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         */
        function UIDGVAbstractModelItem(options, editor, blockModel) {
            var _this = _super.call(this, UIDataGridView._mergeDataGridViewOptions({
                className: 'sch-datagridview-abstract-model-item',
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: false,
                columnDragEnabledFlag: false,
                rowsHeader: false,
                cellActivationFeedback: 'none',
                cellSelection: 'none',
                cellPreselectionFeedback: 'row',
                rowSelection: 'none'
                //onContextualEvent: () => []
            }, options)) || this;
            _this._editor = editor;
            _this._blockModel = blockModel;
            _this._registerTypeRepresentation();
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
        UIDGVAbstractModelItem.prototype.remove = function () {
            _super.prototype.remove.call(this); // Parent class removes the tree document and triggers some callbacks!
            this._editor = undefined;
            this._blockModel = undefined;
            this._addItemFunctionIconCB = undefined;
            this._deleteItemFunctionIconCB = undefined;
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
         * Defines the data grid view name column.
         * @protected
         */
        UIDGVAbstractModelItem.prototype._defineNameColumn = function () {
            this._columns.push({
                dataIndex: 'tree',
                text: UINLS.get('treeListColumnName'),
                typeRepresentation: 'string',
                visibleFlag: true,
                sortableFlag: true,
                editionPolicy: 'EditionOnOver',
                getCellClassName: this._getNameCellClassName.bind(this),
                getCellEditableState: this._getNameCellEditableState.bind(this),
                setCellValue: this._setNameCellValue.bind(this)
            });
        };
        /**
         * Gets the name cell class name.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The name cell class name.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVAbstractModelItem.prototype._getNameCellClassName = function (cellInfos) {
            var _a;
            var className = '';
            if ((_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) {
                className = 'sch-dgv-node-root';
                var children = cellInfos.nodeModel.getChildren();
                if (!children || children.length === 0) {
                    className += ' sch-dgv-node-empty';
                }
            }
            return className;
        };
        /**
         * Defines the data grid view action column.
         * @protected
         */
        UIDGVAbstractModelItem.prototype._defineActionColumn = function () {
            this._columns.push({
                dataIndex: 'action',
                width: 40,
                minWidth: 40,
                alignment: 'center',
                visibleFlag: true,
                sortableFlag: false,
                resizableFlag: false,
                getCellClassName: this._getActionCellClassName.bind(this),
                getCellTypeRepresentation: this._getActionCellTypeRepresentation.bind(this),
                getCellTooltip: this._getActionCellTooltip.bind(this)
            });
        };
        /**
         * Gets the action cell class name.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The action cell class name.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVAbstractModelItem.prototype._getActionCellClassName = function (cellInfos) {
            var _a;
            return ((_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) ? 'sch-dgv-node-root sch-dgv-icon-add' : 'sch-dgv-icon-delete';
        };
        /**
         * Gets the action cell type representation.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The action cell type representation.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVAbstractModelItem.prototype._getActionCellTypeRepresentation = function (cellInfos) {
            var _a;
            return ((_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) ? 'addFunction' : 'deleteFunction';
        };
        /**
         * Registers the specific type representation.
         * @protected
         */
        UIDGVAbstractModelItem.prototype._registerTypeRepresentation = function () {
            var typeReps = {
                addFunction: {
                    stdTemplate: 'functionIcon',
                    semantics: { icon: UIFontIcon.getWUXFAIconDefinition('plus') }
                },
                deleteFunction: {
                    stdTemplate: 'functionIcon',
                    semantics: { icon: UIFontIcon.getWUX3DSIconDefinition('trash') }
                }
            };
            var typeRepFactory = this._dataGridView.getTypeRepresentationFactory();
            typeRepFactory.registerTypeRepresentations(JSON.stringify(typeReps));
        };
        return UIDGVAbstractModelItem;
    }(UIDataGridView));
    return UIDGVAbstractModelItem;
});
