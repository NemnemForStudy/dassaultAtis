define('DS/EPSSchematicsCoreLibrary/array/EPSArrayPushBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ValueTypeRules, ArrayCategory) {
	'use strict';

	var ArrayPushBlock = function () {

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

	ArrayPushBlock.prototype = Object.create(DynamicBlock.prototype);
	ArrayPushBlock.prototype.constructor = ArrayPushBlock;
	ArrayPushBlock.prototype.uid = '513d5d58-82e8-464a-9a6d-bc3dc0a9166b';
	ArrayPushBlock.prototype.name = 'Array Push';
	ArrayPushBlock.prototype.category = ArrayCategory;
	ArrayPushBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayPushBlockDoc';

	ArrayPushBlock.prototype.execute = function () {
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

		Array.prototype.push.apply(arrayIn, values);

		this.setOutputDataPortValue('ArrayOut', arrayIn);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayPushBlock);

	return ArrayPushBlock;
});
