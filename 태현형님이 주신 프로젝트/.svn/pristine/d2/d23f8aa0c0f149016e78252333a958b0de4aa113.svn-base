define('DS/EPSSchematicsCoreLibrary/calculator/EPSRandomBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CalculatorCategory) {
    'use strict';

    var RandomBlock = function () {

    	Block.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	var dataPortMin = this.createDataPort(new DataPortDefinitions.InputList('Min', ['Double', 'Integer'], 'Double', {
            'Double': 0.0,
            'Integer': 0
        }));

    	this.createDataPorts([
			new DataPortDefinitions.InputRef('Max', dataPortMin, {
				'Double': 1.0,
				'Integer': 1
			}),
			new DataPortDefinitions.OutputRef('Result', dataPortMin)
    	]);
    };

    RandomBlock.prototype = Object.create(Block.prototype);
    RandomBlock.prototype.constructor = RandomBlock;

    RandomBlock.prototype.uid = 'efe981bf-908b-4a50-a09c-42f1bf9227ce';
    RandomBlock.prototype.name = 'Random';
    RandomBlock.prototype.category = CalculatorCategory;
    RandomBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSRandomBlockDoc';

    RandomBlock.prototype.execute = function () {
        var min = this.getInputDataPortValue('Min');
        var max = this.getInputDataPortValue('Max');
        var isInteger = this.getInputDataPortValueType('Min') === 'Integer';
        var result = isInteger ? Math.floor(Math.random() * (max - min + 1)) + min : Math.random() * (max - min) + min;
    	this.setOutputDataPortValue('Result', result);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(RandomBlock);

    return RandomBlock;
});
