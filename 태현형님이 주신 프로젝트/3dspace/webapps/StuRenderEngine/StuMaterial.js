
define('DS/StuRenderEngine/StuMaterial', ['DS/StuCore/StuContext', 'DS/StuModel/StuResource'], function (STU) {
	'use strict';

	/**
	 * Describe an Object representing a material.
	 * 
	 * All materials that are not DSPBR 22x (and more) are projected to this class, which doesn't allow
	 * any manipulation of the material properties.
	 *
	 * @exports Material
	 * @class
	 * @constructor
     * @noinstancector
	 * @public
     * @extends STU.Resource
	 * @memberof STU
     * @alias STU.Material
	 */
    var Material = function () {
        STU.Resource.call(this);
		this.name = 'Material';

	    /**
		 * native object CATICXPMaterial
		 *
		 * @member
		 * @private
		 * @type {Object}
		 */
		this.CATICXPMaterial = null; // valued by CATECXPMaterial_StuIBuilder::Build
	};

    Material.prototype = new STU.Resource();
	Material.prototype.constructor = Material;

	/**
	 * Return true if this material is applied to the actor
	 * @param  {STU.Actor3D}  iActor3D
	 * @return {Boolean}
	 * @private
	 */
	Material.prototype.isAppliedTo = function (iActor3D) {
		return this == iActor3D.getMaterial();
	}

	/**
	 * Apply this material to the actor
	 * @param  {STU.Actor3D}  iActor3D
	 * @return {Boolean}
	 * @private
	 */
	Material.prototype.appliesTo = function (iActor3D) {
		if (this.CATI3DExperienceObject.getAssetLinkStatus() !== 2) { //cannot be applied if asset link is broken
			console.error(this.name + " cannot be applied");
			return;
        }
		iActor3D.setMaterial(this);
	}

	/**
	* Sets a parameter value of this material
	* 
	* @param  {String}  iName name of the material parameter
	* @param  {Number | STU.Color}  iValue value to set
	* @return {void}
	* @private
	*/
	Material.prototype._setParameterValue = function (iName, iValue) {

		if(iName !== undefined && iName !== null && iValue !== undefined && iValue !== null) {
			if(iName in this.appearance) {
				if(typeof iValue == 'number') {
					this.CATICXPMaterial._setParameterValue(iName, iValue);
				}
				else if(iValue instanceof STU.Color) {
					// set parameter value supports VCXColor variables, but not 
					// specific use case for Color_Spec, so let's go the old way
					var modelColorObject = this.appearance[iName].CATI3DExperienceObject;
					modelColorObject.SetValueByName("r", iValue.r);
					modelColorObject.SetValueByName("g", iValue.g);
					modelColorObject.SetValueByName("b", iValue.b);
				}
				else {
					throw new TypeError('parameter value type not supported');
				}				
			}
			else {
				throw new TypeError('unknown parameter name');
			}
			
		}
		else {
			throw new TypeError('invalid parameter name or value');
		}
	}


	// Expose in STU namespace.
	STU.Material = Material;

	return Material;
});

define('StuRenderEngine/StuMaterial', ['DS/StuRenderEngine/StuMaterial'], function (Material) {
	'use strict';

	return Material;
});
