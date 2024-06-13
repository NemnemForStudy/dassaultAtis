define('DS/StuCID/StuGalleryImageItem', ['DS/StuCore/StuContext', 'DS/StuCID/StuGalleryItem', 'DS/StuCore/StuTools'],
	function (STU, GalleryItem, Tools) {
		'use strict';

		/**
		* @exports GalleryImageItem
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.GalleryItem
		* @memberof STU
		* @alias STU.GalleryImageItem
		*/
		var GalleryImageItem = function () {
			GalleryItem.call(this);

			/**
			* Get/Set image
			*
			* @member
			* @instance
			* @name image
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.GalleryImageItem
			*/
			Tools.bindVariable(this, "image", "object");
		};

		GalleryImageItem.prototype = new GalleryItem();
		GalleryImageItem.prototype.constructor = GalleryImageItem;

		// Expose in STU namespace.
		STU.GalleryImageItem = GalleryImageItem;
		return GalleryImageItem;
	}
);

define('StuCID/StuGalleryImageItem', ['DS/StuCID/StuGalleryImageItem'], function (GalleryImageItem) {
	'use strict';
	return GalleryImageItem;
});
