//dummy

/* global define, widget */
/**
  * @overview Meetings - Other Meetings utilities
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENOSubscriptionMgmt/Utilities/Utils',
[],
function() {
    'use strict';
    
    var Utils = {};
	/*
    Utils.getMeetingDataUpdated = function (meetingId) {
    	require(['DS/ENXMeetingMgmt/Controller/MeetingController'], function(MeetingController) {
    	MeetingController.fetchMeetingById(meetingId).then(
				success => {
					// Refresh id card header and summary page //
					widget.meetingEvent.publish('meeting-data-updated', success[0]);
					//update toolbar when maturity state is promoted
					widget.meetingEvent.publish('toolbar-data-updated', success[0]);
					
				},
				failure =>{
					if(failure.error){
							widget.notify.handler().addNotif({
								level: 'error',
								subtitle: failure.error,
								sticky: false
							});
					}else{
						widget.notify.handler().addNotif({
							level: 'error',
							subtitle: NLS.infoRefreshError,
						    sticky: false
						});
					}
				});
    	});
    };
    */
    Utils.formatDateString = function (dateObj) {
        // Display options for the date formated string
        var intlOptions,
            dateString;
        if (!Utils.isValidDate(dateObj)) {
            dateString = '';
        } else if (!UWA.is(Utils.getCookie("swymlang")) || !UWA.is(window.Intl)) {
            dateString = dateObj.toDateString();
        } else {
            intlOptions = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            };
            // The Intl API is currently not supported on Safari
            // nor in IE < 11 and and mobile browsers but Chrome mobile
            dateString = new Intl.DateTimeFormat(Utils.getCookie("swymlang"), intlOptions).format(dateObj);
        }
        return dateString;
    };
    
    Utils.formatDateTimeString = function (dateObj) {
        var dateString;
         // Display options for the date time formated string
        var intlOptions = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            };
        if (!Utils.isValidDate(dateObj)) {
            dateString = '';
        } else {
            // The Intl API is currently not supported on Safari
            // nor in IE < 11 and and mobile browsers but Chrome mobile
            dateString = dateObj.toLocaleDateString(Utils.getCookie("swymlang"), intlOptions) +" "+ dateObj.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
        }
        return dateString;
    };
    
    Utils.isValidDate = function (obj) {
        return UWA.is(obj, 'date') && !isNaN(obj.getTime());
    };
    
    Utils.getLocaleDate = function(date, isFormatRequired){
    	if(isFormatRequired){
        	let swymLang = Utils.getCookie("swymlang");
        	//if swymlang not present, then this will return based on the browser's language settings
        	return (swymlang != undefined) ? date.toLocaleString(swymLang) : date.toLocaleString();
    	}
    	//Always hardcoding locale to "en" if no format is specified 
        return date.toLocaleString("en");
    };
    
    Utils.getCookie = function (name) {
    	  var value = "; " + document.cookie;
    	  var parts = value.split("; " + name + "=");
    	  if (parts.length >= 2) return parts.pop().split(";").shift();
    };
    
    /*Utils.reloadFacetObjects = function (facetObjs, facets) {
    	if(facetObjs){
	    	for(var i = 0; i < facetObjs.length; i++){
	    		if(facets.indexOf(facetObjs[i].reference) > -1 ){
	    			if(facetObjs[i].reference === 'taskgraph'){
	    				if(facetObjs[i].view){
	    					facetObjs[i].view.destroy();
	        				facetObjs[i].view = null;
	    				}
	    			}
	    			else{
	    				facetObjs[i].view.reload();
	    			}
	    		}
	    	}
    	}
    };*/
    Utils.encodeHTMLEntites = function _encodeHTMLEntites(input) {
	        return input.toString().replace(/&amp;/g, '&')
	        .replace(/&lt;/g, '<')
	        .replace(/&gt;/g, '>')
	        .replace(/&quot;/g, '"')
	        .replace(/&#x27;/g, '\'')
	        .replace(/&#x2F;/g, '/');
	};
	Utils.decodeHTMLEntites = function _decodeHTMLEntites(input) {
	        return input.toString().replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/"/g, '&quot;')
	        .replace(/'/g, '&#x27;')
	        .replace(/\//g, '&#x2F;');
    };
    /*Utils.initHelpSystem = function _initHelpSystem(helpURL, label) {
        require(['DS/TopBarProxy/TopBarProxy'], function initProxyMenu(TopBarProxy) {
            if (TopBarProxy[widget.id]) {
                return;
            }
            TopBarProxy[widget.id] = new TopBarProxy({
                'id': widget.id
            });
            var initOnce = true,
                lang,
                url;
            var callback = function _initHelpCallback() {
                if (initOnce) {
                	var lang = Utils.getCookie("swymlang") || 'English';
                    initOnce = false;
                    url = 'http://help.3ds.com/HelpDS.aspx?P=11&L='+lang+'&F='+helpURL+'&contextscope=onpremise';
                }

                if (url) {
                    window.open(url, '_blank');
                } else {
                    alert('The help system is not available. Please contact your system administrator.');
                }
            };
            TopBarProxy[widget.id].setContent({
                help: [{
                    'label': label,
                    'onExecute': callback
                }]
            });
        });
    };*/
    
    Utils.strLength = function (str) {
    	var strArr = str.split("");
    	var len = 0;
    	for(var i = 0; i< strArr.length ; i++){
    		var strChar = strArr[i];
    		var encodeChar = encodeURIComponent(strChar);
    		if(encodeChar.length == 1){//single byte char
    			len++;
    		}else{//multi byte char
    			len = len + (encodeChar.split("%").length - 1); 
    		}
    	}
    	//alert(len);
    	return len;
    }

    return Utils;
});

/* global define, widget */
/**
 * @overview Route Management - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOSubscriptionMgmt/Utilities/SearchUtil',
		[
			'UWA/Class',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
			],
			function(
					UWAClass,
					NLS
			) {
	'use strict';
	let getRefinementToSnN = function(socket_id, title, multiSelect,recentTypes){	
		
		var refinementToSnNJSON = {
				"title": "Title",
				"role": "",
				"mode": "furtive",
				"default_with_precond": true,				
				"show_precond": false,
				"multiSel": multiSelect,
				"idcard_activated": false,
				"select_result_max_idcard": false,
				"itemViewClickHandler": "",
				"app_socket_id": socket_id,
				"widget_id": socket_id,
				"search_delegation": "3dsearch",
				"default_search_criteria": "",
				"source": ["3dspace"],
				recent_search: { 
					'types':recentTypes
				}
		};
		if(widget.getPreference("collab-storage") != undefined){
			//widget.getPreference("collab-storage").value="OnPremise";
			refinementToSnNJSON.tenant = widget.getPreference("collab-storage").value;
			//refinementToSnNJSON.tenant = "OnPremise";
		}
		refinementToSnNJSON.global_actions = [{"id":"incontextHelp","title":NLS['search.help'],"icon":"fonticon fonticon-help","overflow":false}];
		return refinementToSnNJSON;
	};
	
	let getPrecondForAttachmentSearch = function(meetingAttachmentSearchTypes){
		//TO DO
		return "flattenedtaxonomies:(\"types\/DOCUMENTS\") AND is_95_version_95_object:\"False\"";
	};
	let getPrecondForMeetingContextSearch = function(){
		return "flattenedtaxonomies:\"types/Change Order\" OR flattenedtaxonomies:\"types/Change Request\" OR flattenedtaxonomies:\"types/Change Action\"";
	};
	let getPrecondForMeetingMemberSearch = function(){
		return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\" OR flattenedtaxonomies:(\"types\/Group\") AND current:\"active\"";
	};
	
	
	let getPrecondForAgendaSpeakerSearch = function(){
		// Person
		let refinement = {};
		refinement.precond = "(flattenedtaxonomies:\"types/Person\") AND current:\"active\"";
		
		return refinement;
	};
	
	
	
	/*let getOrganisation=function(){
		var orgName="";
		if(widget.getPreference("organization") == undefined && widget.getPreference("organization") != ""){
			orgName=widget.data.pad_security_ctx.split("ctx::")[1].split('.')[1];
		}else{
			orgName = widget.getPreference("organization").value;
		}
		return orgName;
	}*/
	

	let SearchUtil = {
			getRefinementToSnN: (socket_id, title, multiSelect,recentTypes) => {return getRefinementToSnN(socket_id, title, multiSelect,recentTypes);},
			getPrecondForAttachmentSearch: (meetingAttachmentSearchTypes) => {return getPrecondForAttachmentSearch(meetingAttachmentSearchTypes);},
			getPrecondForMeetingContextSearch: () => {return getPrecondForMeetingContextSearch();},
			getPrecondForMeetingMemberSearch : () => {return getPrecondForMeetingMemberSearch();},
			getPrecondForAgendaSpeakerSearch: () => {return getPrecondForAgendaSpeakerSearch();}
			
			
	};
	return SearchUtil;
});

/**
 * 
 */

/* global define, widget */
/**
  * @overview Subscription Management
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
// XSS_CHECKED
define('DS/ENOSubscriptionMgmt/Views/MySubscriptionsToolbar',
[
  'UWA/Class',
  'UWA/Element',
  'DS/WAFData/WAFData',
  'DS/Controls/Button',
  'DS/Controls/ComboBox',
  'DS/Utilities/Array',
  'DS/Notifications/NotificationsManagerUXMessages',
  'DS/Notifications/NotificationsManagerViewOnScreen',
  'DS/Controls/TooltipModel',
  'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
],
function (
  Class,
  UWAElement,
  WAFData,
  Button,
  WUXComboBox,
  ArrayUtils,
  NotificationsManagerUXMessages,
  NotificationsManagerViewOnScreen,
  WUXTooltipModel,
  NLS
) {
  'use strict';

  /**
  * instance
  */
  var searchContainer = null;
  var searchInput = null;
  var searchInputDiv = null;
  var searchButton = null;
  var model = null;
  var treeListView = null;
  var matchedNodesList = [];
  var searchCriteria = null;
  var nextNode = null;
  var prevNode = null;
  var currentNode = null;
  var matchedNodesList1 = [];
  var typesSelected =[];
  var eventsSelected =[];
  var objTypes = [];
  var eventTypes = [];
  var searchInProcess = false;
  var windowResized = false;
  var headerContainer = null;
  var notify_manager = null;

  var MySubscriptionsToolbar = Class.extend({

    /**
    * init
    */
    init: function(modaltree)
    {
    	treeListView = modaltree;
    	model = modaltree._getTrueRoot()._treeDocument;
    },

    /**
    * buildToolbarView
    */
    buildToolbarView : function()
    {
    	var that = this;
    	that._notif_manager = NotificationsManagerUXMessages;
    	NotificationsManagerViewOnScreen.setNotificationManager(that._notif_manager);
    	
    	headerContainer = UWA.createElement('div', {
    		'class': 'filter-search-toolbar'
    	});
    	searchContainer = UWA.createElement('div', {
    		'class': 'searchContainerDiv',   
    	});
    	
    	/*searchInputDiv = UWA.createElement('div', {
    		'class': 'wux-controls-abstract wux-controls-lineeditor',   
    		'keymap-manager':'1',
    		'command-registry':'1'
    	}).inject(searchContainer);*/

    	searchInput = UWA.createElement('input', {
    		type: 'text',
    		placeholder: NLS.Find
    	}).inject(searchContainer);
      
    	that.filterTreeListView = function(){
    		if(!windowResized){
    			treeListView.getContent().childNodes[0].childNodes[1].style.minWidth =  "150px";
    			windowResized = true;
    		}
    		
    		model.prepareUpdate();  		
    		
    		if(typesSelected.length == 0 || typesSelected.length == objTypes.length ){   			
    			if(eventsSelected.length == 0 || eventsSelected.length == eventTypes.length){    	  	    	
    	  	    	ArrayUtils.optimizedForEach(model.getAllDescendants(), function(node) {   	  	    		
    	  	    		//if(node._isHidden){
    	  	    			node.show();
    	  	    		//}    	  	    			
    	  	    		//node.unmatchSearch();    	  	    		
    	  	    	});    	  	    	
    			} else {    				
    				ArrayUtils.optimizedForEach(model.getAllDescendants(), function(node) {    					
    					if(node.options.grid.event != ""){
    						if(eventsSelected.indexOf(node.options.grid.event) != -1){
    	  	    				node.show();
    	  	    				//node.matchSearch();
    	  	    				node.reverseExpand();
    	  	    				if(!node.getParent().ischildSelected){
    	  	    					node.getParent().ischildSelected = true;
    	  	    				}    	  	    				
    						} else if(!node._isHidden) {
    	  	    				node.hide(); 
    	  	    				//node.unmatchSearch();
    	  	    			}	  			
    					} 
    				});
    				
    				ArrayUtils.optimizedForEach(model.getChildren(), function(node) {
    					if(node.options.grid.event == ""){
    						if(node.ischildSelected){
    							node.show();
    							node.ischildSelected = false;
    						} else {
    							node.hide();
    						}  		  			
    					}      		  		
    				}); 				
    				
    			}      	    	
    		} else {
      	    	ArrayUtils.optimizedForEach(model.getChildren(), function(node) {      	    		
      	    		if(typesSelected.indexOf(node.options.grid.type) != -1){      	    			
      	    			ArrayUtils.optimizedForEach(node.getChildren(), function(childNode) {
      	    				if(eventsSelected.length == 0 || eventsSelected.length == eventTypes.length){    
      	    					node.show();
      	    					childNode.show();
      	    					//childNode.unmatchSearch();
      	    				} else if(eventsSelected.indexOf(childNode.options.grid.event) != -1){
    	  	    				//node.show();
      	    					node.show();
      	    					childNode.show();
      	    					//childNode.matchSearch();
      	    					childNode.reverseExpand();
      	    					if(!childNode.getParent().ischildSelected){
      	    						childNode.getParent().ischildSelected = true; 
      	    					}      	    					 	    					
    						} else if(!node._isHidden) {
    	  	    				childNode.hide(); 
    	  	    				//childNode.unmatchSearch();     				
    	  	    			}
      	    			});
      	    			
      	    			//node.show();
      	    		} else if(!node._isHidden) {
      	    			node.hide();
      	    			node.ischildSelected = false;
      	    		}      	    		     		  		
      	    	}
      	    	);
      	    }    		
    		model.pushUpdate();    		
    	};    	
    	var rows =  treeListView.getDocument().getAllDescendants();
      
    	objTypes = [];
    	eventTypes = [];
    	rows.forEach(function (row){
    		if(row.options.grid.event == "" && objTypes.indexOf(row.options.grid.type) == -1){
    			objTypes.push(row.options.grid.type);
    		} else if(row.options.grid.event != "" && eventTypes.indexOf(row.options.grid.event) == -1){
    			eventTypes.push(row.options.grid.event);
    		}    	  
    	});
     // [0].options.grid.type
      
      

      that.typeButton = new WUXComboBox({ elementsList: objTypes, placeholder: NLS.selectType, selectedIndex: -1, enableSearchFlag: false, multiSelFlag: true, actionOnClickFlag :true }).inject(headerContainer);
      that.eventButton = new WUXComboBox({ elementsList: eventTypes, placeholder: NLS.selectEvent, selectedIndex: -1, enableSearchFlag: false, multiSelFlag: true, actionOnClickFlag :true }).inject(headerContainer);
      that.typeButton.addEventListener('change', function(e) {
    	    'use strict';
      	    var indexes= e.dsModel.selectedIndexes;
      	    typesSelected =[];    	    
      	    indexes.forEach(function(evn){
      	    	typesSelected.push(e.dsModel.elementsList[evn]);
      	    });
      	    
      	    that.filterTreeListView();	    
      	    
      	}, false);
      
      that.eventButton.addEventListener('change', function(e) {
    	  'use strict';
    	  var indexes= e.dsModel.selectedIndexes;
    	  eventsSelected =[];
  	    
    	  indexes.forEach(function(evn){
    		  eventsSelected.push(e.dsModel.elementsList[evn]);
    	  });
  	    
    	  that.filterTreeListView();
    	  return;     	  
 
      }, false);
      
      searchInput.addEventListener('keypress', function(e) {
    	  'use strict';
    	  if(e.keyCode === 13){
    		  that.onFindInput();
    		  e.target.focus();
    	  }
      }, false);
      
      that.onFindInput = function(){   	
          var searchTerm = searchInput.value.trim().toLowerCase();          
          if(searchTerm.length < 4){
        	  if(searchTerm == ''){
        		  model.prepareUpdate();
        		  ArrayUtils.optimizedForEach(matchedNodesList1, function(node) {
        			  node.unmatchSearch();
        		  });
        		  model.pushUpdate(); 
        	  }				
        	  that._notif_manager.addNotif({
        		  level: 'info',
        		  message: NLS.findWarningMessage,
        		  sticky: false
        	  });				
          } else if(searchTerm.length > 3 ){
        	  if(searchTerm != searchCriteria && !searchInProcess){              	
        		  searchCriteria = searchTerm;
        		  // always done before tree action
        		  try{
        			  searchInProcess = true;
        			  model.prepareUpdate();
        			  // clear any previous search
        			  /*
                  	ArrayUtils.optimizedForEach(matchedNodesList, function(node) {
                  		node.unmatchSearch();
                  	});

                      // get matched nodes
                      matchedNodesList = model.search({
                      	shouldStop: function() {
                      		return false;
                      	},
                      	match: function(nodeInfos) {
                      		// match node label
                      		if(nodeInfos.nodeModel.options.grid.event !='' || nodeInfos.nodeModel.isVisible()){
                      			var label = nodeInfos.nodeModel.options.label.trim().toLowerCase();
                                  if(searchTerm != '' && label.indexOf(searchTerm) !== -1) {
                                    return true;
                                  }
                      		}                        
                      		return false;
                      	}
                      }); */
                      
                  	matchedNodesList1 =[];
					ArrayUtils.optimizedForEach(model.getAllDescendants(), function(node) {
						var label = node.getLabel().trim().toLowerCase();
						if( label.indexOf(searchTerm) !== -1) {
							node.reverseExpand();
                     	 	node.matchSearch();
                     	 	matchedNodesList1.push(node);
						} else{
							node.unmatchSearch();
						}
					});
                  	
					currentNode = 0;
					if(matchedNodesList1.length == 0){
						that._notif_manager.addNotif({
							level: 'info',
							message: NLS.noObjectsFound,
							sticky: false
						});
						return;
					}              		
              	} finally{
              		model.pushUpdate();              		
              		if(matchedNodesList1.length > 0){
              			var curNode = matchedNodesList1[0];
              			treeListView.getManager().scrollToNode(curNode);
              			//curNode.matchSearch();
              			curNode.show();
              		}
              		searchInProcess = false;
              	}              	
        	  } else {       		 
        		  if(!searchInProcess){
        			  try{
        				  searchInProcess = true;
        				// model.prepareUpdate();
            			  currentNode = currentNode+1;
            			  if(matchedNodesList1.length-1 <= currentNode){                		
            				  currentNode = 0;
            			  }
            			  var curNode = matchedNodesList1[currentNode];
            			  if(curNode){
            				  treeListView.getManager().scrollToNode(curNode);
            			  }
            			  if(matchedNodesList1.length == 0){
      						that._notif_manager.addNotif({
      							level: 'info',
      							message: NLS.noObjectsFound,
      							sticky: false
      						});
      						return;
      					  } 
            			  //curNode.matchSearch();  
            			  //model.pushUpdate(); 
            		  }finally{
            			  searchInProcess = false;
            		  }         		  
        		  }              	
        	  }
          }        
      }
      searchButton = new Button({
    	  icon: 'search',
    	  allowUnsafeHTMLLabel: true,
    	  onClick: function() {
    		  that.onFindInput();
    	  }        
      });
      searchButton.tooltipInfos = new WUXTooltipModel({shortHelp: NLS.FindTooltip,allowUnsafeHTMLShortHelp: true});
      searchButton.inject(searchContainer);
      searchContainer.inject(headerContainer);
   //   buttonUnsubscribe.inject(headerContainer);
      that.clearFindfield = function(){
    	  searchCriteria = null;
    	  searchInProcess = false;
    	  windowResized = false;
      }
      that.updateEventAndTypeDropdown = function(){
    	  	var a = performance.now();    	  
			objTypes = [];
	    	eventTypes = [];
			var rows =  treeListView.getDocument().getAllDescendants();
			rows.forEach(function (row){
	    		if(row.options.grid.event == "" && objTypes.indexOf(row.options.grid.type) == -1){
	    			objTypes.push(row.options.grid.type);
	    		} else if(row.options.grid.event != "" && eventTypes.indexOf(row.options.grid.event) == -1){
	    			eventTypes.push(row.options.grid.event);
	    		}    	  
	    	});
			that.typeButton.elementsList = objTypes;
			that.eventButton.elementsList = eventTypes;
			var b = performance.now();
	    	console.log('It took ' + (b - a) + ' ms.');
		};
      return headerContainer;
    }
    
  });
  return MySubscriptionsToolbar;
});

