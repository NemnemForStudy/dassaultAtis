define('DS/EPInputs/EPDeviceEnableEvent', ['DS/EP/EP', 'DS/EPEventServices/EPEventServices', 'DS/EPInputs/EPDevice', 'DS/EPInputs/EPDeviceEvent'], function (EP, EventServices, Device, DeviceEvent) {
    'use strict';

    /**
	 * @class
	 * @classdesc
	 * <p>Describe an event generated from a device.</br>
	 * It contains information about the device.</br>
	 * It occurs when the device becomes enabled.</p>
	 *
	 * <p>This event is dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.DeviceEnableEvent type on the EP.EventServices.</p>
	 * @alias EP.DeviceEnableEvent
	 * @noinstancector
	 * @public
	 * @extends EP.DeviceEvent
	 * @example
	 * var objectListener = {};
	 * objectListener.onDeviceEnableEvent = function (iDeviceEnableEvent) {
	 *	// user enabled the device
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.DeviceEnableEvent, objectListener, 'onDeviceEnableEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.DeviceEnableEvent, objectListener, 'onDeviceEnableEvent');
	 */
    var DeviceEnableEvent = function () {

    	DeviceEvent.call(this, arguments[0]);

    	this.device = new Device(arguments[0].index, arguments[0].buttonNames, arguments[0].axisNames, arguments[0].trackerNames);
    };

    DeviceEnableEvent.prototype = Object.create(DeviceEvent.prototype);
    DeviceEnableEvent.prototype.constructor = DeviceEnableEvent;
    DeviceEnableEvent.prototype.type = 'DeviceEnableEvent';

    EventServices.registerEvent(DeviceEnableEvent);

    // Expose in EP namespace.
    EP.DeviceEnableEvent = DeviceEnableEvent;

    return DeviceEnableEvent;
});
