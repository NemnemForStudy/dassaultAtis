define('DS/StuCID/StuGalleryMenuItem', ['DS/StuCore/StuContext', 'DS/StuCID/StuGalleryItem'],
	function (STU, GalleryItem) {
		'use strict';

		/**
		* @exports GalleryMenuItem
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.GalleryItem
		* @memberof STU
		* @alias STU.GalleryMenuItem
		*/
		var GalleryMenuItem = function () {
			GalleryItem.call(this);
		};

		GalleryMenuItem.prototype = new GalleryItem();
		GalleryMenuItem.prototype.constructor = GalleryMenuItem;

		// Expose in STU namespace.
		STU.GalleryMenuItem = GalleryMenuItem;
		return GalleryMenuItem;
	}
);

define('StuCID/StuGalleryMenuItem', ['DS/StuCID/StuGalleryMenuItem'], function (GalleryMenuItem) {
	'use strict';
	return GalleryMenuItem;
});
