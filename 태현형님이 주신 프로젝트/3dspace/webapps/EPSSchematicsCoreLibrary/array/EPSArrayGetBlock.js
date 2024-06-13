define('DS/EPSSchematicsCoreLibrary/array/EPSArrayGetBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayGetBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('Array', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputCategory('Index', Enums.FTypeCategory.fNumerical, 'Integer'),
			new DataPortDefinitions.OutputRefArrayValue('Value', dataPortArray)
		]);
	};

	ArrayGetBlock.prototype = Object.create(Block.prototype);
	ArrayGetBlock.prototype.constructor = ArrayGetBlock;

	ArrayGetBlock.prototype.uid = '12fd7927-760f-49ce-8db8-4989c2c21d79';
	ArrayGetBlock.prototype.name = 'Array Get';
	ArrayGetBlock.prototype.category = ArrayCategory;
	ArrayGetBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayGetBlockDoc';

	ArrayGetBlock.prototype.execute = function () {
		var array = this.getInputDataPortValue('Array');
		if (array === undefined) {
			throw new Error('The data port Array is undefined!');
		}

		var index = this.getInputDataPortValue('Index');
		if (!(index >= 0 && index < array.length)) {
			throw new Error('The data port Index is out of range!');
		}

		var value = array[index];

		this.setOutputDataPortValue('Value', value);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayGetBlock);

	return ArrayGetBlock;
});
