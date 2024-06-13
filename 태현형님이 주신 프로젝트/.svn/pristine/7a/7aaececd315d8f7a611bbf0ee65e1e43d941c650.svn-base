define('DS/EPSSchematicsCoreLibrary/flow/EPSIfBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/flow/EPSSchematicsCoreLibraryFlowCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, FlowCategory) {
    'use strict';

    var IfBlock = function () {

    	Block.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('True'),
			new ControlPortDefinitions.Output('False')
    	]);

    	this.createDataPort(new DataPortDefinitions.InputBasic('Condition', 'Boolean', false));
    };

    IfBlock.prototype = Object.create(Block.prototype);
    IfBlock.prototype.constructor = IfBlock;

    IfBlock.prototype.uid = '6f0fb6a2-c669-4825-9c64-fc9e8a268e79';
    IfBlock.prototype.name = 'If';
    IfBlock.prototype.category = FlowCategory;
    IfBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSIfBlockDoc';

    IfBlock.prototype.execute = function () {
        var condition = this.getInputDataPortValue('Condition');
    	this.activateOutputControlPort(condition ? 'True' : 'False');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(IfBlock);

    return IfBlock;
});
