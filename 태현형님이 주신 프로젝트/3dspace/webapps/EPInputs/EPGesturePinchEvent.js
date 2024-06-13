define('DS/EPInputs/EPGesturePinchEvent', [
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
	 * It occurs when the user drags two fingers in the opposite direction on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GesturePinchEvent type on the EP.EventServices.</p>
	 * @alias EP.GesturePinchEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEvent = function (iGesturePinchEvent) {
	 *	// user dragged both fingers in the opposite direction
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GesturePinchEvent, objectListener, 'onGesturePinchEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GesturePinchEvent, objectListener, 'onGesturePinchEvent');
	 */
	var GesturePinchEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.distance = undefined;
	};

	GesturePinchEvent.prototype = Object.create(GestureEvent.prototype);
	GesturePinchEvent.prototype.constructor = GesturePinchEvent;
	GesturePinchEvent.prototype.type = 'GesturePinchEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEvent = function (iGesturePinchEvent) {
	 *	var elapsedTime = iGesturePinchEvent.getElapsedTime();
	 * };
	 */
	GesturePinchEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEvent = function (iGesturePinchEvent) {
	 *	var gestureFirstPosition = iGesturePinchEvent.getFirstPosition();
	 * };
	 */
	GesturePinchEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEvent = function (iGesturePinchEvent) {
	 *	var gestureSecondPosition = iGesturePinchEvent.getSecondPosition();
	 * };
	 */
	GesturePinchEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the distance in pixel between both contacts.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGesturePinchEvent = function (iGesturePinchEvent) {
	 *	var distance = iGesturePinchEvent.getDistance();
	 * };
	 */
	GesturePinchEvent.prototype.getDistance = function () {
		return this.distance;
	};

	EventServices.registerEvent(GesturePinchEvent);

	// Expose in EP namespace.
	EP.GesturePinchEvent = GesturePinchEvent;

	return GesturePinchEvent;
});
