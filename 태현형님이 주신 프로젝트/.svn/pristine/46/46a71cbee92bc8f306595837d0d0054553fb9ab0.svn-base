
define('DS/StuGeometricPrimitives/StuCubeActor', ['DS/StuCore/StuContext', 'DS/StuGeometricPrimitives/StuPrimitiveActor'], function (STU, PrimitiveActor) {
	'use strict';

	/**
	* Describe a cube object.
	*
	* @exports CubeActor
	* @class
	* @constructor
	* @noinstancector
	* @public
	* @extends STU.PrimitiveActor
	* @memberof STU
	* @alias STU.CubeActor
	*/
	var CubeActor = function () {

		PrimitiveActor.call(this);
		this.name = 'CubeActor';

    	/**
		* Get/Set cube length
		*
		* @member
		* @instance
		* @name length
		* @public
		* @type {number}
		* @memberOf STU.CubeActor
		*/
		if (!STU.isEKIntegrationActive()) {
			Object.defineProperty(this, 'length', {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName('length');
					}
				},
				set: function (value) {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName('length', value);
					}
				}
			});
		}
		else {
			this.length;
		}

    	/**
		* Get/Set cube width
		*
		* @member
		* @instance
		* @name width
		* @public
		* @type {number}
		* @memberOf STU.CubeActor
		*/
		if (!STU.isEKIntegrationActive()) {
			Object.defineProperty(this, 'width', {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName('width');
					}
				},
				set: function (value) {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName('width', value);
					}
				}
			});
		}
		else {
			this.width;
		}

        /**
        * Get/Set cube height
        *
        * @member
        * @instance
        * @name height
        * @public
        * @type {number}
        * @memberOf STU.CubeActor
        */
		if (!STU.isEKIntegrationActive()) {
			Object.defineProperty(this, 'height', {
				enumerable: true,
				configurable: true,
				get: function () {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						return this.CATI3DExperienceObject.GetValueByName('height');
					}
				},
				set: function (value) {
					if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
						this.CATI3DExperienceObject.SetValueByName('height', value);
					}
				}
			});
		}
		else {
			this.height;
		}

	};

	CubeActor.prototype = new PrimitiveActor();
	CubeActor.prototype.constructor = CubeActor;


	// Expose in STU namespace.
	STU.CubeActor = CubeActor;

	return CubeActor;
});

define('StuGeometricPrimitives/StuCubeActor', ['DS/StuGeometricPrimitives/StuCubeActor'], function (CubeActor) {
	'use strict';

	return CubeActor;
});
