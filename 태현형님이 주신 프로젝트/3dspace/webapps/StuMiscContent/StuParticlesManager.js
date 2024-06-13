/* global define */
define('DS/StuMiscContent/ParticlesManager', ['StuCore/StuContext', 'DS/EP/EP', 'StuCore/StuManager', 'DS/EPTaskPlayer/EPTask'], function (STU, EP, Manager, Task) {
	'use strict';

	/**
	 * Calls object's predefined methods instead of implementing the code directly in the task
	 * 
	 * @private
	*/
	var ObjectWrapperTask = function (iObject, iTaskName) {
		Task.call(this);
		this.name = iTaskName;
		this.object = iObject;
	};

	ObjectWrapperTask.prototype = new Task();
	ObjectWrapperTask.prototype.constructor = ObjectWrapperTask;

	ObjectWrapperTask.prototype.onStart = function () {
		this.object.onStart();
	};

	ObjectWrapperTask.prototype.onPause = function () {
		this.object.onPause();
	};

	ObjectWrapperTask.prototype.onResume = function () {
		this.object.onResume();
	};

	ObjectWrapperTask.prototype.onStop = function () {
		this.object.onStop();
	};

	ObjectWrapperTask.prototype.onExecute = function (iContext) {
		this.object.onExecute(iContext);
	};



	/**
	 * <p>Manager for Particle Systems</p>	 
	 *
	 * @exports ParticlesManager
	 * @class
	 * @constructor
	 * @noinstancector
	 * @private
	 * @extends Manager
	 * @memberof STU
	 */
	var ParticlesManager = function () {

		Manager.call(this);

		this.name = 'ParticlesManager';
	};

	ParticlesManager.prototype = new Manager();
	ParticlesManager.prototype.constructor = ParticlesManager;

	ParticlesManager.prototype.onInitialize = function () {

		this.mainTask = new ObjectWrapperTask(this, "ParticlesManagerTask");
		EP.TaskPlayer.addTask(this.mainTask, STU.getTaskGroup(STU.ETaskGroups.ePostProcess));
	};

	ParticlesManager.prototype.onDispose = function () {
		EP.TaskPlayer.removeTask(this.mainTask);
		delete this.mainTask;
	};


	ParticlesManager.prototype.onStart = function () {
		// everything is done on C++ side
	};


	ParticlesManager.prototype.onResume = function () {
		// everything is done on C++ side
	};

	ParticlesManager.prototype.onPause = function () {
		// everything is done on C++ side
	};

	ParticlesManager.prototype.onStop = function () {
		// everything is done on C++ side
	};

	ParticlesManager.prototype.onExecute = function () {
		// everything is done on C++ side
	};

	// Registration of the manager
	STU.registerManager(ParticlesManager);

	// Expose in STU namespace.
	STU.ParticlesManager = ParticlesManager;

	return ParticlesManager;
});
