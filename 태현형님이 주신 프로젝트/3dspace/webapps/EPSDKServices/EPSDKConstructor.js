define('DS/EPSDKServices/EPSDKConstructor', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKConstructor
	 * @protected
	 */
	var SDKConstructor = function () {

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
	     * @private
	     * @type {Array.<EP.SDKParameter>}
	     */
		this.parameters = [];

	    /**
	     *
	     *
	     * @private
	     * @type {Object.<string, EP.SDKParameter>}
	     */
		this.parametersByName = {};
	};

	SDKConstructor.prototype.constructor = SDKConstructor;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKConstructor.prototype.fromJSONObject = function (iJSONObject) {

	    this.description = iJSONObject.constructordesc || this.description;

	    if (iJSONObject.params !== undefined) {
	        var sdkParameter;
	        for (var p = 0; p < iJSONObject.params.length; p++) {
	            sdkParameter = new EP.SDKParameter();
	            sdkParameter.fromJSONObject(iJSONObject.params[p]);
	            this.addParameter(sdkParameter);
	        }
	    }
	};

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKParameter} iParameter
	 */
	SDKConstructor.prototype.addParameter = function (iParameter) {
	    if (iParameter instanceof EP.SDKParameter) {
	        if (this.parameters.indexOf(iParameter) === -1 && this.parametersByName[iParameter.name] === undefined) {
	            this.parameters.push(iParameter);
	            this.parametersByName[iParameter.name] = iParameter;
	        }
	    }
	    else {
	        throw new TypeError('iParameter argument is not a EP.SDKParameter instance');
	    }
	};

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKParameter} iParameter
	 */
	SDKConstructor.prototype.removeParameter = function (iParameter) {
	    if (iParameter instanceof EP.SDKParameter) {
	        var index = this.parameters.indexOf(iParameter);
	        if (index !== -1 && this.parametersByName[iParameter.name] === iParameter) {
	            delete this.parametersByName[iParameter.name];
	            this.parameters.splice(index, 1);
	        }
	    }
	    else {
	        throw new TypeError('iParameter argument is not a EP.SDKParameter instance');
	    }
	};

    /**
	 *
	 *
	 * @protected
	 * @param {string} iName
	 * @return {EP.SDKParameter}
	 */
	SDKConstructor.prototype.getParameterByName = function (iName) {
	    return this.parametersByName[iName];
	};

    /**
	 *
	 *
	 * @protected
	 * @return {Array.<EP.SDKParameter>}
	 */
	SDKConstructor.prototype.getParameters = function () {
	    return this.parameters.slice(0);
	};

	// Expose in EP namespace.
	EP.SDKConstructor = SDKConstructor;

	return SDKConstructor;
});

