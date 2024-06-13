define('DS/EPInputs/EPMouseMoveEvent', [
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
	 * It occurs when the user moves the mouse cursor.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.MouseMoveEvent type on the EP.EventServices.</p>
	 * @alias EP.MouseMoveEvent
	 * @noinstancector
	 * @public
	 * @extends EP.MouseEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseMoveEvent = function (iMouseMoveEvent) {
	 *	// user moved the mouse
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.MouseMoveEvent, objectListener, 'onMouseMoveEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.MouseMoveEvent, objectListener, 'onMouseMoveEvent');
	 */
	var MouseMoveEvent = function () {

		MouseEvent.call(this);

		/**
         * The position in pixel of the cursor on the viewer.
         *
		 * @private
         * @type {DSMath.Vector2D}
         */
	    this.position = new Vector2D();

		/**
         * The delta position in pixel of the cursor on the viewer.</br>
	 	 * The delta position in pixel is the difference between the last position and the new position in pixel.
         *
		 * @private
         * @type {DSMath.Vector2D}
         */
	    this.deltaPosition = new Vector2D();

	};

	MouseMoveEvent.prototype = Object.create(MouseEvent.prototype);
	MouseMoveEvent.prototype.constructor = MouseMoveEvent;
	MouseMoveEvent.prototype.type = 'MouseMoveEvent';

	/**
	 * Return the position in pixel of the cursor on the viewer.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseMoveEvent = function (iMouseMoveEvent) {
	 *	var mousePosition = iMouseMoveEvent.getPosition();
	 *	var mouseWidth = mousePosition.x;
	 *	var mouseHeight = mousePosition.y;
	 * };
	 */
	MouseMoveEvent.prototype.getPosition = function () {
		return this.position.clone();
	};

	/**
	 * Return the delta position in pixel of the cursor on the viewer.</br>
	 * The delta position in pixel is the difference between the last position and the new position in pixel.
	 *
	 * @public
	 * @return {DSMath.Vector2D}
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseMoveEvent = function (iMouseMoveEvent) {
	 *	var mouseDeltaPosition = iMouseMoveEvent.getDeltaPosition();
	 *	var mouseDeltaWidth = mouseDeltaPosition.x;
	 *	var mouseDeltaHeight = mouseDeltaPosition.y;
	 * };
	 */
	MouseMoveEvent.prototype.getDeltaPosition = function () {
		return this.deltaPosition.clone();
	};

	EventServices.registerEvent(MouseMoveEvent);

	// Expose in EP namespace.
	EP.MouseMoveEvent = MouseMoveEvent;

	return MouseMoveEvent;
});
