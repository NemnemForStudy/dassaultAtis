define('DS/MePreferencesUIBuilder/MePreferencesModalDialog',
  ["DS/Windows/ImmersiveFrame",
    "DS/Windows/Dialog",
    'DS/UWPClientCode/I18n',
    'DS/Notifications/NotificationsManagerUXMessages',
    'DS/Notifications/NotificationsManagerViewOnScreen',
    'DS/WAFData/WAFData',
    'DS/MePreferencesUIBuilder/MePreferencesUIBuilder',
    "DS/MePreferencesUIBuilder/MePreferencesModel",
    'DS/Controls/Button',
    'i18n!DS/MePreferencesUIBuilder/assets/nls/translation',
    'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
    'DS/WebappsUtils/WebappsUtils'
  ],
  function (WUXImmersiveFrame, WUXDialog, I18n, NotificationsManagerUXMessages, WUXNotificationsManagerViewOnScreen, WAFData, MePreferencesUIBuilder, MePreferencesModel, WUXButton, nls, i3DXCompassPlatformServices, WebappsUtils) {

    var preferenceValues = null;
    var enumValues = null;
    var rangeValues = null;
    var PREFERENCE_REQUEST_BODY = null;
    var ENUM_REQUEST_BODY = null;
    var RANGE_REQUEST_BODY = null;
    var ENUM_META_DATA_ENDPOINT = "/api/v1/preferences_metadata/enum_metadata";
    var RANGE_META_DATA_ENDPOINT = "/api/v1/preferences_metadata/range";
    var READ_PREFERENCE_ENDPOINT = "/api/v1/preferences";
    var ZIP_META_DATA_ENDPOINT = "/api/v1/preferences_panel/page_model";
    var serviceurl = null;
    var repostack = new Array();

    window.notifs = NotificationsManagerUXMessages;
    WUXNotificationsManagerViewOnScreen.setNotificationManager(window.notifs);

    var mePreferenceUIBuilderObj = new MePreferencesUIBuilder();
    var mePreferencesModelObj = new MePreferencesModel();
    var immersiveFrame = null;

    const removeImmEvent = new Event("ImmFrameRemoved");

    var MePreferenceModalDialog = {
      getMePreferenceDialog: function (appID) {

        immersiveFrame = new WUXImmersiveFrame({
          identifier: "me-preference-dialog-immersive-frame"
        });

        var currentLanguage = I18n.getCurrentLanguage();

        return isServiceAvailable().then(async () => {

          var response = await getResources(appID, currentLanguage);

          var UIJson = GetCompleteJson(response);
          var isSuccess = false;

          if (response)
            isSuccess = await GetValuesFromServer(UIJson); //GetContentOfApplicationFromInputJson
          else {
            //PSA42: Todo
            //return null
          }

          if (isSuccess) {
            mePreferencesModelObj.CreateModel(UIJson, preferenceValues, enumValues, rangeValues);  //CreateTreeDocument which acts as a temporary database for storing and saving responses
            // Creates UIDialog using CreateUI method from MePrefernceUIBuilder.js
            var UIModalDialog = new WUXDialog({
              width: 400,
              immersiveFrame: immersiveFrame,
              title: "Preferences",
              content: ProcessResponse(response),
              activeFlag: false,
              modalFlag: true,
              resizableFlag: true,
              position: {
                my: "center",
                at: "center",
                of: immersiveFrame
              },
              identifier: "me-preference-dialog",
              buttons: {
                No: new WUXButton({
                  label: "Cancel",
                  onClick: function (e) {
                    mePreferenceUIBuilderObj.Reset();
                    UIModalDialog.close();
                    removeImmersiveFrame();
                  }
                }),
                Yes: new WUXButton({
                  label: "Save",
                  onClick: function (e) {
                    SavePreferences();
                    SaveTablePreferences();
                    UIModalDialog.close();
                    removeImmersiveFrame();
                  }
                })
              }
            });
          }
          else {
            //PSA42: Todo
            //return null
          }

          if (UIModalDialog) {
            var mePrefDialogCloseButton = UIModalDialog.elements._closeButton;
            mePrefDialogCloseButton.addEventListener('click', function () {
              //Remove Immersive Frame
              removeImmersiveFrame();
            });
          }
          //Load CSS
          loadCSS();
          return immersiveFrame;
        });
      }
    }

    //function to load css
    function loadCSS() {
      var path = WebappsUtils.getWebappsBaseUrl() + "MePreferencesUIBuilder/MePreferencesUIDialog.css";
      var linkElem = new UWA.createElement('link', {
        'rel': 'stylesheet',
        'type': 'text/css',
        'href': path
      });
      document.getElementsByTagName('head')[0].appendChild(linkElem);
    }

    function removeImmersiveFrame() {
      //Get all immersive frames present in the application.
      var immFramesList = document.getElementsByClassName('wux-windows-immersive-frame');
      for (let it = 0; it < immFramesList.length; it++) {
        let immFrame = immFramesList[it];
        //Remove the immersive frame added for MePreferenceDialog 
        if (immFrame.dsModel.identifier == "me-preference-dialog-immersive-frame") {
          immFrame.remove();
          break;
        }
      }
      immersiveFrame = null;
      document.dispatchEvent(removeImmEvent);
    }


    function GetCompleteJson(response) {
      var completeJson = JSON.parse(response);
      var UIJson = {}, UIModel = [];
      for (var i = 0; i < completeJson.mePrefUIData.length; i++) {
        for (var j = 0; j < completeJson.mePrefUIData[i].prefStyle.length; j++) {
          for (var k = 0; k < completeJson.mePrefUIData[i].prefStyle[j].data.length; k++) {
            UIModel.push(JSON.parse(completeJson.mePrefUIData[i].prefStyle[j].data[k]));
          }

        }
      }
      UIJson["UIModel"] = UIModel;
      return UIJson;

    }

    async function SavePreferences() {
      var savedModel = mePreferencesModelObj.getUpdatedPreferences();
      var repoArray = new Array();

      if ((savedModel) && (savedModel.length != 0)) {
        for (var i = 0; i < Object.keys(savedModel).length; i++) {
          var tempArray = new Array();
          var tempObj = {};
          tempObj["name"] = savedModel[i].preferenceNames;
          tempObj["value"] = (savedModel[i].preferenceValue).toString();
          tempArray.push(tempObj);

          var repoObject = {};
          repoObject["name"] = savedModel[i].repository;
          repoObject["preferences"] = tempArray;

          repoArray.push(repoObject);
        }
        var repoObj = { "repositories": repoArray };

        await writepreferences(repoObj);
      }
      else {
        return null;
      }
    }

    async function SaveTablePreferences() {

      var savedTableModel = mePreferenceUIBuilderObj.getUpdatedTablePreferences();
      var repoArray = new Array();
      if ((savedTableModel) && (savedTableModel.length != 0)) {
        for (var i = 0; i < Object.keys(savedTableModel).length; i++) {
          var tempArray = new Array();
          var tempObj = {};
          tempObj["name"] = savedTableModel[i].preferenceNames;
          tempObj["value"] = (savedTableModel[i].preferenceValue).toString();
          tempArray.push(tempObj);

          var repoObject = {};
          repoObject["name"] = savedTableModel[i].repository;
          repoObject["preferences"] = tempArray;

          repoArray.push(repoObject);
        }
        var repoObj = { "repositories": repoArray };


        await writepreferences(repoObj);
        mePreferenceUIBuilderObj.Reset();
      }
      else {
        mePreferenceUIBuilderObj.Reset();
        return null;
      }
    }

    function retrievePlatformId() {
      return widget.data['x3dPlatformId'];
    }

    function loadServiceURL(platformId) {
      var me = this;
      var prom = new Promise(function (resolve, reject) {
        i3DXCompassPlatformServices.getServiceUrl({
          serviceName: 'mepreferences',
          platformId: platformId,
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


    function isServiceAvailable() {
      var me = this;
      var newProm = new Promise(function (resolve, reject) {
        loadServiceURL.call(me, retrievePlatformId()).then((urlData) => {
          serviceurl = urlData;
          resolve(true);
        }).catch((errorInfo) => {
          reject(false);
        });
      });
      return newProm;
    }

    async function writepreferences(requestBody) {
      var completeURL = "";

      completeURL = serviceurl + READ_PREFERENCE_ENDPOINT;
      callRestAPI.call(this, requestBody, completeURL, 'PUT').then((data) => {
        return data;
      }).catch((errorInfo) => {
        return null;
      });

    }

    async function getResources(appID, currentLanguage) {
      //Steps -
      //1) Call zip RestAPI and get zip file from server
      //2) Call ProcessZip
      //3) Retuen True/False
      var REQUEST_BODY = null;
      var completeURL = serviceurl + ZIP_META_DATA_ENDPOINT +
        '?appIds="' + appID + '"&lang="' + currentLanguage + '"';
      return await callRestAPI.call(this, REQUEST_BODY, completeURL, 'GET').then((responseObject) => {
        return responseObject;
      }).catch((errorInfo) => {
        return null;
      });
    }

    function ProcessResponse(ComJson) {
      //Steps - 
      //1) Unzip file
      //2) Find all prefstyles and concatenate to form UIJson.
      //3) Find all nlsJSON and concatenate
      //4) Call GetUIContent


      var dialogDiv = new UWA.Element("div", {
        styles: {
          width: "100%",
          height: "100%"
        }
      });

      var ComJson = JSON.parse(ComJson);
      for (var i = 0; i < ComJson.mePrefUIData.length; i++) {
        var iconObj = ComJson.mePrefUIData[i].icons;
        for (var j = 0; j < ComJson.mePrefUIData[i].prefStyle.length; j++) {

          var UIObj = {};
          var nlsObj;
          UIObj["UIModel"] = JSON.parse(ComJson.mePrefUIData[i].prefStyle[j].data);
          if (UIObj) {
            for (var k = 0; k < ComJson.mePrefUIData[i].nlsJSON.length; k++) {
              if ((ComJson.mePrefUIData[i].prefStyle[j].fileName).split("_")[0] == (ComJson.mePrefUIData[i].nlsJSON[k].fileName).split("_")[0]) {
                nlsObj = JSON.parse(ComJson.mePrefUIData[i].nlsJSON[k].data);
              }
            }
          }

          var appcontent = mePreferenceUIBuilderObj.CreateUI(UIObj, nlsObj, preferenceValues, enumValues, rangeValues, iconObj);
          appcontent.inject(dialogDiv);
        }
      }
      return dialogDiv;
    }

    function getRepository(dataInfo) {
      if ((dataInfo.repository) && (dataInfo.repository !== "")) {
        return dataInfo.repository;
      }
      else {
        return repostack[repostack.length - 1];
      }
    }


    function CreatePreferenceRequestBody(UIJson) {
      // Steps-
      // 1) Iterate through UIJson created in ProcessZip and create request body for all preferenceItem 
      var repoArray = new Array();
      for (var j = 0; j < UIJson.UIModel.length; j++) {
        for (var i = 0; i < UIJson.UIModel[j].length; i++) {
          var repoFlag = false;
          if (UIJson.UIModel[j][i].repository) {
            repostack.push(UIJson.UIModel[j][i].repository);
            repoFlag = true;
          }
          UIJson.UIModel[j][i].children.forEach(CreateRepo);
          if (repoFlag == true)
            repostack.pop();
        }
      }


      function AddInRepoArray(dataInfo) {
        var temp = new Array();
        temp.push(dataInfo.name);

        var repoObject = {};
        repoObject["name"] = getRepository(dataInfo);
        repoObject["preferenceNames"] = temp;

        repoArray.push(repoObject);
      }

      function CreateRepo(dataInfo) {
        if (dataInfo.type.toLowerCase() === "preferenceitem") {
          AddInRepoArray(dataInfo);
        }
        else if (dataInfo.type.toLowerCase() === "preferencegroup") {
          var repoFlag = false;
          if (dataInfo.repository) {
            repostack.push(dataInfo.repository);
            repoFlag = true;
          }
          for (var i = 0; i < dataInfo.children.length; i++) {
            CreateRepo(dataInfo.children[i]);
          }
          if (repoFlag == true)
            repostack.pop();
        }
        else if (dataInfo.type.toLowerCase() === "tabledata") {
          for (var i = 0; i < dataInfo.CellData.length; i++) {
            CreateRepo(dataInfo.CellData[i]);
          }
        }
      }

      var repoObj = { "repositories": repoArray };
      return repoObj;

    }

    function CreateEnumRequestBody(preferenceValues) {
      var repoArray = new Array();

      for (var i = 0; i < Object.keys(preferenceValues.repositories).length; i++) {
        for (var j = 0; j < Object.keys(preferenceValues.repositories[i].preferences).length; j++) {
          if (preferenceValues.repositories[i].preferences[j].datatype == "enum") {
            var temp = new Array();
            temp.push(preferenceValues.repositories[i].preferences[j].name);

            var repoObject = {};
            repoObject["name"] = preferenceValues.repositories[i].name;
            repoObject["preferenceNames"] = temp;

            repoArray.push(repoObject);
          }
        }
      }

      var repoObj = { "repositories": repoArray };
      return repoObj;

    }

    function CreateRangeRequestBody(preferenceValues) {
      var repoArray = new Array();


      for (var i = 0; i < Object.keys(preferenceValues.repositories).length; i++) {
        for (var j = 0; j < Object.keys(preferenceValues.repositories[i].preferences).length; j++) {
          if (preferenceValues.repositories[i].preferences[j].datatype == "float" || preferenceValues.repositories[i].preferences[j].datatype == "double" || preferenceValues.repositories[i].preferences[j].datatype == "integer" || preferenceValues.repositories[i].preferences[j].datatype == "uint") {
            var temp = new Array();
            temp.push(preferenceValues.repositories[i].preferences[j].name);

            var repoObject = {};
            repoObject["name"] = preferenceValues.repositories[i].name;
            repoObject["preferenceNames"] = temp;

            repoArray.push(repoObject);
          }
        }
      }

      var repoObj = { "repositories": repoArray };
      return repoObj;

    }

    async function GetValuesFromServer(UIJson) {
      //1) call CreateRequestBody
      //2) Call readPreferenceMetadata
      //3) Call readPrefEnumMetadata
      //4) Call readRangeMetadata
      //5) Return true/False

      var IsValueRetrieved = false;
      PREFERENCE_REQUEST_BODY = CreatePreferenceRequestBody(UIJson);
      if (PREFERENCE_REQUEST_BODY) {
        preferenceValues = await readPreferenceValues(PREFERENCE_REQUEST_BODY);
        if (preferenceValues) {
          ENUM_REQUEST_BODY = CreateEnumRequestBody(preferenceValues);
          RANGE_REQUEST_BODY = CreateRangeRequestBody(preferenceValues);

          if (ENUM_REQUEST_BODY) {
            enumValues = await readPrefEnumMetadata(ENUM_REQUEST_BODY);
          }
          if (RANGE_REQUEST_BODY) {
            rangeValues = await readRangeMetadata(RANGE_REQUEST_BODY);
          }
          IsValueRetrieved = true;
        }
      }
      return IsValueRetrieved;
    }

    async function readPreferenceValues(PREFERENCE_REQUEST_BODY) {
      //Steps -
      //1) Get request body from CreateRequestBody for all preferenceItem
      //2) Call preference RestAPI and get value, typeRep and lockstate values from server
      //3) Call UpdateTreeDocumentValues to update values in model 

      var completeURL = serviceurl + READ_PREFERENCE_ENDPOINT;
      return await callRestAPI.call(this, PREFERENCE_REQUEST_BODY, completeURL, 'POST').then((responseObject) => {
        return responseObject;
      }).catch((errorInfo) => {
        return null;
      });
    }

    async function readPrefEnumMetadata(ENUM_REQUEST_BODY) {
      //Steps -
      //1) Get enum request body from CreateRequestBody.
      //2) Call enum RestAPI and get enumMetadata from server
      //3) Call UpdateTreeDocumentValues to update values in model 

      var completeURL = serviceurl + ENUM_META_DATA_ENDPOINT;
      return await callRestAPI.call(this, ENUM_REQUEST_BODY, completeURL, 'POST').then((responseObject) => {
        return responseObject;
      }).catch((errorInfo) => {
        return null;
      });
    }
    async function readRangeMetadata(RANGE_REQUEST_BODY) {
      //Steps -
      //1) Get range request body from CreateRequestBody.
      //2) Call range RestAPI and get rangeMetadata from server
      //3) Call UpdateTreeDocumentValues to update values in model 

      var completeURL = serviceurl + RANGE_META_DATA_ENDPOINT;
      return await callRestAPI.call(this, RANGE_REQUEST_BODY, completeURL, 'POST').then((responseObject) => {
        return responseObject;
      }).catch((errorInfo) => {
        return null;
      });
    }

    // function callRestAPIForZip(rcompleteURL, methodType) {
    //   //To do in future: pass entire options object
    //   var headersInfo = {
    //     'Content-Type': 'application/zip'
    //   };
    //   var typeInfo = 'arraybuffer';
    //   var newProm = new Promise(function (resolve, reject) {
    //     WAFData.authenticatedRequest(completeURL, {
    //       method: methodType,
    //       type: typeInfo,
    //       headers: headersInfo,
    //       onComplete: function (responseObject) {
    //         resolve(responseObject);
    //       },
    //       onFailure: function (errorObject) {
    //         reject(errorObject);
    //       }
    //     });
    //   });
    //   return newProm;
    // }


    function callRestAPI(requestBody, completeURL, methodType) {
      //To do in future: pass entire options object
      var dataInfo;
      var headersInfo;
      var typeInfo;
      if (requestBody) {
        dataInfo = JSON.stringify(requestBody);
        headersInfo = {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br'
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

    document.addEventListener("ModelDataUpdated", (e) => {
      mePreferencesModelObj.Update(e.detail[0], e.detail[1], e.detail[2]);
    });

    return MePreferenceModalDialog;
  }
);



