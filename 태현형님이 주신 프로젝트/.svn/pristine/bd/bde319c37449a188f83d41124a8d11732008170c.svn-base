define('DS/EPInputs/EPGestureEnableEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPInputs/EPGestureEvent'
], function (EP, EventServices, GestureEvent) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe a gesture event generated from a touch device.</br>
	 * It occurs when the touch device becomes enabled to detect gestures.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureEnableEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureEnableEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureEnableEvent = function (iGestureEnableEvent) {
	 *	// user enabled the touch device to detect gestures
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureEnableEvent, objectListener, 'onGestureEnableEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureEnableEvent, objectListener, 'onGestureEnableEvent');
	 */
	var GestureEnableEvent = function () {

		GestureEvent.call(this);
	};

	GestureEnableEvent.prototype = Object.create(GestureEvent.prototype);
	GestureEnableEvent.prototype.constructor = GestureEnableEvent;
	GestureEnableEvent.prototype.type = 'GestureEnableEvent';

	EventServices.registerEvent(GestureEnableEvent);

	// Expose in EP namespace.
	EP.GestureEnableEvent = GestureEnableEvent;

	return GestureEnableEvent;
});
