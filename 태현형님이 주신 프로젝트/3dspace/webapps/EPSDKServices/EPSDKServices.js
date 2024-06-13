define('DS/EPSDKServices/EPSDKServices', ['DS/EP/EP'], function (EP) {
    'use strict';

    /**
	 *
	 *
	 * @constructor
	 * @alias EP.SDKServices
	 * @protected
	 */
    var SDKServices = function () {

		/**
	     *
	     *
	     * @private
	     * @type {EP.SDKGlobal}
	     */
        this.global = new EP.SDKGlobal();

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
		this.elementsByPath = {};
    };

    SDKServices.prototype.constructor = SDKServices;

    /**
	 *
	 *
	 * @protected
	 * @return {EP.SDKGlobal}
	 */
    SDKServices.prototype.getGlobal = function () {
        return this.global;
    };

    /**
	 *
	 *
	 * @protected
	 * @param {string} iJSON
	 */
    SDKServices.prototype.loadJSON = function (iJSON) {
        if (typeof iJSON !== 'string') {
            throw new TypeError('iJSON argument is not a string');
        }

        var jsonObjects = JSON.parse(iJSON);

        var element;
        for (var i = 0; i < jsonObjects.length; i++) {
        	element = this.createElementFromJSONObject(jsonObjects[i]);
        	if (element !== undefined) {
        		this.addElement(element);
        	}
        }

        for (var j = 0; j < this.elements.length; j++) {
            this.addElementToParent(this.elements[j]);
        }
    };

    /**
	 *
	 *
	 * @private
	 * @param {Object} iJSONObject
     * @return {EP.SDKElement}
	 */
    SDKServices.prototype.createElementFromJSONObject = function (iJSONObject) {

        var sdkElement = this.elementsByPath[iJSONObject.longname];

        if (sdkElement === undefined) {
            switch (iJSONObject.kind) {
                case 'namespace':
                    {
                        sdkElement = new EP.SDKNamespace();
                        break;
                    }
                case 'class':
                    {
                        sdkElement = new EP.SDKClass();
                        break;
                    }
                case 'function':
                    {
                        sdkElement = new EP.SDKFunction();
                        break;
                    }
                case 'member':
                    {
                        sdkElement = new EP.SDKMember();
                        break;
                    }
            	case 'package':
            		{
            			break;
            		}
                default:
                    {
                    	// eslint-disable-next-line no-console
                    	console.warn('Element ' + iJSONObject.longname + ' creation has failed: unsupported kind');
                    }
            }

            if (sdkElement !== undefined) {
            	sdkElement.fromJSONObject(iJSONObject);
            }
        }

        return sdkElement;
    };

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKElement} iElement
	 */
    SDKServices.prototype.registerElement = function (iElement) {
        if (iElement instanceof EP.SDKElement) {
            this.addElement(iElement);
            this.addElementToParent(iElement);
        }
        else {
            throw new TypeError('iElement argument is not a EP.SDKElement instance');
        }
    };

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKElement} iElement
	 */
    SDKServices.prototype.unregisterElement = function (iElement) {
        if (iElement instanceof EP.SDKElement) {
            this.removeElementFromParent(iElement);
            this.removeElement(iElement);
        }
        else {
            throw new TypeError('iElement argument is not a EP.SDKElement instance');
        }
    };

    /**
	 *
	 *
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
    SDKServices.prototype.addElement = function (iElement) {
        if (this.elements.indexOf(iElement) === -1 && this.elementsByPath[iElement.path] === undefined) {
            this.elements.push(iElement);
            this.elementsByPath[iElement.path] = iElement;
        }
    };

    /**
	 *
	 *
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
    SDKServices.prototype.removeElement = function (iElement) {
        var index = this.elements.indexOf(iElement);
        if (index !== -1 && this.elementsByPath[iElement.path] === iElement) {
            delete this.elementsByPath[iElement.path];
            this.elements.splice(index, 1);
        }
    };

	/**
	 *
	 *
	 * @protected
	 * @param {string} iPath
	 * @return {EP.SDKElement}
	 */
    SDKServices.prototype.getElementByPath = function (iPath) {
        return this.elementsByPath[iPath];
    };

    /**
	 *
	 *
	 * @protected
	 * @param {EP.SDKElement} [iSDKElementCtor] constructor function corresponding to the specific type
	 * @return {Array.<EP.SDKElement>}
	 */
    SDKServices.prototype.getElements = function (iSDKElementCtor) {
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
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
    SDKServices.prototype.addElementToParent = function (iElement) {
        if (this.elementsByPath[iElement.path] === iElement) {
            if (iElement.memberof === '') {
                this.global.addElement(iElement);
            }
            else if (this.elementsByPath[iElement.memberof] !== undefined) {
                this.elementsByPath[iElement.memberof].addElement(iElement);
            }
            else {
                // eslint-disable-next-line no-console
                console.warn('Element ' + iElement.path + ' is incomplete: Element ' + iElement.memberof + ' does not exist');
            }
        }
    };

    /**
	 *
	 *
	 * @private
	 * @param {EP.SDKElement} iElement
	 */
    SDKServices.prototype.removeElementFromParent = function (iElement) {
        if (this.elementsByPath[iElement.path] === iElement) {
            if (iElement.memberof === '') {
                this.global.removeElement(iElement);
            }
            else if (this.elementsByPath[iElement.memberof] !== undefined) {
            	this.elementsByPath[iElement.memberof].removeElement(iElement);
            }
            else {
            	// eslint-disable-next-line no-console
            	console.warn('Element ' + iElement.path + ' is incomplete: Element ' + iElement.memberof + ' does not exist');
            }
        }
    };

	/**
	 *
	 *
	 * @protected
	 * @param {Array.<EP.SDKTag>} iTags the list of all required tags with their list of allowed values
	 * @param {EP.SDKElement} [iSDKElementCtor] constructor function corresponding to the specific type
	 * @return {Array.<EP.SDKElement>}
	 */
    SDKServices.prototype.searchElementByTag = function (iTags, iSDKElementCtor) {
        return this.getElements(iSDKElementCtor).filter(function (iElement) {
            return iTags.every(function (iTag) {
                return iElement.tags.some(function (iElementTag) {
                    return iElementTag.name === iTag.name && iElementTag.values.some(function (iValue) {
                        return iTag.values.indexOf(iValue) !== -1;
                    });
                });
            });
        });
    };

	/**
	 *
	 *
	 * @protected
	 * @param {RegExp} iRegExpName
	 * @param {EP.SDKElement} [iSDKElementCtor] constructor function corresponding to the specific type
	 * @return {Array.<EP.SDKElement>}
	 */
    SDKServices.prototype.searchElementByName = function (iRegExpName, iSDKElementCtor) {
        return this.getElements(iSDKElementCtor).filter(function (iElement) {
            return iRegExpName.test(iElement.name);
        });
    };

	/**
	 *
	 *
	 * @protected
	 * @param {RegExp} iRegExpDesc
	 * @param {EP.SDKElement} [iSDKElementCtor] constructor function corresponding to the specific type
	 * @return {Array.<EP.SDKElement>}
	 */
    SDKServices.prototype.searchElementByDescription = function (iRegExpDesc, iSDKElementCtor) {
        return this.getElements(iSDKElementCtor).filter(function (iElement) {
            return iRegExpDesc.test(iElement.description);
        });
    };

	/**
	 *
	 *
	 * @protected
	 * @param {string} iParameterType
	 * @return {Array.<EP.SDKFunction>}
	 */
    SDKServices.prototype.searchFunctionByParameterType = function (iParameterType) {
        return this.getElements(EP.SDKFunction).filter(function (iElement) {
            return iElement.parameters.some(function (iParameter) {
                return iParameter.types.some(function (iType) {
                    return iType === iParameterType;
                });
            });
        });
    };

    /**
	 *
	 *
	 * @protected
	 * @param {string} iReturnType
	 * @return {Array.<EP.SDKFunction>}
	 */
    SDKServices.prototype.searchFunctionByReturnType = function (iReturnType) {
        return this.getElements(EP.SDKFunction).filter(function (iElement) {
            return iElement.returns.some(function (iReturn) {
                return iReturn.types.some(function (iType) {
                    return iType === iReturnType;
                });
            });
        });
    };

	/**
	 *
	 *
	 * @protected
	 * @param {string} iMemberType
	 * @return {Array.<EP.SDKMember>}
	 */
    SDKServices.prototype.searchMemberByType = function (iMemberType) {
        return this.getElements(EP.SDKMember).filter(function (iElement) {
            return iElement.types.some(function (iType) {
                return iType === iMemberType;
            });
        });
    };

	/**
	 *
	 *
	 * @protected
	 * @param {string} iParentType
	 * @return {Array.<EP.SDKClass>}
	 */
    SDKServices.prototype.searchClassByParentType = function (iParentType) {
        return this.getElements(EP.SDKClass).filter(function (iElement) {
            return iElement.extends.some(function (iType) {
                return iType === iParentType;
            });
        });
    };

    // Expose in EP namespace.
    EP.SDKServices = SDKServices;

    return SDKServices;
});

