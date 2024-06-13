define('DS/EPInputs/EPGestureHoldAndDragBeginEvent', [
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
	 * It occurs when the user begins to drag a finger while holding another on the touch device.</br>
	 * This event is dispatched before the first EP.GestureHoldAndDragEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureHoldAndDragBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldAndDragBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	// user began to drag with the finger while holding another
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldAndDragBeginEvent, objectListener, 'onGestureHoldAndDragBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldAndDragBeginEvent, objectListener, 'onGestureHoldAndDragBeginEvent');
	 */
	var GestureHoldAndDragBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
		this.dragTime = undefined;
	};

	GestureHoldAndDragBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldAndDragBeginEvent.prototype.constructor = GestureHoldAndDragBeginEvent;
	GestureHoldAndDragBeginEvent.prototype.type = 'GestureHoldAndDragBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	var elapsedTime = iGestureHoldAndDragBeginEvent.getElapsedTime();
	 * };
	 */
	GestureHoldAndDragBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	var gestureFirstPosition = iGestureHoldAndDragBeginEvent.getFirstPosition();
	 * };
	 */
	GestureHoldAndDragBeginEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	var gestureSecondPosition = iGestureHoldAndDragBeginEvent.getSecondPosition();
	 * };
	 */
	GestureHoldAndDragBeginEvent.prototype.getSecondPosition = function () {
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
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	var gestureDeltaPosition = iGestureHoldAndDragBeginEvent.getDeltaPosition();
	 * };
	 */
	GestureHoldAndDragBeginEvent.prototype.getDeltaPosition = function () {
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
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	var gestureVectorFromOrigin = iGestureHoldAndDragBeginEvent.getVectorFromOrigin();
	 * };
	 */
	GestureHoldAndDragBeginEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	/**
	 * Return the drag time, corresponding to the elapsed time of the drag gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragBeginEvent = function (iGestureHoldAndDragBeginEvent) {
	 *	var dragTime = iGestureHoldAndDragBeginEvent.getDragTime();
	 * };
	 */
	GestureHoldAndDragBeginEvent.prototype.getDragTime = function () {
		return this.dragTime;
	};

	EventServices.registerEvent(GestureHoldAndDragBeginEvent);

	// Expose in EP namespace.
	EP.GestureHoldAndDragBeginEvent = GestureHoldAndDragBeginEvent;

	return GestureHoldAndDragBeginEvent;
});
