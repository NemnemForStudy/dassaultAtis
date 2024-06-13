define('DS/MePreferencesClientAPI/MePreferencesClientAPI',
    ['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
        'DS/WAFData/WAFData',
        'DS/MePreferencesUIBuilder/MePreferencesModalDialog'],
    function (i3DXCompassPlatformServices, WAFData, MePreferencesModalDialog) {

        var SERVICE_URL = "";
        var READ_WRITE_PREFERENCE_ENDPOINT = "/api/v1/preferences";
        var mePreferencesModalDialog = null;
        /**
         * @private
         */
        function callRestAPI(requestBody, completeURL, methodType) {

            var dataInfo;
            var headersInfo;
            var typeInfo;
            if (requestBody) {
                dataInfo = JSON.stringify(requestBody);
                headersInfo = {
                    'Content-Type': 'application/json'
                };
                typeInfo = 'json';
            }
            var newProm = new Promise(function (resolve, reject) {
                WAFData.authenticatedRequest(completeURL, {
                    method: methodType,
                    type: typeInfo,
                    data: dataInfo,
                    headers: headersInfo,
                    onComplete: function (responseObject) {
                        resolve(responseObject);
                    },
                    onFailure: function (errorObject) {
                        reject(errorObject);
                    }
                });
            });
            return newProm;
        }

        /**
         * @private
         */
        function retrievePlatformId() {
            var webURL = window.location.href;
            var startPt = webURL.search("//");
            startPt += 2;
            var endPt = webURL.search("-");
            var platformID = webURL.substring(startPt, endPt);
            return platformID.toUpperCase();
        }

        /**
         * @private
         * */
        function getMePreferencesServiceURL(platformID) {

            var prom = new Promise(function (resolve, reject) {
                i3DXCompassPlatformServices.getServiceUrl({
                    serviceName: 'mepreferences',
                    platformId: platformID,
                    onComplete: function (urlData) {
                        resolve(urlData);
                    },
                    onFailure: function (errorInfo) {
                        reject(errorInfo);
                    }
                });
            });
            return prom;

        }

        /**
         * @private
         */
        function sanitizeInput(rawInputArray) {

            var repoPrefMap = Object.create(Map);
            for (var cnt = 0; cnt < rawInputArray.length; cnt++) {
                var repoObj = rawInputArray[cnt];
                var repoName = repoObj['Repository'];
                var prefArray = repoObj['PreferenceNames'];
                if (repoPrefMap[repoName]) {
                    var currPrefArray = repoPrefMap[repoName];
                    currPrefArray = currPrefArray.concat(prefArray);
                    var seen = {};
                    var resultArray = [];
                    for (var track = 0; track < currPrefArray.length; track++) {
                        if (seen[currPrefArray[track]] !== 1) {
                            seen[currPrefArray[track]] = 1;
                            resultArray.push(currPrefArray[track]);
                        }
                    }
                    repoPrefMap[repoName] = resultArray;
                }
                else {
                    repoPrefMap[repoName] = prefArray;
                }

            }
            return repoPrefMap;
        }

        /**
         * @private
         */
        function prepareRequestForRead(repoPrefMap) {

            var repoArray = [];
            var outputRequestBody = {};
            var mapLength = Object.entries(repoPrefMap).length;
            for (var cnt = 0; cnt < mapLength; cnt++) {
                var repoObj = {}
                repoObj["name"] = Object.entries(repoPrefMap)[cnt][0];
                var prefArray = [];
                prefArray = Object.entries(repoPrefMap)[cnt][1];
                repoObj["preferenceNames"] = prefArray;
                repoArray.push(repoObj);
            }
            outputRequestBody = { "repositories": repoArray };
            return outputRequestBody;
        }

        var mePrefPublicAPI = {

            //Input--> Array of objects (Repository and preference names)
            //Output--> JSON: Preference values 
            readPreferences: function (rawInputArray) {

                if (!rawInputArray.length) {
                    return Promise.reject("\n\t Input array cannot be empty ");
                }
                
                if (!SERVICE_URL) {

                    var newProm = new Promise(function (resolve, reject) {
                        //Get MePreferences service URL
                        getMePreferencesServiceURL(retrievePlatformId()).then((serviceURL) => {

                            //Form full URL
                            SERVICE_URL = serviceURL + READ_WRITE_PREFERENCE_ENDPOINT;

                            //Sanitize Input Array
                            var resultRepoPrefMap = sanitizeInput(rawInputArray);

                            //Prepare Read request body
                            var safeRequestBody = prepareRequestForRead(resultRepoPrefMap);

                            callRestAPI(safeRequestBody, SERVICE_URL, 'POST').then((responseObject) => {
                                resolve(responseObject);
                            }).catch((errorInfo) => {
                                reject(errorInfo);
                            });

                        }).catch((errorInfo) => {
                            reject(errorInfo);
                        });
                    });

                    return newProm;

                }
                else {
                    //Sanitize Input Array
                    var resultRepoPrefMap = sanitizeInput(rawInputArray);

                    //Prepare Read request body
                    var safeRequestBody = prepareRequestForRead(resultRepoPrefMap);

                    if (!safeRequestBody) {
                        return Promise.reject("\n\t PreferenceNames array cannot be empty ");
                    }

                    var newProm = new Promise(function (resolve, reject) {
                        callRestAPI(safeRequestBody, SERVICE_URL, 'POST').then((responseObject) => {
                            resolve(responseObject);
                        }).catch((errorInfo) => {
                            reject(errorInfo);
                        });
                    });
                    return newProm;
                }
            },
            getMePreferencesDialog: async function (appID) {

                console.log("\n\t Inside getMePreferencesDialog ");
                if (mePreferencesModalDialog)
                    return mePreferencesModalDialog;
                else {
                    mePreferencesModalDialog = await MePreferencesModalDialog.getMePreferenceDialog(appID);
                    return mePreferencesModalDialog;
                }

            }

        };
        
        document.addEventListener("ImmFrameRemoved", (e) => {
            mePreferencesModalDialog = null;    
         });
 

        return mePrefPublicAPI;
    });
