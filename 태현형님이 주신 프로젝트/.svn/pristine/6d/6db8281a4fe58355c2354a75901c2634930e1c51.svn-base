define('DS/StuCID/StuButton2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools', 'DS/MathematicsES/MathsDef'],
	function (STU, UIActor2D, Tools, DSMath) {
		'use strict';

		/**
		* @exports Button2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.Button2DActor
		*/
		var Button2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set label
			 *
			 * @member
			 * @instance
			 * @name label
			 * @public
			 * @type {string}
			 * @memberOf STU.Button2DActor
			 */
			Tools.bindVariable(this, "label", "string");

			/**
			 * Get/Set font size
			 *
			 * @member
			 * @instance
			 * @name fontSize
			 * @public
			 * @type {number}
			 * @memberOf STU.Button2DActor
			 */
			Tools.bindVariable(this, "fontSize", "number");

			/**
			 * Get/Set pushable
			 *
			 * @member
			 * @instance
			 * @name pushable
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Button2DActor
			 */
			Tools.bindVariable(this, "pushable", "boolean");

			/**
			 * Get/Set pushed
			 *
			 * @member
			 * @instance
			 * @name pushed
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Button2DActor
			 */
			Tools.bindVariable(this, "pushed", "boolean");

			/**
			 * Get/Set icon
			 *
			 * @member
			 * @instance
			 * @name icon
			 * @public
			 * @type {STU.PictureResource}
			 * @memberOf STU.Button2DActor
			 */
			Tools.bindVariable(this, "icon", "object");

			/**
			 * Get/Set icon dimension
			 *
			 * @member
			 * @instance
			 * @name iconDimension
			 * @public
			 * @type {DSMath.Vector2D}
			 * @memberOf STU.Button2DActor
			 */
			Tools.bindObject(this, "iconDimension", DSMath.Vector2D, ["x", "y"]);
		};

		Button2DActor.prototype = new UIActor2D();
		Button2DActor.prototype.constructor = Button2DActor;

		// Expose in STU namespace.
		STU.Button2DActor = Button2DActor;
		return Button2DActor;
	}
);

define('StuCID/StuButton2DActor', ['DS/StuCID/StuButton2DActor'], function (Button2DActor) {
	'use strict';
	return Button2DActor;
});
