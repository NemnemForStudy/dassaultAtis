define('DS/EPInputs/EPGestureHoldAndDragEvent', [
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
	 * It occurs when the user drags a finger while holding another on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureHoldAndDragEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldAndDragEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	// user dragged with the finger while holding another
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldAndDragEvent, objectListener, 'onGestureHoldAndDragEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldAndDragEvent, objectListener, 'onGestureHoldAndDragEvent');
	 */
	var GestureHoldAndDragEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
		this.dragTime = undefined;
	};

	GestureHoldAndDragEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldAndDragEvent.prototype.constructor = GestureHoldAndDragEvent;
	GestureHoldAndDragEvent.prototype.type = 'GestureHoldAndDragEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	var elapsedTime = iGestureHoldAndDragEvent.getElapsedTime();
	 * };
	 */
	GestureHoldAndDragEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	var gestureFirstPosition = iGestureHoldAndDragEvent.getFirstPosition();
	 * };
	 */
	GestureHoldAndDragEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	var gestureSecondPosition = iGestureHoldAndDragEvent.getSecondPosition();
	 * };
	 */
	GestureHoldAndDragEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the delta position in pixel of the contact on the viewer.</br>
	 * This contact corresponds to the finger performing the drag gesture.</br>
	 * The delta position in pixel is the difference between the last position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	var gestureDeltaPosition = iGestureHoldAndDragEvent.getDeltaPosition();
	 * };
	 */
	GestureHoldAndDragEvent.prototype.getDeltaPosition = function () {
		return this.deltaPosition.clone();
	};

	/**
	 * Return the vector from the origin in pixel of the contact on the viewer.</br>
	 * This contact corresponds to the finger performing the drag gesture.</br>
	 * The vector from the origin in pixel is the difference between the origin position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	var gestureVectorFromOrigin = iGestureHoldAndDragEvent.getVectorFromOrigin();
	 * };
	 */
	GestureHoldAndDragEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	/**
	 * Return the drag time, corresponding to the elapsed time of the drag gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEvent = function (iGestureHoldAndDragEvent) {
	 *	var dragTime = iGestureHoldAndDragEvent.getDragTime();
	 * };
	 */
	GestureHoldAndDragEvent.prototype.getDragTime = function () {
		return this.dragTime;
	};

	EventServices.registerEvent(GestureHoldAndDragEvent);

	// Expose in EP namespace.
	EP.GestureHoldAndDragEvent = GestureHoldAndDragEvent;

	return GestureHoldAndDragEvent;
});
