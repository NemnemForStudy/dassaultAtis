/* global define, widget */
/**
 * @overview user Group Management - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOUserGroupMgmt/Utilities/Search/SearchUtil',
		[
			'UWA/Class',
			'DS/UIKIT/Alert',
			'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
			],
			function(
					UWAClass,
					UIAlert,
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
		refinementToSnNJSON.global_actions = [{"id":"incontextHelp","title":NLS['search.help'],"icon":"fonticon fonticon-help","overflow":false}];
		return refinementToSnNJSON;
	};
	
	let getPrecondForContentSearch = function(scopeId, userGroupContentSearchTypes,usergroupOrg){
        var precond_taxonomies = "flattenedtaxonomies:(";
        var types_count = userGroupContentSearchTypes.length;
        userGroupContentSearchTypes.forEach(function(type, index){
        	precond_taxonomies += '\"types\/'+type+'\"';
        	if(index < types_count-1){
                precond_taxonomies += " OR ";
            }
            if(index === types_count-1){
                precond_taxonomies += ")";
            }
        });
        
		
		/*if(scopeId != "" && typeof scopeId != 'undefined' && scopeId != "Organization" && scopeId != "All" ){
			precond_taxonomies += ' AND usergroup_95_content_95_scope:"'+scopeId+'"';
		}else if(scopeId == "Organization"){
			if(usergroupOrg == undefined || usergroupOrg == ""){
				usergroupOrg= getOrganisation();
			}
			precond_taxonomies += ' AND organization:"'+usergroupOrg+'"';
		}*/
		return precond_taxonomies;
	};
	/*let getPrecondForUserGroupSearch = function(){
		return "flattenedtaxonomies:(\"types\/User Group\") AND current:\"Active\" AND latestrevision:\"TRUE\" AND usergroup_95_template_95_valid:\"TRUE\"";
	};*/
	/*let getPrecondForScopeSearch = function(){
		return "flattenedtaxonomies:\"types/Workspace Vault\" OR flattenedtaxonomies:\"types/Workspace\" OR flattenedtaxonomies:\"types/Personal Workspace\" OR flattenedtaxonomies:\"types/Project Space\" AND (identifier:(__QUERY__) OR label:(__QUERY__))";
	};*/
	
	/*let getPrecondForTaskMemberSearch = function(data){
		// Person
		let refinement = {};
		refinement.precond = "(flattenedtaxonomies:\"types/Person\" OR \"types/Group\") AND current:\"active\"";
		
		if(!(data.Scope)){
			// something went wrong in passing the scope to search precond //
			return refinement;
		}
		
		// In case of empty include scope ids, then we need to pass empty string to resource in. //
		// else all the matching precond results will be fetched //
		if(!data.ScopeMembers){
			data.ScopeMembers = [""];
		}
		if(data.ScopeMembers.length == 0){
			if(data.ScopeMembers[0] == null || data.ScopeMembers[0] == undefined){
				data.ScopeMembers = [""];
			}
		}
		
		if("OnPremise" == "OnPremise"){
			// premise 
			if(data.Scope[0] == "All"){	
				refinement.precond = "(flattenedtaxonomies:\"types/Person\" OR \"types/Group\") AND current:\"active\"";
			} else if(data.Scope[0] == "Organization"){
				refinement.precond = "(flattenedtaxonomies:\"types/Person\" AND current:\"active\" AND member:\""+getOrganisation()+"\") " +
						"OR (flattenedtaxonomies:\"types/Group\" AND current:\"active\")";
			}else{
				// scope id based search //
				// HRL1 - Todo scope based premise search //
				// (mxid:29072.3456.17705.13245 OR mxid:29072.3456.17705.13754 OR mxid:29072.3456.17705.14359 OR 
				// mxid:29072.3456.17705.14832 OR mxid:29072.3456.17705.15262 OR mxid:29072.3456.25659.50790) 
				// AND (flattenedtaxonomies:"types/Person" OR "types/Group") AND current:"active"
				refinement.precond = "(flattenedtaxonomies:\"types/Person\" OR \"types/Group\") AND current:\"active\"";
				refinement.resourceid_in = data.ScopeMembers;
			}
		}else{
			// cloud
			if(data.Scope[0] == "All"){
				refinement.precond = "([ds6w:type]:(Group)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
			} else if(data.Scope[0]== "Organization"){
				refinement.precond = "([ds6w:type]:(Group)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\" AND member:\""+getOrganisation()+"\")";
			} else{
				var uriInPreconds = "(";
				var resourceIdIn = [];
				var userGroupInScope = false;
				for(var i=0; i<data.ScopeMembers.length; i++){
					if(data.ScopeMembers[i].indexOf("uuid") != -1){
						userGroupInScope = true;
						uriInPreconds = uriInPreconds + "uri:\""+ data.ScopeMembers[i] + "\""+ " OR ";
					}else{
						resourceIdIn.push(data.ScopeMembers[i]);
					}
				}
				if(userGroupInScope){
					uriInPreconds = uriInPreconds.substring(0, refinementToSnNJSON.precond.length -4);
					uriInPreconds += ") ";
					refinement.precond = "("+uriInPreconds+" AND [ds6w:type]:(Group)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
				}else{
					refinement.precond = "((uri:\"-1\") AND [ds6w:type]:(Group)) OR (flattenedtaxonomies:\"types/Person\" AND current:\"active\")";
				}
				refinement.resourceid_in = resourceIdIn;			
			}
		}
		
		return refinement;
	};*/
	
/*	let getOrganisation=function(){
		var orgName="";
		if(widget.getPreference("organization") == undefined && widget.getPreference("organization") != ""){
			orgName=widget.data.pad_security_ctx.split("ctx::")[1].split('.')[1];
		}else{
			orgName = widget.getPreference("organization").value;
		}
		return orgName;
	};*/
	

	let SearchUtil = {
			getRefinementToSnN: (socket_id, title, multiSelect,recentTypes) => {return getRefinementToSnN(socket_id, title, multiSelect,recentTypes);},
			getPrecondForContentSearch: (scopeId, userGroupContentSearchTypes, usergroupOrg) => {return getPrecondForContentSearch(scopeId, userGroupContentSearchTypes, usergroupOrg);}
			//getPrecondForUserGroupSearch: () => {return getPrecondForUserGroupSearch();}
			//getPrecondForScopeSearch: () => {return getPrecondForScopeSearch();}
			//getPrecondForTaskMemberSearch: (data) => {return getPrecondForTaskMemberSearch(data);}
	};
	
	return SearchUtil;
});

/**
 * Mediator Component - handling interaction between components for smooth async events
 *
 */
define('DS/ENOUserGroupMgmt/Components/Mediator',
['DS/Core/ModelEvents'],
function(ModelEvents) {

    'use strict';
    var _eventBroker = null;
    var mediator = function () {
        // Private variables
        _eventBroker= new ModelEvents();
    };

    /**
     * publish a topic on given channels in param, additional data may go along with the topic published
     * @param  {[type]} eventTopic [description]
     * @param  {[type]} data       [description]
     *
     */
    mediator.prototype.publish = function (eventTopic, data) {
          _eventBroker.publish({ event: eventTopic, data: data }); // publish from ModelEvent
    };

    /**
    *
    * Subscribe to a topic
    * @param {string} eventTopic the topic to subcribe to
    * @param {function} listener the function to be called when the event fires
    * @return {ModelEventsToken}             a token to use when you want to unsubscribe
    */
    mediator.prototype.subscribe = function (eventTopic, listener) {
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
    mediator.prototype.subscribeOnce = function(eventTopic, listener) {
    	return _eventBroker.subscribeOnce({ event: eventTopic }, listener);
    };

    /**
     * Unsubscribe to a topic
     * @param  {[type]} token [description]
     *
     */
    mediator.prototype.unsubscribe = function (token) {
        _eventBroker.unsubscribe(token);
    };

    mediator.prototype.getEventBroker = function(){
      return _eventBroker;
    };

    mediator.prototype.destroy = function(){
      _eventBroker.destroy();
    };



   return mediator;

});

define('DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
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
     * Exposes the below public APIs to be used
     */
    WrapperTileView={
            build: (treeDocument,container) => {return initTileView(treeDocument,container);},
            tileView: () => {return tileView();}
    };

    return WrapperTileView;

});

define('DS/ENOUserGroupMgmt/Config/UsersGroupTabsConfig',
[
 'UWA/Drivers/Alone',
 'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'],
function( Alone, NLS) {

    'use strict';

    let UsersGroupTabsConfig = [{ 
    	label: NLS.members,
    	id:"members",
		isSelected:true, 
    	icon: { 
    		iconName: "users", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'UsersGroupMembersContainer', 'class':'usergroup-members-container'}),
        loader : 'DS/ENOUserGroupMgmt/Views/UsersGroupMembersView' // loader file path to load the content
    },{ 
    	label: NLS.infoPropertiesTab, 
    	id:"properties",
    	isSelected:false, 
    	icon: { 
    		iconName: "attributes",
    		fontIconFamily: WUXManagedFontIcons.Font3DS,
    		orientation: "horizontal"
    	},
    	content: Alone.createElement('div', {id:'UsersGroupPropertiesContainer', 'class':'UsersGroup-properties-container'}),
        loader : 'DS/ENOUserGroupMgmt/Views/UsersGroupPropertiesView' // loader file path to load the content
    },{ 
    	label: NLS.accessRightsTab, 
    	id:"accessRights",
    	isSelected:false, 
    	icon: { 
    		iconName: "users-group-key",
    		fontIconFamily: WUXManagedFontIcons.Font3DS
    	},
    	content: Alone.createElement('div', {id:'userGroupAccessRightsContainer', 'class':'usergroup-accessrights-container'}),
        loader : 'DS/ENOUserGroupMgmt/Views/UserGroupAccessRightsView' // loader file path to load the content
    }
    ];

    return UsersGroupTabsConfig;

});

/**
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENOUserGroupMgmt/Components/Notifications',[
	'DS/Notifications/NotificationsManagerUXMessages',
	'DS/Notifications/NotificationsManagerViewOnScreen',
	],
function(NotificationsManagerUXMessages,NotificationsManagerViewOnScreen) {

    'use strict';
    let _notif_manager = null;
    let Notifications = function () {
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
    
    Notifications.prototype.handler = function () {
    	if(document.getElementById("createUserGroup")){ //This id is of create dialog panel of the usergroup widget. 
    		//This means create dialog window is opened and show the notification on the window
    		NotificationsManagerViewOnScreen.inject(document.getElementById("createUserGroup"));
    		//document.getElementById('createUserGroup').scrollIntoView();
    	} else{
    		if(document.getElementsByClassName('wux-notification-screen').length > 0){
        		//Do nothing as the notifications will be shown here.
        	}else{
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}
    	}
    	
    	return _notif_manager;
    };
    
    Notifications.prototype.notifview = function(){
    	return NotificationsManagerViewOnScreen;
    }; 
    
    return Notifications;

});

define('DS/ENOUserGroupMgmt/Utilities/RequestUtils', ['UWA/Class', 'DS/WAFData/WAFData', 'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'], function(c, a,i3DXCompassPlatformServices) {
    var b = c.singleton({
        m3DSpaceURL: "../..",
        m3DSpaceCSRFToken: null,
        mLanguage : "en",
        SecurityContext: null,
        isAdmin: false,
        isLeader: false,
        isAuthor: false,
        contextUser:null,
        populate3DSpaceURL:  {
        		
        },
        _frameENOVIA : false,
        getSyncOptions : function() {
            if (this._frameENOVIA) {
                return {};
            } else {
                var syncOptions = {
                    ajax: a.authenticatedRequest
                };

                return syncOptions;
            }
        },
        getUserGroupServiceBaseURL: function() {
            return "resources/bps";
        },
    	
        get3DSpaceCSRFToken: function() {
            return this.m3DSpaceCSRFToken;
        },
        
        send3DSpaceRequest: function(d, h, e, g, f) {
            return this.sendRequest(this.m3DSpaceURL + "/" + d, h, e, g, f);
        },
    	
        setIsAdmin : function(admin){
    		this.isAdmin = admin;
    	},
    	setIsLeader : function(leader){
    		this.isLeader = leader;
    	},
    	setIsAuthor : function(author){
    		this.isAuthor = author;
    	},
    	
    	setContextUser : function(contextUser){
    		this.contextUser = contextUser;
    	},
        set3DSpaceCSRFToken: function(d) {
            this.m3DSpaceCSRFToken = d
        },

        setSecurityContext: function(d) {
        	if(d.indexOf("ctx::")==0){
        		d = d.substr(5);
        	}
            this.SecurityContext = d
        },
        sendRequest: function(f, h, d, g, e) {
            d.method = h;
            d.onComplete = g;
            d.onFailure = e;
            return this.sendRequestSimple(f, d)
        },
        sendRequestSimple: function(e, d) {
            if (!d.headers) {
                d.headers = {};
                d.headers["Content-type"] = "text/html"
            }
            if (!d.type) {
                d.type = "text"
            }
            if (!d.data) {
                d.data = ""
            }
            if (this.m3DSpaceCSRFToken) {
                d.headers["X-Requested-With"] = "csrf protection";
                d.headers["X-Request"] = this.m3DSpaceCSRFToken
            }
            if (this.SecurityContext) {
                d.headers.SecurityContext = encodeURI(this.SecurityContext)
            }
            if (d.method !== "GET" && !d.isCheckOut && d.type === "json" && d.data && (d.data instanceof Object)) {
                d.headers["Content-type"] = "application/json";
                d.data = JSON.stringify(d.data)
            }
            d.timeout = 600000;
            return a.authenticatedRequest(e, d)
        },
        send3DSpaceRequestSimple: function(d, e) {
            return this.sendRequestSimple(this.m3DSpaceURL + "/" + d, e);
        },
        
        getPopulate3DSpaceURL: function (options) {
        	var that = this;
        	var returnedPromise = new Promise(function (resolve, reject) {
        		var config = null;
        		/*     if (options) {
	            config = {};
	            config.myAppsBaseUrl = options.myAppsBaseUrl,
	            config.userId = options.userId,
	            config.lang = options.lang
	          }*/
        		i3DXCompassPlatformServices.getPlatformServices({
        			config: config,
        			onComplete: function (data) {
        				for (var count = 0; count < data.length; count++) {
        					if(that.populate3DSpaceURL){

        						that.populate3DSpaceURL.tenantMappings = data;
        						that.populate3DSpaceURL.baseURL = data[count]["3DSpace"];
        						that.populate3DSpaceURL.federatedURL = data[count]["3DSearch"];
        						that.populate3DSpaceURL.swymURL = data[count]["3DSwym"];
        						that.populate3DSpaceURL.tenant = data[count]["platformId"]
        					}
        				}
        				resolve();
        			},
        			onFailure: reject
        		});
        	});
        	return returnedPromise;
        },
        
        
        
        
        initLanguage: function(f, e) {
            var d = this;
            this.send3DSpaceRequestSimple(this.getUserGroupServiceBaseURL() + "/application/language", {
                method: "GET",
                type: "json",
                headers: {
                    "Content-type": "application/json"
                },
                onComplete: function(g) {
                    require.config({
                        config: {
                            i18n: {
                                locale: g.language
                            }
                        }
                    });
                    d.mLanguage = g.language;
                    f()
                },
                onFailure: e
            })
        }
    })
        return b
});

/* global define, widget */
/**
 * @overview User Group Management - Data formatter
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOUserGroupMgmt/Utilities/DataFormatter',
		['i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'],function(NLS) {
	'use strict';
	let DataFormatter;
	
	let gridData = function(dataElem){
		
		var response =
		{
            title: dataElem.title,		                    
            description: dataElem.description,
            uri:dataElem.uri,
            owner:dataElem.owner,
			myGroup:dataElem.myGroup,
			members:dataElem.members,
			pid:dataElem.pid,
			ownerFullName:dataElem.ownerFullName,
			name:dataElem.name,
			id:dataElem.id,
			memberList:dataElem.memberList
            
    	};
		return response;
	};
	
	let contentGridData = function(dataElem){
        var response =
        {
            id: dataElem.id,
            memberFullName: dataElem["ds6w:label"],
            name:dataElem["ds6w:identifier"],
            Title: dataElem['ds6w:label'],
            Maturity: dataElem['ds6w:status'],
            Type: dataElem['ds6w:type'],
            Description: dataElem['ds6w:description'],
            Owner : dataElem.owner,
            Creation_Date : dataElem["ds6w:created"],
            Modified_Date : dataElem['ds6w:modified'],
            Actions:dataElem.Action,
            Access: dataElem.newAccess
        };
        return response;
    };
    let memberGridData = function(dataElem){
        var response =
            {
                    id: dataElem.pid,
					name: dataElem.name,
					memberFullName:dataElem.ownerFullName,
					Actions:dataElem.Action,
                    Access: dataElem.newAccess
            }
        return response;
    };
    let useraccessrighsGridData = function(dataElem){
        var response =
            {
                    id: dataElem.id,
					name: dataElem.name,
					personName:dataElem.personName,
					Actions:dataElem.Action,
                    Role: dataElem.accessName,
                    RoleDisplay: dataElem.accessNameDisplay
            }
        return response;
    };
    DataFormatter={
    		gridData: (dataElem) => {return gridData(dataElem);},
			contentGridData: (dataElem) => {return contentGridData(dataElem);},
			useraccessrighsGridData: (dataElem) => {return useraccessrighsGridData(dataElem);},
			memberGridData: (dataElem) => {return memberGridData(dataElem);}
    };
    
    return DataFormatter;
});

define('DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
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
 * @overview User Group Management - ID card utilities
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOUserGroupMgmt/Utilities/IdCardUtil',[
	'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
],function(NLS) {
	'use strict';
	let infoIconActive = function(){
		var infoIcon = document.querySelector('#usergroupInfoIcon');
  	  	if(infoIcon.className.indexOf("fonticon-color-display") > -1){
  	  		infoIcon.className = infoIcon.className.replace("fonticon-color-display", "fonticon-color-active");
  	  	}
	};
	
	let infoIconInActive = function(){
		var infoIcon = document.querySelector('#usergroupInfoIcon');
  	  	if(infoIcon.className.indexOf("fonticon-color-active") > -1){
  	  		infoIcon.className = infoIcon.className.replace("fonticon-color-active", "fonticon-color-display");
  	  	}   
	};
	
	/*let hideChannel3 = function(){
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
		if(document.querySelector('#usergroupInfoIcon').className.indexOf("fonticon-color-active") > -1){
			return true;
		}else{
			return false;
		}
	};
	*/
	let collapseIcon = function(){
		var userGroupHeaderContainer = document.querySelector('#userGroupHeaderContainer');
		if(userGroupHeaderContainer && userGroupHeaderContainer.className.indexOf("minimized") > -1){
			var expandCollapse = document.querySelector('#expandCollapse');
			if(expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1){
				expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
				expandCollapse.title = NLS.idCardHeaderActionExpand;
			}
		}
	};
	/*
	let hideThumbnail = function(){
		var thumbnailSection = document.querySelector('#thumbnailSection');
		thumbnailSection.classList.add("id-card-thumbnail-remove");
		
		var infoSec = document.querySelector('#infoSec');
		var userGroupHeaderContainer = document.querySelector('#userGroupHeaderContainer');
		if(userGroupHeaderContainer && userGroupHeaderContainer.className.indexOf("minimized") > -1){
			infoSec.classList.add("id-info-section-align-minimized");
		}else{
			infoSec.classList.add("id-info-section-align");
		}
		
		
	};
	
	let showThumbnail = function(){
		var thumbnailSection = document.querySelector('#thumbnailSection');
		thumbnailSection.classList.remove("id-card-thumbnail-remove");
		
		var infoSec = document.querySelector('#infoSec');
		var userGroupHeaderContainer = document.querySelector('#userGroupHeaderContainer');
		if(userGroupHeaderContainer && userGroupHeaderContainer.className.indexOf("minimized") > -1){
			infoSec.classList.remove("id-info-section-align-minimized");
		}else{
			infoSec.classList.remove("id-info-section-align");
		}
		
	};
	*/
	/*let resizeIDCard = function(containerWidth){
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
        
	};*/
	
	let IdCardUtil = {
			infoIconActive: () => {return infoIconActive();},
			infoIconInActive: () => {return infoIconInActive();},
			collapseIcon: () => {return collapseIcon();}
			/*hideChannel3: () => {return hideChannel3();},
			showChannel3: () => {return showChannel3();},
			infoIconIsActive: () => {return infoIconIsActive();},
			
			hideThumbnail: () => {return hideThumbnail();},
			showThumbnail: () => {return showThumbnail();},
			resizeIDCard: (containerWidth) => {return resizeIDCard(containerWidth);}*/
	};
	
	return IdCardUtil;
});

