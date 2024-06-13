
define('DS/StuRenderEngine/StuMaterialPBR', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuMaterial', 'DS/StuCore/StuTools'], function (STU, Material, Tools) {
	'use strict';
	
	let maps = {};

	/**
	 * Object representing a DSPBR Material, whatever its version (starting from 22x) and subtype.
	 * 
	 * All DSPBR Materials properties are exposed and can be freely modified at play.
	 * 
	 * Notes about properties for subtypes and properties that are overriden by a texture:
	 * <ul>
	 * 
	 * <li>If the user gets a property that is driven by a texture, the returned value is 'undefined', and the console displays a related warning.</li>
	 * <li>If the user sets a property that is driven by a texture, the modification has no effect, and the console displays a  related warning.</li>
	 *
	 * <li>If the user gets a property that is not available on the current subtype, the returned value is 'undefined', and the console displays a related warning.</li>
	 * <li>If the user sets a property that is not available on the current subtype, the modification has no effect, and the console displays a related warning.</li>
	 * </ul>
	 * 
	 * If a property value is provided out of its defined range, then the value is capped and a warning is also displayed.
	 * 
	 * Warning: some properties modifications may have some performance impact.
	 *
	 * @exports MaterialPBR
	 * @class
	 * @constructor
     * @noinstancector
	 * @private
     * @extends STU.Material
	 * @memberof STU
     * @alias STU.MaterialPBR
	 */
    var MaterialPBR = function () {
		STU.Material.call(this);
		this.name = 'MaterialPBR';

		// TODO: review how appearance data is accessed

		
		/**
		 * Base Color
		 *
		 * @member
		 * @instance
		 * @name baseColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */
		this.baseColor = undefined;
		
		/**
		 * Metallic
		 *
		 * @member
		 * @instance
		 * @name metallic
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */
		this.metallic = undefined;
		
		/**
		 * Roughness
		 *
		 * @member
		 * @instance
		 * @name roughness
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */
		this.roughness = undefined;
		
		/**
		 * Anisotropy
		 *
		 * @member
		 * @instance
		 * @name anisotropy
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */
		this.anisotropy = undefined;

		/**
		 * Anisotropy Rotation
		 *
		 * @member
		 * @instance
		 * @name anisotropyRotation
		 * @private
		 * @type {STU.number}
		 * @memberOf STU.MaterialPBR
		 */		
		this.anisotropyRotation = undefined;

		/**
		 * Translucency
		 *
		 * @member
		 * @instance
		 * @name translucency
		 * @private
		 * @type {STU.number}
		 * @memberOf STU.MaterialPBR
		 */				
		this.translucency = undefined;

		/**
		 * Transparency
		 *
		 * @member
		 * @instance
		 * @name transparency
		 * @private
		 * @type {STU.number}
		 * @memberOf STU.MaterialPBR
		 */			
		this.transparency = undefined;
		
		/**
		 * Cutout Opacity
		 *
		 * @member
		 * @instance
		 * @name cutoutOpacity
		 * @private
		 * @type {STU.number}
		 * @memberOf STU.MaterialPBR
		 */				
		this.cutoutOpacity = undefined;

		
		/**
		 * Specular Intensity
		 *
		 * @member
		 * @instance
		 * @name specularIntensity
		 * @private
		 * @type {STU.number}
		 * @memberOf STU.MaterialPBR
		 */		
		this.specularIntensity = undefined;
				
		/**
		 * Specular Color
		 *
		 * @member
		 * @instance
		 * @name specularColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */		
		this.specularColor = undefined;
		
		/**
		 * Sheen Color
		 *
		 * @member
		 * @instance
		 * @name sheenColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */		
		this.sheenColor = undefined;

		/**
		 * Sheen Roughness
		 *
		 * @member
		 * @instance
		 * @name sheenRoughness
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */		
		this.sheenRoughness = undefined;
		
		/**
		 * Flakes Coverage
		 *
		 * @member
		 * @instance
		 * @name flakesCoverage
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */	
		this.flakesCoverage = undefined;
		
		/**
		 * Flakes Color
		 *
		 * @member
		 * @instance
		 * @name flakesColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */	
		this.flakesColor = undefined;

		/**
		 * Flakes Size
		 *
		 * @member
		 * @instance
		 * @name flakesSize
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */	
		this.flakesSize = undefined;
		
		/**
		 * Flakes Roughness
		 *
		 * @member
		 * @instance
		 * @name flakesRoughness
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */
		this.flakesRoughness = undefined;
		
		/**
		 * Flip Flop
		 *
		 * @member
		 * @instance
		 * @name flipFlopStrength
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */
		 this.flipFlopStrength = undefined;
		
		/**
		 * Flip Flop Color
		 *
		 * @member
		 * @instance
		 * @name flipFlopColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */
		this.flipFlopColor = undefined;


		/**
		 * Clearcoat Intensity
		 *
		 * @member
		 * @instance
		 * @name clearcoatIntensity
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */		
		this.clearcoatIntensity = undefined;
		
		/**
		 * Clearcoat Roughness
		 *
		 * @member
		 * @instance
		 * @name clearcoatRoughness
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */				 
		this.clearcoatRoughness = undefined;

		/**
		 * Emission Color
		 *
		 * @member
		 * @instance
		 * @name emissionColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */				 			
		this.emissionColor = undefined;

		/**
		 * Emission Value
		 *
		 * @member
		 * @instance
		 * @name emissionValue
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */				 				 
		this.emissionValue = undefined;
				
		/**
		 * Emission Mode
		 *
		 * @member
		 * @instance
		 * @name emissionMode
		 * @private
		 * @type {STU.MaterialPBR.EEmissionMode}
		 * @memberOf STU.MaterialPBR
		 */				 		
		this.emissionMode = undefined;

		/**
		 * Emission Energy Normalization
		 *
		 * @member
		 * @instance
		 * @name emissionEnergyNormalization
		 * @private
		 * @type {boolean}
		 * @memberOf STU.MaterialPBR
		 */				 		
		this.emissionEnergyNormalization = undefined;

		/**
		 * Thin Walled
		 *
		 * @member
		 * @instance
		 * @name thinWalled
		 * @private
		 * @type {boolean}
		 * @memberOf STU.MaterialPBR
		 */				 				 
		this.thinWalled = undefined;

		/**
		 * Index of Refraction
		 *
		 * @member
		 * @instance
		 * @name ior
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */				 
		this.ior = undefined;
		
		/**
		 * Abbe Number
		 *
		 * @member
		 * @instance
		 * @name abbeNumber
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */				 				 
		this.abbeNumber = undefined;
				
		/**
		 * Attenuation Color
		 *
		 * @member
		 * @instance
		 * @name attenuationColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */				 
		this.attenuationColor = undefined;

		/**
		 * Attenuation Distance
		 *
		 * @member
		 * @instance
		 * @name attenuationDistance
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */				 
		this.attenuationDistance = undefined;

		/**
		 * Subsurface Color
		 *
		 * @member
		 * @instance
		 * @name subsurfaceColor
		 * @private
		 * @type {STU.ColorRGB}
		 * @memberOf STU.MaterialPBR
		 */		
		this.subsurfaceColor = undefined;

		/**
		 * Subsurface Anisotropy
		 *
		 * @member
		 * @instance
		 * @name subsurfaceAnisotropy
		 * @private
		 * @type {number}
		 * @memberOf STU.MaterialPBR
		 */		
		this.subsurfaceAnisotropy = undefined;
		
		/**
		 * Material's sub type
		 *
		 * @member
		 * @instance
		 * @name subtype
		 * @private
		 * @type {STU.MaterialPBR.ESubType}
		 * @memberOf STU.MaterialPBR
		 */	
		this.subtype = MaterialPBR.ESubType.eNone;
	};

    MaterialPBR.prototype = new STU.Material();
	MaterialPBR.prototype.constructor = MaterialPBR;

	MaterialPBR.prototype.onInitialize = function (oExceptions) {		
		STU.Material.prototype.onInitialize.call(this, oExceptions);

		let that = this;
		
		//console.log("#### material name: " + this.name);
				
		// intializing Material's subtype from Appearance preset "ID"
		// Note: yes, there is a typo in the data model :|
		this.subtype = maps.presetNameToEnum[this.appearance.apperance_preset];	
		if(this.subtype == undefined) {
			throw new TypeError("unknown material subtype : '" + this.appearance.apperance_preset + "'");
		}

		// subtype name as declared in the official DSPBR spec
		let subtypeName = maps.subtypeEnumToSubtypeName[this.subtype];
		//console.log("#### material subtype: " + subtypeName);
					

		// this function encapsulate either a binding to the model variable, either an getter/setter to 
		// an undefined value when the bound property is not available on actual subtype of this material instance
		let	bindOrIgnore = function(params, bindFunction) {
			var varName = params.varName != undefined ? params.varName : params.propName;	// variable name on the Exp object
			var propName = params.propName != undefined ? params.propName : params.varName;	// property name on the JS object
			var specName = maps.propNametoSpecName[propName];	// property name in the official specs
			if(specName === undefined)
				console.warn("specName not found for " + subtypeName + " " + propName)

			let subtypeName = maps.subtypeEnumToSubtypeName[that.subtype];
			let typeInfo = maps.subtypeFilters[subtypeName];

			if(typeInfo === undefined)
				console.warn("no information for " + subtypeName);
			
			// checking if the variable is actually driven by a texture
			// if so, we get an undefined value, and set as no impact
			//
			// Note: this should be a temporary situation until 23x FD01
			// the define is that even if overriden by texture, the properties
			// should be gettable/settable to enable color<>texture switch scenarios in the future
			let variableIsTexture = false;
			if(that._texturedVariables !== undefined) {
				if(that._texturedVariables.includes(varName)) {
					variableIsTexture = true;
				}
			}
			
			if(typeInfo[specName] === undefined) {
				// if the property is not declared in this subtype, then we provide an undefined based getter / setter
				//console.log("	- " + propName);
				Object.defineProperty(that, propName, {
					enumerable: true,
					configurable: true,
					get: function () {
						console.warn(`property '${propName}' not available on subtype '${subtypeName}'`);
						return undefined;
					},
					set: function (value) {
						console.warn(`property '${propName}' not available on subtype '${subtypeName}'`);
						return;
					}
				});
			}
			else if(variableIsTexture) {
				Object.defineProperty(that, propName, {
					enumerable: true,
					configurable: true,
					get: function () {
						console.warn(`property '${propName}' is overriden by a texture`);
						return undefined;
					},
					set: function (value) {
						console.warn(`property '${propName}' is overriden by a texture`);
						return;
					}
				});
			}
			else {
				// if the property is declared in this subtype, then we bind it to the model
				//console.log("	+ " + propName);
				bindFunction.call(that, that, params);
			}
		};
		
		
		try{
			// binding all the properties during initialization, because 
			// the binder needs access to a sub object delegate (the appearance) that is assigned
			// only later during the build (thus after constructor)
			
			let bindColor = Tools.bindVariableColorRGBToVCXColor_Proxy;
			let bindDouble = Tools.bindVariableDouble;
			let bindBoolean = Tools.bindVariableBoolean;
			let bindEnum = Tools.bindVariableEnum;
			
			bindOrIgnore({propName: "baseColor", varName: "albedo", delegate: that.appearance}, bindColor);
			bindOrIgnore({varName: "metallic", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "roughness", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "anisotropy", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "anisotropyRotation", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "translucency", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "transparency", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "cutoutOpacity", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			
			bindOrIgnore({propName: "specularIntensity", varName: "specular", min: 0, max: 1, delegate: that.appearance}, bindDouble); // TODO : mapp to right model name			
			bindOrIgnore({propName: "specularColor", varName: "specularTint", delegate: that.appearance}, bindColor);	// TODO : mapp to right model name				

			bindOrIgnore({propName: "sheenColor", delegate: that.appearance}, bindColor);
			bindOrIgnore({varName: "sheenRoughness", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			
			bindOrIgnore({propName: "flakesCoverage", varName: "flakeDensity", min: 0, max: 1, delegate: that.appearance}, bindDouble);			
			bindOrIgnore({propName: "flakesColor", varName: "flakeColor", delegate: that.appearance}, bindColor);	// TODO : mapp to right model name
			bindOrIgnore({propName: "flakesSize", varName: "flakeSize", min: 0, delegate: that.appearance}, bindDouble);	// TODO : mapp to right model name
			bindOrIgnore({propName: "flakesRoughness", varName: "flakeRoughness", min: 0, max: 1, delegate: that.appearance}, bindDouble);	// TODO : mapp to right model name
			bindOrIgnore({propName: "flipFlopStrength", varName: "flipFlop", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			
			bindOrIgnore({propName: "flipFlopColor", delegate: that.appearance}, bindColor);

			bindOrIgnore({propName: "clearcoatIntensity", varName: "clearcoat", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "clearcoatRoughness", min: 0, max: 1, delegate: that.appearance}, bindDouble);
			
			bindOrIgnore({propName: "emissionColor", delegate: that.appearance}, bindColor);
			bindOrIgnore({propName: "emissionMode", delegate: that.appearance, enum: STU.MaterialPBR.EEmissionMode}, bindEnum);
			bindOrIgnore({varName: "emissionValue", min: 0, delegate: that.appearance}, bindDouble);
			bindOrIgnore({propName: "emissionEnergyNormalization", delegate: that.appearance}, bindBoolean);
			
			bindOrIgnore({propName: "thinWalled", delegate: that.appearance}, bindBoolean);
			bindOrIgnore({varName: "ior", min: 1, delegate: that.appearance}, bindDouble);
			bindOrIgnore({varName: "abbeNumber", min: 0, delegate: that.appearance}, bindDouble);

			bindOrIgnore({propName: "attenuationColor", delegate: that.appearance}, bindColor);
			bindOrIgnore({varName: "attenuationDistance", min: 0, delegate: that.appearance}, bindDouble);

			bindOrIgnore({propName: "subsurfaceColor", delegate: that.appearance}, bindColor);
			bindOrIgnore({varName: "subsurfaceAnisotropy", min: -1, max: 1, delegate: that.appearance}, bindDouble);


		}
		catch (e) {
			console.log("error while initalizing material '" + this.name + "'");
			console.log(e.message);
			console.log(e.stack);
		}
	};


	/**
	* Enumeration of possible light emission modes.
	*
	* @enum {number}
	* @private
	*/
	MaterialPBR.EEmissionMode = {
		eLightEmittance : 0,
		eLightPower : 1
	};

	/**
	* Enumeration of possible PBR subtypes.
	*
	* @enum {number}
	* @private
	*/
	MaterialPBR.ESubType = {
		/**
		 * @private
		 */
		eNone : 0,
		/**
		 * @private
		 */
		eBasic : 1,
		/**
		 * @private
		 */
		eCarPaint : 2,
		/**
		 * @private
		 */
		eMetal : 3,
		/**
		 * @private
		 */
		eEmissive : 4,
		/**
		 * @private
		 */
		eTextile : 5,
		/**
		 * @private
		 */
		eLeather : 6,
		/**
		 * @private
		 */
		eWood : 7,
		/**
		 * @private
		 */
		eGlass : 8,
		/**
		 * @private
		 */
		ePlastic : 9
	};

	// Expose in STU namespace.
	STU.MaterialPBR = MaterialPBR;


	/**
	 * This table is creater from this official source of DSPBR specifications
	 * 		https://dassaultsystemes-technology.github.io/EnterprisePBRShadingModel/params-2022x.json
	 * For ease of use, we are recreating  a simplified table containing each subtype, and each of the properties accessible on those subtypes.
	 * If needed to be regenerated, here is the piece of code to use:
	 * @code
	  		let data = {} // copy here the json struct from the source
			let newData = {};
			for (e in data.materials) {			
				newData[e] = {};
					
				let mat = data.materials[e];
				for (pe in mat.parameters) {
					
					if(mat.parameters[pe].hidden) {
						console.log(pe + " skipped");
					}
					else {
						newData[e][pe] = 1;
					}
				}
			}
			
			// newdata is containing the table below
	*/
	maps.subtypeFilters = {
		"generic": {        "albedo": 1,        "metallic": 1,        "roughness": 1,        "anisotropy": 1,        "anisotropyRotation": 1,        "normal": 1,        "displacement": 1,        "translucency": 1,        "transparency": 1,        "cutoutOpacity": 1,        "specular": 1,        "specularTint": 1,        "sheenColor": 1,        "sheenRoughness": 1,        "flakeCoverage": 1,        "flakeColor": 1,        "flakeSize": 1,        "flakeRoughness": 1,        "flipFlop": 1,        "flipFlopColor": 1,        "clearcoat": 1,        "clearcoatRoughness": 1,        "clearcoatNormal": 1,        "emissionColor": 1,        "emissionValue": 1,        "emissionMode": 1,        "emissionEnergyNormalization": 1,        "thinWalled": 1,        "ior": 1,        "abbeNumber": 1,        "attenuationColor": 1,        "attenuationDistance": 1,        "subsurfaceColor": 1,        "subsurfaceAnisotropy": 1    },
		"carpaint": {        "albedo": 1,        "roughness": 1,        "displacement": 1,        "cutoutOpacity": 1,        "flakeCoverage": 1,        "flakeColor": 1,        "flakeSize": 1,        "flakeRoughness": 1,        "flipFlop": 1,        "flipFlopColor": 1,        "clearcoat": 1,        "clearcoatRoughness": 1,        "clearcoatNormal": 1    },
		"metal": {        "albedo": 1,        "roughness": 1,        "anisotropy": 1,        "anisotropyRotation": 1,        "normal": 1,        "displacement": 1,        "cutoutOpacity": 1    },
		"basic": {        "albedo": 1,        "metallic": 1,        "roughness": 1,        "normal": 1,        "displacement": 1,        "cutoutOpacity": 1    },
		"emissive": {        "displacement": 1,        "cutoutOpacity": 1,        "emissionColor": 1,        "emissionValue": 1,        "emissionMode": 1,        "emissionEnergyNormalization": 1    },
		"textile": {        "albedo": 1,        "roughness": 1,        "anisotropy": 1,        "anisotropyRotation": 1,        "normal": 1,        "displacement": 1,        "cutoutOpacity": 1,        "sheenColor": 1,        "sheenRoughness": 1    },
		"leather": {        "albedo": 1,        "roughness": 1,        "normal": 1,        "displacement": 1,        "cutoutOpacity": 1    },    
		"wood": {        "albedo": 1,        "roughness": 1,        "anisotropy": 1,        "anisotropyRotation": 1,        "normal": 1,        "displacement": 1,        "cutoutOpacity": 1,        "clearcoat": 1,        "clearcoatRoughness": 1,        "clearcoatNormal": 1    },
		"glass": {        "albedo": 1,        "roughness": 1,        "normal": 1,        "displacement": 1,        "cutoutOpacity": 1,        "thinWalled": 1,        "attenuationColor": 1,        "attenuationDistance": 1    },
		"plastic": {        "albedo": 1,        "roughness": 1,        "normal": 1,        "displacement": 1,        "translucency": 1,        "transparency": 1,        "cutoutOpacity": 1,        "thinWalled": 1,        "ior": 1,        "attenuationColor": 1,        "attenuationDistance": 1,        "subsurfaceColor": 1    }
	}

	/**
	 * This table is used to match the appeareance preset name (material subtype) to our exposed enumeration
	 */
	maps.presetNameToEnum = {
		"3DS PBR"			: 	MaterialPBR.ESubType.eNone,
		"3DS PBR Basic"		: 	MaterialPBR.ESubType.eBasic,
		"3DS PBR Car paint"	: 	MaterialPBR.ESubType.eCarPaint,
		"3DS PBR Metal"		: 	MaterialPBR.ESubType.eMetal,
		"3DS PBR Emissive"	: 	MaterialPBR.ESubType.eEmissive,
		"3DS PBR Textile"	: 	MaterialPBR.ESubType.eTextile,
		"3DS PBR Leather"	: 	MaterialPBR.ESubType.eLeather,
		"3DS PBR Wood"		: 	MaterialPBR.ESubType.eWood,
		"3DS PBR Glass"		: 	MaterialPBR.ESubType.eGlass,
		"3DS PBR Plastic"	: 	MaterialPBR.ESubType.ePlastic
	};

	/**
	 * This table is used to translate our exposed material property names to the ones used in the official DSPBR spec
	 */
	 maps.propNametoSpecName = {
		"baseColor"						: "albedo",
		"metallic"						: "metallic",
		"roughness"						: "roughness",
		"anisotropy"					: "anisotropy",
		"anisotropyRotation"			: "anisotropyRotation",
		"translucency"					: "translucency",
		"transparency"					: "transparency",
		"cutoutOpacity"					: "cutoutOpacity",
		"specularIntensity"				: "specular",
		"specularColor"					: "specularTint",
		"sheenColor"					: "sheenColor",
		"sheenRoughness"				: "sheenRoughness",
		"flakesCoverage"				: "flakeCoverage",
		"flakesColor"					: "flakeColor",
		"flakesSize"					: "flakeSize",
		"flakesRoughness"				: "flakeRoughness",
		"flipFlopStrength"				: "flipFlop",
		"flipFlopColor"					: "flipFlopColor",
		"clearcoatIntensity"			: "clearcoat",
		"clearcoatRoughness"			: "clearcoatRoughness",
		"emissionMode"					: "emissionMode",
		"emissionColor"					: "emissionColor",
		"emissionValue"					: "emissionValue",
		"emissionEnergyNormalization"	: "emissionEnergyNormalization",
		"thinWalled"					: "thinWalled",
		"ior"							: "ior",
		"abbeNumber"					: "abbeNumber",
		"attenuationColor"				: "attenuationColor",
		"attenuationDistance"			: "attenuationDistance",
		"subsurfaceColor"				: "subsurfaceColor",
		"subsurfaceAnisotropy"			: "subsurfaceAnisotropy",
	};

	/**
	 * This table is used to match our exposed subtype enum to the official DSPBR subtype name
	 */
	maps.subtypeEnumToSubtypeName = {};
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eNone] 		= "generic";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eBasic] 		= "basic";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eCarPaint] 	= "carpaint";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eMetal] 		= "metal";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eEmissive] 	= "emissive";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eTextile] 	= "textile";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eLeather] 	= "leather";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eWood] 		= "wood";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.eGlass] 		= "glass";
	maps.subtypeEnumToSubtypeName[MaterialPBR.ESubType.ePlastic] 	= "plastic";


	return MaterialPBR;
});

define('StuRenderEngine/StuMaterialPBR', ['DS/StuRenderEngine/StuMaterialPBR'], function (MaterialPBR) {
	'use strict';

	return MaterialPBR;
});
