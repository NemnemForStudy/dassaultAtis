define('DS/EPInputs/EPGestureTwoFingersRotateEvent', [
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
	 * It occurs when the user drags two fingers making a rotation on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.GestureTwoFingersRotateEvent type on the EP.EventServices.</p>
	 * @alias EP.GestureTwoFingersRotateEvent
	 * @noinstancector
	 * @public
	 * @extends EP.GestureEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	// user dragged both fingers making a rotation
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.GestureTwoFingersRotateEvent, objectListener, 'onGestureTwoFingersRotateEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.GestureTwoFingersRotateEvent, objectListener, 'onGestureTwoFingersRotateEvent');
	 */
	var GestureTwoFingersRotateEvent = function () {

		GestureEvent.call(this);

		this.elapsedTime = undefined;
		this.firstPosition = new Vector2D();
		this.secondPosition = new Vector2D();
		this.originVector = new Vector2D();
		this.lastVector = new Vector2D();
		this.vector = new Vector2D();
	};

	GestureTwoFingersRotateEvent.prototype = Object.create(GestureEvent.prototype);
	GestureTwoFingersRotateEvent.prototype.constructor = GestureTwoFingersRotateEvent;
	GestureTwoFingersRotateEvent.prototype.type = 'GestureTwoFingersRotateEvent';

	/**
	 * Return the elapsed time since the beginning of the gesture.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	var elapsedTime = iGestureTwoFingersRotateEvent.getElapsedTime();
	 * };
	 */
	GestureTwoFingersRotateEvent.prototype.getElapsedTime = function () {
		return this.elapsedTime;
	};

	/**
	 * Return the position in pixel of the first contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	var gestureFirstPosition = iGestureTwoFingersRotateEvent.getFirstPosition();
	 * };
	 */
	GestureTwoFingersRotateEvent.prototype.getFirstPosition = function () {
		return this.firstPosition.clone();
	};

	/**
	 * Return the position in pixel of the second contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	var gestureSecondPosition = iGestureTwoFingersRotateEvent.getSecondPosition();
	 * };
	 */
	GestureTwoFingersRotateEvent.prototype.getSecondPosition = function () {
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
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	var gestureOriginVector = iGestureTwoFingersRotateEvent.getOriginVector();
	 * };
	 */
	GestureTwoFingersRotateEvent.prototype.getOriginVector = function () {
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
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	var gestureLastVector = iGestureTwoFingersRotateEvent.getLastVector();
	 * };
	 */
	GestureTwoFingersRotateEvent.prototype.getLastVector = function () {
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
	 * objectListener.onGestureTwoFingersRotateEvent = function (iGestureTwoFingersRotateEvent) {
	 *	var gestureVector = iGestureTwoFingersRotateEvent.getVector();
	 * };
	 */
	GestureTwoFingersRotateEvent.prototype.getVector = function () {
		return this.vector.clone();
	};

	EventServices.registerEvent(GestureTwoFingersRotateEvent);

	// Expose in EP namespace.
	EP.GestureTwoFingersRotateEvent = GestureTwoFingersRotateEvent;

	return GestureTwoFingersRotateEvent;
});
