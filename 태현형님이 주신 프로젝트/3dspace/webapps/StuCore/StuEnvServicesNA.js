/*global define*/
define('DS/StuCore/StuEnvServicesNA', ['DS/StuCore/StuEnvServices'], function (StuEnvServicesJS) {
	'use strict';

	StuEnvServicesJS.CATGetEnv = function (iEnvVariableName) {
		var myEnvServices = new StuEnvServices();
		return myEnvServices.CATGetEnv(iEnvVariableName);
	};

	StuEnvServicesJS.EKIntegrationOFF = function () {
		return DevFlags.EKIntegrationOFF();
	};

});