define('DS/ENOSubscriptionMgmt/Components/Wrappers/WrapperDataGridView',
        ['DS/DataGridView/DataGridView',
         'DS/CollectionView/CollectionViewStatusBar',
         'DS/DataGridView/DataGridViewLayout',
         ],
        function(DataGridView,CollectionViewStatusBar,DataGridViewLayout) {

            'use strict';

            let WrapperDataGridView, _dataGrid, _container, _toolbar,jsontoolbar,dummydiv;
            /*var layoutOptions =  { 
                    rowsHeader: false
                } */
            let buildToolBar = function(jsonToolbar){
                jsonToolbar = JSON.parse(jsonToolbar);
                _toolbar = _dataGrid.setToolbar(JSON.stringify(jsonToolbar));
                return _toolbar;
            };

            let initDataGridView = function (treeDocument, colConfig, toolBar,dummydiv){
              //buildLayout();
              _dataGrid = new DataGridView({
                  treeDocument: treeDocument,
                  columns: colConfig,
                 // layout: new DataGridViewLayout(layoutOptions),
                  defaultColumnDef: {//Set default settings for columns
                    widthd:'auto',
                    typeRepresentation: 'string'
                  }
              });
              _dataGrid.layout.cellHeight = 35;
              _dataGrid.rowSelection = 'multiple';
              _dataGrid.cellSelection = 'none';
              _dataGrid.getContent().style.top = '50 px';
              if (toolBar){
                  buildToolBar(toolBar);
               }
              _dataGrid.buildStatusBar([{
				  type: CollectionViewStatusBar.STATUS.NB_ITEMS
				}, {
				  type: CollectionViewStatusBar.STATUS.NB_SELECTED_ROWS
				}
			  ]);
              setReusableComponents();
              _dataGrid.inject(dummydiv);             
              return dummydiv;
            };
            
            
            
            let dataGridView = function(){
                return _dataGrid;
            };
            
            let setReusableComponents = function(){
            	_dataGrid.registerReusableCellContent({
     	          	id: '_actions_',
                	buildContent: function() {
                		let commandsDiv = UWA.createElement('div');
                        UWA.createElement('span',{
              			  "html": "",
              	          "class":"usergroup-state-title "
              	        }).inject(commandsDiv);
                        return commandsDiv;
                	}
                });
            };
                        
            let getSelectedRowsModel = function(treeDocumentModel){
                var selectedDetails = {};
                var details = [];
                var children = treeDocumentModel.getSelectedNodes();
                for(var i=0;i<children.length;i++){
                    //details.push(children[i].options.grid);
                    details.push(children[i]);
                }
                selectedDetails.data = details;
                return selectedDetails;
            };
            
           /* let deleteRowModelByIndex = function(treeDocumentModel,index){
        		var indexRow = treeDocumentModel.getNthRoot(index);
        		if(indexRow){
        			treeDocumentModel.prepareUpdate();	
        			treeDocumentModel.removeRoot(indexRow);
        			treeDocumentModel.pushUpdate();
        		}		
        	};*/
        	
        	/*let deleteRowModelSelected = function(treeDocumentModel){
        		let selctedIds= [];
        		var selRows = treeDocumentModel.getSelectedNodes();
        		treeDocumentModel.prepareUpdate();	
        		for (var index = 0; index < selRows.length; index++) {
        			treeDocumentModel.removeRoot(selRows[index]);
        			selctedIds.push(selRows[index].options.id);
        		}
        		treeDocumentModel.pushUpdate();
        		return selctedIds;
        	};*/
        	
        	/*let deleteRowModelById = function(treeDocumentModel,id){
				var children = treeDocumentModel.getChildren();
				for(var i=0;i<children.length;i++){
					if(children[i].options.id == id){
						treeDocumentModel.prepareUpdate();	
						treeDocumentModel.removeRoot(children[i]);
						treeDocumentModel.pushUpdate();
					}
				}
			};*/
			
			let deleteRowModelByIds = function(treeDocumentModel,ids){
				var children = treeDocumentModel.getChildren();
				var childrenToDelete = [];
				for(var i=0;i<children.length;i++){
					if(ids.includes(children[i].options.grid.uri)){
						childrenToDelete.push(children[i]);
					}
				}
				childrenToDelete.forEach(function(element){
					treeDocumentModel.prepareUpdate();	
					treeDocumentModel.removeRoot(element);
					treeDocumentModel.pushUpdate();
				});
				
			};
        	
        	let getRowModelById = function(treeDocumentModel,id){
				var children = treeDocumentModel.getChildren();
				for(var i=0;i<children.length;i++){
					if(children[i].options.id == id){
						return children[i];
					}
				}
			};
			
			/*let getRowModelIndexById = function(treeDocumentModel,id){
				var children = treeDocumentModel.getChildren();
				for(var i=0;i<children.length;i++){
					if(children[i].options.id == id){
						return i;
					}
				}
			};*/

			let getRowModelByURI = function(treeDocumentModel,id){
				var children = treeDocumentModel.getChildren();
				if(id!=undefined && id.indexOf("<")>-1){
					id = id.replace("<","");
					id = id.replace(">","");
				}
				for(var i=0;i<children.length;i++){
					let uri = children[i].options.grid.uri;
					if(uri!=undefined && uri.indexOf("<")>-1){
						uri = uri.replace("<","");
						uri = uri.replace(">","");	
					}
					if(uri == id){
						return children[i];
					}
				}
			};

            WrapperDataGridView={
              build: (treeDocument, colConfig, toolBar,dummydiv) => {return initDataGridView(treeDocument, colConfig, toolBar,dummydiv);},
              dataGridView: () => {return dataGridView();},
              destroy: function() {_dataGrid.destroy();_container.destroy();},
              dataGridViewToolbar: () => {return _toolbar;},
              getSelectedRowsModel: (treeDocumentModel) => {return getSelectedRowsModel(treeDocumentModel);},
              /*deleteRowModelByIndex: (treeDocumentModel,index) => {return deleteRowModelByIndex(treeDocumentModel,index);},
              deleteRowModelSelected: (treeDocumentModel) => {return deleteRowModelSelected(treeDocumentModel);},
              deleteRowModelById: (treeDocumentModel,id) => {return deleteRowModelById(treeDocumentModel,id);},*/
              deleteRowModelByIds: (treeDocumentModel,ids) => {return deleteRowModelByIds(treeDocumentModel,ids);},
  			  getRowModelById: (treeDocumentModel,id) => {return getRowModelById(treeDocumentModel,id);},
  			  getRowModelByURI: (treeDocumentModel,id) => {return getRowModelByURI(treeDocumentModel,id);}
  			  //getRowModelIndexById: (treeDocumentModel,id) => {return getRowModelIndexById(treeDocumentModel,id);}
            };

            return WrapperDataGridView;

        });

/* global define, widget */
/**
  * @overview Subscribe Management - Module to disable the create route command in action bar
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENOSubscriptionMgmt/commands/CommandAvailableOnSelect', [
    'UWA/Core',
    'UWA/Class',
    'DS/PADUtils/PADContext'
], function(UWA,
    Class,
    PADContext) {

    'use strict';
    var CommandAvailableOnSelect = Class.extend({
        init: function(options, AFROptions) {
            this._parent(options, AFROptions);

        	if (PADContext.get()){
                this._check_select();
                this._boundSelect = this._check_select.bind(this);
                let xso = PADContext.get().getPADTreeDocument().getXSO();
                xso.onPostAdd(this._boundSelect);
                xso.onPostRemove(this._boundSelect);
        	}
        },

        _check_select: function() {
        	var selectedObjects = PADContext.get().getPADTreeDocument().getXSO().get();
            var has_selected = !PADContext.get().getPADTreeDocument().getXSO().isEmpty();

          /*  if((selectedObjects.length >0) && (selectedObjects[0].plmType != "Content")){
            	has_selected = false;
            }*/
            if (this.isAvailable != null) {            	
            	var that = this;
            	that.selectedObjects = selectedObjects;
            	has_selected = this.isAvailable(selectedObjects, function(available, selectedObjects){
            		if (selectedObjects == that.selectedObjects) { // to avoid later check override by earlier check in async case 
            			if (available) {
                			that.enable();
                        } else {
                        	that.disable();
                        }
            		}            		
            	});
            }
            else {
            	if (has_selected === true) {
                    this.enable();
                } else {
                    this.disable();
                } 
            }    		
        }
    });
    return CommandAvailableOnSelect;
});

/* global define, widget */
/**
  * @overview Subscription - ENOVIA Bootstrap file to interact with the platform
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
 define('DS/ENOSubscriptionMgmt/Controller/EnoviaBootstrap', 
[
    'UWA/Core',
    //'UWA/Class/Collection',
    'UWA/Class/Listener'
    //'UWA/Utils',
    //'DS/ENOSubscriptionMgmt/Utilities/Utils',
    //'DS/PlatformAPI/PlatformAPI',
    //'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
    //'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
    //'DS/WAFData/WAFData'
],
function(
	UWACore,
	//UWACollection,
	UWAListener,
	//UWAUtils,
	//Utils,
	//PlatformAPI,
	//ParseJSONUtil,
	//CompassServices,
	//WAFData
) {
            'use strict';

     

            var  _csrf,  EnoviaBootstrap,  _pref3DSpace;

            EnoviaBootstrap = UWACore.merge(UWAListener, {

            	getcsrfToken : function(){
                    return _csrf;
            	},
				get3DSpaceURL : function() {
                    return _pref3DSpace;
				},
               setCsrftoken :function(csrf){
               	_csrf = csrf;
               },
               set3DSpaceUrl :function(url){
               	_pref3DSpace = url;
               }
              /*  start : function(options) {

                    if (_started) {
                        return;
                    }

                    if (options.frameENOVIA) {
                        _frameENOVIA = true;
                    }

                    options = (options ? UWACore.clone(options, false) : {});

                    _storages = options.collection;

                    initCompassSocket(options);
                    //initEnoviaRequest();
                    initSwymServices();
                    initSearchServices();
					init3DSpaceServices();
					//initCSRFServices();

                    _started = true;
                },*/

                
                
                
                // TODO transformer ce controller en une collectionView prennant
                // la collection des storages en param d'entr�e. Cette
                // collectionView serait render dans les widget mais pas dans
                // l'app standAlone ou elle ne servirait qu'� la gestion des
                // events.
                /*               
                onStorageChange : function(storage, callback) {
                    var token = storage.get('csrf');

                    _storage = storage;

                    if (!UWACore.is(token)) {
                        _storage.fetch({
                            //To make the app init async regarding the storage fetching
                            // callback two times because onComplete = onSuccess here
                            onComplete : callback,
                            //TODO manage failure differently (input options.onFailure/options.onComplete par exemple)
                            onFailure : callback
                        });
                    } else {
                        //Continues even if no requests are performed
                        if (callback) {
                            callback();
                        }
                    }

                    var id = _storage.id;
                    //set the correct tenant id to widget x3dPlatformId
                    widget.setValue("x3dPlatformId",id); 
                    _pref3DSpace=storage._attributes.url;
                     
                    if (id && _urlsSwym) {
                        for (var i = 0; i < _urlsSwym.length; i++) {
                            if (id === _urlsSwym[i].platformId) {
                                _prefSwym = _urlsSwym[i].url;
                            }
                        }
                    }
                    if (id && _urlsSearch) {
                        for (var i = 0; i < _urlsSearch.length; i++) {
                            if (id === _urlsSearch[i].platformId) {
                            	_prefSearch = _urlsSearch[i].url;
                                break;
                            }
                        }
                    }
                },*/
                
              /*  updateURLsOnEdit : function(storages){
                	//let tenantId = widget.getValue("x3dPlatformId");
                	let storageId=widget.getPreference("collab-storage").value;
                	
                	//To show the correct tenant name in the widget header
                	var securityContext = (widget.getPreference("collabspace") == undefined) ? "":widget.getPreference("collabspace").value;
                	if (securityContext.indexOf("ctx::") == 0){
                		securityContext = securityContext.split("ctx::")[1];
                	}
                	widget.setValue("xPref_CREDENTIAL",securityContext);
                	//END
                	var storage = storages.get(storageId);
                	_pref3DSpace=storage._attributes.url;
                	if (storageId && _urlsSwym) {
                		for (var i = 0; i < _urlsSwym.length; i++) {
                			if (storageId === _urlsSwym[i].platformId) {
                				_prefSwym = _urlsSwym[i].url;
                				break;
                			}
                		}
                	}
                },
				
				getLoginUser : function () {
					var user=PlatformAPI.getUser();
					if ( user && user.login) {
						return user.login;
					}
				},
				
				getLoginUserFullName : function () {
					var user=PlatformAPI.getUser();
					if ( user && user.firstName) {
						if(user.lastName){
							return user.firstName + " " + user.lastName;
						}else{
							return user.firstName;
						}
					}
				},

                getCompassSocket : function() {
                    if (_started) {
                        return _compassSocket;
                    }
                },

                getSyncOptions : function() {
                    if (_frameENOVIA) {
                        return {};
                    } else {
                        var syncOptions = {
                            ajax: WAFData.authenticatedRequest
                        };

                        return syncOptions;
                    }
                },

                getStorages : function() {
                    if (_started) {
                        return _storages;
                    }
                },

                getStorage : function() {
                    if (_started) {
                        return _storage;
                    }
                },*/
               
				/*getSNIconServiceBaseURL : function() {
					if (_started) {
                        return _pref3DSpace + '/snresources/images/icons/large';
                    }
				},
				getDocumentServiceBaseURL : function() {
					if (_started) {
                        return _pref3DSpace + '/resources/v1/modeler/documents';
                    }
				},
				get6WServiceBaseURL : function(){
					if (_started){
						return _pref3DSpace + '/resources/v3/e6w/service';
					}
				},
                getSwymUrl : function() {
                    if (_prefSwym) {
                        return _prefSwym;
                    }
                },
                getSearchUrl : function() {
                    if (_prefSearch) {
                        return _prefSearch;
                    }
                },*/
            	/*,
                setNoficationDiv :function(subscriptionNotification){
                	_subscriptionNotification = subscriptionNotification;
                },
                getNoficationDiv : function() {
                        return _subscriptionNotification;
				}*/
				
				
            });
            /*function initCompassSocket(options) {
            if (_compassSocket) {
                return _compassSocket;
            }

            // var contentSocketId = 'com.ds.contentSkeleton',
            // compassServerId =
            // 'com.ds.compass';
            var contentSocketId = 'com.ds.' + options.id, compassServerId = 'com.ds.compass';

            _compassSocket = new UWAUtils.InterCom.Socket(contentSocketId);
            _compassSocket.subscribeServer(compassServerId, window.parent);

            return _compassSocket;
        }

        function initCSRFServices() {
        	if (_csrf) {
                return _csrf;
            }
        	
        	var postURL = _pref3DSpace +  '/resources/v1/application/E6WFoundation/CSRF';
			var parseJSONUtil = new ParseJSONUtil();
			
			
			
			postURL = parseJSONUtil.getURLwithLanguage(postURL);
			var options = {};
			options.method = 'GET';
			options.headers = {
                     'Content-Type' : 'application/ds-json',
			};
			options.onComplete = function(serverResponse){
				_csrf=JSON.parse(serverResponse).csrf;
				
			};			
			WAFData.authenticatedRequest(postURL, options);

            return _csrf;
        	
        }
        function initSearchServices() {
        	if (_urlsSearch) {
                return _urlsSearch;
            }
            // [TO DO] This may be merged with the storage management to avoid 1 ajax call
            //         Just notice the js service has a cache ... this could be useful/powerful to manage storage preferences
            CompassServices.getServiceUrl({
                serviceName: '3DSearch',
                onComplete: function (data) {
                	_urlsSearch = data;
                    var id;
                    if (_storage) {
                        id = _storage.id;
                    }
                    if (id && _urlsSearch) {
                        for (var i = 0; i < _urlsSearch.length; i++) {
                            if (id === _urlsSearch[i].platformId) {
                            	_prefSearch = _urlsSearch[i].url;
                                break;
                            }
                        }
                    }
                },
                onFailure: function (data) {
                	_urlsSearch = [];
                }
            });

            return _urlsSearch;
        	
        }*/
        
       /* function initSwymServices () {
            if (_urlsSwym) {
                return _urlsSwym;
            }
            // [TO DO] This may be merged with the storage management to avoid 1 ajax call
            //         Just notice the js service has a cache ... this could be useful/powerful to manage storage preferences
            CompassServices.getServiceUrl({
                serviceName: '3DSwym',
                onComplete: function (data) {
                    _urlsSwym = data;
                    var id;
                    if (_storage) {
                        id = _storage.id;
                    }
                    if (id && _urlsSwym) {
                        for (var i = 0; i < _urlsSwym.length; i++) {
                            if (id === _urlsSwym[i].platformId) {
                                _prefSwym = _urlsSwym[i].url;
                                break;
                            }
                        }
                    }
                },
                onFailure: function (data) {
                    _urlsSwym = [];
                }
            });

            return _urlsSwym;
        }*/
		
		/*function init3DSpaceServices () {
			if (_pref3DSpace) {
                return _pref3DSpace;
            }
			
			var platformId=widget.getValue("x3dPlatformId");
						
			CompassServices.getServiceUrl( { 
				   serviceName: '3DSpace',
				   platformId : platformId, 
				   onComplete :   function(data){
					   if ( typeof data === "string" ) {
							_pref3DSpace=data;						
						}else {
							_pref3DSpace=data[0].url;							
						}
				   }, 
				   onFailure  : function () {
						_pref3DSpace = '';
				   }
			});
		}*/
            return EnoviaBootstrap;
        });


