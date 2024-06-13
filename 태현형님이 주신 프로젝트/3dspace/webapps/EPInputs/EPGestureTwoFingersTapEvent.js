define('DS/EPInputs/EPGestureTwoFingersTapEvent', [
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
	 * It occurs when the user taps with two fingers at the same time on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureTwoFingersTapEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureTwoFingersTapEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersTapEvent = function (iGestureTwoFingersTapEvent) {
	 *	// user tapped with both fingers
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureTwoFingersTapEvent, objectListener, 'onGestureTwoFingersTapEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureTwoFingersTapEvent, objectListener, 'onGestureTwoFingersTapEvent');
	 */
	var GestureTwoFingersTapEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
	};

	GestureTwoFingersTapEvent.prototype = Object.create(GestureEvent.prototype);
	GestureTwoFingersTapEvent.prototype.constructor = GestureTwoFingersTapEvent;
	GestureTwoFingersTapEvent.prototype.type = 'GestureTwoFingersTapEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersTapEvent = function (iGestureTwoFingersTapEvent) {
	 *	var elapsedTime = iGestureTwoFingersTapEvent.getElapsedTime();
	 * };
	 */
	GestureTwoFingersTapEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersTapEvent = function (iGestureTwoFingersTapEvent) {
	 *	var gestureFirstPosition = iGestureTwoFingersTapEvent.getFirstPosition();
	 * };
	 */
	GestureTwoFingersTapEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersTapEvent = function (iGestureTwoFingersTapEvent) {
	 *	var gestureSecondPosition = iGestureTwoFingersTapEvent.getSecondPosition();
	 * };
	 */
	GestureTwoFingersTapEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	EventServices.registerEvent(GestureTwoFingersTapEvent);

	// Expose in EP namespace.
	EP.GestureTwoFingersTapEvent = GestureTwoFingersTapEvent;

	return GestureTwoFingersTapEvent;
});
