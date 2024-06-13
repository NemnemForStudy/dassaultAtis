define('DS/EPSSchematicsCoreLibrary/event/EPSEventReaderBlock', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlock',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums',
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsControlPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsEventPortDefinitions',
	'DS/EPSSchematicsModelWeb/EPSSchematicsDataPortDefinitions',
    'DS/EPSSchematicsCoreLibrary/event/EPSSchematicsCoreLibraryEventCategory'
], function (Block, Enums, BlockLibrary, ControlPortDefinitions, EventPortDefinitions, DataPortDefinitions, EventCategory) {
    'use strict';

    var EventReaderBlock = function () {
    	Block.call(this);

    	var controlPorts = this.createControlPorts([
			new EventPortDefinitions.InputAll('EventIn', 'Event'),
			new ControlPortDefinitions.Output('Out')
    	]);

    	this.createDataPort(new DataPortDefinitions.OutputRef('DataEventOut', controlPorts[0]));
    };

    EventReaderBlock.prototype = Object.create(Block.prototype);
    EventReaderBlock.prototype.constructor = EventReaderBlock;

    EventReaderBlock.prototype.uid = '3c32086d-5651-4311-8366-5542194be8ba';
    EventReaderBlock.prototype.name = 'Event Reader';
	EventReaderBlock.prototype.category = EventCategory;
	EventReaderBlock.prototype.documentation = 'i18n!DS/EPSSchematicsCoreLibrary/assets/nls/EPSEventReaderBlockDoc';

    EventReaderBlock.prototype.execute = function () {
    	var event = this.getInputControlPortEvent('EventIn');
    	this.setOutputDataPortValue('DataEventOut', event);
    	this.activateOutputControlPort('Out');
    	return Enums.EExecutionResult.eExecutionFinished;
    };

    BlockLibrary.registerBlock(EventReaderBlock);

    return EventReaderBlock;
});
