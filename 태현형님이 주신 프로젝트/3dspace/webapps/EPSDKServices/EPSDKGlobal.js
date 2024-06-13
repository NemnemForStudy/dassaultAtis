define('DS/EPSDKServices/EPSDKGlobal', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKGlobal
	 * @protected
	 */
	var SDKGlobal = function () {

		/**
	     *
	     *
	     * @private
	     * @type {Array.<EP.SDKElement>}
	     */
		this.elements = [];

		/**
	     *
	     *
	     * @private
	     * @type {Object.<string, EP.SDKElement>}
	     */
		this.elementsByName = {};
	};

	SDKGlobal.prototype.constructor = SDKGlobal;

    /**
	 *
	 *
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
	SDKGlobal.prototype.addElement = function (iElement) {
	    if (this.elements.indexOf(iElement) === -1 && this.elementsByName[iElement.name] === undefined) {
	        this.elements.push(iElement);
	        this.elementsByName[iElement.name] = iElement;
	    }
	};

    /**
	 *
	 *
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
	SDKGlobal.prototype.removeElement = function (iElement) {
	    var index = this.elements.indexOf(iElement);
	    if (index !== -1 && this.elementsByName[iElement.name] === iElement) {
	        delete this.elementsByName[iElement.name];
	        this.elements.splice(index, 1);
	    }
	};

    /**
	 *
	 *
	 * @protected
	 * @param {string} iName
	 * @return {EP.SDKElement}
	 */
	SDKGlobal.prototype.getElementByName = function (iName) {
	    return this.elementsByName[iName];
	};

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKElement} [iSDKElementCtor] constructor function corresponding to the specific type
	 * @return {Array.<EP.SDKElement>}
	 */
	SDKGlobal.prototype.getElements = function (iSDKElementCtor) {
	    var elements;
	    if (iSDKElementCtor === undefined) {
	        elements = this.elements.slice(0);
	    }
	    else {
	        elements = this.elements.filter(function (element) { return element instanceof iSDKElementCtor; });
	    }
	    return elements;
	};

	// Expose in EP namespace.
	EP.SDKGlobal = SDKGlobal;

	return SDKGlobal;
});

