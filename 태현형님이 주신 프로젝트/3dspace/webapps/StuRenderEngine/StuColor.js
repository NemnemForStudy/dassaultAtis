define('DS/StuRenderEngine/StuColor', ['DS/StuCore/StuContext'], function (STU) {
	'use strict';

	/**
	 * Describe an Object representing a color.
	 * It is defined by a red, green & blue pixel value.
	 * Value range  is between 0 and 255.
	 *
	 * @exports Color
	 * @class
	 * @constructor
	 * @public
	 * @memberof STU
     * @alias STU.Color
	 * @param {number} [iRed=0] red pixel value
	 * @param {number} [iGreen=0] green pixel value
	 * @param {number} [iBlue=0] blue pixel value
	 */
	var Color = function (iRed, iGreen, iBlue) {
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
		 * Value range  is between 0 and 255.
		 *
		 * @member
		 * @instance
		 * @name r
		 * @public
		 * @type {number}
		 * @memberOf STU.Color
		 */

		Object.defineProperty(this, "r", {
			enumerable: true,
			configurable: true,
			get: function () {
				return this.red;
			},
			set: function (iRed) {
				if (typeof iRed !== 'number') {
					throw new TypeError('iRed argument is not a number');
				}

				if (iRed < 0 || iRed > 255) {
					throw new RangeError('iRed argument is outside of the pixel value range 0-255');
				}

				this.red = iRed;
			}
		});


		/**
		 * Green pixel value.
		 * Value range  is between 0 and 255.
		 *
		 * @member
		 * @instance
		 * @name g
		 * @public
		 * @type {number}
		 * @memberOf STU.Color
		 */

		Object.defineProperty(this, "g", {
			enumerable: true,
			configurable: true,
			get: function () {
				return this.green;
			},
			set: function (iGreen) {
				if (typeof iGreen !== 'number') {
					throw new TypeError('iGreen argument is not a number');
				}

				if (iGreen < 0 || iGreen > 255) {
					throw new RangeError('iGreen argument is outside of the pixel value range 0-255');
				}

				this.green = iGreen;
			}
		});



		/**
		 * Blue pixel value.
		 * Value range  is between 0 and 255.
		 *
		 * @member
		 * @instance
		 * @name b
		 * @public
		 * @type {number}
		 * @memberOf STU.Color
		 */

		Object.defineProperty(this, "b", {
			enumerable: true,
			configurable: true,
			get: function () {
				return this.blue;
			},
			set: function (iBlue) {
				if (typeof iBlue !== 'number') {
					throw new TypeError('iBlue argument is not a number');
				}

				if (iBlue < 0 || iBlue > 255) {
					throw new RangeError('iBlue argument is outside of the pixel value range 0-255');
				}

				this.blue = iBlue;
			}
		});


		this.r = iRed || 0;
		this.g = iGreen || 0;
		this.b = iBlue || 0;
	};

	Color.prototype.constructor = Color;

	/**
	 * Set new red, green & blue pixel value for this STU.Color.
	 * Value range  is between 0 and 255.
	 *
	 * @method
	 * @public
	 * @param {number} iRed corresponding to the new red pixel value
	 * @param {number} iGreen corresponding to the new green pixel value
	 * @param {number} iBlue corresponding to the new blue pixel value
	 */
	Color.prototype.setPixelValue = function (iRed, iGreen, iBlue) {
		this.r = iRed;
		this.g = iGreen;
		this.b = iBlue;
	};



	/**
	 * Return the red pixel value of this STU.Color.
	 * Value range  is between 0 and 255.
	 * (deprecated use this.r instead)
	 *
	 * @method
	 * @private
	 * @return {number} corresponding to the red pixel value
	 * @see STU.Color#setRed
	 */
	Color.prototype.getRed = function () {
		return this.r;
	};

	/**
	 * Set a new red pixel value for this STU.Color.
	 * Value range  is between 0 and 255.
	 * (deprecated use this.r instead)
	 *
	 * @method
	 * @private
	 * @param {number} iRed corresponding to the new red pixel value
	 * @see STU.Color#getRed
	 * @see STU.Color#setPixelValue
	 */
	Color.prototype.setRed = function (iRed) {
		this.r = iRed;
	};

	/**
	 * Return the green pixel value of this STU.Color.
	 * Value range  is between 0 and 255.
	 * (deprecated use this.g instead)
	 *
	 * @method
	 * @private
	 * @return {number} corresponding to the green pixel value
	 * @see STU.Color#setGreen
	 */
	Color.prototype.getGreen = function () {
		return this.g;
	};

	/**
	 * Set a new green pixel value for this STU.Color.
	 * Value range  is between 0 and 255.
	 * (deprecated use this.g instead)
	 *
	 * @method
	 * @private
	 * @param {number} iGreen corresponding to the new green pixel value
	 * @see STU.Color#getGreen
	 * @see STU.Color#setPixelValue
	 */
	Color.prototype.setGreen = function (iGreen) {
		this.g = iGreen;
	};

	/**
	 * Return the blue pixel value of this STU.Color.
	 * Value range  is between 0 and 255.
	 * (deprecated use this.g instead)
	 *
	 * @method
	 * @private
	 * @return {number} corresponding to the blue pixel value
	 * @see STU.Color#setBlue
	 */
	Color.prototype.getBlue = function () {
		return this.blue;
	};

	/**
	 * Set a new blue pixel value for this STU.Color.
	 * Value range  is between 0 and 255.
	 * (deprecated use this.b instead)
	 *
	 * @method
	 * @private
	 * @param {number} iBlue corresponding to the new blue pixel value
	 * @see STU.Color#getBlue
	 * @see STU.Color#setPixelValue
	 */
	Color.prototype.setBlue = function (iBlue) {
		this.b = iBlue;
	};


	/**
	 * Updates current color from a standard hexadecimal representation.
	 * 
	 * Exemple:
	 * 	#FFCC44
	 * 	#005500
	 *
	 * @method
	 * @public
	 * @param {number} iHex hexadecimal representation
	 */
	Color.prototype.fromHex = function (iHex) {
		var res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(iHex);
		if(res) {
			this.r = parseInt(res[1], 16);
			this.g  = parseInt(res[2], 16);
			this.b = parseInt(res[3], 16);
		}
		else {
			throw new TypeError("Given hex value doesn't match the right format");
		}
	};
	
	
	/**
	 * Gets the standard hexadecimal representation of this color.
	 * 
	 * Exemple:
	 * 	#FFCC44	 
	 *  #005500
	 *
	 * @method
	 * @public
	 * @return {string} hexadecimal representation of the color
	 */
	Color.prototype.toHex = function () {
		let hr = Math.round(this.r).toString(16); 
		if (hr.length == 1) hr = "0" + hr;

		let hg = Math.round(this.g).toString(16); 
		if (hg.length == 1) hg = "0" + hg;

		let hb = Math.round(this.b).toString(16); 
		if (hb.length == 1) hb = "0" + hb;

		return "#" + hr + hg + hb;
	}

	/**
	 * Updates the current color from a ColorRGB
	 * 
	 * Note: loss af precision can happen during the process
	 *
	 * @method
	 * @public
	 * @param {STU.ColorRGB} color to copy
	 */
	Color.prototype.fromColorRGB = function (iColor) {		
		if (!(iColor instanceof STU.ColorRGB)) {
			throw new TypeError('Argument is not a ColorRGB');
		}

		this.r = Math.round(iColor.r*255);
		this.g = Math.round(iColor.g*255);
		this.b = Math.round(iColor.b*255);
	}

	/**
	 * Converts current color to a ColorRGB
	 * 
	 *
	 * @method
	 * @public
	 * @return {STU.ColorRGB} copied color
	 */
	Color.prototype.toColorRGB = function () {
		return new STU.ColorRGB(
			Math.round(this.r) / 255, 
			Math.round(this.g) / 255,
			Math.round(this.b) / 255);
	}

	// Expose in STU namespace.
	STU.Color = Color;

	return Color;
});

define('StuRenderEngine/StuColor', ['DS/StuRenderEngine/StuColor'], function (Color) {
	'use strict';

	return Color;
});
