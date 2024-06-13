define('DS/EPInputs/EPGestureHoldBeginEvent', [
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
	 * It occurs when the user begins to hold a finger on the touch device for at least a short time.</br>
	 * This event is dispatched before the first EP.GestureHoldEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureHoldBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldBeginEvent = function (iGestureHoldBeginEvent) {
	 *	// user began to hold the finger for at least a short time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldBeginEvent, objectListener, 'onGestureHoldBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldBeginEvent, objectListener, 'onGestureHoldBeginEvent');
	 */
	var GestureHoldBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureHoldBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldBeginEvent.prototype.constructor = GestureHoldBeginEvent;
	GestureHoldBeginEvent.prototype.type = 'GestureHoldBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldBeginEvent = function (iGestureHoldBeginEvent) {
	 *	var elapsedTime = iGestureHoldBeginEvent.getElapsedTime();
	 * };
	 */
	GestureHoldBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldBeginEvent = function (iGestureHoldBeginEvent) {
	 *	var gesturePosition = iGestureHoldBeginEvent.getPosition();
	 * };
	 */
	GestureHoldBeginEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureHoldBeginEvent);

	// Expose in EP namespace.
	EP.GestureHoldBeginEvent = GestureHoldBeginEvent;

	return GestureHoldBeginEvent;
});
