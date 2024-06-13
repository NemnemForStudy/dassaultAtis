/* eslint-disable class-methods-use-this */
/// <amd-module name='DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary'/>
define("DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary", ["require", "exports", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateContainer", "DS/EPSSchematicsUI/tools/EPSSchematicsUIJSONConverter", "DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, UITemplateContainer, UIJSONConverter, TemplateLibrary, Tools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    // Global template container reference
    var templateContainer = new UITemplateContainer();
    /**
     * This class defines the UI global template library.
     * @class UITemplateLibrary
     * @alias module:DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateLibrary
     * @private
     */
    var UITemplateLibrary = /** @class */ (function () {
        function class_1() {
        }
        /**
         * Gets the list of graph block uid from the template library.
         * The list can be scoped by specifying a graph block name.
         * @public
         * @static
         * @param {string} [name] - The graph block name.
         * @returns {string[]} The list of graph block uid.
         */
        class_1.getGraphUidList = function (name) {
            return TemplateLibrary.getGraphUidList(name);
        };
        /**
         * Gets the list of script block uid from the template library.
         * The list can be scoped by specifying a script block name.
         * @public
         * @static
         * @param {string} [name] - The script block name.
         * @returns {string[]} The list of script block uid.
         */
        class_1.getScriptUidList = function (name) {
            return TemplateLibrary.getScriptUidList(name);
        };
        /**
         * Gets the graph block name from the template library
         * corresponding to the specified uid.
         * @public
         * @static
         * @param {string} uid - The graph block uid.
         * @returns {string} The graph block name.
         */
        class_1.getNameByUid = function (uid) {
            return TemplateLibrary.getNameByUid(uid);
        };
        /**
         * Registers a UI graph block on the template library.
         * @public
         * @static
         * @param {UIGraphBlock} graphBlockUI - The UI graph block to register.
         * @param {string} [uid] - The uid of the template
         */
        class_1.registerGraph = function (graphBlockUI, uid) {
            uid = TemplateLibrary.registerGraph(graphBlockUI.getModel(), uid);
            templateContainer.registerUIJSONObjectGraph(uid, graphBlockUI.getJSONGraphBlockUI());
        };
        /**
         * Registers a UI script block on the template library.
         * @public
         * @static
         * @param {UIScriptBlock} scriptBlockUI - The UI script block.
         * @param {string} [uid] - The uid of the template
         */
        class_1.registerScript = function (scriptBlockUI, uid) {
            uid = TemplateLibrary.registerScript(scriptBlockUI.getModel(), uid);
            templateContainer.registerUIJSONObjectScript(uid);
        };
        /**
         * Gets the graph corresponding to the provided uid from the template library.
         * @public
         * @static
         * @param {string} uid - The graph block uid.
         * @returns {IJSONGraphBlockTemplate} The object graph instance model and json ui.
         */
        class_1.getGraph = function (uid) {
            return {
                model: TemplateLibrary.getGraph(uid),
                ui: templateContainer.getUIJSONObjectGraph(uid)
            };
        };
        /**
         * Gets the script corresponding to the provided uid from the template library.
         * @public
         * @static
         * @param {string} uid - The script block uid.
         * @returns {IJSONScriptBlockTemplate} The object script instance model and json ui.
         */
        class_1.getScript = function (uid) {
            return {
                model: TemplateLibrary.getScript(uid),
                ui: templateContainer.getUIJSONObjectScript(uid)
            };
        };
        /**
         * Updates the registered graph corresponding to the provided uid into the template library.
         * @public
         * @static
         * @param {string} uid - The graph block uid.
         * @param {GraphBlock} graphBlockModel - The graph block model.
         * @param {IJSONGraphUI} jsonObjectGraphUI - The json object graph UI.
         */
        class_1.updateGraph = function (uid, graphBlockModel, jsonObjectGraphUI) {
            TemplateLibrary.updateGraph(uid, graphBlockModel);
            templateContainer.registerUIJSONObjectGraph(uid, jsonObjectGraphUI);
        };
        /**
         * Updates the registered script corresponding to the provided uid into the template library.
         * @public
         * @static
         * @param {string} uid - The script block uid.
         * @param {ScriptBlock} scriptBlockModel - The script block model.
         * @param {IJSONScriptBlockUI} jsonObjectScriptUI - the json object script UI.
         */
        class_1.updateScript = function (uid, scriptBlockModel, jsonObjectScriptUI) {
            TemplateLibrary.updateScript(uid, scriptBlockModel);
            templateContainer.registerUIJSONObjectScript(uid, jsonObjectScriptUI);
        };
        /**
         * Converts the template library to JSON.
         * @public
         * @static
         * @param {IJSONTemplates} oJSONTemplateLibrary - The converted JSON template library.
         */
        class_1.toJSON = function (oJSONTemplateLibrary) {
            oJSONTemplateLibrary.version = Tools.version;
            oJSONTemplateLibrary.model = {};
            oJSONTemplateLibrary.ui = {};
            TemplateLibrary.toJSON(oJSONTemplateLibrary.model);
            templateContainer.getUITemplates(oJSONTemplateLibrary.ui);
        };
        /**
         * Loads the template library from JSON.
         * @public
         * @static
         * @param {IJSONTemplates} iJSONTemplateLibrary - The JSON template library.
         */
        class_1.fromJSON = function (iJSONTemplateLibrary) {
            if (iJSONTemplateLibrary !== undefined) {
                UIJSONConverter.convertGlobalTemplates(iJSONTemplateLibrary);
                TemplateLibrary.fromJSON(iJSONTemplateLibrary.model);
                templateContainer.setUITemplates(iJSONTemplateLibrary.ui);
            }
        };
        /**
         * Registers a local graph template on the global template library.
         * The graph template is deleted from the local template library.
         * @public
         * @static
         * @param {string} uid - The graph block uid.
         * @param {UIGraph} graphContext - The UI graph context.
         */
        class_1.registerGraphFromLocal = function (uid, graphContext) {
            TemplateLibrary.registerGraphFromLocal(uid, graphContext.getModel().getGraphContext());
            var localTemplateContainer = graphContext.getLocalTemplateLibrary().getTemplateContainer();
            var uiJSONGraph = localTemplateContainer.getUIJSONObjectGraph(uid);
            templateContainer.registerUIJSONObjectGraph(uid, uiJSONGraph);
            localTemplateContainer.unregisterGraphBlockTemplate(uid);
        };
        /**
         * Registers a local script template on the global template library.
         * The script template is deleted from the local template library.
         * @public
         * @static
         * @param {string} uid - The script block uid.
         * @param {UIGraph} graphContext - The UI graph context
         */
        class_1.registerScriptFromLocal = function (uid, graphContext) {
            TemplateLibrary.registerScriptFromLocal(uid, graphContext.getModel().getGraphContext());
            var localTemplateContainer = graphContext.getLocalTemplateLibrary().getTemplateContainer();
            var uiJSONScript = localTemplateContainer.getUIJSONObjectScript(uid);
            templateContainer.registerUIJSONObjectScript(uid, uiJSONScript);
            localTemplateContainer.unregisterScriptBlockTemplate(uid);
        };
        return class_1;
    }());
    return UITemplateLibrary;
});
