define('DS/EPInputs/EPMouseDisableEvent', ['DS/EP/EP', 'DS/EPEventServices/EPEventServices', 'DS/EPInputs/EPMouseEvent'], function (EP, EventServices, MouseEvent) {
    'use strict';

    /**
	 * @class
	 * @classdesc
	 * <p>Describe an event generated from a mouse.</br>
	 * It contains information about the mouse device.</br>
	 * It occurs when the mouse device becomes disabled.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.MouseDisableEvent type on the EP.EventServices.</p>
	 * @alias EP.MouseDisableEvent
	 * @noinstancector
	 * @public
	 * @extends EP.MouseEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onMouseDisableEvent = function (iMouseDisableEvent) {
	 *	// user disabled the mouse
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.MouseDisableEvent, objectListener, 'onMouseDisableEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.MouseDisableEvent, objectListener, 'onMouseDisableEvent');
	 */
    var MouseDisableEvent = function () {

    	MouseEvent.call(this);
    };

    MouseDisableEvent.prototype = Object.create(MouseEvent.prototype);
    MouseDisableEvent.prototype.constructor = MouseDisableEvent;
    MouseDisableEvent.prototype.type = 'MouseDisableEvent';

    EventServices.registerEvent(MouseDisableEvent);

    // Expose in EP namespace.
    EP.MouseDisableEvent = MouseDisableEvent;

    return MouseDisableEvent;
});
