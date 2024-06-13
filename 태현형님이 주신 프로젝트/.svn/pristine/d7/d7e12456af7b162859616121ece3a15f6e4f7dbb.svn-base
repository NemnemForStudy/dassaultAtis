define('DS/EPInputs/EPGestureHoldAndDragEndEvent', [
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
	 * It occurs when the user ends to drag a finger while holding another on the touch device.</br>
	 * This event is dispatched after the last EP.GestureHoldAndDragEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureHoldAndDragEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureHoldAndDragEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	// user ended to drag with the finger while holding another
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureHoldAndDragEndEvent, objectListener, 'onGestureHoldAndDragEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureHoldAndDragEndEvent, objectListener, 'onGestureHoldAndDragEndEvent');
	 */
	var GestureHoldAndDragEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
		this.dragTime = undefined;
	};

	GestureHoldAndDragEndEvent.prototype = Object.create(GestureEvent.prototype);
	GestureHoldAndDragEndEvent.prototype.constructor = GestureHoldAndDragEndEvent;
	GestureHoldAndDragEndEvent.prototype.type = 'GestureHoldAndDragEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	var elapsedTime = iGestureHoldAndDragEndEvent.getElapsedTime();
	 * };
	 */
	GestureHoldAndDragEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	var gestureFirstPosition = iGestureHoldAndDragEndEvent.getFirstPosition();
	 * };
	 */
	GestureHoldAndDragEndEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	var gestureSecondPosition = iGestureHoldAndDragEndEvent.getSecondPosition();
	 * };
	 */
	GestureHoldAndDragEndEvent.prototype.getSecondPosition = function () {
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
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	var gestureDeltaPosition = iGestureHoldAndDragEndEvent.getDeltaPosition();
	 * };
	 */
	GestureHoldAndDragEndEvent.prototype.getDeltaPosition = function () {
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
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	var gestureVectorFromOrigin = iGestureHoldAndDragEndEvent.getVectorFromOrigin();
	 * };
	 */
	GestureHoldAndDragEndEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	/**
	 * Return the drag time, corresponding to the elapsed time of the drag gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureHoldAndDragEndEvent = function (iGestureHoldAndDragEndEvent) {
	 *	var dragTime = iGestureHoldAndDragEndEvent.getDragTime();
	 * };
	 */
	GestureHoldAndDragEndEvent.prototype.getDragTime = function () {
		return this.dragTime;
	};

	EventServices.registerEvent(GestureHoldAndDragEndEvent);

	// Expose in EP namespace.
	EP.GestureHoldAndDragEndEvent = GestureHoldAndDragEndEvent;

	return GestureHoldAndDragEndEvent;
});
