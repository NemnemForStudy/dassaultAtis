define('DS/EPSSchematicsCoreLibrary/debug/EPSPrintBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
	'DS/EPSSchematicsCoreLibrary/EPSESeverityType',
    'DS/EPSSchematicsCoreLibrary/debug/EPSSchematicsCoreLibraryDebugCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, SettingDefinitions, ValueTypeRules, ESeverity, DebugCategory) {
    'use strict';

    var PrintBlock = function () {

    	DynamicBlock.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

		this.createDataPort(new DataPortDefinitions.InputAll('Value1', 'String', { 'String': 'Hello World!' }));

    	this.createSetting(new SettingDefinitions.Basic('Severity', 'ESeverity', ESeverity.eInfo));

    	this.setDataPortInputRules({
    		name: { prefix: 'Value', readonly: true },
    		valueTypes: new ValueTypeRules.All('String')
    	});

		this.setDataPortOutputRules({ dynamicCount: 0 });
		this.setDataPortLocalRules({ dynamicCount: 0 });
    	this.setControlPortInputRules({ dynamicCount: 0 });
    	this.setControlPortOutputRules({ dynamicCount: 0 });
    	this.setEventPortInputRules({ dynamicCount: 0 });
		this.setEventPortOutputRules({ dynamicCount: 0 });
		this.setSettingRules({ dynamicCount: 0 });
    };

    PrintBlock.prototype = Object.create(DynamicBlock.prototype);
    PrintBlock.prototype.constructor = PrintBlock;

    PrintBlock.prototype.uid = 'ce0a713f-6ada-4db0-b608-5f138579b668';
    PrintBlock.prototype.name = 'Print';
    PrintBlock.prototype.category = DebugCategory;
    PrintBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSPrintBlockDoc';

    PrintBlock.prototype.execute = function () {
    	var inputDataPortNames = this.getInputDataPortNameList();
    	var printArgs = [];
    	for (var i = 0; i < inputDataPortNames.length; i++) {
    		printArgs.push(this.getInputDataPortValue(inputDataPortNames[i]));
		}

		var severity = this.getSettingValue('Severity');
		printArgs.unshift(severity);

		this.print.apply(this, printArgs);

    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(PrintBlock);

    return PrintBlock;
});