define('DS/ENOUserGroupMgmt/Utilities/PlaceHolder',
        ['DS/Controls/Button',
        'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
        ],
        function(
                WUXButton,
                NLS
        ) {
        'use strict';
        
        let showEmptyUserGroupPlaceholder= function (container,userGroupModel) {

        	let existingPlaceholder = container.getElement('.no-usergroups-to-show-container');
            container.querySelector(".tile-view-container").setStyle('display', 'none');
            container.querySelector(".data-grid-container").setStyle('display', 'none');
            
            if (existingPlaceholder !== null) {
            	ugSyncEvts.ugMgmtMediator.publish('usergroup-back-to-summary');
                return existingPlaceholder;
            } 
            var placeholder = UWA.createElement('div', {
                'class': 'no-usergroups-to-show-container',
                html: [UWA.createElement('div', {
                    'class': 'no-usergroups-to-show',
                    html: [UWA.createElement('div', {
                        'class': 'pin',
                        html: '<span class="fonticon fonticon-5x"></span>'
                    }), UWA.createElement('span', {
                        'class': 'no-usergroups-to-show-label',
                        html: NLS.titles.placeholder.label
                    })]
                })]
            });
            

            container.appendChild(placeholder);
        };

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
        let hideEmptyUserGroupPlaceholder= function (container) {
        	 let placeholder = container.getElement('.no-usergroups-to-show-container');

             // The place holder is already hidden, we do nothing
             if (placeholder === null) {
                 return;
             }
                         
             container.querySelector(".tile-view-container").removeAttribute('style');
             container.querySelector(".data-grid-container").removeAttribute('style');
             // No more div
             placeholder.destroy();
             //container.querySelector(".no-routes-to-show-container").setStyle('display', 'none');

        };
        let showEmptyMemberPlaceholder= function (container) {
            let existingPlaceholder = container.getElement('.no-members-to-show-container');
            // We hide grid view and tile view is already hidden
            container.querySelector(".Members-tileView-View").setStyle('display', 'none');
            container.querySelector(".Members-gridView-View").setStyle('display', 'none');
            
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-members-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";

        	placeholder = UWA.createElement('div', {
        		'class': 'no-members-to-show-container',
        		html: [UWA.createElement('div', {
                    'class': 'no-members-to-show',
                    html: [UWA.createElement('span', {
                        'class': 'no-members-to-show-label',
                        html: NLS.emptyUserGroupMembers
                    })]
                })]
            });
            container.appendChild(placeholder);
        };
        
        let showEmptyAccessRightsPlaceholder= function (container) {

            let existingPlaceholder = container.getElement('.no-accessrights-to-show-container');
            // We hide grid view and tile view is already hidden
            container.querySelector(".accessrights-tileView-View").setStyle('display', 'none');
            container.querySelector(".accessrights-gridView-View").setStyle('display', 'none');
            
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-accessrights-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";

        	placeholder = UWA.createElement('div', {
        		'class': 'no-accessrights-to-show-container',
        		html: [UWA.createElement('div', {
                    'class': 'no-accessrights-to-show',
                    html: [UWA.createElement('span', {
                        'class': 'no-accessrights-to-show-label',
                        html: NLS.emptyUserGroupAccessMembers
                    })]
                })]
            });
            container.appendChild(placeholder);
        
        };

        let hideEmptyAccessRightsPlaceholder= function (container) {
        	let placeholder = container.getElement('.no-accessrights-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            container.querySelector(".accessrights-tileView-View").removeAttribute('style');
            container.querySelector(".accessrights-gridView-View").removeAttribute('style');
            // No more div
            placeholder.destroy();

        };

        /**
         * Hides the special placeholder if you have issues to display.
         * @param {Node} container - The container of the application.
         */
        let hideEmptyMemberPlaceholder= function (container) {
        	let placeholder = container.getElement('.no-members-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            container.querySelector(".Members-tileView-View").removeAttribute('style');
            container.querySelector(".Members-gridView-View").removeAttribute('style');
            // No more div
            placeholder.destroy();
        };
        

        
        
        let showeErrorPlaceholder= function (container) {
        	
        };

        let hideeErrorPlaceholder= function (container) {
        	
        };
       
        
        let registerListeners = function(){
        	ugSyncEvts.ugMgmtMediator.subscribe('hide-no-usergroup-placeholder', function (data) {
        		hideEmptyUserGroupPlaceholder(document.querySelector(".widget-container"));
            });
        	ugSyncEvts.ugMgmtMediator.subscribe('show-no-usergroup-placeholder', function (data) {
        		showEmptyUserGroupPlaceholder(document.querySelector(".widget-container"));
            });
        	ugSyncEvts.ugMgmtMediator.subscribe('hide-no-members-placeholder', function (data) {
                hideEmptyMemberPlaceholder(document.querySelector(".usergroup-members-container"));
             });
        	ugSyncEvts.ugMgmtMediator.subscribe('show-no-members-placeholder', function (data) {
                showEmptyMemberPlaceholder(document.querySelector(".usergroup-members-container"));
            });
        	ugSyncEvts.ugMgmtMediator.subscribe('hide-no-accessrights-placeholder', function (data) {
        		hideEmptyAccessRightsPlaceholder(document.querySelector(".usergroup-accessrights-container"));
             });
        	ugSyncEvts.ugMgmtMediator.subscribe('show-no-accessrights-placeholder', function (data) {
        		showEmptyAccessRightsPlaceholder(document.querySelector(".usergroup-accessrights-container"));
            });
        };
        
        let PlaceHolder = {
                hideEmptyUserGroupPlaceholder : (container) => {return hideEmptyUserGroupPlaceholder(container);},
                showEmptyUserGroupPlaceholder : (container,userGroupModel) => {return showEmptyUserGroupPlaceholder(container,userGroupModel);},
                hideEmptyMemberPlaceholder : (container) => {return hideEmptyMemberPlaceholder(container);},
                showEmptyMemberPlaceholder : (container, hideAddExistingbutton) => {return showEmptyMemberPlaceholder(container, hideAddExistingbutton);},
                hideEmptyAccessRightsPlaceholder : (container) => {return hideEmptyAccessRightsPlaceholder(container);},
                showEmptyAccessRightsPlaceholder : (container, hideAddExistingbutton) => {return showEmptyAccessRightsPlaceholder(container, hideAddExistingbutton);},
                showeErrorPlaceholder : (container) => {return showeErrorPlaceholder(container);},
                hideeErrorPlaceholder : (container) => {return hideeErrorPlaceholder(container);},
                registerListeners : () => {return registerListeners();}
        }
        return PlaceHolder;

    });


/**
 * 
 */

define('DS/ENOUserGroupMgmt/Components/Wrappers/SplitViewWrapper',
['DS/ENOXSplitView/js/ENOXSplitView','i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'],
function(ENOXSplitView,NLS) {

  'use strict';
  var ENOXSplitViewWrapper = ENOXSplitView;

  ENOXSplitViewWrapper.prototype.getLeftViewWrapper = function () {
    return UWA.extendElement(this.getLeft());
  }

  ENOXSplitViewWrapper.prototype.getRightViewWrapper = function () {
    return UWA.extendElement(this.getRight());
  }

  ENOXSplitViewWrapper.prototype.addRightPanelExpander = function () {
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
  
  return ENOXSplitViewWrapper;

});

define('DS/ENOUserGroupMgmt/Config/UsersGroupSummaryGridViewConfig', 
        [
            'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
            ], 
            function( NLS) {
    'use strict';
    let getUserGroupIconURL = function(){
        
    }
    
    let UserGroupSummaryGridViewConfig= [
            {
              text: NLS.title,
              dataIndex: 'tree',
              editableFlag: false,
			  pinned: 'left'
            }, {
              text: NLS.description,
              dataIndex: 'description'
            },{
              text: NLS.members,
              dataIndex: 'members',
              editableFlag: false
              //pinned: 'left',              
            },{
              text: NLS.Owner,
              dataIndex: 'ownerFullName',
              editableFlag: false
            //  pinned: 'left',              
            },{
                text: NLS.Name,
                dataIndex: 'name',
                editableFlag: false
              //  pinned: 'left',              
              }
            
            ];

    return UserGroupSummaryGridViewConfig;

});

/**
 * 
 */
/**
    Class to create the spinner
    These spinners are used to indicate users that background processing is in work.
*/
define('DS/ENOUserGroupMgmt/Utilities/UserGroupSpinner', 
    [
        'DS/UIKIT/Mask'
    ],
    function (Mask
    ) {
    'use strict';
     /**
     * @lends module:RDYWebApp/js/component/RDYWaitSpinner.RDYWaitSpinner#
     */  
    var UserGroupSpinner = {
            /**
            * Indicates if a spinner was currently executed or not
            * @type integer
            */
            wait : false,
            /**
            * Indicates to keep active the spinner
            * @type integer
            */
            keepActive : false,
            /**
             * Indicates if call is from 3DSpace Env.
             * @type  integer 
             */
            is3DSpace : false,
            /**
            * Launch the wait spinner
            */
            doWait : function(target,msg) {
                 if ((UserGroupSpinner.keepActive === false) && (UserGroupSpinner.isWaiting())) {
                     UserGroupSpinner.endWait(target);
                 }
                 else if (UserGroupSpinner.isWaiting()) {
                     return;
                 }
                 Mask.mask(target, msg);
                 UserGroupSpinner.wait = true;
            },
            /**
            * End the wait spinner
            */
            endWait : function(target) {
                if (UserGroupSpinner.isWaiting()) {
                    Mask.unmask(target); 
                    UserGroupSpinner.wait = false;
                    UserGroupSpinner.keepActive = false;
                }
            },

            /* set3DSpace: function(is3DSpace){
                    UserGroupSpinner.is3DSpace =  is3DSpace;
             },

             if3DSpace: function(){
                 return UserGroupSpinner.is3DSpace;
             },*/

            /**
            * Indicates if a spinner was currently executed or not
            * @return true or false
            */
            isWaiting : function() {
                return UserGroupSpinner.wait;
            }
    };
    return UserGroupSpinner;
});

/**
 * 
 */
define('DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel',
		[
			'UWA/Class/Model',
			'DS/TreeModel/TreeDocument',
			'DS/TreeModel/TreeNodeModel',
			'DS/TreeModel/DataModelSet',
			'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
		    'DS/ENOUserGroupMgmt/Utilities/DataFormatter',
		    'DS/WebappsUtils/WebappsUtils',
		    'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
			'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
		],
		function(Model, TreeDocument, TreeNodeModel, DataModelSet,  WrapperDataGridView,
	            DataFormatter,
	            WebappsUtils,
	            RequestUtils,
	            NLS) {
				'use strict';
				let usergroupInfo = {
						
				};
				let model = new TreeDocument();
			
				let prepareTreeDocumentModel = function(response,userGroupInfo){
					model.prepareUpdate(); 
					var obj = JSON.parse(response);		
					obj.forEach(function(dataElem) {
			
						var thumbnailIcon,typeIcon,nameLabel;
						// thumbnailIcon=onMemberNodeAssigneesCellRequest(dataElem.fullname,dataElem.userName);
						// UG105941  : pass full name and name
						thumbnailIcon=onMemberNodeAssigneesCellRequest(dataElem.personName,dataElem.name);    
						typeIcon=WebappsUtils.getWebappsAssetUrl("ENOUserGroupMgmt","icons/16/I_Person16.png");
						var subLableValue= "";
						if(dataElem.accessName=="Owner")  {
							subLableValue = NLS.AccessRights_AddMembers_OwnerRole;
						} else if(dataElem.accessName=="Manager") {
							subLableValue = NLS.AccessRights_AddMembers_ManagerRole;
						}
						dataElem.accessNameDisplay=subLableValue;
						var root = new TreeNodeModel({
							label: dataElem.personName,
							id: dataElem.id,
							width: 300,
							grid: DataFormatter.useraccessrighsGridData(dataElem),
							"thumbnail" : thumbnailIcon,
							"subLabel": subLableValue,
							icons : [typeIcon],
							contextualMenu : [NLS.ContextMenu]
						});
			
						model.addRoot(root);
					});
					model.pushUpdate();
					return model;
				};
				let appendRows = function(dataElem){
					model.prepareUpdate();	
					var thumbnailIcon,typeIcon;
			
					dataElem.forEach((elem) => {
						thumbnailIcon=onMemberNodeAssigneesCellRequest(elem.personName,elem.name);
						typeIcon=WebappsUtils.getWebappsAssetUrl("ENOUserGroupMgmt","icons/16/I_Person16.png");
						var subLableValue= "";
						if(elem.accessName=="Owner")  {
							subLableValue = NLS.AccessRights_AddMembers_OwnerRole;
						} else if(elem.accessName=="Manager") {
							subLableValue = NLS.AccessRights_AddMembers_ManagerRole;
						}
						elem.accessNameDisplay=subLableValue;
						var root = new TreeNodeModel({
							label: elem.personName,
							id: elem.id,
							width: 300,
							grid: DataFormatter.useraccessrighsGridData(elem),
							"thumbnail" : thumbnailIcon,
							"subLabel": subLableValue,
							icons : [typeIcon],
							contextualMenu : [NLS.ContextMenu]
			
						});
			
						model.addRoot(root);
					});
			
					model.pushUpdate();
					if(model.getChildren().length!=0){
						ugSyncEvts.ugMgmtMediator.publish('hide-no-accessrights-placeholder');
					}
			
				};
			
				let onMemberNodeAssigneesCellRequest= function (name,userName) {
			
			
					var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
					var swymOwnerIconUrl = RequestUtils.populate3DSpaceURL.swymURL+ownerIconURL;               
					var responsible = new UWA.Element("div", {});
					var owner = new UWA.Element("div", {
						class:'assignee'
					});
					var ownerIcon = "";
					if(RequestUtils.populate3DSpaceURL.swymURL!=undefined){
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
			
				let updateRow = function(dataElem,grid){ 
					if(dataElem.data && dataElem.data[0]!=""){
						var updatedRole = dataElem.data[0].accessName;
						var rowModelToUpdate = WrapperDataGridView.getSelectedRowsModel(model);
						if(rowModelToUpdate == undefined || rowModelToUpdate.data[0] == undefined){
							rowModelToUpdate.data.push(WrapperDataGridView.getRowModelById(model,grid.id));
						}
						var orgGrid= rowModelToUpdate.data[0].options.grid;
						orgGrid.Role=updatedRole;
						var subLableValue= "";
						if(updatedRole=="Owner")  {
							subLableValue = NLS.AccessRights_AddMembers_OwnerRole;
						} else if(updatedRole=="Manager") {
							subLableValue = NLS.AccessRights_AddMembers_ManagerRole;
						}
						orgGrid.RoleDisplay=subLableValue;
						// Update the grid content //
						rowModelToUpdate.data[0].updateOptions({grid:orgGrid});
						// Update the tile content //
						rowModelToUpdate.data[0].updateOptions(
								{
									"subLabel": subLableValue,
								});
					}
			
				};
				let destroy = function(){
					model = new TreeDocument();
				};
			
				let deleteSelectedRows = function(){
					var selRows = model.getSelectedNodes();
					model.prepareUpdate();	
					for (var index = 0; index < selRows.length; index++) {
						model.removeRoot(selRows[index]);
					}
					model.pushUpdate();
					if(model.getChildren().length==1) {
						var rowModelToUpdate = model.getChildren()[0];
						var thumbnailIcon = onMemberNodeAssigneesCellRequest(rowModelToUpdate.options.grid.personName,rowModelToUpdate.options.grid.name);
						rowModelToUpdate.updateOptions(
								  {
									  "thumbnail": thumbnailIcon
								  });
					}
					if(model.getChildren().length==0){
						ugSyncEvts.ugMgmtMediator.publish('show-no-accessrights-placeholder');
					}
				};
				let setContextUGInfo = function(ugInfo){
					usergroupInfo = ugInfo;
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
				let UserGroupAccessRightsModel = {
						createModel : (response,userGroupInfo) => {return prepareTreeDocumentModel(response,userGroupInfo);},
						getModel : () => {return model;},
						appendRows : (data) => {return appendRows(data);},
						getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
						deleteSelectedRows : () => {return deleteSelectedRows();},
						updateRow : (data,grid) => {return updateRow(data,grid);},
						destroy : () => {return destroy();},
						getMemberIDs: () => {return getMemberIDs();},
						
						setContextUGInfo :(ugInfo) => {return setContextUGInfo(ugInfo);},
						usergroupInfo:()=>{return usergroupInfo; }
				}
				return UserGroupAccessRightsModel;
});

/* global define, widget */
/**
  * @overview User group Management - user group Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENOUserGroupMgmt/Model/UsersGroupMemberModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
    'DS/ENOUserGroupMgmt/Utilities/DataFormatter',
    'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
    'DS/WebappsUtils/WebappsUtils',
    'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
    ],
    function(
            TreeDocument,
            TreeNodeModel,
            WrapperDataGridView,
            DataFormatter,
            RequestUtils,
            WebappsUtils,
            NLS
    ) {
    'use strict';
    let model = new TreeDocument();
    let prepareTreeDocumentModel = function(response,userGroupInfo){
		//alert("rr");
        var userGroupState=userGroupInfo.model.Maturity_State;
        model.prepareUpdate(); 
		var obj = JSON.parse(response);		
        obj["data"].forEach(function(dataElem) {
			 var _contextualMenu=[];
           
            var thumbnailIcon,typeIcon;
			// thumbnailIcon=onMemberNodeAssigneesCellRequest(dataElem.fullname,dataElem.userName);
			thumbnailIcon=onMemberNodeAssigneesCellRequest(dataElem.ownerFullName,dataElem.name);    
			typeIcon=WebappsUtils.getWebappsAssetUrl("ENOUserGroupMgmt","icons/16/I_Person16.png");
            var root = new TreeNodeModel({
                label: dataElem.ownerFullName,
                id: dataElem.pid,
                width: 300,
				grid: DataFormatter.memberGridData(dataElem),
				thumbnail : thumbnailIcon,
				icons : [typeIcon],
				contextualMenu : [NLS.ContextMenu]
            });
                                                                            
            model.addRoot(root);
        });
        model.pushUpdate();
        return model;
    };
    let appendRows = function(dataElem){
		model.prepareUpdate();	
		var thumbnailIcon,typeIcon;
		
		dataElem.forEach((elem) => {
			thumbnailIcon=onMemberNodeAssigneesCellRequest(elem["ds6w:label"],elem["ds6w:identifier"]);
			typeIcon=WebappsUtils.getWebappsAssetUrl("ENOUserGroupMgmt","icons/16/I_Person16.png");
			var root = new TreeNodeModel({
                label: elem["ds6w:label"],
                id: elem.id,
                width: 300,
                grid: DataFormatter.contentGridData(elem),
  	          	thumbnail : thumbnailIcon,
  	          	icons : [typeIcon],
  	          	contextualMenu : [NLS.ContextMenu]

        	});
      																		
			model.addRoot(root);
		});
		
		model.pushUpdate();
		if(model.getChildren().length!=0){
			ugSyncEvts.ugMgmtMediator.publish('hide-no-members-placeholder');
		   
        }

	};
	
    let onMemberNodeAssigneesCellRequest= function (name,userName) {
        
        
          var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
          var swymOwnerIconUrl =RequestUtils.populate3DSpaceURL.swymURL+ownerIconURL;               
          var responsible = new UWA.Element("div", {});
          var owner = new UWA.Element("div", {
            class:'assignee'
          });
          var ownerIcon = "";
          if(RequestUtils.populate3DSpaceURL.swymURL!=undefined){
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
    
      let updateRow = function(dataElem){ 
          if(dataElem.model.id && dataElem.model.id != ""){
              var dispValue = 'role.'+ dataElem.model.Access.replace(' ','').toLowerCase();
              var rowModelToUpdate = WrapperDataGridView.getSelectedRowsModel(model);
              var orgGrid= rowModelToUpdate.data[0].options.grid;
              orgGrid.Access=dispValue;
              orgGrid.AccessNLS=NLS[dispValue];              
              // Update the grid content //
              rowModelToUpdate.data[0].updateOptions({grid:orgGrid});
              // Update the tile content //
              rowModelToUpdate.data[0].updateOptions(
                      {
                          "subLabel": NLS[dispValue]
                      });
          }
          
      };
    let destroy = function(){
    	model = new TreeDocument();
    };
    
	let deleteSelectedRows = function(){
		var selRows = model.getSelectedNodes();
		model.prepareUpdate();	
		 for (var index = 0; index < selRows.length; index++) {
			 model.removeRoot(selRows[index]);
		 }
		model.pushUpdate();
		if(model.getChildren().length>0) {
			var rowModelToUpdate = model.getChildren()[0];
			var thumbnailIcon = onMemberNodeAssigneesCellRequest(rowModelToUpdate.options.grid.memberFullName,rowModelToUpdate.options.grid.name);
			rowModelToUpdate.updateOptions(
                      {
                          "thumbnail": thumbnailIcon
                      });
		}
		if(model.getChildren().length==0){
			ugSyncEvts.ugMgmtMediator.publish('show-no-members-placeholder');
        }
	};
	let setContextUGInfo = function(ugInfo){
		usergroupInfo = ugInfo;
	};

	let usergroupInfo = {
			
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
    let UserGroupMemberModel = {
    		createModel : (response,userGroupInfo) => {return prepareTreeDocumentModel(response,userGroupInfo);},
    		getModel : () => {return model;},
    		appendRows : (data) => {return appendRows(data);},
    		getMemberIDs: () => {return getMemberIDs();},
    		getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
    		deleteSelectedRows : () => {return deleteSelectedRows();},
            updateRow : (data) => {return updateRow(data);},
            destroy : () => {return destroy();},
            setContextUGInfo :(ugInfo) => {return setContextUGInfo(ugInfo);},
			usergroupInfo:()=>{return usergroupInfo; }
    }
    return UserGroupMemberModel;

});

/* global define, widget */
/**
 * @overview User Group Management - ENOVIA Bootstrap file to interact with the platform
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOUserGroupMgmt/Services/UserGroupServices',
        [
         'UWA/Class/Promise',
        'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
         'UWA/Core',
         'DS/WAFData/WAFData',
         ],
         function(
                 Promise,
                RequestUtils,
                 UWACore,
                 WAFData
         ) {
    'use strict';

    let UGServices,_switchuserAccess,_revokeAccessFromUserGroup, _fetchAllGroups,_createUserGroups, _updateState, _deleteUserGroups, _fetchUGMembers,_addMembersToGroup,_fetchUserGroupById,_removeMembersFromUserGroup, _fetchUserGroupAccessRights, _addAccessRightssToGroup, _makeWSCall;
    _fetchAllGroups = function(){
        return new Promise(function(resolve, reject) {
            let postURL= "../../resources/bps/application/usergroups";
			
            let options = {};
            options.method = 'GET';
            options.timeout=0; 
            options.headers = {
                    'Content-Type' : 'application/ds-json'
            };

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

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
	
	_createUserGroups =function(args){

		
        return new Promise(function(resolve, reject) {
            let postURL= "../../resources/modeler/pno/group";
			
			var obj = new Object();
			   obj.title = args.title;
			   obj.description  = args.description;
 
            var a = new Array();
            a[0] = obj;
			
			var obj2 =new Object();
			obj2.groups = a;
			
            var jsonString= JSON.stringify(obj2);
			
            let options = {};
            options.method = 'POST';
            options.timeout=0; 
            options.headers = {
                    'Content-Type' : 'application/ds-json',
					'SecurityContext': RequestUtils.SecurityContext,
					'ENO_CSRF_TOKEN': RequestUtils.get3DSpaceCSRFToken()
            };
			options.data = jsonString,
			

            options.onComplete = function(serverResponse) {
				
                resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
					var respData =JSON.parse(respData)
					reject(respData);
             	}else{
					var serverResponse =JSON.parse(serverResponse)
             		reject(serverResponse);
             	}
            };

            WAFData.authenticatedRequest(postURL, options);	
        });
    };
    
    _deleteUserGroups = function(ids){
    	return new Promise(function(resolve, reject) {
		//
		var id;
		
		for(let i=0;i<ids.length;i++){
				 id =  ids[i];
				 id = id.replace("<","");
					id = id.replace(">","");
					
					let postURL= "../../resources/modeler/pno/group/"+id;	
		            let options = {};
		            options.method = 'DELETE';
		            options.headers =  {
		                    'SecurityContext':RequestUtils.SecurityContext,
							'ENO_CSRF_TOKEN': RequestUtils.get3DSpaceCSRFToken()
		            };

		            options.onComplete = function(serverResponse) {
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
			}
			
			
    	});
      
    };

	
	    _fetchUGMembers = function(grpUID){
        return new Promise(function(resolve, reject) {
            let postURL= "../../resources/bps/application/"+grpUID+ "/members";
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
                resolve(serverResponse);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(postURL, options); 
        });
    };
    
    _removeMembersFromUserGroup = function (that,data) {
    	
    	return new Promise(function(resolve, reject) {
            var details = {};
            var selectedContentItemsDetails = [];
            var id;
            for (var i = 0; i < data.length; i++) { 
            	id =  data[i];
                selectedContentItemsDetails.push(data);

            }
			
			var uidVal = that.TreedocModel.UserGroupId;
			uidVal = uidVal.replace("<","");
			uidVal = uidVal.replace(">","");
           
			 var url = "";
	            
	            if(RequestUtils.isAdmin) {
	            	url = '../../resources/modeler/pno/group/'+ uidVal;
	    		}
	            else {
	            	url = '../../resources/bps/application/'+ that.TreedocModel.UserGroupPID;
	            }
           
            var selectedContentItemsData = new Array();
            for (var i = 0; i < data.length; i++) { 
                var d = {
                        "op" : "remove",  
                        "field" : "members",  
                        "value" : data[i]
                }
                selectedContentItemsData.push(d);
            }
            var requestData = {
                   "data" : selectedContentItemsData
            };
            var options = {};
            options = UWACore.extend(options, RequestUtils.getSyncOptions(), true);
            options.method = 'PATCH';
            options.type = 'json';
            options.headers = {
                    'X-HTTP-Method-Override' : 'PATCH',
                    'SecurityContext' : RequestUtils.SecurityContext,
					'ENO_CSRF_TOKEN': RequestUtils.get3DSpaceCSRFToken()
            };
            options.data = JSON.stringify(selectedContentItemsData);
            options.onComplete = function(serverResponse) {
            	serverResponse.data = data;
            	serverResponse.action = "remove";
            	resolve(serverResponse);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(url, options);
        });
    	
    	
    };
    _addMembersToGroup = function(that, data){
    	
	 	return new Promise(function(resolve, reject) {
            var details = {};
            var selectedContentItemsDetails = [];
            for (var i = 0; i < data.length; i++) { 
                details = {};
                details.label = data[i]['ds6w:label'];
                details.identifier = data[i]['ds6w:identifier'];
                details.id = data[i]['id'];
                //  details.id[i] = data[i].id;
                selectedContentItemsDetails.push(details);

            }
			
			var uidVal = that.TreedocModel.UserGroupId;
			uidVal = uidVal.replace("<","");
			uidVal = uidVal.replace(">","");
           
            var url = "";
            
            if(RequestUtils.isAdmin) {
            	url = '../../resources/modeler/pno/group/'+ uidVal;
    		}
            else {
            	url = '../../resources/bps/application/'+ that.TreedocModel.UserGroupPID;
            }
           
            var selectedContentItemsData = new Array();
            for (var i = 0; i < data.length; i++) { 
                var d = {
                        "op" : "add",  
                        "field" : "members",  
                        "value" : data[i]['ds6w:identifier']  
                }
                selectedContentItemsData.push(d);
            }
            var requestData = {
                   "data" : selectedContentItemsData
            };
            var options = {};
            options = UWACore.extend(options, RequestUtils.getSyncOptions(), true);
            options.method = 'PATCH';
            options.type = 'json';
            options.headers = {
                    'X-HTTP-Method-Override' : 'PATCH',
                    'SecurityContext' : RequestUtils.SecurityContext,
					'ENO_CSRF_TOKEN': RequestUtils.get3DSpaceCSRFToken()
            };
           // options.data  = { "csrf": widget.data.csrf };
            //options.data = JSON.stringify(options.data);
            options.data = JSON.stringify(selectedContentItemsData);
            options.onComplete = function(serverResponse) {
            	serverResponse.data = data;
            	serverResponse.action = "add";
            	resolve(serverResponse);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(url, options);
        });
    };		
    
    _fetchUserGroupById = function(id,UID){
        return new Promise(function(resolve, reject) {
        	/*id = id.replace("<","");
			id = id.replace(">","");		
			let postURL= "../../resources/modeler/pno/group/"+id;	*/
        	/*if(UID!=null &&  typeof UID != 'undefined' && UID.indexOf(">")==-1) {
        		UID = "<"+UID+">";
        	}*/
			if(id==null ||  typeof id == 'undefined') {
				
				id =UID;
			}
			 let postURL= "../../resources/bps/application/usergroups/"+id;
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
                    'SecurityContext' : RequestUtils.SecurityContext
            };

            options.onComplete = function(serverResponse) {
                resolve(serverResponse);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(postURL, options); 
        });
    };
    
    _fetchUserGroupAccessRights = function(usergroupid){
            return new Promise(function(resolve, reject) {
   			 	let postURL= "../../resources/bps/application/"+usergroupid+"/personroles";
                let options = {};
                options.method = 'GET';
                options.headers = {
                        'Content-Type' : 'application/json',
                        'SecurityContext' : RequestUtils.SecurityContext
                };

                options.onComplete = function(serverResponse) {
                    resolve(serverResponse);
                };  

                options.onFailure = function(serverResponse) {
                    reject(serverResponse);
                };

                WAFData.authenticatedRequest(postURL, options); 

            });
    };
    
    	_addAccessRightssToGroup = function (memberArray,  usergroupInfo,updateDataMemberArray){
    		 return new Promise(function(resolve, reject) {
    			 	let id = usergroupInfo.model.pid;
    				let postURL= "../../resources/bps/application/"+id+"/updaterole";
    	            let options = {};
    	            options.method = 'POST';
    	            options.headers = {
    	                    'Content-Type' : 'application/json',
    	                    'SecurityContext' : RequestUtils.SecurityContext
    	            };
    	            options.data = JSON.stringify(memberArray);
    	            options.onComplete = function(serverResponse) {
    	            	var response =JSON.parse(serverResponse)
    	            	response.data = updateDataMemberArray;
    	                resolve(response);
    	            };  

    	            options.onFailure = function(serverResponse) {
    	                reject(serverResponse);
    	            };

    	            WAFData.authenticatedRequest(postURL, options); 
    	        });
    	};
    	_revokeAccessFromUserGroup = function (that,data) {
        	
        	return new Promise(function(resolve, reject) {
                var id;
                for (var i = 0; i < data.length; i++) { 
                	id =  data[i];
                }
    			
                var userid = that.model.pid;
               
                var url = '../../resources/bps/application/'+ userid+"/removerole";
               
                var selectedContentItemsData = new Array();

                
                /*for (var i = 0; i < data.length; i++) { 
                    var d = {
                            "op" : "remove",  
                            "field" : "members",  
                            "value" : data[i]
                    }
                    selectedContentItemsData.push(d);
                }
                var requestData = {
                       "data" : selectedContentItemsData
                };*/
                var options = {};
                options.data =  JSON.stringify(data);
                options = UWACore.extend(options, RequestUtils.getSyncOptions(), true);
                options.method = 'DELETE';
                options.type = 'json';
                options.headers = {
                        'SecurityContext' : RequestUtils.SecurityContext,
    					'ENO_CSRF_TOKEN': RequestUtils.get3DSpaceCSRFToken()
                };
                //options.data = JSON.stringify(selectedContentItemsData);
                options.onComplete = function(serverResponse) {
                	resolve(serverResponse);
                };  

                options.onFailure = function(serverResponse) {
                    reject(serverResponse);
                };

                WAFData.authenticatedRequest(url, options);
            });
        	
        	
        };

    	_makeWSCall  = function (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) {

    		var options = options || null;
    		var url = "";
    		if (options != null && options.isfederated != undefined && options.isfederated == true)
    			url = RequestUtils.populate3DSpaceURL.federatedURL + URL;
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
    			url = url + "?tenant=" + RequestUtils.populate3DSpaceURL.tenant + "&timestamp=" + timestamp;
    		} else {
    			url = url + "&tenant=" + RequestUtils.populate3DSpaceURL.tenant + "&timestamp=" + timestamp;
    		}


    		//var securityContext = globalObject.getSecurityContext();
    		var securityContext = "ctx::"+RequestUtils.SecurityContext;
    		// Encoding for special character for company name IE specific
    		if(encodeSecurityContext!='No')
    			securityContext = encodeURIComponent(securityContext);

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

    		var lang = RequestUtils.mLanguage;
    			if (authentication) {
    				queryobject.auth = {
    						passport_target: authentication
    				};
    			}
    			//queryobject.proxy = globalObject.proxy;
    			if (securityContext) {

    				queryobject.headers = {
    						Accept: accept,
    						'Content-Type': ContentType,
    						'SecurityContext': securityContext,
    						'Accept-Language': lang
    				};

    			} else { //will be called only once for security context
    				queryobject.headers = {
    						Accept: accept,
    						'Content-Type': ContentType,
    						'Accept-Language': lang
    				};
    			}


    		if (ReqBody)
    			queryobject.data = ReqBody;

    		queryobject.onComplete = function (data) {
    			//console.log("Success calling url: " + url);
    			//console.log("Success data: " + JSON.stringify(data));
    			userCallbackOnComplete(data);
    		};
    		queryobject.onFailure = function (errDetailds, errData) {
    			console.log("Error in calling url: " + url);
    			console.log("Additional Details:: httpMethod: " + httpMethod + " authentication: " + authentication + " securityContext: " + securityContext + " ContentType: " + ContentType);
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
    	
    _switchuserAccess = function (that,useraccessData){

        return new Promise(function(resolve, reject) {
        	let usergroupid = that.model.pid;
			 	let postURL= "../../resources/bps/application/"+usergroupid+"/updaterole";
            let options = {};
            
            options.method = 'POST';
            options.data =  JSON.stringify(useraccessData);
            options.headers = {
                    'Content-Type' : 'application/json',
                    'SecurityContext' : RequestUtils.SecurityContext
            };

            options.onComplete = function(serverResponse) {
            	var response =JSON.parse(serverResponse)
            	response.info = useraccessData;
            	resolve(response);
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            WAFData.authenticatedRequest(postURL, options); 

        });

    };
    UGServices={
            fetchAllGroups: () => {return _fetchAllGroups();},
			createUserGroups : (args) => {return _createUserGroups(args);},
			fetchUserGroupMembers : (args) => {return _fetchUGMembers(args);},
            deleteUserGroups : (args) => {return _deleteUserGroups(args);},
            addMembersToGroup : (model, data) => {return _addMembersToGroup(model,data);},
            fetchUserGroupById : (id,UID) => {return _fetchUserGroupById(id,UID);},
            fetchUserGroupAccessRights : (usergroupid) => {return _fetchUserGroupAccessRights(usergroupid);},
            removeMembersFromUserGroup : (that,ids) => {return _removeMembersFromUserGroup(that,ids);},
            addAccessRightssToGroup: (memberArray,  usergroupInfo,updateDataMemberArray) => {return _addAccessRightssToGroup(memberArray,  usergroupInfo,updateDataMemberArray);},
            makeWSCall: (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) => {return _makeWSCall(URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options);},
            revokeAccessFromUserGroup : (that,ids) => {return _revokeAccessFromUserGroup(that,ids);},
            switchuserAccess : (that,useraccessData) => {return _switchuserAccess(that,useraccessData);}
    };

    return UGServices;

});


define('DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',[
	'DS/ENOUserGroupMgmt/Services/UserGroupServices',
	'UWA/Promise'],
function(UserGroupServices, Promise) {
    'use strict';
    let UserGroupServicesController,userGroupId;
    //TODO implement a general callback method for anykind of service failure
 /*   let commonFailureCallback = function(data){
      if (data instanceof ErrorObject){

        return false;
      }
      else {
        return data;
      }
    };*/
    
    /*All methods are public, need to be exposed as this is service controller file*/
    UserGroupServicesController = {
    		
    		fetchAllUserGroups: function(){

    			return new Promise(function(resolve, reject) {
    				UserGroupServices.fetchAllGroups().then(
    						success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		reject(failure);
    		    	});	
    			});
    		} ,
    		fetchUserGroupById: function(userGroupId,userGroupUID){

                return new Promise(function(resolve, reject) {
                    UserGroupServices.fetchUserGroupById(userGroupId,userGroupUID).then(
    						success => {
    	    					resolve(success);
    	    		    	},
    	    		    	failure => {
    	    		    		reject(failure);
    	    		    	});	
                }); 
            }, 
    		createUserGroup :function(args){
				
				return new Promise(function(resolve, reject) {
    				UserGroupServices.createUserGroups(args).then(
    						success => {
    							
    					resolve(success);
    		    	},
    		    	failure => {
    		    		reject(failure);
    		    	});	
    			});
			},
			deleteUserGroup:function(ids){
				
				return new Promise(function(resolve, reject) {
    				UserGroupServices.deleteUserGroups(ids).then(
    						success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		reject(failure);
    		    	});	
    			});
			},
			removeMembersFromUserGroup :function(that,ids){
				
				return new Promise(function(resolve, reject) {
    				UserGroupServices.removeMembersFromUserGroup(that,ids).then(
    						success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		reject(failure);
    		    	});	
    			});
			},
    		fetchUserGroupMembers: function(userGroupId){

                return new Promise(function(resolve, reject) {
                    UserGroupServices.fetchUserGroupMembers(userGroupId).then(function(response) {
                        resolve(response);
                    });
                }); 
            },            
			addMembersToGroup : function(model,data){
                return new Promise(function(resolve, reject) {
                    UserGroupServices.addMembersToGroup(model,data).then(function(response) {
                        resolve(response);
                    },function(response) {
                        reject(response);
                    });
                });
            },
            fetchUserGroupAccessRights : function(userGroupId) {
            	return new Promise(function(resolve, reject) {
                    UserGroupServices.fetchUserGroupAccessRights(userGroupId).then(function(response) {
                        resolve(response);
                    },function(response) {
                        reject(response);
                    });
                });
            },
            addAccessRightssToGroup : function(memberArray, usergroupInfo,updateDataMemberArray) {
            	return new Promise(function(resolve, reject) {
                    UserGroupServices.addAccessRightssToGroup(memberArray, usergroupInfo,updateDataMemberArray).then(function(response) {
                        resolve(response);
                    },function(response) {
                        reject(response);
                    });
                });
            },
            revokeAccessFromUserGroup :function(that,ids){
				
				return new Promise(function(resolve, reject) {
    				UserGroupServices.revokeAccessFromUserGroup(that,ids).then(
    						success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		reject(failure);
    		    	});	
    			});
			},
			switchuserAccess : function(that,useraccessData){
				
				return new Promise(function(resolve, reject) {
    				UserGroupServices.switchuserAccess(that,useraccessData).then(
    						success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		reject(failure);
    		    	});	
    			});
			}

    };

    return UserGroupServicesController;
    

});

