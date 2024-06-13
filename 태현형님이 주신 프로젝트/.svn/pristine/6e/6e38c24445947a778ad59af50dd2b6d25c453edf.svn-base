define('DS/StuCID/StuText2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools', 'DS/StuRenderEngine/StuColor'],
	function (STU, UIActor2D, Tools, Color) {
		'use strict';

		/**
		* @exports Text2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.Text2DActor
		*/
		var Text2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set text
			 *
			 * @member
			 * @instance
			 * @name text
			 * @public
			 * @type {string}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "text", "string");

			/**
			 * Get/Set font size
			 *
			 * @member
			 * @instance
			 * @name fontSize
			 * @public
			 * @type {number}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "fontSize", "number");

			/**
			 * Get/Set font
			 *
			 * @member
			 * @instance
			 * @name font
			 * @public
			 * @type {string}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "font", "string");

			 
			/**
			 * Get/Set italic
			 *
			 * @member
			 * @instance
			 * @name italic
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "italic", "boolean");

			/**
			 * Get/Set bold
			 *
			 * @member
			 * @instance
			 * @name bold
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "bold", "boolean");

			/**
			 * Get/Set alignment
			 *
			 * @member
			 * @instance
			 * @name alignment
			 * @public
			 * @type {STU.Text2DActor.ETextAlignments}
			 * @memberOf STU.Text2DActor
			 */
			 Object.defineProperty(this, "alignment", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("alignment");
					}
				},
				set: function (value) {
					if (value !== STU.Text2DActor.ETextAlignments.eAlignLeft
						&& value !== STU.Text2DActor.ETextAlignments.eAlignCenter
						&& value !== STU.Text2DActor.ETextAlignments.eAlignRight){
						throw new TypeError("given value should be a value from STU.Text2DActor.ETextAlignments");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("alignment", value);
					}
				}
			});

			/**
			 * Get/Set text color
			 * 
			 * @member
			 * @instance
			 * @name textColor
			 * @public
			 * @type {STU.Color}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVCXColor(this, "textColor", Color);

			/**
			 * Get/Set text opacity. Value is between 0 and 1
			 *
			 * @member
			 * @instance
			 * @name textOpacity
			 * @public
			 * @type {number}
			 * @memberOf STU.Text2DActor
			 */
			 Object.defineProperty(this, "textOpacity", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("textOpacity");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given value is not a number');
					}
					if (value > 1 || value < 0){
						throw new TypeError("given value should be between 0 and 1");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("textOpacity", value);
					}
				}
			});

			/**
			 * Get/Set show background
			 *
			 * @member
			 * @instance
			 * @name showBackground
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "showBackground", "boolean");

			/**
			 * Get/Set background color
			 * 
			 * @member
			 * @instance
			 * @name backgroundColor
			 * @public
			 * @type {STU.Color}
			 * @memberOf STU.Text2DActor
			 */
			 Tools.bindVCXColor(this, "backgroundColor", Color);

			/**
			 * Get/Set background opacity. Value is between 0 and 1
			 *
			 * @member
			 * @instance
			 * @name backgroundOpacity
			 * @public
			 * @type {number}
			 * @memberOf STU.Text2DActor
			 */
			Object.defineProperty(this, "backgroundOpacity", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("backgroundOpacity");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given value is not a number');
					}
					if (value > 1 || value < 0){
						throw new TypeError("given value should be between 0 and 1");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("backgroundOpacity", value);
					}
				}
			});


			/**
			 * Get/Set show border
			 *
			 * @member
			 * @instance
			 * @name showBorder
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Text2DActor
			 */
			Tools.bindVariable(this, "showBorder", "boolean");

			/**
			 * Get/Set border color
			 * 
			 * @member
			 * @instance
			 * @name borderColor
			 * @public
			 * @type {STU.Color}
			 * @memberOf STU.Text2DActor
			 */
			 Tools.bindVCXColor(this, "borderColor", Color);
			
			/**
			 * Get/Set border opacity. Value is between 0 and 1
			 *
			 * @member
			 * @instance
			 * @name borderOpacity
			 * @public
			 * @type {number}
			 * @memberOf STU.Text2DActor
			 */
			 Object.defineProperty(this, "borderOpacity", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("borderOpacity");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given value is not a number');
					}
					if (value > 1 || value < 0){
						throw new TypeError("given value should be between 0 and 1");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("borderOpacity", value);
					}
				}
			});

			 
		};

		Text2DActor.prototype = new UIActor2D();
		Text2DActor.prototype.constructor = Text2DActor;

		/**
		 * for NL capacity
		 *
		 * @method
		 * @private
		 */
		 Text2DActor.prototype.setText = function (iText) {
			this.text = iText;
		}

		/**
		* Enumeration of all possible text alignments
		*
		* @enum {number}
		* @public
		*/
		Text2DActor.ETextAlignments = {
			eAlignLeft: 0,
			eAlignCenter: 1,
			eAlignRight: 2
		};

		// Expose in STU namespace.
		STU.Text2DActor = Text2DActor;
		return Text2DActor;
	}
);

define('StuCID/StuText2DActor', ['DS/StuCID/StuText2DActor'], function (Text2DActor) {
	'use strict';
	return Text2DActor;
});
