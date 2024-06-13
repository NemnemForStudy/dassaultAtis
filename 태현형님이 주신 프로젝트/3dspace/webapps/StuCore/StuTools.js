define('DS/StuCore/StuTools', ['DS/StuCore/StuContext'], function (STU) {
	'use strict';

	/**
	 * An enumeration for trace level
	 *
	 * @enum {number}
	 * @private
	 * @memberof STU
	 */
	STU.eTraceMode = {
		/**
		 * @private
		 */
		eNone: 0,
		/**
		* @private
		*/
		eError: 1,
		/**
		* @private
		*/
		eWarning: 2,
		/**
		* @private
		*/
		eInfo: 3,
		/**
		* @private
		*/
		eVerbose: 4
	};

	/**
	 * STU.traceMode current trace level. traceCb uses this to know whether or not it needs
	 * to trace or not what you gave him. At this point you should be careful with this one
	 * because it applies to all modules and code parts if traceModule is null!
	 *
	 * @property traceMode
	 * @private
	 * @static
	 * @type {Object}
	 * @default object
	 */
	STU.traceMode = STU.eTraceMode.eVerbose;

	/**
	 * STU.traceModule is used to specify if you want to trace specific modules or not!
	 * If STU.traceModule is null you will basically uses STU.traceMode for everyone !
	 * If on the contrary STU.traceModule is not null then the code expects to
	 * found the traceMOde for specific modules written in it. Thus if the caller of
	 * trace took care of providing that information then the traceMode specified will
	 * be used instead of the global one !
	 *
	 * @property traceModule
	 * @private
	 * @static
	 * @type {Object}
	 * @default object
	 */
	STU.traceModules = null;

	/**
	 * This method allows you to trace information or error message to the console or to the currently registered
	 * listener for debug messages withing the native stack. As the debug experience in the native stack is not yet
	 * what one might dream of you should trace aggressively. You should specify as much as possible the 'module'
	 * from which you are tracing so that users can enable tracing selectively and get a wealth of information
	 * without being overflowed by messages from other parts of the code.
	 * It is worth noting that you provide as first argument a function that returns the message to be traced out
	 * this ensure that the message itself (which might involve costly string and stringification operations) will
	 * run only if you are actually tracing. If not that costly function will not even be called and we can
	 * even expect that advanced JIT will inline the call to trace and the test within out if you are not changing at play the current traceMode!
	 *
	 * @method trace
	 * @private
	 * @static
	 * @param {Function} iMessageCb a function that will return the string to be traced in case iLivel and iModule when checked again STU.traceMode
	 * or against information in traceModules inform the system to trace.
	 * @param {Numeric} iLevel must be one of the level defined in STU.eTraceMode.
	 * @param {string} iModule a sort of 'module' name as far tracing is concerned as there is no module system yet. If that module is defined in
	 * STU.traceModules iLevel will be used against the level defined there. If that module is not defined in STU.traceModules while traceModules
	 * exist nothing will be traced. It STU.traceModules is not defined iLevel will be compared to STU.traceMode.
	 */
	STU.trace = function (iMessageCb, iLevel, iModule) {
		var level = iLevel || STU.eTraceMode.eError;
		var currentTraceLevel = STU.traceMode;
		if (iModule !== undefined && (typeof iModule === 'string') && STU.traceModules !== null) {
			if (STU.traceModules[iModule] !== undefined) {
				currentTraceLevel = STU.traceModules[iModule];
			} else {
				currentTraceLevel = STU.eTraceMode.eNone;
			}
		}
		if (level <= currentTraceLevel) {
			console.debug(iMessageCb());
		}
	};

	/**
	 * Will push the item only if the item is not
	 * part of the array already !
	 *
	 * @method pushUnique
	 * @private
	 * @static
	 * @param {Array} iArray is the array on which you want to perform a remove.
	 * @param {Object} iItem the item to add to the array if it is not ther already!
	 * @return {Object} returns modified iArray.
	 */
	STU.pushUnique = function (iArray, iItem) {

		if (Array.isArray(iArray)) {
			if (iArray.indexOf(iItem) === -1) {
				// then add as it is not there already!
				iArray.push(iItem);
			}

			return iArray;
		} else {
			return null;
		}
	};

	/**
	 * We need a remove method in quite a lot of places!
	 * Let's write this one only once!
	 *
	 * @method remove
	 * @private
	 * @static
	 * @param {Array} iArray is the array on which you want to perform a remove.
	 * @param {Object} iItem the item that you want to remove from the array.
	 * @return {Object} returns modified iArray.
	 */
	STU.remove = function (iArray, iItem) {
		if (Array.isArray(iArray)) {
			var index = iArray.indexOf(iItem);
			if (index !== -1) {
				iArray.splice(index, 1);
			}
			return iArray;
		} else {
			return null;
		}
	};

	/**
	 * Let's clear the whole content of the array!
	 *
	 * @method pushUnique
	 * @private
	 * @static
	 * @param {Array} iArray is the array on which you want to perform a remove.
	 * @return {Object} returns iArray after modification.
	 */
	STU.clear = function (iArray) {
		if (Array.isArray(iArray)) {
			iArray.length = 0;
			return iArray;
		} else {
			return null;
		}
	};

	/**
	 * Generate a new GUID
	 *
	 * @method GUID
	 * @private
	 * @static
	 * @return {string} the guid
	 */
	STU.GUID = function () {
		// See http://www.ietf.org/rfc/rfc4122.txt for complete spec.
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function (character) {
				var repl = Math.random() * 16 | 0,
					value = character === 'x' ? repl : (repl & 0x3 | 0x8);
				return value.toString(16).toUpperCase();
			});
	};

	/**
	 * Within Studio for the moment attributes on properties are encoded in a rather awkward way.
	 * Until we think and do better this method might do a rather ugly part of the job and search
	 * for you whether an object exposes and attribute for a specific property.
	 *
	 * @method getAttribute
	 * @private
	 * @static
	 * @param {Object} iObj is the object on which you are working and that you want to test for
	 * presence of an attribute for the property iPropName.
	 * @param {string} iPropName the name of the property for which you want to retrieve attributes
	 * if there is any.
	 * @return {Array} returns an array containing all the potential attributes of the specified
	 * property.
	 */
	STU.getAttribute = function (iObj, iPropName) {
		var attrStr = iPropName + "_attr";

		var attributes = [];

		for (var propName in iObj) {
			if (iObj.hasOwnProperty(propName)) {
				if (propName.indexOf(attrStr) !== -1) {
					attributes.push(iObj[propName]);
				}
			}
		}

		return attributes;
	};

	/**
	 * This is not extremely performant but at the moment on the JS model you can still express
	 * non aggregation relation (in terms of model) by adding attributes for properties that
	 * would be non aggregating references to other object / STU.Instance . This is used
	 * among other things in the stringiifcation process. Thus being able to tell in a convenient
	 * way wether a property is a 'weak' (aka non aggragting) reference on another object is a plus.
	 * This method allows you to determine that easily. If on iObj, iPropName is a such a weak reference
	 * then the method will return true.
	 *
	 * @method isWeakRef
	 * @private
	 * @static
	 * @param {Object} iObj is the object on which you are working and that you want to test for
	 * presence of a weakRef attribute for the property iPropName.
	 * @param {string} iPropName the name of the property for which you want the info.
	 * @return {boolean} returns true if propName is indeed a weak reference on another object.
	 * property.
	 */
	STU.isWeakRef = function (iObj, iPropName) {
		var attributes = STU.getAttribute(iObj, iPropName);

		for (var i = 0; i < attributes.length; i += 1) {
			var tmpVal = attributes[i].Value;
			if (tmpVal !== undefined && tmpVal !== null) {
				if (typeof tmpVal === 'string' && (tmpVal.indexOf("weakPtr") !== -1)) {
					return true;
				}
			}
		}

		return false;
	};

	/**
	 * Build a handler function from the provided object and its function
	 *
	 * @method makeListener
	 * @private
	 * @static
	 * @param {Object} iObj the object listener containing the function corresponding to the provided name
	 * @param {string} iFctName the function name
	 * @return {Function} the created function listener
	 */
	STU.makeListener = function (iObj, iFctName) {
		return function (iEvt) {
			iObj[iFctName](iEvt);
		};
	};

	/**
	 * Build a path from a STU.Instance element
	 * [STU.Experience, STU.Actor, ...]
	 *
	 * @method buildPathElement
	 * @private
	 * @static
	 * @param {Object} iObj the STU.Instance element allowing to build the path
	 * @return {Array.<string>} the created path
	 */
	STU.buildPathElement = function (iObj) {
		var aPathElement = [];

		var parent = iObj;
		while (parent !== null && parent !== undefined && (parent instanceof STU.Instance)) {
			aPathElement.unshift(parent.getName());
			parent = parent.getParent();
		}

		return aPathElement.slice(0);
	};

	/**
	 * Retrieve the STU.Instance element from a path
	 *
	 * @method resolveElementFromPath
	 * @private
	 * @static
	 * @param {Array.<string>} iPathElement the path
	 * @return {STU.Instance} the STU.Instance retrieved
	 */
	STU.resolveElementFromPath = function (iPathElement) {
		if (!Array.isArray(iPathElement)) return null;
		if (iPathElement.length === 0) return null;

		var expVar = STU.Experience.getCurrent();

		if (typeof iPathElement[0] === "string") {
			if (iPathElement[0] == expVar.getName()) {
				if (iPathElement.length === 1) return expVar;
				var count = 1;

				var sceneVar = STU.Experience.getCurrent().getCurrentScene();
				if (sceneVar != null) {
					if (iPathElement[count] == sceneVar.getName()) {
						count++;
					}
				}

				var actorVar = expVar.getActorByName(iPathElement[count]);
				if (undefined === actorVar || null === actorVar) {
					return null;
				}
				count++;

				while (count < iPathElement.length) {
					actorVar = actorVar.getSubActorByName(iPathElement[count]);
					count++;
					if (undefined === actorVar || null === actorVar) {
						return null;
					}
				}
				return actorVar;
			}
		}

		return null;
	};

	/**
	 * Function given to JSON.stringify to trunc numerics values
	 *
	 * @method ODTFloor
	 * @private
	 * @static
	 * @param {string} iDump text to dump
	 */
	STU.ODTFloor = function (key, val) {
		return (val !== null && val !== undefined && val.toFixed) ? Number(val.toFixed(5)) : val;
	};


	/**
	 * Dump to console
	 *
	 * @method JSDump
	 * @private
	 * @static
	 * @param {string} iDump text to dump
	 */
	STU.JSDump = function (iDump) {
		if (typeof iDump !== 'string') return;

		if (typeof STUTST === "object" && typeof STUTST.JSDumpOdt === 'function') {
			STUTST.JSDumpOdt(iDump);
		} else {
			var aStr = iDump.split("\n");

			var count = aStr.length;
			for (var i = 0; i < count; i++) {
				console.log(aStr[i]);
			}
		}

		return;
	};

	/**
	 * decompose a number in it triplet {sign,mantissa,exponent}
	 *
	 * @method getNumberExponentialParts
	 * @private
	 * @static
	 * @param {Number} x the value
	 */
	STU.getNumberExponentialParts = function (x) {
		var parts = {
			sign: 0,
			mantissa: 0,
			exponent: 0
		};

		if ((typeof x !== "number") || isNaN(x))
			throw new TypeError("value must be a Number");

		if (!(isFinite(x)))
			throw new RangeError("value is out of valid range");

		if (x === 0) {
			return parts;
		}

		var partsTab = (((x.toExponential()).toString()).toLowerCase()).split("e");
		parts.exponent = Number(partsTab[1]);
		parts.mantissa = Number(partsTab[0]);
		parts.sign = (parts.mantissa === 0) ? 0 : ((parts.mantissa > 0) ? 1 : -1);
		parts.mantissa = parts.sign * parts.mantissa;

		return parts;
	};

	/**
	 * Function given to JSON.stringify to trunc numerics values.
	 * the trucated precision depend on the value order
	 *
	 * @method ODTScaledFloor
	 * @private
	 * @static
	 * @param {string} iDump text to dump
	 */
	STU.ODTScaledFloor = function (key, val) {
		if (typeof val === "number") {
			var valParts = STU.getNumberExponentialParts(val);
			if (valParts.exponent <= 2) return STU.ODTFloor(key, val);
			else {
				if (valParts.exponent >= 3) return val.toFixed ? Number(val.toFixed(4)) : val;;
			}
		}
		return val;
	};

	/**
	 * Service to bind a variable through the CATI3DExperienceObject interface
	 * 
	 * @method bindVariable
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} varName 
	 * @param {string} type expected type for the variable
	 */
	STU.bindVariable = function (self, varName, type) {
		Object.defineProperty(self, varName, {
			enumerable: true,
			configurable: true,
			get: function () {
				if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
					return self.CATI3DExperienceObject.GetValueByName(varName);
				}
			},
			set: function (value) {
				if (!self.initialized) {
					return;
				}
				if (typeof value !== type) {
					throw new TypeError('given value is not a ' + type);
				}
				if (self.CATI3DExperienceObject !== undefined && self.CATI3DExperienceObject !== null) {
					self.CATI3DExperienceObject.SetValueByName(varName, value);
				}
			}
		});
	};

	/**
	 * Service to bind an enum variable through the CATI3DExperienceObject interface
	 * 
	 * 
	 * @method bindVariableEnum
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} params.varName model variable name representing the property (if undefined, we use the propName)
	 * @param {string} params.propName js property name representing the model variable (if undefined, we use the varName)
	 * @param {Object} params.delegate another experience object hosting the variables to be bound
	 * 									by default, will be taken on self, but can be overriden
	 * @param {Object} params.enum object representing the enum
	 */
	 STU.bindVariableEnum = function (self, params) {

		if(params == undefined) 
			throw new TypeError('no input parameters');

		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject; // TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object
		var enumObj = params.enum;


		if(mdl == undefined)
			throw new TypeError('no model object to bind');

		if(propName == undefined) 
			throw new TypeError('no property name to bind');

		if(enumObj == undefined) 
			throw new TypeError('no enum provided');

		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {									
				let v = Number(mdl.GetValueByName(varName));
				return v;
				
			},
			set: function (value) {					
				if (typeof value !== "number") {
					throw new TyeError('input value for <' + propName + '> is not an enum value');
				}								
				
				for (var e in enumObj) {
					if(value == enumObj[e]) {
						mdl.SetValueByName(varName, value);
						return;			
					}
				}
				
				throw new TyeError('input value for <' + propName + '> is not part of enum values');
			}
		});
	};
	

	/**
	 * Service to bind a boolean variable through the CATI3DExperienceObject interface
	 * 
	 * 
	 * @method bindVariableBoolean
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} params.varName model variable name representing the property (if undefined, we use the propName)
	 * @param {string} params.propName js property name representing the model variable (if undefined, we use the varName)
	 * @param {Object} params.delegate another experience object hosting the variables to be bound
	 * 									by default, will be taken on self, but can be overriden
	 */
	STU.bindVariableBoolean = function (self, params) {

		if(params == undefined) {
			throw new TypeError('no input parameters');
		}

		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject; // TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object

		if(mdl == undefined)
			throw new TypeError('no model object to bind');

		if(propName == undefined) 
			throw new TypeError('no property name to bind');

		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {									
				let v = Boolean(mdl.GetValueByName(varName));				
				return v;
				
			},
			set: function (value) {
				if (!self.initialized) {
					return;
				}
				if (typeof value !== "boolean") {
					throw new TyeError('input value for <' + propName + '> is not a boolean');
				}										
				mdl.SetValueByName(varName, value);				
			}
		});
	};

	/**
	 * Service to bind a double variable through the CATI3DExperienceObject interface
	 * 
	 * If min is not undefined, input value will be checked against the min value
	 * 	if below, the value will be clamped and a warning displayed
	 * If max is not undefined, input value will be checked against the max value
	 * 	if above, the value will be clamped and a warning displayed
	 * 
	 * @method bindVariableDouble
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} params.varName model variable name representing the property (if undefined, we use the propName)
	 * @param {string} params.propName js property name representing the model variable (if undefined, we use the varName)
	 * @param {Object} params.delegate another experience object hosting the variables to be bound
	 * 									by default, will be taken on self, but can be overriden
	 * @param {string} params.min minimum input value if not undefined
	 * @param {string} params.max minimum input value if not undefined
	 */
	 STU.bindVariableDouble = function (self, params) {

		if(params == undefined) {
			throw new TypeError('no input parameters');
		}
		
		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject; // TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object

		if(mdl == undefined)
			throw new TypeError('no model object to bind');

		if(propName == undefined) 
			throw new TypeError('no property name to bind');

		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {				
				return mdl.GetValueByName(varName);				
			},
			set: function (value) {
				if (!self.initialized) {
					return;
				}
				if (typeof value !== "number") {
					throw new TypeError('input value for <' + propName + '> is not a number');
				}				
				else if(params.min != undefined && value < params.min) {
					console.warn('input value for <' + propName + '> is inferior the expected minimum, value has been clamped');
					value = params.min;
				}
				else if(params.max != undefined && value > params.max) {
					console.warn('input value for <' + propName + '> is superior the expected maximum, value has been clamped');
					value = params.max;
				}
				
				//console.log("setting value " + params.varName + " " + value);
				mdl.SetValueByName(varName, value);
				
			}
		});
	};

	/**
	 * Service to bind a double variable through the CATI3DExperienceObject interface
	 * 
	 * Note: this service is currently a bypass tricking to use STU.Color bindings until 
	 * the datamodel is really using [0,1] VCX  colors variables
	 * 
	 * 
	 * @method bindVariableColorRGBToColorSpec
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} params.varName model variable name representing the property (if undefined, we use the propName)
	 * @param {string} params.propName js property name representing the model variable (if undefined, we use the varName)
	 * @param {Object} params.delegate another experience object hosting the variables to be bound
	 * 									by default, will be taken on self, but can be overriden
	 */
	STU.bindVariableColorRGBToColorSpec = function (self, params) {

		if(params == undefined) {
			throw new TypeError('no input parameters');
		}
		
		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject;	// TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object				
		var obj = params.delegate != undefined ? params.delegate : self;

		if(mdl == undefined)
			throw new Error('no model object to bind');

		if(propName == undefined) 
			throw new Error('no property name to bind');

		if(obj[varName] == undefined)
			throw new Error('no model variable to bind');

		var objColMdl = obj[varName].CATI3DExperienceObject;
		if(objColMdl == undefined) 
			throw new Error('no color model object to bind');

		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {
				var color = new STU.Color();
				color.r = objColMdl.GetValueByName("r")
				color.g = objColMdl.GetValueByName("g");
				color.b = objColMdl.GetValueByName("b");

				return color.toColorRGB();

			},
			set: function (value) {			
				if (!(value instanceof STU.ColorRGB)) {
					throw new TypeError('input value for <' + propName + '> is not a number');
				}				
								
				var color = value.toColor();					
				objColMdl.SetValueByName("r", color.r)
				objColMdl.SetValueByName("g", color.g);
				objColMdl.SetValueByName("b", color.b);
			}
		});
	};

	/*
	Same as above, but proxyfied
	*/
	STU.bindVariableColorRGBToColorSpec_Proxy = function (self, params) {

		if(params == undefined) {
			throw new TypeError('no input parameters');
		}
		
		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject;	// TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object				
		var obj = params.delegate != undefined ? params.delegate : self;

		if(mdl == undefined)
			throw new Error('no model object to bind');

		if(propName == undefined) 
			throw new Error('no property name to bind');

		if(obj[varName] == undefined)
			throw new Error('no model variable to bind');

		var objColMdl = obj[varName].CATI3DExperienceObject;
		if(objColMdl == undefined) 
			throw new Error('no color model object to bind');

		var handlers = {
			set: function (iObj, iProp, iValue) {
				if (["r", "g", "b"].includes(iProp)) {
					objColMdl.SetValueByName(iProp, iValue*255);	// we are switching to [0, 255] as value here a provided for a ColorRGB in [0,1]					
				}
				else {
					throw new TypeError('invalid color property "' + iProp + '"');
				}

				return true;
			},
			get: function(iObj, iProp) {

				if (["r", "g", "b"].includes(iProp)) {
					let val = objColMdl.GetValueByName(iProp) / 255; // we are switching to [0, 1] as value here is taken from a Color_Spec in [0,255]	
					return val;
				}
				else if (typeof iObj[iProp] === "function") {
					return (...args) => {						
						// object may have changed on cpp side without the proxy knowing
						var color = new STU.Color();
						color.r = objColMdl.GetValueByName("r")
						color.g = objColMdl.GetValueByName("g");
						color.b = objColMdl.GetValueByName("b");		
						var colorRGB = color.toColorRGB();


						var ret = colorRGB[iProp](...args);

						var newColor = colorRGB.toColor();
						for (var prop of ["r", "g", "b"]) {
							
							// if called function has changed the color, let's update the model
							if (color[prop] !== newColor[prop]) {
								objColMdl.SetValueByName(prop, color[prop]);
							}
						}
						
						if (ret == colorRGB) {
							// there are corner cases where ret could be an object or an array containing a reference to iObj
							//  and not the object itself that we will not manage here and assume they will not happen
							ret = new Proxy(colorRGB, handlers);
						}
						return ret;
					}
				}
				return undefined;
				//return iObj[iProp];	// not sure if needed
			}
		};


		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {								
				var color = new STU.Color();
				color.r = objColMdl.GetValueByName("r")
				color.g = objColMdl.GetValueByName("g");
				color.b = objColMdl.GetValueByName("b");		

				let proxy = new Proxy(color.toColorRGB(), handlers);
				return proxy;				
			},
			set: function (value) {
				if (!(value instanceof STU.ColorRGB)) {
					throw new TypeError('input value is not a STU.ColorRGB');
				}

				var color = value.toColor();
				objColMdl.SetValueByName("r", color.r)
				objColMdl.SetValueByName("g", color.g);
				objColMdl.SetValueByName("b", color.b);
			}
		});
	};


	/**
	 * Service to bind a double variable through the CATI3DExperienceObject interface
	 * 
	 * Note: this service is currently a bypass tricking to use STU.Color bindings until 
	 * the datamodel is really using [0,1] VCX  colors variables
	 * 
	 * 
	 * @method bindVariableColorToColorSpec
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} params.varName model variable name representing the property (if undefined, we use the propName)
	 * @param {string} params.propName js property name representing the model variable (if undefined, we use the varName)
	 * @param {Object} params.delegate another experience object hosting the variables to be bound
	 * 									by default, will be taken on self, but can be overriden
	 */
	STU.bindVariableColorToColorSpec = function (self, params) {

		if (params == undefined) {
			throw new TypeError('no input parameters');
		}

		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject;	// TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object				
		var obj = params.delegate != undefined ? params.delegate : self;

		if (mdl == undefined)
			throw new Error('no model object to bind');

		if (propName == undefined)
			throw new Error('no property name to bind');

		if (obj[varName] == undefined)
			throw new Error('no model variable to bind');

		var objColMdl = obj[varName].CATI3DExperienceObject;
		if (objColMdl == undefined)
			throw new Error('no color model object to bind');

		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {
				var color = new STU.Color();
				color.r = objColMdl.GetValueByName("r")
				color.g = objColMdl.GetValueByName("g");
				color.b = objColMdl.GetValueByName("b");

				return color;

			},
			set: function (value) {
				if (!(value instanceof STU.Color)) {
					throw new TypeError('input value for <' + propName + '> is not a number');
				}

				objColMdl.SetValueByName("r", value.r)
				objColMdl.SetValueByName("g", value.g);
				objColMdl.SetValueByName("b", value.b);
			}
		});
	};

	/*
	Same as above, but proxyfied
	*/
	STU.bindVariableColorToColorSpec_Proxy = function (self, params) {

		if (params == undefined) {
			throw new TypeError('no input parameters');
		}

		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject;	// TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object				
		var obj = params.delegate != undefined ? params.delegate : self;

		if (mdl == undefined)
			throw new Error('no model object to bind');

		if (propName == undefined)
			throw new Error('no property name to bind');

		if (obj[varName] == undefined)
			throw new Error('no model variable to bind');

		var objColMdl = obj[varName].CATI3DExperienceObject;
		if (objColMdl == undefined)
			throw new Error('no color model object to bind');

		var handlers = {
			set: function (iObj, iProp, iValue) {
				if (["r", "g", "b"].includes(iProp)) {
					objColMdl.SetValueByName(iProp, iValue * 255);	// we are switching to [0, 255] as value here a provided for a Color in [0,1]					
				}
				else {
					throw new TypeError('invalid color property "' + iProp + '"');
				}

				return true;
			},
			get: function (iObj, iProp) {

				if (["r", "g", "b"].includes(iProp)) {
					let val = objColMdl.GetValueByName(iProp) / 255; // we are switching to [0, 1] as value here is taken from a Color_Spec in [0,255]	
					return val;
				}
				else if (typeof iObj[iProp] === "function") {
					return (...args) => {
						// object may have changed on cpp side without the proxy knowing
						var color = new STU.Color();
						color.r = objColMdl.GetValueByName("r")
						color.g = objColMdl.GetValueByName("g");
						color.b = objColMdl.GetValueByName("b");


						var ret = color[iProp](...args);

						var newColor = color;
						for (var prop of ["r", "g", "b"]) {

							// if called function has changed the color, let's update the model
							if (color[prop] !== newColor[prop]) {
								objColMdl.SetValueByName(prop, color[prop]);
							}
						}

						if (ret == color) {
							// there are corner cases where ret could be an object or an array containing a reference to iObj
							//  and not the object itself that we will not manage here and assume they will not happen
							ret = new Proxy(color, handlers);
						}
						return ret;
					}
				}
				return undefined;
				//return iObj[iProp];	// not sure if needed
			}
		};


		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {
				var color = new STU.Color();
				color.r = objColMdl.GetValueByName("r")
				color.g = objColMdl.GetValueByName("g");
				color.b = objColMdl.GetValueByName("b");

				let proxy = new Proxy(color, handlers);
				return proxy;
			},
			set: function (value) {
				if (!(value instanceof STU.Color)) {
					throw new TypeError('input value is not a STU.Color');
				}

				objColMdl.SetValueByName("r", value.r)
				objColMdl.SetValueByName("g", value.g);
				objColMdl.SetValueByName("b", value.b);
			}
		});
	};

	/*
	Same as above, but proxyfied
	*/
	STU.bindVariableColorRGBToVCXColor_Proxy = function (self, params) {

		if (params == undefined) {
			throw new TypeError('no input parameters');
		}

		var mdl = params.delegate != undefined ? params.delegate.CATI3DExperienceObject : self.CATI3DExperienceObject;	// TODO : move to JS object delegate instead of direct interface
		var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
		var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the experience object				
		var obj = params.delegate != undefined ? params.delegate : self;

		if (mdl == undefined)
			throw new Error('no model object to bind');

		if (propName == undefined)
			throw new Error('no property name to bind');

		var handlers = {
			set: function (iObj, iProp, iValue) {
				iObj[iProp] = iValue;
				mdl.SetValueByName(varName, iObj.toColor());	// passing a STU.Color as binding is waiting for this type
				return true;
			},
			get: function (iObj, iProp) {

				if (["r", "g", "b"].includes(iProp)) {
					let colorObj = mdl.GetValueByName(varName); // binding is returning a [0,255] {r,g,b} object
					let val = colorObj[iProp] / 255;	// converting to a [0, 1] range as specified on a STU.ColorRGB
					return val;
				}
				else if (typeof iObj[iProp] === "function") {
					return (...args) => {
						// object may have changed on cpp side without the proxy knowing
						let colorObj = mdl.GetValueByName(varName); // binding is returning a [0,255] {r,g,b} object
						let color = new STU.Color(colorObj["r"], colorObj["g"], colorObj["b"]);
						var colorRGB = color.toColorRGB();

						var ret = colorRGB[iProp](...args);

						var newColor = colorRGB.toColor();
						for (var prop of ["r", "g", "b"]) {

							// if called function has changed the color, let's update the model
							if (color[prop] !== newColor[prop]) {
								mdl.SetValueByName(varName, newColor);
							}
						}

						if (ret == colorRGB) {
							// there are corner cases where ret could be an object or an array containing a reference to iObj
							//  and not the object itself that we will not manage here and assume they will not happen
							ret = new Proxy(colorRGB, handlers);
						}
						return ret;
					}
				}
				return undefined;
				//return iObj[iProp];	// not sure if needed
			}
		};


		Object.defineProperty(self, propName, {
			enumerable: true,
			configurable: true,
			get: function () {
				//console.log(`propName: ${propName}`)
				let colorObj = mdl.GetValueByName(varName); // binding is returning a [0,255] {r,g,b} object
				//console.log(colorObj);
				let color = new STU.Color(colorObj["r"], colorObj["g"], colorObj["b"]);
				let proxy = new Proxy(color.toColorRGB(), handlers);
				return proxy;
			},
			set: function (value) {
				if (!(value instanceof STU.ColorRGB)) {
					throw new TypeError('input value is not a STU.ColorRGB');
				}

				var color = value.toColor();
				mdl.SetValueByName(varName, color); // binding is waiting for a [0,255] {r,g,b} object
			}
		});
	};


	/**
	 * Service to bind a STU.Color with a variable containing a VCXColor.
	 * Changing the internals of STU.Color will also update the VCXColor
	 * 
	 * @method bindVCXColor
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} varName 
	 * @param iColorType the STU.Color type because it cannot be prereqed here
	 */
	 STU.bindVCXColor = function (self, iVariableName, iColorType) {
		var handlers = {
			set: function (iObj, iProp, iValue) {
				iObj[iProp] = iValue;
				if (self.CATI3DExperienceObject !== null && self.CATI3DExperienceObject !== undefined) { 
					self.CATI3DExperienceObject.SetValueByName(iVariableName, iObj);
					return true;
				}
				return false;
			},
			get: function(iObj, iProp) {

				if (["r", "g", "b"].includes(iProp)) {
					if (self.CATI3DExperienceObject !== null && self.CATI3DExperienceObject !== undefined) { 
						return self.CATI3DExperienceObject.GetValueByName(iVariableName)[iProp];
					}
					return undefined;
				}
				if (typeof iObj[iProp] === "function") {
					return (...args) => {
						// object may have changed on cpp side without the proxy knowing
						var expObj = self.CATI3DExperienceObject.GetValueByName(iVariableName);
						var color = new iColorType(expObj["r"], expObj["g"], expObj["b"]);

						var ret = color[iProp](...args);

						for (var prop of ["r", "g", "b"]) {
							if (color[prop] !== expObj[prop]) {
								self.CATI3DExperienceObject.SetValueByName(iVariableName, color);
								break;
							}
						}
						if (ret == color) {
							// there are corner cases where ret could be an object or an array containing a reference to iObj
							//  and not the object itself that we will not manage here and assume they will not happen
							ret = new Proxy(color, handlers);
						}
						return ret;
					}
				}
				return iObj[iProp];
			}
		};

		Object.defineProperty(self, iVariableName, {
			enumerable: true,
			configurable: true,
			get: function () {
				if (self.CATI3DExperienceObject !== null && self.CATI3DExperienceObject !== undefined) { 
					var expObj = self.CATI3DExperienceObject.GetValueByName(iVariableName);
					var color = new iColorType(expObj["r"], expObj["g"], expObj["b"]);
					let proxy = new Proxy(color, handlers);
					proxy.toString = Function.prototype.toString.bind(color);
					return proxy;
				}
				return undefined;
			},
			set: function (iObj) {
				// VCXColor are exported as arrays
				if (iObj === null || iObj === undefined || !(["r", "g", "b"].every(prop => Object.keys(iObj).includes(prop)) || Array.isArray(iObj))) {
					throw new TypeError('given value is not a ' + iColorType.name);
				}

				var color;
				if (Array.isArray(iObj)) {
					color = new iColorType(iObj[0], iObj[1], iObj[2]);
				} else {
					color = new iColorType(iObj.r, iObj.g, iObj.b);
				}
				self.CATI3DExperienceObject.SetValueByName(iVariableName, color);
			}
		});
	};

	
	/**
	 * Service to bind a JS object AND its internal properties with an experience object
	 * Internal variables needs to have the same name in the JS object type and the experience object.
	 * This does not support binding of object aggregating other objects
	 * 
	 * @method bindObject
	 * @private
	 * @static
	 * @param {STU.Instance} self the object on which the variable is. The object needs to implement CATI3DExperienceObject
	 * @param {string} iVariableName the name of the experience variable aggregating the object
	 * @param {iTargetType} iTargetType the expected JS object type
	 * @param {Array.<string>} iPropertiesToBind the JS internal properties to bind
	 */
	STU.bindObject = function(self, iVariableName, iTargetType, iPropertiesToBind) {
		var needRefresh = true;
		var target = new iTargetType();
		var proxy = new Proxy(target, {
			set: function (iObj, iProp, iValue) {
				// we need to refresh CATI3DExperienceObject each time because object value may have changed on cpp side
				if (needRefresh) {
					target.CATI3DExperienceObject = self.CATI3DExperienceObject.GetValueByName(iVariableName).CATI3DExperienceObject;
				}

				if (iPropertiesToBind.includes(iProp)) {
					if (target.CATI3DExperienceObject !== null && target.CATI3DExperienceObject !== undefined) { 
						target.CATI3DExperienceObject.SetValueByName(iProp, iValue);
						return true;
					}
					return false;
				}
				iObj[iProp] = iValue;
				return true;
			},
			get: function(iObj, iProp) {
				// we need to refresh CATI3DExperienceObject each time because object value may have changed on cpp side
				if (needRefresh) {
					target.CATI3DExperienceObject = self.CATI3DExperienceObject.GetValueByName(iVariableName).CATI3DExperienceObject;
				}

				if (iPropertiesToBind.includes(iProp)) {
					if (target.CATI3DExperienceObject !== null && target.CATI3DExperienceObject !== undefined) { 
						return target.CATI3DExperienceObject.GetValueByName(iProp);
					}
					return undefined;
				}
				if (typeof iObj[iProp] === "function") {
					return (...args) => {
						// object may have changed on cpp side without the proxy knowing
						var expObj = self.CATI3DExperienceObject.GetValueByName(iVariableName);

						// we need to set its internals correctly before executing any method on it
						for (var prop of iPropertiesToBind) {
							iObj[prop] = expObj[prop];
						}

						var ret = iObj[iProp](...args);

						for (var prop of iPropertiesToBind) {
							if (iObj[prop] !== expObj[prop]) {
								target.CATI3DExperienceObject.SetValueByName(prop, iObj[prop]);
							}
						}
						if (ret == iObj) {
							// there are corner cases where ret could be an object or an array containing a reference to iObj
							//  and not the object itself that we will not manage here and assume they will not happen
							ret = proxy;
						}
						return ret;
					}
				}
				return iObj[iProp];
			}
		});

		Object.defineProperty(self, iVariableName, {
			enumerable: true,
			configurable: true,

			/*
				console.log for instance log the target object directly without going through the proxy
				so the target need to be up to date after the get
			*/
			get: function () {
				// we need to refresh CATI3DExperienceObject each time because object value may have changed on cpp side
				target.CATI3DExperienceObject = this.CATI3DExperienceObject.GetValueByName(iVariableName).CATI3DExperienceObject;
				
				for (var prop of iPropertiesToBind) {
					target[prop] = target.CATI3DExperienceObject.GetValueByName(prop);
				}
				return proxy;
			},
			set: function (iObj) {
				if (iObj !== null && iObj !== undefined && !(iObj instanceof iTargetType)) {
					throw new TypeError('given value is not a ' + iTargetType.name);
				}

				if (!self.initialized) {
					for (var prop of iPropertiesToBind) {
						target[prop] = iObj[prop];
					}
					target.CATI3DExperienceObject = iObj.CATI3DExperienceObject;
				} else {
					target.CATI3DExperienceObject = this.CATI3DExperienceObject.GetValueByName(iVariableName).CATI3DExperienceObject;

					needRefresh = false;
					for (var prop of iPropertiesToBind) {
						proxy[prop] = iObj[prop];
					}
					needRefresh = true;
				}
			}
		});
	};

	/*
	 *
	 * TERMS OF USE - EASING EQUATIONS
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright � 2001 Robert Penner
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 * Redistributions of source code must retain the above copyright notice, this list of
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list
	 * of conditions and the following disclaimer in the documentation and/or other materials
	 * provided with the distribution.
	 *
	 * Neither the name of the author nor the names of contributors may be used to endorse
	 * or promote products derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
	 * OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */

	var easingFunctions = {
		// t: current time, b: begInnIng value, c: change In value, d: duration
		easeInQuad: function (t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOutQuad: function (t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic: function (t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic: function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart: function (t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart: function (t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint: function (t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint: function (t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine: function (t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine: function (t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine: function (t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo: function (t, b, c, d) {
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo: function (t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo: function (t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc: function (t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc: function (t, b, c, d) {
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic: function (t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function (t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic: function (t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack: function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce: function (t, b, c, d) {
			return c - easingFunctions.easeOutBounce(d - t, 0, c, d) + b;
		},
		easeOutBounce: function (t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce: function (t, b, c, d) {
			if (t < d / 2) return easingFunctions.easeInBounce(t * 2, 0, c, d) * .5 + b;
			return easingFunctions.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	};

	STU.eEasing = {
		InQuad: 0,
		OutQuad: 1,
		InOutQuad: 2,
		InCubic: 3,
		OutCubic: 4,
		InOutCubic: 5,
		InQuart: 6,
		OutQuart: 7,
		InOutQuart: 8,
		InQuint: 9,
		OutQuint: 10,
		InOutQuint: 11,
		InSine: 12,
		OutSine: 13,
		InOutSine: 14,
		InExpo: 15,
		OutExpo: 16,
		InOutExpo: 17,
		InCirc: 18,
		OutCirc: 19,
		InOutCirc: 20,
		InElastic: 21,
		OutElastic: 22,
		InOutElastic: 23,
		InBack: 24,
		OutBack: 25,
		InOutBack: 26,
		InBounce: 27,
		OutBounce: 28,
		InOutBounce: 29,
	};

	var easingMatchingArray = new Array();
	easingMatchingArray[STU.eEasing.InQuad] = easingFunctions.easeInQuad;
	easingMatchingArray[STU.eEasing.OutQuad] = easingFunctions.easeOutQuad;
	easingMatchingArray[STU.eEasing.InOutQuad] = easingFunctions.easeInOutQuad;
	easingMatchingArray[STU.eEasing.InCubic] = easingFunctions.easeInCubic;
	easingMatchingArray[STU.eEasing.OutCubic] = easingFunctions.easeOutCubic;
	easingMatchingArray[STU.eEasing.InOutCubic] = easingFunctions.easeInOutCubic;
	easingMatchingArray[STU.eEasing.InQuart] = easingFunctions.easeInQuart;
	easingMatchingArray[STU.eEasing.OutQuart] = easingFunctions.easeOutQuart;
	easingMatchingArray[STU.eEasing.InOutQuart] = easingFunctions.easeInOutQuart;
	easingMatchingArray[STU.eEasing.InQuint] = easingFunctions.easeInQuint;
	easingMatchingArray[STU.eEasing.OutQuint] = easingFunctions.easeOutQuint;
	easingMatchingArray[STU.eEasing.InOutQuint] = easingFunctions.easeInOutQuint;
	easingMatchingArray[STU.eEasing.InSine] = easingFunctions.easeInSine;
	easingMatchingArray[STU.eEasing.OutSine] = easingFunctions.easeOutSine;
	easingMatchingArray[STU.eEasing.InOutSine] = easingFunctions.easeInOutSine;
	easingMatchingArray[STU.eEasing.InExpo] = easingFunctions.easeInExpo;
	easingMatchingArray[STU.eEasing.OutExpo] = easingFunctions.easeOutExpo;
	easingMatchingArray[STU.eEasing.InOutExpo] = easingFunctions.easeInOutExpo;
	easingMatchingArray[STU.eEasing.InCirc] = easingFunctions.easeInCirc;
	easingMatchingArray[STU.eEasing.OutCirc] = easingFunctions.easeOutCirc;
	easingMatchingArray[STU.eEasing.InOutCirc] = easingFunctions.easeInOutCirc;
	easingMatchingArray[STU.eEasing.InElastic] = easingFunctions.easeInElastic;
	easingMatchingArray[STU.eEasing.OutElastic] = easingFunctions.easeOutElastic;
	easingMatchingArray[STU.eEasing.InOutElastic] = easingFunctions.easeInOutElastic;
	easingMatchingArray[STU.eEasing.InBack] = easingFunctions.easeInBack;
	easingMatchingArray[STU.eEasing.OutBack] = easingFunctions.easeOutBack;
	easingMatchingArray[STU.eEasing.InOutBack] = easingFunctions.easeInOutBack;
	easingMatchingArray[STU.eEasing.InBounce] = easingFunctions.easeInBounce;
	easingMatchingArray[STU.eEasing.OutBounce] = easingFunctions.easeOutBounce;
	easingMatchingArray[STU.eEasing.InOutBounce] = easingFunctions.easeInOutBounce;

	//t: current time, b: begInnIng value, c: change In value, d: duration
	STU.ease = function (iEasingFunction, iCurrentTime, iBeginning, iChangeInValue, iDuration) {
		return easingMatchingArray[iEasingFunction](iCurrentTime, iBeginning, iChangeInValue, iDuration);
	};

	return STU;
});

define('StuCore/StuTools', ['DS/StuCore/StuTools'], function (STU) {
	'use strict';

	return STU;
});
