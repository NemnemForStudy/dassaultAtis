define('DS/EPSSchematicsScriptsLibrary/EPSSchematicsJavaScriptBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsScriptBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsScriptsLibrary/EPSSchematicsScriptsLibraryCategories'
], function (ScriptBlock, BlockLibrary, Enums, ControlPortDefinitions, Categories) {
    'use strict';

    var JavaScriptBlock = function () {

    	ScriptBlock.call(this);

        this.createControlPort(new ControlPortDefinitions.Input('In')).setRenamable(true);
        this.createDynamicControlPort(Enums.EControlPortType.eOutput, 'Out');

        this.setScriptLanguage(Enums.EScriptLanguage.eJavaScript);
        this.setScriptContent('/*******************************************************\n\n An output control port can be activated using:\n this.activateOutputControlPort(<portName>);\n\n An input data port value can be accessed using:\n this.getInputDataPortValue(<portName>);\n\n An output data port value can be set using:\n this.setOutputDataPortValue(<portName>, <portValue>);\n\n*******************************************************/\n// Insert code here\n\nthis.activateOutputControlPort(\'Out\');\nreturn EP.EExecutionResult.eExecutionFinished;');
    };

    JavaScriptBlock.prototype = Object.create(ScriptBlock.prototype);
    JavaScriptBlock.prototype.constructor = JavaScriptBlock;

    JavaScriptBlock.prototype.uid = '729b0bc1-c2a3-42a8-8d02-7bb99034791c';
    JavaScriptBlock.prototype.name = 'JavaScript';
    JavaScriptBlock.prototype.category = Categories.Script;
    JavaScriptBlock.prototype.documentation = 'i18n!DS/EPSSchematicsScriptsLibrary/assets/nls/EPSSchematicsJavaScriptBlockDoc';

    /**
	 * Is exportable.
	 *
	 * @private
	 * @return {boolean}
	 */
	JavaScriptBlock.prototype.isExportable = function () {
		return true;
	};

    var replaceGUIDCharacter = function (c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	};

	var generateGUID = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, replaceGUIDCharacter);
	};

	var lf = '\n';
	var ht = '\t';

	var generateCodeFromValueType = function (iType, iValue, iGraphContext) {
		var TypeLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary');
		var code = {};
		code.block = '';
		code.value = 'undefined';
		var elementType = TypeLibrary.getArrayValueTypeName(iType) || iType;
		if (!TypeLibrary.hasType(iGraphContext, elementType, Enums.FTypeCategory.fBase)) {
			code.block += ht + ht + '// TODO: Add ' + elementType + ' as define dependencies' + lf;
		}
		if (iValue !== undefined) {
			if (TypeLibrary.hasType(iGraphContext, elementType, Enums.FTypeCategory.fEnum)) {
				code.block += ht + ht + 'var ' + elementType + ' = TypeLibrary.getType(this.getGraphContext(), \'' + elementType + '\');' + lf;
				var valueToEnumKey = {};
				var Enum = TypeLibrary.getType(iGraphContext, elementType);
				var enumKeys = Object.keys(Enum);
				var enumKey;
				for (var ek = 0; ek < enumKeys.length; ek++) {
					enumKey = enumKeys[ek];
					valueToEnumKey[Enum[enumKey]] = enumKey;
				}
				if (Array.isArray(iValue)) {
					var arrayCodeValue = iValue.map(function (element) {
						return elementType + '.' + valueToEnumKey[element];
					});
					code.value = '[' + arrayCodeValue.join(', ') + ']';
				}
				else {
					code.value = elementType + '.' + valueToEnumKey[iValue];
				}
			}
			else {
				var jsonObjectValue = TypeLibrary.getJSONValueFromValue(iGraphContext, iValue, iType);
				var jsonValue = JSON.stringify(jsonObjectValue);
				jsonValue = jsonValue.replace(/"/g, '\'');
				if (!TypeLibrary.hasType(iGraphContext, iType, Enums.FTypeCategory.fBase)) {
					code.value = 'TypeLibrary.getValueFromJSONValue(this.getGraphContext(), ' + jsonValue + ', \'' + iType + '\')';
				}
				else {
					code.value = jsonValue;
				}
			}
		}
		return code;
	};

	var toPascalCase = function (iString) {
		var pascalCaseString = iString.replace(/[^a-zA-Z0-9]+(.)/g, function(match, char) {
			return char.toUpperCase();
		});
		return pascalCaseString;
    };

	/**
	 * Export content.
	 *
	 * @private
	 * @return {string}
	 */
	JavaScriptBlock.prototype.exportContent = function () {
		var blockName = this.getName();
		var blockPascalCaseName = toPascalCase(blockName);
		var blockUid = generateGUID();
		var blockCategory = blockPascalCaseName + 'Category';
		var blockClassName = blockPascalCaseName + 'Block';
		var blockRequireId = 'DS/' + blockPascalCaseName + 'Module/' + blockClassName;

		var code;
		var blockCode = '';
		blockCode += 'define(\'' + blockRequireId + '\', [' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsBlock\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums\',' + lf;
		blockCode += ht + '\'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary\'' + lf;
		blockCode += '], function (Block, BlockLibrary, ControlPortDefinitions, EventPortDefinitions, DataPortDefinitions, SettingDefinitions, Enums, TypeLibrary) {' + lf;
		blockCode += ht + '\'use strict\';' + lf;
		blockCode += lf;
		blockCode += ht + 'var ' + blockClassName + ' = function () {' + lf;
		blockCode += ht + ht + 'Block.call(this);' + lf;
		blockCode += lf;
		var inputControlPorts = this.getControlPorts(Enums.EControlPortType.eInput);
		var inputControlPort, icpName;
		for (var icp = 0; icp < inputControlPorts.length; icp++) {
			inputControlPort = inputControlPorts[icp];
			icpName = inputControlPort.getName();
			blockCode += ht + ht + 'this.createControlPort(new ControlPortDefinitions.Input(\'' + icpName + '\'));' + lf;
		}
		var inputEventPorts = this.getControlPorts(Enums.EControlPortType.eInputEvent);
		var inputEventPort, iepName, iepType;
		for (var iep = 0; iep < inputEventPorts.length; iep++) {
			inputEventPort = inputEventPorts[iep];
			iepName = inputEventPort.getName();
			iepType = inputEventPort.getEventType();
			blockCode += ht + ht + 'this.createControlPort(new EventPortDefinitions.InputBasic(\'' + iepName + '\', \'' + iepType + '\'));' + lf;
		}
		var outputControlPorts = this.getControlPorts(Enums.EControlPortType.eOutput);
		var outputControlPort, ocpName;
		for (var ocp = 0; ocp < outputControlPorts.length; ocp++) {
			outputControlPort = outputControlPorts[ocp];
			ocpName = outputControlPort.getName();
			blockCode += ht + ht + 'this.createControlPort(new ControlPortDefinitions.Output(\'' + ocpName + '\'));' + lf;
		}
		var outputEventPorts = this.getControlPorts(Enums.EControlPortType.eOutputEvent);
		var outputEventPort, oepName, oepType;
		for (var oep = 0; oep < outputEventPorts.length; oep++) {
			outputEventPort = outputEventPorts[oep];
			oepName = outputEventPort.getName();
			oepType = outputEventPort.getEventType();
			blockCode += ht + ht + 'this.createControlPort(new EventPortDefinitions.OutputBasic(\'' + oepName + '\', \'' + oepType + '\'));' + lf;
		}
		var inputDataPorts = this.getDataPorts(Enums.EDataPortType.eInput);
		var inputDataPort, idpName, idpType, idpDefaultValue;
		for (var idp = 0; idp < inputDataPorts.length; idp++) {
			inputDataPort = inputDataPorts[idp];
			idpName = inputDataPort.getName();
			idpType = inputDataPort.getValueType();
			code = generateCodeFromValueType(idpType, inputDataPort.getDefaultValue(), this.getGraphContext());
			if (blockCode.indexOf(code.block) === -1) {
				blockCode += code.block;
			}
			idpDefaultValue = code.value;
			blockCode += ht + ht + 'this.createDataPort(new DataPortDefinitions.InputBasic(\'' + idpName + '\', \'' + idpType + '\', ' + idpDefaultValue + '));' + lf;
		}
		var outputDataPorts = this.getDataPorts(Enums.EDataPortType.eOutput);
		var outputDataPort, odpName, odpType;
		for (var odp = 0; odp < outputDataPorts.length; odp++) {
			outputDataPort = outputDataPorts[odp];
			odpName = outputDataPort.getName();
			odpType = outputDataPort.getValueType();
			blockCode += ht + ht + 'this.createDataPort(new DataPortDefinitions.OutputBasic(\'' + odpName + '\', \'' + odpType + '\'));' + lf;
		}
		var settings = this.getSettings();
		var setting, sName, sType, sValue;
		for (var s = 0; s < settings.length; s++) {
			setting = settings[s];
			sName = setting.getName();
			sType = setting.getValueType();
			code = generateCodeFromValueType(sType, setting.getValue(), this.getGraphContext());
			if (blockCode.indexOf(code.block) === -1) {
				blockCode += code.block;
			}
			sValue = code.value;
			blockCode += ht + ht + 'this.createSetting(new SettingDefinitions.Basic(\'' + sName + '\', \'' + sType + '\', ' + sValue + '));' + lf;
		}
		blockCode += ht + '};' + lf;
		blockCode += lf;
		blockCode += ht + blockClassName + '.prototype = Object.create(Block.prototype);' + lf;
		blockCode += ht + blockClassName + '.prototype.constructor = ' + blockClassName + ';' + lf;
		blockCode += lf;
		blockCode += ht + blockClassName + '.prototype.uid = \'' + blockUid + '\';' + lf;
		blockCode += ht + blockClassName + '.prototype.name = \'' + blockName + '\';' + lf;
		blockCode += ht + blockClassName + '.prototype.category = \'' + blockCategory + '\';' + lf;
		blockCode += lf;
		blockCode += ht + blockClassName + '.prototype.execute = function () {' + lf;
		blockCode += this.getScriptContent().replace(/^/gm, ht + ht) + lf;
		blockCode += ht + '};' + lf;
		blockCode += lf;
		blockCode += ht + 'BlockLibrary.registerBlock(' + blockClassName + ');' + lf;
		blockCode += lf;
		blockCode += ht + 'return ' + blockClassName + ';' + lf;
		blockCode += '});' + lf;

		return blockCode;
	};

	/**
	 * Export file name.
	 *
	 * @private
	 * @return {string}
	 */
	JavaScriptBlock.prototype.exportFileName = function () {
		var blockName = this.getName();
		var blockPascalCaseName = toPascalCase(blockName);
		var blockClassName = blockPascalCaseName + 'Block';
		var blockFileName = blockClassName + '.js';
		return blockFileName;
	};

    BlockLibrary.registerBlock(JavaScriptBlock);

    return JavaScriptBlock;
});
