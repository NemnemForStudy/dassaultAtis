define('DS/EPSSchematicsCoreLibrary/array/EPSArrayInsertBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ValueTypeRules, ArrayCategory) {
	'use strict';

	var ArrayInsertBlock = function () {

		DynamicBlock.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('ArrayIn', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputCategory('Index', Enums.FTypeCategory.fNumerical, 'Integer'),
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

	ArrayInsertBlock.prototype = Object.create(DynamicBlock.prototype);
	ArrayInsertBlock.prototype.constructor = ArrayInsertBlock;

	ArrayInsertBlock.prototype.uid = 'ac561ac8-5693-4033-bd3b-bf4e2142ca20';
	ArrayInsertBlock.prototype.name = 'Array Insert';
	ArrayInsertBlock.prototype.category = ArrayCategory;
	ArrayInsertBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayInsertBlockDoc';

	ArrayInsertBlock.prototype.execute = function () {
		var arrayIn = this.getInputDataPortValue('ArrayIn');
		if (arrayIn === undefined) {
			throw new Error('The data port ArrayIn is undefined!');
		}

		var index = this.getInputDataPortValue('Index');
		if (!(index >= 0 && index <= arrayIn.length)) {
			throw new Error('The data port Index is out of range!');
		}

		var spliceArgs = [];
		spliceArgs.push(index);
		spliceArgs.push(0);

		var inputDataPortNames = this.getInputDataPortNameList();
		var values = [];
		var value;
		for (var i = 2; i < inputDataPortNames.length; i++) {
			value = this.getInputDataPortValue(inputDataPortNames[i]);
			values.push(value);
		}

		Array.prototype.push.apply(spliceArgs, values);
		Array.prototype.splice.apply(arrayIn, spliceArgs);

		this.setOutputDataPortValue('ArrayOut', arrayIn);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayInsertBlock);

	return ArrayInsertBlock;
});
