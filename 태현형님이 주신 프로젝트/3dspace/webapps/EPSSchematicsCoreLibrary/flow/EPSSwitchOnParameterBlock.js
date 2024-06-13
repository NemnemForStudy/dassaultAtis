define('DS/EPSSchematicsCoreLibrary/flow/EPSSwitchOnParameterBlock', [
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

    var SwitchOnParameterBlock = function () {

    	DynamicBlock.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('None'),
			new ControlPortDefinitions.Output('Parameter1')
    	]);

    	var dataPortTestValue = this.createDataPort(new DataPortDefinitions.InputAll('TestValue', 'Double', {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

    	this.createDataPort(new DataPortDefinitions.InputRef('Value1', dataPortTestValue, {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

    	this.setDataPortInputRules({
    		name: { prefix: 'Value', readonly: true },
			valueTypes: new ValueTypeRules.Ref(dataPortTestValue, {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			})
    	});

		this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });
    	this.setControlPortInputRules({ dynamicCount: 0 });

    	this.setControlPortOutputRules({
    		name: { prefix: 'Parameter', readonly: true },
    		dynamicCount: { ctor: DataPort, type: Enums.EDataPortType.eInput }
    	});

    	this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
    };

    SwitchOnParameterBlock.prototype = Object.create(DynamicBlock.prototype);
    SwitchOnParameterBlock.prototype.constructor = SwitchOnParameterBlock;

    SwitchOnParameterBlock.prototype.uid = '23c765e7-9dc2-47ec-9bc2-4acbe2cda600';
    SwitchOnParameterBlock.prototype.name = 'Switch On Parameter';
    SwitchOnParameterBlock.prototype.category = FlowCategory;
    SwitchOnParameterBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSSwitchOnParameterBlockDoc';

    SwitchOnParameterBlock.prototype.execute = function () {
        var i = 0;
        var testValue = this.getInputDataPortValue('TestValue');
        var inputDataPortNames = this.getInputDataPortNameList();
        var outputControlPortNames = this.getOutputControlPortNameList();
        for (i = 1; i < inputDataPortNames.length; i++) {
            if (this.getInputDataPortValue(inputDataPortNames[i]) === testValue) {
                this.activateOutputControlPort(outputControlPortNames[i]);
                break;
            }
        }

        if (i === inputDataPortNames.length) {
            this.activateOutputControlPort('None');
        }

    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(SwitchOnParameterBlock);

    return SwitchOnParameterBlock;
});
