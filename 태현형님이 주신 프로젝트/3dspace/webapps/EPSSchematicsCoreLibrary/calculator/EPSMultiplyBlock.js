define('DS/EPSSchematicsCoreLibrary/calculator/EPSMultiplyBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsValueTypeRules',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, ValueTypeRules, CalculatorCategory) {
    'use strict';

    var MultiplyBlock = function () {

        DynamicBlock.call(this);

        this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
        ]);

        var dataPortValue1 = this.createDataPort(new DataPortDefinitions.InputCategory('Value1', Enums.FTypeCategory.fNumerical, 'Double', {
            'Double': 0.0,
            'Integer': 0
        }));

        this.createDataPorts([
            new DataPortDefinitions.InputRef('Value2', dataPortValue1, {
				'Double': 0.0,
				'Integer': 0
			}),
            new DataPortDefinitions.OutputRef('Result', dataPortValue1)
        ]);

        this.setDataPortInputRules({
            name: { prefix: 'Value', readonly: true },
            valueTypes: new ValueTypeRules.Ref(dataPortValue1, {
				'Double': 0.0,
				'Integer': 0
            })
        });

        this.setDataPortOutputRules({ dynamicCount: 0 });
        this.setDataPortLocalRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
        this.setEventPortOutputRules({ dynamicCount: 0 });
        this.setSettingRules({ dynamicCount: 0 });
    };

    MultiplyBlock.prototype = Object.create(DynamicBlock.prototype);
    MultiplyBlock.prototype.constructor = MultiplyBlock;
    MultiplyBlock.prototype.uid = '74311df0-1313-4447-b6cf-e0a5f981f916';
    MultiplyBlock.prototype.name = 'Multiply';
    MultiplyBlock.prototype.category = CalculatorCategory;
    MultiplyBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSMultiplyBlockDoc';

    MultiplyBlock.prototype.execute = function () {
        var inputDataPortNames = this.getInputDataPortNameList();
        var result = this.getInputDataPortValue(inputDataPortNames[0]);
        for (var i = 1; i < inputDataPortNames.length; i++) {
            result *= this.getInputDataPortValue(inputDataPortNames[i]);
        }
        this.setOutputDataPortValue('Result', result);
        this.activateOutputControlPort('Out');
        return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(MultiplyBlock);

    return MultiplyBlock;
});
