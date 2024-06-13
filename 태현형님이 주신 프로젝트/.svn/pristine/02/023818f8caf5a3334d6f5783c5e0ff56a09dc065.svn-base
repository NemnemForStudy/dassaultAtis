/* eslint-disable no-console */
define('DS/EPSSchematicsCoreLibrary/debug/EPSLogBlock', [
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

    var LogBlock = function () {

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

    LogBlock.prototype = Object.create(DynamicBlock.prototype);
    LogBlock.prototype.constructor = LogBlock;

    LogBlock.prototype.uid = 'a2c886c6-64fd-4a1d-a02f-fbba81c3e080';
    LogBlock.prototype.name = 'Log';
    LogBlock.prototype.category = DebugCategory;
    LogBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSLogBlockDoc';

    LogBlock.prototype.execute = function () {
    	var inputDataPortNames = this.getInputDataPortNameList();
    	var values = [];
    	for (var i = 0; i < inputDataPortNames.length; i++) {
    		values.push(this.getInputDataPortValue(inputDataPortNames[i]));
    	}
        var severity = this.getSettingValue('Severity');
        switch (severity) {
    		case ESeverity.eInfo:
    			console.info.apply(undefined, values);
    			break;
    		case ESeverity.eWarning:
    			console.warn.apply(undefined, values);
    			break;
    		case ESeverity.eDebug:
    			console.debug.apply(undefined, values);
    			break;
    		case ESeverity.eError:
    			console.error.apply(undefined, values);
				break;
			case ESeverity.eSuccess:
				console.log.apply(undefined, values);
				break;
    	}
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(LogBlock);

    return LogBlock;
});
