
define('DS/StuCore/StuProfilingManager', ['StuCore/StuContext', 'StuCore/StuManager', 'DS/EPEventServices/EPEventTarget', 'DS/EPTaskPlayer/EPTask', 'DS/StuCore/StuEnvServices', 'DS/StuCore/StuProfilingServices'], function (STU, Manager, EventTarget, Task, StuEnvServices, StuProfilingServices) {
	'use strict';

	/**
	 * Manager to create and store profiling objects
	 * It is a container for all created profiling objects which allow to access or dispose them.
	 *
	 * @exports ProfilingManager
	 * @class
	 * @constructor
	 * @noinstancector
	 * @private
	 * @extends STU.Manager
	 * @memberof STU
     * @alias STU.ProfilingManager
	 */
	var ProfilingManager = function () {
		// Parent class constructor call
		Manager.call(this);

		this.name = "ProfilingManager";

		// Map to access to created profiling object by their name
		this.profilingObjects = {};

		// Map to ensure that there are no leaking profiling steps
		this.labelMap = new Map();
	};

	ProfilingManager.prototype = new Manager();
	ProfilingManager.prototype.constructor = ProfilingManager;

	/**
	 * Method used to create a profiling object
	 *
	 * @private
	 * @param {string} iProfilingName, the profiling object name
	 * @return {Object} return a ProfilingObject (null if there was already a profiling object with the same name or if any issue was met)
	 */
	ProfilingManager.prototype.createProfilingObject = function (iProfilingName) {
		var profilingObj = (iProfilingName in this.profilingObjects) ? null : new STU.ProfilingObject(iProfilingName);
		if (typeof (profilingObj.profilingObj) === "undefined" || null === profilingObj.profilingObj)
			return null;
		return profilingObj;
	};

	/**
	 * Method used to get a profiling object from its name
	 *
	 * @method getProfilingObject
	 * @private
	 * @param {string} iProfilingName, the profiling object name
	 * @return {Object} return a ProfilingObject (null if there is no profiling object with the given name)
	 */
	ProfilingManager.prototype.getProfilingObject = function (iProfilingName) {
		return (iProfilingName in this.profilingObjects) ? this.profilingObjects[iProfilingName] : null;
	};

	/**
	 * Method used to dispose a profiling object and remove it from this manager
	 *
	 * @method deleteProfilingObject
	 * @private
	 * @param {string} iProfilingName, the profiling object name
	 */
	ProfilingManager.prototype.deleteProfilingObject = function (iProfilingName) {
		if (iProfilingName in this.profilingObjects)
			this.profilingObjects[iProfilingName].dispose();
	};

	/**
	 * Process to execute when this STU.ProfilingManager is initializing.
	 *
	 * @method
	 * @private
	 */
	ProfilingManager.prototype.onInitialize = function () {

	};

	/**
	 * Process to execute when this STU.ProfilingManager is disposing.
	 * Method used to dispose all profiling objects and remove them from this manager
	 *
	 * @method
	 * @private
	 */
	ProfilingManager.prototype.onDispose = function () {
		for (var name in this.profilingObjects) {
			this.profilingObjects[name].dispose();
		}

		if (ProfilingManager.prototype.jsProfilingEnabled()) {
			if (this.labelMap.size) {
				console.error("ProfilingManager: some profiling steps have not been ended");
				console.error(JSON.stringify(this.labelMap.values));
			}
		}
	};

	/**
	 * Temporary methods to test JS profiling
	 * @private
	 */
	var ProfilingObject = function () {
		this.profiler = null;
		this.label = null;
	};

	/**
	 * Temporary methods to test JS profiling
	 * @private
	 */
	ProfilingManager.prototype.startProfiling = function (iLabel, iActor) {

		if (ProfilingManager.prototype.jsProfilingEnabled()) {
			if (this.labelMap.has(iLabel)) {
				console.error("ProfilingManager: '" + iLabel + "' already being profiled");
			}
			else {
				var actor = (typeof iActor !== 'undefined') ? iActor : "";
				var obj = new ProfilingObject();
				obj.label = iLabel;
				obj.profiler = new StuProfilerTest(iLabel);
				if (actor === "") {
					obj.profiler.startProfiling();
				} else {
					obj.profiler.startProfilingActor(actor);
				}

				this.labelMap.set(iLabel, 1);
			}

			return obj;
		}
	}

	/**
	 * Temporary methods to test JS profiling
	 * @private
	 */
	ProfilingManager.prototype.stopProfiling = function (iProfilingObject) {

		if (ProfilingManager.prototype.jsProfilingEnabled()) {
			if (!this.labelMap.has(iProfilingObject.label)) {
				console.error("ProfilingManager: '" + iProfilingObject.label + "' is not beeing profiled");
			}
			else {
				this.labelMap.delete(iProfilingObject.label);

				iProfilingObject.profiler.stopProfiling();
				iProfilingObject.profiler = null;
			}
		}
	}

	ProfilingManager.prototype.jsProfilingEnabled = function () {
		// checking that JS profiling is enabled
		if (this.profilingEnable == undefined) {
			//var env = new StuEnvServices();
			var profiling = new StuProfilingServices();

			this.profilingEnable = StuEnvServices.CATGetEnv("CXP_ENABLE_JS_PROFILING") == "1" || profiling.IsAnalyzerActive() == 1;
		}
		return this.profilingEnable;
	};


	// hooking EPEventTarget and EPTask to profile their execution	
	var previousDispatchEvent = EventTarget.prototype.dispatchEvent;
	EventTarget.prototype.dispatchEvent = function (iEvent) {
		var pm = ProfilingManager.getInstance();

		var label = "Event " + iEvent.type;
		var prof = pm.startProfiling(label);
		previousDispatchEvent.call(this, iEvent);
		pm.stopProfiling(prof);
	}

	var previousExecute = Task.prototype.execute;
	Task.prototype.execute = function (iPlayerContext) {
		var label = "Execute " + this.constructor.name;

		// taskgroup id set here : STU.initContext
		if (this.id !== undefined) {
			label += " (" + this.id + ")";
		}

		if (this.constructor.name == "BehaviorTask") {
			label = "Execute " + this.behavior.constructor.name;
		}

		// profile only non empty task groups (this.task tells if it is a task group)
		if (this.tasks == undefined || this.tasks.length != 0) {
			var pm = ProfilingManager.getInstance();

			var prof = null;
			if (this.constructor.name == "BehaviorTask") {
				var prof = pm.startProfiling(label, this.behavior.actor.name);
			} else {
				var prof = pm.startProfiling(label);
			}

			previousExecute.call(this, iPlayerContext);
			pm.stopProfiling(prof);
		}
	}

	STU.registerManager(ProfilingManager);

	// Expose in STU namespace.
	STU.ProfilingManager = ProfilingManager;

	return ProfilingManager;
});