/* global define, widget */
/**
  * @overview User Group Management - User Group Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENOUserGroupMgmt/Model/UsersGroupModel',
[
    'DS/Tree/TreeDocument',
    'DS/Tree/TreeNodeModel',
    'DS/ENOUserGroupMgmt/Utilities/DataFormatter',
'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
    'DS/WebappsUtils/WebappsUtils',
    'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
	'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
    ],
    function(
			TreeDocument,
			TreeNodeModel,
			DataFormatter,
			WrapperDataGridView,
			WebappsUtils,
			UserGroupServicesController,
			NLS
    ) {
	'use strict';
		
	let model = new TreeDocument();
	let getUserGroupDetails = {
	}
	let setUserGroupDetails = function(data){
		UserGroupServicesController.fetchUserGroupAccessRights(data.model.pid).then(function(response) {
			var obj = JSON.parse(response);	
			getUserGroupDetails = {};
			obj.forEach(function(dataElem) {
				getUserGroupDetails[dataElem.name] = dataElem.accessName;
			});
			getUserGroupDetails.owner=data.model.owner;
			// getUserGroupDetails.accessRights = JSON.parse(accessRightsArray);
		 });
		
	};	
	let _openedUserGroupModel;
	let createTreeDocumentModel = function(response){		
	    model.prepareUpdate();	
		
		var obj = JSON.parse(response);
	    obj["groups"].forEach(function(dataElem) {	
	    	
	        var  memberCount= NLS.oneMember;
			if(dataElem.members>1) {
				 memberCount =  NLS.mulitMembers;
			}
	        var root = new TreeNodeModel({
	            label: dataElem.title,
	            id: dataElem.id,
	            width: 300,
	            grid: DataFormatter.gridData(dataElem),
	            "thumbnail" :WebappsUtils.getWebappsAssetUrl('ENOUserGroupMgmt','icons/144/iconLargerUserGroup.png'),
	            "subLabel": dataElem.owner,
	            description : dataElem.members+ memberCount ,
	            icons : [WebappsUtils.getWebappsAssetUrl('ENOUserGroupMgmt','icons/16/I_UserGroup16.png')],
	            contextualMenu : ["My context menu"],
	            shouldAcceptDrop: true,
	            isAdmin:dataElem.isAdmin
	        });
	        
	        model.addRoot(root);
	    });
	    model.pushUpdate();
	    registerEvents();
	    return model;
	};
	let getRowModelById = function(id){
		return WrapperDataGridView.getRowModelById(model,id);
	};

	let getRowModelByURI = function(uri){
		return WrapperDataGridView.getRowModelByURI(model,uri);
	};

	let destroy = function(){
		model = new TreeDocument();
	};
	
	let appendRows = function(dataElem){
		
		model.prepareUpdate();

     // owner needs to be reasigned with logged in user  ***************************************
			
	 // add owner myGroup and member list to the elementFromPoint
	    dataElem.myGroup =dataElem.myGroup;
	    dataElem.members =0;
	    var  memberCount= NLS.oneMember;
		if(dataElem.members>1) {
			 memberCount =  NLS.mulitMembers;
		}
	    dataElem.uri = dataElem.uri;
	    dataElem.owner = dataElem.owner;
        var root = new TreeNodeModel({
        	label: dataElem.title,
        	description : dataElem.members+ memberCount ,
        	id: dataElem.id,
        	width: 300,
        	grid: DataFormatter.gridData(dataElem),
        	"thumbnail" :WebappsUtils.getWebappsAssetUrl('ENOUserGroupMgmt','icons/144/iconLargerUserGroup.png'),
        	"subLabel": dataElem.owner,
        	icons : [WebappsUtils.getWebappsAssetUrl('ENOUserGroupMgmt','icons/16/I_UserGroup16.png')],
        	contextualMenu : [NLS.ContextMenu]
        });
																			
        model.getXSO().add(root);
        model.addChild(root, 0);
		
        model.unselectAll();					
		nouserGroupPlaceHolderHide();
		model.pushUpdate();
		registerEvents();
		return root;
	};
	
	let nouserGroupPlaceHolderHide = function(){
		if(checkHiddenNodesCount()!=0){
			ugSyncEvts.ugMgmtMediator.publish('hide-no-usergroup-placeholder');
        }
	};
	
	let deleteRowModelByIds = function(ids){
		WrapperDataGridView.deleteRowModelByIds(model,ids);
		nouserGroupsPlaceHolder();		
	};
	
	let nouserGroupsPlaceHolder = function(){
		if(checkHiddenNodesCount()== 0){
			ugSyncEvts.ugMgmtMediator.publish('show-no-usergroup-placeholder');
        }
	};
	let checkHiddenNodesCount= function(){
		let count = 0;
		model.getChildren().forEach(node => {if(!node._isHidden)count++;});
		return count;
	};
	let registerEvents = function(){
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-DataGrid-on-dblclick', function (data) {  
			_openedUserGroupModel = data;
		});
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-back-to-summary', function (data) {
			_openedUserGroupModel = undefined;      	  
        });
	};
	let getOpenedUserGroupModel = function(){
		return _openedUserGroupModel;
	}
		
	let updateRow = function(dataElem){
		let rowModelToUpdate = getRowModelByURI(dataElem.uri);
		// Update the grid content //
		rowModelToUpdate.updateOptions({grid:DataFormatter.gridData(dataElem)});
		// Update the tile content //
		rowModelToUpdate.updateOptions(
				{
					label:dataElem.title
				});
	};
	let updateMemberCount = function(dataElem){
		let rowModelToUpdate = getRowModelByURI(dataElem.uri);
		var orgGrid;
		var memberscount = 0;
		var  memberCountMessage = NLS.oneMember;
		if(rowModelToUpdate == null || typeof rowModelToUpdate == 'undefined'){
			rowModelToUpdate = getRowModelById(dataElem.id);
			orgGrid= rowModelToUpdate.options.grid;	
			if("add"==dataElem.action){
				orgGrid.members= orgGrid.members+dataElem.members.length;
			} else if(orgGrid.members!=0){
				orgGrid.members= orgGrid.members-dataElem.members.length;
			} else {
				orgGrid.members = dataElem.members.length;
			}
        } else {
        	orgGrid= rowModelToUpdate.options.grid;
        	orgGrid.members = dataElem.members.length;
        }
		memberscount = orgGrid.members;
		 
		rowModelToUpdate.updateOptions({grid:orgGrid});
		if(memberscount>1) {
			memberCountMessage = NLS.mulitMembers;
		}
		
        rowModelToUpdate.updateOptions(
		{
			description:memberscount +memberCountMessage
		});
	};
	
		
	let UGModel = {
		createModel : (response) => {return createTreeDocumentModel(response);},
		getModel : () => {return model;},
		appendRows : (data) => {return appendRows(data);},
		getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
		destroy : () => {return destroy();},
		getRowModelById: (id) => {return getRowModelById(id);},
		getRowModelByURI: (id) => {return getRowModelByURI(id);},
		deleteRowModelByIds: (ids) => {return deleteRowModelByIds(ids);},
		getOpenedUserGroupModel : () => {return getOpenedUserGroupModel();},
		setUserGroupDetails : (usergroupid) => {return setUserGroupDetails(usergroupid);},
		updateRow : (dataElem) => {return updateRow(dataElem);},
		updateMemberCount : (dataElem) => {return updateMemberCount(dataElem);},
		getUserGroupDetails:()=>{return getUserGroupDetails; }
	}
	return UGModel;

});


/**
 * UserGroupAccessRightsAction 
 */
