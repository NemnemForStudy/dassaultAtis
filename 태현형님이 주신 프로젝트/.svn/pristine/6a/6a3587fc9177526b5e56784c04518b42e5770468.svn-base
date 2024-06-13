define('DS/StuCID/StuImageButton2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports ImageButton2DActor 
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.ImageButton2DActor 
		*/
		var ImageButton2DActor  = function () {
			UIActor2D.call(this);

			/**
			* Get/Set normalImage
			*
			* @member
			* @instance
			* @name normalImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton2DActor
			*/
			Tools.bindVariable(this, "normalImage", "object");

			/**
			* Get/Set disabledImage
			*
			* @member
			* @instance
			* @name disabledImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton2DActor
			*/
			Tools.bindVariable(this, "disabledImage", "object");

			/**
			* Get/Set hoveredImage
			*
			* @member
			* @instance
			* @name hoveredImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton2DActor
			*/
			Tools.bindVariable(this, "hoveredImage", "object");

			/**
			* Get/Set pressedImage
			*
			* @member
			* @instance
			* @name pressedImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton2DActor
			*/
			Tools.bindVariable(this, "pressedImage", "object");

		};

		ImageButton2DActor.prototype = new UIActor2D();
		ImageButton2DActor.prototype.constructor = ImageButton2DActor ;

		// Expose in STU namespace.
		STU.ImageButton2DActor  = ImageButton2DActor ;
		return ImageButton2DActor ;
	}
);

define('StuCID/StuImageButton2DActor ', ['DS/StuCID/StuImageButton2DActor'], function (ImageButton2DActor) {
	'use strict';
	return ImageButton2DActor ;
});
