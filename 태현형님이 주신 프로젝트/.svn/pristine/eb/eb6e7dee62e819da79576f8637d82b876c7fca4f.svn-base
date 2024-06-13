/// <amd-module name='DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateContainer'/>
define("DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI template container.
     * @class UITemplateContainer
     * @alias module:DS/EPSSchematicsUI/libraries/EPSSchematicsUITemplateContainer
     * @private
     */
    var UITemplateContainer = /** @class */ (function () {
        function UITemplateContainer() {
            this._jsonGraphByUid = {};
            this._jsonScriptByUid = {};
        }
        /**
         * Registers a UI json object graph block into the template container.
         * @public
         * @param {string} uid - The graph block uid.
         * @param {IJSONGraphUI} jsonObjectGraph - The json object UI graph block.
         */
        UITemplateContainer.prototype.registerUIJSONObjectGraph = function (uid, jsonObjectGraph) {
            this._jsonGraphByUid[uid] = JSON.stringify(jsonObjectGraph);
        };
        /**
         * Registers a UI json object script block into the template container.
         * @public
         * @param {string} uid - The script block uid.
         * @param {IJSONScriptBlockUI} [jsonObjectScript] - The json object UI script block.
         */
        UITemplateContainer.prototype.registerUIJSONObjectScript = function (uid, jsonObjectScript) {
            this._jsonScriptByUid[uid] = JSON.stringify(jsonObjectScript);
        };
        /**
         * Unregisters the graph block template corresponding to the provided uid.
         * @public
         * @param {string} uid - The graph block template uid.
         */
        UITemplateContainer.prototype.unregisterGraphBlockTemplate = function (uid) {
            delete this._jsonGraphByUid[uid];
        };
        /**
         * Unregisters the script block template corresponding to the provided uid.
         * @public
         * @param {string} uid - The script block template uid.
         */
        UITemplateContainer.prototype.unregisterScriptBlockTemplate = function (uid) {
            delete this._jsonScriptByUid[uid];
        };
        /**
         * Gets the UI json object graph from the template container.
         * @public
         * @param {string} uid - The graph block uid.
         * @returns {IJSONGraphUI} The UI json object graph.
         */
        UITemplateContainer.prototype.getUIJSONObjectGraph = function (uid) {
            var graph = this._jsonGraphByUid[uid];
            return graph !== undefined ? JSON.parse(graph) : undefined;
        };
        /**
         * Gets the UI json object script from the template container.
         * @public
         * @param {string} uid - The script block uid.
         * @returns {IJSONScriptBlockUI} The UI json object script.
         */
        UITemplateContainer.prototype.getUIJSONObjectScript = function (uid) {
            var script = this._jsonScriptByUid[uid];
            return script !== undefined ? JSON.parse(script) : undefined;
        };
        /**
         * Gets all UI json templates.
         * @public
         * @param {IJSONUITemplates} oJSONTemplates - The UI json templates.
         */
        UITemplateContainer.prototype.getUITemplates = function (oJSONTemplates) {
            var _this = this;
            oJSONTemplates.graphs = {};
            oJSONTemplates.scripts = {};
            var graphUids = Object.keys(this._jsonGraphByUid);
            graphUids.forEach(function (graphUid) { oJSONTemplates.graphs[graphUid] = _this.getUIJSONObjectGraph(graphUid); });
            var scriptUids = Object.keys(this._jsonScriptByUid);
            scriptUids.forEach(function (scriptUid) { oJSONTemplates.scripts[scriptUid] = _this.getUIJSONObjectScript(scriptUid); });
        };
        /**
         * Sets all UI json templates.
         * @public
         * @param {IJSONUITemplates} iJSONTemplates - The UI json templates
         */
        UITemplateContainer.prototype.setUITemplates = function (iJSONTemplates) {
            var _this = this;
            if (iJSONTemplates !== undefined) {
                this._jsonGraphByUid = {};
                var graphUids = Object.keys(iJSONTemplates.graphs);
                graphUids.forEach(function (graphUid) { return _this.registerUIJSONObjectGraph(graphUid, iJSONTemplates.graphs[graphUid]); });
                var scriptUids = Object.keys(iJSONTemplates.scripts);
                scriptUids.forEach(function (scriptUid) { return _this.registerUIJSONObjectScript(scriptUid, iJSONTemplates.scripts[scriptUid]); });
            }
        };
        return UITemplateContainer;
    }());
    return UITemplateContainer;
});
