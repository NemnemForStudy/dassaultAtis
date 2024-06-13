steal('can',
      'jquery/class',
      'jquery/lang/json',
      'jquery/model',
      'can/util/fixture'
).then(
    'jquery/class',
    'jquery/model',
    '//../DSCommon/src/gateway_timeout.js',
function () {
    'use strict';
    var $ = window.$; //for mkscc compliance, we have to define all our variables...
    var can = window.can; //for mkscc compliance, we have to define all our variables...
    var steal = window.steal; //for mkscc compliance, we have to define all our variables...
    var Infra = window.Infra; //for mkscc compliance, we have to define all our variables...
    //var Fam = window.Fam; //for mkscc compliance, we have to define all our variables...
    //var Foe = window.Foe; //for mkscc compliance, we have to define all our variables...
    //var Snd = window.Snd; //for mkscc compliance, we have to define all our variables...
    //var Dfd = window.Dfd; //for mkscc compliance, we have to define all our variables...

    can.Model('Infra.Model.Search', {
        //V_Name;PLM_ExternalID;V_description;current;plmObjectType;V_discipline;physicalid;owner
        min_reporting_attrs_common : [
                            'PLM_ExternalID',
                            'physicalid',
                            'plmObjectType',
                            'V_discipline'
        ],

        attributes: {
        },

        webroot: ((window.Configuration && window.Configuration.webroot) ? window.Configuration.webroot : '/ematrix'),
        _data: {
            resource: {},
            physicalid2OXID: {},
            PLMExternalID2OXID: {}
        },

        init: function (blnFull) {
            $ = window.$; //for mkscc compliance, we have to define all our variables...
            can = window.can; //for mkscc compliance, we have to define all our variables...
            steal = window.steal; //for mkscc compliance, we have to define all our variables...
            Infra = window.Infra; //for mkscc compliance, we have to define all our variables...
            //Fam = window.Fam; //for mkscc compliance, we have to define all our variables...
            //Foe = window.Foe; //for mkscc compliance, we have to define all our variables...
            //Snd = window.Snd; //for mkscc compliance, we have to define all our variables...
            //Dfd = window.Dfd; //for mkscc compliance, we have to define all our variables...

            //reinitialize our data
            if (!Infra.Model.Search._data || blnFull) {
                Infra.Model.Search._data = {
                    resource: {},
                    physicalid2OXID: {},
                    PLMExternalID2OXID: {}
                };
            } else {
                //just clear these 2, so we don't lose track of any ajax calls that are being made
                Infra.Model.Search._data.resource = {};
                Infra.Model.Search._data.physicalid2OXID = {};
                Infra.Model.Search._data.PLMExternalID2OXID = {};
            }
        },

        //Find an object in the cache using OXID, physicalid, or PLM_ExternalID
        //(NOTE: PLM_ExternalID is completely unreliable for instances because instances of a given reference all have the same PLM_ExternalID
        FindPLMObjectInCache : function(params, MinimumProperties){
            var that = Infra.Model.Search;

            //copy the input params
            var ParamsCopy = $.extend(true, {}, params);

            //if only id is specified assume it's a PLM_ExternalID
            if(!ParamsCopy.OXID && !ParamsCopy.physicalid && !ParamsCopy.PLM_ExternalID)
            {
                if(ParamsCopy.id)
                    return null;
                else
                    ParamsCopy.PLM_ExternalID = ParamsCopy.id;
            }
            var resourceCache = that._data['resource'];
            if(resourceCache == undefined || resourceCache == null) {
                return null;
            }

            var PLMObj = null;
            if(!PLMObj && ParamsCopy.OXID) {
                PLMObj =  resourceCache[ParamsCopy.OXID];
            }

            //OXID wasn't specified? then try physicalid
            if(!PLMObj && ParamsCopy.physicalid)
            {
                 if (!PLMObj && that._data.physicalid2OXID) {
                     var OXID = that._data.physicalid2OXID[ParamsCopy.physicalid];
                     PLMObj = resourceCache[OXID];
                 }
            }

            //You can use PLM_ExternalID if you want but if you are looking for an instance who knows what you'll get...
            if(!PLMObj && ParamsCopy.PLM_ExternalID){
                 if (!PLMObj && that._data.PLMExternalID2OXID) {
                     var OXID = that._data.PLMExternalID2OXID[ParamsCopy.PLM_ExternalID];
                     PLMObj = resourceCache[OXID];
                 }
            }

            //if we found it then check for minimum properties
            if(PLMObj){
                if(MinimumProperties && MinimumProperties instanceof Array){
                    var plmObjectContainsMinProperties = function(PLMObj, MinimumProperties){
                        //First check to see if the specified object is an instance or reference.
                        //This can be determined by seeing if the object contains the ReferenceOXID property
                        //(if the object is an instance then this property specifies what it's corresponding reference is)
                        var Result = true;

                        //Loop through the object to determine if it contains the desired properties
                        $.each(MinimumProperties, function(idx, prop){
                            if(Result)
                                Result = PLMObj.hasOwnProperty(prop);
                        });

                        return Result;
                    }

                    //Check that the object contains the properties we care about
                    if(plmObjectContainsMinProperties(PLMObj, MinimumProperties))
                        return PLMObj;
                }
                else if(MinimumProperties == false ||
                        MinimumProperties == 'false' ||
                        MinimumProperties == 'False' ||
                        MinimumProperties == 'FALSE'){
                            if(PLMObj.AllAttributesRetrieved == true)
                                return PLMObj;
                            else
                                return null;

                        }
                else //if no minimum properties were specified then just return what ever we found
                    return PLMObj;

            }

            return null;
        },

        cacheResourcePLMObject: function(PLMObject, AllAttributesRetrieved){
            var that = Infra.Model.Search;
            //Check if the resource cache is created already
            if(!that._data.resource)
                that._data.resource = {}; //if not initialize with an empty object
            var resourceCache = that._data.resource;

            //Check if the physicalid2OXID cache is created already
            if(!that._data.physicalid2OXID) {
                that._data.physicalid2OXID = {}; //if not initialized with an empty object
            }
            var physicalid2OXID = that._data.physicalid2OXID;

            //Check if the PLMExternalID2OXID cache is created already
            if(!that._data.PLMExternalID2OXID) {
                that._data.PLMExternalID2OXID = {}; //if not initialized with an empty object
            }
            var PLMExternalID2OXID = that._data.PLMExternalID2OXID;

           //if the OXID is defined in the the PLM object passed in then try to locate it in the cache
           //If the OXID is not defined then whatever this object is it cannot be cached
            if(PLMObject.OXID){
                if(resourceCache[PLMObject.OXID]){
                    //if it's in the cache then we need to take whats already there and merge it witht he incomping object
                    var merged = $.extend(true, resourceCache[PLMObject.OXID], PLMObject);
                    resourceCache[PLMObject.OXID] = merged;
                }
                else{
                    //if it's not there then we can just put it in the cache
                    resourceCache[PLMObject.OXID] = PLMObject;
                }

                if(AllAttributesRetrieved == true)
                    PLMObject.AllAttributesRetrieved = true;
                else
                    PLMObject.AllAttributesRetrieved = false;

                if(PLMObject.physicalid){
                    if (PLMObject.OXID) {
                        physicalid2OXID[PLMObject.physicalid] = PLMObject.OXID;
                    }
                }

                if(PLMObject.PLM_ExternalID){
                    if (PLMObject.OXID) {
                        PLMExternalID2OXID[PLMObject.PLM_ExternalID] = PLMObject.OXID;
                    }
                }

                // Save the name from either the V_Name or the PLM_ExternalID.  If the name is 'NULL',
                // use the PLM_ExternalID.
                PLMObject.name = PLMObject.V_Name;
                if ( PLMObject.name == '' || PLMObject.name == 'NULL' || PLMObject.name == undefined )
                    PLMObject.name = PLMObject.PLM_ExternalID;
            }

        },

        //Get tree can be used to traverse tree structure. With a depth of 0 specified it can be used to retrieve a single reference object. This also applies to a QueryList
        //A QueryList can be passed in and each item in the list is treated as an individual node with a corresponding depth.
        //Minimum properties can be specified and if those properties exist on the object they will be ensured as part of the results.
        //Get tree can preform queries based on OXID, PLM_ExternalID, or physicalid
        //(if you need geolocation information use get one instead)
        getTree: function(params, success, error){
            var that = Infra.Model.Search;

            //Check the validity of the query if the query isn't valid then call the error callback
            if (!error) {
                error = window.alert;
            }


            require({
                baseUrl: window.Configuration.webappsDir //set in ds_common.js
            },
            // -- Module Dependancies --
                [ 'DS/DELWebInfrastructureControls/DELWebAjaxModel' ], function(DELWebAjaxModel) {
                    DELWebAjaxModel.getTree(params).then(success, error);
                }
            );
        },

        getUnifiedSearchUnserializedDataFromDrop : function (ev) {
            var that = this;
            var e = ev.originalEvent || ev;
            var res = [];

            if (!UWA.is(e)) { steal.dev.warn('ERROR: No dropped item found'); return res; }
            var serializedData = null;
            var unserializedData = null;

            var location_func = UWA.is(e.dataTransfer.types.indexOf, 'function') ? 'indexOf' : 'contains';
            var data_to_retrieve = '';

            var supported_dnd_types = ['text/searchitems', 'text/plain', 'Text'];
            for (var idx = 0; idx < supported_dnd_types.length && data_to_retrieve === ''; idx++) {
                var exists = e.dataTransfer.types[location_func](supported_dnd_types[idx]);
                if ((UWA.is(exists, 'number') && exists >= 0) || (UWA.is(exists, 'boolean') && exists === true)) {
                    data_to_retrieve = supported_dnd_types[idx];
                }
            }

            if ('' === data_to_retrieve) { steal.dev.warn('ERROR: No data retrieved'); return res; }

            serializedData = e.dataTransfer.getData(data_to_retrieve);

            //  Case where an exception is thrown ?
            try { unserializedData = UWA.Json.decode(serializedData); }
            catch (error) { return res; }

            if (!UWA.is(unserializedData)) { steal.dev.warn('ERROR: Parsing returned null'); return res; }
            if (!UWA.is(unserializedData.data)) { steal.dev.warn('ERROR: No data retrieved'); return res; }
            //if (!UWA.is(unserializedData.data.items, 'array')) { steal.dev.warn('ERROR: Items is not an array'); return res; }

            //if the drag and drop did not occur from 3dSearch, but the data format is the same, pretend it came from 3dsearch so all the code stays the same.
            if(!window.widget.getUrl().contains('TSK5358265=0')){ //hide this behind a task number for now
                if('source' in unserializedData && unserializedData.source !== 'X3DSEAR_AP' && that.isDataStructureSameAsSearch(unserializedData)){
                    if (window.OpenAjax && 'dataSource' in unserializedData && unserializedData.dataSource !== 'index') {
                        OpenAjax.hub.publish('UnifiedSearch.Results.setAuthoring', {});
                    }
                    unserializedData.source = 'X3DSEAR_AP';
                } else if (!('source' in unserializedData) && that.isDataStructureSameAsSearch(unserializedData)) {
                    unserializedData.source = 'X3DSEAR_AP';
                }
            }

            return unserializedData;
        },

        getUnifiedSearchUnserializedItemsFromDrop : function (ev) {
            var that = Infra.Model.Search;
            if(!ev || (!ev.originalEvent && !(ev || ev.originalEvent).dataTransfer)) {
                steal.dev.log('Infra.Model.Search::getUnifiedSearchUnserializedItemsFromDrop - invalid input params!');
                return null;
            }
            //var e = ev.originalEvent;
            var res = [];
//
//            if (!UWA.is(e)) { steal.dev.log('ERROR: No dropped item found'); return res; }
//            var serializedData = null;
//            var unserializedData = null;
//
//            var location_func = UWA.is(e.dataTransfer.types.indexOf, 'function') ? 'indexOf' : 'contains';
//            var data_to_retrieve = '';
//
//            var supported_dnd_types = ['text/searchitems', 'text/plain', 'Text'];
//            for (var idx = 0; idx < supported_dnd_types.length && data_to_retrieve === ''; idx++) {
//                var exists = e.dataTransfer.types[location_func](supported_dnd_types[idx]);
//                if ((UWA.is(exists, 'number') && exists >= 0) || (UWA.is(exists, 'boolean') && exists === true)) {
//                    data_to_retrieve = supported_dnd_types[idx];
//                }
//            }
//
//            if ('' === data_to_retrieve) { steal.dev.log('ERROR: No data retrieved'); return res; }
//
//            serializedData = e.dataTransfer.getData(data_to_retrieve);

            //  Case where an exception is thrown ?
            //try { unserializedData = UWA.Json.decode(serializedData); }
            var unserializedData = null;
            try { unserializedData = that.getUnifiedSearchUnserializedDataFromDrop(ev); }
            catch (error) { return res; }

            if (!UWA.is(unserializedData)) { steal.dev.log('ERROR: Parsing returned null'); return res; }
            if (unserializedData.source !== "X3DSEAR_AP") {steal.dev.log('Infra.Model.Search::getUnifiedSearchUnserializedItemsFromDrop - not unified search'); return null; }
            if (!UWA.is(unserializedData.data)) { steal.dev.log('ERROR: No data retrieved'); return res; }
            if (!UWA.is(unserializedData.data.items, 'array')) { steal.dev.log('ERROR: Items is not an array'); return res; }

            if (unserializedData.data.items.length > 0) {
                res = unserializedData.data.items;
                /*var obj = unserializedData.data.items[0];
                if (obj && obj.objectId) {
                    return obj;
                }*/
            }
            return res;
        },

        getUnifiedSearchObjectsFromDrop: function(params, success, error) {
            var that = Infra.Model.Search;
            if (!error) {
                error = window.alert;
            }
            if(!params || !params.ev) {
                steal.dev.log('Infra.Model.Search::getUnifiedSearchObjects - invalid input params!');
                if(error) { error('Infra.Model.Search::getUnifiedSearchObjects - invalid input params!')};
                return false;
            }

            var ev = params.ev;

            var objlist = that.getUnifiedSearchUnserializedItemsFromDrop(ev);
            if (objlist && objlist.length) {
                var getTreeQueryParams = {};
                getTreeQueryParams.Minimum = 'false'; //get all attributes
                getTreeQueryParams.QueryList = []; //create empty query list so as to add items to it
                var getSearchItemsReturnObj = {};

                for (var kk = 0; kk < objlist.length; kk++) {
                    var obj = objlist[kk];
                    //if it's a VPMReference, then we can query for the resource details. Otherwise, just save what we have.
                    if (obj.objectId && obj.objectType && obj.objectType === 'VPMReference') {
                        var newObj = { 'physicalid': obj.objectId, 'Depth': 0 };
                        getTreeQueryParams.QueryList.push(newObj);
                    } else if (obj.objectId){
                        var currentobj = {
                            name: obj.displayName,
                            type: obj.objectType,
                            objectType: obj.objectType,
                            serviceId: obj.serviceId,
                            id: obj.objectId,
                            physicalid: obj.objectId
                        };
                        getSearchItemsReturnObj[obj.objectId] = currentobj;
                    }
                }

                if (getTreeQueryParams.QueryList.length >0){
                    that.getTree(getTreeQueryParams, function(objReturn){
                        //combine the getTree return with the getSearchItemsReturnObj return
                        $.each(objReturn, function(objReturnIdx, objReturnObj){
                            getSearchItemsReturnObj[objReturnIdx] = objReturnObj;
                        });
                        success(getSearchItemsReturnObj);
                    }, error);
                } else {
                    success(getSearchItemsReturnObj);
                }
            } else if (!objlist) {
                if (error && (error !== window.alert)) {
                    error('Unknown source type');
                }
                return; //usually a drag/drop from a WebUX list.  In any event, this isn't a unified search drop
            } else {
                if(error) {
                    error('Invalid Parameters!');
                    return;
                }
            }
        },

        commonAjaxJsonResponseOK: function (data, textStatus, jqXHR, error) {
            var rootJson = data;
            if (rootJson.Root) {
                rootJson = rootJson.Root;
            }

            if (!rootJson.auth) {
                var msg = (rootJson.msg && rootJson.msg.text) ? rootJson.msg.text : '';
                if (msg) {
                    if (error) error('Invalid auth: ' + msg);
                } else {
                    if (error) error('Invalid auth');
                }
                steal.dev.log('Invalid auth: ' + msg);
                if (rootJson.msg && rootJson.msg.details) {
                    steal.dev.log('-- Details: ' + rootJson.msg.details);
                }
                if (window.OpenAjax) {
                    OpenAjax.hub.publish('Auth.LoginRequired');
                }
                return false;
            } else if (!rootJson.license) {
                var msg = (rootJson.msg && rootJson.msg.text) ? rootJson.msg.text : '';
                if (msg) {
                    if (error) error(msg, { type: 'license' });
                } else {
                    if (error) {
                        if ($.t) {
                            error($.t('Valid License Required'), { type: 'license' });
                        } else {
                            //during production builds, we may have to wait for the translation plugin to be loaded
                            error('Valid License Required', { type: 'license' });
                        }
                    }
                }
                steal.dev.log('License Check error: ' + msg);
                if (rootJson.msg && rootJson.msg.details) {
                    steal.dev.log('-- Details: ' + rootJson.msg.details);
                }

                if (window.OpenAjax) {
                    OpenAjax.hub.publish('Auth.LicenseRequired');
                }
                return false;
            } else if (rootJson.msg && (rootJson.msg.type != 'success')) {
                var msg = (rootJson.msg && rootJson.msg.text) ? rootJson.msg.text : '';
                var type = (rootJson.msg && rootJson.msg.type) ? rootJson.msg.type : '';
                if (type == 'warning')
                    type = 'notice';
                if (msg) {
                    if (error) error(msg);
                } else {
                    if (error) error('Infra.Model.Search.commonAjaxJsonResponseOK :' + type);
                }
                steal.dev.log('Error: ' + msg);
                if (rootJson.msg && rootJson.msg.details) {
                    steal.dev.log('-- Details: ' + rootJson.msg.details);
                }
                return false;
            }

            return true;
        },

        commonAjaxErrorHandler: function (jqXHR, textStatus, errorThrown, errorCallBack) {
            if (!errorCallBack) {
                errorCallBack = window.alert;
            }

            var blnShowError = (textStatus.indexOf('abort') < 0);
            if (jqXHR.status == 504) { //504 == Gateway Timeout, which often happens when routing through a proxy like on the dashboard
                blnShowError = false; //see DELWebInfrastructure\DELWebInfrastructure.mwebext\src\DSCommon\src\gateway_timeout.js
            } else if (jqXHR.responseText && (jqXHR.responseText.indexOf('{') == 0)) {
                //this looks like a json object!  Try to parse it
                try {
                    var objError = JSON.parse(jqXHR.responseText);
                    if (objError && objError.error && (objError.error == 'invalid_grant')) {
                        //just do the authentication check, which SHOULD fail
                        var commonOK = Infra.Model.Search.commonAjaxJsonResponseOK(objError, textStatus, jqXHR, errorCallBack);
                    }
                    if (objError.error_description) {
                        errorThrown = objError.error_description;
                    }
                } catch (e) {
                    //nope.  Some sort of problem
                }
            }

            if (blnShowError && errorCallBack) { //no point in showing the message if we intentionally aborted the request!
                errorCallBack('error request: ' + errorThrown);
            }
        },

        //this checks if the data structure is the same as it would be if it came from search, no matter what the source is.
        isDataStructureSameAsSearch: function(unserializedData){
            return($.isPlainObject(unserializedData) && unserializedData.protocol === '3DXContent' &&
                'data' in unserializedData && $.isPlainObject(unserializedData.data) &&
                'items' in unserializedData.data && $.isArray(unserializedData.data.items) && unserializedData.data.items.length > 0);
        }
    },
    {}
  );
});
