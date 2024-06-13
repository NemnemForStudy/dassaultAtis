/*
 * This file is created to provide compatibility for some of the SB specific functions
 * If any support has to be provided to the methods related to emxEditableTable or editableTable,
 * they should be added here in this file
 */

define('DS/ENXSBGridConnector/SBFunctionsSupport',
		['DS/ENXSBGridConnector/StandardFunctions',
		 'emxUIConstants',
		 'DS/ENOFrameworkPlugins/jQuery'],
		function(
				StandardFunctions,
				emxUIConstants,
				$
				)
	{
	var apiSupportFunctions = {};

	apiSupportFunctions.refreshSBTable = function(){
		location.reload();
	};
	apiSupportFunctions.rebuildView = function(){

	};

	apiSupportFunctions.toggleProgress = function(args) {
		if(args=="visible"){
			StandardFunctions.toggleProgress(emxUIConstants.STR_LOADING);
		}else if(args=="hidden"){
			StandardFunctions.removeToggleProgress();
		}
	};

	apiSupportFunctions.updateoXML = function(xmlResponse) {

	};

	apiSupportFunctions.postDataXML = {
			loadXML: function(args) {

			}
	};

	apiSupportFunctions.showLifeCycleIcons = function(obj, showIcons) {
		if(showIcons) {
			$(obj).find("td#lifeCycleSectionId").css('visibility', 'visible');
		} else {
			$(obj).find("td#lifeCycleSectionId").css('visibility', 'hidden');
		}
	}

	apiSupportFunctions.RefreshTableHeaders = function(){

	};
	
	apiSupportFunctions.removedeletedRows = function(xmlResponse){
		 var responseDOM = emxUICore.createXMLDOM();
		 responseDOM.loadXML(xmlResponse);
		 emxUICore.checkDOMError(responseDOM);
		 var deletedRows    = emxUICore.selectNodes(responseDOM, "/mxRoot/item");
		 for (var i = 0; i < deletedRows.length; i++)
		    {
		        var rowId = deletedRows[i].getAttribute("id");
		        var node = StandardFunctions._privGetNodeByRowId(rowId)[0];
		        node._parentNode.removeChild(node);
		    }
	};
	
	apiSupportFunctions.getCheckedCheckboxes = function(){
		var checkboxArray = new Object();
		var selectedNodes = StandardFunctions._privateGetSelectedNodes();
		for(var i = 0; i < selectedNodes.length; i++){
			var rowData = selectedNodes[i].options.grid;
			var objectId = rowData.id;
			var parentId = (typeof selectedNodes[i].getParent().options.grid.id != "undefined") ? selectedNodes[i].getParent().options.grid.id : "";;

			var relId = (rowData.relId!=undefined)? rowData.relId : "";
			var rowId = (rowData.rowId!=undefined)? rowData.rowId : "0,"+nodes[i]._rowID;
			var totalRowInfo = relId + "|" + objectId + "|" + parentId + "|" + rowId;
			checkboxArray[totalRowInfo] = totalRowInfo;
				
		}
		return checkboxArray; 
	};
	
	apiSupportFunctions.preValidationsForEdit = function(rowsId,action){
		if(rowsId.length == 0){
            alert(emxUIConstants.STR_SBEDIT_NO_SELECT_NODES);
            return true;
		}else
	    {
	         for(var i = 0 ;i < rowsId.length; i++){
                var level = rowsId[i].getAttributeValue("level");
                    if(action != "paste-as-child" && action != "undo"){
                        if(level == "0"){
                           alert(emxUIConstants.STR_SBEDIT_ROOT_NODE_OPERATION);
                           return true;
                        }
                    }
                    if(action=="cut" || action=="copy"){
                        var statusofRow = rowsId[i].getAttributeValue("status");
                        if(statusofRow == "cut"||statusofRow == "add"||statusofRow == "resequence"||statusofRow == "changed"){
                            alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OPERATION);
                            return true;
                        }
                    }
                    if(action!="undo"){
                        var statusofRow = rowsId[i].getAttributeValue("status");
                        if(statusofRow == "cut"||statusofRow == "resequence"||statusofRow == "changed"){
                            alert(emxUIConstants.STR_SBEDIT_NO_EDIT_OPERATION);
                            return true;
                        }
                    }
	         }

	    }
		
	};
	
	apiSupportFunctions.emxEditableTable = {

			addToSelected: function(xmlOut) {
				console.log('Global function \'addToSelected\' is deprecated. Please use \'StandardFunctions.addNodes( )\'');

				// convert string into xml
				var objDOM = emxUICore.createXMLDOM();
			    objDOM.loadXML(xmlOut);
			    emxUICore.checkDOMError(objDOM);

			    // extract information from xml
			    var rows = [], referenceId;
			    var rowColumns = {};
			    emxUICore.selectNodes(objDOM, '/mxRoot//item').forEach(function(item) {
			    															var row = {
			    																'id': ((typeof item.getAttribute('o') != 'undefined' && item.getAttribute('o') != null) ? item.getAttribute('o') : (typeof item.getAttribute('oid') != 'undefined' && item.getAttribute('oid') != null) ? item.getAttribute('oid') : ''),
			    																'relId': ((typeof item.getAttribute('r') != 'undefined' && item.getAttribute('r') != null) ? item.getAttribute('r') : (typeof item.getAttribute('relId') != 'undefined' && item.getAttribute('relId') != null) ? item.getAttribute('relId') : ''),
			    																'rowId': ((typeof item.getAttribute('id') != 'undefined' && item.getAttribute('id') != null) ? item.getAttribute('id') : (typeof item.getAttribute('rowId') != 'undefined' && item.getAttribute('rowId') != null) ? item.getAttribute('rowId') : '')
			    															};
			    															rows.push(row);
			    															referenceId = ((typeof item.getAttribute('pasteAboveToRow') != 'undefined' && item.getAttribute('pasteAboveToRow') != null) ? item.getAttribute('pasteAboveToRow') : '');

			    															var cols = {};
																			if (item.childNodes != null && (Array.isArray(item.childNodes) || item.childNodes instanceof NodeList)) {
																				for (var i = 0; i < item.childNodes.length; i++) {
																					if('column' == item.childNodes[i].tagName) {
																						cols[item.childNodes[i].getAttribute('name')] = item.childNodes[i].textContent;
																					}
																				}
																			}

			    															rowColumns[row.id] = cols;
			    														});
			    var parentId = emxUICore.selectSingleNode(objDOM, '/mxRoot//item').getAttribute('pid');
			    var dbSavePending = (emxUICore.selectSingleNode(objDOM, '/mxRoot/data').getAttribute('status') == 'pending') ? true : false;
			    
			    // SR dbsavePending is coming false (addToSelected: function SBFunctionsSupport.js), from below inserting below. Hence changed code
			    var actionMode = emxUICore.selectSingleNode(objDOM, "/mxRoot/data").getAttribute("pasteBelowOrAbove");
			    if(!dbSavePending &&  actionMode && actionMode == "true" ){
			    	dbSavePending=true;
			    } 
 
			    // call our actual API
			    StandardFunctions.addNodes(rows, parentId, referenceId, rowColumns, dbSavePending);
			},

			checkDataModified: function(){
			    StandardFunctions.isDataModified();
			},

			expand: function(arrRowIds, expandLevel){
				if(StandardFunctions.isDataModified()){
					alert(emxUIConstants.STR_EXPANDALLALERT);
					return;
				}
				var selectedNodeModels = [];
				arrRowIds.forEach(function(rowId){
					selectedNodeModels.push(StandardFunctions._privGetNodeByRowId(rowId)[0]);
				});

				var fn = function() {
					StandardFunctions.getDataGridModel().setUseChangeTransactionMode(false);

					for(var index = 0; index < selectedNodeModels.length; index++){
						if(typeof selectedNodeModels[index] != "undefined"){
							//disable sort
							selectedNodeModels[index].options.applySort = false;
							var boundSbGridConnector = this;
							boundSbGridConnector.performExpand(selectedNodeModels[index], expandLevel);
						}else{
							console.warn("object with rowId: "+arrRowIds+" does not exist");
						}
					}
				};

				StandardFunctions.getDataGridModel().withTransactionUpdate(fn.bind(this /*boundSbGridConnector*/));
			},

			refreshStructureWithOutSort: function (){
			    	StandardFunctions.refreshColumnValues();
			},

			refreshRowByRowId: function(args){
				var newArgs = args;
				if (typeof args == "string") {
					newArgs = new Array();
					newArgs.push(args);
				}
				var nodesArray = [];
				newArgs.forEach(function(arg){
						var nodes = StandardFunctions._privGetNodeByRowId(arg);
						nodes.forEach(function(n) {
							nodesArray.push(n);
						});
				});
					StandardFunctions.refreshRowByRowId(nodesArray);
				

			},

			// removes a row from the data grid view
			removeRowsSelected: function(args){
				console.log("'emxEditableTable \'removeRowsSelected\' is deprecated. Please use \'StandardFunctions.removeRows( )\''")
				var treeDocumentXSO = [];
				if(typeof args != 'undefined'){
					args.forEach(function(arg){
						var rowId = (arg.split("|")[3] != undefined) ? arg.split("|")[3] : arg;
						treeDocumentXSO.push(StandardFunctions._privGetNodeByRowId(rowId)[0]);
					});

				}
				else{
					treeDocumentXSO = StandardFunctions._privateGetSelectedNodes();
				}
				for(var arrayIndex = treeDocumentXSO.length-1; arrayIndex >=0 && treeDocumentXSO.length>0; arrayIndex--){
					StandardFunctions.removeRows(treeDocumentXSO[arrayIndex]);
				}

			},

			// select a treeNodeModel
			// @param args is an array of row ids
			select: function(args){
					var gridRowId;

					if(Array.isArray(args)){
						args.forEach(function(arg){
							var nodesTobeSelected = StandardFunctions._privGetNodeByRowId(arg)[0];
							StandardFunctions.selectNodeModel(nodesTobeSelected,true);
						});
					}
					else{
						var nodeTobeSelected = StandardFunctions._privGetNodeByRowId(args)[0];
						StandardFunctions.selectNodeModel(nodeTobeSelected,true);
					}

			},

			// unselect a treeNodeModel
			// @param args is an array of row ids
			unselect: function(args){
				args.forEach(function(arg){
					var gridRowId = emxEditableTable.getGridRowId(arg);
				});
			},

			//select a treeNodeModel
			// @param nodesTobeSelected - the model that has to be checked(selected)
			selectNode: function(nodesTobeSelected){
				StandardFunctions.selectNodeModel(nodesTobeSelected,true);
			},
			
			//unselect a treeNodeModel
			// @param nodesTobeunselected - the model that has to be unchecked(unselected)
			unselectNode: function(nodesTobeUnselected){
				StandardFunctions.unselectNodeModel(nodesTobeUnselected);
			},
			
			getGridRowId: function(arg){
				var gridRowId="";
				var nodesArray = StandardFunctions._privateGetNodes(true);
				for(var arrayIndex = 0; arrayIndex < nodesArray.length; arrayIndex++){
					if(arg == nodesArray[arrayIndex].options.grid.rowId){
						gridRowId = nodesArray[arrayIndex]._rowID;
					}
				}
				return gridRowId;
			},

			getSelectedRow: function(objectId,relId){
					var nodesArray = StandardFunctions._privGetNodeById(objectId,relId);
					return nodesArray;
			},

			getSelectedNode: function(){
				return StandardFunctions._privateGetSelectedNodes();
			},
			
			getAttribute: function(treeNodeModel,attribute){
				if(treeNodeModel == undefined){
					return;
				}
				return StandardFunctions.getAttribute(treeNodeModel,attribute);
			},

			setAttribute: function(treeNodeModel,attribute,value){
				treeNodeModel.options.grid[attribute] = value;
			},
			
			/**
			 * @param attribute - string value of attribute name which needs to be picked from node
			 * @param objectId - string value of object id to match with nodes, <null> if needs to choose node based on rel id
			 * @param relId - string value of rel id to match with nodes, <null> if needs to choose node based on object id
			 * @param isParentAttribute - boolean value to specify if attribute needs to be picked from parent node of chosen node
			 * @return - attribute value picked from node
			 */
			getAttributeFromNode: function(attribute,objectId,relId,isParentAttribute){
					return StandardFunctions.getAttributeFromNodeUsingId(attribute,objectId,relId,isParentAttribute);
			},

			getCellValueByRowId: function(rowId, attribute){
				var node = StandardFunctions._privGetNodeByRowId(rowId)[0];
				var cell = {};
				var newVal = "", oldVal = "";
				if(node[attribute] != null && node[attribute] != undefined){
					newVal = node[attribute].newValue;
					oldVal = node[attribute].oldValue;
				}
				else{
					newVal = node.options.grid[attribute];
					oldVal = node.getReferenceValue(attribute);
				}
				
				newVal = (newVal != undefined) ? newVal.toString() : "";
				oldVal = (oldVal != undefined)? oldVal.toString() : "";
				
				//var newVal = (node.newValue != undefined)? node.newValue : "";
				//var oldVal = (node.oldValue != undefined)? node.oldValue : "";
				if(node != undefined && node != null){
					cell = {
							columnName: attribute,
							direction: node.options.grid.direction,
							objectid: node.options.grid.id,
							type: node.options.grid.type,
							relid: node.options.grid.relId,
							rowID: node.options.grid.rowId,
							level: node.options.grid.level,
							value: {
								current: {display: newVal, actual: newVal},
								old: {display: oldVal,actual: oldVal}
							}
					};

				}
				return cell;

			},

			setCellValueByRowId: function(rowId, colName, value){
				var nodeModel = StandardFunctions._privGetNodeByRowId(rowId)[0];
				if((nodeModel.options.grid[colName] != undefined && nodeModel.options.grid[colName].toString() != value.toString())||
						nodeModel.options.grid[colName] == undefined){
					StandardFunctions.getDataGridModel().prepareUpdate();
					var tempGrid = nodeModel.options.grid;
					tempGrid[colName] = value;
					tempGrid = StandardFunctions.updateDateColumn(tempGrid);
					
					nodeModel.updateOptions({
						grid: tempGrid
					});

					StandardFunctions.getDataGridModel().pushUpdate();
				}
				
				value = StandardFunctions.processDateValue(colName, value);
				
				var id = nodeModel.options.grid.id;
                var mapObject = {};
                if (editMap.hasOwnProperty(id)) {
                  mapObject = editMap[id];
                  mapObject[colName] = value;
                  editMap[id] = mapObject;
                } else {
                  mapObject[colName] = value;
                  mapObject['relId'] = nodeModel.options.grid.relId;
                  mapObject['parentId'] = StandardFunctions.getParentId("",nodeModel);
                  mapObject['rowId'] = (nodeModel.options.grid.rowId != undefined) ? nodeModel.options.grid.rowId.toString() : "0," + nodeModel._rowID;
                  mapObject["markup"] = "changed";
                  editMap[id] = mapObject;
                }

			},

			getNodeFromAttribute: function(attribute, value){
				var nodesArray = StandardFunctions._privateGetNodesBase(true);
				var model = "";
				for(var index=0; index < nodesArray.length; index++){
					if(nodesArray[index].options.grid[attribute] != undefined && nodesArray[index].options.grid[attribute].toString() == value){
						model = nodesArray[index];
						break;
					}
				}

				return model;
			},

			getChildNodesFromAttribute: function(attribute, value){
				var parentNode = this.getNodeFromAttribute(attribute, value);
				if(parentNode != undefined && parentNode != null && parentNode != ""){
					return parentNode.getChildren();
				}

				return [];
			},

			setCellHTMLValueByRowId: function(rowId, colName, value){
				this.setCellValueByRowId(rowId, colName, value);
			},

			addExisting:function(objectId,relId,rowId){
				var rows = [];
				rowId.forEach(function(row) {
				rows.push({
					'id': row,
					'relId': '',
					'rowId': ''
					});
				});
				StandardFunctions.addNodes(rows, objectId,null,{});
			},

			refreshStructure: function(){
				StandardFunctions.refreshColumnValues();
			},

			getCurrentCell: function(){
//				var cellCoordinates = dgView.layout.getCellCoordinatesAt(dgView.getActiveCellID());
//				var cellInfo = dgView.layout.getLeafColumns()[cellCoordinates.columnID];
				var rowInfo = activeCellRow;
				var currentCell = {};
				var newVal = "", oldVal = "";
				if(rowInfo[activeCellColumn] != null && rowInfo[activeCellColumn] != undefined){
					newVal = rowInfo[activeCellColumn].newValue;
					oldVal = rowInfo[activeCellColumn].oldValue;
				}
				else{
					newVal = rowInfo.options.grid[activeCellColumn];
					oldVal = node.getReferenceValue(attribute);
				}
				
				newVal = (newVal != undefined) ? newVal.toString() : "";
				oldVal = (oldVal != undefined)? oldVal.toString() : "";
				
				if(rowInfo != undefined){
					currentCell = {
							columnName: activeCellColumn,
							direction: rowInfo.options.grid.direction,
							objectid: rowInfo.options.grid.id,
							type: rowInfo.options.grid.type,
							relid: rowInfo.options.grid.relId,
							rowID: rowInfo.options.grid.rowId,
							level: rowInfo.options.grid.level,
							value: {
								current: {display: newVal, actual: newVal},
								old: {display: oldVal,actual: oldVal}
							}
					};

				}
				return currentCell;
			},

			
			cut: function(cutRowIds) {
				var selectedNodes = [];
				if(typeof cutRowIds != 'undefined' && cutRowIds.length > 0) {
					cutRowIds.forEach(function(rowId) {
						selectedNodes.push(StandardFunctions._privGetNodeByRowId(rowId)[0]);
					});
				}

				StandardFunctions.cutRows(selectedNodes);
			},

			copy: function(copiedRowIds) {
				var selectedNodes = [];
				if(typeof copiedRowIds != 'undefined' && copiedRowIds.length > 0) {
					copiedRowIds.forEach(function(rowId) {
						selectedNodes.push(StandardFunctions._privGetNodeByRowId(rowId)[0]);
					});
				}

				StandardFunctions.copyRows(selectedNodes);
			},

			pasteAbove: function() {
				StandardFunctions.pasteRowsAbove();
			},

			pasteBelow: function() {
				StandardFunctions.pasteRowsBelow();
			},

			pasteAsChild: function() {
				StandardFunctions.pasteRowsAsChild();
			},

			undo: function() {
				StandardFunctions.undoLastOperation();
			},

			loadMarkUpXML: function(xmlIn) {
				console.log('Global function \'loadMarkUpXML\' is deprecated. Please use respective APIs in \'StandardFunctions.js\' to cut/add a row');

				// convert string into xml
				var objDOM = emxUICore.createXMLDOM();
			    objDOM.loadXML(xmlIn);
			    emxUICore.checkDOMError(objDOM);

			    var localCutRows = [], localAddRows = [];

			    var parentObjectsArray = emxUICore.selectNodes(objDOM, "/mxRoot/object");
			    if(typeof parentObjectsArray != 'undefined') {
			    	parentObjectsArray.forEach(function(parentObject) {
			    		var parentObjectId = parentObject.getAttribute('objectId');

			    		var childrenObjects = parentObject.childNodes;
			    		childrenObjects.forEach(function(childObject) {
			    			var childObjectId = childObject.getAttribute('objectId');
			    			var childRelId = childObject.getAttribute('relId')
			    			var childRowId = childObject.getAttribute('rowId');

			    			var childMarkup = childObject.getAttribute('markup');
			    			if(childMarkup == 'cut' && typeof childObjectId != 'undefined') {
			    				var cutRow = StandardFunctions._privGetNodeById(childObjectId)[0];

			    				childObject.childNodes.forEach(function(column) {
									if('column' == column.tagName) {
										cutRow.options.grid[column.getAttribute('name')] = column.textContent;
									}
								});

			    				localCutRows.push(cutRow);
			    			} else if(childMarkup == 'add') {
			    				var lParentId = childObject.getAttribute('paste-as-child');
			    				if(typeof lParentId == 'undefined' || lParentId == null || lParentId == '') {
			    					lParentId = parentObjectId;
			    				} else {
			    					lParentId = lParentId.split('|')[0];
			    				}

			    				var row = {
									'id': childObjectId,
									'relId': childRelId,
									'rowId': childRowId
								};
			    				var referenceId = childRowId;
			    				if(typeof referenceId == 'undefined' || referenceId == null || referenceId == '') {
			    					referenceId = childObject.getAttribute('rowIdForPasteAction');
			    				}

			    				var cols = {
			    					'dgvStructChangesRelName': childObject.getAttribute('relType')
			    				};
			    				childObject.childNodes.forEach(function(column) {
									if('column' == column.tagName) {
										cols[column.getAttribute('name')] = column.textContent;
									}
								});

			    				var objColValues = {}; objColValues[childObjectId] = cols;
			    				StandardFunctions.addNodes([row], lParentId, referenceId, objColValues, true);
			    			}
			    		});
			    	});

			    	if(localCutRows.length > 0) {
			    		StandardFunctions.cutRows(localCutRows);
			    	}
			    }
			}
	};

	apiSupportFunctions.editableTable = {
			loadData: function(){
				location.href = location.href;
			},

			undo: function(){
				StandardFunctions.undoLastOperation();
			},

			cut: function(cutRowIds) {
				var selectedNodes = [];
				if(typeof cutRowIds != 'undefined' && cutRowIds.length > 0) {
					cutRowIds.forEach(function(rowId) {
						selectedNodes.push(StandardFunctions._privGetNodeByRowId(rowId)[0]);
					});
				}else{
					cutRowIds = StandardFunctions._privateGetSelectedNodes();
					
				}
				
				//prevalidation check
				if(preValidationsForEdit(cutRowIds)){
					cutRowIds.forEach(function(rowId){
						StandardFunctions.unselectNodeModel(rowId);
					});
					return;
				}
				StandardFunctions.cutRows(selectedNodes);
			},


			copy: function(copiedRowIds) {
				var selectedNodes = [];
				if(typeof copiedRowIds != 'undefined' && copiedRowIds.length > 0) {
					copiedRowIds.forEach(function(rowId) {
						selectedNodes.push(StandardFunctions._privGetNodeByRowId(rowId)[0]);
					});
				}else{
					copiedRowIds = StandardFunctions._privateGetSelectedNodes();
				}
				
				//prevalidation check
				if(preValidationsForEdit(copiedRowIds)){
		            return;
				}
				StandardFunctions.copyRows(selectedNodes);
			},

			pasteAsChild: function(){
				pastedRowIds = StandardFunctions._privateGetSelectedNodes();
				 //pre validations
		        if(preValidationsForEdit(pastedRowIds,'paste-as-child')){
		        	pastedRowIds.forEach(function(rowId){
						StandardFunctions.unselectNodeModel(rowId);
					});
		            return;
		        }
		        StandardFunctions.pasteRowsAsChild();
			},

			pasteAbove: function(){
				pastedRowIds = StandardFunctions._privateGetSelectedNodes();
				 //pre validations
		        if(preValidationsForEdit(pastedRowIds)){
		        	pastedRowIds.forEach(function(rowId){
						StandardFunctions.unselectNodeModel(rowId);
					});
		            return;
		        }

				StandardFunctions.pasteRowsAbove();
			},

			pasteRowsBelow: function(){
				pastedRowIds = StandardFunctions._privateGetSelectedNodes();
				//pre validations
		        if(preValidationsForEdit(pastedRowIds)){
		        	pastedRowIds.forEach(function(rowId){
						StandardFunctions.unselectNodeModel(rowId);
					});
		            return;
		        }
				StandardFunctions.pasteRowsBelow();
			}
	};

	return apiSupportFunctions;

});

