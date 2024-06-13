
define('DS/CAT3DExpAmbienceModelRTWebJS/StuAmbience', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuEnvironment'], function (STU, Environment) {
	'use strict';

	/**
	 * Describe an Object representing a material
	 *
	 * @exports Ambience
	 * @class
	 * @constructor
     * @noinstancector
	 * @public
	 * @memberof STU
     * @alias STU.Ambience
	 */
	var Ambience = function () {
	    Environment.call(this);
	    this.name = 'Ambience';    
	};
    
	Ambience.prototype = new Environment(); //this + previous line makes us derives from StuEnvironment (or well I think it is enough :p)
	Ambience.prototype.constructor = Ambience;

    /**
     * Perform a picking action toward the ground from a specified origin through the current STU.Experience.
     * N.B: This function is now mandatory to each class that inherit of STU.Environment. The objective is to releave the STU.RenderManager to any dependances on types of environments.
     *
     * @method
     * @private
     * @param   {iParams}	an object which can contain a subset of these parameters :
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
	Ambience.prototype._pickEnvironmentGroundFromPosition = function (iParams) {
	    var intersections = [];
	    var pickRayLength_mm = 1000000;     // millimeters
	    var pickGeo = (iParams.pickGeometry !== null && iParams.pickGeometry !== undefined) ? iParams.pickGeometry : true;

	    var pickOrigin_Ref_mm = new DSMath.Point(iParams.position.x, iParams.position.y, iParams.position.z);
	    var pickOrigin_W_mm = pickOrigin_Ref_mm.clone();

	    // pickOrigin_Ref_mm is expressed in the referential of iParams.reference
	    // we want it expressed in world referential
	    if (iParams.reference !== null && iParams.reference !== undefined) {
	        var refTransfo_W = iParams.reference.getTransform("World");
	        pickOrigin_W_mm.applyTransformation(refTransfo_W);
	    }

	    //ambience environment don't have terrain or water
	    if (pickGeo) {
	        var gravityVector_W = new DSMath.Vector3D(0, 0, -1);

	        var collisionRay = new STU.Ray();
	        collisionRay.origin = pickOrigin_W_mm;
	        collisionRay.direction = gravityVector_W;
	        collisionRay.setLength(pickRayLength_mm);

	        var renderManager = STU.RenderManager.getInstance();
	        if (renderManager !== null && renderManager !== undefined) {
	            var hit = renderManager._pickFromRay(collisionRay, true, false);
	            if (hit.length > 0) {
	                intersections.push(hit[0]);
	            }
	        }
	    }
	    return intersections;
	}

	// Expose in STU namespace.
	STU.Ambience = Ambience;

	return Ambience;
});

define('CAT3DExpAmbienceModelRTWebJS/StuAmbience', ['DS/CAT3DExpAmbienceModelRTWebJS/StuAmbience'], function (Ambience) {
    'use strict';

    return Ambience;
});
