"use strict";

/**
 * BT WW Competencies Center - Fast Prototypes Team
 * @author II2
 * 
 * Usage :
    let hub = new WidgetHub();
    let dataKey = "uniqKey";
    hub.requestData({
        //a key to identify the data
        dataKey: dataKey,
        //the request method, can be anything, async or not
        request: () => {
            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                success: response => {
                    //mandatory
                    hub.onSuccess(dataKey, response);
                },
                error: error => {
                    //mandatory
                    hub.onError(dataKey, error);
                }
            });
        },
        //data retrieval success function
        success: data => {
            console.log(data);
        },
        //data retrieval error function
        error: error => {
            console.log(error);
        },
        //optional : to force the reload 
        forceReload: reload
    });
 */
define("BTWWUtils/WidgetHub_ES5_II2_v1/WidgetHub", ["DS/PlatformAPI/PlatformAPI"], function (PlatformAPI) {
    "use strict";

    function WidgetHub() {
        var _this = this;

        var dataMap = {};

        //ready to provide you with data I store
        PlatformAPI.subscribe("WidgetHub:hello", function (request) {
            if (dataMap.hasOwnProperty(request.dataKey)) {
                var data = dataMap[request.dataKey];
                var age = (Date.now() - data.ts) / 1000;
                //if the status was error & the age is above 2seconds, or age > maxAge, no repply
                if (data.status === "error" && age > 2 /*|| age > maxAge*/) {
                        delete dataMap[request.dataKey];
                    } else {
                    PlatformAPI.publish("WidgetHub:data/" + request.dataKey, dataMap[request.dataKey]);
                }
            }
        });

        this.onSuccess = function (dataKey, response) {
            var data = { status: "ok", data: response, loader: widget.id, ts: Date.now() };
            dataMap[dataKey] = data;
            PlatformAPI.publish("WidgetHub:data/" + dataKey, data);
        };

        this.onError = function (dataKey, error) {
            var err = error instanceof Error ? error.message : error;
            var data = { status: "error", error: err, data: {}, loader: widget.id, ts: Date.now() };
            dataMap[dataKey] = data;
            PlatformAPI.publish("WidgetHub:data/" + dataKey, data);
        };

        //the data may have expired, or whatever.. anyway, please delete it :)
        this.deleteData = function (dataKey) {
            PlatformAPI.publish("WidgetHub:data/" + dataKey + "/action", { action: "delete" });
        };

        //i need a data
        this.requestData = function (config) {
            var dataKey = config.dataKey;
            var success = config.success;
            var error = config.error;
            var request = config.request;
            var forceReload = config.forceReload === true;

            var recieved = false;
            var cancel = false;
            var idCall = Date.now() + "-" + parseInt(10000 * Math.random()); //UUID of the requestData being done
            var cancelId = null;

            //the function to try to load the data
            var loadFcn = function loadFcn() {
                if (!recieved && !cancel) {
                    //well, looks like i have to find it myself !
                    //let's inform others i'm on it

                    var data = { status: "loading", loader: widget.id, ts: Date.now(), idCall: idCall };
                    dataMap[dataKey] = data;
                    PlatformAPI.publish("WidgetHub:data/" + dataKey, data);
                }
            };

            //the function that actually does the request
            var doRequest = function doRequest() {
                //i'm going to be the master of this data, let's be ready to answer
                PlatformAPI.subscribe("WidgetHub:data/" + dataKey + "/action", function (action) {
                    if (action.action === "delete") {
                        PlatformAPI.unsubscribe("WidgetHub:data/" + dataKey + "/action");
                        delete dataMap[dataKey];
                    } else {
                        console.error("o_O !");
                    }
                });
                //get the data with the provided method
                request(success, error);
            };

            //if reload forced, first delete
            if (forceReload === true) {
                _this.deleteData(dataKey);
            }
            PlatformAPI.subscribe("WidgetHub:data/" + dataKey, function (data) {
                //in case you dare sending it twice !
                if (!recieved) {
                    if (data.status === "loading") {
                        //console.log(`${widget.id} : sh!t, it's not loaded yet, let's wait  !`);
                        if (!cancel && !cancelId) {
                            cancelId = data.idCall;
                            cancel = true;
                            if (cancelId === idCall) {
                                //If the loading message is coming from me : do the request, else done by another request (different idCall)
                                setTimeout(doRequest, 0);
                            }
                        }
                    } else if (data.status === "ok") {
                        recieved = true;
                        setTimeout(function () {
                            success(data);
                        }, 0);
                        PlatformAPI.unsubscribe("WidgetHub:data/" + dataKey);
                    } else if (data.status === "error") {
                        recieved = true;
                        setTimeout(function () {
                            error(data);
                        }, 0);
                        //PlatformAPI.unsubscribe(`WidgetHub:data/${dataKey}`);
                    } else {
                        console.error("o_O");
                    }
                }
            });

            //do you have my data ? if you do, call me on `WidgetHub:data/${dataKey}` (and do it within 50ms!)
            PlatformAPI.publish("WidgetHub:hello", {
                dataKey: dataKey
            });

            //I'll be waiting here for a response... but 50ms, no more ! else, i'll load the data
            setTimeout(loadFcn, 50);
        };
    }

    return WidgetHub;
});