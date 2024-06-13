define('DS/StuScenario/StuScenario', ['DS/StuCore/StuContext', 'DS/StuModel/StuInstance'], function (STU, Instance) {
	'use strict';

    /*****************************************************************************
    Component dedicated to scenario definition.

    @constructor
    *****************************************************************************/

    /**
    * Describe a scenario object.
    *
    * @exports Scenario
    * @class 
    * @constructor
	* @noinstancector 
    * @public
    * @extends STU.Instance
    * @memberof STU
    * @alias STU.Scenario
    */
	var Scenario = function (iRenderable) {
		Instance.call(this);
		this.name = "Scenario";

	};

	//////////////////////////////////////////////////////////////////////////////
	//                           Prototype definitions                          //
	//////////////////////////////////////////////////////////////////////////////
	Scenario.prototype = new Instance();
	Scenario.prototype.constructor = Scenario;

	/**
	* Return the scene above the scenario.
	*  
	* @method
	* @public
	* @return {STU.Scene} scene
	*/
	Scenario.prototype.getScene = function () {
		if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
			return Instance.prototype.findParent.call(this, STU.Scene);
		}

		return undefined;
	};

	/**
	* Returns true if this scenario is permanent.
	*  
	* @method
	* @public
	* @return {boolean} true if this STU.Scenario is permanent<br/>
	*					false otherwise.
	*/
	Scenario.prototype.isPermanent = function () {
		var isPermanent = true;

		if (STU.Experience.getCurrent().getCurrentScene() != null) { // scenes are activated
			if (this.getScene() != undefined)
				isPermanent = false;
		}

		return isPermanent;
	};

	// Expose only those entities in STU namespace.
	STU.Scenario = Scenario;

	return Scenario;
});

define('StuScenario/StuScenario', ['DS/StuScenario/StuScenario'], function (Scenario) {
	'use strict';

	return Scenario;
});
