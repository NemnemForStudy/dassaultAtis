/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOptionalDataPorts'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOptionalDataPorts", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UIDataGridView, WUXTreeNodeModel, ModelEnums) {
    "use strict";
    /**
     * This class defines a UI data grid view optional data ports.
     * @class UIDGVOptionalDataPorts
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOptionalDataPorts
     * @extends UIDataGridView
     * @private
     */
    var UIDGVOptionalDataPorts = /** @class */ (function (_super) {
        __extends(UIDGVOptionalDataPorts, _super);
        /**
         * @constructor
         * @public
         * @param {UIBlock} blockUI - The UI block.
         */
        function UIDGVOptionalDataPorts(blockUI) {
            var _this = _super.call(this, {
                className: 'sch-dgv-optionaldataports',
                rowsHeader: false,
                columnsHeader: false,
                columnDragEnabledFlag: false,
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: false,
                cellSelection: 'none',
                rowSelection: 'single'
            }) || this;
            _this._blockUI = blockUI;
            _this._generateTreeDocument();
            return _this;
        }
        /**
         * Removes the data grid view.
         * @public
         */
        UIDGVOptionalDataPorts.prototype.remove = function () {
            this._blockUI = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Defines the data grid view columns.
         * @protected
         */
        UIDGVOptionalDataPorts.prototype._defineColumns = function () {
            this._columns.push({
                dataIndex: 'tree',
                visibleFlag: true,
                sortableFlag: false,
                editableFlag: false,
                typeRepresentation: 'string'
            });
            this._columns.push({
                dataIndex: 'type',
                sortableFlag: false,
                editableFlag: false,
                typeRepresentation: 'string'
            });
            this._columns.push({
                dataIndex: 'isVisible',
                sortableFlag: false,
                editableFlag: true,
                typeRepresentation: 'independantBoolean',
                editionPolicy: 'EditionInPlace',
                width: 20,
                setCellValue: function (cellInfos, value) {
                    cellInfos.nodeModel.setAttribute('isVisible', value);
                    var dataPortUI = cellInfos.nodeModel.getAttributeValue('dataPortUI');
                    dataPortUI.setExposedState(value);
                    var hc = dataPortUI.getEditor().getHistoryController();
                    var registerFct = value ? hc.registerShowOptionalDataPortAction : hc.registerHideOptionalDataPortAction;
                    registerFct.call(hc);
                }
            });
        };
        /**
         * Generates the tree document.
         * @private
         */
        UIDGVOptionalDataPorts.prototype._generateTreeDocument = function () {
            var _this = this;
            var uiDataPorts = this._blockUI.getUIDataPorts(ModelEnums.EDataPortType.eInput, false, true);
            var optionalUIDataPorts = uiDataPorts.filter(function (dp) { return dp.getModel().isOptional(); });
            optionalUIDataPorts.forEach(function (dp) {
                var rootNode = new WUXTreeNodeModel({
                    label: dp.getModel().getName(),
                    grid: {
                        dataPortUI: dp,
                        type: dp.getModel().getValueType(),
                        isVisible: dp.isExposed()
                    }
                });
                _this._treeDocument.addRoot(rootNode);
            });
        };
        return UIDGVOptionalDataPorts;
    }(UIDataGridView));
    return UIDGVOptionalDataPorts;
});
