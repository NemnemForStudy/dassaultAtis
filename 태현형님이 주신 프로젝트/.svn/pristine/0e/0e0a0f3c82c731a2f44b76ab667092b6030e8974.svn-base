/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleControlPort'/>
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
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleControlPort", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPSSchematicsModelWeb/EPSSchematicsEventPort", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVSinglePort"], function (require, exports, UIDataGridView, UINLS, WUXTreeNodeModel, EventPort) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view single control port.
     * @class UIDGVSingleControlPort
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleControlPort
     * @extends UIDataGridView
     * @private
     */
    var UIDGVSingleControlPort = /** @class */ (function (_super) {
        __extends(UIDGVSingleControlPort, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The editor.
         * @param {Block} blockModel - The block model.
         * @param {string} portName - The name of the port.
         */
        function UIDGVSingleControlPort(editor, blockModel, portName) {
            var _this = _super.call(this, {
                className: ['sch-datagridview-single-port', 'sch-datagridview-single-control-port'],
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: true,
                columnDragEnabledFlag: false,
                rowsHeader: false,
                cellActivationFeedback: 'none',
                cellSelection: 'none',
                cellPreselectionFeedback: 'row',
                rowSelection: 'single'
                //onContextualEvent: () => []
            }) || this;
            _this._editor = editor;
            _this._blockModel = blockModel;
            _this._controlPort = _this._blockModel.getControlPortByName(portName);
            _this._updateContent();
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
        UIDGVSingleControlPort.prototype.remove = function () {
            this._editor = undefined;
            this._blockModel = undefined;
            this._controlPort = undefined;
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
        UIDGVSingleControlPort.prototype._defineColumns = function () {
            this._defineColumnName();
            this._defineColumnEventType();
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
        UIDGVSingleControlPort.prototype._defineColumnName = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'tree',
                text: UINLS.get('treeListColumnName'),
                typeRepresentation: 'string',
                sortableFlag: false,
                editionPolicy: 'EditionInPlace',
                getCellEditableState: function (cellInfos) {
                    var isEditable = false;
                    if (cellInfos.nodeModel) {
                        isEditable = _this._controlPort && _this._controlPort.isNameSettable() && !_this._editor.getTraceController().getPlayingState();
                    }
                    return isEditable;
                },
                setCellValue: function (cellInfos, newName) {
                    if (cellInfos.nodeModel) {
                        var previousName = cellInfos.nodeModel.getLabel();
                        var result = _this._controlPort.setName(newName);
                        var name_1 = result ? newName : previousName;
                        cellInfos.nodeModel.setLabel(name_1);
                    }
                }
            });
        };
        /**
         * Defines the data grid view event type column.
         * @private
         */
        UIDGVSingleControlPort.prototype._defineColumnEventType = function () {
            var _this = this;
            this._columns.push({
                dataIndex: 'eventType',
                text: UINLS.get('treeListColomnEventType'),
                typeRepresentation: 'string',
                editionPolicy: 'EditionInPlace',
                visibleFlag: false,
                getCellTypeRepresentation: function (cellInfos) {
                    var typeRep = 'string';
                    if (cellInfos.nodeModel && _this._controlPort instanceof EventPort && _this._controlPort.isEventTypeSettable()) {
                        typeRep = 'valueTypeCombo';
                    }
                    return typeRep;
                },
                getCellSemantics: function (cellInfos) {
                    var cellSemantics = {};
                    if (cellInfos.nodeModel && _this._controlPort instanceof EventPort && _this._controlPort.isEventTypeSettable()) {
                        cellSemantics = { possibleValues: _this._controlPort.getAllowedEventTypes() };
                    }
                    return cellSemantics;
                },
                getCellEditableState: function (cellInfos) {
                    var isEditable = false;
                    if (cellInfos.nodeModel) {
                        isEditable = _this._controlPort instanceof EventPort && _this._controlPort.isEventTypeSettable();
                        isEditable = isEditable && !_this._editor.getTraceController().getPlayingState();
                    }
                    return isEditable;
                },
                setCellValue: function (cellInfos, newEventType) {
                    if (cellInfos.nodeModel && _this._controlPort instanceof EventPort && _this._controlPort.isEventTypeSettable()) {
                        var previousEventType = cellInfos.nodeModel.getAttributeValue('eventType');
                        var result = _this._controlPort.setEventType(newEventType);
                        var eventType = result ? newEventType : previousEventType;
                        cellInfos.nodeModel.updateOptions({ grid: { eventType: eventType } });
                    }
                }
            });
        };
        /**
         * Updates the data grid view content.
         * @private
         */
        UIDGVSingleControlPort.prototype._updateContent = function () {
            if (this._controlPort instanceof EventPort) {
                this._dataGridView.layout.setColumnVisibleFlag('eventType', true);
            }
            var nodeModel = new WUXTreeNodeModel({
                label: this._controlPort.getName(),
                grid: __assign({}, (this._controlPort instanceof EventPort && { eventType: this._controlPort.getEventType() }))
            });
            this._treeDocument.addRoot(nodeModel);
        };
        return UIDGVSingleControlPort;
    }(UIDataGridView));
    return UIDGVSingleControlPort;
});
