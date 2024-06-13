define('DS/EPSSchematicsCoreLibrary/array/EPSArraySetBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/array/EPSSchematicsCoreLibraryArrayCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ArrayCategory) {
	'use strict';

	var ArraySetBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
		]);

		var dataPortArray = this.createDataPort(new DataPortDefinitions.InputCategory('ArrayIn', Enums.FTypeCategory.fArray, 'Array<Double>'));
		this.createDataPorts([
			new DataPortDefinitions.InputCategory('Index', Enums.FTypeCategory.fNumerical, 'Integer'),
			new DataPortDefinitions.InputRefArrayValue('Value', dataPortArray, {
				'Boolean': false,
				'Double': 0.0,
				'Integer': 0,
				'String': ''
			}),
			new DataPortDefinitions.OutputRef('ArrayOut', dataPortArray)
		]);
	};

	ArraySetBlock.prototype = Object.create(Block.prototype);
	ArraySetBlock.prototype.constructor = ArraySetBlock;

	ArraySetBlock.prototype.uid = '140a891f-a5f1-4e61-ab8e-7cb7ee85ed7e';
	ArraySetBlock.prototype.name = 'Array Set';
	ArraySetBlock.prototype.category = ArrayCategory;
	ArraySetBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSArraySetBlockDoc';

	ArraySetBlock.prototype.execute = function () {
		var arrayIn = this.getInputDataPortValue('ArrayIn');
		if (arrayIn === undefined) {
			throw new Error('The data port ArrayIn is undefined!');
		}

		var index = this.getInputDataPortValue('Index');
		if (!(index >= 0 && index < arrayIn.length)) {
			throw new Error('The data port Index is out of range!');
		}

		var value = this.getInputDataPortValue('Value');
		arrayIn[index] = value;

		this.setOutputDataPortValue('ArrayOut', arrayIn);

		this.activateOutputControlPort('Out');
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ArraySetBlock);

	return ArraySetBlock;
});
