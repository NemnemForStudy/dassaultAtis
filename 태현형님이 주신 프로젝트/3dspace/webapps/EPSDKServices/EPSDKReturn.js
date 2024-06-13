define('DS/EPSDKServices/EPSDKReturn', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKReturn
	 * @protected
	 */
	var SDKReturn = function () {

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
	};

	SDKReturn.prototype.constructor = SDKReturn;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKReturn.prototype.fromJSONObject = function (iJSONObject) {

	    this.description = iJSONObject.description || this.description;
	    this.types = iJSONObject.type && iJSONObject.type.names || this.types;
	};

	// Expose in EP namespace.
	EP.SDKReturn = SDKReturn;

	return SDKReturn;
});

