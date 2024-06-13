define('DS/StuCID/StuGalleryMenu2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuGallery2DActor', 'DS/StuCore/StuTools'],
	function (STU, Gallery2DActor, Tools) {
		'use strict';

		/**
		* @exports GalleryMenu2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.Gallery2DActor
		* @memberof STU
		* @alias STU.GalleryMenu2DActor
		*/
		var GalleryMenu2DActor = function () {
			Gallery2DActor.call(this);

			/**
			 * Get/Set font size
			 *
			 * @member
			 * @instance
			 * @name fontSize
			 * @public
			 * @type {number}
			 * @memberOf STU.GalleryMenu2DActor
			 */
			Tools.bindVariable(this, "fontSize", "number");

			/**
			 * Get items
			 *
			 * @member
			 * @instance
			 * @name items
			 * @public
			 * @type {Array.<STU.GalleryMenuItem>}
			 * @readonly
			 * @memberOf STU.GalleryMenu2DActor
			 */
			this.items;
		};

		GalleryMenu2DActor.prototype = new Gallery2DActor();
		GalleryMenu2DActor.prototype.constructor = GalleryMenu2DActor;

		// Expose in STU namespace.
		STU.GalleryMenu2DActor = GalleryMenu2DActor;
		return GalleryMenu2DActor;
	}
);

define('StuCID/StuGalleryMenu2DActor', ['DS/StuCID/StuGalleryMenu2DActor'], function (GalleryMenu2DActor) {
	'use strict';
	return GalleryMenu2DActor;
});