define('DS/ENOUserGroupMgmt/Actions/UserGroupAccessRightsActions',
		[
			'DS/UIKIT/Mask',
			'DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel',
			"DS/Controls/Button",
			"DS/WUXAutoComplete/AutoComplete",
			'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
			'DS/ENOUserGroupMgmt/Services/UserGroupServices',
			'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
			'DS/ENOUserGroupMgmt/Utilities/Search/SearchUtil',
			'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
		],
		function(Mask, 
				UserGroupAccessRightsModel,
				WUXButton, 
				WUXAutoComplete, 
				TreeDocument, 
				TreeNodeModel,
				UserGroupServicesController,
				UserGroupServices,
				RequestUtils,
				SearchUtil,
				NLS)
		{
			'use strict';
			var UserGroupAccessRightsActions = {
					switchuserAccess :function (useraccessData,grid){
						var that =UserGroupAccessRightsModel.usergroupInfo();
						UserGroupServicesController.switchuserAccess(that,useraccessData,grid).then(
                				success => {
                					success.grid=grid;
                					ugSyncEvts.ugMgmtMediator.publish('usergroup-accessrights-switchaccess-rows',success);
                					var successMsg = NLS.SwitchAccessSuccessMsg;
                					var accessname = success.info.data[0].accessName;
									if(accessname=="Owner")  {
										accessname = NLS.AccessRights_AddMembers_OwnerRole;
									} else if(accessname=="Manager") {
										accessname = NLS.AccessRights_AddMembers_ManagerRole;
									}
                					successMsg = successMsg.replace("{access}",accessname);
                					ugSyncEvts.ugNotify.handler().addNotif({
                						level: 'success',
                						subtitle: successMsg,
                					    sticky: false
                					});
                				},
                				failure =>{
                					//reject(failure);
                				});
					},
					RevokeAccessFromUserGroup : function (that,ids,access){
                		UserGroupServicesController.revokeAccessFromUserGroup(that,ids).then(
                				success => {
                					UserGroupAccessRightsModel.deleteSelectedRows();
                					var successMsg = NLS.RevokeAccessSuccessMsg;
                					ugSyncEvts.ugNotify.handler().addNotif({
                						level: 'success',
                						subtitle: successMsg,
                					    sticky: false
                					});
                				},
                				failure =>{
                					//reject(failure);
                				});
                	},
					
					
					launchAddMemberPanel: function(){
						var addMemberdiv = document.querySelector(".addmemberView");
						var teamgridViewDiv = document.querySelector('.accessrights-gridView-View');
						var teamtileViewDiv = document.querySelector('.accessrights-tileView-View');
						//var addMemberIcon   = document.querySelector(".toolbar-container .wux-ui-3ds-plus");
						addMemberdiv.empty();
						if(addMemberdiv.style.display=='block'){
							addMemberdiv.hide();
							teamgridViewDiv.removeClassName('teamview-opaque');
							teamtileViewDiv.removeClassName('teamview-opaque');
							//addMemberIcon.removeClassName('currentView');
							return;
						}else{
							addMemberdiv.show();
							teamgridViewDiv.addClassName('teamview-opaque');
							teamtileViewDiv.addClassName('teamview-opaque');
							//addMemberIcon.addClassName('currentView');
						}

						UserGroupAccessRightsActions.modelForMemberRole = new TreeDocument();
						UserGroupAccessRightsActions.modelForOwnerRole = new TreeDocument();

						//praparing model for autoComplete
						UserGroupAccessRightsActions.updateAutocompleteModel({managerrole:true,ownerrole:true});


						UserGroupAccessRightsActions.autoCompleteManager = new WUXAutoComplete(
								{
									// Assign the model to autoComplete
									elementsTree : UserGroupAccessRightsActions.modelForMemberRole,
									placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
									customFilterMessage:NLS.AccessRights_Auto_No_Seach_found
								});
						UserGroupAccessRightsActions.autoCompleteOwner = new WUXAutoComplete(
								{
									// Assign the model to autoComplete
									elementsTree : UserGroupAccessRightsActions.modelForOwnerRole,
									placeholder: NLS.AccessRights_AddMembers_PlaceHolder,
									customFilterMessage:NLS.AccessRights_Auto_No_Seach_found
								});

						var addMembderViewContainer =  UWA.createElement('div', {
							'class':'add-member-container',
							styles: {
								'width':'100%'
							}
						}).inject(addMemberdiv);

						var addMembderBodyContainer =  UWA.createElement('div', {
							'class':'add-member-body-container'
						}).inject(addMembderViewContainer);

						var addMembderbuttonContainer =  UWA.createElement('div', {
							'class':'add-member-button-container'
						}).inject(addMembderViewContainer);


						var memberTable = UWA.createElement('table', {
							'class': 'add-member-table'
						}).inject(addMembderBodyContainer);

						var assineetr = UWA.createElement('tr', {'class':'add-member-table-row'}).inject(memberTable);

						UWA.createElement('td', {
							content: '<span>'+NLS.AccessRights_AddMembers_ManagerRole+'</span>',
							'class':'add-member-table-col'
						}).inject(assineetr);              

						var assigneeField = UWA.createElement('td', {'class': 'assignee-field add-member-table-col',}).inject(assineetr);

						UserGroupAccessRightsActions.autoCompleteManager.inject(assigneeField);
						var assigneeFieldSearch = UWA.createElement('span',{
							'class':'fonticon fonticon-search  assignee-field-search',
							events:{
								click:function(evt){
									UserGroupAccessRightsActions.searchCategotyId = 'Manager';
									UserGroupAccessRightsActions.onSearchUserClick();
								}
							}
						}).inject(assigneeField);

						var reviewertr = UWA.createElement('tr', {'class':'add-member-table-row'}).inject(memberTable);

						UWA.createElement('td', {
							content: '<span>'+NLS.AccessRights_AddMembers_OwnerRole+'</span>',
							'class':'add-member-table-col'
						}).inject(reviewertr);

						var reviewerField = UWA.createElement('td', {'class': 'reviewer-field add-member-table-col',}).inject(reviewertr);

						UserGroupAccessRightsActions.autoCompleteOwner.inject(reviewerField);
						var reviewerFieldSearch = UWA.createElement('span',{
							'class':'fonticon fonticon-search  reviewer-field-search',
							events:{
								click:function(evt){
									UserGroupAccessRightsActions.searchCategotyId = 'Owner';
									UserGroupAccessRightsActions.onSearchUserClick();
								}
							}
						}).inject(reviewerField);
						//adding change event listerner
						UserGroupAccessRightsActions.addChangeEventListerner();

						UserGroupAccessRightsActions.myButtonPrimary = new WUXButton({ label: NLS.AccessRights_Button_Label_Add, disabled: true , emphasize: "primary" }).inject(addMembderbuttonContainer);
						var myButtonSecondary = new WUXButton({ label: NLS.AccessRights_Cancel, emphasize: "secondary" }).inject(addMembderbuttonContainer);
						UserGroupAccessRightsActions.myButtonPrimary.addEventListener("buttonclick", function(evt){						
							addMemberdiv.empty();
							var memberArray = [];
							var updateDataMemberArray = [];
							if(UserGroupAccessRightsActions.autoCompleteManager.selectedItems!=undefined)for(var index = 0 ; index<UserGroupAccessRightsActions.autoCompleteManager.selectedItems.length; index++){						
								memberArray.push({ "username": UserGroupAccessRightsActions.autoCompleteManager.selectedItems[index].options.identifier,
													"accessName": 'Manager'});
								updateDataMemberArray.push({ "name": UserGroupAccessRightsActions.autoCompleteManager.selectedItems[index].options.identifier, 
													"accessName": 'Manager',
													"personName":UserGroupAccessRightsActions.autoCompleteManager.selectedItems[index].options.label,
													"id":UserGroupAccessRightsActions.autoCompleteManager.selectedItems[index].options.id});
							}
							if(UserGroupAccessRightsActions.autoCompleteOwner.selectedItems!=undefined)for(var index = 0 ; index<UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.length; index++){
								memberArray.push({ "username": UserGroupAccessRightsActions.autoCompleteOwner.selectedItems[index].options.identifier, 
													"accessName": 'Owner'});
								updateDataMemberArray.push({ "name": UserGroupAccessRightsActions.autoCompleteOwner.selectedItems[index].options.identifier, 
														"accessName": 'Owner',
														"personName":UserGroupAccessRightsActions.autoCompleteOwner.selectedItems[index].options.label,
														"id":UserGroupAccessRightsActions.autoCompleteOwner.selectedItems[index].options.id});
							}
							if(memberArray.length>0){
								UserGroupAccessRightsActions.addAccessRightssToGroup(memberArray,updateDataMemberArray);
							}
								
							addMemberdiv.hide();
							//addMemberIcon.removeClassName('currentView');
							teamgridViewDiv.removeClassName('teamview-opaque');
							teamtileViewDiv.removeClassName('teamview-opaque');
						});
						myButtonSecondary.addEventListener("buttonclick", function(evt){
							addMemberdiv.empty();
							addMemberdiv.hide();
							//addMemberIcon.removeClassName('currentView');
							teamgridViewDiv.removeClassName('teamview-opaque');
							teamtileViewDiv.removeClassName('teamview-opaque');
						});

					},
					updateAutocompleteModel: function(options){
						var personRoleArray = {};
						var currentMember = UserGroupAccessRightsModel.getModel().getChildren();
						for(var index=0; index<currentMember.length;index++){
							var memberInfo = currentMember[index].options.grid;
							personRoleArray[memberInfo.name] = memberInfo.Role;
						}

						// -- Helpers
						var optionsForManagerRole = {
								'categoryId': 'assignee',
						};
						var optionsForOwnerRole = {
								'categoryId': 'reviewer',
						};
						if(options.ownerrole==true) {
							UserGroupAccessRightsActions.getListMember(optionsForOwnerRole).then(function(resp){
								UserGroupAccessRightsActions.modelForOwnerRole.empty();
								UserGroupAccessRightsActions.modelForOwnerRole.prepareUpdate();
								for (var i = 0; i < resp.length; i++) {
									var identifier = resp[i].identifier;
									if(personRoleArray.hasOwnProperty(identifier)){
										resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
										if(personRoleArray[identifier].contains('Owner')==true || personRoleArray[identifier].contains('Manager')==true)
											continue;
									}
									var nodeForReviwer = new TreeNodeModel(
											{
												label : resp[i].label,
												value : resp[i].value,
												name  : resp[i].name,
												identifier: resp[i].identifier,
												type:resp[i].type,
												grid:{type:resp[i].type,name:resp[i].name},
												id: resp[i].id
											});
									UserGroupAccessRightsActions.modelForOwnerRole.addRoot(nodeForReviwer);
								}
								UserGroupAccessRightsActions.modelForOwnerRole.pushUpdate();

							});
						}	
						if(options.managerrole==true){
							UserGroupAccessRightsActions.getListMember(optionsForManagerRole).then(function(resp){
								UserGroupAccessRightsActions.modelForMemberRole.empty();

								UserGroupAccessRightsActions.modelForMemberRole.prepareUpdate();

								for (var i = 0; i < resp.length; i++) {
									var identifier = resp[i].identifier;
									if(personRoleArray.hasOwnProperty(identifier)){
										resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
										if(personRoleArray[identifier].contains('Owner')==true || personRoleArray[identifier].contains('Manager')==true)
											continue;
									}
									var nodeForAssignee = new TreeNodeModel(
											{
												label : resp[i].label,
												value : resp[i].value,
												name  : resp[i].name,
												identifier: resp[i].identifier,
												type:resp[i].type,
												id: resp[i].id
											});
									UserGroupAccessRightsActions.modelForMemberRole.addRoot(nodeForAssignee);
								}
								
								UserGroupAccessRightsActions.modelForMemberRole.pushUpdate();
							});
						}

					},
					onSearchUserClick: function(){
                    	//var data =WrapperTileView.tileView();
						var data ="";
                        var searchcom_socket,scopeId;
                        //TODO need to see why it's coming as undefined
                        require(['DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel'], function(contentModel) {
                        	UserGroupAccessRightsModel = contentModel;
							var usergroupOrg = "";
						    var socket_id = UWA.Utils.getUUID();
                            var that = this;

                            if (!UWA.is(searchcom_socket)) {
                                require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                                    searchcom_socket = SearchCom.createSocket({
                                        socket_id: socket_id
                                    });	
                                    let allowedTypes = "Person";    // UG105941: replace with constant
                                    var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
                                    var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addUserAccess", true, recentTypes);
    								refinementToSnNJSON.precond = SearchUtil.getPrecondForContentSearch(scopeId, recentTypes, usergroupOrg); 
    								refinementToSnNJSON.resourceid_not_in = UserGroupAccessRightsModel.getMemberIDs();
    								//refinementToSnNJSON.resourceid_not_in = "";
                                    if (UWA.is(searchcom_socket)) {
                                        searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
                                       // searchcom_socket.addListener('Selected_Objects_search', ContentActions.selected_Objects_search.bind(that,data));
                                        searchcom_socket.addListener('Selected_Objects_search', UserGroupAccessRightsActions.OnSearchComplete.bind(data));
                                        
                                        searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
                                    } else {
                                        throw new Error('Socket not initialized');
                                    }
                                });
                            }
                        });

                    },
					addAccessRightssToGroup: function(memberArray,updateDataMemberArray){
						var useraccessData = {
								"data":memberArray
						}
						UserGroupServicesController.addAccessRightssToGroup( useraccessData, UserGroupAccessRightsModel.usergroupInfo(),updateDataMemberArray).then(
                				success => {
                					UserGroupAccessRightsModel.appendRows(success.data);
                					var successMsg = NLS.AddAccessRightSuccessMsg;
                					ugSyncEvts.ugNotify.handler().addNotif({
                						level: 'success',
                						subtitle: successMsg,
                					    sticky: false
                					});
                				},
                				failure =>{
                					//reject(failure);
                				});
					},
					addChangeEventListerner: function(){
						
						//chnage Event listerner on reviewer autoComplete				
						UserGroupAccessRightsActions.autoCompleteOwner.addEventListener('change',function(){
							var selectedChips = UserGroupAccessRightsActions.autoCompleteOwner.selectedItems;
							var selectedChipCount = selectedChips.length;
							
							//checking whether this item exist in model or not.
							if(selectedChipCount>0){
								var newlyAddedChips = selectedChips[selectedChipCount-1];
								var index = UserGroupAccessRightsActions.autoCompleteOwner.elementsTree.getChildren().findIndex(function filter(model)
								{
									if(model.options.name==newlyAddedChips.options.name)
										return true ;
								});
								if(index<0){
									UserGroupAccessRightsActions.autoCompleteOwner._selectionChips.removeChip(newlyAddedChips.options.label); 
									UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.pop();
								} 
								else {
									if(UserGroupAccessRightsActions.autoCompleteManager.selectedItems){
										UserGroupAccessRightsActions.autoCompleteManager.selectedItems.forEach(function(dataElem) {
											if(dataElem.options.name==newlyAddedChips.options.name){
												dataElem.unselect();
												UserGroupAccessRightsActions.autoCompleteManager._selectionChips.removeChip(newlyAddedChips.options.label);
											}
										});
									} 
								}
								
							}
							if((UserGroupAccessRightsActions.autoCompleteOwner.selectedItems && UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.length>0 ) 
									|| (UserGroupAccessRightsActions.autoCompleteManager.selectedItems && UserGroupAccessRightsActions.autoCompleteManager.selectedItems.length>0)){
								UserGroupAccessRightsActions.myButtonPrimary.disabled = false;
							} else {
								UserGroupAccessRightsActions.myButtonPrimary.disabled = true;
							}
							
						});
						UserGroupAccessRightsActions.autoCompleteManager.addEventListener('change',function(){
							var selectedChips = UserGroupAccessRightsActions.autoCompleteManager.selectedItems;
							var selectedChipCount = selectedChips.length;
							
							//checking whether this item exist in model or not.
							if(selectedChipCount>0){
								var newlyAddedChips = selectedChips[selectedChipCount-1];
								var index = UserGroupAccessRightsActions.autoCompleteManager.elementsTree.getChildren().findIndex(function filter(model)
								{
									if(model.options.name==newlyAddedChips.options.name)
										return true ;
								});
								if(index<0){
									UserGroupAccessRightsActions.autoCompleteManager._selectionChips.removeChip(newlyAddedChips.options.label); 
									UserGroupAccessRightsActions.autoCompleteManager.selectedItems.pop();
								}
								else {
									if(UserGroupAccessRightsActions.autoCompleteOwner.selectedItems){
										UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.forEach(function(dataElem) {
											if(dataElem.options.name==newlyAddedChips.options.name){
												dataElem.unselect();
												UserGroupAccessRightsActions.autoCompleteOwner._selectionChips.removeChip(newlyAddedChips.options.label);
											}
										});
									} 
								}
							}
							if((UserGroupAccessRightsActions.autoCompleteOwner.selectedItems && UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.length>0 ) 
									|| (UserGroupAccessRightsActions.autoCompleteManager.selectedItems && UserGroupAccessRightsActions.autoCompleteManager.selectedItems.length>0)){
								UserGroupAccessRightsActions.myButtonPrimary.disabled = false;
							} else {
								UserGroupAccessRightsActions.myButtonPrimary.disabled = true;
							}
							
						});
						
					},
					getListMember: function (options) {
						var returnedPromise = new Promise(function (resolve, reject) {
							var url = "/search?xrequestedwith=xmlhttprequest";
							var success = function (data) {

								var results = [];

								if (data && data.results && Array.isArray(data.results)) {
									var personSelectedArr = data.results;
									personSelectedArr.forEach(function (routeTemp) {
										var rtSearched = {};
										var routeTempAttrs = routeTemp.attributes;
										routeTempAttrs.forEach(function (attr) {
											if (attr.name === 'ds6w:what/ds6w:type') rtSearched.type = attr['value'];
											if (attr.name === 'resourceid') rtSearched.id = attr['value'];
											if (attr.name === 'ds6w:identifier') rtSearched.identifier = attr['value'];
											if (attr.name === 'ds6wg:fullname') rtSearched.label = attr['value'];
											if (attr.name === 'ds6w:identifier') rtSearched.name = attr['value'];
										});
										results.push(rtSearched);
									});
								}
								resolve(results);
							};

							var failure = function (data) {
								reject(data);
							};

							var queryString = "";
							queryString = "(flattenedtaxonomies:\"types/Person\" AND policycurrent:\"Person.Active\" )";
							var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": RequestUtils.populate3DSpaceURL.tenant };
							var inputjson = JSON.stringify(inputjson);

							var options = {};
							options.isfederated = true;
							UserGroupServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
						});

						return returnedPromise;
					},
					OnSearchComplete: function(result){
						for (var d = 0; d < result.length; d++) {

							var node ;
							var tempObject = result[d];
							var nodeArray = [];
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

									nodeArray.push(node);
							}
							if(UserGroupAccessRightsActions.searchCategotyId=='Owner'){
								if(UserGroupAccessRightsActions.autoCompleteOwner.selectedItems==undefined){
									UserGroupAccessRightsActions.autoCompleteOwner.selectedItems = nodeArray;
								}else {
									UserGroupAccessRightsActions.autoCompleteOwner.selectedItems = UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.concat(nodeArray);
								}
								//UserGroupAccessRightsActions.autoCompleteOwner._applySelectedItems();
								UserGroupAccessRightsActions.autoCompleteOwner.selectedItems.forEach(function(dataElem) {
									dataElem.select();
								});
								
							}else if(UserGroupAccessRightsActions.searchCategotyId=='Manager'){
								if(UserGroupAccessRightsActions.autoCompleteManager.selectedItems==undefined){
									UserGroupAccessRightsActions.autoCompleteManager.selectedItems = nodeArray	
								}else{
									UserGroupAccessRightsActions.autoCompleteManager.selectedItems = UserGroupAccessRightsActions.autoCompleteManager.selectedItems.concat(nodeArray);
								}
								//UserGroupAccessRightsActions.autoCompleteManager._applySelectedItems();
								UserGroupAccessRightsActions.autoCompleteManager.selectedItems.forEach(function(dataElem) {
										dataElem.select();
								});
							}
						}
					}
					}
			return UserGroupAccessRightsActions;
	});

/**
 * @overview Displays the properties of a content.
 * @licence Copyright 2006-2020 Dassault Syst�mes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENOUserGroupMgmt/Views/UserGroupInfoPropWidget', [
										'UWA/Class/View',
										'UWA/Core',
										'DS/EditPropWidget/EditPropWidget',
										'DS/EditPropWidget/constants/EditPropConstants',
										'DS/EditPropWidget/models/EditPropModel',
										'DS/Windows/Dialog',
										'DS/Windows/ImmersiveFrame',
										'UWA/Class/Model',
										'UWA/Drivers/Alone',
										'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
									 	'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
									 	'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
										'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
										'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css'
], function(
		 View,
         Core,
         EditPropWidget,
         EditPropConstants,
         EditPropModel,
         WUXDialog, 
         WUXImmersiveFrame,
         UWAModel,
         Alone,
         UserGroupServicesController,
         RequestUtils,
         UsersGroupModel,
         NLS
) {	
	let _ugInfo;
    let UserGroupInfoPropWidget = {
    	render: function (propContainer,data) {
			let that = this;
			_ugInfo = data.model;
			let facets = [EditPropConstants.FACET_PROPERTIES/*,EditPropConstants.FACET_RELATIONS*/];
			that.parentContainer = this.container;
			let options_panel = {
					 typeOfDisplay: EditPropConstants.ONLY_EDIT_PROPERTIES, // Properties with ID card - ALL. ONLY_EDIT_PROPERTIES for only properties
			         selectionType: EditPropConstants.NO_SELECTION, // The edit properties panel will not listen the selection
			         'facets': facets,
			         'editMode': false,
			         'readOnly': false,
			         'extraNotif': true,
			         'actions': [{
                         name: "action_close_panel",
                         text: NLS.infoCloseAction,
                         icon: "close",
                     }]
			};

			if(!RequestUtils.isAdmin && !(RequestUtils.contextUser==data.model.owner && (RequestUtils.isAuthor || RequestUtils.isLeader))  && !("Owner" == UsersGroupModel.getUserGroupDetails()[RequestUtils.contextUser])){
				options_panel.readOnly = true;
			}
			
			this.EditPropWidget = new EditPropWidget(options_panel);	
			if (data.model.id) {
				that.loadModel(data.model.id,propContainer);
			}

			 
			return this;
		},
		
		getPropModel:  function (objModel) {
			var resultElementSelected = [];
			var selection = new EditPropModel({
				metatype: 'businessobject',
				objectId: objModel.objectId,
				source: "3DSpace",
				tenant: "OnPremise"
			});
			selection.set('isTransient', false);
			selection.addEvent('onSave', function (event) {
				UserGroupServicesController.fetchUserGroupById(_ugInfo.pid).then(
				success => {
					// Refresh id card header & user group summary summary grid and tile view //
					//success[0].requestFrom = "editPropWidget";
					let updatedUG = JSON.parse(success);
					updatedUG = updatedUG.groups[0];
					/*if(updatedUG.owner != _ugInfo.owner){
						//if owner is changed then close the facets and remove the corresponding user group from summary view
						ugSyncEvts.ugMgmtMediator.publish('usergroup-owner-changed', updatedUG);	
						ugSyncEvts.ugMgmtMediator.publish('usergroup-back-to-summary', updatedUG);
					}*/
					ugSyncEvts.ugMgmtMediator.publish('usergroup-data-updated', updatedUG);					
				},
				failure =>{
					if(failure.error){
						ugSyncEvts.ugNotify.handler().addNotif({
							level: 'error',
							subtitle: failure.error,
						    sticky: false
						});
					}else{
						ugSyncEvts.ugNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.infoRefreshError,
						    sticky: false
						});
					}
				});
			});

			resultElementSelected.push(selection);
			return resultElementSelected;
		},
		
		loadModel: function (objId,propContainer) {
			var that = this, results = that.getPropModel({objectId: objId});
			that.EditPropWidget.initDatas(results);
			
			this.EditPropWidget.elements.container.inject(propContainer);			
		}
    };
    
    return UserGroupInfoPropWidget;
});

/**
 * datagrid view for usergroup summary page
 */
define('DS/ENOUserGroupMgmt/Views/UsersGroupPropertiesView',
        [   'DS/ENOUserGroupMgmt/Views/UserGroupInfoPropWidget'
            ], function(
            		UserGroupInfoPropWidget
            ) {

    'use strict';
    let _serverresponse = {},  _usergroupInfo;
    let build = function(userGroupInfo){
    	_usergroupInfo = userGroupInfo;	
    	_usergroupInfo.model.id = _usergroupInfo.model.pid;
        if(!showView()){//member view has never been rendered
        	let containerDiv = UWA.createElement('div', {id: 'usergroupPropertiesContainer','class':'usergroup-properties-container'}); 
        	containerDiv.inject(document.querySelector('.usergroup-facets-container'));
            UserGroupInfoPropWidget.render(containerDiv,_usergroupInfo);
        }
    };

    let hideView= function(){
        if(document.getElementById('usergroupPropertiesContainer') != null){
            document.getElementById('usergroupPropertiesContainer').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#usergroupPropertiesContainer') != null){
            document.getElementById('usergroupPropertiesContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	//
    };
    let UGMembersView = {
            init : (userGroupInfo) => { return build(userGroupInfo);},        
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };

    return UGMembersView;
});

define('DS/ENOUserGroupMgmt/Actions/MemberActions',
        [
         'UWA/Drivers/Alone',
         'UWA/Core',
         'DS/WAFData/WAFData',
          'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
         'DS/ENOUserGroupMgmt/Utilities/DataFormatter',
         'DS/ENOUserGroupMgmt/Model/UsersGroupMemberModel',
         'DS/ENOUserGroupMgmt/Utilities/Search/SearchUtil',
         'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
         'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
         'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
         ],
         function(
                 UWA,
                 UWACore,
                 WAFData,
                 WrapperTileView,
                 DataFormatter,
                 UserGroupMemberModel,
				 SearchUtil,
                 UserGroupServicesController,
                 UsersGroupModel,
                 NLS
         ) {
            'use strict';
            let MemberActions;
            MemberActions={
					onSearchClick: function(){
                    	var data =WrapperTileView.tileView();
                        var searchcom_socket,scopeId;
                        //TODO need to see why it's coming as undefined
                        require(['DS/ENOUserGroupMgmt/Model/UsersGroupMemberModel'], function(contentModel) {
                        	UserGroupMemberModel = contentModel;
							var usergroupOrg = "";
						    var socket_id = UWA.Utils.getUUID();
                            var that = this;

                            if (!UWA.is(searchcom_socket)) {
                                require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                                    searchcom_socket = SearchCom.createSocket({
                                        socket_id: socket_id
                                    });	
                                    let allowedTypes = "Person";    // UG105941: replace with constant
                                    var recentTypes = allowedTypes ? allowedTypes.split(',') : '';
                                    var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addContent", true, recentTypes);
    								refinementToSnNJSON.precond = SearchUtil.getPrecondForContentSearch(scopeId, recentTypes, usergroupOrg); 
    								refinementToSnNJSON.resourceid_not_in = UserGroupMemberModel.getMemberIDs();
    								//refinementToSnNJSON.resourceid_not_in = "";
                                    if (UWA.is(searchcom_socket)) {
                                        searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
                                       // searchcom_socket.addListener('Selected_Objects_search', ContentActions.selected_Objects_search.bind(that,data));
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
				

						// UG105941 : resourceid_value, owner  ,id 
						// ds6w:label

                         UserGroupServicesController.addMembersToGroup(that,data).then(function(resp) {
                        	 data = resp.data;
					         UserGroupMemberModel.appendRows(data);
                            ugSyncEvts.ugMgmtMediator.publish('usergroup-summary-Membersappend-rows',resp);
                            let userModel = UsersGroupModel.getRowModelByURI(resp.uri);
                            if(userModel == null || typeof userModel == 'undefined'){
        						userModel = UsersGroupModel.getRowModelById(resp.id);
        					}
                            ugSyncEvts.ugMgmtMediator.publish('usergroup-header-updated', {model:userModel.options.grid});                            
                            

                        }); 
                       
                    },
                    RemoveMembersFromUserGroup : function (that,ids,access){
                		
                		UserGroupServicesController.removeMembersFromUserGroup(that,ids).then(
                				success => {
                					// need to change alert message
                					var successMsg = NLS.successRemoveMemberFromUserGroup;
                					if(ids.length == 1){
                						successMsg = NLS.successRemoveMemberFromUserGroupSingle;
                					}
                					successMsg = successMsg.replace("{count}",ids.length);
                					ugSyncEvts.ugNotify.handler().addNotif({
                						level: 'success',
                						subtitle: successMsg,
                					    sticky: false
                					});
                					UserGroupMemberModel.deleteSelectedRows();
                					//ugSyncEvts.ugMgmtMediator.publish('usergroup-members-remove-row-by-ids',{model:ids});
                					ugSyncEvts.ugMgmtMediator.publish('usergroup-summary-Membersappend-rows',success);
                					let userModel = UsersGroupModel.getRowModelByURI(success.uri);
                					if(userModel == null || typeof userModel == 'undefined'){
                						userModel = UsersGroupModel.getRowModelById(success.id);
                					}
                                    ugSyncEvts.ugMgmtMediator.publish('usergroup-header-updated', {model:userModel.options.grid});
                					
                				},
                				failure =>{
                					//reject(failure);
                					

                				});
                				
                	
                	}


            };
            return MemberActions;

        });

/*
 * @module 'DS/ENOUserGroupMgmt/Views/Toolbar/UsersGroupMembersTabToolbarConfig'
 * this toolbar is used to create a toolbar of the UG members datagrid view
 */

define('DS/ENOUserGroupMgmt/Config/Toolbar/UserGroupAccessRightsToolbarConfig',
		['DS/ENOUserGroupMgmt/Utilities/RequestUtils',
        'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
   'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'],
  function (RequestUtils, UsersGroupModel,NLS) {
    let UGMemberTabToolbarConfig, 
    _viewData =  {
            menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,                   
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-list"
                  },
                  action: {
                      module: 'DS/ENOUserGroupMgmt/Views/ToggleViews', //TODO dummy method and function
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"Access Rights"
                      }
                    },
                  tooltip:NLS.gridView
                },
                {
                  type:'CheckItem',
                  title: NLS.tileView,
                  state: "selected",
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-small-tile"
                  },
                  action: {
                      module: 'DS/ENOUserGroupMgmt/Views/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"Access Rights"
                      }
                    },
                  tooltip:NLS.tileView
                }
              ]              
    };

  
    
		let writetoolbarDefination = function (model) {
    	
		let defination = {};
		let entries = [];
		if( RequestUtils.isAdmin ||
				(UsersGroupModel.getUserGroupDetails().owner== RequestUtils.contextUser && (RequestUtils.isLeader || RequestUtils.isAuthor))
				|| "Owner" == UsersGroupModel.getUserGroupDetails()[RequestUtils.contextUser]){
				entries.push({
					"id": "addContext",
					"className": "menu-context",
					"dataElements": {
					  "typeRepresentation": "functionIcon",
					  "icon": {
						"iconName": "user-add",
						"fontIconFamily": 1
					  }
					},
					"position": "far",
					"action": {
					  module: 'DS/ENOUserGroupMgmt/Actions/UserGroupAccessRightsActions',
					  func: 'launchAddMemberPanel',
					},
					"tooltip":NLS.addAccessRight,
					"category": "addRemove"
				  });
		}
		
		   
			   
        entries.push({
            "id": "view",
            "className": "contentViews",
            "dataElements": {
            	"typeRepresentation": "viewdropdown",
            	"icon": {
            		"iconName": "view-small-tile",
            		"fontIconFamily": 1
            	},                
            	"value":_viewData
            },
            "position": "far",
            "tooltip": NLS.tileView,
            "category": "action" 
        });
        
        defination.entries = entries;      
        return JSON.stringify(defination);
    }
	
    UGMemberTabToolbarConfig={
      writetoolbarDefination: () => {return writetoolbarDefination();},
      destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return UGMemberTabToolbarConfig;
  });

/* global define, widget */
/**
 * @overview Subscription Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Views/Dialogs/UserGroupRevokeAccessDialog', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel',
		'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENOUserGroupMgmt/Actions/UserGroupAccessRightsActions',
		'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
		'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css' ], 
	function(WAFData, UWACore,  WUXDialog, WUXImmersiveFrame, WUXButton,
			UserGroupAccessRightsModel,WrapperTileView, UserGroupAccessRightsActions,NLS) {
	'use strict';
	let RemoveMembers,dialog;
	let revokeAccessConfirmation = function(removeDetails){
		var that =UserGroupAccessRightsModel.usergroupInfo();
        if(removeDetails.data === undefined){
            removeDetails = UserGroupAccessRightsModel.getSelectedRowsModel();
        }
		
    	if(removeDetails.data.length < 1){
    		ugSyncEvts.ugNotify.handler().addNotif({
				level: 'error',
				subtitle: NLS.ErrorMembersRemoveSelection,
			    sticky: true
			});
    		return;
    	}
    	var idsToDelete = [];
		var idsCannotDelete = [];
		for(var i=0;i<removeDetails.data.length;i++){
			idsToDelete.push(removeDetails.data[i].options.grid.name);
		}
		let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body);  
        let dialogueContent = new UWA.Element('div',{
			"id":"removeMembersWarning",
			"class":""
			});
    	var header = "";
    	if(idsToDelete.length > 0){
            header = NLS.RevokeAccessDialogHeader
            dialogueContent.appendChild(UWA.createElement('div',{
            				"class":"",
        					"html": NLS.RevokeAccessDialogMsg
        				  }));
        	/*dialogueContent.appendChild(UWA.createElement('div',{
                "class":""
          }).appendChild(ulCanDelete));*/
        	
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
    	           label: NLS.ok,
    	           onClick: function (e) {
    	             var button = e.dsModel;
    	             var myDialog = button.dialog;
    	             revokeaccessConfirmed(that,idsToDelete);
    	           }
    	         }),
    	         Cancel: new WUXButton({
    	           label: NLS.cancel,
    	           onClick: function (e) {
    	             var button = e.dsModel;
    	             var myDialog = button.dialog;
    	             myDialog.close();
    	           }
    	         })
    	       }
    	     });
    };
    
    let revokeaccessConfirmed = function(that,ids){
    	var memberArray = [];
    	for(var index = 0 ; index<ids.length; index++){
    		memberArray.push({ "username": ids[index]});
    	}
    	var userRevokeaccessData = {
				"data": memberArray
		};
    	UserGroupAccessRightsActions.RevokeAccessFromUserGroup(that,userRevokeaccessData);
		dialog.close();
	};
    
    RemoveMembers={
    		revokeAccessConfirmation: (dataToRemove) => {return revokeAccessConfirmation(dataToRemove);}
    };
    
    return RemoveMembers;
});


