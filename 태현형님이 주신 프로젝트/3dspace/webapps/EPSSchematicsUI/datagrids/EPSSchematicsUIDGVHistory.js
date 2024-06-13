/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVHistory'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVHistory", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools"], function (require, exports, UIDataGridView, UITools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Propagate ctrl+Y and ctrl+Z shortcut when focus is on panel!
    // TODO: Navigation au clavier (fleches, enter key?)
    /**
     * This class defines a UI data grid view history.
     * @class UIDGVHistory
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVHistory
     * @extends UIDataGridView
     * @private
     */
    var UIDGVHistory = /** @class */ (function (_super) {
        __extends(UIDGVHistory, _super);
        /**
         * @constructor
         * @param {UITypeLibraryController} controller - The type library controller.
         * @param {UITypeLibraryPanel} typeLibraryPanel - The type library panel.
         */
        function UIDGVHistory(controller) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-history',
                treeDocument: controller.getTreeDocument(),
                autoScroll: true,
                columnDragEnabledFlag: false,
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                //showCellPreselectionFlag: false,
                showAlternateBackgroundFlag: false,
                //showRowBorderFlag: true,
                cellSelection: 'none',
                rowSelection: 'single',
                defaultColumnDef: {
                    width: 'auto',
                    typeRepresentation: 'string'
                },
                placeholder: '',
                rowsHeader: false,
                columnsHeader: false,
                getCellTooltip: function (cellInfos) {
                    var tooltip = _this.getWUXDataGridView().getCellDefaultTooltip(cellInfos);
                    if (cellInfos.nodeModel !== undefined) {
                        var date = cellInfos.nodeModel.getAttributeValue('date');
                        tooltip = {
                            shortHelp: 'Goto time: ' + UITools.getFullDateAndTime(new Date(date)),
                            initialDelay: 500,
                            updateModel: false
                        };
                    }
                    return tooltip;
                }
            }) || this;
            _this._controller = controller;
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
         * @override
         */
        UIDGVHistory.prototype.remove = function () {
            this._controller = undefined;
            _super.prototype.remove.call(this);
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
        UIDGVHistory.prototype._defineColumns = function () {
            _super.prototype._defineColumns.call(this);
            this._defineCurrentIconColumn();
            this._defineActionIconColumn();
            this._defineActionNameColumn();
        };
        /**
         * The callback on the cell click event.
         * @protected
         * @param {MouseEvent} event - The mouse event.
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         */
        UIDGVHistory.prototype._onCellClick = function (event, cellInfos) {
            if (cellInfos !== undefined) {
                this._controller.setCurrentIndex(cellInfos.rowID);
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
         * Defines the current icon column.
         * @private
         */
        UIDGVHistory.prototype._defineCurrentIconColumn = function () {
            this._columns.push({
                dataIndex: 'currentIcon',
                text: '',
                visibleFlag: true,
                typeRepresentation: 'icon',
                minWidth: 20,
                width: 20,
                //className: 'sch-dgv-history-active'
                getCellClassName: function (cellInfos) {
                    return UIDGVHistory._getCellClassNameFromCellInfos(cellInfos, 'sch-dgv-history-currenticon');
                }
            });
        };
        /**
         * Defines the action icon column.
         * @private
         */
        UIDGVHistory.prototype._defineActionIconColumn = function () {
            this._columns.push({
                dataIndex: 'actionIcon',
                text: '',
                visibleFlag: true,
                typeRepresentation: 'icon',
                minWidth: 25,
                width: 25,
                getCellClassName: function (cellInfos) {
                    return UIDGVHistory._getCellClassNameFromCellInfos(cellInfos, 'sch-dgv-history-actionicon');
                }
            });
        };
        /**
         * Defines the data grid view action name column.
         * @private
         */
        UIDGVHistory.prototype._defineActionNameColumn = function () {
            this._columns.push({
                dataIndex: 'actionName',
                text: 'Action',
                sortableFlag: false,
                width: 'auto',
                getCellClassName: function (cellInfos) {
                    return UIDGVHistory._getCellClassNameFromCellInfos(cellInfos, 'sch-dgv-history-actionname');
                }
            });
        };
        /**
         * Gets the cell class name from the given cell infos.
         * @private
         * @static
         * @param {Object} cellInfos - The cell infos.
         * @param {string} className - The cell class name.
         * @returns {string} The corresponding cell class name.
         */
        UIDGVHistory._getCellClassNameFromCellInfos = function (cellInfos, className) {
            if (cellInfos.nodeModel !== undefined) {
                var isCurrent = cellInfos.nodeModel.getAttributeValue('isCurrent');
                var isDisabled = cellInfos.nodeModel.getAttributeValue('isDisabled');
                className += isCurrent ? ' ' + 'sch-dgv-history-iscurrent' : '';
                className += isDisabled ? ' ' + 'sch-dgv-history-isdisabled' : '';
            }
            return className;
        };
        return UIDGVHistory;
    }(UIDataGridView));
    return UIDGVHistory;
});
