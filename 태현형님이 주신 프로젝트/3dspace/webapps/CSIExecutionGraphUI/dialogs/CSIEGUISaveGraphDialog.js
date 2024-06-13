/* global WUXManagedFontIcons */
/// <amd-module name='DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveGraphDialog'/>
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
define("DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveGraphDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBaseDialog", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFileSaver", "DS/Controls/Button", "DS/Controls/TooltipModel", "DS/CSIExecutionGraphUI/tools/CSIEGUITools", "DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveRecordBasicDialog", "DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveRecordAdvancedDialog", "css!DS/CSIExecutionGraphUI/sass/dialogs/CSIEGUISaveGraphDialog"], function (require, exports, UIBaseDialog, UIDom, UIFileSaver, WUXButton, WUXTooltipModel, CSIEGUITools, CSIEGUISaveRecordBasicDialog, CSIEGUISaveRecordAdvancedDialog) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a CSI Execution Graph UI save graph dialog.
     * @class CSIEGUISaveGraphDialog
     * @alias module:DS/CSIExecutionGraphUI/dialogs/CSIEGUISaveGraphDialog
     * @extends UIBaseDialog
     * @private
     */
    var CSIEGUISaveGraphDialog = /** @class */ (function (_super) {
        __extends(CSIEGUISaveGraphDialog, _super);
        /**
         * @constructor
         * @param {CSIExecutionGraphUIEditor} editor - The CSI Execution Graph UI Editor.
         */
        function CSIEGUISaveGraphDialog(editor) {
            var _this = _super.call(this, {
                title: 'Save Graph',
                className: 'csiegui-save-graph-dialog',
                icon: 'floppy',
                immersiveFrame: editor.getImmersiveFrame(),
                modalFlag: true,
                width: 500,
                height: 245
            }) || this;
            _this._csiRecordButtonDisabledState = true;
            _this._editor = editor;
            _this._fileSaver = new UIFileSaver();
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
        CSIEGUISaveGraphDialog.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the dialog first!
            this._editor = undefined;
            this._saveCSIGraphButton = undefined;
            this._saveCSIRecordButton = undefined;
            this._csiRecordButtonDisabledState = undefined;
            this._fileSaver = undefined;
            this._saveRecordBasicDialog = undefined;
            this._saveRecordAdvancedDialog = undefined;
        };
        /**
         * Closes the dialog.
         * @public
         */
        CSIEGUISaveGraphDialog.prototype.close = function () {
            if (this._saveRecordBasicDialog) {
                this._saveRecordBasicDialog.remove();
                this._saveRecordBasicDialog = undefined;
            }
            if (this._saveRecordAdvancedDialog) {
                this._saveRecordAdvancedDialog.remove();
                this._saveRecordAdvancedDialog = undefined;
            }
            this._saveCSIGraphButton = undefined;
            this._saveCSIRecordButton = undefined;
            _super.prototype.close.call(this);
        };
        /**
         * Gets the save record basic dialog.
         * @public
         * @returns {CSIEGUISaveRecordBasicDialog} The save record basic dialog.
         */
        CSIEGUISaveGraphDialog.prototype.getSaveRecordBasicDialog = function () {
            return this._saveRecordBasicDialog;
        };
        /**
         * Gets the save record advanced dialog.
         * @public
         * @returns {CSIEGUISaveRecordAdvancedDialog} The save record advanced dialog.
         */
        CSIEGUISaveGraphDialog.prototype.getSaveRecordAdvancedDialog = function () {
            return this._saveRecordAdvancedDialog;
        };
        /**
         * Sets the CSI record button disabled state.
         * @public
         * @param {boolean} disabledState - The CSI record button disabled state.
         */
        CSIEGUISaveGraphDialog.prototype.setCSIRecordButtonDisabledState = function (disabledState) {
            this._csiRecordButtonDisabledState = disabledState;
        };
        /**
         * Gets the file saver.
         * @public
         * @returns {UIFileSaver} The file saver.
         */
        CSIEGUISaveGraphDialog.prototype.getFileSaver = function () {
            return this._fileSaver;
        };
        /**
         * Gets the save CSI graph button.
         * @public
         * @returns {WUXButton} The save CSI graph button.
         */
        CSIEGUISaveGraphDialog.prototype.getSaveCSIGraphButton = function () {
            return this._saveCSIGraphButton;
        };
        /**
         * Gets the save CSI record button.
         * @public
         * @returns {WUXButton} The save CSI record button.
         */
        CSIEGUISaveGraphDialog.prototype.getSaveCSIRecordButton = function () {
            return this._saveCSIRecordButton;
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
        CSIEGUISaveGraphDialog.prototype._onCreateContent = function () {
            this._saveRecordBasicDialog = new CSIEGUISaveRecordBasicDialog(this._editor, this);
            this._saveRecordAdvancedDialog = new CSIEGUISaveRecordAdvancedDialog(this._editor, this);
            UIDom.createElement('div', {
                className: 'csiegui-content-title',
                textContent: 'For which purpose do you want to save this Graph?',
                parent: this._content
            });
            this._saveCSIGraphButton = new WUXButton({
                emphasize: 'secondary',
                icon: { iconName: 'rocket', fontIconFamily: WUXManagedFontIcons.FontAwesome, fontIconSize: '3x' },
                onClick: this._onSaveCSIGraphButtonClick.bind(this),
                allowUnsafeHTMLLabel: true
            }).inject(this._content);
            UIDom.createElement('div', {
                className: 'csiegui-button-content',
                parent: this._saveCSIGraphButton.getContent(),
                children: [
                    UIDom.createElement('div', { textContent: 'Deliver it and use it in my service' }),
                    UIDom.createElement('div', { innerHTML: 'Save the Graph as a CSI Declarative Function ' + CSIEGUITools.createHelpLink('http://executionfw.dsone.3ds.com/docs/csi/BasicDocumentation/Function/') })
                ]
            });
            this._saveCSIRecordButton = new WUXButton({
                emphasize: 'secondary',
                icon: { iconName: 'tape', fontIconFamily: WUXManagedFontIcons.Font3DS, fontIconSize: '3x' },
                onClick: this._onSaveCSIRecordButtonClick.bind(this),
                disabled: this._csiRecordButtonDisabledState,
                allowUnsafeHTMLLabel: true
            }).inject(this._content);
            if (this._csiRecordButtonDisabledState) {
                this._saveCSIRecordButton.tooltipInfos = new WUXTooltipModel({
                    title: 'You must do a Play before you can record and save a scenario.'
                });
            }
            UIDom.createElement('div', {
                className: 'csiegui-button-content',
                parent: this._saveCSIRecordButton.getContent(),
                children: [
                    UIDom.createElement('div', { textContent: 'Test it and use it as a scenario' }),
                    UIDom.createElement('div', { innerHTML: 'Save the Graph, the Test Inputs and Outputs Reference as a CSI&nbsp;Record for Unit Test ' + CSIEGUITools.createHelpLink('http://executionfw.dsone.3ds.com/docs/graph/advanced_features/#tests-with-csirecord') + ' or Scalability Tester ' + CSIEGUITools.createHelpLink('http://executionfw.dsone.3ds.com/executionfw/?scalability') })
                ]
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
         * The callback on the save CSI graph button click event.
         * @private
         */
        CSIEGUISaveGraphDialog.prototype._onSaveCSIGraphButtonClick = function () {
            this._exportJSONGraphToFile();
            this.close();
        };
        /**
         * The callback on the save CSI record button click event.
         * @private
         */
        CSIEGUISaveGraphDialog.prototype._onSaveCSIRecordButtonClick = function () {
            this.setVisibleFlag(false);
            this._saveRecordBasicDialog.open();
            this._saveRecordBasicDialog.setVisibleFlag(true);
        };
        /**
         * Exports the JSON graph to file.
         * @private
         */
        CSIEGUISaveGraphDialog.prototype._exportJSONGraphToFile = function () {
            var jsonFct = this._editor.getJSONFunction(true);
            var fctInfo = CSIEGUITools.getCSIFunctionInfo(this._editor.getGraphModel());
            var fileName = fctInfo.name && fctInfo.version ? fctInfo.name + '_v' + fctInfo.version + '.json' : 'newExecutionGraphFuntion_v1.json';
            var content = JSON.stringify(JSON.parse(jsonFct), undefined, 2) + '\n';
            this._fileSaver.saveTextFile(content, fileName);
        };
        return CSIEGUISaveGraphDialog;
    }(UIBaseDialog));
    return CSIEGUISaveGraphDialog;
});
