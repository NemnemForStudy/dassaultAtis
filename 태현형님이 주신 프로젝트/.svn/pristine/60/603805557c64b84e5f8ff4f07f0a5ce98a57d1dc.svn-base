define('DS/EPSSchematicsCoreLibrary/calculator/EPSCompareBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CalculatorCategory) {
    'use strict';

    var CompareBlock = function () {

    	Block.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Equal'),
			new ControlPortDefinitions.Output('Greater'),
			new ControlPortDefinitions.Output('Lesser')
    	]);

    	var dataPortValue1 = this.createDataPort(new DataPortDefinitions.InputList('Value1', ['Double', 'Integer'], 'Double', {
            'Double': 0.0,
            'Integer': 0
        }));

    	this.createDataPort(new DataPortDefinitions.InputRef('Value2', dataPortValue1, {
			'Double': 0.0,
			'Integer': 0
		}));
    };

    CompareBlock.prototype = Object.create(Block.prototype);
    CompareBlock.prototype.constructor = CompareBlock;

    CompareBlock.prototype.uid = 'f0e74e29-3829-4744-82f7-acb12bd3bc7f';
    CompareBlock.prototype.name = 'Compare';
    CompareBlock.prototype.category = CalculatorCategory;
    CompareBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSCompareBlockDoc';

    CompareBlock.prototype.execute = function () {
        var value1 = this.getInputDataPortValue('Value1');
        var value2 = this.getInputDataPortValue('Value2');
        if (value1 === value2) {
            this.activateOutputControlPort('Equal');
    	} else if (value1 > value2) {
    	    this.activateOutputControlPort('Greater');
    	} else {
    	    this.activateOutputControlPort('Lesser');
    	}
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(CompareBlock);

    return CompareBlock;
});
