define('DS/StuMiscContent/StuRectangleLightActor', ['DS/StuCore/StuContext', 'DS/StuMiscContent/StuAreaLightActor', 'DS/StuCore/StuTools'], function (STU, AreaLightActor, Tools) {
	'use strict';

    /**
     * Describe a light object.
     *
     * @exports RectangleLightActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.AreaLightActor 
     * @memberof STU
     * @alias STU.RectangleLightActor
     */
	var RectangleLightActor = function () {
		AreaLightActor.call(this);
		this.name = 'RectangleLightActor';

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
        this.emittingSurface = this.length * 0.001 * this.height * 0.001; //what we got from model is in millimeters, we need this in SI units, so in meters

        //////////////////////////////////////////////////////////////////////////
		// Properties that should be visible in UI
		//////////////////////////////////////////////////////////////////////////

        /**
         * Get/Set rectangle light length
         *
         * @member
         * @instance
         * @name length
         * @private
         * @type {number}
         * @memberOf STU.RectangleLightActor
         */
        Tools.bindVariable(this, "length", "number");

        /**
         * Get/Set rectangle light height
         *
         * @member
         * @instance
         * @name height
         * @private
         * @type {number}
         * @memberOf STU.RectangleLightActor
         */
        Tools.bindVariable(this, "height", "number");
	};

	RectangleLightActor.prototype = new AreaLightActor();
	RectangleLightActor.prototype.constructor = RectangleLightActor;



    // function called to update the solid angle (do nothing as it does not evolve)
    RectangleLightActor.prototype.updateSolidAngle = function () {
    }

    // function called to update the emitting surface (as it varies in function of the dimensions)
    RectangleLightActor.prototype.updateEmittingSurface = function () {
        this.emittingSurface = this.length * 0.001 * this.height * 0.001; //what we got from model is in millimeters, we need this in SI units, so in meters
    }



	// Expose in STU namespace.
	STU.RectangleLightActor = RectangleLightActor;

	return RectangleLightActor;
});

define('StuMiscContent/StuRectangleLightActor', ['DS/StuMiscContent/StuRectangleLightActor'], function (RectangleLightActor) {
	'use strict';

	return RectangleLightActor;
});
