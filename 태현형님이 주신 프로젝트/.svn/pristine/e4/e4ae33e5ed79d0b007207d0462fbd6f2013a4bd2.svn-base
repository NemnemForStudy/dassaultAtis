define('DS/ENXESignConfigApp/Components/Wrappers/WrapperTileView',
    ['DS/CollectionView/ResponsiveTilesCollectionView'],
    function (WUXResponsiveTilesCollectionView) {

        'use strict';

        let WrapperTileView, _myResponsiveTilesView, _container;
        /*
         * builds the default container for tile view if container is not passed
         */
        let buildLayout = function () {
            _container = UWA.createElement('div', { id: 'TileViewContainer', 'class': 'tile-view-container hideView' });

        };
        /*
         * builds the tile view using WebUX's tile view
         * required param: treeDocument as model 
         * optional: container if customize container dom element is required with ur own class
         */
        let initTileView = (treeDocument, container, enableDragAndDrop = false) => {
            if (!container) {
                buildLayout();
            } else {
                _container = container;
            }
            _myResponsiveTilesView = new WUXResponsiveTilesCollectionView({
                model: treeDocument,
                allowUnsafeHTMLContent: true,
                useDragAndDrop: enableDragAndDrop,
                displayedOptionalCellProperties: ['description', 'contextualMenu'],
            });

            _myResponsiveTilesView.getContent().style.top = '50 px';
            _myResponsiveTilesView.inject(_container);
            return _container;
        };
        /*
         * Returns the tile view
         */
        let tileView = function () {
            return _myResponsiveTilesView;
        };
        /*
         *Returns the selected tiles' details 
         */
        let getSelectedRows = function (myResponsiveTilesView) {
            var selectedDetails = {};
            var details = [];
            var children = myResponsiveTilesView.TreedocModel.getSelectedNodes();;
            for (var i = 0; i < children.length; i++) {
                details.push(children[i].options.grid);
            }
            selectedDetails.data = details;
            return selectedDetails;
        };
        /*
         * Exposes the below public APIs to be used
         */
        return {
            build: (treeDocument, container) => initTileView(treeDocument, container),
            tileView: () => tileView(),
            getSelectedRows: () => getSelectedRows(_myResponsiveTilesView)
        };

    });

define( 'DS/ENXESignConfigApp/Utilities/Constants', 
		['UWA/Class'],
	function(Class){
	
	"use strict";
	
	var constants= Class.singleton({
		

		WELCOMEPANEL_ID_CREATE_ESIGN : "new_esign",
		WELCOMEPANEL_ID_ESIGNS: "esigns",
		WELCOMEPANEL_CONFIGURE_ACTION: "action_configure"
        
	});
	return constants;
});

/**
 * 
 *//* global define, widget */
/**
  * @overview Meetings - Other Meetings utilities
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignConfigApp/Utilities/Utils',
[],
function() {
    'use strict';
    
    var Utils = {};
    Utils.getCookie = function (name) {
    	  var value = "; " + document.cookie;
    	  var parts = value.split("; " + name + "=");
    	  if (parts.length >= 2) return parts.pop().split(";").shift();
    };

    Utils.isValidDate = function (obj) {
        return UWA.is(obj, 'date') && !isNaN(obj.getTime());
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

  Utils.activateInfoIcon = function(DataGridView){
		if(DataGridView.getGridViewToolbar()){
			let infoIcon = DataGridView.getGridViewToolbar().getNodeModelByID("information");
	    	if(infoIcon && infoIcon._associatedView.elements.container.querySelector('.wux-controls-button')){
	    		infoIcon._associatedView.elements.container.querySelector('.wux-controls-button').setStyle("color","rgb(54, 142, 196)");
	    	}
		}
	};
	
	Utils.inActivateInfoIcon = function(DataGridView){
		if(DataGridView.getGridViewToolbar()){
			let infoIcon = DataGridView.getGridViewToolbar().getNodeModelByID("information");
	    	if(infoIcon && infoIcon._associatedView.elements.container.querySelector('.wux-controls-button')){
	    		infoIcon._associatedView.elements.container.querySelector('.wux-controls-button').setStyle("color",'rgb(61, 61, 61)');
	    	}
		}
	};
	
	Utils.refreshRightPanel = function(info, Model, grid){
		
		if(widget.getValue("propWidgetOpen")){ 
			if(grid){  //This code will be executed if it's single click
				 let data = {};
		    	 data.model = grid;
		    	 widget.eSignEvent.publish('esign-header-info-click', {model: data.model, info: info});
			}
			else if(Model && Model.getSelectedRowsModel().data.length == 1){ //if any row is selected, then show the selected row's data
				let data = {};
		    	data.model = Model.getSelectedRowsModel()["data"][0].options.grid;
				widget.eSignEvent.publish('esign-header-info-click', {model: data.model, info: info});
			}
			else{ ////if multiple row/No row is selected, then show the empty view
				 if(Model && Model.getSelectedRowsModel().data.length > 1){
					widget.eSignEvent.publish('esign-header-info-click', {info: info, multiRowSelect: true});
				} else if (Model && Model.getSelectedRowsModel().data.length == 0){
					widget.eSignEvent.publish('esign-header-info-click', {info: info, noRowSelect: true});
				}
			}
		}
	};
  
    return Utils;
});

/* global define, widget */
/**
 * @overview ESign - JSON Parse utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
 define('DS/ENXESignConfigApp/Utilities/ParseJSONUtil',
 [
     'UWA/Class'
     ],
     function(
             UWAClass,
     ) {
'use strict';

var ParseJSONUtil = UWAClass.extend({
 //TODO Need to remove init method, not used _alert variables
 init: function(){
     // Nothing to init here //
 },
 parseResp : function(resp){
     widget.data.csrf = resp.csrf; //setting the csrf in widget data
     resp.result = new Array();
     var respLen = resp.data.length;
     for(var i = 0; i< respLen; i++){
         resp.result[i] = resp.data[i].dataelements;
        //  if(resp.data[i].dataelements.assigneeType === "Group Proxy" || resp.data[i].dataelements.assigneeType === "Group"){
        //      resp.result[i].assigneeTitle =   resp.data[i].dataelements.assigneeTitle;
        //  }
         if(resp.result[i].id === undefined){
             resp.result[i].id = resp.data[i].id;
         }
         if(resp.result[i].type === undefined){
             resp.result[i].type = resp.data[i].type;
         }
     }
     return resp.result;
 },
 
 parseCompleteResp : function(resp){
     widget.data.csrf = resp.csrf; //setting the csrf in widget data
     resp.result = new Array();
     var respLen = resp.data.length;
     for(var i = 0; i< respLen; i++){
         resp.result[i] = resp.data[i].dataelements;
        //  if(resp.data[i].dataelements.assigneeType === "Group Proxy" || resp.data[i].dataelements.assigneeType === "Group"){
        //      resp.result[i].assigneeTitle =   resp.data[i].dataelements.assigneeTitle;
        //  }
         if(resp.result[i].id === undefined){
             resp.result[i].id = resp.data[i].id;
         }
         if(resp.result[i].type === undefined){
             resp.result[i].type = resp.data[i].type;
         }
     }
     return resp.result;
 },
 createDataWithIdForRequest : function(ids,csrf){
    var request = {}, idsArray = [];
    if(csrf === undefined){
        csrf = widget.data.csrf;
    }
    for(let i=0;i<ids.length;i++){
        var id = {"id" : ids[i]};
        idsArray.push(id);
    }
    request = {
            "csrf": csrf,
            "data": idsArray
            };			
    return request;
},
 


 /*parseTagsJSON : function(taggerData){
     var tagData = {};
     var hasOwn = Object.prototype.hasOwnProperty;
     var IMPLICIT_TAG_PREFIX         = "_tag_implicit_";
     var IMPLICIT_TAG_PREFIX_LENGTH  = IMPLICIT_TAG_PREFIX.length;
     var EXPLICIT_TAG_PREFIX         = "_tag__";
     var EXPLICIT_TAG_PREFIX_LENGTH  = EXPLICIT_TAG_PREFIX.length;
     taggerData.forEach(function(item , index) {
         var tags =[];
         try {
             for (var key in item.dataelements) {
                 if(hasOwn.call(item.dataelements, key)) {
                     // we need to know if it is implicit or explicit so we can disect the string
                     // begin is the length of the prefix (IMPLICIT_TAG_PREFIX, or EXPLICIT_TAG_PREFIX)
                     // we need to start at this point
                     var begin;
                     var field = "";
                     if(key.indexOf(IMPLICIT_TAG_PREFIX) === -1) {
                         begin = EXPLICIT_TAG_PREFIX_LENGTH;
                     } else {
                         field = "implicit";
                         begin = IMPLICIT_TAG_PREFIX_LENGTH;
                     }
                     var val = item.dataelements[key];
                     var sixw = key.substr(begin);
                     var arrayLength = val.length;
                     for (var j = 0; j < arrayLength; j++) {
                         var tag = {
                                 "object": val[j],
                                 "dispValue": val[j],
                                 "sixw": sixw,
                                 "field": field
                         };
                         tags.push(tag);
                     }
                 }
             }
         } catch (err) {
             console.error("WidgetTagNavInit: loadTagDataDone"+ err);
         }
         var objectId = "pid://" + item.id;
         tagData[objectId] = tags;
     });

     return tagData;
 },*/
 createCSRFForRequest : function(csrf){
     var request = {};
     if(csrf === undefined){
         csrf = widget.data.csrf;
     }
     request = {
             "csrf": csrf
     }
     return request;
 },
 createCSRFForGivenRequest : function(inputdata,csrf){
     var request = {};
     if(csrf === undefined){
         csrf = widget.data.csrf;
     }
     var data = new Array();
     data.push(inputdata);
     
     request = {
             "csrf": csrf,
             "data": inputdata
     }
     return request;
 },
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
     return request;
 },
 
 /*createDataForPromoteDemote : function(dataElem,updateAction,csrf){
     var request = {};
     if(csrf === undefined){
         csrf = widget.data.csrf;
     }
     var dataelements = {
             "updateAction" : updateAction,
             "dataelements" : dataElem
     };
     var data = new Array();
     data.push(dataelements);
     request = {
             "csrf": csrf,
             "data": data
     }
     return request;
 },*/
 
 /*createDatasForRequest : function(req,id,csrf){
     var request = {};
     if(csrf === undefined){
         csrf = widget.data.csrf;
     }
     var data = new Array();
     for(var i =0; i <req.length; i++){
         var dataelements = {
                 "dataelements" : req[i],
                 "id" : id
         };
         data.push(dataelements);
     }
     request = {
             "csrf": csrf,
             "data": data
     }
     return request;
 },*/
 createDataWithIdForRequest : function(ids,csrf){
     var request = {}, idsArray = [];
     if(csrf === undefined){
         csrf = widget.data.csrf;
     }
     for(let i=0;i<ids.length;i++){
         var id = {"id" : ids[i]};
         idsArray.push(id);
     }
     request = {
             "csrf": csrf,
             "data": idsArray
             };			
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
});


return ParseJSONUtil;
});

/* global define, widget */
/**
 * @overview ESign - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXESignConfigApp/Utilities/SearchUtil',
		[
			'UWA/Class',
			'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
			],
			function(
					UWAClass,
					NLS
			) {
	'use strict';
	const getRefinementToSnN = (socket_id, title, multiSelect,recentTypes) => {	
		
		var refinementToSnNJSON = {
				"title": NLS[title],
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
		if(widget.getValue('x3dPlatformId') != undefined){
			refinementToSnNJSON.tenant = widget.getValue('x3dPlatformId');
		}
		refinementToSnNJSON.global_actions = [{"id":"incontextHelp","title":NLS['search.help'],"icon":"fonticon fonticon-help","overflow":false}];
		return refinementToSnNJSON;
	};
	

	const getPrecondForOwnerContextSearch = () => {
			if(widget.getValue("x3dPlatformId") == "OnPremise"){
			// premise 
			//return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\" OR flattenedtaxonomies:(\"types\/Group\") AND current:\"active\"";
			return "flattenedtaxonomies:(\"types\/Group\") AND current:\"active\"";
			}else{
			//return "([ds6w:type]:(Group) AND [ds6w:status]:(Public)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
			return "([ds6w:type]:(Group) AND [ds6w:status]:(Private))";
			}
	};

	const getPrecondForChangeOwnerSearch = () => {
			if(widget.getValue("x3dPlatformId") == "OnPremise"){
			// premise 
			//return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\" OR flattenedtaxonomies:(\"types\/Group\") AND current:\"active\"";
			return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\"";
			}else{
			//return "([ds6w:type]:(Group) AND [ds6w:status]:(Public)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
			return "(flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
			}
	};

	return {
			getRefinementToSnN,
			getPrecondForOwnerContextSearch,
			getPrecondForChangeOwnerSearch
		
	};
});

/**
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENXESignConfigApp/Components/ESignNotify', [
    'DS/Notifications/NotificationsManagerUXMessages',
    'DS/Notifications/NotificationsManagerViewOnScreen',
],
    function (NotificationsManagerUXMessages, NotificationsManagerViewOnScreen) {

        'use strict';
        let _notif_manager = null;
        let ESignNotify = function () {
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
             */
            _notif_manager = NotificationsManagerUXMessages;
            NotificationsManagerViewOnScreen.setNotificationManager(_notif_manager);
            NotificationsManagerViewOnScreen.setStackingPolicy(9); //To stack similar subject messages 

        };

        ESignNotify.prototype.handler = function () {
            if (document.getElementById("CreateESignPolicy")) { //This id is of create dialog panel of the esign widget. 
                //This means create dialog window is opened and show the notification on the window
                NotificationsManagerViewOnScreen.inject(document.getElementById("CreateESignPolicy"));
                document.getElementById('CreateESignPolicy').scrollIntoView();
            } else if (document.getElementById("ESignConfigDialogContainer")) {
                NotificationsManagerViewOnScreen.inject(document.getElementById("ESignConfigDialogContainer"));
                document.getElementById('ESignConfigDialogContainer').scrollIntoView();
            } else if (document.getElementById("selectUsers")) {
                NotificationsManagerViewOnScreen.inject(document.getElementById("selectUsers"));
            } else {
                if (document.getElementsByClassName('wux-notification-screen').length > 0) {
                    //Do nothing as the notifications will be shown here.
                } else {
                    NotificationsManagerViewOnScreen.inject(document.body);
                }
            }

            return _notif_manager;
        };

        ESignNotify.prototype.notifview = function () {
            return NotificationsManagerViewOnScreen;
        };

        return ESignNotify;

    });

/* global define, widget */
/**
 * @overview Route Management - ID card utilities
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXESignConfigApp/Utilities/IdCardUtil', [
	'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
], function (NLS) {
	'use strict';
	const infoIconActive = () => {
		var infoIcon = document.querySelector('#esignInfoIcon');
		if (infoIcon && infoIcon.className.indexOf("fonticon-color-display") > -1) {
			infoIcon.className = infoIcon.className.replace("fonticon-color-display", "fonticon-color-active");
		}
	};

	const infoIconInActive = () => {
		var infoIcon = document.querySelector('#esignInfoIcon');
		if (infoIcon && infoIcon.className.indexOf("fonticon-color-active") > -1) {
			infoIcon.className = infoIcon.className.replace("fonticon-color-active", "fonticon-color-display");
		}
	};

	const hideChannel3 = () => {
		var idCardHideContent = document.querySelector('#channel3');
		if (idCardHideContent) {
			idCardHideContent.style.display = "none";
		}
	};

	const showChannel3 = () => {
		var idCardHideContent = document.querySelector('#channel3');
		if (idCardHideContent) {
			idCardHideContent.style.display = "";
		}
	};

	const infoIconIsActive = () => {
		if (document.querySelector('#esignInfoIcon').className.indexOf("fonticon-color-active") > -1) {
			return true;
		} else {
			return false;
		}
	};

	const collapseIcon = () => {
		var esignHeaderContainer = document.querySelector('#esignHeaderContainer');
		if (esignHeaderContainer && esignHeaderContainer.className.indexOf("minimized") > -1) {
			var expandCollapse = document.querySelector('#expandCollapse');
			if (expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1) {
				expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
				expandCollapse.title = NLS.idCardHeaderActionExpand;
			}
		}
	};

	const hideThumbnail = () => {
		var thumbnailSection = document.querySelector('#thumbnailSection');
		thumbnailSection.classList.add("id-card-thumbnail-remove");

		var infoSec = document.querySelector('#infoSec');
		var esignHeaderContainer = document.querySelector('#esignHeaderContainer');
		var templateHeaderContainer = document.querySelector('#templateHeaderContainer');
		if ((esignHeaderContainer && esignHeaderContainer.className.indexOf("minimized") > -1) || (templateHeaderContainer && templateHeaderContainer.className.indexOf("minimized") > -1)) {
			infoSec.classList.add("id-info-section-align-minimized");
		} else {
			infoSec.classList.add("id-info-section-align");
		}


	};

	const showThumbnail = () => {
		var thumbnailSection = document.querySelector('#thumbnailSection');
		thumbnailSection.classList.remove("id-card-thumbnail-remove");

		var infoSec = document.querySelector('#infoSec');
		var esignHeaderContainer = document.querySelector('#esignHeaderContainer');
		var templateHeaderContainer = document.querySelector('#templateHeaderContainer');
		if ((esignHeaderContainer && esignHeaderContainer.className.indexOf("minimized") > -1) || (templateHeaderContainer && templateHeaderContainer.className.indexOf("minimized") > -1)) {
			infoSec.classList.remove("id-info-section-align-minimized");
		} else {
			infoSec.classList.remove("id-info-section-align");
		}

	};

	const resizeIDCard = (containerWidth) => {

		// Hide thumbnail at 768px
		if (containerWidth < 768) {
			hideThumbnail();
		} else {
			showThumbnail();
		}


	};

	return {
		infoIconActive,
		infoIconInActive,
		hideChannel3,
		showChannel3,
		infoIconIsActive,
		collapseIcon,
		hideThumbnail,
		showThumbnail,
		resizeIDCard
	};
});

/*
 * @module 'DS/ENORouteMgmt/Config/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route summary datagrid view
 */

define('DS/ENXESignConfigApp/Config/Toolbar/ESignSummaryToolbarConfig',
  [
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
  ],
  function (NLS) {
    _viewData = {
      menu: [
        {
          type: 'CheckItem',
          title: NLS.gridView,
          state: "selected",
          fonticon: {
            family: 1,
            content: "wux-ui-3ds wux-ui-3ds-view-list"
          },
          action: {
            module: 'DS/ENXESignConfigApp/Config/Toolbar/ToggleViews',
            func: 'doToggleView',
            argument: {
              "view": "GridView",
              "curPage": "ESignSummary"
            }
          },
          tooltip: NLS.gridView
        },
        {
          type: 'CheckItem',
          title: NLS.tileView,
          fonticon: {
            family: 1,
            content: "wux-ui-3ds wux-ui-3ds-view-small-tile"
          },
          action: {
            module: 'DS/ENXESignConfigApp/Config/Toolbar/ToggleViews',
            func: 'doToggleView',
            argument: {
              "view": "TileView",
              "curPage": "ESignSummary"
            }
          },
          tooltip: NLS.tileView
        }
      ]
    };


    // const addFilterToolbarItems = filterPreference => {
    //   var viewData = {
    //     menu: [
    //       {
    //         type: 'CheckItem',
    //         title: NLS.filterOwnedbyme,
    //         state: filterPreference.indexOf("owned") > -1 ? "selected" : "unselected",
    //         id: "owned",
    //         action: {
    //           module: 'DS/ENXESignConfigApp/Actions/Toolbar/ESignSummaryToolbarActions',
    //           func: 'changeOwnerFilter',
    //           argument: {
    //             "type": "owner",
    //             "filter": "owned"
    //           }
    //         },
    //         tooltip: NLS.filterOwnedbymeTooltip
    //       },
    //       {
    //         type: 'SeparatorItem',
    //         title: ''
    //       }
    //     ]
    //   };
    //   var stateNLS = widget.getValue('stateNLS');
    //   var stateFilter = {
    //     type: 'CheckItem',
    //     state: filterPreference.indexOf("Create") > -1 ? "selected" : "unselected",
    //     id: "draft",
    //     action: {
    //       module: 'DS/ENXESignConfigApp/Actions/Toolbar/ESignSummaryToolbarActions',
    //       func: 'changeStateFilter',
    //       argument: {
    //         "type": "state",
    //         "filter": "draft"
    //       }
    //     },
    //     tooltip: NLS.filterDraftTooltip
    //   };
    //   if (stateNLS && stateNLS.Create) {
    //     stateFilter.title = stateNLS.Create;
    //   } else {
    //     stateFilter.title = NLS.filterDraft;
    //   }
    //   viewData.menu.push(stateFilter);

    //   stateFilter = {
    //     type: 'CheckItem',
    //     state: filterPreference.indexOf("In Progress") > -1 ? "selected" : "unselected",
    //     id: "InProgress",
    //     action: {
    //       module: 'DS/ENXESignConfigApp/Actions/Toolbar/MeetingSummaryToolbarActions',
    //       func: 'changeStateFilter',
    //       argument: {
    //         "type": "state",
    //         "filter": "InProgress"
    //       }
    //     },
    //     tooltip: NLS.filterInProgressTooltip

    //   };
    //   if (stateNLS && stateNLS.InProgress) {
    //     stateFilter.title = stateNLS.InProgress;
    //   } else {
    //     stateFilter.title = NLS.filterInProgress
    //   }
    //   viewData.menu.push(stateFilter);

    //   stateFilter = {
    //     type: 'CheckItem',
    //     state: filterPreference.indexOf("Complete") > -1 ? "selected" : "unselected",
    //     id: "completed",
    //     action: {
    //       module: 'DS/ENXESignConfigApp/Actions/Toolbar/MeetingSummaryToolbarActions',
    //       func: 'changeStateFilter',
    //       argument: {
    //         "type": "state",
    //         "filter": "completed"
    //       }
    //     },
    //     tooltip: NLS.filterCompletedTooltip

    //   };
    //   if (stateNLS && stateNLS.Complete) {
    //     stateFilter.title = stateNLS.Complete;
    //   } else {
    //     stateFilter.title = NLS.filterCompleted
    //   }
    //   viewData.menu.push(stateFilter);
    //   return viewData;
    // }

    let writetoolbarDefinition = filterPreference => {
      //Uncomment to add filter option to toolbar
      // var viewData = addFilterToolbarItems(filterPreference);
      //todo nsm4
      var definition = {
        "entries": [
          //Uncomment to add filter option to toolbar
          // {
          //     "id": "filter",
          //     "dataElements": {
          //       "typeRepresentation": "filterdropdown",
          //       "icon": {
          //         "iconName": "list-filter",
          //         "fontIconFamily": 1
          //       },
          //       "value":viewData
          //     },
          //     "action1": {
          //       module: 'DS/ENXESignConfigApp/View/Grid/ESignSummaryDataGridView', //TODO dummy method and function
          //       func: 'launchFilter',
          //     },
          //     "category": "status",
          //     "tooltip": NLS.filter              
          //   },
          //Uncomment above to add filter option to toolbar
          // {
          //   "id": "createEsign",
          //   "dataElements": {
          //     "typeRepresentation": "functionIcon",
          //     "icon": {
          //         "iconName": "plus",
          //         fontIconFamily: WUXManagedFontIcons.Font3DS
          //       }
          //   },
          //   "action": {
          //       module: 'DS/ENXESignConfigApp/View/Dialog/CreateEsignDialog', //TODO dummy method and function
          //       func: 'CreateEsignDialog',
          //     },
          //   "position": "far",
          //   "category": "create",
          //   "tooltip": NLS.newESign
          // },
          {//for testing only remove later
            "id": "detailsWindow",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                "iconName": "plus",
                "fontIconFamily": 1
              },
              "action": {
                "module": 'DS/ENXESignConfigApp/View/Dialog/ESignPolicyCreateDialog', 
                "func": 'InitiateESignPolicyCreateDialog',
              }
            },
            "position": "far",
            "category": "action",
            "tooltip": NLS.create
          },
          // {
          //   "id": "ArchiveESign",
          //   "dataElements": {
          //     "typeRepresentation": "functionIcon",
          //     "icon": {
          //       "iconName": "trash",
          //       fontIconFamily: WUXManagedFontIcons.Font3DS
          //     },
          //     "action": {
          //       "module": "DS/ENXESignConfigApp/View/Dialog/ArchiveESign",
          //       "func": "archiveConfirmation"
          //     }
          //   },
          //   "position": "far",
          //   "category": "action",
          //   "tooltip": NLS.Archive
          // },
          {
            "id": "view",
            "className": "esignViews",
            "dataElements": {
              "typeRepresentation": "viewdropdown",
              "icon": {
                "iconName": "view-list",
                "fontIconFamily": 1
              },

              "value": _viewData
            },
            "position": "far",
            "tooltip": NLS.gridView,
            "category": "action" //same category will be grouped together
          },
          {
            "id": "information",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                "iconName": "info",
                fontIconFamily: WUXManagedFontIcons.Font3DS
              },
              "action": {
                "module": "DS/ENXESignConfigApp/Actions/Toolbar/ESignSummaryToolbarActions",
                "func": "openPropertiesView"
              }
            },
            "position": "far",
            "category": "action",
            "tooltip": NLS.Information
          }
        ],
        "typeRepresentations": {
          "sortingdropdown": {
            "stdTemplate": "functionMenuIcon",
            "semantics": {
              label: "action",
              icon: "sorting"
            }
          },
          "filterdropdown": {
            "stdTemplate": "functionMenuIcon",
            "semantics": {
              label: "action",
              icon: "sorting"
            },
            "position": "far",
            "tooltip": {
              "text": "Filter",
              "position": "far"
            }
          },
          "viewdropdown": {
            "stdTemplate": "functionMenuIcon",
            "semantics": {
              label: "action",
              icon: "sorting"
            },
            "position": "far",
            "tooltip": {
              "text": "view",
              "position": "far"
            }
          }
        },

      }
      return JSON.stringify(definition);
    }

    return {
      writetoolbarDefinition: filterPreference => writetoolbarDefinition(filterPreference),
      destroy: () => {
        _dataGrid.destroy();
        _container.destroy();
      }
    };
  });

