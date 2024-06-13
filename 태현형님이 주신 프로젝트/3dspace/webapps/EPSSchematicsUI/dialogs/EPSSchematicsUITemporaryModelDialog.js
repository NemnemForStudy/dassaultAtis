/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUITemporaryModelDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUITemporaryModelDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog"], function (require, exports, UIValidationDialog) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a port dialog.
     * @class UITemporaryModelDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUITemporaryModelDialog
     * @extends UIValidationDialog
     * @abstract
     * @private
     */
    var UITemporaryModelDialog = /** @class */ (function (_super) {
        __extends(UITemporaryModelDialog, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {Block} model - The block model.
         * @param {IWUXDialogOptions} options - The WUX dialog options.
         */
        function UITemporaryModelDialog(editor, model, options) {
            var _this = _super.call(this, options) || this;
            _this._editor = editor;
            _this._model = model;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UITemporaryModelDialog.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the dialog!
            this._editor = undefined;
            this._model = undefined;
            this._tmpModel = undefined;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UITemporaryModelDialog.prototype._onClose = function () {
            this._tmpModel = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UITemporaryModelDialog.prototype._onCreateContent = function () {
            this._tmpModel = this._model.clone();
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UITemporaryModelDialog.prototype._onOk = function () {
            var jsonBlock = {};
            this._tmpModel.toJSON(jsonBlock);
            this._model.fromJSON(jsonBlock);
            _super.prototype._onOk.call(this);
        };
        return UITemporaryModelDialog;
    }(UIValidationDialog));
    return UITemporaryModelDialog;
});
