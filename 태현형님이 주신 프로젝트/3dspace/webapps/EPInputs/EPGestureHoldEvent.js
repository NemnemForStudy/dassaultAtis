define('DS/EPInputs/EPGestureHoldEvent', [
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
	 * It occurs when the user holds a finger on the touch device for at least a short time.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureHoldEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldEvent = function (iGestureHoldEvent) {
	 *	// user held the finger for at least a short time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldEvent, objectListener, 'onGestureHoldEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldEvent, objectListener, 'onGestureHoldEvent');
	 */
	var GestureHoldEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureHoldEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldEvent.prototype.constructor = GestureHoldEvent;
	GestureHoldEvent.prototype.type = 'GestureHoldEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldEvent = function (iGestureHoldEvent) {
	 *	var elapsedTime = iGestureHoldEvent.getElapsedTime();
	 * };
	 */
	GestureHoldEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldEvent = function (iGestureHoldEvent) {
	 *	var gesturePosition = iGestureHoldEvent.getPosition();
	 * };
	 */
	GestureHoldEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureHoldEvent);

	// Expose in EP namespace.
	EP.GestureHoldEvent = GestureHoldEvent;

	return GestureHoldEvent;
});
