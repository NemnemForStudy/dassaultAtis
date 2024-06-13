define('DS/EPInputs/EPGestureMediumHoldEvent', [
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
	 * It occurs when the user holds a finger on the touch device for at least a medium time.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureMediumHoldEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureMediumHoldEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureMediumHoldEvent = function (iGestureMediumHoldEvent) {
	 *	// user held the finger for at least a medium time
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureMediumHoldEvent, objectListener, 'onGestureMediumHoldEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureMediumHoldEvent, objectListener, 'onGestureMediumHoldEvent');
	 */
	var GestureMediumHoldEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureMediumHoldEvent.prototype = Object.create(GestureEvent.prototype);
	GestureMediumHoldEvent.prototype.constructor = GestureMediumHoldEvent;
	GestureMediumHoldEvent.prototype.type = 'GestureMediumHoldEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureMediumHoldEvent = function (iGestureMediumHoldEvent) {
	 *	var elapsedTime = iGestureMediumHoldEvent.getElapsedTime();
	 * };
	 */
	GestureMediumHoldEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureMediumHoldEvent = function (iGestureMediumHoldEvent) {
	 *	var gesturePosition = iGestureMediumHoldEvent.getPosition();
	 * };
	 */
	GestureMediumHoldEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureMediumHoldEvent);

	// Expose in EP namespace.
	EP.GestureMediumHoldEvent = GestureMediumHoldEvent;

	return GestureMediumHoldEvent;
});
