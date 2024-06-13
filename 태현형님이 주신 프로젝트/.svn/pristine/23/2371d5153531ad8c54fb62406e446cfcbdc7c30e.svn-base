define('DS/EPSDKServices/EPSDKExample', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKExample
	 * @protected
	 */
	var SDKExample = function () {

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.caption = '';

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.code = '';

	};

	SDKExample.prototype.constructor = SDKExample;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKExample.prototype.fromJSONObject = function (iJSONObject) {

	    this.caption = iJSONObject.caption || this.caption;
	    this.code = iJSONObject.code || this.code;
	};

	// Expose in EP namespace.
	EP.SDKExample = SDKExample;

	return SDKExample;
});

