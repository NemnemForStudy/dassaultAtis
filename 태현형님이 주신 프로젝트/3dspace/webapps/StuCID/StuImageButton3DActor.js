
define('DS/StuCID/StuImageButton3DActor', ['DS/StuCore/StuContext',
	'DS/StuCID/StuUIActor3D'], function (STU, UIActor3D) {
		'use strict';

		var geterSeter = function (self, varName) {
			if (!STU.isEKIntegrationActive()) {
				Object.defineProperty(self, varName, {
					enumerable: true,
					configurable: true,
					get: function () {
						if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
							return self.CATI3DExperienceObject.GetValueByName(varName);
						}
					},
					set: function (value) {
						if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
							self.CATI3DExperienceObject.SetValueByName(varName, value);
						}
					}
				});
			}
		};

		/**
		* Describe a button in the 3D with a customizable representation : a different image can be associated to the disabled, pressed, hovered and normal states. <br/>
		* The image button actor emits the following events : {@link STU.UIClickEvent}, {@link STU.UIDoubleClickEvent}, {@link STU.UIEnterEvent}, 
		* {@link STU.UIExitEvent}, {@link STU.UIPressEvent}, {@link STU.UIReleaseEvent}, {@link STU.UIHoverEvent}.
		*
		* @exports ImageButton3DActor
		* @class
		* @constructor
		* @noinstancector 
		* @public
		* @extends STU.UIActor3D
		* @memberof STU
		* @alias STU.ImageButton3DActor
		*/
		var ImageButton3DActor = function () {

			UIActor3D.call(this);
			this.name = "ImageButton3DActor";

			/**
			* Get/Set normalImage
			*
			* @member
			* @instance
			* @name normalImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton3DActor
			*/
			geterSeter(this, "normalImage");

			/**
			* Get/Set disabledImage
			*
			* @member
			* @instance
			* @name disabledImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton3DActor
			*/
			geterSeter(this, "disabledImage");

			/**
			* Get/Set hoveredImage
			*
			* @member
			* @instance
			* @name hoveredImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton3DActor
			*/
			geterSeter(this, "hoveredImage");

			/**
			* Get/Set pressedImage
			*
			* @member
			* @instance
			* @name pressedImage
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.ImageButton3DActor
			*/
			geterSeter(this, "pressedImage");

		};

		ImageButton3DActor.prototype = new UIActor3D();
		ImageButton3DActor.prototype.constructor = ImageButton3DActor;

		// Expose in STU namespace.
		STU.ImageButton3DActor = ImageButton3DActor;

		return ImageButton3DActor;
	});

define('StuCID/StuImageButton3DActor', ['DS/StuCID/StuImageButton3DActor'], function (ImageButton3DActor) {
	'use strict';

	return ImageButton3DActor;
});


