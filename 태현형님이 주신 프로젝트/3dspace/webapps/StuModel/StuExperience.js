/*
* @quickReview IBS 21:06:23  getResources getResourceByName getResourcesByType now handle materials
* @quickReview IBS 21:02:17 revue API js Variants (private)
* @quickReview IBS 20:10:29 Support play pour variants (Init, Dispose, updateActivity VariantSets)
* @quickreview IBS 18:04:10 correction setActiveLocation
* @quickreview IBS 18:01:11 gestion GetActiveEnvironment coté JS sans appel aux bindings
*/

define('DS/StuModel/StuExperience', [
	'DS/StuCore/StuContext',
	'DS/StuModel/StuInstance',
	'DS/StuCore/StuEnvServices',
	'DS/StuModel/StuExperienceActivateEvent',
	'DS/StuModel/StuExperienceDeactivateEvent',
	'DS/StuModel/StuActorTemplate'
],
	function (STU, Instance, StuEnvServices) {
		'use strict';

		/**
			* Experience is the root object of Creative Experience objects. It is composed of Actors.
			*
			* @exports Experience
			* @class
			* @constructor
			* @noinstancector 
			* @public
			* @extends STU.Instance
			* @memberof STU
			* @alias STU.Experience
			*/
		var Experience = function () {

			Instance.call(this);

			this.CATI3DExperienceObject;

			this.name = 'Experience';

			/**
				*  gravity used in physical motion
				*
				* @member
				* @instance
				* @name gravity
				* @private
				* @type {number}
				* @default {9.81}
				* @memberOf STU.PhysicManager
				*/
			Object.defineProperty(this, "gravity", {
				enumerable: true,
				configurable: true,
				get: function () {
					var settings = this.PlaySettings;
					if (settings !== undefined && settings !== null) {
						var gravity = settings.gravity;
						if (gravity !== undefined && gravity !== null) {
							return gravity;
						}
					}
					return 0.0;
				},
				set: function (value) {
					var settings = this.PlaySettings;
					if (settings !== undefined && settings !== null) {
						settings.gravity = value;
					}

					var PhysManager = STU.PhysicManager.getInstance();
					if (PhysManager !== null && PhysManager !== undefined) {
						PhysManager.DynPhysicalWorld.SetGravity(0, 0, value * 1000);
					}
				}
			});

			/**
			* This is the collection of Scenarios (whether active or inactive) participating in the experience. 
			*
			* @member
			* @private
			* @type {Array.<STU.Scenario>}
			*/
			this.scenarios = [];

			/**  
			* The start-up scenario is the scenario that will be used as active scenario when the experience starts.
			*
			* @member
			* @private
			* @type {STU.Scenario}
			*/
			this.startupScenario = null;
			/**
			* This is the list of Collections of the experience.        
			*
			* @member
			* @private
			* @type {Array.<STU.Collection>}
			*/
			this.collections = [];

			/**
			* This is the list of actors of the experience.         
			*
			* @member
			* @private
			* @type {Array.<STU.Actor>}
			*/
			this.actors = [];

			/**  
			* The start-up camera is the camera that will be used as current camera when the experience starts.
			*
			* @member
			* @private
			* @type {STU.Camera}
			*/
			this.startupCamera = null;

			/**
			* This is the list of resources of the experience.      
			*
			* @member
			* @private
			* @type {Array.<STU.Resource>}
			*/
			this.resources = [];

			/**
			* This is the list of materials of the experience.
			* Making sure this property is initialized, because experience
			* that do not have materials are not projecting this property
			* and thus functions that use it are failing (IR-901343)
			*
			* @member
			* @private
			* @type {Array.<STU.Material>}
			*/
			this.materials = [];


			/**
			* This is the previous current scene.
		    * Used for send event from STU.Scene
			*
			* @member
			* @private
			* @type {STU.Scene}
			*/
			this._previousScene = null;

			/**
			* This is the list of scenes of the experience.
			*
			* @member
			* @private
			* @type {Array.<STU.Scene>}
			*/
			this.scenes = [];

			/**
			* The scene defined as current in the experience properties.
			*
			* @member
			* @private
			* @type {STU.Scene}
			*/
			if (!STU.isEKIntegrationActive()) {
				Object.defineProperty(this, "currentScene", {
					enumerable: true,
					configurable: true,
					get: function () {
						if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
							var scene = this.CATI3DExperienceObject.GetValueByName("currentScene");
							return scene;
						}
					},
					set: function (value) {
						if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
							if (!value || value instanceof STU.Scene) {
								this.CATI3DExperienceObject.SetValueByName("currentScene", value);
							}
						}
					}
				});
			}


			/**
			* The camera defined as current in the experience properties.       
			*
			* @member
			* @private
			* @type {STU.Camera}
			*/
			//this.currentCamera = null;
			if (!STU.isEKIntegrationActive()) {
				Object.defineProperty(this, "currentCamera", {
					enumerable: true,
					configurable: true,
					get: function () {
						if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
							var camera = this.CATI3DExperienceObject.GetValueByName("currentCamera");
							return camera;
						}
					},
					set: function (value) {
						if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
							if (!value || value instanceof STU.Camera) {
								this.CATI3DExperienceObject.SetValueByName("currentCamera", value);
							}
						}
					}
				});
			}

			/**
			* The environment defined as current in the experience properties.      
			*
			* @member
			* @private
			* @type {STU.Environment}
			*/			
			if (!STU.isEKIntegrationActive()) {
				Object.defineProperty(this, "currentEnvironment", {
					enumerable: true,
					configurable: true,
					get: function () {
						if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
							var env = this.CATI3DExperienceObject.GetValueByName("currentEnvironment");
							return env;
						}						
					},
					set: function (value) {
						if (this.CATI3DExperienceObject !== undefined && this.CATI3DExperienceObject !== null) {
							if (!value || value instanceof STU.Environment) {
								this.CATI3DExperienceObject.SetValueByName("currentEnvironment", value);
							}
						}						
					}
				});
			}

			/**
			* The location defined as current in the experience properties.         
			*
			* @member
			* @private
			* @type {STU.Location}
			*/
			//this.currentLocation = null;
		};

		var current;

		/**
			* Return the only one active Experience.
			* It's a static method, use it on the STU.Experience constructor object.
			*
			* @method
			* @public
			* @static
			* @return {STU.Experience} instance object corresponding to the current experience
			*/
		Experience.getCurrent = function () {
			return current;
		};

		Experience.prototype = new Instance();
		Experience.prototype.constructor = Experience;
		Experience.prototype.protoId = 'B1E017D2-FB6E-41C6-9865-6C3BF4E6218E';
		Experience.prototype.featureCatalog = 'StudioModel.feat';
		Experience.prototype.featureStartup = 'StuScene_Spec';

		/**
			* Return undefined because STU.Experience has no parent.
			*
			* @method
			* @override
			* @private
			*/
		Experience.prototype.getParent;

		/**
			* Return undefined because STU.Experience has no parent.
			*
			* @method
			* @override
			* @private
			*/
		Experience.prototype.findParent;

		/**
		* Function to call when currentScene is changed
		*
		* @method
		* @private
		* @param {STU.Scene} iPreviousScene
		* @param {STU.Scene} iCurrentScene
		*/
		Experience.prototype.handlePreviousSceneSwitch = function (iPreviousScene) {

			this._previousScene = iPreviousScene;

			if (iPreviousScene != undefined && iPreviousScene != null) {
				if (iPreviousScene._rebuildPlay == false) {
					try {
						iPreviousScene.deactivate();
					} catch (e) {
						var error_msg = "Issue with deactivation of the previous scene : " + iPreviousScene.name;
						error_msg += (e.message !== undefined && e.message !== null ? e.message : "<undefined error>")
						error_msg += (e.line !== undefined && e.line !== null ? e.line : "")
						console.error(error_msg);
					}
				}
				//Reset case : we dispose the previous scene, the init of the current scene is made before, and we active the current 
				else {
					try {
						iPreviousScene.deactivate();
						iPreviousScene.dispose();
					} catch (e) {
						var error_msg = "Issue with deactivation of the previous scene : " + iPreviousScene.name;
						error_msg += (e.message !== undefined && e.message !== null ? e.message : "<undefined error>")
						error_msg += (e.line !== undefined && e.line !== null ? e.line : "")
						console.error(error_msg);
					}
				}
			}
		};

		Experience.prototype.handleNewSceneSwitch = function (iCurrentScene) {

			// on all cases, we activate the current scene 
			if (iCurrentScene != undefined && iCurrentScene != null) {
				try {
					iCurrentScene.initialize();
					iCurrentScene.activateJS(true);
					
				} catch (e) {
					var error_msg = "Issue with activation of the current scene : " + iCurrentScene.name;
					error_msg += (e.message !== undefined && e.message !== null ? e.message : "<undefined error>")
					error_msg += (e.line !== undefined && e.line !== null ? e.line : "")
					console.error(error_msg);
				}
			}
		};

		/**
			* Add a STU.Collection on this STU.Experience
			*
			* @method
			* @private
			* @param {STU.Collection} iCollection instance object corresponding to the Collection to add
			* @see STU.Experience#removeCollection
			* @see STU.Experience#getCollections
			* @see STU.Experience#getCollectionByName
			*/
		Experience.prototype.addCollection = function (iCollection) {
			STU.pushUnique(this.collections, iCollection);
			iCollection.setParent(this);
		};

		/**
			* Remove a STU.Collection on this STU.Experience
			*
			* @method
			* @private
			* @param {STU.Collection} iCollection instance object corresponding to the Collection to remove
			* @see STU.Experience#addCollection
			* @see STU.Experience#getCollections
			* @see STU.Experience#getCollectionByName
			*/
		Experience.prototype.removeCollection = function (iCollection) {
			iCollection.setParent();
			STU.remove(this.collections, iCollection);
		};

		/**
			* Return an array listing the Collections of this STU.Experience.
			* The returned array is a copy of the internal Collections list. 
			* Do not expect to modify it to add a STU.Collection.
			*
			* @method
			* @public
			* @return {Array.<STU.Collection>} Array of STU.Collection instance object
			* @see STU.Experience#getCollectionByName
			*/
		Experience.prototype.getCollections = function () {
			if (this._enableScenes) {
				var collectionsScenes = this.currentScene.collections.slice();
				collectionsScenes = collectionsScenes.concat(this.collections);
				return collectionsScenes.slice();
			}

			return this.collections.slice(0);
		};

		/**
		* Find a STU.Collection, with a specific name, in the Collections list of this STU.Experience.
		*
		* @method
		* @public
		* @param {string} iName corresponding to the actor name
		* @return {STU.Collection} instance object corresponding to the found Collection
		* @see STU.Experience#getCollections
		*/
		Experience.prototype.getCollectionByName = function (iName) {

			if (this._enableScenes) {
				var collectionScenes = this.currentScene.collections.slice();

				for (var i = 0; i < collectionScenes.length; i++) {
					var collectionScene = collectionScenes[i];
					if (collectionScene !== undefined) {
						if (iName === collectionScene.name) {
							return collectionScene;
						}
					}
				}
			}

			var count = this.collections.length;
			for (var i = 0; i < count; i++) {
				var collection = this.collections[i];
				if (collection !== undefined) {
					if (iName === collection.name) {
						return collection;
					}
				}
			}
			return;
		};

		/**
			* Return an array listing the Scenarios of this STU.Experience.
			* The returned array is a copy of the internal Scenarios list. 
			* Do not expect to modify it to add a STU.Scenario.
			*
			* @method
			* @private
			* @return {Array.<STU.Scenario>} Array of STU.Scenario instance object
			*/
		Experience.prototype.getScenarios = function () {
			if (this._enableScenes) {
				var scenarioScene = []
				scenarioScene = scenarioScene.concat(this.currentScene.scenario);
				scenarioScene = scenarioScene.concat(this.scenarios);
				return scenarioScene.slice();
			}

			return this.scenarios.slice(0);
		};

		/**
			* Add a STU.Actor on this STU.Experience.
			*
			* @method
			* @private
			* @param {STU.Actor} iActor instance object corresponding to the actor to add
			*/
		Experience.prototype.addActor = function (iActor) {
			STU.pushUnique(this.actors, iActor);
			iActor.setParent(this);
			iActor.initialize();
			iActor.activate(true);
		};

		/**
			* Add a STU.Actor on this STU.Experience.
			*
			* @method
			* @private
			* @param {STU.Actor} iActor instance object corresponding to the actor to remove
			*/
		Experience.prototype.removeActor = function (iActor) {
			iActor.deactivate();
			iActor.dispose();
			iActor.setParent();
			STU.remove(this.actors, iActor);
		};

		/**
			* Return an array listing the root actors of this STU.Experience.
			* The returned array is a copy of the internal actors list. 
			* Do not expect to modify it to add or remove a STU.Actor.
			*
			* @method
			* @public
			* @return {Array.<STU.Actor>} Array of STU.Actor instance object
			*/
		Experience.prototype.getActors = function () {
			if (this._enableScenes) {
				var actorsScene = this.currentScene.actors.slice();
				actorsScene = actorsScene.concat(this.actors);
				return actorsScene.slice();
			}

			return this.actors.slice(0);
		};

		/**
		* Return an array listing all the actors of this STU.Experience.
		* The returned array is a copy of the internal actors list. 
		* Do not expect to modify it to add or remove a STU.Actor.
		*
		* @method
		* @public
		* @return {Array.<STU.Actor>} Array of STU.Actor instance object
		*/
		Experience.prototype.getAllActors = function () {

			var allActors = [];

			if (this._enableScenes) {
				var rootActorsScene = this.currentScene.actors.slice();

				allActors = allActors.concat(rootActorsScene);
				var actorCountScene = rootActorsScene.length;
				for (var i = 0; i < actorCountScene; ++i) {
					var actorScene = rootActorsScene[i];
					allActors = allActors.concat(actorScene.getAllSubActors());
				}
			}

			var rootActorsExp = this.actors.slice(0);
			allActors = allActors.concat(rootActorsExp);
			var actorCount = rootActorsExp.length;
			for (var i = 0; i < actorCount; ++i) {
				var actorExp = rootActorsExp[i];
				allActors = allActors.concat(actorExp.getAllSubActors());
			}

			return allActors;
		};


		/**
			* Find a STU.Actor, with a specific name, in the actors list of this STU.Experience.
			* You can check the whole hierarchy with the iRecursive input.
		    * With the iRecursive parameter set to true, in case multiple actors have the same name, it returns only the first found.
			* 
			* @method
			* @public
			* @param {string} iName corresponding to the actor name
			* @param {boolean} [iRecursive] if you want to check the whole hierarchy
			* @return {STU.Actor} instance object corresponding to the found actor
			*/
		Experience.prototype.getActorByName = function (iName, iRecursive) {
			// search in curretn scene actors
			if (this._enableScenes) {
				var actorsScenes = this.currentScene.actors.slice();
				var count = actorsScenes.length;
				for (var i = 0; i < count; i++) {
					var actor = actorsScenes[i];
					if (actor !== undefined) {
						if (iName === actor.name) {
							return actor;
						}
						else if (iRecursive) {
							var resActor = actor.getSubActorByName(iName, iRecursive);
							if (resActor !== undefined) {
								return resActor;
							}
						}
					}
				}
			}

			var count = this.actors.length;
			for (var i = 0; i < count; i++) {
				var actor = this.actors[i];
				if (actor !== undefined) {
					if (iName === actor.name) {
						return actor;
					}
					else if (iRecursive) {
						var resActor = actor.getSubActorByName(iName, iRecursive);
						if (resActor !== undefined) {
							return resActor;
						}
					}
				}
			}


			return;
		};

		/**
			* Return all actors from a given type, or inheriting from that type.
			*
			* By default it only searches in first level of actor hierarchy.
			* You can check the whole hierarchy with the iRecursive input.
			*
			* Example:
			*      var actors = myExperience.getActorsByType(STU.Camera, true);
			*
			* @method
			* @public
			* @param {STU.Actor} iType constructor function corresponding to the asked actor type.
			* @param {boolean} [iRecursive] if you want to check the whole hierarchy
			* @return {Array.<STU.Actor>} instance object corresponding to the found actor
			*/
		Experience.prototype.getActorsByType = function (iType, iRecursive) {

			var inputArray = iRecursive ? this.getAllActors() : this.getActors();

			var outputArray = [];
			var count = inputArray.length;
			for (var i = 0; i < count; i++) {
				var actor = inputArray[i];
				if (actor !== undefined) {
					if (actor instanceof iType) {
						outputArray.push(actor);
					}
				}
			}
			return outputArray;
		};

		/**
			* Return all behaviors from a given type, or inheriting from that type.    
			*
			* Example:
			*      var motionBehaviors = myExperience.getAllBehaviorsByType(STU.Motion);
			*      var motionBehaviors = myExperience.getAllBehaviorsByType(STU.Scripts.MyUserScript);
			*
			* @method
			* @public
			* @param {STU.Behavior} iType constructor function corresponding to the asked behavior type.
			* @return {Array.<STU.Behavior>} array of matching behaviors
			*/
		Experience.prototype.getAllBehaviorsByType = function (iType) {

			var inputArray = this.getAllActors();

			var outputArray = [];
			var count = inputArray.length;
			for (var i = 0; i < count; i++) {
				var actor = inputArray[i];
				if (actor !== undefined) {

					var be = actor.getBehaviorByType(iType);
					if (be !== undefined && be !== null) {
						outputArray.push(be);
					}
				}
			}
			return outputArray;
		};

		/**
			* Return an array listing the resources (sounds, images, materials) of this STU.Experience.
			* The returned array is a copy of the internal resources list. 
			* Do not expect to modify it to add or remove a STU.Resource.
			*
			* @method
			* @public
			* @return {Array.<STU.Resource>} Array of STU.Resource instance object
			*/
		Experience.prototype.getResources = function () {
            return this.resources.slice(0).concat(this.materials.slice(0));
		};

		/**
			* Find a list of STU.Resource, with a specific Name, in the resources list of this STU.Experience.
			*
			* @method
			* @public
			* @param {string} iName name of the resource
			* @param {STU.SoundResource | STU.PictureResource | STU.Material} [iType]
			* @return {STU.Resource} The resource object if found, undefined otherwise.
            * (images and sounds are examined first, then materials if no matching image or sound is found)
			*/
		Experience.prototype.getResourceByName = function (iName, iType) {
			var count = this.resources.length;
			for (var i = 0; i < count; i++) {
				var rsc = this.resources[i];
				if (rsc !== undefined) {
					if (iName === rsc.name) {
						if (iType !== undefined) {
							if (rsc instanceof iType) {
								return rsc;
							}
						} else {
							return rsc;
						}
					}
				}
            }

            var matCount = this.materials.length;
            for (var j = 0; j < matCount; j++) {
                var mat = this.materials[j];
                if (mat !== undefined) {
                    if (iName === mat.name) {
                        if (iType !== undefined) {
                            if (mat instanceof iType) {
                                return mat;
                            }
                        } else {
                            return mat;
                        }
                    }
                }
            }
			return;
		};

		/**
			* Find a list of STU.Resource, with a specific Type, in the resources list of this STU.Experience.
			*
			* @method
			* @public
			* @param {STU.SoundResource | STU.PictureResource | STU.Material} iType
			* @return {Array.<STU.Resource>} Array of STU.Resource instance object
			*/
		Experience.prototype.getResourcesByType = function (iType) {
			var oRscAry = null;
			var count = this.resources.length;
			for (var i = 0; i < count; i++) {
				var rsc = this.resources[i];
				if (rsc !== undefined) {
					if (rsc instanceof iType) {
						if (null === oRscAry) {
							oRscAry = [];
						}
						oRscAry.push(rsc);
					}
				}
            }

            var matCount = this.materials.length;
            for (var j = 0; j < matCount; j++) {
                var mat = this.materials[j];
                if (mat !== undefined) {
                    if (mat instanceof iType) {
                        if (null === oRscAry) {
                            oRscAry = [];
                        }
                        oRscAry.push(mat);
                    }
                }
            }
			return oRscAry;
		};

		/**
			* Return the startup camera.
			* The startup camera will be used as current camera when the experience starts.
			*
			* @method
			* @private
			* @return {STU.Camera} instance object corresponding to the camera
			*/
		Experience.prototype.getStartupCamera = function () {
			//ASO4: startup camera is no more defined on playsetting object but directly on the experience
			//return this.PlaySettings.startupCamera;
			return this.startupCamera;
		};

		/**
			* Find the first template, with a specific Name, in the template list of this STU.Experience 
			*
			* @method
			* @public
			* @param {string} iName name of the template
			* @return {STU.ActorTemplate}
			*/
		Experience.prototype.getActorTemplateByName = function (iName) {
			var count = this.localTemplates.length;
			for (var i = 0; i < count; i++) {
				var tmpl = this.localTemplates[i];
				if (tmpl.name === iName) {
					return tmpl;
				}
			}
			return;
		};

		/**
			* Process to execute when this STU.Experience is initializing. 
			*
			* @method
			* @private
			* @param {string} iName name of the template
			*/
		Experience.prototype.getActorTemplateByReference = function (iTemplate) {
			var count = this.localTemplates.length;
			for (var i = 0; i < count; i++) {
				var tmpl = this.localTemplates[i];
				if (tmpl === iTemplate) {
					return tmpl;
				}
			}
			return;
		};

		/**
			* Return an array listing the STU.ActorTemplate of this STU.Experience.
			* The returned array is a copy of the internal template list filtered only with actor. 
			* Do not expect to modify it by adding or removing a STU.ActorTemplate.
			*
			* @method
			* @public
			* @return {Array.<STU.ActorTemplate>} Array of STU.ActorTemplate instance object
			*/
		Experience.prototype.getActorTemplates = function () {
			var toReturn = [];
			for (var i = 0; i < this.localTemplates.length; i++) {
				if (this.localTemplates[i] instanceof STU.ActorTemplate) {
					toReturn.push(this.localTemplates[i]);
				}
			}
			return toReturn.slice();
		};


		/**
		* Return an array listing all the environments of this STU.Experience.
		* The returned array is a copy of the internal environments list. 
		* Do not expect to modify it to add or remove a STU.Environment.
		*  
		* @method
		* @public
		* @return {Array.<STU.Environment>} environments
		*/
		Experience.prototype.getEnvironments = function () {
			var CurrentExperience = STU.Experience.getCurrent();
			var ExpEnvs = CurrentExperience.environments;
			return ExpEnvs;
		}

		/**
		* Get the first environment with a specific name in the environments list of this STU.Experience 
		*  
		* @method
		* @public
		* @param {string} iName the name of the environment from the current experience to find
		* @return {STU.Environment} environment, null if no environment is found with given name
		*/
		Experience.prototype.getEnvironmentByName = function (iName) {
			var ExpEnvs = this.environments;
			if (ExpEnvs !== undefined && ExpEnvs !== null && ExpEnvs.length > 0) {
				var NbEnvs = ExpEnvs.length;

				for (var i = 0; i < NbEnvs; i++) {
					var Env = ExpEnvs[i];
					if (Env._varName === iName) {
						return Env;
					}
				}
			}
			return null;
		};


		/**
			* Find a list of STU.Environment, with a specific Type, in the environments list of this STU.Experience.
			*
			* @method
			* @public
			* @param {STU.Planets | STU.Ambience} iType
			* @return {Array.<STU.Environment>} Array of STU.Environment instance object
			*/
		Experience.prototype.getEnvironmentsByType = function (iType) {

			var ExpEnvs = this.environments;
			var oEnvAray = [];
			var count = ExpEnvs.length;
			for (var i = 0; i < count; i++) {
				var env = ExpEnvs[i];
				if (env !== undefined) {
					if (env instanceof iType) {
						oEnvAray.push(env);
					}
				}
			}
			return oEnvAray;
		};

		/**
		* get the active environment
		*  
		* @method
		* @private
		* @return {STU.Environment} environment, null if no active environment is found
		*/
		Experience.prototype.getActiveEnvironment = function () {			
			return this.currentEnvironment;
		};
		/**
		* set the active environment
		*  
		* @method
		* @private
		* @param {STU.Environment} iNewActiveEnv the environment from the current experience to activate
		*/
		Experience.prototype.setActiveEnvironment = function (iNewActiveEnv) {			
			this.currentEnvironment = iNewActiveEnv;
		};


		/**
		* get the active location
		*  
		* @method
		* @private
		* @return {STU.Location} location, null if no active location is found
		*/
		Experience.prototype.getActiveLocation = function () {
			return STU.RenderManager.getInstance().getEnvsManager().getActiveLocation();
		};
		/**
		* set the active location
		*  
		* @method
		* @private
		* @param {STU.Location} iNewActiveLoc the environment from the current experience to activate
		*/
		Experience.prototype.setActiveLocation = function (iNewActiveLoc) {
			return STU.RenderManager.getInstance().getEnvsManager().activateLocation(iNewActiveLoc);
		};

		/**
		* Return an array listing all the scenes of this STU.Experience.
		* The returned array is a copy of the internal scenes list. 
		* Do not expect to modify it to add or remove a STU.Scene.
		*  
		* @method
		* @public
		* @return {Array.<STU.Scene>} scenes
		*/
		Experience.prototype.getScenes = function () {
			if (this._enableScenes) {
				return this.scenes.slice();
			}

			return [];
		}

		/**
		* Return the scene with the given name.
		*  
		* @method
		* @public
		* @param {string} iName name of the scene to find
		* @return {STU.Scene}
		*/
		Experience.prototype.getSceneByName = function (iName) {
			if (this._enableScenes) {
				var count = this.scenes.length;
				for (var i = 0; i < count; i++) {
					var scene = this.scenes[i];
					if (scene.name === iName) {
						return scene;
					}
				}
			}

			return null;
		}

		/**
		* Get the current scene.
		*  
		* @method
		* @public
		* @return {STU.Scene} currentScene
		*/
		Experience.prototype.getCurrentScene = function () {
			if (this._enableScenes) {
				return this.currentScene;
			}

			return null;
		}

		/**
		* Get the previous scene
		*  
		* @method
		* @private
		* @return {STU.Scene} currentScene
		*/
		Experience.prototype.getPreviousScene = function () {
			if (this._enableScenes) {
				return this._previousScene;
			}

			return null;
		}

		/**
			* Process to execute when this STU.Experience is initializing. 
			*
			* @method
			* @private
			*/
		Experience.prototype.onInitialize = function (oExceptions) {
			Instance.prototype.onInitialize.call(this, oExceptions);

			current = this;

			this._enableScenes = false;

			var currScene = this.currentScene;
			if (currScene != undefined && currScene != null)
				this._enableScenes = true;

			/*
			var renderMan = STU.RenderManager.getInstance(); 
			var camActor = this.startupCamera;
			if (camActor !== undefined) {
				renderMan.setCurrentCamera(camActor);     
			}
			*/
			if (this.localTemplates) {
				for (var i = 0; i < this.localTemplates.length; i++) {
					if (this.localTemplates[i] instanceof STU.Actor) {
						for (var id in this.localTemplates[i]) {
							if (id !== "CATI3DExperienceObject" && id !== "CATIMovable" && id !== "CATI3DXGraphicalProperties" && id !== "StuIRepresentation" && id !== "CATI3DGeoVisu") {
								//delete this.localTemplates[i][id];
								if (typeof this.localTemplates[i][id] === "function") {
									delete this.localTemplates[i][id];
								}
							}
						}

						var type = null;//typeof this.localTemplates[i];
						if (STU.ProductActor && this.localTemplates[i] instanceof STU.ProductActor) {
							type = "STU.ProductActor";
						}
						else if (STU.Actor3D && this.localTemplates[i] instanceof STU.Actor3D) {
							type = "STU.Actor3D";
						}
						else if (STU.LogicalActor && this.localTemplates[i] instanceof STU.LogicalActor) {
							type = "STU.LogicalActor";
						}
						else if (STU.UIActor && this.localTemplates[i] instanceof STU.UIActor) {
							type = "STU.UIActor";
						} else if (STU.UIActor2D && this.localTemplates[i] instanceof STU.UIActor2D) {
							type = "STU.UIActor2D";
						}
						this.localTemplates[i].constructor = STU.ActorTemplate;
						this.localTemplates[i].prototype = STU.ActorTemplate.prototype;
						Object.setPrototypeOf(this.localTemplates[i], STU.ActorTemplate.prototype);
						this.localTemplates[i].dynamicInstances = [];
						this.localTemplates[i]._actorType = type;
					}
				}
			}

			for (var i = 0; i < this.actors.length; i++) {
				this.actors[i].initialize(oExceptions);
			}
			if (this.variants !== undefined && this.variants !== null) {
				for (var i = 0; i < this.variants.length; i++) {
					this.variants[i].initialize(oExceptions);
				}
			}
			if (this.environments !== undefined && this.environments !== null) {
				for (var i = 0; i < this.environments.length; i++) {
					this.environments[i].initialize(oExceptions);
				}
            }
            if (this.materials !== undefined && this.materials !== null) {
                for (var i = 0; i < this.materials.length; i++) {
                    this.materials[i].initialize(oExceptions);
                }
            }

			if (this.scenariosKF && this.scenariosKF.length) {
				var anims = this.scenariosKF[0].animations;
				if (anims !== undefined && anims !== null) {
					for (var i = 0; i < anims.length; i++) {
						anims[i].setParent(this);
						anims[i].initialize(oExceptions);
					}
				}
			}

			for (var i = 0; i < this.collections.length; i++) {
				this.collections[i].initialize(oExceptions);
			}

			for (var i = 0; i < this.scenarios.length; i++) {
				this.scenarios[i].initialize(oExceptions);
			}

			if (this._enableScenes) {
				this.currentScene.initialize(oExceptions);
			}
		};

		/**
			* Process to execute when this STU.Experience is disposing.
			*
			* @method
			* @private
			*/
		Experience.prototype.onDispose = function () {

			if (this._enableScenes) {
				this.currentScene.dispose();
			}
			else {
				if (this.scenes != undefined) {
					for (var i = this.scenes.length - 1; i >= 0; i--) {
						this.scenes[i].dispose();
					}
				}
			}

			for (var i = this.scenarios.length - 1; i >= 0; i--) {
				this.scenarios[i].dispose();
			}

			for (var i = this.collections.length - 1; i >= 0; i--) {
				this.collections[i].dispose();
			}

			if (this.materials !== undefined && this.materials !== null) {
				for (var i = this.materials.length - 1; i >= 0; i--) {
                    this.materials[i].dispose();
                }
			}

			if (this.environments !== undefined && this.environments !== null) {
				for (var i = this.environments.length - 1; i >= 0; i--) {
					this.environments[i].dispose();
				}
            }

			if (this.variants !== undefined && this.variants !== null) {
				for (var i = this.variants.length - 1; i >= 0; i--) {
					this.variants[i].dispose();
				}
			}

			for (var i = this.actors.length - 1; i >= 0; i--) {
				this.actors[i].dispose();
			}

			this._previousScene = null;

			current = undefined;

			Instance.prototype.onDispose.call(this);
		};

		/**
			* Check if this STU.Experience is active.
			*
			* @method
			* @override
			* @private
			* @return {boolean}
			*/
		Experience.prototype.isActive;

		/**
			* Activate this STU.Experience.
			* If it is already active, this will have no effect.
			*
			* @method
			* @override
			* @private
			*/
		Experience.prototype.activate;

		/**
			* Deactivate this STU.Experience.
			* If it is already inactive, this will have no effect.
			*
			* @method
			* @override
			* @private
			*/
		Experience.prototype.deactivate;

		/**
			* Process to execute when this STU.Experience is activating. 
			*
			* @method
			* @private
			*/
		Experience.prototype.onActivate = function (oExceptions) {
			Instance.prototype.onActivate.call(this, oExceptions);

			for (var i = 0; i < this.actors.length; i++) {
				this.actors[i].updateActivity(oExceptions);
			}
			if (this.variants !== undefined && this.variants !== null) {
				for (var i = 0; i < this.variants.length; i++) {
					this.variants[i].updateActivity(oExceptions);
				}
			}
			if (this.environments !== undefined && this.environments !== null) {
				for (var i = 0; i < this.environments.length; i++) {
					this.environments[i].updateActivity(oExceptions);
				}
            }
            if (this.materials !== undefined && this.materials !== null) {
                for (var i = 0; i < this.materials.length; i++) {
                    this.materials[i].updateActivity(oExceptions);
                }
            }

			if (this.scenariosKF !== undefined && this.scenariosKF !== null) {
				var anims = this.scenariosKF[0].animations;
				if (anims !== undefined && anims !== null) {
					for (var i = 0; i < anims.length; i++) {
						anims[i].updateActivity(oExceptions);
					}
				}
			}

			if (!this._enableScenes) {
				if (!!this.PlaySettings) {
					var startupScenario = this.PlaySettings.startupScenario;
					if (startupScenario !== undefined && startupScenario !== null) {
						startupScenario.updateActivity(oExceptions);
					}
				}
			}
			else {
				if (this.scenarios !== undefined && this.scenarios !== null) {
					if (this.scenarios.length == 1) {
						this.scenarios[0].updateActivity(oExceptions);
					}
				}
			}

			for (var i = 0; i < this.collections.length; i++) {
				this.collections[i].updateActivity(oExceptions);
			}

			if (this._enableScenes) {
				this.currentScene.activateJS(true, oExceptions);
			}			
		};

		/**
			* Process to execute when this STU.Experience is deactivating.
			*
			* @method
			* @private
			*/
		Experience.prototype.onDeactivate = function () {
			if (this._enableScenes)
				this.currentScene.updateActivity();

			for (var i = this.collections.length - 1; i >= 0; i--) {
				this.collections[i].updateActivity();
			}

			// at this point we only deactivate the first scenario
			if (this.scenarios.length > 0) {
				this.scenarios[0].updateActivity();
			}

			if (this.scenariosKF !== undefined && this.scenariosKF !== null) {
				var anims = this.scenariosKF[0].animations;
				if (anims !== undefined && anims !== null) {
					for (var i = anims.length - 1; i >= 0; i--) {
						anims[i].updateActivity();
					}
				}
			}

			if (this.materials !== undefined && this.materials !== null) {
				for (var i = this.materials.length - 1; i >= 0; i--) {
					this.materials[i].updateActivity();
				}
			}

			if (this.environments !== undefined && this.environments !== null) {
				for (var i = this.environments.length - 1; i >= 0; i--) {
					this.environments[i].updateActivity();
				}
			}

			if (this.variants !== undefined && this.variants !== null) {
				for (var i = this.variants.length - 1; i >= 0; i--) {
					this.variants[i].updateActivity();
				}
			}

			for (var i = this.actors.length - 1; i >= 0; i--) {
				this.actors[i].updateActivity();
			}

			Instance.prototype.onDeactivate.call(this);
		};

		/**
			* Process to execute after this STU.Experience is activated. 
			*
			* @method
			* @private
			*/
		Experience.prototype.onPostActivate = function () {
			Instance.prototype.onPostActivate.call(this);

			var newEvt = new STU.ExperienceActivateEvent();
			newEvt.setExperience(this);
			this.dispatchEvent(newEvt, true);
		};

		/**
			* Process to execute after this STU.Experience is deactivated.
			*
			* @method
			* @private
			*/
		Experience.prototype.onPostDeactivate = function () {
			var newEvt = new STU.ExperienceDeactivateEvent();
			newEvt.setExperience(this);
			this.dispatchEvent(newEvt, true);

			Instance.prototype.onPostDeactivate.call(this);
		};

		/**
		* Returns the global animation defined on this Experience, that matches the given name
		*
		* @method
		* @public
		* @param {string}   
		* @return {STU.ExperienceAnimation}
		*/
		Experience.prototype.getAnimationByName = function (iName) {

			if (this._enableScenes) {
				var animationsScenes = this.currentScene.animations.slice();

				for (var i = 0; i < animationsScenes.length; i++) {
					var animScene = animationsScenes[i];
					if (animScene !== undefined) {
						if (iName === animScene.name) {
							return anim;
						}
					}
				}
			}

			if (this.scenariosKF && this.scenariosKF.length) {
				var anims = this.scenariosKF[0].animations;
				if (anims !== undefined && anims !== null) {
					var count = anims.length;
					for (var i = 0; i < count; i++) {
						var anim = anims[i];
						if (anim !== undefined) {
							if (iName === anim.name) {
								return anim;
							}
						}
					}
				}
			}

			return null;
		};

		/**
			* Returns all global animations defined on this Experience
			*
			* @method
			* @public
			* @return {Array.<STU.ExperienceAnimation>}
			*/
		Experience.prototype.getAnimations = function () {
			if (this.scenariosKF && this.scenariosKF.length) {
				var anims = this.scenariosKF[0].animations;
				if (anims != undefined && anims !== null && anims.length > 0) {

					if (this._enableScenes) {
						var animationsScenes = this.currentScene.animations.slice();
						animationsScenes = animationsScenes.concat(anims);
						return animationsScenes.slice();
					}

					return anims.slice(0);
				}
			}

			return [];
		};

		/**
			* Returns a Variant identified by its name, defined in the context of this Experience
            * WARNING: to be removed
			* @method
			* @private
			* @return {STU.Variant}
			*/
        Experience.prototype.getVariantByName = function (iName) {
            var myVariantsManager = new StuVariantsManager();
            return myVariantsManager.getVariantByNameInContext(this.CATI3DExperienceObject, iName);
        }

        /**
            * Returns a Variant identified by its display name, defined in the context of this Experience
            * WARNING: if display name is not unique, first variant found is returned
            * WARNING: to be removed
            * @method
            * @private
            * @return {STU.Variant}
            */
        Experience.prototype.getVariantByDisplayName = function (iDisplayName) {
            var myVariantsManager = new StuVariantsManager();
            return myVariantsManager.getVariantByNameInContext(this.CATI3DExperienceObject, iName);
        }


		// Expose in STU namespace.
		STU.Experience = Experience;

		return Experience;
	});

define('StuModel/StuExperience', ['DS/StuModel/StuExperience'], function (Experience) {
	'use strict';

	return Experience;
});