/**
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOSubscriptionMgmt/Utilities/DataFormatter',
		['i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'],function(NLS) {
	'use strict';
	let DataFormatter;
	
	let pushsubscriptionGridData = function(dataElem){
	   
		var response =
		{
                 type: dataElem.type,
                 Name: dataElem.dataelements.name,
                 id: dataElem.id,
                 event: "",
                 actType : dataElem.dataelements.type_NLS,
                 revision:dataElem.dataelements.rev,
                 context: "Data",
    	};
		return response;
	};
	
    DataFormatter={
           pushsubscriptionGridData: (dataElem) => {return pushsubscriptionGridData(dataElem);}    		
    };
    
    return DataFormatter;
});


/* global define, widget */
/**
 * @overview Subscription Management - JSON Parse utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
		[
			'UWA/Class',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
			],
			function(
					UWAClass,
					NLS
			) {
	'use strict';

	var ParseJSONUtil = UWAClass.extend({
		createDataForRequest : function(req,csrf){
			var request = {};
			if(csrf === undefined){
				csrf = widget.data.csrf;
			}
			var dataelements = {
					"dataelements" : req
					//"id" : req.id
			};
			var data = new Array();
			data.push(dataelements);
			request = {
					"csrf": csrf,
					"data": data
			}
			//console.log(request);
			return request;
		},
		createDataWithElementForRequest : function(req,csrf){
			var request = {};
			if(csrf === undefined){
				csrf = widget.data.csrf;
			}
			request = {
					"csrf": csrf,
					"data": req
			}
			//console.log(request);
			return request;
		},
		getTenantFromNode: function(node){
			if(node.tenant){
				return node.tenant;
			}else if(node.options && node.options.tenant){
				return node.options.tenant;
			}else if(node.object && node.object.tenant){
				return node.object.tenant;
			}else{
				return null;
			}
		},
		getTypeFromNode: function(node){
			if(node.type){
				return node.type;
			}else if(node.options && node.options.type){
				return node.options.type;
			}else if(node.object && node.object.type){
				return node.object.type;
			}else {
				return null;
			}
		},
		getCookie: function (name) {
	    	  var value = "; " + document.cookie;
	    	  var parts = value.split("; " + name + "=");
	    	  if (parts.length >= 2) return parts.pop().split(";").shift();
	    },
		
		getURLwithLanguage: function(url) {
			if(this.getCookie("swymlang")){
            	url = url + '?$language='+ this.getCookie("swymlang");
            }
			return url;
		}

	});


	return ParseJSONUtil;
});

/**
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENOSubscriptionMgmt/Components/SubscriptionNotify',[
	'DS/Notifications/NotificationsManagerUXMessages',
	'DS/Notifications/NotificationsManagerViewOnScreen',
	],
function(NotificationsManagerUXMessages,NotificationsManagerViewOnScreen) {

    'use strict';
    let _notif_manager1 = null;
   let SubscriptionNotify = function () {
   		
   
   
        // Private variables
    	
    	
        /**
         * 
         *
         * @param {Number} policy Policy that need to be set. It can be a combination of multiple options.
         *                  possible options :
         *                      - 0  No stacking
         *                      - 1  Stacking using level only
         *                      - 2  Stacking using category (can not be used alone, use level too by setting a policy of 3)
         *                      - 4  Stacking using title (can not be used alone, use level too by setting a policy of 5)
         *                      - 8  Stacking using subtitle (can not be used alone, use level too by setting a policy of 9)
         *                      - 16 Stacking only if the new notification matches the last one displayed (can not be used alone)
         *                  possible values :
         *                      - 0                    No stacking
         *                      - 1 + possibleOptions  Stacking can't be done without stacking the level
         * 
       //  
       
       */
    	_notif_manager1 = NotificationsManagerUXMessages;
    	NotificationsManagerViewOnScreen.setNotificationManager(_notif_manager1);
    	NotificationsManagerViewOnScreen.setStackingPolicy(9); //To stack similar subject messages
    	
    };
    
    SubscriptionNotify.prototype.handler = function () {

    	if(document.getElementById("PushSubscribeView")){ //This id is of create dialog panel of the Push subscription widget. 
    		//This means create dialog window is opened and show the notification on the window
    		NotificationsManagerViewOnScreen.inject(document.getElementById("PushSubscribeView"));
    	} else if(document.getElementById("ViewSubscriptionsDialog")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("ViewSubscriptionsDialog"));
    	}
    	else{
        		NotificationsManagerViewOnScreen.inject(document.body);
    	}
    	
    	return _notif_manager1;
    };
    
    
  /*  SubscriptionNotify.prototype.handler1 = function () {
        		NotificationsManagerViewOnScreen.inject(document.body);
    	return _notif_manager1;
    };
    */
    SubscriptionNotify.prototype.notifview = function(){
    	return NotificationsManagerViewOnScreen;
    }; 
    
    return SubscriptionNotify;

});

/* global define, widget */
/**
 * @overview Subscription Management - Module to create Subscribe in action bar
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define("DS/ENOSubscriptionMgmt/Commands/Subscribe",
		['UWA/Core',
			'UWA/Class',
			'DS/ApplicationFrame/Command',
			'DS/ApplicationFrame/CommandsManager',
			'DS/Core/Core',
			'DS/Notifications/NotificationsManagerUXMessages',
			'DS/Notifications/NotificationsManagerViewOnScreen',
			'DS/WAFData/WAFData',
			'DS/PADUtils/PADContext',
			'DS/PADUtils/PADSettingsMgt',
			'DS/WidgetServices/WidgetServices',
			'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
			'DS/ENOSubscriptionMgmt/commands/CommandAvailableOnSelect',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
			], function (
					UWA,
					Class,
					AFRCommand,
					CommandsManager,
					WUX,
					NotificationsManagerUXMessages,
					NotificationsManagerViewOnScreen,
					WAFData,
					PADContext,
					PADSettingsMgt,
					WidgetServices,					
					ParseJSONUtil,
					OnSelectCommand,
					NLS
			) {
	'use strict';

	// -- debug purpose only --
	// WUX.enableWUXConsole();
	var wuxConsole = WUX.getWUXConsole();
	var selected_nodes;

	var SubscribeCmd = Class.extend(AFRCommand, OnSelectCommand,{
		/**
		 * Execute a command
		 * @namespace WUX.AFR
		 * @class Command
		 * @extends UWA.Class
		 * @constructor
		 *
		 */
		init: function (options) {
			this.options = options;
			this._parent(options, {
				mode: 'exclusive',
				isAsynchronous: true
			});
		},

		beginExecute: function () {
			// -- Get the frame --
			this._frmWindow = this.getFrameWindow();			
		},

		resumeExecute: function () {
			//console.log('Resuming command:' + this._id);
		},
		
		execute: function (options) {	
			var that = this;			
			that.onCompletePlatform = function(url){
				WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWA.extend(that.options, {
					method : 'GET',
					url_temp:url,
					onComplete : that.onCompleteCSRF
				}, true));
			};
			
			that.onCompleteCSRF = function(csrf, resp, ref){
				var objThis = this;
				if(typeof objThis == 'undefined'){
					objThis = (ref == undefined)? {} : ref;
				}
				objThis._notif_manager = NotificationsManagerUXMessages;
				NotificationsManagerViewOnScreen.setNotificationManager(objThis._notif_manager);
				var url = objThis.url_temp + '/resources/v1/modeler/subscriptions';					 
				var parseJSONUtil = new ParseJSONUtil();
				url = parseJSONUtil.getURLwithLanguage(url);
				var localContext = PADContext.get();
				if (null == localContext){ 
					localContext = this.context;
					if (null == localContext){ 
						localContext = this.options.context;
					}
				};    
												
				var insideModel = localContext.model;
				if (!insideModel || !insideModel.objectId){
					selected_nodes = localContext.getSelectedNodes();
				}
				
				var resultElementSelected = [];
				var that = this;
				
				if(selected_nodes.length == 0){
					objThis._notif_manager.addNotif({
						level: 'warning',
						message: NLS.subscribeSelectError,
					    sticky: false
					});
					return;
				}
				
				if (selected_nodes.length) {
					selected_nodes.forEach(function(node) {
						//Instance has priority as it displayed both reference and instance
						var nodeID = node && typeof node.getInstID === "function" ? node.getInstID() : null;
						if (nodeID != null && Array.isArray(nodeID)){
							nodeID = nodeID.length > 0 ? nodeID[0] : null;
						}
						var defaultMetatype = nodeID ? 'relationship' : 'businessobject';
						nodeID = nodeID ? nodeID : node.getID();
						nodeID = nodeID ? nodeID : node.id;
						var metatype = node.metatype ? node.metatype: defaultMetatype;
						var source = node.source ? node.source : null;
						
						var tenant = parseJSONUtil.getTenantFromNode(node);
						var type = parseJSONUtil.getTypeFromNode(node);
						//var type = node.type ? node.type : (node.options.type ? node.options.type : null);
						if (nodeID) {
							var initModel = {
									'type' : type,
									'cestamp' : metatype,
									'relId' : nodeID,
									'id' : nodeID,
									'dataelements':{}
							};
							var tenant = tenant ? tenant : WidgetServices.getTenantID();

							if (tenant) initModel['tenant'] = tenant;
							if (source) initModel['source'] = source;
							if (type) initModel['type'] = type;
							resultElementSelected.push(initModel);
						};
					});
				}
				
				var SubscribeOptions = {
						'method' : 'POST',
						'headers' : {
			                     'Content-Type' : 'application/ds-json'					                     
						}
				};							
				
				SubscribeOptions.data = JSON.stringify(parseJSONUtil.createDataWithElementForRequest(resultElementSelected, JSON.parse(csrf).csrf));
	            	
				SubscribeOptions.onComplete = function(resp){
					var respJSONdata = JSON.parse(resp).data;
					var dataLen = respJSONdata.length;
					var typesWithEvents = "";
					var typesWithoutEvents = "";
					var typeArray=[];
					for(var i = 0; i< dataLen; i++){
						var typ_nls = respJSONdata[i].dataelements.type_nls;
						if(typeArray.indexOf(typ_nls) == -1){
							if(respJSONdata[i].dataelements.objEventList.length === 0){
								if(typesWithoutEvents.length ==0){
									typesWithoutEvents = respJSONdata[i].dataelements.type_nls;			
								} else {
									typesWithoutEvents = typesWithoutEvents + ","+ respJSONdata[i].dataelements.type_nls;	
								}
												
							}else{		
								if(typesWithEvents.length ==0){
									typesWithEvents = respJSONdata[i].dataelements.type_nls;			
								} else {
									typesWithEvents = typesWithEvents + ","+ respJSONdata[i].dataelements.type_nls;
								}
							}
							typeArray[i] = typ_nls;			
						}
					}
					if(typesWithEvents.length !=0){
						objThis._notif_manager.addNotif({
							level: 'success',
							message: NLS.subscribeEventsSuccess + typesWithEvents+".",
						    sticky: false
						});
					}
					if(typesWithoutEvents.length !=0){
						objThis._notif_manager.addNotif({
							level: 'error',
							message: NLS.errorNoEventsConfigured + typesWithoutEvents+".",
						    sticky: true
						});
					}
				};
				
				SubscribeOptions.onFailure = function(){
					objThis._notif_manager.addNotif({
						level: 'error',
						message: NLS.subscribeEventsFailure,
					    sticky: false
					});
				};
				SubscribeOptions.timeout=0;
				WAFData.authenticatedRequest(url, SubscribeOptions);								
				
			};
			
								
			require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
				CompassServices.getServiceUrl( { 
					serviceName: '3DSpace',
					platformId : widget.getValue("x3dPlatformId"), 
					onComplete : that.onCompletePlatform,
				});
			});		
			if(CommandsManager.getCommand( this._id )){
				CommandsManager.getCommand( this._id ).end();
			}else{
				var commandId = this._id;
				if(CommandsManager.getCommands()["[object Object]"][commandId])
				CommandsManager.getCommands()["[object Object]"][commandId].end();
			}		
			
			return that;	
		},
		endExecute: function () {
			console.log('Stop command:' + this._id);
			wuxConsole.warn('Stop command:' + this._id);
		}

	});

	return SubscribeCmd;
});

/* global define, widget */
/**
 * @overview Subscription Management - Module to create Subscribe in action bar
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define("DS/ENOSubscriptionMgmt/Commands/UnSubscribe",
		['UWA/Core',
			'UWA/Class',
			'DS/ApplicationFrame/Command',
			'DS/ApplicationFrame/CommandsManager',
			'DS/Core/Core',
			'DS/WAFData/WAFData',
			'DS/PADUtils/PADContext',
			'DS/PADUtils/PADSettingsMgt',
			'DS/WidgetServices/WidgetServices',
			'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
			'DS/Notifications/NotificationsManagerUXMessages',
		    'DS/Notifications/NotificationsManagerViewOnScreen',
		    'DS/ENOSubscriptionMgmt/commands/CommandAvailableOnSelect',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
			], function (
					UWA,
					Class,
					AFRCommand,
					CommandsManager,
					WUX,
					WAFData,
					PADContext,
					PADSettingsMgt,
					WidgetServices,					
					ParseJSONUtil,
					NotificationsManagerUXMessages,
					NotificationsManagerViewOnScreen,
					OnSelectCommand,
					NLS
			) {
	'use strict';

	// -- debug purpose only --
	// WUX.enableWUXConsole();
	var wuxConsole = WUX.getWUXConsole();
	var container,myContent,selected_nodes;
	
	
	var UnsubscribeCmd = Class.extend(AFRCommand, OnSelectCommand,{

		/**
		 * Execute a command
		 * @namespace WUX.AFR
		 * @class Command
		 * @extends UWA.Class
		 * @constructor
		 *
		 */
		init: function (options) {
			this.options = options;
			this._parent(options, {
				mode: 'exclusive',
				isAsynchronous: true
			});
		},

		beginExecute: function () {
			// -- Get the frame --
			this._frmWindow = this.getFrameWindow();
			// -- Init variables used to execute the command --
			//console.log('Beginning command:' + this._id);
			wuxConsole.info('Beginning command:' + this._id);
			//console.log(PADSettingsMgt.getSetting('pad_security_ctx'));
		},

		resumeExecute: function () {
			//console.log('Resuming command:' + this._id);
		},
		
	
		execute: function (options) {			
			var that = this;
			
			that.onCompletePlatform = function(url){
				WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWA.extend(that.options, {
					method : 'GET',
					url_temp:url,
					onComplete : that.onCompleteCSRF
				}, true));
			};
			
			that.onCompleteCSRF = function(csrf, resp, ref){
				var objThis = this;
				if(typeof objThis == 'undefined'){
					objThis = (ref == undefined)? {} : ref;
				}
				objThis._notif_manager = NotificationsManagerUXMessages;
	            NotificationsManagerViewOnScreen.setNotificationManager(objThis._notif_manager);
				var url = objThis.url_temp + '/resources/v1/modeler/subscriptions';
				var parseJSONUtil = new ParseJSONUtil();
				url = parseJSONUtil.getURLwithLanguage(url);
								 
				var localContext = PADContext.get();
				if (null == localContext){
					localContext = this.context;
					if (null == localContext){ 
						localContext = this.options.context;    
					}
				}
								
				var insideModel = localContext.model;
				if (!insideModel || !insideModel.objectId){
					selected_nodes = localContext.getSelectedNodes();
				}
				
				var resultElementSelected = [];
				
				if (selected_nodes.length) {
					console.dir('selected_nodes : ' +selected_nodes);
					selected_nodes.forEach(function(node) {
						//Instance has priority as it displayed both reference and instance
						var nodeID = node && typeof node.getInstID === "function" ? node.getInstID() : null;
						if (nodeID != null && Array.isArray(nodeID)){
							nodeID = nodeID.length > 0 ? nodeID[0] : null;
						}
						var defaultMetatype = nodeID ? 'relationship' : 'businessobject';
						nodeID = nodeID ? nodeID : node.getID();
						nodeID = nodeID ? nodeID : node.id;
						var metatype = node.metatype ? node.metatype: defaultMetatype;
						var source = node.source ? node.source : null;
						var tenant = parseJSONUtil.getTenantFromNode(node);
						var type = parseJSONUtil.getTypeFromNode(node);
						if (nodeID) {
							var initModel = {
									'type' : type,
									'cestamp' : metatype,
									'relId' : nodeID,
									'id' : nodeID,
									'dataelements':{
										'eventsSubscribed':[]
									}
							};
							var tenant = tenant ? tenant : WidgetServices.getTenantID();

							if (tenant) initModel['tenant'] = tenant;
							if (source) initModel['source'] = source;
							if (type) initModel['type'] = type;
							resultElementSelected.push(initModel);
						};
					});
				}
				if(resultElementSelected.length === 0){
					objThis._notif_manager.addNotif({
		                 level: "warning",
		                 message: NLS.subscribeSelectError,
		                 sticky: false
		             });
					 return;
				}
				var SubscribeOptions = {};
				SubscribeOptions.method = 'PUT';
				if(objThis.asyncFalse){
					SubscribeOptions.async = objThis.asyncFalse;
				}
				SubscribeOptions.headers = {
	                     'Content-Type' : 'application/ds-json'
	                     //'Accept' : 'application/ds-json'
				};
				SubscribeOptions.data = JSON.stringify(parseJSONUtil.createDataWithElementForRequest(resultElementSelected, JSON.parse(csrf).csrf));

	            	
				SubscribeOptions.onComplete = function(resp){
					var respJSONdata = JSON.parse(resp).data;
					var dataLen = respJSONdata.length;
					var typesWithEvents = "";
					var typesWithoutEvents = "";
					var typeArray=[];
					for(var i = 0; i<dataLen; i++){
						var typ_nls = respJSONdata[i].dataelements.type_nls;
						if(typeArray.indexOf(typ_nls) == -1){
							if(respJSONdata[i].dataelements.objEventList.length === 0 ){
								if(typesWithoutEvents.length ==0){
									typesWithoutEvents = typ_nls;			
								} else {
									typesWithoutEvents = typesWithoutEvents + ","+ typ_nls;	
								}
												
							}else {		
								if(typesWithEvents.length ==0){
									typesWithEvents = typ_nls;			
								} else {
									typesWithEvents = typesWithEvents + ","+ typ_nls;
								}
							}
							typeArray[i] = typ_nls;							
						}
						
					}
					if(typesWithEvents.length !=0){
						objThis._notif_manager.addNotif({
							level: 'success',
							message: NLS.unsubscribeEventsSuccess + typesWithEvents+".",
						    sticky: false
						});
					}
					
					if(typesWithoutEvents.length !=0){
						objThis._notif_manager.addNotif({
							level: 'error',
							message: NLS.errorNoEventsConfigured + typesWithoutEvents+".",
						    sticky: true
						});
					}
				};
				
				SubscribeOptions.onFailure = function(){					 
					objThis._notif_manager.addNotif({
		                 level: "error",
		                 message: NLS.unsubscribeEventsFailure,
		                 sticky: false
		             });
				};			
				SubscribeOptions.timeout=0;
				WAFData.authenticatedRequest(url, SubscribeOptions);
			//	console.log('execute command:' + this._id);
			};
			
								
			require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
				
				CompassServices.getServiceUrl( { 
					serviceName: '3DSpace',
					platformId : widget.getValue("x3dPlatformId"), 
					onComplete : that.onCompletePlatform,
				});
			});			
			//CommandsManager.getCommand( this._id ).end();
			if(CommandsManager.getCommand( this._id )){
				CommandsManager.getCommand( this._id ).end();
			}else{
				var commandId = this._id;
				if(CommandsManager.getCommands()["[object Object]"][commandId])
				CommandsManager.getCommands()["[object Object]"][commandId].end();
			}
			return that;
		},
		endExecute: function () {
		//	console.log('Stop command:' + this._id);
			wuxConsole.warn('Stop command:' + this._id);
		}

	});

	return UnsubscribeCmd;
});

/* global define, widget */
/**
 * @overview Subscription 
 * @version 1.0.
 * @access private
 */
