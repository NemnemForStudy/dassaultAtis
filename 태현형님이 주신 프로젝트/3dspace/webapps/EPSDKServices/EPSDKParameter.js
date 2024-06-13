define('DS/EPSDKServices/EPSDKParameter', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKParameter
	 * @protected
	 */
	var SDKParameter = function () {

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.name = '';

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.description = '';

		/**
	     *
	     *
	     * @protected
	     * @type {Array.<string>}
	     */
		this.types = [];

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.defaultValue = 'undefined';

		/**
	     *
	     *
	     * @protected
	     * @type {boolean}
	     */
		this.optional = false;

		/**
	     *
	     *
	     * @protected
	     * @type {boolean}
	     */
		this.nullable = false;

		/**
	     *
	     *
	     * @protected
	     * @type {boolean}
	     */
		this.variable = false;
	};

	SDKParameter.prototype.constructor = SDKParameter;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKParameter.prototype.fromJSONObject = function (iJSONObject) {

	    this.name = iJSONObject.name || this.name;
	    this.description = iJSONObject.description || this.description;
	    this.types = iJSONObject.type && iJSONObject.type.names || this.types;
	    this.defaultValue = iJSONObject.defaultvalue || this.defaultValue;
	    this.optional = (iJSONObject.optional && iJSONObject.optional !== 'undefined') || this.optional;
	    this.nullable = (iJSONObject.nullable && iJSONObject.nullable !== 'undefined') || this.nullable;
	    this.variable = (iJSONObject.variable && iJSONObject.variable !== 'undefined') || this.variable;
	};

	// Expose in EP namespace.
	EP.SDKParameter = SDKParameter;

	return SDKParameter;
});

