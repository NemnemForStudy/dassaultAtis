define('DS/EPInputs/EPGestureMediumHoldBeginEvent', [
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
	 * It occurs when the user begins to hold a finger on the touch device for at least a medium time.</br>
	 * This event is dispatched before the first EP.GestureMediumHoldEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureMediumHoldBeginEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureMediumHoldBeginEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureMediumHoldBeginEvent = function (iGestureMediumHoldBeginEvent) {
	 *	// user began to hold the finger for at least a medium time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureMediumHoldBeginEvent, objectListener, 'onGestureMediumHoldBeginEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureMediumHoldBeginEvent, objectListener, 'onGestureMediumHoldBeginEvent');
	 */
	var GestureMediumHoldBeginEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureMediumHoldBeginEvent.prototype = Object.create(GestureEvent.prototype);
	GestureMediumHoldBeginEvent.prototype.constructor = GestureMediumHoldBeginEvent;
	GestureMediumHoldBeginEvent.prototype.type = 'GestureMediumHoldBeginEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureMediumHoldBeginEvent = function (iGestureMediumHoldBeginEvent) {
	 *	var elapsedTime = iGestureMediumHoldBeginEvent.getElapsedTime();
	 * };
	 */
	GestureMediumHoldBeginEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureMediumHoldBeginEvent = function (iGestureMediumHoldBeginEvent) {
	 *	var gesturePosition = iGestureMediumHoldBeginEvent.getPosition();
	 * };
	 */
	GestureMediumHoldBeginEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureMediumHoldBeginEvent);

	// Expose in EP namespace.
	EP.GestureMediumHoldBeginEvent = GestureMediumHoldBeginEvent;

	return GestureMediumHoldBeginEvent;
});
