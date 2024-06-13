define('DS/EPSSchematicsCoreLibrary/string/EPSConcatStringBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
    'DS/EPSSchematicsCoreLibrary/string/EPSSchematicsCoreLibraryStringCategory'
], function (
    BlockLibrary,
    DynamicBlock,
    ControlPortDefinitions,
    DataPortDefinitions,
    Enums,
    SettingDefinitions,
    ValueTypeRules,
    StringCategory) {
    'use strict';

    var ConcatStringBlock = function () {
    	DynamicBlock.call(this);

    	this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
    	]);

        this.createDataPorts([
            new DataPortDefinitions.InputBasic('Value1', 'String', ''),
            new DataPortDefinitions.InputBasic('Value2', 'String', '')
        ]);
        this.setDataPortInputRules({
            name: { prefix: 'Value', readonly: true },
            valueTypes: new ValueTypeRules.Basic('String', '')
        });

        this.createDataPort(new DataPortDefinitions.OutputBasic('Output String', 'String'));

        this.createSetting(new SettingDefinitions.Basic('Separator', 'String', ''));

        this.setDataPortOutputRules({ dynamicCount: 0 });
        this.setDataPortLocalRules({ dynamicCount: 0 });
    	this.setControlPortInputRules({ dynamicCount: 0 });
    	this.setControlPortOutputRules({ dynamicCount: 0 });
    	this.setEventPortInputRules({ dynamicCount: 0 });
        this.setEventPortOutputRules({ dynamicCount: 0 });
        this.setSettingRules({ dynamicCount: 0 });
    };

    ConcatStringBlock.prototype = Object.create(DynamicBlock.prototype);
    ConcatStringBlock.prototype.constructor = ConcatStringBlock;

    ConcatStringBlock.prototype.uid = '25ecb466-9d4e-4116-9d5d-b215f3e75419';
    ConcatStringBlock.prototype.name = 'Concat String';
    ConcatStringBlock.prototype.category = StringCategory;
    ConcatStringBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSConcatStringBlockDoc';

    ConcatStringBlock.prototype.execute = function () {
        var separator = this.getSettingValue('Separator');
        var result = '';
    	var inputDataPortNames = this.getInputDataPortNameList();
    	for (var i = 0; i < inputDataPortNames.length; i++) {
            result += this.getInputDataPortValue(inputDataPortNames[i]);
            if (i + 1 < inputDataPortNames.length) {
                result += separator;
            }
        }
        this.setOutputDataPortValue('Output String', result);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(ConcatStringBlock);

    return ConcatStringBlock;
});
