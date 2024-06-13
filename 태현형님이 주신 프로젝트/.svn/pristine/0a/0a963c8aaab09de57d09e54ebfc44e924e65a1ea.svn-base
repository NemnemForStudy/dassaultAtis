
define('DS/StuModel/StuVariantOptionUnsetEvent',
    ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEventServices', 'DS/EPEventServices/EPEvent'],
    function (STU, EPEventServices, Event) {
    'use strict';

    /**
        * Describe a STU.VariantOptionUnsetEvent.
        *
        * @exports VariantOptionUnsetEvent
        * @class
        * @constructor
        * @noinstancector
        * @private
        * @extends EP.Event
        * @memberof STU
        * @alias STU.VariantOptionUnsetEvent
        */
        var VariantOptionUnsetEvent = function () {

        Event.call(this);

        /**
            * Variant Value
            *
            * @member
            * @private
            * @type {STU.Value}
            * @default undefined
            */
        this.option = null;
    };

        VariantOptionUnsetEvent.prototype = new Event();
        VariantOptionUnsetEvent.prototype.constructor = VariantOptionUnsetEvent;
        VariantOptionUnsetEvent.prototype.type = 'VariantOptionUnsetEvent';

    // Expose in STU namespace.
        STU.VariantOptionUnsetEvent = VariantOptionUnsetEvent;

        EP.EventServices.registerEvent(VariantOptionUnsetEvent);
        return VariantOptionUnsetEvent;
});

define('StuModel/StuVariantOptionUnsetEvent', ['DS/StuModel/StuVariantOptionUnsetEvent'], function (VariantOptionUnsetEvent) {
    'use strict';

    return VariantOptionUnsetEvent;
});
