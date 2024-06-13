/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleDataPort", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UIValidationDialog, UIDGVSingleDataPort, UITools, UIEvents, UINLS, UIDom, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a data port dialog.
     * @class UIDataPortDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortDialog
     * @extends UIValidationDialog
     * @private
     */
    var UIDataPortDialog = /** @class */ (function (_super) {
        __extends(UIDataPortDialog, _super);
        /**
         * @constructor
         * @param {UIDataPort} dataPort - The UI data port.
         */
        function UIDataPortDialog(dataPort) {
            var _this = _super.call(this, {
                title: UIDataPortDialog._getTitle(dataPort.getModel().getType()),
                className: 'sch-dialog-dataport',
                immersiveFrame: dataPort.getParentGraph().getEditor().getImmersiveFrame(),
                width: 600,
                height: 120
            }) || this;
            _this._onDialogCloseEventCB = _this._onDialogCloseEvent.bind(_this);
            _this._dataPort = dataPort;
            _this._editor = dataPort.getParentGraph().getEditor();
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
         * Removes the dialog.
         * @public
         */
        UIDataPortDialog.prototype.remove = function () {
            _super.prototype.remove.call(this);
            this._dataPort = undefined;
            this._editor = undefined;
            this._tmpBlockModel = undefined;
            this._dataGridView = undefined;
            this._onDialogCloseEventCB = undefined;
        };
        /**
         * Closes the dialog.
         * @public
         */
        UIDataPortDialog.prototype.close = function () {
            this._editor.removeListener(UIEvents.UIDialogCloseEvent, this._onDialogCloseEventCB); // TODO: To move up inside parent class!
            if (this._dataGridView) {
                this._dataGridView.remove();
            }
            this._tmpBlockModel = undefined;
            this._dataGridView = undefined;
            _super.prototype.close.call(this);
        };
        /**
         * Gets the single data port data grid view.
         * @public
         * @returns {UIDGVSingleDataPort} THe single data port data grid view.
         */
        UIDataPortDialog.prototype.getDataGridView = function () {
            return this._dataGridView;
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
         * Creates the dialog content.
         * @protected
         */
        UIDataPortDialog.prototype._onCreateContent = function () {
            this._editor.addListener(UIEvents.UIDialogCloseEvent, this._onDialogCloseEventCB); // TODO: To move up inside parent class!
            var blockModel = this._dataPort.getModel().block;
            this._tmpBlockModel = blockModel.clone();
            this._dataGridView = new UIDGVSingleDataPort(this._editor, this._tmpBlockModel, this._dataPort.getModel().toPath(blockModel));
            this._content.appendChild(this._dataGridView.getElement());
            // Display debug icon
            var isDebuggable = UITools.isDataPortDebuggable(this._editor, this._dataPort.getModel());
            this._dialog.icon = isDebuggable ? 'bug' : '';
            var titleBar = this._dialog.getTitleBar();
            UIDom.addClassName(titleBar, isDebuggable ? 'sch-windows-dialog-debug' : '');
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIDataPortDialog.prototype._onOk = function () {
            if (UITools.isDataPortDebuggable(this._editor, this._dataPort.getModel())) {
                var fromDebugByDataPortPath_1 = new Map();
                this._dataGridView.getTreeDocument().getRoots().forEach(function (root) {
                    var dataPort = root.getAttributeValue('dataPort');
                    var fromDebug = root.getAttributeValue('fromDebug');
                    fromDebugByDataPortPath_1.set(dataPort.toPath(), fromDebug);
                });
                var breakBlockData = UITools.getBreakBlockData(this._editor, this._tmpBlockModel.getDataPorts(ModelEnums.EDataPortType.eInput), fromDebugByDataPortPath_1);
                this._editor.getOptions().playCommands.callbacks.onBreakBlockDataChange(breakBlockData);
                _super.prototype._onOk.call(this);
            }
            else {
                var dataPort = this._dataPort;
                var editor = this._editor;
                var jsonBlock = {};
                this._tmpBlockModel.toJSON(jsonBlock);
                _super.prototype._onOk.call(this);
                dataPort.getModel().block.fromJSON(jsonBlock); // Triggers the deletion of the dialog!
                editor.getHistoryController().registerEditAction(dataPort);
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
         * The callback on the dialog close event.
         * @private
         */
        UIDataPortDialog.prototype._onDialogCloseEvent = function () {
            this._onOk();
        };
        /**
         * Gets the dialog title.
         * @private
         * @static
         * @param {ModelEnums.EDataPortType} portType - The data port type.
         * @returns {string} The title of the dialog.
         */
        UIDataPortDialog._getTitle = function (portType) {
            var title;
            if (portType === ModelEnums.EDataPortType.eLocal) {
                title = UINLS.get('dialogTitleLocalDataPortEditor');
            }
            else if (portType === ModelEnums.EDataPortType.eInput) {
                title = UINLS.get('dialogTitleInputDataPortEditor');
            }
            else if (portType === ModelEnums.EDataPortType.eOutput) {
                title = UINLS.get('dialogTitleOutputDataPortEditor');
            }
            return title;
        };
        return UIDataPortDialog;
    }(UIValidationDialog));
    return UIDataPortDialog;
});
