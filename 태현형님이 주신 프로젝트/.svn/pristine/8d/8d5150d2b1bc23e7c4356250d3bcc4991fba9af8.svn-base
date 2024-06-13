define('DS/EPSDKServices/EPSDKElement', ['DS/EP/EP'], function (EP) {
	'use strict';

	/**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKElement
	 * @protected
	 */
	var SDKElement = function () {

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
		this.memberof = '';

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.path = '';

	    /**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.scope = 'global';

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
	     * @public
	     * @type {string}
	     */
		this.summary = '';

		/**
	     *
	     *
	     * @protected
	     * @type {string}
	     */
		this.access = 'public';

		/**
	     *
	     *
	     * @public
	     * @type {string|undefined}
	     */
		this.deprecated = undefined;

	    /**
	     *
	     *
	     * @public
	     * @type {boolean}
	     */
		this.readonly = false;

		/**
	     *
	     *
	     * @protected
	     * @type {Array.<string>}
	     */
		this.see = [];

		/**
	     *
	     *
	     * @protected
	     * @type {Array.<EP.SDKExample>}
	     */
		this.examples = [];

		/**
	     *
	     *
	     * @private
	     * @type {Array.<EP.SDKTag>}
	     */
		this.tags = [];

		/**
	     *
	     *
	     * @private
	     * @type {Object.<string, EP.SDKTag>}
	     */
		this.tagsByName = {};

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

	    /**
	     *
	     *
	     * @protected
	     * @type {boolean}
	     */
		this.sdk = false;
	};

	SDKElement.prototype.constructor = SDKElement;

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
	 */
	SDKElement.prototype.fromJSONObject = function (iJSONObject) {

	    this.name = iJSONObject.name || this.name;
	    this.memberof = iJSONObject.memberof || this.memberof;
	    this.path = iJSONObject.longname || this.path;
	    this.scope = iJSONObject.scope || this.scope;
	    this.description = iJSONObject.description || this.description;
	    this.summary = iJSONObject.summary || this.summary;
	    this.access = iJSONObject.access || this.access;
	    this.deprecated = iJSONObject.deprecated;
	    this.readonly = iJSONObject.readonly || this.readonly;
	    this.see = iJSONObject.see || this.see;

	    if (iJSONObject.examples !== undefined) {
	        var sdkExample;
	        for (var e = 0; e < iJSONObject.examples.length; e++) {
	            sdkExample = new EP.SDKExample();
	            sdkExample.fromJSONObject(iJSONObject.examples[e]);
	            this.examples.push(sdkExample);
	        }
	    }

	    if (iJSONObject.tags !== undefined) {
	        var sdkTag;
	        for (var t = 0; t < iJSONObject.tags.length; t++) {
	            sdkTag = this.tagsByName[iJSONObject.tags[t].title];
	            sdkTag = sdkTag || new EP.SDKTag();
	            sdkTag.fromJSONObject(iJSONObject.tags[t]);
	            this.addTag(sdkTag);
	        }
	    }

	    this.sdk = true;
	};

	/**
	 *
	 *
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
	SDKElement.prototype.addElement = function (iElement) {
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
	SDKElement.prototype.removeElement = function (iElement) {
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
	SDKElement.prototype.getElementByName = function (iName) {
	    return this.elementsByName[iName];
	};

	/**
	 *
	 *
	 * @protected
	 * @param {EP.SDKElement} [iSDKElementCtor] constructor function corresponding to the specific type
	 * @return {Array.<EP.SDKElement>}
	 */
	SDKElement.prototype.getElements = function (iSDKElementCtor) {
	    var elements;
	    if (iSDKElementCtor === undefined) {
	        elements = this.elements.slice(0);
	    }
	    else {
	        elements = this.elements.filter(function (element) { return element instanceof iSDKElementCtor; });
	    }
	    return elements;
	};

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKTag} iTag
	 */
	SDKElement.prototype.addTag = function (iTag) {
	    if (iTag instanceof EP.SDKTag) {
	        if (this.tags.indexOf(iTag) === -1 && this.tagsByName[iTag.name] === undefined) {
	            this.tags.push(iTag);
	            this.tagsByName[iTag.name] = iTag;
	        }
	    }
	    else {
	        throw new TypeError('iTag argument is not a EP.SDKTag instance');
	    }
	};

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKTag} iTag
	 */
	SDKElement.prototype.removeTag = function (iTag) {
	    if (iTag instanceof EP.SDKTag) {
	        var index = this.tags.indexOf(iTag);
	        if (index !== -1 && this.tagsByName[iTag.name] === iTag) {
	            delete this.tagsByName[iTag.name];
	            this.tags.splice(index, 1);
	        }
	    }
	    else {
	        throw new TypeError('iTag argument is not a EP.SDKTag instance');
	    }
	};

	/**
	 *
	 *
	 * @protected
	 * @param {string} iName
	 * @return {EP.SDKTag}
	 */
	SDKElement.prototype.getTagByName = function (iName) {
	    return this.tagsByName[iName];
	};

    /**
	 *
	 *
	 * @protected
	 * @return {Array.<EP.SDKTag>}
	 */
	SDKElement.prototype.getTags = function () {
	    return this.tags.slice(0);
	};

	// Expose in EP namespace.
	EP.SDKElement = SDKElement;

	return SDKElement;
});

