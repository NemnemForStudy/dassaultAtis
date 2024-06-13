define('DS/EPInputs/EPGestureLongHoldEndEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPInputs/EPGestureEvent',
	'DS/MathematicsES/MathVector2DJSImpl'
], function (EP, EventServices, GestureEvent, Vector2D) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe a gesture event generated from a touch device.</br>
	 * It contains information about the gesture contacts on the touch device.</br>
	 * It occurs when the user ends to hold a finger on the touch device for at least a medium time.</br>
	 * This event is dispatched after the last EP.GestureLongHoldEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureLongHoldEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureLongHoldEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureLongHoldEndEvent = function (iGestureLongHoldEndEvent) {
	 *	// user ended to hold the finger for at least a long time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureLongHoldEndEvent, objectListener, 'onGestureLongHoldEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureLongHoldEndEvent, objectListener, 'onGestureLongHoldEndEvent');
	 */
	var GestureLongHoldEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureLongHoldEndEvent.prototype = Object.create(GestureEvent.prototype);
	GestureLongHoldEndEvent.prototype.constructor = GestureLongHoldEndEvent;
	GestureLongHoldEndEvent.prototype.type = 'GestureLongHoldEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureLongHoldEndEvent = function (iGestureLongHoldEndEvent) {
	 *	var elapsedTime = iGestureLongHoldEndEvent.getElapsedTime();
	 * };
	 */
	GestureLongHoldEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureLongHoldEndEvent = function (iGestureLongHoldEndEvent) {
	 *	var gesturePosition = iGestureLongHoldEndEvent.getPosition();
	 * };
	 */
	GestureLongHoldEndEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureLongHoldEndEvent);

	// Expose in EP namespace.
	EP.GestureLongHoldEndEvent = GestureLongHoldEndEvent;

	return GestureLongHoldEndEvent;
});
