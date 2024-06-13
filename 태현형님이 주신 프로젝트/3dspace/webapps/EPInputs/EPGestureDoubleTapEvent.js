define('DS/EPInputs/EPGestureDoubleTapEvent', [
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
	 * It occurs when the user quickly makes and ceases a contact twice at the same position on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureDoubleTapEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureDoubleTapEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDoubleTapEvent = function (iGestureDoubleTapEvent) {
	 *	// user double tapped
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureDoubleTapEvent, objectListener, 'onGestureDoubleTapEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureDoubleTapEvent, objectListener, 'onGestureDoubleTapEvent');
	 */
	var GestureDoubleTapEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.position = new Vector2D();
	};

	GestureDoubleTapEvent.prototype = Object.create(GestureEvent.prototype);
	GestureDoubleTapEvent.prototype.constructor = GestureDoubleTapEvent;
	GestureDoubleTapEvent.prototype.type = 'GestureDoubleTapEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDoubleTapEvent = function (iGestureDoubleTapEvent) {
	 *	var elapsedTime = iGestureDoubleTapEvent.getElapsedTime();
	 * };
	 */
	GestureDoubleTapEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureDoubleTapEvent = function (iGestureDoubleTapEvent) {
	 *	var gesturePosition = iGestureDoubleTapEvent.getPosition();
	 * };
	 */
	GestureDoubleTapEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(GestureDoubleTapEvent);

	// Expose in EP namespace.
	EP.GestureDoubleTapEvent = GestureDoubleTapEvent;

	return GestureDoubleTapEvent;
});
