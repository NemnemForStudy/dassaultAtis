define('DS/EPInputs/EPTouchIdleEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPInputs/EPTouchEvent',
	'DS/MathematicsES/MathVector2DJSImpl'
], function (EP, EventServices, TouchEvent, Vector2D) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe an event generated from a touch device.</br>
	 * It contains information about the touch device.</br>
	 * It occurs when the user is idle while having a contact on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.TouchIdleEvent type on the EP.EventServices.</p>
	 * @alias EP.TouchIdleEvent
	 * @noinstancector
	 * @public
	 * @extends EP.TouchEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onTouchIdleEvent = function (iTouchIdleEvent) {
	 *	// user is touching the screen without moving
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.TouchIdleEvent, objectListener, 'onTouchIdleEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.TouchIdleEvent, objectListener, 'onTouchIdleEvent');
	 */
	var TouchIdleEvent = function () {

		TouchEvent.call(this);

		/**
         * Touch id.
         *
		 * @private
         * @type {number}
         */
		this.id = undefined;

		/**
         * The position in pixel of the contact on the viewer.
         *
		 * @private
         * @type {DSMath.Vector2D}
         */
	    this.position = new Vector2D();
	};

	TouchIdleEvent.prototype = Object.create(TouchEvent.prototype);
	TouchIdleEvent.prototype.constructor = TouchIdleEvent;
	TouchIdleEvent.prototype.type = 'TouchIdleEvent';

	/**
	 * Return the touch id.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onTouchIdleEvent = function (iTouchIdleEvent) {
	 *	if(iTouchIdleEvent.getId() === 0) {
	 *		// touch id 0 is idle
	 *	}
	 * };
	 */
	TouchIdleEvent.prototype.getId = function () {
		return this.id;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onTouchIdleEvent = function (iTouchIdleEvent) {
	 *	var touchPosition = iTouchIdleEvent.getPosition();
	 *	var touchWidth = touchPosition.x;
	 *	var touchHeight = touchPosition.y;
	 * };
	 */
	TouchIdleEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(TouchIdleEvent);

	// Expose in EP namespace.
	EP.TouchIdleEvent = TouchIdleEvent;

	return TouchIdleEvent;
});
