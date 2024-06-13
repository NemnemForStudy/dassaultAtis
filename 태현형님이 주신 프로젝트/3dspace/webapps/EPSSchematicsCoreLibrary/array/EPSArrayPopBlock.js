define('DS/EPSSchematicsCoreLibrary/array/EPSArrayPopBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArrayPopBlock = function () {

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

	ArrayPopBlock.prototype = Object.create(Block.prototype);
	ArrayPopBlock.prototype.constructor = ArrayPopBlock;
	ArrayPopBlock.prototype.uid = '53cf0941-191e-45df-9c13-1aa14b846efe';
	ArrayPopBlock.prototype.name = 'Array Pop';
	ArrayPopBlock.prototype.category = ArrayCategory;
	ArrayPopBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArrayPopBlockDoc';

	ArrayPopBlock.prototype.execute = function () {
		var arrayIn = this.getInputDataPortValue('ArrayIn');
		if (arrayIn === undefined) {
			throw new Error('The data port ArrayIn is undefined!');
		}

		var value = arrayIn.pop();

		this.setOutputDataPortValue('ArrayOut', arrayIn);
		this.setOutputDataPortValue('Value', value);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArrayPopBlock);

	return ArrayPopBlock;
});
