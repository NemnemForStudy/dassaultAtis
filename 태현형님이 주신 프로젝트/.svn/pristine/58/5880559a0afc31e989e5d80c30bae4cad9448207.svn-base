define('DS/EPSDKServices/EPSDKFunction', ['DS/EP/EP', 'DS/EPSDKServices/EPSDKElement'], function (EP, SDKElement) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKFunction
	 * @protected
	 * @extends EP.SDKElement
	 */
	var SDKFunction = function () {

		SDKElement.call(this);

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

		/**
	     *
	     *
	     * @protected
	     * @type {Array<EP.SDKReturn>}
	     */
		this.returns = [];
	};

	SDKFunction.prototype = new SDKElement();
	SDKFunction.prototype.constructor = SDKFunction;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKFunction.prototype.fromJSONObject = function (iJSONObject) {

	    SDKElement.prototype.fromJSONObject.call(this, iJSONObject);

	    if (iJSONObject.params !== undefined) {
	        var sdkParameter;
	        for (var p = 0; p < iJSONObject.params.length; p++) {
	            sdkParameter = new EP.SDKParameter();
	            sdkParameter.fromJSONObject(iJSONObject.params[p]);
	            this.addParameter(sdkParameter);
	        }
	    }

	    if (iJSONObject.returns !== undefined) {
	        var sdkReturn;
	        for (var r = 0; r < iJSONObject.returns.length; r++) {
	            sdkReturn = new EP.SDKReturn();
	            sdkReturn.fromJSONObject(iJSONObject.returns[r]);
	            this.returns.push(sdkReturn);
	        }
	    }
	};

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKParameter} iParameter
	 */
	SDKFunction.prototype.addParameter = function (iParameter) {
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
	SDKFunction.prototype.removeParameter = function (iParameter) {
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
	SDKFunction.prototype.getParameterByName = function (iName) {
	    return this.parametersByName[iName];
	};

    /**
	 *
	 *
	 * @protected
	 * @return {Array.<EP.SDKParameter>}
	 */
	SDKFunction.prototype.getParameters = function () {
	    return this.parameters.slice(0);
	};

	// Expose in EP namespace.
	EP.SDKFunction = SDKFunction;

	return SDKFunction;
});

