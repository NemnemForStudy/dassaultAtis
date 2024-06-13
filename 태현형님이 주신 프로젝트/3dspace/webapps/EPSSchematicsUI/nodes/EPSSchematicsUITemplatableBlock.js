/// <amd-module name='DS/EPSSchematicsUI/nodes/EPSSchematicsUITemplatableBlock'/>
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("DS/EPSSchematicsUI/nodes/EPSSchematicsUITemplatableBlock", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/data/EPSSchematicsUICommand", "DS/EPSSchematicsUI/data/EPSSchematicsUICommandType"], function (require, exports, UIBlock, UICommand, UICommandType) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI templatable block.
     * @class UITemplatableBlock
     * @alias module:DS/EPSSchematicsUI/nodes/EPSSchematicsUITemplatableBlock
     * @extends UIBlock
     * @abstract
     * @private
     */
    var UITemplatableBlock = /** @class */ (function (_super) {
        __extends(UITemplatableBlock, _super);
        /**
         * @constructor
         * @param {UIGraph} graph - The graph that owns this block.
         * @param {Block} model - The block model.
         * @param {number} left - The left position of the block.
         * @param {number} top - The top position of the block.
         */
        function UITemplatableBlock(graph, model, left, top) {
            return _super.call(this, graph, model, left, top) || this;
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
         * Gets the list of available commands.
         * @public
         * @returns {UICommand[]} The list of available commands.
         */
        UITemplatableBlock.prototype.getCommands = function () {
            var commands = _super.prototype.getCommands.call(this);
            var newCommands = [];
            if (this._model.isTemplate()) {
                newCommands = this._getCommandsFromTemplatedBlock();
                // Remove the open block documentation command
                var index_1 = commands.findIndex(function (command) { return command.getCommandType() === UICommandType.eOpenBlockDocumentation; });
                commands.splice(index_1, 1);
            }
            else {
                newCommands = this._getCommandsFromTemplatableBlock();
            }
            var index = commands.findIndex(function (command) { return command.getCommandType() === UICommandType.eEdit; });
            commands.splice.apply(commands, __spreadArray([index + 1, 0], newCommands, false));
            return commands;
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
         * Gets the list of available templatable block related commands.
         * @private
         * @returns {UICommand[]} The list of available templatable block related commands.
         */
        UITemplatableBlock.prototype._getCommandsFromTemplatableBlock = function () {
            var commands = [];
            var options = this._graph.getEditor().getOptions();
            if (options.templates.enableLocalTemplates && this._model.isLocalTemplatable()) {
                commands.push(new UICommand(UICommandType.eCreateLocalTemplate, this._createLocalTemplate.bind(this)));
            }
            if (options.templates.enableGlobalTemplates && this._model.isGlobalTemplatable()) {
                commands.push(new UICommand(UICommandType.eCreateGlobalTemplate, this._createGlobalTemplate.bind(this)));
            }
            return commands;
        };
        /**
         * Untemplates the script block.
         * @protected
         */
        UITemplatableBlock.prototype._untemplate = function () {
            if (this._model.isTemplate()) {
                this._model.untemplate();
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
         * Gets the list of available templated block related commands.
         * @private
         * @returns {UICommand[]} The list of available templated block related commands.
         */
        UITemplatableBlock.prototype._getCommandsFromTemplatedBlock = function () {
            var commands = [];
            if (this._model.isTemplate()) {
                commands.push(new UICommand(UICommandType.eEditTemplate, this._editTemplateReference.bind(this)));
                commands.push(new UICommand(UICommandType.eUntemplate, this._untemplate.bind(this)));
                var options = this._graph.getEditor().getOptions();
                if (this._model.isLocalTemplate() && options.templates.enableGlobalTemplates) {
                    commands.push(new UICommand(UICommandType.eConvertLocalToGlobalTemplate, this._convertLocalTemplateToGlobalTemplate.bind(this)));
                }
            }
            return commands;
        };
        return UITemplatableBlock;
    }(UIBlock));
    return UITemplatableBlock;
});
