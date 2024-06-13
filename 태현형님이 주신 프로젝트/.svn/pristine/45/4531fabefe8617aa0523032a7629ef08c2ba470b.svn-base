
define('DS/StuModel/StuVariant', [
    'DS/StuCore/StuContext',
    'DS/StuModel/StuInstance'
], function (STU, Instance) {
    'use strict';

    /**
     * Describe an Object representing an Experience Variant
     *
     * @exports Variant
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Instance
     * @alias STU.Variant
     */
    var Variant = function () {
        Instance.call(this);
        this.name = 'Variant';

        /**
         * native object CATI3DExpVariant2
         *
         * @member
         * @private
         * @type {Object}
         */
        this.CATI3DExpVariant2 = null; // valued by CATEVariantSet_StuIBuilder::Build



        /**
         * Variant display name
         *
         * @member
         * @instance
         * @name displayName
         * @private
         * @type {string}
         * @memberOf STU.Variant
         */
        Object.defineProperty(this, "displayName", {
            enumerable: true,
            configurable: true,
            get: function () {
                return this.getDisplayName();
            },
            set: function (iOpacity) {
                // read only
            }
        });

        /**
         * Variant type
         *
         * @member
         * @instance
         * @name type
         * @private
         * @type {STU.Variant.EVariantType}
         * @memberOf STU.Variant
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            get: function () {
                return this.getType();
            },
            set: function (iOpacity) {
                // read only
            }
        });

    };

    Variant.prototype = new Instance();
    Variant.prototype.constructor = Variant;

        /**
        * Returns the values of this Variant
        *
        * @method
        * @private
        * @return {STU.VariantValue[]} the values of this variant
        */
        Variant.prototype.getValues = function () {
            return this['values'];
        };

    /**
    * returns a value / option identified by its name
    *
    * @method
    * @private
    * @param {string} iName Name of the value to retrieve.
    */
    Variant.prototype.getValueByName = function (iName) {
        for (const value of this.values) {
            if (value.name === iName) {
                return value;
            }
        }
        return null;
    };

    /**
    * returns a value / option identified by its display name
    * WARNING: if display name is not unique, first value found is used
    * 
    * @method
    * @private
    * @param {string} iName Name of the value to retrieve.
    */
    Variant.prototype.getValueByDisplayName = function (iDisplayName) {
        for (const value of this.values) {
            if (value.displayName === iDisplayName) {
                return value;
            }
        }
        return null;
    };

    /**
    * values a Variant to a given Value / activates an option, identified by its name
    * for an option group variant: option is made active and other options are deactivated
    * @method
    * @private
    * @param {string} iName Name of the value used to value this Variant.
    */
    Variant.prototype.setCurrentValueByName = function (iName) {
        var myVariantsManager = new StuVariantsManager();
        myVariantsManager.setCurrentValueByName(this.CATI3DExpVariant2, iName);
    };


    /**
    * values the Variant to a given Value, identified by its display name
    * WARNING: if display name is not unique, first value found is used
    * for an option group variant: option is made active and other options are deactivated
    * @method
    * @private
    * @param {string} iDisplayName display name of the value used to value this Variant.
    */
    Variant.prototype.setCurrentValueByDisplayName = function (iDisplayName) {
        var myVariantsManager = new StuVariantsManager();
        myVariantsManager.setCurrentValueByDisplayName(this.CATI3DExpVariant2, iDisplayName);
    };

    /**
    *  values the Variant to a given Value
    *  for an option group variant: option is made active and other options are deactivated
    *
    * @method
    * @private
    * @param {STU.VariantValue} iValue value used to value this Variant.
    */
    Variant.prototype.setCurrentValue = function (iValue) {

        var myVariantsManager = new StuVariantsManager();
        if (null === iValue) {
            myVariantsManager.unsetCurrentValue(this.CATI3DExpVariant2);
        }
        else {
            myVariantsManager.setCurrentValue(this.CATI3DExpVariant2, iValue.CATI3DExpVariantValue);
        }
    };

    /**
    *  unvalues a Variant or deactivates all variant options
    * 
    * @method
    * @private
    */
    Variant.prototype.unsetCurrentValue = function () {
        var myVariantsManager = new StuVariantsManager();
        myVariantsManager.unsetCurrentValue(this.CATI3DExpVariant2);
    };


    /**
     * tests if the Variant is currently set to a given Value
     * for an option group variant: tests if option is active and only this option is active
     * @method
     * @private
     * @param {STU.Value} iValue value used to compare to the current value
     */
    Variant.prototype.isValueCurrent = function (iValue) {
        var myVariantsManager = new StuVariantsManager();
        if (myVariantsManager.isValueCurrent(this.CATI3DExpVariant2, iValue.CATI3DExpVariantValue) == 1) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     *  tests if the Variant is currently set to any Value or if any option group option is active
     * for an option group variant: tests if all options are active
     *
     * @method
     * @private
     */
    Variant.prototype.isNoValueCurrent = function () {
        var myVariantsManager = new StuVariantsManager();
        if (myVariantsManager.isNoValueCurrent(this.CATI3DExpVariant2) == 1) {
            return true;
        }
        else {
            return false;
        }
    };


    /**
    * Returns the value at which this Variant is currently valued
    *
    * @method
    * @private
    * @return {STU.Value} the variant at which this Variant is valued.
    */
    Variant.prototype.getCurrentValue = function () {
        var myVariantsManager = new StuVariantsManager();
        return myVariantsManager.getCurrentValue(this.CATI3DExpVariant2);
    };


    /**
    * Returns the type of this variant
    *
    * @method
    * @private
    * @return {STU.Variant.EVariantType} the type of this variant
    */
    Variant.prototype.getType = function () {
        var myVariantsManager = new StuVariantsManager();
        var myType = myVariantsManager.getVariantType(this.CATI3DExpVariant2);
        var key = Object.keys(Variant.EVariantType)[myType];
        var value = Object.values(Variant.EVariantType)[myType];
        return value;
    };
    /**
    * Returns the display Name of this variant
    *
    * @method
    * @private
    * @return {string} the display name of this variant
    */
    Variant.prototype.getDisplayName = function () {
        return this['Alternative Name'];
    };



        /**
            * useful to dispatch events from c++
            *
            * @private
        */
        Variant.prototype.doDispatchEvent = function (iEventName, iValue) {

            if (iEventName == "ValueModified") {
                if (iValue === undefined || iValue === null) {
                    var e = new STU.VariantUnvaluedEvent();
                    this.dispatchEvent(e);
                }
                else {
                    var e = new STU.VariantValuedEvent();
                    e.value = iValue;
                    this.dispatchEvent(e);
                }
            }

            if (iEventName == "OptionSet") {
                var e = new STU.VariantOptionSetEvent();
                e.option = iValue;
                this.dispatchEvent(e);
            }

            if (iEventName == "OptionUnset") {
                var e = new STU.VariantOptionUnsetEvent();
                e.option = iValue;
                this.dispatchEvent(e);
            }
        };



    /**
    * Enumeration of possible variant types.
    * see VariantType in CAT3DExpModelerInterfaces\ProtectedInterfaces\CAT3DExpVariantDefs.h
    * @enum {number}
    * @private
    */
    Variant.EVariantType = {
        eAll: 0,
        eUndefined: 1,
        eMaterial: 2,
        eVisibility: 3,
        ePackage: 4,
        eConditional: 5,
        eEnoviaDictionary: 6,
        eOptionGroup: 7
    };



    // Expose in STU namespace.
    STU.Variant = Variant;
    return Variant;
});

define('StuModel/StuVariant', ['DS/StuModel/StuVariant'], function (Variant) {
    'use strict';

    return Variant;
});