define('DS/ENOSubscriptionMgmt/Services/SubscriptionServices',
        [
         "UWA/Core",
         'UWA/Class/Promise',
         'DS/ENOSubscriptionMgmt/Controller/EnoviaBootstrap',
         'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
         'DS/WAFData/WAFData'
        ],
         function(
                 UWACore,
                 Promise,
                 EnoviaBootstrap,
                 ParseJSONUtil,
                 WAFData
         ) {
    'use strict';

    let SubscriptionServices,fetchViewSubscriptionsDialogs;
    
    
      
    fetchViewSubscriptionsDialogs = function(resultElementSelected,csrftoken,spaceurl){
    	/*EnoviaBootstrap.start({
            id: widget.id
        });
    	
*/        return new Promise(function(resolve, reject) {
        	
        	var postURL = spaceurl+ '/resources/v1/modeler/subscriptions/viewSubscriptions';
			var parseJSONUtil = new ParseJSONUtil();
			
			
			postURL = parseJSONUtil.getURLwithLanguage(postURL);
			var options = {};
			options.method = 'POST';
			options.headers = {
                     'Content-Type' : 'application/ds-json',
			};
			
			options.data = JSON.stringify(parseJSONUtil.createDataWithElementForRequest(resultElementSelected,csrftoken));	
			options.onComplete = function(serverResponse){
				// that.drawListViewPage(serverResponse);
				serverResponse= JSON.parse(serverResponse);
            	// serverResponse= serverResponse.data;
            	resolve(serverResponse);
				
			};			
            options.onFailure = function(serverResponse, respData) {
           	 if(respData){
            		reject(respData);
            	}else{
               reject(serverResponse);
            	}
           };

			WAFData.authenticatedRequest(postURL, options);
        	

        });
    };
    
   let _makeWSCall  = function (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) {

		var options = options || null;
		var url = "",_urlsSearch;
		 
		if (options != null && options.isfederated != undefined && options.isfederated == true)
			url =	 URL;  
		// url ="https://vdevpril150blr.dsone.3ds.com/federated"+ URL;
		var accept= "";
		if (options != null && options.acceptType != undefined && options.acceptType != "")
			accept = options.acceptType;
		else
			accept = 'application/json';

		// Security Context not encoding.
		var encodeSecurityContext = 'Yes';
		if (options != null && options.encodeSecurityContext != undefined && options.encodeSecurityContext != "")
			encodeSecurityContext = options.encodeSecurityContext;


		var timestamp = new Date().getTime();
		if (url.indexOf("?") == -1) {
			url = url + "?tenant=" + widget.data.pad_tenant + "&timestamp=" + timestamp;
		} else {
			url = url + "&tenant=" + widget.data.pad_tenant + "&timestamp=" + timestamp;
		}


		

		userCallbackOnComplete = userCallbackOnComplete || function () { };
		userCallbackOnFailure = userCallbackOnFailure || function () { };

		// For NLS translation
		// if(lang == undefined || lang == 'undefined'){

		var queryobject = {};
		queryobject.method = httpMethod;
		queryobject.timeout = 120000000;

		if (options == null || options.isSwymUrl == undefined || options.isSwymUrl == false) {
			queryobject.type = 'json';
		}

		
			if (authentication) {
				queryobject.auth = {
						passport_target: authentication
				};
			}
			


		if (ReqBody)
			queryobject.data = ReqBody;
		
			queryobject.headers = {
					Accept: "application/json",
					'Content-Type': "application/json",
					'Accept-Language': "en"
			};

		queryobject.onComplete = function (data) {
			// console.log("Success calling url: " + url);
			// console.log("Success data: " + JSON.stringify(data));
			userCallbackOnComplete(data);
		};
		queryobject.onFailure = function (errDetailds, errData) {
			console.log("Error in calling url: " + url);
			// console.log("Additional Details:: httpMethod: " + httpMethod + "
			// authentication: " + authentication + " securityContext: " +
			// securityContext + " ContentType: " + ContentType);
			console.log("Error Detail: " + errDetailds);
			console.log("Error Data: " + JSON.stringify(errData));


			userCallbackOnFailure(errDetailds, errData);
		};

		queryobject.onTimeout = function () {
			console.log("Timedout for url: " + url);
			// ChgErrors.error("Webservice Timedout, please refresh and try
			// again.");
			if(widget.body){
				Mask.unmask(widget.body);
			}
		}

		WAFData.authenticatedRequest(url, queryobject);
	};
	


    SubscriptionServices={
    		
    		 
    		fetchViewSubscriptionsDialogs: (resultElementSelected,csrftoken,spaceurl) => {return fetchViewSubscriptionsDialogs(resultElementSelected,csrftoken,spaceurl);},
            makeWSCall: (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) => {return _makeWSCall(URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options);}
            
    };

    return SubscriptionServices;

});

/* global define, widget */
/**
  * @overview Subscription Management
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
// XSS_CHECKED
define('DS/ENOSubscriptionMgmt/Views/ObjectSubscribeEvents',
[
   'DS/WAFData/WAFData',
   'UWA/Controls/Abstract',
   'DS/PADUtils/PADContext',
   'DS/WidgetServices/WidgetServices',
   'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
   'DS/Controls/Toggle', 
   'DS/Controls/ButtonGroup',
   'DS/Windows/Dialog',
   'DS/Windows/ImmersiveFrame',
   'DS/Controls/Button',
   'DS/Notifications/NotificationsManagerUXMessages',
   'DS/Notifications/NotificationsManagerViewOnScreen',
   'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt',
   'css!DS/ENOSubscriptionMgmt/ENOSubscriptionMgmt'   
],
function(
	WAFData,
	Abstract,
	PADContext,
	WidgetServices,
	ParseJSONUtil,
	WUXToggle, 
	WUXButtonGroup,
    WUXDialog,
    WUXImmersiveFrame,
    WUXButton,
	NotificationsManagerUXMessages,
	NotificationsManagerViewOnScreen,
	NLS	
) {
	'use strict';
	
	var ObjectSubscribeEvents = {
		serverresponse : {},
		showEditModalDialog : function(options) {
			var that = this;
			that.EditSubscriptionDialogOpened = true;
			that.options = options;
			that._notif_manager = NotificationsManagerUXMessages;
			NotificationsManagerViewOnScreen.setNotificationManager(that._notif_manager);
			
			that.onCompletePlatform = function(url){
				that.url = url;
				WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWA.extend(that.options, {
					method : 'GET',
					onComplete : that.onCompleteCSRF
				}, true));
			};
			
			that.onCompleteEdit = function(serverResponse){
				var response = JSON.parse(serverResponse);
				if(response.data[0].dataelements.objEventList.length === 0){
					 var myContent = new UWA.Element('div', { html: '<div style="display: inline-block; height: 34px; line-height: 34px;"> <p>'+ NLS.editSubscriptionsErrorMessage1+'</p>' });
					 that.showDialog(myContent, response.data.length);
					 return;
				}
				var objEventList = [], objEventNLSList = [], eventSubscriptionList = [], buttonGroup = new WUXButtonGroup({ type: 'checkbox' });
				response.data.forEach(function(dataElem) {
					var eventsAvailable = dataElem.dataelements.objEventList;
					var eventsNLSAvailable = dataElem.dataelements.objEventList_NLS;
					var eventsSubscribed = dataElem.dataelements.eventsSubscribed;
					for(var i=0; i< eventsAvailable.length; i++){
						var subs = eventsAvailable[i];
						if(eventSubscriptionList[i] == "mixedState:true"){
							//nothing
						} else if(eventSubscriptionList[i] == "checkFlag:true"){
							if(!(eventsSubscribed.indexOf(subs) > -1)){													
								eventSubscriptionList[i] = "mixedState:true";													
							}
							
						} else if(eventSubscriptionList[i] == "checkFlag:false"){
							if(eventsSubscribed.indexOf(subs) > -1){
								eventSubscriptionList[i] = "mixedState:true";													
							}
						}else {
							if(eventsSubscribed.indexOf(subs) > -1){
								eventSubscriptionList[i] = "checkFlag:true";
							}else{
								eventSubscriptionList[i] = "checkFlag:false";
							}
						}											
					}																				
					objEventList = eventsAvailable;
					objEventNLSList = eventsNLSAvailable;
				});
				
				for(var i=0; i< objEventList.length; i++){
					var checkBoxConfig = {};
					checkBoxConfig.type = 'checkbox';
					checkBoxConfig.label =  objEventNLSList[i];
					checkBoxConfig.actValue =  objEventList[i];
					checkBoxConfig.allowUnsafeHTMLLabel= true;
					var mixedstate = false;
					var checkflag = false;
					if(eventSubscriptionList[i] == "mixedState:true"){
						checkBoxConfig.mixedState = true;
						checkBoxConfig.checkFlag = true;
					} else if(eventSubscriptionList[i] == "checkFlag:true"){
						checkBoxConfig.checkFlag = true;
					} else{
						checkBoxConfig.checkFlag = false;
					}
					buttonGroup.addChild(new WUXToggle(checkBoxConfig));
				}
				var containerDiv = new UWA.Element('div', {html:'<div style="display: inline-block; height: 34px; line-height: 34px;"> <p>'+NLS.editEventsNotifyMessage+'</p> </div>'});
				var containerRight = new UWA.Element('div');
				var lineElement = new UWA.Element('div',{html: '<hr style= "width:100%; height:1px; margin:10px 0 10px 0"/>' });
				var ButtonSelectAllLabel = NLS.unSelectAll, btnCount = buttonGroup.getButtonCount();
				var emphasize = 'secondary';
				for(var cnt=0;cnt< btnCount;cnt++ ){
					if(buttonGroup.getButton(cnt).checkFlag === false){
						ButtonSelectAllLabel = NLS.selectAll;
						emphasize = 'primary';
						break;
					}
				}
				var buttonSelectAll = new WUXButton({ 
								label: ButtonSelectAllLabel,
								displayStyle: 'normal',
								emphasize:emphasize,
								allowUnsafeHTMLLabel: true,
								onClick: function(e){			
									if(e.dsModel.label == NLS.selectAll){
										for(var cnt=0;cnt< btnCount;cnt++ ){
											buttonGroup.getButton(cnt).checkFlag=true;
											buttonGroup.getButton(cnt).mixedState=false;
										}
										e.dsModel.label = NLS.unSelectAll;
										e.dsModel.emphasize = 'secondary';
									} else{
										for(var cnt=0;cnt< btnCount;cnt++ ){
											buttonGroup.getButton(cnt).checkFlag=false;
											buttonGroup.getButton(cnt).mixedState=false;
										}
										e.dsModel.label = NLS.selectAll;
										e.dsModel.emphasize = 'primary';
									}																		
								}
							});
				buttonSelectAll.inject(containerRight);
				lineElement.inject(containerRight);
				containerRight.inject(containerDiv);
				buttonGroup.inject(containerDiv);

				var immersiveFrame = new WUXImmersiveFrame();
	            immersiveFrame.inject(document.body);          
	            that.dialog = new WUXDialog({
	               title: NLS.replace(NLS.editSubscriptionsTitle, {
	            	   			tag1: response.data.length
                   			}),
	               modalFlag: true,
	               width:400,
	               height:350,
	               content: containerDiv,
	               immersiveFrame: immersiveFrame,
	               buttons: {
	                   Cancel: new WUXButton({
	                	   allowUnsafeHTMLLabel: true,
	                       onClick: function (e) {
	                           e.dsModel.dialog.close();
	                           that.EditSubscriptionDialogOpened = false;
	                           immersiveFrame.destroy();
							   immersiveFrame=undefined;
	                       }
	                   }),
	                   Ok: new WUXButton({
	                	   label: NLS.ok,
	                	   allowUnsafeHTMLLabel: true,
	                       onClick: function (e) {       	   					                    	   
								response.data.forEach(function(dataElem) {
									var eventsAvailable = dataElem.dataelements.objEventList;
									var eventsSubscribed = dataElem.dataelements.eventsSubscribed;
									var updatedEventList = [];
									var cnt = e.dsModel.dialog.content;
									for(var i = 0; i< eventsAvailable.length; i++){
										var subs = eventsAvailable[i];
										var btn = cnt.getChildren()[2].dsModel.getButton(i);//cnt.getButton(i); 
										if(btn.mixedState == true){
											if(eventsSubscribed.indexOf(subs) > -1){
												updatedEventList.push(subs);
											}
											//skip
										} else if(btn.mixedState == false){
											if(btn.checkFlag == true){
												updatedEventList.push(subs);
											} 
										} else {
											if(btn.checkFlag == true){
												updatedEventList.push(subs);
											} 
										}
									}
									dataElem.dataelements.eventsSubscribed = updatedEventList;	
								});
								var editSubscribeOptions = {};
								editSubscribeOptions.method = 'PUT';
								editSubscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(response.data, that.csrf));
								editSubscribeOptions.onComplete = function(res){
									that._notif_manager.addNotif({
										level: 'success',
										message: NLS.EditsubscribeSuccess,
									    sticky: false
									});
								};
								editSubscribeOptions.onFailure = function(){
									that._notif_manager.addNotif({
										level: 'error',
										message: NLS.EditsubscribeFailure,
									    sticky: false
									});
								};	
								editSubscribeOptions.timeout=0;
								var url = that.url + "/resources/v1/modeler/subscriptions";
								url = new ParseJSONUtil().getURLwithLanguage(url);
								WAFData.authenticatedRequest(url, editSubscribeOptions);
								e.dsModel.dialog.close();
								that.EditSubscriptionDialogOpened = false;
								immersiveFrame.destroy();
								immersiveFrame=undefined;
	                       }
	                   })
	               }
	            });
	            that.dialog.addEventListener('close', function (e) {	            	
	                that.EditSubscriptionDialogOpened = false;
	                immersiveFrame.destroy();
					immersiveFrame=undefined;
	            });
			};
			
			that.onCompleteCSRF = function(csrf){
				that.csrf = JSON.parse(csrf).csrf;
				var postURL = that.url + '/resources/v1/modeler/subscriptions/getSubscriptionsbyPost';
				var parseJSONUtil = new ParseJSONUtil();
				postURL = parseJSONUtil.getURLwithLanguage(postURL);
				var selected_nodes;
				var localContext = PADContext.get();
				if (null == localContext){
					localContext = that.context;
					if (null == localContext){
						localContext = that.options.context;
					}
				}
				
				var insideModel = localContext.model;
				if (!insideModel || !insideModel.objectId){ 
					selected_nodes = localContext.getSelectedNodes(); 
				}				
				var resultElementSelected = [];
				
				if (selected_nodes.length) {
					selected_nodes.forEach(function(node) {
						//Instance has priority as it displayed both reference and instance
						var nodeID = node && typeof node.getInstID === "function" ? node.getInstID() : null;
						if (nodeID != null && Array.isArray(nodeID)){
							nodeID = nodeID.length > 0 ? nodeID[0] : null;
						}
						var defaultMetatype = nodeID ? 'relationship' : 'businessobject';
						nodeID = nodeID ? nodeID : node.getID();
						nodeID = nodeID ? nodeID : node.id;
						var metatype = node.metatype ? node.metatype: defaultMetatype;
						var source = node.source ? node.source : null;
						var tenant = parseJSONUtil.getTenantFromNode(node);
						var type = parseJSONUtil.getTypeFromNode(node);
						
						if (nodeID) {
							var initModel = {
									'type' : type,
									'cestamp' : metatype,
									'relId' : nodeID,
									'id' : nodeID,
									'dataelements':{}
							};
							var tenant = tenant ? tenant : WidgetServices.getTenantID();

							if (tenant) initModel['tenant'] = tenant;
							if (source) initModel['source'] = source;
							if (type) initModel['type'] = type;
							resultElementSelected.push(initModel);
						}
					});
				}
				var previousType = resultElementSelected[0].type;
				var isDifferentType = false;
				for(var i= 1; i<resultElementSelected.length; i++){
					if(previousType != resultElementSelected[i].type){
						isDifferentType = true;
					}
					previousType = resultElementSelected[i].type;
				}
				
				if(isDifferentType){
					var myContent = new UWA.Element('div', { html: '<div style="display: inline-block; height: 34px; line-height: 20px;"><p>' + NLS.editSubscriptionsErrorMessage+'</p>' });
					that.showDialog(myContent,selected_nodes.length);
					 return;
				}
				var editSubscribeOptions = {};
				editSubscribeOptions.method = 'POST';
				editSubscribeOptions.headers = {
	                     'Content-Type' : 'application/ds-json',
				};
				editSubscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(resultElementSelected, that.csrf));
					
				editSubscribeOptions.onComplete = function(serverResponse){
					that.onCompleteEdit(serverResponse);
				};		
				editSubscribeOptions.timeout=0;
				WAFData.authenticatedRequest(postURL,editSubscribeOptions);
			//	console.log('execute command:' + this._id);				
			};
			
			that.showDialog = function(myContent, objCount){				 
				 var immersiveFrame = new WUXImmersiveFrame();
		         immersiveFrame.inject(document.body); 		         
				 var dialog = new WUXDialog({
		               title: NLS.replace(NLS.editSubscriptionsTitle, {tag1: objCount}),
		               modalFlag: true,
		               width:400,
		               height:350,
		               content: myContent,
		               immersiveFrame: immersiveFrame,
		               buttons: {
		                   Close: new WUXButton({
		                	   allowUnsafeHTMLLabel: true,
		                       onClick: function (e) {
		                    	   e.dsModel.dialog.close();
		                    	   that.EditSubscriptionDialogOpened = false;
		                    	   immersiveFrame.destroy();
								   immersiveFrame=undefined;
		                       }
		                   })
		               }
				 });
				 dialog.addEventListener('close', function (e) {	            	
		                that.EditSubscriptionDialogOpened = false;
		                immersiveFrame.destroy();
						immersiveFrame=undefined;
		            });
			};
			
			require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
				CompassServices.getServiceUrl( { 
					serviceName: '3DSpace',
					platformId : widget.getValue("x3dPlatformId"), 
					onComplete : that.onCompletePlatform,
				});
			});	
			return that;
		},		
	};
	
	var ObjectSubscribeEventsAbs = Abstract.extend(ObjectSubscribeEvents);

	return ObjectSubscribeEventsAbs;
});

/* global define, widget */
/**
 * @overview Subscription Management - Module for 'Edit Subscribe' command in action bar
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define("DS/ENOSubscriptionMgmt/Commands/EditSubscribe",
		[	'UWA/Class',
			'DS/ApplicationFrame/Command',
			'DS/ApplicationFrame/CommandsManager',
			'DS/Core/Core',
			'DS/ENOSubscriptionMgmt/commands/CommandAvailableOnSelect',
			'DS/ENOSubscriptionMgmt/Views/ObjectSubscribeEvents',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
			], function (
					Class,
					AFRCommand,
					CommandsManager,
					WUX,			
					OnSelectCommand,
					ObjectSubscribeEvents,
					NLS
			) {
	'use strict';

	// -- debug purpose only --
	// WUX.enableWUXConsole();
	var wuxConsole = WUX.getWUXConsole();
	var container,myContent,selected_nodes;


	var EditSubscribeCmd = Class.extend(AFRCommand, OnSelectCommand,{

		/**
		 * Execute a command
		 * @namespace WUX.AFR
		 * @class Command
		 * @extends UWA.Class
		 * @constructor
		 *
		 */
		init: function (options) {
			this._parent(options, {
				mode: 'exclusive',
				isAsynchronous: true
			});
			this._dialogObj = {};
			this._dialogObj.EditSubscriptionDialogOpened = false;
		},

		beginExecute: function () {
			// -- Get the frame --
			this._frmWindow = this.getFrameWindow();
			// -- Init variables used to execute the command --
		//	console.log('Beginning command:' + this._id);
			wuxConsole.info('Beginning command:' + this._id);
		},

		resumeExecute: function () {
		//	console.log('Resuming command:' + this._id);
		},
		
		execute: function (options) {
			//CommandsManager.getCommand( this._id ).end();
			if(this._dialogObj.EditSubscriptionDialogOpened === false){
				this._dialogObj = new ObjectSubscribeEvents().showEditModalDialog(this.options);
			}
			if(CommandsManager.getCommand( this._id )){
				CommandsManager.getCommand( this._id ).end();
			}else{
				var commandId = this._id;
				if(CommandsManager.getCommands()["[object Object]"][commandId])
					CommandsManager.getCommands()["[object Object]"][commandId].end();
			}
			
		},
		endExecute: function () {
		//	console.log('Stop command:' + this._id);
			wuxConsole.warn('Stop command:' + this._id);
		}

	});

	return EditSubscribeCmd;
});

