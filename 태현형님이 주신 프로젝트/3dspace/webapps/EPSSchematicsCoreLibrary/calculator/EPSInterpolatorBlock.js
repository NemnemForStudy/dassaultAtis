define('DS/EPSSchematicsCoreLibrary/calculator/EPSInterpolatorBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CalculatorCategory) {
    'use strict';

    var InterpolatorBlock = function () {

    	Block.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	var dataPortValue1 = this.createDataPort(new DataPortDefinitions.InputList('Value1', ['Double', 'Integer'], 'Double', {
            'Double': 0.0,
            'Integer': 0
        }));

    	this.createDataPorts([
			new DataPortDefinitions.InputRef('Value2', dataPortValue1, {
				'Double': 1.0,
				'Integer': 1
			}),
			new DataPortDefinitions.InputBasic('Alpha', 'Double', 0.0),
			new DataPortDefinitions.OutputRef('Result', dataPortValue1)
    	]);
    };

    InterpolatorBlock.prototype = Object.create(Block.prototype);
    InterpolatorBlock.prototype.constructor = InterpolatorBlock;

    InterpolatorBlock.prototype.uid = '32c42e7d-53bc-4119-bdfe-b1fff627a1c8';
    InterpolatorBlock.prototype.name = 'Interpolator';
    InterpolatorBlock.prototype.category = CalculatorCategory;
    InterpolatorBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSInterpolatorBlockDoc';

    InterpolatorBlock.prototype.execute = function () {
        var value1 = this.getInputDataPortValue('Value1');
        var value2 = this.getInputDataPortValue('Value2');
        var alpha = this.getInputDataPortValue('Alpha');
    	var result = 0;
    	if (value1 < value2) {
    		result = value1 + (value2 - value1) * alpha;
    	} else if (value1 > value2) {
    		result = value1 - (value1 - value2) * alpha;
    	} else {
    		result = value1;
    	}
    	result = this.getInputDataPortValueType('Value1') === 'Integer' ? Math.round(result) : result;
    	this.setOutputDataPortValue('Result', result);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(InterpolatorBlock);

    return InterpolatorBlock;
});