/*
 * @module 'DS/ENOUserGroupMgmt/Config/Toolbar/UsersGroupSummaryToolbarConfig'
 * this toolbar is used to create a toolbar of the UG summary datagrid view
 */

define('DS/ENOUserGroupMgmt/Config/Toolbar/UsersGroupSummaryToolbarConfig',
  [ 	'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
	  'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'],
  function (RequestUtils, NLS) {
	let UserGroupDataGridViewToolbar, 
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
                      module: 'DS/ENOUserGroupMgmt/Views/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"UserGroupSummary"
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
                      module: 'DS/ENOUserGroupMgmt/Views/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"UserGroupSummary"
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
						title: NLS.FilterforMyGroup,    // UG105941  : NLS
						  id : "owned",
						  action: {
							  module: 'DS/ENOUserGroupMgmt/Actions/Toolbar/UsersGroupSummaryToolbarActions',
							  func: 'changeOwnerFilter',
							  argument: {
								  "type":"owner",
								  "filter":"owned"
							  }
						  },
						  //tooltip:NLS.filterOwnedbymeTooltip
				      },
				      {
				    	  type:'CheckItem',
				    	  title: NLS.FilterforAllGroup,   // UG105941 : NLS
						  id : "all",
						  state: "selected",
						  action: {
							  module: 'DS/ENOUserGroupMgmt/Actions/Toolbar/UsersGroupSummaryToolbarActions',
							  func: 'changeOwnerFilter',
							  argument: {
								  "type":"owner",
								  "filter":"all"
							  }
						  },
						  //tooltip:NLS.filterAssignedtomeTooltip
				      }
	    ]};


  
		return viewData;
	}
    let writetoolbarDefination = function (filterPreference,model) {
    var viewData = addFilterToolbarItems(filterPreference);
    var isAdmin = RequestUtils.isAdmin;
    let entries = [];
    let defination = {};
    entries.push({
        "id": "back",
        "dataElements": {
          "typeRepresentation": "functionIcon",
          "icon": {
            "iconName": "home",
            "fontIconFamily": 1
          }
        },
        "action": {
          module: 'DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView', //TODO dummy method and function
          func: 'backToUserGroupSummary',
        },
        
        "category": "status",
        "tooltip": NLS.home
      });
    
    entries.push({
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
          module: 'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupSummaryDataGridView', //TODO dummy method and function
          func: 'launchFilter',
        },
        "category": "status",
        "tooltip": NLS.filter              
    });
    if(!top.isMobile) {
    	entries.push({
            "id": "exportUserGroup",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                  "iconName": "export",
                  fontIconFamily: WUXManagedFontIcons.Font3DS
                }
            },
            "action": {
                module: 'DS/ENOUserGroupMgmt/Actions/UsersGroupActions', 
                func: 'exportUserGroups',
              },
            "position": "far",
            "category": "create",
            "tooltip": NLS.export
          });
    }
	
          
    if(RequestUtils.isAdmin || RequestUtils.isAuthor || RequestUtils.isLeader ) {
    	entries.push({
            "id": "createUserGroup",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                  "iconName": "plus",
                  fontIconFamily: WUXManagedFontIcons.Font3DS
                }
            },
            "action": {
                module: 'DS/ENOUserGroupMgmt/Views/Dialogs/InitiateUsersGroupDialog', //TODO dummy method and function
                func: 'InitiateUserGroupDialog',
              },
            "position": "far",
            "category": "create",
            "tooltip": NLS.newUserGroup
          });
    }
    
    entries.push({
        "id": "view",
        "className": "userGroupViews",
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
    //if(isAdmin || filterPreference=="owned"){
    	 entries.push({
    	        "id": "deleteUserGroup",
    	        "dataElements": {
    	          "typeRepresentation": "functionIcon",
    	          "icon": {
    	              "iconName": "trash",
    	              fontIconFamily: WUXManagedFontIcons.Font3DS
    	            },
    	            "action": {
    	                "module": "DS/ENOUserGroupMgmt/Views/Dialogs/RemoveUsersGroup",
    	                "func": "removeConfirmation"
    	              }
    	        },
    	        "position": "far",
    	        "category": "action",
    	        "tooltip": NLS.Delete 
    	      });	
    //}
   
    
    defination.entries = entries; 
    defination.typeRepresentations = {
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
    };
      return JSON.stringify(defination);
    };
    
    UserGroupDataGridViewToolbar = {
    		writetoolbarDefination: (filterPreference,model) => {return writetoolbarDefination(filterPreference,model);},
    		destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return UserGroupDataGridViewToolbar;
  });


/**
 * datagrid view for user group summary page
 */
define('DS/ENOUserGroupMgmt/Views/Grid/UsersGroupSummaryDataGridView',
		[ 
			'DS/ENOUserGroupMgmt/Config/UsersGroupSummaryGridViewConfig',
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENOUserGroupMgmt/Config/Toolbar/UsersGroupSummaryToolbarConfig'
			], function(
					DatagridViewConfig,
            	    WrapperDataGridView,
					UsersGroupSummaryToolbarConfig
            	    ) {

	'use strict';	
	let _toolbar, _dataGridInstance,filterpreferVal="owned";
	let build = function(model){
	
		var _container=UWA.createElement('div', {id:'dataGridViewContainer', 'class':'data-grid-container showView nonVisible'/*,styles: {
            'width': "100%",
            'height': "calc(100% - 40px)",
            'position': "relative"
          }*/});
		let toolbar = UsersGroupSummaryToolbarConfig.writetoolbarDefination(getFilterPreferences(),model);
		let dataGridViewContainer = WrapperDataGridView.build(model, DatagridViewConfig, toolbar, _container);
		_toolbar = WrapperDataGridView.dataGridViewToolbar();
		_dataGridInstance = WrapperDataGridView.dataGridView();

	
		return dataGridViewContainer;
	};
	

	let getGridViewToolbar = function(){
		return 	_toolbar;
	};
	let setFilterPreferences = function(value){
		filterpreferVal = value;
	}
	let getDataGridInstance = function(){
		return 	_dataGridInstance;
	};

	let getFilterPreferences = function(){ 
		return filterpreferVal;  // UG105941empty To be reviewed
		
	};
	
	let CustomDataGridView={
		build : (model) => { return build(model);},
		registerListners : () =>{return registerListners();}, 
		destroy: () => {_dataGrid.destroy();},
		getGridViewToolbar: () => {return getGridViewToolbar();},
		getDataGridInstance : () => {return getDataGridInstance();},
		setFilterPreferences : (value) => {return setFilterPreferences(value);}
	};

	return CustomDataGridView;
});

/* global define, widget */
/**
 * @overview User Group
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Actions/UsersGroupActions', [
		'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
		'DS/ENOUserGroupMgmt/Services/UserGroupServices',
		'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
		'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
		'DS/ENOUserGroupMgmt/Utilities/UserGroupSpinner',
		'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupSummaryDataGridView',
		'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',		
		'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css' ], 
	function( UserGroupServicesController,UserGroupServices,RequestUtils,UsersGroupModel,UserGroupSpinner, UsersGroupSummaryDataGridView,NLS) {
	'use strict';
	let UserGroupActions;
		
	let DeleteUserGroup = function(ids,actionFromIdCard){
		UserGroupServicesController.deleteUserGroup(ids).then(
				success => {
					// need to change alert message
					var successMsg = NLS.successRemoveUserGroup;
					if(ids.length == 1){
						successMsg = NLS.successRemoveUserGroupSingle;
					}
					successMsg = successMsg.replace("{count}",ids.length);
					ugSyncEvts.ugNotify.handler().addNotif({
						level: 'success',
						subtitle: successMsg,
					    sticky: false
					});
					ugSyncEvts.ugMgmtMediator.publish('usergroup-summary-delete-row-by-ids',{model:ids});
					
					ugSyncEvts.ugMgmtMediator.publish('usergroup-data-deleted',{model:ids});
					
					//alret("data-deleted");
					//resolve(success);
					// UG105941 : TODO multiple delete
					//ugSyncEvts.ugMgmtMediator.publish('usergroup-summary-delete-row-by-ids',{model:ids});  
	
					
					// Close the id card only if the UserGroup deleted is opened in the id card //
					//
					//ugSyncEvts.ugMgmtMediator.publish('usergroup-widgetTitle-count-update',{model:UserGroupModel.getModel()});
					
					
				},
				failure =>{
					ugSyncEvts.ugNotify.handler().addNotif({
						level: 'error',
						subtitle: NLS.failureRemoveUserGroup,
					    sticky: false
					});

					

				});
				
	};
	let _exportUserGroups = function(){
		
	/*	UserGroupSpinner.doWait(document.body);
		UserGroupServicesController.fetchAllUserGroups().then(				
					success => {
						let exportEle = _exportUG(success);
						UserGroupSpinner.endWait(document.body);
					},
					failure =>{
						UserGroupSpinner.endWait(document.body);
					});  */
					
		var csv = UsersGroupSummaryDataGridView.getDataGridInstance().getAsCSV();
		csv = csv.substring(1);
		var fileName = "ExportUserGroups";
    
		//Initialize file format csv or xls
		//var uri = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv);
		var uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
		//var uri = 'data:text/csv;charset=utf-8,' + escape(csv);

		
		var link = document.createElement("a");    
		link.href = uri;
		link.style = "visibility:hidden";
		link.download = fileName + ".csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
					
	
	}
	
	let _createUserGroup = function(properties){

	return new Promise(function(resolve, reject){
			var initiateJson = getParsedUserGroupProperties(properties);
			
			UserGroupServicesController.createUserGroup(initiateJson).then(
					resp => {
						
						resolve(resp)
						}, 
					resp => reject(resp));			
			})

		};
		
		let getParsedUserGroupProperties = function(properties){
		var dataelements = {
				"title": properties.fields.titleField.value,
				"description": properties.fields.descField.value,
				"owner": RequestUtils.contextUser
			}
		return dataelements;
	};
    
	UserGroupActions={
			
			DeleteUserGroup: (ids,actionFromIdCard) => {return DeleteUserGroup(ids,actionFromIdCard);},
			createUserGroup: (properties) => {return _createUserGroup(properties);},
			exportUserGroups: () => {return _exportUserGroups();}
    };
    
    return UserGroupActions;
});

define('DS/ENOUserGroupMgmt/Views/Dialogs/InitiateUsersGroupDialog', [  

  'DS/Windows/Dialog',
  'DS/Windows/ImmersiveFrame',
  'DS/Controls/Editor',
  'DS/Controls/LineEditor',
  'DS/Controls/Button',
  'DS/ENOUserGroupMgmt/Actions/UsersGroupActions',
  'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
],
  function (
	
		  WUXDialog,
		  WUXImmersiveFrame,Editor,WUXLineEditor,
		  WUXButton,UsersGroupActions,
		  NLS) {
	'use strict';
	
	
	
	let tabsContainer, dialog, _dialog, _buttonOKEnabled, _buttonApplyEnabled,_defaultJSON = {};	
	let _properties = {};
	
	
	let InitiateDialog = function (contentData) {
    	let dialogueContent = new UWA.Element('div',{
    			"id":"createUserGroup",
    			"class":""
    			});		

		_properties.formFields = new UWA.Element('div',{
                "id":"creatFormField",
                "class":""
                });	
		_properties.fields = {};
		
		_properties.formFields.inject(dialogueContent);
		
		new UWA.Element("h5", {"class":"required", text: NLS.title}).inject(_properties.formFields);
		
		 _properties.fields.titleField = new WUXLineEditor({
					placeholder: NLS.CreateUGNameValidation,
					//requiredFlag: true,
					pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
					sizeInCharNumber: 61
			    })
        _properties.fields.titleField.inject(_properties.formFields);
		
		new UWA.Element("h5", { text: NLS.description}).inject(_properties.formFields);
		_properties.fields.descField = new Editor({
			  placeholder: NLS.CreateUGDescriptionValidation,
              //pattern: "[a-z]+",                
              widthInCharNumber: 63,
              nbRows: 5,
              newLineMode: 'enter',
            });
        _properties.fields.descField.inject(_properties.formFields);
		
    	
		var immersiveContainer = new UWA.Element('div', {
                        'class' : 'dialog-immersiveframe',

                    }).inject(document.body);

		let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(immersiveContainer);  
		

    	var header = NLS.HeaderCreateGroup
    	
    	dialog = new WUXDialog({
    		   	modalFlag : true,
    		   	width : 500,
    		   	height : 300,
    		   	title: header,
    		   	content: dialogueContent,
    		   	immersiveFrame: immersiveFrame,
    		   	buttons: {
    		   		Ok: new WUXButton({
    		   			label: NLS.create,
    		   			//disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
							var titleField = _properties.fields.titleField.value;
							if(titleField == undefined || titleField == ""){
								ugSyncEvts.ugNotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.errorGroupEmptyName,
								    sticky: false
								});
								return;
							}
							else if(titleField.length < 3){
								ugSyncEvts.ugNotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.errorGroupMinLengthName,
								    sticky: false
								});
								return;
							} else if(titleField.length > 128){
								ugSyncEvts.ugNotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.errorGroupMaxLengthName,
								    sticky: false
								});
								return;
							}
							UsersGroupActions.createUserGroup(_properties).then(success =>
                		  {

							var ugModel = JSON.parse(success);
							myDialog.close();
							ugSyncEvts.ugMgmtMediator.publish('usergroup-summary-append-rows', ugModel.groups[0]);
							ugSyncEvts.ugNotify.handler().addNotif({
								level: 'success',
								subtitle: NLS.successGroupCreation,
							    sticky: false
							});
							
                		  },
                		  failure => {
                			  var errormessage = "";
								if(failure && failure.error && failure.error.message) {
									errormessage = failure.error.message;
								} else {
									errormessage = NLS.errorOnCreation
								}
								ugSyncEvts.ugNotify.handler().addNotif({
								level: 'error',
								subtitle: failure.error.message,
							    sticky: false
								});
                		  }); 
    		   			
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
			 dialog.addEventListener('close' , function(e){
				 this.destroy();
				 var renderDiv = document.getElementsByClassName('dialog-immersiveframe');
				 if(renderDiv.length>0){
					renderDiv[0].destroy();
				 }
						
			}) ;
    };
	
    let registerDialogButtonEvents = function(){
    };
	
    
    let InitiateUserGroupDialog={ 
    		InitiateUserGroupDialog: (contentIds) => {return InitiateDialog(contentIds);}    		
    };

    return InitiateUserGroupDialog;

  });

define('DS/ENOUserGroupMgmt/Views/UsersGroupTabsView', [
  'DS/Controls/TabBar',
  'DS/ENOUserGroupMgmt/Config/UsersGroupTabsConfig'
  
],
  function (WUXTabBar,UserGroupTabsConfig) {
	'use strict';
	let _usergroupTabs, _currentTabIndex, UserGroupTabInstances = {}, _usergroupInfoModel = {};
	
	let UserGroupTabsView = function(container,usergroupInfoModel){
		_usergroupInfoModel = usergroupInfoModel;
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
		var ntabs =["members","properties","accessRights"];
		UserGroupTabInstances[ntabs[seltab]].init(_usergroupInfoModel);
		if(typeof _currentTabIndex != 'undefined'){
			UserGroupTabInstances[ntabs[_currentTabIndex]].hideView();
		}			
		_currentTabIndex = seltab;		
	};
   
	UserGroupTabsView.prototype.init = function(){		
		_usergroupTabs = new WUXTabBar({
            displayStyle: 'strip',
            showComboBoxFlag: true,
            editableFlag: false,
            multiSelFlag: false,
            reindexFlag: true,
            touchMode: true,
            centeredFlag: false,
            allowUnsafeHTMLOnTabButton: true
        });
		UserGroupTabsConfig.forEach((tab) => {
		    _usergroupTabs.add(tab); //adding the tabs
		});
		_usergroupTabs.inject(this.container);
		
		//draw the tab contents
		initializeUserGroupTabs();	
    };
    
    
    
	let initializeUserGroupTabs = function(){		
		new Promise(function (resolve, reject){
			let promiseArr = [];
			UserGroupTabsConfig.forEach((tab, index)=>
			{				
				if(tab.loader != ""){
					promiseArr[index] = new Promise(function (resolve, reject){
						require([tab.loader], function (loader) {
							UserGroupTabInstances[tab.id] = loader;	
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
			_usergroupTabs.addEventListener('tabButtonClick', function(args){
				ontabClick(args);
			});
			_usergroupTabs.addEventListener('change', function(args){
				ontabClick(args);
			});
			
		}, function () {
			//Error during tab click
		});
		
		
	};
	UserGroupTabsView.prototype.destroy = function(){	    	
		try{
			_currentTabIndex = undefined; //this should be the first line, if some error occurs afterward, that would be an issue otherwise			
			Object.keys(UserGroupTabInstances).map((tab) => {
				UserGroupTabInstances[tab].destroy();
			});
			if(_usergroupTabs != undefined){
				_usergroupTabs.destroy();
			}
			_usergroupInfoModel = {};
			this.container.destroy();
		}catch(e){
	    		//TODO check why this error: TypeError: Cannot read property '__resizeListeners__' of undefined
			console.log(e);
		}	
	};   

    
    return UserGroupTabsView;
  });

/* global define, widget */
/**
 * @overview Subscription Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Views/Dialogs/RemoveMembers', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENOUserGroupMgmt/Model/UsersGroupMemberModel',
		'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
		'DS/ENOUserGroupMgmt/Actions/UsersGroupActions',
		'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
		'DS/ENOUserGroupMgmt/Actions/MemberActions',
		'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
		'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css' ], 
	function(WAFData, UWACore,  WUXDialog, WUXImmersiveFrame, WUXButton,
			UsersGroupMemberModel,WrapperTileView,WrapperDataGridView,UsersGroupActions,UsersGroupModel, MemberActions,NLS) {
	'use strict';
	let RemoveMembers,dialog;
	let removeMembersConfirmation = function(removeDetails){
		var that = WrapperTileView.tileView();
        if(removeDetails.data === undefined){
            removeDetails = UsersGroupMemberModel.getSelectedRowsModel();
        }
		
    	if(removeDetails.data.length < 1){
    		ugSyncEvts.ugNotify.handler().addNotif({
				level: 'error',
				subtitle: NLS.ErrorMembersRemoveSelection,
			    sticky: true
			});
    		return;
    	}
    	var idsToDelete = [];
		var idsCannotDelete = [];
		/*var ulCanDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });*/
		/*var ulCannotDelete = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });*/
		for(var i=0;i<removeDetails.data.length;i++){
			idsToDelete.push(removeDetails.data[i].options.grid.name);
		}
		let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body);  
        let dialogueContent = new UWA.Element('div',{
			"id":"removeMembersWarning",
			"class":""
			});
    	var header = "";
    	if(idsToDelete.length > 0){
    	    if(idsToDelete.length == 1){
                header = NLS.removeMembersHeaderSingle
            }else{
                header = NLS.removeMembersHeader;
            }
    		if(idsToDelete.length == 1){
                dialogueContent.appendChild(UWA.createElement('div',{
                    "class":"",
                    "html": NLS.removeMembersDetailSingle
                }));
            }else{
            	dialogueContent.appendChild(UWA.createElement('div',{
            				"class":"",
        					"html": NLS.removeMembersDetail
        				  }));
            }
        	/*dialogueContent.appendChild(UWA.createElement('div',{
                "class":""
          }).appendChild(ulCanDelete));*/
        	
    	}
    	if(idsCannotDelete.length > 0){
    		if(header == ""){
    			header = NLS.removeMembersHeader2;
    		}
    		dialogueContent.appendChild(UWA.createElement('div',{
    			"class":"",
				"html": NLS.removeUserGroupMembersWarningDetail2
			  }));
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
    	           label: NLS.ok,
    	           onClick: function (e) {
    	             var button = e.dsModel;
    	             var myDialog = button.dialog;
    	             removeConfirmed(that,idsToDelete);
    	           }
    	         }),
    	         Cancel: new WUXButton({
    	           label: NLS.cancel,
    	           onClick: function (e) {
    	             var button = e.dsModel;
    	             var myDialog = button.dialog;
    	             myDialog.close();
    	           }
    	         })
    	       }
    	     });
    };
    
    let removeConfirmed = function(that,ids){
    	MemberActions.RemoveMembersFromUserGroup(that,ids);
		dialog.close();
	};
    
    RemoveMembers={
    		removeMembersConfirmation: (dataToRemove) => {return removeMembersConfirmation(dataToRemove);}
    };
    
    return RemoveMembers;
});

