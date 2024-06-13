(function (workerContext) {

    "use strict";
    workerContext.importScripts('../AmdLoader/AmdLoader.js');
    workerContext.importScripts('FakeDomForWebWorker.js'); // Add a dummy DOM to the worker context to be able to load sources referencing it
  
    require.config({
        baseUrl: ".."
    });

    let pauseBuildTileCache = false;
    const defaultAnalyticsType = "String";
    
    workerContext.onmessage = function (msg) {

        require([
            'DS/XCityTools/shapefile', 
            'DS/XCityLayer/VectorLoaderJSON'
        ],
            function (shapefile, VectorLoaderJSON) {
                
                function isFloat(n){
                    return Number(n) === n && n % 1 !== 0;
                }
        
                function getValueType(value) {
                    // no point in forcing conversion as operation will fail as long as we do not convert all data types
                    // suppose data has been cleaned if needed (city prepare)
                    // Number(false) Number(null) return 0, so they are interpreted as numbers, but not Number("false")
                    return Number.isFinite(value) ? "Number" : "String";
                }

                function sortAnalytics(analytics, sortKey) {
                    analytics = analytics.sort((a, b) => a[sortKey].localeCompare(b[sortKey], undefined, {sensitivity: 'base'}));
                }
        
                function initAttribute(analytics, key, value, propTypes) {
                    if(key === 'STRID') { // internal ID that does not come from user data so we should not display it
                        return;
                    }
                    analytics.push({
                        "name": key,
                        "type": (propTypes.get(key) || defaultAnalyticsType),
                        "statistics": {
                            "name": key,
                            "count": 1,
                            "type": (propTypes.get(key) || defaultAnalyticsType),
                            "min": (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : value ,
                            "max": (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : value,
                            "sum": (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : value,
                            "average": (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : value
                        }
                    });
                }
        
                function registerAttribute(analytics, key, value, propTypes) {
                    let analytic = analytics.find(e => e.name === key);
                    if(!analytic) {
                        initAttribute(analytics, key, value, propTypes);
                    } else {
                        analytic.statistics.count++;
                        analytic.statistics.min = (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : Math.min(value, analytic.statistics.min);
                        analytic.statistics.max = (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : Math.max(value, analytic.statistics.max);
                        analytic.statistics.sum = (propTypes.get(key) || defaultAnalyticsType) === "String" ? '' : Number(analytic.statistics.sum) + Number(value);
                    }
                }
        
                function computeAnalyticsAverages(analytics) {
                    for(let key in analytics) {
                        if(analytics[key].statistics.type === 'Number') {
                            analytics[key].statistics.average = Number(analytics[key].statistics.sum) / Number(analytics[key].statistics.count);
                        }
                    }
                }

                // warning: each property might not be present in each feature
                function generatePropertiesType(dataSource, analytics) {
                    const types = new Map();
                    dataSource.list.forEach((feature) => {
                        for(let key in feature.properties) {
                            if(feature.properties[key] !== "" && !types.has(key)) {
                                // if we ask for type of "" getValueType would return Number (because interpreted as 0)
                                // problem is that its empty because current feature might not have this property
                                // and next feature which have this property might actually be of a String type
                                // so we ignore it and wait to find afeature with this property
                                // if no feature has this property, then it will not be added to analytics
                                let valueType = getValueType(feature.properties[key]);
                                types.set(key, valueType);
                            }
                        }
                    });
                    return types;
                }
        
                function generateAnalytics(geojson) {
                    let loader = new VectorLoaderJSON();
                    let dataSource = loader.loadDataSourceFromObject(geojson);
                    let analytics = [];
                    
                    const propTypes = generatePropertiesType(dataSource, analytics);

                    dataSource.list.forEach((feature) => {
                        for(let key in feature.properties) {
                            registerAttribute(analytics, key, feature.properties[key], propTypes);
                        }
                    });

                    for(let i in analytics) {
                        if(analytics[i].statistics.type === 'String') {
                            let key = analytics[i].name;
                            analytics[i].statistics.min = 
                                dataSource.list.reduce((a,b) => a.properties[key] < b.properties[key] ? a : b).properties[key]
                            analytics[i].statistics.max = 
                                dataSource.list.reduce((a,b) => a.properties[key] > b.properties[key] ? a : b).properties[key]
                        }
                    }

                    computeAnalyticsAverages(analytics); // done at the end to do it only once for performance
                    sortAnalytics(analytics, 'name');
                    return analytics;
                }

                function generateStats(geojson, param) {

                    const arr = geojson.features.map(e => e.properties[param.attributeName]);
                    // sort array ascending
                    const asc = arr => arr.sort((a, b) => a - b);
                    let classList = [];
                    const sorted = asc(arr).filter(e => Number.isFinite(parseFloat(e)));
                    const type = sorted.length 
                        ? (getValueType(sorted[0]) === 'Number' ? (isFloat(sorted[0]) ? 'Float' : 'Integer') : defaultAnalyticsType) 
                        : defaultAnalyticsType;

                    if(sorted.length === 0 && ['quantile', 'geometric', 'quantize'].includes(param.method)) {
                        // can't compute stats for such methods when there are no numerical values for an attribute
                        let classListDummy = [{label:'0,0', count:0, minValue:0, maxValue: 0}];
                        return {attributeType: type, classList: classListDummy, nbFeature: sorted.length};
                    }

                    const stepSize = 1 / param.steps;
                    
                    const min = parseFloat(sorted[0]);
                    const max = parseFloat(sorted[sorted.length-1]);
                    const delta = parseFloat(max - min);
                    let lastMaxIndex, lastMinIndex;

                    switch(param.method) {

                        case 'quantile': // Creates steps that each contain an equal number of items
                            lastMaxIndex = -1;
                            for(let i=0 ; i<param.steps ; i++) {
                                const posMin = lastMaxIndex === -1 ? 0 : lastMaxIndex + 1;
                                const posMax = Math.floor((sorted.length - 1) * ((i+1)*stepSize));
                                if(posMin > lastMaxIndex && posMax < sorted.length) {
                                    const minValue = Number(sorted[posMin]);
                                    const maxValue = Number(sorted[posMax]);
                                    const count = posMax - posMin;
                                    classList.push({label:minValue+','+maxValue, count:count, minValue:minValue, maxValue: maxValue});
                                    lastMaxIndex = posMax;
                                }
                            }
                            return {attributeType: type, classList: classList, nbFeature: sorted.length};
                        case 'geometric': // Creates steps that each contain twice as many items as the step that follows
                            lastMinIndex = 0;
                            lastMaxIndex = 1;
                            for(let i=0.0 ; lastMaxIndex<sorted.length; i++) {
                                let minValue = Number(sorted[lastMinIndex]);
                                let maxValue = Number(sorted[lastMaxIndex]);
                                lastMinIndex = lastMaxIndex;
                                lastMaxIndex *= 2;
                                let count = 1; // TODO implement if needed
                                classList.push({label:minValue+',' + maxValue, count:count, minValue:minValue, maxValue: maxValue});
                            }
                            // keep only the n number of steps wanted by choosing the n last classes with most values
                            classList = classList.splice(Math.max(0, classList.length - param.steps), param.steps);
                            return {attributeType: type, classList: classList, nbFeature: sorted.length};
                        case 'quantize': // Creates steps that each have the same interval
                            for(let i=0.0 ; i<param.steps ; i++) {
                                let minValue = (i === 0.0 ? 0.0 : (i * stepSize)) * delta + min;
                                let maxValue = (parseFloat(i+1.0) * stepSize) * delta + min;
                                let count = 1; // TODO implement if needed
                                classList.push({label:minValue+','+maxValue, count:count, minValue:minValue, maxValue: maxValue});
                            }
                            return {attributeType: type, classList: classList, nbFeature: sorted.length};
                        default: // string class as default
                            const stringCounts = arr.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), []); 
                            const top = Object.entries(stringCounts).sort((a,b) => b[1]-a[1]).splice(0, param.steps);
                            for(let i=0 ; i<top.length ; i++) {
                                classList.push({count: top[i][1], label:top[i][0]});
                            }
                            return {attributeType: type, classList: classList, nbFeature: arr.length};
                    }
                }

                async function extractGeojsonFromData(data) {
                    let geojson = null;
                    let shpBufferAvailable = false;
                    let dbfBufferAvailable = false;
                    if(data.shp) {
                        shpBufferAvailable = true;
                    }
                    if(data.dbf) {
                        dbfBufferAvailable = true;
                    }
                    let shpArrayBuffersAvailable = shpBufferAvailable && dbfBufferAvailable; // warning: using && on buffers concatenate them

                    return new Promise((resolve, reject) => {
                        if(data.geojson) {
                            let geojsonStr = new TextDecoder().decode(data.geojson);
                            resolve(JSON.parse(geojsonStr));
                        } else if(shpArrayBuffersAvailable) {
                            shapefile.read(data.shp, data.dbf).then(res => resolve(res));
                        }
                    });
                }

                function buildTileCache(requests) {
                    // TODO check that login request sent by Downloader makes it so we are not logged out during long inactive periods
                    const percentageRefreshRate = 50; // at which request interval refresh button text too not impact performance
                    const tooManyRequestsWaitTimeSec = 60 * 1000; // how long to pause when receiving 429 error
                    const msBetweenRequestsDefault = 0;
                    let msBetweenRequests = msBetweenRequestsDefault;
                    const fetchNextRequest = function() {
                        if(pauseBuildTileCache !== true && requests.size > 0) {
                            if(requests.size%percentageRefreshRate === 0){
                                let progress = {
                                    RequestsRemaining: requests.size
                                };
                                postMessage(progress);
                            }   
                            const request = requests.entries().next().value[0];
                            fetch(request, { credentials: 'include' })
                            .then((response) => { 
                                if(response.status === 429) {
                                    msBetweenRequests = tooManyRequestsWaitTimeSec; // everybody calm down
                                } else if(msBetweenRequests !== msBetweenRequestsDefault) {
                                    msBetweenRequests = msBetweenRequestsDefault; // reset delay after having waited for 429 error
                                } 
                            })
                            .finally(() => {
                                requests.delete(request);
                                if(requests.size === 0) {
                                    let progress = {
                                        RequestsRemaining: 0
                                    };
                                    postMessage(progress);
                                } else {
                                    setTimeout(fetchNextRequest, msBetweenRequests);
                                }
                            });
                        } else {
                            setTimeout(fetchNextRequest, 100);
                        }
                    };
                    fetchNextRequest();
                }

                async function handleMsg(msg) {
                    let data = msg.data;
                    let geojson;
                    switch(data.function) {
                        case 'load': // may be usefull to send a first message to load the dependencies
                            break
                        case 'analytics':
                            geojson = await extractGeojsonFromData(data);
                            if(geojson) {
                                postMessage(generateAnalytics(geojson));
                            } else {
                                postMessage('Data input for analytics is neither GeoJSON nor SHP');
                            }
                            break;
                        case 'stats':
                            geojson = await extractGeojsonFromData(data);
                            if(geojson && data.param) {
                                postMessage(generateStats(geojson, data.param));
                            } else {
                                postMessage('Check that data input for stats is either GeoJSON or SHP and that you provide stats param');
                            }
                            break
                        case 'buildTileCache':
                            if(msg.data.pause === true) {
                                pauseBuildTileCache = true;
                            } else if(msg.data.resume === true) {
                                pauseBuildTileCache = false;
                            } else {
                                pauseBuildTileCache = false;
                                buildTileCache(msg.data.requests);
                            }
                            break
                        default:
                            postMessage('Error. No function has been specified.');
                    }
                }

                handleMsg(msg);
                
  
            }); // require
  
    }; // onMessage
  
  })(this);
  