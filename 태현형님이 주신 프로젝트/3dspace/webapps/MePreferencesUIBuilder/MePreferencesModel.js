
define('DS/MePreferencesUIBuilder/MePreferencesModel',
  ["DS/TreeModel/TreeDocument",
    "DS/TreeModel/TreeNodeModel"],
  function (TreeDocument, TreeNodeModel) {

    var TDmodel = null;
    var PreferenceValues = null;
    var EnumValues = null;
    var RangeValues = null;
    var repostack = [];

    var mePreferencesModelObj = function () {
    };

    mePreferencesModelObj.prototype.CreateModel = function (UIJson, preferenceValues, enumValues, rangeValues) {
      TDmodel = new TreeDocument();
      let root = undefined;
      PreferenceValues = preferenceValues;
      EnumValues = enumValues;
      RangeValues = rangeValues;

      TDmodel.prepareUpdate();

      for (let i = 0; i < UIJson.UIModel.length; i++) {
        for (let j = 0; j < UIJson.UIModel[i].length; j++) {
          BuildModel(UIJson.UIModel[i][j], root);
        }
      }

      TDmodel.pushUpdate();
    };

    mePreferencesModelObj.prototype.ResetFlag = function () {
      TDmodel = null;
    };

    mePreferencesModelObj.prototype.Update = function (identifier, selectedvalue, type) {
      //1) traverse treenodemodel
      //2) Update model
      TDmodel.search({
        match: function (cellInfos) {
          if (cellInfos.nodeModel.getAttributeValue("label") === identifier.split(".")[1]) {
            if (type === "enum") {
              let daValue = (cellInfos.nodeModel.getAttributeValue("possibleValues"))[selectedvalue];
              cellInfos.nodeModel.setAttribute("value", daValue);
              cellInfos.nodeModel.setAttribute("modifiedflag", true);
            }
            else if (type === "color") {
              let coVal = "#" + selectedvalue;
              cellInfos.nodeModel.setAttribute("value", coVal);
              cellInfos.nodeModel.setAttribute("modifiedflag", true);
            }
            else {
              cellInfos.nodeModel.setAttribute("value", selectedvalue);
              cellInfos.nodeModel.setAttribute("modifiedflag", true);
            }
            return true;
          }
          return false;
        }
      });
    };

    mePreferencesModelObj.prototype.getUpdatedPreferences = function () {
      let Preferences = [];
      TDmodel.search({
        match: function (cellInfos) {
          if (cellInfos.nodeModel.getAttributeValue("modifiedflag") === true) {
            let PrefObject = {};
            PrefObject["repository"] = cellInfos.nodeModel.getAttributeValue("repository");
            PrefObject["preferenceNames"] = cellInfos.nodeModel.getAttributeValue("label");
            PrefObject["preferenceValue"] = cellInfos.nodeModel.getAttributeValue("value");
            Preferences.push(PrefObject);
          }
        }
      });

      return Preferences;
    };

    function GetDataFromJsonResponse(databaseName, repositoryName, preferenceName, key) {
      let data = null;
      if (databaseName != null) {
        for (let i = 0; i < databaseName.repositories.length; i++) {
          if (databaseName.repositories[i].name == repositoryName) {
            for (let j = 0; j < databaseName.repositories[i].preferences.length; j++) {
              if (databaseName.repositories[i].preferences[j].name == preferenceName) {
                data = databaseName.repositories[i].preferences[j][key];
              }
              else {
                //PSA42:Todo
              }

            }
          }
        }
      }
      return data;
    }

    //Builds model for application json 
    function BuildModel(JSONObj, root) {
      if (JSONObj.type.toLowerCase() === "preferencesection") {
        var repoFlag = false;
        if (JSONObj.repository) {
          repostack.push(JSONObj.repository);
          repoFlag = true;
        }
        var attributes = getattributes(JSONObj);
        var prefSecNode = PrefSectionTreeNodeModel(attributes);
        TDmodel.addChild(prefSecNode);
        if (JSONObj.children.length > 0) {
          for (let nbChildrenProcessed = 0; nbChildrenProcessed < JSONObj.children.length; nbChildrenProcessed++) {
            BuildModel(JSONObj.children[nbChildrenProcessed], prefSecNode);
          }
          if (repoFlag == true)
            repostack.pop();
        }
      } else if (JSONObj.type.toLowerCase() === "preferencegroup") {
        var repoFlag = false;
        if (JSONObj.repository) {
          repostack.push(JSONObj.repository);
          repoFlag = true;
        }
        if (JSONObj.tweakertype.toLowerCase() !== "table") {
          var attributes = getattributes(JSONObj);
          var prefGrpNode = PrefGroupTreeNodeModel(attributes);
          root.addChild(prefGrpNode);
          if (JSONObj.children.length > 0) {
            for (let nbChildrenProcessed = 0; nbChildrenProcessed < JSONObj.children.length; nbChildrenProcessed++) {
              BuildModel(JSONObj.children[nbChildrenProcessed], prefGrpNode);
            }
            if (repoFlag == true)
              repostack.pop();
          }
        }
      } else if (JSONObj.type.toLowerCase() === "preferenceitem") {
        var attributes = getPreferenceattributes(JSONObj);
        var prefItemNode = PrefItemTreeNodeModel(attributes);
        root.addChild(prefItemNode);
      }
    }

    //Create tree node model for different types - Prefrence item, preference section, prefrence group, table header and table data
    var PrefItemTreeNodeModel = function (attributes) {
      return new TreeNodeModel({
        label: attributes[0],
        grid: {
          datatype: GetDataFromJsonResponse(PreferenceValues, attributes[1], attributes[0], "datatype"),
          value: GetDataFromJsonResponse(PreferenceValues, attributes[1], attributes[0], "value"),
          //  lockstate: GetDataFromJsonResponse(PreferenceValues, attributes[0], "lockstate"), //PSA42:Todo
          possibleValues: GetDataFromJsonResponse(EnumValues, attributes[1], attributes[0], "values"),
          range: [GetDataFromJsonResponse(RangeValues, attributes[1], attributes[0], "minValue"), GetDataFromJsonResponse(RangeValues, attributes[1], attributes[0], "maxValue")],
          repository: attributes[1],
          preferencetype: attributes[2],
          tweakertype: attributes[3],
          stepsize: attributes[5],
          nbdecimal: attributes[6],
          paramtype: attributes[7],
          modifiedflag: false
        },
        icons: attributes[4],
      });
    };

    var PrefSectionTreeNodeModel = function (attributes) {
      return new TreeNodeModel({
        label: attributes[0],
        grid: {
          repository: attributes[1],
          preferencetype: attributes[2],
          //lockstate: GetDataFromJsonResponse(PreferenceValues, attributes[1], attributes[0]).lockstate //PSA42:Todo
        },
        icons: attributes[4],
      });
    };

    var PrefGroupTreeNodeModel = function (attributes) {
      return new TreeNodeModel({
        label: attributes[0],
        grid: {
          repository: attributes[1],
          preferencetype: attributes[2],
          tweakertype: attributes[3],
          //lockstate: GetDataFromJsonResponse(PreferenceValues, attributes[1], attributes[0]).lockstate //PSA42:Todo
        },
        icons: attributes[4],
      });
    };

    function getrepository(attdata) {
      if ((attdata.repository) && (attdata.repository !== "")) {
        return attdata.repository;
      }
      else {
        return repostack[repostack.length - 1];
      }
    }

    //get attributes list for preference item node
    function getPreferenceattributes(attdata) {
      let att = [];
      att.push(attdata.name);
      att.push(getrepository(attdata));
      att.push(attdata.type);
      att.push(attdata.tweakertype);
      att.push(attdata.icons);
      att.push(attdata.stepsize);
      att.push(attdata.nbdecimal);
      att.push(attdata.paramType);
      return att;
    }

    //get attributes list for other node
    function getattributes(attdata) {
      let att = [];
      att.push(attdata.name);
      att.push(attdata.repository);
      att.push(attdata.type);
      att.push(attdata.tweakertype);
      att.push(attdata.icons);

      if (attdata.children) {
        var childArray = [];
        for (let i = 0; i < attdata.children.length; i++) {
          childArray.push(attdata.children[i]);
        }
      }
      att.push(childArray);
      return att;
    }
    return mePreferencesModelObj;
  });
