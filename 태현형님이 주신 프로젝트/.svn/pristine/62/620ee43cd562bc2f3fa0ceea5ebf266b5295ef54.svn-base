/// <amd-module name='DS/EPSSchematicsUI/data/EPSSchematicsUICommand'/>
define("DS/EPSSchematicsUI/data/EPSSchematicsUICommand", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools", "DS/EPSSchematicsUI/data/EPSSchematicsUIKeyboard", "css!DS/EPSSchematicsUI/css/data/EPSSchematicsUICommand"], function (require, exports, UINLSTools, UIKeyboard) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI command.
     * @class UICommand
     * @alias module:DS/EPSSchematicsUI/data/EPSSchematicsUICommand
     * @private
     */
    var UICommand = /** @class */ (function () {
        /**
         * @constructor
         * @param {UICommandType} commandType - The command type.
         * @param {Function} [callback] - The command callback.
         */
        function UICommand(commandType, callback) {
            this._commandType = commandType;
            this._callback = callback;
        }
        /**
         * Gets the command type.
         * @public
         * @returns {UICommandType} The command type.
         */
        UICommand.prototype.getCommandType = function () {
            return this._commandType;
        };
        /**
         * Gets the command callback.
         * @public
         * @returns {Function} The command callback.
         */
        UICommand.prototype.getCallback = function () {
            return this._callback;
        };
        /**
         * Gets the command icon.
         * @public
         * @returns {ICommandTypeIconDefinition} The command icon.
         */
        UICommand.prototype.getIcon = function () {
            return this._commandType.icon;
        };
        /**
         * Gets the command title.
         * @public
         * @returns {string} The command title.
         */
        UICommand.prototype.getTitle = function () {
            var title;
            if (this._commandType.title) {
                title = UINLSTools.getNLSFromString(this._commandType.title) || this._commandType.title;
                if (this._commandType.shortcut) {
                    title += ' ' + this._buildShortcut();
                }
            }
            return title;
        };
        /**
         * Gets the command short help.
         * @public
         * @returns {string} The command short help.
         */
        UICommand.prototype.getShortHelp = function () {
            var shortHelp;
            if (this._commandType.shortHelp !== undefined) {
                shortHelp = UINLSTools.getNLSFromString(this._commandType.shortHelp) || this._commandType.shortHelp;
                if (this._commandType.title === undefined && this._commandType.shortcut) {
                    shortHelp += ' ' + this._buildShortcut();
                }
            }
            return shortHelp;
        };
        /**
         * Builds the shortcut command.
         * @private
         * @returns {string} The shortcut command.
         */
        UICommand.prototype._buildShortcut = function () {
            var result;
            var shortcut = this._commandType.shortcut;
            if (shortcut !== undefined && (shortcut.key || shortcut.altKey || shortcut.ctrlKey || shortcut.shiftKey)) {
                var keys = shortcut.altKey ? 'Alt' : '';
                keys += shortcut.ctrlKey ? (keys.length ? '+' : '') + 'Ctrl' : '';
                keys += shortcut.shiftKey ? (keys.length ? '+' : '') + 'Shift' : '';
                keys += shortcut.key ? (keys.length ? '+' : '') + UIKeyboard[shortcut.key].getCode() : '';
                result = '<span class="sch-tooltip-shortcut">' + keys + '</span>';
            }
            return result;
        };
        return UICommand;
    }());
    return UICommand;
});