define('DS/ENOSubscriptionMgmt/Views/CreatePushSubscribeDialog',
[
	'DS/Tree/TreeDocument',
	'DS/WUXAutoComplete/AutoComplete',
	'DS/Controls/Toggle',
	'DS/Controls/Button',
	'DS/Controls/ButtonGroup',
	'DS/WAFData/WAFData',
	'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
	'DS/ENOSubscriptionMgmt/Utilities/SearchUtil',
	'DS/ENOSubscriptionMgmt/Services/SubscriptionServices',
	'DS/Tree/TreeNodeModel',
	'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt',
	'DS/TreeModel/BaseFilter'
], 
  function (TreeDocument,WUXAutoComplete,WUXToggle,WUXButton,WUXButtonGroup,WAFData,ParseJSONUtil,SearchUtil,SubscriptionServices,TreeNodeModel, NLS,BaseFilter) {    
        "use strict";     
        let id, _model; 
		
		
        var CreatePushSubscribeDialog = {
		
      getPrecondForSearch:function(){
										// Person
										//let refinement = {};                                                                                          
										if(widget.getValue("x3dPlatformId") == "OnPremise"){
														// premise 
														//refinement.precond = "(flattenedtaxonomies:\"types/Person\" OR \"types/Group\") AND current:\"active\"";
														return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\" OR flattenedtaxonomies:(\"types\/Group\") AND current:\"active\"";
										}else{
														// cloud                                
														return "([ds6w:type]:(Group) AND [ds6w:status]:(Public)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
										}
										//return refinement;
		},
		
		
        build : function(container,eventsAvailable,eventsNLSAvailable){
        	       	
        	CreatePushSubscribeDialog.render(container,eventsAvailable,eventsNLSAvailable);
        },
          
        render: function (container,eventsAvailable,eventsNLSAvailable) {
			        //let CreatePushSubscribeDialog._pushSubscribeProperties={};
					CreatePushSubscribeDialog.elements={};
					var that = this;			
					that.onCompletePlatform = function(url){
						WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWA.extend(that.options, {
							method : 'GET',
							url_temp:url,
							onComplete : that.onCompleteCSRF
						}, true));
					};
					
				
		//START----Show Search- Member or Group in dialog---------------------------------------------------------------------------
		        	CreatePushSubscribeDialog.modelForAttendees = new TreeDocument();
                    CreatePushSubscribeDialog.getSearchServiceURL();
		        	//CreatePushSubscribeDialog.updateAutocompleteModel();
					//filters start
				var stringRoleFilter = BaseFilter.inherit({
			      publishedProperties: {},
			
			      // Method called for every data when the model is changed to know if this data has to be filtered
			      isDataFiltered: function(data) {
			        // Get attribute value & label
			        var dataValue = data.getAttributeValue("value");
			        var dataLabel = data.getAttributeValue("label");
			
			        // Check conditions for filter to apply
			        if (dataValue && dataLabel && this.filterModel && this.filterModel.text) {
			          var filter = this.filterModel.text.toLowerCase();
								var doesDataFitTheFilter = dataValue.toLowerCase().indexOf(filter) > -1 || dataLabel.toLowerCase().indexOf(filter) > -1;
								return !doesDataFitTheFilter;
			        }
							// if the filter is empty, nothing should be filtered out
			        return false;
			      },
			
			      // A filter is considered as empty if there is no possiblity that its current model will filter some data.
			      isEmpty: function() {
			        return this.filterModel.text === undefined;
			      }
			
			    });
			    
			     // Retrieve the filter model
    			var filterManager = CreatePushSubscribeDialog.modelForAttendees.getFilterManager();

    			filterManager.registerFilter("myFilterID", stringRoleFilter);
					
					//filters end
		        	
		       CreatePushSubscribeDialog.autoCompleteAttendees= new WUXAutoComplete(
		     			{
		     				// Assign the model to autoComplete
		     				elementsTree : CreatePushSubscribeDialog.modelForAttendees,
		     				placeholder: "Type the Users Or User Groups",
		     				allowFreeInputFlag: false,
		     				customFilterMessage:"No User or Group (s) Found",
		     				filterCB: function(text) {
					          CreatePushSubscribeDialog.modelForAttendees.setFilterModel({
					            value: {
					              filterId: "myFilterID",
					              filterModel: {
													// The filtermodel can contain anything that we want. Here, we just need the text set in the autocomplete
					                text:  text
					              }
					            }
					          });
					        }
					        //end
		     			}); 
		           
		        	// inject to main container- popup-
		        	let addMemberViewContainer =  UWA.createElement('div', {
						'class':'add-member-container',
						styles: {
							'width':'100%'
						}
					}).inject(container);
		//---------------------------------Search Container---------------Start-------------------------------------------------------
					//for searching user
		        	let addMemberBodyContainer =  UWA.createElement('div', {
						'class':'add-member-body-container'
					}).inject(addMemberViewContainer);
		
					
					
					let memberTable = UWA.createElement('table', { 
						'class': 'add-member-table',
						styles: {
							'width':'100%'
						}
					}).inject(addMemberBodyContainer);
					
					
					//Attendees field
					let attendeestr = UWA.createElement('tr', {'class':'add-member-table-row'}).inject(memberTable);
					UWA.createElement('div', {
		                'class': 'user-UG-label',
		                html: [
						  "Search User / User Groups"
		                ],
						styles: {
							'font-weight':'bold'
						}
		            }).inject(attendeestr);
					
					new UWA.Element('div', {html:"&nbsp;"}).inject(attendeestr); //new
					
					let attendeesField = UWA.createElement('div', {'class': 'attendees-field add-member-table',}).inject(attendeestr);
					
					let attendeesAndSearchDiv = UWA.createElement('div', {'class': 'attendees-field-and-search-button'}).inject(attendeesField);
					//Reddy start
					let typeField=UWA.createElement('div', {
						'class': 'typeAhead-field',
						styles: {
							'width':'80%',
							'display': 'inline-block'
						}
					});
					CreatePushSubscribeDialog.autoCompleteAttendees.inject(typeField);
					typeField.inject(attendeesAndSearchDiv);
					
					let attendeesFieldSearch= UWA.createElement('span',{
						'class':'assignee-field-search',
						styles: {
							    'padding-left': '8px'
						}
						}).inject(attendeesAndSearchDiv);
						
					let attendeesFieldSearchButton =new WUXButton({icon: {iconName: "search"}}).inject(attendeesFieldSearch);
					
					attendeesFieldSearchButton.getContent().addEventListener('buttonclick', function(){			     
						CreatePushSubscribeDialog.onSearchUserClick();
					});
					//Reddy end
					new UWA.Element('div', {html:"&nbsp;"}).inject(attendeesAndSearchDiv);

			//---------------------------------Search Container---------------End-------------------------------------------------------
			
		// Show Events START-------------------------------------------------------------------------------------------------------------
	var eventSubscriptionList = [];
	CreatePushSubscribeDialog.elements.buttonGroup = new WUXButtonGroup({ type: 'checkbox' });
	
		for(var i=0; i< eventsAvailable.length; i++){
					var checkBoxConfig = {};
					checkBoxConfig.type = 'checkbox';
					checkBoxConfig.label =  eventsNLSAvailable[i];
					checkBoxConfig.value =  eventsAvailable[i];
					checkBoxConfig.allowUnsafeHTMLLabel= true;
					var mixedstate = false;
					var checkflag = false;
					
					checkBoxConfig.checkFlag = false;
					
					CreatePushSubscribeDialog.elements.buttonGroup.addChild(new WUXToggle(checkBoxConfig));
		}
				var containerDiv = new UWA.Element('div', {html:'<div style="display: inline-block; height: 34px; line-height: 34px;"> <p>'+NLS.editEventsNotifyMessage+'</p> </div>'});
				var containerRight = new UWA.Element('div');
				var lineElement = new UWA.Element('div',{html: '<hr style= "width:100%; height:1px; margin:10px 0 10px 0"/>' });
				var ButtonSelectAllLabel = NLS.unSelectAll, btnCount = CreatePushSubscribeDialog.elements.buttonGroup.getButtonCount();
				var emphasize = 'secondary';
				for(var cnt=0;cnt< btnCount;cnt++ ){
					if(CreatePushSubscribeDialog.elements.buttonGroup.getButton(cnt).checkFlag === false){
						ButtonSelectAllLabel = NLS.selectAll;
						emphasize = 'primary';
						break;
					}
				}
				var buttonSelectAll = new WUXButton({ 
								label: ButtonSelectAllLabel,
								displayStyle: 'normal',
								emphasize:emphasize,
								allowUnsafeHTMLLabel: true,
								onClick: function(e){			
									if(e.dsModel.label == NLS.selectAll){
										for(var cnt=0;cnt< btnCount;cnt++ ){
											CreatePushSubscribeDialog.elements.buttonGroup.getButton(cnt).checkFlag=true;
											CreatePushSubscribeDialog.elements.buttonGroup.getButton(cnt).mixedState=false;
										}
										e.dsModel.label = NLS.unSelectAll;
										e.dsModel.emphasize = 'secondary';
									} else{
										for(var cnt=0;cnt< btnCount;cnt++ ){
											CreatePushSubscribeDialog.elements.buttonGroup.getButton(cnt).checkFlag=false;
											CreatePushSubscribeDialog.elements.buttonGroup.getButton(cnt).mixedState=false;
										}
										e.dsModel.label = NLS.selectAll;
										e.dsModel.emphasize = 'primary';
									}																		
								}
							});
				buttonSelectAll.inject(containerRight);
				lineElement.inject(containerRight);
				containerRight.inject(containerDiv);
				CreatePushSubscribeDialog.elements.buttonGroup.inject(containerDiv);
		
		
		containerDiv.inject(container);
		// Show Events END----------------------------------------------------------------------------------
					

		require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
				CompassServices.getServiceUrl( { 
					serviceName: '3DSpace',
					platformId : widget.getValue("x3dPlatformId"), 
					onComplete : that.onCompletePlatform,
				});
			});
			
        },   
        updateAutocompleteModel: function(baseURL){
			
				CreatePushSubscribeDialog.getListMember(baseURL).then(function(resp){
					CreatePushSubscribeDialog.modelForAttendees.empty();
					CreatePushSubscribeDialog.modelForAttendees.prepareUpdate();
					for (var i = 0; i < resp.length; i++) {
						
						var nodeForAttendee = new TreeNodeModel(
								{
									label : resp[i].label,
									value :  resp[i].identifier,     //resp[i].value,
									name  : resp[i].name,
									identifier: resp[i].identifier,
									type:resp[i].type,
									grid:{
									type:resp[i].type,
									name:resp[i].name,
									label : resp[i].label,
									value : resp[i].identifier
									},
									id: resp[i].id
								});
						CreatePushSubscribeDialog.modelForAttendees.addRoot(nodeForAttendee);
					}
					CreatePushSubscribeDialog.modelForAttendees.pushUpdate();

				});
			
			

		},
		getListMember: function (baseURL) {
			var returnedPromise = new Promise(function (resolve, reject) {
				var url = baseURL+"/search?xrequestedwith=xmlhttprequest";
				var success = function (data) {

					var results = [];

					if (data && data.results && Array.isArray(data.results)) {
						var personSelectedArr = data.results;
						personSelectedArr.forEach(function (person) {
							var personSearched = {};
							var personAttrs = person.attributes;
							personAttrs.forEach(function (attr) {
								if (attr.name === 'ds6w:what/ds6w:type') personSearched.type = attr['value'];
								if (attr.name === 'resourceid') personSearched.id = attr['value'];
								if (attr.name === 'ds6w:identifier') personSearched.identifier = attr['value'];
								//if (attr.name === 'ds6wg:fullname') personSearched.label = attr['value'];
								if (attr.name === 'ds6w:label') personSearched.label = attr['value'];
								if (attr.name === 'ds6w:identifier') personSearched.name = attr['value'];
							});
							results.push(personSearched);
						});
					}
					resolve(results);
				};

				var failure = function (data) {
					reject(data);
				};

				var queryString = "";
				//queryString = "(flattenedtaxonomies:\"types/Person\" AND policycurrent:\"Person.Active\"  OR flattenedtaxonomies:\"types/Group\" AND current:\"active\" )";
				queryString =CreatePushSubscribeDialog.getPrecondForSearch();
				var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getValue("x3dPlatformId") };
				var inputjson = JSON.stringify(inputjson);

				var options = {};
				options.isfederated = true;
				
				// new changes end
				SubscriptionServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
			});

			return returnedPromise;
		},
       
       onSearchUserClick:  function(){
        	
			var data ="";
            var searchcom_socket,scopeId;
            	var attendeeIDs = [];
            	if(CreatePushSubscribeDialog.autoCompleteAttendees.selectedItems != undefined){
            		if(CreatePushSubscribeDialog.autoCompleteAttendees.selectedItems.length !=0){
		            	CreatePushSubscribeDialog.autoCompleteAttendees.selectedItems.forEach(function(dataElem) {
		            		attendeeIDs.push(dataElem.options.id);
						});
            		}
            	}
				var data = "";
			    var socket_id = UWA.Utils.getUUID();
                var that = this;

                if (!UWA.is(searchcom_socket)) {
                    require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                        searchcom_socket = SearchCom.createSocket({
                            socket_id: socket_id
                        });	
                        let allowedTypes = "Person,Group";    // UG105941: replace with constant
                        var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
                        var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addMembers", true, recentTypes);
						refinementToSnNJSON.precond = CreatePushSubscribeDialog.getPrecondForSearch();  // SearchUtil.getPrecondForMeetingMemberSearch(); //
						refinementToSnNJSON.resourceid_not_in = attendeeIDs;
						//refinementToSnNJSON.resourceid_not_in = "";
                        if (UWA.is(searchcom_socket)) {
                            searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
                           // searchcom_socket.addListener('Selected_Objects_search', ContentActions.selected_Objects_search.bind(that,data));
                            searchcom_socket.addListener('Selected_Objects_search', CreatePushSubscribeDialog.OnSearchComplete.bind(data));
                            
                            searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
                        } else {
                            throw new Error('Socket not initialized');
                        }
                    });
                }
            //});

        },
        
        OnSearchComplete:function(result)
        {
        	for (var d = 0; d < result.length; d++) {

				var node ;
				var tempObject = result[d];
				if(tempObject){
						node = new TreeNodeModel(
								{
									label : tempObject["ds6w:label"],
									value : tempObject["ds6w:identifier"],
									name  : tempObject["ds6w:identifier"],
									identifier:tempObject["ds6w:identifier"],
									type:tempObject["ds6w:type"],
									id: tempObject.id
								});
						var allAttendeeslist = CreatePushSubscribeDialog.autoCompleteAttendees._model.getChildren();
						allAttendeeslist.forEach(function(dataElem) {
							if(dataElem.options.id == node.options.id) {
								if(node.options.type=='Group' || node.options.type=='Group Proxy'){
									dataElem.options.label=node.options.label;
								}
								dataElem.select();
								return;
							}
						});

				}
				
				
				
				
				
			}
        },
        
        getModel :function(){
        	return CreatePushSubscribeDialog.modelForAttendees;
        },
		
		getSearchServiceURL: function () {
			
				require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
					CompassServices.getServiceUrl({ 
						serviceName: '3DSearch',
						platformId : widget.getValue("x3dPlatformId"), 
						onComplete : function (data) {
							//resolve(data);
							CreatePushSubscribeDialog.updateAutocompleteModel(data);
							
							
						},
						onFailure: function (data) {
							//reject(data);
						}
					});
				});
			
			
		},
	/*	getPrecondForSearch = function(){
                                // Person
                                let refinement = {};                                                                                          
                                if(widget.getValue("x3dPlatformId") == "OnPremise"){
                                                // premise 
                                                refinement.precond = "(flattenedtaxonomies:\"types/Person\" OR \"types/Group\") AND current:\"active\"";
                                }else{
                                                // cloud                                
                                                refinement.precond = "([ds6w:type]:(Group) AND [ds6w:status]:(Public)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
                                }
                                return refinement;
		},
        */
       destroy :function(){
        	          
        },
       
    	
        
                      
        };
        return CreatePushSubscribeDialog;
    });


/* global define, widget */
/**
 * @overview Subscription Management - Module to  PushSubscribe in action bar
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0. 
 * @access private
 */