/* global define, widget */
/**
 * @overview User Group Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Views/Menu/MemberContextualMenu', [
        'DS/Menu/Menu',
        'DS/ENOUserGroupMgmt/Actions/MemberActions',
        'DS/ENOUserGroupMgmt/Views/Dialogs/RemoveMembers',
        'DS/ENOUserGroupMgmt/Views/Dialogs/UserGroupRevokeAccessDialog',
        'DS/ENOUserGroupMgmt/Actions/UserGroupAccessRightsActions',
        'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
        'DS/ENOUserGroupMgmt/Model/UsersGroupMemberModel',
        'DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel',
        'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
        'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
        'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
        'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css' ], 
    function(WUXMenu, MemberActions,RemoveMembers,UserGroupRevokeAccessDialog,UserGroupAccessRightsActions,WrapperTileView,UsersGroupMemberModel,UserGroupAccessRightsModel,RequestUtils,UsersGroupModel, NLS){
        'use strict';
        let Menu;
        let usergroupMemberGridCheveron = function(grid,id){
            var actions=[];
            var curAccess= grid.Access;

            var that = WrapperTileView.tileView();
            actions= ["Remove"];
            var element = UWA.createElement('div', {
                "class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-chevron-down",
                events: {
                    click: function (event) {
                        // To handle multiple selection //
                        // This will avoid unselecting the selected rows when click on actions //
                        event.preventDefault();
                        event.stopPropagation();
                        // The coordinates to show the menu
                        var pos = event.target.getBoundingClientRect();
                        var config = {
                                position: {
                                    x: pos.left,
                                    y: pos.top + 20
                                }
                        };
                        //var selectedDetails = WrapperDataGridView.getSelectedRowsDetails();
                        var menu = [];

                        menu = menu.concat(memberContextualMenu(that,actions,id,curAccess));


                        WUXMenu.show(menu, config);
                    }
                }
            });
            return element; 
        };
        

        let memberContextualMenu = function(that,actions,id,curAccess){
            // Display menu
            let selectAccess;
            var menu = [];  // remove member to be added
            if(actions.indexOf("Remove") !== -1 && (RequestUtils.isAdmin || 
            		(UsersGroupModel.getUserGroupDetails().owner== RequestUtils.contextUser && (RequestUtils.isLeader || RequestUtils.isAuthor)) ||
            		"Owner" == UsersGroupModel.getUserGroupDetails()[RequestUtils.contextUser] || "Manager" == UsersGroupModel.getUserGroupDetails()[RequestUtils.contextUser])){
                selectAccess="unselected";
                if(curAccess== "role.remove"){
                    selectAccess="selected";
                } 
                menu.push({
                    name: NLS.removeMember,
                    title: NLS.removeMember,
                    type: 'PushItem',
                    state: selectAccess,
                    fonticon: {
	                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
	                },                    
                    data: null,
                    action: {
                        callback: function () {
                        	RemoveMembers.removeMembersConfirmation(UsersGroupMemberModel.getSelectedRowsModel());
                            //MemberActions.RemoveMembersFromUserGroup(that,id,"Remove");
                        }
                    }
                });
            }

            return menu;
        };
        

        let accessRightsContextualMenu = function(grid,id){
            // Display menu
        	let selectAccess;
            var menu = [];  // remove member to be added
	        if(RequestUtils.isAdmin || 
	        		(UsersGroupModel.getUserGroupDetails().owner== RequestUtils.contextUser && (RequestUtils.isLeader || RequestUtils.isAuthor)) ||  
	        		("Owner" == UsersGroupModel.getUserGroupDetails()[RequestUtils.contextUser] && RequestUtils.contextUser != grid.name )){
	            if(grid.Role == "Manager" && UserGroupAccessRightsModel.getSelectedRowsModel().data.length <=1  ){
	            	var memberArray = [];
	            	memberArray.push({ "username": grid.name,
						"accessName": "Owner",
						"personName":grid.personName});
	            	var useraccessData = {
							"data":memberArray
					};
	                menu.push({
	                    name: NLS.AccessRights_AddMembers_OwnerRole,
	                    title: NLS.AccessRights_AddMembers_OwnerRole,
	                    type: 'PushItem',
	                    state: selectAccess,
	                    fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-favorite-on'
		                },                    
	                    data: null,
	                    action: {
	                        callback: function () {
	                        	UserGroupAccessRightsActions.switchuserAccess(useraccessData,grid);
	                            //MemberActions.RemoveMembersFromUserGroup(that,id,"Remove");
	                        }
	                    }
	                });
	               
	            }
	            
	            if(grid.Role == "Owner" && UserGroupAccessRightsModel.getSelectedRowsModel().data.length <=1 ){
	            	var memberArray1 = [];
	            	memberArray1.push({ "username": grid.name,
						"accessName": "Manager",
	            		"personName":grid.personName});
	            	var useraccessData1 = {
							"data":memberArray1
					};
	                menu.push({
	                    name: NLS.AccessRights_AddMembers_ManagerRole,
	                    title: NLS.AccessRights_AddMembers_ManagerRole,
	                    type: 'PushItem',
	                    state: selectAccess,
	                    fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-feather'
		                },                    
	                    data: null,
	                    action: {
	                        callback: function () {
	                        	UserGroupAccessRightsActions.switchuserAccess(useraccessData1,grid);
	                            //MemberActions.RemoveMembersFromUserGroup(that,id,"Remove");
	                        }
	                    }
	                });
	               
	            }
	            menu.push({
	                name: NLS.RevokeAccess,
	                title: NLS.RevokeAccess,
	                type: 'PushItem',
	                fonticon: {
	                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-block'
	                },                    
	                data: null,
	                action: {
	                    callback: function () {
	                    	UserGroupRevokeAccessDialog.revokeAccessConfirmation(UserGroupAccessRightsModel.getSelectedRowsModel(),grid);
	                        //MemberActions.RemoveMembersFromUserGroup(that,id,"Remove");
	                    }
	                }
	            });
	        }
            return menu;
        };

        
        
        
        
        let usergroupAccessRightsGridCheveron = function(grid,id){
            var element = UWA.createElement('div', {
                "class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-chevron-down",
                events: {
                    click: function (event) {
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
                        menu =  menu.concat(accessRightsContextualMenu(grid,id));
                        WUXMenu.show(menu, config);
                    }
                }
            });
            return element; 
        };

        
        let membersGridRightClick = function(event,grid){
            // To handle multiple selection //
            // This will avoid unselecting the selected rows when click on actions //
        	var that = WrapperTileView.tileView();
            var actions= ["Remove"];
            var curAccess= grid.Access;
            var idArray = [];
            idArray.push(grid.name);
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

            menu = menu.concat(memberContextualMenu(that,actions,idArray,curAccess));
            WUXMenu.show(menu, config);
        };
        
        Menu={
               
                memberContextualMenu: (that,actions,id,curAccess) => {return memberContextualMenu(that,actions,id,curAccess);},
                accessRightsContextualMenu: (grid,id) => {return accessRightsContextualMenu(grid,id);},
                membersGridRightClick: (event,grid) => {return membersGridRightClick(event,grid);},
                usergroupAccessRightsGridCheveron: (grid,id) => {return usergroupAccessRightsGridCheveron(grid,id);},
                usergroupMemberGridCheveron: (grid,id) => {return usergroupMemberGridCheveron(grid,id);}
                
        };
        
        return Menu;
    });



define('DS/ENOUserGroupMgmt/Views/Grid/UserGroupMembersGridCustomColumns', 
        [
         'DS/Controls/Button',
         'DS/Controls/TooltipModel',
         'UWA/Drivers/Alone',
         'DS/ENOUserGroupMgmt/Views/Menu/MemberContextualMenu',
         'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
         ], 
        function(WUXButton, WUXTooltipModel, Alone,MemberContextualMenu, NLS) {
    
    'use strict';
    let onMemberActionCellRequest= function (cellInfos) {
        var cell= cellInfos.cellView.getContent();                  
        var commandsDiv="";
        
        if (!cellInfos.isHeader) {
            var idArray = [];
            idArray.push(cellInfos.nodeModel.options.grid.name);
            commandsDiv = UWA.createElement('div',{
                "html": MemberContextualMenu.usergroupMemberGridCheveron(cellInfos.nodeModel.options.grid,idArray)
            });
            commandsDiv.tooltipInfos = new WUXTooltipModel({ shortHelp: NLS.actions,allowUnsafeHTMLShortHelp: true});
        }
        cell.setContent(commandsDiv);
    };
    let onAccessRightsActionCellRequest= function (cellInfos) {
    	
    	let reusableContent;    	
		if (!cellInfos.isHeader) {
			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_actions_');
			 if (reusableContent) {
					 var idArray = [];
						idArray.push(cellInfos.nodeModel.options.grid.name);
						reusableContent.setHTML(MemberContextualMenu.usergroupAccessRightsGridCheveron(cellInfos.nodeModel.options.grid,idArray))
						reusableContent.tooltipInfos = new WUXTooltipModel({ shortHelp: NLS.actions,allowUnsafeHTMLShortHelp: true});
						reusableContent.setStyle();
						cellInfos.cellView._setReusableContent(reusableContent);
			 }
		}   	
    
        
    };
    
    let UserGroupMembersGridCustomColumns={
        onMemberActionCellRequest : (cellInfos) => { return onMemberActionCellRequest(cellInfos);},
        onAccessRightsActionCellRequest : (cellInfos) => { return onAccessRightsActionCellRequest(cellInfos);}
    };
    return UserGroupMembersGridCustomColumns;
  });

/*
 * @module 'DS/ENOUserGroupMgmt/Views/Toolbar/UsersGroupMembersTabToolbarConfig'
 * this toolbar is used to create a toolbar of the UG members datagrid view
 */

define('DS/ENOUserGroupMgmt/Config/Toolbar/UsersGroupMembersTabToolbarConfig',
  ['DS/ENOUserGroupMgmt/Utilities/RequestUtils',
	  'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
   'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'],
  function (RequestUtils, UsersGroupModel,NLS) {
    let UGMemberTabToolbarConfig, 
    _viewData =  {
            menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,                   
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-list"
                  },
                  action: {
                      module: 'DS/ENOUserGroupMgmt/Views/ToggleViews', //TODO dummy method and function
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
                  state: "selected",
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-small-tile"
                  },
                  action: {
                      module: 'DS/ENOUserGroupMgmt/Views/ToggleViews', 
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
    	
		var isAdmin = RequestUtils.isAdmin;
		let defination = {};
		let entries = [];
		let contextuser = RequestUtils.contextUser 
		if(RequestUtils.isAdmin || 
				(UsersGroupModel.getUserGroupDetails().owner== RequestUtils.contextUser && (RequestUtils.isLeader || RequestUtils.isAuthor))
				||  "Owner" == UsersGroupModel.getUserGroupDetails()[contextuser] || "Manager" == UsersGroupModel.getUserGroupDetails()[contextuser]){
				entries.push({
					"id": "createContent",
					"dataElements": {
						"typeRepresentation": "functionIcon",
						"icon": {
							"iconName": "users-add",
							fontIconFamily: WUXManagedFontIcons.Font3DS
						},
						"action": {
							"module": "DS/ENOUserGroupMgmt/Actions/MemberActions",
							"func": "onSearchClick"
						}
					},
					"position": "far",
					"category": "create",
					"tooltip": NLS.addExistingMembers
				});
		}
		
		   
			   
        entries.push({
            "id": "view",
            "className": "contentViews",
            "dataElements": {
            	"typeRepresentation": "viewdropdown",
            	"icon": {
            		"iconName": "view-small-tile",
            		"fontIconFamily": 1
            	},                
            	"value":_viewData
            },
            "position": "far",
            "tooltip": NLS.tileView,
            "category": "action" 
        });
        if(isAdmin ||  
        		(UsersGroupModel.getUserGroupDetails().owner== RequestUtils.contextUser && (RequestUtils.isLeader || RequestUtils.isAuthor))
        		||  "Owner" == UsersGroupModel.getUserGroupDetails()[contextuser] || "Manager" == UsersGroupModel.getUserGroupDetails()[contextuser]){
	        entries.push({
	        	"id": "removeContent",
	        	"dataElements": {
	        		"typeRepresentation": "functionIcon",
	 	            "icon": {
	 	            	"iconName": "trash",
	 	            	fontIconFamily: WUXManagedFontIcons.Font3DS
	 	            },
	 	            "action": {
	 	            	"module": "DS/ENOUserGroupMgmt/Views/Dialogs/RemoveMembers",
	 	            	"func": "removeMembersConfirmation"
	 	            }
	        	},
	        	"position": "far",
	        	"category": "action",
	        	"tooltip": NLS.removeMember 
	        });
        }
        
        defination.entries = entries;      
        return JSON.stringify(defination);
    }
	
    UGMemberTabToolbarConfig={
      writetoolbarDefination: () => {return writetoolbarDefination();},
      destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return UGMemberTabToolbarConfig;
  });

/**
 * datagrid view for usergroup summary page
 */
define('DS/ENOUserGroupMgmt/Views/Tile/UsersGroupMembersTileView',
        [   
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENOUserGroupMgmt/Views/Menu/MemberContextualMenu'
            ], function(
            		WrapperTileView,
                    MemberContextualMenu
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
            styles: {
                'width': "100%",
                'height': "calc(100% - 40px)",
                'position': "relative"
            },
            'class': "Members-tileView-View showView nonVisible"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv);
        return dataTileViewContainer;
    };  

    let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                    var menu = [];
                    var actions=[];
                
                    if (params && params.cellInfos) {
                        if (params.cellInfos.cellModel) {
                            var selectedNode = _model.getSelectedNodes();
                            var curAccess= selectedNode[0].options.grid.Access;
                            var actions= ["Remove"];
                            var idArray = [];
                            idArray.push(selectedNode[0]._options.grid.name);
                            menu=MemberContextualMenu.memberContextualMenu(_tileView,actions,idArray,curAccess);
                        }
                    }
                    return menu; 
                }

        }
    };


    let UGMembersTileView={
            build : (model) => { return build(model);},
            contexualMenuCallback : () =>{return contexualMenuCallback();}
    };

    return UGMembersTileView;
});

define('DS/ENOUserGroupMgmt/Config/UsersGroupMembersGridViewConfig',
        [   
         'DS/ENOUserGroupMgmt/Views/Grid/UserGroupMembersGridCustomColumns',
         'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'], 
        function(UserGroupMembersGridCustomColumns,NLS) {

    'use strict';

    let UserGroupMembersGridViewConfig=[{
     	   text: NLS.Name,
          dataIndex: 'tree',
          editableFlag: false
     	},{
     		text: NLS.actions,
     		dataIndex: 'Action',
     		editableFlag: false,
     		'onCellRequest':UserGroupMembersGridCustomColumns.onMemberActionCellRequest
		}];
    return UserGroupMembersGridViewConfig;

});


 


/**
 * datagrid view for user group members tab page
 */
define('DS/ENOUserGroupMgmt/Views/Grid/UsersGroupMembersDataGridView',
        [   
            'DS/ENOUserGroupMgmt/Config/UsersGroupMembersGridViewConfig',
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENOUserGroupMgmt/Config/Toolbar/UsersGroupMembersTabToolbarConfig'
            ], function(
            		UserGroupMembersGridViewConfig,
                    WrapperDataGridView,
                    UserGroupMembersTabToolbarConfig ) {

    'use strict';   
    let build = function(model){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            styles: {
                'width': "100%",
                'height': "calc(100% - 40px)",
                'position': "relative"
            },
            'class': "Members-gridView-View hideView"
        });
        let toolbar = UserGroupMembersTabToolbarConfig.writetoolbarDefination();
        let dataGridViewContainer = WrapperDataGridView.build(model, UserGroupMembersGridViewConfig, toolbar, gridViewDiv);
        return dataGridViewContainer;
    };  
    let getGridViewToolbar = function(){
        return WrapperDataGridView.dataGridViewToolbar();   
    };
	let getAddMemberForm = function(){
        //return WrapperDataGridView.dataGridViewToolbar();   
		var addMemberViewDiv = UWA.createElement("div", {id:'memberFormContainer',
            styles: {
                'width': "100%",
                'height': "100px",
                'position': "relative",
				"color" : "#3d3d3d"
            }
           // 'class': "Members-gridView-View hideView"
        });

        return addMemberViewDiv;
    };


    let UGContentsDataGridView={
            build : (model) => { return build(model);}, 
            getGridViewToolbar: () => {return getGridViewToolbar();}, 
            getAddMemberForm: () => {return getAddMemberForm();}
    };

    return UGContentsDataGridView;
});

/**
 * datagrid view for usergroup summary page
 */
define('DS/ENOUserGroupMgmt/Views/UsersGroupMembersView',
        [   'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupMembersDataGridView',
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENOUserGroupMgmt/Views/Tile/UsersGroupMembersTileView',
            'DS/ENOUserGroupMgmt/Model/UsersGroupMemberModel',
            'DS/ENOUserGroupMgmt/Utilities/PlaceHolder',
            'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController'
            ], function(
                    UGMembersDataGridView,
                    WrapperDataGridView,
                    UGMembersTileView,
                    UserGroupMemberModel,
                    PlaceHolder,
                    UGServicesController
            ) {

    'use strict';
    let _serverresponse = {},  _usergroupInfo;
    let build = function(userGroupInfo){
    	_usergroupInfo = userGroupInfo;
		
        if(!showView()){//member view has never been rendered
        	let containerDiv = UWA.createElement('div', {id: 'usergroupMembersContainer','class':'usergroup-members-container'}); 
        	containerDiv.inject(document.querySelector('.usergroup-facets-container'));

             UGServicesController.fetchUserGroupMembers(_usergroupInfo.model.pid).then(function(response) {
                 UserGroupMemberModel.destroy();
                 UserGroupMembersViewModel(response, userGroupInfo);
                drawUserGroupMembersView(containerDiv); 
                
            }); 
        }

    };

    let drawUserGroupMembersView = function(containerDiv){
        //To add the dataGrid view list
        let datagridDiv = UGMembersDataGridView.build(UserGroupMemberModel.getModel());
        
        //To add the Tile view summary list
        let tileViewDiv= UGMembersTileView.build(UserGroupMemberModel.getModel());
        UGMembersTileView.contexualMenuCallback();
        registerListners();

        //get the toolbar:no toolbar for now
        let membersTabToolbar=UGMembersDataGridView.getGridViewToolbar();
        
        //Add all the divs into the main container
        
        let toolBarContainer = UWA.createElement('div', {id:'dataGridMembersDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);

        membersTabToolbar.inject(toolBarContainer);

        datagridDiv.inject(containerDiv);
        tileViewDiv.inject(containerDiv);
        
        if (UserGroupMemberModel.getModel().getChildren().length ==0 ) {
            PlaceHolder.showEmptyMemberPlaceholder(containerDiv);
        }
        PlaceHolder.registerListeners();
        
        registerEventListeners();
        return containerDiv;
    };
    
    let registerEventListeners = function(){
    	
    	/*ugSyncEvts.ugMgmtMediator.subscribe('usergroup-members-remove-row-by-ids', function (data) {
    		if(data.model.length > 0){				
    			UserGroupMemberModel.deleteSelectedRows();					
			}
		});*/
    	
    	/* widget.UserGroupMgmtMediator.subscribe('usergroup-task-on-change-assignee', function () {
    		getUpdatedMembersModel();    		
		});
    	//usergroup-task-on-save
    	widget.UserGroupMgmtMediator.subscribe('usergroup-task-on-save', function () {
    		getUpdatedMembersModel();    		
		});
    	//ON_SPLIT_USERGROUPNODE
    	widget.UserGroupMgmtMediator.subscribe('ON_SPLIT_USERGROUPNODE', function () {
    		getUpdatedMembersModel();    		
		}); */
    };
    
    let getUpdatedMembersModel = function(){
    	/* if(_usergroupInfo.model && _usergroupInfo.model.id){
    		UserGroupServicesController.fetchUserGroupMembers(_usergroupInfo.model.id).then(function(response) {
                UserGroupMemberModel.getModel().removeRoots();
                UserGroupMemberModel.createModel(response, _usergroupInfo);               
            });
    	} */
    };
    
    let UserGroupMembersViewModel = function(serverResponse, userGroupInfo){      

        UserGroupMemberModel.createModel(serverResponse,userGroupInfo);
        UserGroupMemberModel.getModel().UserGroupId = userGroupInfo.model.uri;
        UserGroupMemberModel.getModel().UserGroupState=userGroupInfo.model.state;
        UserGroupMemberModel.getModel().UserGroupPID=userGroupInfo.model.id;
        UserGroupMemberModel.setContextUGInfo(userGroupInfo);
    };

    let openContextualMenu = function (e, cellInfos) {
        //  that.onItemClick(e, cellInfos);
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
              if (e.button == 2) {
                  require(['DS/ENOUserGroupMgmt/Views/Menu/MemberContextualMenu'], function (MemberContextualMenu) {
                     MemberContextualMenu.membersGridRightClick(e,cellInfos.nodeModel.options.grid);
                });           
             }
        }
    };
    
    let registerListners = function(){
        let dataGridView = WrapperDataGridView.dataGridView();
        dataGridView.addEventListener('contextmenu', openContextualMenu);
        /* widget.UserGroupMgmtMediator.subscribe('member-data-updated', function (data) {         
            UserGroupMemberModel.updateRow(data);            
        });  */       
    };
    let hideView= function(){
        if(document.getElementById('usergroupMembersContainer') != null){
            document.getElementById('usergroupMembersContainer').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#usergroupMembersContainer') != null){
            document.getElementById('usergroupMembersContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	_serverresponse = {};    	 
    	_usergroupInfo = {};
    	UserGroupMemberModel.destroy();
    };
    let UGMembersView = {
            init : (userGroupInfo) => { return build(userGroupInfo);},        
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };

    return UGMembersView;
});


define('DS/ENOUserGroupMgmt/Views/Tile/UsersGroupAccessRightsDataTileView',
        	[                         
        		'DS/ENOUserGroupMgmt/Views/Menu/MemberContextualMenu',
            'DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel',
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView'
            ], function(            		
            		ContextualMenu,UserGroupAccessRightsModel,WrapperTileView
            		
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
        var tileViewDiv = UWA.createElement("div", {id:'accessRightstileViewContainer',
            styles: {
                'width': "100%",
                'height': "calc(100% - 40px)",
                'position': "relative"
            },
            'class': "accessrights-tileView-View showView nonVisible"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv);
        return dataTileViewContainer;
    };  

    let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        var that =UserGroupAccessRightsModel.usergroupInfo();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                    var menu = [];
                    var actions=[];
                
                    if (params && params.cellInfos) {
                        if (params.cellInfos.cellModel) {
                            var selectedNode = _model.getSelectedNodes();
                            var curAccess= selectedNode[0].options.grid.Access;
                            var actions= ["RevokeAccess"];
                            var idArray = [];
                            idArray.push(selectedNode[0]._options.grid.name);
                            menu=ContextualMenu.accessRightsContextualMenu(selectedNode[0].options.grid,idArray);
                        }
                    }
                    return menu; 
                }

        }
    };


    let UsersGroupAccessRightsDataTileView={
            build : (model) => { return build(model);},
            contexualMenuCallback : () =>{return contexualMenuCallback();}
    };

    return UsersGroupAccessRightsDataTileView;
});

/**
 * 
 */

define('DS/ENOUserGroupMgmt/Config/UsersGroupAccessRightsGridViewConfig',
        [   
         'DS/ENOUserGroupMgmt/Views/Grid/UserGroupMembersGridCustomColumns',
         'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'], 
        function(
        		UserGroupMembersGridCustomColumns,
        		NLS) {

    'use strict';

    let UsersGroupAccessRightsGridViewConfig=[{
     	   text: NLS.Name,
          dataIndex: 'tree',
          editableFlag: false
     	},{
     		text: NLS.Role,
     		dataIndex: 'RoleDisplay',
     		editableFlag: false
		},{
     		text: NLS.actions,
     		dataIndex: 'Actions',
     		'onCellRequest':UserGroupMembersGridCustomColumns.onAccessRightsActionCellRequest
		}];
    return UsersGroupAccessRightsGridViewConfig;

});


 


