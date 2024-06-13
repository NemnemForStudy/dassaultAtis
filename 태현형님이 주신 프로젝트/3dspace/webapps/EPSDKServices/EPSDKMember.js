define('DS/EPSDKServices/EPSDKMember', ['DS/EP/EP', 'DS/EPSDKServices/EPSDKElement'], function (EP, SDKElement) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKMember
	 * @protected
	 * @extends EP.SDKElement
	 */
	var SDKMember = function () {

		SDKElement.call(this);

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
	     * @type {boolean}
	     */
		this.enum = false;

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.defaultValue = 'undefined';
	};

	SDKMember.prototype = new SDKElement();
	SDKMember.prototype.constructor = SDKMember;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKMember.prototype.fromJSONObject = function (iJSONObject) {

	    SDKElement.prototype.fromJSONObject.call(this, iJSONObject);

	    this.types = iJSONObject.type && iJSONObject.type.names || this.types;
	    this.enum = iJSONObject.isEnum || this.enum;
	    this.defaultValue = iJSONObject.defaultvalue || this.defaultValue;
	};

	// Expose in EP namespace.
	EP.SDKMember = SDKMember;

	return SDKMember;
});

