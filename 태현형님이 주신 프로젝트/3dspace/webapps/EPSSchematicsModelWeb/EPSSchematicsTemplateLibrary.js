/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary'/>
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
define("DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsLocalTemplateLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter", "DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsTemplateScriptBlock"], function (require, exports, LocalTemplateLibrary, Tools, JSONConverter) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var TemplateLibrary = /** @class */ (function (_super) {
        __extends(TemplateLibrary, _super);
        function TemplateLibrary() {
            return _super.call(this) || this;
        }
        TemplateLibrary.prototype.registerGraph = function (iGraphBlock, iUid) {
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!(iGraphBlock instanceof GraphBlockCtor)) {
                throw new TypeError('iGraphBlock argument is not a GraphBlock');
            }
            if (!iGraphBlock.isGlobalTemplatable()) {
                throw new TypeError('iGraphBlock argument is not global templatable');
            }
            return _super.prototype.registerGraph.call(this, iGraphBlock, iUid);
        };
        TemplateLibrary.prototype.registerGraphFromLocal = function (iUid, iGraphContext) {
            TemplateLibrary._checkContext(iGraphContext);
            if (iGraphContext.localTemplateLibrary.jsonGraphByUid[iUid] === undefined) {
                throw new TypeError('iUid argument is not a valid UID');
            }
            this.jsonGraphByUid[iUid] = iGraphContext.localTemplateLibrary.jsonGraphByUid[iUid];
            this.nameByUid[iUid] = iGraphContext.localTemplateLibrary.nameByUid[iUid];
            delete iGraphContext.localTemplateLibrary.jsonGraphByUid[iUid];
            delete iGraphContext.localTemplateLibrary.nameByUid[iUid];
        };
        TemplateLibrary.prototype.updateGraph = function (iUid, iGraphBlock) {
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!(iGraphBlock instanceof GraphBlockCtor)) {
                throw new TypeError('iGraphBlock argument is not a GraphBlock');
            }
            if (!iGraphBlock.isGlobalTemplatable()) {
                throw new TypeError('iGraphBlock argument is not global templatable');
            }
            return _super.prototype.updateGraph.call(this, iUid, iGraphBlock);
        };
        TemplateLibrary.prototype.registerScript = function (iScriptBlock, iUid) {
            var ScriptBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock');
            if (!(iScriptBlock instanceof ScriptBlockCtor)) {
                throw new TypeError('iScriptBlock argument is not a ScriptBlock');
            }
            if (!iScriptBlock.isGlobalTemplatable()) {
                throw new TypeError('iScriptBlock argument is not global templatable');
            }
            return _super.prototype.registerScript.call(this, iScriptBlock, iUid);
        };
        TemplateLibrary.prototype.registerScriptFromLocal = function (iUid, iGraphContext) {
            TemplateLibrary._checkContext(iGraphContext);
            if (iGraphContext.localTemplateLibrary.jsonScriptByUid[iUid] === undefined) {
                throw new TypeError('iUid argument is not a valid UID');
            }
            this.jsonScriptByUid[iUid] = iGraphContext.localTemplateLibrary.jsonScriptByUid[iUid];
            this.nameByUid[iUid] = iGraphContext.localTemplateLibrary.nameByUid[iUid];
            delete iGraphContext.localTemplateLibrary.jsonScriptByUid[iUid];
            delete iGraphContext.localTemplateLibrary.nameByUid[iUid];
        };
        TemplateLibrary.prototype.updateScript = function (iUid, iScriptBlock) {
            var ScriptBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock');
            if (!(iScriptBlock instanceof ScriptBlockCtor)) {
                throw new TypeError('iScriptBlock argument is not a ScriptBlock');
            }
            if (!iScriptBlock.isGlobalTemplatable()) {
                throw new TypeError('iScriptBlock argument is not global templatable');
            }
            return _super.prototype.updateScript.call(this, iUid, iScriptBlock);
        };
        TemplateLibrary.prototype.generateJSONObject = function () {
            var json = {};
            json.version = Tools.version;
            json.model = {};
            this.toJSON(json.model);
            return json;
        };
        TemplateLibrary.prototype.generateJSON = function () {
            return JSON.stringify(this.generateJSONObject());
        };
        TemplateLibrary.prototype.buildFromJSONObject = function (jsonObject) {
            JSONConverter.convertGlobalTemplates(jsonObject);
            this.fromJSON(jsonObject.model);
        };
        TemplateLibrary.prototype.buildFromJSON = function (json) {
            this.buildFromJSONObject(JSON.parse(json));
        };
        TemplateLibrary._checkContext = function (iGraphContext) {
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!(iGraphContext instanceof GraphBlockCtor)) {
                throw new TypeError('iGraphContext argument is not a GraphBlock');
            }
            if (iGraphContext.getGraphContext() !== iGraphContext) {
                throw new TypeError('iGraphContext argument is not a GraphContext');
            }
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.registerLocalGraph = function (iGraphContext, iGraphBlock, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!(iGraphBlock instanceof GraphBlockCtor)) {
                throw new TypeError('iGraphBlock argument is not a GraphBlock');
            }
            if (iGraphBlock.getGraphContext() !== iGraphContext) {
                throw new TypeError('iGraphBlock argument is not in iGraphContext');
            }
            if (!iGraphBlock.isLocalTemplatable()) {
                throw new TypeError('iGraphBlock argument is not local templatable');
            }
            return iGraphContext.localTemplateLibrary.registerGraph(iGraphBlock, iUid);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.updateLocalGraph = function (iGraphContext, iUid, iGraphBlock) {
            TemplateLibrary._checkContext(iGraphContext);
            var GraphBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (!(iGraphBlock instanceof GraphBlockCtor)) {
                throw new TypeError('iGraphBlock argument is not a GraphBlock');
            }
            if (iGraphBlock.getGraphContext() !== iGraphContext) {
                throw new TypeError('iGraphBlock argument is not in iGraphContext');
            }
            if (!iGraphBlock.isLocalTemplatable()) {
                throw new TypeError('iGraphBlock argument is not local templatable');
            }
            return iGraphContext.localTemplateLibrary.updateGraph(iUid, iGraphBlock);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getJSONObjectLocalGraph = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getJSONObjectGraph(iUid);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.hasLocalGraph = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.hasGraph(iUid);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getLocalGraph = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getGraph(iUid, iGraphContext);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getLocalGraphUidList = function (iGraphContext, iName) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getGraphUidList(iName);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.registerLocalScript = function (iGraphContext, iScriptBlock, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            var ScriptBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock');
            if (!(iScriptBlock instanceof ScriptBlockCtor)) {
                throw new TypeError('iScriptBlock argument is not a ScriptBlock');
            }
            if (iScriptBlock.getGraphContext() !== iGraphContext) {
                throw new TypeError('iScriptBlock argument is not in iGraphContext');
            }
            if (!iScriptBlock.isLocalTemplatable()) {
                throw new TypeError('iScriptBlock argument is not local templatable');
            }
            return iGraphContext.localTemplateLibrary.registerScript(iScriptBlock, iUid);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.updateLocalScript = function (iGraphContext, iUid, iScriptBlock) {
            TemplateLibrary._checkContext(iGraphContext);
            var ScriptBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock');
            if (!(iScriptBlock instanceof ScriptBlockCtor)) {
                throw new TypeError('iScriptBlock argument is not a ScriptBlock');
            }
            if (iScriptBlock.getGraphContext() !== iGraphContext) {
                throw new TypeError('iScriptBlock argument is not in iGraphContext');
            }
            if (!iScriptBlock.isLocalTemplatable()) {
                throw new TypeError('iScriptBlock argument is not local templatable');
            }
            return iGraphContext.localTemplateLibrary.updateScript(iUid, iScriptBlock);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getJSONObjectLocalScript = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getJSONObjectScript(iUid);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.hasLocalScript = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.hasScript(iUid);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getLocalScript = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getScript(iUid, iGraphContext);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getLocalScriptUidList = function (iGraphContext, iName) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getScriptUidList(iName);
        };
        // eslint-disable-next-line class-methods-use-this
        TemplateLibrary.prototype.getLocalNameByUid = function (iGraphContext, iUid) {
            TemplateLibrary._checkContext(iGraphContext);
            return iGraphContext.localTemplateLibrary.getNameByUid(iUid);
        };
        return TemplateLibrary;
    }(LocalTemplateLibrary));
    return new TemplateLibrary();
});
