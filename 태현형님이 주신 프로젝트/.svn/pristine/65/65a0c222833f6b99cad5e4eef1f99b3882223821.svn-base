define('DS/StuCID/StuGallery2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports Gallery2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.Gallery2DActor
		*/
		var Gallery2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set item size
			 *
			 * @member
			 * @instance
			 * @name itemSize
			 * @public
			 * @type {DSMath.Vector2D}
			 * @memberOf STU.Gallery2DActor
			 */
			 Tools.bindObject(this, "itemSize", DSMath.Vector2D, ["x", "y"]);

			/**
			 * Get/Set orientation
			 *
			 * @member
			 * @instance
			 * @name orientation
			 * @public
			 * @type {STU.Gallery2DActor.EGalleryOrientation}
			 * @memberOf STU.Gallery2DActor
			 */
			 Object.defineProperty(this, "orientation", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("orientation");
					}
				},
				set: function (value) {
					if (value !== STU.Gallery2DActor.EGalleryOrientation.eVertical
						&& value !== STU.Gallery2DActor.EGalleryOrientation.eHorizontal){
						throw new TypeError("given value should be a value from STU.Gallery2DActor.EGalleryOrientation");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("orientation", value);
					}
				}
			});

			/**
			 * Get/Set stretch to content
			 *
			 * @member
			 * @instance
			 * @name stretchToContent
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Gallery2DActor
			 */
			 Tools.bindVariable(this, "stretchToContent", "boolean");


			/**
			 * Get items
			 *
			 * @member
			 * @instance
			 * @name items
			 * @public
			 * @type {Array.<STU.GalleryItem>}
			 * @readonly
			 * @memberOf STU.Gallery2DActor
			 */
			 Object.defineProperty(this, "items", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("items");
					}
				},
				set: function (value) {
					if (this.initialized) {
						throw new TypeError("property \"items\" is read-only");
					}
				}
			});
		};

		Gallery2DActor.prototype = new UIActor2D();
		Gallery2DActor.prototype.constructor = Gallery2DActor;

		/**
		* Enumeration of gallery orientations
		*
		* @enum {number}
		* @public
		*/
		Gallery2DActor.EGalleryOrientation = {
			eVertical: 0,
			eHorizontal : 1
		};

		Gallery2DActor.prototype.onInitialize = function (oExceptions) {
			UIActor2D.prototype.onInitialize.call(this, oExceptions);

			for (var i = 0; i < this.items.length; i++) {
				this.items[i].initialize(oExceptions);
			}
		};

		// Expose in STU namespace.
		STU.Gallery2DActor = Gallery2DActor;
		return Gallery2DActor;
	}
);