define('DS/ENXESignConfigApp/Components/Wrappers/SplitViewWrapper',
[   'DS/ENOXSplitView/js/ENOXSplitView',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'],
function(ENOXSplitView,NLS) {

  'use strict';
  var SplitViewWrapper = ENOXSplitView;

  SplitViewWrapper.prototype.getLeftViewWrapper = function () {
    return UWA.extendElement(this.getLeft());
  }

  SplitViewWrapper.prototype.getRightViewWrapper = function () {
    return UWA.extendElement(this.getRight());
  }

  SplitViewWrapper.prototype.addRightPanelExpander = function () {
    if (this._rightPanel != null) {
      var showIcon = "fonticon-expand-left";
      var closer = UWA.createElement("div", {
        "class": "splitview-close fonticon "+showIcon,
        "id":"splitview-close",
        "title": NLS.homeRightPanelExpand,
        'styles': {
          'font-size': '20px'
        }
      });
      closer.inject(this._rightPanel);
      var me = this;
      closer.onclick = function (e) {
        me._hideSide("left");
        me._rightPanel.classList.remove("right-container-mobile-view");
        var expandLeft = document.querySelector('.splitview-close.fonticon-expand-left');
        if (expandLeft) {
          expandLeft.title = NLS.homeRightPanelCollapse;
          expandLeft.removeClassName('fonticon-expand-left');
          expandLeft.addClassName('fonticon-expand-right');
        } else {
          var expandRight = document.querySelector('.splitview-close.fonticon-expand-right');
          expandRight.title = NLS.homeRightPanelExpand;
          me._showSide("left");
          expandRight = UWA.extendElement(expandRight);
          expandRight.removeClassName('fonticon-expand-right');
          expandRight.addClassName('fonticon-expand-left');
        }
      }
    }
  }
  
  return SplitViewWrapper;

});

/**
 * 
 */
define(
    'DS/ENXESignConfigApp/Components/Wrappers/TriptychWrapper',
    [
        'DS/ENOXTriptych/js/ENOXTriptych',
        //'DS/ENXESignConfigApp/View/Panels/WelcomePanel'
    ],
    function (
        ENOXTriptych,
       // WelcomePanel
    ) {
        'use strict';

        var TriptychWrapper = function () { };

        TriptychWrapper.prototype.init = function (applicationChannel, parentContainer, left, middle, right, eSignWCPanel, esignWCPanelOptions) {
            this._left = left;
            this._main = middle;
            this._right = right;
            this._eSignWCPanel = eSignWCPanel

            this._applicationChannel = applicationChannel;
            this._triptych = new ENOXTriptych();
            let leftState = widget.body.offsetWidth < 550 ? 'close' : 'open';

            if (!esignWCPanelOptions) {
                leftState = 'close'
            }
            //if the properties page was already opened, then open the panel
            //let rightState = widget.propWidgetOpen ? 'open' : 'close';
            let triptychOptions = {
                left: {
                    resizable: true,
                    originalSize: 300,
                    minWidth: 40, // for closed welcome panel onload
                    originalState: leftState, // 'open' for open, 'close' for close
                    overMobile: true,
                    withClose: false,
                },
                right: {
                    resizable: true,
                    minWidth: 250,
                    originalSize: 400,
                    originalState: 'close', // 'open' for open, 'close' for close
                    overMobile: true,
                    withClose: false
                },
                borderLeft: false,
                container: parentContainer,
                withtransition: true,
                modelEvents: this._applicationChannel
            };

            this._triptych.init(triptychOptions, left, middle, right, esignWCPanelOptions);
            
            this.registerESignEvents();
        };

        TriptychWrapper.prototype.inject = function (container) {
            this._triptych.inject(container);
        };

        // expose Triptych API if need be..
        TriptychWrapper.prototype._getTriptych = function () {
            return this._triptych;
        };

        TriptychWrapper.prototype.getLeftPanelContainer = function () {
            return this._left;
        };
        TriptychWrapper.prototype.getLeftPanelContainerTriptych = function () {
            return this._triptych._leftPanelContent;
        };

        TriptychWrapper.prototype.getRightPanelContainer = function () {
            return this._right;
        };

        TriptychWrapper.prototype.getMainPanelContainer = function () {
            return this._main;
        };

        TriptychWrapper.prototype.registerESignEvents = function () {
            let that = this;
            widget.eSignEvent.subscribe('esign-welcome-panel-activity-selection', function (data) {
                if (that._eSignWCPanel) {
                    let oldSelectedElem = that._eSignWCPanel.wPanelOptions.parentContainer.getElements(".activity-btn.selected");
                    oldSelectedElem.forEach(function (item) {
                        item.removeClassName('selected');
                    });
                    if (data.id) {
                        that._eSignWCPanel.wPanelOptions.parentContainer.getElement('.activity-btn#' + data.id).addClassName('selected');
                        that._eSignWCPanel.wPanelOptions.selectedItem = data.id;
                    }
                }
            });
        };

        return TriptychWrapper;
    });

/**
 * eSignEvent Component - handling interaction between components for smooth async events
 *
 */
define('DS/ENXESignConfigApp/Components/ESignEvent',
    ['DS/Core/ModelEvents'],
    function (ModelEvents) {

        'use strict';
        var _eventBroker = null;
        var eSignEvent = function () {
            // Private variables
            _eventBroker = new ModelEvents();
        };

        /**
         * publish a topic on given channels in param, additional data may go along with the topic published
         * @param  {[type]} eventTopic [description]
         * @param  {[type]} data       [description]
         *
         */
        eSignEvent.prototype.publish = function (eventTopic, data) {
            _eventBroker.publish({ event: eventTopic, data: data }); // publish from ModelEvent
        };

        /**
        *
        * Subscribe to a topic
        * @param {string} eventTopic the topic to subcribe to
        * @param {function} listener the function to be called when the event fires
        * @return {ModelEventsToken}             a token to use when you want to unsubscribe
        */
        eSignEvent.prototype.subscribe = function (eventTopic, listener) {
            return _eventBroker.subscribe({ event: eventTopic }, listener);

        };

        /**
         * Subscribe to an event once with eventually
         *
         *
         * @param  {Object} settings  options hash or a option/value pair.
         * @param  {Event} settings.event  Event to subscribe.
         * @param  {Function} callback  Function to call after event reception.
         *
         * @return {undefined}
         *
         */
        eSignEvent.prototype.subscribeOnce = function (eventTopic, listener) {
            return _eventBroker.subscribeOnce({ event: eventTopic }, listener);
        };

        /**
         * Unsubscribe to a topic
         * @param  {[type]} token [description]
         *
         */
        eSignEvent.prototype.unsubscribe = function (token) {
            _eventBroker.unsubscribe(token);
        };

        eSignEvent.prototype.getEventBroker = function () {
            return _eventBroker;
        };

        eSignEvent.prototype.destroy = function () {
            _eventBroker.destroy();
        };



        return eSignEvent;

    });

/**
 * configuration required for the actions of welcome panel.
 */

 define('DS/ENXESignConfigApp/Config/WelcomePanelActionsConfig',
    ['DS/Core/Core',
     'UWA/Drivers/Alone',
     'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'],
     function(core, Alone, NLS) {

'use strict';

let WelcomePanelActionsConfig = {
     "esign": {
         id:"esigns",
         content: 'summary_page',
         loader: {
             module: 'DS/ENXESignConfigApp/View/Home/ESignSummaryView', 
             func: 'build',
         }
     }, 
    "new_esign": {
          id:"new_esign",
         content: 'dialog',
          loader: {
              module:'DS/ENXESignConfigApp/View/Dialog/ESignPolicyCreateDialog', 
              func: 'InitiateESignPolicyCreateDialog',
          }
     }
     };

return WelcomePanelActionsConfig;

});



define('DS/ENXESignConfigApp/Config/ESignInfoFacets',
['DS/Core/Core',
 'UWA/Drivers/Alone',
 'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'],
function(core, Alone, NLS) {

    'use strict';

    let ESignInfoFacets = [{ 
    	label: NLS.properties, 
    	id:"ESignPropertiesInfo",
    	isSelected:true, 
    	icon: { 
    		iconName: "attributes",//"calendar-clock",
    		fontIconFamily: WUXManagedFontIcons.Font3DS
    	},
    	content: Alone.createElement('div', {id:'ESignPropertiesContainer', 'class':'esign-info-container'}),
        loader : 'DS/ENXESignConfigApp/View/Form/ESignProperitesView' //'DS/ENXMeetingMgmt/View/Form/MeetingView'
    }
    /*,{ 
    	label: NLS.MeetingRelationship,
    	id:"MeetingRelationshipInfo",
    	icon: { 
    		iconName: 'object-related',
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'MeetingRelationshipContainer', 'class':'meeting-relationship-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Facets/MeetingRelationship'
    }*/
    ];

    return ESignInfoFacets;

});

/**
 * 
 *//* global define, widget */
/**
  * @overview ESigns - ENOVIA Bootstrap file to interact with the platform
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignConfigApp/Controller/ESignBootstrap',
    [
        'UWA/Core',
        'UWA/Class/Collection',
        'UWA/Class/Listener',
        /*'UWA/Utils',*/
        'DS/ENXESignConfigApp/Utilities/Utils',
        'DS/PlatformAPI/PlatformAPI',
        'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
        'DS/WAFData/WAFData'
    ],
    function (
        UWACore,
        UWACollection,
        UWAListener,
        /*UWAUtils,*/
        Utils,
        PlatformAPI,
        CompassServices,
        WAFData
    ) {
        'use strict';
        let _started = false, _frameENOVIA = false, _csrf, ESignBootstrap, _prefSwym, _pref3DSpace, _prefSearch;

        function initSearchServices() {
            if (_prefSearch) {
                return _prefSearch;
            }

            let platformId = widget.getValue("x3dPlatformId");

            CompassServices.getServiceUrl({
                serviceName: '3DSearch',
                platformId: platformId,
                onComplete: function (data) {
                    if (data) {
                        if (typeof data === "string") {
                            _prefSearch = data;
                        } else {
                            _prefSearch = data[0].url;
                        }
                    } else {
                        _prefSearch = '';
                    }
                },
                onFailure: function () {
                    _prefSearch = '';
                }
            });
        }
        function initSwymServices() {
            if (_prefSwym) {
                return _prefSwym;
            }

            let platformId = widget.getValue("x3dPlatformId");

            CompassServices.getServiceUrl({
                serviceName: '3DSwym',
                platformId: platformId,
                onComplete: function (data) {
                    if (data) {
                        if (typeof data === "string") {
                            _prefSwym = data;
                        } else {
                            _prefSwym = data[0].url;
                        }
                    } else {
                        _prefSwym = '';
                    }
                },
                onFailure: function () {
                    _prefSwym = '';
                }
            });
        }

        function init3DSpaceServices() {
            if (_pref3DSpace) {
                return _pref3DSpace;
            }

            let platformId = widget.getValue("x3dPlatformId");

            CompassServices.getServiceUrl({
                serviceName: '3DSpace',
                platformId: platformId,
                onComplete: function (data) {
                    if (typeof data === "string") {
                        _pref3DSpace = data;
                    } else {
                        _pref3DSpace = data[0].url;
                    }
                },
                onFailure: function () {
                    _pref3DSpace = '';
                }
            });
        }

        ESignBootstrap = //UWACore.merge(UWAListener, 
        {

            start: function (options) {
                return new Promise(resolve => {
                    if (_started) {
                        resolve()
                        return;
                    }

                    if (options.frameENOVIA) {
                        _frameENOVIA = true;
                    }

                    options = (options ? UWACore.clone(options, false) : {});
                    initSwymServices();
                    initSearchServices();
                    init3DSpaceServices();

                    _started = true;
                    resolve()
                })
            },

            authenticatedRequest: function (url, options) {
                let onComplete;
                let tenantId = widget.getValue('x3dPlatformId');
                url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'tenant=' + tenantId;
                // if(widget.getValue("esign-userSecurityContext")){
                // 	url = url + '&SecurityContext=' + encodeURIComponent(widget.getValue("esign-userSecurityContext"));
                // }
                if (widget.debugMode) {
                    url = url + '&$debug=true'
                }
                if (Utils.getCookie("swymlang")) {
                    url = url + '&$language=' + Utils.getCookie("swymlang");
                }

                onComplete = options.onComplete;

                options.onComplete = function (resp, headers, options) {
                    _csrf = headers['X-DS-CSRFTOKEN'];
                    if (UWACore.is(onComplete, 'function')) {
                        onComplete(resp, headers, options);
                    }
                };

                return WAFData.authenticatedRequest(url, options);
            },

            getLoginUser: function () {
                let user = PlatformAPI.getUser();
                if (user && user.login) {
                    return user.login;
                }
            },

            getLoginUserFullName: function () {
                let user = PlatformAPI.getUser();
                if (user && user.firstName) {
                    if (user.lastName) {
                        return user.firstName + " " + user.lastName;
                    } else {
                        return user.firstName;
                    }
                }
            },

            getSyncOptions: function () {
                if (_frameENOVIA) {
                    return {};
                } else {
                    let syncOptions = {
                        ajax: this.authenticatedRequest
                    };

                    return syncOptions;
                }
            },


            get3DSpaceURL: function () {
                if (_started) {
                    return _pref3DSpace;
                }
            },
            getESignServiceBaseURL: function () {
                if (_started) {
                    return _pref3DSpace + '/resources/v1/modeler/ESignConfig';
                }
            },
            getSwymUrl: function () {
                if (_started) {
                    return _prefSwym;
                }
            },
            getSearchUrl: function () {
                if (_started) {
                    return _prefSearch;
                }
            }


        }
        //);

        return ESignBootstrap;
    });




define('DS/ENXESignConfigApp/Components/Wrappers/WrapperDataGridView',
  ['DS/DataGridView/DataGridView',
    'DS/ENXESignConfigApp/Controller/ESignBootstrap',
    'DS/CollectionView/CollectionViewStatusBar',
    'DS/DataGridView/DataGridViewLayout',
    'UWA/Drivers/Alone',
  ],
  function (DataGridView, ESignBootstrap, CollectionViewStatusBar, DataGridViewLayout, Alone) {

    'use strict';

    let WrapperDataGridView, _dataGrid, _container, _toolbar, jsontoolbar, dummydiv;
    var layoutOptions = {
      rowsHeader: false
    }


    let buildToolBar = jsonToolbar => {
      jsonToolbar = JSON.parse(jsonToolbar);
      _toolbar = _dataGrid.setToolbar(JSON.stringify(jsonToolbar));
      return _toolbar;
    };

    let initDataGridView = function (treeDocument, colConfig, toolBar, dummydiv, massupdate) {
      //buildLayout();
      _dataGrid = new DataGridView({
        treeDocument: treeDocument,
        columns: colConfig,
        // layout: new DataGridViewLayout(layoutOptions),
        defaultColumnDef: {//Set default settings for columns
          widthd: 'auto',
          typeRepresentation: 'string'
        },
        showModelChangesFlag: false
      });
      if (massupdate) {
        _dataGrid.showModelChangesFlag = true;
      }
      _dataGrid.buildStatusBar([{
        type: CollectionViewStatusBar.STATUS.NB_ITEMS
      }, {
        type: CollectionViewStatusBar.STATUS.NB_SELECTED_ROWS
      }
      ]);
      _dataGrid.layout.cellHeight = 35;
      _dataGrid.rowSelection = 'multiple';
      _dataGrid.cellSelection = 'none';
      _dataGrid.getContent().style.top = '50 px';
      if (toolBar) {
        buildToolBar(toolBar);
      }

      setReusableComponents();
      _dataGrid.inject(dummydiv);
      return dummydiv;
    };



    let dataGridView = function () {
      return _dataGrid;
    };

    //todo nsm4
    let setReusableComponents = function () {
      _dataGrid.registerReusableCellContent({
        id: '_state_',
        buildContent: function () {
          let commandsDiv = UWA.createElement('div');
          UWA.createElement('span', {
            "html": "",
            "class": "esign-state-title "
          }).inject(commandsDiv);
          return commandsDiv;
        }
      });
      _dataGrid.registerReusableCellContent({
        id: '_modifiedDate_',
        buildContent: function () {
          let tempDiv = UWA.createElement('div');
          UWA.createElement('span', {
            "html": "",
            "class": "esign-modified-date"
          }).inject(tempDiv);
          return tempDiv;
        }
      });
      _dataGrid.registerReusableCellContent({
        id: '_owner_',
        buildContent: function () {
          let responsible = new UWA.Element("div", {});
                let owner = new UWA.Element("div", {
                  class:'ownerCell'
                });
                let ownerIcon = "";
                if(ESignBootstrap.getSwymUrl() && ESignBootstrap.getSwymUrl().length > 0){
                    ownerIcon = UWA.createElement('img', {
                        class: "userIcon",
                    });
                } else {
                    ownerIcon = UWA.createElement('div', {
                        html: "",
                        class: "avatarIcon"
                    });
                }
                ownerIcon.inject(owner);
                let ownerName = UWA.createElement('span', {
                        class: 'userName',
                         html: ""
                    });
                 owner.inject(responsible);
                 ownerName.inject(responsible);
                 return responsible;
        }
      });
    };

    let getSelectedRowsModel = function (treeDocumentModel) {
      var selectedDetails = {};
      var details = [];
      var children = treeDocumentModel.getSelectedNodes();
      for (var i = 0; i < children.length; i++) {
        //details.push(children[i].options.grid);
        details.push(children[i]);
      }
      selectedDetails.data = details;
      return selectedDetails;
    };

    let deleteRowModelByIndex = function (treeDocumentModel, index) {
      var indexRow = treeDocumentModel.getNthRoot(index);
      if (indexRow) {
        treeDocumentModel.prepareUpdate();
        treeDocumentModel.removeRoot(indexRow);
        treeDocumentModel.pushUpdate();
      }
    };

    let deleteRowModelSelected = function (treeDocumentModel) {
      let selctedIds = [];
      var selRows = treeDocumentModel.getSelectedNodes();
      treeDocumentModel.prepareUpdate();
      for (var index = 0; index < selRows.length; index++) {
        treeDocumentModel.removeRoot(selRows[index]);
        selctedIds.push(selRows[index].options.id);
      }
      treeDocumentModel.pushUpdate();
      return selctedIds;
    };

    let deleteRowModelById = function (treeDocumentModel, id) {
      var children = treeDocumentModel.getChildren();
      for (var i = 0; i < children.length; i++) {
        if (children[i].options.id == id) {
          treeDocumentModel.prepareUpdate();
          treeDocumentModel.removeRoot(children[i]);
          treeDocumentModel.pushUpdate();
        }
      }
    };

    let deleteRowModelByIds = function (treeDocumentModel, ids) {
      var children = treeDocumentModel.getChildren();
      var childrenToDelete = [];
      for (var i = 0; i < children.length; i++) {
        if (ids.includes(children[i].options.grid.id)) {
          childrenToDelete.push(children[i]);
        }
      }
      childrenToDelete.forEach(function (element) {
        treeDocumentModel.prepareUpdate();
        treeDocumentModel.removeRoot(element);
        treeDocumentModel.pushUpdate();
      });

    };

    let getRowModelById = function (treeDocumentModel, id) {
      var children = treeDocumentModel.getChildren();
      for (var i = 0; i < children.length; i++) {
        if (children[i].options.id == id) {
          return children[i];
        }
      }
    };

    let getRowModelIndexById = function (treeDocumentModel, id) {
      var children = treeDocumentModel.getChildren();
      for (var i = 0; i < children.length; i++) {
        if (children[i].options.id == id) {
          return i;
        }
      }
    };

    WrapperDataGridView = {
      build: (treeDocument, colConfig, toolBar, dummydiv, massupdate) => { return initDataGridView(treeDocument, colConfig, toolBar, dummydiv, massupdate); },
      dataGridView,
      destroy: () => { _dataGrid.destroy(); _container.destroy() },
      dataGridViewToolbar: () => _toolbar,
      getSelectedRowsModel,
      deleteRowModelByIndex,
      deleteRowModelSelected,
      deleteRowModelById,
      deleteRowModelByIds,
      getRowModelById,
      getRowModelIndexById
    };

    return WrapperDataGridView;

  });

define('DS/ENXESignConfigApp/View/Loader/NewOwnerChooser',
[
	
	'DS/Utilities/Dom',
	'DS/ENXESignConfigApp/Utilities/SearchUtil',
	'DS/TreeModel/TreeDocument',
	'DS/TreeModel/TreeNodeModel',		
	'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',	
	'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'
],
  function ( DomUtils, SearchUtil,TreeDocument,TreeNodeModel,NLS) {    
		"use strict";    
		let _eSignProperties;

		let launchOwnerSearch = function(event, _properties,isChgOwn = false){
			_eSignProperties = _properties;
			let that = event.dsModel;
			 let searchcom_socket;
 	        let socket_id = UWA.Utils.getUUID();
 	       if (!UWA.is(searchcom_socket)) {
	            require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
	                searchcom_socket = SearchCom.createSocket({
	                    socket_id: socket_id
	                });                
	                let allowedTypes = "Person,Group,Group Proxy";
	    	        let recentTypes = allowedTypes ? allowedTypes.split(',') : '';
	    	        let refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addOwner", false , recentTypes);
	    	        if(isChgOwn){
	    	        refinementToSnNJSON.precond = SearchUtil.getPrecondForChangeOwnerSearch(recentTypes);
	    	        }else{
	                refinementToSnNJSON.precond = SearchUtil.getPrecondForOwnerContextSearch(recentTypes);
	                }
	                //refinementToSnNJSON.resourceid_not_in = attachmentIds;						
	                if (UWA.is(searchcom_socket)) {
	                	searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
						searchcom_socket.addListener('Selected_Objects_search', selected_Objects_ContextSearch.bind(that,""));
						//searchcom_socket.addListener('Selected_global_action', that.selected_global_action.bind(that, url));
						// Dispatch the in context search event
						searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
	                }else{
	                	throw new Error('Socket not initialized');
	                }
	            });

			};
		};	

		
		let selected_Objects_ContextSearch = function(that, data){
	/*      _eSignProperties.elements.ownerField.value = data[0]["ds6w:label"].unescapeHTML();
			_eSignProperties.elements.ownerFieldIdentifier = data[0]["ds6w:identifier"].unescapeHTML();
			_eSignProperties.elements.ownerFieldId = data[0].id;
			_eSignProperties.elements.ownerFieldDetails = {
				newOwnerId: data[0].id,
				newOwnerName: data[0]['ds6w:identifier'],
				newOwnerLabel: data[0]['ds6w:label'],
				newOwnerType: data[0]['ds6w:type']
			}
	*/
		var node;
			if(data){
				node = new TreeNodeModel(
						{
							label : data[0]["ds6w:label"].unescapeHTML(),
							value : data[0]["id"],
							name  : data[0]["ds6w:identifier"].unescapeHTML(),
							type:   data[0]["ds6w:type_value"],
						});
			if(node.options.type== 'Group' || node.options.type== 'Group Proxy')
			{
				node.options.label= node.options.label +'(User Group)';
			}
			_eSignProperties.elements.ownerField.selectedItems = node;
			}
	
		};	
		  
	    
		let destroy = function(){
			_eSignProperties = {};
		}
		
		let NewOwnerChooser = {
				init : (event, _properties,isChgOwn) => launchOwnerSearch(event, _properties,isChgOwn),				          
				destroy
		};
		return NewOwnerChooser;
	});


/* global define, widget */
/**
 * @overview ESign - ESignBootstrap Bootstrap file to interact with the platform
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXESignConfigApp/Services/ESignServices',
    [
        "UWA/Core",
        'UWA/Class/Promise',
        'DS/ENXESignConfigApp/Controller/ESignBootstrap',
        'DS/ENXESignConfigApp/Utilities/ParseJSONUtil',
        'DS/WAFData/WAFData'
    ],
    function (
        UWACore,
        Promise,
        ESignBootstrap,
        ParseJSONUtil, WAFData
    ) {
        'use strict';

        let _fetchAllESigns, _fetchESignById, _archiveESign, _updateState, _updateESignProperties, _modifyESignProperties,_changeESignOwner,_makeWSCall, _reviseESign;

        _fetchAllESigns = function () {
            return new Promise(function (resolve, reject) {
            	var esignUserGroupId=widget.getValue("esign-userGroup");
            	if(esignUserGroupId == undefined || esignUserGroupId == null){
            		esignUserGroupId='';
            	}
                let getURL = ESignBootstrap.getESignServiceBaseURL()+"?userGroupId="+encodeURIComponent(esignUserGroupId);
                let options = {};
                options.method = 'GET';
                options.timeout = 0;
                options.headers = {
                    'Content-Type': 'application/ds-json',
                };

                options.onComplete = function (serverResponse) {
                    resolve(new ParseJSONUtil().parseCompleteResp(JSON.parse(serverResponse)));
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(getURL, options);
            });
        };

        _fetchESignById = function (eSignId) {
            return new Promise(function (resolve, reject) {
                let getURL = ESignBootstrap.getESignServiceBaseURL() + "/" + eSignId;
                let options = {};
                options.method = 'GET';
                options.headers = {
                    'Content-Type': 'application/ds-json',
                };

                options.onComplete = function (serverResponse) {
                    resolve(new ParseJSONUtil().parseCompleteResp(JSON.parse(serverResponse)));
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(getURL, options);
            });
        };

        _archiveESign = function (ids) {
            return new Promise(function (resolve, reject) {
                var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
                // DELETE Method //
                var options = {};
                options = UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);
                options.method = 'DELETE';
                options.type = 'json';
                options.timeout = 0;
                options.headers = {
                    'Content-Type': 'application/ds-json',
                };
                options.wait = true;
                options.data = JSON.stringify(payload);

                options.onComplete = function (serverResponse) {
                    resolve(serverResponse);
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(ESignBootstrap.getESignServiceBaseURL(), options);
            });
        };

        _updateState = function (data, dataElements) {
            return new Promise(function (resolve, reject) {

                let postURL
                if (dataElements && dataElements.oldState == 'Archived' && dataElements.newState == 'Active') {
                    postURL = ESignBootstrap.getESignServiceBaseURL() + "/" + data.id + "/demoteESign";
                } else {
                    postURL = ESignBootstrap.getESignServiceBaseURL() + "/" + data.id + "/promoteESign";
                }
                
                // POST Method //
                let payload = new ParseJSONUtil().createDataForRequest(dataElements)
                var options = {};
                options = UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);
                options.method = 'POST';
                options.type = 'json';
                options.timeout = 0;
                options.headers = {
                    'Content-Type': 'application/ds-json',
                };
                options.wait = true;
                options.data = JSON.stringify(payload);

                options.onComplete = function (serverResponse) {
                    resolve(serverResponse);
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(postURL, options);
            });
        };

        _reviseESign = function (esignId) {
            return new Promise(function (resolve, reject) {

                let postURL = ESignBootstrap.getESignServiceBaseURL() + "/" + esignId + "/reviseESign";
                let payload = new ParseJSONUtil().createCSRFForRequest()
                // POST Method //
                var options = {};
                options = UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);
                options.method = 'POST';
                options.type = 'json';
                options.timeout = 0;
                options.headers = {
                    'Content-Type': 'application/ds-json',
                };
                options.wait = true;
                options.data = JSON.stringify(payload);

                options.onComplete = function (serverResponse) {
                    resolve(serverResponse);
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(postURL, options);
            });
        };

        _updateESignProperties = function (jsonData, eSignData) {
            //var meetingId = meetingData.model.id;
            return new Promise(function (resolve, reject) {
                let postURL = ESignBootstrap.getESignServiceBaseURL();

                // var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);

                let options = {};
                options = UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);
                options.method = 'POST';
                options.type = 'json';
                options.timeout = 0;
                options.headers = {
                    'Content-Type': 'application/json',
                };
                //options.data = JSON.stringify(payload);
                options.wait = true;
                options.data = JSON.stringify(jsonData);

                options.onComplete = function (serverResponse) {
                    //serverResponse = serverResponse;
                    resolve(serverResponse);
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(postURL, options);
                //WAFData.authenticatedRequest(postURL, options)
            });
        };
        
         _modifyESignProperties = function (jsonData, eSignData) {
            //var meetingId = meetingData.model.id;
            return new Promise(function (resolve, reject) {
                let postURL = ESignBootstrap.getESignServiceBaseURL();

                // var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);

                let options = {};
                options = UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);
                options.method = 'PUT';
                options.type = 'json';
                options.timeout = 0;
                options.headers = {
                    'Content-Type': 'application/json',
                };
                //options.data = JSON.stringify(payload);
                options.wait = true;
                options.data = JSON.stringify(jsonData);

                options.onComplete = function (serverResponse) {
                    //serverResponse = serverResponse;
                    resolve(serverResponse);
                };

                options.onFailure = function (serverResponse, respData) {
                    if (respData) {
                        reject(respData);
                    } else {
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(postURL, options);
                //WAFData.authenticatedRequest(postURL, options)
            });
        };

        _changeESignOwner = (esignConfig, esignProperties) => {

            return new Promise(function (resolve, reject) {

               // const ownerDetails = esignProperties && esignProperties.elements && esignProperties.elements.ownerFieldDetails || {}

                const baseURL = ESignBootstrap.getESignServiceBaseURL();
                const fetchTaskURL = baseURL +"/" +esignConfig.id+ "/owner";

                const modifyOwner = {
					"esignId": esignConfig.id,
					"id": esignConfig.id,
					"newOwnerId":  esignProperties.elements.ownerField.selectedItems._options.value,
					"newOwnerType": esignProperties.elements.ownerField.selectedItems._options.type,
					"newOwnerName": esignProperties.elements.ownerField.selectedItems._options.name,
					"newOwnerLabel": esignProperties.elements.ownerField.selectedItems._options.label,
					"type": esignConfig.type,
					"isChangeOwner": "true",
                    ...esignConfig
				}

                let options = {};
                options = UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);
                options.method = 'PUT';
                options.type = 'json';
                options.timeout = 0;
                options.headers = {
                        'Content-Type' : 'application/ds-json',
                };
                options.data = JSON.stringify(new ParseJSONUtil().createDataForRequest(modifyOwner));

                options.onComplete = function(resp) {
                    resp.result = new ParseJSONUtil().parseResp(resp);
                    resolve(resp.result);
                };
                options.onFailure = function(serverResponse,respData) {
                    if(respData){
                        reject(respData);
                    }else{
                        reject(serverResponse);
                    }
                };

                ESignBootstrap.authenticatedRequest(fetchTaskURL, options);

            });
        };
        
_makeWSCall  = function (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) {

	var options = options || null;
	var url = "";
	if (options != null && options.isfederated != undefined && options.isfederated == true)
		url =	ESignBootstrap.getSearchUrl()+ URL;
	var accept= "";
	if (options != null && options.acceptType != undefined && options.acceptType != "")
		accept = options.acceptType;
	else
		accept = 'application/json';

	//Security Context not encoding.
	var encodeSecurityContext = 'Yes';
	if (options != null && options.encodeSecurityContext != undefined && options.encodeSecurityContext != "")
		encodeSecurityContext = options.encodeSecurityContext;


	var timestamp = new Date().getTime();
	var tenantValue=widget.getValue("x3dPlatformId");//EnoviaBootstrap.getTenantValue();
	if (url.indexOf("?") == -1) {
		url = url + "?tenant=" + tenantValue + "&timestamp=" + timestamp;
	} else {
		url = url + "&tenant=" + tenantValue + "&timestamp=" + timestamp;
	}


	

	userCallbackOnComplete = userCallbackOnComplete || function () { };
	userCallbackOnFailure = userCallbackOnFailure || function () { };

	// For NLS translation
	//if(lang == undefined || lang == 'undefined'){

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
		//console.log("Success calling url: " + url);
		//console.log("Success data: " + JSON.stringify(data));
		userCallbackOnComplete(data);
	};
	queryobject.onFailure = function (errDetailds, errData) {
		console.log("Error in calling url: " + url);
		//console.log("Additional Details:: httpMethod: " + httpMethod + " authentication: " + authentication + " securityContext: " + securityContext + " ContentType: " + ContentType);
		//console.log("Error Detail: " + errDetailds);
		//console.log("Error Data: " + JSON.stringify(errData));


		userCallbackOnFailure(errDetailds, errData);
	};

	queryobject.onTimeout = function () {
		console.log("Timedout for url: " + url);
		//ChgErrors.error("Webservice Timedout, please refresh and try again.");
		if(widget.body){
			Mask.unmask(widget.body);
		}
	}

	ESignBootstrap.authenticatedRequest(url, queryobject);
};



        return {
            fetchAllESigns: () => _fetchAllESigns(),
            fetchESignById: meetingId => _fetchESignById(meetingId),
            archiveESign: ids => _archiveESign(ids),
            updateState: (data, payload) => _updateState(data, payload),
            reviseESign: esignId => _reviseESign(esignId),
            updateESignProperties: (jsonData, eSignData) => _updateESignProperties(jsonData, eSignData),
            modifyESignProperties: (jsonData, eSignData) => _modifyESignProperties(jsonData, eSignData),
            changeESignOwner: (esignConfig, esignProperties) => _changeESignOwner(esignConfig, esignProperties),
            makeWSCall: (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) => {return _makeWSCall(URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options);}
        };

    }
);

define('DS/ENXESignConfigApp/View/Form/ENOESignAutoComplete',
[
	'DS/WUXAutoComplete/AutoComplete',
	'DS/ENXESignConfigApp/Services/ESignServices',
	//'DS/ENORouteMgmt/EnoviaBootstrap',
	'DS/TreeModel/TreeNodeModel',
	'DS/TreeModel/TreeDocument',
	'DS/TreeModel/BaseFilter',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
],
 function (AutoComplete, ESignServices,
 // EnoviaBootstrap, 
 TreeNodeModel, TreeDocument, BaseFilter, NLS) {
	var objectTreeDocument,stringNameFilter;
	let drawAutoCompleteComponent = function(optionsValue){
		objectTreeDocument = new TreeDocument();
		var autoCompleteComponent= new AutoComplete({
			elementsTree: function (typedValue) {
				if(optionsValue.getValidation){
					var isValid = optionsValue.getValidation();
					if(!isValid){
						return;
					}
				}
				return new Promise(function (resolve, reject) {

					// Simulate an asynchronous server call to retrieve the AutoComplete possible values
					var getSuccess = function (data) {
						objectTreeDocument = new TreeDocument();
						stringNameFilter = BaseFilter.inherit({
						      // Method called for every data when the model is changed to know if this data has to be filtered
						      isDataFiltered: function(data) {
						        // Get attribute value & label
						        var dataValue = data.getAttributeValue("name");
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
						var filterManager =objectTreeDocument.getFilterManager();

						filterManager.registerFilter("myFilterID", stringNameFilter);
						if (data && data.results && Array.isArray(data.results)) {
							var objectSelectedArr = data.results;
							objectSelectedArr.forEach(function (object) {
								var node=new TreeNodeModel();
								var objectAttrs = object.attributes;
								var isGroupType=false;
								objectAttrs.forEach(function (attr) {
								    
									if (attr.name === 'ds6w:what/ds6w:type') {
										node.options.type = attr['value'];
										if(attr['value'] == 'Group' || attr['value'] == 'Group Proxy'){
											isGroupType=true;
										}
									}
									if (attr.name === 'resourceid') node.options.value = attr['value'];
									if (attr.name === 'ds6w:label') {
										if(isGroupType){
											node.options.label = attr['value']+'(User Group)';
										}else{
											node.options.label = attr['value'];
										}
									}
									if (attr.name === 'ds6w:identifier') {
										node.options.name = attr['value']; 
										node.options.grid={
												name: node.options.name		
										}}	
									if (attr.name === 'ds6w:status') node.options.status = attr['value'];
								});
								objectTreeDocument.addRoot(node);
							});
						}
						resolve(objectTreeDocument);
					};

					var getFailure = function (data) {
						reject(data);
					};		
					var getprecondValue = optionsValue.getPrecond();
					if(getprecondValue instanceof Promise){
						getprecondValue.then(
								success => {
									getSearchResult(success, typedValue, getSuccess, getFailure);
								},
								failure =>{
									if(failure.error){
										widget.notify.handler().addNotif({
											level: 'error',
											subtitle: failure.error,
											sticky: false
										});
									}
								});
					}
					else{
						getSearchResult(getprecondValue, typedValue, getSuccess, getFailure);
					}
				});
			},
			filterCB: function(text) {
				objectTreeDocument.setFilterModel({
		            value: {
		              filterId: "myFilterID",
		              filterModel: {
										// The filtermodel can contain anything that we want. Here, we just need the text set in the autocomplete
		                text:  text
		              }
		            }
		          });
		        },
			multiSearchMode: optionsValue.isMultiSearchMode,
			placeholder: optionsValue.placeHolderValue,
			minLengthBeforeSearch: optionsValue.minLengthToType,
			allowFreeInputFlag: optionsValue.isFreeInputAllowed,
			keepSearchResultsFlag:optionsValue.toKeepSearchResultsFlag
		});
		autoCompleteComponent.addEventListener('change', function(e) {
			if(optionsValue.getChangeHandler){
				optionsValue.getChangeHandler();
			}
		});
		autoCompleteComponent.getContent().querySelector(".wux-ui-state-undefined").addEventListener("keyup",function(e,autoCompleteComponent){
			if (e.keyCode === 13) {
				e.stopPropagation();
			}
		});
		return autoCompleteComponent;
	};
	
	let getSearchResult = function(precondAndResourceIdIn, typedValue, success, failure){
		var url = "/search?xrequestedwith=xmlhttprequest";
		var searchQuery=precondAndResourceIdIn;
		var resourceidIn=[];
		var resourceidNotIn=[];
		/*
		if(precondAndResourceIdIn.precond){
			searchQuery=precondAndResourceIdIn.precond;
		}
		if(precondAndResourceIdIn.resourceid_in){
			resourceidIn=precondAndResourceIdIn.resourceid_in;
		}
		if(precondAndResourceIdIn.resourceid_not_in){
			resourceidNotIn=precondAndResourceIdIn.resourceid_not_in;
		}
		*/
		var queryString = "";
		queryString = "(" + typedValue +" AND "+ searchQuery+ ")" ;
		var tenantValue= widget.getValue("x3dPlatformId");//EnoviaBootstrap.getTenantValue();
		var inputjson = {
				"with_indexing_date": true,
				"with_nls": false, 
				"label": "yus-1515078503005", 
				"locale": "en", 
				"select_predicate": ["ds6w:label", "ds6w:type", "ds6w:identifier", "ds6wg:fullname", 'ds6w:status'],
				"select_file": ["icon", "thumbnail_2d"], 
				"query": queryString, 
				"order_by": "asc", 
				"order_field": "ds6w:label",
				"nresults": 1000,
				"start": "0",
				"source": [], 
				"tenant": tenantValue //,
				//"resourceid_in": resourceidIn,
				//"resourceid_not_in": resourceidNotIn 
			};
		inputjson = JSON.stringify(inputjson);

		var options = {};
		options.isfederated = true;
		ESignServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);	};
	
    ENOESignAutoComplete={
            drawAutoCompleteComponent : (optionsValue) => { return drawAutoCompleteComponent(optionsValue);}         
    };
    return ENOESignAutoComplete;
});


