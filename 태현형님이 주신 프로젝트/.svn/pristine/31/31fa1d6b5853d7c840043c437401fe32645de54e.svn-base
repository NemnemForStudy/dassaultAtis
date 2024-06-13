
define('DS/StuModel/StuGroupCallExecutionContext', ['DS/StuCore/StuContext', 'DS/StuModel/StuInstance'], function (STU, Instance) {
	'use strict';

    /**
     * @exports GroupCallExecutionContext
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Instance
     * @memberof STU
	 * @alias STU.GroupCallExecutionContext
     */
	var GroupCallExecutionContext = function (iGroupCall, iBlock, iCapacityID, iParameter) {
		Instance.call(this);

		this.CATI3DExperienceObject;

		this.name = "GroupCallExecutionContext";

		this.groupCall = iGroupCall;
		this.capacityID = iCapacityID;
		this.parameter = iParameter;
		this.block = iBlock;
		this.capacities = [];
		this.validatedCaps = [];
		this.validated = false;
	};

	GroupCallExecutionContext.prototype = new Instance();
	GroupCallExecutionContext.prototype.constructor = GroupCallExecutionContext;

    /**
    * Return the experience
    * @method
    * @private
    * @return {STU.Experience} instance object corresponding to the experience
    */
	GroupCallExecutionContext.prototype.getExperience = function () {
		return STU.Experience.getCurrent();
	};

	GroupCallExecutionContext.prototype.onInitialize = function (oExceptions) {
		Instance.prototype.onInitialize.call(this, oExceptions);

		this.capacities = this.groupCall.getRelatedCapacities(this.capacityID);

		if (this.capacities == null || this.capacities == undefined) {
			console.error("can't retrieve capacities related to capacityID " + this.capacityID);
			return;
		}

		if (this.capacities.length == 0) {
			return;
		}

		// each capacity are the same so same type
		// no sensor for now, only driver so no events
		if (this.capacities[0] instanceof STU.Service) {
			for (var i = 0; i < this.capacities.length; ++i) {
				this.capacities[i].initialize();
			}

		} else if (this.capacities[0] instanceof STU.Function) {
			for (var i = 0; i < this.capacities.length; ++i) {
				this.capacities[i].setCaller(this.capacities[i].parent);
			}

		} else {
			console.error("[GroupCallExecutionContext] Error initializing capacity, capacity is not any of this type : Function, Service");
			console.error(this.capacity);
		}
	}

	GroupCallExecutionContext.prototype.updateCapacities = function () {
		this.capacities = this.groupCall.getRelatedCapacities(this.capacityID);

		if (this.capacities == null || this.capacities == undefined) {
			console.error("can't retrieve capacities related to capacityID " + this.capacityID);
			return;
		}

		if (this.capacities.length == 0) {
			return;
		}

		// each capacity are the same so same type
		// no sensor for now, only driver so no events
		if (this.capacities[0] instanceof STU.Service) {
			for (var i = 0; i < this.capacities.length; ++i) {
				this.capacities[i].initialize();

				// check these subscribe events
			}

		} else if (this.capacities[0] instanceof STU.Function) {
			for (var i = 0; i < this.capacities.length; ++i) {
				this.capacities[i].setCaller(this.capacities[i].parent);
			}

		} else {
			console.error("[GroupCallExecutionContext] Error initializing capacity, capacity is not any of this type : Function, Service");
			console.error(this.capacity);
		}
	}

	GroupCallExecutionContext.prototype.execute = function () {
		if (this.capacities == null || this.capacities == undefined) {
			console.error("can't retrieve capacities related to capacityID " + this.capacityID);
			return;
		}
		if (this.capacities.length == 0) {
			return;
		}
		if (this.capacities[0] instanceof STU.Service) {
			for (var i = 0; i < this.capacities.length; ++i) {
				// Initialize capacity by referencing method of subject
				this.capacities[i].setContext(this.block.subject, this.block.parameter);
			}
			if (this.block.startedOnce == false) {
				for (var i = 0; i < this.capacities.length; ++i) {
					this.capacities[i].start();
					this.capacities[i].startedBy = this.block;
				}
				this.block.startedOnce = true;
				this.block.validated = false;
				this.validated = false;
			}

			if (this.validated) {
				return this.validated;
			}

			if (this.capacities[0]._mode == "function" || this.capacities[0]._mode == "task") {
				var duringHasEnded = (this.block.timeModifierType !== undefined && this.block.timeModifierType == "During" && this.block.timeModifierCounter > (this.block.timeModifierValue * (this.block.timeModifierUnit == 0 ? 1000 : 1)))
				if (duringHasEnded) {
					for (var i = 0; i < this.capacities.length; ++i) {
						this.capacities[i].stop();
					}
					this.validated = true;
				} else {
					var validated = true;
					for (var i = 0; i < this.capacities.length; ++i) {
						if (this.capacities[i]._stopMe == true) {
							this.capacities[i].stop();
						} else if (!this.capacities[i].stopped && validated) {
							validated = false;
						}
					}
					this.validated = validated;
				}
			}
			return this.validated;

		} else if (this.capacities[0] instanceof STU.Function) {
			var hasParameter = this.parameter != undefined && this.parameter != null;
			for (var i = 0; i < this.capacities.length; ++i) {
				if (hasParameter) {
					this.capacities[i].setParameter(this.parameter);
				}
				this.capacities[i].execute();
			}

			// At this step, if there is an time modifier 'After', we should reset the timeModifierCounter
			if (this.block.timeModifierType !== undefined && this.block.timeModifierType == "After")
				this.block.timeModifierCounter = 0;

			// In case there is a time modifier "During"
			if (this.block.timeModifierType !== undefined && this.block.timeModifierType == "During") {
				if (this.block.timeModifierCounter > (this.block.timeModifierValue * (this.block.timeModifierUnit == 0 ? 1000 : 1)))
					return true;
				else
					return false;
			}
			// When there is no time modifier
			else {
				return true;
			}

		} else {
			console.error("[GroupCallExecutionContext] Error initializing capacity, capacity is not any of this type : Function, Service");
			console.error(this.capacity);
		}
	}

	var GetActorOf = function (iActorOrBehavior) {
		return iActorOrBehavior instanceof STU.Behavior ? iActorOrBehavior.parent : iActorOrBehavior;
	}

	GroupCallExecutionContext.prototype.onServiceStopped = function (iEvent) {
		if (iEvent.service instanceof STU.Service && iEvent.service !== null) {
			if (this.capacities.indexOf(iEvent.service) > 0) {
				if (this.validatedCaps.indexOf(iEvent.service) == -1) {
					this.validatedCaps.push(iEvent.service);
					if (this.validatedCaps.length == this.capacities.length) {
						this.validated = true;
						delete this.block.timeModifierCounter;
					}
				}
			}
		}
		else if (iEvent.service === null && iEvent.serviceName !== undefined && iEvent.serviceName !== null && iEvent.actor !== undefined && iEvent.actor !== null) {
			var caps = this.capacities.filter(cap => GetActorOf(cap.parent) == iEvent.actor && cap.name == iEvent.serviceName);
			if (caps.length == 1) {
				if (this.validatedCaps.indexOf(caps[0]) == -1) {
					this.validatedCaps.push(iEvent.serviceName);
					if (this.validatedCaps.length == this.capacities.length) {
						this.validated = true;
						delete this.block.timeModifierCounter;
					}
				}
			}
		}
	};

	GroupCallExecutionContext.prototype.onActivate = function (oExceptions) {
		if (this.capacities.length == 0) {
			return;
		}

		// each capacity are the same so same type
		// no sensor for now, only driver so no events
		if (this.capacities[0] instanceof STU.Service) {
			// not used
			// EP.EventServices.addObjectListener(STU.ServiceStartedEvent,this,'onServiceStarted');
			// EP.EventServices.addObjectListener(STU.ServiceResumedEvent,this,'onServiceResumed');
			// EP.EventServices.addObjectListener(STU.ServicePausedEvent,this,'onServicePaused');
			// EP.EventServices.addObjectListener(STU.ServiceEndedEvent,this,'onServiceEnded');
			EP.EventServices.addObjectListener(STU.ServiceStoppedEvent, this, 'onServiceStopped');
		}
	}

	GroupCallExecutionContext.prototype.onDeactivate = function () {
		if (this.capacities.length == 0) {
			return;
		}

		// each capacity are the same so same type
		// no sensor for now, only driver so no events
		if (this.capacities[0] instanceof STU.Service) {
			// not used
			// EP.EventServices.removeObjectListener(STU.ServiceStartedEvent, this, 'onServiceStarted');
			// EP.EventServices.removeObjectListener(STU.ServiceResumedEvent, this, 'onServiceResumed');
			// EP.EventServices.removeObjectListener(STU.ServicePausedEvent, this, 'onServicePaused');
			// EP.EventServices.removeObjectListener(STU.ServiceEndedEvent, this, 'onServiceEnded');
			EP.EventServices.removeObjectListener(STU.ServiceStoppedEvent, this, 'onServiceStopped');
		}
	}

	GroupCallExecutionContext.prototype.reset = function () {
		this.validated = false;
		this.validatedCaps = [];
		if (this.capacities.length == 0) {
			return;
		}
		if (this.capacities[0] instanceof STU.Service) {
			this.block.startedOnce = false;
		}
	}

	// Expose in STU namespace.
	STU.GroupCallExecutionContext = GroupCallExecutionContext;

	return GroupCallExecutionContext;
});

define('StuModel/StuGroupCallExecutionContext', ['DS/StuModel/StuGroupCallExecutionContext'], function (GroupCallExecutionContext) {
	'use strict';

	return GroupCallExecutionContext;
});
