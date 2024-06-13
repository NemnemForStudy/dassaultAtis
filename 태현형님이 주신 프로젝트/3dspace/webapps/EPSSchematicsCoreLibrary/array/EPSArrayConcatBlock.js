define('DS/EPSSchematicsCoreLibrary/array/EPSArrayConcatBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ValueTypeRules, ArrayCategory) {
	'use strict';

	var ArrayConcatBlock = function () {

		DynamicBlock.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('Array1', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputRef('Array2', dataPortArray),
			new DataPortDefinitions.OutputRef('NewArray', dataPortArray)
		]);

    	this.setDataPortInputRules({
    		name: { prefix: 'Array', readonly: true },
    		valueTypes: new ValueTypeRules.Ref(dataPortArray)
		});

		this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
	};

	ArrayConcatBlock.prototype = Object.create(DynamicBlock.prototype);
	ArrayConcatBlock.prototype.constructor = ArrayConcatBlock;
	ArrayConcatBlock.prototype.uid = '25fe5b1d-8d61-410f-bfd5-f58e7ad01b4e';
	ArrayConcatBlock.prototype.name = 'Array Concat';
	ArrayConcatBlock.prototype.category = ArrayCategory;
	ArrayConcatBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayConcatBlockDoc';

	ArrayConcatBlock.prototype.execute = function () {
		var inputDataPortNames = this.getInputDataPortNameList();
		var arrays = [];
		var array, inputDataPortName;
        for (var i = 0; i < inputDataPortNames.length; i++) {
			inputDataPortName = inputDataPortNames[i];
			array = this.getInputDataPortValue(inputDataPortName);
			if (array === undefined) {
				throw new Error('The data port ' + inputDataPortName + ' is undefined!');
			}
            arrays.push(array);
		}

		var newArray = Array.prototype.concat.apply([], arrays);

		this.setOutputDataPortValue('NewArray', newArray);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayConcatBlock);

	return ArrayConcatBlock;
});
