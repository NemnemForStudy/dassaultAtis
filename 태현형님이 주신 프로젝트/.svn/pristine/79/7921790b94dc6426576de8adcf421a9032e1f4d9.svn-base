
define('DS/StuModel/StuCurrentSceneChangedEvent', ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEvent'], function (STU, Event) {
	'use strict';

	/**
	 * Describe an event generated from a STU.Experience.
	 * It occurs when an experience is processing.
	 * This event has specific extensions class and there are all dispatched globally on the EP.EventServices and locally on the corresponding STU.Experience.
	 * In order to get notified, you need to add a listener as STU.CurrentSceneChangedEvent type on the corresponding STU.Experience or on the EP.EventServices.
	 *
	 * @exports CurrentSceneChangedEvent
	 * @class
	 * @constructor
     * @noinstancector 
	 * @private
	 * @extends EP.Event
	 * @memberof STU
	 * @alias STU.CurrentSceneChangedEvent
	 */
	var CurrentSceneChangedEvent = function () {

		Event.call(this);
	};

	CurrentSceneChangedEvent.prototype = new Event();
	CurrentSceneChangedEvent.prototype.constructor = CurrentSceneChangedEvent;
	CurrentSceneChangedEvent.prototype.type = 'CurrentSceneChangedEvent';

	// Expose in STU namespace.
	STU.CurrentSceneChangedEvent = CurrentSceneChangedEvent;

	EP.EventServices.registerEvent(CurrentSceneChangedEvent);

	return CurrentSceneChangedEvent;
});

define('StuModel/StuCurrentSceneChangedEvent', ['DS/StuModel/StuCurrentSceneChangedEvent'], function (CurrentSceneChangedEvent) {
	'use strict';

	return CurrentSceneChangedEvent;
});
