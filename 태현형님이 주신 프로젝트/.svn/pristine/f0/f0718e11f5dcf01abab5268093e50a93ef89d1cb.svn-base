/**
  * @author LBR1
  * 19/03/2021
  * Fusion of PatchVectorFactoryLine and LineBuilder
  * The idea is to compute the line's materials and geometries then send it back to the main thread so it won't have to compute it
  */

 (function (workerContext) {

    "use strict";
    workerContext.importScripts('../AmdLoader/AmdLoader.js');
    workerContext.importScripts('FakeDomForWebWorker.js'); // add a dummy DOM to the worker context to be able to load sources referencing it

    require.config({
        baseUrl: ".."
    });

    // globals
    var nbLineSession;
    var nbMultiLineSession;
    var urbanBaseProjection;
    var factoryStridAttribute;
    var infoStrid;
    var nbLines;
    var nbInfoPix;
    var rendering;
    var nbFeatPerNode;
    var creators;
    var featureBatchSize;
    var featureBatchSize;
    var slabAltitude;
    var precomputedZValues;
    var precomputedZValuesIndex;
    var preloadedUrbanProj;
    var preloadedInputCRS;
    var primitiveRenderings;
    var datavizRenderings;
    var fromGeometrySet;
    var indexSession;
    var refBbox;

    workerContext.onmessage = function (e) {

      // override the Downloader source to not load useless dependencies for workers 
    	define("DS/XCityTools/Downloader",[],function(){return {}; });

        require([
            'DS/Visualization/ThreeJS_DS',
            'DS/XCityLayer/VectorLoaderJSON',
            'DS/XCityLayer/Vector',
            'DS/XCityTools/Geocoder',
            'DS/XCityTools/PrimitiveGeometryCreator',
            'DS/XCityGeometry/Line',
            'DS/XCityRendering/RenderingHandlerLine',
            'DS/xCityBasicUtils/Utils',
            'DS/XCityTools/Expression',
            'DS/XCityRendering/DatavizRendering',
            'VENProj4js-2.7.2/js/proj4',
            'DS/XCityRendering/PrimitiveRendering',
            'DS/XCityTools/RenderingTools',
          ],
            function (
                THREE,
                VectorLoaderJSON,
                Vector,
                Geocoder,
                PrimitiveGeometryCreator,
                Line,
                RenderingHandlerLine,
                Utils,
                Expression,
                DatavizRendering,
                Proj4,
                PrimitiveRendering,
                RenderingTools
              ) {

                // Receive and store useful information for the line construction from the main thread
                // which cant be obtained from within the worker (different context), such as urban properties.
                function init(initInfos) {
                    refBbox = initInfos.refBbox;
                    indexSession = initInfos.indexSession;
                    fromGeometrySet = initInfos.fromGeometrySet;
                    nbFeatPerNode = initInfos.nbFeatPerNode;
                    featureBatchSize = nbFeatPerNode;
                    datavizRenderings = initInfos.datavizRenderings;
                    primitiveRenderings = initInfos.primitiveRenderings;
                    nbLines = 0; // imitates the role of the nbLines variable of the LineBuilder class
                    nbLineSession = 0;
                    nbMultiLineSession = 0;
                    urbanBaseProjection = initInfos.urbanBaseProjection;
                    factoryStridAttribute = initInfos.factoryStridAttribute;
                    infoStrid = initInfos.infoStrid;
                    nbInfoPix = initInfos.nbInfoPix;
                    slabAltitude = initInfos.slabAltitude;
                    precomputedZValues = initInfos.precomputedZValues;
                    precomputedZValuesIndex = 0;
                    var factoryParam = {
                        stridAttribute: factoryStridAttribute,
                        elevationMode: initInfos.elevationMode,
                        elevation: initInfos.elevation,
                        elevationOffset: initInfos.elevationOffset
                    };
                    preloadedUrbanProj = new Proj4.Proj(initInfos.preloadedUrbanProj);
                    preloadedInputCRS = new Proj4.Proj(initInfos.preloadedInputCRS);
                    rendering = new RenderingHandlerLine(null, factoryParam);
                    if(initInfos.currentRenderingData) rendering.currentRendering.renderingData = initInfos.currentRenderingData;
                    if(initInfos.defaultRenderingData) rendering.defaultRendering.renderingData = initInfos.defaultRenderingData;
                    addRenderingFromMainThreadRendering();
                    creators = createElements();
                }

                function resetVar() {
                    nbLines = 0; // imitates the role of the nbLines variable of the LineBuilder class
                    nbLineSession = 0;
                    nbMultiLineSession = 0;
                    precomputedZValuesIndex = 0;
                }

                function createElements() {
                    var scale = 1,
                        data = [],
                        i;

                    //texture info init informations
                    data.push(nbInfoPix); //nb columns
                    data.push(0); //nb lines
                    data.push(scale); //scale mercator 900'913
                    data.push(0.0); // clock time for animated lines
                    for (i = 0; i < nbInfoPix - 4; i += 1) { //fill array with 0 to correspond to the number of element to modify
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
                            "xSize": nbInfoPix,
                            "ySize": 1.0, // nb lines + 1 for init information
                            "data": data
                        }
                    };
                }

                function updatesInfoTextures(strid, attr, line) {

                    var material = rendering.getRenderingValues(strid, attr);
                    var primitiverendering = rendering.getPrimitiveRenderingValues(strid, attr);
                    var textureInfo = creators.textureInfo,
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

                function applyAltitude(vertices, posTile, material) {
                    for (var i = 0; i < vertices.length; i++) {
                        vertices[i].z = computeAltitudeToApply(material, vertices[i]);
                        //altitude depends on original x and y
                        vertices[i].x = vertices[i].x - posTile.x;
                        vertices[i].y = vertices[i].y - posTile.y;
                    }
                }

                function computeAltitudeToApply(material, vertex) {

                    var altitude = 0;
                    if (vertex.z && material.elevationMode === 'geometry') {
                        altitude = vertex.z;
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
                    var textureInfo = creators.textureInfo;
                    if (Utils.is(textureInfo.idMap[strid])) {
                        numline = textureInfo.idMap[strid] - 1;
                    }


                    var line = new Line(null, {
                        'id': strid,
                        'numLine': numline,
                        'creators': creators,
                        'geom': geom,
                        'rendering': rendering,
                        'coordinates': coordinates, //maybe undefined here and defined in LineGeometry by 3d mesh center,
                        'attributes': attributes
                    });

                    nbLines += 1;

                    updatesInfoTextures(strid, attributes, line);

                    // flag used to detect web workers line during modification of a line's rendering on main thread
                    line.isWebWorkerLine = true;

                    return line;
                }

                function buildOne(feature, session, info) {

                    var geom = feature.getGeometry();
                    if (geom.type !== Vector.Type.LINESTRING && geom.type !== Vector.Type.MULTILINESTRING) {
                        return;
                    }

                    var featureExtRingVertices = geom.getVertices();
                    if (featureExtRingVertices === undefined) {
                        return;
                    }

                    var attr = feature.attributes;
                    var strid = feature.getAttribute(factoryStridAttribute);

                    var material = rendering.getCompleteMaterialInfo(strid, attr);


                    // Define tile position offset
                    if (session.posTile === undefined) {
                        if (geom.type === Vector.Type.MULTILINESTRING) {
                            session.posTile = new THREE.Vector2(Math.round(featureExtRingVertices[0][0].x), Math.round(featureExtRingVertices[0][0].y));
                        }
                        else {
                            session.posTile = new THREE.Vector2(Math.round(featureExtRingVertices[0].x), Math.round(featureExtRingVertices[0].y));
                        }
                    }

                    if (geom.type === Vector.Type.MULTILINESTRING) {
                        for (var i = 0; i < featureExtRingVertices.length; i++) {
                            var vertices = featureExtRingVertices[i];
                            applyAltitude(vertices, session.posTile, material);
                        }
                    } else {
                        applyAltitude(featureExtRingVertices, session.posTile, material);
                    }

                    var line = buildOneLine(info, geom, undefined, undefined, feature.attributes);

                    if (!Utils.is(session.lines)) {
                        session.lines = {};
                    }
                    if (!Utils.is(session.lines[info.strid])) {
                        session.lines[info.strid] = [];
                    }
                    session.lines[info.strid].push(line);

                    if (line.isTransparent) {
                        session.forceTransparent = true;
                    }

                }

                function addRenderingFromMainThreadRendering() {
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
                    for (let key in primitiveRenderings) {
                        if (key !== "length") {
                            counter++;
                            var temp = new PrimitiveRendering();
                            rendering.currentRendering.primitiveRenderings[key] = temp;
                            Object.assign(temp, primitiveRenderings[key]);
                            for(var property in temp.renderingData) {
                                var renderingObject = temp.renderingData[property];
                                // flag hack: we only exchanged data with main thread an lost objects prototypes (instanceof broken)
                                // but we will need to know if the object is an instance of ColorGradient for it to work
                                if(renderingObject.xCityid && renderingObject.xCityid.startsWith("xCityColorGradient")) {
                                    renderingObject.isColorGradientForWorkers = true;
                                }
                            }
                            rendering.currentRendering.primitiveRenderings["length"] = counter;
                        }
                    }
                }

                // ground mode elevation can't be computed in workers (no access to urban's scene renderer):
                // in that case z value has been pushed to the datasource coordinates
                // and we just ahve to retrieve it
                function _appendPreComputedZValues(k, geom, dataSource) {
                  if (geom.type === Vector.Type.MULTILINESTRING) {
                      if(dataSource.list[k].geometry.coordinates[0][0].length > 2) {
                        dataSource.list[k].geometry.coordinates.forEach((linestring, i) => {
                          linestring.forEach((item, j) => {
                            geom.geometryList[i].vertexList[j].z = item[2];
                          });
                        });
                      }
                  }
                  else if (geom.type === Vector.Type.LINESTRING) {
                      if(dataSource.list[k].geometry.coordinates[0].length > 2) {
                        dataSource.list[k].geometry.coordinates.forEach((item, i) => {
                          geom.vertexList[i].z = item[2];
                        });
                      }
                  }
                }

                function createLineSet(buildingInfos) {

                    var isSessionEmpty = true;
                    var features = buildingInfos.features;
                    var inputCRS = buildingInfos.inputCRS;
                    var indexNodeReady = indexSession;
                    var json;
                    var loader = new VectorLoaderJSON();
                    // In case the data is already an JS object, we directly query the type field
                    var dataSource = loader.loadDataSourceFromObject(typeof geojson === "string" ? JSON.parse(features) : features);
                    json = (typeof features === "string" ? JSON.parse(features) : features);

                    var nbFeatures = dataSource.count;
                    var feature = new Vector.Feature();

                    var session = {
                        'tile': {
                            'LOD': 0,
                            'I': 0,
                            'J': 0
                        },
                        'infos': {}
                    };

                    var records = [];

                    var isLooping = false;

                    var startIndex = 0;
                    var nbBuiltTotal = 0;

                    if(nbFeatures===0) {
                        prepareAndSendSession(null, null, indexNodeReady, true);
                    }

                    var buildFeature = function () {

                        var nbBuilt = 0;

                        for (var k = startIndex; k < nbFeatures; ++k) {

                            dataSource.getNextFeature(feature);

                            /*if (nbBuilt === featureBatchSize) {
                                startIndex = k;
                                setTimeout(buildFeature, 0); // let the worker the possibility to handle incoming messages
                                break;
                            }*/

                            var geom = feature.getGeometry();

                            _appendPreComputedZValues(k, geom, dataSource);

                            var isOutside = true;

                            if (geom && geom.type === Vector.Type.MULTILINESTRING) {
                                var geomList = geom.geometryList;
                                for (var kk = 0; kk < geomList.length && (isOutside || inputCRS !== urbanBaseProjection); ++kk) {
                                    let vertexList = geomList[kk].vertexList;
                                    for (var j = 0; j < vertexList.length && (isOutside || inputCRS !== urbanBaseProjection); ++j) {
    
                                        if(inputCRS !== urbanBaseProjection) {
                                            var projectedCoord = Geocoder.projForWebWorker(vertexList[j], inputCRS, preloadedInputCRS, urbanBaseProjection, preloadedUrbanProj);
                                            vertexList[j].x = projectedCoord.x;
                                            vertexList[j].y = projectedCoord.y;
                                        }
    
                                        // test bbox until one vertex is inside the referential
                                        if (isOutside && vertexList[j].x > refBbox.xmin && vertexList[j].x < refBbox.xmax && vertexList[j].y > refBbox.ymin && vertexList[j].y < refBbox.ymax) {
                                            isOutside = false;
                                            nbMultiLineSession++;
                                        }
                                    }
                                }
                            } else if (geom && geom.type === Vector.Type.LINESTRING) {
                                let vertexList = geom.vertexList;
                                for (var i = 0; i < vertexList.length && (isOutside || inputCRS !== urbanBaseProjection); ++i) {
                                    // input data already in current base projection, do not reproject
                                    if(inputCRS !== urbanBaseProjection) {
                                        var projectedCoord = Geocoder.projForWebWorker(vertexList[i], inputCRS, preloadedInputCRS, urbanBaseProjection, preloadedUrbanProj);
                                        vertexList[i].x = projectedCoord.x;
                                        vertexList[i].y = projectedCoord.y;
                                    }
    
                                    // test bbox until one vertex is inside the referential
                                    if (isOutside && vertexList[i].x > refBbox.xmin && vertexList[i].x < refBbox.xmax && vertexList[i].y > refBbox.ymin && vertexList[i].y < refBbox.ymax) {
                                        isOutside = false;
                                        nbLineSession++;
                                    }
                                }
                            } else {
                                // make sure to not skip the send operation in case we are at the last iteration
                                if (k === (nbFeatures - 1)) {
                                    prepareAndSendSession(session, creators, indexNodeReady, isSessionEmpty);
                                }
                                continue;
                            }

                            if(isOutside) {
                                // make sure to not skip the send operation in case we are at the last iteration
                                if (k === (nbFeatures - 1)) {
                                    prepareAndSendSession(session, creators, indexNodeReady, isSessionEmpty);
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
                              // therefore they cannot use a shared line counter
                              // a solution is to make a counter per session -> no risk of duplicates and thread safe
                              // limitation: primitive rendering based on id will be broken when number feature > session size
                                if (fromGeometrySet) {
                                  info.strid = infoStrid + '_' + (nbMultiLineSession + nbLineSession) + '_' + indexSession;
                                }
                                else {
                                  info.strid = infoStrid + '_line_' + (nbMultiLineSession + nbLineSession) + '_' + indexSession;
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


                                prepareAndSendSession(session, creators, indexNodeReady, isSessionEmpty);
                            }

                            nbBuilt++;
                            nbBuiltTotal++;

                        }

                    }

                    if (!isLooping) {
                        buildFeature();
                        isLooping = true;
                    }


                }

                function prepareAndSendSession(session, creators, indexNodeReady, isSessionEmpty) {

                    if (isSessionEmpty) {
                        // just send an empty message to signal we are done and this worker can be used again
                        var empty = true;
                        workerContext.postMessage({ indexNodeReady, empty });
                        resetVar();
                    } else {
                        var lineCreator = creators.lineMesh;
                        var textureInfoCreator = creators.textureInfo;
                        var lines = session.lines;
                        convertArraysToArrayBuffers(lineCreator, textureInfoCreator);
                        var mainThreadData = { lines, indexNodeReady, lineCreator, textureInfoCreator };
                        postSession(mainThreadData);
                        resetVar();
                    }

                }

                function convertArraysToArrayBuffers(lineCreator, textureInfoCreator) {
                    lineCreator.color.buffer.data = new Float32Array(lineCreator.color.buffer.data).buffer;
                    lineCreator.position.buffer.data = new Float32Array(lineCreator.position.buffer.data).buffer;
                    lineCreator.vertexBindingArray.buffer.data = new Uint32Array(lineCreator.vertexBindingArray.buffer.data).buffer;
                    // for some reason using JSON.stringify() and then JSON.parse() performs better than letting the data as is
                    // see https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/
                    lineCreator.primitiveList = JSON.stringify(lineCreator.primitiveList);
                    textureInfoCreator.data = new Float32Array(textureInfoCreator.data).buffer;
                }

                function postSession(mainThreadData) {
                    workerContext.postMessage(mainThreadData, [
                        mainThreadData.lineCreator.color.buffer.data,
                        mainThreadData.lineCreator.position.buffer.data,
                        mainThreadData.lineCreator.vertexBindingArray.buffer.data,
                        mainThreadData.textureInfoCreator.data
                    ]);
                }

                if(e.data !== "just_load_dependencies") {
                  // set init info that were emitted from the main thread
                  init(e.data);
                  // we will build each session we are responsible for as quickly as possible and send it back to the main thread
                  createLineSet(e.data);
                } else {
                  // ready
                }

            }); // require

    }; // onMessage

})(this);
