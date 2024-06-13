/**
 * MeetingEvent Component - handling interaction between components for smooth async events
 *
 */
define('DS/ENXMeetingMgmt/Components/MeetingEvent',
['DS/Core/ModelEvents'],
function(ModelEvents) {

    'use strict';
    var _eventBroker = null;
    var meetingEvent = function () {
        // Private variables
        _eventBroker= new ModelEvents();
    };

    /**
     * publish a topic on given channels in param, additional data may go along with the topic published
     * @param  {[type]} eventTopic [description]
     * @param  {[type]} data       [description]
     *
     */
    meetingEvent.prototype.publish = function (eventTopic, data) {
          _eventBroker.publish({ event: eventTopic, data: data }); // publish from ModelEvent
    };

    /**
    *
    * Subscribe to a topic
    * @param {string} eventTopic the topic to subcribe to
    * @param {function} listener the function to be called when the event fires
    * @return {ModelEventsToken}             a token to use when you want to unsubscribe
    */
    meetingEvent.prototype.subscribe = function (eventTopic, listener) {
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
    meetingEvent.prototype.subscribeOnce = function(eventTopic, listener) {
    	return _eventBroker.subscribeOnce({ event: eventTopic }, listener);
    };

    /**
     * Unsubscribe to a topic
     * @param  {[type]} token [description]
     *
     */
    meetingEvent.prototype.unsubscribe = function (token) {
        _eventBroker.unsubscribe(token);
    };

    meetingEvent.prototype.getEventBroker = function(){
      return _eventBroker;
    };

    meetingEvent.prototype.destroy = function(){
      _eventBroker.destroy();
    };



   return meetingEvent;

});

/*
 * @module 'DS/ENORouteMgmt/Config/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route summary datagrid view
 */

define('DS/ENXMeetingMgmt/Config/Toolbar/MeetingAgendaTabToolbarConfig',
  ['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
  function ( NLS) {
	let MeetingDataGridViewToolbar;
 /*   _viewData =  {
    		menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,
                  state: "selected",
                  fonticon: {
                      family:1,
                      content:"wux-ui-3ds wux-ui-3ds-view-list"
                    },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"AgendaSummary"
                      }
                    },
                  tooltip:NLS.gridView
                }
              ]              
    };*/

  
	  let writetoolbarDefination = function (model,massupdate,_meetingInfoModel) {
		  let defination = {};
			let entries = [];
			var modifyAccess = true;
			if(_meetingInfoModel && _meetingInfoModel.model.ModifyAccess == "FALSE") {
				
				modifyAccess = false;
			}
			let deleteDisabledFlag = !modifyAccess;
			if (_meetingInfoModel && _meetingInfoModel.model.state.toLowerCase()==="in progress") {
				deleteDisabledFlag = true;
			}
			let visibilityFlag = true;
			let disabledFlag = !modifyAccess;
			//if(modifyAccess && !massupdate || massupdate == "false"){
			if(!massupdate || massupdate == "false"){
				entries.push({
	                 "id": "createAgenda",
	                 "dataElements": {
	                   "typeRepresentation": "functionIcon",
	                   "icon": {
	                       "iconName": "plus",
	                       fontIconFamily: WUXManagedFontIcons.Font3DS
	                     }
	                 },
	                 "action": {
	                     module: 'DS/ENXMeetingMgmt/Actions/MeetingAgendaActions', //TODO dummy method and function
	                     func: 'createAgendaDialog',
	                   },
	                 "position": "far",
	                 "category": "create",
	                 "tooltip": NLS.newAgenda,
					 "visibleFlag": visibilityFlag,
					 "disabled": disabledFlag
	               });
				entries.push({
	                 "id": "deleteAgenda",
	                 "dataElements": {
	                   "typeRepresentation": "functionIcon",
	                   "icon": {
	                       "iconName": "trash",
	                       fontIconFamily: WUXManagedFontIcons.Font3DS
	                     }
	                 },
	                 "action": {
	                     module: 'DS/ENXMeetingMgmt/View/Dialog/RemoveAgendaItems', //TODO dummy method and function
	                     func: 'removeConfirmation',
	                   },
	                 "position": "far",
	                 "category": "delete",
	                 "tooltip": NLS.Delete,
	                 "visibleFlag": visibilityFlag,
					 "disabled": deleteDisabledFlag
	               });
				/* entries.push({
	                 "id": "massupdateSequence",
	                 "dataElements": {
	                   "typeRepresentation": "functionIcon",
	                   "icon": {
	                       "iconName": "pencil",
	                       fontIconFamily: WUXManagedFontIcons.Font3DS
	                     }
	                 },
	                 "action": {
	                     module: 'DS/ENXMeetingMgmt/Actions/MeetingAgendaActions', //TODO dummy method and function
	                     func: 'massupdateSequence',
	                   },
	                 "position": "far",
	                 "category": "massupdate",
	                 "tooltip": NLS.massupdateSequence
	               
	             });*/
			}
			 
			 
			/*if(modifyAccess && massupdate == "true") {
				entries.push({
	                 "id": "massupdateOkButton",
	                 "dataElements": {
	                   "typeRepresentation": "functionIcon",
	                   "icon": {
	                       "iconName": "status-ok",
	                       fontIconFamily: WUXManagedFontIcons.Font3DS
	                     }
	                 },
	                 "action": {
	                     module: 'DS/ENXMeetingMgmt/Actions/MeetingAgendaActions', //TODO dummy method and function
	                     func: 'processMassUpdate',
	                   },
	                 "position": "far",
	                 "category": "massupdateOk",
	                 "tooltip": NLS.massupdateOk
	               });
				 
				 entries.push({
	                 "id": "massupdateCancelButton",
	                 "dataElements": {
	                   "typeRepresentation": "functionIcon",
	                   "icon": {
	                       "iconName": "status-ko",
	                       fontIconFamily: WUXManagedFontIcons.Font3DS
	                     }
	                 },
	                 "action": {
	                     module: 'DS/ENXMeetingMgmt/Actions/MeetingAgendaActions', //TODO dummy method and function
	                     func: 'cancelMassUpdate',
	                   },
	                 "position": "far",
	                 "category": "massupdateKO",
	                 "tooltip": NLS.massupdateKO
	               
	             });
			}*/
		     defination.entries = entries;      
       	     return JSON.stringify(defination);
	    }
	
    MeetingDataGridViewToolbar = {
    		writetoolbarDefination: (model,massupdate,_meetingInfoModel) => {return writetoolbarDefination(model,massupdate,_meetingInfoModel);},
    		destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return MeetingDataGridViewToolbar;
  });

/*
 * @module 'DS/ENORouteMgmt/Config/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route summary datagrid view
 */

define('DS/ENXMeetingMgmt/Config/Toolbar/MeetingAttachmentTabToolbarConfig',
  ['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
  function ( NLS) {
	let MeetingDataGridViewToolbar, 
    _viewData =  {
    		menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,
                  state: "selected",
                  fonticon: {
                      family:1,
                      content:"wux-ui-3ds wux-ui-3ds-view-list"
                    },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"AttachmentTab"
                      }
                    },
                  tooltip:NLS.gridView
                },
                {
                  type:'CheckItem',
                  title: NLS.tileView,
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-small-tile"
                  },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"AttachmentTab"
                      }
                    },
                  tooltip:NLS.tileView
                }
              ]              
    };

    let writetoolbarDefination = function (model) {
      let modifyAccess = model.meetingModel.ModifyAccess;
      let deleteAccess = model.meetingModel.DeleteAccess;
      let maturityState = model.meetingModel.Maturity_State;
      let entries = [];
      let defination = {};
      
      //if(modifyAccess=="TRUE"){
      entries.push({
		     "id": "addAttachment",
		      "dataElements": {
		         "typeRepresentation": "functionIcon",
		         "icon": {
		        		"iconName": "plus",
		        		 fontIconFamily: WUXManagedFontIcons.Font3DS
		        		},
		        		"action": {
		        		"module": "DS/ENXMeetingMgmt/Actions/AttachmentActions",
		        		"func": "onSearchClick"
		        		}
		        	},
		        	"position": "far",
		        	"category": "create",
		             "tooltip": NLS.addExistingAttachment   		
		 }); 
        //}
        
         //if(modifyAccess=="TRUE"){
         entries.push({
             "id": "deleteAttachment",
             "dataElements": {
               "typeRepresentation": "functionIcon",
               "icon": {
                   "iconName": "trash",
                   fontIconFamily: WUXManagedFontIcons.Font3DS
                 },
                 "action": {
                     "module": "DS/ENXMeetingMgmt/View/Dialog/RemoveAttachment",  
                     "func": "removeConfirmation"
                   }
             },
             "position": "far",
             "category": "action",
             "tooltip": NLS.Remove 
           });
          // }
           
           entries.push({
	           "id": "view",
	           "className": "attachmentViews",
	           "dataElements": {
	               "typeRepresentation": "viewdropdown",
	               "icon": {
	                 "iconName": "view-list",
	                 "fontIconFamily": 1
	               },
	               
	             "value":_viewData
	           },
	           "position": "far",
	           "tooltip": NLS.gridView,
	           "category": "action" //same category will be grouped together
	         });
	         
       defination.entries = entries;
      return JSON.stringify(defination);
    }
    
    MeetingDataGridViewToolbar = {
    		writetoolbarDefination: (model) => {return writetoolbarDefination(model);},
    		destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return MeetingDataGridViewToolbar;
  });

define('DS/ENXMeetingMgmt/Config/MeetingFacets',
['DS/Core/Core',
 'UWA/Drivers/Alone',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
function(core, Alone, NLS) {

    'use strict';

    let MeetingFacets = [{ 
    	label: NLS.agenda, 
    	id:"agenda",
    	isSelected:true, 
    	icon: { 
    		iconName: "list-ordered",//"calendar-clock",
    		fontIconFamily: WUXManagedFontIcons.Font3DS
    	},
    	content: Alone.createElement('div', {id:'meetingAgendaContainer', 'class':'meeting-agenda-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Facets/MeetingAgenda' // loader file path to load the content
    },{ 
    	label: NLS.Attendees,
    	id:"members",
    	icon: { 
    		iconName: "users", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'meetingMembersContainer', 'class':'meeting-members-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Facets/MeetingMembers'
    },{ 
    	label: NLS.decisions,
    	id:"decision",
    	icon: { 
    		iconName: "text-quote", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'meetingDecisionContainer', 'class':'decisions-facet-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Facets/DecisionWrapper'
    },{ 
    	label: NLS.attachments,
    	id:"attachments",
    	icon: { 
    		iconName: "attach", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'meetingAttachmentsContainer', 'class':'meeting-attachments-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Facets/MeetingAttachment'
    }];

    return MeetingFacets;

});

/* global define, widget */
/**
 * @overview Route Management - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Utilities/SearchUtil',
		[
			'UWA/Class',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
			],
			function(
					UWAClass,
					NLS
			) {
	'use strict';
	let getRefinementToSnN = function(socket_id, title, multiSelect,recentTypes){	
		
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
		//return "flattenedtaxonomies:\"types/Change Order\" OR flattenedtaxonomies:\"types/Change Request\" OR flattenedtaxonomies:\"types/Change Action\"";
		  return "flattenedtaxonomies:\"types/Change Order\" OR flattenedtaxonomies:\"types/Change Request\" OR flattenedtaxonomies:\"types/Change Action\" OR " +
		  		"flattenedtaxonomies:\"types/Issue\" OR " +
		  		"flattenedtaxonomies:\"types/Program\" OR flattenedtaxonomies:\"types/Task\" OR flattenedtaxonomies:\"types/Phase\" OR flattenedtaxonomies:\"types/Gate\" OR flattenedtaxonomies:\"types/Milestone\" OR flattenedtaxonomies:\"types/Risk\" OR flattenedtaxonomies:\"types/Project Space\" OR " +
		  		"flattenedtaxonomies:\"types/Workspace\"";
	};
	let getPrecondForMeetingMemberSearch = function(){
		//return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\"";
			if(widget.getValue("x3dPlatformId") == "OnPremise"){
			// premise 
					return "flattenedtaxonomies:(\"types\/Person\") AND current:\"active\" OR flattenedtaxonomies:(\"types\/Group\") AND current:\"active\"";
				}else{
			// cloud                                
					return "([ds6w:type]:(Group) AND [ds6w:status]:(Public)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
			}
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
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENXMeetingMgmt/Components/MeetingNotify',[
	'DS/Notifications/NotificationsManagerUXMessages',
	'DS/Notifications/NotificationsManagerViewOnScreen',
	],
function(NotificationsManagerUXMessages,NotificationsManagerViewOnScreen) {

    'use strict';
    let _notif_manager = null;
    let MeetingNotify = function () {
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
    
    MeetingNotify.prototype.handler = function () {
    	if(document.getElementById("initiateMeeting")){ //This id is of create dialog panel of the meeting widget. 
    		//This means create dialog window is opened and show the notification on the window
    		NotificationsManagerViewOnScreen.inject(document.getElementById("initiateMeeting"));
    		document.getElementById('initiateMeeting').scrollIntoView();
    	} else if(document.getElementById("assigneeWarning")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("assigneeWarning"));
    	} else if(document.getElementById("selectUsers")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("selectUsers"));
    	} else if(document.getElementById("agendaContentContainer")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("agendaContentContainer"));
    	} else if(document.getElementById("Meeting-Decision-container")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("Meeting-Decision-container"));
    	} else{
    		if(document.getElementsByClassName('wux-notification-screen').length > 0){
        		//Do nothing as the notifications will be shown here.
        	}else{
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}
    	}
    	
    	return _notif_manager;
    };
    
    MeetingNotify.prototype.notifview = function(){
    	return NotificationsManagerViewOnScreen;
    }; 
    
    return MeetingNotify;

});

/*
 * @module 'DS/ENORouteMgmt/Config/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route summary datagrid view
 */

define('DS/ENXMeetingMgmt/Config/Toolbar/MeetingSummaryToolbarConfig',
  ['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
  function ( NLS) {
	let MeetingDataGridViewToolbar, 
    _viewData =  {
    		menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,
                  state: "selected",
                  fonticon: {
                      family:1,
                      content:"wux-ui-3ds wux-ui-3ds-view-list"
                    },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"MeetingSummary"
                      }
                    },
                  tooltip:NLS.gridView
                },
                {
                  type:'CheckItem',
                  title: NLS.tileView,
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-small-tile"
                  },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"MeetingSummary"
                      }
                    },
                  tooltip:NLS.tileView
                }
              ]              
    };

  
	function addFilterToolbarItems(filterPreference){
		var viewData = {
				menu:[
					{
						type:'CheckItem',
						title: NLS.filterOwnedbyme,
						state: filterPreference.indexOf("owned") > -1 ? "selected" : "unselected",
				    			  id : "owned",
				    			  action: {
				    				  module: 'DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
				    				  func: 'changeOwnerFilter',
				    				  argument: {
				    					  "type":"owner",
				    					  "filter":"owned"
				    				  }
				    			  },
				    			  tooltip:NLS.filterOwnedbymeTooltip
				      },
				      {
				    	  type:'CheckItem',
				    	  title: NLS.filterAssignedtome,
				    	  state: filterPreference.indexOf("assigned") > -1 ? "selected" : "unselected",
				    			  id : "assigned",
				    			  action: {
				    				  module: 'DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
				    				  func: 'changeOwnerFilter',
				    				  argument: {
				    					  "type":"owner",
				    					  "filter":"assigned"
				    				  }
				    			  },
				    			  tooltip:NLS.filterAssignedtomeTooltip
				      },
				      {
				    	  type: 'SeparatorItem',
				    	  title: ''
				      }  
	    ]};
		var stateNLS = widget.getValue('stateNLS');
		var stateFilter = {
				type:'CheckItem',
				state: filterPreference.indexOf("Create") > -1 ? "selected" : "unselected",
						id : "draft",
						action: {
							module: 'DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
							func: 'changeStateFilter',
							argument: {
								"type":"state",
								"filter":"draft"
							}
						},
						tooltip:NLS.filterDraftTooltip
		};
		if(stateNLS && stateNLS.Create){
			stateFilter.title = stateNLS.Create;
		}else{
			stateFilter.title = NLS.filterDraft;
		}
		viewData.menu.push(stateFilter);

		stateFilter = {
				type:'CheckItem',
				state: filterPreference.indexOf("Scheduled") > -1 ? "selected" : "unselected",
						id : "Scheduled",
						action: {
							module: 'DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
							func: 'changeStateFilter',
							argument: {
								"type":"state",
								"filter":"Scheduled"
							}
						},
						tooltip:NLS.filterScheduledTooltip
		};
		if(stateNLS && stateNLS.Scheduled){
			stateFilter.title = stateNLS.Scheduled;
		} else{
			stateFilter.title = NLS.filterScheduled;
		}
		viewData.menu.push(stateFilter);
		
		stateFilter =  {
				type:'CheckItem',
				state: filterPreference.indexOf("In Progress") > -1 ? "selected" : "unselected",
						id : "InProgress",
						action: {
							module: 'DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
							func: 'changeStateFilter',
							argument: {
								"type":"state",
								"filter":"InProgress"
							}
						},
						tooltip:NLS.filterInProgressTooltip

		};
		if(stateNLS && stateNLS.InProgress){
			stateFilter.title = stateNLS.InProgress;
		}else{
			stateFilter.title = NLS.filterInProgress
		}
		viewData.menu.push(stateFilter);

		stateFilter =  {
				type:'CheckItem',
				state: filterPreference.indexOf("Complete") > -1 ? "selected" : "unselected",
						id : "completed",
						action: {
							module: 'DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
							func: 'changeStateFilter',
							argument: {
								"type":"state",
								"filter":"completed"
							}
						},
						tooltip:NLS.filterCompletedTooltip

		};
		if(stateNLS && stateNLS.Complete){
			stateFilter.title = stateNLS.Complete;
		}else{
			stateFilter.title = NLS.filterCompleted
		}
		viewData.menu.push(stateFilter);
		return viewData;
	}
    
    let writetoolbarDefination = function (filterPreference) {
    var viewData = addFilterToolbarItems(filterPreference);
      var defination = {
        "entries": [
      /*    {
            "id": "back",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                "iconName": "home",
                "fontIconFamily": 1
              }
            },
            "action": {
              module: 'DS/ENXMeetingMgmt/View/Home/MeetingSummaryView', //TODO dummy method and function
              func: 'backToMeetingSummary',
            },
            
            "category": "status",
            "tooltip": NLS.home
          },*/
          {
              "id": "filter",
              "dataElements": {
                "typeRepresentation": "filterdropdown",
                "icon": {
                  "iconName": "list-filter",
                  "fontIconFamily": 1
                },
                "value":viewData
              },
              "action1": {
                module: 'DS/ENXMeetingMgmt/View/Grid/MeetingSummaryDataGridView', //TODO dummy method and function
                func: 'launchFilter',
              },
              "category": "status",
              "tooltip": NLS.filter              
            },
          {
            "id": "createMeeting",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                  "iconName": "plus",
                  fontIconFamily: WUXManagedFontIcons.Font3DS
                }
            },
            "action": {
                module: 'DS/ENXMeetingMgmt/View/Dialog/CreateMeetingDialog', //TODO dummy method and function
                func: 'CreateMeetingDialog',
              },
            "position": "far",
            "category": "create",
            "tooltip": NLS.newMeeting
          },
          {
           "id": "view",
           "className": "routeViews",
           "dataElements": {
        	   "typeRepresentation": "viewdropdown",
               "icon": {
                 "iconName": "view-list",
                 "fontIconFamily": 1
               },
               
             "value":_viewData
           },
           "position": "far",
           "tooltip": NLS.gridView,
           "category": "action" //same category will be grouped together
         },
          {
             "id": "deleteRoute",
             "dataElements": {
               "typeRepresentation": "functionIcon",
               "icon": {
                   "iconName": "trash",
                   fontIconFamily: WUXManagedFontIcons.Font3DS
                 },
                 "action": {
                     "module": "DS/ENXMeetingMgmt/View/Dialog/RemoveMeeting",  
                     "func": "removeConfirmation"
                   }
             },
             "position": "far",
             "category": "action",
             "tooltip": NLS.Delete 
           }, 
        ],
        "typeRepresentations": {
        	 "sortingdropdown" : {
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
              "tooltip":{
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
                "tooltip":{
      		        "text": "view",
      		        "position": "far"
      		      }
              }
        },
        
      }
      return JSON.stringify(defination);
    }
    
    MeetingDataGridViewToolbar = {
    		writetoolbarDefination: (filterPreference) => {return writetoolbarDefination(filterPreference);},
    		destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return MeetingDataGridViewToolbar;
  });

define('DS/ENXMeetingMgmt/Utilities/CustomFieldUtil',
[
	'DS/Controls/Button'
],
function(WUXButton) {    
		
		"use strict";
		
		let buttonData = {};
				
		let CustomFieldUtil = {
			
			data: {},
			
			getPlusButtonForMultivalueField: function() {
				
				let plusButton = new WUXButton({domId: "mvbutton", icon: {iconName: "plus"}});
				
				return plusButton;
			},
			
			getMinusButtonForMultivalueField: function(eleType, ele, data, requiredFlag) {
				
				let minusButton = new WUXButton({domId: "mvbutton", icon: {iconName: "minus"}});
				
				return minusButton;
			},
			
			getButtonData: function() {
				return this.buttonData;
			},
			
			setButtonData: function(buttonData) {
				this.buttonData = buttonData;
			},
			
			getRowNum: function() {
				return this.buttonData.rowNum;
			},
			
			setRowNum: function(rowNum) {
				this.buttonData.rowNum = rowNum;
			},
			
			getTotalRows: function() {
				return this.buttonData.totalRows;
			},
			
			setTotalRows: function(totalRows) {
				this.buttonData.totalRows = totalRows;
			},
			
			getParentContainer: function() {
				return this.buttonData.parentContainer;
			},
			
			setParentContainer: function(parentContainer) {
				this.buttonData.parentContainer = parentContainer;
			},
			
			getChildContainer: function() {
				return this.buttonData.childContainer;
			},
			
			setChildContainer: function(childContainer) {
				this.buttonData.childContainer = childContainer;
			},
			
			getCustomFieldUtilObj: function() {
				return Object.create(CustomFieldUtil);
			},
			
			setData: function(data) {
				this.data = data;
			},
			
			getData: function() {
				return this.data;
			}
					
		};
		
		return CustomFieldUtil;
});


define('DS/ENXMeetingMgmt/View/Facets/MeetingRelationship', [
	'UWA/Class/Model',
	'UWA/Core',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
], function(UWAModel,UWA,NLS){
'use strict';
let build	= function(data){
	 if(!showView()){
		 let containerDiv = UWA.createElement('div', {id: 'MeetingRelationsContainer','class':'Meeting-Relations-container'}); 
		 containerDiv.inject(document.querySelector('.MeetingPropertiesFacet-facets-container'));
	      return new UWA.Promise((resolve, reject) => {
	        require(['DS/ENORIPE_Relations/RelationsTabSettings'], (facetRelationsModule) => {
	          //Set the options
	          var options = {
	              isDraggable: true,
	              appID: 'ENORIPE_ECM',
	              isExternal: true, // we are external
	              noContextualMenu: false,
                  isProfilesVisible: true
	            },
	            initModel = {
	  	              getPlatformID: function () {
	  	                return widget.data.x3dPlatformId;
	  	              },
	  	              getServiceID: function () {
	  	                return '3DSpace';
	  	              }
	            };
	          // setting defaultProfile in 'facetTab' as below is currently not working correctly.
	         facetRelationsModule.setProfile('LastUsedProfile');

	          // fool jsruler, dont understand why it reports link errors on dynamic load
	          facetRelationsModule.isAvailable(initModel, options)
	            .then(function () {
	              require(['DS/ENORIPE_Relations/views/RelationsTab'], function (facetTab) {
	                let tab = new facetTab({
	                });
	                var viewModel = new UWAModel({
	  		          source : "3DSpace",
	  		          tenant : widget.data.x3dPlatformId,
	  		          objectId: data.model.id
	  		        });	
	                tab.updateFacetExternal(viewModel)	                 
	                tab.elements.container.inject(containerDiv); 
	              });
	            })
	            .catch((e) => {
	              console.error('Caught RelationsTab error:', e);
	            });
	        }, (e) => {
	          reject({ AMDError: e });
	        });
	      });
	 }
};



let hideView= function(){
   if(document.getElementById('MeetingRelationsContainer') != null){
       document.getElementById('MeetingRelationsContainer').style.display = 'none';
      
   }
};

let showView= function(){
   if(document.querySelector('#MeetingRelationsContainer') != null){
       document.getElementById('MeetingRelationsContainer').style.display = 'block';
       return true;
   }
   return false;
};

let destroy= function() {
	document.querySelector('#MeetingRelationsContainer').destroy();
	//MeetingAppliesToModel.destroy();
};


	let  MeetingRelations = {
			init : (data) => { return build(data);},
	        hideView: () => {hideView();},
	        destroy: () => {destroy();}
	    
	};
	
	
	return MeetingRelations;
});


/*
 * @module 'DS/ENORouteMgmt/Views/Toolbar/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route members datagrid view
 */

define('DS/ENXMeetingMgmt/Config/Toolbar/MeetingMemberTabToolbarConfig',
  ['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
  function ( NLS) {
    let MeetingMembersTabToolbarConfig, 
    _viewData =  {
            menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,
                  state: "selected",
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-list"
                  },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', //TODO dummy method and function
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"MembersTab"
                      }
                    },
                  tooltip:NLS.gridView
                },
                {
                  type:'CheckItem',
                  title: NLS.tileView,
                  
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-small-tile"
                  },
                  action: {
                      module: 'DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"MembersTab"
                      }
                    },
                  tooltip:NLS.tileView
                }
              ]              
    };

  
   
    
    let writetoolbarDefination = function (model) {
      let modifyAccess = model.meetingModel.ModifyAccess;
      let deleteAccess = model.meetingModel.DeleteAccess;
      let maturityState = model.meetingModel.state;
      let entries = [];
      let defination = {};
      
     //var visibleFlag=false;
     var visibleFlag=true;
	 var disabledFlag = true;
     if(modifyAccess=="TRUE" && maturityState=="Create"){
     	//visibleFlag=true;
     	disabledFlag = false;
     }
       // if(modifyAccess=="TRUE" & maturityState=="Create"){
        entries.push({
		     "id": "addMember",
		      "dataElements": {
		         "typeRepresentation": "functionIcon",
		         "icon": {
		        		"iconName": "plus",
		        		 fontIconFamily: WUXManagedFontIcons.Font3DS
		        		},
		        		"action": {
		        		"module": "DS/ENXMeetingMgmt/Actions/MemberActions",
		        		"func": "onSearchClick"
		        		}
		        	},
		        	"position": "far",
		        	"category": "create",
		        	"visibleFlag":visibleFlag,
					"disabled": disabledFlag,
		             "tooltip": NLS.addExistingMember   		
		 });
     //  }
     //var visibleFlag1=false;
     var visibleFlag1=true;
	 var disabledFlag1 = true;
     if(deleteAccess=="TRUE" && maturityState=="Create"){
     	//visibleFlag1=true;
     	disabledFlag1 = false;
     }
        entries.push( {
             "id": "deleteMember",
             "dataElements": {
               "typeRepresentation": "functionIcon",
               "icon": {
                   "iconName": "trash",
                   fontIconFamily: WUXManagedFontIcons.Font3DS
                 },
                 "action": {
                     "module": "DS/ENXMeetingMgmt/View/Dialog/RemoveMembers",  
                     "func": "removeConfirmation"
                   }
             },
             "position": "far",
             "category": "action",
             "visibleFlag":visibleFlag1,
             "disabled": disabledFlag1,
             "tooltip": NLS.Remove 
           });
        //  } 
          entries.push({
           "id": "view",
           "className": "memberViews",
           "dataElements": {
               "typeRepresentation": "viewdropdown",
               "icon": {
                 "iconName": "view-list",
                 "fontIconFamily": 1
               },
               
             "value":_viewData
           },
           "position": "far",
           "tooltip": NLS.tileView,
           "category": "action" //same category will be grouped together
         });

      defination.entries = entries;
      
      return JSON.stringify(defination);
    }
    
    MeetingMembersTabToolbarConfig={
      writetoolbarDefination: (model) => {return writetoolbarDefination(model);},
      destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return MeetingMembersTabToolbarConfig;
  });

define('DS/ENXMeetingMgmt/Config/AgendaTopicItemsGridViewConfig', 
		['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'], 
		function(NLS) {

    'use strict';

    let AgendaTopicItemsGridViewConfig=[{
              	text: NLS.title,
              	dataIndex: 'tree'              
            }];

    return AgendaTopicItemsGridViewConfig;

});

define('DS/ENXMeetingMgmt/Utilities/DragAndDrop',
    ['UWA/Core', 'DS/DataDragAndDrop/DataDragAndDrop'],
function (UWA, DataDragAndDrop) {
    'use strict';
     let dropZone = {
	      makeDroppable : function(droppableElement, callback,elementid) {	    	  
	    	  let that = this;
	    	 
	    	  if (droppableElement!==null){	    		  
	    		  that.dropInvite = droppableElement.getElement('#droppable');//droppableElement;//droppableElement.getElement('#droppable');
	    		  that.elementid =elementid;
	              if (!that.dropInvite){
	                that.dropInvite = new UWA.createElement('div', {
	                  id: 'droppable',
	                  'class': 'hidden',
	                  'elementid' :elementid
	                }).inject(droppableElement);
	              }
	              that.dropInvite.callback = callback;
	              let dragEvents = {
	            		  enter : that._manageDragEvents.bind(that),
	            		  leave : that._manageDragEvents.bind(that),
	            		  over : that._manageDragEvents.bind(that),
	            		  drop : that._manageDropEvent.bind(that)
	              };
	              DataDragAndDrop.droppable(droppableElement, dragEvents);
	          }
	      },

	     _manageDragEvents: function (el, event) {	    	 
	         let that = this;
	         switch (event.type){
	          	case 'dragenter':
	          		that._addDroppableStyle();
		            break;
	          	case 'dragleave':
	          		var targetClass = event.target.className;          		
	          		//if the target class is droppable, which is the dropInvite, remove the style.
	          		if(targetClass == "droppable show"){
	          			that._removeDroppableStyle();
	          			break;
	          		}
	          		targetClass = targetClass.replaceAll(" ", ".");	
					if(el && targetClass && el.querySelector("."+targetClass) != null){
						var meetingAttachmentsContainer;
						if(el.id == "CreateMeetingAttachmentsView")
							meetingAttachmentsContainer = el.querySelector('#CreateMeetingAttachmentsView');
						/*else if(el.id = "decisionAppliesToContainer")
							meetingAttachmentsContainer = el.querySelector('#dataGridNewMeetingDivToolbar');*/
						else if(el.id == "CreateMeetingFormView")
							meetingAttachmentsContainer = el.querySelector('#CreateMeetingFormView');
						else if(el.id == "meetingAttachmentsContainer")
							meetingAttachmentsContainer = el.querySelector('#dataGridAttachmentDivToolbar');
						else if(el.id =="InitiateAgendaPropertiesBody") {
							meetingAttachmentsContainer = el.querySelector('#InitiateAgendaPropertiesBody');
						}else if(el.id =="newAgendaPropertiesformBody") {
							meetingAttachmentsContainer = el.querySelector('#newAgendaPropertiesformBody');
						}	
						else if (el.id == "contextId-dropzone") {
							meetingAttachmentsContainer = el.querySelector('#contextId-dropzone');
						}						
						if(meetingAttachmentsContainer && meetingAttachmentsContainer.querySelector("."+targetClass) != null){
							that._removeDroppableStyle();
						}
						//return false;
						break;
					}
	          		that._removeDroppableStyle();
		            break;
	          	case 'dragover':
	          		that._addDroppableStyle();
		            break;
	          	default:
	          		break;
	        }
	        return true;
	      },
	      
	      _removeDroppableStyle : function(){
	    	  this.dropInvite.removeClassName('droppable');
	          this.dropInvite.removeClassName('show');
	          this.dropInvite.addClassName('hidden');
	      },
	      
	      _addDroppableStyle : function(){
	    	  this.dropInvite.addClassName('droppable');
	          this.dropInvite.removeClassName('hidden');
	          this.dropInvite.addClassName('show');
	      },
				
	      _manageDropEvent: function (dropData, target) {
				let that = this;
				if (dropData !== '' && dropData !== null && dropData !== undefined){
					try {
						dropData = UWA.is(dropData, 'string') ? JSON.parse(dropData): dropData;
						var items = dropData.data && dropData.data.items ? dropData.data.items : null;
						that.dropInvite.callback(items,target);
						that.dropInvite.removeClassName('droppable');
						that.dropInvite.removeClassName('show');
						that.dropInvite.addClassName('hidden');
					} catch (err){
						that.dropInvite.removeClassName('droppable');
						that.dropInvite.removeClassName('show');
						that.dropInvite.addClassName('hidden');
					}
				}else {
					that.dropInvite.callback(arguments[2]);
					that.dropInvite.removeClassName('droppable');
					that.dropInvite.removeClassName('show');
					that.dropInvite.addClassName('hidden');
				}
	      	}
		};
     return dropZone;
});

/* global define, widget */
/**
  * @overview Meetings - Other Meetings utilities
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Utilities/Utils',
[],
function() {
    'use strict';
    
    var Utils = {};
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
							title: NLS.infoRefreshErrorTitle,
							subtitle: NLS.infoRefreshError,
						    sticky: false
						});
					}
				});
    	});
    };
    
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

/*
 * @module 'DS/ENORouteMgmt/Config/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the initiate route create content datagrid view
 */

define('DS/ENXMeetingMgmt/Config/Toolbar/NewMeetingAttachmentsTabToolbarConfig',
  ['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
  function ( NLS) {
    let NewMeetingAttachmentsTabToolbarConfig;
    

  
   
    
    let writetoolbarDefination = function (filterPreference) {
     
      var defination = {
        "entries": [
         
          {
            "id": "addExistingAttachments",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                  "iconName": "plus",
                  fontIconFamily: WUXManagedFontIcons.Font3DS
                }
            },
            "action": {
                "module": "DS/ENXMeetingMgmt/View/Loader/NewMeetingAddAttachmentSearchLoader",
                "func": "onSearchClick"
              },
            "position": "far",
            "category": "create",
            "tooltip": NLS.addExistingAttachment
          },
         {
             "id": "removeAttachments",
             "dataElements": {
               "typeRepresentation": "functionIcon",
               "icon": {
                   "iconName": "trash",
                   fontIconFamily: WUXManagedFontIcons.Font3DS
                 },
                 "action": {
                     "module": "DS/ENXMeetingMgmt/View/Facets/CreateMeetingAttachments",
                     "func": "removeAttachments"
                   }
             },
             "position": "far",
             "category": "action",
             "tooltip": NLS.Remove 
           },
        ]
        
      }
      return JSON.stringify(defination);
    }
    
    NewMeetingAttachmentsTabToolbarConfig = {
            writetoolbarDefination: (filterPreference) => {return writetoolbarDefination(filterPreference);},
            destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return NewMeetingAttachmentsTabToolbarConfig;
  });

/* global define, widget */
/**
 * @overview Meeting - Data formatter
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Utilities/DataFormatter',
		['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],function(NLS) {
	'use strict';
	let DataFormatter;
	
	let gridData = function(dataElem){
		var canDelete = "FALSE";
		if(dataElem.state == "Create" || dataElem.state == "Draft"){
			canDelete = "TRUE";
		}
		var response =
		{
        	id: dataElem.id,
            Name: dataElem.name,		                    
            Maturity_State: dataElem.stateNLS,
            state:dataElem.state,
            Type: dataElem.meetingType,
            type: dataElem.type,
            Owner : dataElem.owner,
            OwnerFullName : dataElem.ownerFullName,
            conferenceCallAccessCode : dataElem.conferenceCallAccessCode,
            conferenceCallNumber : dataElem.conferenceCallNumber,
            created : dataElem.created,
            Description : dataElem.description,
            duration : parseFloat(dataElem.duration),
            location : dataElem.location,
            onlineMeetingInstructions : dataElem.onlineMeetingInstructions,
            onlineMeetingProvider : dataElem.onlineMeetingProvider,
            startDate : dataElem.startDate,
            title : dataElem.subject,
            Assignees:dataElem.attendees,
            AssigneesDiv: dataElem.assigneesdiv,
            ownerFilter: dataElem.owner,
            actualState: dataElem.state,
            DeleteAccess : canDelete,
            ModifyAccess : dataElem.modifyAccess,
            ContextName : dataElem.parentName,
            ContextId : dataElem.parentID,
            ContextPhysicalId : dataElem.parentPhysicalId,
            ContextType : dataElem.parentType,
            ProjectTitle : dataElem.projectTitle,
            Project : dataElem.project
            
    	};
    	
    	//custom attributes
		let customFields = (widget.getValue('customFields')) || null;
		
		if (customFields && customFields.items && customFields.items.length && customFields.items.length > 0) {
			//loop through each attribute and save value from dataElem to response{}
			customFields.items.forEach((ele) => {
				let customFieldValue = "";
				if (ele.name != 'extensions') {
					customFieldValue = dataElem[ele.name] || "";
					//check if date field
					let viewConfig = JSON.parse(ele.viewConfig);
					if(viewConfig.type === 'date') {						
						const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
					    let swymLang;
			    	    var value = "; " + document.cookie;
			    	    var parts = value.split("; " + "swymlang" + "=");
			    	    if (parts.length >= 2) 
			    	  		swymLang = parts.pop().split(";").shift();
						
						if (viewConfig.multivalue===true) {
							if (!customFieldValue)
								customFieldValue = [];
							let dateStringArray = customFieldValue;
							if (dateStringArray.length==0) {
								let date = new Date();
								date = (swymLang != undefined) ? date.toLocaleString(swymLang, options) +" "+ date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1') : date.toLocaleString("en", options) +" "+ date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
								customFieldValue.push(date);
							}
							else {
								customFieldValue = [];
								for (let i=0; i<dateStringArray.length; i++) {
									let date = new Date(dateStringArray[i]);
									date = (swymLang != undefined) ? date.toLocaleString(swymLang, options) +" "+ date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1') : date.toLocaleString("en", options) +" "+ date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
									customFieldValue.push(date);
								}
							}
						}
						else {
							let date = (!customFieldValue) ? new Date() : new Date(customFieldValue);
							date = (swymLang != undefined) ? date.toLocaleString(swymLang, options) +" "+ date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1') : date.toLocaleString("en", options) +" "+ date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
							customFieldValue = date;
						}
						
					}
					response[ele.name] = customFieldValue;
				}
			});
		}
    	
		return response;
	};
	
	let agendaTopicItems = function(dataElem){
		var response =
		{
        	id: dataElem.id,
        	type: dataElem.type,
        	relId: dataElem.relId,
        	title: dataElem.dataelements.title,		                    
            image : dataElem.dataelements.image,
            description: dataElem.dataelements.description,
            modified : dataElem.dataelements.modified,
            name : dataElem.dataelements.name,
            state: dataElem.dataelements.state,
            typeicon :dataElem.dataelements.typeicon,
            Action:"actions"
            
    	};
		return response;
	};
	
	
	let agendaGridData = function(dataElem){
		var response =
		{
        	Data: dataElem.data,
            Topic: dataElem.relelements.topic,		                    
            Speaker : dataElem.relelements.responsibilePerson,
            Duration: dataElem.relelements.topicDuration,
            Description:dataElem.relelements.topicDescription,
            startDate:dataElem.data[0].dataelements.topicStartTime,
            SpeakerId : dataElem.relelements.responsibileOID,
            Sequence : parseInt(dataElem.relelements.sequence),
            owner: dataElem.relelements.owner,
            created :dataElem.relelements.created,
            responsibility : dataElem.relelements.responsibility,
            Action:"actions"
            
    	};
		return response;
	};
	
	
	
	let attachmentGridData = function(dataElem){
	   
		var response =
		{
        	//id: dataElem.dataelements.objectId,
        	id: dataElem.id, 
            physicalId: dataElem.id, 
            title: dataElem.dataelements.title,		                    
            revision : dataElem.dataelements.revision,
            fileName : dataElem.dataelements.fileName,
            lockedBy: dataElem.dataelements.lockedBy,
            name: dataElem.dataelements.name,
            created : dataElem.dataelements.created,
            description : dataElem.dataelements.description,
            state: dataElem.dataelements.state,
            policy : dataElem.dataelements.policy,
            stateNLS : dataElem.dataelements.stateNLS,
            type: dataElem.type,
            typeNLS: dataElem.dataelements.typeNLS,
            policyNLS: dataElem.dataelements.policyNLS
            
    	};
		return response;
	};
	
	/*let attachmentAppendGridData = function(dataElem){
	   
		var response =
		{
        	id: dataElem.id,
            name: dataElem['ds6w:identifier'],
            title: dataElem['ds6w:label'],
            stateNLS: dataElem['ds6w:status'],
            typeNLS: dataElem['ds6w:type'],
            description: dataElem['ds6w:description'],
            created : dataElem["ds6w:created"],
            revision : dataElem["ds6wg:revision"]
    	};
		return response;
	};*/
	
	/*let memberAppendGridData = function(dataElem){
		var response =
		{
        	id: dataElem.physicalid,
            Name: dataElem.firstname +" "+dataElem.lastname,
            UserName: dataElem.name,
            Email: dataElem.email,
            Contact : dataElem.phonenumber
    	};
		return response;
	};
	
	*/
	let memberGridData = function(dataElem){
		var memberName
		if(dataElem.type =="Group" || dataElem.type == "Group Proxy"){
			memberName=dataElem.title;
		}else{
			memberName=dataElem.firstname +" "+dataElem.lastname;
		}
		 
		var response =
		{
        	id: dataElem.physicalid,
            Name: memberName,
            Type: dataElem.type,
            UserName: dataElem.name,
            Email: dataElem.email,
            Contact : dataElem.phonenumber,
            Company : dataElem.company
    	};
		return response;
	};
	
    DataFormatter={
           gridData: (dataElem) => {return gridData(dataElem);},
           agendaGridData: (dataElem) => {return agendaGridData(dataElem);},
           attachmentGridData: (dataElem) => {return attachmentGridData(dataElem);},
           agendaTopicItems: (dataElem) => {return agendaTopicItems(dataElem);},
           /*attachmentAppendGridData: (dataElem) => {return attachmentAppendGridData(dataElem);},
           memberAppendGridData: (dataElem) => {return memberAppendGridData(dataElem);},*/
           memberGridData: (dataElem) => {return memberGridData(dataElem);}
    		
    };
    
    return DataFormatter;
});


/* global define, widget */
/**
  * @overview Route Management - Route Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/NewMeetingMembersModel',
		[	'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
			],
			function(			   
					TreeDocument,
					TreeNodeModel,
					NLS
			) {
	'use strict';
	let model = new TreeDocument();
	/*let prepareTreeDocumentModel = function(response){      
		model.prepareUpdate();  
		model.prepareUpdate(); 
		var obj = JSON.parse(response);		
		obj.forEach(function(dataElem) {

			var thumbnailIcon,typeIcon,nameLabel;
			// thumbnailIcon=onMemberNodeAssigneesCellRequest(dataElem.fullname,dataElem.userName);
			// UG105941  : pass full name and name
			//thumbnailIcon=onMemberNodeAssigneesCellRequest(dataElem.personName,dataElem.name);    
			typeIcon=WebappsUtils.getWebappsAssetUrl("ENOUserGroupMgmt","icons/16/I_Person16.png");
			var subLableValue= "";
			if(dataElem.accessName=="coOwner")  {
				subLableValue = NLS.addMembers_coOwnerRole;
			} else if(dataElem.accessName=="attendees") {
				subLableValue = NLS.addMembers_attendeesRole;
			}
			dataElem.accessNameDisplay=subLableValue;
			var root = new TreeNodeModel({
				label: dataElem.personName,
				id: dataElem.id,
				width: 300,
				grid:"" ,
				
				
				"subLabel": subLableValue,
				icons : [typeIcon]
			});

			model.addRoot(root);
		});
		model.pushUpdate();
		return model;
    };*/
    let getModel=function(){
    	return model;
    }
    
    let NewMeetingAttachmentsModel = {
    		//createModel : (response) => {return prepareTreeDocumentModel(response);},
    		getModel : ()=> {return getModel();}
    }
    return NewMeetingAttachmentsModel;

});

define('DS/ENXMeetingMgmt/Config/CreateMeetingTabsConfig',
['DS/Core/Core',
 'UWA/Drivers/Alone',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
function(core, Alone, NLS) {

    'use strict';

    let CreateMeetingTabsConfig = [{ 
    	label: NLS.properties,
    	id:"properties",
    	isSelected:true, 
    	icon: { 
    		iconName: "attributes",
    		fontIconFamily: WUXManagedFontIcons.Font3DS,
    		orientation: "horizontal"
    	},
    	content: Alone.createElement('div', {id:'iMeetingPropertiesContainer', 'class':'meeting-properties-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Loader/NewMeetingPropertiesLoader' // loader file path to load the content
    },
    { 
    	label: NLS.agenda,
    	id:"agenda",
    	icon: { 
    		iconName: "list-ordered",//"calendar-clock",
    		fontIconFamily: WUXManagedFontIcons.Font3DS,
    		orientation: "horizontal"
    	},
    	content: Alone.createElement('div', {id:'iMeetingAgendaContainer', 'class':'imeeting-agenda-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Loader/NewMeetingAgendaLoader' // loader file path to load the content
    },
    { 
    	label: NLS.Attendees, 
    	id:"members",
    	icon: { 
    		iconName: "users", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'iMeetingMembersContainer', 'class':'imeeting-members-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Loader/NewMeetingMembersLoader' // loader file path to load the content 
    },
    { 
    	label: NLS.attachments, 
    	id:"attachments",
    	icon: { 
    		iconName: "attach", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'iMeetingAttachmentsContainer', 'class':'imeeting-attachments-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Loader/NewMeetingAttachmentsLoader' // loader file path to load the content
    }];

    return CreateMeetingTabsConfig;

});

define('DS/ENXMeetingMgmt/Config/MeetingInfoFacets',
['DS/Core/Core',
 'UWA/Drivers/Alone',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
function(core, Alone, NLS) {

    'use strict';

    let MeetingFacets = [{ 
    	label: NLS.MeetingPropertiesTitle, 
    	id:"MeetingPropertiesInfo",
    	isSelected:true, 
    	icon: { 
    		iconName: "attributes",//"calendar-clock",
    		fontIconFamily: WUXManagedFontIcons.Font3DS
    	},
    	content: Alone.createElement('div', {id:'MeetingPropertiesContainer', 'class':'meeting-info-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Form/MeetingView'
    },{ 
    	label: NLS.MeetingRelationship,
    	id:"MeetingRelationshipInfo",
    	icon: { 
    		iconName: 'object-related',
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'MeetingRelationshipContainer', 'class':'meeting-relationship-container'}),
        loader : 'DS/ENXMeetingMgmt/View/Facets/MeetingRelationship'
    }];

    return MeetingFacets;

});

define('DS/ENXMeetingMgmt/View/Dialog/OpenDialog', [
  'DS/Windows/Dialog',
  'DS/Windows/ImmersiveFrame',
  'DS/Controls/Button',
  'DS/ENXDecisionMgmt/View/RightSlideIn/DecisionPropPanelView',
  'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (
		  WUXDialog,
		  WUXImmersiveFrame,
		  WUXButton,
		  DecisionPropPanelView,
		  NLS) {
	'use strict';
	let _dialog;	
	
	let InitiateDialog = function (dialogData) {    	
    	let decisionPropPanelViewContainer = new UWA.Element('div', { 
    		id :"Meeting-Decision-container",
    		styles: {	
				height: '350px',
				'min-width': '500px'
    		}
    	});
    	let decisionPropPanelView = new DecisionPropPanelView(decisionPropPanelViewContainer);
    	decisionPropPanelView.init(dialogData, "decisionCreate");

    	var immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body); 		         
		_dialog = new WUXDialog({
			  titleBarVisibleFlag: false,
			  closeButtonFlag: false,
			  resizableFlag: true,
              modalFlag: true,
              content: decisionPropPanelViewContainer,
              immersiveFrame: immersiveFrame
		 });
		
		widget.meetingEvent.subscribe('decision-create-close-click', function (data) {
			// Rest of the code to close the Right Panel //
			if(_dialog!=undefined){
				_dialog.visibleFlag = false;
				_dialog.destroy();
			}
			if(immersiveFrame!=undefined)
				immersiveFrame.destroy();
			});
		
    };
    
    let OpenDialog={    		
    		InitiateDialog: (dialogData) => {return InitiateDialog(dialogData);}
    };

    return OpenDialog;

  });


define('DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
        ['DS/CollectionView/ResponsiveTilesCollectionView'],
        function(WUXResponsiveTilesCollectionView) {

    'use strict';

    let WrapperTileView, _myResponsiveTilesView, _container;
    /*
     * builds the default container for tile view if container is not passed
     */
    let buildLayout = function(){
        _container=UWA.createElement('div', {id:'TileViewContainer', 'class':'tile-view-container hideView'});

    };
    /*
     * builds the tile view using WebUX's tile view
     * required param: treeDocument as model 
     * optional: container if customize container dom element is required with ur own class
     */
    let initTileView = function (treeDocument,container, enableDragAndDrop){
        if(!container){
            buildLayout();
        }else{
            _container = container;
        }	
        if(!enableDragAndDrop){
        	enableDragAndDrop = false;
        }
        _myResponsiveTilesView = new WUXResponsiveTilesCollectionView({
            model: treeDocument,
            allowUnsafeHTMLContent:true,
            useDragAndDrop: enableDragAndDrop,
            displayedOptionalCellProperties: ['description','contextualMenu'],
        });

        _myResponsiveTilesView.getContent().style.top = '50 px';
        _myResponsiveTilesView.inject(_container);
        return _container;
    };
    /*
     * Returns the tile view
     */
    let tileView = function(){
        return _myResponsiveTilesView;
    };
    /*
     *Returns the selected tiles' details 
     */	    
    let getSelectedRows = function(myResponsiveTilesView){
        var selectedDetails = {};
        var details = [];
        var children = myResponsiveTilesView.TreedocModel.getSelectedNodes();;
        for(var i=0;i<children.length;i++){
            details.push(children[i].options.grid);
        }
        selectedDetails.data = details;
        return selectedDetails;
    };
    /*
     * Exposes the below public APIs to be used
     */
    WrapperTileView={
            build: (treeDocument,container,enableDragAndDrop) => {return initTileView(treeDocument,container,enableDragAndDrop);},
            tileView: () => {return tileView();},
            getSelectedRows: () => {return getSelectedRows(_myResponsiveTilesView);}
    };

    return WrapperTileView;

});

/* global define, widget */
/**
 * @overview Meeting - ID card utilities
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Utilities/IdCardUtil',[
	'DS/ENXDecisionMgmt/Utilities/IdCardUtil',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],function(IdCardUtilDecision,NLS) {
	'use strict';
	let infoIconActive = function(){
		var infoIcon = document.querySelector('#meetingInfoIcon');
  	  	if(infoIcon.className.indexOf("fonticon-color-display") > -1){
  	  		infoIcon.className = infoIcon.className.replace("fonticon-color-display", "fonticon-color-active");
  	  	}
	};
	
	let infoIconInActive = function(){
		var infoIcon = document.querySelector('#meetingInfoIcon');
  	  	if(infoIcon.className.indexOf("fonticon-color-active") > -1){
  	  		infoIcon.className = infoIcon.className.replace("fonticon-color-active", "fonticon-color-display");
  	  	}   
	};
	
	let hideChannel3 = function(){
		var idCardHideContent = document.querySelector('#channel3');
  	  	if(idCardHideContent){
  	  		idCardHideContent.style.display = "none";
  	  	}
	};
	
	let showChannel3 = function(){
		var idCardHideContent = document.querySelector('#channel3');
		if(idCardHideContent){
  		  	idCardHideContent.style.display = "";
  	  	}
	};
	
	let hideChannel2 = function(){
		var idCardHideContent = document.querySelector('#channel2');
  	  	if(idCardHideContent){
  	  		idCardHideContent.style.display = "none";
  	  	}
	};
	
	let showChannel2 = function(){
		var idCardHideContent = document.querySelector('#channel2');
		if(idCardHideContent){
  		  	idCardHideContent.style.display = "";
  	  	}
	};
	
	let hideChannel1 = function(){
		var idCardHideContent = document.querySelector('#channel1');
  	  	if(idCardHideContent){
  	  		idCardHideContent.style.display = "none";
  	  	}
	};
	
	let showChannel1 = function(){
		var idCardHideContent = document.querySelector('#channel1');
		if(idCardHideContent){
  		  	idCardHideContent.style.display = "";
  	  	}
	};
	
	let infoIconIsActive = function(){
		if(document.querySelector('#meetingInfoIcon').className.indexOf("fonticon-color-active") > -1){
			return true;
		}else{
			return false;
		}
	};
	
	let collapseIcon = function(){
		var meetingHeaderContainer = document.querySelector('#meetingHeaderContainer');
		if(meetingHeaderContainer && meetingHeaderContainer.className.indexOf("minimized") > -1){
			var expandCollapse = document.querySelector('#expandCollapse');
			if(expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1){
				expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
				expandCollapse.title = NLS.idCardHeaderActionExpand;
			}
		}
	};
	
	let hideThumbnail = function(){
		var thumbnailSection = document.querySelector('#thumbnailSection');
		thumbnailSection.classList.add("id-card-thumbnail-remove");
		
		var infoSec = document.querySelector('#infoSec');
		var meetingHeaderContainer = document.querySelector('#meetingHeaderContainer');
		if(meetingHeaderContainer && meetingHeaderContainer.className.indexOf("minimized") > -1){
			infoSec.classList.add("id-info-section-align-minimized");
		}else{
			infoSec.classList.add("id-info-section-align");
		}
		
		
	};
	
	let showThumbnail = function(){
		var thumbnailSection = document.querySelector('#thumbnailSection');
		thumbnailSection.classList.remove("id-card-thumbnail-remove");
		
		var infoSec = document.querySelector('#infoSec');
		var meetingHeaderContainer = document.querySelector('#meetingHeaderContainer');
		if(meetingHeaderContainer && meetingHeaderContainer.className.indexOf("minimized") > -1){
			infoSec.classList.remove("id-info-section-align-minimized");
		}else{
			infoSec.classList.remove("id-info-section-align");
		}
		
	};
	
	let resizeIDCard = function(containerWidth){
		// Hide channel3 at 850px
        if (containerWidth < 850) {
        	hideChannel3();
        } else {
        	showChannel3();
        }
		
		// Hide thumbnail at 768px
        if (containerWidth < 768) {
        	hideThumbnail();
        } else {
        	showThumbnail();
        }
        
        // Hide channel2 at 500px
        if (containerWidth < 500) {
        	hideChannel2();
        } else {
        	showChannel2();
        }
        
        // Hide channel1 at 500px
        if (containerWidth < 175) {
        	hideChannel1();
        } else {
        	showChannel1();
        }
        
        var decisionIDCard = document.querySelector('#decisionIDCard');
        if(decisionIDCard){
        	IdCardUtilDecision.resizeIDCard(decisionIDCard.offsetWidth);
        }
        
	};
	
	let IdCardUtil = {
			infoIconActive: () => {return infoIconActive();},
			infoIconInActive: () => {return infoIconInActive();},
			hideChannel3: () => {return hideChannel3();},
			showChannel3: () => {return showChannel3();},
			infoIconIsActive: () => {return infoIconIsActive();},
			collapseIcon: () => {return collapseIcon();},
			hideThumbnail: () => {return hideThumbnail();},
			showThumbnail: () => {return showThumbnail();},
			resizeIDCard: (containerWidth) => {return resizeIDCard(containerWidth);}
	};
	
	return IdCardUtil;
});

/**
 * 
 */
define('DS/ENXMeetingMgmt/View/Menu/MeetingOpenWithMenu',
		[
			'UWA/Core',
			'UWA/Class',
			'DS/i3DXCompassPlatformServices/OpenWith',
			'UWA/Class/Promise'
			], function(UWA, Class, OpenWith, Promise) {
	'use strict';

	let getContentForCompassInteraction = function(data){
		let itemsData = [];
		let item = {
				'envId': widget.getValue('x3dPlatformId'),
				'serviceId': "3DSpace",
				'contextId': "",
				'objectId': data.Id,
				'objectType': data.Type,
				'displayName': data.Title,
				'displayType': data.Type,
				'facetName' : 'realized',
				"path": [{
					"resourceid": data.Id,
					"type": data.Type
				}]
		//"objectTaxonomies":that.getObjectTaxonomies(selectedNode)
		};
		itemsData.push(item);

		let compassData = {
				protocol: "3DXContent",
				version: "1.1",
				source: widget.getValue("appId"),
				widgetId: widget.id,
				data: {
					items: itemsData
				}
		};
		return compassData;
	};

	let getOpenWithMenu = function(data) {
		let content = getContentForCompassInteraction(data);
		let openWith = new OpenWith();
		openWith.set3DXContent(content); 
		let apps = [];
		if (UWA.is(openWith.retrieveCompatibleApps, 'function')) {
			return new Promise(function(resolve, reject) {
				openWith.retrieveCompatibleApps(function(appsList) {
					appsList.forEach(function(app) {
						apps.push(getSubmenuOptions(app, null));
					});
					resolve(apps);
				},function(){
					reject(new Error("Error while getting Open with menus"));
				});
			});
		}
	};

	let getSubmenuOptions = function(app, model) {
		return {
			id: app.text,
			title: app.text,
			icon: app.icon,
			type: 'PushItem',
			multisel: false,
			action: {
				context: model,
				callback: app.handler
			}
		};
	};

	let MeetingOpenWithMenu = {
			getOpenWithMenu: (data) => {return getOpenWithMenu(data);}
	};

	return MeetingOpenWithMenu;

});




define('DS/ENXMeetingMgmt/Config/NewMeetingAttachmentsViewConfig', 
        ['i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'], 
        function(NLS) {

    'use strict';

    let NewMeetingAttachmentsViewConfig=[{
	      	text: NLS.title,
	      	dataIndex: 'tree',
	      	visibility:true
	    },{
	 		text: NLS.creationDate,
	        dataIndex: 'Creation_Date',
	        visibility:true
		},{
		    text: NLS.IDcardOwner,
	     	dataIndex: 'Owner',
	     	visibility:true
		}];

    return NewMeetingAttachmentsViewConfig;

});

/* global define, widget */
/**
  * @overview Meeting - ENOVIA Bootstrap file to interact with the platform
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
 define('DS/ENXMeetingMgmt/Controller/EnoviaBootstrap', 
[
    'UWA/Core',
    'UWA/Class/Collection',
    'UWA/Class/Listener',
    'UWA/Utils',
    'DS/ENXMeetingMgmt/Utilities/Utils',
    'DS/PlatformAPI/PlatformAPI',
    'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
    'DS/WAFData/WAFData'
],
function(
	UWACore,
	UWACollection,
	UWAListener,
	UWAUtils,
	Utils,
	PlatformAPI,
	CompassServices,
	WAFData
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

            var _started = false, _frameENOVIA = false, _compassSocket, _storages, _csrf, _storage, _onStorageChange, EnoviaBootstrap, _urlsSwym, _prefSwym, _pref3DSpace,_urlsSearch,_prefSearch;

            function initCompassSocket(options) {
                if (_compassSocket) {
                    return _compassSocket;
                }

                // var contentSocketId = 'com.ds.contentSkeleton',
                // compassServerId =
                // 'com.ds.compass';
                var contentSocketId = 'com.ds.meeting.' + options.id, compassServerId = 'com.ds.compass';

                _compassSocket = new UWAUtils.InterCom.Socket(contentSocketId);
                _compassSocket.subscribeServer(compassServerId, window.parent);

                return _compassSocket;
            }
            
            function initEnoviaRequest() {
                var _authenticatedRequest;

                _authenticatedRequest = WAFData.authenticatedRequest;
                WAFData.authenticatedRequest = function(url, options) {
                    var storages = _storages, storage, onComplete;

                    if (storages) {
                        storage = storages.getStorageWithUrl(url);
                    }
                    
                    if (UWACore.is(storage)) {
                        if (url !== result(storage, 'url')) {
                            if (!options) {
                                options = {};
                            }
                            if (!options.headers) {
                                options.headers = {};
                            }

                            options.headers['X-DS-CSRFTOKEN'] = _csrf || '';
                        }
                        var tenantId = storage.id;
                        if(typeof widget.data.ids != "undefined"){
                        	tenantId = widget.data.x3dPlatformId;
    					}
                        var x3DContent = UWA.is(widget.getValue('X3DContentId'), 'string') ? JSON.parse(widget.getValue('X3DContentId')) : null;
                        if(x3DContent && x3DContent.data.items && (x3DContent.data.items[0].objectType === "Meeting")){
                        	//widget.data.ids = x3DContent.data.items[0].objectId;
                        	widget.data.contentId = x3DContent.data.items[0].objectId; //Don't set as Meeting id otherwise it will always load the specific Meeting even after widget refresh
                        	widget.setValue('X3DContentId', null); 
                        }
                        url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'tenant=' + tenantId;
                        if(!url.includes("/bps/cspaces")){
	                        if(widget.getPreference("collabspace")){
	                        	url = url + '&SecurityContext=' + encodeURIComponent(widget.getPreference("collabspace").value);
	                        }
                        }
                        if (widget.debugMode) {
                        	url = url + '&$debug=true'
                        }
                        if(Utils.getCookie("swymlang")){
                        	url = url + '&$language='+ Utils.getCookie("swymlang");
                        }
                       
                    }

                    onComplete = options.onComplete;

                    options.onComplete = function(resp, headers, options) {
                        _csrf = headers['X-DS-CSRFTOKEN'];
                        if (UWACore.is(onComplete, 'function')) {
                            onComplete(resp, headers, options);
                        }
                    };

                    return _authenticatedRequest(url, options);
                };
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
            	
            }
            function initSwymServices () {
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
            }
			
			function init3DSpaceServices () {
				if (_pref3DSpace) {
                    return _pref3DSpace;
                }
				
				var platformId=widget.getValue("x3dPlatformId");
							
				CompassServices.getServiceUrl( { 
					   serviceName: '3DSpace',
					   platformId : platformId, 
					   onComplete : function(data){
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
			}

            EnoviaBootstrap = UWACore.merge(UWAListener, {

                start : function(options) {

                    if (_started) {
                        return;
                    }

                    if (options.frameENOVIA) {
                        _frameENOVIA = true;
                    }

                    options = (options ? UWACore.clone(options, false) : {});

                    _storages = options.collection;

                    initCompassSocket(options);
                    initEnoviaRequest();
                    initSwymServices();
                    initSearchServices();
					init3DSpaceServices();

                    _started = true;
                },

                // TODO transformer ce controller en une collectionView prennant
                // la collection des storages en param d'entr�e. Cette
                // collectionView serait render dans les widget mais pas dans
                // l'app standAlone ou elle ne servirait qu'� la gestion des
                // events.
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
                    require(['DS/ENXDecisionMgmt/Controller/DecisionBootstrap'], function (DecisionEnoviaBootstrap) {
                    	 DecisionEnoviaBootstrap.set3DSpaceURL(_pref3DSpace);
                	});
                   
                    
                    if (id && _urlsSwym) {
                        for (var i = 0; i < _urlsSwym.length; i++) {
                            if (id === _urlsSwym[i].platformId) {
                                _prefSwym = _urlsSwym[i].url;
                                require(['DS/ENXDecisionMgmt/Controller/DecisionBootstrap'], function (DecisionEnoviaBootstrap) {
                                	DecisionEnoviaBootstrap.setSwymUrl(_prefSwym);
                                });
                                break;
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
                },
                
                updateURLsOnEdit : function(storages){
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
                },
				get3DSpaceURL : function() {
					if (_started) {
                        return _pref3DSpace;
                    }
				},
				getDecisionServiceBaseURL : function() {
					if (_started) {
                        return _pref3DSpace + '/resources/v1/modeler/decisions';
                    }
				},
				getMeetingServiceBaseURL : function() {
					if (_started) {
                        return _pref3DSpace + '/resources/v1/modeler/meetings';
                    }
				},
				getSNIconServiceBaseURL : function() {
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
                }
				
				
            });

            return EnoviaBootstrap;
        });


/**
 * 
 */
/**
 * 
 */
define('DS/ENXMeetingMgmt/View/Facets/DecisionWrapper',
        [   
         	'DS/ENXDecisionMgmt/View/Facets/DecisionTab',
         	'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		    'DS/ENXDecisionMgmt/Utilities/DragAndDrop',
		    'DS/ENXDecisionMgmt/Utilities/DragAndDropManager',
        	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
            ], function(
            		DecisionTab, EnoviaBootstrap, DropZone, DragAndDropManager, NLS
            ) {

    'use strict';
	
   	 let _ondrop, access;
     let build = function(_meetingInfoModel){
    	if(!showView()){
    		access = _meetingInfoModel.model.ModifyAccess == "TRUE" ? true : false;
		 	// Model //
	    	var _decisionInfoModel = {};
	    	_decisionInfoModel.id=_meetingInfoModel.model.id;
	    	/*_decisionInfoModel.OwnerFullName=EnoviaBootstrap.getLoginUserFullName();
	    	_decisionInfoModel.Owner=EnoviaBootstrap.getLoginUser();*/
	    	// Container //
	    	let containerDiv = UWA.createElement('div', {id: 'DecisionContainer','class':'decisions-facet-container'}); 
			containerDiv.inject(document.querySelector('.meeting-facets-container'));
			DropZone.makeDroppable(containerDiv, _ondrop);		 
			var storges = EnoviaBootstrap.getStorages();
	    	DecisionTab.init(_decisionInfoModel,containerDiv,storges);
			
			DragAndDropManager.init(_meetingInfoModel);
    	}
    };

	_ondrop = function(e, target){
    	DragAndDropManager.onDropManager(e,access,"Summary");
	}

    let destroy= function() {
    	DecisionTab.destroy();
    };
    let hideView= function(){
        if(document.getElementById('DecisionContainer') != null){
            document.getElementById('DecisionContainer').style.display = 'none';
           
        }
    };
    let showView= function(){
        if(document.querySelector('#DecisionContainer') != null){
            document.getElementById('DecisionContainer').style.display = 'block';
			DropZone.makeDroppable(document.getElementById('DecisionContainer'), _ondrop); 
            return true;
        }
        return false;
    };
    
    let DecisionWrapper = {
    		init : (_meetingInfoModel) => { return build(_meetingInfoModel);},
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };
    

    return DecisionWrapper;
});



define('DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
        ['DS/DataGridView/DataGridView',
         'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
         'DS/CollectionView/CollectionViewStatusBar',
         'DS/DataGridView/DataGridViewLayout',
         'UWA/Drivers/Alone',
         ],
        function(DataGridView,EnoviaBootstrap, CollectionViewStatusBar,DataGridViewLayout, Alone) {

            'use strict';

            let WrapperDataGridView, _dataGrid, _container, _toolbar,jsontoolbar,dummydiv;
            var layoutOptions =  { 
                    rowsHeader: false
                } 
            
            
            let buildToolBar = function(jsonToolbar){
                jsonToolbar = JSON.parse(jsonToolbar);
                _toolbar = _dataGrid.setToolbar(JSON.stringify(jsonToolbar));
                return _toolbar;
            };

            let initDataGridView = function (treeDocument, colConfig, toolBar,dummydiv,options){
              //buildLayout();
            	if(options && options.showRowCount == true){
            		layoutOptions.rowsHeader = true;
            	}
            	if(options && options.layoutOptions){
            		layoutOptions = options.layoutOptions;
            		delete options[layoutOptions];
            	}else{
            		layoutOptions =  { 
                    		rowsHeader: false
                        } 
            	}
              _dataGrid = new DataGridView({
                  treeDocument: treeDocument,
                  columns: colConfig,
                  //layout: new DataGridViewLayout(layoutOptions),
                  defaultColumnDef: {//Set default settings for columns
                    widthd:'auto',
                    typeRepresentation: 'string'
                  },
                  showModelChangesFlag: false,
				  rowGroupingEnabledFlag : false
              });
              if(options && options.showContextualMenuColumnFlag){
            	  _dataGrid.showContextualMenuColumnFlag = true;
            	  _dataGrid.onContextualEvent = options.onContextualEvent 
              }
              if(options) {
            	  _dataGrid.showModelChangesFlag = true;  
              }
              
              if(options){
            		for(let key in options){
            			if(options.layoutOptions) {
            				_dataGrid.layout= new DataGridViewLayout(layoutOptions);
            			}else if(options.onContextualEvent) {
            				_dataGrid.onContextualEvent = options.onContextualEvent	
            			}else if (options.hasOwnProperty(key)) {
            				_dataGrid[key]= options[key];
            			}
            		}
            	}
            
              
              var statusbar = true;
              if(options && options.noStatusbar) {
            	  statusbar = false;
            	  
              }
              
              if(statusbar) {
            	  _dataGrid.buildStatusBar([{
    				  type: CollectionViewStatusBar.STATUS.NB_ITEMS
    				}, {
    				  type: CollectionViewStatusBar.STATUS.NB_SELECTED_ROWS
    				}
    			  ]);
              }
            
              _dataGrid.layout.cellHeight = 35;
              _dataGrid.rowSelection = 'multiple';
              _dataGrid.cellSelection = 'none';
              _dataGrid.getContent().style.top = '50 px';
              if (toolBar){
                  buildToolBar(toolBar);
               }

              setReusableComponents();
              _dataGrid.inject(dummydiv);             
              return dummydiv;
            };
            
            
            
            let dataGridView = function(){
                return _dataGrid;
            };
            
            let setReusableComponents = function(){
            	_dataGrid.registerReusableCellContent({
     	          	id: '_state_',
                	buildContent: function() {
                		let commandsDiv = UWA.createElement('div');
                        UWA.createElement('span',{
              			  "html": "",
              	          "class":"meeting-state-title "
              	        }).inject(commandsDiv);
                        return commandsDiv;
                	}
                });
                _dataGrid.registerReusableCellContent({
     	          	id: '_startDate_',
                	buildContent: function() {
                		let commandsDiv = UWA.createElement('div');
                        UWA.createElement('span',{
              			  "html": "",
              	          "class":"meeting-state-title"
              	        }).inject(commandsDiv);
                        return commandsDiv;
                	}
                });
            	_dataGrid.registerReusableCellContent({
     	          	id: '_assignee_',
                	buildContent: function() {
                		var assigneesDiv = new UWA.Element("div", {class:'members'});
                		
                		var assignee = new UWA.Element("div", {
                			class:'assignee'
                		});
                		
                		let commandsDiv = UWA.createElement('div');
                        UWA.createElement('span',{
              			  "html": "",
              	          "class":"meeting-state-title "
              	        }).inject(commandsDiv);
                        return commandsDiv;
                	}
                });
            	_dataGrid.registerReusableCellContent({
     	          	id: '_owner_',
                	buildContent: function() {
                		var responsible = new UWA.Element("div", {});
                        var owner = new UWA.Element("div", {
                          class:'assignee'
                        });
                        var ownerIcon = "";
                        if(EnoviaBootstrap.getSwymUrl()!=undefined){
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
                        var ownerName = UWA.createElement('span', {
                                'class': 'userName',
                                 html: ""
                            });
                         owner.inject(responsible);
                         ownerName.inject(responsible);
                         return responsible;
                	}
                });
            	_dataGrid.registerReusableCellContent({
     	          	id: '_speaker_',
                	buildContent: function() {
                		var responsible = new UWA.Element("div", {});
                        var owner = new UWA.Element("div", {
                          class:'assignee'
                        });
                        var ownerIcon = "";
                        if(EnoviaBootstrap.getSwymUrl()!=undefined){
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
                        var ownerName = UWA.createElement('span', {
                                'class': 'userName',
                                 html: ""
                            });
                         owner.inject(responsible);
                         ownerName.inject(responsible);
                         return responsible;
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
            
            let deleteRowModelByIndex = function(treeDocumentModel,index){
        		var indexRow = treeDocumentModel.getNthRoot(index);
        		if(indexRow){
        			treeDocumentModel.prepareUpdate();	
        			treeDocumentModel.removeRoot(indexRow);
        			treeDocumentModel.pushUpdate();
        		}		
        	};
        	
        	let deleteRowModelSelected = function(treeDocumentModel){
        		let selctedIds= [];
        		var selRows = treeDocumentModel.getSelectedNodes();
        		treeDocumentModel.prepareUpdate();	
        		for (var index = 0; index < selRows.length; index++) {
        			treeDocumentModel.removeRoot(selRows[index]);
        			selctedIds.push(selRows[index].options.id);
        		}
        		treeDocumentModel.pushUpdate();
        		return selctedIds;
        	};
        	
        	let deleteRowModelById = function(treeDocumentModel,id){
				var children = treeDocumentModel.getChildren();
				for(var i=0;i<children.length;i++){
					if(children[i].options.id == id){
						treeDocumentModel.prepareUpdate();	
						treeDocumentModel.removeRoot(children[i]);
						treeDocumentModel.pushUpdate();
					}
				}
			};
			
			let deleteRowModelByIds = function(treeDocumentModel,ids){
				var children = treeDocumentModel.getChildren();
				var childrenToDelete = [];
				for(var i=0;i<children.length;i++){
					if(ids.includes(children[i].options.grid.id)){
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
			
			let getRowModelIndexById = function(treeDocumentModel,id){
				var children = treeDocumentModel.getChildren();
				for(var i=0;i<children.length;i++){
					if(children[i].options.id == id){
						return i;
					}
				}
			};

            WrapperDataGridView={
              build: (treeDocument, colConfig, toolBar,dummydiv,massupdate) => {return initDataGridView(treeDocument, colConfig, toolBar,dummydiv,massupdate);},
              dataGridView: () => {return dataGridView();},
              destroy: function() {_dataGrid.destroy();_container.destroy();},
              dataGridViewToolbar: () => {return _toolbar;},
              getSelectedRowsModel: (treeDocumentModel) => {return getSelectedRowsModel(treeDocumentModel);},
              deleteRowModelByIndex: (treeDocumentModel,index) => {return deleteRowModelByIndex(treeDocumentModel,index);},
              deleteRowModelSelected: (treeDocumentModel) => {return deleteRowModelSelected(treeDocumentModel);},
              deleteRowModelById: (treeDocumentModel,id) => {return deleteRowModelById(treeDocumentModel,id);},
              deleteRowModelByIds: (treeDocumentModel,ids) => {return deleteRowModelByIds(treeDocumentModel,ids);},
  			  getRowModelById: (treeDocumentModel,id) => {return getRowModelById(treeDocumentModel,id);},
  			  getRowModelIndexById: (treeDocumentModel,id) => {return getRowModelIndexById(treeDocumentModel,id);}
            };

            return WrapperDataGridView;

        });

/* global define, widget */
/**
 * @overview Meeting - JSON Parse utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
		[
			'UWA/Class',
			'DS/ENXMeetingMgmt/Utilities/Utils',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
			],
			function(
					UWAClass,
					Utils,
					NLS
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
				if(resp.data[i].dataelements.assigneeType === "Group Proxy" || resp.data[i].dataelements.assigneeType === "Group"){
					resp.result[i].assigneeTitle =   resp.data[i].dataelements.assigneeTitle;
				}
				if(resp.result[i].id === undefined){
					resp.result[i].id = resp.data[i].id;
				}
				if(resp.result[i].physicalid === undefined){
					resp.result[i].physicalid = resp.data[i].id;
				}
				if(resp.result[i].type === undefined){
					resp.result[i].type = resp.data[i].type;
				}
				if(resp.result[i].relId === undefined){
					resp.result[i].relId = resp.data[i].relId;
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
				if(resp.data[i].dataelements.assigneeType === "Group Proxy" || resp.data[i].dataelements.assigneeType === "Group"){
					resp.result[i].assigneeTitle =   resp.data[i].dataelements.assigneeTitle;
				}
				if(resp.result[i].id === undefined){
					resp.result[i].id = resp.data[i].id;
				}
				if(resp.result[i].physicalid === undefined){
					resp.result[i].physicalid = resp.data[i].id;
				}
				if(resp.result[i].type === undefined){
					resp.result[i].type = resp.data[i].type;
				}
				if(resp.result[i].relId === undefined){
					resp.result[i].relId = resp.data[i].relId;
				}
				
				var attendeesLen = resp.data[i].relateddata.attendees.length;
				resp.result[i].attendees = new Array();	
				for(var j=0; j< attendeesLen ;j++){
				    var attendee = resp.data[i].relateddata.attendees[j].dataelements;
				    resp.result[i].attendees[j] = attendee;
				    resp.result[i].attendees[j].type = resp.data[i].relateddata.attendees[j].type;
				}	
			}
			return resp.result;
		},
		
		parseMemberResp : function(resp){
			widget.data.csrf = resp.csrf; //setting the csrf in widget data
			resp.result = new Array();
			var respLen = resp.data.length;
			for(var i = 0; i< respLen; i++){
				resp.result[i] = resp.data[i].dataelements;
				if(resp.result[i].id === undefined){
					resp.result[i].id = resp.data[i].id;
				}
				if(resp.result[i].physicalid === undefined){
					resp.result[i].physicalid = resp.data[i].id;
				}
				if(resp.result[i].type === undefined){
					resp.result[i].type = resp.data[i].type;
				}
				if(resp.result[i].relId === undefined){
					resp.result[i].relId = resp.data[i].relId;
				}
				
				if(resp.result[i].company != undefined){
				var strCompany = resp.result[i].company;
				resp.result[i].company = new Array();
				resp.result[i].company = strCompany.split("\u0007");
				}
			}
			return resp.result;
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
		}
	});


	return ParseJSONUtil;
});

/* global define, widget */
/**
  * @overview Route Management - Route Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/MeetingModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENXMeetingMgmt/Utilities/DataFormatter',
    'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
    'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
    'DS/WebappsUtils/WebappsUtils',
    'DS/ENXMeetingMgmt/Utilities/Utils',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
    ],
    function(
			TreeDocument,
			TreeNodeModel,
			DataFormatter,
			WrapperDataGridView,
			EnoviaBootstrap,
			WebappsUtils,
			Utils,
			NLS
    ) {
	'use strict';
	let model = new TreeDocument();
	let _openedMeetingModel;
	let createTreeDocumentModel = function(response){	
		model = new TreeDocument();	
	    model.prepareUpdate();	
	    response.forEach(function(dataElem) {	
	       var assigneesDiv = new UWA.Element("div", {
	            class:'members'
	        });
	        var tooltip = "";
	        var meetingAttendees = dataElem.attendees;
	        var len = meetingAttendees.length;
	        if(typeof meetingAttendees != 'undefined'){
	            for(var j=0; j< len ; j++){
	            	var meetingInfo = meetingAttendees[j];
	            	var assigneeType = meetingInfo.type;
                	var assigneeUserName = meetingInfo.name;
                	var assigneefullName = meetingInfo.firstname +" "+ meetingInfo.lastname;
	                if(meetingAttendees[j]!="" && assigneeType != "Collab Space"){
	                	var assignee = new UWA.Element("div", {
	                        class:'assignee'
	                    });
	                	let userIcon = "";
	                	if(assigneeType == "Person"){
		                	let ownerIconUrl;
		                	ownerIconUrl= "/api/user/getpicture/login/"+assigneeUserName+"/format/normal";
		                	let swymOwnerIconUrl = EnoviaBootstrap.getSwymUrl()+ownerIconUrl;
		                    tooltip = tooltip + assigneefullName+ ",\n";
		                    if(EnoviaBootstrap.getSwymUrl()!=undefined){
		                    	userIcon = UWA.createElement('img', {
		                              class: "userIcon",
		                              src: swymOwnerIconUrl
		                          });
		                    } else {
			                    var iconDetails = getAvatarDetails(assigneefullName);
			                    userIcon = UWA.createElement('div', {
			                        html: iconDetails.avatarStr,
			                        class: "avatarIcon"
			                    });
			                    userIcon.style.setProperty("background",iconDetails.avatarColor);
		                    }
	                	}
	                	if(assigneeType == "Group" || assigneeType == "Group Proxy"){
	                		tooltip = tooltip + meetingInfo.title + "(User Group)" + ",\n";
	                		userIcon = UWA.createElement('img', {
	                              class: "userIcon",
	                              src: WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/16/I_UserGroup16.png'),
	                          });
	                	}
	                	if(userIcon!=""){
	                		userIcon.inject(assignee);
	                	}
	                    assignee.inject(assigneesDiv);
	                }
	            }
	        }
	        tooltip = tooltip.slice(0, -2);
	        assigneesDiv.set({
	             title: tooltip
	        });
	        dataElem.assigneesdiv = assigneesDiv.outerHTML;
	   
	        var root = new TreeNodeModel({
	            label: dataElem.subject,
	            id: dataElem.id,
	            width: 300,
	            grid: DataFormatter.gridData(dataElem),
	            "thumbnail" : WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/iconLargeMeeting.png'),
	            description : onMeetingNodeCellRequest(dataElem.state,assigneesDiv,dataElem.startDate,tooltip),
	            icons : [WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/iconLargeMeeting.png')],
	            contextualMenu : ["My context menu"],
	            
	            shouldAcceptDrop: true
	        });
	        
	        model.addRoot(root); 
	    }); 
	    model.pushUpdate();
	    registerEvents();
	    return model;
	};
	
	let appendRows = function(dataElem){		
	    model.prepareUpdate();	
	    
	       var assigneesDiv = new UWA.Element("div", {
	            class:'members'
	        });
	        var tooltip = "";
	        var meetingAttendees = dataElem.attendees;
	        
	        if(typeof meetingAttendees != 'undefined'){
	            for(var j=0; j< meetingAttendees.length ; j++){
	            	var meetingInfo = meetingAttendees[j];
	            	var assigneeType = meetingInfo.type;
                	var assigneeUserName = meetingInfo.name;
                	var assigneefullName = meetingInfo.firstname +" "+ meetingInfo.lastname;
	                if(meetingAttendees[j]!="" && assigneeType != "Collab Space"){
	                	var assignee = new UWA.Element("div", {
	                        class:'assignee'
	                    });
	                	let userIcon = "";
	                	if(assigneeType == "Person"){
		                	let ownerIconUrl;
		                	ownerIconUrl= "/api/user/getpicture/login/"+assigneeUserName+"/format/normal";
		                	let swymOwnerIconUrl = EnoviaBootstrap.getSwymUrl()+ownerIconUrl;
		                    tooltip = tooltip + assigneefullName+ ",\n";
		                    if(EnoviaBootstrap.getSwymUrl()!=undefined){
		                    	userIcon = UWA.createElement('img', {
		                              class: "userIcon",
		                              src: swymOwnerIconUrl
		                          });
		                    } else {
			                    var iconDetails = getAvatarDetails(assigneefullName);
			                    userIcon = UWA.createElement('div', {
			                        html: iconDetails.avatarStr,
			                        class: "avatarIcon"
			                    });
			                    userIcon.style.setProperty("background",iconDetails.avatarColor);
		                    }
	                	}
	                	if(assigneeType == "Group" || assigneeType == "Group Proxy"){
	                		tooltip = tooltip + meetingInfo.title + "(User Group)" + ",\n";
	                		userIcon = UWA.createElement('img', {
	                              class: "userIcon",
	                              src: WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/16/I_UserGroup16.png'),
	                          });
	                	}
	                	if(userIcon!=""){
	                		userIcon.inject(assignee);
	                	}
	                    assignee.inject(assigneesDiv);
	                }
	            }
	        }
	        tooltip = tooltip.slice(0, -2);
	        assigneesDiv.set({
	             title: tooltip
	        });
	        dataElem.assigneesdiv = assigneesDiv.outerHTML;
	   
	        var root = new TreeNodeModel({
	            label: dataElem.subject,
	            id: dataElem.id,
	            width: 300,
	            grid: DataFormatter.gridData(dataElem),
	            "thumbnail" : WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/iconLargeMeeting.png'),
	            description : onMeetingNodeCellRequest(dataElem.state,assigneesDiv,dataElem.startDate,tooltip),
	            icons : [WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/iconLargeMeeting.png')],
	            contextualMenu : ["My context menu"],
	            
	            shouldAcceptDrop: true
	        });
	        
	        model.getXSO().add(root);
	        model.addChild(root, 0);
			
	        model.unselectAll();			
			model.pushUpdate();
			noMeetingPlaceHolderHide();
			widget.meetingEvent.publish('meeting-DataGrid-on-dblclick', {model:DataFormatter.gridData(dataElem)});
			return root;
	};
	
	let onMeetingNodeCellRequest = function (state,assignees,startdate,tooltip) {
	    var commandsDiv="";
	    var cellValue = NLS["state_"+state];
	    var strdate = Utils.formatDateTimeString(new Date(startdate));
	    commandsDiv = UWA.createElement('div', {
            class: "meeting-task-state-and-assignee"
        });
        
        UWA.createElement('div',{
	        "html": strdate,
	        "class":"meeting-state-date"
	    }).inject(commandsDiv);
        
	    UWA.createElement('span',{
	        "html": cellValue,
	        "class":"meeting-state-title "+state.toUpperCase().replace(/ /g,'')
	    }).inject(commandsDiv);
	    
	    assignees.setStyle("display","inline");
	    assignees.setStyle("padding-left",3+"px");
	    assignees.set({
            title: tooltip
       });
	    assignees.inject(commandsDiv);
	    return commandsDiv.outerHTML;
	};
	
	let updateRow = function(dataElem){
	    var assigneesDiv = new UWA.Element("div", {
            class:'members'
        });
        var tooltip = "";
        var meetingAttendees = dataElem.attendees;
        if(typeof meetingAttendees != 'undefined'){
	            for(var j=0; j< meetingAttendees.length ; j++){
	            	var meetingInfo = meetingAttendees[j];
	            	var assigneeType = meetingInfo.type;
                	var assigneeUserName = meetingInfo.name;
                	var assigneefullName = meetingInfo.firstname +" "+ meetingInfo.lastname;
	                if(meetingAttendees[j]!="" && assigneeType != "Collab Space"){
	                	var assignee = new UWA.Element("div", {
	                        class:'assignee'
	                    });
	                	let userIcon = "";
	                	if(assigneeType == "Person"){
		                	let ownerIconUrl;
		                	ownerIconUrl= "/api/user/getpicture/login/"+assigneeUserName+"/format/normal";
		                	let swymOwnerIconUrl = EnoviaBootstrap.getSwymUrl()+ownerIconUrl;
		                    tooltip = tooltip + assigneefullName+ ",\n";
		                    if(EnoviaBootstrap.getSwymUrl()!=undefined){
		                    	userIcon = UWA.createElement('img', {
		                              class: "userIcon",
		                              src: swymOwnerIconUrl
		                          });
		                    } else {
			                    var iconDetails = getAvatarDetails(assigneefullName);
			                    userIcon = UWA.createElement('div', {
			                        html: iconDetails.avatarStr,
			                        class: "avatarIcon"
			                    });
			                    userIcon.style.setProperty("background",iconDetails.avatarColor);
		                    }
	                	}
	                	if(assigneeType == "Group" || assigneeType == "Group Proxy"){
	                		tooltip = tooltip + meetingInfo.title + "(User Group)" + ",\n";
	                		userIcon = UWA.createElement('img', {
	                              class: "userIcon",
	                              src: WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/16/I_UserGroup16.png'),
	                          });
	                	}
	                	if(userIcon!=""){
	                		userIcon.inject(assignee);
	                	}
	                    assignee.inject(assigneesDiv);
	                }
	            }
	        }
	        tooltip = tooltip.slice(0, -2);
	        assigneesDiv.set({
	             title: tooltip
	        });
	    dataElem.assigneesdiv = assigneesDiv.outerHTML;
		if(dataElem.id && dataElem.id != ""){
			var rowModelToUpdate = getRowModelById(dataElem.id);
			// Update the grid content //
			rowModelToUpdate.updateOptions({grid:DataFormatter.gridData(dataElem)});
			// Update the tile content //
			rowModelToUpdate.updateOptions(
					{
						label:dataElem.subject,
						description : onMeetingNodeCellRequest(dataElem.state,assigneesDiv,dataElem.startDate,tooltip)
					});
		}
	};
	
    let getAvatarDetails= function (name) {
        var options = {};
        var backgroundColors = [
          [7, 139, 250],
          [249, 87, 83],
          [111, 188, 75],
          [158, 132, 106],
          [170, 75, 178],
          [26, 153, 123],
          [245, 100, 163],
          [255, 138, 46],
        ]
        var initials = name.match(/\b\w/g);
        var firstLetter = initials[0].toUpperCase();
        var lastLetter = initials[initials.length - 1].toUpperCase();

        var avatarStr = (firstLetter + lastLetter);

        var i = Math.ceil((firstLetter.charCodeAt(0) + lastLetter.charCodeAt(0)) % backgroundColors.length);
        var avatarColor = "rgb(" + backgroundColors[i][0] + "," + backgroundColors[i][1] + "," + backgroundColors[i][2] + ")";

        options.name = name;
        options.avatarStr = avatarStr;
        options.avatarColor = avatarColor;

        return options;
      };
	
	let getRowModelById = function(id){
		return WrapperDataGridView.getRowModelById(model,id);
	};
	
	let deleteRowModelByIds = function(ids){
		WrapperDataGridView.deleteRowModelByIds(model,ids);
		noMeetingPlaceHolder();		
	};
	
	let noMeetingPlaceHolder = function(){
		if(checkHiddenNodesCount()== 0){
            widget.meetingEvent.publish('show-no-meeting-placeholder');
        }
	};
	
	let checkHiddenNodesCount= function(){
		let count = 0;
		model.getChildren().forEach(node => {if(!node._isHidden)count++;});
		return count;
	};
	let noMeetingPlaceHolderHide = function(){
		if(checkHiddenNodesCount()!= 0){
            widget.meetingEvent.publish('hide-no-meeting-placeholder');
        }
	};
	
	let destroy = function(){
		model = new TreeDocument();
	};
	
	let registerEvents = function(){
		widget.meetingEvent.subscribe('meeting-DataGrid-on-dblclick', function (data) {  
			_openedMeetingModel = data;
		});
		widget.meetingEvent.subscribe('meeting-back-to-summary', function (data) {
			_openedMeetingModel = undefined;      	  
        });
	};
	
	let getOpenedMeetingModel = function(){
		return _openedMeetingModel;
	}
	
	let deleteRowModelSelected = function(){
		let selectedRows = WrapperDataGridView.deleteRowModelSelected(model);
		nomeetingsPlaceHolder();
		return selectedRows;
	};
	
	let nomeetingsPlaceHolder = function(){
		if(checkHiddenNodesCount()== 0){
            widget.meetingEvent.publish('show-no-meeting-placeholder');
        }
	};
	
	let deleteRowModelByIndex = function(index){
		WrapperDataGridView.deleteRowModelByIndex(model,index);
		nomeetingsPlaceHolder();
	};
	
	let RouteModel = {
			createModel : (response) => {return createTreeDocumentModel(response);},
			appendRows : (data) => {return appendRows(data);},
			updateRow : (data) => {return updateRow(data);},
			getModel : () => {return model;},
			getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
			getRowModelById: (id) => {return getRowModelById(id);},
			deleteRowModelByIds: (ids) => {return deleteRowModelByIds(ids);},
			destroy : () => {return destroy();},
			getOpenedMeetingModel : () => {return getOpenedMeetingModel();},
			deleteRowModelSelected : () => {return deleteRowModelSelected();},
			deleteRowModelByIndex : (index) => {return deleteRowModelByIndex(index);}

	}
	return RouteModel;

});


/* global define, widget */
/**
  * @overview Meeting Widget - Route Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENXMeetingMgmt/Utilities/DataFormatter',
    'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
    'DS/WebappsUtils/WebappsUtils',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
    ],
    function(
			TreeDocument,
			TreeNodeModel,
			DataFormatter,
			WrapperDataGridView,
			WebappsUtils,
			NLS
    ) {
	'use strict';
	let model = new TreeDocument();
	let createTreeDocumentModel = function(response){		
	    model.prepareUpdate();	
	    response.forEach(function(dataElem) {
	    	if(!dataElem.dataelements) {
	    		dataElem.dataelements = {};
	    	}
	    	if(!dataElem.dataelements.title || dataElem.dataelements.title==""){
	    		dataElem.dataelements.title = dataElem.dataelements.name;
	    	}
	        var root = new TreeNodeModel({
	            label: dataElem.dataelements.title,
	            //id: dataElem1.objectId,
	            width: 300,
	            grid: DataFormatter.agendaTopicItems(dataElem),
	            "thumbnail" : dataElem.dataelements.image,
                "subLabel": dataElem.dataelements.stateNLS,
	            icons:[dataElem.dataelements.typeicon],
                description : dataElem.dataelements.modified,
                contextualMenu : ["My context menu"]
	        });
	        
	        model.addRoot(root); 
	    }); 
	    model.pushUpdate();
	    return model;
	};
	
	let appendRows = function(response){
		if(response) {
			 model.prepareUpdate();	
			    response.forEach(function(dataElem) {
			    	if(!dataElem.dataelements) {
			    		dataElem.dataelements = {};
			    	}
			    	if(!dataElem.dataelements.title || dataElem.dataelements.title==""){
			    		dataElem.dataelements.title = dataElem.dataelements.name;
			    	}
			        var root = new TreeNodeModel({
			            label: dataElem.dataelements.title,
			            //id: dataElem1.objectId,
			            width: 300,
			            grid: DataFormatter.agendaTopicItems(dataElem),
			            "thumbnail" : dataElem.dataelements.image,
		                "subLabel": dataElem.dataelements.stateNLS,
			            icons:[dataElem.dataelements.typeicon],
		                description : dataElem.dataelements.modified,
			        });
			        
			        model.addRoot(root); 
			    }); 
			    model.pushUpdate();
		}
	};
	
	let destroy = function(){
		model = new TreeDocument();
	};
	
	let getAttachmentIDs = function(){
		if( model!= undefined){
			var children = model.getChildren();
			var id=[];
			for(var i=0;i<children.length;i++){
				id.push(children[i]._options.grid.id);
			}
			return id;
		}
	};
	
	let deleteSelectedRows = function(canRemove,data){
		var selRows = model.getSelectedNodes();
		model.prepareUpdate();	
		 for (var index = 0; index < selRows.length; index++) {
			 if(canRemove) {
				 var children = data.model.Data;
					for(var i=0;i<children.length;i++){
						if(children[i].id== selRows[index].options.grid.id) {
							
							data.model.RemoveData.push(children[i].id);
							//children.splice(i,1);
						}
					}
				}
			 model.removeRoot(selRows[index]);
		 }
		model.pushUpdate();
		if(model.getChildren().length==0){
			
			var gridView = document.querySelector(".agendaTopicItesm-gridView-View");
            if(gridView){
                gridView.addClassName("hideView");
            }
		    //widget.meetingEvent.publish('show-no-attachment-placeholder');
        }
	};
	
	

	let deleteAllChildren = function(){
		if( model!= undefined){
			model.prepareUpdate();	
			var children = model.getChildren();
			for(var i=0;i<children.length;i++){
				model.prepareUpdate();	
				model.removeRoot(children[i]);
				model.pushUpdate();
			}
		}
	};
	
	
	let MeetingAttachmentModel = {
			createModel : (response) => {return createTreeDocumentModel(response);},
			getModel : () => {return model;},
			destroy : () => {return destroy();},
			getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
			getAttachmentIDs: () => {return getAttachmentIDs();},
			appendRows : (data) => {return appendRows(data);},
			deleteSelectedRows : (canRemove,data) => {return deleteSelectedRows(canRemove,data);},
			deleteAllChildren : () => {return deleteAllChildren();}

	}
	return MeetingAttachmentModel;

});


/* global define, widget */
/**
  * @overview Meeting Widget - Route Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/MeetingAgendaModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENXMeetingMgmt/Utilities/DataFormatter',
    'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
    'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
    'DS/WebappsUtils/WebappsUtils',
    'DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
    ],
    function(
			TreeDocument,
			TreeNodeModel,
			DataFormatter,
			WrapperDataGridView,
			EnoviaBootstrap,
			WebappsUtils,
			AgendaTopicItemsModel,
			NLS
    ) {
	'use strict';
	let model = new TreeDocument();
	let createTreeDocumentModel = function(response){
		meetingInfo = {};
		var finalresponse = prepareAgendaModel(response);
		response = finalresponse.response;
		meetingInfo.nextSequence = finalresponse.nextSequence;
		model.prepareUpdate();	
		 var totalDuration=0;
	    response.forEach(function(dataElem) {	
	        var root = new TreeNodeModel({
	            id: dataElem.objectId,
	            width: 300,
	            grid: DataFormatter.agendaGridData(dataElem)
	        });
	        totalDuration=totalDuration + parseInt(dataElem.relelements.topicDuration);
	        model.addRoot(root); 
	    }); 
	    widget.setValue("SumOfAgendaDuration", totalDuration);
	    model.pushUpdate();
	    return model;
	};
	
	
	
	let prepareAgendaModel = function (response){
		var mapping = {};
		var finalMappingResponse = {};
		finalMappingResponse.response = [];
		var finalresponse = [];
		if(!response || response.length==0) {
			finalMappingResponse.nextSequence = 1;
		}
		response.forEach(function(dataElem) {	
			var sequence = dataElem.relelements.sequence;
			if(!mapping[sequence]){
				var agendadata = {};
				var data = [];
				agendadata.relelements =  dataElem.relelements;
				var agendaTopicItem = {}
				agendaTopicItem.id = dataElem.id;
				agendaTopicItem.type = dataElem.type;
				agendaTopicItem.identifier = dataElem.identifier;
				agendaTopicItem.source = dataElem.source;
				agendaTopicItem.relId = dataElem.relId;
				agendaTopicItem.cestamp = dataElem.cestamp;
				agendaTopicItem.dataelements =  dataElem.dataelements;
				agendaTopicItem.relelements =  dataElem.relelements;
				data.push(agendaTopicItem);
				agendadata.data = data;
				mapping[sequence] = agendadata;
				finalresponse.push(mapping[sequence]);
				finalMappingResponse.nextSequence = parseInt(sequence)+1;
				finalMappingResponse.response =  finalresponse;
				
			} else {
				var data =mapping[sequence].data;
				var agendaTopicItem = {};
				agendaTopicItem.id = dataElem.id;
				agendaTopicItem.type = dataElem.type;
				agendaTopicItem.identifier = dataElem.identifier;
				agendaTopicItem.source = dataElem.source;
				agendaTopicItem.relId = dataElem.relId;
				agendaTopicItem.cestamp = dataElem.cestamp;
				agendaTopicItem.dataelements =  dataElem.dataelements;
				agendaTopicItem.relelements =  dataElem.relelements;
				data.push(agendaTopicItem);
			}
		});
		return finalMappingResponse;
	}
	
    let appendRows = function(response){
    	model.prepareUpdate();	
    	if(response.data){    		
    		meetingInfo.nextSequence = meetingInfo.nextSequence+1;
    		var data = response.data;
    		var finalresponse = prepareAgendaModel(data);
    		data = finalresponse.response;
    		data.forEach(function(dataElem) {	
    			//AgendaTopicItemsModel.appendRows(dataElem.data);
    			AgendaTopicItemsModel.destroy();
    			AgendaTopicItemsModel.createModel(dataElem.data);
     	        var root = new TreeNodeModel({
     	            id: dataElem.objectId,
     	            width: 300,
     	            grid: DataFormatter.agendaGridData(dataElem)
     	        });
     	        
     	        model.addRoot(root); 
     	    }); 
     	    model.pushUpdate();
     	   if(model.getChildren().length!=0){
   		    widget.meetingEvent.publish('hide-no-agenda-placeholder');
   		   
           }
    	}
    	 
    };
    
	
	let updateRow = function(dataElem){ 
		if(dataElem.data && dataElem.data[0]!=""){
			var rowModelToUpdate = WrapperDataGridView.getSelectedRowsModel(model);
	/*		var orgGrid= rowModelToUpdate.data[0].options.grid;
			if(dataElem.data[0].relelements.responsibility){
				orgGrid.Speaker = dataElem.data[0].relelements.responsibility;
				orgGrid.SpeakerId = dataElem.data[0].relelements.responsibileOID;
			}
			
			orgGrid.Duration = dataElem.data[0].relelements.topicDuration;
			orgGrid.Topic= dataElem.data[0].relelements.topic;*/
			//orgGrid.Role=updatedRole;
			//orgGrid.RoleDisplay=subLableValue;
			// Update the grid content //
			//rowModelToUpdate.data[0].updateOptions({grid:orgGrid});
			var finalresponse = prepareAgendaModel(dataElem.data);
			var updateData = finalresponse.response[0];
			//AgendaTopicItemsModel.appendRows(updateData.data);
			AgendaTopicItemsModel.destroy();
			AgendaTopicItemsModel.createModel(updateData.data);
 	    
			rowModelToUpdate.data[0].updateOptions({grid:DataFormatter.agendaGridData(updateData)});
			
			// Update the tile content //
			/*rowModelToUpdate.data[0].updateOptions(
					{
						"subLabel": subLableValue,
					});*/
		}

	};
	let setContextMeetingInfo = function(contextmeetinginfo){
		if(contextmeetinginfo) {
			contextmeetinginfo.nextSequence = meetingInfo.nextSequence;
		}
		meetingInfo= contextmeetinginfo;
	};
	
	let meetingInfo = {
		
	};
	
	let destroy = function(){
		model = new TreeDocument();
	};
	let deleteSelectedRows = function(){
		var selRows = model.getSelectedNodes();
		model.prepareUpdate();	
		 for (var index = 0; index < selRows.length; index++) {
			 model.removeRoot(selRows[index]);
			 if(selRows[index].options.grid.Sequence == (meetingInfo.nextSequence-1)){
				 meetingInfo.nextSequence =meetingInfo.nextSequence-1; 
			 }
			 
		 }
		AgendaTopicItemsModel.deleteAllChildren();
		model.pushUpdate();
		var nextSequence = 1;
		model.getChildren().forEach(function(dataElem) {	
			nextSequence = parseInt(dataElem.options.grid.Sequence)+1;
	    });

		meetingInfo.nextSequence =nextSequence;
		if(model.getChildren().length==0){
		    widget.meetingEvent.publish('show-no-agenda-placeholder');
        }
	};
	
	
	let updateMeetingInfo = function (resp){
		meetingInfo.model.Assignees = resp.attendees;
		meetingInfo.model.ModifyAccess = resp.modifyAccess;
	}
    
	let MeetingAgendaModel = {
			createModel : (response) => {return createTreeDocumentModel(response);},
			getModel : () => {return model;},
			updateRow : (data) => {return updateRow(data);},
			destroy : () => {return destroy();},
			setContextMeetingInfo :(contextmeetinginfo) => {return setContextMeetingInfo(contextmeetinginfo);},
			meetingInfo:()=>{return meetingInfo; },
			appendRows : (data) => {return appendRows(data);},
			getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
			prepareAgendaModel : (response) => {return prepareAgendaModel(response);},
			updateMeetingInfo: (response) => {return updateMeetingInfo(response);},
			deleteSelectedRows : () => {return deleteSelectedRows();}
			

	}
	return MeetingAgendaModel;

});


/* global define, widget */
/**
  * @overview Meeting Widget - Route Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/MeetingAttachmentModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENXMeetingMgmt/Utilities/DataFormatter',
    'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
    'DS/WebappsUtils/WebappsUtils',
    'DS/ENXMeetingMgmt/Utilities/Utils',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
    ],
    function(
			TreeDocument,
			TreeNodeModel,
			DataFormatter,
			WrapperDataGridView,
			WebappsUtils,
			Utils,
			NLS
    ) {
	'use strict';
	let model = new TreeDocument();
	let createTreeDocumentModel = function(response){		
	    model.prepareUpdate();	
	    response.forEach(function(dataElem) {
	     var dataElem1 = dataElem.dataelements;	
	        var root = new TreeNodeModel({
	            label: dataElem1.title,
	            //id: dataElem1.objectId,
	            width: 300,
	            grid: DataFormatter.attachmentGridData(dataElem),
	            "thumbnail" : dataElem1.image,
                "subLabel": dataElem1.stateNLS,
                "icons":[dataElem1.typeicon],
                description : Utils.formatDateTimeString(new Date(dataElem1.modified)),
                contextualMenu : ["My context menu"]
	        });
	        
	        model.addRoot(root); 
	    }); 
	    model.pushUpdate();
	    return model;
	};
	
	let appendRows = function(dataElem){
		model.prepareUpdate();	
		dataElem.forEach((elem) => {
		    var dataElem1 = elem.dataelements;	 
			var root = new TreeNodeModel({
                label: dataElem1.title,
                width: 300,
                grid: DataFormatter.attachmentGridData(elem),
  	          	"thumbnail" : dataElem1.image,
  	          	"subLabel": dataElem1.stateNLS,
  	          	"icons" :[dataElem1.typeicon],
  	          	description : Utils.formatDateTimeString(new Date(dataElem1.modified)),
  	          	contextualMenu : ["My context menu"]
        	});
      																		
			model.addRoot(root);
		});
		
		model.pushUpdate();
		if(model.getChildren().length!=0){
		    widget.meetingEvent.publish('hide-no-attachment-placeholder');
		   
        }
	};
	
	let destroy = function(){
		model = new TreeDocument();
	};
	
	let getAttachmentIDs = function(){
		if( model!= undefined){
			var children = model.getChildren();
			var id=[];
			for(var i=0;i<children.length;i++){
				id.push(children[i].options.grid.physicalId);
			}
			return id;
		}
	};
	
	let deleteSelectedRows = function(){
		var selRows = model.getSelectedNodes();
		model.prepareUpdate();	
		 for (var index = 0; index < selRows.length; index++) {
			 model.removeRoot(selRows[index]);
		 }
		model.pushUpdate();
		if(model.getChildren().length==0){
		    widget.meetingEvent.publish('show-no-attachment-placeholder');
        }
	};
	
	let MeetingAttachmentModel = {
			createModel : (response) => {return createTreeDocumentModel(response);},
			getModel : () => {return model;},
			destroy : () => {return destroy();},
			getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
			getAttachmentIDs: () => {return getAttachmentIDs();},
			appendRows : (data) => {return appendRows(data);},
			deleteSelectedRows : () => {return deleteSelectedRows();}

	}
	return MeetingAttachmentModel;

});


/* global define, widget */
/**
 * @overview Meeting - ENOVIA Bootstrap file to interact with the platform
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Services/MeetingServices',
        [
         "UWA/Core",
         'UWA/Class/Promise',
         'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
         'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
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

    let MeetingServices,_deleteMeetingAgenda, _fetchAllMeetings,_fetchMeetingById,_fetchMeetingAgendas,
		_deleteMeeting,_deleteAttachment,_addAttachment,_fetchMeetingAttachments,_updateMeetingAgenda,
		_createMeetingAgenda,_fetchMembers,_addMembers,_deleteMember,_updateMeetingProperties,_getContentInfo,
		_fetchAllowedAttachmentTypesForMeeting,_createAgendaDecision,_addAppliesToAgendaDecision;
    
    /*makes service call to bps.meeting i.e., /meetings to retrieve data definitions only
	@args: none
	@params: $definitions=nodata
	@ret: {items:[{...}]}
	*/
    let _getCustomPropertiesFromDB = function() {
		return new Promise(function(resolve, reject) {

			let getURL = EnoviaBootstrap.getMeetingServiceBaseURL() + "?$definition=nodata";
			let options = {};
			options.method = 'GET';
			options.headers = {
				'Content-Type': 'application/json'
			};		
					
			options.onComplete = function(data) {
				console.log("fetched all object properties from DB...");
				let tempObj = {};
				//definitions
				let res = JSON.parse(data).definitions;
				if (res) {
					
					let customFields = res.find((ele) => ele.name==='meeting-custom-fields');
					if (customFields&&customFields.items) 
						tempObj.items = customFields.items; //resolve({'items':customFields.items}); //items[] wrapped as object
					
				}
				else {
					console.log("no object definition found for /meetings?");
					reject({});
					return;
				}
				
				resolve(tempObj);
				
			}
			
			options.onFailure = function(err) {
				console.log("fetching object properties - ERR");
				reject(err);
			}
			
			WAFData.authenticatedRequest(getURL, options);

		});
	};
    
    _fetchAllMeetings = function(){
        return new Promise(function(resolve, reject) {
            let postURL= EnoviaBootstrap.getMeetingServiceBaseURL()+"?$include=attendees&currentMeetingFilter=myMeeting";
            let options = {};
            options.method = 'GET';
            options.timeout=0; 
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
                resolve(new ParseJSONUtil().parseCompleteResp(JSON.parse(serverResponse)));
            };	

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
                reject(respData);
             	}else{
             		reject(serverResponse);
             	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    
    _fetchMeetingById = function(meetingId){
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"?$include=attendees";
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
                resolve(new ParseJSONUtil().parseCompleteResp(JSON.parse(serverResponse)));
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
    
    
    _fetchMeetingAgendas = function(meetingId){
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"/agendaItemsnew?$include=attendees";
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
            	serverResponse= JSON.parse(serverResponse);
            	serverResponse= serverResponse.data;
            	resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse, respData) {
            	 if(respData){
             		reject(JSON.parse(respData));
             	}else{
                reject(JSON.parse(serverResponse));
             	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    
    _fetchMeetingAttachments = function(meetingId){
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/" + meetingId + "/attachments";
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
            	serverResponse= JSON.parse(serverResponse);
            	serverResponse= serverResponse.data;
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
    
    _deleteMeeting = function(ids){
        return new Promise(function(resolve, reject) {
        	var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
    		// DELETE Method //
    		var options = {};
    		options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
    		options.method = 'DELETE';
    		options.type = 'json';
    		options.timeout = 0;
    		options.headers = {
    				'Content-Type' : 'application/ds-json',
    		};
    		options.wait = true;
    		options.data = JSON.stringify(payload);

            options.onComplete = function(serverResponse) {
                resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse,respData) {
                if(respData){
            		reject(respData);
            	}else{
            		reject(serverResponse);
            	}
            };

            WAFData.authenticatedRequest(EnoviaBootstrap.getMeetingServiceBaseURL(), options);	
        });
    };
        
      _deleteAttachment = function(meetingId,ids){
        return new Promise(function(resolve, reject) {
        	var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
    		// DELETE Method //
    		var url = EnoviaBootstrap.getMeetingServiceBaseURL()+'/'+ meetingId + '/attachments';
    		var options = {};
    		options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
    		options.method = 'DELETE';
    		options.type = 'json';
    		options.timeout = 0;
    		options.headers = {
    				'Content-Type' : 'application/ds-json',
    		};
    		options.wait = true;
    		options.data = JSON.stringify(payload);

            options.onComplete = function(serverResponse) {
                resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse,respData) {
                if(respData){
            		reject(respData);
            	}else{
            		reject(serverResponse);
            	}
            };

            WAFData.authenticatedRequest(url, options);	
        });
    };
    
     _deleteMember = function(meetingId,ids){
        return new Promise(function(resolve, reject) {
        	var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
    		// DELETE Method //
    		var url = EnoviaBootstrap.getMeetingServiceBaseURL()+'/'+ meetingId + '/attendees';
    		var options = {};
    		options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
    		options.method = 'DELETE';
    		options.type = 'json';
    		options.timeout = 0;
    		options.headers = {
    				'Content-Type' : 'application/ds-json',
    		};
    		options.wait = true;
    		options.data = JSON.stringify(payload);

            options.onComplete = function(serverResponse) {
            	
                resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse,respData) {
                if(respData){
            		reject(respData);
            	}else{
            		reject(serverResponse);
            	}
            };

            WAFData.authenticatedRequest(url, options);	
        });
    };
    
      _updateMeetingAgenda=function(jsonData,agendadata,meetnginfo){
    	var meetingId = meetnginfo.model.id;
        return new Promise(function(resolve, reject) {
        	let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"/agendaItemsnew";
        	if(agendadata && agendadata == "massupdate") {
        		postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"/agendaItemsnew?massupdate=true";
        	}
            
            var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);
    		
            let options = {};
            options.method = 'PUT';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data = JSON.stringify(payload);

            options.onComplete = function(serverResponse) {
            	serverResponse= JSON.parse(serverResponse);
            	resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse, respData) {
            	if(respData){
           		 	respData = JSON.parse(respData);
            		reject(respData);
            	}else{
            		serverResponse = JSON.parse(serverResponse);
            		reject(serverResponse);
            	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    
    
    _createMeetingAgenda=function(jsonData,agendadata,meetnginfo){
    	var meetingId = meetnginfo.model.id;
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"/agendaItemsnew";
            var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);
    		
            let options = {};
            options.method = 'POST';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data = JSON.stringify(payload);

            options.onComplete = function(serverResponse) {
            	serverResponse= JSON.parse(serverResponse);
            	resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse, respData) {
            	 if(respData){
            		 respData = JSON.parse(respData);
             		reject(respData);
             	}else{
             		serverResponse = JSON.parse(serverResponse);
                reject(serverResponse);
             	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    _addAttachment = function(model,data){
        return new Promise(function(resolve, reject) {
            var details = {};
            var selectedAttachmentItemsDetails = [];
            for (var i = 0; i < data.length; i++) { 
                details = {};
                details.label = data[i]['ds6w:label'];
                details.modified = data[i]['ds6w:modified'];
                details.status = data[i]['ds6w:status'];
                //  details.id[i] = data[i].id;
                selectedAttachmentItemsDetails.push(details);

            }
            var meetingId = model.TreedocModel.meetingId;
            var url = EnoviaBootstrap.getMeetingServiceBaseURL()+'/'+ meetingId + '/attachments';
            var selectedAttachmentItemsData = new Array();
            for (var i = 0; i < data.length; i++) { 
                var d = {
                        "id" : data[i].id   
                }
                selectedAttachmentItemsData.push(d);
            }
            var requestData = {
                    "csrf" : widget.data.csrf,
                    "data" : selectedAttachmentItemsData
            };
            var options = {};
            options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
            options.method = 'POST';
            options.type = 'json';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data  = { "csrf": widget.data.csrf };
            options.data = JSON.stringify(requestData);
            options.onComplete = function(serverResponse) {
                resolve(serverResponse.data);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(url, options);
        });
    };
    
    _updateMeetingProperties=function(jsonData,meetingData){
    	var meetingId = meetingData.model.id;
        return new Promise(function(resolve, reject) {
        	let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"?contextEdited="+meetingData.contextEdited;
        	
           // var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);
    		
            let options = {};
            options.method = 'PUT';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            //options.data = JSON.stringify(payload);
            options.data = JSON.stringify(jsonData);

            options.onComplete = function(serverResponse) {
            	serverResponse= JSON.parse(serverResponse);
            	resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse, respData) {
            	/*if(respData){
             		reject(respData);
             	}else{
                	reject(serverResponse);
             	}*/
             	if(respData){
            		reject(JSON.parse(respData));
            	}else{
            		reject(JSON.parse(serverResponse));
            	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    
     _addMembers = function(model,data){
        return new Promise(function(resolve, reject) {
            var details = {};
            var selectedMemberDetails = [];
            for (var i = 0; i < data.length; i++) { 
                details = {};
                details.label = data[i]['ds6w:label'];
                details.modified = data[i]['ds6w:modified'];
                details.status = data[i]['ds6w:status'];
                selectedMemberDetails.push(details);
            }
            var meetingId = model.TreedocModel.meetingId;
            var url = EnoviaBootstrap.getMeetingServiceBaseURL()+'/'+ meetingId + '/attendees';
            var selectedMembersData = new Array();
            for (var i = 0; i < data.length; i++) { 
                var d = {
                        "id" : data[i].id   
                }
                selectedMembersData.push(d);
            }
            var requestData = {
                    "csrf" : widget.data.csrf,
                    "data" : selectedMembersData
            };
            var options = {};
            options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
            options.method = 'POST';
            options.type = 'json';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data  = { "csrf": widget.data.csrf };
            options.data = JSON.stringify(requestData);
            options.onComplete = function(serverResponse) {
                //resolve(serverResponse);
                resolve(new ParseJSONUtil().parseMemberResp(serverResponse));
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(url, options);
        });
    };
    
   let _makeWSCall  = function (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) {

		var options = options || null;
		var url = "";
		if (options != null && options.isfederated != undefined && options.isfederated == true)
			url =	EnoviaBootstrap.getSearchUrl()+ URL;
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
		if (url.indexOf("?") == -1) {
			url = url + "?tenant=" + widget.getPreference("collab-storage").value + "&timestamp=" + timestamp;
		} else {
			url = url + "&tenant=" + widget.getPreference("collab-storage").value + "&timestamp=" + timestamp;
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
			console.log("Error Detail: " + errDetailds);
			console.log("Error Data: " + JSON.stringify(errData));


			userCallbackOnFailure(errDetailds, errData);
		};

		queryobject.onTimeout = function () {
			console.log("Timedout for url: " + url);
			//ChgErrors.error("Webservice Timedout, please refresh and try again.");
			if(widget.body){
				Mask.unmask(widget.body);
			}
		}

		WAFData.authenticatedRequest(url, queryobject);
	};
	
	_fetchMembers = function(meetingId){
        return new Promise(function(resolve, reject) {
            let postURL= EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+ meetingId +"/attendees";
            let options = {};
            options.method = 'GET';
            options.timeout=0; 
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
               /* serverResponse= JSON.parse(serverResponse);
            	serverResponse= serverResponse.data;
            	resolve(serverResponse);*/
            	resolve(new ParseJSONUtil().parseMemberResp(JSON.parse(serverResponse)));
            };	

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
                reject(respData);
             	}else{
             		reject(serverResponse);
             	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    _deleteMeetingAgenda =function(meetingId,jsonData){
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"/"+meetingId+"/agendaItemsnew";
            var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);
    		
            let options = {};
            options.method = 'DELETE';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data = JSON.stringify(payload);

            options.onComplete = function(serverResponse) {
            	serverResponse= JSON.parse(serverResponse);
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

	_getContentInfo = function(contentIds){
        return new Promise(function(resolve, reject) {
            let url = EnoviaBootstrap.get6WServiceBaseURL()+'/bps.routeContents?&$fields=all,!image,!canDeleteContent';
            let selectedContentItemsData = contentIds.join();           
            /*contentIds.forEach(function(contentId) {
            	 selectedContentItemsData += contentId + ",";
            });
            selectedContentItemsData = selectedContentItemsData.substring(0, selectedContentItemsData.length - 1);*/
//            let requestData = {
//                    "csrf" : widget.data.csrf,
//                    "data" : selectedContentItemsData
//            };
            let options = {};
            options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
            options.method = 'POST';
          //  options.type = 'json';
            options.data = '$ids='+selectedContentItemsData;
            options.headers = {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                    //'Accept' : 'application/ds-json'
            };
       //     options.data = JSON.stringify(requestData);
            options.onComplete = function(serverResponse) {
                resolve(JSON.parse(serverResponse));
            };  

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
            		reject(respData);
             	}else{
             		reject(serverResponse);
             	}
            };

            WAFData.authenticatedRequest(url, options);
        });
    };

	_fetchAllowedAttachmentTypesForMeeting = function(){
	   let types = ["DOCUMENTS"];

	   return new Promise(function(resolve, reject) {	
		   let typeDerivativesServiceUrl=EnoviaBootstrap.getMeetingServiceBaseURL()+"/typeDerivatives";
	      // var typeDerivativesServiceUrl = EnoviaBootstrap.get3DSpaceURL() + '/resources/v1/modeler/documents/typeDerivatives';
	       let options = {};
           options.method = 'POST';
           options.headers = {
                   'Content-Type' : 'application/ds-json',
           };
           var requestData = {
                   "csrf" : widget.data.csrf,
                   "data" : types.map(function (type) {
                       return {
                           'type': type
                       };
                   })
           };
           options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
           options.method = 'POST';
           options.data = JSON.stringify(requestData);

           options.onComplete = function(serverResponse) {
        	   let response = JSON.parse(serverResponse)
        	   if (response.success) {
                   var returnInfo = {};
                   response.data.forEach(type => {
                       types[type.type] = type.children.map((subType) => { return subType.type; });
                       types[type.type] = types[type.type].filter(function (el) { return el;/*filter will only pass truthy values */ });
                       if (types[type.type].length == 0) types[type.type].push(type.type);//Add the same type as derivative if server doesn not give any derivative type, due to not recognizing it 
                       returnInfo[type.type] = types[type.type];
                   });
                   resolve(returnInfo);
               }
           };	
           WAFData.authenticatedRequest(typeDerivativesServiceUrl, options);	
       		//EnoviaBootstrap.decisionAuthReq(typeDerivativesServiceUrl, options);	
       });	 
   }; 

	_createAgendaDecision=function(jsonData,meetnginfo){
		var meetingId = meetnginfo.model.meetingId;
		return new Promise(function(resolve, reject) {
           let postURL=EnoviaBootstrap.getDecisionServiceBaseURL();
           var payload = new ParseJSONUtil().createCSRFForGivenRequest(jsonData);
   		
           let options = {};
           options.method = 'POST';
           options.headers = {
                   'Content-Type' : 'application/ds-json',
           };
           options.data = JSON.stringify(payload);

           options.onComplete = function(serverResponse) {
           	serverResponse= JSON.parse(serverResponse);
           	resolve(serverResponse);
           };	

           options.onFailure = function(serverResponse, respData) {
        	   if(respData){
	          		respData = JSON.parse(respData);
	           		reject(respData);
           		}else{
           			serverResponse = JSON.parse(serverResponse);
           			reject(serverResponse);
           		}
           };

           WAFData.authenticatedRequest(postURL, options);	
       });
	};
	
	_addAppliesToAgendaDecision = function(model,data){
    	return new Promise(function(resolve, reject) {
            var details = {};
            var selectedAttachmentItemsDetails = [];
            for (var i = 0; i < data.length; i++) { 
                details = {};
                details.label = data[i]['ds6w:label'];
                details.modified = data[i]['ds6w:modified'];
                details.status = data[i]['ds6w:status'];
                //  details.id[i] = data[i].id;
                selectedAttachmentItemsDetails.push(details);

            }
            var decisionId = model.TreedocModel.decisionId;
            var url = EnoviaBootstrap.getDecisionServiceBaseURL()+'/'+ decisionId + '/appliesTo';
            var selectedAttachmentItemsData = new Array();
            for (var i = 0; i < data.length; i++) { 
                var d = {
                        "id" : data[i].id   
                }
                selectedAttachmentItemsData.push(d);
            }
            var requestData = {
                    "csrf" : widget.data.csrf,
                    "data" : selectedAttachmentItemsData
            };
            var options = {};
            options = UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);
            options.method = 'POST';
            options.type = 'json';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data  = { "csrf": widget.data.csrf };
            options.data = JSON.stringify(requestData);
            options.onComplete = function(serverResponse) {
            	serverResponse = serverResponse.data 
                resolve(serverResponse);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(url, options);
        });
    };

    MeetingServices={
            fetchAllMeetings: () => {return _fetchAllMeetings();},
            fetchMeetingById: (meetingId) => {return _fetchMeetingById(meetingId);},
            fetchMeetingAgendas: (meetingId) => {return _fetchMeetingAgendas(meetingId);},
            fetchMeetingAttachments: (meetingId) => {return _fetchMeetingAttachments(meetingId);},
            deleteMeeting: (ids) => {return _deleteMeeting(ids);},
            deleteAttachment: (meetingId,ids) => {return _deleteAttachment(meetingId,ids);},
            deleteMember: (meetingId,ids) => {return _deleteMember(meetingId,ids);},
            updateMeetingAgenda: (jsonData,agendadata,meetnginfo) => {return _updateMeetingAgenda(jsonData,agendadata,meetnginfo);},           
            deleteMeetingAgenda: (meetingId,jsonData) => {return _deleteMeetingAgenda(meetingId,jsonData);},           
            createMeetingAgenda: (jsonData,agendadata,meetnginfo) => {return _createMeetingAgenda(jsonData,agendadata,meetnginfo);},  
            addAttachment: (model,data) => {return _addAttachment(model,data);},
            makeWSCall: (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) => {return _makeWSCall(URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options);},
            fetchMembers: (meetingId) => {return _fetchMembers(meetingId);},
            addMembers: (model,data) => {return _addMembers(model,data);},
            updateMeetingProperties: (jsonData,meetingData) => {return _updateMeetingProperties(jsonData,meetingData);},
            getCustomPropertiesFromDB: () => {return _getCustomPropertiesFromDB();},
            getContentInfo: (contentIds) => {return _getContentInfo(contentIds);},
			fetchAllowedAttachmentTypesForMeeting: () => {return _fetchAllowedAttachmentTypesForMeeting();},
			createAgendaDecision: (jsonData,meetnginfo) => {return _createAgendaDecision(jsonData,meetnginfo);},
			addAppliesToAgendaDecision: (model,data) => {return _addAppliesToAgendaDecision(model,data);}
    };

    return MeetingServices;

});

/**
 * Route summary grid view custom column
 */

define('DS/ENXMeetingMgmt/View/Grid/MeetingGridCustomColumns', 
		[
		 'DS/Controls/Button',
		 'DS/Controls/TooltipModel',
		 'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		 'DS/ENXMeetingMgmt/Utilities/Utils',
		 'UWA/Drivers/Alone',
 		 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
		 ], 
		function(WUXButton, WUXTooltipModel,EnoviaBootstrap, Utils, Alone, NLS) {
	
    'use strict';
   
    let onMeetingNodeStateCellRequest = function (cellInfos) {
    	let reusableContent;    	
		if (!cellInfos.isHeader) {
			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_state_');
			 if (reusableContent) {
				 //cellInfos.cellView.getContent().setContent(reusableContent);
				 let state = cellInfos.nodeModel.options.grid.state || "";
				 reusableContent.getChildren()[0].setHTML(cellInfos.nodeModel.options.grid.Maturity_State);
				 reusableContent.getChildren()[0].setAttribute("class", "meeting-state-title "+state.toUpperCase().replace(/ /g,''));
				 cellInfos.cellView._setReusableContent(reusableContent);
			 }
		}
    };
    
    let onMeetingNodeDateCellRequest = function (cellInfos) {
    	let reusableContent;    	
		if (!cellInfos.isHeader) {
			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_startDate_');
			 if (reusableContent) {
				 let sdate = cellInfos.nodeModel.options.grid.startDate || "";
			/* 	 let dateobj = new Date(sdate);
				 let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
				 let strdate = dateobj.toLocaleDateString('default', options) +" "+ dateobj.toLocaleTimeString().replace(/(.*)\D\d+/, '$1'); */
				 let strdate = Utils.formatDateTimeString(new Date(sdate));
				 reusableContent.getChildren()[0].setHTML(strdate);
				 reusableContent.getChildren()[0].setAttribute("class", "meeting-state-title"+strdate);
				 cellInfos.cellView._setReusableContent(reusableContent); 
			 }
		}
    };
    
    let onMeetingNodeOwnerCellRequest= function (cellInfos) {
    	let reusableContent;    	
		if (!cellInfos.isHeader) {
			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_owner_');
			 if (reusableContent) {
				 //cellInfos.cellView.getContent().setContent(reusableContent);
				 var cellValue = cellInfos.nodeModel.options.grid.OwnerFullName || "";
				 var userName = cellInfos.nodeModel.options.grid.Owner || "";
				 var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
				 var iconDetails = getAvatarDetails(cellValue);
				 var swymOwnerIconUrl = EnoviaBootstrap.getSwymUrl()+ownerIconURL;
				 if(EnoviaBootstrap.getSwymUrl()!=undefined){
				     reusableContent.getChildren()[0].getChildren()[0].src=swymOwnerIconUrl;
				 }else{
    				 reusableContent.getChildren()[0].getChildren()[0].setHTML(iconDetails.avatarStr);
    				 reusableContent.getChildren()[0].getChildren()[0].setStyle("background",iconDetails.avatarColor);
				 }
				 reusableContent.getChildren()[1].setHTML(cellValue);
				 cellInfos.cellView._setReusableContent(reusableContent);
			 }
		}
	};
	
	
	 let onMeetingAgendaSpeakerCellRequest= function (cellInfos) {
	    	let reusableContent;    	
			if (!cellInfos.isHeader) {
				reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_speaker_');
				 if (reusableContent) {
					 //cellInfos.cellView.getContent().setContent(reusableContent);
					 var cellValue = cellInfos.nodeModel.options.grid.responsibility;
					 var userName = cellInfos.nodeModel.options.grid.Speaker;
					 var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
					 if(cellValue){
						 var iconDetails = getAvatarDetails(cellValue);
						 var swymOwnerIconUrl = EnoviaBootstrap.getSwymUrl()+ownerIconURL;
						 if(EnoviaBootstrap.getSwymUrl()!=undefined){
							 if(!reusableContent.getChildren()[0].getChildren()[0]){
									var ownerIcon = UWA.createElement('img', {
										class: "userIcon",
										src : ''
									});
									ownerIcon.inject(reusableContent.getChildren()[0]);								
							 }
						     reusableContent.getChildren()[0].getChildren()[0].src=swymOwnerIconUrl;
						 }else{
		    				 reusableContent.getChildren()[0].getChildren()[0].setHTML(iconDetails.avatarStr);
		    				 reusableContent.getChildren()[0].getChildren()[0].setStyle("background",iconDetails.avatarColor);
						 }
						 reusableContent.getChildren()[1].setHTML(cellValue);
						 cellInfos.cellView._setReusableContent(reusableContent);
					 } else {
						 if(reusableContent.getChildren()[0].getChildren()[0]) {
							 reusableContent.getChildren()[0].getChildren()[0].setHTML("");
							 reusableContent.getChildren()[0].getChildren()[0].setStyle("background","");
						 }
						 if(reusableContent.getChildren()[1]){
							 reusableContent.getChildren()[1].setHTML("");
						 }
						 if(EnoviaBootstrap.getSwymUrl()!=undefined && reusableContent.getChildren()[0].getChildren()[0]){
						     reusableContent.getChildren()[0].getChildren()[0].remove();
						 }
						 cellInfos.cellView._setReusableContent(reusableContent);
					 }
					 
				 }
			}
		};

	
	
   /* let onMeetingNodeAssigneesCellRequest= function (cellInfos) {
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
    let getAvatarDetails= function (name) {
        var options = {};
        var backgroundColors = [
          [7, 139, 250],
          [249, 87, 83],
          [111, 188, 75],
          [158, 132, 106],
          [170, 75, 178],
          [26, 153, 123],
          [245, 100, 163],
          [255, 138, 46],
        ]
        var initials = name.match(/\b\w/g);
		if (!Array.isArray(initials) || initials.length == 0) return {};
        var firstLetter = initials[0].toUpperCase();
        var lastLetter = initials[initials.length - 1].toUpperCase();

        var avatarStr = (firstLetter + lastLetter);

        var i = Math.ceil((firstLetter.charCodeAt(0) + lastLetter.charCodeAt(0)) % backgroundColors.length);
        var avatarColor = "rgb(" + backgroundColors[i][0] + "," + backgroundColors[i][1] + "," + backgroundColors[i][2] + ")";

        options.name = name;
        options.avatarStr = avatarStr;
        options.avatarColor = avatarColor;

        return options;
      };
      let MeetingGridViewOnCellRequest={
    		  
    		  onMeetingNodeStateCellRequest : (cellInfos) => { return onMeetingNodeStateCellRequest(cellInfos);},
    		  onMeetingNodeDateCellRequest : (cellInfos) => { return onMeetingNodeDateCellRequest(cellInfos);},
    		  //onMeetingNodeAssigneesCellRequest : (cellInfos) => { return onMeetingNodeAssigneesCellRequest(cellInfos);},
    		  onMeetingAgendaSpeakerCellRequest : (cellInfos) => { return onMeetingAgendaSpeakerCellRequest(cellInfos);},
    		  onMeetingNodeOwnerCellRequest : (cellInfos)  => { return onMeetingNodeOwnerCellRequest(cellInfos);},
    		  
    		  getAvatarDetails:(Labelname) => { return getAvatarDetails(Labelname);}
  	};
      return MeetingGridViewOnCellRequest;
  });


define('DS/ENXMeetingMgmt/Model/MeetingMembersModel',
		[	'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
			'DS/ENXMeetingMgmt/Utilities/DataFormatter',
			'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
			'DS/WebappsUtils/WebappsUtils',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
			],
			function(			   
					TreeDocument,
					TreeNodeModel,
					EnoviaBootstrap,
					DataFormatter,
					WrapperDataGridView,
					WebappsUtils,
					NLS
			) {
	'use strict';
	let model = new TreeDocument();
	let prepareTreeDocumentModel = function(response){      
		model.prepareUpdate();  
		response.forEach(function(data) {
		  /*  var dataElem = data.dataelements;
		    var fullname = dataElem.firstname+ " " +dataElem.lastname;
            var thumbnailIcon = onMemberNodeAssigneesCellRequest(fullname,dataElem.name);
	        var typeIcon = WebappsUtils.getWebappsAssetUrl("ENOMeeting","icons/16/I_Person16.png");	
			var root = new TreeNodeModel({
			  label: fullname,
              width: 300,
			  grid:{
			    id: dataElem.physicalid,
			    UserName : dataElem.name,
                Name: fullname,
                Email : dataElem.email,
                Contact : dataElem.phonenumber,
                Company : dataElem.company
              },
              "thumbnail" : thumbnailIcon,
              icons:[typeIcon],
			});
			model.addRoot(root); */
		/*	var arrCompany = data.company;
			var arrLength = arrCompany.length;
			var companyDiv = new UWA.Element("div", {
	            class:'companies'
	        });
			if(typeof arrCompany != 'undefined'){
			 for(var i=0;i<arrLength;i++){
			   var assignee = new UWA.Element("div", {
	                        class:'company'
	                    });
			   var company = arrComapny[i];
			 
			 }
			}
		*/	
			var fullname,thumbnailIcon,typeIcon ;
			if(data.type == "Group" || data.type == "Group Proxy"){
	            	thumbnailIcon=WebappsUtils.getWebappsAssetUrl("ENXMeetingMgmt","icons/144/default-group.png");
	            	typeIcon=WebappsUtils.getWebappsAssetUrl("ENXMeetingMgmt","icons/16/I_UserGroup16.png");
	            	fullname=data.title;
			}else{
				 fullname = data.firstname+ " " +data.lastname;
				 thumbnailIcon = onMemberNodeAssigneesCellRequest(fullname,data.name);
				 typeIcon = WebappsUtils.getWebappsAssetUrl("ENXMeetingMgmt","icons/16/I_Person16.png");
			}
			var company =data.company?data.company:"";
			var root = new TreeNodeModel({
			  label: fullname,
              width: 300,
			  grid:DataFormatter.memberGridData(data),
			  "thumbnail" : thumbnailIcon,
			  description : onMemberNodeCellRequest(company),
              icons:[typeIcon],
              contextualMenu : ["My context menu"]
		    });
		    model.addRoot(root); 
		});
		model.pushUpdate();
		return model;
    };
    
    let onMemberNodeAssigneesCellRequest= function (name,userName) {
          var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
          var swymOwnerIconUrl = EnoviaBootstrap.getSwymUrl()+ownerIconURL;               
          var responsible = new UWA.Element("div", {});
          var owner = new UWA.Element("div", {
            class:'assignee'
          });
          var ownerIcon = "";
          if(EnoviaBootstrap.getSwymUrl()!=undefined){
            ownerIcon = UWA.createElement('img', {
                class: "member-userIcon",
                src: swymOwnerIconUrl
            });
          } else {
            var iconDetails = getAvatarDetails(name);
            ownerIcon = UWA.createElement('div', {
                  html: iconDetails.avatarStr,
                  "title": name,
                  class: "member-avatarIcon"
              });
            ownerIcon.style.setProperty("background",iconDetails.avatarColor);
          }

        return ownerIcon;
    };
 
   let onMemberNodeCellRequest = function (company) {
	    var commandsDiv="";
	    commandsDiv = UWA.createElement('div', {
            class: "members-company-details"
        });
        var tooltip = "";
        var len = company.length;
        var count =0;
        if(len > 0){
        company.forEach(function(data) {
        tooltip = tooltip + data+ ",\n";
        if(count++<len-1){
        UWA.createElement('span',{
	        "html": data +", ",
	        "class":"members-company"
	    }).inject(commandsDiv);
	    }else{
	    UWA.createElement('span',{
	        "html": data,
	        "class":"members-company"
	    }).inject(commandsDiv);
	    
	    }
	    });
        }
	    tooltip = tooltip.slice(0, -2);
        commandsDiv.set({
	             title: tooltip
	        });
	    return commandsDiv.outerHTML;
	};
                              
    let getAvatarDetails= function (name) {
        var options = {};
        var backgroundColors = [
          [7, 139, 250],
          [249, 87, 83],
          [111, 188, 75],
          [158, 132, 106],
          [170, 75, 178],
          [26, 153, 123],
          [245, 100, 163],
          [255, 138, 46],
        ]
        var initials = name.match(/\b\w/g);
        var firstLetter = initials[0].toUpperCase();
        var lastLetter = initials[initials.length - 1].toUpperCase();

        var avatarStr = (firstLetter + lastLetter);

        var i = Math.ceil((firstLetter.charCodeAt(0) + lastLetter.charCodeAt(0)) % backgroundColors.length);
        var avatarColor = "rgb(" + backgroundColors[i][0] + "," + backgroundColors[i][1] + "," + backgroundColors[i][2] + ")";

        options.name = name;
        options.avatarStr = avatarStr;
        options.avatarColor = avatarColor;

        return options;
      };
      
    let appendRows = function(resp){
    	var header = "";
    	var noOfObjectsUpdated=0;
		model.prepareUpdate();	
		var alreadyExists;
		var objectsExisting="";
		resp.forEach((data) => {
			alreadyExists=false;
			var assignees=model.meetingModel.Assignees;
			assignees.forEach((assigneeInfo) => {
				if(assigneeInfo.objectId == data.objectId){
					alreadyExists=true;
					noOfObjectsUpdated=noOfObjectsUpdated+1;
				}
					
			});
			
			var fullname,thumbnailIcon,typeIcon ;
			if(data.type == "Group" || data.type == "Group Proxy"){
            	thumbnailIcon=WebappsUtils.getWebappsAssetUrl("ENXMeetingMgmt","icons/144/default-group.png");
            	typeIcon=WebappsUtils.getWebappsAssetUrl("ENXMeetingMgmt","icons/16/I_UserGroup16.png");
            	fullname=data.title;
			}else{
			 	fullname = data.firstname+ " " +data.lastname;
			 	thumbnailIcon = onMemberNodeAssigneesCellRequest(fullname,data.name);
			 	typeIcon = WebappsUtils.getWebappsAssetUrl("ENXMeetingMgmt","icons/16/I_Person16.png");
			}
		    var company =data.company?data.company:"";
			var root = new TreeNodeModel({
                label: fullname,
                id: data.physicalid,
                width: 300,
                grid: DataFormatter.memberGridData(data),
  	          	"thumbnail" : thumbnailIcon,
  	          	description : onMemberNodeCellRequest(company),
  	          	contextualMenu : ["My context menu"],
  	          	"icons" :[typeIcon]
        	});
			if(!alreadyExists){																
			model.addRoot(root);
			}else{
				objectsExisting=objectsExisting+fullname+",";
			}
			
		});
		var objectCount=resp.length-noOfObjectsUpdated;
		if(objectCount>0){
			if(objectCount == 1){
				header = NLS.successAddExistingMemberSingle;
			}else{
				header = NLS.successAddExistingMember;
			}
			 header = header.replace("{count}",objectCount);
	         widget.meetingNotify.handler().addNotif({
	             level: 'success',
	             subtitle: header,
	             sticky: false
	         });
		}
         if(noOfObjectsUpdated>0){
        	 objectsExisting=objectsExisting.substring(0,objectsExisting.length-1);
        	 var message ="";
        	 if(noOfObjectsUpdated == 1){
        		  message=NLS.attendeeExistsMessageSingle;
        	 }else{
        		 message=NLS.attendeeExistsMessage;
        	 }
        	 message = message.replace("{attendee}",objectsExisting);
        	 widget.meetingNotify.handler().addNotif({
                 level: 'success',
                 subtitle: message,
                 sticky: false
             });
        	 }
		
		model.pushUpdate();
	/*	if(model.getChildren().length!=0){
		    widget.meetingEvent.publish('hide-no-member-placeholder');
		   
        } */
	};
    
    let deleteSelectedRows = function(){
		var selRows = model.getSelectedNodes();
		var meetingOwner = model.meetingModel.Owner;
		model.prepareUpdate();	
		 for (var index = 0; index < selRows.length; index++) {
		     var assignee =selRows[index].options.grid.UserName;
		     if(assignee!=meetingOwner){
			 model.removeRoot(selRows[index]);
			 }
		 }
		model.pushUpdate();
		if(model.getChildren().length==0){
		    widget.meetingEvent.publish('show-no-member-placeholder');
        }
	};
    
    let getModel=function(){
    	return model;
    };
    
    let destroy = function(){
    	model = new TreeDocument();
    };
    
    let getMemberIDs = function(){
		if( model!= undefined){
			var children = model.getChildren();
			var id=[];
			for(var i=0;i<children.length;i++){
				id.push(children[i]._options.grid.id);
			}
			return id;
		}
	};
    
    let MeetingAttachmentsModel = {
    		createModel : (response) => {return prepareTreeDocumentModel(response);},
    		getModel : ()=> {return getModel();},
    		destroy : () => {return destroy();},
    		getMemberIDs: () => {return getMemberIDs();},
    		getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
    		appendRows : (data) => {return appendRows(data);},
    		deleteSelectedRows : () => {return deleteSelectedRows();}
    }
    return MeetingAttachmentsModel;

});

/* global define, widget */
/**
  * @overview Route Management - Route Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/NewMeetingAttachmentsModel',
		[	'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
			],
			function(			   
					TreeDocument,
					TreeNodeModel,
					WrapperDataGridView,
					NLS
			) {
	'use strict';
	let model = new TreeDocument();
	let prepareTreeDocumentModel = function(response){      
		model.prepareUpdate();  
		if(response){
			response.forEach(function(dataElem) {
	            
				var root = new TreeNodeModel({
					label: dataElem.name,
	                //id: dataElem.id,
					width: 300,
					dataIndex: 'tree',
					grid: {
						id: dataElem.id,
						title:dataElem.title,
						Name: dataElem.name,                            
						Maturity: dataElem.stateNLS,
						type: dataElem.type,
						Creation_Date : dataElem.created,
						Modified_Date : dataElem.modified,
						Owner : dataElem.owner
					},
					icons : [dataElem.type_icon_url]	                    
				});
				model.addRoot(root);
			});
		}
		model.pushUpdate();
		return model;
    };
    
    let appendRow = function(response,isDroppedData){        
        model.prepareUpdate();  
        response.forEach(function(dataElem) {
        	let root;
        	
			if(isDroppedData)
				root = getModelForDroppedData(dataElem);
			else
			   	root = getModelForDataAddedFromSearch(dataElem);      	                                                         
        	model.addRoot(root);
        });
        model.pushUpdate();      
        if(model.getChildren().length!=0){
        	widget.meetingEvent.publish('hide-no-iattachment-placeholder');
        }
    }; 
    
    let getModelForDataAddedFromSearch = function(dataElem){
    	let root = new TreeNodeModel({
            label: dataElem.title,
            id: dataElem.id,
            width: 300,
            dataIndex: 'tree',
            grid: {
                id: dataElem.id,
                title:dataElem.title,
                Name: dataElem.name,                            
                Maturity: dataElem.stateNLS,
                type: dataElem.type,
                Creation_Date : dataElem.created,
                Modified_Date : dataElem.modified,
                Owner : dataElem.owner
            },
            icons : [dataElem.type_icon_url]
        }); 
    	return root;
    };
    
    let getModelForDroppedData = function(dataElem){
    	let root = new TreeNodeModel({
            label: dataElem.title,
            id: dataElem.id,
            width: 300,
            dataIndex: 'tree',
            grid: {
                //id: dataElem.objectId,
				id: dataElem.id,
                title:dataElem.title,
                Name: dataElem.name,                            
                Maturity: dataElem.stateNLS,
                type: dataElem.type,
                Creation_Date : dataElem.created,
                Modified_Date : dataElem.modified,
                Owner : dataElem.owner
            },
            icons : [dataElem.typeicon]
        }); 
    	return root;
    };
    
    
    let deleteSelectedRows = function(){
    	var selRows = model.getSelectedNodes();
    	model.prepareUpdate();	
    	for (var index = 0; index < selRows.length; index++) {
    		model.removeRoot(selRows[index]);
    	}
    	model.pushUpdate();
    	if(model.getChildren().length==0){
    		widget.meetingEvent.publish('show-no-imeeting-placeholder');
    	}
	};
    
	let destroy = function(){
    	model = new TreeDocument();
    };
    let getModel = function(){
    	return model;
    };
    
    let getAttachmentsIDs = function(){
    	if( model!= undefined){
    		var children = model.getChildren();
    		var id=[];
    		for(var i=0;i<children.length;i++){
    			id.push(children[i]._options.grid.id);
    		}
    		return id;
    	}
    };
    let deleteAllRows = function(){
    	
    	model.prepareUpdate();	
    	model.removeRoots();
    	model.pushUpdate();
    	if(model.getChildren().length==0){
    		widget.meetingEvent.publish('show-no-imeeting-placeholder');
    	}
	};
    let NewMeetingAttachmentsModel = {
    		createModel : (response) => {return prepareTreeDocumentModel(response);},
    		getModel : () => {return getModel();},
            appendRow: (response,isDroppedData) => {return appendRow(response,isDroppedData);},
            getAttachmentsIDs: () => {return getAttachmentsIDs();},
            deleteSelectedRows: ()=>{return deleteSelectedRows();},
            deleteAllRows: ()=>{return deleteAllRows();},
            getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
            destroy : () => {return destroy();}
    }
    return NewMeetingAttachmentsModel;

});

define('DS/ENXMeetingMgmt/View/Loader/NewMeetingContextChooser',
[
	
	'DS/Utilities/Dom',
	'DS/ENXMeetingMgmt/Utilities/SearchUtil',		
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
  function ( DomUtils, SearchUtil, NLS) {    
		"use strict";    
		let _meetingProperties;

		let launchContextSearch = function(event, _properties){
			_meetingProperties = _properties;
			var that = event.dsModel;
			 var searchcom_socket;
 	        var socket_id = UWA.Utils.getUUID();
 	       if (!UWA.is(searchcom_socket)) {
	            require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
	                searchcom_socket = SearchCom.createSocket({
	                    socket_id: socket_id
	                });                
	                let allowedTypes = "Change Order,Change Request,Change Action,Issue,Program,Task,Phase,Gate,Milestone,Risk,Project Space,Workspace";
	    	        var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
	    	        var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addAttachment", false , recentTypes);
	                refinementToSnNJSON.precond = SearchUtil.getPrecondForMeetingContextSearch(recentTypes);
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

		
		var selected_Objects_ContextSearch = function(that, data){
			_meetingProperties.elements.contextField.value = data[0]["ds6w:label"].unescapeHTML();
			_meetingProperties.elements.contextId = data[0].id;
	
		};	
		  
	    
		let destroy = function(){
			_meetingProperties = {};
		}
		
		let NewMeetingContextChooser = {
				init : (event, _properties) => { return launchContextSearch(event, _properties);},				          
				destroy : () => { destroy();}
		};
		return NewMeetingContextChooser;
	});


/* global define, widget */
/**
 * @overview Route Management - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Utilities/AutoCompleteUtil',
		[
			'UWA/Class',
			'DS/ENXMeetingMgmt/Services/MeetingServices',
			'DS/TreeModel/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/WUXAutoComplete/AutoComplete',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
			],
			function(
					UWAClass,
					MeetingServices,
					TreeDocument,
					TreeNodeModel,
					WUXAutoComplete,
					NLS
			) {
	'use strict';
	
	var objectTreeDocument = new TreeDocument();
	
	let _drawAutoComplete = function(options) {
		return new WUXAutoComplete(options);
	};
	
	let _getAutoCompleteList = function(options, model, personRoleArray) {
		
		//objectTreeDocument.empty();
		
		return new Promise(function(resolve, reject) {
			getListMember(options).then(function(resp){
				
				model.empty(); //objectTreeDocument instead of model
				model.prepareUpdate();
				for (var i = 0; i < resp.length; i++) {
					var identifier = resp[i].identifier;
					if(personRoleArray.hasOwnProperty(identifier)){
						resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
						if(options.categoryId=='attendee'&&(personRoleArray[identifier].contains('coOwner')==true || personRoleArray[identifier].contains('attendee')==true ))
							continue;
					}
					
					if (options.categoryId=='attendee') {
						var nodeForAttendee = new TreeNodeModel(
							{
								label : resp[i].label,
								value : resp[i].value,
								name  : resp[i].name,
								identifier: resp[i].identifier,
								type:resp[i].type,
								grid:{type:resp[i].type,name:resp[i].name},
								id: resp[i].id
							});
						model.addRoot(nodeForAttendee);
					}
					else if (options.categoryId.contains('agenda')) {
						var nodeForSpeaker = new TreeNodeModel(
							{
								label : resp[i].label,
								value : resp[i].value,
								name  : resp[i].name,
								identifier: resp[i].identifier,
								type:resp[i].type,
								id: resp[i].id
							});
						model.addRoot(nodeForSpeaker);
					}
				}
				
				model.pushUpdate();
				resolve(model);						
			});
			
		});
	};
	
	let getListMember = function (options) {
		var optionsAttendees = options;
		var returnedPromise = new Promise(function (resolve, reject) {
			var url = "/search?xrequestedwith=xmlhttprequest";
			
			var success = function (data) {

				var results = [];

				if (data && data.results && Array.isArray(data.results)) {					
					var personSelectedArr = data.results;
					personSelectedArr.forEach(function (person) {
						var personSearched = {};
						var personAttrs;
						var type;
						if (optionsAttendees.removeArray) {
							let rid = person.attributes.find((ele2) => ele2.name =='resourceid').value;
							let idx = optionsAttendees.removeArray.findIndex((ele) => ele.options.id == rid);
							if (idx==-1) {
								personAttrs = person.attributes;
								for (let i = 0; i < personAttrs.length; i++) {
									if (personAttrs[i].name === 'ds6w:what/ds6w:type'){ 
										type = personAttrs[i].value;
										break;
									}
									}
								personAttrs.forEach(function (attr) {
									if (attr.name === 'ds6w:what/ds6w:type') personSearched.type = attr['value'];
									if (attr.name === 'resourceid') personSearched.id = attr['value'];
									if (attr.name === 'ds6w:identifier') personSearched.identifier = attr['value'];
									if (type == "Group" || type == "foaf:Group"){
										if (attr.name === 'ds6w:label') personSearched.label = attr['value'] + "(User Group)";
									}else{
										if (attr.name === 'ds6wg:fullname') personSearched.label = attr['value'];
									}
									if (attr.name === 'ds6w:identifier') personSearched.name = attr['value'];
								});
								results.push(personSearched);
							}
						}
						else {
							personAttrs = person.attributes;
							for (let i = 0; i < personAttrs.length; i++) {
								if (personAttrs[i].name === 'ds6w:what/ds6w:type'){ 
									type = personAttrs[i].value;
									break;
								}
								}
							personAttrs.forEach(function (attr) {
								if (attr.name === 'ds6w:what/ds6w:type') personSearched.type = attr['value'];
								if (attr.name === 'resourceid') personSearched.id = attr['value'];
								if (attr.name === 'ds6w:identifier') personSearched.identifier = attr['value'];
								if (type == "Group" || type == "foaf:Group"){
									if (attr.name === 'ds6w:label') personSearched.label = attr['value'] + "(User Group)";
								}else{
									if (attr.name === 'ds6wg:fullname') personSearched.label = attr['value'];
								}
								if (attr.name === 'ds6w:identifier') personSearched.name = attr['value'];
							});
							results.push(personSearched);
						}						
						
					});
				}
				resolve(results);
			};

			var failure = function (data) {
				reject(data);
			};

			var queryString = "";
			//typeahead start
			//queryString = "(flattenedtaxonomies:\"types/Person\" AND policycurrent:\"Person.Active\" )";
			queryString = optionsAttendees.queryString;
			var source = [];
			if(optionsAttendees.source){
				source=optionsAttendees.source;
			}
			if (optionsAttendees.categoryId=='agenda-createinmeeting') {
				var resourceid_input = optionsAttendees.resourceid_input;
				var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": source, "tenant": widget.getPreference("collab-storage").value,"resourceid_in":resourceid_input };
			}
			else {
			//typeahead end
				var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": source, "tenant": widget.getPreference("collab-storage").value };
			}			
			var inputjson = JSON.stringify(inputjson);

			var options = {};
			options.isfederated = true;
			MeetingServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
		});

		return returnedPromise;
	};
	

	let AutoCompleteUtil = {
		drawAutoComplete: (options) => {return _drawAutoComplete(options);},
		getAutoCompleteList: (options, model, personRoleArray) => {return _getAutoCompleteList(options, model, personRoleArray);}			
	};
	
	return AutoCompleteUtil;
	
});

/**
 * 
 */

define('DS/ENXMeetingMgmt/Components/Wrappers/SplitView',
['DS/ENOXSplitView/js/ENOXSplitView','DS/ENXMeetingMgmt/Model/MeetingModel','i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
function(ENOXSplitView,MeetingModel,NLS) {

  'use strict';
  var SplitView = ENOXSplitView;

  SplitView.prototype.getLeftViewWrapper = function () {
    return UWA.extendElement(this.getLeft());
  }

  SplitView.prototype.getRightViewWrapper = function () {
    return UWA.extendElement(this.getRight());
  }

  SplitView.prototype.addRightPanelExpander = function () {
    if (this._rightPanel != null) {
      /*  "id": "back",
        "dataElements": {
          "typeRepresentation": "functionIcon",
          "icon": {
            "iconName": "home",
            "fontIconFamily": 1
          }
        },
        "action": {
          module: 'DS/ENXMeetingMgmt/View/Home/MeetingSummaryView', //TODO dummy method and function
          func: 'backToMeetingSummary',
        },
        
        "category": "status",
        "tooltip": NLS.home*/
      
    	
    	
    	
      var showIcon = "fonticon-home";
      var closer = UWA.createElement("div", {
        "class": "splitview-close fonticon "+showIcon,
        "id":"splitview-close",
        "title": NLS.home,
        'styles': {
          'font-size': '20px'
        }
      });
      closer.inject(this._rightPanel);
      var me = this;
      closer.onclick = function (e) {
    	widget.meetingEvent.publish('meeting-back-to-summary');
      	widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model:MeetingModel.getModel()});
      	widget.setValue('openedMeetingId', undefined);
    		    	  
    	/*  
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
        }*/
      }
    }
  }
  
  return SplitView;

});


define('DS/ENXMeetingMgmt/View/Facets/CreateMeetingTabs', [
	  'DS/Controls/TabBar',
	  'DS/ENXMeetingMgmt/Config/CreateMeetingTabsConfig'	  
	],
	function (WUXTabBar, CreateMeetingTabsConfig) {
	'use strict';
	let _initiateMeetingTabs, _currentTabIndex, _initiateMeetingTabInstances = {}, _propertiesInformation = {};
		
	let CreateMeetingTabs = function(container, defaultJson){
		this.container = container;
		_propertiesInformation = defaultJson;		
		//registerTemplateEvents();
	};

	let ontabClick = function(args){
		let seltab = args.options.value;
		if(typeof seltab == 'undefined'){
			seltab = args.dsModel.buttonGroup.value[0]; //this is to get the selected tab from the model
		}
		if (seltab === _currentTabIndex){
			return;
		}
		var ntabs =["properties","agenda", "members","attachments"];
		_initiateMeetingTabInstances[ntabs[seltab]].init(_propertiesInformation);
		if(typeof _currentTabIndex != 'undefined'){
			_initiateMeetingTabInstances[ntabs[_currentTabIndex]].hideView();
		}			
		_currentTabIndex = seltab;		
	};
	   
	CreateMeetingTabs.prototype.init = function(){		
		_initiateMeetingTabs = new WUXTabBar({
			displayStyle: 'strip',
			showComboBoxFlag: true,
			editableFlag: false,
			multiSelFlag: false,
			reindexFlag: true,
			touchMode: true,
			centeredFlag: false,
			allowUnsafeHTMLOnTabButton: true
		});
		CreateMeetingTabsConfig.forEach((tab) => {			
			_initiateMeetingTabs.add(tab); //adding the tabs
		});
		_initiateMeetingTabs.inject(this.container);
		//draw the tab contents
		initializeMeetingTabs();		
	};
	
	let initializeMeetingTabs = function(){		
		new Promise(function (resolve, reject){
			let promiseArr = [];
			CreateMeetingTabsConfig.forEach((tab, index)=>
			{				
				if(tab.loader != ""){
					promiseArr[index] = new Promise(function (resolve, reject){
						require([tab.loader], function (loader) {
							_initiateMeetingTabInstances[tab.id] = loader;	
							resolve();
						});
					});
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
			_initiateMeetingTabs.addEventListener('tabButtonClick', function(args){
				ontabClick(args);
			});
			
			_initiateMeetingTabs.addEventListener('change', function(args){
				ontabClick(args);
			});
			
		}, function () {
			//Error during tab click
		});
		
		
	};
	CreateMeetingTabs.prototype.destroy = function(){	    	
		try{
			_currentTabIndex = undefined; //this should be the first line, if some error occurs afterward, that would be an issue otherwise			
			Object.keys(_initiateMeetingTabInstances).map((tab) => {
				_initiateMeetingTabInstances[tab].destroy();
			});
			_initiateMeetingTabs.destroy();
			_propertiesInformation = {};
			this.container.destroy();
		}catch(e){
	    		//TODO check why this error: TypeError: Cannot read property '__resizeListeners__' of undefined
			//console.log(e);
		}	
	};
	
	CreateMeetingTabs.getModel = function(tabName){
		return _initiateMeetingTabInstances[tabName].getModel();		
	};
	CreateMeetingTabs.getPropertiesModel = function(){
		_initiateMeetingTabInstances["properties"].getModel();		
	};
	CreateMeetingTabs.getAgendaModel = function(){
		_initiateMeetingTabInstances["agenda"].getModel();		
	};
	CreateMeetingTabs.getMembersModel = function(){
		_initiateMeetingTabInstances["members"].getModel();
	};
	
	CreateMeetingTabs.getAttachmentsModel = function(){
		_initiateMeetingTabInstances["attachments"].getModel();
	};
	
	let registerTemplateEvents =function(){
		//
    	
    };
	
	return CreateMeetingTabs;
});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Menu/AgendaTopicContextualMenu', [
        'DS/Menu/Menu',
        'DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel',
        'DS/ENXMeetingMgmt/View/Menu/MeetingOpenWithMenu',
        'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
        'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
    function(WUXMenu,AgendaTopicItemsModel, MeetingOpenWithMenu, NLS){
        'use strict';
        let Menu;
       
        let topicItemGridRightClick = function(event,mode,onRemoveCb,meetnginfo){
			// To handle multiple selection //
        	// This will avoid unselecting the selected rows when click on actions //
        	event.preventDefault();
            event.stopPropagation();
			var pos = event.target.getBoundingClientRect();
            var config = {
            		position: {
            			x: pos.left,
                        y: pos.top + 20
                    }
            };
            var selectedDetails = AgendaTopicItemsModel.getSelectedRowsModel();
            var menu = [];
        	if(selectedDetails.data && selectedDetails.data.length == 1){
        		var contextOpenWithData = {};
        		contextOpenWithData.Id = selectedDetails.data[0].options.grid.id;
        		contextOpenWithData.Type = selectedDetails.data[0].options.grid.type;
        		contextOpenWithData.Title = selectedDetails.data[0].options.grid.title;
        		getOpenWithMenu(contextOpenWithData).then(function(openWithMenu){
        			menu = menu.concat(openWithMenu);
        			if(mode!="agendaPreview" && (AgendaTopicItemsModel.getAttachmentIDs().length >1 || meetnginfo.model && meetnginfo.model.id!=contextOpenWithData.Id)){
            			menu = menu.concat(removeTopicItems(onRemoveCb));
            		}
        			WUXMenu.show(menu, config);
                });
        	}else{
        		if(mode!="agendaPreview"){
        			menu = menu.concat(removeTopicItems(onRemoveCb));
        			WUXMenu.show(menu, config);
        		}
        		/*WUXMenu.show(menu, config);*/
        	}
        	
		};

		let getOpenWithMenu = function(data){
        	let menu = [];
        	return new Promise(function(resolve, reject) {
        		MeetingOpenWithMenu.getOpenWithMenu(data).then(				
        				success => {
        					if(success && success.length > 0){
        						menu.push({
            						id:"OpenWith",
            						'type': 'PushItem',
            						'title': NLS.openWith,
            						icon: "export",
            						submenu:success
            					});
        					}
        					resolve(menu);  
        				},
        				failure =>{
        					resolve(menu);
        				});
        	});	
        };
        
    	let removeTopicItems = function(removeCallback){
    		var menu = [];
    			menu.push({
    				name: NLS.Remove,
    				title: NLS.Remove,
    				type: 'PushItem',
    				fonticon: {
    					content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-remove'
    				},
    				data: null,
    				action: {
    					callback: function () {
    						removeCallback();
    					}
    				}
    			});
    		return menu;
    	};

        
        Menu={
            topicItemGridRightClick: (event,mode,onRemoveCb,meetnginfo) => {return topicItemGridRightClick(event,mode,onRemoveCb,meetnginfo);}
        };
        
        return Menu;
    });



define('DS/ENXMeetingMgmt/View/Facets/CreateMeetingMembers',
[
	'DS/Tree/TreeDocument',
	//'DS/WUXAutoComplete/AutoComplete',
	'DS/Controls/Toggle',
	'DS/Controls/Button',
	'DS/ENXMeetingMgmt/Utilities/SearchUtil',
	'DS/ENXMeetingMgmt/Services/MeetingServices',
	'DS/ENXMeetingMgmt/Model/NewMeetingMembersModel',
	'DS/Tree/TreeNodeModel',
	'DS/ENXMeetingMgmt/Utilities/AutoCompleteUtil',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (TreeDocument,/*WUXAutoComplete,*/WUXToggle,WUXButton,SearchUtil,MeetingServices,NewMeetingMembersModel,TreeNodeModel, AutoCompleteUtil, NLS) {    
        "use strict";     
        let id, _model;  
        
        var CreateMeetingMembers = {
        
        //_properties: {},
        
        //_model = new TreeDocument();
        getContainer : function(){
        	return  UWA.createElement('div', {
                'class': 'create-iMeetingMembers-view',
            });
        },
       
        
        build : function(container, attachmentsIds){
        	       	
        	CreateMeetingMembers.render(container);
        },
        
       
           
        render: function (container) {
		        	//CreateMeetingMembers.modelForCoOwners = new TreeDocument();
		        	CreateMeetingMembers._properties = {};
		        	CreateMeetingMembers._properties.modelForAttendees = new TreeDocument();
		        	//CreateMeetingMembers.tempModelForAttendees = new TreeDocument();
		        	//CreateMeetingMembers.modelForContributor = new TreeDocument();
		        	
		        	//praparing model for autoComplete
		        	//CreateMeetingMembers.updateAutocompleteModel({attendeesrole:true});
					
		        	/*CreateMeetingMembers.autoCompleteCoOwner = new WUXAutoComplete(
		     			{
		     				// Assign the model to autoComplete
		     				elementsTree : CreateMeetingMembers.modelForCoOwners,
		     				placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
		     				customFilterMessage:NLS.AccessRights_Auto_No_Seach_found
		     			}); 
		     			*/
		        	
		        	let acOptions = {
		        		allowFreeInputFlag: false,
		        		elementsTree: CreateMeetingMembers.asyncModelForAttendees,
		        		placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
		        		minLengthBeforeSearch: 3,
		        		keepSearchResultsFlag: false,
		        		typeDelayBeforeSearch: 500
		        	};
		        	CreateMeetingMembers._properties.autoCompleteAttendees = AutoCompleteUtil.drawAutoComplete(acOptions);
		        	
		        	var autocompleteCB = CreateMeetingMembers.asyncModelForAttendees;
		        	CreateMeetingMembers._properties.autoCompleteAttendees.addEventListener('change', function(e) {
						if (typeof e.dsModel.elementsTree !='function') //changed in onsearchcomplete()
							e.dsModel.elementsTree = autocompleteCB;
					});
		        	
		        	
		        	/*CreateMeetingMembers.autoCompleteAttendees= new WUXAutoComplete(
		     			{
		     				// Assign the model to autoComplete
		     				allowFreeInputFlag: false,
		     				//elementsTree : CreateMeetingMembers.modelForAttendees,
		     				elementsTree: CreateMeetingMembers.asyncModelForAttendees,
		     				placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
		     				//customFilterMessage:NLS.AccessRights_Auto_No_Seach_found,
		     				minLengthBeforeSearch: 3,
		     				keepSearchResultsFlag: false
		     			}); */
		           
		        	/*CreateMeetingMembers.autoCompleteContributor= new WUXAutoComplete(
		        			{
		        				// Assign the model to autoComplete
		        				elementsTree : CreateMeetingMembers.modelForContributor,
		        				placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
		        				customFilterMessage:NLS.AccessRights_Auto_No_Seach_found
		        			}); 
		        	 */
		        	let addMemberViewContainer =  UWA.createElement('div', {
						'class':'add-member-container',
						styles: {
							'width':'100%'
						}
					}).inject(container);
		        	let addMemberBodyContainer =  UWA.createElement('div', {
						'class':'add-member-body-container'
					}).inject(addMemberViewContainer);
		
					let addMemberbuttonContainer =  UWA.createElement('div', {
						'class':'add-member-toggleButton-container'
					}).inject(addMemberViewContainer);
					
					// new WUXToggle({ type: "checkbox", label: NLS.addMessage, value: false }).inject(addMemberbuttonContainer);
					let memberTable = UWA.createElement('table', {
						'class': 'add-member-table'
					}).inject(addMemberBodyContainer);
					
					/*let coOwnertr = UWA.createElement('tr', {'class':'add-member-table-row'}).inject(memberTable);
					UWA.createElement('div', {
		                'class': 'coOwners-label',
		                html: [
						 NLS.coOwners,
		                    UWA.createElement('span', {
		                        'class': 'fonticon fonticon-help'
		                    })
		                ]
		            }).inject(coOwnertr);
					
					let coOwnerField = UWA.createElement('div', {'class': 'coOwnwer-field add-member-table',}).inject(coOwnertr);
		
					CreateMeetingMembers.autoCompleteCoOwner.inject(coOwnerField);
					let coOwnerFieldSearch = UWA.createElement('span',{
						'class':'fonticon fonticon-search  coOwner-field-search',
						events:{
							click:function(evt){
								CreateMeetingMembers.searchCategotyId = 'coOwner';
								CreateMeetingMembers.onSearchUserClick();
							}
						}
					}).inject(coOwnerField);
			*/
					//Attendees field
					let attendeestr = UWA.createElement('tr', {'class':'add-member-table-row'}).inject(memberTable);
					UWA.createElement('div', {
		                'class': 'attendees-label',
		                html: [
						 NLS.attendees
		                ]
		            }).inject(attendeestr);
					
					let attendeesField = UWA.createElement('div', {'class': 'attendees-field add-member-table',}).inject(attendeestr);
					let attendeesAndSearchDiv = UWA.createElement('div', {'class': 'attendees-field-and-search-button'}).inject(attendeesField);
					//_memberModel['memberAutoComplete'] = CreateMeetingMembers.autoCompleteAttendees.inject(attendeesAndSearchDiv);
					CreateMeetingMembers._properties.autoCompleteAttendees.inject(attendeesAndSearchDiv);
					CreateMeetingMembers._properties.autoCompleteAttendees.options.isSelected = true;
					new UWA.Element('div', {html:"&nbsp;"}).inject(attendeesAndSearchDiv);
					//let attendeesFieldSearch = new WUXButton({icon: {iconName: "search"}});
					//attendeesFieldSearch.inject(attendeesAndSearchDiv);
					/*let attendeesFieldSearch= UWA.createElement('span',{
						'class':'fonticon fonticon-search  assignee-field-search',
						events:{
							click:function(evt){
								CreateMeetingMembers.onSearchUserClick();
							}
						}
					}).inject(attendeesAndSearchDiv);*/
					let attendeesFieldSearch= UWA.createElement('span',{
						'class':'assignee-field-search'}).inject(attendeesAndSearchDiv);
					let attendeesFieldSearchButton =new WUXButton({icon: {iconName: "search"}}).inject(attendeesFieldSearch);
					attendeesFieldSearchButton.getContent().addEventListener('buttonclick', function(){			     
						CreateMeetingMembers.onSearchUserClick();
					});

					/*let attendeesFieldSearch = UWA.createElement('span',{
						'class':'fonticon fonticon-search  attendees-field-search',
						events:{
							click:function(evt){
								CreateMeetingMembers.searchCategotyId = 'attendees';
								CreateMeetingMembers.onSearchUserClick();
							}
						}
					}).inject(attendeesField);*/
					
					//Contributors field
					/*let contributortr = UWA.createElement('tr', {'class':'add-member-table-row'}).inject(memberTable);
					UWA.createElement('div', {
		                'class': 'contributor-label',
		                html: [
						 NLS.contributor,
		                    UWA.createElement('span', {
		                        'class': 'fonticon fonticon-help'
		                    })
		                ]
		            }).inject(contributortr);
					
					let contributorField = UWA.createElement('div', {'class': 'contributor-field add-member-table',}).inject(contributortr);
		
					CreateMeetingMembers.autoCompleteContributor.inject(contributorField);
					let contributorFieldSearch = UWA.createElement('span',{
						'class':'fonticon fonticon-search  contributor-field-search',
						events:{
							click:function(evt){
								searchCategotyId = 'contributor';
								CreateMeetingMembers.onSearchUserClick();
							}
						}
					}).inject(contributorField);*/
		
        },   
        
        asyncModelForAttendees: function(typeaheadValue) {
        	var personRoleArray = {};
			var currentMember = NewMeetingMembersModel.getModel().getChildren();
			for(var index=0; index<currentMember.length;index++){
				var memberInfo = currentMember[index].options.grid;
				personRoleArray[memberInfo.name] = memberInfo.Role;
			}
			
			//get all current selections - remove these from the autocompletelist
			let currentlySelectedMembers = this.selectedItems;
			var source =[];
			if(!(widget.getValue("x3dPlatformId") == "OnPremise")){
				 source = ["3dspace","usersgroup"];
			}
			let preCondition = SearchUtil.getPrecondForMeetingMemberSearch() || "";
			var queryString = "";
			var typeaheadString = "([ds6w:label]:*"+typeaheadValue.trim()+"* OR " +"[ds6w:identifier]:*"+typeaheadValue.trim()+"*)";
			queryString = typeaheadString +" AND "+"("+ preCondition+ ")";
			
			var optionsForAttendeeRole = {
					'categoryId': 'attendee',
					'attendeesrole': true,
					'queryString': queryString,
					'source': source,
					'removeArray': currentlySelectedMembers
			};
			
			if(optionsForAttendeeRole.attendeesrole==true) {
				//return AutoCompleteUtil.getAutoCompleteList(optionsForAttendeeRole, CreateMeetingMembers.modelForAttendees, personRoleArray);
				return new Promise(function(resolve, reject) {
					AutoCompleteUtil.getAutoCompleteList(optionsForAttendeeRole, CreateMeetingMembers._properties.modelForAttendees, personRoleArray)
					//AutoCompleteUtil.getAutoCompleteList(optionsForAttendeeRole,CreateMeetingMembers.tempModelForAttendees, personRoleArray)
					.then(function(resp){
						CreateMeetingMembers._properties.modelForAttendees = resp;
						resolve(CreateMeetingMembers._properties.modelForAttendees);
						//resolve(resp);
					})
					.catch(function(err) {
						console.log("ERROR: "+err);
					});
				});
			}
			
        },
                
        /*updateAutocompleteModel: function(options){
			var personRoleArray = {};
			var currentMember = NewMeetingMembersModel.getModel().getChildren();
			for(var index=0; index<currentMember.length;index++){
				var memberInfo = currentMember[index].options.grid;
				personRoleArray[memberInfo.name] = memberInfo.Role;
			}

			// -- Helpers
			/*var optionsForCoOwnerRole = {
					'categoryId': 'coOwner',
			};*/
			/*var optionsForAttendeeRole = {
					'categoryId': 'attendee',
			};*/
			/*var optionsForContributorRole = {
					'categoryId': 'contributor',
			};*/
			/*if(options.coOwnerrole==true) {
				CreateMeetingMembers.getListMember(optionsForCoOwnerRole).then(function(resp){
					CreateMeetingMembers.modelForCoOwners.empty();
					CreateMeetingMembers.modelForCoOwners.prepareUpdate();
					for (var i = 0; i < resp.length; i++) {
						var identifier = resp[i].identifier;
						if(personRoleArray.hasOwnProperty(identifier)){
							resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
							if(personRoleArray[identifier].contains('coOwner')==true || personRoleArray[identifier].contains('attendee')==true 
									|| personRoleArray[identifier].contains('contributor')==true)
								continue;
						}
						var nodeForCoOwner = new TreeNodeModel(
								{
									label : resp[i].label,
									value : resp[i].value,
									name  : resp[i].name,
									identifier: resp[i].identifier,
									type:resp[i].type,
									grid:{type:resp[i].type,name:resp[i].name},
									id: resp[i].id
								});
						CreateMeetingMembers.modelForCoOwners.addRoot(nodeForCoOwner);
					}
					CreateMeetingMembers.modelForCoOwners.pushUpdate();

				});
			}*/
			/*if(options.attendeesrole==true) {
				CreateMeetingMembers.getListMember(optionsForAttendeeRole).then(function(resp){
					CreateMeetingMembers.modelForAttendees.empty();
					CreateMeetingMembers.modelForAttendees.prepareUpdate();
					for (var i = 0; i < resp.length; i++) {
						var identifier = resp[i].identifier;
						if(personRoleArray.hasOwnProperty(identifier)){
							resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
							if(personRoleArray[identifier].contains('coOwner')==true || personRoleArray[identifier].contains('attendee')==true )
								continue;
						}
						var nodeForAttendee = new TreeNodeModel(
								{
									label : resp[i].label,
									value : resp[i].value,
									name  : resp[i].name,
									identifier: resp[i].identifier,
									type:resp[i].type,
									grid:{type:resp[i].type,name:resp[i].name},
									id: resp[i].id
								});
						CreateMeetingMembers.modelForAttendees.addRoot(nodeForAttendee);
					}
					CreateMeetingMembers.modelForAttendees.pushUpdate();

				});
			}*/
			/*if(options.contributorrole==true) {
				CreateMeetingMembers.getListMember(optionsForContributorRole).then(function(resp){
					CreateMeetingMembers.modelForCoOwners.empty();
					CreateMeetingMembers.modelForCoOwners.prepareUpdate();
					for (var i = 0; i < resp.length; i++) {
						var identifier = resp[i].identifier;
						if(personRoleArray.hasOwnProperty(identifier)){
							resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
							if(personRoleArray[identifier].contains('coOwner')==true || personRoleArray[identifier].contains('attendee')==true 
									|| personRoleArray[identifier].contains('contributor')==true)
								continue;
						}
						var nodeForCoOwner = new TreeNodeModel(
								{
									label : resp[i].label,
									value : resp[i].value,
									name  : resp[i].name,
									identifier: resp[i].identifier,
									type:resp[i].type,
									grid:{type:resp[i].type,name:resp[i].name},
									id: resp[i].id
								});
						CreateMeetingMembers.modelForContributor.addRoot(nodeForContributor);
					}
					CreateMeetingMembers.modelForContributor.pushUpdate();

				});
			}*/

		/*},*/
		
		/*getListMember: function (options) {
			var optionsAttendees = options;
			var returnedPromise = new Promise(function (resolve, reject) {
				var url = "/search?xrequestedwith=xmlhttprequest";
				
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
								if (attr.name === 'ds6wg:fullname') personSearched.label = attr['value'];
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
				//typeahead start
				//queryString = "(flattenedtaxonomies:\"types/Person\" AND policycurrent:\"Person.Active\" )";
				queryString = optionsAttendees.queryString;
				//typeahead end
				var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getPreference("collab-storage").value };
				var inputjson = JSON.stringify(inputjson);

				var options = {};
				options.isfederated = true;
				MeetingServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
			});

			return returnedPromise;
		},*/
       
       onSearchUserClick:  function(){
        	
			var data ="";
            var searchcom_socket,scopeId;
            //TODO need to see why it's coming as undefined
           // require(['DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel'], function(memberModel) {
            	var attendeeIDs = [];
            	if (CreateMeetingMembers && CreateMeetingMembers._properties && CreateMeetingMembers._properties.autoCompleteAttendees) {
            		if(CreateMeetingMembers._properties.autoCompleteAttendees.selectedItems != undefined){
	            		if(CreateMeetingMembers._properties.autoCompleteAttendees.selectedItems.length !=0){
			            	CreateMeetingMembers._properties.autoCompleteAttendees.selectedItems.forEach(function(dataElem) {
			            		attendeeIDs.push(dataElem.options.id);
							});
	            		}
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
                        let allowedTypes = "Person,Group";;    // UG105941: replace with constant
                        var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
                        var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addMembers", true, recentTypes);
                        if(!(widget.getValue("x3dPlatformId") == "OnPremise")){
            				var source = ["3dspace","usersgroup"];
            				refinementToSnNJSON.source = source;
            			}
						refinementToSnNJSON.precond = SearchUtil.getPrecondForMeetingMemberSearch(); 
						refinementToSnNJSON.resourceid_not_in = attendeeIDs;//need to check if attendeeIDs will also hv the selected UG ids
						//refinementToSnNJSON.resourceid_not_in = "";
                        if (UWA.is(searchcom_socket)) {
                            searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
                           // searchcom_socket.addListener('Selected_Objects_search', ContentActions.selected_Objects_search.bind(that,data));
                            searchcom_socket.addListener('Selected_Objects_search', CreateMeetingMembers.OnSearchComplete.bind(data));
                            
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
					if(tempObject["ds6w:type"] == "User Group" || tempObject["ds6w:type"] == "Group"){
						var nodelabel=tempObject["ds6w:label"]+"(User Group)";
					}else{
						var nodelabel=tempObject["ds6w:label"];
					}
						node = new TreeNodeModel(
								{
									label : nodelabel,
									value : tempObject["ds6w:identifier"],
									name  : tempObject["ds6w:identifier"],
									identifier:tempObject["ds6w:identifier"],
									type:tempObject["ds6w:type"],
									id: tempObject.id
								});
						//var index = CreateMeetingMembers.autoCompleteAttendees.elementsTree.getChildren().findIndex(object=>object.options.id===node.options.id)
						var index1 = -1;
						if (CreateMeetingMembers._properties.autoCompleteAttendees.value) {
							index1 = CreateMeetingMembers._properties.autoCompleteAttendees.value.findIndex((ele) => ele === node.getLabel());
						}
						var index2 = -1;
						if (CreateMeetingMembers._properties.autoCompleteAttendees._model) {
							index2 = CreateMeetingMembers._properties.autoCompleteAttendees._model.getChildren().findIndex((ele) => ele.options.id == node.options.id);
						}
						else {
							CreateMeetingMembers._properties.autoCompleteAttendees.elementsTree = CreateMeetingMembers._properties.modelForAttendees;
						}
						if(index2==-1) {
							//CreateMeetingMembers.autoCompleteAttendees.elementsTree.addChild(node);
							CreateMeetingMembers._properties.autoCompleteAttendees._model.addChild(node);
							
						}
						var allAttendeeslist = CreateMeetingMembers._properties.autoCompleteAttendees._model.getChildren();
						allAttendeeslist.forEach(function(dataElem) {
							if(dataElem.options.id == node.options.id) {								
								dataElem.select();
								CreateMeetingMembers._properties.autoCompleteAttendees.options.isSelected = true;
								//CreateMeetingMembers.autoCompleteAttendees.selectedItems.push(dataElem);
								return;
							}
						});
						

				}
				
				
				
				
					/*if(CreateMeetingMembers.autoCompleteAttendees.selectedItems==undefined){
						CreateMeetingMembers.autoCompleteAttendees.selectedItems = nodeArray;
					}else {
						CreateMeetingMembers.autoCompleteAttendees.selectedItems = CreateMeetingMembers.autoCompleteAttendees.selectedItems.concat(nodeArray);
					}
					//CreateMeetingMembers.autoCompleteAttendees._applySelectedItems();
					CreateMeetingMembers.autoCompleteAttendees.selectedItems.forEach(function(dataElem) {
						dataElem.select();
					});
			*/		
			}
        },
        
        getModel :function(){
        	return CreateMeetingMembers.modelForAttendees;
        },
        
        getProperties: function() {
        	return CreateMeetingMembers._properties;
        },
       
        
       destroy :function(){
        	          
        },
       
    	refreshProperties: function() {
    		CreateMeetingMembers._properties = {};
    	}
                              
        };
        return CreateMeetingMembers;
    });


define('DS/ENXMeetingMgmt/View/Loader/NewMeetingMembersLoader',
[
 'DS/ENXMeetingMgmt/View/Facets/CreateMeetingMembers',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'

],
function(CreateMeetingMembers, NLS) {

    'use strict';
    let _appInstance = {};

    const buildContainer = function(){
        _appInstance.container = new UWA.Element('div', { html: "", id :"CreateMeetingMembersView", 'class': 'meeting-create-members-container'});        
        _appInstance.container.inject(document.querySelector('#iMeetingTabsContainer'));
    };

    let NewMeetingMembersLoader = {
        init: function(dataJSON){ //,instanceInfo
            if(!this.showView()){               
                buildContainer();
                CreateMeetingMembers.build(_appInstance.container, dataJSON.memberIds);                       
             }
        },
        
        hideView: function(){
            if(document.querySelector('#CreateMeetingMembersView') && document.querySelector('#CreateMeetingMembersView').getChildren().length > 0){
                document.getElementById('CreateMeetingMembersView').style.display  = 'none';               
            }
        },
        
        showView: function(){
            if(document.querySelector('#CreateMeetingMembersView') && document.querySelector('#CreateMeetingMembersView').getChildren().length > 0){
                document.getElementById('CreateMeetingMembersView').style.display = 'block';
                return true;
            }
            return false;
        },
        
        destroy: function() {           
            //destroy form elements
        	_appInstance = {};
        	CreateMeetingMembers.destroy();
        },
        getModel : function(){          
            return CreateMeetingMembers.getModel();//To do psn16
        }
        
    };
    return NewMeetingMembersLoader;

});

/* global define, widget */
/**
 * @overview Route Management - ENOVIA Bootstrap file to interact with the platform
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXMeetingMgmt/Services/CreateMeetingServices',
        [
         "UWA/Core",
         'UWA/Class/Promise',
         "DS/ENXMeetingMgmt/Controller/EnoviaBootstrap",
         'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
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

    let CreateMeetingServices, _saveAsMeeting, _createMeeting;
    _saveAsMeeting = function(inputData){
    		 return new Promise(function(resolve, reject) {
    			 if(inputData.csrf == undefined){
    				 require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
    					 CompassServices.getServiceUrl( { 
    						 serviceName: '3DSpace',
    						 platformId : widget.getValue("x3dPlatformId"), 
    						 onComplete : function(url){
    							 WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWACore.extend( {
    								 method : 'GET',
    								 onComplete : function(csrf){
    									 console.log(csrf);
    									 inputData.csrf=JSON.parse(csrf).csrf;
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
    			 return saveMeeting(inputData); 
    		 });
    }
    
    function saveMeeting(inputData){
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL();
            let options = {};
            options.method = 'POST';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            //check for sc and csrf token
            
            

           // options.data = JSON.stringify(new ParseJSONUtil().createDataForPromoteDemote(inputData,"CREATE"));
            options.data =JSON.stringify(inputData);
            options.onComplete = function(serverResponse) {
            	let resp = new ParseJSONUtil().parseResp(JSON.parse(serverResponse));            	
                //need to update action if choose user group attribute is true
            	//let completeResponse=JSON.parse(serverResponse);
            	resolve(resp);
            };	

            options.onFailure = function(resp, model, options) {
                //reject(JSON.parse(model));
                if(model){
            		reject(JSON.parse(model));
            	}else{
            		reject(JSON.parse(resp));
            	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };

    _createMeeting = function(inputData){
    	
    	return new Promise(function(resolve, reject) {
			 if(inputData.csrf == undefined){
				 require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
					 CompassServices.getServiceUrl( { 
						 serviceName: '3DSpace',
						 platformId : widget.getValue("x3dPlatformId"), 
						 onComplete : function(url){
							 WAFData.authenticatedRequest(url + '/resources/v1/application/E6WFoundation/CSRF', UWACore.extend( {
								 method : 'GET',
								 onComplete : function(csrf){
									 console.log(csrf);
									 inputData.csrf=JSON.parse(csrf).csrf;
									 resolve();
								 }
							   })
							 );
						 }
					 })
				 });
			 } else{
				 resolve();
			 }
		 }).then(function() {
			 return createMeeting(inputData); 
		 });
    	
    };
    
    function createMeeting(inputData){

        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.getMeetingServiceBaseURL()+"?startMeeting=true";
            let options = {};
            options.method = 'POST';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            
            
            //options.data = JSON.stringify(new ParseJSONUtil().createDataForPromoteDemote(inputData,"CREATE"));
            options.data =JSON.stringify(inputData);
            options.onComplete = function(serverResponse) {
            	let resp = new ParseJSONUtil().parseResp(JSON.parse(serverResponse));   
                resolve(resp);
            };	

            options.onFailure = function(resp, model, options) {
                //reject(JSON.parse(model));
                if(model){
            		reject(JSON.parse(model));
            	}else{
            		reject(JSON.parse(resp));
            	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    
    };
    


    let getScopeInformation = function(phyId){
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.get3DSpaceURL()+"/resources/bps/scopeMembers?oid="+phyId;
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
                resolve(JSON.parse(serverResponse));
            };	

            options.onFailure = function(serverResponse) {
                reject(JSON.parse(serverResponse));
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    

    CreateMeetingServices={
    		saveAsMeeting: (inputData) => {return _saveAsMeeting(inputData);},
            createMeeting: (routeId) => {return _createMeeting(routeId);},
            getScopeInformation : (phyId) => {return getScopeInformation(phyId);},
    };

    return CreateMeetingServices;

});

define('DS/ENXMeetingMgmt/Config/MeetingAgendaGridViewConfig', 
		[
			'DS/ENXMeetingMgmt/View/Grid/MeetingGridCustomColumns',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
		], 
		function(MeetingGridViewOnCellRequest,
				NLS) {
			'use strict';
		
			let MeetingAgendaGridViewConfig=[
				{
					text: NLS.topic,
					dataIndex: 'Topic',
					sortableFlag : false
		
				},/*{
					text: NLS.sequence,
					dataIndex: 'Sequence',
					 typeRepresentation: "integer"
					 
				},*/{
					text: NLS.speaker,
					dataIndex: 'Speaker',
					editableFlag: false,
		            'onCellRequest':MeetingGridViewOnCellRequest.onMeetingAgendaSpeakerCellRequest,
		            sortableFlag : false
				},{
					text: NLS.duration,
					dataIndex: 'Duration',
					sortableFlag : false
				},{
					text: NLS.description,
					dataIndex: 'Description',
					typeRepresentation: "editor",
					sortableFlag : false
				},{
		              text: NLS.startDate,
		              dataIndex: 'startDate',
		              editableFlag: false ,
		              sortableFlag : false,
		              alignment: "near",
		              'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeDateCellRequest     
		            }
				];
		
			return MeetingAgendaGridViewConfig;
		}
	);

define('DS/ENXMeetingMgmt/View/Facets/MeetingPropertiesTabs', [
  'DS/Controls/TabBar',
  'DS/ENXMeetingMgmt/Config/MeetingInfoFacets',
  'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (WUXTabBar,MeetingInfoFacets,NLS) {
	'use strict';
	let _MeetingPropertiesTabs, _currentTabIndex, MeetingInfoTabInstances = {}, _meetingInfoModel = {},_container,_mode;
	
	let MeetingPropertiesTabs = function(container, meetingInfoModel,mode){
		_meetingInfoModel = meetingInfoModel;
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
		var ntabs =["MeetingPropertiesInfo", "MeetingRelationshipInfo"];
		MeetingInfoTabInstances[ntabs[seltab]].init(_meetingInfoModel,_container,_mode);
		if(typeof _currentTabIndex != 'undefined'){
			MeetingInfoTabInstances[ntabs[_currentTabIndex]].hideView();
		}			
		_currentTabIndex = seltab;		
	};
   
	MeetingPropertiesTabs.prototype.init = function(){		
		_MeetingPropertiesTabs = new WUXTabBar({
            displayStyle: 'strip',
            showComboBoxFlag: true,
            editableFlag: false,
            multiSelFlag: false,
            reindexFlag: true,
            touchMode: true,
            centeredFlag: false,
            allowUnsafeHTMLOnTabButton: true
        });

		MeetingInfoFacets.forEach((tab,index) => {
			_MeetingPropertiesTabs.add(tab); 
		});
		_MeetingPropertiesTabs.inject(this.container);
		
		//draw the tab contents
		initializeMeetingPropertiesTabs();	
    };
    
    
    
	let initializeMeetingPropertiesTabs = function(){		
		new Promise(function (resolve, reject){
			let promiseArr = [];
			MeetingInfoFacets.forEach((tab, index)=>
			{				
				if((tab.loader != "")){
					promiseArr[index] = new Promise(function (resolve, reject){
						require([tab.loader], function (loader) {
							MeetingInfoTabInstances[tab.id] = loader;	
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
			_MeetingPropertiesTabs.addEventListener('tabButtonClick', function(args){
				ontabClick(args);
			});
			_MeetingPropertiesTabs.addEventListener('change', function(args){
				ontabClick(args);
			});
			
		}, function () {
			//Error during tab click
		});
		
		
	};
	MeetingPropertiesTabs.prototype.destroy = function(){	    	
		try{
			_currentTabIndex = undefined; //this should be the first line, if some error occurs afterward, that would be an issue otherwise			
			Object.keys(MeetingInfoTabInstances).map((tab) => {
				MeetingInfoTabInstances[tab].destroy();
			});
			if(_MeetingPropertiesTabs != undefined){
				_MeetingPropertiesTabs.destroy();
			}
			_meetingInfoModel = {};
			//this.container.destroy();
		}catch(e){
	    	//TODO check why this error: TypeError: Cannot read property '__resizeListeners__' of undefined
			//console.log(e);
		}	
	};   

    
    return MeetingPropertiesTabs;
  });

/* global define, widget */
define('DS/ENXMeetingMgmt/Services/MeetingWidgetUtilServices',
        [
         'UWA/Core',
         'UWA/Class/Promise',
         'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
         'DS/WAFData/WAFData'
         ],
         function(
                 UWACore,
                 Promise,
                 EnoviaBootstrap,
                 WAFData
         ) {
    'use strict';

    let MeetingWidgetUtilServices,_fetchSecurityContext,_fetchStateMapping;
        
    _fetchSecurityContext= function() {
        return new Promise(function(resolve, reject) {
            let postURL=EnoviaBootstrap.get3DSpaceURL()+'/resources/bps/cspaces';
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
                reject(respData);
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    
    _fetchStateMapping = function() {
    	var url = EnoviaBootstrap.get3DSpaceURL()+"/resources/bps/getTypeMaturity?type=Meeting";
		   var returnedPromise = new Promise(function (resolve, reject) {
			
			   require(['DS/WAFData/WAFData'], function (WAFData)	{
				   WAFData.authenticatedRequest(url, {
					   headers: {
						   'Accept': 'application/json',
						   'Content-Type' : 'application/ds-json'
					   },
					   method: 'get',
					   type: 'json',
					   onComplete: function(json) {
						   resolve(json);
					   },
					   onFailure: function(json) {
						   reject(new Error("Could not fetch Type State Mapping NLS values"));
					   }
				   });
			   });
		   });
		   return returnedPromise;
    };
   
    MeetingWidgetUtilServices={
		   fetchSecurityContext: () => {return _fetchSecurityContext();},
		   fetchStateMapping: () => {return _fetchStateMapping();}
    };

    return MeetingWidgetUtilServices;

});

/*
global widget
 */
define('DS/ENXMeetingMgmt/Controller/MeetingController',[
	'DS/ENXMeetingMgmt/Services/MeetingServices',
	'DS/ENXMeetingMgmt/Services/CreateMeetingServices',
	'DS/ENXMeetingMgmt/Services/MeetingWidgetUtilServices',
	'UWA/Promise',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
function(MeetingServices,CreateMeetingServices, MeetingWidgetUtilServices, Promise, NLS) {
    'use strict';
    let MeetingController,meetingID;
    //TODO implement a general callback method for anykind of service failure
    let commonFailureCallback = function(reject,failure){
    		if(failure.statusCode === 500){
    			widget.meetingNotify.handler().addNotif({
                    level: 'error',
                    subtitle: NLS.unexpectedError,
                    sticky: true
                });
                reject(failure);
    		}else{
    			reject(failure);
    		}
    }
    
    /*let commonFailureCallback2 = function(reject,failure){ //for create-meeting and save-as-draft flows
    		if(failure.statusCode === 500){
    			/*widget.meetingNotify.handler().addNotif({
                    level: 'error',
                    subtitle: NLS.unexpectedError,
                    sticky: true
                });*/ //2 notifications end up getting displayed
                /*reject(failure);
    		}else{
    			reject(failure);
    		}
    }*/
    
    /*All methods are public, need to be exposed as this is service controller file*/
    MeetingController = {
    		fetchSecurityContext: function(){
    			return new Promise(function(resolve, reject) {
    				MeetingWidgetUtilServices.fetchSecurityContext().then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		fetchStateMapping: function(){
    			return new Promise(function(resolve, reject) {
    				MeetingWidgetUtilServices.fetchStateMapping().then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		fetchAllMeetings: function(){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.fetchAllMeetings().then(
    						success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});	
    			});
    		},
    		fetchMeetingById: function(meetingID){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.fetchMeetingById(meetingID).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		fetchMeetingAgendas: function(meetingID){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.fetchMeetingAgendas(meetingID).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		if(failure.statusCode !=200) {
    	    				 widget.meetingNotify.handler().addNotif({
    								level: 'error',
    								subtitle: failure.error,
    							    sticky: false
    	    				 }); 
    	    			 } else {
    	    				 commonFailureCallback(reject,failure);
    	    			 }
    		    	});
    			});	
    		},
    		fetchMeetingAttachments: function(meetingID){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.fetchMeetingAttachments(meetingID).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		deleteMeeting: function(ids){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.deleteMeeting(ids).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		deleteAttachment: function(meetingId,ids){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.deleteAttachment(meetingId,ids).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		updateMeetingAgenda: function(jsonData,agendadata,meetnginfo){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.updateMeetingAgenda(jsonData,agendadata,meetnginfo).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		
    		createMeetingAgenda: function(jsonData,agendadata,meetnginfo){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.createMeetingAgenda(jsonData,agendadata,meetnginfo).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		
    		addAttachment: function(model,data){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.addAttachment(model,data).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},


			fetchMembers: function(meetingId){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.fetchMembers(meetingId).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		
    		saveAsMeeting: function(inputData){
    			return new Promise(function(resolve, reject) {
    				CreateMeetingServices.saveAsMeeting(inputData).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		
    		createMeeting: function(inputData){
    			return new Promise(function(resolve, reject) {
    				CreateMeetingServices.createMeeting(inputData).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		
    	  addMembers : function(model,data){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.addMembers(model,data).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		
    	 deleteMember: function(meetingId,ids){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.deleteMember(meetingId,ids).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    	deleteMeetingAgenda :function(meetingId,ids){
			return new Promise(function(resolve, reject) {
				MeetingServices.deleteMeetingAgenda(meetingId,ids).then(
				success => {
					resolve(success);
		    	},
		    	failure => {
		    		commonFailureCallback(reject,failure);
		    	});
			});	
		},
		getContentInfo: function(contentIds){
              return new Promise(function(resolve, reject) {
            	  MeetingServices.getContentInfo(contentIds).then(
                  		success => {
          					resolve(success);
          		    	},
          		    	failure => {
          		    		commonFailureCallback(reject,failure);
          		    	});
              });
        },
		fetchAllowedAttachmentTypesForMeeting: function(){
			return new Promise(function(resolve, reject) {
				MeetingServices.fetchAllowedAttachmentTypesForMeeting().then(
				success => {
					resolve(success);
		    	},
		    	failure => {
		    		commonFailureCallback(reject,failure);
		    	});
			});	
		},
		updateMeetingProperties: function(jsonData,meetingData){
    			return new Promise(function(resolve, reject) {
    				MeetingServices.updateMeetingProperties(jsonData,meetingData).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
		createAgendaDecision: function(jsonData,meetnginfo){
			return new Promise(function(resolve, reject) {
				MeetingServices.createAgendaDecision(jsonData,meetnginfo).then(
				success => {
					resolve(success);
		    	},
		    	failure => {
		    		commonFailureCallback(reject,failure);
		    	});
			});	
		},
		addAppliesToAgendaDecision: function(model,data){
			return new Promise(function(resolve, reject) {
				MeetingServices.addAppliesToAgendaDecision(model,data).then(
				success => {
					resolve(success);
		    	},
		    	failure => {
		    		commonFailureCallback(reject,failure);
		    	});
			});
		}
    		
       };
    return MeetingController;

});

define(
        'DS/ENXMeetingMgmt/Actions/MemberActions',
        [
         'UWA/Drivers/Alone',
         'UWA/Core',
         'DS/WAFData/WAFData',
         'UWA/Utils',
         'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
         'DS/ENXMeetingMgmt/Controller/MeetingController',
         'DS/ENXMeetingMgmt/Utilities/Utils',
         'DS/ENXMeetingMgmt/Model/MeetingMembersModel',
         'DS/ENXMeetingMgmt/Utilities/SearchUtil',
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
         ],
         function(
                 UWA,
                 UWACore,
                 WAFData,
                 UWAUtils,
                 WrapperTileView,
                 MeetingController,
                 Utils,
                 MeetingMembersModel,
                 SearchUtil,
                 NLS
         ) {

            'use strict';
            let MemberActions;
            MemberActions={                  
                    onSearchClick: function(){
                    	var data = WrapperTileView.tileView();
                        var searchcom_socket,scopeId;
                        require(['DS/ENXMeetingMgmt/Model/MeetingMembersModel'], function(memberModel) {
                        	MeetingMembersModel = memberModel;
                            var socket_id = UWA.Utils.getUUID();
                            var that = this;
                            if (!UWA.is(searchcom_socket)) {
                                require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                                    searchcom_socket = SearchCom.createSocket({
                                        socket_id: socket_id
                                    });	
                                    var recentTypes = ["Person","User Group"];
				                    var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addMembers", true , recentTypes);
				                    if(!(widget.getValue("x3dPlatformId") == "OnPremise")){
				        				var source = ["3dspace","usersgroup"];
				        				refinementToSnNJSON.source = source;
				        			}
				                    refinementToSnNJSON.precond = SearchUtil.getPrecondForMeetingMemberSearch(recentTypes);
				                    refinementToSnNJSON.resourceid_not_in = MeetingMembersModel.getMemberIDs();						
				
									if (UWA.is(searchcom_socket)) {
										searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
										searchcom_socket.addListener('Selected_Objects_search', MemberActions.selected_Objects_search.bind(that,data));
										searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
                                    } else {
                                        throw new Error('Socket not initialized');
                                    }
                                });
                            }
                        });

                    },
                   selected_Objects_search : function(that,data){                        
                       MeetingController.addMembers(that,data).then(function(resp) {
                          /* var header = "";
                           if(resp.length>0){
                              if(resp.length == 1){
                               header = NLS.successAddExistingMemberSingle;
                               }else{
                               header = NLS.successAddExistingMember;
                               }
                           }
                            header = header.replace("{count}",resp.length);
                            widget.meetingNotify.handler().addNotif({
                                level: 'success',
                                subtitle: header,
                                sticky: false
                            });*/
                            
                       MeetingMembersModel.appendRows(resp);
                       Utils.getMeetingDataUpdated(that.TreedocModel.meetingId);
                      },
                       function(resp) {
                            if(resp.internalError != undefined && resp.internalError.indexOf("A relationship of this type already exists") != -1){
                            	widget.meetingNotify.handler().addNotif({
                                    level: 'error',
                                    subtitle: NLS.errorAddExistingMember,
                                    sticky: true
                                });
                                
                            }else{
                            	widget.meetingNotify.handler().addNotif({
                                    level: 'error',
                                    subtitle: NLS.errorAddExistingMember,
                                    sticky: true
                                });
                            }   
                        })
                    }
                    /*,
                    getPrecondForMemberSearch: function (memberSearchTypes) {
                        var precond_taxonomies = "flattenedtaxonomies:(";
                        var types_count = memberSearchTypes.length;
                        for(var i=0; i<types_count; i++){
                            var type = memberSearchTypes[i];
                            precond_taxonomies += '\"types\/'+type+'\"';
                            if(i < types_count-1){
                                precond_taxonomies += " OR ";
                            }
                            if(i === types_count-1){
                                precond_taxonomies += ")";
                            }
                        }
                        return precond_taxonomies;
                    }*/

             };
            return MemberActions;
        });

/* global define, widget */
define('DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
        [
            "UWA/Core",
            'DS/ENXMeetingMgmt/Controller/MeetingController',
			'DS/ENXMeetingMgmt/Model/MeetingAttachmentModel',
			'DS/ENXMeetingMgmt/Model/NewMeetingAttachmentsModel',
    		'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
    		'DS/TreeModel/TreeNodeModel',
    		'DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel',
        	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
         ],
         function(  
        		 UWACore,
				 MeetingController,
        		 MeetingAttachmentModel,
				 NewMeetingAttachmentsModel,
				 DropZone,
				 TreeNodeModel,
				 AgendaTopicItemsModel,
                 NLS
         ) {
    'use strict';

	let _currentMeetingModel;
    let init = function(Info) {
    	if(Info && Info.model && Info.model.id) {
    		_currentMeetingModel = Info.model;// MeetingModel.getRowModelById(Info.model.id);
    	}
    };

	// Extract unserializedData from the DropEvent
	let retrieveDroppedDataFromDropEvent = function(e) {
		var unserializedData = {};
		var serializedData;
        var location_func = UWA.is(e.dataTransfer.types.indexOf, 'function') ? 'indexOf' : 'contains',
            data_to_retrieve = '';

        var supported_dnd_types = ['text/searchitems', 'text/plain', 'Text'];
        for (var idx = 0; idx < supported_dnd_types.length && data_to_retrieve === ''; idx++) {
            var exists = e.dataTransfer.types[location_func](supported_dnd_types[idx]);
            if ((UWA.is(exists, 'number') && exists >= 0) || (UWA.is(exists, 'boolean') && exists === true)) {
                data_to_retrieve = supported_dnd_types[idx];
            }
        }

        if (data_to_retrieve === '') throw new Error('Unknown type in DnD');
        else {
            serializedData = e.dataTransfer.getData(data_to_retrieve);
        }

        unserializedData = JSON.parse(serializedData);

        return unserializedData;
    }; 

    let getDroppedData = function(e) {
    	let data;
    	if(e.dataTransfer) {
    		let dropData = retrieveDroppedDataFromDropEvent(e);
    		if(dropData.data && dropData.data.items) {
    			data = dropData.data.items;
    		}    		
    	}else{
    		if(typeof e == "object") {
    			data = e;
    		}else {
    			let dropData = JSON.parse(e);
    			if(dropData.data && dropData.data.items) {
        			data = dropData.data.items;
        		}  
    		}
    	}	
    	return data;
    };
	
    let _onDropTopicItemsManager = function(e, info, target) {
		_manageAgendaTopicItemsDrop(e, info, target);
    };
    
    let _manageAgendaTopicItemsDrop = function(e, info, target) {	
    	let data = getDroppedData(e);
    	let newData = removeExistingData(data, target,info);

       	if(newData.length > 0){
       		let itemIds = [];
	    	newData.every(function(item) {
				let objectId = item.objectId;
	        	itemIds.push(objectId);
	        	return true;
			});
       		MeetingController.getContentInfo(itemIds).then(function(resp) {
       			resp.data.forEach(function (objectInfo) {
					
       				var name= (objectInfo.title ==undefined)? objectInfo.name:objectInfo.title;
       				var node = new TreeNodeModel({
								label : name,
								value :objectInfo.id,
								name  : name,
								type:objectInfo.type,
    				});
					if(info.autoCompleteComponent.selectedItems==undefined){
							info.autoCompleteComponent.selectedItems = node;
					}
					else{
							info.autoCompleteComponent.selectedItems.push(node);
					}
					info.autoCompleteComponent._applySelectedItems();
				
				});
       		});
       	}  else {
			let dataCount = data.length;
			var message = "";
			if(target == "Agenda topic" || target =="New Agenda topic") 
			{
				if(dataCount == 1)
					message = NLS.errorAddTopicItemsSingle;
				else
					message = NLS.errorAddTopicItems;				
			} else
				message = "Unknown target value";
					
			widget.meetingNotify.handler().addNotif({
                level: 'error',
                subtitle: message,
             	sticky: true
             });
		}
    }
	let _onDropManager = function(e, info, target) {
		//if(target == "Create" || info) {
			let attachmentTypes = widget.getValue('meetingAttachmentDnDTypes');
			if(typeof attachmentTypes == 'undefined'){
				  MeetingController.fetchAllowedAttachmentTypesForMeeting().then(
					  success => {
	     	    		  //attachmentTypes = success.data[0].dataelements.meetingDnDAttachmentTypes;
						 attachmentTypes = success.DOCUMENTS;
	     	    		 _manageDrop(e, info, target, attachmentTypes);
	     	    	  	},
	     	    	  failure =>{
	     	    		  console.log("Failure: fetch meeting allowed attachment types")
	     	    	  });
			}else{
				_manageDrop(e, info, target, attachmentTypes);
			}
		/*}
		else {
			widget.meetingNotify.handler().addNotif({
                level: 'error',
                title: NLS.errorAccessAddAttachmentTitle,
                subtitle: NLS.errorAccessAddAttachment,
             	sticky: true
             });
		}*/	
   };

	let _manageDrop = function(e, info, target, attachmentTypes) {	
		let allowedTypes = attachmentTypes;			
		let data = getDroppedData(e);		
		let newData = removeExistingData(data, target);
		
		if(newData.length > 0) {
			if(newData.length != data.length) {
				let existingDataCount = data.length-newData.length;
				
				var message = "";
				var type = "warning";
				
				if(target == "View") {
					if(existingDataCount == 1)
						message = NLS.warningAddExistingAttachmentSingle;
					else
						message = NLS.warningAddExistingAttachment;
				}
				else if(target == "Create") {
					if(existingDataCount == 1)
						message = NLS.warningAddExistingAttachmentSingle;
					else
						message = NLS.warningAddExistingAttachment;
				}	
				else {
					message = "Unknown target value";
					type = "error";		
				}	
						
				message = message.replace("{count}", existingDataCount);
				message = message.replace("{totCount}", data.length);				
				
				widget.meetingNotify.handler().addNotif({
	                level: type,
	                subtitle: message,
	             	sticky: true
	             });
			}
			
			let uniqueCount = newData.length;
			newData = removeUnsupportedData(newData, allowedTypes);
			
			let unSupportedCount = uniqueCount-newData.length;
			if(newData.length > 0) { 
				if(newData.length != uniqueCount) {				
					var message = "";
					
					if(unSupportedCount == 1)
						message = NLS.errorAddExistingAttachmentTypeSingle;
					else
						message = NLS.errorAddExistingAttachmentType;
					
					message = message.replace("{count}", unSupportedCount);
					message = message.replace("{totCount}", data.length);
				
					widget.meetingNotify.handler().addNotif({
		                level: "error",
		                subtitle: message,
		             	sticky: true
		             });
				}
			}
			else {
				var message = "";
				
				if(uniqueCount == data.length) {
					if(uniqueCount <= 1)
						message = NLS.errorAddExistingAttachmentTypeAllSingle;
					else
						message = NLS.errorAddExistingAttachmentTypeAll;
				}
				else {
					if(unSupportedCount == 1)
						message = NLS.errorAddExistingAttachmentTypeSingle;
					else
						message = NLS.errorAddExistingAttachmentType;
					
					message = message.replace("{count}", unSupportedCount);
					message = message.replace("{totCount}", data.length);
				}					
					
				widget.meetingNotify.handler().addNotif({
	                level: 'error',
	                subtitle: message,
	             	sticky: true
	             });
			}	
						
			let itemIds = [];
	    	newData.every(function(item) {
				let objectId = item.objectId;
	        	itemIds.push(objectId);
	        	return true;
			});
			
			let dataSet = [];
					
	       	if(itemIds.length > 0) {
				if(target == "View") {
					
					itemIds.forEach(function(itemId) {
						let detail = {'id' : itemId, 'ds6w:label' : '',
									'ds6w:modified' : '', 'ds6w:status' : ''};
						dataSet.push(detail);
					});
				
					let meetingId = getMeetingId();

					let model = {};
					model.TreedocModel = {'meetingId' :  meetingId};

					MeetingController.addAttachment(model, dataSet).then(function(resp) {
					var message = "";
					
					if(resp.length > 0) {
						if(resp.length == 1)
							message = NLS.successAddExistingAttachmentSingle;
						else
							message = NLS.successAddExistingAttachment;
           			}

					message = message.replace("{count}",resp.length);
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: message,
						sticky: true
					});

					MeetingAttachmentModel.appendRows(resp);					
				 },
	       	        function(resp) {
	       				DropZone._removeDroppableStyle();
						
						widget.meetingNotify.handler().addNotif({
                            level: 'error',
                            subtitle: NLS.errorAddExistingAttachment,
                            sticky: true
                        });
	       			});       
				}
				else if(target == "Create") {
					MeetingController.getContentInfo(itemIds).then(function(resp) {
						dataSet = resp.data;
						
						NewMeetingAttachmentsModel.appendRow(dataSet, true);
				
						if(dataSet.length > 0) {
							if(dataSet.length == 1)
								message = NLS.successAddExistingAttachmentSingle;
							else
								message = NLS.successAddExistingAttachment;
	           			}
	
						message = message.replace("{count}",dataSet.length);
						widget.meetingNotify.handler().addNotif({
							level: 'success',
							subtitle: message,
							sticky: true		
						});		  		
					});
				}
				else {
					widget.meetingNotify.handler().addNotif({
						level: 'error',
						subtitle: "Unknown target value",
						sticky: true
					});
				}
	       	}				
		}
		else {
			let dataCount = data.length;
			var message = "";
			if(target == "View") 
			{
				if(dataCount == 1)
					message = NLS.errorAddExistingAttachmentSingle;
				else
					message = NLS.errorAddExistingAttachments;				
			}
			else if(target == "Create")
			{
				if(dataCount == 1)
					message = NLS.errorAddExistingAttachmentSingle;
				else
					message = NLS.errorAddExistingAttachments;
			}
			else
				message = "Unknown target value";
					
			widget.meetingNotify.handler().addNotif({
                level: 'error',
                subtitle: message,
             	sticky: true
             });
		}			
	};

	let removeExistingData = function(data, target,info) {
			let addedItemsIds=[];
			
			let uniqueData = [];
			
			if(target == "View")
				addedItemsIds = MeetingAttachmentModel.getAttachmentIDs();
			else if(target == "Create")
				addedItemsIds = NewMeetingAttachmentsModel.getAttachmentsIDs();	
			else if(target == "Agenda topic" || target =="New Agenda topic"){
				if(target == "Agenda topic"){
					addedItemsIds = AgendaTopicItemsModel.getAttachmentIDs();
				}
				if(info.autoCompleteComponent != undefined){
	        		if(info.autoCompleteComponent.selectedItems !=undefined && info.autoCompleteComponent.selectedItems.length !=0){
	        			info.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
								addedItemsIds.push(dataElem.options.value);
		            		});
						}
	        	}
			}
			else
				return uniqueData;
			
			data.forEach(function(item) {
	   			let objectId = item.objectId;
	   			if(addedItemsIds && addedItemsIds.indexOf(objectId) == -1) 
					uniqueData.push(item);
			});
			
			return uniqueData;
		}
		
		let removeUnsupportedData = function(data, types) {
			let supportedData = [];
			
			data.forEach(function(item) {
				let objectType = item.objectType;
				if(types && types.indexOf(objectType) > -1)
					supportedData.push(item);
			});
			
			return supportedData;
		}	

		 let getMeetingId = function(){
		   let meetingId = getMeetingIdFromModel();
		   return meetingId;
	   };
	   
	   let getMeetingIdFromModel = function(){
		    //fetch the current selected route, if it's opened then only update the content tab
	       	let meetingModel = getCurrentMeetingModel();
	       	return meetingModel.id;
	   };

		let getCurrentMeetingModel = function(){
	  //fetch the current selected route, if it's opened then only update the content tab
    	/*let selectedRow =  RouteModel.getOpenedRouteModel();
    	let routeModel;
    	if(selectedRow && selectedRow.model){
    		routeModel = selectedRow.model;
    	}
    	return routeModel;*/
		  return _currentMeetingModel;
	  };

	  let getObjectToDrop = function(cellInfo){
		  return  {
			  envId: widget.getValue("x3dPlatformId") ? widget.getValue("x3dPlatformId") : "OnPremise",
			  serviceId: "3DSpace",
			  contextId: "",
			  objectId: cellInfo.options.grid.id,
			  objectType: cellInfo.options.grid.type,
			  displayName: cellInfo.options.grid.title,
			  displayType: cellInfo.options.grid.displayType
		 };
	  };

	  let getContentForDrag = function (dragEvent, dndInfos) {
		  let items = [];
		  // if there are multiple content are selected and dragged
		  if (dndInfos.nodeModel.getTreeDocument().getSelectedNodes().length > 1) {
			  dndInfos.nodeModel.getTreeDocument().getSelectedNodes().forEach(function (cellInfo) {
				  items.push(getObjectToDrop(cellInfo));
			  });
		  } else {
			  items.push(getObjectToDrop(dndInfos.nodeModel));
		  }
	
		  let compassData = {
				  protocol: "3DXContent",
				  version: "1.1",
				  source: widget.getValue("appId") ? widget.getValue("appId") : "ENXMEET_AP", //if appId not found send the hard coded app id, as without this drag and drop fails
				  widgetId: widget.id,
				  data: {
					  items: items
				  }
		  };
		  dragEvent.dataTransfer.setData("Text", JSON.stringify(compassData));
		  dragEvent.dataTransfer.effectAllowed = "all";
	  };
	  
	  let onDropManagerContext = function(e, info, target){
	    	var allowedTypes="Change Order,Change Request,Change Action,Issue,Program,Task,Phase,Gate,Milestone,Risk,Project Space,Workspace";
			_manageContextDrop(e, info, target, allowedTypes);
	   };

	   let _manageContextDrop = function(e, _meetingProperties, target, allowedTypes){
		   var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
		   let data = getDroppedData(e);	
		   if(data && data.length ==1 ) {
			   let itemIds = [];
			   data.every(function(item) {
				   let objectType = item.objectType;
				   if((recentTypes.indexOf(objectType) > -1)){
						let objectId = item.objectId;
				        itemIds.push(objectId);
				        	
					  	MeetingController.getContentInfo(itemIds).then(function(resp) {
					  		var displayvalue = resp.data[0].title?resp.data[0].title:resp.data[0].name 					  		
							_meetingProperties.elements.contextField.value = displayvalue;
							_meetingProperties.elements.contextId = item.objectId;
						});
					}
				   else{
						let subTitle = NLS.replace(NLS.errorAddContextTypeSubtitle,{type_name:objectType});
		        		widget.meetingNotify.handler().addNotif({
			                title: NLS.replace(NLS.errorAddContextType,{
		                        type_name:objectType
		                    }),
							subtitle: subTitle,
			                level: 'error'
			            });
		        	}
			   });
		   } else {
			   widget.meetingNotify.handler().addNotif({
	               subtitle: NLS.errorOnDropMoreContextSelected,
	               level: 'error'
	           });
		   }
	   }
	   

		
	
		let DragAndDropManager ={
			init: (info) => {return init(info);},
	    	onDropManager: (e, info, target) => { return _onDropManager(e, info, target);},
	    	onDropTopicItemsManager: (e, info, target) => { return _onDropTopicItemsManager(e, info, target);},
	    	getContentForDrag: (e, info) => {return getContentForDrag(e, info);},
	    	onDropManagerContext: (e, info, target) => { return onDropManagerContext(e, info, target);}

	   };
	   return DragAndDropManager;
		
	});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/Actions/MeetingActions', [
		'DS/ENXMeetingMgmt/Controller/MeetingController',
		'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		'DS/ENXMeetingMgmt/Model/MeetingModel',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(MeetingController,EnoviaBootstrap, MeetingModel, NLS) {
	'use strict';
	let MeetingActions,dialog;
	
	let DeleteMeeting = function(ids,actionFromIdCard){
		MeetingController.deleteMeeting(ids).then(
				success => {
					var successMsg = NLS.successRemoveMeeting;
					if(ids.length == 1){
						successMsg = NLS.successRemoveMeetingSingle;
					}
					successMsg = successMsg.replace("{count}",ids.length);
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: successMsg,
					    sticky: false
					});
					//published to subscribe in summary view
					widget.meetingEvent.publish('meeting-summary-delete-row-by-ids',{model:ids});
					
					// Close the id card only if the route deleted is opened in the id card //
					//TODO - needs to update the publish by coresponding change
					widget.meetingEvent.publish('meeting-data-deleted',{model:ids});
					widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model:MeetingModel.getModel()});
					
				},
				failure =>{
				//TODO GDS5 -------Need to modify error msg based on condition
					if(failure.error){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: failure.error,
						    sticky: false
						});
					}else{
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorRemove,
						    sticky: false
						});
					}
				});
	};
	
	let DeleteAttachment = function(meetingId,ids){
		MeetingController.deleteAttachment(meetingId,ids).then(
				success => {
					var successMsg = NLS.successRemoveAttachment;
					if(ids.length == 1){
						successMsg = NLS.successRemoveAttachmentSingle;
					}
					successMsg = successMsg.replace("{count}",ids.length);
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: successMsg,
					    sticky: false
					});
				},
				failure =>{
				//TODO GDS5 -------Need to modify error msg based on condition
					if(failure.error){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: failure.error,
						    sticky: false
						});
					}else{
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorRemove,
						    sticky: false
						});
					}
				});
	};
	
	let DeleteMember = function(meetingId,ids){
	   return new Promise(function(resolve, reject) {
		MeetingController.deleteMember(meetingId,ids).then(
				success => {
					var successMsg = NLS.successRemoveMember;
					if(ids.length == 1){
						successMsg = NLS.successRemoveMemberSingle;
					}
					successMsg = successMsg.replace("{count}",ids.length);
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: successMsg,
					    sticky: false
					});
					resolve();
				},
				failure =>{
				//TODO GDS5 -------Need to modify error msg based on condition
					if(failure.error){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: failure.error,
						    sticky: false
						});
					}else{
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorRemove,
						    sticky: false
						});
					}
				});
				});
	};
    
	MeetingActions={
			DeleteMeeting: (ids,actionFromIdCard) => {return DeleteMeeting(ids,actionFromIdCard);},
			DeleteAttachment: (meetingId,ids) => {return DeleteAttachment(meetingId,ids);},
			DeleteMember: (meetingId,ids) => {return DeleteMember(meetingId,ids);}
    };
    
    return MeetingActions;
});

define('DS/ENXMeetingMgmt/View/Form/MeetingUtil',
[
	'DS/ENXMeetingMgmt/Utilities/SearchUtil',
	'DS/ENXMeetingMgmt/Controller/MeetingController',
	'DS/ENXMeetingMgmt/Model/MeetingModel',
	'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
	'DS/ENXMeetingMgmt/Utilities/Utils',
	'DS/Controls/LineEditor',
	'DS/Controls/Editor',
	'DS/Controls/Toggle',
	'DS/Controls/ButtonGroup',
	'DS/Controls/Button',
	'DS/Controls/ComboBox',
	'DS/Controls/DatePicker',
	'DS/Controls/SelectionChipsEditor',
	'DS/Controls/SelectionChips',
	'DS/ENXMeetingMgmt/Utilities/CustomFieldUtil',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
function(SearchUtil,MeetingController,MeetingModel,ParseJSONUtil,Utils, WUXLineEditor, WUXEditor, WUXToggle, WUXButtonGroup, WUXButton, WUXComboBox, WUXDatePicker, SelectionChipsEditor, SelectionChips, CustomFieldUtil, NLS) {    
		"use strict";
		
		let MeetingUtil = {
				
				meetingPropertiesUpdate : function(meetingData,meetingProperties){
				
					// validation for title //
					if(!validateTitle(meetingProperties)){
						return;
					}
					
					 // validate start date //
					if((Date.parse(meetingData.model.startDate) != Date.parse(meetingProperties.elements.meetingStartDateDate.value)) && !(MeetingUtil.validateStartDateTime(meetingProperties))){
						return;
					}
					
					// validation for duration //
					if(!(MeetingUtil.validateDuration(meetingProperties))){
						return;
					}
					
					let strMeetingDuration = meetingProperties.elements.duration.value;
					
					var totalDur =parseInt(widget.getValue('SumOfAgendaDuration'));
					if(totalDur>strMeetingDuration){
						widget.meetingNotify.handler().addNotif({
							level: 'warning',
							subtitle: NLS.agendaDurExceedsMeetDurMessage,
						    sticky: false
						});
					}
					
					//validation for custom fields
					if (!(this.validateCustomFields(meetingProperties)))
						return;
					    

					var initiateJson = getParsedEditMeetingProperties(meetingProperties);
					initiateJson = new ParseJSONUtil().createDataForRequest(initiateJson);
					initiateJson.data[0].relateddata = {};
					//initiateJson.data[0].relateddata={"contextEdited": meetingProperties.contextEdited};
					
					var meetingId = meetingData.model.id;
					var startDateChangedFlag=Date.parse(meetingData.model.startDate) != Date.parse(meetingProperties.elements.meetingStartDateDate.value);
					var info=meetingData;
					MeetingController.updateMeetingProperties(initiateJson,meetingData).then(
							success => {
								var successMsg = NLS.MeetingPropertiesUpdateSuccessMsg;
								widget.meetingNotify.handler().addNotif({
									level: 'success',
									subtitle: successMsg,
								    sticky: false
								});
								MeetingModel.updateRow(success);  
								//widget.meetingEvent.publish('meeting-summary-update-properties',success);
								Utils.getMeetingDataUpdated(meetingId);
								if(startDateChangedFlag == true){
									require(['DS/ENXMeetingMgmt/View/Facets/MeetingAgenda'], function(MeetingAgenda) {
										/*IR-1028482-3DEXPERIENCER2023x*/
										var displayAgenda = "block";
										if(document.querySelector('#meetingAgendaContainer') != null){
											displayAgenda=  document.getElementById('meetingAgendaContainer').style.display;
										}
										MeetingAgenda.destroy();
										MeetingAgenda.init(info,"false");
										if(document.querySelector('#meetingAgendaContainer') != null){
											document.getElementById('meetingAgendaContainer').style.display = displayAgenda;
										}
									});
								}
								//widget.meetingEvent.publish(agndaProperties.closeEventName);
							},
							failure =>{
								if (failure.statusCode!==500) {
									if(failure.error){
										widget.meetingNotify.handler().addNotif({
											level: 'error',
											subtitle: failure.error,
										    sticky: false
										});
									}else{
										widget.meetingNotify.handler().addNotif({
											level: 'error',
											subtitle: NLS.errorRemove,
										    sticky: false
										});
									}
								}
						});
					
				},
				validateStartDateTime : function(properties){
					var startDate = properties.elements.meetingStartDateDate;
					// validate start date and  time//
					if(startDate.value == ""){
							widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.errorStartDate,
								sticky: false
							});
							return false;
						}
						// If start date selected is less than / equal to today //
						var toDayDate = new Date();
						if((Date.parse(startDate.value.toGMTString()) 
								<= Date.parse(toDayDate.toGMTString()))){
							widget.meetingNotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.errorStartDate2,
									    sticky: false
									});
							return false;	
						}
					return true;
				},
				
			validateAgenda: function(agendaModel){
				var agendaflag = "true";
    			  agendaModel.forEach((agenda) => {
    				  let agendaTopicName = agenda.info.topic.value.trim();
        			  if(agendaTopicName == "" ){
        				  widget.meetingNotify.handler().addNotif({
  							level: 'error',
  							subtitle: NLS.selectAgendaTopicMessage,
  						    sticky: false
            			  });
						  agendaflag = "false";
        				return agendaflag;
        			  }
        			  if(agenda.info.duration.value == ""){
        				  widget.meetingNotify.handler().addNotif({
  							level: 'error',
  							subtitle: NLS.errorAgendaDuration,
  						    sticky: false
            			  });
        				agendaflag = "false";
        				return agendaflag;
        			  }
        			 var strAgendaDuration = agenda.info.duration.value.trim();
					 if (isNaN(strAgendaDuration)) {
						 widget.meetingNotify.handler().addNotif({
								level: 'error',
								message: NLS.errorAgendaDurationNumeric,
							    sticky: false
							});
						 agendaflag = "false";
        				return agendaflag;
					    } else if (strAgendaDuration > 0 && strAgendaDuration <= 500) {
					    } else {
					    	widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.agendaDurationLimitMessage,
							    sticky: false
							});
					    	agendaflag = "false";
        				return agendaflag;
					    }					           				
    			  })
				  return agendaflag
			},
			
			checkMeetingAndAgendaDuration : function(meetingDuration,agendaModel){
				 var totalDuration=0;
				 agendaModel.forEach((agenda) => {
      			 totalDuration=totalDuration + parseInt(agenda.info.duration.value);
  			  })
  			  if(totalDuration>parseInt(meetingDuration)){
  				widget.meetingNotify.handler().addNotif({
					level: 'warning',
					subtitle: NLS.agendaDurExceedsMeetDurMessage,
				    sticky: false
				}); 
  			  }
			},
						
			getViewType: function(ele){
				let viewConfig = JSON.parse(ele.viewConfig) || null;
				if (viewConfig&&viewConfig.type)
					return viewConfig.type;
			},
			
			getViewAttributeType: function(ele){
				let viewConfig = JSON.parse(ele.viewConfig) || null;
				if (viewConfig&&viewConfig.attributeType)
					return viewConfig.attributeType;
			},
			
			getDefaultValue: function(ele) {
				let viewConfig = JSON.parse(ele.viewConfig) || null;
				if (viewConfig&&viewConfig.defaultValue)
					return viewConfig.defaultValue;
				else
					return "";
			},
			
			addDimensionToLineeditor: function(container, ele) {
				container.setStyle("display","flex");
				let defUnit = this.getDefaultUnit(ele);
				let lineEditorDisabledModel = {
					 placeholder: defUnit.display,
					 disabled: true,
					 sizeInCharNumber: 5
			 	};
			 	let space1 = new UWA.Element('div', {html:"&nbsp;"});
				space1.inject(container);
				this.getViewTypeElement('lineeditor', lineEditorDisabledModel).inject(container);
			},
			
			getDefaultUnit: function(ele) {
				let defUnit = "";
				if(ele.units){
					ele.units.item.forEach((it) =>{
						if(it["default"] === true ){
							it.display = it.display.replace("x",".");
							it.display = it.display.replace("_","/");
							defUnit = it;
						}
					});
				}
				return defUnit;
			},
			
			isMultiValueField: function(field){
				let viewConfig = JSON.parse(field.viewConfig);
				if(viewConfig.multivalue === true){
					return true;
				}
				return false;
			},
			
			isValidDate: function (obj) {
		        return UWA.is(obj, 'date') && !isNaN(obj.getTime());
		    },
		    
		    isDateField: function(field){
				let viewConfig = JSON.parse(field.viewConfig);
				if(viewConfig.type === 'date'){
					return true;
				}
				return false;
			},
		    
		    getLocaleDate: function(date, isFormatRequired){
		    	const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
		    	if(isFormatRequired){
		        	let swymLang = this.getCookie("swymlang");
		        	//if swymlang not present, then this will return based on the browser's language settings
		        	return (swymLang != undefined) ? date.toLocaleString(swymLang, options) : date.toLocaleString("en", options);
		    	}
		    	//Always hardcoding locale to "en" if no format is specified 
		        return date.toLocaleString("en", options);
		    },
		    
		    getLocaleTime: function(date, isFormatRequired){
		    	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		    	if(isFormatRequired){
		        	let swymLang = this.getCookie("swymlang");
		        	//if swymlang not present, then this will return based on the browser's language settings
		        	return (swymLang != undefined) ? date.toLocaleTimeString(swymLang, options) : date.toLocaleTimeString("en", options);
		    	}
		    	//Always hardcoding locale to "en" if no format is specified 
		        return date.toLocaleTimeString("en", options);
		    },
		    
		    getCookie: function (name) {
		    	  var value = "; " + document.cookie;
		    	  var parts = value.split("; " + name + "=");
		    	  if (parts.length >= 2) return parts.pop().split(";").shift();
		    },
			
			getRangeElementsList: function(field) {
				let rangeList = field.range.item;
				let elementsList = [];
				rangeList.forEach((range, index) => {
					let mappedData = {
							labelItem: range.display,
							valueItem: range.value	
					}
					elementsList.push(mappedData);
				});
				return elementsList;
			},
			
			getViewTypeElementName: function(ele) {
				let viewConfig = JSON.parse(ele.viewConfig) || null;
				if (viewConfig&&viewConfig.type) {
					switch(viewConfig.type) {
						case "text":
							return 'editor';
						case "number":
						case "real":
							return 'lineeditor';
						case "date":
							return 'datepicker';
						case "select": 
							return 'combobox';
						case "checkbox":
							return 'toggle';
						default:
							return;
					}
				}
			},
			
			getViewTypeElement: function(viewType, options) {
				switch(viewType) {
					case "editor": {
						return new WUXEditor(options);
					}
					
					case "lineeditor": {
						return new WUXLineEditor(options);
					}
					
					case "datepicker": {
						return new WUXDatePicker(options);
					}
					
					case "combobox": {
						return new WUXComboBox(options);
					}
					
					case "toggle": {
						return new WUXToggle(options);
					}
					
					default: {
						if (!options)
							options = {};
						//return new WUXEditor(options);
					}
				}
			}, 
			
			addButtonsForMultivalueField: function(CustomFieldUtilObj, container, parentContainer, type) {
				//let self = this;
				
				let buttonContainer = new UWA.Element("div", {
						"id": "MultiVal_button",
						"class": "",
						"styles": {"display": "flex"}
				});
								
				if (type=="plus") 
					this.addPlusButtonForMultivalueField(CustomFieldUtilObj, container, parentContainer, buttonContainer);
				else if (type=="minus")
					this.addMinusButtonForMultivalueField(CustomFieldUtilObj, container, parentContainer, buttonContainer);
			},
			
			addPlusButtonForMultivalueField: function(CustomFieldUtilObj, container, parentContainer, buttonContainer) {
				let self = this; 
				
				//let spacer = new UWA.Element('span', {html:"&nbsp;"}).inject(parentContainer);
				let plusButton = CustomFieldUtil.getPlusButtonForMultivalueField();
				if (container) {
					plusButton.inject(buttonContainer).inject(container);
					container.inject(parentContainer);
				}
				else {
					plusButton.inject(buttonContainer).inject(parentContainer);
				}
				
				let btnListener = function() {
					let tempData = CustomFieldUtilObj.getButtonData();
					let tempMeetingProps = tempData.meetingProperties.elements;
					let tempMeetingProp = tempMeetingProps[tempData.ele.name];
					let totalRows = tempMeetingProp.length;
					self.renderMultivalueFieldInPropertiesView2(CustomFieldUtilObj.getButtonData().eleType, CustomFieldUtilObj.getButtonData().ele, CustomFieldUtilObj.getButtonData().data, CustomFieldUtilObj.getButtonData().requiredFlag, CustomFieldUtilObj.getButtonData().meetingProperties, "add", totalRows, parentContainer, CustomFieldUtilObj.getButtonData().childContainer);
				}
				plusButton.getContent().addEventListener("buttonclick", btnListener);
			},
			
			addMinusButtonForMultivalueField: function(CustomFieldUtilObj, container, parentContainer, buttonContainer) {
				let self = this;
				
				/*let buttonContainer = new UWA.Element("div", {
						"id": "MultiVal_button",
						"class": ""
				});*/
				CustomFieldUtilObj.getButtonData().removeContainer = container;
				let minusButton = CustomFieldUtil.getMinusButtonForMultivalueField();
				let spacer = new UWA.Element('span', {html:"&nbsp;&nbsp;&nbsp;&nbsp;"}).inject(buttonContainer);
				minusButton.inject(buttonContainer)
				buttonContainer.inject(container);
				container.inject(parentContainer);
				//let spacer = new UWA.Element('span', {html:"&nbsp;"}).inject(parentContainer);
				
				let btnListener = function() {
					let removeContainer = CustomFieldUtilObj.getButtonData().removeContainer;
					let containerID = CustomFieldUtilObj.getButtonData().removeContainer.id;
					let eleName = CustomFieldUtilObj.getButtonData()['ele'].name;
					//let index = parseInt(containerID.replace(eleName, '').replace('-', ''));
					let index = containerID.split("-")[1];
					let meetingProperties = CustomFieldUtilObj.getButtonData().meetingProperties;
					let removeElemIdx = meetingProperties.elements[eleName].findIndex((elem, idx) => {return elem.elements.container.getData('removeKey')==index});
					if (removeElemIdx>-1) {
						meetingProperties.elements[eleName].splice(removeElemIdx, 1);
					}
					removeContainer.destroy();
										
				}
				
				minusButton.getContent().addEventListener("buttonclick", btnListener);
			},
			
			renderMultivalueFieldInPropertiesView: function(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, meetingProperties, data) {
				let elem, container;
				let attrValue = (data.model) ? ((data.model[ele.name]) ? data.model[ele.name] : "") : "";
				if (!meetingProperties.elements[ele.name])
					meetingProperties.elements[ele.name] = [];
					
					
				let isEditable = ele.editable;
				if (isEditable===false) {
					elem = this.renderFieldInPropertiesView(eleType, ele, attrValue, requiredFlag);
					container = new UWA.Element("div", { "id": ele.name}).inject(containerDiv);
					elem.inject(container);
					meetingProperties.elements[ele.name].push(elem);
					return;
				}
								
				if (eleType=='editor'||eleType=='lineeditor') {
					elem = this.renderFieldInPropertiesView("selectionchips", ele, attrValue, requiredFlag);
				}
				else if (eleType=='datepicker') {
					let options = {
						value: attrValue || [],
						allowMultipleValuesFlag: true,
						allowUndefinedFlag: false,
						timePickerFlag: true
					};
					elem = new WUXDatePicker(options);
				}
				else if (eleType=='combobox') {
					console.log("it shouldn't reach this");
					/*let elementsList = this.getRangeElementsList(ele);
					let option = {
						elementsTree: elementsList,						
						allowFreeInputFlag: false,
						multiSearchMode: true
					};
					elem = new WUXAutoComplete(options);*/
					//this.renderFieldInCreateView(eleDataType, "multivalauthorised", requiredFlag, eleDefaultValue, ele);
					
					/*let elementsList = MeetingUtil.getRangeElementsList(ele);
					let options = {
						elementsList: elementsList,
						enableSearchFlag: true
					};
					let cb = this.getViewTypeElement("combobox", options);
					let sc = new SelectionChips({value: [], id: new Date()});					
					let cobj = CustomFieldUtil.getCustomFieldUtilObj();					
					cobj.setData({'combobox': cb, 'selectionchip': sc});
					//return this.renderMultivalWithAuthValues(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, cb, sc, null);
					this.renderMultivalWithAuthValues(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, cobj, null);
					let data = cobj.getData();
					cb = data['combobox'];
					sc = data['selectionchip'];
					if (!cb||!sc)
						return;
					sc.inject(containerDiv);
					new UWA.Element("div", {
				      "styles": {"padding":"5px"}
				    }).inject(containerDiv);
					cb.inject(containerDiv);
					meetingproperties.elements[ele.name] = sc;
					return;*/
					
				}
				else if (eleType=='toggle') {
					//render single checkbox
					//it shouldn't come here
					//elem = this.renderFieldInCreateView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele);
				}		
				
				return elem;
			},
				
			renderMultivalueFieldInPropertiesView2: function(eleType, ele, data, requiredFlag, meetingProperties, source, rowNumber, parentContainer, childContainer) {
												
				let elem, container;
				let attrValue = (data.model) ? ((data.model[ele.name]) ? data.model[ele.name] : "") : "";
				//let rowNumber = rowNumber || 0;
				if (!meetingProperties.elements[ele.name])
					meetingProperties.elements[ele.name] = [];
					
					
				let isEditable = ele.editable;
				if (isEditable===false) {
					elem = this.renderFieldInPropertiesView(eleType, ele, attrValue, requiredFlag);
					container = new UWA.Element("div", { "id": ele.name}).inject(childContainer);
					elem.inject(container);
					meetingProperties.elements[ele.name].push(elem);
					return;
				}
				
				if (!source) {
					let rowNum = 0;
					if (attrValue && attrValue.length && attrValue.length>0) {
						let cObj = {};
						//let rowNum = 0;
						//if (Array.isArray(attrValue[0]))
							//attrValue = attrValue[0];
						for (let i=0; i<attrValue.length; i++) {
							let tempAttrValue;
							elem = this.renderFieldInPropertiesView(eleType, ele, attrValue[i], requiredFlag);							
							if(elem) {
								container = new UWA.Element("div", { "id": ele.name+"-"+rowNum, "class":"multiVal", "styles":{'padding': '10px 0px', 'display': 'flex'}}).inject(childContainer);
								let CustomFieldUtilObj = CustomFieldUtil.getCustomFieldUtilObj();
								let buttonData = {
									eleType: eleType,
									ele: ele,
									data: data,
									requiredFlag: requiredFlag,
									meetingProperties: meetingProperties,
									parentContainer: parentContainer,
									childContainer: childContainer
								};								
								CustomFieldUtilObj.setButtonData(buttonData);
								CustomFieldUtilObj.setRowNum(rowNum);
								if (i==((attrValue.length)-1))
									cObj = CustomFieldUtilObj;
								elem.inject(container);
								//add units here
								if(ele.units) {
									let containerDivInner2 = new UWA.Element("div", {							
										"id": ele.name+"-inner2",
										"class": ""
										
									}).inject(container);
									//_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
									MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
								}								
								elem.elements.container.setData('removeKey', rowNum);
								meetingProperties.elements[ele.name].push(elem);	
								
								
								//add +/- buttons
								if (i>0)
									this.addButtonsForMultivalueField(CustomFieldUtilObj, container, childContainer, "minus");
								
								rowNum++;
								CustomFieldUtilObj = null;
							}					
						}
						this.addButtonsForMultivalueField(cObj, null, parentContainer, "plus");
					}					
					else {						
						elem = this.renderFieldInPropertiesView(eleType, ele, "", requiredFlag);
						if(elem) {
							container = new UWA.Element("div", { "id": ele.name+"-"+rowNum, "class":"multiVal", "styles":{'padding': '10px 0px', 'display': 'flex'}}).inject(childContainer);
							let buttonData = {
								eleType: eleType,
								ele: ele,
								data: data,
								requiredFlag: requiredFlag,
								meetingProperties: meetingProperties,
								parentContainer: parentContainer,
								childContainer: childContainer
							};
							let CustomFieldUtilObj = CustomFieldUtil.getCustomFieldUtilObj();
							CustomFieldUtilObj.setButtonData(buttonData);
							CustomFieldUtilObj.setRowNum(rowNum);
							let totalRows = rowNum + 1;
							CustomFieldUtilObj.setTotalRows(totalRows);
							elem.inject(container);
							//add units here
							if(ele.units) {
							let containerDivInner2 = new UWA.Element("div", {							
									"id": ele.name+"-inner2",
									"class": ""
									
								}).inject(container);
								//_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
								MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
							}
							elem.elements.container.setData('removeKey', rowNum);
							meetingProperties.elements[ele.name].push(elem);						
							//add +/- buttons
							this.addButtonsForMultivalueField(CustomFieldUtilObj, null, parentContainer, "plus");
							rowNum++;
						}						
					}
					
				}
				else {
					elem = this.renderFieldInPropertiesView(eleType, ele, "", requiredFlag);
					
					if(elem) {
						//let totalRows = data.model[ele.name].length;
						let totalRows = rowNumber + 1;					
						container = new UWA.Element("div", { "id": ele.name+"-"+rowNumber, "class":"multiVal", "styles":{'padding': '10px 0px', 'display': 'flex'}}).inject(childContainer);
						let buttonData = {
							eleType: eleType,
							ele: ele,
							data: data,
							requiredFlag: requiredFlag,
							meetingProperties: meetingProperties
						};
						let CustomFieldUtilObj = CustomFieldUtil.getCustomFieldUtilObj();
						CustomFieldUtilObj.setButtonData(buttonData);
						CustomFieldUtilObj.setRowNum(totalRows); 
						elem.inject(container);
						//add units here
						if(ele.units) {
							let containerDivInner2 = new UWA.Element("div", {							
								"id": ele.name+"-inner2",
								"class": ""
								
							}).inject(container);
							//_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
							MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
						}
						elem.elements.container.setData('removeKey', rowNumber);
						meetingProperties.elements[ele.name].push(elem);
						//meetingProperties.elements[ele.name].splice(rowNumber, 0, elem);
						
						if (source=="add") {
							this.addButtonsForMultivalueField(CustomFieldUtilObj, container, childContainer, "minus");
						//rowNum++;
						}
					}					
				}				
				//do not return container;					
				
			}, 
			
			addButtonsForMultivalueFieldInCreateView: function(CustomFieldUtilObj, container, parentContainer, type) {
				//let self = this;
				
				let buttonContainer = new UWA.Element("div", {
						"id": "MultiVal_button",
						"class": "",
						"styles": {"display": "flex"}
				});
								
				if (type=="plus") 
					this.addPlusButtonForMultivalueFieldInCreateView(CustomFieldUtilObj, container, parentContainer, buttonContainer);
				else if (type=="minus")
					this.addMinusButtonForMultivalueField(CustomFieldUtilObj, container, parentContainer, buttonContainer);
				
			},
			
			addPlusButtonForMultivalueFieldInCreateView: function(CustomFieldUtilObj, container, parentContainer, buttonContainer) {
				let self = this; 
				
				//let spacer = new UWA.Element('span', {html:"&nbsp;"}).inject(parentContainer);
				let plusButton = CustomFieldUtil.getPlusButtonForMultivalueField();
				if (container) {
					plusButton.inject(buttonContainer).inject(container);
					container.inject(parentContainer);
				}
				else {
					plusButton.inject(buttonContainer).inject(parentContainer);
				}			
				
				
				let btnListener = function() {
					let tempData = CustomFieldUtilObj.getButtonData();
					let tempMeetingProps = tempData.meetingProperties.elements;
					let tempMeetingProp = tempMeetingProps[tempData.ele.name];
					let totalRows = tempMeetingProp.length;
					self.renderMultivalueFieldInCreateView2(CustomFieldUtilObj.getButtonData().eleDataType, CustomFieldUtilObj.getButtonData().eleType, CustomFieldUtilObj.getButtonData().ele, CustomFieldUtilObj.getButtonData().requiredFlag, CustomFieldUtilObj.getButtonData().meetingProperties, "add", totalRows, parentContainer, CustomFieldUtilObj.getButtonData().childContainer);
				}
				plusButton.getContent().addEventListener("buttonclick", btnListener);
			},
			
			addMinusButtonForMultivalueFieldInCreateView: function(CustomFieldUtilObj, container, parentContainer, buttonContainer) {
				let self = this;
				
				CustomFieldUtilObj.getButtonData().removeContainer = container;
				let minusButton = CustomFieldUtil.getMinusButtonForMultivalueField();
				//minusButton.inject(buttonContainer).inject(container);
				let spacer = new UWA.Element('span', {html:"&nbsp;&nbsp;&nbsp;&nbsp;"}).inject(buttonContainer);
				minusButton.inject(buttonContainer);
				buttonContainer.inject(container);
				container.inject(parentContainer);
				//let spacer = new UWA.Element('span', {html:"&nbsp;"}).inject(parentContainer);
				
				let btnListener = function() {
					let removeContainer = CustomFieldUtilObj.getButtonData().removeContainer;
					let containerID = CustomFieldUtilObj.getButtonData().removeContainer.id;
					let eleName = CustomFieldUtilObj.getButtonData()['ele'].name;
					//let index = parseInt(containerID.replace(eleName, '').replace('-', ''));
					let index = containerID.split("-")[1];
					let meetingProperties = CustomFieldUtilObj.getButtonData().meetingProperties;
					let removeElemIdx = meetingProperties.elements[eleName].findIndex((elem, idx) => {return elem.elements.container.getData('removeKey')==index});
					if (removeElemIdx>-1) {
						meetingProperties.elements[eleName].splice(removeElemIdx, 1);
					}
					removeContainer.destroy();
					
				}
				minusButton.getContent().addEventListener("buttonclick", btnListener);
			},
			
			selectionChipCustomValidatorInteger: function(value) {
				//value is a string, always
				if (value&&/^[0-9]+$/.test(value))
					return value;
				return;
			},
			selectionChipCustomValidatorReal: function(value) {
				if (value&&/^[0-9]+$|(^[0-9]+\.[0-9]+$)/.test(value))
					return value;
				return;
			},
			
			
			/*renderMultivalWithAuthValues: function(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, cobj, data) {
				//get authorised values from ele
				//create a combobox with it --created in previous function and passed as cb
				if (!cobj)
					return;
					
				//create view
				if (!data) {
					this.setMultivalAuthListener(cobj);
				}
				else { //properties view
				
				}
				
			},
			
			setMultivalAuthListener: function(customData) {
				let data = customData.getData();
				let cb = data['combobox'];
				let sc = data['selectionchip'];
				
				if (!cb||!sc)
					return;
					
				cb.addEventListener('change', function(e) {
					console.log(e.dsModel.value);
					let data = customData.getData();
					if (e.dsModel.value) {
						data.selectionchip.addChip({label: e.dsModel.value, value: e.dsModel.value});
						//data.combobox==e.dsModel						
						e.dsModel.selectedIndex = -1;
					}
				});
				
			},		*/	
			
			renderMultivalueFieldInCreateView: function(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, meetingproperties) {
				let elem;
								
				if (eleType=='editor'||eleType=='lineeditor') {
					elem = this.renderFieldInCreateView(eleDataType, "selectionchips", requiredFlag, eleDefaultValue, ele);
				}
				else if (eleType=='datepicker') {
					let options = {
						value: [new Date()],
						allowMultipleValuesFlag: true,
						allowUndefinedFlag: false,
						timePickerFlag: true
					};
					elem = new WUXDatePicker(options);
				}
				else if (eleType=='combobox') {
					console.log("it shouldn't come here");
					/*let elementsList = this.getRangeElementsList(ele);
					let option = {
						elementsTree: elementsList,						
						allowFreeInputFlag: false,
						multiSearchMode: true
					};
					elem = new WUXAutoComplete(options);*/
					//this.renderFieldInCreateView(eleDataType, "multivalauthorised", requiredFlag, eleDefaultValue, ele);
					
					/*let elementsList = MeetingUtil.getRangeElementsList(ele);
					let options = {
						elementsList: elementsList,
						enableSearchFlag: true
					};*/
					//elem = this.renderMultivalueFieldInCreateView2(eleDataType, "combobox", ele, requiredFlag, meetingproperties, "", null, containerDiv, containerDivInner); //source = "", rowNum = null
					/*let cb = this.getViewTypeElement("combobox", options);
					let sc = new SelectionChips({value: [], id: new Date()});					
					let cobj = CustomFieldUtil.getCustomFieldUtilObj();					
					cobj.setData({'combobox': cb, 'selectionchip': sc});
					//return this.renderMultivalWithAuthValues(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, cb, sc, null);
					this.renderMultivalWithAuthValues(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, cobj, null);
					let data = cobj.getData();
					cb = data['combobox'];
					sc = data['selectionchip'];
					if (!cb||!sc)
						return;
					sc.inject(containerDiv);
					new UWA.Element("div", {
				      "styles": {"padding":"5px"}
				    }).inject(containerDiv);
					cb.inject(containerDiv);
					meetingproperties.elements[ele.name] = sc;
					return;*/
					
				}
				else if (eleType=='toggle') {
					//render single checkbox
					//it should not come here
					//elem = this.renderFieldInCreateView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele);
				}		
				
				return elem;
			},
			
			hasAuthorisedValues: function(ele) {
				if (ele.range)
					return true;
				return false;
			},
			
			renderMultivalueFieldInCreateView2: function(eleDataType, eleType, ele, requiredFlag, meetingProperties, source, rowNumber, parentContainer, childContainer) {
												
				let elem, container;
				let eleDefaultValue = this.getDefaultValue(ele);
				if (!meetingProperties.elements[ele.name])
					meetingProperties.elements[ele.name] = [];
				
				if (!source) { //this block will run only once in create: on render
					let rowNum = 0;
					let cObj = {};
					elem = this.renderFieldInCreateView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele);							
					if(elem) {
						container = new UWA.Element("div", { "id": ele.name+"-"+rowNum, "class":"multiVal", "styles":{'padding': '10px 0px', 'display': 'flex'}}).inject(childContainer);
						let CustomFieldUtilObj = CustomFieldUtil.getCustomFieldUtilObj();
						let buttonData = {
							eleDataType: eleDataType,
							eleType: eleType,
							ele: ele,
							requiredFlag: requiredFlag,
							meetingProperties: meetingProperties,
							parentContainer: parentContainer,
							childContainer: childContainer
						};								
						CustomFieldUtilObj.setButtonData(buttonData);
						CustomFieldUtilObj.setRowNum(rowNum);
						cObj = CustomFieldUtilObj;
						elem.inject(container);
						//add units here
						if(ele.units) {
							let containerDivInner2 = new UWA.Element("div", {							
								"id": ele.name+"-inner2",
								"class": ""
								
							}).inject(container);
							//_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
							MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
						}								
						elem.elements.container.setData('removeKey', rowNum);
						meetingProperties.elements[ele.name].push(elem);
						if (requiredFlag) {
							elem.addEventListener('change', function(e) {
								widget.meetingEvent.publish('create-meeting-toggle-dialogbuttons', { properties : meetingProperties});		 									
							});
						}														
						
						//add + button
						this.addButtonsForMultivalueFieldInCreateView(cObj, null, parentContainer, "plus");
						CustomFieldUtilObj = null;
					}
				}
				else {
					elem = this.renderFieldInCreateView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele);
					
					if(elem) {
						let totalRows = rowNumber + 1;					
						container = new UWA.Element("div", { "id": ele.name+"-"+rowNumber, "class":"multiVal", "styles":{'padding': '10px 0px', 'display': 'flex'}}).inject(childContainer);
						let buttonData = {
							eleDataType: eleDataType,
							eleType: eleType,
							ele: ele,
							requiredFlag: requiredFlag,
							meetingProperties: meetingProperties
						};
						let CustomFieldUtilObj = CustomFieldUtil.getCustomFieldUtilObj();
						CustomFieldUtilObj.setButtonData(buttonData);
						CustomFieldUtilObj.setRowNum(totalRows); 
						elem.inject(container);
						//add units here
						if(ele.units) {
							let containerDivInner2 = new UWA.Element("div", {							
								"id": ele.name+"-inner2",
								"class": ""
								
							}).inject(container);
							//_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
							MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
						}
						elem.elements.container.setData('removeKey', rowNumber);
						meetingProperties.elements[ele.name].push(elem);
						//meetingProperties.elements[ele.name].splice(rowNumber, 0, elem);
						
						if (source=="add") {
							this.addButtonsForMultivalueFieldInCreateView(CustomFieldUtilObj, container, childContainer, "minus");
						//rowNum++;
						}
					}					
				}				
				//do not return container;
				
			},
			
			renderReadOnlyFieldInPropertiesView: function(attrValue, eleType, ele, data, requiredFlag) {
				if (Array.isArray(attrValue)) {
					if (this.isDateField(ele))
						attrValue = attrValue.join('\n');						
					else if (eleType=='toggle') {
						let tempDefaultValue = this.getDefaultValue(ele);
						if (attrValue.length==0&&!tempDefaultValue) { //multival bool, where default is always returned as empty string + attrValue either false or not set (eg., new attribute on old meeting) 
							attrValue = "FALSE";
						}
					}
					else {
						/*if (eleType=='lineeditor') {
							let type = this.getViewAttributeType(ele);
							if (type&&type=='real') { 
								if (!ele.range&&(attrValue.length&&attrValue.length==0)) {
									//mv fields have no default value									
									attrValue.push('0.0');
								}
							}
							if (type&&type=='integer') { 
								if (!ele.range&&(attrValue.length&&attrValue.length==0)) {
									//mv fields have no default value									
									attrValue.push('0');
								}
							}
						}*/
						let defUnit = this.getDefaultUnit(ele);
						if (defUnit&&attrValue.length>0) { //real with unit
							attrValue = attrValue.join(" "+defUnit.display+", ");
							attrValue = attrValue + " " + defUnit.display;
						}
						else
							attrValue = attrValue.join();
					}
				}
				else if (this.isDateField(ele)&&attrValue) {
					let date = new Date(attrValue);
					let customVal = Utils.formatDateTimeString(date);
					attrValue = customVal;
				}
				else {
					let defUnit = this.getDefaultUnit(ele);
					if (defUnit) {
						attrValue = attrValue + " " + defUnit.display;
					}
				}
				return new UWA.Element("span", {text: attrValue});
			},
			
			renderFieldInPropertiesView: function(eleType, ele, data, requiredFlag) {
				
				let options = {};
				let attrValue = (data.model) ? ((data.model[ele.name]) ? data.model[ele.name] : "") : (data||"");
				let eleDefaultValue = this.getDefaultValue(ele);
				
				let isEditable = ele.editable;
				if (isEditable===false) {
					return this.renderReadOnlyFieldInPropertiesView(attrValue, eleType, ele, data, requiredFlag);
				}
				
				/*if (isEditable===false) {
					if (Array.isArray(attrValue))
						attrValue = attrValue.join();
					else if (this.isDateField(ele)&&attrValue) {
						let date = new Date(attrValue);
						//let customVal = this.getLocaleDate(date, true);
						let customVal = Utils.formatDateTimeString(date);
						attrValue = customVal;
					}
					return new UWA.Element("span", {text: attrValue});
				}*/
				
				switch(eleType) {
					case 'editor': {
						options = {
							placeholder: '',
							widthInCharNumber: 47,
							nbRows: 5,
							newLineMode: 'enter',
							value: attrValue //data.model[ele.name]											
						};
						//[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+
						if (!attrValue&&eleDefaultValue)
							options.value = eleDefaultValue;
						//get max-length
						let maxlength = this.getViewMaxLength(ele);
						if (maxlength!==-1)
							options.maxLength = maxlength;
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'lineeditor': {
						options = {
							value: attrValue, //data.model[ele.name],
							sizeInCharNumber: 47
						};
						if (!attrValue&&eleDefaultValue)
							options.value = eleDefaultValue;
						let type = this.getViewAttributeType(ele);
						let allowedPattern = '*';
						if (type&&(type=='integer')) {
							placeholder: '',
							allowedPattern = '[0-9]+';
							options.pattern = allowedPattern;
						}
						if (type&&(type=='real')) {							
							placeholder: '',
							allowedPattern = '[0-9]+|([0-9]+\.[0-9]+)';
							options.pattern = allowedPattern;
						}
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'datepicker': {
						let cVal = attrValue; //data.model[ele.name];
						options = {
							//minValue: new Date(),
							timePickerFlag: true
							//allowUndefinedFlag: true
						};
						if (cVal&&this.isValidDate(new Date(cVal)))
							options.value = new Date(cVal);
						else if (eleDefaultValue) {
							let tempDate = new Date(eleDefaultValue);
							if (isNaN(tempDate)) {// probably firefox
								options.value = new Date((eleDefaultValue).replaceAll('/', '-').replace('@', 'T').replace(':GMT', 'Z'));
							}
							else
								options.value = new Date(eleDefaultValue);								
						}
						else
							options.value = new Date();
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'combobox': {
						let elementsList = MeetingUtil.getRangeElementsList(ele);
						options = {
							elementsList: elementsList,
							value: attrValue, //data.model[ele.name],
							enableSearchFlag: true
						};
						if (!attrValue)// || (Array.isArray(attrValue)&&attrValue.length==0))
							options.value = elementsList[0].valueItem;
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'toggle': {
						let checkflag = true;
						//if(data.model[ele.name] == "TRUE" || data.model[ele.name] == 'true'){
						if(attrValue == "FALSE" || attrValue == 'false'){
							checkflag = false;
						}
						options = {
							type: "checkbox", 
							label: ele.label, //show the field label as the label
							value: attrValue, //data.model[ele.name], 
							checkFlag: checkflag
						};
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'selectionchips': {
						let type = this.getViewAttributeType(ele);
						attrValue = attrValue || [];
						if (type&&(type=='integer')) {
							return new SelectionChipsEditor({
								value: attrValue,
								uniqueValue: true,
								customValidator: this.selectionChipCustomValidatorInteger
							});
						}
						if (type&&(type=='real')) {
							return new SelectionChipsEditor({
								value: attrValue,
								uniqueValue: true,
								customValidator: this.selectionChipCustomValidatorReal
							});
						}
						//if (attributeType&&(attributeType=='string')) {							
							return new SelectionChipsEditor({
								value: attrValue,
								uniqueValue: true
							});
						//}
					}
					
					default: {
						//do nothing
						return;
					}
				}
				
			},
			
			renderFieldInCreateView: function(eleDataType, eleType, requiredFlag, eleDefaultValue, ele) {
			
				let options = {};
				let attributeType = this.getViewAttributeType(ele);
				
				switch(eleType) {
					case 'editor': {
						options = {
							placeholder: '',
							widthInCharNumber: 47,
							nbRows: 5,
							newLineMode: 'enter'//,
							//requiredFlag: requiredFlag
						};
						if (eleDefaultValue)
							options.value = eleDefaultValue;
						//get max-length
						let maxlength = this.getViewMaxLength(ele);
						if (maxlength!==-1)
							options.maxLength = maxlength;
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'lineeditor': {
						let elem;
						options = {
							placeholder: '',
							sizeInCharNumber: 47//,
							//requiredFlag: requiredFlag
						};
						let type = eleDataType;
						let allowedPattern = '*';
						if (type&&(type=='integer')) {
							allowedPattern = '[0-9]+';
							options.pattern = allowedPattern;
						}
						if (type&&(type=='real')) {
							allowedPattern = '[0-9]+|([0-9]+\.[0-9]+)';
							options.pattern = allowedPattern;
						}
						if (eleDefaultValue)
							options.value = eleDefaultValue;
						elem = this.getViewTypeElement(eleType, options);
						
						return elem;
					}
					
					case 'datepicker': {
						options = {
							value: '',
							//minValue: new Date(),
							timePickerFlag: true
							//allowUndefinedFlag: true
						};
						
						if (eleDefaultValue) {
							let tempDate = new Date(eleDefaultValue);
							if (isNaN(tempDate)) {// probably firefox
								options.value = new Date((eleDefaultValue).replaceAll('/', '-').replace('@', 'T').replace(':GMT', 'Z'));
							}
							else
								options.value = new Date(eleDefaultValue);
						}
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'combobox': {
						let elementsList = MeetingUtil.getRangeElementsList(ele);
						options = {
							elementsList: elementsList,
							enableSearchFlag: true
						};
						if (eleDefaultValue)
							options.value = eleDefaultValue;
						else 
							options.value = elementsList[0].valueItem;
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'toggle': {
						//let checkflag = true;
						let checkflag = this.getDefaultValue(ele);
						if (checkflag==='TRUE' || checkflag==='true')
							checkflag = true;
						else 
							checkflag = false;
						options = {
							type: "checkbox",							 
							label: ele.label,
							checkFlag: checkflag
						};
						return this.getViewTypeElement(eleType, options);
					}
					
					case 'selectionchips': {
						let type = eleDataType;
						if (type&&(type=='integer')) {
							return new SelectionChipsEditor({
								value: [],
								uniqueValue: true,
								customValidator: this.selectionChipCustomValidatorInteger
							});
						}
						if (type&&(type=='real')) {
							return new SelectionChipsEditor({
								value: [],
								uniqueValue: true,
								customValidator: this.selectionChipCustomValidatorReal
							});
						}
						//if (attributeType&&(attributeType=='string')) {							
							return new SelectionChipsEditor({
								value: [],
								uniqueValue: true
							});
						//}
					}
					
										
					default: {//do nothing
						return;
					}
				}
			
			},		
			
			getViewMaxLength: function(ele){
				let viewConfig = JSON.parse(ele.viewConfig);
				let attributeType = this.getViewAttributeType(ele);
				if(attributeType == "string"){
					return viewConfig.maxlength;
				}		
				else {
					return -1;
				}
			},	
			
			validateFieldMaxLength: function(ele, value) {
				let maxlength = this.getViewMaxLength(ele);
				if (!(maxlength==-1||maxlength==0)) {
					if (maxlength!==0&&value.length>maxlength)
						return false
				}
				return true;
			},
		
			validateCustomField: function(ele, properties) {
				if (ele.name != 'extensions') {
					//skip if editable false
					let isEditable = ele.editable;
					if (isEditable===false) {
						return true;
					}
					
					
					if (ele.mandatory&&ele.mandatory==true&&properties.elements[ele.name]) {
						//if single-valued mand, default value will be specified and should be saved, therefore no validation
						//if multivalued mand, selectionchip editor only -> need to save for strings only, numbers are autosaved
						let val;
						if (properties.elements[ele.name].value)
							val = properties.elements[ele.name].value;
						if (this.isMultiValueField(ele)) {					//&&Array.isArray(properties.elements[ele.name])			
							if (Array.isArray(properties.elements[ele.name])) {
								//this is only for mv+authorised values
								//comboboxes now auto-select [0] value and save
								//therefore validation no longer needed for empty strings
								//maxlength is not applicable on authorised values at this point in the application
								
								//is not a selection chip editor
								/*let arrVal = properties.elements[ele.name];
								let emptyVals = 0;
								for (let k=0; k<arrVal.length; k++) {
									let kVal = arrVal[k].value;
									if (Array.isArray(kVal)) {
										if (!kVal.length)
											emptyVals++;
										//else if (kVal === "")
											//emptyVals++;
									}								
									else {
										if (kVal==="")
											emptyVals++;
									}
								}
								
								if (emptyVals==arrVal.length) {
									return false;									
								}*/
							}
							else {
								//is a selectionchip editor
								//check for empty value array
								if (!(val&&val.length&&val.length>0)) {
									return {"success":false, "errorTitle":NLS.errorMandatoryCustomFieldTitle, "errorSubtitle":NLS.errorMandatoryCustomField};
								}
								//check values for maxlength
								let maxlengthFlag = true;
								for (let i=0; i<val.length; i++) {
									if (this.getViewAttributeType(ele)=='string')
										maxlengthFlag = this.validateFieldMaxLength(ele, val[i]);
									if (!maxlengthFlag)
										return false;
								}
							}
						}
						else if (val&&val=="") {
							return false;									
						}								
					}
					else {
						//not mandatory, so we need to only check maxlength
						//currently only for selectionchips editors, as 6w returns info only for strings
						//non-multivalue string is handled at component (editor) level
						if (this.isMultiValueField(ele)&&!Array.isArray(properties.elements[ele.name])) { //if potentially a selectionchip editor
							let val = (properties.elements[ele.name].value || null)
							if (val) {
								//check values for maxlength
								let maxlengthFlag = true;
								for (let i=0; i<val.length; i++) {
									if (this.getViewAttributeType(ele)=='string')
										maxlengthFlag = this.validateFieldMaxLength(ele, val[i]);
									if (!maxlengthFlag)
										return false;
								}
							}
						}
					}
					
				}
				return true;
			},
			
			validateCustomFields: function(properties) {
			
				//custom attributes				
				let self = this;
				let customFields = (widget.getValue('customFields')) || null;
				let flag = true;
				if (customFields && customFields.items && customFields.items.length && customFields.items.length > 0) {
					customFields.items.every((ele, idx) => {
						if (ele.name != 'extensions') {
							
							//skip if editable false
							let isEditable = ele.editable;
							if (isEditable===false) {
								return true;
							}
							
							//if mandatory but unfilled, display alert and return false
							let isValidField = this.validateCustomField(ele, properties);
							if (typeof isValidField == 'object') {
								widget.meetingNotify.handler().addNotif({
									level: 'error',
									title: isValidField.errorTitle || "",
									subtitle: isValidField.errorSubtitle || "",
								    sticky: false
								});
								flag = false;
								return false;
							}
							
							//Check max length for multi-valued attributes
							if (!isValidField) {
								let maxlenval = this.getViewMaxLength(ele);
								widget.meetingNotify.handler().addNotif({
									level: 'error',
									title: NLS.errorMaxLengthTitle,
									subtitle: NLS.replace(NLS.errorMaxLength, {
									                        field_label: ele.label, maxLength: maxlenval
									                    }),
								    sticky: false
								});
								flag = false;
								return false;	
							}
							
							//valid char check
							/*if (this.isMultiValueField(ele)) { //is multival
								//taken care of at component level
								
							}	*/						
							if (!this.isMultiValueField(ele)) {								
								let type = self.getViewType(ele);
								/*if (type=='checkbox')
									return true;*/
								if (type=='text') {
									if (properties.elements[ele.name]) {
										let textval = properties.elements[ele.name].value.trim();
										if (!textval.test(/^[\w&%_\.\+\-!@#$(){}\[\]\\|]*/)) {
											let subtitl = NLS.errorInvalidCharInText;
											widget.meetingNotify.handler().addNotif({
												level: 'error',
												title: NLS.replace(NLS.errorInvalidCharInTextTitle, {
									                        field_label: ele.label
									                    }),
												subtitle: NLS.errorInvalidCharInText,
											    sticky: false
											});
											flag = false;
											return false;
										}
									}
								}
							}							
							
						}
						
					return true;
					});
				}
				if (!flag)
					return false;
				return true;
			},
			
			validateDuration : function(properties){
				// validation for duration
						if(properties.elements.duration.value == ""){
							widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.errorDuration,
							    sticky: false
							});
							return false;
						}
						if(typeof properties.elements.duration.value  === 'string'){
						   var strMeetingDuration = properties.elements.duration.value.trim();
						}else{
						   var strMeetingDuration = properties.elements.duration.value;
						}
						 if (isNaN(strMeetingDuration)) {
							 widget.meetingNotify.handler().addNotif({
									level: 'error',
									message: NLS.errorDurationNumeric,
								    sticky: false
								});
							 return false;
						    } else if (strMeetingDuration > 0 && strMeetingDuration <= 500) {
						    	/*var totalDur =parseInt(widget.getValue('SumOfAgendaDuration'));
								if(totalDur>strMeetingDuration){
									widget.meetingNotify.handler().addNotif({
										level: 'warning',
										subtitle: NLS.agendaDurExceedsMeetDurMessage,
									    sticky: false
									});
								}*/
						    } else {
						    	widget.meetingNotify.handler().addNotif({
									level: 'error',
									message: NLS.errorDurationNumberValidation,
								    sticky: false
								});
						    	return false;
						    }
				properties.elements.duration.value=strMeetingDuration;
				return true;
			}
		
		};
		
		let getParsedEditMeetingProperties = function(properties){
		var dataelements = {
				"description" : properties.elements.description.value,
				"location": properties.elements.location.value,
				"startDate" : properties.elements.meetingStartDateDate.value,
				"duration" : properties.elements.duration.value,
				"subject": properties.elements.title.value,
				"conferenceCallNumber" : properties.elements.conferenceCallNumber.value,
				"conferenceCallAccessCode" : properties.elements.conferenceCallAccessCode.value,
				"onlineMeetingProvider": properties.elements.onlineMeetingProvider.value,
				"onlineMeetingInstructions" : properties.elements.onlineMeetingInstructions.value,
				"parentID" : properties.elements.contextId || ""
			}
			
						
			//custom attributes
			let customFields = properties.customFields;
		
			if (customFields) {
				//get all custom attributes
				if (customFields && customFields.items && customFields.items.length && customFields.items.length > 0) {
					//loop through each attribute and save value from properties to response{}
					customFields.items.forEach((ele) => {
						let customFieldValue = "";
						if (ele.name != 'extensions') {
							let isEditable = ele.editable;
							//customFieldValue = properties.elements[ele.name].value || "";
							//skip if not editable
							if (!(isEditable===false)) {
								if (MeetingUtil.isMultiValueField(ele)) {
									if (MeetingUtil.hasAuthorisedValues(ele)) { 
										//go through array of individual components
										let eleType = MeetingUtil.getViewType(ele) || null;
										customFieldValue = properties.elements[ele.name];
										if (Array.isArray(customFieldValue)) {
											let tempArray = customFieldValue;
											customFieldValue = [];
											for (let i=0; i<tempArray.length; i++) {
												if (eleType=='checkbox') {
													if (tempArray[i].checkFlag)
														customFieldValue.push('TRUE');
													else
														customFieldValue.push('FALSE');
												}
												else {
													customFieldValue.push(tempArray[i].value);
												}
											}									
										}
										else { 
											customFieldValue = [];
											customFieldValue.push(properties.elements[ele.name].value || "");									
										}
									}
									else {//mvalue but no authorised values
										let eleType = MeetingUtil.getViewType(ele) || null;
										customFieldValue = properties.elements[ele.name].value;
										if (Array.isArray(customFieldValue)) {
											let tempArray = customFieldValue;
											customFieldValue = [];
											for (let i=0; i<tempArray.length; i++) {
												if (eleType=='checkbox') {
													if (properties.elements[ele.name].checkFlag)
														customFieldValue.push('TRUE');
													else
														customFieldValue.push('FALSE');
												}
												else {
													customFieldValue.push(tempArray[i] || "");
												}
											}									
										}
										else {
											customFieldValue = [];
											customFieldValue.push(properties.elements[ele.name].value || "");									
										}
									}
								}
								else {
									if (properties.elements[ele.name].type=='checkbox') { 
										if (properties.elements[ele.name].checkFlag)
											customFieldValue = 'TRUE';
										else
											customFieldValue = 'FALSE'
									}
									else
										customFieldValue = properties.elements[ele.name].value || "";
								}
								dataelements[ele.name] = customFieldValue;
							}
							
						}
					});
				}
			}
			
			
		return dataelements;
	}
	
	
		
		let validateTitle = function(properties){
			// validation for title
					if(properties.elements.title.value.trim() == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorTitle,
						    sticky: false
						});
						return false;
					}
			return true;
		};
		
		
		
		
		return MeetingUtil;
});


define('DS/ENXMeetingMgmt/Utilities/AutoDecision',
		[
			'DS/ENXMeetingMgmt/Controller/MeetingController',
			'DS/ENXDecisionMgmt/Model/DecisionModel',
			'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap'
		],
		function(
			MeetingController,
			DecisionModel,
			EnoviaBootstrap
		) {			
		'use strict';
		
		let _createAgendaDecision = function(agendaData, meetingId) {
			
			let user = EnoviaBootstrap.getLoginUser();
			
			let meetingInfo = {};			
			meetingInfo.model = {'meetingId' : meetingId};				
			
			agendaData.forEach(function(agenda) {
				
				let agendaItem = [];
				let itemDetails = {};
				
				let item = {};
				item.title = agenda.topic;
				item.description = agenda.topicDescription;
				item.parentID = meetingId;
				item.owner = user;
				
				itemDetails.dataelements = item;
									
				agendaItem.push(itemDetails);
				
				let relatedItemsId = agenda.relatedItem;
				
				let relatedItems = [];
				relatedItemsId.forEach(function(itemId) {
						relatedItems.push({'id' : itemId});
				});
				
				MeetingController.createAgendaDecision(agendaItem, meetingInfo).then(
					success => {
							DecisionModel.appendRowsforCreate(success, true);
						
							let decisionId = success.data[0].id;
							
							let model = {};
							model.TreedocModel = {'decisionId' :  decisionId};
															
							if(relatedItems.length > 0) {
								
								MeetingController.addAppliesToAgendaDecision(model, relatedItems).then(
									success => {},
									failure => { // won't be covered in ODT; adding to show alert upon failure 
										widget.meetingNotify.handler().addNotif({
											level: 'error',
											subtitle: failure.error,
										    sticky: false
										}); 
								});
							}
						},
					failure => { // won't be covered in ODT; adding to show alert upon failure
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: failure.error,
						    sticky: false
						});
					});	
			});				
		};

		let AutoDecision = {
			createAgendaDecision: (agendaData, meetingId) => { return _createAgendaDecision(agendaData, meetingId) }
	   };
	
		return AutoDecision;

	});

define('DS/ENXMeetingMgmt/View/Form/MeetingProperties',
[
	'DS/ENXMeetingMgmt/View/Form/MeetingUtil',
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
	'DS/ENXMeetingMgmt/View/Loader/NewMeetingContextChooser',
	'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
	'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
function (MeetingUtil, WUXLineEditor, WUXEditor, WUXButton, WUXToggle,WUXAccordeon, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		  TreeDocument, TreeNodeModel, NewMeetingContextChooser,  DragAndDrop,DragAndDropManager,NLS) {    
		"use strict";
		let _properties = {};
		let labelAttr;
		
		let build= function (container,data,mode) {
			// Create the container in which all task properties details will be rendered //
			_properties.elements = {};
			//Create property to hold widget custom Fields			
			_properties.customFields = (widget.getValue("customFields")||{});
			
			// Create the container in which all properties details will be rendered //
			_properties.formBody = new UWA.Element('div', {id: 'MeetingPropertiesBody','class':'meeting-prop-body'});
			_properties.formBody.inject(container);
			_properties.formFields = new UWA.Element('div', {id: 'MeetingPropertiesContainer','class':''}); 
			_properties.formFields.inject(_properties.formBody);
			_properties.advFormFields = new UWA.Element('div', {id: 'MeetingPropertiesAdvancedContainer' ,class: 'main-panel'});
			//_properties.advFormFields.inject(_properties.formBody);
			var fieldRequired = "required";
			// Task Title //
			var titleDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_properties.formFields);
			labelAttr = new UWA.Element("h5", {"class":fieldRequired, text: NLS.title}).inject(titleDiv);
			if(fieldRequired){
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelAttr);
			}
			
			_properties.elements.title = new WUXLineEditor({
				placeholder: NLS.placeholderTitle,
				//requiredFlag: true,
				pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
				sizeInCharNumber: 30,
				value: "",
		    }).inject(titleDiv);
			
			_properties.elements.title.addEventListener('change', function(e) {				
				widget.meetingEvent.publish('create-meeting-toggle-dialogbuttons', { properties : _properties});		
			});
			//_properties.formFields.autoNameCheckbox = new WUXToggle({ type: "checkbox", label: NLS.autoname, value: false });
			//context
			//DragAndDrop.makeDroppable(container, _ondrop);
			var meetingContextDiv = new UWA.Element('div', {
				id: 'contextId', class:""
			}).inject(_properties.formFields); 
			labelAttr = new UWA.Element("h5", {"class":"", text: NLS.context}).inject(meetingContextDiv);
			/*if(fieldRequired){
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelAttr);
			}*/
			var searchContextDiv = new UWA.Element('div', {
				id: 'SearchContextsField', class:"fonticon-chooser-display"
			}).inject(meetingContextDiv); 
			
			 _properties.elements.contextField = new WUXLineEditor({
			      placeholder: NLS.placeholderSearchContext,
//			      requiredFlag: true,
//			      pattern: "[a-z]+",
			      contextObjectId:"",
			      sizeInCharNumber: 30,
			      displayClearFieldButtonFlag: true,
			      disabled: true
			    }).inject(searchContextDiv);
		    
		    /*_properties.elements.contextField.addEventListener('change', function(e) {
		    	widget.meetingEvent.publish('create-meeting-toggle-dialogbuttons', { properties : _properties});		 
		    	
		    });*/
		    var space = new UWA.Element('div', {html:"&nbsp;"});
			space.inject(searchContextDiv);
			
			_properties.elements.contextChooser = new WUXButton({
				icon: {iconName: "search", fontIconFamily: WUXManagedFontIcons.Font3DS, fontIconSize: '1x'}
			}).inject(searchContextDiv);
			_properties.elements.contextChooser.getContent().addEventListener('buttonclick', function(){			     
				NewMeetingContextChooser.init(event,_properties);
			});
			space = new UWA.Element('div', {html:"&nbsp;"});
			space.inject(searchContextDiv);
			_properties.elements.contextClear = new WUXButton({
				icon: {iconName: "clear", fontIconFamily: WUXManagedFontIcons.Font3DS, fontIconSize: '1x'}
			}).inject(searchContextDiv);
			_properties.elements.contextClear.getContent().addEventListener('buttonclick', function(){			     
				_properties.elements.contextField.value = "";
				_properties.elements.contextId = "";
			});
			
			
			//location of meeting
			var locationDiv = new UWA.Element("div", {
				"id": "locationId",
				"class": ""
			}).inject(_properties.formFields);
			labelAttr = new UWA.Element("h5", {"class":"", text: NLS.location}).inject(locationDiv);
			
			_properties.elements.location = new WUXLineEditor({
				placeholder: NLS.placeholderLocation,
				sizeInCharNumber: 30,
				value: "",
		    }).inject(locationDiv);
			
			//meeting start date and Time
			//for rounding to nearest 30 minutes
			let ms = 1000 * 60 * 30;
			
			var meetingStartDate = new Date();
			let roundedDate = new Date(Math.ceil(meetingStartDate.getTime() / ms) * ms);
			meetingStartDate.setDate(meetingStartDate.getDate());
			var meetingMinDate = new Date();
			meetingMinDate.setDate(meetingMinDate.getDate()-1);
			
			var meetingStartDateDiv = new UWA.Element("div", {
				"id": "startDateId",
				"class": ""
			}).inject(_properties.formFields);
			labelAttr = new UWA.Element("h5", {"class":fieldRequired, text: NLS.startDateAndTime}).inject(meetingStartDateDiv);
			if(fieldRequired){
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelAttr);
			}
			
			_properties.elements.meetingStartDateDate = new WUXDatePicker({
				value: new Date(roundedDate),
				minValue: new Date(meetingMinDate),
				timePickerFlag:true
			}).inject(meetingStartDateDiv);
			_properties.elements.meetingStartDateDate.addEventListener('change', function(e) {
		    	widget.meetingEvent.publish('create-meeting-toggle-dialogbuttons', { properties : _properties});		 
		    	
		    });
			
			//duration of meeting
			var durationDiv = new UWA.Element("div", {
				"id": "durationId",
				"class": ""
			}).inject(_properties.formFields);
			labelAttr = new UWA.Element("h5", {"class":"fieldRequired", text: NLS.durationInMinutes}).inject(durationDiv);
			if(fieldRequired){
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelAttr);
			}
			_properties.elements.duration = new WUXLineEditor({
				placeholder: NLS.placeholderDuration,
				//requiredFlag: true,
				//pattern: '([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)|([1-9]+)',
				pattern: '([0-4]?\\d{0,2}([.]\\d+)?)|500(.[0]+)?',
				sizeInCharNumber: 33,
				value: "",
		    }).inject(durationDiv);
			_properties.elements.duration.addEventListener('change', function(e) {
		    	widget.meetingEvent.publish('create-meeting-toggle-dialogbuttons', { properties : _properties});		 
		    	
		    });
			
			new UWA.Element("h5", {"class":""}).inject(_properties.formFields);
			
			
			
			//advanced
			_properties.advFormFields = new UWA.Element('div', {id: 'CreateMeetingAdvancedContainer' ,class: 'main-panel'});
			let filledSeperateAccordeon = new WUXAccordeon({				
			    items: [{
			      header: NLS.more,
			      content: _properties.advFormFields
			    }],
			    exclusive : false,
				style : 'filled-separate'
			});
			filledSeperateAccordeon.inject(_properties.formFields);
			
			
			//description
			// Task Title //
			var descDiv = new UWA.Element("div", {
					"id": "descId",
					"class": ""
				}).inject(_properties.advFormFields);
			new UWA.Element("h5", {text: NLS.description }).inject(descDiv);
			_properties.elements.description = new WUXEditor({
			      placeholder: NLS.placeholderDescription,
			      //requiredFlag: true,
			      //pattern: "[a-z]+",			      
			      widthInCharNumber: 31,
			      nbRows: 5,
			      newLineMode: 'enter',
			    }).inject(descDiv);
			
			
			//conference call number
			var conCallDiv = new UWA.Element("div", {
				"id": "conCallId",
				"class": ""
			}).inject(_properties.advFormFields);
			labelAttr = new UWA.Element("h5", {"class":"", text: NLS.conCallNumber}).inject(conCallDiv);
			
			_properties.elements.conCallNumber = new WUXLineEditor({
				placeholder: NLS.placeholderConCallNumber,
				//requiredFlag: true,
				sizeInCharNumber: 30,
				value: "",
		    }).inject(conCallDiv);
			
			//conference call code
			var accessCodeDiv = new UWA.Element("div", {
				"id": "conCodeId",
				"class": ""
			}).inject(_properties.advFormFields);
			labelAttr = new UWA.Element("h5", {"class":"", text: NLS.accessCode}).inject(accessCodeDiv);
			
			_properties.elements.conAccessCode = new WUXLineEditor({
				placeholder: NLS.placeholderAccessCode,
				//requiredFlag: true,
				sizeInCharNumber: 30,
				value: "",
		    }).inject(accessCodeDiv);
			
			//online meeting instructions
			var instructionDiv = new UWA.Element("div", {
				"id": "instructionId",
				"class": ""
			}).inject(_properties.advFormFields);
			new UWA.Element("h5", {text: NLS.onlineMeetingInstructions }).inject(instructionDiv);
			_properties.elements.instruction = new WUXEditor({
			      placeholder: NLS.placeholderInstruction,
			      //requiredFlag: true,
			      //pattern: "[a-z]+",			      
			      widthInCharNumber: 63,
			      nbRows: 5,
			      newLineMode: 'enter',
			    }).inject(instructionDiv);
			
			
			//online meeting provider
			var meetingProviderDiv = new UWA.Element("div", {
				"id": "meetingProviderId",
				"class": ""
			}).inject(_properties.advFormFields);
			new UWA.Element("h5", {text: NLS.onlineMeetingProvider }).inject(meetingProviderDiv);
			_properties.elements.meetingProvider = new WUXLineEditor({
				 placeholder: NLS.placeholderMeetingProvider,
			      //requiredFlag: true,
			      //pattern: "[a-z]+",			      
					sizeInCharNumber: 30,
			     
			    }).inject(meetingProviderDiv);
			    
			    
			//custom attributes
			if (_properties.customFields&&_properties.customFields.items&&_properties.customFields.items.length>0) {
				
				//render custom attributes panel
				/*_properties.customAttributesFormFields = new UWA.Element('div', {id: 'CreateMeetingCustomAttributesContainer' ,class: 'main-panel'});
				let customAttributesFormFieldsAccordion = new WUXAccordeon({				
					items: [{
					  header: "Custom Attributes",
					  content: _properties.customAttributesFormFields
					}],
					exclusive : false,
					style : 'filled-separate'
				});
				customAttributesFormFieldsAccordion.inject(_properties.formFields);*/
				
				_properties.customFields.items.forEach((ele, idx) => {
					if (ele.name !=='extensions') {
						
						let containerDiv;
						
						if(MeetingUtil.isMultiValueField(ele)) {
							if (MeetingUtil.hasAuthorisedValues(ele)) {
								containerDiv = new UWA.Element("div", {
								
									"id": ele.name,
									"class": "ellipsis-parent",
									"styles": {'width': '100%'},
									"events": {
										"keydown": function(e) {
											console.log("keydown pressed");
											if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13) {
												if(e.target.nodeName=='INPUT'&&e.target.type=='text') {
													console.log("enter key pressed from input");
													e.cancelBubble = true;
													//e.preventDefault();
													//return false;
												}
											}				
										}
									}
									
								}).inject(_properties.advFormFields);
							}
							else {
								containerDiv = new UWA.Element("div", {
									
									"id": ele.name,
									"class": "",
									"styles": {'width': '65%'},
									"events": {
										"keydown": function(e) {
											console.log("keydown pressed");
											if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13) {
												if(e.target.nodeName=='INPUT'&&e.target.type=='text') {
													console.log("enter key pressed from input");
													e.cancelBubble = true;
													//e.preventDefault();
													//return false;
												}
											}				
										}
									}
									
								}).inject(_properties.advFormFields);	
							
							}
						}
						else {
							containerDiv = new UWA.Element("div", {
								
								"id": ele.name,
								"class": ""
								
							}).inject(_properties.advFormFields);
						}					
						
						let containerDivInner = new UWA.Element("div", {
							
							"id": ele.name+"-inner",
							"class": ""
							
						}).inject(containerDiv);
												
						
						let required = (ele.mandatory) ? "required" : "";
						let requiredFlag = (ele.mandatory) ? ele.mandatory : false;
						
						let labelAttr = new UWA.Element("h5", {text: ele.label, "class": required, "styles":{'margin-bottom':'0'} }).inject(containerDivInner);
						if(requiredFlag){
						UWA.createElement("div", {
								"class": "required-label-meetings fonticon fonticon-asterisk-alt"
							}).inject(labelAttr);
						}
						
						//create options for WUX elements based on viewConfig.type
						let eleType;
						let eleTypeContainer;
						let eleDataType;
						let eleDefaultValue;
						
						eleType	 = MeetingUtil.getViewTypeElementName(ele) || null;
						eleDataType = MeetingUtil.getViewAttributeType(ele) || null;
						eleDefaultValue = MeetingUtil.getDefaultValue(ele);
						if (eleType) {

							if (MeetingUtil.isMultiValueField(ele)) {
								if (MeetingUtil.hasAuthorisedValues(ele)) {
									eleTypeContainer = MeetingUtil.renderMultivalueFieldInCreateView2(eleDataType, eleType, ele, requiredFlag, _properties, "", null, containerDiv, containerDivInner); //source = "", rowNum = null
								}
								else {
								//eleTypeContainer = MeetingUtil.renderMultivalueFieldInCreateView(eleDataType, eleType, ele, requiredFlag, _properties, "", null, containerDiv, containerDivInner); //source = "", rowNum = null
								//eleType = "selectionchips";
									eleTypeContainer = MeetingUtil.renderMultivalueFieldInCreateView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, _properties);
								}
							}
							else
								eleTypeContainer = MeetingUtil.renderFieldInCreateView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele);
							
							if (eleTypeContainer) {
								//dimensions
								if(eleType=='lineeditor'&&ele.units) {
									let containerDivInner2 = new UWA.Element("div", {							
										"id": ele.name+"-inner2",
										"class": ""
										
									}).inject(containerDiv);
									_properties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
									MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
								}
								else
									_properties.elements[ele.name] = eleTypeContainer.inject(containerDiv);
							}
							if (eleTypeContainer&&requiredFlag)
								_properties.elements[ele.name].addEventListener('change', function(e) {
									widget.meetingEvent.publish('create-meeting-toggle-dialogbuttons', { properties : _properties});		 									
								});
						}

					}
				
				});
				
			}
			  
			return _properties;
			    
			    
		};
		
		let _ondrop = function(e, target){
        	target = "Meeting Context";
        	DragAndDropManager.onDropManagerContext(e,_properties,target);
		};
		let getProperties = function(){
		    	return _properties;
		 };
		    
		 let destroy = function(){
		    	_properties = {};
		 };
		 let MeetingProperties={
				build : (container,data,mode) => { return build(container,data,mode);},
				destroy : () => {return destroy();},
				getProperties : () => {return getProperties();}
		 };
		 return MeetingProperties;
	});

define('DS/ENXMeetingMgmt/View/Loader/NewMeetingPropertiesLoader',
[
 'DS/ENXMeetingMgmt/View/Form/MeetingProperties',
 'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
 'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'

],
function(MeetingProperties,DragAndDrop,DragAndDropManager,NLS) {

	'use strict';
    let _appInstance = {};

    const buildContainer = function(){
    	_appInstance.container = new UWA.Element('div', { html: "", id :"CreateMeetingFormView", 'class': 'meeting-create-properties-container'});        
        _appInstance.container.inject(document.querySelector('#iMeetingTabsContainer'));
    };
    let _properties = {};
    let NewMeetingPropertiesLoader = {
        init: function(defaultJson){ //,instanceInfo
        	if(!this.showView()){         		
        		buildContainer();
        		 _properties =MeetingProperties.build(_appInstance.container,defaultJson);
        		 DragAndDrop.makeDroppable(_appInstance.container, _ondrop);
        	 }
        },
        
        hideView: function(){
        	if(document.querySelector('#CreateMeetingFormView') && document.querySelector('#CreateMeetingFormView').getChildren().length > 0){
        		document.getElementById('CreateMeetingFormView').style.display  = 'none';        		
        	}
        },
        
        showView: function(){
        	if(document.querySelector('#CreateMeetingFormView') && document.querySelector('#CreateMeetingFormView').getChildren().length > 0){
        		document.getElementById('CreateMeetingFormView').style.display = 'block';
        		DragAndDrop.makeDroppable(document.getElementById('CreateMeetingFormView'), _ondrop);
        		return true;
        	}
        	return false;
        },
        
        destroy: function() {        	
        	//destroy form elements
        	MeetingProperties.destroy();
        },
        getModel : function(){        	
        	return MeetingProperties.getProperties();
        	//return NewMeetingPropertiesLoader.properties;
        }
        
    };
    
    let _ondrop = function(e, target){
    	target = "Meeting Context";
    	DragAndDropManager.onDropManagerContext(e,_properties,target);
	};
    return NewMeetingPropertiesLoader;

});

/**
 * datagrid view for Agenda summary page
 */
define('DS/ENXMeetingMgmt/View/Grid/MeetingAgendasDataGridView',
		[ 
			'DS/ENXMeetingMgmt/Config/MeetingAgendaGridViewConfig',
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXMeetingMgmt/Config/Toolbar/MeetingAgendaTabToolbarConfig',
            'DS/ENXMeetingMgmt/Model/MeetingAgendaModel'
			], function(
					MeetingAgendaGridViewConfig,
                    WrapperDataGridView,
                    MeetingAgendaTabToolbarConfig,
                    MeetingAgendaModel
            	    ) {

	'use strict';	
	let _toolbar;
	let build = function(model,massupdate,_meetingInfoModel){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            'class': "agendas-gridView-View showView"
        });
        let toolbar = MeetingAgendaTabToolbarConfig.writetoolbarDefination(model,massupdate,_meetingInfoModel);
        let massupdateflag = false;
        /*if(massupdate == "true" && MeetingAgendaGridViewConfig[1].dataIndex == "Sequence") {
        	
        	MeetingAgendaGridViewConfig[1].editableFlag = true;
        	MeetingAgendaGridViewConfig[1].editionPolicy= "EditionOnClick";
        	massupdateflag = true;
        	MeetingAgendaGridViewConfig[1].getCellSemantics= sequenceValues;
        } else {
        	MeetingAgendaGridViewConfig[1].editableFlag = false;
        	massupdateflag = false;
        }*/
        let dataGridViewContainer = WrapperDataGridView.build(model, MeetingAgendaGridViewConfig, toolbar, gridViewDiv,massupdateflag);
        
        _toolbar = WrapperDataGridView.dataGridViewToolbar();
        return dataGridViewContainer;
    };
	/*let sequenceValues  = function() {
		var maxvalue = MeetingAgendaModel.meetingInfo().nextSequence +5;
	    return {
	      minValue: 1,
	      maxValue:maxvalue,
	      stepValue: 1
	    };
	}*/
    
    let getGridViewToolbar = function(){
        return _toolbar;   
    };

    let MeetingAgendasDataGridView={
            build : (model,massupdate,_meetingInfoModel) => { return build(model,massupdate,_meetingInfoModel);},            
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return MeetingAgendasDataGridView;
});

define('DS/ENXMeetingMgmt/View/Loader/NewMeetingAddAttachmentSearchLoader',
        ['DS/ENXMeetingMgmt/Utilities/SearchUtil',
        	'DS/ENXMeetingMgmt/Controller/MeetingController',
        	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'],
        	function (SearchUtil, MeetingController, NLS) {
	let NewMeetingAddAttachmentSearchLoader;
	NewMeetingAddAttachmentSearchLoader={    
			onSearchClick : function(){
				
    		require(['DS/ENXMeetingMgmt/Model/NewMeetingAttachmentsModel'], function(NewMeetingAttachmentsModel) {
    	    	var attachmentIds = NewMeetingAttachmentsModel.getAttachmentsIDs();
    	    	var contextId = NewMeetingAttachmentsModel.getModel().contextId;
    	    	/*if(contextId == "" || contextId == undefined){
    	    		wiwidget.meetingNotify.handler().addNotif({
    						level: 'error',
    						subtitle: NLS.ScopeSelectMessage,
    					    sticky: false
    				  });
    				  return;
    	    	}*/
    	        var searchcom_socket;
    	        var socket_id = UWA.Utils.getUUID();
    	        var that = this;
    	        
    	        
    	        //that.is3DSearchActive=true;
    	        if (!UWA.is(searchcom_socket)) {
    	            require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
    	                searchcom_socket = SearchCom.createSocket({
    	                    socket_id: socket_id
    	                });                
    	                let allowedTypes = "DOCUMENTS";
    	    	        var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
    	    	        var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addAttachment", true , recentTypes);
    	                refinementToSnNJSON.precond = SearchUtil.getPrecondForAttachmentSearch(recentTypes);
    	                refinementToSnNJSON.resourceid_not_in = attachmentIds;						
    	                if (UWA.is(searchcom_socket)) {
    	                	searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
							searchcom_socket.addListener('Selected_Objects_search', NewMeetingAddAttachmentSearchLoader.selected_Objects_search.bind(that,""));
							//searchcom_socket.addListener('Selected_global_action', that.selected_global_action.bind(that, url));
							// Dispatch the in context search event
							searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
    	                }else{
    	                	throw new Error('Socket not initialized');
    	                	//NewMeetingAddAttachmentSearchLoader.doSearch(that, searchcom_socket, socket_id, contextId, allowedTypes, NewMeetingAttachmentsModel);
    	                }
    	            });

    	        }
    	    
    		   });
    },
    
/*    doSearch : function(objRef, searchcom_socket, socket_id, contextId, allowedTypes, NewMeetingAttachmentsModel){  
		    var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
            var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addAttachment", true, recentTypes);
			refinementToSnNJSON.precond = SearchUtil.getPrecondForAttachmentSearch(contextId, recentTypes); 
			refinementToSnNJSON.resourceid_not_in = NewMeetingAttachmentsModel.getContentIDs();

            if (UWA.is(searchcom_socket)) {
                searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
                searchcom_socket.addListener('Selected_Objects_search', selected_Objects_search.bind(objRef,""));
                searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
            } else {
                throw new Error('Socket not initialized');
            }
	  	
    },*/
    
     selected_Objects_search : function(that,data){
        let response=[];
        for(var i=0;i<data.length;i++){
            var temp={};
            temp.id=data[i]["id"];
            temp.name=data[i]["ds6w:identifier"];
            temp.stateNLS=data[i]["ds6w:status"];
            temp.title=data[i]["ds6w:label"];
            temp.type=data[i]["ds6w:type"];
            temp.created=data[i]["ds6w:created"];
            temp.modified=data[i]["ds6w:modified"];
            temp.type_icon_url=data[i]["type_icon_url"];
            temp.owner= data[i]["ds6w:responsible"];
            response.push(temp);
        } 
        //append row
        require(['DS/ENXMeetingMgmt/Model/NewMeetingAttachmentsModel'], function(NewMeetingAttachmentsModel) {
        	NewMeetingAttachmentsModel.appendRow(response);
        });
    }
	};
    
	 return NewMeetingAddAttachmentSearchLoader;
});


define('DS/ENXMeetingMgmt/View/Facets/MeetingTabs', [
  'DS/Controls/TabBar',
  'DS/ENXMeetingMgmt/Config/MeetingFacets'
  
],
  function (WUXTabBar,MeetingFacets) {
	'use strict';
	let _meetingTabs, _currentTabIndex, meetingTabInstances = {}, _meetingInfoModel = {};
	
	let MeetingTabs = function(container, meetingInfoModel){
		_meetingInfoModel = meetingInfoModel;
		this.container = container;
	};

    let ontabClick = function(args){
		let seltab = args.options.value;
		if(typeof seltab == 'undefined'){
			seltab = args.dsModel.buttonGroup.value[0]; //this is to get the selected tab from the model
		}
		if (seltab === _currentTabIndex){
			return;
		}
		var ntabs =["agenda", "members","decision", "attachments"];
		meetingTabInstances[ntabs[seltab]].init(_meetingInfoModel);
		if(typeof _currentTabIndex != 'undefined'){
			meetingTabInstances[ntabs[_currentTabIndex]].hideView();
		}			
		_currentTabIndex = seltab;		
	};
   
	MeetingTabs.prototype.init = function(){		
		_meetingTabs = new WUXTabBar({
            displayStyle: 'strip',
            showComboBoxFlag: true,
            editableFlag: false,
            multiSelFlag: false,
            reindexFlag: true,
            touchMode: true,
            centeredFlag: false,
            allowUnsafeHTMLOnTabButton: true
        });
		MeetingFacets.forEach((tab) => {
		    _meetingTabs.add(tab); //adding the tabs
		});
		_meetingTabs.inject(this.container);
		
		//draw the tab contents
		initializeMeetingTabs();	
    };
    
    
    
	let initializeMeetingTabs = function(){		
		new Promise(function (resolve, reject){
			let promiseArr = [];
			MeetingFacets.forEach((tab, index)=>
			{				
				if(tab.loader != ""){
					promiseArr[index] = new Promise(function (resolve, reject){
						require([tab.loader], function (loader) {
							meetingTabInstances[tab.id] = loader;	
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
			_meetingTabs.addEventListener('tabButtonClick', function(args){
				ontabClick(args);
			});
			_meetingTabs.addEventListener('change', function(args){
				ontabClick(args);
			});
			
		}, function () {
			//Error during tab click
		});
		
		
	};
	MeetingTabs.prototype.destroy = function(){	    	
		try{
			_currentTabIndex = undefined; //this should be the first line, if some error occurs afterward, that would be an issue otherwise			
			Object.keys(meetingTabInstances).map((tab) => {
				meetingTabInstances[tab].destroy();
			});
			if(_meetingTabs != undefined){
				_meetingTabs.destroy();
			}
			_meetingInfoModel = {};
			this.container.destroy();
		}catch(e){
	    	//TODO check why this error: TypeError: Cannot read property '__resizeListeners__' of undefined
			//console.log(e);
		}	
	};   

    
    return MeetingTabs;
  });

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/Actions/CreateMeetingActions', [
		'DS/ENXMeetingMgmt/Controller/MeetingController',
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
		'DS/ENXMeetingMgmt/View/Form/MeetingUtil',
		'DS/ENXMeetingMgmt/Utilities/AutoDecision',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(MeetingController, WAFData, UWACore, EnoviaBootstrap, ParseJSONUtil, MeetingUtil, AutoDecision, NLS) {
	'use strict';
	let CreateMeetingActions, dialog;
	let _createMeeting = function(properties, agenda, members, attachments){
		var meetingId;
		return new Promise(function(resolve, reject){
			var initiateJson = getParsedMeetingProperties(properties);
			initiateJson = new ParseJSONUtil().createDataForRequest(initiateJson);
			initiateJson.data[0].relateddata={};
			//if members tab is not clicked even once or if members tab is clicked but no member is selected or all entries are deleted
			if((members != undefined) || (agenda.length != 0)){
					initiateJson.data[0].relateddata.attendees = getParsedMeetingMembers(members,agenda);
				
			}
			
			let agendaAutoDecision = [];
			
			//if agenda tab is not clicked even once
			if(agenda.length != 0){
				initiateJson.data[0].relateddata.agendaItems = getParsedMeetingAgenda(agenda,properties);
				agendaAutoDecision = initiateJson.data[0].relateddata.agendaItems.agendaAutoDecision;
			}
			
			//if attachments tab is not clicked even once
			if(attachments != undefined || attachments.length != 0){
				initiateJson.data[0].relateddata.attachments = getParsedMeetingAttachments(attachments,agenda);
			}
			initiateJson.data[0].relateddata.promote = getParsedMeetingMaturity(properties);
			MeetingController.createMeeting(initiateJson).then(
					resp => {
						meetingId=resp[0].id;
						
						if(agendaAutoDecision.length > 0) 
							AutoDecision.createAgendaDecision(agendaAutoDecision,meetingId);
						
						resolve(resp)
						}, 	
					resp => reject(resp));			
			}).then(function() {
				return new Promise(function(resolve, reject) {
					MeetingController.fetchMeetingById(meetingId).then(				
					success => {
						resolve(success);
						},
						failure => reject(failure)
						);
					});
				});
		};
	
	let _saveAsMeeting = function(properties, agenda, members, attachments){
		console.log("saveAsMeeting");
		let meetingId;
		var inputData = {};
		return new Promise(function(resolve, reject){
			var initiateJson = getParsedMeetingProperties(properties);
			initiateJson = new ParseJSONUtil().createDataForRequest(initiateJson);
			initiateJson.data[0].relateddata={};
			//if members tab is not clicked even once or if members tab is clicked but no member is selected or all entries are deleted
			if((members != undefined) || (agenda.length != 0)){
					initiateJson.data[0].relateddata.attendees = getParsedMeetingMembers(members,agenda);
			}
		
			let agendaAutoDecision = [];
				
			//if agenda tab is not clicked even once
			if(agenda.length != 0){
				initiateJson.data[0].relateddata.agendaItems = getParsedMeetingAgenda(agenda,properties);
				agendaAutoDecision = initiateJson.data[0].relateddata.agendaItems.agendaAutoDecision;
			}
			
			//if attachments tab is not clicked even once
			if(attachments != undefined || attachments.length != 0){
				initiateJson.data[0].relateddata.attachments = getParsedMeetingAttachments(attachments,properties);
			}
			
			MeetingController.saveAsMeeting(initiateJson).then(
					resp => {
						meetingId=resp[0].id;
						
						if(agendaAutoDecision.length > 0) 
							AutoDecision.createAgendaDecision(agendaAutoDecision,meetingId);
						
						resolve(resp)
						}, 	
					resp => reject(resp));			
			}).then(function() {
				return new Promise(function(resolve, reject) {
					MeetingController.fetchMeetingById(meetingId).then(				
					success => {
						resolve(success);
						},
						failure => reject(failure)
						);
					});
				})		
	};
	
	
	let getParsedMeetingProperties = function(properties){
		var dataelements = {
				"name": "",
				"description" : properties.elements.description.value,
				"location": properties.elements.location.value,
				"startDate" : properties.elements.meetingStartDateDate.value,
				"duration" : properties.elements.duration.value,
				"subject": properties.elements.title.value,
				"conferenceCallNumber" : properties.elements.conCallNumber.value,
				"conferenceCallAccessCode" : properties.elements.conAccessCode.value,
				"onlineMeetingProvider": properties.elements.meetingProvider.value,
				"onlineMeetingInstructions" : properties.elements.instruction.value,
				"parentID" : properties.elements.contextId || ""	
			}
			
			//custom attributes
			let customFields = properties.customFields;
		
			if (customFields) {
				//get all custom attributes
				if (customFields && customFields.items && customFields.items.length && customFields.items.length > 0) {
					//loop through each attribute and save value from properties to response{}
					customFields.items.forEach((ele) => {
						let customFieldValue = "";
						if (ele.name != 'extensions') {
							if (MeetingUtil.isMultiValueField(ele)) {
								if (MeetingUtil.hasAuthorisedValues(ele)) {
									//go through array of individual components
									//customFieldValue = properties.elements[ele.name].getAllChipsAsLabels();
									let eleType = MeetingUtil.getViewType(ele) || null;
									customFieldValue = properties.elements[ele.name];
									if (Array.isArray(customFieldValue)) {
										let tempArray = customFieldValue;
										customFieldValue = [];
										for (let i=0; i<tempArray.length; i++) {
											//if (properties.elements[ele.name].type=='checkbox') {
											if (eleType=='checkbox') {
												if (tempArray[i].checkFlag) //properties.elements[ele.name].checkFlag
													customFieldValue.push('TRUE');
												else
													customFieldValue.push('FALSE');
											}
											else {
												customFieldValue.push(tempArray[i].value);
											}
										}									
									}
									else {
										customFieldValue = [];
										customFieldValue.push(properties.elements[ele.name].value || "");									
									}
								}
								else { //mvalued but no authorised fields
								
									let eleType = MeetingUtil.getViewType(ele) || null;
									customFieldValue = properties.elements[ele.name].value;
									if (Array.isArray(customFieldValue)) {
										let tempArray = customFieldValue;
										customFieldValue = [];
										for (let i=0; i<tempArray.length; i++) {
											//if (properties.elements[ele.name].type=='checkbox') {
											if (eleType=='checkbox') {
												if (properties.elements[ele.name].checkFlag)
													customFieldValue.push('TRUE');
												else
													customFieldValue.push('FALSE');
											}
											else {
												customFieldValue.push(tempArray[i] || "");
											}
										}									
									}
									else {
										customFieldValue = [];
										customFieldValue.push(properties.elements[ele.name].value || "");									
									}
								
								}
							}
							else {
								if (properties.elements[ele.name].type=='checkbox') { 
									if (properties.elements[ele.name].checkFlag)
										customFieldValue = 'TRUE';
									else
										customFieldValue = 'FALSE'
								}
								else
									customFieldValue = properties.elements[ele.name].value || "";
							}
							dataelements[ele.name] = customFieldValue;
						}
					});
				}
			}
			
		return dataelements;
	}
	
	
	let getParsedMeetingAgenda = function(agendas,properties){
		var agendaInfo = [];
		agendaInfo.agendaAutoDecision = [];
		
		let count = 1;
		agendas.forEach((agenda) => {
			var topciItemIds = [];
			if(agenda.info.speaker.selectedItems == undefined || agenda.info.speaker.selectedItems == "" )
			{
				agenda.info.speaker.speakerId="";
			}else{
					agenda.info.speaker.speakerId = agenda.info.speaker.selectedItems.options.id;
			}
			
			if(agenda.info.autoCompleteComponent != undefined){
				if(agenda.info.autoCompleteComponent.selectedItems !=undefined && agenda.info.autoCompleteComponent.selectedItems.length !=0){
					agenda.info.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
						if(dataElem.options.value.name == undefined){
							topciItemIds.push(dataElem.options.value);
						}
					});
				}
			}
			
			let autoDecision = agenda.info.autoDecision.checkFlag;
				
			if(autoDecision) {
				let itemAutoDecision = {};
				
				itemAutoDecision.topic = agenda.info.topic.value;
				itemAutoDecision.topicDescription = agenda.info.description.value;
				
				//Cloning the array of related items
				itemAutoDecision.relatedItem = topciItemIds.slice();
					
				agendaInfo.agendaAutoDecision.push(itemAutoDecision);
			}
			
			if( topciItemIds.length != 0){
				topciItemIds.forEach((attachment) => {
					let tempInfo = {};
					
					tempInfo.id=attachment;
					tempInfo.relelements={};
					tempInfo.relelements.topic=agenda.info.topic.value;
					tempInfo.relelements.topicDuration= agenda.info.duration.value;
					tempInfo.relelements.responsibileOID= agenda.info.speaker.speakerId;
					tempInfo.relelements.topicDescription= agenda.info.description.value;
					tempInfo.relelements.sequence=count.toString();
					agendaInfo.push(tempInfo);
			});
		}else{
			agendaInfo.push({"relelements" : {
								"topic" : agenda.info.topic.value,
								"topicDuration" : agenda.info.duration.value,
								"responsibileOID": agenda.info.speaker.speakerId,
								"topicDescription":agenda.info.description.value,
								"sequence" : count.toString()
							}
			});
		}
			count++;
		});
		
		return agendaInfo;
	}
	
	let getParsedMeetingMembers = function(members,agendas){
		var membersInfo =[];
		let tempMemberIds=[];
		if(members != undefined ){
			if((members.getSelectedNodes().length) !=0){
				var selectedMemberList=members.getSelectedNodes();
				selectedMemberList.forEach((member) => {
					membersInfo.push({"id" : member.options.id});
					tempMemberIds.push(member.options.id);
				});
			}
		}
		if(agendas.length != 0){
			agendas.forEach((agenda) => {
				if(agenda.info.speaker.selectedItems == undefined || agenda.info.speaker.selectedItems == "" ){}
				else{
						let agendaSpeakerId = agenda.info.speaker.selectedItems.options.id;
						if(!(tempMemberIds.includes(agendaSpeakerId))){
							membersInfo.push({"id" : agendaSpeakerId});
						}
				}
			})
		}
		return membersInfo;
	}
	
	let getParsedMeetingMaturity =function(properties){
		var maturity=[];
		//dummy element passing to call the service to promote the meeting to schedule
		maturity.push({"startMeeting": true});
		return maturity;
	}
	
	let getParsedMeetingAttachments = function(attachments,properties){
		var AttachmentInfo=[];

		
		//enters this if when content tab has been clicked atleast once and it has some contents added.
		if(attachments.getChildren().length > 0){
			attachments.getChildren().forEach((elem) => {
				AttachmentInfo.push({"id":elem.options.grid.id});
			});
			
		}
		return AttachmentInfo;
		
	}
	
	

    
	CreateMeetingActions={
			createMeeting: (properties, agenda, members, attachments) => {return _createMeeting(properties, agenda, members, attachments);},
			saveAsMeeting: (properties, agenda, members, attachments) => {return _saveAsMeeting(properties, agenda, members, attachments);}			
    };
    
    return CreateMeetingActions;
});

define('DS/ENXMeetingMgmt/View/Form/MeetingView',
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
	'DS/ENXMeetingMgmt/Utilities/Utils',
	'DS/ENXMeetingMgmt/View/Form/MeetingUtil',
	'DS/ENXMeetingMgmt/View/Loader/NewMeetingContextChooser',
	'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
	'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
function (WUXLineEditor, WUXEditor, WUXButton, WUXToggle,WUXAccordeon, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		  TreeDocument, TreeNodeModel, Utils, MeetingUtil, NewMeetingContextChooser, DragAndDrop, DragAndDropManager, NLS) {    
	"use strict";
	let _meetingProperties = {};
	let _meetingState;
	let onDrop;

	let build= function (data,container,mode) {
		_meetingState = data.model.Maturity_State || "";
		if(!showView()){
			
			// Create the container in which all Meeting properties details will be rendered //
			_meetingProperties.elements = {};			
			//Create property to hold widget custom Fields
			_meetingProperties.customFields = (widget.getValue("customFields")||{});
			
			// Layout - Header Body Footer //
			_meetingProperties.formContainer = new UWA.Element('div', {id: 'MeetingPropertiesContainer','class':'meeting-prop-container'});
			_meetingProperties.formContainer.inject(container);
			
			/*_meetingProperties.formHeader = new UWA.Element('div', {id: 'MeetingPropertiesHeader','class':'meeting-prop-header'});
			_meetingProperties.formHeader.inject(_meetingProperties.formContainer);*/
			_meetingProperties.formFields = new UWA.Element('div', {id: 'MeetingPropertiesBody','class':'meeting-prop-body meeting-properties-form-field'});
			_meetingProperties.formFields.inject(_meetingProperties.formContainer);
			_meetingProperties.formFooter = new UWA.Element('div', {id: 'MeetingPropertiesFooter','class':'meeting-prop-footer'});
			_meetingProperties.formFooter.inject(_meetingProperties.formContainer);
			
			var fieldRequired,fieldViewOnly,closeEventName;
			closeEventName = "meeting-info-close-click";
			if(mode == "edit"){
				fieldRequired = "required";
				fieldViewOnly = false;		
			}else{
				// default to view only //
				fieldRequired = "";
				fieldViewOnly = true;
			}
			
			// Header //
			// header properties icon //
		/*	UWA.createElement('div',{
				"title" : NLS.MeetingViewPropertiesTooltip,
				"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-attributes fonticon-display fonticon-color-display",
				styles : {"font-size": "20px","float":"left","color":"#368ec4"},
			}).inject(_meetingProperties.formHeader);
			
			var meetingPropertiesTitleDiv = new UWA.Element("div", {
					"id": "meetingPropertyTitleId",
					"class": "",
					styles : {"font-size": "20px","float":"left","color":"#368ec4"},
				}).inject(_meetingProperties.formHeader);
			new UWA.Element("h5", {"class":"", text: NLS.MeetingPropertiesTitle}).inject(meetingPropertiesTitleDiv);
			
			// header action - Close // 
			UWA.createElement('div',{
				"id" : "meetingViewPanelClose",
				"title" : NLS.MeetingViewCloseTooltip,
				"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
				styles : {"font-size": "20px","float":"right"},
				events: {
	                click: function (event) {
	                	 widget.meetingEvent.publish(closeEventName);
	                	destroy(mode);
	                }
				}
			}).inject(_meetingProperties.formHeader);*/
		
			// Body //
	
	
			// header action - edit // 
				/*if(fieldViewOnly && data.model.ModifyAccess  == "TRUE"){
					UWA.createElement('div',{
						"id" : "meetingEditButtonnId",
						"title" : NLS.Edit,
						"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-pencil fonticon-display fonticon-color-display",
						styles : {"font-size": "20px","float":"right"},
						events: {
			                click: function (event) {
			                	document.querySelector('#MeetingPropertiesContainer').destroy();
			                	build(data,container,"edit");	
			                }
						}
					}).inject(_meetingProperties.formFields);
				}*/
			
			    if(fieldViewOnly && data.model.ModifyAccess  == "TRUE"){
					UWA.createElement('div',{
						"id" : "meetingEditButtonnId",
						"title" : NLS.Edit,
						"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-pencil fonticon-display fonticon-color-display",
						styles : {"font-size": "20px","float":"right"},
						events : {
			                click: function (event) {
			                	document.querySelector('#MeetingPropertiesContainer').destroy();
			                	build(data,container,"edit");	
			                }
						}
					}).inject(_meetingProperties.formFields);
				}
				else if (!fieldViewOnly) {
					UWA.createElement('div',{
						"id" : "meetingEditButtonnId",
						"title" : NLS.Edit,
						"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-pencil fonticon-display fonticon-color-display",
						styles : {"font-size": "20px","float":"right"},
						events : {
			                click: function (event) {
			                	document.querySelector('#MeetingPropertiesContainer').destroy();
			                	build(data,container,"read");	
			                }
						}
					}).inject(_meetingProperties.formFields);
				}
					
			
			// Meeting Title //
			var titleDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.title}).inject(titleDiv);
				new UWA.Element("span", {text: data.model.title}).inject(titleDiv);
			}else{
				var labelTitle = new UWA.Element("h5", {"class":fieldRequired, text: NLS.title}).inject(titleDiv);
				UWA.createElement("div", {
					"class": "required-label-meetings fonticon fonticon-asterisk-alt"
				}).inject(labelTitle);

				if(!data.model.title){
					data.model.title = "";
				}
				_meetingProperties.elements.title = new WUXLineEditor({
					placeholder: NLS.placeholderTitle,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					sizeInCharNumber: 45,
					value: data.model.title,
			    }).inject(titleDiv);
			}
			
			//Context
			if (fieldViewOnly) {
				var meetingContextDiv = new UWA.Element('div', {
					id: 'contextId', class:""
				}).inject(_meetingProperties.formFields);
				
				let contextName = data.model.ContextName;
				var contextLabelAttr = new UWA.Element("h5", {"class":"", text: NLS.context}).inject(meetingContextDiv);			
				new UWA.Element("span", {text: contextName}).inject(meetingContextDiv);
				
			}
			else {				
				let disabledFlag = true;
				if (_meetingState.toLowerCase()=='draft')
					disabledFlag = false;
					
				var meetingContextDiv = new UWA.Element('div', {
					id: 'contextId-dropzone', class:"droppable show meeting-context-dropzone"
				}).inject(_meetingProperties.formFields);
				
				var contextLabelAttr = new UWA.Element("h5", {"class":"meeting-context-dropzone", text: NLS.context}).inject(meetingContextDiv);
								
				var searchContextDiv = new UWA.Element('div', {
					id: 'SearchContextsField', class:"fonticon-chooser-display meeting-context-dropzone"
				}).inject(meetingContextDiv); 
				
				//let contextName = data.model.ContextName || NLS.placeholderSearchContext;
				let contextId = data.model.ContextPhysicalId;
				let currentContextValue = data.model.ContextName || "";
				
				_meetingProperties.elements.contextField = new WUXLineEditor({
				      placeholder: NLS.placeholderSearchContext,
	//			      requiredFlag: true,
	//			      pattern: "[a-z]+",
				      contextObjectId:"",
				      sizeInCharNumber: 30,
				      displayClearFieldButtonFlag: true,
				      disabled: true,
				      value: currentContextValue
				    }).inject(searchContextDiv);
			    _meetingProperties.elements.contextId = contextId;
			    
			    var space = new UWA.Element('div', {html:"&nbsp;"});
				space.inject(searchContextDiv);
				
				_meetingProperties.elements.contextChooser = new WUXButton({
					icon: {iconName: "search", fontIconFamily: WUXManagedFontIcons.Font3DS, fontIconSize: '1x'},
					disabled: disabledFlag
				}).inject(searchContextDiv);;
				_meetingProperties.elements.contextChooser.getContent().addEventListener('buttonclick', function(){			     
					NewMeetingContextChooser.init(event, _meetingProperties);
				});					
				space = new UWA.Element('div', {html:"&nbsp;"});
				space.inject(searchContextDiv);
				_meetingProperties.elements.contextClear = new WUXButton({
					icon: {iconName: "clear", fontIconFamily: WUXManagedFontIcons.Font3DS, fontIconSize: '1x'},
					disabled: disabledFlag
				}).inject(searchContextDiv);
				_meetingProperties.elements.contextClear.getContent().addEventListener('buttonclick', function(){			     
					_meetingProperties.elements.contextField.value = "";
					_meetingProperties.elements.contextId = "";
				});			
				
				
				
			}
			
			// Description //
			var descDiv = new UWA.Element("div", {
				"id": "descId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			var labelDesc = new UWA.Element("h5", {text: NLS.description}).inject(descDiv);
			
			if(fieldViewOnly){
				new UWA.Element("span", {text: data.model.Description}).inject(descDiv);
				
			}else{
				if(!data.model.Description){
					data.model.Description = "";
				}
				_meetingProperties.elements.description = new WUXEditor({
					placeholder: NLS.placeholderDescription,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: data.model.Description
			    }).inject(descDiv);
			}
			
			// Meeting Location //
			var locationDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.location}).inject(locationDiv);
				new UWA.Element("span", {text: data.model.location}).inject(locationDiv);
			}else{
				var labelLocation = new UWA.Element("h5", {"class":fieldRequired, text: NLS.location}).inject(locationDiv);
				if(!data.model.location){
					data.model.location = "";
				}
				_meetingProperties.elements.location = new WUXLineEditor({
					placeholder: NLS.placeholderLocation,
					sizeInCharNumber: 45,
					value: data.model.location,
			    }).inject(locationDiv);
			}
			

			// Meeting start date and Time //
			var meetingStartDate = new Date();
			meetingStartDate.setDate(meetingStartDate.getDate() + 1);
			var meetingMinDate = new Date();
			meetingMinDate.setDate(meetingMinDate.getDate() - 1);
			if(data.model.startDate){
				meetingStartDate = data.model.startDate;
			}
			
			var meetingStartDateDiv = new UWA.Element("div", {
				"id": "startDateId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.startDateAndTime}).inject(meetingStartDateDiv);
				var date = new Date(meetingStartDate);
				new UWA.Element("span", {text: Utils.formatDateTimeString(date)}).inject(meetingStartDateDiv);
			}else{
				var labelDate = new UWA.Element("h5", {"class":fieldRequired, text: NLS.startDateAndTime}).inject(meetingStartDateDiv);
					UWA.createElement("div", {
						"class": "required-label-meetings fonticon fonticon-asterisk-alt"
					}).inject(labelDate);
			
					_meetingProperties.elements.meetingStartDateDate = new WUXDatePicker({
					value: new Date(meetingStartDate),
					minValue: new Date(meetingMinDate),
					timePickerFlag:true
				}).inject(meetingStartDateDiv);
			}
			
			//duration of meeting
			var durationDiv = new UWA.Element("div", {
				"id": "durationId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.durationInMinutes}).inject(durationDiv);
				new UWA.Element("span", {text: data.model.duration}).inject(durationDiv);
			}else{
				var labelDuration = new UWA.Element("h5", {"class":"fieldRequired", text: NLS.durationInMinutes}).inject(durationDiv);
				if(fieldRequired){
					UWA.createElement("div", {
						"class": "required-label-meetings fonticon fonticon-asterisk-alt"
					}).inject(labelDuration);
				}

				if(!data.model.duration){
					data.model.duration = "";
				}
				_meetingProperties.elements.duration = new WUXLineEditor({
					placeholder: NLS.placeholderDuration,
					//pattern: '[0-9]+[.0-9]*',
					pattern: '([0-4]?\\d{0,2}([.]\\d+)?)|500(.[0]+)?',
					sizeInCharNumber: 45,
					value: data.model.duration,
			    }).inject(durationDiv);
			}
			
			// Conference Call Number // 
			var confCallNumDiv = new UWA.Element("div", {
				"id": "confCallNumId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.conCallNumber}).inject(confCallNumDiv);
				new UWA.Element("span", {text: data.model.conferenceCallNumber}).inject(confCallNumDiv);
			}else{
				var labelConfCallNum = new UWA.Element("h5", {text: NLS.conCallNumber}).inject(confCallNumDiv);

				if(!data.model.conferenceCallNumber){
					data.model.conferenceCallNumber = "";
				}
				_meetingProperties.elements.conferenceCallNumber = new WUXLineEditor({
					placeholder: NLS.placeholderConCallNumber,
					sizeInCharNumber: 45,
					value: data.model.conferenceCallNumber,
			    }).inject(confCallNumDiv);
			}
			
			// Conference Call Access Code // 
			var confCallAcsCdDiv = new UWA.Element("div", {
				"id": "confCallAcsCdId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.accessCode}).inject(confCallAcsCdDiv);
				new UWA.Element("span", {text: data.model.conferenceCallAccessCode}).inject(confCallAcsCdDiv);
			}else{
				var labelConfCallAcsCd = new UWA.Element("h5", {text: NLS.accessCode}).inject(confCallAcsCdDiv);

				if(!data.model.conferenceCallAccessCode){
					data.model.conferenceCallAccessCode = "";
				}
				_meetingProperties.elements.conferenceCallAccessCode = new WUXLineEditor({
					placeholder: NLS.placeholderAccessCode,
					sizeInCharNumber: 45,
					value: data.model.conferenceCallAccessCode,
			    }).inject(confCallAcsCdDiv);
			}
			
			// Online Meeting Provider // 
			var meetingProvidrDiv = new UWA.Element("div", {
				"id": "meetingProvidrId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.meetingProvider}).inject(meetingProvidrDiv);
				new UWA.Element("span", {text: data.model.onlineMeetingProvider}).inject(meetingProvidrDiv);
			}else{
				var labelMeetingProvidr = new UWA.Element("h5", {text: NLS.meetingProvider}).inject(meetingProvidrDiv);

				if(!data.model.onlineMeetingProvider){
					data.model.onlineMeetingProvider = "";
				}
				_meetingProperties.elements.onlineMeetingProvider = new WUXLineEditor({
					placeholder: NLS.placeholderMeetingProvider,
					sizeInCharNumber: 45,
					value: data.model.onlineMeetingProvider,
			    }).inject(meetingProvidrDiv);
			}
			
			// Online Meeting Instructions //
			var meetingInstrDiv = new UWA.Element("div", {
				"id": "meetingInstrId",
				"class": ""
			}).inject(_meetingProperties.formFields);
			var labelMeetingInstr = new UWA.Element("h5", {text: NLS.meetingInstruction}).inject(meetingInstrDiv);
			
			if(fieldViewOnly){
				new UWA.Element("span", {text: data.model.onlineMeetingInstructions}).inject(meetingInstrDiv);
				
			}else{
				if(!data.model.onlineMeetingInstructions){
					data.model.onlineMeetingInstructions = "";
				}
				_meetingProperties.elements.onlineMeetingInstructions = new WUXEditor({
					placeholder: NLS.placeholderMeetingInstruction,
					//requiredFlag: true,
					//pattern: "[a-z]+",
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: data.model.onlineMeetingInstructions
			    }).inject(meetingInstrDiv);
			}
			
				
				//custom attributes
		//first item is alwasy list of extensions
		if (_meetingProperties.customFields&&_meetingProperties.customFields.items&&_meetingProperties.customFields.items.length>0) {
			_meetingProperties.customFields.items.forEach((ele, idx) => {
			
				if (ele.name !=='extensions') {
					let containerDiv;
						
					if(MeetingUtil.isMultiValueField(ele)) {
						if (MeetingUtil.hasAuthorisedValues(ele)) {
							containerDiv = new UWA.Element("div", {
							
								"id": ele.name,
								"class": "ellipsis-parent",
								"styles": {'width': '100%'}
								
							}).inject(_meetingProperties.formFields);
						}
						else {
							containerDiv = new UWA.Element("div", {
							
								"id": ele.name,
								"class": "",
								"styles": {'width': '65%'}
								
							}).inject(_meetingProperties.formFields);
						}	
					}
					else {
						containerDiv = new UWA.Element("div", {
							
							"id": ele.name,
							"class": ""
							
						}).inject(_meetingProperties.formFields);
					}
					
					let containerDivInner = new UWA.Element("div", {
						
						"id": ele.name+"-inner",
						"class": ""
						
					}).inject(containerDiv);
					
					let required = (ele.mandatory&&!fieldViewOnly) ? "required" : "";
					let requiredFlag = (ele.mandatory) ? ele.mandatory : false;
					
					let labelAttr = new UWA.Element("h5", {text: ele.label.replace(/\s\s+/g, ' ').trim(), "class": required});//.inject(containerDivInner);
					if(required){
					UWA.createElement("div", {
							"class": "required-label-meetings fonticon fonticon-asterisk-alt"
						}).inject(labelAttr);
					}
					
					if(fieldViewOnly){
						let customVal;
						if (data.model[ele.name]) {
							//let customVal, date;
							let date;
							if(MeetingUtil.isDateField(ele)){
								if (Array.isArray(data.model[ele.name])) {
									if (data.model[ele.name].length>0) {
										let tempVal = [];
										for (let i=0; i<data.model[ele.name].length; i++) {
											date = new Date(data.model[ele.name][i]);
											//tempVal.push(MeetingUtil.getLocaleDate(date, true));
											tempVal.push(Utils.formatDateTimeString(date))
										}
										customVal = tempVal.join("\n");
									}
									else {
										date = new Date();										
								 		//customVal = MeetingUtil.getLocaleDate(date, true);
								 		customVal = Utils.formatDateTimeString(date);
									}
								}
								else {
									date = new Date(data.model[ele.name]);
								 	//customVal = MeetingUtil.getLocaleDate(date, true);
								 	customVal = Utils.formatDateTimeString(date);
								}
								 	
							 }
							 else if (MeetingUtil.getViewTypeElementName(ele)=='lineeditor'&&ele.units) {
							 	//if multivalued, then get value array from selectionchips editor
							 	if (MeetingUtil.isMultiValueField(ele)) {
							 		//let tempVal = data.model[ele.name].value || null;
							 		let tempVal = (data.model[ele.name].value) ? data.model[ele.name].value : ((data.model[ele.name]) ? data.model[ele.name] : null) || null;
							 		let defUnit = MeetingUtil.getDefaultUnit(ele);
							 		if (tempVal) {
							 			customVal = "";
							 			for (let i=0; i<tempVal.length; i++) {
							 				if (tempVal[i]) {
							 					customVal = customVal + tempVal[i] + " " + defUnit.display;
							 					if (i<tempVal.length -1)
							 						customVal = customVal + ", ";
							 				}
							 			}
							 		}
							 	}
							 	else {
							 		customVal = data.model[ele.name] || "";
							 		if (customVal) {
							 			let defUnit = MeetingUtil.getDefaultUnit(ele);
							 			customVal = customVal + " " + defUnit.display;
							 		}
							 	}
							 }
							 else if (MeetingUtil.getViewTypeElementName(ele)=='toggle') {
							 	if (MeetingUtil.isMultiValueField(ele)) {
							 		if (Array.isArray(data.model[ele.name])&&data.model[ele.name].length===0) {
							 			//data.model[ele.name].push('FALSE');
							 			customVal = [];
							 			customVal.push('FALSE');
							 		}
							 	}
							 }
							 if (!customVal)
							 	customVal = data.model[ele.name] || "";
							//labelAttr.inject(containerDiv);
							//new UWA.Element("span", {text: customVal}).inject(containerDiv);
						}	
						else {
							//let customFieldValue = "";
							let tempDefaultVal = MeetingUtil.getDefaultValue(ele);
							if (tempDefaultVal) {
								customVal = tempDefaultVal;
								data.model[ele.name] = tempDefaultVal;
							}
							else {
								customVal = "";
								data.model[ele.name] = "";
							}
						}						
						labelAttr.inject(containerDivInner);
						new UWA.Element("span", {text: customVal}).inject(containerDiv);
					}
					
					else {
					
							//if (!data.model[ele.name])
								//data.model[ele.name] = "";
							labelAttr.inject(containerDivInner);
							
							//create options for WUX elements based on viewConfig.type
							let eleType;
							let eleDataType;
							let eleDefaultValue;
							let eleTypeContainer;
							
							eleType	 = MeetingUtil.getViewTypeElementName(ele) || null;
							eleDataType = MeetingUtil.getViewAttributeType(ele) || null;
							eleDefaultValue = MeetingUtil.getDefaultValue(ele);
							
							if (eleType) {
								
								//multivalue?
								if (MeetingUtil.isMultiValueField(ele)) {
									/*let attrValue = data.model[ele.name];
									if (Array.isArray(attrValue)&&eleType=='datepicker') {
										//eleTypeContainer = MeetingUtil.renderMultivalueFieldInPropertiesView(eleType, ele, data, requiredFlag, _meetingProperties, "", null, containerDiv, containerDivInner); //source = "", rowNum = null
										//eleTypeContainer = MeetingUtil.renderMultivalueFieldInPropertiesView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, _meetingProperties, data);
									}
									else {
										data.model[ele.name] = new Array();
										if (attrValue) {
											data.model[ele.name].push(attrValue);
										}
									}*/
									if (MeetingUtil.hasAuthorisedValues(ele)) {
										eleTypeContainer = MeetingUtil.renderMultivalueFieldInPropertiesView2(eleType, ele, data, requiredFlag, _meetingProperties, "", null, containerDiv, containerDivInner); //source = "", rowNum = null
									}
									else {
										eleTypeContainer = MeetingUtil.renderMultivalueFieldInPropertiesView(eleDataType, eleType, requiredFlag, eleDefaultValue, ele, containerDiv, _meetingProperties, data);									
									}
								}
								else 								
									eleTypeContainer = MeetingUtil.renderFieldInPropertiesView(eleType, ele, data, requiredFlag);
								
								if (eleTypeContainer) {
									let isEditable = ele.editable;
									if(eleType=='lineeditor'&&ele.units&&!(isEditable===false)) {
										let containerDivInner2 = new UWA.Element("div", {							
											"id": ele.name+"-inner2",
											"class": ""
											
										}).inject(containerDiv);										
										_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDivInner2);
										MeetingUtil.addDimensionToLineeditor(containerDivInner2, ele);
									}
									else
										_meetingProperties.elements[ele.name] = eleTypeContainer.inject(containerDiv);
								}
							}
						}						
	
					}
				
				});
			
			}

			
			
			
			if (_meetingState.toLowerCase()=='draft')
				DragAndDrop.makeDroppable(_meetingProperties.formFields, onDrop, 'contextId-dropzone');
			
			
			
			// Footer //
		
			if(fieldViewOnly){
				_meetingProperties.formFooter.style.display = "none";
			}else{
				// Save and Cancel button
				var cancelButtonDiv = new UWA.Element('div', 
						{
							id:"cancelButtonId",
							class:"agenda-save-float",
							events: {
			                click: function (event) {
			                	document.querySelector('#MeetingPropertiesContainer').destroy();
			                	build(data,container,"view");	
			                }
						}
						}).inject(_meetingProperties.formFooter);
					_meetingProperties.elements.save = new WUXButton({ label: NLS.cancel, emphasize: "secondary" }).inject(cancelButtonDiv);
					new UWA.Element('div', {html:"&nbsp;"}).inject(cancelButtonDiv);
					
				var saveButtonDiv = new UWA.Element('div', 
						{
							id:"saveButtonId",
							class:"agenda-save-float"
						}).inject(_meetingProperties.formFooter);
					_meetingProperties.elements.save = new WUXButton({ label: NLS.save, emphasize: "primary" }).inject(saveButtonDiv);
					new UWA.Element('div', {html:"&nbsp;"}).inject(saveButtonDiv);
					_meetingProperties.elements.save.getContent().addEventListener('click', function(){
						//check if context has been edited
						data.contextEdited = (_meetingProperties.elements.contextId !== data.model.ContextPhysicalId);
						MeetingUtil.meetingPropertiesUpdate(data,_meetingProperties);	
					});
					
			}
		
		}
	};
	 let hideView= function(){
	        if(document.getElementById('MeetingPropertiesContainer') != null){
	            document.getElementById('MeetingPropertiesContainer').style.display = 'none';
	           
	        }
	    };
	let destroy = function(){
		_meetingProperties = {};
	};
		
	let showView= function(){
		   if(document.querySelector('#MeetingPropertiesContainer') != null){
		       document.getElementById('MeetingPropertiesContainer').style.display = 'flex';
		       return true;
		   }
		   return false;
		};
	
	 onDrop = function(e, target) {
	 	DragAndDropManager.onDropManagerContext(e, _meetingProperties, target);
	 };

	 let MeetingView={
			 init : (data,container,mode) => { return build(data,container,mode);},
			 hideView: () => {hideView();},
			//build : (container,data,mode) => { return build(container,data,mode);},
			destroy : () => {return destroy();}
	 };
	 return MeetingView;
});

/* global define, widget */
/**
 * @overview Meeting Management
 * @licence Copyright 2006-2022 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/Services/WidgetCommonServices', [
	'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap'
], 
	function(EnoviaBootstrap){
	'use strict';
	let openRelationalExplorer = function(selectedIds){
		var appId =  'ENORIPE_AP';
        launchAppBasedOnAppId(selectedIds, appId);
	};
	
	let launchAppBasedOnAppId = function(selectedIds, appId)
    {
          var itemsData = [];
          selectedIds.forEach(function (selectedID) {
                var item = {
                    'envId': widget.getPreference("x3dPlatformId").value,
                    'serviceId': '3DSpace',
                    'contextId': widget.getPreference("collabspace").value,
                    'objectId': selectedID
                  };
                  
                itemsData.push(item);
          });

          var sourceApp = widget.getValue('appId');
          if(!sourceApp){
            sourceApp = "ENXMEET_AP";
          }

          var compassData = {
            protocol: "3DXContent",
            version: "1.1",
            source: sourceApp,
            widgetId: widget.id,
            data: {
              items: itemsData
            }
          };

          var intercom_socket = 'com.ds.meeting.' + widget.id; // This should be same as contentSocketId of EnoviaBootstrap.initCompassSocket method //
          var compass_socket = EnoviaBootstrap.getCompassSocket();
          compass_socket.dispatchEvent('onSetX3DContent', compassData, intercom_socket);

        var params = {
          appId: appId
        };
        compass_socket.dispatchEvent('onLaunchApp', params, intercom_socket);
    };
	
	let WidgetCommonServices={
			openRelationalExplorer: (selectedIds) => {return openRelationalExplorer(selectedIds);}
	};
	
	return WidgetCommonServices;
});

/**
 * datagrid view for Task attachments
 */
define('DS/ENXMeetingMgmt/View/Grid/AgendaTopicItemsDataGridView',
        [   
        	"DS/ENXMeetingMgmt/Config/AgendaTopicItemsGridViewConfig",
            "DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView",
            'DS/ENXMeetingMgmt/View/Menu/AgendaTopicContextualMenu',
            'DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel'
            ], function(
            		AgendaTopicItemsGridViewConfig,
                    WrapperDataGridView,
                    AgendaTopicContextualMenu,
                    AgendaTopicItemsModel
            ) {
	
    'use strict';   
    let _toolbar, _dataGridInstance, _gridOptions = {}, _mode= false, _data ="",_meetnginfo={};
    let build = function(model, mode,data,meetnginfo){
    	_mode = mode;
    	_meetnginfo = meetnginfo;
    	_data = data;
    	var gridViewDiv = UWA.createElement("div", {id:'agendaTopicItesm-dataGridViewContainer',
    		'class': "agendaTopicItesm-gridView-View"
    	});
    	_gridOptions.cellDragEnabledFlag = false;
    	_gridOptions.showRowBorderFlag = true;
    	_gridOptions.showOutlineFlag = true;
    	_gridOptions.showAlternateBackgroundFlag = false;
    	let layoutOptions =  { 
    			rowsHeader: false,
    			columnsHeader:false,
    			rowSpacing: 5,
    			cellWidth: 2
    	} 
    	_gridOptions.layoutOptions = layoutOptions;
    	_gridOptions.showContextualMenuColumnFlag = true;
    	_gridOptions.onContextualEvent = function(params) {
    		if(params && params.cellInfos){
    			AgendaTopicContextualMenu.topicItemGridRightClick(params.data.event, mode,removeCallback,meetnginfo);
    		}
    	}
    	_gridOptions.noStatusbar = true;
    	let dataGridViewContainer = WrapperDataGridView.build(model, AgendaTopicItemsGridViewConfig, false, gridViewDiv, _gridOptions);
    	_dataGridInstance = WrapperDataGridView.dataGridView();

    	registerListners();

    	return dataGridViewContainer;
    };
    
    let openContextualMenu = function (e, cellInfos) {
        //  that.onItemClick(e, cellInfos);
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
              if (e.button == 2) {
                  require(['DS/ENXMeetingMgmt/View/Menu/AgendaTopicContextualMenu'], function (AgendaTopicContextualMenu) {
                	  AgendaTopicContextualMenu.topicItemGridRightClick(e,_mode,removeCallback,_meetnginfo);                      
                });           
             }
        }
    };
    
    let removeCallback = function() {
    	AgendaTopicItemsModel.deleteSelectedRows("true",_data);
    };
    
    
    let registerListners = function(){
        let dataGridView = WrapperDataGridView.dataGridView();
        dataGridView.addEventListener('contextmenu', openContextualMenu);
    };
    
    

    let TaskAttachmentsDataGridView={
            build : (model,viewOnly,data,meetnginfo) => { return build(model, viewOnly,data,meetnginfo);}
    };

    return TaskAttachmentsDataGridView;
});

define('DS/ENXMeetingMgmt/View/Form/AgendaViewUtil',
[
	'DS/ENXMeetingMgmt/Utilities/SearchUtil',
	'DS/ENXMeetingMgmt/Controller/MeetingController',
	'DS/ENXMeetingMgmt/Model/MeetingAgendaModel',
	'DS/TreeModel/TreeNodeModel',
	'DS/ENXMeetingMgmt/View/Grid/AgendaTopicItemsDataGridView',
	'DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel',
	'DS/ENXMeetingMgmt/Utilities/AutoDecision',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
function(SearchUtil,MeetingController,MeetingAgendaModel,TreeNodeModel,AgendaTopicItemsDataGridView,AgendaTopicItemsModel,AutoDecision,NLS) {    
		"use strict";
		let _autocompleteModel;
		let AgendaViewUtil = {
				
				launchSpeakerSearch : function(event,_agendaProperties,meetnginfo){
					
					var that = event.dsModel;
					var socket_id = UWA.Utils.getUUID();
					require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
						var searchcom_socket = SearchCom.createSocket({
							socket_id: socket_id
						});
						
						
						var recentTypes = ["Person"];
						var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchSpeaker",false,recentTypes);
						// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
						if(!(widget.data.x3dPlatformId == "OnPremise")){
							var source = ["3dspace"];
							refinementToSnNJSON.source = source;
						}
						
						var precondAndResourceIdIn = SearchUtil.getPrecondForAgendaSpeakerSearch();
						refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
						refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
						//refinementToSnNJSON.resourceid_not_in = UserGroupMemberModel.getMemberIDs();
						if (UWA.is(searchcom_socket)) {
							searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
							searchcom_socket.addListener('Selected_Objects_search', selected_Objects_search.bind(that,_agendaProperties));
							// Dispatch the in context search event
							searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
						} else {
							throw new Error('Socket not initialized');
						}
					});
				},
				agendaActionUpdate : function(agendadata,_agendaProperties,meetnginfo){
					/*// validation for topic
					if(agndaProperties.elements.topic.value.trim() == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.selectAgendaTopicMessage,
						    sticky: false
						});
						return;
					}
					
					// validation for duration
					if(agndaProperties.elements.duration.value == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorAgendaDuration,
						    sticky: false
						});
						return;
					}
					
					 var strMeetingDuration = agndaProperties.elements.duration.value.trim();
					 if (isNaN(strMeetingDuration)) {
						 widget.meetingNotify.handler().addNotif({
								level: 'error',
								message: NLS.errorAgendaDurationNumeric,
							    sticky: false
							});
						 return;
					    } else if (strMeetingDuration > 0 && strMeetingDuration <= 500) {
					    } else {
					    	widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.agendaDurationLimitMessage,
							    sticky: false
							});
					    	return;
					    }
*/
					var jsonData = {};
					var data =[]
					//jsonData.data = data;
					
					
					var topicItemsInfo= [];
					if(agendadata.model.Data){
						topicItemsInfo =  agendadata.model.Data;
						
						agendadata.model.Data.forEach(function(topicItem) {
								var info = {}
								info.id = topicItem.id;
								info.mode = "add";
								if((agendadata.model.RemoveData.indexOf(topicItem.id)) ==-1){
									topicItemsInfo.push(info);
								}
								
						});
					}
					if(_agendaProperties.autoCompleteComponent != undefined){
						if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
							_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
								var info = {}
								info.id = dataElem.options.value;
								info.mode = "add";
								topicItemsInfo.push(info);
							});
						}	
					}
					var notopicToadd = true;
					topicItemsInfo.forEach(function(topicItem) {
						if(topicItem.mode && topicItem.mode == "add"){
							notopicToadd = false;
						}
					});
					
					if(notopicToadd){
						var info = {}
						info.id = meetnginfo.model.id;
						topicItemsInfo.push(info);
					}
					
					/*agendadata.model.RemoveData.forEach(function(topicItem) {
						topicItemsInfo.push(topicItem);
					});*/
					
					topicItemsInfo.forEach(function(topicItem) {
						var info = {};
						info = topicItem
						info.relelements = {};
						info.relelements.topic= _agendaProperties.elements.topic.value;
						if( _agendaProperties.elements.speaker.options.agendaSpeakerUsername){
							info.relelements.responsibility = _agendaProperties.elements.speaker.options.agendaSpeakerUsername;
							info.relelements.responsibileOID = _agendaProperties.elements.speaker.options.speakerId;
						}
						if(agendadata.model.Sequence) {
							info.relelements.sequence = (agendadata.model.Sequence).toString();
						}						
						info.relelements.topicDuration	=  _agendaProperties.elements.duration.value;	
						info.relelements.topicDescription	=  _agendaProperties.elements.description.value;
						data.push(info);
					});
					
					
					/*var topicItemsIds = _agendaProperties.elements.topciItem.options.topciItemId;
					
					if(!agndaProperties.elements.topciItem.value && agndaProperties.elements.topciItem.value==""){
						topicItemsIds =  meetnginfo.model.id;
					}
					
					//var topicItemsValue = agndaProperties.elements.topciItem.value;
					//var topciItemType =  agndaProperties.elements.topciItem.options.topciItemType;
					var topicItems =  agendadata.model.Data;
					
					if(topicItemsIds && topicItemsIds!=""){
						var datael = []
						var splTopicItemsIds = topicItemsIds.split('|');
						for(var i = 0; i < splTopicItemsIds.length; i++) {
							var info = {}
							info.id = splTopicItemsIds[i];
							topicItems.push(info);
						}
						
						//topicItems =  datael;
					}
					
					topicItems.forEach(function(dataElem) {	
						var info = {};
						info = dataElem
						info.relelements = {};
						info.relelements.topic= agndaProperties.elements.topic.value;
						if( agndaProperties.elements.speaker.options.agendaSpeakerUsername){
							info.relelements.responsibility = agndaProperties.elements.speaker.options.agendaSpeakerUsername;
							info.relelements.responsibileOID = agndaProperties.elements.speaker.options.speakerId;
						}
						if(agendadata.model.Sequence) {
							info.relelements.sequence = (agendadata.model.Sequence).toString();
						}						
						info.relelements.topicDuration	=  agndaProperties.elements.duration.value;	
						info.relelements.topicDescription	=  agndaProperties.elements.description.value;
						data.push(info);
					})
					
					
					/*info.id = agendadata.model.id;
					info.relId = agendadata.model.relId;
					info.relelements = {};
					info.relelements.topic= agndaProperties.elements.topic.value;
					if( agndaProperties.elements.speaker.options.agendaSpeakerUsername){
						info.relelements.responsibility = agndaProperties.elements.speaker.options.agendaSpeakerUsername;
						info.relelements.responsibileOID = agndaProperties.elements.speaker.options.speakerId;
					}
					info.relelements.topicDuration	=  agndaProperties.elements.duration.value;	
					data.push(info);
					*/
					var info=meetnginfo;
					var oldDuration=_agendaProperties.elements.durationOld.value;
					MeetingController.updateMeetingAgenda(data,agendadata,meetnginfo).then(
							success => {
								var successMsg = NLS.AgendaupdateSuccessMsg;
								widget.meetingNotify.handler().addNotif({
									level: 'success',
									subtitle: successMsg,
								    sticky: false
								});
								//MeetingAgendaModel.updateRow(success);  
								//widget.meetingEvent.publish('agenda-summary-update-rows',success);
								require(['DS/ENXMeetingMgmt/View/Facets/MeetingAgenda'], function(MeetingAgenda) {
									var displayAgenda = "block";
									if(document.querySelector('#meetingAgendaContainer') != null){
										displayAgenda=  document.getElementById('meetingAgendaContainer').style.display;
									}
									MeetingAgenda.destroy();
									MeetingAgenda.init(info,"false");
									if(document.querySelector('#meetingAgendaContainer') != null){
										document.getElementById('meetingAgendaContainer').style.display = displayAgenda;
									}
								});
								widget.meetingEvent.publish(_agendaProperties.closeEventName);
								var totalDur =parseInt(widget.getValue('SumOfAgendaDuration'));
								totalDur=totalDur-parseInt(oldDuration)+parseInt(success.data[0].relelements.topicDuration);
								widget.setValue("SumOfAgendaDuration", totalDur);
								if(totalDur>info.model.duration){
									widget.meetingNotify.handler().addNotif({
										level: 'warning',
										subtitle: NLS.agendaDurExceedsMeetDurMessage,
									    sticky: false
									});
								}
							},
							failure =>{
								if(failure.error){
									widget.meetingNotify.handler().addNotif({
										level: 'error',
										subtitle: failure.error,
									    sticky: false
									});
								}else{
									widget.meetingNotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.errorRemove,
									    sticky: false
									});
								}
						});
				},
				agendaActionCreate : function(agendadata,_agendaProperties,meetnginfo,e){
					/*// validation for topic
					if(!agndaProperties.elements.topic.value || agndaProperties.elements.topic.value.trim()== ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorTopic,
						    sticky: false
						});
						return;
					}
					
					// validation for duration
					if(!agndaProperties.elements.duration.value || agndaProperties.elements.duration.value.trim() == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorDuration,
						    sticky: false
						});
						return;
					}
					
					 var strMeetingDuration = agndaProperties.elements.duration.value;
					 if (isNaN(strMeetingDuration)) {
						 widget.meetingNotify.handler().addNotif({
								level: 'error',
								message: NLS.errorDurationNumeric,
							    sticky: false
							});
						 return;
					    } else if (strMeetingDuration > 0 && strMeetingDuration <= 500) {
					    } else {
					    	widget.meetingNotify.handler().addNotif({
								level: 'error',
								message: NLS.errorDurationNumberValidation,
							    sticky: false
							});
					    	return;
					    }
					*/
					var jsonData = {};
					var data =[]
					//jsonData.data = data;
					
					var topicItemsInfo= [];
					if(_agendaProperties.autoCompleteComponent != undefined){
						if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
							_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
								topicItemsInfo.push(dataElem.options.value);
							});
						}	
					}
					
					let meetingId = meetnginfo.model.id;
					let autoDecision = _agendaProperties.elements.autoDecision.checkFlag;
					
					let agendaAutoDecision = [];
					
					if(autoDecision) {
						let itemAutoDecision = {};
						itemAutoDecision.topic = _agendaProperties.elements.topic.value;
						itemAutoDecision.topicDescription = _agendaProperties.elements.description.value;
						
						/*
						 * Only items added manually by user are needed for Auto-Decision creation
						 * Cloning the array of related items
						 */
						itemAutoDecision.relatedItem = topicItemsInfo.slice();
						
						agendaAutoDecision.push(itemAutoDecision);
					}
					
					if(topicItemsInfo.length==0){
						topicItemsInfo.push(meetnginfo.model.id);
					}
					
					
					topicItemsInfo.forEach(function(topicItem) {
						var info = {}
						info.id = topicItem;
						info.relelements = {};
						info.relelements.topic= _agendaProperties.elements.topic.value;
						info.relelements.topicDuration	=  _agendaProperties.elements.duration.value;
						info.relelements.topicDescription	=  _agendaProperties.elements.description.value;
						info.relelements.sequence = (meetnginfo.nextSequence).toString();
						if( _agendaProperties.elements.speaker.options.agendaSpeakerUsername){
							info.relelements.responsibility = _agendaProperties.elements.speaker.options.agendaSpeakerUsername;
							info.relelements.responsibileOID = _agendaProperties.elements.speaker.options.speakerId;
						}
						data.push(info);
					});
					
					/*var topicItemsIds = _agendaProperties.elements.topciItem.options.topciItemId;
					//var topicItemsValue = _agendaProperties.elements.topciItem.value;
					//var topciItemType =  _agendaProperties.elements.topciItem.options.topciItemType;
					
					if(!topicItemsIds){
						topicItemsIds =  meetnginfo.model.id;
					}
					if(topicItemsIds){
						var splTopicItemsIds = topicItemsIds.split('|');
						for(var i = 0; i < splTopicItemsIds.length; i++) {
							var info = {}
							info.id = splTopicItemsIds[i];
							info.relelements = {};
							info.relelements.topic= agndaProperties.elements.topic.value;
							info.relelements.topicDuration	=  agndaProperties.elements.duration.value;
							info.relelements.topicDescription	=  agndaProperties.elements.description.value;
							info.relelements.sequence = (meetnginfo.nextSequence).toString();
							if( agndaProperties.elements.speaker.options.agendaSpeakerUsername){
								info.relelements.responsibility = agndaProperties.elements.speaker.options.agendaSpeakerUsername;
								info.relelements.responsibileOID = agndaProperties.elements.speaker.options.speakerId;
							}
							data.push(info);
						}
					}*/
					var info=meetnginfo;
					MeetingController.createMeetingAgenda(data,agendadata,meetnginfo).then(
							success => {
								widget.meetingEvent.publish(_agendaProperties.closeEventName);
								var successMsg = NLS.AgendaCreateSuccessMsg;
								widget.meetingNotify.handler().addNotif({
									level: 'success',
									subtitle: successMsg,
								    sticky: false
								});
					    		MeetingAgendaModel.appendRows(success);  
			
								if(agendaAutoDecision.length > 0) 
									AutoDecision.createAgendaDecision(agendaAutoDecision,meetingId);			
								
								require(['DS/ENXMeetingMgmt/View/Facets/MeetingAgenda'], function(MeetingAgenda) {
									var displayAgenda = "block";
									if(document.querySelector('#meetingAgendaContainer') != null){
										displayAgenda=  document.getElementById('meetingAgendaContainer').style.display;
									}
									MeetingAgenda.destroy();
									MeetingAgenda.init(info,"false");
									if(document.querySelector('#meetingAgendaContainer') != null){
										document.getElementById('meetingAgendaContainer').style.display = displayAgenda;
									}
								});								
								var totalDur =parseInt(widget.getValue('SumOfAgendaDuration'));
								totalDur=totalDur+parseInt(success.data[0].relelements.topicDuration);
								widget.setValue("SumOfAgendaDuration", totalDur);
								if(totalDur>info.model.duration){
									widget.meetingNotify.handler().addNotif({
										level: 'warning',
										subtitle: NLS.agendaDurExceedsMeetDurMessage,
									    sticky: false
									});
								}
							},
							failure =>{
								e.dsModel.disabled = false;
								if(failure.error){
									widget.meetingNotify.handler().addNotif({
										level: 'error',
										subtitle: failure.error,
									    sticky: false
									});
								}else{
									widget.meetingNotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.errorRemove,
									    sticky: false
									});
								}
						});
					
				},
				validateAgenda : function(_agendaProperties){
					var agendaflag = "true";
					// validation for topic
					if(!_agendaProperties.elements.topic.value || _agendaProperties.elements.topic.value.trim()== ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.selectAgendaTopicMessage,
						    sticky: false
						});
						agendaflag = "false";
						return agendaflag;
					}
					
					// validation for duration
					if(!_agendaProperties.elements.duration.value || _agendaProperties.elements.duration.value.trim() == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorAgendaDuration,
						    sticky: false
						});
						agendaflag = "false";
						return agendaflag;
					}
					
					 var strMeetingDuration = _agendaProperties.elements.duration.value;
					 if (isNaN(strMeetingDuration)) {
						 widget.meetingNotify.handler().addNotif({
								level: 'error',
								message: NLS.errorAgendaDurationNumeric,
							    sticky: false
							});
						 agendaflag = "false";
							return agendaflag;
					    } else if (strMeetingDuration > 0 && strMeetingDuration <= 500) {
					    } else {
					    	widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.agendaDurationLimitMessage,
							    sticky: false
							});
					    	agendaflag = "false";
							return agendaflag;
					    }
						return agendaflag;
				},
				renderTopicItemsField : function(_agendaProperties,meetnginfo){

					var topicItemsField = new UWA.Element("div", {
						"id": "topicItemsField",
						"class": "topicItemsField"
					}).inject(_agendaProperties.formFields);
					
			    	var field = {};
			    	field.label = NLS.AgendaAttachments;
			    	var topicItemsHeader = drawLabelInViewMode(topicItemsField, field, "topicItemsHeader");
				
			    	var topicItemsButton=new UWA.Element("div", {
						"class":"topicItemsButton"
			    	}).inject(topicItemsField); 

			    	var addExistingButton=getAddExistingButton(_agendaProperties,meetnginfo);
			    	addExistingButton.inject(topicItemsButton);
			    },
			    
			    drawListOfTopicItems  : function(data, meetnginfo, mode){
					var agendaTopicItemsDiv = new UWA.Element("div", {
						"id": "agendaTopicItemsId",
						"class": "agendaTopicItemsId"
					});
					if(mode == "agendaPreview"){
						var field = {};
						field.label = NLS.AgendaAttachments;
						var attachmentHeader = drawLabelInViewMode(agendaTopicItemsDiv, field, "attachmentHeader");		
					}
					if(data.model.Data && data.model.Data.length > 0){
						AgendaTopicItemsModel.destroy();
						AgendaTopicItemsModel.createModel(data.model.Data);

						let model = AgendaTopicItemsModel.getModel();
						let gridViewDiv= AgendaTopicItemsDataGridView.build(model,mode,data,meetnginfo);
						gridViewDiv.inject(agendaTopicItemsDiv);
					}else{
						if(fieldViewOnly){ //If there are no attachments present, and it's just view mode (i.e. user can't add attachments)
							new UWA.Element("span", {text: NLS.noTopicItemss}).inject(agendaTopicItemsDiv);
						}
					}
					return agendaTopicItemsDiv;
				}
		
		};
		
		var selected_Objects_TopicItems = function(that, result){
			for (var i = 0; i < result.length; i++) {
				var node;
				var tempObject = result[i];
				if(tempObject){
						node = new TreeNodeModel(
								{
									label : tempObject["ds6w:label"],
									value :tempObject.id,
									name  : tempObject["ds6w:identifier"],
									type:tempObject["ds6w:type"],
								});
						if(_autocompleteModel.selectedItems==undefined){
								_autocompleteModel.selectedItems = node;
						}
						else{
								_autocompleteModel.selectedItems.push(node);
						}
						_autocompleteModel._applySelectedItems();
				}		
			}	
		};	
		
		/*let selected_TopicItems_search = function(_agendaProperties,data){
			var results = [];

			if (data  && Array.isArray(data)) {
				var personSelectedArr = data;
				var topicIttemsDisplayId = "";
				var topicIttemsDisplayValue = "";
				var topicIttemsTypes= "";
				var rtSearched = {};
				personSelectedArr.forEach(function (objectInfo) {
					
					//var resultObjects = objectInfo.attributes;
					rtSearched.id= objectInfo.resourceid;
					if(topicIttemsDisplayId == "")
						topicIttemsDisplayId = rtSearched.id;
					else 
						topicIttemsDisplayId = topicIttemsDisplayId+"|"+rtSearched.id;

					rtSearched.type= objectInfo["ds6w:type"];
					if(topicIttemsTypes == "")
						topicIttemsTypes = rtSearched.type;
					else 
						topicIttemsTypes = topicIttemsTypes+"|"+rtSearched.type;
					
					
					rtSearched.identifier= objectInfo["ds6w:identifier"];
					if(topicIttemsDisplayValue == "")
						topicIttemsDisplayValue =rtSearched.identifier;
					else 
						topicIttemsDisplayValue = topicIttemsDisplayValue+"|"+rtSearched.identifier;
					
					results.push(rtSearched);
				});
				_agendaProperties.elements.topciItem.options.topciItemId = topicIttemsDisplayId;
				_agendaProperties.elements.topciItem.value = topicIttemsDisplayValue;
				_agendaProperties.elements.topciItem.options.topciItemType = topicIttemsTypes;
			}
				
		};
*/		
		let drawLabelInViewMode = function(container, field, className){
			if(!className){
				className = "";
			}
			return new UWA.Element("h5", {"class":className, text: field.label}).inject(container);
		};
		let selected_Objects_search = function(_agendaProperties,data){
			if(data[0]["ds6w:type_value"] == "Person"){
				_agendaProperties.elements.speaker.value = data[0]["ds6w:label"].unescapeHTML();
			}
			_agendaProperties.elements.speaker.options.speakerId = data[0].id;
			if(data[0]["ds6w:type"].includes("Person")){
				_agendaProperties.elements.speaker.options.speakerType = data[0]["ds6w:type_value"].unescapeHTML();
			}
			_agendaProperties.elements.speaker.options.agendaSpeakerUsername  = data[0]["ds6w:label"];
		};
		let getAddExistingButton = function(_agendaProperties,meetnginfo){
	    	var temp= UWA.createElement("div", {
				"class": "fonticon fonticon-search",
				"id": "topicItemsSearch",
				"title" : NLS.addExistingTopicItems
			});
	    	temp.addEventListener('click', function(event){
	    			launchTopicItemsSearch(event,_agendaProperties,meetnginfo);
			});
			return temp;
	    };
			
	    let launchTopicItemsSearch = function(event,_agendaProperties,meetnginfo){
			_autocompleteModel=_agendaProperties.autoCompleteComponent;
			//_agendaProperties.attachedTopicItems
			//_agendaProperties.autoCompleteComponent
			var topicItemsIDs=[];
			if(_agendaProperties.attachedTopicItems != undefined){
				topicItemsIDs=JSON.parse(JSON.stringify(_agendaProperties.attachedTopicItems)); 
			}
			if(_agendaProperties.autoCompleteComponent != undefined){
        		if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
        			_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
							if(dataElem.options.value.name == undefined){
								topicItemsIDs.push(dataElem.options.value);
		            		}
								});
					}
        	}
			var that = event.dsModel;
			var socket_id = UWA.Utils.getUUID();
			require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
				var searchcom_socket = SearchCom.createSocket({
					socket_id: socket_id
				});
				
				// Person selected //
				var recentTypes = [""];
				var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchTopicItems",true,recentTypes);
				// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
				if(!(widget.data.x3dPlatformId == "OnPremise")){
					var source = ["3dspace"];
					refinementToSnNJSON.source = source;
			}
				
				var precondAndResourceIdIn ={}
				//refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
				//refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
				refinementToSnNJSON.resourceid_not_in =topicItemsIDs;
				if (UWA.is(searchcom_socket)) {
					searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
					searchcom_socket.addListener('Selected_Objects_search', selected_Objects_TopicItems.bind(that,_agendaProperties));
					// Dispatch the in context search event
					searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
				} else {
					throw new Error('Socket not initialized');
			}
			});
		};
		
		
		let getAttendeesIDs = function(meetnginfo){
			if( meetnginfo.model.Assignees!= undefined){
				var children = meetnginfo.model.Assignees;
				var id=[];
				for(var i=0;i<children.length;i++){
					if(children[i].type == "Group" || children[i].type == "Group Proxy"){
						if(children[i].usergroupmembers != undefined){
						const userGroupMembers=children[i].usergroupmembers.split("\u0007");
						for (var j in userGroupMembers) {
							id.push(userGroupMembers[j]);
						}
						}
					}else{
					id.push(children[i].physicalid);
					}
				}
				return id;
			}
		};
		return AgendaViewUtil;
});


define('DS/ENXMeetingMgmt/View/Form/AgendaView',
[
	'DS/Controls/LineEditor',
	'DS/Controls/Editor',
	'DS/Controls/Button',
	'DS/Controls/Toggle',
	'DS/Controls/ButtonGroup',
	'DS/Controls/ComboBox',
	'DS/Controls/DatePicker',
	'DS/TreeModel/TreeDocument',
	'DS/TreeModel/TreeNodeModel',
	'DS/ENXMeetingMgmt/View/Form/AgendaViewUtil',
	"DS/WUXAutoComplete/AutoComplete",
	'DS/ENXMeetingMgmt/Services/MeetingServices',
	'DS/ENXMeetingMgmt/Utilities/SearchUtil',
	'DS/ENXMeetingMgmt/Utilities/AutoCompleteUtil',
	'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
	'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
	'DS/ENXMeetingMgmt/Utilities/Utils',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
  function (WUXLineEditor, WUXEditor, WUXButton, WUXToggle, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		  TreeDocument, TreeNodeModel, AgendaViewUtil, WUXAutoComplete, MeetingServices, SearchUtil, AutoCompleteUtil, DragAndDrop,DragAndDropManager,Utils,NLS) {    
		"use strict";     
		let labelAttr; 
		var modelForSpeaker;
		var meetingInfoVar;
		let autoCompleteSpeaker; 
	let _agendaProperties={};
		let build = function (agendaModel,container,meetnginfo,mode) {
			meetingInfoVar = meetnginfo;
			if(!showView()){
			
			_agendaProperties={};
			_agendaProperties.currentValue = {};
			destroy(mode);
			var data = {model:agendaModel.model.options.grid};
			if(!data.model){
				data.model = {};
			}
			data.model.RemoveData=[];
			_agendaProperties.elements = {};
			
			_agendaProperties.formBody = new UWA.Element('div', {id: 'InitiateAgendaPropertiesBody',class:'agenda-prop-body'});
			_agendaProperties.formBody.inject(container);
			
			if(mode != "agendaCreate"){
				_agendaProperties.formHeader = new UWA.Element('div', {id: 'InitiateAgendaPropertiesHeader','class':'agenda-prop-header'});
				_agendaProperties.formHeader.inject(_agendaProperties.formBody);
			}
			_agendaProperties.formFields = new UWA.Element('div', {id: 'InitiateAgendaPropertiesContainer',class:'agenda-prop-container'});
			_agendaProperties.formFields.inject(_agendaProperties.formBody);
			
			if(mode != "agendaCreate") {
				_agendaProperties.formFooter = new UWA.Element('div', {id: 'InitiateAgendaPropertiesFooter',class:'agenda-prop-footer'});
				_agendaProperties.formFooter.inject(_agendaProperties.formBody);
			}
			
			_agendaProperties.agendaSpekerField = new UWA.Element('div', {id: 'SearchAgendaSpeakerField', class:"fonticon-chooser-display searchAgendaSpeaker"});
			_agendaProperties.agendaTopicItemField = new UWA.Element('div', {id: 'SearchAgendaTopicItemField', class:"fonticon-chooser-display"});
			
			_agendaProperties.closeEventName = "meeting-agenda-close-click";
			
			var fieldViewOnly = false;
			var fieldRequired = "required";
			//var mettingAgendaFieldViewOnly = false;
			if(mode == "agendaPreview"){
				fieldViewOnly = true;
				fieldRequired = "";
				//mettingAgendaFieldViewOnly = true;
				_agendaProperties.closeEventName = "meeting-agenda-close-click-view-mode";
			} else if(mode == "agendaEditView"){
				_agendaProperties.closeEventName = "meeting-agenda-close-click-edit-mode";
			} else if(mode == "agendaCreate"){
				
			} 
			
			
			// header properties icon //
			var agendaheaderTitle = "";
			if(mode == "agendaCreate"){
				agendaheaderTitle =NLS.CreateAgendaProp;
			}else {
				agendaheaderTitle =NLS.agendaProperties;
			}
			if(mode != "agendaCreate"){
			UWA.createElement('div',{
				"title" : agendaheaderTitle,
				"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-attributes fonticon-display fonticon-color-display",
				styles : {"font-size": "20px","float":"left","color":"#368ec4"},
				events: {
				}
			}).inject(_agendaProperties.formHeader);
			
			var AgendaPropertiesTitleDiv = new UWA.Element("div", {
				"id": "AgendaCreatePropertyId",
				"class": "",
				styles : {"font-size": "20px","float":"left","color":"#368ec4"},
			}).inject(_agendaProperties.formHeader);
			new UWA.Element("h5", {"class":"", text: agendaheaderTitle}).inject(AgendaPropertiesTitleDiv);

			// header action - Close // 
			UWA.createElement('div',{
				"id" : "AgendaPanelClose",
				"title" : NLS.MeetingAgendaCloseTooltip,
				"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
				styles : {"font-size": "20px","float":"right"},
				events: {
					click: function (event) {
						widget.meetingEvent.publish(_agendaProperties.closeEventName);
					}
				}
			}).inject(_agendaProperties.formHeader);
			}
			
			// header action - edit // 
			if(fieldViewOnly && meetnginfo.model.ModifyAccess != "FALSE" ){
				UWA.createElement('div',{
					"id" : "editButtonnId",
					"title" : NLS.Edit,
					"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-pencil fonticon-display fonticon-color-display",
					styles : {"font-size": "20px","float":"right"},
					events: {
		                click: function (event) {
		                	document.querySelector('#InitiateAgendaPropertiesBody').destroy();
		                	build(agendaModel,container,meetnginfo,"agendaEditView");
		            		//AgendaViewUtil.agendaEditSave(data,mode,_agendaProperties);	
		                }
					}
				}).inject(_agendaProperties.formFields);
			}			
			// Agenda topic //
			var topicDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_agendaProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.topic}).inject(topicDiv);
			}else{
				labelAttr = new UWA.Element("h5", {"class":fieldRequired, text: NLS.topic}).inject(topicDiv);
				if(fieldRequired){
					UWA.createElement("div", {
						"class": "required-label-agenda fonticon fonticon-asterisk-alt"
					}).inject(labelAttr);
				}
			}
			if(fieldViewOnly){
				new UWA.Element("span", {text: data.model.Topic}).inject(topicDiv);
				// To pass the form validation we need to set the value for the element when we display read only //
				_agendaProperties.elements.topic = {value:data.model.Topic};
			}else{
				if(!data.model.Topic){
					data.model.Topic = "";
				}
				_agendaProperties.elements.topic = new WUXLineEditor({
					placeholder: NLS.placeholderTopic,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					//requiredFlag: true,     //Removed this as Invalid value icon was shown even without entering data 
					value: data.model.Topic,
					sizeInCharNumber: 45
			    }).inject(topicDiv);
			}
	
			// Agenda Auto Decision checkbox //
			if(mode == "agendaCreate") {
				var autoDeciDiv = new UWA.Element("div", {
					"id": "autoDeciId",
					"class": "autoDecisionCheck"
				}).inject(_agendaProperties.formFields);	
				
				let autoDecisionCheck = new WUXToggle({ type: "checkbox", label: NLS.autoDecision, value: 0 });	
				_agendaProperties.elements.autoDecision = autoDecisionCheck.inject(autoDeciDiv);
			}
				
			// Agenda Description //
			var descDiv = new UWA.Element("div", {
				"id": "descId",
				"class": ""
			}).inject(_agendaProperties.formFields);
			var labelDesc = new UWA.Element("h5", {text: NLS.description}).inject(descDiv);
			
			if(fieldViewOnly){
				new UWA.Element("span", {text: data.model.Description}).inject(descDiv);
				
			}else{
				if(!data.model.Description){
					data.model.Description = "";
				}
				_agendaProperties.elements.description = new WUXEditor({
					placeholder: NLS.placeholderDescription,
					widthInCharNumber: 47,
					nbRows: 5,
					newLineMode: 'enter',
					value: data.model.Description
			    }).inject(descDiv);
			}
			
			/*// Agenda Description //
			var descriptionDiv = new UWA.Element("div", {
					"id": "descriptionId",
					"class": ""
				}).inject(_agendaProperties.formFields);
				new UWA.Element("h5", {"class":"", text: NLS.description}).inject(descriptionDiv);
				new UWA.Element("span", {text: data.model.Description}).inject(descriptionDiv);
				_agendaProperties.elements.description = {value:data.model.Description};
			*/
			
/*			// Agenda Type //
			var typeDiv = new UWA.Element("div", {
					"id": "typeId",
					"class": ""
				}).inject(_agendaProperties.formFields);
				new UWA.Element("h5", {"class":"", text: NLS.type}).inject(typeDiv);
				new UWA.Element("span", {text: "Agenda"}).inject(typeDiv); // type need to take from model
				_agendaProperties.elements.type = {value:"Agenda"};
*/			
			// Agenda Speaker //
				
			var agendaSpeakerDiv = new UWA.Element("div", {
				"id": "agendaSpeakerId",
				"class": ""
			}).inject(_agendaProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.speaker}).inject(agendaSpeakerDiv);
			}else{
				labelAttr = new UWA.Element("h5", {"class":"", text: NLS.speaker}).inject(agendaSpeakerDiv);
				//if(fieldRequired){
					UWA.createElement("div", {
						"class": ""
					}).inject(labelAttr);
				//}
			}
			
			if(data.model.Speaker == undefined){
				data.model.Speaker = "";
			}
			
			var speakerDisplayValue = data.model.responsibility;
			if(!speakerDisplayValue || speakerDisplayValue == ""){
				speakerDisplayValue = data.model.Speaker;
			}
			if(data.model.speakerType){
				if(data.model.speakerType == "Person"){
					speakerDisplayValue = data.model.Speaker;
				}
			}
			_agendaProperties.currentValue.speakerId = data.model.SpeakerPID;
			if(fieldViewOnly){
				new UWA.Element("span", {text: speakerDisplayValue}).inject(agendaSpeakerDiv);
				_agendaProperties.elements.speaker = {value:speakerDisplayValue};
				_agendaProperties.elements.speaker.options = {speakerId:data.model.SpeakerId,speakerType:"Person",agendaSpeakerUsername:data.model.Speaker}
			}else{
				/*_agendaProperties.elements.speaker = new WUXLineEditor({
					placeholder: NLS.searchTaskAssigneePlaceHolder,
					speakerId: data.model.SpeakerId,
					speakerType: "Person",
					agendaSpeakerUsername: data.model.Speaker,
					value: speakerDisplayValue,
					sizeInCharNumber: 25,
					displayClearFieldButtonFlag: true
			    });*/
			
				
				//updateAutocompleteModel(meetnginfo);
				
				modelForSpeaker= new TreeDocument();
					
				
				let acOptions = {
		    		allowFreeInputFlag: false,
		    		//elementsTree: asyncModelForSpeaker(speakerDisplayValue),
		    		elementsTree: modelForSpeaker,
		    		placeholder: NLS.searchAgendaSpeakerPlaceHolder,
		    		multiSearchMode: false,
		    		minLengthBeforeSearch: 3,
		    		keepSearchResultsFlag: false,
		    		//label : speakerDisplayValue,
					//id : data.model.SpeakerId,
					//value : speakerDisplayValue
		    	};
		    	autoCompleteSpeaker = AutoCompleteUtil.drawAutoComplete(acOptions);
		    	if (speakerDisplayValue) {
					let node = new TreeNodeModel({
						label: speakerDisplayValue,
						value: speakerDisplayValue,
						id: data.model.SpeakerId
					});
					modelForSpeaker.addRoot(node);					
		    		autoCompleteSpeaker.options.isSelected = true;
		    		autoCompleteSpeaker.selectedItems = node
		    		
				}
				else {
					autoCompleteSpeaker.elementsTree = asyncModelForSpeaker;
				}
				
				var autocompleteCB = asyncModelForSpeaker;
				autoCompleteSpeaker.addEventListener('change', function(e) {
					if (typeof e.dsModel.elementsTree !='function')
						e.dsModel.elementsTree = autocompleteCB;
				});
				/*autoCompleteSpeaker.addEventListener('focus', function(e) {
					if (typeof e.dsModel.elementsTree !='function')
						e.dsModel.fire('change');
				});*/
				
				/*autoCompleteSpeaker = new WUXAutoComplete(
						{
									//elementsTree : modelForSpeaker,
									elementsTree: asyncModelForSpeaker,
									placeholder: NLS.searchAgendaSpeakerPlaceHolder,
									multiSearchMode: false,
									allowFreeInputFlag: false,
									//customFilterMessage:NLS.AgendaSpeaker_Auto_No_Seach_found,
									minLengthBeforeSearch: 3,
		    						keepSearchResultsFlag: false,
									label : speakerDisplayValue,
									id : data.model.SpeakerId,
									//value : speakerDisplayValue
						});*/
				
				/*if(data.model.Speaker && data.model.Speaker.length>0){
					modelForSpeaker.empty();
					modelForSpeaker.prepareUpdate();
					var nodeForSpeaker = new TreeNodeModel(
							{
								label : speakerDisplayValue,
								value : speakerDisplayValue,
								name  : speakerDisplayValue,
								identifier: speakerDisplayValue,
								type:"Person",
								id: data.model.SpeakerId
							});
					modelForSpeaker.addRoot(nodeForSpeaker);
					modelForSpeaker.pushUpdate();
				}*/

				_agendaProperties.elements.speaker =autoCompleteSpeaker;
				if(data.model.Speaker && data.model.Speaker.length>0){
					_agendaProperties.elements.speaker.options.speakerId = data.model.SpeakerId;
					_agendaProperties.elements.speaker.options.agendaSpeakerUsername = speakerDisplayValue;
				}
				
				_agendaProperties.elements.speaker.inject(_agendaProperties.agendaSpekerField);
				new UWA.Element('div', {html:"&nbsp;"}).inject(_agendaProperties.agendaSpekerField);
				var agendaSpeakerChooser = new WUXButton({icon: {iconName: "search"}});
				agendaSpeakerChooser.inject(_agendaProperties.agendaSpekerField);
			
				agendaSpeakerChooser.getContent().addEventListener('buttonclick', function(){			     
					AgendaViewUtil.launchSpeakerSearch(event,_agendaProperties,meetnginfo);
				});
			_agendaProperties.agendaSpekerField.inject(agendaSpeakerDiv);
			}
				
				
			
			// Agenda Duration //
			var durationDiv = new UWA.Element("div", {
					"id": "durationId",
					"class": ""
				}).inject(_agendaProperties.formFields);
			if(fieldViewOnly){
				new UWA.Element("h5", {"class":"", text: NLS.duration}).inject(durationDiv);
			}else{
				labelAttr = new UWA.Element("h5", {"class":fieldRequired, text: NLS.duration}).inject(durationDiv);
				if(fieldRequired){
					UWA.createElement("div", {
						"class": "required-label-agenda fonticon fonticon-asterisk-alt"
					}).inject(labelAttr);
				}
			}
			if(fieldViewOnly){
				new UWA.Element("span", {text: data.model.Duration}).inject(durationDiv);
				// To pass the form validation we need to set the value for the element when we display read only //
				_agendaProperties.elements.duration = {value:data.model.Duration};
			}else{
				/*if(mode == "agendaCreate") {
					_agendaProperties.elements.duration = new WUXLineEditor({
						placeholder: NLS.placeholderAgendaDuration,
						value: "",
						sizeInCharNumber: 25,
						pattern: '[0-9]+(\.[0-9]+)?'
				    }).inject(durationDiv);
				}
				else {
					_agendaProperties.elements.duration = new WUXLineEditor({
						placeholder: NLS.placeholderAgendaDuration,
						value: data.model.Duration,
						sizeInCharNumber: 25,
						pattern: '[0-9]+(\.[0-9]+)?'
				    }).inject(durationDiv);
				}*/
				if(!data.model.Duration)
					data.model.Duration = "";
				
				_agendaProperties.elements.duration = new WUXLineEditor({
					placeholder: NLS.placeholderAgendaDuration,
					value: data.model.Duration,
					sizeInCharNumber: 25,
					pattern: '([0-4]?\\d{0,2}([.]\\d+)?)|500(.[0]+)?'
			    }).inject(durationDiv);
			}
			_agendaProperties.elements.durationOld={value:data.model.Duration};
			
			
			// Agenda Creation Date //
			if(fieldViewOnly){
			var creationDateDiv = new UWA.Element("div", {
					"id": "createdateId",
					"class": ""
				}).inject(_agendaProperties.formFields);
			new UWA.Element("h5", {"class":"", text: NLS.creationDateDiv}).inject(creationDateDiv);
				new UWA.Element("span", {text:Utils.formatDateTimeString(new Date(data.model.created))}).inject(creationDateDiv);
				_agendaProperties.elements.created = {value:Utils.formatDateTimeString(new Date(data.model.created))};
			}
			// Agenda Owner //
			if(fieldViewOnly){
			var ownerDiv = new UWA.Element("div", {
					"id": "ownerId",
					"class": ""
				}).inject(_agendaProperties.formFields);
				new UWA.Element("h5", {"class":"", text: NLS.owner}).inject(ownerDiv);
				new UWA.Element("span", {text: data.model.owner}).inject(ownerDiv);
				_agendaProperties.elements.owner = {value:data.model.owner};
			}
			// sequence number 
			/*var sequenceDiv = new UWA.Element("div", {
					"id": "sequenceId",
					"class": ""
				}).inject(_agendaProperties.formFields);
				new UWA.Element("h5", {"class":"", text: NLS.sequence}).inject(sequenceDiv);
				
			if(fieldViewOnly || mode == "agendaEditView"){
				new UWA.Element("span", {text: data.model.Sequence}).inject(sequenceDiv);
				_agendaProperties.elements.sequenceNumber = {value:data.model.Sequence};
			} else {
				new UWA.Element("span", {text: meetnginfo.nextSequence}).inject(sequenceDiv);
				_agendaProperties.elements.sequenceNumber = {value:meetnginfo.nextSequence};
			}*/
			
			// Topic Items
			if(mode =="agendaCreate" || mode == "agendaEditView"){
				DragAndDrop.makeDroppable(_agendaProperties.formBody, _ondrop);
				_agendaProperties.autoCompleteComponent  = getAutoComponent(_agendaProperties);
				AgendaViewUtil.renderTopicItemsField(_agendaProperties,meetnginfo);
				_agendaProperties.autoCompleteComponent.inject(_agendaProperties.formFields)
				new UWA.Element('div', {html:"&nbsp;"}).inject(_agendaProperties.formFields);
						}
			renderListOfTopicItems(data, _agendaProperties, meetnginfo, mode);
				
				
			// footer block
			if(!fieldViewOnly && mode != "agendaCreate"){
				_agendaProperties.cancelButton = new UWA.Element('div', 
						{
							id:"cancelButtonId",
							class:"agenda-save-float"
						}).inject(_agendaProperties.formFooter);
					_agendaProperties.elements.cancel = new WUXButton({ label: NLS.cancel, emphasize: "secondary", fontIconSize:"2x" }).inject(_agendaProperties.cancelButton);
					new UWA.Element('div', {html:"&nbsp;"}).inject(_agendaProperties.cancelButton);
					_agendaProperties.elements.cancel.getContent().addEventListener('click', function(){
						widget.meetingEvent.publish('meeting-agenda-close-click-edit-mode');
					});
				}
			
			if(mode =="agendaEditView"){
				_agendaProperties.saveButton = new UWA.Element('div', 
					{
						id:"saveButtonId",
						class:"agenda-save-float"
					}).inject(_agendaProperties.formFooter);
				_agendaProperties.elements.save = new WUXButton({ label: NLS.save, emphasize: "primary",fontIconSize:"2x"}).inject(_agendaProperties.saveButton);
				new UWA.Element('div', {html:"&nbsp;"}).inject(_agendaProperties.saveButton);
				_agendaProperties.elements.save.getContent().addEventListener('click', function(){
					updateSpeakerValue(_agendaProperties);
					if((AgendaViewUtil.validateAgenda(_agendaProperties))== "false"){
	      				  return;
						}
					AgendaViewUtil.agendaActionUpdate(data,_agendaProperties,meetnginfo);	
				});
			}
			/*if(mode =="agendaCreate"){
				var doubleclickcrete = false;
				_agendaProperties.createButton = new UWA.Element('div', 
					{
						id:"createButtonId",
						class:"agenda-save-float"
					}).inject(_agendaProperties.formFooter);
				_agendaProperties.elements.create = new WUXButton({ label: NLS.CreateAgenda, emphasize: "primary",fontIconSize:"2x" }).inject(_agendaProperties.createButton);
				new UWA.Element('div', {html:"&nbsp;"}).inject(_agendaProperties.createButton);
				_agendaProperties.elements.create.getContent().addEventListener('click', function(){
					updateSpeakerValue(_agendaProperties);
					if((AgendaViewUtil.validateAgenda(_agendaProperties))== "false"){
      				  return;
					}
					if(!doubleclickcrete){
						AgendaViewUtil.agendaActionCreate(data,_agendaProperties,meetnginfo,doubleclickcrete);
						doubleclickcrete = true;
					}
				});
			}*/
		
		return _agendaProperties;	
			
		}
		}
		
		let updateSpeakerValue = function(_agendaProperties){
			
			if(autoCompleteSpeaker.selectedItems!=undefined && autoCompleteSpeaker.selectedItems.options.id){
				
				_agendaProperties.elements.speaker.options.speakerId = autoCompleteSpeaker.selectedItems.options.id;
				_agendaProperties.elements.speaker.options.agendaSpeakerUsername = autoCompleteSpeaker.selectedItems.options.label;
				
			}
			
		}
		
		let asyncModelForSpeaker = function(typeaheadValue) {
			var personRoleArray = {};
			
			let preCondition = SearchUtil.getPrecondForAgendaSpeakerSearch() || "";
			if (preCondition)
				preCondition = preCondition.precond;
			var queryString = "";
			queryString = "(" + typeaheadValue +" AND "+ preCondition+ ")";
			
			var resourceid_input = getAttendeesIDs(meetingInfoVar);
			
			let options = {
				'categoryId': 'agenda-createinmeeting',
				'queryString': queryString,
				'resourceid_input': resourceid_input
			};
			
			return new Promise(function(resolve, reject){			
				AutoCompleteUtil.getAutoCompleteList(options, modelForSpeaker, personRoleArray)
				.then(function(resp){
					modelForSpeaker = resp;
					resolve(modelForSpeaker);
				})
				.catch(function(err){
					console.log("ERROR: "+err);
				});
			});
			
		};
		
		/*let updateAutocompleteModel=function(meetnginfo){
			var personRoleArray = {};
			getListMember(meetnginfo).then(function(resp){
				modelForSpeaker.empty();
				modelForSpeaker.prepareUpdate();
				for (var i = 0; i < resp.length; i++) {
					var identifier = resp[i].identifier;
					if(personRoleArray.hasOwnProperty(identifier)){
						resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
						
					}
					var nodeForSpeaker = new TreeNodeModel(
							{
								label : resp[i].label,
								value : resp[i].value,
								name  : resp[i].name,
								identifier: resp[i].identifier,
								type:resp[i].type,
								id: resp[i].id
							});
					modelForSpeaker.addRoot(nodeForSpeaker);
				}
					modelForSpeaker.pushUpdate();
			});
		};
		let getListMember = function (meetnginfo) {
			var returnedPromise = new Promise(function (resolve, reject) {
				var url = "/search?xrequestedwith=xmlhttprequest";
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
								if (attr.name === 'ds6wg:fullname') personSearched.label = attr['value'];
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
				queryString = "(flattenedtaxonomies:\"types/Person\" AND policycurrent:\"Person.Active\" )";
				var resourceid_input = getAttendeesIDs(meetnginfo);
				var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getPreference("collab-storage").value,"resourceid_in":resourceid_input };
			
				
				inputjson = JSON.stringify(inputjson);

				var options = {};
				options.isfederated = true;
				MeetingServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
			});

			return returnedPromise;
		};*/
		
		let getAttendeesIDs = function(meetnginfo){
			if( meetnginfo.model.Assignees!= undefined){
				var children = meetnginfo.model.Assignees;
				var id=[];
				for(var i=0;i<children.length;i++){
					if(children[i].type == "Group" || children[i].type == "Group Proxy"){
						if(children[i].usergroupmembers != undefined){
						const userGroupMembers=children[i].usergroupmembers.split("\u0007");
						for (var j in userGroupMembers) {
							id.push(userGroupMembers[j]);
						}
						}
					}else{
					id.push(children[i].physicalid);
					}
				}
				return id;
			}
		};
		
		let hideView= function(){
	        if(document.getElementById('InitiateAgendaPropertiesBody') != null){
	            document.getElementById('InitiateAgendaPropertiesBody').style.display = 'none';
	           
	        }
	    };
	    let showView= function(){
	        if(document.querySelector('#InitiateAgendaPropertiesBody') != null){
	            document.getElementById('InitiateAgendaPropertiesBody').style.display = 'flex';
	            return true;
	        }
	        return false;
	    };
	    
	    let destroy = function(mode){};
	let getAutoComponent=function(_agendaProperties){
		var temp= new WUXAutoComplete({
			multiSearchMode: true,
			elementsTree: function (typedValue) {
				return new Promise(function (resolve, reject) {
					// Simulate an asynchronous server call to retrieve the AutoComplete possible values
					var url = "/search?xrequestedwith=xmlhttprequest";
					var success = function (data) {

						var results = [];

						if (data && data.results && Array.isArray(data.results)) {
							var documentSelectedArr = data.results;
							documentSelectedArr.forEach(function (document) {
								var documentSearched = {};
								var documnentAttrs = document.attributes;
								documnentAttrs.forEach(function (attr) {
									if (attr.name === 'ds6w:what/ds6w:type') documentSearched.type = attr['value'];
									if (attr.name === 'resourceid') documentSearched.value = attr['value'];
									if (attr.name === 'ds6w:label') documentSearched.label = attr['value'];
									if (attr.name === 'ds6w:identifier') documentSearched.name = attr['value'];

								});
								documentSearched.data=documentSearched;
								results.push(documentSearched);
							});
						}

						resolve(results);
					};

					var failure = function (data) {
						reject(data);
					};

					var documentIDs=[];
					if(_agendaProperties.attachedTopicItems != undefined){
						documentIDs=JSON.parse(JSON.stringify(_agendaProperties.attachedTopicItems)); 
					}

					if(_agendaProperties.autoCompleteComponent != undefined){
						if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
							_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
								if(dataElem.options.value.name == undefined){
									documentIDs.push(dataElem.options.value);
								}
							});
						}
					}

					var queryString = "";
					queryString = "(" + typedValue +")" ;

					var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getPreference("collab-storage").value ,"resourceid_not_in":documentIDs };
					inputjson = JSON.stringify(inputjson);

					var options = {};
					options.isfederated = true;
					MeetingServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
				});
			},
			placeholder:NLS.typeToSearch,
			minLengthBeforeSearch:3,
			allowFreeInputFlag: false
		});
		return temp;
	};

	let renderListOfTopicItems = function(data, _agendaProperties, meetnginfo, mode){
		if(data.model.Data && data.model.Data.length > 0){
			let topicItemsDiv = AgendaViewUtil.drawListOfTopicItems(data, meetnginfo, mode);
			topicItemsDiv.inject(_agendaProperties.formFields);
			_agendaProperties.attachedTopicItems=[];
			data.model.Data.forEach(function(topicItems) {
				_agendaProperties.attachedTopicItems.push(topicItems.id);
			});
		}
	};
	let _ondrop = function(e, target){
		target = "Agenda topic";
		DragAndDropManager.onDropTopicItemsManager(e,_agendaProperties,target);
	};
	    
		let AgendaView={
				init : (data,container,meetnginfo,mode) => { return build(data,container,meetnginfo,mode);},
				hideView: () => {hideView();},
				destroy : (mode) => {return destroy(mode);}
		};
		return AgendaView;
	});


define('DS/ENXMeetingMgmt/Config/MeetingAttachmentGridViewConfig', 
		[
			'DS/ENXMeetingMgmt/View/Grid/MeetingGridCustomColumns',
			'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
		], 
		function(MeetingGridViewOnCellRequest,
				NLS) {
			'use strict';
		
			let MeetingAttachmentGridViewConfig=[
			   {
					text: NLS.title,
					dataIndex: 'tree'
		
				},{
					text: NLS.name,
					dataIndex: 'name'
		
				},{
					text: NLS.revision,
					dataIndex: 'revision' 
				},{
					text: NLS.type,
					dataIndex: 'typeNLS' 
				},{
					text: NLS.description,
					typeRepresentation: "editor",
					dataIndex: 'description'
				} ,{
			     	   text: NLS.IDcardMaturityState,
			           dataIndex: 'stateNLS'
				} 
				
				];
		
			return MeetingAttachmentGridViewConfig;
		}
	);

/**
 * datagrid view for Agenda summary page
 */
define('DS/ENXMeetingMgmt/View/Grid/MeetingAttachmentDataGridView',
		[ 
			'DS/ENXMeetingMgmt/Config/MeetingAttachmentGridViewConfig',
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXMeetingMgmt/Config/Toolbar/MeetingAttachmentTabToolbarConfig',
            "DS/ENXMeetingMgmt/Utilities/DragAndDropManager"     
			], function(
					MeetingAttachmentGridViewConfig,
                    WrapperDataGridView,
                    MeetingAttachmentTabToolbarConfig,
					DragAndDropManager 
            	    ) {

	'use strict';	
	let _toolbar, _dataGridInstance, _gridOptions = {};
	let build = function(model){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            'class': "attachments-gridView-View showView nonVisible"
        });
        let toolbar = MeetingAttachmentTabToolbarConfig.writetoolbarDefination(model);
         _gridOptions.cellDragEnabledFlag = true;
		let dataGridViewContainer = WrapperDataGridView.build(model, MeetingAttachmentGridViewConfig, toolbar, gridViewDiv, _gridOptions);
        _toolbar = WrapperDataGridView.dataGridViewToolbar();
		_dataGridInstance = WrapperDataGridView.dataGridView();

		_dataGridInstance.onDragStartCell = function (dragEvent, info) {
			DragAndDropManager.getContentForDrag(dragEvent,info);
            return true;
	    };
	    
	    _dataGridInstance.onDragEndCell = function (e, info){
	    	e.target.removeClassName('wux-ui-state-activated wux-ui-state-highlighted');
	    };

        return dataGridViewContainer;
    };
	

    let getGridViewToolbar = function(){
        return _toolbar;   
    };

    let MeetingAttachmentsDataGridView={
            build : (model) => { return build(model);},            
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return MeetingAttachmentsDataGridView;
});

define('DS/ENXMeetingMgmt/View/Dialog/AgendaDialog', [
  'DS/Windows/Dialog',
  'DS/Windows/ImmersiveFrame',
  'DS/Controls/Button',
  'DS/ENXMeetingMgmt/View/Form/AgendaView',
  'DS/ENXMeetingMgmt/View/Form/AgendaViewUtil',
  'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (
		  WUXDialog,
		  WUXImmersiveFrame,
		  WUXButton,
		  AgendaView,
		  AgendaViewUtil,
		  NLS) {
	'use strict';
	
	let dialog;
	
	let createAgendaDialog = function(data) {
				
		/*let agendaPropPanelViewContainer = new UWA.Element('div', { 
    		id :"Meeting-Agenda-container",
    		styles: {	
				height: '450px',
				'min-width': '500px'
    		}
    	});*/
	
		let agendaContentContainer = new UWA.Element('div',{"id":"agendaContentContainer"});
		
		let meetingInfo = data.meetinginfo;
		
		if(document.querySelector('#InitiateAgendaPropertiesBody'))
			document.querySelector('#InitiateAgendaPropertiesBody').destroy();
			
		let _agendaProperties = AgendaView.init(data,agendaContentContainer,meetingInfo,"agendaCreate");
		
		//agendaPropPanelViewContainer.appendChild(agendaContentContainer);
		
		var immersiveFrame = new WUXImmersiveFrame();
	    immersiveFrame.inject(document.body); 		         
		dialog = new WUXDialog({
			  resizableFlag: true,
              modalFlag: true,
			  width:360,
              height:490,
			  title: NLS.CreateAgendaProp,
              //content: agendaPropPanelViewContainer,
			  content: agendaContentContainer,
              immersiveFrame: immersiveFrame,
			  buttons: {
                Ok: new WUXButton({
                    label: NLS.CreateAgenda,
                    onClick: function (e) {
                        //updateSpeakerValue(_agendaProperties);
						let autoCompleteSpeaker = _agendaProperties.elements.speaker;
						if(autoCompleteSpeaker.selectedItems!=undefined && autoCompleteSpeaker.selectedItems.options.id){
				
							_agendaProperties.elements.speaker.options.speakerId = autoCompleteSpeaker.selectedItems.options.id;
							_agendaProperties.elements.speaker.options.agendaSpeakerUsername = autoCompleteSpeaker.selectedItems.options.label;
							
						}
						
						if((AgendaViewUtil.validateAgenda(_agendaProperties))== "false"){
		      				  return;
						}						
						e.dsModel.disabled = true;
						AgendaViewUtil.agendaActionCreate(data,_agendaProperties,meetingInfo,e);						
                    }
                }),
                Cancel: new WUXButton({
                    onClick: function (e) {
                        widget.meetingEvent.publish('meeting-agenda-close-click');
                    }
                })
            }
		});
		
		widget.meetingEvent.subscribe('meeting-agenda-close-click', function (data) {
			if(dialog!=undefined){
				dialog.visibleFlag = false;
				dialog.destroy();
			}
			if(immersiveFrame!=undefined)
				immersiveFrame.destroy();
      	});
	};

        let AgendaDialog = {
			init: (data) => { return createAgendaDialog(data) }
		};
		
		return AgendaDialog;
	});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Dialog/RemoveAttachment', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
		'DS/ENXMeetingMgmt/Model/MeetingAttachmentModel',
		'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
		'DS/ENXMeetingMgmt/View/Grid/MeetingAttachmentDataGridView',
		'DS/ENXMeetingMgmt/Actions/MeetingActions',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(WAFData, UWACore, EnoviaBootstrap, WUXDialog, WUXImmersiveFrame, WUXButton, ParseJSONUtil, MeetingAttachmentModel, WrapperTileView, WrapperDataGridView, DataGridView, MeetingActions, NLS) {
	'use strict';
	let RemoveAttachment,dialog;
	let removeConfirmation = function(removeDetails){
		if(removeDetails.data === undefined){
			removeDetails = MeetingAttachmentModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorAttachmentRemoveSelection,
			    sticky: false
			});
    		return;
    	}
		// fetch ids here //
		var idsToDelete = [];
		var ulCanDelete = UWA.createElement('ul',{
			"class":"ulCanDelete",
			"styles":{"list-style-type":"circle"}
		  });
		
		for(var i=0;i<removeDetails.data.length;i++){
			idsToDelete.push(removeDetails.data[i].options.grid.physicalId);
			ulCanDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + removeDetails.data[i].options.grid.name
						})
					]
				}));
			
		}
		
		let dialogueContent = new UWA.Element('div',{
    			"id":"removeAttachmentWarning",
    			"class":""
    			});
    	var header = "";
    	if(idsToDelete.length > 0){
    		if(idsToDelete.length == 1){
    			header = NLS.removeAttachmentHeaderSingle
    		}else{
    			header = NLS.removeAttachmentHeader;
    		}
        	header = header.replace("{count}",idsToDelete.length);
        	
        	if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeAttachmentWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeAttachmentWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanDelete));
    	}
    	
        let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body); 

    	var confirmDisabled = false;
    	if(idsToDelete.length < 1){
    		confirmDisabled = true;
    	}
    	dialog = new WUXDialog({
    		   	modalFlag : true,
    		   	width : 500,
    		   	height : 200,
    		   	title: header,
    		   	content: dialogueContent,
    		   	immersiveFrame: immersiveFrame,
    		   	buttons: {
    		   		Ok: new WUXButton({
    		   			label: NLS.Okbutton,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				removeConfirmed(idsToDelete);
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
    };
    
    let removeConfirmed = function(ids){
        var tileView=WrapperTileView.tileView();
		var meetingId = tileView.TreedocModel.meetingId;
    	MeetingActions.DeleteAttachment(meetingId,ids);
    	MeetingAttachmentModel.deleteSelectedRows();
		dialog.close();
	}
    
    RemoveAttachment={
    		removeConfirmation: (removeDetails) => {return removeConfirmation(removeDetails);}
    };
    
    return RemoveAttachment;
});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Menu/AttachmentContextualMenu', [
        'DS/Menu/Menu',
        'DS/ENXMeetingMgmt/Actions/MeetingActions',
        'DS/ENXMeetingMgmt/View/Dialog/RemoveAttachment',
        'DS/ENXMeetingMgmt/Model/MeetingAttachmentModel',
        'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
        'DS/ENXMeetingMgmt/View/Menu/MeetingOpenWithMenu',
        'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
        'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
    function(WUXMenu, MeetingActions,RemoveAttachment, MeetingAttachmentModel, EnoviaBootstrap, MeetingOpenWithMenu, NLS){
        'use strict';
        let Menu;
       
        let attachmentGridRightClick = function(event,data){
			// To handle multiple selection //
        	// This will avoid unselecting the selected rows when click on actions //
        	event.preventDefault();
            event.stopPropagation();
			var pos = event.target.getBoundingClientRect();
            var config = {
            		position: {
            			x: pos.left,
                        y: pos.top + 20
                    }
            };
            var selectedDetails = MeetingAttachmentModel.getSelectedRowsModel();
            var menu = [];
        	menu = menu.concat(deleteMenu(selectedDetails,false));
        	WUXMenu.show(menu, config);
        	if(selectedDetails.data && selectedDetails.data.length == 1){
        		var contextOpenWithData = {};
        		contextOpenWithData.Id = selectedDetails.data[0].options.grid.physicalId;
        		contextOpenWithData.Type = selectedDetails.data[0].options.grid.type;
        		contextOpenWithData.Title = selectedDetails.data[0].options.grid.title;
        		getOpenWithMenu(contextOpenWithData).then(function(openWithMenu){
        			menu = menu.concat(openWithMenu);
        			WUXMenu.show(menu, config);
                	});
        	}else{
        		WUXMenu.show(menu, config);
        	}
		};

		let getOpenWithMenu = function(data){
        	let menu = [];
        	return new Promise(function(resolve, reject) {
        		MeetingOpenWithMenu.getOpenWithMenu(data).then(				
        				success => {
        					if(success && success.length > 0){
        						menu.push({
            						id:"OpenWith",
            						'type': 'PushItem',
            						'title': NLS.openWith,
            						icon: "export",
            						submenu:success
            					});
        					}
        					resolve(menu);  
        				},
        				failure =>{
        					resolve(menu);
        				});
        	});	
        };
        
        let deleteMenu = function(removeDetails,actionFromIdCard){
			// Display menu
			let showDeleteCmd =true;
			var menu = [];
			if(showDeleteCmd){
				 menu.push({
		                name: NLS.Remove,
		                title: NLS.Remove,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                      RemoveAttachment.removeConfirmation(removeDetails,actionFromIdCard);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
		 let createAttachmentGridRightClick = function(event,data){
	            // To handle multiple selection //
	            // This will avoid unselecting the selected rows when click on actions //
	            event.preventDefault();
	            event.stopPropagation();
	            var pos = event.target.getBoundingClientRect();
	            var config = {
	                    position: {
	                        x: pos.left,
	                        y: pos.top + 20
	                    }
	            };
	            var menu = [];
	            menu = menu.concat(deleteMenuForAttachment());
	            WUXMenu.show(menu, config);
	        };
	       
	        let deleteMenuForAttachment = function(){
	            // Display menu
	            var menu = [];
	            menu.push({
	                name: NLS.Remove,
	                title: NLS.Remove,
	                type: 'PushItem',
	                fonticon: {
	                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
	                },
	                data: null,
	                action: {
	                    callback: function () {
	                        require(['DS/ENXMeetingMgmt/View/Facets/CreateMeetingAttachments'], function (CreateMeetingAttachments) {
	                        	CreateMeetingAttachments.removeAttachments();
	                        });
	                    }
	                }
	            });
	            return menu;
	        };
	        
        
        Menu={
            attachmentGridRightClick: (event,data) => {return attachmentGridRightClick(event,data);},
            createAttachmentGridRightClick :(event,data) => {return createAttachmentGridRightClick(event,data);}
        };
        
        return Menu;
    });


/* global define, widget */
/**
 * @overview Meetings
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/Services/LifeCycleServices', [
	'DS/ENXMeetingMgmt/Utilities/Utils',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
	], 
	function(Utils, NLS) {
	'use strict';
	let lifeCycle = function(meetingDetails,reqType){
    	require(['DS/LifecycleCmd/MaturityCmd'], function (MaturityCmd) {
    		var arrOfPhysicalIds = [];
    		var meetingId = meetingDetails.id;
    		arrOfPhysicalIds.push({ 'physicalid': meetingId });
    		
    		var maturityCmd = new MaturityCmd();
    		maturityCmd.executeAsync(arrOfPhysicalIds).then(function () {
    			// maturityCmd - object has all the info we get from life cycle. To get status : maturityCmd.maturityWidget.model.objects["583982563644000060336658000B3734"].current; //
    			// On State update, refresh id card, route summary data and tile views //
    			Utils.getMeetingDataUpdated(meetingId);
    			
    			});
			});
    };
	let LifeCycleServices={
			lifeCycle: (meetingDetails,reqType) => {return lifeCycle(meetingDetails,reqType);}
    };
    
    return LifeCycleServices;
});

define(
        'DS/ENXMeetingMgmt/Actions/AttachmentActions',
        [
         'UWA/Drivers/Alone',
         'UWA/Core',
         'DS/WAFData/WAFData',
         'UWA/Utils',
         'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
         'DS/ENXMeetingMgmt/Controller/MeetingController',
         'DS/ENXMeetingMgmt/Model/MeetingAttachmentModel',
         'DS/ENXMeetingMgmt/Utilities/SearchUtil',
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
         ],
         function(
                 UWA,
                 UWACore,
                 WAFData,
                 UWAUtils,
                 WrapperTileView,
                 MeetingController,
                 MeetingAttachmentModel,
                 SearchUtil,
                 NLS
         ) {

            'use strict';
            let AttachmentActions;
            AttachmentActions={                  
                    onSearchClick: function(){
                    	var data = WrapperTileView.tileView();
                        var searchcom_socket,scopeId;
                        require(['DS/ENXMeetingMgmt/Model/MeetingAttachmentModel'], function(attachmentModel) {
                        	MeetingAttachmentModel = attachmentModel;
                            var socket_id = UWA.Utils.getUUID();
                            var that = this;
                            if (!UWA.is(searchcom_socket)) {
                                require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                                    searchcom_socket = SearchCom.createSocket({
                                        socket_id: socket_id
                                    });	
                                    let allowedTypes = "DOCUMENTS";
                                    var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
    								//var recentTypes = ["type_DOCUMENTS"];
				                    var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addAttachment", true , recentTypes);
				                    refinementToSnNJSON.precond = SearchUtil.getPrecondForAttachmentSearch(recentTypes);
				                    refinementToSnNJSON.resourceid_not_in = MeetingAttachmentModel.getAttachmentIDs();						
				
									if (UWA.is(searchcom_socket)) {
										searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
										searchcom_socket.addListener('Selected_Objects_search', AttachmentActions.selected_Objects_search.bind(that,data));
										//searchcom_socket.addListener('Selected_global_action', that.selected_global_action.bind(that, url));
										// Dispatch the in context search event
										searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
                                    } else {
                                        throw new Error('Socket not initialized');
                                    }
                                });
                            }
                        });

                    },
                   selected_Objects_search : function(that,data){                        
                       MeetingController.addAttachment(that,data).then(function(resp) {
                           var header = "";
                           if(resp.length>0){
                              if(resp.length == 1){
                               header = NLS.successAddExistingAttachmentSingle;
                               }else{
                               header = NLS.successAddExistingAttachment;
                               }
                           }
                            header = header.replace("{count}",resp.length);
                            widget.meetingNotify.handler().addNotif({
                                level: 'success',
                                subtitle: header,
                                sticky: false
                            });
                            
                       MeetingAttachmentModel.appendRows(resp);

                        },
                        function(resp) {
                            if(resp.internalError != undefined && resp.internalError.indexOf("A relationship of this type already exists") != -1){
                            	widget.meetingNotify.handler().addNotif({
                                    level: 'error',
                                    subtitle: NLS.errorAddExistingAttachment,
                                    sticky: true
                                });
                                
                            }else{
                            	widget.meetingNotify.handler().addNotif({
                                    level: 'error',
                                    subtitle: NLS.errorAddExistingAttachment,
                                    sticky: true
                                });
                            }   
                        })
                    }
                    /*,
                    getPrecondForAttachmentSearch: function (attachmentSearchTypes) {
                        //var attachmentSearchTypes = recentTypes.split(",");
                        var precond_taxonomies = "flattenedtaxonomies:(";
                        var types_count = attachmentSearchTypes.length;
                        for(var i=0; i<types_count; i++){
                            var type = attachmentSearchTypes[i];
                            precond_taxonomies += '\"types\/'+type+'\"';
                            if(i < types_count-1){
                                precond_taxonomies += " OR ";
                            }
                            if(i === types_count-1){
                                precond_taxonomies += ")";
                            }
                        }
                        return precond_taxonomies;
                    }
                     */

            
             };
            return AttachmentActions;
        });

/**
 * datagrid view for content (in create route dialog)
 */
define('DS/ENXMeetingMgmt/View/Grid/NewMeetingAttachmentsDataGridView',
        [   
            "DS/ENXMeetingMgmt/Config/NewMeetingAttachmentsViewConfig",
            "DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView",            
            'DS/ENXMeetingMgmt/Config/Toolbar/NewMeetingAttachmentsTabToolbarConfig',
            "DS/ENXMeetingMgmt/Utilities/DragAndDropManager"     
            ], function(
            		NewMeetingAttachmentsViewConfig,
                    WrapperDataGridView,                    
                    NewMeetingAttachmentsTabToolbarConfig,
					DragAndDropManager                     
            ) {

    'use strict';   
    let build = function(model){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer', 
            'class': "iAttachments-gridView-View showView"
        });
        let toolbar = NewMeetingAttachmentsTabToolbarConfig.writetoolbarDefination();
		let _gridOptions = {};
		_gridOptions.cellDragEnabledFlag = true;
        let dataGridViewContainer = WrapperDataGridView.build(model, NewMeetingAttachmentsViewConfig, toolbar, gridViewDiv, _gridOptions);
        //hideSelectedColumns();    
		
		let _dataGridInstance = WrapperDataGridView.dataGridView();

		_dataGridInstance.onDragStartCell = function (dragEvent, info) {
			DragAndDropManager.getContentForDrag(dragEvent,info);
            return true;
	    };
	    
	    _dataGridInstance.onDragEndCell = function (e, info){
	    	e.target.removeClassName('wux-ui-state-activated wux-ui-state-highlighted');
	    };
    
        return dataGridViewContainer;
    };
    

    let getGridViewToolbar = function(){
        return WrapperDataGridView.dataGridViewToolbar();   
    };

    let NewMeetingAttachmentsDataGridView={
            build : (model) => { return build(model);}, 
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return NewMeetingAttachmentsDataGridView;
});

/**
 * datagrid view for route summary page
 */
define('DS/ENXMeetingMgmt/View/Tile/MeetingAttachmentTileView',
        [   
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENXMeetingMgmt/View/Menu/AttachmentContextualMenu',           
            "DS/ENXMeetingMgmt/Utilities/DragAndDropManager"
            ], function(
                    WrapperTileView,
                    AttachmentContextualMenu,
					DragAndDropManager
            ) {

    'use strict';   
    let _model;
    let build = function(model){
        if(model){
            _model = model;
        }else{ //create an empty model otherwise TODO see if it's required
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        var tileViewDiv = UWA.createElement("div", {id:'tileViewContainer',
            'class': "attachments-tileView-View hideView"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv, true);//true passed to enable drag and drop
        registerDragAndDrop();
        return dataTileViewContainer;
    };  
    

  let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                	AttachmentContextualMenu.attachmentGridRightClick(params.data.event,_model);
                }

        }
    };

	let registerDragAndDrop = function(){
    	let _tileView = WrapperTileView.tileView();
    	_tileView.onDragStartCell = function (dragEvent, info) {
			DragAndDropManager.getContentForDrag(dragEvent,info);
	    };

	    _tileView.onDragEndCell = function (e, info){
	    	e.target.removeClassName('wux-ui-state-activated wux-ui-state-highlighted');
	    };
	    _tileView.onDragEnterBlankDefault = function(event) {};
	    _tileView.onDragEnterBlank = function(event) {};
    };
    
    let MeetingAttachmentsTileView={
            build : (model) => { return build(model);} ,
            contexualMenuCallback : () =>{return contexualMenuCallback();}

    };

    return MeetingAttachmentsTileView;
});

/**
 * datagrid view for route summary page
 */
define('DS/ENXMeetingMgmt/View/Tile/AgendaTopicItemsTileView',
        [   
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENXMeetingMgmt/View/Menu/AgendaTopicContextualMenu'
            ], function(
                    WrapperTileView,
                    AgendaTopicContextualMenu
            ) {

    'use strict';   
    let _model;
    let build = function(model){
        if(model){
            _model = model;
        }else{ //create an empty model otherwise TODO see if it's required
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        var tileViewDiv = UWA.createElement("div", {id:'tileViewContainer',
            'class': "topicitems-tileView-View showView"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv);
        return dataTileViewContainer;
    };  

    let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                	AgendaTopicContextualMenu.topicItemGridRightClick(params.data.event,_model);
                }

        }
    };


    let AgendaTopicItemsTileView={
            build : (model) => { return build(model);},
            contexualMenuCallback : () =>{return contexualMenuCallback();}

    };

    return AgendaTopicItemsTileView;
});


define('DS/ENXMeetingMgmt/View/Properties/MeetingPropertiesFacet', [
  //'DS/ENXMeetingMgmt/View/Properties/MeetingPropertiesFacetIDCard',
  'DS/ENXMeetingMgmt/View/Facets/MeetingPropertiesTabs',
  'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function ( MeetingPropertiesTabs,NLS) {
	'use strict';
	let  facetsContainer;
	const destroyViews = function(){
		//new MeetingPropertiesFacetIDCard(headerContainer).destroyContainer();
		new MeetingPropertiesTabs(facetsContainer).destroy();
    };
	var MeetingPropertiesFacet = function(rightPanel,mode){
		this.rightPanel = rightPanel;
	  	
		//headerContainer = new UWA.Element('div',{"id":"MeetingPropertiesFacetHeaderContainer","class":"MeetingPropertiesFacet-header-container",styles:{"height":"10%"}});
	  	facetsContainer = new UWA.Element('div',{"id":"MeetingPropertiesFacetFacetsContainer","class":"MeetingPropertiesFacet-facets-container"});
	  	var infoHeaderSecAction = new UWA.Element('div',{"id":"infoHeaderCloseAction","class":"info-close-actions-section"} );		
		// Close action
		UWA.createElement('div',{
			"id" : "meetingViewPanelClose",
			"title" : NLS.MeetingViewCloseTooltip,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	widget.meetingEvent.publish('meeting-info-close-click');
                }
			}
		}).inject(infoHeaderSecAction);		
		facetsContainer.appendChild(infoHeaderSecAction);
	};
	MeetingPropertiesFacet.prototype.init = function(data,mode){	
		destroyViews(); //to destroy any pre-existing views
		new MeetingPropertiesTabs(facetsContainer, data,mode).init();
		this.rightPanel.appendChild(facetsContainer);
	 	//new MeetingPropertiesFacetIDCard(headerContainer).resizeSensor();
	 	// Events //
    };
    MeetingPropertiesFacet.prototype.destroy = function(){
    	//destroy
    	this.rightPanel.destroy();
    };
    
    return MeetingPropertiesFacet;

  });

define('DS/ENXMeetingMgmt/View/Form/CreateMeetingAgenda',
[
	'DS/Controls/LineEditor',
	'DS/Controls/Editor',
	'DS/Controls/Button',
	'DS/Controls/Toggle',
	'DS/Controls/Accordeon',
	'DS/Controls/ButtonGroup',
	'DS/Controls/ComboBox',
	'DS/Controls/DatePicker',
	"DS/WUXAutoComplete/AutoComplete",
	'DS/TreeModel/TreeDocument',
	'DS/TreeModel/TreeNodeModel',
	'DS/ENXMeetingMgmt/Utilities/SearchUtil',
	'DS/ENXMeetingMgmt/Services/MeetingServices',
	'DS/ENXMeetingMgmt/View/Form/AgendaViewUtil',
	'DS/ENXMeetingMgmt/View/Loader/NewMeetingContextChooser',
	'DS/ENXMeetingMgmt/Utilities/AutoCompleteUtil',
	'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
	'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',	
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
],
function (WUXLineEditor, WUXEditor, WUXButton, WUXToggle,WUXAccordeon, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		WUXAutoComplete,TreeDocument, TreeNodeModel,SearchUtil,MeetingServices,AgendaViewUtil, NewMeetingContextChooser,
		AutoCompleteUtil, DragAndDrop,DragAndDropManager,NLS) {    
		"use strict";
		let _agendaProperties = {};
		let labelAttr;
		var modelForSpeaker = new TreeDocument();
		/*let autoCompleteSpeaker = new WUXAutoComplete(
				{
							// Assign the model to autoComplete
							elementsTree : modelForSpeaker,
							placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
							multiSearchMode: false,
							customFilterMessage:NLS.AccessRights_Auto_No_Seach_found
				});*/
		
		let build = function (addChildContainer) {
			modelForSpeaker = new TreeDocument();
			_agendaProperties.formBody = new UWA.Element('div', {id: 'newAgendaPropertiesformBody','class':'new-agenda-prop-body'});
			
			_agendaProperties.formFields = new UWA.Element('div', {id: 'newAgendaPropertiesform','class':''}); 
			_agendaProperties.formFields.inject(_agendaProperties.formBody );
			_agendaProperties.elements = {};
			//create form
			//Topic
			var fieldRequired = "required";
			var topicDiv = new UWA.Element("div", {
				"id": "titleId-",
				"class": ""
				
			}).inject(_agendaProperties.formFields);
		 labelAttr = new UWA.Element("h5", {"class":fieldRequired, text: NLS.topic}).inject(topicDiv);
		if(fieldRequired){
			UWA.createElement("div", {
				"class": "required-label-meetings fonticon fonticon-asterisk-alt"
			}).inject(labelAttr);
		}
		//new UWA.Element('div', {html:"&nbsp;"}).inject(topicDiv);
		_agendaProperties.elements.topic = new WUXLineEditor({
			placeholder: NLS.placeholderTopic,
			//requiredFlag: true,
			pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
			sizeInCharNumber: 35,
			value: "",
	    }).inject(topicDiv);
		_agendaProperties.elements.topic.addEventListener('change', function(e) {
	    	widget.meetingEvent.publish('create-meeting-new-agenda-toggle-dialogbuttons', { properties : _agendaProperties});		 
	    	
	    });

		// Agenda Auto Decision checkbox //
		var autoDeciDiv = new UWA.Element("div", {
			"id": "autoDeciId-",
			"class": "autoDecisionCheck"
		}).inject(_agendaProperties.formFields);	
		
		let autoDecisionCheck = new WUXToggle({ type: "checkbox", label: NLS.autoDecision, value: 0 });	
		_agendaProperties.elements.autoDecision = autoDecisionCheck.inject(autoDeciDiv);
		 		
		//description
		var descDiv = new UWA.Element("div", {
				"id": "descId-",
				"class": ""
			}).inject(_agendaProperties.formFields);
		new UWA.Element("h5", {text: NLS.description }).inject(descDiv);
		_agendaProperties.elements.description = new WUXEditor({
		      placeholder: NLS.placeholderDescription,			      
		      widthInCharNumber: 37,
		      nbRows: 5,
		      newLineMode: 'enter',
		    }).inject(descDiv);
		
			//Speaker
		
		let speakerDiv = UWA.createElement('div', {'class': 'speaker-field'}).inject(_agendaProperties.formFields);
		labelAttr = new UWA.Element("h5", {"class":"", text: NLS.speaker}).inject(speakerDiv);
		//new UWA.Element('div', {html:"&nbsp;"}).inject(speakerDiv);
		let speakerAndSearchDiv = UWA.createElement('div', {'class': 'speaker-field-and-search-button'}).inject(speakerDiv);
		
		//updateAutocompleteModel();
		
    	let acOptions = {
    		allowFreeInputFlag: false,
    		elementsTree: asyncModelForSpeaker,
    		placeholder: NLS.searchAgendaSpeakerPlaceHolder,
    		multiSearchMode: false,
    		minLengthBeforeSearch: 3,
    		keepSearchResultsFlag: false,
    		label : "",
			id : "",
			value : ""
    	};
    	let autoCompleteSpeaker = AutoCompleteUtil.drawAutoComplete(acOptions);
    	autoCompleteSpeaker.addEventListener('change', function(e) {
						modelForSpeaker = new TreeDocument();
					});
		
		/*let autoCompleteSpeaker = new WUXAutoComplete(
		{
									// Assign the model to autoComplete
					//elementsTree : modelForSpeaker,
					elementsTree : asyncModelForSpeaker,
					placeholder: NLS.searchAgendaSpeakerPlaceHolder,
					multiSearchMode: false,
					allowFreeInputFlag: false,
					minLengthBeforeSearch: 3,
					//customFilterMessage:NLS.AgendaSpeaker_Auto_No_Seach_found,
					label : "",
					id : "",
					value : ""
		});*/
		/*_agendaProperties.elements.speaker = new WUXLineEditor({
			placeholder: NLS.searchSpeakerPlaceHolder,
			SpeakerId: "",
			topciItemDisplayValue: "",
			value: "",
			sizeInCharNumber: 30,
			displayClearFieldButtonFlag: true,
			disabled: false
	    }).inject(speakerAndSearchDiv);*/
		_agendaProperties.elements.speaker =autoCompleteSpeaker;
		(_agendaProperties.elements.speaker).inject(speakerAndSearchDiv);
		new UWA.Element('div', {html:"&nbsp;"}).inject(speakerAndSearchDiv);
		var agendaSpeakerChooser = new WUXButton({icon: {iconName: "search"}});
		agendaSpeakerChooser.inject(speakerAndSearchDiv);

		agendaSpeakerChooser.getContent().addEventListener('buttonclick', function(){			     
			launchSpeakerSearch(event,_agendaProperties);
		});
		//autoCompleteSpeaker.inject(_agendaProperties.elements.speaker);
			
			//Duration
	var durationDiv = new UWA.Element("div", {
		"id": "durationId-",
		"class": ""
	}).inject(_agendaProperties.formFields);
	labelAttr = new UWA.Element("h5", {"class":"fieldRequired", text: NLS.durationInMinutes}).inject(durationDiv);
	//new UWA.Element('div', {html:"&nbsp;"}).inject(durationDiv);
	if(fieldRequired){
		UWA.createElement("div", {
			"class": "required-label-meetings fonticon fonticon-asterisk-alt"
		}).inject(labelAttr);
	}
	_agendaProperties.elements.duration = new WUXLineEditor({
		
		placeholder: NLS.placeholderAgendaDuration,
		pattern: '([0-4]?\\d{0,2}([.]\\d+)?)|500(.[0]+)?',
		sizeInCharNumber: 25,
		value: "",
    }).inject(durationDiv);
	_agendaProperties.elements.duration.addEventListener('change', function(e) {
    	widget.meetingEvent.publish('create-meeting-new-agenda-toggle-dialogbuttons', { properties : _agendaProperties});		 
    	
    });
			//Attachments
	//DragAndDrop.makeDroppable(addChildContainer, _ondrop);
	_agendaProperties.autoCompleteComponent  = getAutoComponent(_agendaProperties);
	var _autocompleteModel = _agendaProperties.autoCompleteComponent;
	//AgendaViewUtil.renderTopicItemsField(_agendaProperties);
	//renderTopicItemsField(_agendaProperties);
	
	var topicItemsField = new UWA.Element("div", {
		"id": "topicItemsField",
		"class": "topicItemsField"
	}).inject(_agendaProperties.formFields);
	
	var field = {};
	field.label = NLS.AgendaAttachments;
	var topicItemsHeader = drawLabelInViewMode(topicItemsField, field, "topicItemsHeader");

	var topicItemsButton=new UWA.Element("div", {
		"class":"topicItemsButton"
	}).inject(topicItemsField); 
	var temp= UWA.createElement("div", {
		"class": "fonticon fonticon-search",
		"id": "topicItemsSearch",
		"title" : NLS.addExistingTopicItems
	});
	temp.inject(topicItemsButton);
	temp.addEventListener('click', function(){
			launchTopicItemsSearch(event,_agendaProperties);
	});

	_agendaProperties.autoCompleteComponent.inject(_agendaProperties.formFields)
	new UWA.Element('div', {html:"&nbsp;"}).inject(_agendaProperties.formFields);
	var data = {};
	data.model= {};
	data.model.Data= [];

	//renderListOfTopicItems(data, _agendaProperties, meetnginfo, mode);
	var launchTopicItemsSearch = function(event,_agendaProperties,meetnginfo){
		//_autocompleteModel=_agendaProperties.autoCompleteComponent;
		//_agendaProperties.attachedTopicItems
		//_agendaProperties.autoCompleteComponent
		var topicItemsIDs=[];
		if(_agendaProperties.attachedTopicItems != undefined){
			topicItemsIDs=JSON.parse(JSON.stringify(_agendaProperties.attachedTopicItems)); 
		}
		if(_agendaProperties.autoCompleteComponent != undefined){
    		if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
    			_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
						if(dataElem.options.value.name == undefined){
							topicItemsIDs.push(dataElem.options.value);
	            		}
							});
				}
    	}
		var that = event.dsModel;
		var socket_id = UWA.Utils.getUUID();
		require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
			var searchcom_socket = SearchCom.createSocket({
				socket_id: socket_id
			});
			
			// Person selected //
			var recentTypes = [""];
			var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchTopicItems",true,recentTypes);
			// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
			if(!(widget.data.x3dPlatformId == "OnPremise")){
				var source = ["3dspace"];
				refinementToSnNJSON.source = source;
		}
			
			var precondAndResourceIdIn ={}
			//refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
			//refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
			refinementToSnNJSON.resourceid_not_in =topicItemsIDs;
			if (UWA.is(searchcom_socket)) {
				searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
				searchcom_socket.addListener('Selected_Objects_search', selected_Objects_TopicItems.bind(that,_agendaProperties));
				// Dispatch the in context search event
				searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
			} else {
				throw new Error('Socket not initialized');
		}
		});
	};
	
	   
	
		var selected_Objects_TopicItems = function(_agendaProperties,result){
			for (var i = 0; i < result.length; i++) {
				var node;
				var tempObject = result[i];
				if(tempObject){
						node = new TreeNodeModel(
								{
									label : tempObject["ds6w:label"],
									value :tempObject.id,
									name  : tempObject["ds6w:identifier"],
									type:tempObject["ds6w:type"],
								});
						if(_autocompleteModel.selectedItems==undefined){
								_autocompleteModel.selectedItems = node;
						}
						else{
								_autocompleteModel.selectedItems.push(node);
						}
						_autocompleteModel._applySelectedItems();
				}		
			}	
		};	
		
    	
	
	var launchSpeakerSearch = function(event,_agendaProperties){
		
		var that = event.dsModel;
		var socket_id = UWA.Utils.getUUID();
		require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
			var searchcom_socket = SearchCom.createSocket({
				socket_id: socket_id
			});
			
			var recentTypes = ["Person"];
			var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchSpeaker",false,recentTypes);
			// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
			if(!(widget.data.x3dPlatformId == "OnPremise")){
				var source = ["3dspace"];
				refinementToSnNJSON.source = source;
			}
			
			var precondAndResourceIdIn = SearchUtil.getPrecondForAgendaSpeakerSearch();
			refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
			//refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
			//refinementToSnNJSON.resourceid_not_in = UserGroupMemberModel.getMemberIDs();
			if (UWA.is(searchcom_socket)) {
				searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
				searchcom_socket.addListener('Selected_Objects_search', selected_Objects_search.bind(that,_agendaProperties));
				// Dispatch the in context search event
				searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
			} else {
				throw new Error('Socket not initialized');
			}
		});
	};
	
	var selected_Objects_search= function(agndaProperties,data){
		
		let node ;
		let tempObject = data[0];
		
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

		}
		autoCompleteSpeaker.selectedItems = node;
			

		autoCompleteSpeaker.selectedItems.select();

	};
	return _agendaProperties;	
	};
		
		
	let asyncModelForSpeaker = function(typeaheadValue) {
		var personRoleArray = {};
					
		let preCondition = SearchUtil.getPrecondForAgendaSpeakerSearch() || "";
		if (preCondition)
			preCondition = preCondition.precond;
		var queryString = "";
		queryString = "(" + typeaheadValue +" AND "+ preCondition+ ")";
		
		let options = {
			'categoryId': 'agenda-meetingcreate',
			'queryString': queryString
		};
		
		return new Promise(function(resolve, reject){			
			AutoCompleteUtil.getAutoCompleteList(options, modelForSpeaker, personRoleArray)
			.then(function(resp){
				modelForSpeaker = resp;
				resolve(modelForSpeaker);
			})
			.catch(function(err){
				console.log("ERROR: "+err);
			});
		});
	};
	
	/*let updateAutocompleteModel=function(){
			var personRoleArray = {};
			getListMember().then(function(resp){
				modelForSpeaker.empty();
				modelForSpeaker.prepareUpdate();
				for (var i = 0; i < resp.length; i++) {
					var identifier = resp[i].identifier;
					if(personRoleArray.hasOwnProperty(identifier)){
						resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
						
					}
					var nodeForSpeaker = new TreeNodeModel(
							{
								label : resp[i].label,
								value : resp[i].value,
								name  : resp[i].name,
								identifier: resp[i].identifier,
								type:resp[i].type,
								id: resp[i].id
							});
					modelForSpeaker.addRoot(nodeForSpeaker);
				}
					modelForSpeaker.pushUpdate();
			});
		};*/
		
		
		/*let getListMember = function (options) {
			var optionsSpeakers = options;
			var returnedPromise = new Promise(function (resolve, reject) {
				var url = "/search?xrequestedwith=xmlhttprequest";
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
								if (attr.name === 'ds6wg:fullname') personSearched.label = attr['value'];
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
				//queryString = "(flattenedtaxonomies:\"types/Person\" AND policycurrent:\"Person.Active\" )";
				queryString = optionsSpeakers.queryString;
				var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getPreference("collab-storage").value };
				var inputjson = JSON.stringify(inputjson);

				var options = {};
				options.isfederated = true;
				MeetingServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
			});

			return returnedPromise;
		};
		*/
		
		
		
		/*let launchTopicItemsSearchs =function(event,agndaProperties){
			
			var that = event.dsModel;
			var socket_id = UWA.Utils.getUUID();
			require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
				var searchcom_socket = SearchCom.createSocket({
					socket_id: socket_id
				});
				
				var recentTypes = [""];
				var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchTopicItems",true,recentTypes);
				// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
				if(!(widget.data.x3dPlatformId == "OnPremise")){
					var source = ["3dspace"];
					refinementToSnNJSON.source = source;
				}
				
				var precondAndResourceIdIn ={}
				//refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
				//refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
				//refinementToSnNJSON.resourceid_not_in = UserGroupMemberModel.getMemberIDs();
				if (UWA.is(searchcom_socket)) {
					searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
					searchcom_socket.addListener('Selected_Objects_search', selected_TopicItems_search1.bind(that,agndaProperties));
					// Dispatch the in context search event
					searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
				} else {
					throw new Error('Socket not initialized');
				}
			});
		};
		*/
		/*let selected_TopicItems_search1 = function(agndaProperties,data){
			var results = [];

			if (data  && Array.isArray(data)) {
				var personSelectedArr = data;
				var topicIttemsDisplayId = "";
				var topicIttemsDisplayValue = "";
				var topicIttemsTypes= "";
				var rtSearched = {};
				personSelectedArr.forEach(function (objectInfo) {
					
					//var resultObjects = objectInfo.attributes;
					rtSearched.id= objectInfo.resourceid;
					if(topicIttemsDisplayId == "")
						topicIttemsDisplayId = rtSearched.id;
					else 
						topicIttemsDisplayId = topicIttemsDisplayId+"|"+rtSearched.id;

					rtSearched.identifier= objectInfo["ds6w:identifier"];
					if(topicIttemsDisplayValue == "")
						topicIttemsDisplayValue =rtSearched.identifier;
					else 
						topicIttemsDisplayValue = topicIttemsDisplayValue+"|"+rtSearched.identifier;
					
					results.push(rtSearched.id);
				});
				agndaProperties.elements.topciItem.options.topciItemId = results;
				agndaProperties.elements.topciItem.value = topicIttemsDisplayValue;
			}
				
		};
*/		
		
		/*var launchTopicItemsSearch = function(event,_agendaProperties,meetnginfo){
			//_autocompleteModel=_agendaProperties.autoCompleteComponent;
			//_agendaProperties.attachedTopicItems
			//_agendaProperties.autoCompleteComponent
			var topicItemsIDs=[];
			if(_agendaProperties.attachedTopicItems != undefined){
				topicItemsIDs=JSON.parse(JSON.stringify(_agendaProperties.attachedTopicItems)); 
			}
			if(_agendaProperties.autoCompleteComponent != undefined){
        		if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
        			_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
							if(dataElem.options.value.name == undefined){
								topicItemsIDs.push(dataElem.options.value);
		            		}
								});
					}
        	}
			var that = event.dsModel;
			var socket_id = UWA.Utils.getUUID();
			require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
				var searchcom_socket = SearchCom.createSocket({
					socket_id: socket_id
				});
				
				// Person selected //
				var recentTypes = [""];
				var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchTopicItems",true,recentTypes);
				// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
				if(!(widget.data.x3dPlatformId == "OnPremise")){
					var source = ["3dspace"];
					refinementToSnNJSON.source = source;
			}
				
				var precondAndResourceIdIn ={}
				//refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
				//refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
				refinementToSnNJSON.resourceid_not_in =topicItemsIDs;
				if (UWA.is(searchcom_socket)) {
					searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
					searchcom_socket.addListener('Selected_Objects_search', selected_Objects_TopicItems.bind(that,_agendaProperties));
					// Dispatch the in context search event
					searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
				} else {
					throw new Error('Socket not initialized');
			}
			});
		};
		*/
		
		/*var renderTopicItemsField = function(_agendaProperties,meetnginfo){

			var topicItemsField = new UWA.Element("div", {
				"id": "topicItemsField",
				"class": "topicItemsField"
			}).inject(_agendaProperties.formFields);
			
	    	var field = {};
	    	field.label = NLS.AgendaAttachments;
	    	var topicItemsHeader = drawLabelInViewMode(topicItemsField, field, "topicItemsHeader");
		
	    	var topicItemsButton=new UWA.Element("div", {
				"class":"topicItemsButton"
	    	}).inject(topicItemsField); 
	    	var temp= UWA.createElement("div", {
				"class": "fonticon fonticon-search",
				"id": "topicItemsSearch",
				"title" : NLS.addExistingTopicItems
			});
	    	temp.inject(topicItemsButton);
	    	temp.addEventListener('click', function(){
	    			launchTopicItemsSearch(event,_agendaProperties,meetnginfo);
			});
		}
*/
		let drawLabelInViewMode = function(container, field, className){
			if(!className){
				className = "";
			}
			return new UWA.Element("h5", {"class":className, text: field.label}).inject(container);
		};

		let getAutoComponent=function(_agendaProperties){
	    	var temp= new WUXAutoComplete({
			    multiSearchMode: true,
			    elementsTree: function (typedValue) {
					return new Promise(function (resolve, reject) {
						// Simulate an asynchronous server call to retrieve the AutoComplete possible values
							var url = "/search?xrequestedwith=xmlhttprequest";
							var success = function (data) {

								var results = [];

								if (data && data.results && Array.isArray(data.results)) {
									var documentSelectedArr = data.results;
									documentSelectedArr.forEach(function (document) {
										var documentSearched = {};
										var documnentAttrs = document.attributes;
										documnentAttrs.forEach(function (attr) {
											if (attr.name === 'ds6w:what/ds6w:type') documentSearched.type = attr['value'];
											if (attr.name === 'resourceid') documentSearched.value = attr['value'];
											if (attr.name === 'ds6w:label') documentSearched.label = attr['value'];
											if (attr.name === 'ds6w:identifier') documentSearched.name = attr['value'];
											
										});
										documentSearched.data=documentSearched;
										results.push(documentSearched);
									});
								}
								
								resolve(results);
							};

							var failure = function (data) {
								reject(data);
							};
							
							var documentIDs=[];
							if(_agendaProperties.attachedTopicItems != undefined){
								documentIDs=JSON.parse(JSON.stringify(_agendaProperties.attachedTopicItems)); 
							}
							
							if(_agendaProperties.autoCompleteComponent != undefined){
			            		if(_agendaProperties.autoCompleteComponent.selectedItems !=undefined && _agendaProperties.autoCompleteComponent.selectedItems.length !=0){
			            			_agendaProperties.autoCompleteComponent.selectedItems.forEach(function(dataElem) {
					            		if(dataElem.options.value.name == undefined){
					            			documentIDs.push(dataElem.options.value);
					            		}
					            	  });
									}
			            		}
							
							var queryString = "";
							queryString = "(" + typedValue + " AND NOT (flattenedtaxonomies:\"types/Person\" OR flattenedtaxonomies:\"types/Business Role\" OR flattenedtaxonomies:\"types/Security Context\" OR flattenedtaxonomies:\"types/Route\" OR flattenedtaxonomies:\"types/Route Template\" OR flattenedtaxonomies:\"types/Inbox Task\"))" ;
							
							var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getPreference("collab-storage").value ,"resourceid_not_in":documentIDs };
							inputjson = JSON.stringify(inputjson);

							var options = {};
							options.isfederated = true;
							MeetingServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
					});
			    },
				placeholder:NLS.typeToSearch,
				minLengthBeforeSearch:3,
				allowFreeInputFlag: false
			    });
	    	return temp;
	    };
	    
	    /*let renderListOfTopicItems = function(data, _agendaProperties, meetnginfo, mode){
			if(data.model.Data && data.model.Data.length > 0){
				let topicItemsDiv = AgendaViewUtil.drawListOfTopicItems(data, meetnginfo, mode);
				topicItemsDiv.inject(_agendaProperties.formFields);
				_agendaProperties.attachedTopicItems=[];
				data.model.Data.forEach(function(topicItems) {
					_agendaProperties.attachedTopicItems.push(topicItems.id);
				});
			}
		};*/
		/*let _ondrop = function(e, target){
	    	target = "Agenda topic";
	    	DragAndDropManager.onDropTopicItemsManager(e,_agendaProperties,target);
		};*/
		/*let startDrop = function(element,agendaPropertiesPerAgenda){
			//DragAndDrop.makeDroppable(element, _ondrop);
		}*/

		
		let getProperties = function(){
		    	return _agendaProperties;
		 };
		    
		 let destroy = function(){
			 _agenda = null;
		 };
		 
		 let CreateMeetingAgenda={
				build : (addChildContainer) => { return build(addChildContainer);},
				destroy : () => {return destroy();},
				getProperties : () => {return getProperties();}
				//startDrop : (element,agendaPropertiesPerAgenda) => {return startDrop(element,agendaPropertiesPerAgenda);}
		 };
		 return CreateMeetingAgenda;
	});

define('DS/ENXMeetingMgmt/View/Facets/CreateMeetingAgendaWrapper',
[
	'DS/Tree/TreeDocument',
	'DS/ENXMeetingMgmt/View/Form/CreateMeetingAgenda',
	'DS/ENXMeetingMgmt/Model/NewMeetingAttachmentsModel',
	'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
	'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
	'DS/Controls/Button',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (TreeDocument,CreateMeetingAgenda,NewMeetingAttachmentsModel,DragAndDrop, DragAndDropManager,WUXButton,NLS) {    
        "use strict";     
        let id, _model;        
        //_model = new TreeDocument();
       let allAgendaProp=[];
       let agendaFormCount = 0;
        let mapAgenda = {};
        let build = function(container){
        	//agenda parent div
        	let addAgendaViewContainer =  UWA.createElement('div', {
				'class':'add-agenda-parent-container',
			}).inject(container);
        	//default agenda  child div
        	addChildContainer();
        	/*let addDefaultChildContainer =  UWA.createElement('div', {
				'class':'add-agenda-child-container',
			}).inject(addAgendaViewContainer);
        	let agenda = CreateMeetingAgenda.build();
        	//allAgendaProp.push(agenda);
        	(agenda.formBody).inject(addDefaultChildContainer);*/
        	//add new agenda button
        	let newAgendaButtonDiv=UWA.createElement('div', {
				'class':'add-agenda-button-container'
				
			}).inject(container);
        	new WUXButton({
                disabled: false,
                emphasize: "primary",
                label: NLS.addAgendaItem,
                onClick: function (e) {
                	addChildContainer();
                	widget.meetingEvent.publish('create-meeting-new-agenda-toggle-dialogbuttons', { properties : allAgendaProp});
                }
            }).inject(newAgendaButtonDiv);
        	widget.meetingEvent.publish('create-meeting-new-agenda-toggle-dialogbuttons', { properties : allAgendaProp});
        };
       
           
        let addChildContainer = function () {
        	let parentContainer = document.querySelector(".add-agenda-parent-container");
        	agendaFormCount=agendaFormCount+1;
        	let addChildContainer =  UWA.createElement('div', {
        		'id' : 'child-agenda-'+ agendaFormCount,
				'class':'add-agenda-child-container'
			}).inject(parentContainer);
        	UWA.createElement('div',{
				"id" : "agendaFormClose",
				"title" : NLS.agendaFormCloseTooltip,
				"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
				styles : {"font-size": "12px","float":"right"},
				events: {
	                click: function (event) {
	                	let temp = [];
	                	let currentDiv = event.target.parentElement;
	                	let id = event.target.parentElement.id;
	                	let n = allAgendaProp.length;
	                	for(let i=0;i<n;i++){
	                		if(id == allAgendaProp[i].id){
	                			continue;
	                		}else {
	                			temp.push(allAgendaProp[i]);
	                		}
	                	}
	                	allAgendaProp = temp;
	                	currentDiv.destroy();
	                	widget.meetingEvent.publish('create-meeting-new-agenda-toggle-dialogbuttons', { properties : allAgendaProp});
		                
	                }
				}
			}).inject(addChildContainer);
        	DragAndDrop.makeDroppable(addChildContainer,_ondrop );
        	let agenda = CreateMeetingAgenda.build(addChildContainer);
        	
        	(agenda.formBody).inject(addChildContainer);
        	
        	//push each agenda info in one common agendaInfo array
        	let childAgendaProp = {};
        	childAgendaProp.id = addChildContainer.id;
        	childAgendaProp.info = agenda.elements;
        	childAgendaProp.info.autoCompleteComponent = agenda.autoCompleteComponent;
        	allAgendaProp.push(childAgendaProp);
        	mapAgenda[addChildContainer.id] = childAgendaProp.info;
        };    
      
        let _ondrop = function(e, target){
	    	
	    	var elementname = target.id;
	    	var target1 = "New Agenda topic";
	    	var _agendaProperties = mapAgenda[elementname];
	    	DragAndDropManager.onDropTopicItemsManager(e,_agendaProperties,target1);
		};
        
        
        
        let getModel = function(){
            return allAgendaProp;
        };
      
        let makeAgendaDroppable = function(element,index){
        	let n = allAgendaProp.length;
        	if(n>index){
        		DragAndDrop.makeDroppable(element, _ondrop,element.id);
        		//CreateMeetingAgenda.startDrop(element,allAgendaProp[index].info.autoCompleteComponent);
        	}
        };
        
        let destroy = function(){
        	allAgendaProp=[]; 
        	agendaFormCount=0;
        };
       
    	
        
        let CreateMeetingAttachments={
                build : (container) => { return build(container);},                       
                destroy: () => {destroy();},
                getModel : () => {return getModel();} ,
               // onSearchClick: () => {return onSearchClick();},
                removeAttachments: () => {return removeAttachments();},    
                makeAgendaDroppable: (element,index) => {return makeAgendaDroppable(element,index);}
        };
        return CreateMeetingAttachments;
    });


define('DS/ENXMeetingMgmt/View/Loader/NewMeetingAgendaLoader',
[
 'DS/ENXMeetingMgmt/View/Facets/CreateMeetingAgendaWrapper',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'

],
function(CreateMeetingAgendaWrapper, NLS) {

    'use strict';
    let _appInstance = {};

    const buildContainer = function(){
        _appInstance.container = new UWA.Element('div', { html: "", id :"CreateMeetingAgendaView", 'class': 'meeting-create-agenda-container'});        
        _appInstance.container.inject(document.querySelector('#iMeetingTabsContainer'));
    };

    let NewMeetingAgendaLoader = {
        init: function(dataJSON){ //,instanceInfo
            if(!this.showView()){               
                buildContainer();
                CreateMeetingAgendaWrapper.build(_appInstance.container);                       
             }
        },
        
        hideView: function(){
            if(document.querySelector('#CreateMeetingAgendaView') && document.querySelector('#CreateMeetingAgendaView').getChildren().length > 0){
                document.getElementById('CreateMeetingAgendaView').style.display  = 'none';               
            }
        },
        
        showView: function(){
            if(document.querySelector('#CreateMeetingAgendaView') && document.querySelector('#CreateMeetingAgendaView').getChildren().length > 0){
                document.getElementById('CreateMeetingAgendaView').style.display = 'block';

                //var agendameetingCreationElement = document.getElementsByClassName('new-agenda-prop-body');
                var agendameetingCreationElement = document.querySelectorAll('[id ^= "child-agenda-"]');
                var n = agendameetingCreationElement.length;
                if(n>0){
	                for(let i=0;i<n;i++){
	                	CreateMeetingAgendaWrapper.makeAgendaDroppable(agendameetingCreationElement[i],i);
	            	}
            	}
                return true;
            }
            return false;
        },
        
        destroy: function() {           
            //destroy form elements
        	_appInstance = {};
        	CreateMeetingAgendaWrapper.destroy();
        },
        getModel : function(){          
            return CreateMeetingAgendaWrapper.getModel();//To do psn16
        }
        
    };
    return NewMeetingAgendaLoader;

});

define('DS/ENXMeetingMgmt/View/Dialog/CreateMeetingDialog', [
  'DS/ENXMeetingMgmt/View/Facets/CreateMeetingTabs',
  'DS/ENXMeetingMgmt/Utilities/Utils',
  'DS/Windows/Dialog',
  'DS/Windows/ImmersiveFrame',
  'DS/ENXMeetingMgmt/Controller/MeetingController',
  'DS/ENXMeetingMgmt/Actions/CreateMeetingActions',
  'DS/ENXMeetingMgmt/View/Facets/CreateMeetingAgendaWrapper',
  'DS/ENXMeetingMgmt/View/Form/MeetingProperties',
  'DS/ENXMeetingMgmt/View/Form/MeetingUtil',
  'DS/Controls/Button',
  'DS/ENXMeetingMgmt/View/Facets/CreateMeetingMembers',
  'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (InitiateMeetingTabs,
		  Utils,
		  WUXDialog,
		  WUXImmersiveFrame,
		  MeetingController,
		  CreateMeetingActions,
		  CreateMeetingAgendaWrapper,
		  MeetingProperties,
		  MeetingUtil,
		  WUXButton,
		  CreateMeetingMembers,
		  NLS) {
	'use strict';
	let tabsContainer, _dialog, _buttonOKEnabled, _buttonApplyEnabled, _defaultJSON = {};	
	
	let InitiateDialog = function (contentData) {  
		//destroy members_properties
		//CreateMeetingMembers.refreshProperties();  	
    	let myContent = new UWA.Element('div', { html: "", id :"initiateMeeting"});
    	tabsContainer = new UWA.Element('div',{"id":"iMeetingTabsContainer","class":"meeting-facets-container"});
    	_defaultJSON = {};
    	
    	new InitiateMeetingTabs(tabsContainer, _defaultJSON).init();
    	tabsContainer.inject(myContent);
    	
    	var immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body); 		         
		_dialog = new WUXDialog({
              title: NLS.newMeeting,
              modalFlag: true,
              width:600,//to accomodate the filters
              height:500,
              content: myContent,
              immersiveFrame: immersiveFrame,
              resizableFlag : true,
              buttons: {
            	  Ok: new WUXButton({
            		  disabled: true,
            		  domId:"okButton",
            		  emphasize: "primary",
            		  label: NLS.schedule,
            		  allowUnsafeHTMLLabel: true,
            		  onClick: function (e) {
            			  let _properties = getPropertiesModel();
            			  let titleLength = Utils.strLength(_properties.elements.title.value);
            			  if(!(MeetingUtil.validateStartDateTime(_properties))){
            				  return;
            			  }
                		  /*if(_properties.elements.contextId == "" || _properties.elements.contextId == undefined){
            				  widget.meetingNotify.handler().addNotif({
        							level: 'error',
        							subtitle: NLS.ContextSelectMessage,
        						    sticky: false
                  			  });
                			  return;
                		  }*/
                		  if(!(MeetingUtil.validateDuration(_properties))){
        						return;
        				  }
                		  //if agenda tab is clicked once then check if all important fields are not empty
                		  let agendaModel = getAgendaModel();
                		  if(agendaModel.length != 0){
                		  if((MeetingUtil.validateAgenda(agendaModel))== "false"){
            				  return;
            			  }
                		  }
                		  
            			  //new Promise(function(resolve, reject){
            			  e.dsModel.label = NLS.buttonProgress;
                		  e.dsModel.disabled = true;
                		  //CreateMeetingActions.createMeeting(getPropertiesModel(), agendaModel, getMembersModel(),getAttachmentsModel()).then(success =>
                		  CreateMeetingActions.createMeeting(getPropertiesModel(), agendaModel, getMembersFromProperties(),getAttachmentsModel()).then(success =>
                		  {
                			                 			  
                			  var message = {
                				  level: 'success',
                				  subtitle: NLS.replace(NLS.successCreate, {
                					  //tag1: success[0].name
                					  tag1: success[0].subject
                				  }),
                				  sticky: false
                			  };               			  
                			 
                		
                			  widget.meetingEvent.publish('meeting-summary-append-rows', success[0]);
                			  widget.meetingEvent.publish('meeting-created', success[0]);
                			  e.dsModel.dialog.close();
                			  widget.meetingEvent.publish('meeting-summary-show-message', {message});
                			 
                			  if(agendaModel.length != 0){
                        		  MeetingUtil.checkMeetingAndAgendaDuration(_properties.elements.duration.value,agendaModel);
                        		  }
                			   
                		  },
                		  failure => {
                			  e.dsModel.label = NLS.schedule;
                    		  e.dsModel.disabled = false;
                    		  if(failure.error.indexOf(NLS.ErrorChooseUsers) != -1){
                    		  //if(failure.error.indexOf("ErrorChooseUsers") != -1){
                    			  widget.meetingNotify.handler().addNotif({
            							level: 'error',
            							subtitle: NLS.UnresolvedTasksError,
            						    sticky: false
            						});   
                    		  } else if(failure && failure.error == "No create Access For Role"){
                    			  //NLS.errorCreateRouteForRole
                    			  widget.meetingNotify.handler().addNotif({
          							level: 'error',
          							title: NLS.errorCreateMeetingForRoleTitle,
									subtitle: NLS.errorCreateMeetingForRoleSubTitle,
          						    sticky: false
          						});                    			  
                    		  } else {
                    		  	  if (failure && failure.statusCode!==500) {
	                    			  widget.meetingNotify.handler().addNotif({
		          							level: 'error',
		          							subtitle: failure.error,
		          						    sticky: false
		          						});   
          						}
                    		  }
                		  });                			  
                		         	   
                      }
            			  
                  }),
                  Apply: new WUXButton({
                	  disabled: true,
                	  emphasize: "secondary",
                	  domId:"applyButton",
                	  label: NLS.saveAsDraft,
                	  allowUnsafeHTMLLabel: true,
                	  onClick: function (e) {
                		  let _properties = getPropertiesModel();
            			  let titleLength = Utils.strLength(_properties.elements.title.value);
            			  if(!(MeetingUtil.validateStartDateTime(_properties))){
            				  return;
            			  }
                		  /*if(_properties.elements.contextId == "" ||_properties.elements.contextId == undefined ){
            				  widget.meetingNotify.handler().addNotif({
        							level: 'error',
        							subtitle: NLS.ContextSelectMessage,
        						    sticky: false
                  			  });
                			  return;
                		  }*/
                		  if(!(MeetingUtil.validateDuration(_properties))){
      							return;
                		  }
                		  //if agenda tab is clicked once then check if all important fields are not empty
                		  let agendaModel = getAgendaModel();
                		  if(agendaModel.length != 0){
                			  if((MeetingUtil.validateAgenda(agendaModel))== "false"){
                				  return;
                			  }
                		  }
                		  e.dsModel.label = NLS.buttonProgress;
                		  e.dsModel.disabled = true;
                		  //CreateMeetingActions.saveAsMeeting(getPropertiesModel(), getAgendaModel(), getMembersModel(),getAttachmentsModel()).then(success =>
                		  CreateMeetingActions.saveAsMeeting(getPropertiesModel(), getAgendaModel(), getMembersFromProperties(),getAttachmentsModel()).then(success =>
                		  {
                			  var message = {
                				  level: 'success',
                				  subtitle: NLS.replace(NLS.successCreate, {
                					  //tag1: success[0].name
                					  tag1: success[0].subject
                				  }),
                				  sticky: false
                			  };
                			 
                			  widget.meetingEvent.publish('meeting-summary-append-rows', success[0]);
                			  //widget.meetingEvent.publish('meeting-created', success[0]);
                			  e.dsModel.dialog.close(); 
                			  widget.meetingEvent.publish('meeting-summary-show-message', {message});
                			  if(agendaModel.length != 0){
                        		  MeetingUtil.checkMeetingAndAgendaDuration(_properties.elements.duration.value,agendaModel);
                        		  }
                			  
                		  },
                		  failure => {
                			  e.dsModel.label = NLS.saveAsDraft;
                    		  e.dsModel.disabled = false;
                    		  
                    		  if(failure && failure.error == "No create Access For Role"){
                    			  //NLS.errorCreateRouteForRole
                    			  widget.meetingNotify.handler().addNotif({
          							level: 'error',
          							title: NLS.errorCreateMeetingForRoleTitle,
									subtitle: NLS.errorCreateMeetingForRoleSubTitle,
          						    sticky: false
          						});                    			  
                    		  } else {
                    		  	  if (failure && failure.statusCode!==500) {
	                    			  widget.meetingNotify.handler().addNotif({
	            							level: 'error',
	            							subtitle: failure.error,
	            						    sticky: false
	                      			  });                    			  
                      			  }
                    		  }
                			  
                		  });  
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
		 });
		registerDialogButtonEvents();

		_dialog.addEventListener("close", function (e) {
			//widget.notify.notifview().removeNotifications();
			if (CreateMeetingMembers) {
				CreateMeetingMembers.refreshProperties();
			}
			new InitiateMeetingTabs(tabsContainer).destroy();
		});
		
		/*_dialog.addEventListener("keydown", function(e) {
			console.log("keydown pressed");
			if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13) {
				if(e.target.nodeName=='INPUT'&&e.target.type=='text') {
					e.preventDefault();
					return false;
				}
			}
		});*/
		
		
		/*_dialog.addEventListener("resize", function (e) {
			//console.log("asdf" + document.getElementsByClassName("create-iRouteContent-help").length);
			if(document.getElementById("InitiateRouteContentView").offsetWidth < 500){//default width of 
				document.getElementsByClassName("create-iRouteContent-help")[0].hide();
				document.getElementsByClassName("create-iRouteContent-toolbar-gridview-group")[0].style.width = "100%";
			} else {
				document.getElementsByClassName("create-iRouteContent-help")[0].show();
				document.getElementsByClassName("create-iRouteContent-toolbar-gridview-group")[0].style.width = "70%";
			}
			//console.log("asdfasdfasdf");
		});*/
    };
	
    let registerDialogButtonEvents = function(){
    	widget.meetingEvent.subscribe('create-meeting-toggle-dialogbuttons', function () {
			let propertiesForm = getPropertiesModel();
			let agendaAllProperties=CreateMeetingAgendaWrapper.getModel();
			if(agendaAllProperties.length == 0){
		    		if(propertiesForm){
		    			var formElements = propertiesForm.formFields.getChildren();
		        		var meetingTitle = propertiesForm.elements.title.value;
		        		var duration = propertiesForm.elements.duration.value;
		        		var contextField = propertiesForm.elements.contextField.value;
		        		
		        		//custom attributes
		        		let customFields = (widget.getValue('customFields')) || null;
						let customFieldsRequiredValuesFlag = true;
						if (customFields && customFields.items && customFields.items.length && customFields.items.length > 0) {
							customFields.items.every((ele, idx) => {
								if (ele.mandatory&&ele.mandatory==true&&customFieldsRequiredValuesFlag==true) {
									if (MeetingUtil.isMultiValueField(ele)) {
										//Multivalue
										let tempVal;
										if (Array.isArray(propertiesForm.elements[ele.name])) {
											//not a selection chip editor, renders with +/- buttons instead
											let isValidMVal = MeetingUtil.validateCustomField(ele, propertiesForm);
											if (!isValidMVal) {
												customFieldsRequiredValuesFlag = false;
												return false;
											}
										}
										else {
											//is a selection chip editor
											tempVal = propertiesForm.elements[ele.name].value;
											
											if (!(tempVal.length&&tempVal.length>0)) {
												customFieldsRequiredValuesFlag = false;
												return false;
											}
										}
										//if (!(propertiesForm.elements[ele.name].length&&propertiesForm.elements[ele.name].length>0)) {
																					
									}									
									else {
										let eleType = MeetingUtil.getViewType(ele);
										if (eleType=='date') {
											let eleDefaultValue = MeetingUtil.getDefaultValue(ele);
											if (!eleDefaultValue&&propertiesForm.elements[ele.name]&&!propertiesForm.elements[ele.name].value) {
												customFieldsRequiredValuesFlag = false;
												return false;
											}
										}
										else if (eleType=='checkbox') {
											return true;
										}
										else {
											if (propertiesForm.elements[ele.name]&&propertiesForm.elements[ele.name].value.trim()=="") {
												customFieldsRequiredValuesFlag = false;
												return false;
											}
										}
									}
								}
								return true;
							});
						}
		        		
		        		//if((meetingTitle.trim() != "" ) && (duration.trim() != "") && (contextField.trim() != "")&&customFieldsRequiredValuesFlag){
		        		if((meetingTitle.trim() != "" ) && (duration.trim() != "") && customFieldsRequiredValuesFlag){
		        			_dialog.buttons.Apply.disabled = false;
		        			_buttonApplyEnabled = true;
		        			_dialog.buttons.Ok.disabled = false;
		        			_buttonOKEnabled = true;
		        		} else{
		        			_dialog.buttons.Apply.disabled = true;
		        			_buttonApplyEnabled = false;
		        			_dialog.buttons.Ok.disabled = true;
		        			_buttonOKEnabled = false;
		        		}        		
		    		}
    		
    		
    		
		    		if(_buttonApplyEnabled && _buttonOKEnabled ){
		    			_dialog.buttons.Ok.disabled = false;
		    		} else {
		    			_dialog.buttons.Ok.disabled = true;
		    		}
			}else{
				widget.meetingEvent.publish('create-meeting-new-agenda-toggle-dialogbuttons');
			}
    	});
    	
    	widget.meetingEvent.subscribe('create-meeting-new-agenda-toggle-dialogbuttons', function () {
			 
    		let propertiesForm = getPropertiesModel();
    		let agendaAllProperties=CreateMeetingAgendaWrapper.getModel();
    		let meetingTitle = propertiesForm.elements.title.value;
    		let duration = propertiesForm.elements.duration.value;
    		let contextField = propertiesForm.elements.contextField.value;
    		
    		//custom attributes
			let customFields = (widget.getValue('customFields')) || null;
			let customFieldsRequiredValuesFlag = true;
			if (customFields && customFields.items && customFields.items.length && customFields.items.length > 0) {
				customFields.items.every((ele, idx) => {
					/*if (ele.mandatory&&ele.mandatory==true&&customFieldsRequiredValuesFlag==true&&propertiesForm.elements[ele.name]&&propertiesForm.elements[ele.name].value.trim()=="") {
						customFieldsRequiredValuesFlag = false;
						return false;
					}*/
					
					if (ele.mandatory&&ele.mandatory==true&&customFieldsRequiredValuesFlag==true) {
						if (MeetingUtil.isMultiValueField(ele)) {
							//Multivalue
							let tempVal;
							if (Array.isArray(propertiesForm.elements[ele.name])) {
								//not a selection chip editor, renders with +/- buttons instead
								let isValidMVal = MeetingUtil.validateCustomField(ele, propertiesForm);
								if (!isValidMVal) {
									customFieldsRequiredValuesFlag = false;
									return false;
								}
							}
							else {
								//is a selection chip editor
								tempVal = propertiesForm.elements[ele.name].value;
								
								if (!(tempVal.length&&tempVal.length>0)) {
									customFieldsRequiredValuesFlag = false;
									return false;
								}
							}
							//if (!(propertiesForm.elements[ele.name].length&&propertiesForm.elements[ele.name].length>0)) {
																		
						}									
						else {
							let eleType = MeetingUtil.getViewType(ele);
							if (eleType=='date') {
								let eleDefaultValue = MeetingUtil.getDefaultValue(ele);
								if (!eleDefaultValue&&propertiesForm.elements[ele.name]&&!propertiesForm.elements[ele.name].value) {
									customFieldsRequiredValuesFlag = false;
									return false;
								}
							}
							else if (eleType=='checkbox') {
								return true;
							}
							else {
								if (propertiesForm.elements[ele.name]&&propertiesForm.elements[ele.name].value.trim()=="") {
									customFieldsRequiredValuesFlag = false;
									return false;
								}
							}
						}
					}
					
					return true;
				});
			}
    		
    		//if((meetingTitle.trim() != "" ) && (duration.trim() != "") && (contextField.trim() != "")&&customFieldsRequiredValuesFlag){
    		if((meetingTitle.trim() != "" ) && (duration.trim() != "") && customFieldsRequiredValuesFlag){
    			if(agendaAllProperties.length != 0){
    				_dialog.buttons.Apply.disabled = false;
    				_buttonApplyEnabled = true;
    				_dialog.buttons.Ok.disabled = false;
    				_buttonOKEnabled = true;
        			for(let prop of agendaAllProperties){
    					let agendaDuration=prop.info.duration.value;
    					let agendaTopic=prop.info.topic.value;
    					//if any mandatory field of agenda properties is not filled, disable the buttons
    					if((agendaTopic.trim() == "" ) || (agendaDuration.trim() == "") ){
    						_dialog.buttons.Apply.disabled = true;
    	        			_buttonApplyEnabled = false;
    	        			_dialog.buttons.Ok.disabled = true;
    	        			_buttonOKEnabled = false;
    						break;
    					}
        			}
    			}else{
    				//if there is no agenda and all mand meeting fields are filled, enable the buttons
    				_dialog.buttons.Apply.disabled = false;
    				_buttonApplyEnabled = true;
    				_dialog.buttons.Ok.disabled = false;
    				_buttonOKEnabled = true;
    				
    			}
    		}else{
    			//if all mandatory fields of meeting is not filled, disable the buttons
    				_dialog.buttons.Apply.disabled = true;
    				_buttonApplyEnabled = false;
    				_dialog.buttons.Ok.disabled = true;
    				_buttonOKEnabled = false;
        		}        		
    		

    		if(_buttonApplyEnabled && _buttonOKEnabled ){
    			_dialog.buttons.Ok.disabled = false;
    		} else {
    			_dialog.buttons.Ok.disabled = true;
    		}
    	});
    	
    };
 
    
    let getPropertiesModel = function(){
    	return MeetingProperties.getProperties();
    	
    }
    let getAgendaModel = function(){
    	return InitiateMeetingTabs.getModel("agenda");
    }
    let getMembersModel = function(){
    	return InitiateMeetingTabs.getModel("members");
    	
    }
    
    let getMembersFromProperties = function() {
    	let props = CreateMeetingMembers.getProperties();
    	//let members;
    	
    	if (props&&props.autoCompleteAttendees) {
    		console.log("update autocomplete------------");
    		if (props.autoCompleteAttendees._model&&props.autoCompleteAttendees.selectedItems) {
    			let mnodes = props.autoCompleteAttendees._model.getSelectedNodes(); //current model selected nodes
	    		let acnodes = props.autoCompleteAttendees.selectedItems; //autocomplete component selected items
	    		if (mnodes && acnodes && acnodes.length>mnodes.length) {
	    			for (let i=0; i<acnodes.length; i++) {
					    let eleExistsInMnodes = mnodes.every((ele) => ele.options.id != acnodes[i].options.id);
					    if (eleExistsInMnodes) {
					    	acnodes[0]._isSelected = true;
					    	mnodes.push(acnodes[i]);
					    }
					}
	    		}
    		}
    		
    		//members = mnodes;
    	}
    	//return members;
    	return (props&&props.autoCompleteAttendees ? props.autoCompleteAttendees._model : getMembersModel());
    }
    let getAttachmentsModel = function(){
    	return InitiateMeetingTabs.getModel("attachments");
    }
    
    let CreateMeetingDialog={    		
    		CreateMeetingDialog: (contentIds) => {return InitiateDialog(contentIds);},
    		registerDialogButtonEvents: () => {return registerDialogButtonEvents();},
    		getDialog: () => {return _dialog;}
    };

    return CreateMeetingDialog;

  });

define('DS/ENXMeetingMgmt/Utilities/PlaceHolder',
        ['DS/Controls/Button',
         'DS/ENXMeetingMgmt/View/Dialog/CreateMeetingDialog',
         'DS/ENXMeetingMgmt/Actions/AttachmentActions',
         'DS/ENXMeetingMgmt/View/Loader/NewMeetingAddAttachmentSearchLoader',
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
        ],
        function(
                WUXButton,
                InitiateMeetingDialog,
                AttachmentActions,
                NewMeetingAddAttachmentSearchLoader,
                NLS
        ) {
        'use strict';
        
        let showEmptyMeetingPlaceholder= function (container,model) {

            let existingPlaceholder = container.getElement('.no-meetings-to-show-container');
            
            container.querySelector(".tile-view-container").setStyle('display', 'none');
            container.querySelector(".data-grid-container").setStyle('display', 'none');
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                widget.meetingEvent.publish('meeting-back-to-summary');
                widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model:model});
                return existingPlaceholder;
            }            
            
            var filterButton = UWA.createElement('span', {
                'class': 'no-meetings-to-show-filter-shortcut fonticon fonticon-list-filter','title':NLS.filter
            }), createButton = UWA.createElement('span', {
                'class': 'no-meetings-to-show-create-shortcut fonticon fonticon-plus','title':NLS.newMeeting
            });
            var placeholder = UWA.createElement('div', {
                'class': 'no-meetings-to-show-container',
                html: [UWA.createElement('div', {
                    'class': 'no-meetings-to-show',
                    html: [UWA.createElement('div', {
                        'class': 'pin',
                        html: '<span class="fonticon fonticon-5x fonticon-meeting"></span>'
                    }), UWA.createElement('span', {
                        'class': 'no-meetings-to-show-label',
                        html: NLS.titles.placeholder.label
                    }), UWA.createElement('div', {
                        'class': 'no-meetings-to-show-sub-container',
                        html: UWA.createElement('span', {
                            html: NLS.replace(NLS.titles.placeholder.sub, {
                                filter: filterButton.outerHTML,
                                create: createButton.outerHTML
                            })
                        })
                    })]
                })]
            });
            

            // The click events
            placeholder.getElement('.no-meetings-to-show-filter-shortcut').addEventListener('click', function () {
                //Contexts.get('application').filter.elements.bar.getItem('Filter').elements.icon.click();
                let doc = document.querySelector(".widget-container");
                doc.getElementsByClassName("wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-list-filter wux-ui-3ds-lg")[0].click();
               
            });
            placeholder.getElement('.no-meetings-to-show-create-shortcut').addEventListener('click', function () {
                InitiateMeetingDialog.CreateMeetingDialog();
            });

            container.appendChild(placeholder);
         // If any other right panel is opened close it //
            widget.meetingEvent.publish('meeting-back-to-summary');
            widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model:model});
        };

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
        let hideEmptyMeetingPlaceholder= function (container) {

            let placeholder = container.getElement('.no-meetings-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            container.querySelector(".tile-view-container").removeAttribute('style');
            container.querySelector(".data-grid-container").removeAttribute('style');
            // No more div
            placeholder.destroy();
            //container.querySelector(".no-meetings-to-show-container").setStyle('display', 'none');

        };
        
        let showEmptyAgendaPlaceholder= function (container, hideNewAgendbautton) {
            let existingPlaceholder = container.getElement('.no-agendas-to-show-container');
            // We hide grid view and tile view is already hidden
            //container.querySelector(".attachments-tileView-View").setStyle('display', 'none');
            container.querySelector(".agendas-gridView-View").setStyle('display', 'none');
            
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-agendas-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";
            var noAgendaFlag = false;
            if("FALSE" == hideNewAgendbautton) {
            	noAgendaFlag = true;
            }
            if(noAgendaFlag){ // need to add check
            	placeholder = UWA.createElement('div', {
            		'class': 'no-agendas-to-show-container',
            		html: [UWA.createElement('div', {
                        'class': 'no-agendas-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-agendas-to-show-label',
                            html: NLS.emptyAgendaLabelwithoutButton
                        })]
                    })]
                });
            
            } else {
            	placeholder = UWA.createElement('div', {
                    'class': 'no-agendas-to-show-container',
                    html: [UWA.createElement('div', {
                        'class': 'no-agendas-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-agendas-to-show-label',
                            html: NLS.emptyAgendaLabel
                        }), UWA.createElement('div', {
                            'class': 'no-agendas-to-show-sub-container',

                            html: new WUXButton({
                                disabled: false,
                                emphasize: "primary",
                                label: NLS.newAgenda,
                                allowUnsafeHTMLLabel: true,
                                onClick: function (e) {
                                	 require(['DS/ENXMeetingMgmt/Actions/MeetingAgendaActions'], function (MeetingAgendaActions) {
                     					MeetingAgendaActions.createAgendaDialog();
                     				});
                                }
                            })
                        })]
                    })]
                });           
            }           
            container.appendChild(placeholder);
        }; 

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
       let hideEmptyAgendaPlaceholder= function (container) {

            let placeholder = container.getElement('.no-agendas-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            //container.querySelector(".attachments-tileView-View").removeAttribute('style');
            container.querySelector(".agendas-gridView-View").removeAttribute('style');
            // No more div
            placeholder.destroy();
            //container.querySelector(".no-agendas-to-show-container").setStyle('display', 'none');

        }; 
        
       let showEmptyAttachmentPlaceholder= function (container, hideAddExistingbutton) {
            let existingPlaceholder = container.getElement('.no-attachments-to-show-container');
            // We hide grid view and tile view is already hidden
            container.querySelector(".attachments-tileView-View").setStyle('display', 'none');
            container.querySelector(".attachments-gridView-View").setStyle('display', 'none');
            
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-attachments-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";
            if(hideAddExistingbutton){
            	placeholder = UWA.createElement('div', {
            		'class': 'no-attachments-to-show-container',
            		html: [UWA.createElement('div', {
                        'class': 'no-attachments-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-attachments-to-show-label',
                            html: NLS.emptyAttachmentLabelwithoutButton
                        })]
                    })]
                });
            
            } else {
            	placeholder = UWA.createElement('div', {
                    'class': 'no-attachments-to-show-container',
                    html: [UWA.createElement('div', {
                        'class': 'no-attachments-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-attachments-to-show-label',
                            html: NLS.emptyAttachmentLabel
                        }), UWA.createElement('div', {
                            'class': 'no-attachments-to-show-sub-container',

                            html: new WUXButton({
                                disabled: false,
                                emphasize: "primary",
                                label: NLS.addExistingAttachmentButton,
                                allowUnsafeHTMLLabel: true,
                                onClick: function (e) {
                                	AttachmentActions.onSearchClick();
                                }
                            })
                        })]
                    })]
                });           
            }           
            container.appendChild(placeholder);
        }; 

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
       let hideEmptyAttachmentPlaceholder= function (container) {

            let placeholder = container.getElement('.no-attachments-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            container.querySelector(".attachments-tileView-View").removeAttribute('style');
            container.querySelector(".attachments-gridView-View").removeAttribute('style');
            // No more div
            //placeholder.destroy();
            container.querySelector(".no-attachments-to-show-container").setStyle('display', 'none');

        };
        
        let showEmptyNewMeetingAttachmentsPlaceholder = function(container){
            let existingPlaceholder = container.getElement('.no-iAttachments-to-show-container');
         // We hide grid view and tile view is already hidden
            container.querySelector(".iAttachments-gridView-View").setStyle('display', 'none');
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-iAttachments-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }

            let placeholder = UWA.createElement('div', {
                'class': 'no-iAttachments-to-show-container',
                html: [UWA.createElement('div', {
                    'class': 'no-iAttachments-to-show',
                    html: [UWA.createElement('span', {
                        'class': 'no-iAttachments-to-show-label',
                        html: NLS.emptyAttachmentLabel
                    }), UWA.createElement('div', {
                        'class': 'no-iAttachments-to-show-sub-container',

                        html: new WUXButton({
                            disabled: false,
                            emphasize: "primary",
                            label: NLS.addExistingAttachmentButton,
                            allowUnsafeHTMLLabel: true,
                            onClick: function (e) {
                            	NewMeetingAddAttachmentSearchLoader.onSearchClick();
                            }
                        })

                    })]
                })]
            });

            container.appendChild(placeholder);
        };
        let hideEmptyNewMeetingAttachmentsPlaceholder= function (container) {

            let placeholder = container.getElement('.no-iAttachments-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }

                      
            container.querySelector(".iAttachments-gridView-View").removeAttribute('style');
            // No more div
            //placeholder.destroy();
            container.querySelector(".no-iAttachments-to-show-container").setStyle('display', 'none');

        };
        
        let showeErrorPlaceholder= function (container) {
        	
            let existingPlaceholder = container.querySelector('.generic-error-container');
            
            if(container.querySelector(".tile-view-container"))
            {
            	container.querySelector(".tile-view-container").setStyle('display', 'none');
            }
            if(container.querySelector(".data-grid-container"))
        	{
            	container.querySelector(".data-grid-container").setStyle('display', 'none');
        	}
            if(container.querySelector("#dataGridDivToolbar"))
        	{
            	container.querySelector("#dataGridDivToolbar").setStyle('display', 'none');
        	}
            
            if (existingPlaceholder !== null) {
            	existingPlaceholder.removeAttribute('style');
                return;
            }
         
            var placeholder = UWA.createElement('div', {
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

        let hideeErrorPlaceholder= function (container) {

            let placeholder = container.getElement('.generic-error-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }

            placeholder.setStyle('display', 'none');

        };
      
        
        let registerListeners = function(){
            widget.meetingEvent.subscribe('show-no-meeting-placeholder', function (data) {
                showEmptyMeetingPlaceholder(document.querySelector(".widget-container"));
            });
            
            widget.meetingEvent.subscribe('hide-no-meeting-placeholder', function (data) {
                hideEmptyMeetingPlaceholder(document.querySelector(".widget-container"));
            });
            
            widget.meetingEvent.subscribe('hide-no-agenda-placeholder', function (data) {
                hideEmptyAgendaPlaceholder(document.querySelector(".meeting-agenda-container"));
             });
             widget.meetingEvent.subscribe('show-no-agenda-placeholder', function (data) {
                 showEmptyAgendaPlaceholder(document.querySelector(".meeting-agenda-container"));
             });
            
            widget.meetingEvent.subscribe('hide-no-attachment-placeholder', function (data) {
               hideEmptyAttachmentPlaceholder(document.querySelector(".meeting-attachments-container"));
            });
            widget.meetingEvent.subscribe('show-no-attachment-placeholder', function (data) {
                showEmptyAttachmentPlaceholder(document.querySelector(".meeting-attachments-container"));
            });
           widget.meetingEvent.subscribe('hide-no-iattachment-placeholder', function (data) {
                //TO DO  
                hideEmptyNewMeetingAttachmentsPlaceholder(document.querySelector(".create-iMeetingAttachments-view"));
  
            });
           widget.meetingEvent.subscribe('show-no-imeeting-placeholder', function (data) {
               //TO DO  
        	   showEmptyNewMeetingAttachmentsPlaceholder(document.querySelector(".create-iMeetingAttachments-view"));
 
           });
          
             widget.meetingEvent.subscribe('show-generic-error-placeholder', function (data) {
            	showeErrorPlaceholder(document.querySelector(".widget-container"));
            });
            
        };
        
        let PlaceHolder = {
                hideEmptyMeetingPlaceholder : (container) => {return hideEmptyMeetingPlaceholder(container);},
                showEmptyMeetingPlaceholder : (container,model) => {return showEmptyMeetingPlaceholder(container,model);},
                hideEmptyAttachmentPlaceholder : (container) => {return hideEmptyAttachmentPlaceholder(container);},
                showEmptyAttachmentPlaceholder : (container, hideAddExistingbutton) => {return showEmptyAttachmentPlaceholder(container, hideAddExistingbutton);},
                hideEmptyAgendaPlaceholder : (container) => {return hideEmptyAgendaPlaceholder(container);},
                showEmptyAgendaPlaceholder : (container, hideNewAgendbautton) => {return showEmptyAgendaPlaceholder(container, hideNewAgendbautton);},
                showEmptyNewMeetingAttachmentsPlaceholder : (container) => {return showEmptyNewMeetingAttachmentsPlaceholder(container);},
                hideEmptyNewMeetingAttachmentsPlaceholder : (container) => {return hideEmptyNewMeetingAttachmentsPlaceholder(container);}, 
                showeErrorPlaceholder : (container) => {return showeErrorPlaceholder(container);},
                hideeErrorPlaceholder : (container) => {return hideeErrorPlaceholder(container);}, 
                registerListeners : () => {return registerListeners();}
        }
        return PlaceHolder;

    });


/**
 * 
 */
define('DS/ENXMeetingMgmt/View/Facets/MeetingAttachment',
        [   'DS/ENXMeetingMgmt/Controller/MeetingController',
        	'DS/ENXMeetingMgmt/Model/MeetingAttachmentModel',
        	'DS/ENXMeetingMgmt/View/Grid/MeetingAttachmentDataGridView',
        	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
        	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
        	'DS/ENXMeetingMgmt/View/Tile/MeetingAttachmentTileView',
        	'DS/ENXMeetingMgmt/Utilities/DataFormatter',
        	'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
        	'DS/ENXMeetingMgmt/Utilities/PlaceHolder',
        	'DS/Core/PointerEvents',
		    'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
		    'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
        	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
            ], function(
            		MeetingController,
            		MeetingAttachmentModel,
            		MeetingAttachmentDataGridView,
            		WrapperDataGridView,
            		WrapperTileView,
            		MeetingAttachmentTileView,
            		DataFormatter,
            	    EnoviaBootstrap,
            		PlaceHolder,
            		PointerEvents,
					DropZone,
					DragAndDropManager, 
            		NLS
            ) {

    'use strict';
    
	//let _ondrop, access;
	let _ondrop;
    let build = function(_meetingInfoModel){
    	 if(!showView()){
    		 let containerDiv = UWA.createElement('div', {id: 'meetingAttachmentsContainer','class':'meeting-attachments-container'}); 
    		 containerDiv.inject(document.querySelector('.meeting-facets-container'));
			 DropZone.makeDroppable(containerDiv, _ondrop);		 
    		 MeetingController.fetchMeetingAttachments(_meetingInfoModel.model.id).then(function(response) {
    			 MeetingAttachmentModel.destroy();
    			 MeetingAttachmentsViewModel(response, _meetingInfoModel.model);
    			 drawMeetingAttachmentsView(containerDiv); 
	         }); 

            //drag and drop initialize to store DecisionReferenceDocuments data
            DragAndDropManager.init(_meetingInfoModel);
    	 }
    };

	_ondrop = function(e, target){
    	//DragAndDropManager.onDropManager(e,access,"View");
		DragAndDropManager.onDropManager(e,"","View");
	}

    let drawMeetingAttachmentsView = function(containerDiv){
        //To add the dataGrid view list
        var model = MeetingAttachmentModel.getModel();
        let datagridDiv = MeetingAttachmentDataGridView.build(model);
        
        let tileViewDiv= MeetingAttachmentTileView.build(model);
        MeetingAttachmentTileView.contexualMenuCallback();
        registerListners();
        
        let attachmentTabToolbar = MeetingAttachmentDataGridView.getGridViewToolbar();
        
        let toolBarContainer = UWA.createElement('div', {id:'dataGridAttachmentDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
        attachmentTabToolbar.inject(toolBarContainer);
        datagridDiv.inject(containerDiv);
        tileViewDiv.inject(containerDiv);
        if (model.getChildren().length ==0 ) {
            PlaceHolder.showEmptyAttachmentPlaceholder(containerDiv);
        }
        PlaceHolder.registerListeners();
        return containerDiv;
    };
    
    let openContextualMenu = function (e, cellInfos) {
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
              if (e.button == 2) {
                  require(['DS/ENXMeetingMgmt/View/Menu/AttachmentContextualMenu'], function (AttachmentContextualMenu) {
                      AttachmentContextualMenu.attachmentGridRightClick(e,cellInfos.nodeModel.options.grid);
                });           
             }
        }  
    };
    
     let onDoubleClick = function (e, cellInfos) {
	 /*	if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.multipleHitCount == 2) {
	    			cellInfos.nodeModel.select(true);
	    			widget.routeMgmtMediator.publish('route-content-preview-click', {model:{"id":cellInfos.nodeModel.options.grid.id}});             
		     }
		}  */
	};
	
	let addorRemoveAttachmentEventListeners = function(){
        /* widget.meetingEvent.subscribe('toolbar-data-updated', function (data) {
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
		}); */
    };
    
   /* let showAttachmentAddButton = function(flag){
		let meetingAttachmentToolbar = MeetingAttachmentDataGridView.getGridViewToolbar();
		let addAttachment = meetingAttachmentToolbar.getNodeModelByID("addAttachment");
        if (addAttachment) {
        	addAttachment.updateOptions({
            visibleFlag: flag
          });
        }
	};
	
	let showAttachmentDeleteButton = function(flag){
		let meetingAttachmentToolbar = MeetingAttachmentDataGridView.getGridViewToolbar();
		let deleteAttachment = meetingAttachmentToolbar.getNodeModelByID("deleteAttachment");
        if (deleteAttachment) {
        	deleteAttachment.updateOptions({
            visibleFlag: flag
          });
        }
	};*/
    
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
    
    let MeetingAttachmentsViewModel = function(serverResponse, meetingModel){      
    	MeetingAttachmentModel.createModel(serverResponse);
    	MeetingAttachmentModel.getModel().meetingId = meetingModel.id;
        MeetingAttachmentModel.getModel().meetingModel = meetingModel;
    };
    
    let hideView= function(){
        if(document.getElementById('meetingAttachmentsContainer') != null){
            document.getElementById('meetingAttachmentsContainer').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#meetingAttachmentsContainer') != null){
            document.getElementById('meetingAttachmentsContainer').style.display = 'block';
			DropZone.makeDroppable(document.getElementById('meetingAttachmentsContainer'), _ondrop); 
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	MeetingAttachmentModel.destroy();
    };
    
    
    let MeetingAttachment = {
            init : (_meetingInfoModel) => { return build(_meetingInfoModel);},
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };
    

    return MeetingAttachment;
});

/**
 * 
 */
define('DS/ENXMeetingMgmt/View/Facets/AgendaTopicItems',
        [   'DS/ENXMeetingMgmt/Controller/MeetingController',
        	'DS/ENXMeetingMgmt/Model/AgendaTopicItemsModel',
        	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
        	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
        	'DS/ENXMeetingMgmt/View/Tile/AgendaTopicItemsTileView',
        	'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
        	'DS/ENXMeetingMgmt/Utilities/PlaceHolder',
        	'DS/Core/PointerEvents',
        	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
            ], function(
            		MeetingController,
            		AgendaTopicItemsModel,
            		WrapperDataGridView,
            		WrapperTileView,
            		AgendaTopicItemsTileView,
            	    EnoviaBootstrap,
            		PlaceHolder,
            		PointerEvents,
            		NLS
            ) {

    'use strict';
    
    let build = function(agendaModel,container,meetnginfo,mode){
    	var agendagriddata = {model:agendaModel.model.options.grid};
    	 if(!showView()){
    		 let containerDiv = UWA.createElement('div', {id: 'agendaTopicItems','class':'agenda-topic-items-container'}); 
    		 containerDiv.inject(container);
    		 if(agendagriddata && agendagriddata.model.Data){
    			 AgendaTopicItemsModel.destroy();
    			 MeetingAttachmentsViewModel(agendagriddata.model.Data,meetnginfo,mode);
    			 drawMeetingAttachmentsView(containerDiv); 

    		 }
    	 }
    };

    let drawMeetingAttachmentsView = function(containerDiv){
        //To add the dataGrid view list
        var model = AgendaTopicItemsModel.getModel();
        
        let tileViewDiv= AgendaTopicItemsTileView.build(model);
        AgendaTopicItemsTileView.contexualMenuCallback();
        registerListners();
        tileViewDiv.inject(containerDiv);
       /* if (model.getChildren().length ==0 ) {
            PlaceHolder.showEmptyAttachmentPlaceholder(containerDiv);
        }
        PlaceHolder.registerListeners();*/
        return containerDiv;
    };
    
    
     let onDoubleClick = function (e, cellInfos) {
	};
	
	let addorRemoveAttachmentEventListeners = function(){
    };
    
    let registerListners = function(){
    };
    
    let MeetingAttachmentsViewModel = function(agendaTopics,meetnginfo,mode){      
    	AgendaTopicItemsModel.createModel(agendaTopics);
    };
    
    let hideView= function(){
        if(document.getElementById('agendaTopicItems') != null){
            document.getElementById('agendaTopicItems').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#agendaTopicItems') != null){
            document.getElementById('agendaTopicItems').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	
    };
    
    let MeetingAttachment = {
    		init : (data,container,meetnginfo,mode) => { return build(data,container,meetnginfo,mode);},
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };
    

    return MeetingAttachment;
});

define('DS/ENXMeetingMgmt/View/RightSlideIn/PanelView', [
	'DS/ENXMeetingMgmt/View/Form/MeetingView',
	'DS/ENXDecisionMgmt/View/Properties/DecisionPropWidget',
	'DS/ENXMeetingMgmt/View/Properties/MeetingPropertiesFacet',
	'DS/ENXDecisionMgmt/View/Properties/DecisionIDCardFacets',
	'DS/ENXDecisionMgmt/View/Form/DecisionCreateView',
	'DS/ENXMeetingMgmt/View/Dialog/OpenDialog',
	'DS/ENXMeetingMgmt/View/Form/AgendaView'
	
		], function(MeetingView, DecisionPropWidget,MeetingPropertiesFacet, DecisionIDCardFacets, DecisionCreateView,OpenDialog,AgendaView) {
	'use strict';
	let displayContainer;
	const destroyViews = function() {
		 displayContainer.destroy();

	};
	var PanelView = function(container) {
		this.container = container;
		displayContainer = new UWA.Element('div',{	
													"id":"rightPanelDisplayContainer",
													styles:{"height":"100%"}
												});
	};
	PanelView.prototype.init = function(data,loadFor) {
		destroyViews(); // to destroy any pre-existing views
		if(loadFor == "meetingInfo"){
			//MeetingView.build(displayContainer,data,"view");
			let meetingPropertiesFacet = new MeetingPropertiesFacet(displayContainer,loadFor);
			meetingPropertiesFacet.init(data,loadFor);
			
		}/*if(loadFor == "decisionCreate"){
			DecisionCreateView.build(displayContainer,data,"view");
			
		}*/
		else if (loadFor =="agendaPreview" || loadFor =="agendaEditView"){
			var meetnginfo = data.meetinginfo;
			AgendaView.init(data,displayContainer,meetnginfo,loadFor);
		} else if(loadFor == "decision"){
			//DecisionPropWidget.render(displayContainer,data);
			let decisionIDCardFacet = new DecisionIDCardFacets(displayContainer,loadFor);
			decisionIDCardFacet.init(data.model,loadFor);
		}
		this.container.appendChild(displayContainer);
	};
	PanelView.prototype.destroy = function() {
		// destroy
		this.container.destroy();
	};

	return PanelView;

});





define('DS/ENXMeetingMgmt/Config/MeetingSummaryGridViewConfig', 
        [
            'DS/ENXMeetingMgmt/View/Grid/MeetingGridCustomColumns', //TODO change the path
            'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
            ], 
            function(MeetingGridViewOnCellRequest, NLS) {
    'use strict';
    let getRouteIconURL = function(){
        
    }
    
    let viewConfig;
    
    let MeetingSummaryGridViewConfig = {
    
		getMeetingSummaryGridViewConfig: function() {
			if (!this.viewConfig) {
				this.setMeetingSummaryGridViewConfig();
			}
			return this.viewConfig;
		},
		
		setMeetingSummaryGridViewConfig: function() {
			this.viewConfig = [
			   {
				  text: NLS.title,
				  dataIndex: 'tree',
				  editableFlag: false,
				  pinned: 'left',              
				},{
				  text: NLS.name,
				  dataIndex: 'Name',
				  editableFlag: false,
				  pinned: 'left',              
				},{
				  text: NLS.IDcardMaturityState,
				  dataIndex: 'Maturity_State',
				  editableFlag: false,
				  'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeStateCellRequest              
				},{
				  text: NLS.startDate,
				  dataIndex: 'startDate',
				  editableFlag: false ,
				  'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeDateCellRequest           
				},{
					text: NLS.duration,
					dataIndex: 'duration'
				  },
				  {
					  text: NLS.context,
					  dataIndex: 'ContextName'
				   },{
				  text: NLS.description,
				  typeRepresentation: "editor",
				  dataIndex: 'Description'
				},{
				 text: NLS.attendees,
				 dataIndex: 'AssigneesDiv',
				 editableFlag: false,
				 "allowUnsafeHTMLContent": true
				},{
				 text: NLS.IDcardOwner,
				 dataIndex: 'Owner',
				 editableFlag: false,
				'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeOwnerCellRequest
				}
            ];

			//custom attributes
			let customFields = (widget.getValue('customFields'))||null;
			if (customFields && customFields.items && customFields.items.length && customFields.items.length>0) {
				//loop through each attribute
				customFields.items.forEach((ele) => {
					if (ele.name != 'extensions') {
						let tempObj = {};
						let label = ele.label.replace(/\s\s+/g, ' ').trim();
						try {
							tempObj = {
							  text: label,
							  dataIndex: ele.name,
							  editableFlag: false,
							  visibleFlag: false
							};
							let tempJSON = JSON.parse(ele.viewConfig) || null;
							if (tempJSON)
								if (tempJSON.type&&tempJSON.type=='text')
									tempObj.autoRowHeightFlag = true;
							this.viewConfig.push(tempObj);
						} catch(e) {
							console.log("error in datagridview config object");
							console.log(e);
						}
					}
				});
			}

		}, 
		init: function() {
			if (!this.viewConfig) 
				this.setMeetingSummaryGridViewConfig();
		}
	};
    
    /*let MeetingSummaryGridViewConfig= [
           {
              text: NLS.title,
              dataIndex: 'tree',
              editableFlag: false,
              pinned: 'left',              
            },{
              text: NLS.name,
              dataIndex: 'Name',
              editableFlag: false,
              pinned: 'left',              
            },{
              text: NLS.IDcardMaturityState,
              dataIndex: 'Maturity_State',
              editableFlag: false,
              'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeStateCellRequest              
            },{
              text: NLS.startDate,
              dataIndex: 'startDate',
              editableFlag: false ,
              'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeDateCellRequest           
            },
            {
                text: NLS.duration,
                dataIndex: 'duration',
                typeRepresentation: 'float'
              },
              {
                  text: NLS.context,
                  dataIndex: 'ContextName'
               },{
              text: NLS.description,
              dataIndex: 'Description'
            },{
             text: NLS.attendees,
             dataIndex: 'AssigneesDiv',
             editableFlag: false,
             "allowUnsafeHTMLContent": true
            },{
             text: NLS.IDcardOwner,
             dataIndex: 'Owner',
             editableFlag: false,
            'onCellRequest':MeetingGridViewOnCellRequest.onMeetingNodeOwnerCellRequest
            }
            ];*/

    return MeetingSummaryGridViewConfig;

});

/**
 * datagrid view for route summary page
 */
define('DS/ENXMeetingMgmt/View/Grid/MeetingSummaryDataGridView',
		[ 
			'DS/ENXMeetingMgmt/Config/MeetingSummaryGridViewConfig',
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXMeetingMgmt/Config/Toolbar/MeetingSummaryToolbarConfig',
            "DS/ENXMeetingMgmt/Utilities/DragAndDropManager"           
			], function(
					DatagridViewConfig,
            	    WrapperDataGridView,
            	    MeetingDataGridViewToolbar,
					DragAndDropManager
            	    ) {

	'use strict';	
	let _toolbar, _dataGridInstance, _gridOptions = {};
	let build = function(model){
		var _container=UWA.createElement('div', {id:'dataGridViewContainer', 'class':'data-grid-container showView nonVisible'});
		let toolbar = MeetingDataGridViewToolbar.writetoolbarDefination(getFilterPreferences());
		DatagridViewConfig.init();
		let colConfig = DatagridViewConfig.getMeetingSummaryGridViewConfig();
		_gridOptions.cellDragEnabledFlag = true;
		let dataGridViewContainer = WrapperDataGridView.build(model, colConfig, toolbar, _container, _gridOptions);
		_toolbar = WrapperDataGridView.dataGridViewToolbar();
		_dataGridInstance = WrapperDataGridView.dataGridView();

		_dataGridInstance.onDragStartCell = function (dragEvent, info) {
			DragAndDropManager.getContentForDrag(dragEvent,info);
            return true;
	    };

	    _dataGridInstance.onDragEndCell = function (e, info){
	    	e.target.removeClassName('wux-ui-state-activated wux-ui-state-highlighted');
	    };

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
	

	let getGridViewToolbar = function(){
		return 	_toolbar;
	};
	
	let getDataGridInstance = function(){
		return 	_dataGridInstance;
	};

	let getFilterPreferences = function(){
		var pref = widget.getValue("meetingfilters");
		if(pref == undefined){    		
			widget.setValue("meetingfilters", ['owned','assigned', "Create", "Scheduled", "In Progress"]);
			return ['owned','assigned', "Create", "Scheduled", "In Progress"];
		} else {
			return pref;//Array.from(new Set(pref)) ;
		}
	};
	
	let CustomDataGridView={
		build : (model) => { return build(model);},
		registerListners : () =>{return registerListners();}, 
		destroy: () => {_dataGrid.destroy();},
		getGridViewToolbar: () => {return getGridViewToolbar();},
		getDataGridInstance : () => {return getDataGridInstance();}
	};

	return CustomDataGridView;
});


/* global define, widget */
/**
 * @overview Meeting
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Home/RightPanelSplitView',
['DS/ENXMeetingMgmt/Components/Wrappers/SplitView',
'DS/ENXMeetingMgmt/View/RightSlideIn/PanelView',
'DS/ENXMeetingMgmt/Utilities/IdCardUtil',
'DS/ENXDecisionMgmt/Utilities/IdCardUtil',
'DS/ENXMeetingMgmt/View/Dialog/AgendaDialog',
'DS/ENXMeetingMgmt/View/Dialog/OpenDialog'
	],
function(SplitViewWrapper,PanelView,IdCardUtil,IdCardUtilDecision,AgendaDialog,OpenDialog) {

    'use strict';
    var RightPanelSplitView = function () { };
    /**
     * RightPanelSplitView to show the right side slidein.
     * @param  {[Mediator]} applicationChannel [required:Mediator object for communication]
     *
     */
    RightPanelSplitView.prototype.getSplitView = function (appChannel) {
        var sView = new SplitViewWrapper();
        var split_options = {
          modelEvents: appChannel,
          withtransition: false,
          withoverflowhidden: false,
          params: {
        	// leftWidth calculates width and left position
            leftWidth: 65,
            rightWidth: 75,
			leftMinWidth:25,
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
      RightPanelSplitView.prototype.setSplitviewEvents = function(splitView){

          var me = splitView;
          let rightContainer = me.getRightViewWrapper();
          let panelView = new PanelView(rightContainer);
          
          widget.meetingEvent.subscribe('meeting-agenda-preview-click', function (data) {
        	  IdCardUtil.infoIconInActive();
        	  panelView.init(data,"agendaPreview");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");
        	  
          });
          
          widget.meetingEvent.subscribe('meeting-agenda-edit-click', function (data) {
        	  IdCardUtil.infoIconInActive();
        	  panelView.init(data,"agendaEditView");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");
        	  
          });
          
          widget.meetingEvent.subscribe('meeting-agenda-create-click', function (data) {
        	  /*IdCardUtil.infoIconInActive();
        	  panelView.init(data,"agendaCreate");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");*/
        	  widget.meetingEvent.publish('meeting-agenda-close-click-view-mode');
			  AgendaDialog.init(data);        	  
          });
          /*widget.meetingEvent.subscribe('meeting-agenda-close-click', function (data) {
        	  if (me._rightVisible) {
        		  me._hideSide("right");
        	  }
          });*/
          
          widget.meetingEvent.subscribe('meeting-agenda-close-click-edit-mode', function (data) {
        	  if (me._rightVisible) {
        		  me._hideSide("right");
        	  }
          });
          
          widget.meetingEvent.subscribe('meeting-agenda-close-click-view-mode', function (data) {
        	  if (me._rightVisible) {
        		  me._hideSide("right");
        	  }
          });
          
          // To handle ID card Meeting Info click open and close in edit prop widget //
          widget.meetingEvent.subscribe('meeting-header-info-click', function (data) {
        	  // Publish the event to make sure if the task panel is open we clear the task panel open flag //
        	  // This will avoid the scenario where we open the task panel first, then meeting prop widget, close prop widget and open the task panel again//
        	  //widget.meetingEvent.publish("meeting-task-close-click-view-mode");
        	  //widget.meetingEvent.publish("meeting-task-close-click-edit-mode");
        	  
        	  IdCardUtil.infoIconActive();
        	  panelView.init(data,"meetingInfo");
        	  me._showSide("right");
        	  widget.propWidgetOpen = true;
          });
          
          widget.meetingEvent.subscribe('meeting-info-close-click', function (data) {
              if (me._rightVisible) {
            	  IdCardUtil.infoIconInActive();
                  me._hideSide("right");
                  widget.propWidgetOpen = false;
                }
          });
          
          // To handle Task panel open and close in view mode and edit mode //
          widget.meetingEvent.subscribe('meeting-task-open-click-view-mode', function (data) {
        	  // when we open the task right panel, the info icon should not be highlighted //
        	  IdCardUtil.infoIconInActive();
        	  panelView.init(data,"taskActionMode");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");
        	  
          });
          
          widget.meetingEvent.subscribe('meeting-task-open-click-edit-mode', function (data) {
        	  // when we open the task right panel, the info icon should not be highlighted //
        	  IdCardUtil.infoIconInActive();
        	  panelView.init(data,"taskEditMode");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");
        	  
          });
          
          widget.meetingEvent.subscribe('meeting-task-close-click-view-mode', function (data) {
        	  if (me._rightVisible) {
        		  me._hideSide("right");
        	  }
          });
          
          widget.meetingEvent.subscribe('meeting-task-close-click-edit-mode', function (data) {
        	  if (me._rightVisible) {
        		  me._hideSide("right");
        	  }
          });
          
          // To handle content panel open and close in edit prop widget //
          widget.meetingEvent.subscribe('meeting-content-preview-click', function (data) {
        	  // when we open the content right panel, the info icon should not be highlighted //
        	  IdCardUtil.infoIconInActive();
        	  // Publish the event to make sure if the task panel is open we clear the task panel open flag //
        	  // This will avoid the scenario where we open the task panel first, then meeting prop widget, close prop widget and open the task panel again//
        	  widget.meetingEvent.publish("meeting-task-close-click-view-mode");
        	  widget.meetingEvent.publish("meeting-task-close-click-edit-mode");
        	  panelView.init(data,"contentPreview");
        	  widget.propWidgetOpen = false;
        	  widget.contentPreviewId = data.model.id;
        	  me._showSide("right");
        	  
          });
          widget.meetingEvent.subscribe('meeting-content-preview-delete', function (data) {
        	  if (me._rightVisible) {
        		  if(data.model.ids.includes(widget.contentPreviewId)){
        			  me._hideSide("right");
        		  }
        	  }
          });
          widget.meetingEvent.subscribe('meeting-content-preview-close', function (data) {
        	  if (me._rightVisible) {
        		me._hideSide("right");
        	  }
          });
          widget.meetingEvent.subscribe('decision-create-click', function (data) {
        	  /*IdCardUtil.infoIconInActive();
        	  panelView.init(data,"decisionCreate");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");*/
        	  OpenDialog.InitiateDialog(data);
        	  
          });
          
          widget.meetingEvent.subscribe('decision-preview-click', function (data) {
        	  IdCardUtil.infoIconInActive();
        	  panelView.init(data,"decision");
        	  widget.propWidgetOpen = false;
        	  me._showSide("right");
        	  var decisionIDCard = document.querySelector('#decisionIDCard');
              if(decisionIDCard){
              	IdCardUtilDecision.resizeIDCard(decisionIDCard.offsetWidth);
              }
        	  
          });
          widget.meetingEvent.subscribe('decision-preview-close-click', function () {
        	  if (me._rightVisible) {
        		  me._hideSide("right");
        	  }
          });
          /*widget.meetingEvent.subscribe('decision-create-close-click', function (data) {
              if (me._rightVisible) {
            	  IdCardUtil.infoIconInActive();
                  me._hideSide("right");
                  widget.propWidgetOpen = false;
                }
          });*/
          
      };
      
      return RightPanelSplitView;

});

/* global define, widget */
/**
 * @overview Meeting Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Dialog/RemoveMeeting', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
		'DS/ENXMeetingMgmt/Model/MeetingModel',
		'DS/ENXMeetingMgmt/View/Grid/MeetingSummaryDataGridView',
		'DS/ENXMeetingMgmt/Actions/MeetingActions',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(WAFData, UWACore, EnoviaBootstrap, WUXDialog, WUXImmersiveFrame, WUXButton, ParseJSONUtil, MeetingModel, DataGridView, MeetingActions, NLS) {
	'use strict';
	let RemoveMeeting,dialog;
	let removeConfirmation = function(removeDetails,actionFromIdCard){
		if(removeDetails.data === undefined){
			// Route summary Toolbar Menu Delete Argument ids are not passed //
			removeDetails = MeetingModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorMeetingRemoveSelection,
			    sticky: false
			});
    		return;
    	}
		// fetch ids here //
		var idsToDelete = [];
		var idsCannotDelete = [];
		var ulCanDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		var ulCannotDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		for(var i=0;i<removeDetails.data.length;i++){
			if(removeDetails.data[i].options.grid.DeleteAccess == "FALSE"){
				idsCannotDelete.push(removeDetails.data[i].options.grid.id);
				ulCannotDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + removeDetails.data[i].options.grid.title
						})
						
					]
				}));
			}else{
				idsToDelete.push(removeDetails.data[i].options.grid.id);
				ulCanDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + removeDetails.data[i].options.grid.title
						})
						
					]
				}));
			}
		}
		let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body);  
    	let dialogueContent = new UWA.Element('div',{
    			"id":"removeRouteWarning",
    			"class":""
    			});
    	var header = "";
    	if(idsToDelete.length > 0){
    		if(idsToDelete.length == 1){
    			header = NLS.removeMeetingHeaderSingle
    		}else{
    			header = NLS.removeMeetingHeader;
    		}
        	header = header.replace("{count}",idsToDelete.length);
        	
        	dialogueContent.appendChild(UWA.createElement('div',{
        				"class":"",
    					"html": NLS.removeMeetingWarning
    				  }));
        	if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeMeetingWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeMeetingWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanDelete));
    	}
    	if(idsCannotDelete.length > 0){
    		if(header == ""){
    			header = NLS.removeMeetingHeader2;
    		}
    		if(idsCannotDelete.length == 1){
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeMeetingWarningDetail2Single
    			}));
    		}else{
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeMeetingWarningDetail2
    			}));
    		}
    		dialogueContent.appendChild(UWA.createElement('div',{
    				"class":""
			  }).appendChild(ulCannotDelete));
    	}
    	var confirmDisabled = false;
    	if(idsCannotDelete.length > 0 && idsToDelete.length < 1){
    		confirmDisabled = true;
    	}
    	dialog = new WUXDialog({
    		   	modalFlag : true,
    		   	width : 500,
    		   	height : 200,
    		   	title: header,
    		   	content: dialogueContent,
    		   	immersiveFrame: immersiveFrame,
    		   	buttons: {
    		   		Ok: new WUXButton({
    		   			label: NLS.Delete,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				removeConfirmed(idsToDelete,actionFromIdCard);
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
    };
    
    let removeConfirmed = function(ids,actionFromIdCard){
    	MeetingActions.DeleteMeeting(ids,actionFromIdCard);
		dialog.close();
	}
    
    RemoveMeeting={
    		removeConfirmation: (removeDetails,actionFromIdCard) => {return removeConfirmation(removeDetails,actionFromIdCard);}
    };
    
    return RemoveMeeting;
});

define('DS/ENXMeetingMgmt/View/Facets/CreateMeetingAttachments',
[
	'DS/Tree/TreeDocument',
	'DS/ENXMeetingMgmt/Model/NewMeetingAttachmentsModel',
	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
	'DS/ENXMeetingMgmt/View/Menu/AttachmentContextualMenu', 
	'DS/ENXMeetingMgmt/Utilities/PlaceHolder',
	'DS/ENXMeetingMgmt/View/Grid/NewMeetingAttachmentsDataGridView',
    'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
    'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (TreeDocument,NewMeetingAttachmentsModel,WrapperDataGridView, AttachmentContextualMenu,
		  PlaceHolder,NewMeetingAttachmentsDataGridView, DropZone, DragAndDropManager, NLS) {    
        "use strict";     
        let id, _model;        
        //_model = new TreeDocument();
        let getContainer = function(){
        	return  UWA.createElement('div', {
                'class': 'create-iMeetingAttachments-view',
                 html: [                        
                            {
                                tag: 'div',
                                'class': 'create-iMeetingAttachments-toolbar-gridview-group',                            
                            },
                            
                        ]
            });
        }
        
        let build = function(container, attachmentsIds){
            //response
        	_model = NewMeetingAttachmentsModel.createModel(attachmentsIds);
        	_model.attachmentsIds = attachmentsIds;
        	
			render(container);
        }
        
        let _ondrop = function(e, target){
        	//target = "initiate meeting attachments";
			target = "Create";
        	//DragAndDropManager.onDropManager(e,undefined,target);
        };
           
        let render= function (container) {
        	let attachmentsContainer = getContainer().inject(container);
        	
            //TO DO-populate content view with selected objects
            let dataGridView=NewMeetingAttachmentsDataGridView.build(_model);
            //let buttonview=createButton();
            let newMeetingAttachmentsToolbar = NewMeetingAttachmentsDataGridView.getGridViewToolbar();
            registerListners();
            let toolBarContainer = UWA.createElement('div', {id:'dataGridNewMeetingDivToolbar', 'class':'NewMeeting-toolbar-container'}).inject(document.querySelector('.create-iMeetingAttachments-toolbar-gridview-group'));
            newMeetingAttachmentsToolbar.inject(toolBarContainer);
            let dataGridButtonDiv = UWA.createElement('div', {id:'idataGridButtonDiv', 'class':'dataGrid-button-container'}).inject(document.querySelector('.create-iMeetingAttachments-toolbar-gridview-group'));
            dataGridView.inject(dataGridButtonDiv);
            if(_model.getChildren().length == 0) {
                PlaceHolder.showEmptyNewMeetingAttachmentsPlaceholder(document.querySelector('.dataGrid-button-container'));
            }
            PlaceHolder.registerListeners();
            registerListners();
            
            //to enable drag and drop
        	let gridContainer = attachmentsContainer.querySelector('.create-iMeetingAttachments-toolbar-gridview-group');
        	//DropZone.makeDroppable(attachmentsContainer, _ondrop);
        };    
       
        let openContextualMenu = function (e, cellInfos) {
            //  that.onItemClick(e, cellInfos);
            if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
                if (e.button == 2) {
                		AttachmentContextualMenu.createAttachmentGridRightClick(e,cellInfos.nodeModel.options.grid);
                };           
            }
        };
        
        let registerListners = function(){
            let dataGridView = WrapperDataGridView.dataGridView();
            dataGridView.addEventListener('contextmenu', openContextualMenu);
            
        };
        
        let removeAttachments= function(){
            let removeDetails = NewMeetingAttachmentsModel.getSelectedRowsModel();
            if(removeDetails.data.length < 1){
            	widget.meetingNotify.handler().addNotif({
                    level: 'error',
                    subtitle: NLS.ErrorContentRemoveSelection,
                    sticky: true
                });
                return;
            }
            _model= NewMeetingAttachmentsModel.deleteSelectedRows();
        };
        
        
        let getModel = function(){
            return NewMeetingAttachmentsModel.getModel();
        };
        /*let setScopeandContentId = function(scope, contentIds){        	
        	getModel().scopeId = scope.scopeId;
        	getModel().scopePhyId = scope.scopePhyId;
        	getModel().contentIds = contentIds;
        };
        
        */
        
        let destroy = function(){
        	NewMeetingAttachmentsModel.destroy();           
        };
        /*let registerEvents =function(){
	        widget.routeMgmtMediator.subscribe('initiateRoute-on-ScopeSelection', function (data) {
	        	let contentIds = getModel().contentIds;
	        	NewMeetingAttachmentsModel.deleteAllRows();	
	        	//setScopeandContentId(data, contentIds);    			    		    		   		   		
	    	});
        };*/
    	
        
        let CreateMeetingAttachments={
                build : (container, attachmentsIds) => { return build(container, attachmentsIds);},                       
                destroy: () => {destroy();},
                getModel : () => {return getModel();} ,
               // onSearchClick: () => {return onSearchClick();},
                removeAttachments: () => {return removeAttachments();}                
        };
        return CreateMeetingAttachments;
    });


define('DS/ENXMeetingMgmt/View/Loader/NewMeetingAttachmentsLoader',
[
 'DS/ENXMeetingMgmt/View/Facets/CreateMeetingAttachments',
 'DS/ENXMeetingMgmt/Utilities/DragAndDrop',
 'DS/ENXMeetingMgmt/Utilities/DragAndDropManager',
 'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'

],
function(CreateMeetingAttachments, DragAndDrop,DragAndDropManager,NLS) {

    'use strict';
    let _appInstance = {};

    const buildContainer = function(){
        _appInstance.container = new UWA.Element('div', { html: "", id :"CreateMeetingAttachmentsView", 'class': 'meeting-create-attachments-container'});        
        _appInstance.container.inject(document.querySelector('#iMeetingTabsContainer'));
    };

    let NewMeetingAttachmentsLoader = {
        init: function(dataJSON){ //,instanceInfo
            if(!this.showView()){               
                buildContainer();
                CreateMeetingAttachments.build(_appInstance.container, dataJSON.contentIds);
                DragAndDrop.makeDroppable(_appInstance.container, _ondrop);
             }
        },
        
        hideView: function(){
            if(document.querySelector('#CreateMeetingAttachmentsView') && document.querySelector('#CreateMeetingAttachmentsView').getChildren().length > 0){
                document.getElementById('CreateMeetingAttachmentsView').style.display  = 'none';      
                //DragAndDrop._removeDroppableStyle();
            }
        },
        
        showView: function(){
            if(document.querySelector('#CreateMeetingAttachmentsView') && document.querySelector('#CreateMeetingAttachmentsView').getChildren().length > 0){
                document.getElementById('CreateMeetingAttachmentsView').style.display = 'block';
                DragAndDrop.makeDroppable(document.getElementById('CreateMeetingAttachmentsView'), _ondrop); 
                return true;
            }
            return false;
        },
       
        destroy: function() {           
            //destroy form elements
        	_appInstance = {};
        	CreateMeetingAttachments.destroy();
        },
        getModel : function(){          
            return CreateMeetingAttachments.getModel();//To do psn16
        }
        
    };
    
    let _ondrop = function(e, target){
    	//target = "initiate meeting attachments";
		target = "Create";
    	DragAndDropManager.onDropManager(e,"",target);
    };
    
    return NewMeetingAttachmentsLoader;

});

/**
 * 
 */
define('DS/ENXMeetingMgmt/View/Facets/MeetingAgenda',
        [   'DS/ENXMeetingMgmt/Controller/MeetingController',
        	'DS/ENXMeetingMgmt/Model/MeetingAgendaModel',
        	'DS/ENXMeetingMgmt/View/Grid/MeetingAgendasDataGridView',
        	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
        	'DS/ENXMeetingMgmt/Utilities/DataFormatter',
        	'DS/ENXMeetingMgmt/Utilities/PlaceHolder',
        	'DS/Core/PointerEvents'
            ], function(
            		MeetingController,
            		MeetingAgendaModel,
            		MeetingAgendasDataGridView,
            		WrapperDataGridView,
            		DataFormatter,
            		PlaceHolder,
            		PointerEvents
            ) {

    'use strict';
    let meetingInfoModel;
	
	
    let build = function(_meetingInfoModel,massupdate){
    	 if(!showView() || massupdate){
    		 let containerDiv = UWA.createElement('div', {id: 'meetingAgendaContainer','class':'meeting-agenda-container'}); 
    		 containerDiv.inject(document.querySelector('.meeting-facets-container'));
    		 MeetingController.fetchMeetingAgendas(_meetingInfoModel.model.id).then(function(response) {
    			 MeetingAgendaModel.destroy();
    			 meetingInfoModel= _meetingInfoModel;
    			 MeetingAgendasViewModel(response, _meetingInfoModel);
    			 drawMeetingAgendasView(containerDiv,massupdate,_meetingInfoModel); 
	         }); 
    	 }
    };

    let drawMeetingAgendasView = function(containerDiv,massupdate,_meetingInfoModel){
        //To add the dataGrid view list
        let datagridDiv = MeetingAgendasDataGridView.build(MeetingAgendaModel.getModel(),massupdate,_meetingInfoModel);
        
        
      /*  if(massupdate == "true") {
        	MeetingAgendaModel.getModel().setUseChangeTransactionMode(true);
        } else {
        	MeetingAgendaModel.getModel().setUseChangeTransactionMode(false);
        }*/
        //To add the Tile view summary list
        //let tileViewDiv= RouteMembersTileView.build(RouteMemberModel.getModel());
        //RouteMembersTileView.contexualMenuCallback();
        
        //get the toolbar:no toolbar for now
        let agendasTabToolbar=MeetingAgendasDataGridView.getGridViewToolbar();
        
        //Add all the divs into the main container
        
        let toolBarContainer = UWA.createElement('div', {id:'dataGridAgendasDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
        agendasTabToolbar.inject(toolBarContainer);
        datagridDiv.inject(containerDiv);
        //tileViewDiv.inject(containerDiv);
        if (MeetingAgendaModel.getModel().getChildren().length ==0 ) {
            PlaceHolder.showEmptyAgendaPlaceholder(containerDiv,_meetingInfoModel.model.ModifyAccess);
        }
        PlaceHolder.registerListeners();
        registerListners();

        //registerEventListeners();
        return containerDiv;
    };
    
    let registerListners = function(){
    	let dataGridView = WrapperDataGridView.dataGridView();
    	dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
    	dataGridView.addEventListener('contextmenu', openContextualMenu);
    	registerEventListeners();
        
    };
    
    let registerEventListeners = function(){
    	widget.meetingEvent.subscribe('agenda-summary-update-rows', function (data) {
    		MeetingAgendaModel.updateRow(data);  
    	});
    	widget.meetingEvent.subscribe('meeting-agenda-delete-row-by-ids', function (data) {
				MeetingAgendaModel.deleteSelectedRows();					
		}); 
    	
    	widget.meetingEvent.subscribe('meeting-data-updated', function (data) {
    		MeetingAgendaModel.updateMeetingInfo(data);		
		});

        widget.meetingEvent.subscribe('toolbar-data-updated', function (data) {
        	
        	if(data.modifyAccess == "TRUE") {
        		if ("in progress" === data.state.toLowerCase()) {
	    			showAgendaAddButton(true);
	    			showAgendaDeleteButton(false);        		
        		}
        		else {
        			showAgendaAddButton(true);
	    			showAgendaDeleteButton(true); 
        		}
    		}
    		else{
    			showAgendaAddButton(false);
    			showAgendaDeleteButton(false);
    		} 
    		
    		if (MeetingAgendaModel && MeetingAgendaModel.meetingInfo() && MeetingAgendaModel.meetingInfo().model && data.state) {
    			if (MeetingAgendaModel.meetingInfo().model.state !== data.state) {
    				MeetingAgendaModel.meetingInfo().model.state = data.state;
    			}
    		}
        	
		}); 
    };
    
    let showAgendaAddButton = function(flag){
		let meetingAgendaToolbar = MeetingAgendasDataGridView.getGridViewToolbar();
		let addAgenda = meetingAgendaToolbar.getNodeModelByID("createAgenda");
		if (addAgenda) {
        	addAgenda.updateOptions({
            visibleFlag: true,
			disabled: !flag
          });
        }
	};
	
	let showAgendaDeleteButton = function(flag){
		let meetingAgendaToolbar = MeetingAgendasDataGridView.getGridViewToolbar();
		let deleteAgenda = meetingAgendaToolbar.getNodeModelByID("deleteAgenda");
        if (deleteAgenda) {
        	deleteAgenda.updateOptions({
            visibleFlag: true,
			disabled: !flag
          });
        }
	};
    
    let openContextualMenu = function (e, cellInfos) {
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.button == 2) {
		    	  require(['DS/ENXMeetingMgmt/View/Menu/MeetingContextualMenu'], function (MeetingContextualMenu) {
					MeetingContextualMenu.meetingAgendaGridRightClick(e,cellInfos.nodeModel);
				});           
		     }
		}
	};
    
    let onDoubleClick = function (e, cellInfos) {
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.multipleHitCount == 2) {
	    			cellInfos.nodeModel.select(true);
	    			widget.meetingEvent.publish('meeting-agenda-preview-click', {model:cellInfos.nodeModel,meetinginfo:meetingInfoModel});             
		     }
		}
	};
	
    let MeetingAgendasViewModel = function(serverResponse, _meetingInfoModel){      
    	MeetingAgendaModel.createModel(serverResponse);
    	MeetingAgendaModel.setContextMeetingInfo(_meetingInfoModel);
    };
    
    let hideView= function(){
        if(document.getElementById('meetingAgendaContainer') != null){
            document.getElementById('meetingAgendaContainer').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#meetingAgendaContainer') != null){
            document.getElementById('meetingAgendaContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	if(document.querySelector('#meetingAgendaContainer') != null){
    		document.getElementById('meetingAgendaContainer').destroy();
    		MeetingAgendaModel.destroy();
    		
    	}
    };
    
    let MeetingAgenda = {
            init : (_meetingInfoModel,massupdate) => { return build(_meetingInfoModel,massupdate);},
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };
    

    return MeetingAgenda;
});

define('DS/ENXMeetingMgmt/Config/MeetingMemberGridViewConfig',
        ['DS/ENXMeetingMgmt/View/Grid/MeetingGridCustomColumns',
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'], 
        function(MeetingGridCustomColumns,NLS) {

    'use strict';

    let MeetingMemberGridViewConfig=[
      /* {
          text: NLS.username,
          dataIndex: 'UserName' 
        }, */
       {
          text: NLS.name,
          dataIndex: 'tree'
        	  
        },{
     	  text: NLS.type,
     	  dataIndex: 'Type' 
     	},{
     	  text: NLS.contact,
     	  dataIndex: 'Contact' 
     	} ,{
     	  text: NLS.email,
     	  dataIndex: 'Email' 
     	} ,{
     	  text: NLS.company,
     	  dataIndex: 'Company' 
     	}];

    return MeetingMemberGridViewConfig;

});

/**
 * datagrid view for Agenda summary page
 */
define('DS/ENXMeetingMgmt/View/Grid/MeetingMemberDataGridView',
		[ 
			'DS/ENXMeetingMgmt/Config/MeetingMemberGridViewConfig',
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXMeetingMgmt/Config/Toolbar/MeetingMemberTabToolbarConfig'      
			], function(
					MeetingMemberGridViewConfig,
                    WrapperDataGridView,
                    MeetingMemberTabToolbarConfig 
            	    ) {

	'use strict';	
	let _toolbar;
	let build = function(model){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            styles: {
                'width': "100%",
                'height': "calc(100% - 40px)",
                'position': "relative"
            },
            'class': "Members-gridView-View showView nonVisible"
        });
        let toolbar = MeetingMemberTabToolbarConfig.writetoolbarDefination(model);
        let dataGridViewContainer = WrapperDataGridView.build(model, MeetingMemberGridViewConfig, toolbar, gridViewDiv);
        _toolbar = WrapperDataGridView.dataGridViewToolbar();
        return dataGridViewContainer;
    };
	

    let getGridViewToolbar = function(){
        return _toolbar;   
    };

    let MeetingMembersDataGridView={
            build : (model) => { return build(model);},            
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return MeetingMembersDataGridView;
});

define("DS/ENXMeetingMgmt/Config/Toolbar/ToggleViews",
        ['DS/ENXMeetingMgmt/View/Grid/MeetingSummaryDataGridView',
         'DS/ENXMeetingMgmt/View/Grid/MeetingAttachmentDataGridView',
         'DS/ENXMeetingMgmt/View/Grid/MeetingMemberDataGridView', 
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
], function(MeetingSummaryDataGridView ,MeetingAttachmentDataGridView ,MeetingMemberDataGridView , NLS) {
    "use strict";
    let gridViewClassName,tileViewClassName,viewIcon;
    var ToggleViews = {

            /*
             * Method to change view from Grid View to Tile View Layout and vice-versa
             */
            
            doToggleView: function(args) {
                switch(args.curPage){
                    case "MeetingSummary" : gridViewClassName=".data-grid-container";
                                            tileViewClassName=".tile-view-container";
                                            viewIcon = MeetingSummaryDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                            break;
    
                    case "AttachmentTab" :  gridViewClassName=".attachments-gridView-View";
                                            tileViewClassName=".attachments-tileView-View";
                                            viewIcon = MeetingAttachmentDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                            break;
                                            
                    case "MembersTab" :    gridViewClassName=".Members-gridView-View";
                                           tileViewClassName=".Members-tileView-View";
                                           viewIcon = MeetingMemberDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                           break;
                   
                    default            :     Console.log("Incorrect arguments in config file.");
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
    return ToggleViews;
});

/* global define, widget */
/**
  * @overview Meeting - Storage model
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Model/CollabStorageModel', [
    'UWA/Core',
    'UWA/Class/Model',
    'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap'
], function(
    UWACore,
    UWAModel,
    EnoviaBootstrap
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

        name : _name,

        defaults : {
            csrf : null,
            isInnovation : false,
            displayName : "",
            url : ""
        },

        url : function() {
            return this.get('url');
        },

        fetch : function(options) {
            var url = result(this, 'url');

            options = options ? UWACore.clone(options, false) : {};
            UWACore.extend(options, EnoviaBootstrap.getSyncOptions(), true);

            return this._parent.call(this, options);
        },

        parse : function(resp) {
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

define('DS/ENXMeetingMgmt/Actions/MeetingAgendaActions', [
  'DS/ENXMeetingMgmt/View/Facets/CreateMeetingTabs',
  'DS/ENXMeetingMgmt/Utilities/Utils',
  'DS/ENXMeetingMgmt/Model/MeetingModel',
  'DS/ENXMeetingMgmt/Model/MeetingAgendaModel',
  'DS/Windows/Dialog',
  'DS/Windows/ImmersiveFrame',
  'DS/ENXMeetingMgmt/Controller/MeetingController',
  'DS/ENXMeetingMgmt/View/Facets/MeetingAgenda',
  'DS/Controls/Button',
  'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
],
  function (InitiateMeetingTabs,
		  Utils,
		  MeetingModel,
		  MeetingAgendaModel,
		  WUXDialog,
		  WUXImmersiveFrame,
		  MeetingController,
		  MeetingAgenda,
		  WUXButton,
		  NLS) {
	
	'use strict';
	let  _dialog;
	
	let createAgendaDialog = function () {
		
		widget.meetingEvent.publish('meeting-agenda-create-click', {model:MeetingAgendaModel.getModel(), meetinginfo:MeetingAgendaModel.meetingInfo()}); 
	};
	
	let DeleteMeetingAgenda = function(meetingInfo,ids,deleteAgedacount){
		   return new Promise(function(resolve, reject) {
				MeetingController.deleteMeetingAgenda(meetingInfo.model.id,ids,deleteAgedacount).then(
						success => {
							var successMsg = NLS.successRemoveMeetingAgenda;
							if(deleteAgedacount == 1){
								successMsg = NLS.successRemoveMeetingAgendaSingle;
							}
							successMsg = successMsg.replace("{count}",deleteAgedacount); // length need to update
							widget.meetingNotify.handler().addNotif({
								level: 'success',
								subtitle: successMsg,
							    sticky: false
							});
							widget.meetingEvent.publish('meeting-agenda-delete-row-by-ids',{success});
							require(['DS/ENXMeetingMgmt/View/Facets/MeetingAgenda'], function(MeetingAgenda) {
								var displayAgenda = "block";
								if(document.querySelector('#meetingAgendaContainer') != null){
									displayAgenda=  document.getElementById('meetingAgendaContainer').style.display;
								}
								MeetingAgenda.destroy();
								MeetingAgenda.init(meetingInfo,"false");
								if(document.querySelector('#meetingAgendaContainer') != null){
									document.getElementById('meetingAgendaContainer').style.display = displayAgenda;
								}
							});
							widget.meetingEvent.publish("meeting-agenda-close-click-view-mode");
							resolve();
						},
						failure =>{
							if(failure.error){
								widget.meetingNotify.handler().addNotif({
									level: 'error',
									subtitle: failure.error,
								    sticky: false
								});
							}else{
								widget.meetingNotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.errorRemove,
								    sticky: false
								});
							}
						});
						});
			};
	
	/*let massupdateSequence = function (contentData) {
		if(MeetingAgendaModel.getModel().getChildren().length==0) {
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.noAgendaItemsToModify,
			    sticky: false
			});
			return;
		}
		document.querySelector('#meetingAgendaContainer').destroy();
		let meetingInfo = MeetingAgendaModel.meetingInfo();
		MeetingAgenda.init(meetingInfo,"true");
		
	};
	let validateSequence = function (columnVals) {
		  var length = columnVals.length;
		  var flag = true;
		  columnVals.sort(function(a,b){return a - b});
		  var temp1 = 1;

		  for (var i = 0; i < columnVals.length; i++) {
		      if (temp1 == columnVals[i]) {
		          temp1++;
		      } else {
		          if (length-1 == i) {
		              flag = false;
		              break;
		          }
		      }
		  }

		  return flag;
		};
	/*
	let processMassUpdate = function (contentData) {
		var allAgendas = MeetingAgendaModel.getModel().getAllDescendants();
		var changedagendas = [];
		var finalchangeAgendas = [];
		var columnVals = [];
		allAgendas.forEach(function(agendaItem) {	
			if(agendaItem._changeStates == 1) {
				changedagendas.push(agendaItem.options.grid);
			}
			columnVals.push(agendaItem.options.grid.Sequence);
		});
		if(changedagendas.length==0) {
			document.querySelector('#meetingAgendaContainer').destroy();
			let meetingInfo = MeetingAgendaModel.meetingInfo();
			MeetingAgenda.init(meetingInfo,"false");
			return;
		}
		
		var flag =  validateSequence(columnVals);
		
		if(flag) {
			changedagendas.forEach(function(agendaItem) {	
				var Sequence = agendaItem.Sequence
				var agendaTopicItem = agendaItem.Data;
				agendaTopicItem.forEach(function(topicItems) {	
					topicItems.relelements.sequence = Sequence.toString();
					finalchangeAgendas.push(topicItems);
				});
			});
			
			MeetingController.updateMeetingAgenda(finalchangeAgendas,"massupdate",MeetingAgendaModel.meetingInfo()).then(
					success => {
						var successMsg = NLS.AgendaupdateSuccessMsg;
						widget.meetingNotify.handler().addNotif({
							level: 'success',
							subtitle: successMsg,
						    sticky: false
						});
						document.querySelector('#meetingAgendaContainer').destroy();
						let meetingInfo = MeetingAgendaModel.meetingInfo();
						MeetingAgenda.init(meetingInfo,"false");
					},
					failure =>{
						if(failure.error){
							widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: failure.error,
							    sticky: false
							});
						}else{
							widget.meetingNotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.errorRemove,
							    sticky: false
							});
						}
				});

		} else {
			widget.meetingNotify.handler().addNotif({
				level: 'error',
				title: NLS.errorsequenceMassupdateTitle,
				subtitle: NLS.errorsequenceMassupdate,
			    sticky: false
			});
		}
				
	};
	
	let cancelMassUpdate = function (contentData) {
		document.querySelector('#meetingAgendaContainer').destroy();
		let meetingInfo = MeetingAgendaModel.meetingInfo();
		MeetingAgenda.init(meetingInfo,"false");
		
	};
	
*/	
    let MeetingAgendaActions={    		
    		createAgendaDialog: () => {return createAgendaDialog();},    		
    		getDialog: () => {return _dialog;},
    		/*massupdateSequence: (contentIds) => {return massupdateSequence(contentIds);},
    		processMassUpdate: (contentIds) => {return processMassUpdate(contentIds);},
    		cancelMassUpdate: (contentIds) => {return cancelMassUpdate(contentIds);},*/
    		DeleteMeetingAgenda: (meetingInfo,ids,deleteAgedacount) => {return DeleteMeetingAgenda(meetingInfo,ids,deleteAgedacount);}
    };

    return MeetingAgendaActions;

  });

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Dialog/RemoveMembers', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
		'DS/ENXMeetingMgmt/Model/MeetingMembersModel',
		'DS/ENXMeetingMgmt/Utilities/Utils',
		'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
		'DS/ENXMeetingMgmt/View/Grid/MeetingMemberDataGridView',
		'DS/ENXMeetingMgmt/Actions/MeetingActions',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(WAFData, UWACore, EnoviaBootstrap, WUXDialog, WUXImmersiveFrame, WUXButton, ParseJSONUtil, MeetingMembersModel, Utils, WrapperTileView, WrapperDataGridView, DataGridView, MeetingActions, NLS) {
	'use strict';
	let RemoveMembers,dialog;
	let removeConfirmation = function(removeDetails){
		if(removeDetails.data === undefined){
			removeDetails = MeetingMembersModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorMemberRemoveSelection,
			    sticky: false
			});
    		return;
    	}
		// fetch ids here //
		var idsToDelete = [];
		var idsCannotDelete = [];
		
		var ulCanDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		var ulCannotDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		
		var tileView=WrapperTileView.tileView();
		var meetingId = tileView.TreedocModel.meetingId;
		var meetingModel = tileView.TreedocModel.meetingModel;
		var meetingOwner = meetingModel.Owner;
		var maturityState = meetingModel.state; // state has actual name //
		
		for(var i=0;i<removeDetails.data.length;i++){
		var assignee = removeDetails.data[i].options.grid.UserName;
		var type = removeDetails.data[i].options.grid.Type;
		var name = "";
		if(type == "Group"){
			name=removeDetails.data[i].options.grid.Name + "(User Group)";
		}else{
			name=removeDetails.data[i].options.grid.Name;
		}
		if(maturityState=="Create" & assignee !=meetingOwner){
		  idsToDelete.push(removeDetails.data[i].options.grid.id);
		  ulCanDelete.appendChild(UWA.createElement('li',{
					"class":"",
					styles : {"white-space": "nowrap"},
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + name
						})
						
					]
				}));
		}else{
		  idsCannotDelete.push(removeDetails.data[i].options.grid.id);
		  ulCannotDelete.appendChild(UWA.createElement('li',{
					"class":"",
					styles : {"white-space": "nowrap;"},
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + name
						})
						
					]
				}));
		  }
		} //end of for loop
		
		let dialogueContent = new UWA.Element('div',{
    			"id":"RemoveMemberWarning",
    			"class":"",
    			styles : {"height": "130px","overflow": "auto"}
    			});
    	var header = "";
    	if(idsToDelete.length > 0){
    		if(idsToDelete.length == 1){
    			header = NLS.removeMemberHeaderSingle;
    		}else{
    			header = NLS.removeMemberHeader;
    		}
        	header = header.replace("{count}",idsToDelete.length);
        	
        	dialogueContent.appendChild(UWA.createElement('div',{
        				"class":"",
    					"html": NLS.removeMemberWarning
    				  }));
    				  
           if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeMemberWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeMemberWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanDelete));
    	}
    	
    	if(idsCannotDelete.length > 0){
    		if(header == ""){
    			header = NLS.removeMemberHeader2;
    		}
    		if(idsCannotDelete.length == 1){
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeMemberWarningDetail2Single
    			}));
    		}else{
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeMemberWarningDetail2
    			}));
    		}
    		dialogueContent.appendChild(UWA.createElement('div',{
    				"class":""
			  }).appendChild(ulCannotDelete));
    	}
    	
        let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body); 

    	var confirmDisabled = false;
    	if(idsToDelete.length < 1){
    		confirmDisabled = true;
    	}
    	dialog = new WUXDialog({
    		   	modalFlag : true,
    		   	width : 500,
    		   	height : 200,
    		   	title: header,
    		   	content: dialogueContent,
    		   	immersiveFrame: immersiveFrame,
    		   	buttons: {
    		   		Ok: new WUXButton({
    		   			label: NLS.Okbutton,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				removeConfirmed(idsToDelete);
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
    };
    
    let removeConfirmed = function(ids){
        var tileView=WrapperTileView.tileView();
		var meetingId = tileView.TreedocModel.meetingId;
        MeetingActions.DeleteMember(meetingId,ids).then(
    	        success => {
    			   MeetingMembersModel.deleteSelectedRows();
    	           Utils.getMeetingDataUpdated(meetingId);
    		    	    },
    		    failure => {
    		    		//commonFailureCallback(reject,failure);
    		    	});
		dialog.close();
	}
    
    RemoveMembers={
    		removeConfirmation: (removeDetails) => {return removeConfirmation(removeDetails);}
    };
    
    return RemoveMembers;
});

/* global define, widget */
/**
  * @overview Meeting
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXMeetingMgmt/Collections/CollabStorageCollection',
[
    'UWA/Core',
    'UWA/Utils',
    'UWA/Class/Collection',
    'DS/PlatformAPI/PlatformAPI',
    'DS/ENXMeetingMgmt/Model/CollabStorageModel',
    'DS/i3DXCompassServices/i3DXCompassServices',
    'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
], function(
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

        name : _name,

        model : CollabStorageModel,

        //Override of collection call with a platform service call
        // parse, sync and url were removed
        //This architecture may be improved, without using a collection for example
        fetch : function(options) {
            var that = this;
            
            var platformsWithCSV = [];

            return new Promise(function (resolve, reject){
            	i3DXCompassPlatformServices.getGrantedRoles(function (roles) {
                    roles.forEach(function (role) {
                        if(role.id === 'CHG' || role.id === 'UXG' || role.id === 'UWU' || role.id === 'InternalDS') {
                        	if(UWA.is(role.platforms, 'array')){
                        		platformsWithCSV = platformsWithCSV.concat(role.platforms);
                        	}
                        }
                    });
                    resolve();
                });
            }).then( function (){
            
            i3DXCompassServices.getPlatformServices({
                serviceName: '3DSpace',
                onComplete: function (resp) {
                	if (platformsWithCSV.length > 0){
                		Object.keys(resp).map(function(key) {
                			if(platformsWithCSV.includes(resp[key].platformId)){
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
                onFailure: function(resp) {
                    if (options && options.onFailure) {
                        options.onFailure(resp);
                    }
                }
            });
            
            });
            
        },

        getStorageWithUrl : function(url, options) {
            options = UWACore.clone(options || {}, false);

            var that = this, target = UWAUtils.parseUrl(url).domain, domainStrict = options.domainStrict, filter;

            filter = function(storage) {

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

/* global define, widget */
/**
 * @overview Meeting widget
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Dialog/RemoveAgendaItems', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
		'DS/ENXMeetingMgmt/Model/MeetingAgendaModel',
		'DS/ENXMeetingMgmt/Utilities/Utils',
		'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
		'DS/ENXMeetingMgmt/View/Grid/MeetingMemberDataGridView',
		'DS/ENXMeetingMgmt/Actions/MeetingAgendaActions',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(WAFData, UWACore, EnoviaBootstrap, WUXDialog, WUXImmersiveFrame, WUXButton, ParseJSONUtil, MeetingAgendaModel, Utils, WrapperTileView, WrapperDataGridView, DataGridView, MeetingAgendaActions, NLS) {
	'use strict';
	let RemoveMembers,dialog;
	let removeConfirmation = function(removeDetails,selectedDetails){
		if(removeDetails.data === undefined){
			removeDetails = MeetingAgendaModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorAgendaRemoveSelection,
			    sticky: false
			});
    		return;
    	}
		// fetch ids here //
		var idsToDelete = [];
		var idsCannotDelete = [];
		
		var ulCanDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		var ulCannotDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		
		var deleteAgedacount = removeDetails.data.length;
		 
		
		for(var i=0;i<removeDetails.data.length;i++){
		if( MeetingAgendaModel.meetingInfo().model.state != "In Progress"){ 
			var topicItems = removeDetails.data[i].options.grid.Data;
			topicItems.forEach(function(dataElem) {	
				var info = {};
				info = dataElem
				idsToDelete.push(info);
			})
		  ulCanDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + removeDetails.data[i].options.grid.Topic
						})
						
					]
				}));
		}else{
			var topicItems = removeDetails.data[i].options.grid.Data;
			topicItems.forEach(function(dataElem) {	
				var info = {};
				info = dataElem
				idsCannotDelete.push(info);
			})
		  ulCannotDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							"html": "&nbsp;" + removeDetails.data[i].options.grid.Topic
						})
						
					]
				}));
		  }
		} //end of for loop
		
		let dialogueContent = new UWA.Element('div',{
    			"id":"RemoveMemberWarning",
    			"class":""
    			});
    	var header = "";
    	if(deleteAgedacount > 0 && idsToDelete.length > 0){
    		if(deleteAgedacount == 1){
    			header = NLS.deleteAgendaHeaderSingle;
    		}else{
    			header = NLS.deleteAgendaHeader;
    		}
        	header = header.replace("{count}",deleteAgedacount);
        	
        	dialogueContent.appendChild(UWA.createElement('div',{
        				"class":"",
    					"html": NLS.removeMeetingAgendaWarning
    				  }));
    				  
           if(deleteAgedacount == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeMeetingAgendaWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeMeetingAgendaWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanDelete));
    	}
    	
    	if(deleteAgedacount > 0 && idsCannotDelete.length > 0){
    		if(header == ""){
    			header = NLS.removeAgendaHeader2;
    		}
    		if(deleteAgedacount.length == 1){
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeMeetingNoAgendaWarningDetailSingle
    			}));
    		}else{
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeMeetingNoAgendaWarningDetail
    			}));
    		}
    		dialogueContent.appendChild(UWA.createElement('div',{
    				"class":""
			  }).appendChild(ulCannotDelete));
    	}
    	
        let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body); 

    	var confirmDisabled = false;
    	if(idsToDelete.length < 1){
    		confirmDisabled = true;
    	}
    	dialog = new WUXDialog({
    		   	modalFlag : true,
    		   	width : 500,
    		   	height : 200,
    		   	title: header,
    		   	content: dialogueContent,
    		   	immersiveFrame: immersiveFrame,
    		   	buttons: {
    		   		Ok: new WUXButton({
    		   			label: NLS.Okbutton,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				removeConfirmed(idsToDelete,deleteAgedacount);
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
    };
    
    let removeConfirmed = function(ids,deleteAgedacount){
		//var meetingId = MeetingAgendaModel.meetingInfo().model.id;
		MeetingAgendaActions.DeleteMeetingAgenda(MeetingAgendaModel.meetingInfo(),ids,deleteAgedacount);
		var totalDur =parseInt(widget.getValue('SumOfAgendaDuration'));
		for(var i = 0; i < ids.length; i++) {
		totalDur=totalDur-parseInt(ids[i].relelements.topicDuration);
		}
		widget.setValue("SumOfAgendaDuration", totalDur);
		dialog.close();
	}
    
    RemoveMembers={
    		removeConfirmation: (removeDetails,selectedDetails) => {return removeConfirmation(removeDetails,selectedDetails);}
    };
    
    return RemoveMembers;
});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Menu/MeetingContextualMenu', [
		'DS/Menu/Menu',
		'DS/ENXMeetingMgmt/View/Dialog/RemoveMeeting',
		'DS/ENXMeetingMgmt/Services/LifeCycleServices',
		'DS/ENXMeetingMgmt/Actions/MeetingActions',
		'DS/ENXMeetingMgmt/Model/MeetingModel',
		'DS/ENXMeetingMgmt/Model/MeetingAgendaModel',
		'DS/ENXMeetingMgmt/View/Dialog/RemoveAgendaItems',
		'DS/ENXMeetingMgmt/View/Menu/MeetingOpenWithMenu',
		'DS/ENXMeetingMgmt/Services/WidgetCommonServices',
		'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ], 
	function(WUXMenu, RemoveMeeting, LifeCycleServices, MeetingActions, MeetingModel,MeetingAgendaModel,RemoveAgendaItems, MeetingOpenWithMenu, WidgetCommonServices, NLS){
		'use strict';
		let Menu;
        
		let meetingAgendaGridRightClick= function(event,data){
			// To handle multiple selection //
        	// This will avoid unselecting the selected rows when click on actions //
        	event.preventDefault();
            event.stopPropagation();
			var pos = event.target.getBoundingClientRect();
            var config = {
            		position: {
            			x: pos.left,
                        y: pos.top + 20
                    }
            };
            var selectedDetails = MeetingAgendaModel.getSelectedRowsModel();
            var menu = [];
            var modifyAccess = true;
            if(MeetingAgendaModel.meetingInfo() && MeetingAgendaModel.meetingInfo().model.ModifyAccess == "FALSE")  {
            	modifyAccess = false;
            }
            if(selectedDetails.data.length === 1){
            	// Single Selection //
                menu = menu.concat(openAgendaMenu(data));
            }
            menu = menu.concat(deleteAgendaMenu(selectedDetails,data,modifyAccess));
        	
        	WUXMenu.show(menu, config);
		};
		
        let meetingGridRightClick = function(event,data){
			// To handle multiple selection //
        	// This will avoid unselecting the selected rows when click on actions //
        	event.preventDefault();
            event.stopPropagation();
			var pos = event.target.getBoundingClientRect();
            var config = {
            		position: {
            			x: pos.left,
                        y: pos.top + 20
                    }
            };
            var selectedDetails = MeetingModel.getSelectedRowsModel();
            var menu = [];
            
            if(selectedDetails.data.length === 1){
            	// Single Selection //
                menu = menu.concat(openMenu(data));
               // TODO GDS5
              //  menu = menu.concat(routeMaturityStateMenus(data.Actions,data.id));
            }
            menu = menu.concat(RelationsMenu(selectedDetails));
        	menu = menu.concat(deleteMenu(selectedDetails,false));
        	WUXMenu.show(menu, config);
		};
		
		let meetingIdCardCheveron = function(meetingDetails){
		
			var element = UWA.createElement('div', {
			  "class" : "wux-ui-3ds wux-ui-3ds-3x wux-ui-3ds-chevron-down fonticon-display fonticon-color-display",
			  "title" : NLS.idCardHeaderActionMeetingAction,
			  styles : {
				    		"padding-top": "0px"
				  		},
			  events: {
                click: function (event) {
                    // The coordinates to show the menu
                	var pos = event.target.getBoundingClientRect();
                    var config = {
                    		position: {
                    			x: pos.left,
                                y: pos.top + 20
                            }
                    };
                    var menu = deleteMenu(meetingDetails,true);
                    
                    WUXMenu.show(menu, config);
                }
            }
			});
			return element; 
		};
		
		let maturity = function(data,reqType){
			var menu = [];
			menu.push({
                name: NLS.Maturity,
                title: NLS.Maturity,
                type: 'PushItem',
                fonticon: {
                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-collaborative-lifecycle-management'
                },
                data: null,
                action: {
                    callback: function () {
                    	LifeCycleServices.lifeCycle(data,reqType);
                    }
                }
            });
			return menu;
		};
		
		let getOpenWithMenu = function(data){
        	let menu = [];
        	return new Promise(function(resolve, reject) {
        		MeetingOpenWithMenu.getOpenWithMenu(data).then(				
        				success => {
        					if(success && success.length > 0){
        						menu.push({
            						id:"OpenWith",
            						'type': 'PushItem',
            						'title': NLS.openWith,
            						icon: "export",
            						submenu:success
            					});
        					}
        					resolve(menu);  
        				},
        				failure =>{
        					resolve(menu);
        				});
        	});	
        };
		
		let meetingIdCardContextCheveron = function(data){	
			if (data.Id == "" || data.Title == "") {
				return;
			}		
			var element = UWA.createElement('div', {
			  "class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-chevron-down ",
			  "title" : NLS.idCardHeaderContext,
			  styles : {
				  	"font-size": "18px",
				  	"line-height": "24px"
		  		},
            events: {
                click: function (event) {
                    // The coordinates to show the menu
                	var pos = event.target.getBoundingClientRect();
                    var config = {
                    		position: {
                    			x: pos.left,
                                y: pos.top + 20
                            }
                    };

                    var menu = [];
                    getOpenWithMenu(data).then(function(openWithMenu){
               		menu = menu.concat(openWithMenu);
               		WUXMenu.show(menu, config);
                    });
                    
                }
            }
			});
			return element;
			 
		};
		
		let meetingIdCardStateCheveron = function(modifyAccess,data,reqType){
			/*if(data.ModifyAccess != "TRUE"){
				// No state actions for meeting. Do not draw the cheveron //
				return "";
			}*/
			
			var element = UWA.createElement('div', {
			  "class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-chevron-down ",
			  "title" : NLS.idCardHeaderMaturityState,
			  styles : {
				  	"font-size": "18px",
				  	"line-height": "24px"
		  		},
            events: {
                click: function (event) {
                    // The coordinates to show the menu
                	var pos = event.target.getBoundingClientRect();
                    var config = {
                    		position: {
                    			x: pos.left,
                                y: pos.top + 20
                            }
                    };

                    var menu = maturity(data,"idCard");
                    WUXMenu.show(menu, config);
                }
            }
			});
			return element;
			 
		};
		
		
		let deleteAgendaMenu = function(selectedDetails,removeDetails,showDeleteCmd){
			// Display menu
			var menu = [];
			if(showDeleteCmd){
				 menu.push({
		                name: NLS.Delete,
		                title: NLS.Delete,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                    	RemoveAgendaItems.removeConfirmation(selectedDetails,removeDetails,showDeleteCmd);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
		
		let deleteMenu = function(removeDetails,actionFromIdCard){
			// Display menu
			let showDeleteCmd =true;
			if(removeDetails.data.length === 1 && removeDetails.data[0].options.grid.DeleteAccess != "TRUE"){
				showDeleteCmd = false;
			}			
			var menu = [];
			if(showDeleteCmd){
				 menu.push({
		                name: NLS.Delete,
		                title: NLS.Delete,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                      RemoveMeeting.removeConfirmation(removeDetails,actionFromIdCard);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
		
		let RelationsMenu = function(selectedDetails){
			// Display menu
			var ids = [];
			for(var i=0;i<selectedDetails.data.length;i++){
				ids.push(selectedDetails.data[i].options.grid.id);
			}
			var menu = [];
			menu.push({
		                name: NLS.Relations,
		                title: NLS.Relations,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-object-related'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                    	WidgetCommonServices.openRelationalExplorer(ids);
		                    }
		                }
		            });           
            return menu;
		};
		
		let meetingTileCheveron = function(actions,id){

		    var selectedDetails = MeetingModel.getSelectedRowsModel();
		    var menu = [];
		   
		    if(selectedDetails.data.length === 1){
		        // Single Selection //
		        menu = menu.concat(openMenu(selectedDetails.data[0].options.grid));
		        menu = menu.concat(meetingMaturityStateMenus(actions,id));
		    }
		    menu = menu.concat(RelationsMenu(selectedDetails));
		    menu = menu.concat(deleteMenu(selectedDetails,false));

		    return menu;     
		};
		
		
		let openAgendaMenu = function(Details){
            // Display menu
            var menu = [];
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
                        widget.meetingEvent.publish('meeting-agenda-preview-click', {model:Details,meetinginfo:MeetingAgendaModel.meetingInfo()});
                    }
                }
            });
            return menu;
        };
		
		let openMenu = function(Details){
            // Display menu
            var menu = [];
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
                        widget.meetingEvent.publish('meeting-DataGrid-on-dblclick', {model:Details});
                        require(['DS/ENXMeetingMgmt/View/Home/MeetingSummaryView'], function (MeetingSummaryView) {
                           // MeetingSummaryView.showHomeButton(true);
                        });
                    }
                }
            });
            return menu;
        };
        
        let meetingMaturityStateMenus = function(actions,id){
			// Display menu
            var menu = [];
            if(!actions){
            	return menu;
            }
            
          //TODO GDS5
          
			return menu;
		};
		
		Menu={
				meetingIdCardCheveron: (meetingDetails) => {return meetingIdCardCheveron(meetingDetails);},
				meetingIdCardStateCheveron: (modifyAccess,data,reqType) => {return meetingIdCardStateCheveron(modifyAccess,data,reqType);},
				meetingIdCardContextCheveron: (data) => {return meetingIdCardContextCheveron(data);},
				meetingTileCheveron: (actions,id) => {return meetingTileCheveron(actions,id);},
				meetingMaturityStateMenus: (actions,id) => {return meetingMaturityStateMenus(actions,id);},
				meetingGridRightClick: (event,data) => {return meetingGridRightClick(event,data);},
				meetingAgendaGridRightClick: (event,data) => {return meetingAgendaGridRightClick(event,data);}
	    };
		
		return Menu;
	});


/* global define, widget */
define('DS/ENXMeetingMgmt/Utilities/MeetingWidgetUtil',
        [
         'UWA/Core',
         'DS/ENXMeetingMgmt/Controller/MeetingController',
         'UWA/Class/Promise',
         'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
         'DS/ENXMeetingMgmt/Utilities/ParseJSONUtil',
         'DS/ENXMeetingMgmt/Collections/CollabStorageCollection',
         'DS/WAFData/WAFData',
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
         ],
         function(
                 UWACore,
                 MeetingController,
                 Promise,
                 EnoviaBootstrap,
                 ParseJSONUtil,
                 CollabStorageCollection,
                 WAFData,
                 NLS
         ) {
    'use strict';

    let MeetingWidgetUtil, _fetchSecurityContext,_onEdit,_endEdit,_onStorageChange,_onSpaceChange;
    var _nameInWidgetTitle,_storages,_editingPreferences = false, _editedPreferences = false;
    
    	 let init = function(){
    		 return new Promise(function(resolve, reject) {
    			 _storages = new CollabStorageCollection();
        		 EnoviaBootstrap.start({
    	                id: widget.id,
    	                collection: _storages
    	            });
        		 
        		 //check swym support
        		 /*let swymUrl=EnoviaBootstrap.getSwymUrl(); 
        		 if (swymUrl === undefined) {		 
        			  widget.meetingNotify.handler().addNotif({
    						level: 'warning',
    						subtitle: NLS.swymNotAvailable,
    					    sticky: false
        			  });
        		 }*/
        		 
        		 //Minimized content header preference
        		 widget.addPreference({
     	            name: "id-card-view",
     	            type: "hidden",
     	            defaultValue: "false",
     	            label: "minimized_label"
     	        });
        		 
        		 //Setting tenant and Security Context to widget preference
        		 setTenantAndSecurityContext().then(function(resp) {
        			 updateStateNLSMapping();
        			 resolve();
        		 }).catch((reason) => {
        			 //console.log(reason);
        		 });
        		 registerWidgetTitleEvents();   
    		 }); 		 
    	 };
    	 
    	 let setWidgetTitle = function (data){
    		 	var count = 0;
    		 	data.model.getChildren().forEach(node => {if(node._isHidden)count++;})
				var numOfMeetings=data.model.getChildren().length-count;
				var title = NLS.myMeetings + ' (' + numOfMeetings + ')';
				widget.setTitle(title);
    	 }
    	 
    	 let registerWidgetTitleEvents = function (){
	    	//Event to show meeting count 
    		 widget.meetingEvent.subscribe('meeting-widgetTitle-count-update', function (data) {
				 setWidgetTitle(data);
	           });
			 
			 //Event to show meeting title on the widget
			 widget.meetingEvent.subscribe('meeting-widgetTitle-update-withMeetingName', function (data) {
				 _nameInWidgetTitle = data.model.title;
				 var title = data.model.title;
				 widget.setTitle(title);
			 });
			 
			 widget.meetingEvent.subscribe('meeting-data-updated', function (data) {
				 if(data.subject != _nameInWidgetTitle){
					 var title = data.subject;
					 widget.setTitle(title);
				 }
			 });
    	 };
    	 
    	 let updateStateNLSMapping = function (){
    		 MeetingController.fetchStateMapping().then(function(jsonResp) {
    			 widget.setValue('stateNLS', jsonResp);
    		 }).catch((reason) => {
    			 //console.log(reason);
    		 });
    	 };
    	 
    	   function setTenantAndSecurityContext(){
    	    	 return new Promise(function(resolve, reject) {
    	    	 _storages.fetch({
    	             onComplete: function(collection, resp, options) {
    	                 migratePreferences();
    	                 initStorages.call(undefined, collection);
    	                 resolve();
    	             }
    	         });
    	     });
    	   };
    	    
    	   function migratePreferences() {
    	       var oldStorageValue, storageId, oldViewValue, viewValue;

    	       oldStorageValue = widget.getValue('collabstorage');
    	       if (oldStorageValue) {
    	           _storages.forEach(function(model) {
    	               if (model.get('url') === oldStorageValue) {
    	                   storageId = model.id;
    	               }
    	           });

    	           if (storageId) {
    	               widget.setValue('collab-storage', storageId);
    	           }
    	           widget.setValue('collabstorage', null);

    	       }
    	   }
    	   
    	   function updateCredentials() {
    		   
    		   setCredentials(function(){widget.dispatchEvent('onEdit', ['refreshPrefs']);}).then(
    				   success => {
    					  //Do nothing
    				   },
    				   failure => {
    					   console.log("Updating credentials failed!!")
    				   });
    		   
     		  // setCredentials(function(){widget.dispatchEvent('onEdit', ['refreshPrefs']);});
     	   }

    	   function initStorages(collection, callback) {
    	       if (!collection) {
    	           return;
    	       }  
    	       
    	      var selectedStorage,
	           storagePref = {
	               'type': 'list',
	               'name': 'collab-storage',
	               'label': '3DEXPERIENCE Platform',
	               'options': [],
	               'onchange': 'onStorageChange'
	           },
	           storageValue = widget.getValue('collab-storage');

	       // if storageValue = '', the property is not yet defined.
	       // Take the storage defined by the platform at the instanciation of
			// the widget (x3dPlatformId)
	       // Else, take the first storage of the list
	       if (storageValue === '') {
	           var x3dPlatformId = widget.getValue('x3dPlatformId');
	           selectedStorage = collection.get(x3dPlatformId);
	           if (!selectedStorage) {
	               selectedStorage = collection.at(0);
	           }
	           if (selectedStorage) {
	               widget.setValue('collab-storage', selectedStorage.id);
	           }
	       } else {
	           selectedStorage = collection.get(storageValue);
	       }

	       // Define the options and add them to the preference
	       collection.forEach(function(model) {
	           var storageId, storageName;
	           storageName = model.get('displayName').unescapeHTML();
	           storageId = model.get('id');
	           storagePref.options.push({
	               'label': storageName,
	               'value': storageId
	           });
	       });

	       // Hide the property if only 1 storage is available and it is
			// selected
	       if (collection.length === 1 && selectedStorage) {
	           storagePref.type = 'hidden';
	       }
	       widget.addPreference(storagePref);
	     // to get all collabspaces and add the credentials preference
		   setCredentials().then(
				   success => {
					 // Need to refresh pref once the credential is set
	       if (_editingPreferences) {
	           widget.dispatchEvent('onEdit', ['refreshPrefs']);

	           // If the storage from the preference is not retrieve anymore,
	           // pick the first when editing, so the list of storages will be
	           // fetched. But do not set the preference.
	           // The user will manually save the preference if he wants to.
	           if (!selectedStorage) {
	               selectedStorage = collection.at(0);
	           }
	       }
	       if (selectedStorage) {
	            onStorageChange('collab-storage', selectedStorage.id, callback);// acc2:Need
																				// to
																				// Test
	        } else {
	        	widget.meetingNotify.handler().addNotif({
	                subtitle: NLS.updatePreference,
	                level: 'warning'
	            });
	        }
				   },
				   failure => {
					   console.log("Updating credentials failed!!")
				   });
    	   }
    	   
    	   function setCredentials(callback) {
    		   return new Promise(function(resolve, reject) {
    		   MeetingController.fetchSecurityContext().then(
    	    	    	  success => {
    	    	    	  var myOpts=success[0].cspaces;
    	    	    	  if(success[0].defaultsc == null){
    	    	    		  myOpts = [{label: NLS.NoAccessToCollabSpace, value : ''}];
    	    	    	  }
    	    	    	  let selectedCS = success[0].defaultsc; //Initially the default sc set in 3dspace will be the selected CS
   					   let savedCS = widget.getValue("collabspace"); //the collabspace value which is already saved on this widget
   					   if(savedCS){
   						   var isValidCS = false;
   						   myOpts.forEach(function(csOption){
   							   if(csOption.value == savedCS){
   								   isValidCS = true;
   							   }
   						   });
   						   if(isValidCS){
       						   selectedCS = widget.getValue("collabspace");
       					   }
   					   }
    	    	    	  
    	    	      widget.addPreference({
    	                  name: 'collabspace',
    	                  type: 'list',
    	                  label: NLS.Credentials,
    	                  'onchange': 'onSpaceChange',
    	                  options: myOpts,
    	                  defaultValue: selectedCS,
						   disabled: selectedCS === null ? true : false
    	              });
    	    	      
    	    	      //We need to set the default value as value explicitly
					   widget.setValue("collabspace", selectedCS);
    	    	    
    	    	      //To show the correct tenant name in the widget header
    	    	      let csCredential = success[0].defaultsc ? success[0].defaultsc.replace("ctx::", "") : "";
    	    	      widget.setValue("xPref_CREDENTIAL",csCredential); 
    	    	     
    	    	      
    	    	      widget.addPreference({
    	                  name: 'organization',
    	                  type: 'hidden',
    	                  defaultValue: success[0].defaultOrgName,
    	              });
    	              
    	              if(widget.getPreference("collabspace")){
    	          		var isValidCS = false;
    	              	var csOptions = widget.getPreference("collabspace").options;
    	              	csOptions.forEach(function(csOption){
    	              		if(csOption.value == widget.getPreference("collabspace").value){
    	              			isValidCS = true;
    	              		}
    	  				});
    	              	if(!isValidCS || widget.getPreference("collabspace").value == undefined){
    	              		widget.setValue("collabspace", "");
    	              		
    	              	}
    	              }
    	            //We need to update the credentails if the storage change is called in the middle of editing preference
 		    		 //if the preference edit is done, then no need to call the updateCredentials() on storage change
 					   if(callback && !_editedPreferences){
 						   callback();
 					   } 
 					   resolve();
    	    	       },
    	    	       failure =>{
    	    	    	   var  myOpts = [{label: NLS.NoAccessToCollabSpace, value : ''}];
    	    	    	   var emptycollabspace={
    	    	    			   name: 'collabspace',
    	    	                   type: 'list',
    	    	                   label: NLS.Credentials,
    	    	                   'onchange': 'onSpaceChange',
    	    	                   options: myOpts,
    	    	                   value: myOpts[0].value,
    	    	                   defaultValue: myOpts[0].value,
    	    	                   disabled:  true 
    	    	    	   };
    	    	    	   
    	    	    	   widget.addPreference(emptycollabspace);
    					   var failureJson=JSON.parse(failure);
    	 				   if(failureJson.error){
    	 					  widget.meetingNotify.handler().addNotif({
    	 							level: 'error',
    	 							subtitle: failureJson.error.message,
    	 						    sticky: false
    	 						});
    	 					} else {
    	 						widget.meetingNotify.handler().addNotif({
    								level: 'error',
    								title: NLS.infoRefreshErrorTitle,
									subtitle: NLS.infoRefreshError,
    							    sticky: false
    							});
    						}
    	 				  reject();
    	 				});
    		   });
    	   }
    	   
    	   function onStorageChange(preferenceName, storageId, callback) {
    		   if(storageId == undefined){
    			   storageId=widget.getPreference("collab-storage").value;
    		   }
    		   var storage = _storages.get(storageId);
    	       EnoviaBootstrap.onStorageChange(storage, callback);
    	   };
    	   
    	   _onEdit= function(param) {
    	       _editingPreferences = true;
    	       _editedPreferences = false;
    	       if (param !== 'refreshPrefs') {
    	           // Define default values (loading)
    	           var storagePref = {
    	               'type': 'list',
    	               'name': 'collab-storage',
    						'label': 'storage_label',
    	               'options': [{
    							'label': 'loading',
    	                   'value': ''
    	               }],
    	               'onchange': 'onStorageChange'
    	           };
    	           widget.addPreference(storagePref);
    	           widget.dispatchEvent('onEdit', ['refreshPrefs']);

    	           // Update storages & Collab Spaces
    	           _storages.fetch({
    	               onComplete: function(collection, resp, options) {

    	                   var storage = initStorages.call(undefined, collection);
    	               }
    	           });
    	       }
    	   },

    	   _endEdit= function(param) {
    	   	var options = {};
    	  //This is to mark the preference edit has come to an end, either through 'save' or 'cancel' click
 		   _editedPreferences = true;
    	   	var securityContext = (widget.getPreference("collabspace") == undefined) ? "":widget.getPreference("collabspace").value;
    	   	if (securityContext.indexOf("ctx::") == 0)
    	   		securityContext = securityContext.split("ctx::")[1];
    	       _editingPreferences = false;
    	       if(_storages){
    			   EnoviaBootstrap.updateURLsOnEdit(_storages);
    		   }
    	   },
    	   
    	   _onStorageChange=function(preferenceName, storageId, callback) {
    		 //We need to update the credentails if the storage change is called in the middle of editing preference
    		   //if the preference edit is done, then no need to call the updateCredentials() on storage change
    		   if(callback==undefined && !_editedPreferences){
    			   callback=updateCredentials;
    		   }
    		   onStorageChange(preferenceName, storageId, callback);//acc2:Need to Test on Cloud
    	   },
    	   
    	   
    	   _onSpaceChange=function() {
    		   var securityContext = (widget.getPreference("collabspace") == undefined) ? "":widget.getPreference("collabspace").value;
    		   if (securityContext.indexOf("ctx::") == 0){
       	   		securityContext = securityContext.split("ctx::")[1];
    		   }
    		   var splitName = securityContext.split('.');

    		   widget.setValue('organization', splitName[1]);
    		   //To show the correct tenant name in the widget header
      		  // let csCredential = success[0].defaultsc ? success[0].defaultsc.replace("ctx::", "") : "";
      		   widget.setValue("xPref_CREDENTIAL",securityContext); 

    	   },
    	   
    	   
    	   
    	   MeetingWidgetUtil = {
    		init : () => { return init();}, 
    		onStorageChange : (param) => { return _onStorageChange(param);}, 
    		onSpaceChange : () => { return _onSpaceChange();},
    		onEdit : (param) => { return _onEdit(param);}, 
    		endEdit: (param) => {return _endEdit(param);},
    		registerWidgetTitleEvents  : () => { return registerWidgetTitleEvents();}, 
    };

    return MeetingWidgetUtil;

});

define('DS/ENXMeetingMgmt/View/Properties/MeetingIDCard', [
	'DS/ENXMeetingMgmt/View/Menu/MeetingContextualMenu',
	'DS/WebappsUtils/WebappsUtils',
	'DS/ResizeSensor/js/ResizeSensor',
	'DS/ENXMeetingMgmt/Utilities/IdCardUtil',
	'DS/ENXMeetingMgmt/Utilities/Utils',
	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
	'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css',
],
  function (MeetingContextualMenu, WebappsUtils, ResizeSensor, IdCardUtil, Utils, NLS) {
	'use strict';
	let meetingIdCard;
	var MeetingIDCard = function(container){
	  this.container = container;
	};
	
	MeetingIDCard.prototype.resizeSensor = function(){
		new ResizeSensor(meetingIdCard, function () {
			IdCardUtil.resizeIDCard(meetingIdCard.offsetWidth);
		});
	};
	
	MeetingIDCard.prototype.init = function(data,infoIconActive){
		//add all the required information in meetingHeader like meeting name 
		//Expander to expand the right panel
		meetingIdCard = new UWA.Element('div',{"id":"meetingIdCard","class":""});
		this.container.appendChild(meetingIdCard);
					
		var infoAndThumbnailSec = new UWA.Element('div',{"id":"infoAndThumbnailSec","class":"id-card-info-and-thumbnail-section"});
		meetingIdCard.appendChild(infoAndThumbnailSec);
		
		// Add thumbnail //
		var thumbnailSec = new UWA.Element('div',{
			"id":"thumbnailSection",
			"class":"id-card-thumbnail-section",
			"html":[
				  UWA.createElement('div',{
					  "class":"id-card-thumbnail",
					  styles:{
						  "background-image": "url("+WebappsUtils.getWebappsAssetUrl('ENXMeetingMgmt','icons/iconLargeMeeting.png')+")"
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
		
		var infoHeaderSecTitle = new UWA.Element('div',{"id":"infoHeaderSecTitle","class":"id-card-title-section"});
		infoHeaderSec.appendChild(infoHeaderSecTitle);
		UWA.createElement('h4',{
			  "html": [
				  UWA.createElement('span',{
					  "html": data.model.title,
					  "title": data.model.title
				  })]
		}).inject(infoHeaderSecTitle);
		
		// Header Section Actions //
		var infoHeaderSecAction = new UWA.Element('div',{"id":"infoHeaderSecAction","class":"id-card-actions-section"});
		infoHeaderSec.appendChild(infoHeaderSecAction);
		// header action - hide
		UWA.createElement('div',{
			"id" : "expandCollapse",
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-expand-up fonticon-display fonticon-color-display",
			"title" : NLS.idCardHeaderActionCollapse,
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	collapseExpand();
                }
			}
		}).inject(infoHeaderSecAction);
		// header action - cheveron 
		var meetingDetails = {};
		var meetingDetailsData = [];
		// Delete function accept the data in format of data grid model //
		// So converting the data here to grid format to reuse the functionality //
		var gridFormat = {};
		gridFormat.options = {};
		gridFormat.options.grid = data.model;
		meetingDetailsData.push(gridFormat);
		meetingDetails.data = meetingDetailsData;
		if(data.model.DeleteAccess == "TRUE"){
			MeetingContextualMenu.meetingIdCardCheveron(meetingDetails).inject(infoHeaderSecAction);
		}
		// header action - info
		var infoDisplayClass = "fonticon-color-display";
		if(infoIconActive){
			infoDisplayClass = "fonticon-color-active"; 
		}
		UWA.createElement('div',{
			"id":"meetingInfoIcon",
			"title": NLS.idCardHeaderActionInfo,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-info fonticon-display " + infoDisplayClass + " ",
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	widget.meetingEvent.publish('meeting-header-info-click', {model: data.model});
                }
			}
		}).inject(infoHeaderSecAction);
		
		// Info Detail Section //
		var infoDetailedSec = new UWA.Element('div',{"id":"infoDetailedSec","class":"id-card-detailed-info-section"});
		infoSec.appendChild(infoDetailedSec);
		
		// channel 1 //
		var infoChannel1 = new UWA.Element('div',{
													"id":"channel1",
													"class":"properties-channel"
												});
		infoDetailedSec.appendChild(infoChannel1);
		
		//meeting state
		  UWA.createElement('div',{
			  //"class":"maturity-state",
			  "class":"",
			  "html":[
				  UWA.createElement('label',{
					  "class": "",
					  "html": NLS.IDcardMaturityState + "&nbsp;:"
				  	}),
				  UWA.createElement('span',{
					  "class":"meeting-state-title "+data.model.state.toUpperCase().replace(/ /g,''),
					  "html": "&nbsp;" + data.model.Maturity_State + "&nbsp;",
					  styles:{
						  "margin-left": "5px"
					  }
				  	}),
				  	UWA.createElement('span',{
				  		"html": MeetingContextualMenu.meetingIdCardStateCheveron(data.model.modifyAccess,data.model,"idcard"),
				  		"class":"",
				  		styles:{
							  "margin-left": "5px"
						}
				  	})
				  ]}).inject(infoChannel1);
	
		// owner
		UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": NLS.IDcardOwner + "&nbsp;:&nbsp;",
					  "class":""
				  	}),
				  UWA.createElement('span',{
					  "html": data.model.OwnerFullName,
					  "class":""
				  	})
				  ]}).inject(infoChannel1);
		
		// coll space
		  var collabSpace = data.model.ProjectTitle;
		  if(!collabSpace){
			  collabSpace = data.model.Project;
		  }
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": NLS.IDcardCollSpace + "&nbsp;:&nbsp;",
					  "class":""
				  	}),
				  UWA.createElement('span',{
					  "html": collabSpace,
					  "class":""
				  	})
				  ]}).inject(infoChannel1);
		  
		  // channel 2 //
		  
		  var infoChannel2 = new UWA.Element('div',{
				"id":"channel2",
				"class":"properties-channel"
		  });
		  infoDetailedSec.appendChild(infoChannel2);
		  
		  // Start Date 
		  var date = new Date(data.model.startDate);
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": NLS.IDcardStartDate + "&nbsp;:&nbsp;",
					  "class":""
				  	}),
				  UWA.createElement('span',{
					  "html": Utils.formatDateTimeString(date),
					  "class":""
				  	})
				  ]}).inject(infoChannel2);
		  
		// duration
			UWA.createElement('div',{
				  "html":[
					  UWA.createElement('label',{
						  "html": NLS.IDcardDuration + "&nbsp;:&nbsp;",
						  "class":""
					  	}),
					  UWA.createElement('span',{
						  "html": data.model.duration,
						  "class":""
					  	})
					  ]}).inject(infoChannel2);
			
			// Context //
			var contextOpenWithData = {};
			contextOpenWithData.Id = data.model.ContextPhysicalId;
			contextOpenWithData.Type = data.model.ContextType;
			contextOpenWithData.Title = data.model.ContextName;
			
			  UWA.createElement('div',{
				  "html":[
					  UWA.createElement('label',{
						  "html": NLS.IDcardContext + "&nbsp;:&nbsp;",
						  "class":""
					  	}),
					  UWA.createElement('span',{
						  "html": data.model.ContextName || "-",
						  "title": data.model.ContextName || "-",
						  "class":"context-ellipsis"
					  	}),
					  UWA.createElement('span',{
					  		"html": MeetingContextualMenu.meetingIdCardContextCheveron(contextOpenWithData),
					  		"class":"",
					  		styles:{
								  "margin-left": "5px"
							}
					  	})
					  ]}).inject(infoChannel2);
		  
		  // Channel 3 //
		  
		  var infoChannel3 = new UWA.Element('div',{
				"id":"channel3",
				"class":"properties-channel"
		  });
		  infoDetailedSec.appendChild(infoChannel3);
		  
		  // Description
		  UWA.createElement('div',{
			  "class": "id-card-description",
			  "html":[
				  UWA.createElement('span',{
					  "html": data.model.Description,
					  "title": data.model.Description,
					  "class":""
				  	})
				  ]}).inject(infoChannel3);
    };
    MeetingIDCard.prototype.destroyContainer = function(){
    	//destroy container
    	this.container.destroy();
    };
    MeetingIDCard.prototype.destroyContent = function(){
    	//destroy content
    	meetingIdCard.destroy();
    };
    
    let collapseExpand = function(){
    	var expandCollapse = document.querySelector('#expandCollapse');
		  var meetingHeaderContainer = document.querySelector('#meetingHeaderContainer');
		  let agendaContainer = document.querySelector('.meeting-agenda-container');
		  let memberContainer = document.querySelector('.meeting-members-container');
		  let decisionContainer = document.querySelector('.decisions-facet-container');
		  let attachContainer = document.querySelector('.meeting-attachments-container');
		  if(expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1){
			  // collapse
			  expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
			  meetingHeaderContainer.classList.add('minimized');
			  expandCollapse.title = NLS.idCardHeaderActionExpand;
			  // handle the hide thumbnail case //
			  var thumbnailSection = document.querySelector('#thumbnailSection');
			  if(thumbnailSection && thumbnailSection.className.indexOf("id-card-thumbnail-remove") > -1){
				  var infoSec = document.querySelector('#infoSec');
				  infoSec.classList.remove("id-info-section-align");
				  infoSec.classList.add("id-info-section-align-minimized");
			  }
			  if(agendaContainer){agendaContainer.setStyle("height","calc(100% - 94px)");}
			  if(memberContainer){memberContainer.setStyle("height","calc(100% - 94px)");}
			  if(decisionContainer){decisionContainer.setStyle("height","calc(100% - 94px)");}
			  if(attachContainer){attachContainer.setStyle("height","calc(100% - 94px)");}
			  
		  }else{
			  // expand
			  expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-down", "wux-ui-3ds-expand-up");
			  meetingHeaderContainer.classList.remove('minimized');
			  expandCollapse.title = NLS.idCardHeaderActionCollapse;
			  // handle the hide thumbnail case //
			  var thumbnailSection = document.querySelector('#thumbnailSection');
			  if(thumbnailSection && thumbnailSection.className.indexOf("id-card-thumbnail-remove") > -1){
				  var infoSec = document.querySelector('#infoSec');
				  infoSec.classList.remove("id-info-section-align-minimized");
				  infoSec.classList.add("id-info-section-align");
			  }
			  if(agendaContainer){agendaContainer.setStyle("height","calc(100% - 156px)");}
			  if(memberContainer){memberContainer.setStyle("height","calc(100% - 156px)")};
			  if(decisionContainer){decisionContainer.setStyle("height","calc(100% - 156px)");}
			  if(attachContainer){attachContainer.setStyle("height","calc(100% - 156px)");}
		  }
    };
    
    return MeetingIDCard;
});


define('DS/ENXMeetingMgmt/View/Tile/MeetingSummaryTileView',
        [
         "DS/WAFData/WAFData",
         "UWA/Core",
         "DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView",
         'DS/ENXMeetingMgmt/View/Menu/MeetingContextualMenu',
         "DS/WebappsUtils/WebappsUtils",
         "DS/Core/PointerEvents",
         "DS/ENXMeetingMgmt/Utilities/DragAndDropManager",
         'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
         ],
         function (WAFData,
                 UWA,
                 WrapperTileView,
                 MeetingContextualMenu,
                 WebappsUtils,
                 PointerEvents,
				 DragAndDropManager,
                 NLS) {

    "use strict";

    let  _container, _model;
    /*
     * to build tile view
     * @params: model (mandatory) otherwise it will create an empty model
     */
    let build = function(model){
        if(model){
            _model = model;
            if (_model.getRoots().length>0) {
            	_model.getRoots().forEach((ele, i) => {
            		ele.options.customTooltip = model.getRoots()[i].options.grid.Name + ' - ' + model.getRoots()[i].options.grid.title;
            	});
            }
        }else{ //create an empty model otherwise TODO see if it's required
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        _container = UWA.createElement('div', {id:'TileViewContainer', 'class':'tile-view-container hideView'});
        let tileViewContainer = WrapperTileView.build(_model, _container, true); //true passed to enable drag and drop
        registerDragAndDrop();
        return tileViewContainer;
    };
    
    /*
     * to build Contextual menu on tile view
     * */

    let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                    var menu = [];
                    // var details = [];//TO Remove :details was added to pass as an argument to removeRoute method.
                    if (params && params.cellInfos) {
                        if (params.cellInfos.cellModel) {

                            var selectedNode = _model.getSelectedNodes();
                            var data= selectedNode[0].options.grid;
                            
                            menu=MeetingContextualMenu.meetingTileCheveron(data);
                        }
                    }
                    return menu; 
                }

        }
    };
    
    let registerDragAndDrop = function(){
    	let _tileView = WrapperTileView.tileView();
    	_tileView.onDragStartCell = function (dragEvent, info) {
			DragAndDropManager.getContentForDrag(dragEvent,info);
    	};
	    
	    _tileView.onDragEndCell = function (e, info){
	    	e.target.removeClassName('wux-ui-state-activated wux-ui-state-highlighted');
	    };
	    
	    _tileView.onDragEnterBlankDefault = function(event) {};
	    _tileView.onDragEnterBlank = function(event) {};
    };
    
    /*
     * Exposes the below public APIs to be used
     */
    let CustomMeetingSummaryTileView={
            build : (model) => { return build(model);},
            //myResponsiveTilesView: () => {return _myResponsiveTilesView();},
            contexualMenuCallback : () =>{return contexualMenuCallback();}, 
            destroy: () => {_myResponsiveTilesView.destroy();}

    };
    return CustomMeetingSummaryTileView;
});

/**
 * datagrid view for route summary page
 */
define('DS/ENXMeetingMgmt/View/Home/MeetingSummaryView',
		[   'DS/ENXMeetingMgmt/View/Grid/MeetingSummaryDataGridView',
		'DS/ENXMeetingMgmt/Config/Toolbar/MeetingSummaryToolbarConfig',
			'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
			'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
			'DS/ENXMeetingMgmt/View/Tile/MeetingSummaryTileView',
		    'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
            'DS/ENXMeetingMgmt/Model/MeetingModel',
            'DS/ENXMeetingMgmt/Utilities/PlaceHolder',
            'DS/ENXMeetingMgmt/Controller/MeetingController',
            'DS/Utilities/Array',
            'DS/Core/PointerEvents',
            'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
            ], function(MeetingSummaryDataGridView,
                    MeetingDataGridViewToolbar,
            		WrapperDataGridView,
            		WrapperTileView,
            		MeetingSummaryTileView,
                    EnoviaBootstrap,
					MeetingModel,
					PlaceHolder,
					MeetingController,
					ArrayUtils,
					PointerEvents,
					NLS
			) {

	'use strict';	
	
	let _fetchMeetingSuccess = function(success){
		MeetingModel.createModel(success);
		filterMeetingSummaryView();
		let containerDiv = drawMeetingSummaryView();
		if(!(widget.getPreference("collabspace") && widget.getPreference("collabspace").value)){
			showError(containerDiv);
			//TODO GDS5 : NLS needs to change
			widget.meetingNotify.handler().addNotif({
				title: NLS.errorCreateMeetingForRoleTitle,
				subtitle: NLS.errorCreateMeetingForRoleSubTitle,
                level: 'warning',
                sticky: false
            });
		}else{
			PlaceHolder.hideeErrorPlaceholder(containerDiv);
		}
		return containerDiv;
	};
	
	let _fetchMeetingFailure = function(failure){
		let containerDiv=document.querySelector(".widget-container");
		showError(containerDiv);
		
		var failureJson = '';
		try{
			failureJson = JSON.parse(failure);
		}catch(err){
			//DO Nothing
		}

		if(failureJson.error){
			widget.meetingNotify.handler().addNotif({
				level: 'error',
				subtitle: failureJson.error,
			    sticky: false
			});
		}else{
			widget.meetingNotify.handler().addNotif({
				level: 'error',
				title: NLS.infoRefreshErrorTitle,
				subtitle: NLS.infoRefreshError,
			    sticky: false
			});
		}
	};
	
	let _openSingleMeeting = function(){
		let meetingId;
		//for notification
		if(typeof widget.data.ids != "undefined"){
			meetingId = widget.data.ids;
		}
		//to support 'open with' protocol
		if(widget.data.contentId){
			meetingId = widget.data.contentId;
		}
		if(widget.data.meetingId){
			meetingId = widget.data.meetingId;
		}
		return meetingId;
	};
	
	let clearMeetingIdInfo = function(){
		if(typeof widget.data.ids != "undefined"){
			widget.data.ids = undefined;
		}
		if(widget.data.contentId){
			widget.data.contentId = undefined;
		}
		if(widget.data.meetingId){
			widget.data.meetingId = undefined;
		}
	};
	
	let build = function(){
		let meetingId = _openSingleMeeting();
		if(meetingId){ //To show single route
			return new Promise(function(resolve, reject) {
				MeetingController.fetchMeetingById(meetingId).then(				
					success => {
						let containerDiv = _fetchMeetingSuccess(success);
						resolve(containerDiv);  
					},
					failure =>{
						_fetchMeetingFailure(failure);
					});
			});		
		}else{ //To show all the meetings
			return new Promise(function(resolve, reject) {
				MeetingController.fetchAllMeetings().then(				
					success => {
						let containerDiv = _fetchMeetingSuccess(success);
						resolve(containerDiv);
					},
					failure =>{
						_fetchMeetingFailure(failure);
					});
			});		
		}
	};
	
   function showError(containerDiv){
			if(!containerDiv){
				containerDiv = new UWA.Element('div',{"class":"widget-container"});
				containerDiv.inject(widget.body);
			}
			PlaceHolder.hideEmptyMeetingPlaceholder(containerDiv);
			PlaceHolder.showeErrorPlaceholder(containerDiv);
	}
	
	let drawMeetingSummaryView = function(serverResponse){
		var model = MeetingModel.getModel();
		let datagridDiv = MeetingSummaryDataGridView.build(model);	
		//To add the Tile view summary list
		let tileViewDiv= MeetingSummaryTileView.build(model);
		MeetingSummaryTileView.contexualMenuCallback();
		registerListners();
		  
		//get the toolbar
		let homeToolbar=MeetingSummaryDataGridView.getGridViewToolbar();
		//homeToolbar.inject(toolBarContainer);
		//Add all the divs into the main container
		let container=document.querySelector(".widget-container");
		let containerDiv;
		if(!container){
		 containerDiv = new UWA.Element('div',{"class":"widget-container"});
		}else{
			containerDiv=container;
		}
		let toolBarContainer = UWA.createElement('div', {id:'dataGridDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
		homeToolbar.inject(toolBarContainer);
		//  that.containerDiv.appendChild(toolbarDiv); //Required if we are adding the toolbar directly, not on the datagrid view
		datagridDiv.inject(containerDiv);
		tileViewDiv.inject(containerDiv);
		
		if (model.getChildren().length ==0) {				
		    PlaceHolder.showEmptyMeetingPlaceholder(containerDiv,model);
        } else {        	
        	model.prepareUpdate();
			var count = 0;
			model.getChildren().forEach(node => {if(node._isHidden)count++;})
			model.pushUpdate();
			if(count == model.getChildren().length){
				 PlaceHolder.showEmptyMeetingPlaceholder(containerDiv,model);
			}			
        }
		widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model});
		PlaceHolder.registerListeners();
		//showHomeButton(false);
		return containerDiv;
	};
	
	let filterMeetingSummaryView = function(){    	
    	var owner = EnoviaBootstrap.getLoginUser();
		var filterOptions = getFilterPreferences();		
		var model = MeetingModel.getModel();
		let selectedNode= model.getSelectedNodes();
		
		model.prepareUpdate();  
		ArrayUtils.optimizedForEach(model.getChildren(), function(node) {
		    var attendeesList = node.options.grid.Assignees;
		    var isAttendee = "false";
		    for(var i=0;i<attendeesList.length;i++){
		       if(attendeesList[i].name == owner){
		         isAttendee = "true";
		         break;
		       }
		    }
			if ((filterOptions.indexOf("assigned") >= 0 && filterOptions.indexOf("owned") >= 0) || (filterOptions.indexOf("owned") >= 0 && node.options.grid.ownerFilter == owner) || (filterOptions.indexOf("assigned") >= 0 && node.options.grid.Assignees && isAttendee=="true" )){		
				if(filterOptions.indexOf(node.options.grid.actualState)  >= 0 ){
					node.show();
				} else {
					node.hide();
				}			
			} else {
				node.hide();
			}			
		});
		var count = 0;
		
		model.getChildren().forEach(node => {if(node._isHidden)count++;})
		model.pushUpdate();	
		/*if(selectedNode && selectedNode.length==1 && selectedNode[0]._isHidden){
			backToMeetingSummary();
		}*/
		if(selectedNode.length == 0 || (document.querySelector(".right-container") && document.querySelector(".right-container").getStyle("width") == "0px")){
			widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model});
		}
		
		let container=document.querySelector(".widget-container");
		if(container!=null){
			if(model.getChildren().length == count){
			//TODO GDS5 
				PlaceHolder.showEmptyMeetingPlaceholder(container,model);
			}else{
				PlaceHolder.hideEmptyMeetingPlaceholder(container);
			}
		}
		
	};
	
	let getFilterPreferences = function(){
    	var pref = widget.getValue("meetingfilters");
    	if(_openSingleMeeting()){// while opening single meeting, select all the filters
    		widget.setValue("meetingfilters", ['owned','assigned', "Create", "Scheduled", "In Progress", "Complete"]);
    		return ['owned','assigned', "Create", "Scheduled", "In Progress", "Complete"];
    	}
    	if(pref == undefined){    		
    		widget.setValue("meetingfilters", ['owned','assigned', "Create", "Scheduled", "In Progress"]);
    		return ['owned','assigned', "Create", "Scheduled", "In Progress"];
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
	let registerListners = function(){
    	let dataGridView = WrapperDataGridView.dataGridView();
    	//Dispatch events on dataGrid
    	dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
    	dataGridView.addEventListener('contextmenu', openContextualMenu);
    	let tileView = WrapperTileView.tileView();
    	//Dispatch events on tile view
    	// TODO : GDS5 - To add this and test for tile view - HRL1//
    	tileView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);  	
    	addorRemoveRouteEventListeners();
    	
	};
	
	let addorRemoveRouteEventListeners = function(){

		widget.meetingEvent.subscribe('meeting-summary-append-rows', function (data) {
			let node = MeetingModel.appendRows(data);
			MeetingSummaryDataGridView.getDataGridInstance().ensureNodeModelVisible(node, true);
			//showHomeButton(true);
			node.select();
		}); 
		
		widget.meetingEvent.subscribe('meeting-summary-show-message', function (message) {
			widget.meetingNotify.handler().addNotif(message.message);			
		}); 
		
		widget.meetingEvent.subscribe('route-summary-delete-rows', function (index) {
			MeetingModel.deleteRowModelByIndex(index);				
		}); 
		widget.meetingEvent.subscribe('meeting-summary-delete-row-by-ids', function (data) {
			if(data.model.length > 0){				
				MeetingModel.deleteRowModelByIds(data.model);					
			}
		}); 
		widget.meetingEvent.subscribe('meeting-summary-delete-selected-rows', function () {
			MeetingModel.deleteRowModelSelected();			
		});
		widget.meetingEvent.subscribe('meeting-data-updated', function (data) {
			MeetingModel.updateRow(data);		
			filterMeetingSummaryView();
		}); 
	};

	let onDoubleClick = function (e, cellInfos) {
		//  that.onItemClick(e, cellInfos);
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.multipleHitCount == 2) {
	    			cellInfos.nodeModel.select(true);
	    			widget.meetingEvent.publish('meeting-DataGrid-on-dblclick', {model:cellInfos.nodeModel.options.grid});
	    			//showHomeButton(true);               
		     }
		}
	};
	
	let showHomeButton = function(flag){
		let meetingSummaryToolbar = MeetingSummaryDataGridView.getGridViewToolbar();
		let backIcon = meetingSummaryToolbar.getNodeModelByID("back");
        if (backIcon) {
          backIcon.updateOptions({
            visibleFlag: flag
          });
        }
	};
	
	let openContextualMenu = function (e, cellInfos) {
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.button == 2) {
		    	  require(['DS/ENXMeetingMgmt/View/Menu/MeetingContextualMenu'], function (MeetingContextualMenu) {
					MeetingContextualMenu.meetingGridRightClick(e,cellInfos.nodeModel.options.grid);
				});           
		     }
		}
	};
	
	let backToMeetingSummary = function () {
    	//showHomeButton(false);
    	//TODO code to change tile view to grid view
    	widget.meetingEvent.publish('meeting-back-to-summary');
    	widget.meetingEvent.publish('meeting-widgetTitle-count-update',{model:MeetingModel.getModel()});
    	widget.setValue('openedMeetingId', undefined);
    };
    
	let destroy = function(){		
		MeetingModel.destroy();
	};
	
	let updateFilterPreferences = function(filter, append){
    	var pref = widget.getValue("meetingfilters");	 
    	const index = pref.indexOf(filter);
		if(append){			
			if (index <= -1) {
				pref.push(filter);
			}
		} else {			
			if (index > -1) {
				pref.splice(index, 1);
			}			
		}	    		
		widget.setValue("meetingfilters", pref);
    };
    
    let openSelectedMeeting = function(){
		let meetingId = _openSingleMeeting();
		if(!meetingId && widget.getValue('openedMeetingId')){
			meetingId = widget.getValue('openedMeetingId');
			widget.setValue('openedMeetingId', undefined);
		}
		if(meetingId){
			clearMeetingIdInfo();
			let meetingModel = MeetingModel.getRowModelById(meetingId);
			if(meetingModel){
				meetingModel.select(true);
				widget.meetingEvent.publish('meeting-DataGrid-on-dblclick', {model:meetingModel.options.grid});
				//showHomeButton(true); 
			}else{
				backToMeetingSummary();
			}
		}
	};

	let MeetingSummaryView = {
		build : () => { return build();},
		getFilterPreferences : () => {return getFilterPreferences();},
		updateFilterPreferences : (filter, append) => {return updateFilterPreferences(filter, append);},
		destroyAndRedrawwithFilters : () => {filterMeetingSummaryView();},
		destroy : () => {destroy();},
		backToMeetingSummary: () => {return backToMeetingSummary();},
		showHomeButton: (flag) => {return showHomeButton(flag);},
		openSelected: () => {return openSelectedMeeting();}
		
	};

	return MeetingSummaryView;
});

/**
 * This file is a wrapper file to create toolbars in the app. Currently not being used
 */

define('DS/ENXMeetingMgmt/Actions/Toolbar/MeetingSummaryToolbarActions',
		[	'DS/ENXMeetingMgmt/View/Grid/MeetingSummaryDataGridView',
			'DS/ENXMeetingMgmt/View/Home/MeetingSummaryView'
			], function(MeetingSummaryDataGridView, MeetingSummaryView) {
	
	'use strict';
	
	var service = Object.create(null);
    service.currentView = "Grid";
    service.previousView = "Grid";
    
    
    var applyfilterView = function(view,option){
    	var viewIcon = MeetingSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");
    	
    	var append = true;
        if(view.type == "owner"){  
        	if(view.filter == "owned"){
	        	if(viewIcon.options.grid.data.menu[0].state=="selected"){
	        		viewIcon.options.grid.data.menu[0].state="unselected";
	        		append = false;
	        	} else {
	        		viewIcon.options.grid.data.menu[0].state="selected";
	        	}
        	} else if(view.filter == "assigned"){        	
            	if(viewIcon.options.grid.data.menu[1].state=="selected"){
            		viewIcon.options.grid.data.menu[1].state="unselected";
            		append = false;
            	} else {
            		viewIcon.options.grid.data.menu[1].state="selected";
            	}
        	}
           
        	MeetingSummaryView.updateFilterPreferences(view.filter, append);
        	MeetingSummaryView.destroyAndRedrawwithFilters();
           // highligting the selected filter
           
           if(viewIcon && viewIcon.options.grid.semantics.icon.iconName != "list-ok"){
             viewIcon.updateOptions({
               label:"list-ok"
             });
           }
          //when initial load false then only call the service
          if(option==false && option!=undefined){
        }

        } else if(view.type == "state"){
        	 var viewIcon = MeetingSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");
        	 var append = true;
        	if(view.filter == "completed"){
	        	if(viewIcon.options.grid.data.menu[6].state=="selected"){
	        		viewIcon.options.grid.data.menu[6].state="unselected";
	        		append = false;
	        	} else {
	        		viewIcon.options.grid.data.menu[6].state="selected";
	        	}
	        	view.filter = "Complete";
        	}else if(view.filter == "InProgress"){        	
            	if(viewIcon.options.grid.data.menu[5].state=="selected"){
            		viewIcon.options.grid.data.menu[5].state="unselected";
            		append = false;
            	} else {
            		viewIcon.options.grid.data.menu[5].state="selected";
            	}
            	view.filter = "In Progress";
        	} else if(view.filter == "Scheduled"){        	
            	if(viewIcon.options.grid.data.menu[4].state=="selected"){
            		viewIcon.options.grid.data.menu[4].state="unselected";
            		append = false;
            	} else {
            		viewIcon.options.grid.data.menu[4].state="selected";
            	}
            	view.filter = "Scheduled";
        	} else if(view.filter == "draft"){        	
            	if(viewIcon.options.grid.data.menu[3].state=="selected"){
            		viewIcon.options.grid.data.menu[3].state="unselected";
            		append = false;
            	} else {
            		viewIcon.options.grid.data.menu[3].state="selected";
            	}
            	view.filter = "Create";
        	}
        	
        	MeetingSummaryView.updateFilterPreferences(view.filter, append);
        	MeetingSummaryView.destroyAndRedrawwithFilters();
        	
            if(viewIcon && viewIcon.options.grid.semantics.icon.iconName != "list-delete"){
             viewIcon.updateOptions({
                label:"list-delete"
              });
            }
        }
      };

    
	var changeOwnerFilter =  function (d) {
		applyfilterView(d);
    };
    var changeStateFilter =  function (d) {
		applyfilterView(d);
    };
	
	var MeetingToolbarFilterActions = {		
			changeOwnerFilter: (d) => {return changeOwnerFilter(d);},	
			changeStateFilter: (d) => {return changeStateFilter(d);}
	};
	return MeetingToolbarFilterActions;
});

define('DS/ENXMeetingMgmt/View/Properties/MeetingIDCardFacets', [
  'DS/ENXMeetingMgmt/View/Properties/MeetingIDCard',
  'DS/ENXMeetingMgmt/View/Facets/MeetingTabs',
  'DS/ENXMeetingMgmt/Utilities/IdCardUtil',
  'DS/ENXMeetingMgmt/Utilities/DataFormatter'
],
  function (MeetingIDCard, MeetingTabs, IdCardUtil, DataFormatter) {
	'use strict';
	let headerContainer, facetsContainer, idLoaded, meetingDataUpdatedToken, meetingDataDeletedToken, meetingIDcardRedrawToken;
	const destroyViews = function(){
		new MeetingIDCard(headerContainer).destroyContainer();
		new MeetingTabs(facetsContainer).destroy();
		if(meetingDataUpdatedToken){
    		widget.meetingEvent.unsubscribe(meetingDataUpdatedToken);
    	}
		if(meetingDataDeletedToken){
    		widget.meetingEvent.unsubscribe(meetingDataDeletedToken);
    	}
    };
	var MeetingIDCardFacets = function(rightPanel){
		this.rightPanel = rightPanel;
	  	headerContainer = new UWA.Element('div',{"id":"meetingHeaderContainer","class":"meeting-header-container"});
	  	facetsContainer = new UWA.Element('div',{"id":"meetingFacetsContainer","class":"meeting-facets-container"});	 	
	};
	MeetingIDCardFacets.prototype.init = function(data){	
		destroyViews(); //to destroy any pre-existing views
		var infoIconActive = false;
		new MeetingIDCard(headerContainer).init(data,infoIconActive);
		idLoaded = data.model.id;
		new MeetingTabs(facetsContainer, data).init();
		
	 	this.rightPanel.getLeftViewWrapper().appendChild(headerContainer);
	 	this.rightPanel.getLeftViewWrapper().appendChild(facetsContainer);
	 	
	 	new MeetingIDCard(headerContainer).resizeSensor();
	 		 	
	 	// Events //
	 	meetingDataUpdatedToken = widget.meetingEvent.subscribe('meeting-data-updated', function (data) {
	 		var dataModel = {model:DataFormatter.gridData(data)};
	 		// check if meeting details updated are same loaded in the id card //
	 		// Case when meeting1 is loaded and in meeting summary page user does action on meeting2 //
	 		// then do not refresh id card //
	 		if(dataModel.model.id == idLoaded){
	 			// On meeting properties save, refresh only header data //
	 			// Clear the existing id card header data. Do no destroy the container, only content for refresh header data//
	 			var infoIconActive = IdCardUtil.infoIconIsActive();      
	 			new MeetingIDCard(headerContainer).destroyContent();
	 			new MeetingIDCard(headerContainer).init(dataModel,infoIconActive);
	 			new MeetingIDCard(headerContainer).resizeSensor();
	 		    IdCardUtil.resizeIDCard(headerContainer.offsetWidth);
	 			if(widget.propWidgetOpen){
	        		 // To persist the edit prop widget open //
	 				if(data.requestFrom && data.requestFrom == "editPropWidget"){
	 					// do not refresh the edit prop widget // 
	 					// the request is coming from edit prop widget itself //
	 				}else{
	 					widget.meetingEvent.publish('meeting-header-info-click', {model: dataModel.model});
	 				}
	        	}
	 		}
	 	});
	 	
	 	meetingDataDeletedToken = widget.meetingEvent.subscribe('meeting-data-deleted', function (data) {
	 		if(data.model.includes(idLoaded)){
	 			// close the id card only if the meeting opened in id card is been deleted and go to meeting home summary page //
	 			require(['DS/ENXMeetingMgmt/View/Home/MeetingSummaryView'], function (MeetingSummaryView) {
	 				MeetingSummaryView.backToMeetingSummary();
	 			});
	 		}
	 	});
	 	
	   //idcard redraw
	/*   meetingIDcardRedrawToken = widget.meetingEvent.subscribe('idCard-resizeIDCard', function (data) {
	 		new MeetingIDCard(headerContainer).resizeSensor();
	 		
	 	}); */
	 	
    };
    MeetingIDCardFacets.prototype.destroy = function(){
    	//destroy
    	this.rightPanel.destroy();
    };
    
    return MeetingIDCardFacets;

  });

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXMeetingMgmt/View/Menu/MemberContextualMenu', [
        'DS/Menu/Menu',
        'DS/ENXMeetingMgmt/Actions/MeetingActions',
        'DS/ENXMeetingMgmt/View/Dialog/RemoveMembers',
        'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
        'DS/ENXMeetingMgmt/Model/MeetingMembersModel',
        'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
        'DS/ENXMeetingMgmt/Model/MeetingModel',
        'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting',
        'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'], 
    function( WUXMenu, MeetingActions,RemoveMembers, WrapperTileView, MeetingMembersModel, EnoviaBootstrap,MeetingModel, NLS){
        'use strict';
        let Menu;
        let memberGridRightClick = function(event,data){
			// To handle multiple selection //
        	// This will avoid unselecting the selected rows when click on actions //
        	event.preventDefault();
            event.stopPropagation();
			var pos = event.target.getBoundingClientRect();
            var config = {
            		position: {
            			x: pos.left,
                        y: pos.top + 20
                    }
            };
            var selectedDetails = MeetingMembersModel.getSelectedRowsModel();
            var menu = [];
        	menu = menu.concat(deleteMenu(selectedDetails,false));
        	WUXMenu.show(menu, config);
		};
		
		let memberTileCheveron = function(actions,id){

		    var selectedDetails = MeetingMembersModel.getSelectedRowsModel();
		    var menu = [];
		    menu = menu.concat(deleteMenu(selectedDetails,false));
		    return menu;     
		};
        
        let deleteMenu = function(removeDetails,actionFromIdCard){
			// Display menu
        	let model = MeetingModel.getModel();
			var tileView=WrapperTileView.tileView();
		    var meetingModel = tileView.TreedocModel.meetingModel;
		    let deleteAccess = meetingModel.DeleteAccess;
			var menu = [];
			if(deleteAccess == "TRUE" && meetingModel.state == "Create") {
				 menu.push({
		                name: NLS.Remove,
		                title: NLS.Remove,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                      RemoveMembers.removeConfirmation(removeDetails,actionFromIdCard);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
      
        
        Menu={
            memberTileCheveron: (actions,id) => {return memberTileCheveron(actions,id);},
            memberGridRightClick: (event,data) => {return memberGridRightClick(event,data);}
        };
        
        return Menu;
    });


/**
 * 
 *
 */
define('DS/ENXMeetingMgmt/View/Home/SummarySplitView',
['DS/ENXMeetingMgmt/Components/Wrappers/SplitView',
'DS/ENXMeetingMgmt/View/Properties/MeetingIDCardFacets',
'DS/ENXMeetingMgmt/View/Home/RightPanelSplitView',
'DS/ENXMeetingMgmt/Utilities/IdCardUtil'
	],
function(SplitView, MeetingIDCardFacets, RightPanelSplitView, IdCardUtil) {

    'use strict';
    var SummarySplitView = function () { };
    /**
     * SummarySplitView to show the right side slidein.
     * @param  {[Mediator]} applicationChannel [required:Mediator object for communication]
     *
     */
    SummarySplitView.prototype.getSplitView = function (appChannel) {
        var sView = new SplitView();
        var split_options = {
          modelEvents: appChannel,
          withtransition: false,
          withoverflowhidden: false,
          params: {
        	// leftWidth calculates width and left position   
            leftWidth: 25,
            rightWidth: 75,
			leftMinWidth:25,
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
      
      SummarySplitView.prototype.setSplitviewEvents = function(splitView){
          var me = splitView;
          var selectedId = "";
          
          // right panel for properties and other slide in //
          let rightPanel = new RightPanelSplitView().getSplitView(widget.meetingEvent.getEventBroker());
          new RightPanelSplitView().setSplitviewEvents(rightPanel);
          var leftContent = me.getRightViewWrapper();
          leftContent.setContent(rightPanel.getContent());
          me.addRightPanelExpander();
          
          let meetingIDCardFacets = new MeetingIDCardFacets(rightPanel);
          widget.meetingEvent.subscribe('meeting-DataGrid-on-dblclick', function (data) {
        	  
        	  meetingIDCardFacets.init(data);
        	  	me._showSide("right");
        	  	me._hideLeft();
        	  	// To persist the ID card collapse //
        	  	IdCardUtil.collapseIcon();
        	  if(widget.propWidgetOpen){
        		  // To persist the edit prop widget open //
        		  widget.meetingEvent.publish('meeting-header-info-click', {model: data.model});
        	  }else{
        		  // If any other right panel is opened close it //
        		  widget.meetingEvent.publish('meeting-task-close-click-view-mode', {model: data.model});
        		  widget.meetingEvent.publish('meeting-task-close-click-edit-mode', {model: data.model});
        	  }
        	  widget.meetingEvent.publish('meeting-widgetTitle-update-withMeetingName', {model: data.model});
          });
          
          widget.meetingEvent.subscribe('meeting-back-to-summary', function (data) {
        	  if (!me._leftVisible) {
        		  me._showSide("left");
        	  }
              if (me._rightVisible) {
                me._hideSide("right");
              }
            });
      };


   return SummarySplitView;

});

/* global define, widget */
/**
 * @overview Meeting
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 2.0.
 * @access private
 */

define('DS/ENXMeetingMgmt/View/Widget/ENOMeetingInit', [ 
		'UWA/Class',
		'UWA/Class/Promise', 
		'UWA/Core',
		'DS/ENXMeetingMgmt/Components/MeetingEvent',
		'DS/ENXMeetingMgmt/Components/MeetingNotify',
		'DS/ENXMeetingMgmt/View/Home/SummarySplitView',
	    'DS/Windows/ImmersiveFrame',
		'DS/ENXMeetingMgmt/Utilities/MeetingWidgetUtil',
		'DS/ENXMeetingMgmt/View/Home/MeetingSummaryView',
		'DS/ENXMeetingMgmt/View/Dialog/CreateMeetingDialog',
		'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css' ],
		function(Class, Promise, UWA , MeetingEvent, MeetingNotify, SummarySplitView, WUXImmersiveFrame,MeetingWidgetUtil,MeetingSummaryView,CreateMeetingDialog) {
	'use strict';
	var container = null;
	var Application = Class.extend({
		name : 'Meeting',
		/**
		 * See UWA documentation.
		 * @inheritDoc
		 */
		onLoad : function(options) {
			var that = this;
			//initialize the Notification to enable the alert messages
			widget.meetingNotify = new MeetingNotify();
			
			//initialize the MeetingEvent to enable interactions among components
			widget.meetingEvent = new MeetingEvent(); //setting channel as global for communication between components
			
			//initialize widget preferences
			//initialize the component only after tenant and security contexts information are saved in widget.
			MeetingWidgetUtil.init().then(function(resp) {
				return that._initializeComponent({});
			});	
		},

		onRefresh : function() {
			var that = this;
			return new Promise(function(resolve, reject) {
				MeetingSummaryView.destroy();
				if(container!=null){
					container.destroy();
				}
				widget.meetingEvent.destroy();
				widget.meetingEvent=new MeetingEvent();
				MeetingWidgetUtil.registerWidgetTitleEvents();
				CreateMeetingDialog.registerDialogButtonEvents();
				resolve();
			}).then(function() {
				return that._initializeComponent({});
			});
		},
		
		onEdit : function(param) {
			MeetingWidgetUtil.onEdit(param);
		},
		
		endEdit : function(param) {
			MeetingWidgetUtil.endEdit(param);
		},
		
		onStorageChange : function(param) {
			MeetingWidgetUtil.onStorageChange(param);
		},
		
		onSpaceChange : function() {
			MeetingWidgetUtil.onSpaceChange();
		},

		/**
		 * Initialize the component.
		 * @param {Object} options - The options.
		 * @return {Promise} Returns a promise to know when the component is initialized.
		 * @private
		 */
		_initializeComponent : function(options) {
			
			var containerDiv = null;

			return new Promise(
					function(resolve /*, reject*/) {

						require([ 'UWA/Core',
								'DS/ENXMeetingMgmt/View/Home/MeetingSummaryView',
								'DS/ENXMeetingMgmt/Services/MeetingServices'],
								function(UWAModule, MeetingSummaryView, MeetingServices) {
								
									MeetingServices.getCustomPropertiesFromDB().then((res) => {
											console.log("fetched object custom attributes from DB");
											console.log(res);
											if (res&&Object.keys(res).length&&Object.keys(res).length>0&&res[Object.keys(res)[0]].length&&res[Object.keys(res)[0]].length>0) {
												widget.setValue('customFields', res);
											}
									})
									.catch((err) => {console.log(err)})
									.finally(() =>{
										MeetingSummaryView.build().then(
											function(container) {
												containerDiv = container;
												resolve();
											}).catch((err)=>{console.log(err); resolve();});
											console.log("end widget custom field setting");
									});

									/*MeetingSummaryView.build().then(
											function(container) {
												containerDiv = container;
												resolve();
											});*/

								});

					}).then(function() {
				return new Promise(function(resolve, reject) {
					// middle container
					let middleDetailsContainer = new SummarySplitView().getSplitView(widget.meetingEvent.getEventBroker());
					new SummarySplitView().setSplitviewEvents(middleDetailsContainer);
					middleDetailsContainer.getLeftViewWrapper().appendChild(containerDiv);
					container = new WUXImmersiveFrame();
					container.setContentInBackgroundLayer(middleDetailsContainer.getContent());
					container.reactToPointerEventsFlag = false;
					container.inject(widget.body);

					//move the data grid view down as per toolbar height
					let
					toolbarHeight = document.getElementsByClassName('toolbar-container')[0].getDimensions().height;
					// Required if we are adding the toolbar directly, not on the datagrid view
					// document.getElementsByClassName('data-grid-container')[0].firstElementChild.setStyle("top", toolbarHeight+"px");
					//document.getElementsByClassName('data-grid-container')[0].getChildren()[1].setStyle("top", 45+"px");
					document.getElementsByClassName('widget-container')[0].getChildren()[0].setStyle("top", 45 + "px");
					
					//if it is open from 'open with' or 'notification', then open the right panel with the selected meeting
					MeetingSummaryView.openSelected();
					resolve();
				});
			});
		}
	});

	return Application;
});

/**
 * datagrid view for route summary page
 */
define('DS/ENXMeetingMgmt/View/Tile/MeetingMemberTileView',
        [   
            'DS/ENXMeetingMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENXMeetingMgmt/View/Menu/MemberContextualMenu',
            'css!DS/ENXMeetingMgmt/ENXMeetingMgmt.css'
            ], function(
                    WrapperTileView,
                    MemberContextualMenu
            ) {

    'use strict';   
    let _model;
    let build = function(model){
        if(model){
            _model = model;
        }else{ 
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        var tileViewDiv = UWA.createElement("div", {id:'tileViewContainer',
            'class': "Members-tileView-View hideView"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv);
        return dataTileViewContainer;
    };  

   let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                    var menu = [];
                    if (params && params.cellInfos) {
                        if (params.cellInfos.cellModel) {

                            var selectedNode = _model.getSelectedNodes();
                            var actions= selectedNode[0].options.grid.Actions;
                            var id=selectedNode[0]._options.grid.id;
                            menu=MemberContextualMenu.memberTileCheveron(actions,id);
                        }
                    }
                    return menu; 
                }

        }
    };

    let MeetingMembersTileView={
            build : (model) => { return build(model);} ,
            contexualMenuCallback : () =>{return contexualMenuCallback();}

    };

    return MeetingMembersTileView;
});

/**
 * 
 */
define('DS/ENXMeetingMgmt/View/Facets/MeetingMembers',
        [   'DS/ENXMeetingMgmt/Controller/MeetingController',
        	'DS/ENXMeetingMgmt/Model/MeetingMembersModel',
        	'DS/ENXMeetingMgmt/View/Grid/MeetingMemberDataGridView',
        	'DS/ENXMeetingMgmt/Config/Toolbar/MeetingMemberTabToolbarConfig',
        	'DS/ENXMeetingMgmt/Components/Wrappers/WrapperDataGridView',
        	'DS/ENXMeetingMgmt/View/Tile/MeetingMemberTileView',
        	'DS/ENXMeetingMgmt/Utilities/DataFormatter',  
        	'DS/ENXMeetingMgmt/Model/MeetingModel',
        	'DS/ENXMeetingMgmt/Controller/EnoviaBootstrap',
        	'i18n!DS/ENXMeetingMgmt/assets/nls/ENOMeeting'
            ], function(MeetingController,
                        MeetingMembersModel,
                        MeetingMemberDataGridView,
                        MeetingMemberTabToolbarConfig,
                        WrapperDataGridView,
                        MeetingMemberTileView,
                        DataFormatter,
                        MeetingModel,
                        EnoviaBootstrap,
                        NLS
            ) {

    'use strict';
	
    let build = function(_meetingInfoModel){
    	if(!showView()){
    		 let containerDiv = UWA.createElement('div', {id: 'meetingMembersContainer','class':'meeting-members-container'}); 
    		 containerDiv.inject(document.querySelector('.meeting-facets-container'));
    		 
    		 MeetingController.fetchMembers(_meetingInfoModel.model.id).then(function(response) {
    			 MeetingMembersModel.destroy();
    			 MeetinMembersViewModel(response, _meetingInfoModel.model);
    			 drawMeetingMembersView(containerDiv); 
        
	         }); 
	         
	     
    	 } //if ends
    };
    
    let drawMeetingMembersView = function(containerDiv){
        //To add the dataGrid view list
        var model = MeetingMembersModel.getModel();
        let datagridDiv = MeetingMemberDataGridView.build(model);
        
        let tileViewDiv= MeetingMemberTileView.build(model);
        MeetingMemberTileView.contexualMenuCallback();
        registerListners();
        
        let memberTabToolbar = MeetingMemberDataGridView.getGridViewToolbar();
        
        let toolBarContainer = UWA.createElement('div', {id:'dataGridMemberDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
        memberTabToolbar.inject(toolBarContainer);
  
        datagridDiv.inject(containerDiv);
        tileViewDiv.inject(containerDiv);
        
        
        return containerDiv;
    };
    
    let openContextualMenu = function (e, cellInfos) {
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
              if (e.button == 2) {
                  require(['DS/ENXMeetingMgmt/View/Menu/MemberContextualMenu'], function (MemberContextualMenu) {
                      MemberContextualMenu.memberGridRightClick(e,cellInfos.nodeModel.options.grid);
                });           
             }
        }  
    };
    
     let registerListners = function(){
        let dataGridView = WrapperDataGridView.dataGridView();
        dataGridView.addEventListener('contextmenu', openContextualMenu);
        addorRemoveToolbarEventListeners();
    };
    
    let addorRemoveToolbarEventListeners = function(){
		widget.meetingEvent.subscribe('toolbar-data-updated', function (data) {
			if (MeetingModel.getModel().getSelectedNodes().length>0)
				MeetingMembersModel.getModel().meetingModel = MeetingModel.getModel().getSelectedNodes()[0].options.grid;
        	if(data.state == "Create") {
    			showMemberAddButton(true);
    			showMemberDeleteButton(true);
    		}
    		else{
    			showMemberAddButton(false);
    			showMemberDeleteButton(false);
    		} 
        	
		}); 
	};
	
	let showMemberAddButton = function(flag){
		let meetingMemberToolbar = MeetingMemberDataGridView.getGridViewToolbar();
		let addMember = meetingMemberToolbar.getNodeModelByID("addMember");
		
    	if(addMember && addMember._associatedView.elements.container.querySelector('.wux-controls-button')){
    		//addMember._associatedView.elements.container.querySelector('.wux-controls-button').dsModel.visibleFlag = flag;
    		if (document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator"))
    			document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator").show();
			addMember.updateOptions({disabled: !flag});
			addMember.updateOptions({
	            visibleFlag: true
	          });
    		/*if(flag){
    			document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator").show();
    		} else {
    			document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator").hide();
    		}*/
    		
    	}
		
        /*if (addMember) {
        	addMember.updateOptions({
            visibleFlag: flag
          });
        }*/
	};
	
	
	let showMemberDeleteButton = function(flag){
		let meetingMemberToolbar = MeetingMemberDataGridView.getGridViewToolbar();
		let deleteMember = meetingMemberToolbar.getNodeModelByID("deleteMember");
		
		if(deleteMember && deleteMember._associatedView.elements.container.querySelector('.wux-controls-button')){
			//deleteMember._associatedView.elements.container.querySelector('.wux-controls-button').dsModel.visibleFlag = flag; 
			if(document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator"))
				document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator").show();
			deleteMember.updateOptions({disabled: !flag});
			deleteMember.updateOptions({
	            visibleFlag: true
	          });
			/*if(flag){
    			document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator").show();
    		} else {
    			document.querySelector("#dataGridMemberDivToolbar .wux-controls-toolbar-category-separator").hide();
    		}*/
    	}
		
       /* if (deleteMember) {
        	deleteMember.updateOptions({
            visibleFlag: flag
          });
        }*/
	};
	
    
    let MeetinMembersViewModel = function(serverResponse, meetingModel){      
    	MeetingMembersModel.createModel(serverResponse);
    	MeetingMembersModel.getModel().meetingId = meetingModel.id;
        MeetingMembersModel.getModel().meetingModel = meetingModel;
    };
    
    let hideView= function(){
        if(document.getElementById('meetingMembersContainer') != null){
            document.getElementById('meetingMembersContainer').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#meetingMembersContainer') != null){
            document.getElementById('meetingMembersContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	MeetingMembersModel.destroy();
    };
    
    let MeetingMembers = {
    		init : (_meetingInfoModel) => { return build(_meetingInfoModel);},
            hideView: () => {hideView();},
            destroy: () => {destroy();}
            //addorRemoveToolbarEventListeners: () => {addorRemoveToolbarEventListeners();}
    };
    

    return MeetingMembers;
});

