define('DS/EPInputs/EPMouseClickEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPInputs/EPMouseEvent',
	'DS/MathematicsES/MathVector2DJSImpl'
], function (EP, EventServices, MouseEvent, Vector2D) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe an event generated from a mouse.</br>
	 * It contains information about the mouse device.</br>
	 * It occurs when the user presses and releases a mouse button with the cursor at the same position.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.MouseClickEvent type on the EP.EventServices.</p>
	 * @alias EP.MouseClickEvent
	 * @noinstancector
	 * @public
	 * @extends EP.MouseEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseClickEvent = function (iMouseClickEvent) {
	 *	// user clicked on a mouse button
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.MouseClickEvent, objectListener, 'onMouseClickEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.MouseClickEvent, objectListener, 'onMouseClickEvent');
	 */
	var MouseClickEvent = function () {

		MouseEvent.call(this);

		/**
         * Mouse Button ID.
         *
		 * @private
         * @type {EP.Mouse.EButton}
         */
		this.button = undefined;

		/**
         * The position in pixel of the cursor on the viewer.
         *
		 * @private
         * @type {DSMath.Vector2D}
         */
	    this.position = new Vector2D();

	};

	MouseClickEvent.prototype = Object.create(MouseEvent.prototype);
	MouseClickEvent.prototype.constructor = MouseClickEvent;
	MouseClickEvent.prototype.type = 'MouseClickEvent';

	/**
	 * Return the Mouse Button ID.
	 *
	 * @public
	 * @return {EP.Mouse.EButton}
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseClickEvent = function (iMouseClickEvent) {
	 *	if(iMouseClickEvent.getButton() === EP.Mouse.EButton.eLeft) {
	 *		// left button has been clicked
	 *	}
	 * };
	 */
	MouseClickEvent.prototype.getButton = function () {
		return this.button;
	};

	/**
	 * Return the position in pixel of the cursor on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseClickEvent = function (iMouseClickEvent) {
	 *	var mousePosition = iMouseClickEvent.getPosition();
	 *	var mouseWidth = mousePosition.x;
	 *	var mouseHeight = mousePosition.y;
	 * };
	 */
	MouseClickEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	EventServices.registerEvent(MouseClickEvent);

	// Expose in EP namespace.
	EP.MouseClickEvent = MouseClickEvent;

	return MouseClickEvent;
});
