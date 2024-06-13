define('DS/StuModel/StuGeometryStreamActor', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuActor3D'], function (STU, Actor3D) {
	'use strict';

	/**
	 * Describes an actor loading its 3D representation from a file in runtime view.
	 * file in on asset linkDescription
	 *
	 * @exports GeometryStreamActor
	 * @class
	 * @constructor
     * @noinstancector 
	 * @public
	 * @extends STU.Actor3D
	 * @memberof STU
     * @alias STU.GeometryStreamActor
	 */
	var GeometryStreamActor = function () {

		Actor3D.call(this);

		this.name = 'GeometryStreamActor' + this.stuId;
	};

	GeometryStreamActor.prototype = new Actor3D();
	GeometryStreamActor.prototype.constructor = GeometryStreamActor;	
	// Expose in STU namespace.
	STU.GeometryStreamActor = GeometryStreamActor;

	return GeometryStreamActor;
});

define('StuModel/StuGeometryStreamActor', ['DS/StuModel/StuGeometryStreamActor'], function (GeometryStreamActor) {
	'use strict';

	return GeometryStreamActor;
});
