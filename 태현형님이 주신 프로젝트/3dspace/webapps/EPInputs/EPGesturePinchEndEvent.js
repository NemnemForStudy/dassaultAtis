define('DS/EPInputs/EPGesturePinchEndEvent', [
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
	 * It occurs when the user ends to drag two fingers in the opposite direction on the touch device.</br>
	 * This event is dispatched after the last EP.GesturePinchEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GesturePinchEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GesturePinchEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEndEvent = function (iGesturePinchEndEvent) {
	 *	// user ended to drag both fingers in the opposite direction
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GesturePinchEndEvent, objectListener, 'onGesturePinchEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GesturePinchEndEvent, objectListener, 'onGesturePinchEndEvent');
	 */
	var GesturePinchEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.distance = undefined;
	};

	GesturePinchEndEvent.prototype = Object.create(GestureEvent.prototype);
	GesturePinchEndEvent.prototype.constructor = GesturePinchEndEvent;
	GesturePinchEndEvent.prototype.type = 'GesturePinchEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEndEvent = function (iGesturePinchEndEvent) {
	 *	var elapsedTime = iGesturePinchEndEvent.getElapsedTime();
	 * };
	 */
	GesturePinchEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEndEvent = function (iGesturePinchEndEvent) {
	 *	var gestureFirstPosition = iGesturePinchEndEvent.getFirstPosition();
	 * };
	 */
	GesturePinchEndEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEndEvent = function (iGesturePinchEndEvent) {
	 *	var gestureSecondPosition = iGesturePinchEndEvent.getSecondPosition();
	 * };
	 */
	GesturePinchEndEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the distance in pixel between both contacts.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEndEvent = function (iGesturePinchEndEvent) {
	 *	var distance = iGesturePinchEndEvent.getDistance();
	 * };
	 */
	GesturePinchEndEvent.prototype.getDistance = function () {
		return this.distance;
	};

	EventServices.registerEvent(GesturePinchEndEvent);

	// Expose in EP namespace.
	EP.GesturePinchEndEvent = GesturePinchEndEvent;

	return GesturePinchEndEvent;
});