define('DS/ENXESignConfigApp/View/Facets/ESignPropertiesTabs', [
  'DS/Controls/TabBar',
  'DS/ENXESignConfigApp/Config/ESignInfoFacets',
  'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
],
  function (WUXTabBar,ESignInfoFacets,NLS) {
	'use strict';
	let _eSignPropertiesTabs, _currentTabIndex, ESignInfoTabInstances = {}, _ESignInfoModel = {},_container,_mode;
	
	let ESignPropertiesTabs = function(container, meetingInfoModel,mode){
		_ESignInfoModel = meetingInfoModel;
		this.container = container;
		_container = container;
		_mode = mode;
	};

    let ontabClick = function(args){
		let seltab = args.options.value;
		if(typeof seltab == 'undefined'){
			seltab = args.dsModel.buttonGroup.value[0]; //this is to get the selected tab from the model
		}
		if (seltab === _currentTabIndex){
			return;
		}
		var ntabs =["ESignPropertiesInfo"];
		ESignInfoTabInstances[ntabs[seltab]].init(_ESignInfoModel,_container,_mode);
		if(typeof _currentTabIndex != 'undefined'){
			ESignInfoTabInstances[ntabs[_currentTabIndex]].hideView();
		}			
		_currentTabIndex = seltab;		
	};
   
	ESignPropertiesTabs.prototype.init = function(){		
		_eSignPropertiesTabs = new WUXTabBar({
            displayStyle: 'strip',
            showComboBoxFlag: true,
            editableFlag: false,
            multiSelFlag: false,
            reindexFlag: true,
            touchMode: true,
            centeredFlag: false,
            allowUnsafeHTMLOnTabButton: true
        });

		ESignInfoFacets.forEach((tab,index) => {
			_eSignPropertiesTabs.add(tab); 
		});
		_eSignPropertiesTabs.inject(this.container);
		
		//draw the tab contents
		initializeESignPropertiesTabs();	
    };
    
    
    
	let initializeESignPropertiesTabs = function(){		
		new Promise(function (resolve, reject){
			let promiseArr = [];
			ESignInfoFacets.forEach((tab, index)=>
			{				
				if((tab.loader != "")){
					promiseArr[index] = new Promise(function (resolve, reject){
						require([tab.loader], function (loader) {
							ESignInfoTabInstances[tab.id] = loader;	
							resolve();
						});
					})
				}				
			});
			Promise.all(promiseArr).then(() => {
				resolve();
			});			
		}).then(function () {
			let args = {};
			args.options = {};
			args.options.value =0;
			ontabClick(args);
			//event to be called when clicked on any tab
			_eSignPropertiesTabs.addEventListener('tabButtonClick', function(args){
				ontabClick(args);
			});
			_eSignPropertiesTabs.addEventListener('change', function(args){
				ontabClick(args);
			});
			
		}, function () {
			//Error during tab click
		});
		
		
	};
	ESignPropertiesTabs.prototype.destroy = function(){	    	
		try{
			_currentTabIndex = undefined; //this should be the first line, if some error occurs afterward, that would be an issue otherwise			
			Object.keys(ESignInfoTabInstances).map((tab) => {
				ESignInfoTabInstances[tab].destroy();
			});
			if(_eSignPropertiesTabs != undefined){
				_eSignPropertiesTabs.destroy();
			}
			_ESignInfoModel = {};
			//this.container.destroy();
		}catch(e){
	    	//TODO check why this error: TypeError: Cannot read property '__resizeListeners__' of undefined
			//console.log(e);
		}	
	};   

    
    return ESignPropertiesTabs;
  });

/* global define, widget */
/**
  * @overview Meeting - Storage model
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignConfigApp/Model/CollabStorageModel', [
    'UWA/Core',
    'UWA/Class/Model',
    'DS/ENXESignConfigApp/Controller/ESignBootstrap'
], function (
    UWACore,
    UWAModel,
    ESignBootstrap
) {
    'use strict';

    function result(object, property) {

        var value;

        if (object) {

            value = object[property];

            if (UWACore.is(value, 'function')) {
                value = value.call(object);
            }
        }

        return value;
    }

    var _name = 'collabstorage';

    var CollabStorageModel = UWAModel.extend({

        name: _name,

        defaults: {
            csrf: null,
            isInnovation: false,
            displayName: "",
            url: ""
        },

        url: function () {
            return this.get('url');
        },

        fetch: function (options) {
            var url = result(this, 'url');

            options = options ? UWACore.clone(options, false) : {};
            UWACore.extend(options, ESignBootstrap.getSyncOptions(), true);

            return this._parent.call(this, options);
        },

        parse: function (resp) {
            var res = UWACore.clone(resp);

            res.csrf = resp.csrftoken;
            delete res.csrftoken;

            res.isInnovation = resp.isinnovation;
            delete res.isinnovation;

            return res;
        }
    });

    return CollabStorageModel;
});

/* global define, widget */
/**
  * @overview Meeting
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignConfigApp/Collections/CollabStorageCollection',
    [
        'UWA/Core',
        'UWA/Utils',
        'UWA/Class/Collection',
        'DS/PlatformAPI/PlatformAPI',
        'DS/ENXESignConfigApp/Model/CollabStorageModel',
        'DS/i3DXCompassServices/i3DXCompassServices',
        'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
    ], function (
        UWACore,
        UWAUtils,
        UWACollection,
        PlatformAPI,
        CollabStorageModel,
        i3DXCompassServices,
        i3DXCompassPlatformServices
    ) {

    'use strict';

    var _name = 'collabstorages';

    function result(object, property) {

        var value;

        if (object) {

            value = object[property];

            if (UWACore.is(value, 'function')) {
                value = value.call(object);
            }
        }

        return value;
    }

    var CollabStorageCollection = UWACollection.extend({

        name: _name,

        model: CollabStorageModel,

        //Override of collection call with a platform service call
        // parse, sync and url were removed
        //This architecture may be improved, without using a collection for example
        fetch: function (options) {
            var that = this;

            var platformsWithCSV = [];

            return new Promise(function (resolve, reject) {
                i3DXCompassPlatformServices.getGrantedRoles(function (roles) {
                    roles.forEach(function (role) {
                        if (role.id === 'CHG' || role.id === 'UWU' || role.id === 'InternalDS') {
                            if (UWA.is(role.platforms, 'array')) {
                                platformsWithCSV = platformsWithCSV.concat(role.platforms);
                            }
                        }
                    });
                    resolve();
                });
            }).then(function () {

                i3DXCompassServices.getPlatformServices({
                    serviceName: '3DSpace',
                    onComplete: function (resp) {
                        if (platformsWithCSV.length > 0) {
                            Object.keys(resp).map(function (key) {
                                if (platformsWithCSV.includes(resp[key].platformId)) {
                                    that.add({
                                        id: resp[key].platformId,
                                        displayName: resp[key].displayName,
                                        url: resp[key]['3DSpace']
                                    });
                                }
                            });
                        }
                        if (options && options.onComplete) {
                            options.onComplete(that);
                        }
                    },
                    onFailure: function (resp) {
                        if (options && options.onFailure) {
                            options.onFailure(resp);
                        }
                    }
                });

            });

        },

        getStorageWithUrl: function (url, options) {
            options = UWACore.clone(options || {}, false);

            var that = this, target = UWAUtils.parseUrl(url).domain, domainStrict = options.domainStrict, filter;

            filter = function (storage) {

                var current = UWAUtils.parseUrl(result(storage, 'url')).domain;

                return current === target;
            };

            if (!UWACore.is(target)) {
                return;
            }

            return this.find(filter);
        }
    });

    return CollabStorageCollection;
});

/**
 * ESign summary grid view custom column
 */

define('DS/ENXESignConfigApp/View/Grid/ESignGridCustomColumns',
    [
        'DS/ENXESignConfigApp/Controller/ESignBootstrap',
        'DS/ENXESignConfigApp/Utilities/Utils',
        'DS/WebappsUtils/WebappsUtils',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
    ],
    function (ESignBootstrap, Utils, WebappsUtils, NLS) {

        'use strict';

        let onESignNodeStateCellRequest = function (cellInfos) {
            let reusableContent;
            if (!cellInfos.isHeader) {
                reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_state_');
                if (reusableContent) {
                    //cellInfos.cellView.getContent().setContent(reusableContent);
                    let state = cellInfos.nodeModel.options.grid.State;
                    reusableContent.getChildren()[0].setHTML(cellInfos.nodeModel.options.grid.stateNLS);
                    reusableContent.getChildren()[0].setAttribute("class", "esign-state-title " + state.toUpperCase().replace(/ /g, ''));
                    cellInfos.cellView._setReusableContent(reusableContent);
                }
            }
        };

        let onESignNodeDateCellRequest = function (cellInfos) {
            let reusableContent;
            if (!cellInfos.isHeader) {
                reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_modifiedDate_');
                if (reusableContent) {
                    const mdate = cellInfos.nodeModel.options.grid.ModifiedOriginal;
                    const mdfdate = Utils.formatDateTimeString(new Date(mdate));
                    reusableContent.getChildren()[0].setHTML(mdfdate);
                    reusableContent.getChildren()[0].setAttribute("class", "esign-modified-date" + mdfdate);
                    cellInfos.cellView._setReusableContent(reusableContent);
                }
            }
        };

        const onESignNodeOwnerCellRequest = function (cellInfos) {
            getIcon(cellInfos, 'OwnerFullName', 'Owner')
        }

        const onESignNodePolicyOwnerCellRequest = function (cellInfos) {
            const PolicyOwnerType = cellInfos.nodeModel.options.grid.PolicyOwnerType 
            const isUserGroup = (PolicyOwnerType == 'Group' || PolicyOwnerType == 'Group Proxy')
            getIcon(cellInfos, 'PolicyOwner', 'PolicyOwnerName', isUserGroup)
        }

        const getIcon = function (cellInfos, displayName, name, isUserGroup) {
            let reusableContent;
            if (!cellInfos.isHeader) {
                reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_owner_');
                if (reusableContent) {
                    //cellInfos.cellView.getContent().setContent(reusableContent);
                    const cellValue = cellInfos.nodeModel.options.grid[displayName];
                    const userName = cellInfos.nodeModel.options.grid[name];
                    const ownerIconURL = "/api/user/getpicture/login/" + userName + "/format/normal";
                    const swymOwnerIconUrl = ESignBootstrap.getSwymUrl() + ownerIconURL;
                    if (isUserGroup == true) {
                        reusableContent.getChildren()[0].getChildren()[0].setStyle("background", "none");
                        const src = WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp', 'icons/ESignConfig/I_UserGroup16.png');
                        const ugImg = UWA.createElement('img', {
                            src:src,
                        });
                        reusableContent.getChildren()[0].getChildren()[0].setHTML(ugImg);
                    } else if (ESignBootstrap.getSwymUrl() && ESignBootstrap.getSwymUrl().length > 0) {
                        reusableContent.getChildren()[0].getChildren()[0].src = swymOwnerIconUrl;
                    } else {
                        const iconDetails = getAvatarDetails(cellValue);
                        reusableContent.getChildren()[0].getChildren()[0].setHTML(iconDetails.avatarStr);
                        reusableContent.getChildren()[0].getChildren()[0].setStyle("background", iconDetails.avatarColor);
                    }
                    reusableContent.getChildren()[1].setHTML(cellValue);
                    cellInfos.cellView._setReusableContent(reusableContent);
                }
            }
        };



        /* let onESignNodeAssigneesCellRequest= function (cellInfos) {
         var cell= cellInfos.cellView.getContent(); 
         var assigneesDiv = new UWA.Element("div", {class:'members'});
         if (!cellInfos.isHeader) {
             var members = cellInfos.nodeModel.options.grid.Assignees;
                 if(typeof members != 'undefined'){
                     for(var j=0; j< members.length; j++){
                           //assignees
                           if(members[j]!=""){
                             //assigneeTooltip = assigneeTooltip + members[j].fullName + " (" + members[j].userName + "),\n";
                             //assigneeGroup = assigneeGroup + members[j].fullName + " (" + members[j].userName + "),";
                             var URL = "/api/user/getpicture/login/"+members[j]+"/format/normal";
                            // var url = enoviaServerCAWidget.computeSwymUrl(URL);
                             var assignee = new UWA.Element("div", {
                                class:'assignee'
                              });
                              var userIcon = "";
                              if(enoviaServerCAWidget.isSwymInstalled){
                                 userIcon = UWA.createElement('img', {
                                      class:'userIcon',
                                      src: url
                                 });
                              } else {
                                var iconDetails = getAvatarDetails(members[j]);
                                userIcon = UWA.createElement('div', {
                                      html: iconDetails.avatarStr,
                                       "title": members[j],
                                      class: "avatarIcon"
                                  });
                                userIcon.style.setProperty("background",iconDetails.avatarColor);
                             // }
                              userIcon.inject(assignee);
                              assignee.inject(assigneesDiv);
                       }
                 }
             }
             
         }   
         cell.setContent(assigneesDiv.outerHTML);
        };*/
        let getAvatarDetails = function (inputName) {
            let name = inputName
            if (name.indexOf && name.indexOf('(User Group)')) {
                name = name.split('(User Group)')[0]
            }
            let options = {};
            let backgroundColors = [
                [7, 139, 250],
                [249, 87, 83],
                [111, 188, 75],
                [158, 132, 106],
                [170, 75, 178],
                [26, 153, 123],
                [245, 100, 163],
                [255, 138, 46],
            ]
            let initials = name.match(/\b\w/g);
            let firstLetter = initials[0].toUpperCase();
            let lastLetter = initials[initials.length - 1].toUpperCase();

            let avatarStr = (firstLetter + lastLetter);

            let i = Math.ceil((firstLetter.charCodeAt(0) + lastLetter.charCodeAt(0)) % backgroundColors.length);
            let avatarColor = "rgb(" + backgroundColors[i][0] + "," + backgroundColors[i][1] + "," + backgroundColors[i][2] + ")";

            options.name = name;
            options.avatarStr = avatarStr;
            options.avatarColor = avatarColor;

            return options;
        };
        let ESignGridViewOnCellRequest = {

            onESignNodeStateCellRequest,
            onESignNodeDateCellRequest,
            //onESignNodeAssigneesCellRequest : (cellInfos) => { return onESignNodeAssigneesCellRequest(cellInfos);},
            onESignNodeOwnerCellRequest,
            onESignNodePolicyOwnerCellRequest,
            getAvatarDetails
        };
        return ESignGridViewOnCellRequest;
    });

define('DS/ENXESignConfigApp/View/Properties/ESignPropertiesFacet', [
  //'DS/ENXMeetingMgmt/View/Properties/MeetingPropertiesFacetIDCard',
  'DS/ENXESignConfigApp/View/Facets/ESignPropertiesTabs',
  'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
],
  function ( ESignPropertiesTabs,NLS) {
	'use strict';
	let  facetsContainer;
	const destroyViews = function(){
		//new MeetingPropertiesFacetIDCard(headerContainer).destroyContainer();
		new ESignPropertiesTabs(facetsContainer).destroy();
    };
	var ESignPropertiesFacet = function(rightPanel,mode){
		this.rightPanel = rightPanel;
	  	
		//headerContainer = new UWA.Element('div',{"id":"MeetingPropertiesFacetHeaderContainer","class":"MeetingPropertiesFacet-header-container",styles:{"height":"10%"}});
	  	facetsContainer = new UWA.Element('div',{"id":"eSignPropertiesFacetFacetsContainer","class":"eSignPropertiesFacet-facets-container"});
	  	var infoHeaderSecAction = new UWA.Element('div',{"id":"infoHeaderCloseAction","class":"info-close-actions-section"} );		
		// Close action
		UWA.createElement('div',{
			"id" : "eSignViewPanelClose",
			"title" : NLS.eSignViewCloseTooltip,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	widget.eSignEvent.publish('esign-info-close-click');
                }
			}
		}).inject(infoHeaderSecAction);		
		facetsContainer.appendChild(infoHeaderSecAction);
	};
	ESignPropertiesFacet.prototype.init = function(data,mode){	
		destroyViews(); //to destroy any pre-existing views
		new ESignPropertiesTabs(facetsContainer, data,mode).init();
		this.rightPanel.appendChild(facetsContainer);
	 	//new MeetingPropertiesFacetIDCard(headerContainer).resizeSensor();
	 	// Events //
    };
    ESignPropertiesFacet.prototype.destroy = function(){
    	//destroy
    	this.rightPanel.destroy();
    };
    
    return ESignPropertiesFacet;

  });

define('DS/ENXESignConfigApp/View/IDCard/ESignIDCardHeader', [
	'DS/ResizeSensor/js/ResizeSensor',
	'DS/ENXESignConfigApp/Utilities/IdCardUtil',
	'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
	'DS/WebappsUtils/WebappsUtils',
	'css!DS/ENXESignConfigApp/ENXESignConfigApp.css',
],
  function (ResizeSensor, IdCardUtil, NLS, WebappsUtils) {
	'use strict';
	let esignIdCard;
	var IDCardHeaderView = function(container){
	  this.container = container;
	};
	
	IDCardHeaderView.prototype.resizeSensor = function(){
		new ResizeSensor(esignIdCard, function () {
			IdCardUtil.resizeIDCard(esignIdCard.offsetWidth);
		});
	};
	
	IDCardHeaderView.prototype.resizeIDCard = function(){
		IdCardUtil.resizeIDCard(esignIdCard.offsetWidth);
	};
	
	IDCardHeaderView.prototype.init = function(data, infoIconActive){
		//add all the required information in esignHeader like esign name 
		//Expander to expand the right panel
		esignIdCard = new UWA.Element('div', { "id": "esignIdCard", "class": "" });
		this.container.appendChild(esignIdCard);
					
		var infoAndThumbnailSec = new UWA.Element('div', { "id": "infoAndThumbnailSec", "class": "id-card-info-and-thumbnail-section" });
		esignIdCard.appendChild(infoAndThumbnailSec);
		
		
		// Add homeicon //
		UWA.createElement('div', {
			"id" : "esignHome",
			"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-home fonticon-display fonticon-color-display",
			"title" : NLS.home,
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	goBackToESignSummary();
                }
			}
		}).inject(infoAndThumbnailSec);
		
		var thumbnailSec = new UWA.Element('div',{
			"id":"thumbnailSection",
			"class":"id-card-thumbnail-section",
			"html":[
				  UWA.createElement('div',{
					  "class":"id-card-thumbnail",
					  styles:{
						  "background-image": "url("+WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp','icons/ESignConfig/ESignConfiguration-Thumbnail.png')+")"
					  }
				  	})]
		});
		infoAndThumbnailSec.appendChild(thumbnailSec);

		// Info section //
		var infoSec = new UWA.Element('div',{"id":"infoSec","class":"id-card-info-section no-bottom-border"});
		infoAndThumbnailSec.appendChild(infoSec);
		
		// Info header will have title and Action //
		var infoHeaderSec = new UWA.Element('div',{"id":"infoHeaderSec","class":"id-card-header-section"});
		infoSec.appendChild(infoHeaderSec);

		var infoHeaderSecAction = new UWA.Element('div',{"id":"infoHeaderSecAction","class":"id-card-actions-section"});
		infoHeaderSec.appendChild(infoHeaderSecAction);
		
		// header action - info
		var infoDisplayClass = "fonticon-color-display";
		if(infoIconActive){
			infoDisplayClass = "fonticon-color-active"; 
		}
		UWA.createElement('div',{
			"id":"esignInfoIcon",
			"title": NLS.idCardHeaderActionInfo,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-info fonticon-display " + infoDisplayClass + " ",
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	//First check if the info panel is already open, if already open then close the panel
            		if(widget.getValue("propWidgetOpen")){
            			widget.eSignEvent.publish('esign-info-close-click',{info: "ESign"});
            		}else{
            			widget.eSignEvent.publish('esign-header-info-click', {model: data.model,info: "ESign"});
            		}
                }
			}
		}).inject(infoHeaderSecAction);
		
		// Info Detail Section //
		var infoDetailedSec = new UWA.Element('div',{"id":"infoDetailedSec","class":"id-card-detailed-info-section"});
		infoSec.appendChild(infoDetailedSec);
		
    };
    IDCardHeaderView.prototype.destroyContainer = function(){
    	//destroy container
    	this.container.destroy();
    };
    IDCardHeaderView.prototype.destroyContent = function(){
    	//destroy content
    	esignIdCard.destroy();
    };


    let goBackToESignSummary = function() {
    	widget.eSignEvent.publish('esign-back-to-summary');
    	//close all right panels when summary page opens
    	//widget.esignMgmtMediator.publish('esign-info-close-click');
		widget.eSignEvent.publish("esign-task-close-click-view-mode");
		widget.eSignEvent.publish("esign-task-close-click-edit-mode");
    	require(['DS/ENXESignConfigApp/Model/ESignModel'], function (ESignModel) {
    		widget.eSignEvent.publish('esign-widgetTitle-count-update', { model: ESignModel.getModel() });
    	});
    	widget.setValue('openedESignId', undefined);
    };
    
    return IDCardHeaderView;
});


define('DS/ENXESignConfigApp/Config/ESignSummaryGridViewConfig',
  [
    'DS/ENXESignConfigApp/View/Grid/ESignGridCustomColumns', //TODO change the path
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
  ],
  function (ESignGridViewOnCellRequest, NLS) {
    'use strict';

    let ESignSummaryGridViewConfig = [
      {
        text: NLS.title,
        dataIndex: 'tree',
        editableFlag: false,
        pinned: 'left',
      },
      {
        text: NLS.name,
        dataIndex: 'Name',
        editableFlag: false,
        pinned: 'left',
      }, {
        text: NLS.maturityState,
        dataIndex: 'stateNLS',
        editableFlag: false,
        onCellRequest: ESignGridViewOnCellRequest.onESignNodeStateCellRequest
      }, {
        text: NLS.description,
        dataIndex: 'Description',
        editableFlag: false, 
      }, {
        text: NLS.modified,
        dataIndex: 'Modified',
        editableFlag: false,
        onCellRequest: ESignGridViewOnCellRequest.onESignNodeDateCellRequest,
        width: 150  
      }, {
        text: NLS.revision,
        dataIndex: 'Revision',
        editableFlag: false,         
      }, {
        text: NLS.Owner,
        dataIndex: 'OwnerFullName',
        editableFlag: false,
        onCellRequest: ESignGridViewOnCellRequest.onESignNodeOwnerCellRequest
      }, 
      {
        text: NLS.policyOwner,
        dataIndex: 'PolicyOwner',
        editableFlag: false,
        onCellRequest: ESignGridViewOnCellRequest.onESignNodePolicyOwnerCellRequest
      }, 
      {
        text: NLS.approvalSignMeaning,
        dataIndex: 'ApprovalESignMeaning',
        editableFlag: false,
      }, {
        text: NLS.approvalSignatureComment,
        dataIndex: 'ApprovalESignComment',
        editableFlag: false,
      }, {
        text: NLS.disapprovalSignMeaning,
        dataIndex: 'DisApprovalESignMeaning',
        editableFlag: false,
      }, {
        text: NLS.disapprovalSignatureComment,
        dataIndex: 'DisApprovalESignComment',
        editableFlag: false,
      }, {
        text: NLS.authorizationRequires,
        dataIndex: 'AuthorizationRequiresNLS',
        editableFlag: false,
      }, {
        text: NLS.signatureAppliedAs,
        dataIndex: 'SignatureAppliedAs',
        editableFlag: false,
      }
    ];

    return ESignSummaryGridViewConfig;

  });

/**
 * datagrid view for route summary page
 */
define('DS/ENXESignConfigApp/View/Grid/ESignSummaryDataGridView',
    [
        'DS/ENXESignConfigApp/Config/ESignSummaryGridViewConfig',
        'DS/ENXESignConfigApp/Components/Wrappers/WrapperDataGridView',
        'DS/ENXESignConfigApp/Config/Toolbar/ESignSummaryToolbarConfig'
    ], function (
        DatagridViewConfig,
        WrapperDataGridView,
        ESignSummaryToolbarConfig
    ) {

    'use strict';
    let _toolbar, _dataGridInstance;
    const build = model => {
        var _container = UWA.createElement('div', { id: 'dataGridViewContainer', 'class': 'data-grid-container showView nonVisible' });
        let toolbar = ESignSummaryToolbarConfig.writetoolbarDefinition(getFilterPreferences());
        let dataGridViewContainer = WrapperDataGridView.build(model, DatagridViewConfig, toolbar, _container);
        _toolbar = WrapperDataGridView.dataGridViewToolbar();
        _dataGridInstance = WrapperDataGridView.dataGridView();

        /*_dataGridInstance.onDropCell = function onDropCell(e, info) {
            info.nodeModel.unhighlight();
            DragAndDropManager.onDropManager(e,info);
        };
        _dataGridInstance.onDragOverCell = function onDragOver(e,info){
            info.nodeModel.highlight();
            e.preventDefault();
        };
        _dataGridInstance.onDragLeaveCell = function(e, info){
            info.nodeModel.unhighlight();
        };*/
        return dataGridViewContainer;
    };


    const getGridViewToolbar = () => {
        return _toolbar;
    };

    const getDataGridInstance = () => {
        return _dataGridInstance;
    };

    const getFilterPreferences = () => {
        var pref = widget.getValue("esignfilters");
        if (pref == undefined) {
            widget.setValue("esignfilters", ['owned', 'Create', 'In Progress', 'Complete']);
            return ['owned', 'Create', 'In Progress', 'Complete'];
        } else {
            return pref;//Array.from(new Set(pref)) ;
        }
    };

    return {
        build,
        //  registerListners : () =>{return registerListners();}, 
        //  destroy: () => {_dataGrid.destroy();},
        getGridViewToolbar,
        getDataGridInstance
    };
});

