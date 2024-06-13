define('DS/StuCID/StuColorPicker2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuRenderEngine/StuColor', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Color, Tools) {
		'use strict';

		/**
		* @exports ColorPicker2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.ColorPicker2DActor
		*/
		var ColorPicker2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set color
			 * 
			 * @member
			 * @instance
			 * @name color
			 * @public
			 * @type {STU.Color}
			 * @memberOf STU.ColorPicker2DActor
			 */
			 Tools.bindVCXColor(this, "color", Color);
		};

		ColorPicker2DActor.prototype = new UIActor2D();
		ColorPicker2DActor.prototype.constructor = ColorPicker2DActor;

		// Expose in STU namespace.
		STU.ColorPicker2DActor = ColorPicker2DActor;
		return ColorPicker2DActor;
	}
);

define('StuCID/StuColorPicker2DActor', ['DS/StuCID/StuColorPicker2DActor'], function (ColorPicker2DActor) {
	'use strict';
	return ColorPicker2DActor;
});
