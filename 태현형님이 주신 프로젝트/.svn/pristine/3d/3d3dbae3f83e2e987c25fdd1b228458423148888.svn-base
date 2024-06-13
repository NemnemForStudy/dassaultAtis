define('DS/EPInputs/EPGestureDragEvent', [
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
	 * It occurs when the user drags a finger on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureDragEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureDragEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEvent = function (iGestureDragEvent) {
	 *	// user dragged the finger
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureDragEvent, objectListener, 'onGestureDragEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureDragEvent, objectListener, 'onGestureDragEvent');
	 */
	var GestureDragEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
	};

	GestureDragEvent.prototype = Object.create(GestureEvent.prototype);
	GestureDragEvent.prototype.constructor = GestureDragEvent;
	GestureDragEvent.prototype.type = 'GestureDragEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEvent = function (iGestureDragEvent) {
	 *	var elapsedTime = iGestureDragEvent.getElapsedTime();
	 * };
	 */
	GestureDragEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragEvent = function (iGestureDragEvent) {
	 *	var gesturePosition = iGestureDragEvent.getPosition();
	 * };
	 */
	GestureDragEvent.prototype.getPosition = function () {
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
	 * objectListener.onGestureDragEvent = function (iGestureDragEvent) {
	 *	var gestureDeltaPosition = iGestureDragEvent.getDeltaPosition();
	 * };
	 */
	GestureDragEvent.prototype.getDeltaPosition = function () {
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
	 * objectListener.onGestureDragEvent = function (iGestureDragEvent) {
	 *	var gestureVectorFromOrigin = iGestureDragEvent.getVectorFromOrigin();
	 * };
	 */
	GestureDragEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	EventServices.registerEvent(GestureDragEvent);

	// Expose in EP namespace.
	EP.GestureDragEvent = GestureDragEvent;

	return GestureDragEvent;
});