define("DS/ENXESignConfigApp/Config/Toolbar/ToggleViews",
        ['DS/ENXESignConfigApp/View/Grid/ESignSummaryDataGridView',
         'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
], function(ESignSummaryDataGridView, NLS) {
    "use strict";
    let gridViewClassName,tileViewClassName,viewIcon;
    return {

            /*
             * Method to change view from Grid View to Tile View Layout and vice-versa
             */
            
            doToggleView: function(args) {
                switch(args.curPage){
                    case "ESignSummary" :   gridViewClassName=".data-grid-container";
                                            tileViewClassName=".tile-view-container";
                                            viewIcon = ESignSummaryDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                            break;
                   
                    default            :     console.log("Incorrect arguments in config file.");
                }

                if(args.view == "GridView"){
                    viewIcon.options.grid.data.menu[0].state = "selected";
                    viewIcon.options.grid.data.menu[1].state = "unselected";
                    if(viewIcon && viewIcon.options.grid.semantics.icon.iconName != "view-list"){
                        viewIcon.updateOptions({
                          grid: {
                            semantics:{
                              icon:{
                                iconName: "view-list"
                              }
                            }
                          },
                          tooltip:NLS.gridView
                        });
                      }
                    var gridView = document.querySelector(gridViewClassName);
                    if(gridView){
                        gridView.removeClassName("hideView");
                        gridView.removeClassName("nonVisible");
                        gridView.addClassName("showView");
                    }

                    var tileView = document.querySelector(tileViewClassName);
                    if(tileView){
                        tileView.removeClassName("showView");
                        tileView.addClassName("hideView");
                    }
                } else if(args.view == "TileView"){
                    viewIcon.options.grid.data.menu[0].state = "unselected";
                    viewIcon.options.grid.data.menu[1].state = "selected";
                    if(viewIcon && viewIcon.options.grid.semantics.icon.iconName != "view-small-tile"){
                        viewIcon.updateOptions({
                          grid: {
                            semantics:{
                              icon:{
                                iconName: "view-small-tile"
                              }
                            }
                          },
                          tooltip: NLS.tileView
                        });
                      }
                    var gridView = document.querySelector(gridViewClassName);
                    if(gridView){
                        gridView.removeClassName("showView");
                        gridView.addClassName("hideView");
                    }

                    var tileView = document.querySelector(tileViewClassName);
                    if(tileView){
                        tileView.removeClassName("hideView");
                        tileView.addClassName("showView");
                    }
                }
            }


    };
});

define('DS/ENXESignConfigApp/View/IDCard/ESignIDCardView', [
    'DS/ENXESignConfigApp/View/IDCard/ESignIDCardHeader'
],
    function (ESignIDCardHeader) {
        'use strict';
        let headerContainer, facetsContainer;
        const destroyViews = function () {
            new ESignIDCardHeader(headerContainer).destroyContainer();

        };
        var ESignIDCardWrapper = function (rightPanel) {
            this.rightPanel = rightPanel;
            headerContainer = new UWA.Element('div', { "id": "esignHeaderContainer", "class": "esign-header-container" });
            facetsContainer = new UWA.Element('div', { "id": "esignFacetsContainer", "class": "esign-facets-container" });
        };
        ESignIDCardWrapper.prototype.init = function (data) {
            destroyViews(); //to destroy any pre-existing views
            var infoIconActive = false;
            new ESignIDCardHeader(headerContainer).init(data, infoIconActive);

            /*this.rightPanel.getLeftViewWrapper().appendChild(headerContainer);
            this.rightPanel.getLeftViewWrapper().appendChild(facetsContainer);*/

            this.rightPanel.appendChild(headerContainer);
            this.rightPanel.appendChild(facetsContainer);

            new ESignIDCardHeader(headerContainer).resizeSensor();

        };
        ESignIDCardWrapper.prototype.destroy = function () {
            //destroy
            this.rightPanel.destroy();
        };

        return ESignIDCardWrapper;

    });

define('DS/ENXESignConfigApp/View/Info/RightPanelInfoView', [
    // 'DS/ENORouteMgmt/Views/RouteInfoPropWidget',
    // 'DS/ENORouteMgmt/Views/TaskInfoEdit',
    // 'DS/ENORouteMgmt/Views/ContentInfoPropWidget',
    // 'DS/ENXESignConfigApp/View/Panels/ESignPropertiesPanel',
     'DS/ENXESignConfigApp/View/Properties/ESignPropertiesFacet',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
], function (
    //RouteInfoPropWidget,TaskInfoEdit,ContentInfoPropWidget, 
   // ESignPropertiesPanel,
    ESignPropertiesFacet,
    NLS) {
    'use strict';
    let displayContainer;
    const destroyViews = function () {
        displayContainer.destroy();
    };

    /*	const destroyPlaceholder = function() {
        let placeholderDiv = displayContainer.querySelector(".esign-information-no-selection-placeholder");
        if(placeholderDiv){
            placeholderDiv.destroy();
        }
    };*/

    const buildPlaceholder = function (html) {
        let placeholder = UWA.createElement('div', {
            'class': 'esign-information-no-selection-placeholder',
            html: [UWA.createElement('div', {
                'class': 'no-info-to-show',
                html: [UWA.createElement('div', {
                    'class': 'pin',
                    html: '<span class="fonticon fonticon-5x fonticon-info"></span>'
                }), UWA.createElement('span', {
                    'class': 'no-info-to-show-label',
                    html: html
                })]
            })]
        });
        displayContainer.appendChild(placeholder);
    };

    var RightPanelInfoView = function (container) {
        this.container = container;
        displayContainer = new UWA.Element('div', {
            "id": "esignInfoDisplayContainer",
            styles: { "height": "100%" }
        });
    };
    RightPanelInfoView.prototype.init = function (data, loadFor) {
        // console.log('right panel open called')
       // destroyViews(); // to destroy any pre-existing views
        //destroyPlaceholder(); //Don't destroy the complete view, as edit prop widget uses this view for rendering subsequent object's view 
        //Instead of detroying the view, just make the view empty. In that way element still stays usable, only the child elements get detroyed and become unused
        displayContainer.empty();
        
       
		if(loadFor == "esignInfo" && data.model != undefined){
		
			//ESignPropertiesPanel.render(displayContainer,data);    // Edit Properties Widget
			
			let esignPropertiesFacet = new ESignPropertiesFacet(displayContainer,loadFor);
			esignPropertiesFacet.init(data,"view");
		}else{
            widget.eSignEvent.publish('esign-info-close-click', { info: "ESign" })
			if(data.multiRowSelect && data.model == undefined){
			     buildPlaceholder(NLS.multiRowsInfoPlaceholder);
			 }else{
			 	 buildPlaceholder(NLS.NoInfoPlaceholder);
			 }
		}
        // if(loadFor == "esignInfo"){
        //     /*if(data.model.Type=="Route Template"){
        //         widget.esignMgmtMediator.publish('template-info-panel', {templatedata : data, container : displayContainer});
        //     }else{
        //        // RouteInfoPropWidget.render(displayContainer,data);}	

        //     }*/
        //     RoutePropertiesPanel.render(displayContainer,data);
        // }else if(loadFor == "taskActionMode" || loadFor == "taskEditMode"){
        //     TaskInfoEdit.init(displayContainer,data,loadFor);
        // }else if(loadFor == "contentPreview"){
        //     ContentInfoPropWidget.render(displayContainer,data);
        // }else if(loadFor == "emptyInfo"){
       
        // }
        this.container.appendChild(displayContainer);
    };
    RightPanelInfoView.prototype.destroy = function () {
        // destroy
        this.container.destroy();
    };

    RightPanelInfoView.prototype.destroyEditPropWidget = function () {
        // destroy
        //nsm todo
        //RoutePropertiesPanel.destroyEditPropWidget();
    };


    return RightPanelInfoView;

});


/* global define, widget */
define('DS/ENXESignConfigApp/Services/ESignWidgetUtilServices',
        [
         'UWA/Core',
         'UWA/Class/Promise',
         'DS/ENXESignConfigApp/Controller/ESignBootstrap'
         ],
         function(
                 UWACore,
                 Promise,
                 ESignBootstrap
         ) {
    'use strict';
        
    let _fetchSecurityContext= function() {
        return new Promise(function(resolve, reject) {
            let postURL=ESignBootstrap.get3DSpaceURL()+'/resources/bps/cspaces';
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.onComplete = function(serverResponse) {
            	var myOpts=[],options=[];
            	var defaultsc = null,defaultOrgName =null;
				var responseJson = JSON.parse(serverResponse);
				var cspaces=responseJson.cspaces;
                if (!cspaces || cspaces.length === 0) {
                    cspaces = [];
                }
                
                var org = "";
                var sameOrganization = true;
                cspaces.forEach(function(cspace){
                	var splitName = cspace.displayName.split('.');
                    if (splitName.length === 3 && sameOrganization) {
                    	var cOrg = splitName[1];
                    	if(org == "") org = cOrg;
                    	sameOrganization = (org == cOrg)
                    }
				})
                
				cspaces.forEach(function(cspace){
                    var displayName = cspace.displayName;
                    var splitName = cspace.displayName.split('.');
                    if (splitName.length === 3) {
                        displayName = splitName[2] + ' \u25CF ';
                        if (!sameOrganization) {
                            displayName += splitName[1] + ' \u25CF ';
                        }
                        displayName += splitName[0];
                    }
					myOpts.push({
                        label: displayName,
                        value: cspace.name
                    });
					if (cspace.isDefault) {
						defaultsc=cspace.name;
						defaultOrgName=splitName[1];
                    }
				})
				
				if(defaultsc == null && cspaces.length > 0){
					defaultsc=cspaces[0].name;
					var orgsplit=cspaces[0].displayName.split('.');
					defaultOrgName=orgsplit[1];
				}
                
               options.push({
                        cspaces: myOpts,
                        defaultsc: defaultsc,
                        defaultOrgName:defaultOrgName
                    });
                
                resolve(options);
            };	

            options.onFailure = function(serverResponse,respData) {
                // console.log('ESignWidgetUtilServices._fetchSecurityContext failure', serverResponse,respData)
                reject(respData);
            };

            ESignBootstrap.authenticatedRequest(postURL, options);	
        });
    };
    
    let _fetchStateMapping = function() {
        //todo nsm4
    	var url = ESignBootstrap.get3DSpaceURL()+"/resources/bps/getTypeMaturity?type=Esign";
		   var returnedPromise = new Promise(function (resolve, reject) {
			
			   require(['DS/ENXESignConfigApp/Controller/ESignBootstrap'], function (ESignBootstrap)	{
                ESignBootstrap.authenticatedRequest(url, {
					   headers: {
						   'Accept': 'application/json',
						   'Content-Type' : 'application/ds-json'
					   },
					   method: 'get',
					   type: 'json',
					   onComplete: function(json) {
                        resolve({
                            "Create": "Draft",
                            "Scheduled": "Scheduled",
                            "In_Progress": "In Progress",
                            "Complete": "Completed"
                        })
						   //resolve(json);
					   },
					   onFailure: function(json) {
                        resolve({
                            "Create": "Draft",
                            "Scheduled": "Scheduled",
                            "In_Progress": "In Progress",
                            "Complete": "Completed"
                        })
						   //reject(new Error("Could not fetch Type State Mapping NLS values"));
					   }
				   });
			   });
		   });
		   return returnedPromise;
    };
   
    return {
		   fetchSecurityContext: () => {return _fetchSecurityContext();},
		   fetchStateMapping: () => {return _fetchStateMapping();}
    };

});

/*
global widget
 */
define('DS/ENXESignConfigApp/Controller/ESignController',
	[
		'DS/ENXESignConfigApp/Services/ESignServices',
		'DS/ENXESignConfigApp/Services/ESignWidgetUtilServices',
		'UWA/Promise',
		'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'],
	function (ESignServices,
		EsignWidgetUtilServices,
		Promise, NLS) {
		'use strict';
		let ESignController, eSignID;
		//TODO implement a general callback method for anykind of service failure
		let commonFailureCallback = function (reject, failure) {
			if (failure.statusCode === 500) {
				widget.eSignNotify.handler().addNotif({
					level: 'error',
					subtitle: NLS.unexpectedError,
					sticky: true
				});
			} else {
				reject(failure);
			}
		} 

		/*All methods are public, need to be exposed as this is service controller file*/
		ESignController = {
			fetchSecurityContext: () => {
				return new Promise(function (resolve, reject) {
					EsignWidgetUtilServices.fetchSecurityContext().then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},
			fetchStateMapping: () => {
				return new Promise(function (resolve, reject) {
					EsignWidgetUtilServices.fetchStateMapping().then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},
			fetchAllESigns: ()  => {
				return new Promise(function (resolve, reject) {
					ESignServices.fetchAllESigns().then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},
			fetchESignById: eSignID => {
				return new Promise(function (resolve, reject) {
					ESignServices.fetchESignById(eSignID).then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},
			archiveESign: ids => {
					return new Promise(function(resolve, reject) {
						ESignServices.archiveESign(ids).then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject,failure);
						});
					});	
			},
			updateState: (data, payload) => {
    			return new Promise(function(resolve, reject) {
    				ESignServices.updateState(data, payload).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		updateESignProperties: (jsonData,eSignData) => {
    			return new Promise(function(resolve, reject) {
    				ESignServices.updateESignProperties(jsonData,eSignData).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		modifyESignProperties: (jsonData,eSignData) => {
    			return new Promise(function(resolve, reject) {
    				ESignServices.modifyESignProperties(jsonData,eSignData).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
			changeESignOwner: (esignConfig, esignProperties) => {
				
				return new Promise(function(resolve, reject) {
    				ESignServices.changeESignOwner(esignConfig, esignProperties).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});
			},
			reviseESign: esignConfigId => {
				
				return new Promise(function(resolve, reject) {
    				ESignServices.reviseESign(esignConfigId).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});
			}
		};
		return ESignController;

	});

/* global define, widget */
/**
 * @overview ESign - Data formatter
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXESignConfigApp/Utilities/DataFormatter',
    ['i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    'DS/ENXESignConfigApp/Utilities/Utils'],
    function (NLS, Utils) {
        'use strict';

        let gridData = function (dataElem = {}) {
            // var canDelete = "FALSE";
            // if (dataElem.state == "Create" || dataElem.state == "Draft") {
            //     canDelete = "TRUE";
            // }
            let AuthorizationRequiresNLS = ''
            if (dataElem.AuthorizationRequires == 'Username Password') {
                AuthorizationRequiresNLS = NLS.signTypeBG1
            } else if (dataElem.AuthorizationRequires == 'Password') {
                AuthorizationRequiresNLS = NLS.signTypeBG2
            }
            
            let PolicyOwnerLabel = dataElem.policyOwnerDisplayLabel;
            const PolicyOwnerType = dataElem.policyOwnerType
            if (PolicyOwnerType == 'Group' || PolicyOwnerType == 'Group Proxy' && PolicyOwnerLabel.indexOf('(User Group)') == -1) {
                PolicyOwnerLabel = PolicyOwnerLabel + '(User Group)';
            }

            const checkYesNo = val => val == "Yes" ? NLS.signCommentYesBG1 : (val == "No" ? NLS.signCommentYesBG2 : val)

            const response =
            {
                ESignTitle: dataElem.ESignTitle,
                Name: dataElem.name,
                State: dataElem.current,
                stateNLS: dataElem.stateNLS,
                Modified: Utils.formatDateTimeString(new Date(dataElem.modified)),
                ModifiedOriginal: dataElem.modified,
                Description: dataElem.description,
                Revision: dataElem.revision,
                Owner: dataElem.owner,
                OwnerFullName: dataElem.ownerFullName,
                PolicyOwner: PolicyOwnerLabel,
                PolicyOwnerId: dataElem.policyOwnerId,
                PolicyOwnerName: dataElem.policyOwnerName,
                PolicyOwnerType: dataElem.policyOwnerType,
                ApprovalESignMeaning: dataElem.ApprovalESignMeaning,
                ApprovalESignComment: checkYesNo(dataElem.ApprovalESignComment)  ,
                DisApprovalESignMeaning: dataElem.DisApprovalESignMeaning,
                DisApprovalESignComment: checkYesNo(dataElem.DisApprovalESignComment),
                AuthorizationRequires: dataElem.AuthorizationRequires,
                AuthorizationRequiresNLS,
                SignatureAppliedAs: dataElem.SignatureAppliedAs,
                id: dataElem.id,
                type: dataElem.type,
                modifyAccess: dataElem.modifyAccess,
                deleteAccess: dataElem.deleteAccess,
                promoteAccess: dataElem.promoteAccess,
                demoteAccess: dataElem.demoteAccess,
                lastphysicalid: dataElem.lastphysicalid,
                previousphysicalid: dataElem.previousPhysicalId
                
            };
            return response;
        };

        return {
            gridData: dataElem => gridData(dataElem)
        };
    });


/* global define, widget */
/**
  * @overview ESign Config - ESignConfig Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved. 
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignConfigApp/Model/ESignModel',
    [
        'DS/Tree/TreeDocument',
        'DS/Tree/TreeNodeModel',
        'DS/ENXESignConfigApp/Utilities/DataFormatter',
        'DS/ENXESignConfigApp/Components/Wrappers/WrapperDataGridView',
        'DS/ENXESignConfigApp/Controller/ESignBootstrap',
        'DS/WebappsUtils/WebappsUtils',
        // 'DS/ENXESignConfigApp/Utilities/Utils',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
    ],
    function (
        TreeDocument,
        TreeNodeModel,
        DataFormatter,
        WrapperDataGridView,
        ESignBootstrap,
        WebappsUtils,
        // Utils,
        NLS
    ) {
        'use strict';
        let model = new TreeDocument();
        let _openedESignModel;

        const getOwnerIcon = (dataElem, ownerDiv) => {
            let tooltip = "";
	        const ownerName = dataElem.policyOwnerDisplayLabel;
            const ownerUserName = dataElem.policyOwnerName
            const PolicyOwnerType = dataElem.policyOwnerType
            if (undefined !== ownerName) {
                let owner = new UWA.Element("div", {
                    class:'ownerCell'
                });
                let userIcon = "";
                // nsm4 uncomment when icon is available on the server
                let ownerIconUrl;
                ownerIconUrl= "/api/user/getpicture/login/" + ownerUserName + "/format/normal";
                let swymOwnerIconUrl = ESignBootstrap.getSwymUrl() + ownerIconUrl;
                tooltip = tooltip + ownerName + ",\n";
                const isUserGroup = (PolicyOwnerType == 'Group' || PolicyOwnerType == 'Group Proxy')
                if (isUserGroup == true) {
                    const src = WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp', 'icons/ESignConfig/I_UserGroup16.png');
                    userIcon = UWA.createElement('img', {
                        class: "userIcon",
                        src: src
                    });
                } else if(ESignBootstrap.getSwymUrl() && ESignBootstrap.getSwymUrl().length > 0) {
                    userIcon = UWA.createElement('img', {
                            class: "userIcon",
                            src: swymOwnerIconUrl
                        });
                } else {
                    var iconDetails = getAvatarDetails(ownerName);
                    userIcon = UWA.createElement('div', {
                        html: iconDetails.avatarStr,
                        class: "avatarIcon"
                    });
                    userIcon.style.setProperty("background", iconDetails.avatarColor);
                }
                if(userIcon!=""){
                    userIcon.inject(owner);
                }
                owner.inject(ownerDiv);
            }
            tooltip = tooltip.slice(0, -2);
	        ownerDiv.set({
	             title: tooltip
	        });
	        return tooltip;
        }

        const createTreeDocumentModel = response => {
            model = new TreeDocument();
            model.prepareUpdate();
            let notArchiveCount = 0;
            let stateFilterModel = [NLS.DraftState, NLS.ActiveState]
            response.forEach(dataElem => {
                let ownerDiv = new UWA.Element("div", {
                    class:'members'
                });
                const tooltip = getOwnerIcon(dataElem, ownerDiv)
                if (dataElem.current != 'Archived') {
                    notArchiveCount++;
                }
                const root = new TreeNodeModel({
                    label: dataElem.ESignTitle,
                    id: dataElem.id,
                    width: 300,
                    grid: DataFormatter.gridData(dataElem),
                    "thumbnail": WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp', 'icons/ESignConfig/ESignConfiguration-Thumbnail.png'),
                    description: onESignNodeCellRequest(dataElem, ownerDiv, tooltip),
                    icons: [WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp', 'icons/ESignConfig/ESignConfiguration-Tile.png')],
                    contextualMenu: ["My context menu"],

                    shouldAcceptDrop: true
                });

                model.addRoot(root);
            });

            if (notArchiveCount == 0) {
                stateFilterModel = [NLS.DraftState, NLS.ActiveState, NLS.ArchivedState]
            }
            model.setFilterModel({
                Name: {
                    filterId : 'set'
                },
                stateNLS: {
                    filterId : 'set',
                    filterModel: stateFilterModel
                },
                OwnerFullName: {
                    filterId : 'set'
                },
                PolicyOwner: {
                    filterId : 'set'
                },
                AuthorizationRequiresNLS: {
                    filterId : 'set'
                },
              });
            model.pushUpdate();
            registerEvents();
            return model;
        };

        const appendRows = dataElem => {
            model.prepareUpdate();
            let ownerDiv = new UWA.Element("div", {
                class:'members'
            });
            const tooltip = getOwnerIcon(dataElem, ownerDiv)
            var root = new TreeNodeModel({
                label: dataElem.ESignTitle,
                id: dataElem.id,
                width: 300,
                grid: DataFormatter.gridData(dataElem),
                "thumbnail": WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp', 'icons/ESignConfig/ESignConfiguration-Thumbnail.png'),
                description: onESignNodeCellRequest(dataElem, ownerDiv, tooltip),
                icons: [WebappsUtils.getWebappsAssetUrl('ENXESignConfigApp', 'icons/ESignConfig/ESignConfiguration-Tile.png')],
                contextualMenu: ["My context menu"],

                shouldAcceptDrop: true
            });

            model.getXSO().add(root);
            model.addChild(root, 0);

            model.unselectAll();
            model.pushUpdate();
            noESignPlaceHolderHide();
            widget.eSignEvent.publish('esign-DataGrid-on-dblclick', { model: DataFormatter.gridData(dataElem) });
            return root;
        };

        const onESignNodeCellRequest = function ({ name, stateNLS, current, revision }, owner, tooltip) {
             var commandsDiv="";
             commandsDiv = UWA.createElement('div', {
                 class: "esign-policy-details"
             });

             UWA.createElement('div',{
                 "html": name + " | " + revision,
                 "class":"esign-title-tile"
             }).inject(commandsDiv);

             UWA.createElement('span',{
                "html": stateNLS,
                "class":"esign-state-title "  + current.toUpperCase().replace(/ /g,'')
            }).inject(commandsDiv);

            owner.setStyle("display","inline");
	        owner.setStyle("padding-left",3+"px");
	        owner.set({
                title: tooltip
            });
	        owner.inject(commandsDiv);
             
            return commandsDiv.outerHTML;
         };

         const updateRow = dataElem => {
            let ownerDiv = new UWA.Element("div", {
                class:'members'
            });
            const tooltip = getOwnerIcon(dataElem, ownerDiv)
            if(dataElem.id && dataElem.id != "") {
                 var rowModelToUpdate = getRowModelById(dataElem.id);
                // Update the grid content //
                 rowModelToUpdate.updateOptions({grid:DataFormatter.gridData(dataElem)});
        //          // Update the tile content //
                  rowModelToUpdate.updateOptions(
                          {
                             label:dataElem.ESignTitle,
							description : onESignNodeCellRequest(dataElem, ownerDiv, tooltip)
                          });
              }
          };

          const getAvatarDetails = inputName => {
            let name = inputName
            if (name.indexOf && name.indexOf('(User Group)')) {
                name = name.split('(User Group)')[0]
            }
            let options = {};
            let backgroundColors = [
                [7, 139, 250],
                [249, 87, 83],
                [111, 188, 75],
                [158, 132, 106],
                [170, 75, 178],
                [26, 153, 123],
                [245, 100, 163],
                [255, 138, 46],
            ]
            let initials = name.match(/\b\w/g);
            let firstLetter = initials[0].toUpperCase();
            let lastLetter = initials[initials.length - 1].toUpperCase();

            let avatarStr = (firstLetter + lastLetter);

            let i = Math.ceil((firstLetter.charCodeAt(0) + lastLetter.charCodeAt(0)) % backgroundColors.length);
            let avatarColor = "rgb(" + backgroundColors[i][0] + "," + backgroundColors[i][1] + "," + backgroundColors[i][2] + ")";

            options.name = name;
            options.avatarStr = avatarStr;
            options.avatarColor = avatarColor;

            return options;
        };

        const getRowModelById = id => {
            return WrapperDataGridView.getRowModelById(model, id);
        };

        //uncomment if delete is needed
        //  let deleteRowModelByIds = function(ids){
        //      WrapperDataGridView.deleteRowModelByIds(model,ids);
        //      noMeetingPlaceHolder();		
        //  };

        //  let noMeetingPlaceHolder = function(){
        //      if(checkHiddenNodesCount()== 0){
        //          widget.eSignEvent.publish('show-no-meeting-placeholder');
        //      }
        //  };

        const checkHiddenNodesCount = () => {
            let count = 0;
            model.getChildren().forEach(node => { if (!node._isHidden) count++; });
            return count;
        };
        const noESignPlaceHolderHide = () => {
            if (checkHiddenNodesCount() != 0) {
                widget.eSignEvent.publish('hide-no-esign-placeholder');
            }
        };

        const destroy = () => {
            model = new TreeDocument();
        };

        const registerEvents = () => {
            //todo nsm4
            widget.eSignEvent.subscribe('esign-DataGrid-on-dblclick', data => {
                _openedESignModel = data;
            });
            widget.eSignEvent.subscribe('esign-back-to-summary', data => {
                _openedESignModel = undefined;
            });
        };

        const getopenedESignModel = () => {
            return _openedESignModel;
        }

        const deleteRowModelSelected = () => {
            let selectedRows = WrapperDataGridView.deleteRowModelSelected(model);
            noesignsPlaceHolder();
            return selectedRows;
        };

        const noesignsPlaceHolder = () => {
            if (checkHiddenNodesCount() == 0) {
                widget.eSignEvent.publish('show-no-esign-placeholder');
            }
        };

        const deleteRowModelByIndex = index => {
            WrapperDataGridView.deleteRowModelByIndex(model, index);
            noesignsPlaceHolder();
        };

        return {
            createModel: response => createTreeDocumentModel(response),
            appendRows : data => appendRows(data),
            updateRow : data => updateRow(data),
            getModel: () => model,
            getSelectedRowsModel: () => WrapperDataGridView.getSelectedRowsModel(model),
            getRowModelById: id => getRowModelById(id),
            archiveRowModelByIds: (ids) => archiveRowModelByIds(ids),
            destroy: () => destroy(),
            //  getopenedESignModel : () => getopenedESignModel(),
            deleteRowModelSelected: () => deleteRowModelSelected(),
            deleteRowModelByIndex: index => deleteRowModelByIndex(index),
        };

    });


/**
 * ESign welcome panel.
 */
define('DS/ENXESignConfigApp/View/Panels/WelcomePanel',
    ['DS/Controls/Abstract',
        'DS/ENXESignConfigApp/Utilities/Constants',
        'DS/ENXESignConfigApp/Config/WelcomePanelActionsConfig',
        // 'DS/ENXESignConfigApp/Utilities/DataFormatter',
        'DS/Controls/ProgressBar',
        'DS/ENXESignConfigApp/Model/ESignModel',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
    ],
    function (Abstract,
        Constants,
        WelcomePanelActionsConfig,
        // DataFormatter,
        WUXProgressBar,
        ESignModel,
        NLS) {

        "use strict";
        let esign, wcPanelAction = true;
        let esignWelcomePanel = Abstract.extend({
            activities: [
                {
                    "id": "list",
                    "title": NLS.AccessYourWork,
                    "actions": [{
                        "id": Constants.WELCOMEPANEL_ID_ESIGNS,
                        "text": NLS.eSign,
                        "className": "wcpanel-esign",
                        "fonticon": "properties-pencil",
                        "isDefault": (typeof widget.getValue("HomePage") == 'undefined' || widget.getValue("HomePage") === "esign") ? true : false
                    }]
                },
                {
                    "id": "creation",
                    "title": NLS.StartNewActivity,
                    "actions": [{
                        "id": Constants.WELCOMEPANEL_ID_CREATE_ESIGN,
                        "text": NLS.newESign,
                        "fonticon": "plus",
                        "className": "action-new",
                        "isNotHighlightable": "true"
                    }]
                }],

            /** @options
             * modelEvents
             * container
             */
            init: function (options) {
                this.wPanelOptions = {
                    collapsed: true,
                    title: NLS.AppHeader,
                    subtitle: "",
                    activities: this.activities,
                    parentContainer: options.leftContainer,
                    selectedItem: Constants.WELCOMEPANEL_ID_ESIGNS,
                    withTogglableButton: true,
                    modelEvents: options.modelEvents
                };

                //For loading the summary views initially, for performance improvement
                let esignActivity = WelcomePanelActionsConfig["esign"];

                require([esignActivity.loader.module], function (loader) {
                    esign = loader;
                });
            },

            getWPanelOptions: function () {
                return this.wPanelOptions;
            },

            //TODO remove, this method is not required as triptych is handling the initialization of welcome panel
            //No need to initialize in application layer
            //Just passing the option to triptych

            /*initialize : function() {
                //The initial state of the Welcome panel may have been persisted
                //Read the state from local storage (browser cache) if it is there and
                //set the Welcome panel state accordingly
                var collapsed = localStorage.getItem('esign-WelcomePanelCollapsed');
                var collapsePanel = false;
                if (collapsed !== null && collapsed === 'true') {
                    this.wPanelOptions.collapsed = true;
                }
                let wPanel =  new ENOXWelcomePanel(this.wPanelOptions);
                wPanel.render();
                this.registerEvents();
                return wPanel;
            },*/

            registerEvents: function () {
                let that = this;
                widget.eSignEvent.subscribe('welcome-panel-action-selected', function (data) {
                    if (wcPanelAction) {
                        wcPanelAction = false;
                        let activity = WelcomePanelActionsConfig[data.id];
                        //To clear out the existing divs
                        //without this it was creating multiple grid and tile containers inside widget container
                        if (activity.content == 'summary_page') {
                            widget.setValue("HomePage", activity.id);
                            widget.eSignEvent.publish("esign-welcome-panel-activity-selection", { id: activity.id });
                            that.clearSummaryPage();
                            that.showProgressBar();
                            document.querySelector(".widget-container");
                            that.loadSummaryPages(activity);
                        } else {
                            //save a variable in widget to track widget refresh, hack to have an work around event publishing issue after widget refresh
                            //widget.setValue("isWidgetRefreshed",false);
                            widget.setValue("isDialogOpened", true);
                            that.loadDialogPages(activity);
                        }

                    }

                });

                widget.eSignEvent.subscribe('welcome_note_icon_event', function (data) {
                    //perform
                    //console.log(data);
                });

                widget.eSignEvent.subscribe('welcome-panel-toggle', function (data) {
                    //perform
                    //console.log(data);
                });

                widget.eSignEvent.subscribe('welcome-panel-collapse', function (data) {
                    //perform
                    //console.log(data);
                });

                widget.eSignEvent.subscribe('welcome-panel-expand', function (data) {
                    //perform
                    //console.log(data);
                });
            },

            loadDialogPages: function (activity) {
                require([activity.loader.module], function (loader) {
                    //This is to open dialog pages, as there is no server call, no promise is returned
                    loader[activity.loader.func]();
                    wcPanelAction = true;
                    //Close all right panels
                    //widget.eSignEvent.publish('esign-info-close-click');
                    widget.eSignEvent.publish("esign-task-close-click-view-mode");
                    widget.eSignEvent.publish("esign-task-close-click-edit-mode");
                });
            },

            loadSummaryPages: function (activity) {
                let that = this, info = "ESign";
                //This returns a promise as it retrieves data from server
                esign[activity.loader.func]().then(function (container) {
                    that.hideProgressBar();
                    wcPanelAction = true;
                    widget.eSignEvent.publish('esign-back-to-summary');
                    // that.activateInfoIcon(esign);
                });
                //todo nsm4
                //Close all right panels
                if (widget.getValue("propWidgetOpen")) { //Need to open properties in single click only if info panel is open.
                    widget.eSignEvent.publish('esign-header-info-click', { info: info });
                }
                //widget.eSignEvent.publish('esign-info-close-click');
                widget.eSignEvent.publish("esign-task-close-click-view-mode");
                widget.eSignEvent.publish("esign-task-close-click-edit-mode");
            },

            clearSummaryPage: function () {
                let homepage = document.querySelector(".widget-container");
                let noOfChildren = homepage.children.length;
                for (let i = 0; i < noOfChildren; i++) {
                    homepage.children[0].remove();
                }
            },

            showProgressBar: function () {
                let homepage = document.querySelector(".widget-container");
                //to show the progress bar
                this.progressbar7 = new WUXProgressBar({
                    shape: "circular",
                    infiniteFlag: true,
                    emphasize: "info",
                    // disabled: true,
                    statusFlag: false,
                    height: 60,
                });
                this.progressbar7.inject(homepage);
                this.progressbar7.elements.container.setStyle("margin-left", "40%");
                this.progressbar7.elements.container.setStyle("margin-top", "20%");
            },

            hideProgressBar: function () {
                this.progressbar7.destroy();
            },

            activateInfoIcon: function (CurrentSummaryView) {
                //Need to highlight the info icon if the properties panel is opened
                if (widget.getValue("propWidgetOpen")) {
                    CurrentSummaryView.activateInfoIcon();
                }
            }

        });
        return esignWelcomePanel;
    }
);

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXESignConfigApp/Actions/ESignActions', [
    'DS/ENXESignConfigApp/Controller/ESignController',
    'DS/ENXESignConfigApp/Controller/ESignBootstrap',
    'DS/ENXESignConfigApp/Model/ESignModel',
    'DS/ENXESignConfigApp/Utilities/ParseJSONUtil',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'
],
    function (ESignController, ESignBootstrap, ESignModel, ParseJSONUtil, NLS) {
        'use strict';

        const archiveESign = (ids, actionFromIdCard) => {
            ESignController.archiveESign(ids).then(
                success => {
                    var successMsg = NLS.successRemoveESign;
                    if (ids.length == 1) {
                        successMsg = NLS.successRemoveESignSingle;
                    }
                    successMsg = successMsg.replace("{count}", ids.length);
                    widget.eSignNotify.handler().addNotif({
                        level: 'success',
                        subtitle: successMsg,
                        sticky: false
                    });
                    //published to subscribe in summary view
                    ids.forEach(id => {
                        postStateUpdate(id)
                    });
                },
                failure => {
                    //TODO GDS5 -------Need to modify error msg based on condition
                    if (failure.error) {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
                            subtitle: failure.error,
                            sticky: false
                        });
                    } else {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
                            title: NLS.errorRemove,
                			subtitle: NLS.errorRemoveSubTitle,
                            sticky: false
                        });
                    }
                });
        };

        const postStateUpdate = (id, isStateUpdate, oldState, addrow) => {
            ESignController.fetchESignById(id).then(
                success => {
                    // Refresh id card header and summary page //
                    success[0].noTitleUpdate = true;
                    if (isStateUpdate && oldState){
                        widget.eSignEvent.publish('esign-state-updated', { newState: success[0].current, oldState })
                    }
                    if (addrow) {
                        widget.eSignEvent.publish('esign-summary-append-rows', success[0]);
                		widget.eSignEvent.publish('esign-created', success[0]);
                    } else {
                        widget.eSignEvent.publish('esign-data-updated', success[0]);
                    }
                },
                failure => {
                    if (failure.error) {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
                            subtitle: failure.error,
                            sticky: false
                        });
                    } else {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
 							title: NLS.infoRefreshError,
                			subtitle: NLS.eSignVerifyNWMsg,
                            sticky: false
                        });
                    }
                });
        }
        const updateStateRequest = (data, oldState, newState) => {
            const payload = { oldState, newState }
            ESignController.updateState(data, payload).then(
                success => {
                    widget.eSignNotify.handler().addNotif({
                        level: 'success',
                        subtitle: NLS.stateChangeSuccessMsg,
                        sticky: false
                    });
                    postStateUpdate(data.id)
                    if (data.previousphysicalid) {
                        postStateUpdate(data.previousphysicalid)
                    }
                },
                failure => {
                    if (failure.error) {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
                            subtitle: failure.error,
                            sticky: false
                        });
                    } else {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
 							title: NLS.infoRefreshError,
                            subtitle: NLS.eSignVerifyNWMsg,
                            sticky: false
                        });
                    }
                });
        };

        const changeESignOwner = (esignConfig, properties, destroyContent, destroyContainer) => {
            ESignController.changeESignOwner(esignConfig, properties)
                .then(
                    resp => {
                        postStateUpdate(resp[0].id);
                        widget.eSignNotify.handler().addNotif({
                            level: 'success',
                            subtitle: NLS.replace(NLS.successChangeOwner, {
                                tag1: resp[0].newOwnerLabel
                            }),
                            sticky: true
                        });
                        destroyContent()
                        destroyContainer && destroyContainer()
                    },
                    failure => {
                        if (failure.error) {
                            widget.eSignNotify.handler().addNotif({
                                level: 'error',
                                subtitle: failure.error,
                                sticky: false
                            });
                        } else {
                            widget.eSignNotify.handler().addNotif({
                                level: 'error',
                                subtitle: NLS.failureChangeOwner,
                                sticky: true
                            })
                        }
                        destroyContent()
                        destroyContainer && destroyContainer()
                    }
                );

        }

        const reviseESign = ESignID => {
            return new Promise(function (resolve, reject) {
                ESignController.reviseESign(ESignID)
                    .then(
                        resp => {
                            postStateUpdate(resp.data[0].id, null, null, true);
                            postStateUpdate(ESignID);
                            resolve(resp)
                        },
                        resp => reject(resp)
                    );
            });
        }

        return {
            archiveESign,
            updateStateRequest,
            changeESignOwner,
            postStateUpdate,
            reviseESign
        };

    });

