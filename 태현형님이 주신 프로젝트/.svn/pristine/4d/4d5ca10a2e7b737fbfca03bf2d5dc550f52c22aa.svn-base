define('DS/StuCID/StuImage2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports Image2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.Image2DActor
		*/
		var Image2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set image
			 *
			 * @member
			 * @instance
			 * @name image
			 * @public
			 * @type {STU.PictureResource}
			 * @memberOf STU.Image2DActor
			 */
			Tools.bindVariable(this, "image", "object");
		};

		Image2DActor.prototype = new UIActor2D();
		Image2DActor.prototype.constructor = Image2DActor;

		/**
		 * for NL capacity
		 *
		 * @method
		 * @private
		 */
		 Image2DActor.prototype.setImage = function (iImageRsc) {
			this.image = iImageRsc;
		}

		// Expose in STU namespace.
		STU.Image2DActor = Image2DActor;
		return Image2DActor;
	}
);

define('StuCID/StuImage2DActor', ['DS/StuCID/StuImage2DActor'], function (Image2DActor) {
	'use strict';
	return Image2DActor;
});
