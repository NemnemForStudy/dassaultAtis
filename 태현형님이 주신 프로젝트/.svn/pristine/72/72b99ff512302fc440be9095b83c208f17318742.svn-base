define('DS/EPInputs/EPGesturePanBeginEvent', [
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
	 * It occurs when the user begins to drag two fingers in the same direction on the touch device.</br>
	 * This event is dispatched before the first EP.GesturePanEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GesturePanBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GesturePanBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanBeginEvent = function (iGesturePanBeginEvent) {
	 *	// user began to drag both fingers in the same direction
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GesturePanBeginEvent, objectListener, 'onGesturePanBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GesturePanBeginEvent, objectListener, 'onGesturePanBeginEvent');
	 */
	var GesturePanBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.deltaPosition = new Vector2D();
		this.vectorFromOrigin = new Vector2D();
	};

	GesturePanBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GesturePanBeginEvent.prototype.constructor = GesturePanBeginEvent;
	GesturePanBeginEvent.prototype.type = 'GesturePanBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanBeginEvent = function (iGesturePanBeginEvent) {
	 *	var elapsedTime = iGesturePanBeginEvent.getElapsedTime();
	 * };
	 */
	GesturePanBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanBeginEvent = function (iGesturePanBeginEvent) {
	 *	var gestureFirstPosition = iGesturePanBeginEvent.getFirstPosition();
	 * };
	 */
	GesturePanBeginEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePanBeginEvent = function (iGesturePanBeginEvent) {
	 *	var gestureSecondPosition = iGesturePanBeginEvent.getSecondPosition();
	 * };
	 */
	GesturePanBeginEvent.prototype.getSecondPosition = function () {
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
	 * objectListener.onGesturePanBeginEvent = function (iGesturePanBeginEvent) {
	 *	var gestureDeltaPosition = iGesturePanBeginEvent.getDeltaPosition();
	 * };
	 */
	GesturePanBeginEvent.prototype.getDeltaPosition = function () {
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
	 * objectListener.onGesturePanBeginEvent = function (iGesturePanBeginEvent) {
	 *	var gestureVectorFromOrigin = iGesturePanBeginEvent.getVectorFromOrigin();
	 * };
	 */
	GesturePanBeginEvent.prototype.getVectorFromOrigin = function () {
		return this.vectorFromOrigin.clone();
	};

	EventServices.registerEvent(GesturePanBeginEvent);

	// Expose in EP namespace.
	EP.GesturePanBeginEvent = GesturePanBeginEvent;

	return GesturePanBeginEvent;
});
