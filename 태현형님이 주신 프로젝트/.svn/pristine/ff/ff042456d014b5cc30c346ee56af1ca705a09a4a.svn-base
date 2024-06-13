define('DS/StuHuman/StuHumanManagerNa',
	[
		'DS/StuCore/StuContext',
		'DS/StuCore/StuManager',
		'DS/EPTaskPlayer/EPTask',
		'DS/EPTaskPlayer/EPTaskPlayer',
		'DS/EPTaskPlayer/EPTaskGroup',
		'DS/MathematicsES/MathsDef',
		'DS/StuHuman/CATCXPHumanManager'
	],
	function (STU, Manager, Task, TaskPlayer, TaskGroup, DSMath, CATCXPHumanManager) {
		'use strict';

		STU.EHumanTaskGroups = {
			/** @private */
			eMotionAnimation: 0,
			/** @private */
			ePreAnimation: 1,
			/** @private */
			eAnimation: 2,
			/** @private */
			ePostAnimation: 3,
		};

		/**
		 * IDs used to identify taskgroups in profiling dumps
		 * 
		 * @private
		 */
		var humanTaskGroupsIDs = ["MotionAnimation", "PreAnimation", "Animation", "PostAnimation"];

		var humanTaskGroups = [];

		STU.getHumanTaskGroup = function (iEHumanTaskGroup) {
			return humanTaskGroups[iEHumanTaskGroup];
		};

		/**
		 * The task allows to animate a Human.
		 *
		 * @exports HumanLifeMotionTask
		 * @class
		 * @constructor
		 * @private
		 * @extends EP.Task
		 * @param {STU.HumanManager} iHumanManager
		 * @memberof STU
		 */
		var HumanLifeMotionTask = function (iHumanManager) {
			Task.call(this);

			this._attachedMng = iHumanManager;
			this._humanList = [];
			this.collisionTreeCpp = null;
		};

		HumanLifeMotionTask.prototype = new Task();
		HumanLifeMotionTask.prototype.constructor = HumanLifeMotionTask;

		/**
		 * This is the classic run method of any task.
		 *
		 * @method
		 * @private
		 * @param {Object} iExContext, the context of execution passed to any task on it's run.
		 */
		HumanLifeMotionTask.prototype.onExecute = function (iExContext) {
			this._attachedMng.humanManCpp.ExecuteSolverFrame(iExContext.getDeltaTime());
			this._updateAllHumanTransforms();

			return this;
		};

		HumanLifeMotionTask.prototype.updateCollisionTree = function () {
			this.collisionTreeCpp = this._attachedMng.humanManCpp.CreateAllCollisionTree();

			return this;
		};

		HumanLifeMotionTask.prototype.onStart = function () {
			this.updateCollisionTree();

			this._attachedMng.humanManCpp.ExecuteSolverFrame(-1.0);
			this._updateAllHumanTransforms();

			return this;
		};

		HumanLifeMotionTask.prototype.onStop = function () {
			while (0 != this._attachedMng._HumanMotions.length) {
				var humanMotion = this._attachedMng._HumanMotions[0];
				this._attachedMng.removeHumanMotion(humanMotion);
			}

			this._attachedMng.humanManCpp.DestroyAllCollisionTree();

			return this;
		};

		HumanLifeMotionTask.prototype._updateAllHumanTransforms = function () {
			var motionBeCount = this._attachedMng._HumanMotions.length;
			for (var i = 0; i < motionBeCount; i++) {
				var humanMotion = this._attachedMng._HumanMotions[i];
				if (humanMotion._animate) {
					var humanActor = humanMotion.getActor();

					var transform = humanMotion.getLocation();

					humanActor.setTransform_ActorOnly(transform);
					if (humanActor.visible) {
						humanActor.updateSkinning();
					}
				}
			}

			return this;
		};

		/**
		 * The Human Manager provides the list of instancied humans
		 *
		 * @exports HumanManager
		 * @class
		 * @constructor
		 * @private
		 * @extends STU.Manager
		 * @memberof STU
		 */
		var HumanManager = function () {

			Manager.call(this);

			this.name = 'HumanManager';

			/**
			 * The array listing the human of this STU.HumanManager.
			 *
			 * @member
			 * @private
			 * @type {Array.<STU.HumanMotion>}
			 */
			this._HumanMotions = [];

			this.humanMsgCreated = null;
			this.humanMsgStatusChanged = null;
			//this.humanMsgReleased = null;
		};

		HumanManager.prototype = new Manager();
		HumanManager.prototype.constructor = HumanManager;

		/**
		 * Process to execute when this STU.HumanManager is initializing.
		 *
		 * @method
		 * @private
		 * @see STU.HumanManager#onDispose
		 */
		HumanManager.prototype.onInitialize = function () {
			Manager.prototype.onInitialize.call(this);

			// init human task groups
			for (var taskGroupName in STU.EHumanTaskGroups) {
				var taskgroup = new TaskGroup();
				humanTaskGroups[STU.EHumanTaskGroups[taskGroupName]] = taskgroup;
				TaskPlayer.addTaskGroup(taskgroup, STU.getTaskGroup(STU.ETaskGroups.eProcess));

				// adding an ID to the taskgroup to allow identification in Profiling Manager
				taskgroup.id = humanTaskGroupsIDs[STU.EHumanTaskGroups[taskGroupName]];
			}

			this._HumanMotions = [];

			this.humanManCpp = CATCXPHumanManager.CATGetHumanManager();
		};

		/**
		 * Process to execute when this STU.HumanManager is disposing.
		 *
		 * @method
		 * @private
		 * @see STU.HumanManager#onInitialize
		 */
		HumanManager.prototype.onDispose = function () {
			if (this.associatedTask instanceof HumanLifeMotionTask === true) {
				TaskPlayer.removeTask(this.associatedTask);

				delete this.associatedTask;
				this.associatedTask = null;
			}

			STU.clear(this._HumanMotions);
			delete this._HumanMotions;

			Manager.prototype.onDispose.call(this);

			// human task groups destruction 
			for (var taskGroupId = 0; taskGroupId < humanTaskGroups.length; taskGroupId++) {
				TaskPlayer.removeTaskGroup(humanTaskGroups[taskGroupId]);
			}
		};

		/**
		 * Add a STU.HumanMotion on this STU.HumanManager.
		 *
		 * @method
		 * @private
		 * @param {STU.HumanMotion} iHumanMotion, instance object corresponding to the human motion behavior to add
		 */
		HumanManager.prototype.addHumanMotion = function (iHumanMotion) {
			STU.pushUnique(this._HumanMotions, iHumanMotion);

			this.humanManCpp.RegisterHumanMotionBe(iHumanMotion.CATICXPHumanMotion);

			var motionBeCount = this._HumanMotions.length;
			if (typeof iHumanMotion._animate === 'boolean') {
				if (iHumanMotion._animate) {
					iHumanMotion.CATICXPHumanMotion.ActivateAnimation();
				} else {
					iHumanMotion.CATICXPHumanMotion.DeactivateAnimation();
				}
			}

			if (this.associatedTask instanceof HumanLifeMotionTask === false) {
				this.associatedTask = new HumanLifeMotionTask(this);
				TaskPlayer.addTask(this.associatedTask, STU.getHumanTaskGroup(STU.EHumanTaskGroups.eMotionAnimation));
			} else {
				this.associatedTask.updateCollisionTree();
			}
		};

		/**
		 * Remove a STU.HumanMotion from this STU.HumanManager.
		 *
		 * @method
		 * @private
		 * @param {STU.HumanMotion} iHumanMotion, instance object corresponding to the human motion behavior to remove
		 */
		HumanManager.prototype.removeHumanMotion = function (iHumanMotion) {
			this.humanManCpp.UnregisterHumanMotionBe(iHumanMotion.CATICXPHumanMotion);

			STU.remove(this._HumanMotions, iHumanMotion);
		};

		/**
		 * Check if a STU.HumanMotion is registered.
		 *
		 * @method
		 * @private
		 * @param {STU.HumanMotion} iHumanMotion, instance object corresponding to the human motion behavior to check
		 * @return {Boolean}
		 */
		HumanManager.prototype.isHumanMotionRegistered = function (iHumanMotion) {
			if (Array.isArray(this._HumanMotions)) {
				if (this._HumanMotions.indexOf(iHumanMotion) !== -1) {
					return true;
				}
			}
			return false;
		};

		/**
		 * Human Message Created Event Handler
		 * Called by the Manager when a human message is created
		 *
		 * @method
		 * @private
		 * @param {Object} iHumanEvent, human created information
		 */
		HumanManager.prototype.onHumanMsgCreated = function (iHumanEvent) {
			var humanActor = STU.resolveElementFromPath(iHumanEvent.humanAsPath);
			if (humanActor !== undefined && humanActor !== null) {
				var newEvt = new STU.HumanMsgCreatedEvent();

				newEvt.setHuman(humanActor);
				newEvt.setMessage(iHumanEvent.humanMsg);

				this._resolveHumanMsgEvent(newEvt);
			}
		};

		/**
		 * Human Message Status Changed Event Handler
		 * Called by the Manager when the status of a human message change
		 *
		 * @method
		 * @private
		 * @param {Object} iHumanEvent, human status information
		 */
		HumanManager.prototype.onHumanMsgStatusChanged = function (iHumanEvent) {
			var humanActor = STU.resolveElementFromPath(iHumanEvent.humanAsPath);
			if (humanActor !== undefined && humanActor !== null) {
				var newEvt = new STU.HumanMsgStatusChangedEvent();

				newEvt.setHuman(humanActor);
				newEvt.setMessage(iHumanEvent.humanMsg);

				this._resolveHumanMsgEvent(newEvt);
			}
		};

		/**
		 * Human Message Released Event Handler
		 * Called by the Manager when a human message is released
		 *
		 * @method
		 * @private
		 * @param {Object} iHumanEvent, human released information
		 */
		HumanManager.prototype.onHumanMsgReleased = function (iHumanEvent) {
			// 	    var humanActor = STU.resolveElementFromPath(iHumanEvent.humanAsPath);
			// 	    if (humanActor !== undefined && humanActor !== null) {
			// 	        var newEvt = new STU.HumanMsgReleasedEvent();
			//
			// 	        newEvt.setHuman(humanActor);
			// 	        newEvt.setMessage(iHumanEvent.humanMsg);
			//
			// 	        this._resolveHumanMsgEvent(newEvt);
			// 	    }

		};

		/**
		 * Human Collision Event Handler
		 * Called by the Manager when a human collide
		 *
		 * @method
		 * @private
		 * @param {Object} iHumanEvent, human created information
		 */
		// 	HumanManager.prototype.onHumanCollision = function (iHumanEvent) {
		// 	    var newEvt = new STU.HumanCollisiondEvent(iHumanEvent.human);
		// 	    EventServices.dispatchEvent(newEvt);
		//
		// 	    this._resolveHumanMsgEvent(iHumanEvent);
		// 	};

		/**
		 * Human Send Event
		 *
		 * @method
		 * @private
		 * @param {Object} iHumanEvent, human created information
		 */
		HumanManager.prototype._sendHumanEvent = function (iHumanEvent) {
			if (iHumanEvent !== undefined && iHumanEvent !== null) {
				var humanActor = iHumanEvent.getHuman();
				if (humanActor !== undefined && humanActor !== null) {
					humanActor.dispatchEvent(iHumanEvent);
				}
			}
		};


		HumanManager.prototype._resolveHumanMsgEvent = function (iHumanEvent) {
			var newEvt;
			if (iHumanEvent !== undefined && iHumanEvent !== null) {
				if (iHumanEvent.human !== undefined && iHumanEvent.human !== null) {
					if (iHumanEvent.message !== undefined && iHumanEvent.message !== null) {
						if (iHumanEvent.message.name === '__GoTo__') {
							if (iHumanEvent.message.status === 'STARTED') {
								newEvt = new STU.HumanGoToEvent();
								newEvt.setHuman(iHumanEvent.human);
								newEvt.setLocation(iHumanEvent.message.point);
								this._sendHumanEvent(newEvt);
							} else if (iHumanEvent.message.status === 'DONE') {
								newEvt = new STU.HumanReachEvent();
								newEvt.setHuman(iHumanEvent.human);
								newEvt.setLocation(iHumanEvent.message.point);
								this._sendHumanEvent(newEvt);
								EP.EventServices.dispatchEvent(new STU.ServiceStoppedEvent('goTo', iHumanEvent.human));
							}
						} else if (iHumanEvent.message.name === '__FollowPath__') {
							if (iHumanEvent.message.status === 'STARTED') {
								newEvt = new STU.HumanFollowPathEvent();
								newEvt.setHuman(iHumanEvent.human);
								newEvt.setPath(iHumanEvent.message.path);
								this._sendHumanEvent(newEvt);
							} else if (iHumanEvent.message.status === 'DONE') {
								newEvt = new STU.HumanPathCompletedEvent();
								newEvt.setHuman(iHumanEvent.human);
								newEvt.setPath(iHumanEvent.message.path);
								this._sendHumanEvent(newEvt);
								EP.EventServices.dispatchEvent(new STU.ServiceStoppedEvent('followPath', iHumanEvent.human));
							}
						} else if (iHumanEvent.message.name === '__CharacterControl__') {
							if (iHumanEvent.message.status === 'STARTED') {
								newEvt = new STU.HumanCharacterControlEvent(iHumanEvent.human, iHumanEvent.message.direction, iHumanEvent.message.orientation);
								newEvt.setHuman(iHumanEvent.human);
								newEvt.setDirection(iHumanEvent.message.direction);
								newEvt.setOrientation(iHumanEvent.message.orientation);
								this._sendHumanEvent(newEvt);
							}
						}
					}
				}
			}
		};

		STU.registerManager(HumanManager);

		// Expose in STU namespace.
		STU.HumanManager = HumanManager;

		return HumanManager;
	});

define('StuHuman/StuHumanManagerNa', ['DS/StuHuman/StuHumanManagerNa'], function (HumanManager) {
	'use strict';

	return HumanManager;
});
