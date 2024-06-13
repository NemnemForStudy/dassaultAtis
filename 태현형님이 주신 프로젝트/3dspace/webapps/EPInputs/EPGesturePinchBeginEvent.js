define('DS/EPInputs/EPGesturePinchBeginEvent', [
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
	 * It occurs when the user begins to drag two fingers in the opposite direction on the touch device.</br>
	 * This event is dispatched before the first EP.GesturePinchEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GesturePinchBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GesturePinchBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchBeginEvent = function (iGesturePinchBeginEvent) {
	 *	// user began to drag both fingers in the opposite direction
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GesturePinchBeginEvent, objectListener, 'onGesturePinchBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GesturePinchBeginEvent, objectListener, 'onGesturePinchBeginEvent');
	 */
	var GesturePinchBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.distance = undefined;
	};

	GesturePinchBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GesturePinchBeginEvent.prototype.constructor = GesturePinchBeginEvent;
	GesturePinchBeginEvent.prototype.type = 'GesturePinchBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchBeginEvent = function (iGesturePinchBeginEvent) {
	 *	var elapsedTime = iGesturePinchBeginEvent.getElapsedTime();
	 * };
	 */
	GesturePinchBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchBeginEvent = function (iGesturePinchBeginEvent) {
	 *	var gestureFirstPosition = iGesturePinchBeginEvent.getFirstPosition();
	 * };
	 */
	GesturePinchBeginEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchBeginEvent = function (iGesturePinchBeginEvent) {
	 *	var gestureSecondPosition = iGesturePinchBeginEvent.getSecondPosition();
	 * };
	 */
	GesturePinchBeginEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the distance in pixel between both contacts.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchBeginEvent = function (iGesturePinchBeginEvent) {
	 *	var distance = iGesturePinchBeginEvent.getDistance();
	 * };
	 */
	GesturePinchBeginEvent.prototype.getDistance = function () {
		return this.distance;
	};

	EventServices.registerEvent(GesturePinchBeginEvent);

	// Expose in EP namespace.
	EP.GesturePinchBeginEvent = GesturePinchBeginEvent;

	return GesturePinchBeginEvent;
});
