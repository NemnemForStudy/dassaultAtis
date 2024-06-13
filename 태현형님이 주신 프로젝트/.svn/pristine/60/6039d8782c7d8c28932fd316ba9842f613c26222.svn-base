define('DS/EPInputsServicesWeb/EPMouseListener', [
	'UWA/Element',
	'DS/VisuEvents/EventsManager'
], function (UWAElement, EventsManager) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias MouseListener
	 * @private
	 * @param {InputsServices} iInputsServices
	 */
	var MouseListener = function (iInputsServices) {
		this.inputsServices = iInputsServices;
		this.registered = false;
		this.element = undefined;
	};

	MouseListener.prototype.constructor = MouseListener;

	/**
	 *
	 *
	 * @private
	 * @param {Element} iElement
	 * @return {boolean} true: success, false: failure
	 * @see MouseListener#unregister
	 */
	MouseListener.prototype.register = function (iElement) {
		var result = false;

		if (!this.registered) {
			this.element = iElement;

			this.mouseMoveCb = this.onMouseMove.bind(this);
			this.mousePressCb = this.onMousePress.bind(this);
			this.mouseReleaseCb = this.onMouseRelease.bind(this);
			this.mouseWheelCb = this.onMouseWheel.bind(this);

			EventsManager.addEvent(this.element, 'onMouseMove', this.mouseMoveCb);
			EventsManager.addEvent(this.element, 'onLeftMouseDown', this.mousePressCb);
			EventsManager.addEvent(this.element, 'onMiddleMouseDown', this.mousePressCb);
			EventsManager.addEvent(this.element, 'onRightMouseDown', this.mousePressCb);
			EventsManager.addEvent(this.element, 'onLeftMouseUp', this.mouseReleaseCb);
			EventsManager.addEvent(this.element, 'onMiddleMouseUp', this.mouseReleaseCb);
			EventsManager.addEvent(this.element, 'onRightMouseUp', this.mouseReleaseCb);
			EventsManager.addEvent(this.element, 'onMouseWheel', this.mouseWheelCb);

			this.registered = true;
			result = true;
		}

	    return result;
	};

	/**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see MouseListener#register
	 */
	MouseListener.prototype.unregister = function () {
		var result = false;

		if (this.registered) {
			EventsManager.removeEvent(this.element, 'onMouseMove', this.mouseMoveCb);
			EventsManager.removeEvent(this.element, 'onLeftMouseDown', this.mousePressCb);
			EventsManager.removeEvent(this.element, 'onMiddleMouseDown', this.mousePressCb);
			EventsManager.removeEvent(this.element, 'onRightMouseDown', this.mousePressCb);
			EventsManager.removeEvent(this.element, 'onLeftMouseUp', this.mouseReleaseCb);
			EventsManager.removeEvent(this.element, 'onMiddleMouseUp', this.mouseReleaseCb);
			EventsManager.removeEvent(this.element, 'onRightMouseUp', this.mouseReleaseCb);
			EventsManager.removeEvent(this.element, 'onMouseWheel', this.mouseWheelCb);

			delete this.mouseMoveCb;
			delete this.mousePressCb;
			delete this.mouseReleaseCb;
			delete this.mouseWheelCb;

			this.element = undefined;

			this.registered = false;
			result = true;
		}

		return result;
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	MouseListener.prototype.onMouseMove = function (iEvent) {
	    this.inputsServices.onMouseMove(iEvent.from[0].currentPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	MouseListener.prototype.onMousePress = function (iEvent) {
	    this.inputsServices.onMousePress(iEvent.gesture.button);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	MouseListener.prototype.onMouseRelease = function (iEvent) {
	    this.inputsServices.onMouseRelease(iEvent.gesture.button);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	MouseListener.prototype.onMouseWheel = function (iEvent) {
	    this.inputsServices.onMouseWheel(iEvent.gesture.delta);
	};

	return MouseListener;
});
