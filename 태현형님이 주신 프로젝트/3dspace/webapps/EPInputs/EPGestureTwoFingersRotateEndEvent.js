define('DS/EPInputs/EPGestureTwoFingersRotateEndEvent', [
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
	 * It occurs when the user ends to drag two fingers making a rotation on the touch device.</br>
	 * This event is dispatched after the last EP.GestureTwoFingersRotateEvent and the information is identical.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureTwoFingersRotateEndEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureTwoFingersRotateEndEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	// user ended to drag both fingers making a rotation
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureTwoFingersRotateEndEvent, objectListener, 'onGestureTwoFingersRotateEndEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureTwoFingersRotateEndEvent, objectListener, 'onGestureTwoFingersRotateEndEvent');
	 */
	var GestureTwoFingersRotateEndEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.originVector = new Vector2D();
		this.lastVector = new Vector2D();
		this.vector = new Vector2D();
	};

	GestureTwoFingersRotateEndEvent.prototype = Object.create(GestureEvent.prototype);
	GestureTwoFingersRotateEndEvent.prototype.constructor = GestureTwoFingersRotateEndEvent;
	GestureTwoFingersRotateEndEvent.prototype.type = 'GestureTwoFingersRotateEndEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	var elapsedTime = iGestureTwoFingersRotateEndEvent.getElapsedTime();
	 * };
	 */
	GestureTwoFingersRotateEndEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	var gestureFirstPosition = iGestureTwoFingersRotateEndEvent.getFirstPosition();
	 * };
	 */
	GestureTwoFingersRotateEndEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	var gestureSecondPosition = iGestureTwoFingersRotateEndEvent.getSecondPosition();
	 * };
	 */
	GestureTwoFingersRotateEndEvent.prototype.getSecondPosition = function () {
		return this.secondPosition.clone();
	};

	/**
	 * Return the origin vector in pixel between both contacts on the viewer.</br>
	 * The origin vector in pixel is the difference between the origin position of the first contact and the origin position of the second contact in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	var gestureOriginVector = iGestureTwoFingersRotateEndEvent.getOriginVector();
	 * };
	 */
	GestureTwoFingersRotateEndEvent.prototype.getOriginVector = function () {
		return this.originVector.clone();
	};

	/**
	 * Return the last vector in pixel between both contacts on the viewer.</br>
	 * The last vector in pixel is the difference between the last position of the first contact and the last position of the second contact in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	var gestureLastVector = iGestureTwoFingersRotateEndEvent.getLastVector();
	 * };
	 */
	GestureTwoFingersRotateEndEvent.prototype.getLastVector = function () {
		return this.lastVector.clone();
	};

	/**
	 * Return the vector in pixel between both contacts on the viewer.</br>
	 * The vector in pixel is the difference between the new position of the first contact and the new position of the second contact in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEndEvent = function (iGestureTwoFingersRotateEndEvent) {
	 *	var gestureVector = iGestureTwoFingersRotateEndEvent.getVector();
	 * };
	 */
	GestureTwoFingersRotateEndEvent.prototype.getVector = function () {
		return this.vector.clone();
	};

	EventServices.registerEvent(GestureTwoFingersRotateEndEvent);

	// Expose in EP namespace.
	EP.GestureTwoFingersRotateEndEvent = GestureTwoFingersRotateEndEvent;

	return GestureTwoFingersRotateEndEvent;
});