/**
 * datagrid view for user group members tab page
 */
define('DS/ENOUserGroupMgmt/Views/Grid/UsersGroupAccessRightsDataGridView',
        [   
            'DS/ENOUserGroupMgmt/Config/UsersGroupAccessRightsGridViewConfig',
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENOUserGroupMgmt/Config/Toolbar/UserGroupAccessRightsToolbarConfig'
            ], function(
            		UsersGroupAccessRightsGridViewConfig,
                    WrapperDataGridView,
                    UserGroupAccessRightsToolbarConfig ) {

    'use strict';   
    let build = function(model){
        var gridViewDiv = UWA.createElement("div", {id:'accessRightsdataGridViewContainer',
            styles: {
                'width': "100%",
                'height': "calc(100% - 40px)",
                'position': "relative"
            },
            'class': "accessrights-gridView-View hideView"
        });
        let toolbar = UserGroupAccessRightsToolbarConfig.writetoolbarDefination();
        let dataGridViewContainer = WrapperDataGridView.build(model, UsersGroupAccessRightsGridViewConfig, toolbar, gridViewDiv);
        return dataGridViewContainer;
    };  
    let getGridViewToolbar = function(){
        return WrapperDataGridView.dataGridViewToolbar();   
    };
    let UGContentsDataGridView={
            build : (model) => { return build(model);}, 
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return UGContentsDataGridView;
});

define('DS/ENOUserGroupMgmt/Views/ToggleViews',
        ['DS/ENOUserGroupMgmt/Views/Grid/UsersGroupSummaryDataGridView',
        'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupMembersDataGridView',
        'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupAccessRightsDataGridView',
         'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
], function(UsersGroupSummaryDataGridView,UsersGroupMembersDataGridView,UsersGroupAccessRightsDataGridView, NLS) {
    "use strict";
    let gridViewClassName,tileViewClassName,viewIcon;
    var ToggleViews = {

            /*
             * Method to change view from Grid View to Tile View Layout and vice-versa
             */
            
            doToggleView: function(args) {
				
                switch(args.curPage){
                    case "UserGroupSummary"	:	gridViewClassName=".data-grid-container";
                                            			tileViewClassName=".tile-view-container";
                                            			viewIcon = UsersGroupSummaryDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                            			break;
					case "MembersTab" 			:   gridViewClassName=".Members-gridView-View";
                                           				tileViewClassName=".Members-tileView-View";
                                           				viewIcon = UsersGroupMembersDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                           				break;
					case "Access Rights" 		:  	gridViewClassName=".accessrights-gridView-View";
														tileViewClassName=".accessrights-tileView-View";
														viewIcon = UsersGroupAccessRightsDataGridView.getGridViewToolbar().getNodeModelByID("view");
														break;                      
    
                    default            :     Console.log(NLS.ConfigTabError);
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

/**
 * 
 */
/**
 * view for usergroup access rights page
 */
define('DS/ENOUserGroupMgmt/Views/UserGroupAccessRightsView',
       [   	
    	   	'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupAccessRightsDataGridView',
            'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENOUserGroupMgmt/Views/Tile/UsersGroupAccessRightsDataTileView',
            'DS/ENOUserGroupMgmt/Model/UserGroupAccessRightsModel',
            'DS/ENOUserGroupMgmt/Utilities/PlaceHolder',
            'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
           	'DS/ENOUserGroupMgmt/Actions/UserGroupAccessRightsActions',
           	'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
            ], function(
                    UsersGroupAccessRightsDataGridView,
                    WrapperDataGridView,
                   	UsersGroupAccessRightsDataTileView,
                    UserGroupAccessRightsModel,
                    PlaceHolder,
                    UGServicesController,
                    UserGroupAccessRightsActions,
                    NLS
            ) {
    'use strict';
    let _usergroupInfo;
    let build = function(userGroupInfo){
    	_usergroupInfo = userGroupInfo;
        if(!showView()){//member view has never been rendered
        	let containerDiv = UWA.createElement('div', {id: 'userGroupAccessRightsContainer','class':'usergroup-accessrights-container'}); 
        	containerDiv.inject(document.querySelector('.usergroup-facets-container'));
             UGServicesController.fetchUserGroupAccessRights(_usergroupInfo.model.pid).then(function(response) {
                 UserGroupAccessRightsModel.destroy();
                 UserGroupAccessRightsViewModel(response, userGroupInfo);
                 drawUserGroupAccessRightsView(containerDiv); 
                
            }); 
       }

    };

    let drawUserGroupAccessRightsView = function(containerDiv){
        //To add the dataGrid view list
        let datagridDiv = UsersGroupAccessRightsDataGridView.build(UserGroupAccessRightsModel.getModel());
        //To add the Tile view summary list
        let tileViewDiv= UsersGroupAccessRightsDataTileView.build(UserGroupAccessRightsModel.getModel());
        UsersGroupAccessRightsDataTileView.contexualMenuCallback();
        registerListners();
        //get the toolbar:no toolbar for now
        let accessrightsTabToolbar=UsersGroupAccessRightsDataGridView.getGridViewToolbar();
        
        let toolBarContainer = UWA.createElement('div', {id:'dataGridAccessRightsDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
        accessrightsTabToolbar.inject(toolBarContainer);
	  	var addMemberDiv = UWA.createElement("div", {
			  styles: {
				'width': "100%",
				'position': "relative"
			  },
			  'class': "add-member-team-div addmemberView hideView"
			});
			containerDiv.addContent(addMemberDiv);
			datagridDiv.inject(containerDiv);
	        tileViewDiv.inject(containerDiv);
        if (UserGroupAccessRightsModel.getModel().getChildren().length ==0 ) {
        	PlaceHolder.showEmptyAccessRightsPlaceholder(containerDiv);
        }
        PlaceHolder.registerListeners();
        registerEventListeners();
        return containerDiv;
    };
    
    let registerEventListeners = function(){
    	ugSyncEvts.ugMgmtMediator.subscribe('usergroup-accessrights-switchaccess-rows', function (data) {
    		UserGroupAccessRightsModel.updateRow(data.info,data.grid);    		
		});
    };
    
    let UserGroupAccessRightsViewModel = function(serverResponse, userGroupInfo){      
        UserGroupAccessRightsModel.createModel(serverResponse,userGroupInfo);
        UserGroupAccessRightsModel.getModel().UserGroupId = userGroupInfo.model.uri;
        UserGroupAccessRightsModel.getModel().UserGroupState=userGroupInfo.model.state;
        UserGroupAccessRightsModel.getModel().UserGroupPID=userGroupInfo.model.id;
        UserGroupAccessRightsModel.setContextUGInfo(userGroupInfo);
    };
    
    let registerListners = function(){
        
    };
    let hideView= function(){
        if(document.getElementById('userGroupAccessRightsContainer') != null){
            document.getElementById('userGroupAccessRightsContainer').style.display = 'none';
        }
    };
    
    let showView= function(){
        if(document.querySelector('#userGroupAccessRightsContainer') != null){
            document.getElementById('userGroupAccessRightsContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	_usergroupInfo = {};
    	UserGroupAccessRightsModel.destroy();
    };
    let UserGroupAccessRightsView = {
            init : (userGroupInfo) => { return build(userGroupInfo);},        
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };

    return UserGroupAccessRightsView;
});

define('DS/ENOUserGroupMgmt/Views/RightPanelInfoView', [
	'DS/ENOUserGroupMgmt/Views/UserGroupInfoPropWidget'
				], function(UserGroupInfoPropWidget) {
	'use strict';
	let displayContainer;
	const destroyViews = function() {
		 displayContainer.destroy();

	};
	var RightPanelInfoView = function(container) {
		this.container = container;
		displayContainer = new UWA.Element('div',{	
													"id":"usergroupInfoDisplayContainer",
													styles:{"height":"100%"}
												});
	};
	RightPanelInfoView.prototype.init = function(data,loadFor) {
		destroyViews(); // to destroy any pre-existing views
		if(loadFor == "userGroupInfo"){
			//Property Widget Edit //
		//	UserGroupInfoPropWidget.render(displayContainer,data);
		}
		this.container.appendChild(displayContainer);
	};
	RightPanelInfoView.prototype.destroy = function() {
		// destroy
		this.container.destroy();
	};

	return RightPanelInfoView;

});


/* global define, widget */
/**
 * @overview User Group Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Views/Dialogs/RemoveUsersGroup', [
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
		'DS/ENOUserGroupMgmt/Actions/UsersGroupActions',
		'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
		'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css' ], 
	function(   WUXDialog, WUXImmersiveFrame, WUXButton,  UserGroupModel, UserGroupActions,	NLS) {
	'use strict';
	let RemoveUserGroup,dialog;
	let removeConfirmation = function(removeDetails,actionFromIdCard){
		
         
		if(removeDetails.data === undefined){
			// User group summary Toolbar Menu Delete Argument ids are not passed //
			removeDetails = UserGroupModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			
			ugSyncEvts.ugNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorUserGroupRemoveSelection,
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
							"html": "&nbsp;" + removeDetails.data[i].options.grid.Name
						})
						
					]
				}));
			}else{ 
				idsToDelete.push(removeDetails.data[i].options.grid.uri);
				ulCanDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"html": "&nbsp;" + removeDetails.data[i].options.grid.title
						})
						
					]
				}));
			}
		}
 
		var immersiveContainer = new UWA.Element('div', {
                        'class' : 'dialog-immersiveframe',

                    }).inject(document.body);

		let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(immersiveContainer);  
		
		
    	let dialogueContent = new UWA.Element('div',{
    			"id":"removeUserGroupWarning",
    			"class":""
    			});
    	var header = "";
    	if(idsToDelete.length > 0){
    		 if(idsToDelete.length == 1){
    			header = NLS.DeleteGroupHeader;
    		}else{
    			header = NLS.DeleteGroupHeader+"s";
    		}
        	if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
					"html": NLS.DeleteGroupContent
				  }));
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeUserGroupWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
					"html": NLS.DeleteGroupContents
				  }));
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeUserGroupWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanDelete));
    	}
    	if(idsCannotDelete.length > 0){
    		/* if(header == ""){
    			header = NLS.removeUserGroupHeader2;
    		} */
    		if(idsCannotDelete.length == 1){
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeUserGroupWarningDetail2Single
    			}));
    		}else{
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeUserGroupWarningDetail2
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
			 
			  dialog.addEventListener('close' , function(e){
				 this.destroy();
				 var renderDiv = document.getElementsByClassName('dialog-immersiveframe');
				 if(renderDiv.length>0){
					renderDiv[0].destroy();
				 }
						
			}) ;
    };
    
    let removeConfirmed = function(ids,actionFromIdCard){
    	UserGroupActions.DeleteUserGroup(ids,actionFromIdCard);
		dialog.close();
	}
    
    RemoveUserGroup={
    		removeConfirmation: (removeDetails,actionFromIdCard) => {return removeConfirmation(removeDetails,actionFromIdCard);}
    };
    
    return RemoveUserGroup;
});

/* global define, widget */
/**
 * @overview User Group Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Views/Menu/UsersGroupContextualMenu', [
		'DS/Menu/Menu',
		'DS/ENOUserGroupMgmt/Actions/UsersGroupActions',
		'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
		'DS/ENOUserGroupMgmt/Views/Dialogs/RemoveUsersGroup',
		'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
		'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
		'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css' ], 
	function(WUXMenu,  UserGroupActions, UserGroupModel,RemoveUsersGroup,RequestUtils, NLS){
		'use strict';
		let Menu;
        
		let userGroupGridRightClick = function(event,data){
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
            var selectedDetails = UserGroupModel.getSelectedRowsModel();
            var menu = [];
            
            if(selectedDetails.data.length === 1){
            	// Single Selection //
                menu = menu.concat(openMenu(data));
            }
        	menu = menu.concat(deleteMenu(selectedDetails,false));
        	WUXMenu.show(menu, config);
		};
		
		
		
		
		let userGroupTileCheveron = function(actions,id){

		    var selectedDetails = UserGroupModel.getSelectedRowsModel();
		    var menu = [];
		   
		    if(selectedDetails.data.length === 1){
		        // Single Selection //
		        menu = menu.concat(openMenu(selectedDetails.data[0].options.grid));
		       // menu = menu.concat(usergroupMaturityStateMenus(actions,id));
		    }
		    menu = menu.concat(deleteMenu(selectedDetails,false));

		    return menu;     
		};
		
		let deleteMenu = function(removeDetails,actionFromIdCard){
			// Display menu
			let showDeleteCmd =true;
		/* 	if(removeDetails.data.length === 1 && removeDetails.data[0].options.grid.DeleteAccess != "TRUE"){
				showDeleteCmd = false;
			} */			
			var menu = [];
			if(RequestUtils.isAdmin  || (removeDetails.data[0].options.grid.owner== RequestUtils.contextUser  && (RequestUtils.isLeader || RequestUtils.isAuthor))){
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
		                    	RemoveUsersGroup.removeConfirmation(removeDetails,actionFromIdCard);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
		
		let openMenu = function(Details){
            // Display menu
            var menu = [];
            menu.push({
                name: NLS.Open,
                title:NLS.Open,
                type: 'PushItem',
                fonticon: {
                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-open'
                },
                data: null,
                action: {
                    callback: function () {
                        ugSyncEvts.ugMgmtMediator.publish('usergroup-DataGrid-on-dblclick', {model:Details});
                        require(['DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView'], function (UserGroupSummaryView) {
                            UserGroupSummaryView.showHomeButton(true);
                        });
                    }
                }
            });
            return menu;
        };
		
	
		Menu={
				userGroupTileCheveron: (actions,id) => {return userGroupTileCheveron(actions,id);},
				userGroupGridRightClick: (event,data) => {return userGroupGridRightClick(event,data);}
	    };
		
		return Menu;
	});


/* global define, widget */
/**
 * @overview User Group Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENOUserGroupMgmt/Views/RightPanelSplitView',
['DS/ENOUserGroupMgmt/Components/Wrappers/SplitViewWrapper',
'DS/ENOUserGroupMgmt/Views/RightPanelInfoView',
'DS/ENOUserGroupMgmt/Utilities/IdCardUtil'
	],
function(SplitViewWrapper,RightPanelInfoView,IdCardUtil) {

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
          var selectedId = "";
          let rightContainer = me.getRightViewWrapper();
          let rightPanelInfoView = new RightPanelInfoView(rightContainer);
          // To handle ID card user group Info click open and close in edit prop widget //
          ugSyncEvts.ugMgmtMediator.subscribe('usergroup-header-info-click', function (data) {
        	  // Publish the event to make sure if the task panel is open we clear the task panel open flag //
        	  // This will avoid the scenario where we open the task panel first, then usergroup prop widget, close prop widget and open the task panel again//
        	  ugSyncEvts.ugMgmtMediator.publish("usergroup-task-close-click-view-mode");
        	  ugSyncEvts.ugMgmtMediator.publish("usergroup-task-close-click-edit-mode");
        	  
        	  IdCardUtil.infoIconActive();
        	  rightPanelInfoView.init(data,"userGroupInfo");
        	  me._showSide("right");
        	  ugSyncEvts.propWidgetOpen = true;
          });
          
           ugSyncEvts.ugMgmtMediator.subscribe('usergroup-info-close-click', function (data) {
              if (me._rightVisible) {
            	  IdCardUtil.infoIconInActive();
                  me._hideSide("right");
                  ugSyncEvts.propWidgetOpen = false;
                }
          });
          

          ugSyncEvts.ugMgmtMediator.subscribe('usergroup-content-preview-delete', function (data) {
        	  if (me._rightVisible) {
        		  if(data.model.ids.includes(ugSyncEvts.contentPreviewId)){
        			  me._hideSide("right");
        		  }
        	  }
          });
          ugSyncEvts.ugMgmtMediator.subscribe('usergroup-content-preview-close', function (data) {
        	  if (me._rightVisible) {
        		me._hideSide("right");
        	  }
          }); 
      };
      
      return RightPanelSplitView;

});

define('DS/ENOUserGroupMgmt/Views/UsersGroupHeaderView', [
	'DS/ENOUserGroupMgmt/Views/Menu/UsersGroupContextualMenu',
	'DS/WebappsUtils/WebappsUtils',
	'DS/ENOUserGroupMgmt/Utilities/IdCardUtil',
	'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
	'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css',
],
  function (UserGroupContextualMenu, WebappsUtils,  IdCardUtil, NLS) {
	'use strict';
	let userGroupIdCard;
	var UserGroupHeaderView = function(container){
	  this.container = container;
	};
	
	UserGroupHeaderView.prototype.resizeSensor = function(){
		/* new ResizeSensor(userGroupIdCard, function () {
			IdCardUtil.resizeIDCard(userGroupIdCard.offsetWidth);
		}); */
	};
	
	UserGroupHeaderView.prototype.init = function(data,infoIconActive){
		//add all the required information in ugHeader like usergroup name 
		//Expander to expand the right panel
		userGroupIdCard = new UWA.Element('div',{"id":"userGroupIdCard","class":""});
		this.container.appendChild(userGroupIdCard);
					
		var infoAndThumbnailSec = new UWA.Element('div',{"id":"infoAndThumbnailSec","class":"id-card-info-and-thumbnail-section"});
		userGroupIdCard.appendChild(infoAndThumbnailSec);
		
		// Add thumbnail //
		var thumbnailSec = new UWA.Element('div',{
			"id":"thumbnailSection",
			"class":"id-card-thumbnail-section",
			"html":[
				  UWA.createElement('div',{
					  "class":"id-card-thumbnail",
					  styles:{
						  "background-image": "url("+WebappsUtils.getWebappsAssetUrl('ENOUserGroupMgmt','icons/144/iconLargerUserGroup.png')+")"
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
		/*var displayName = data.model.Name;
		  if(data.model.Name.length > 30){
			  displayName = data.model.Name.substring(0,27) + "...";
		  }*/
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
		var usergroupDetails = {};
		var userGroupDetailsData = [];
		// Delete function accept the data in format of data grid model //
		// So converting the data here to grid format to reuse the functionality //
		var gridFormat = {};
		gridFormat.options = {};
		gridFormat.options.grid = data.model;
		userGroupDetailsData.push(gridFormat);
		usergroupDetails.data = userGroupDetailsData;
		/*if(userGroupDetailsData[0].options.grid.state != "Complete" && data.model.Actions.indexOf("delete") > -1){
			UserGroupContextualMenu.usergroupIdCardCheveron(usergroupDetails).inject(infoHeaderSecAction);
		}*/
		// header action - info
		var infoDisplayClass = "fonticon-color-display";
		if(infoIconActive){
			infoDisplayClass = "fonticon-color-active"; 
		}

		// Info Detail Section //
		var infoDetailedSec = new UWA.Element('div',{"id":"infoDetailedSec","class":"id-card-detailed-info-section"});
		infoSec.appendChild(infoDetailedSec);
		

		
		// channel 1 //
		var infoChannel1 = new UWA.Element('div',{
													"id":"channel1",
													"class":"properties-channel"
												});
		infoDetailedSec.appendChild(infoChannel1);

		  // owner
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('span',{
					  "html": data.model.ownerFullName,
					  "class":""
				  	})
				  ]}).inject(infoChannel1);
		 
		  // members
		  var members = data.model.members;
		  var memStr = members+" "+NLS.members
		  if(members === 0 || members === 1){
			  memStr = members+" "+NLS.member
		  }
		  
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": memStr,
					  "class":""
				  	})
				  ]}).inject(infoChannel1);
		  

		  

		  
		  var infoChannel2 = new UWA.Element('div',{
				"id":"channel2",
				"class":"properties-channel"
		  });
		  infoDetailedSec.appendChild(infoChannel2);
		  

		  
		  var infoChannel3 = new UWA.Element('div',{
				"id":"channel3",
				"class":"properties-channel"
		  });
		  infoDetailedSec.appendChild(infoChannel3);
		  // Description
		  /*var displayDesc = data.model.Description;
		  if(data.model.Description.length > 150){
			  displayDesc = data.model.Description.substring(0,147) + "...";
		  }*/
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
    UserGroupHeaderView.prototype.destroyContainer = function(){
    	//destroy container
    	this.container.destroy();
    };
    UserGroupHeaderView.prototype.destroyContent = function(){
    	//destroy content
    	userGroupIdCard.destroy();
    };
    
    let collapseExpand = function(){
    	var expandCollapse = document.querySelector('#expandCollapse');
		  var userGroupHeaderContainer = document.querySelector('#userGroupHeaderContainer');
		 // var graphCanvas = document.querySelector('#graph_canvas_view');
		 // let graphContainer = document.querySelector('.usergroup-graph-task-container');
		 let memberGridView = document.querySelector('.Members-gridView-View');		
		 let accessrightsGridView = document.querySelector('.accessrights-gridView-View');		
		 
		  if(expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1){
			  // collapse
			  expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
			  userGroupHeaderContainer.classList.add('minimized');
			  expandCollapse.title = NLS.idCardHeaderActionExpand;
			  // handle the hide thumbnail case //
			  var thumbnailSection = document.querySelector('#thumbnailSection');
			  if(thumbnailSection && thumbnailSection.className.indexOf("id-card-thumbnail-remove") > -1){
				  var infoSec = document.querySelector('#infoSec');
				  infoSec.classList.remove("id-info-section-align");
				  infoSec.classList.add("id-info-section-align-minimized");
			  }
			  /*if(graphCanvas){
				  graphCanvas.style.top = "136px";
			  }*/
			  if(memberGridView)
				memberGridView.setStyle("height","calc(100% - 0px)");
			if(accessrightsGridView)
				accessrightsGridView.setStyle("height","calc(100% - 0px)");
			
			  //graphContainer.setStyle("height","calc(100% - 96px)");
		  }else{
			  // expand
			  expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-down", "wux-ui-3ds-expand-up");
			  userGroupHeaderContainer.classList.remove('minimized');
			  expandCollapse.title = NLS.idCardHeaderActionCollapse;
			// handle the hide thumbnail case //
			  var thumbnailSection = document.querySelector('#thumbnailSection');
			  if(thumbnailSection && thumbnailSection.className.indexOf("id-card-thumbnail-remove") > -1){
				  var infoSec = document.querySelector('#infoSec');
				  infoSec.classList.remove("id-info-section-align-minimized");
				  infoSec.classList.add("id-info-section-align");
			  }
			  if(memberGridView)
				memberGridView.setStyle("height","calc(100% - 60px)");
			  if(accessrightsGridView)
				accessrightsGridView.setStyle("height","calc(100% - 60px)");
			
			  //graphContainer.removeAttribute('style');
			  //graphContainer.style.removeProperty("height");
		  }
    };
    
    
    return UserGroupHeaderView;
});


define('DS/ENOUserGroupMgmt/Views/Tile/UsersGroupSummaryTileView',
        [
         "UWA/Core",
         'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
         'DS/ENOUserGroupMgmt/Views/Menu/UsersGroupContextualMenu',
         'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
         ],
         function (
                 UWA,
                 WrapperTileView,
                 UGContextualMenu,
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
        }else{ //create an empty model otherwise TODO see if it's required
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        _container = UWA.createElement('div', {id:'TileViewContainer', 'class':'tile-view-container hideView'});
        let tileViewContainer = WrapperTileView.build(_model, _container, false); //true passed to enable drag and drop
      //  registerDragAndDrop();
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
                    // var details = [];//TO Remove :details was added to pass as an argument to removeusergroup method.
                    if (params && params.cellInfos) {
                        if (params.cellInfos.cellModel) {

                            var selectedNode = _model.getSelectedNodes();
                            var actions= selectedNode[0].options.grid.Actions;
                            var id=selectedNode[0]._options.grid.id;
                            menu=UGContextualMenu.userGroupTileCheveron(actions,id);
                        }
                    }
                    return menu; 
                }

        }
    };
    
   
    
    /*
     * Exposes the below public APIs to be used
     */
    let CustomUGSummaryTileView={
            build : (model) => { return build(model);},
            contexualMenuCallback : () =>{return contexualMenuCallback();}, 
            destroy: () => {_myResponsiveTilesView.destroy();}

    };
    return CustomUGSummaryTileView;
});


/**
 * datagrid view for user group summary page
 */
