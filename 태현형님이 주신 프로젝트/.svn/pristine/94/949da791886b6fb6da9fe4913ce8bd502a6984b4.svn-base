define('DS/EPInputs/EPGestureHoldAndTapEvent', [
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
	 * It occurs when the user taps with a finger while holding another on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.onGestureHoldAndTapEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldAndTapEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndTapEvent = function (iGestureHoldAndTapEvent) {
	 *	// user tapped with the finger while holding another
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldAndTapEvent, objectListener, 'onGestureHoldAndTapEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldAndTapEvent, objectListener, 'onGestureHoldAndTapEvent');
	 */
	var GestureHoldAndTapEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.intervalTime = undefined;
	};

	GestureHoldAndTapEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldAndTapEvent.prototype.constructor = GestureHoldAndTapEvent;
	GestureHoldAndTapEvent.prototype.type = 'GestureHoldAndTapEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndTapEvent = function (iGestureHoldAndTapEvent) {
	 *	var elapsedTime = iGestureHoldAndTapEvent.getElapsedTime();
	 * };
	 */
	GestureHoldAndTapEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndTapEvent = function (iGestureHoldAndTapEvent) {
	 *	var gestureFirstPosition = iGestureHoldAndTapEvent.getFirstPosition();
	 * };
	 */
	GestureHoldAndTapEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndTapEvent = function (iGestureHoldAndTapEvent) {
	 *	var gestureSecondPosition = iGestureHoldAndTapEvent.getSecondPosition();
	 * };
	 */
	GestureHoldAndTapEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the interval time, corresponding to the elapsed time of the tap gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndTapEvent = function (iGestureHoldAndTapEvent) {
	 *	var gestureIntervalTime = iGestureHoldAndTapEvent.getIntervalTime();
	 * };
	 */
	GestureHoldAndTapEvent.prototype.getIntervalTime = function () {
		return this.intervalTime;
	};

	EventServices.registerEvent(GestureHoldAndTapEvent);

	// Expose in EP namespace.
	EP.GestureHoldAndTapEvent = GestureHoldAndTapEvent;

	return GestureHoldAndTapEvent;
});
