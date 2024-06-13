define('DS/EPSSchematicsCoreLibrary/array/EPSArrayUnshiftBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ValueTypeRules, ArrayCategory) {
	'use strict';

	var ArrayUnshiftBlock = function () {

		DynamicBlock.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('ArrayIn', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputRefArrayValue('Value1', dataPortArray, {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			}),
			new DataPortDefinitions.OutputRef('ArrayOut', dataPortArray)
		]);

    	this.setDataPortInputRules({
    		name: { prefix: 'Value', readonly: true },
    		valueTypes: new ValueTypeRules.RefArrayValue(dataPortArray)
		});

		this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
	};

	ArrayUnshiftBlock.prototype = Object.create(DynamicBlock.prototype);
	ArrayUnshiftBlock.prototype.constructor = ArrayUnshiftBlock;
	ArrayUnshiftBlock.prototype.uid = 'dab97f85-e94e-4f58-a061-bee3fad06f3e';
	ArrayUnshiftBlock.prototype.name = 'Array Unshift';
	ArrayUnshiftBlock.prototype.category = ArrayCategory;
	ArrayUnshiftBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayUnshiftBlockDoc';

	ArrayUnshiftBlock.prototype.execute = function () {
		var arrayIn = this.getInputDataPortValue('ArrayIn');
		if (arrayIn === undefined) {
			throw new Error('The data port ArrayIn is undefined!');
		}

		var inputDataPortNames = this.getInputDataPortNameList();
		var values = [];
		var value, inputDataPortName;
        for (var i = 1; i < inputDataPortNames.length; i++) {
			inputDataPortName = inputDataPortNames[i];
			value = this.getInputDataPortValue(inputDataPortName);
            values.push(value);
		}

		Array.prototype.unshift.apply(arrayIn, values);

		this.setOutputDataPortValue('ArrayOut', arrayIn);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayUnshiftBlock);

	return ArrayUnshiftBlock;
});
