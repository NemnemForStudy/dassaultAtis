/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUICustomTypeNameDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUICustomTypeNameDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/Controls/LineEditor", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUICustomTypeNameDialog"], function (require, exports, UIValidationDialog, TypeLibrary, Tools, UINLS, WUXLineEditor) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI custom type name dialog.
     * @class UICustomTypeNameDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUICustomTypeNameDialog
     * @extends UIValidationDialog
     * @private
     */
    var UICustomTypeNameDialog = /** @class */ (function (_super) {
        __extends(UICustomTypeNameDialog, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {function} onClose - The callback on the dialog close event.
         */
        function UICustomTypeNameDialog(editor, onClose) {
            var _this = _super.call(this, {
                title: UINLS.get('dialogTitleCreateCustomType'),
                className: 'sch-dialog-createtype',
                immersiveFrame: editor.getImmersiveFrame(),
                onClose: onClose
            }) || this;
            _this._editor = editor;
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
        UICustomTypeNameDialog.prototype.remove = function () {
            this._editor = undefined;
            this._lineEditor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Opens the dialog.
         * @public
         * @param {DataPort} [dataPort] - The data port model to update.
         */
        UICustomTypeNameDialog.prototype.open = function (dataPort) {
            this._dataPort = dataPort;
            _super.prototype.open.call(this);
        };
        /**
         * Gets the WUX line editor.
         * @public
         * @returns {WuxLineEditor} The WUX line editor.
         */
        UICustomTypeNameDialog.prototype.getLineEditor = function () {
            return this._lineEditor;
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
         * The callback on the dialog close event.
         * @protected
         */
        UICustomTypeNameDialog.prototype._onClose = function () {
            var typeName = this._lineEditor.value !== '' ? this._lineEditor.value : undefined;
            this._lineEditor = undefined;
            this._dataPort = undefined;
            _super.prototype._onClose.call(this, typeName);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UICustomTypeNameDialog.prototype._onCreateContent = function () {
            var _this = this;
            this.getDialog().defaultButton.disabled = true;
            this._lineEditor = new WUXLineEditor({
                placeholder: UINLS.get('placeholderNewCustomTypeName'),
                requiredFlag: true,
                pattern: '^[a-zA-Z0-9_]+$',
                value: '',
                autoCorrectFlag: false,
                displayClearFieldButtonFlag: true
            }).inject(this.getContent());
            var input = this._lineEditor.getContent().querySelector('input');
            input.title = UINLS.get('shortHelpInvalidCustomTypeName');
            input.spellcheck = false;
            this._lineEditor.addEventListener('uncommittedChange', function (event) {
                var typeName = event.dsModel.valueToCommit.trim();
                var hasTypeName = TypeLibrary.hasTypeName(typeName);
                var isNameValid = Tools.regExpAlphanumeric.test(typeName);
                var title = UINLS.get('shortHelpInvalidCustomTypeName');
                var customValidity = '';
                var disabled = false;
                if (!isNameValid || hasTypeName) {
                    if (hasTypeName) {
                        title = UINLS.get('shortHelpExistingCustomTypeName');
                    }
                    customValidity = 'error';
                    disabled = true;
                }
                input.title = title;
                input.setCustomValidity(customValidity);
                _this.getDialog().defaultButton.disabled = disabled;
            }, false);
            this._lineEditor.getContent().tabIndex = 0;
            this._lineEditor.getContent().focus();
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UICustomTypeNameDialog.prototype._onOk = function () {
            var graphContext = this._editor._getViewer().getMainGraph().getModel().getGraphContext();
            var typeName = this._lineEditor.value;
            if (typeName !== undefined && typeName !== '') {
                TypeLibrary.registerLocalCustomObjectType(graphContext, typeName, {});
                this._editor.getHistoryController().registerCreateCustomTypeAction();
                this._editor.getTypeLibraryController().sortTypes();
                if (this._dataPort !== undefined) {
                    var noTempDataPort = graphContext.getObjectFromPath(this._dataPort.toPath());
                    noTempDataPort.setValueType(typeName);
                }
            }
            _super.prototype._onOk.call(this);
        };
        return UICustomTypeNameDialog;
    }(UIValidationDialog));
    return UICustomTypeNameDialog;
});
