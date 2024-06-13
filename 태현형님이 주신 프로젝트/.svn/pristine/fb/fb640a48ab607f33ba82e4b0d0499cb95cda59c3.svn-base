define('DS/StuCID/StuGalleryItem', ['DS/StuCore/StuContext', 'DS/StuModel/StuInstance', 'DS/StuCore/StuTools'],
	function (STU, Instance, Tools) {
		'use strict';

		/**
		* @exports GalleryItem
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.Instance
		* @memberof STU
		* @alias STU.GalleryItem
		*/
		var GalleryItem = function () {
			Instance.call(this);

			/**
			 * Get/Set label
			 *
			 * @member
			 * @instance
			 * @name label
			 * @public
			 * @type {string}
			 * @memberOf STU.GalleryItem
			 */
			 Tools.bindVariable(this, "label", "string");
		};

		GalleryItem.prototype = new Instance();
		GalleryItem.prototype.constructor = GalleryItem;

		// Expose in STU namespace.
		STU.GalleryItem = GalleryItem;
		return GalleryItem;
	}
);

define('StuCID/StuGalleryItem', ['DS/StuCID/StuGalleryItem'], function (GalleryItem) {
	'use strict';
	return GalleryItem;
});
