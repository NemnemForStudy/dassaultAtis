define('DS/StuMiscContent/StuParticlesForceActor', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuActor3D'], function (STU, Actor3D) {
	'use strict';

	var geterSeter = function (self, varName) {
		if (!STU.isEKIntegrationActive()) {
			Object.defineProperty(self, varName, {
				enumerable: true,
				configurable: true,
				get: function () {
					if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
						return self.CATI3DExperienceObject.GetValueByName(varName);
					}
				},
				set: function (value) {
					if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
						self.CATI3DExperienceObject.SetValueByName(varName, value);
					}
				}
			});
		}
	};

    /**
     * Describe an actor loading its 3D representation from a file.
     *
     * @exports ParticlesForceActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Actor3D
     * @memberof STU
     * @alias STU.ParticlesForceActor
     */
	var ParticlesForceActor = function () {

		Actor3D.call(this);
		this.name = 'ParticlesForceActor';

        /**
         * Set the power of the force.
         *
         * @member
         * @instance
         * @name power
         * @private
         * @type {number}
         * @memberOf STU.ParticlesForceActor
         */
		geterSeter(this, "power");
	};

	ParticlesForceActor.prototype = new Actor3D();
	ParticlesForceActor.prototype.constructor = ParticlesForceActor;


	// Expose in STU namespace.
	STU.ParticlesForceActor = ParticlesForceActor;

	return ParticlesForceActor;
});

define('StuMiscContent/StuParticlesForceActor', ['DS/StuMiscContent/StuParticlesForceActor'], function (ParticlesForceActor) {
	'use strict';

	return ParticlesForceActor;
});
