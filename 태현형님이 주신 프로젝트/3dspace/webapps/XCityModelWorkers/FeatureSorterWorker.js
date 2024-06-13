/**
  * @author LBR1
  * 21/04/2021
  */

// TODO: skip features out of bbox as is done for LineSet and PolygonSet
// TODO: assess if using ref bbox is better than computing layer bbox (would mean less precision)

(function (workerContext) {

    "use strict";
    workerContext.importScripts('../AmdLoader/AmdLoader.js');
    workerContext.importScripts('FakeDomForWebWorker.js'); // Add a dummy DOM to the worker context to be able to load sources referencing it

    require.config({
        baseUrl: ".."
    });

    workerContext.onmessage = function (e) {

        require([
            'DS/XCityLayer/VectorLoaderJSON',
            'DS/XCityLayer/Vector',
            'DS/XCityTools/shapefile'],
            function (
                VectorLoaderJSON,
                Vector,
                shapefile) {

                function sort(data) {

                    var geometriesCount = {
                        linestring: 0,
                        multilinestring: 0,
                        polygon: 0,
                        multipolygon: 0,
                        point: 0,
                        multipoint: 0
                    };

                    var computeBoundingBox = function(geojson, concernedGeometries) {

                        var loader = new VectorLoaderJSON();
                        var dataSource = loader.loadDataSourceFromObject(typeof geojson === "string" ? JSON.parse(geojson) : geojson);
                        var nbFeatures = dataSource.count;
                        var feature = new Vector.Feature();

                        var maxX = -Infinity;
                        var maxY = -Infinity;
                        var minX = Infinity;
                        var minY = Infinity;

                        // find min and max values for x and y features coordinates
                        // TODO: have min max seperate for each three kinds of geom
                        for (var k = 0; k < nbFeatures; ++k) {

                            dataSource.getNextFeature(feature);

                            var geom = feature.getGeometry();

                            if( (geom && geom.type === Vector.Type.MULTIPOLYGON && concernedGeometries.includes(geom.type)) ||
                                (geom && geom.type === Vector.Type.POLYGON && concernedGeometries.includes(geom.type)) ||
                                (geom && geom.type === Vector.Type.MULTILINESTRING && concernedGeometries.includes(geom.type)) ||
                                (geom && geom.type === Vector.Type.LINESTRING && concernedGeometries.includes(geom.type)) ||
                                (geom && geom.type === Vector.Type.MULTIPOINT && concernedGeometries.includes(geom.type)) ||
                                (geom && geom.type === Vector.Type.POINT && concernedGeometries.includes(geom.type))
                            ) {
                                maxX = Math.max(geom.aabbox.center.x + geom.aabbox.size.x, maxX);
                                maxY = Math.max(geom.aabbox.center.y + geom.aabbox.size.y, maxY);
                                minX = Math.min(geom.aabbox.center.x - geom.aabbox.size.x, minX);
                                minY = Math.min(geom.aabbox.center.y - geom.aabbox.size.y, minY);
                            }
                        }

                        return {maxX, maxY, minX, minY};
                    }

                    var fillQuadTree = function(geojson, qt, boundingBox, concernedGeometries) {

                        var loader = new VectorLoaderJSON();
                        var dataSource = loader.loadDataSourceFromObject(typeof geojson === "string" ? JSON.parse(geojson) : geojson);
                        var nbFeatures = dataSource.count;
                        var feature = new Vector.Feature();

                        
                        var maxX = boundingBox.maxX;
                        var maxY = boundingBox.maxY;
                        var minX = boundingBox.minX;
                        var minY = boundingBox.minY;

                        // quadtree creation
                        for (let k = 0; k < nbFeatures; ++k) {

                            dataSource.getNextFeature(feature);

                            var geom = feature.getGeometry();

                            if (geom && geom.type === Vector.Type.MULTIPOLYGON && concernedGeometries.includes(geom.type)) {
                                geometriesCount.multipolygon++;
                                let geomList = geom.geometryList;
                                for (let kk = 0; kk < geomList.length; ++kk) {

                                    let geomList2 = geomList[kk].geometryList;
                                    let coord;
                                    for (let kkk = 0; kkk < geomList2.length; ++kkk) {
                                        coord = geomList2[kkk].vertexList;
                                        for (let j = 0; j < coord.length; ++j) {
                                            let coordSingle = coord[j];
                                            let xNormalized = (coordSingle.x - minX) / (maxX - minX);
                                            let yNormalized = (coordSingle.y - minY) / (maxY - minY);
                                            coordSingle.x = xNormalized;
                                            coordSingle.y = yNormalized;
                                        }
                                        continue; // TODO: take into account all polygons and not just first one?
                                    }

                                    // this quadtree implementation handles points only so we use the centroid of the polygons as a point
                                    let centroid = compute2DPolygonCentroid(coord);
                                    let pointObject = {};

                                    pointObject.pointInterfaceGetX = function () {
                                        return centroid.x;
                                    };
                                    pointObject.pointInterfaceGetY = function () {
                                        return centroid.y;
                                    };
                                    // TODO: try catch
                                    pointObject = new PointInterface(pointObject);
                                    pointObject.index = k;
                                    qt.insertPoint(pointObject);
                                    break; // TODO: handle multiple geomList if necessary (take centroid as the average of their centroid?)

                                }

                            }
                            else if (geom && geom.type === Vector.Type.POLYGON && concernedGeometries.includes(geom.type)) {
                                geometriesCount.polygon++;
                                let geomList = geom.geometryList;
                                for (let kk = 0; kk < geomList.length; ++kk) {
                                    let coord = geomList[kk].vertexList;
                                    for (let j = 0; j < coord.length; ++j) {
                                        let coordSingle = coord[j];
                                        let xNormalized = (coordSingle.x - minX) / (maxX - minX);
                                        let yNormalized = (coordSingle.y - minY) / (maxY - minY);
                                        coordSingle.x = xNormalized;
                                        coordSingle.y = yNormalized;
                                    }

                                    let centroid = compute2DPolygonCentroid(coord);
                                    let pointObject = {};

                                    pointObject.pointInterfaceGetX = function () {
                                        return centroid.x;
                                    };
                                    pointObject.pointInterfaceGetY = function () {
                                        return centroid.y;
                                    };
                                    // TODO: try catch
                                    pointObject = new PointInterface(pointObject);
                                    pointObject.index = k;
                                    qt.insertPoint(pointObject);

                                    break; // TODO: handle multiple geomList if necessary (take centroid as the average of their centroid?)
                                }

                            } 
                            else if (geom && geom.type === Vector.Type.MULTILINESTRING && concernedGeometries.includes(geom.type)) {
                                geometriesCount.multilinestring++;
                                let geomList = geom.geometryList;
                                for (let kk = 0; kk < geomList.length; ++kk) {
                                    let coord = geomList[kk].vertexList;

                                    let xStart = coord[0].x;
                                    let xEnd = coord[coord.length-1].x;
                                    let xMiddle = xStart + (xEnd - xStart) / 2;
                                    let yStart = coord[0].y;
                                    let yEnd = coord[coord.length-1].y;
                                    let yMiddle = yStart + (yEnd - yStart) / 2;
                                    let xNormalized = (xMiddle - minX) / (maxX - minX);
                                    let yNormalized = (yMiddle - minY) / (maxY - minY);
                                    let centroid = {
                                        x: xNormalized,
                                        y: yNormalized
                                    };
                                    let pointObject = {};
    
                                    pointObject.pointInterfaceGetX = function () {
                                        return centroid.x;
                                    };
                                    pointObject.pointInterfaceGetY = function () {
                                        return centroid.y;
                                    };
                                    // TODO: try catch
                                    pointObject = new PointInterface(pointObject);
                                    pointObject.index = k;
                                    qt.insertPoint(pointObject);
    
                                    break; // TODO: handle multiple geomList if necessary (take centroid as the average of their centroid?)
                                }
                            } 
                            else if (geom && geom.type === Vector.Type.LINESTRING && concernedGeometries.includes(geom.type)) {
                                geometriesCount.linestring++;
                                let coord = geom.vertexList;

                                let xStart = coord[0].x;
                                let xEnd = coord[coord.length-1].x;
                                let xMiddle = xStart + (xEnd - xStart) / 2;
                                let yStart = coord[0].y;
                                let yEnd = coord[coord.length-1].y;
                                let yMiddle = yStart + (yEnd - yStart) / 2;
                                let xNormalized = (xMiddle - minX) / (maxX - minX);
                                let yNormalized = (yMiddle - minY) / (maxY - minY);
                                let centroid = {
                                    x: xNormalized,
                                    y: yNormalized
                                };
                                let pointObject = {};

                                pointObject.pointInterfaceGetX = function () {
                                    return centroid.x;
                                };
                                pointObject.pointInterfaceGetY = function () {
                                    return centroid.y;
                                };
                                // TODO: try catch
                                pointObject = new PointInterface(pointObject);
                                pointObject.index = k;
                                qt.insertPoint(pointObject);
                                
                            } else if (geom && geom.type === Vector.Type.MULTIPOINT && concernedGeometries.includes(geom.type)) {
                                geometriesCount.multipoint++;
                                let geomList = geom.geometryList;
                                let xStart = geomList[0].x;
                                let xEnd = geomList[geomList.length-1].x;
                                let xMiddle = xStart + (xEnd - xStart) / 2;
                                let yStart = geomList[0].y;
                                let yEnd = geomList[geomList.length-1].y;
                                let yMiddle = yStart + (yEnd - yStart) / 2;
                                let xNormalized = (xMiddle - minX) / (maxX - minX);
                                let yNormalized = (yMiddle - minY) / (maxY - minY);
                                let centroid = {
                                    x: xNormalized,
                                    y: yNormalized
                                };
                                let pointObject = {};

                                pointObject.pointInterfaceGetX = function () {
                                    return centroid.x;
                                };
                                pointObject.pointInterfaceGetY = function () {
                                    return centroid.y;
                                };
                                // TODO: try catch
                                pointObject = new PointInterface(pointObject);
                                pointObject.index = k;
                                qt.insertPoint(pointObject);
                            } else if (geom && geom.type === Vector.Type.POINT && concernedGeometries.includes(geom.type)) {
                                geometriesCount.point++;
                                let xNormalized = (geom.x - minX) / (maxX - minX);
                                let yNormalized = (geom.y - minY) / (maxY - minY);
                                let centroid = {
                                    x: xNormalized,
                                    y: yNormalized
                                };
                                let pointObject = {};
                                pointObject.pointInterfaceGetX = function () {
                                    return centroid.x;
                                };
                                pointObject.pointInterfaceGetY = function () {
                                    return centroid.y;
                                };
                                // TODO: try catch
                                pointObject = new PointInterface(pointObject);
                                pointObject.index = k;
                                qt.insertPoint(pointObject);
                            }
                            else {
                                if(geom) {
                                    //console.log("Geometry type [" + geom.type + "] not skipped");
                                }
                                continue;
                            }

                        }
                    }

                    var process = function (geometries, geojson) {

                        // because each geometry type is handled in a separate class and thus end up in a seperate Node3D,
                        // we need to generate a different quadtree sort for each geometry type and filter out not applicable geometries
                        var concernedGeometries = geometries;
                        if(!concernedGeometries || !concernedGeometries.length) {
                            throw new Error("No geometry type specified for sorter worker");   
                        }

                        // TODO: find better heuristic? lower: more precise / higher: faster to compute
                        var quadtreeMaxCapacity = 5000;
                        var quadtreeMaxDepth = 10; // TODO: find better heuristic? is a max depth needed?
                        // the quadtree root node box is a 1 by 1 square, works because all coordinates will be normalized between 0 and 1
                        var box = new Box(0, 0, 1, 1);
                        var qt = new QuadTree(box, quadtreeMaxCapacity, quadtreeMaxDepth);

                        var boundingBox = computeBoundingBox(geojson, concernedGeometries);

                        fillQuadTree(geojson, qt, boundingBox, concernedGeometries);

                        let sortedLeaves = qt.getLeaves();

                        var sortedFeaturesIndexes = [];

                        // depth first search on the quadtree will naturally give us the features sorted, close to each other
                        for (let indexLeave = 0 ; indexLeave < sortedLeaves.length ; ++indexLeave) {

                            for (let indexLeaveFeature = 0 ; indexLeaveFeature < sortedLeaves[indexLeave].length ; ++indexLeaveFeature) {
                                // fetch features index from geojson datasource in proximity order thanks to the sorting order provided by the quadtree
                                let currentIndex = sortedLeaves[indexLeave][indexLeaveFeature].index;
                                sortedFeaturesIndexes.push(currentIndex);
                            }

                            // at the end: send
                            if (indexLeave === sortedLeaves.length - 1) {
                                let shuffle = false; // for test purposes
                                if (shuffle) {
                                    for (let z = 0 ; z < sortedFeaturesIndexes.length ; z++) {
                                        let temp = sortedFeaturesIndexes[z];
                                        let randIndex = Math.floor(Math.random() * sortedFeaturesIndexes.length);
                                        sortedFeaturesIndexes[z] = sortedFeaturesIndexes[randIndex];
                                        sortedFeaturesIndexes[randIndex] = temp;
                                    }
                                }

                                var sortedFeaturesIndexesBuffer = new Int32Array(sortedFeaturesIndexes).buffer;
                                // send back the features' indexes in sorted order
                                let dataToSend = {
                                    geometriesCount: geometriesCount,
                                    sortedFeaturesIndexesBuffer: sortedFeaturesIndexesBuffer
                                };
                                workerContext.postMessage(dataToSend, [dataToSend.sortedFeaturesIndexesBuffer]);
                            }

                        }



                    }
                    

                    let shpBufferAvailable = false;
                    let dbfBufferAvailable = false;
                    if(data.shp) {
                        shpBufferAvailable = true;
                    }
                    if(data.dbf) {
                        dbfBufferAvailable = true;
                    }
                    let shpArrayBuffersAvailable = shpBufferAvailable && dbfBufferAvailable; // warning: using && on buffers concatenate them

                    if(data.geojson) {
                        let geojsonStr = new TextDecoder().decode(data.geojson);
                        process(data.geometries, JSON.parse(geojsonStr));
                    } else if(shpArrayBuffersAvailable) {
                        shapefile.read(data.shp, data.dbf).then(geojsonFromShp => process(data.geometries, geojsonFromShp))
                    } else {
                        throw new Error("Data input for sorter worker is neither geojson nor shp");
                    }
                    

                }

                function compute2DPolygonCentroid(vertices) {
                    var centroid = {x:0, y:0};
                    var signedArea = 0.0;
                    var x0 = 0.0; // Current vertex X
                    var y0 = 0.0; // Current vertex Y
                    var x1 = 0.0; // Next vertex X
                    var y1 = 0.0; // Next vertex Y
                    var a = 0.0; // Partial signed area

                    // For all vertices except last
                    var i = 0;
                    for (i = 0; i < vertices.length - 1; i++) {
                        x0 = vertices[i].x;
                        y0 = vertices[i].y;
                        x1 = vertices[i + 1].x;
                        y1 = vertices[i + 1].y;
                        a = x0 * y1 - x1 * y0;
                        signedArea += a;
                        centroid.x += (x0 + x1) * a;
                        centroid.y += (y0 + y1) * a;
                    }

                    // Do last vertex separately to avoid performing an expensive
                    // modulus operation in each iteration.
                    x0 = vertices[i].x;
                    y0 = vertices[i].y;
                    x1 = vertices[0].x;
                    y1 = vertices[0].y;
                    a = x0 * y1 - x1 * y0;
                    signedArea += a;
                    centroid.x += (x0 + x1) * a;
                    centroid.y += (y0 + y1) * a;

                    signedArea *= 0.5;
                    centroid.x /= (6.0 * signedArea);
                    centroid.y /= (6.0 * signedArea);

                    return centroid;
                }

                sort(e.data);

            }); // require

    }; // onMessage

    class PointInterface {

        constructor(pointObject) {
            // duck typing interface to handle different type of objects (the user provides the way to compute the x and y coordinate)
            // following methods can be added to the object prototype on the fly before inserting the objects in the quadtree
            if (typeof pointObject['pointInterfaceGetX'] !== 'function') {
                //console.error("Point parameter object does not fulfill the contract: no pointInterfaceGetX method.");
                throw new TypeError("Provided point object does not fulfill the contract: no pointInterfaceGetX method.");
            }
            if (typeof pointObject['pointInterfaceGetY'] !== 'function') {
                //console.error("Point parameter object does not fulfill the contract: no pointInterfaceGetY method.");
                throw new TypeError("Provided point object does not fulfill the contract: no pointInterfaceGetY method.");
            }
            this.pointInterfaceGetX = pointObject['pointInterfaceGetX'];
            this.pointInterfaceGetY = pointObject['pointInterfaceGetY'];
        }

        get x() {
            let res = this.pointInterfaceGetX();
            if (typeof res !== 'number') {
                //console.error("x value for point is undefined when calling the pointInterfaceGetX method.");
                throw new TypeError("x value for point is NaN when calling the pointInterfaceGetX method.");
            }
            return res;
        }

        get y() {
            let res = this.pointInterfaceGetY();
            if (typeof res !== 'number') {
                //console.error("y value for point is undefined when calling the pointInterfaceGetY method.");
                throw new TypeError("y value for point is NaN when calling the pointInterfaceGetY method.");
            }
            return res;
        }
    }

    class Box {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        contains(point) {
            return !(point.x < this.x || point.x > (this.x + this.width) || point.y < this.y || point.y > (this.y + this.height));
        }
    }

    class QuadTree {

        constructor(boxContainer, nodeCapacity, maxDepth, level) {
            this.nodeCapacityDefault = 10;
            this.maxDepthDefault = 6;
            this.box = boxContainer;
            this.nodeCapacity = nodeCapacity || this.nodeCapacityDefault;
            this.maxDepth = maxDepth || this.maxDepthDefault;
            this.northWest = null;
            this.northEast = null;
            this.southWest = null;
            this.southEast = null;
            this.points = [];
            this.level = level || 0;
        }

        // point should implement the PointInterface methods described above
        insertPoint(point) {

            // point is not in this node's region
            if (!this.box.contains(point)) {
                return false;
            }

            // we check if the current node is subdivided by testing an arbitrary child (this.northWest === null)
            // works because if one child is divided, they all are, and if not, none are
            // we add it if we do not esceed the node capacity
            if (this.points.length < this.nodeCapacity && this.northWest === null) {
                this.points.push(point);
                return true;
            }

            // otherwise the current node is full so we need to subdivize it into four children
            if (this.northWest === null) {
                this.subdivide();
            }

            // and now we can add the point to the corresponding subnode
            if (this.northWest.insertPoint(point) ||
                this.northEast.insertPoint(point) ||
                this.southWest.insertPoint(point) ||
                this.southEast.insertPoint(point)) {
                return true;
            }

            console.error("Could not insert point in QuadTree.");
            return false; // should not happen
        }

        insertPoints(points) {
            for (let point in points) {
                this.insertPoint(points[point]);
            }
        }

        subdivide() {
            // create 4 children of the current node by dividing its area in 4
            let newWidth = this.box.width / 2;
            let newHeight = this.box.height / 2;
            let northWestBox = new Box(this.box.x, this.box.y, newWidth, newHeight);
            let northEastBox = new Box(this.box.x + newWidth, this.box.y, newWidth, newHeight);
            let southWestBox = new Box(this.box.x, this.box.y + newHeight, newWidth, newHeight);
            let southEastBox = new Box(this.box.x + newWidth, this.box.y + newHeight, newWidth, newHeight);

            this.northWest = new QuadTree(northWestBox, this.nodeCapacity, this.maxDepth, this.level + 1);
            this.northEast = new QuadTree(northEastBox, this.nodeCapacity, this.maxDepth, this.level + 1);
            this.southWest = new QuadTree(southWestBox, this.nodeCapacity, this.maxDepth, this.level + 1);
            this.southEast = new QuadTree(southEastBox, this.nodeCapacity, this.maxDepth, this.level + 1);

            this.insertPoints(this.points); // transfer current node points to the corresponding children
            this.points = []; // clean (only leaves contain points)
        }

        printDebug(maxLevel, isSouthEast) {

            maxLevel = maxLevel || QuadTree.maxDepthDefault;

            if (this.level > maxLevel) { return; }

            let result = "";
            let branch = "|---";
            let space = "|   ";

            for (let i = 0 ; i < this.level ; i++) {
                if (i + 1 === this.level) {
                    result += branch;
                } else {
                    result += space;
                }
            }

            result += "level[" + this.level + "]";

            if (this.points.length > 0) {
                result += " [" + this.points.length + " node(s)]" + "\n";
                for (let i = 0 ; i < this.level && !(i + 1 === this.level && isSouthEast) ; i++) { result += space; }
                result += "\n";
            } else {
                result += "\n";
                for (let i = 0 ; i <= this.level ; i++) { result += space; }
                result += "\n";
            }

            if (this.northWest !== null) { // there are leaves to explore
                result += this.northWest.printDebug(maxLevel, false);
                result += this.northEast.printDebug(maxLevel, false);
                result += this.southWest.printDebug(maxLevel, false);
                result += this.southEast.printDebug(maxLevel, true);
            }

            return result;
        }

        getLeaves(collectedLeaves) {

            collectedLeaves = collectedLeaves || []; // no array param on first call: create a new one

            // we reached a leave: stop & collect
            if (this.northWest === null) {
                collectedLeaves.push(this.points);
                return collectedLeaves;
            }

            // search recursively for leaves and collect
            collectedLeaves = this.northWest.getLeaves(collectedLeaves);
            collectedLeaves = this.northEast.getLeaves(collectedLeaves);
            collectedLeaves = this.southWest.getLeaves(collectedLeaves);
            collectedLeaves = this.southEast.getLeaves(collectedLeaves);

            return collectedLeaves;
        }

    }

})(this);
