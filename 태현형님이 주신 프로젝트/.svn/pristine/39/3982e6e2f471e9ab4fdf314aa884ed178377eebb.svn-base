
define('DS/StuModel/StuOptionGroup', [
    'DS/StuCore/StuContext',
    'DS/StuModel/StuVariant'
], function (STU, Variant) {
    'use strict';

    /**
     * Describe an Object representing an Experience Variant
     *
     * @exports OptionGroup
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Variant
     * @alias STU.OptionGroup
     */
    var OptionGroup = function () {
        Variant.call(this);
        this.name = 'OptionGroup';
    };

        OptionGroup.prototype = new Variant();
        OptionGroup.prototype.constructor = OptionGroup;


        /* OPTION GROUP */

        /**
         * Process to execute when this STU.Instance is activating. 
         * The instance is responsible for calling updateActivity on its children
         *
         * @method
         * @private
         */
        OptionGroup.prototype.onActivate = function (oExceptions) {
            Variant.prototype.onActivate.call(this, oExceptions);

            var myVariantsManager = new StuVariantsManager();
            myVariantsManager.saveOptionsState(this.CATI3DExpVariant2);

            
        };


        /**
            * activates an option in an option group variant, identified by its name
            * multiple options may simultaneously be activated in an option group
            * @method
            * @private
            * @param {string} iName Name of the value used to value this Variant.
            */
        OptionGroup.prototype.setOptionByName = function (iName) {
            var myVariantsManager = new StuVariantsManager();
            var myValue = getValueByName(iName);
            var state = 1;
            myVariantsManager.setOptionState(this.CATI3DExpVariant2, myValue.CATI3DExpVariantValue,state);
        };
        /**
            * deactivates an option in an option group variant, identified by its name
            * multiple options may simultaneously be activated in an option group
            * @method
            * @private
            * @param {string} iName Name of the value used to value this OptionGroup.
            */
        OptionGroup.prototype.unsetOptionByName = function (iName) {
            var myVariantsManager = new StuVariantsManager();
            var myValue = getValueByName(iName);
            var state = 0;
            myVariantsManager.setOptionState(this.CATI3DExpVariant2, myValue.CATI3DExpVariantValue, state);
        };


        /**
        * activates an option in an option group variant, identified by its display name
        * multiple options may simultaneously be activated in an option group
        * WARNING: if display name is not unique, first value found is used
        * @method
        * @private
        * @param {string} iDisplayName display name of the value used to value this Variant.
        */
        OptionGroup.prototype.setOptionByDisplayName = function (iDisplayName) {
            var myVariantsManager = new StuVariantsManager();
            var myValue = getValueByDisplayName(iDisplayName);
            var state = 1;
            myVariantsManager.setOptionState(this.CATI3DExpVariant2, myValue.CATI3DExpVariantValue, state);
        };

        /**
        * deactivates an option in an option group variant, identified by its display name
        * multiple options may simultaneously be activated in an option group
        * WARNING: if display name is not unique, first value found is used
        * @method
        * @private
        * @param {string} iDisplayName display name of the value used to value this Variant.
        */
        OptionGroup.prototype.unsetOptionByDisplayName = function (iDisplayName) {
            var myVariantsManager = new StuVariantsManager();
            var myValue = getValueByDisplayName(iDisplayName);
            var state = 0;
            myVariantsManager.setOptionState(this.CATI3DExpVariant2, myValue.CATI3DExpVariantValue, state);
        };

        /**
        * activates an option in an option group variant
        * multiple options may simultaneously be activated in an option group
        *
        * @method
        * @private
        * @param {STU.VariantValue} iValue value used to value this OptionGroup.
        */
        OptionGroup.prototype.setOption = function (iValue) {

            var myVariantsManager = new StuVariantsManager();
            var state = 1;
            myVariantsManager.setOptionState(this.CATI3DExpVariant2, iValue.CATI3DExpVariantValue, state);
        };

        /**
       * deactivates an option in an option group variant
       * multiple options may simultaneously be activated in an option group
       *
       * @method
       * @private
       * @param {STU.VariantValue} iValue value used to value this OptionGroup.
       */
        OptionGroup.prototype.unsetOption = function (iValue) {

            var myVariantsManager = new StuVariantsManager();
            var state = 0;
            myVariantsManager.setOptionState(this.CATI3DExpVariant2, iValue.CATI3DExpVariantValue, state);
        };



     /**
     * tests if an option group has an option activated
     * @method
     * @private
     * @param {STU.Value} iValue option to test
     */
        OptionGroup.prototype.isOptionSet = function (iValue) {
            var myVariantsManager = new StuVariantsManager();
            if (myVariantsManager.getOptionState(this.CATI3DExpVariant2, iValue.CATI3DExpVariantValue) == 1) {
                return true;
            }
            else {
                return false;
            }
        };

     /**
     * tests if an option group has an option deactivated
     * @method
     * @private
     * @param {STU.Value} iValue option to test
     */
        OptionGroup.prototype.isOptionUnset = function (iValue) {
            var myVariantsManager = new StuVariantsManager();
            if (myVariantsManager.getOptionState(this.CATI3DExpVariant2, iValue.CATI3DExpVariantValue) == 0) {
                return true;
            }
            else {
                return false;
            }
        };

    // Expose in STU namespace.
        STU.OptionGroup = OptionGroup;
        return OptionGroup;
});

define('StuModel/StuOptionGroup', ['DS/StuModel/StuOptionGroup'], function (OptionGroup) {
    'use strict';

    return OptionGroup;
});

