define('DS/EPInputs/EPGestureHoldEndEvent', [
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
	 * It occurs when the user ends to hold a finger on the touch device for at least a short time.</br>
	 * This event is dispatched after the last EP.GestureHoldEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureHoldEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldEndEvent = function (iGestureHoldEndEvent) {
	 *	// user ended to hold the finger for at least a short time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldEndEvent, objectListener, 'onGestureHoldEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldEndEvent, objectListener, 'onGestureHoldEndEvent');
	 */
	var GestureHoldEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureHoldEndEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldEndEvent.prototype.constructor = GestureHoldEndEvent;
	GestureHoldEndEvent.prototype.type = 'GestureHoldEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldEndEvent = function (iGestureHoldEndEvent) {
	 *	var elapsedTime = iGestureHoldEndEvent.getElapsedTime();
	 * };
	 */
	GestureHoldEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldEndEvent = function (iGestureHoldEndEvent) {
	 *	var gesturePosition = iGestureHoldEndEvent.getPosition();
	 * };
	 */
	GestureHoldEndEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureHoldEndEvent);

	// Expose in EP namespace.
	EP.GestureHoldEndEvent = GestureHoldEndEvent;

	return GestureHoldEndEvent;
});
