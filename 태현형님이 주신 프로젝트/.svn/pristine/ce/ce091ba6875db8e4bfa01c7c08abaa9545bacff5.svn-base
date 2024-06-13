define('DS/EPInputs/EPGesturePanEvent', [
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
	 * It occurs when the user drags two fingers in the same direction on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GesturePanEvent type on the EP.EventServices.</p>
	 * @alias EP.GesturePanEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEvent = function (iGesturePanEvent) {
	 *	// user dragged both fingers in the same direction
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GesturePanEvent, objectListener, 'onGesturePanEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GesturePanEvent, objectListener, 'onGesturePanEvent');
	 */
	var GesturePanEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
	};

	GesturePanEvent.prototype = Object.create(GestureEvent.prototype);
	GesturePanEvent.prototype.constructor = GesturePanEvent;
	GesturePanEvent.prototype.type = 'GesturePanEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEvent = function (iGesturePanEvent) {
	 *	var elapsedTime = iGesturePanEvent.getElapsedTime();
	 * };
	 */
	GesturePanEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEvent = function (iGesturePanEvent) {
	 *	var gestureFirstPosition = iGesturePanEvent.getFirstPosition();
	 * };
	 */
	GesturePanEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEvent = function (iGesturePanEvent) {
	 *	var gestureSecondPosition = iGesturePanEvent.getSecondPosition();
	 * };
	 */
	GesturePanEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the delta position in pixel of the midpoint between both contacts on the viewer.</br>
	 * The delta position in pixel is the difference between the last position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEvent = function (iGesturePanEvent) {
	 *	var gestureDeltaPosition = iGesturePanEvent.getDeltaPosition();
	 * };
	 */
	GesturePanEvent.prototype.getDeltaPosition = function () {
		return this.deltaPosition.clone();
	};

	/**
	 * Return the vector from the origin in pixel of the midpoint between both contacts on the viewer.</br>
	 * The vector from the origin in pixel is the difference between the origin position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEvent = function (iGesturePanEvent) {
	 *	var gestureVectorFromOrigin = iGesturePanEvent.getVectorFromOrigin();
	 * };
	 */
	GesturePanEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	EventServices.registerEvent(GesturePanEvent);

	// Expose in EP namespace.
	EP.GesturePanEvent = GesturePanEvent;

	return GesturePanEvent;
});
