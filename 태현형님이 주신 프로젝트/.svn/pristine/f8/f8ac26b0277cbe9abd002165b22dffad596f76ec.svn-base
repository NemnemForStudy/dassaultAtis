/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVIOTestAbstract'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVIOTestAbstract", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVIOTestAbstract"], function (require, exports, UIDataGridView, ModelEnums, TypeLibrary) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the an abstract UI data grid view IO test.
     * @class UIDGVIOTestAbstract
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVIOTestAbstract
     * @extends UIDataGridView
     * @private
     */
    var UIDGVIOTestAbstract = /** @class */ (function (_super) {
        __extends(UIDGVIOTestAbstract, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {string} className - The specialized class name.
         */
        function UIDGVIOTestAbstract(editor, className) {
            var _this = _super.call(this, {
                className: ['sch-datagridview-iotest', className],
                rowsHeader: false,
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: true,
                cellSelection: 'none',
                rowSelection: 'single',
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                placeholder: ''
            }) || this;
            _this._typeCategory = ModelEnums.FTypeCategory.fObject | ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent;
            _this._editor = editor;
            _this._graph = _this._editor._getViewer().getMainGraph();
            _this._graphContext = _this._graph.getModel().getGraphContext();
            _this._initialize();
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
        UIDGVIOTestAbstract.prototype.remove = function () {
            this._editor = undefined;
            this._graph = undefined;
            this._graphContext = undefined;
            this._dataPorts = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Applies the test values defines on the data grid view to the model.
         * @public
         */
        UIDGVIOTestAbstract.prototype.applyTestValues = function () {
            var treeDocument = this.getTreeDocument();
            treeDocument.getRoots().forEach(function (root) {
                var value = root.getAttributeValue('testValue');
                var dataPort = root.getAttributeValue('dataPort');
                dataPort.setTestValues([value]);
            });
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
         * Initializes the data grid view.
         * @protected
         */
        UIDGVIOTestAbstract.prototype._initialize = function () {
            var _this = this;
            var treeDocument = this.getTreeDocument();
            treeDocument.onPreExpand(this._onPreExpand.bind(this));
            this._dataPorts.forEach(function (dataPort) {
                var valueTypeName = dataPort.getValueType();
                var canExpand = TypeLibrary.hasType(_this._graphContext, valueTypeName, _this._typeCategory) && dataPort.isTestValuesSettable();
                _this._addTreeNodeModel({
                    label: dataPort.getName(),
                    grid: {
                        dataPort: dataPort,
                        type: valueTypeName,
                        testValue: dataPort.getTestValues()[0]
                    },
                    children: canExpand ? [] : undefined
                });
            });
        };
        /**
         * Defines the data grid view columns.
         * @protected
         * @override
         */
        UIDGVIOTestAbstract.prototype._defineColumns = function () {
            this._columns.push({
                dataIndex: 'tree',
                text: 'Name',
                visibleFlag: true,
                getCellClassName: UIDGVIOTestAbstract._getDisabledClassName
            });
            this._defineTypeColumn();
            this._defineTestValueColumn();
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
         * The callback on the pre-expand event.
         * @private
         * @param {IWUXModelEvent} modelEvent - The pre-exapand model event.
         */
        UIDGVIOTestAbstract.prototype._onPreExpand = function (modelEvent) {
            var _this = this;
            var nodeModel = modelEvent.target;
            var parentTestValue = nodeModel.getAttributeValue('testValue') || {};
            nodeModel.setAttribute('testValue', parentTestValue);
            nodeModel.getModelEvents().subscribe({ event: 'nodeModelUpdate' }, this._onNodeModelUpdate.bind(this));
            var valueTypeName = nodeModel.getAttributeValue('type');
            var valueType = TypeLibrary.getType(this._graphContext, valueTypeName);
            if (valueType !== undefined) {
                var children_1 = [];
                Object.keys(valueType).forEach(function (propertyName) {
                    var pValueTypeName = valueType[propertyName].type;
                    var canExpand = TypeLibrary.hasType(_this._graphContext, pValueTypeName, _this._typeCategory);
                    children_1.push({
                        label: propertyName,
                        grid: {
                            type: pValueTypeName,
                            testValue: parentTestValue[propertyName]
                        },
                        children: canExpand ? [] : undefined
                    });
                });
                nodeModel.removeChildren();
                nodeModel.addChild(children_1);
                nodeModel.getChildren().forEach(function (child) {
                    child.getModelEvents().subscribe({ event: 'nodeModelUpdate' }, _this._onNodeModelUpdate.bind(_this));
                });
            }
            nodeModel.preExpandDone();
        };
        /**
         * Gets the cell disabled class name.
         * @private
         * @static
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The disabled class name.
         */
        UIDGVIOTestAbstract._getDisabledClassName = function (cellInfos) {
            var cellClassName = '';
            if (cellInfos.nodeModel && cellInfos.nodeModel.isRoot()) {
                var dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                cellClassName = !dataPort.isTestValuesSettable() ? 'sch-cell-disabled' : '';
            }
            return cellClassName;
        };
        /**
         * Defines the type column.
         * @private
         */
        UIDGVIOTestAbstract.prototype._defineTypeColumn = function () {
            this._columns.push({
                dataIndex: 'type',
                text: 'Type',
                getCellClassName: UIDGVIOTestAbstract._getDisabledClassName
            });
        };
        /**
         * Defines the test value column.
         * @private
         */
        UIDGVIOTestAbstract.prototype._defineTestValueColumn = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'testValue',
                text: 'Value',
                editableFlag: false,
                alignment: 'near',
                editionPolicy: 'EditionOnOver',
                getCellTypeRepresentation: function (cellInfos) {
                    var typeRepresentation = 'string';
                    if (cellInfos.nodeModel) {
                        var valueTypeName = cellInfos.nodeModel.getAttributeValue('type');
                        var customType = TypeLibrary.getType(_this._graphContext, valueTypeName);
                        typeRepresentation = customType ? 'string' : valueTypeName;
                    }
                    return typeRepresentation;
                },
                getCellEditableState: function (cellInfos) {
                    var editableState = false;
                    if (cellInfos.nodeModel) {
                        var valueTypeName = cellInfos.nodeModel.getAttributeValue('type');
                        var customType = TypeLibrary.getType(_this._graphContext, valueTypeName);
                        editableState = customType === undefined;
                    }
                    return editableState;
                },
                getCellClassName: function (cellInfos) {
                    var cellClassName = '';
                    if (cellInfos.nodeModel) {
                        var valueTypeName = cellInfos.nodeModel.getAttributeValue('type');
                        var customType = TypeLibrary.getType(_this._graphContext, valueTypeName);
                        cellClassName = customType !== undefined ? 'sch-cell-disabled' : '';
                    }
                    return cellClassName;
                },
                //getCellValue
                setCellValue: function (cellInfos, value) {
                    var nodeModel = cellInfos.nodeModel;
                    nodeModel.setAttribute('testValue', value);
                }
            });
        };
        /**
         * The callback on the node model update.
         * @private
         * @param {IWUXModelEvent} event - The node model event.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVIOTestAbstract.prototype._onNodeModelUpdate = function (event) {
            var nodeModel = event.target;
            if (nodeModel && !nodeModel.isRoot()) {
                var testValue = nodeModel.getAttributeValue('testValue');
                var parentNodeModel = nodeModel.getParent();
                var parentTestValue = parentNodeModel.getAttributeValue('testValue');
                parentTestValue[nodeModel.getLabel()] = testValue;
                parentNodeModel.updateOptions({ grid: { testValue: parentTestValue } });
            }
        };
        return UIDGVIOTestAbstract;
    }(UIDataGridView));
    return UIDGVIOTestAbstract;
});
