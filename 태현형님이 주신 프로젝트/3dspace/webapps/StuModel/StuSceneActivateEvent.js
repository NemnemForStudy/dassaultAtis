
define('DS/StuModel/StuSceneActivateEvent', ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEvent'], function (STU, Event) {
	'use strict';

    /**
     * Describe an event generated from a STU.Scene.
     * It occurs when a scene is activate.
     * This event has specific extensions class and there are all dispatched globally on the EP.EventServices and locally on the corresponding STU.Scene.
     * In order to get notified, you need to add a listener as STU.SceneActivateEvent type on the corresponding STU.Scene or on the EP.EventServices.
     *
     * @exports SceneActivateEvent
     * @class
     * @constructor
     * @noinstancector 
     * @public
     * @extends EP.Event
     * @memberof STU
     * @alias STU.SceneActivateEvent
     */
	var SceneActivateEvent = function () {

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

	SceneActivateEvent.prototype = new Event();
	SceneActivateEvent.prototype.constructor = SceneActivateEvent;
	SceneActivateEvent.prototype.type = 'SceneActivateEvent';

	// Expose in STU namespace.
	STU.SceneActivateEvent = SceneActivateEvent;

	EP.EventServices.registerEvent(SceneActivateEvent);

	return SceneActivateEvent;
});

define('StuModel/StuSceneActivateEvent', ['DS/StuModel/StuSceneActivateEvent'], function (SceneActivateEvent) {
	'use strict';

	return SceneActivateEvent;
});
