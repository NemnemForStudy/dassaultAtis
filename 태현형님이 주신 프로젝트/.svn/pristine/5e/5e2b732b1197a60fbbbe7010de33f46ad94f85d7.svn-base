
define('DS/StuModel/StuVariantValue', ['DS/StuCore/StuContext', 'DS/StuModel/StuInstance'], function (STU, Instance) {
    'use strict';

	/**
	 * Describe an Object representing a Variant Value
	 *
	 * @exports VariantValue
	 * @class
	 * @constructor
     * @noinstancector
     * @private
	 * @extends STU.Instance
     * @alias STU.VariantValue
	 */
    var VariantValue = function () {
        Instance.call(this);
        this.name = 'VariantValue';

	    /**
		 * native object CATI3DExpVariantValue
		 *
		 * @member
		 * @private
		 * @type {Object}
		 */
        this.CATI3DExpVariantValue = null; // valued by CATEVariant_StuIBuilder::Build


        /**
         * VariantValue display name
         *
         * @member
         * @instance
         * @name displayName
         * @private
         * @type {string}
         * @memberOf STU.VariantValue
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
    };

    VariantValue.prototype = new Instance();
    VariantValue.prototype.constructor = VariantValue;

    /**
    *  returns this's parent Variant
    *
    * @method
    * @private
    * @return {STU.Variant} the parent Variant
    */
    VariantValue.prototype.getVariant = function () {
        var myVariantsManager = new StuVariantsManager();
        return myVariantsManager.getParentVariant(this.CATI3DExpVariantValue);
    };

    /**
    *  values this's parent Variant to this Value
    *
    * @method
    * @private
    */
    VariantValue.prototype.setAsCurrent = function () {
        var myVariantsManager = new StuVariantsManager();
        myVariantsManager.setValueAsCurrent(this.CATI3DExpVariantValue);
    };

    /**
    * Returns the display Name of this value
    *
    * @method
    * @private
    * @return {string} the display name of this value
    */
    VariantValue.prototype.getDisplayName = function () {
        return this['Alternative Name'];
    };

    // Expose in STU namespace.
    STU.VariantValue = VariantValue;
    return VariantValue;
});

define('StuModel/StuVariantValue', ['DS/StuModel/StuVariantValue'], function (VariantValue) {
    'use strict';
    return VariantValue;
});

