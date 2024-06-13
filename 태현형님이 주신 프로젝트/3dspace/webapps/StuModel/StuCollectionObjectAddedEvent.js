
define('DS/StuModel/StuCollectionObjectAddedEvent', ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEvent'], function (STU, Event) {
	'use strict';

	/**
	 *
	 * @exports CollectionObjectAddedEvent
	 * @class
	 * @constructor
     * @noinstancector 
	 * @private
	 * @extends EP.Event
	 * @memberof STU
	 * @alias STU.CollectionObjectAddedEvent
	 */
	var CollectionObjectAddedEvent = function (iObject) {
		Event.call(this);
		this.object = iObject;
	};

	CollectionObjectAddedEvent.prototype = new Event();
	CollectionObjectAddedEvent.prototype.constructor = CollectionObjectAddedEvent;
	CollectionObjectAddedEvent.prototype.type = 'CollectionObjectAddedEvent';

	// Expose in STU namespace.
	STU.CollectionObjectAddedEvent = CollectionObjectAddedEvent;

	EP.EventServices.registerEvent(CollectionObjectAddedEvent);

	return CollectionObjectAddedEvent;
});
