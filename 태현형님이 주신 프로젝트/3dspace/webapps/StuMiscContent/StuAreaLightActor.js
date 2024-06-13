define('DS/StuMiscContent/StuAreaLightActor', ['DS/StuCore/StuContext', 'DS/StuMiscContent/StuLightActor', 'DS/StuRenderEngine/StuColor', 'DS/StuCore/StuTools'], function(STU, LightActor, Color, Tools) {
    'use strict';

    /**
     * Describe a area light object.
     *
     * @exports AreaLightActor
     * @class
     * @constructor
     * @noinstancector
     * @private
     * @extends STU.Actor3D
     * @memberof STU
     * @alias STU.AreaLightActor
     */
    var AreaLightActor = function() {
        LightActor.call(this);
        this.name = 'AreaLightActor';

        this._props = [];



        //////////////////////////////////////////////////////////////////////////
        // Properties that should NOT be visible in UI
        //////////////////////////////////////////////////////////////////////////

        ///**
        //* private
        //*
        //* @member => need to be purely virtual
        //* @private
        //* @type {Number}
        //*/
        ////this.solidAngle = 1;

        ///**
        //* private
        //*
        //* @member => need to be purely virtual
        //* @private
        //* @type {Number}
        //*/
        ////this.emittingSurface = 1;

        //////////////////////////////////////////////////////////////////////////
		// Properties that should be visible in UI
		//////////////////////////////////////////////////////////////////////////

        /**
         * Get/Set cast shadows flag 
         *
         * @member
         * @instance
         * @name castShadows
         * @private
         * @type {boolean}
         * @memberOf STU.AreaLightActor
         */
        Tools.bindVariable(this, "castShadows", "boolean");

        /**
         * Get/Set show geoemtry flag 
         *
         * @member
         * @instance
         * @name showGeometry
         * @private
         * @type {boolean}
         * @memberOf STU.AreaLightActor
         */
        Tools.bindVariable(this, "showGeometry", "boolean");

        /**
         * Get/Set color mode enum 
         *
         * @member
         * @instance
         * @name colorMode
         * @private
         * @type {STU.AreaLightActor.EColorMode}
         * @memberOf STU.AreaLightActor
         */
        this.colorMode = null; // bind in constructor

        /**
         * Get/Set temperature value 
         *
         * @member
         * @instance
         * @name temperature
         * @private
         * @type {number}
         * @memberOf STU.AreaLightActor
         */
        Tools.bindVariable(this, "temperature", "number");

        /**
         * Get/Set Area intensity (named power in model)
         *
         * @member
         * @instance
         * @name intensity
         * @private
         * @type {number}
         * @memberOf STU.AreaLightActor
         */
        this.intensity = null; // bind in constructor

        /**
         * Get/Set light diffuseColor 
         *
         * @member
         * @instance
         * @name diffuseColor
         * @private
         * @type {STU.Color}
         * @memberOf STU.AreaLightActor
         */
        this.diffuseColor = null; // bind in constructor
    };



    /**
     * An enumeration of all the supported reference of colorization ( RGB / Temperature ).<br/>
     * It allows to refer in the code to a specific key.
     *
     * @enum {number}
     * @private
     */
    AreaLightActor.EColorMode = {
        eRGB: 0,
        eTemperature: 1,
    };

    /**
     * An enumeration of all the supported reference of intensity unit ( Lumen / Candela / Lumen Per Square Meter / Nit ).<br/>
     * It allows to refer in the code to a specific key.
     *
     * @enum {number}
     * @private
     */
    AreaLightActor.EIntensityUnit = {
        eLumen: 0,
        eCandela: 1,
        eLumenPerSquareMeter: 2,
        eNit: 3,
    };



    AreaLightActor.prototype = new LightActor();
    AreaLightActor.prototype.constructor = AreaLightActor;

    AreaLightActor.prototype.onInitialize = function (oExceptions) {
        STU.LightActor.prototype.onInitialize.call(this, oExceptions);

        // Note: binding during initialization, because binder needs access to a sub object delegate
        // that is assigned only later during the build (thus after constructor)
        Tools.bindVariableColorToColorSpec_Proxy(this, { propName: "diffuseColor", varName: "diffuseColor" });
        Tools.bindVariableDouble(this, { varName: "power", propName: "intensity", min: 0 });
        Tools.bindVariableEnum(this, { varName: "colorMode", propName: "colorMode", enum: STU.AreaLightActor.EColorMode });

        // Note: we need to redefine this.emittingSurface after the dimensions as it depends of it.
        this.updateEmittingSurface();
    };



    ////////////////
    // Virtual functions
    ////////////////

    //// function called to update the solid angle (as it varies in function of the dimensions)
    //AreaLightActor.prototype.updateSolidAngle = function () {
    //}

    //// function called to update the emitting surface (as it varies in function of the dimensions)
    //AreaLightActor.prototype.updateEmittingSurface = function () {
    //}



    // Manual function to compensate the fact that UnitIntensity is not exposed along the otehr properties.
    // Therefore, the .setIntensity & .getIntensity are here to let the user decide which intensityUnit + intensity the user would like to use to have full control.
    AreaLightActor.prototype.setIntensity = function (iIntensity, iEIntensityUnit = STU.AreaLightActor.EIntensityUnit.eLumen) {
        if (iIntensity !== undefined && typeof iIntensity === 'number' && iIntensity > 0) {
            if (typeof iEIntensityUnit === 'number') {

                switch (iEIntensityUnit) {
                    case AreaLightActor.EIntensityUnit.eLumen:
                        this.intensity = iIntensity;
                        break;

                    case AreaLightActor.EIntensityUnit.eCandela:
                        this.updateSolidAngle();
                        this.intensity = iIntensity * this.solidAngle;
                        break;

                    case AreaLightActor.EIntensityUnit.eLumenPerSquareMeter:
                        this.updateEmittingSurface();
                        this.intensity = iIntensity * this.emittingSurface;
                        break;

                    case AreaLightActor.EIntensityUnit.eNit:
                        this.updateSolidAngle();
                        this.updateEmittingSurface();
                        this.intensity = iIntensity * this.solidAngle * this.emittingSurface;
                        break;

                    default:
                        this.intensity = iIntensity; // default set it in lumen
                        console.error('Unknown intensity unit : ' + iEIntensityUnit + " ; setted in lumen.");
                }
            }
            else {
                console.error('Unknown intensity unit : ' + iEIntensityUnit + " ; nothing done.");
            }
        }
        else {
            console.error('Unknown intensity value : ' + iIntensity + " ; nothing done. Please use intensity > 0");
        }
        return this;
    };

    AreaLightActor.prototype.getIntensity = function (iEIntensityUnit = STU.AreaLightActor.EIntensityUnit.eLumen) {
        let l_Intensity = this.intensity;
        if (typeof iEIntensityUnit === 'number') {

            switch (iEIntensityUnit) {
                case AreaLightActor.EIntensityUnit.eLumen:
                    break;

                case AreaLightActor.EIntensityUnit.eCandela:
                    this.updateSolidAngle();
                    l_Intensity = l_Intensity / this.solidAngle;
                    break;

                case AreaLightActor.EIntensityUnit.eLumenPerSquareMeter:
                    this.updateEmittingSurface();
                    l_Intensity = l_Intensity / this.emittingSurface;
                    break;

                case AreaLightActor.EIntensityUnit.eNit:
                    this.updateSolidAngle();
                    this.updateEmittingSurface();
                    l_Intensity = (l_Intensity / this.solidAngle) / this.emittingSurface;
                    break;

                default:
                    console.error('Unknown intensity unit : ' + iEIntensityUnit + " ; returned in lumen.");
            }
        }
        else {
            console.error('Unknown intensity unit : ' + iEIntensityUnit + " ; returned in lumen.");
        }
        return l_Intensity;
    };

    // Expose in STU namespace.
    STU.AreaLightActor = AreaLightActor;

    return AreaLightActor;
});

define('StuMiscContent/StuAreaLightActor', ['DS/StuMiscContent/StuAreaLightActor'], function (AreaLightActor) {
    'use strict';

    return AreaLightActor;
});
