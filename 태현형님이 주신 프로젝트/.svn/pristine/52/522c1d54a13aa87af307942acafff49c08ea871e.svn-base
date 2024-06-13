/**
 * @author TL1
 */

(function (workerContext) {

    "use strict";
    workerContext.importScripts('../AmdLoader/AmdLoader.js');

    require.config({
        baseUrl: ".."
    });

    var UVBuffer = null;

    workerContext.onmessage = function (e) {

        require(['DS/Mesh/ThreeJS_Base', 'DS/Mesh/Mesh', 'DS/XCityWorkers/PrimitiveCreator'], function (THREE, Mesh, PrimitiveCreator) {

            //globals
            var creator = null;

            // generate one crossquad from one point and its attributes
            // the crossquad is computed relatively to he patch center
            // TODO : color + forceAltitude
            // already existing BUG : rotation in degree or radians !?
            function buildOne(data, id, bufferId) {

                // inputs
                var datasource = data.datasource;
                var crossQuad = datasource[bufferId];
                //console.log(crossQuad);
                var coordinates = crossQuad.geometry.coordinates;
                var properties = crossQuad.properties;

                var type = undefined;

                // Read properties
                var strid = properties.strid;
                var scales = properties.scale.split(" ");
                var orientations = properties.orient.split(" ");
                var textureIndex = Number(properties.index);
                // should be set from feature attribute
                var color = new THREE.Color(0xffffff);
                var altitude = Number(properties.altitude);

                var stype = properties.type;
                if (stype !== undefined) {
                    type = Number(stype);
                    if (type === 5) {
                        type = 3;
                    }
                }

                var indexTexture = textureIndex;
                if (type !== undefined) {
                    indexTexture = Math.floor((4 - type) * 4 + textureIndex / 4);
                }

                var rotation = (Math.PI/180.0) * Number(orientations[0]);

                var cosRot = Math.cos(rotation);
                var sinRot = Math.sin(rotation);

                var scaleXY = Number(scales[0]);
                var scaleZ = Number(scales[2]);

                var vecScaledCosRot = 0.5 * scaleXY * cosRot;
                var vecScaledsinRot = 0.5 * scaleXY * sinRot;
            

                var ind = 8 * indexTexture;

                // Add current crossquad
                creator.startPrimitive();

                var c0 = coordinates[0] - datasource[0].geometry.coordinates[0];
                var c1 = coordinates[1] - datasource[0].geometry.coordinates[1];

                creator.pushVertex([c0 - vecScaledCosRot, c1 + vecScaledsinRot, altitude]);
                creator.pushVertex([c0 + vecScaledCosRot, c1 - vecScaledsinRot, altitude]);
                creator.pushVertex([c0 + vecScaledCosRot, c1 - vecScaledsinRot, altitude + scaleZ]);
                creator.pushVertex([c0 - vecScaledCosRot, c1 + vecScaledsinRot, altitude + scaleZ]);
                creator.pushVertex([c0 + vecScaledsinRot, c1 + vecScaledCosRot, altitude]);
                creator.pushVertex([c0 - vecScaledsinRot, c1 - vecScaledCosRot, altitude]);
                creator.pushVertex([c0 - vecScaledsinRot, c1 - vecScaledCosRot, altitude + scaleZ]);
                creator.pushVertex([c0 + vecScaledsinRot, c1 + vecScaledCosRot, altitude + scaleZ]);

                creator.pushNormal([-sinRot, -cosRot, 0]);
                creator.pushNormal([-sinRot, -cosRot, 0]);
                creator.pushNormal([-cosRot, sinRot, 0]);
                creator.pushNormal([-cosRot, sinRot, 0]);
                creator.pushNormal([-sinRot, -cosRot, 0]);
                creator.pushNormal([-sinRot, -cosRot, 0]);
                creator.pushNormal([-cosRot, sinRot, 0]);
                creator.pushNormal([-cosRot, sinRot, 0]);

                creator.pushTexCoord(0, [UVBuffer[ind],     UVBuffer[ind + 1]]);
                creator.pushTexCoord(0, [UVBuffer[ind + 2], UVBuffer[ind + 3]]);
                creator.pushTexCoord(0, [UVBuffer[ind + 4], UVBuffer[ind + 5]]);
                creator.pushTexCoord(0, [UVBuffer[ind + 6], UVBuffer[ind + 7]]);
                creator.pushTexCoord(0, [UVBuffer[ind],     UVBuffer[ind + 1]]);
                creator.pushTexCoord(0, [UVBuffer[ind + 2], UVBuffer[ind + 3]]);
                creator.pushTexCoord(0, [UVBuffer[ind + 4], UVBuffer[ind + 5]]);
                creator.pushTexCoord(0, [UVBuffer[ind + 6], UVBuffer[ind + 7]]);

                var rand = Math.random();
                creator.pushTexCoord(1, [0.0, rand]);
                creator.pushTexCoord(1, [0.0, rand]);
                creator.pushTexCoord(1, [scaleZ, rand]);
                creator.pushTexCoord(1, [scaleZ, rand]);
                creator.pushTexCoord(1, [0.0, rand]);
                creator.pushTexCoord(1, [0.0, rand]);
                creator.pushTexCoord(1, [scaleZ, rand]);
                creator.pushTexCoord(1, [scaleZ, rand]);

                // manually manage index offset for editable mesh
                var indexOffset = 8 * id;

                creator.pushVertexIndices([indexOffset, indexOffset + 1, indexOffset + 2]);
                creator.pushVertexIndices([indexOffset, indexOffset + 2, indexOffset + 3]);
                creator.pushVertexIndices([indexOffset + 4, indexOffset + 5, indexOffset + 6]);
                creator.pushVertexIndices([indexOffset + 4, indexOffset + 6, indexOffset + 7]);

                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);
                creator.pushColor([color.r, color.g, color.b, 1.0]);

                creator.endPrimitive(strid);
            }


            // function called when worker receive a message.
            function build(data, cb) {

                    creator = new PrimitiveCreator({
                        "indexed": true,
                        "normalBinding": PrimitiveCreator.Binding.VERTEX,
                        "useTexCoord": true,
                        "nbTexCoord": 2,
                        "texCoordBinding": PrimitiveCreator.Binding.VERTEX,
                        "useColor": true,
                        "colorBinding": PrimitiveCreator.Binding.VERTEX
                    });
            

                // build crossquads
                    var treeId = 0;
                    for (var i = 0; i < data.datasource.length; i++) {

                        if (data.datasource[i].cropped === false) {
                            buildOne(data, treeId, i);
                            treeId++;
                        }
                    }
               
                // create primitive group
                var pGroup = creator.compilePrimitive("Tree", true /*editable*/);
                // post result to main thread
                cb(pGroup);
            }

            // worker init
            if (e.data.init === true) {

                UVBuffer = e.data.UVBuffer;
            }
            else {
                build(e.data, function (result) {
                                workerContext.postMessage({
                                    result: result
                                });
                });
            }

        }); // require
    }; // onMessage
})(this);
