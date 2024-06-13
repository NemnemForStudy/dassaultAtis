define('DS/EPSSchematicsCSI/EPSSchematicsCSIImport', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsGraphContainerBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsInvalidBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPort',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsTools',
    'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary',
    'DS/EPSSchematicsCoreLibrary/flow/EPSIfBlock',
    'DS/EPSSchematicsCoreLibrary/flow/EPSSyncFlowsBlock',
    'DS/EPSSchematicsCoreLibrary/flow/EPSJoinAllBlock',
    'DS/EPSSchematicsCoreLibrary/flow/EPSOnlyOneBlock',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSAddBlock',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSDivideBlock',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSIsEqualBlock',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSMultiplyBlock',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSetValueBlock',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSubstractBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayConcatBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayGetBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayGetIndexBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayInsertBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayLengthBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayMapBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayPopBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayPushBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayRemoveBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArraySetBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayShiftBlock',
    'DS/EPSSchematicsCoreLibrary/array/EPSArrayUnshiftBlock',
    'DS/EPSSchematicsCSI/EPSSchematicsCSITools',
    'DS/EPSSchematicsCSI/EPSSchematicsCSIGraphBlock',
    'DS/EPSSchematicsCSI/EPSSchematicsCSIJavaScriptBlock',
    'DS/EPSSchematicsCSI/EPSSchematicsCSIPythonBlock'
], function (BlockLibrary, DynamicBlock, GraphBlock, GraphContainerBlock, ContainedGraphBlock,
    InvalidBlock, DataPort, Enums, Tools, TypeLibrary,
    IfBlock, SyncFlowsBlock, JoinAllBlock, OnlyOneBlock,
    AddBlock, DivideBlock, IsEqualBlock, MultiplyBlock, SetValueBlock, SubstractBlock,
    ArrayConcatBlock, ArrayGetBlock, ArrayGetIndexBlock, ArrayInsertBlock, ArrayLengthBlock, ArrayMapBlock, ArrayPopBlock, ArrayPushBlock,
    ArrayRemoveBlock, ArraySetBlock, ArrayShiftBlock, ArrayUnshiftBlock,
    CSITools, CSIGraphBlock, CSIJavaScriptBlock, CSIPythonBlock) {
    'use strict';

    var CSIImport = {};

    var buildFromJSON = function (oGraphBlock, iCSIJSON) {
        buildFromJSONObject(oGraphBlock, JSON.parse(iCSIJSON));
    };

    var buildFromJSONObject = function (oGraphBlock, iCSIJSONObject) {
        clearGraphBlock(oGraphBlock);

        oGraphBlock.setDescription(iCSIJSONObject.desc);

        var graphDataPorts = oGraphBlock.getDataPorts();
        var graphDataPort;
        var localCustomObjectTypeName;
        for (var gdp = 0; gdp < graphDataPorts.length; gdp++) {
            graphDataPort = graphDataPorts[gdp];
            localCustomObjectTypeName = createLocalCustomObjectType(oGraphBlock.getGraphContext(), graphDataPort.getName());
            graphDataPort.setValueType(localCustomObjectTypeName);
        }

        if (iCSIJSONObject.onCall !== undefined) {
            if (iCSIJSONObject.onCall.in !== undefined) {
                csiImportDataPortFromSignature(oGraphBlock.getDataPortByName('Call'), iCSIJSONObject.onCall.in);
            }
            if (iCSIJSONObject.onCall.out !== undefined) {
                csiImportDataPortFromSignature(oGraphBlock.getDataPortByName('Success'), iCSIJSONObject.onCall.out);
            }
        }

        if (iCSIJSONObject.implementation.settings !== undefined && Object.keys(iCSIJSONObject.implementation.settings).length > 0) {
            csiImportGraphBlock(oGraphBlock, iCSIJSONObject.implementation.settings);
        }
    };

    var clearGraphBlock = function (oGraphBlock) {
        var GraphBlockCtor = oGraphBlock.constructor;
        var emptyGraphBlock = new GraphBlockCtor();
        oGraphBlock.buildFromJSONObject(emptyGraphBlock.generateJSONObject());
    };

    var createLocalCustomObjectType = function (iGraphContext, iDataPortName) {
        var typeName = iDataPortName + '_Parameters';
        var newTypeName = typeName;
        var index;
        while (TypeLibrary.hasType(iGraphContext, newTypeName, Enums.FTypeCategory.fAll)) {
            index = index || 1;
            newTypeName = typeName + '_' + String(++index);
        }
        TypeLibrary.registerLocalCustomObjectType(iGraphContext, newTypeName, {});
        return newTypeName;
    };

    var csiImportDataPortFromSignature = function (oDataPort, iJSONSignature) {
        if (iJSONSignature.parameters !== undefined) {
            var graphContext = oDataPort.getGraphContext();
            var callTypeName = oDataPort.getValueType();
            if (! oDataPort.hasLocalCustomType()) {
                callTypeName = createLocalCustomObjectType(graphContext, oDataPort.getName());
                oDataPort.setValueType(callTypeName);
            }
            var callObjectTypes = [];
            var callType = CSITools.getCSITypeDescriptor(iJSONSignature.parameters, callTypeName, callObjectTypes);
            TypeLibrary.registerLocalCustomTypes(graphContext, callObjectTypes);
            TypeLibrary.updateLocalCustomObjectType(graphContext, callTypeName, callType);
        }
        else if (iJSONSignature.type !== undefined) {
            oDataPort.setValueType(CSITools.getTypeByCSIType(iJSONSignature.type));
        }
    };

    var csiImportGraphBlock = function (oGraphBlock, iJSONGraphBlock) {
        var blocksById = {};
        blocksById[iJSONGraphBlock.id] = oGraphBlock;

        oGraphBlock.setName(iJSONGraphBlock.displayName);

        var iJSONGraphBlockImplementation = iJSONGraphBlock.implementation;
        var jsonNodeIdSelector;
        if (iJSONGraphBlockImplementation.nodeIdSelectors !== undefined) {
            for (var nis = 0; nis < iJSONGraphBlockImplementation.nodeIdSelectors.length; nis++) {
                jsonNodeIdSelector = iJSONGraphBlockImplementation.nodeIdSelectors[nis];
                csiImportNodeIdSelector(oGraphBlock, jsonNodeIdSelector);
            }
        }

        if (iJSONGraphBlockImplementation.runtimeSettings !== undefined) {
            csiImportRuntimeSettings(oGraphBlock, iJSONGraphBlockImplementation.runtimeSettings);
        }
        else if (iJSONGraphBlockImplementation.progressEvents !== undefined) {
            var runtimeSettings = {};
            runtimeSettings.progressEvents = iJSONGraphBlockImplementation.progressEvents;
            csiImportRuntimeSettings(oGraphBlock, runtimeSettings);
        }

        var jsonLocalDataPort;
        if (iJSONGraphBlockImplementation.localDataPorts !== undefined) {
            for (var ldp = 0; ldp < iJSONGraphBlockImplementation.localDataPorts.length; ldp++) {
                jsonLocalDataPort = iJSONGraphBlockImplementation.localDataPorts[ldp];
                csiImportDataPort(oGraphBlock, jsonLocalDataPort);
            }
        }

        var jsonBlock;
        for (var b = 0; b < iJSONGraphBlockImplementation.blocks.length; b++) {
            jsonBlock = iJSONGraphBlockImplementation.blocks[b];
            csiImportBlock(oGraphBlock, jsonBlock, blocksById);
        }

        var jsonControlLink;
        for (var cl = 0; cl < iJSONGraphBlockImplementation.controlFlows.length; cl++) {
            jsonControlLink = iJSONGraphBlockImplementation.controlFlows[cl];
            csiImportControlLink(oGraphBlock, jsonControlLink, blocksById);
        }

        var jsonDataLink;
        if (iJSONGraphBlockImplementation.dataFlows !== undefined) {
            for (var dl = 0; dl < iJSONGraphBlockImplementation.dataFlows.length; dl++) {
                jsonDataLink = iJSONGraphBlockImplementation.dataFlows[dl];
                csiImportDataLink(oGraphBlock, jsonDataLink, blocksById);
            }
        }

        var ids = Object.keys(blocksById);
        var block;
        for (var i = 0; i < ids.length; i++) {
            block = blocksById[ids[i]];
            if (block instanceof InvalidBlock) {
                var controlPorts = block.getControlPorts();
                var controlPort;
                for (var cp = 0; cp < controlPorts.length; cp++) {
                    controlPort = controlPorts[cp];
                    if (controlPort.getName() === 'Progress' || controlPort.getName() === 'Error') {
                        if (controlPort.getControlLinks().length === 0) {
                            block.removeControlPort(controlPort);
                        }
                    }
                }
                var dataPorts = block.getDataPorts();
                var dataPort;
                for (var dp = 0; dp < dataPorts.length; dp++) {
                    dataPort = dataPorts[dp];
                    if (dataPort.getDataLinks().length === 0 && dataPort.getDataPorts().length === 0) {
                        block.removeDataPort(dataPort);
                    }
                }
                jsonBlock = {};
                DynamicBlock.prototype.toJSON.call(block, jsonBlock);
                block.json = JSON.stringify(jsonBlock);
            }
        }
    };

    var csiImportJavaScriptBlock = function (oJavaScriptBlock, iJSONJavaScriptBlock) {
        oJavaScriptBlock.setName(iJSONJavaScriptBlock.displayName);

        var definition = iJSONJavaScriptBlock.implementation.definition;
        oJavaScriptBlock.setDescription(definition.desc);
        csiImportDataPortFromSignature(oJavaScriptBlock.getDataPortByName('Call'), definition.onCall.in);
        csiImportDataPortFromSignature(oJavaScriptBlock.getDataPortByName('Success'), definition.onCall.out);
        csiImportDataPortFromSignature(oJavaScriptBlock.getDataPortByName('Progress'), definition.progress);
        csiImportDataPortFromSignature(oJavaScriptBlock.getDataPortByName('Error'), definition.throwError);
        oJavaScriptBlock.setScriptContent(definition.implementation.settings.script);
    };

    var csiImportPythonBlock = function (oPythonBlock, iJSONPythonBlock) {
        oPythonBlock.setName(iJSONPythonBlock.displayName);

        var definition = iJSONPythonBlock.implementation.definition;
        oPythonBlock.setDescription(definition.desc);
        csiImportDataPortFromSignature(oPythonBlock.getDataPortByName('Call'), definition.onCall.in);
        csiImportDataPortFromSignature(oPythonBlock.getDataPortByName('Success'), definition.onCall.out);
        csiImportDataPortFromSignature(oPythonBlock.getDataPortByName('Progress'), definition.progress);
        csiImportDataPortFromSignature(oPythonBlock.getDataPortByName('Error'), definition.throwError);
        oPythonBlock.setScriptContent(definition.implementation.settings.script);
    };

    var csiImportLogicalBlockDataType = function (oBlock, iDataPortType, iDataType, iIndex) {
        var csiType = iDataType.type;
        var valueType = CSITools.getTypeByCSIType(csiType.replace('[]', ''));
        if (csiType.indexOf('[]') !== -1) {
            valueType = 'Array<' + valueType + '>';
        }
        var dataPort = oBlock.getDataPorts(iDataPortType)[iIndex];
        if (dataPort === undefined) {
            dataPort = oBlock.createDynamicDataPort(iDataPortType);
        }
        dataPort.setValueType(valueType);
    };

    var csiImportLogicalBlock = function (oBlock, iJSONLogicalBlock) {
        if (iJSONLogicalBlock.implementation.nbPorts !== undefined) {
            while (iJSONLogicalBlock.implementation.nbPorts > oBlock.getControlPorts(Enums.EControlPortType.eInput).length) {
                if (oBlock instanceof SyncFlowsBlock) {
                    oBlock.createDynamicControlPort(Enums.EControlPortType.eInput);
                }
                else if (oBlock instanceof OnlyOneBlock) {
                    oBlock.createDynamicDataPort(Enums.EDataPortType.eInput);
                }
            }
        }

        if (Array.isArray(iJSONLogicalBlock.implementation.dataTypes)) {
            iJSONLogicalBlock.implementation.inputDataTypes = [];
            iJSONLogicalBlock.implementation.dataTypes.forEach(function (dataType) {
                iJSONLogicalBlock.implementation.inputDataTypes.push({ name: '', type: dataType });
            });
        }
        if (Array.isArray(iJSONLogicalBlock.implementation.inputDataTypes)) {
            iJSONLogicalBlock.implementation.inputDataTypes.forEach(csiImportLogicalBlockDataType.bind(undefined, oBlock, Enums.EDataPortType.eInput));
        }
        if (Array.isArray(iJSONLogicalBlock.implementation.outputDataTypes)) {
            iJSONLogicalBlock.implementation.outputDataTypes.forEach(csiImportLogicalBlockDataType.bind(undefined, oBlock, Enums.EDataPortType.eOutput));
        }
    };

    var csiImportNodeIdSelector = function (oGraphBlock, iJSONNodeIdSelector) {
        var nodeIdSelector = oGraphBlock.createNodeIdSelector();
        nodeIdSelector.setName(iJSONNodeIdSelector.id);
        nodeIdSelector.setPool(iJSONNodeIdSelector.pool);

        if (iJSONNodeIdSelector.identifier !== undefined) {
            nodeIdSelector.setCriterion(Enums.ECriterion.eIdentifier);
            nodeIdSelector.setIdentifier(iJSONNodeIdSelector.identifier);
        }
        else if (iJSONNodeIdSelector.onlyMyHypervisor) {
            nodeIdSelector.setCriterion(Enums.ECriterion.eOnlyMyHypervisor);
        }
        else if (iJSONNodeIdSelector.notMyHypervisor) {
            nodeIdSelector.setCriterion(Enums.ECriterion.eNotMyHypervisor);
        }
        else if (iJSONNodeIdSelector.preferMyHypervisor) {
            nodeIdSelector.setCriterion(Enums.ECriterion.ePreferMyHypervisor);
        }

        nodeIdSelector.setTimeout(iJSONNodeIdSelector.timeout);
        nodeIdSelector.setQueuing(! iJSONNodeIdSelector.noQueuing);
        nodeIdSelector.setMaxInstanceCount(iJSONNodeIdSelector.maxInstanceCount);
        nodeIdSelector.setCmdLine(iJSONNodeIdSelector.cmdLine);
    };

    var csiImportRuntimeSettings = function (oGraphBlock, iRuntimeSettings) {
        if (oGraphBlock instanceof CSIGraphBlock) {
            if (iRuntimeSettings.defaultTimeout !== undefined) {
                oGraphBlock.getSettingByName('defaultTimeout').setValue(iRuntimeSettings.defaultTimeout);
            }
            if (iRuntimeSettings.directData !== undefined) {
                oGraphBlock.getSettingByName('directData').setValue(iRuntimeSettings.directData);
            }
            if (iRuntimeSettings.progressEvents !== undefined) {
                oGraphBlock.getSettingByName('progressEvents').setValue(iRuntimeSettings.progressEvents);
            }
            if (iRuntimeSettings.multipleCall !== undefined) {
                oGraphBlock.getSettingByName('multipleCall').setValue(iRuntimeSettings.multipleCall);
            }
        }
    };

    var csiImportDataPort = function (oBlock, iJSONDataPort) {
        var CSICommandBinder = require('DS/CSICommandBinder/CSICommandBinder');
        var csiParameters = CSICommandBinder.createParameters();
        var csiName = iJSONDataPort.id.split('.').pop();
        var valueType = 'Object';
        var defaultValue;
        var result = csiParameters.importFromString(iJSONDataPort.value);
        if (result) {
            var csiType = csiParameters.exists(csiName);
            if (csiType !== undefined) {
                valueType = CSITools.getTypeByCSIType(csiType.replace('[]', ''));
                if (csiType.indexOf('[]') !== -1) {
                    valueType = 'Array<' + valueType + '>';
                }
                defaultValue = csiParameters.toJSObject()[csiName];
            }
        }
        else {
            var jsonDataPortValue = JSON.parse(iJSONDataPort.value);
            if (jsonDataPortValue.basic !== undefined) {
                valueType = CSITools.getTypeByCSIType(jsonDataPortValue.basic);
            }
            else if (jsonDataPortValue.basicArray !== undefined) {
                valueType = 'Array<' + CSITools.getTypeByCSIType(jsonDataPortValue.basicArray) + '>';
            }
            else if (jsonDataPortValue.type !== undefined) {
                valueType = CSITools.getTypeByCSIType(jsonDataPortValue.type);
            }
            defaultValue = jsonDataPortValue.value;
        }
        var dataPort = getDataPortFromCSIPort(oBlock, iJSONDataPort.id);
        if (dataPort !== undefined) {
            var typeName = TypeLibrary.getArrayValueTypeName(valueType) || valueType;
            var dataPortTypeName = TypeLibrary.getArrayValueTypeName(dataPort.getValueType()) || dataPort.getValueType();
            if ((typeName !== 'Object' || !TypeLibrary.hasType(dataPort.getGraphContext(), dataPortTypeName, Enums.FTypeCategory.fObject))) {
                dataPort.setValueType(valueType);
            }
            dataPort.setDefaultValue(defaultValue);
        }
    };

    var csiImportInvalidBlock = function (oGraphBlock, iJSONBlock) {
        var invalidBlock = new InvalidBlock();

        var blockName = iJSONBlock.implementation['function'] + '_v' + iJSONBlock.implementation.version;
        invalidBlock.uid = iJSONBlock.implementation.pool + '/' + blockName;
        invalidBlock.setName(blockName);

        invalidBlock.createDynamicControlPort(Enums.EControlPortType.eInput, 'Call');
        invalidBlock.createDynamicControlPort(Enums.EControlPortType.eOutput, 'Success');
        invalidBlock.createDynamicControlPort(Enums.EControlPortType.eOutput, 'Progress');
        invalidBlock.createDynamicControlPort(Enums.EControlPortType.eOutput, 'Error');

        var dataPortCall = invalidBlock.createDynamicDataPort(Enums.EDataPortType.eInput, 'Call');
        dataPortCall.setValueType('Object');
        var dataPortSuccess = invalidBlock.createDynamicDataPort(Enums.EDataPortType.eOutput, 'Success');
        dataPortSuccess.setValueType('Object');
        var dataPortProgress = invalidBlock.createDynamicDataPort(Enums.EDataPortType.eOutput, 'Progress');
        dataPortProgress.setValueType('Object');
        var dataPortError = invalidBlock.createDynamicDataPort(Enums.EDataPortType.eOutput, 'Error');
        dataPortError.setValueType('Object');

        oGraphBlock.addBlock(invalidBlock);
        return invalidBlock;
    };

    var mapOfLogicalBlockUidByMode = new Map();
    mapOfLogicalBlockUidByMode.set('waitAll', SyncFlowsBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('joinAll', JoinAllBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('onlyOne', OnlyOneBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('ifCondi', IfBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('add', AddBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('divide', DivideBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('isEqual', IsEqualBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('multiply', MultiplyBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('setValue', SetValueBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('substract', SubstractBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayConcat', ArrayConcatBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayGet', ArrayGetBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayGetIndex', ArrayGetIndexBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayInsert', ArrayInsertBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayLength', ArrayLengthBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayPop', ArrayPopBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayPush', ArrayPushBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayRemove', ArrayRemoveBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arraySet', ArraySetBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayShift', ArrayShiftBlock.prototype.uid);
    mapOfLogicalBlockUidByMode.set('arrayUnshift', ArrayUnshiftBlock.prototype.uid);

    var csiImportBlock = function (oGraphBlock, iJSONBlock, oBlocksById) {
        var uid;
        if (iJSONBlock.type === 'Logical') {
            uid = mapOfLogicalBlockUidByMode.get(iJSONBlock.implementation.mode);
        }
        else if (iJSONBlock.type === 'CustomImpl') {
            if (iJSONBlock.implementation.definition.implementation.name === 'ecmaScript') {
                uid = CSIJavaScriptBlock.prototype.uid;
            }
            else if (iJSONBlock.implementation.definition.implementation.name === 'python') {
                uid = CSIPythonBlock.prototype.uid;
            }
        }
        else if (iJSONBlock.type === 'Function') {
            uid = iJSONBlock.implementation.pool + '/' + iJSONBlock.implementation['function'] + '_v' + iJSONBlock.implementation.version;
        }
        else if (iJSONBlock.type === 'ArrayMap') {
            uid = ArrayMapBlock.prototype.uid;
        }
        else if (iJSONBlock.type === 'ExecutionGraph') {
            uid = CSIGraphBlock.prototype.uid;
        }

        var block;
        if (BlockLibrary.getBlock(uid) !== undefined) {
            block = oGraphBlock.createBlock(uid);
            if (block instanceof CSIGraphBlock) {
                var graphDataPorts = block.getDataPorts();
                var graphDataPort;
                var localCustomObjectTypeName;
                for (var gdp = 0; gdp < graphDataPorts.length; gdp++) {
                    graphDataPort = graphDataPorts[gdp];
                    if (! graphDataPort.hasLocalCustomType()) {
                        localCustomObjectTypeName = createLocalCustomObjectType(oGraphBlock.getGraphContext(), graphDataPort.getName());
                        graphDataPort.setValueType(localCustomObjectTypeName);
                    }
                }
                csiImportGraphBlock(block, iJSONBlock);
            }
            else if (block instanceof GraphContainerBlock) {
                csiImportGraphBlock(block.getContainedGraph(), iJSONBlock);
            }
            else if (block instanceof CSIJavaScriptBlock) {
                csiImportJavaScriptBlock(block, iJSONBlock);
            }
            else if (block instanceof CSIPythonBlock) {
                csiImportPythonBlock(block, iJSONBlock);
            }
            else if (iJSONBlock.type === 'Logical') {
                csiImportLogicalBlock(block, iJSONBlock);
            }
        }
        else {
            block = csiImportInvalidBlock(oGraphBlock, iJSONBlock);
        }
        var jsonLocalDataPort;
        if (iJSONBlock.implementation.localDataPorts !== undefined) {
            for (var ldp = 0; ldp < iJSONBlock.implementation.localDataPorts.length; ldp++) {
                jsonLocalDataPort = iJSONBlock.implementation.localDataPorts[ldp];
                csiImportDataPort(block, jsonLocalDataPort);
            }
        }

        var nodeIdSelectorName = iJSONBlock.implementation.nodeIdSelector === '_' ? Tools.parentNodeIdSelector : iJSONBlock.implementation.nodeIdSelector;
        block.setNodeIdSelector(nodeIdSelectorName);
        oBlocksById[iJSONBlock.id] = block;
    };

    var isInstanceOfArray = function (iBlock) {
        return iBlock instanceof ArrayConcatBlock || iBlock instanceof ArrayGetBlock || iBlock instanceof ArrayGetIndexBlock || iBlock instanceof ArrayInsertBlock ||
        iBlock instanceof ArrayLengthBlock || iBlock instanceof ArrayPopBlock || iBlock instanceof ArrayPushBlock || iBlock instanceof ArrayRemoveBlock ||
        iBlock instanceof ArraySetBlock || iBlock instanceof ArrayShiftBlock || iBlock instanceof ArrayUnshiftBlock;
    };

    var isInstanceOfCalculator = function (iBlock) {
        return iBlock instanceof AddBlock || iBlock instanceof DivideBlock || iBlock instanceof MultiplyBlock || iBlock instanceof SubstractBlock;
    };

    var addSpaceBeforeUpperCase = function (iString) {
        var result = iString.replace(/[A-Z]+(.)/g, function (match) {
            return String(' ' + match);
        });
        return result;
    };

    var getControlPortFromCSIPath = function (iCSIPath, iBlocksById) {
        var controlPort;
        var elements = iCSIPath.split('.');
        var block = iBlocksById[elements[0]];
        var controlPortName = elements[1];
        if (elements.length > 2) {
            controlPortName = elements[2];
        }
        controlPortName = addSpaceBeforeUpperCase(controlPortName);
        controlPortName = controlPortName.charAt(0).toUpperCase() + controlPortName.slice(1);
        if (block instanceof JoinAllBlock || block instanceof SetValueBlock || isInstanceOfArray(block) || isInstanceOfCalculator(block)) {
            if (controlPortName === 'Call') {
                controlPortName = 'In';
            }
            else if (controlPortName === 'Success') {
                controlPortName = 'Out';
            }
        }
        else if (block instanceof SyncFlowsBlock || block instanceof OnlyOneBlock) {
            if (controlPortName === 'Call') {
                var controlPorts = block.getControlPorts(Enums.EControlPortType.eInput);
                var index = 0;
                while (index < controlPorts.length && controlPorts[index].getControlLinks().length > 0) {
                    ++index;
                }
                controlPortName = 'In' + (index + 1);
            }
            else if (controlPortName === 'Success') {
                controlPortName = 'Out';
            }
        }
        else if (block instanceof IfBlock || block instanceof IsEqualBlock) {
            if (controlPortName === 'Call') {
                controlPortName = 'In';
            }
            else if (controlPortName === 'Success') {
                controlPortName = 'True';
            }
            else if (controlPortName === 'Error') {
                controlPortName = 'False';
            }
        }
        else if ((block instanceof GraphContainerBlock || block instanceof ContainedGraphBlock) && controlPortName === 'Call') {
            controlPortName = 'In';
        }
        controlPort = block.getControlPortByName(controlPortName);
        return controlPort;
    };

    var csiImportControlLink = function (oGraphBlock, iJSONControlLink, iBlocksById) {
        var startPort = getControlPortFromCSIPath(iJSONControlLink.from, iBlocksById);
        var endPort = getControlPortFromCSIPath(iJSONControlLink.to, iBlocksById);
        oGraphBlock.createControlLink(startPort, endPort);
    };

    // eslint-disable-next-line complexity
    var getDataPortFromCSIPort = function (iBlock, iCSIPort) {
        var dataPort;
        var elements = iCSIPort.split('.');
        var rootDataPortName = elements.shift();
        var isGraphLocalData = iBlock instanceof GraphBlock && rootDataPortName === 'localData';
        // To support old syntax of LocalData (without 'localData')
        var isOldGraphLocalData = ! isGraphLocalData;
        isOldGraphLocalData = isOldGraphLocalData && iBlock instanceof GraphBlock;
        isOldGraphLocalData = isOldGraphLocalData && rootDataPortName !== 'call';
        isOldGraphLocalData = isOldGraphLocalData && rootDataPortName !== 'success';
        isOldGraphLocalData = isOldGraphLocalData && rootDataPortName !== 'progress';
        isOldGraphLocalData = isOldGraphLocalData && rootDataPortName !== 'error';

        if (! isOldGraphLocalData) {
            if (iBlock instanceof GraphContainerBlock ||
                iBlock instanceof ContainedGraphBlock ||
                iBlock instanceof IfBlock ||
                iBlock instanceof IsEqualBlock ||
                iBlock instanceof SetValueBlock ||
                iBlock instanceof OnlyOneBlock ||
                isInstanceOfArray(iBlock) ||
                isInstanceOfCalculator(iBlock) ||
                isGraphLocalData) {
                rootDataPortName = elements.shift();
            }
        }

        if (! isGraphLocalData && ! isOldGraphLocalData) {
            rootDataPortName = rootDataPortName.charAt(0).toUpperCase() + rootDataPortName.slice(1);
        }
        var rootDataPort = iBlock.getDataPortByName(rootDataPortName);
        if (rootDataPort === undefined && iBlock instanceof GraphBlock) {
            rootDataPort = iBlock.createDynamicDataPort(Enums.EDataPortType.eLocal, rootDataPortName);
        }

        if (elements.length > 0) {
            var subDataPortName = elements.join('.');
            dataPort = rootDataPort.getDataPortByName(subDataPortName);
            if (dataPort === undefined) {
                dataPort = rootDataPort.createDataPort(subDataPortName);
                if (dataPort === undefined) {
                    var valueType = rootDataPort.getValueType();
                    if (TypeLibrary.hasLocalCustomType(iBlock.getGraphContext(), valueType, Enums.FTypeCategory.fObject)) {
                        var currentLocalCustomObjectType = Tools.copyValue(TypeLibrary.getType(iBlock.getGraphContext(), valueType));
                        var currentTypeName = valueType;
                        var nextTypeName;
                        for (var e = 0; e < elements.length; e++) {
                            var property = elements[e];
                            nextTypeName = undefined;
                            if (currentLocalCustomObjectType.hasOwnProperty(property)) {
                                nextTypeName = currentLocalCustomObjectType[property].type;
                            }

                            if (! TypeLibrary.hasLocalCustomType(iBlock.getGraphContext(), nextTypeName, Enums.FTypeCategory.fObject)) {
                                if (e !== elements.length - 1) {
                                    nextTypeName = currentTypeName.replace('Parameters', property + '_Parameters');
                                    TypeLibrary.registerLocalCustomObjectType(iBlock.getGraphContext(), nextTypeName, {});
                                    currentLocalCustomObjectType[property] = {
                                        type: nextTypeName,
                                        defaultValue: undefined,
                                        mandatory: false
                                    };
                                    TypeLibrary.updateLocalCustomObjectType(iBlock.getGraphContext(), currentTypeName, currentLocalCustomObjectType);
                                }
                                else if (nextTypeName === undefined) {
                                    nextTypeName = 'Object';
                                    currentLocalCustomObjectType[property] = {
                                        type: nextTypeName,
                                        defaultValue: undefined,
                                        mandatory: false
                                    };
                                    TypeLibrary.updateLocalCustomObjectType(iBlock.getGraphContext(), currentTypeName, currentLocalCustomObjectType);
                                }
                            }
                            currentLocalCustomObjectType = Tools.copyValue(TypeLibrary.getType(iBlock.getGraphContext(), nextTypeName));
                            currentTypeName = nextTypeName;
                        }
                        dataPort = rootDataPort.createDataPort(subDataPortName);
                    }
                    else {
                        rootDataPort.setValueType('Object');
                        dataPort = rootDataPort.createInvalidDataPort(subDataPortName, rootDataPort.getValueType(), rootDataPort.getDataPorts().length);
                    }
                }
            }
        }
        else {
            dataPort = rootDataPort;
        }
        return dataPort;
    };

    var getDataPortFromCSIPath = function (iCSIPath, iBlocksById) {
        var dataPort;
        var csiElements = iCSIPath.split('.');
        var blockId = csiElements.shift();
        var block = iBlocksById[blockId];
        var csiPort = csiElements.join('.');
        dataPort = getDataPortFromCSIPort(block, csiPort);
        return dataPort;
    };

    var mergeType = function (ioType, iType) {
        var keys = Object.keys(iType);
        var key;
        for (var k = 0; k < keys.length; k++) {
            key = keys[k];
            ioType[key] = iType[key];
        }
    };

    var isTypeEditable = function (iDataPort, iValueType) {
        var result;
        var graphContext = iDataPort.getGraphContext();
        if (iDataPort.dataPort === undefined) {
            var valueType = iDataPort.getValueType();
            result = TypeLibrary.hasLocalCustomType(graphContext, valueType, Enums.FTypeCategory.fObject);
            result = result && TypeLibrary.hasType(graphContext, iValueType, Enums.FTypeCategory.fObject);
        }
        else {
            var parentValueType = iDataPort.dataPort.getValueType();
            result = TypeLibrary.hasLocalCustomType(graphContext, parentValueType, Enums.FTypeCategory.fObject);
        }
        return result;
    };

    var editType = function (iDataPort, iValueType) {
        var graphContext = iDataPort.getGraphContext();
        var localCustomObjectType, valueType, objectType;
        if (iDataPort.dataPort === undefined) {
            valueType = iDataPort.getValueType();
            valueType = TypeLibrary.getArrayValueTypeName(valueType) || valueType;
            iValueType = TypeLibrary.getArrayValueTypeName(iValueType) || iValueType;
            localCustomObjectType = Tools.copyValue(TypeLibrary.getType(graphContext, valueType));
            objectType = Tools.copyValue(TypeLibrary.getType(graphContext, iValueType));
            mergeType(localCustomObjectType, objectType);
            TypeLibrary.updateLocalCustomObjectType(graphContext, valueType, localCustomObjectType);
        }
        else {
            var parentValueType = iDataPort.dataPort.getValueType();
            localCustomObjectType = Tools.copyValue(TypeLibrary.getType(graphContext, parentValueType));
            var propertyPath = iDataPort.getName();
            var properties = propertyPath.split('.');
            var property;
            for (var p = 0; p < properties.length; p++) {
                property = properties[p];
                if (p !== properties.length - 1) {
                    parentValueType = localCustomObjectType[property].type;
                    localCustomObjectType = Tools.copyValue(TypeLibrary.getType(graphContext, parentValueType));
                }
            }
            valueType = localCustomObjectType[property].type;

            if (TypeLibrary.hasType(graphContext, iValueType, Enums.FTypeCategory.fObject)) {
                if (! TypeLibrary.hasLocalCustomType(graphContext, valueType, Enums.FTypeCategory.fObject)) {
                    valueType = parentValueType.replace('Parameters', property + '_Parameters');
                    TypeLibrary.registerLocalCustomObjectType(graphContext, valueType, {});
                    localCustomObjectType[property].type = valueType;
                    TypeLibrary.updateLocalCustomObjectType(graphContext, parentValueType, localCustomObjectType);
                }
                localCustomObjectType = Tools.copyValue(TypeLibrary.getType(graphContext, valueType));
                objectType = Tools.copyValue(TypeLibrary.getType(graphContext, iValueType));
                mergeType(localCustomObjectType, objectType);
                TypeLibrary.updateLocalCustomObjectType(graphContext, valueType, localCustomObjectType);
            }
            else {
                localCustomObjectType[property].type = iValueType;
                TypeLibrary.updateLocalCustomObjectType(graphContext, parentValueType, localCustomObjectType);
            }
        }
    };

    var csiImportDataLink = function (oGraphBlock, iJSONDataLink, iBlocksById) {
        var startPort = getDataPortFromCSIPath(iJSONDataLink.from, iBlocksById);
        var endPort = getDataPortFromCSIPath(iJSONDataLink.to, iBlocksById);
        var startValueType = startPort.getValueType();
        var endValueType = endPort.getValueType();
        if (startPort.dataPort === undefined && startPort.block instanceof ContainedGraphBlock) {
            if (startPort.getName() === 'Input') {
                startPort.block.container.getDataPortByName('Input').setValueType('Array<' + endValueType + '>');
            }
            else if (startPort.getName() === 'SharedData') {
                startPort.block.container.getDataPortByName('SharedData').setValueType(endValueType);
            }
        }
        else if (endPort.dataPort === undefined && endPort.block instanceof ContainedGraphBlock) {
            if (endPort.getName() === 'Success') {
                endPort.block.container.getDataPortByName('Success').setValueType('Array<' + startValueType + '>');
            }
        }
        if (! (TypeLibrary.getCastLevel(oGraphBlock.getGraphContext(), startValueType, endValueType) <= Enums.ECastLevel.eLossless)) {
            if (startValueType !== 'Object' && isTypeEditable(endPort, startValueType)) {
                editType(endPort, startValueType);
            }
            else if (endValueType !== 'Object' && isTypeEditable(startPort, endValueType)) {
                editType(startPort, endValueType);
            }
        }
        var dataLink = oGraphBlock.createDataLink(startPort, endPort);
        if (dataLink === undefined) {
            oGraphBlock.createInvalidDataLink(startPort, endPort);
        }
    };

    CSIImport.buildFromJSON = buildFromJSON;
    CSIImport.buildFromJSONObject = buildFromJSONObject;

    return CSIImport;
});
