define('DS/StuCID/StuGalleryViewpoint2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuGallery2DActor', 'DS/StuCore/StuTools'],
	function (STU, Gallery2DActor, Tools) {
		'use strict';

		/**
		* @exports GalleryViewpoint2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.Gallery2DActor
		* @memberof STU
		* @alias STU.GalleryViewpoint2DActor
		*/
		var GalleryViewpoint2DActor = function () {
			Gallery2DActor.call(this);

			/**
			 * Get/Set live update
			 *
			 * @member
			 * @instance
			 * @name liveUpdate
			 * @public
			 * @type {boolean}
			 * @memberOf STU.GalleryViewpoint2DActor
			 */
			 Tools.bindVariable(this, "liveUpdate", "boolean");

			/**
			 * Get items
			 *
			 * @member
			 * @instance
			 * @name items
			 * @public
			 * @type {Array.<STU.GalleryViewpointItem>}
			 * @readonly
			 * @memberOf STU.GalleryViewpoint2DActor
			 */
			 this.items;
		};

		GalleryViewpoint2DActor.prototype = new Gallery2DActor();
		GalleryViewpoint2DActor.prototype.constructor = GalleryViewpoint2DActor;

		// Expose in STU namespace.
		STU.GalleryViewpoint2DActor = GalleryViewpoint2DActor;
		return GalleryViewpoint2DActor;
	}
);

define('StuCID/StuGalleryViewpoint2DActor', ['DS/StuCID/StuGalleryViewpoint2DActor'], function (GalleryViewpoint2DActor) {
	'use strict';
	return GalleryViewpoint2DActor;
});
