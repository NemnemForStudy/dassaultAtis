'use strict';

/*global Promise console widget sessionStorage window*/
/*jslint plusplus: true*/
define('DS/FedDictionaryAccess/FedDicoUtils',
  ['UWA/Core',
   'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
   'text!DS/FedDictionaryAccess/assets/FedDicoSettings.json'],

  function (Core, PlatformServices, DicoSettings) {


    // private data
    var _3DExpPatformServices = [];
    var _RDFPilar = '';
    var _RDFPPVersion = 'v0';
    var _hardcodedURL = '';
    var _myAppsConfig = {};
    var _dicoSettings = {};

    var dicoUtils = {

      /* getPlatformServices() Returns:
       [{ "platformId": "R1132100081733",
        "displayName": " R1132100081733-US-West",
        "3DSpace": "https://R1132100081733-eu1-417nbl0718-3dspace.3dexperience.3ds.com/3DSpace",
        "3DPassport": "https://iam.ppd.3ds.com",
        "usersgroup": "https://R1132100081733-eu1-417nbl0718-usersgroup.3dexperience.3ds.com"
        }, ... ]
       */
      dicoElemsBaseKey: 'dicoElements_',

      dicoPropValuesBaseKey: 'dicoPropValues_',

      dicoPropRootsBaseKey: 'dicoPropRoots',

      dicoExtensionsBaseKey: 'dicoExtensions',

      initSrvRequest: function () {
        _dicoSettings = JSON.parse(DicoSettings);
        var ontoService = _dicoSettings.CloudOntologyService;
        _RDFPilar = _dicoSettings.RDFPilar;
        _RDFPPVersion = _dicoSettings.RDFPPVersion;
        _hardcodedURL = _dicoSettings.RDFServerURL;

        if (!_RDFPilar){
          _RDFPilar = '3drdfpersist';
        }
        if (!_RDFPPVersion){
          _RDFPPVersion = 'v0';
        }
        PlatformServices.getPlatformServices(
          {
            config: _myAppsConfig,
            onComplete: function (data) {
              // dicoUtils.setPatformServices(data); //
              _3DExpPatformServices = data;
              if (data && data.length === 1 && data[0].platformId === 'OnPremise' && !_hardcodedURL) {
                ontoService = '3DSpace';
              }
            },

            onFailure: function () {
              //console.error('Call to PlatformServices.getPlatformServices failed : ' + data);
            }
          });
        return ontoService;
      },

      setMyAppsConfig: function(options){
        _myAppsConfig = {};
        _myAppsConfig.myAppsBaseUrl = options.myAppsBaseUrl;
        _myAppsConfig.userId = options.userId;
        _myAppsConfig.lang = options.lang;
      },

      isWithoutAuth: function(){
        var dicoSettings = JSON.parse(DicoSettings);
        if (dicoSettings.isRDFWithAuth && dicoSettings.isRDFWithAuth === 'false'){
          return true;
        }
        return false;
      },

      isRDFOnER: function (options) {
        if (options.tenantId === 'OnPremise' && options.OnPremiseWith3DRDF === 'true'){
          //console.log('*** INFO: E4All Environment: RDF on RDFKernel!');
          return false;
        }

        if (options.tenantId && options.tenantId.startsWith('ODTService@') && options.OnPremiseWith3DRDF === 'true'){
          //console.log('*** INFO: ODT Environment: RDF on RDFKernel!');
          return false;
        }

        // SGA5: Separate activation of RDF usage for RDF-apps and for 3DSearch
        if (options.serviceName && this.isRDFService(options.serviceName)){
          //console.log('*** INFO: Forced RDF-based service usage: RDF on RDFKernel!');
          return false;
        }

        if (_dicoSettings.RDFFedVocabulariesOn3DSpace === 'true' || options.tenantId === 'OnPremise') {
            //console.log('*** INFO: RDF on 3DSpace.');
            return true;
        }
        return false;
      },

      getServiceBaseURLPromise: function(service, tenantId, option, pillar) {
        var that = this;
        return new Promise(function(resolve, reject){
          var url;
          if (option && option.startsWith('ODTService@')) {
            if (service === '3DSpace'){
              resolve(option.substring(11) + '/resources/6WVocab/access/');
            } else {
              resolve(option.substring(11) + 'v0/invoke/');
            }
          }
          else if (!_3DExpPatformServices || _3DExpPatformServices.length === 0){
            PlatformServices.getPlatformServices(
              {
                config: _myAppsConfig,

                onComplete: function (data) {
                  _3DExpPatformServices = data;
                  if (_3DExpPatformServices !== undefined){
                    url = that.getServiceBaseURL(service, tenantId, option, pillar);
                    if (typeof url === 'undefined'){
                      console.error('URL cannot be computed');
                      return reject(new Error('URL cannot be computed'));
                    }
                    return resolve(url);
                  } else {
                    console.error(new Error('PlatformServices.getPlatformServices returned an empty result'));
                    return reject(data);
                  }
                },

                onFailure: function (data) {
                  console.error(new Error('Call to PlatformServices.getPlatformServices failed: ' + data));
                  return reject(data);
                }
              });
          } else {
            url = that.getServiceBaseURL(service, tenantId, option, pillar);
            if (typeof url !== 'undefined'){
              return resolve(url);
            } else {
              return reject(new Error('Cannot find URL from MyApps and no hardcoded URL neither'));
            }
          }
        });
      },

      getServiceBaseURL: function (service, tenantId, option, pillar) {
        if (tenantId === null){
          console.warn('*** Warning: tenant id not specified by caller!');
        }
        var srvURL;
        // for 3DSwym service reroute web service calls to 3DSpace, as federated vocabularies are not stored in 3DSwym
        if (service==='3DSwym') {
          service = '3DSpace';
        }
        for (var i = 0; i < _3DExpPatformServices.length; i++) {
          if (_3DExpPatformServices[i].platformId === tenantId) {
            srvURL = _3DExpPatformServices[i][service];
            if (typeof srvURL === 'undefined' && service === '3DSpace') {
              console.warn('*** Warning: Service 3DSpace not available, consider 6WTag for BI.');
              // if 3DSpace URL not returned, on cloud use 3DDrive and onpremise 6WTags
              if (tenantId === 'OnPremise'){
                srvURL = _3DExpPatformServices[i]['6WTags'];
              }
              else {
                srvURL = _3DExpPatformServices[i]['3DDrive'];
              }
            }
            // SGA5: check if RDF service, in this case return srvURL with pilar
            else if (typeof srvURL !== 'undefined' && tenantId !== 'OnPremise' && this.isRDFService(service)){
              if (!pillar){
                pillar = _RDFPilar;
                if (service === '3dplan'){
                  pillar = '';
                }
              }
              var pillarString = '';
              if (pillar !== undefined && pillar !== ''){
                pillarString = '/' + pillar;
              }

              return srvURL + pillarString + '/' + _RDFPPVersion + '/invoke/';
            }
            if (typeof srvURL === 'undefined'){
              console.warn('*** Warning: Service not available: ' + service);
            }
            break;
          }
        }
        if (srvURL === null || (typeof srvURL === 'undefined')) {
          console.warn('*** Warning: Tenant or service not recognized by 3DCompass: ' + tenantId + '|' + service);
          // Workaround for OnPremise (E4A env.)
          for (var p in _3DExpPatformServices) {
            if (_3DExpPatformServices[p].platformId === 'OnPremise') {
              if (option) {
                srvURL = option;
                _3DExpPatformServices[p][service] = option;
              }
              else if (_hardcodedURL){
                srvURL = _hardcodedURL;
                _3DExpPatformServices[p][service] = _hardcodedURL;
              }
              // 3DSpace URL should be retrieved
              else if (service !== '3DSpace') {
                srvURL = _3DExpPatformServices[p]['3DSpace'];
                _3DExpPatformServices[p][service] = srvURL;
              }
              break;
            }
          }
        }
        if (typeof srvURL !== 'undefined' && !this.isRDFService(service)){
          srvURL = srvURL + '/resources/6WVocab/access/';
        }
        return srvURL;
      },

      isRDFService: function (service){
        var serviceSettings = _dicoSettings.Services[service];
        if (!serviceSettings){
          // service is not defined, by default all calls should be redirected to federated service (3DSpace)
          return false;
        }
        if (serviceSettings.persistency === 'RDF'){
          return true;
        }
        return false;
      },

      getServiceToSearchIn: function(services, options){
        // default value for any source
        var source = '3DSpace';
        if (!this.isRDFOnER(options)) {
          source = DicoSettings.CloudOntologyService;
        }
        var servicesSettings = _dicoSettings.Services;
        var service, serviceSettings, federatedSource;
        var allRDF = true, i;

        // nominal case
        if (services.length === 1){
          service = services[0];
          serviceSettings = servicesSettings[service];
          if (!serviceSettings || serviceSettings.federatedOn === 'FEDERATED_SERVICE'){
            // service is not defined, by default all calls should be redirected to federated service (3DSpace)
            return source;
          }
          federatedSource = serviceSettings.federatedOn;
          if (!federatedSource){
            // by default search in the same service
            if (serviceSettings.serviceName){
              return serviceSettings.serviceName;
            }
            return service;
          }
          // if set, search in federated source as defined in the settings.
          return federatedSource;
        }

        // strange case: need to retrieve 1 service to search in for a list of services
        for (i=0; i<service.length; i++){
          // at least one of the sources is the federated one (e.g. 3DSpace) --> search in default service
          federatedSource = servicesSettings[service].federatedOn;
          if (servicesSettings[service] && ( federatedSource === source || federatedSource === 'FEDERATED_SERVICE')){
            return source;
          }
          if (allRDF && !this.isRDFService(service[i])){
            allRDF = false;
          }
        }
        // if only RDF services --> pick the first one
        if (allRDF){
          return service[i];
        }
        // if heterogeous services --> search in default one
        else {
          return source;
        }
      },

      formatRDFResponse : function (arrayToFormat) {
        if (arrayToFormat.member){
          return arrayToFormat.member;
        }
        return arrayToFormat;
      },

      formatRDFInput : function(stringToFormat, toArray) {
        try {
          stringToFormat = JSON.parse(stringToFormat);
          if (toArray){
            return JSON.stringify([stringToFormat]);
          }
          return JSON.stringify(stringToFormat);
        }
        catch (e) {
          var inArray = stringToFormat.split(',');
          if (toArray){
            return JSON.stringify([inArray]);
          }
          return JSON.stringify(inArray);
        }
      },

      getLanguage : function(cbFuncs){
        var language = '';
        if (Core.is(cbFuncs.lang, 'string')){
          language = cbFuncs.lang;
        }
        else {
          language = widget.lang;
        }
        return language;
      },

      isPredicateWithFedValues: function(prop){
        var predicates = _dicoSettings.PredicatesWithFederatedValues;
        if (predicates.indexOf(prop) > -1){
          return true;
        }
        return false;
      },

      addServiceSettings: function(service, serviceSettings){
        _dicoSettings.Services[service] = serviceSettings;
      },

      addPropValuesToCache: function(storageName, properties, source){
        if (!window.sessionStorage){
          return;
        }
        var localValues = {};
        var allLocalValues = sessionStorage.getItem(storageName);

        if (!allLocalValues){
          allLocalValues = {};
        }
        else {
          allLocalValues = JSON.parse(allLocalValues);
          if (source){
            if (allLocalValues[source]){
              localValues = allLocalValues[source];
            }
          } else {
            localValues = JSON.parse(allLocalValues);
          }
        }
        localValues = this.mergePropValues(localValues, properties);
        var toCache = {};
        if (source){
          toCache[source]=localValues;
          // add caches of other sources
          for (var s in allLocalValues){
            if (s === source){
              continue;
            }
            toCache[s] = allLocalValues[s];
          }
        } else {
          toCache = localValues;
        }
        sessionStorage.setItem(storageName, JSON.stringify(toCache));
      },

      mergePropValues: function (toBeMergedTo, toMerge){
        if (toMerge && Object.keys(toMerge)){
          for (var propId in toMerge) {
            for (var v in toMerge[propId]) {
              if (!toBeMergedTo.hasOwnProperty(propId)){
                toBeMergedTo[propId] = toMerge[propId];
              }
              toBeMergedTo[propId][v] = toMerge[propId][v];
            }
          }
        }
        return toBeMergedTo;
      },

      /************************************************************
      *   Below are conversion functions for backward compatibility
      ************************************************************/

      /*
        to
         {"vocabularyInfo":[
        {
        "name":"ds6w",
        "namespace":"http://www.3ds.com/vocabularies/ds6w/",
        "description":"This ontology defines the DS Corporate vocabulary for 6W tags",
        "prereqs":[],
        "nlsName":"6W Vocabulary"
        }
       */
      convertToR420Vocabularies: function (data) {
        var retData = { vocabularyInfo: [] };
        if (data === null){
          return retData;
        }
        var vocInfoList = [], vocInfo;
        for (var i in data) {
          vocInfo = {
            name: i,
            namespace: data[i].uri,
            description: data[i].description,
            nlsName: data[i].label
          };
          vocInfoList.push(vocInfo);
        }
        retData.vocabularyInfo = vocInfoList;
        return retData;
      },

      /*
        to
        {
          "ds6w":{
            "curi": "ds6w:",
            "uri": "http://www.3ds.com/vocabularies/ds6w/",
            "label": "6W Vocabulary",
            "description": "This ontology defines the DS Corporate vocabulary for 6W tags."
          },
          "swym":{
            "curi": "swym:",
            "uri": "http://www.3ds.com/vocabularies/swym/",
            "label": "3DSwym Vocabulary",
            "description": "This ontology defines 3DSwym vocabulary for 6W tags."
          }, ...
        }
       */
      convertToR421Vocabularies: function (data) {
        var retData = {};
        if (!data || !data.vocabularyInfo){
          return data;
        }
        data.vocabularyInfo.forEach(function (element){
          retData[element.name] =
            { curi: element.name + ':',
              uri: element.namespace,
              label: element.nlsName,
              description: element.description
            };
        });

        return retData;
      },

      /*
       * From
       * { "vocabularyElementNLSInfo":[
        { "uri":"ds6w:classification",
        "type":"Predicate",
        "nlsName":"Classification",
        "lang":"en",
        "dataType":"string"
        },
         ]
        }
       */
      convertToR420ElementsNls: function (data) {
        var retData = { vocabularyElementNLSInfo: null };
        if (data === null){
           return retData;
        }
        var elemInfoList = [], elemInfo;
        for (var i = 0; i < data.length; i++) {
          elemInfo = {
            uri: data[i].curi,
            type: data[i].metaType,
            nlsName: data[i].label
            //description: data[i].description
          };
          if (data[i].metaType === 'Property' || data[i].metaType === 'Predicate'){
            elemInfo.type = 'Predicate';
			      elemInfo.dataType = data[i].dataType;
          }
          elemInfoList.push(elemInfo);
        }
        retData.vocabularyElementNLSInfo = elemInfoList;
        return retData;
      },

      /*
      {"classPredicates":[
        {
        "className":"ds6wg:PLMEntity",
        "vocabularyPredicateInfo":[
        { "name":"owner",
        "uri":"ds6w:responsible",
        "nlsName":"Responsible",
        "lang":"en",
        "lineage":"ds6w:who/ds6w:responsible",
        "range":
          { "scope":"Range",
          "operator":"Union",
          "classes":[],
          "dataTypes":["http://www.w3.org/2001/XMLSchema#string"]
          },
          "dimension":"",
          "manipulationUnit":""
        },
        ]
        }
        ]
      }
      */
      convertToR420ClassProperties: function (data) {
        var retData = {classPredicates: [] };
        if (data === null){
          return retData;
        }
        var classInfoList = [], classInfo = {};

        data.forEach(function(element){
          // data comes from 3DSpace
          if (element.classPredicates){
            classInfoList = classInfoList.concat(element.classPredicates);
          }
          // data comes from RDF
          else if (Array.isArray(element.member)){
            element.member.forEach(function(info){
              var propInfoList = [];
              for (var i = 0; i < info.properties.totalItems; i++) {
                var propInfo = {
                  // name: info.properties[i].originalName,
                  uri: info.properties.member[i].curi,
                  nlsName: info.properties.member[i].label,
                  description: info.properties.member[i].description,
                  dataType: info.properties.member[i].dataType
                };
                propInfoList.push(propInfo);
              }
              classInfo = {
                className: info.classInfo.curi,
                vocabularyPredicateInfo: propInfoList
              };
              classInfoList.push(classInfo);
            });
          }
        });
        retData.classPredicates = classInfoList;
        return retData;
      },

      /* to
       * {"classInfo":
          {
            curi":"ds6w:Part",
            "uri":"http://www.3ds.com/vocabularies/ds6w/Part",
            "label":"Part"
          },
          "properties":[
            {"curi":"ds6w:status",
            "uri":"http://www.3ds.com/vocabularies/ds6w/status",
            "label":"Etat de maturité",
            "description":"Etat de maturité de l'objet",
            "dataType":"xsd:string",
            "lineage":"ds6w:what"}, --> lineage cannot be retrieved
            ...
          ]
        }
        */
       convertToR421ClassProperties: function (data) {
        if (!data){
          return data;
        }
        var result = [];
        var that = this;

        data.forEach(function(element){
          // data comes from RDF
          if (Array.isArray(element.member)){
            element = that.formatRDFResponse(element);
            element.forEach(function(info){
              if (info.properties) {
                info.properties = that.formatRDFResponse(info.properties);
                info.properties.forEach(function(property) {
                  if (property.originCuri){
                    property.originCuri = that.formatRDFResponse(property.originCuri);
                  }
                });
              }
              result.push(info);
            });
          }
          // data comes from 3DSpace
          else if (element.classPredicates) {
            element.classPredicates.forEach(function(classPredicates){
              var retData = {classInfo: {}, properties:[]};
              if (classPredicates.className){
                retData.classInfo = {
                  curi: classPredicates.className,
                  uri: 'http://www.3ds.com/vocabularies/' + classPredicates.className.replace(':', '/')
                };
              }
              if (classPredicates.vocabularyPredicateInfo){
                classPredicates.vocabularyPredicateInfo.forEach(function (info){
                  var retObj = {
                    curi : info.uri,
                    uri : 'http://www.3ds.com/vocabularies/' + info.uri.replace(':','/'),
                    label : info.nlsName,
                    description : info.nlsName,
                    dataType: info.range.dataTypes[0],
                    dimension: info.dimension,
                    manipulationUnit: info.manipulationUnit,
                    originCuri: 'ds6wg:' + info.name
                    //lineage: info.lineage
                  };
                  //IR-671556 rangeValues are used by AdvancedSearch and should be returned
                  if (info.rangeValues && info.rangeValues.literalInfo){
                    retObj.rangeValues = info.rangeValues.literalInfo;
                  }
                  // SGA5: add information for 3DSpace apps that need mapping to mql attributes
                  if (info.nature){
                    retObj.nature = info.nature;
                  }
                  if (info.selectable){
                    retObj.selectable = info.selectable;
                  }
                  // SGA5 27/07/21 IR-859905: retrieve userAccess information (e.g. "ReadOnly")
                  if (info.userAccess){
                    retObj.userAccess = info.userAccess;
                  }
                  retData.properties.push(retObj);
                });
              }
              result.push(retData);
            });
          }
        });
        return result;
      },

      /* From
      {"vocabularyInfo":
         { "name":"ds6w",
         "prereqs":[]
         },
         "vocabularyClassInfo":[
         { "name":"http://www.3ds.com/vocabularies/ds6w/Change",
         "type":"Class",
         "description":"Change",
         "uri":"ds6w:Change",
         "parentUri":"",
         "nlsName":"Change",
         "abstract":false
        }
        ]
       */
      convertToR420VocClasses: function (data) {
        var retData = null;
        if (data === null){
          return retData;
        }
        var vocInfo = {};
        var classInfoList = [], classInfo;
        for (var i = 0; i < data.classes.totalItems; i++) {
          classInfo = {
            name: data.classes.member[i].uri,
            uri: data.classes.member[i].curi,
            nlsName: data.classes.member[i].label,
            description: data.classes.member[i].description
          };
          classInfoList[i] = classInfo;
        }
        vocInfo = {
          name: data.vocabularyInfo.curi.split(':')[0],
          uri: data.vocabularyInfo.curi,
          namespace: data.vocabularyInfo.uri
        };

        retData = {
          vocabularyInfo: vocInfo,
          vocabularyClassInfo: classInfoList
        };
        return retData;
      },

      /* to
       * {"vocabularyInfo":
          {
            "curi":"ds6w:",
            "uri":"http://www.3ds.com/vocabularies/ds6w/"
          },
          "classes":[
            {
            "curi":"ds6w:Classification",
            "uri":"http://www.3ds.com/vocabularies/ds6w/Classification",
            "label":"Classification",
            "description":"Classification"
            },
            ...
          ]
        }
        */
       convertToR421VocClasses: function (data) {
        if (!data || !data.vocabularyInfo){
         return data;
        }
        var retData = {vocabularyInfo : {}, classes: []};

        retData.vocabularyInfo = {
          curi: data.vocabularyInfo.name + ':',
          uri: 'http://www.3ds.com/vocabularies/' + data.vocabularyInfo.name + '/'
        };

        if (data.vocabularyClassInfo){
          data.vocabularyClassInfo.forEach(function (element){
            retData.classes.push({
              curi : element.uri,
              uri : 'http://www.3ds.com/vocabularies/' + element.uri.replace(':', '/'),
              label : element.nlsName,
              description : element.description
            });
          });
        }

       return retData;
     },

      /* to
       * {"vocabularyInfo":
        {
        "name":"ds6w",
        "prereqs":[]
        },
        "vocabularyElementNLSInfo":[
          {
          "uri":"ds6w:releaseType","
          type":"Predicate",
          "nlsName":"Release Type",
          "lang":"en"
          }
          ...
        ]
        }
        */
      convertToR420VocProperties: function (data) {
        var retData = {};
        if (data === null){
          return retData;
        }
        var vocInfo = {};
        var propInfoList = [], propInfo;
        for (var i = 0; i < data.properties.totalItems; i++) {
          propInfo = {
            uri: data.properties.member[i].curi,
            nlsName: data.properties.member[i].label
          };
          propInfoList[i] = propInfo;
        }
        vocInfo = {
          name: data.vocabularyInfo.curi.split(':')[0],
          uri: data.vocabularyInfo.curi,
          namespace: data.vocabularyInfo.uri
        };

        retData = {
          vocabularyInfo: vocInfo,
          vocabularyElementNLSInfo: propInfoList
        };
        return retData;
      },

      /* to
       * {"vocabularyInfo":
          {
            "curi":"ds6w:",
            "uri":"http://www.3ds.com/vocabularies/ds6w/"
          },
          "properties":[
            {
            "curi":"ds6w:constituent",
            "uri":"http://www.3ds.com/vocabularies/ds6w/constituent",
            "label":"Constituent",
            "description":"Constituent"
            },
            ...
          ]
        }
        */
      convertToR421VocProperties: function (data) {
        if (!data || !data.vocabularyInfo){
          return data;
        }
        var retData = { vocabularyInfo : {}, properties: []};

        retData.vocabularyInfo = {
          curi: data.vocabularyInfo.name + ':',
          uri: 'http://www.3ds.com/vocabularies/' + data.vocabularyInfo.name + '/'
        };

        if (data.vocabularyElementNLSInfo){
          data.vocabularyElementNLSInfo.forEach(function (element){
            retData.properties.push({
              curi : element.uri,
              uri : 'http://www.3ds.com/vocabularies/' + element.uri.replace(':', '/'),
              label : element.nlsName,
              description : element.nlsName
            });
          });
        }

        return retData;
      },

      /* from
        { "literalInfo": [
        {
         "value": "FR",
         "nlsvalue": "France"
        },
        {
         "value": "GR",
         "nlsvalue": "Greece"
        }
        ]
        "individualInfo": []
        }
        */
      convertToR420RangeValues: function (data) {
        var retData = {};
        if (data === null){
          return retData;
        }
        var valList = [], val;
        for (var i = 0; i < data.values.totalItems; i++) {
          val = {
            value: data.values.member[i].value,
            nlsvalue: data.values.member[i].nlsValue
          };
          valList[i] = val;
        }

        retData.literalInfo = valList;
        return retData;
      },

      /* to
        {
          "propertyInfo":
            {"curi":"ds6w:jobStatus","uri":"http://www.3ds.com/vocabularies/ds6w/jobStatus","label":"Statut d'une tâche planifiée"},
          "values":[
            {"value":"swym_media_error","nlsValue":"Erreur"},
            {"value":"swym_media_non_processed","nlsValue":"Non traite"},
            {"value":"swym_media_processed","nlsValue":"Traite"},
            {"value":"swym_media_processing","nlsValue":"En cours de traitement"},
            {"value":"swym_media_ready_to_process","nlsValue":"Pret pour traitement"}
          ]
        }
        */
      convertToR421RangeValues: function (data) {
        var retData = {propertyInfo : {}, values: []};

        if (!data || !data.literalInfo){
          return retData;
        }
        retData.values = data.literalInfo;
        return retData;
      }
    };

    return dicoUtils;
  });

