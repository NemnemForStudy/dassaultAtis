define('DS/StuCID/StuGalleryProduct2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuGallery2DActor'],
	function (STU, Gallery2DActor) {
		'use strict';

		/**
		* @exports GalleryProduct2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.Gallery2DActor
		* @memberof STU
		* @alias STU.GalleryProduct2DActor
		*/
		var GalleryProduct2DActor = function () {
			Gallery2DActor.call(this);

			/**
			 * Get items
			 *
			 * @member
			 * @instance
			 * @name items
			 * @public
			 * @type {Array.<STU.GalleryProductItem>}
			 * @readonly
			 * @memberOf STU.GalleryProduct2DActor
			 */
			this.items;
		};

		GalleryProduct2DActor.prototype = new Gallery2DActor();
		GalleryProduct2DActor.prototype.constructor = GalleryProduct2DActor;

		// Expose in STU namespace.
		STU.GalleryProduct2DActor = GalleryProduct2DActor;
		return GalleryProduct2DActor;
	}
);

define('StuCID/StuGalleryProduct2DActor', ['DS/StuCID/StuGalleryProduct2DActor'], function (GalleryProduct2DActor) {
	'use strict';
	return GalleryProduct2DActor;
});
