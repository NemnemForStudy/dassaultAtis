define('DS/EPInputs/EPGestureDragEndEvent', [
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
	 * It occurs when the user ends to drag a finger on the touch device.</br>
	 * This event is dispatched after the last EP.GestureDragEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureDragEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureDragEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEndEvent = function (iGestureDragEndEvent) {
	 *	// user ended to drag the finger
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureDragEndEvent, objectListener, 'onGestureDragEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureDragEndEvent, objectListener, 'onGestureDragEndEvent');
	 */
	var GestureDragEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
	};

	GestureDragEndEvent.prototype = Object.create(GestureEvent.prototype);
	GestureDragEndEvent.prototype.constructor = GestureDragEndEvent;
	GestureDragEndEvent.prototype.type = 'GestureDragEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEndEvent = function (iGestureDragEndEvent) {
	 *	var elapsedTime = iGestureDragEndEvent.getElapsedTime();
	 * };
	 */
	GestureDragEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEndEvent = function (iGestureDragEndEvent) {
	 *	var gesturePosition = iGestureDragEndEvent.getPosition();
	 * };
	 */
	GestureDragEndEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	/**
	 * Return the delta position in pixel of the contact on the viewer.</br>
	 * The delta position in pixel is the difference between the last position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEndEvent = function (iGestureDragEndEvent) {
	 *	var gestureDeltaPosition = iGestureDragEndEvent.getDeltaPosition();
	 * };
	 */
	GestureDragEndEvent.prototype.getDeltaPosition = function () {
		return this.deltaPosition.clone();
	};

	/**
	 * Return the vector from the origin in pixel of the contact on the viewer.</br>
	 * The vector from the origin in pixel is the difference between the origin position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEndEvent = function (iGestureDragEndEvent) {
	 *	var gestureVectorFromOrigin = iGestureDragEndEvent.getVectorFromOrigin();
	 * };
	 */
	GestureDragEndEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	EventServices.registerEvent(GestureDragEndEvent);

	// Expose in EP namespace.
	EP.GestureDragEndEvent = GestureDragEndEvent;

	return GestureDragEndEvent;
});
