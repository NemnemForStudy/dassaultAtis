/**
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENXESignature/Components/ENXESignMgmtNotifications',[
	'DS/Notifications/NotificationsManagerUXMessages',
	'DS/Notifications/NotificationsManagerViewOnScreen',
	],
function(NotificationsManagerUXMessages,NotificationsManagerViewOnScreen) {

    'use strict';
    let _notif_manager = null;
    let ENXESignMgmtNotifications = function () {
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
    
    ENXESignMgmtNotifications.prototype.handler = function () {
    	
    	if(document.getElementById("_codeContentouterDiv")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("_codeContentouterDiv"));
    	}else if(document.getElementById("ESignLoginDialog")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("ESignLoginDialog"));
    	}else if(document.getElementById("ESignDialogDetailsContainer")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("ESignDialogDetailsContainer"));
    	}else if(document.getElementById("ESignDetailsContainer")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("ESignDetailsContainer"));
    	}else if (document.getElementById("ESignConfigDialogContainer")) {
                NotificationsManagerViewOnScreen.inject(document.getElementById("ESignConfigDialogContainer"));
        }else{
    		if(document.getElementsByClassName('wux-notification-screen').length > 0){
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}else{
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}
    	}
    	
    	return _notif_manager;
    };
    
    ENXESignMgmtNotifications.prototype.notifview = function(){
    	return NotificationsManagerViewOnScreen;
    }; 
    
    return ENXESignMgmtNotifications;

});

/* global define, widget */
/**
 * @overview ESign - JSON Parse utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
 define('DS/ENXESignature/Utilities/ParseResponseUtil',
 [
     'UWA/Class'
     ],
     function(
             UWAClass,
     ) {
'use strict';

var ParseResponseUtil = UWAClass.extend({
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
 
parseDelegatedTestResp : function(resp){
    let isDelegated = false;
    const respKeys = Object.keys(resp)
    if (respKeys && respKeys.length == 1 && resp[respKeys[0]] && resp[respKeys[0]].usingDelegatedAuthentication) {
        isDelegated = resp[respKeys[0]].usingDelegatedAuthentication
    }

    return isDelegated;
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


return ParseResponseUtil;
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
define('DS/ENXESignature/Utilities/Utils',
  [],
  function () {
    'use strict';

    let Utils = {};
    Utils.getCookie = function (name) {
      let value = "; " + document.cookie;
      let parts = value.split("; " + name + "=");
      if (parts.length >= 2) return parts.pop().split(";").shift();
    };

    Utils.isValidDate = function (obj) {
      return UWA.is(obj, 'date') && !isNaN(obj.getTime());
    };

    Utils.formatDateTimeString = function (dateObj) {
      let dateString;
      // Display options for the date time formated string
      let intlOptions = {
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
        dateString = dateObj.toLocaleDateString(Utils.getCookie("swymlang"), intlOptions) + " " + dateObj.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      }
      return dateString;
    };

    Utils.activateInfoIcon = function(DataGridView){
      if(DataGridView.dataGridViewToolbar()){
        let infoIcon = DataGridView.dataGridViewToolbar().getNodeModelByID("information");
          if(infoIcon && infoIcon._associatedView.elements.container.querySelector('.wux-controls-button')){
            infoIcon._associatedView.elements.container.querySelector('.wux-controls-button').setStyle("color","rgb(54, 142, 196)");
          }
      }
    };
    
    Utils.inActivateInfoIcon = function(DataGridView){
      if(DataGridView.dataGridViewToolbar()){
        let infoIcon = DataGridView.dataGridViewToolbar().getNodeModelByID("information");
          if(infoIcon && infoIcon._associatedView.elements.container.querySelector('.wux-controls-button')){
            infoIcon._associatedView.elements.container.querySelector('.wux-controls-button').setStyle("color",'rgb(61, 61, 61)');
          }
      }
    };

    Utils.refreshRightPanel = function(info, Model, grid){
		//nsm4
      if(widget.getValue("propWidgetOpen")){ 
        if(grid){  //This code will be executed if it's single click
           let data = {};
             data.model = grid;
             widget.eSignDetailsEvent.publish('esign-header-info-click', {model: data.model, info: info});
        }
        else if(Model && Model.getSelectedRowsModel().data.length == 1){ //if any row is selected, then show the selected row's data
          let data = {};
            data.model = Model.getSelectedRowsModel()["data"][0].options.grid;
          widget.eSignDetailsEvent.publish('esign-header-info-click', {model: data.model, info: info});
        }
        else{ ////if multiple row/No row is selected, then show the empty view
           if(Model && Model.getSelectedRowsModel().data.length > 1){
            widget.eSignDetailsEvent.publish('esign-header-info-click', {info:info, multiRowSelect:true});
          }else{
            widget.eSignDetailsEvent.publish('esign-header-info-click', {info: info,noRowSelect:true});
          }
        }
      }
    }

    return Utils;
  });


/**
 * ESignAuthenticationMediator Component - handling interaction between components for smooth async events
 *
 */
define('DS/ENXESignature/Components/ESignAuthenticationMediator',
['DS/Core/ModelEvents'],
function(ModelEvents) {

    'use strict';
    var _eventBroker = null;
    var ESignAuthenticationMediator = function () {
        // Private variables
        _eventBroker= new ModelEvents();
    };

    /**
     * publish a topic on given channels in param, additional data may go along with the topic published
     * @param  {[type]} eventTopic [description]
     * @param  {[type]} data       [description]
     *
     */
    ESignAuthenticationMediator.prototype.publish = function (eventTopic, data) {
          _eventBroker.publish({ event: eventTopic, data: data }); // publish from ModelEvent
    };

    /**
    *
    * Subscribe to a topic
    * @param {string} eventTopic the topic to subcribe to
    * @param {function} listener the function to be called when the event fires
    * @return {ModelEventsToken}             a token to use when you want to unsubscribe
    */
    ESignAuthenticationMediator.prototype.subscribe = function (eventTopic, listener) {
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
    ESignAuthenticationMediator.prototype.subscribeOnce = function(eventTopic, listener) {
    	return _eventBroker.subscribeOnce({ event: eventTopic }, listener);
    };

    /**
     * Unsubscribe to a topic
     * @param  {[type]} token [description]
     *
     */
    ESignAuthenticationMediator.prototype.unsubscribe = function (token) {
        _eventBroker.unsubscribe(token);
    };

    ESignAuthenticationMediator.prototype.getEventBroker = function(){
      return _eventBroker;
    };

    ESignAuthenticationMediator.prototype.destroy = function(){
      _eventBroker.destroy();
    };



   return ESignAuthenticationMediator;

});

define('DS/ENXESignature/Utilities/PlaceHolder',
    [
        'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
    ],
    function (
        NLS
    ) {
        'use strict';

        let showEmptyESignPlaceholder = function (container, model) {

            let existingPlaceholder = container.getElement('.no-esigns-to-show-container');

            container.querySelector(".esigndetails-tile-view-container").setStyle('display', 'none');
            container.querySelector(".esigndetails-data-grid-container").setStyle('display', 'none');
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                // widget.eSignDetailsEvent.publish('esign-back-to-summary');
                // widget.eSignDetailsEvent.publish('esign-widgetTitle-count-update', { model: model });
                return existingPlaceholder;
            }

            // let filterButton = UWA.createElement('span', {
            //     'class': 'no-esigns-to-show-filter-shortcut fonticon fonticon-list-filter', 'title': NLS.filter
            // }) 
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
                    })]
                })]
            });

            container.appendChild(placeholder);
            
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


        let registerListeners = function () {
            widget.eSignDetailsEvent.subscribe('show-no-esign-placeholder', function (data) {
                showEmptyESignPlaceholder(document.querySelector(".widget-container"));
            });

            widget.eSignDetailsEvent.subscribe('hide-no-esign-placeholder', function (data) {
                hideEmptyESignPlaceholder(document.querySelector(".widget-container"));
            });


        };

        return {
            hideEmptyESignPlaceholder,
            showEmptyESignPlaceholder,
            registerListeners
        }
    });


/*
 * @module 'DS/ENORouteMgmt/Config/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route summary datagrid view
 */

define('DS/ENXESignature/Config/ESignDetailsToolbarConfig',
  [
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt',
  ],
  function (NLS) {
    let viewData = {
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
            module: 'DS/ENXESignature/Config/ESignDetailsToggleViews',
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
            module: 'DS/ENXESignature/Config/ESignDetailsToggleViews',
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

    let writetoolbarDefinition = () => {
      //todo nsm4
      let definition = {
        "entries": [
          {
            "id": "toggleView",
            "className": "esignDetailViews",
            "dataElements": {
              "typeRepresentation": "viewdropdown",
              "icon": {
                "iconName": "view-list",
                "fontIconFamily": 1
              },

              "value": viewData
            },
            "position": "far",
            "tooltip": NLS.toggleView,
            "category": "action" //same category will be grouped together
          },
          {
            "id": "information",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                "iconName": "info",
                "fontIconFamily": WUXManagedFontIcons.Font3DS
              },
              "action": {
                "module": "DS/ENXESignature/Actions/Toolbar/ESignSummaryToolbarActions",
                "func": "openPropertiesView"
              }
            },
            "position": "far",
            "category": "action",
            "tooltip": NLS.Information
          }
        ],
        "typeRepresentations": {
          "viewdropdown": {
            "stdTemplate": "functionMenuIcon",
            "semantics": {
              "label": "action",
              "icon": "sorting"
            },
            "position": "far",
            "tooltip": {
              "text": "view",
              "position": "far"
            }
          }
        }

      }
      return JSON.stringify(definition);
    }

    return {
      writetoolbarDefinition,
      destroy: () => {
        _dataGrid.destroy();
        _container.destroy();
      }
    };
  });

