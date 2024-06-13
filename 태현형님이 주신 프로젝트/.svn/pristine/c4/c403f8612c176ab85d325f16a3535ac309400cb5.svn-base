define('DS/EPSSchematicsCoreLibrary/string/EPSContainsStringBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/string/EPSSchematicsCoreLibraryStringCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, StringCategory) {
	'use strict';

	var ContainsStringBlock = function () {

		Block.call(this);

		this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('True'),
			new ControlPortDefinitions.Output('False')
		]);

		this.createDataPorts([
			new DataPortDefinitions.InputBasic('Input String', 'String', ''),
			new DataPortDefinitions.InputBasic('Searched String', 'String', ''),
			new DataPortDefinitions.InputBasic('From Index', 'Integer', 0),
			new DataPortDefinitions.OutputBasic('Found Index', 'Integer')
		]);
	};

	ContainsStringBlock.prototype = Object.create(Block.prototype);
	ContainsStringBlock.prototype.constructor = ContainsStringBlock;
	ContainsStringBlock.prototype.uid = '467b8c1d-9d76-4405-8dfa-cf03efb74eca';
	ContainsStringBlock.prototype.name = 'Contains String';
	ContainsStringBlock.prototype.category = StringCategory;
	ContainsStringBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSContainsStringBlockDoc';

	ContainsStringBlock.prototype.execute = function () {
		var inputString = this.getInputDataPortValue('Input String');
		var searchedString = this.getInputDataPortValue('Searched String');
		var fromIndex = this.getInputDataPortValue('From Index');
		var result = inputString !== undefined ? inputString.indexOf(searchedString, fromIndex) : -1;
		if (result !== -1) {
			this.activateOutputControlPort('True');
		} else {
			this.activateOutputControlPort('False');
		}
		this.setOutputDataPortValue('Found Index', result);
		return Enums.EExecutionResult.eExecutionFinished;
	};

	BlockLibrary.registerBlock(ContainsStringBlock);

	return ContainsStringBlock;
});
