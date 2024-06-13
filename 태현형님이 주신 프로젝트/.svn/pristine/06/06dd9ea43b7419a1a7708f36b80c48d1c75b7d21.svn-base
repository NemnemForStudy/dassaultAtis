
define('DS/StuRenderEngine/StuEnvironment', ['DS/StuCore/StuContext', 'DS/StuModel/StuInstance'], function (STU, Instance) {
	'use strict';

    /**
	 * Describes an Object representing an environment (planet, ambience)
	 *
	 * @exports Environment
	 * @class
	 * @constructor
     * @noinstancector
     * @public
	 * @memberOf STU
     * @extends STU.Instance
     * @alias STU.Environment
	 */
	var Environment = function () {
		Instance.call(this);
		this.name = 'Environment';
	};

	Environment.prototype = new Instance();
	Environment.prototype.constructor = Environment;

    /**
     * Sets the environment as the current one.
     * 
     * @method
     * @public 
     */
	Environment.prototype.setAsCurrent = function () {
		STU.Experience.getCurrent().currentEnvironment = this;
	};

    /**
     * Returns true if the environment is the current one.
     *
     * @method
     * @public
     * @return {Boolean}
     */
	Environment.prototype.isCurrent = function () {
		return (STU.Experience.getCurrent().currentEnvironment === this);
	};

    /**
     * Perform a picking action toward the ground from a specified origin through the current STU.Experience.
     *
     * @method
     * @private
     * @param   {iParams}   an object which can contain a subset of these parameters :
     * @param   {DSMath.Point} position : the origin of the raycast expressed in the specified reference (in world reference if there is no reference specified)
     * @param   {STU.Actor3D} reference : the reference actor in which the origin and the result of the raycast will be expressed 
     * @param   {boolean} pickGeometry : if enabled, the picking will take in count the geometry of the actors present in the experience.
     * @param   {boolean} pickTerrain : if enabled, the picking will take in count the mesh representing the terrain (Only in globe context)
     * @param   {boolean} pickWater : if enabled, the picking will take in count the shader representing the water (Only in globe context)

     *
     * DEFAULT VALUES :
     * position : [no default value]
     * reference : null
     * pickGeometry : true
     * pickTerrain : true
     * pickWater : true
     */
	Environment.prototype._pickEnvironmentGroundFromPosition = function (iParams) {
		return [];
	}

	/**
    * Return the scene above the environment
    *  
    * @method
    * @private
    * @return {STU.Scene} scene
    */
    Environment.prototype.getScene = function () {
        if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
			return Instance.prototype.findParent.call(this, STU.Scene);
		}

		return undefined;
	};

	/**
    * Returns true if this environment is permanent.
    *  
    * @method
    * @private
    * @return {boolean} true if this STU.Environment is permanent<br/>
    *					false otherwise.
    */
	Environment.prototype.isPermanent = function () {

        if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
			return false; // an environment is always local in scenes context.
        }

        return true;
    };

	// Expose in STU namespace.
	STU.Environment = Environment;

	return Environment;
});

define('StuRenderEngine/StuEnvironment', ['DS/StuRenderEngine/StuEnvironment'], function (Environment) {
	'use strict';

	return Environment;
});
