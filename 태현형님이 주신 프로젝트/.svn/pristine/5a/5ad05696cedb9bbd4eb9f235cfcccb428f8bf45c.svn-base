define('DS/EPInputs/EPGestureDragBeginEvent', [
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
	 * It occurs when the user begins to drag a finger on the touch device.</br>
	 * This event is dispatched before the first EP.GestureDragEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureDragBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureDragBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragBeginEvent = function (iGestureDragBeginEvent) {
	 *	// user began to drag the finger
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureDragBeginEvent, objectListener, 'onGestureDragBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureDragBeginEvent, objectListener, 'onGestureDragBeginEvent');
	 */
	var GestureDragBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
	};

	GestureDragBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GestureDragBeginEvent.prototype.constructor = GestureDragBeginEvent;
	GestureDragBeginEvent.prototype.type = 'GestureDragBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragBeginEvent = function (iGestureDragBeginEvent) {
	 *	var elapsedTime = iGestureDragBeginEvent.getElapsedTime();
	 * };
	 */
	GestureDragBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDragBeginEvent = function (iGestureDragBeginEvent) {
	 *	var gesturePosition = iGestureDragBeginEvent.getPosition();
	 * };
	 */
	GestureDragBeginEvent.prototype.getPosition = function () {
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
	 * objectListener.onGestureDragBeginEvent = function (iGestureDragBeginEvent) {
	 *	var gestureDeltaPosition = iGestureDragBeginEvent.getDeltaPosition();
	 * };
	 */
	GestureDragBeginEvent.prototype.getDeltaPosition = function () {
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
	 * objectListener.onGestureDragBeginEvent = function (iGestureDragBeginEvent) {
	 *	var gestureVectorFromOrigin = iGestureDragBeginEvent.getVectorFromOrigin();
	 * };
	 */
	GestureDragBeginEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	EventServices.registerEvent(GestureDragBeginEvent);

	// Expose in EP namespace.
	EP.GestureDragBeginEvent = GestureDragBeginEvent;

	return GestureDragBeginEvent;
});
