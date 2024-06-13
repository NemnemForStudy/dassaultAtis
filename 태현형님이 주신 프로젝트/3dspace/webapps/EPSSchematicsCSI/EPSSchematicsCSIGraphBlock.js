define('DS/EPSSchematicsCSI/EPSSchematicsCSIGraphBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsGraphBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsTools',
    'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions',
    'DS/EPSSchematicsCSI/EPSSchematicsCSICategory',
    'DS/EPSSchematicsCSI/EPSSchematicsCSITools'
], function(GraphBlock, Enums, Tools, TypeLibrary, BlockLibrary, ControlPortDefinitions, DataPortDefinitions, SettingDefinitions, CSICategory, CSITools) {
    'use strict';

    TypeLibrary.registerGlobalObjectType('ProgressEventsSettings', {
        flowIn: {
            type: 'Boolean',
            mandatory: true,
            defaultValue: false
        },
        flowOut: {
            type: 'Boolean',
            mandatory: true,
            defaultValue: false
        },
        notPluggedProgress: {
            type: 'Boolean',
            mandatory: true,
            defaultValue: false
        },
        select: {
            type: 'Boolean',
            mandatory: true,
            defaultValue: false
        },
        timestamp: {
            type: 'Boolean',
            mandatory: true,
            defaultValue: false
        }
    });

    var CSIGraphBlock = function() {
        GraphBlock.call(this);

        var startupPort = this.getStartupPort();
        startupPort.setName('Call');
        startupPort.setRenamable(false);

        this.createControlPorts([
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
        this.getDataPortByName('Call').setMaxTestValues(1);
        this.getDataPortByName('Success').setMaxTestValues(1);
        this.getDataPortByName('Error').setMaxTestValues(1);

        var castLevelSetting = this.getSettingByName('CastLevel');
        castLevelSetting.setValue(Enums.ECastLevel.eUnsafe);

        this.createSettings([
            new SettingDefinitions.Basic('defaultTimeout', 'Integer', 60),
            new SettingDefinitions.Basic('directData', 'Boolean', false),
            new SettingDefinitions.Basic('progressEvents', 'ProgressEventsSettings', { flowIn: false, flowOut: false, notPluggedProgress: false, select: false, timestamp: false}),
            new SettingDefinitions.Basic('multipleCall', 'Boolean', false)
        ]);

        this.setDataPortInputRules({ dynamicCount: 0 });
        this.setDataPortOutputRules({ dynamicCount: 0 });
        this.setControlPortInputRules({ dynamicCount: 0 });
        this.setControlPortOutputRules({ dynamicCount: 0 });
        this.setEventPortInputRules({ dynamicCount: 0 });
        this.setEventPortOutputRules({ dynamicCount: 0 });

        this.activateNodeIdSelector();
    };

    CSIGraphBlock.prototype = Object.create(GraphBlock.prototype);
    CSIGraphBlock.prototype.constructor = CSIGraphBlock;
    CSIGraphBlock.prototype.uid = CSITools.CSIGraphBlockUid;
    CSIGraphBlock.prototype.name = 'CSI Graph';
    CSIGraphBlock.prototype.category = CSICategory;
    CSIGraphBlock.prototype.documentation = 'text!DS/EPSSchematicsCSI/assets/EPSSchematicsCSIGraphBlockDoc.json';

    /**
	 * On add.
	 *
	 * @private
	 * @param {GraphBlock} iGraphBlock
	 */
    CSIGraphBlock.prototype.onAdd = function (iGraphBlock) {
        GraphBlock.prototype.onAdd.call(this, iGraphBlock);
        this.setNodeIdSelector(Tools.parentNodeIdSelector);
	};

    /**
	 * Is exportable.
	 *
	 * @private
	 * @return {boolean}
	 */
    CSIGraphBlock.prototype.isExportable = function () {
		return true;
	};

	/**
	 * Export content.
	 *
	 * @private
	 * @return {string}
	 */
    CSIGraphBlock.prototype.exportContent = function () {
        var CSIExport = require('DS/EPSSchematicsCSI/EPSSchematicsCSIExport');
        var jsonObject = CSIExport.generateJSONObject(this);
        jsonObject.implementation.settings.implementation.ui = this.generateJSON();
        return JSON.stringify(jsonObject, undefined, 2);
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
     CSIGraphBlock.prototype.exportFileName = function () {
        var blockName = this.getName();
        var functionName = blockName.replace(/_v[0-9]+$/, '');
        var matchFunctionVersion = blockName.match(/_v[0-9]+$/);
        var functionVersion = matchFunctionVersion !== null ? matchFunctionVersion[0] : '_v1';
        var functionCamelCaseName = toCamelCase(functionName);
		var functionFileName = functionCamelCaseName + functionVersion + '.json';
		return functionFileName;
	};

    BlockLibrary.registerBlock(CSIGraphBlock);

    return CSIGraphBlock;
});
