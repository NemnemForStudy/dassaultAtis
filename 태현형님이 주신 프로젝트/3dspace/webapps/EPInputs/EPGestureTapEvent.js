define('DS/EPInputs/EPGestureTapEvent', [
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
	 * It occurs when the user quickly makes and ceases a contact at the same position on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureTapEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureTapEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTapEvent = function (iGestureTapEvent) {
	 *	// user tapped on the touch device
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureTapEvent, objectListener, 'onGestureTapEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureTapEvent, objectListener, 'onGestureTapEvent');
	 */
	var GestureTapEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureTapEvent.prototype = Object.create(GestureEvent.prototype);
	GestureTapEvent.prototype.constructor = GestureTapEvent;
	GestureTapEvent.prototype.type = 'GestureTapEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTapEvent = function (iGestureTapEvent) {
	 *	var elapsedTime = iGestureTapEvent.getElapsedTime();
	 * };
	 */
	GestureTapEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTapEvent = function (iGestureTapEvent) {
	 *	var gesturePosition = iGestureTapEvent.getPosition();
	 * };
	 */
	GestureTapEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureTapEvent);

	// Expose in EP namespace.
	EP.GestureTapEvent = GestureTapEvent;

	return GestureTapEvent;
});
