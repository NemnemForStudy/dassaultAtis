/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUIJSONConverter'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUIJSONConverter", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock", "DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter"], function (require, exports, GraphBlock, JSONConverter) {
    "use strict";
    /* eslint-enable no-unused-vars */
    var UIJSONConverter = /** @class */ (function () {
        function UIJSONConverter() {
        }
        UIJSONConverter.convertGraph = function (json) {
            JSONConverter.convertGraph(json);
            json.convertedUIVersion = json.convertedUIVersion || json.version;
            if (json.convertedUIVersion === undefined) {
                this.convertGraphV000ToV100(json);
            }
            if (json.convertedUIVersion === '1.0.0') {
                this.convertGraphV100ToV101(json);
            }
            if (json.convertedUIVersion === '1.0.1') {
                this.convertGraphV101ToV200(json);
            }
            if (json.convertedUIVersion === '2.0.0') {
                this.convertGraphV200ToV201(json);
            }
            if (json.convertedUIVersion === '2.0.1') {
                this.convertGraphV201ToV202(json);
            }
            if (json.convertedUIVersion === '2.0.2') {
                this.convertGraphV202ToV203(json);
            }
            if (json.convertedUIVersion === '2.0.3') {
                this.convertGraphV203ToV204(json);
            }
            if (json.convertedUIVersion === '2.0.4') {
                this.convertGraphV204ToV205(json);
            }
            if (json.convertedUIVersion === '2.0.5') {
                this.convertGraphV205ToV206(json);
            }
        };
        UIJSONConverter.convertGlobalTemplates = function (json) {
            JSONConverter.convertGlobalTemplates(json);
            json.convertedUIVersion = json.convertedUIVersion || json.version;
            if (json.convertedUIVersion === '2.0.1') {
                this.convertGlobalTemplatesV201ToV202(json);
            }
            if (json.convertedUIVersion === '2.0.2') {
                this.convertGlobalTemplatesV202ToV203(json);
            }
            if (json.convertedUIVersion === '2.0.3') {
                this.convertGlobalTemplatesV203ToV204(json);
            }
            if (json.convertedUIVersion === '2.0.4') {
                this.convertGlobalTemplatesV204ToV205(json);
            }
            if (json.convertedUIVersion === '2.0.5') {
                this.convertGlobalTemplatesV205ToV206(json);
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V000ToV100                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV000ToV100 = function (json) {
            var _this = this;
            json.convertedUIVersion = '1.0.0';
            var ui = json.ui;
            if (ui !== undefined) {
                ui.blocks.forEach(function (block) { return _this.convertBlockV000ToV100(block); });
                ui.dataPorts = ui.inputParameterPorts.concat(ui.outputParameterPorts, ui.localParameterPorts);
                delete ui.inputParameterPorts;
                delete ui.outputParameterPorts;
                delete ui.localParameterPorts;
                ui.controlPorts = ui.inputExecutionPorts.concat(ui.outputExecutionPorts);
                delete ui.inputExecutionPorts;
                delete ui.outputExecutionPorts;
                // eParameter
                ui.dataLinks = ui.links.filter(function (link) { return link.type === 0; });
                // eExecution
                ui.controlLinks = ui.links.filter(function (link) { return link.type === 1; });
                delete ui.links;
            }
        };
        UIJSONConverter.convertBlockV000ToV100 = function (ui) {
            ui.dataPorts = ui.inputParameterPorts.concat(ui.outputParameterPorts);
            ui.controlPorts = ui.inputExecutionPorts.concat(ui.outputExecutionPorts);
            delete ui.inputParameterPorts;
            delete ui.outputParameterPorts;
            delete ui.inputExecutionPorts;
            delete ui.outputExecutionPorts;
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V100ToV101                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV100ToV101 = function (json) {
            json.convertedUIVersion = '1.0.1';
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V101ToV200                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV101ToV200 = function (json) {
            json.convertedUIVersion = '2.0.0';
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V200ToV201                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV200ToV201 = function (json) {
            var _this = this;
            json.convertedUIVersion = '2.0.1';
            var ui = json.ui;
            ui.blocks.forEach(function (block) { return _this.convertBlockV200ToV201(block); });
            ui.graphLeft = ui.left;
            ui.graphTop = ui.top;
            delete ui.left;
            delete ui.top;
            json.templates.ui = {};
            json.templates.ui.graphs = {};
        };
        UIJSONConverter.convertBlockV200ToV201 = function (ui) {
            var _this = this;
            if (ui.graphRef !== undefined) {
                ui.graphLeft = ui.graphRef.left;
                ui.graphTop = ui.graphRef.top;
                ui.width = ui.graphRef.width;
                ui.height = ui.graphRef.height;
                ui.blocks = ui.graphRef.blocks;
                ui.dataPorts = ui.graphRef.dataPorts;
                ui.controlPorts = ui.graphRef.controlPorts;
                ui.dataLinks = ui.graphRef.dataLinks;
                ui.controlLinks = ui.graphRef.controlLinks;
                ui.shortcuts = ui.graphRef.shortcuts;
                delete ui.graphRef;
                ui.blocks.forEach(function (block) { return _this.convertBlockV200ToV201(block); });
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V201ToV202                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV201ToV202 = function (json) {
            json.convertedUIVersion = '2.0.2';
            if (json.templates.ui !== undefined) {
                json.templates.ui.scripts = {};
            }
        };
        UIJSONConverter.convertGlobalTemplatesV201ToV202 = function (json) {
            json.convertedUIVersion = '2.0.2';
            if (json.ui !== undefined) {
                json.ui.scripts = {};
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V202ToV203                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV202ToV203 = function (json) {
            var _this = this;
            json.convertedUIVersion = '2.0.3';
            if (json.ui !== undefined) {
                this.convertBlockV202ToV203(json.ui, json.model);
                var graphUids = Object.keys(json.templates.ui.graphs);
                graphUids.forEach(function (uid) { return _this.convertBlockV202ToV203(json.templates.ui.graphs[uid], json.templates.model.graphs[uid]); });
                var scriptUids = Object.keys(json.templates.ui.scripts);
                scriptUids.forEach(function (uid) { return _this.convertBlockV202ToV203(json.templates.ui.scripts[uid], json.templates.model.scripts[uid]); });
            }
        };
        UIJSONConverter.convertBlockV202ToV203 = function (ui, model) {
            var _this = this;
            if (model.definition.uid === GraphBlock.prototype.uid && ui.blocks !== undefined) {
                ui.blocks.forEach(function (block, index) { return _this.convertBlockV202ToV203(block, model.blocks[index]); });
            }
            if (ui.dataPorts === undefined) {
                ui.dataPorts = [];
            }
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                ui.dataPorts[dp] = ui.dataPorts[dp] || {};
                this.convertPortV202ToV203(ui.dataPorts[dp]);
            }
        };
        UIJSONConverter.convertPortV202ToV203 = function (ui) {
            ui.dataPorts = [];
        };
        UIJSONConverter.convertGlobalTemplatesV202ToV203 = function (json) {
            var _this = this;
            json.convertedUIVersion = '2.0.3';
            if (json.ui !== undefined) {
                var graphUids = Object.keys(json.ui.graphs);
                graphUids.forEach(function (uid) { return _this.convertBlockV202ToV203(json.ui.graphs[uid], json.model.graphs[uid]); });
                var scriptUids = Object.keys(json.ui.scripts);
                scriptUids.forEach(function (uid) { return _this.convertBlockV202ToV203(json.ui.scripts[uid], json.model.scripts[uid]); });
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V203ToV204                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV203ToV204 = function (json) {
            json.convertedUIVersion = '2.0.4';
        };
        UIJSONConverter.convertGlobalTemplatesV203ToV204 = function (json) {
            json.convertedUIVersion = '2.0.4';
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V204ToV205                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV204ToV205 = function (json) {
            json.convertedUIVersion = '2.0.5';
        };
        UIJSONConverter.convertGlobalTemplatesV204ToV205 = function (json) {
            json.convertedUIVersion = '2.0.5';
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          V205ToV206                                            //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        UIJSONConverter.convertGraphV205ToV206 = function (json) {
            json.convertedUIVersion = '2.0.6';
            if (json.ui !== undefined) {
                this.convertBlockV205ToV206(json.ui);
            }
        };
        UIJSONConverter.convertGlobalTemplatesV205ToV206 = function (json) {
            var _this = this;
            json.convertedUIVersion = '2.0.6';
            if (json.ui !== undefined) {
                var graphUids = Object.keys(json.ui.graphs);
                graphUids.forEach(function (uid) { return _this.convertBlockV205ToV206(json.ui.graphs[uid]); });
                var scriptUids = Object.keys(json.ui.scripts);
                scriptUids.forEach(function (uid) { return _this.convertBlockV205ToV206(json.ui.scripts[uid]); });
            }
        };
        UIJSONConverter.convertBlockV205ToV206 = function (ui) {
            var _this = this;
            if (ui.dataPorts !== undefined) {
                ui.dataPorts.forEach(function (dataPort) {
                    if (dataPort.dataPorts !== undefined) {
                        dataPort.dataPorts.forEach(function (subDataPort) {
                            var subDataPortV205 = subDataPort;
                            if (subDataPortV205.inside !== undefined) {
                                subDataPort.inside = { show: subDataPortV205.inside };
                            }
                            if (subDataPortV205.outside !== undefined) {
                                subDataPort.outside = { show: subDataPortV205.outside };
                            }
                            if (subDataPortV205.input !== undefined) {
                                subDataPort.localInput = { show: subDataPortV205.input };
                                delete subDataPortV205.input;
                            }
                            if (subDataPortV205.output !== undefined) {
                                subDataPort.localOutput = { show: subDataPortV205.output };
                                delete subDataPortV205.output;
                            }
                        });
                    }
                });
            }
            if (ui.blocks !== undefined) {
                ui.blocks.forEach(function (block) { return _this.convertBlockV205ToV206(block); });
            }
            else if (ui.containedGraph !== undefined) {
                this.convertBlockV205ToV206(ui.containedGraph);
            }
        };
        return UIJSONConverter;
    }());
    return UIJSONConverter;
});
