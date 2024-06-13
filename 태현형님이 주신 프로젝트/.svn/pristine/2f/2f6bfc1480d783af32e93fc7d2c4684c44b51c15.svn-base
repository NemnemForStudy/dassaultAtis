define('DS/StuMiscContent/StuSphereLightActor', ['DS/StuCore/StuContext', 'DS/StuMiscContent/StuAreaLightActor', 'DS/StuCore/StuTools'], function (STU, AreaLightActor, Tools) {
	'use strict';

    /**
     * Describe a light object.
     *
     * @exports SphereLightActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.AreaLightActor 
     * @memberof STU
     * @alias STU.SphereLightActor
     */
	var SphereLightActor = function () {
		AreaLightActor.call(this);
		this.name = 'SphereLightActor';

		this._props = [];



        //////////////////////////////////////////////////////////////////////////
        // Properties that should NOT be visible in UI
        //////////////////////////////////////////////////////////////////////////

        /**
        * private
        *
        * @member
        * @private
        * @type {Number}
        */
        this.solidAngle = 4 * Math.PI;

        /**
        * private
        *
        * @member
        * @private
        * @type {Number}
        */
        this.emittingSurface = 4 * Math.PI * (this.radius * 0.001) ** 2; //what we got from model is in millimeters, we need this in SI units, so in meters

        //////////////////////////////////////////////////////////////////////////
		// Properties that should be visible in UI
		//////////////////////////////////////////////////////////////////////////

        /**
         * Get/Set sphere light radius
         *
         * @member
         * @instance
         * @name radius
         * @private
         * @type {number}
         * @memberOf STU.SphereLightActor
         */
        Tools.bindVariable(this, "radius", "number");
	};

	SphereLightActor.prototype = new AreaLightActor();
	SphereLightActor.prototype.constructor = SphereLightActor;



    // function called to update the solid angle (do nothing as it does not evolve)
    SphereLightActor.prototype.updateSolidAngle = function () {
    }

    // function called to update the emitting surface (as it varies in function of the dimensions)
    SphereLightActor.prototype.updateEmittingSurface = function () {
        this.emittingSurface = 4 * Math.PI * (this.radius * 0.001) ** 2; //what we got from model is in millimeters, we need this in SI units, so in meters
    }



	// Expose in STU namespace.
	STU.SphereLightActor = SphereLightActor;

	return SphereLightActor;
});

define('StuMiscContent/StuSphereLightActor', ['DS/StuMiscContent/StuSphereLightActor'], function (SphereLightActor) {
	'use strict';

	return SphereLightActor;
});
