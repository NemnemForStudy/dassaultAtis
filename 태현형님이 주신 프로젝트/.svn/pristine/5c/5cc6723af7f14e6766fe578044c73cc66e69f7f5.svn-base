define('DS/StuRenderEngine/StuSubProductActor', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuActor3D'], function (STU, Actor3D) {
	'use strict';

	/**
	 * Describe a STU.Actor3D which represents a subpart of a product which a has exposed in the experience.
	 * This object has a geometric representation which is required by some specific STU.Behavior.
	 *
     * @exports SubProductActor
	 * @class
	 * @constructor
     * @noinstancector 
	 * @public
	 * @extends STU.Actor3D
	 * @memberof STU
	 * @alias STU.SubProductActor
	 */
	var SubProductActor = function () {
		Actor3D.call(this);

		/**
		 * Override of opacity from STU.Actor3D
		 * as STU.SubProductActor doesn't have opacity.
		 *
		 * @member
		 * @instance
		 * @name opacity
		 * @private
		 * @type {number}
		 * @memberOf STU.SubProductActor
		 */
		Object.defineProperty(this, 'opacity', {
			enumerable: true,
			configurable: true,
			get: function () {
				// console.error('there is no opacity on STU.SubProductActor');
				return 0;
			},
			set: function () {
				// console.error('there is no opacity on STU.SubProductActor');
			}
		});
	};

	SubProductActor.prototype = new Actor3D();
	SubProductActor.prototype.constructor = SubProductActor;


	////////////////////////////////
	////// IBS JS APIs for CONFS

    /**
    * Applies a configuration to this STU.ProductActor.
    *  
    * @method
    * @public
    * @return {boolean} TRUE if this actor is filtered (currently not active)
    */
	SubProductActor.prototype.isFilteredByConfiguration = function () {
		// get this subproduct's root product actor
		var rootActor = this;
		while (rootActor !== null && rootActor !== undefined && rootActor instanceof STU.SubProductActor) {
			rootActor = rootActor.getParent();
		}

		var myConfsManager = new CXPConfServices();
		return myConfsManager.isFilteredByConfiguration(rootActor.CATI3DExperienceObject, this.CATI3DExperienceObject);
	};


	////// ~IBS JS APIs for CONFS
	////////////////////////////////

	////////////////////////////////
	////// ASO4 PRIVATE JS APIs for ASSET UPDATE

    /**
    * Retrieve the object’s status relative to its asset link.
    *  
    * @method
    * @private
    * @return {STU.Actor3D.EAssetLinkStatus} enum describing the status of the object’s asset link
    */
	SubProductActor.prototype.getAssetLinkStatus = function () {
		var status = this.CATI3DExperienceObject.getAssetLinkStatus();
		return status;
	};

	////// ~ASO4 JS APIs for ASSET UPDATE
	////////////////////////////////

	// Expose in STU namespace.
	STU.SubProductActor = SubProductActor;

	return SubProductActor;
});

define('StuRenderEngine/StuSubProductActor', ['DS/StuRenderEngine/StuSubProductActor'], function (SubProductActor) {
	'use strict';

	return SubProductActor;
});
