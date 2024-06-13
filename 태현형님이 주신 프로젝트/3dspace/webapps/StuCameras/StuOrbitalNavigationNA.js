/* global define */
define('DS/StuCameras/StuOrbitalNavigationNA', ['DS/StuCameras/StuOrbitalNavigation'], function (OrbitalNavigation) {
	'use strict';

	OrbitalNavigation.prototype.buildShadingManager = function () {
		return new stu__ShadingManager(); 
	};

	return OrbitalNavigation;
});
