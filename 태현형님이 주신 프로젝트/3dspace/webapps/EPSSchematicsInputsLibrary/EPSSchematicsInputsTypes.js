define('DS/EPSSchematicsInputsLibrary/EPSSchematicsInputsTypes', [
    'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary',
	'DS/EPInputs/EPMouseMoveEvent',
	'DS/EPInputs/EPMousePressEvent',
	'DS/EPInputs/EPMouseReleaseEvent',
	'DS/EPInputs/EPMouseClickEvent',
	'DS/EPInputs/EPMouseDoubleClickEvent',
	'DS/EPInputs/EPMouseWheelEvent',
	'DS/EPInputs/EPKeyboardPressEvent',
	'DS/EPInputs/EPKeyboardReleaseEvent'
], function (TypeLibrary,
	MouseMoveEvent, MousePressEvent, MouseReleaseEvent, MouseClickEvent, MouseDoubleClickEvent, MouseWheelEvent,
	KeyboardPressEvent, KeyboardReleaseEvent) {
    'use strict';

	TypeLibrary.registerGlobalEventType(MouseMoveEvent.prototype.type, MouseMoveEvent, {}, false);
	TypeLibrary.registerGlobalEventType(MousePressEvent.prototype.type, MousePressEvent, {}, false);
	TypeLibrary.registerGlobalEventType(MouseReleaseEvent.prototype.type, MouseReleaseEvent, {}, false);
	TypeLibrary.registerGlobalEventType(MouseClickEvent.prototype.type, MouseClickEvent, {}, false);
	TypeLibrary.registerGlobalEventType(MouseDoubleClickEvent.prototype.type, MouseDoubleClickEvent, {}, false);
	TypeLibrary.registerGlobalEventType(MouseWheelEvent.prototype.type, MouseWheelEvent, {}, false);

	TypeLibrary.registerGlobalEventType(KeyboardPressEvent.prototype.type, KeyboardPressEvent, {}, false);
	TypeLibrary.registerGlobalEventType(KeyboardReleaseEvent.prototype.type, KeyboardReleaseEvent, {}, false);

	return null;
});
