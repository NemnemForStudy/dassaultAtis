/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUIScriptBlock'/>
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
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUIScriptBlock", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUITemplatableBlock", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptBlockDialog", "DS/EPSSchematicsUI/dialogs/EPSSchematicsUIScriptTemplateDialog", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, UITemplatableBlock, UIScriptBlockDialog, UIScriptTemplateDialog, UITemplateLibrary, UIDom, Events) {
    "use strict";
    /**
     * This class defines a script block.
     * @class UIScriptBlock
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUIScriptBlock
     * @extends UITemplatableBlock
     * @private
     */
    var UIScriptBlock = /** @class */ (function (_super) {
        __extends(UIScriptBlock, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The graph that owns this block.
         * @param {ScriptBlock} model - The block model.
         * @param {number} left - The left position of the block.
         * @param {number} top - The top position of the block.
         */
        function UIScriptBlock(graph, model, left, top) {
            var _this = _super.call(this, graph, model, left, top) || this;
            _this._onBlockScriptContentChangeCB = _this._onBlockScriptContentChange.bind(_this);
            _this._onBlockTemplateChangeCB = _this._onBlockTemplateChange.bind(_this);
            // Specific to codeMirror editor
            _this._onKeyupCB = _this._onKeyup.bind(_this);
            _this._configurationDialog = new UIScriptBlockDialog(_this);
            _this._createTemplateDialog();
            _this._model.addListener(Events.BlockScriptContentChangeEvent, _this._onBlockScriptContentChangeCB);
            _this._model.addListener(Events.BlockTemplateChangeEvent, _this._onBlockTemplateChangeCB);
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
         * Removes the node from its parent graph.
         * @public
         */
        UIScriptBlock.prototype.remove = function () {
            this._removeTemplateDialog();
            if (this._model !== undefined) {
                this._model.removeListener(Events.BlockScriptContentChangeEvent, this._onBlockScriptContentChangeCB);
                this._model.removeListener(Events.BlockTemplateChangeEvent, this._onBlockTemplateChangeCB);
                this._onBlockScriptContentChangeCB = undefined;
                this._onBlockTemplateChangeCB = undefined;
            }
            this._codeMirror = undefined;
            this._onKeyupCB = undefined;
            this._refreshCB = undefined;
            _super.prototype.remove.call(this);
        };
        /**
         * Gets the script block model.
         * @public
         * @returns {ScriptBlock} The script block model.
         */
        UIScriptBlock.prototype.getModel = function () {
            return _super.prototype.getModel.call(this);
        };
        /**
         * Gets the script template dialog.
         * @public
         * @returns {UIScriptTemplateDialog} The script template dialog.
         */
        UIScriptBlock.prototype.getTemplateDialog = function () {
            return this._templateDialog;
        };
        /**
         * Opens the block configuration dialog.
         * @public
         */
        UIScriptBlock.prototype.openConfigurationDialog = function () {
            this._configurationDialog.open();
        };
        /**
         * Gets the codeMirror script.
         * @public
         * @returns {string} The codeMirror script.
         */
        UIScriptBlock.prototype.getCodeMirrorScript = function () {
            var _a;
            return (_a = this._codeMirror) === null || _a === void 0 ? void 0 : _a.getValue();
        };
        /**
         * Refreshes the script editor.
         * @public
         */
        UIScriptBlock.prototype.refreshScriptEditor = function () {
            if (this._codeMirror !== undefined) {
                this._codeMirror.refresh();
            }
        };
        /**
         * Creates the codeMirror script editor.
         * @public
         * @returns {HTMLDivElement} The parent html element aggregating the editor.
         */
        UIScriptBlock.prototype.createScriptEditor = function () {
            var scriptContainer = UIDom.createElement('div', {
                className: 'sch-codemirror-editor'
            });
            var callback = this._createCodeMirrorEditor.bind(this, scriptContainer);
            if (!window.hasOwnProperty('CodeMirror')) {
                UIDom.loadCSS('../CodeMirror/lib/codemirror.css');
                UIDom.loadJS('../CodeMirror/lib/codemirror.js', function () {
                    UIDom.loadJS('../CodeMirror/mode/javascript/javascript.js', function () {
                        UIDom.loadJS('../CodeMirror/mode/python/python.js', function () {
                            callback.call();
                        });
                    });
                });
            }
            else {
                callback.call();
            }
            return scriptContainer;
        };
        /**
         * Removes the script editor.
         * @private
         */
        UIScriptBlock.prototype.removeScriptEditor = function () {
            if (this._codeMirror !== undefined && this._refreshCB !== undefined) {
                this._codeMirror.off('focus', this._refreshCB);
                var wrapper = this._codeMirror.getWrapperElement();
                wrapper.removeEventListener('keyup', this._onKeyupCB, false);
            }
            this._codeMirror = undefined;
            this._refreshCB = undefined;
        };
        /**
         * Gets the code mirror script editor.
         * @public
         * @returns {ICodeMirror} The code mirror script editor.
         */
        UIScriptBlock.prototype.getScriptEditor = function () {
            return this._codeMirror;
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
         * Creates a local template from the block.
         * @protected
         */
        UIScriptBlock.prototype._createLocalTemplate = function () {
            if (!this._model.isTemplate()) {
                this._graph.getLocalTemplateLibrary().registerScript(this);
            }
        };
        /**
         * Creates a global template from the block.
         * @protected
         */
        UIScriptBlock.prototype._createGlobalTemplate = function () {
            if (!this._model.isTemplate()) {
                UITemplateLibrary.registerScript(this);
            }
        };
        /**
         * Converts the local template reference of the block to a global template reference.
         * @protected
         */
        UIScriptBlock.prototype._convertLocalTemplateToGlobalTemplate = function () {
            if (this._model.isLocalTemplate()) {
                var templateUid = this._model.getUid();
                UITemplateLibrary.registerScriptFromLocal(templateUid, this._graph.getGraphContext());
            }
        };
        /**
         * Edits the template reference.
         * This will impact all the template instances.
         * @protected
         */
        UIScriptBlock.prototype._editTemplateReference = function () {
            if (this._templateDialog) {
                this._templateDialog.open();
            }
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
         * Creates a codeMirror editor that will be appended to the specified parent DOM element.
         * @private
         * @param {HTMLElement} parent - The parent html element aggregating the editor.
         */
        UIScriptBlock.prototype._createCodeMirrorEditor = function (parent) {
            if (this._model !== undefined && window.hasOwnProperty('CodeMirror')) {
                this._codeMirror = new window.CodeMirror(parent, {
                    mode: this._model.getScriptLanguage().toLowerCase(),
                    value: this._model.getScriptContent(),
                    lineNumbers: true,
                    styleActiveLine: true
                });
                // Refresh the editor to prevent the no selectable last line bug!
                this._codeMirror.refresh();
                this._refreshCB = this._codeMirror.refresh.bind(this._codeMirror);
                this._codeMirror.on('focus', this._refreshCB);
                // Catch keyup event to prevent a key to close the dialog!
                var wrapper = this._codeMirror.getWrapperElement();
                wrapper.addEventListener('keyup', this._onKeyupCB, false);
            }
        };
        /**
         * Creates the template dialog.
         * @private
         */
        UIScriptBlock.prototype._createTemplateDialog = function () {
            this._removeTemplateDialog();
            if (this._model.isTemplate()) {
                this._templateDialog = new UIScriptTemplateDialog(this._model.getUid(), this._model.isLocalTemplate(), this._graph);
            }
        };
        /**
         * Removes the template dialog.
         * @private
         */
        UIScriptBlock.prototype._removeTemplateDialog = function () {
            if (this._templateDialog) {
                this._templateDialog.remove();
                this._templateDialog = undefined;
            }
        };
        /**
         * The callback on the model block script content change event.
         * @private
         */
        UIScriptBlock.prototype._onBlockScriptContentChange = function () {
            this.getGraph().onModelChange();
        };
        /**
         * The callback on the model block template change event.
         * @private
         */
        UIScriptBlock.prototype._onBlockTemplateChange = function () {
            this._createTemplateDialog();
        };
        /**
         * The callback on the editor keyup event.
         * It will catch keyup events to prevent the dialog to be closed
         * while writting text into the codeMirror editor.
         * @private
         * @param {KeyboardEvent} event - The keyup event.
         */
        // eslint-disable-next-line class-methods-use-this
        UIScriptBlock.prototype._onKeyup = function (event) {
            event.stopPropagation();
        };
        return UIScriptBlock;
    }(UITemplatableBlock));
    return UIScriptBlock;
});
