define('DS/StuRenderEngine/StuColorRGB', ['DS/StuCore/StuContext'], function (STU) {
	'use strict';

	/**
	 * Describe an Object representing a color.
	 * 
	 * It is defined by a red, green & blue float values.
	 * Value range is between 0 and 1.
	 *
	 * @exports ColorRGB
	 * @class
	 * @constructor
	 * @public
	 * @memberof STU
     * @alias STU.ColorRGB
	 * @param {number} [iRed=0] red pixel value
	 * @param {number} [iGreen=0] green pixel value
	 * @param {number} [iBlue=0] blue pixel value
	 */
	var ColorRGB = function (iRed, iGreen, iBlue) {
		
		// don't display those internal properties in JSON.stringify for instance
		Object.defineProperty(this, "red", {
			enumerable: false,	
			writable : true		
		});

		Object.defineProperty(this, "green", {
			enumerable: false,			
			writable : true
		});

		Object.defineProperty(this, "blue", {
			enumerable: false,			
			writable : true
		});

		
		
		/**
		 * Red pixel value
		 * Value range  is between 0 and 1.
		 *
		 * @member
		 * @instance
		 * @name r
		 * @public
		 * @type {number}
		 * @memberOf STU.ColorRGB
		 */

		Object.defineProperty(this, "r", {
			enumerable: true,
			configurable: true,
			get: function () {
				return this.red;
			},
			set: function (iRed) {
				if (typeof iRed !== 'number') {
					throw new TypeError('Red argument is not a number');
				}

				if (iRed < 0 || iRed > 1) {
					throw new RangeError('Red argument is outside of the value range 0-1');
				}

				this.red = iRed;
			}
		});


		/**
		 * Green pixel value.
		 * Value range  is between 0 and 1.
		 *
		 * @member
		 * @instance
		 * @name g
		 * @public
		 * @type {number}
		 * @memberOf STU.ColorRGB
		 */

		Object.defineProperty(this, "g", {
			enumerable: true,
			configurable: true,
			get: function () {
				return this.green;
			},
			set: function (iGreen) {
				if (typeof iGreen !== 'number') {
					throw new TypeError('Green argument is not a number');
				}

				if (iGreen < 0 || iGreen > 1) {
					throw new RangeError('Green argument is outside of the value range 0-1');
				}

				this.green = iGreen;
			}
		});



		/**
		 * Blue pixel value.
		 * Value range  is between 0 and 1.
		 *
		 * @member
		 * @instance
		 * @name b
		 * @public
		 * @type {number}
		 * @memberOf STU.ColorRGB
		 */

		Object.defineProperty(this, "b", {
			enumerable: true,
			configurable: true,
			get: function () {
				return this.blue;
			},
			set: function (iBlue) {
				if (typeof iBlue !== 'number') {
					throw new TypeError('Blue argument is not a number');
				}

				if (iBlue < 0 || iBlue > 1) {
					throw new RangeError('Blue argument is outside of the value range 0-1');
				}

				this.blue = iBlue;
			}
		});


		this.r = iRed || 0;
		this.g = iGreen || 0;
		this.b = iBlue || 0;
	};

	ColorRGB.prototype.constructor = ColorRGB;

	/**
	 * Set new red, green & blue value for this STU.ColorRGB.
	 * Value range is between 0 and 1.
	 *
	 * @method
	 * @public
	 * @param {number} iRed new red value
	 * @param {number} iGreen new green value
	 * @param {number} iBlue new blue value
	 */
	 ColorRGB.prototype.setValues = function (iRed, iGreen, iBlue) {
		this.r = iRed;
		this.g = iGreen;
		this.b = iBlue;
	};

	/**
	 * Updates current color from a standard hexadecimal representation.
	 *
	 * Exemple:
	 * 	#FFCC44
	 *  #005500
	 * 
	 * Note: Hex values are converted to [0-1] range.
	 *
	 * @method
	 * @public
	 * @param {number} iHex hexadecimal representation
	 */
	ColorRGB.prototype.fromHex = function (iHex) {
		var res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(iHex);
		if(res) {
			this.r = parseInt(res[1], 16) / 255;
		  	this.g  = parseInt(res[2], 16) / 255;
		  	this.b = parseInt(res[3], 16) / 255;
		}
		else {
			throw new TypeError("Given hex value doesn't match the right format");
		}
	};


	/**
	 * Gets the standard hexadecimal representation of current color.
	 * 
	 * Exemple:
	 * 	#FFCC44
	 *  #005500
	 * 
	 * Note: Some precision can be lost during the process.
	 *
	 * @method
	 * @public
	 * @return {string} hexadecimal representation
	 */
	ColorRGB.prototype.toHex = function () {
		let hr = Math.round(this.r*255).toString(16); 
		if (hr.length == 1) hr = "0" + hr;

		let hg = Math.round(this.g*255).toString(16); 
		if (hg.length == 1) hg = "0" + hg;

		let hb = Math.round(this.b*255).toString(16); 
		if (hb.length == 1) hb = "0" + hb;

		return "#" + hr + hg + hb;
	}


	/**
	 * Updates current color from a STU.Color
	 *
	 * Note: Color's values are converted to [0-1] range.
	 *
	 * @method
	 * @public
	 * @param {STU.Color} iColor color to copy
	 */
	ColorRGB.prototype.fromColor = function (iColor) {		
		if (!(iColor instanceof STU.Color)) {
			throw new TypeError('Argument is not a Color');
		}

		this.r = iColor.r/255;
		this.g = iColor.g/255;
		this.b = iColor.b/255;
	}

	/**
	 * Converts current color to a STU.Color
	 * 
	 * Note: loss af precision can happen during the process
	 *
	 * @method
	 * @public
	 * @return {STU.Color} copied color
	 */
	ColorRGB.prototype.toColor = function () {
		return new STU.Color(
			Math.round(this.r * 255), 
			Math.round(this.g * 255),
			Math.round(this.b * 255));
	}

	// Expose in STU namespace.
	STU.ColorRGB = ColorRGB;

	return ColorRGB;
});

define('StuRenderEngine/StuColorRGB', ['DS/StuRenderEngine/StuColorRGB'], function (ColorRGB) {
	'use strict';

	return ColorRGB;
});
