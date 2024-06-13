define('DS/EPSSchematicsCoreLibrary/array/EPSArrayLengthBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayLengthBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		this.createDataPorts([
			new DataPortDefinitions.InputCategory('Array', Enums.FTypeCategory.fArray, 'Array<Double>'),
			new DataPortDefinitions.OutputCategory('Length', Enums.FTypeCategory.fNumerical, 'Integer')
		]);
	};

	ArrayLengthBlock.prototype = Object.create(Block.prototype);
	ArrayLengthBlock.prototype.constructor = ArrayLengthBlock;
	ArrayLengthBlock.prototype.uid = 'd0aa786c-e50a-4428-84b3-e4fd487db7ae';
	ArrayLengthBlock.prototype.name = 'Array Length';
	ArrayLengthBlock.prototype.category = ArrayCategory;
	ArrayLengthBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayLengthBlockDoc';

	ArrayLengthBlock.prototype.execute = function () {
		var array = this.getInputDataPortValue('Array');
		if (array === undefined) {
			throw new Error('The data port Array is undefined!');
		}

		this.setOutputDataPortValue('Length', array.length);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayLengthBlock);

	return ArrayLengthBlock;
});
