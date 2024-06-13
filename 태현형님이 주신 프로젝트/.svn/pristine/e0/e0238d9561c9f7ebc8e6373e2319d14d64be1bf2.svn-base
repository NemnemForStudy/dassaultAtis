define('DS/EPSSchematicsCoreLibrary/string/EPSSubStringBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/string/EPSSchematicsCoreLibraryStringCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, StringCategory) {
    'use strict';

    var SubStringBlock = function () {

    	Block.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	this.createDataPorts([
    		new DataPortDefinitions.InputBasic('Input String', 'String', ''),
			new DataPortDefinitions.InputBasic('Start', 'Integer', 0),
			new DataPortDefinitions.InputBasic('Length', 'Integer', -1),
			new DataPortDefinitions.OutputBasic('Output String', 'String')
    	]);
    };

    SubStringBlock.prototype = Object.create(Block.prototype);
    SubStringBlock.prototype.constructor = SubStringBlock;

    SubStringBlock.prototype.uid = '45cffa7d-d92f-44c3-be9e-a960044ff933';
    SubStringBlock.prototype.name = 'Sub String';
    SubStringBlock.prototype.category = StringCategory;
    SubStringBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSSubStringBlockDoc';

    SubStringBlock.prototype.execute = function () {
        var inputString = this.getInputDataPortValue('Input String');
        var start = this.getInputDataPortValue('Start');
        var length = this.getInputDataPortValue('Length');
    	var outputString = '';
    	if (inputString !== undefined && inputString !== null) {
    		outputString = (length > 0) ? inputString.substr(start, length) : inputString.substr(start);
    	}
    	this.setOutputDataPortValue('Output String', outputString);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(SubStringBlock);

    return SubStringBlock;
});
