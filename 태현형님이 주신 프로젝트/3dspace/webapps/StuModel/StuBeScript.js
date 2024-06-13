define('DS/StuModel/StuBeScript', ['DS/StuCore/StuContext', 'DS/StuModel/StuBehavior', 'DS/EPTaskPlayer/EPTask', 'DS/StuCore/StuEnvServices'], function (STU, Behavior, Task, StuEnvServices) {
	//Dependence on StuEnvServices so that UserScript can use this
	'use strict';

	/**
* Main class dedicated to user script creation.
* Each user script created will override the onStart/onStop/execute method
* from the Script class, and will have dedicated class type registered in STU.Scripts
* during the experience build.
* 
* @exports Script
* @class 
* @constructor
* @private
* @extends STU.Behavior
* @memberof STU 
* @alias STU.Script
*/
	var StuBeScript = function Script() {
		Behavior.call(this);

		this.name = "BeScript";
		this.script = "";
	};

	StuBeScript.prototype = new Behavior();
	StuBeScript.prototype.constructor = StuBeScript;

    /**
     * Method called on each frame by the engine.
     * This method should be overriden by the user.
     */
	StuBeScript.prototype.execute = function () {
		return this;
	};

    /**
     * Internal method called to initialize the content of the script prototype with user code.
     * This method is called by finalize() during the build process.
     * Usually onStart/onStop/execute methods are overriden during that step.
     */
	StuBeScript.prototype.updateCode = function () {
		var that = this;
		STU.trace(function () { return " StuBeScript.updateCode: Applying source \"" + that.script + "\" on instance " + that.stuId; }, STU.eTraceMode.eVerbose, "BeScript");
		if (this.scriptinstance !== null) {

			try {
				var result = eval("(function (beScript) { " + this.scriptinstance.script + "})(this)");
			}
			catch (e) {
				var error_msg = "StuBeScript Syntax error in '" + that.name + "' : ";
				error_msg += (e.message !== undefined && e.message !== null ? e.message : "<undefined error>")
				error_msg += (e.line !== undefined && e.line !== null ? e.line : "")
				console.error(error_msg);
			}
		}
	};

	/**
     * Method called when activating the behavior, usually when experience starts or actor is reactivated.
     */
	StuBeScript.prototype.onInitialize = function (oExceptions) {
		Behavior.prototype.onInitialize.call(this, oExceptions);

		/*var that = this;
		STU.trace(function () {return " StuBeScript.initialize: On instance " + that.stuId;}, STU.eTraceMode.eVerbose, "BeScript");*/

		this.updateCode();
	};

    /**
     * Method called when activating the behavior, usually when experience starts or actor is reactivated.
     */
	StuBeScript.prototype.onActivate = function (oExceptions) {
		Behavior.prototype.onActivate.call(this, oExceptions);



		if (this.scriptinstance !== undefined && this.scriptinstance.BuildStatus !== undefined && this.scriptinstance.BuildStatus === "Failed") {
			var actor = this.getActor();
			console.error(' Actor : ' + actor.getName() + " - Script was not built successfully and hence cannot be run");
			this.execute = function () { };
			//throw new Error(' Actor : ' + actor.getName() + " - Script was not built successfully and hence cannot be run");
		}
	};

    /**
     * Method called when deactivating the behavior, usually when experience stops or actor is deactivated.
     */
	StuBeScript.prototype.onDeactivate = function () {
		Behavior.prototype.onDeactivate.call(this);
	};

    /**
     * This method will overriden by the user script, if any.
     */
	StuBeScript.prototype.onStart = function (iCtx) {
		//console.log("StuBeScript onStart (" + this.actor.name + ")");
	}

    /**
     * This method will overriden by the user script, if any.
     */
	StuBeScript.prototype.onStop = function (iCtx) {
		//console.log("StuBeScript onStop (" + this.actor.name + ")");
	}

    /**
     * This method should NOT be overriden by user script.
     * If so, it may break the behavior.
     */
	StuBeScript.prototype.onExecute = function (iCtx) {
		//console.log("StuBeScript onExecute (" + this.actor.name + ")");

		// execute method comes from the user script eval
		this.execute(iCtx);
	}


	// EEA IR-310911 careful here we have renamed the exposition in STU because of that IR
	STU.Script = StuBeScript;

	// Add a container for all scripts prototypes created by the user, that will be put here
	// automatically during the projection (see StuEScriptComponentPrototypeBuild)
	STU.Scripts = {};

	return StuBeScript;
});

define('StuModel/StuBeScript', ['DS/StuModel/StuBeScript'], function (StuBeScript) {
	'use strict';

	return StuBeScript;
});
