/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIEditorSettingsDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIEditorSettingsDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVEditorSettings", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIEditorSettingsDialog"], function (require, exports, UIValidationDialog, UIDGVEditorSettings, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI editor settings dialog.
     * @class UIEditorSettingsDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIEditorSettingsDialog
     * @extends UIValidationDialog
     * @private
     */
    var UIEditorSettingsDialog = /** @class */ (function (_super) {
        __extends(UIEditorSettingsDialog, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIEditorSettingsDialog(editor) {
            var _this = _super.call(this, {
                title: UINLS.get('dialogTitleEditorSettings'),
                className: 'sch-dialog-editor-settings',
                immersiveFrame: editor.getImmersiveFrame(),
                width: 400,
                height: 200,
                icon: 'tools'
            }) || this;
            _this._editor = editor;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIEditorSettingsDialog.prototype.remove = function () {
            this._editor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the data grid view.
         * @public
         * @returns {UIDGVEditorSettings} The data grid view.
         */
        UIEditorSettingsDialog.prototype.getDataGridView = function () {
            return this._dataGridView;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIEditorSettingsDialog.prototype._onClose = function () {
            if (this._dataGridView !== undefined) {
                this._dataGridView.remove();
                this._dataGridView = undefined;
            }
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIEditorSettingsDialog.prototype._onCreateContent = function () {
            this._dataGridView = new UIDGVEditorSettings(this._editor);
            this.getContent().appendChild(this._dataGridView.getElement());
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIEditorSettingsDialog.prototype._onOk = function () {
            this._dataGridView.writeSettingValues();
            _super.prototype._onOk.call(this);
        };
        return UIEditorSettingsDialog;
    }(UIValidationDialog));
    return UIEditorSettingsDialog;
});
