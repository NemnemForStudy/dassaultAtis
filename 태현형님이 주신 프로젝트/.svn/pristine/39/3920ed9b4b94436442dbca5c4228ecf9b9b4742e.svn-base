define('DS/EPInputs/EPTouchPressEvent', [
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
	 * It occurs when the user makes a contact on the touch device.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.TouchPressEvent type on the EP.EventServices.</p>
	 * @alias EP.TouchPressEvent
	 * @noinstancector
	 * @public
	 * @extends EP.TouchEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onTouchPressEvent = function (iTouchPressEvent) {
	 *	// user pressed on the touch device
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.TouchPressEvent, objectListener, 'onTouchPressEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.TouchPressEvent, objectListener, 'onTouchPressEvent');
	 */
	var TouchPressEvent = function () {

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

	TouchPressEvent.prototype = Object.create(TouchEvent.prototype);
	TouchPressEvent.prototype.constructor = TouchPressEvent;
	TouchPressEvent.prototype.type = 'TouchPressEvent';

	/**
	 * Return the touch id.
	 *
	 * @public
	 * @return {number}
	 * @example
	 * var objectListener = {};
	 * objectListener.onTouchPressEvent = function (iTouchPressEvent) {
	 *	if(iTouchPressEvent.getId() === 0) {
	 *		// touch id 0 has been pressed
	 *	}
	 * };
	 */
	TouchPressEvent.prototype.getId = function () {
		return this.id;
	};

	/**
	 * Return the position in pixel of the contact on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onTouchPressEvent = function (iTouchPressEvent) {
	 *	var touchPosition = iTouchPressEvent.getPosition();
	 *	var touchWidth = touchPosition.x;
	 *	var touchHeight = touchPosition.y;
	 * };
	 */
	TouchPressEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(TouchPressEvent);

	// Expose in EP namespace.
	EP.TouchPressEvent = TouchPressEvent;

	return TouchPressEvent;
});
