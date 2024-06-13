define('DS/EPSDKServices/EPSDKClass', ['DS/EP/EP', 'DS/EPSDKServices/EPSDKElement'], function (EP, SDKElement) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKClass
	 * @protected
	 * @extends EP.SDKElement
	 */
	var SDKClass = function () {

		SDKElement.call(this);

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.classDescription = '';

		/**
	     *
	     *
	     * @protected
	     * @type {Array.<string>}
	     */
		this.extends = [];

		/**
	     *
	     *
	     * @protected
	     * @type {EP.SDKConstructor}
	     */
		this.constructor = undefined;
	};

	SDKClass.prototype = new SDKElement();
	SDKClass.prototype.constructor = SDKClass;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKClass.prototype.fromJSONObject = function (iJSONObject) {

	    SDKElement.prototype.fromJSONObject.call(this, iJSONObject);

	    this.classDescription = iJSONObject.classdesc || this.classDescription;
	    this.extends = iJSONObject.augments || this.extends;

	    if (iJSONObject.instantiatector !== false) {
	        this.constructor = new EP.SDKConstructor();
	        this.constructor.fromJSONObject(iJSONObject);
	    }
	};

	// Expose in EP namespace.
	EP.SDKClass = SDKClass;

	return SDKClass;
});

