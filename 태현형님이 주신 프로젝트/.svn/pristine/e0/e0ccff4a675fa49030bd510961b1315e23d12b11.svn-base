define('DS/EPSSchematicsCoreLibrary/array/EPSArrayShiftBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayShiftBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('ArrayIn', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.OutputRef('ArrayOut', dataPortArray),
			new DataPortDefinitions.OutputRefArrayValue('Value', dataPortArray)
		]);
	};

	ArrayShiftBlock.prototype = Object.create(Block.prototype);
	ArrayShiftBlock.prototype.constructor = ArrayShiftBlock;
	ArrayShiftBlock.prototype.uid = '1ac864ff-9ffd-498c-bcb4-ea117ebb10c7';
	ArrayShiftBlock.prototype.name = 'Array Shift';
	ArrayShiftBlock.prototype.category = ArrayCategory;
	ArrayShiftBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayShiftBlockDoc';

	ArrayShiftBlock.prototype.execute = function () {
		var arrayIn = this.getInputDataPortValue('ArrayIn');
		if (arrayIn === undefined) {
			throw new Error('The data port ArrayIn is undefined!');
		}

		var value = arrayIn.shift();

		this.setOutputDataPortValue('ArrayOut', arrayIn);
		this.setOutputDataPortValue('Value', value);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayShiftBlock);

	return ArrayShiftBlock;
});
