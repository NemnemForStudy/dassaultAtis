
define('DS/StuModel/StuInstance', ['DS/StuCore/StuContext', 'DS/StuCore/StuTools', 
	'DS/EPEventServices/EPEventServices', 'DS/EPEventServices/EPEventTarget', 
	'DS/StuModel/StuInstanceActivateEvent', 'DS/StuModel/StuInstanceDeactivateEvent'], function (STU, Tools) {
		'use strict';

		/**
		* An enumeration for all possible activation state.
		* 
		* @private
		* @enum {number}
		* @memberOf STU
		*/
		STU.eActivationState = {
			/**
			 * Activating
			 * @private
			 */
			"eActivating": 0,
			/**
			 * Active
			 * @private
			 */
			"eActive": 1,
			/**
			 * Deactivating
			 * @private
			 */
			"eDeactivating": 2,
			/**
			 * Inactive
			 * @private
			 */
			"eInactive": 3
		};

		var InactivityConstraint = function (iID, iDesc, iResponsible) {
			this.ID = iID;
			this.desc = iDesc;
			this.responsible = iResponsible;
		}

		InactivityConstraint.prototype.constructor = InactivityConstraint;


		/**
		 * Describes the highest class in the experience world's hierarchy. 
		 * Most of experience world's objects (cubes, lights...) descend from the STU.Instance parent.
		 * Basic functions can be accessed with this class: activation, naming, and parenting.
		 *
		 * @exports Instance
		 * @class
		 * @constructor
		 * @noinstancector 
		 * @public
		 * @memberof STU
		 * @alias STU.Instance
		 */
		var Instance = function () {

			/**
			* Reversed path for services mapping in STU.ServicesManager
			* Unique identity of the object. 
			*
			* @member
			* @private
			* @type {string}
			*/
			this._path = "";

			/**
			 * Name of the Instance.
			 *
			 * @member
			 * @public
			 * @type {string}
			 * @see STU.Instance#getName
			 * @see STU.Instance#setName
			*/
			if (STU.isEKIntegrationActive()) {
				Object.defineProperty(this, "name", {
					enumerable: true,
					configurable: true,
					get: function () {
						return this._varName;
					},
					set: function (iName) {
						this._varName = iName;
					}
				});
			}

			this.name = 'Object';

			/**
			* Parent Instance
			*
			* @member
			* @private
			* @type {STU.Instance}
			* @see STU.Instance#setParent
			* @see STU.Instance#getParent
			*/
			this.parent;

			/**
			* Activation state of this STU.Instance.
			*
			* @member
			* @private
			* @type {STU.eActivationState}
			*/
			this.activationState = STU.eActivationState.eInactive;

			/**
			 * Initialization state of this STU.Instance.
			 *
			 * @member
			 * @private
			 * @type {boolean}
			 * @see STU.Instance#isInitialized
			 */
			this.initialized = false;

			this.inactivityConstraints = {};
			this.nbConstraints = 0;

			this._selfActive = null;
			Object.defineProperty(this, "selfActive", {
				enumerable: true,
				configurable: true,
				get: function () {
					return this._selfActive;
				},
				set: function (iSelfActive) {
					this._selfActive = iSelfActive;
					if (this.CATICXPActivable !== null && this.CATICXPActivable !== undefined
						&& iSelfActive !== null && iSelfActive !== undefined) {
						this.CATICXPActivable.setSelfActivity(iSelfActive);
					}
				}
			});

		};

		Instance.prototype.constructor = Instance;

		/**
		* The protoId is an important information for any STU.Instance. It allows you to specify which is the most specific
		* user defined constructor function that you want to use to build a specific STU.Instance. This is important because JS implements
		* prototypal inheritance through the indirection of constructor function.
		*
		* This information is used to build original prototypes, the first instance takes as stuId this protoId to indicates it's a proto
		* defined in JS source code.
		*
		* Please note that Instance built from other instances that are themselves built from those constructor functions written in JS source
		* are in fact instances built from constructor function built on the fly from the right instances that they use as proto.
		*
		* This property is a GUID string, for example "74E4AF4C-8CCD-495A-BE17-0B4B4559440B" for a raw instance.
		*
		* @member
		* @private
		* @type {string}
		*/
		Instance.prototype.protoId = '74E4AF4C-8CCD-495A-BE17-0B4B4559440B';

		Instance.prototype.featureCatalog = '3DExperience.feat';
		Instance.prototype.featureStartup = 'Experience';
		Instance.prototype.pureRuntimeAttributes = ['parent', 'activationState', 'initialized', '_varName'];

		/**
		 * !! INTERNAL !! You should not have to mess with this one, it is used internally to build back prototypal
		 * inheritance chain as expressed in JSON experience description!
		 *
		 * @method
		 * @private
		 * @return {STU.Instance} a new instance which constructor function has been built on the fly to have 'this'
		 * as prototype. This is through this mechanism that we can really express reuse through prototypal inheritance
		 * coming from authoring side.
		 */
		Instance.prototype.protoNew = function () {
			function _protoNew() { }
			_protoNew.prototype = this;
			_protoNew.prototype.constructor = _protoNew;
			return new _protoNew();
		};

		/**
		 * Returns the name of this STU.Instance. 
		 *
		 *
		 * @method
		 * @public
		 * @return {string} the name.
		 * @see STU.Instance#setName
		 */
		Instance.prototype.getName = function () {
			return this.name;
		};

		/**
		 * Sets a new name for this STU.Instance.
		 * 
		 *
		 * @method
		 * @public
		 * @param {string} iName the new name.
		 * @see STU.Instance#getName
		 */
		Instance.prototype.setName = function (iName) {
			this.name = iName;
		};

		/**
		 * Returns the direct parent of this STU.Instance. 
		 *
		 * @method
		 * @public
		 * @return {STU.Instance} Instance corresponding to the direct parent.
		 * @example 
		 *	// Gets the experience object in the cube instance hierarchy
		 *	var experience = myCubeInstance.findParent(STU.Experience);
		 */
		Instance.prototype.getParent = function () {
			return this.parent;
		};

		/**
		 * Finds an object of the given input type in the parent hierarchy.
		 *
		 * @method
		 * @public
		 * @param {STU.Instance} iInstanceCtor Constructor function corresponding to the chosen type.
		 * @return {STU.Instance} Instance corresponding to the found parent.
		 */
		Instance.prototype.findParent = function (iInstanceCtor) {

			if (iInstanceCtor === undefined || iInstanceCtor === null || !(iInstanceCtor.prototype instanceof STU.Instance || iInstanceCtor === STU.Instance)) {
				throw new TypeError('iInstanceCtor is not a STU.Instance constructor or a extended constructor from it');
			}

			if (this.parent === undefined || this.parent instanceof iInstanceCtor) {
				return this.parent;
			}
			else {
				return this.parent.findParent(iInstanceCtor);
			}
		};

		/**
		 * Sets a new direct parent for this STU.Instance.
		 *
		 * @method
		 * @private
		 * @param {STU.Instance} instance Object corresponding to the new parent.
		 * @see STU.Instance#getParent
		 */
		Instance.prototype.setParent = function (iParent) {
			this.parent = iParent;
			this.updateActivity();
		};

		/**
		 * Adds a function listener to get notified for a specific event type.
		 * When the provided event type occurs, the instance will callback the function listener.
		 *
		 * @method
		 * @private
		 * @param {EP.Event} iEventCtor Constructor function corresponding to the specific event type.
		 * @param {function} iListener Function which will be called with a {@link EP.Event} instance object as argument, corresponding to the event type specified with the iEventCtor argument.
		 * @see STU.Instance#removeListener
		 */
		Instance.prototype.addListener = function (iEventCtor, iListener) {
			this._eventTarget.addListener(iEventCtor, iListener);
		};

		/**
		 * Removes a function listener to stop getting notified when the event type specified occurs.
		 *
		 * @method
		 * @private
		 * @param {EP.Event} iEventCtor Constructor function corresponding to the specific event type.
		 * @param {function} iListener Function which will be called with a {@link EP.Event} instance object as argument, corresponding to the event type specified with the iEventCtor argument.
		 * @see STU.Instance#addListener
		 */
		Instance.prototype.removeListener = function (iEventCtor, iListener) {
			this._eventTarget.removeListener(iEventCtor, iListener);
		};

		/**
		 * When a given event occurs, calls the functions that can be defined thanks to userscripts.
		 *
		 * @method
		 * @public
		 * @param {EP.Event} iEventCtor Constructor function corresponding to the chosen event.
		 * @param {object} iObj Object instance which has the function to call.
		 * @param {string} iFctName Name of the function which will be called with a {@link EP.Event} instance as argument, corresponding to the event type specified with the iEventCtor argument.
		 * @see STU.Instance#removeObjectListener
		 */
		Instance.prototype.addObjectListener = function (iEventCtor, iObj, iFctName) {
			this._eventTarget.addObjectListener(iEventCtor, iObj, iFctName);
		};

		/**
		 * When a given event occurs, removes an object listener to stop being notified.
		 *
		 * @method
		 * @public
		 * @param {EP.Event} iEventCtor Constructor function corresponding to the chosen event.
		 * @param {object} iObj Object instance which has the function to call.
		 * @param {string} iFctName Name of the function which will be called with a {@link EP.Event} instance as argument, corresponding to the event type specified with the iEventCtor argument.
		 * @see STU.Instance#addObjectListener
		 */
		Instance.prototype.removeObjectListener = function (iEventCtor, iObj, iFctName) {
			this._eventTarget.removeObjectListener(iEventCtor, iObj, iFctName);
		};

		/**
		 * Dispatch synchronously an event in a local context.
		 * All listeners registered on this event type will be notified.
		 * By default events are also dispatched globally.
		 *
		 * @method
		 * @public
		 * @param {EP.Event} iEvent event to dispatch
		 * @param {boolean} [iGlobalDispatch=true] dispatch events globally
		 */
		Instance.prototype.dispatchEvent = function (iEvent, iGlobalDispatch) {
			this._eventTarget.dispatchEvent(iEvent);

			if (!(iGlobalDispatch !== undefined && iGlobalDispatch !== null && iGlobalDispatch === false)) {
				EP.EventServices.dispatchEvent(iEvent);
			}
		};

		/*
		 * We don't do much here for instances for
		 * other types of instances might need the opportunity
		 * to finalize themselves... to take some action
		 * on an instance of themselves that has just been
		 * built from raw data or that has been updated!!
		 * To put it another way all objects will have a data
		 * part that is the exposed view of the abstraction. when
		 * these data are modified some more complex state associated
		 * with the object might need updating. finalize should be overridden
		 * to perform that part.
		 * Canonical example is the node3D that should update it's renderable
		 * transform based on its data for position, rotation, scale.
		 *
		 * When CPP part pushed thing to JS side we ensure this method is called.
		 * On JS side we expect dev to call methods instead of modifying data directly
		 * or if they modify data directly we expect them to call finalize themselves when they
		 * see fit. Calling finalize once after a transaction of several updates can be seen
		 * as of form of optimization.
		 *
		 * !! WARNING !! It should be noted though that in finalize you should take only
		 * local actions. Don't regenerate links that point up the scene structure here. If you
		 * need to perform such action choose onSceneFinalize instead !!
		 *
		 * @method
		 * @private
		 * @return {Object} returns this after finalization !
		 */
		Instance.prototype.finalize = function (oExceptions) {
			//console.log("finalize: " + this.name);
			return this;
		};

		/**
		 * Check if this STU.Instance is initialized.
		 *
		 * @method
		 * @private
		 * @return {boolean}
		 */
		Instance.prototype.isInitialized = function () {
			return this.initialized;
		};

		/**
		 * Initialize this STU.Instance.
		 *
		 * @method
		 * @private
		 * @see STU.Instance#dispose
		 * @see STU.Instance#dispose
		 */
		Instance.prototype.initialize = function (oExceptions) {
			
			if (!this.initialized) {
				try {
					this.onInitialize(oExceptions);
				} catch (e) {
					if (oExceptions) {
						oExceptions.push(e);
					} else {
						throw e;
					}
				}
				this.initialized = true;

				if (this.selfActive === null || this.selfActive === undefined) {
					this.selfActive = true;
				}
			}
		};

		/**
		 * Dispose this STU.Instance.
		 *
		 * @method
		 * @private
		 * @see STU.Instance#initialize
		 */
		Instance.prototype.dispose = function () {
			if (this.initialized) {
				this.deactivate();
				this.onDispose();
				this.initialized = false;
			}
		};

		/**
		 * Process to execute when this STU.Instance is initializing.
		 *
		 * @method
		 * @private
		 * @see STU.Instance#onDispose
		 */
		Instance.prototype.onInitialize = function (oExceptions) {
			this._eventTarget = new EP.EventTarget();

			// Build reversed path for services mapping in STU.ServicesManager
			if (this.parent !== undefined && this.parent !== null)
				this._path = this.name + "/" + this.parent._path;
			else
				this._path = this.name;

			//console.log(this._path);
		};

		/**
		 * Process to execute when this STU.Instance is disposing.
		 *
		 * @method
		 * @private
		 * @see STU.Instance#onInitialize
		 */
		Instance.prototype.onDispose = function () {
			delete this._eventTarget;
		};

		/**
		 * Return the activation state of this STU.Instance.
		 *
		 * @method
		 * @private
		 * @return {STU.eActivationState}
		 */
		Instance.prototype.getActivationState = function () {
			return this.activationState;
		};

		/**
		 * Returns true if this STU.Instance is active.
		 *
		 * @method
		 * @public
		 * @return {boolean} true if this STU.Instance is active.<br/>
		 * 					 false otherwise.
		 */
		Instance.prototype.isActive = function () {
			return this.activationState === STU.eActivationState.eActive;
		};

		/**
		 * Add a constraint of inactivity.
		 * As long as a constraint is present, the instance will not be activated
		 * even if all the hierarchy is self active.
		 *
		 * @method
		 * @param {string} iID the ID of the constraint, used to remove it
		 * @param {string} iDesc the description of the constraint
		 * @param {object} iResponsible the object responsible for the constraint
		 * @see STU.Instance#removeInactivityConstraint
		 * @private
		 */
		Instance.prototype.addInactivityConstraint = function (iID, iDesc, iResponsible) {
			if (!(iID in this.inactivityConstraints)) {
				this.inactivityConstraints[iID] = new InactivityConstraint(iID, iDesc, iResponsible);
				this.nbConstraints++;
				if (this.activationState == STU.eActivationState.eActive) {
					this.activationState = STU.eActivationState.eDeactivating;
					this.onDeactivate();
					this.activationState = STU.eActivationState.eInactive;
					this.onPostDeactivate();
				}
			}
		}

		/**
		 * Remove a constraint of inactivity.
		 *
		 * @method
		 * @private
		 * @see STU.Instance#addInactivityConstraint
		 */
		Instance.prototype.removeInactivityConstraint = function (iID) {
			delete this.inactivityConstraints[iID];
			this.nbConstraints--;
			if (this.nbConstraints == 0 && this.selfActive == true && this.activationState == STU.eActivationState.eInactive) {
				if ((this.parent === null || this.parent === undefined || this.parent.activationState === STU.eActivationState.eActivating
					|| this.parent.activationState === STU.eActivationState.eActive) && this.nbConstraints === 0) {
					this.activationState = STU.eActivationState.eActivating;
					this.onActivate();
					this.activationState = STU.eActivationState.eActive;
					this.onPostActivate();
					return true;
				}
			}
		}

		/**
		 * Returns the objects responsible for the incactivity of the instance.
		 * If the instance is active, returns an empty list.
		 * It can contain either non self active instances or instances that 
		 * added a constraint of inactivity (ProductActor filtering with ProductConfiguration for example)
		 *
		 * @method
		 * @public
		 * @return {STU.Instance[]} the lsit containing the instance responsible
		 */
		Instance.prototype.getInactivityResponsibles = function () {
			var responsibles = [];
			if (this.activationState == STU.eActivationState.eActive || this.activationState == STU.eActivationState.eActivating) {
				return responsibles;
			}
			if (!this.selfActive) {
				responsibles.push(this);
			}
			var current = this.parent;
			while (current !== null && current !== undefined) {
				if (!current.isSelfActive()) {
					responsibles.push(current)
				}
				current = current.parent;
			}

			for (var c in this.inactivityConstraints) {
				if (this.inactivityConstraints[c].responsible) {
					responsibles.push(this.inactivityConstraints[c].responsible);
				}
			}
			return responsibles;
		}

		Instance.prototype.updateActivity = function (oExceptions) {
			if (this.parent === null || this.parent === undefined) {
				return;
			}
			if (this.activationState === STU.eActivationState.eActive) {
				if (this.parent.activationState === STU.eActivationState.eInactive || this.parent.activationState === STU.eActivationState.eDeactivating) {
					this.activationState = STU.eActivationState.eDeactivating;
					this.onDeactivate();
					this.activationState = STU.eActivationState.eInactive;
					this.onPostDeactivate();
				}
			} else if (this.activationState === STU.eActivationState.eInactive) {
				if ((this.parent.activationState === STU.eActivationState.eActive || this.parent.activationState === STU.eActivationState.eActivating)
					&& this.nbConstraints === 0 && this.selfActive) {
					this.activationState = STU.eActivationState.eActivating;
					try {
						this.onActivate(oExceptions);
					} catch (e) {
						if (oExceptions) {
							oExceptions.push(e);
						} else {
							throw e;
						}
					}
					this.activationState = STU.eActivationState.eActive;
					try {
						this.onPostActivate(oExceptions);
					} catch (e) {
						if (oExceptions) {
							oExceptions.push(e);
						} else {
							throw e;
						}
					}
				}
			}
		}

		/**
		 * Makes the instance self active.
		 * An instance is active when it is self active and all the parents are self actives.
		 * If it is already active, this will have no effect. By default, all objects are active.<br/>
		 * If a parent is inactive, it will not make the instance active.
		 * 
		 * An inactive actor will not run its behaviors, sensors or drivers, an inactive behavior will not run
		 * 
		 * @method
		 * @public
		 * @return {boolean} returns true if the instance is now active, false otherwise
		 * @see STU.Instance#isSelfActive
		 */
		Instance.prototype.activate = function (iForce, oExceptions) {			
			if (!this.selfActive || iForce) {
				this.selfActive = true;
				if ((this.parent === null || this.parent === undefined || this.parent.activationState === STU.eActivationState.eActivating
					|| this.parent.activationState === STU.eActivationState.eActive) && this.nbConstraints === 0) {
					this.activationState = STU.eActivationState.eActivating;
					this.onActivate(oExceptions);
					this.activationState = STU.eActivationState.eActive;
					this.onPostActivate(oExceptions);
					return true;
				}
				return false;
			}
			return true;
		};

		/**
		 * Deactivates this STU.Instance. (For example, it stops the execution of behaviors).
		 * If it is already inactive, this will have no effect.<br/>
		 *
		 * Deactivation is also performed on all object's children (behaviors, subactors ...).<br/>
		 * Deactivation does not remove callback functions. A deactivated object can still be called back on an event.
		 *
		 * @method
		 * @public
		 */
		Instance.prototype.deactivate = function () {
			if (this.selfActive) {
				this.selfActive = false;
				if (this.activationState == STU.eActivationState.eActive) {
					this.activationState = STU.eActivationState.eDeactivating;
					this.onDeactivate();
					this.activationState = STU.eActivationState.eInactive;
					this.onPostDeactivate();
				}
			}
		};

		/**
		 * Returns the self activity of the instance.
		 *
		 * @method
		 * @public
		 * @see STU.Instance#activate
		 */
		Instance.prototype.isSelfActive = function () {
			return this.selfActive;
		}

		/**
		 * Process to execute when this STU.Instance is activating. 
		 * The instance is responsible for calling updateActivity on its children
		 *
		 * @method
		 * @private
		 */
		Instance.prototype.onActivate = function (oExceptions) {

		};

		/**
		 * Process to execute when this STU.Instance is deactivating.
		 *
		 * @method
		 * @private
		 */
		Instance.prototype.onDeactivate = function () {

		};

		/**
		 * Process to execute after this STU.Instance is activated. 
		 *
		 * @method
		 * @private
		 */
		Instance.prototype.onPostActivate = function () {
			var newEvt = new STU.InstanceActivateEvent();
			newEvt.setInstance(this);
			this.dispatchEvent(newEvt, true);
		};

		/**
		 * Process to execute after this STU.Instance is deactivated.
		 *
		 * @method
		 * @private
		 */
		Instance.prototype.onPostDeactivate = function () {
			var newEvt = new STU.InstanceDeactivateEvent();
			newEvt.setInstance(this);
			this.dispatchEvent(newEvt, true);
		};

		/**
		 * Perform a prop value copy not a deep copy!
		 *
		 * @method
		 * @private
		 * @return {STU.Instance} instance object corresponding to the clone
		 */
		Instance.prototype.clone = function () {
			var aNewOne = new this.constructor();

			for (var propName in this) {
				if (this.hasOwnProperty(propName) && propName !== "stuId") {
					aNewOne[propName] = this[propName];
				}
			}

			return aNewOne;
		};

		/**
		 * Gives an opportunity to supercharge the default stringification
		 * process per families of objects. This method will be checked and called
		 * by StuDefaultReplacer.
		 *
		 * By default the only thing we do is checking for weakRef attributes
		 * and replacing values by weak references !! When overriding this method
		 * you should better take care of several things:
		 * Call your prototype version of it.
		 * This will be used for GUI exposition as well as for schematic thus you
		 * should avoid riping out of your object representation stuff that
		 * might be usefull for either of these two usage!
		 *
		 * @method
		 * @private
		 * @return {Object} returns this or the modified object!
		 */
		Instance.prototype.replacer = function () {

			var modifiedObj = this.clone(this);
			modifiedObj.stuId = this.stuId;

			for (var propName in modifiedObj) {
				if (typeof this[propName] === 'object') {
					if (STU.isWeakRef(this, propName)) {
						// TODO : UnComment below line and comment the one after
						// as soon as C++ can process weakRef info.
						//modifiedObj[propName] = new STU.WeakRef(this[propName].stuId, this[propName].name);
						delete modifiedObj[propName];
						console.log("WeakRef detected on replacer:" + propName);
					}
				}

				var blackList = this.pureRuntimeAttributes;
				if (modifiedObj.hasOwnProperty(propName) && blackList.indexOf(propName) !== -1) {
					delete modifiedObj[propName];
				}
			}

			return modifiedObj;
		};

		// Expose in STU namespace.
		STU.Instance = Instance;

		return Instance;
	});

define('StuModel/StuInstance', ['DS/StuModel/StuInstance'], function (Instance) {
	'use strict';

	return Instance;
});
