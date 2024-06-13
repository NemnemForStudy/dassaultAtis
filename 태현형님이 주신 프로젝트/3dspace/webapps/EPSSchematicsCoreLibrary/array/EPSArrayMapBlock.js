define('DS/EPSSchematicsCoreLibrary/array/EPSArrayMapBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsGraphContainerBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsContainedGraphBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsJSONConverter',
	'DS/EPSSchematicsModelWeb/EPSSchematicsTools',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory',
	'DS/EPSSchematicEngine/EPSSchematicsExecutionGraph',
	'DS/EPSSchematicEngine/EPSSchematicsExecutionEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary'
], function (
	GraphContainerBlock,
	ContainedGraphBlock,
	Enums,
	BlockLibrary,
	ControlPortDefinitions,
	DataPortDefinitions,
	JSONConverter,
	Tools,
	ArrayCategory,
	ExecutionGraph,
	ExecutionEnums,
	TypeLibrary) {
	'use strict';

	var ArrayMapGraphBlock = function () {
		ContainedGraphBlock.call(this);

        var inPort = this.getControlPorts()[0];
        inPort.setRenamable(false);

        this.createControlPorts([
            new ControlPortDefinitions.Output('Success'),
			new ControlPortDefinitions.Output('Error')
        ]);

        this.setDataPortInputRules({ dynamicCount: 0 });
        this.setDataPortOutputRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
        this.setEventPortOutputRules({ dynamicCount: 0 });
    };
    ArrayMapGraphBlock.prototype = Object.create(ContainedGraphBlock.prototype);
	ArrayMapGraphBlock.prototype.constructor = ArrayMapGraphBlock;
	ArrayMapGraphBlock.prototype.name = 'Array Map';

	/**
	 * On set.
	 * @private
	 * @param {GraphContainerBlock} iContainer - The graph container block.
	 */
	ArrayMapGraphBlock.prototype.onSet = function (iContainer) {
		this.createDataPorts([
			new DataPortDefinitions.InputRefArrayValue('Input', iContainer.getDataPortByName('Input')),
			new DataPortDefinitions.InputRef('SharedData', iContainer.getDataPortByName('SharedData')),
			new DataPortDefinitions.InputBasic('Index', 'Integer'),
			new DataPortDefinitions.OutputRefArrayValue('Success', iContainer.getDataPortByName('Success')),
			new DataPortDefinitions.OutputBasic('Error', 'Object')
		]);
		ContainedGraphBlock.prototype.onSet.call(this, iContainer);
	};

	var EExecutionState = {
		eSuccess: 0,
		eError: 1,
		eRunning: 2
	};
	Object.freeze(EExecutionState);
	TypeLibrary.registerGlobalEnumType('EExecutionState', EExecutionState);

	var ArrayMapState = {
		state : {
			type: 'EExecutionState',
			defaultValue: undefined,
			mandatory: true
		},
		outputIndex: {
			type: 'Integer',
			defaultValue: undefined,
			mandatory: true
		}
	};
	TypeLibrary.registerGlobalObjectType('ArrayMapState', ArrayMapState);

	var ArrayMapProgress = {
		inputIndex: {
			type: 'Integer',
			defaultValue: undefined,
			mandatory: true
		},
		state : {
			type: 'EExecutionState',
			defaultValue: undefined,
			mandatory: true
		}
	};
	TypeLibrary.registerGlobalObjectType('ArrayMapProgress', ArrayMapProgress);

	var ArrayMapError = {
		inputIndex: {
			type: 'Integer',
			defaultValue: undefined,
			mandatory: true
		},
		error : {
			type: 'Object',
			defaultValue: undefined,
			mandatory: false
		}
	};
	TypeLibrary.registerGlobalObjectType('ArrayMapError', ArrayMapError);

	var ArrayMapBlock = function () {
		GraphContainerBlock.call(this);
		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Success'),
			new ControlPortDefinitions.Output('Progress'),
			new ControlPortDefinitions.Output('Error')
		]);

		var stateTypes = ['Array<ArrayMapState>'];
		var progressTypes = ['Array<ArrayMapProgress>'];
		var errorTypes = ['Array<ArrayMapError>'];
		// to break cyclic dependencies
		//var hasCSIGraphBlock = CSITools.isCSIGraphBlockRegistered();
		var hasCSIGraphBlock = BlockLibrary.hasBlock('6d004daa-6201-413e-9bde-45dbc9351cc6');
		if (hasCSIGraphBlock) {
			if (TypeLibrary.hasGlobalType('CSIExecGraphArrayMapState', Enums.FTypeCategory.fObject)) {
				stateTypes.unshift('Array<CSIExecGraphArrayMapState>');
			}
			if (TypeLibrary.hasGlobalType('CSIExecGraphArrayMapProgress', Enums.FTypeCategory.fObject)) {
				progressTypes.unshift('Array<CSIExecGraphArrayMapProgress>');
			}
			if (TypeLibrary.hasGlobalType('CSIExecGraphArrayMapError', Enums.FTypeCategory.fObject)) {
				errorTypes.unshift('Array<CSIExecGraphArrayMapError>');
			}
		}
		this.createDataPorts([
			new DataPortDefinitions.InputCategory('Input', Enums.FTypeCategory.fArray, 'Array<Double>'),
			new DataPortDefinitions.InputAll('SharedData', 'Double', {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			}),
			new DataPortDefinitions.OutputCategory('Success', Enums.FTypeCategory.fArray, 'Array<Double>'),
			new DataPortDefinitions.OutputList('State', stateTypes),
			new DataPortDefinitions.OutputList('Progress', progressTypes),
			new DataPortDefinitions.OutputList('Error', errorTypes)
		]);

		this.setContainedGraph(new ArrayMapGraphBlock());

		if (hasCSIGraphBlock) {
			this.activateNodeIdSelector();
		}
	};

	ArrayMapBlock.prototype = Object.create(GraphContainerBlock.prototype);
	ArrayMapBlock.prototype.constructor = ArrayMapBlock;
	ArrayMapBlock.prototype.uid = '3af3b1b0-72fc-4a07-a0b9-7f5a4df4b85a';
	ArrayMapBlock.prototype.name = 'Array Map';
	ArrayMapBlock.prototype.category = ArrayCategory;
	ArrayMapBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayMapBlockDoc';

	/**
	 * On add.
	 *
	 * @private
	 * @param {GraphBlock} iGraphBlock
	 */
	ArrayMapBlock.prototype.onAdd = function (iGraphBlock) {
        GraphContainerBlock.prototype.onAdd.call(this, iGraphBlock);
        this.setNodeIdSelector(Tools.parentNodeIdSelector);
	};

	ArrayMapBlock.prototype.execute = function (runParams) {
		var inActivated = this.isInputControlPortActivated('In');
		var input;
		var sharedData;
		if (inActivated) {
			input = this.getInputDataPortValue('Input');
			if (input === undefined) {
				throw new Error('The data port Input is undefined!');
			}
			sharedData = this.getInputDataPortValue('SharedData');
			this.data.executionGraphs = {};
			this.data.success = [];
			this.data.success.length = input.length;
			this.data.state = [];
			this.data.state.length = input.length;
			this.data.error = [];
			this.data.error.length = input.length;
			this.data.progress = [];
		}

		var executionGraph;
		var executionGraphResult;
        for (var i = 0; i < this.data.success.length; i++) {
			executionGraph = this.data.executionGraphs[i];
			if (inActivated) {
				executionGraph = new ExecutionGraph(this.model.getContainedGraph(), undefined, undefined, this.parent.getModules(), this.parent.getNode(), this.parent.getNodeId());
				executionGraph.traceMode = ExecutionEnums.FTraceEvent.fNone;
				executionGraph.setInputDataPortValue('Input', input[i]);
				executionGraph.setInputDataPortValue('SharedData', sharedData);
				executionGraph.setInputDataPortValue('Index', i);
				executionGraph.activateInputControlPort('In');
				this.data.executionGraphs[i] = executionGraph;
				this.data.state[i] = {
					state: EExecutionState.eRunning,
					outputIndex: -1
				};
			}
			if (executionGraph !== undefined) {
				executionGraphResult = executionGraph.execute(runParams);
				if (executionGraphResult === Enums.EExecutionResult.eExecutionError) {
					throw new Error('Failed to execute array map graph with index: ' + i);
				}
				else if (executionGraph.isOutputControlPortActivated('Success')) {
					this.data.success[i] = executionGraph.getOutputDataPortValue('Success');
					this.data.state[i].state = EExecutionState.eSuccess;
					this.data.progress.push({
						inputIndex: i,
						state: EExecutionState.eSuccess
					});
					executionGraph.disconnect();
					delete this.data.executionGraphs[i];
				}
				else if (executionGraph.isOutputControlPortActivated('Error')) {
					this.data.state[i].state = EExecutionState.eError;
					this.data.progress.push({
						inputIndex: i,
						state: EExecutionState.eError
					});
					this.data.error[i] =  {
						inputIndex: i,
						error: executionGraph.getOutputDataPortValue('Error')
					};
					executionGraph.disconnect();
					delete this.data.executionGraphs[i];
				}
			}
		}

		this.setOutputDataPortValue('State', this.data.state);

		if (this.data.progress.length > 0) {
			this.setOutputDataPortValue('Progress', this.data.progress);
			this.data.progress = [];
			this.activateOutputControlPort('Progress');
		}

		var executionResult = Enums.EExecutionResult.eExecutionPending;
		if (Object.keys(this.data.executionGraphs).length === 0) {
			var successIndex = 0;
			var errorIndex = 0;
			var state;
			for (var s = 0; s < this.data.state.length; s++) {
				state = this.data.state[s];
				if (state.state === EExecutionState.eSuccess) {
					state.outputIndex = successIndex++;
					this.data.error.splice(errorIndex, 1);
				}
				else {
					state.outputIndex = errorIndex++;
					this.data.success.splice(successIndex, 1);
				}
			}
			this.setOutputDataPortValue('Success', this.data.success);
			this.setOutputDataPortValue('Error', this.data.error);
			if (this.data.error.length > 0) {
				this.activateOutputControlPort('Error');
			}
			else {
				this.activateOutputControlPort('Success');
			}
			executionResult = Enums.EExecutionResult.eExecutionFinished;
		}
		return executionResult;
	};

	var convertBlock = function (iOldBlock, oNewBlock) {
		var jsonObject = {};
		iOldBlock.toJSON(jsonObject);
		oNewBlock.fromJSON(jsonObject);
		if (oNewBlock.getName() === 'Array Map Graph') {
			oNewBlock.setName(ArrayMapBlock.prototype.name);
		}
	};
	JSONConverter.addBlockConverter('2.0.6', ArrayMapBlock.prototype.uid, ArrayMapBlock.prototype.uid, convertBlock);

	BlockLibrary.registerBlock(ArrayMapBlock);
	return ArrayMapBlock;
});