define('DS/ENXESignature/Components/Wrapper/TileViewWrapper',
    ['DS/CollectionView/ResponsiveTilesCollectionView'],
    function (WUXResponsiveTilesCollectionView) {

        'use strict';

        let WrapperTileView, _myResponsiveTilesView, _container;
        /*
         * builds the default container for tile view if container is not passed
         */
        let buildLayout = function () {
            _container = UWA.createElement('div', { id: 'ESignDetailsTileViewContainer', 'class': 'esigndetails-tile-view-container hideView' });

        };
        /*
         * builds the tile view using WebUX's tile view
         * required param: treeDocument as model 
         * optional: container if customize container dom element is required with ur own class
         */
        let initTileView = (treeDocument, container, enableDragAndDrop) => {
            if (!container) {
                buildLayout();
            } else {
                _container = container;
            }
            if (!enableDragAndDrop) {
                enableDragAndDrop = false;
            }
            _myResponsiveTilesView = new WUXResponsiveTilesCollectionView({
                model: treeDocument,
                allowUnsafeHTMLContent: true,
                useDragAndDrop: enableDragAndDrop,
                displayedOptionalCellProperties: ['description'],
                contextualMenu: []
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
            tileView,
            getSelectedRows: () => getSelectedRows(_myResponsiveTilesView)
        };

    });

define('DS/ENXESignature/Views/Dialogs/ESignDefaultDialog', [
    'DS/Windows/Dialog',
    'DS/Windows/ImmersiveFrame',
    'DS/Controls/Button',
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt',
],
    function (
        WUXDialog,
        WUXImmersiveFrame,
        WUXButton,
        NLS) {
        'use strict';

        const getDialog = frame => {

            let _dialog;
            const immersiveFrame = frame || new WUXImmersiveFrame();

            const destroyContainer = () => {
                if (immersiveFrame) {
                    immersiveFrame.destroy()
                }
                _dialog.destroy()
            }

            const footerCancelButton = new WUXButton({ domId: 'closeButtonId' , label: NLS.CloseDialog, emphasize: "secondary", onClick: destroyContainer })

            const dialogDetailsContainer = new UWA.Element('div', { id: "ESignDialogDetailsContainer" });

            immersiveFrame.inject(document.body);

            let header = NLS.EsignDetailsWindowHeader;

            _dialog = new WUXDialog({
                title: header,
                modalFlag: true,
                width: 900,//to accomodate majority of the columns
                height: 500,
                content: dialogDetailsContainer,
                immersiveFrame: immersiveFrame,
                resizableFlag: true,
                buttons: {
                    Cancel: footerCancelButton
                }
            });

            _dialog.addEventListener("close", function (e) {
                widget.eSignDetailsEvent.publish('esign-window-closed');
            });

            return {
                dialogDetailsContainer,
                destroyContainer
            }
        };

        return { getDialog }

    });

/**
 * 
 */
 define(
    'DS/ENXESignature/Components/Wrapper/TriptychWrapper',
    [
        'DS/ENOXTriptych/js/ENOXTriptych'
    ],
    function (ENOXTriptych) {
        'use strict';

        var TriptychWrapper = function () { };

        TriptychWrapper.prototype.init = function (applicationChannel, parentContainer, middle, right) {
            this._left = '';
            this._main = middle;
            this._right = right;
            this._eSignWCPanel = '';

            this._applicationChannel = applicationChannel;
            this._triptych = new ENOXTriptych();

            //if the properties page was already opened, then open the panel
            //let rightState = widget.propWidgetOpen ? 'open' : 'close';
            let triptychOptions = {
                left: {
                    resizable: false,
                    originalSize: 0,
                    minWidth: 0, // for closed welcome panel onload
                    originalState: 'close', // 'open' for open, 'close' for close
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

            this._triptych.init(triptychOptions, '', middle, right);
            
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

        return TriptychWrapper;
    });

define('DS/ENXESignature/Views/Form/ESignRecordPropView',
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
	'DS/Controls/SelectionChipsEditor',
	'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt',
	'css!DS/ENXESignature/ENXESignature.css' 
],
function (WUXLineEditor, WUXEditor, WUXButton, WUXToggle,WUXAccordeon, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		  TreeDocument, TreeNodeModel, SelectionChipsEditor,
		  NLS) {   
	"use strict";
	let _eSignProperties = {};

	let build= function (data,container,mode) {
		if(!showView()){
			
			// Create the container in which all Meeting properties details will be rendered //
			_eSignProperties.elements = {};
			
			// Layout - Header Body Footer //
			_eSignProperties.formContainer = new UWA.Element('div', {id: 'ESignPropertiesContainer','class':'esignrecord-prop-container'});
			_eSignProperties.formContainer.inject(container);
			
			_eSignProperties.formFields = new UWA.Element('div', {id: 'ESignPropertiesBody','class':'esignrecord-prop-body esignrecord-properties-form-field'});
			_eSignProperties.formFields.inject(_eSignProperties.formContainer);
			
			if(mode != "create"){
			_eSignProperties.formFooter = new UWA.Element('div', {id: 'ESignPropertiesFooter','class':'esignrecord-prop-footer'});
			_eSignProperties.formFooter.inject(_eSignProperties.formContainer);
			}
			
			var fieldRequired,fieldViewOnly;

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

			// Meeting Title //
			var titleDiv = new UWA.Element("div", {
					"id": "titleId",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
			if(fieldViewOnly== 'view'){
				new UWA.Element("h5", {"class":"", text: NLS.title}).inject(titleDiv);
				new UWA.Element("span", {text: data.model.ESignRecordTitle}).inject(titleDiv);
			}
			
			// name start
			var nameDiv = new UWA.Element("div", {
				"id": "nameId",
				"class": ""
			}).inject(_eSignProperties.formFields);

			if(fieldViewOnly=='view'){
			   new UWA.Element("h5", {text: NLS.name}).inject(nameDiv);
				new UWA.Element("span", {text: data.model.Name}).inject(nameDiv);	
			}
			// name end
			
			/*
			// Description START
			var descDiv = new UWA.Element("div", {
				"id": "descId",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.description}).inject(descDiv);
				new UWA.Element("span", {text: data.model.Description}).inject(descDiv);
				
			}
			// Description end
			*/
			// Signed Status START
			var signedStatusDiv = new UWA.Element("div", {
				"id": "signedStatus",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignedStatus}).inject(signedStatusDiv);
				new UWA.Element("span", {text: data.model.SignedStatus}).inject(signedStatusDiv);
				
			}
			// Signed Status end
			
			
			// Signed User Name START
			var signedUNDiv = new UWA.Element("div", {
				"id": "signedUN",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignedUserName}).inject(signedUNDiv);
				new UWA.Element("span", {text: data.model.SignedUserName}).inject(signedUNDiv);
				
			}
			// Signed User Name end
			
			// SignedFullName START
			var signedFullNameDiv = new UWA.Element("div", {
				"id": "signedFullName",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignedFullName}).inject(signedFullNameDiv);
				new UWA.Element("span", {text: data.model.SignedFullName}).inject(signedFullNameDiv);
				
			}
			// SignedFullName end
			
			
			// modified START
			var modifiedDiv = new UWA.Element("div", {
				"id": "modified",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.Modified}).inject(modifiedDiv);
				new UWA.Element("span", {text: data.model.Modified}).inject(modifiedDiv);
				
			}
			// modified end
			
			// signedTimeDiv START
			var signedTimeDiv = new UWA.Element("div", {
				"id": "signedTime",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignedTime}).inject(signedTimeDiv);
				new UWA.Element("span", {text: data.model.SignedTime}).inject(signedTimeDiv);
				
			}
			// signedTimeDiv end
			
			/*
			// SignedUserTimeZone START
			var signedUserTimeZoneDiv = new UWA.Element("div", {
				"id": "signedUserTimeZoneDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignedUserTimeZone}).inject(signedUserTimeZoneDiv);
				new UWA.Element("span", {text: data.model.SignedUserTimeZone}).inject(signedUserTimeZoneDiv);
				
			}
			// SignedUserTimeZone end
			*/
			// ActionType START
			var actionTypeDiv = new UWA.Element("div", {
				"id": "actionTypeDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.ActionType}).inject(actionTypeDiv);
				new UWA.Element("span", {text: data.model.ActionType}).inject(actionTypeDiv);
				
			}
			// ActionType end
			
			if(data.model.ActionType != undefined && (data.model.ActionType == 'Approve' || data.model.ActionType == 'Approval' )){
				// ApprovalESignMeaning START
				var approvalESignMeaningDiv = new UWA.Element("div", {
					"id": "approvalESignMeaningDiv",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
				if(fieldViewOnly=='view'){
					 new UWA.Element("h5", {text: NLS.ApprovalESignMeaning}).inject(approvalESignMeaningDiv);
					new UWA.Element("span", {text: data.model.ApprovalESignMeaning}).inject(approvalESignMeaningDiv);
					
				}
				// ApprovalESignMeaning end
			}else{
				// DisApprovalESignMeaning START
				var disApprovalESignMeaningDiv = new UWA.Element("div", {
					"id": "disApprovalESignMeaningDiv",
					"class": ""
				}).inject(_eSignProperties.formFields);
				
				if(fieldViewOnly=='view'){
					 new UWA.Element("h5", {text: NLS.DisApprovalESignMeaning}).inject(disApprovalESignMeaningDiv);
					new UWA.Element("span", {text: data.model.DisApprovalESignMeaning}).inject(disApprovalESignMeaningDiv);
					
				}
				// DisApprovalESignMeaning end
			}
			
          /*
			// Actiontaken START
			var actiontakenDiv = new UWA.Element("div", {
				"id": "actiontakenDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.Actiontaken}).inject(actiontakenDiv);
				new UWA.Element("span", {text: data.model.Actiontaken}).inject(actiontakenDiv);
				
			}
			// Actiontaken end
	       */
	       // ObjectRevison START
			var objectRevisonDiv = new UWA.Element("div", {
				"id": "objectRevisonDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.ObjectRevison}).inject(objectRevisonDiv);
				new UWA.Element("span", {text: data.model.ActionTakenObjectRevison}).inject(objectRevisonDiv);
				
			}
			// ObjectRevison end
			
			 // maturityChangeDiv START
			var maturityChangeDiv = new UWA.Element("div", {
				"id": "maturityChangeDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.MaturityChange}).inject(maturityChangeDiv);
				new UWA.Element("span", {text: data.model.ActionTakenMaturityChange}).inject(maturityChangeDiv);
				
			}
			// maturityChangeDiv end
			
			// SignComment START
			var signCommentDiv = new UWA.Element("div", {
				"id": "signCommentDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignComment}).inject(signCommentDiv);
				new UWA.Element("span", {text: data.model.SignComment}).inject(signCommentDiv);
				
			}
			// SignComment end
			
			// SignAppliedAs START
			var signAppliedAsDiv = new UWA.Element("div", {
				"id": "signAppliedAsDiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.SignAppliedAs}).inject(signAppliedAsDiv);
				new UWA.Element("span", {text: data.model.SignAppliedAs}).inject(signAppliedAsDiv);
				
			}
			// SignAppliedAs end
			
			// Require2FA START
			var require2FADiv = new UWA.Element("div", {
				"id": "require2FADiv",
				"class": ""
			}).inject(_eSignProperties.formFields);
			
			if(fieldViewOnly=='view'){
				 new UWA.Element("h5", {text: NLS.Require2FA}).inject(require2FADiv);
				new UWA.Element("span", {text: data.model.Require2FA}).inject(require2FADiv);
				
			}
			// Require2FA end

			if(fieldViewOnly== 'view'){
				_eSignProperties.formFooter.style.display = "none";
			}
			
			else if(fieldViewOnly== 'edit'){
				// Save and Cancel button
		
				// save button	
		
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

	 let ESignRecordPropView={
			 init : (data,container,mode) => { return build(data,container,mode);},
			 hideView: () => {hideView();},
			 getProperties: () => { return getProperties();},
			//build : (container,data,mode) => { return build(container,data,mode);},
			destroy : () => {return destroy();}
	 };
	 
	 return ESignRecordPropView;
});

define('DS/ENXESignature/Config/ESignInfoFacets',
['DS/Core/Core',
 'UWA/Drivers/Alone',
 'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'],
function(core, Alone, NLS) {

    'use strict';

    let ESignInfoFacets = [{ 
    	label: NLS.properties, 
    	id:"ESignRecordPropertiesInfo",
    	isSelected:true, 
    	icon: { 
    		iconName: "attributes",//"calendar-clock",
    		fontIconFamily: WUXManagedFontIcons.Font3DS
    	},
    	content: Alone.createElement('div', {id:'ESignPropertiesContainer', 'class':'esign-info-container'}),
        loader : 'DS/ENXESignature/Views/Form/ESignRecordPropView'
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
  * @overview ESigns - ESign Details Bootstrap file to interact with the platform
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignature/Controller/ESignDetailsBootstrap',
[
    'UWA/Core',
    'UWA/Class/Collection',
    'UWA/Class/Listener',
    /*'UWA/Utils',*/
    'DS/ENXESignature/Utilities/Utils',
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
    let _started = false, _frameENOVIA = false, _csrf, ESignDetailsBootstrap, _prefSwym, _pref3DSpace, _pref3DPassport;

    async function initSwymServices() {
        if (_prefSwym) {
            return _prefSwym;
        }

        let platformId = widget.getValue("x3dPlatformId");

        return new Promise(resolve => {
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
                    resolve(_prefSwym)
                },
                onFailure: function () {
                    _prefSwym = '';
                    resolve(_prefSwym)
                }
            });
        })
    }

    async function init3DSpaceServices() {
        if (_pref3DSpace) {
            return _pref3DSpace;
        }

        let platformId = widget.getValue("x3dPlatformId");

        return new Promise(resolve => {
            CompassServices.getServiceUrl({
                serviceName: '3DSpace',
                platformId: platformId,
                onComplete: function (data) {
                    if (typeof data === "string") {
                        _pref3DSpace = data;
                    } else {
                        _pref3DSpace = data[0].url;
                    }
                    resolve(_pref3DSpace)
                },
                onFailure: function () {
                    _pref3DSpace = '';
                    resolve(_pref3DSpace)
                }
            });
        })
    }
    
    async function init3DPassportServices() {
        if (_pref3DPassport) {
            return _pref3DPassport;
        }

        let platformId = widget.getValue("x3dPlatformId");

        return new Promise(resolve => {
            CompassServices.getServiceUrl({
                serviceName: '3DPassport',
                platformId: platformId,
                onComplete: function (data) {
                    if (typeof data === "string") {
                    	_pref3DPassport = data;
                    } else {
                    	_pref3DPassport = data[0].url;
                    }
                    resolve(_pref3DPassport)
                },
                onFailure: function () {
                	_pref3DPassport = '';
                    resolve(_pref3DPassport)
                }
            });
        })
    }

    ESignDetailsBootstrap = //UWACore.merge(UWAListener, 
    {

        start: function (platformServiceURLs) {
            return new Promise(async resolve => {
                if (_started) {
                    resolve()
                    return;
                }
                if(typeof widget == 'undefined') {
					window.widget = {data:{}};
	                widget.setValue = (id, value) => widget[id] = value;
	                widget.getValue = id => widget[id];
	                _pref3DSpace = platformServiceURLs.URL3DSpace;
	                _prefSwym = platformServiceURLs.URLSwym;
	                _pref3DPassport = platformServiceURLs.URLpassport;
				}else{
					await initSwymServices();
					await init3DSpaceServices();
					await init3DPassportServices();
				}

                _started = true;
                resolve()
            })
        },

        authenticatedRequest: function (url, options) {
            let onComplete;
            let tenantId = widget.getValue('x3dPlatformId');
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'tenant=' + tenantId;
            // if(widget.getValue("esign-userSecurityContext")){
            //     url = url + '&SecurityContext=' + encodeURIComponent(widget.getValue("esign-userSecurityContext"));
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
        get3DPassportURL: function () {
            if (_started) {
                return _pref3DPassport;
            }
        },
        getESignServiceBaseURL: function () {
            if (_started) {
                return _pref3DSpace + '/resources/v1/modeler/ESignRecord';
            }
        },
        getESignConfigServiceBaseURL: function () {
            if (_started) {
                return _pref3DSpace + '/resources/v1/modeler/ESignConfig';
            }
        },
        getSwymUrl: function () {
            if (_started) {
                return _prefSwym;
            }
        }


    }
    //);

    return ESignDetailsBootstrap;
});



define('DS/ENXESignature/Components/Wrapper/DataGridWrapper',
    [
        'DS/DataGridView/DataGridView',
        'DS/CollectionView/CollectionViewStatusBar',
        'DS/ENXESignature/Controller/ESignDetailsBootstrap',
        'css!DS/ENXESignature/ENXESignature.css'
    ],
    function (DataGridView, CollectionViewStatusBar, ESignDetailsBootstrap) {

        'use strict';

        let _dataGrid, _container, _toolbar

        let buildToolBar = jsonToolbar => {
            jsonToolbar = JSON.parse(jsonToolbar);
            _toolbar = _dataGrid.setToolbar(JSON.stringify(jsonToolbar));
            return _toolbar;
        };

        let initDataGridView = (treeDocument, colConfig, toolBar, dummydiv, massupdate) => {
            _dataGrid = new DataGridView({
                treeDocument: treeDocument,
                columns: colConfig,
                defaultColumnDef: {
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
            _dataGrid.rowSelection = 'single';
            _dataGrid.cellSelection = 'none';
            _dataGrid.getContent().style.top = '50 px';
            if (toolBar) {
                buildToolBar(toolBar);
            }

            setReusableComponents();
            _dataGrid.inject(dummydiv);
            return dummydiv;
        };



        let dataGridView = () => {
            return _dataGrid;
        };

        //todo nsm4
        let setReusableComponents = () => {
            _dataGrid.registerReusableCellContent({
                id: '_modifiedDate_',
             buildContent: function() {
                 let tempDiv = UWA.createElement('div');
                 UWA.createElement('span',{
                     "html": "",
                     "class":"esign-modified-date"
                   }).inject(tempDiv);
                 return tempDiv;
             }
         });
         _dataGrid.registerReusableCellContent({
            id: '_actionTaken_',
            buildContent: function () {
              let commandsDiv = UWA.createElement('div');
              UWA.createElement('span', {
                "html": "",
                "class": "esign-action-type-tile "
              }).inject(commandsDiv);
              return commandsDiv;
            }
          });
          _dataGrid.registerReusableCellContent({
            id: '_esignStatus_',
            buildContent: function () {
              let commandsDiv = UWA.createElement('div');
              UWA.createElement('span', {
                "html": "",
                "class": "esign-status-tile "
              }).inject(commandsDiv);
              return commandsDiv;
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
                if(ESignDetailsBootstrap.getSwymUrl() && ESignDetailsBootstrap.getSwymUrl().length > 0){
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

        let getSelectedRowsModel = (treeDocumentModel) => {
            var selectedDetails = {};
            var details = [];
            var children = treeDocumentModel.getSelectedNodes();
            for (var i = 0; i < children.length; i++) {
                details.push(children[i]);
            }
            selectedDetails.data = details;
            return selectedDetails;
        };

        let getRowModelById = (treeDocumentModel, id) => {
            var children = treeDocumentModel.getChildren();
            for (var i = 0; i < children.length; i++) {
                if (children[i].options.id == id) {
                    return children[i];
                }
            }
        };

        let getRowModelIndexById = (treeDocumentModel, id) => {
            var children = treeDocumentModel.getChildren();
            for (var i = 0; i < children.length; i++) {
                if (children[i].options.id == id) {
                    return i;
                }
            }
        };

        return {
            build: (treeDocument, colConfig, toolBar, dummydiv, massupdate) => initDataGridView(treeDocument, colConfig, toolBar, dummydiv, massupdate),
            dataGridView,
            destroy: () => { _dataGrid.destroy(); _container.destroy() },
            dataGridViewToolbar: () => _toolbar,
            getSelectedRowsModel,
            getRowModelById,
            getRowModelIndexById
        };

    }
);

/* global define, widget */
/**
 * @overview ESign Details - Data formatter
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXESignature/Utilities/DataFormatter',
    ['i18n!DS/ENXESignature/assets/nls/ENXESignMgmt',
    'DS/ENXESignature/Utilities/Utils'],
    function (NLS, Utils) {
        'use strict';

        let gridData = function (dataElem) {

            let actionTaken = {}, ESignMeaning = "";
            try {
                actionTaken = JSON.parse((dataElem.Actiontaken).replaceAll("'", '"'));
                actionTaken = actionTaken.actionType

            } catch(e) {
                actionTaken = {}
            }
            let MaturyAction, RevisionAction;
                RevisionAction = actionTaken && actionTaken[0] && actionTaken[0].ObjectRevision

            if ((dataElem.ActionType).toLowerCase() == 'approve') {
                ESignMeaning = dataElem.ApprovalESignMeaning
            } else {
                ESignMeaning = dataElem.DisApprovalESignMeaning
            }
            if (typeof actionTaken == 'object' && actionTaken[1] && actionTaken[1].MaturityChange) {
                MaturyAction = "Before: " + actionTaken[1].MaturityChange.before + ", After: " + actionTaken[1].MaturityChange.after
            }

            const Require2FA = (dataElem.Require2FA).toLowerCase() == 'true' ? 'Yes' : 'No'

            let response =
            {
                id: dataElem.id,
                type: dataElem.type,
                Name: dataElem.name,
                Description: dataElem.description,
                Owner: dataElem.owner,
                OwnerFullName: dataElem.ownerFullName,
                Modified: Utils.formatDateTimeString(new Date(dataElem.modified)),
                ESignRecordTitle: dataElem.ESignRecordTitle,
                ESignPolicyReference: dataElem.ESignPolicyReference,
                SignedTime: Utils.formatDateTimeString(new Date(dataElem.SignedTime)),
                SignatureMeaning: dataElem.SignatureMeaning,
                SignedStatus: dataElem.current,
                Require2FA,
                ObjectReference: dataElem.ObjectReference,
                // ObjectType: dataElem.ObjectType,
                ObjectServiceID: dataElem.ObjectServiceID,
                // ObjectSource: dataElem.ObjectSource,
                ObjectURl: dataElem.ObjectURl,
                Actiontaken: dataElem.Actiontaken,
                ActionTakenObjectRevison: RevisionAction,
                ActionTakenMaturityChange: MaturyAction,
                SignComment: dataElem.SignComment,
                SignAppliedAs: dataElem.SignAppliedAs,
                SignedFullName: dataElem.SignedFullName,
                SignedUserName: dataElem.SignedUserName,
                SignedUserRole: dataElem.SignedUserRole,
                // SignedUserTimeZone: dataElem.SignedUserTimeZone,
                ApprovalESignMeaning: dataElem.ApprovalESignMeaning,
                DisApprovalESignMeaning: dataElem.DisApprovalESignMeaning,
                ActionType: dataElem.ActionType,
                ESignMeaning
            };
            return response;
        };

        return {
            gridData: dataElem => gridData(dataElem)
        };
    });


/* global define, widget */
/**
  * @overview ESign details Management - ESign Model
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXESignature/Model/ESignRecordModel',
    [
        'DS/Tree/TreeDocument',
        'DS/Tree/TreeNodeModel',
        'DS/ENXESignature/Utilities/DataFormatter',
        'DS/ENXESignature/Components/Wrapper/DataGridWrapper',
        'DS/WebappsUtils/WebappsUtils',
        'DS/ENXESignature/Controller/ESignDetailsBootstrap'
    ],
    function (
        TreeDocument,
        TreeNodeModel,
        DataFormatter,
        WrapperDataGridView,
        WebappsUtils,
        ESignDetailsBootstrap
    ) {
        'use strict';
        let model = new TreeDocument();
        //  let _openedESignModel;

        const getOwnerIcon = (dataElem, ownerDiv) => {
            let tooltip = "";
            const ownerName = dataElem.SignedFullName;
            const userName = dataElem.SignedUserName;
            if (undefined !== ownerName) {
                let owner = new UWA.Element("div", {
                    class: 'ownerCell'
                });
                let userIcon = "";
                let ownerIconUrl;
                ownerIconUrl= "/api/user/getpicture/login/" + userName + "/format/normal";
                let swymOwnerIconUrl = ESignDetailsBootstrap.getSwymUrl() + ownerIconUrl;
                tooltip = tooltip + ownerName + ",\n";
                if(ESignDetailsBootstrap.getSwymUrl() && ESignDetailsBootstrap.getSwymUrl().length > 0){
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
                if (userIcon != "") {
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
            response.forEach(dataElem => {
                let ownerDiv = new UWA.Element("div", {
                    class: 'members'
                });
                const tooltip = getOwnerIcon(dataElem, ownerDiv)
                const root = new TreeNodeModel({
                    label: dataElem.ESignRecordTitle,
                    id: dataElem.id,
                    width: 300,
                    grid: DataFormatter.gridData(dataElem),
                    "thumbnail": WebappsUtils.getWebappsAssetUrl('ENXESignature', 'icons/ESign/ESignatureRecord-Thumbnail.png'),
                    description: onESignNodeCellRequest(dataElem, ownerDiv, tooltip),
                    icons: [WebappsUtils.getWebappsAssetUrl('ENXESignature', 'icons/ESign/ESignatureRecord-Tile.png')],
                    contextualMenu: ["My context menu"],

                    shouldAcceptDrop: true
                });

                model.addRoot(root);
            });

            model.pushUpdate();
            registerEvents();
            return model;
        };

        const onESignNodeCellRequest = function ({ name, current }, owner, tooltip) {
            var commandsDiv = "";
            commandsDiv = UWA.createElement('div', {
                class: "esign-policy-details"
            });
            UWA.createElement('div', {
                "html": name,
                "class": "esign-details-name-tile"
            }).inject(commandsDiv);
            UWA.createElement('span', {
                "html": current,
                "class": "esign-status-tile " + current.toUpperCase().replace(/ /g, '')
            }).inject(commandsDiv);
            owner.setStyle("display", "inline");
            owner.setStyle("padding-left", 3 + "px");
            owner.set({
                title: tooltip
            });
            owner.inject(commandsDiv);

            return commandsDiv.outerHTML;
        };


        const getRowModelById = id => {
            return WrapperDataGridView.getRowModelById(model, id);
        };

        const destroy = () => {
            model = new TreeDocument();
        };

        const getAvatarDetails = name => {
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

        const registerEvents = () => {
            //todo nsm4
            //  esignDetails.eSignEvent.subscribe('esign-DataGrid-on-dblclick', data => {
            //      _openedESignModel = data;
            //  });
            //  esignDetails.eSignEvent.subscribe('esign-back-to-summary', data => {
            //      _openedESignModel = undefined;
            //  });
        };

        return {
            createModel: response => createTreeDocumentModel(response),
            getModel: () => model,
            getSelectedRowsModel: () => WrapperDataGridView.getSelectedRowsModel(model),
            getRowModelById: id => getRowModelById(id),
            destroy: () => destroy()
        };

    });


/**
 * This file is a wrapper file to create toolbars in the app. Currently not being used
 */

define('DS/ENXESignature/Actions/Toolbar/ESignSummaryToolbarActions',
    ['DS/ENXESignature/Model/ESignRecordModel'], function (ESignRecordModel) {

        'use strict';

        let service = Object.create(null);
        service.currentView = "Grid";
        service.previousView = "Grid";


        let openPropertiesView = d => {
            let data = ESignRecordModel.getSelectedRowsModel();
            if (data.data.length == 1) { //info should be displayed if there is only 1 item selected.
                let model = data.data[0].options.grid;
                data.model = model;
            }
            //First check if the info panel is already open, if already open then close the panel
            if (widget.getValue("propWidgetOpen")) {
                widget.eSignDetailsEvent.publish('esign-info-close-click', { info: "ESign" });
            } else {
                widget.eSignDetailsEvent.publish('esign-header-info-click', { model: data.model, info: "ESign" });
            }

        };

        return {
            openPropertiesView: (d) => openPropertiesView(d)
        };
    });

/* global define, widget */
/**
 * @overview ESign Service
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
 define('DS/ENXESignature/Services/ESignDetailsServices',
 [
     'UWA/Class/Promise',
     'DS/ENXESignature/Controller/ESignDetailsBootstrap',
     'DS/ENXESignature/Utilities/ParseResponseUtil'
 ],
 function (
     Promise,
     ESignDetailsBootstrap,
     ParseResponseUtil
 ) {
     'use strict';

    //Not used as of now
    //  const fetchAllESignDetails = () => {
    //      return new Promise(function (resolve, reject) {
    //          let getURL = ESignDetailsBootstrap.getESignServiceBaseURL();
    //          let options = {};
    //          options.method = 'GET';
    //          options.timeout = 0;
    //          options.headers = {
    //              'Content-Type': 'application/ds-json',
    //          };

    //          options.onComplete = function (serverResponse) {
    //              resolve(new ParseResponseUtil().parseCompleteResp(JSON.parse(serverResponse)));
    //          };

    //          options.onFailure = function (serverResponse, respData) {
    //              if (respData) {
    //                  reject(respData);
    //              } else {
    //                  reject(serverResponse);
    //              }
    //          };

    //          ESignDetailsBootstrap.authenticatedRequest(getURL, options);
    //      });
    //  };

     const fetchESignDetails = (refId, serviceID) => {
        return new Promise(function (resolve, reject) {
            let getURL = ESignDetailsBootstrap.getESignServiceBaseURL() + "?ESignObjectRef=" + refId + "&ESignObjectServiceID=" + serviceID;
            let options = {};
            options.method = 'GET';
            options.timeout = 0;
            options.headers = {
                'Content-Type': 'application/ds-json',
            };

            options.onComplete = function (serverResponse) {
                resolve(new ParseResponseUtil().parseCompleteResp(JSON.parse(serverResponse)));
            };

            options.onFailure = function (serverResponse, respData) {
                if (respData) {
                    reject(respData);
                } else {
                    reject(serverResponse);
                }
            };

            ESignDetailsBootstrap.authenticatedRequest(getURL, options);
        });
    };

     const fetchESignDetailById = (eSignId) => {
         return new Promise((resolve, reject) => {
             let getURL = ESignDetailsBootstrap.getESignServiceBaseURL() + "/" + eSignId;
             let options = {};
             options.method = 'GET';
             options.headers = {
                 'Content-Type': 'application/ds-json',
             };

             options.onComplete = function (serverResponse) {
                 resolve(new ParseResponseUtil().parseCompleteResp(JSON.parse(serverResponse)));
             };

             options.onFailure = function (serverResponse, respData) {
                 if (respData) {
                     reject(respData);
                 } else {
                     reject(serverResponse);
                 }
             };

             ESignDetailsBootstrap.authenticatedRequest(getURL, options);
         });
     };


     const fetchSecurityContext = () => {
        return new Promise(function(resolve, reject) {
            let postURL=ESignDetailsBootstrap.get3DSpaceURL()+'/resources/bps/cspaces';
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
                //console.log('ESignWidgetUtilServices._fetchSecurityContext failure', serverResponse,respData)
                reject(respData);
            };

            ESignDetailsBootstrap.authenticatedRequest(postURL, options);	
        });
    };

    const checkAuthDelegation = (serviceURL) => {
        return new Promise(function (resolve, reject) {
            let getURL = serviceURL || ESignDetailsBootstrap.get3DPassportURL() + '/api/public/tenant/type'
            let options = {};
            options.method = 'GET';
            options.timeout = 0;
            options.headers = {
                'Content-Type': 'application/ds-json',
            };

            options.onComplete = function (serverResponse) {
                resolve(new ParseResponseUtil().parseDelegatedTestResp(JSON.parse(serverResponse)));
            };

            options.onFailure = function () {
                resolve(false);
            };

            ESignDetailsBootstrap.authenticatedRequest(getURL, options);
        });
    };


     return {
        // fetchAllESignDetails,
        fetchESignDetails,
        fetchESignDetailById,
        fetchSecurityContext,
        checkAuthDelegation
     };

 }
);

/*
global widget
 */
define('DS/ENXESignature/Controller/ESignDetailsController',
	[
		'DS/ENXESignature/Services/ESignDetailsServices',
		'UWA/Promise',
		'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'],
	function (ESignDetailsServices,
		Promise, NLS) {
		'use strict';
		let ESignDetailsController, eSignID;
		//TODO implement a general callback method for anykind of service failure
		let commonFailureCallback = function (reject, failure) {
			if (failure.statusCode === 500) {
				widget.eSignDetailsNotify.handler().addNotif({
					level: 'error',
					subtitle: NLS.unexpectedError,
					sticky: true
				});
			} else {
				reject(failure);
			}
		}

		/*All methods are public, need to be exposed as this is service controller file*/
		ESignDetailsController = {
			fetchSecurityContext: () => {
				return new Promise(function (resolve, reject) {
					ESignDetailsServices.fetchSecurityContext().then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},

			//Not used now
			// fetchAllESignDetails: ()  => {
			// 	return new Promise(function (resolve, reject) {
			// 		ESignDetailsServices.fetchAllESignDetails().then(
			// 			success => {
			// 				resolve(success);
			// 			},
			// 			failure => {
			// 				commonFailureCallback(reject, failure);
			// 			});
			// 	});
			// },
			fetchESignDetails: (refId, serviceID) => {
				return new Promise(function (resolve, reject) {
					ESignDetailsServices.fetchESignDetails(refId, serviceID).then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},
			fetchESignDetailById: eSignID => {
				return new Promise(function (resolve, reject) {
					ESignDetailsServices.fetchESignDetailById(eSignID).then(
						success => {
							resolve(success);
						},
						failure => {
							commonFailureCallback(reject, failure);
						});
				});
			},
			checkAuthDelegation: serviceURL => {
				return new Promise(function (resolve, reject) {
					if (widget.getValue("x3dPlatformId") == "OnPremise") {
						resolve(false)
					} else {
						ESignDetailsServices.checkAuthDelegation(serviceURL).then(
							success => {
								resolve(success);
							},
							failure => {
								commonFailureCallback(reject, failure);
							}
						);
					}

				});
			}
		};
		return ESignDetailsController;

	});

define('DS/ENXESignature/Services/ESignAuthenticationServices', 
		[
			"UWA/Core",
			'UWA/Class/Promise',
			'DS/WAFData/WAFData',
			'DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
			'DS/ENXESignature/Controller/ESignDetailsBootstrap'
			],
			function(
					UWACore,
					Promise,
					WAFData,
					i3DXCompassPlatformServices,
					ESignDetailsBootstrap
			) {
	'use strict';
	let ESignAuthenticationServices , _getLoginTicket, _serviceURL, _reAuthenticateESign, _validateTOTPCode;

	_reAuthenticateESign = function(loginFormData, EsignplatformURLs){

		return new Promise(function(resolve, reject) {
			//console.log(loginFormData);
			var  options = {};
			var platformData, tenantId;
			//data manipulatiuon start

			var resultElementSelected = [];
			var initModel = {
			    'type': '',
				'id' : '',
				'dataelements':{}
			};
			const payloadData = typeof loginFormData == 'string' ? JSON.parse(loginFormData) : JSON.parse(JSON.stringify(loginFormData))
			var dataEle = {
				'userName' : payloadData.username,
				'firstName' : payloadData.firstName,
				'lastName' : payloadData.lastName,
				'fullName' : payloadData.fullName,
				'delegated': payloadData.delegated,
				'password' : payloadData.password,
				'passportURL' : payloadData.passportURL,
				'transURL': payloadData.transURL,
				'cookieString': payloadData.cookieString,
				'successfulReauthSeqId': payloadData.successfulReauthSeqId,
				'eSignPolicyReference': EsignplatformURLs.eSignPolicyReference,
				'ObjectReference': EsignplatformURLs.ObjectReference,
				'TenantId': EsignplatformURLs.TenantId,
				'ObjectServiceID': EsignplatformURLs.ObjectServiceID,
				'ObjectURI': EsignplatformURLs.ObjectURI,
				'ObjectActionType': EsignplatformURLs.ObjectActionType,
				'signatureComments': EsignplatformURLs.signatureComments,
				'signMeaning': EsignplatformURLs.signMeaning,
				'signRole': EsignplatformURLs.signRole,
			};
			initModel['dataelements']=dataEle;
			
			resultElementSelected.push(initModel);
			var mainModel={
			    'data':'',
			    'csrf':widget.data.csrf
			};
			mainModel['data']=resultElementSelected;
			if(EsignplatformURLs.taskCount == undefined){
				EsignplatformURLs.taskCount=1;
			}
			
			var _serviceURL = 	ESignDetailsBootstrap.getESignServiceBaseURL()+"?taskCount="+EsignplatformURLs.taskCount;
			options.data = JSON.stringify(mainModel);//loginFormData;
			options.method = 'POST';
			options.headers = {
					'Content-Type' : 'application/json',
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

			ESignDetailsBootstrap.authenticatedRequest(_serviceURL, options);	
		}); 

	};
	
	_validateTOTPCode = function(totpJsonObj, jsonSuccessObj, EsignplatformURLs){

		return new Promise(function(resolve, reject) {

			var  options = {};
			var resultElementSelected = [];
			var initModel = {
			    'type': '',
				'id' : '',
				'dataelements':{}
			};
			var dataEle = {
				'userData' : totpJsonObj,
				'eSignPolicyReference' : EsignplatformURLs.eSignPolicyReference,
				'signatureComments':EsignplatformURLs.signatureComments,
				'ObjectActionType': EsignplatformURLs.ObjectActionType
			};
			initModel['dataelements']=dataEle;
			
			resultElementSelected.push(initModel);
			var mainModel={
			    'data':'',
			    'csrf':widget.data.csrf
			};
			mainModel['data']=resultElementSelected;
			if(EsignplatformURLs.taskCount == undefined){
				EsignplatformURLs.taskCount=1;
			}
			var _serviceURL = ESignDetailsBootstrap.getESignServiceBaseURL()+'/validate2FA?taskCount='+EsignplatformURLs.taskCount;
			
			options.data = JSON.stringify(mainModel);
			options.method = 'POST';
			options.headers = {
					'Content-Type' : 'application/json',
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

			ESignDetailsBootstrap.authenticatedRequest(_serviceURL, options);
		}); 

	};


	ESignAuthenticationServices={
			reAuthenticateESign: (loginFormData,EsignplatformURLs) => {return _reAuthenticateESign(loginFormData,EsignplatformURLs);},
			validateTOTPCode: (totpJsonObj, jsonSuccessObj, EsignplatformURLs) => {return _validateTOTPCode(totpJsonObj, jsonSuccessObj, EsignplatformURLs);}
	};

	return ESignAuthenticationServices;
});

define('DS/ENXESignature/Views/Facets/ESignPropertiesTabs', [
  'DS/Controls/TabBar',
  'DS/ENXESignature/Config/ESignInfoFacets',
  'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
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
		var ntabs =["ESignRecordPropertiesInfo"];
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

define('DS/ENXESignature/Controller/ESignAuthenticationController',[
	'DS/ENXESignature/Services/ESignAuthenticationServices',
	'UWA/Promise'],


	function(ESignAuthenticationServices, Promise) {

	'use strict';
	let ESignAuthenticationController;

	ESignAuthenticationController = {

			reAuthenticateESign: function(loginFormData, EsignplatformURLs){
				return new Promise(function(resolve, reject) {
					ESignAuthenticationServices.reAuthenticateESign(loginFormData,EsignplatformURLs).then(
							success => {

								resolve(success); 
							},
							failure => {

								reject(failure);
							});
				});	
			},
			validateTOTPCode: function(totpJsonObj, jsonSuccessObj, EsignplatformURLs){
				return new Promise(function(resolve, reject) {
					ESignAuthenticationServices.validateTOTPCode(totpJsonObj, jsonSuccessObj, EsignplatformURLs).then(
							success => {

								resolve(success); 
							},
							failure => {

								reject(failure);
							});
				});	
			}

	};

	return ESignAuthenticationController;
});

define('DS/ENXESignature/Views/Dialogs/ESignatureAuthDialog',
	[
		'DS/ENXESignature/Controller/ESignAuthenticationController',
		'DS/ENXESignature/Components/ESignAuthenticationMediator',
		'DS/ENXESignature/Components/ENXESignMgmtNotifications',
		// "DS/Utilities/Dom",
		// "DS/WebappsUtils/WebappsUtils",
		// "DS/Controls/LineEditor",
		"DS/Controls/Button",
		"DS/Windows/ImmersiveFrame",
		"DS/Windows/Dialog",
		"DS/Controls/Tab",
		'DS/Controls/Toggle',
		'DS/Controls/ButtonGroup',
		'DS/Controls/ComboBox',
		'DS/Notifications/NotificationsManagerUXMessages',
		'DS/ENXESignature/Utilities/ParseResponseUtil',
		'DS/WAFData/WAFData',
		'DS/ENXESignature/Controller/ESignDetailsBootstrap',
		'DS/ENXESignature/Controller/ESignDetailsController',
		'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt',
		'css!DS/UIKIT/UIKIT.css',
		'css!DS/ENXESignature/ENXESignature.css'
	],
	function (ESignAuthenticationController, ESignAuthenticationMediator, ENXESignMgmtNotifications,
		// Dom ,WebappsUtils,WUXlineEditor,
		WUXButton, WUXImmersiveFrame, WUXDialog, WUXTabBar, WUXToggle, WUXButtonGroup, WUXComboBox, NotificationsManagerUXMessages, ParseResponseUtil, WAFData, ESignDetailsBootstrap, ESignDetailsController, NLS) {
		"use strict";
		var ESignMediator;
		var EsignAuthrnotify;
		var EsignplatformURLs, taskAssigneeUserName, currTenant, appName, ESignPolicy, objectAction;
		var previewESign = false;
		const initBootstrap = (platformServiceURLs) => new Promise(async resolve => {
			await ESignDetailsBootstrap.start(platformServiceURLs)
			resolve()
		});
		var ESignAuthenticationDialog = {

			// fetch ESign Policy details - API Service call---START
			_fetchESignConfigByName: function (esignConfigName, objectAct) {
				return new Promise(function (resolve, reject) {
					var getURL = ESignDetailsBootstrap.getESignConfigServiceBaseURL() + "?name=" + encodeURIComponent(esignConfigName) + "&objectAction=" + encodeURIComponent(objectAct);
					var options = {};
					options.method = 'GET';
					options.headers = {
						'Content-Type': 'application/ds-json',
					};
					options.wait = true;
					options.data = "";   //JSON.stringify(finalJson);

					options.onComplete = function (serverResponse) {
						resolve(new ParseResponseUtil().parseCompleteResp(JSON.parse(serverResponse)));
						//	resolve(serverResponse);
					};

					options.onFailure = function (serverResponse, respData) {
						if (respData) {
							reject(respData);
						} else {
							reject(serverResponse);
						}
					};

					ESignDetailsBootstrap.authenticatedRequest(getURL, options);
				});
			},
			// fetch ESign Policy details - API Service call---END

			//initializing mediator and notification
			init: function (platformServiceURLs) {
				var immersiveFrame = new WUXImmersiveFrame();
				immersiveFrame.inject(document.body);

				ESignMediator = new ESignAuthenticationMediator();
				EsignAuthrnotify = new ENXESignMgmtNotifications();
				initBootstrap(platformServiceURLs).then(() => {

					widget.setValue("x3dPlatformId", platformServiceURLs.x3dPlatformId);
					// widget.setValue("esign-userSecurityContext",platformServiceURLs.userSecurityContext);
					currTenant = platformServiceURLs.x3dPlatformId;
					ESignPolicy = platformServiceURLs.eSignPolicyReference;
					objectAction = platformServiceURLs.ObjectActionType;
					//console.log("==ESignatureAuthDialog.js===EsignPolicy==" + ESignPolicy);
					if (platformServiceURLs.previewESign != undefined && platformServiceURLs.previewESign != '') {
						previewESign = platformServiceURLs.previewESign;
					}
					EsignplatformURLs = platformServiceURLs;
					taskAssigneeUserName = platformServiceURLs.Username;
					ESignAuthenticationDialog.BuildESignAuthLoginDialog(immersiveFrame)
					/*
					ESignAuthenticationDialog.initEnoviaBootstrap(currTenant).then(
							success => {
								EsignplatformURLs = platformServiceURLs;
								taskAssigneeUserName = platformServiceURLs.Username;
								ESignAuthenticationDialog.BuildESignAuthLoginDialog(immersiveFrame)
							},
							failure =>{
								EsignAuthrnotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.EsignUnexpectederror, 
									sticky: false
								});
							}); 
							*/
					/*else{
						EsignplatformURLs = platformServiceURLs;
						taskAssigneeUserName = platformServiceURLs.Username;
						appName=platformServiceURLs.ObjectSource;
						ESignPolicy=platformServiceURLs.eSignPolicyReference;
						objectAction=platformServiceURLs.ObjectAction;
						ESignAuthenticationDialog.BuildESignAuthLoginDialog(immersiveFrame);
					}*/
				}) // initBootstrap ends
				return ESignMediator;
			},

			InitiateEsignAuthDialog: function (container, jsonSuccessObj, cookieJsonObj) {

				this._immersiveFramework = container;
				var that = this;
				var DialogContentouterDiv = new UWA.Element('div', { id: '_codeContentouterDiv', 'class': '' });
				var middleDiv = new UWA.Element('div', { id: '_codemiddleDiv', 'class': '' });
				var innderDiv = new UWA.Element('div', { id: '_codeinnderDiv', 'class': '' });

				var compassLogoDiv = new UWA.Element('div', { id: '_codeCompassLogoDiv', 'class': '' });
				var compassLogoSpan = new UWA.Element("span", { id: 'validatecompassLogoSpan', 'class': '' });
				var logo = new UWA.Element("img", {
					//"class": "dddxp-logo",
					//src: WebappsUtils.getWebappsAssetUrl("ENXESignature","icons/ESign/3DSpace.png"),
					src: ESignDetailsBootstrap.get3DSpaceURL() + "/webapps/ENXESignature/assets/icons/ESign/3DSpace.png",
				});
				var fieldDiv = new UWA.Element('div', { id: '_codeFieldDiv', 'class': '' });
				var codeLabelDiv = new UWA.Element('div', { id: '_codeLabelDiv', 'class': '' });
				var codeLabel = new UWA.Element('h5', { id: '_codeLabel', 'class': '', text: NLS.EsignAuthCodeLabel });
				var codeTextDiv = new UWA.Element('div', { id: '_codeTextDiv', 'class': '' });
				var codeText = new UWA.Element('h5', { id: '_codeText', 'class': '', text: NLS.EsignCodeMessage });
				var codeInputDiv = new UWA.Element('div', { id: '_codeInputDiv', 'class': '' });
				var codeInput = UWA.createElement('input', { type: 'text', id: '_esignAuthcontentEditorDomId', size: '40', 'class': 'form-control', placeholder: NLS.EsignCodePlaceholder });

				logo.inject(compassLogoSpan);
				compassLogoSpan.inject(compassLogoDiv);
				compassLogoDiv.inject(innderDiv);
				codeLabel.inject(codeLabelDiv);
				codeLabelDiv.inject(fieldDiv);
				codeText.inject(codeTextDiv);
				codeTextDiv.inject(fieldDiv);
				codeInput.inject(codeInputDiv);
				codeInputDiv.inject(fieldDiv);
				fieldDiv.inject(innderDiv);
				innderDiv.inject(middleDiv);
				middleDiv.inject(DialogContentouterDiv);
				this._esignAuthDialog = new WUXDialog({
					title: NLS.EsignUserVerification,
					modalFlag: true,
					domId: 'ESignLoginDialog',
					content: DialogContentouterDiv,
					immersiveFrame: container,
					width: 600,
					height: 400,
					buttons: {
						Ok: new WUXButton({
							emphasize: "primary",
							domId: "esignVerifyButton",
							label: NLS.EsignVerify,
							onClick: function (e) {
								var button = e.dsModel;
								var myDialog = button.dialog;
								var totpCode = document.getElementById("_esignAuthcontentEditorDomId").value;

								if ("" == totpCode || null == totpCode) {
									EsignAuthrnotify.handler().addNotif({
										level: 'error',
										subtitle: NLS.EsignAuthInvalidCode,
										sticky: false
									});
									return;
								}
								if (totpCode) {

									var totpJsonObj = {
										code: totpCode,
										totpURL: encodeURIComponent(jsonSuccessObj.x3ds_totp_url),
										csrfToken: jsonSuccessObj["X-DS-IAM-CSRFTOKEN"],
										reauthsessionid: cookieJsonObj.reauthsessionid
									}

									if (cookieJsonObj.SERVERID != null && cookieJsonObj.SERVERID != undefined) {
										totpJsonObj["SERVERID"] = cookieJsonObj.SERVERID;
									} else {
										//totpJsonObj["SERVERID"] = null;
										totpJsonObj["SERVERID"] = "";
									}

									totpJsonObj = JSON.stringify(totpJsonObj);

									ESignAuthenticationController.validateTOTPCode(totpJsonObj, jsonSuccessObj, EsignplatformURLs).then(
										success => {
											var jsonObj = JSON.parse(success).data[0].dataelements;
											if (jsonObj.result == 'success') {

												ESignMediator.publish('ESign-Authenticated', { "ESignRecordId": jsonObj.esignRecordList });
												myDialog.close();

											} else {
												EsignAuthrnotify.handler().addNotif({
													level: 'error',
													subtitle: NLS.EsignAuthInvalidCode,
													sticky: false
												});
												return;
											}
										},
										failure => {

											EsignAuthrnotify.handler().addNotif({
												level: 'error',
												subtitle: NLS.EsignUnexpectederror,
												sticky: false
											});
											myDialog.close();
										}
									);
								};
							}
						}), //ok button ends

						Cancel: new WUXButton({
							emphasize: "secondary",
							onClick: function (e) {
								var button = e.dsModel;
								var myDialog = button.dialog;
								ESignMediator.publish('ESign-Dialog-Cancel');
								myDialog.close();
							}
						})
						//buttons end
					}

				});

				this._esignAuthDialog.addEventListener('close', function (e) {

					if (that._immersiveFramework) {
						that._immersiveFramework.destroy();
						that._immersiveFramework = undefined;
					}
					ESignMediator.publish('ESign-Dialog-Close');
				});

			},

			BuildESignAuthLoginDialog: function (container) {
				const buildDialogFunction = buildAuthDialog.bind(this)
				let self = this
				ESignDetailsController.checkAuthDelegation().then(
					success => {
						//console.log('success=', success);
						buildDialogFunction(container, success, self);
					},
					failure => {
						//console.log('failure', failure);
						buildDialogFunction(container, false, self);
					}
				);
			}

		}

		const buildAuthDialog = (container, usingDelegatedAuthentication = false, that) => {

			ESignAuthenticationDialog._fetchESignConfigByName(ESignPolicy, objectAction).then(
				success => {
					that._immersiveFramework = container;
					var self = that;
					//console.log("=======SUCCESS====");

					if (success[0] == undefined) {
						EsignAuthrnotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.NoEsignConfigFound,
							sticky: false
						});
						if (self._immersiveFramework) {
							self._immersiveFramework.destroy();
							self._immersiveFramework = undefined;
						}
						return;
					}
					var esignType = success[0].type;
					var esignName = success[0].name.trim();
					var esignSignatureType = success[0].AuthorizationRequires.trim();
					var esignAppSignMeaning = success[0].ApprovalESignMeaning.trim();
					var esignAppEsignComment = success[0].ApprovalESignComment;
					var esignDisAppSignMeaning = success[0].DisApprovalESignMeaning.trim();
					var esignDisAppEsignComment = success[0].DisApprovalESignComment;
					var esignAppliedAs = success[0].SignatureAppliedAs;
					var esignMeaningValueNLS = success[0].ESignMeaningValueNLS;
					var delAuthReauthSessionId = success[0].DelAuthReauthSessionId;
					
					EsignplatformURLs["eSignPolicyReference"] = success[0].physicalid;
					var k = 0;

					// Delegation Auth End

					var DialogContentouterDiv = new UWA.Element('div', { id: '_esignContentouterDiv', 'class': '' });
					var middleDiv = new UWA.Element('div', { id: '_esignmiddleDiv', 'class': '' });
					var innderDiv = new UWA.Element('div', { id: '_esigninnderDiv', 'class': '' });

					var compassLogoDiv = new UWA.Element('div', { id: '_compassLogoDiv', 'class': '' });
					var compassLogoSpan = new UWA.Element("span", { id: '_compassLogoSpan', 'class': '' });
					var logo = new UWA.Element("img", {
						//"class": "dddxp-logo",
						//src: WebappsUtils.getWebappsAssetUrl("ENXESignature","icons/ESign/3DSpace.png"),
						src: ESignDetailsBootstrap.get3DSpaceURL() + "/webapps/ENXESignature/assets/icons/ESign/3DSpace.png",

					});
					var logindialogDiv = new UWA.Element('div', { id: '_logindialogDiv', 'class': '' });

					var _logintitlediv = new UWA.Element('div', { id: '_logintitlediv', 'class': '' });
					var loginIdTitle = new UWA.Element('h5', { id: '_loginIdTitle', 'class': '', text: NLS.EsignAuthLoginUserName });

					var _delegatetitlediv = new UWA.Element('div', { id: '_delegatetitlediv', 'class': '_delegatetitlediv1' });
					var delegateIdTitle = new UWA.Element('h5', { id: 'delegateIdTitle', 'class': 'delegateIdTitle1', text: NLS.EsignDelegateAuthTitle });
					var delegateIdVal = new UWA.Element("span", { id: 'delegateIdVal','class': 'delegateIdVal1 esign-flex-container', text: NLS.EsignDelegateAuthValue });

					var loginUsernameDiv = new UWA.Element('div', { id: '_loginUsernameDiv', 'class': '' });
					if (esignSignatureType == 'Password') {
						var loginUsernameField = UWA.createElement('input', { type: 'text', id: '_esignAuthLoginDialoginUsername', 'class': 'form-control', size: '40', pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+', placeholder: NLS.EsignUsernamePlaceholder, value: taskAssigneeUserName, disabled: true, autocomplete: 'off' });
					} else {
						var loginUsernameField = UWA.createElement('input', { type: 'text', id: '_esignAuthLoginDialoginUsername', 'class': 'form-control', size: '40', pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+', placeholder: NLS.EsignUsernamePlaceholder, autocomplete: 'off' });
					}
					var loginUsernameIconSpan = new UWA.Element('span', { id: '_loginUsernameIconSpan', 'class': 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-user' });

					var PasswordFieldDiv = new UWA.Element('div', { id: '_PasswordFieldDiv', 'class': '' });
					var PasswordField = UWA.createElement('input', { type: 'password', id: '_esignAuthLoginDialoginPassword', 'class': 'form-control', size: '40', placeholder: NLS.EsignAuthLoginPassword, autocomplete: 'off' });
					var eyeIconSpan = new UWA.Element('span', { id: '_eyeIconSpan', 'class': 'wux-ui-3ds wux-ui-3ds-1x  wux-ui-3ds-eye' });
					var loginPasswordIconSpan = new UWA.Element('span', { id: '_loginPasswordIconSpan', 'class': 'wux-ui-3ds wux-ui-3ds-1x  wux-ui-3ds-lock' });

					eyeIconSpan.addEvent('click', event => {
						event.target.classList.toggle('wux-ui-3ds-eye');
						event.target.classList.toggle('wux-ui-3ds-eye-off');
  						const type = PasswordField.getAttribute("type") === "password" ? "text" : "password"
  						PasswordField.setAttribute("type", type)
					})
					var checkBoxDiv = new UWA.Element('div', { id: '_checkBoxDiv', 'class': '' });

					var Checkbox = new WUXToggle({
						type: "checkbox",
						label: NLS.EsignAuthLoginReadAndUnderstand,
						domId: '_esignAuthLoginDialogincheckbox',
						checkFlag: false
					});

					//Role Start
					var roleDiv = new UWA.Element('div', { id: '_roleDiv', 'class': 'eSignroleDiv esign-flex-container' });
					var roleKey = new UWA.Element('span', { id: '_roleKey', 'class': 'eSignroleKey esign-flex-container', text: NLS.EsignRole });
					var roleVal = new UWA.Element("span", { 'class': 'eSignroleVal esign-flex-container', text: esignAppliedAs });
					//Role End
					EsignplatformURLs["signRole"] = esignAppliedAs;
					//Decision Start
					var objectActionNLS=objectAction;
					if (objectAction != undefined && objectAction != "") {
						if(objectAction == "Approve" || objectAction == "Approval"){
							objectActionNLS= NLS.Approve;
						}else if(objectAction == "Disapprove" || objectAction == "Disapproval" || objectAction == "Reject" ){
							objectActionNLS= NLS.Disapprove;
						}else if(objectAction == "Abstain"){
							objectActionNLS= NLS.Abstain;
						}
					}
					var decisionDiv = new UWA.Element('div', { id: '_decisionDiv', 'class': 'eSignDecDiv esign-flex-container' });
					var decisionKey = new UWA.Element('span', { id: '_decisionKey', 'class': 'eSignDecKey esign-flex-container', text: NLS.EsignDecision });
					var decisionVal = new UWA.Element("span", { 'class': 'eSignDecVal esign-flex-container', text: objectActionNLS });
					//Decision End

					//Meaning of Signature Start
					var meaningOfSignDiv = new UWA.Element('div', { id: '_meaningOfSignDiv', 'class': 'eSignMeaningSignDiv esign-flex-container' });
					//var meaningOfSignKeyDiv = new UWA.Element('div', {id: '_meaningOfSignKeyDiv','class':'eSignMeaningSignKeyDiv'});
					var meaningOfSignKey = new UWA.Element('span', { id: '_meaningOfSignKey', 'class': 'eSignMeaningSignKey esign-flex-container', text: NLS.EsignMeaningOfSign });
					//var meaningOfSignValDiv = new UWA.Element('div', {id: '_meaningOfSignValDiv','class':'eSignMeaningSignValDiv'});
					var meaningOfSignVal = new UWA.Element("span", { 'class': 'eSignMeaningSignVal esign-flex-container', text: esignMeaningValueNLS });
					/*
					if(objectAction == "Approve" || objectAction == "Approval" ){
						var meaningOfSignVal=  new UWA.Element("span", {'class':'eSignMeaningSignVal esign-flex-container',text: esignAppSignMeaning});
						EsignplatformURLs["signMeaning"]=esignAppSignMeaning;
					}else{
						var meaningOfSignVal=  new UWA.Element("span", {'class':'eSignMeaningSignVal esign-flex-container',text: esignDisAppSignMeaning});
						EsignplatformURLs["signMeaning"]=esignDisAppSignMeaning;
					}
					*/
					//Meaning of Signature End

					var commentDiv = new UWA.Element('div', { id: '_commentDiv', 'class': 'commentDiv esign-flex-container' });
					//if(objectAction == "Approve"){
					var commentTitle = new UWA.Element('span', { id: '_commentTitle', 'class': 'commentTitleKey esign-flex-container', text: NLS.EsignApprovalComment });
					/*}else{
					var commentTitle = new UWA.Element('span', {id: '_commentTitle','class':'', text: NLS.EsignDisApprovalComment});
					}
					*/
					var commmetField = UWA.createElement('textarea', { type: 'text', id: '_commmetField', 'class': 'wux-ui-state-undefined esign-flex-container', cols: '30', rows: '3', placeholder: NLS.CommentsPlaceholder });


					var hiddenFieldIncrementor = UWA.createElement('input', { type: 'hidden', id: '_esignValidateAttempts', 'class': '', value: k });
					var incrementValDiv = new UWA.Element('div', { id: '_incrementValDiv', 'class': '' });


					logo.inject(compassLogoSpan);

					compassLogoSpan.inject(compassLogoDiv);
					compassLogoDiv.inject(innderDiv);

					if (usingDelegatedAuthentication) { //delegateAuth
						delegateIdTitle.inject(_delegatetitlediv);
						delegateIdVal.inject(_delegatetitlediv);
						_delegatetitlediv.inject(logindialogDiv);

					} else {
						loginIdTitle.inject(_logintitlediv);
						_logintitlediv.inject(logindialogDiv);

						loginUsernameIconSpan.inject(loginUsernameDiv);
						loginUsernameField.inject(loginUsernameDiv);
						loginUsernameDiv.inject(logindialogDiv);

						loginPasswordIconSpan.inject(PasswordFieldDiv);
						PasswordField.inject(PasswordFieldDiv);
						eyeIconSpan.inject(PasswordFieldDiv);
						PasswordFieldDiv.inject(logindialogDiv);
					}

					if (esignAppliedAs != undefined && esignAppliedAs != "") {
						roleKey.inject(roleDiv);
						roleVal.inject(roleDiv);
						roleDiv.inject(logindialogDiv);
					}

					if (objectAction != undefined && objectAction != "") {
						decisionKey.inject(decisionDiv);
						decisionVal.inject(decisionDiv);
						decisionDiv.inject(logindialogDiv);
					}

					if (esignMeaningValueNLS != undefined && esignMeaningValueNLS != "") {
						meaningOfSignKey.inject(meaningOfSignDiv);
						meaningOfSignVal.inject(meaningOfSignDiv);
						meaningOfSignDiv.inject(logindialogDiv);
					}
					if (((objectAction == "Approve" || objectAction == "Approval") && esignAppEsignComment == 'Yes') || ((objectAction == "Disapprove" || objectAction == "Disapproval") && esignDisAppEsignComment == 'Yes')) {
						commentTitle.inject(commentDiv);
						commmetField.inject(commentDiv);
						commentDiv.inject(logindialogDiv);
					}
					//}

					hiddenFieldIncrementor.inject(incrementValDiv);
					incrementValDiv.inject(logindialogDiv);

					logindialogDiv.inject(innderDiv);

					innderDiv.inject(middleDiv);

					middleDiv.inject(DialogContentouterDiv);

					var buttonsDisabled = false;
					if (previewESign) {
						buttonsDisabled = true;
					}
					//delegateAuth start
					var buttonlabelDelAuth = NLS.EsignValidate;
					if (usingDelegatedAuthentication) {
						buttonlabelDelAuth = NLS.EsignDelAuthContinue;
					} else {
						buttonlabelDelAuth = NLS.EsignValidate;
					}
					//delegateAuth end
					that._esignAuthLoginDialog = new WUXDialog({
						title: NLS.EsignUserVerification,
						modalFlag: true,
						domId: 'ESignLoginDialog',
						content: DialogContentouterDiv,
						immersiveFrame: that._immersiveFramework,
						width: 600,
						height: 425,
						resizableFlag: false,
						buttons: {
							//if(objectAction != "ViewOnly"){
							Ok: new WUXButton({
								emphasize: "primary",
								domId: "esignValidateButton",
								label: buttonlabelDelAuth,  //delegateAuth
								disabled: buttonsDisabled,
								onClick: function (e) {
									if (usingDelegatedAuthentication) {
										e.dsModel.disabled = true;
										const uniqueKey = delAuthReauthSessionId + '-' + (new Date()).getTime()
										//console.log('reauthid sent', uniqueKey)
										const url3Dspace = ESignDetailsBootstrap.get3DSpaceURL();
										const urldpassport = ESignDetailsBootstrap.get3DPassportURL();
										const height = 425;
								        const width = 600;
								        const left = (screen.width - width) / 2;
								        const top = (screen.height - height) / 2;
										const popup = window.open(`${urldpassport}/api/login/reauth?id=${uniqueKey}&callback=${url3Dspace}/resources/v1/modeler/ESignRecord/delegateAuthSuccess`, '_blank', 'location=0,width = '+width+',height = '+height+', left=' + left + ', top=' + top);
										window.addEventListener('message', childResponse);

										let timer = setInterval(checkChild, 300);
										let validated = false;

										that._esignAuthLoginDialog.addEventListener('close', function (e) {
											window.removeEventListener('message', childResponse);
											clearInterval(timer);
											ESignMediator.publish('ESign-Dialog-Close');
											popup.close();
										});

										function checkChild() {
											//console.log('popup closed')
											if (popup.closed) {
												window.removeEventListener('message', childResponse); 
												clearInterval(timer);
												if (validated == false) {
													errorNotify('DelegatedAuthenticationFailed')
												}
												if (e.dsModel && validated == false) {
													e.dsModel.disabled = false;
												}
											}
										}

										function childResponse(e) {
											validated = true
											//console.log('success postmessage', e)
											const message = e.data
											if (((objectAction == "Approve" || objectAction == "Approval") && esignAppEsignComment == 'Yes') || ((objectAction == "Disapprove" || objectAction == "Disapproval") && esignDisAppEsignComment == 'Yes')) {
												EsignplatformURLs["signatureComments"] = document.getElementById("_commmetField").value;
											} else {
												EsignplatformURLs["signatureComments"] = "";
											}
											const loginTicketJsonObj = {
												transURL: message.transURL,
												cookieString: message.cookieString,
												delegated: true,
												successfulReauthSeqId: uniqueKey,
												passportURL: EsignplatformURLs.URLpassport
											}
											reauthCall(loginTicketJsonObj, EsignplatformURLs, usingDelegatedAuthentication, that)
											window.removeEventListener('message', childResponse);
										}

									} else {
										e.dsModel.disabled = true;
										var checkBox = document.getElementById("_esignAuthLoginDialogincheckbox");
										var userName = document.getElementById("_esignAuthLoginDialoginUsername");
										var passWord = document.getElementById("_esignAuthLoginDialoginPassword");

										if (userName.value == "" || passWord.value == "") {
											errorNotify('EsignAuthMandField')
											e.dsModel.disabled = false;
											return;

										}
										/*	else if(defaultPolicy== "TRUE" && !checkBox.dsModel.checkFlag){
												EsignAuthrnotify.handler().addNotif({
													level: 'error',
													subtitle: NLS.EsignAuthSelectCheckBox, 
													sticky: false
												});
												e.dsModel.disabled=false;
												return;
											}
											*/
										else {
											document.getElementById('_esignValidateAttempts').value = ++k;
											var button = e.dsModel;
											var _passportURL = ESignDetailsBootstrap.get3DPassportURL();
											if (typeof _passportURL === 'undefined') {
												_passportURL = EsignplatformURLs.URLpassport;
											}

											var loginTicketJsonObj = {
												//lt : _lt,
												username: document.getElementById("_esignAuthLoginDialoginUsername").value,
												password: document.getElementById("_esignAuthLoginDialoginPassword").value,
												passportURL: _passportURL
											}
											loginTicketJsonObj = JSON.stringify(loginTicketJsonObj);
											if (((objectAction == "Approve" || objectAction == "Approval") && esignAppEsignComment == 'Yes') || ((objectAction == "Disapprove" || objectAction == "Disapproval") && esignDisAppEsignComment == 'Yes')) {
												EsignplatformURLs["signatureComments"] = document.getElementById("_commmetField").value;
											} else {
												EsignplatformURLs["signatureComments"] = "";
											}
											//EsignplatformURLs["signMeaning"]= myComboBox.value;//  "Reviewed and Approved";
											EsignplatformURLs["validationAttempts"] = document.getElementById('_esignValidateAttempts').value;
										}//else ends
										reauthCall(loginTicketJsonObj, EsignplatformURLs, usingDelegatedAuthentication, that)

									}
								} //onClick Ends
							}),  // OK Ends
							Cancel: new WUXButton({
								emphasize: "secondary",
								disabled: false,//buttonsDisabled,
								onClick: function (e) {
								ESignMediator.publish('ESign-Dialog-Cancel');
									that._esignAuthLoginDialog.close();
								}
							}) //Cancel ends
							//  } // if ends
						} //button ends
					});// dialog ends



					that._esignAuthLoginDialog.addEventListener('close', function (e) {
					ESignMediator.publish('ESign-Dialog-Close');
						if (self._immersiveFramework) {
							self._immersiveFramework.destroy();
							self._immersiveFramework = undefined;
						}
					});// close ends



				}, // success ends
				failure => {

					that._immersiveFramework = container;
					var self = that;
					if (self._immersiveFramework != undefined) {
						self._immersiveFramework.destroy();
					}
					//reject(failure);
					EsignAuthrnotify.handler().addNotif({
						level: 'error',
						subtitle: NLS.EsignUnexpectederror,
						sticky: false
					}); // failure  ends
				});	// fetchEsign ends



		}   //BuildESignAuthLoginDialog method ends

		const errorNotify = NLSKey => EsignAuthrnotify.handler().addNotif({
			level: 'error',
			title: NLS[NLSKey],
			subtitle: NLS.ESignContactAdminMsg,
			sticky: false
		});

		const reauthCall = (loginTicketJsonObj, EsignplatformURLs, usingDelegatedAuthentication, that) => {
			ESignAuthenticationController.reAuthenticateESign(loginTicketJsonObj, EsignplatformURLs).then(
				success => {
					var cookieJsonObj;
					var eSigantureId = JSON.parse(success).data[0].dataelements.esignRecordList;
					if (usingDelegatedAuthentication) {
						if (eSigantureId && eSigantureId.length >0) {
							ESignMediator.publish('ESign-Authenticated', { "ESignRecordId": eSigantureId });
							that._esignAuthLoginDialog.close();
						} else {
							EsignAuthrnotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.EsignAuthDelFail,
								sticky: false
							});
							//e.dsModel.disabled = false;
							that._esignAuthLoginDialog.buttons.Ok.disabled=false;
							return;
						}

					} else {
						var jsonSuccessObj = JSON.parse(JSON.parse(success).data[0].dataelements.authResponse);//JSON.parse(JSON.parse(success).authResponse);
						var reauthsessionid = JSON.parse(success).data[0].dataelements.reauthsessionid;
						cookieJsonObj = { "reauthsessionid": reauthsessionid };
						if (JSON.parse(success).data[0].dataelements.SERVERID != null && JSON.parse(success).data[0].dataelements.SERVERID != undefined) {
							var serverId = JSON.parse(success).data[0].dataelements.SERVERID;
							cookieJsonObj["SERVERID"] = serverId;
						}


						if (jsonSuccessObj.result == "failed") {
							EsignAuthrnotify.handler().addNotif({
								level: 'error',
								subtitle: NLS.EsignAuthInvalidCredintials,
								sticky: false
							});
							//e.dsModel.disabled = false;
							that._esignAuthLoginDialog.buttons.Ok.disabled=false;
							return;
						}
						else {

							if ((jsonSuccessObj.userdata && jsonSuccessObj.userdata.fields && jsonSuccessObj.userdata.fields.username.toLowerCase() != taskAssigneeUserName.toLowerCase())) {
								EsignAuthrnotify.handler().addNotif({
									level: 'error',
									subtitle: NLS.EsignAuthInvalidCredintials,
									sticky: false
								});
								//e.dsModel.disabled = false;
								that._esignAuthLoginDialog.buttons.Ok.disabled=false;
								return;
							}
							if (jsonSuccessObj.result == "totp_required") {//totp_required

								var _esignAuthimmersiveFrame;
								_esignAuthimmersiveFrame = new WUXImmersiveFrame();
								_esignAuthimmersiveFrame.inject(document.body);

								if (self._immersiveFramework) {
									self._immersiveFramework.destroy();
									self._immersiveFramework = undefined;
								}
								that._esignAuthLoginDialog.close();
								ESignAuthenticationDialog.InitiateEsignAuthDialog(_esignAuthimmersiveFrame, jsonSuccessObj, cookieJsonObj);
							}
							else if (jsonSuccessObj.result == "success") {
								ESignMediator.publish('ESign-Authenticated', { "ESignRecordId": eSigantureId });
								that._esignAuthLoginDialog.close();
							}
						} //else ends


					}
				},
				failure => {
					EsignAuthrnotify.handler().addNotif({
						level: 'error',
						subtitle: NLS.EsignUnexpectederror,
						sticky: false
					});
					
					that._esignAuthLoginDialog.buttons.Ok.disabled=false;
					return;
					//that._esignAuthLoginDialog.disabled = false;
					//that._esignAuthLoginDialog.close();
				}
			)
		}; //  ESignAuthenticationController.reAuthenticateESign  Ends

		return ESignAuthenticationDialog;
	});


define('DS/ENXESignature/Views/Properties/ESignRecPropertiesFacet', [
  'DS/ENXESignature/Views/Facets/ESignPropertiesTabs',
  'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
],
  function ( ESignPropertiesTabs,NLS) {
	'use strict';
	let  facetsContainer;
	const destroyViews = function(){
		//new MeetingPropertiesFacetIDCard(headerContainer).destroyContainer();
		new ESignPropertiesTabs(facetsContainer).destroy();
    };
	var ESignRecPropertiesFacet = function(rightPanel,mode){
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
                	widget.eSignDetailsEvent.publish('esign-info-close-click');
                }
			}
		}).inject(infoHeaderSecAction);		
		facetsContainer.appendChild(infoHeaderSecAction);
	};
	ESignRecPropertiesFacet.prototype.init = function(data,mode){	
		destroyViews(); //to destroy any pre-existing views
		new ESignPropertiesTabs(facetsContainer, data,mode).init();
		this.rightPanel.appendChild(facetsContainer);
    };
    ESignRecPropertiesFacet.prototype.destroy = function(){
    	//destroy
    	this.rightPanel.destroy();
    };
    
    return ESignRecPropertiesFacet;

  });

define('DS/ENXESignature/Views/Tile/ESignRecordTile',
        [
         "UWA/Core",
         "DS/ENXESignature/Components/Wrapper/TileViewWrapper",
         'DS/Tree/TreeDocument'
         ],
         function (UWA,
                 TileViewWrapper,
                 TreeDocument) {

    "use strict";

    let  _container, _model;
    /*
     * to build tile view
     * @params: model (mandatory) otherwise it will create an empty model
     */
    const build = model => {
        if (model) {
            _model = model;
        } else { //create an empty model otherwise TODO see if it's required
            _model = new TreeDocument({
                useAsyncPreExpand: true
            });
        }
        _container = UWA.createElement('div', {id:'ESignDetailsTileViewContainer', 'class':'esigndetails-tile-view-container hideView'});
        const tileViewContainer = TileViewWrapper.build(_model, _container, true); //true passed to enable drag and drop
        return tileViewContainer;
    };

    return {
            build,
            destroy: () => _myResponsiveTilesView.destroy()
    };
});

define('DS/ENXESignature/Views/Info/RecordRightPanelInfoView', [
     'DS/ENXESignature/Views/Properties/ESignRecPropertiesFacet',
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
], function (
    ESignRecPropertiesFacet,
    NLS) {
    'use strict';
    let displayContainer;
    const destroyViews = function () {
        displayContainer.destroy();
    };


    const buildPlaceholder = function () {
        let placeholder = UWA.createElement('div', {
            'class': 'esign-information-no-selection-placeholder',
            html: [UWA.createElement('div', {
                'class': 'no-info-to-show',
                html: [UWA.createElement('div', {
                    'class': 'pin',
                    html: '<span class="fonticon fonticon-5x fonticon-info"></span>'
                }), UWA.createElement('span', {
                    'class': 'no-info-to-show-label',
                    html: NLS.NoInfoPlaceholder
                })]
            })]
        });
        displayContainer.appendChild(placeholder);
    };
    
     const buildPlaceholder1 = function () {
        let placeholder1 = UWA.createElement('div', {
            'class': 'esign-information-no-selection-placeholder',
            html: [UWA.createElement('div', {
                'class': 'no-info-to-show',
                html: [UWA.createElement('div', {
                    'class': 'pin',
                    html: '<span class="fonticon fonticon-5x fonticon-info"></span>'
                }), UWA.createElement('span', {
                    'class': 'no-info-to-show-label',
                    html: NLS.multiRowsInfoPlaceholder
                })]
            })]
        });
        displayContainer.appendChild(placeholder1);
    };

    var RecordRightPanelInfoView = function (container) {
        this.container = container;
        displayContainer = new UWA.Element('div', {
            "id": "esignInfoDisplayContainer",
            styles: { "height": "100%" }
        });
    };
    RecordRightPanelInfoView.prototype.init = function (data, loadFor) {
        //console.log('right panel open called')
        displayContainer.empty();
		if(loadFor == "esignInfo" && data.model != undefined){

			let esignRecPropertiesFacet = new ESignRecPropertiesFacet(displayContainer,loadFor);
			esignRecPropertiesFacet.init(data,"view");
		}else{
			if(data.multiRowSelect && data.model == undefined){
			     buildPlaceholder1();
			 }else{
			 	 buildPlaceholder();
			 }
		}

        this.container.appendChild(displayContainer);
    };
    RecordRightPanelInfoView.prototype.destroy = function () {
        // destroy
        this.container.destroy();
    };

    RecordRightPanelInfoView.prototype.destroyEditPropWidget = function () {

    };


    return RecordRightPanelInfoView;

});


define('DS/ENXESignature/Config/EsignDetailsGridViewConfig',
  [
    'DS/ENXESignature/Utilities/Utils',
    'DS/ENXESignature/Controller/ESignDetailsBootstrap',
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
  ],
  function (Utils, ESignDetailsBootstrap, NLS) {
    'use strict';

    const onESignNodeDateCellRequest = cellInfos => {
      let reusableContent;
      if (!cellInfos.isHeader) {
        reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_modifiedDate_');
        if (reusableContent) {
          const mdate = cellInfos.nodeModel.options.grid.Modified;
          const mdfdate = Utils.formatDateTimeString(new Date(mdate));
          reusableContent.getChildren()[0].setHTML(mdfdate);
          reusableContent.getChildren()[0].setAttribute("class", "esign-modified-date" + mdfdate);
          cellInfos.cellView._setReusableContent(reusableContent);
        }
      }
    };

    const onESignNodeStatusCellRequest = function (cellInfos) {
      let reusableContent;
      if (!cellInfos.isHeader) {
        reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_esignStatus_');
        if (reusableContent) {
          const SignedStatus = cellInfos.nodeModel.options.grid.SignedStatus || '';
          reusableContent.getChildren()[0].setHTML(SignedStatus);
          reusableContent.getChildren()[0].setAttribute("class", "esign-status-tile " + SignedStatus.toUpperCase().replace(/ /g, ''));
          cellInfos.cellView._setReusableContent(reusableContent);
        }
      }
    };

    const onESignNodeActionCellRequest = function (cellInfos) {
      let reusableContent;
      if (!cellInfos.isHeader) {
        reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_actionTaken_');
        if (reusableContent) {
          const ActionType = cellInfos.nodeModel.options.grid.ActionType || '';
          reusableContent.getChildren()[0].setHTML(ActionType);
          reusableContent.getChildren()[0].setAttribute("class", "esign-action-type-tile " + ActionType.toUpperCase().replace(/ /g, ''));
          cellInfos.cellView._setReusableContent(reusableContent);
        }
      }
    };

    const onESignOwnerCellRequest = function (cellInfos) {
      let reusableContent;
      if (!cellInfos.isHeader) {
        reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_owner_');
        if (reusableContent) {
          let cellValue = cellInfos.nodeModel.options.grid.SignedFullName;
				  var userName = cellInfos.nodeModel.options.grid.SignedUserName;
          var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
          var iconDetails = getAvatarDetails(cellValue);
          var swymOwnerIconUrl = ESignDetailsBootstrap.getSwymUrl()+ownerIconURL;
          if(ESignDetailsBootstrap.getSwymUrl() && ESignDetailsBootstrap.getSwymUrl().length > 0){
              reusableContent.getChildren()[0].getChildren()[0].src=swymOwnerIconUrl;
          }else{
              reusableContent.getChildren()[0].getChildren()[0].setHTML(iconDetails.avatarStr);
              reusableContent.getChildren()[0].getChildren()[0].setStyle("background",iconDetails.avatarColor);
          }
          reusableContent.getChildren()[1].setHTML(cellValue);
          cellInfos.cellView._setReusableContent(reusableContent);
        }
      }
    }

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
    }

      const ESignSummaryGridViewConfig = [
        {
          text: NLS.title,
          dataIndex: 'tree',
          editableFlag: false,
          pinned: 'left',
          width: 125
        }, {
          text: NLS.name,
          dataIndex: 'Name',
          editableFlag: false,
          pinned: 'left',
        }, {
          text: NLS.SignedStatus,
          dataIndex: 'SignedStatus',
          editableFlag: false,
          onCellRequest: onESignNodeStatusCellRequest
        }, {
          text: NLS.SignedUserName,
          dataIndex: 'SignedUserName',
          editableFlag: false
        }, {
          text: NLS.SignedFullName,
          dataIndex: 'SignedFullName',
          editableFlag: false,
          onCellRequest: onESignOwnerCellRequest
        }, {
          text: NLS.Modified,
          dataIndex: 'Modified',
          editableFlag: false,
          onCellRequest: onESignNodeDateCellRequest,
          width: 150
        }, {
          text: NLS.SignedTime,
          dataIndex: 'SignedTime',
          editableFlag: false,
          onCellRequest: onESignNodeDateCellRequest,
          width: 150
        }, {
          text: NLS.ActionType,
          dataIndex: 'ActionType',
          editableFlag: false,
          onCellRequest: onESignNodeActionCellRequest
        }, {
          text: NLS.ESignMeaning,
          dataIndex: 'ESignMeaning',
          editableFlag: false,
        }, {
          "text": NLS.Actiontaken,
          "dataIndex": "Actiontaken",
          "editableFlag": false,
          "children": [
            {
              "text": NLS.ObjectRevison,
              "dataIndex": "ActionTakenObjectRevison"
            }, {
              "text": NLS.MaturityChange,
              "dataIndex": "ActionTakenMaturityChange",
              "width": 200
            }
          ]
        }, {
          text: NLS.SignComment,
          dataIndex: 'SignComment',
          editableFlag: false,
        }, {
          text: NLS.SignAppliedAs,
          dataIndex: 'SignAppliedAs',
          editableFlag: false,
        }, {
          text: NLS.Require2FA,
          dataIndex: 'Require2FA',
          editableFlag: false,
        }
      ];

      return ESignSummaryGridViewConfig;

    });

define('DS/ENXESignature/Views/Grid/ESignRecordDataGrid', [
    'DS/ENXESignature/Components/Wrapper/DataGridWrapper',
    'DS/ENXESignature/Config/EsignDetailsGridViewConfig',
    'DS/ENXESignature/Config/ESignDetailsToolbarConfig'
],
    function (DataGridWrapper, EsignDetailsGridViewConfig, ESignDetailsToolbarConfig) {
        'use strict';

        let _toolbar, _dataGridInstance;

        const build = model => {
            let _container = UWA.createElement('div', { id: 'detailsDataGridViewContainer', 'class': 'esigndetails-data-grid-container showView nonVisible' });
            let dataGridViewContainer = DataGridWrapper.build(model, EsignDetailsGridViewConfig, ESignDetailsToolbarConfig.writetoolbarDefinition(), _container);
            _toolbar = DataGridWrapper.dataGridViewToolbar();
            _dataGridInstance = DataGridWrapper.dataGridView();

            return dataGridViewContainer;

        }

        const getGridViewToolbar = () => {
            return _toolbar;
        };
    
        const getDataGridInstance = () => {
            return _dataGridInstance;
        };
    
        return {
            build,
            getGridViewToolbar,
            getDataGridInstance
        };

    });

define("DS/ENXESignature/Config/ESignDetailsToggleViews",
  ['DS/ENXESignature/Views/Grid/ESignRecordDataGrid',
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
  ], function (ESignRecordDataGrid, NLS) {
    "use strict";
    let gridViewClassName, tileViewClassName, viewIcon;
    return {

      /*
       * Method to change view from Grid View to Tile View Layout and vice-versa
       */

      doToggleView: function (args) {
        switch (args.curPage) {
          case "ESignSummary": gridViewClassName = ".esigndetails-data-grid-container";
            tileViewClassName = ".esigndetails-tile-view-container";
            viewIcon = ESignRecordDataGrid.getGridViewToolbar().getNodeModelByID("toggleView");
            break;

          default: Console.log("Incorrect arguments in config file.");
        }

        if (args.view == "GridView") {
          viewIcon.options.grid.data.menu[0].state = "selected";
          viewIcon.options.grid.data.menu[1].state = "unselected";
          if (viewIcon && viewIcon.options.grid.semantics.icon.iconName != "view-list") {
            viewIcon.updateOptions({
              grid: {
                semantics: {
                  icon: {
                    iconName: "view-list"
                  }
                }
              },
              tooltip: NLS.gridView
            });
          }
          let gridView = document.querySelector(gridViewClassName);
          if (gridView) {
            gridView.removeClassName("hideView");
            gridView.removeClassName("nonVisible");
            gridView.addClassName("showView");
          }

          let tileView = document.querySelector(tileViewClassName);
          if (tileView) {
            tileView.removeClassName("showView");
            tileView.addClassName("hideView");
          }
        } else if (args.view == "TileView") {
          viewIcon.options.grid.data.menu[0].state = "unselected";
          viewIcon.options.grid.data.menu[1].state = "selected";
          if (viewIcon && viewIcon.options.grid.semantics.icon.iconName != "view-small-tile") {
            viewIcon.updateOptions({
              grid: {
                semantics: {
                  icon: {
                    iconName: "view-small-tile"
                  }
                }
              },
              tooltip: NLS.tileView
            });
          }
          let gridView = document.querySelector(gridViewClassName);
          if (gridView) {
            gridView.removeClassName("showView");
            gridView.addClassName("hideView");
          }

          let tileView = document.querySelector(tileViewClassName);
          if (tileView) {
            tileView.removeClassName("hideView");
            tileView.addClassName("showView");
          }
        }
      }
    };
  });

define('DS/ENXESignature/Views/Home/ESignRecordsView', [
    'DS/ENXESignature/Views/Grid/ESignRecordDataGrid',
    'DS/ENXESignature/Views/Tile/ESignRecordTile',
    'DS/ENXESignature/Controller/ESignDetailsController',
    'DS/ENXESignature/Model/ESignRecordModel',
    'DS/ENXESignature/Components/Wrapper/TriptychWrapper',
    'DS/ENXESignature/Components/Wrapper/DataGridWrapper',
    'DS/ENXESignature/Components/Wrapper/TileViewWrapper',
    'DS/Core/PointerEvents',
    'DS/ENXESignature/Utilities/PlaceHolder',
    'DS/ENXESignature/Utilities/Utils',
    'DS/ENXESignature/Views/Info/RecordRightPanelInfoView',
    'DS/ENXESignature/Utilities/DataFormatter',
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt'
],
    function (ESignRecordDataGrid, ESignRecordTile, ESignDetailsController, ESignRecordModel, TriptychWrapper, DataGridWrapper, 
    TileViewWrapper, PointerEvents, PlaceHolder, Utils, RecordRightPanelInfoView, DataFormatter, NLS) {
        'use strict';

        let triptychManager;

        let showError = containerDiv => {
            if (!containerDiv) {
                containerDiv = new UWA.Element('div', { "class": "widget-container" });
                containerDiv.inject(widget.body);
            }
        }

        const _fetchESignSuccess = (success, datagridContainer,propertiesContainer) => {
            ESignRecordModel.createModel(success);
            drawESignSummaryView(datagridContainer,propertiesContainer);
            // if (!widget.getValue("esign-userSecurityContext")) {
            //     showError(datagridContainer);
            //     widget.eSignDetailsNotify.handler().addNotif({
            //         title: NLS.errorInFetchTitle,
            //         subtitle: NLS.errorInFetchSubtitle,
            //         message: NLS.errorInFetchMsg,
            //         level: 'warning',
            //         sticky: false
            //     });
            // }
        };

        const drawESignSummaryView = (datagridContainer,propertiesContainer) => {
            const model = ESignRecordModel.getModel();
            const datagridDiv = ESignRecordDataGrid.build(model);
            //To add the Tile view summary list
            const tileViewDiv = ESignRecordTile.build(model);
            registerListners(propertiesContainer);
            //get the toolbar
            let homeToolbar = ESignRecordDataGrid.getGridViewToolbar();
            //homeToolbar.inject(toolBarContainer);
            //Add all the divs into the main container
            if (homeToolbar) {
                const toolBarContainer = UWA.createElement('div', { id: 'EsignDetailsDataGridDivToolbar', 'class': 'toolbar-container' }).inject(datagridContainer);
                homeToolbar.inject(toolBarContainer);
            }
            //  that.containerDiv.appendChild(toolbarDiv); //Required if we are adding the toolbar directly, not on the datagrid view
            datagridDiv.inject(datagridContainer);
            tileViewDiv.inject(datagridContainer);

            if (model.getChildren().length == 0) {
                PlaceHolder.showEmptyESignPlaceholder(datagridContainer, model);
            } else {
                model.prepareUpdate();
                var count = 0;
                model.getChildren().forEach(node => { if (node._isHidden) count++; })
                model.pushUpdate();
                if (count == model.getChildren().length) {
                    // PlaceHolder.showEmptyESignPlaceholder(datagridContainer, model);
                }
            }
            widget.eSignDetailsEvent.publish('esign-widgetTitle-count-update', { model });
            if (model.getRoots().length == 1) {
                setTimeout(() => 
                    widget.eSignDetailsEvent.publish('esignrecord-DataGrid-on-dblclick', { model: model.getRoots()[0].options.grid }),
                    0
                )
            }
            // PlaceHolder.registerListeners();
            return datagridContainer;
        };

        const _fetchESignFailure = function (failure, datagridContainer) {
            const containerDiv = datagridContainer
            showError(containerDiv);
    
            var failureJson = '';
            try {
                failureJson = JSON.parse(failure);
            } catch (err) {
                //DO Nothing
            }
    
            if (failureJson.error) {
                widget.eSignDetailsNotify.handler().addNotif({
                    level: 'error',
                    subtitle: failureJson.error,
                    sticky: false
                });
            } else {
                widget.eSignDetailsNotify.handler().addNotif({
                    level: 'error',
                    subtitle: NLS.infoRefreshError,
                    sticky: false
                });
            }
        };

        let onSelect = function(e, cellInfos){
            //when any row is selected
             Utils.refreshRightPanel("esignInfo", ESignRecordModel);
        };

        let deSelect = function(e, cellInfos){
            //when any row is unselected
            Utils.refreshRightPanel("esignInfo", undefined);
        };

        let onDoubleClick = function (e, cellInfos) {
            //  that.onItemClick(e, cellInfos);
            if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
                if (e.multipleHitCount == 2) {
                    cellInfos.nodeModel.select(true);
                    widget.eSignDetailsEvent.publish('esignrecord-DataGrid-on-dblclick', { model: cellInfos.nodeModel.options.grid });
                    //showHomeButton(true);               
                }
            }
        };

        let registerListners = function (propertiesContainer) {
            let dataGridView = DataGridWrapper.dataGridView()
            //Dispatch events on dataGrid
            dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
            let tileView = TileViewWrapper.tileView();
            //Dispatch events on tile view
            // TODO : GDS5 - To add this and test for tile view - HRL1//
            //Dispatch events when an item is selected in both grid and tile view
            dataGridView.getTreeDocument().getXSO().onAdd(onSelect);
            dataGridView.getTreeDocument().getXSO().onRemove(deSelect);	
            tileView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
            let rightPanelInfoView = new RecordRightPanelInfoView(propertiesContainer);
            widget.eSignDetailsEvent.subscribe('esignrecord-DataGrid-on-dblclick', function (data) {
                Utils.activateInfoIcon(DataGridWrapper);
                widget.setValue("propWidgetOpen", true)
                rightPanelInfoView.init(data,"esignInfo");
                widget.eSignDetailsEvent.publish('triptych-show-panel', 'right');
            })
 			
            widget.eSignDetailsEvent.subscribe('esign-header-info-click', function (data) {
                // if (that._content.clientWidth < that.__mobileBreakpoint) {
                    Utils.activateInfoIcon(DataGridWrapper);
                    //rightPanelInfoView.init(data,"esignInfo");
					rightPanelInfoView.init(data,"esignInfo");
					
                    widget.eSignDetailsEvent.publish('triptych-show-panel', 'right');
                    widget.setValue("propWidgetOpen",true);
                // }
            });


            widget.eSignDetailsEvent.subscribe('esign-info-close-click', function (data) {
               if (triptychManager._isRightOpen) {
                    Utils.inActivateInfoIcon(DataGridWrapper);
                    widget.eSignDetailsEvent.publish('triptych-hide-panel', 'right');
                    widget.setValue("propWidgetOpen", false);
                }
            });
    
        };

        const build = (refID, serviceID, detailsContainer, ESignRecordId) => {

            const apiCall = ESignRecordId ? 'fetchESignDetailById' : 'fetchESignDetails'
            const id = ESignRecordId || refID

            widget.setValue("propWidgetOpen", false)
            const datagridContainer = new UWA.Element('div', { "class": "dataGrid-container", 'styles': { 'height': '100%' }  })
            const propertiesContainer = new UWA.Element('div', { "class": "properties-container", 'styles': { 'height': '100%' }  })


            let _triptychWrapper = new TriptychWrapper()
            _triptychWrapper.init(widget.eSignDetailsEvent.getEventBroker(), detailsContainer, datagridContainer, propertiesContainer)
            triptychManager = _triptychWrapper._getTriptych()
            


            ESignDetailsController[apiCall](id, serviceID).then(
                success => {
                    _fetchESignSuccess(success, datagridContainer,propertiesContainer);
                },
                failure => {
                   _fetchESignFailure(failure, datagridContainer);
                });
        }

        return { build }

    });

define('DS/ENXESignature/ENXESignMgmtDetails', [
    'DS/ENXESignature/Views/Dialogs/ESignDefaultDialog',
    'DS/ENXESignature/Views/Home/ESignRecordsView',
    'DS/Windows/ImmersiveFrame',
    'DS/ENXESignature/Components/ENXESignMgmtNotifications',
    'DS/ENXESignature/Components/ESignAuthenticationMediator',
    'DS/ENXESignature/Controller/ESignDetailsBootstrap',
    // 'DS/ENXESignature/Views/Home/ESignRecordSingleView',
    'i18n!DS/ENXESignature/assets/nls/ENXESignMgmt',
    'css!DS/ENXESignature/ENXESignature.css'

],
    function (ESignDefaultDialog, ESignRecordsView, ImmersiveFrame, ENXESignMgmtNotifications, ESignAuthenticationMediator, ESignDetailsBootstrap,NLS) {//}, ESignRecordSingleView) {
        'use strict';

        const initBootstrap = () => new Promise(async resolve => {
                await ESignDetailsBootstrap.start({ id: widget.id })
                resolve()
            })

        const init = (data = {}, container) => {

        	if(typeof widget == 'undefined') {
				window.widget = {data:{}}
                widget.setValue = (id, value) => widget[id] = value
                widget.getValue = id => widget[id]
			}
            
            widget.eSignDetailsNotify = new ENXESignMgmtNotifications();
            widget.eSignDetailsEvent = new ESignAuthenticationMediator();

            let detailsContainer = "", destroyFrame = "", showCloseButton = true, { refID, serviceID, ESignRecordId, onCloseCallback, x3dPlatformId, userSecurityContext } = data;
            if (!(x3dPlatformId)) {
                //error nsm4
                widget.eSignDetailsNotify.handler().addNotif({
					level: 'error',
					subtitle: NLS.contextError,
					sticky: true
				});
                return
            }
            if(!ESignRecordId && !(refID && serviceID)) {
                //error nsm4
                widget.eSignDetailsNotify.handler().addNotif({
					level: 'error',
					title: NLS.idError,
					sticky: true
				});
                return
            }
            
            if (container instanceof Element || container instanceof HTMLDocument) {
                detailsContainer = container
                showCloseButton = true
            } else if (typeof container == typeof new ImmersiveFrame()) {
                const { dialogDetailsContainer, destroyContainer } = ESignDefaultDialog.getDialog(container)
                detailsContainer = dialogDetailsContainer
                destroyFrame = destroyContainer
                showCloseButton = false
            } else {
                const { dialogDetailsContainer, destroyContainer } = ESignDefaultDialog.getDialog()
                detailsContainer = dialogDetailsContainer
                destroyFrame = destroyContainer
                showCloseButton = false
            }

            widget.setValue("x3dPlatformId", x3dPlatformId);
            // widget.setValue("esign-userSecurityContext", userSecurityContext);

            const datagridContainer = new UWA.Element('div', { id: 'ESignDetailsContainer', 'class': 'esign-details-container' });
            datagridContainer.inject(detailsContainer);
            
            const destroyApp = () => {
                typeof destroyFrame == "function" && destroyFrame();
                typeof onCloseCallback == "function" && onCloseCallback();
            }

            widget.eSignDetailsEvent.subscribe('esign-window-closed', () => {
                destroyApp()
            });

            showCloseButton = showCloseButton && typeof onCloseCallback == "function"
            initBootstrap().then(() => ESignRecordsView.build(refID, serviceID, detailsContainer, ESignRecordId))
                        //use below for editpropwidget
                        //ESignRecordSingleView.build(ESignRecordId, detailsContainer, destroyApp, showCloseButton))
                    
        }

        return {
            init
        };
    });