define("DS/ENOSubscriptionMgmt/Commands/PushSubscribe",
		['UWA/Core',
			'UWA/Class',
			'DS/ApplicationFrame/Command',
			'DS/ApplicationFrame/CommandsManager',
			'DS/Core/Core',
			//'DS/Notifications/NotificationsManagerUXMessages', 
			'DS/Notifications/NotificationsManagerViewOnScreen',
			'DS/WAFData/WAFData',
			'DS/PADUtils/PADContext',
			'DS/PADUtils/PADSettingsMgt',
			'DS/WidgetServices/WidgetServices',
			'DS/Controls/ButtonGroup',
			'DS/Windows/Dialog',
			'DS/Windows/ImmersiveFrame',
			'DS/Controls/Button',
			'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
			'DS/ENOSubscriptionMgmt/commands/CommandAvailableOnSelect',
			'DS/Tree/TreeDocument',
			'DS/WUXAutoComplete/AutoComplete',
			'DS/Tree/TreeNodeModel',
			'DS/ENOSubscriptionMgmt/Views/CreatePushSubscribeDialog',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt',
			'DS/ENOSubscriptionMgmt/Components/SubscriptionNotify'
			], function (
					UWA,
					Class,
					AFRCommand,
					CommandsManager,
					WUX,
				//	NotificationsManagerUXMessages,
					NotificationsManagerViewOnScreen,
					WAFData,
					PADContext,
					PADSettingsMgt,
					WidgetServices,
					WUXButtonGroup,
					WUXDialog,
					WUXImmersiveFrame,
					WUXButton,					
					ParseJSONUtil,
					OnSelectCommand,
					TreeDocument,
					WUXAutoComplete,
					TreeNodeModel,
					CreatePushSubscribeDialog,
					NLS,
					SubscriptionNotify
			) {
	'use strict';

	// -- debug purpose only --
	// WUX.enableWUXConsole();
	var wuxConsole = WUX.getWUXConsole();
	var selected_nodes;

	var PushSubscribeCmd = Class.extend(AFRCommand, OnSelectCommand,{
		/**
		 * Execute a command
		 * @namespace WUX.AFR
		 * @class Command
		 * @extends UWA.Class
		 * @constructor
		 *
		 */
		init: function (options) {
			this.options = options;
			this._parent(options, {
				mode: 'exclusive',
				isAsynchronous: true
			});
		},

		beginExecute: function () {
			// -- Get the frame --
			this._frmWindow = this.getFrameWindow();			
		},

		resumeExecute: function () {
			//console.log('Resuming command:' + this._id);
		},
		
		execute: function (options) {			
			console.log('Exceute  command:' + this._id);
			var that = this;		
			that.onCompletePlatform = function(url){
				WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWA.extend(that.options, {
					method : 'GET',
					url_temp:url,
					onComplete : that.onCompleteCSRF
				}, true));
			};
			
			that.onCompleteCSRF = function(csrf, resp, ref){
				var objThis = this;
				if(typeof objThis == 'undefined'){
					objThis = (ref == undefined)? {} : ref;
				}
				//objThis._notif_manager = NotificationsManagerUXMessages;
				//NotificationsManagerViewOnScreen.setNotificationManager(objThis._notif_manager);
			//	widget.subscribeNotify=new SubscriptionNotify();  //new notification placement
				var url = objThis.url_temp + '/resources/v1/modeler/subscriptions';					 
				var parseJSONUtil = new ParseJSONUtil();
				url = parseJSONUtil.getURLwithLanguage(url);
				
				var localContext = PADContext.get();
				if (null == localContext){ 
					localContext = this.context;
					if (null == localContext){ 
						localContext = this.options.context;
					}
				};    
												
				var insideModel = localContext.model;
				if (!insideModel || !insideModel.objectId){
					selected_nodes = localContext.getSelectedNodes();
				}
				
				var resultElementSelected = [];
				var that = this;
				var typeCheck;
				var proceedCheck=true;
				 var count=0;
				
				//if selected nodes is 0 show Warning message
				if(selected_nodes.length == 0){
					new SubscriptionNotify().handler().addNotif({
						level: 'warning',
						message: NLS.subscribeSelectError,
					    sticky: false
					});
					return;
				}
				
				if (selected_nodes.length) {
					selected_nodes.forEach(function(node) {
					   
						//Instance has priority as it displayed both reference and instance
						var nodeID = node && typeof node.getInstID === "function" ? node.getInstID() : null;
						if (nodeID != null && Array.isArray(nodeID)){
							nodeID = nodeID.length > 0 ? nodeID[0] : null;
						}
						var defaultMetatype = nodeID ? 'relationship' : 'businessobject';
						nodeID = nodeID ? nodeID : node.getID();
						nodeID = nodeID ? nodeID : node.id;
						var metatype = node.metatype ? node.metatype: defaultMetatype;
						var source = node.source ? node.source : null;
						
						var tenant = parseJSONUtil.getTenantFromNode(node);
						var type = parseJSONUtil.getTypeFromNode(node);
						//var type = node.type ? node.type : (node.options.type ? node.options.type : null);
						if(count === 0){
						 typeCheck=type;
						}
						count++;
						
						if(typeCheck !=undefined && typeCheck != type){
						proceedCheck=false;				
						//return;
						}
						if (nodeID) {
							var initModel = {
									'type' : type,
									'cestamp' : metatype,
									'relId' : nodeID,
									'id' : nodeID,
									'dataelements':{}
							};
							var tenant = tenant ? tenant : WidgetServices.getTenantID();

							if (tenant) initModel['tenant'] = tenant;
							if (source) initModel['source'] = source;
							if (type) initModel['type'] = type;
							resultElementSelected.push(initModel);
						};
					});
				}
				
				
				if(proceedCheck == true)
				{
				// Dialog Box show
					// Create the ImmersiveFrame
					var immersiveFrame = new WUXImmersiveFrame();
					let myContent=new UWA.Element("div", { "id":"PushSubscribeView","class":"push-Subscribe-view-container",
											html: "" 
										})
					
					var dialog = new WUXDialog({
							title: NLS.pushSubscriptionTitle,
							width: 500,
							height: 400,
							modalFlag: true,
							content: myContent,
							immersiveFrame: immersiveFrame,
							recId: "MyDialog",
							resizableFlag: true,

							buttons: {
							  Cancel: new WUXButton({
								onClick: function (e) {
								  var button = e.dsModel;
								  var myDialog = button.dialog;
								  console.log("on " + button.value + " button : dialog title = " + myDialog.title);
								   myDialog.close();
									if(immersiveFrame) {
				                    	immersiveFrame.destroy();
				                    }
									immersiveFrame=undefined;
									NotificationsManagerViewOnScreen.inject(document.body);
								}
							  }),
							  Ok: new WUXButton({
								label:NLS.pushSubscribe,  // dont hardcode -get from NLS.Subscribe
								onClick: function (e) {
								  let button = e.dsModel;
								  let myDialog = button.dialog;
								  console.log("on " + button.value + " button : dialog title = " + myDialog.title);
								  //Get Persons Start
								  let userList=CreatePushSubscribeDialog.autoCompleteAttendees.selectedItems;
								  let users="";
								if(userList != undefined){
								  for (let i = 0; i < userList.length; i++) {
									users+= userList[i]._options.id+",";
								  }
								}
								  if(users != undefined && users != ""){
										users = users.substring(0, users.length - 1).trim();
									}
								
								  //Get Persons End
									
									// Get Events Data Start				
									let eventBtnCount=CreatePushSubscribeDialog.elements.buttonGroup.getButtonCount();
									let eventSubscribed="";
									for (let i = 0; i < eventBtnCount; i++) {
										if(CreatePushSubscribeDialog.elements.buttonGroup.getButton(i).checkFlag== true){
										  eventSubscribed += CreatePushSubscribeDialog.elements.buttonGroup.getButton(i).value+",";
										}
									}
									if(eventSubscribed != undefined && eventSubscribed != ""){
										eventSubscribed = eventSubscribed.substring(0, eventSubscribed.length - 1).trim();
									}
									// Get Events Data End
									if(eventSubscribed.length === 0){
									
								  new SubscriptionNotify().handler().addNotif({
										level: 'error',
										message: NLS.PushSubscribeErrorMessage1,
							    		sticky: false
										});
										
									return;
									}
									if(users.length === 0){
									
									new SubscriptionNotify().handler().addNotif({
										level: 'error',
										message: NLS.PushSubscribeErrorMessage,
							    		sticky: false
										});
									return;
									}
									
									//update dataelements Start
									let dataEle = {
										'personList' : users,
										'eventsList' : eventSubscribed
									}
									for (let i = 0; i < resultElementSelected.length; i++) {
										resultElementSelected[i].dataelements=dataEle;
									}
									//update dataelements End
									
									// Create Push Subscription service Start
								    	
								    let urll = objThis.url_temp + '/resources/v1/modeler/subscriptions/createPushSubscription';					 
									var parseJSONUtil = new ParseJSONUtil();
									urll = parseJSONUtil.getURLwithLanguage(urll);
									var pushSubscribeOptions = {
											'method' : 'POST',
											'headers' : {
													 'Content-Type' : 'application/ds-json'					                     
											}
									};
									pushSubscribeOptions.data = JSON.stringify(parseJSONUtil.createDataWithElementForRequest(resultElementSelected, JSON.parse(csrf).csrf));
										
									pushSubscribeOptions.onComplete = function(resp){
									//Close dialog if push subscription successfull.
									    myDialog.close();
										new SubscriptionNotify().handler().addNotif({
										level: 'success',
										message: NLS.pushSubscribeSuccess,               
									    sticky: false
									});
									
									if(immersiveFrame) {
				                    	immersiveFrame.destroy();
				                    } 
									};
									
									pushSubscribeOptions.onFailure = function(){
										
										new SubscriptionNotify().handler().addNotif({
										level: 'error',
										message: NLS.pushSubscribeError,          
									    sticky: false
									}); 
									};
									pushSubscribeOptions.timeout=0;
									WAFData.authenticatedRequest(urll, pushSubscribeOptions);
								    
								    //Create Push Subscription service End
									
								}
							  }),
							  
							},

						  });
						  
						  dialog.addEventListener('close', function (e) {
						  NotificationsManagerViewOnScreen.inject(document.body);             	
							if(immersiveFrame) {
		                    	immersiveFrame.destroy();
		                    }
							immersiveFrame=undefined;
						});

				//Dialog Box Ends-------------------

				// service call to get events list Start
					var editSubscribeOptions = {};
					var eventsAvailable = [], eventsNLSAvailable = [];
						var postURL = objThis.url_temp + '/resources/v1/modeler/subscriptions/getSubscriptionsbyPost';
						var parseJSONUtil = new ParseJSONUtil();
						postURL = parseJSONUtil.getURLwithLanguage(postURL);
						
						editSubscribeOptions.method = 'POST';
						editSubscribeOptions.headers = {
								 'Content-Type' : 'application/ds-json',
						};
						editSubscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(resultElementSelected, JSON.parse(csrf).csrf));
							
						editSubscribeOptions.onComplete = function(serverResponse){

							var response = JSON.parse(serverResponse);
							if(response.data[0].dataelements.objEventList.length === 0){
								 new SubscriptionNotify().handler().addNotif({
										level: 'error',
										message: NLS.PushSubscribeErrorMessage3,          
									    sticky: false
									}); 
								 return;
							}
						response.data.forEach(function(dataElem) {
						
							eventsAvailable = dataElem.dataelements.objEventList;
							eventsNLSAvailable = dataElem.dataelements.objEventList_NLS;
							
						});
						immersiveFrame.inject(document.body);
						var container=document.getElementById("PushSubscribeView");
						CreatePushSubscribeDialog.build(container,eventsAvailable,eventsNLSAvailable);
							
							
						};		
						editSubscribeOptions.timeout=0;
						WAFData.authenticatedRequest(postURL,editSubscribeOptions);
				
				}  //proceedCheck if ends
				else{
					 new SubscriptionNotify().handler().addNotif({
										level: 'error',
										message: NLS.PushSubscribeSameTypeErrorMessage,
							    		sticky: false
										});	
					return;
				}
            
				
			};
			
			
			require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
				CompassServices.getServiceUrl( { 
					serviceName: '3DSpace',
					platformId : widget.getValue("x3dPlatformId"), 
					onComplete : that.onCompletePlatform,
				});
		});		
			if(CommandsManager.getCommand( this._id )){
				CommandsManager.getCommand( this._id ).end();
			}else{
				var commandId = this._id;
				if(CommandsManager.getCommands()["[object Object]"][commandId])
				CommandsManager.getCommands()["[object Object]"][commandId].end();
			}
			return that;
			
		},
		endExecute: function () {
			console.log('Stop command:' + this._id);
			wuxConsole.warn('Stop command:' + this._id);
		}

	});

	return PushSubscribeCmd;
});

/*
global widget
 */
define('DS/ENOSubscriptionMgmt/Controller/SubscriptionController',[
	'DS/ENOSubscriptionMgmt/Services/SubscriptionServices',
	'UWA/Promise',
	'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
	],
function(SubscriptionServices, Promise, NLS) {
    'use strict';
    let SubscriptionController;
    //TODO implement a general callback method for anykind of service failure
    let commonFailureCallback = function(reject,failure){
    			reject(failure);
    }
    
    /*All methods are public, need to be exposed as this is service controller file*/
    SubscriptionController = {
    		
    		fetchViewSubscriptionsDialogs: function(resultElementSelected,csrftoken,spaceurl){
    			return new Promise(function(resolve, reject) {
    				SubscriptionServices.fetchViewSubscriptionsDialogs(resultElementSelected,csrftoken,spaceurl).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		}
    		
       };
    return SubscriptionController;

});

/**
 * Route summary grid view custom column
 */

define('DS/ENOSubscriptionMgmt/Config/SubscriptionGridViewOnCellRequest', 
		[
			'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
			'DS/WAFData/WAFData',
			 'DS/Controls/Button',
			 'DS/Controls/TooltipModel',
			 'DS/ENOSubscriptionMgmt/Controller/EnoviaBootstrap', 
			 'DS/ENOSubscriptionMgmt/Components/SubscriptionNotify',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
		 ], 
		function(ParseJSONUtil,WAFData,WUXButton, WUXTooltipModel,EnoviaBootstrap,SubscriptionNotify,NLS) {
	
    'use strict';
  

   
    
    
	 let onSubscriptionCellRequest= function (cellInfos) {
     		var cell= cellInfos.cellView.getContent(),	            		
             commandsDiv;
     		let reusableContent;
     		if (!cellInfos.isHeader) {
     			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_action_');
                 commandsDiv = UWA.createElement('div');
                 var disableUnsubscribe=false;
                 if(cellInfos.nodeModel._options.grid.context=='User' && cellInfos.nodeModel._options.grid.Name != widget.data.dsUser && cellInfos.nodeModel._options.grid.relationship=='Subscribed Person' ){
                 	disableUnsubscribe=true
                 }
                 var imgIcon=EnoviaBootstrap.get3DSpaceURL() + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png';
                 if(cellInfos.nodeModel._options.grid.relationship=='Subscribed Person'){
                 	imgIcon=EnoviaBootstrap.get3DSpaceURL() + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png';
                 }else if(cellInfos.nodeModel._options.grid.relationship=='Pushed Subscription'){
                 	imgIcon=EnoviaBootstrap.get3DSpaceURL() + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribeForOthers.png';
                 }else{ 
                 	imgIcon=EnoviaBootstrap.get3DSpaceURL() + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png';
                 }
             	var buttonUnsubscribe = new WUXButton({ 
						label: '',
						displayStyle: 'icon',	
						allowUnsafeHTMLLabel: true,
						disabled: disableUnsubscribe,
						icon: imgIcon,//EnoviaBootstrap.get3DSpaceURL() + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png',
						onClick: function(e){
							e.stopPropagation();
							e.preventDefault();
							var objId = cellInfos.nodeModel._options.id;
							var objType = cellInfos.nodeModel._options.grid.type;
							var context = cellInfos.nodeModel._options.grid.context;
							
							var objEvent = cellInfos.nodeModel._options.grid.event;	
							var personGroupid = "";
							if(context == "User") {
								personGroupid = cellInfos.nodeModel._options.grid.id;
							}
							var objEventName ="";
							if(context == "User"|| context == "Event") {
								objEventName = objEvent;
							}
							var updatedData = [ {
								id: objId, 
								type: objType, 
								dataelements: {
									objectId : objId,
									personOrGroupId: personGroupid,
									eventName :objEventName
								}
							}
							];
							
							var subscribeOptions = {};
							subscribeOptions.method = 'POST';
							subscribeOptions.headers = {
				                     'Content-Type' : 'application/ds-json',
							};
							subscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(updatedData, EnoviaBootstrap.getcsrfToken()));
								
							subscribeOptions.onComplete = function(serverResponse){
								//var subscriptionNotification = EnoviaBootstrap.getNoficationDiv();
								
									new SubscriptionNotify().handler().addNotif({
										level: 'success',
										message: NLS.unSubscribeMYSubscriptions,
									    sticky: false
									});
								
								if(cellInfos.nodeModel.options.grid.event == ''){
									cellInfos.nodeModel.remove();
								}else if(cellInfos.nodeModel._parentNode.options.children.length == 1){
									cellInfos.nodeModel._parentNode.remove();
								} else{
									cellInfos.nodeModel.remove();
								}
								
								/*dialog.title = NLS.replace(NLS.MySubscriptionsTitle, {
				            		tag1: tree.getDocument().getChildren().length
				            	});
								searchDiv.updateEventAndTypeDropdown();*/
																		
							};
							
							subscribeOptions.onFailure = function(){
								//var subscriptionNotification = EnoviaBootstrap.getNoficationDiv();
								new SubscriptionNotify().handler().addNotif({
									level: 'error',
									message: NLS.unsubscribeEventsFailure,
								    sticky: true
								});
							};
							var url = EnoviaBootstrap.get3DSpaceURL() + '/resources/v1/modeler/subscriptions/unsubscribeUserAndGroup';
							url = new ParseJSONUtil().getURLwithLanguage(url);
							WAFData.authenticatedRequest(url, subscribeOptions);																
						}
					});
             	
             	buttonUnsubscribe.tooltipInfos = new WUXTooltipModel({ shortHelp: NLS.Unsubscribe,allowUnsafeHTMLShortHelp: true});
             	
             	buttonUnsubscribe.inject(commandsDiv);

                 setTimeout(function () {
                     cell.setAttribute('title', '');
                 },0);
                 cellInfos.cellView._setReusableContent(commandsDiv); 
                // cell.setContent(commandsDiv);
     		}
		 
		 
	    	
		};

	

      let SubscriptionGridViewOnCellRequest={
    		  
    		  onSubscriptionCellRequest : (cellInfos) => { return onSubscriptionCellRequest(cellInfos);}
    		  
  	};
      return SubscriptionGridViewOnCellRequest;
  });

/* global define, widget */
/**
  * @overview Subscription Widget - 
  * @version 1.0.
  * @access private
  */
define('DS/ENOSubscriptionMgmt/Model/ViewSubscriptionModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENOSubscriptionMgmt/Utilities/DataFormatter',
    'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
    ],
    function(
			TreeDocument,
			TreeNodeModel,
			DataFormatter,
			NLS
    ) {
	'use strict';
	let model = new TreeDocument({
        useAsyncPreExpand: true
    });	
	
	let createTreeDocumentModel = function(response){		
	    model.prepareUpdate();
	    
	    response.data.forEach(function(dataElem) {
	    	var labelValue = dataElem.dataelements.name
	    			if(dataElem.dataelements.title && dataElem.dataelements.title  !=null && dataElem.dataelements.title !="null"){
	    				labelValue =dataElem.dataelements.title;
					}
			var root = new TreeNodeModel({
                label: labelValue,
                id: dataElem.dataelements.id,
                grid: DataFormatter.pushsubscriptionGridData(dataElem),
            });
			var eventsSubscribedNLS = dataElem.dataelements.objEventList_NLS;
			var eventsSubscribed = dataElem.dataelements.objEventList;
			
			for(var i=0; i< eventsSubscribed.length; i++){
				var subs = eventsSubscribed[i];
				if(subs) {
					subs = JSON.parse(subs);
				}
				var evntname = subs.EventName;
				var subsNLS = eventsSubscribedNLS[i];
				var firstChild = new TreeNodeModel({
	                label: subsNLS,	
	                id: dataElem.dataelements.id,
	                grid: {
	                	Name:subsNLS,
	                    event: evntname,
	                    event_en: subsNLS,
	                    type:dataElem.type,
	                    context: "Event"
	                    
	                }
	            });
				var UserDetails = subs.UserDetails;
				for(var j=0; j< UserDetails.length; j++){
					var user = UserDetails[j];
					var username = user.objectName;
					var objectRev = user.objectRev;
					var userLabel = user.objectName;
					var userRel=user.objectRelationship;
					if(user.objectTitle && user.objectTitle !=null && user.objectTitle !="null"){
						userLabel = user.objectTitle;
					}
					var userTree = new TreeNodeModel({
		                label: userLabel,	
		                id: dataElem.dataelements.id,
		                grid: {
		                	Name: username,
		                    event: evntname,
		                    event_en: subsNLS,	                    
		                    id: user.objectId,
		                    actType:user.objectType_NLS,
		                    usertype:user.objectType,
		                    revision:objectRev,
		                    context: "User",
		                    relationship:userRel
		                }
		            });
					firstChild.addChild(userTree);
				}
				root.addChild(firstChild);								
			}																				
		model.addRoot(root);
	    });
	    model.pushUpdate();
	    return model;
	};
	
	
	
	let destroy = function(){
		model = new TreeDocument();
	};
	
	
	let ViewSubscriptionModel = {
			createModel : (response) => {return createTreeDocumentModel(response);},
			getModel : () => {return model;},
			destroy : () => {return destroy();},
			deleteSelectedRows : () => {return deleteSelectedRows();}

	}
	return ViewSubscriptionModel;

});


