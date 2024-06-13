define('DS/EPSSchematicsCoreLibrary/event/EPSEventWriterBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
    'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
    'DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/event/EPSSchematicsCoreLibraryEventCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, EventPortDefinitions, DataPortDefinitions, EventCategory) {
    'use strict';

    var EventWriterBlock = function () {
        Block.call(this);

        var controlPorts = this.createControlPorts([
            new ControlPortDefinitions.Input('In'),
			new EventPortDefinitions.OutputAll('EventOut', 'Event')
        ]);

        this.createDataPort(new DataPortDefinitions.InputRef('DataEventIn', controlPorts[1]));
    };

    EventWriterBlock.prototype = Object.create(Block.prototype);
    EventWriterBlock.prototype.constructor = EventWriterBlock;

    EventWriterBlock.prototype.uid = '478f4862-fffd-4114-9247-95c2ff28b7ff';
    EventWriterBlock.prototype.name = 'Event Writer';
    EventWriterBlock.prototype.category = EventCategory;
    EventWriterBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSEventWriterBlockDoc';

    EventWriterBlock.prototype.execute = function () {
    	var event = this.getInputDataPortValue('DataEventIn');
    	if (event !== undefined) {
    		this.setOutputControlPortEvent('EventOut', event);
    		this.activateOutputControlPort('EventOut');
    	}
        return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(EventWriterBlock);

    return EventWriterBlock;
});
