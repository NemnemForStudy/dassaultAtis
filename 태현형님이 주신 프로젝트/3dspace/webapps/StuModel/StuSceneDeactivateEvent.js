
define('DS/StuModel/StuSceneDeactivateEvent', ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEvent'], function (STU, Event) {
	'use strict';

    /**
     * Describe an event generated from a STU.Scene.
     * It occurs when a scene is activate.
     * This event has specific extensions class and there are all dispatched globally on the EP.EventServices and locally on the corresponding STU.Scene.
     * In order to get notified, you need to add a listener as STU.SceneDeactivateEvent type on the corresponding STU.Scene or on the EP.EventServices.
     *
     * @exports SceneDeactivateEvent
     * @class
     * @constructor
     * @noinstancector 
     * @public
     * @extends EP.Event
     * @memberof STU
     * @alias STU.SceneDeactivateEvent
     */
	var SceneDeactivateEvent = function () {

		Event.call(this);

        /**
            * The activated Scene 
            *
            * @member
            * @private
            * @type {STU.Scene}
            */

		this.activatedScene = null;

        /**
            * The deactivated Scene 
            *
            * @member
            * @private
            * @type {STU.Scene}
            */
		this.deactivatedScene = null;
	};

	SceneDeactivateEvent.prototype = new Event();
	SceneDeactivateEvent.prototype.constructor = SceneDeactivateEvent;
	SceneDeactivateEvent.prototype.type = 'SceneDeactivateEvent';

	// Expose in STU namespace.
	STU.SceneDeactivateEvent = SceneDeactivateEvent;

	EP.EventServices.registerEvent(SceneDeactivateEvent);

	return SceneDeactivateEvent;
});

define('StuModel/StuSceneDeactivateEvent', ['DS/StuModel/StuSceneDeactivateEvent'], function (SceneDeactivateEvent) {
	'use strict';

	return SceneDeactivateEvent;
});
