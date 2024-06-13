/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsLocalTemplateLibrary'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsLocalTemplateLibrary", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPEventServices/EPEventTarget", "DS/EPSSchematicsModelWeb/EPSSchematicsTools"], function (require, exports, Events, EventTarget, Tools) {
    "use strict";
    var LocalTemplateLibrary = /** @class */ (function () {
        function LocalTemplateLibrary() {
            this.jsonGraphByUid = {};
            this.jsonScriptByUid = {};
            this.nameByUid = {};
            this.eventTarget = new EventTarget();
        }
        LocalTemplateLibrary.prototype._registerJSONGraph = function (iUid, iName, iJSONGraph) {
            this.jsonGraphByUid[iUid] = iJSONGraph;
            this.nameByUid[iUid] = iName;
        };
        LocalTemplateLibrary.prototype._registerJSONObjectGraph = function (iUid, iJSONObjectGraph) {
            var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
            var graphBlockDefinition = BlockLibrarySingleton.getBlock(iJSONObjectGraph.definition.uid);
            if (graphBlockDefinition !== undefined) {
                var GraphBlockCtor = graphBlockDefinition.constructor;
                var graphBlock = new GraphBlockCtor();
                graphBlock.fromJSON(iJSONObjectGraph);
                graphBlock.valid = true;
                if (graphBlock.isGlobalTemplatable() || graphBlock.isLocalTemplatable()) {
                    this._registerJSONGraph(iUid, graphBlock.getName(), JSON.stringify(iJSONObjectGraph));
                }
            }
        };
        LocalTemplateLibrary.prototype.registerGraph = function (iGraphBlock, iUid) {
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (iGraphBlock instanceof GraphBlockCtor && (iGraphBlock.isGlobalTemplatable() || iGraphBlock.isLocalTemplatable())) {
                if (iUid !== undefined) {
                    if (typeof iUid !== 'string') {
                        throw new TypeError('iUid argument is not a valid string');
                    }
                    if (this.jsonGraphByUid[iUid] !== undefined) {
                        throw new TypeError('iUid argument is already registered');
                    }
                }
                else {
                    iUid = Tools.generateGUID();
                }
                var jsonObjectGraph = {};
                iGraphBlock.toJSON(jsonObjectGraph);
                this._registerJSONGraph(iUid, iGraphBlock.getName(), JSON.stringify(jsonObjectGraph));
                iGraphBlock.template(iUid);
            }
            return iUid;
        };
        LocalTemplateLibrary.prototype.updateGraph = function (iUid, iGraphBlock) {
            if (this.jsonGraphByUid[iUid] === undefined) {
                throw new TypeError('iUid argument is not a valid UID');
            }
            var result = false;
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (iGraphBlock instanceof GraphBlockCtor && (iGraphBlock.isGlobalTemplatable() || iGraphBlock.isLocalTemplatable())) {
                var jsonObjectGraph = {};
                iGraphBlock.toJSON(jsonObjectGraph);
                var json = JSON.stringify(jsonObjectGraph);
                if (json !== this.jsonGraphByUid[iUid]) {
                    this._registerJSONGraph(iUid, iGraphBlock.getName(), json);
                    var event_1 = new Events.TemplateLibraryGraphChangeEvent();
                    event_1.uid = iUid;
                    this.eventTarget.dispatchEvent(event_1);
                    result = true;
                }
            }
            return result;
        };
        LocalTemplateLibrary.prototype.getJSONObjectGraph = function (iUid) {
            var jsonObjectGraph;
            var jsonGraph = this.jsonGraphByUid[iUid];
            if (jsonGraph !== undefined) {
                jsonObjectGraph = JSON.parse(jsonGraph);
            }
            return jsonObjectGraph;
        };
        LocalTemplateLibrary.prototype.hasGraph = function (iUid) {
            return this.jsonGraphByUid[iUid] !== undefined;
        };
        LocalTemplateLibrary.prototype.getGraph = function (iUid, iGraphContext) {
            var graph;
            var jsonObjectGraph = this.getJSONObjectGraph(iUid);
            if (jsonObjectGraph !== undefined) {
                var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
                var GraphBlockCtor = BlockLibrarySingleton.getBlock(jsonObjectGraph.definition.uid).constructor;
                graph = new GraphBlockCtor();
                graph.graphContext = iGraphContext;
                graph.fromJSON(jsonObjectGraph);
            }
            return graph;
        };
        LocalTemplateLibrary.prototype.getGraphUidList = function (iName) {
            var uidList;
            if (iName === undefined) {
                uidList = Object.keys(this.jsonGraphByUid);
            }
            else {
                var nameByUid_1 = this.nameByUid;
                uidList = Object.keys(this.jsonGraphByUid).filter(function (iUid) { return nameByUid_1[iUid] === iName; });
            }
            return uidList;
        };
        LocalTemplateLibrary.prototype._registerJSONScript = function (iUid, iName, iJSONScript) {
            this.jsonScriptByUid[iUid] = iJSONScript;
            this.nameByUid[iUid] = iName;
        };
        LocalTemplateLibrary.prototype._registerJSONObjectScript = function (iUid, iJSONObjectScript) {
            var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
            var scriptBlockDefinition = BlockLibrarySingleton.getBlock(iJSONObjectScript.definition.uid);
            if (scriptBlockDefinition !== undefined) {
                var ScriptBlockCtor = scriptBlockDefinition.constructor;
                var scriptBlock = new ScriptBlockCtor();
                scriptBlock.fromJSON(iJSONObjectScript);
                var dataPorts = iJSONObjectScript.dataPorts;
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    dataPorts[dp].dataPorts.length = 0;
                }
                if (scriptBlock.isGlobalTemplatable() || scriptBlock.isLocalTemplatable()) {
                    this._registerJSONScript(iUid, scriptBlock.getName(), JSON.stringify(iJSONObjectScript));
                }
            }
        };
        LocalTemplateLibrary.prototype.registerScript = function (iScriptBlock, iUid) {
            var ScriptBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock');
            if (iScriptBlock instanceof ScriptBlockCtor && (iScriptBlock.isGlobalTemplatable() || iScriptBlock.isLocalTemplatable())) {
                if (iUid !== undefined) {
                    if (typeof iUid !== 'string') {
                        throw new TypeError('iUid argument is not a valid string');
                    }
                    if (this.jsonScriptByUid[iUid] !== undefined) {
                        throw new TypeError('iUid argument is already registered');
                    }
                }
                else {
                    iUid = Tools.generateGUID();
                }
                var jsonObjectScript = {};
                iScriptBlock.toJSON(jsonObjectScript);
                var dataPorts = jsonObjectScript.dataPorts;
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    dataPorts[dp].dataPorts.length = 0;
                }
                this._registerJSONScript(iUid, iScriptBlock.getName(), JSON.stringify(jsonObjectScript));
                iScriptBlock.template(iUid);
            }
            return iUid;
        };
        LocalTemplateLibrary.prototype.updateScript = function (iUid, iScriptBlock) {
            if (this.jsonScriptByUid[iUid] === undefined) {
                throw new TypeError('iUid argument is not a valid UID');
            }
            var result = false;
            var ScriptBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock');
            if (iScriptBlock instanceof ScriptBlockCtor && (iScriptBlock.isGlobalTemplatable() || iScriptBlock.isLocalTemplatable())) {
                var jsonObjectScript = {};
                iScriptBlock.toJSON(jsonObjectScript);
                var dataPorts = jsonObjectScript.dataPorts;
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    dataPorts[dp].dataPorts.length = 0;
                }
                var json = JSON.stringify(jsonObjectScript);
                if (json !== this.jsonScriptByUid[iUid]) {
                    this._registerJSONScript(iUid, iScriptBlock.getName(), json);
                    var event_2 = new Events.TemplateLibraryScriptChangeEvent();
                    event_2.uid = iUid;
                    this.eventTarget.dispatchEvent(event_2);
                    result = true;
                }
            }
            return result;
        };
        LocalTemplateLibrary.prototype.getJSONObjectScript = function (iUid) {
            var jsonObjectScript;
            var jsonScript = this.jsonScriptByUid[iUid];
            if (jsonScript !== undefined) {
                jsonObjectScript = JSON.parse(jsonScript);
            }
            return jsonObjectScript;
        };
        LocalTemplateLibrary.prototype.hasScript = function (iUid) {
            return this.jsonScriptByUid[iUid] !== undefined;
        };
        LocalTemplateLibrary.prototype.getScript = function (iUid, iGraphContext) {
            var script;
            var jsonObjectScript = this.getJSONObjectScript(iUid);
            if (jsonObjectScript !== undefined) {
                var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
                var ScriptBlockCtor = BlockLibrarySingleton.getBlock(jsonObjectScript.definition.uid).constructor;
                script = new ScriptBlockCtor();
                script.graphContext = iGraphContext;
                script.fromJSON(jsonObjectScript);
            }
            return script;
        };
        LocalTemplateLibrary.prototype.getScriptUidList = function (iName) {
            var uidList;
            if (iName === undefined) {
                uidList = Object.keys(this.jsonScriptByUid);
            }
            else {
                var nameByUid_2 = this.nameByUid;
                uidList = Object.keys(this.jsonScriptByUid).filter(function (iUid) { return nameByUid_2[iUid] === iName; });
            }
            return uidList;
        };
        LocalTemplateLibrary.prototype.getNameByUid = function (iUid) {
            return this.nameByUid[iUid];
        };
        LocalTemplateLibrary.prototype.fromJSON = function (iJSONTemplateLibrary) {
            this.jsonGraphByUid = {};
            this.jsonScriptByUid = {};
            this.nameByUid = {};
            var graphUids = Object.keys(iJSONTemplateLibrary.graphs);
            for (var jg = 0; jg < graphUids.length; jg++) {
                var uid = graphUids[jg];
                this._registerJSONObjectGraph(uid, iJSONTemplateLibrary.graphs[uid]);
            }
            var scriptUids = Object.keys(iJSONTemplateLibrary.scripts);
            for (var js = 0; js < scriptUids.length; js++) {
                var uid = scriptUids[js];
                this._registerJSONObjectScript(uid, iJSONTemplateLibrary.scripts[uid]);
            }
        };
        LocalTemplateLibrary.prototype.toJSON = function (oJSONTemplateLibrary) {
            oJSONTemplateLibrary.graphs = {};
            oJSONTemplateLibrary.scripts = {};
            var graphUids = Object.keys(this.jsonGraphByUid);
            for (var jg = 0; jg < graphUids.length; jg++) {
                var uid = graphUids[jg];
                oJSONTemplateLibrary.graphs[uid] = this.getJSONObjectGraph(uid);
            }
            var scriptUids = Object.keys(this.jsonScriptByUid);
            for (var js = 0; js < scriptUids.length; js++) {
                var uid = scriptUids[js];
                oJSONTemplateLibrary.scripts[uid] = this.getJSONObjectScript(uid);
            }
        };
        LocalTemplateLibrary.prototype.addListener = function (iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        };
        LocalTemplateLibrary.prototype.removeListener = function (iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        };
        return LocalTemplateLibrary;
    }());
    return LocalTemplateLibrary;
});
