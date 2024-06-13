define('DS/StuCID/StuGalleryImage2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuGallery2DActor'],
	function (STU, Gallery2DActor) {
		'use strict';

		/**
		* @exports GalleryImage2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.Gallery2DActor
		* @memberof STU
		* @alias STU.GalleryImage2DActor
		*/
		var GalleryImage2DActor = function () {
			Gallery2DActor.call(this);

			/**
			 * Get items
			 *
			 * @member
			 * @instance
			 * @name items
			 * @public
			 * @type {Array.<STU.GalleryImageItem>}
			 * @readonly
			 * @memberOf STU.GalleryImage2DActor
			 */
			 this.items;
		};

		GalleryImage2DActor.prototype = new Gallery2DActor();
		GalleryImage2DActor.prototype.constructor = GalleryImage2DActor;

		// Expose in STU namespace.
		STU.GalleryImage2DActor = GalleryImage2DActor;
		return GalleryImage2DActor;
	}
);

define('StuCID/StuGalleryImage2DActor', ['DS/StuCID/StuGalleryImage2DActor'], function (GalleryImage2DActor) {
	'use strict';
	return GalleryImage2DActor;
});
