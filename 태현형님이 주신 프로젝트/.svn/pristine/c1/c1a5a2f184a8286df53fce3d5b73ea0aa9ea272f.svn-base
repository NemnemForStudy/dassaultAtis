/*global WUXDockAreaEnum*/
/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptBlockDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptBlockDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIBlockDialog", "DS/EPSSchematicsUI/typings/WebUX/windows/EPSWUXDockingElement", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "css!DS/EPSSchematicsUI/css/dialogs/EPSSchematicsUIScriptBlockDialog"], function (require, exports, UIBlockDialog, WUXDockingElement, UIDom, UITools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // TODO: Move codeMirror instatiation here?!
    /**
     * This class defines a UI script block dialog.
     * @class UIScriptBlockDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptBlockDialog
     * @extends UIBlockDialog
     * @private
     */
    var UIScriptBlockDialog = /** @class */ (function (_super) {
        __extends(UIScriptBlockDialog, _super);
        /**
         * @constructor
         * @param {UIScriptBlock} block - The UI script block.
         * @param {IWUXDialogOptions} [options] - The dialog options.
         */
        function UIScriptBlockDialog(block, options) {
            var _this = _super.call(this, block, UITools.mergeObject({
                className: ['sch-script-block-dialog'],
                width: 1000
            }, options, true)) || this;
            _this._isEditableScript = false;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIScriptBlockDialog.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the dialog!
            this._isEditableScript = undefined;
        };
        /**
         * Gets the UI block of the dialog.
         * @public
         * @returns {UIBlock} The UI block of the dialog.
         */
        UIScriptBlockDialog.prototype.getUIBlock = function () {
            return this._block;
        };
        /**
         * The callback on the dialog close event.
         * @protected
         */
        UIScriptBlockDialog.prototype._onClose = function () {
            if (this._isEditableScript) {
                this._block.removeScriptEditor();
            }
            _super.prototype._onClose.call(this);
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIScriptBlockDialog.prototype._onOk = function () {
            if (this._isEditableScript) {
                var script = this._block.getCodeMirrorScript();
                if (script) {
                    this._tmpModel.setScriptContent(UITools.formatToSingleQuotes(script));
                }
            }
            _super.prototype._onOk.call(this);
        };
        /**
         * Creates the dialog content.
         * @protected
         */
        UIScriptBlockDialog.prototype._onCreateContent = function () {
            _super.prototype._onCreateContent.call(this);
            this._isEditableScript = !this._block.getModel().isTemplate();
            if (this._isEditableScript) {
                var tempParent = UIDom.createElement('div', { className: 'sch-dialog-content' });
                while (this._content.childNodes.length > 0) {
                    tempParent.appendChild(this._content.childNodes[0]);
                }
                var leftDockingElement = new WUXDockingElement({
                    side: WUXDockAreaEnum.LeftDockArea,
                    dockingZoneContent: tempParent,
                    dockingZoneSize: 490,
                    collapsibleFlag: true,
                    resizableFlag: true
                });
                leftDockingElement.freeZoneContent = this._block.createScriptEditor();
                this._content.appendChild(leftDockingElement.getContent());
                this._block.refreshScriptEditor();
            }
        };
        return UIScriptBlockDialog;
    }(UIBlockDialog));
    return UIScriptBlockDialog;
});
