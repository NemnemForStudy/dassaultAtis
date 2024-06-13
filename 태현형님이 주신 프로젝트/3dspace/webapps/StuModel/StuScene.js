define('DS/StuModel/StuScene', [
	'DS/StuCore/StuContext',
	'DS/StuModel/StuInstance',
	'DS/StuCore/StuEnvServices',
	'DS/StuModel/StuActorTemplate',
	'DS/StuModel/StuSceneActivateEvent',
	'DS/StuModel/StuSceneDeactivateEvent'
],
	function (STU, Instance, StuEnvServices) {
		'use strict';

		/**
			* An experience can be composed by several scenes. Scenes can have local actors.
			*
			* @exports Scene
			* @class
			* @constructor
			* @noinstancector 
			* @public
			* @extends STU.Instance
			* @memberof STU
			* @alias STU.Scene
			*/
		var Scene = function () {

			Instance.call(this);

			this.CATI3DExperienceObject;

			this.name = 'Scene';

			this.selfActive = false;

			/**
			* This is the list of actors of the scene.      
			*
			* @member
			* @private
			* @type {Array.<STU.Actor>}
			*/
			this.actors = [];

			/**
			* This is the scenario of the scene. 
			*
			* @member
			* @private
			* @type {STU.Scenario}
			*/
			this.scenario = null;

			/**
			* This is the list of animations of the scene.      
			*
			* @member
			* @private
			* @type {Array.<STU.Animations>}
			*/
			this.animations = [];

			/**
			* This is the list of Collections of the experience.        
			*
			* @member
			* @private
			* @type {Array.<STU.Collection>}
			*/
			this.collections = [];

		};

		var current;

		Scene.prototype = new Instance();
		Scene.prototype.constructor = Scene;

		/**
			* Add a STU.Actor on this STU.Scene.
			*
			* @method
			* @private
			* @param {STU.Actor} iActor instance object corresponding to the actor to add
			*/
		Scene.prototype.addActor = function (iActor) {
			STU.pushUnique(this.actors, iActor);
			iActor.setParent(this);
			iActor.initialize();
			iActor.activate(true);
		};

		/**
			* Add a STU.Actor on this STU.Scene.
			*
			* @method
			* @private
			* @param {STU.Actor} iActor instance object corresponding to the actor to remove
			*/
		Scene.prototype.removeActor = function (iActor) {
			iActor.deactivate();
			iActor.dispose();
			iActor.setParent();
			STU.remove(this.actors, iActor);
		};

		/**
			* Send SceneDeactivateEvent on this STU.Scene.
			*
			* @method
			* @private
			* @param {STU.Scene} iCurrentScene object corresponding to the current scene 
			* @param {STU.Scene} iPreviousScene object corresponding to the previous scene 
			*/
		Scene.prototype.sendDeactivateEvent = function (iCurrentScene, iPreviousScene) {
			var e = new STU.SceneDeactivateEvent();
			e.activatedScene = iCurrentScene;
			e.deactivatedScene = iPreviousScene;

			this.dispatchEvent(e);
		}

		/**
			* Send SceneActivateEvent on this STU.Scene.
			*
			* @method
			* @private
			* @param {STU.Scene} iCurrentScene object corresponding to the current scene 
			* @param {STU.Scene} iPreviousScene object corresponding to the previous scene 
			*/
		Scene.prototype.sendActivateEvent = function (iCurrentScene, iPreviousScene) {
			var e = new STU.SceneActivateEvent();
			e.activatedScene = iCurrentScene;
			e.deactivatedScene = iPreviousScene;
			this.dispatchEvent(e);
		}

		/**
			* Return the current experience.
			*
			* @method
			* @public
			* @return {STU.Experience} 
			*/
		Scene.prototype.getExperience = function () {
			return STU.Experience.getCurrent();
		};


		/**
			* Return if the scene is the current scene.
			*
			* @method
			* @public
			* @return {boolean} true if this is the current scene, false otherwise
			*/
		Scene.prototype.isCurrent = function () {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return true;

			return false;
		};


		/**
			* activate the scene
			*
			* @method
			* @private
			*/
		Scene.prototype.activateJS = function (iForce = false, oExceptions = null) {
			STU.Instance.prototype.activate.call(this, iForce, oExceptions);
		};


		/**
			* Return an array listing the root actors of this STU.Scene.
			* The returned array is a copy of the internal actors list. 
			* Do not expect to modify it to add or remove a STU.Actor.
			*
			* @method
			* @public
			* @return {Array.<STU.Actor>} Array of STU.Actor instance object
			*/
		Scene.prototype.getActors = function () {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getActors();
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};

		/**
		* Return an array listing all the actors of this STU.Scene (locals and permanents actors).
		* The returned array is a copy of the internal actors list. 
		* Do not expect to modify it to add or remove a STU.Actor.
		*
		* @method
		* @public
		* @return {Array.<STU.Actor>} Array of STU.Actor instance object
		*/
		Scene.prototype.getAllActors = function () {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getAllActors();
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};


		/**
			* Find a STU.Actor, with a specific name, in the actors list of this STU.Scene.
			* You can check the whole hierarchy with the iRecursive input.
			*
			* @method
			* @public
			* @param {string} iName corresponding to the actor name
			* @param {boolean} [iRecursive] if you want to check the whole hierarchy
			* @return {STU.Actor} instance object corresponding to the found actor
			*/
		Scene.prototype.getActorByName = function (iName, iRecursive) {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getActorByName(iName, iRecursive);
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};

		/**
			* Return all actors from a given type, or inheriting from that type.
			*
			* By default it only searches in first level of actor hierarchy.
			* You can check the whole hierarchy with the iRecursive input.
			*
			* Example:
			*      var actors = myScene.getActorsByType(STU.Camera, true);
			*
			* @method
			* @public
			* @param {STU.Actor} iType constructor function corresponding to the asked actor type.
			* @param {boolean} [iRecursive] if you want to check the whole hierarchy
			* @return {Array.<STU.Actor>} instance object corresponding to the found actor
			*/
		Scene.prototype.getActorsByType = function (iType, iRecursive) {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getActorsByType(iType, iRecursive);
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};

		/**
			* Return all behaviors from a given type, or inheriting from that type.    
			*
			* Example:
			*      var motionBehaviors = myScene.getAllBehaviorsByType(STU.Motion);
			*      var motionBehaviors = myScene.getAllBehaviorsByType(STU.Scripts.MyUserScript);
			*
			* @method
			* @public
			* @param {STU.Behavior} iType constructor function corresponding to the asked behavior type.
			* @return {Array.<STU.Behavior>} array of matching behaviors
			*/
		Scene.prototype.getAllBehaviorsByType = function (iType) {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getAllBehaviorsByType(iType);
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};


		/**
		* Returns the global animation defined on this Experience, that matches the given name
		*
		* @method
		* @public
		* @param {string}   
		* @return {STU.ExperienceAnimation}
		*/
		Scene.prototype.getAnimationByName = function (iName) {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getAnimationByName(iName);
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};

		/**
			* Returns all global animations defined on this Experience
			*
			* @method
			* @public
			* @return {Array.<STU.ExperienceAnimation>}
			*/
		Scene.prototype.getAnimations = function () {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getAnimations();
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};

		/**
			* Return an array listing the Collections of current Scene and STU.Experience.
			* The returned array is a copy of the internal Collections list. 
			* Do not expect to modify it to add a STU.Collection.
			*
			* @method
			* @public
			* @return {Array.<STU.Collection>} Array of STU.Collection instance object
			* @see STU.Experience#getCollectionByName
			*/
		Scene.prototype.getCollections = function () {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getCollections();
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
		};

		/**
		* Find a STU.Collection, with a specific name, in the Collections list of current Scene and STU.Experience.
		*
		* @method
		* @public
		* @param {string} iName corresponding to the actor name
		* @return {STU.Collection} instance object corresponding to the found Collection
		* @see STU.Experience#getCollections
		*/
		Scene.prototype.getCollectionByName = function (iName) {
			var currentExp = this.getExperience();
			if (this == currentExp.getCurrentScene())
				return currentExp.getCollectionByName(iName);
			else {
				throw new TypeError('You cannot call this function on non current scene');
				return null;
			}
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
		Scene.prototype.getScenarios = function () {
			if (this._enableScenes) {
				var scenarioScene = []
				scenarioScene = scenarioScene.concat(this.currentScene.scenario);
				scenarioScene = scenarioScene.concat(this.scenarios);
				return scenarioScene.slice();
			}

			return this.scenarios.slice(0);
		};

		Scene.prototype.initialize = function (oExceptions) {
			if (!this.initialized) {
				Instance.prototype.initialize.call(this, oExceptions);
			}

			this.selfActive = true;
		};

		/**
			* Process to execute when this STU.Scene is initializing.
			*
			* @method
			* @private
			*/
		Scene.prototype.onInitialize = function (oExceptions) {
			Instance.prototype.onInitialize.call(this, oExceptions);

			if (this._cacheEventTarget) {
				// see comment below, in onDispose
				this._eventTarget = this._cacheEventTarget;
			}


			for (var i = 0; i < this.actors.length; i++) {
				this.actors[i].initialize(oExceptions);
			}

			for (var i = 0; i < this.animations.length; i++) {
				this.animations[i].initialize(oExceptions);
			}

			for (var i = 0; i < this.collections.length; i++) {
				this.collections[i].initialize(oExceptions);
			}

			if (this.scenario !== null && this.scenario !== undefined) {
				this.scenario.initialize(oExceptions);
			}

			if (this.objectListenerToRegister != undefined) {
				for (var i = 0; i < this.objectListenerToRegister.length; i++) {
					var objToRegister = this.objectListenerToRegister[i];
					this.addObjectListener(objToRegister.event, objToRegister.objInstance, objToRegister.fctName);
				}

				this.objectListenerToRegister = [];
			}
		};

		/**
			* Process to execute when this STU.Scene is disposing.
			*
			* @method
			* @private
			*/
		Scene.prototype.onDispose = function () {

			if (this.scenario !== null && this.scenario !== undefined)
				this.scenario.dispose();

			for (var i = this.collections.length - 1; i >= 0; i--) {
				this.collections[i].dispose();
			}

			for (var i = this.animations.length - 1; i >= 0; i--) {
				this.animations[i].dispose();
			}

			for (var i = this.actors.length - 1; i >= 0; i--) {
				this.actors[i].dispose();
			}

			// Exception for scenes : we want to keep permanent listeners active after scene reset
			// event target will be restored after a switch (scene 1 -> scene 2 -> scene 1)
			// we need this especially for the 'has been activated' sensor on scenes in permanent scenarios
			// See IR-900577
			this._cacheEventTarget = this._eventTarget;
			
			Instance.prototype.onDispose.call(this);
		};

		/**
			* Check if this STU.Scene is active.
			*
			* @method
			* @override
			* @private
			* @return {boolean}
			*/
		Scene.prototype.isActive;

		/**
			* Activate this STU.Scene.
			* If it is already active, this will have no effect.
			*
			* @method
			* @override
			* @private
			*/
		Scene.prototype.activate = function (iForce, oExceptions) {
			var currentExp = this.getExperience();
			if (currentExp != undefined && this != currentExp.getCurrentScene()) {
				STU.Experience.getCurrent().currentScene = this;
			}
			else {
				this.activateJS(iForce, oExceptions);
			}
		}

		/**
			* Deactivate this STU.Scene.
			* If it is already inactive, this will have no effect.
			*
			* @method
			* @override
			* @private
			*/
		Scene.prototype.deactivate;

		/**
		* Throw an error if called on scene
		*
		* @method
		* @private
		* @see STU.Instance#isSelfActive
		*/
		Scene.prototype.isSelfActive = function () {
			throw new TypeError('You cannot call this function on scene');
		};

		/**
         * Throw an error if called on scene
         *
         * @method
         * @private
         * @return {STU.Instance[]} the list containing the instance responsible
         */
		Scene.prototype.getInactivityResponsibles = function () {
			throw new TypeError('You cannot call this function on scene');
			return null;
		};


		/**
			* Process to execute when this STU.Scene is activating. 
			*
			* @method
			* @private
			*/
		Scene.prototype.onActivate = function (oExceptions) {
			Instance.prototype.onActivate.call(this, oExceptions);

			current = this;

			for (var i = 0; i < this.actors.length; i++) {
				this.actors[i].updateActivity(oExceptions);
			}

			for (var i = 0; i < this.animations.length; i++) {
				this.animations[i].updateActivity(oExceptions);
			}

			for (var i = 0; i < this.collections.length; i++) {
				this.collections[i].updateActivity(oExceptions);
			}

			if (this.scenario !== null && this.scenario !== undefined)
				this.scenario.updateActivity(oExceptions);
		};

		/**
			* Process to execute when this STU.Scene is deactivating.
			*
			* @method
			* @private
			*/
		Scene.prototype.onDeactivate = function () {

			if (this.scenario !== null && this.scenario !== undefined)
				this.scenario.updateActivity();

			for (var i = this.collections.length - 1; i >= 0; i--) {
				this.collections[i].updateActivity();
			}

			for (var i = this.animations.length - 1; i >= 0; i--) {
				this.animations[i].updateActivity();
			}

			for (var i = this.actors.length - 1; i >= 0; i--) {
				this.actors[i].updateActivity();
			}

			current = undefined;

			Instance.prototype.onDeactivate.call(this);
		};

		/**
			* Process to execute after this STU.Scene is activated.
			*
			* @method
			* @private
			*/
		Scene.prototype.onPostActivate = function () {
			Instance.prototype.onPostActivate.call(this);

			var currentScene = this;
			var previousScene = this.getExperience().getPreviousScene();
			this.sendActivateEvent(currentScene, previousScene);
		};

		/**
			* Process to execute after this STU.Experience is deactivated.
			*
			* @method
			* @private
			*/
		Scene.prototype.onPostDeactivate = function () {

			Instance.prototype.onPostDeactivate.call(this);

			var currentScene = this.getExperience().getCurrentScene();
			var previousScene = this;
			this.sendDeactivateEvent(currentScene, previousScene);
		};

		/**
		 * 
		 * 
		 * @method
		 * @private
		 */
		Scene.prototype.registerObjectListenerLater = function (iEventCtor, iObj, iFctName) {
			console.log(this.objectListenerToRegister);
			if (this.objectListenerToRegister == undefined)
				this.objectListenerToRegister = [];

			console.log(this.objectListenerToRegister);
			var toRegister = {};
			toRegister.event = iEventCtor;
			toRegister.objInstance = iObj;
			toRegister.fctName = iFctName;

			console.log(toRegister);

			this.objectListenerToRegister.push(toRegister);
		}

		// Expose in STU namespace.
		STU.Scene = Scene;

		return Scene;
	});
