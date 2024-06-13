/// <amd-module name='DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptTemplateDialog'/>
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
define("DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptTemplateDialog", ["require", "exports", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptBlockDialog", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools"], function (require, exports, UIScriptBlockDialog, UITemplateLibrary, UINLS, UITools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI script template dialog.
     * @class UIScriptTemplateDialog
     * @alias module:DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptTemplateDialog
     * @extends UIScriptBlockDialog
     * @private
     */
    var UIScriptTemplateDialog = /** @class */ (function (_super) {
        __extends(UIScriptTemplateDialog, _super);
        /**
         * @constructor
         * @param {string} scriptUid - The script block uid.
         * @param {boolean} isLocalTemplate - True for local template, false for global template.
         * @param {UIGraph} graph - The UI graph.
         */
        function UIScriptTemplateDialog(scriptUid, isLocalTemplate, graph) {
            var _this = this;
            var block = UIScriptTemplateDialog._getScriptBlock(scriptUid, isLocalTemplate, graph);
            _this = _super.call(this, block) || this;
            _this._scriptUid = scriptUid;
            _this._isLocalTemplate = isLocalTemplate;
            _this._graph = graph;
            return _this;
        }
        /**
         * Removes the dialog.
         * @public
         */
        UIScriptTemplateDialog.prototype.remove = function () {
            _super.prototype.remove.call(this); // Closes the dialog!
            this._scriptUid = undefined;
            this._isLocalTemplate = undefined;
            this._graph = undefined;
        };
        /**
         * Computes the dialog title.
         * @protected
         * @returns {string} The dialog title.
         */
        UIScriptTemplateDialog.prototype._computeTitle = function () {
            var title = _super.prototype._computeTitle.call(this);
            return UINLS.get('dialogTitleTemplateEditor') + ': ' + title;
        };
        /**
         * The callback on the dialog Ok button click event.
         * @protected
         */
        UIScriptTemplateDialog.prototype._onOk = function () {
            var script = this._block.getCodeMirrorScript();
            this._tmpModel.setScriptContent(UITools.formatToSingleQuotes(script));
            var templateLibrary = this._isLocalTemplate ? this._graph.getLocalTemplateLibrary() : UITemplateLibrary;
            this._tmpModel.graphContext = this._graph.getModel();
            templateLibrary.updateScript(this._scriptUid, this._tmpModel, undefined);
            _super.prototype._onOk.call(this);
        };
        /**
         * Gets the script reference from the template library.
         * @private
         * @static
         * @param {string} scriptUid - The script block uid.
         * @param {boolean} isLocalTemplate - True for local template, false for global template.
         * @param {UIGraph} graph - The UI graph.
         * @returns {UIScriptBlock} The UI script block.
         */
        UIScriptTemplateDialog._getScriptBlock = function (scriptUid, isLocalTemplate, graph) {
            var templateLibrary = isLocalTemplate ? graph.getLocalTemplateLibrary() : UITemplateLibrary;
            var script = templateLibrary.getScript(scriptUid);
            var UIScriptBlockCtor = require('DS/EPSSchematicsUI/nodes/EPSSchematicsUIScriptBlock');
            return new UIScriptBlockCtor(graph, script.model, 0, 0);
        };
        return UIScriptTemplateDialog;
    }(UIScriptBlockDialog));
    return UIScriptTemplateDialog;
});
