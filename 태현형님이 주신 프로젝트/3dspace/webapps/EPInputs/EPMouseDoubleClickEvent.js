define('DS/EPInputs/EPMouseDoubleClickEvent', ['DS/EP/EP', 'DS/EPEventServices/EPEventServices', 'DS/EPInputs/EPMouseClickEvent'], function (EP, EventServices, MouseClickEvent) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe an event generated from a mouse.</br>
	 * It contains information about the mouse device.</br>
	 * It occurs when the user quickly presses and releases a mouse button twice with the cursor at the same position.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.MouseDoubleClickEvent type on the EP.EventServices.</p>
	 * @alias EP.MouseDoubleClickEvent
	 * @noinstancector
	 * @public
	 * @extends EP.MouseClickEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseDoubleClickEvent = function (iMouseDoubleClickEvent) {
	 *	// user double clicked on a mouse button
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.MouseDoubleClickEvent, objectListener, 'onMouseDoubleClickEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.MouseDoubleClickEvent, objectListener, 'onMouseDoubleClickEvent');
	 */
	var MouseDoubleClickEvent = function () {

		MouseClickEvent.call(this);
	};

	MouseDoubleClickEvent.prototype = Object.create(MouseClickEvent.prototype);
	MouseDoubleClickEvent.prototype.constructor = MouseDoubleClickEvent;
	MouseDoubleClickEvent.prototype.type = 'MouseDoubleClickEvent';

	EventServices.registerEvent(MouseDoubleClickEvent);

	// Expose in EP namespace.
	EP.MouseDoubleClickEvent = MouseDoubleClickEvent;

	return MouseDoubleClickEvent;
});