define('DS/ENXESignConfigApp/View/Form/ESignUtil',
[
	'DS/ENXESignConfigApp/Utilities/SearchUtil',
	'DS/ENXESignConfigApp/Controller/ESignController',
	'DS/ENXESignConfigApp/Model/ESignModel',
	'DS/ENXESignConfigApp/Utilities/ParseJSONUtil',
	'DS/ENXESignConfigApp/Utilities/Utils',
	'DS/ENXESignConfigApp/Components/ESignNotify',
	'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',	
	'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'
],
function(SearchUtil,ESignController,ESignModel,ParseJSONUtil,Utils,ESignNotify,NLS) {    
		"use strict";
		let eSignUtil = {
				
			eSignPropertiesUpdate : function(e,eSignData,eSignProperties,destroyContainer){
				
					// validation for title //
					if(!validateTitle(eSignProperties)) {
						e.dsModel.disabled=false; 
						return;
					}
					if(!validateowner(eSignProperties)){
						e.dsModel.disabled=false; 
						return;
					}
					if(!validateAppSignMeaning(eSignProperties)){
					    e.dsModel.disabled=false; 
						return;
					}
					if(!validateDisAppSignMeaning(eSignProperties)){
						e.dsModel.disabled=false; 
						return;
					}
					e.dsModel.disabled=true;
					var initiateJson = getParsedEditESignProperties(eSignProperties); // DATA ELEMENTS json
					var resultElementSelected = [];
					var initModel = {
									'type' : '',
									'id' : '',
									'dataelements':initiateJson
							};
					resultElementSelected.push(initModel);
					var finalJson=	new ParseJSONUtil().createDataWithElementForRequest(resultElementSelected);
					ESignController.updateESignProperties(finalJson,eSignData).then(
							success => {
                 				destroyContainer && destroyContainer();
                 				
								if(success.success == true && success.data[0].dataelements.id != ""){
								 new ESignNotify().handler().addNotif({
					               // title: NLS.ESignPropertiesCreateSuccessMsg1+success.data[0].dataelements.name + NLS.ESignPropertiesCreateSuccessMsg2,
					                message: NLS.ESignPropertiesCreateSuccessMsg1+success.data[0].dataelements.ESignTitle + NLS.ESignPropertiesCreateSuccessMsg2,
					                level: 'success',
					                sticky: false
					            });
					            }
					            widget.eSignEvent.publish('esign-summary-append-rows', success.data[0].dataelements);
                			  	widget.eSignEvent.publish('esign-created', success.data[0].dataelements);
								      
							},
							failure =>{
								if(failure.error){
									new ESignNotify().handler().addNotif({
									level: 'error',
									message: failure.error,
					    			sticky: false
									});
									e.dsModel.disabled=false;
								}else{
									
									new ESignNotify().handler().addNotif({
									level: 'error',
									message: "Error in the Service call",
					    			sticky: false
									});
									e.dsModel.disabled=false;
								}
						});
					
				} ,   // end of method

		//new method start
		eSignPropertiesModify : function(eSignData,eSignProperties,container){
				
					// validation for title //
					if(!validateTitle(eSignProperties)) { 
						return;
					}
					if(!validateowner(eSignProperties)){
						return;
					}
					if(!validateAppSignMeaning(eSignProperties)){
						return;
					}
					if(!validateDisAppSignMeaning(eSignProperties)){
						return;
					}
					
					if(eSignData.model.PolicyOwner == eSignProperties.elements.ownerField.selectedItems._options.label){
						eSignProperties.elements.ownerField.selectedItems._options.value='';
					}
					var initiateJson = getParsedEditESignPropertiesModify(eSignData,eSignProperties); // DATA ELEMENTS json
					var resultElementSelected = [];
					var initModel = {
									'id' : eSignData.model.id,
									'dataelements':initiateJson
							};
					resultElementSelected.push(initModel);
					var finalJson=	new ParseJSONUtil().createDataWithElementForRequest(resultElementSelected);

					ESignController.modifyESignProperties(finalJson,eSignData).then(
							success => {
							
                 				//destroyContainer && destroyContainer(); 
                 				
								if(success.success == true && success.data[0].dataelements.id != ""){
								 new ESignNotify().handler().addNotif({
					               // title: NLS.ESignPropertiesUpdatedSuccessMsg,
					                message: NLS.ESignPropertiesUpdatedSuccessMsg,
					                level: 'success',
					                sticky: false
					            });
					             //ESignModel.updateRow(success.data[0].dataelements);
					             widget.eSignEvent.publish('esign-data-updated', success.data[0].dataelements);
					            }
					            
                			  	//widget.eSignEvent.publish('esign-created', success.data[0].dataelements);
							 	//ESignModel.appendRows(success);  
								     //widget.meetingEvent.publish('meeting-summary-update-properties',success);
							//Utils.getMeetingDataUpdated(meetingId);
								     //widget.meetingEvent.publish(agndaProperties.closeEventName);
								      
							},
							failure =>{
								if(failure.error){
									new ESignNotify().handler().addNotif({
									level: 'error',
									message: failure.error,
					    			sticky: false
									});
								}else{
									
									new ESignNotify().handler().addNotif({
									level: 'error',
									message: "Error in the Service call",
					    			sticky: false
									});
								}
						});
					
		 } //,  // end of method
		//new method end
		
		};
		
		let getParsedEditESignProperties = function(properties){
		var dataelements = {
				"ESignTitle" : properties.elements.title.value,
				"description": properties.elements.description.value,
				"policyOwnerDisplayLabel" : properties.elements.ownerField.selectedItems._options.label,
				"policyOwnerId" : properties.elements.ownerField.selectedItems._options.value,
				"policyOwnerName" : properties.elements.ownerField.selectedItems._options.name,
				"policyOwnerType" : properties.elements.ownerField.selectedItems._options.type,
				//"ownerFullName": properties.elements.ownerField.value,
				"ApprovalESignMeaning" : properties.elements.approvalSignMeaning.value,
				"ApprovalESignComment": properties.elements.esignAppComment.value[0],
				"DisApprovalESignMeaning" : properties.elements.disApprovalSignMeaning.value,
				"DisApprovalESignComment" : properties.elements.esignDisAppComment.value[0],
				"AuthorizationRequires": properties.elements.signType.value[0],
				"SignatureAppliedAs" : properties.elements.signApplied.value
			}
		return dataelements;
	};
	
	let getParsedEditESignPropertiesModify = function(data,properties){
		var loginUserName = widget.getValue("loginUserName");
		var esignUserGroupValue=widget.getValue("esign-userGroup");
		var policyOwnerId='';
		if(esignUserGroupValue != undefined && esignUserGroupValue != ""  && data.model.Owner == loginUserName){
			policyOwnerId=properties.elements.ownerField.selectedItems._options.value;
		}else if(esignUserGroupValue == undefined || esignUserGroupValue == "" ){
			policyOwnerId=properties.elements.ownerField.selectedItems._options.value;
		}else
		{
			policyOwnerId='';
		}
		var dataelements = {
		        "id":data.model.id,
		        "name":data.model.Name,
		        "owner":data.model.Owner,
				"ESignTitle" : properties.elements.title.value,
				"description": properties.elements.description.value,
				"policyOwnerDisplayLabel" : properties.elements.ownerField.selectedItems._options.label,
				"policyOwnerId" : policyOwnerId,
				"policyOwnerName" : properties.elements.ownerField.selectedItems._options.name,
				"policyOwnerType" : properties.elements.ownerField.selectedItems._options.type,
				"ApprovalESignMeaning" : properties.elements.approvalSignMeaning.value,
				"ApprovalESignComment": properties.elements.esignAppComment.value[0],
				"DisApprovalESignMeaning" : properties.elements.disApprovalSignMeaning.value,
				"DisApprovalESignComment" : properties.elements.esignDisAppComment.value[0],
				"AuthorizationRequires": properties.elements.signType.value[0],
				"SignatureAppliedAs" : properties.elements.signApplied.value
			}
		return dataelements;
	};
	
		
		let validateTitle = function(properties){
			// validation for title
					if(properties.elements.title.value.trim() == ""){
						new ESignNotify().handler().addNotif({
									level: 'error',
									//message: NLS.errorTitle,
									subtitle:NLS.errorTitle,
					    			sticky: false
									});
						return false;
					}
			return true;
		};
		
		let validateowner = function(properties){
			// validation for Owner
				if(properties.elements.ownerField.selectedItems == undefined || properties.elements.ownerField.selectedItems._options.value.trim() == ""){
						new ESignNotify().handler().addNotif({
									level: 'error',
									//message: NLS.errorOwner,
									subtitle:NLS.errorOwner,
					    			sticky: false
									});
						return false;
					}
			return true;
		};
		
		let validateAppSignMeaning = function(properties){
			// validation for Approval Sign Meaning
					if(properties.elements.approvalSignMeaning.value.trim() == ""){
						new ESignNotify().handler().addNotif({
									level: 'error',
									//message: NLS.errorAppSignMeaning,
									subtitle:NLS.errorAppSignMeaning,
					    			sticky: false
									});
						return false;
					}
			return true;
		};
		
		let validateDisAppSignMeaning = function(properties){
			// validation for Dis Approval Sign Meaning
					if(properties.elements.disApprovalSignMeaning.value.trim() == ""){
									new ESignNotify().handler().addNotif({
									level: 'error',
									//message: NLS.errorDisAppSignMeaning,
									subtitle:NLS.errorDisAppSignMeaning,
					    			sticky: false
									});
						return false;
						
						return false;
					}
			return true;
		};
		
		
		
		
return eSignUtil;
});


/**
 * 
 *
 */
define('DS/ENXESignConfigApp/View/HomeSplitView/ESignHomeSplitView',
    [   
        'DS/ENXESignConfigApp/Components/Wrappers/SplitViewWrapper',
        'DS/ENXESignConfigApp/Utilities/IdCardUtil',
        'DS/ENXESignConfigApp/View/IDCard/ESignIDCardView',
    ],
    function (SplitViewWrapper, IdCardUtil, ESignIDCardWrapper) {

        'use strict';
        var sView;
        var ESignHomeSplitView = function () { };
        /**
         * ESignHomeSplitView to show the right side slidein.
         * @param  {[Mediator]} applicationChannel [required:Mediator object for communication]
         *
         */
        ESignHomeSplitView.prototype.getSplitView = function (appChannel) {
            sView = new SplitViewWrapper();
            var split_options = {
                modelEvents: appChannel,
                withtransition: false,
                withoverflowhidden: false,
                params: {
                    // leftWidth calculates width and left position   
                    leftWidth: 25,
                    rightWidth: 75,
                    leftMinWidth: 25,
                    leftVisible: true,
                    rightVisible: false
                },
                rightMaximizer: false,
                leftMaximizer: false,
                resizable: true
                //mobileOptim: true
            };
            sView.init(split_options);
            //    sView.setContextForGesture();
            return sView;
        };

        ESignHomeSplitView.prototype.setSplitviewEvents = function (splitView) {
            var me = splitView;
            var selectedId = "";

            let rightPanel = me.getRightViewWrapper();


            //Uncomment when ID card is required
            // widget.eSignEvent.subscribe('esign-DataGrid-on-dblclick', function (data) {
            //     me.getRightViewWrapper().innerHTML = "<div>ID card</div>";
            //     let eSignIDCardWrapper = new ESignIDCardWrapper(rightPanel);
            //     eSignIDCardWrapper.init(data);
            //     me._showSide("right");
            //     //To show the details page in full view 
            //     me._hideLeft();
            //     // To persist the ID card collapse //
            //     IdCardUtil.collapseIcon();
            //     if (widget.getValue("propWidgetOpen")) {
            //         // To persist the edit prop widget open //
            //         //We no longer need it, because this event is getting published from append rows
            //         // widget.eSignEvent.publish('route-header-info-click', {model: data.model});
            //         IdCardUtil.infoIconActive();
            //     } else {
            //         // If any other right panel is opened close it //
            //         widget.eSignEvent.publish('esign-task-close-click-view-mode', { model: data.model });
            //         widget.eSignEvent.publish('esign-task-close-click-edit-mode', { model: data.model });
            //     }
            //     widget.eSignEvent.publish('esign-widgetTitle-update-withName', { model: data.model });
            // });

            widget.eSignEvent.subscribe('esign-back-to-summary', function (data) {
                widget.eSignEvent.publish('esign-triptych-show-toggle-button');
                if (!me._leftVisible) {
                    me._showSide("left");
                }
                if (me._rightVisible) {
                    me._hideSide("right");
                }
            });
            
              widget.eSignEvent.subscribe('esign-info-close-click', function (data) {
              if (me._rightVisible) {
            	  IdCardUtil.infoIconInActive();
                  me._hideSide("right");
                  widget.propWidgetOpen = false;
                }
          });
          
        };

        ESignHomeSplitView.prototype.getExistingHomeSplitView = function () {
            return sView;
        };

        ESignHomeSplitView.prototype.getExistingRightViewWrapper = function () {
            return sView.getRightViewWrapper();
        };


        return ESignHomeSplitView;

    });