define('DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView',
		[   
		'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupSummaryDataGridView',
	 'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperDataGridView',
	 'DS/ENOUserGroupMgmt/Components/Wrappers/WrapperTileView',
		 'DS/DataGridView/DataGridView',
		 'DS/ENOUserGroupMgmt/Model/UsersGroupModel',
		 'DS/ENOUserGroupMgmt/Views/Tile/UsersGroupSummaryTileView',
		 'DS/ENOUserGroupMgmt/Controller/UserGroupServicesController',
		 'DS/Utilities/Array',
		 'DS/Core/PointerEvents',
		 'DS/ENOUserGroupMgmt/Utilities/PlaceHolder',
		 'DS/ENOUserGroupMgmt/Utilities/UserGroupSpinner',
		 'DS/CollectionView/CollectionViewStatusBar',
		 'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt'
            ], function(
		UsersGroupSummaryDataGridView,
		WrapperDataGridView,WrapperTileView,
		DataGridView,UsersGroupModel,UsersGroupSummaryTileView,UserGroupServicesController,ArrayUtils,PointerEvents,PlaceHolder,UserGroupSpinner,CollectionViewStatusBar,NLS
			) {

	'use strict';	
	

	
	let build = function(){		
		
		
		return new Promise(function(resolve, reject) {
			UserGroupSpinner.doWait(document.body);
			let containerDiv  = UWA.createElement('div', {
				'id': 'dataGridViewContainer',styles:{
				'width': "100%",
				'color' : "red",
				'height': "calc(100% - 40px)",
				'position': "relative"
				}
			}); 
				  UserGroupServicesController.fetchAllUserGroups().then(				
					success => {
						let containerDiv = _fetchUserGroupSuccess(success);
						UserGroupSpinner.endWait(document.body);
						resolve(containerDiv);  
					},
					failure =>{
						UserGroupSpinner.endWait(document.body);
						 // _fetchuserGroupFailure(failure);
					});  
					
				
			});
		
	};
	
	let _fetchUserGroupSuccess = function(success){
		UsersGroupModel.createModel(success);
		filterUGSummaryView("owned");
		let containerDiv = drawUsersGroupSummaryView();
		var viewIcon = UsersGroupSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");
		if(viewIcon.options.grid.data.menu[0].state=="selected"){
    		viewIcon.options.grid.data.menu[1].state="unselected";
    	} else {
    		viewIcon.options.grid.data.menu[0].state="selected";
			viewIcon.options.grid.data.menu[1].state="unselected";
    	}
		
		return containerDiv;
	};

	let filterUGSummaryView = function(args){    	
    	
		var filterOptions = getFilterPreferences();		
		var UserGroupModel = UsersGroupModel.getModel();
		let selectedNode= UserGroupModel.getSelectedNodes();
		UserGroupModel.prepareUpdate();  
		ArrayUtils.optimizedForEach(UserGroupModel.getChildren(), function(node) {
			if( args== "owned" &&  node.getAttributeValue("myGroup")!= "Yes" ){
				    node.hide();	
				} else {
					node.show();
				}			
					
		});
		var count = 0;
		UserGroupModel.getChildren().forEach(node => {if(node._isHidden)count++;})
		UserGroupModel.pushUpdate();
		if(selectedNode && selectedNode.length==1 && selectedNode[0]._isHidden){
			backToUserGroupSummary();
		}
		let container=document.querySelector(".widget-container");
		if(container!=null){
			if(UserGroupModel.getChildren().length == count){
				PlaceHolder.showEmptyUserGroupPlaceholder(container,UserGroupModel);
			}else{
				PlaceHolder.hideEmptyUserGroupPlaceholder(container);
			}
		}
		if(WrapperDataGridView.dataGridView()) {
			WrapperDataGridView.dataGridView().buildStatusBar([{
				  type: CollectionViewStatusBar.STATUS.NB_ITEMS
			}, {
			  type: CollectionViewStatusBar.STATUS.NB_SELECTED_ROWS
			}
			]);
		}
		
	};

	let drawUsersGroupSummaryView = function(serverResponse){
		var ugModel = UsersGroupModel.getModel();
		let datagridDiv = UsersGroupSummaryDataGridView.build(ugModel);	
		let tileViewDiv = UsersGroupSummaryTileView.build(ugModel);	
		UsersGroupSummaryTileView.contexualMenuCallback();
		registerListners();
		//get the toolbar
		let homeToolbar=UsersGroupSummaryDataGridView.getGridViewToolbar();
		
		let dataContainer = UWA.createElement('div', {
				'id': 'dataGridViewContainerMain',styles:{
				'width': "100%",
				'height': "calc(100% - 10px)",
				'position': "relative",
				'top': "20px"
				}
			});
		
		let container=document.querySelector(".widget-container");
		let containerDiv;
		if(!container){
		 containerDiv = new UWA.Element('div',{"class":"widget-container"});
		}else{
			containerDiv=container;
		}

		let toolBarContainer = UWA.createElement('div', {id:'dataGridDivToolbar', 'class':'toolbar-container', styles: {'width': "100%",'height': "20px",}});
		homeToolbar.inject(toolBarContainer);
		
		datagridDiv.inject(dataContainer);
		tileViewDiv.inject(dataContainer);
	    toolBarContainer.inject(containerDiv);
	    dataContainer.inject(containerDiv);

	   if (ugModel.getChildren().length ==0) {				
		    PlaceHolder.showEmptyUserGroupPlaceholder(containerDiv,ugModel);
       }else {
    	   ugModel.prepareUpdate();
    	   var count = 0;
    	   ugModel.getChildren().forEach(node => {if(node._isHidden)count++;})
    	   ugModel.pushUpdate();
    	   if(count == ugModel.getChildren().length){
				 PlaceHolder.showEmptyUserGroupPlaceholder(containerDiv,ugModel);
			}
       }
	   PlaceHolder.registerListeners();
		showHomeButton(false);
		return containerDiv;
		
		
	};
	let getFilterPreferences = function(){

    		return ['owned','all'];
    	
    };
	let backToUserGroupSummary = function () {
    	showHomeButton(false);
    	//TODO code to change tile view to grid view
    	ugSyncEvts.ugMgmtMediator.publish('usergroup-back-to-summary');
    	//ugSyncEvts.ugMgmtMediator.publish('usergroup-widgetTitle-count-update',{model:UserGroupModel.getModel()});
    };
	let showHomeButton = function(flag){
		let userGroupSummaryToolbar = UsersGroupSummaryDataGridView.getGridViewToolbar();
		let backIcon = userGroupSummaryToolbar.getNodeModelByID("back");
        if (backIcon) {
          backIcon.updateOptions({
            visibleFlag: flag
          });
        }
	};
 
    let onDoubleClick = function (e, cellInfos) {
		
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.multipleHitCount == 2) {
	    			cellInfos.nodeModel.select(true);
	    			ugSyncEvts.ugMgmtMediator.publish('usergroup-DataGrid-on-dblclick', {model:cellInfos.nodeModel.options.grid});
	    			showHomeButton(true);               
		     }
		}
	};
	let openContextualMenu = function (e, cellInfos) {
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		       if (e.button == 2) {
		    	  require(['DS/ENOUserGroupMgmt/Views/Menu/UsersGroupContextualMenu'], function (UsersGroupContextualMenu) {
					UsersGroupContextualMenu.userGroupGridRightClick(e,cellInfos.nodeModel.options.grid);
				});           
		     } 
		}
	};
	/*
	 * Registers events on both datagrid and tile view to:
	 * 1. Open contextual menu on right click in any row
	 * 2. Open the right panel showing ID card and  tabs
	 * 
	 * */
	let registerListners = function(){
    	 let dataGridView = WrapperDataGridView.dataGridView();
    	//Dispatch events on dataGrid
    	dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
    	dataGridView.addEventListener('contextmenu', openContextualMenu);
    	let tileView = WrapperTileView.tileView();
    	//Dispatch events on tile view
    	tileView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);  	
    	 addorRemoveUserGroupEventListeners(); 
    	
	};
	
	let addorRemoveUserGroupEventListeners = function(){
		
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-summary-append-rows', function (data) {
			UserGroupServicesController.fetchUserGroupById(null,data.uri).then(function(resp) {
				let updatedUG = JSON.parse(resp);
				updatedUG = updatedUG.groups[0];
				data.owner = updatedUG.owner;
				data.pid = updatedUG.pid;
				data.myGroup = updatedUG.myGroup;
				data.ownerFullName = updatedUG.ownerFullName;
				data.name = updatedUG.name;
				data.id = updatedUG.id;
				let node = UsersGroupModel.appendRows(data);			
				UsersGroupSummaryDataGridView.getDataGridInstance().ensureNodeModelVisible(node, true);
				node.select();
			});
			
			//showHomeButton(true);
			//node.select();
		}); 
		
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-summary-delete-row-by-ids', function (data) {
			if(data.model.length > 0){				
				UsersGroupModel.deleteRowModelByIds(data.model);					
			}
		});
		
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-data-updated', function (data) {
			UsersGroupModel.updateRow(data);
			var args = "all";
			var viewIcon = UsersGroupSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");
			if(viewIcon.options.grid.data.menu[0].state=="selected"){
				args=viewIcon.options.grid.data.menu[0].id;
	    	} else {
	    		args=viewIcon.options.grid.data.menu[1].id
	    	}
			filterUGSummaryView(args);
		});
		
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-owner-changed', function (data) {
			UsersGroupModel.deleteRowModelByIds([data.pid]);		
			filterUGSummaryView();
		});
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-summary-Membersappend-rows', function (data) {
			UsersGroupModel.updateMemberCount(data);
		});
		
		/*  */
		
		/* ugSyncEvts.ugMgmtMediator.subscribe('usergroup-summary-show-message', function (message) {
			widget.notify.handler().addNotif(message.message);			
		}); 
		
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-summary-delete-rows', function (index) {
			UserGroupModel.deleteRowModelByIndex(index);				
		});
		
		ugSyncEvts.ugMgmtMediator.subscribe('usergroup-summary-delete-selected-rows', function () {
			UserGroupModel.deleteRowModelSelected();			
		}); */
		/* ugSyncEvts.ugMgmtMediator.subscribe('usergroup-data-updated', function (data) {
			UserGroupModel.updateRow(data);		
			filterUGSummaryView();
		}); */
	};
	let openSelectedUserGroup = function(){
		let uID = null; 
		if(uID){
			clearuserIdInfo();
			let userModel = UsersGroupModel.getRowModelById(uID)
			userModel.select(true);
			ugSyncEvts.ugMgmtMediator.publish('usergroup-DataGrid-on-dblclick', {model:userModel.options.grid});
			showHomeButton(true); 
		}

		
	};
	let clearuserIdInfo = function(){
	};
	
	let UserGroupSummaryView = {
		 
		
		build : () => { return build();},
		backToUserGroupSummary: () => {return backToUserGroupSummary();},
		destroyAndRedrawwithFilters : (args) => {filterUGSummaryView(args);},
		destroy : () => {destroy();},
		showHomeButton: (flag) => {return showHomeButton(flag);},
		openSelected: () => {return openSelectedUserGroup();}

				
	};

	return UserGroupSummaryView;
});

/**
 * This file is a wrapper file to create toolbars in the app. Currently not being used
 */

define('DS/ENOUserGroupMgmt/Actions/Toolbar/UsersGroupSummaryToolbarActions',
		[	'DS/ENOUserGroupMgmt/Views/Grid/UsersGroupSummaryDataGridView',
			'DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView'
			], function(UGSummaryDataGridView, UGSummaryView) {
	
	'use strict';
	
	var service = Object.create(null);
    service.currentView = "Grid";
    service.previousView = "Grid";
    
    
    var applyfilterView = function(view,option){

    	var viewIcon = UGSummaryDataGridView.getGridViewToolbar().getNodeModelByID("filter");

        if(view.type == "owner"){  
        	if(view.filter == "owned"){
	        	if(viewIcon.options.grid.data.menu[0].state=="selected"){
	        		viewIcon.options.grid.data.menu[1].state="unselected";
	        	} else {
	        		viewIcon.options.grid.data.menu[0].state="selected";
					viewIcon.options.grid.data.menu[1].state="unselected";
	        	}
        	} else if(view.filter == "all"){        	
            	if(viewIcon.options.grid.data.menu[1].state=="selected"){
            		viewIcon.options.grid.data.menu[0].state="unselected";
            	} else {
            		viewIcon.options.grid.data.menu[1].state="selected";
					viewIcon.options.grid.data.menu[0].state="unselected";
            	}
        	}
         
        	UGSummaryView.destroyAndRedrawwithFilters(view.filter);
           
        }
      };
    

    
	var changeOwnerFilter =  function (d) {
		applyfilterView(d);
		UGSummaryDataGridView.setFilterPreferences(d.filter);
    };

	
	var UGToolbarFilterActions = {		
			changeOwnerFilter: (d) => {return changeOwnerFilter(d);}
	};
	return UGToolbarFilterActions;
});

define('DS/ENOUserGroupMgmt/Views/UsersGroupIDCardView', [
  'DS/ENOUserGroupMgmt/Views/UsersGroupHeaderView',
  'DS/ENOUserGroupMgmt/Views/UsersGroupTabsView',
  'DS/ENOUserGroupMgmt/Utilities/IdCardUtil',
  'DS/ENOUserGroupMgmt/Utilities/DataFormatter',
  'DS/ENOUserGroupMgmt/Model/UsersGroupModel'
],
  function (UserGroupHeaderView, UserGroupTabsView, IdCardUtil, DataFormatter,UsersGroupModel) {
	'use strict';
	let headerContainer, facetsContainer, idLoaded, userGroupUataUpdatedToken, userGroupDataDeletedToken,userGroupHeaderUpdatedToken;
	const destroyViews = function(){
		new UserGroupHeaderView(headerContainer).destroyContainer();
		new UserGroupTabsView(facetsContainer).destroy();
		if(userGroupUataUpdatedToken){
    		ugSyncEvts.ugMgmtMediator.unsubscribe(userGroupUataUpdatedToken);
    	}
		if(userGroupDataDeletedToken){
    		ugSyncEvts.ugMgmtMediator.unsubscribe(userGroupDataDeletedToken);
    	}
		if(userGroupHeaderUpdatedToken){
    		ugSyncEvts.ugMgmtMediator.unsubscribe(userGroupHeaderUpdatedToken);
    	}
		
    };
	var UserGroupIDCardWrapper = function(rightPanel){
		this.rightPanel = rightPanel;
	  	headerContainer = new UWA.Element('div',{"id":"userGroupHeaderContainer","class":"usergroup-header-container"});
	  	facetsContainer = new UWA.Element('div',{"id":"usergroupFacetsContainer","class":"usergroup-facets-container",styles:{"height":"100%"}});	 	
	};
	UserGroupIDCardWrapper.prototype.init = function(data){	
		destroyViews(); //to destroy any pre-existing views
		var infoIconActive = false;
		new UserGroupHeaderView(headerContainer).init(data,infoIconActive);
		idLoaded = data.model.uri;
		new UserGroupTabsView(facetsContainer, data).init();
		
	 	this.rightPanel.getLeftViewWrapper().appendChild(headerContainer);
	 	this.rightPanel.getLeftViewWrapper().appendChild(facetsContainer);
	 	
	 	new UserGroupHeaderView(headerContainer).resizeSensor();
	 	UsersGroupModel.setUserGroupDetails(data);	 	
	 	// Events //
	 	userGroupUataUpdatedToken = ugSyncEvts.ugMgmtMediator.subscribe('usergroup-data-updated', function (data) {
	 		var dataModel = {model:DataFormatter.gridData(data)};
	 		// check if usergroup details updated are same loaded in the id card //
	 		// Case when usergroup is loaded and in usergroup summary page user does action on usergroup2 //
	 		// then do not refresh id card //
	 		if(dataModel.model.uri == idLoaded){
	 			// On usergroup properties save, refresh only header data //
	 			// Clear the existing id card header data. Do no destroy the container, only content for refresh header data//
	 			// 105941 need to check the  infoIconIsActive is false or true
	 			//var infoIconActive = IdCardUtil.infoIconIsActive();      
	 			new UserGroupHeaderView(headerContainer).destroyContent();
	 			new UserGroupHeaderView(headerContainer).init(dataModel,infoIconActive);
	 			new UserGroupHeaderView(headerContainer).resizeSensor();
	 			/*if(ugSyncEvts.propWidgetHistoryOpen){
	 				// refresh history tab only //
	 				UserGroupHistory.onRefresh();
	 			}
	 			else*/ if(ugSyncEvts.propWidgetOpen){
	        		  // To persist the edit prop widget open //
	 					if(data.requestFrom && data.requestFrom == "editPropWidget"){
	 						// do not refresh the edit prop widget // 
	 						// the request is coming from edit prop widget itself //
	 					}else{
	 						ugSyncEvts.ugMgmtMediator.publish('usergroup-header-info-click', {model: dataModel.model});
	 					}
	        	}
	 		}
	 	});
	 	
	 	userGroupHeaderUpdatedToken = ugSyncEvts.ugMgmtMediator.subscribe('usergroup-header-updated', function (data) {
	 		if(data.model.uri==idLoaded){
	 			new UserGroupHeaderView(headerContainer).destroyContent();
	 			new UserGroupHeaderView(headerContainer).init(data,infoIconActive);
	 			new UserGroupHeaderView(headerContainer).resizeSensor();
	 		}
	 	});
	 	
	 	userGroupDataDeletedToken = ugSyncEvts.ugMgmtMediator.subscribe('usergroup-data-deleted', function (data) {
	 		if(data.model.includes(idLoaded)){
	 			// close the id card only if the usergroup opened in id card is been deleted and go to usergroup home summary page //
	 			require(['DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView'], function (UsersGroupSummaryView) {
	 				UsersGroupSummaryView.backToUserGroupSummary();
	 			});
	 		}
	 	});
    };
    UserGroupIDCardWrapper.prototype.destroy = function(){
    	//destroy
    	this.rightPanel.destroy();
    };
    
    return UserGroupIDCardWrapper;

  });

/**
 * 
 *
 */
define('DS/ENOUserGroupMgmt/Views/UsersGroupHomeSplitView',
['DS/ENOUserGroupMgmt/Components/Wrappers/SplitViewWrapper',
'DS/ENOUserGroupMgmt/Views/UsersGroupIDCardView',
'DS/ENOUserGroupMgmt/Views/RightPanelSplitView',
'DS/ENOUserGroupMgmt/Utilities/IdCardUtil'
	],
function(SplitViewWrapper, UserGroupIDCardWrapper, RightPanelSplitView, IdCardUtil) {

    'use strict';
    var UserGroupHomeSplitView = function () { };
    /**
     * UserGroupHomeSplitView to show the right side slidein.
     * @param  {[Mediator]} applicationChannel [required:Mediator object for communication]
     *
     */
    UserGroupHomeSplitView.prototype.getSplitView = function (appChannel) {
        var sView = new SplitViewWrapper();
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
      
      UserGroupHomeSplitView.prototype.setSplitviewEvents = function(splitView){
          var me = splitView;
          var selectedId = "";
          
          // right panel for properties and other slide in //
          let rightPanel = new RightPanelSplitView().getSplitView(ugSyncEvts.ugMgmtMediator.getEventBroker());
          new RightPanelSplitView().setSplitviewEvents(rightPanel);
          var leftContent = me.getRightViewWrapper();
          leftContent.setContent(rightPanel.getContent());
          me.addRightPanelExpander();
          
          let userGroupIDCardWrapper = new UserGroupIDCardWrapper(rightPanel);
          ugSyncEvts.ugMgmtMediator.subscribe('usergroup-DataGrid-on-dblclick', function (data) {       	  
        	  	userGroupIDCardWrapper.init(data);
        	  	me._showSide("right");
        	  	// To persist the ID card collapse //
        	  	IdCardUtil.collapseIcon();
        	  	top.updateShortcutMap("recentlyViewed",data.model.pid);
        	  if(ugSyncEvts.propWidgetOpen){
        		  // To persist the edit prop widget open //
        		  ugSyncEvts.ugMgmtMediator.publish('usergroup-header-info-click', {model: data.model});
        	  }else{
        		  // If any other right panel is opened close it //
        		  ugSyncEvts.ugMgmtMediator.publish('usergroup-task-close-click-view-mode', {model: data.model});
        		  ugSyncEvts.ugMgmtMediator.publish('usergroup-task-close-click-edit-mode', {model: data.model});
        	  }
        	  ugSyncEvts.ugMgmtMediator.publish('usergroup-widgetTitle-update-withusergroupName', {model: data.model});
          });
          
          ugSyncEvts.ugMgmtMediator.subscribe('usergroup-back-to-summary', function (data) {
        	  if (!me._leftVisible) {
        		  me._showSide("left");
        	  }
              if (me._rightVisible) {
                me._hideSide("right");
              }
            });
      };


   return UserGroupHomeSplitView;

});

define('DS/ENOUserGroupMgmt/ENOUGToolWebApp',
	[
	 	'UWA/Core',
	 	'UWA/Controls/Abstract',
	 	'Core/Core',
		'DS/ENOUserGroupMgmt/Components/Mediator',
		'DS/ENOUserGroupMgmt/Components/Notifications',
	 	'DS/WAFData/WAFData',
	 	'DS/ENOUserGroupMgmt/Utilities/RequestUtils',
		'DS/ENOUserGroupMgmt/Views/UsersGroupHomeSplitView',
		'DS/Windows/ImmersiveFrame',
		'DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView',
		'i18n!DS/ENOUserGroupMgmt/assets/nls/ENOUserGroupMgmt',
	 	'css!DS/ENOUserGroupMgmt/ENOUserGroupMgmt.css'
	],
	function(UWA, Abstract, Core,Mediator, Notifications, WAFData, RequestUtils, UsersGroupHomeSplitView, WUXImmersiveFrame,UsersGroupSummaryView,NLS){
	
        "use strict";

        var usersGroupWebApp = Abstract.extend({

        	mApplication: null,

            /**
             * Contructor
             *
             * @method      init
             * @param       {Object} options option/value pair.
             */
            init: function (iApp) {
                this._parent();
                var context = this;
				
                this.container = new UWA.Element('div', {
                    'class': 'divExportTool'
                });
			
                this.mApplication = iApp;
                RequestUtils.send3DSpaceRequest(
    	        		RequestUtils.getUserGroupServiceBaseURL() + "/application/configuration",
    	                "GET",
    	                {
    	                    "type": "json",
    	        			"headers": {"Content-type": "application/json"}
    	                },
    	                function(iResult){  
    	                	RequestUtils.set3DSpaceCSRFToken(iResult.csrf);	
                            RequestUtils.setSecurityContext(iResult.SecurityContext);
                            RequestUtils.setIsAdmin(iResult.isAdmin);
                            RequestUtils.setIsLeader(iResult.isLeader);
                            RequestUtils.setIsAuthor(iResult.isAuthor);
                            RequestUtils.setContextUser(iResult.contextUser);
                            RequestUtils.getPopulate3DSpaceURL();
    	                	context.render();
    	                }
    	        );

            },

            /**
             * Instanciates the control's components.
             *
             * @private
             * @method render
             */
            render: function () {
            	document.title =NLS.APPHeader;
                var context = this;
            	//initialize the mediators to enable interactions among components
			ugSyncEvts.ugMgmtMediator = new Mediator(); //setting channel as global for communication between components
			ugSyncEvts.ugNotify =  new Notifications();
			var containerDiv = null;

			return new Promise(
					function(resolve /*, reject*/) {

						require([ 'UWA/Core',
								'DS/ENOUserGroupMgmt/Views/UsersGroupSummaryView' ],
								function(UWAModule, UsersGroupSummaryView) {

								 	UsersGroupSummaryView.build().then(
											function(container) {
												containerDiv = container;
												resolve();
											}); 

								});

					}).then(function() {
				return new Promise(function(resolve, reject) {
					//
					containerDiv.inject(context.container);
					//
					
					// middle container
					 let middleDetailsContainer = new UsersGroupHomeSplitView().getSplitView(ugSyncEvts.ugMgmtMediator.getEventBroker());
					new UsersGroupHomeSplitView().setSplitviewEvents(middleDetailsContainer);
					middleDetailsContainer.getLeftViewWrapper().appendChild(containerDiv);
					
					var container = new WUXImmersiveFrame();
					container.setContentInBackgroundLayer(middleDetailsContainer.getContent());
					container.reactToPointerEventsFlag = false;
					container.inject(document.body); 

					 //move the data grid view down as per toolbar height
					let
					toolbarHeight = document.getElementsByClassName('toolbar-container')[0].getDimensions().height;
					UsersGroupSummaryView.openSelected();  
					
					resolve();
				});
			});

		
            }
        });

        return usersGroupWebApp;

        
	}
);

