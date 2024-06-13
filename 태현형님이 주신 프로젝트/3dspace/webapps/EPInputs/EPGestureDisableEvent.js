define('DS/EPInputs/EPGestureDisableEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPInputs/EPGestureEvent'
], function (EP, EventServices, GestureEvent) {
    'use strict';

    /**
	 * @class
	 * @classdesc
	 * <p>Describe a gesture event generated from a touch device.</br>
	 * It occurs when the touch device becomes disabled to detect gestures.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureDisableEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureDisableEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDisableEvent = function (iGestureDisableEvent) {
	 *	// user disabled the touch device to detect gestures
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureDisableEvent, objectListener, 'onGestureDisableEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureDisableEvent, objectListener, 'onGestureDisableEvent');
	 */
    var GestureDisableEvent = function () {

    	GestureEvent.call(this);
    };

    GestureDisableEvent.prototype = Object.create(GestureEvent.prototype);
    GestureDisableEvent.prototype.constructor = GestureDisableEvent;
    GestureDisableEvent.prototype.type = 'GestureDisableEvent';

    EventServices.registerEvent(GestureDisableEvent);

    // Expose in EP namespace.
    EP.GestureDisableEvent = GestureDisableEvent;

    return GestureDisableEvent;
});
