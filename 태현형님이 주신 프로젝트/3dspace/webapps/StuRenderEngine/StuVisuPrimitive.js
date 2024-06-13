define('DS/StuRenderEngine/StuVisuPrimitive', ['DS/StuCore/StuContext'], function (STU) {
	'use strict';

	/**
	 * Describes an object representing a visualization primitive created by STU.RenderManager.
	 *
	 *
	 * @exports VisuPrimitive
	 * @class
	 * @constructor
	 * @noinstancector
	 * @public
	 * @memberof STU
	 * @alias STU.VisuPrimitive
	 */
	var VisuPrimitive = function () {

	    /**
		* Internal ID of the primitive.
		*
		* @member
		* @private
		* @type {number}
		*/
		this.id = 0;

		/**
		* Color of the primitive.
		*
		* @member
		* @private
		* @type {STU.Color}
		*/
		this.color = null;

		/**
		* Transparency of the primitive
		*
		* @member
		* @private
		* @type {number}
		*/
		this.alpha = 1;

		/**
		* Transform of the primitive
		*
		* @member
		* @private
		* @type {DSMath.Transformation}
		*/
		this.transfo = null;

		/**
		* Life of the primitive
		*  0 is 1 frame
		*  -1 is infinite
		*  x is lifetime in ms
		*
		* @member
		* @private
		* @type {number}
		*/
		this.life = 0;

		/**
		* Age of the primitive in ms		
		*
		* @member
		* @private
		* @type {number}
		*/
		this.age = 0;
	};

	VisuPrimitive.prototype.constructor = VisuPrimitive;

	/**
	* Apply a material to the primitive.
    *      
    * @method
	* @private	
	* @param {STU.Material} iMaterial
	*/
	VisuPrimitive.prototype._applyMaterial = function (iMaterial) {
		var rm = STU.RenderManager.getInstance();
		rm.StuGeomPrimitive_ISOManager.setMaterial(this.id, iMaterial.CATI3DExperienceObject);
	}

	// Expose in STU namespace.
	STU.VisuPrimitive = VisuPrimitive;

	return VisuPrimitive;
});

define('StuRenderEngine/StuVisuPrimitive', ['DS/StuRenderEngine/StuVisuPrimitive'], function (VisuPrimitive) {
	'use strict';

	return VisuPrimitive;
});
