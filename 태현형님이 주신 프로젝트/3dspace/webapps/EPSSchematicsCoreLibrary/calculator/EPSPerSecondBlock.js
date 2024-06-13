define('DS/EPSSchematicsCoreLibrary/calculator/EPSPerSecondBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CalculatorCategory) {
    'use strict';

    var PerSecondBlock = function () {

    	Block.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	this.createDataPorts([
			new DataPortDefinitions.InputBasic('Input', 'Double', 1.0),
			new DataPortDefinitions.OutputBasic('Output', 'Double')
    	]);
    };

    PerSecondBlock.prototype = Object.create(Block.prototype);
    PerSecondBlock.prototype.constructor = PerSecondBlock;

    PerSecondBlock.prototype.uid = '33272ee5-babf-4b5c-9b89-8a83d5946d06';
    PerSecondBlock.prototype.name = 'Per Second';
    PerSecondBlock.prototype.category = CalculatorCategory;
    PerSecondBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSPerSecondBlockDoc';

    PerSecondBlock.prototype.execute = function (runParams) {
        var input = this.getInputDataPortValue('Input');
    	var output = input * runParams.deltaTime * 0.001;
    	this.setOutputDataPortValue('Output', output);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(PerSecondBlock);

    return PerSecondBlock;
});
