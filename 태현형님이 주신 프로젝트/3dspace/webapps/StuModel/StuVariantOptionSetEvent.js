
define('DS/StuModel/StuVariantOptionSetEvent',
    ['DS/StuCore/StuContext', 'DS/EPEventServices/EPEventServices', 'DS/EPEventServices/EPEvent'],
    function (STU, EPEventServices, Event) {
    'use strict';

    /**
        * Describe a STU.VariantOptionSetEvent.
        *
        * @exports VariantOptionSetEvent
        * @class
        * @constructor
        * @noinstancector
        * @private
        * @extends EP.Event
        * @memberof STU
        * @alias STU.VariantOptionSetEvent
        */
        var VariantOptionSetEvent = function () {

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

        VariantOptionSetEvent.prototype = new Event();
        VariantOptionSetEvent.prototype.constructor = VariantOptionSetEvent;
        VariantOptionSetEvent.prototype.type = 'VariantOptionSetEvent';

    // Expose in STU namespace.
        STU.VariantOptionSetEvent = VariantOptionSetEvent;

        EPEventServices.registerEvent(VariantOptionSetEvent);
        return VariantOptionSetEvent;
});

define('StuModel/StuVariantOptionSetEvent', ['DS/StuModel/StuVariantOptionSetEvent'], function (VariantOptionSetEvent) {
    'use strict';

    return VariantOptionSetEvent;
});
