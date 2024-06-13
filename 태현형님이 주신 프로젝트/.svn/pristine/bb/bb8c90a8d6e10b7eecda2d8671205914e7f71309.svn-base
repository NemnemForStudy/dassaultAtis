define('DS/EPSSchematicsCoreLibrary/calculator/EPSSetValueBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ValueTypeRules, CalculatorCategory) {
    'use strict';

    var SetValueBlock = function () {

    	DynamicBlock.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	var dataPortValueIn1 = this.createDataPort(new DataPortDefinitions.InputAll('ValueIn1', 'Double', {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

    	this.createDataPort(new DataPortDefinitions.OutputRef('ValueOut1', dataPortValueIn1));

    	this.setDataPortInputRules({
    		name: { prefix: 'ValueIn', readonly: true },
    		valueTypes: new ValueTypeRules.All('Double', {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			})
    	});

    	this.setDataPortOutputRules({
    		name: { prefix: 'ValueOut', readonly: true },
    		valueTypes: new ValueTypeRules.RefIndex()
    	});

		this.setDataPortLocalRules({ dynamicCount: 0 });
    	this.setControlPortInputRules({ dynamicCount: 0 });
    	this.setControlPortOutputRules({ dynamicCount: 0 });
    	this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
    };

    SetValueBlock.prototype = Object.create(DynamicBlock.prototype);
    SetValueBlock.prototype.constructor = SetValueBlock;

    SetValueBlock.prototype.uid = '8dc81190-2eb2-4e20-a595-8939ff534f29';
    SetValueBlock.prototype.name = 'Set Value';
    SetValueBlock.prototype.category = CalculatorCategory;
    SetValueBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSSetValueBlockDoc';

    SetValueBlock.prototype.execute = function () {
        var inputDataPortNames = this.getInputDataPortNameList();
        var outputDataPortNames = this.getOutputDataPortNameList();
        for (var i = 0; i < inputDataPortNames.length; i++) {
            this.setOutputDataPortValue(outputDataPortNames[i], this.getInputDataPortValue(inputDataPortNames[i]));
        }
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(SetValueBlock);

    return SetValueBlock;
});
