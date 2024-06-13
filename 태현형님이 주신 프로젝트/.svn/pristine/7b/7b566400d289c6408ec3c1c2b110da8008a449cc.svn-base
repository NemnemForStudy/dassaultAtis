/* global WUXIconDefinition */
/// <amd-module name='DS/EPSSchematicsUI/data/EPSSchematicsUIHistoryAction'/>
define("DS/EPSSchematicsUI/data/EPSSchematicsUIHistoryAction", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUINLSTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIFontIcon", "text!DS/EPSSchematicsUI/assets/EPSSchematicsUIHistoryAction.json"], function (require, exports, UINLSTools, UIFontIcon, UIHistoryActionJSON) {
    "use strict";
    var JSONHistoryAction = JSON.parse(UIHistoryActionJSON);
    /**
     * This class defines the history action.
     * @private
     * @class HistoryAction
     * @alias module:DS/EPSSchematicsUI/data/EPSSchematicsUIHistoryAction
     */
    var UIHistoryAction = /** @class */ (function () {
        /**
         * @private
         * @constructor
         * @param {ICommandType} action - The history action.
         */
        function UIHistoryAction(action) {
            this._action = undefined;
            this._action = action;
        }
        /**
         * Gets the corresponding history action short help.
         * @public
         * @param {UIHistoryAction} historyAction - The history action.
         * @returns {string} The history action short help.
         */
        UIHistoryAction.getShortHelp = function (historyAction) {
            return UINLSTools.getNLSFromString(historyAction._action.shortHelp);
        };
        /**
         * Gets the corresponding history action icon.
         * @public
         * @param {UIHistoryAction} historyAction - The history action.
         * @returns {WUXIconDefinition} The history action icon.
         */
        UIHistoryAction.getIcon = function (historyAction) {
            return UIFontIcon.getWUXIconFromCommand(historyAction._action);
        };
        UIHistoryAction.eCreateGraph = new UIHistoryAction(JSONHistoryAction.eCreateGraph);
        UIHistoryAction.eCreateBlock = new UIHistoryAction(JSONHistoryAction.eCreateBlock);
        UIHistoryAction.eCreateBlockControlPort = new UIHistoryAction(JSONHistoryAction.eCreateBlockControlPort);
        UIHistoryAction.eCreateBlockDataPort = new UIHistoryAction(JSONHistoryAction.eCreateBlockDataPort);
        UIHistoryAction.eCreateControlLink = new UIHistoryAction(JSONHistoryAction.eCreateControlLink);
        UIHistoryAction.eCreateDataLink = new UIHistoryAction(JSONHistoryAction.eCreateDataLink);
        UIHistoryAction.eCreateGraphControlPort = new UIHistoryAction(JSONHistoryAction.eCreateGraphControlPort);
        UIHistoryAction.eCreateGraphDataPort = new UIHistoryAction(JSONHistoryAction.eCreateGraphDataPort);
        UIHistoryAction.eCreateGraphEventPort = new UIHistoryAction(JSONHistoryAction.eCreateGraphEventPort);
        UIHistoryAction.eCreateShortcut = new UIHistoryAction(JSONHistoryAction.eCreateShortcut);
        UIHistoryAction.eCreateCustomType = new UIHistoryAction(JSONHistoryAction.eCreateCustomType);
        UIHistoryAction.eRemoveCustomType = new UIHistoryAction(JSONHistoryAction.eRemoveCustomType);
        UIHistoryAction.eEditCustomType = new UIHistoryAction(JSONHistoryAction.eEditCustomType);
        UIHistoryAction.eRemoveBlock = new UIHistoryAction(JSONHistoryAction.eRemoveBlock);
        UIHistoryAction.eRemoveBlockControlPort = new UIHistoryAction(JSONHistoryAction.eRemoveBlockControlPort);
        UIHistoryAction.eRemoveBlockDataPort = new UIHistoryAction(JSONHistoryAction.eRemoveBlockDataPort);
        UIHistoryAction.eRemoveControlLink = new UIHistoryAction(JSONHistoryAction.eRemoveControlLink);
        UIHistoryAction.eRemoveDataLink = new UIHistoryAction(JSONHistoryAction.eRemoveDataLink);
        UIHistoryAction.eRemoveGraphControlPort = new UIHistoryAction(JSONHistoryAction.eRemoveGraphControlPort);
        UIHistoryAction.eRemoveGraphDataPort = new UIHistoryAction(JSONHistoryAction.eRemoveGraphDataPort);
        UIHistoryAction.eRemoveGraphEventPort = new UIHistoryAction(JSONHistoryAction.eRemoveGraphEventPort);
        UIHistoryAction.eRemoveSelection = new UIHistoryAction(JSONHistoryAction.eRemoveSelection);
        UIHistoryAction.eRemoveShortcut = new UIHistoryAction(JSONHistoryAction.eRemoveShortcut);
        UIHistoryAction.eMoveBlock = new UIHistoryAction(JSONHistoryAction.eMoveBlock);
        UIHistoryAction.eMoveGraph = new UIHistoryAction(JSONHistoryAction.eMoveGraph);
        UIHistoryAction.eMoveGraphControlPort = new UIHistoryAction(JSONHistoryAction.eMoveGraphControlPort);
        UIHistoryAction.eMoveGraphEventPort = new UIHistoryAction(JSONHistoryAction.eMoveGraphEventPort);
        UIHistoryAction.eMoveShortcut = new UIHistoryAction(JSONHistoryAction.eMoveShortcut);
        UIHistoryAction.eMoveSelection = new UIHistoryAction(JSONHistoryAction.eMoveSelection);
        UIHistoryAction.eChangeViewer = new UIHistoryAction(JSONHistoryAction.eChangeViewer);
        UIHistoryAction.eEditBlock = new UIHistoryAction(JSONHistoryAction.eEditBlock);
        UIHistoryAction.eEditGraph = new UIHistoryAction(JSONHistoryAction.eEditGraph);
        UIHistoryAction.eEditGraphControlPort = new UIHistoryAction(JSONHistoryAction.eEditGraphControlPort);
        UIHistoryAction.eEditGraphDataPort = new UIHistoryAction(JSONHistoryAction.eEditGraphDataPort);
        UIHistoryAction.eEditBlockControlPort = new UIHistoryAction(JSONHistoryAction.eEditBlockControlPort);
        UIHistoryAction.eEditBlockDataPort = new UIHistoryAction(JSONHistoryAction.eEditBlockDataPort);
        UIHistoryAction.eLoadGraph = new UIHistoryAction(JSONHistoryAction.eLoadGraph);
        UIHistoryAction.eEditDataPortType = new UIHistoryAction(JSONHistoryAction.eEditDataPortType);
        UIHistoryAction.eEditDataPortTypeSelection = new UIHistoryAction(JSONHistoryAction.eEditDataPortTypeSelection);
        UIHistoryAction.eCreatePersistentLabel = new UIHistoryAction(JSONHistoryAction.eCreatePersistentLabel);
        UIHistoryAction.eRemovePersistentLabel = new UIHistoryAction(JSONHistoryAction.eRemovePersistentLabel);
        UIHistoryAction.eMovePersistentLabel = new UIHistoryAction(JSONHistoryAction.eMovePersistentLabel);
        UIHistoryAction.eResizePersistentLabel = new UIHistoryAction(JSONHistoryAction.eResizePersistentLabel);
        UIHistoryAction.eCreateComment = new UIHistoryAction(JSONHistoryAction.eCreateComment);
        UIHistoryAction.eRemoveComment = new UIHistoryAction(JSONHistoryAction.eRemoveComment);
        UIHistoryAction.eMoveComment = new UIHistoryAction(JSONHistoryAction.eMoveComment);
        UIHistoryAction.eResizeComment = new UIHistoryAction(JSONHistoryAction.eResizeComment);
        UIHistoryAction.eEditComment = new UIHistoryAction(JSONHistoryAction.eEditComment);
        UIHistoryAction.eClearGraph = new UIHistoryAction(JSONHistoryAction.eClearGraph);
        UIHistoryAction.eShowOptionalDataPort = new UIHistoryAction(JSONHistoryAction.eShowOptionalDataPort);
        UIHistoryAction.eHideOptionalDataPort = new UIHistoryAction(JSONHistoryAction.eHideOptionalDataPort);
        UIHistoryAction.eCreateNodeIdSelector = new UIHistoryAction(JSONHistoryAction.eCreateNodeIdSelector);
        UIHistoryAction.eRemoveNodeIdSelector = new UIHistoryAction(JSONHistoryAction.eRemoveNodeIdSelector);
        UIHistoryAction.eEditNodeIdSelector = new UIHistoryAction(JSONHistoryAction.eEditNodeIdSelector);
        return UIHistoryAction;
    }());
    return UIHistoryAction;
});
