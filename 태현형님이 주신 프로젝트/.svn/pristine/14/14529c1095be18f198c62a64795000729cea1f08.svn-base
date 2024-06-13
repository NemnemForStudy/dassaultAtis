/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVPropertyExposure'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVPropertyExposure", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UIDataGridView, UINLS, WUXTreeNodeModel, TypeLibrary, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data grid view property exposure.
     * @class UIDGVPropertyExposure
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVPropertyExposure
     * @extends UIDataGridView
     * @private
     */
    var UIDGVPropertyExposure = /** @class */ (function (_super) {
        __extends(UIDGVPropertyExposure, _super);
        /**
         * @constructor
         * @param {UIDataPort} dataPortUI - The UI data port.
         * @param {Function} updateCB - The callback to call when updating a property.
         */
        function UIDGVPropertyExposure(dataPortUI, updateCB) {
            var _this = _super.call(this, {
                className: 'sch-datagridview-propertyexposure',
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
            _this._dataPortUI = dataPortUI;
            _this._updateCB = updateCB;
            _this._generateHierarchy();
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
        UIDGVPropertyExposure.prototype.remove = function () {
            this._dataPortUI = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the list of exposed data ports name.
         * @public
         * @returns {string[]} The list of exposed data ports name.
         */
        UIDGVPropertyExposure.prototype.getExposedDataPortsName = function () {
            var rootNode = this._treeDocument.getNthRoot(0);
            var selectedNodes = this._treeDocument.getAllDescendants().filter(function (node) { return node.getAttributeValue('isExposed') === true; });
            var exposedDataPorts = [];
            selectedNodes.forEach(function (selectedNode) {
                if (selectedNode !== rootNode) {
                    var dataPortName = selectedNode.getLabel();
                    var parentNode = selectedNode.getParent();
                    while (parentNode !== rootNode) {
                        dataPortName = parentNode.getLabel() + '.' + dataPortName;
                        parentNode = parentNode.getParent();
                    }
                    exposedDataPorts.push(dataPortName);
                }
            });
            return exposedDataPorts;
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
        UIDGVPropertyExposure.prototype._defineColumns = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'tree',
                text: UINLS.get('treeListColumnPropertyName'),
                visibleFlag: true,
                sortableFlag: false,
                editableFlag: false,
                typeRepresentation: 'string'
            });
            this._columns.push({
                dataIndex: 'type',
                text: UINLS.get('treeListColumnValueType'),
                sortableFlag: false,
                editableFlag: false,
                typeRepresentation: 'string'
            });
            this._columns.push({
                dataIndex: 'isExposed',
                text: UINLS.get('treeListColumnExposition'),
                sortableFlag: false,
                editableFlag: true,
                typeRepresentation: 'independantBoolean',
                editionPolicy: 'EditionInPlace',
                width: 20,
                setCellValue: function (cellInfos, value) {
                    /*const nodeModel = cellInfos.nodeModel;
                    let newValue: boolean = value;
                    if (nodeModel.hasChildren() && nodeModel.isExpanded()) {
                        nodeModel.getChildren().forEach(childNode => {
                            childNode.setAttribute('isExposed', newValue);
                        });
                    }
                    nodeModel.setAttribute('isExposed', newValue);*/
                    cellInfos.nodeModel.setAttribute('isExposed', value);
                    _this._updateCB();
                }
            });
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
         * Generates the properties hierarchy of the data port value type.
         * @private
         */
        UIDGVPropertyExposure.prototype._generateHierarchy = function () {
            var rootNode = new WUXTreeNodeModel({
                label: this._dataPortUI.getModel().getName(),
                grid: { type: this._dataPortUI.getModel().getValueType() },
                children: []
            });
            this._treeDocument.addRoot(rootNode);
            this._treeDocument.onPreExpand(this._onPreExpand.bind(this));
            this._treeDocument.expandNLevels(0);
            this._selectExpandedDataPorts();
        };
        /**
         * The callback on the treeDocument pre expand model event.
         * @private
         * @param {*} modelEvent - The pre expand model event.
         */
        UIDGVPropertyExposure.prototype._onPreExpand = function (modelEvent) {
            var _this = this;
            var nodeModel = modelEvent.target;
            var valueTypeName = nodeModel.getAttributeValue('type');
            var valueType = TypeLibrary.getType(this._dataPortUI.getModel().getGraphContext(), valueTypeName);
            if (valueType !== undefined) {
                var children_1 = [];
                Object.keys(valueType).forEach(function (propertyName) {
                    var childNode = (nodeModel.getChildren() || []).find(function (cn) { return cn.getLabel() === propertyName; });
                    if (!childNode) {
                        var pValueTypeName = valueType[propertyName].type;
                        var typeCategory = ModelEnums.FTypeCategory.fObject | ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent;
                        var canExpand = TypeLibrary.hasType(_this._dataPortUI.getModel().getGraphContext(), pValueTypeName, typeCategory);
                        childNode = new WUXTreeNodeModel({
                            label: propertyName,
                            grid: { type: pValueTypeName, isExposed: false },
                            children: canExpand ? [] : undefined
                        });
                    }
                    children_1.push(childNode);
                });
                nodeModel.removeChildren();
                nodeModel.addChild(children_1);
            }
            nodeModel.preExpandDone();
        };
        /**
         * Selects the expanded data ports in the data grid view.
         * @private
         */
        UIDGVPropertyExposure.prototype._selectExpandedDataPorts = function () {
            var rootNode = this._treeDocument.getNthRoot(0);
            var port = this._dataPortUI.getModel();
            var parentPort = port.dataPort;
            var parentUIPort = parentPort === undefined ? this._dataPortUI : this._dataPortUI.getParentPort();
            var exposedDataPorts;
            if (port.block.isTemplate()) {
                exposedDataPorts = this._dataPortUI.getAllSubDataPorts().map(function (subDataPort) { return subDataPort.getModel(); });
            }
            else {
                exposedDataPorts = parentPort === undefined ? port.getDataPorts() : parentPort.searchDataPortByName(RegExp(port.getName() + '.+'));
            }
            exposedDataPorts.forEach(function (exposedDataPort) {
                var exposedUIDataPort = parentUIPort.getUISubDataPortFromModel(exposedDataPort);
                if (exposedUIDataPort.isExposed()) {
                    var dataPortName = exposedDataPort.getName();
                    var properties = dataPortName.split('.');
                    if (parentPort !== undefined) {
                        properties.shift();
                    }
                    var childNode = rootNode;
                    var _loop_1 = function (p) {
                        var property = properties[p];
                        if (!childNode.isExpanded()) {
                            childNode.expand();
                        }
                        var childrenNodes = childNode.getChildren();
                        childNode = childrenNodes.find(function (cn) { return cn.getLabel() === property; });
                    };
                    for (var p = 0; p < properties.length && childNode !== undefined; p++) {
                        _loop_1(p);
                    }
                    if (childNode !== undefined) {
                        childNode.setAttribute('isExposed', true);
                    }
                }
            });
        };
        return UIDGVPropertyExposure;
    }(UIDataGridView));
    return UIDGVPropertyExposure;
});
