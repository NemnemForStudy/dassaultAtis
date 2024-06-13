define('DS/StuTriggerZones/StuTriggerZoneManager',
	['DS/StuCore/StuContext',
		'DS/StuCore/StuManager',
		'DS/EPEventServices/EPEventServices',
		'DS/EPEventServices/EPEvent',
		'DS/EPTaskPlayer/EPTask'],

	function (STU, Manager, EventServices, Event, Task) {
		'use strict';

		/**
		 * This event is thrown when an object enters a trigger zone.
		 *
		 * @example
		 * beScript.onStart = function () {
		 *     var actor = this.getActor();
		 *     actor.addObjectListener(STU.TriggerZoneEnterEvent, beScript, 'onTZEnter');
		 * };
		 * 
		 * beScript.onStop = function () {
		 *     var actor = this.getActor();
		 *     actor.removeObjectListener(STU.TriggerZoneEnterEvent, beScript, 'onTZEnter');
		 * };
		 * 
		 * beScript.onTZEnter = function (iEvent) {
		 *     console.log("My parent actor has entred a trigger zone :");
		 * };
		 *
		 *
		 * @exports TriggerZoneEnterEvent
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends {EP.Event}
		 * @memberOf STU
		 * @alias STU.TriggerZoneEnterEvent
		 */
		var TriggerZoneEnterEvent = function (iZone, iObject) {
			Event.call(this);

			/**
			 * The trigger zone in which an object has entered
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */

			this.zone = (iZone !== undefined ? iZone : null);

			/**
			 * The Actor that has entered the zone
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */
			this.object = (iObject !== undefined ? iObject : null);
		};

		TriggerZoneEnterEvent.prototype = new Event();
		TriggerZoneEnterEvent.prototype.constructor = TriggerZoneEnterEvent;
		TriggerZoneEnterEvent.prototype.type = 'TriggerZoneEnterEvent';

		// Expose in STU namespace.
		STU.TriggerZoneEnterEvent = TriggerZoneEnterEvent;

		EventServices.registerEvent(TriggerZoneEnterEvent);


		/**
		 * This event is thrown when an object exists a trigger zone.
		 *
		 * @example
		 *
		 * beScript.onStart = function () {
		 *     var actor = this.getActor();
		 *     actor.addObjectListener(STU.TriggerZoneExitEvent, beScript, 'onTZExit');
		 * };
		 * 
		 * beScript.onStop = function () {
		 *     var actor = this.getActor();
		 *     actor.removeObjectListener(STU.TriggerZoneExitEvent, beScript, 'onTZExit');
		 * };
		 * 
		 * beScript.onTZExit = function (iEvent) {
		 *     console.log("My parent actor has exited a trigger zone :");
		 * };
		 *
		 *
		 * @exports TriggerZoneExitEvent
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends {EP.Event}
		 * @memberOf STU
		 * @alias STU.TriggerZoneExitEvent
		 */
		var TriggerZoneExitEvent = function (iZone, iObject) {
			Event.call(this);

			/**
			 * The zone in which an object has entered
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */
			this.zone = (iZone !== undefined ? iZone : null);

			/**
			 * The object (STU.Actor) that has entered the zone
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */
			this.object = (iObject !== undefined ? iObject : null);
		};

		TriggerZoneExitEvent.prototype = new Event();
		TriggerZoneExitEvent.prototype.constructor = TriggerZoneExitEvent;
		TriggerZoneExitEvent.prototype.type = 'TriggerZoneExitEvent';

		// Expose in STU namespace.
		STU.TriggerZoneExitEvent = TriggerZoneExitEvent;

		EventServices.registerEvent(TriggerZoneExitEvent);


		/**
		 * This event is thrown when an object is included in a trigger zone (inclusiontype==2)
		 * or when a triggerzone is included in an object (inclusiontype==1)
		 *
		 * @example
		 * beScript.onStart = function () {
		 *     var actor = this.getActor();
		 *     actor.addObjectListener(STU.TriggerZoneInclusionEvent, beScript, 'onTZInclusion');
		 * };
		 * 
		 * beScript.onStop = function () {
		 *     var actor = this.getActor();
		 *     actor.removeObjectListener(STU.TriggerZoneInclusionEvent, beScript, 'onTZInclusion');
		 * };
		 * 
		 * beScript.onTZInclusion = function (iEvent) {
		 *     console.log("An inclusion is detected");
		 * };
		 *
		 *
		 * @exports TriggerZoneInclusionEvent
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends {EP.Event}
		 * @memberOf STU
		 * @alias STU.TriggerZoneInclusionEvent
		 */
		var TriggerZoneInclusionEvent = function (iZone, iObject, iInclusionType) {
			Event.call(this);

			/**
			 * The trigger zone involved in the inclusion
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */

			this.zone = (iZone !== undefined ? iZone : null);

			/**
			 * The Actor involved in the inclusion
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */
			this.object = (iObject !== undefined ? iObject : null);

			/**
			 * The inclusion type :
			 * 3 : TriggerZone is included in object
			 * 2 : Object included in TriggerZone
			 *
			 * @member
			 * @public
			 * @type {number}
			 */
			this.inclusiontype = (iInclusionType !== undefined ? iInclusionType : null);
		};

		TriggerZoneInclusionEvent.prototype = new Event();
		TriggerZoneInclusionEvent.prototype.constructor = TriggerZoneInclusionEvent;
		TriggerZoneInclusionEvent.prototype.type = 'TriggerZoneInclusionEvent';

		// Expose in STU namespace.
		STU.TriggerZoneInclusionEvent = TriggerZoneInclusionEvent;

		EventServices.registerEvent(TriggerZoneInclusionEvent);


		/**
		 * This event is thrown when an object is no longer included in a trigger zone (inclusiontype==2)
		 * or when a triggerzone is no longer included in an object (inclusiontype==1)
		 * This necessarily comes after a TriggerZoneInclusionEvent
		 * @example
		 * beScript.onStart = function () {
		 *     var actor = this.getActor();
		 *     actor.addObjectListener(STU.TriggerZoneEndInclusionEvent, beScript, 'onTZEndInclusion');
		 * };
		 * 
		 * beScript.onStop = function () {
		 *     var actor = this.getActor();
		 *     actor.removeObjectListener(STU.TriggerZoneEndInclusionEvent, beScript, 'onTZEndInclusion');
		 * };
		 * 
		 * beScript.onTZEndInclusion = function (iEvent) {
		 *     console.log("An inclusion is no longer detected");
		 * };
		 *
		 *
		 * @exports TriggerZoneEndInclusionEvent
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends {EP.Event}
		 * @memberOf STU
		 * @alias STU.TriggerZoneEndInclusionEvent
		 */
		var TriggerZoneEndInclusionEvent = function (iZone, iObject, iInclusionType) {
			Event.call(this);

			/**
			 * The trigger zone involved in the inclusion
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */

			this.zone = (iZone !== undefined ? iZone : null);

			/**
			 * The Actor involved in the inclusion
			 *
			 * @member
			 * @public
			 * @type {STU.Actor}
			 */
			this.object = (iObject !== undefined ? iObject : null);

			/**
			 * The inclusion type :
			 * 3 : TriggerZone is included in object
			 * 2 : Object included in TriggerZone
			 *
			 * @member
			 * @public
			 * @type {number}
			 */
			this.inclusiontype = (iInclusionType !== undefined ? iInclusionType : null);
		};

		TriggerZoneEndInclusionEvent.prototype = new Event();
		TriggerZoneEndInclusionEvent.prototype.constructor = TriggerZoneEndInclusionEvent;
		TriggerZoneEndInclusionEvent.prototype.type = 'TriggerZoneEndInclusionEvent';

		// Expose in STU namespace.
		STU.TriggerZoneEndInclusionEvent = TriggerZoneEndInclusionEvent;

		EventServices.registerEvent(TriggerZoneEndInclusionEvent);


		//////////////////////////////////////////////////////////////////////////
		// TriggerZoneManagerTask
		//////////////////////////////////////////////////////////////////////////
		var TriggerZoneManagerTask = function (iManager) {
			Task.call(this);
			this.name = "TriggerZoneManagerTask";
			this.associatedManager = iManager;
		};

		TriggerZoneManagerTask.prototype = new Task();
		TriggerZoneManagerTask.prototype.constructor = TriggerZoneManagerTask;

		TriggerZoneManagerTask.prototype.onExecute = function (iExContext) {
			this.associatedManager.run();
			return this;
		};

		TriggerZoneManagerTask.prototype.onStart = function () {
			this.associatedManager.onStart();
		};

		TriggerZoneManagerTask.prototype.onStop = function () {
			this.associatedManager.onStop();
		};

		//////////////////////////////////////////////////////////////////////////
		// TriggerZoneManager
		//////////////////////////////////////////////////////////////////////////
		var TriggerZoneManager = function () {

			Manager.call(this);

			this.name = "TriggerZoneManager";

			this.associatedTask;

			this.AllObjects = new Map();
			// INTERACTION_INTERSECTS 1
			// INTERACTION_TZ_INCLUDES_OBJ 2
			// INTERACTION_TZ_ISINCLUDEDIN_OBJ 3
			this.TriggerZoneInteractionsRaw = [];
			this.TriggerZoneInteractionsPropagated = [];
			this.TriggeringObjectParents = [];
			this.TriggeringObjectChildren = [];
			this.IsOKToRun = false;
			this.needToRegisterObjectsLater = false;
			this.bFoundTriggerZoneWithNoObjFilter = false;
		};

		TriggerZoneManager.prototype = new Manager();
		TriggerZoneManager.prototype.constructor = TriggerZoneManager;

		TriggerZoneManager.prototype.onInitialize = function () {

			//var myEnvServices = new StuEnvServices();

			this.MyCPPObj = this.getTriggerZoneManager();
			this.MyCPPObj.__stu__Init(this);

			this.associatedTask = new TriggerZoneManagerTask(this);
			EP.TaskPlayer.addTask(this.associatedTask);

		};

		TriggerZoneManager.prototype.onCurrentSceneChanged = function () {
			if (this._enableScenes) {

				this.IsOKToRun = false;

				// unregister objects
				for (var key of this.AllObjects.keys()) {
					//if (this.AllObjects.hasOwnProperty(key)) {
					var obj = this.AllObjects.get(key);
					if (obj == null || obj == undefined) // unregister triggerZone set the objet to null
						continue;

					if (obj instanceof STU.Actor) {
						if (!obj.isPermanent()) {
							var actor = obj;
							if (actor !== undefined && actor !== null && actor instanceof STU.TriggerZoneActor) { // trigger zone call unregister at deactivate
								//this.unRegisterTriggerZone(parseInt(key));
							} else if (actor !== undefined && actor !== null && actor instanceof STU.Actor3D) {
								this.unRegisterTriggeringObject(parseInt(key));
							}
						}
					} /*else {
							console.error("invalid object registed in Trigger Zone Manager");
						}*/ //LBN9 - objects are not invalid, they are null because of switch of scenes (unregister object set to null). 
					//}
				}

				// register local objects
				this.registerObjects(true);

				var NbTriggerZones = this.MyCPPObj.__stu__GetNbTriggerZones();
				var NbTriggeringObj = this.MyCPPObj.__stu__GetNbTriggeringObjects();
				if (NbTriggeringObj > 0 && NbTriggerZones > 0) {
					this.IsOKToRun = true;
				}
			}
		};

		TriggerZoneManager.prototype.onDispose = function () {
			////console.debug("TZ MANAGER DISPOSE"); 

			EP.TaskPlayer.removeTask(this.associatedTask);
			delete this.associatedTask;

			if (this._enableScenes) {
				EventServices.removeListener(STU.SceneActivateEvent, this._currentSceneChangedCb);
				delete this._currentSceneChangedCb;
			}

			this.AllObjects.clear();

			this.TriggerZoneInteractionsRaw.forEach(function (TZInterractions, index, array) {
				STU.clear(TZInterractions);
			});
			this.TriggerZoneInteractionsPropagated.forEach(function (TZInterractions, index, array) {
				STU.clear(TZInterractions);
			});

			STU.clear(this.TriggerZoneInteractionsRaw);
			STU.clear(this.TriggerZoneInteractionsPropagated);
			STU.clear(this.TriggeringObjectParents);
			this.TriggeringObjectChildren.forEach(function (TOChildren, index, array) {
				STU.clear(TOChildren);
			});
			STU.clear(this.TriggeringObjectChildren);


			this.MyCPPObj.__stu__Dispose();
			this.deleteTriggerZoneManager();//stu__TriggerZoneManager.__stu__DeleteTriggerZoneManager();
		};

		TriggerZoneManager.prototype.registerTriggerZone = function (iActor) {
			if (!(iActor instanceof STU.Actor)) {
				console.error("TriggerZoneManager registerTriggerZone invalid input, actor expected");
				return;
			}
			var visuObject = undefined;
			visuObject = iActor.CATI3DGeoVisu;
			if (visuObject !== undefined && visuObject !== null) {

				var ID = this.MyCPPObj.__stu__RegisterTriggerZone(visuObject);

				// LBN9 - dynamic actor case
				var NbTriggerZones = this.MyCPPObj.__stu__GetNbTriggerZones();
				var NbTriggeringObj = this.MyCPPObj.__stu__GetNbTriggeringObjects();
				if (NbTriggerZones == 1 && NbTriggeringObj == 0 && this.needToRegisterObjectsLater) // 1 because we registered a triggerZone just before
				{
					this.needToRegisterObjectsLater = false;
					this.registerObjects();
				}

				// LBN9 - update boolean which indicates if there is TZ without object filter
				if (!this.bFoundTriggerZoneWithNoObjFilter) {
					var triggerZone = iActor;
					if (triggerZone instanceof STU.TriggerZoneActor && (triggerZone.objectFilter == undefined || triggerZone.objectFilter == null)) {
						this.bFoundTriggerZoneWithNoObjFilter = true;
					}
				}

				// LBN9 - For dynamic actor case, we have to reevaluate IsOkToRun, 
				// IsOkToRun is valuate at start, so there is a problem when there is just dynamic actors in the scene
				if (NbTriggerZones > 0) {
					this.IsOKToRun = true;
				}

				this.AllObjects.set(ID, iActor);
				this.TriggerZoneInteractionsRaw[ID] = [];
				this.TriggerZoneInteractionsPropagated[ID] = [];
				return ID;
			}
			return;
		};


		TriggerZoneManager.prototype.registerTriggeringObject = function (iActor) {
			if (!(iActor instanceof STU.Actor)) {
				console.error("TriggerZoneManager registerTriggeringObject invalid input, actor expected");
				return;
			}

			var ID = -1;
			if (iActor.CATI3DGeoVisu !== undefined && iActor.CATI3DGeoVisu !== null) {
				ID = this.MyCPPObj.__stu__RegisterTriggeringObject(iActor.CATI3DGeoVisu);
			}
			else if (iActor.StuIRepresentation !== undefined && iActor.StuIRepresentation !== null) {
				ID = this.MyCPPObj.__stu__RegisterTriggeringObject(iActor.StuIRepresentation);
			}
			else {
				console.error("TriggerZoneManager registerTriggeringObject invalid input, CATI3DGeoVisu + StuIRepresentation are null or undefined");
				return;
			}

			// LBN9 - For dynamic actor case, we have to reevaluate IsOkToRun, 
			// IsOkToRun is valuate at start, so there is a problem when there is just dynamic actors in the scene
			var NbTriggerZones = this.MyCPPObj.__stu__GetNbTriggerZones();
			if (NbTriggerZones > 0) {
				this.IsOKToRun = true;
			}

			this.AllObjects.set(ID, iActor);
			this.TriggeringObjectParents[ID] = -1;
			this.TriggeringObjectChildren[ID] = [];
			this.computeParentsAndChildren();


			return ID;
		};

		TriggerZoneManager.prototype.unRegisterTriggerZone = function (iID) {
			this.MyCPPObj.__stu__UnRegisterTriggerZone(iID);
			this.AllObjects.delete(iID);
			STU.clear(this.TriggerZoneInteractionsRaw[iID]);
			STU.clear(this.TriggerZoneInteractionsPropagated[iID]);
		};

		TriggerZoneManager.prototype.unRegisterTriggeringObject = function (iID) {
			this.MyCPPObj.__stu__UnRegisterTriggeringObject(iID);
			this.AllObjects.delete(iID);
			this.computeParentsAndChildren();
		};

		TriggerZoneManager.prototype.findObject = function (iObj) {
			for (const [key, value] of this.AllObjects) {
				if (value === iObj) {
					return key;
				}
			}

			return -1;
		}


		TriggerZoneManager.prototype.computeParentsAndChildren = function () {
			STU.clear(this.TriggeringObjectParents);
			this.TriggeringObjectChildren.forEach(function (TOChildren, index) {
				STU.clear(TOChildren);
			});
			STU.clear(this.TriggeringObjectChildren);

			var actors = undefined;
			// compute parents and children		
			if (this._enableScenes) {
				var permanentsActors = STU.Experience.getCurrent().getAllActors();
				var localsActors = STU.Experience.getCurrent().currentScene.getAllActors();
				actors = permanentsActors.concat(localsActors);
			}
			else {
				actors = STU.Experience.getCurrent().getAllActors();
			}
			var actorCount = actors.length;
			var a = 0;
			for (a = 0; a < actorCount; a += 1) {
				var actor = actors[a];
				// DO NOT USE findindex, not supported on IE
				//var ActorID = this.AllObjects.findIndex(item => item === actor);
				var ActorID = this.findObject(actor);
				if (ActorID > 0) {
					this.TriggeringObjectParents[ActorID] = -1;
					var ancestor = actor.getParent();
					if (ancestor !== null && ancestor !== undefined) {
						var AncestorID = this.findObject(ancestor);
						if (AncestorID > 0) {
							this.TriggeringObjectParents[ActorID] = AncestorID;
						}
					}

					this.TriggeringObjectChildren[ActorID] = [];
					var subActors = actor.getSubActors();
					var s;
					var subactorCount = subActors.length;
					for (s = 0; s < subactorCount; s += 1) {
						var subActor = subActors[s];
						var ChildID = this.findObject(subActor);
						if (ChildID > 0) {
							this.TriggeringObjectChildren[ActorID].push(ChildID);
						}
					}
				}
			}
		};

		////////////////
		//// ENTRY /////
		////////////////
		TriggerZoneManager.prototype.onTriggerZoneEntryArray = function (arrayEntry) {
			for (var i = 0; i < arrayEntry.length; i += 2) {
				this.onTriggerZoneEntry(arrayEntry[i], arrayEntry[i + 1]);
			}
		};

		TriggerZoneManager.prototype.onTriggerZoneEntry = function (iIDTriggerZone, iIDTriggering) {
			// save interraction
			this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] = 1;

			// propagate 
			this.checkEntryPropagation(iIDTriggerZone, iIDTriggering);
		};

		TriggerZoneManager.prototype.checkEntryPropagation = function (iIDTriggerZone, iIDTriggering) {
			// propagate only if iIDTriggering was not allready entered through one of its children
			if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] === null || this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] === undefined || this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] === -1) {
				this.propagateTriggerZoneEntry(iIDTriggerZone, iIDTriggering);
			}
		};

		TriggerZoneManager.prototype.propagateTriggerZoneEntry = function (iIDTriggerZone, iIDTriggering) {
			// save interraction
			this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] = 1;

			// 1 create the root Trigger Zone Enter event 
			var e = new STU.TriggerZoneEnterEvent();

			this.findTargetAndSendEvent(e, iIDTriggerZone, iIDTriggering);

			// derrived events to parents of triggering object
			if (this.TriggeringObjectParents[iIDTriggering] !== null && this.TriggeringObjectParents[iIDTriggering] !== undefined && this.TriggeringObjectParents[iIDTriggering] > 0) {
				var IDParent = this.TriggeringObjectParents[iIDTriggering];
				this.checkEntryPropagation(iIDTriggerZone, IDParent);
			}
		};

		///////////////
		//// EXIT /////
		///////////////
		TriggerZoneManager.prototype.onTriggerZoneExitArray = function (arrayExit) {
			for (var i = 0; i < arrayExit.length; i += 2) {
				this.onTriggerZoneExit(arrayExit[i], arrayExit[i + 1]);
			}
		};

		TriggerZoneManager.prototype.onTriggerZoneExit = function (iIDTriggerZone, iIDTriggering) {
			// save interraction
			this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] = -1;

			// propagate 
			this.checkExitPropagation(iIDTriggerZone, iIDTriggering);
		};

		TriggerZoneManager.prototype.checkExitPropagation = function (iIDTriggerZone, iIDTriggering) {
			// propagate only if iIDTriggering was not allready Prop-exited
			if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] !== null && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] !== undefined && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] !== -1) {
				// propagate only if iIDTriggering is Raw-exited
				if (this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] === null || this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] === undefined || this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] === -1) {
					// propagate only if iIDTriggering has all children Prop-exited
					var AllChildrenAreClear = true;
					var childrenCount = this.TriggeringObjectChildren[iIDTriggering].length;
					var c = 0;
					for (c = 0; c < childrenCount; c += 1) {
						var childID = this.TriggeringObjectChildren[iIDTriggering][c];
						if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] !== null && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] !== undefined && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] !== -1) {
							AllChildrenAreClear = false;
						}
					}
					if (AllChildrenAreClear) {
						this.propagateTriggerZoneExit(iIDTriggerZone, iIDTriggering);
					}
				}
			}
		};

		TriggerZoneManager.prototype.propagateTriggerZoneExit = function (iIDTriggerZone, iIDTriggering) {
			// save interraction
			this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] = -1;

			// 1 create the root Trigger Zone Exit event 
			var e = new STU.TriggerZoneExitEvent();

			this.findTargetAndSendEvent(e, iIDTriggerZone, iIDTriggering);

			// derrived events to parents of triggering object 
			if (this.TriggeringObjectParents[iIDTriggering] !== null && this.TriggeringObjectParents[iIDTriggering] !== undefined && this.TriggeringObjectParents[iIDTriggering] > 0) {
				var IDParent = this.TriggeringObjectParents[iIDTriggering];
				this.checkExitPropagation(iIDTriggerZone, IDParent);
			}
		};



		///////////////
		//// INCLUSION
		///////////////
		TriggerZoneManager.prototype.onTriggerZoneInclusionArray = function (arrayInclusion) {
			for (var i = 0; i < arrayInclusion.length; i += 3) {
				this.onTriggerZoneInclusion(arrayInclusion[i], arrayInclusion[i + 1], arrayInclusion[i + 2]);
			}
		};

		TriggerZoneManager.prototype.onTriggerZoneInclusion = function (iIDTriggerZone, iIDTriggering, iInclusionType) {
			// save interraction
			this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] = iInclusionType;

			// propagate 
			this.checkInclusionPropagation(iIDTriggerZone, iIDTriggering, iInclusionType);
		};

		TriggerZoneManager.prototype.checkInclusionPropagation = function (iIDTriggerZone, iIDTriggering, iInclusionType) {
			// propagate only if iIDTriggering was not allready Prop-included
			if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] === null || this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] === undefined || this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] < 2) {
				// propagate only if iIDTriggering is Raw-included
				if (this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] !== null && this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] !== undefined && this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] > 1) {
					// propagate only if iIDTriggering has all children Prop-included

					var AllChildrenAreInInclusion = true;
					var childrenCount = this.TriggeringObjectChildren[iIDTriggering].length;
					var c = 0;
					for (c = 0; c < childrenCount; c += 1) {
						var childID = this.TriggeringObjectChildren[iIDTriggering][c];
						if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] === null || this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] === undefined || this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] < 2) {
							AllChildrenAreInInclusion = false;
						}
					}
				}
				if (AllChildrenAreInInclusion) {
					this.propagateTriggerZoneInclusion(iIDTriggerZone, iIDTriggering, iInclusionType);
				}
			}
		};

		TriggerZoneManager.prototype.propagateTriggerZoneInclusion = function (iIDTriggerZone, iIDTriggering, iInclusionType) {
			// save interraction
			this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] = iInclusionType;

			// 1 create the root Trigger Zone Inclusion event 
			var e = new STU.TriggerZoneInclusionEvent();
			e.inclusiontype = iInclusionType;

			this.findTargetAndSendEvent(e, iIDTriggerZone, iIDTriggering);

			// derrived events to parents of triggering object 
			if (this.TriggeringObjectParents[iIDTriggering] !== null && this.TriggeringObjectParents[iIDTriggering] !== undefined && this.TriggeringObjectParents[iIDTriggering] > 0) {
				var IDParent = this.TriggeringObjectParents[iIDTriggering];
				this.checkInclusionPropagation(iIDTriggerZone, IDParent, iInclusionType);
			}
		};

		///////////////
		//// END INCLUSION
		///////////////
		TriggerZoneManager.prototype.onTriggerZoneEndInclusionArray = function (arrayEndInclusion) {
			for (var i = 0; i < arrayEndInclusion.length; i += 3) {
				this.onTriggerZoneEndInclusion(arrayEndInclusion[i], arrayEndInclusion[i + 1], arrayEndInclusion[i + 2]);
			}
		};

		TriggerZoneManager.prototype.onTriggerZoneEndInclusion = function (iIDTriggerZone, iIDTriggering, iInclusionType) {
			// save interraction
			this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering] = iInclusionType;
			// propagate 
			this.checkEndInclusionPropagation(iIDTriggerZone, iIDTriggering);
		};

		TriggerZoneManager.prototype.checkEndInclusionPropagation = function (iIDTriggerZone, iIDTriggering) {
			// propagate only if iIDTriggering was not allready end-included through one of its children
			if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] !== null && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] !== undefined && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] > 1) {

				// my new interaction is : "none" if my raw interraction is "none" and all of my children are "none"
				// intersect otherwise
				var RemainingInteraction = -1;
				var AllChildrenAreClear = true;
				var childrenCount = this.TriggeringObjectChildren[iIDTriggering].length;
				var c = 0;
				for (c = 0; c < childrenCount; c += 1) {
					var childID = this.TriggeringObjectChildren[iIDTriggering][c];
					if (this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] !== null && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] !== undefined && this.TriggerZoneInteractionsPropagated[iIDTriggerZone][childID] !== -1) {
						AllChildrenAreClear = false;
					}
				}
				if (AllChildrenAreClear) {
					RemainingInteraction = this.TriggerZoneInteractionsRaw[iIDTriggerZone][iIDTriggering];
				}
				else {
					RemainingInteraction = 1;
				}
				this.propagateTriggerZoneEndInclusion(iIDTriggerZone, iIDTriggering, RemainingInteraction);
			}
		};
		TriggerZoneManager.prototype.propagateTriggerZoneEndInclusion = function (iIDTriggerZone, iIDTriggering, iRemainingInteraction) {
			// save interraction
			this.TriggerZoneInteractionsPropagated[iIDTriggerZone][iIDTriggering] = iRemainingInteraction;

			// create the root Trigger Zone End Inclusion event 
			var e = new STU.TriggerZoneEndInclusionEvent();
			e.inclusiontype = iRemainingInteraction;

			this.findTargetAndSendEvent(e, iIDTriggerZone, iIDTriggering);

			// derrived events to parents of triggering object 
			if (this.TriggeringObjectParents[iIDTriggering] !== null && this.TriggeringObjectParents[iIDTriggering] !== undefined && this.TriggeringObjectParents[iIDTriggering] > 0) {
				var IDParent = this.TriggeringObjectParents[iIDTriggering];
				this.checkEndInclusionPropagation(iIDTriggerZone, IDParent);
			}
		};

		TriggerZoneManager.prototype.findTargetAndSendEvent = function (event, iIDTriggerZone, iIDTriggering) {
			event.zone = this.AllObjects.get(iIDTriggerZone);
			event.object = this.AllObjects.get(iIDTriggering);

			// find event target 
			var eTarget = null;
			if (event.zone instanceof STU.Actor) {
				eTarget = event.zone.eventTarget;
			}
			if (eTarget === undefined || eTarget === null) {
				eTarget = event.zone;
			}
			// send event
			var sendIt = false;
			if (event.zone.objectFilter === undefined || event.zone.objectFilter === null) {
				sendIt = true;

			}
			else if (event.zone.objectFilter instanceof STU.Collection) {
				for (var i = 0; i < event.zone.objectFilter.getObjectCount(); i++) {
					var objectInCollec = event.zone.objectFilter.getObjectAt(i);
					if (objectInCollec instanceof STU.Actor && objectInCollec === event.object) {
						sendIt = true;
					}
				}
			}
			else if (event.zone.objectFilter instanceof STU.Actor && event.zone.objectFilter === event.object) {
				sendIt = true;
			}
			if (sendIt) {
				eTarget.dispatchEvent(event, true);
				if (eTarget !== event.zone) {
					this._sendTZEvent(event, event.zone);
				}
			}
		}



		TriggerZoneManager.prototype.run = function () {
			if (this.IsOKToRun === true) {
				this.MyCPPObj.__stu__Run();
			}
		};

		TriggerZoneManager.prototype.onStart = function () {
			// if some registered trigger zone react with all object of the experience
			// parse the it, and retrieve all triggering objects

			// IBS ONSTART/ONSTOP : je met �a onStart / onStop
			// IBS FEATURIZE TRIGGERZONES : les TZ se register toutes seules 
			EventServices.addObjectListener(STU.DynamicActorCreatedEvent, this, 'onDynamicActorCreated');

			this._enableScenes = false;

			var currScene = STU.Experience.getCurrent().currentScene;
			if (currScene != undefined && currScene != null)
				this._enableScenes = true;

			if (this._enableScenes) {
				this._currentSceneChangedCb = STU.makeListener(this, 'onCurrentSceneChanged');
				EventServices.addListener(STU.SceneActivateEvent, this._currentSceneChangedCb);
			}

			this.registerObjects();

			var NbTriggerZones = this.MyCPPObj.__stu__GetNbTriggerZones();
			var NbTriggeringObj = this.MyCPPObj.__stu__GetNbTriggeringObjects();
			if (NbTriggeringObj > 0 && NbTriggerZones > 0) {
				this.IsOKToRun = true;
			}

		};

		TriggerZoneManager.prototype.onDynamicActorCreated = function (iEvent) {
			var actor = iEvent.instance;
			if (actor !== undefined && actor !== null && !(actor instanceof STU.TriggerZoneActor)) {
				if (this.bFoundTriggerZoneWithNoObjFilter) { // LBN9 - there is a trigger zone without object filter, so we have to register all actors
					this.registerTriggeringObject(actor);
				}
			}
		};

		TriggerZoneManager.prototype.registerObjects = function (localsObjectsOnly = false) {

			var actors = STU.Experience.getCurrent().getAllActors();

			var actorCount = actors.length;

			// IBS : si TOUTES les TZ definissent un objectFilter : seuls les objets de la scene
			// faisant partie d'un de ces objectFilter doivent etre registered
			var ObjectsInTZFilter = new Array();
			for (var a = 0; a < actorCount; a += 1) {
				var triggerZone = actors[a];
				if (triggerZone !== undefined && triggerZone !== null && triggerZone instanceof STU.TriggerZoneActor) {

					if (triggerZone.objectFilter !== undefined && triggerZone.objectFilter !== null) {
						if (triggerZone.objectFilter instanceof STU.Collection) {
							for (var i = 0; i < triggerZone.objectFilter.getObjectCount(); i++) {
								var objectInCollec = triggerZone.objectFilter.getObjectAt(i);
								if (objectInCollec instanceof STU.Actor) {
									if (!ObjectsInTZFilter.includes(objectInCollec)) {
										ObjectsInTZFilter.push(objectInCollec);
									}
								}
							}
						}
						else if (triggerZone.objectFilter instanceof STU.Actor) {
							if (!ObjectsInTZFilter.includes(triggerZone.objectFilter)) {
								ObjectsInTZFilter.push(triggerZone.objectFilter);
							}
						}
						else {
							this.bFoundTriggerZoneWithNoObjFilter = true;
							break;
						}
					}
					else {
						this.bFoundTriggerZoneWithNoObjFilter = true;
						break;
					}
				}//  if (triggerZone !== undefined
			}//  for (a = 0

			if (!this.bFoundTriggerZoneWithNoObjFilter) {
				actors = ObjectsInTZFilter;
			}


			// TJR: implementation of an optimisation used in the Summer Project 2015
			// allowing to filter actors that participate to Trigger Zones with a specific
			// behavior
			// TODO: plan to deliver that officially one day !
			var filteredActors = new Array();
			actorCount = actors.length;
			for (a = 0; a < actorCount; a += 1) {
				if (actors[a].TriggerZoneOptimFilter !== undefined) {
					filteredActors.push(actors[a]);
				}
			}
			if (filteredActors.length != 0) {
				actors = filteredActors;
			}

			actorCount = actors.length;
			if (actorCount == 0)
				this.needToRegisterObjectsLater = true; // LBN9 - if there is just dynamic actor, at the start, TO aren't register

			for (a = 0; a < actorCount; a += 1) {
				var actor = actors[a];

				if (actor !== undefined && actor !== null && actor instanceof STU.TriggerZoneActor) {
					// les trigger zones se register toutes seules
				}
				// IBS ajoute test sur Text2DActor : les Text2DActor derrivent de Actor3D (pour le moment) mais on en veut pas pour les TZ
				else if (actor !== undefined && actor !== null && actor instanceof STU.Actor3D) {
					if ((localsObjectsOnly && !actor.isPermanent()) || !localsObjectsOnly) {
						this.registerTriggeringObject(actor);
					}

				}
			}
		};

		TriggerZoneManager.prototype.onStop = function () {
			for (var key of this.AllObjects.keys()) {
				//if (this.AllObjects.hasOwnProperty(key)) {
				var obj = this.AllObjects.get(key);
				if (obj !== undefined && obj !== null && obj instanceof STU.Actor) {
					var actor = obj;
					if (actor !== undefined && actor !== null && actor instanceof STU.TriggerZoneActor) {
						//this.unRegisterTriggerZone(parseInt(key));
					} else if (actor !== undefined && actor !== null && actor instanceof STU.Actor3D) {
						this.unRegisterTriggeringObject(parseInt(key));
					}
				} /*else {
						console.error("invalid object registed in Trigger Zone Manager");
					}*/ //LBN9 - objects are not invalid, they are null because of switch of scenes (unregister object set to null).
				//}
			}


			EventServices.removeObjectListener(STU.DynamicActorCreatedEvent, this, 'onDynamicActorCreated');
		};

		TriggerZoneManager.prototype._sendTZEvent = function (iTZEvent, iActor) {
			if (iActor !== undefined && iActor !== null && iTZEvent !== undefined && iTZEvent !== null) {
				//iTZEvent.setActor(iActor);

				iActor.dispatchEvent(iTZEvent);
			}
		};



		/*TriggerZoneManager.prototype.dumpTriggeringObjectParents = function () {
			this.TriggeringObjectParents.forEach(function (parents, indexTO) {
				if (parents !== null && parents !== undefined) {
					console.log(indexTO + " TO parent :");
					console.log(parents);
				}
			});
		};
	
		TriggerZoneManager.prototype.dumpTriggeringObjectChildren = function () {
			this.TriggeringObjectChildren.forEach(function (children, indexTO) {
				if (children !== null && children !== undefined) {
					console.log(indexTO + " TO children :");
					console.log(children);
				}
			});
		};
		TriggerZoneManager.prototype.dumpTriggerZoneInteractions = function () {
			console.log("RAW interactions");
			this.TriggerZoneInteractionsRaw.forEach(function (TZInterractions, indexTZ) {
				if (TZInterractions !== null && TZInterractions !== undefined) {
	
					TZInterractions.forEach(function (interraction, indexTO) {
	
						if (interraction !== null && interraction !== undefined) {
	
							if (interraction === 1) {
								console.log("TZ " + indexTZ + " - TO " + indexTO + " : INTERSECT");
							}
							else if (interraction === 2) {
								console.log("TZ " + indexTZ + " - TO " + indexTO + " : INCLUSION");
							}
							else {
								console.log("TZ " + indexTZ + " - TO " + indexTO + " : NONE");
							}
						}
					});
				}
			});
	
			console.log("PROP interactions");
			this.TriggerZoneInteractionsPropagated.forEach(function (TZInterractions, indexTZ) {
				if (TZInterractions !== null && TZInterractions !== undefined) {
	
					TZInterractions.forEach(function (interraction, indexTO) {
	
						if (interraction !== null && interraction !== undefined) {
	
							if (interraction === 1) {
								console.log("TZ " + indexTZ + " - TO " + indexTO + " : INTERSECT");
							}
							else if (interraction === 2) {
								console.log("TZ " + indexTZ + " - TO " + indexTO + " : INCLUSION");
							}
							else {
								console.log("TZ " + indexTZ + " - TO " + indexTO + " : NONE");
							}
						}
					});
				}
			});
		};*/


		STU.registerManager(TriggerZoneManager);

		// Expose in STU namespace.
		STU.TriggerZoneManager = TriggerZoneManager;

		return TriggerZoneManager;
	});

define('StuTriggerZones/StuTriggerZoneManager', ['DS/StuTriggerZones/StuTriggerZoneManager'], function (TriggerZoneManager) {
	'use strict';

	return TriggerZoneManager;
});
