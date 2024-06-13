define('DS/StuCID/StuSlider2DActor', ['DS/StuCore/StuContext', 'DS/StuCID/StuUIActor2D', 'DS/StuCore/StuTools'],
	function (STU, UIActor2D, Tools) {
		'use strict';

		/**
		* @exports Slider2DActor
		* @class
		* @constructor
		* @noinstancector
		* @public
		* @extends STU.UIActor2D
		* @memberof STU
		* @alias STU.Slider2DActor
		*/
		var Slider2DActor = function () {
			UIActor2D.call(this);

			/**
			 * Get/Set value. 
			 * The given value must be included between the [minimum value]{@link Slider2DActor#minimumValue} and the [maximum value]{@link Slider2DActor#maximumValue}.
			 *
			 * @member
			 * @instance
			 * @name value
			 * @public
			 * @type {number}
			 * @memberOf STU.Slider2DActor
			 */
			Object.defineProperty(this, "value", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("value");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given value is not a ' + type);
					}
					if (value < this.minimumValue) {
						throw new TypeError('given value is below minimum acceptable value');
					}
					if (value > this.maximumValue) {
						throw new TypeError('given value is higher than the maximum acceptable value');
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("value", value);
					}
				}
			});

			/**
			 * Get/Set minimum value. 
			 * The given minimum value must be below the [maximum value]{@link Slider2DActor#maximumValue}.
			 *
			 * @member
			 * @instance
			 * @name minimumValue
			 * @public
			 * @type {number}
			 * @memberOf STU.Slider2DActor
			 */
			Object.defineProperty(this, "minimumValue", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("minimumValue");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given minimum value is not a ' + type);
					}
					if (value > this.maximumValue) {
						throw new TypeError('given minimum value is higher than the maximum acceptable value');
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("minimumValue", value);
					}
				}
			});

			/**
			 * Get/Set maximum value. 
			 * The given maximum value must be higher than the [minimum value]{@link Slider2DActor#minimumValue}.
			 *
			 * @member
			 * @instance
			 * @name maximumValue
			 * @public
			 * @type {number}
			 * @memberOf STU.Slider2DActor
			 */
			Object.defineProperty(this, "maximumValue", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("maximumValue");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given maximum value is not a ' + type);
					}
					if (value < this.minimumValue) {
						throw new TypeError('given maximum value is below the minimum acceptable value');
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("maximumValue", value);
					}
				}
			});

			/**
			 * Get/Set step value, which is the interval between two steps. 
			 * The given step value must be below the interval delimited by the [minimum value]{@link Slider2DActor#minimumValue} and the [maximum value]{@link Slider2DActor#maximumValue}.
			 *
			 * @member
			 * @instance
			 * @name stepValue
			 * @public
			 * @type {number}
			 * @memberOf STU.Slider2DActor
			 */
			Object.defineProperty(this, "stepValue", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("stepValue");
					}
				},
				set: function (value) {
					if (typeof value !== "number") {
						throw new TypeError('given maximum value is not a ' + type);
					}
					if (value > this.maximumValue - this.minimumValue) {
						throw new TypeError('given step value is higher than the slider interval');
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("stepValue", value);
					}
				}
			});

			/**
			 * Get/Set orientation
			 *
			 * @member
			 * @instance
			 * @name orientation
			 * @public
			 * @type {STU.Slider2DActor.ESliderOrientation}
			 * @memberOf STU.Slider2DActor
			 */
			Object.defineProperty(this, "orientation", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("orientation");
					}
				},
				set: function (value) {
					if (value !== STU.Slider2DActor.ESliderOrientation.eVertical
						&& value !== STU.Slider2DActor.ESliderOrientation.eHorizontal){
						throw new TypeError("given value should be a value from STU.Slider2DActor.ESliderOrientation");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("orientation", value);
					}
				}
			});

			/**
			 * Get/Set show value label
			 *
			 * @member
			 * @instance
			 * @name showValueLabel
			 * @public
			 * @type {boolean}
			 * @memberOf STU.Slider2DActor
			 */
			Tools.bindVariable(this, "showValueLabel", "boolean");

			/**
			 * Get/Set label position
			 *
			 * @member
			 * @instance
			 * @name labelPosition
			 * @public
			 * @type {STU.Slider2DActor.ESliderLabelPosition}
			 * @memberOf STU.Slider2DActor
			 */
			Object.defineProperty(this, "labelPosition", {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName("labelPosition");
					}
				},
				set: function (value) {
					if (value !== STU.Slider2DActor.ESliderLabelPosition.eTop
						&& value !== STU.Slider2DActor.ESliderLabelPosition.eBottom
						&& value !== STU.Slider2DActor.ESliderLabelPosition.eRight
						&& value !== STU.Slider2DActor.ESliderLabelPosition.eLeft){
						throw new TypeError("given value should be a value from STU.Slider2DActor.ESliderLabelPosition");
					}
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName("labelPosition", value);
					}
				}
			});


			/**
			 * Get/Set value unit
			 *
			 * @member
			 * @instance
			 * @name valueUnit
			 * @public
			 * @type {string}
			 * @memberOf STU.Slider2DActor
			 */
			 Tools.bindVariable(this, "valueUnit", "string");
		};

		/**
		* Enumeration of slider orientations
		*
		* @enum {number}
		* @public
		*/
		Slider2DActor.ESliderOrientation = {
			eVertical: 0,
			eHorizontal : 1
		};

		/**
		* Enumeration of slider label positions
		*
		* @enum {number}
		* @public
		*/
		Slider2DActor.ESliderLabelPosition = {
			eTop: 0,
			eBottom : 1,
			eRight : 2,
			eLeft : 3
		};

		Slider2DActor.prototype = new UIActor2D();
		Slider2DActor.prototype.constructor = Slider2DActor;

		// Expose in STU namespace.
		STU.Slider2DActor = Slider2DActor;
		return Slider2DActor;
	}
);

define('StuCID/StuSlider2DActor', ['DS/StuCID/StuSlider2DActor'], function (Slider2DActor) {
	'use strict';
	return Slider2DActor;
});
