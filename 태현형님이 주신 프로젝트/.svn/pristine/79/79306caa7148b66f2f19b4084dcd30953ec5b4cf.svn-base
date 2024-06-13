define('DS/EPSSchematicsCoreLibrary/string/EPSSplitStringBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/string/EPSSchematicsCoreLibraryStringCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, StringCategory) {
    'use strict';

    var SplitStringBlock = function () {
        Block.call(this);
        this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
        ]);
        this.createDataPorts([
    		new DataPortDefinitions.InputBasic('Input String', 'String', ''),
			new DataPortDefinitions.InputBasic('Seperator', 'String', ''),
			new DataPortDefinitions.InputBasic('Max Count', 'Integer', undefined),
			new DataPortDefinitions.OutputBasic('Splits', 'Array<String>')
        ]);
    };
    SplitStringBlock.prototype = Object.create(Block.prototype);
    SplitStringBlock.prototype.constructor = SplitStringBlock;
    SplitStringBlock.prototype.uid = '6eae7cc5-3d1e-4c54-9e55-48bba761f9c7';
    SplitStringBlock.prototype.name = 'Split String';
    SplitStringBlock.prototype.category = StringCategory;
	SplitStringBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSSplitStringBlockDoc';

    SplitStringBlock.prototype.execute = function () {
        var inputString = this.getInputDataPortValue('Input String');
        var separator = this.getInputDataPortValue('Seperator');
        var maxCount = this.getInputDataPortValue('Max Count');
        var splits = inputString.split(separator, maxCount);
        this.setOutputDataPortValue('Splits', splits);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(SplitStringBlock);

    return SplitStringBlock;
});
