/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary"], function (require, exports, Enums, Tools, TypeLibrary) {
    "use strict";
    var JSONConverter;
    (function (JSONConverter) {
        var blockUidsByCategoryAndName = {};
        blockUidsByCategoryAndName['Core/Calculator/Per Second'] = '33272ee5-babf-4b5c-9b89-8a83d5946d06';
        blockUidsByCategoryAndName['Core/Calculator/Random'] = 'efe981bf-908b-4a50-a09c-42f1bf9227ce';
        blockUidsByCategoryAndName['Core/Calculator/Set Value'] = '8dc81190-2eb2-4e20-a595-8939ff534f29';
        blockUidsByCategoryAndName['Core/Debug/Print'] = 'a2c886c6-64fd-4a1d-a02f-fbba81c3e080';
        blockUidsByCategoryAndName['Core/Event/Event Reader'] = '3c32086d-5651-4311-8366-5542194be8ba';
        blockUidsByCategoryAndName['Core/Flow/If'] = '6f0fb6a2-c669-4825-9c64-fc9e8a268e79';
        blockUidsByCategoryAndName['Core/Loop/Delayer'] = 'e8e7b057-0696-4350-b8c0-f9d2548896ff';
        blockUidsByCategoryAndName['Core/Loop/Counter'] = '5041a595-5570-4b46-b62b-d236076aa446';
        blockUidsByCategoryAndName['Core/Time/Waiter'] = '4b949047-55ff-45a1-9549-41a09969f97d';
        blockUidsByCategoryAndName['Core/String/Contains String'] = '467b8c1d-9d76-4405-8dfa-cf03efb74eca';
        blockUidsByCategoryAndName['Core/String/Sub String'] = '45cffa7d-d92f-44c3-be9e-a960044ff933';
        blockUidsByCategoryAndName['Core/Delayer'] = blockUidsByCategoryAndName['Core/Loop/Delayer'];
        blockUidsByCategoryAndName['Core/Event Reader'] = blockUidsByCategoryAndName['Core/Event/Event Reader'];
        blockUidsByCategoryAndName['Core/Identity'] = blockUidsByCategoryAndName['Core/Calculator/Set Value'];
        blockUidsByCategoryAndName['Core/If'] = blockUidsByCategoryAndName['Core/Flow/If'];
        blockUidsByCategoryAndName['Core/Per Second'] = blockUidsByCategoryAndName['Core/Calculator/Per Second'];
        blockUidsByCategoryAndName['Core/Print'] = blockUidsByCategoryAndName['Core/Debug/Print'];
        blockUidsByCategoryAndName['Core/Random'] = blockUidsByCategoryAndName['Core/Calculator/Random'];
        blockUidsByCategoryAndName['Core/Waiter'] = blockUidsByCategoryAndName['Core/Time/Waiter'];
        var convertPortV000ToV100 = function (model) {
            var modifiedModel = model;
            switch (model.portType) {
                case 0:
                    {
                        modifiedModel.portType = Enums.EDataPortType.eInput;
                        break;
                    }
                case 1:
                    {
                        modifiedModel.portType = Enums.EDataPortType.eOutput;
                        break;
                    }
                case 2:
                    {
                        modifiedModel.portType = Enums.EControlPortType.eInput;
                        break;
                    }
                case 3:
                    {
                        modifiedModel.portType = Enums.EControlPortType.eOutput;
                        break;
                    }
                case 4:
                    {
                        modifiedModel.portType = Enums.EDataPortType.eLocal;
                        break;
                    }
            }
            if (model.type !== undefined) {
                modifiedModel.valueType = model.type;
                // eFunction
                modifiedModel.valueType = modifiedModel.valueType === 6 ? 'Object' : modifiedModel.valueType;
                // eEnum
                modifiedModel.valueType = modifiedModel.valueType === 7 ? 'Integer' : modifiedModel.valueType;
            }
            return modifiedModel;
        };
        var convertSettingV000ToV100 = function (model) {
            var modifiedModel = model;
            modifiedModel.valueType = model.type;
            // eFunction
            modifiedModel.valueType = modifiedModel.valueType === 6 ? 'Object' : modifiedModel.valueType;
            // eEnum
            modifiedModel.valueType = modifiedModel.valueType === 7 ? 'E' + model.name : modifiedModel.valueType;
            return modifiedModel;
        };
        var convertScriptV000ToV100 = function (script) {
            var startMatch = script.match(/var[\s\t\n\r]*fct[\s\t\n\r]*=[\s\t\n\r]*function[\s\t\n\r]*\([^)]*\)[\s\t\n\r]*{[\s\t\n\r]*/);
            var endMatch = script.match(/[\s\t\n\r]*};[\s\t\n\r]*return[\s\t\n\r]*fct[\s\t\n\r]*;/);
            if (startMatch !== null && endMatch !== null) {
                script = script.substring(startMatch.index + startMatch[0].length, endMatch.index);
                script = 'var definition = new ScriptBlockDefinition();\ndefinition.execute = function execute(runParams) {\n' + script + '\n};\ndefinition;';
            }
            return script;
        };
        var convertBlockV000ToV100 = function (model) {
            var modifiedModel = model;
            modifiedModel.dataPorts = [];
            modifiedModel.controlPorts = [];
            var name = model.definition !== undefined ? model.definition.name : model.definitionName;
            if (model.script !== undefined) {
                modifiedModel.name = name;
                model.script = convertScriptV000ToV100(model.script);
            }
            else {
                if (name === 'Event Reader') {
                    model.settings.length = 0;
                }
                var category = model.definition !== undefined ? model.definition.category : model.definitionModule;
                modifiedModel.definition = modifiedModel.definition !== undefined ? modifiedModel.definition : {};
                modifiedModel.definition.guid = blockUidsByCategoryAndName[category + '/' + name];
            }
            for (var ipp = 0; ipp < model.inputParameterPorts.length; ipp++) {
                var port = model.inputParameterPorts[ipp];
                convertPortV000ToV100(port);
                modifiedModel.dataPorts.push(port);
            }
            for (var opp = 0; opp < model.outputParameterPorts.length; opp++) {
                var port = model.outputParameterPorts[opp];
                convertPortV000ToV100(port);
                modifiedModel.dataPorts.push(port);
            }
            for (var iep = 0; iep < model.inputExecutionPorts.length; iep++) {
                var port = model.inputExecutionPorts[iep];
                convertPortV000ToV100(port);
                modifiedModel.controlPorts.push(port);
            }
            for (var oep = 0; oep < model.outputExecutionPorts.length; oep++) {
                var port = model.outputExecutionPorts[oep];
                convertPortV000ToV100(port);
                modifiedModel.controlPorts.push(port);
            }
            for (var s = 0; s < model.settings.length; s++) {
                convertSettingV000ToV100(model.settings[s]);
            }
            return modifiedModel;
        };
        var convertPathV000ToV100 = function (path, graph) {
            var elements = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
            var object = graph;
            var block;
            for (var e = 1; e < elements.length; e++) {
                if (e === elements.length - 2) {
                    block = object;
                }
                var property = elements[e];
                object = object[property];
            }
            var index = block.dataPorts.indexOf(object);
            var lastElement = 'dataPorts[' + index + ']';
            if (index === -1) {
                index = block.controlPorts.indexOf(object);
                lastElement = 'controlPorts[' + index + ']';
            }
            elements = path.split('.');
            elements[0] = Tools.rootPath;
            elements[elements.length - 1] = lastElement;
            return elements.join('.');
        };
        var convertLinkV000ToV100 = function (model, graph) {
            var modifiedModel = model;
            modifiedModel.startPort = convertPathV000ToV100(model.startPort, graph);
            modifiedModel.endPort = convertPathV000ToV100(model.endPort, graph);
            if (model.framesWait !== undefined) {
                modifiedModel.waitCount = model.framesWait;
            }
            return modifiedModel;
        };
        var convertGraphV000ToV100 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '1.0.0';
            var model = json.model;
            var modifiedModel = model;
            modifiedModel.dataPorts = [];
            modifiedModel.controlPorts = [];
            modifiedModel.dataLinks = [];
            modifiedModel.controlLinks = [];
            for (var b = 0; b < model.blocks.length; b++) {
                convertBlockV000ToV100(model.blocks[b]);
            }
            for (var ipp = 0; ipp < model.inputParameterPorts.length; ipp++) {
                var port = model.inputParameterPorts[ipp];
                convertPortV000ToV100(port);
                modifiedModel.dataPorts.push(port);
            }
            for (var opp = 0; opp < model.outputParameterPorts.length; opp++) {
                var port = model.outputParameterPorts[opp];
                convertPortV000ToV100(port);
                modifiedModel.dataPorts.push(port);
            }
            for (var lpp = 0; lpp < model.localParameterPorts.length; lpp++) {
                var port = model.localParameterPorts[lpp];
                convertPortV000ToV100(port);
                modifiedModel.dataPorts.push(port);
            }
            for (var iep = 0; iep < model.inputExecutionPorts.length; iep++) {
                var port = model.inputExecutionPorts[iep];
                convertPortV000ToV100(port);
                modifiedModel.controlPorts.push(port);
            }
            for (var oep = 0; oep < model.outputExecutionPorts.length; oep++) {
                var port = model.outputExecutionPorts[oep];
                convertPortV000ToV100(port);
                modifiedModel.controlPorts.push(port);
            }
            for (var l = 0; l < model.links.length; l++) {
                var link = model.links[l];
                convertLinkV000ToV100(link, model);
                // eParameter
                if (link.type === 0) {
                    modifiedModel.dataLinks.push(link);
                }
                // eExecution
                else if (link.type === 1) {
                    modifiedModel.controlLinks.push(link);
                }
            }
            return modifiedJson;
        };
        var convertPortV100ToV101 = function (model) {
            var modifiedModel = model;
            if (typeof model.valueType === 'string') {
                modifiedModel.valueType = model.valueType.charAt(0).toUpperCase() + model.valueType.slice(1);
            }
            return modifiedModel;
        };
        var convertScriptNameV100ToV101 = function (script) {
            var name;
            var startMatch = script.match(/var definition = new ScriptBlockDefinition\(\);\ndefinition.name = '/);
            var endMatch = script.match(/';\ndefinition.inputExecutionPorts = \[/);
            if (startMatch !== null && endMatch !== null) {
                name = script.substring(startMatch.index + startMatch[0].length, endMatch.index);
            }
            return name;
        };
        var convertScriptV100ToV101 = function (script) {
            var startMatch = script.match(/definition.execute[\s\t\n\r]*=[\s\t\n\r]*function[^(]*\([^)]*\)[\s\t\n\r]*{[\s\t\n\r]*/);
            var endMatch = script.match(/[\s\t\n\r]*}[\s\t\n\r]*;[\s\t\n\r]*definition[\s\t\n\r]*;/);
            if (startMatch !== null && endMatch !== null) {
                script = script.substring(startMatch.index + startMatch[0].length, endMatch.index);
            }
            return script;
        };
        var convertBlockV100ToV101 = function (model) {
            var modifiedModel = model;
            modifiedModel.definition = model.definition !== undefined ? model.definition : {};
            if (model.script !== undefined) {
                modifiedModel.definition.guid = '729b0bc1-c2a3-42a8-8d02-7bb99034791c';
                if (model.name === undefined) {
                    modifiedModel.name = convertScriptNameV100ToV101(model.script);
                }
                modifiedModel.script = convertScriptV100ToV101(model.script);
            }
            else if (model.definition.guid === undefined) {
                modifiedModel.definition.guid = blockUidsByCategoryAndName[model.category + '/' + model.name];
            }
            return modifiedModel;
        };
        var convertGraphV100ToV101 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '1.0.1';
            var model = json.model;
            for (var b = 0; b < model.blocks.length; b++) {
                convertBlockV100ToV101(model.blocks[b]);
            }
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                convertPortV100ToV101(model.dataPorts[dp]);
            }
            return modifiedJson;
        };
        var orderPorts = function (ports, jsonPorts) {
            for (var p = 0; p < ports.length && p < jsonPorts.length; p++) {
                if (ports[p].type !== jsonPorts[p].portType) {
                    for (var np = p + 1; np < jsonPorts.length; np++) {
                        if (ports[p].type === jsonPorts[np].portType) {
                            jsonPorts.splice(p, 0, jsonPorts.splice(np, 1)[0]);
                        }
                    }
                }
            }
        };
        var updatePathMap = function (ports, newPorts, path, pathMap) {
            for (var p = 0; p < ports.length; p++) {
                var newIndex = newPorts.indexOf(ports[p]);
                if (newIndex !== p) {
                    var pathPort = path + '[' + p + ']';
                    var newPathPort = path + '[' + newIndex + ']';
                    pathMap[pathPort] = newPathPort;
                }
            }
        };
        var convertPortV101ToV200 = function (model) {
            var modifiedModel = model;
            if (model.value === null) {
                modifiedModel.value = undefined;
            }
            return modifiedModel;
        };
        var convertSettingV101ToV200 = function (model) {
            var modifiedModel = model;
            if (typeof model.valueType === 'string') {
                modifiedModel.typedObjectValueType = model.valueType;
                delete model.valueType;
            }
            return modifiedModel;
        };
        var convertBlockV101ToV200 = function (model, path, pathMap) {
            var modifiedModel = model;
            var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
            var DynamicBlockCtor = require('DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock');
            modifiedModel.definition.uid = model.definition.guid;
            if (model.script === undefined) {
                var block = BlockLibrarySingleton.getBlock(modifiedModel.definition.uid);
                modifiedModel.name = block.name;
                if (block instanceof DynamicBlockCtor) {
                    var BlockCtor = block.constructor;
                    var blockTest = new BlockCtor();
                    var dataPorts = model.dataPorts;
                    var controlPorts = model.controlPorts;
                    var dataPortsCopy = dataPorts.slice();
                    var controlPortsCopy = controlPorts.slice();
                    orderPorts(blockTest.dataPorts, dataPorts);
                    for (var dpt = blockTest.dataPorts.length; dpt < dataPorts.length; dpt++) {
                        blockTest.createDynamicDataPort(dataPorts[dpt].portType);
                    }
                    orderPorts(blockTest.controlPorts, controlPorts);
                    for (var cpt = blockTest.controlPorts.length; cpt < controlPorts.length; cpt++) {
                        blockTest.createDynamicControlPort(controlPorts[cpt].portType);
                    }
                    orderPorts(blockTest.dataPorts, dataPorts);
                    orderPorts(blockTest.controlPorts, controlPorts);
                    updatePathMap(dataPortsCopy, dataPorts, path + '.dataPorts', pathMap);
                    updatePathMap(controlPortsCopy, controlPorts, path + '.controlPorts', pathMap);
                }
            }
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                convertPortV101ToV200(model.dataPorts[dp]);
            }
            for (var s = 0; s < model.settings.length; s++) {
                convertSettingV101ToV200(model.settings[s]);
            }
            return modifiedModel;
        };
        var convertPathV101ToV200 = function (path, pathMap) {
            var newPath = pathMap[path];
            return newPath !== undefined ? newPath : path;
        };
        var convertLinkV101ToV200 = function (model, pathMap) {
            var modifiedModel = model;
            modifiedModel.startPort = convertPathV101ToV200(model.startPort, pathMap);
            modifiedModel.endPort = convertPathV101ToV200(model.endPort, pathMap);
            return modifiedModel;
        };
        var convertGraphV101ToV200 = function (json) {
            var modifiedJson = json;
            json.convertedModelVersion = '2.0.0';
            var model = json.model;
            var modifiedModel = model;
            var pathMap = {};
            for (var b = 0; b < model.blocks.length; b++) {
                convertBlockV101ToV200(model.blocks[b], Tools.rootPath + '.blocks[' + b + ']', pathMap);
            }
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                convertPortV101ToV200(model.dataPorts[dp]);
            }
            modifiedModel.settings = [{ name: 'CastLevel', typedObjectValueType: 'ECastLevel', value: Enums.ECastLevel.eLossy }];
            for (var dl = 0; dl < model.dataLinks.length; dl++) {
                convertLinkV101ToV200(model.dataLinks[dl], pathMap);
            }
            for (var cl = 0; cl < model.controlLinks.length; cl++) {
                convertLinkV101ToV200(model.controlLinks[cl], pathMap);
            }
            return modifiedJson;
        };
        var convertValueTypeV200ToV201 = function (model) {
            var modifiedModel = model;
            var valueType = model.valueType !== undefined ? model.valueType : model.typedArrayValueType;
            if (valueType !== undefined) {
                switch (valueType) {
                    case 0:
                        {
                            modifiedModel.valueType = 'Boolean';
                            break;
                        }
                    case 1:
                        {
                            modifiedModel.valueType = 'Double';
                            break;
                        }
                    case 2:
                        {
                            modifiedModel.valueType = 'Integer';
                            break;
                        }
                    case 3:
                        {
                            modifiedModel.valueType = 'Object';
                            break;
                        }
                    case 4:
                        {
                            modifiedModel.valueType = 'String';
                            break;
                        }
                    case 5:
                        {
                            modifiedModel.valueType = 'Array';
                            break;
                        }
                }
                if (model.typedArrayValueType !== undefined) {
                    modifiedModel.valueType = 'Array<' + modifiedModel.valueType + '>';
                    delete model.typedArrayValueType;
                }
            }
            else if (model.typedObjectValueType !== undefined) {
                modifiedModel.valueType = model.typedObjectValueType;
                delete model.typedObjectValueType;
            }
            return modifiedModel;
        };
        var convertPortV200ToV201 = function (model) {
            var modifiedModel = model;
            if (model.portType !== 1) {
                modifiedModel.override = true;
            }
            convertValueTypeV200ToV201(model);
            return modifiedModel;
        };
        var convertSettingV200ToV201 = function (model) {
            var modifiedModel = model;
            modifiedModel.override = true;
            convertValueTypeV200ToV201(model);
            return modifiedModel;
        };
        var convertBlockV200ToV201 = function (model, localPath, dataLinks, controlLinks) {
            var modifiedModel = model;
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                convertPortV200ToV201(model.dataPorts[dp]);
            }
            for (var s = 0; s < model.settings.length; s++) {
                convertSettingV200ToV201(model.settings[s]);
            }
            if (model.graphRef !== undefined) {
                var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
                modifiedModel.definition = {};
                modifiedModel.definition.uid = GraphBlockCtr.prototype.uid;
                modifiedModel.blocks = model.graphRef.blocks;
                modifiedModel.dataLinks = model.graphRef.dataLinks;
                modifiedModel.controlLinks = model.graphRef.controlLinks;
                delete model.graphRef;
                for (var b = 0; b < model.blocks.length; b++) {
                    convertBlockV200ToV201(model.blocks[b], Tools.rootPath + '.blocks[' + b + ']', model.dataLinks, model.controlLinks);
                }
            }
            else {
                var uid = model.definition.uid;
                if (uid === blockUidsByCategoryAndName['Core/Event/Event Reader']) {
                    for (var dl = dataLinks.length - 1; dl >= 0; dl--) {
                        var dataLink = dataLinks[dl];
                        if (dataLink.startPort.indexOf(localPath) !== -1 &&
                            dataLink.startPort !== localPath + '.dataPorts[0]') {
                            dataLinks.splice(dl, 1);
                        }
                    }
                    for (var cl = controlLinks.length - 1; cl >= 0; cl--) {
                        var controlLink = controlLinks[cl];
                        if (controlLink.endPort.indexOf(localPath) !== -1) {
                            controlLinks.splice(cl, 1);
                        }
                    }
                }
            }
            return modifiedModel;
        };
        var convertGraphV200ToV201 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.1';
            var model = json.model;
            var modifiedModel = model;
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            modifiedModel.definition = {};
            modifiedModel.definition.uid = GraphBlockCtr.prototype.uid;
            for (var b = 0; b < model.blocks.length; b++) {
                convertBlockV200ToV201(model.blocks[b], Tools.rootPath + '.blocks[' + b + ']', model.dataLinks, model.controlLinks);
            }
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                convertPortV200ToV201(model.dataPorts[dp]);
            }
            for (var s = 0; s < model.settings.length; s++) {
                convertSettingV200ToV201(model.settings[s]);
            }
            modifiedJson.templates = {};
            modifiedJson.templates.model = {};
            modifiedJson.templates.model.graphs = {};
            return modifiedJson;
        };
        var convertBlockV201ToV202 = function (model) {
            var modifiedModel = model;
            if (model.blocks !== undefined) {
                for (var b = 0; b < model.blocks.length; b++) {
                    convertBlockV201ToV202(model.blocks[b]);
                }
            }
            else if (typeof model.script === 'string') {
                modifiedModel.script = { language: Enums.EScriptLanguage.eJavaScript, content: model.script };
            }
            return modifiedModel;
        };
        var convertGraphV201ToV202 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.2';
            convertBlockV201ToV202(json.model);
            var graphUids = Object.keys(json.templates.model.graphs);
            for (var g = 0; g < graphUids.length; g++) {
                convertBlockV201ToV202(json.templates.model.graphs[graphUids[g]]);
            }
            modifiedJson.templates.model.scripts = {};
            return modifiedJson;
        };
        var convertPortV202ToV203 = function (model) {
            var modifiedModel = model;
            modifiedModel.dataPorts = [];
            return modifiedModel;
        };
        var convertBlockV202ToV203 = function (model) {
            var modifiedModel = model;
            var GraphBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock');
            if (model.definition.uid === GraphBlockCtr.prototype.uid) {
                for (var b = 0; b < model.blocks.length; b++) {
                    convertBlockV202ToV203(model.blocks[b]);
                }
            }
            for (var dp = 0; dp < model.dataPorts.length; dp++) {
                convertPortV202ToV203(model.dataPorts[dp]);
            }
            return modifiedModel;
        };
        var convertGraphV202ToV203 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.3';
            convertBlockV202ToV203(json.model);
            var graphUids = Object.keys(json.templates.model.graphs);
            for (var g = 0; g < graphUids.length; g++) {
                convertBlockV202ToV203(json.templates.model.graphs[graphUids[g]]);
            }
            var scriptUids = Object.keys(json.templates.model.scripts);
            for (var s = 0; s < scriptUids.length; s++) {
                convertBlockV202ToV203(json.templates.model.scripts[scriptUids[s]]);
            }
            return modifiedJson;
        };
        var convertControlLinkV203ToV204 = function (model) {
            var modifiedModel = model;
            delete model.priority;
            return modifiedModel;
        };
        var convertBlockV203ToV204 = function (model) {
            var modifiedModel = model;
            if (model.blocks !== undefined && model.controlLinks !== undefined) {
                modifiedModel.nodeIdSelectors = [];
                for (var b = 0; b < model.blocks.length; b++) {
                    convertBlockV203ToV204(model.blocks[b]);
                }
                for (var cl = 0; cl < model.controlLinks.length; cl++) {
                    convertControlLinkV203ToV204(model.controlLinks[cl]);
                }
            }
            return modifiedModel;
        };
        var convertGraphV203ToV204 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.4';
            convertBlockV203ToV204(json.model);
            var graphUids = Object.keys(json.templates.model.graphs);
            for (var g = 0; g < graphUids.length; g++) {
                convertBlockV203ToV204(json.templates.model.graphs[graphUids[g]]);
            }
            return modifiedJson;
        };
        var convertTypeV204ToV205 = function (desc) {
            var keys = Object.keys(desc);
            for (var k = 0; k < keys.length; k++) {
                var propertyValueType = desc[keys[k]];
                var propertyType = propertyValueType.type;
                var propertyDefautValue = propertyValueType.defaultValue;
                var isObjectType = TypeLibrary.getArrayValueTypeName(propertyType) === undefined;
                isObjectType = isObjectType && !TypeLibrary.hasGlobalType(propertyType, Enums.FTypeCategory.fAll ^ Enums.FTypeCategory.fObject);
                if (isObjectType && propertyDefautValue !== undefined && !(propertyDefautValue instanceof Object)) {
                    delete propertyValueType.defaultValue;
                }
            }
        };
        var convertGraphV204ToV205 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.5';
            if (json.types !== undefined) {
                var types = Object.keys(json.types.model.objects);
                for (var t = 0; t < types.length; t++) {
                    convertTypeV204ToV205(json.types.model.objects[types[t]]);
                }
            }
            else {
                modifiedJson.types = {};
                modifiedJson.types.model = {};
                modifiedJson.types.model.objects = {};
            }
            return modifiedJson;
        };
        var convertGraphV205ToV206 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.6';
            return modifiedJson;
        };
        var convertBlockCustom = function (model, localPath, blockConvertersByUid, parentControlLinks, parentDataLinks) {
            if (model.blocks !== undefined || model.containedGraph !== undefined) {
                var blocks = model.blocks || model.containedGraph.blocks;
                var controlLinks = model.controlLinks || model.containedGraph.controlLinks;
                var dataLinks = model.dataLinks || model.containedGraph.dataLinks;
                for (var b = 0; b < blocks.length; b++) {
                    convertBlockCustom(blocks[b], Tools.rootPath + '.blocks[' + b + ']', blockConvertersByUid, controlLinks, dataLinks);
                }
            }
            var uid = model.definition.uid;
            var blockConverter = blockConvertersByUid[uid];
            if (blockConverter !== undefined) {
                var BlockLibrarySingleton = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary');
                var InvalidBlockCtr = require('DS/EPSSchematicsModelWeb/EPSSchematicsInvalidBlock');
                if (BlockLibrarySingleton.hasBlock(uid)) {
                    InvalidBlockCtr = BlockLibrarySingleton.getBlock(uid).constructor;
                }
                var invalidBlock = new InvalidBlockCtr();
                invalidBlock.fromJSON(model);
                if (BlockLibrarySingleton.hasBlock(blockConverter.newUid)) {
                    var NewBlock = BlockLibrarySingleton.getBlock(blockConverter.newUid).constructor;
                    var newBlock = new NewBlock();
                    var linkedControlPorts = [];
                    var controlLinksToConvert = [];
                    if (parentControlLinks !== undefined) {
                        for (var cl = 0; cl < parentControlLinks.length; cl++) {
                            var controlLink = parentControlLinks[cl];
                            if (controlLink.startPort.indexOf(localPath) === 0) {
                                controlLinksToConvert.push(controlLink);
                                var controlPort = invalidBlock.getObjectFromPath(controlLink.startPort.replace(localPath, Tools.rootPath));
                                linkedControlPorts.push(controlPort);
                            }
                            if (controlLink.endPort.indexOf(localPath) === 0) {
                                controlLinksToConvert.push(controlLink);
                                var controlPort = invalidBlock.getObjectFromPath(controlLink.endPort.replace(localPath, Tools.rootPath));
                                linkedControlPorts.push(controlPort);
                            }
                        }
                    }
                    var linkedDataPorts = [];
                    var dataLinksToConvert = [];
                    if (parentDataLinks !== undefined) {
                        for (var dl = 0; dl < parentDataLinks.length; dl++) {
                            var dataLink = parentDataLinks[dl];
                            if (dataLink.startPort.indexOf(localPath) === 0) {
                                dataLinksToConvert.push(dataLink);
                                var dataPort = invalidBlock.getObjectFromPath(dataLink.startPort.replace(localPath, Tools.rootPath));
                                linkedDataPorts.push(dataPort);
                            }
                            if (dataLink.endPort.indexOf(localPath) === 0) {
                                dataLinksToConvert.push(dataLink);
                                var dataPort = invalidBlock.getObjectFromPath(dataLink.endPort.replace(localPath, Tools.rootPath));
                                linkedDataPorts.push(dataPort);
                            }
                        }
                    }
                    blockConverter.convert(invalidBlock, newBlock, linkedControlPorts, linkedDataPorts);
                    newBlock.toJSON(model);
                    if (parentControlLinks !== undefined) {
                        for (var cp = 0; cp < linkedControlPorts.length; cp++) {
                            var controlPort = linkedControlPorts[cp];
                            var controlLink = controlLinksToConvert[cp];
                            if (controlPort.isStartPort()) {
                                controlLink.startPort = controlPort.toPath().replace(Tools.rootPath, localPath);
                            }
                            else if (controlPort.isEndPort()) {
                                controlLink.endPort = controlPort.toPath().replace(Tools.rootPath, localPath);
                            }
                        }
                    }
                    if (parentDataLinks !== undefined) {
                        for (var dp = 0; dp < linkedDataPorts.length; dp++) {
                            var dataPort = linkedDataPorts[dp];
                            var dataLink = dataLinksToConvert[dp];
                            if (dataPort.isStartPort()) {
                                dataLink.startPort = dataPort.toPath().replace(Tools.rootPath, localPath);
                            }
                            else if (dataPort.isEndPort()) {
                                dataLink.endPort = dataPort.toPath().replace(Tools.rootPath, localPath);
                            }
                        }
                    }
                }
            }
        };
        var convertGraphCustom = function (json, version) {
            var blockConvertersByUid = getBlockConvertersByUidByVersion(version);
            var uids = Object.keys(blockConvertersByUid);
            if (uids.length > 0) {
                convertBlockCustom(json.model, Tools.rootPath, blockConvertersByUid);
                var graphUids = Object.keys(json.templates.model.graphs);
                for (var g = 0; g < graphUids.length; g++) {
                    convertBlockCustom(json.templates.model.graphs[graphUids[g]], Tools.rootPath, blockConvertersByUid);
                }
                var scriptUids = Object.keys(json.templates.model.scripts);
                for (var s = 0; s < scriptUids.length; s++) {
                    convertBlockCustom(json.templates.model.scripts[scriptUids[s]], Tools.rootPath, blockConvertersByUid);
                }
            }
        };
        /**
         * Convert graph.
         * @private
         * @param {IJSONV000} json - The JSON graph.
         */
        function convertGraph(json) {
            if (json.convertedModelVersion === undefined) {
                json.convertedModelVersion = json.version;
                if (json.convertedModelVersion === undefined) {
                    convertGraphV000ToV100(json);
                }
                if (json.convertedModelVersion === '1.0.0') {
                    convertGraphV100ToV101(json);
                }
                if (json.convertedModelVersion === '1.0.1') {
                    convertGraphV101ToV200(json);
                }
                if (json.convertedModelVersion === '2.0.0') {
                    convertGraphV200ToV201(json);
                }
                if (json.convertedModelVersion === '2.0.1') {
                    convertGraphV201ToV202(json);
                }
                if (json.convertedModelVersion === '2.0.2') {
                    convertGraphV202ToV203(json);
                }
                if (json.convertedModelVersion === '2.0.3') {
                    convertGraphV203ToV204(json);
                }
                if (json.convertedModelVersion === '2.0.4') {
                    convertGraphV204ToV205(json);
                }
                if (json.convertedModelVersion === '2.0.5') {
                    convertGraphV205ToV206(json);
                }
                convertGraphCustom(json, json.version);
            }
        }
        JSONConverter.convertGraph = convertGraph;
        var convertGlobalTemplatesV201ToV202 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.2';
            var graphUids = Object.keys(json.model.graphs);
            for (var g = 0; g < graphUids.length; g++) {
                convertBlockV201ToV202(json.model.graphs[graphUids[g]]);
            }
            modifiedJson.model.scripts = {};
            return modifiedJson;
        };
        var convertGlobalTemplatesV202ToV203 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.3';
            var graphUids = Object.keys(json.model.graphs);
            for (var g = 0; g < graphUids.length; g++) {
                convertBlockV202ToV203(json.model.graphs[graphUids[g]]);
            }
            var scriptUids = Object.keys(json.model.scripts);
            for (var s = 0; s < scriptUids.length; s++) {
                convertBlockV202ToV203(json.model.scripts[scriptUids[s]]);
            }
            return modifiedJson;
        };
        var convertGlobalTemplatesV203ToV204 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.4';
            var graphUids = Object.keys(json.model.graphs);
            for (var g = 0; g < graphUids.length; g++) {
                convertBlockV203ToV204(json.model.graphs[graphUids[g]]);
            }
            return modifiedJson;
        };
        var convertGlobalTemplatesV204ToV205 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.5';
            return modifiedJson;
        };
        var convertGlobalTemplatesV205ToV206 = function (json) {
            var modifiedJson = json;
            modifiedJson.convertedModelVersion = '2.0.6';
            return modifiedJson;
        };
        var convertGlobalTemplatesCustom = function (json, version) {
            var blockConvertersByUid = getBlockConvertersByUidByVersion(version);
            var uids = Object.keys(blockConvertersByUid);
            if (uids.length > 0) {
                var graphUids = Object.keys(json.model.graphs);
                for (var g = 0; g < graphUids.length; g++) {
                    convertBlockCustom(json.model.graphs[graphUids[g]], Tools.rootPath, blockConvertersByUid);
                }
                var scriptUids = Object.keys(json.model.scripts);
                for (var s = 0; s < scriptUids.length; s++) {
                    convertBlockCustom(json.model.scripts[scriptUids[s]], Tools.rootPath, blockConvertersByUid);
                }
            }
        };
        /**
         * Convert global templates.
         * @private
         * @param {IJSONTemplatesV201} json - The JSON global templates.
         */
        function convertGlobalTemplates(json) {
            if (json.convertedModelVersion === undefined) {
                json.convertedModelVersion = json.version;
                if (json.convertedModelVersion === '2.0.1') {
                    convertGlobalTemplatesV201ToV202(json);
                }
                if (json.convertedModelVersion === '2.0.2') {
                    convertGlobalTemplatesV202ToV203(json);
                }
                if (json.convertedModelVersion === '2.0.3') {
                    convertGlobalTemplatesV203ToV204(json);
                }
                if (json.convertedModelVersion === '2.0.4') {
                    convertGlobalTemplatesV204ToV205(json);
                }
                if (json.convertedModelVersion === '2.0.5') {
                    convertGlobalTemplatesV205ToV206(json);
                }
                convertGlobalTemplatesCustom(json, json.version);
            }
        }
        JSONConverter.convertGlobalTemplates = convertGlobalTemplates;
        var blockConvertersByUidByVersion = {};
        var getBlockConvertersByUidByVersion = function (iVersion) {
            if (blockConvertersByUidByVersion[iVersion] === undefined) {
                blockConvertersByUidByVersion[iVersion] = {};
            }
            return blockConvertersByUidByVersion[iVersion];
        };
        var versionList = [
            undefined,
            '1.0.0',
            '1.0.1',
            '2.0.0',
            '2.0.1',
            '2.0.2',
            '2.0.3',
            '2.0.4',
            '2.0.5',
            '2.0.6'
        ];
        /**
         * Add block converter.
         *
         * @protected
         * @param {string} iVersion - The version.
         * @param {string} iOldUid - The old Uid.
         * @param {string} iNewUid - The new Uid.
         * @param {TConverter} iConvert - The convert callback function.
         * @example
         * var version = '2.0.4';
         * var oldUid = 'f7bffe1e-4414-4f4f-a019-0c3687acb9a9';
         * var newUid = MyBlock.prototype.uid;
         * var blockConvert = function (iOldBlock, oNewBlock) {
         * 	var oldDataPort = iOldBlock.getDataPorts()[0];
         * 	var newDataPort = oNewBlock.getDataPorts()[0];
         * 	newDataPort.setDefaultValue(oldDataPort.getDefaultValue());
         * };
         * JSONConverter.addBlockConverter(version, oldUid, newUid, blockConvert);
         */
        function addBlockConverter(iVersion, iOldUid, iNewUid, iConvert) {
            var indexVersion = versionList.indexOf(iVersion);
            for (var iv = 0; iv <= indexVersion; iv++) {
                var version = versionList[iv];
                var blockConvertersByUid = getBlockConvertersByUidByVersion(version);
                blockConvertersByUid[iOldUid] = {
                    newUid: iNewUid,
                    convert: iConvert
                };
            }
        }
        JSONConverter.addBlockConverter = addBlockConverter;
    })(JSONConverter || (JSONConverter = {}));
    return JSONConverter;
});
