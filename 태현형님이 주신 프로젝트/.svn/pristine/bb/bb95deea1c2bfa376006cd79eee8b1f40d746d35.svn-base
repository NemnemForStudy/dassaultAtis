/// <amd-module name='DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveRecordBasicDialog'/>
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
define("DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveRecordBasicDialog", ["require", "exports", "DS/CSIExecutionGraphUI/dialogs/CSIEGUIAbstractSaveRecordDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/Controls/Button", "DS/Controls/Toggle", "css!DS/CSIExecutionGraphUI/sass/dialogs/CSIEGUISaveRecordBasicDialog"], function (require, exports, CSIEGUIAbstractSaveRecordDialog, UIDom, WUXButton, WUXToggle) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a CSI Execution Graph UI save record basic dialog.
     * @class CSIEGUISaveRecordBasicDialog
     * @alias module:DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveRecordBasicDialog
     * @extends CSIEGUIAbstractSaveRecordDialog
     * @private
     */
    var CSIEGUISaveRecordBasicDialog = /** @class */ (function (_super) {
        __extends(CSIEGUISaveRecordBasicDialog, _super);
        /**
         * @constructor
         * @param {CSIExecutionGraphUIEditor} editor - The CSI Execution Graph UI editor.
         * @param {CSIEGUISaveGraphDialog} saveCSIGraphDialog - The save graph dialog.
         */
        function CSIEGUISaveRecordBasicDialog(editor, saveCSIGraphDialog) {
            var _this = _super.call(this, {
                title: 'Save CSI Record (basic)',
                className: 'csiegui-save-record-basic-dialog',
                icon: 'floppy',
                immersiveFrame: editor.getImmersiveFrame(),
                modalFlag: true,
                width: 500,
                height: 245
            }, editor, saveCSIGraphDialog) || this;
            _this._options.buttonsDefinition.Save = {
                label: 'Basic Save',
                onClick: _this._onBasicSaveButtonClick.bind(_this)
            };
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
        CSIEGUISaveRecordBasicDialog.prototype.remove = function () {
            _super.prototype.remove.call(this);
            this._expectedOutputRefToggle = undefined;
            this._backButton = undefined;
            this._advancedButton = undefined;
        };
        /**
         * Gets the back button.
         * @public
         * @returns {WUXButton} The back button.
         */
        CSIEGUISaveRecordBasicDialog.prototype.getBackButton = function () {
            return this._backButton;
        };
        /**
         * Gets the advanced button.
         * @public
         * @returns {WUXButton} The advanced button.
         */
        CSIEGUISaveRecordBasicDialog.prototype.getAdvancedButton = function () {
            return this._advancedButton;
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
        CSIEGUISaveRecordBasicDialog.prototype._onCreateContent = function () {
            UIDom.createElement('div', {
                className: 'csiegui-content-title',
                textContent: 'Elements included into this scenario?',
                parent: this._content
            });
            var tmpRecordInfo = this._editor._getTempRecordInfo();
            var poolName = tmpRecordInfo.poolName;
            var expectedStatus = this._getExpectedStatus();
            new WUXToggle({ type: 'checkbox', label: 'CSI Declarative Function', value: 0, checkFlag: true, disabled: true }).inject(this._content);
            new WUXToggle({ type: 'checkbox', label: 'Test Inputs CSI Parameters', value: 1, checkFlag: true, disabled: true }).inject(this._content);
            new WUXToggle({ type: 'checkbox', label: 'Pool to select "' + poolName + '"', value: 2, checkFlag: true, disabled: true }).inject(this._content);
            new WUXToggle({ type: 'checkbox', label: 'Expected status of the Graph "' + expectedStatus + '"', value: 3, checkFlag: true, disabled: true }).inject(this._content);
            this._expectedOutputRefToggle = new WUXToggle({
                type: 'checkbox', label: 'Expected Outputs reference CSI Parameters', value: 4, checkFlag: true, disabled: false
            }).inject(this._content);
            this._backButton = new WUXButton({
                label: 'Back',
                emphasize: 'secondary',
                onClick: this._onBackButtonClick.bind(this)
            });
            this._advancedButton = new WUXButton({
                label: 'Advanced Editing For Unit Test',
                emphasize: 'secondary',
                onClick: this._onAdvancedEditButtonClick.bind(this)
            });
            var footer = this._dialog.getContent().querySelector('.wux-windows-dialog-buttons');
            UIDom.createElement('div', {
                className: 'csiegui-dialog-footer-custom',
                parent: footer,
                children: [this._backButton.getContent(), this._advancedButton.getContent()]
            });
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
         * The callback on the back button click event.
         * @private
         */
        CSIEGUISaveRecordBasicDialog.prototype._onBackButtonClick = function () {
            this._saveCSIGraphDialog.setVisibleFlag(true);
            this.setVisibleFlag(false);
        };
        /**
         * The callback on the advanced edit button click event.
         * @private
         */
        CSIEGUISaveRecordBasicDialog.prototype._onAdvancedEditButtonClick = function () {
            this.setVisibleFlag(false);
            var saveCSIRecordAdvancedDialog = this._saveCSIGraphDialog.getSaveRecordAdvancedDialog();
            saveCSIRecordAdvancedDialog.open();
            saveCSIRecordAdvancedDialog.setVisibleFlag(true);
        };
        /**
         * The callback on the basic save button click event.
         * @private
         */
        CSIEGUISaveRecordBasicDialog.prototype._onBasicSaveButtonClick = function () {
            this._exportJSONRecordToFile({
                'function': true,
                inputs: true,
                poolToSelect: true,
                expectedStatus: true,
                outputs: this._expectedOutputRefToggle.checkFlag
            });
            this._saveCSIGraphDialog.close();
        };
        return CSIEGUISaveRecordBasicDialog;
    }(CSIEGUIAbstractSaveRecordDialog));
    return CSIEGUISaveRecordBasicDialog;
});
