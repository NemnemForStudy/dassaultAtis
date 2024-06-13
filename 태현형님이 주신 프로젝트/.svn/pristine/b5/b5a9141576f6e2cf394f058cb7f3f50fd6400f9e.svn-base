define('DS/EPSSchematicsCoreLibrary/array/EPSArrayRemoveBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayRemoveBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('ArrayIn', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputCategory('Index', Enums.FTypeCategory.fNumerical, 'Integer'),
			new DataPortDefinitions.OutputRef('ArrayOut', dataPortArray),
			new DataPortDefinitions.OutputRefArrayValue('Value', dataPortArray)
		]);
	};

	ArrayRemoveBlock.prototype = Object.create(Block.prototype);
	ArrayRemoveBlock.prototype.constructor = ArrayRemoveBlock;

	ArrayRemoveBlock.prototype.uid = '7c16a8ff-8499-44a2-8454-e50ad020a852';
	ArrayRemoveBlock.prototype.name = 'Array Remove';
	ArrayRemoveBlock.prototype.category = ArrayCategory;
	ArrayRemoveBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayRemoveBlockDoc';

	ArrayRemoveBlock.prototype.execute = function () {
		var arrayIn = this.getInputDataPortValue('ArrayIn');
		if (arrayIn === undefined) {
			throw new Error('The data port ArrayIn is undefined!');
		}

		var index = this.getInputDataPortValue('Index');
		if (!(index >= 0 && index < arrayIn.length)) {
			throw new Error('The data port Index is out of range!');
		}

		var value = arrayIn.splice(index, 1)[0];

		this.setOutputDataPortValue('ArrayOut', arrayIn);
		this.setOutputDataPortValue('Value', value);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayRemoveBlock);

	return ArrayRemoveBlock;
});
