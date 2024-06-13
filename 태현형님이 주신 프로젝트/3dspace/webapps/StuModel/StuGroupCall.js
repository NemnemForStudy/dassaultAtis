
define('DS/StuModel/StuGroupCall', ['DS/StuCore/StuContext', 'DS/StuModel/StuInstance', 'DS/StuModel/StuGroupCallExecutionContext'], function (STU, Instance, GroupCallExecutionContext) {
	'use strict';

    /**
     * @exports GroupCall
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Instance
     * @memberof STU
	 * @alias STU.GroupCall
     */
	var GroupCall = function () {
		Instance.call(this);

		this.CATI3DExperienceObject;
		this.CATICXPGroupCall;

		this.name = "GroupCall";
		this.caller;
		this.executionCtxs = [];
		this.capacities = {};
	};

	GroupCall.prototype = new Instance();
	GroupCall.prototype.constructor = GroupCall;

    /**
    * Return the experience
    * @method
    * @private
    * @return {STU.Experience} instance object corresponding to the experience
    */
	GroupCall.prototype.getExperience = function () {
		return STU.Experience.getCurrent();
	};

	GroupCall.prototype.onInitialize = function (oExceptions) {
		Instance.prototype.onInitialize.call(this, oExceptions);
	}

	GroupCall.prototype.setCaller = function (caller) {
		this.caller = caller;
	}

	GroupCall.prototype.getRelatedCapacities = function (iCapacityID) {
		return this.capacities[iCapacityID];
	}

	GroupCall.prototype.createExecutionContext = function (iBlock, iCapacityID, iParameter) {
		if (!this.capacities[iCapacityID]) {
			this.capacities[iCapacityID] = this.CATICXPGroupCall.getRelatedCapacities(iCapacityID);
		}
		var executionCtx = new GroupCallExecutionContext(this, iBlock, iCapacityID, iParameter);
		this.executionCtxs.push(executionCtx);
		executionCtx.initialize();
		return executionCtx;
	}


	// Expose in STU namespace.
	STU.GroupCall = GroupCall;

	return GroupCall;
});

define('StuModel/StuGroupCall', ['DS/StuModel/StuGroupCall'], function (GroupCall) {
	'use strict';

	return GroupCall;
});
