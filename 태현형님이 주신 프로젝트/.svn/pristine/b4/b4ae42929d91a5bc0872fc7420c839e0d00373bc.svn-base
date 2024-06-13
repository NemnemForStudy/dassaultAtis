
define('DS/StuModel/StuCollectionObjectRemovedEvent', ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEvent'], function (STU, Event) {
	'use strict';

	/**
	 *
	 * @exports CollectionObjectRemovedEvent
	 * @class
	 * @constructor
     * @noinstancector 
	 * @private
	 * @extends EP.Event
	 * @memberof STU
	 * @alias STU.CollectionObjectRemovedEvent
	 */
	var CollectionObjectRemovedEvent = function (iObject) {
		Event.call(this);
		this.object = iObject;
	};

	CollectionObjectRemovedEvent.prototype = new Event();
	CollectionObjectRemovedEvent.prototype.constructor = CollectionObjectRemovedEvent;
	CollectionObjectRemovedEvent.prototype.type = 'CollectionObjectRemovedEvent';

	// Expose in STU namespace.
	STU.CollectionObjectRemovedEvent = CollectionObjectRemovedEvent;

	EP.EventServices.registerEvent(CollectionObjectRemovedEvent);

	return CollectionObjectRemovedEvent;
});
