define('DS/StudioIV/StuViveInteractionContextActor',
	['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuActor3D', 'DS/StudioIV/StuViveManager'],
	function (STU, Actor3D, ViveManager) {
		'use strict';

		/**
		 * Describes a HTC Vive interaction context.<br/>
		 * 
		 *
		 * @exports ViveInteractionContextActor
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends STU.Actor3D
		 * @memberof STU
		 * @alias STU.ViveInteractionContextActor
		 */
		var ViveInteractionContextActor = function () {
			Actor3D.call(this);
		};

		ViveInteractionContextActor.prototype = new Actor3D();
		ViveInteractionContextActor.prototype.constructor = ViveInteractionContextActor;

		ViveInteractionContextActor.prototype.setTransform = function (iTransform, iRef) {
			Actor3D.prototype.setTransform.call(this, iTransform, iRef);

			var newTransform = Actor3D.prototype.getTransform.call(this, "Visu");
			STU.ViveManager.getInstance().setInteractionCtxTransform(newTransform);
		};

		ViveInteractionContextActor.prototype.onActivate = function (oExceptions) {
			// Vive Manager is instantiated by the ViveInteractionContextActor
			// this is done to avoid vive manager creation when there is no vive in the experience
			STU.registerManager(ViveManager);

			var viveMgrInstance = ViveManager.getInstance();

			if (viveMgrInstance.initialized !== true) {
				viveMgrInstance.initialize(oExceptions);
				viveMgrInstance._interactionCtxActor = this;
			}
			else {
				console.error("There should be only one ViveInteractionContextActor");
			}

			// LBN9 - IR-754777 - Activate actors after register manager, because start function of Actor3D call STU.ViveManager.getInstance(). 
			Actor3D.prototype.onActivate.call(this);
		};

		// Expose in STU namespace.
		STU.ViveInteractionContextActor = ViveInteractionContextActor;

		return ViveInteractionContextActor;
	});

define('StudioIV/StuViveInteractionContextActor', ['DS/StudioIV/StuViveInteractionContextActor'], function (ViveInteractionContextActor) {
	'use strict';

	return ViveInteractionContextActor;
});