define('DS/ENOSubscriptionMgmt/Config/PushSubscriptionGridViewConfig', 
		[
			'DS/ENOSubscriptionMgmt/Config/SubscriptionGridViewOnCellRequest',
			'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt'
		], 
		function(SubscriptionGridViewOnCellRequest,
				NLS) {
			'use strict';
		
			let PushSubscriptionGridViewConfig=[
			  /* {
                   text: "",
                   dataIndex: "selection",
                   type: "selection",
                   minWidth:0,
                   width: 40
               },*/ {
                   text: NLS.name,
                   dataIndex: "tree",
                   width: "auto"
               },
				{
					text: NLS.colType,
					dataIndex: 'actType',
					isDraggable: false		
				},{
					text: NLS.colRevision,
					dataIndex: 'revision',
					//width : 120,
					isDraggable: false
				},{

	            	text: NLS.colAction,
	            	dataIndex: 'action',
	            	width : 60,
	            	isDraggable: false,
	            	'onCellRequest': SubscriptionGridViewOnCellRequest.onSubscriptionCellRequest
	            	/*function(cellInfos){
	            		var cell= cellInfos.cellView.getContent(),	            		
	                    commandsDiv;
	            		
	            		if (!cellInfos.isHeader) {

	                        commandsDiv = UWA.createElement('div');
	                    	var buttonUnsubscribe = new WUXButton({ 
								label: '',
								displayStyle: 'icon',	
								allowUnsafeHTMLLabel: true,
								icon: that.url + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png',
								onClick: function(e){
									e.stopPropagation();
									e.preventDefault();
									var objId = cellInfos.nodeModel._options.grid.id;
									var objType = cellInfos.nodeModel._options.grid.type_en;
									var objEvent = cellInfos.nodeModel._options.grid.event_en;									
									var updatedData = [ {
										id: objId, 
										type: objType, 
										dataelements: {
											eventsSubscribed :[]
										}
									}
									];
									
									var subscribeOptions = {};									
									if(objEvent){
										subscribeOptions.method = 'DELETE';
										updatedData[0].dataelements.eventsSubscribed[0] = objEvent;
									}else{
										subscribeOptions.method = 'PUT';
									}
									
									subscribeOptions.headers = {
						                     'Content-Type' : 'application/ds-json',
									};
									subscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(updatedData, that.csrf));
										
									subscribeOptions.onComplete = function(serverResponse){
										that._notif_manager.addNotif({
											level: 'success',
											message: NLS.unSubscribeMYSubscriptions,
										    sticky: false
										});
										
										if(cellInfos.nodeModel.options.grid.event == ''){
											cellInfos.nodeModel.remove();
										}else if(cellInfos.nodeModel._parentNode.options.children.length == 1){
											cellInfos.nodeModel._parentNode.remove();
										} else{
											cellInfos.nodeModel.remove();
										}
										
										dialog.title = NLS.replace(NLS.MySubscriptionsTitle, {
						            		tag1: tree.getDocument().getChildren().length
						            	});
										searchDiv.updateEventAndTypeDropdown();
																				
									};
									
									subscribeOptions.onFailure = function(){
										that._notif_manager.addNotif({
											level: 'error',
											message: NLS.unsubscribeEventsFailure,
										    sticky: true
										});
									};
									var url = that.url + '/resources/v1/modeler/subscriptions';
									url = new ParseJSONUtil().getURLwithLanguage(url);
									WAFData.authenticatedRequest(url, subscribeOptions);																
								}
							});
	                    	
	                    	buttonUnsubscribe.tooltipInfos = new WUXTooltipModel({ shortHelp: NLS.Unsubscribe,allowUnsafeHTMLShortHelp: true});
	                    	
	                    	buttonUnsubscribe.inject(commandsDiv);

	                        setTimeout(function () {
	                            cell.setAttribute('title', '');
	                        },0);
	                        
	                        cell.setContent(commandsDiv);
	            		}
	            	}*/
				}				
				];
		
			return PushSubscriptionGridViewConfig;
		}
	);

/* global define, widget */
/**
  * @overview Subscription Management
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
// XSS_CHECKED
define('DS/ENOSubscriptionMgmt/Views/ObjectMySubscriptionEvents',
[
   'DS/WAFData/WAFData',
   'UWA/Controls/Abstract',
   'DS/PADUtils/PADContext',
   'DS/WidgetServices/WidgetServices',
   'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
   'DS/Controls/ButtonGroup',
   'DS/Windows/Dialog',
   'DS/Windows/ImmersiveFrame',
   'DS/Controls/Button',
   'DS/Notifications/NotificationsManagerUXMessages',
   'DS/Notifications/NotificationsManagerViewOnScreen',
   'DS/Tree/TreeNodeModel',
   'DS/Tree/TreeListView',
   'DS/Tree/TreeDocument',
   'DS/ENOSubscriptionMgmt/Views/MySubscriptionsToolbar',
   'DS/Controls/TooltipModel',
   'DS/Utilities/Array',
   'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt',
   'css!DS/ENOSubscriptionMgmt/ENOSubscriptionMgmt'   
],
function(
	WAFData,
	Abstract,
	PADContext,
	WidgetServices,
	ParseJSONUtil,
	WUXButtonGroup,
    WUXDialog,
    WUXImmersiveFrame,
    WUXButton,
	NotificationsManagerUXMessages,
	NotificationsManagerViewOnScreen,
	TreeNodeModel,
	TreeListView,
	TreeDocument,
	MySubscriptionsToolbar,
	WUXTooltipModel,
	ArrayUtils,
	NLS	
) {
	'use strict';	
	var ObjectMySubscriptionEvents = {
		serverresponse : {},
		showMySubscriptionDialog : function() {
			var that = this;
			that.SubscriptionDialogOpened = true;
			that._notif_manager = NotificationsManagerUXMessages;
			NotificationsManagerViewOnScreen.setNotificationManager(that._notif_manager);
			
			var modalWidth,modalHeight;
			try{
			modalWidth =  Math.round(widget.getViewportDimensions().width * 0.80 > 800 ? 810 : widget.getViewportDimensions().width * 0.80) ;
			modalHeight  =  Math.round(widget.getViewportDimensions().height * 0.80);
			}catch(e){
				modalWidth =  Math.round(widget.body.container.offsetWidth * 0.80 > 800 ? 810 : widget.body.container.offsetWidth * 0.80) ;
				modalHeight  =  Math.round(widget.body.container.offsetHeight * 0.80);
			}
			
			that.onCompletePlatform = function(url){
				var options={};
				that.url = url;
				WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWA.extend(options, {
					method : 'GET',
					onComplete : that.onCompleteCSRF
				}, true));
			};
			/* that.customSelect = function(env){
				var parent_node = env.data.nodeModel._parentNode;
				var currentNode = env.data.nodeModel;				
				// if all child nodes are selected, then select the parent node
				if(parent_node._rowID !== null){
//					var childNodes = parent_node.getChildren();
//					var allChildrenSelected = false;
//					var childrenSelectedCount = 0;
//					childNodes.forEach(function (childNode){
//						if(childNode.isSelected()){
//							childrenSelectedCount ++;
//						}
//					});
//					if(childNodes.length === childrenSelectedCount){
//						parent_node.select();
//					}
					
					if(parent_node.areAllChildrenSelected()){
						parent_node.select();
					}else{ //if child node is selected, then partially select the parent node
						
					}
				}else{ //if the selected node is parent node then, select all children
					if(!currentNode.isExpanded()){
						currentNode.expand();
					}
					var childNodes = currentNode.getChildren();
					if(childNodes){
						childNodes.forEach(function (childNode){
							childNode.select();
						});
					}
				}
			}; */
			
			
			/* that.customUnSelect = function(env){
				var parent_node = env.data.nodeModel._parentNode;
				var currentNode = env.data.nodeModel;
				if(currentNode._rowID == null){
					return;
				}
				// if all child nodes are unselected, then unselect the parent node
				if(parent_node._rowID !== null){				
					if(parent_node.areAllChildrenUnselected()){
						that.customUnselectParent = false;
						parent_node.unselect();
					}else{ //if child node is selected, then partially unselect the parent node
						that.customUnselectParent = true;
						parent_node.unselect();
					}
				}else{
					if(that.customUnselectParent){//If only one child is unselected, don't proceed further
						that.customUnselectParent = false;
						return;
					}
					if(currentNode.isExpanded()){ //if the selected node is parent node then, unselect all children
						currentNode.collapse();
					}
					var childNodes = currentNode.getChildren();
					if(childNodes){
						childNodes.forEach(function (childNode){
							childNode.unselect();
						});
					}
				}
			}; */
			
			that.drawListViewPage = function(serverResponse){
				var response = JSON.parse(serverResponse);
				that.resposeData = response;
				if(response.data.length == 0 || (response.data.length > 0 && response.data[0].dataelements.eventsSubscribed.length === 0 )){
					 var myContent = new UWA.Element('div', { html: "<p>"+NLS.EmptySubscriptionListMsg+"</p>" });
					 that.showDialog(myContent, response.data.length);
					 return;
				}
				//Start here
				var model = new TreeDocument({
	                useAsyncPreExpand: true
	            });				
				//end here		
				
				response.data.forEach(function(dataElem) {					
					var root = new TreeNodeModel({
		                label: dataElem.dataelements.name,
		                width: 300,
		                grid: {
		                    type: dataElem.dataelements.type_nls,		                    
		                    type_en: dataElem.dataelements.type,
		                    event: '',
		                    event_en: '',
		                    id: dataElem.id,
		                    actType : dataElem.dataelements.type_nls,
		                    revision:dataElem.dataelements.revision,
		                }						
		            });
		           /* root.onSelect(function (ev) {
		            	//console.log(tree)
		            	that.customSelect(ev);
		            });
		            
		            root.onUnselect(function (ev) {
		            	//console.log(tree);	
		            	that.customUnSelect(ev);
		            }); */

					
					//var eventsAvailable = dataElem.dataelements.objEventList;
					var eventsSubscribedNLS = dataElem.dataelements.eventsSubscribed_NLS;
					var eventsSubscribed = dataElem.dataelements.eventsSubscribed;
					
					for(var i=0; i< eventsSubscribed.length; i++){
						var subs = eventsSubscribed[i];
						var subsNLS = eventsSubscribedNLS[i];
						var firstChild = new TreeNodeModel({
			                label: subsNLS,			                
			                grid: {
			                    type: dataElem.dataelements.type_nls,
			                    type_en:dataElem.dataelements.type,
			                    event: subsNLS,
			                    event_en: subs,	                    
			                    id: dataElem.id
			                }
			            });						
						root.addChild(firstChild);								
					}																				
					model.addRoot(root);
				});
				var options = TreeListView.SETTINGS.STANDARD_CHECKBOXES;
				options.show["rowHeaders"] = false;
				options.isEditable = false;	
				options.isDraggable = false;
				options.height = modalHeight - 125;
				options.enableDragAndDrop = false;
				options.width = modalWidth;
				options.allowUnsafeHTMLContent = true;
				//options.shouldCellAllowUnsafeHTMLContentAt = function () { return true; };
				options.columns.push({
					text: NLS.colType,
					dataIndex: 'actType',
					isDraggable: false
	            });
				options.columns.push({
					text: NLS.colRevision,
					dataIndex: 'revision',
					width : 120,
					isDraggable: false
	            });
	            options.columns.push({
	            	text: NLS.colAction,
	            	dataIndex: '',
	            	width : 60,
	            	isDraggable: false,
	            	'onCellRequest': function(cellInfos){
	            		var cell= cellInfos.cellView.getContent(),	            		
	                    commandsDiv;
	            		
	            		if (!cellInfos.isHeader) {

	                        commandsDiv = UWA.createElement('div');
	                    	var buttonUnsubscribe = new WUXButton({ 
								label: '',
								displayStyle: 'icon',	
								allowUnsafeHTMLLabel: true,
								icon: that.url + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png',
								onClick: function(e){
									e.stopPropagation();
									e.preventDefault();
									var objId = cellInfos.nodeModel._options.grid.id;
									var objType = cellInfos.nodeModel._options.grid.type_en;
									var objEvent = cellInfos.nodeModel._options.grid.event_en;									
									var updatedData = [ {
										id: objId, 
										type: objType, 
										dataelements: {
											eventsSubscribed :[]
										}
									}
									];
									
									var subscribeOptions = {};									
									if(objEvent){
										subscribeOptions.method = 'DELETE';
										updatedData[0].dataelements.eventsSubscribed[0] = objEvent;
									}else{
										subscribeOptions.method = 'PUT';
									}
									
									subscribeOptions.headers = {
						                     'Content-Type' : 'application/ds-json',
									};
									subscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(updatedData, that.csrf));
										
									subscribeOptions.onComplete = function(serverResponse){
										that._notif_manager.addNotif({
											level: 'success',
											message: NLS.unSubscribeMYSubscriptions,
										    sticky: false
										});
										
										if(cellInfos.nodeModel.options.grid.event == ''){
											cellInfos.nodeModel.remove();
										}else if(cellInfos.nodeModel._parentNode.options.children.length == 1){
											cellInfos.nodeModel._parentNode.remove();
										} else{
											cellInfos.nodeModel.remove();
										}
										
										dialog.title = NLS.replace(NLS.MySubscriptionsTitle, {
						            		tag1: tree.getDocument().getChildren().length
						            	});
										searchDiv.updateEventAndTypeDropdown();
																				
									};
									
									subscribeOptions.onFailure = function(){
										that._notif_manager.addNotif({
											level: 'error',
											message: NLS.unsubscribeEventsFailure,
										    sticky: true
										});
									};
									var url = that.url + '/resources/v1/modeler/subscriptions';
									url = new ParseJSONUtil().getURLwithLanguage(url);
									WAFData.authenticatedRequest(url, subscribeOptions);																
								}
							});
	                    	
	                    	buttonUnsubscribe.tooltipInfos = new WUXTooltipModel({ shortHelp: NLS.Unsubscribe,allowUnsafeHTMLShortHelp: true});
	                    	
	                    	buttonUnsubscribe.inject(commandsDiv);

	                        setTimeout(function () {
	                            cell.setAttribute('title', '');
	                        },0);
	                        
	                        cell.setContent(commandsDiv);
	            		}
	            	}
	            });
	            
				options.treeDocument = model;
				/*model.addEventListener("select", function(e) {
			        //mainObject.listenerDiv.innerHTML += "<br>  onSelect";
					if(e.data.nodeModel._getRowID() === 5){
						return;
					}
					that.customSelect(e);
					//console.log('asdasdasd');
			      });
				model.addEventListener("unselect", function(e) {
			        //mainObject.listenerDiv.innerHTML += "<br>  onSelect";
					if(e.data.nodeModel._getRowID() === 5){
						return;
					}
					that.customUnSelect(e);
					//console.log('asdasdasd11');
			      });*/
				options.columns[1].text = NLS.name;
				
				var tree = new TreeListView(options);				

				tree.csrf = that.csrf;
				tree.url = that.url;
				var searchDiv = new MySubscriptionsToolbar(tree);	
				var treeListView = tree;
				var buttonUnsubscribe = new WUXButton({ 
					label: '',
					displayStyle: 'icon',
					emphasize : 'secondary',
					allowUnsafeHTMLLabel: true,
					icon: treeListView.url + '/webapps/ENOSubscriptionMgmt/assets/icons/32/I_ActionUnSubscribe.png',
					onClick: function(e){
						var selectedElements = [];
						var nodesToRemove = [];
						var previousRows = [];
						var selectedRows = treeListView.getDocument().getSelectedNodes();
						if(selectedRows.length === 0){
							that._notif_manager.addNotif({
								level: 'error',
								message: NLS.UnsubscribeErrorMessage,
							    sticky: false
							});
							return;
						}
						selectedRows.forEach(function (row) { 
							if(previousRows.indexOf(row._options.grid.id) > -1){
								nodesToRemove.push(row);
								return;
							}
							previousRows.push(row._options.grid.id);
							nodesToRemove.push(row);						
							var selectedElement = {
									id: row._options.grid.id, 
									type:  row._options.grid.type_en, 
									dataelements: {
										eventsSubscribed :[]
									}	
							}
							if(row._options.grid.event){
								//logic to get all the other events which we are not unsubscribing
								var parent = row.getParent();
								if(parent!= null){
									var children = parent.getChildren();
									var childrenSelectedCount = 0;
									children.forEach(function(child){
										if(child.isSelected()){
											childrenSelectedCount ++;
										}else{
											selectedElement.dataelements.eventsSubscribed.push(child._options.grid.event_en);
										}
									});
									if(parent.getChildren().length === childrenSelectedCount ) //all child nodes are selected
										nodesToRemove.push(parent);
								}								
							}
							selectedElements.push(selectedElement);
						});
						
						var subscribeOptions = {};
						subscribeOptions.method = 'PUT';
						subscribeOptions.headers = {
			                     'Content-Type' : 'application/ds-json',
						};
						subscribeOptions.data = JSON.stringify(new ParseJSONUtil().createDataWithElementForRequest(selectedElements, treeListView.csrf));
							
						subscribeOptions.onComplete = function(serverResponse){
							that._notif_manager.addNotif({
								level: 'success',
								message: NLS.unSubscribeMYSubscriptions,
							    sticky: false
							});
							//Added for performance improvement
							var model = tree._getTrueRoot()._treeDocument;
							model.prepareUpdate();
								ArrayUtils.optimizedForEach(nodesToRemove, function(node) {
								node.remove();
							});
							model.pushUpdate(); 
							dialog.title = NLS.replace(NLS.MySubscriptionsTitle, {
			            		tag1: tree.getDocument().getChildren().length
			            	});
							searchDiv.updateEventAndTypeDropdown();
						};
						
						subscribeOptions.onFailure = function(){
							//console.log('Failure')
							that._notif_manager.addNotif({
								level: 'error',
								message: NLS.unsubscribeEventsFailure,
							    sticky: false
							});
						};
						subscribeOptions.timeout=0;
						var url = treeListView.url + '/resources/v1/modeler/subscriptions';
						url = new ParseJSONUtil().getURLwithLanguage(url);
						WAFData.authenticatedRequest(url, subscribeOptions);
					}
				});
				buttonUnsubscribe.tooltipInfos = new WUXTooltipModel({ shortHelp: NLS.Unsubscribe});
				
				var containerDiv = new UWA.Element('div',{
		    		'class': 'subscription-tree-list-container',   
		    	});
				
				var containerDiv1 = new UWA.Element('div');
				var lineElement = new UWA.Element('div',{html: '<hr style= "width:100%; height:1px; margin:5px 0 10px 0; display:inline-block"/>' });
				buttonUnsubscribe.inject(containerDiv1);				
				searchDiv.buildToolbarView().inject(containerDiv1);
				
				lineElement.inject(containerDiv1);
				containerDiv1.inject(containerDiv);

				tree.inject(containerDiv);
				
				var immersiveFrame = new WUXImmersiveFrame();
	            immersiveFrame.inject(document.body);          
	            var dialog = new WUXDialog({
	            	title: NLS.replace(NLS.MySubscriptionsTitle, {
	            		tag1: response.data.length
	            	}),
	            	modalFlag: true,
	            	width:modalWidth,
	            	height:modalHeight,
	            	minWidth:675,
	            	minHeight:500,
	            	content: containerDiv,
	            	allowMaximizeFlag : true,
	            	resizableFlag : true,
	            	maximizeButtonFlag:false,
	            //   ensureHeightDefinitionOnHierarchy:true,
	            	immersiveFrame: immersiveFrame,
	           //    disabled:false,
	            //   activeFlag:true,
	            	buttons: {
	                   Cancel: new WUXButton({
	                	   label: NLS.close,
	                	   allowUnsafeHTMLLabel: true,
	                       onClick: function (e) {
	                           e.dsModel.dialog.close();
	                           that.SubscriptionDialogOpened = false;
	                           immersiveFrame.destroy();
							   immersiveFrame=undefined;
	                       }
	                   })
	               }
	            });
	            
	            dialog.addEventListener('resize', function (e) {
	            	//console.log('Close on dialog : ' + e.dsModel.title);
                    var treeDiv = tree.getContent().getChildren()[0].getChildren()[1];
                    var modalHeight = e.dsModel.height - 125;
                    treeDiv.style.height = modalHeight +'px';
                    treeDiv.getChildren()[0].style.height = modalHeight +'px';
	            });
	            
	            dialog.addEventListener('close', function (e) {	            	
                    console.log(searchDiv.clearFindfield());
                    that.SubscriptionDialogOpened = false;
                    immersiveFrame.destroy();
					immersiveFrame=undefined;
	            });
	            
			};
			
			that.onCompleteCSRF = function(csrf){
				that.csrf = JSON.parse(csrf).csrf;
				var postURL = that.url + '/resources/v1/modeler/subscriptions';
				var parseJSONUtil = new ParseJSONUtil();
				postURL = parseJSONUtil.getURLwithLanguage(postURL);
				var options = {};
				options.method = 'GET';
				options.headers = {
	                     'Content-Type' : 'application/ds-json',
				};
					
				options.onComplete = function(serverResponse){
					that.drawListViewPage(serverResponse);
				};			
				options.timeout=0;
				WAFData.authenticatedRequest(postURL, options);
				//console.log('execute command:' + this._id);				
			};
			
			that.showDialog = function(myContent, objCount){				 
				 var immersiveFrame = new WUXImmersiveFrame();
		         immersiveFrame.inject(document.body); 		         
				 var dialog = new WUXDialog({
		               title: NLS.MYSubscriptions,
		               modalFlag: true,
		               width:400,//to accomodate the filters
		               height:400,
		               content: myContent,
		               immersiveFrame: immersiveFrame,
		               buttons: {
		                   Close: new WUXButton({
		                	   allowUnsafeHTMLLabel: true,
		                       onClick: function (e) {
		                    	   e.dsModel.dialog.close();
		                    	   that.SubscriptionDialogOpened = false;
		                    	   immersiveFrame.destroy();
								   immersiveFrame=undefined;
		                       }
		                   })
		               }
				 });
				 dialog.addEventListener('close', function (e) {
	                    that.SubscriptionDialogOpened = false;
	                    immersiveFrame.destroy();
						immersiveFrame=undefined;
		            });
			};
			require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
				CompassServices.getServiceUrl( { 
					serviceName: '3DSpace',
					platformId : widget.getValue("x3dPlatformId"), 
					onComplete : that.onCompletePlatform,
				});
			});	
			return that;
		}		
	};
	
	var ObjectMySubscriptionEventsAbs = Abstract.extend(ObjectMySubscriptionEvents);
	
	return ObjectMySubscriptionEventsAbs;
});

