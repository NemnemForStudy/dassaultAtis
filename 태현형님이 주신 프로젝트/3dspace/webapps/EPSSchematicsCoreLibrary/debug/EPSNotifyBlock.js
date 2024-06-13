define('DS/EPSSchematicsCoreLibrary/debug/EPSNotifyBlock', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
    'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
    'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsSettingDefinitions',
    'DS/EPSSchematicsCoreLibrary/EPSESeverityType',
    'DS/EPSSchematicsCoreLibrary/debug/EPSSchematicsCoreLibraryDebugCategory'
], function (
    Block,
    Enums,
    BlockLibrary,
    ControlPortDefinitions,
    DataPortDefinitions,
    SettingDefinitions,
    ESeverity,
    DebugCategory) {
    'use strict';

    var NotifyBlock = function () {
        Block.call(this);
        this.createControlPorts([
			new ControlPortDefinitions.Input('In'),
			new ControlPortDefinitions.Output('Out')
        ]);
        this.createDataPort(new DataPortDefinitions.InputBasic('Title', 'String', ''));
        this.createDataPort(new DataPortDefinitions.InputList('Message', ['String', 'Integer', 'Double', 'Boolean'], 'String', {
            'String': 'Hello World!',
            'Integer': 0,
            'Double': 0.0,
            'Boolean': false
        }));
        this.createSetting(new SettingDefinitions.Basic('Severity', 'ESeverity', ESeverity.eInfo));
    };
    NotifyBlock.prototype = Object.create(Block.prototype);
    NotifyBlock.prototype.constructor = NotifyBlock;
    NotifyBlock.prototype.uid = '381afc55-87e9-4663-9211-59abab491c7e';
    NotifyBlock.prototype.name = 'Notify';
    NotifyBlock.prototype.category = DebugCategory;
    NotifyBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSNotifyBlockDoc';

    NotifyBlock.prototype.execute = function () {
        var severity = this.getSettingValue('Severity');
        var title = this.getInputDataPortValue('Title');
        var message = this.getInputDataPortValue('Message');

        this.notify(severity, title, message);

        this.activateOutputControlPort('Out');
        return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(NotifyBlock);

    return NotifyBlock;
});