/* global define, widget */
/**
 * @overview ESign Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXESignConfigApp/View/Dialog/ArchiveEsign', [
    'UWA/Core',
    'DS/ENXESignConfigApp/Controller/ESignBootstrap',
    'DS/Windows/Dialog',
    'DS/Windows/ImmersiveFrame',
    'DS/Controls/Button',
    'DS/ENXESignConfigApp/Utilities/ParseJSONUtil',
    'DS/ENXESignConfigApp/Model/ESignModel',
    'DS/ENXESignConfigApp/View/Grid/ESignSummaryDataGridView',
    'DS/ENXESignConfigApp/Actions/ESignActions',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'
],
    function (UWACore, ESignBootstrap, WUXDialog, WUXImmersiveFrame, WUXButton, ParseJSONUtil, ESignModel, DataGridView, ESignActions, NLS) {
        'use strict';
        let dialog;
        let archiveConfirmation = function (archiveDetails, actionFromIdCard) {
            if (archiveDetails.data === undefined) {
                // Route summary Toolbar Menu Delete Argument ids are not passed //
                archiveDetails = ESignModel.getSelectedRowsModel();
            }
            if (archiveDetails.data.length < 1) {
                widget.eSignNotify.handler().addNotif({
                    level: 'warning',
                    subtitle: NLS.ErrorEsignArchiveSelection,
                    sticky: false
                });
                return;
            }
            // fetch ids here //
            var idsToDelete = [];
            var ulCanDelete = UWA.createElement('ul', {
                "class": "",
                "styles": { "list-style-type": "circle" }
            });
            for (var i = 0; i < archiveDetails.data.length; i++) {
                idsToDelete.push(archiveDetails.data[i].options.grid.id);
                ulCanDelete.appendChild(UWA.createElement('li', {
                    "class": "",
                    "html": [
                        UWA.createElement('span', {
                            "class": "wux-ui-3ds wux-ui-3ds-1x "
                        }),
                        UWA.createElement('span', {
                            "html": "&nbsp;" + archiveDetails.data[i].options.grid.Name
                        })

                    ]
                }));
            }
            let immersiveFrame = new WUXImmersiveFrame();
            immersiveFrame.inject(document.body);
            let dialogueContent = new UWA.Element('div', {
                "id": "archiveEsignWarning",
                "class": ""
            });
            var header = "";
            if (idsToDelete.length > 0) {
                if (idsToDelete.length == 1) {
                    header = NLS.removeESignHeaderSingle
                } else {
                    header = NLS.removeESignHeader;
                }
                header = header.replace("{count}", idsToDelete.length);

                dialogueContent.appendChild(UWA.createElement('div', {
                    "class": "",
                    "html": NLS.removeESignWarning
                }));
                if (idsToDelete.length == 1) {
                    dialogueContent.appendChild(UWA.createElement('div', {
                        "class": "",
                        "html": NLS.removeESignWarningDetailSingle
                    }));
                } else {
                    dialogueContent.appendChild(UWA.createElement('div', {
                        "class": "",
                        "html": NLS.removeESignWarningDetail
                    }));
                }
                dialogueContent.appendChild(UWA.createElement('div', {
                    "class": ""
                }).appendChild(ulCanDelete));
            }
            var confirmDisabled = false;
            // if (idsCannotDelete.length > 0 && idsToDelete.length < 1) {
            //     confirmDisabled = true;
            // }
            dialog = new WUXDialog({
                modalFlag: true,
                width: 500,
                height: 200,
                title: header,
                content: dialogueContent,
                immersiveFrame: immersiveFrame,
                buttons: {
                    Ok: new WUXButton({
                        label: NLS.Delete,
                        disabled: confirmDisabled,
                        onClick: function (e) {
                            var button = e.dsModel;
                            var myDialog = button.dialog;
                            removeConfirmed(idsToDelete, actionFromIdCard);
                        }
                    }),
                    Cancel: new WUXButton({
                        onClick: function (e) {
                            var button = e.dsModel;
                            var myDialog = button.dialog;
                            myDialog.close();
                        }
                    })
                }
            });

            dialog.addEventListener("close", function (e) {
                if(_immersiveFrame!=undefined)
                    _immersiveFrame.destroy();
            });
        };

        let removeConfirmed = function (ids, actionFromIdCard) {
            ESignActions.archiveESign(ids, actionFromIdCard);
            dialog.close();
        }

        return {
            archiveConfirmation
        };

    });

define('DS/ENXESignConfigApp/View/Form/ESignProperitesView',
[
	'DS/Controls/LineEditor',
	'DS/Controls/Editor',
	'DS/Controls/Button',
	'DS/Controls/Toggle',
	'DS/Controls/Accordeon',
	'DS/Controls/ButtonGroup',
	'DS/Controls/ComboBox',
	'DS/Controls/DatePicker',
	'DS/TreeModel/TreeDocument',
	'DS/TreeModel/TreeNodeModel',
	"DS/Controls/SelectionChipsEditor",
	//'DS/ENXMeetingMgmt/Utilities/Utils',
	//'DS/ENXMeetingMgmt/View/Form/MeetingUtil',
	"DS/ENXESignConfigApp/View/Loader/NewOwnerChooser",
	'DS/ENXESignConfigApp/View/Form/ENOESignAutoComplete',
	'DS/ENXESignConfigApp/Utilities/SearchUtil',
	"DS/ENXESignConfigApp/View/Form/ESignUtil",
	 'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
	'css!DS/ENXESignConfigApp/ENXESignConfigApp.css' 
],
function (WUXLineEditor, WUXEditor, WUXButton, WUXToggle,WUXAccordeon, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		  TreeDocument, TreeNodeModel, SelectionChipsEditor,
		  //Utils, 
		 // MeetingUtil, 
		 NewOwnerChooser,ENOESignAutoComplete,SearchUtil,ESignUtil,
		  NLS) {    
	"use strict";
	let _eSignProperties = {};

	let build= function (data,container,mode) {
		if(!showView()){
			
			// Create the container in which all Meeting properties details will be rendered //
			_eSignProperties.elements = {};
			
			// Layout - Header Body Footer //
			_eSignProperties.formContainer = new UWA.Element('div', {id: 'ESignPropertiesContainer','class':'esignconfig-prop-container'});
			_eSignProperties.formContainer.inject(container);
			
			/*_meetingProperties.formHeader = new UWA.Element('div', {id: 'MeetingPropertiesHeader','class':'meeting-prop-header'});
			_meetingProperties.formHeader.inject(_meetingProperties.formContainer);*/
			_eSignProperties.formFields = new UWA.Element('div', {id: 'ESignPropertiesBody','class':'esignconfig-prop-body esignconfig-properties-form-field'});
			_eSignProperties.formFields.inject(_eSignProperties.formContainer);
			if(mode != "create"){
			_eSignProperties.formFooter = new UWA.Element('div', {id: 'ESignPropertiesFooter','class':'esignconfig-prop-footer'});
			_eSignProperties.formFooter.inject(_eSignProperties.formContainer);
			}
			var fieldRequired,fieldViewOnly,closeEventName;
			closeEventName = "esign-info-close-click";
			if(mode == "edit"){
				fieldRequired = "required";
				fieldViewOnly = "edit";  //false;		
			}else if(mode == "create"){
				fieldRequired = "required";
				fieldViewOnly = "create";	
			}
			else{
				// default to view only //
				fieldRequired = "";
				fieldViewOnly =  "view";    //true;
			}
			
	    
			// Body //
			//if(editButtonDisable){
			// header action - edit // 
				if(fieldViewOnly== 'view'){
					UWA.createElement('div',{
						"id" : "esignConfigEditButtonnId",
						"title" : NLS.Edit,
						"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-pencil fonticon-display fonticon-color-display",
						styles : {"font-size": "20px","float":"right"},
						events: {
			                click: function (event) {
			                	document.querySelector('#ESignPropertiesContainer').destroy();
			                	build(data,container,"edit");	
			                }
						}
					}).inject(_eSignProperties.formFields);
					
					var editButtonDisable=false;
					if(data.model != undefined && data.model.modifyAccess == 'TRUE'){
					 	//editButtonDisable=true;
					 	document.getElementById("esignConfigEditButtonnId").classList.remove('disabledDiv');
					}else {
						document.getElementById("esignConfigEditButtonnId").classList.add('disabledDiv');
					}
					
				}
			//} // if ends
		
			// Meeting Title //
			var titleDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
			if(fieldViewOnly== 'view'){
				new UWA.Element("h5", {"class":"", text: NLS.title}).inject(titleDiv);
				new UWA.Element("span", {text: data.model.ESignTitle}).inject(titleDiv);
			}else if(fieldViewOnly== 'create'){
				var labelTitle = new UWA.Element("h5", {"class":fieldRequired, text: NLS.title}).inject(titleDiv);
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelTitle);
				_eSignProperties.elements.title = new WUXLineEditor({
					placeholder: NLS.placeholderTitle,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					sizeInCharNumber: 45,
					maxlength: 127,
					value: "",
			    }).inject(titleDiv);
			    
			    _eSignProperties.elements.title.addEventListener('change', function(e) {				
					widget.eSignEvent.publish('create-esign-toggle-dialogbuttons', { properties : _eSignProperties});		
				});
			
			}
			else{
				var labelTitle = new UWA.Element("h5", {"class":fieldRequired, text: NLS.title}).inject(titleDiv);
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelTitle);

				if(data.model.ESignTitle == undefined){
					data.model.ESignTitle = "";
				}
				_eSignProperties.elements.title = new WUXLineEditor({
					placeholder: NLS.placeholderTitle,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					sizeInCharNumber: 45,
					maxlength: 127,
					value: data.model.ESignTitle,
			    }).inject(titleDiv);
			}
			
			// Owner start
			var loginUserName = widget.getValue("loginUserName");
			//widget.setValue("esign-userGroup","041E8256C9DA3800630C7EDB000E9722");
			var esignUserGroupValue=widget.getValue("esign-userGroup");
			if((esignUserGroupValue != undefined && esignUserGroupValue != "" && fieldViewOnly== 'create') || (esignUserGroupValue != undefined && esignUserGroupValue != "" && fieldViewOnly== 'edit' && data.model.Owner != loginUserName)){
				var ownerOptions={};
					ownerOptions.isMultiSearchMode = false;
					ownerOptions.placeHolderValue = NLS.searchOwnerPlaceHolder;
					ownerOptions.minLengthToType = 3;
					ownerOptions.isFreeInputAllowed = false;
					ownerOptions.toKeepSearchResultsFlag = false;
					ownerOptions.getPrecond = function () {
	                    return SearchUtil.getPrecondForOwnerContextSearch();
	                };
	              _eSignProperties.elements.ownerField=ENOESignAutoComplete.drawAutoCompleteComponent(ownerOptions);
	                
	              _eSignProperties.elements.ownerField._editor.elements.inputField.disabled=false;
	              var ownerNode;
								ownerNode = new TreeNodeModel(
									{	
		                                isSelected:true,
										label : "",
										value : esignUserGroupValue,
										name  : "",
										type:  "Group"
									});
				 _eSignProperties.elements.ownerField.selectedItems = ownerNode;
			
			}
			else if(data.model != undefined && fieldViewOnly== 'edit' && esignUserGroupValue != undefined && esignUserGroupValue != "" && data.model.Owner==loginUserName){ // else if starts
				var eSignOwnerDiv = new UWA.Element('div', {
					id: 'ownerId', class:""
				}).inject(_eSignProperties.formFields); 
				var labelAttr = new UWA.Element("h5", {"class":"required", text: NLS.policyOwner}).inject(eSignOwnerDiv);
				if(fieldRequired){
							UWA.createElement("div", {
								"class": "required-label-meetings fonticon fonticon-asterisk-alt"
							}).inject(labelAttr);
				}
				var searchOwnerDiv = new UWA.Element('div', {
							id: 'SearchOwnerField', class:"fonticon-chooser-display1"
						}).inject(eSignOwnerDiv); 
				var ownerOptions={};
						ownerOptions.isMultiSearchMode = false;
						ownerOptions.placeHolderValue = NLS.searchOwnerPlaceHolder;
						ownerOptions.minLengthToType = 3;
						ownerOptions.isFreeInputAllowed = false;
						ownerOptions.toKeepSearchResultsFlag = false;
						ownerOptions.getPrecond = function () {
		                    return SearchUtil.getPrecondForOwnerContextSearch();
		                };
		                _eSignProperties.elements.ownerField=ENOESignAutoComplete.drawAutoCompleteComponent(ownerOptions);
		                
		                _eSignProperties.elements.ownerField._editor.elements.inputField.disabled=false;
		                _eSignProperties.elements.ownerField.inject(searchOwnerDiv);
		                
		                new UWA.Element('div', {html:"&nbsp;"}).inject(searchOwnerDiv);
						_eSignProperties.elements.ownerChooser = new WUXButton({icon: {iconName: "search"}, disabled: false});
						_eSignProperties.elements.ownerChooser.inject(searchOwnerDiv);
					
						_eSignProperties.elements.ownerChooser.getContent().addEventListener('buttonclick', function(){			     
							//TaskViewUtil.launchAssigneeSearch(event,_taskProperties,_routeInfo,_taskGraphModel);
							NewOwnerChooser.init(event,_eSignProperties); 
						});	
						if(data.model != undefined){
							if(data.model.PolicyOwner != undefined && data.model.PolicyOwner != "" && (fieldViewOnly=='edit')){
									var ownerNode;
									if(data.model.PolicyOwnerType == 'Group' || data.model.PolicyOwnerType == 'Group Proxy'){
											if(data.model.PolicyOwner.indexOf('(User Group)') !== -1){
												data.model.PolicyOwner =data.model.PolicyOwner;
											}else{
												data.model.PolicyOwner =data.model.PolicyOwner+'(User Group)';
											}
									}
									ownerNode = new TreeNodeModel(
										{	
			                                isSelected:true,
											label : data.model.PolicyOwner,
											value : data.model.PolicyOwnerId,
											name  : data.model.PolicyOwnerName,
											type:  data.model.PolicyOwnerType
										});
									_eSignProperties.elements.ownerField.selectedItems = ownerNode;
									
							}
						}	
			
			} // else if ends
			else{
				//Owner
				var eSignOwnerDiv = new UWA.Element('div', {
					id: 'ownerId', class:""
				}).inject(_eSignProperties.formFields); 
				var labelAttr = new UWA.Element("h5", {"class":"required", text: NLS.policyOwner}).inject(eSignOwnerDiv);
				if(data.model != undefined && data.model.PolicyOwnerType != undefined && (data.model.PolicyOwnerType == 'Group' || data.model.PolicyOwnerType == 'Group Proxy')){
					if(data.model.PolicyOwner.indexOf('(User Group)') !== -1){
						data.model.PolicyOwner =data.model.PolicyOwner;
					}else{
					 	data.model.PolicyOwner =data.model.PolicyOwner+'(User Group)';
					}
				}
				if(fieldViewOnly== 'view'){
					new UWA.Element("span", {text: data.model.PolicyOwner}).inject(eSignOwnerDiv);
				}else{
						if(fieldRequired){
							UWA.createElement("div", {
								"class": "required-label-meetings fonticon fonticon-asterisk-alt"
							}).inject(labelAttr);
						}
				
					if(fieldViewOnly== 'create'){
					var searchOwnerDiv = new UWA.Element('div', {
							id: 'SearchOwnerField', class:"fonticon-chooser-display"
						}).inject(eSignOwnerDiv); 
					}else{
						var searchOwnerDiv = new UWA.Element('div', {
							id: 'SearchOwnerField', class:"fonticon-chooser-display1"
						}).inject(eSignOwnerDiv); 
					}	
						var ownerOptions={};
						ownerOptions.isMultiSearchMode = false;
						ownerOptions.placeHolderValue = NLS.searchOwnerPlaceHolder;
						ownerOptions.minLengthToType = 3;
						ownerOptions.isFreeInputAllowed = false;
						ownerOptions.toKeepSearchResultsFlag = false;
						ownerOptions.getPrecond = function () {
		                    return SearchUtil.getPrecondForOwnerContextSearch();
		                };
		                _eSignProperties.elements.ownerField=ENOESignAutoComplete.drawAutoCompleteComponent(ownerOptions);
		                
		                _eSignProperties.elements.ownerField._editor.elements.inputField.disabled=false;
		                _eSignProperties.elements.ownerField.inject(searchOwnerDiv);
		               if(fieldViewOnly== 'create'){ 
			                _eSignProperties.elements.ownerField.addEventListener('change', function(e) {				
								widget.eSignEvent.publish('create-esign-toggle-dialogbuttons', { properties : _eSignProperties});		
							});
		                }
		                new UWA.Element('div', {html:"&nbsp;"}).inject(searchOwnerDiv);
						_eSignProperties.elements.ownerChooser = new WUXButton({icon: {iconName: "search"}, disabled: false});
						_eSignProperties.elements.ownerChooser.inject(searchOwnerDiv);
					
						_eSignProperties.elements.ownerChooser.getContent().addEventListener('buttonclick', function(){
							NewOwnerChooser.init(event,_eSignProperties); 
						});
						if(data.model != undefined){
							if(data.model.PolicyOwner != undefined && data.model.PolicyOwner != "" && (fieldViewOnly=='edit')){
									var ownerNode;
									ownerNode = new TreeNodeModel(
										{	
			                                isSelected:true,
											label : data.model.PolicyOwner,
											value : data.model.PolicyOwnerId,
											name  : data.model.PolicyOwnerName,
											type:  data.model.PolicyOwnerType
										});
									_eSignProperties.elements.ownerField.selectedItems = ownerNode;
									
							}
						} //line 277 end
						
				  } //line 236 end
				//Owner end
			} // else block end
			
			// Description //
			var descDiv = new UWA.Element("div", {
				"id": "descId",
				"class": ""
			}).inject(_eSignProperties.formFields);
			var labelDesc = new UWA.Element("h5", {text: NLS.description}).inject(descDiv);
			
			if(fieldViewOnly=='view'){
				//new UWA.Element("span", {text: data.model.Description}).inject(descDiv);
				UWA.createElement('div',{
					  "class": "id-description",
					  "html":[
						  UWA.createElement('span',{
							  "html": data.model.Description,
							  "title": data.model.Description,
							  "class":""
						  	})
						  ]}).inject(descDiv);
				
			}else if(fieldViewOnly== 'create'){
			
				_eSignProperties.elements.description = new WUXEditor({
					placeholder: NLS.placeholderDescription,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: ""
			    }).inject(descDiv);
				
			}else{
				if(!data.model.Description){
					data.model.Description = "";
				}
				_eSignProperties.elements.description = new WUXEditor({
					placeholder: NLS.placeholderDescription,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: data.model.Description
			    }).inject(descDiv);
			}
			
			var appSignMeaningIdDiv = new UWA.Element("div", {
				"id": "appSignMeaningId",
				"class": ""
			}).inject(_eSignProperties.formFields);
			var labelAppSignMeaningIdDiv = new UWA.Element("h5", {text: NLS.ApprovalSignatureMeaning}).inject(appSignMeaningIdDiv);
			
			if(fieldViewOnly=='view'){
				//new UWA.Element("span", {text: data.model.ApprovalESignMeaning}).inject(appSignMeaningIdDiv);
				UWA.createElement('div',{
					  "class": "id-appSignMeaning",
					  "html":[
						  UWA.createElement('span',{
							  "html": data.model.ApprovalESignMeaning,
							  "title": data.model.ApprovalESignMeaning,
							  "class":""
						  	})
						  ]}).inject(appSignMeaningIdDiv);
				
			}else if(fieldViewOnly== 'create'){
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelAppSignMeaningIdDiv);
			
				_eSignProperties.elements.approvalSignMeaning = new WUXEditor({
					placeholder: NLS.placeholderApprovalSigMeaning,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: ""
			    }).inject(appSignMeaningIdDiv);
			    
			    _eSignProperties.elements.approvalSignMeaning.addEventListener('change', function(e) {				
					widget.eSignEvent.publish('create-esign-toggle-dialogbuttons', { properties : _eSignProperties});		
				});
				
			}else{
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelAppSignMeaningIdDiv);
				if(!data.model.ApprovalESignMeaning){
					data.model.ApprovalESignMeaning = "";
				}
				_eSignProperties.elements.approvalSignMeaning = new WUXEditor({
					placeholder: NLS.placeholderApprovalSigMeaning,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: data.model.ApprovalESignMeaning
			    }).inject(appSignMeaningIdDiv);
			}
			
			//Approval Siganture Meaning end
			
			//Approval ESignComment Start
			var appEsignCommentDiv = new UWA.Element("div", {
					"id": "signCommentId",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
			if(fieldViewOnly== 'view'){
				new UWA.Element("h5", {"class":"", text: NLS.appEsignComment}).inject(appEsignCommentDiv);
				new UWA.Element("span", {text: data.model.ApprovalESignComment}).inject(appEsignCommentDiv);
			}else if(fieldViewOnly== 'create'){
				var labelEsignComment = new UWA.Element("h5", {"class":fieldRequired, text: NLS.appEsignComment}).inject(appEsignCommentDiv);
				/*UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelEsignComment);*/
				_eSignProperties.elements.esignAppComment = new WUXButtonGroup({ type: "radio" });
				_eSignProperties.elements.esignAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG1, value: "Yes" }));
				_eSignProperties.elements.esignAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG2, value: "No",checkFlag: true}));
    			_eSignProperties.elements.esignAppComment.inject(appEsignCommentDiv);
			
			}
			else{
				var labelEsignComment = new UWA.Element("h5", {"class":fieldRequired, text: NLS.appEsignComment}).inject(appEsignCommentDiv);
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelEsignComment);

				if(data.model.ApprovalESignComment != undefined && data.model.ApprovalESignComment !="" ){
				_eSignProperties.elements.esignAppComment = new WUXButtonGroup({ type: "radio" });
					 if(data.model.ApprovalESignComment =='Yes'){
						_eSignProperties.elements.esignAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG1, value: "Yes",checkFlag: true }));
						_eSignProperties.elements.esignAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG2, value: "No"}));
					}else{
						_eSignProperties.elements.esignAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG1, value: "Yes" }));
						_eSignProperties.elements.esignAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG2, value: "No",checkFlag: true}))
					}
    			_eSignProperties.elements.esignAppComment.inject(appEsignCommentDiv);
					
				}
				// write logic ofr edit
				
				
			}
			
			// Approval ESignComment  End
			// Disapproval Signature Start
			var disAppSignMeaningIdDiv = new UWA.Element("div", {
				"id": "appSignMeaningId",
				"class": ""
			}).inject(_eSignProperties.formFields);
			var labelDisAppSignMeaningIdDiv = new UWA.Element("h5", {text: NLS.DisapprovalSignatureMeaning}).inject(disAppSignMeaningIdDiv);
			
			if(fieldViewOnly=='view'){
				//new UWA.Element("span", {text: data.model.DisApprovalESignMeaning}).inject(disAppSignMeaningIdDiv);
				UWA.createElement('div',{
					  "class": "id-dispApSignMeaning",
					  "html":[
						  UWA.createElement('span',{
							  "html": data.model.DisApprovalESignMeaning,
							  "title": data.model.DisApprovalESignMeaning,
							  "class":""
						  	})
						  ]}).inject(disAppSignMeaningIdDiv);
				
			}else if(fieldViewOnly== 'create'){
					UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelDisAppSignMeaningIdDiv);
				_eSignProperties.elements.disApprovalSignMeaning = new WUXEditor({
					placeholder: NLS.placeholderDisApprovalSigMeaning,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: ""
			    }).inject(disAppSignMeaningIdDiv);
				_eSignProperties.elements.disApprovalSignMeaning.addEventListener('change', function(e) {				
					widget.eSignEvent.publish('create-esign-toggle-dialogbuttons', { properties : _eSignProperties});		
				});
			}else{
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelDisAppSignMeaningIdDiv);
				if(!data.model.DisApprovalESignMeaning){
					data.model.DisApprovalESignMeaning = "";
				}
				_eSignProperties.elements.disApprovalSignMeaning = new WUXEditor({
					placeholder: NLS.placeholderDisApprovalSigMeaning,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: data.model.DisApprovalESignMeaning
			    }).inject(disAppSignMeaningIdDiv);
			}
			
			//Disapproval Siganture Meaning end
			//Disapproval ESignComment Start
			var disAppEsignCommentDiv = new UWA.Element("div", {
					"id": "signCommentId",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
			if(fieldViewOnly== 'view'){
				new UWA.Element("h5", {"class":"", text: NLS.appDisEsignComment}).inject(disAppEsignCommentDiv);
				new UWA.Element("span", {text: data.model.DisApprovalESignComment}).inject(disAppEsignCommentDiv);
			}else if(fieldViewOnly== 'create'){
				var labelDisAppEsignComment = new UWA.Element("h5", {"class":fieldRequired, text: NLS.appDisEsignComment}).inject(disAppEsignCommentDiv);
				
				_eSignProperties.elements.esignDisAppComment = new WUXButtonGroup({ type: "radio" });
				_eSignProperties.elements.esignDisAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG1, value: "Yes", checkFlag: true }));
				_eSignProperties.elements.esignDisAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG2, value: "No" }));
    			_eSignProperties.elements.esignDisAppComment.inject(disAppEsignCommentDiv);
			
			}
			else{
				var labelDisAppEsignComment = new UWA.Element("h5", {"class":fieldRequired, text: NLS.appDisEsignComment}).inject(disAppEsignCommentDiv);

				if(data.model.DisApprovalESignComment !=undefined && data.model.DisApprovalESignComment!= ""){
					
				_eSignProperties.elements.esignDisAppComment = new WUXButtonGroup({ type: "radio" });
				 if(data.model.DisApprovalESignComment =='Yes'){
				 	_eSignProperties.elements.esignDisAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG1, value: "Yes", checkFlag: true }));
					_eSignProperties.elements.esignDisAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG2, value: "No" }));
				 }else{
					_eSignProperties.elements.esignDisAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG1, value: "Yes" }));
				    _eSignProperties.elements.esignDisAppComment.addChild(new WUXToggle({ type: "radio", label: NLS.signCommentYesBG2, value: "No", checkFlag: true }));
    			}
    			_eSignProperties.elements.esignDisAppComment.inject(disAppEsignCommentDiv);
				}
				// write logic ofr edit
				
				
			}
			
			// Disapproval ESignComment  End
			
			//Signature Type start
			var signTypeDiv = new UWA.Element("div", {
					"id": "signTypeId",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
			if(fieldViewOnly== 'view'){
				new UWA.Element("h5", {"class":"", text: NLS.signatureType}).inject(signTypeDiv);
				if(data.model.AuthorizationRequires != undefined && data.model.AuthorizationRequires == 'Username Password'){
					new UWA.Element("span", {text: NLS.signTypeBG1 }).inject(signTypeDiv);
				}else if(data.model.AuthorizationRequires != undefined && data.model.AuthorizationRequires == 'Password')
				{
					new UWA.Element("span", {text: NLS.signTypeBG2 }).inject(signTypeDiv);
				}
				else{
					new UWA.Element("span", {text: data.model.AuthorizationRequires }).inject(signTypeDiv);
				}
			}else if(fieldViewOnly== 'create'){
				var labelSignType = new UWA.Element("h5", {"class":fieldRequired, text: NLS.signatureType}).inject(signTypeDiv);
				_eSignProperties.elements.signType = new WUXButtonGroup({ type: "radio" });
				_eSignProperties.elements.signType.addChild(new WUXToggle({ type: "radio", label: NLS.signTypeBG1, value: "Username Password", checkFlag: true }));
				_eSignProperties.elements.signType.addChild(new WUXToggle({ type: "radio", label: NLS.signTypeBG2, value: "Password" }));
    			_eSignProperties.elements.signType.inject(signTypeDiv);
			
			}
			else{
				var labelSignType = new UWA.Element("h5", {"class":fieldRequired, text: NLS.signatureType}).inject(signTypeDiv);

				if(data.model.AuthorizationRequires != undefined && data.model.AuthorizationRequires != "" ){
					_eSignProperties.elements.signType = new WUXButtonGroup({ type: "radio" });
					if(data.model.AuthorizationRequires == 'Username Password'){
					_eSignProperties.elements.signType.addChild(new WUXToggle({ type: "radio", label: NLS.signTypeBG1, value: "Username Password", checkFlag: true }));
					_eSignProperties.elements.signType.addChild(new WUXToggle({ type: "radio", label: NLS.signTypeBG2, value: "Password" }));
					}else{
					_eSignProperties.elements.signType.addChild(new WUXToggle({ type: "radio", label: NLS.signTypeBG1, value: "Username Password" }));
					_eSignProperties.elements.signType.addChild(new WUXToggle({ type: "radio", label: NLS.signTypeBG2, value: "Password", checkFlag: true }));
					}
    				_eSignProperties.elements.signType.inject(signTypeDiv);
				}
				// write logic ofr edit
				
				
			}
			

			// -----------------Sign Applied As -----------//
			var signAppliedDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
			if(fieldViewOnly== 'view'){
				new UWA.Element("h5", {"class":"", text: NLS.signatureAppliedAs}).inject(signAppliedDiv);
				new UWA.Element("span", {text: data.model.SignatureAppliedAs}).inject(signAppliedDiv);
			}else if(fieldViewOnly== 'create'){
				var labelsignApplied = new UWA.Element("h5", {"class":fieldRequired, text: NLS.signatureAppliedAs}).inject(signAppliedDiv);
				_eSignProperties.elements.signApplied = new WUXLineEditor({
					placeholder: NLS.placeholdersignApplied,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					sizeInCharNumber: 45,
					value: "",
			    }).inject(signAppliedDiv);
			
			}
			else{
				var labelsignApplied = new UWA.Element("h5", {"class":fieldRequired, text: NLS.signatureAppliedAs}).inject(signAppliedDiv);

				if(!data.model.SignatureAppliedAs){
					data.model.SignatureAppliedAs = "";
				}
				_eSignProperties.elements.signApplied = new WUXLineEditor({
					placeholder: NLS.placeholdersignApplied,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					sizeInCharNumber: 45,
					value: data.model.SignatureAppliedAs,
			    }).inject(signAppliedDiv);
			}
			//SignatureAppliedAs  End
			
			
		
			if(fieldViewOnly== 'view'){
				_eSignProperties.formFooter.style.display = "none";
			}
			
			else if(fieldViewOnly== 'edit'){
				// Save and Cancel button
				var cancelButtonDiv = new UWA.Element('div', 
						{
							id:"cancelButtonId",
							class:"agenda-save-float",
							events: {
			                click: function (event) {
			                	document.querySelector('#ESignPropertiesContainer').destroy();
			                	build(data,container,"view");
			                	}
							}
						}).inject(_eSignProperties.formFooter);
			_eSignProperties.elements.cancel = new WUXButton({ label: NLS.cancel, emphasize: "secondary" }).inject(cancelButtonDiv);
					new UWA.Element('div', {html:"&nbsp;"}).inject(cancelButtonDiv);
				// save button	
				var saveButtonDiv = new UWA.Element('div', 
						{
							id:"saveButtonId",
							class:"agenda-save-float"
						}).inject(_eSignProperties.formFooter);
					_eSignProperties.elements.save = new WUXButton({ label: NLS.save, emphasize: "primary" }).inject(saveButtonDiv);
					new UWA.Element('div', {html:"&nbsp;"}).inject(saveButtonDiv);
					
					_eSignProperties.elements.save.getContent().addEventListener('click', function(){
					ESignUtil.eSignPropertiesModify(data,_eSignProperties,container);	 // update to DB
					});
					
			}//else blockends
		
		}
	};
	
   let hideView= function(){
	        if(document.getElementById('ESignPropertiesContainer') != null){
	            document.getElementById('ESignPropertiesContainer').style.display = 'none';
	           
	        }
	};
	let getProperties = function(){
		    	return _eSignProperties;
		 };    
	let destroy = function(){
		_eSignProperties = {};
	};
		
	let showView= function(){
		  // if(document.querySelector('#ESignPropertiesContainer') != null){
		  //     document.getElementById('ESignPropertiesContainer').style.display = 'block';
		   //    return true;
		   //}
		   return false;
	};

	 let ESignProperitesView={
			 init : (data,container,mode) => { return build(data,container,mode);},
			 hideView: () => {hideView();},
			 getProperties: () => { return getProperties();},
			//build : (container,data,mode) => { return build(container,data,mode);},
			destroy : () => {return destroy();}
	 };
	 
	 return ESignProperitesView;
});

/* global define, widget */
/**
 * @overview Template Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXESignConfigApp/View/Dialog/ESignNewRevision', [
    'DS/WAFData/WAFData',
    'UWA/Core',
    'DS/Windows/Dialog',
    'DS/Windows/ImmersiveFrame',
    'DS/Controls/Button',
    'DS/ENXESignConfigApp/Actions/ESignActions',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'],
    function (WAFData, UWACore, WUXDialog, WUXImmersiveFrame, WUXButton, ESignActions, NLS) {
        'use strict';
        let dialog;

        const newESignRevisionConfirmation = function (options, actionFromIdCard) {

            if (Object.keys(options).length < 1) {
                widget.notify.handler().addNotif({
                    level: 'warning',
                    subtitle: NLS.ErrorESignReviseSelection, //TODO add NLS for new revision error
                    sticky: false
                });
                return;
            }
            let idToRevise = [];
            let confirmDisabled = false;
            let immersiveFrame = new WUXImmersiveFrame();
            immersiveFrame.inject(document.body);
            let dialogueContent = new UWA.Element('div', {
                "id": "reviseTemplateWarning",
                "class": ""
            });
            let header = NLS.reviseESignHeader + options.Name;

            if (options.id) {
                idToRevise.push(options.id);
                dialogueContent.appendChild(UWA.createElement('div', {
                    "class": "",
                    "html": NLS.reviseESignWarning
                }));
                dialogueContent.appendChild(UWA.createElement('div', {
                    "class": "",
                    "html": NLS.reviseESignWarningDetailSingle
                }));
                dialogueContent.appendChild(UWA.createElement('div', {
                    "class": ""
                }));

            } /*else{
        confirmDisabled = true;
        dialogueContent.appendChild(UWA.createElement('div',{
            "class":"",
            "html": NLS.reviseESignWarningDetail2Single
        }));
        dialogueContent.appendChild(UWA.createElement('div',{
            "class":""
      }));
        
    } */

            dialog = new WUXDialog({
                modalFlag: true,
                width: 500,
                height: 200,
                title: header,
                content: dialogueContent,
                immersiveFrame: immersiveFrame,
                buttons: {
                    Ok: new WUXButton({
                        label: NLS.Revise,
                        disabled: confirmDisabled,
                        onClick: function (e) {
                            let button = e.dsModel;
                            let myDialog = button.dialog;
                            reviseConfirmed(idToRevise, actionFromIdCard);
                        }
                    }),
                    Cancel: new WUXButton({
                        onClick: function (e) {
                            let button = e.dsModel;
                            let myDialog = button.dialog;
                            myDialog.close();
                        }
                    })
                }
            });

            dialog.addEventListener("close", function (e) {
                if(immersiveFrame != undefined)
                    immersiveFrame.destroy();
            });
        };

        const reviseConfirmed = function (id, actionFromIdCard) {
            ESignActions.reviseESign(id, actionFromIdCard).then(
                success => {

                    let successMsg = NLS.successRevise;
                    widget.eSignNotify.handler().addNotif({
                        level: 'success',
                        subtitle: NLS.successReviseMsg,
                        sticky: false
                    });
                },
                failure => {
                    try {
                        let response = typeof failure == 'string' ? JSON.parse(failure) : failure;
                        if (response.error) {
                            widget.eSignNotify.handler().addNotif({
                                level: 'error',
                                subtitle: response.error,
                                sticky: false
                            });
                        } else {
                            widget.eSignNotify.handler().addNotif({
                                level: 'error',
                                subtitle: NLS.errorRevise,
                                sticky: false
                            });
                        }
                    } catch (e) {
                        widget.eSignNotify.handler().addNotif({
                            level: 'error',
                            subtitle: NLS.errorRevise,
                            sticky: false
                        });
                    }
                });

            dialog.close();
        }

        return {
            newESignRevisionConfirmation
        };

    });

define('DS/ENXESignConfigApp/View/Dialog/ESignPolicyCreateDialog', [  
  'DS/Windows/Dialog',
  'DS/Windows/ImmersiveFrame',
  'DS/Controls/Button',
  'DS/ENXESignConfigApp/View/Form/ESignProperitesView',
  'DS/ENXESignConfigApp/View/Form/ESignUtil',
  'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
],
  function (
		  WUXDialog,
		  WUXImmersiveFrame,
		  WUXButton,
		  ESignProperitesView,ESignUtil,
		  NLS) {
	'use strict';
	let tabsContainer, _dialog, _buttonOKEnabled, _buttonApplyEnabled, _immersiveFrame, _defaultJSON = {};	
	let destroyContainer =  function () { 
		if(_immersiveFrame!=undefined){
			_immersiveFrame.destroy();
		}
		_dialog.destroy();
	};
	
	let InitiateDialog = function (contentData) {    	
    	let myContentContainer = new UWA.Element('div', {id :"CreateESignPolicy", class:"CreateESignPolicy" });
   	    ESignProperitesView.init(contentData,myContentContainer,"create");
   	    
   
  
    	_immersiveFrame = new WUXImmersiveFrame();
        _immersiveFrame.inject(document.body); 
        		         
		_dialog = new WUXDialog({
              title: NLS.newESignConfig,
              modalFlag: true,
              width:600,//to accomodate the filters
              height:500,
              content: myContentContainer,
              immersiveFrame: _immersiveFrame,
              resizableFlag : true,
              buttons: {
            	 Ok: new WUXButton({
            		  disabled: true,
            		  domId:"okButton",
            		  emphasize: "primary",
            		  label: NLS.createIcon,
            		  allowUnsafeHTMLLabel: true,
            		  onClick: function (e) {
            		  	 e.dsModel.disabled=true;
            			 let _properties = getPropertiesModel();
            			 ESignUtil.eSignPropertiesUpdate(e,contentData,_properties,destroyContainer);	 // update to DB
            		 }
            			                 		
                  }),
                  Cancel: new WUXButton({
                	  label: NLS.cancel,
                	  domId:"cancelButton",
                	  emphasize: "secondary",
                	  allowUnsafeHTMLLabel: true,
                	  onClick: function (e) {
                		  e.dsModel.dialog.close();    
                		  widget.setValue("isDialogOpened",false);
                	  }
                  })
                  
               // NOT REQUIRED END  
                                  
              }
    });// dialogbox end one
		 
	 registerDialogButtonEvents();

	_dialog.addEventListener("close", function (e) {
		if(_immersiveFrame!=undefined)
			_immersiveFrame.destroy();
		});

				
};

	let registerDialogButtonEvents = function(){
    	widget.eSignEvent.subscribe('create-esign-toggle-dialogbuttons', function () {
			let propertiesForm = getPropertiesModel();
		    		if(propertiesForm){
		    			//var formElements = propertiesForm.formFields.getChildren();
		        		var esignTitle = propertiesForm.elements.title.value;
		        		var esignPolOwnerFieldSel = propertiesForm.elements.ownerField.selectedItems;
		        		var esignAppMean = propertiesForm.elements.approvalSignMeaning.value;
		        		var esignDisAppMean = propertiesForm.elements.disApprovalSignMeaning.value;
		        		
		        		if(esignTitle.trim() !="" && esignPolOwnerFieldSel != undefined && esignPolOwnerFieldSel._options.value.trim() != "" && esignAppMean.trim() !="" && esignDisAppMean.trim() !="" ){
		        			_dialog.buttons.Ok.disabled = false;
		        			_buttonOKEnabled = true;
		        		}else{
		        			_dialog.buttons.Ok.disabled = true;
		        			_buttonOKEnabled = false;
		        		}
		               		
		    		}
			
    	}); // subscribe ends
    	
    	
	 }; //register events ends
	
	let getPropertiesModel = function(){
    	return ESignProperitesView.getProperties();
    	
    }

    let ESignPolicyCreateDialog={    		
    		InitiateESignPolicyCreateDialog: (contentIds) => {return InitiateDialog(contentIds);},
    		registerDialogButtonEvents: () => {return registerDialogButtonEvents();},
    		getDialog: () => {return _dialog;},
    		destroyContainer
    };

    return ESignPolicyCreateDialog;

  });

/**
 * 
 *//* global define, widget */
