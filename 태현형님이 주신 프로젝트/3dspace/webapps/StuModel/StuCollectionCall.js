
define('DS/StuModel/StuCollectionCall', 
['DS/StuCore/StuContext', 
'DS/StuModel/StuGroupCall', 
'DS/StuModel/StuCollection', 
'DS/StuModel/StuCollectionObjectAddedEvent', 
'DS/StuModel/StuCollectionObjectRemovedEvent',
'DS/StuModel/StuActor'], function (STU, GroupCall, Collection, CollectionObjectAddedEvent, CollectionObjectRemovedEvent, Actor) {
	'use strict';

    /**
     * @exports CollectionCall
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.GroupCall
     * @memberof STU
	 * @alias STU.CollectionCall
     */
	var CollectionCall = function () {
		GroupCall.call(this);

		this.name = "CollectionCall";
		this.caller;
	};

	CollectionCall.prototype = new GroupCall();
	CollectionCall.prototype.constructor = CollectionCall;

    /**
    * Return the experience
    * @method
    * @private
    * @return {STU.Experience} instance object corresponding to the experience
    */
	CollectionCall.prototype.getExperience = function () {
		return STU.Experience.getCurrent();
	};

	CollectionCall.prototype.setCaller = function (caller) {
		GroupCall.prototype.setCaller.call(this, caller);
		if (!(this.caller instanceof Collection)) {
			console.err("expected type for caller is Collection");
		}
		this.caller.addObjectListener(CollectionObjectAddedEvent, this, 'onCollectionObjectAdded');
		this.caller.addObjectListener(CollectionObjectRemovedEvent, this, 'onCollectionObjectRemoved');
	}

	CollectionCall.prototype.setCapacityID = function (iCapacityID) {
		this.capacityID = iCapacityID;
	}

	CollectionCall.prototype.onCollectionObjectAdded = function (iEvent) {
		// collections are not sync with model
		// I can't just call a binding

		var obj = iEvent.object;
		let capacities = [];
		if (obj._services) {
			capacities = obj._services;
		}
		if (obj._functions) {
			capacities = capacities.concat(obj._functions);
		}
		if (obj instanceof Actor) {
			for (let beh of obj.behaviors) {
				if (beh._services) {
					capacities = capacities.concat(beh._services);
				}
				if (beh._functions) {
					capacities = capacities.concat(beh._functions);
				}
			}
		}

		let alreadyAddedCapacities = [];
		for (var i = 0; i < this.executionCtxs.length; ++i) {
			let capacityID = this.executionCtxs[i].capacityID;
			if (alreadyAddedCapacities.includes(capacityID)) {
				continue;
			}

			for (let i = 0; i<=capacities.length; i++) {
				if (capacityID == capacities[i].name) {
					if (this.capacities[capacityID]) {
						this.capacities[capacityID].push(capacities[i]);
					} else {
						this.capacities[capacityID] = [capacities[i]];
					}
					alreadyAddedCapacities.push(capacityID);
					break; 
				}
			}
		}
		
		for (var i = 0; i < this.executionCtxs.length; ++i) {
			this.executionCtxs[i].updateCapacities();
		}
	}

	CollectionCall.prototype.onCollectionObjectRemoved = function (iEvent) {
		var obj = iEvent.object;
		let capacities = [];
		if (obj._services) {
			capacities = obj._services;
		}
		if (obj._functions) {
			capacities = capacities.concat(obj._functions);
		}
		if (obj instanceof Actor) {
			for (let beh of obj.behaviors) {
				if (beh._services) {
					capacities = capacities.concat(beh._services);
				}
				if (beh._functions) {
					capacities = capacities.concat(beh._functions);
				}
			}
		}
		

		let alreadyRemovedCapacities = [];
		for (var i = 0; i < this.executionCtxs.length; ++i) {
			let capacityID = this.executionCtxs[i].capacityID;
			if (alreadyRemovedCapacities.includes(capacityID)) {
				continue;
			}

			// checking ids
			for (let i = 0; i<=capacities.length; i++) {
				if (capacityID == capacities[i].name) {
					if (this.capacities[capacityID]) {
						var index = this.capacities[capacityID].indexOf(capacities[i]);
						if (index > -1)
							this.capacities[capacityID].splice(index, 1);
					}
					alreadyRemovedCapacities.push(capacityID);
					break; 
				}
			}
		}

		for (var i = 0; i < this.executionCtxs.length; ++i) {
			this.executionCtxs[i].updateCapacities();
		}
	}

	// Expose in STU namespace.
	STU.CollectionCall = CollectionCall;

	return CollectionCall;
});

define('StuModel/StuCollectionCall', ['DS/StuModel/StuCollectionCall'], function (CollectionCall) {
	'use strict';

	return CollectionCall;
});
