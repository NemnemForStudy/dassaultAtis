define('DS/EPInputs/EPGestureFlickEvent', [
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
	 * It occurs when the user quickly drags a finger in a direction on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureFlickEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureFlickEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureFlickEvent = function (iGestureFlickEvent) {
	 *	// user quickly dragged the finger
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureFlickEvent, objectListener, 'onGestureFlickEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureFlickEvent, objectListener, 'onGestureFlickEvent');
	 */
	var GestureFlickEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.vector = new Vector2D();
		this.duration = undefined;
	};

	GestureFlickEvent.prototype = Object.create(GestureEvent.prototype);
	GestureFlickEvent.prototype.constructor = GestureFlickEvent;
	GestureFlickEvent.prototype.type = 'GestureFlickEvent';

	/**
	 * Return the elapsed time since the start of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureFlickEvent = function (iGestureFlickEvent) {
	 *	var elapsedTime = iGestureFlickEvent.getElapsedTime();
	 * };
	 */
	GestureFlickEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the vector in pixel of the contact on the viewer.</br>
	 * The vector in pixel is the difference between the start and the end position of the flick in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureFlickEvent = function (iGestureFlickEvent) {
	 *	var gestureVector = iGestureFlickEvent.getVector();
	 * };
	 */
	GestureFlickEvent.prototype.getVector = function () {
		return this.vector.clone();
	};

	/**
	 * Return the time since the start of the flick detection.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureFlickEvent = function (iGestureFlickEvent) {
	 *	var duration = iGestureFlickEvent.getDuration();
	 * };
	 */
	GestureFlickEvent.prototype.getDuration = function () {
		return this.duration;
	};

	EventServices.registerEvent(GestureFlickEvent);

	// Expose in EP namespace.
	EP.GestureFlickEvent = GestureFlickEvent;

	return GestureFlickEvent;
});
