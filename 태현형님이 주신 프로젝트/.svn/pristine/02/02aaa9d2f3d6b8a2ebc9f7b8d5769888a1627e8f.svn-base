define('DS/EPInputs/EPGestureEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPEventServices/EPEvent'
], function (EP, EventServices, Event) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe a gesture event generated from a touch device.</br>
	 * It occurs when the user makes gestures on the touch device.</p>
	 *
	 * <p>This event has specific extensions class and there are all dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureEvent
	 * @noinstancector
	 * @public
	 * @extends EP.Event
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureEvent = function (iGestureEvent) {
	 *	// user makes gestures on the touch device
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureEvent, objectListener, 'onGestureEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureEvent, objectListener, 'onGestureEvent');
	 */
	var GestureEvent = function () {

		Event.call(this);
	};

	GestureEvent.prototype = Object.create(Event.prototype);
	GestureEvent.prototype.constructor = GestureEvent;
	GestureEvent.prototype.type = 'GestureEvent';

	EventServices.registerEvent(GestureEvent);

	// Expose in EP namespace.
	EP.GestureEvent = GestureEvent;

	return GestureEvent;
});
