define('DS/StuCID/StuCameraViewer2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports CameraViewer2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.CameraViewer2DActor
		*/
		var CameraViewer2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set camera
			 * 
			 * @member
			 * @instance
			 * @name camera
			 * @public
			 * @type {STU.Camera}
			 * @memberOf STU.CameraViewer2DActor
			 */
			 Tools.bindVariable(this, "camera", "object");

			/**
			 * Get/Set live update
			 *
			 * @member
			 * @instance
			 * @name liveUpdate
			 * @public
			 * @type {boolean}
			 * @memberOf STU.CameraViewer2DActor
			 */
			 Tools.bindVariable(this, "liveUpdate", "boolean");
		};

		CameraViewer2DActor.prototype = new UIActor2D();
		CameraViewer2DActor.prototype.constructor = CameraViewer2DActor;

		// Expose in STU namespace.
		STU.CameraViewer2DActor = CameraViewer2DActor;
		return CameraViewer2DActor;
	}
);

define('StuCID/StuCameraViewer2DActor', ['DS/StuCID/StuCameraViewer2DActor'], function (CameraViewer2DActor) {
	'use strict';
	return CameraViewer2DActor;
});
