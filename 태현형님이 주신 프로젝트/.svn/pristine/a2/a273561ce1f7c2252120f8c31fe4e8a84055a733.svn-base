define('DS/EPSSchematicsCoreLibrary/flow/EPSOnlyOneBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPort',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
    'DS/EPSSchematicsCoreLibrary/flow/EPSSchematicsCoreLibraryFlowCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, DataPort, ValueTypeRules, FlowCategory) {
    'use strict';

    var OnlyOneBlock = function () {

    	DynamicBlock.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In1'),
			new ControlPortDefinitions.Input('In2'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	var dataPortValue1 = this.createDataPort(new DataPortDefinitions.InputAll('Value1', 'Double', {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

    	this.createDataPorts([
			new DataPortDefinitions.InputRef('Value2', dataPortValue1, {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			}),
			new DataPortDefinitions.OutputRef('SelectedValue', dataPortValue1)
		]);

    	this.setDataPortInputRules({
    		name: { prefix: 'Value', readonly: true },
			valueTypes: new ValueTypeRules.Ref(dataPortValue1, {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			})
    	});

    	this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });

    	this.setControlPortInputRules({
    		name: { prefix: 'In', readonly: true },
    		dynamicCount: { ctor: DataPort, type: Enums.EDataPortType.eInput }
    	});

    	this.setControlPortOutputRules({ dynamicCount: 0 });
    	this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
    };

    OnlyOneBlock.prototype = Object.create(DynamicBlock.prototype);
    OnlyOneBlock.prototype.constructor = OnlyOneBlock;

    OnlyOneBlock.prototype.uid = 'ffeb5f74-51d3-4631-9f05-4538cb8ec893';
    OnlyOneBlock.prototype.name = 'Only One';
    OnlyOneBlock.prototype.category = FlowCategory;
    OnlyOneBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSOnlyOneBlockDoc';

    OnlyOneBlock.prototype.execute = function () {
		if (!this.data.executed) {
			var inputControlPortNames = this.getInputControlPortNameList();
			var inputDataPortNames = this.getInputDataPortNameList();
			for (var i = 0; i < inputControlPortNames.length; i++) {
				if (this.isInputControlPortActivated(inputControlPortNames[i])) {
					this.setOutputDataPortValue('SelectedValue', this.getInputDataPortValue(inputDataPortNames[i]));
					this.activateOutputControlPort('Out');
					this.data.executed = true;
					break;
				}
			}
		}
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(OnlyOneBlock);

    return OnlyOneBlock;
});
