define('DS/StuModel/StuActor2D', ['DS/StuCore/StuContext', 'DS/StuModel/StuActor'],
	function (STU, Actor) {
		'use strict';

		/**
		 * Describe a STU.Actor which represents a 2D object on screen, and has no representation in the 3D space.
		 *
		 * @exports Actor2D
		 * @class
		 * @constructor
		 * @noinstancector
		 * @public
		 * @extends STU.Actor
		 * @memberof STU
		 * @alias STU.Actor2D
		 */
		var Actor2D = function () {
			Actor.call(this);
		}

		Actor2D.prototype = new Actor();
		Actor2D.prototype.constructor = Actor2D;

		// Expose in STU namespace.
		STU.Actor2D = Actor2D;

		return Actor2D;
	});
	
define('StuModel/StuActor2D', ['DS/StuModel/StuActor2D'], function (Actor2D) {
	'use strict';

	return Actor2D;
});
