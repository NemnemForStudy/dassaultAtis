define('DS/StuMiscContent/StuWebResource', ['DS/StuCore/StuContext', 'DS/StuModel/StuResource'], function (STU, Resource) {
	'use strict';

    /**
     * @exports WebResource
     * @class
     * @constructor
     * @noinstancector
     * @public
     * @extends STU.Resource
     * @memberOf STU
	 * @alias STU.WebResource
     */
	var WebResource = function () {

		Resource.call(this);
		this.name = "WebResource";
	};

	WebResource.prototype = new Resource();
	WebResource.prototype.constructor = WebResource;

	// Expose in STU namespace.
	STU.WebResource = WebResource;

	return WebResource;
});
