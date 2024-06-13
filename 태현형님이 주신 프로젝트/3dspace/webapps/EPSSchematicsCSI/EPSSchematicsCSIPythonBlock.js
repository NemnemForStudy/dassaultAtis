define('DS/EPSSchematicsCSI/EPSSchematicsCSIPythonBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCSI/EPSSchematicsCSICategory',
    'DS/EPSSchematicsCSI/EPSSchematicsCSITools'
], function (ScriptBlock, Enums, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, CSICategory, CSITools) {
    'use strict';

    var CSIPythonBlock = function () {

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

        this.setScriptLanguage(Enums.EScriptLanguage.ePython);
        this.setScriptContent(
        'def onCall(input, origin):\n' +
        '  if origin.isInterrupted():\n' +
        '    return origin.answerError({ \'errorCode\': 499, \'error\': \'Function was interrupted\' })\n' +
        '\n' +
        '  # insert your code here\n' +
        '\n' +
        '  return origin.answerSuccess({})\n');
    };

    CSIPythonBlock.prototype = Object.create(ScriptBlock.prototype);
    CSIPythonBlock.prototype.constructor = CSIPythonBlock;
    CSIPythonBlock.prototype.uid = 'f17d86a9-8137-4d34-a30b-5737f77850e2';
    CSIPythonBlock.prototype.name = 'CSI Python';
    CSIPythonBlock.prototype.category = CSICategory;
    CSIPythonBlock.prototype.documentation = 'text!DS/EPSSchematicsCSI/assets/EPSSchematicsCSIPythonBlockDoc.json';

    /**
	 * Is exportable.
	 *
	 * @private
	 * @return {boolean}
	 */
	CSIPythonBlock.prototype.isExportable = function () {
		return true;
	};

	/**
	 * Export content.
	 *
	 * @private
	 * @return {string}
	 */
	CSIPythonBlock.prototype.exportContent = function () {
        var csiFunction = {};
        csiFunction.grammarVersion = 3;
        csiFunction.implementation = {};
        csiFunction.implementation.name = 'python';
        csiFunction.implementation.version = 1;
        csiFunction.implementation.settings = {};
        csiFunction.implementation.settings.script = this.getScriptContent();
        csiFunction.desc = this.getDescription() || 'Specify here the description of this function implemented in Python';
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
	CSIPythonBlock.prototype.exportFileName = function () {
		var blockName = this.getName();
        var functionName = blockName.replace(/_v[0-9]+$/, '');
        var matchFunctionVersion = blockName.match(/_v[0-9]+$/);
        var functionVersion = matchFunctionVersion !== null ? matchFunctionVersion[0] : '_v1';
        var functionCamelCaseName = toCamelCase(functionName);
		var functionFileName = functionCamelCaseName + functionVersion + '.json';
		return functionFileName;
	};

    BlockLibrary.registerBlock(CSIPythonBlock);

    return CSIPythonBlock;
});
