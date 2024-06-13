define('DS/EPSDKServices/EPSDKTag', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKTag
	 * @protected
	 */
	var SDKTag = function () {

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
	     * @type {Array.<string>}
	     */
		this.values = [];

	};

	SDKTag.prototype.constructor = SDKTag;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKTag.prototype.fromJSONObject = function (iJSONObject) {

	    this.name = iJSONObject.title || this.name;
	    this.values.push(iJSONObject.value || '');
	};

	// Expose in EP namespace.
	EP.SDKTag = SDKTag;

	return SDKTag;
});

