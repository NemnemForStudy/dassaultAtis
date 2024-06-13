define('DS/StuCID/StuGalleryViewpointItem', ['DS/StuCore/StuContext', 'DS/StuCID/StuGalleryItem', 'DS/StuCore/StuTools'],
	function (STU, GalleryItem, Tools) {
		'use strict';

		/**
		* @exports GalleryViewpointItem
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.GalleryItem
		* @memberof STU
		* @alias STU.GalleryViewpointItem
		*/
		var GalleryViewpointItem = function () {
			GalleryItem.call(this);

			/**
			 * Get/Set camera
			 * 
			 * @member
			 * @instance
			 * @name camera
			 * @public
			 * @type {STU.Camera}
			 * @memberOf STU.GalleryViewpointItem
			 */
			 Tools.bindVariable(this, "camera", "object");

			/**
			* Get/Set image
			*
			* @member
			* @instance
			* @name image
			* @public
			* @type {STU.PictureResource}
			* @memberOf STU.GalleryViewpointItem
			*/
			Tools.bindVariable(this, "image", "object");
		};

		GalleryViewpointItem.prototype = new GalleryItem();
		GalleryViewpointItem.prototype.constructor = GalleryViewpointItem;

		// Expose in STU namespace.
		STU.GalleryViewpointItem = GalleryViewpointItem;
		return GalleryViewpointItem;
	}
);

define('StuCID/StuGalleryViewpointItem', ['DS/StuCID/StuGalleryViewpointItem'], function (GalleryViewpointItem) {
	'use strict';
	return GalleryViewpointItem;
});
