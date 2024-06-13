define("DS/MePreferencesUIBuilder/MePreferencesTableBuilder", [
    "UWA/Core",
    "DS/TreeModel/TreeNodeModel",
    "DS/DataGridView/DataGridView",
],
    function (
        UWA,
        TreeNodeModel, DataGridView) {

        var enumList = [];
        var modifiedColumnIDArray = [];

        var mePreferencesTableBuilder = function () {
        };

        //Creates table using DGV
        mePreferencesTableBuilder.prototype.createTableDGV = function (headerName, headericons, tablemodel, tableKey, nlsJSON) {

            let mainContent = new UWA.Element("div", {
                styles: {
                    width: "100%",
                    height: "100%"
                }
            });

            //creates dynamic columns and update model
            var createDGVColumns = function (headerName, headericons, tableKey) {
                let columns = [];
                /*for (let i = 0; i < headerName.length; i++) {
                    columns[i] = [];
                }*/
                columns[0] = [];
                columns[0]["dataIndex"] = "tree";
                columns[0]["text"] = nlsJSON[tableKey + "." + headerName[0] + ".Label"];
                columns[0]["typeRepresentation"] = "string";
                columns[0]["icon"] = headericons[0];
                columns[0]["sortableFlag"] = false;

                for (let i = 1; i < headerName.length; i++) {
                    columns[i] = [];
                    columns[i]["dataIndex"] = "column" + i;
                    columns[i]["text"] = nlsJSON[tableKey + "." + headerName[i] + ".Label"];
                    columns[i]["icon"] = headericons[i];
                    columns[i]["getCellTypeRepresentation"] = function (cellInfos) {
                        if (cellInfos.nodeModel) {
                            if (cellInfos.nodeModel.getAttributeValue("coltype" + cellInfos.columnID) === "enum") {
                                return cellInfos.nodeModel.getAttributeValue("column" + cellInfos.columnID + "Name");
                            }
                            return cellInfos.nodeModel ? cellInfos.nodeModel.getAttributeValue("coltype" + cellInfos.columnID) : "string";
                        }
                    };
                    columns[i]["setCellValue"] = function (cellInfos, value) {
                        if (cellInfos.nodeModel) {
                            cellInfos.nodeModel._options.grid["column" + cellInfos.columnID + "Value"] = value;
                            cellInfos.nodeModel._options.grid["column" + cellInfos.columnID + "modified"] = true;
                            if (!modifiedColumnIDArray.includes(cellInfos.columnID))
                                modifiedColumnIDArray.push(cellInfos.columnID);
                            cellInfos.nodeModel._options.grid["columnID"] = modifiedColumnIDArray;
                        }
                    };
                    columns[i]["getCellValue"] = function (cellInfos) {
                        if (cellInfos.nodeModel) {
                            return cellInfos.nodeModel.getAttributeValue("column" + cellInfos.columnID + "Value");
                        }
                    };
                    columns[i]["getCellSemantics"] = function (cellInfos) {
                        return {
                            minValue: cellInfos.nodeModel ? cellInfos.nodeModel._options.grid.semantics["column" + cellInfos.columnID + "minValue"] : undefined,
                            maxValue: cellInfos.nodeModel ? cellInfos.nodeModel._options.grid.semantics["column" + cellInfos.columnID + "maxValue"] : undefined,
                            stepValue: cellInfos.nodeModel ? cellInfos.nodeModel._options.grid.semantics["column" + cellInfos.columnID + "stepsize"] : undefined
                        };
                    };
                    columns[i]["sortableFlag"] = false;
                    columns[i]["editableFlag"] = true;
                    columns[i]["editionPolicy"] = "EditionOnClick";
                }


                return columns;
            }

            let col = createDGVColumns(headerName, headericons, tableKey);

            let myDataGridView = new DataGridView({
                identifier: "DataGridView",
                maxVisibleRowCount: 100,
                columns: col,
                treeDocument: tablemodel,
                showSelectionCheckBoxesFlag: false,
                showRowIndexFlag: false,
                showRowHeaderBackgroundFlag: false,
                defaultColumnDef: {//Set default settings for columns 
                    width: 'auto',
                    minWidth: 80
                }
            });

            let typeRep = myDataGridView.getTypeRepresentationFactory();

            if (typeRep) {
                for (let i = 0; i < enumList.length; i++) {
                    typeRep.registerTypeRepresentations(JSON.stringify(enumList[i]));
                }
            }

            myDataGridView.subscribeOnceToAllCellsRendered(function () {
                let options = {};
                options.computeColumnHeader = true;
                myDataGridView.sizeAllColumnsToFit(options);
            });

            myDataGridView.inject(mainContent);

            return mainContent;

        }

        //Get node data from application json for table DGV 
        mePreferencesTableBuilder.prototype.GetNodeData = function (preferenceItemKey, Obj, mepUIDataUtilsObj) {
            let root = undefined;
            let rowdata = [];

            var getRepository = function (preferenceObj) {
                if ((preferenceObj.repository) && (preferenceObj.repository !== ""))
                    return preferenceObj.repository;
                return repoarray[repoarray.length - 1];
            }

            //Creates list for enum,s present in table if any
            var setTableEnum = function (enumValTranslated, enumName) {
                let sem = {};
                sem["possibleValues"] = enumValTranslated;
                sem["valueType"] = "enumString";

                let obj = {};
                obj["stdTemplate"] = "enumCombo";
                obj["semantics"] = sem;

                let customRep = {};
                customRep[enumName] = obj;
                enumList.push(customRep);
            }

            //Creates dynamic node for table UI
            var createNode = function (preferenceItemKey, rowdata) {
                let TreeNode = new TreeNodeModel();
                let gridObject = {};
                let SemanticsObject = {};

                let i = 0, j = 1;
                while (i < rowdata.length) {
                    let columnID = "column" + j;
                    let columnName = columnID + "Name";
                    let columnType = "coltype" + j;
                    let columnValue = columnID + "Value";
                    let minValue = columnID + "minValue";
                    let maxValue = columnID + "maxValue";
                    let stepSize = columnID + "stepsize";
                    let modifiedflag = columnID + "modified";
                    let repository = columnID + "repository";

                    //	gridObject[Ncol] = undefined;
                    gridObject[columnName] = rowdata[i];
                    gridObject[columnType] = rowdata[i + 1];
                    if (gridObject[columnType] === "enum")
                        gridObject[columnValue] = mepUIDataUtilsObj.nlsJSON[rowdata[i + 3] + "." + rowdata[i] + "." + mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", rowdata[i + 3], rowdata[i], "value") + ".Label"];
                    else if (gridObject[columnType] === "integer" || gridObject[columnType] === "float" || gridObject[columnType] === "double" || gridObject[columnType] === "uint") {
                        let val = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", rowdata[i + 3], rowdata[i], "value");
                        if (val != undefined) {
                            if (gridObject[columnType] === "integer" || gridObject[columnType] === "uint") {
                                gridObject[columnValue] = parseInt(val);
                                SemanticsObject[stepSize] = 1;
                            }
                            else {
                                gridObject[columnValue] = parseFloat(val);
                                SemanticsObject[stepSize] = 0.1;
                            }
                        }
                        if (mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", rowdata[i + 3], rowdata[i], "minValue"))
                            SemanticsObject[minValue] = parseFloat(mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", rowdata[i + 3], rowdata[i], "minValue"));
                        if (mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", rowdata[i + 3], rowdata[i], "maxValue"))
                            SemanticsObject[maxValue] = parseFloat(mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", rowdata[i + 3], rowdata[i], "maxValue"));
                        if (rowdata[i + 2])
                            SemanticsObject[stepSize] = rowdata[i + 2];
                    }
                    gridObject[modifiedflag] = false;
                    gridObject[repository] = rowdata[i + 3];

                    i = i + 4;
                    j = j + 1;
                }

                TreeNode.options.label = mepUIDataUtilsObj.nlsJSON[preferenceItemKey + ".Label"];
                TreeNode.options.grid = gridObject;
                TreeNode.options.grid.semantics = SemanticsObject;

                return TreeNode;
            };

            for (let i = 0; i < Obj.CellData.length; i++) {
                rowdata.push(Obj.CellData[i].name);
                rowdata.push(Obj.CellData[i].tweakertype);
                rowdata.push(Obj.CellData[i].stepsize);
                rowdata.push(getRepository(Obj.CellData[i]));
                if (Obj.CellData[i].tweakertype === "enum") {
                    let enumName = Obj.CellData[i].name;
                    let enumVal = mepUIDataUtilsObj.getDataFromJsonResponse("enumValues", getRepository(Obj.CellData[i]), Obj.CellData[i].name, "values");
                    let enumKey = getRepository(Obj.CellData[i]) + '.' + Obj.CellData[i].name;
                    let enumValMap = new Map();
                    let enumValTranslated = [];
                    for (let a = 0; a < enumVal.length; a++) {
                        enumValTranslated.push(mepUIDataUtilsObj.nlsJSON[enumKey + "." + enumVal[a] + ".Label"]);
                        enumValMap.set(mepUIDataUtilsObj.nlsJSON[enumKey + "." + enumVal[a] + ".Label"], enumVal[a]);
                    }
                    mepUIDataUtilsObj.EnumMap.set(enumKey, enumValMap);
                    setTableEnum(enumValTranslated, enumName);
                }
            }
            root = createNode(preferenceItemKey, rowdata);
            return root;
        }

        mePreferencesTableBuilder.prototype.GetModifiedPreferences = function (model, mepUIDataUtilsObj) {
            let preferences = [];
            if (model) {
                model.search({
                    match: function (cellInfos) {
                        for (let colIDCnt = 0; colIDCnt < modifiedColumnIDArray.length; colIDCnt++) {
                            let columnID = modifiedColumnIDArray[colIDCnt];
                            if (cellInfos.nodeModel.getAttributeValue("column" + columnID + "modified") === true) {
                                let PrefObject = {};
                                PrefObject["repository"] = cellInfos.nodeModel.getAttributeValue("column" + columnID + "repository");
                                PrefObject["preferenceNames"] = cellInfos.nodeModel.getAttributeValue("column" + columnID + "Name");

                                if (cellInfos.nodeModel.getAttributeValue("coltype" + columnID) == "enum") {
                                    for (let [key, value] of mepUIDataUtilsObj.EnumMap.entries()) {
                                        if (key === cellInfos.nodeModel.getAttributeValue("column" + columnID + "repository") + "." +
                                            cellInfos.nodeModel.getAttributeValue("column" + columnID + "Name")) {
                                            let enumValueMap = value;
                                            for (let [key1, value1] of enumValueMap.entries()) {
                                                if (key1 === cellInfos.nodeModel.getAttributeValue("column" + columnID + "Value")) {
                                                    PrefObject["preferenceValue"] = value1;
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    PrefObject["preferenceValue"] = cellInfos.nodeModel.getAttributeValue("column" + columnID + "Value");
                                }
                                preferences.push(PrefObject);
                            }
                        }
                    }
                });
            }
            return preferences;
        }

        mePreferencesTableBuilder.prototype.Reset = function () {
            if (enumList) {
                enumList = [];
            } if (modifiedColumnIDArray) {
                modifiedColumnIDArray = []
            }

        };

        return mePreferencesTableBuilder;

    });
