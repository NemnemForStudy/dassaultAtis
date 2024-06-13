define('DS/StuMiscContent/StuDiskLightActor', ['DS/StuCore/StuContext', 'DS/StuMiscContent/StuAreaLightActor', 'DS/StuCore/StuTools'], function (STU, AreaLightActor, Tools) {
	'use strict';

    /**
     * Describe a light object.
     *
     * @exports DiskLightActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.AreaLightActor 
     * @memberof STU
     * @alias STU.DiskLightActor
     */
	var DiskLightActor = function () {
		AreaLightActor.call(this);
		this.name = 'DiskLightActor';

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
        this.solidAngle = 2 * Math.PI;

        /**
        * private
        *
        * @member
        * @private
        * @type {Number}
        */
        this.emittingSurface = Math.PI * (this.radius * 0.001) ** 2; //what we got from model is in millimeters, we need this in SI units, so in meters

        //////////////////////////////////////////////////////////////////////////
		// Properties that should be visible in UI
		//////////////////////////////////////////////////////////////////////////

        /**
         * Get/Set disk light radius
         *
         * @member
         * @instance
         * @name radius
         * @private
         * @type {number}
         * @memberOf STU.DiskLightActor
         */
        Tools.bindVariable(this, "radius", "number");
	};

	DiskLightActor.prototype = new AreaLightActor();
    DiskLightActor.prototype.constructor = DiskLightActor;



    // function called to update the solid angle (do nothing as it does not evolve)
    DiskLightActor.prototype.updateSolidAngle = function () {
    }

    // function called to update the emitting surface (as it varies in function of the dimensions)
    DiskLightActor.prototype.updateEmittingSurface = function () {
        this.emittingSurface = Math.PI * (this.radius * 0.001) ** 2; //what we got from model is in millimeters, we need this in SI units, so in meters
    }



	// Expose in STU namespace.
	STU.DiskLightActor = DiskLightActor;

	return DiskLightActor;
});

define('StuMiscContent/StuDiskLightActor', ['DS/StuMiscContent/StuDiskLightActor'], function (DiskLightActor) {
	'use strict';

	return DiskLightActor;
});
