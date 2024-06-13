/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIInputTestDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIInputTestDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest", "DS/Controls/Button", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIIOTestDialog"], function (require, exports, UIValidationDialog, UIFontIcon, UIWUXTools, UIDGVInputTest, WUXButton, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI input test dialog.
     * @class UIInputTestDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIInputTestDialog
     * @extends UIValidationDialog
     * @private
     */
    var UIInputTestDialog = /** @class */ (function (_super) {
        __extends(UIInputTestDialog, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIInputTestDialog(editor) {
            var _this = _super.call(this, {
                title: 'Test inputs editor',
                className: ['sch-dialog-iotest', 'sch-dialog-inputtest'],
                immersiveFrame: editor.getImmersiveFrame(),
                width: 600,
                height: 400
            }) || this;
            _this._editor = editor;
            return _this;
        }
        /**
         * Removes the dialog.
         * @override
         * @public
         */
        UIInputTestDialog.prototype.remove = function () {
            this._editor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the data grid view.
         * @public
         * @returns {UIDGVInputTest} The data grid view.
         */
        UIInputTestDialog.prototype.getDataGridView = function () {
            return this._dataGridView;
        };
        /**
         * Gets the open button.
         * @public
         * @returns {WUXButton} The open button.
         */
        UIInputTestDialog.prototype.getOpenButton = function () {
            return this._importButton;
        };
        /**
         * Gets the save button.
         * @public
         * @returns {WUXButton} The save button.
         */
        UIInputTestDialog.prototype.getSaveButton = function () {
            return this._exportButton;
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIInputTestDialog.prototype._onOk = function () {
            this._dataGridView.applyTestValues();
            _super.prototype._onOk.call(this);
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIInputTestDialog.prototype._onClose = function () {
            if (this._dataGridView !== undefined) {
                this._dataGridView.remove();
                this._dataGridView = undefined;
            }
            this._importButton = undefined;
            this._exportButton = undefined;
            _super.prototype._onClose.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIInputTestDialog.prototype._onCreateContent = function () {
            var topContainer = UIDom.createElement('div', { className: 'sch-top-container', parent: this.getContent() });
            var bottomContainer = UIDom.createElement('div', { className: 'sch-bottom-container', parent: this.getContent() });
            var testEditor = this._editor.getOptions().tabViewMode.testEditor;
            if (testEditor.onOpenInputTest !== undefined) {
                this._importButton = new WUXButton({
                    label: 'Open',
                    emphasize: 'primary',
                    icon: UIFontIcon.getWUXFAIconDefinition('folder-open'),
                    tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Open input test file' }),
                    onClick: function () { return testEditor.onOpenInputTest(); }
                }).inject(topContainer);
            }
            if (testEditor.onSaveInputTest !== undefined) {
                this._exportButton = new WUXButton({
                    label: 'Save',
                    emphasize: 'primary',
                    icon: UIFontIcon.getWUXFAIconDefinition('floppy-o'),
                    tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Save input test file' }),
                    onClick: function () { return testEditor.onSaveInputTest(); }
                }).inject(topContainer);
            }
            this._dataGridView = new UIDGVInputTest(this._editor);
            bottomContainer.appendChild(this._dataGridView.getElement());
        };
        return UIInputTestDialog;
    }(UIValidationDialog));
    return UIInputTestDialog;
});
