define("DS/MePreferencesUIBuilder/MePreferencesUIBuilder", [
    "UWA/Core",
    "DS/Controls/Toggle",
    "DS/Controls/ButtonGroup",
    "DS/Controls/Accordeon",
    "DS/Controls/ComboBox",
    "DS/Controls/ColorPicker",
    "DS/Controls/SpinBox",
    "DS/TreeModel/TreeDocument",
    "DS/Controls/LineEditor",
    "DS/MePreferencesUIBuilder/MePreferencesTableBuilder",
    "DS/MePreferencesUIBuilder/MePreferencesUIDataUtils"
],
    function (
        UWA, WUXToggle,
        WUXButtonGroup, WUXAccordeon, WUXComboBox,
        WUXColorPicker, WUXSpinBox, TreeDocument,
        WUXLineEditor, MEPTableBuilder, MepUIDataUtils) {
        "use strict";

        var tableModelArray = [];
        var mepTableBuilderObj = null;
        //var ModifiedColumnIDArray = null;

        var mepUIDataUtilsObj = new MepUIDataUtils();

        var mePrefernceUIBuilder = function () {
        };

        mePrefernceUIBuilder.prototype.CreateUI = function (UIJson, nlsJSON, preferenceValues, enumValues, rangeValues, iconObj) {

            mepUIDataUtilsObj.createDataUtils(UIJson, nlsJSON, preferenceValues, enumValues, rangeValues, iconObj);
            //ModifiedColumnIDArray = [];
            let repoarray = [];

            const UpdateModelEvt = new Event("ModelDataUpdated");
            UpdateModelEvt.detail = {};
            let DialogContent = new UWA.createElement("div", {
                "class": "me-preferences-dialog-content"
            });

            function sendEvent(data) {
                UpdateModelEvt.detail = data;
                document.dispatchEvent(UpdateModelEvt);
            }

            function getRepository(preferenceObj) {
                if ((preferenceObj.repository) && (preferenceObj.repository !== ""))
                    return preferenceObj.repository;
                return repoarray[repoarray.length - 1];
            }

            //function for mks to cgs conversion
            function convertMKStoCGS(paramType, value) {
                if (paramType.toLowerCase() === "length") {
                    return value * 1000;
                }

                if (paramType.toLowerCase() === "angle") {
                    return value * (180 / Math.PI);
                }
            }

            //function for cgs to mks conversion
            function convertCGStoMKS(paramType, value) {
                if (paramType.toLowerCase() === "length") {
                    return value / 1000;
                }
                if (paramType.toLowerCase() === "angle") {
                    return value * (Math.PI / 180);
                }
            }


            //Creates radio button component
            function createRadioButtonGroup(preferenceItemKey, enumKey) {

                let radioItemsValues = mepUIDataUtilsObj.getDataFromJsonResponse("enumValues", enumKey.split(".")[0], enumKey.split(".")[1], "values");
                let radioItemsArray = [];
                //Create button Group
                let buttonGroup = new WUXButtonGroup({ domId: preferenceItemKey, type: "radio" });
                if (radioItemsValues === null)
                    return buttonGroup;
                for (let i = 0; i < radioItemsValues.length; i++) {
                    radioItemsArray.push(nlsJSON[enumKey + "." + radioItemsValues[i] + ".Label"]);
                }
                let numberOfValues = radioItemsArray.length;
                //repository needs to be considered
                for (let nbItems = 0; nbItems < numberOfValues; nbItems++) {
                    let radioItem = new WUXToggle({ domId: enumKey, type: "radio", label: radioItemsArray[nbItems], value: radioItemsValues[nbItems], checkFlag: false });
                    let selectedValue = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", enumKey.split(".")[0], enumKey.split(".")[1], "value");
                    if (radioItem.value === selectedValue)
                        radioItem.checkFlag = true;
                    buttonGroup.addChild(radioItem);
                }

                //eventListener to update values in model
                buttonGroup.addEventListener("buttonclick", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = e.dsModel._properties.value.value;
                    let type = "radio";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });

                return buttonGroup;
            }

            //Creates checkbox component
            function createCheckButtonGroup(preferenceItemKey, repoKey) {
                let strVal = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value");
                let bVal = (("true" === strVal) ? true : false);
                let buttonItem = new WUXToggle({ domId: repoKey + "." + preferenceItemKey.split(".").pop(), type: "checkbox", label: nlsJSON[preferenceItemKey + ".Label"], checkFlag: bVal });

                buttonItem.addEventListener("buttonclick", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = buttonItem.checkFlag;
                    let type = "check";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });

                return buttonItem;
            }

            //Creates ComboBox component
            function createComboBox(enumKey) {

                let comboBoxValues = mepUIDataUtilsObj.getDataFromJsonResponse("enumValues", enumKey.split(".")[0], enumKey.split(".")[1], "values");
                let comboBoxItems = [];
                let selIndex = -1;

                if (comboBoxValues) {
                    for (let i = 0; i < comboBoxValues.length; i++) {
                        comboBoxItems[i] = [];
                        comboBoxItems[i]["label"] = nlsJSON[enumKey + "." + comboBoxValues[i] + ".Label"];
                        comboBoxItems[i]["value"] = i;
                    }

                    let selectedValue = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", enumKey.split(".")[0], enumKey.split(".")[1], "value");
                    for (let i = 0; i < comboBoxItems.length; i++) {
                        if (selectedValue === comboBoxValues[i]) {
                            selIndex = comboBoxItems[i].value;
                        }
                    }
                }

                let comboBox = new WUXComboBox({
                    domId: enumKey,
                    elementsList: comboBoxItems,
                    selectedIndex: selIndex,
                    enableSearchFlag: false,
                    actionOnClickFlag: false
                });

                comboBox.addEventListener("change", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = e.dsModel._properties.value.value;
                    let type = "enum";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });

                return comboBox;
            }

            //Creates colorpicker component
            function createColorPicker(preferenceItemKey, repoKey) {
                let colorValue = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value").split('#').join("");
                let colorPicker = new WUXColorPicker({ domId: repoKey + "." + preferenceItemKey.split(".").pop(), value: colorValue });

                colorPicker.addEventListener("change", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = e.dsModel._properties.value.value;
                    let type = "color";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });

                return colorPicker;
            }

            //Creates Integer spin box component
            function createSpinBox(repoKey, preferenceItemKey, stepSize, tweakerType, nbDecimal) {

                let minVal = mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", repoKey, preferenceItemKey.split(".").pop(), "minValue");
                let nMinVal = ((minVal != undefined) ? Number(minVal) : undefined);
                let maxVal = mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", repoKey, preferenceItemKey.split(".").pop(), "maxValue");
                let nMaxVal = ((maxVal != undefined) ? Number(maxVal) : undefined);
                let val = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value")
                let nVal = ((val != undefined) ? Number(val) : undefined);
                let spinBox = new WUXSpinBox({
                    domId: repoKey + "." + preferenceItemKey.split(".").pop(),
                    value: nVal,
                    minValue: nMinVal,
                    maxValue: nMaxVal,
                });



                if (tweakerType == "decimal") {
                    spinBox.decimal = nbDecimal;
                    spinBox.stepValue = (stepSize != undefined ? stepSize : 0.1);
                } else if (tweakerType == "percent") {
                    spinBox.units = "%";
                    if (nbDecimal != undefined) {
                        spinBox.stepValue = (stepSize != undefined ? stepSize : 0.1);
                        spinBox.nbDecimal = nbDecimal;
                    } else {
                        spinBox.stepValue = (stepSize != undefined ? stepSize : 1);
                    }
                } else {
                    spinBox.stepValue = (stepSize != undefined ? stepSize : 1);
                }

                spinBox.addEventListener("change", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = e.dsModel._properties.value.value;
                    let type = tweakerType; //"Int";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });

                return spinBox;

            }

            // //Creates Integer spin box component
            // function createIntSpinBox(preferenceItemKey, stepValue, repoKey) {

            //     let spinBox = new WUXSpinBox({
            //         domId: repoKey + "." + preferenceItemKey.split(".").pop(),
            //         value: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value")),
            //         minValue: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "minValue")),
            //         maxValue: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "maxValue")),
            //         stepValue: stepValue,
            //     });

            //     spinBox.addEventListener("change", function (e) {
            //         let identifier = e.dsModel._properties.domId.value;
            //         let selectedvalue = e.dsModel._properties.value.value;
            //         let type = "Int";
            //         let data = [identifier, selectedvalue, type];
            //         sendEvent(data);
            //     });

            //     return spinBox;

            // }

            // //Creates Double & Float spin box component
            // function createDecimalSpinBox(preferenceItemKey, stepValue, nbDecimal, repoKey) {

            //     let spinBox = new WUXSpinBox({
            //         domId: repoKey + "." + preferenceItemKey.split(".").pop(),
            //         value: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value")),
            //         minValue: Number(mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", repoKey, preferenceItemKey.split(".").pop(), "minValue")),
            //         maxValue: Number(mepUIDataUtilsObj.getDataFromJsonResponse("rangeValues", repoKey, preferenceItemKey.split(".").pop(), "maxValue")),
            //         stepValue: stepValue,
            //         decimal: nbDecimal
            //     });

            //     spinBox.addEventListener("change", function (e) {
            //         let identifier = e.dsModel._properties.domId.value;
            //         let selectedvalue = e.dsModel._properties.value.value;
            //         let type = "decimal";
            //         let data = [identifier, selectedvalue, type];
            //         sendEvent(data);
            //     });
            //     return spinBox;

            // }
            //creates string lineeditor component

            function createLineEditor(preferenceItemKey, repoKey) {
                let lineEditor = new WUXLineEditor({
                    domId: repoKey + "." + preferenceItemKey.split(".").pop(),
                    placeholder: "Text",
                    value: mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value")
                });

                lineEditor.addEventListener("change", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = e.dsModel._properties.value.value;
                    let type = "string";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });
                return lineEditor;

            }

            // //Creates percentage spin box component
            // function createPercentageSpinBox(preferenceItemKey, repoKey, stepValue) {

            //     let spinBox = new WUXSpinBox({
            //         domId: repoKey + "." + preferenceItemKey.split(".").pop(),
            //         value: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value")),
            //         units: "%",
            //         minValue: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "minValue")),
            //         maxValue: Number(mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "maxValue")),
            //         stepValue: stepValue
            //     });

            //     spinBox.addEventListener("change", function (e) {
            //         let identifier = e.dsModel._properties.domId.value;
            //         let selectedvalue = e.dsModel._properties.value.value;
            //         let type = "percent";
            //         let data = [identifier, selectedvalue, type];
            //         sendEvent(data);
            //     });

            //     return spinBox;

            // }

            //Creates magnitude spin box component
            function createMagnitudeSpinBox(preferenceItemKey, repoKey, paramType, stepvalue, nbDecimal) {
                let suffix = null;
                if (paramType.toLowerCase() === "length") {
                    suffix = "mm";
                } else if (paramType.toLowerCase() === "angle") {
                    suffix = "deg";
                }

                let minVal = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "minValue");
                let nMinVal = ((minVal != undefined) ? Number(minVal) : undefined);
                let maxVal = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "maxValue");
                let nMaxVal = ((maxVal != undefined) ? Number(maxVal) : undefined);
                let val = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "value")
                let nVal = ((val != undefined) ? Number(val) : undefined);
                let datatype = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", repoKey, preferenceItemKey.split(".").pop(), "datatype")

                if (nMinVal) nMinVal = (nMinVal).toFixed(nbDecimal);
                if (nMaxVal) nMaxVal = (nMaxVal).toFixed(nbDecimal);

                let spinBox = new WUXSpinBox({
                    domId: repoKey + "." + preferenceItemKey.split(".").pop(),
                    units: suffix,
                    minValue: convertMKStoCGS(paramType, nMinVal),
                    maxValue: convertMKStoCGS(paramType, nMaxVal),
                });

                if (nbDecimal !== null || nbDecimal != undefined) {
                    spinBox.decimals = nbDecimal;
                } else {
                    if (datatype == "integer" || datatype == "int" || datatype == "uint")
                        nbDecimal = 0;
                    else
                        nbDecimal = 2;
                }
                if (!stepvalue) {
                    if (datatype) {
                        if (datatype == "integer" || datatype == "int" || datatype == "uint")
                            stepvalue = 1;
                        else {
                            stepvalue = 1 / Math.pow(10, nbDecimal);
                        }
                    }
                }
                spinBox.stepValue = stepvalue;
                let mag_value = convertMKStoCGS(paramType, nVal);
                mag_value = (mag_value).toFixed(nbDecimal);
                mag_value = (nbDecimal && nbDecimal > 1) ? parseFloat(mag_value) : parseInt(mag_value);
                spinBox.value = mag_value;

                spinBox.addEventListener("change", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = convertCGStoMKS(paramType, e.dsModel._properties.value.value);
                    let type = "magnitude";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });
                return spinBox;
            }


            //Creates image Combobox component
            function createImageComboBox(enumKey, iconlist) {
                let comboBoxItems = [];
                let selIndex = -1;
                let comboBoxValues = mepUIDataUtilsObj.getDataFromJsonResponse("enumValues", enumKey.split(".")[0], enumKey.split(".")[1], "values");

                if (comboBoxValues) {
                    for (let i = 0; i < comboBoxValues.length; i++) {
                        let icondata = {};
                        comboBoxItems[i] = [];
                        comboBoxItems[i]["label"] = nlsJSON[enumKey + "." + comboBoxValues[i] + ".Label"];
                        comboBoxItems[i]["value"] = i;
                        if (iconlist[i].split(',')[0] === "data:image/png;base64") {
                            icondata["iconPath"] = iconlist[i];
                            comboBoxItems[i]["icon"] = icondata;
                        }
                        else {
                            comboBoxItems[i]["icon"] = iconlist[i];
                        }
                    }

                    let selectedValue = mepUIDataUtilsObj.getDataFromJsonResponse("preferenceValues", enumKey.split(".")[0], enumKey.split(".")[1], "value");
                    for (let i = 0; i < comboBoxItems.length; i++) {
                        if (selectedValue === comboBoxValues[i]) {
                            selIndex = comboBoxItems[i].value;
                        }
                    }
                }

                let myComboBox = new WUXComboBox({
                    domId: enumKey,
                    elementsList: comboBoxItems,
                    selectedIndex: selIndex,
                    enableSearchFlag: false,
                    actionOnClickFlag: false,
                    mainElementContent: "all"
                });

                myComboBox.addEventListener("change", function (e) {
                    let identifier = e.dsModel._properties.domId.value;
                    let selectedvalue = e.dsModel._properties.value.value;
                    let type = "enum";
                    let data = [identifier, selectedvalue, type];
                    sendEvent(data);
                });

                return myComboBox;
            }

            function createLabel(style, labelText) {
                return new UWA.createElement("p", {
                    class: style,
                    text: labelText
                });
            }

            function createDiv(style) {
                return new UWA.createElement("div", {
                    "class": style
                });
            }

            //Creates UI for PreferenceItem
            function createPreferenceItem(preferenceItemKey, preferenceObj) {
                let preferenceType = preferenceObj.tweakertype;
                let preferenceItemContent = createDiv("me-preference-item");
                let element = null;
                let label = null;
                let labelOnRightFlag = true;

                if (preferenceType.toLowerCase() === "radio") {
                    let enumKey = getRepository(preferenceObj) + "." + preferenceObj.name;
                    element = createRadioButtonGroup(preferenceItemKey, enumKey);
                }
                else if (preferenceType.toLowerCase() === "boolean") {
                    let repoKey = getRepository(preferenceObj);
                    element = createCheckButtonGroup(preferenceItemKey, repoKey);
                }
                else if (preferenceType.toLowerCase() === "enum") {
                    let enumKey = getRepository(preferenceObj) + "." + preferenceObj.name;
                    let comboBox = createComboBox(enumKey);
                    element = createDiv("me-preference-control-right");
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    labelOnRightFlag = false;
                    comboBox.inject(element);
                }
                else if (preferenceType.toLowerCase() === "color") {
                    let repoKey = getRepository(preferenceObj);
                    let colorPicker = createColorPicker(preferenceItemKey, repoKey);
                    element = createDiv("color-picker-content");
                    colorPicker.inject(element);
                    label = createLabel("me_preference_label_right", nlsJSON[preferenceItemKey + ".Label"]);
                }
                else if (preferenceType.toLowerCase() === "integer" || preferenceType.toLowerCase() === "uint") {
                    let stepValue = undefined;
                    if (preferenceObj.stepsize != null && preferenceObj.stepsize != undefined)
                        stepValue = parseInt(preferenceObj.stepsize);
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    element = createDiv("me-preference-control-right");
                    labelOnRightFlag = false;
                    let repoKey = getRepository(preferenceObj);
                    let spinbox = createSpinBox(repoKey, preferenceItemKey, stepValue, "Int");
                    spinbox.inject(element);
                }
                else if (preferenceType.toLowerCase() === "float" || preferenceType.toLowerCase() === "double") {
                    let stepValue = undefined;
                    if (preferenceObj.stepsize != null && preferenceObj.stepsize != undefined)
                        stepValue = parseFloat(preferenceObj.stepsize);
                    let nbDecimal = preferenceObj.nbdecimal;
                    if (nbDecimal == undefined)
                        nbDecimal = 2;
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    element = createDiv("me-preference-control-right");
                    labelOnRightFlag = false;
                    let repoKey = getRepository(preferenceObj);
                    let spinbox = createSpinBox(repoKey, preferenceItemKey, stepValue, "decimal", nbDecimal);
                    spinbox.inject(element);
                }
                else if (preferenceType.toLowerCase() === "string") {
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    element = createDiv("me-preference-control-right");
                    labelOnRightFlag = false;
                    let repoKey = getRepository(preferenceObj);
                    let lineEditor = createLineEditor(preferenceItemKey, repoKey);
                    lineEditor.inject(element);
                }
                else if (preferenceType.toLowerCase() === "percentage") {
                    let stepValue = undefined;
                    if (preferenceObj.stepsize != null && preferenceObj.stepsize != undefined)
                        stepValue = parseFloat(preferenceObj.stepsize);
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    element = createDiv("me-preference-control-right ");
                    labelOnRightFlag = false;
                    let repoKey = getRepository(preferenceObj);
                    let spinbox = createSpinBox(repoKey, preferenceItemKey, stepValue, "percent");
                    spinbox.inject(element);
                }
                else if (preferenceType.toLowerCase() === "imagecombo") {
                    let enumKey = getRepository(preferenceObj) + "." + preferenceObj.name;
                    let iconlist = geticons(preferenceObj.icons);
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    let comboBox = createImageComboBox(enumKey, iconlist);
                    element = createDiv("me-preference-control-right ");
                    labelOnRightFlag = false;
                    comboBox.inject(element);
                }
                else if (preferenceType.toLowerCase() === "magnitude") {
                    let repoKey = getRepository(preferenceObj);
                    let stepValue = undefined;
                    if (preferenceObj.stepsize != null && preferenceObj.stepsize != undefined)
                        stepValue = parseFloat(preferenceObj.stepsize);
                    label = createLabel("me-preference-label-left", nlsJSON[preferenceItemKey + ".Label"]);
                    element = createDiv("me-preference-control-right");
                    let nbDecimal = preferenceObj.nbdecimal;
                    if (nbDecimal == undefined)
                        nbDecimal = 0;
                    let spinBox = createMagnitudeSpinBox(
                        preferenceItemKey,
                        repoKey,
                        preferenceObj.paramType,
                        stepValue,
                        nbDecimal
                    );
                    spinBox.inject(element);
                    labelOnRightFlag = false;
                }
                addControlToContainer(preferenceItemContent, element, label, labelOnRightFlag);
                return preferenceItemContent;
            }

            function addControlToContainer(container, element, label, labelOnRightFlag) {
                if (container) {
                    if (!labelOnRightFlag) {
                        if (label !== null)
                            label.inject(container);
                        element.inject(container);
                    }
                    else {
                        element.inject(container);
                        if (label !== null)
                            label.inject(container);
                    }
                }
            }



            //To get icons for any component- 3dSicons as well as user defined
            function geticons(icondata) {
                let iconlist = [];

                if (icondata) {
                    for (let i = 0; i < icondata.length; i++) {
                        if (icondata[i].includes(".")) {
                            let iconpath = null;
                            for (let j = 0; j < iconObj.length; j++) {
                                if (iconObj[j].fileName === icondata[i]) {
                                    iconpath = "data:image/png;base64," + iconObj[j].data;
                                    break;
                                }
                            }
                            iconlist.push(iconpath);
                        }
                        else {
                            iconlist.push(icondata[i]); //ToDo:PSA42
                        }
                    }
                }
                return iconlist;
            }

            //Counts number of section - needs to do sanitisation in future				
            function GetNbSections(UIdata) {
                let sectioncount = null;
                for (let i = 0; i < UIdata.length; i++) {
                    if (UIdata[i].type.toLowerCase() === "preferencesection") {
                        sectioncount++;
                    }
                }
                return sectioncount;
            }

            //Counts number of children of section- needs to do sanitisation in future		
            function GetNbChildren(UIdata) {
                let childrencount = null;
                for (let i = 0; i < UIdata.length; i++) {
                    if (UIdata[i].type.toLowerCase() === "preferencegroup" || UIdata[i].type.toLowerCase() === "preferenceitem") {
                        childrencount++;
                    }
                }
                return childrencount;
            }

            //Creates Group titles/ headings
            function createGroupTitle(groupKey, groupType) {

                if ((groupType.toLowerCase() === "header") || (groupType.toLowerCase() === "table") || (groupType.toLowerCase() === "expander")) {
                    let grpTitle = new UWA.createElement("h5", {
                        "class": "me-preference-group-title",
                        text: nlsJSON[groupKey + ".Title"]
                    });
                    return grpTitle;
                }
                else {
                    console.log("Wrong group");
                }

            }

            //creates group Content for header, expander, table
            //Supports group within group
            function CreateGroupContent(groupKey, childrenObj) {
                let repoFlag = false;
                let colheader = null;
                let colicons = null;
                let node = null;
                let tableKey = null;
                // let tablemodel = new TreeDocument();
                // tablemodel.prepareUpdate();

                let prefItemContent = null;
                let preferenceItemKey = null;
                let groupContent = createDiv("me-preferences-all-itmes-in-a-group");

                if (childrenObj.tweakertype.toLowerCase() === "expander") {

                    let groupexpandercontent = createDiv("me-preferences-group-expander-content");

                    let numberofChildrenInGroup = childrenObj["children"].length;
                    let groupChildrenList = childrenObj["children"];

                    if (childrenObj.repository) {
                        repoarray.push(childrenObj.repository);
                        repoFlag = true;
                    }

                    for (let grpChildrenCnt = 0; grpChildrenCnt < numberofChildrenInGroup; grpChildrenCnt++) {

                        let grpChildrenObj = groupChildrenList[grpChildrenCnt];
                        let grpChildrenType = groupChildrenList[grpChildrenCnt].type;

                        preferenceItemKey = groupKey + "." + grpChildrenObj.name;
                        if (grpChildrenType.toLowerCase() === "preferenceitem") {
                            prefItemContent = createPreferenceItem(preferenceItemKey, grpChildrenObj);

                            if (prefItemContent) {
                                prefItemContent.inject(groupexpandercontent);
                            }
                        }
                        else {
                            let subgroup = CreateGroupContent(preferenceItemKey, grpChildrenObj);
                            if (subgroup)
                                subgroup.inject(groupContent);
                        }
                    }

                    if (repoFlag == true)
                        repoarray.pop();

                    let groupexpander = new WUXAccordeon({
                        items: [{
                            header: nlsJSON[groupKey + ".Title"],
                            content: groupexpandercontent
                        }],
                        style: "divided",
                        exclusive: false
                    });

                    groupexpander.inject(groupContent);

                }
                else if (childrenObj.tweakertype.toLowerCase() === "header") {
                    let groupTitleContent = createGroupTitle(groupKey, childrenObj.tweakertype);
                    groupTitleContent.inject(groupContent);
                    let numberofChildrenInGroup = childrenObj["children"].length;
                    let groupChildrenList = childrenObj["children"];
                    if (childrenObj.repository) {
                        repoarray.push(childrenObj.repository);
                        repoFlag = true;
                    }

                    for (let grpChildrenCnt = 0; grpChildrenCnt < numberofChildrenInGroup; grpChildrenCnt++) {

                        let grpChildrenObj = groupChildrenList[grpChildrenCnt];
                        let grpChildrenType = groupChildrenList[grpChildrenCnt].type;

                        preferenceItemKey = groupKey + "." + grpChildrenObj.name;
                        if (grpChildrenType.toLowerCase() === "preferenceitem") {
                            prefItemContent = createPreferenceItem(preferenceItemKey, grpChildrenObj);

                            if (prefItemContent)
                                prefItemContent.inject(groupContent);
                        }
                        else {
                            let subgroup = CreateGroupContent(preferenceItemKey, grpChildrenObj);
                            if (subgroup)
                                subgroup.inject(groupContent);
                        }
                    }
                    if (repoFlag == true)
                        repoarray.pop();
                }

                else if (childrenObj.tweakertype.toLowerCase() === "table") {

                    mepTableBuilderObj = new MEPTableBuilder();

                    let tablemodel = new TreeDocument();
                    tablemodel.prepareUpdate();
                    let groupTitleContent = createGroupTitle(groupKey, childrenObj.tweakertype);
                    groupTitleContent.inject(groupContent);
                    let numberofChildrenInGroup = childrenObj["children"].length;
                    let groupChildrenList = childrenObj["children"];

                    if (childrenObj.repository) {
                        repoarray.push(childrenObj.repository);
                        repoFlag = true;
                    }

                    for (let grpChildrenCnt = 0; grpChildrenCnt < numberofChildrenInGroup; grpChildrenCnt++) {

                        let grpChildrenObj = groupChildrenList[grpChildrenCnt];
                        let grpChildrenType = groupChildrenList[grpChildrenCnt].type;

                        preferenceItemKey = groupKey + "." + grpChildrenObj.name;
                        if (grpChildrenType.toLowerCase() === "tableheader") {
                            console.log("Table header");
                            tableKey = groupKey;
                            colheader = grpChildrenObj.name;
                            colicons = grpChildrenObj.icons;
                        }
                        else if (grpChildrenType.toLowerCase() === "tabledata") {
                            console.log("TableData");
                            node = mepTableBuilderObj.GetNodeData(preferenceItemKey, grpChildrenObj, mepUIDataUtilsObj);
                            tablemodel.addChild(node);
                        }
                        else {
                            let subgroup = CreateGroupContent(preferenceItemKey, grpChildrenObj);
                            if (subgroup)
                                subgroup.inject(groupContent);
                        }

                        if (grpChildrenType.toLowerCase() === "tabledata" && grpChildrenCnt == numberofChildrenInGroup - 1) {
                            tablemodel.pushUpdate();
                            tableModelArray.push(tablemodel);
                            prefItemContent = mepTableBuilderObj.createTableDGV(colheader, colicons, tablemodel, tableKey, nlsJSON);
                        }

                        if (prefItemContent)
                            prefItemContent.inject(groupContent);
                    }
                    if (repoFlag == true)
                        repoarray.pop();

                }

                return groupContent;

            }



            //creates section Content
            function CreatePageContent() {

                let numberOfSections = GetNbSections(UIJson.UIModel);
                let sectionKey = "";
                let groupKey = ";"
                let prefItemContent = null;
                let sectionDiv = null;
                let groupContent = null;
                let preferenceItemKey = null;
                let repoFlag = false;

                let pageContentArray = [];

                for (let sectionCnt = 0; sectionCnt < numberOfSections; sectionCnt++) {

                    sectionDiv = new UWA.createElement("div", {
                        "class": "me-preferences-section"
                    });

                    let sectionObj = UIJson.UIModel[sectionCnt];
                    sectionKey = sectionObj.name;
                    preferenceItemKey = sectionKey;
                    groupKey = sectionKey;
                    if (sectionObj.repository) {
                        repoarray.push(sectionObj.repository);
                        repoFlag = true;
                    }
                    let numberOfChildern = GetNbChildren(UIJson.UIModel[sectionCnt]["children"]);
                    let childrenList = UIJson.UIModel[sectionCnt]["children"];
                    for (let childrenCnt = 0; childrenCnt < numberOfChildern; childrenCnt++) {
                        prefItemContent = null;
                        groupContent = null;
                        let childrenObj = childrenList[childrenCnt];
                        let childrenType = childrenList[childrenCnt].type;
                        if (childrenType === "PreferenceItem") {
                            preferenceItemKey = preferenceItemKey + "." + childrenObj.name;
                            prefItemContent = createPreferenceItem(preferenceItemKey, childrenObj);
                            preferenceItemKey = sectionKey;
                            if (prefItemContent)
                                prefItemContent.inject(sectionDiv);
                        }
                        else if (childrenType === "PreferenceGroup") {
                            groupKey = sectionKey + "." + childrenObj.name;
                            preferenceItemKey = groupKey;
                            groupContent = CreateGroupContent(groupKey, childrenObj);

                            if (groupContent)
                                groupContent.inject(sectionDiv);
                        }
                    }
                    pageContentArray.push({
                        "header": nlsJSON[sectionKey + ".Title"],
                        "content": sectionDiv
                    });

                    if (repoFlag == true)
                        repoarray.pop();
                }
                return pageContentArray;
            }


            let sectionAccordeon = new WUXAccordeon({
                items: CreatePageContent(),
                style: "divided",
                exclusive: false
            });

            sectionAccordeon.inject(DialogContent);


            return DialogContent;
        };

        mePrefernceUIBuilder.prototype.getUpdatedTablePreferences = function () {
            let preferences = [];
            for (let tableCnt = 0; tableCnt < tableModelArray.length; tableCnt++) {
                if (mepTableBuilderObj) {
                    let prefArray = mepTableBuilderObj.GetModifiedPreferences(tableModelArray[tableCnt], mepUIDataUtilsObj);
                    preferences = preferences.concat(prefArray);
                }
            }
            return preferences;
        };

        mePrefernceUIBuilder.prototype.Reset = function () {
            if (tableModelArray) {
                tableModelArray = [];
            }
            if (mepTableBuilderObj) {
                mepTableBuilderObj.Reset()
            }
        };

        return mePrefernceUIBuilder;

    });
