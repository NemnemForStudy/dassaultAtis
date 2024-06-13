define('DS/EPSSchematicsCSI/EPSSchematicsCSIJavaScriptBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCSI/EPSSchematicsCSICategory',
    'DS/EPSSchematicsCSI/EPSSchematicsCSITools'
], function (ScriptBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CSICategory, CSITools) {
    'use strict';

    var CSIJavaScriptBlock = function () {

        ScriptBlock.call(this);

        this.createControlPorts([
            new ControlPortDefinitions.Input('Call'),
            new ControlPortDefinitions.Output('Success'),
            new ControlPortDefinitions.Output('Progress'),
            new ControlPortDefinitions.Output('Error')
        ]);

        this.createDataPorts([
            new DataPortDefinitions.InputAdvanced('Call', Enums.FTypeCategory.fObject, ['Object']),
            new DataPortDefinitions.OutputAdvanced('Success', Enums.FTypeCategory.fObject, ['Object']),
            new DataPortDefinitions.OutputAdvanced('Progress', Enums.FTypeCategory.fObject, ['Object']),
            new DataPortDefinitions.OutputAdvanced('Error', Enums.FTypeCategory.fObject, ['Object'])
        ]);

        this.setDataPortInputRules({ dynamicCount: 0 });
        this.setDataPortOutputRules({ dynamicCount: 0 });
        this.setDataPortLocalRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
        this.setEventPortOutputRules({ dynamicCount: 0 });
        this.setSettingRules({ dynamicCount: 0 });

        this.activateNodeIdSelector();

        this.setScriptLanguage(Enums.EScriptLanguage.eJavaScript);
        this.setScriptContent(
        '/**\n' +
        ' * @param {Object} input\n' +
        ' * @param {Object} origin\n' +
        ' * @param {function(Object)} origin.answerSuccess\n' +
        ' * @param {function(Object)} origin.answerProgress\n' +
        ' * @param {function(Object)} origin.answerError\n' +
        ' * @param {function(): boolean} origin.isInterrupted\n' +
        ' */\n' +
        'function onCall(input, origin) {\n' +
        '  \'use strict\';\n' +
        '\n' +
        '  if (origin.isInterrupted())\n' +
        '    return origin.answerError({ errorCode: 499, error: \'Function was interrupted\' });\n' +
        '\n' +
        '  // insert your code here\n' +
        '\n' +
        '  return origin.answerSuccess({});\n' +
        '}');
    };

    CSIJavaScriptBlock.prototype = Object.create(ScriptBlock.prototype);
    CSIJavaScriptBlock.prototype.constructor = CSIJavaScriptBlock;
    CSIJavaScriptBlock.prototype.uid = '007c6736-9ce5-47ee-b6dd-a90fb726f2a8';
    CSIJavaScriptBlock.prototype.name = 'CSI JavaScript';
    CSIJavaScriptBlock.prototype.category = CSICategory;
    CSIJavaScriptBlock.prototype.documentation = 'text!DS/EPSSchematicsCSI/assets/EPSSchematicsCSIJavaScriptBlockDoc.json';

    /**
	 * Is exportable.
	 *
	 * @private
	 * @return {boolean}
	 */
	CSIJavaScriptBlock.prototype.isExportable = function () {
		return true;
	};

	/**
	 * Export content.
	 *
	 * @private
	 * @return {string}
	 */
	CSIJavaScriptBlock.prototype.exportContent = function () {
        var csiFunction = {};
        csiFunction.grammarVersion = 3;
        csiFunction.implementation = {};
        csiFunction.implementation.name = 'ecmaScript';
        csiFunction.implementation.version = 1;
        csiFunction.implementation.settings = {};
        csiFunction.implementation.settings.script = this.getScriptContent();
        csiFunction.desc = this.getDescription() || 'Specify here the description of this function implemented in JavaScript';
        csiFunction.onCall = {};
        csiFunction.onCall.in = CSITools.getCSISignatureFromDataPort(this.getDataPortByName('Call'));
        csiFunction.onCall.out = CSITools.getCSISignatureFromDataPort(this.getDataPortByName('Success'));
        csiFunction.progress = CSITools.getCSISignatureFromDataPort(this.getDataPortByName('Progress'));
        csiFunction.throwError = CSITools.getCSISignatureFromDataPort(this.getDataPortByName('Error'));
        return JSON.stringify(csiFunction, undefined, 2);
    };
    
    var toPascalCase = function (iString) {
		var pascalCaseString = iString.replace(/[^a-zA-Z0-9]+(.)/g, function(match, char) {
			return char.toUpperCase();
		});
		return pascalCaseString;
    };
    
    var isUpperCase = function (iString) {
        var result = iString === iString.toUpperCase();
        result = result && iString !== iString.toLowerCase();
        return result;
    };

    var toCamelCase = function (iString) {
        var pascalCaseString = toPascalCase(iString);
        var i = 0;
        while (isUpperCase(pascalCaseString[i])) {
            i++;
        }
        var camelCaseString = pascalCaseString.substring(0, Math.max(1, i - 1)).toLowerCase() + pascalCaseString.substring(Math.max(1, i - 1));
        return camelCaseString;
    };

	/**
	 * Export file name.
	 *
	 * @private
	 * @return {string}
	 */
	CSIJavaScriptBlock.prototype.exportFileName = function () {
        var blockName = this.getName();
        var functionName = blockName.replace(/_v[0-9]+$/, '');
        var matchFunctionVersion = blockName.match(/_v[0-9]+$/);
        var functionVersion = matchFunctionVersion !== null ? matchFunctionVersion[0] : '_v1';
        var functionCamelCaseName = toCamelCase(functionName);
		var functionFileName = functionCamelCaseName + functionVersion + '.json';
		return functionFileName;
	};

    BlockLibrary.registerBlock(CSIJavaScriptBlock);

    return CSIJavaScriptBlock;
});
