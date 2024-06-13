/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIClearGraphDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIClearGraphDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIClearGraphDialog"], function (require, exports, UIValidationDialog, UINLS, UIFontIcon, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a clear graph dialog.
     * @class UIClearGraphDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIClearGraphDialog
     * @extends UIValidationDialog
     * @private
     * @param {UIViewer} viewer - The graph viewer.
     * @param {function} closeCB - The callback function called when the dialog is closed.
     */
    var UIClearGraphDialog = /** @class */ (function (_super) {
        __extends(UIClearGraphDialog, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIClearGraphDialog(editor) {
            var _this = _super.call(this, {
                title: UINLS.get('shortHelpClearGraph'),
                className: 'sch-dialog-cleargraph',
                immersiveFrame: editor.getImmersiveFrame()
            }) || this;
            _this._editor = editor;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIClearGraphDialog.prototype.remove = function () {
            this._editor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIClearGraphDialog.prototype._onOk = function () {
            this._editor.getViewerController().removeAllViewers();
            var options = this._editor.getOptions();
            var viewer = this._editor._getViewer();
            var callback = options.onClear || viewer.loadDefaultGraph.bind(viewer);
            callback();
            this._editor.getHistoryController().registerClearGraphAction();
            _super.prototype._onOk.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIClearGraphDialog.prototype._onCreateContent = function () {
            var dialogContent = this.getContent();
            UIFontIcon.create3DSFontIcon('broom', { parent: dialogContent });
            UIDom.createElement('div', {
                parent: dialogContent,
                textContent: UINLS.get('dialogContentClearGraphQuestion')
            });
        };
        return UIClearGraphDialog;
    }(UIValidationDialog));
    return UIClearGraphDialog;
});
