define('DS/EPInputsServicesWeb/EPGestureListener', [
	'DS/EPInputs/EPTouchMoveEvent',
	'DS/EPInputs/EPTouchIdleEvent',
	'DS/EPInputs/EPTouchPressEvent',
	'DS/EPInputs/EPTouchReleaseEvent',
	'UWA/Element',
	'DS/VisuEvents/EventsManager'
], function (TouchMoveEvent, TouchIdleEvent, TouchPressEvent, TouchReleaseEvent, UWAElement, EventsManager) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias GestureListener
	 * @private
	 * @param {InputsServices} iInputsServices
	 */
	var GestureListener = function (iInputsServices) {
		this.inputsServices = iInputsServices;
		this.registered = false;
		this.element = undefined;
	};

	GestureListener.prototype.constructor = GestureListener;

	/**
	 *
	 *
	 * @private
	 * @param {Element} iElement
	 * @return {boolean} true: success, false: failure
	 * @see GestureListener#unregister
	 */
	GestureListener.prototype.register = function (iElement) {
		var result = false;

		if (!this.registered) {
			this.element = iElement;

			this.gestureTapCb = this.onGestureTap.bind(this);
			this.gestureDoubleTapCb = this.onGestureDoubleTap.bind(this);
			this.gestureHoldCb = this.onGestureHold.bind(this);
			this.gestureMediumHoldCb = this.onGestureMediumHold.bind(this);
			this.gestureLongHoldCb = this.onGestureLongHold.bind(this);
			this.gestureDragCb = this.onGestureDrag.bind(this);
			this.gestureFlickCb = this.onGestureFlick.bind(this);
			this.gesturePanCb = this.onGesturePan.bind(this);
			this.gesturePinchCb = this.onGesturePinch.bind(this);
			this.gestureRotateCb = this.onGestureRotate.bind(this);
			this.gestureTwoFingerTapCb = this.onGestureTwoFingerTap.bind(this);
			this.gestureHoldTapCb = this.onGestureHoldTap.bind(this);
			this.gestureHoldDragCb = this.onGestureHoldDrag.bind(this);

			EventsManager.addEvent(this.element, 'onTap', this.gestureTapCb);
			EventsManager.addEvent(this.element, 'onDoubleTap', this.gestureDoubleTapCb);
			EventsManager.addEvent(this.element, 'onHoldStay', this.gestureHoldCb);
			EventsManager.addEvent(this.element, 'onMediumHoldStay', this.gestureMediumHoldCb);
			EventsManager.addEvent(this.element, 'onLongHoldStay', this.gestureLongHoldCb);
			EventsManager.addEvent(this.element, 'onTouchDrag', this.gestureDragCb);
			EventsManager.addEvent(this.element, 'onFlick', this.gestureFlickCb);
			EventsManager.addEvent(this.element, 'onPan', this.gesturePanCb);
			EventsManager.addEvent(this.element, 'onPinch', this.gesturePinchCb);
			EventsManager.addEvent(this.element, 'onRotate', this.gestureRotateCb);
			EventsManager.addEvent(this.element, 'onTwoFingerTap', this.gestureTwoFingerTapCb);
			EventsManager.addEvent(this.element, 'onHoldTap', this.gestureHoldTapCb);
			EventsManager.addEvent(this.element, 'onHoldDrag', this.gestureHoldDragCb);

			this.touchStartCb = this.onTouchStart.bind(this);
			this.touchEndCb = this.onTouchEnd.bind(this);
			this.touchMoveCb = this.onTouchMove.bind(this);

			this.element.addEventListener('touchstart', this.touchStartCb, false);
			this.element.addEventListener('touchend', this.touchEndCb, false);
			this.element.addEventListener('touchcancel', this.touchEndCb, false);
			this.element.addEventListener('touchmove', this.touchMoveCb, false);

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
	 * @see GestureListener#register
	 */
	GestureListener.prototype.unregister = function () {
		var result = false;

		if (this.registered) {
			EventsManager.removeEvent(this.element, 'onTap', this.gestureTapCb);
			EventsManager.removeEvent(this.element, 'onDoubleTap', this.gestureDoubleTapCb);
			EventsManager.removeEvent(this.element, 'onHoldStay', this.gestureHoldCb);
			EventsManager.removeEvent(this.element, 'onMediumHoldStay', this.gestureMediumHoldCb);
			EventsManager.removeEvent(this.element, 'onLongHoldStay', this.gestureLongHoldCb);
			EventsManager.removeEvent(this.element, 'onTouchDrag', this.gestureDragCb);
			EventsManager.removeEvent(this.element, 'onFlick', this.gestureFlickCb);
			EventsManager.removeEvent(this.element, 'onPan', this.gesturePanCb);
			EventsManager.removeEvent(this.element, 'onPinch', this.gesturePinchCb);
			EventsManager.removeEvent(this.element, 'onRotate', this.gestureRotateCb);
			EventsManager.removeEvent(this.element, 'onTwoFingerTap', this.gestureTwoFingerTapCb);
			EventsManager.removeEvent(this.element, 'onHoldTap', this.gestureHoldTapCb);
			EventsManager.removeEvent(this.element, 'onHoldDrag', this.gestureHoldDragCb);

			delete this.gestureTapCb;
			delete this.gestureDoubleTapCb;
			delete this.gestureHoldCb;
			delete this.gestureMediumHoldCb;
			delete this.gestureLongHoldCb;
			delete this.gestureDragCb;
			delete this.gestureFlickCb;
			delete this.gesturePanCb;
			delete this.gesturePinchCb;
			delete this.gestureRotateCb;
			delete this.gestureTwoFingerTapCb;
			delete this.gestureHoldTapCb;
			delete this.gestureHoldDragCb;

			this.element.removeEventListener('touchstart', this.touchStartCb, false);
			this.element.removeEventListener('touchend', this.touchEndCb, false);
			this.element.removeEventListener('touchcancel', this.touchEndCb, false);
			this.element.removeEventListener('touchmove', this.touchMoveCb, false);

			delete this.touchStartCb;
			delete this.touchEndCb;
			delete this.touchMoveCb;

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
	 * @param {TouchEvent} iTouchEvent
	 */
	GestureListener.prototype.onTouchStart = function (iTouchEvent) {
		var eventTypeList = [];
		var idList = [];
		var positionList = [];

		var touch;
		var t;
		var boundingClientRect;
		for (t = 0; t < iTouchEvent.targetTouches.length; t++) {
			touch = iTouchEvent.targetTouches[t];
			boundingClientRect = touch.target.getBoundingClientRect();
			eventTypeList.push(TouchIdleEvent.prototype.type);
			idList.push(touch.identifier);
			positionList.push({ x: touch.clientX - boundingClientRect.left, y: touch.clientY - boundingClientRect.top });
		}

		var index;
		for (t = 0; t < iTouchEvent.changedTouches.length; t++) {
			touch = iTouchEvent.changedTouches[t];
			index = idList.indexOf(touch.identifier);
			eventTypeList[index] = TouchPressEvent.prototype.type;
		}

		this.inputsServices.onGestureMultiTouch(eventTypeList, positionList);
	};

	/**
	 *
	 *
	 * @private
	 * @param {TouchEvent} iTouchEvent
	 */
	GestureListener.prototype.onTouchEnd = function (iTouchEvent) {
		var eventTypeList = [];
		var idList = [];
		var positionList = [];

		var touch;
		var t;
		var boundingClientRect;
		for (t = 0; t < iTouchEvent.targetTouches.length; t++) {
			touch = iTouchEvent.targetTouches[t];
			boundingClientRect = touch.target.getBoundingClientRect();
			eventTypeList.push(TouchIdleEvent.prototype.type);
			idList.push(touch.identifier);
			positionList.push({ x: touch.clientX - boundingClientRect.left, y: touch.clientY - boundingClientRect.top });
		}

		for (t = 0; t < iTouchEvent.changedTouches.length; t++) {
			touch = iTouchEvent.changedTouches[t];
			boundingClientRect = touch.target.getBoundingClientRect();
			eventTypeList.push(TouchReleaseEvent.prototype.type);
			idList.push(touch.identifier);
			positionList.push({ x: touch.clientX - boundingClientRect.left, y: touch.clientY - boundingClientRect.top });
		}

		this.inputsServices.onGestureMultiTouch(eventTypeList, positionList);
	};

	/**
	 *
	 *
	 * @private
	 * @param {TouchEvent} iTouchEvent
	 */
	GestureListener.prototype.onTouchMove = function (iTouchEvent) {
		var eventTypeList = [];
		var idList = [];
		var positionList = [];

		var touch;
		var t;
		var boundingClientRect;
		for (t = 0; t < iTouchEvent.targetTouches.length; t++) {
			touch = iTouchEvent.targetTouches[t];
			boundingClientRect = touch.target.getBoundingClientRect();
			eventTypeList.push(TouchIdleEvent.prototype.type);
			idList.push(touch.identifier);
			positionList.push({ x: touch.clientX - boundingClientRect.left, y: touch.clientY - boundingClientRect.top });
		}

		var index;
		for (t = 0; t < iTouchEvent.changedTouches.length; t++) {
			touch = iTouchEvent.changedTouches[t];
			index = idList.indexOf(touch.identifier);
			eventTypeList[index] = TouchMoveEvent.prototype.type;
		}

		this.inputsServices.onGestureMultiTouch(eventTypeList, positionList);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureTap = function (iEvent) {
		var tapGesture = iEvent.gesture;
		var elapsedTime = tapGesture.getElapsedTime();
		var position = tapGesture.getTouchPoint();
		this.inputsServices.onGestureTap(elapsedTime, position);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureDoubleTap = function (iEvent) {
		var doubleTapGesture = iEvent.gesture;
		var elapsedTime = doubleTapGesture.getElapsedTime();
		var position = doubleTapGesture.getTouchPoint();
		this.inputsServices.onGestureDoubleTap(elapsedTime, position);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureHold = function (iEvent) {
		var holdGesture = iEvent.gesture;
		var elapsedTime = holdGesture.getElapsedTime();
		var position = holdGesture.getTouchPoint();
		this.inputsServices.onGestureHold(elapsedTime, position);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureMediumHold = function (iEvent) {
		var mediumHoldGesture = iEvent.gesture;
		var elapsedTime = mediumHoldGesture.getElapsedTime();
		var position = mediumHoldGesture.getTouchPoint();
		this.inputsServices.onGestureMediumHold(elapsedTime, position);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureLongHold = function (iEvent) {
		var longHoldGesture = iEvent.gesture;
		var elapsedTime = longHoldGesture.getElapsedTime();
		var position = longHoldGesture.getTouchPoint();
		this.inputsServices.onGestureLongHold(elapsedTime, position);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureDrag = function (iEvent) {
		var dragGesture = iEvent.gesture;
		var elapsedTime = dragGesture.getElapsedTime();
		var position = dragGesture.getTouchPoint();
		var deltaPosition = dragGesture.getLastTraveledVector();
		var vectorFromOrigin = dragGesture.getDirectionFromOrigin();
		this.inputsServices.onGestureDrag(elapsedTime, position, deltaPosition, vectorFromOrigin);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureFlick = function (iEvent) {
		var flickGesture = iEvent.gesture;
		var elapsedTime = flickGesture.getElapsedTime();
		var vector = flickGesture.getFlickVector();
		var duration = flickGesture.getFlickDuration();
		this.inputsServices.onGestureFlick(elapsedTime, vector, duration);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGesturePan = function (iEvent) {
		var panGesture = iEvent.gesture;
		var elapsedTime = panGesture.getElapsedTime();
		var firstPosition = panGesture.getFirstTouchPosition();
		var secondPosition = panGesture.getSecondTouchPosition();
		var deltaPosition = panGesture.getLastTraveledVector();
		var vectorFromOrigin = panGesture.getDirectionFromOrigin();
		this.inputsServices.onGesturePan(elapsedTime, firstPosition, secondPosition, deltaPosition, vectorFromOrigin);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGesturePinch = function (iEvent) {
		var pinchGesture = iEvent.gesture;
		var elapsedTime = pinchGesture.getElapsedTime();
		var firstPosition = pinchGesture.getFirstTouchPosition();
		var secondPosition = pinchGesture.getSecondTouchPosition();
		var distance = pinchGesture.getDistance();
		this.inputsServices.onGesturePinch(elapsedTime, firstPosition, secondPosition, distance);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureRotate = function (iEvent) {
		var rotateGesture = iEvent.gesture;
		var elapsedTime = rotateGesture.getElapsedTime();
		var firstPosition = rotateGesture.getFirstTouchPosition();
		var secondPosition = rotateGesture.getSecondTouchPosition();
		var originVector = rotateGesture.getOriginDirection();
		var lastVector = rotateGesture.getLastDirection();
		var vector = rotateGesture.getCurrentDirection();
		this.inputsServices.onGestureTwoFingersRotate(elapsedTime, firstPosition, secondPosition, originVector, lastVector, vector);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureTwoFingerTap = function (iEvent) {
		var twoFingerTapGesture = iEvent.gesture;
		var elapsedTime = twoFingerTapGesture.getElapsedTime();
		var firstPosition = twoFingerTapGesture.getFirstTouchPosition();
		var secondPosition = twoFingerTapGesture.getSecondTouchPosition();
		this.inputsServices.onGestureTwoFingersTap(elapsedTime, firstPosition, secondPosition);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureHoldTap = function (iEvent) {
		var holdTapGesture = iEvent.gesture;
		var elapsedTime = holdTapGesture.getElapsedTime();
		var firstPosition = holdTapGesture.getFirstTouchPosition();
		var secondPosition = holdTapGesture.getSecondTouchPosition();
		var intervalTime = holdTapGesture.getTapElapsedTime();
		this.inputsServices.onGestureHoldAndTap(elapsedTime, firstPosition, secondPosition, intervalTime);
	};

	/**
	 *
	 *
	 * @private
	 * @param {Object} iEvent
	 */
	GestureListener.prototype.onGestureHoldDrag = function (iEvent) {
		var holdDragGesture = iEvent.gesture;
		var elapsedTime = holdDragGesture.getElapsedTime();
		var firstPosition = holdDragGesture.getFirstTouchPosition();
		var secondPosition = holdDragGesture.getSecondTouchPosition();
		var deltaPosition = holdDragGesture.getLastTraveledVector();
		var vectorFromOrigin = holdDragGesture.getDirectionFromOrigin();
		var dragTime = holdDragGesture.getDragTime();
		this.inputsServices.onGestureHoldAndDrag(elapsedTime, firstPosition, secondPosition, deltaPosition, vectorFromOrigin, dragTime);
	};

	return GestureListener;
});
