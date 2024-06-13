define('DS/EPInputs/EPGesturePanEndEvent', [
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
	 * It occurs when the user ends to drag two fingers in the same direction on the touch device.</br>
	 * This event is dispatched after the last EP.GesturePanEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GesturePanEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GesturePanEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEndEvent = function (iGesturePanEndEvent) {
	 *	// user ended to drag both fingers in the same direction
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GesturePanEndEvent, objectListener, 'onGesturePanEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GesturePanEndEvent, objectListener, 'onGesturePanEndEvent');
	 */
	var GesturePanEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
	};

	GesturePanEndEvent.prototype = Object.create(GestureEvent.prototype);
	GesturePanEndEvent.prototype.constructor = GesturePanEndEvent;
	GesturePanEndEvent.prototype.type = 'GesturePanEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEndEvent = function (iGesturePanEndEvent) {
	 *	var elapsedTime = iGesturePanEndEvent.getElapsedTime();
	 * };
	 */
	GesturePanEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEndEvent = function (iGesturePanEndEvent) {
	 *	var gestureFirstPosition = iGesturePanEndEvent.getFirstPosition();
	 * };
	 */
	GesturePanEndEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanEndEvent = function (iGesturePanEndEvent) {
	 *	var gestureSecondPosition = iGesturePanEndEvent.getSecondPosition();
	 * };
	 */
	GesturePanEndEvent.prototype.getSecondPosition = function () {
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
	 * objectListener.onGesturePanEndEvent = function (iGesturePanEndEvent) {
	 *	var gestureDeltaPosition = iGesturePanEndEvent.getDeltaPosition();
	 * };
	 */
	GesturePanEndEvent.prototype.getDeltaPosition = function () {
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
	 * objectListener.onGesturePanEndEvent = function (iGesturePanEndEvent) {
	 *	var gestureVectorFromOrigin = iGesturePanEndEvent.getVectorFromOrigin();
	 * };
	 */
	GesturePanEndEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	EventServices.registerEvent(GesturePanEndEvent);

	// Expose in EP namespace.
	EP.GesturePanEndEvent = GesturePanEndEvent;

	return GesturePanEndEvent;
});
