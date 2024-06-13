define('DS/EPSSchematicsCoreLibrary/flow/EPSParameterSelectorBlock', [
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

    var ParameterSelectorBlock = function () {

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

    ParameterSelectorBlock.prototype = Object.create(DynamicBlock.prototype);
    ParameterSelectorBlock.prototype.constructor = ParameterSelectorBlock;

    ParameterSelectorBlock.prototype.uid = '29d8cb5e-1371-4020-9529-bc562bc1011f';
    ParameterSelectorBlock.prototype.name = 'Parameter Selector';
    ParameterSelectorBlock.prototype.category = FlowCategory;
    ParameterSelectorBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSParameterSelectorBlockDoc';

    ParameterSelectorBlock.prototype.execute = function () {
        var inputControlPortNames = this.getInputControlPortNameList();
        var inputDataPortNames = this.getInputDataPortNameList();
        for (var i = 0; i < inputControlPortNames.length; i++) {
            if (this.isInputControlPortActivated(inputControlPortNames[i])) {
                this.setOutputDataPortValue('SelectedValue', this.getInputDataPortValue(inputDataPortNames[i]));
                this.activateOutputControlPort('Out');
                break;
            }
        }
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(ParameterSelectorBlock);

    return ParameterSelectorBlock;
});