'use strict';

define('DS/FedDictionaryAccess/RequestUtils',
      ['DS/WAFData/WAFData'],
function (WAFData){

  var requestUtils = {

    sendRequest: function(iURL, iOptions, iWithoutAuth){
      if (!iURL){
        return;
      }
      if (!iOptions){
        iOptions = {};
      }
      if (iWithoutAuth){
        WAFData.proxifiedRequest(iURL, iOptions);
      }
      else {
        WAFData.authenticatedRequest(iURL, iOptions);
      }
    }
  };
  return requestUtils;
});

/*global sessionStorage Promise console widget*/

'use strict';

define('DS/FedDictionaryAccess/FedDictionaryAccessRDF',
  ['UWA/Core',
    'DS/FedDictionaryAccess/FedDicoUtils',
    'DS/FedDictionaryAccess/RequestUtils'],

  function (Core, DicoUtils, RequestUtils) {

    var dicoReadAPI = {

      getVocabularies: function (iService, cbFuncs) {
        return new Promise(function(resolve, reject){
          DicoUtils.getServiceBaseURLPromise(iService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            //var fullURL = url +  "dsbase:getFedVocabularies?tenantId="+cbFuncs.tenantId;
            // SGA5 to retrieve vocabularies call a GET web service and not an invoke one
            // SGA5 remove dsbase:hidden filter
            url = url.replace('invoke','classes');
            //var fullURL = url +  'owl:Ontology?$mask=dsbase:Mask.Vocabulary&$where=' + encodeURIComponent('?x WHERE {?x ds6w:forFederation "true"^^xsd:boolean . FILTER NOT EXISTS {?x dsbase:hidden "true"^^xsd:boolean}}');
            var fullURL = url +  'owl:Ontology?$mask=dsbase:Mask.Vocabulary&$where=' + encodeURIComponent('?x WHERE {?x ds6w:forFederation "true"^^xsd:boolean }');

            if (cbFuncs.view === 'public'){
              //fullURL = url +  'owl:Ontology?$mask=dsbase:Mask.Vocabulary&$where=' + encodeURIComponent('?x WHERE {FILTER NOT EXISTS {?x dsbase:hidden "true"^^xsd:boolean}}');
              fullURL = url +  'owl:Ontology?$mask=dsbase:Mask.Vocabulary';
            }

            RequestUtils.sendRequest(fullURL, {
              headers : {
                Accept : 'application/json'
              },
              method : 'GET',
              proxy : 'passport',
              onComplete : function(data) {
                var jsRes = JSON.parse(data);
                var result = {};
                var tempRes = jsRes.member;
                var context = jsRes['@context'];
                if (tempRes){
                  tempRes.forEach(function(item){
                    var _curi = item['@id'];
                    var vocab = _curi.substring(0, _curi.length - 1);
                    var _uri = context[vocab];
                    var _label = item['dskern:nlsLabel'];
                    if (!_label){
                      _label = item['rdfs:label'];
                    }
                    var _description = item['dskern:nlsComment'];
                    if (!_description){
                      _description = item['rdfs:comment'];
                    }

                    result[vocab] = {
                      curi: _curi,
                      uri: _uri,
                      label: _label,
                      description: _description,
                      version: item['owl:versionInfo'],
                      custom: item['dsbase:customMade']
                    };
                  });
                }
                if (cbFuncs.apiVersion!=='R2019x'){
                  result = DicoUtils.convertToR420Vocabularies(result);
                }
                resolve(result);
              },
              onFailure : function(data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getResourcesInfo: function(iService, cbFuncs, iElements){
        return new Promise(function(resolve, reject){
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url +  'dsbase:getResourcesInfo?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = cbFuncs.lang;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            var language = 'en';
            if (Core.is(cbFuncs.lang, 'string')){
               language = cbFuncs.lang;
            }
            var storageName = DicoUtils.dicoElemsBaseKey + language;
            var localValues = sessionStorage.getItem(storageName);
            if (!localValues){
              localValues = {};
            }
            else {
              localValues = JSON.parse(localValues);
            }

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 40000,
              data: DicoUtils.formatRDFInput(iElements.toString(), true),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'].member;
                  var i = 0;
                  for (; result[i];) {
                    localValues[result[i].curi] = result[i];
                    i++;
                  }
                  i = 0;

                  sessionStorage.setItem(storageName, JSON.stringify(localValues));

                  if (cbFuncs.apiVersion !== 'R2019x'){
                    result = DicoUtils.convertToR420ElementsNls(result);
                  }

                  resolve(result);

                }
                catch (e) {
                  console.warn('*** Warning: server returned empty result ***');
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getPropertiesForClasses: function(iService, cbFuncs, iClasses){
        return new Promise(function(resolve, reject){
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var language = 'en';
            if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
              language = cbFuncs.lang;
            }
            var fullURL = url + 'dsbase:getPropertiesForClass?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 30000,
              data: DicoUtils.formatRDFInput(iClasses.toString(), true),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  resolve(result);
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty or incorrect result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                  reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getPropertiesForTemplates: function(iService, cbFuncs, iTemplates){
        return new Promise(function(resolve, reject){
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          var searchableParam = true;
          if (cbFuncs.view === 'public'){
            searchableParam = false;
          }

          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var language = 'en';
            if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
              language = cbFuncs.lang;
            }
            var fullURL = url + 'dsbase:getPropertiesForExtensions?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 40000,
              data: JSON.stringify([iTemplates, searchableParam]),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  resolve(result);
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty or incorrect result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                  reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getVocabularyProperties: function (iService, cbFuncs, iVocUri) {
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }
          else if (widget) {
            language = widget.lang;
          }

          var searchableParam = true;
          if (cbFuncs.view === 'public'){
            searchableParam = false;
          }

          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url + 'dsbase:getVocabularyProperties?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 40000,
              //data: DicoUtils.formatRDFInput(iVocUri),
              data: JSON.stringify([iVocUri, searchableParam]),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  if (cbFuncs.apiVersion !== 'R2019x'){
                    result = DicoUtils.convertToR420VocProperties(result);
                  }
                  else {
                    if (result.properties){
                      result.properties = DicoUtils.formatRDFResponse(result.properties);
                      result.properties.forEach(function(property){
                        if (property.originCuri){
                          property.originCuri = DicoUtils.formatRDFResponse(property.originCuri);
                        }
                      });
                    }
                  }
                  resolve(result);
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty result ***');
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getVocabularyClasses: function (iService, cbFuncs, iVocUri) {
        var language = 'en';
        if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
          language = cbFuncs.lang;
        }
        else if (widget) {
          language = widget.lang;
        }

        if (!iVocUri || iVocUri.startsWith('ds6wg')){
          return;
        }

        // both public and search-based classes must be defined as searchable
        var searchableParam = true;

        return new Promise(function(resolve, reject){
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url + 'dsbase:getVocabularyClasses?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              data: JSON.stringify([iVocUri, searchableParam]),
              headers: headers,
              timeout: 40000,
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  if (cbFuncs.apiVersion !== 'R2019x') {
                    result = DicoUtils.convertToR420VocClasses(result);
                  }
                  else {
                    if (result.classes){
                      result.classes = DicoUtils.formatRDFResponse(result.classes);
                    }
                  }
                  resolve(result);
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getNlsOfPropertyValues: function (iService, cbFuncs, iElements) {
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string')){
            language = cbFuncs.lang;
          }
          else if (widget){
            language = widget.lang;
          }

          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url +  'dsbase:getNlsOfPropertyValues?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Content-Type'] = 'application/json';
            headers['Accept-Language'] = language;
            headers['X-Requested-With'] = 'XMLHttpRequest';

            var input = JSON.stringify(iElements);
            RequestUtils.sendRequest(fullURL,
            {
              method: 'POST',
              headers: headers,
              timeout: 30000,
              data: JSON.stringify([input]),
              onComplete: function (response) {
                var jsRes;
                try {
                  jsRes = JSON.parse(response);
                }
                catch (e){
                  console.warn('*** Warning: server returned empty result ***');
                  return resolve();
                }
                var result = jsRes['@result'];
                if (window.sessionStorage){
                  var storageName = DicoUtils.dicoPropValuesBaseKey + DicoUtils.getLanguage(cbFuncs);
                  DicoUtils.addPropValuesToCache(storageName, result, iService); // add to cache
                }
                return resolve(result);
              },
              onFailure: function (data) {
                return reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getRangeValues: function (iService, cbFuncs, iPropUri) {
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }
          else if (widget) {
            language = widget.lang;
          }
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url +  'dsbase:getRangeValues?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 40000,
              data: DicoUtils.formatRDFInput(iPropUri),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  if (cbFuncs.apiVersion !== 'R2019x') {
                    result = DicoUtils.convertToR420RangeValues(result);
                  }
                  if (result.values){
                    result.values = DicoUtils.formatRDFResponse(result.values);
                  }
                  resolve(result);
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getFedProperties: function (iService, cbFuncs) {
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }
          else if (widget) {
            language = widget.lang;
          }
          var settings = {
            mappable: false,
            forFederation: true,
            searchable: true
          };
          if (cbFuncs.view === 'public'){
            settings.forFederation = false;
            settings.searchable = false;
          }
          // SGA5: IR-619053 Add new parameter mappable to get only mappable properties
          if (cbFuncs.onlyMappable!== undefined && cbFuncs.onlyMappable == true){
            settings.mappable = true;
            settings.forFederation = true;
            settings.searchable = true;
          }

          DicoUtils.getServiceBaseURLPromise(iService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url +  'dsbase:getProperties?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            settings = JSON.stringify(settings);

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 40000,
              data: JSON.stringify([settings]),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  for (var element in result){
                    var val = result[element];
                    if (val.properties){
                      result[element].properties = DicoUtils.formatRDFResponse(val.properties);
                    }
                  }
                  resolve(result);
                } catch (e) {
                  console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getServiceClasses: function(iService, cbFuncs){
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }
          else if (widget) {
            language = widget.lang;
          }

          var searchableParam = true;
          var excludeFederatedParam = true;

          if (cbFuncs.view === 'public'){
            searchableParam = false;
            excludeFederatedParam = false;
          }

          DicoUtils.getServiceBaseURLPromise(iService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url +  'dsbase:getServiceClasses?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 40000,
              data: JSON.stringify([searchableParam, excludeFederatedParam]),
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  result =  DicoUtils.formatRDFResponse(result);
                  result.forEach(function(element){
                    if (element.classes){
                      element.classes = DicoUtils.formatRDFResponse(element.classes);
                    }
                  });
                  /*if (result.vocabularies)
                    result.vocabularies = DicoUtils.formatRDFResponse(result.vocabularies);
                  if (result.classes)
                    result.classes = DicoUtils.formatRDFResponse(result.classes);     */
                  resolve(result);
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty result *** ' +e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getPropertiesRoots: function (iService, cbFuncs, iProps) {
        if (!iProps){
          return;
        }

        return new Promise(function(resolve, reject){
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
            var fullURL = url + 'dsbase:getPropertiesRoots?tenantId=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Content-Type'] = 'application/json';
            headers['X-Requested-With'] = 'XMLHttpRequest';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              data: DicoUtils.formatRDFInput(iProps.toString(), true),
              headers: headers,
              timeout: 40000,
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = jsResp['@result'];
                  resolve(DicoUtils.formatRDFResponse(result));
                }
                catch (e) {
                  console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getClassTemplates: function (iService, cbFuncs, iClassUri) {
        return new Promise(function(resolve, reject){
          var rdfService = iService;
          if (cbFuncs.serviceName){
            rdfService = cbFuncs.serviceName;
          }
          //var retResult = {extensions: []};
          //resolve(retResult);
          // TODO: SGA5 uncomment when templates retrieval will be activated for Advanced Search

          DicoUtils.getServiceBaseURLPromise(rdfService, cbFuncs.tenantId, cbFuncs.RDFServiceURL, cbFuncs.RDFStorage).then(function(url){
           var language = 'en';
           if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
             language = cbFuncs.lang;
           }

           var classURI = iClassUri;

           // retrieve versionned templates too
           var options = {
                            withSuperClasses : true,
                            filters : {
                              //versioned : false
                            },
                         };

           var searchableParam = true;
           if (cbFuncs.view === 'public'){
             searchableParam = false;
           }
           if (searchableParam === true){
             options.filters.searchable = true;
           }

           var fullURL = url + 'dsbase:listTemplates?tenantId=' + cbFuncs.tenantId;
           var headers = {};
           headers['Accept-Language'] = language;
           headers['Content-Type'] = 'application/json';
           headers['X-Requested-With'] = 'XMLHttpRequest';

           RequestUtils.sendRequest(fullURL, {
             method: 'POST',
             type: 'json',
             headers: headers,
             timeout: 30000,
             data: JSON.stringify([classURI, JSON.stringify(options)]),
             onComplete: function (response) {
              var results = [];
              var retResult = {extensions: []};
               try {
                 if (response !== undefined){
                   var exts = response.member;
                   var prefixes = response['@context'];
                   for (var i= 0; i< exts.length; i++){
                     var ext = exts[i];
                     var _curi = ext['@id'];
                     if (_curi !== undefined) {
                      var prefix = _curi.substring(0, _curi.indexOf(':'));
                      var suffix = _curi.substring(_curi.indexOf(':')+1);
                      var _uri = prefixes[prefix] + suffix;
                      var result = {curi: _curi, uri: _uri, label: ext.label};
                      results.push(result);
                     }
                   }
                 }
                 retResult.extensions = results;
                 resolve(retResult);
               }
               catch (e) {
                 console.warn('*** Warning: server returned empty or incorrect result *** ' + e);
                 resolve(retResult);
               }
             },
             onFailure: function (data) {
                 reject(data);
             }
           }, DicoUtils.isWithoutAuth());
          },
          function(errMessage){
            reject(errMessage);
          });
         });
      }
    };
    return dicoReadAPI;
});

/*global sessionStorage Promise console*/

'use strict';

define('DS/FedDictionaryAccess/FedDictionaryAccess3DSpace',
  ['UWA/Core',
    'DS/FedDictionaryAccess/FedDicoUtils',
    'DS/FedDictionaryAccess/RequestUtils'],

  function (Core, DicoUtils, RequestUtils) {

    var dicoReadAPI = {

      defaultERService: '3DSpace',

      getVocabularies: function(cbFuncs){
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }

        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }

          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }

          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + 'Vocabularies?filter=ALL&tenant=' + cbFuncs.tenantId;
            var headers = {};

            headers['Accept-Language'] = language;
            headers.Accept = 'application/json';

            RequestUtils.sendRequest(fullURL, {
              method: 'GET',
              headers: headers,
              timeout: 30000,
              onComplete: function (response) {
                var jsResponse = JSON.parse(response);
                if (cbFuncs.apiVersion === 'R2019x'){
                  jsResponse = DicoUtils.convertToR421Vocabularies(jsResponse);
                }
                resolve(jsResponse);
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          }, function(errMessage){
                reject(errMessage);
          });
        });
      },

      getTypeAttributes: function(cbFuncs, iClasses){
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          //console.log("### Retrieving attributes of V6 type... ");
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }

          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }
          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + 'TypeAttributes?tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'text/plain';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              data: iClasses.toString(),
              timeout: 6000,
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  resolve(jsResp);
                }
                catch (e) {
                  //console.warn('*** Warning: server returned empty result ***');
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getPredicates: function (cbFuncs, iClasses) {
        var language = 'en';
        if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
          language = cbFuncs.lang;
        }

        if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
          cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
        }
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          var addExtensions = '&extensions=true';
          if (typeof cbFuncs.extensions !== 'undefined' && cbFuncs.extensions === false) {
            addExtensions = '';
          }
          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
          var fullURL = url + 'Predicates?tenant=' + cbFuncs.tenantId + addExtensions;
          var headers = {};
          headers.Accept = 'application/json';
          headers['Accept-Language'] = language;
          headers['Content-Type'] = 'text/plain';

          RequestUtils.sendRequest(fullURL, {
            method: 'POST',
            headers: headers,
            timeout: 30000,
            data: iClasses.toString(),
            onComplete: function (response) {
              var jsResponse;
              try {
                jsResponse = JSON.parse(response);
                if (cbFuncs.apiVersion === 'R2019x') {
                  jsResponse = DicoUtils.convertToR421ClassProperties([jsResponse]);
                }
              }
              catch (e){
                //console.warn('*** Warning: 3DSpace returned empty result ***');
              }
              finally {
                resolve(jsResponse);
              }
            },
            onFailure: function (data) {
              reject(data);
            }
          });
        },
        function(errMessage){
          reject(errMessage);
        });
      });
      },

      getElementsNLSNames: function (cbFuncs, iElements, has6WPredicates) {
        if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
          cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
        }
        var webservice = 'TermsNls';
        if (has6WPredicates){
          webservice = 'ElementsNLSNames';
        }
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + webservice + '?tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers['Accept-Language'] = cbFuncs.lang;
            headers['Content-Type'] = 'text/plain';
            headers.Accept = 'application/json';

            var language = cbFuncs.lang;
            var storageName = DicoUtils.dicoElemsBaseKey + language;

            var localValues = sessionStorage.getItem(storageName);
            if (!localValues){
              localValues = {};
            }
            else {
              localValues = JSON.parse(localValues);
            }

            var result = [];
            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 30000,
              data: iElements.toString(),
              onComplete: function (response) {
                try {
                  var responseParse = JSON.parse(response);
                  var i = 0, elt, termInfo;
                  for (; responseParse.vocabularyElementNLSInfo[i];) {
                    elt = responseParse.vocabularyElementNLSInfo[i];
                    // convert in new format
                    termInfo = {
                      curi: elt.uri,
                      label: elt.nlsName,
                      metaType: elt.type
                    };
                    if (elt.type === 'Predicate'){
                      termInfo.dataType = elt.dataType;
                    }
                    localValues[elt.uri] = termInfo;
                    // feed result based on new format
                    result.push(termInfo);
                    i++;
                  }
                  sessionStorage.setItem(storageName, JSON.stringify(localValues));
                  if (cbFuncs.apiVersion !== 'R2019x'){
                    result = DicoUtils.convertToR420ElementsNls(result);
                  }
                  resolve(result);
                }
                catch (e) {
                  //console.warn('*** Warning: server returned empty result ***');
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
        },
        function(errMessage){
          reject(errMessage);
        });
      });
      },

      getPredicatesNLSNames: function (cbFuncs, iVocUri) {
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }

          var vocName = iVocUri;
          if (iVocUri.endsWith(':')){
            vocName = iVocUri.slice(0, iVocUri.length - 1);
          }

          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }
          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + 'PredicatesNLSNames?name=' + vocName + '&tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers['Accept-Language'] = language;

            RequestUtils.sendRequest(fullURL, {
              method: 'GET',
              headers: headers,
              timeout: 30000,
              onComplete: function (response) {
                var jsResponse;
                try {
                  jsResponse = JSON.parse(response);
                  if (cbFuncs.apiVersion === 'R2019x') {
                    jsResponse = DicoUtils.convertToR421VocProperties(jsResponse);
                  }
                }
                catch (e){
                  //console.warn('*** Warning: 3DSpace returned empty result ***');
                }
                resolve(jsResponse);
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getVocabularyClasses: function (cbFuncs, iVocUri) {
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }

          var vocName = iVocUri;
          var includeInstancesParam = '';
          if (iVocUri.endsWith(':')){
            vocName = iVocUri.slice(0, iVocUri.length - 1);
          }
          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }
          if (cbFuncs.includeInstances === true){
            includeInstancesParam= '&includeInstances=true';
          }

          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + 'VocabularyClasses?name=' + vocName + '&tenant=' + cbFuncs.tenantId + includeInstancesParam;
            var headers = {};
            headers['Accept-Language'] = language;
            RequestUtils.sendRequest(fullURL, {
              method: 'GET',
              headers: headers,
              timeout: 30000,
              onComplete: function (response) {
                var jsResponse;
                try {
                  jsResponse = JSON.parse(response);
                  if (cbFuncs.apiVersion === 'R2019x') {
                    jsResponse = DicoUtils.convertToR421VocClasses(jsResponse);
                  }
                }
                catch (e){
                  //console.warn('*** Warning: 3DSpace returned empty result ***');
                } finally {
                  resolve(jsResponse);
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      get3DSpaceTypes: function(cbFuncs){
        var ERService = '3DSpace';
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          //console.log("### Retrieving 3DSpace classes... ");
          var withInst = 'false';
          if (cbFuncs.withInstances === true){
            withInst = 'true';
          }
          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0) {
            language = cbFuncs.lang;
          }

          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + '3DSpaceTypes?withInstances=' + withInst + '&tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;

            RequestUtils.sendRequest(fullURL, {
              method: 'GET',
              headers: headers,
              timeout: 60000,
              onComplete: function (response) {
                try {
                  var jsResp = JSON.parse(response);
                  var result = {
                    vocabularyInfo: {
                      curi: jsResp.vocabularyInfo.name + ':',
                      uri: ''
                    },
                    classes: {
                      totalItems: jsResp.vocabularyClassInfo.length,
                      member: []
                    }
                  };
                  var i = 0, elt, classInfo;
                  for (; jsResp.vocabularyClassInfo[i];) {
                    elt = jsResp.vocabularyClassInfo[i];
                    // convert in new format
                    classInfo = {
                      curi: elt.uri,
                      uri: elt.name,
                      label: elt.nlsName,
                      description: elt.description,
                      metaType: elt.type,
                      subClassOf: elt.parentUri
                    };
                    // feed result based on new format
                    result.classes.member.push(classInfo);
                    i++;
                  }
                  if (cbFuncs.apiVersion !== 'R2019x'){ //result = DicoUtils.convertToR420VocClasses(result);
                    resolve(jsResp);
                  }
                  else {
                    resolve(result);
                  }
                }
                catch (e) {
                  //console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getAttributesNlsValues: function (cbFuncs, iElements, has6WPredicates) {
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          var language = 'en';
          var result = {};
          if (Core.is(cbFuncs.lang, 'string')){
            language = cbFuncs.lang;
          }

          var storageName = DicoUtils.dicoPropValuesBaseKey + language;
          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }

          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = '';

            if (has6WPredicates) {
              fullURL = url + 'PredicateValue?tenant=' + cbFuncs.tenantId;
            }
            else {
              fullURL = url + 'AttributeNlsValues?tenant=' + cbFuncs.tenantId;
            }
            var headers = {};
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';

            /*var localValues = sessionStorage.getItem(storageName);
            if (!localValues){
              localValues = {};
            }
            else {
              localValues = JSON.parse(localValues);
            }*/

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 30000,
              data: JSON.stringify(iElements),
              onComplete: function (response) {
                var jsResponse;
                try {
                  jsResponse = JSON.parse(response);
                  var respKeys = Object.keys(jsResponse);
                  var i = 0, uri;
                  for (i = 0; i < respKeys.length; i++) {
                    uri = respKeys[i];
                    /*if (localValues[uri]){
                      localValues[uri] = Object.assign(localValues[uri],jsResponse[uri]);
                    } else {
                      localValues[uri] = jsResponse[uri];
                    }*/
                    result[uri] = jsResponse[uri];
                  }
                  //sessionStorage.setItem(storageName, JSON.stringify(localValues));
                  DicoUtils.addPropValuesToCache(storageName, result, ERService); // add to cache
                  resolve(result);
                }
                catch (e) {
                  //console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve(jsResponse);
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getPredicateRangeValues: function (cbFuncs, iPropUri) {
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        if (Array.isArray(iPropUri)){
          iPropUri = iPropUri.join(',');
        }
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }

          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }

          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + 'PredicateRangeValues?uri=' + iPropUri + '&tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers['Accept-Language'] = language;
            RequestUtils.sendRequest(fullURL, {
              method: 'GET',
              headers: headers,
              timeout: 30000,
              onComplete: function (response) {
                var jsResponse;
                try {
                  jsResponse = JSON.parse(response);
                  if (cbFuncs.apiVersion === 'R2019x') {
                    jsResponse = DicoUtils.convertToR421RangeValues(jsResponse);
                  }
                }
                catch (e){
                  //console.warn('*** Warning: server returned empty result *** ' + e);
                }
                finally {
                  return resolve(jsResponse);
                }
              },
              onFailure: function (data) {
                return reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      get6WPredicates: function (cbFuncs) {
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          var language = 'en';
          var param = '';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }
          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }

          // SGA5: IR-619053 Add new parameter mappable to WS URL
          if (cbFuncs.onlyMappable){
            param = '&mappable=true';
          }

          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + '6WPredicates?tenant=' + cbFuncs.tenantId + param;
            var headers = {};
            headers['Accept-Language'] = language;

            RequestUtils.sendRequest(fullURL, {
              method: 'GET',
              headers: headers,
              timeout: 30000,
              onComplete: function (response) {
                try {
                  var jsResponse = JSON.parse(response);
                  resolve(jsResponse);
                }
                catch (e) {
                  //console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      },

      getPropertiesRoots: function(cbFuncs, iProps){
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          if (!iProps){
            resolve();
          }
          else {DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            var fullURL = url + 'PredicatesRoots?tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers['Content-Type'] = 'application/json';

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              timeout: 30000,
              data: iProps.toString(),
              onComplete: function (response) {
                try {
                  var jsResponse = JSON.parse(response);
                  resolve(jsResponse);
                }
                catch (e) {
                  //console.warn('*** Warning: server returned empty result *** ' + e);
                  resolve();
                }
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });}
        });
      },

      getTypeInterfaces: function(cbFuncs, iType){
        var ERService = this.defaultERService;
        if (cbFuncs.serviceName && !DicoUtils.isRDFService(cbFuncs.serviceName)){
          ERService = cbFuncs.serviceName;
        }
        return new Promise(function(resolve, reject){
          var language = 'en';
          if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
            language = cbFuncs.lang;
          }

          if (cbFuncs.RDFServiceURL && cbFuncs.RDFServiceURL.startsWith('ODTService@')){
            cbFuncs.tenantId = 'ODTService@' + cbFuncs.tenantId;
          }
          DicoUtils.getServiceBaseURLPromise(ERService, cbFuncs.tenantId).then(function(url){
            url = url.replace('6WVocab/access/', 'dictionary/class/');
            var fullURL = url + 'interfaces?tenant=' + cbFuncs.tenantId;
            var headers = {};
            headers.Accept = 'application/json';
            headers['Accept-Language'] = language;
            headers['Content-Type'] = 'application/json';
            var classes = {classes: [iType]};

            RequestUtils.sendRequest(fullURL, {
              method: 'POST',
              headers: headers,
              data: JSON.stringify(classes),
              timeout: 6000,
              onComplete: function (response) {
                response = JSON.parse(response);
                var result = [];
                if (response && response.results && response.results.length>0 && response.results[0].interfaces){
                  var interfacesData = response.results[0].interfaces;
                  try {
                    for (var iter = 0; iter < interfacesData.length; iter++) {
                      if (!(Core.is(interfacesData[iter].automatic) && interfacesData[iter].automatic === 'Yes' ||
                          Core.is(interfacesData[iter].Automatic) && interfacesData[iter].Automatic === 'Yes')) {
                            var name = interfacesData[iter].name;
                            if (name && !name.startsWith('ds6wg:')){
                              name = 'ds6wg:' + name;
                            }
                            var extension = {curi: name,
                                            uri:  'http://www.3ds.com/vocabularies/' + name.replace(':','/'),
                                            label: interfacesData[iter].nlsName};
                            result.push(extension);
                      }
                      else {
                        console.log('automatic extension detected: ' + interfacesData[iter].name);
                      }
                    }
                  }
                  catch (e) {
                    resolve();
                  }
                }
                var retResult = {extensions: result};
                resolve(retResult);
              },
              onFailure: function (data) {
                reject(data);
              }
            });
          },
          function(errMessage){
            reject(errMessage);
          });
        });
      }
    };

    return dicoReadAPI;
  });

/**
 * @overview Provide seamless access to all dictionaries of 3DExperience data-sources
 * @file FedDictionaryAccessAPI.js provides functions for apps to
 *       access federated and data-source specific  dictionaries
 * @licence Copyright 2017 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 */

/*global widget, window, sessionStorage, Promise*/
/*jslint plusplus: true*/
'use strict';

define('DS/FedDictionaryAccess/FedDictionaryAccessAPI',
  ['UWA/Core',
    'UWA/Class/Promise',
    'DS/FedDictionaryAccess/FedDicoUtils',
    'DS/FedDictionaryAccess/FedDictionaryAccess3DSpace',
    'DS/FedDictionaryAccess/FedDictionaryAccessRDF'],

  /**
   * <p>
   * This module aims at providing APIs to access dictionaries of various
   * 3DExperience services (6WTags, 3DSpace, 3DSwym, RDF,...)
   * <p>
   * The exposed APIs return their output asynchronously as data may
   * require a back-end request to be retrieved.
   * </p>
   *
   */
  function (Core, UWAPromise, DicoUtils, FedDictionaryAccess3DSpace, FedDictionaryAccessRDF) {

    var _OntoService = DicoUtils.initSrvRequest();

    var retrievePropValuesFromCache = function (source, propValsElems, cbFuncs) {
      // NLS are now cached by source
      var jsPropValues = propValsElems;

      if (typeof propValsElems === 'string' || propValsElems instanceof String){
        // parse to json only if needed
        jsPropValues = JSON.parse(propValsElems);
      }

      var to_dwnld = {}, propValsCached = {}, cacheMissVals = [];
      var propId, propVals, vals = [];
      if (!jsPropValues){
        return;
      }

      //SGA5: if error, still return array of 2
      if (!window.sessionStorage) {
        cacheMissVals[0] = {};
        cacheMissVals[1] = jsPropValues;
        return cacheMissVals;
      }

      //SGA5: if error, still return array of 2
      if (!Core.is(cbFuncs, 'object')) {
        cacheMissVals[0] = {};
        cacheMissVals[1] = jsPropValues;
        return cacheMissVals;
      }

      var language = DicoUtils.getLanguage(cbFuncs);

      var storageName = DicoUtils.dicoPropValuesBaseKey + language;

      var localValues = sessionStorage.getItem(storageName);
      //SGA5: if no NLS found, still return array of 2
      try {
        if (!localValues || !JSON.parse(localValues)[source]) {
          cacheMissVals[0] = {};
          cacheMissVals[1] = jsPropValues;
          return cacheMissVals;
        } else {
          localValues = JSON.parse(localValues)[source];
        }
      } catch (e){ // issue when parsing to JSON
        cacheMissVals[0] = {};
        cacheMissVals[1] = jsPropValues;
        return cacheMissVals;
      }

      var propIds = Object.keys(jsPropValues);

      for (var i = 0; i < propIds.length; i++) {
        vals = [];
        propId = propIds[i];
        // console.log("*** retrieve propId.: " + propId);
        propVals = localValues[propId];
        if (!propVals) {
          /*
           * console.log(" > Property not retrieved from cache, hence need to call WS: " + propId);
           */
          to_dwnld[propId] = jsPropValues[propId];
        } else {
          // console.log(" > Property found in cache: " + propId);
          var searchedVals = jsPropValues[propId];
          var nbSearchedVals = searchedVals.length;
          var objVals = {};
          for (var j = 0; j < nbSearchedVals; j++) {
            var v = searchedVals[j];
            // console.log("looking for value: " + v);
            if (propVals[v]) {
              // console.log(" > Found local value: " + nlsV);
              objVals[v] = propVals[v];
            } else {
              // console.log(" > Value not found in cache: " + v + " adding it to to_dwnld");
              vals.push(searchedVals[j]);
            }
          }
          if (Object.keys(objVals).length > 0){
            propValsCached[propId] = objVals;
          }
          if (vals.length) {
            to_dwnld[propId] = vals;
          }
        }
      }
      cacheMissVals[0] = propValsCached;
      cacheMissVals[1] = to_dwnld;
      return cacheMissVals;
    };

    var needsToBeTranslated = function(iPropUri, iPropValue){
      var predicatesEnum = ['ds6w:what', 'ds6w:when', 'ds6w:who', 'ds6w:where', 'ds6w:why', 'ds6w:how',
      'ds6w:originator', 'ds6w:responsible', 'ds6w:lastModifiedBy', 'ds6w:reservedBy', 'ds6w:assignee', 'ds6w:docExtension',
      'ds6w:before', 'ds6w:starts', 'ds6w:actualStart', 'ds6w:plannedStart',
      'ds6w:created', 'ds6w:modified', 'ds6w:ends', 'ds6w:actualEnd',
      'ds6w:plannedEnd', 'ds6w:dueDate', 'ds6w:estimatedCompletionDate', 'ds6w:history',
      'ds6w:publishedDate', 'ds6w:sent', 'ds6w:received', 'ds6w:targetLaunchDate',
      'ds6w:laborRate',   'ds6w:distance',   'ds6w:surface',
      'ds6w:declaredSurface', 'ds6w:diameter', 'ds6w:radius', 'ds6w:length',
      'ds6w:height',   'ds6w:width',   'ds6w:thickness', 'ds6w:volume',
      'ds6w:declaredVolume', 'ds6w:min', 'ds6w:max', 'ds6w:typical',
      'ds6w:weight', 'ds6w:declaredWeight', 'ds6w:lasts', 'ds6w:estimatedDuration',
      'ds6w:actualDuration', 'ds6w:fulfillsQuantity'];

      if (predicatesEnum.indexOf(iPropUri)>-1 || iPropUri.indexOf('cost')> -1 /*|| iPropUri.indexOf('ds6wg:')> -1*/){
        return false;
      }

      // date values should be ignored. E.g. "2021-02-16T06:20:24Z"
      var regExp  = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
      if (regExp.test(iPropValue)){
        // is a date
        return false;
      }

      return true;
    };

    /**
     * @exports DS/FedDictionaryAccess/FedDictionaryAccessAPI Module
     *          for dictionary read API. This file is to be used by
     *          App's which need to access dictionary information
     *          from any data-source.
     *
     */
    var dicoReadAPI = {

      /**
       * Sets myApps config object that contains myAppsBaseUrl, userId and lang
       * Required for use cases where the compass is not initiated: in web pop-ups and in web-in-win
       * @param {object} config - JSON Object containing:
       *                           myAppsBaseUrl: myApps url that can be retrieved from myAppsURL global variable in web (if compass is initiated)
       *                                          or dscef.getMyAppsURL() in web-in-win
       *                           userId: connected user's Id
       *                           lang: connected user's language
       *
       */
      setConfigForMyApps: function(config) {
        DicoUtils.setMyAppsConfig(config);
      },

      /**
       * For custom services add its MyApps-format name to redirect web service calls to this service
       * This service will need to expose same endpoints for web services as 3DSpace
       * @param {string} service - service name as returned by federated search
       * @param {object} serviceSettings - JSON of with service settings:
       *                                   serviceSettings.persistency: type of persistency: "RDF", "ER", other
       *                                   serviceSettings.serviceName: service name in MyApps format
       *                                   [serviceSettings.federatedOn]: optionnal. Service on which all the information should be searched: service name in MyApps format or FEDERATED_SERVICE
       */
      addServiceSettings: function(service, serviceSettings) {
        if (!service || !serviceSettings || !serviceSettings.persistency || !serviceSettings.serviceName){
          console.error('addServiceSettings: wrong or missing parameters.');
          return;
        }
        DicoUtils.addServiceSettings(service, serviceSettings);
      },

      /**
       * Retrieves the list of vocabularies intended for federation
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *
       */
      getFedVocabularies: function (cbFuncs) {
        if (!cbFuncs){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getFedVocabularies: missing input');
          }
          return;
        }
        if (DicoUtils.isRDFOnER(cbFuncs)) {
          FedDictionaryAccess3DSpace.getVocabularies(cbFuncs).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
          FedDictionaryAccessRDF.getVocabularies(_OntoService, cbFuncs)
          .then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
      },

      /**
       * Retrieves the list of vocabularies intended for federation or not
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns vocabularies used for federation (6W vocabularies).
       *                                           Example of the usage: 3DSearch, Parametrization console, Federated vocabularies import.
       *                                  "public" view, used for RDF access only, returns all vocabularies
       *                                  default value: "search"
       */
      getVocabularies: function(cbFuncs) {
        this.getFedVocabularies(cbFuncs);
      },

      /**
       * Function getResourcesInfo To get the NLS translation of a set of vocabularies elements
       *
       * @param {string} elemNames: URI's of required elements, separated by a comma.
       * @param  {object} cbFuncs: - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *
       */
      getResourcesInfo: function (elemNames, cbFuncs) {
        if (!elemNames || !cbFuncs){
          cbFuncs.onFailure('getResourcesInfo: missing input');
          return;
        }

        var language = '';
        if (Core.is(cbFuncs.lang, 'string') && cbFuncs.lang.length > 0){
          language = cbFuncs.lang;
        }
        else {
          language = widget.lang;
        }

        var storageName = DicoUtils.dicoElemsBaseKey + language;
        var localValues = sessionStorage.getItem(storageName);
        if (!localValues){
          localValues = {};
        }
        else {
          localValues = JSON.parse(localValues);
        }

        var reqElts = elemNames.split(',');
        var missingVals = [];
        var locRes = [];
        // get local values that are jsReqElems, if any
        var uri, i;
        if (localValues && Object.keys(localValues).length > 0) {
          for (i = 0; i < reqElts.length; i++) {
            uri = reqElts[i];
            if (localValues[uri]){
              locRes.push(localValues[uri]);
            }
            else {
              missingVals.push(uri);
            }
          }
        }
        else {
          missingVals = reqElts;
          sessionStorage.setItem(storageName, '');
        }

        if (missingVals.length > 0) {
          var result;
          if (cbFuncs.apiVersion === 'R2019x') {
            result = [];
            if (locRes.length > 0){
              result = locRes;
            }
          }
          else {
            result = {vocabularyElementNLSInfo: []};
            if (locRes.length > 0){
              result = DicoUtils.convertToR420ElementsNls(locRes);
            }
          }
          // now, load missing elements from data-sources
          if (DicoUtils.isRDFOnER(cbFuncs)) {
            // load all from 3DSpace, old infra
            FedDictionaryAccess3DSpace.getElementsNLSNames(cbFuncs, missingVals, true).then(function(data){
              if (cbFuncs.apiVersion === 'R2019x') {
                result = result.concat(data);
              }
              else if (data.vocabularyElementNLSInfo){
                result.vocabularyElementNLSInfo = result.vocabularyElementNLSInfo.concat(data.vocabularyElementNLSInfo);
              }
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure(result);
              }
            });
          }
          else {
            // use RDF
            var cspaceElems = [], rdfElems = [];
            var promises = [];
            for (i = 0; i < missingVals.length; i++) {
              uri = missingVals[i];
              if (uri.startsWith('ds6wg:')) {
                cspaceElems.push(uri);
              }
              else {
                rdfElems.push(uri);
              }
            }
            if (rdfElems.length > 0) {
              // Call WS for RDF elements
              promises.push(FedDictionaryAccessRDF.getResourcesInfo(_OntoService, cbFuncs, rdfElems));
            }
            if (cspaceElems.length > 0) {
              // Call WS for 3DSpace elements
              promises.push(FedDictionaryAccess3DSpace.getElementsNLSNames(cbFuncs, cspaceElems));
            }
            // wait till both calls are finished
            Promise.all(promises).then(function(data){
              data.forEach(function(element){
                if (cbFuncs.apiVersion === 'R2019x') {
                  result = result.concat(element);
                }
                else if (element.vocabularyElementNLSInfo){
                  result.vocabularyElementNLSInfo = result.vocabularyElementNLSInfo.concat(element.vocabularyElementNLSInfo);
                }
              });
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure){
                cbFuncs.onFailure(result);
              }
            });
          }
        } else {
          if (cbFuncs.apiVersion !== 'R2019x'){
            locRes = DicoUtils.convertToR420ElementsNls(locRes);
          }
          cbFuncs.onComplete(locRes);
        }
      },

      /**
       * Function getVocabularyProperties to get properties of a given vocabulary
       *
       * @param {string} iVocUri - The short URI of the vocabulary (e.g. "ds6w:")
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns searchable properties
       *                                  "public" view, used for RDF access only, returns vocabulary's characteristics
       *                                  default value: "search"
       *
       */
      getVocabularyProperties: function (iVocUri, cbFuncs) {
        if (!iVocUri || !cbFuncs){
          if (cbFuncs.onFailure){
            cbFuncs.onFailure('getVocabularyProperties: missing input');
          }
          return;
        }

        if (DicoUtils.isRDFOnER(cbFuncs)) {
          FedDictionaryAccess3DSpace.getPredicatesNLSNames(cbFuncs, iVocUri).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
          FedDictionaryAccessRDF.getVocabularyProperties(_OntoService, cbFuncs, iVocUri).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
      },

      /**
       * Function getVocabularyClasses to get classes of a given vocabulary
       *
       * @param {string} iVocUri - The short URI of the vocabulary (e.g. "ds6w:")
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns classes used for federation (iVocUri should be an ontology marked as ds6w:forFederation=true).
       *                                  "public" view, used for RDF access only, returns public classes (defined as dsbase:searchable=true)
       *                                  default value: "search"
       *
       */
      getVocabularyClasses: function (iVocUri, cbFuncs) {
        if (!iVocUri || !cbFuncs){
          if (cbFuncs.onFailure){
            cbFuncs.onFailure('getVocabularyClasses: missing inputs');
          }
          return;
        }

        if (DicoUtils.isRDFOnER(cbFuncs)) {
          //console.log("### Retrieving RDF resources from 3DSpace...");
          FedDictionaryAccess3DSpace.getVocabularyClasses(cbFuncs, iVocUri).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
          if (iVocUri.startsWith('ds6wg')){
            return FedDictionaryAccess3DSpace.get3DSpaceTypes(cbFuncs, iVocUri).then(function(result){
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure(data);
              }
            });
          }
          else {
            return FedDictionaryAccessRDF.getVocabularyClasses(_OntoService, cbFuncs, iVocUri).then(function(result){
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure(data);
              }
            });
          }
        }
      },

      /**
       * Function getPropertiesForClass to get properties relevant for a class
       *
       * @param {object} iClassUri - A list of short URI of classes/ interfaces separated by comma (e.g. "ds6w:Document or ds6wg:VPMReference")
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns searchable properties
       *                                  "public" view, used for RDF access only, returns template's properties
       *                                  default value: "search"
       */
      getPropertiesForClass: function (iClassUri, cbFuncs){
        if (!iClassUri || !cbFuncs){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getPropertiesForClass: missing inputs');
          }
          return;
        }
        // if RDF service is not used, call old 3DSpace web service
        if (DicoUtils.isRDFOnER(cbFuncs)) {
          //console.log("### Retrieving RDF resources from 3DSpace...");
          FedDictionaryAccess3DSpace.getPredicates(cbFuncs, iClassUri).then(function(data){
            cbFuncs.onComplete(data);
          }).catch(function(data){
            if (cbFuncs.onFailure){
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
          var types = [];
          var classes = [];
          var elements = iClassUri.split(',');
          var result;

          for (var i=0; i<elements.length; i++){
            var element = elements[i];
            if (element.startsWith('ds6wg:')){
              types.push(element);
            }
            else {
              classes.push(element);
            }
          }
          var promises = [];
          // call new 3DSpace service for 3DSpace types
          if (types.length > 0) {
            promises.push(FedDictionaryAccess3DSpace.getTypeAttributes(cbFuncs, types));
          }
          // call RDF service for RDF classes templates
          if (classes.length > 0) {
            promises.push(FedDictionaryAccessRDF.getPropertiesForTemplates(_OntoService, cbFuncs, classes));
          }
          // wait till both calls are finished
          Promise.all(promises).then(function(data){
            if (cbFuncs.apiVersion === 'R2019x') {
              result = DicoUtils.convertToR421ClassProperties(data);
            }
            else {
              result = DicoUtils.convertToR420ClassProperties(data);
            }
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure){
              cbFuncs.onFailure(data);
            }
          });
        }
      },

      /**
       * Function getNlsOfPropertiesValues To get the NLS translation of a list of property values
       *
       * @param {object} propValsElems - Object with keys as property URI and value a list of values to translate
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *
       */
      getNlsOfPropertiesValues: function (propValsElems, cbFuncs){
        if (!Core.is(cbFuncs, 'object') || !Core.is(cbFuncs.onComplete, 'function')){
          return;
        }
        if (!propValsElems) {
          return cbFuncs.onFailure('getNlsOfPropertiesValues: no propValsElems');
        }
        var source = '3DSpace';
        if (!DicoUtils.isRDFOnER(cbFuncs)) {
          source = _OntoService;
        }
        var cacheMissValues = retrievePropValuesFromCache(source, propValsElems, cbFuncs);
        if (!cacheMissValues || cacheMissValues.length < 2) {
          return cbFuncs.onComplete();
        }

        var cachedValues = cacheMissValues[0];
        var missingValues = cacheMissValues[1];
        var valuesWithoutNLS = {}; // get some predicates and values as-is
        //var storageName = DicoUtils.dicoPropValuesBaseKey + DicoUtils.getLanguage(cbFuncs);

        // SGA5 2021/02/17 do not search for non-translatable predicate values
        for (var p in missingValues){
          for (var i=0; i<missingValues[p].length; i++){
            var v = missingValues[p][i];
            if (!needsToBeTranslated(p, v)){
              if (!valuesWithoutNLS[p]){
                valuesWithoutNLS[p]={};
              }
              valuesWithoutNLS[p][v] = v;
              if (missingValues[p]){
                delete missingValues[p][i];
              }
            }
          }
          var countNull = 0;
          for (var j=0; j<missingValues[p].length; j++){
            if (missingValues[p][j] === undefined || missingValues[p][j] === null){
              countNull ++;
            }
          }
          if (countNull === missingValues[p].length){
            delete missingValues[p];
          }
        }

        // no need to cache values that do not need to be translated
        /*if (valuesWithoutNLS !== {}){
          DicoUtils.addToCache(storageName, valuesWithoutNLS); // add to cache
        }*/
        var result = Object.assign(cachedValues,valuesWithoutNLS);

        // nothing's missing
        if (Object.keys(missingValues).length === 0) {
          return cbFuncs.onComplete(result);
        }
        else {
          // Some data are missing in cache, try to load from data-sources
          if (DicoUtils.isRDFOnER(cbFuncs)) {
            //console.log("### Retrieving RDF resources from 3DSpace...");
            FedDictionaryAccess3DSpace.getAttributesNlsValues(cbFuncs, missingValues, true).then(function(data){
              if (!data || !Object.keys(data)){
                return cbFuncs.onComplete(result);
              }
              /*for (var propId in data) {
                for (var val in data[propId]) {
                  if (!result.hasOwnProperty(propId)){
                    result[propId] = data[propId];
                  }
                  result[propId][val] = data[propId][val];
                }
              }*/
              result = DicoUtils.mergePropValues(result, data);
              //DicoUtils.addPropValuesToCache(storageName, result, source);
              return cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure){
                return cbFuncs.onFailure(result);
              }
            });
          }
          else {
            var cspaceElems = {}, rdfElems = {};
            var propIds = Object.keys(missingValues);
            var promises = [];
            var uri;
            for (var i = 0; i < propIds.length; i++) {
              uri = propIds[i];
              if (uri.startsWith('ds6wg:')) {
                cspaceElems[uri] = missingValues[uri];
              }
              else {
                rdfElems[uri] = missingValues[uri];
              }
            }
            // call RDF for RDF elements
            if (Object.keys(rdfElems).length > 0) {
              promises.push(FedDictionaryAccessRDF.getNlsOfPropertyValues(_OntoService, cbFuncs, rdfElems));
            }
            // call 3DSpace for ds6wg elements
            if (Object.keys(cspaceElems).length > 0) {
              promises.push(FedDictionaryAccess3DSpace.getAttributesNlsValues(cbFuncs, cspaceElems));
            }
            // wait till both calls are finished
            Promise.all(promises).then(function(data){
              if (!data || !Array.isArray(data)){
                return cbFuncs.onComplete(result);
              }

              data.forEach(function(element){
                /* if (element && Object.keys(element)){
                  for (var propId in element) {
                    for (var val in element[propId]) {
                      if (!result.hasOwnProperty(propId)){
                        result[propId] = element[propId];
                      }
                      result[propId][val] = element[propId][val];
                    }
                  }
                }*/
                result = DicoUtils.mergePropValues(result, element);
              });
              //DicoUtils.addPropValuesToCache(storageName, result, source);
              return cbFuncs.onComplete(result);
            }).catch(function(data){
              console.error(data);
              if (cbFuncs.onFailure){
                return cbFuncs.onFailure(result);
              }
            });
          }
        }
      },

      /**
       * Function getRangeValues to get range enumerated values of a data-type property
       *
       * @param {object} iPropUri - Short URI of the property as a string (e.g. "ds6w:country" or "ds6w:what")
       *                            or a JSON array of Short URIs of the property (e.g. ["ds6w:country","ds6w:what"])
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *
       */
      getRangeValues: function (iPropUri, cbFuncs){
        if (!iPropUri || !cbFuncs){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getRangeValues: missing inputs');
          }
          return;
        }
        if (DicoUtils.isRDFOnER(cbFuncs)) {
          //console.log("### Retrieving RDF resources from 3DSPace...");
          FedDictionaryAccess3DSpace.getPredicateRangeValues(cbFuncs, iPropUri).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
            FedDictionaryAccessRDF.getRangeValues(_OntoService, cbFuncs, iPropUri).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
      },

      /**
       * Function getFedProperties to get all searchable properties intended for FedSearch
       *
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           onlyMappable: [optional] Whether the property can be used for attribute mapping or not. Default value is false.
       */
      getFedProperties: function (cbFuncs) {
        if (!cbFuncs){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getFedProperties: missing inputs');
          }
          return;
        }

        if (DicoUtils.isRDFOnER(cbFuncs)) {
          //console.log("### Retrieving RDF resources from 3DSPace...");
          FedDictionaryAccess3DSpace.get6WPredicates(cbFuncs).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
            FedDictionaryAccessRDF.getFedProperties(_OntoService, cbFuncs).then(function(result){
            cbFuncs.onComplete(result);
          }).catch(function(data){
            if (cbFuncs.onFailure) {
              cbFuncs.onFailure();
            }
          });
        }
      },

      /**
       * Function getProperties to get all searchable (or not) properties of federated (or not) vocabularies
       *
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           onlyMappable: [optional] Whether the property can be used for attribute mapping or not. Default value is false.
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns searchable properties of federated vocabularies (6W)
       *                                  "public" view, used for RDF access only, returns all properties
       *                                  default value: "search"
       */
      getProperties: function (cbFuncs) {
        this.getFedProperties(cbFuncs);
      },

      /**
       * Function getServiceClasses to get all classes of given services
       * @param {Array} iServices - A list of service names as returned by MyApps (e.g. ["usersgroup","3dportfolio"], ["3DSpace"] etc.)
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           includeInstances: wheather the instances should be retrieved as well. Only for E/R services.
       *                           lang: user's language
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns searchable classes except the ones intended for federation (6W)
       *                                  "public" view, used for RDF access only, returns all service classes
       *                                  default value: "search"
       */
      getServiceClasses: function (iServices, cbFuncs){
        if (iServices === undefined || cbFuncs === undefined){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getServiceClasses: missing input');
          }
          return;
        }

        if (!Array.isArray(iServices)){
          iServices = [iServices];
        }

        /*if (iServices.includes('3DSpace') && iServices.length>1) {
          cbFuncs.onFailure('If calling getServiceClasses with 3DSpace, no other service can be called');
          return;
        }*/

        var promises = [];
        for (var i = 0; i < iServices.length; i++) {
          var serviceCode = iServices[i];
          var service = iServices[i];
          if (service === '3DSpace' || service === '3DDrive') {
            serviceCode = 'ds6wg:';
          }

          if (service === '3DSwym'){
            serviceCode = 'swym:';
          }

          if (service === '3DSpace' || service === '3DSwym' || service === '3DDrive'){
            //var callBack = cbFuncs.onComplete;
            cbFuncs.serviceName = service;
            //promises.push(FedDictionaryAccess3DSpace.getVocabularyClasses(cbFuncs,serviceCode));
            if (DicoUtils.isRDFOnER(cbFuncs)) {
              //console.log("### Retrieving RDF resources from 3DSpace...");
              promises.push(FedDictionaryAccess3DSpace.getVocabularyClasses(cbFuncs, serviceCode));
              if (service === '3DSwym'){
                // 08.03.2021 SGA5 IR-840134: 3DSwym has both swym: and pno: vocabularies
                promises.push(FedDictionaryAccess3DSpace.getVocabularyClasses(cbFuncs, 'pno:'));
              }
            }
            else {
              if (serviceCode.startsWith('ds6wg')){
                promises.push(FedDictionaryAccess3DSpace.get3DSpaceTypes(cbFuncs, serviceCode));
              }
              else {
                promises.push(FedDictionaryAccessRDF.getVocabularyClasses(_OntoService, cbFuncs, serviceCode));
                if (service === '3DSwym'){
                // 08.03.2021 SGA5 IR-840134: 3DSwym has both swym: and pno: vocabularies
                  promises.push(FedDictionaryAccessRDF.getVocabularyClasses(_OntoService, cbFuncs, 'pno:'));
                }
              }
            }
          } else {
            promises.push(FedDictionaryAccessRDF.getServiceClasses(serviceCode, cbFuncs));
          }
        }

        var result = [];
        var isFulfilled = false;

        // wait till all calls are finished
        // Promise.allSettled is supported by FF starting v.71. Current supported version: 68. Need to use UWAPromise instead
        UWAPromise.allSettled(promises).then(function(data){
          for (var k =0; k<data.length; k++){
            var element = data[k];
            if (element === undefined || element === null){
              continue;
            }
            var status = element.state;
            if (status === 'fullfilled'){
              isFulfilled = true;
              var value = element.value;

              // for 3DSpace calls
              if (!Array.isArray(value)){
                value = [value];
              }
              var s = iServices[k];

              // to support 3DSwym service called 2 times
              if (value && value.length > 0 && value[0].vocabularyInfo && value[0].vocabularyInfo.curi === 'pno:'){
                if (k>0){
                  result[k-1].vocabularies = result[k-1].vocabularies.concat(value);
                }
              } else {
                var serviceItem = {service: s, vocabularies: value};
                result.push(serviceItem);
              }
            }
          }

          if (isFulfilled === true){
            cbFuncs.onComplete(result);
          } else {
            if (cbFuncs.onFailure){
              cbFuncs.onFailure('All calls failed');
            }
          }

        }).catch(function(data){
          if (cbFuncs.onFailure){
            cbFuncs.onFailure(data);
          }
        });
      },

      /**
       * Function getPropertiesRoots to get a root properties for a list of properties
       * @param {string} iPropUris - A list of properties short URIs separated by a comma. Ds6wg are not managed.
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] RDF service name if the default behavior needs to be overriden.
       *                                To be used by apps that want force the redirection to a specific RDF service.
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *
       */
      getPropertiesRoots: function (iPropUris, cbFuncs){
        if (!iPropUris || !cbFuncs){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getPropertiesRoots: missing inputs');
          }
          return;
        }

        // remove ds6wg
        var props = iPropUris.split(',');
        var propsToKeep = [];
        for (var i=0; i<props.length; i++){
          var prop = props[i];
          if (prop && !prop.startsWith('ds6wg:')){
            propsToKeep.push(prop);
          }
        }

        var storageName = DicoUtils.dicoPropRootsBaseKey;
        var localValues = sessionStorage.getItem(storageName);
        if (!localValues){
          localValues = {};
        }
        else {
          localValues = JSON.parse(localValues);
        }

        var missingVals = [];
        var locRes = [];
        var uri, i, j;
        if (localValues && localValues.length > 0) {
          for (i = 0; i < propsToKeep.length; i++) {
            for (j=0; j<localValues.length; j++){
              uri = propsToKeep[i];
              if (localValues[j].curi === uri){
                locRes.push(localValues[j]);
                break;
              }
              else if (j === localValues.length -1){
                missingVals.push(uri);
              }
            }
          }
        }
        else {
          missingVals = propsToKeep;
          sessionStorage.setItem(storageName, '');
        }

        var result = [];
        if (locRes.length > 0){
          result = locRes;
        }

        if (missingVals.length > 0) {
          if (DicoUtils.isRDFOnER(cbFuncs)) {
            FedDictionaryAccess3DSpace.getPropertiesRoots(cbFuncs, missingVals).then(function(data){
              result = result.concat(data);
              sessionStorage.setItem(storageName, JSON.stringify(result));
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure(result);
              }
            });
          }
          else {
            FedDictionaryAccessRDF.getPropertiesRoots(_OntoService, cbFuncs, missingVals).then(function(data){
              result = result.concat(data);
              sessionStorage.setItem(storageName, JSON.stringify(result));
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure(result);
              }
            });
          }
        }
        else {
          cbFuncs.onComplete(result);
        }
      },

      /**
       * Function getClassExtensions to get a list of extensions (interfaces for E/R or templates from RDF)
       * @param {string} iClassUri - A  short URI
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           serviceName: [optional] service name as defined by MyApps to force the call to a particular service.
       *                                                   By default, service is 3DSpace or 3DDrive (depending on license).
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       *                           view:  [optional] purpose of the call. Possible values: "search" or "public".
       *                                  "search" view returns searchable extensions
       *                                  "public" view, used for RDF access only, returns classe's templates
       *                                  default value: "search"
       *
       */
      getExtensionsForClass: function (iClassUri, cbFuncs) {
        if (!iClassUri || !cbFuncs){
          if (cbFuncs && cbFuncs.onFailure) {
            cbFuncs.onFailure('getExtensionsForClass: missing inputs');
          }
          return;
        }

        var storageName = DicoUtils.dicoExtensionsBaseKey;
        var localValues = sessionStorage.getItem(storageName);
        var fromCache = false;
        if (!localValues){
          localValues = [];
        }
        else {
          localValues = JSON.parse(localValues);
        }

        for (var i=0; i<localValues.length; i++){
          var classInfo = localValues[i];
          if (classInfo.class === iClassUri) {
            fromCache = true;
            var result = classInfo.extensions;
            cbFuncs.onComplete(result);
            break;
          }
        }

        var addToCache = function (result){
          var cacheObj = {'class': iClassUri, extensions: result };
          localValues.push(cacheObj);
          sessionStorage.setItem(storageName, JSON.stringify(localValues));
        };

        if (!fromCache){
          if (DicoUtils.isRDFOnER(cbFuncs) || iClassUri.startsWith('ds6wg:')) {
            FedDictionaryAccess3DSpace.getTypeInterfaces(cbFuncs, iClassUri).then(function(result){
              addToCache(result);
              cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure(data);
              }
            });
          }
          else {
              FedDictionaryAccessRDF.getClassTemplates(_OntoService, cbFuncs, iClassUri).then(function(result){
                addToCache(result);
                cbFuncs.onComplete(result);
            }).catch(function(data){
              if (cbFuncs.onFailure) {
                cbFuncs.onFailure();
              }
            });
          }
        }
      },

      /**
       * Function getNlsOfPropertiesValuesBySource To get the NLS translation of a list of property values retrieved from different data sources
       *
       * @param {object} propValsElems - JSON object with keys as property URI and value as array of objects containing a data source and a value to translate.
       *                                 Data source should be a valid data source in a format recognized by MyApps.
       * @param {object} cbFuncs - JSON Object containing:
       *                           onComplete: function called on complete. The result of the query is passed as a parameter.
       *                           onFailure: function called on failure. The error message is passed as a parameter.
       *                           apiVersion: format of the output. Supported formats: R2019x, R2018x
       *                           lang: user's language
       *                           RDFStorage: [optional] RDF pilar if the default behavior needs to be overriden.
       */
      getNlsOfPropertiesValuesBySource: function (propValsElems, cbFuncs){
        // example of the call:
        // { "ds6w:jobStatus": [{value: "swym_media_non_processed", source: ["3DSwym"]}],
        //   "ds6w:type": [{value: "VPMReference", source: ["3DSpace"]}, {value: "foaf:Group", source: ["usersgroup"]}]
        //}

        if (!Core.is(cbFuncs, 'object') || !Core.is(cbFuncs.onComplete, 'function')){
          return;
        }
        if (!propValsElems) {
          cbFuncs.onFailure('getNlsOfPropertiesValuesBySource: no propValsElems');
          return;
        }

        var prop, val, val_source, sources, source;
        var callsPerSource = {}, service, promises = [];
        var result = {};

        // e.g. {"3DSpace": {"ds6w:type": ["VPMReference", "Part"]}
        for (prop in propValsElems){ // e.g. prop = "ds6w:type"
          for (var i=0; i<propValsElems[prop].length; i++){
            val_source = propValsElems[prop][i]; // e.g. val_source = {value: "foaf:Group", source: ["usersgroup"]}
            val = val_source.value; // e.g. val = "foaf:Group"
            sources = val_source.source; // e.g. sources = ["usersgroup"]

            // for predicates with federated values, always search in Service that stores 6W predicates (3DSpace)
            if (DicoUtils.isPredicateWithFedValues(prop)){
              if (DicoUtils.isRDFOnER(cbFuncs)) {
                source = '3DSpace';
              }
              else {
                source = _OntoService;
              }
            } else {
              // source count should normally be 1 as the values are not federated
              source = DicoUtils.getServiceToSearchIn(sources, cbFuncs);
            }

            if (!callsPerSource[source]) {
              callsPerSource[source] = {};
            }
            if (!callsPerSource[source][prop]){
              callsPerSource[source][prop] = [];
            }
            callsPerSource[source][prop].push(val);
          }
        }

        for (service in callsPerSource){
          var propValsPerSource = callsPerSource[service];

          // first get values from cache per source
          var cacheMissValues = retrievePropValuesFromCache(service, propValsPerSource, cbFuncs);
          if (cacheMissValues && cacheMissValues.length === 2) {
            var cachedValues = cacheMissValues[0];
            var missingValues = cacheMissValues[1];
            var valuesWithoutNLS = {}; // get some predicates and values as-is

            // then check is all properties values need to be translated
            for (var p in missingValues){
              for (i=0; i<missingValues[p].length; i++){
                var v = missingValues[p][i];
                if (!needsToBeTranslated(p, v)){
                  if (!valuesWithoutNLS[p]){
                    valuesWithoutNLS[p]={};
                  }
                  valuesWithoutNLS[p][v] = v;
                  if (missingValues[p]){
                    delete missingValues[p][i];
                  }
                }
              }
              var countNull = 0;
              for (var j=0; j<missingValues[p].length; j++){
                if (missingValues[p][j] === undefined || missingValues[p][j] === null){
                  countNull ++;
                }
              }
              if (countNull === missingValues[p].length){
                delete missingValues[p];
              }
            }
            var cachedResult = Object.assign(cachedValues, valuesWithoutNLS);

            // add to result
            result = DicoUtils.mergePropValues(result, cachedResult);

            // nothing's missing
            if (Object.keys(missingValues).length === 0) {
              continue;
            }
            // for RDF data sources
            if (DicoUtils.isRDFService(service)){
              promises.push(FedDictionaryAccessRDF.getNlsOfPropertyValues(service, cbFuncs, missingValues));
            }
            // for E/R data source (3DSpace)
            else {
              var cbFuncsPerService = Object.assign({}, cbFuncs);
              cbFuncsPerService.serviceName = service;
              promises.push(FedDictionaryAccess3DSpace.getAttributesNlsValues(cbFuncsPerService, missingValues, true));
            }
          }
        }

        if (promises.length>0){
          var isFullfilled = false;

          // wait till all calls are finished
          UWAPromise.allSettled(promises).then(function(data){
            for (var k =0; k<data.length; k++){
              var element = data[k];
              if (element === undefined || element === null){
                continue;
              }
              var status = element.state;
              if (status === 'fullfilled'){
                isFullfilled = true;
                var values = element.value;
                result = DicoUtils.mergePropValues(result, values);

                /*if (values && Object.keys(values)){
                  for (var propId in values) {
                    for (var v in values[propId]) {
                      if (!result.hasOwnProperty(propId)){
                        result[propId] = values[propId];
                      }
                      result[propId][v] = values[propId][v];
                    }
                  }
                } */
              }
            }

            if (isFullfilled === true){
              cbFuncs.onComplete(result);
            } else {
              if (cbFuncs.onFailure){
                cbFuncs.onFailure('getNlsOfPropertiesValuesBySource: Calls to all sources failed');
              }
            }

          }).catch(function(data){
            if (cbFuncs.onFailure){
              cbFuncs.onFailure(data);
            }
          });
        }
        else {
          // nothing should be retrieved from services: values are cached or/and non-translatable
          cbFuncs.onComplete(result);
        }
      }
    };

    return dicoReadAPI;
  });

