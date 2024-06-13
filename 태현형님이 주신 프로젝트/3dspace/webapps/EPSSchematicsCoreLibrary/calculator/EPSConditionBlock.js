define('DS/EPSSchematicsCoreLibrary/calculator/EPSConditionBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsDynamicBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsEvents',
    'DS/EPSSchematicsCoreLibrary/calculator/EPSSchematicsCoreLibraryCalculatorCategory'
], function (DynamicBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, SettingDefinitions, Events, CalculatorCategory) {
    'use strict';

    var ConditionBlock = function () {
        DynamicBlock.call(this);

        this.createControlPorts([
            new ControlPortDefinitions.Input('In'),
            new ControlPortDefinitions.Output('True'),
            new ControlPortDefinitions.Output('False')
        ]);

        this.createDataPort(new DataPortDefinitions.InputAll('Value1', 'Double', {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

        this.createDataPort(new DataPortDefinitions.InputAll('Value2', 'Double', {
			'Boolean': false,
			'Double': 0.0,
			'Integer': 0,
			'String': ''
		}));

        this.setDataPortInputRules({
            name: { prefix: 'Value', readonly: true }
        });

        this.setDataPortOutputRules({ dynamicCount: 0 });
        this.setDataPortLocalRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
        this.setEventPortOutputRules({ dynamicCount: 0 });
        this.setSettingRules({ dynamicCount: 0 });

        var setting = this.createSetting(new SettingDefinitions.Basic('Expression', 'String', 'Value1 === Value2'));
        setting.addListener(Events.SettingValueChangeEvent, this.onSettingChange.bind(this));

        this.onSettingChange();
    };

    ConditionBlock.prototype = Object.create(DynamicBlock.prototype);
    ConditionBlock.prototype.constructor = ConditionBlock;
    ConditionBlock.prototype.uid = 'cc1fbcb5-5645-4b9d-b680-644f0d09db2d';
    ConditionBlock.prototype.name = 'Condition';
    ConditionBlock.prototype.category = CalculatorCategory;
    ConditionBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSConditionBlockDoc';

    var isQuoted = function (quotes, startIndex, endIndex) {
        for (var q = 0; q < quotes.length; q++) {
            var quote = quotes[q];
            if (startIndex > quote.startIndex && endIndex < quote.endIndex) {
                return true;
            }
        }
        return false;
    };

    ConditionBlock.prototype.computeExpression = function () {
        var result = false;
        var expression = this.getSettingByName('Expression').getValue();
        if (expression !== '') {
            // Find single and double quotes indices
            // var quotePattern = new RegExp(/'((?:\\.|[^'])*)'|"((?:\\.|[^"])*)"/, 'igm');
            // RegExp compatible with ES5
            var quotePattern = new RegExp('\'((?:\\\\.|[^\'])*)\'|"((?:\\\\.|[^"])*)"', 'igm');
            var quoteMatch;
            var quotes = [];
            while (null !== (quoteMatch = quotePattern.exec(expression))) {
                quotes.push({
                    startIndex: quoteMatch.index,
                    endIndex: quotePattern.lastIndex
                });
            }

            // Replace only unquoted values
            // var valuePattern = new RegExp(/Value\d+/, 'g');
            // RegExp compatible with ES5
            var valuePattern = new RegExp('Value\\d+', 'g');
            expression = expression.replace(valuePattern, function (match, index) {
                var res = match;
                if (!isQuoted(quotes, index, index + match.length)) {
                    res = 'this.getInputDataPortValue("' + match + '")';
                }
                return res;
            });
            result = expression;
        }
        return result;
    };

    ConditionBlock.prototype.onSettingChange = function () {
        // Initialize the execution script
        var executionScript = '(function (runParams) {\n';
        var expression = this.computeExpression();
        executionScript += 'this.activateOutputControlPort(' + expression + ' ? \'True\' : \'False\');';

        // Function return
        executionScript += 'return Enums.EExecutionResult.eExecutionFinished;\n';
        executionScript += '});';

        // Evaluate to get execute function
        try {
            this.execute = eval(executionScript); // eslint-disable-line
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            this.execute = function () {
                return Enums.EExecutionResult.eExecutionError;
            };
        }
    };

    BlockLibrary.registerBlock(ConditionBlock);
    return ConditionBlock;
});
