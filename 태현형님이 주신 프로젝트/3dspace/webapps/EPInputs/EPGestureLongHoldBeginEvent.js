define('DS/EPInputs/EPGestureLongHoldBeginEvent', [
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
	 * It occurs when the user begins to hold a finger on the touch device for at least a long time.</br>
	 * This event is dispatched before the first EP.GestureLongHoldEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureLongHoldBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureLongHoldBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureLongHoldBeginEvent = function (iGestureLongHoldBeginEvent) {
	 *	// user began to hold the finger for at least a long time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureLongHoldBeginEvent, objectListener, 'onGestureLongHoldBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureLongHoldBeginEvent, objectListener, 'onGestureLongHoldBeginEvent');
	 */
	var GestureLongHoldBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureLongHoldBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GestureLongHoldBeginEvent.prototype.constructor = GestureLongHoldBeginEvent;
	GestureLongHoldBeginEvent.prototype.type = 'GestureLongHoldBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureLongHoldBeginEvent = function (iGestureLongHoldBeginEvent) {
	 *	var elapsedTime = iGestureLongHoldBeginEvent.getElapsedTime();
	 * };
	 */
	GestureLongHoldBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureLongHoldBeginEvent = function (iGestureLongHoldBeginEvent) {
	 *	var gesturePosition = iGestureLongHoldBeginEvent.getPosition();
	 * };
	 */
	GestureLongHoldBeginEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureLongHoldBeginEvent);

	// Expose in EP namespace.
	EP.GestureLongHoldBeginEvent = GestureLongHoldBeginEvent;

	return GestureLongHoldBeginEvent;
});
