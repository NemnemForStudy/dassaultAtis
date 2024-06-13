define('DS/EPInputs/EPMultiTouchEvent', [
	'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
	'DS/EPEventServices/EPEvent',
	'DS/EPInputs/EPTouchMoveEvent',
	'DS/MathematicsES/MathVector2DJSImpl'
], function (EP, EventServices, Event, TouchMoveEvent, Vector2D) {
	'use strict';

	/**
	 * @class
	 * @classdesc
	 * <p>Describe an event generated from a touch device.</br>
	 * It contains information about the touch device.</br>
	 * It occurs when there is at least one EP.TouchEvent dispatched.</p>
	 *
	 * <p>This event has specific extensions class and there are all dispatched globally on the EP.EventServices.</br>
	 * In order to get notified, you need to add a listener as EP.MultiTouchEvent type on the EP.EventServices.</p>
	 * @alias EP.MultiTouchEvent
	 * @noinstancector
	 * @public
	 * @extends EP.Event
	 * @example
	 * var objectListener = {};
	 * objectListener.onMultiTouchEvent = function (iMultiTouchEvent) {
	 *	// user manipulated the touch device
	 * };
	 * // Add Listener to get notified
	 * EP.EventServices.addObjectListener(EP.MultiTouchEvent, objectListener, 'onMultiTouchEvent');
	 * // Remove Listener when you don't need it anymore
	 * EP.EventServices.removeObjectListener(EP.MultiTouchEvent, objectListener, 'onMultiTouchEvent');
	 */
	var MultiTouchEvent = function () {

		Event.call(this);

		/**
         * Touch device
         *
		 * @private
         * @type {EP.Touch}
         */
		this.touch = EP.Devices.getTouch();

		/**
         * Touch event list
         *
		 * @private
         * @type {Array.<EP.TouchEvent>}
         */
		this.touchEventList = getTouchEventListFromParameters.call(this, arguments[0]);
	};

	MultiTouchEvent.prototype = Object.create(Event.prototype);
	MultiTouchEvent.prototype.constructor = MultiTouchEvent;
	MultiTouchEvent.prototype.type = 'MultiTouchEvent';

	var getTouchEventListFromParameters = function (iParameters) {
		var touchEventList = [];

		var TouchEventCtor;
		var newEvt;
		var id, position, deltaPosition;
		for (var et = 0; et < iParameters.eventTypes.length; et++) {
			TouchEventCtor = EventServices.getEventByType(iParameters.eventTypes[et]);
			id = iParameters.ids[et];
			position = new Vector2D();
			position.x = iParameters.positions[et].x;
			position.y = iParameters.positions[et].y;

			if (iParameters.eventTypes[et] === TouchMoveEvent.prototype.type) {
				deltaPosition = Vector2D.sub(position, this.touch.positionsById[id]);
				newEvt = new TouchEventCtor();
				newEvt.deltaPosition = deltaPosition;
			}
			else {
				newEvt = new TouchEventCtor();
			}

			newEvt.id = id;
			newEvt.position = position;
			touchEventList.push(newEvt);
		}

		return touchEventList;
	};

	/**
	 * Return the touch device.
	 *
	 * @public
	 * @return {EP.Touch}
	 * @example
	 * var objectListener = {};
	 * objectListener.onMultiTouchEvent = function (iMultiTouchEvent) {
	 *	var touch = iMultiTouchEvent.getTouch();
	 * };
	 */
	MultiTouchEvent.prototype.getTouch = function () {
		return this.touch;
	};

	/**
	 * Return the touch event list.
	 *
	 * @public
	 * @return {Array.<EP.TouchEvent>}
	 * @example
	 * var objectListener = {};
	 * objectListener.onMultiTouchEvent = function (iMultiTouchEvent) {
	 *	var touchEventList = iMultiTouchEvent.getTouchEventList();
	 * };
	 */
	MultiTouchEvent.prototype.getTouchEventList = function () {
		return this.touchEventList.slice();
	};

	EventServices.registerEvent(MultiTouchEvent);

	// Expose in EP namespace.
	EP.MultiTouchEvent = MultiTouchEvent;

	return MultiTouchEvent;
});
