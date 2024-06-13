define('DS/EPInputs/EPDevices', [
    'DS/EP/EP',
	'DS/EPEventServices/EPEventServices',
    'DS/MathematicsES/MathVector2DJSImpl',
	'DS/EPInputs/EPMouseEnableEvent',
	'DS/EPInputs/EPMouseDisableEvent',
	'DS/EPInputs/EPMouseMoveEvent',
	'DS/EPInputs/EPMousePressEvent',
	'DS/EPInputs/EPMouseReleaseEvent',
	'DS/EPInputs/EPMouseClickEvent',
	'DS/EPInputs/EPMouseDoubleClickEvent',
	'DS/EPInputs/EPMouseWheelEvent',
	'DS/EPInputs/EPTouchEnableEvent',
	'DS/EPInputs/EPTouchDisableEvent',
	'DS/EPInputs/EPTouchMoveEvent',
	'DS/EPInputs/EPTouchIdleEvent',
	'DS/EPInputs/EPTouchPressEvent',
	'DS/EPInputs/EPTouchReleaseEvent',
	'DS/EPInputs/EPMultiTouchEvent',
	'DS/EPInputs/EPGestureEnableEvent',
	'DS/EPInputs/EPGestureDisableEvent',
	'DS/EPInputs/EPGestureTapEvent',
	'DS/EPInputs/EPGestureDoubleTapEvent',
	'DS/EPInputs/EPGestureFlickEvent',
	'DS/EPInputs/EPGestureTwoFingersTapEvent',
	'DS/EPInputs/EPGestureHoldAndTapEvent',
	'DS/EPInputs/EPGestureDragEvent',
	'DS/EPInputs/EPGestureDragBeginEvent',
	'DS/EPInputs/EPGestureDragEndEvent',
	'DS/EPInputs/EPGestureHoldEvent',
	'DS/EPInputs/EPGestureHoldBeginEvent',
	'DS/EPInputs/EPGestureHoldEndEvent',
	'DS/EPInputs/EPGestureMediumHoldEvent',
	'DS/EPInputs/EPGestureMediumHoldBeginEvent',
	'DS/EPInputs/EPGestureMediumHoldEndEvent',
	'DS/EPInputs/EPGestureLongHoldEvent',
	'DS/EPInputs/EPGestureLongHoldBeginEvent',
	'DS/EPInputs/EPGestureLongHoldEndEvent',
	'DS/EPInputs/EPGesturePinchEvent',
	'DS/EPInputs/EPGesturePinchBeginEvent',
	'DS/EPInputs/EPGesturePinchEndEvent',
	'DS/EPInputs/EPGestureHoldAndDragEvent',
	'DS/EPInputs/EPGestureHoldAndDragBeginEvent',
	'DS/EPInputs/EPGestureHoldAndDragEndEvent',
	'DS/EPInputs/EPGesturePanEvent',
	'DS/EPInputs/EPGesturePanBeginEvent',
	'DS/EPInputs/EPGesturePanEndEvent',
	'DS/EPInputs/EPGestureTwoFingersRotateEvent',
	'DS/EPInputs/EPGestureTwoFingersRotateBeginEvent',
	'DS/EPInputs/EPGestureTwoFingersRotateEndEvent',
	'DS/EPInputs/EPKeyboardEnableEvent',
	'DS/EPInputs/EPKeyboardDisableEvent',
	'DS/EPInputs/EPKeyboardPressEvent',
	'DS/EPInputs/EPKeyboardReleaseEvent',
	'DS/EPInputs/EPGamepadEnableEvent',
	'DS/EPInputs/EPGamepadDisableEvent',
    'DS/EPInputs/EPGamepadAxisEvent',
    'DS/EPInputs/EPGamepadPressEvent',
    'DS/EPInputs/EPGamepadReleaseEvent',
	'DS/EPInputs/EPDeviceEnableEvent',
	'DS/EPInputs/EPDeviceDisableEvent',
    'DS/EPInputs/EPDeviceAxisEvent',
    'DS/EPInputs/EPDevicePressEvent',
    'DS/EPInputs/EPDeviceReleaseEvent',
	'DS/EPInputs/EPDeviceTrackerEvent'
], function (EP, EventServices, Vector2D,
	MouseEnableEvent, MouseDisableEvent, MouseMoveEvent, MousePressEvent, MouseReleaseEvent, MouseClickEvent, MouseDoubleClickEvent, MouseWheelEvent,
	TouchEnableEvent, TouchDisableEvent, TouchMoveEvent, TouchIdleEvent, TouchPressEvent, TouchReleaseEvent, MultiTouchEvent,
	GestureEnableEvent, GestureDisableEvent, GestureTapEvent, GestureDoubleTapEvent, GestureFlickEvent, GestureTwoFingersTapEvent, GestureHoldAndTapEvent,
	GestureDragEvent, GestureDragBeginEvent, GestureDragEndEvent, GestureHoldEvent, GestureHoldBeginEvent, GestureHoldEndEvent,
	GestureMediumHoldEvent, GestureMediumHoldBeginEvent, GestureMediumHoldEndEvent, GestureLongHoldEvent, GestureLongHoldBeginEvent, GestureLongHoldEndEvent,
	GesturePinchEvent, GesturePinchBeginEvent, GesturePinchEndEvent, GestureHoldAndDragEvent, GestureHoldAndDragBeginEvent, GestureHoldAndDragEndEvent,
	GesturePanEvent, GesturePanBeginEvent, GesturePanEndEvent, GestureTwoFingersRotateEvent, GestureTwoFingersRotateBeginEvent, GestureTwoFingersRotateEndEvent,
	KeyboardEnableEvent, KeyboardDisableEvent, KeyboardPressEvent, KeyboardReleaseEvent,
	GamepadEnableEvent, GamepadDisableEvent, GamepadAxisEvent, GamepadPressEvent, GamepadReleaseEvent,
	DeviceEnableEvent, DeviceDisableEvent, DeviceAxisEvent, DevicePressEvent, DeviceReleaseEvent, DeviceTrackerEvent) {
    'use strict';

	/**
	 * <p>Describe an object which contains all the device controllers.</br>
	 * It also provides information about device controllers state through accessors.</br>
	 * It is also possible to get notified when device event occurs through the EP.EventServices.</p>
	 *
	 * <p>Device controllers & Events currently managed :</br>
	 * - Mouse : MouseEvent -> MouseEnableEvent, MouseDisableEvent, MouseMoveEvent, MousePressEvent, MouseReleaseEvent, MouseClickEvent, MouseDoubleClickEvent, MouseWheelEvent.</br>
	 * - Touch : MultiTouchEvent, TouchEvent -> TouchEnableEvent, TouchDisableEvent, TouchMoveEvent, TouchIdleEvent, TouchPressEvent, TouchReleaseEvent.</br>
	 * - Gesture : GestureEvent -> GestureEnableEvent, GestureDisableEvent, GestureTapEvent, GestureDoubleTapEvent, GestureFlickEvent, GestureTwoFingersTapEvent, GestureHoldAndTapEvent,
	 * GestureDragEvent, GestureDragBeginEvent, GestureDragEndEvent, GestureHoldEvent, GestureHoldBeginEvent, GestureHoldEndEvent,
	 * GestureMediumHoldEvent, GestureMediumHoldBeginEvent, GestureMediumHoldEndEvent, GestureLongHoldEvent, GestureLongHoldBeginEvent, GestureLongHoldEndEvent,
	 * GesturePinchEvent, GesturePinchBeginEvent, GesturePinchEndEvent, GestureHoldAndDragEvent, GestureHoldAndDragBeginEvent, GestureHoldAndDragEndEvent,
	 * GesturePanEvent, GesturePanBeginEvent, GesturePanEndEvent, GestureTwoFingersRotateEvent, GestureTwoFingersRotateBeginEvent, GestureTwoFingersRotateEndEvent.</br>
	 * - Keyboard : KeyboardEvent -> KeyboardEnableEvent, KeyboardDisableEvent, KeyboardPressEvent, KeyboardReleaseEvent.</br>
     * - Gamepad : GamepadEvent -> GamepadEnableEvent, GamepadDisableEvent, GamepadPressEvent, GamepadReleaseEvent, GamepadAxisEvent.</br>
	 * - Device : DeviceEvent -> DeviceEnableEvent, DeviceDisableEvent, DevicePressEvent, DeviceReleaseEvent, DeviceAxisEvent, DeviceTrackerEvent.</p>
	 *
	 * @namespace
	 * @alias EP.Devices
	 * @public
	 * @example
	 * var mouse = EP.Devices.getMouse();
	 * var touch = EP.Devices.getTouch();
	 * var keyboard = EP.Devices.getKeyboard();
     * var gamepad = EP.Devices.getGamepad();
	 * var device = EP.Devices.getDevice(0);
	 */
    var Devices = {};

	/**
	 * Mouse device.
	 *
	 * @private
	 * @type {EP.Mouse}
	 * @see EP.Devices.getMouse
	 */
	var mouse;

	/**
	 * Keyboard device.
	 *
	 * @private
	 * @type {EP.Keyboard}
	 * @see EP.Devices.getKeyboard
	 */
	var keyboard;

    /**
	 * Gamepad device.
	 *
	 * @private
	 * @type {EP.Gamepad}
	 * @see EP.Devices.getGamepad
	 */
	var gamepad;

	/**
	 * Touch device.
	 *
	 * @private
	 * @type {EP.Touch}
	 * @see EP.Devices.getTouch
	 */
	var touch;

	/**
	 * Generic device list.
	 *
	 * @private
	 * @type {Array.<EP.Device>}
	 * @see EP.Devices.getDevice
	 */
	var deviceList = [];

	/**
	 * Return the mouse device.</br>
	 * Return undefined when the mouse doesn't exist or is disabled.
	 *
	 * @public
	 * @return {EP.Mouse}
	 * @example
	 * var mouse = EP.Devices.getMouse();
	 */
	Devices.getMouse = function () {
		return mouse;
	};

	/**
	 * Return the keyboard device.</br>
	 * Return undefined when the keyboard doesn't exist or is disabled.
	 *
	 * @public
	 * @return {EP.Keyboard}
	 * @example
	 * var keyboard = EP.Devices.getKeyboard();
	 */
	Devices.getKeyboard = function () {
		return keyboard;
	};

    /**
	 * Return a gamepad device.</br>
	 * Return undefined when the gamepad doesn't exist or is disabled.
	 *
	 * @public
	 * @return {EP.Gamepad}
	 * @example
	 * var gamepad = EP.Devices.getGamepad();
	 */
	Devices.getGamepad = function () {
	    return gamepad;
	};

	/**
	 * Return the touch device.</br>
	 * Return undefined when the touch doesn't exist or is disabled.
	 *
	 * @public
	 * @return {EP.Touch}
	 * @example
	 * var touch = EP.Devices.getTouch();
	 */
	Devices.getTouch = function () {
		return touch;
	};

	/**
	 * Return a generic device.</br>
	 * Return undefined when the device doesn't exist or is disabled.
	 *
	 * @public
	 * @param {number} [iIndex]
	 * @return {EP.Device}
	 * @example
	 * var device = EP.Devices.getDevice(0);
	 */
	Devices.getDevice = function (iIndex) {
		return deviceList[iIndex || 0];
	};

	/**
	 * Return an array of all generic device.
	 *
	 * @public
	 * @return {Array.<EP.Device>}
	 * @example
	 * var deviceList = EP.Devices.getDeviceList();
	 */
	Devices.getDeviceList = function () {
		return deviceList.slice(0);
	};

	Devices.doubleClickTime = 500;

	var buttonClickDate = [];
	var buttonDoubleClickStatus = [false, false, false];

	var onMouseEnableEvent = function (iMouseEnableEvent) {
		mouse = iMouseEnableEvent.getMouse();
	};

	var onMouseDisableEvent = function () {
		mouse = undefined;
	};

	var onMouseMoveEvent = function (iMouseMoveEvent) {
	    mouse.position = iMouseMoveEvent.getPosition();
	};

	var onMousePressEvent = function (iMousePressEvent) {
	    var button = iMousePressEvent.getButton();
	    if (mouse.buttonsPressed.indexOf(button) === -1) {
	        mouse.buttonsPressed.push(button);
	    }
	};

	var onMouseReleaseEvent = function (iMouseReleaseEvent) {
	    var button = iMouseReleaseEvent.getButton();
	    var index = mouse.buttonsPressed.indexOf(button);
	    if (index !== -1) {
	        mouse.buttonsPressed.splice(index, 1);
	    }
	};

	var onTouchEnableEvent = function (iTouchEnableEvent) {
		touch = iTouchEnableEvent.getTouch();
	};

	var onTouchDisableEvent = function () {
		touch = undefined;
	};

	var onTouchMoveEvent = function (iTouchMoveEvent) {
		touch.positionsById[iTouchMoveEvent.getId()] = iTouchMoveEvent.getPosition();
	};

	var onTouchPressEvent = function (iTouchPressEvent) {
		var id = iTouchPressEvent.getId();
		if (touch.idsPressed.indexOf(id) === -1) {
			touch.idsPressed.push(id);
			touch.positionsById[id] = iTouchPressEvent.getPosition();
		}
	};

	var onTouchReleaseEvent = function (iTouchReleaseEvent) {
		var id = iTouchReleaseEvent.getId();
		var index = touch.idsPressed.indexOf(id);
		if (index !== -1) {
			touch.idsPressed.splice(index, 1);
			touch.positionsById[id] = undefined;
		}
	};

	var onKeyboardEnableEvent = function (iKeyboardEnableEvent) {
		keyboard = iKeyboardEnableEvent.getKeyboard();
	};

	var onKeyboardDisableEvent = function () {
		keyboard = undefined;
	};

	var onKeyboardPressEvent = function (iKeyboardPressEvent) {
	    var key = iKeyboardPressEvent.getKey();
	    if (keyboard.keysPressed.indexOf(key) === -1) {
	        keyboard.keysPressed.push(key);
	    }
	    keyboard.modifier = iKeyboardPressEvent.getModifier();
	};

	var onKeyboardReleaseEvent = function (iKeyboardReleaseEvent) {
	    var key = iKeyboardReleaseEvent.getKey();
	    var index = keyboard.keysPressed.indexOf(key);
	    if (index !== -1) {
	        keyboard.keysPressed.splice(index, 1);
	    }
	    keyboard.modifier = iKeyboardReleaseEvent.getModifier();
	};

	var onGamepadEnableEvent = function (iGamepadEnableEvent) {
		gamepad = iGamepadEnableEvent.getGamepad();
	};

	var onGamepadDisableEvent = function () {
		gamepad = undefined;
	};

	var onGamepadPressEvent = function (iGamepadPressEvent) {
	    var button = iGamepadPressEvent.getButton();
	    if (gamepad.buttonsPressed.indexOf(button) === -1) {
	        gamepad.buttonsPressed.push(button);
	    }
	};

	var onGamepadReleaseEvent = function (iGamepadReleaseEvent) {
	    var button = iGamepadReleaseEvent.getButton();
	    var index = gamepad.buttonsPressed.indexOf(button);
	    if (index !== -1) {
	        gamepad.buttonsPressed.splice(index, 1);
	    }
	};

	var onGamepadAxisEvent = function (iGamepadAxisEvent) {
		var axis = iGamepadAxisEvent.getAxis();
		var axisValue = iGamepadAxisEvent.getAxisValue();
		gamepad.axisValues[axis] = axisValue;
	};

	var onDeviceEnableEvent = function (iDeviceEnableEvent) {
		var device = iDeviceEnableEvent.getDevice();
		deviceList[device.getIndex()] = device;
	};

	var onDeviceDisableEvent = function (iDeviceDisableEvent) {
		var device = iDeviceDisableEvent.getDevice();
		deviceList[device.getIndex()] = undefined;
	};

	var onDevicePressEvent = function (iDevicePressEvent) {
		var device = iDevicePressEvent.getDevice();
		var button = iDevicePressEvent.getButton();
		if (device.buttonsPressed.indexOf(button) === -1) {
			device.buttonsPressed.push(button);
		}
	};

	var onDeviceReleaseEvent = function (iDeviceReleaseEvent) {
		var device = iDeviceReleaseEvent.getDevice();
		var button = iDeviceReleaseEvent.getButton();
		var index = device.buttonsPressed.indexOf(button);
		if (index !== -1) {
			device.buttonsPressed.splice(index, 1);
		}
	};

	var onDeviceAxisEvent = function (iDeviceAxisEvent) {
		var device = iDeviceAxisEvent.getDevice();
		var axis = iDeviceAxisEvent.getAxis();
		var axisValue = iDeviceAxisEvent.getAxisValue();
		device.axisValues[axis] = axisValue;
	};

	var onDeviceTrackerEvent = function (iDeviceTrackerEvent) {
		var device = iDeviceTrackerEvent.getDevice();
		var tracker = iDeviceTrackerEvent.getTracker();
		var trackerValue = iDeviceTrackerEvent.getTrackerValue();
		device.trackerValues[tracker] = trackerValue;
	};

	EventServices.addListener(MouseEnableEvent, onMouseEnableEvent);
	EventServices.addListener(MouseDisableEvent, onMouseDisableEvent);
	EventServices.addListener(MouseMoveEvent, onMouseMoveEvent);
	EventServices.addListener(MousePressEvent, onMousePressEvent);
	EventServices.addListener(MouseReleaseEvent, onMouseReleaseEvent);
	EventServices.addListener(TouchEnableEvent, onTouchEnableEvent);
	EventServices.addListener(TouchDisableEvent, onTouchDisableEvent);
	EventServices.addListener(TouchMoveEvent, onTouchMoveEvent);
	EventServices.addListener(TouchPressEvent, onTouchPressEvent);
	EventServices.addListener(TouchReleaseEvent, onTouchReleaseEvent);
	EventServices.addListener(KeyboardEnableEvent, onKeyboardEnableEvent);
	EventServices.addListener(KeyboardDisableEvent, onKeyboardDisableEvent);
	EventServices.addListener(KeyboardPressEvent, onKeyboardPressEvent);
	EventServices.addListener(KeyboardReleaseEvent, onKeyboardReleaseEvent);
	EventServices.addListener(GamepadEnableEvent, onGamepadEnableEvent);
	EventServices.addListener(GamepadDisableEvent, onGamepadDisableEvent);
	EventServices.addListener(GamepadPressEvent, onGamepadPressEvent);
	EventServices.addListener(GamepadReleaseEvent, onGamepadReleaseEvent);
	EventServices.addListener(GamepadAxisEvent, onGamepadAxisEvent);
	EventServices.addListener(DeviceEnableEvent, onDeviceEnableEvent);
	EventServices.addListener(DeviceDisableEvent, onDeviceDisableEvent);
	EventServices.addListener(DevicePressEvent, onDevicePressEvent);
	EventServices.addListener(DeviceReleaseEvent, onDeviceReleaseEvent);
	EventServices.addListener(DeviceAxisEvent, onDeviceAxisEvent);
	EventServices.addListener(DeviceTrackerEvent, onDeviceTrackerEvent);

	Devices.sendMouseEnableEvent = function () {
		var newEvt = new MouseEnableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendMouseDisableEvent = function () {
		var newEvt = new MouseDisableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendMouseMoveEvent = function (iPosition) {
	    var position = new Vector2D();
	    position.x = iPosition.x;
	    position.y = iPosition.y;

	    // The mouse really moved
	    if (position.x !== mouse.position.x || position.y !== mouse.position.y) {
	    	var deltaPosition = Vector2D.sub(position, mouse.position);

	    	var newEvt = new MouseMoveEvent();
	        newEvt.position = position;
	        newEvt.deltaPosition = deltaPosition;
	        EventServices.dispatchEvent(newEvt);

	        // Click & DoubleClick : Cancel Event
	        buttonClickDate.length = 0;
	        buttonDoubleClickStatus = [false, false, false];
	    }
	};

	Devices.sendMousePressEvent = function (iButton, iDoubleClick) {
		var newEvt = new MousePressEvent();
	    newEvt.position = mouse.getPosition();
	    newEvt.button = iButton;
	    EventServices.dispatchEvent(newEvt);

	    // Click & DoubleClick : Start Event
	    if (buttonClickDate[iButton] === undefined) {
	        buttonClickDate[iButton] = new Date();
	    }
	    else {
	        var currentDate = new Date();
	        var elapsed = currentDate.getTime() - buttonClickDate[iButton].getTime();
	        if (iDoubleClick || (iDoubleClick === undefined && elapsed < Devices.doubleClickTime)) {
	            buttonDoubleClickStatus[iButton] = true;
	            buttonClickDate[iButton] = undefined;
	        }
	        else {
	            buttonClickDate[iButton] = currentDate;
	        }
	    }
	};

	Devices.sendMouseReleaseEvent = function (iButton) {
		var newEvt = new MouseReleaseEvent();
	    newEvt.position = mouse.getPosition();
	    newEvt.button = iButton;
	    EventServices.dispatchEvent(newEvt);

	    // Click & DoubleClick : Send Event
	    if (buttonDoubleClickStatus[iButton]) {
	    	newEvt = new MouseDoubleClickEvent();
	        newEvt.position = mouse.getPosition();
	        newEvt.button = iButton;
	        EventServices.dispatchEvent(newEvt);

	        buttonDoubleClickStatus[iButton] = false;
	    }
	    else if (buttonClickDate[iButton] !== undefined) {
	    	newEvt = new MouseClickEvent();
	        newEvt.position = mouse.getPosition();
	        newEvt.button = iButton;
	        EventServices.dispatchEvent(newEvt);
	    }
	};

	Devices.sendMouseWheelEvent = function (iWheelDeltaValue) {
		var newEvt = new MouseWheelEvent();
	    newEvt.position = mouse.getPosition();
	    newEvt.wheelDeltaValue = iWheelDeltaValue;
	    EventServices.dispatchEvent(newEvt);
	};

	Devices.sendTouchEnableEvent = function () {
		var newEvt = new TouchEnableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendTouchDisableEvent = function () {
		var newEvt = new TouchDisableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendMultiTouchEvent = function (iEventTypeList, iIdList, iPositionList) {
		var positions = iPositionList.map(function (iPosition) {
			var position = new Vector2D();
			position.x = iPosition.x;
			position.y = iPosition.y;
			return position;
		});
		var parameters = {};
		parameters.eventTypes = iEventTypeList;
		parameters.ids = iIdList;
		parameters.positions = positions;
		var newEvt = new MultiTouchEvent(parameters);
		newEvt.eventTypes = iEventTypeList;
		newEvt.ids = iIdList;
		newEvt.positions = positions;

		for (var te = 0; te < newEvt.touchEventList.length; te++) {
			EventServices.dispatchEvent(newEvt.touchEventList[te]);
		}

		EventServices.dispatchEvent(newEvt);
	};

	var gestureByType = {};

	var maxHoldMotion = 10;
	var gestureHoldBeginPosition;
	var gestureHoldAndDragBeginPosition;

	var beginGesture = function (iGestureEvent) {
		var type = iGestureEvent.getType();
		if (!gestureByType.hasOwnProperty(type)) {
			var beginType = type.replace('Event', 'BeginEvent');
			var BeginEventCtor = EventServices.getEventByType(beginType);
			var beginEvent = new BeginEventCtor();
			var keys = Object.keys(iGestureEvent);
			var key;
			for (var k = 0; k < keys.length; k++) {
				key = keys[k];
				if (key !== 'time') {
					beginEvent[key] = iGestureEvent[key];
				}
			}
			EventServices.dispatchEvent(beginEvent);
			if (type === GestureHoldEvent.prototype.type) {
				gestureHoldBeginPosition = iGestureEvent.getPosition();
			}
			else if (type === GestureHoldAndDragEvent.prototype.type) {
				gestureHoldAndDragBeginPosition = [iGestureEvent.getFirstPosition(), iGestureEvent.getSecondPosition()];
			}
		}
		gestureByType[type] = iGestureEvent;
	};

	var endGesture = function (iType) {
		if (gestureByType.hasOwnProperty(iType)) {
			var gestureEvent = gestureByType[iType];
			var endType = iType.replace('Event', 'EndEvent');
			var EndEventCtor = EventServices.getEventByType(endType);
			var endEvent = new EndEventCtor();
			var keys = Object.keys(gestureEvent);
			var key;
			for (var k = 0; k < keys.length; k++) {
				key = keys[k];
				if (key !== 'time') {
					endEvent[key] = gestureEvent[key];
				}
			}
			EventServices.dispatchEvent(endEvent);
			delete gestureByType[iType];
			if (iType === GestureHoldEvent.prototype.type) {
				gestureHoldBeginPosition = undefined;
			}
			else if (iType === GestureHoldAndDragEvent.prototype.type) {
				gestureHoldAndDragBeginPosition = undefined;
			}
		}
	};

	var endAllGesture = function () {
		var types = Object.keys(gestureByType);
		var type;
		for (var t = 0; t < types.length; t++) {
			type = types[t];
			endGesture(type);
		}
	};

	Devices.sendGestureEnableEvent = function () {
		var gestureEnableEvent = new GestureEnableEvent();
		EventServices.dispatchEvent(gestureEnableEvent);
	};

	Devices.sendGestureDisableEvent = function () {
		var gestureDisableEvent = new GestureDisableEvent();
		EventServices.dispatchEvent(gestureDisableEvent);
	};

	Devices.sendGestureMultiTouchEvent = function (iEventTypeList, iPositionList) {
		var eventType, e;
		var touchCountChange = false;
		for (e = 0; e < iEventTypeList.length && !touchCountChange; e++) {
			eventType = iEventTypeList[e];
			touchCountChange = eventType === TouchPressEvent.prototype.type || eventType === TouchReleaseEvent.prototype.type;
		}

		var position, deltaPosition, motion;
		if (touchCountChange) {
			endAllGesture();
		}
		else if (gestureHoldBeginPosition !== undefined) {
			if (iEventTypeList[0] === TouchMoveEvent.prototype.type) {
				position = new Vector2D();
				position.x = iPositionList[0].x;
				position.y = iPositionList[0].y;
				deltaPosition = Vector2D.sub(position, gestureHoldBeginPosition);
				motion = deltaPosition.norm();
				if (motion > maxHoldMotion) {
					endGesture(GestureHoldEvent.prototype.type);
					endGesture(GestureMediumHoldEvent.prototype.type);
					endGesture(GestureLongHoldEvent.prototype.type);
				}
			}
		}
		else if (gestureHoldAndDragBeginPosition !== undefined) {
			if (iEventTypeList[0] === TouchMoveEvent.prototype.type ||
				iEventTypeList[1] === TouchMoveEvent.prototype.type) {
				position = new Vector2D();
				position.x = iPositionList[0].x;
				position.y = iPositionList[0].y;
				deltaPosition = Vector2D.sub(position, gestureHoldAndDragBeginPosition[0]);
				motion = deltaPosition.norm();
				if (motion > maxHoldMotion) {
					position = new Vector2D();
					position.x = iPositionList[1].x;
					position.y = iPositionList[1].y;
					deltaPosition = Vector2D.sub(position, gestureHoldAndDragBeginPosition[1]);
					motion = deltaPosition.norm();
					if (motion > maxHoldMotion) {
						endGesture(GestureHoldAndDragEvent.prototype.type);
					}
				}
			}
		}
	};

	Devices.sendGestureTapEvent = function (iElapsedTime, iPosition) {
		var position = new Vector2D();
		position.x = iPosition.x;
		position.y = iPosition.y;
		var gestureTapEvent = new GestureTapEvent();
		gestureTapEvent.elapsedTime = iElapsedTime;
		gestureTapEvent.position = position;
		EventServices.dispatchEvent(gestureTapEvent);
	};

	Devices.sendGestureDoubleTapEvent = function (iElapsedTime, iPosition) {
		var position = new Vector2D();
		position.x = iPosition.x;
		position.y = iPosition.y;
		var gestureDoubleTapEvent = new GestureDoubleTapEvent();
		gestureDoubleTapEvent.elapsedTime = iElapsedTime;
		gestureDoubleTapEvent.position = position;
		EventServices.dispatchEvent(gestureDoubleTapEvent);
	};

	Devices.sendGestureDragEvent = function (iElapsedTime, iPosition, iDeltaPosition, iVectorFromOrigin) {
		var position = new Vector2D();
		position.x = iPosition.x;
		position.y = iPosition.y;
		var deltaPosition = new Vector2D();
		deltaPosition.x = iDeltaPosition.x;
		deltaPosition.y = iDeltaPosition.y;
		var vectorFromOrigin = new Vector2D();
		vectorFromOrigin.x = iVectorFromOrigin.x;
		vectorFromOrigin.y = iVectorFromOrigin.y;
		var gestureDragEvent = new GestureDragEvent();
		gestureDragEvent.elapsedTime = iElapsedTime;
		gestureDragEvent.position = position;
		gestureDragEvent.deltaPosition = deltaPosition;
		gestureDragEvent.vectorFromOrigin = vectorFromOrigin;

		beginGesture(gestureDragEvent);

		EventServices.dispatchEvent(gestureDragEvent);
	};

	Devices.sendGestureHoldEvent = function (iElapsedTime, iPosition) {
		var position = new Vector2D();
		position.x = iPosition.x;
		position.y = iPosition.y;
		var gestureHoldEvent = new GestureHoldEvent();
		gestureHoldEvent.elapsedTime = iElapsedTime;
		gestureHoldEvent.position = position;

		beginGesture(gestureHoldEvent);

		EventServices.dispatchEvent(gestureHoldEvent);
	};

	Devices.sendGestureMediumHoldEvent = function (iElapsedTime, iPosition) {
		var position = new Vector2D();
		position.x = iPosition.x;
		position.y = iPosition.y;
		var gestureMediumHoldEvent = new GestureMediumHoldEvent();
		gestureMediumHoldEvent.elapsedTime = iElapsedTime;
		gestureMediumHoldEvent.position = position;

		beginGesture(gestureMediumHoldEvent);

		EventServices.dispatchEvent(gestureMediumHoldEvent);
	};

	Devices.sendGestureLongHoldEvent = function (iElapsedTime, iPosition) {
		var position = new Vector2D();
		position.x = iPosition.x;
		position.y = iPosition.y;
		var gestureLongHoldEvent = new GestureLongHoldEvent();
		gestureLongHoldEvent.elapsedTime = iElapsedTime;
		gestureLongHoldEvent.position = position;

		beginGesture(gestureLongHoldEvent);

		EventServices.dispatchEvent(gestureLongHoldEvent);
	};

	Devices.sendGestureFlickEvent = function (iElapsedTime, iVector, iDuration) {
		var vector = new Vector2D();
		vector.x = iVector.x;
		vector.y = iVector.y;
		var gestureFlickEvent = new GestureFlickEvent();
		gestureFlickEvent.elapsedTime = iElapsedTime;
		gestureFlickEvent.vector = vector;
		gestureFlickEvent.duration = iDuration;
		EventServices.dispatchEvent(gestureFlickEvent);
	};

	Devices.sendGesturePanEvent = function (iElapsedTime, iFirstPosition, iSecondPosition, iDeltaPosition, iVectorFromOrigin) {
		var firstPosition = new Vector2D();
		firstPosition.x = iFirstPosition.x;
		firstPosition.y = iFirstPosition.y;
		var secondPosition = new Vector2D();
		secondPosition.x = iSecondPosition.x;
		secondPosition.y = iSecondPosition.y;
		var deltaPosition = new Vector2D();
		deltaPosition.x = iDeltaPosition.x;
		deltaPosition.y = iDeltaPosition.y;
		var vectorFromOrigin = new Vector2D();
		vectorFromOrigin.x = iVectorFromOrigin.x;
		vectorFromOrigin.y = iVectorFromOrigin.y;
		var gesturePanEvent = new GesturePanEvent();
		gesturePanEvent.elapsedTime = iElapsedTime;
		gesturePanEvent.firstPosition = firstPosition;
		gesturePanEvent.secondPosition = secondPosition;
		gesturePanEvent.deltaPosition = deltaPosition;
		gesturePanEvent.vectorFromOrigin = vectorFromOrigin;

		beginGesture(gesturePanEvent);

		EventServices.dispatchEvent(gesturePanEvent);
	};

	Devices.sendGesturePinchEvent = function (iElapsedTime, iFirstPosition, iSecondPosition, iDistance) {
		var firstPosition = new Vector2D();
		firstPosition.x = iFirstPosition.x;
		firstPosition.y = iFirstPosition.y;
		var secondPosition = new Vector2D();
		secondPosition.x = iSecondPosition.x;
		secondPosition.y = iSecondPosition.y;
		var gesturePinchEvent = new GesturePinchEvent();
		gesturePinchEvent.elapsedTime = iElapsedTime;
		gesturePinchEvent.firstPosition = firstPosition;
		gesturePinchEvent.secondPosition = secondPosition;
		gesturePinchEvent.distance = iDistance;

		beginGesture(gesturePinchEvent);

		EventServices.dispatchEvent(gesturePinchEvent);
	};

	Devices.sendGestureTwoFingersRotateEvent = function (iElapsedTime, iFirstPosition, iSecondPosition, iOriginVector, iLastVector, iVector) {
		var firstPosition = new Vector2D();
		firstPosition.x = iFirstPosition.x;
		firstPosition.y = iFirstPosition.y;
		var secondPosition = new Vector2D();
		secondPosition.x = iSecondPosition.x;
		secondPosition.y = iSecondPosition.y;
		var originVector = new Vector2D();
		originVector.x = iOriginVector.x;
		originVector.y = iOriginVector.y;
		var lastVector = new Vector2D();
		lastVector.x = iLastVector.x;
		lastVector.y = iLastVector.y;
		var vector = new Vector2D();
		vector.x = iVector.x;
		vector.y = iVector.y;
		var gestureTwoFingersRotateEvent = new GestureTwoFingersRotateEvent();
		gestureTwoFingersRotateEvent.elapsedTime = iElapsedTime;
		gestureTwoFingersRotateEvent.firstPosition = firstPosition;
		gestureTwoFingersRotateEvent.secondPosition = secondPosition;
		gestureTwoFingersRotateEvent.originVector = originVector;
		gestureTwoFingersRotateEvent.lastVector = lastVector;
		gestureTwoFingersRotateEvent.vector = vector;

		beginGesture(gestureTwoFingersRotateEvent);

		EventServices.dispatchEvent(gestureTwoFingersRotateEvent);
	};

	Devices.sendGestureTwoFingersTapEvent = function (iElapsedTime, iFirstPosition, iSecondPosition) {
		var firstPosition = new Vector2D();
		firstPosition.x = iFirstPosition.x;
		firstPosition.y = iFirstPosition.y;
		var secondPosition = new Vector2D();
		secondPosition.x = iSecondPosition.x;
		secondPosition.y = iSecondPosition.y;
		var gestureTwoFingersTapEvent = new GestureTwoFingersTapEvent();
		gestureTwoFingersTapEvent.elapsedTime = iElapsedTime;
		gestureTwoFingersTapEvent.firstPosition = firstPosition;
		gestureTwoFingersTapEvent.secondPosition = secondPosition;
		EventServices.dispatchEvent(gestureTwoFingersTapEvent);
	};

	Devices.sendGestureHoldAndDragEvent = function (iElapsedTime, iFirstPosition, iSecondPosition, iDeltaPosition, iVectorFromOrigin, iDragTime) {
		var firstPosition = new Vector2D();
		firstPosition.x = iFirstPosition.x;
		firstPosition.y = iFirstPosition.y;
		var secondPosition = new Vector2D();
		secondPosition.x = iSecondPosition.x;
		secondPosition.y = iSecondPosition.y;
		var deltaPosition = new Vector2D();
		deltaPosition.x = iDeltaPosition.x;
		deltaPosition.y = iDeltaPosition.y;
		var vectorFromOrigin = new Vector2D();
		vectorFromOrigin.x = iVectorFromOrigin.x;
		vectorFromOrigin.y = iVectorFromOrigin.y;
		var gestureHoldAndDragEvent = new GestureHoldAndDragEvent();
		gestureHoldAndDragEvent.elapsedTime = iElapsedTime;
		gestureHoldAndDragEvent.firstPosition = firstPosition;
		gestureHoldAndDragEvent.secondPosition = secondPosition;
		gestureHoldAndDragEvent.deltaPosition = deltaPosition;
		gestureHoldAndDragEvent.vectorFromOrigin = vectorFromOrigin;
		gestureHoldAndDragEvent.dragTime = iDragTime;

		beginGesture(gestureHoldAndDragEvent);

		EventServices.dispatchEvent(gestureHoldAndDragEvent);
	};

	Devices.sendGestureHoldAndTapEvent = function (iElapsedTime, iFirstPosition, iSecondPosition, iIntervalTime) {
		var firstPosition = new Vector2D();
		firstPosition.x = iFirstPosition.x;
		firstPosition.y = iFirstPosition.y;
		var secondPosition = new Vector2D();
		secondPosition.x = iSecondPosition.x;
		secondPosition.y = iSecondPosition.y;
		var gestureHoldAndTapEvent = new GestureHoldAndTapEvent();
		gestureHoldAndTapEvent.elapsedTime = iElapsedTime;
		gestureHoldAndTapEvent.firstPosition = firstPosition;
		gestureHoldAndTapEvent.secondPosition = secondPosition;
		gestureHoldAndTapEvent.intervalTime = iIntervalTime;
		EventServices.dispatchEvent(gestureHoldAndTapEvent);
	};

	Devices.sendKeyboardEnableEvent = function () {
		var newEvt = new KeyboardEnableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendKeyboardDisableEvent = function () {
		var newEvt = new KeyboardDisableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendKeyboardPressEvent = function (iKey, iModifier/*, iRepeat*/) {
	    var newEvt = new KeyboardPressEvent();
	    newEvt.key = iKey;
	    newEvt.modifier = iModifier;
	    newEvt.repeat = keyboard.keysPressed.indexOf(iKey) !== -1;
	    EventServices.dispatchEvent(newEvt);
	};

	Devices.sendKeyboardReleaseEvent = function (iKey, iModifier) {
		var newEvt = new KeyboardReleaseEvent();
	    newEvt.key = iKey;
	    newEvt.modifier = iModifier;
	    EventServices.dispatchEvent(newEvt);
	};

	Devices.sendGamepadEnableEvent = function () {
		var newEvt = new GamepadEnableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendGamepadDisableEvent = function () {
		var newEvt = new GamepadDisableEvent();
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendGamepadPressEvent = function (iButton) {
		var newEvt = new GamepadPressEvent();
		newEvt.button = iButton;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendGamepadReleaseEvent = function (iButton) {
		var newEvt = new GamepadReleaseEvent();
		newEvt.button = iButton;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendGamepadAxisEvent = function (iAxisValue, iAxis) {
		var newEvt = new GamepadAxisEvent();
		newEvt.axisValue = iAxisValue;
		newEvt.axis = iAxis;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendDeviceEnableEvent = function (iIndex, iButtonNames, iAxisNames, iTrackerNames) {
		var parameters = {};
		parameters.index = iIndex;
		parameters.buttonNames = iButtonNames;
		parameters.axisNames = iAxisNames;
		parameters.trackerNames = iTrackerNames;
		var newEvt = new DeviceEnableEvent(parameters);
		newEvt.index = iIndex;
		newEvt.buttonNames = iButtonNames;
		newEvt.axisNames = iAxisNames;
		newEvt.trackerNames = iTrackerNames;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendDeviceDisableEvent = function (iIndex) {
		var parameters = {};
		parameters.index = iIndex;
		var newEvt = new DeviceDisableEvent(parameters);
		newEvt.index = iIndex;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendDevicePressEvent = function (iIndex, iButton, iButtonName) {
		var parameters = {};
		parameters.index = iIndex;
		parameters.button = iButton;
		parameters.buttonName = iButtonName;
		var newEvt = new DevicePressEvent(parameters);
		newEvt.index = iIndex;
		newEvt.button = iButton;
		newEvt.buttonName = iButtonName;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendDeviceReleaseEvent = function (iIndex, iButton, iButtonName) {
		var parameters = {};
		parameters.index = iIndex;
		parameters.button = iButton;
		parameters.buttonName = iButtonName;
		var newEvt = new DeviceReleaseEvent(parameters);
		newEvt.index = iIndex;
		newEvt.button = iButton;
		newEvt.buttonName = iButtonName;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendDeviceAxisEvent = function (iIndex, iAxisValue, iAxis, iAxisName) {
		var parameters = {};
		parameters.index = iIndex;
		parameters.axisValue = iAxisValue;
		parameters.axis = iAxis;
		parameters.axisName = iAxisName;
		var newEvt = new DeviceAxisEvent(parameters);
		newEvt.index = iIndex;
		newEvt.axisValue = iAxisValue;
		newEvt.axis = iAxis;
		newEvt.axisName = iAxisName;
		EventServices.dispatchEvent(newEvt);
	};

	Devices.sendDeviceTrackerEvent = function (iIndex, iTrackerValue, iTracker, iTrackerName) {
		var parameters = {};
		parameters.index = iIndex;
		parameters.trackerValue = iTrackerValue;
		parameters.tracker = iTracker;
		parameters.trackerName = iTrackerName;
		var newEvt = new DeviceTrackerEvent(parameters);
		newEvt.index = iIndex;
		newEvt.trackerValue = iTrackerValue;
		newEvt.tracker = iTracker;
		newEvt.trackerName = iTrackerName;
		EventServices.dispatchEvent(newEvt);
	};

	// Expose in EP namespace.
	EP.Devices = Devices;

	return Devices;
});
