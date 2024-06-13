/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS"], function (require, exports, UIBaseDialog, UITools, UINLS) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI validation dialog.
     * @class UIValidationDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog
     * @extends UIBaseDialog
     * @private
     * @abstract
     */
    var UIValidationDialog = /** @class */ (function (_super) {
        __extends(UIValidationDialog, _super);
        /**
         * @constructor
         * @param {IWUXDialogOptions} options - The dialog options.
         */
        function UIValidationDialog(options) {
            var _this = this;
            options.resizableFlag = UITools.getOptionValue(options.resizableFlag, true);
            options.modalFlag = UITools.getOptionValue(options.modalFlag, true);
            options.allowMaximizeFlag = UITools.getOptionValue(options.allowMaximizeFlag, true);
            options.maximizeButtonFlag = UITools.getOptionValue(options.maximizeButtonFlag, true);
            _this = _super.call(this, options) || this;
            _this._options.buttonsDefinition = {
                Ok: {
                    label: UINLS.get('buttonOK'),
                    onClick: _this._onOk.bind(_this)
                },
                Cancel: {
                    label: UINLS.get('buttonCancel'),
                    onClick: _this._onCancel.bind(_this)
                }
            };
            return _this;
        }
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIValidationDialog.prototype._onOk = function () {
            if (typeof this._options.onOk === 'function') {
                this._options.onOk(this);
            }
            this.close();
        };
        /**
         * The callback on the dialog Cancel button click event.
         * @private
         */
        UIValidationDialog.prototype._onCancel = function () {
            if (typeof this._options.onCancel === 'function') {
                this._options.onCancel(this);
            }
            this.close();
        };
        return UIValidationDialog;
    }(UIBaseDialog));
    return UIValidationDialog;
});
