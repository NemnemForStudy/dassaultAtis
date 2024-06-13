/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractDataItem", "DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVDataPort"], function (require, exports, UIDGVAbstractDataItem, UINLSTools, UIWUXTools, UIDGVTools, UINLS, Events, ModelEnums, WUXTreeNodeModel) {
    "use strict";
    /**
     * This class defines the UI data grid view data port.
     * @class UIDGVDataPort
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort
     * @extends UIDGVAbstractDataItem
     * @private
     */
    var UIDGVDataPort = /** @class */ (function (_super) {
        __extends(UIDGVDataPort, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         * @param {EDataPortType} [portTypeSection] - The data port type section to display.
         */
        function UIDGVDataPort(editor, blockModel, portTypeSection) {
            var _this = _super.call(this, { className: 'sch-datagridview-dataport' }, editor, blockModel) || this;
            _this._onDataPortAddCB = _this._onDataPortAdd.bind(_this);
            _this._onDataPortRemoveCB = _this._onDataPortRemove.bind(_this);
            _this._onDataPortDefaultValueChangeCB = _this._onDataPortDefaultValueChange.bind(_this);
            _this._onDataPortOverrideChangeCB = _this._onDataPortOverrideChange.bind(_this);
            _this._addItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort', func: '_onAddPortButtonClick' };
            _this._deleteItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVDataPort', func: '_onDeletePortButtonClick' };
            _this._resetItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools', func: 'onResetPortButtonClick' };
            _this._portTypeSection = portTypeSection;
            _this._updateContent();
            _this._blockModel.addListener(Events.DataPortAddEvent, _this._onDataPortAddCB);
            _this._blockModel.addListener(Events.DataPortRemoveEvent, _this._onDataPortRemoveCB);
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
        UIDGVDataPort.prototype.remove = function () {
            var _this = this;
            this._blockModel.removeListener(Events.DataPortAddEvent, this._onDataPortAddCB);
            this._blockModel.removeListener(Events.DataPortRemoveEvent, this._onDataPortRemoveCB);
            this._blockModel.getDataPorts().forEach(function (dp) {
                dp.removeListener(Events.DataPortDefaultValueChangeEvent, _this._onDataPortDefaultValueChangeCB);
                dp.removeListener(Events.DataPortOverrideChangeEvent, _this._onDataPortOverrideChangeCB);
            });
            _super.prototype.remove.call(this); // Parent class removes the tree document and triggers some callbacks!
            this._portTypeSection = undefined;
            this._idpSectionNodeModel = undefined;
            this._odpSectionNodeModel = undefined;
            this._ldpSectionNodeModel = undefined;
            this._onDataPortAddCB = undefined;
            this._onDataPortRemoveCB = undefined;
            this._onDataPortDefaultValueChangeCB = undefined;
            this._onDataPortOverrideChangeCB = undefined;
        };
        /**
         * Gets the section node model from the provided data port type.
         * @public
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         * @returns {WUXTreeNodeModel} The corresponding section node model.
         */
        UIDGVDataPort.prototype.getSectionNodeModelFromPortType = function (portType) {
            var nodeModel;
            if (portType === ModelEnums.EDataPortType.eInput) {
                nodeModel = this._idpSectionNodeModel;
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                nodeModel = this._odpSectionNodeModel;
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                nodeModel = this._ldpSectionNodeModel;
            }
            return nodeModel;
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
        UIDGVDataPort.prototype._getNameCellEditableState = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemNameCellEditableState(this._editor, cellInfos, dataPort);
        };
        /**
         * Sets the name cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {string} newName - The new name.
         */
        UIDGVDataPort.prototype._setNameCellValue = function (cellInfos, newName) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            UIDGVTools.setDataItemNameCellValue(cellInfos, dataPort, newName);
        };
        /**
         * Gets the value type cell semantics.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {Object} The value type cell semantics.
         */
        UIDGVDataPort.prototype._getValueTypeSemantics = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemValueTypeSemantics(this._editor, cellInfos, dataPort);
        };
        /**
         * Gets the value type cell editable state.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} - The value type cell editable state.
         */
        UIDGVDataPort.prototype._getValueTypeCellEditableState = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemValueTypeCellEditableState(this._editor, cellInfos, dataPort);
        };
        /**
         * Sets the value type cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {string} newValueType - The new value type.
         */
        UIDGVDataPort.prototype._setValueTypeCellValue = function (cellInfos, newValueType) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            UIDGVTools.setDataItemValueTypeCellValue(cellInfos, dataPort, newValueType);
        };
        /**
         * Gets the default value cell type representation.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The default value cell type representation.
         */
        // eslint-disable-next-line class-methods-use-this
        UIDGVDataPort.prototype._getDefaultValueCellTypeRepresentation = function (cellInfos) {
            return UIDGVTools.getDataItemDefaultValueCellTypeRepresentation(cellInfos);
        };
        /**
         * Gets the default value cell class name.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} The default value cell class name.
         */
        UIDGVDataPort.prototype._getDefaultValueCellClassName = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataPortDefaultValueCellClassName(this._editor, cellInfos, dataPort);
        };
        /**
         * Gets the default value cell editable state.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} - The default value cell editable state.
         */
        UIDGVDataPort.prototype._getDefaultValueCellEditableState = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemDefaultValueCellEditableState(this._editor, cellInfos, dataPort);
        };
        /**
         * Gets the default value cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {any} - The default value cell value.
         */
        UIDGVDataPort.prototype._getDefaultValueCellValue = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemDefaultValueCellValue(this._editor, cellInfos, dataPort);
        };
        /**
         * Sets the default value cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {*} newDefaultValue - The new default value.
         */
        UIDGVDataPort.prototype._setDefaultValueCellValue = function (cellInfos, newDefaultValue) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            UIDGVTools.setDataItemDefaultValueCellValue(this._editor, cellInfos, dataPort, newDefaultValue);
        };
        /**
         * Gets the reset cell class name.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} The reset cell class name.
         */
        UIDGVDataPort.prototype._getResetCellClassName = function (cellInfos) {
            var dataPort = this._getDataPortFromCellInfos(cellInfos);
            return UIDGVTools.getDataItemResetCellClassName(this._editor, cellInfos, dataPort);
        };
        /**
         * Gets the action cell tooltip.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {Object} The action cell tooltip.
         */
        UIDGVDataPort.prototype._getActionCellTooltip = function (cellInfos) {
            var _a;
            var tooltip;
            var action = (_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('action');
            if (action) {
                var portType = cellInfos.nodeModel.getAttributeValue('portType');
                var isActionAdd = action === this._addItemFunctionIconCB;
                var tooltipInfos = UIDGVDataPort._getTooltipInfosFromPortType(portType, isActionAdd);
                tooltip = UIWUXTools.createTooltip({
                    title: tooltipInfos.title,
                    shortHelp: tooltipInfos.shortHelp,
                    initialDelay: 500
                });
            }
            return tooltip;
        };
        /**
         * The callback on the add port button click event.
         * @protected
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVDataPort._onAddPortButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var block = nodeModel.getAttributeValue('block');
                var portType = nodeModel.getAttributeValue('portType');
                block.createDynamicDataPort(portType);
            }
        };
        /**
         * The callback on the delete port button click event.
         * @protected
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVDataPort._onDeletePortButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var dataPort = nodeModel.getAttributeValue('dataPort');
                if (dataPort.block.isDataPortRemovable(dataPort)) {
                    dataPort.block.removeDataPort(dataPort);
                }
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
        UIDGVDataPort.prototype._updateContent = function () {
            var _this = this;
            if (this._portTypeSection === undefined || this._portTypeSection === ModelEnums.EDataPortType.eInput) {
                this._idpSectionNodeModel = this._createSectionNodeModel(ModelEnums.EDataPortType.eInput);
                var inputDataPorts = this._blockModel.getDataPorts(ModelEnums.EDataPortType.eInput);
                inputDataPorts.forEach(function (idp) { return _this._createDataPortNodeModel(idp); });
                this._idpSectionNodeModel.expand();
            }
            if (this._portTypeSection === undefined || this._portTypeSection === ModelEnums.EDataPortType.eOutput) {
                this._odpSectionNodeModel = this._createSectionNodeModel(ModelEnums.EDataPortType.eOutput);
                var outputDataPorts = this._blockModel.getDataPorts(ModelEnums.EDataPortType.eOutput);
                outputDataPorts.forEach(function (odp) { return _this._createDataPortNodeModel(odp); });
                this._odpSectionNodeModel.expand();
            }
            if (this._portTypeSection === undefined || this._portTypeSection === ModelEnums.EDataPortType.eLocal) {
                this._ldpSectionNodeModel = this._createSectionNodeModel(ModelEnums.EDataPortType.eLocal);
                var localDataPorts = this._blockModel.getDataPorts(ModelEnums.EDataPortType.eLocal);
                localDataPorts.forEach(function (ldp) { return _this._createDataPortNodeModel(ldp); });
                this._ldpSectionNodeModel.expand();
            }
            // Hide columns for output data port type only
            if (this._portTypeSection === ModelEnums.EDataPortType.eOutput) {
                this._dataGridView.layout.setColumnVisibleFlag('defaultValue', false);
                this._dataGridView.layout.setColumnVisibleFlag('reset', false);
            }
            // Rename default value column header for CSI case
            if (this._portTypeSection === ModelEnums.EDataPortType.eInput && UIDGVTools.isReadOnlyRoot(this._editor, this._blockModel.getDataPorts(ModelEnums.EDataPortType.eInput)[0])) {
                var defaultValueColumn = this._dataGridView.columns.find(function (column) { return column.dataIndex === 'defaultValue'; });
                defaultValueColumn.text = UINLS.get('treeListColumnCSIDefaultValue');
            }
        };
        /**
         * Creates a section node model and adds it to the tree document.
         * @private
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         * @returns {WUXTreeNodeModel} The created section node model.
         */
        UIDGVDataPort.prototype._createSectionNodeModel = function (portType) {
            var nodeModel = new WUXTreeNodeModel({
                label: UINLSTools.getDataPortsNLSName(portType) + ' (0)',
                grid: __assign({ block: this._blockModel, portType: portType }, (this._blockModel.isDataPortTypeAddable(portType) && { action: this._addItemFunctionIconCB }))
            });
            this._treeDocument.addRoot(nodeModel);
            return nodeModel;
        };
        /**
         * Creates a data port node model.
         * @private
         * @param {DataPort} dataPort - The data port model.
         * @returns {WUXTreeNodeModel} The created data node model.
         */
        UIDGVDataPort.prototype._createDataPortNodeModel = function (dataPort) {
            var portType = dataPort.getType();
            var isOutputPort = dataPort.getType() === ModelEnums.EDataPortType.eOutput;
            var hasSubDataPort = dataPort.dataPort !== undefined;
            var nodeModel = new WUXTreeNodeModel({
                label: dataPort.getName(),
                grid: __assign(__assign({ dataPort: dataPort, portType: portType, valueType: dataPort.getValueType(), defaultValue: dataPort.getDefaultValue(), fromDebug: false }, (!isOutputPort && !hasSubDataPort && { reset: this._resetItemFunctionIconCB })), (this._blockModel.isDataPortRemovable(dataPort) && { action: this._deleteItemFunctionIconCB }))
            });
            var sectionNodeModel = this.getSectionNodeModelFromPortType(portType);
            sectionNodeModel.addChild(nodeModel);
            sectionNodeModel.expand();
            this._updateSectionNodeModelLabel(portType);
            dataPort.addListener(Events.DataPortDefaultValueChangeEvent, this._onDataPortDefaultValueChangeCB);
            dataPort.addListener(Events.DataPortOverrideChangeEvent, this._onDataPortOverrideChangeCB);
            return nodeModel;
        };
        /**
         * Updates the section node model label.
         * @private
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         */
        UIDGVDataPort.prototype._updateSectionNodeModelLabel = function (portType) {
            var _a;
            var sectionNodeModel = this.getSectionNodeModelFromPortType(portType);
            var label = UINLSTools.getDataPortsNLSName(portType) + ' (' + (((_a = sectionNodeModel.getChildren()) === null || _a === void 0 ? void 0 : _a.length) || 0) + ')';
            sectionNodeModel.setLabel(label);
        };
        /**
         * Gets the data port from the provided WUX cell infos.
         * @private
         * @param {IWUXCellInfos} cellInfos - The WUX cell infos.
         * @returns {DataPort} The data port.
         */
        UIDGVDataPort.prototype._getDataPortFromCellInfos = function (cellInfos) {
            var dataPort;
            if (cellInfos.nodeModel && !cellInfos.nodeModel.isRoot()) {
                var portName = cellInfos.nodeModel.getLabel();
                dataPort = this._blockModel.getDataPortByName(portName);
            }
            return dataPort;
        };
        /**
         * Gets the node model from the given data port model.
         * @private
         * @param {DataPort} dataPort - The data port model.
         * @returns {WUXTreeNodeModel} The corresponding node model.
         */
        UIDGVDataPort.prototype._getNodeModelFromDataPortModel = function (dataPort) {
            var nodeModel;
            var sectionNodeModel;
            var portType = dataPort.getType();
            if (portType === ModelEnums.EDataPortType.eInput) {
                sectionNodeModel = this._idpSectionNodeModel;
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                sectionNodeModel = this._odpSectionNodeModel;
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                sectionNodeModel = this._ldpSectionNodeModel;
            }
            if (sectionNodeModel) {
                nodeModel = (sectionNodeModel.getChildren() || []).find(function (child) { return child.getAttributeValue('dataPort') === dataPort; });
            }
            return nodeModel;
        };
        /**
          * The callback on the model data port add event.
          * @private
          * @param {Events.DataPortAddEvent} event - The model data port add event.
          */
        UIDGVDataPort.prototype._onDataPortAdd = function (event) {
            var dataPort = event.getDataPort();
            this._createDataPortNodeModel(dataPort);
        };
        /**
         * The callback on the model data port remove event.
         * @private
         * @param {Events.DataPortRemoveEvent} event - The model data port remove event.
         */
        UIDGVDataPort.prototype._onDataPortRemove = function (event) {
            var dataPort = event.getDataPort();
            dataPort.removeListener(Events.DataPortDefaultValueChangeEvent, this._onDataPortDefaultValueChangeCB);
            dataPort.removeListener(Events.DataPortOverrideChangeEvent, this._onDataPortOverrideChangeCB);
            var portType = dataPort.getType();
            var sectionNodeModel = this.getSectionNodeModelFromPortType(portType);
            if (sectionNodeModel) {
                var childrenNodeModel = sectionNodeModel.getChildren() || [];
                var portNodeModel = childrenNodeModel.find(function (node) { return node.getAttributeValue('dataPort') === dataPort; });
                if (portNodeModel) {
                    sectionNodeModel.removeChild(portNodeModel);
                }
                this._updateSectionNodeModelLabel(portType);
            }
        };
        /**
         * The callback on the model data port default value change event.
         * @private
         * @param {Events.DataPortDefaultValueChangeEvent} event - The model data port default value change event.
         */
        UIDGVDataPort.prototype._onDataPortDefaultValueChange = function (event) {
            var dataPort = event.getDataPort();
            var nodeModel = this._getNodeModelFromDataPortModel(dataPort);
            if (nodeModel) {
                var valueType = dataPort.getValueType();
                nodeModel.setAttribute('valueType', valueType);
                var defaultValue = dataPort.getDefaultValue();
                nodeModel.setAttribute('defaultValue', defaultValue);
            }
        };
        /**
         * The callback on the model data port override change event.
         * @private
         * @param {Events.DataPortOverrideChangeEvent} event - The model data port override change event.
         */
        UIDGVDataPort.prototype._onDataPortOverrideChange = function (event) {
            var dataPort = event.getDataPort();
            var nodeModel = this._getNodeModelFromDataPortModel(dataPort);
            if (nodeModel) {
                nodeModel.updateOptions({ grid: { reset: this._resetItemFunctionIconCB } });
            }
        };
        /**
         * Gets the tooltip infos from the data port type.
         * @private
         * @static
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         * @param {boolean} doCreate - True for create action, false for delete action.
         * @returns {ITooltipInfos} The tooltip infos
         */
        UIDGVDataPort._getTooltipInfosFromPortType = function (portType, doCreate) {
            var tooltipInfos = {};
            if (portType === ModelEnums.EDataPortType.eInput) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createInputDataPortTitle' : 'deleteInputDataPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createInputDataPortShortHelp' : 'deleteInputDataPortShortHelp');
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createOutputDataPortTitle' : 'deleteOutputDataPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createOutputDataPortShortHelp' : 'deleteOutputDataPortShortHelp');
            }
            else if (portType === ModelEnums.EDataPortType.eLocal) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createLocalDataPortTitle' : 'deleteLocalDataPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createLocalDataPortShortHelp' : 'deleteLocalDataPortShortHelp');
            }
            return tooltipInfos;
        };
        return UIDGVDataPort;
    }(UIDGVAbstractDataItem));
    return UIDGVDataPort;
});
