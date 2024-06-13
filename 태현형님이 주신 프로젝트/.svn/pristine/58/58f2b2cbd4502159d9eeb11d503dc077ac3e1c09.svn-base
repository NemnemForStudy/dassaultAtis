define('DS/StuCID/StuGalleryProductItem', ['DS/StuCore/StuContext', 'DS/StuCID/StuGalleryItem', 'DS/StuCore/StuTools'],
	function (STU, GalleryItem, Tools) {
		'use strict';

		/**
		* @exports GalleryProductItem
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.GalleryItem
		* @memberof STU
		* @alias STU.GalleryProductItem
		*/
		var GalleryProductItem = function () {
			GalleryItem.call(this);

			/**
			 * Get/Set product
			 * 
			 * @member
			 * @instance
			 * @name product
			 * @public
			 * @type {STU.ProductActor}
			 * @memberOf STU.GalleryProductItem
			 */
			 Tools.bindVariable(this, "product", "object");

			/**
			* Get/Set image
			*
			* @member
			* @instance
			* @name image
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.GalleryProductItem
			*/
			Tools.bindVariable(this, "image", "object");
		};

		GalleryProductItem.prototype = new GalleryItem();
		GalleryProductItem.prototype.constructor = GalleryProductItem;

		// Expose in STU namespace.
		STU.GalleryProductItem = GalleryProductItem;
		return GalleryProductItem;
	}
);

define('StuCID/StuGalleryProductItem', ['DS/StuCID/StuGalleryProductItem'], function (GalleryProductItem) {
	'use strict';
	return GalleryProductItem;
});
