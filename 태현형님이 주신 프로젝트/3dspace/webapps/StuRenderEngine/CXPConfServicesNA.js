/*global define*/
define('DS/StuRenderEngine/CXPConfServicesNA', ['DS/StuRenderEngine/CXPConfServices'], function (CXPConfServicesJS) {
	'use strict';

	CXPConfServicesJS.prototype.build = function () {
		return new CXPConfServices();
	}
});
