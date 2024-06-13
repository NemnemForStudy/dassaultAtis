/**
 * Grid Connector
 * calls the gridview webservice, fetches the response,
 * process the response to a format supported by the DataGridView
 * feed the processed data to the datagrid model to render the view
 * @module DS/ENXSBGridConnector/ENXSBGridConnector
 */ 

define('DS/ENXSBGridConnector/ENXSBGridConnector',
  ['UWA/Core',
   'DS/Core/Core',
   'DS/Controls/Abstract',
   'UWA/Element',
   'DS/WAFData/WAFData',
   'DS/ENOFrameworkPlugins/jQuery',
   'DS/ENXDataGrid/ENXDataGrid',
   'DS/ENXSBToolbarClient/ENXSBToolbarClient',
   'DS/ENXSBGridConnector/ENXConnectorColumnManagement',
   'DS/ENXDataGrid/URLUtils',
   'DS/Windows/ImmersiveFrame',
   'DS/Windows/Panel',
   'DS/Tree/TreeDocument',
   'DS/Tree/TreeNodeModel',
   'DS/TreeModel/ModelUtils',
   'DS/CollectionView/CollectionViewStatusBar',
   'UWA/Class',
   'DS/Tweakers/TypeRepresentationFactory',
   'DS/Tweakers/GeneratedToolbar',
   'DS/ENXSBGridConnector/StandardFunctions',
   'DS/ENXDataGrid/ENXGraphBuilder',
   'DS/ENXDataGrid/ENXThumbnailGridViewBuilder',
   'DS/Notifications/NotificationsManagerUXMessages',
   'DS/Notifications/NotificationsManagerViewOnScreen',
   'DS/Windows/Dialog',
   'DS/Controls/Button',
   'DS/Utilities/Utils',
   'DS/ENXSBGridConnector/6WTag',
   'DS/Utilities/TouchUtils',
   'css!DS/ENXDataGrid/ENXDataGrid.css',
   'i18n!DS/ENXDataGrid/assets/nls/message'
  ],
  function(
    UWA,
    WUX,
    Abstract,
    Element,
    WAFData,
    JQuery,
    DataGridView,
    Toolbar,
    ConnectorColumnManagement,
    URLUtils,
    WUXImmersiveFrame,
    WUXPanel,
    TreeDocument,
    TreeNodeModel,
    ModelUtils,
    CollectionViewStatusBar,
    Class,
    TypeRepresentationFactory,
    WUXGeneratedToolbar,
    StandardFunctions,
    ENXGraphBuilder,
    ENXThumbnailGridViewBuilder,
    WUXNotificationsManagerUXMessages,
    WUXNotificationsManagerViewOnScreen,
    WUXDialog,
    WUXButton,
    Utils,
    Tags,
    TouchUtils,
    DataGridCSS,
    nlsMessageJSON
  ) {

    "use strict";

    var url = location.href;
    var _pref3DSpace = "";
    var options = {
      serviceURL: '/resources/v1/ui/gridview?',
      toolbarURL: '/resources/v1/ui/toolbar/getToolbar?',
      gridViewServiceURL: '',
      toolbarServiceURL: ''
    };
    var count = 0;
    var columnName = "",
      columns = [];
    var validateMethod, validateTypeMethod, badCharList,onChangeHandler;
    var currentValue, possibleValues = [];
    var numberOfNodesByDepth = 0;
    var immersiveFrame;
    var loader;
    var activeTimer = {};

    var connector = Abstract.inherit({

      name: 'ENXSBGridConnector',

      publishedProperties: {
        toolbar: {
          defaultValue: undefined,
          type: 'object'
        },
        gridView: {
          defaultValue: undefined,
          type: 'object'
        }
      },

      _preBuild: function() {
        this._parent();
        _pref3DSpace = '../..';
        this.fetchServiceResponse(_pref3DSpace, url, options);

      },
	  init6WTags: function() {
	  	try {
	  	Tags.init(StandardFunctions);
	  	//Tags.handleDrawTags();
	  	Tags.getTNWindow().jQuery(Tags.getTNWindow().document).trigger("dg_data_changed.bps_dg");
	  	} catch(err) {
	  		console.log("Not able to initialize tags");
	  	}
	  },

      /**
       * Function to make webservice requests for gridview and toolbar and pass the response to process the resulted data
       * @param {String} _pref3DSpace - string to locate up 3DSpace from the current directory
       * @param {String} url - the url of the current page
       * @param {Object} options - an object with predefined URLs that are used to request the webservice
       */
      fetchServiceResponse: function(_pref3DSpace, url, options) {
        var that = this;
        var fetchStartTime = performance.now();
        var serviceParameters = url.split("?")[1];
        StandardFunctions.showLoader();

        if (serviceParameters !== undefined) {
          options.gridViewServiceURL = _pref3DSpace + options.serviceURL + serviceParameters;
          options.toolbarServiceURL = _pref3DSpace + options.toolbarURL + serviceParameters;

          var toolbarQueryOptions = {
            type: 'json',
            timeout: 600000,
            onComplete: function(result) {
              var timeTakenForToolbarRequest = (new Date().getTime()) - this.start_time;
              if (typeof performanceLogs['dataServerTime'] == 'undefined') {
                performanceLogs['dataServerTime'] = 0;
              }

              performanceLogs['dataServerTime'] = performanceLogs['dataServerTime'] + timeTakenForToolbarRequest;

              Toolbar.processToolbarData(result, that);
			  var displayView = that.gridView.layout._getDataFromPreferences("displayView");
			  Toolbar.enableDisableItems(displayView, that.nodeModel.getSelectedNodes().length);
              			  var derivedTableInfo = JSON.parse(result.data[0].relateddata.derivedTableData[0].dataelements.derivedTableData)

var model = Toolbar.toolbar.getNodeModelByID('DataGridTableFilterMenu');
if(model.options.grid.data.menu.length>1){
	model.options.grid.data.menu.splice(model.options.grid.data.menu.length-1, 0,{"id":"SeparatorItem","type":"SeparatorItem"});
}
var actionURL = "javascript:StandardFunctions.launch(args)";
let deleteDerivedTableAction=JSON.parse(JSON.stringify(model.options.grid.data.menu[0].action));
let editDerivedTableAction=JSON.parse(JSON.stringify(model.options.grid.data.menu[0].action));
StandardFunctions.updateToolbarEntry("CreateCustomTable", '[{"icon":"../../common/images/iconActionCreate.gif"}]');
var systemTableURL="";
model.options.grid.data.menu.push({"id":"SeparatorItem","type":"SeparatorItem"});
if(Object.keys(derivedTableInfo).length !== 0){
var newAction = new Array();
var jsonObj=[];
var DeleteTableflag = true;
var systemTableFlag=true;
	for (var  i = 0, size = derivedTableInfo.length; i < size; i++) {
		var item={};
		var derivedTableInfoVal = derivedTableInfo[i];
		var split = derivedTableInfoVal.iSplit;
		item["split"]=split;
		var customFreezePane = derivedTableInfoVal.customFreezePane;
		item["customFreezePane"]=customFreezePane;
		var derivedTable = derivedTableInfoVal.derivedTable;
		item["derivedTable"]=derivedTable;
		var customSortDirections = derivedTableInfoVal.customSortDirections;
		item["customSortDirections"]=customSortDirections;
		var customSortColumns = derivedTableInfoVal.customSortColumns;
		item["customSortColumns"]=customSortColumns;
		var lastViewedTableName = derivedTableInfoVal.lastViewedTableName;
		item["lastViewedTableName"] = lastViewedTableName;
		let derivedTableAction=JSON.parse(JSON.stringify(model.options.grid.data.menu[0].action));
		derivedTableAction.argument.href = actionURL;
		//let deleteDerivedTableAction=JSON.parse(JSON.stringify(model.options.grid.data.menu[0].action));
		deleteDerivedTableAction.argument.href = "javascript:StandardFunctions.deleteDerivedTable(args)";
		editDerivedTableAction.argument.href = "javascript:StandardFunctions.editCustomTable(args)";
		var args= new Array();
		var selectedTable = derivedTable.substr(0, derivedTable.indexOf('~'));
		var sourceURL = document.location.href;
		var rtn = sourceURL.split("?")[0],param,params_arr = [],queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
  				    if (queryString !== "") {
        				params_arr = queryString.split("&");
        				for (var j = params_arr.length - 1; j >= 0; j -= 1) {
           				 	param = params_arr[j].split("=")[0];
            				 	if (param === "split" || param === "fromToolbar" || param === "selectedTable" || param === "dynamicCustomFreezePane" || param === "customFreezePane" || param === "dynamicFreezePane") {
              			  			params_arr.splice(j, 1);
           				 	}
        				}
        				rtn = rtn + "?" + params_arr.join("&");
         			  }
			var sysRTN = rtn;		  
			if(sourceURL.indexOf("sysFreezePane")==-1 && sourceURL.indexOf("customFreezePane")==-1){
				var value = "";
				var queryString = sourceURL.split("?")[1];
				if (queryString) {
					var paramValue = queryString.split("&");
					if (paramValue) {
						for(var k = 0; k < paramValue.length; k++) {
							var paramName = paramValue[k].split("=");
								if (paramName[0] && paramName[0] == "freezePane") {
									value = paramName[1];
									break;
								}
						}
					}
				}
				systemTableURL = sysRTN+"&sysFreezePane="+value+"&fromToolbar=true";
			} else {	  
	        		systemTableURL = sysRTN+"&fromToolbar=true";	
			}
			var tableParam = URLUtils.getParameterFromUrl(systemTableURL,"table");
			if(tableParam == "" && derivedTable){
				systemTableURL +="&selectedTable="+derivedTable.substr(derivedTable.indexOf('~')+1);
			}
		
			if(rtn.indexOf("sortColumnName")>-1){
				var newSrc = customSortColumns;
				rtn= rtn.replace(/(sortColumnName=).*?(&)/,'$1' + newSrc+ '$2');
			}if(rtn.indexOf("sortDirection")>-1){
				var newSrc = customSortDirections;
				rtn= rtn.replace(/(sortDirection=).*?(&)/,'$1' + newSrc+ '$2');
			}if(rtn.indexOf("freezePane")>-1){
				var newSrc = customFreezePane;
				rtn= rtn.replace(/(freezePane=).*?(&)/,'$1' + newSrc+ '$2');
			}


		 if(typeof value != "undefined"){
			args.push(rtn+"&selectedTable="+derivedTable+"&sysFreezePane="+value+"&customSortDirections="+customSortDirections+"&customSortColumns="+customSortColumns+"&dynamicCustomFreezePane="+customFreezePane+"&customFreezePane="+customFreezePane+"&dynamicFreezePane="+customFreezePane+"&customSortColumns="+customSortColumns+"&split="+split);
		}else{
		args.push(rtn+"&selectedTable="+derivedTable+"&customSortDirections="+customSortDirections+"&customSortColumns="+customSortColumns+"&dynamicCustomFreezePane="+customFreezePane+"&customFreezePane="+customFreezePane+"&dynamicFreezePane="+customFreezePane+"&customSortColumns="+customSortColumns+"&split="+split);
		}
		derivedTableAction.argument.url=args[0];
		item["URL"]=args[0];
		jsonObj.push(item);
		var flag = true;
		if(document.location.href.indexOf("selectedTable")>-1){
			var paramsVal = document.location.href.split("?")[1].split("&");
				var parameters = {}
    					paramsVal.map(item=>{
        					let keyValue = item.split('=')
        					return parameters[keyValue[0]] = keyValue[1];
    					})
			if(decodeURIComponent(parameters.selectedTable)==derivedTable){
				flag = false;
				DeleteTableflag  = false;
				deleteDerivedTableAction.argument.url = derivedTable;
				editDerivedTableAction.argument.url = derivedTable;
				editDerivedTableAction.argument.mode = "Edit";
				
				model.options.grid.data.menu.push({"id":selectedTable,"type":"PushItem","state": "selected" ,"tooltip":selectedTable,"title":selectedTable,"action":derivedTableAction});
				StandardFunctions.updateToolbarEntry(selectedTable, '[{"icon":"../../common/images/utilCheckboxChecked.png"}]');


			}
		}
		if(flag){
			model.options.grid.data.menu.push({"id":selectedTable,"type":"PushItem","state": "selected" ,"tooltip":selectedTable,"title":selectedTable,"action":derivedTableAction});
			if(derivedTableInfo[i].lastViewedTableName=="true"){
				deleteDerivedTableAction.argument.url = derivedTable;
				editDerivedTableAction.argument.url = derivedTable;
				editDerivedTableAction.argument.mode = "Edit";
				StandardFunctions.updateToolbarEntry(selectedTable, '[{"icon":"../../common/images/utilCheckboxChecked.png"}]');
				systemTableFlag = false;
				DeleteTableflag = false;
			    }
		}
	}
	var argsSystemTable = [];
	var itemSys={};
	itemSys["URL"]=systemTableURL;
	argsSystemTable .push(systemTableURL);
        var systemTableAction =JSON.parse(JSON.stringify(model.options.grid.data.menu[model.options.grid.data.menu.length-1].action));
	systemTableAction.argument.href = actionURL;
	systemTableAction.argument.url=argsSystemTable[0];
	var paramsVal = document.location.href.split("?")[1].split("&");
				var parameters = {}
    					paramsVal.map(item=>{
        					let keyValue = item.split('=')
        					return parameters[keyValue[0]] = keyValue[1];
    					})
var sysTable = parameters.table;
if(typeof sysTable == "undefined"){
sysTable = derivedTable.substr(derivedTable.indexOf('~')+1);
}
itemSys["derivedTable"]=sysTable;
	jsonObj.push(itemSys);
if(DeleteTableflag == false){
	deleteDerivedTableAction.argument.json=JSON.stringify(jsonObj);
	deleteDerivedTableAction.argument.confirmMessage=emxUIConstants.STR_DELETE_CONFIRM_MESSAGE;
	var index = model.options.grid.data.menu.length-(size+1);
	model.options.grid.data.menu.splice(index, 0,{"id":emxUIConstants.DELETE_CUS_TABLE,"type":"PushItem","tooltip":emxUIConstants.DELETE_CUS_TABLE,"icon":"../../common/images/iconActionDelete.gif","title":emxUIConstants.DELETE_CUS_TABLE,"action":deleteDerivedTableAction});
	var indexEditTableView = model.options.grid.data.menu.length-(size+3);
	model.options.grid.data.menu.splice(indexEditTableView , 0,{"id":emxUIConstants.EDIT_TABLE_VIEW,"type":"PushItem","icon":"../../common/images/iconActionEdit.gif","tooltip":emxUIConstants.EDIT_TABLE_VIEW,"title":emxUIConstants.EDIT_TABLE_VIEW,"action":editDerivedTableAction});

}

	if( (systemTableFlag == true) && (typeof parameters.selectedTable == "undefined" || parameters.selectedTable == parameters.table || parameters.selectedTable.indexOf('~')==-1)){
			systemTableFlag = false;
			model.options.grid.data.menu.push({"id":emxUIConstants.STSTEM_TABLE,"type":"PushItem","state": "selected" ,"tooltip":emxUIConstants.STSTEM_TABLE,"title":emxUIConstants.STSTEM_TABLE,"action":systemTableAction});
			StandardFunctions.updateToolbarEntry(emxUIConstants.STSTEM_TABLE, '[{"icon":"../../common/images/utilCheckboxChecked.png"}]');


	}
	if(systemTableFlag || (systemTableFlag==false && DeleteTableflag==false)){
			model.options.grid.data.menu.push({"id":emxUIConstants.STSTEM_TABLE,"type":"PushItem","state": "selected" ,"tooltip":emxUIConstants.STSTEM_TABLE,"title":emxUIConstants.STSTEM_TABLE,"action":systemTableAction});

	}
}
              performanceLogs['totalTime'] = new Date().getTime() - totalTimeStart;
            }
          }

          var queryOptions = {
            type: 'json',
            timeout: 600000,
            onComplete: function(result) {
              StandardFunctions.hideLoader();
              var timeTakenForGridviewRequest = (new Date().getTime()) - this.start_time;
              if (typeof performanceLogs['dataServerTime'] == 'undefined') {
                performanceLogs['dataServerTime'] = 0;
              }
              performanceLogs['dataServerTime'] = performanceLogs['dataServerTime'] + timeTakenForGridviewRequest;

              that.processWebServiceData(result);

              if ('NONE' == gridType) {
                options.toolbarServiceURL += '&expandLevelFilter=false';
              }

              toolbarQueryOptions['start_time'] = new Date().getTime();
              that.init6WTags();
              WAFData.authenticatedRequest(options.toolbarServiceURL, toolbarQueryOptions);
            }
          }

          queryOptions['start_time'] = new Date().getTime();
          WAFData.authenticatedRequest(options.gridViewServiceURL, queryOptions);
        }

      },
      gridView: undefined,
      uiPanel: undefined,
      nodeModel: undefined,
      draggedItems: new Array(),
      draggable: undefined,
      dropTypesHierarchy: undefined,
      dropAction: undefined,
      dropItems: undefined,
      dropRelationshipsArray: undefined,
      dropDirectionsArray: undefined,
      thumnailGrid: undefined,

      // this process method is used by the sb grid connector to generate the grid
      process: function(container, data, cols, typeRepsArray, columnsForDisplayModes) {

        //add the tablename to the json for editing the cells
        //var tableName = URLUtils.getParameter("table");
        //dataGridViewChangeValues.push({tableName:tableName});

        immersiveFrame = new WUXImmersiveFrame().inject(container);
        console.log("result");

        //create the data model and add nodes
        var model = this.createModel(data, cols);
        this.nodeModel = model;

        displayModesColumnsArray = columnsForDisplayModes;

        if (gridType == "MULTI_ROOT_NODE" || gridType == "SINGLE_ROOT_NODE") {
          numberOfNodesByDepth = 1;
        }

        alertMessageNotification = WUXNotificationsManagerUXMessages;
        WUXNotificationsManagerViewOnScreen.setNotificationManager(alertMessageNotification);

        //create the data grid view
        var dataGridView = this.createDataGrid(model, cols, typeRepsArray, immersiveFrame);

        this.gridView = dataGridView;
        dgView = dataGridView;

        dataGridView.onReady(function(){
        	var showTouchStyle = URLUtils.getParameter("showTouchStyle");
            showTouchStyle = (showTouchStyle != undefined && showTouchStyle != "") ? (showTouchStyle == 'true') : false;
//            uncomment the below line to support touch style through url parameter
//            TouchUtils.setTouchMode(showTouchStyle);
        });


        var dataGridViewPanel;
        var savedDisplayView = dgView.layout._getDataFromPreferences("displayView");

        if (savedDisplayView == "thumbnail" || savedDisplayView == "graph") {
          dataGridViewPanel = new WUXPanel({
            immersiveFrame: immersiveFrame,
            identifier: 'DataGridViewPanel',
            showTitleFlag: false,
            titleBarVisibleFlag: false,
            resizableFlag: true,
            maximizeButtonFlag: true,
            maximizedFlag: true,
            width: '500',
            height: '500'
          });
        }

        if (savedDisplayView == "thumbnail") {
        	this.dataGridDisplayThumbnail();
        } else if (savedDisplayView == "graph") {
        	this.dataGridDisplayGraph();
        } else {
          dataGridViewPanel = this.createDataGridTable.call(this, dataGridView, model, immersiveFrame);
        }

        this.uiPanel = dataGridViewPanel;

     // CallBack for language changes to set the language on the locale
        WUX.onlanguagechange(function(){});

        return dataGridViewPanel;

      },

      createDataGridTable: function(dataGridView, model, immersiveFrame) {
        var predefinedSortModel = [];
        var columnsReverseIndexes = {};
        var filterColumns = {};
        //var displayViewColumnsArray = [], tempDisplayViewColumns = [], displayViewColumnsCount = 0;
        var ENXDataGridScope = this;
        var cols = dataGridView.layout.getLeafColumns();
        //need reference to columns for processDataElementValues call in expand callback
        columns = cols;

        for (var i = 0, len = cols.length; i < len; i++) {
          var dataIndex = cols[i].dataIndex;
          if (dataIndex !== undefined) {
            columnsReverseIndexes[dataIndex] = i;
          }
		if(cols[i].allowUnsafeHTMLContent==true){
		 cols[i].getCellValueAsStringForFind=function(cellInfos) {
			 if(cellInfos.cellModel){
			  if(cellInfos.cellModel.contains("img")){
				return "";
				} else {
					var matches=cellInfos.cellModel.match("<a [^>]+>([^<]+)<\/a>")
					if(matches){
					return matches[1];
						}
				}
			}
		 }
		}
		
		if(cols[i].typeRepresentation=="datetime"){
		 cols[i].getCellValueAsStringForFind=function(cellInfos) {
			  var datetime = {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
			    hour: "numeric",
                            minute: "numeric"
                        };
			if(UWA.is(new Date(cellInfos.cellModel),'date')){
				var theDate = new Date(cellInfos.cellModel);
				return theDate.toLocaleDateString(WUX.currentLanguage, datetime);
			}
		}
	}

          if(cols[i].typeRepresentation == 'enumString') {
          	cols[i].getCellSemantics = function(cellInfos){
          		return ENXDataGridScope.reloadPossibleValues(cellInfos);
          	}
          }
          if (cols[i].sort === 'asc' || cols[i].sort === 'desc') {
            /*predefinedSortModel.push({
              dataIndex: cols[i].dataIndex,
              sort: cols[i].sort
            });*/
			predefinedSortModel[cols[i].sortIndex]={
              dataIndex: cols[i].dataIndex,
              sort: cols[i].sort
            };
          }
		var sortColName = URLUtils.getParameter("sortColumnName");
		sortColName = decodeURIComponent(sortColName)
		var fastcols=URLUtils.getParameter("fastColumns");
		fastcols = decodeURIComponent(fastcols)
				if(typeof sortColName != "undefined" && typeof fastcols!= "undefined"){
					var sortColNameArr = sortColName.split(",")
					var fastArr = fastcols.split(",")
					if((sortColNameArr.find(cols[i].id) == -1 && !(sortColNameArr.includes("Name") && cols[i].id=="treeLabel")) && fastArr.find(cols[i].id) == -1  && URLUtils.getParameter("lazyLoad") && URLUtils.getParameter("fastColumns")){
						cols[i].sortableFlag=false;
					}
          }

          if (cols[i].filterableFlag === "true") {
		var fastcols=URLUtils.getParameter("fastColumns");
		fastcols = decodeURIComponent(fastcols)
		if(fastcols && URLUtils.getParameter("lazyLoad") < model.getAllDescendants().length){
				var fastArr = fastcols.split(",")
				if(fastArr.find(cols[i].id) != -1){
				filterColumns[cols[i].dataIndex] = {
              				filterId: 'set',
           			 };
			}
		} else {
            filterColumns[cols[i].dataIndex] = {
              filterId: 'set',
            };
          }

        }
          // Added for Range filter for numeric column STARTs
          if(cols[i].typeRepresentation == 'integer' || cols[i].typeRepresentation == 'progress') { 
      		filterColumns[cols[i].dataIndex] = {
                  filterId: 'number',
      			  filterModel: {
      					condition1: {type: "inRange"},
      				}
      				
      		};
      	}
        // Added for Range filter for numeric column ENDs
          
        //TypeAhead Function code starts
          
          if( cols[i].typeRepresentation == 'string' ) {
				var abc = cols[i].dataIndex;
				cols[i].massUpdateAllowedFlag = false;
				//cols[i].editableFlag =true;
        	cols[i].getCellSemantics = function(cellInfos){
				var jpoMethod;
				var jpo;
				var typeAheadMapValue;
				var typeAheadValidate;
				var minSearchLen;
				var dataIndex = this.layout.getDataIndexFromColumnIndex(this.layout.getColumnIndex(cellInfos.columnID));
				if(cellInfos.nodeModel.options.relData[0] !== undefined){
				 if(cellInfos.nodeModel.options.relData[0].typeAheadMethod != undefined && cellInfos.nodeModel.options.relData[0].typeAheadMethod[0].dataelements[dataIndex] != undefined){
					 jpoMethod= cellInfos.nodeModel.options.relData[0].typeAheadMethod[0].dataelements[dataIndex];
					 console.log(jpoMethod);
					 
				 }
				  if(cellInfos.nodeModel.options.relData[0].typeAheadJPO != undefined  && cellInfos.nodeModel.options.relData[0].typeAheadJPO[0].dataelements[dataIndex] != undefined){
					 jpo= cellInfos.nodeModel.options.relData[0].typeAheadJPO[0].dataelements[dataIndex];
					 console.log(jpo);
					 
				 }
				if(cellInfos.nodeModel.options.relData[0].typeAheadMapValues != undefined  && cellInfos.nodeModel.options.relData[0].typeAheadMapValues[0].dataelements[dataIndex] != undefined){
					 typeAheadMapValue= "fieldMap="+cellInfos.nodeModel.options.relData[0].typeAheadMapValues[0].dataelements[dataIndex];
					 typeAheadMapValue= typeAheadMapValue.replaceAll('&','|');
				 }
				if(cellInfos.nodeModel.options.relData[0].typeAheadValidate != undefined && cellInfos.nodeModel.options.relData[0].typeAheadValidate[0].dataelements[dataIndex] != undefined){
					  typeAheadValidate = cellInfos.nodeModel.options.relData[0].typeAheadValidate[0].dataelements[dataIndex];
				}
				
				//minsearchlength
				if (cellInfos.nodeModel.options.relData[0].typeAheadMinCharLength && cellInfos.nodeModel.options.relData[0]["typeAheadMinCharLength"][0].dataelements[dataIndex]) {
				  minSearchLen = parseInt(cellInfos.nodeModel.options.relData[0]["typeAheadMinCharLength"][0].dataelements[dataIndex]);
				}
				}	 
				if(typeAheadValidate == "false" || jpo == undefined  ){
					return {};
				 }else{
				//adding return
				return {
				possibleValues: function (text) {
						return new Promise(function (resolve, reject) {
								ENXDataGridScope.typeAheadService(jpo,jpoMethod,text,typeAheadMapValue).then(function(success) {	
								var xmlhttp = new XMLHttpRequest();
								var parser, xmlDoc;
								parser = new DOMParser();
									
								xmlDoc = parser.parseFromString(success,"text/xml");
								var searchList = [];
								var x, i,j;
								x = xmlDoc.getElementsByTagName("h");
								var typeAheadModel = null;
								var labelList=[];
								var valueList=[];
								
								if(x.length == 0){
									
									x=xmlDoc.getElementsByTagName("v");
									var values=[];
									for (i=0;i<x.length;i++){
									  values=[];
									  for(j=0;j<x[i].childNodes.length;j++){
										if(x[i].childNodes[j].nodeName == 'c'){
											values.push(x[i].childNodes[j].innerHTML);
											values.push(' ');
											
										}
									}
									//searchList.push(values.join(' ').trim());
									labelList.push(values.join(' ').trim());
									valueList.push(x[0].getAttribute("name"));
									}
								}else{
									for (i = 0; i< x.length; i++) {
										if(!x[i].childNodes[0].nodeValue.contains(".")){
											//searchList.push(x[i].childNodes[0].nodeValue);
											labelList.push(x[i].childNodes[0].nodeValue);
											valueList.push(x[i].childNodes[0].nodeValue);
											}
									}  
								}     

								var createTypeAheadNode = function(label, value) {
									  var node = new TreeNodeModel({
										label: label,
										value: value
									  });
									  return node;
									};
									
								typeAheadModel = new TreeDocument();

								  // Start a transaction
								  typeAheadModel.prepareUpdate();

								  // Add some data in your typeAheadModel
								  for (var i = 0; i < labelList.length; i++) {
									var root = createTypeAheadNode(labelList[i], valueList[i]);
									typeAheadModel.addRoot(root);
								  }
								  // Complete a transaction
								  typeAheadModel.pushUpdate();
								  resolve (typeAheadModel);
								//resolve(searchList); 
								});
						});
					},
					minLengthBeforeSearch: minSearchLen,  // Do not retrieve the possible values until 3 characters have been typed
					allowFreeInputFlag: false,
				};
			}
        	}
        }
          
        //TypeAhead Function code ends  

 }
        var currentNodeModel = dataGridModel.getChildren();
        this.updateModelWithRowId(currentNodeModel);
        
        dataGridView.sortModel = predefinedSortModel;
        model.setFilterModel(filterColumns);

        //if grouping needs to be performed
        var grpColumns = URLUtils.getParameter("rowGroupingColumnNames");
        if (grpColumns) {
          var grpOption = new Object();
          grpOption.dataIndexesToGroup = grpColumns.split(",");
          dataGridView.groupRows(grpOption);
        }

        /**TODO the below code will be removed once the datagrid has the capability for computing variable row height
         * for image column after they are rendered.
         * IR-706717-3DEXPERIENCER2019x: Techno_Firefox:Row Height is not auto-set for images.
         */
        dgView.layout.getRowHeightFunction = function (rowID) {
        	var rowHeight = dgView.layout.getRowHeightFromCellContents(rowID);
        	 for (var i = 0; i < cols.length; i++) {
        		 if(cols[i].columnType != undefined && cols[i].columnType.toLowerCase() == "image"){
        			 var nodeModel = dgView.model[rowID];
        			 if(nodeModel){
        				 var attr = (cols[i].dataIndex == 'tree') ? 'treeLabel' : cols[i].dataIndex;
        				 if (nodeModel.options.grid[attr] != "" && nodeModel.options.grid[attr] != undefined && nodeModel.options.grid[attr] != null ){
        					 rowHeight = (cols[i].cellHeight > rowHeight) ? (cols[i].cellHeight) : rowHeight;
        				 }
        			 }
        		 }
        	 }
        	 return rowHeight;
        }

        /*dataGridView.layout.getRowHeightFunction = function(rowID) {
        	var cellHeight = URLUtils.getParameter('cellHeight');
        	return (cellHeight) ? parseInt(cellHeight) : 33;
        };*/

        var headerHeight = URLUtils.getParameter('headerHeight');
        if (headerHeight) {
          dataGridView.layout.columnHeaderHeight = parseInt(headerHeight);
        }

	 var lazyLoad = new Number(URLUtils.getParameter("lazyLoad"));
	if(lazyLoad < 0){
		lazyLoad  = 0;
	}
/*         var fastCol = URLUtils.getParameter("fastColumns");
        if (lazyLoad > 0 && typeof fastCol != "undefined") {
          dataGridView.addEventListener("sortModelChange", function() {
            StandardFunctions.showLoader();
            var sortColumns = [];
            for (var i = 0; i < dgView.sortModel.length; i ++) {
              if (!dgView[dgView.sortModel[i].dataIndex]) {
    		    sortColumns.push(dgView.sortModel[i].dataIndex);
    		    dgView[dgView.sortModel[i].dataIndex] = true;
    		  }
		    }
		    if (sortColumns.length > 0) {
		      StandardFunctions.refreshColumnValues(sortColumns, false, false, true);
		    }
		    StandardFunctions.hideLoader()
          });
        }*/
        //listen to the change event, and store the column names to a global value

        dataGridView.addEventListener("change", function(e, cellInfos) {
			model.setUseChangeTransactionMode(true);
          if (e.target.dsModel.possibleValues)
            possibleValues = e.target.dsModel.possibleValues;
          if (typeof cellInfos != 'undefined') {
            columnName = dataGridView.layout.getDataIndexFromColumnIndex(cellInfos.columnID);
            columnName = (columnName == 'tree') ? 'treeLabel' : columnName;
            validateMethod = dataGridView.layout.getColumnOptionValue(cellInfos.columnID, 'validate');
            onChangeHandler = dataGridView.layout.getColumnOptionValue(cellInfos.columnID, 'onChangeHandler');
            var validText = true;
			if (onChangeHandler != null && onChangeHandler != "") {
                      var constructChangeHandlerMethod = onChangeHandler + "(\"" + cellInfos.cellModel+ "\"," + "\"" +"0,"+(cellInfos.rowID-1)+ "\"," + "\"" + columnName + "\")";
                      validText = eval(constructChangeHandlerMethod);
            }
            validateTypeMethod = dataGridView.layout.getColumnOptionValue(cellInfos.columnID, 'validateTypeMethod');
            if (validateTypeMethod != undefined)
              badCharList = dataGridView.layout.getColumnOptionValue(cellInfos.columnID, 'badCharStr');
            if (cellInfos.nodeModel != undefined)
              currentValue = cellInfos.nodeModel.options.grid[columnName];
          }
        });

        dataGridView.addEventListener("preEdit", function(e, cellInfos) {
          model.setUseChangeTransactionMode(true);
          
          /*Fix for IR-928465-3DEXPERIENCER2022x*/
          var validateKey = dataGridView.layout.getColumnOptionValue(cellInfos.columnID, 'validate');
		  if (!validateKey) 
			validateMethod = '';
		  else 
			validateMethod = validateKey;
			
		  if (cellInfos.cellModel)
			  currentValue = cellInfos.cellModel;
			  
		  var onChangeHandlerKey = dataGridView.layout.getColumnOptionValue(cellInfos.columnID, 'onChangeHandler');
		  if (!onChangeHandlerKey) 
			  onChangeHandler = "";
		  else 
			  onChangeHandler = onChangeHandlerKey;		  
		  /*End Fix for IR-928465-3DEXPERIENCER2022x*/
          
        });

        dataGridView.addEventListener("postEdit", function(e, cellInfos) {
          model.setUseChangeTransactionMode(false);
        });

        //			create the status bar
        this.createStatusBar(dataGridView);

        //			create the data grid view panel
        var dataGridViewPanel = new WUXPanel({
          immersiveFrame: immersiveFrame,
          identifier: 'DataGridViewPanel',
          title: 'DataGridView',
          showTitleFlag: false,
          titleBarVisibleFlag: false,
          resizableFlag: true,
          maximizeButtonFlag: true,
          maximizedFlag: true,
          width: '500',
          height: '500',
          content: dataGridView
        });

        return dataGridViewPanel;
      },

      createStatusBar: function(view) {
        view.buildStatusBar([{
          type: CollectionViewStatusBar.STATUS.NB_ITEMS
        }, {
          type: CollectionViewStatusBar.STATUS.NB_SELECTED_ROWS
        }, {
          type: CollectionViewStatusBar.STATUS.NB_SELECTED_CELLS
        }, {
          type: CollectionViewStatusBar.STATUS.ACTIVE_CELL,
          position: 'far'
        }]);
      },

      getLeafColumns: function(columns) {
        var leafColumns = new Array();
        for (var i = 0; i < columns.length; i++) {
          if (columns[i].children && columns[i].children.length > 0) {
            for (var j = 0; j < columns[i].children.length; j++) {
              leafColumns.push(columns[i].children[j]);
            }
          } else {
            leafColumns.push(columns[i]);
          }
        }

        return leafColumns;
      },

      processDataElementValues: function(nodeData, cols) {
        var leafColumns = this.getLeafColumns(cols);
        for (var i = 0; i < leafColumns.length; i++) {
          var dataIndex = leafColumns[i].dataIndex;
          var columnTypeRepresentation = leafColumns[i].typeRepresentation;
          if ((columnTypeRepresentation === 'integer') || (columnTypeRepresentation === 'percentage')) {
            // Ensure the number type data is of type Number and not String
            if (typeof(nodeData[dataIndex]) === 'string') {
              var num = parseFloat(nodeData[dataIndex]);
              if (isNaN(num)) {
                nodeData[dataIndex] = undefined;
              } else {
                nodeData[dataIndex] = num;
              }
            }
          }

          // handle when there is no value in the date column
          if(columnTypeRepresentation === 'date' && nodeData[dataIndex] == ""){
        	  nodeData[dataIndex] = undefined;
          }
          else if (columnTypeRepresentation === 'date' && nodeData[dataIndex] != undefined) {
            nodeData[dataIndex] = new Date(nodeData[dataIndex]);
          }
        }
      },

      onPreExpandFunction: function(modelEvent) {
        if (!modelEvent.target._isFromOriginalModel() || modelEvent.target.options.expanded) {
          modelEvent.target.preExpandDone();
        } else {
          this.performExpand(modelEvent.target, 1);
        }
      },

      performExpand: function(nodeToExpand, expandLevel) {
        var that = this;
        var objectId = nodeToExpand.options.grid.id;
        var relId = (typeof nodeToExpand.options.grid.relId != 'undefined') ? nodeToExpand.options.grid.relId : '';
        var parentId = (typeof nodeToExpand._parentNode.options.grid.id != 'undefined') ? nodeToExpand._parentNode.options.grid.id : '';
        var rowId = (typeof nodeToExpand.options.grid.rowId != 'undefined') ? nodeToExpand.options.grid.rowId : '';
        var level = (typeof nodeToExpand.options.grid.level != 'undefined') ? nodeToExpand.options.grid.level : '';
        var urlParams = URLUtils.getParametersMap();
        if(urlParams.hasOwnProperty("objectId")){
        	urlParams["originalObjectId"] = urlParams["objectId"];
        }
        urlParams["objectId"] = objectId;
        urlParams["relId"] = relId;
        urlParams["rowId"] = rowId;
        urlParams["parentId"] = parentId;
        urlParams["level"] = level;
        
        if (urlParams.program) {
          delete urlParams.program;
        }
        //need selectedProgram to be passed in the URL for the correct expand JPO to be invoked
       /* if (urlParams.selectedProgram) {
          delete urlParams.selectedProgram;
        }*/
        if (urlParams.programMenu) {
          delete urlParams.programMenu;
        }
 	var urlRetrieved = '../../resources/v1/ui/gridview/rowData?&emxExpandFilter=' + expandLevel + '&expandLevel=' + expandLevel;
        for (var param in urlParams) {
          urlRetrieved += '&' + param + '=' + urlParams[param];
        }

        var expandOptions = {
          type: 'json',
          start_time: new Date().getTime(),
          async: false,
          onComplete: function(result) {
            console.log(result);
            var requestQueryTime = (new Date().getTime() - this.start_time);
            console.log('This request took ' + requestQueryTime + ' ms');
            //					dataGridModel.setUseChangeTransactionMode(false);
            var state;
            dataGridModel.withTransactionUpdate(function() {
              state = nodeToExpand.getState();
              nodeToExpand.removeChildren();
              if (result.data[0] && result.data[0].children && result.data[0].children.length > 0) {
                that.processData(result.data[0].children, columns, nodeToExpand);
              }
              
              nodeToExpand.preExpandDone();
              that.updateModelWithRowId(nodeToExpand.getChildren(),nodeToExpand.options.grid.rowId);
              
              //do not sort children when nodes are expanded through emxEditableTable.expand
              if(nodeToExpand.options.applySort == undefined || nodeToExpand.options.applySort != false){
            	  nodeToExpand.sortChildren();
            	  dgView.reapplySortModel();
              }
              
//              dgView.reapplySortModel();
              nodeToExpand.options.expanded = true;
              //					dataGridModel.acceptChanges();
              //					dataGridModel.pushUpdate();
            });

            if ("expanding" != state) {
              if (expandLevel > 0) {
                nodeToExpand.expandNLevels({
                  numberOfLevelsToExpand: expandLevel
                });
              } else {
                nodeToExpand.expandAll();
              }
            }

            if (dgView.layout._getDataFromPreferences("displayView") == "graph") {
              ENXGraphBuilder.setGraphNodes(nodeToExpand.getChildren(), displayModesColumnsArray);
            }
            that.init6WTags();
          }
        };

        WAFData.authenticatedRequest(urlRetrieved, expandOptions);
      },

      updateModelWithRowId: function(currentNodeModel, parentLevel) {
			for(var level = 0; level < currentNodeModel.length; level++) {
				var gridOptions = currentNodeModel[level].options;
				gridOptions.grid['rowId'] = (typeof parentLevel != 'undefined') ? parentLevel + "," + level : ((typeof parentLevel == 'undefined' && typeof gridOptions.children == 'undefined')? "0,"+level : level);
				gridOptions.grid['id[level]'] = gridOptions.grid['rowId'];
				if(typeof gridOptions.children != 'undefined' && gridOptions.children.length > 0){
					var childNodes = gridOptions.children;
					this.updateModelWithRowId(childNodes, gridOptions.grid['rowId']);
				}
			}
		},

      // looping through all nodes is costly. keep only one method to loop through.
      processData: function(data, cols, parent) {
        for (var i = 0; i < data.length; i++) {
          var row = data[i];
          this.processDataElementValues(row.dataelements, cols);
          this.addEditAccessMap(row);
          var itsChildren = (gridType == 'NONE' || (typeof row.dataelements.hasChildren != 'undefined' && "false" == row.dataelements.hasChildren.toLowerCase())) ? undefined : [];
          var expanded = (typeof row.dataelements.expanded != 'undefined' && "true" == row.dataelements.expanded.toLowerCase()) ? true : false;
		  /*if(expanded && (data[i].dataelements.hasChildren && data[i].children.length==0)){
			expanded =false;
			emxExpandFilter= undefined;	
		  }*/
		  var typeIconArray = (typeof row.dataelements.typeIcon != 'undefined') ? new Array(row.dataelements.typeIcon) : undefined;
          var childNode = new TreeNodeModel({
            grid: row.dataelements,
            label: row.dataelements.treeLabel,
            icons: typeIconArray,
            relData: [row.relateddata],
            expanded: expanded,
            children: itsChildren
          });
          childNode.options.grid.id = row.id;
          childNode.options.grid.type = row.type;
          childNode.options.grid.relId = row.relId;
          if (childNode.options.thumbnail == undefined)
            childNode.options.thumbnail = "../ENXDataGrid/assets/icon120x80ImageNotFound.png";

          if (parent instanceof TreeNodeModel) {
            childNode.options.grid.rowId = parent.options.grid.rowId + "," + i;
            parent.addChild(childNode);
          } else {
            if (URLUtils.getParameter('hideRootSelection') == 'true' && gridType == 'SINGLE_ROOT_NODE') {
              childNode.options.grid['allowSelection'] = 'false';
            }
            if (URLUtils.getParameter('editRootNode') == 'false') {
              childNode.options.grid['dgEditNode'] = 'false';
            }
            if (gridType == 'NONE') {
              childNode.options.grid['dgEditNode'] = 'true';
            }

            childNode.options.grid.rowId = "" + i;
            parent.addRoot(childNode);
          }
          if (row.children && row.children.length > 0) {
            this.processData(row.children, cols, childNode);
          }
        }
      },

      addEditAccessMap: function(row) {
    	  if(row.relateddata != undefined && row.relateddata.editAccess != undefined){
    		  row.dataelements['dgEditAccess'] = row.relateddata.editAccess[0].dataelements;
    	  }
      },

      createModel: function(data, cols) {
        var model = new TreeDocument({
          useAsyncPreExpand: true,
          shouldBeSelected: function(nodeModel) {
        	  if(typeof nodeModel.options.grid.allowSelection == "undefined")
        		  return true;
            return nodeModel.options.grid.allowSelection === 'true';
          }
        });

		model.getXSO().onPostAdd(function(){
			var displayView = dgView.layout._getDataFromPreferences("displayView");
			Toolbar.enableDisableItems(displayView, dataGridModel.getSelectedNodes().length);
			try {
				tagService.getTNWindow().jQuery(tagService.getTNWindow().document).trigger("dg_selection_changed.bps_dg");
			} catch(err) {
				console.log("Tagger not found");
			}
		});

		model.getXSO().onPostRemove(function() {
			var displayView = dgView.layout._getDataFromPreferences("displayView");
			Toolbar.enableDisableItems(displayView, dataGridModel.getSelectedNodes().length);
			try {
				tagService.getTNWindow().jQuery(tagService.getTNWindow().document).trigger("dg_selection_changed.bps_dg");
			} catch(err) {
				console.log("Tagger not found");
			}
		});

        model.onNodeModelUpdate(function(modelEvent) {
          var treeNodeModel = modelEvent.data.nodeModel;
          if (treeNodeModel) {
            var attributes = modelEvent.data.attributes;
          }

          if (treeNodeModel.getChangeStates() && WUXModelChangeStates.AttributesChanged) {
            console.log("the data has been modified");
            isDataModified = true;
          }

        });

        model.addEventListener("nodeModelUpdate", function(e) {
        	if(dataGridModel != undefined && dataGridModel.getUseChangeTransactionMode() == true){
        		if (!e.data.attributes) {
        			return;
        		}
        		
        		//TODO:
        		//clean the below code to get the column name
        		var columnObj = Object.keys(e.data.attributes);
        		if(columnName == "treeLabel" && columnObj[1] != undefined ||
        				columnObj[1] != undefined && columnObj[1] == "treeLabel"){
        			columnName = Object.keys(e.data.attributes)[1];
        		}else{
        			columnName = (Object.keys(e.data.attributes)[0] != undefined) ? Object.keys(e.data.attributes)[0] : columnName;
        		}
        		
			   if ('true' == e.target.options['bpsUpdateByCode'] || (columnName != 'treeLabel' && (e.data.nodeModel&&e.data.nodeModel._referenceValues&&(e.data.nodeModel._referenceValues[columnName] == e.data.nodeModel.options.grid[columnName])))) {
                    return;
                  } 
        		  var rowId = e.data.nodeModel.options.grid.rowId;
                  var oldVal = currentValue;
                  var newVal;
                  /*FIX IR-924200-3DEXPERIENCER2022x*/
				  if (possibleValues.length<1) {
					  if (e.data.nodeModel.options.relData&&
							e.data.nodeModel.options.relData.length>0&&e.data.nodeModel.options.relData[0].reloadPossibleValues&&e.data.nodeModel.options.relData[0].reloadPossibleValues.length>0&&
							e.data.nodeModel.options.relData[0].reloadPossibleValues[0].dataelements) {
								var t = e.data.nodeModel.options.relData[0].reloadPossibleValues[0].dataelements[columnName];
								if (t) {
									possibleValues = JSON.parse(t);
								}
							}
				  }
				  /*End FIX IR-924200-3DEXPERIENCER2022x*/
                  if (possibleValues.length > 0) {
		   if (typeof possibleValues !== "function") {
                    var resultObject;
                    possibleValues.forEach(function(element) {
                      if (element.value === e.data.nodeModel.options.grid[columnName]) {
                        resultObject = element
                      }
                    });
                    /*FIX IR-924200-3DEXPERIENCER2022x*/
					if (!resultObject) {
						if (e.data.nodeModel.options.relData&&
							e.data.nodeModel.options.relData.length>0&&e.data.nodeModel.options.relData[0].reloadPossibleValues&&e.data.nodeModel.options.relData[0].reloadPossibleValues.length>0&&
							e.data.nodeModel.options.relData[0].reloadPossibleValues[0].dataelements) {
								var t = e.data.nodeModel.options.relData[0].reloadPossibleValues[0].dataelements[columnName];
								if (t) {
									possibleValues = JSON.parse(t);
								}
							}
						possibleValues.forEach(function(element) {
						  if (element.value === e.data.nodeModel.options.grid[columnName]) {
							resultObject = element
						  }
						});
					}
                    possibleValues = [];
					//newVal = resultObject.actualValue;
					newVal = (resultObject&&resultObject.actualValue) ? (resultObject.actualValue) : (e.data.nodeModel.options.grid[columnName]);
					
					/*End FIX IR-924200-3DEXPERIENCER2022x*/
			}
			else{
				newVal = e.data.nodeModel.options.grid[columnName];
			}
                  } else {
                	  if(columnName == 'treeLabel' && e.data.nodeModel.options.grid.tree == undefined){
                		  newVal = e.data.nodeModel.options.label;
                	  }else if(columnName == 'treeLabel' && e.data.nodeModel.options.grid.tree != undefined){
                		  newVal = e.data.nodeModel.options.grid.tree.label;
                	  }
                	  else{
                		  newVal = e.data.nodeModel.options.grid[columnName];
                	  }

                  }

                  activeCellColumn = columnName;
                  activeCellRow = e.data.nodeModel;
                  activeCellRow[columnName] = {
                		  oldValue : oldVal,
                		  newValue : newVal
                  }
//                  activeCellRow.newValue = newVal;
                  if (newVal instanceof Date) {
                   /* var month = newVal.getMonth() + 1;
                    newVal = newVal.getFullYear() + '-' + month + '-' + newVal.getDate();*/
                  }

                  if (!isNaN(newVal)) {
                    newVal = newVal.toString();
                  }
                  var id = e.data.nodeModel.options.grid.id;
                  if (activeTimer[id]) {
//                  	newVal = that.getNewValueOnModelUpdate(e);
                	  clearTimeout(activeTimer[id]);
                	  activeTimer[id] = undefined;
                  }

                  	//Fix forIR-804326-3DEXPERIENCER2020x
                  	 // activeTimer[id] = setTimeout(function(){
                  		if (!isNaN(newVal)) {
                            newVal = newVal.toString();
                          }
                  		  var id = e.data.nodeModel.options.grid.id;
                            var mapObject = {};
                            if (editMap.hasOwnProperty(id)) {
                              mapObject = editMap[id];
                              mapObject[columnName] = newVal; //e.data.nodeModel.options.grid[columnName];
                              editMap[id] = mapObject;
                            } else {
                              mapObject[columnName] = newVal; //e.data.nodeModel.options.grid[columnName];
                              mapObject['relId'] = e.data.nodeModel.options.grid.relId;
                              mapObject['parentId'] = StandardFunctions.getParentId("",e.data.nodeModel);
                              mapObject['rowId'] = (e.data.nodeModel.options.grid.rowId != undefined) ? e.data.nodeModel.options.grid.rowId.toString() : "0," + e.data.nodeModel._rowID;
                              mapObject["markup"] = "changed";
                              editMap[id] = mapObject;
                            }

                  	  //  },0);



                  var isValidText = true; //holds true for columns that do not have validate setting
                  var constructValidateMethod;
                  if (validateTypeMethod) {
                    constructValidateMethod = validateTypeMethod + "(\"" + badCharList + "," + newVal + "\")";
                    //require(['DS/ENXSBGridConnector/StandardFunctions'], function(StandardFunctions) {
                    var func = StandardFunctions[validateTypeMethod];
                    var badCharFound = func.call(StandardFunctions, badCharList, newVal);
                    isValidText = (badCharFound.length > 0) ? false : true;
                    if (!isValidText) {
                      window.alert("the entered text has the following bad characters: " + badCharFound);
                      var grid = {};
                      grid[columnName] = oldVal;
                      StandardFunctions.getDataGridModel().setUseChangeTransactionMode(false);
                      e.data.nodeModel.updateOptions({
                        grid: grid
                      });
                    }
                    //});
                  }
                  //				if a column has a validate setting then execute the script to validate the cell value
                  if (validateMethod != null && validateMethod != "") {
                    constructValidateMethod = validateMethod + "(\"" + newVal + "\"," + "\"" + rowId + "\"," + "\"" + columnName + "\")";
                    isValidText = eval(constructValidateMethod);

                    //				if the cell is not in the valid format then do not modify the cell to
                    //				the new value instead retain the old value
                    if (!isValidText) {
                      var grid = {};
                      grid[columnName] = oldVal;
                      StandardFunctions.getDataGridModel().setUseChangeTransactionMode(false);
                      e.data.nodeModel.updateOptions({
                        grid: grid
                      });
                    }
                  }

                  if (onChangeHandler != null && onChangeHandler != "") {
                	 
                      var constructChangeHandlerMethod = onChangeHandler + "(\"" + newVal+ "\"," + "\"" + rowId+ "\"," + "\"" + columnName + "\")";
                      isValidText = eval(constructChangeHandlerMethod);
                  }
                  
                  //				only if the cell values are in valid format then save then to
                  //				the editMap which is late used to save the data in the database
                  if(!isValidText){
                	  if (activeTimer[id]) {
//                    	newVal = that.getNewValueOnModelUpdate(e);
                		  clearTimeout(activeTimer[id]);
                		  activeTimer[id] = undefined;

                	  }
                  }
        	}
        });

        model.addEventListener("sortChildren", function(event) {
          //require(['DS/ENXSBGridConnector/StandardFunctions'], function(StandardFunctions) {
          //StandardFunctions.updateModelWithRowId(event.target.getChildren(), undefined, -1);
          //});
        });

        model.prepareUpdate();
        this.processData(data, cols, model);
        model.pushUpdate();

        // Activating the model change transaction mode
        model.setUseChangeTransactionMode(false);
        //check if the rootnode has children and only if it has then expand
        //model.getChildren()[0].options.children.length
        if (gridType == 'SINGLE_ROOT_NODE' && model.getChildren()[0].hasChildren() && model.getChildren()[0].getChildren().length > 0) {
          if (typeof emxExpandFilter != 'undefined') {
            if (emxExpandFilter == 0) {
              model.expandAll();
            } else {
              model.expandNLevels({
                numberOfLevelsToExpand: emxExpandFilter
              });
            }
          } else {
            model.expandNLevels({
              numberOfLevelsToExpand: 1
            });
          }
        }
        model.onPreExpand(this.onPreExpandFunction.bind(this));

        //TODO:
        // remove these globals settings once the global references as handled
        window.dataGridModel = model;
        window.urlUtils = URLUtils;

        return model;
      },

      createDataGrid: function(model, cols, typeRepsArray) {
        var rowSelection = URLUtils.getParameter("selection");
        if (!rowSelection) {
          rowSelection = "none";
        }

        // Create the DataGridView

        var uniqueIdentifierName = (URLUtils.getParameter("table") != undefined && URLUtils.getParameter("table") != "") ? URLUtils.getParameter("table") : URLUtils.getParameter("tableMenu");
        var that = this;
        var dataGridView = new DataGridView({
          identifier: uniqueIdentifierName,
          treeDocument: model,
          columns: cols,
          showModelChangesFlag: true,
//          showTreeIconsFlag: false,
          rowSelection: rowSelection,
          defaultColumnDef: {
            width: 'auto',
            minWidth: 40,
            resizableFlag: true,
            sortableFlag: true,
            allowUnsafeHTMLContent: false,
            getCellClassName: function(cellInfos) {
            	if (cellInfos.nodeModel) {
					var dataIndex = this.layout.getDataIndexFromColumnIndex(this.layout.getColumnIndex(cellInfos.columnID));
					dataIndex = (dataIndex == "tree") ? "treeLabel" : dataIndex;
					// if part - to fetch css keyholder for style program/function return each 	
					// else part - to fetch css keyholder for style row
					if (cellInfos.nodeModel.options.relData[0] && cellInfos.nodeModel.options.relData[0].styleValues && cellInfos.nodeModel.options.relData[0].styleValues[0].dataelements[dataIndex]   ) {
						return cellInfos.nodeModel.options.relData[0].styleValues[0].dataelements[dataIndex];
					} else if(cellInfos.nodeModel.options.grid.rowClass){
						return cellInfos.nodeModel.options.grid.rowClass;
					} else if (cellInfos.nodeModel.options.relData[0] && cellInfos.nodeModel.options.relData[0].styleColumn && cellInfos.nodeModel.options.relData[0].styleColumn[0].dataelements[dataIndex]   ) {
						return cellInfos.nodeModel.options.relData[0].styleColumn[0].dataelements[dataIndex];
					}
            	}
			},
            getCellEditableState: function(cellInfos) {
              if (!cellInfos) {
                return false;
              }
              var editableFlagFromColumn = dataGridView.layout.getColumnEditableFlag(cellInfos.columnID); // Setting 'Editable' at column level.
			 var editFalseForRootNode;
			if(cellInfos.nodeModel && cellInfos.nodeModel.options){
              editFalseForRootNode = cellInfos.nodeModel.options.grid.dgEditNode == 'false'; // URL parameter 'editRootNode'.
			}
              var dataIndex = this.layout.getDataIndexFromColumnIndex(this.layout.getColumnIndex(cellInfos.columnID)); // columnID can be columnIndex or dataIndex, but inside this function it will always be columnIndex.
              dataIndex = (dataIndex == "tree") ? "treeLabel" : dataIndex;
              var editableFlagAtRowLevel;
              if (cellInfos.nodeModel && cellInfos.nodeModel.options.grid.dgEditAccess != undefined)
                editableFlagAtRowLevel = cellInfos.nodeModel.options.grid.dgEditAccess[dataIndex] == 'true'; // Settings - 'Edit Access Mask' and 'Edit Access Program/Function' at row level.
              else
                editableFlagAtRowLevel = false;
              return editableFlagFromColumn && !editFalseForRootNode && editableFlagAtRowLevel;
            },
            getCellValueForExport: function(cellInfos) {
              var ret = "";
              var columnName = dataGridView.layout.getDataIndexFromColumnIndex(cellInfos.columnID);
              if (cellInfos.nodeModel && cellInfos.nodeModel.options.grid[columnName + "_export"]) {
                ret = cellInfos.nodeModel.options.grid[columnName + "_export"];
              } else if (cellInfos.rowID < 0) {
              return cellInfos.cellModel;
              } else if (cellInfos.cellModel && cellInfos.cellModel.label) {
                ret = cellInfos.cellModel.label;
              } else {
                ret = cellInfos.cellModel;
              }
              
              //function must return a string
              if(Number.isInteger(ret)){
  				ret = ret.toString();
  				return ret;
  			  }
              if (typeof ret === 'object' && Object.prototype.toString.call(ret) === '[object Date]') {
				  var timeInMil = Date.parse(ret.toString());
				  var newTimeString = new Date(timeInMil);
				  ret =  ('0' + (newTimeString.getMonth() + 1)).substr(-2) + '/' + ('0' + newTimeString.getDate()).substr(-2) + '/' + newTimeString.getFullYear();
				  return ret;
			  }
              return ret;
            },
          },
          rowGroupingOptions: {
            depth: numberOfNodesByDepth
          },
          onContextualEvent: that.onContextualEvent.bind(that),
          getCellTooltip: function(cellInfos) {
        	  var leafColumn = dgView.layout.getLeafColumns()[cellInfos.columnID];
            	if (cellInfos.nodeModel == undefined && cellInfos.rowID == -1 && leafColumn.icon != undefined) {
      			return {shortHelp: leafColumn.tooltip, updateModel: false};
      		  } else {
      			if(leafColumn.tooltip != undefined){
					return {shortHelp: leafColumn.tooltip, updateModel: false};
				}else{
					return dataGridView.getCellDefaultTooltip(cellInfos);
				}

      		  }
          },
          selectionMode: 'cell'
        });			
	var lazyLoad = new Number(URLUtils.getParameter("lazyLoad"));
	if(lazyLoad < 0){
		lazyLoad  = 0;
	}
        var fastCol = URLUtils.getParameter("fastColumns");
        if (lazyLoad > 0 && typeof fastCol != "undefined") {
          dataGridView.onDelayedModelDataRequest = function(params) {
            //console.log(params);
            //console.log(params.startNodeIndex + " to " + params.endNodeIndex);
            var payLoadArray = [];
            for (var i = params.startNodeIndex; i <= params.endNodeIndex; i++) {
              if (dataGridView.model[i] && !dataGridView.model[i].getAttributeValue("columnsFilled")) {
                payLoadArray.push(dataGridView.model[i]);
                //dataGridView.model[i].setAttribute("columnsFilled", true);
              }
            }
            if (payLoadArray.length > 0) {
              StandardFunctions.refreshRowByRowId(payLoadArray);
            }
          };
        }
        dataGridView.treeNodeCellOptions.showIconsFlag = false; // to avoid duplicate typeIcons on the GridView because we are rendering typeIcons through cellValue callbacks
        dataGridView.selectionBehavior.unselectAllOnEmptyArea = false; // to change the default behavior of unselecting when clicking on empty area
        
		dataGridView.layout.getLeafColumns().every(function(indColumn) {
			if (indColumn.droppable/*draggable*/ === 'true' && typeof indColumn.dropRelationships != 'undefined' && typeof indColumn.dropDirections != 'undefined') {
				connector.prototype.droppable/*draggable*/ = true;
				connector.prototype.dropTypesHierarchy = indColumn.dropTypesHierarchy;
				connector.prototype.dropAction = indColumn.dropAction;
				connector.prototype.dropItems = indColumn.dropItems;
				connector.prototype.dropRelationshipsArray = indColumn.dropRelationships.split(',');
				connector.prototype.dropDirectionsArray = indColumn.dropDirections.split(',');
				return false;
			} else {
				return true;
			}
		});

		if (gridType != 'NONE' && true === connector.prototype.droppable/*draggable*/) {
			dataGridView.cellDragEnabledFlag = true;
			dataGridView.onDragStartCell = function(event, cellInfo) {
				if (StandardFunctions._privateGetSelectedNodes().length > 0) {
					connector.prototype.draggedItems = StandardFunctions._privateGetSelectedNodes();
				} else {
					connector.prototype.draggedItems = new Array(cellInfo.nodeModel);
				}

				event.dataTransfer.setData('text', 'drag started');
	            /*this.draggedItems.forEach(function(draggedItem) { //as removing dropJPO code
	            	draggedItem.options.grid['dgvDraggedFromWindow'] = window.name;
	            });*/
			};
			dataGridView.onDragOverCell = function(event, cellInfo) {
				event.preventDefault();
			};
			dataGridView.onDropCell = function(event, cellInfo) {
				//var dropTypes = dgView.layout.getLeafColumns()[0].dropTypes; //not needed

				if (connector.prototype.draggedItems.length == 0 || (connector.prototype.dropItems == "Single" && connector.prototype.draggedItems.length > 1)) {
					event.preventDefault();
					return;
				}

				for (var i = 0; i < connector.prototype.draggedItems.length; i++) {
					var draggedItem = connector.prototype.draggedItems[i];
					if(draggedItem._parentNode === cellInfo.nodeModel) {
						return false;
					}
				}

				if (typeof connector.prototype.dropTypesHierarchy != 'undefined') {
					var finalDropTypesArray = new Array();
					var finalDropRelationshipsArray = new Array();
					var finalDropDirectionsArray = new Array();

					var dropTypeNamesGroups = connector.prototype.dropTypesHierarchy.split(',');
					for (var i = 0; i < dropTypeNamesGroups.length; i++) {
						var dropTypeNamesGroup = dropTypeNamesGroups[i];
						dropTypeNamesGroup.split('->').forEach(function(dropTypeName) {
							finalDropTypesArray.push(dropTypeName);
							finalDropRelationshipsArray.push(connector.prototype.dropRelationshipsArray[i]);
							finalDropDirectionsArray.push(connector.prototype.dropDirectionsArray[i]);
						});
					}

					connector.prototype.draggedItems.forEach(function(draggedItem) {
						var found = false;

						for (var i = 0; i < finalDropTypesArray.length; i++) {
							if (finalDropTypesArray[i] == draggedItem.options.grid.type) {
			                    /*var colName = dgView.layout.getDataIndexFromColumnIndex(cellInfo.columnID); //as removing dropJPO code
			                    if(colName == 'tree') {
			                    	colName = dgView.layout.getLeafColumns()[0].clDgvColumnName;
			                    }

			                    draggedItem.options.grid['dgvDroppedOnColumnName'] = colName;*/
								draggedItem.options.grid['dgvStructChangesRelName'] = finalDropRelationshipsArray[i]; //has to be according to index of DropTypes, not DropTypesHierarchy - fix later
								draggedItem.options.grid['dgvStructChangesRelDirection'] = finalDropDirectionsArray[i]; //has to be according to index of DropTypes, not DropTypesHierarchy - fix later
								/*draggedItem.options.grid['dgvDroppedOnWindow'] = window.name;*/ //as removing dropJPO code
								found = true;
								break;
							}
						}

						if (!found) {
							event.preventDefault();
							return;
						}
					});
				}

				var commitPaste = URLUtils.getParameter('pasteCommited');
				if (StandardFunctions.isNullOrEmpty(commitPaste) || commitPaste != 'true') {
					commitPaste = false;
				} else {
					commitPaste = true;
				}

				var logsDialog = new WUXDialog({
					title: nlsMessageJSON.title,
					immersiveFrame: new WUXImmersiveFrame().inject(document.body),
					modalFlag: true,
					buttons: {
						/*actually Copy*/
						Ok: new WUXButton({
							label: nlsMessageJSON.copy,
							onClick: function(event) {
								if(typeof connector.prototype.dropAction != 'undefined' && connector.prototype.dropAction.split(',').indexOf('Copy') == -1) {
									event.preventDefault();
									return;
								}

								StandardFunctions.dropCells(connector.prototype.draggedItems, cellInfo.nodeModel, 'Copy' /*action*/ , commitPaste);
								connector.prototype.draggedItems.forEach(function(draggedItem) {
									delete draggedItem.options.grid.dgvStructChangesRelName;
									delete draggedItem.options.grid.dgvStructChangesRelDirection;
								});

								connector.prototype.draggedItems = new Array();
								event.dsModel.dialog.close();
								event.dsModel.dialog.destroy();
							}
						}),
						/*actually Move*/
						Apply: new WUXButton({
							that: this,
							label: nlsMessageJSON.move,
							onClick: function(event) {
								if(typeof connector.prototype.dropAction != 'undefined' && connector.prototype.dropAction.split(',').indexOf('Move') == -1) {
									event.preventDefault();
									return;
								}

								StandardFunctions.dropCells(connector.prototype.draggedItems, cellInfo.nodeModel, 'Move' /*action*/ , commitPaste);
								connector.prototype.draggedItems.forEach(function(draggedItem) {
									delete draggedItem.options.grid.dgvStructChangesRelName;
									delete draggedItem.options.grid.dgvStructChangesRelDirection;
								});

								connector.prototype.draggedItems = new Array();
								event.dsModel.dialog.close();
								event.dsModel.dialog.destroy();
							}
						}),
						Cancel: new WUXButton({
							label: nlsMessageJSON.cancel,
							onClick: function(event) {
								connector.prototype.draggedItems = new Array();
								event.dsModel.dialog.close();
								event.dsModel.dialog.destroy();
							}
						})
					}
				});

				event.dataTransfer.clearData();
			};
		}


		/*model.prepareUpdate();
		 //TODO push below code to another file

        var typeTemplate = {
          tweakerButtonIcon: {
            path: 'DS/ENXDataGrid/TweakerButtonIcon',
            options: {}
          },
          rmbMenuTweaker: {
            path: 'DS/ENXDataGrid/TweakerButtonIcon',
            options: {}
          }

        };
        var typeReps = {
          "actionButtonNewWindow": {
            "stdTemplate": "tweakerButtonIcon",
            "semantics": {
              "icon": "../../common/images/iconActionNewWindow.gif",
              "displayStyle": "buttonIcon"
            },
            "tooltip": {
              "text": "New Window",
              "position": "Bottom"
            }
          }
        }
        dataGridView.getTypeRepresentationFactory().registerTypeTemplates(typeTemplate);
        dataGridView.getTypeRepresentationFactory().registerTypeRepresentations(typeReps);*/

		model.withTransactionUpdate(function(){
			if (typeRepsArray) {
		          for (var i = 0; i < typeRepsArray.length; i++) {
		            var typeRepObject = {};
		            typeRepObject[typeRepsArray[i].id] = {
		              "semantics": JSON.parse(typeRepsArray[i].dataelements.semantics),
		              "stdTemplate": typeRepsArray[i].dataelements.standardTemplate
		            }
		            dataGridView.getTypeRepresentationFactory().registerTypeRepresentations(typeRepObject);
		          }
		        }
		});


        //model.pushUpdate();
        return dataGridView;
      },

      //triggered on the right click of the cell or column in
      onContextualEvent: function onContextualEvent(params) {
        var scope = this;
        return new UWA.Promise(function(resolve, reject) {
          if (URLUtils.getParameter("showRMB") != "false") {
            var menu = [];

            var cellInfos = params.cellInfos;
            if (params && params.collectionView) {


              if (cellInfos.rowID != -1) {
                var type = cellInfos.nodeModel.options.grid.type;
                var cellID = cellInfos.nodeModel.options.grid.id;

                var relId = (cellInfos.nodeModel.options.grid.relId != undefined) ? cellInfos.nodeModel.options.grid.relId : "";

                var rowId = cellInfos.nodeModel.options.grid.rowId;
                rowId = (typeof rowId === "undefined") ? cellInfos.rowID : rowId;

                var parentObject = cellInfos.nodeModel.getParent();
                var parentId;
                if (typeof parentObject != "undefined") {
                  parentId = (parentObject.options.grid.id != undefined) ? parentObject.options.grid.id : "";
                }

                var emxTableRowId = relId + "|" + cellID + "|" + parentId + "|" + rowId;
                emxTableRowId = encodeURI(emxTableRowId);

                var rmbMenuServiceURL = "../../resources/v1/ui/rmbMenu/getRMBMenu?RMB_ID=" + cellID + "&frmRMB=true&rmbTableRowId=" + emxTableRowId + "&uiType=structureBrowser&currentView=detail&sbMode=view&IsStructureCompare=FALSE&isGrid=true";
                var supportedMenus = [];
                var dataEntries, dataModule, dataFunction;

                var queryOptions = {
                  type: 'json',
                  onComplete: function(jsonData) {

                    var entries;
                    entries = jsonData.data[0].relateddata.entries;
                    supportedMenus = scope.createSupportedMenusArray.call(scope, entries, supportedMenus);

                    supportedMenus.forEach(function(menuItem) {

                      if (menuItem.label == "separator") {
                        menu.push({
                          type: 'SeparatorItem',
                          title: ''
                        });
                      } else {

                        if (menuItem.children.length <= 0) {
                        	var rmbIcon = (typeof menuItem.icon != "undefined") ? "../" + menuItem.icon : undefined;
                          menu.push({
                            type: 'PushItem',
                            title: menuItem.label,
                            icon: rmbIcon,
                            action: {
                              context: {
                                cellInfos: params.cellInfos,
                                menuDetails: menuItem
                              },
                              callback: function(d) {

                                scope.rmbCallback(d);

                              }
                            }

                          })
                        }

                        scope.rmbSubMenuBuilder(menu, menuItem, params);
                      }


                    });

                    resolve(menu);

                  },

                  onError: function() {
                    alert("response failed");
                  }

                }
                WAFData.authenticatedRequest(rmbMenuServiceURL, queryOptions);
              } else if (cellInfos.rowID == -1) {
                menu = params.collectionView.buildDefaultContextualMenu(params);
                resolve(menu);
              }
            }

          }

        })


      },


      setHeader: function(header, isSubHeader) {
        if (this.uiPanel.header == null) {
          this.uiPanel.header = new UWA.Element('div');
        }
        if (header) {
          if (isSubHeader) {
            new UWA.Element('h3', {
              text: header
            }).inject(this.uiPanel.header);
          } else {
            new UWA.Element('h1', {
              text: header
            }).inject(this.uiPanel.header);
          }
        }
      },

      setCancelButton: function(label) {
      	JQuery(".wux-windows-immersive-frame").css("bottom", "52px");
        var cancelButton = JQuery('<button type="button" class="btn btn-default">' + label + '</button>');
        cancelButton.click(function() {
          top.close();
        });

        cancelButton.appendTo(JQuery(".modal-footer"));
      },

      setSubmitButton: function(label, url) {
      	JQuery(".wux-windows-immersive-frame").css("bottom", "52px");
        var doneButton = JQuery('<button type="button" class="btn btn-primary">' + label + '</button>');
        doneButton.click(function() {
          StandardFunctions.executeListHiddenSubmitAction({
            "href": url.replace(/%2F/gi, "/")
          });
        });
        doneButton.appendTo(JQuery(".modal-footer"));

      },


      /**
      // TODO - as setToolbar method belongs to toolbarClient, it has to be moved to ENXSBToolbarClient.js
      **/
      setToolbar: function(newToolbar) {
        var that = this;
        if (this.uiPanel.header == null) {
          this.uiPanel.header = new UWA.Element('div');
        }

        dgToolbar = this.gridView.setToolbar(newToolbar);
        dgToolbar.inject(this.uiPanel.header);

        addEventListenersTo.forEach(function(nodeModelEntry) {
          // First, we need to retrieve the nodeModel corresponding to the comboBox
          var nodeModel = dgToolbar.getNodeModelByID(nodeModelEntry.nodeModelId);

          if (typeof nodeModel != 'undefined') {
            //add callback to the nodeModel, which will be called every time an attribute is modified in the model
            nodeModel.onAttributeChange(function(e) {
              //require(['DS/ENXSBGridConnector/StandardFunctions'], function(StandardFunctions) {
              var nodeModelData = e.target.options.grid.data;

              var args = {
                context: e.target,
                href: nodeModelEntry.argument.href,
                methodArgs: nodeModelData
              };
              StandardFunctions.executeJSAction(args);
              //});
            });
          }
        });

        var customHandlersForTableViews = [tableViewEventListener, expandProgramViewEventListener];
        customHandlersForTableViews.forEach(function(viewEventListener) {
          viewEventListener.forEach(function(nodeModelEntry) {
            // First, we need to retrieve the nodeModel corresponding to the comboBox
            var nodeModel = dgToolbar.getNodeModelByID(nodeModelEntry.nodeModelId);

            if (typeof nodeModel != 'undefined') {
              //add callback to the nodeModel, which will be called every time an attribute is modified in the model
              nodeModel.onAttributeChange(function(e) {
                var nodeModelData = e.target.options.grid.data;
                var typeRepString = e.target.options.grid.typeRep;
                var possibleValues = that.gridView.getTypeRepresentationFactory().typeReps[typeRepString].semantics.possibleValues;
                var attributeActualValue;
                for (var i in possibleValues) {
                  if (nodeModelData == possibleValues[i].value) {
                    attributeActualValue = possibleValues[i].actualValue;
                  }
                }
                var executeModule = nodeModelEntry.argument.module;
                var executeFunction = nodeModelEntry.argument.func;
                var argument = nodeModelEntry.argument.urlParam;

                require([executeModule], function(requiredModule) {
                  var func = requiredModule[executeFunction];
                  if (func && typeof func === 'function') {
                    console.log(typeof func);
                    func.call(requiredModule, argument, attributeActualValue);
                  }

                });
              });
            }
          });

        });
        return dgToolbar;
      },

      rmbSubMenuBuilder: function(menu, menuItem, params) {
        if (menuItem.children.length > 0) {
          var subMenu = [];
          this.rmbMenuBuilder.call(this, subMenu, params, menuItem.children);
          var rmbIcon = (typeof menuItem.icon != "undefined") ? "../" + menuItem.icon : undefined;
          menu.push({
            type: 'PushItem',
            title: menuItem.label,
            icon: rmbIcon,
            submenu: subMenu
          })
          //		        this.rmbSubMenuBuilder(subMenu,);
        }

      },

      rmbMenuBuilder: function(menu, params, menuItems) {
        var that = this;
        for (var i = 0; i < menuItems.length; i++) {
          var menuItem = menuItems[i];
          var rmbIcon = (typeof menuItem.icon != "undefined") ? "../" + menuItem.icon : undefined;
          menu.push({
            type: 'PushItem',
            title: menuItem.label,
            icon: rmbIcon,
            action: {
              context: {
                cellInfos: params.cellInfos,
                menuDetails: menuItem
              },
              callback: function(d) {

                that.rmbCallback(d);

              }
            }

          })
        }

      },

      //	    on click of a command evaluate the params and call the method
      rmbCallback: function(value) {
        console.log("the value of this here: ");
        console.log(value);
        var executeModule = value.context.menuDetails.dataModule;
        var executeFunction = value.context.menuDetails.dataFunction;
        var argument = value.context.menuDetails.argument;
        var rowId = value.context.cellInfos.rowID;
        var id = value.context.cellInfos.nodeModel.options.grid.id;

        require([executeModule], function(requiredModule) {
          var func = requiredModule[executeFunction];
          if (func && typeof func === 'function') {
            console.log(typeof func);
            func.call(requiredModule, argument);
          }

        });
      },


      //	    iterate through the json and create an array of menus and commands for the contextual menu
      createSupportedMenusArray: function(entries, supportedMenus) {

        var that = this;
        for (var i = 0; i < entries.length; i++) {
          var children = [];
          var dataEntries = JSON.parse(entries[i].dataelements.data);
          var menu = {
            id: entries[i].id,
            typeRepresentation: entries[i].dataelements.typeRepresentation,
            label: entries[i].dataelements.label,
            icon: entries[i].dataelements.icon,
            dataModule: dataEntries.module,
            dataFunction: dataEntries.func,
            argument: dataEntries.arguments,
            href: entries[i].dataelements.href,
            children: children

          };

          supportedMenus.push(menu);

          if (entries[i].children.length != 0) {
            var children = [];
            children = that.createSupportedMenusArray(entries[i].children, children);
            menu.children = children;
          }


        }
        return supportedMenus;
      },

      saveEdits: function() {
        var url = '../../resources/v1/ui/gridview?massPromoteDemote=true&relationships=&filterGlobal=&toolbar=IssueToolBar&selection=multiple&table=IssueList&freezePane=Name,Edit,NewWindow&program=emxCommonIssue:getIssuescockpitItems&header=emxFramework.String.IssuesSummary&suiteKey=Framework&ticket=ST-60-94hsuiCZKxMHsVE6rFcZ-cas';
        var saveEditedObjects = {
          method: 'PUT',
          data: JSON.stringify(editMap),
          onComplete: function(result) {
            console.log("request sent to save" + result);
          }

        }
        WAFData.authenticatedRequest(url, saveEditedObjects);
      },

      reloadPossibleValues: function(cellInfos) {
    	var possibleValues;
    	if(cellInfos.nodeModel.options.relData != undefined && cellInfos.nodeModel.options.relData[0].reloadPossibleValues != undefined){
    		var dataelements = cellInfos.nodeModel.options.relData[0].reloadPossibleValues[0].dataelements;
            var columnName = dgView.layout.getLeafColumns()[cellInfos.columnID].id;

            if(dataelements != undefined && dataelements[columnName] != undefined){
            	possibleValues = JSON.parse(dataelements[columnName]);
            	if(!ifExistsInArray(cellInfos.cellModel)){
            		possibleValues.push({"actualValue":cellInfos.cellModel,"value":cellInfos.cellModel});
            	}
            return {
                  possibleValues: possibleValues
                };
            }
            else{
            	return null;
            }

           function ifExistsInArray(searchValue){
        	   if(possibleValues != undefined){
        		   for (var i = 0; i < possibleValues.length; i++) {
               		if (possibleValues[i].value == searchValue) {
               			return true;
               		}
               	}
        	   }
          	  return false;
            }
    	}


      },
	  
	  typeAheadService: function(typeAheadJPO, typeAheadMethod , text, typeAheadMapValue) {
		return new Promise(function (resolve, reject) {
        var url = '../../resources/v1/ui/gridview/typeAheadList';
		url = url + '?typeAheadJPO='+ typeAheadJPO + '&typeAheadMethod='+ typeAheadMethod+'&filter='+text;
        var typeAheadServiceObjects = {
          method: 'POST',
		  data: typeAheadMapValue,
          onComplete: function(result) {
          resolve(result);
          }

        }
        WAFData.authenticatedRequest(url, typeAheadServiceObjects);
		}) ;
      },

      /**
       * This method processes the response data from the 6WFramework webservice to a format accepted by the DataGrid component
       * @param {Object} result - JSON object response from the webservice
       */
      processWebServiceData: function(result) {
        var connectorStartTime = performance.now();
        console.log(result);

        var rows = [],
          columns = [],
          columnsForDisplayModes = [],
          children = [],
          typeRepsArray = [];
        var displayViewColumnsArray = [];
        var preProcessEditableFlag, preProcessMessage, preProcessMessageType;

        var dataSize = result.data.length;
        // iterate only when the data array has more than one element
        if (dataSize >= 1) {
          var rowData, columnData;
          for (var i = 0; i < dataSize; i++) {
            rowData = result.data[i].relateddata.rowData;
            columnData = result.data[i].relateddata.columns;
            preProcessEditableFlag = (result.data[i].relateddata.preProcessDetails[0].dataelements.action == 'continue');
            preProcessMessage = result.data[i].relateddata.preProcessDetails[0].dataelements.message;
            preProcessMessageType = (preProcessEditableFlag === true) ? 'success' : 'error';
            typeRepsArray = result.data[i].relateddata.typeRepresentations;

            performanceLogs['serverLogs'] = result.data[i].relateddata.performanceLogs;
            /*
            var dateColumns = new Array();
            for (var j = 0; j < columnData.length; j++) {
              if (columnData[j].dataelements.typeRepresentation == "date" || columnData[j].dataelements.typeRepresentation == "datetime") {
                dateColumns.push(columnData[j].id);
              }
            }
			*/
            for (var j = 0; j < rowData.length; j++) {
              /*if (rowData[j].dataelements.typeIcon == undefined) {
                rowData[j].dataelements.typeIcon = ""
              }

              this.processChildsTypeIcon(rowData[j]);
*/
            	rows.push(rowData[j]);
            }

            columns = ConnectorColumnManagement.mapColumns(columnData, preProcessEditableFlag, displayViewColumnsArray);
            columnsForDisplayModes = ConnectorColumnManagement.getColumnsForDisplayModes();
          }
        }

        var connectorGridTime = (performance.now() - connectorStartTime);
        performanceLogs['clientLogs'] = {};
        performanceLogs['clientLogs']['connectorGridTime'] = connectorGridTime;
        console.log("time taken for the gridConnector:" + connectorGridTime + "ms");

        if (typeof result.data[0].dataelements.gridType != 'undefined') {
          gridType = result.data[0].dataelements.gridType;
        }

        var renderGridStartTime = performance.now();

        this.process(document.body, rows, columns, typeRepsArray, columnsForDisplayModes);
        if ("true" != URLUtils.getParameter("portalMode") || "false" != URLUtils.getParameter("showPageHeader") || URLUtils.getParameter("treeLabel").length == 0) {
          if (result.data[0].dataelements.header != "") {
            this.setHeader(result.data[0].dataelements.header, false);
          }
          if (result.data[0].dataelements.subHeader != "") {
            this.setHeader(result.data[0].dataelements.subHeader, true);
          }
        }
        dgView.ENX_ExportHeader = result.data[0].dataelements.header;
		dgView.ENX_ExportSubHeader = result.data[0].dataelements.subHeader;
        var submitURL = URLUtils.getParameter("submitURL");
        if (submitURL != null && submitURL.length > 0) {
          this.setSubmitButton(result.data[0].dataelements.submitLabel, submitURL);
        }

        var cancelLabel = URLUtils.getParameter("cancelLabel");
        if (cancelLabel != null && cancelLabel.length > 0) {
          this.setCancelButton(result.data[0].dataelements.cancelLabel);
        }

        var renderGridTime = (performance.now() - renderGridStartTime);
        performanceLogs['clientLogs']['renderGridTime'] = renderGridTime;

        if (typeof preProcessMessage != 'undefined' && preProcessMessage !== null) {
          require(['DS/ENXSBGridConnector/StandardFunctions'], function(StandardFunctions) {
            StandardFunctions.showTransientMessage(preProcessMessage, preProcessMessageType);
          });
        }
      },

      // method to handle typeIcon property for the dataelements of children.
      // If there is no typeIcon property then set an empty string by default
      processChildsTypeIcon: function(rowData) {
        if (rowData.children.length > 0) {
          for (var i = 0; i < rowData.children.length; i++) {
            var childData = rowData.children[i];
            if (childData.dataelements.typeIcon == undefined) {
              childData.dataelements.typeIcon = ""
            }

            this.processChildsTypeIcon(childData);
          }
        }
      }


    });

    connector.prototype.dataGridDisplayDetails= function() {
        Utils.saveDataInLocalPreferences(dgView, "wux-collectionView-dataGridView", "displayView", "details");
        var toolbarRef = StandardFunctions.getToolbarReference();
        if (toolbarRef != undefined) {
          StandardFunctions.updateToolbarEntry("DataGridDisplayDetails", '[{"icon":"../../common/images/utilCheckboxChecked.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridDisplayThumbnail", '[{"icon":"../../common/images/iconActionThumbnail-view.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridDisplayGraph", '[{"icon":"../../common/images/iconActionGraphView.png"}]');
          toolbarRef.getNodeModelByID("DataGridWrapCommand").updateOptions({
            disabled: undefined
          }); //cannot do it with StandardFunctions.updateToolbarEntry, as undefined can't be passed in a JSON string
        }

        var immersiveFrameContainer = document.body.getElementsByClassName("wux-controls-abstract wux-windows-immersive-frame wux-ui-is-rendered");
        var tableContainer;
        if (immersiveFrameContainer.length > 1) {
//          tableContainer = immersiveFrameContainer[immersiveFrameContainer.length - 1];
          tableContainer = immersiveFrameContainer[1];
        } else {
          var tempContainer = document.body.getElementsByClassName("wux-layouts-collectionview")[0];
          if (tempContainer != undefined && tempContainer.getAttribute("layout") != "ResponsiveThumbnailsCollectionViewLayout")
            tableContainer = tempContainer
        }


        //var divTable = document.body.getElementsByClassName("wux-layouts-collectionview wux-controls-abstract wux-layouts-datagridview")[0];
        var divThumbnail = document.getElementById("divThumbnail");
        var divEGraph = document.getElementById("divEGraph");

        if (typeof tableContainer == "undefined") {
          var divTable = document.body.getElementsByClassName("wux-windows-window-content wux-element-contentbox")[0];
          var immersiveFrame = new WUXImmersiveFrame().inject(divTable);
          this.createDataGridTable(dgView, dataGridModel, immersiveFrame);
        } else {
          tableContainer.style.display = "block";
        }
        if (typeof divThumbnail != "undefined" && divThumbnail != null)
          divThumbnail.style.display = "none";
        if (typeof divEGraph != "undefined" && divEGraph != null)
          divEGraph.style.display = "none";
		Toolbar.enableDisableItems("details", dataGridModel.getSelectedNodes().length);
      },

    connector.prototype.dataGridDisplayThumbnail= function() {
		if(dgView.findWidget){
			dgView.findWidget.hide();
	    }
        Utils.saveDataInLocalPreferences(dgView, "wux-collectionView-dataGridView", "displayView", "thumbnail");
        var toolbarRef = StandardFunctions.getToolbarReference();
        if (toolbarRef != undefined) {
          StandardFunctions.updateToolbarEntry("DataGridDisplayThumbnail", '[{"icon":"../../common/images/utilCheckboxChecked.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridDisplayGraph", '[{"icon":"../../common/images/iconActionGraphView.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridDisplayDetails", '[{"icon":"../../common/images/iconActionTreeListView.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridWrapCommand", '[{"disabled": "true"}]');
        }


        StandardFunctions.refreshColumnValues("DataGridImageTable.Image",true,false)
        .then(function(){
        	var nodes = StandardFunctions._privateGetNodesBase(true);
        	ENXThumbnailGridViewBuilder.createThumbnailGridView(displayModesColumnsArray, nodes);
        });
		Toolbar.enableDisableItems("thumbnail", dataGridModel.getSelectedNodes().length);

      },

      connector.prototype.dataGridDisplayGraph= function() {
		if(dgView.findWidget){
			dgView.findWidget.hide();
	    }
        Utils.saveDataInLocalPreferences(dgView, "wux-collectionView-dataGridView", "displayView", "graph");
        var toolbarRef = StandardFunctions.getToolbarReference();
        if (toolbarRef != undefined) {
          StandardFunctions.updateToolbarEntry("DataGridDisplayGraph", '[{"icon":"../../common/images/utilCheckboxChecked.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridDisplayThumbnail", '[{"icon":"../../common/images/iconActionThumbnail-view.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridDisplayDetails", '[{"icon":"../../common/images/iconActionTreeListView.png"}]');
          StandardFunctions.updateToolbarEntry("DataGridWrapCommand", '[{"disabled": "true"}]');
        }


        //TODO
        // this graph is a global variable declred in ENXSBGridConnectionHTML.js.
        // It is a workaround to get the graph instance in the eGraph toolbar functions in StandardFunctions
        // this has to be modified either when the Techno provides a hook to access the graph instance in the toolbar arguments
        // or during architectural change
        StandardFunctions.refreshColumnValues("DataGridImageTable.Image",true,false)
        .then(function(){
        	var nodes = StandardFunctions._privateGetNodesBase(true);
        	ENXGraphBuilder.createGraphView(displayModesColumnsArray, nodes);
        });
		Toolbar.enableDisableItems("graph", dataGridModel.getSelectedNodes().length);

      }

    return connector;

  });