/**
 * @overview ESign Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXESignConfigApp/View/Form/ChangeOwnerContent', [
    'DS/Controls/Button',
    'DS/ENXESignConfigApp/Actions/ESignActions',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    'DS/Controls/LineEditor',
    'DS/Controls/Editor',
    "DS/ENXESignConfigApp/View/Loader/NewOwnerChooser",
    'DS/ENXESignConfigApp/View/Form/ENOESignAutoComplete',
    'DS/ENXESignConfigApp/Utilities/SearchUtil',
    'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'
],
    function (WUXButton, ESignActions, NLS, WUXLineEditor, Editor, NewOwnerChooser,ENOESignAutoComplete,SearchUtil) {
        'use strict';

        let _properties = {};

        const destroyContent = () => {
            _properties = {};
        };

        const changeOwnerConfirmation = (esignConfig, myContentContainer, destroyContainer, footerButtons = {}) => {


            let saveButtonDiv, cancelButtonDiv;
            _properties.formContainer = new UWA.Element('div', { id: 'ESignPropertiesContainer', 'class': 'change-owner-container' });
            _properties.formContainer.inject(myContentContainer);

            // Div to handle chooser selection.

            _properties.formFields = new UWA.Element('div', { id: 'ESignOwnerChangesBody', 'class': 'meeting-prop-body meeting-properties-form-field' });
            _properties.formFields.inject(_properties.formContainer);

            _properties.formFields.inject(_properties.formContainer);

            _properties.formFooter = new UWA.Element('div', { id: 'ESignOwnerChangeFooter', 'class': 'meeting-prop-footer' });
            if (!(footerButtons.footerSaveButton && footerButtons.footerCancelButton)) {
                _properties.formFooter.inject(_properties.formContainer);
            }

            _properties.ownerField = new UWA.Element('div', { id: 'SearchOwnerField', class: "fonticon-chooser-display" });
            _properties.elements = {};


            let labelAttr = new UWA.Element("h5", { "class": "required", text: NLS.changeOwner }).inject(_properties.formFields);
            UWA.createElement("div", {
                "class": "required-label-esign fonticon fonticon-asterisk-alt"
            }).inject(labelAttr);
/*
            _properties.elements.ownerField = new WUXLineEditor({
                placeholder: NLS.placeholderSearchContext,
                //requiredFlag: true,
                //pattern: "[a-z]+",
                contextObjectId: "",
                sizeInCharNumber: 30,
                displayClearFieldButtonFlag: true,
                disabled: true
            }).inject(_properties.ownerField);
            */
            var changeOwnerOptions = {}
            changeOwnerOptions.isMultiSearchMode = false;
            changeOwnerOptions.placeHolderValue = NLS.searchOwner;
            changeOwnerOptions.minLengthToType = 3;
            changeOwnerOptions.isFreeInputAllowed = false;
            changeOwnerOptions.toKeepSearchResultsFlag = false;
           
			changeOwnerOptions.getPrecond = function () {
	                    return SearchUtil.getPrecondForChangeOwnerSearch();
	         };
	         
            _properties.elements.ownerField=ENOESignAutoComplete.drawAutoCompleteComponent(changeOwnerOptions);
            _properties.elements.ownerField._editor.elements.inputField.disabled=false;
            _properties.elements.ownerField.inject(_properties.ownerField);

            var space = new UWA.Element('div', { html: "&nbsp;" });
            space.inject(_properties.ownerField);

            _properties.elements.taskOwnerChooser = new WUXButton({ icon: { iconName: "search" } });

            //DomUtils.generateIcon("find", { target: button1});
            _properties.elements.taskOwnerChooser.inject(_properties.ownerField);
            _properties.elements.taskOwnerChooser.getContent().addEventListener('buttonclick', function () {
                NewOwnerChooser.init(event, _properties,true);
            });

            _properties.ownerField.inject(_properties.formFields);

            // new UWA.Element("h5", { text: NLS.ownercomments }).inject(_properties.formFields);

            // _properties.elements.descField = new Editor({
            //     placeholder: NLS.enterOwnerComments,
            //     //pattern: "[a-z]+",                
            //     widthInCharNumber: 51,
            //     nbRows: 5,
            //     newLineMode: 'enter',
            // });
            // _properties.elements.descField.inject(_properties.formFields);


            if (!footerButtons.footerCancelButton) {
                cancelButtonDiv = new UWA.Element('div',
                    {
                        id: "cancelButtonId",
                        class: "agenda-save-float",
                    }).inject(_properties.formFooter);
                _properties.elements.cancel = new WUXButton({ label: NLS.cancel, emphasize: "secondary" }).inject(cancelButtonDiv);
                new UWA.Element('div', { html: "&nbsp;" }).inject(cancelButtonDiv);
            } else {
                _properties.elements.cancel = footerButtons.footerCancelButton
            }

            _properties.elements.cancel.getContent().addEventListener('click', function () {
                destroyContent()
                destroyContainer && destroyContainer()
            });

            if (!footerButtons.footerSaveButton) {
                saveButtonDiv = new UWA.Element('div',
                    {
                        id: "saveButtonId",
                        class: "agenda-save-float",
                    }).inject(_properties.formFooter);
                _properties.elements.save = new WUXButton({ label: NLS.save, emphasize: "primary" }).inject(saveButtonDiv);
                new UWA.Element('div', { html: "&nbsp;" }).inject(saveButtonDiv);
            } else {
                _properties.elements.save = footerButtons.footerSaveButton
            }

            _properties.elements.save.getContent().addEventListener('click', function () {
            /*
             const ownerDetails = _properties && _properties.elements && _properties.elements.ownerFieldDetails
                if (!(ownerDetails && ownerDetails.newOwnerName)) {
                    widget.eSignNotify.handler().addNotif({
                        level: 'error',
                        subtitle: NLS.selecPersonError,
                        sticky: true
                    })
                    return
                }
                if (esignConfig.Owner === ownerDetails.newOwnerName) {
                    widget.eSignNotify.handler().addNotif({
                        level: 'error',
                        subtitle: NLS.replace(NLS.chooseDifferentOwner, {
                            tag1: ownerDetails.newOwnerName
                        }),
                        sticky: true
                    })
                    return
                }
                */
                ESignActions.changeESignOwner(esignConfig, _properties, destroyContent, destroyContainer)
            })
        }

        return {
            changeOwnerConfirmation,
            destroyContent
        };

    });

define('DS/ENXESignConfigApp/Utilities/PlaceHolder',
    [
        'DS/ENXESignConfigApp/View/Dialog/ESignPolicyCreateDialog',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
    ],
    function (
        ESignPolicyCreateDialog, NLS
    ) {
        'use strict';

        let showEmptyESignPlaceholder = function (container, model) {

            let existingPlaceholder = container.getElement('.no-esigns-to-show-container');

            container.querySelector(".tile-view-container").setStyle('display', 'none');
            container.querySelector(".data-grid-container").setStyle('display', 'none');
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                widget.eSignEvent.publish('esign-back-to-summary');
                widget.eSignEvent.publish('esign-widgetTitle-count-update', { model: model });
                return existingPlaceholder;
            }

            // let filterButton = UWA.createElement('span', {
            //     'class': 'no-esigns-to-show-filter-shortcut fonticon fonticon-list-filter', 'title': NLS.filter
            // }) 
            let createButton = UWA.createElement('span', {
                'class': 'no-esigns-to-show-create-shortcut fonticon fonticon-plus', 'title': NLS.newESign
            });
            let placeholder = UWA.createElement('div', {
                'class': 'no-esigns-to-show-container',
                html: [UWA.createElement('div', {
                    'class': 'no-esigns-to-show',
                    html: [UWA.createElement('div', {
                        'class': 'pin',
                        html: '<span class="fonticon fonticon-5x fonticon-esign"></span>'
                    }), UWA.createElement('span', {
                        'class': 'no-esigns-to-show-label',
                        html: NLS.titles.placeholder.label
                    }), UWA.createElement('div', {
                        'class': 'no-esigns-to-show-sub-container',
                        html: UWA.createElement('span', {
                            html: NLS.replace(NLS.titles.placeholder.sub, {
                                create: createButton.outerHTML
                            })
                        })
                    })]
                })]
            });


            // The click events
            // placeholder.getElement('.no-esigns-to-show-filter-shortcut').addEventListener('click', function () {
            //     //Contexts.get('application').filter.elements.bar.getItem('Filter').elements.icon.click();
            //     let doc = document.querySelector(".widget-container");
            //     doc.getElementsByClassName("wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-list-filter wux-ui-3ds-lg")[0].click();

            // });
            placeholder.getElement('.no-esigns-to-show-create-shortcut').addEventListener('click', function (e) {
                ESignPolicyCreateDialog.InitiateESignPolicyCreateDialog({ model: model });
            });

            container.appendChild(placeholder);
            // If any other right panel is opened close it //
            widget.eSignEvent.publish('esign-back-to-summary');
            widget.eSignEvent.publish('esign-widgetTitle-count-update', { model: model });
        };

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
        let hideEmptyESignPlaceholder = function (container) {

            let placeholder = container.getElement('.no-esigns-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }

            container.querySelector(".tile-view-container").removeAttribute('style');
            container.querySelector(".data-grid-container").removeAttribute('style');
            // No more div
            placeholder.destroy();
            //container.querySelector(".no-esigns-to-show-container").setStyle('display', 'none');

        };

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */

        let showeErrorPlaceholder = function (container) {

            let existingPlaceholder = container.querySelector('.generic-error-container');

            if (container.querySelector(".tile-view-container")) {
                container.querySelector(".tile-view-container").setStyle('display', 'none');
            }
            if (container.querySelector(".data-grid-container")) {
                container.querySelector(".data-grid-container").setStyle('display', 'none');
            }
            if (container.querySelector("#dataGridDivToolbar")) {
                container.querySelector("#dataGridDivToolbar").setStyle('display', 'none');
            }

            if (existingPlaceholder !== null) {
                existingPlaceholder.removeAttribute('style');
                return;
            }

            let placeholder = UWA.createElement('div', {
                'class': 'generic-error-container',
                html: [UWA.createElement('div', {
                    'class': 'generic-error',
                    html: [UWA.createElement('span', {
                        'class': 'generic-error-label',
                        html: NLS.loading
                    })]
                })]
            });
            container.appendChild(placeholder);
        };

        let hideeErrorPlaceholder = function (container) {

            let placeholder = container.getElement('.generic-error-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }

            placeholder.setStyle('display', 'none');

        };


        let registerListeners = function () {
            widget.eSignEvent.subscribe('show-no-esign-placeholder', function (data) {
                showEmptyESignPlaceholder(document.querySelector(".widget-container"));
            });

            widget.eSignEvent.subscribe('hide-no-esign-placeholder', function (data) {
                hideEmptyESignPlaceholder(document.querySelector(".widget-container"));
            });


            widget.eSignEvent.subscribe('show-generic-error-placeholder', function (data) {
                showeErrorPlaceholder(document.querySelector(".widget-container"));
            });

        };

        return {
            hideEmptyESignPlaceholder,
            showEmptyESignPlaceholder,
            showeErrorPlaceholder,
            hideeErrorPlaceholder,
            registerListeners
        }
    });


define('DS/ENXESignConfigApp/View/Dialog/ChangeOwnerDialog', [
    'DS/Windows/Dialog',
    'DS/Windows/ImmersiveFrame',
    'DS/ENXESignConfigApp/View/Form/ChangeOwnerContent',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    'DS/Controls/Button'
],
    function (
        WUXDialog,
        WUXImmersiveFrame,
        ChangeOwnerContent,
        NLS,
        WUXButton) {
        'use strict';
        let _dialog, immersiveFrame;
        const destroyContainer = () => {
            if(immersiveFrame != undefined){
                immersiveFrame.destroy();
            }
            _dialog.destroy()
        }

        

        const initiateDialog = esignConfig => {

            const footerSaveButton = new WUXButton({ domId: 'saveButtonId' , label: NLS.save, emphasize: "primary" })
        
            const footerCancelButton = new WUXButton({ domId: 'cancelButtonId' , label: NLS.cancel, emphasize: "secondary" })

            const footerButtons = { footerSaveButton, footerCancelButton }

            let myContentContainer = new UWA.Element('div', { id: "ChangeESignOwnerContainer" });
            ChangeOwnerContent.changeOwnerConfirmation(esignConfig, myContentContainer, destroyContainer, footerButtons);

            immersiveFrame = new WUXImmersiveFrame();
            immersiveFrame.inject(document.body);

            let header = esignConfig.ESignTitle;
            header = header && (header.length > 40 ? header.substring(0, 37) + "..." : header);


            _dialog = new WUXDialog({
                title: header,
                modalFlag: true,
                width: 400,//to accomodate the filters
                height: 180,
                content: myContentContainer,
                immersiveFrame: immersiveFrame,
                resizableFlag: true,
                buttons: {
                    Save: footerSaveButton,
                    Cancel: footerCancelButton
                }
            });

            _dialog.addEventListener("close", function (e) {
                if(immersiveFrame!=undefined)
                    immersiveFrame.destroy();
            });
        };

        return {
            eSignChangeOwnerDialog: contentIds => initiateDialog(contentIds),
            getDialog: () => _dialog,
            destroyContainer
        };

    });

/* global define, widget */
/**
 * @overview Esign Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXESignConfigApp/View/Menu/ESignContextualMenu', [
    'DS/Menu/Menu',
    'DS/ENXESignConfigApp/View/Dialog/ArchiveEsign',
    // 'DS/ENXESignConfigApp/Services/LifeCycleServices',
    'DS/ENXESignConfigApp/Actions/ESignActions',
    'DS/ENXESignConfigApp/Model/ESignModel',
    'DS/ENXESignConfigApp/View/Dialog/ChangeOwnerDialog',
    'DS/ENXESignature/Views/Dialogs/ESignatureAuthDialog',
    'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    // 'DS/ENXESignConfigApp/Utilities/VersionFacetIntegration',
	'DS/ENXESignConfigApp/View/Dialog/ESignNewRevision',
	'DS/Windows/ImmersiveFrame',
	'DS/Windows/Dialog',
	'DS/Controls/Button',
    'css!DS/ENXESignConfigApp/ENXESignConfigApp.css'
],
    function (WUXMenu, ArchiveESign, //LifeCycleServices, 
    EsignActions, ESignModel, ChangeOwnerDialog,ESignatureAuthDialog,NLS, // VersionFacetIntegration, 
    ESignNewRevision,WUXImmersiveFrame,WUXDialog,WUXButton) {
        'use strict';
        let Menu;


        const esignGridRightClick = function (event, data) {
            // To handle multiple selection //
            // This will avoid unselecting the selected rows when click on actions //
            event.preventDefault();
            event.stopPropagation();
            const pos = event.target.getBoundingClientRect();
            const config = {
                position: {
                    x: pos.left,
                    y: pos.top + 20
                }
            };
            const selectedDetails = ESignModel.getSelectedRowsModel();
            let menu = [];
            const isPromoteDisabled = !data.promoteAccess
            const isLastElement = (data.id == data.lastphysicalid)
            //const isDemoteDisabled = !(data.demoteAccess && isLastElement)

            if (selectedDetails.data.length === 1) {
                // Single Selection //
                menu = menu.concat(openMenu(data));
                if (data.State == "Draft") {
                    menu = menu.concat(maturity(data, NLS.toActiveState, isPromoteDisabled, NLS.ActiveState));
                    menu = menu.concat(previewDialog(data, true));
                    menu = menu.concat(changeOwnerMenu(data));
                } else if (data.State == "Active") {
                    menu = menu.concat(maturity(data, NLS.toArchivedState, isPromoteDisabled, NLS.ArchivedState));
                    menu = menu.concat(previewDialog(data, false));
                    menu = menu.concat(changeOwnerMenu(data));
                } else {
                    menu = menu.concat(previewDialog(data, true));
                    //menu = menu.concat(maturity(data, NLS.toActiveState, isDemoteDisabled, NLS.ActiveState))
                }
                // menu = menu.concat(revisionsESignMenu(data));
                menu = menu.concat(newRevisionMenu(data, isLastElement));
                //menu = menu.concat(deleteMenu(selectedDetails, false, data));
                WUXMenu.show(menu, config);
            }
            
        };


        let maturity = function (data, displayValue, isDisabled, newState) {
            return {
                name: NLS.Maturity,
                title: displayValue,
                type: 'PushItem',
                state: isDisabled ? 'disabled' : '',
                fonticon: {
                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-collaborative-lifecycle-management'
                },
                data: null,
                action: {
                    callback: function () {
                        if (!isDisabled){
                            EsignActions.updateStateRequest(data, data.State, newState)
                        }
                    }
                }
            };
        };
        
        let previewDialog = function (data, isDisabled) {
            return {
                name: NLS.PreviewDialog,
                title: NLS.PreviewDialog,
                type: 'PushItem',
                state: isDisabled ? 'disabled' : '',
                fonticon: {
                    content: 'wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-eye'
                },
                data: data,
                action: {
                    callback: function () {
                        //LifeCycleServices.lifeCycle(data);
					        //dialog start 
					       		let _immersiveFrame = new WUXImmersiveFrame();
					        	_immersiveFrame.inject(document.body);
					        	
					              let _dialog = new WUXDialog({
							              title: NLS.PreViewESign,
							              modalFlag: true,
							              width:400,
							              height:100,
							              //content: myContentContainer,
							              immersiveFrame: _immersiveFrame,
							              resizableFlag : true,
							              buttons: {
							            	 Ok: new WUXButton({
							            		  //disabled: true,
							            		  domId:"okButton",
							            		  emphasize: "primary",
							            		  label: NLS.ApproveBtn,
							            		  allowUnsafeHTMLLabel: true,
							            		  onClick: function (e) {
							            		  	//e.dsModel.disabled=true;
							            		  	e.dsModel.dialog.close();
							            		  	 var  taskJsonObj=
							    					{
														"eSignPolicyReference" : data.Name,
														"Username" : widget.getValue("loginUserName"),
														"UserTimeZone" : "UTC",
														"x3dPlatformId" : widget.getValue("x3dPlatformId"),
														// "userSecurityContext" : widget.getValue("esign-userSecurityContext"),  
														"ObjectActionType":"Approve",
														"previewESign":true
							    					};
							
													var eventHandeler =  ESignatureAuthDialog.init(taskJsonObj); 
							
							            		 }
							            			                 		
							                  }),
							                  
							                  Apply: new WUXButton({
							            		  //disabled: true,
							            		  domId:"okButton",
							            		  emphasize: "primary",
							            		  label: NLS.DisApproveBtn,
							            		  allowUnsafeHTMLLabel: true,
							            		  onClick: function (e) {
							            		  	//e.dsModel.disabled=true;
							            		  	e.dsModel.dialog.close();
							            		  	 var  taskJsonObj=
							    					{
														"eSignPolicyReference" : data.Name,
														"Username" : widget.getValue("loginUserName"),
														"UserTimeZone" : "UTC",
														"x3dPlatformId" : widget.getValue("x3dPlatformId"),
														// "userSecurityContext" : widget.getValue("esign-userSecurityContext"),  
														"ObjectActionType":"Disapprove",
														"previewESign":true
							    					};
							
													var eventHandeler =  ESignatureAuthDialog.init(taskJsonObj); 
							
							            		 }
							            			                 		
							                  }),
							                  
							                  Cancel: new WUXButton({
							                	  label: NLS.cancel,
							                	  domId:"cancelButton",
							                	  emphasize: "secondary",
							                	  allowUnsafeHTMLLabel: true,
							                	  onClick: function (e) {
							                		  e.dsModel.dialog.close();    
							                	  }
							                  }) 
							                                  
							              }
					   				 });// dialogbox end one
					                      
					                //dialog end  
					                 _dialog.addEventListener("close", function (e) {
										if(_immersiveFrame!=undefined)
											_immersiveFrame.destroy();
									});       
                        
               		
                    }
                }
            };
        };

        // let getOpenWithMenu = function(data){
        //     let menu = [];
        //     return new Promise(function(resolve, reject) {
        //         MeetingOpenWithMenu.getOpenWithMenu(data).then(				
        //                 success => {
        //                     if(success && success.length > 0){
        //                         menu.push({
        //                             id:"OpenWith",
        //                             'type': 'PushItem',
        //                             'title': NLS.openWith,
        //                             icon: "export",
        //                             submenu:success
        //                         });
        //                     }
        //                     resolve(menu);  
        //                 },
        //                 failure =>{
        //                     resolve(menu);
        //                 });
        //     });	
        // };

        const isNotArchived = esign => {
            let canShow = true;
            if(esign.State == "ARCHIVED"){
                canShow = false;
            }
            return canShow;
        };

        const changeOwnerMenu = esign => {
            // Display menu
            let menu = [];
            if(isNotArchived(esign)) {
                menu.push({
                    name: NLS.changeOwner,
                    title: NLS.changeOwner,
                    type: 'PushItem',
                    fonticon: {
                        content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-user-change'
                    },
                    data: null,
                    action: {
                        callback: () => {  	
                            if (widget.data.propWidgetOpen) {
                                widget.eSignNotify.handler().addNotif({
                                    level: 'error',
                                    title: NLS.taskErrorOnChangeOwner,
                					subtitle: NLS.taskErrorOnChangeOwnerSub,
                                    sticky: false
                                });
                            } else {
                                ChangeOwnerDialog.eSignChangeOwnerDialog(esign);
                            }
                        }

                    }
                })
            }
            return menu;
        };

        const deleteMenu =  (removeDetails, actionFromIdCard, esign) => {
            // Display menu	
            let menu = [];
            if (isNotArchived(esign)) {
                menu.push({
                    name: NLS.Archive,
                    title: NLS.Archive,
                    type: 'PushItem',
                    fonticon: {
                        content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
                    },
                    data: null,
                    action: {
                        callback: function () {
                            ArchiveESign.archiveConfirmation(removeDetails, actionFromIdCard);
                        }
                    }
                });
            }

            return menu;
        };

        const esignTileRightClick = (data, id) => {

            const selectedDetails = ESignModel.getSelectedRowsModel();
            let menu = [];
            const isPromoteDisabled = !data.promoteAccess
            const isLastElement = (data.id == data.lastphysicalid)
            // const isDemoteDisabled = !(data.demoteAccess && isLastElement)

            if (selectedDetails.data.length === 1) {
                // Single Selection //
                menu = menu.concat(openMenu(data));
                if (data.State == "Draft") {
                    menu = menu.concat(maturity(data, NLS.toActiveState, isPromoteDisabled, NLS.ActiveState));
                    menu = menu.concat(previewDialog(data, true));
                    menu = menu.concat(changeOwnerMenu(data));
                } else if (data.State == "Active") {
                    menu = menu.concat(maturity(data, NLS.toArchivedState, isPromoteDisabled, NLS.ArchivedState));
                    menu = menu.concat(previewDialog(data, false));
                    menu = menu.concat(changeOwnerMenu(data));
                } else {
                    menu = menu.concat(previewDialog(data, true));
                    // menu = menu.concat(maturity(data, NLS.toActiveState, isDemoteDisabled, NLS.ActiveState))
                }
                // menu = menu.concat(revisionsESignMenu(data));
                menu = menu.concat(newRevisionMenu(data, isLastElement));
                
            }
            
            // menu = menu.concat(deleteMenu(selectedDetails, false, data));

            return menu;
        };

        let newRevisionMenu = function(revisionDetails, revisionAccess){
			// Display menu
			let showNewRevisionCmd =true;
            const revisionNLS = revisionAccess ? NLS.newRevision : NLS.alreadyRevised
            const isEnabled = revisionDetails.State == 'Draft' ? false : true
			let menu = [];
			if(showNewRevisionCmd){
				 menu.push({
		                name: NLS.newRevision,
		                title: revisionNLS,
		                type: 'PushItem',
                        state: (revisionAccess && isEnabled) ? '' : 'disabled',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-flow-line-add'
		                },
		                data: null,
		                action: {
		                    callback: function () {
                                ESignNewRevision.newESignRevisionConfirmation(revisionDetails);
		                    }
		                }
		            });
			}
           
            return menu;
		};
		
		// let revisionsESignMenu = function(revisionDetails){
		// 	// Display menu
		// 	let menu = [];
        //     menu.push({
        //         name: NLS.revision,
        //         title: NLS.revision,
        //         type: 'PushItem',
        //         fonticon: {
        //             content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-flow-branch-list'
        //         },
        //         data: null,
        //         action: {
        //             callback: function () {
        //                 VersionFacetIntegration.launchVersionControlApp(revisionDetails.id);
        //             }
        //         }
        //     });
		// 	return menu;
		// };

        const openMenu = Details => {
            let menu = [];
            menu.push({
                name: NLS.Open,
                title: NLS.Open,
                type: 'PushItem',
                fonticon: {
                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-open'
                },
                data: null,
                action: {
                    callback: function () {
                        widget.eSignEvent.publish('esign-DataGrid-on-dblclick', {model:Details});
                        // require(['DS/ENXESignConfigApp/View/Home/MeetingSummaryView'], function (MeetingSummaryView) {
                           // MeetingSummaryView.showHomeButton(true);
                        // });
                    }
                }
            });
            return menu;
        };

        const esignStateMenus = function (actions, id) {
            //nsm4 Display menu update with states
            let menu = [];
            if (!actions) {
                return menu;
            }

            //TODO NSM4

            return menu;
        };

        return {
            // meetingIdCardCheveron: (meetingDetails) => {return meetingIdCardCheveron(meetingDetails);},
            // meetingIdCardStateCheveron: (modifyAccess,data,reqType) => {return meetingIdCardStateCheveron(modifyAccess,data,reqType);},
            // meetingIdCardContextCheveron: (data) => {return meetingIdCardContextCheveron(data);},
            esignTileRightClick,
            esignStateMenus,
            esignGridRightClick,
            // meetingAgendaGridRightClick: (event,data) => {return meetingAgendaGridRightClick(event,data);}
        };
    }
);


define('DS/ENXESignConfigApp/View/Tile/ESignSummaryTileView',
        [
         "DS/WAFData/WAFData",
         "UWA/Core",
         "DS/ENXESignConfigApp/Components/Wrappers/WrapperTileView",
         'DS/ENXESignConfigApp/View/Menu/ESignContextualMenu',
         "DS/WebappsUtils/WebappsUtils",
         "DS/Core/PointerEvents",
         'DS/Tree/TreeDocument',
         'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
         ],
         function (WAFData,
                 UWA,
                 WrapperTileView,
                 ESignContextualMenu,
                 WebappsUtils,
                 PointerEvents,
                 TreeDocument,
                 NLS) {

    "use strict";

    let  _container, _model;
    /*
     * to build tile view
     * @params: model (mandatory) otherwise it will create an empty model
     */
    const build = model => {
        if(model){
            _model = model;
        }else{ //create an empty model otherwise TODO see if it's required
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        _container = UWA.createElement('div', {id:'TileViewContainer', 'class':'tile-view-container hideView'});
        let tileViewContainer = WrapperTileView.build(_model, _container, true); //true passed to enable drag and drop
        return tileViewContainer;
    };
    
    /*
     * to build Contextual menu on tile view
     * */

    const contexualMenuCallback = () => {    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': params => {
                    let menu = [];
                    if (params && params.cellInfos) {
                        if (params.cellInfos.cellModel) {

                            let selectedNode = _model.getSelectedNodes();
                            let data= selectedNode[0].options.grid;
                            
                            menu = ESignContextualMenu.esignTileRightClick(data);
                        }
                    }
                    return menu; 
                }

        }
    };
    
    
    /*
     * Exposes the below public APIs to be used
     */
    return {
            build,
            contexualMenuCallback, 
            destroy: () => _myResponsiveTilesView.destroy()
    };
});

/**
 * datagrid view for route summary page
 */
