/**
  * @author LBR1
  * 23/03/2021
  */

 (function (workerContext) {

    "use strict";
    workerContext.importScripts('../AmdLoader/AmdLoader.js');
    workerContext.importScripts('FakeDomForWebWorker.js'); // Add a dummy DOM to the worker context to be able to load sources referencing it

    require.config({
        baseUrl: ".."
    });

    // globals
    var nbFeatPerNode;
    var featureBatchSize;
    var nbMultiPolygonSession;
    var nbPolygonSession;
    var urbanBaseProjection;
    var factoryStridAttribute;
    var infoStrid;
    var alternAttribute;
    var rendering;
    var useNormalMap;
    var useSpecularMap;
    var proj4Projection;
    var currentPrimRendering;
    var nbInfoPixelsPolygon;
    var createRoofObjects;
    var layerColor;
    var roofAttribute;
    var roofAngleAttribute;
    var walltexAttribute;
    var tdbAttribute;
    var creators;
    var rand;
    var slabAltitude;
    var precomputedZValues;
    var precomputedZValuesIndex;
    var preloadedUrbanProj;
    var preloadedInputCRS;
    var primitiveRenderings;
    var datavizRenderings;
    var fromGeometrySet;
    var indexSession;
    var nbLines;
    var creatorsLine;
    var refBbox;

    workerContext.onmessage = function (e) {

        // override the Downloader source to not load useless dependencies for workers 
        define("DS/XCityTools/Downloader",[],function(){return {}; });

        require([
            'DS/Visualization/ThreeJS_DS',
            'DS/XCityLayer/VectorLoaderJSON',
            'DS/XCityLayer/Vector',
            'DS/XCityTools/Geocoder',
            'DS/XCityRendering/RenderingHandlerPolygon',
            'DS/XCityTools/PrimitiveGeometryCreator',
            'DS/XCityTools/TextureTools',
            'DS/xCityBasicUtils/Utils',
            'DS/XCityGeometry/Building',
            'DS/XCityGeometry/Line',
            'DS/Visualization/Node3D',
            'DS/Mesh/MeshUtils',
            'DS/XCityRendering/DatavizRendering',
            'VENProj4js-2.7.2/js/proj4',
            'DS/XCityRendering/PrimitiveRendering',
            'DS/XCityTools/RenderingTools',
            'DS/XCityTools/Expression'
          ],
            function (
                THREE,
                VectorLoaderJSON,
                Vector,
                Geocoder,
                RenderingHandlerPolygon,
                PrimitiveGeometryCreator,
                TextureTools,
                Utils,
                Building,
                Line,
                Node3D,
                Mesh,
                DatavizRendering,
                Proj4,
                PrimitiveRendering,
                RenderingTools,
                Expression
              ) {

                // Receive and store useful information for the polygon construction from the main thread
                // which cant be obtained from within the worker (different context), such as urban properties.
                function init(initData) {
                    refBbox = initData.refBbox;
                    indexSession = initData.indexSession;
                    fromGeometrySet = initData.fromGeometrySet;
                    slabAltitude = initData.slabAltitude;
                    proj4Projection = initData.proj4Projection;
                    datavizRenderings = initData.datavizRenderings;
                    primitiveRenderings = initData.primitiveRenderings;
                    useNormalMap = initData.useNormalMap;
                    useSpecularMap = initData.useSpecularMap;
                    nbFeatPerNode = initData.nbFeatPerNode;
                    featureBatchSize = nbFeatPerNode;
                    nbMultiPolygonSession = 0;
                    nbPolygonSession = 0;
                    nbLines = 0; // imitates the role of the nbLines variable of the LineBuilder class
                    urbanBaseProjection = initData.urbanBaseProjection;
                    factoryStridAttribute = initData.factoryStridAttribute;
                    infoStrid = initData.infoStrid;
                    precomputedZValues = initData.precomputedZValues;
                    precomputedZValuesIndex = 0;
                    preloadedUrbanProj = new Proj4.Proj(initData.preloadedUrbanProj);
                    preloadedInputCRS = new Proj4.Proj(initData.preloadedInputCRS);
                    alternAttribute = "ALTERN";
                    creatorsLine = createElementsLine();
                    var factoryParam = {
                        stridAttribute: factoryStridAttribute,
                        useNormalMap: useNormalMap,
                        useSpecularMap: useSpecularMap,
                        elevationMode: initData.elevationMode,
                        elevation: initData.elevation,
                        elevationOffset: initData.elevationOffset
                    };

                    var defaultRenderingFromMainThread = initData.defaultRendering;

                    rendering = new RenderingHandlerPolygon(null, factoryParam);

                    /*if(initData.currentRenderingData && initData.currentRenderingData.Material) 
                        rendering.currentRendering.renderingData = initData.currentRenderingData.Material;
                    if(initData.defaultRenderingData && initData.currentRenderingData.Material) 
                        rendering.defaultRendering.renderingData = initData.defaultRenderingData.Material;*/

                    if(initData.currentRenderingData) rendering.currentRendering.renderingData = initData.currentRenderingData;
                    if(initData.defaultRenderingData) rendering.defaultRendering.renderingData = initData.defaultRenderingData;
                    addRenderingFromMainThreadRendering();

                    // copy rendering parameters from main thread
                    rendering.defaultRendering.addOver(defaultRenderingFromMainThread);

                    // make sure that custom parameters override default ones
                    Object.assign(rendering.defaultRendering.renderingData, factoryParam);

                    layerColor = [1.0, 1.0, 1.0]; // default primitive color
                    createRoofObjects = initData.roofObjects;
                    nbInfoPixelsPolygon = 18;
                    roofAttribute = "ROOFHGT";
                    roofAngleAttribute = "ROOFANGLE";
                    alternAttribute = "ALTERN";
                    walltexAttribute = "WALLTEX";
                    tdbAttribute = "TDB";
                }

                function createElementsLine() {
                    let nbInfoPixLine = Object.keys(Line.BUFFER_IMAGE).length;
                    var scale = 1,
                        data = [],
                        i;

                    //texture info init informations
                    data.push(nbInfoPixLine); //nb columns
                    data.push(0); //nb lines
                    data.push(scale); //scale mercator 900'913
                    data.push(0.0); // clock time for animated lines
                    for (i = 0; i < nbInfoPixLine - 4; i += 1) { //fill array with 0 to correspond to the number of element to modify
                        data.push(0);
                    }

                    return {
                        lineMesh: new PrimitiveGeometryCreator({
                            "indexed": true,
                            "useNormal": false,
                            "useColor": true,
                            "useTexCoord": false
                        }),
                        textureInfo: {
                            "name": "lines_textureInfo",
                            "idMap": {},
                            "filter": THREE.NearestFilter,
                            "format": THREE.LuminanceFormat, //data stored are float
                            "xSize": nbInfoPixLine,
                            "ySize": 1.0, // nb lines + 1 for init information
                            "data": data
                        }
                    };
                }

                function resetVar() {
                    precomputedZValuesIndex = 0;
                    nbMultiPolygonSession = 0;
                    nbPolygonSession = 0;
                    creators = null;
                }

                function addRenderingFromMainThreadRendering() {
                    // dataviz rendering
                    var counter = 0;
                     // adding session index specific to web workers (see comment on id generation below)
                     // in order to have the prim id geenerated in amain thread matching the ones given in workers
                    for (let key in datavizRenderings) {
                        if (key !== "length") {
                            if(datavizRenderings[key].ElementMaterial) {
                                counter++;
                                var material = RenderingTools._JSONToRendering(datavizRenderings[key].ElementMaterial);
                                let temp = new DatavizRendering(material, datavizRenderings[key].Filter);
                                rendering.currentRendering.datavizRenderings[key] = temp;
                                rendering.currentRendering.datavizRenderings["length"] = counter;
                            } else if(datavizRenderings[key].DatavizMaterial) {
                                counter++;
                                var expr = new Expression();
                                const datavizType = Object.keys(datavizRenderings[key].DatavizMaterial)[0];
                                expr.expr = datavizRenderings[key].DatavizMaterial[datavizType];
                                let temp = new DatavizRendering();
                                temp.exprData = {};
                                temp.exprData[datavizType] = expr;
                                rendering.currentRendering.datavizRenderings[key] = temp;
                                rendering.currentRendering.datavizRenderings["length"] = counter;
                            }
                        }
                    }
                    rendering.currentRendering.datavizRenderings["length"] = counter;
                    // primitive element rendering
                    counter=0;
                    let newPrimRend = {};
                    for (let key in primitiveRenderings) {
                            counter++;
                            let stidKey = primitiveRenderings[key].ElementIds[0];
                            let renderingData = RenderingTools._JSONToRendering(primitiveRenderings[key].ElementMaterial);
                            newPrimRend[stidKey] = new PrimitiveRendering(primitiveRenderings[key]);
                            newPrimRend[stidKey].renderingData = renderingData;
                            for(var property in newPrimRend[stidKey].renderingData) {
                                var renderingObject = newPrimRend[stidKey].renderingData[property];
                                // flag hack: we only exchanged data with main thread an lost objects prototypes (instanceof broken)
                                // but we will need to know if the object is an instance of ColorGradient for it to work
                                if(renderingObject.xCityid && renderingObject.xCityid.startsWith("xCityColorGradient")) {
                                    renderingObject.isColorGradientForWorkers = true;
                                }
                            }
                    }
                    newPrimRend["length"] = counter;
                    rendering.currentRendering.primitiveRenderings = newPrimRend;
                }

                function computeAltitudeToApply(material, vertices) {
                    var altitude = 0;
                    if (Utils.is(vertices[0].z) && material.elevationMode === 'geometry') {
                        altitude = vertices[0].z;
                    } else {
                        if (material.elevationMode === 'advanced' || material.elevationMode === 'geometry') {
                            altitude = material.elevation;
                        } else if(material.elevationMode === 'ground' ) {
                          // z has been set in main thread and collected in createLineSet
                          altitude = precomputedZValues[precomputedZValuesIndex++];
                        } else {
                            // We have no access to urban, so we return a default value.
                            // return this.urban.USR.getGroundHeight(vertex.x, vertex.y);
                            console.warn("Can't use urban.USR to compute vertex altitude in worker (like for a ground mode). Returning slabAltitude.");
                            altitude = slabAltitude;
                        }
                    }
                    if (material.elevationOffset) {
                        altitude = altitude + material.elevationOffset;
                    }
                    return altitude;
                }

                function initShape(featureExtRingVertices, posTile, info, altitude, height, roofHeight) {
                    // Create shape
                    var shape = [],
                        i, l, min = [],
                        max = [];
                    for (i = 0, l = featureExtRingVertices.length; i < l; i++) {
                        shape.push(new THREE.Vector2(featureExtRingVertices[i].x - posTile.x, featureExtRingVertices[i].y - posTile.y));

                        info.posSize.center.add(featureExtRingVertices[i]);
                        if (min === undefined || max === undefined) {
                            min = [shape[i].x, shape[i].y];
                            max = [shape[i].x, shape[i].y];
                        }
                        min[0] = Math.min(min[0], shape[i].x);
                        min[1] = Math.min(min[1], shape[i].y);
                        max[0] = Math.max(max[0], shape[i].x);
                        max[1] = Math.max(max[1], shape[i].y);
                    }

                    // Update primitive information
                    info.posSize.width = max[1] - min[1];
                    info.posSize.length = max[0] - min[0];
                    info.posSize.height = height + roofHeight + 1.0;
                    info.posSize.altitude = altitude;
                    info.posSize.center.divideScalar(l);
                    info.posSize.center.z = info.posSize.altitude + info.posSize.height / 2.0;

                    return shape;
                }

                function initHoles(geom, posTile) {
                    var holes = [];
                    for (var i = 1; i < geom.geometryList.length; i++) {
                        var featureIntRingVertices = geom.geometryList[i].vertexList;
                        var shape = [];
                        var len2 = featureIntRingVertices.length;
                        for (var j = 0; j < len2; j++) {
                            shape.push(new THREE.Vector2(featureIntRingVertices[j].x - posTile.x, featureIntRingVertices[j].y - posTile.y));
                        }
                        holes.push(shape);
                    }
                    return holes;
                }

                function createElements(tdbName, infoTile, nbInfoPix, scale) {
                    var elements = {};
                    elements.tdbName = tdbName;
                    elements.walls = new PrimitiveGeometryCreator({
                        "indexed": true,
                        "useColor": true,
                        "normalBinding": PrimitiveGeometryCreator.Binding.FACE,
                        "useTexCoord": true,
                        "nbTexCoord": 1,
                        "texCoordBinding": PrimitiveGeometryCreator.Binding.VERTEX
                    });
                    elements.roofs = new PrimitiveGeometryCreator({
                        "indexed": true,
                        "useColor": true,
                        "normalBinding": PrimitiveGeometryCreator.Binding.FACE,
                        "useTexCoord": true,
                        "nbTexCoord": 2,
                        "texCoordBinding": PrimitiveGeometryCreator.Binding.VERTEX
                    });
                    var textureInfo = {};
                    textureInfo.name = "buildings_info_" + infoTile.LOD + "_" + infoTile.I + "_" + infoTile.J;
                    textureInfo.idMap = {};
                    textureInfo.xSize = nbInfoPix; //nb attributes
                    textureInfo.ySize = 1.0; // nb building + 1

                    var data = [];
                    TextureTools.pushPixel(data, TextureTools.int2color(nbInfoPix)); // nb columns
                    TextureTools.pushPixel(data, [0.0, 0.0, 0.0, 0.0]); //nb lines (init to 0)
                    TextureTools.pushPixel(data, TextureTools.int2color(scale)); //scale mercator 900'913 (int part to code float number into color)
                    TextureTools.pushPixel(data, TextureTools.float2color(scale));
                    for (var i = 0; i < (nbInfoPix - 4) * 4; ++i) {
                        data.push(0.0);
                    }

                    textureInfo.data = data;
                    elements.textureInfo = textureInfo;
                    return elements;
                }

                function getTextureIndex( /*wallTex*/) {
                    var url = currentPrimRendering.mapUrl,
                        result = -1;
                    if (Utils.is(url)) {
                        result = rendering.getIndexForTextureUrl(url);
                    }
                    return result;
                }

                function updatesInfoTextures(textureInfo, strid, color, wallTex, altitude, height, roofHeight, roofUVortho, roofMainDir, roofOrigin, flags) {

                    if (!Utils.is(textureInfo.idMap[strid])) {
                        textureInfo.idMap[strid] = [];
                    }
                    textureInfo.idMap[strid].push(textureInfo.ySize);

                    // Update current building parameters
                    if (color) {
                        TextureTools.pushPixel(textureInfo.data, [color.r, color.g, color.b, textureInfo.opacity]);
                    } else {
                        //TextureTools.pushPixel(textureInfo.data, [1.0, 1.0, 1.0, 1.0]);
                        TextureTools.pushPixel(textureInfo.data, [layerColor[0], layerColor[1], layerColor[2], textureInfo.opacity]);
                    }

                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(wallTex));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(altitude));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(altitude));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(height));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(height));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(roofHeight));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(roofHeight));
                    TextureTools.pushPixel(textureInfo.data, [roofMainDir.x, roofMainDir.y, 0.0, 1.0]);

                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(roofUVortho.x));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(roofUVortho.x));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(roofUVortho.y));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(roofUVortho.y));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(roofOrigin.x));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(roofOrigin.x));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.int2color(roofOrigin.y));
                    TextureTools.pushPixel(textureInfo.data, TextureTools.float2color(roofOrigin.y));

                    TextureTools.pushPixel(textureInfo.data, [flags, flags, flags, flags]); //flags

                    textureInfo.ySize++;

                    // Update NB elements
                    var tmp = TextureTools.int2color(textureInfo.ySize);
                    textureInfo.data[4] = tmp[0]; // second rgb value in _createElement (nb lines)
                    textureInfo.data[5] = tmp[1];
                    textureInfo.data[6] = tmp[2];
                    textureInfo.data[7] = tmp[3];
                }
                
                function createOneLine(session, info, geom, attributes) {
                    var i, len = geom.geometryList.length;
                    var material = currentPrimRendering;
                    var posTile = session.posTile,
                        geometry, altitude, line, j;
                    if (material && material.geometricMode && material.geometricMode === "extruded") {
                        // nothing
                    } else {
                        altitude = computeAltitudeToApply(material, geom.geometryList[0].getVertices()); //all strokes must be at the same altitude

                        for (i = 0; i < len; i++) {
                            geometry = geom.geometryList[i];

                            for (j = 0; j < geometry.getVertices().length; j++) {
                                geometry.getVertices()[j].x = geometry.getVertices()[j].x - posTile.x;
                                geometry.getVertices()[j].y = geometry.getVertices()[j].y - posTile.y;
                                geometry.getVertices()[j].z = altitude;
                            }

                            var vertices = geometry.getVertices(0);
                            if (vertices[0].x !== vertices[vertices.length - 1].x || vertices[0].y !== vertices[vertices.length - 1].y) {
                                geometry.vertexList.push(geometry.vertexList[0]);
                            }
                            //create creators in buildOne
                            line = buildOneLine(info, geometry, undefined, undefined, attributes);
                            if (!Utils.is(session.lines)) {
                                session.lines = {};
                            }

                            if (!Utils.is(session.lines[info.strid])) {
                                session.lines[info.strid] = [];
                            }

                            if (line.isTransparent) {
                                session.forceTransparent = true;
                            }
                            session.lines[info.strid].push(line);
                        }
                    }
                    //this.addExtrudedStroke();
                }

                function initBSphere(geom) {

                    var minmax = {
                        minX: 99999999,
                        minY: 99999999,
                        maxX: -99999999,
                        maxY: -99999999
                    };

                    var boundingSphere = new THREE.Sphere();
                    for (var i = 0; i < geom.getNumGeometries() ; ++i) {
                        var shape = Vector.getVerticesAsArrayOfLines(geom, i);
                        shape.forEach(function (position) {
                            minmax.minX = Math.min(position.x, minmax.minX);
                            minmax.minY = Math.min(position.y, minmax.minY);
                            minmax.maxX = Math.max(position.x, minmax.maxX);
                            minmax.maxY = Math.max(position.y, minmax.maxY);
                        });
                    }

                    boundingSphere.radius = Math.sqrt(Math.pow(minmax.maxX - minmax.minX, 2.0) + Math.pow(minmax.maxY - minmax.minY, 2.0)) / 2.0;
                    boundingSphere.center.x = (minmax.minX + minmax.maxX) / 2.0;
                    boundingSphere.center.y = (minmax.minY + minmax.maxY) / 2.0;
                    boundingSphere.center.z = 0;
                    return boundingSphere;
                }

                function updatesInfoTexturesLine(strid, attr, line) {

                    var material = rendering.getRenderingValues(strid, attr);
                    var primitiverendering = rendering.getPrimitiveRenderingValues(strid, attr);
                    var textureInfo = creatorsLine.textureInfo,
                        data = textureInfo.data;
                    var dashIndex = 0,
                        dashLength = 1;
                    var pattern = material.dashPattern;
                    if (Utils.is(pattern)) {
                        dashIndex = rendering.getIndexFromPattern(pattern);
                        dashLength = pattern[pattern.length - 1];
                    }
                    if (material.opacity < 1.0) {
                        line.isTransparent = true;
                    }
                    // Add the new number of lines
                    data[1] = nbLines;
                    data.push(material.color.r);
                    data.push(material.color.g);
                    data.push(material.color.b);
                    data.push(material.lineWidth);
                    data.push(material.opacity);
                    data.push(material.opacityFactor);
                    data.push((material.animation && material.animation.speed) || 10); //timer 1
                    data.push((material.animation && material.animation.nbPoints) || 1);
                    data.push((material.animation && material.animation.offest) || 0);
                    data.push(((material.animation && material.animation.reverse === true)) ? 1.0 : 0.0);
                    data.push((material.animation && material.animation.dashSize) || 10.0);
                    data.push((material.animation && material.animation.samplingRate) || 0); //if no sampling rate is provided, the line is considered uniform all along the distance, no matter the density of points
                    data.push((material.animation && material.animation.minOpacity) || 0.1);
                    data.push((material.animation && material.animation.gapSize) || 10.0);
                    data.push(((material.animation && material.animation.loop === false)) ? 0.0 : 1.0);
                    var flags = line.getFlagsFromPrimitiveRendering(primitiverendering);
                    data.push(flags); //primitive modified flags // useless on parent layer but necessary for squaring the texture

                    data.push(dashIndex);
                    data.push(dashLength);

                    if (!Utils.is(textureInfo.idMap[strid])) {
                        textureInfo.idMap[strid] = textureInfo.ySize;
                    }
                    textureInfo.ySize += 1;
                }


                function buildOneLine(primInfo, geom, coordinates, autoIdIncrement, attributes) {

                    var strid;
                    if (typeof primInfo === "string") {
                        strid = primInfo;
                    } else {
                        strid = primInfo.strid;
                        primInfo.bSphere = initBSphere(geom);
                    }

                    if (autoIdIncrement !== undefined && autoIdIncrement === true) {
                        strid = strid.concat("_" + nbLines);
                    }
                    var numline = nbLines;
                    var textureInfo = creatorsLine.textureInfo;
                    if (Utils.is(textureInfo.idMap[strid])) {
                        numline = textureInfo.idMap[strid] - 1;
                    }


                    var line = new Line(null, {
                        'id': strid,
                        'numLine': numline,
                        'creators': creatorsLine,
                        'geom': geom,
                        'rendering': rendering,
                        'coordinates': coordinates, //maybe undefined here and defined in LineGeometry by 3d mesh center,
                        'attributes': attributes
                    });

                    nbLines += 1;

                    updatesInfoTexturesLine(strid, attributes, line);

                    // flag used to detect web workers line during modification of a line's rendering on main thread
                    line.isWebWorkerLine = true;

                    return line;
                }

                function addOneStroke(session, info, geom, feature) {
                    var rendering = currentPrimRendering;
                    var isLineMode = (rendering.geometricMode === "line");
                    var isStroke = (Utils.is(rendering.stroke) && Utils.is(rendering.stroke.enable) && rendering.stroke.enable);
                    if (isLineMode || isStroke) {

                        var featureExtRingVertices = geom.getVertices(0);
                        if (featureExtRingVertices === undefined) {
                            return;
                        }
                        // Define tile position offset
                        if (session.builder === undefined) {
                            session.builder = {};
                        }

                        // var i, len = geom.geometryList.length;
                        // for(i = 0; i < len;i++){
                        // var geometry = geom.geometryList[i];
                        createOneLine(session, info, geom, feature.attributes);
                        //}
                    }
                }

                function addOneBuilding(session, geom, feature, strid, info) {
                    var v, name, tdbName, posTile, wallCreator, roofCreator;
                    var altitude, height, roofHeight, roofAngle, wallTex, color, shape;
                    var roofMainDir, roofUVortho, roofOrigin;
                    if (geom.geometryList.length < 1) {
                        console.warn('Empty polygon geometryList')
                        return;
                    }
                    var featureExtRingVertices = geom.geometryList[0].getVertices();

                    // Define tile position offset
                    if (session.posTile === undefined) {
                        session.posTile = new THREE.Vector2(Math.round(featureExtRingVertices[0].x), Math.round(featureExtRingVertices[0].y));
                        if (proj4Projection === "EPSG:3857" || proj4Projection === "EPSG:900913") {
                            session.scale = Geocoder.computeMercatorScaleFactor(session.posTile.x, session.posTile.y /*, this.proj*/);
                        } else {
                            session.scale = 1.0;
                        }
                    }

                    posTile = session.posTile;

                    var actualheight = currentPrimRendering.extrusionHeight;
                    height = 1.0;
                    roofHeight = Number(feature.getAttribute(roofAttribute));
                    roofAngle = Number(feature.getAttribute(roofAngleAttribute));

                    wallTex = Math.max(2.0, Number(feature.getAttribute(walltexAttribute)) + 1.0);
                    altitude = computeAltitudeToApply(currentPrimRendering, featureExtRingVertices);

                    /*if(!Utils.is(wallTex)){
                        wallTex = 1.0;
                    }*/

                    if (!Utils.is(roofAngle)) {
                        roofAngle = 0.0;
                    }
                    if (!Utils.is(roofHeight)) {
                        roofHeight = 0.0;
                    }
                    if (!Utils.is(altitude)) {
                        altitude = 0.0;
                    }

                    color = feature.getAttribute("color");
                    if (color && !(color instanceof THREE.Color)) {
                        color = new THREE.Color(color);
                    }
                    var opacity = feature.getAttribute("opacity");

                    if (Utils.is(currentPrimRendering)) {
                        if (Utils.is(currentPrimRendering.color)) {
                            color = currentPrimRendering.color.computeColor();
                        }
                        if (Utils.is(currentPrimRendering.opacity)) {
                            opacity = currentPrimRendering.opacity;
                        }
                    }
                    height = actualheight;
                    if (opacity < 1) {
                        //transparent = true;
                    } else {
                        opacity = 1;
                    }

                    var flag = rendering.getFlagForPrimitive(strid, feature.attributes);

                    // Create shape
                    shape = initShape(featureExtRingVertices, posTile, info, altitude, height, roofHeight);

                    var holes = initHoles(geom, posTile);

                    // Get TDB
                    tdbName = feature.getAttribute(tdbAttribute);

                    if (tdbName === undefined && !isNaN(wallTex) && wallTex !== 2) {

                        // L4L - Should use that function...  But way to compute is slightly different :-(
                        //var col = TextureTools.int2color(wallTex - 1.0);
                        // *************************************************************
                        var count = 4,
                            col = [];
                        v = Math.floor(wallTex - 1.0);
                        col[0] = v % 256.0;
                        col[1] = ((v - col[0]) / 256.0) % 256.0;
                        col[2] = ((v - col[0] - col[1] * 256.0) / 65536.0) % 256.0;
                        col[3] = ((v - col[0] - col[1] * 256.0 - col[2] * 65536.0) / 16777216.0) % 256.0;
                        while (count--) {
                            col[count] /= 255.0;
                        }
                        // *************************************************************


                        if (color && (color instanceof THREE.Color)) {
                            color.setRGB(col[0], col[1], col[2]);
                        } else {
                            color = new THREE.Color();
                            color.setRGB(col[0], col[1], col[2]);
                        }
                    }


                    // Get Roof main direction (1st segment)
                    roofMainDir = new THREE.Vector2().subVectors(featureExtRingVertices[1], featureExtRingVertices[0]);
                    v = roofMainDir.clone().normalize();
                    v.set(v.y, -v.x);
                    roofUVortho = new THREE.Vector2(
                        v.x * 2.5 + roofMainDir.x * 0.5 + featureExtRingVertices[0].x - posTile.x,
                        v.y * 2.5 + roofMainDir.y * 0.5 + featureExtRingVertices[0].y - posTile.y
                    );
                    roofMainDir = roofMainDir.normalize();
                    roofOrigin = new THREE.Vector3(
                        featureExtRingVertices[0].x - posTile.x,
                        featureExtRingVertices[0].y - posTile.y,
                        featureExtRingVertices[0].z
                    );
                    // Create Walls primitive creator
                    name = tdbName || "default";
                    if (!(name in session.ltileGeoms)) {
                        session.ltileGeoms[name] = createElements(name, info.tile, nbInfoPixelsPolygon, session.scale);
                        creators = session.ltileGeoms[name];
                    }

                    strid = feature.getAttribute(factoryStridAttribute);

                    var gm = currentPrimRendering.geometricMode;

                    if (!Utils.is(gm) || (gm !== "line")) {

                        if (gm === "filled") {
                            height = 0.0;
                        }
                        else {
                            // Build buildings
                            wallCreator = session.ltileGeoms[name].walls;
                        }
                        roofCreator = session.ltileGeoms[name].roofs;

                        //if (session.ltileGeoms[name].roofs.nbPrimitives > 500) console.log(roofCreator);

                        Building.build({
                            "wallCreator": wallCreator,
                            "roofCreator": roofCreator,
                            "shape": shape,
                            "holes": holes,
                            "altitude": altitude,
                            "height": height,
                            "roofHeight": roofHeight,
                            "roofAngle": (roofAngle * Math.PI / 180),
                            "infoInd": session.ltileGeoms[name].textureInfo.ySize,
                            "pIdentifer": strid,
                            "roofObjects": createRoofObjects
                        });

                        session.ltileGeoms[name].textureInfo.opacity = opacity;
                        wallTex = getTextureIndex(wallTex);
                        // Update information texture
                        updatesInfoTextures(session.ltileGeoms[name].textureInfo, strid, color, wallTex, altitude, actualheight, roofHeight, roofUVortho, roofMainDir, roofOrigin, flag);
                    }

                    addOneStroke(session, info, geom, feature);
                }

                function buildOne(feature, session, info) {
                    feature.attributes.test = rand;
                    var strid = feature.getAttribute(factoryStridAttribute);
                    var altern = Number(alternAttribute);
                    currentPrimRendering = rendering.getCompleteMaterialInfo(strid, feature.attributes);
                    if (!Utils.is(altern)) {
                        altern = -1;
                    }

                    if (strid === 0) {
                        console.warn("STRID = 0...");
                    }

                    if (session) {
                        if (session.nbFeature) {
                            session.nbFeature++;
                        }
                        else {
                            session.nbFeature = 1;
                        }
                    }
                    var geom = feature.getGeometry();

                    if (geom.type === Vector.Type.POLYGON) {
                        addOneBuilding(session, geom, feature, strid, info);
                    } else if (geom.type === Vector.Type.MULTIPOLYGON) {
                        var len = geom.geometryList.length;
                        for (var i = 0; i < len; i++) {
                            var g = geom.geometryList[i];
                            // we should not add one line of texture info per polygon in the texture image, but only one line per primitive
                            // this needs to be enforced manually for multipolygon so that they dont create as many lines as there are primitives
                            addOneBuilding(session, g, feature, strid, info);
                        }
                    } else {
                        return;
                    }
                }

                /**
                 * Creates a geometric node to be added to the scene graph.
                 *
                 * @method createMeshNode
                 *
                 * @param {THREEDS.Mesh.PrimitiveGroup} iPrimGroup  A multi-indexed mesh structure, as defined in Mesh.js.
                 * @param {THREEDS.Core.Material} [iMaterial]  the material to apply to the mesh. If not defined, the material is retrieved from iPrimGroup.
                 * @param {Number} [iID=0]  identifier.
                 * @param {String} indexation  "multi" (default value) if the mesh is multi-indexed, "mono" if it's mono-indexed (and no demulti-indexation is needed)
                 *
                 * @return {Node3D} a mesh node.
                 */
                function createMeshNode(iPrimGroup, iMaterial, iID, indexation, _noZPriority) {

                    var fill_color, line_color, point_color,
                        cgmID = (iID !== undefined) ? iID : 0,
                        material = (iMaterial !== undefined) ? iMaterial : iPrimGroup.material,
                        sgRoot, sgRep, mesh;

                    if (THREE.disableJHGDev) {
                        if ((material === undefined) || (material === null)) {

                            // Prepare a material with default color

                            fill_color = new THREE.Color();
                            line_color = new THREE.Color(0x666666);
                            point_color = new THREE.Color();

                            material = THREE.MaterialUtils.createShinyFaceMaterial({
                                color: fill_color.getHex(),
                                opacity: 1.0
                            });

                            material.line = new THREE.LineBasicMaterial({
                                color: line_color.getHex(),
                                lineWidth: 1.0,
                                opacity: 1.0
                            });

                            material.point = new THREE.ParticleBasicMaterial({
                                color: point_color.getHex(),
                                size: 1.0,
                                opacity: 1.0
                            });

                            //material.force = true;
                        }
                    }

                    sgRoot = new Mesh.SGBag();
                    sgRep = new Mesh.SGRep({ cgmId: cgmID, parent: sgRoot });

                    Mesh.validatePrimitiveGroup(iPrimGroup); // resolve incomplete informations

                    var isOptimizable = Mesh.checkMeshOptimizable(iPrimGroup);

                    var toEdit = isOptimizable && iPrimGroup.editable;
                    var toOptimize = isOptimizable && (iPrimGroup.editable || iPrimGroup.optimized);
                    var toShare = !toEdit && iPrimGroup.sharing;

                    if (toOptimize) {
                        console.warn("Polygon worker is not expecting editable or optimized primitive group.");
                    } else {

                        if (iPrimGroup.editable) {
                            console.warn("Could not make the mesh editable since it does not satisfy the editability rules : no strips and fans, no multi-indexation, 1 buffer per vertex component, 1 index buffer.");

                        } else if (iPrimGroup.optimized) {
                            console.warn("Could not optimize the mesh build since it does not satisfy the editability rules : no strips and fans, no multi-indexation, 1 buffer per vertex component, 1 index buffer.");
                        }

                        // check the format of the color buffer values
                        for (var i = 0; i < iPrimGroup.buffers.length; i++) {
                            var buffer = iPrimGroup.buffers[i];
                            if (buffer && buffer.component === Mesh.VertexComponentEnum.DIFFUSE_COLOR) {
                                if (buffer.dimension === 3) {

                                    buffer.dimension = 4;
                                    buffer.size *= 4 / 3;

                                    var data = buffer.data;
                                    var nbValues = data.length / 3;
                                    var newData = new Float32Array(4 * nbValues);

                                    var k = 0;

                                    for (var j = 0; j < nbValues; j++) {

                                        newData[k] = data[3 * j];
                                        newData[k + 1] = data[3 * j + 1];
                                        newData[k + 2] = data[3 * j + 2];
                                        newData[k + 3] = 1;
                                        k += 4;
                                    }

                                    buffer.data = newData;

                                } else if (buffer.dimension !== 4) {
                                    console.error("ERROR : Your Color Buffer should have 4 values per vertex (RGBA)");
                                }
                                break;
                            }
                        }

                        // convert the primitiveGroup to Mesh.Mesh
                        mesh = Mesh.convertToGeometry3js(iPrimGroup, undefined, undefined, undefined, indexation, false, _noZPriority);
                        mesh.rep = sgRep;

                        var meshBundle = {
                            mesh: mesh,
                            params: {
                                toShare: toShare,
                                toEdit: toEdit,
                                iPrimGroupNoz: iPrimGroup.noz,
                                iPrimGroupPatternOffsets: iPrimGroup.patternOffsets
                            }
                        };
                        return meshBundle;
                    }
                }

                function get3DMesh(creator, idName/*, posTile, textureInfo*/) {
                    var tileMesh3D, pGroup;
                    pGroup = creator.compilePrimitive(idName);

                    tileMesh3D = createMeshNode(pGroup);
                    //return tileMesh3D;
                    tileMesh3D.name = idName;
                    /*tileMesh3D.mesh3js.name = idName;

                    tileMesh3D.textureInfo = {
                        "texture": textureInfo.texture,
                        "idMap": textureInfo.idMap
                    };

                    tileMesh3D.setMatrix(new THREE.Matrix4().identity().setPosition(new THREE.Vector3(posTile.x, posTile.y, 0)));

                    if (isPickable) {
                        tileMesh3D.setPickable(Mesh.PICKABLE);
                    } else {
                        tileMesh3D.setPickable(Mesh.NOPICKABLE);
                    }*/

                    return tileMesh3D;
                }

                function compilMesh(session, textureInfo, mesh, nameMesh) {
                    var tileMesh3D = get3DMesh(mesh, nameMesh, session.posTile, textureInfo);
                    /*rendering.initMesh(tileMesh3D);
                    if (transparent) {
                        tileMesh3D.mesh3js.material.transparent = true;
                        tileMesh3D.textureInfo.texture.needsUpdate = true;
                    }*/
                    return tileMesh3D;
                }

                function getData(session) {

                // TODO: fix
                var resultObject3D = new Node3D();

                var name, idName, nodeBuild;

                // Compute wall tile's geometry bounding sphere, set material and tile's position
                var keys = Object.keys(session.ltileGeoms),
                    len = keys.length,
                    i, mesh;
                    mesh = {};
                    for (i = 0; i < len; i++) {
                        name = keys[i];
                        idName = session.tile.LOD + "_" + session.tile.I + "_" + session.tile.J;
                        nodeBuild = session.ltileGeoms[name];

                        if (nodeBuild.node !== undefined) {
                            resultObject3D.add(nodeBuild.node);
                        } else {

                            nodeBuild.textureInfo.texture = TextureTools.createTexture(nodeBuild.textureInfo);


                            if (nodeBuild.walls.nbPrimitives > 0) {
                                mesh.walls = compilMesh(session, nodeBuild.textureInfo, nodeBuild.walls, idName + "_" + name);
                                /*return mesh; 
                                resultObject3D.add(mesh);
                                if (Utils.is(mesh._otherMesh)) {
                                    if (!Utils.is(mesh._otherMesh.parents[0])) {
                                        mesh.parents[0].addChild(mesh._otherMesh);
                                    }
                                }*/
                            }

                            if (nodeBuild.roofs.nbPrimitives > 0) {
                                mesh.roofs = compilMesh(session, nodeBuild.textureInfo, nodeBuild.roofs, idName + "_roof_" + name);
                                /*return mesh; 
                                resultObject3D.add(mesh);
                                if (Utils.is(mesh._otherMesh)) {
                                    if (!Utils.is(mesh._otherMesh.parents[0])) {
                                        mesh.parents[0].addChild(mesh._otherMesh);
                                    }
                                }*/
                            }

                            /*if (session.builder) {
                                addStrokes(session, resultObject3D);
                            }*/
                        }
                    }
                    session.ltileGeoms = undefined;
                    //this.addLabelsToNode(session, resultObject3D); TODO
                    //return resultObject3D;
                    return mesh;
                }

                function getNode3D(session) {
                    var meshBundle = getData(session);
                    return meshBundle;
                }

                // ground mode elevation can't be computed in workers (no access to urban's scene renderer):
                // in that case z value has been pushed to the datasource coordinates
                // and we just ahve to retrieve it
                function _appendPreComputedZValues(k, geom, dataSource) {
                  if (geom.type === Vector.Type.MULTIPOLYGON) {

                    if(dataSource.list[k].geometry.coordinates[0][0][0].length > 2) {
                      dataSource.list[k].geometry.coordinates.forEach((innerGeometry, i) => {
                        innerGeometry.forEach((points, j) => {
                          points.forEach((item, jj) => {
                            // datasource vertex list closes the shape with same first and last points
                            // and so has 1 more point than the geometry: index check necessary
                            if( j < geom.geometryList[i].geometryList.length &&
                                jj<geom.geometryList[i].geometryList[j].vertexList.length) {
                              geom.geometryList[i].geometryList[j].vertexList[jj].z = item[2];
                            }
                          });
                        });
                      });
                    }
                  } else if (geom.type === Vector.Type.POLYGON) {
                    if(dataSource.list[k].geometry.coordinates[0][0].length > 2) {
                      dataSource.list[k].geometry.coordinates.forEach((points, i) => {
                        points.forEach((item, j) => {
                          // datasource vertex list closes the shape with same first and last points
                          // and so has 1 more point than the geometry: index check necessary
                          if(j<geom.geometryList[i].vertexList.length) {
                            geom.geometryList[i].vertexList[j].z = item[2];
                          }
                        });
                      });
                    }
                  }
                }

                function createPolygon(buildingInfos) {

                    var isSessionEmpty = true;
                    var features = buildingInfos.features;
                    indexSession = buildingInfos.indexSession;
                    var inputCRS = buildingInfos.inputCRS;
                    var loader = new VectorLoaderJSON();
                    // In case the data is already an JS object, we directly query the type field
                    var dataSource = loader.loadDataSourceFromObject(typeof geojson === "string" ? JSON.parse(features) : features);

                    var nbFeatures = dataSource.count;
                    var feature = new Vector.Feature();

                    var session = {
                        'tile': {
                            'LOD': 0,
                            'I': 0,
                            'J': 0
                        },
                        'infos': {},
                        'ltileGeoms': {}
                    };

                    var records = [];

                    var isLooping = false;

                    var startIndex = 0;

                    if(nbFeatures===0) {
                        prepareAndSendSession(indexSession, null, null, true);
                    }

                    var buildFeature = function () {

                        var nbBuilt = 0;

                        for (var k = startIndex; k < nbFeatures; ++k) {

                            dataSource.getNextFeature(feature);

                            if (nbBuilt === featureBatchSize) {
                                startIndex = k;
                                setTimeout(buildFeature, 0); // let the worker the possibility to handle incoming messages
                                break;
                            }

                            var geom = feature.getGeometry();

                            _appendPreComputedZValues(k, geom, dataSource);

                            var isOutside = true;

                            if (geom && geom.type === Vector.Type.MULTIPOLYGON) {

                                var geomList = geom.geometryList;
                                for (let kk = 0; kk < geomList.length && (isOutside || inputCRS !== urbanBaseProjection); ++kk) {
                                    let geomList2 = geomList[kk].geometryList;
                                    for (let kkk = 0; kkk < geomList2.length && (isOutside || inputCRS !== urbanBaseProjection); ++kkk) {
                                        let coord = geomList2[kkk].vertexList;
                                        for (var j = 0; j < coord.length; ++j) {
                                            let coordSingle = coord[j];

                                            if(inputCRS !== urbanBaseProjection) {
                                                let projectedCoord = Geocoder.projForWebWorker(coordSingle, inputCRS, preloadedInputCRS, urbanBaseProjection, preloadedUrbanProj);
                                                coordSingle.x = projectedCoord.x;
                                                coordSingle.y = projectedCoord.y;
                                            }

                                            // test bbox until one vertex is inside the referential
                                            if (isOutside && coordSingle.x > refBbox.xmin && coordSingle.x < refBbox.xmax && coordSingle.y > refBbox.ymin && coordSingle.y < refBbox.ymax) {
                                                isOutside = false;
                                                nbMultiPolygonSession++;
                                            }

                                        }
                                    }
                                }
                            
                            }
                            else if (geom && geom.type === Vector.Type.POLYGON) {
                                
                                let geomList = geom.geometryList;
                                for (let kk = 0; kk < geomList.length && (isOutside || inputCRS !== urbanBaseProjection); ++kk) {
                                    let coord = geomList[kk].vertexList;
                                    for (let j = 0; j < coord.length; ++j) {
                                        let coordSingle = coord[j];

                                        if(inputCRS !== urbanBaseProjection) {
                                            let projectedCoord = Geocoder.projForWebWorker(coordSingle, inputCRS, preloadedInputCRS, urbanBaseProjection, preloadedUrbanProj);
                                            coordSingle.x = projectedCoord.x;
                                            coordSingle.y = projectedCoord.y;
                                        }

                                        // test bbox until one vertex is inside the referential
                                        if (isOutside && coordSingle.x > refBbox.xmin && coordSingle.x < refBbox.xmax && coordSingle.y > refBbox.ymin && coordSingle.y < refBbox.ymax) {
                                            isOutside = false;
                                            nbPolygonSession++;
                                        }

                                    }
                                }
                            
                            }
                            else {
                                // make sure to not skip the send operation in case we are at the last iteration
                                if (k === (nbFeatures - 1)) {
                                    prepareAndSendSession(indexSession, creators, session, isSessionEmpty);
                                }
                                continue;
                            }

                            if(isOutside) {
                                // make sure to not skip the send operation in case we are at the last iteration
                                if (k === (nbFeatures - 1)) {
                                    prepareAndSendSession(indexSession, creators, session, isSessionEmpty);
                                }
                                continue;
                            }

                            var info = {
                                'strid': feature.getAttribute(factoryStridAttribute),
                                'tile': {
                                    'LOD': 0,
                                    'I': 0,
                                    'J': 0
                                },
                                'posSize': {
                                    'center': new THREE.Vector3(),
                                    'altitude': 0.0,
                                    'height': 0.0,
                                    'width': 0.0,
                                    'length': 0.0
                                },
                                'userData': {}
                            };

                            if (info.strid === undefined || info.strid === null) {
                              // when using web workers, they each handle a session and have no knowledge of the other sessions
                              // therefore they cannot use a shared polygon counter
                              // a solution is to make a counter per session -> no risk of duplicates and thread safe
                              // limitation: primitive rendering based on id will be broken when number feature > session size
                                if (fromGeometrySet) {
                                  info.strid = infoStrid + '_' + (nbMultiPolygonSession + nbPolygonSession) + '_' + indexSession;
                                }
                                else {
                                  info.strid = infoStrid + '_polygon_' + (nbMultiPolygonSession + nbPolygonSession) + '_' + indexSession;
                                }
                                feature.attributes[factoryStridAttribute] = info.strid;
                            }

                            if (geom) {

                                var list, count;
                                list = feature.getAttributeKeys();
                                count = list.length;
                                while (count--) {
                                    info.userData[list[count]] = feature.getAttribute(list[count]);
                                }
                                records.push(info);

                                session.infos[info.strid] = info;
                                buildOne(feature, session, info);
                                isSessionEmpty = false;

                            }

                            if (k === (nbFeatures - 1)) {
                                prepareAndSendSession(indexSession, creators, session, isSessionEmpty);
                            }

                            nbBuilt++;
                        }

                    }

                    if (!isLooping) {
                        buildFeature();
                        isLooping = true;
                    }

                }

                function prepareAndSendSession(indexSession, creators, session, isSessionEmpty) {

                    var indexNodeReady = indexSession;

                    if (isSessionEmpty) {
                        // just send an empty message to signal we are done and this worker can be used again
                        var empty = true;
                        workerContext.postMessage({ indexNodeReady, empty });
                        resetVar(session);
                    } else {
                        var meshBundle = getNode3D(session);
                        var roofCreator = creators.roofs;
                        var wallCreator = creators.walls;
                        var textureInfoCreator = creators.textureInfo;
                        convertArraysToArrayBuffers(roofCreator, wallCreator, textureInfoCreator);
                        var mainThreadData = { indexNodeReady, roofCreator, wallCreator, textureInfoCreator, meshBundle }
                        postSession(mainThreadData);
                        resetVar(session);
                    }
                }

                function convertArraysToArrayBuffers(roofCreator, wallCreator, textureInfoCreator) {
                    roofCreator.position.buffer.data = new Float32Array(roofCreator.position.buffer.data).buffer;
                    roofCreator.faceBindingArray.buffer.data = new Uint32Array(roofCreator.faceBindingArray.buffer.data).buffer;
                    roofCreator.normal.buffer.data = new Float32Array(roofCreator.normal.buffer.data).buffer;
                    roofCreator.vertexBindingArray.buffer.data = new Uint32Array(roofCreator.vertexBindingArray.buffer.data).buffer;
                    // we know the length of texcoord array (2) thanks to the nbTexCoord variable set when creating the PrimitiveGeometryCreator
                    // see PatchVectorFactoryBuilding
                    roofCreator.texcoord[0].buffer.data = new Float32Array(roofCreator.texcoord[0].buffer.data).buffer;
                    roofCreator.texcoord[1].buffer.data = new Float32Array(roofCreator.texcoord[1].buffer.data).buffer;
                    // for some reason using JSON.stringify() and then JSON.parse() performs better than letting the data as is
                    // see https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/
                    roofCreator.primitiveList = JSON.stringify(roofCreator.primitiveList);

                    wallCreator.position.buffer.data = new Float32Array(wallCreator.position.buffer.data).buffer;
                    wallCreator.faceBindingArray.buffer.data = new Uint32Array(wallCreator.faceBindingArray.buffer.data).buffer;
                    wallCreator.normal.buffer.data = new Float32Array(wallCreator.normal.buffer.data).buffer;
                    wallCreator.vertexBindingArray.buffer.data = new Uint32Array(wallCreator.vertexBindingArray.buffer.data).buffer;
                    wallCreator.texcoord[0].buffer.data = new Float32Array(wallCreator.texcoord[0].buffer.data).buffer;
                    wallCreator.primitiveList = JSON.stringify(wallCreator.primitiveList);

                    textureInfoCreator.data = new Float32Array(textureInfoCreator.data).buffer;
                }

                function postSession(mainThreadData) {
                    delete mainThreadData.textureInfoCreator.texture; // not needed and can't be transferred

                    if(mainThreadData.meshBundle.walls) {
                        workerContext.postMessage(mainThreadData, [
                            mainThreadData.roofCreator.position.buffer.data,
                            mainThreadData.roofCreator.faceBindingArray.buffer.data,
                            mainThreadData.roofCreator.normal.buffer.data,
                            mainThreadData.roofCreator.vertexBindingArray.buffer.data,
                            mainThreadData.roofCreator.texcoord[0].buffer.data,
                            mainThreadData.roofCreator.texcoord[1].buffer.data,

                            mainThreadData.wallCreator.position.buffer.data,
                            mainThreadData.wallCreator.faceBindingArray.buffer.data,
                            mainThreadData.wallCreator.normal.buffer.data,
                            mainThreadData.wallCreator.vertexBindingArray.buffer.data,
                            mainThreadData.wallCreator.texcoord[0].buffer.data,

                            mainThreadData.textureInfoCreator.data,

                            mainThreadData.meshBundle.roofs.mesh.vertexColorArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexIndexArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexNormalArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexPositionArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexUv2Array.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexUvArray.buffer,

                            mainThreadData.meshBundle.walls.mesh.vertexColorArray.buffer,
                            mainThreadData.meshBundle.walls.mesh.vertexIndexArray.buffer,
                            mainThreadData.meshBundle.walls.mesh.vertexNormalArray.buffer,
                            mainThreadData.meshBundle.walls.mesh.vertexPositionArray.buffer,
                            mainThreadData.meshBundle.walls.mesh.vertexUvArray.buffer
                        ]);
                    } else {
                        workerContext.postMessage(mainThreadData, [
                            mainThreadData.roofCreator.position.buffer.data,
                            mainThreadData.roofCreator.faceBindingArray.buffer.data,
                            mainThreadData.roofCreator.normal.buffer.data,
                            mainThreadData.roofCreator.vertexBindingArray.buffer.data,
                            mainThreadData.roofCreator.texcoord[0].buffer.data,
                            mainThreadData.roofCreator.texcoord[1].buffer.data,
                            mainThreadData.textureInfoCreator.data,
                            mainThreadData.meshBundle.roofs.mesh.vertexColorArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexIndexArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexNormalArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexPositionArray.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexUv2Array.buffer,
                            mainThreadData.meshBundle.roofs.mesh.vertexUvArray.buffer
                        ]);
                    }


                }

                if(e.data !== "just_load_dependencies") {
                  // set init info that were emitted from the main thread
                  init(e.data);
                  // we will build each session we are responsible for as quickly as possible and send it back to the main thread
                  createPolygon(e.data);
                } else {
                    // ready
                }

            }); // require

    }; // onMessage

})(this);
