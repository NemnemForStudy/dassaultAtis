define('DS/EPSSchematicsCoreLibrary/array/EPSArrayIndexOfBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayIndexOfBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('Array', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputRefArrayValue('Value', dataPortArray),
			new DataPortDefinitions.OutputBasic('Index', 'Integer')
		]);
	};

	ArrayIndexOfBlock.prototype = Object.create(Block.prototype);
	ArrayIndexOfBlock.prototype.constructor = ArrayIndexOfBlock;

	ArrayIndexOfBlock.prototype.uid = '9d3215a7-64c9-4904-9801-151a5c25d59a';
	ArrayIndexOfBlock.prototype.name = 'Array IndexOf';
	ArrayIndexOfBlock.prototype.category = ArrayCategory;
	ArrayIndexOfBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayIndexOfBlockDoc';

	ArrayIndexOfBlock.prototype.execute = function () {
		var array = this.getInputDataPortValue('Array');
		if (array === undefined) {
			throw new Error('The data port Array is undefined!');
		}

		var value = this.getInputDataPortValue('Value');
		if (value === undefined) {
			throw new Error('The data port Value is undefined!');
		}

		var index = array.indexOf(value);

		this.setOutputDataPortValue('Index', index);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayIndexOfBlock);

	return ArrayIndexOfBlock;
});
