/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortVisibilityDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortVisibilityDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIFadeOutDialog", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOptionalDataPorts", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIDataPortVisibilityDialog"], function (require, exports, UIFadeOutDialog, UINLS, UIDGVOptionalDataPorts) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data port visibility dialog.
     * @class UIDataPortVisibilityDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIDataPortVisibilityDialog
     * @extends UIFadeOutDialog
     * @private
     */
    var UIDataPortVisibilityDialog = /** @class */ (function (_super) {
        __extends(UIDataPortVisibilityDialog, _super);
        /**
         * @constructor
         * @public
         * @param {UIEditor} editor - The UI editor.
         * @param {UIBlock} blockUI - The UI block.
         */
        function UIDataPortVisibilityDialog(editor, blockUI) {
            var _this = _super.call(this, {
                title: UINLS.get('dialogTitleDataPortVisibilityEditor'),
                className: 'sch-dialog-visibility-dataport',
                immersiveFrame: editor.getImmersiveFrame(),
                resizableFlag: true,
                width: 300,
                minWidth: 300,
                height: 200
            }) || this;
            _this._blockUI = blockUI;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIDataPortVisibilityDialog.prototype.remove = function () {
            this._blockUI = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the data grid view.
         * @public
         * @returns {UIDGVOptionalDataPorts} The data grid view.
         */
        UIDataPortVisibilityDialog.prototype.getDataGridView = function () {
            return this._dataGridView;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIDataPortVisibilityDialog.prototype._onClose = function () {
            this._dataGridView.remove();
            this._dataGridView = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIDataPortVisibilityDialog.prototype._onCreateContent = function () {
            this._dataGridView = new UIDGVOptionalDataPorts(this._blockUI);
            this._content.appendChild(this._dataGridView.getElement());
            _super.prototype._onCreateContent.call(this);
        };
        return UIDataPortVisibilityDialog;
    }(UIFadeOutDialog));
    return UIDataPortVisibilityDialog;
});