/* global define, widget */
/**
 * @overview Subscription Management - Module to create Mysubscription in action bar
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define("DS/ENOSubscriptionMgmt/Commands/MySubscriptions",
		[
			'UWA/Class',
			'DS/ApplicationFrame/Command',
			'DS/ApplicationFrame/CommandsManager',
			'DS/ENOSubscriptionMgmt/Views/ObjectMySubscriptionEvents'
], function(
		Class,
		AFRCommand,
		CommandsManager,
		ObjectMySubscriptionEvents
){
	'use strict';
	
	var wuxConsole = WUX.getWUXConsole();
	var MySubscriptionsCmd = AFRCommand.extend({

		/**
		 * Execute a command
		 * @namespace WUX.AFR
		 * @class Command
		 * @extends UWA.Class
		 * @constructor
		 *
		 */
		init: function (options) {
			this._parent(options, {
				mode: 'exclusive',
				isAsynchronous: true
			});
			this._dialogObj = {};
			this._dialogObj.SubscriptionDialogOpened = false;
		},

		beginExecute: function () {
		//	console.log('Beginning command:' + this._id);
			wuxConsole.info('Beginning command:' + this._id);
		},		

		resumeExecute: function () {
		//	console.log('Resuming command:' + this._id);

		},

		execute: function (options) {		
		//	console.log('execute command:' + this._id);			
			//CommandsManager.getCommand( this._id ).end();
			if(this._dialogObj.SubscriptionDialogOpened === false){
				this._dialogObj = new ObjectMySubscriptionEvents().showMySubscriptionDialog();
			}
			if(CommandsManager.getCommand( this._id )){
				CommandsManager.getCommand( this._id ).end();
			}else{
				var commandId = this._id;
				if(CommandsManager.getCommands()["[object Object]"][commandId])
					CommandsManager.getCommands()["[object Object]"][commandId].end();
			}
		},

		endExecute: function () {
		//	console.log('Stop command:' + this._id);
			wuxConsole.warn('Stop command:' + this._id);
		}

	});

	return MySubscriptionsCmd;
});

/**
 * datagrid view for Agenda summary page
 */
define('DS/ENOSubscriptionMgmt/Views/ViewSubscriptionGridView',
		[ 
			'DS/ENOSubscriptionMgmt/Config/PushSubscriptionGridViewConfig',
			'DS/ENOSubscriptionMgmt/Components/Wrappers/WrapperDataGridView'
			], function(
					PushSubscriptionGridViewConfig,
					WrapperDataGridView
            	    ) {

	'use strict';	
	let build = function(model){
		let data={};
		data.model =model;
		data.columns=PushSubscriptionGridViewConfig;
		
       /* let dataGridViewContainer =		TableUXView.createView(data);
        	//WrapperDataGridView.build(model, PushSubscriptionGridViewConfig, "", gridViewDiv);
        return dataGridViewContainer;
       
        */
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            'class': "viewSubscription-gridView-View"
        });
        let dataGridViewContainer = WrapperDataGridView.build(model, PushSubscriptionGridViewConfig, "", gridViewDiv);
        //_toolbar = WrapperDataGridView.dataGridViewToolbar();
        return dataGridViewContainer;
        
        
    };
	


    let ViewSubscriptionGridView={
            build : (model) => { return build(model);}         
    };

    return ViewSubscriptionGridView;
});

/**
 * 
 */
define('DS/ENOSubscriptionMgmt/Views/ViewSubscriptionsDialog',
        [   
        	'DS/ENOSubscriptionMgmt/Controller/SubscriptionController',
        	'DS/ENOSubscriptionMgmt/Model/ViewSubscriptionModel',
        	'DS/ENOSubscriptionMgmt/Views/ViewSubscriptionGridView',
        	'DS/Windows/Dialog',
        	'DS/Windows/ImmersiveFrame',
        	'DS/Controls/Button',
        	'DS/WAFData/WAFData',
        	"UWA/Core",
        	'UWA/Class/Promise',
        	'DS/ENOSubscriptionMgmt/Controller/EnoviaBootstrap', 
        	'DS/Notifications/NotificationsManagerUXMessages',
			   'DS/Notifications/NotificationsManagerViewOnScreen',
        	'i18n!DS/ENOSubscriptionMgmt/assets/nls/ENOSubscriptionMgmt',
        	   'css!DS/ENOSubscriptionMgmt/ENOSubscriptionMgmt'   
            ], function(
            		SubscriptionController,
            		ViewSubscriptionModel,
            		ViewSubscriptionGridView,
            		WUXDialog,
            		WUXImmersiveFrame,
            		WUXButton,
            		WAFData,
            		UWACore,
                    Promise,
                    EnoviaBootstrap,
            		NotificationsManagerUXMessages,
            		NotificationsManagerViewOnScreen,
            		NLS
            ) {

    'use strict';
    let build = function (resultElementSelected,csrftoken,spaceurl){
    	return new Promise(function(resolve, reject) {
			 if(csrftoken == undefined){
				 require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
					 CompassServices.getServiceUrl( { 
						 serviceName: '3DSpace',
						 platformId : widget.getValue("x3dPlatformId"), 
						 onComplete : function(url){
							 EnoviaBootstrap.set3DSpaceUrl(url);
							 spaceurl = url;
							 WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWACore.extend( {
								 method : 'GET',
								 onComplete : function(csrf){
									 csrftoken=JSON.parse(csrf).csrf;
									 EnoviaBootstrap.setCsrftoken(csrftoken);
									 resolve();
								 }
							   })
							 );
						 }
					 })
				 });
			 }else{
				 resolve();
			 }
		 }).then(function() {
			 return build1(resultElementSelected,csrftoken,spaceurl); 
		 });
    }
    let build1 = function(resultElementSelected,csrftoken,spaceurl){
    	 if(!showView()){
    		 let containerDiv = UWA.createElement('div', {id: 'ViewSubscriptionsDialog','class':'subscription-dialog'}); 
    		 SubscriptionController.fetchViewSubscriptionsDialogs(resultElementSelected,csrftoken,spaceurl).then(function(response) {
    			 ViewSubscriptionModel.destroy();
    			 ViewSubscriptionViewModel(response);
    			 drawViewSubscriptionsDialogsView(containerDiv); 
	         }); 
    	 }
    };

    let drawViewSubscriptionsDialogsView = function(containerDiv){
        //To add the dataGrid view list
        var model = ViewSubscriptionModel.getModel();
        let datagridDiv = ViewSubscriptionGridView.build(model);        
        datagridDiv.inject(containerDiv);
        
       var modalWidth,modalHeight;
		try{
		modalWidth =  Math.round(widget.getViewportDimensions().width * 0.80 > 800 ? 810 : widget.getViewportDimensions().width * 0.80) ;
		modalHeight  =  Math.round(widget.getViewportDimensions().height * 0.80);
		}catch(e){
			modalWidth =  Math.round(widget.body.container.offsetWidth * 0.80 > 800 ? 810 : widget.body.container.offsetWidth * 0.80) ;
			modalHeight  =  Math.round(widget.body.container.offsetHeight * 0.80);
		}
        
        var immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body);
        var titleTag = NLS.replace(NLS.EditSubscriptionsTitle , {tag1:0});
        if(model.getChildren() && model.getChildren().length>1) {
	        	titleTag =  NLS.replace(NLS.EditSubscriptionsTitle1, {
	        		tag1: model.getChildren().length
	            });
        }
        if(model.getChildren() && model.getChildren().length==1) 
    	{
        	titleTag =  NLS.replace(NLS.EditSubscriptionsTitle, {
        		tag1: model.getChildren().length
            });
    	}
        var dialog = new WUXDialog({
        	title: titleTag,
        	modalFlag: true,
        	width:modalWidth,
        	height:modalHeight,
        	minWidth:675,
        	minHeight:500,
        	content: containerDiv,
        	allowMaximizeFlag : true,
        	resizableFlag : true,
        	maximizeButtonFlag:false,
        //   ensureHeightDefinitionOnHierarchy:true,
        	immersiveFrame: immersiveFrame,
       //    disabled:false,
        //   activeFlag:true,
        	buttons: {
               Cancel: new WUXButton({
            	   label: NLS.close,
            	   allowUnsafeHTMLLabel: true,
                   onClick: function (e) {
                	   
                       e.dsModel.dialog.close();
                       if(immersiveFrame) {
                    	   immersiveFrame.destroy();
                       }
					   immersiveFrame=undefined;
                   }
               })
           }
        });
        dialog.addEventListener('resize', function (e) {
        	//console.log('Close on dialog : ' + e.dsModel.title);
        	/*var treeDiv = datagridDiv.getContent().getChildren()[0].getChildren()[1];
            var modalHeight = e.dsModel.height - 125;
            treeDiv.style.height = modalHeight +'px';
            treeDiv.getChildren()[0].style.height = modalHeight +'px';
*/
        });
        
        dialog.addEventListener('close', function (e) {	            	
            
            //that.SubscriptionDialogOpened = false;
        	NotificationsManagerViewOnScreen.inject(document.body);
        	if(immersiveFrame) {
        		immersiveFrame.destroy();
        	}
			immersiveFrame=undefined;
        });
			//var container=document.getElementById("PushSubscribeView");
			immersiveFrame.inject(document.body);
        return containerDiv;
    };
    
/*    let openContextualMenu = function (e, cellInfos) {
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
              if (e.button == 2) {
                  require(['DS/ENOSubscriptionMgmt/View/Menu/AttachmentContextualMenu'], function (AttachmentContextualMenu) {
                      AttachmentContextualMenu.attachmentGridRightClick(e,cellInfos.nodeModel.options.grid);
                });           
             }
        }  
    };
    
     let onDoubleClick = function (e, cellInfos) {
	 	if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.multipleHitCount == 2) {
	    			cellInfos.nodeModel.select(true);
	    			widget.routeMgmtMediator.publish('route-content-preview-click', {model:{"id":cellInfos.nodeModel.options.grid.id}});             
		     }
		}  
	};
	
	let addorRemoveAttachmentEventListeners = function(){
         widget.meetingEvent.subscribe('toolbar-data-updated', function (data) {
        	if(data.modifyAccess == "TRUE" ) {
    			showAttachmentAddButton(true);
    		}
    		if(data.deleteAccess == "TRUE"){
    		    showAttachmentDeleteButton(true);
    		}
    		if(data.modifyAccess == "FALSE" ){
    			showAttachmentAddButton(false);
    		} 
    		if(data.deleteAccess == "FALSE"){
    		   showAttachmentDeleteButton(false);
    		}
		}); 
    };
    
    let showAttachmentAddButton = function(flag){
		let ViewSubscriptionsDialogToolbar = ViewSubscriptionGridView.getGridViewToolbar();
		let addAttachment = ViewSubscriptionsDialogToolbar.getNodeModelByID("addAttachment");
        if (addAttachment) {
        	addAttachment.updateOptions({
            visibleFlag: flag
          });
        }
	};
	
	let showAttachmentDeleteButton = function(flag){
		let ViewSubscriptionsDialogToolbar = ViewSubscriptionGridView.getGridViewToolbar();
		let deleteAttachment = ViewSubscriptionsDialogToolbar.getNodeModelByID("deleteAttachment");
        if (deleteAttachment) {
        	deleteAttachment.updateOptions({
            visibleFlag: flag
          });
        }
	};

    let registerListners = function(){
        let dataGridView = WrapperDataGridView.dataGridView();
        //Dispatch events on dataGrid
        //dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
        dataGridView.addEventListener('contextmenu', openContextualMenu);
       // let tileView = WrapperTileView.tileView();
    	//Dispatch events on tile view
    	//tileView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick); 
        addorRemoveAttachmentEventListeners();
    };
*/       
    let ViewSubscriptionViewModel = function(serverResponse, meetingModel){      
    	ViewSubscriptionModel.createModel(serverResponse);
    	
    };
     
    let hideView= function(){
        if(document.getElementById('ViewSubscriptionsDialogsContainer') != null){
            document.getElementById('ViewSubscriptionsDialogsContainer').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#ViewSubscriptionsDialogsContainer') != null){
            document.getElementById('ViewSubscriptionsDialogsContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	ViewSubscriptionModel.destroy();
    };
    
    let ViewSubscriptionsDialog = {
            init : (resultElementSelected) => { return build(resultElementSelected);},
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };
    

    return ViewSubscriptionsDialog;
});

/* global define, widget */
/**
 * @overview Subscription Management - Module to  ViewSubscriptions in action bar
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define("DS/ENOSubscriptionMgmt/Commands/ViewSubscriptions",
		[
			'UWA/Class',
			'DS/ApplicationFrame/Command',
			'DS/ApplicationFrame/CommandsManager',
			'DS/ENOSubscriptionMgmt/commands/CommandAvailableOnSelect',
			'DS/PADUtils/PADContext',
			'DS/ENOSubscriptionMgmt/Utils/ParseJSONUtil',
			'DS/WidgetServices/WidgetServices',
			'DS/ENOSubscriptionMgmt/Views/ViewSubscriptionsDialog'			
			   
], function(
		Class,
		AFRCommand,
		CommandsManager,
		OnSelectCommand,
		PADContext,
		ParseJSONUtil,
		WidgetServices,
		ViewSubscriptionsDialog
){
	'use strict';
	
	var wuxConsole = WUX.getWUXConsole();
	//var ViewSubscriptionsCmd = AFRCommand.extend({
	var ViewSubscriptionsCmd = Class.extend(AFRCommand, OnSelectCommand,{

		/**
		 * Execute a command
		 * @namespace WUX.AFR
		 * @class Command
		 * @extends UWA.Class
		 * @constructor
		 *
		 */
		init: function (options) {
			this._parent(options, {
				mode: 'exclusive',
				isAsynchronous: true
			});
			this._dialogObj = {};
			//this._dialogObj.SubscriptionDialogOpened = false;
		},

		beginExecute: function () {
		//	console.log('Beginning command:' + this._id);
			wuxConsole.info('Beginning command:' + this._id);
		},		

		resumeExecute: function () {
		//	console.log('Resuming command:' + this._id);

		},

		execute: function (options) {		
		//	console.log('execute command:' + this._id);			
			//CommandsManager.getCommand( this._id ).end();
			var localContext = PADContext.get();
			var selected_nodes;
			var resultElementSelected = [];
			if (null == localContext){ 
				localContext = this.context;
				if (null == localContext){ 
					localContext = this.options.context;
				}
			}
			
			var insideModel = localContext.model;
			if (!insideModel || !insideModel.objectId){
				selected_nodes = localContext.getSelectedNodes();
			}
			if (selected_nodes && selected_nodes.length>0) {
				selected_nodes.forEach(function(node) {
					//Instance has priority as it displayed both reference and instance
					var nodeID = node && typeof node.getInstID === "function" ? node.getInstID() : null;
					if (nodeID != null && Array.isArray(nodeID)){
						nodeID = nodeID.length > 0 ? nodeID[0] : null;
					}
					var defaultMetatype = nodeID ? 'relationship' : 'businessobject';
					nodeID = nodeID ? nodeID : node.getID();
					nodeID = nodeID ? nodeID : node.id;
					var metatype = node.metatype ? node.metatype: defaultMetatype;
					var source = node.source ? node.source : null;
					var type ="",tenant="";
					var parseJSONUtil = new ParseJSONUtil();
					type  =parseJSONUtil.getTypeFromNode(node);
					//var tenant = ParseJSONUtil.getTenantFromNode(node);
					//var type = ParseJSONUtil.getTypeFromNode(node);
					//var type = node.type ? node.type : (node.options.type ? node.options.type : null);
					if (nodeID) {
						var initModel = {
								'type' : type,
								'relId' : nodeID,
								'id' : nodeID,
								'dataelements':{}
						};
						var tenant = tenant ? tenant : WidgetServices.getTenantID();

						if (tenant) initModel['tenant'] = tenant;
						if (source) initModel['source'] = source;
						if (type) initModel['type'] = type;
						resultElementSelected.push(initModel);
					};
				});
			}
			
			
				
			//if(this._dialogObj.SubscriptionDialogOpened === false){
				ViewSubscriptionsDialog.init(resultElementSelected);
			//}
			if(CommandsManager.getCommand( this._id )){
				CommandsManager.getCommand( this._id ).end();
			}else{
				var commandId = this._id;
				if(CommandsManager.getCommands()["[object Object]"][commandId])
					CommandsManager.getCommands()["[object Object]"][commandId].end();
			}
		},

		endExecute: function () {
		//	console.log('Stop command:' + this._id);
			wuxConsole.warn('Stop command:' + this._id);
		}

	});

	return ViewSubscriptionsCmd;
});

