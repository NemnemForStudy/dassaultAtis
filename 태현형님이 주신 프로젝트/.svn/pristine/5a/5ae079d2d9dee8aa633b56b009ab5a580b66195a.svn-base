/////////////////////////////////////////////
// Classes definition
//////////////////////////////////////////////
define('DS/XCityWorkers/PrimitiveCreator', ['DS/Mesh/Mesh'], function (CATXMLV6) {
    "use strict";


    /*
        var PrimitiveCreator = {};
        return PrimitiveCreator;
    });
    */
    // var PrimitiveCreator = {};
    //   var PrimitiveCreator = UWA.Class.extend({

    // PrimitiveCreator.PrimitiveCreatorCTOR = 
    var PrimitiveCreator = function (param) {

        // Initialize general parameters
        // ----------------------------------------------------------
        this.processPrimitive = false;
        this.verticesPerFace = 3;

        this.nbBuffers = 0;
        this.nbPrimitives = 0;
        this.primitiveList = [];
        this.current = undefined;


        // Initialize buffers
        // ----------------------------------------------------------
        this.normal = undefined;
        this.color = undefined;
        this.texcoord = undefined;
        this.usercomp = undefined;

        this.vertexBindingArray = undefined;
        this.faceBindingArray = undefined;
        this.primitiveBindingArray = undefined;
        this.userBindingArray = undefined;

        // Private function to create new buffers
        var _defineBuffer = function(component, format, dimension) {

            // @param component {CATXMLV6.VertexComponentEnum}  Component's type. (Null or Undefined means it is an index buffer).
            // @param format {CATXMLV6.DataTypeEnum}            Format of each vector's value.
            // @param dimension {Int}                           The dimension of each vector inside the buffer.

            var buffId = this.nbBuffers++;
            var buff = new CATXMLV6.Buffer();
            if (component !== undefined && component !== null){
                buff.component = component;
            }
            else{
                buff.indexBuffer = true;
            }
            buff.format = format;
            buff.dimension = dimension;
            buff.data = [];
            buff.size = 0;

            return {
                "id": buffId,
                "buffer": buff
            };
        }.bind(this);


        // Binding mode initialization
        // ----------------------------------------------------------
        this.normalBinding = undefined;
        this.colorBinding = undefined;
        this.texCoordBinding = undefined;
        this.userCompBinding = undefined;

        // Private function to initialize binding arrays
        var _setupBinding = function(mode) {

            switch (mode) {
                case PrimitiveCreator.Binding.FACE:
                    if (this.faceBindingArray === undefined){
                        this.faceBindingArray = _defineBuffer(undefined, CATXMLV6.DataTypeEnum.UINT, 1);
                    }
                    return mode;

                case PrimitiveCreator.Binding.PRIMITIVE:
                    if (this.primitiveBindingArray === undefined){
                        this.primitiveBindingArray = _defineBuffer(undefined, CATXMLV6.DataTypeEnum.UINT, 1);
                    }
                    return mode;

                case PrimitiveCreator.Binding.CUSTOM:
                    if (this.userBindingArray === undefined){
                        this.userBindingArray = _defineBuffer(undefined, CATXMLV6.DataTypeEnum.UINT, 1);
                    }
                    return mode;

                case PrimitiveCreator.Binding.VERTEX:
                default:
                    return PrimitiveCreator.Binding.VERTEX;
            }

        }.bind(this);


        // Setup Positions array
        // ----------------------------------------------------------
        this.position = _defineBuffer(CATXMLV6.VertexComponentEnum.POSITION, CATXMLV6.DataTypeEnum.FLOAT, 3);
        this.indexed = param.indexed ? param.indexed : false;
        this.vertexBindingArray = _defineBuffer(undefined, CATXMLV6.DataTypeEnum.UINT, 1);


        // Setup Normals array
        // ----------------------------------------------------------
        this.normal = _defineBuffer(CATXMLV6.VertexComponentEnum.NORMAL, CATXMLV6.DataTypeEnum.FLOAT, 3);
        this.normalBinding = _setupBinding(param.normalBinding);


        // Setup Diffuse Colors array
        // ----------------------------------------------------------
        if (param.useColor) {
            this.color = _defineBuffer(CATXMLV6.VertexComponentEnum.DIFFUSE_COLOR, CATXMLV6.DataTypeEnum.FLOAT, 4);
            this.colorBinding = _setupBinding(param.colorBinding);
        }


        // Setup Texture Coordinates arrays
        // (so far, only 8 texture coordinates arrays allowed)
        // ----------------------------------------------------------
        var i;
        if (param.useTexCoord) {
            this.texcoord = [];
            this.texCoordBinding = [];

            var nbTexCoord = param.nbTexCoord ? param.nbTexCoord : 1;
            if (nbTexCoord === 0 || nbTexCoord > 8){
                nbTexCoord = 1;
            }

            for (i = 0; i < nbTexCoord; ++i) {
                this.texcoord.push(_defineBuffer(CATXMLV6.VertexComponentEnum.TEX_COORD_0 + i, CATXMLV6.DataTypeEnum.FLOAT, 3));
                if (param.texCoordBinding && param.texCoordBinding.length){
                    this.texCoordBinding.push(_setupBinding(param.texCoordBinding[i]));
                }
                else{
                    this.texCoordBinding.push(_setupBinding(param.texCoordBinding));
                }
            }
        }

        // Setup User Component arrays
        // (so far, only 1 user component array allowed)
        // (Component size is always 3 and format is float)
        // ----------------------------------------------------------
        if (param.useUserComp) {
            this.usercomp = [];
            this.userCompBinding = [];

            var nbUserComp = param.nbUserComp ? param.nbUserComp : 1;
            if (nbUserComp === 0 || nbUserComp > 8){
                nbUserComp = 1;
            }

            for (i = 0; i < nbUserComp; ++i) {
                this.usercomp.push(_defineBuffer(CATXMLV6.VertexComponentEnum.USER_COMPONENT_0 + i, CATXMLV6.DataTypeEnum.FLOAT, 3));
                if (param.userCompBinding && param.userCompBinding.length){
                    this.userCompBinding.push(_setupBinding(param.userCompBinding[i]));
                }
                else{
                    this.userCompBinding.push(_setupBinding(param.userCompBinding));
                }
            }
        }
    };

    // PrimitiveCreator.prototype = {

    //    constructor: 

    PrimitiveCreator.prototype._concat = function(first, second) {
        var count;
        for (count = second.length; count; count--) {
            first.push(second[second.length - count]);
        }
    };

    PrimitiveCreator.prototype.pushVertexIndices = function(ind) {

        if (!this.processPrimitive || !(ind instanceof Array)){
            return;
        }

        this._concat(this.current.vertexBindingArray, ind);

        if (this.faceBindingArray) {

            var i, l, s, faceInd, array, vPerFace;
            for (i = 0, l = ind.length; i < l; ++i) {
                s = this.current.nbVertexIndices + i;
                if (s % this.verticesPerFace === 0) {
                    faceInd = Math.floor(s / this.verticesPerFace);
                    array = [];
                    vPerFace = this.verticesPerFace;
                    while (vPerFace--) {
                        array.push(faceInd);
                    }
                    this._concat(this.current.faceBindingArray, array);
                }
            }
        }

        this.current.nbVertexIndices += ind.length;
    };



    PrimitiveCreator.prototype.pushVertex = function(v) {

        if (!this.processPrimitive ){
            return;
        }

        if (!this.indexed){
            this.pushVertexIndices([this.current.nbVertices]);
        }

        this.current.position.push(v[0]);
        this.current.position.push(v[1]);
        this.current.position.push(v[2]);

        this.current.nbVertices++;
    };



    PrimitiveCreator.prototype.pushNormal = function(n) {

        if (!this.processPrimitive || !(n instanceof Array) || (n.length !== 3)){
            return;
        }

        this.current.normal.push(n[0]);
        this.current.normal.push(n[1]);
        this.current.normal.push(n[2]);

        this.current.nbNormals++;
    };



    PrimitiveCreator.prototype.pushColor = function(c) {

        if (!this.processPrimitive || (this.color === undefined) || !(c instanceof Array) ){
            return;
        }

        this.current.color.push(c[0]);
        this.current.color.push(c[1]);
        this.current.color.push(c[2]);
       
        if (c.length !== 4) {
            this.current.color.push(1.0);
        } else {
            this.current.color.push(c[2]);
        }

        this.current.nbColors++;
    };

 
    PrimitiveCreator.prototype.pushTexCoord = function(ind, uv) {

        if (!this.processPrimitive || (this.texcoord === undefined) || (this.texcoord[ind] === undefined) || !(uv instanceof Array)){
            return;
        }

        this.current.texcoord[ind].push(uv[0]);
        this.current.texcoord[ind].push(uv[1]);
        if (uv.length === 3){
            this.current.texcoord[ind].push(uv[2]);
        }
        else{
            this.current.texcoord[ind].push(0.0);
        }
    };


    PrimitiveCreator.prototype.pushUserComp = function(ind, uc) {

        if (!this.processPrimitive || (this.usercomp === undefined) || (this.usercomp[ind] === undefined) || !(uc instanceof Array)){
            return;
        }

        this.current.usercomp[ind].push(uc[0]);
        this.current.usercomp[ind].push(uc[1]);
        this.current.usercomp[ind].push(uc[2]);
    };

    PrimitiveCreator.prototype.startPrimitive = function(connectivity) {
        if (this.processPrimitive){
            return;
        }
        this.processPrimitive = true;

        this.current = {};
        this.current.connectivity = connectivity !== undefined ? connectivity : CATXMLV6.ConnectivityTypeEnum.TRIANGLES;

        this.current.nbVertexIndices = 0;
        this.current.vertexBindingArray = [];
        if (this.faceBindingArray){
            this.current.faceBindingArray = [];
        }
        if (this.userBindingArray){
            this.current.userBindingArray = [];
        }


        this.current.nbVertices = 0;
        this.current.position = [];
        this.current.nbNormals = 0;
        this.current.normal = [];
        if (this.color) {
            this.current.color = [];
            this.current.nbColors = 0;
        }

        var i, l;
        if (this.texcoord) {
            this.current.texcoord = [];
            this.current.nbTexcoord = [];
            for (i = 0, l = this.texcoord.length; i < l; ++i) {
                this.current.texcoord.push([]);
                this.current.nbTexcoord.push(0);
            }
        }
        if (this.usercomp) {
            this.current.usercomp = [];
            this.current.nbUserComp = [];
            for (i = 0, l = this.usercomp.length; i < l; ++i) {
                this.current.usercomp.push([]);
                this.current.nbUserComp.push(0);
            }
        }


    };


    PrimitiveCreator.prototype.endPrimitive = function(identifier) {

        if (!this.processPrimitive){
            return;
        }


        // Test if primitive description is correct
        // ----------------------------------------------------------
        if (this.current.nbVertexIndices === 0) {
            console.warn("PrimitiveCreator: Vertex indices is empty.");
            return;
        }
        // TL1 : dop not check becaus of editable mesh
      /*  if (Math.max.apply(Math, this.current.vertexBindingArray) >= this.current.nbVertices || Math.min.apply(Math, this.current.vertexBindingArray) < 0) {
            console.warn("PrimitiveCreator: Incoherence between vertices and indices.");
            return;
        }*/


        if (this.current.nbVertexIndices % this.verticesPerFace !== 0) {
            console.warn("PrimitiveCreator: Missing indices to complete last triangle.");
            //TODO
            console.warn("Not manage so far. Please complete your primitive to continue.");
            return;
        }


        // Private function to create Vertex Component and attach them to a primitive
        // ----------------------------------------------------------
        var _createVertexComponent = function(primitive, element, size, mode) {

            var i, l;
            var comp = new CATXMLV6.VertexComponent();
            comp.nbValuesPerVertex = element.buffer.dimension;
            comp.component = element.buffer.component;
            comp.format = element.buffer.format;
            comp.nbVertices = size;
            comp.bufferId = element.id;
            comp.offset = element.buffer.size / comp.nbValuesPerVertex;

            switch (mode) {
                case PrimitiveCreator.Binding.FACE:
                    comp.indices = new CATXMLV6.IndexArray();
                    comp.indices.format = this.faceBindingArray.buffer.format;
                    comp.indices.bufferId = this.faceBindingArray.id;
                    comp.indices.offset = this.faceBindingArray.buffer.size;

                    break;

                case PrimitiveCreator.Binding.PRIMITIVE:
                    comp.indices = new CATXMLV6.IndexArray();
                    comp.indices.format = this.primitiveBindingArray.buffer.format;
                    comp.indices.bufferId = this.primitiveBindingArray.id;
                    comp.indices.offset = this.primitiveBindingArray.buffer.size;

                    break;

                case PrimitiveCreator.Binding.CUSTOM:
                    comp.indices = new CATXMLV6.IndexArray();
                    comp.indices.format = this.userBindingArray.buffer.format;
                    comp.indices.bufferId = this.userBindingArray.id;
                    comp.indices.offset = this.userBindingArray.buffer.size;

                    break;

                case PrimitiveCreator.Binding.VERTEX:
                default:
                    comp.indices = new CATXMLV6.IndexArray();
                    comp.indices.format = this.vertexBindingArray.buffer.format;
                    comp.indices.bufferId = this.vertexBindingArray.id;
                    comp.indices.offset = this.vertexBindingArray.buffer.size;

                    break;
            }

            primitive.addVertexComponent(comp);
        }.bind(this);


        // Create Primitive
        // ----------------------------------------------------------
        var prim = new CATXMLV6.Primitive();
        prim.identifier = (identifier === undefined || identifier === "") ? this.nbPrimitives : identifier;
        prim.nbIndices = this.current.nbVertexIndices;
        prim.connectivity = this.current.connectivity;
        prim.attr = {
            fill: new CATXMLV6.FillAttributes(),
            line: new CATXMLV6.LineAttributes(),
            point: new CATXMLV6.PointAttributes()
        };


        // Create vertex components
        // ----------------------------------------------------------
        var i, l;
        _createVertexComponent(prim, this.position, this.current.nbVertices);
        _createVertexComponent(prim, this.normal, this.current.nbNormals, this.normalBinding);
        if (this.color){
            _createVertexComponent(prim, this.color, this.current.nbColors, this.colorBinding);
        }
        if (this.texcoord) {
            for (i = 0, l = this.texcoord.length; i < l; ++i){
                _createVertexComponent(prim, this.texcoord[i], this.current.nbTexcoord[i], this.texCoordBinding[i]);
            }
        }
        if (this.usercomp) {
            this.current.usercomp = [];
            for (i = 0, l = this.usercomp.length; i < l; ++i){
                _createVertexComponent(prim, this.usercomp[i], this.current.nbUserComp[i], this.userCompBinding[i]);
            }
        }



        // Merge current primitive's arrays into group's buffers
        // ----------------------------------------------------------
        this._concat(this.position.buffer.data, this.current.position);
        this.position.buffer.size += this.current.position.length;

        this._concat(this.normal.buffer.data, this.current.normal);
        this.normal.buffer.size += this.current.normal.length;

        if (this.color) {
            this._concat(this.color.buffer.data, this.current.color);
            this.color.buffer.size += this.current.color.length;
        }

        if (this.texcoord) {
            for (i = 0, l = this.texcoord.length; i < l; ++i) {
                this._concat(this.texcoord[i].buffer.data, this.current.texcoord[i]);
                this.texcoord[i].buffer.size += this.current.texcoord[i].length;
            }
        }

        if (this.usercomp) {
            for (i = 0, l = this.usercomp.length; i < l; ++i) {
                this._concat(this.usercomp[i].buffer.data, this.current.usercomp[i]);
                this.usercomp[i].buffer.size += this.current.usercomp[i].length;
            }
        }

        this._concat(this.vertexBindingArray.buffer.data, this.current.vertexBindingArray);
        this.vertexBindingArray.buffer.size += this.current.vertexBindingArray.length;

        if (this.faceBindingArray) {
            this._concat(this.faceBindingArray.buffer.data, this.current.faceBindingArray);
            this.faceBindingArray.buffer.size += this.current.faceBindingArray.length;
        }

        if (this.primitiveBindingArray) {
            var array = [],
                nbInd = this.current.nbVertexIndices;
            while (nbInd--){ 
                array.push(this.nbPrimitives);
            }
            this._concat(this.primitiveBindingArray.buffer.data, array);
            this.primitiveBindingArray.buffer.size += this.current.nbVertexIndices;
        }

        if (this.userBindingArray) {
            this._concat(this.userBindingArray.buffer.data, this.current.userBindingArray);
            this.userBindingArray.buffer.size += this.current.userBindingArray.length;
        }



        // Save current primitive
        // ----------------------------------------------------------
        this.primitiveList.push(prim);
        this.nbPrimitives++;



        // Reset primitive description
        // ----------------------------------------------------------
        this.current = undefined;
        this.processPrimitive = false;
    };

    PrimitiveCreator.prototype.compilePrimitive = function(name, editable) {

        // Create an empty PrimitiveGroup
        // ----------------------------------------------------------
        var pGroup = new CATXMLV6.PrimitiveGroup();

        if (editable !== undefined) {
            pGroup.editable = editable;
        }

        pGroup.name = name;

        pGroup.fillAttr = new CATXMLV6.FillAttributes();
        pGroup.lineAttr = new CATXMLV6.LineAttributes();
        pGroup.pointAttr = new CATXMLV6.PointAttributes();


        // Transform buffer data array to Float32Array
        // ----------------------------------------------------------
        var i, l;
        this.position.buffer.data = new Float32Array(this.position.buffer.data);
        this.normal.buffer.data = new Float32Array(this.normal.buffer.data);
        if (this.color){
            this.color.buffer.data = new Float32Array(this.color.buffer.data);
        }
        if (this.texcoord) {
            for (i = 0, l = this.texcoord.length; i < l; ++i){
                this.texcoord[i].buffer.data = new Float32Array(this.texcoord[i].buffer.data);
            }
        }
        if (this.usercomp) {
            for (i = 0, l = this.usercomp.length; i < l; ++i){
                this.usercomp[i].buffer.data = new Float32Array(this.usercomp[i].buffer.data);
            }
        }


        // Transform buffer data array to Uint16Array
        // ----------------------------------------------------------
        this.vertexBindingArray.buffer.data = new Uint16Array(this.vertexBindingArray.buffer.data);
        if (this.faceBindingArray){
            this.faceBindingArray.buffer.data = new Uint16Array(this.faceBindingArray.buffer.data);
        }
        if (this.primitiveBindingArray){
            this.primitiveBindingArray.buffer.data = new Uint16Array(this.primitiveBindingArray.buffer.data);
        }
        if (this.userBindingArray){
            this.userBindingArray.buffer.data = new Uint16Array(this.userBindingArray.buffer.data);
        }


        // Add buffers to PrimitiveGroup
        // ----------------------------------------------------------
        pGroup.addBuffer(this.position.id, this.position.buffer);
        pGroup.addBuffer(this.normal.id, this.normal.buffer);
        if (this.color){
            pGroup.addBuffer(this.color.id, this.color.buffer);
        }
        if (this.texcoord) {
            for (i = 0, l = this.texcoord.length; i < l; ++i){
                pGroup.addBuffer(this.texcoord[i].id, this.texcoord[i].buffer);
            }
        }
        if (this.usercomp) {
            for (i = 0, l = this.usercomp.length; i < l; ++i){
                pGroup.addBuffer(this.usercomp[i].id, this.usercomp[i].buffer);
            }
        }

        pGroup.addBuffer(this.vertexBindingArray.id, this.vertexBindingArray.buffer);
        if (this.faceBindingArray){
            pGroup.addBuffer(this.faceBindingArray.id, this.faceBindingArray.buffer);
        }
        if (this.primitiveBindingArray){
            pGroup.addBuffer(this.primitiveBindingArray.id, this.primitiveBindingArray.buffer);
        }
        if (this.userBindingArray){
            pGroup.addBuffer(this.userBindingArray.id, this.userBindingArray.buffer);
        }


        // Attach primitives
        // ----------------------------------------------------------
        for (i = this.nbPrimitives; i; i--){
            pGroup.addPrimitive(this.primitiveList[this.nbPrimitives - i]);
        }

        //console.log('worker : ' + this.nbPrimitives);
        // Return PrimitiveGroup
        // ----------------------------------------------------------
        return pGroup;
    };

    PrimitiveCreator.Binding = {
        VERTEX: 0,
        FACE: 1,
        PRIMITIVE: 2,
        CUSTOM: 3
    };

    return PrimitiveCreator;
});
