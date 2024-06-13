/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIOutputTestDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIOutputTestDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIValidationDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOutputTest", "DS/Controls/Button", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIIOTestDialog"], function (require, exports, UIValidationDialog, UIFontIcon, UIWUXTools, UIDGVOutputTest, WUXButton, UIDom) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: NLS to be done!
    /**
     * This class defines a UI output test dialog.
     * @class UIOutputTestDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIOutputTestDialog
     * @extends UIValidationDialog
     * @private
     */
    var UIOutputTestDialog = /** @class */ (function (_super) {
        __extends(UIOutputTestDialog, _super);
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UIOutputTestDialog(editor) {
            var _this = _super.call(this, {
                title: 'Test outputs reference editor',
                className: ['sch-dialog-iotest', 'sch-dialog-outputtest'],
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
        UIOutputTestDialog.prototype.remove = function () {
            this._editor = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the data grid view.
         * @public
         * @returns {UIDGVOutputTest} The data grid view.
         */
        UIOutputTestDialog.prototype.getDataGridView = function () {
            return this._dataGridView;
        };
        /**
         * Gets the open button.
         * @public
         * @returns {WUXButton} The open button.
         */
        UIOutputTestDialog.prototype.getOpenButton = function () {
            return this._importButton;
        };
        /**
         * Gets the save button.
         * @public
         * @returns {WUXButton} The save button.
         */
        UIOutputTestDialog.prototype.getSaveButton = function () {
            return this._exportButton;
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIOutputTestDialog.prototype._onOk = function () {
            this._dataGridView.applyTestValues();
            _super.prototype._onOk.call(this);
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIOutputTestDialog.prototype._onClose = function () {
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
        UIOutputTestDialog.prototype._onCreateContent = function () {
            var topContainer = UIDom.createElement('div', { className: 'sch-top-container', parent: this.getContent() });
            var bottomContainer = UIDom.createElement('div', { className: 'sch-bottom-container', parent: this.getContent() });
            var testEditor = this._editor.getOptions().tabViewMode.testEditor;
            if (testEditor.onOpenOutputTest !== undefined) {
                this._importButton = new WUXButton({
                    label: 'Open',
                    emphasize: 'primary',
                    icon: UIFontIcon.getWUXFAIconDefinition('folder-open'),
                    tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Open output reference file' }),
                    onClick: function () { return testEditor.onOpenOutputTest(); }
                }).inject(topContainer);
            }
            if (testEditor.onSaveOutputTest !== undefined) {
                this._exportButton = new WUXButton({
                    label: 'Save',
                    emphasize: 'primary',
                    icon: UIFontIcon.getWUXFAIconDefinition('floppy-o'),
                    tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Save output reference file' }),
                    onClick: function () { return testEditor.onSaveOutputTest(); }
                }).inject(topContainer);
            }
            /*this.updateButton = new WUXButton({
                label: 'Update',
                emphasize: 'primary',
                disabled: true,
                icon: UIFontIcon.getWUXFAIconDefinition('download'),
                tooltipInfos: UIWUXTools.createTooltip({ shortHelp: 'Update from play result' }),
                onClick: () => {}
            }).inject(topContainer) as WUXButton;*/
            this._dataGridView = new UIDGVOutputTest(this._editor);
            bottomContainer.appendChild(this._dataGridView.getElement());
        };
        return UIOutputTestDialog;
    }(UIValidationDialog));
    return UIOutputTestDialog;
});
