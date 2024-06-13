define('DS/EPSSchematicsCoreLibrary/array/EPSArrayIteratorBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayIteratorBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Input('Loop In'),
			new ControlPortDefinitions.Output('Out'),
			new ControlPortDefinitions.Output('Loop Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('Array', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputBasic('Start Index', 'Integer', 0),
			new DataPortDefinitions.InputBasic('End Index', 'Integer', undefined),
			new DataPortDefinitions.OutputBasic('Index', 'Integer'),
			new DataPortDefinitions.OutputRefArrayValue('Value', dataPortArray)
		]);
	};

	ArrayIteratorBlock.prototype = Object.create(Block.prototype);
	ArrayIteratorBlock.prototype.constructor = ArrayIteratorBlock;
	ArrayIteratorBlock.prototype.uid = 'f8ab03aa-a92e-4bfe-a01e-3630147a8eeb';
	ArrayIteratorBlock.prototype.name = 'Array Iterator';
	ArrayIteratorBlock.prototype.category = ArrayCategory;
	ArrayIteratorBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayIteratorBlockDoc';

	ArrayIteratorBlock.prototype.execute = function () {
		var array = this.getInputDataPortValue('Array');
		var startIndex = this.getInputDataPortValue('Start Index');
		var endIndex = this.getInputDataPortValue('End Index');
		var value;

		if (array === undefined) {
			throw new Error('The array is undefined!');
		} else if (startIndex < 0 || startIndex >= array.length || endIndex < 0 || endIndex > array.length) {
			throw new Error('The indexes are out of range!');
		}

		this.data.index = this.isInputControlPortActivated('In') ? startIndex : this.data.index + 1;
		if (this.data.index >= endIndex || this.data.index >= array.length) {
			this.activateOutputControlPort('Out');
		} else {
			value = array[this.data.index];
			this.activateOutputControlPort('Loop Out');
		}

		this.setOutputDataPortValue('Value', value);
		this.setOutputDataPortValue('Index', this.data.index);
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayIteratorBlock);

	return ArrayIteratorBlock;
});
