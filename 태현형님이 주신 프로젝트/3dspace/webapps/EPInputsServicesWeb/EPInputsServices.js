define('DS/EPInputsServicesWeb/EPInputsServices', [
    'DS/EPInputsServicesWeb/EPKeyboardListener',
    'DS/EPInputsServicesWeb/EPMouseListener',
	'DS/EPInputsServicesWeb/EPTouchListener',
	'DS/EPInputsServicesWeb/EPGestureListener',
    'DS/EPInputsServicesWeb/EPGamepadListener',
	'DS/EPInputs/EPDevices'
], function (KeyboardListener, MouseListener, TouchListener, GestureListener, GamepadListener, Devices) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias InputsServices
	 * @private
	 */
	var InputsServices = function () {
		this.keyboardListener = undefined;
		this.mouseListener = undefined;
		this.touchListener = undefined;
		this.gestureListener = undefined;
		this.gamepadListener = undefined;
	};

	InputsServices.prototype.constructor = InputsServices;

    /**
	 *
	 *
	 * @private
	 * @param {Element} iElement
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#disableKeyboard
	 */
	InputsServices.prototype.enableKeyboard = function (iElement) {
		var result = false;

		if (!(iElement instanceof Element)) {
			throw new TypeError('iElement argument is not a Element');
	    }

	    if (this.keyboardListener === undefined) {
	        this.keyboardListener = new KeyboardListener(this);
	        result = this.keyboardListener.register(iElement);
	        if (result) {
	        	this.onKeyboardEnable();
	        }
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#enableKeyboard
	 */
	InputsServices.prototype.disableKeyboard = function () {
		var result = false;

	    if (this.keyboardListener !== undefined) {
	    	result = this.keyboardListener.unregister();
	    	if (result) {
	    		this.onKeyboardDisable();
	    	}
	        this.keyboardListener = undefined;
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @param {Element} iElement
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#disableMouse
	 */
	InputsServices.prototype.enableMouse = function (iElement) {
		var result = false;

		if (!(iElement instanceof Element)) {
			throw new TypeError('iElement argument is not a Element');
		}

	    if (this.mouseListener === undefined) {
	        this.mouseListener = new MouseListener(this);
	        result = this.mouseListener.register(iElement);
	        if (result) {
	        	this.onMouseEnable();
	        }
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#enableMouse
	 */
	InputsServices.prototype.disableMouse = function () {
		var result = false;

	    if (this.mouseListener !== undefined) {
	    	result = this.mouseListener.unregister();
	    	if (result) {
	    		this.onMouseDisable();
	    	}
	        this.mouseListener = undefined;
	    }

	    return result;
	};

	/**
	 *
	 *
	 * @private
	 * @param {Element} iElement
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#disableTouch
	 */
	InputsServices.prototype.enableTouch = function (iElement) {
		var result = false;

		if (!(iElement instanceof Element)) {
			throw new TypeError('iElement argument is not a Element');
		}

	    if (this.touchListener === undefined) {
	        this.touchListener = new TouchListener(this);
	        result = this.touchListener.register(iElement);
	        if (result) {
	        	this.onTouchEnable();
	        }
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#enableTouch
	 */
	InputsServices.prototype.disableTouch = function () {
		var result = false;

	    if (this.touchListener !== undefined) {
	    	result = this.touchListener.unregister();
	    	if (result) {
	    		this.onTouchDisable();
	    	}
			this.touchListener = undefined;
	    }

	    return result;
	};

	/**
	 *
	 *
	 * @private
	 * @param {Element} iElement
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#disableGesture
	 */
	InputsServices.prototype.enableGesture = function (iElement) {
		var result = false;

		if (!(iElement instanceof Element)) {
			throw new TypeError('iElement argument is not a Element');
		}

	    if (this.gestureListener === undefined) {
	        this.gestureListener = new GestureListener(this);
	        result = this.gestureListener.register(iElement);
	        if (result) {
	        	this.onGestureEnable();
	        }
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#enableGesture
	 */
	InputsServices.prototype.disableGesture = function () {
		var result = false;

	    if (this.gestureListener !== undefined) {
	    	result = this.gestureListener.unregister();
	    	if (result) {
	    		this.onGestureDisable();
	    	}
			this.gestureListener = undefined;
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#disableGamepad
	 */
	InputsServices.prototype.enableGamepad = function () {
		var result = false;

	    if (this.gamepadListener === undefined) {
	        this.gamepadListener = new GamepadListener(this);
	        result = this.gamepadListener.register();
	        if (result) {
	        	this.onGamepadEnable();
	        }
	    }

	    return result;
	};

    /**
	 *
	 *
	 * @private
	 * @return {boolean} true: success, false: failure
	 * @see InputsServices#enableGamepad
	 */
	InputsServices.prototype.disableGamepad = function () {
		var result = false;

	    if (this.gamepadListener !== undefined) {
	    	result = this.gamepadListener.unregister();
	    	if (result) {
	    		this.onGamepadDisable();
	    	}
	        this.gamepadListener = undefined;
	    }

	    return result;
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onMouseEnable = function () {
		Devices.sendMouseEnableEvent();
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onMouseDisable = function () {
		Devices.sendMouseDisableEvent();
	};

	/**
	 *
	 *
	 * @private
	 * @param {{x: number, y: number}} iPosition
	 */
	InputsServices.prototype.onMouseMove = function (iPosition) {
		Devices.sendMouseMoveEvent(iPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {EP.Mouse.EButton} iButton
	 */
	InputsServices.prototype.onMousePress = function (iButton) {
		Devices.sendMousePressEvent(iButton);
	};

	/**
	 *
	 *
	 * @private
	 * @param {EP.Mouse.EButton} iButton
	 */
	InputsServices.prototype.onMouseRelease = function (iButton) {
		Devices.sendMouseReleaseEvent(iButton);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iWheelDeltaValue
	 */
	InputsServices.prototype.onMouseWheel = function (iWheelDeltaValue) {
		Devices.sendMouseWheelEvent(iWheelDeltaValue);
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onTouchEnable = function () {
		Devices.sendTouchEnableEvent();
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onTouchDisable = function () {
		Devices.sendTouchDisableEvent();
	};

	/**
	 *
	 *
	 * @private
	 * @param {Array.<string>} iEventTypeList
	 * @param {Array.<number>} iIdList
	 * @param {Array.<{x: number, y: number}>} iPositionList
	 */
	InputsServices.prototype.onMultiTouch = function (iEventTypeList, iIdList, iPositionList) {
		Devices.sendMultiTouchEvent(iEventTypeList, iIdList, iPositionList);
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onGestureEnable = function () {
		Devices.sendGestureEnableEvent();
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onGestureDisable = function () {
		Devices.sendGestureDisableEvent();
	};

	/**
	 *
	 *
	 * @private
	 * @param {Array.<string>} iEventTypeList
	 * @param {Array.<{x: number, y: number}>} iPositionList
	 */
	InputsServices.prototype.onGestureMultiTouch = function (iEventTypeList, iPositionList) {
		Devices.sendGestureMultiTouchEvent(iEventTypeList, iPositionList);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iPosition
	 */
	InputsServices.prototype.onGestureTap = function (iElapsedTime, iPosition) {
		Devices.sendGestureTapEvent(iElapsedTime, iPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iPosition
	 */
	InputsServices.prototype.onGestureDoubleTap = function (iElapsedTime, iPosition) {
		Devices.sendGestureDoubleTapEvent(iElapsedTime, iPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iPosition
	 */
	InputsServices.prototype.onGestureHold = function (iElapsedTime, iPosition) {
		Devices.sendGestureHoldEvent(iElapsedTime, iPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iPosition
	 */
	InputsServices.prototype.onGestureMediumHold = function (iElapsedTime, iPosition) {
		Devices.sendGestureMediumHoldEvent(iElapsedTime, iPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iPosition
	 */
	InputsServices.prototype.onGestureLongHold = function (iElapsedTime, iPosition) {
		Devices.sendGestureLongHoldEvent(iElapsedTime, iPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iPosition
	 * @param {{x: number, y: number}} iDeltaPosition
	 * @param {{x: number, y: number}} iVectorFromOrigin
	 */
	InputsServices.prototype.onGestureDrag = function (iElapsedTime, iPosition, iDeltaPosition, iVectorFromOrigin) {
		Devices.sendGestureDragEvent(iElapsedTime, iPosition, iDeltaPosition, iVectorFromOrigin);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iVector
	 * @param {number} iDuration
	 */
	InputsServices.prototype.onGestureFlick = function (iElapsedTime, iVector, iDuration) {
		Devices.sendGestureFlickEvent(iElapsedTime, iVector, iDuration);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iFirstPosition
	 * @param {{x: number, y: number}} iSecondPosition
	 * @param {{x: number, y: number}} iDeltaPosition
	 * @param {{x: number, y: number}} iVectorFromOrigin
	 */
	InputsServices.prototype.onGesturePan = function (iElapsedTime, iFirstPosition, iSecondPosition, iDeltaPosition, iVectorFromOrigin) {
		Devices.sendGesturePanEvent(iElapsedTime, iFirstPosition, iSecondPosition, iDeltaPosition, iVectorFromOrigin);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iFirstPosition
	 * @param {{x: number, y: number}} iSecondPosition
	 * @param {number} iDistance
	 */
	InputsServices.prototype.onGesturePinch = function (iElapsedTime, iFirstPosition, iSecondPosition, iDistance) {
		Devices.sendGesturePinchEvent(iElapsedTime, iFirstPosition, iSecondPosition, iDistance);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iFirstPosition
	 * @param {{x: number, y: number}} iSecondPosition
	 * @param {{x: number, y: number}} iOriginVector
	 * @param {{x: number, y: number}} iLastVector
	 * @param {{x: number, y: number}} iVector
	 */
	InputsServices.prototype.onGestureTwoFingersRotate = function (iElapsedTime, iFirstPosition, iSecondPosition, iOriginVector, iLastVector, iVector) {
		Devices.sendGestureTwoFingersRotateEvent(iElapsedTime, iFirstPosition, iSecondPosition, iOriginVector, iLastVector, iVector);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iFirstPosition
	 * @param {{x: number, y: number}} iSecondPosition
	 */
	InputsServices.prototype.onGestureTwoFingersTap = function (iElapsedTime, iFirstPosition, iSecondPosition) {
		Devices.sendGestureTwoFingersTapEvent(iElapsedTime, iFirstPosition, iSecondPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iFirstPosition
	 * @param {{x: number, y: number}} iSecondPosition
	 * @param {number} iIntervalTime
	 */
	InputsServices.prototype.onGestureHoldAndTap = function (iElapsedTime, iFirstPosition, iSecondPosition, iIntervalTime) {
		Devices.sendGestureHoldAndTapEvent(iElapsedTime, iFirstPosition, iSecondPosition, iIntervalTime);
	};

	/**
	 *
	 *
	 * @private
	 * @param {number} iElapsedTime
	 * @param {{x: number, y: number}} iFirstPosition
	 * @param {{x: number, y: number}} iSecondPosition
	 * @param {{x: number, y: number}} iDeltaPosition
	 * @param {{x: number, y: number}} iVectorFromOrigin
	 * @param {number} iDragTime
	 */
	InputsServices.prototype.onGestureHoldAndDrag = function (iElapsedTime, iFirstPosition, iSecondPosition, iDeltaPosition, iVectorFromOrigin, iDragTime) {
		Devices.sendGestureHoldAndDragEvent(iElapsedTime, iFirstPosition, iSecondPosition, iDeltaPosition, iVectorFromOrigin, iDragTime);
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onKeyboardEnable = function () {
		Devices.sendKeyboardEnableEvent();
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onKeyboardDisable = function () {
		Devices.sendKeyboardDisableEvent();
	};

	/**
	 *
	 *
	 * @private
	 * @param {EP.Keyboard.EKey} iKey
     * @param {EP.Keyboard.FModifier} iModifier
     * @param {boolean} iRepeat
	 */
	InputsServices.prototype.onKeyboardPress = function (iKey, iModifier, iRepeat) {
		Devices.sendKeyboardPressEvent(iKey, iModifier, iRepeat);
	};

	/**
	 *
	 *
	 * @private
	 * @param {EP.Keyboard.EKey} iKey
     * @param {EP.Keyboard.FModifier} iModifier
	 */
	InputsServices.prototype.onKeyboardRelease = function (iKey, iModifier) {
		Devices.sendKeyboardReleaseEvent(iKey, iModifier);
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onGamepadEnable = function () {
		Devices.sendGamepadEnableEvent();
	};

	/**
	 *
	 *
	 * @private
	 */
	InputsServices.prototype.onGamepadDisable = function () {
		Devices.sendGamepadDisableEvent();
	};

    /**
	 *
	 *
	 * @private
	 * @param {Array.<number>} iButtonValues
     * @param {Array.<number>} iAxisValues
	 */
	InputsServices.prototype.onGamepad = function (iButtonValues, iAxisValues) {
		var gamepad = Devices.getGamepad();
		for (var b = 0; b < iButtonValues.length; b++) {
			if (iButtonValues[b] === 1) {
				if (gamepad.buttonsPressed.indexOf(b) === -1) {
					Devices.sendGamepadPressEvent(b);
				}
			}
			else {
				if (gamepad.buttonsPressed.indexOf(b) !== -1) {
					Devices.sendGamepadReleaseEvent(b);
				}
			}
		}

		for (var a = 0; a < iAxisValues.length; a++) {
			if (iAxisValues[a] !== gamepad.axisValues[a]) {
				Devices.sendGamepadAxisEvent(iAxisValues[a], a);
			}
		}
	};

	return InputsServices;
});
