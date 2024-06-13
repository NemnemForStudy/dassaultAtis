/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVControlPort'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVControlPort", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVAbstractModelItem", "DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVControlPort"], function (require, exports, UIDGVAbstractModelItem, UINLSTools, UIWUXTools, UINLS, Events, ModelEnums, WUXTreeNodeModel, EventPort) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view control port.
     * @class UIDGVControlPort
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVControlPort
     * @extends UIDGVAbstractModelItem
     * @private
     */
    var UIDGVControlPort = /** @class */ (function (_super) {
        __extends(UIDGVControlPort, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         */
        function UIDGVControlPort(editor, blockModel) {
            var _this = _super.call(this, { className: 'sch-datagridview-controlport' }, editor, blockModel) || this;
            _this._onControlPortAddCB = _this._onControlPortAdd.bind(_this);
            _this._onControlPortRemoveCB = _this._onControlPortRemove.bind(_this);
            _this._addItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVControlPort', func: '_onAddPortButtonClick' };
            _this._deleteItemFunctionIconCB = { module: 'DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVControlPort', func: '_onDeletePortButtonClick' };
            _this._updateContent();
            _this._blockModel.addListener(Events.ControlPortAddEvent, _this._onControlPortAddCB);
            _this._blockModel.addListener(Events.ControlPortRemoveEvent, _this._onControlPortRemoveCB);
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
        UIDGVControlPort.prototype.remove = function () {
            this._blockModel.removeListener(Events.ControlPortAddEvent, this._onControlPortAddCB);
            this._blockModel.removeListener(Events.ControlPortRemoveEvent, this._onControlPortRemoveCB);
            _super.prototype.remove.call(this); // Parent class removes the tree document and triggers some callbacks!
            this._icpNodeModel = undefined;
            this._ocpNodeModel = undefined;
            this._iepNodeModel = undefined;
            this._oepNodeModel = undefined;
            this._onControlPortAddCB = undefined;
            this._onControlPortRemoveCB = undefined;
        };
        /**
         * Gets the section node model from the provided control port type.
         * @public
         * @param {ModelEnums.EControlPortType} portType - The control port type.
         * @returns {WUXTreeNodeModel} The corresponding section node model.
         */
        UIDGVControlPort.prototype.getSectionNodeModelFromPortType = function (portType) {
            var nodeModel;
            if (portType === ModelEnums.EControlPortType.eInput) {
                nodeModel = this._icpNodeModel;
            }
            else if (portType === ModelEnums.EControlPortType.eOutput) {
                nodeModel = this._ocpNodeModel;
            }
            else if (portType === ModelEnums.EControlPortType.eInputEvent) {
                nodeModel = this._iepNodeModel;
            }
            else if (portType === ModelEnums.EControlPortType.eOutputEvent) {
                nodeModel = this._oepNodeModel;
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
         * Defines the data grid view columns.
         * @protected
         * @override
         */
        UIDGVControlPort.prototype._defineColumns = function () {
            this._defineNameColumn();
            this._defineEventTypeColumn();
            this._defineActionColumn();
        };
        /**
         * Gets the name cell editable state.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} - The name cell editable state.
         */
        UIDGVControlPort.prototype._getNameCellEditableState = function (cellInfos) {
            var controlPort = this._getControlPortFromCellInfos(cellInfos);
            var isEditable = controlPort && controlPort.isNameSettable() && !this._editor.getTraceController().getPlayingState();
            return isEditable;
        };
        /**
         * Sets the name cell value.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @param {string} newName - The new name.
         */
        UIDGVControlPort.prototype._setNameCellValue = function (cellInfos, newName) {
            var controlPort = this._getControlPortFromCellInfos(cellInfos);
            if (controlPort) {
                var previousName = cellInfos.nodeModel.getLabel();
                var result = controlPort.setName(newName);
                var name_1 = result ? newName : previousName;
                cellInfos.nodeModel.setLabel(name_1);
            }
        };
        /**
         * Gets the action cell tooltip.
         * @protected
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {Object} The action cell tooltip.
         */
        UIDGVControlPort.prototype._getActionCellTooltip = function (cellInfos) {
            var _a;
            var tooltip;
            var action = (_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.getAttributeValue('action');
            if (action) {
                var portType = cellInfos.nodeModel.getAttributeValue('portType');
                var isActionAdd = action === this._addItemFunctionIconCB;
                var tooltipInfos = UIDGVControlPort._getTooltipInfosFromPortType(portType, isActionAdd);
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
        UIDGVControlPort._onAddPortButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            if (nodeModel) {
                var blockModel = nodeModel.getAttributeValue('block');
                var portType = nodeModel.getAttributeValue('portType');
                blockModel.createDynamicControlPort(portType);
            }
        };
        /**
         * The callback on the delete port button click event.
         * @protected
         * @static
         * @param {IWUXFunctionIconArguments} args - The function icon arguments.
         */
        UIDGVControlPort._onDeletePortButtonClick = function (args) {
            var nodeModel = args.context.nodeModel;
            var controlPort = nodeModel.getAttributeValue('controlPort');
            if (controlPort.block.isControlPortRemovable(controlPort)) {
                controlPort.block.removeControlPort(controlPort);
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
         * Defines the data grid view event type column.
         * @private
         */
        UIDGVControlPort.prototype._defineEventTypeColumn = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'eventType',
                text: UINLS.get('treeListColomnEventType'),
                typeRepresentation: 'string',
                editionPolicy: 'EditionOnOver',
                visibleFlag: true,
                getCellClassName: function (cellInfos) { var _a; return ((_a = cellInfos.nodeModel) === null || _a === void 0 ? void 0 : _a.isRoot()) ? 'sch-dgv-node-root' : ''; },
                getCellSemantics: function (cellInfos) {
                    var cellSemantics = {};
                    var controlPort = _this._getControlPortFromCellInfos(cellInfos);
                    if (controlPort instanceof EventPort && controlPort.isEventTypeSettable()) {
                        cellSemantics = { possibleValues: controlPort.getAllowedEventTypes() };
                    }
                    return cellSemantics;
                },
                getCellEditableState: function (cellInfos) {
                    var controlPort = _this._getControlPortFromCellInfos(cellInfos);
                    var isEditable = controlPort instanceof EventPort && controlPort.isEventTypeSettable() && !_this._editor.getTraceController().getPlayingState();
                    return isEditable;
                },
                setCellValue: function (cellInfos, newEventType) {
                    var controlPort = _this._getControlPortFromCellInfos(cellInfos);
                    if (controlPort instanceof EventPort && controlPort.isEventTypeSettable()) {
                        var previousEventType = cellInfos.nodeModel.getAttributeValue('eventType');
                        var result = controlPort.setEventType(newEventType);
                        var eventType = result ? newEventType : previousEventType;
                        cellInfos.nodeModel.updateOptions({ grid: { eventType: eventType } });
                    }
                }
            });
        };
        /**
         * Gets the control port from the provided WUX cell infos.
         * @private
         * @param {IWUXCellInfos} cellInfos - The WUX cell infos.
         * @returns {ControlPort} The control port.
         */
        UIDGVControlPort.prototype._getControlPortFromCellInfos = function (cellInfos) {
            var controlPort;
            if (cellInfos.nodeModel && !cellInfos.nodeModel.isRoot()) {
                var portName = cellInfos.nodeModel.getLabel();
                controlPort = this._blockModel.getControlPortByName(portName);
            }
            return controlPort;
        };
        /**
         * Creates a section node model and adds it to the tree document.
         * @private
         * @param {ModelEnums.EControlPortType} portType - The control port type.
         * @returns {WUXTreeNodeModel} The created section node model.
         */
        UIDGVControlPort.prototype._createSectionNodeModel = function (portType) {
            var nodeModel = new WUXTreeNodeModel({
                label: UINLSTools.getControlPortsNLSName(portType) + ' (0)',
                grid: __assign({ block: this._blockModel, portType: portType }, (this._blockModel.isControlPortTypeAddable(portType) && { action: this._addItemFunctionIconCB }))
            });
            this._treeDocument.addRoot(nodeModel);
            return nodeModel;
        };
        /**
         * Creates a control port node model.
         * @private
         * @param {ControlPort} controlPort - The control port model.
         * @returns {WUXTreeNodeModel} The created control node model.
         */
        UIDGVControlPort.prototype._createControlPortNodeModel = function (controlPort) {
            var portType = controlPort.getType();
            var nodeModel = new WUXTreeNodeModel({
                label: controlPort.getName(),
                grid: __assign(__assign({ controlPort: controlPort, portType: portType }, (controlPort instanceof EventPort && { eventType: controlPort.getEventType() })), (this._blockModel.isControlPortRemovable(controlPort) && { action: this._deleteItemFunctionIconCB }))
            });
            var sectionNodeModel = this.getSectionNodeModelFromPortType(portType);
            sectionNodeModel.addChild(nodeModel);
            sectionNodeModel.expand();
            this._updateSectionNodeModelLabel(portType);
            return nodeModel;
        };
        /**
         * Updates the section node model label.
         * @private
         * @param {ModelEnums.EControlPortType} portType - The control port type.
         */
        UIDGVControlPort.prototype._updateSectionNodeModelLabel = function (portType) {
            var _a;
            var sectionNodeModel = this.getSectionNodeModelFromPortType(portType);
            var label = UINLSTools.getControlPortsNLSName(portType) + ' (' + (((_a = sectionNodeModel.getChildren()) === null || _a === void 0 ? void 0 : _a.length) || 0) + ')';
            sectionNodeModel.setLabel(label);
        };
        /**
         * Updates the data grid view content.
         * @private
         */
        UIDGVControlPort.prototype._updateContent = function () {
            var _this = this;
            this._icpNodeModel = this._createSectionNodeModel(ModelEnums.EControlPortType.eInput);
            this._ocpNodeModel = this._createSectionNodeModel(ModelEnums.EControlPortType.eOutput);
            this._iepNodeModel = this._createSectionNodeModel(ModelEnums.EControlPortType.eInputEvent);
            this._oepNodeModel = this._createSectionNodeModel(ModelEnums.EControlPortType.eOutputEvent);
            var inputControlPorts = this._blockModel.getControlPorts(ModelEnums.EControlPortType.eInput);
            inputControlPorts.forEach(function (icp) { return _this._createControlPortNodeModel(icp); });
            var outputControlPorts = this._blockModel.getControlPorts(ModelEnums.EControlPortType.eOutput);
            outputControlPorts.forEach(function (ocp) { return _this._createControlPortNodeModel(ocp); });
            var inputEventPorts = this._blockModel.getControlPorts(ModelEnums.EControlPortType.eInputEvent);
            inputEventPorts.forEach(function (iep) { return _this._createControlPortNodeModel(iep); });
            var outputEventPorts = this._blockModel.getControlPorts(ModelEnums.EControlPortType.eOutputEvent);
            outputEventPorts.forEach(function (oep) { return _this._createControlPortNodeModel(oep); });
            this._icpNodeModel.expand();
            this._ocpNodeModel.expand();
            this._iepNodeModel.expand();
            this._oepNodeModel.expand();
        };
        /**
          * The callback on the model control port add event.
          * @private
          * @param {Events.ControlPortAddEvent} event - The model control port add event.
          */
        UIDGVControlPort.prototype._onControlPortAdd = function (event) {
            var controlPort = event.getControlPort();
            this._createControlPortNodeModel(controlPort);
        };
        /**
         * The callback on the model control port remove event.
         * @private
         * @param {Events.ControlPortRemoveEvent} event - The model control port remove event.
         */
        UIDGVControlPort.prototype._onControlPortRemove = function (event) {
            var controlPort = event.getControlPort();
            var portType = controlPort.getType();
            var sectionNodeModel = this.getSectionNodeModelFromPortType(portType);
            if (sectionNodeModel) {
                var portNodeModel = sectionNodeModel.getChildren().find(function (node) { return node.getAttributeValue('controlPort') === controlPort; });
                if (portNodeModel) {
                    sectionNodeModel.removeChild(portNodeModel);
                }
                this._updateSectionNodeModelLabel(portType);
            }
        };
        /**
         * Gets the tooltip infos from the control port type.
         * @private
         * @static
         * @param {ModelEnums.EControlPortType} portType - The control port type.
         * @param {boolean} doCreate - True for create action, false for delete action.
         * @returns {IWUXTooltipModel} The tooltip infos
         */
        UIDGVControlPort._getTooltipInfosFromPortType = function (portType, doCreate) {
            var tooltipInfos = {};
            if (portType === ModelEnums.EControlPortType.eInput) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createInputControlPortTitle' : 'deleteInputControlPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createInputControlPortShortHelp' : 'deleteInputControlPortShortHelp');
            }
            else if (portType === ModelEnums.EControlPortType.eOutput) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createOutputControlPortTitle' : 'deleteOutputControlPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createOutputControlPortShortHelp' : 'deleteOutputControlPortShortHelp');
            }
            else if (portType === ModelEnums.EControlPortType.eInputEvent) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createInputEventPortTitle' : 'deleteInputEventPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createInputEventPortShortHelp' : 'deleteInputEventPortShortHelp');
            }
            else if (portType === ModelEnums.EControlPortType.eOutputEvent) {
                tooltipInfos.title = UINLS.get(doCreate ? 'createOutputEventPortTitle' : 'deleteOutputEventPortTitle');
                tooltipInfos.shortHelp = UINLS.get(doCreate ? 'createOutputEventPortShortHelp' : 'deleteOutputEventPortShortHelp');
            }
            return tooltipInfos;
        };
        return UIDGVControlPort;
    }(UIDGVAbstractModelItem));
    return UIDGVControlPort;
});