define('DS/ENXESignConfigApp/View/Home/ESignSummaryView',
    [
        'DS/ENXESignConfigApp/View/Grid/ESignSummaryDataGridView',
        'DS/ENXESignConfigApp/Components/Wrappers/WrapperDataGridView',
        'DS/ENXESignConfigApp/Components/Wrappers/WrapperTileView',
        'DS/ENXESignConfigApp/View/Tile/ESignSummaryTileView',
        'DS/ENXESignConfigApp/Controller/ESignBootstrap',
        'DS/ENXESignConfigApp/Model/ESignModel',
        'DS/ENXESignConfigApp/Utilities/PlaceHolder',
        'DS/ENXESignConfigApp/Controller/ESignController',
        'DS/Core/PointerEvents',
        'DS/ENXESignConfigApp/Utilities/Utils',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign',
    ], function (
        ESignSummaryDataGridView,
        WrapperDataGridView,
        WrapperTileView,
        ESignSummaryTileView,
        ESignBootstrap,
        ESignModel,
        PlaceHolder,
        ESignController,
        PointerEvents,
        Utils,
        NLS
    ) {

    'use strict';

    let _fetchESignSuccess = function (success) {
        ESignModel.createModel(success);
        // filterESignSummaryView(); 
        let containerDiv = drawESignSummaryView();
        // if (!widget.getValue("esign-userSecurityContext")) {
        //     showError(containerDiv);
        //     //TODO GDS5 : NLS needs to change
        //     widget.eSignNotify.handler().addNotif({
        //         title: NLS.errorCreateESignForRoleTitle,
        //         subtitle: NLS.errorCreateESignForRoleSubTitle,
        //         message: NLS.errorCreateESignForRoleMsg,
        //         level: 'warning',
        //         sticky: false
        //     });
        // } else {
            PlaceHolder.hideeErrorPlaceholder(containerDiv);
        // }
        return containerDiv;
    };

    let _fetchESignFailure = function (failure) {
        let containerDiv = document.querySelector(".widget-container");
        showError(containerDiv);

        var failureJson = '';
        try {
            failureJson = JSON.parse(failure);
        } catch (err) {
            //DO Nothing
        }

        if (failureJson.error) {
            widget.eSignNotify.handler().addNotif({
                level: 'error',
                subtitle: failureJson.error,
                sticky: false
            });
        } else {
            widget.eSignNotify.handler().addNotif({
                level: 'error',
                title:NLS.infoRefreshError,
                subtitle: NLS.eSignVerifyNWMsg,
                sticky: false
            });
        }
    };

    // let _openSingleESign = function () {
    //     //nsm4 implementation to display singe esign
    //     return false
    // };


    let build = function () {
        // let eSignId = _openSingleESign();
        // if (eSignId) { //To show single ESign
        //     return new Promise(function (resolve, reject) {
        //         ESignController.fetchESignById(eSignId).then(
        //             success => {
        //                 let containerDiv = _fetchESignSuccess(success);
        //                 resolve(containerDiv);
        //             },
        //             failure => {
        //                 _fetchESignFailure(failure);
        //             });
        //     });
        // } else { //To show all the ESigns
            return new Promise(function (resolve, reject) {
                ESignController.fetchAllESigns().then(
                    success => {
                        let containerDiv = _fetchESignSuccess(success);
                        resolve(containerDiv);
                    },
                    failure => {
                        _fetchESignFailure(failure);
                        reject()
                    });
            });
        // }
    };

    let showError = containerDiv => {
        if (!containerDiv) {
            containerDiv = new UWA.Element('div', { "class": "widget-container" });
            containerDiv.inject(widget.body);
        }
        PlaceHolder.hideEmptyESignPlaceholder(containerDiv);
        PlaceHolder.showeErrorPlaceholder(containerDiv);
    }

    let drawESignSummaryView = function (serverResponse) {
        var model = ESignModel.getModel();
        let datagridDiv = ESignSummaryDataGridView.build(model);
        //To add the Tile view summary list
        let tileViewDiv = ESignSummaryTileView.build(model);
        ESignSummaryTileView.contexualMenuCallback();
        registerListners();

        //get the toolbar
        let homeToolbar = ESignSummaryDataGridView.getGridViewToolbar();
        let container = document.querySelector(".widget-container");
        let containerDiv;
        if (!container) {
            containerDiv = new UWA.Element('div', { "class": "widget-container" });
        } else {
            containerDiv = container;
        }
        let toolBarContainer = UWA.createElement('div', { id: 'dataGridDivToolbar', 'class': 'toolbar-container' }).inject(containerDiv);
        homeToolbar.inject(toolBarContainer);
        datagridDiv.inject(containerDiv);
        tileViewDiv.inject(containerDiv);

        if (model.getChildren().length == 0) {
            PlaceHolder.showEmptyESignPlaceholder(containerDiv, model);
        } else {
            model.prepareUpdate();
            var count = 0;
            model.getChildren().forEach(node => { if (node._isHidden) count++; })
            model.pushUpdate();
            if (count == model.getChildren().length) {
                PlaceHolder.showEmptyESignPlaceholder(containerDiv, model);
            }
        }
        widget.eSignEvent.publish('esign-widgetTitle-count-update', { model });
        widget.setValue("loginUserName", ESignBootstrap.getLoginUser());
        PlaceHolder.registerListeners();
        return containerDiv;
    };

    let filterESignSummaryView = function () {
        var model = ESignModel.getModel();
        let selectedNode = model.getSelectedNodes();

        model.prepareUpdate();
        let count = 0;

        model.getChildren().forEach(node => { if (node._isHidden) count++; })
        model.pushUpdate();
        if (selectedNode.length == 0 || (document.querySelector(".right-container") && document.querySelector(".right-container").getStyle("width") == "0px")) {
            widget.eSignEvent.publish('esign-widgetTitle-count-update', { model });
        }

        let container = document.querySelector(".widget-container");
        if (container != null) {
            if (model.getChildren().length == count) {
                //TODO GDS5 
                PlaceHolder.showEmptyESignPlaceholder(container, model);
            } else {
                PlaceHolder.hideEmptyESignPlaceholder(container);
            }
        }
        Utils.refreshRightPanel("esignInfo", ESignModel);

    };

    let getFilterPreferences = function () {
        var pref = widget.getValue("esignfilters");
        // if (_openSingleESign()) {// while opening single meeting, select all the filters
        //     widget.setValue("esignfilters", ['Draft', 'Active']);
        //     return ['Draft', 'Active', 'Archived'];
        // }
        if (pref == undefined) {
            widget.setValue("esignfilters", ['Draft', 'Active']);
            return ['Draft', 'Active'];
        } else {
            return pref;//Array.from(new Set(pref)) ;
        }
    };

    /*
    * Registers events on both datagrid and tile view to:
    * 1. Open contextual menu on right click in any row
    * 2. Open the right panel showing ID card and route tabs
    * 
    * */
    let registerListners = function () {
        let dataGridView = WrapperDataGridView.dataGridView();
        //Dispatch events on dataGrid
        dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
        dataGridView.addEventListener('contextmenu', openContextualMenu);
        let tileView = WrapperTileView.tileView();
        //Dispatch events on tile view
    	dataGridView.getTreeDocument().getXSO().onAdd(onSelect);
    	dataGridView.getTreeDocument().getXSO().onRemove(deSelect);	
        tileView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
        addorRemoveEventListeners();

    };

    let addorRemoveEventListeners = function () {

        widget.eSignEvent.subscribe('esign-summary-append-rows', function (data) {
            let node = ESignModel.appendRows(data);
            ESignSummaryDataGridView.getDataGridInstance().ensureNodeModelVisible(node, true);
            node.select();
        });

        widget.eSignEvent.subscribe('esign-summary-show-message', function (message) {
            widget.eSignNotify.handler().addNotif(message.message);
        });

        widget.eSignEvent.subscribe('route-summary-delete-rows', function (index) {
            ESignModel.deleteRowModelByIndex(index);
        });
        widget.eSignEvent.subscribe('esign-summary-delete-row-by-ids', function (data) {
            if (data.model.length > 0) {
                ESignModel.deleteRowModelByIds(data.model);
            }
        });
        widget.eSignEvent.subscribe('esign-summary-delete-selected-rows', function () {
            ESignModel.deleteRowModelSelected();
        });
        widget.eSignEvent.subscribe('esign-data-updated', function (data) {
            ESignModel.updateRow(data);
            filterESignSummaryView();
        });
    };

    let onDoubleClick = function (e, cellInfos) {
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
            if (e.multipleHitCount == 2) {
                cellInfos.nodeModel.select(true);
                widget.eSignEvent.publish('esign-DataGrid-on-dblclick', { model: cellInfos.nodeModel.options.grid });           
            }
        }
    };


    let openContextualMenu = function (e, cellInfos) {
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
            if (e.button == 2) {
                require(['DS/ENXESignConfigApp/View/Menu/ESignContextualMenu'], function (ESignContextualMenu) {
                    ESignContextualMenu.esignGridRightClick(e, cellInfos.nodeModel.options.grid);
                });
            }
        }
    };
    
    let onSelect = function(e, cellInfos){
		//when any row is selected
		 Utils.refreshRightPanel("esignInfo", ESignModel);
		
	};
	
	let deSelect = function(e, cellInfos){
		//when any row is unselected
		Utils.refreshRightPanel("esignInfo", ESignModel);
	};
	

    let destroy = function () {
        ESignModel.destroy();
    };

    let activateInfoIcon = function(){
		Utils.activateInfoIcon(ESignSummaryDataGridView);
	};
	
	let inActivateInfoIcon = function(){
		Utils.inActivateInfoIcon(ESignSummaryDataGridView);
	};

    return {
        build,
        getFilterPreferences,
        destroyAndRedrawwithFilters: () => { filterESignSummaryView(); },
        destroy,
        activateInfoIcon,
		inActivateInfoIcon
    };
});

/**
 * This file is a wrapper file to create toolbars in the app. Currently not being used
 */

define('DS/ENXESignConfigApp/Actions/Toolbar/ESignSummaryToolbarActions',
    ['DS/ENXESignConfigApp/View/Grid/ESignSummaryDataGridView',
        'DS/ENXESignConfigApp/View/Home/ESignSummaryView',
        'DS/ENXESignConfigApp/Model/ESignModel'
    ], function (ESignSummaryDataGridView, ESignSummaryView, ESignModel) {

        'use strict';

        var service = Object.create(null);
        service.currentView = "Grid";
        service.previousView = "Grid";


        // var applyfilterView = (view, option) => {
        //     var viewIcon = ESignSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");

        //     var append = true;
        //     if (view.type == "owner") {
        //         if (view.filter == "owned") {
        //             if (viewIcon.options.grid.data.menu[0].state == "selected") {
        //                 viewIcon.options.grid.data.menu[0].state = "unselected";
        //                 append = false;
        //             } else {
        //                 viewIcon.options.grid.data.menu[0].state = "selected";
        //             }
        //         } else if (view.filter == "assigned") {
        //             if (viewIcon.options.grid.data.menu[1].state == "selected") {
        //                 viewIcon.options.grid.data.menu[1].state = "unselected";
        //                 append = false;
        //             } else {
        //                 viewIcon.options.grid.data.menu[1].state = "selected";
        //             }
        //         }

        //         ESignSummaryView.updateFilterPreferences(view.filter, append);
        //         ESignSummaryView.destroyAndRedrawwithFilters();
        //         // highligting the selected filter

        //         if (viewIcon && viewIcon.options.grid.semantics.icon.iconName != "list-ok") {
        //             viewIcon.updateOptions({
        //                 label: "list-ok"
        //             });
        //         }
        //         //when initial load false then only call the service
        //         if (option == false && option != undefined) {
        //             // refesh the view with active CA
        //             //          setTimeout(function(){
        //             //            require(['DS/ENOChgActionGridUX/scripts/View/ChgDataGridLayout'], function (ChgDataGridLayout) {
        //             //              //refresh the grid
        //             //              var that=this;
        //             //              var outerDiv = document.getElementById("outer-ca-div");
        //             //            //  Mask.mask(outerDiv);
        //             //              ChgDataGridLayout.ChglayoutModel.empty();
        //             //              //Mask.unmask(outerDiv);
        //             //              var toolbarDiv = document.querySelector(".toolbar-ca-div");
        //             //                            var progressbar = new WUXProgressBar({
        //             //                              displayStyle: "lite",
        //             //                              value: 2,
        //             //                              domId : "progBar"
        //             //                            }).inject(toolbarDiv, 'top');
        //             //
        //             //                            // add non-index data
        //             //                            enoviaServerCAWidget.indexMode = "false";
        //             //
        //             //                            var options={"filterView":"activeca"};
        //             //                            ChgDataGridLayout.refreshGrid(null, null, progressbar,options);
        //             //
        //             //                            // add index-data
        //             //                            enoviaServerCAWidget.indexMode = "true";
        //             //                            ChgDataGridLayout.refreshGrid(null, null, progressbar,options);
        //             //            });
        //             //          }, 100);
        //         }

        //     } else if (view.type == "state") {
        //         var viewIcon = ESignSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");
        //         var append = true;
        //         if (view.filter == "completed") {
        //             if (viewIcon.options.grid.data.menu[5].state == "selected") {
        //                 viewIcon.options.grid.data.menu[5].state = "unselected";
        //                 append = false;
        //             } else {
        //                 viewIcon.options.grid.data.menu[5].state = "selected";
        //             }
        //             view.filter = "Complete";
        //         } else if (view.filter == "todo") {
        //             if (viewIcon.options.grid.data.menu[4].state == "selected") {
        //                 viewIcon.options.grid.data.menu[4].state = "unselected";
        //                 append = false;
        //             } else {
        //                 viewIcon.options.grid.data.menu[4].state = "selected";
        //             }
        //             view.filter = "In Process";
        //         } else if (view.filter == "draft") {
        //             if (viewIcon.options.grid.data.menu[3].state == "selected") {
        //                 viewIcon.options.grid.data.menu[3].state = "unselected";
        //                 append = false;
        //             } else {
        //                 viewIcon.options.grid.data.menu[3].state = "selected";
        //             }
        //             view.filter = "Define";
        //         }

        //         ESignSummaryView.updateFilterPreferences(view.filter, append);
        //         ESignSummaryView.destroyAndRedrawwithFilters();

        //         //this.currentView = "inactiveCA";

        //         // highligting the selected filter

        //         if (viewIcon && viewIcon.options.grid.semantics.icon.iconName != "list-delete") {
        //             viewIcon.updateOptions({
        //                 label: "list-delete"
        //             });
        //         }
        //         var that = this;
        //     }
        // };

        var openPropertiesView = d => {
            let data = ESignModel.getSelectedRowsModel();
            if (data.data.length == 1) { //info should be displayed if there is only 1 item selected.
                let model = data.data[0].options.grid;
                data.model = model;
            }
            //First check if the info panel is already open, if already open then close the panel
            if (widget.getValue("propWidgetOpen")) {
                widget.eSignEvent.publish('esign-info-close-click', { info: "ESign" });
            } else if (data.data.length > 1) {
                widget.eSignEvent.publish('esign-header-info-click', { info: "ESign", multiRowSelect: true });
            } else if(data.data.length == 0) {
                widget.eSignEvent.publish('esign-header-info-click', { info: "ESign", noRowSelect: true });
            } else {
                widget.eSignEvent.publish('esign-header-info-click', { model: data.model, info: "ESign" });
            }

        };

        return {
            // changeOwnerFilter: (d) => applyfilterView(d),
            // changeStateFilter: (d) => applyfilterView(d),
            openPropertiesView: (d) => openPropertiesView(d)
        };
    });

/**
 * Responsible for esign widget home page layout
 */

define('DS/ENXESignConfigApp/Components/Wrappers/ESignApplicationFrame',
    [
        'DS/Core/Core',
        'DS/ENXESignConfigApp/Components/Wrappers/TriptychWrapper',
         'DS/ENXESignConfigApp/Utilities/IdCardUtil',
         'DS/ENXESignConfigApp/View/Info/RightPanelInfoView',
          'DS/ENXESignConfigApp/View/Home/ESignSummaryView',
          //'DS/ENXESignConfigApp/View/Panels/WelcomePanel',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
    ],

    function (Core, TriptychWrapper, IdCardUtil, RightPanelInfoView, ESignSummaryView, /*WelcomePanel,*/ NLS) {
        'use strict';
        var ESignApplicationFrame = function () {
        };

        ESignApplicationFrame.prototype.init = function (modelEvent, mainContainer, welcomePanelContent, middleContent, rightContent) {
            this._applicationChannel = modelEvent;
            this._leftContent = welcomePanelContent;
            this._middleContent = middleContent;
            this._rightContent = rightContent;
            this._mainContainer = mainContainer;
            this._initDom();
        };

        ESignApplicationFrame.prototype._initDom = function () {
            this._content = document.createElement('div');
            this._content.classList.add('esign-panel');
            this._mainContainer.classList.add('esign-content');
            this._content.appendChild(this._mainContainer);

            this._triptychWrapper = new TriptychWrapper();

            /*//Required if adding toolbar
            let pageToolbarOptions = {
                    withInformationButton : false,
                    withWelcomePanelButton : true,
                    isWelcomePanelCollapsed : false, //TODO need to fetch from cache
                    container : this._middleContent,
                    triptychManager :  this._triptychWrapper.triptychManager,
                    modelEvents : this._applicationChannel
                    //appCore : this.appCore
                };
            this.pageToolbar = new RouteHomePageTopBar();
            this.pageToolbar.initialize(pageToolbarOptions);*/

            let wOptions = {};
            wOptions.modelEvents = this._applicationChannel;
            wOptions.leftContainer = this._leftContent;

            //Uncomment below while not using welcome panel NSM4
            // this._eSignWCPanel = new WelcomePanel(wOptions);
            // let esignWCPanelOptions = this._eSignWCPanel.getWPanelOptions();
            // this._eSignWCPanel.registerEvents();

            //Comment below while using welcome panel NSM4
            this._eSignWCPanel = "";
            let esignWCPanelOptions = undefined;
            

            this._triptychWrapper.init(this._applicationChannel, this._mainContainer, this._leftContent, this._middleContent, this._rightContent, this._eSignWCPanel, esignWCPanelOptions);
            //main TODO check if below code is required
            this._middleContainer = document.createElement('div');
            this._middleContainer.classList.add('esign-content-wrapper');

            this._applicationContent = document.createElement('div');
            this._applicationContent.classList.add('esign-content-wrapper');
            this._middleContainer.appendChild(this._applicationContent);

            if (this._middleContent && this._middleContent._container) {
                this._applicationContent.appendChild(this._middleContent._container);
            }
            //todo nsm4
            this._subscribeEvents();
             this._subscribeRightPanelEvents();
            this.__mobileBreakpoint = this._triptychWrapper._triptych.__mobileBreakpoint;
        };

         ESignApplicationFrame.prototype._subscribeRightPanelEvents = function () {
             this._listRightPanelSubscription = [];
             var that = this;
             let rightPanelInfoView = new RightPanelInfoView(that._rightContent);
             rightPanelInfoView.destroyEditPropWidget();
             let triptychManager = that._triptychWrapper._getTriptych();

             that._listRightPanelSubscription.push(that._applicationChannel.subscribe({ event: 'esign-header-info-click' }, function (data) {
                 if (that._content.clientWidth < that.__mobileBreakpoint) {
                     // Publish the event to make sure if the task panel is open we clear the task panel open flag //
                     // This will avoid the scenario where we open the task panel first, then esign prop widget, close prop widget and open the task panel again//
                     if (!(data.multiRowSelect || data.noRowSelect)) {
                        widget.eSignEvent.publish("esign-task-close-click-view-mode");
                        widget.eSignEvent.publish("esign-task-close-click-edit-mode");
                        ESignSummaryView.activateInfoIcon();
                        IdCardUtil.infoIconActive();
                     }
                     
                     rightPanelInfoView.init(data,"esignInfo");
                     /*if(data && data.model){
                         rightPanelInfoView.init(data,"esignInfo");
                     }else{
                         //show empty panel
                         rightPanelInfoView.init(data,"emptyInfo");
                     }*/
                     if (!(data.multiRowSelect || data.noRowSelect)) {
                        that._applicationChannel.publish({ event: 'triptych-show-panel', data: 'right' });
                        widget.setValue("propWidgetOpen",true);
                     }
                 }
             }));


             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-info-close-click', function (data) {
                if (triptychManager._isRightOpen) {
                     ESignSummaryView.inActivateInfoIcon();
                     IdCardUtil.infoIconInActive();	
                     that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'right' });
                     widget.setValue("propWidgetOpen",false);
                 }
             }));

             // To handle Task panel open and close in view mode and edit mode //
             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-task-open-click-view-mode', function (data) {
                 // when we open the task right panel, the info icon should not be highlighted //
                 IdCardUtil.infoIconInActive();
                 ESignSummaryView.inActivateInfoIcon();
                 rightPanelInfoView.init(data,"taskActionMode");
                 widget.setValue("propWidgetOpen",false);
                 that._applicationChannel.publish({ event: 'triptych-show-panel', data: 'right' });

             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-task-open-click-edit-mode', function (data) {
                 // when we open the task right panel, the info icon should not be highlighted //
                 IdCardUtil.infoIconInActive();
                 ESignSummaryView.inActivateInfoIcon();
                 rightPanelInfoView.init(data,"taskEditMode");
                 widget.setValue("propWidgetOpen",false);
                 that._applicationChannel.publish({ event: 'triptych-show-panel', data: 'right' });

             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-task-close-click-view-mode', function (data) {
                 if (triptychManager._isRightOpen && !widget.getValue("propWidgetOpen")) {
                     that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'right' });
                 }
             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-DataGrid-on-dblclick', function (data) {
                 that._isDetailsPageOpened = true;
                 if (triptychManager._isLeftOpen) {
                     that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'left' });
                 }
                 widget.eSignEvent.publish('esign-header-info-click', data);
                 //widget.eSignEvent.publish('esign-triptych-hide-toggle-button');
             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-task-close-click-edit-mode', function (data) {
                 if (triptychManager._isRightOpen && !widget.getValue("propWidgetOpen")) {
                     that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'right' });
                 }
             }));

             //To handle content panel open and close in edit prop widget //
             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-content-preview-click', function (data) {
                 // when we open the content right panel, the info icon should not be highlighted //
                 IdCardUtil.infoIconInActive();
                 ESignSummaryView.inActivateInfoIcon();
                 // Publish the event to make sure if the task panel is open we clear the task panel open flag //
                 // This will avoid the scenario where we open the task panel first, then esign prop widget, close prop widget and open the task panel again//
                 widget.eSignEvent.publish("esign-task-close-click-view-mode");
                 widget.eSignEvent.publish("esign-task-close-click-edit-mode");
                 rightPanelInfoView.init(data,"contentPreview");
                 widget.setValue("propWidgetOpen",false);
                 widget.contentPreviewId = data.model.id;
                 that._applicationChannel.publish({ event: 'triptych-show-panel', data: 'right' });

             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-content-preview-delete', function (data) {
                 if (triptychManager._isRightOpen) {
                     if(data.model.ids.includes(widget.contentPreviewId)){
                         that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'right' });
                     }
                 }
             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-content-preview-close', function (data) {
                 if (triptychManager._isRightOpen) {
                     that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'right' });
                 }
             }));

             that._listRightPanelSubscription.push(widget.eSignEvent.subscribe('esign-back-to-summary', function (data) {
                 that._isDetailsPageOpened = false;
                 /*if (triptychManager._isRightOpen) {
                     that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'right' });
                     widget.propWidgetOpen = false;
                 }*/
             }));
         };


        ESignApplicationFrame.prototype._subscribeEvents = function () {
            this._listSubscription = [];
            var that = this;
            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'triptych-show-panel' }, function (data) {
                if (that._content.clientWidth < that.__mobileBreakpoint) {
                    //  that._topbar.classList.add('hide');
                    that._mainContainer.classList.add('full-height');
                }
            }));
            //triptych-panel-hidden
            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'triptych-panel-hide-started' }, function (data) {
                if (that._content.clientWidth < that.__mobileBreakpoint) {
                    that._mainContainer.classList.remove('full-height');
                }
                // When conflict panel is hidden or closed (right panel)
                that._applicationChannel.publish({ event: 'model-conflict-panel-closed' })
            }));

            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'triptych-entering-mobile' }, function () {
                that._mainContainer.classList.remove('full-height');
            }));

            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'triptych-resized' }, function (sidesize) {
                if (sidesize.side === 'right') {
                    var width = sidesize.width;
                }
                //Hack to hide left panel (wc panel) if the details page is opened
                if (sidesize.side === 'left') {
                    if (that._isDetailsPageOpened) {
                        that._applicationChannel.publish({ event: 'triptych-hide-panel', data: 'left' });
                    }
                }
            }));


            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'triptych-leaving-mobile' }, function () {
                // that._topbar.classList.remove('hide');
                that._mainContainer.classList.remove('full-height');
            }));

             that._listSubscription.push(that._applicationChannel.subscribe({ event: 'esign-triptych-hide-toggle-button' }, function () {
                  let toggleButton = that._mainContainer.querySelector(".triptych-wp-toggle-btn");
                  toggleButton.classList.add('esign-toggle-hide');
              }));

             that._listSubscription.push(that._applicationChannel.subscribe({ event: 'esign-triptych-show-toggle-button' }, function () {
                 let toggleButton = that._mainContainer.querySelector(".triptych-wp-toggle-btn");
                 toggleButton.classList.remove('esign-toggle-hide');
                 that._applicationChannel.publish({ event: 'triptych-show-panel', data: 'left' });
             }));

            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'welcome-panel-collapsed' }, function () {
                let toggleButton = that._mainContainer.querySelector(".triptych-wp-toggle-btn");
                if (toggleButton) toggleButton.title = NLS.homeRightPanelExpand;
            }));

            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'welcome-panel-expanded' }, function () {
                let toggleButton = that._mainContainer.querySelector(".triptych-wp-toggle-btn");
                if (toggleButton) toggleButton.title = NLS.homeRightPanelCollapse;
            }));

            that._listSubscription.push(that._applicationChannel.subscribe({ event: 'triptych-clicked-overlay' }, function (data) {
                if (data == "left") {
                    let toggleButton = that._mainContainer.querySelector(".triptych-wp-toggle-btn");
                    if (toggleButton) toggleButton.title = NLS.homeRightPanelExpand;
                }
                if (data == "right") {
                    // Publish the event to make sure if the task panel is open we clear the task panel open flag //
                    // This will avoid the scenario where we open the task panel, then click on the overlay which will close the task panel, and then if we click on task again it will show the error message//
                    widget.eSignEvent.publish("esign-task-close-click-view-mode");
                    widget.eSignEvent.publish("esign-task-close-click-edit-mode");
                }
            }));
        };

        ESignApplicationFrame.prototype.inject = function (parentElement) {
            parentElement.appendChild(this._content);
        };

        ESignApplicationFrame.prototype.destroy = function () {
            this._content = null;
        };

        ESignApplicationFrame.prototype.setTooltipForExpandCollapse = function () {
            let toggleButton = this._mainContainer.querySelector(".triptych-wp-toggle-btn");
            if (toggleButton) toggleButton.title = NLS.homeRightPanelCollapse;
        };

        /*    ESignApplicationFrame.prototype.showWelcomePanel = function () {
                let triptychManager = this._triptychWrapper._getTriptych();
                if (!triptychManager._isLeftOpen) {
                    this._applicationChannel.publish({
                        event: "triptych-show-panel",
                        data: "left"
                    });
                }
                this._applicationChannel.publish({
                    event: "triptych-set-size",
                    data: {
                        size: 300,
                        side: "left"
                    }
                });
            };*/


        return ESignApplicationFrame;
    });

/**
 * 
 *//* global define, widget */
/**
 * @overview ESign
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 2.0.
 * @access private
 */

define('DS/ENXESignConfigApp/View/Widget/InitializeSummaryDetails', [
    'UWA/Class/Promise',
    'UWA/Core',
    'DS/ENXESignConfigApp/Components/Wrappers/ESignApplicationFrame',
    'DS/Windows/ImmersiveFrame',
    'DS/ENXESignConfigApp/View/HomeSplitView/ESignHomeSplitView'],
    function (Promise, UWA, ESignApplicationFrame, WUXImmersiveFrame, ESignHomeSplitView) {
        'use strict';
        var container = null;

        const initComponent = async options => {

            let renderContainer = options && options.container
            let containerDiv = null, CurrentSummaryView, activity = {}
            activity.id = "esigns";
            return new Promise(
                function (resolve , reject) {
                    require(['UWA/Core',
                        'DS/ENXESignConfigApp/View/Home/ESignSummaryView'],
                        function (UWAModule, ESignSummaryView) {
                            CurrentSummaryView = ESignSummaryView;
                            ESignSummaryView.build().then(
                                function (container) {
                                    containerDiv = container;
                                    resolve();
                                },
                                function (error) {
                                    reject(error);
                                }
                            );
                        }
                    );
                }).then(function () {

                    return new Promise(function (resolve, reject) {
                        widget.setValue("propWidgetOpen", false)
                        let mainContainer = UWA.createElement('div', { 'id': 'esign-main-div', 'styles': { 'height': '100%' } });

                        let middleDetailsContainer = new ESignHomeSplitView().getSplitView(widget.eSignEvent.getEventBroker());
                        new ESignHomeSplitView().setSplitviewEvents(middleDetailsContainer);
                        middleDetailsContainer.getLeftViewWrapper().appendChild(containerDiv);
                        //welcome panel container
                        let leftContainer = UWA.createElement('div', { 'id': 'esign-wc-panel', 'styles': { 'height': '100%', } }).inject(mainContainer);

                        //Information panel container
                        let rightContainer = UWA.createElement('div', { 'id': 'esign-right-panel', 'styles': { 'height': '100%' } });

                        //initialize triptych
                        let eSignApplicationFrame = new ESignApplicationFrame();
                        eSignApplicationFrame.init(widget.eSignEvent.getEventBroker(), mainContainer, leftContainer, middleDetailsContainer.getContent(), rightContainer);

                        container = new WUXImmersiveFrame();
                        container.setContentInBackgroundLayer(mainContainer);
                        container.reactToPointerEventsFlag = false;
                        renderContainer && container.inject(renderContainer);

                        widget.eSignEvent.publish("esign-welcome-panel-activity-selection", { id: activity.id });


                        resolve();
                    });
                });
        }

        return { initComponent };
    });

/**
 * 
 *//* global define, widget */
/**
 * @overview ESign
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 2.0.
 * @access private
 */

 define('DS/ENXESignConfigApp/View/CustomContainer/ESignConfigInit', [
        'UWA/Core',
        'DS/ENXESignConfigApp/Components/ESignEvent',
        'DS/ENXESignConfigApp/Components/ESignNotify',
        'DS/Windows/ImmersiveFrame',
        'DS/ENXESignConfigApp/View/Widget/InitializeSummaryDetails',
        'DS/Windows/Dialog',
        'DS/Controls/Button',
        'DS/ENXESignConfigApp/Controller/ESignBootstrap',
        'UWA/Class/Promise',
        'i18n!DS/ENXESignConfigApp/assets/nls/ENXESign'
    ],
    function (UWA, ESignEvent, ESignNotify, WUXImmersiveFrame, InitializeSummaryDetails, WUXDialog, WUXButton, ESignBootstrap, Promise, NLS) {
        'use strict';

        const createDefaultDialog = frame => {

            let _dialog, immersiveFrame;

            const destroyContainer = () => {
                if(immersiveFrame != undefined){
                    immersiveFrame.destroy();
                }
                _dialog.destroy()
            }

            const footerCancelButton = new WUXButton({ domId: 'closeButtonId' , label: NLS.CloseDialog, emphasize: "secondary", onClick: destroyContainer })

            const configDialogContainer = new UWA.Element('div', { id: "ESignConfigDialogContainer" });

            immersiveFrame = frame || new WUXImmersiveFrame();
            immersiveFrame.inject(document.body);

            let header = NLS.EsignConfigWindowHeader;

            _dialog = new WUXDialog({
                title: header,
                modalFlag: true,
                width: 900,//to accomodate majority of the columns
                height: 500,
                content: configDialogContainer,
                immersiveFrame: immersiveFrame,
                resizableFlag: true,
                buttons: {
                    Cancel: footerCancelButton
                }
            });
            
            _dialog.addEventListener("close", function (e) {
                if(immersiveFrame!=undefined)
                    immersiveFrame.destroy();
            });

            return {
                configDialogContainer,
                destroyContainer
            }
        };

        const init = (data = {}, container) => {

        	if(typeof widget == 'undefined') {
				window.widget = {data:{}}
                widget.setValue = (id, value) => widget[id] = value
                widget.getValue = id => widget[id]
			}
            let { x3dPlatformId, userSecurityContext, userGroup } = data
            let appContainer = null;
            if (container instanceof Element || container instanceof HTMLDocument) {
                appContainer = container
            } else if (typeof container == typeof new WUXImmersiveFrame()) {
                const { configDialogContainer } = createDefaultDialog(container)
                appContainer = configDialogContainer
            } else {
                const { configDialogContainer } = createDefaultDialog()
                appContainer = configDialogContainer
            }

            widget.eSignNotify = new ESignNotify(); 
            widget.eSignEvent = new ESignEvent();
            widget.setValue("x3dPlatformId", x3dPlatformId);
            // widget.setValue("esign-userSecurityContext", userSecurityContext);
            userGroup && widget.setValue("esign-userGroup", userGroup);

            return new Promise((resolve, reject) => {
                ESignBootstrap.start({})
                    .then(() => InitializeSummaryDetails.initComponent({ container: appContainer })
                        .then(() => resolve(), () => reject())
                    );
            })
        }

        return { init };
    });

/**
 * 
 *//* global define, widget */
/**
 * @overview ESign
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 2.0.
 * @access private
 */

define('DS/ENXESignConfigApp/View/Widget/ESignConfigWidgetInit', [
    'UWA/Class',
    'UWA/Class/Promise',
    'DS/ENXESignConfigApp/Components/ESignEvent',
    'DS/ENXESignConfigApp/Components/ESignNotify',
    'DS/ENXESignConfigApp/View/Home/ESignSummaryView',
    'DS/ENXESignConfigApp/View/Widget/InitializeSummaryDetails'],
    function (Class, Promise, ESignEvent, ESignNotify, ESignSummaryView, InitializeSummaryDetails) {
        'use strict';
        let container = null;
        const Application = Class.extend({
            name: 'ESign',
            /**
             * See UWA documentation.
             * @inheritDoc
             */
            onLoad: function () {

                //initialize the Notification to enable the alert messages
                widget.eSignNotify = new ESignNotify();

                //initialize the ESignEvent to enable interactions among components
                widget.eSignEvent = new ESignEvent(); //setting channel as global for communication between components

                //initialize widget preferences
                //initialize the component only after tenant and security contexts information are saved in widget.
                //ESignWidgetUtil.init().then(() => InitializeSummaryDetails({ container: widget.body }));
            },

            onRefresh: function () {
                
                return new Promise(function(resolve) {
                    ESignSummaryView.destroy();
                    if(container!=null){
                        container.destroy();
                    }
                    widget.eSignEvent.destroy();
                    widget.eSignEvent = new ESignEvent();
                    //ESignWidgetUtil.registerWidgetTitleEvents();
                    resolve();
                }).then(function() {
                    return InitializeSummaryDetails({ container: widget.body });
                });
            }

        });

        return Application;
    });

