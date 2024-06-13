/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIControlPortDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIControlPortDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVSingleControlPort", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums"], function (require, exports, UIValidationDialog, UIDGVSingleControlPort, UINLS, ModelEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a control port dialog.
     * @class UIControlPortDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIControlPortDialog
     * @extends UIValidationDialog
     * @private
     */
    var UIControlPortDialog = /** @class */ (function (_super) {
        __extends(UIControlPortDialog, _super);
        /**
         * @constructor
         * @param {UIControlPort} controlPort - The UI control port.
         */
        function UIControlPortDialog(controlPort) {
            var _this = _super.call(this, {
                title: UIControlPortDialog._getTitle(controlPort.getModel().getType()),
                className: 'sch-dialog-controlport',
                immersiveFrame: controlPort.getParentGraph().getEditor().getImmersiveFrame(),
                width: 400,
                height: 120
            }) || this;
            _this._controlPort = controlPort;
            _this._editor = controlPort.getParentGraph().getEditor();
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
        UIControlPortDialog.prototype.remove = function () {
            this._controlPort = undefined;
            this._editor = undefined;
            this._tmpBlockModel = undefined;
            this._dataGridView = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Closes the dialog.
         * @public
         */
        UIControlPortDialog.prototype.close = function () {
            if (this._dataGridView) {
                this._dataGridView.remove();
            }
            this._tmpBlockModel = undefined;
            this._dataGridView = undefined;
            _super.prototype.close.call(this);
        };
        /**
         * Gets the single control port data grid view.
         * @public
         * @returns {UIDGVSingleControlPort} THe single control port data grid view.
         */
        UIControlPortDialog.prototype.getDataGridView = function () {
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
        UIControlPortDialog.prototype._onCreateContent = function () {
            this._tmpBlockModel = this._controlPort.getParent().getModel().clone();
            this._dataGridView = new UIDGVSingleControlPort(this._editor, this._tmpBlockModel, this._controlPort.getName());
            this._content.appendChild(this._dataGridView.getElement());
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIControlPortDialog.prototype._onOk = function () {
            var controlPort = this._controlPort;
            var editor = this._editor;
            var jsonBlock = {};
            this._tmpBlockModel.toJSON(jsonBlock);
            _super.prototype._onOk.call(this);
            controlPort.getParent().getModel().fromJSON(jsonBlock); // Triggers the deletion of the dialog!
            editor.getHistoryController().registerEditAction(controlPort);
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
         * Gets the dialog title.
         * @private
         * @static
         * @param {ModelEnums.EControlPortType} portType - The control port type.
         * @returns {string} The title of the dialog.
         */
        UIControlPortDialog._getTitle = function (portType) {
            var title;
            if (portType === ModelEnums.EControlPortType.eInput) {
                title = UINLS.get('dialogTitleInputControlPortEditor');
            }
            else if (portType === ModelEnums.EControlPortType.eOutput) {
                title = UINLS.get('dialogTitleOutputControlPortEditor');
            }
            else if (portType === ModelEnums.EControlPortType.eInputEvent) {
                title = UINLS.get('dialogTitleInputEventPortEditor');
            }
            else if (portType === ModelEnums.EControlPortType.eOutputEvent) {
                title = UINLS.get('dialogTitleOutputEventPortEditor');
            }
            return title;
        };
        return UIControlPortDialog;
    }(UIValidationDialog));
    return UIControlPortDialog;
});
