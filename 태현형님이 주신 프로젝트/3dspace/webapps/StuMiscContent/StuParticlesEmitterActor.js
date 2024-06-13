define('DS/StuMiscContent/StuParticlesEmitterActor', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuActor3D'], function (STU, Actor3D) {
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
     * @exports ParticlesEmitterActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Actor3D
     * @memberof STU
     * @alias STU.ParticlesEmitterActor
     */
	var ParticlesEmitterActor = function () {

		Actor3D.call(this);
		this.name = 'ParticlesEmitterActor';

        /**
         * Enable or disable the light actor
         *
         * @member
         * @instance
         * @name _powered
         * @private
         * @type {number}
         * @memberOf STU.ParticlesEmitterActor
         */
		geterSeter(this, "filePath");
	};

	ParticlesEmitterActor.prototype = new Actor3D();
	ParticlesEmitterActor.prototype.constructor = ParticlesEmitterActor;


	// Expose in STU namespace.
	STU.ParticlesEmitterActor = ParticlesEmitterActor;

	return ParticlesEmitterActor;
});

define('StuMiscContent/StuParticlesEmitterActor', ['DS/StuMiscContent/StuParticlesEmitterActor'], function (ParticlesEmitterActor) {
	'use strict';

	return ParticlesEmitterActor;
});
