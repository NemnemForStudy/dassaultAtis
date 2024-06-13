/* global importScripts */
importScripts('../AmdLoader/AmdLoader.js');

var Enums, BlockLibrary, ExecutionBlock, GraphBlock, JSBlock, ExecutionGraph, ExecutionScriptBlock;

//Replace inputs and local values of the execution block from JSON.
var inputsFromJSON = function (executionBlock, iJSONExecutionBlock) {
    'use strict';
    var iJSONControlPort;
    for (var cp = 0; cp < iJSONExecutionBlock.controlPorts.length; cp++) {
        iJSONControlPort = iJSONExecutionBlock.controlPorts[cp];
        if (iJSONControlPort.isActive && iJSONControlPort.portType === Enums.EControlPortType.eInput) {
            executionBlock.activateInputControlPort(iJSONControlPort.name);
        }
    }

    var iJSONDataPort, executionValue, dataPort;
    var TypeLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary');
    for (var dp = 0; dp < iJSONExecutionBlock.dataPorts.length; dp++) {
        iJSONDataPort = iJSONExecutionBlock.dataPorts[dp];
        dataPort = executionBlock.getDataPortByName(iJSONDataPort.name);
        if (dataPort !== undefined && (iJSONDataPort.portType === Enums.EDataPortType.eInput || iJSONDataPort.portType === Enums.EDataPortType.eLocal)) {
            executionValue = TypeLibrary.getValueFromJSONValue(executionBlock.model.getGraphContext(), iJSONDataPort.executionValue, iJSONDataPort.valueType);
            dataPort.setValue(executionValue);
        }
    }
    executionBlock.data = iJSONExecutionBlock.data;
};

//Construct JSON from local data port, output control port and output data port.
var outputsToJSON = function (executionBlock, oJSONExecutionBlock) {
    'use strict';
    executionBlock.model.toJSON(oJSONExecutionBlock);

    var oJSONControlPort;
    for (var cp = 0; cp < oJSONExecutionBlock.controlPorts.length; cp++) {
        oJSONControlPort = oJSONExecutionBlock.controlPorts[cp];
        if (oJSONControlPort.portType === Enums.EControlPortType.eOutput) {
            oJSONControlPort.isActive = executionBlock.isOutputControlPortActivated(oJSONControlPort.name);
        }
    }

    var dataPort, oJSONDataPort;
    for (var dp = 0; dp < oJSONExecutionBlock.dataPorts.length; dp++) {
        oJSONDataPort = oJSONExecutionBlock.dataPorts[dp];
        dataPort = executionBlock.getDataPortByName(oJSONDataPort.name);
        if (dataPort !== undefined && (oJSONDataPort.portType === Enums.EDataPortType.eOutput || oJSONDataPort.portType === Enums.EDataPortType.eLocal)) {
            oJSONDataPort.executionValue = dataPort.getValue();
        }
    }
    oJSONExecutionBlock.data = executionBlock.data;
};

var executeBlock = function(data) {
    'use strict';
    var blockDefinition = BlockLibrary.getBlock(data.definition.uid);
    var BlockCtor = blockDefinition.constructor;
    var block = new BlockCtor();
    block.fromJSON(data);

    var executionBlock;
    if (block instanceof GraphBlock) {
        executionBlock = new ExecutionGraph(block);
    } else if (block instanceof JSBlock) {
        executionBlock = new ExecutionScriptBlock(block);
    } else {
        executionBlock = new ExecutionBlock(block);
    }
    inputsFromJSON(executionBlock, data);

    executionBlock.traceMode = true;
    //Execute the block
    var executionStatus = executionBlock.execute(data.runParams);
    var jsonExecutionBlock = {};
    outputsToJSON(executionBlock, jsonExecutionBlock);
    postMessage({
            executionMessage: true,
            executionStatus: executionStatus,
            jsonExecutionBlock: jsonExecutionBlock
        });
};

// eslint-disable-next-line
onmessage = function(event) {
    'use strict';

    if (BlockLibrary === undefined) {
        require([
                'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
                'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
                'DS/EPSSchematicEngine/EPSSchematicsExecutionBlock',
                'DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock',
                'DS/EPSSchematicEngine/EPSSchematicsExecutionGraph',
                'DS/EPSSchematicEngine/EPSSchematicsExecutionScriptBlock',
                'DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock',
                'DS/EPEventServices/EPEventServices',
                'DS/EPSSchematicEngine/EPSSchematicsExecutionEvents',
                'DS/EPSSchematicsModelWeb/EPSSchematicsTemplateLibrary',
                'DS/EPSSchematicsModelWeb/EPSSchematicsTemplateGraphBlock'
            ].concat(event.data.modules),
            function (iEnums, iBlockLibrary, iExecutionBlock, iGraphBlock, iExecutionGraph, iExecutionScriptBlock, iJSBlock, EventServices, ExecutionEvents) {
                    Enums = iEnums;
                    BlockLibrary = iBlockLibrary;
                    ExecutionBlock = iExecutionBlock;
                    GraphBlock = iGraphBlock;
                    ExecutionGraph = iExecutionGraph;
                    ExecutionScriptBlock = iExecutionScriptBlock;
                    JSBlock = iJSBlock;

                    var eventCallBack = function(iEvent) {
                        postMessage({
                            eventMessage: true,
                            type: iEvent.getType(),
                            eventObj: iEvent
                        });
                    };
                    EventServices.addListener(ExecutionEvents.TraceStartEvent, eventCallBack);
                    EventServices.addListener(ExecutionEvents.TraceStopEvent, eventCallBack);
                    EventServices.addListener(ExecutionEvents.TraceBlockEvent, eventCallBack);
                    EventServices.addListener(ExecutionEvents.TracePortEvent, eventCallBack);
                    EventServices.addListener(ExecutionEvents.TraceLinkEvent, eventCallBack);
                    executeBlock(event.data);
        });
    } else {
        executeBlock(event.data);
    }
};
