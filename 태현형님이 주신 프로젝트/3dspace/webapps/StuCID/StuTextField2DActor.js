define('DS/StuCID/StuTextField2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports TextField2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.TextField2DActor
		*/
		var TextField2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set text
			 *
			 * @member
			 * @instance
			 * @name text
			 * @public
			 * @type {string}
			 * @memberOf STU.TextField2DActor
			 */
			 Tools.bindVariable(this, "text", "string");
		};

		TextField2DActor.prototype = new UIActor2D();
		TextField2DActor.prototype.constructor = TextField2DActor;

		// Expose in STU namespace.
		STU.TextField2DActor = TextField2DActor;
		return TextField2DActor;
	}
);

define('StuCID/StuTextField2DActor', ['DS/StuCID/StuTextField2DActor'], function (TextField2DActor) {
	'use strict';
	return TextField2DActor;
});
