define('DS/StuMiscContent/StuCylinderLightActor', ['DS/StuCore/StuContext', 'DS/StuMiscContent/StuAreaLightActor', 'DS/StuCore/StuTools'], function (STU, AreaLightActor, Tools) {
	'use strict';

    /**
     * Describe a light object.
     *
     * @exports CylinderLightActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.AreaLightActor 
     * @memberof STU
     * @alias STU.CylinderLightActor
     */
	var CylinderLightActor = function () {
		AreaLightActor.call(this);
		this.name = 'CylinderLightActor';

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
        this.solidAngle = (4 * Math.PI * this.length * 0.001) / Math.sqrt((this.length * 0.001) ** 2 + 4 * (this.radius * 0.001) ** 2); //what we got from model is in millimeters, we need this in SI units, so in meters

        /**
        * private
        *
        * @member
        * @private
        * @type {Number}
        */
        this.emittingSurface = (2 * Math.PI * this.radius * 0.001) * this.length * 0.001; //what we got from model is in millimeters, we need this in SI units, so in meters

        //////////////////////////////////////////////////////////////////////////
		// Properties that should be visible in UI
		//////////////////////////////////////////////////////////////////////////

        /**
         * Get/Set cylinder light radius
         *
         * @member
         * @instance
         * @name radius
         * @private
         * @type {number}
         * @memberOf STU.CylinderLightActor
         */
        Tools.bindVariable(this, "radius", "number");

        /**
         * Get/Set cylinder light length
         *
         * @member
         * @instance
         * @name length
         * @private
         * @type {number}
         * @memberOf STU.CylinderLightActor
         */
        Tools.bindVariable(this, "length", "number");
	};

	CylinderLightActor.prototype = new AreaLightActor();
	CylinderLightActor.prototype.constructor = CylinderLightActor;



    // function called to update the solid angle (as it varies in function of the dimensions)
    CylinderLightActor.prototype.updateSolidAngle = function () {
        this.solidAngle = (4 * Math.PI * this.length * 0.001) / Math.sqrt((this.length * 0.001) ** 2 + 4 * (this.radius * 0.001) ** 2); //what we got from model is in millimeters, we need this in SI units, so in meters
    }

    // function called to update the emitting surface (as it varies in function of the dimensions)
    CylinderLightActor.prototype.updateEmittingSurface = function () {
        this.emittingSurface = (2 * Math.PI * this.radius * 0.001) * this.length * 0.001; //what we got from model is in millimeters, we need this in SI units, so in meters
    }



	// Expose in STU namespace.
	STU.CylinderLightActor = CylinderLightActor;

	return CylinderLightActor;
});

define('StuMiscContent/StuCylinderLightActor', ['DS/StuMiscContent/StuCylinderLightActor'], function (CylinderLightActor) {
	'use strict';

	return CylinderLightActor;
});
