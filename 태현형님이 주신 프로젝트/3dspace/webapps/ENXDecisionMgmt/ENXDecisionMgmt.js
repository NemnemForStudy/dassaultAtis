/* global define, widget */
/**
 * @overview Decision Management - ID card utilities
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXDecisionMgmt/Utilities/IdCardUtil',[
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
],function(NLS) {
	'use strict';
	let infoIconActive = function(){
		var infoIcon = document.querySelector('#decisionInfoIcon');
  	  	if(infoIcon.className.indexOf("fonticon-color-display") > -1){
  	  		infoIcon.className = infoIcon.className.replace("fonticon-color-display", "fonticon-color-active");
  	  	}
	};
	
	let infoIconInActive = function(){
		var infoIcon = document.querySelector('#decisionInfoIcon');
  	  	if(infoIcon.className.indexOf("fonticon-color-active") > -1){
  	  		infoIcon.className = infoIcon.className.replace("fonticon-color-active", "fonticon-color-display");
  	  	}   
	};
	
	let hideChannel3 = function(){
		var idCardHideContent = document.querySelector('#channel3Decision');
  	  	if(idCardHideContent){
  	  		idCardHideContent.style.display = "none";
  	  	}
	};
	
	let showChannel3 = function(){
		var idCardHideContent = document.querySelector('#channel3Decision');
		if(idCardHideContent){
  		  	idCardHideContent.style.display = "";
  	  	}
	};
	
	let hideChannel2 = function(){
		var idCardHideContent = document.querySelector('#channel2Decision');
  	  	if(idCardHideContent){
  	  		idCardHideContent.style.display = "none";
  	  	}
	};
	
	let showChannel2 = function(){
		var idCardHideContent = document.querySelector('#channel2Decision');
		if(idCardHideContent){
  		  	idCardHideContent.style.display = "";
  	  	}
	};
	
	let hideChannel1 = function(){
		var idCardHideContent = document.querySelector('#channel1Decision');
  	  	if(idCardHideContent){
  	  		idCardHideContent.style.display = "none";
  	  	}
	};
	
	let showChannel1 = function(){
		var idCardHideContent = document.querySelector('#channel1Decision');
		if(idCardHideContent){
  		  	idCardHideContent.style.display = "";
  	  	}
	};
	
	let infoIconIsActive = function(){
		if(document.querySelector('#decisionInfoIcon').className.indexOf("fonticon-color-active") > -1){
			return true;
		}else{
			return false;
		}
	};
	
	let collapseIcon = function(){
		var decisionHeaderContainer = document.querySelector('#decisionHeaderContainer');
		if(decisionHeaderContainer && decisionHeaderContainer.className.indexOf("minimized") > -1){
			var expandCollapse = document.querySelector('#decisionexpandCollapse');
			if(expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1){
				expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
				expandCollapse.title = NLS.idCardHeaderActionExpand;
			}
		}
	};
	
	let hideThumbnail = function(){
		var thumbnailSection = document.querySelector('#thumbnailSectionDecision');
		thumbnailSection.classList.add("id-card-thumbnail-remove");
		
		var infoSec = document.querySelector('#infoSecDecision');
		var decisionHeaderContainer = document.querySelector('#decisionHeaderContainer');
		if(decisionHeaderContainer && decisionHeaderContainer.className.indexOf("minimized") > -1){
			infoSec.classList.add("id-info-section-align-minimized");
		}else{
			infoSec.classList.add("id-info-section-align");
		}
		
		
	};
	
	let showThumbnail = function(){
		var thumbnailSection = document.querySelector('#thumbnailSectionDecision');
		thumbnailSection.classList.remove("id-card-thumbnail-remove");
		
		var infoSec = document.querySelector('#infoSecDecision');
		var decisionHeaderContainer = document.querySelector('#decisionHeaderContainer');
		if(decisionHeaderContainer && decisionHeaderContainer.className.indexOf("minimized") > -1){
			infoSec.classList.remove("id-info-section-align-minimized");
		}else{
			infoSec.classList.remove("id-info-section-align");
		}
		
	};
	
	let resizeIDCard = function(containerWidth){
		
		// Hide channel3 at 850px
        if (containerWidth < 450) {
        	hideChannel3();
        } else {
        	showChannel3();
        }
		
		// Hide thumbnail at 768px
        if (containerWidth < 468) {
        	hideThumbnail();
        } else {
        	showThumbnail();
        }
        
        // Hide channel2 at 500px
        if (containerWidth < 300) {
        	hideChannel2();
        } else {
        	showChannel2();
        }
        
        // Hide channel1 at 500px
        if (containerWidth < 150) {
        	hideChannel1();
        } else {
        	showChannel1();
        }
        
	};
	
	let IdCardUtilDecision = {
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
	
	return IdCardUtilDecision;
});

/* global define, widget */
/**
 * @overview Meeting Management
 * @licence Copyright 2006-2022 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/Services/DecisionWidgetComServices', [
], 
	function(){
	'use strict';
	let openRelationalExplorer = function(selectedIds){
		var appId =  'ENORIPE_AP';
        launchAppBasedOnAppId(selectedIds, appId);
	};
	
	let launchAppBasedOnAppId = function(selectedIds, appId)
    {
          var itemsData = [];
          var collabSpace = "";
	        if(widget.getPreference("collabspace")){
	        	collabSpace = widget.getPreference("collabspace").value;
	        }else if(widget.data.DecisionCredentials.securityContext){
	        	collabSpace = widget.data.DecisionCredentials.securityContext;
	        }
          selectedIds.forEach(function (selectedID) {
                var item = {
                    'envId': widget.getValue("x3dPlatformId"),
                    'serviceId': '3DSpace',
                    'contextId': collabSpace,
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

          var intercom_socket = 'com.ds.decision.' + widget.id; // This should be same as contentSocketId of DecisionBootstrap.initCompassSocket method //
          require(['DS/ENXDecisionMgmt/Controller/DecisionBootstrap'], function (DecisionBootstrap) {
        	  var compass_socket = DecisionBootstrap.getCompassSocket();
        	  compass_socket.dispatchEvent('onSetX3DContent', compassData, intercom_socket);
        	  var params = {
        			  appId: appId
        	  };
        	  compass_socket.dispatchEvent('onLaunchApp', params, intercom_socket);
          });
    };
	
	let DecisionWidgetComServices={
			openRelationalExplorer: (selectedIds) => {return openRelationalExplorer(selectedIds);}
	};
	
	return DecisionWidgetComServices;
});

/* global define, widget */
/**
  * @overview Decisions - Other Decisions utilities
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXDecisionMgmt/Utilities/Utils',
['i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],
function(NLS) {
    'use strict';
    
    var Utils = {};
    Utils.getDecisionDataUpdated = function (decisionId) {
    	require(['DS/ENXDecisionMgmt/Controller/DecisionController','DS/ENXDecisionMgmt/Utilities/DataFormatter'], function(DecisionController,DataFormatter) {
    	DecisionController.fetchDecisionById(decisionId).then(
				success => {
					// Refresh id card header and summary page //
					var datadecision = DataFormatter.gridData(success[0]);
					
					widget.meetingEvent.publish('decision-data-updated', success[0]);
					widget.meetingEvent.publish('decision-preview-close-click', {model:datadecision});
					widget.meetingEvent.publish('decision-preview-click', {model:datadecision});
					widget.meetingEvent.publish('toolbar-Decisiondata-updated', success[0]);
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

define('DS/ENXDecisionMgmt/View/Facets/DecisionRelations', [
	'UWA/Class/Model',
	'UWA/Core',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
], function(UWAModel,UWA,NLS){
'use strict';
let build	= function(data){
	 if(!showView()){
		 let containerDiv = UWA.createElement('div', {id: 'DecisionRelationsContainer','class':'decision-Relations-container'}); 
		 containerDiv.inject(document.querySelector('.decision-facets-container'));
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
	                let tab = new facetTab({});
	                var viewModel = new UWAModel({
	  		          source : "3DSpace",
	  		          tenant : widget.data.x3dPlatformId,
	  		          objectId: data.id
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
   if(document.getElementById('DecisionRelationsContainer') != null){
       document.getElementById('DecisionRelationsContainer').style.display = 'none';
      
   }
};

let showView= function(){
   if(document.querySelector('#DecisionRelationsContainer') != null){
       document.getElementById('DecisionRelationsContainer').style.display = 'block';
       return true;
   }
   return false;
};

let destroy= function() {
	document.querySelector('#DecisionRelationsContainer').destroy();
	//DecisionAppliesToModel.destroy();
};


	let  DecisionRelations = {
			init : (data) => { return build(data);},
	        hideView: () => {hideView();},
	        destroy: () => {destroy();}
	    
	};
	
	
	return DecisionRelations;
});


define('DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
        ['DS/CollectionView/ResponsiveTilesCollectionView'],
        function(WUXResponsiveTilesCollectionView) {

    'use strict';

    let WrapperTileView, _myResponsiveTilesView, _container;
    /*
     * builds the default container for tile view if container is not passed
     */
    let buildLayout = function(){
        _container=UWA.createElement('div', {id:'TileViewContainer', 'class':'Decision-tileview-container hideView'});

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

define('DS/ENXDecisionMgmt/View/Properties/DecisionAttachments', [
	'DS/EditPropWidget/facets/Common/FacetsBase',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
], function(FacetsBase,NLS){
'use strict';
var DecisionAttachments =  FacetsBase.extend({

    init: function(){
    	this._parent.apply(this, arguments);
		var options = arguments[0],
		that = this;
		
		
    },
    
    updateFacet:function(){
        
    },

    destroyComponent: function(){
    },

    onResize: function(){
    },

    onRefresh: function(){
        this.updateFacet();
    }
});

return DecisionAttachments;
});


define('DS/ENXDecisionMgmt/Config/DecisionFacets',
['DS/Core/Core',
 'UWA/Drivers/Alone',
 'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],
function(core, Alone, NLS) {

    'use strict';

    let DecisionFacets = [
    	{ 
    	label: NLS.DecisionFacetProperties, 
    	id:"DecisionFacetProperties",
    	isSelected:true, 
    	icon: { 
    		iconName: "attributes",
    		fontIconFamily: WUXManagedFontIcons.Font3DS,
    		orientation: "horizontal"
    	},
    	content: Alone.createElement('div', {id:'decisionFacetPropertiesContainer', 'class':'decision-properties-container'}),
        loader : 'DS/ENXDecisionMgmt/View/Dialog/DecisionView' // loader file path to load the content
    },{ 
    	label: NLS.Attachments,
    	id:"DecisionAttachments",
    	icon: { 
    		iconName: "attach", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'decisionAttachmentsContainer', 'class':'decision-Attachments-container'}),
        loader : 'DS/ENXDecisionMgmt/View/Facets/DecisionReferenceDocuments'
    },
    { 
    	label: NLS.AppliesTo,
    	id:"DecisionAppliesTo",
    	icon: { 
    	
    		iconName: "import", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'decisionAppliesToContainer', 'class':'decision-AppliesTo-container'}),
        loader : 'DS/ENXDecisionMgmt/View/Facets/DecisionAppliesTo'
    },
    { 
    	label: NLS.DecisionApplicability,
    	id:"DecisionApplicability",
    	icon: { 
    	
    		iconName: "evolution-effectivity", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'decisionApplicabilityContainer', 'class':'decision-Applicability-container'}),
        loader : 'DS/ENXDecisionMgmt/View/Facets/DecisionApplicability'
    },
    { 
    	label: NLS.Relations,
    	id:"DecisionRelations",
    	icon: { 
    	
    		iconName: "object-related", 
    		fontIconFamily:  WUXManagedFontIcons.Font3DS
    	}, 
    	allowClosableFlag : false,
    	content: Alone.createElement('div', {id:'decisionAppliesToContainer', 'class':'decision-AppliesTo-container'}),
        loader : 'DS/ENXDecisionMgmt/View/Facets/DecisionRelations'
    }
    ];

    return DecisionFacets;

});

/*
 * @module 'DS/ENORouteMgmt/Views/Toolbar/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route members datagrid view
 */

define('DS/ENXDecisionMgmt/Config/Toolbar/DecisionTabToolbarConfig',
  ['i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],
  function ( NLS) {
    let DecisionTabToolbarConfig, 
    _viewData =  {
            menu:[
                {
                  type:'CheckItem',
                  title: NLS.gridView,
                  state: "selected",
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-list"
                  },action: {
                      module: 'DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews',
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"DecisionSummary"
                      }
                    },
                  tooltip:NLS.tileView
                },
                {
                  type:'CheckItem',
                  title: NLS.tileView,
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-view-small-tile"
                  },action: {
                      module: 'DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews',
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"DecisionSummary"
                      }
                    },
                  tooltip:NLS.tileView
                }
              ]              
    };

    let _decisionAddActions = {
    		menu:[
                {
                  type:'CheckItem',
                  title: NLS.newDecision,
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-legal-add"
                  },action: {
                	  module: 'DS/ENXDecisionMgmt/Actions/DecisionActions', 
	                 func: 'createDecisionDialog'
                    },
                  tooltip:NLS.newDecision
                },
                {
                  type:'CheckItem',
                  title: NLS.ExistingDecision,
                  fonticon: {
                    family:1,
                    content:"wux-ui-3ds wux-ui-3ds-legal-insert"
                  },action: {
                	  module: 'DS/ENXDecisionMgmt/Actions/DecisionActions',
 	                 func: 'addExistingDecisionDialog'
                    },
                  tooltip:NLS.ExistingDecision
                }
              ] 
    };

   
    
    let writetoolbarDefination = function () {
      var defination = {
        "entries": [
        	{
 	           "id": "ActionAddView",
 	           "className": "decisionViews",
 	           "dataElements": {
 	               "typeRepresentation": "DecisionSummaryView",
 	               "icon": {
 	                 "iconName": "plus",
 	                 "fontIconFamily": WUXManagedFontIcons.Font3DS
 	               },
 	               
 	             "value":_decisionAddActions
 	           },
 	           "position": "far",
 	           "tooltip": NLS.ActoinMenu,
 	           "category": "action" //same category will be grouped together
 	      },
 	     {
              "id": "removeDecision",
              "dataElements": {
                "typeRepresentation": "functionIcon",
                "icon": {
                    "iconName": "remove",
                    fontIconFamily: WUXManagedFontIcons.Font3DS
                  }
              },
              "position": "far",
              "category": "action",
              "action": {
                  module: 'DS/ENXDecisionMgmt/View/Dialog/RemoveDecision',
                  func: 'removeConfirmation'
                },
              "tooltip": NLS.Remove 
            },
		 {
             "id": "deleteDecision",
             "dataElements": {
               "typeRepresentation": "functionIcon",
               "icon": {
                   "iconName": "trash",
                   fontIconFamily: WUXManagedFontIcons.Font3DS
                 }
             },
             "position": "far",
             "category": "action",
             "action": {
                 module: 'DS/ENXDecisionMgmt/View/Dialog/RemoveDecision',
                 func: 'deleteConfirmation'
               },
             "tooltip": NLS.Delete 
           },
          {
           "id": "view",
           "className": "decisionViews",
           "dataElements": {
               "typeRepresentation": "DecisionSummaryView",
               "icon": {
                 "iconName": "view-list",
                 "fontIconFamily": 1
               },
               
             "value":_viewData
           },
           "position": "far",
           "tooltip": NLS.gridView,
           "category": "action" //same category will be grouped together
         }
        ],

      };
      defination.typeRepresentations = {
				"DecisionSummaryView": {
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
    }
    
    DecisionTabToolbarConfig={
      writetoolbarDefination: () => {return writetoolbarDefination();},
      destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return DecisionTabToolbarConfig;
  });


/*
 * @module 'DS/ENORouteMgmt/Views/Toolbar/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route members datagrid view
 */

define('DS/ENXDecisionMgmt/Config/Toolbar/DecisionRefDocsTabToolbarConfig',
  ['i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],
  function ( NLS) {
    let DecisionRefDocsTabToolbarConfig, 
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
                      module: 'DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"GridView",
                          "curPage":"RefDocsTab"
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
                      module: 'DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews', 
                      func: 'doToggleView',
                      argument: {
                          "view":"TileView",
                          "curPage":"RefDocsTab"
                      }
                    },
                  tooltip:NLS.tileView
                }
              ]              
    };

  
   
    
    let writetoolbarDefination = function (model,data) {
    	
    	let defination = {};
		let entries = [];
		var modifyAccess = true;
		if(data && data.modifyAccess == "FALSE") {
			modifyAccess = false;
		}
		if(modifyAccess){
			entries.push({
		     "id": "addRefDocs",
		      "dataElements": {
		         "typeRepresentation": "functionIcon",
		         "icon": {
		        		"iconName": "plus",
		        		 fontIconFamily: WUXManagedFontIcons.Font3DS
		        		},
		 		"action": {
		     		"module": 'DS/ENXDecisionMgmt/Actions/ReferenceDocumentActions',
		     		"func": "onSearchClick"
		     		}
		        	},
		        	"position": "far",
		        	"category": "create",
		             "tooltip": NLS.addExisting   		
		 
		});
		entries.push({
            "id": "deleteRefDocs",
            "dataElements": {
              "typeRepresentation": "functionIcon",
              "icon": {
                  "iconName": "trash",
                  fontIconFamily: WUXManagedFontIcons.Font3DS
                },
                "action": {
		     		"module": 'DS/ENXDecisionMgmt/View/Dialog/RemoveReferenceDocuments',
		     		"func": "removeConfirmation"
		     		}
            },
            "position": "far",
            "category": "action",
            "tooltip": NLS.RemoveRefDocs 
		});
    	}
		entries.push({
	           "id": "view",
	           "className": "refDocsViews",
	           "dataElements": {
	        	   "typeRepresentation": "DecisionRefDocviewdropdown",
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
		 defination.typeRepresentations = {
					"DecisionRefDocviewdropdown": {
						"stdTemplate": "functionMenuIcon",
						"semantics": {
							label: "action",
							icon: "sorting"
						},
						"position": "far",
						"tooltip":{
							"text": NLS.gridView,
							"position": "far"
						  }
					  }
			};
  	     return JSON.stringify(defination);
     }
    
    DecisionRefDocsTabToolbarConfig={
      writetoolbarDefination: (model,data) => {return writetoolbarDefination(model,data);},
      destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return DecisionRefDocsTabToolbarConfig;
  });

define('DS/ENXDecisionMgmt/Config/DecisionRefDocsGridViewConfig',
        [
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'], 
        function(NLS) {

    'use strict';

  
    
    let DecisionRefDocsGridViewConfig= [

		   /*{
				text: NLS.name,
				dataIndex: 'tree',
			},{
				text: NLS.type,
				dataIndex: 'type'
	
			},{
				text: NLS.revision,
				dataIndex: 'revision' 
			},{
				text: NLS.description,
				dataIndex: 'description'
			} */
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

    return DecisionRefDocsGridViewConfig;

});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/Utilities/VersionFacetIntegration', [
	'DS/ENOXVersionExplorerController/VersionExplorerController',
    'DS/ENOXVersionExplorerUtils/VersionExplorerSettings',
    'DS/ENOXVersionExplorerUtils/VersionExplorerEnums',
    'DS/ENOXVersionExplorerViews/VersionExplorerModal',
    'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
    'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
    function( VersionExplorerController, VersionExplorerSettings, VersionExplorerEnums, VersionExplorerModal, NLS){
	'use strict';
	var VersionIntegration, _versionModel={};
	
	let launchVersionControlApp = function(id, version){
		_versionModel.oldTemplateId = id;
		
    	var versionExplorerDialog = UWA.createElement('div', {
            'class': 'revisionUpdate-dialog'
        }).inject(document.body);

        _versionModel._myVersionExplorer = new VersionExplorerController({
            versionGraphContainer: null,
            selectionMode: VersionExplorerEnums.SELECTION_MODES.SINGLE_SELECT_ONLY,
            widget: widget
        });
        _versionModel._myVersionExplorer.disableDrag();
        _versionModel._myVersionExplorer.showDialog({
            x: 100,
            y: 100
        }, versionExplorerDialog, true);
        
        
        VersionExplorerSettings.loadUserSettingsPromise({
        	displayMode: VersionExplorerEnums.DISPLAY_MODES.SUBWAY_VIEW,
            displayLegend: true
        },
        true);
        
        
        //_versionModel._myVersionExplorer.subscribeEvent('ENOXVersionExplorerModalOK', onVersionExplorerModalOK.bind(this));
        _versionModel._myVersionExplorer.subscribeEvent('ENOXVersionExplorerModalCancel', onVersionExplorerModalCancel.bind(this));
        
        _versionModel._dlgVersionExplorer = VersionExplorerModal._dlg;

        if (VersionExplorerModal._dlg && VersionExplorerModal._dlg.rightButtons) {
            VersionExplorerModal._dlg.rightButtons.addEventListener('click', onVersionExplorerModalCancel.bind(this));
        }
        
        var collabSpace;
        if(widget.getPreference("collabspace")){
        	collabSpace = widget.getPreference("collabspace");
        }else if(widget.data.DecisionCredentials.securityContext){
        	collabSpace = widget.data.DecisionCredentials.securityContext;
        }
        _versionModel._myVersionExplorer.publishEvent('ENOXVersionExplorerLoadVersionModel', {
            id: _versionModel.oldTemplateId, // Input Physical Id
            tenantId: widget.data.x3dPlatformId,
            securityContext: encodeURIComponent(collabSpace),
            onComplete: function () { },
            dataModelType: VersionExplorerEnums.DATA_MODEL_TYPES.MODEL_HISTORY
        });
        
        //handler for select and unselect
        /*_versionModel._myVersionExplorer.subscribeEvent("select", function (msg) {
            if (_versionModel._dlgVersionExplorer.isVisible)
            	_versionModel._dlgVersionExplorer.getFooter().getChildren()[0].disabled = false;
        });

        _versionModel._myVersionExplorer.subscribeEvent("unselect", function (msg) {
            if (_versionModel._dlgVersionExplorer.isVisible)
            	_versionModel._dlgVersionExplorer.getFooter().getChildren()[0].disabled = true;
        });*/
        
        //to hide the OK button
        _versionModel._dlgVersionExplorer.getFooter().getChildren()[0].hide();
    };
    
    /*let onVersionExplorerModalOK = function(){
		console.log("Ok Pressed");		
        _versionModel._myVersionExplorer.unsubscribeAll();
        
    };*/
    
    let onVersionExplorerModalCancel = function(jsonObj,container){
    	console.log("Cancel Pressed");
    	_versionModel._myVersionExplorer.unsubscribeAll();
    };    
	
	
	VersionIntegration = {			
			launchVersionControlApp: (id, version) => {return launchVersionControlApp(id, version);},
	};
	return VersionIntegration;
	
});


/*
 * @module 'DS/ENORouteMgmt/Views/Toolbar/RouteDataGridViewToolbar'
 * this toolbar is used to create a toolbar of the route members datagrid view
 */

define('DS/ENXDecisionMgmt/Config/Toolbar/DecisionAppliesToTabToolbarConfig',
  ['i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],
  function ( NLS) {
    let DecisionAppliesToTabToolbarConfig, 
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
                        module: 'DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews', 
                        func: 'doToggleView',
                        argument: {
                            "view":"GridView",
                            "curPage":"AppliesToTab"
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
                        module: 'DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews', 
                        func: 'doToggleView',
                        argument: {
                            "view":"TileView",
                            "curPage":"AppliesToTab"
                        }
                      },
                    tooltip:NLS.tileView
                  }
                ]              
    };

  
   
    
    let writetoolbarDefination = function (model,data) {
    	
    	
    	let defination = {};
		let entries = [];
		var modifyAccess = true;
		if(data && data.modifyAccess == "FALSE") {
			modifyAccess = false;
		}
		if(modifyAccess){
			entries.push({
			     "id": "addAppliesTo",
			      "dataElements": {
			         "typeRepresentation": "functionIcon",
			         "icon": {
			        		"iconName": "plus",
			        		 fontIconFamily: WUXManagedFontIcons.Font3DS
			        		},
			        		"action": {
				        		"module": "DS/ENXDecisionMgmt/Actions/DecisionAppliesToActions",
				        		"func": "onSearchClick"
				        		}
			        	},
			        	"position": "far",
			        	"category": "addexisting",
			             "tooltip": NLS.addExisting   		
			 });
			entries.push({
	             "id": "deleteAppliesTo",
	             "dataElements": {
	               "typeRepresentation": "functionIcon",
	               "icon": {
	                   "iconName": "trash",
	                   fontIconFamily: WUXManagedFontIcons.Font3DS
	                 },
		        		"action": {
			        		"module": "DS/ENXDecisionMgmt/View/Dialog/RemoveAppliesToItems",
			        		"func": "removeConfirmation"
			        		}
	             },
	             "position": "far",
	             "category": "action",
	             "tooltip": NLS.RemoveAppliesTo 
	           
			});
		}
			entries.push({
		           "id": "view",
		           "className": "appliesToViews",
		           "dataElements": {
		        	   "typeRepresentation": "AppliesToviewdropdown",
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
			 defination.typeRepresentations = {
						"AppliesToviewdropdown": {
							"stdTemplate": "functionMenuIcon",
							"semantics": {
								label: "action",
								icon: "sorting"
							},
							"position": "far",
							"tooltip":{
								"text": NLS.gridView,
								"position": "far"
							  }
						  }
				};
		return JSON.stringify(defination);
    }
    
    DecisionAppliesToTabToolbarConfig={
      writetoolbarDefination: (model,data) => {return writetoolbarDefination(model,data);},
      destroy: function() {_dataGrid.destroy();_container.destroy();}
    };

    return DecisionAppliesToTabToolbarConfig;
  });

define('DS/ENXDecisionMgmt/Utilities/DragAndDrop',
    ['UWA/Core', 'DS/DataDragAndDrop/DataDragAndDrop'],
function (UWA, DataDragAndDrop) {
    'use strict';
     let dropZone = {
	      makeDroppable : function(droppableElement, callback) {	    	  
	    	  let that = this;
	    	  if (droppableElement!==null){	    		  
	    		  that.dropInvite = droppableElement.getElement('#droppable');//droppableElement;//droppableElement.getElement('#droppable');
	              if (!that.dropInvite){
	                that.dropInvite = new UWA.createElement('div', {
	                  id: 'droppable',
	                  'class': 'hidden'
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
					if(el && el.querySelector("."+targetClass) != null){
						var decisionRefDocsAppliesToContainer;
						if(el.id == "decisionRefDocsContainer")
							decisionRefDocsAppliesToContainer = el.querySelector('#dataGridRefDocsDivToolbar');
						else if(el.id == "decisionAppliesToContainer")
							decisionRefDocsAppliesToContainer = el.querySelector('#dataGridAppliesToDivToolbar');
						else if(el.id == "DecisionContainer")
							decisionRefDocsAppliesToContainer = el.querySelector('#dataGridDecisionDivToolbar');
														
						if(decisionRefDocsAppliesToContainer && decisionRefDocsAppliesToContainer.querySelector("."+targetClass) != null){
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
						that.dropInvite.callback(items);
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

/**
 * decisionEvent Component - handling interaction between components for smooth async events
 *
 */
define('DS/ENXDecisionMgmt/Components/DecisionEvent',
['DS/Core/ModelEvents'],
function(ModelEvents) {

    'use strict';
    var _eventBroker = null;
    var decisionEvent = function () {
        // Private variables
        _eventBroker= new ModelEvents();
    };

    /**
     * publish a topic on given channels in param, additional data may go along with the topic published
     * @param  {[type]} eventTopic [description]
     * @param  {[type]} data       [description]
     *
     */
    decisionEvent.prototype.publish = function (eventTopic, data) {
          _eventBroker.publish({ event: eventTopic, data: data }); // publish from ModelEvent
    };

    /**
    *
    * Subscribe to a topic
    * @param {string} eventTopic the topic to subcribe to
    * @param {function} listener the function to be called when the event fires
    * @return {ModelEventsToken}             a token to use when you want to unsubscribe
    */
    decisionEvent.prototype.subscribe = function (eventTopic, listener) {
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
    decisionEvent.prototype.subscribeOnce = function(eventTopic, listener) {
    	return _eventBroker.subscribeOnce({ event: eventTopic }, listener);
    };

    /**
     * Unsubscribe to a topic
     * @param  {[type]} token [description]
     *
     */
    decisionEvent.prototype.unsubscribe = function (token) {
        _eventBroker.unsubscribe(token);
    };

    decisionEvent.prototype.getEventBroker = function(){
      return _eventBroker;
    };

    decisionEvent.prototype.destroy = function(){
      _eventBroker.destroy();
    };



   return decisionEvent;

});

/**
 * 
 */
define('DS/ENXDecisionMgmt/View/Menu/DecisionOpenWithMenu',
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

	let DecisionOpenWithMenu = {
			getOpenWithMenu: (data) => {return getOpenWithMenu(data);}
	};

	return DecisionOpenWithMenu;

});




/* global define, widget */
/**
 * @overview Route Management - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXDecisionMgmt/Utilities/SearchUtil',
		[
			'UWA/Class',
			'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
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
		if(widget.getValue("x3dPlatformId") != undefined){
			//widget.getPreference("collab-storage").value="OnPremise";
			refinementToSnNJSON.tenant = widget.getValue("x3dPlatformId");
			//refinementToSnNJSON.tenant = "OnPremise";
		}
		refinementToSnNJSON.global_actions = [{"id":"incontextHelp","title":NLS['search.help'],"icon":"fonticon fonticon-help","overflow":false}];
		return refinementToSnNJSON;
	};
	
	let getPrecondForDecisionContextSearch = function(type){
		return "flattenedtaxonomies:\"types/Decision\" AND current:\"Active\" "
	};	
	let getPrecondForRefDocsSearch = function(type){
		return "flattenedtaxonomies:(\"types\/DOCUMENTS\") AND is_95_version_95_object:\"False\"";
	};
	
	let getPrecondForOwnerSearch = function(){
		// Person
		let refinement = {};
		refinement.precond = "(flattenedtaxonomies:\"types/Person\") AND current:\"active\"";
		
		return refinement;
	};
	let SearchUtil = {
			getRefinementToSnN: (socket_id, title, multiSelect,recentTypes) => {return getRefinementToSnN(socket_id, title, multiSelect,recentTypes);},
			getPrecondForDecisionContextSearch: () => {return getPrecondForDecisionContextSearch();},
			getPrecondForRefDocsSearch: (type) => {return getPrecondForRefDocsSearch(type);},
			getPrecondForOwnerSearch:()=>{return getPrecondForOwnerSearch();}
			
	};
	return SearchUtil;
});

/**
 * Notification Component - initializing the notification component
 *
 */
define('DS/ENXDecisionMgmt/Components/DecisionNotify',[
	'DS/Notifications/NotificationsManagerUXMessages',
	'DS/Notifications/NotificationsManagerViewOnScreen',
	],
function(NotificationsManagerUXMessages,NotificationsManagerViewOnScreen) {

    'use strict';
    let _notif_manager = null;
    let DecisionNotify = function () {
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
    
    DecisionNotify.prototype.handler = function () {
    	if(document.getElementById("initiateDecision")){ //This id is of create dialog panel of the Decision widget. 
    		//This means create dialog window is opened and show the notification on the window
    		NotificationsManagerViewOnScreen.inject(document.getElementById("initiateDecision"));
    		document.getElementById('initiateDecision').scrollIntoView();
    	} else if(document.getElementById("assigneeWarning")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("assigneeWarning"));
    	} else if(document.getElementById("selectUsers")){
    		NotificationsManagerViewOnScreen.inject(document.getElementById("selectUsers"));
    	}else{
    		if(document.getElementsByClassName('wux-notification-screen').length > 0){
        		//Do nothing as the notifications will be shown here.
        	}else{
        		NotificationsManagerViewOnScreen.inject(document.body);
        	}
    	}
    	
    	return _notif_manager;
    };
    
    DecisionNotify.prototype.notifview = function(){
    	return NotificationsManagerViewOnScreen;
    }; 
    
    return DecisionNotify;

});



/* global define, widget */
/**
  * @overview Meeting - ENOVIA Bootstrap file to interact with the platform
  * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
 define('DS/ENXDecisionMgmt/Controller/DecisionBootstrap', 
[
    'UWA/Core',
    'UWA/Class/Collection',
    'UWA/Class/Listener',
    'UWA/Utils',
    'DS/ENXDecisionMgmt/Utilities/Utils',
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
            let DecisionBootstrap;
            var _started = false, _frameENOVIA = false, _compassSocket, _storages, _csrf, _storage, _onStorageChange, _urlsSwym, _prefSwym, _pref3DSpace, _prefSearch, _urlsSearch;

            function initCompassSocket(options) {
                if (_compassSocket) {
                    return _compassSocket;
                }

                // var contentSocketId = 'com.ds.contentSkeleton',
                // compassServerId =
                // 'com.ds.compass';
                var contentSocketId = 'com.ds.decision.' + options.id, compassServerId = 'com.ds.compass';

                _compassSocket = new UWAUtils.InterCom.Socket(contentSocketId);
                _compassSocket.subscribeServer(compassServerId, window.parent);

                return _compassSocket;
            }
            
            function decisionAuthRequest (url, options) {
            	var onComplete;
            	if (!options) {
                    options = {};
                }
                if (!options.headers) {
                    options.headers = {};
                }
            	options.headers['X-DS-CSRFTOKEN'] = _csrf || '';
            	var tenantId = widget.getValue("x3dPlatformId");
            	url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'tenant=' + tenantId;
                if(!url.includes("/bps/cspaces")){
                    if(widget.getPreference("collabspace")){
                    	url = url + '&SecurityContext=' + encodeURIComponent(widget.getPreference("collabspace").value);
                    }else if(widget.data.DecisionCredentials.securityContext){
                    	url = url + '&SecurityContext=' + encodeURIComponent(widget.data.DecisionCredentials.securityContext);
                    }
                }
                if (widget.debugMode) {
                	url = url + '&$debug=true'
                }
                if(Utils.getCookie("swymlang")){
                	url = url + '&$language='+ Utils.getCookie("swymlang");
                }
                
                onComplete = options.onComplete;
                
                options.onComplete = function(resp, headers, options) {
                    _csrf = headers['X-DS-CSRFTOKEN'];
                    if (UWACore.is(onComplete, 'function')) {
                        onComplete(resp, headers, options);
                    }
                };
                
                WAFData.authenticatedRequest(url, options);
            	
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
			
			function initSearchServices() {
				if (_urlsSearch) {
                    return _urlsSearch;
                }
                //taken from MeetingMgmt's EnoviaBootstrap.js
                CompassServices.getServiceUrl({
                    serviceName: '3DSearch',
                    onComplete: function (data) {
                    	_urlsSearch = data;
                        var id;
                        if (_storage) {
                            id = _storage.id;
                        }                        
                        else {
                        	id = widget.getValue("x3dPlatformId");
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
			};

			//DecisionBootstrap = UWACore.merge(UWAListener, {
			DecisionBootstrap = {
                init : function(options) {

                    if (_started) {
                        return;
                    }

                    if (options.frameENOVIA) {
                        _frameENOVIA = true;
                    }

                    options = (options ? UWACore.clone(options, false) : {});

                    _storages = options.collection;

                    initCompassSocket(options);
                    if(!options.overridewrf){
                    	//initEnoviaRequest();
                    }
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
                    _pref3DSpace=storage._attributes.url;
                    if (id && _urlsSwym) {
                        for (var i = 0; i < _urlsSwym.length; i++) {
                            if (id === _urlsSwym[i].platformId) {
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
				set3DSpaceURL : function(pref3DSpaceURL) {
					if (_started) {
                        _pref3DSpace = pref3DSpaceURL;
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
                setSwymUrl : function(prefSwymURL) {
                    if (_prefSwym) {
                        _prefSwym = prefSwymURL;
                    }
                },
                setCollabSpaceTenant: function(securityContext,tenant) {
                    if (widget.data.DecisionCredentials) {
                    	widget.data.DecisionCredentials.securityContext = securityContext;
                    	widget.data.DecisionCredentials.tenant = tenant;
                    	widget.data.x3dPlatformId = tenant;
                    }
                },
                decisionAuthReq: function(url,options){
                	decisionAuthRequest(url,options);
                },
                
                getSearchUrl : function() {
                    if (_prefSearch) {
                        return _prefSearch;
                    }
                }
            };

            return DecisionBootstrap;
        });

 


define('DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
        ['DS/DataGridView/DataGridView',
         'DS/ENXDecisionMgmt/Controller/DecisionBootstrap',
         'DS/CollectionView/CollectionViewStatusBar',
         'DS/DataGridView/DataGridViewLayout',
         'UWA/Drivers/Alone',
         ],
        function(DataGridView,DecisionBootstrap, CollectionViewStatusBar,DataGridViewLayout, Alone) {

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

            let initDataGridView = function (treeDocument, colConfig, toolBar,dummydiv, options){
              //buildLayout();
              _dataGrid = new DataGridView({
                  treeDocument: treeDocument,
                  columns: colConfig,
                 // layout: new DataGridViewLayout(layoutOptions),
                  defaultColumnDef: {//Set default settings for columns
                    widthd:'auto',
                    typeRepresentation: 'string'
                  },
                  showModelChangesFlag: false
              });
              /*if(massupdate) {
            	  _dataGrid.showModelChangesFlag = true;  
              }*/
				/*_dataGrid.cellDragEnabledFlag = true;
				_dataGrid = {..._dataGrid, ...massupdate};
				_dataGrid.push(massupdate);
				if (options)
					Object.keys(options).forEach(function(optionKey) {
						_dataGrid[optionKey] = options[optionKey];
					});
					//use the arrow function (equivalent to Lambda expression) instead
				*/
				if(options)
					Object.keys(options).forEach(optionKey => _dataGrid[optionKey] = options[optionKey]);
				
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
              	          "class":"decision-state-title "
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
              	          "class":"decision-state-title"
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
              	          "class":"decision-state-title "
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
                        if(DecisionBootstrap.getSwymUrl()!=undefined){
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
                        if(DecisionBootstrap.getSwymUrl()!=undefined){
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
					if(children[i].options.grid.id == id){
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
 * @overview Decision - Data formatter
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 * @access private
 */
define('DS/ENXDecisionMgmt/Utilities/DataFormatter',
		['DS/ENXDecisionMgmt/Utilities/Utils',
		 'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],function(Utils, NLS) {
	'use strict';
	let DataFormatter;
	
	let decisionGridData = function(dataElem){
		var response =
		{
        	id: dataElem.physicalid,
        	title: dataElem.title,
        	name:dataElem.name,
            creationDate: dataElem.originated,
            modifiedDate: dataElem.modified, 
            Maturity_State: dataElem.stateNLS,
            state:dataElem.state,
            deleteAccess: dataElem.deleteAccess,
            description: dataElem.description,
            owner : dataElem.owner,
            ownerFullName : dataElem.ownerFullName,
            revision : dataElem.revision,
            modifyAccess: dataElem.modifyAccess,
			type: dataElem.typeNLS
    	};
		return response;
	};
	

	
	let appliesToData = function(dataElem){
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
            revision: dataElem.dataelements.revision,
            typeNLS : dataElem.dataelements.typeNLS,
            stateNLS : dataElem.dataelements.stateNLS,
            typeicon :dataElem.dataelements.typeicon            
    	};
		return response;
	};
	
	let attachmentGridData= function(dataElem){
		var response =
		{
			id: dataElem.id,
	    	type: dataElem.type,
	    	typeNLS: dataElem.dataelements.typeNLS,
	    	title: dataElem.dataelements.title,		                    
	        image : dataElem.dataelements.image,
	        description: dataElem.dataelements.description,
	        modified : dataElem.dataelements.modified,
	        name : dataElem.dataelements.name,
	        state: dataElem.dataelements.state,
	        stateNLS: dataElem.dataelements.stateNLS,
	        revision: dataElem.dataelements.revision,
	        typeicon :dataElem.dataelements.typeicon 	
		};
		return response;
	};
	
	let gridData = function(dataElem){
		var canDelete = "FALSE";
		if(dataElem.state == "Create" || dataElem.state == "Draft"){
			canDelete = "TRUE";
		}
		var response =
		{
			id: dataElem.physicalid,	
            relId: dataElem.relId,
            Type: "Decision",
            Maturity_State: dataElem.stateNLS,
            owner : dataElem.owner,
            ownerFullName : dataElem.ownerFullName,
            description: dataElem.description,
            name: dataElem.name,
            deleteAccess: dataElem.deleteAccess,
            revision: dataElem.revision,
            creationDate: dataElem.originated,
            modifiedDate: dataElem.modified,
            title:dataElem.title,
            state:dataElem.state,
            modifyAccess: dataElem.modifyAccess
    	};
		return response;
	};
	
	
    DataFormatter={
           gridData: (dataElem) => {return gridData(dataElem);},
           decisionGridData: (dataElem) => {return decisionGridData(dataElem);},
           appliesToData: (dataElem) => {return appliesToData(dataElem);},
           attachmentGridData: (dataElem) => {return attachmentGridData(dataElem);}
    		
    };
    
    return DataFormatter;
});


define('DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
		[	'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/ENXDecisionMgmt/Utilities/DataFormatter',
			'DS/ENXDecisionMgmt/Utilities/Utils',
			'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
			'DS/WebappsUtils/WebappsUtils'
			],
			function(			   
					TreeDocument,
					TreeNodeModel,
					DataFormatter,
					Utils,
					WrapperDataGridView,
					WebappsUtils
			) {
	'use strict';
	let model = new TreeDocument();
	let prepareTreeDocumentModel = function(response){      
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
	            grid: DataFormatter.appliesToData(dataElem),
	            "thumbnail" : dataElem.dataelements.image,
                "subLabel": dataElem.dataelements.stateNLS,
	            icons:[dataElem.dataelements.typeicon],
                description : Utils.formatDateTimeString(new Date(dataElem.dataelements.modified)),
                contextualMenu : ["My context menu"]
	        });
	        
	        model.addRoot(root); 
		});
		model.pushUpdate();
		return model;
    };
    
    
    let appendRows = function(response){
		model.prepareUpdate();	
		response.forEach((dataElem) => {
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
	            grid: DataFormatter.appliesToData(dataElem),
	            "thumbnail" : dataElem.dataelements.image,
                "subLabel": dataElem.dataelements.stateNLS,
	            icons:[dataElem.dataelements.typeicon],
                description :Utils.formatDateTimeString(new Date(dataElem.dataelements.modified)),
                contextualMenu : ["My context menu"]
	        });
      																		
			model.addRoot(root);
		});
		
		model.pushUpdate();
		if(model.getChildren().length!=0){
		    widget.meetingEvent.publish('hide-no-appliesTo-placeholder');
		   
        }
	};
	
    let getModel=function(){
    	return model;
    };
    let destroy = function(){
		model = new TreeDocument();
	};
	let getAppliesToIDs = function(){
		if( model!= undefined){
			var children = model.getChildren();
			var id=[];
			for(var i=0;i<children.length;i++){
				id.push(children[i].options.grid.id);
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
		    widget.meetingEvent.publish('show-no-appliesTo-placeholder');
        }
	};
    let DecisionAppliesToModel = {
    		createModel : (response) => {return prepareTreeDocumentModel(response);},
    		getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
    		getModel : ()=> {return getModel();},
    		getAppliesToIDs : ()=> {return getAppliesToIDs();},
    		appendRows : (data) => {return appendRows(data);},
    		destroy : () => {return destroy();},
    		deleteSelectedRows : () => {return deleteSelectedRows();}
    		
    }
    return DecisionAppliesToModel;

});


define('DS/ENXDecisionMgmt/Model/DecisionModel',
		[	'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/ENXDecisionMgmt/Controller/DecisionBootstrap',
			'DS/ENXDecisionMgmt/Utilities/DataFormatter',
			'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
			'DS/WebappsUtils/WebappsUtils',
			'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
			'DS/ENXDecisionMgmt/Utilities/Utils'
			],
			function(			   
					TreeDocument,
					TreeNodeModel,
					DecisionBootstrap,
					DataFormatter,
					WrapperDataGridView,
					WebappsUtils,
					NLS,
					Utils
			) {
	'use strict';
	
	let model = new TreeDocument();
	let prepareTreeDocumentModel = function(response){      
		model.prepareUpdate();  
		response.forEach(function(data) {
			   var ownerDiv = new UWA.Element("div", {
		            class:'members'
		        });
		        var tooltip = "";
		        var decisionOwner = data.owner;
		        if(typeof decisionOwner != 'undefined'){
		                	var ownerdecisiondiv = new UWA.Element("div", {
		                        class:'assignee'
		                    });
		                	let userIcon = "";
			                	let ownerIconUrl;
			                	ownerIconUrl= "/api/user/getpicture/login/"+decisionOwner+"/format/normal";
			                	let swymOwnerIconUrl = DecisionBootstrap.getSwymUrl()+ownerIconUrl;
			                    tooltip = tooltip + data.ownerFullName+ ",\n";
			                    if(DecisionBootstrap.getSwymUrl()!=undefined){
			                    	userIcon = UWA.createElement('img', {
			                              class: "userIcon",
			                              src: swymOwnerIconUrl
			                          });
			                    } else {
				                    var iconDetails = getAvatarDetails(data.ownerFullName);
				                    userIcon = UWA.createElement('div', {
				                        html: iconDetails.avatarStr,
				                        class: "avatarIcon"
				                    });
				                    userIcon.style.setProperty("background",iconDetails.avatarColor);
			                    }
		                	if(userIcon!=""){
		                		userIcon.inject(ownerdecisiondiv);
		                	}
		                	ownerdecisiondiv.inject(ownerDiv);
		        }
		        tooltip = tooltip.slice(0, -2);
		        ownerDiv.set({
		             title: tooltip
		        });
		        data.ownerDiv = ownerDiv.outerHTML;
		   
			var fullname = data.title;
			var typeIcon = WebappsUtils.getWebappsAssetUrl("ENXDecisionMgmt","icons/iconLargeDecision.png");
			var root = new TreeNodeModel({
			  label: fullname,
              width: 300,
			  grid:DataFormatter.decisionGridData(data),
			 /*"thumbnail" : thumbnailIcon,*/
			  "thumbnail" : typeIcon,
			  description : onDecisionNodeCellRequest(data,ownerDiv,tooltip),
			  contextualMenu : ["My context menu"],
              icons:[typeIcon]
		    });
		    model.addRoot(root); 
		});
		model.pushUpdate();
		return model;
    };
   
 
	let updateRows = function(resp){
		model.prepareUpdate();	
		if(resp.physicalid && resp.physicalid != ""){
			var rowModelToUpdate = getRowModelById(resp.physicalid);
			
			 var ownerDiv = new UWA.Element("div", {
		            class:'members'
		        });
		        var tooltip = "";
		        var decisionOwner = resp.owner;
		        if(typeof decisionOwner != 'undefined'){
		                	var ownerdecisiondiv = new UWA.Element("div", {
		                        class:'assignee'
		                    });
		                	let userIcon = "";
			                	let ownerIconUrl;
			                	ownerIconUrl= "/api/user/getpicture/login/"+decisionOwner+"/format/normal";
			                	let swymOwnerIconUrl = DecisionBootstrap.getSwymUrl()+ownerIconUrl;
			                    tooltip = tooltip + resp.ownerFullName+ ",\n";
			                    if(DecisionBootstrap.getSwymUrl()!=undefined){
			                    	userIcon = UWA.createElement('img', {
			                              class: "userIcon",
			                              src: swymOwnerIconUrl
			                          });
			                    } else {
				                    var iconDetails = getAvatarDetails(resp.ownerFullName);
				                    userIcon = UWA.createElement('div', {
				                        html: iconDetails.avatarStr,
				                        class: "avatarIcon"
				                    });
				                    userIcon.style.setProperty("background",iconDetails.avatarColor);
			                    }
		                	if(userIcon!=""){
		                		userIcon.inject(ownerdecisiondiv);
		                	}
		                	ownerdecisiondiv.inject(ownerDiv);
		        }
		        tooltip = tooltip.slice(0, -2);
		        ownerDiv.set({
		             title: tooltip
		        });
		        resp.ownerDiv = ownerDiv.outerHTML;
		   
			// Update the grid content //
			rowModelToUpdate.updateOptions({grid:DataFormatter.gridData(resp)});
			// Update the tile content //
			rowModelToUpdate.updateOptions(
					{
						label:resp.title,
						description : onDecisionNodeCellRequest(resp,ownerDiv,tooltip)
					});
		}
		
		model.pushUpdate();

	};
	
	let getRowModelById = function(id){
		return WrapperDataGridView.getRowModelById(model,id);
	};
	

	
    let appendRowsforCreate = function(response, autoDecision){
    	model.prepareUpdate();	
    	var typeIcon = WebappsUtils.getWebappsAssetUrl("ENXDecisionMgmt","icons/iconLargeDecision.png");
    	if(response.data){    		
    		var data = response.data;
    		//var finalresponse = prepareCreateModel(data);
    		//data = finalresponse;
    		data.forEach(function(dataElem) {	
    			
    			
    			var ownerDiv = new UWA.Element("div", {
		            class:'members'
		        });
		        var tooltip = "";
		        var decisionOwner = dataElem.dataelements.owner;
		        if(typeof decisionOwner != 'undefined'){
		                	var ownerdecisiondiv = new UWA.Element("div", {
		                        class:'assignee'
		                    });
		                	let userIcon = "";
			                	let ownerIconUrl;
			                	ownerIconUrl= "/api/user/getpicture/login/"+decisionOwner+"/format/normal";
			                	let swymOwnerIconUrl = DecisionBootstrap.getSwymUrl()+ownerIconUrl;
			                    tooltip = tooltip + dataElem.dataelements.ownerFullName+ ",\n";
			                    if(DecisionBootstrap.getSwymUrl()!=undefined){
			                    	userIcon = UWA.createElement('img', {
			                              class: "userIcon",
			                              src: swymOwnerIconUrl
			                          });
			                    } else {
				                    var iconDetails = getAvatarDetails(dataElem.dataelements.ownerFullName);
				                    userIcon = UWA.createElement('div', {
				                        html: iconDetails.avatarStr,
				                        class: "avatarIcon"
				                    });
				                    userIcon.style.setProperty("background",iconDetails.avatarColor);
			                    }
		                	if(userIcon!=""){
		                		userIcon.inject(ownerdecisiondiv);
		                	}
		                	ownerdecisiondiv.inject(ownerDiv);
		        }
		        tooltip = tooltip.slice(0, -2);
		        ownerDiv.set({
		             title: tooltip
		        });
		        dataElem.dataelements.ownerDiv = ownerDiv.outerHTML;
		   
    			//DecisionModel.appendRows(dataElem.data);
    			dataElem.dataelements.physicalid = dataElem.id;
    			dataElem.dataelements.id = dataElem.id
     	        var root = new TreeNodeModel({
     	            id: dataElem.dataelements.objectId,
     	            label:  dataElem.dataelements.title,
     	            width: 300,
     	           "thumbnail" : typeIcon,
     	           description : onDecisionNodeCellRequest(dataElem.dataelements,ownerDiv,tooltip),
     	           icons:[typeIcon],
     	            grid: DataFormatter.decisionGridData(dataElem.dataelements),
     	           contextualMenu : ["My context menu"]

     	        });
     	        
     	        model.addRoot(root); 

			   if(!autoDecision)
     	       	  widget.meetingEvent.publish('decision-preview-click',{model:root.options.grid});
     	    }); 
     	    model.pushUpdate();
     	   if(model.getChildren().length!=0){
   		    widget.meetingEvent.publish('hide-no-decision-placeholder');
   		   
           }
     	  // if(model.getChildren().length!=0){
   		    if(!autoDecision)
			widget.meetingEvent.publish("decision-create-close-click");
   		    
          // }
    	}
    	 
    };
	let onDecisionNodeCellRequest = function (data,ownerDiv,tooltip) {
	    var commandsDiv="";
	    var cellValue = data.stateNLS;
	    var strdate = Utils.formatDateTimeString(new Date(data.originated));
	    commandsDiv = UWA.createElement('div', {
            class: "decision-state-and-owner"
        });
        
        UWA.createElement('div',{
	        "html": strdate,
	        "class":"decision-create-date"
	    }).inject(commandsDiv);
        
	    UWA.createElement('span',{
	        "html": cellValue,
	        "class":"decision-state-title "+ (data.state).toUpperCase().replace(/ /g,'')
	    }).inject(commandsDiv);
	    
	    ownerDiv.setStyle("display","inline");
	    ownerDiv.setStyle("padding-left",3+"px");
	    ownerDiv.set({
            title: tooltip
       });
	    ownerDiv.inject(commandsDiv);
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
    
    let getModel=function(){
    	return model;
    };
    let destroy = function(){
		model = new TreeDocument();
	};
	   let getDecisionIDs = function(){
			if( model!= undefined){
				var children = model.getChildren();
				var id=[];
				for(var i=0;i<children.length;i++){
					id.push(children[i]._options.grid.id);
				}
				return id;
			}
		};
		let deleteRowModelByIds = function(ids){
			WrapperDataGridView.deleteRowModelByIds(model,ids);
			noDecisionPlaceHolder();		
		};
		let noDecisionPlaceHolder = function(){
			if(model.getChildren().length == 0){
	            widget.meetingEvent.publish('show-no-decision-placeholder');
	        }
		};
		
		 let deleteSelectedRows = function(){
				var selRows = model.getSelectedNodes();
				model.prepareUpdate();	
				 for (var index = 0; index < selRows.length; index++) {
				     var assignee =selRows[index].options.grid.UserName;
					 model.removeRoot(selRows[index]);					
				 }
				model.pushUpdate();
				if(model.getChildren().length==0){
				    widget.meetingEvent.publish('show-no-decision-placeholder');
		        }
			};
    
			let meetingInfo = {
					
			};
			
    let DecisionModel = {
    		createModel : (response) => {return prepareTreeDocumentModel(response);},
    		getModel : ()=> {return getModel();},
    		getRowModelById: (id) => {return getRowModelById(id);},
    		updateRows : (resp)=> {return updateRows(resp);},
    		appendRows : (data) => {return appendRows(data);},
    		appendRowsforCreate : (data, autoDecision) => {return appendRowsforCreate(data, autoDecision);},
    		getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
    		destroy : () => {return destroy();},
    		getDecisionIDs: () => {return getDecisionIDs();},
    		deleteSelectedRows : () => {return deleteSelectedRows();},
    		deleteRowModelByIds: (ids) => {return deleteRowModelByIds(ids);},
    		meetingInfo:()=>{return meetingInfo; }   		
    		
    }
    return DecisionModel;

});


define('DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
		[	'DS/Tree/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/ENXDecisionMgmt/Utilities/DataFormatter',
			'DS/ENXDecisionMgmt/Utilities/Utils',
			'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
			'DS/WebappsUtils/WebappsUtils'
			],
			function(			   
					TreeDocument,
					TreeNodeModel,
					DataFormatter,
					Utils,
					WrapperDataGridView,
					WebappsUtils
			) {
	'use strict';
	let model = new TreeDocument();
	let prepareTreeDocumentModel = function(response){      
		model.prepareUpdate();  
		response.forEach(function(dataElem) {
		     var dataElem1 = dataElem.dataelements;	
		        var root = new TreeNodeModel({
		            label: dataElem1.title,
		            id: dataElem.id,
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
    
    let appendRows = function(dataElem)
    {
    	model.prepareUpdate();	
		dataElem.forEach((elem) => {
		    var dataElem1 = elem.dataelements;	 
			var root = new TreeNodeModel({
                label: dataElem1.title,
                width: 300,
                id: dataElem.id,
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
		    widget.meetingEvent.publish('hide-no-refDocs-placeholder');
		   
        }
    };
    
    let getModel=function(){
    	return model;
    };
    
    let getRefDocsIDs = function(){
		if( model!= undefined){
			var children = model.getChildren();
			var id=[];
			for(var i=0;i<children.length;i++){
				id.push(children[i].options.grid.id);
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
		    widget.meetingEvent.publish('show-no-refDocs-placeholder');
        }
	};
	
	
    let destroy = function(){
		model = new TreeDocument();
	};
    
    let DecisionReferenceDocumentsModel = {
    		createModel : (response) => {return prepareTreeDocumentModel(response);},
    		appendRows : (response) => {return appendRows(response); },
    		getSelectedRowsModel : () => {return WrapperDataGridView.getSelectedRowsModel(model);},
    		getRefDocsIDs: () => {return getRefDocsIDs();},
    		getModel : ()=> {return getModel();},
    		destroy : () => {return destroy();},
    		deleteSelectedRows : () => {return deleteSelectedRows();}
    		
    }
    return DecisionReferenceDocumentsModel;

});

/* global define, widget */
/**
 * @overview Meeting - JSON Parse utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXDecisionMgmt/Utilities/ParseJSONUtil',
		[
			'UWA/Class',
			'DS/ENXDecisionMgmt/Utilities/Utils',
			'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
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
		parseSearchDecisionResp : function(resp, data){
			widget.data.csrf = resp.csrf; //setting the csrf in widget data
			resp.result = new Array();
			var respLen = resp.data.length;
			for(var i = 0; i< respLen; i++){
				resp.result[i] = resp.data[i];
				if(resp.result[i].id === undefined){
					resp.result[i].id = resp.data[i].id;
				}
				if(resp.result[i].physicalid === undefined){
					resp.result[i].physicalid = resp.data[i].id;
				}
				if(resp.result[i].type === undefined){
					resp.result[i].type = "Decision";
				}
				if(resp.result[i].relId === undefined){
					resp.result[i].relId = resp.data[i].relId;
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
		parseResp : function(resp){
			widget.data.csrf = resp.csrf; //setting the csrf in widget data
			resp.result = new Array();
			var respLen = resp.data.length;
			for(var i = 0; i< respLen; i++){
				resp.result[i] = resp.data[i].dataelements;
				if(resp.result[i].objectId === undefined){
					resp.result[i].objectId = resp.data[i].objectId;
				}
				if(resp.result[i].state === undefined){
					resp.result[i].state = resp.data[i].state;
				}
				if(resp.result[i].stateNLS === undefined){
					resp.result[i].stateNLS = resp.data[i].stateNLS;
				}
				if(resp.result[i].owner === undefined){
					resp.result[i].owner = resp.data[i].owner;
				}
				if(resp.result[i].name === undefined){
					resp.result[i].name = resp.data[i].name;
				}
				if(resp.result[i].description === undefined){
					resp.result[i].description = resp.data[i].description;
				}
				if(resp.result[i].originated === undefined){
					resp.result[i].originated = resp.data[i].originated;
				}
				if(resp.result[i].revision === undefined){
					resp.result[i].revision = resp.data[i].revision;
				}
				if(resp.result[i].modified === undefined){
					resp.result[i].modified = resp.data[i].modified;
				}
				if(resp.result[i].originator === undefined){
					resp.result[i].originator = resp.data[i].originator;
				}
				if(resp.result[i].policy === undefined){
					resp.result[i].policy = resp.data[i].policy;
				}
				if(resp.result[i].policyNLS === undefined){
					resp.result[i].policyNLS = resp.data[i].policyNLS;
				}
				if(resp.result[i].physicalid === undefined){
					resp.result[i].physicalid = resp.data[i].id;
				}
			}
			return resp.result;
		}

	});


	return ParseJSONUtil;
});

/**
 * Route summary grid view custom column
 */

define('DS/ENXDecisionMgmt/View/Grid/DecisionGridCustomColumns', 
		[
		 'DS/Controls/Button',
		 'DS/Controls/TooltipModel',
		 'DS/ENXDecisionMgmt/Controller/DecisionBootstrap',
		 'DS/ENXDecisionMgmt/Utilities/Utils',
		 'UWA/Drivers/Alone',
 		 'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
		 ], 
		function(WUXButton, WUXTooltipModel,DecisionBootstrap, Utils, Alone, NLS) {
	
    'use strict';
   
    let onDecisionNodeStateCellRequest = function (cellInfos) {
    	let reusableContent;    	
		if (!cellInfos.isHeader) {
			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_state_');
			 if (reusableContent) {
				 //cellInfos.cellView.getContent().setContent(reusableContent);
				 let state = cellInfos.nodeModel.options.grid.state;
				 
				 reusableContent.getChildren()[0].setHTML(cellInfos.nodeModel.options.grid.Maturity_State);
				 reusableContent.getChildren()[0].setAttribute("class", "decision-state-title "+state.toUpperCase().replace(/ /g,''));
				 cellInfos.cellView._setReusableContent(reusableContent);
			 }
		}
    };

    
    let onDecisionNodeOwnerCellRequest= function (cellInfos) {
    	let reusableContent;    	
		if (!cellInfos.isHeader) {
			reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_owner_');
			 if (reusableContent) {
				 //cellInfos.cellView.getContent().setContent(reusableContent);
				 var cellValue = cellInfos.nodeModel.options.grid.ownerFullName;
				 var userName = cellInfos.nodeModel.options.grid.owner;
				 var ownerIconURL = "/api/user/getpicture/login/"+userName+"/format/normal";
				 var iconDetails = getAvatarDetails(cellValue);
				 var swymOwnerIconUrl = DecisionBootstrap.getSwymUrl()+ownerIconURL;
				 if(DecisionBootstrap.getSwymUrl()!=undefined){
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
let onDecisionNodeDateCellRequest = function (cellInfos){
	let reusableContent;    	
	if (!cellInfos.isHeader) {
		reusableContent = cellInfos.cellView.collectionView.reuseCellContent('_startDate_');
		 if (reusableContent) {
			 let sdate = cellInfos.nodeModel.options.grid.creationDate;
		/* 	 let dateobj = new Date(sdate);
			 let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
			 let strdate = dateobj.toLocaleDateString('default', options) +" "+ dateobj.toLocaleTimeString().replace(/(.*)\D\d+/, '$1'); */
			 let strdate = Utils.formatDateTimeString(new Date(sdate));
			 reusableContent.getChildren()[0].setHTML(strdate);
			 reusableContent.getChildren()[0].setAttribute("class", "decision-creationdate-title"+strdate);
			 cellInfos.cellView._setReusableContent(reusableContent); 
		 }
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
      let DecisionGridViewOnCellRequest={
    		  
    		  onDecisionNodeStateCellRequest : (cellInfos) => { return onDecisionNodeStateCellRequest(cellInfos);},
    		  onDecisionNodeOwnerCellRequest : (cellInfos)  => { return onDecisionNodeOwnerCellRequest(cellInfos);},
    		  onDecisionNodeDateCellRequest : (cellInfos)  => { return onDecisionNodeDateCellRequest(cellInfos);},
    		  getAvatarDetails:(Labelname) => { return getAvatarDetails(Labelname);}
  	};
      return DecisionGridViewOnCellRequest;
  });

/* global define, widget */
/**
 * @overview Meeting - ENOVIA Bootstrap file to interact with the platform
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXDecisionMgmt/Services/DecisionServices',
        [
         "UWA/Core",
         'UWA/Class/Promise',
         'DS/ENXDecisionMgmt/Controller/DecisionBootstrap',
         'DS/ENXDecisionMgmt/Utilities/ParseJSONUtil',
         'DS/WAFData/WAFData'
         ],
         function(
                 UWACore,
                 Promise,
                 DecisionBootstrap,
                 ParseJSONUtil,
                 WAFData
         ) {
    'use strict';

    let DecisionServices,_createDecision, _fetchMeetingDecisions, _fetchDecisionAppliesTo,_removeRefDocsItems, _addReferenceDocument,
        _fetchDecisionRefDocs, _fetchAllDecisison, _fetchDecisionById, _addDecisions, _deleteDecision,_addAppliesToDecision,_removeAppliesToItems,_reviseDecision,_removeDecision,_fetchAllowedRefDocsTypesForDecision;
    _removeAppliesToItems	= function(decisionId,ids){
        return new Promise(function(resolve, reject) {
        	var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
    		// DELETE Method //
    		var url = DecisionBootstrap.getDecisionServiceBaseURL()+'/'+ decisionId + '/appliesTo';
    		var options = {};
    		options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
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

            DecisionBootstrap.decisionAuthReq(url, options);	
        });
	
     };

    _fetchDecisionAppliesTo = function(model){
        return new Promise(function(resolve, reject) {
        	var decisionId  =  model.id
            let postURL=  DecisionBootstrap.getDecisionServiceBaseURL()+"/"+decisionId+"/appliesTo";
            let options = {};
            options.method = 'GET';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };

            options.onComplete = function(serverResponse) {
               serverResponse= JSON.parse(serverResponse);
            	serverResponse= serverResponse.data;
            	serverResponse.model = model;
            	resolve(serverResponse);
            };	

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
                reject(respData);
             	}else{
             		reject(serverResponse);
             	}
            };

            DecisionBootstrap.decisionAuthReq(postURL, options);	
        });
    };
    _removeRefDocsItems = function(decisionId,ids){
        return new Promise(function(resolve, reject) {
        	var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
    		// DELETE Method //
    		var url = DecisionBootstrap.getDecisionServiceBaseURL()+'/'+ decisionId + '/referenceDocument';
    		var options = {};
    		options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
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

            DecisionBootstrap.decisionAuthReq(url, options);	
        });
    };
    
    _fetchDecisionRefDocs = function(decisionId){
        return new Promise(function(resolve, reject) {
            let postURL=  DecisionBootstrap.getDecisionServiceBaseURL()+"/"+decisionId+"/referenceDocument";
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

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
                reject(respData);
             	}else{
             		reject(serverResponse);
             	}
            };

            DecisionBootstrap.decisionAuthReq(postURL, options);	
        });
    };
    _addAppliesToDecision = function(model,data){
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
            var url = DecisionBootstrap.getDecisionServiceBaseURL()+'/'+ decisionId + '/appliesTo';
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
            options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
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

            DecisionBootstrap.decisionAuthReq(url, options);
        });
    };

    _addReferenceDocument = function(model,data){
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
            var url = DecisionBootstrap.getDecisionServiceBaseURL()+'/'+ decisionId + '/referenceDocument';
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
            options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
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

            DecisionBootstrap.decisionAuthReq(url, options);
        });
    };
    _fetchMeetingDecisions = function(meetingId){
        return new Promise(function(resolve, reject) {
        	let postURL=  DecisionBootstrap.getDecisionServiceBaseURL()+"?parentID="+meetingId;
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

            DecisionBootstrap.decisionAuthReq(postURL, options);	
        });
    };
    
    _fetchAllDecisison = function(){
        return new Promise(function(resolve, reject) {
            let postURL=  DecisionBootstrap.getDecisionServiceBaseURL();
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

            DecisionBootstrap.decisionAuthReq(postURL, options);	
        });
    };
    
    _fetchDecisionById = function(decisionId){
        return new Promise(function(resolve, reject) {
            let postURL=  DecisionBootstrap.getDecisionServiceBaseURL()+"/"+decisionId;
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
            	resolve(new ParseJSONUtil().parseResp(JSON.parse(serverResponse)));
            };	

            options.onFailure = function(serverResponse,respData) {
            	if(respData){
                reject(respData);
             	}else{
             		reject(serverResponse);
             	}
            };

            DecisionBootstrap.decisionAuthReq(postURL, options);	
        });
    };

    _addDecisions = function(model,data){
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
            let url=  DecisionBootstrap.getDecisionServiceBaseURL()+"?parentID="+meetingId;
            var selectedMembersData = new Array();
			
            for (var i = 0; i < data.length; i++) { 
            	var dataElements = {};
            	var d = {
                        "id" : data[i].id,
                        "name" : data[i]['ds6w:identifier'],
                		"owner" : data[i].owner,
                		 "created" : data[i]['ds6w:created'],
                		 "parentID":meetingId,
                		 "add":"true"
                }
                dataElements.dataelements = d;
                selectedMembersData.push(dataElements);
            }
            var requestData = {
                    "csrf" : widget.data.csrf,
                    "data" : selectedMembersData
            };
            var options = {};
            options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
            options.method = 'POST';
            options.type = 'json';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data = JSON.stringify(requestData);
            options.onComplete = function(serverResponse) {
                resolve(serverResponse);
                //resolve(new ParseJSONUtil().parseSearchDecisionResp(serverResponse, data));
            };  

            options.onFailure = function(serverResponse) {
                reject(serverResponse);
            };

            DecisionBootstrap.decisionAuthReq(url, options);
        });
    };
    
    
    _removeDecision = function(meetingId,ids){
        return new Promise(function(resolve, reject) {
           	//var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
       		// DELETE Method //
           	//var url=  EnoviaBootstrap.getDecisionServiceBaseURL();
           	var url=  DecisionBootstrap.getDecisionServiceBaseURL();
       		
           	var selectedMembersData = new Array();
			
            for (var i = 0; i < ids.length; i++) { 
            	var dataElements = {};
            	var d = {
                        "id" : ids[i],
                		 "parentID":meetingId,
                		 "remove":"true"
                }
                dataElements.dataelements = d;
                selectedMembersData.push(dataElements);
            }
            
            var requestData = {
                    "csrf" : widget.data.csrf,
                    "data" : selectedMembersData
            };
           	
           	var options = {};
       		options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
       		options.method = 'DELETE';
       		options.type = 'json';
       		options.timeout = 0;
       		options.headers = {
       				'Content-Type' : 'application/ds-json',
       		};
       		options.wait = true;
       		//options.data = JSON.stringify(payload);
       		options.data = JSON.stringify(requestData);
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

               DecisionBootstrap.decisionAuthReq(url, options);	
           });
       };


       
    _deleteDecision = function(meetingId,ids){
       return new Promise(function(resolve, reject) {
       	var payload = new ParseJSONUtil().createDataWithIdForRequest(ids);
   		// DELETE Method //
       	var url=  DecisionBootstrap.getDecisionServiceBaseURL();
   		var options = {};
   		options = UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);
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

           DecisionBootstrap.decisionAuthReq(url, options);	
       });
   };

   _createDecision=function(jsonData,createDecisiondata){
   	var meetingId = createDecisiondata.model.meetingId;
       return new Promise(function(resolve, reject) {
           let postURL=DecisionBootstrap.getDecisionServiceBaseURL();
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

           DecisionBootstrap.decisionAuthReq(postURL, options);	
       });
      };
       
  /*  _reviseDecision = function(inputData,decisionId){
		 return new Promise(function(resolve, reject) {
			 if(inputData.csrf == undefined){
				 require(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices'],function(CompassServices){
					 CompassServices.getServiceUrl( { 
						 serviceName: '3DSpace',
						 platformId : widget.getValue("x3dPlatformId"), 
						 onComplete : function(url){
							 DecisionBootstrap.decisionAuthReq(url + '/resources/v1/application/E6WFoundation/CSRF', UWACore.extend( {
								 method : 'GET',
								 onComplete : function(csrf){
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
			 return reviseDecision(inputData,decisionId); 
		 });
  };  */
  
  _reviseDecision = function(inputData,decisionId){
  
        return new Promise(function(resolve, reject) {
            let postURL=DecisionBootstrap.getDecisionServiceBaseURL()+"/"+ decisionId+"/revise";
            let options = {};
            options.method = 'POST';
            options.headers = {
                    'Content-Type' : 'application/ds-json',
            };
            options.data = JSON.stringify(inputData);
            options.onComplete = function(serverResponse) {
            	let resp = new ParseJSONUtil().parseResp(JSON.parse(serverResponse));   
                resolve(resp);
            };	

            options.onFailure = function(resp, model, options) {
                reject(model);
            };

            DecisionBootstrap.decisionAuthReq(postURL, options);	
        });
   };
   
   let _makeWSCall  = function (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) {

		var options = options || null;
		var url = "";
		if (options != null && options.isfederated != undefined && options.isfederated == true)
			url =	DecisionBootstrap.getSearchUrl()+ URL;
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
	
	_fetchAllowedRefDocsTypesForDecision = function(){
		   let types = ["DOCUMENTS"];
	
		   return new Promise(function(resolve, reject) {	
		       var typeDerivativesServiceUrl = DecisionBootstrap.get3DSpaceURL() + '/resources/v1/modeler/documents/typeDerivatives';
		       let options = {};
	           options.method = 'POST';
	           options.headers = {
	                   'Content-Type' : 'application/ds-json',
	           };
	           options.data=  JSON.stringify({
	               data: types.map(function (type) {
	                   return {
	                       'type': type
	                   };
	               })
	           });
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
	           
	       		DecisionBootstrap.decisionAuthReq(typeDerivativesServiceUrl, options);	
	       });	 
	   }; 
   
    DecisionServices={
    		fetchDecisionAppliesTo: (model) => {return _fetchDecisionAppliesTo(model);},
    		fetchDecisionRefDocs: (decisionId) => {return _fetchDecisionRefDocs(decisionId);},
    		fetchMeetingDecisions: (meetingId) => {return _fetchMeetingDecisions(meetingId);},
            fetchAllDecisison:() =>{return _fetchAllDecisison();},
            fetchDecisionById:(decisionId) =>{return _fetchDecisionById(decisionId);},
            addDecisions: (model,data) => {return _addDecisions(model,data);},     
            addReferenceDocument: (model,data) => {return _addReferenceDocument(model,data);},
            addAppliesToDecision: (model,data) => {return _addAppliesToDecision(model,data);},
            deleteDecision: (meetingId,ids) => {return _deleteDecision(meetingId,ids);},
            removeDecision: (meetingId,ids) => {return _removeDecision(meetingId,ids);},
            removeAppliesToItems: (decisionId,ids) => {return _removeAppliesToItems(decisionId,ids);},
            removeRefDocsItems: (decisionId,ids) => {return _removeRefDocsItems(decisionId,ids);},
            createDecision: (jsonData,agendadata,meetnginfo) =>{return _createDecision(jsonData,agendadata,meetnginfo);},
            reviseDecision : (inputData,decisionId)=>{return _reviseDecision(inputData,decisionId); },
            makeWSCall : (URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options) => {return _makeWSCall(URL, httpMethod, authentication, ContentType, ReqBody, userCallbackOnComplete, userCallbackOnFailure, options);},
			fetchAllowedRefDocsTypesForDecision: () => {return _fetchAllowedRefDocsTypesForDecision();}
    };

    return DecisionServices;

});

/*
global widget
 */
define('DS/ENXDecisionMgmt/Controller/DecisionController',[
	'DS/ENXDecisionMgmt/Services/DecisionServices',
	'UWA/Promise',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'],
function(DecisionServices, Promise, NLS) {
    'use strict';
    let DecisionController,meetingID;
    //TODO implement a general callback method for anykind of service failure
    let commonFailureCallback = function(reject,failure){
    		if(failure.statusCode === 500){
    			widget.meetingNotify.handler().addNotif({
                    level: 'error',
                    subtitle: NLS.unexpectedError,
                    sticky: true
                });
    		}else{
    			reject(failure);
    		}
    }
    
    /*All methods are public, need to be exposed as this is service controller file*/
    DecisionController = {
    		removeAppliesToItems: function(decisionId,ids){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.removeAppliesToItems(decisionId,ids).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		fetchDecisionAppliesTo: function(model){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.fetchDecisionAppliesTo(model).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		removeRefDocsItems: function(decisionId,ids){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.removeRefDocsItems(decisionId,ids).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		fetchDecisionRefDocs: function(decisionId){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.fetchDecisionRefDocs(decisionId).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		addReferenceDocument:function(model,data){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.addReferenceDocument(model,data).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});
    		},
    		addAppliesToDecision:function(model,data){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.addAppliesToDecision(model,data).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});
    		},
    		fetchMeetingDecisions: function(meetingId){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.fetchMeetingDecisions(meetingId).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},	
    		addDecisions : function(model,data){
  			return new Promise(function(resolve, reject) {
  				DecisionServices.addDecisions(model,data).then(
  				success => {
  					resolve(success);
  		    	},
  		    	failure => {
  		    		commonFailureCallback(reject,failure);
  		    	});
  			});	
  		},
    		
    	fetchAllDecisison: function(){
    		return new Promise(function(resolve, reject) {
    			DecisionServices.fetchAllDecisison().then(
    			success => {
    				resolve(success);
    		    },
    		    failure => {
    		    	commonFailureCallback(reject,failure);
    		    });
    		});	
    	},
    		
    	fetchDecisionById: function(decisionId){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.fetchDecisionById(decisionId).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},	
    		removeDecision: function(meetingId,ids){
     			return new Promise(function(resolve, reject) {
     				DecisionServices.removeDecision(meetingId,ids).then(
     				success => {
     					resolve(success);
     		    	},
     		    	failure => {
     		    		commonFailureCallback(reject,failure);
     		    	});
     			});	
     		},
    		 deleteDecision: function(meetingId,ids){
     			return new Promise(function(resolve, reject) {
     				DecisionServices.deleteDecision(meetingId,ids).then(
     				success => {
     					resolve(success);
     		    	},
     		    	failure => {
     		    		commonFailureCallback(reject,failure);
     		    	});
     			});	
     		},
     		createDecision: function(jsonData,meetnginfo){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.createDecision(jsonData,meetnginfo).then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		},
    		reviseDecision :  function(inputData,decisionId){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.reviseDecision(inputData,decisionId).then(
    						success => {
    	    					resolve(success);
    	    		    	},
    	    		    	failure => {
    	    		    		commonFailureCallback(reject,failure);
    	    		    	});
    			});
    		},
			fetchAllowedRefDocsTypesForDecision: function(){
    			return new Promise(function(resolve, reject) {
    				DecisionServices.fetchAllowedRefDocsTypesForDecision().then(
    				success => {
    					resolve(success);
    		    	},
    		    	failure => {
    		    		commonFailureCallback(reject,failure);
    		    	});
    			});	
    		}
    		};	
		
    		
       
    return DecisionController;

});

/* global define, widget */
define('DS/ENXDecisionMgmt/Utilities/DragAndDropManager',
        [
            "UWA/Core",
            'DS/ENXDecisionMgmt/Controller/DecisionController',
			'DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
			'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
			'DS/ENXDecisionMgmt/Model/DecisionModel',
    		'DS/ENXDecisionMgmt/Utilities/DragAndDrop',
        	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
         ],
         function(  
        		 UWACore,
        		 DecisionController,
				 DecisionReferenceDocumentsModel,
				 DecisionAppliesToModel,
				 DecisionModel,
				 DropZone,
                 NLS
         ) {
    'use strict';

	let _currentDecisionModel, _currentMeetingModel;
    let init = function(Info) {
    	if(Info && Info.id) {
    		_currentDecisionModel = Info;// DecisionModel.getRowModelById(Info.model.id);
    	}
		else if(Info && Info.model && Info.model.id)
			_currentMeetingModel = Info.model;
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
	
	let _onDropManager = function(e, info, target) {
		if(info) {		
			if(target == "RefDocs") {
				let refDocsTypes = widget.getValue('decisionRefDocsDnDTypes');			
				if(typeof refDocsTypes == 'undefined'){
									
					  DecisionController.fetchAllowedRefDocsTypesForDecision().then(
						  success => {
							  //refDocsTypes = success.data[0].dataelements.decisionDnDRefDocsTypes;
							refDocsTypes = success.DOCUMENTS;
		     	    		 _manageDrop(e, info, target, refDocsTypes);
		     	    	  	},
		     	    	  failure =>{
		     	    		  console.log("Failure: fetch decision allowed ref docs types")
		     	    	  });
				}else{
					_manageDrop(e, info, target, refDocsTypes);
				}
			}
			else if(target == "Summary") {
				_manageDrop(e, info, target, ["Decision"]);
			}			
			else
				_manageDrop(e, info, target, "");
		}
		else {
			var msg = "";
			
			if(target == "RefDocs")
				msg = NLS.errorAccessAddRefDocs;
			else if(target == "AppliesTo")
				msg = NLS.errorAccessAddAppliesTo;
			else if(target == "Summary")
				msg = NLS.errorAccessAddDecision;
			else
				msg = "Unknown target value";			
			
			widget.meetingNotify.handler().addNotif({
                level: 'error',
                subtitle: msg,
             	sticky: true
             });
		}
   };

	let _manageDrop = function(e, info, target, allowedTypes) {
		//let allowedTypes = refDocsTypes ? refDocsTypes.split(',') : '';
		let data = getDroppedData(e);		
		let newData = removeExistingData(data, target);
			
		if(newData.length > 0) {
			if(newData.length != data.length) {
				let existingDataCount = data.length-newData.length;
				
				var message = "";
				var type = "warning";
				
				if(target == "RefDocs") {
					if(existingDataCount == 1)
						message = NLS.warningAddExistingRefDocsSingle;
					else
						message = NLS.warningAddExistingRefDocs;
				}
				else if(target == "AppliesTo") {
					if(existingDataCount == 1)
						message = NLS.warningAddExistingAppliesToSingle;
					else
						message = NLS.warningAddExistingAppliesTo;
				}
				else if(target == "Summary") {
					if(existingDataCount == 1)
						message = NLS.warningAddExistingDecisionSingle;
					else
						message = NLS.warningAddExistingDecision;
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
			
			if(target == "RefDocs" || target == "Summary") {
				let uniqueCount = newData.length;
				newData = removeUnsupportedData(newData, allowedTypes);
				
				let unSupportedCount = uniqueCount-newData.length;
				if(newData.length > 0) { 
					if(newData.length != uniqueCount) {						
						var message = "";
						
						if(unSupportedCount == 1) {
							if(target == "RefDocs")
								message = NLS.errorAddExistingRefDocsTypeSingle;
							else
								message = NLS.errorAddExistingDecisionTypeSingle;
						}
						else {
							if(target == "RefDocs")
								message = NLS.errorAddExistingRefDocsType;
							else
								message = NLS.errorAddExistingDecisionType;
						}
						
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
						if(uniqueCount <= 1) {
							if(target == "RefDocs")
								message = NLS.errorAddExistingRefDocsTypeAllSingle;
							else
								message = NLS.errorAddExistingDecisionTypeAllSingle;
						}
						else {
							if(target == "RefDocs")
								message = NLS.errorAddExistingRefDocsTypeAll;
							else
								message = NLS.errorAddExistingDecisionTypeAll;
						}
					}
					else {
						if(unSupportedCount == 1) {
							if(target == "RefDocs")
								message = NLS.errorAddExistingRefDocsTypeSingle;
							else
								message = NLS.errorAddExistingDecisionTypeSingle;
						}
						else {
							if(target == "RefDocs")
								message = NLS.errorAddExistingRefDocsType;
							else
								message = NLS.errorAddExistingDecisionType;
						}
						
						message = message.replace("{count}", unSupportedCount);
						message = message.replace("{totCount}", data.length);
					}
						
					widget.meetingNotify.handler().addNotif({
		                level: 'error',
		                subtitle: message,
		             	sticky: true
		             });
				}	
			}
			
			let itemIds = [];
	    	newData.every(function(item) {
	    		let objectId = item.objectId;
	        	itemIds.push(objectId);
	        	return true;				
			});
			
	       	if(itemIds.length > 0) {	
				let model = {};
							
				if(target == "Summary") {
					let meetingId = _currentMeetingModel.id;
					model.TreedocModel = {'meetingId' :  meetingId};
				}
				else {
					let decisionId = getDecisionId();
					model.TreedocModel = {'decisionId' :  decisionId};
				}
				
				let dataSet = [];
				
				itemIds.forEach(function(itemId) {
					let detail = {'id' : itemId, 'ds6w:label' : '',
								'ds6w:modified' : '', 'ds6w:status' : ''};
					dataSet.push(detail);
				});
				
				if(target == "RefDocs") {
						DecisionController.addReferenceDocument(model, dataSet).then(function(resp) {
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
	
						DecisionReferenceDocumentsModel.appendRows(resp);					
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
				else if(target == "AppliesTo") {
					DecisionController.addAppliesToDecision(model, dataSet).then(function(resp) {
					var message = "";
					
					if(resp.length > 0) {
						if(resp.length == 1)
							message = NLS.successAddExistingAppliesToSingle;
						else
							message = NLS.successAddExistingAppliesTo;
           			}

					message = message.replace("{count}",resp.length);
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: message,
						sticky: true
					});

					DecisionAppliesToModel.appendRows(resp);					
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
				else if(target == "Summary") {
					DecisionController.addDecisions(model, dataSet).then(function(resp) {
					var message = "";
					
					if(resp && resp.data && resp.data.length > 0) {
						if(resp.data.length == 1)
							message = NLS.successAddExistingDecisionSingle;
						else
							message = NLS.successAddExistingDecision;
           			}

					message = message.replace("{count}",resp.length);
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: message,
						sticky: true
					});
					
					DecisionModel.appendRowsforCreate(resp);					
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
			if(target == "RefDocs") 
			{
				if(dataCount == 1)
					message = NLS.errorAddExistingRefDocsSingle;
				else
					message = NLS.errorAddExistingRefDocs;				
			}
			else if(target == "AppliesTo")
			{
				if(dataCount == 1)
					message = NLS.errorAddExistingAppliesToSingle;
				else
					message = NLS.errorAddExistingAppliesTo;
			}
			else if(target == "Summary")
			{
				if(dataCount == 1)
					message = NLS.errorAddExistingDecisionSingle;
				else
					message = NLS.errorAddExistingDecisions;
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

		let removeExistingData = function(data, target) {
			let addedItemsIds;
			
			let uniqueData = [];
			
			if(target == "RefDocs")
				addedItemsIds = DecisionReferenceDocumentsModel.getRefDocsIDs();
			else if(target == "AppliesTo")
				addedItemsIds = DecisionAppliesToModel.getAppliesToIDs();			
			else if(target == "Summary")
				addedItemsIds = DecisionModel.getDecisionIDs();
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

		let getDecisionId = function(){
		   let decisionId = getDecisionIdFromModel();
		   return decisionId;
	   };
	   
	   let getDecisionIdFromModel = function(){
		    //fetch the current selected route, if it's opened then only update the content tab
	       	let decisionModel = getCurrentDecisionModel();
	       	return decisionModel.id;
	   };

		let getCurrentDecisionModel = function(){
	  //fetch the current selected route, if it's opened then only update the content tab
    	/*let selectedRow =  RouteModel.getOpenedRouteModel();
    	let routeModel;
    	if(selectedRow && selectedRow.model){
    		routeModel = selectedRow.model;
    	}
    	return routeModel;*/
		  return _currentDecisionModel;
	  };
		
		
		let getObjectToDrop = function(cellInfo){
		  return  {
			  envId: widget.getValue("x3dPlatformId") ? widget.getValue("x3dPlatformId") : "OnPremise",
			  serviceId: "3DSpace",
			  contextId: "",
			  objectId: cellInfo.options.grid.id,
			  objectType: cellInfo.options.grid.type,
			  displayName: cellInfo.options.grid.title	,
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
		
	
		let DragAndDropManager ={
			init: (info) => {return init(info);},
	    	onDropManager: (e, info, target) => { return _onDropManager(e, info, target);},
	    	getContentForDrag: (e, info) => {return getContentForDrag(e, info);}
	   };
	   return DragAndDropManager;
		
	});

define(
        'DS/ENXDecisionMgmt/Actions/ReferenceDocumentActions',
        [
         'UWA/Drivers/Alone',
         'UWA/Core',
         'DS/WAFData/WAFData',
         'UWA/Utils',
         'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
         'DS/ENXDecisionMgmt/Controller/DecisionController',
         'DS/ENXDecisionMgmt/Utilities/Utils',
         'DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
         'DS/ENXDecisionMgmt/Utilities/SearchUtil',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
         ],
         function(
                 UWA,
                 UWACore,
                 WAFData,
                 UWAUtils,
                 WrapperTileView,
                 DecisionController,
                 Utils,
                 DecisionReferenceDocumentsModel,
                 SearchUtil,
                 NLS
         ) {

            'use strict';
            let ReferenceDocumentActions;
            ReferenceDocumentActions={
            		 onSearchClick: function(){
                     	var data = WrapperTileView.tileView();
                     	if(data && data.TreedocModel && data.TreedocModel.decisionModel.modifyAccess != "TRUE")
                    	{
                    		return;
                    	}
                         var searchcom_socket,scopeId;
                         //require(['DS/ENXMeetingMgmt/Model/MeetingAttachmentModel'], function(attachmentModel) {
                         	//MeetingAttachmentModel = attachmentModel;
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
 				                    var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "addRefDocs", true , recentTypes);
 				                    refinementToSnNJSON.precond = SearchUtil.getPrecondForRefDocsSearch(recentTypes);
 				                    refinementToSnNJSON.resourceid_not_in = DecisionReferenceDocumentsModel.getRefDocsIDs();						
 				
 									if (UWA.is(searchcom_socket)) {
 										searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
 										searchcom_socket.addListener('Selected_Objects_search', ReferenceDocumentActions.selected_Objects_search.bind(that,data));
 										//searchcom_socket.addListener('Selected_global_action', that.selected_global_action.bind(that, url));
 										// Dispatch the in context search event
 										searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
                                     } else {
                                         throw new Error('Socket not initialized');
                                     }
                                 });
                             }

                     },
                   selected_Objects_search : function(that,data){                        
                	   DecisionController.addReferenceDocument(that,data).then(function(resp) {
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
                               sticky: true
                           });
                           
                           DecisionReferenceDocumentsModel.appendRows(resp);

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
                    },
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
                    },
                    removeRefDocs : function(decisionId,ids){

            			DecisionController.removeRefDocsItems(decisionId,ids).then(
            					success => {
            						DecisionReferenceDocumentsModel.deleteSelectedRows();
            						var successMsg = NLS.successRemoveRefDocs;
            						if(ids.length == 1){
            							successMsg = NLS.successRemoveRefDocsSingle;
            						}
            						successMsg = successMsg.replace("{count}",ids.length);
            						widget.meetingNotify.handler().addNotif({
            							level: 'success',
            							subtitle: successMsg,
            						    sticky: false
            						});
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
            		
            		}

             };
            return ReferenceDocumentActions;
        });

define(
        'DS/ENXDecisionMgmt/Actions/DecisionActions',
        [
         'UWA/Drivers/Alone',
         'UWA/Core',
         'DS/WAFData/WAFData',
         'UWA/Utils',
         'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',        
        'DS/ENXDecisionMgmt/Controller/DecisionController',
         'DS/ENXDecisionMgmt/Utilities/Utils',
         'DS/ENXDecisionMgmt/Model/DecisionModel',
         'DS/ENXDecisionMgmt/Utilities/SearchUtil',
         'DS/ENXDecisionMgmt/Utilities/ParseJSONUtil',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
         ],
         function(
                 UWA,
                UWACore,
                WAFData,
                UWAUtils,
                 WrapperTileView,
                 DecisionController,
                Utils,
                 DecisionModel,
                 SearchUtil,
                 ParseJSONUtil,
                 NLS
         ) {

            'use strict';
            let DecisionActions;
            DecisionActions={
            		createDecisionDialog: function () {
            			
            			widget.meetingEvent.publish('decision-create-click', {model:DecisionModel.getModel(), meetinginfo:DecisionModel.meetingInfo()}); 
            			
            		},
            		addExistingDecisionDialog: function(){
                    	var data = WrapperTileView.tileView();
                        var searchcom_socket
                        require(['DS/ENXDecisionMgmt/Model/DecisionModel'], function(decisionModel) {
                        	DecisionModel = decisionModel;
                            var socket_id = UWA.Utils.getUUID();
                            var that = this;
                            if (!UWA.is(searchcom_socket)) {
                                require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                                    searchcom_socket = SearchCom.createSocket({
                                        socket_id: socket_id
                                    });	
                                    var recentTypes = ["Decision"];
                                    var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id, "fetchAllDecisison", true , recentTypes);
				                    refinementToSnNJSON.precond = SearchUtil.getPrecondForDecisionContextSearch(recentTypes);
				                    refinementToSnNJSON.resourceid_not_in = DecisionModel.getDecisionIDs();						
				
									if (UWA.is(searchcom_socket)) {
										searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
										searchcom_socket.addListener('Selected_Objects_search', DecisionActions.selected_Objects_search.bind(that,data));
										searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
                                    } else {
                                        throw new Error('Socket not initialized');
                                    }
                                });
                            }
                        });

                    },
                  selected_Objects_search : function(that,data){                        
                	   DecisionController.addDecisions(that,data).then(function(resp) {
                            widget.meetingNotify.handler().addNotif({
                                level: 'success',
                                subtitle: NLS.successAddExistingDecision,
                                sticky: true
                            });
                            
                       DecisionModel.appendRowsforCreate(resp);
                       //Utils.getMeetingDataUpdated(that.TreedocModel.meetingId);
                      });
                    },/*
                    getPrecondForDecisionContextSearch: function (memberSearchTypes) {
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
                    },*/
                	 deleteDecision : function(meetingId,ids){
                 	   return new Promise(function(resolve, reject) {
                 		  DecisionController.deleteDecision(meetingId,ids).then(
                 				success => {
                 					var successMsg = NLS.successDeleteDecision;
                 					if(ids.length == 1){
                 						successMsg = NLS.successDeleteDecisionSingle;
                 					}
                 					successMsg = successMsg.replace("{count}",ids.length);
                 					widget.meetingNotify.handler().addNotif({
                 						level: 'success',
                 						subtitle: successMsg,
                 					    sticky: false
                 					});
                 					//published to subscribe in summary view
                					widget.meetingEvent.publish('decision-summary-delete-row-by-ids',{model:ids});
                					widget.meetingEvent.publish('decision-data-deleted',{model:ids});
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
                 	},
                 	removeDecision : function(meetingId,ids){
                  	   return new Promise(function(resolve, reject) {
                  		  DecisionController.removeDecision(meetingId,ids).then(
                  				success => {
                  					var successMsg = NLS.successRemoveDecisionMultiple;
                  					if(ids.length == 1){
                  						successMsg = NLS.successRemoveDecisionSingle;
                  					}
                  					successMsg = successMsg.replace("{count}",ids.length);
                  					widget.meetingNotify.handler().addNotif({
                  						level: 'success',
                  						subtitle: successMsg,
                  					    sticky: false
                  					});
                  					//published to subscribe in summary view
                 					widget.meetingEvent.publish('decision-summary-delete-row-by-ids',{model:ids});
                 					widget.meetingEvent.publish('decision-data-deleted',{model:ids});
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
                  	},
                 	
           reviseDecision : function(decisionId){
		     return new Promise(function(resolve, reject){
			 var initiateJson = new ParseJSONUtil().createCSRFForRequest(); 
			 DecisionController.reviseDecision(initiateJson,decisionId).then(resp => resolve(resp), resp => reject(resp));	
		     });	
	        },
          };
            return DecisionActions;
        });

/**
 * datagrid view for Agenda summary page
 */
define('DS/ENXDecisionMgmt/View/Grid/DecisionReferenceDocumentsDataGridView',
		[ 
			'DS/ENXDecisionMgmt/Config/DecisionRefDocsGridViewConfig',
            'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXDecisionMgmt/Config/Toolbar/DecisionRefDocsTabToolbarConfig',
            'DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
            "DS/ENXDecisionMgmt/Utilities/DragAndDropManager"
			], function(
					DecisionRefDocsGridViewConfig,
                    WrapperDataGridView,
                    DecisionRefDocsTabToolbarConfig,
                    DecisionReferenceDocumentsModel,
                    DragAndDropManager
            	    ) {

	'use strict';	
	let _toolbar, _dataGridInstance, _gridOptions = {};
	let build = function(model,data){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
        	 styles: {
                 'width': "100%",
                 'height': "calc(100% - 40px)",
                 'position': "relative"
             },  
            'class': "refDocs-gridView-View showView"
        });
        let toolbar = DecisionRefDocsTabToolbarConfig.writetoolbarDefination(model,data);
		 _gridOptions.cellDragEnabledFlag = true;
		let dataGridViewContainer = WrapperDataGridView.build(model, DecisionRefDocsGridViewConfig, toolbar, gridViewDiv, _gridOptions);
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

    let DecisionReferenceDocumentsDataGridView={
            build : (model,data) => { return build(model,data);},            
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return DecisionReferenceDocumentsDataGridView;
});


/* global define, widget */
/**
 * @overview Route Management - Search utilities
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXDecisionMgmt/Utilities/AutoCompleteUtil',
		[
			'UWA/Class',
			'DS/ENXDecisionMgmt/Services/DecisionServices',
			'DS/TreeModel/TreeDocument',
			'DS/Tree/TreeNodeModel',
			'DS/WUXAutoComplete/AutoComplete',
			],
			function(
					UWAClass,
					DecisionServices,
					TreeDocument,
					TreeNodeModel,
					WUXAutoComplete
			) {
	'use strict';
	
	let _drawAutoComplete = function(options) {
		return new WUXAutoComplete(options);
	};
	
	let _getAutoCompleteList = function(options, model, personRoleArray) {
		return new Promise(function(resolve, reject) {
			getListMember(options).then(function(resp){
				
				model.empty();
				model.prepareUpdate();
				for (var i = 0; i < resp.length; i++) {
					var identifier = resp[i].identifier;
					if(personRoleArray.hasOwnProperty(identifier)){
						resp[i].label = resp[i].label +" (" +personRoleArray[identifier] +")";
						/*if(options.categoryId=='attendee'&&(personRoleArray[identifier].contains('coOwner')==true || personRoleArray[identifier].contains('attendee')==true ))
							continue;*/
					}
					
					/*if (options.categoryId=='attendee') {
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
					else if (options.categoryId=='agenda') {
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
					else {*/
						var genericnode = new TreeNodeModel(
							{
								label : resp[i].label,
								value : resp[i].value,
								name  : resp[i].name,
								identifier: resp[i].identifier,
								type:resp[i].type,
								id: resp[i].id
							});
						model.addRoot(genericnode);
					/*}*/
					
				}
				
				model.pushUpdate();
				resolve(model);						
			});
			
		});
	};
	
	let getListMember = function (options) {
		var optionsDecision = options;
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
			queryString = optionsDecision.queryString;			
			
			var inputjson = { "with_indexing_date": true, "with_nls": false, "label": "yus-1515078503005", "locale": "en", "select_predicate": ["ds6w:label", "ds6w:type", "ds6w:description", "ds6w:identifier", "ds6w:responsible", "ds6wg:fullname"], "select_file": ["icon", "thumbnail_2d"], "query": queryString, "order_by": "desc", "order_field": "relevance", "nresults": 1000, "start": "0", "source": [], "tenant": widget.getPreference("collab-storage").value };			
			var inputjson = JSON.stringify(inputjson);

			var options = {};
			options.isfederated = true;
			DecisionServices.makeWSCall(url, "POST", "enovia", 'application/json', inputjson, success, failure, options);
		});

		return returnedPromise;
	};
	
	let AutoCompleteUtil = {
		drawAutoComplete: (options) => {return _drawAutoComplete(options);},
		getAutoCompleteList: (options, model, personRoleArray) => {return _getAutoCompleteList(options, model, personRoleArray);}			
	};
	
	return AutoCompleteUtil;
	
});

define('DS/ENXDecisionMgmt/Actions/DecisionAppliesToActions',
        [
         'UWA/Drivers/Alone',
         'UWA/Core',
         'DS/WAFData/WAFData',
         'UWA/Utils',
         'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
         'DS/ENXDecisionMgmt/Controller/DecisionController',
         'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
         'DS/ENXDecisionMgmt/Utilities/SearchUtil',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
         ],
         function(
                 UWA,
                 UWACore,
                 WAFData,
                 UWAUtils,
                 WrapperTileView,
                 DecisionController,
                 DecisionAppliesToModel,
                 SearchUtil,
                 NLS
         ) {

            'use strict';
            let DecisionAppliesToActions;
            DecisionAppliesToActions={ 
            		
            		removeAppliesTo : function(decisionId,ids){

            			DecisionController.removeAppliesToItems(decisionId,ids).then(
            					success => {
            						DecisionAppliesToModel.deleteSelectedRows();
            						var successMsg = NLS.successRemoveAppliesTo;
            						if(ids.length == 1){
            							successMsg = NLS.successRemoveAppliesToSingle;
            						}
            						successMsg = successMsg.replace("{count}",ids.length);
            						widget.meetingNotify.handler().addNotif({
            							level: 'success',
            							subtitle: successMsg,
            						    sticky: false
            						});
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
                    onSearchClick: function(){
                    	var data = WrapperTileView.tileView();
                    	if(data && data.TreedocModel && data.TreedocModel.decisionModel.modifyAccess != "TRUE")
                    	{
                    		return;
                    	}
                        var searchcom_socket;
                        require(['DS/ENXDecisionMgmt/Model/DecisionAppliesToModel'], function(appliesToModel) {
                        	DecisionAppliesToModel = appliesToModel;
                            var socket_id = UWA.Utils.getUUID();
                            var that = this;
                            if (!UWA.is(searchcom_socket)) {
                                require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
                                    searchcom_socket = SearchCom.createSocket({
                                        socket_id: socket_id
                                    });	
                                    var recentTypes = [""];
            						var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchTopicItems",true,recentTypes);
				                    refinementToSnNJSON.resourceid_not_in = DecisionAppliesToModel.getAppliesToIDs();						
				
									if (UWA.is(searchcom_socket)) {
										searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
										searchcom_socket.addListener('Selected_Objects_search', DecisionAppliesToActions.selected_Objects_search.bind(that,data));
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
/*                    parseSearchDecisionAppliesResp : function(resp){
            			var respLen = resp.length;
            			resp.result = new Array();
            			for(var i = 0; i< respLen; i++){
            				resp.result[i] = resp[i];
							resp.result[i].id = resp[i].id;
							resp.result[i].name =  resp[i]['ds6w:identifier'];
            				resp.result[i].type =  resp[i]['ds6w:label'];
            				resp.result[i].title =  resp[i]['ds6w:identifier'];
            				resp.result[i].description =  resp[i]['ds6w:description'];
            				resp.result[i].modified =  resp[i]['ds6w:modified'];
            				resp.result[i].revision =  resp[i]['ds6wg:revision'];
            				resp.result[i].state =  resp[i]['ds6w:status'];
            			}
            			return resp.result;
            		},
*/                   selected_Objects_search : function(that,data){
                	   		//var datee = DecisionAppliesToActions.parseSearchDecisionAppliesResp(data);
	                       DecisionController.addAppliesToDecision(that,data).then(function(resp) {
	                    	   DecisionAppliesToModel.appendRows(resp);
	       						var successMsg = NLS.successAddExistingAppliesTo;
								if(resp.length == 1){
									successMsg = NLS.successAddExistingAppliesToSingle;
								}
								successMsg = successMsg.replace("{count}",resp.length); 
	       						widget.meetingNotify.handler().addNotif({
	       							level: 'success',
	       							subtitle: successMsg,
	       						    sticky: false
	       						});
	                   });   
                            
                        
                    }
            
             };
            return DecisionAppliesToActions;
        });

define('DS/ENXDecisionMgmt/Utilities/PlaceHolder',
        ['DS/Controls/Button',
         'DS/ENXDecisionMgmt/Actions/ReferenceDocumentActions',
         'DS/ENXDecisionMgmt/Actions/DecisionAppliesToActions',
         'DS/ENXDecisionMgmt/Actions/DecisionActions',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
        ],
        function(
                WUXButton,
                ReferenceDocumentActions,
                DecisionAppliesToActions,
                DecisionAction,
                NLS
        ) {
        'use strict';
        
        
        let showEmptyAppliesToPlaceholder= function (container, hideAddExistingbutton) {
            let existingPlaceholder = container.getElement('.no-appliesTo-to-show-container');

            // We hide grid view and tile view is already hidden  //
            //container.querySelector(".attachments-tileView-View").setStyle('display', 'none');
            container.querySelector(".appliesTo-gridView-View").setStyle('display', 'none');
            container.querySelector(".appliesTo-tileView-View").setStyle('display', 'none');
            
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-appliesTo-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";
            if(hideAddExistingbutton){ // need to add check
            	placeholder = UWA.createElement('div', {
            		'class': 'no-appliesTo-to-show-container',
            		html: [UWA.createElement('div', {
                        'class': 'no-appliesTo-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-appliesTo-to-show-label',
                            html: NLS.emptyAppliesToLabelwithoutButton
                        })]
                    })]
                });
            
            } else {
            	placeholder = UWA.createElement('div', {
                    'class': 'no-appliesTo-to-show-container',
                    html: [UWA.createElement('div', {
                        'class': 'no-appliesTo-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-appliesTo-to-show-label',
                            html: NLS.emptyAppliesToLabel
                        }), UWA.createElement('div', {
                            'class': 'no-appliesTo-to-show-sub-container',

                            html: new WUXButton({
                                disabled: false,
                                emphasize: "primary",
                                label: NLS.addExisting,
                                allowUnsafeHTMLLabel: true,
                                onClick: function (e) {
                                	DecisionAppliesToActions.onSearchClick();
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
       let hideEmptyAppliesToPlaceholder= function (container) {

            let placeholder = container.getElement('.no-appliesTo-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            container.querySelector(".appliesTo-tileView-View").removeAttribute('style');
            container.querySelector(".appliesTo-gridView-View").removeAttribute('style');
            // No more div
            placeholder.destroy();
            //container.querySelector(".no-agendas-to-show-container").setStyle('display', 'none');

        }; 

        
        let showEmptyRefDocsPlaceholder= function (container, hideAddExistingbutton) {
            let existingPlaceholder = container.getElement('.no-refDocs-to-show-container');
            // We hide grid view and tile view is already hidden
            //container.querySelector(".attachments-tileView-View").setStyle('display', 'none');
            container.querySelector(".refDocs-tileView-View").setStyle('display', 'none');
            container.querySelector(".refDocs-gridView-View").setStyle('display', 'none');
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-refDocs-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";
            if(hideAddExistingbutton){ // need to add check
            	placeholder = UWA.createElement('div', {
            		'class': 'no-refDocs-to-show-container',
            		html: [UWA.createElement('div', {
                        'class': 'no-refDocs-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-refDocs-to-show-label',
                            html: NLS.emptyRefDocumentLabelwithoutButton
                        })]
                    })]
                });
            
            } else {
            	placeholder = UWA.createElement('div', {
                    'class': 'no-refDocs-to-show-container',
                    html: [UWA.createElement('div', {
                        'class': 'no-refDocs-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-refDocs-to-show-label',
                            html: NLS.emptyRefDocumentLabel
                        }), UWA.createElement('div', {
                            'class': 'no-refDocs-to-show-sub-container',

                            html: new WUXButton({
                                disabled: false,
                                emphasize: "primary",
                                label: NLS.addExisting,
                                allowUnsafeHTMLLabel: true,
                                onClick: function (e) {
                                	
                                	ReferenceDocumentActions.onSearchClick();
                                }
                            })
                        })]
                    })]
                });           
            }           
            container.appendChild(placeholder);
        }; 
      
        let hideEmptyRefDocsPlaceholder= function (container) {

            let placeholder = container.getElement('.no-refDocs-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            //container.querySelector(".attachments-tileView-View").removeAttribute('style');
            container.querySelector(".refDocs-tileView-View").removeAttribute('style');
            container.querySelector(".refDocs-gridView-View").removeAttribute('style');
            // No more div
            placeholder.destroy();
            //container.querySelector(".no-agendas-to-show-container").setStyle('display', 'none');

        }; 
        
        let showEmptyDecisionPlaceholder= function (container, hideAddExistingbutton) {
            let existingPlaceholder = container.getElement('.no-decision-to-show-container');
            // We hide grid view and tile view is already hidden
            container.querySelector(".Decision-tileview-container").setStyle('width', '100%');
            container.querySelector(".Decision-tileview-container").setStyle('height','calc(100% - 40px)'); 
            container.querySelector(".Decision-tileview-container").setStyle('position','relative');
            container.querySelector(".Decision-tileview-container").setStyle('display', 'none');
            container.querySelector(".Decision-gridView-View").setStyle('width', '100%');
            container.querySelector(".Decision-gridView-View").setStyle('height','calc(100% - 40px)'); 
            container.querySelector(".Decision-gridView-View").setStyle('position','relative');
            container.querySelector(".Decision-gridView-View").setStyle('display', 'none');
            // The place holder is already hidden, we do nothing
            if (existingPlaceholder !== null) {
                container.querySelector(".no-decision-to-show-container").removeAttribute('style');
                return existingPlaceholder;
            }
            let placeholder = "";
            if(false){ // need to add check
            	placeholder = UWA.createElement('div', {
            		'class': 'no-decision-to-show-container',
            		html: [UWA.createElement('div', {
                        'class': 'no-decision-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-decision-to-show-label',
                            html: NLS.emptyAgendaLabelwithoutButton
                        })]
                    })]
                });
            
            } else {
            	placeholder = UWA.createElement('div', {
                    'class': 'no-decision-to-show-container',
                    html: [UWA.createElement('div', {
                        'class': 'no-decision-to-show',
                        html: [UWA.createElement('span', {
                            'class': 'no-decision-to-show-label',
                            html: NLS.emptyDecisionLabel
                        }), UWA.createElement('div', {
                            'class': 'no-decision-to-show-sub-container',

                            html: new WUXButton({
                                disabled: false,
                                emphasize: "primary",
                                label: NLS.newDecision,
                                allowUnsafeHTMLLabel: true,
                                onClick: function (e) {
                                	
                                	DecisionAction.createDecisionDialog();
                                }
                            })
                        })]
                    })]
                });           
            }           
            container.appendChild(placeholder);
        }; 
      
        let hideEmptydecisionPlaceholder= function (container) {

            let placeholder = null;

			if(container)
				placeholder = container.getElement('.no-decision-to-show-container');

            // The place holder is already hidden, we do nothing
            if (placeholder === null) {
                return;
            }
                        
            //container.querySelector(".attachments-tileView-View").removeAttribute('style');
            container.querySelector(".Decision-tileview-container").removeAttribute('style');
            container.querySelector(".Decision-tileview-container").setStyle('width', '100%');
            container.querySelector(".Decision-tileview-container").setStyle('height','calc(100% - 40px)'); 
            container.querySelector(".Decision-tileview-container").setStyle('position','relative');
            container.querySelector(".Decision-gridView-View").removeAttribute('style');
            container.querySelector(".Decision-gridView-View").setStyle('width', '100%');
            container.querySelector(".Decision-gridView-View").setStyle('height','calc(100% - 40px)'); 
            container.querySelector(".Decision-gridView-View").setStyle('position','relative');
            // No more div
            placeholder.destroy();
            //container.querySelector(".no-agendas-to-show-container").setStyle('display', 'none');

        };
        
        let registerListeners = function(){
        	 widget.meetingEvent.subscribe('hide-no-decision-placeholder', function (data) {
        		 hideEmptydecisionPlaceholder(document.querySelector('.decisions-facet-container'));
   
             });
            widget.meetingEvent.subscribe('show-no-decision-placeholder', function (data) {
            	showEmptyDecisionPlaceholder(document.querySelector('.decisions-facet-container'));

            });
           widget.meetingEvent.subscribe('hide-no-refDocs-placeholder', function (data) {
        	   hideEmptyRefDocsPlaceholder(document.querySelector(".decision-refDocuments-container"));
 
           });
          widget.meetingEvent.subscribe('show-no-refDocs-placeholder', function (data) {
        	  showEmptyRefDocsPlaceholder(document.querySelector(".decision-refDocuments-container"));

          });
          widget.meetingEvent.subscribe('hide-no-appliesTo-placeholder', function (data) {
       	   hideEmptyAppliesToPlaceholder(document.querySelector(".decision-appliesTo-container"));

          });
         widget.meetingEvent.subscribe('show-no-appliesTo-placeholder', function (data) {
       	  showEmptyAppliesToPlaceholder(document.querySelector(".decision-appliesTo-container"));

         });
        };
        
        let PlaceHolder = {
        		showEmptyDecisionPlaceholder : (container) => {return showEmptyDecisionPlaceholder(container);},
        		hideEmptydecisionPlaceholder : (container) => {return hideEmptydecisionPlaceholder(container);},
                showEmptyAppliesToPlaceholder : (container,hideAddExistingbutton) => {return showEmptyAppliesToPlaceholder(container,hideAddExistingbutton);},
                hideEmptyAppliesToPlaceholder : (container) => {return hideEmptyAppliesToPlaceholder(container);},
                showEmptyRefDocsPlaceholder : (container,hideAddExistingbutton) => {return showEmptyRefDocsPlaceholder(container,hideAddExistingbutton);},
                hideEmptyRefDocsPlaceholder : (container) => {return hideEmptyRefDocsPlaceholder(container);},
                registerListeners : () => {return registerListeners();}
        }
        return PlaceHolder;

    });

define('DS/ENXDecisionMgmt/Config/DecisionAppliesToGridViewConfig',
        ['DS/ENXDecisionMgmt/View/Grid/DecisionGridCustomColumns',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'], 
        function(DecisionGridCustomColumns,NLS) {

    'use strict';

  
    
    let DecisionAppliesToGridViewConfig= [

		   {
				text: NLS.title,
				dataIndex: 'tree',
			},{
				text: NLS.name,
				dataIndex: 'name'	
			},{
				text: NLS.type,
				dataIndex: 'typeNLS'
			},{
				text: NLS.revision,
				dataIndex: 'revision' 
			},{
				text: NLS.description,
				typeRepresentation: "editor",
				dataIndex: 'description'
			} ,{
		     	   text: NLS.IDcardMaturityState,
		           dataIndex: 'stateNLS'
			} 
            ];

    return DecisionAppliesToGridViewConfig;

});

/**
 * datagrid view for Agenda summary page
 */
define('DS/ENXDecisionMgmt/View/Grid/DecisionAppliesToDataGridView',
		[ 
			'DS/ENXDecisionMgmt/Config/DecisionAppliesToGridViewConfig',
            'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXDecisionMgmt/Config/Toolbar/DecisionAppliesToTabToolbarConfig',
            'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',          
            "DS/ENXDecisionMgmt/Utilities/DragAndDropManager"
			], function(
					DecisionAppliesToGridViewConfig,
                    WrapperDataGridView,
                    DecisionAppliesToTabToolbarConfig,
                    DecisionAppliesToModel,
					DragAndDropManager
            	    ) {

	'use strict';	
	let _toolbar, _dataGridInstance, _gridOptions = {};
	let build = function(model,data){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            'class': "appliesTo-gridView-View showView"
        });
        let toolbar = DecisionAppliesToTabToolbarConfig.writetoolbarDefination(model,data);
		 _gridOptions.cellDragEnabledFlag = true;
        let dataGridViewContainer = WrapperDataGridView.build(model, DecisionAppliesToGridViewConfig, toolbar, gridViewDiv, _gridOptions);
        
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

    let DecisionAppliesToDataGridView={
            build : (model,data) => { return build(model,data);},            
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return DecisionAppliesToDataGridView;
});


/**
 * @overview Displays the properties of a content.
 * @licence Copyright 2006-2020 Dassault Syst�mes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
define('DS/ENXDecisionMgmt/View/Properties/DecisionPropWidget', [
										'UWA/Class/View',
										'UWA/Core',
										'DS/EditPropWidget/EditPropWidget',
										'DS/EditPropWidget/constants/EditPropConstants',
										'DS/EditPropWidget/models/EditPropModel',
										'DS/Windows/Dialog',
										'DS/Windows/ImmersiveFrame',
										'DS/ENOXIDCard/js/IDCard',
										'UWA/Class/Model',
										'UWA/Drivers/Alone',
										'DS/ENXDecisionMgmt/Utilities/Utils',
										'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
										'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css'
], function(
		 View,
         Core,
         EditPropWidget,
         EditPropConstants,
         EditPropModel,
         WUXDialog, 
         WUXImmersiveFrame,
         IDCard,
         UWAModel,
         Alone,
         Utils,
         NLS
) {	
    var DecisionPropWidget = {
    	render: function (propContainer,data) {
			var that = this;
						
			var facets = [EditPropConstants.FACET_PROPERTIES/*,EditPropConstants.FACET_RELATIONS*/];
			that.parentContainer = this.container;
			var collabSpace;
	        if(widget.getPreference("collabspace")){
	        	collabSpace = widget.getPreference("collabspace").value;
	        }else if(widget.data.DecisionCredentials.securityContext){
	        	collabSpace = widget.data.DecisionCredentials.securityContext;
	        }
			var options_panel = {
					 typeOfDisplay: EditPropConstants.ONLY_EDIT_PROPERTIES, // Properties with ID card - ALL. ONLY_EDIT_PROPERTIES for only properties
			         selectionType: EditPropConstants.NO_SELECTION, // The edit properties panel will not listen the selection
			         'facets': facets,
			         'editMode': false,
			         'readOnly': false,
			         'context': {getSecurityContext: function () {return{SecurityContext: collabSpace}}},
			         'extraNotif': true,
			         
			         'events': {
                         'onNotification': function (infoObj) {
                        	 widget.meetingNotify.handler().addNotif({
                                 level: infoObj.eventID,
                                 subtitle: infoObj.msg,
                                 sticky: true
                             });
                         }
                     }
			         /*'actions': [{
                         name: "action_close_panel",
                         text: NLS.infoCloseAction,
                         icon: "close",
                         handler: function() {
                        	 widget.routeMgmtMediator.publish('route-info-close-click');
                         }
                     }]*/
			
                     /*'setCloseButton' : true,
                     events: {
 	                    'onCancel': function () {
 	                        alert("close");
 	                    }
                     }*/
			};
			if("Active"!=data.state){
				options_panel.readOnly = true;
			}
			this.EditPropWidget = new EditPropWidget(options_panel);
			
			if (data.id) {
				that.loadModel(data.id,propContainer);
			}

			 
			return this;
		},
		
		getPropModel:  function (objModel) {
			var resultElementSelected = [];
			var selection = new EditPropModel({
				metatype: 'businessobject',
				objectId: objModel.objectId,
				source: "3DSpace",
				tenant: widget.getValue("x3dPlatformId")
			});
			selection.set('isTransient', false);
			selection.addEvent('onSave', function (event) {
				Utils.getDecisionDataUpdated(objModel.objectId);
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
    
    return DecisionPropWidget;
});


define('DS/ENXDecisionMgmt/View/Facets/DecisionAllTabs', [
  'DS/Controls/TabBar',
  'DS/ENXDecisionMgmt/Config/DecisionFacets'
  
],
  function (WUXTabBar,DecisionFacets) {
	'use strict';
	let _decisionTabs, _currentTabIndex, DecisionTabInstances = {}, _decisionInfoModel = {},_container,_mode;
	
	let DecisionAllTabs = function(container, decisionInfoModel,mode){
		_decisionInfoModel = decisionInfoModel;
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
		var ntabs =["DecisionFacetProperties", "DecisionAttachments","DecisionAppliesTo","DecisionApplicability","DecisionRelations"];
		DecisionTabInstances[ntabs[seltab]].init(_decisionInfoModel);
		if(typeof _currentTabIndex != 'undefined'){
			DecisionTabInstances[ntabs[_currentTabIndex]].hideView();
		}			
		_currentTabIndex = seltab;		
	};
   
	DecisionAllTabs.prototype.init = function(){		
		_decisionTabs = new WUXTabBar({
            displayStyle: 'strip',
            showComboBoxFlag: true,
            editableFlag: false,
            multiSelFlag: false,
            reindexFlag: true,
            touchMode: true,
            centeredFlag: false,
            allowUnsafeHTMLOnTabButton: true
        });
		DecisionFacets.forEach((tab,index) => {
			if((_mode=="decisionCreate" && index==0) || (_mode!="decisionCreate" )){
				_decisionTabs.add(tab); 
			}
		    //adding the tabs
		});
		_decisionTabs.inject(this.container);
		
		//draw the tab contents
		initializeDecisionTabs();	
    };
    
    
    
	let initializeDecisionTabs = function(){		
		new Promise(function (resolve, reject){
			let promiseArr = [];
			DecisionFacets.forEach((tab, index)=>
			{				
				if((tab.loader != "")){
					promiseArr[index] = new Promise(function (resolve, reject){
						require([tab.loader], function (loader) {
							DecisionTabInstances[tab.id] = loader;	
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
			_decisionTabs.addEventListener('tabButtonClick', function(args){
				ontabClick(args);
			});
			_decisionTabs.addEventListener('change', function(args){
				ontabClick(args);
			});
			
		}, function () {
			//Error during tab click
		});
		
		
	};
	DecisionAllTabs.prototype.destroy = function(){	    	
		try{
			_currentTabIndex = undefined; //this should be the first line, if some error occurs afterward, that would be an issue otherwise	
			if(_decisionTabs != undefined){
				_decisionTabs.destroy();
			}
			Object.keys(DecisionTabInstances).map((tab) => {
				DecisionTabInstances[tab].destroy();
			});
			/*if(_decisionTabs != undefined){
				_decisionTabs.destroy();
			}*/
			_decisionInfoModel = {};
			this.container.destroy();
		}catch(e){
	    	//TODO check why this error: TypeError: Cannot read property '__resizeListeners__' of undefined
			//console.log(e);
		}	
	};   
	DecisionAllTabs.prototype.destroyContent = function(){
		//destroy content
		this.container.destroy();
		};
    
    return DecisionAllTabs;
  });

define('DS/ENXDecisionMgmt/View/Properties/DecisionIDCard', [
	'DS/WebappsUtils/WebappsUtils',
	'DS/ResizeSensor/js/ResizeSensor',
	'DS/ENXDecisionMgmt/Utilities/IdCardUtil',
	'DS/ENXDecisionMgmt/Utilities/VersionFacetIntegration',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
	'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css',
],
  function ( WebappsUtils, ResizeSensor, IdCardUtil, VersionFacetIntegration, NLS) {
	'use strict';
	let decisionIDCard;
	var DecisionHeaderView = function(container){
	  this.container = container;
	};
	
	DecisionHeaderView.prototype.resizeSensor = function(){
		  new ResizeSensor(decisionIDCard, function () {
			IdCardUtil.resizeIDCard(decisionIDCard.offsetWidth);
		});
	};
	
	DecisionHeaderView.prototype.init = function(data,infoIconActive,mode){
		//add all the required information in ugHeader like usergroup name 
		//Expander to expand the right panel
		decisionIDCard = new UWA.Element('div',{"id":"decisionIDCard","class":""});
		this.container.appendChild(decisionIDCard);
				
		//Info section //
		
		var infoAndThumbnailSec = new UWA.Element('div',{"id":"infoAndThumbnailSec","class":"id-card-info-and-thumbnail-section"});
		decisionIDCard.appendChild(infoAndThumbnailSec);
		
		// Add homeicon //
	/*	var homeIcon = UWA.createElement('div',{
			"id" : "decisionHome",
			"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-home fonticon-display fonticon-color-display",
			"title" : NLS.home,
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	goBackToTemplateHome();
                }
			}
		}).inject(infoAndThumbnailSec);  */
		
		// Add thumbnail //
		var thumbnailSec = new UWA.Element('div',{
			"id":"thumbnailSectionDecision",
			"class":"id-card-thumbnail-section",
			"html":[
				  UWA.createElement('div',{
					  "class":"id-card-thumbnail",
					  styles:{
						  "background-image": "url("+WebappsUtils.getWebappsAssetUrl('ENXDecisionMgmt','icons/iconLargeDecision.png')+")"
					  }
				  	})]
		});
		infoAndThumbnailSec.appendChild(thumbnailSec);
		
		var infoSec = new UWA.Element('div',{"id":"infoSecDecision","class":"id-card-info-section no-bottom-border"});
		infoAndThumbnailSec.appendChild(infoSec);
		
		// Info header will have title and Action //
		var infoHeaderSec = new UWA.Element('div',{"id":"infoHeaderSec","class":"id-card-header-section"});
		infoSec.appendChild(infoHeaderSec);
		
		var infoHeaderSecTitle = new UWA.Element('div',{"id":"infoHeaderSecTitle","class":"id-card-title-section"});
		infoHeaderSec.appendChild(infoHeaderSecTitle);
		
		UWA.createElement('h4',{
			  "html": [
				  UWA.createElement('span',{
					  "html": data.title,
					  "title": data.title
				  })]
		}).inject(infoHeaderSecTitle);
		
		// Header Section Actions //
		var infoHeaderSecAction = new UWA.Element('div',{"id":"infoHeaderSecAction","class":"id-card-actions-section"});
		infoHeaderSec.appendChild(infoHeaderSecAction);
		
		// header action - hide
		UWA.createElement('div',{
			"id" : "decisionexpandCollapse",
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
		var decisionDetails = {};
		var decisionDetailsData = [];
		// Delete function accept the data in format of data grid model //
		// So converting the data here to grid format to reuse the functionality //
		var gridFormat = {};
		gridFormat.options = {};
		gridFormat.options.grid = data;
		decisionDetailsData.push(gridFormat);
		decisionDetails.data = decisionDetailsData;
		require(['DS/ENXDecisionMgmt/View/Menu/DecisionContextualMenu'], function (DecisionContextualMenu) {
			DecisionContextualMenu.decisionIdCardCheveron(decisionDetails, data).inject(infoHeaderSecAction);
    	}); 
		// header action - info
	/*	var infoDisplayClass = "fonticon-color-display";
		if(infoIconActive){
			infoDisplayClass = "fonticon-color-active"; 
		}
		UWA.createElement('div',{
			"id":"routeInfoIcon",
			"title": NLS.idCardHeaderActionInfo,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-info fonticon-display " + infoDisplayClass + " ",
			styles : {"font-size": "20px"},
			events: {
                click: function (event) {
                	widget.routeMgmtMediator.publish('route-header-info-click', {model: data.model});
                }
			}
		}).inject(infoHeaderSecAction); */
		
		// Header Section Actions //
		//var infoHeaderSecAction = new UWA.Element('div',{"id":"infoHeaderSecAction","class":"id-card-actions-section"});
		//infoHeaderSec.appendChild(infoHeaderSecAction);
		
		var infoHeaderSecClose = new UWA.Element('div',{"id":"infoHeaderSecAction","class":"id-card-actions-section"});
		infoHeaderSec.appendChild(infoHeaderSecClose);
		
		UWA.createElement('div',{
			"id" : "taskViewPanelClose",
			"title" : NLS.DecisionIDCardCloseTooltip,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
			styles : {"font-size": "20px","float":"right"},
			events: {
                click: function (event) {
                	widget.meetingEvent.publish("decision-preview-close-click");
                }
			}
		}).inject(infoHeaderSecClose);
		
		// Info Detail Section //
		var infoDetailedSec = new UWA.Element('div',{"id":"infoDetailedSec","class":"id-card-detailed-info-section-decision"});
		infoSec.appendChild(infoDetailedSec);

		var infoChannel1 = new UWA.Element('div',{
													"id":"channel1Decision",
													"class":"properties-channel"
												});
		infoDetailedSec.appendChild(infoChannel1);
		
		  // owner Full name //
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": NLS.IDcardOwner + "&nbsp;:&nbsp;",
					  "class":""
				  	}),
				  UWA.createElement('span',{
					  "html": data.ownerFullName,
					  "class":""
				  	})
				  ]}).inject(infoChannel1);
				  
		  require(['DS/ENXDecisionMgmt/View/Menu/DecisionContextualMenu'], function (DecisionContextualMenu) {
			  //template state 
			  UWA.createElement('div',{
				  "class":"",
				  "html":[
					  UWA.createElement('label',{
						  "class": "",
						  "html": NLS.IDcardMaturityState + "&nbsp;:"
					  }),
					  UWA.createElement('span',{
						  "class":"decision-state-title "+data.state.toUpperCase().replace(/ /g,''),
						  "html": "&nbsp;" + data.Maturity_State + "&nbsp;",
						  styles:{
							  "margin-left": "5px"
						  }
					  }),
					  UWA.createElement('span',{
						  "html": DecisionContextualMenu.decisionIdCardStateCheveron(data),
						  "class":"",
						  styles:{
							  "margin-left": "5px"
						  }
					  })
					  ]}).inject(infoChannel1);
		  }); 
		  
		  // channel 2 //
		  var infoChannel2 = new UWA.Element('div',{
				"id":"channel2Decision",
				"class":"properties-channel"
		  });
		  infoDetailedSec.appendChild(infoChannel2);
		  
		// Revision
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": NLS.revision + "&nbsp;:&nbsp;",
					  "class":""
				  	}),
				  UWA.createElement('span',{
					  "html": decisionIdCardRevisionLink(data.id, data.revision),
					  "class":""
				  	})
				  ]}).inject(infoChannel2);
		  
		// Modified 
		  var date = new Date(data.modifiedDate);
		  UWA.createElement('div',{
			  "html":[
				  UWA.createElement('label',{
					  "html": NLS.modificationDateIdCard + "&nbsp;:&nbsp;",
					  "class":""
				  	}),
				  UWA.createElement('span',{
					  "html": date.toGMTString().parseRelativeTime(),
					  "class":""
				  	})
				  ]}).inject(infoChannel2);
    };
    
    DecisionHeaderView.prototype.destroyContainer = function(){
    	//destroy container
    	this.container.destroy();
    };
    DecisionHeaderView.prototype.destroyContent = function(){
    	//destroy content
    	decisionIDCard.destroy();
    };
    
    let collapseExpand = function(){
    	var expandCollapse = document.querySelector('#decisionexpandCollapse');
		  var decisionIDCardHeaderContainer = document.querySelector('#decisionHeaderContainer');
		  let attachmentContainer = document.querySelector('.decision-refDocuments-container');
		  let appliesToContainer = document.querySelector('.decision-appliesTo-container');
		  if(expandCollapse.className.indexOf("wux-ui-3ds-expand-up") > -1){
			  // collapse
			  expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-up", "wux-ui-3ds-expand-down");
			  decisionIDCardHeaderContainer.classList.add('minimized');
			  expandCollapse.title = NLS.idCardHeaderActionExpand;
			  if(attachmentContainer){attachmentContainer.setStyle("height","calc(100% - 94px)");}
			  if(appliesToContainer){appliesToContainer.setStyle("height","calc(100% - 94px)");}
		  }else{
			  // expand
			  expandCollapse.className = expandCollapse.className.replace("wux-ui-3ds-expand-down", "wux-ui-3ds-expand-up");
			  decisionIDCardHeaderContainer.classList.remove('minimized');
			  expandCollapse.title = NLS.idCardHeaderActionCollapse;
			  if(attachmentContainer){attachmentContainer.setStyle("height","calc(100% - 156px)");}
			  if(appliesToContainer){appliesToContainer.setStyle("height","calc(100% - 156px)");}
		  }
    };
   
   let decisionIdCardRevisionLink = function(id, revision){
    	
    	 var myElement = UWA.createElement('a');                 
         myElement.set({
           title: NLS.revision,
           text: revision,
           phyId: id,
           revision: revision,
           "class":"cursorPointer",
           events: {
        	   click: function () { 
        		   VersionFacetIntegration.launchVersionControlApp(this.getAttribute("phyid"));
        	   }
           }
         });  
                  
         return myElement;
    };
    
/*    let goBackToTemplateHome = function(){  	
    	widget.routeMgmtMediator.publish('route-triptych-show-toggle-button');
    	widget.routeMgmtMediator.publish('template-back-to-summary');
    	//close all right panels when summary page opens
    	widget.routeMgmtMediator.publish('route-info-close-click');
		widget.routeMgmtMediator.publish("route-task-close-click-view-mode");
		widget.routeMgmtMediator.publish("route-task-close-click-edit-mode");
		
    	require(['DS/ENORouteTemplateMgmt/Model/RouteTemplateModel'], function (RouteTemplateModel) {
    		widget.routeMgmtMediator.publish('route-widgetTitle-count-update',{model:RouteTemplateModel.getModel()});
    	});
    	widget.setValue('openedTemplateId', undefined);
    };  */
    
    return DecisionHeaderView;
    
});


/* global define, widget */
/**
 * @overview Template Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/View/Dialog/DecisionNewRevision', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXDecisionMgmt/Actions/DecisionActions',
		'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
		'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
	function(WAFData, UWACore, WUXDialog, WUXImmersiveFrame, WUXButton, DecisionActions, NLS) {
	'use strict';
	let DecisionNewRevision,dialog;
	let newRevisionConfirmation = function(options, actionFromIdCard){
		if(options.data === undefined){
			// Route summary Toolbar Menu Delete Argument ids are not passed //
			//removeDetails = RouteTemplateModel.getSelectedRowsModel(); TODO 
		}
		if(options.data.length < 1){
			widget.notify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorDecisionReviseSelection, //TODO add NLS for new revision error
			    sticky: false
			});
    		return;
    	}
		var idToRevise = [];
		var confirmDisabled = false;
		let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body);  
    	let dialogueContent = new UWA.Element('div',{
    			"id":"reviseTemplateWarning",
    			"class":""
    			});
    	var header = NLS.reviseDecisionHeader + options.data[0].options.grid.name;
    	
		if(options.data[0].options.grid.id){
			idToRevise.push(options.data[0].options.grid.id);
			dialogueContent.appendChild(UWA.createElement('div',{
				"class":"",
				"html": NLS.reviseDecisionWarning
			  }));
			dialogueContent.appendChild(UWA.createElement('div',{
    			"class":"",
				"html": NLS.reviseDecisionWarningDetailSingle
    		}));
			dialogueContent.appendChild(UWA.createElement('div',{
				"class":""
		  }));
			
		} /*else{
			confirmDisabled = true;
			dialogueContent.appendChild(UWA.createElement('div',{
				"class":"",
				"html": NLS.reviseDecisionWarningDetail2Single
			}));
			dialogueContent.appendChild(UWA.createElement('div',{
				"class":""
		  }));
			
		} */
		
    	dialog = new WUXDialog({
    		   	modalFlag : true,
    		   	width : 500,
    		   	height : 200,
    		   	title: header,
    		   	content: dialogueContent,
    		   	immersiveFrame: immersiveFrame,
    		   	buttons: {
    		   		Ok: new WUXButton({
    		   			label: NLS.Revise,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				reviseConfirmed(idToRevise,actionFromIdCard);
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
    
    let reviseConfirmed = function(id,actionFromIdCard){
    	DecisionActions.reviseDecision(id,actionFromIdCard).then(
				success => {
					
					var successMsg = NLS.successRevise;
					widget.meetingNotify.handler().addNotif({
						level: 'success',
						subtitle: successMsg,
					    sticky: false
					});
				/*	var options = {};
					options.data = success[0];
					options.action = actionFromIdCard;
					widget.meetingEvent.publish('decision-summary-delete-row-by-ids',{model:id});
					widget.meetingEvent.publish('decision-summary-append-rows',options);  */
				},
				failure =>{
					var response = JSON.parse(failure);
					if(response.error){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: response.error,
						    sticky: false
						});
					}else{
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorRevise,
						    sticky: false
						});
					}
				});
		
    	dialog.close();
	}
    
    DecisionNewRevision={
    		newRevisionConfirmation: (options, actionFromIdCard) => {return newRevisionConfirmation(options, actionFromIdCard);}
    };
    
    return DecisionNewRevision;
});

define('DS/ENXDecisionMgmt/View/Dialog/DecisionView',
        [  'DS/ENXDecisionMgmt/View/Properties/DecisionPropWidget'
            ], function(
            		DecisionPropWidget
            ) {

    'use strict';
    let build = function(data){
        if(!showView()){//member view has never been rendered
        	let containerDiv = UWA.createElement('div', {id: 'decisionView','class':'decisionfacet-properties-container'}); 
        	containerDiv.inject(document.querySelector('.decision-facets-container'));
        	DecisionPropWidget.render(containerDiv,data);
        }
    };

    let hideView= function(){
        if(document.getElementById('decisionView') != null){
            document.getElementById('decisionView').style.display = 'none';
           
        }
    };
    
    let showView= function(){
        if(document.querySelector('#decisionView') != null){
            document.getElementById('decisionView').style.display = 'block';
            return true;
        }
        return false;
    };
    
    let destroy= function() {
    	document.querySelector('#decisionView').destroy();
    	
    };
    let DecisionView = {
            init : (data) => { return build(data);},        
            hideView: () => {hideView();},
            destroy: () => {destroy();}
    };

    return DecisionView;
});








/* global define, widget */
/**
  * @overview Meeting - Storage model
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXDecisionMgmt/Model/CollabStorageModel', [
    'UWA/Core',
    'UWA/Class/Model',
    'DS/ENXDecisionMgmt/Controller/DecisionBootstrap'
], function(
    UWACore,
    UWAModel,
    DecisionBootstrap
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
            UWACore.extend(options, DecisionBootstrap.getSyncOptions(), true);

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

define('DS/ENXDecisionMgmt/View/Properties/DecisionIDCardFacets', [
  'DS/ENXDecisionMgmt/View/Properties/DecisionIDCard',
  'DS/ENXDecisionMgmt/View/Facets/DecisionAllTabs',
  'DS/ENXDecisionMgmt/Utilities/DataFormatter',
  'DS/ENXDecisionMgmt/View/Dialog/DecisionView',
  'DS/ENXDecisionMgmt/Utilities/IdCardUtil'
],
  function (DecisionIDCard, DecisionAllTabs, DataFormatter,DecisionView, IdCardUtil) {
	'use strict';
	let headerContainer, facetsContainer, idLoaded, decisionDataUpdatedToken, decisionDataDeletedToken;
	const destroyViews = function(){
		new DecisionIDCard(headerContainer).destroyContainer();
	    new DecisionAllTabs(facetsContainer).destroy();
	    if(decisionDataDeletedToken){
    		widget.meetingEvent.unsubscribe(decisionDataDeletedToken);
    	}
		
    };
	var DecisionIDCardFacets = function(rightPanel,mode){
		this.rightPanel = rightPanel;
	  	
		headerContainer = new UWA.Element('div',{"id":"decisionHeaderContainer","class":"decision-header-container"/*,styles:{"height":"15%"}*/});
	  	facetsContainer = new UWA.Element('div',{"id":"decisionFacetsContainer","class":"decision-facets-container"/*,styles:{"height":"80%"}*/});	 	
	};
	DecisionIDCardFacets.prototype.init = function(data,mode){	
		destroyViews(); //to destroy any pre-existing views
		var infoIconActive = false;
		//initEnoviaBootstrap();
		new DecisionIDCard(headerContainer).init(data,infoIconActive,mode);
		idLoaded = data.id;
		new DecisionAllTabs(facetsContainer, data,mode).init();
		if(mode!= "decisionCreate")
		{
	 	this.rightPanel.appendChild(headerContainer);
		} else {
			facetsContainer.setStyle("height","94%");
		}

		this.rightPanel.appendChild(facetsContainer);
	 	new DecisionIDCard(headerContainer).resizeSensor();
	 	//IdCardUtil.resizeIDCard(headerContainer.offsetWidth);
	 	
	 	// Events //
	 	decisionDataUpdatedToken = widget.meetingEvent.subscribe('decision-data-updated', function (data) {
	 		var dataModel = {model:DataFormatter.decisionGridData(data)};
	 		// check if meeting details updated are same loaded in the id card //
	 		// Case when meeting1 is loaded and in meeting summary page user does action on meeting2 //
	 		// then do not refresh id card //
	 		if(dataModel.model.id == idLoaded){
	 			// On meeting properties save, refresh only header data //
	 			// Clear the existing id card header data. Do no destroy the container, only content for refresh header data//
	 			//var infoIconActive = IdCardUtil.infoIconIsActive();      
	 			new DecisionIDCard(headerContainer).destroyContent();
	 			new DecisionIDCard(headerContainer).init(dataModel.model,infoIconActive);
	 			new DecisionIDCard(headerContainer).resizeSensor();
	 			IdCardUtil.resizeIDCard(headerContainer.offsetWidth);
	 			//new DecisionAllTabs(facetsContainer).destroy();
	 			//new DecisionAllTabs(facetsContainer, dataModel.model,"decision").init();
	 			//new DecisionAllTabs(facetsContainer).destroyContent();
	 			//document.querySelector('#decisionFacetsContainer').destroy();
	 			//new DecisionAllTabs(facetsContainer, dataModel.model,"decision").init();
	 			//require(['DS/ENXDecisionMgmt/View/Dialog/DecisionView'], function(decisionView) {
	 				//DecisionView.init(dataModel.model);
	 			//});
	 			//new DecisionAllTabs(facetsContainer).destroy();
	 			//new DecisionAllTabs(facetsContainer, dataModel.model,"decision").init();
	 		/*	if(widget.propWidgetOpen){
	        		 // To persist the edit prop widget open //
	 				if(data.requestFrom && data.requestFrom == "editPropWidget"){
	 					// do not refresh the edit prop widget // 
	 					// the request is coming from edit prop widget itself //
	 				}else{
	 					widget.meetingEvent.publish('meeting-header-info-click', {model: dataModel.model});
	 				}
	        	} */
	 		}
	 	});
	 	decisionDataDeletedToken = widget.meetingEvent.subscribe('decision-data-deleted', function (data) {
	 		if(data.model.includes(idLoaded)){
	 			// close the id card only if the meeting opened in id card is been deleted and go to meeting home summary page //
	 			widget.meetingEvent.publish('decision-preview-close-click');
	 		}
	 	});
	 	
	 	
    };
    DecisionIDCardFacets.prototype.destroy = function(){
    	//destroy
    	this.rightPanel.destroy();
    };
    /*let  initEnoviaBootstrap = function(){
    	return new Promise(function(resolve, reject) {
    	require(['DS/ENXDecisionMgmt/Controller/DecisionBootstrap',
	         'DS/ENXDecisionMgmt/Collections/CollabStorageCollection'], function(Bootstrap,CollabStorageCollection) {
       		
		var _storages = new CollabStorageCollection();
		
		Bootstrap.init({
	                id: widget.id,
	                collection: _storages,
	            });
		});
    	});
    };*/
    
    return DecisionIDCardFacets;

  });

/* global define, widget */
/**
  * @overview Meeting
  * @licence Copyright 2006-2021 Dassault Systemes company. All rights reserved.
  * @version 1.0.
  * @access private
  */
define('DS/ENXDecisionMgmt/Collections/CollabStorageCollection',
[
    'UWA/Core',
    'UWA/Utils',
    'UWA/Class/Collection',
    'DS/PlatformAPI/PlatformAPI',
    'DS/ENXDecisionMgmt/Model/CollabStorageModel',
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
                        if(role.id === 'CHG' || role.id === 'UWU' || role.id === 'InternalDS') {
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
define('DS/ENXDecisionMgmt/View/Dialog/RemoveReferenceDocuments', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
		'DS/ENXDecisionMgmt/Utilities/Utils',
		'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
		 'DS/ENXDecisionMgmt/Actions/ReferenceDocumentActions',
		'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
		'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
	function(WAFData, UWACore, WUXDialog, WUXImmersiveFrame, WUXButton,  DecisionReferenceDocumentsModel, Utils, WrapperTileView, WrapperDataGridView,  ReferenceDocumentActions, NLS) {
	'use strict';
	let RemoveRefDocsItems,dialog;
	let removeConfirmation = function(removeDetails,selectedDetails){

		if(removeDetails.data === undefined){
			removeDetails = DecisionReferenceDocumentsModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorRefDocsRemoveSelection,
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
			idsToDelete.push(removeDetails.data[i].options.grid.id);
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
    			"id":"removeRefDocsWarning",
    			"class":""
    			});
    	var header = "";
    	if(idsToDelete.length > 0){
    		if(idsToDelete.length == 1){
    			header = NLS.removeRefDocsHeaderSingle
    		}else{
    			header = NLS.removeRefDocsHeader;
    		}
        	header = header.replace("{count}",idsToDelete.length);
        	
        	if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeRefDocsWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeRefDocsWarningDetail
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
    		   			label: NLS.Delete,
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
		var decisionId = tileView.TreedocModel.decisionId;
		ReferenceDocumentActions.removeRefDocs(decisionId,ids);
		dialog.close();
	}
    
    RemoveRefDocsItems={
    		removeConfirmation: (removeDetails,selectedDetails) => {return removeConfirmation(removeDetails,selectedDetails);}
    };
    
    return RemoveRefDocsItems;
});

/* global define, widget */
/**
 * @overview Meeting widget
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/View/Dialog/RemoveAppliesToItems', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
		'DS/ENXDecisionMgmt/Utilities/Utils',
		'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
		'DS/ENXDecisionMgmt/Actions/DecisionAppliesToActions',
		'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
		'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
	function(WAFData, UWACore, WUXDialog, WUXImmersiveFrame, WUXButton,  DecisionAppliesToModel, Utils, WrapperTileView, WrapperDataGridView,  DecisionAppliesToActions, NLS) {
	'use strict';
	let RemoveAppliesToItems,dialog;
	let removeConfirmation = function(removeDetails,selectedDetails){

		if(removeDetails.data === undefined){
			removeDetails = DecisionAppliesToModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorAppliesToRemoveSelection,
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
			idsToDelete.push(removeDetails.data[i].options.grid.id);
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
    			header = NLS.removeAppliesTotHeaderSingle
    		}else{
    			header = NLS.removeAppliesTotHeader;
    		}
        	header = header.replace("{count}",idsToDelete.length);
        	
        	if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeAppliesToWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeAppliesToWarningDetail
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
    		   			label: NLS.Delete,
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
		var decisionId = tileView.TreedocModel.decisionId;
		DecisionAppliesToActions.removeAppliesTo(decisionId,ids);
		dialog.close();
	}
    
    RemoveAppliesToItems={
    		removeConfirmation: (removeDetails,selectedDetails) => {return removeConfirmation(removeDetails,selectedDetails);}
    };
    
    return RemoveAppliesToItems;
});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/View/Menu/ReferenceDocumentsContextualMenu', [
        'DS/Menu/Menu',
        'DS/ENXDecisionMgmt/Actions/ReferenceDocumentActions',
        'DS/ENXDecisionMgmt/View/Dialog/RemoveReferenceDocuments',
        'DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
        'DS/ENXDecisionMgmt/View/Menu/DecisionOpenWithMenu',
        'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
		'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
    function(WUXMenu, ReferenceDocumentActions,RemoveReferenceDocuments,DecisionReferenceDocumentsModel,DecisionOpenWithMenu, NLS){
        'use strict';
        let Menu;
       
        let refDocsGridRightClick = function(event,data){
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
            var selectedDetails = DecisionReferenceDocumentsModel.getSelectedRowsModel();
            var menu = [];
            
          
        	menu = menu.concat(deleteMenu(selectedDetails,false));
        	if(selectedDetails.data && selectedDetails.data.length == 1){
        		var contextOpenWithData = {};
        		contextOpenWithData.Id = selectedDetails.data[0].options.grid.id;
        		contextOpenWithData.Type = selectedDetails.data[0].options.grid.type;
        		contextOpenWithData.Title = selectedDetails.data[0].options.grid.title;
        		getOpenWithMenu(contextOpenWithData).then(function(openWithMenu){
        			menu = menu.concat(openWithMenu);
        			if(menu.length!=0)
        				WUXMenu.show(menu, config);
                	});
        	}else{
        		if(menu.length!=0)
        			WUXMenu.show(menu, config);
        	}
		};
		    
		let getOpenWithMenu = function(data){
        	let menu = [];
        	return new Promise(function(resolve, reject) {
        		DecisionOpenWithMenu.getOpenWithMenu(data).then(				
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
		
        let deleteMenu = function(removeDetails){
			// Display menu
        	let showDeleteCmd =false;
			/*if(removeDetails.data.length === 1 && removeDetails.data[0].options.grid.DeleteAccess != "TRUE"){
				showDeleteCmd = false;
			}*/			
			if(DecisionReferenceDocumentsModel.getModel().decisionModel && DecisionReferenceDocumentsModel.getModel().decisionModel.modifyAccess == "TRUE"){
				showDeleteCmd = true;
			}
		/*	if(removeDetails.data.length === 1 && removeDetails.data[0].options.grid.DeleteAccess != "TRUE"){
				showDeleteCmd = false;
			}			*/
			var menu = [];
			if(showDeleteCmd){
				 menu.push({
		                name: NLS.RemoveRefDocs,
		                title: NLS.RemoveRefDocs,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                    	RemoveReferenceDocuments.removeConfirmation(removeDetails);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
		 
	        
        
        Menu={
            refDocsGridRightClick: (event,data) => {return refDocsGridRightClick(event,data);}
            
        };
        
        return Menu;
    });


define('DS/ENXDecisionMgmt/View/Form/DecisionCreateViewUtil',
[
	'DS/ENXDecisionMgmt/Utilities/SearchUtil',
	'DS/ENXDecisionMgmt/Controller/DecisionController',
	'DS/ENXDecisionMgmt/Model/DecisionModel',
	'DS/ENXDecisionMgmt/Utilities/AutoCompleteUtil',
	'DS/Tree/TreeNodeModel',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',	
	'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css'
],
function(SearchUtil,DecisionController,DecisionModel, AutoCompleteUtil, TreeNodeModel, NLS) {    
		"use strict";
		let DecisionCreateViewUtil = {
				launchOwnerSearch : function(event,agndaProperties,meetnginfo){
					
					var that = event.dsModel;
					var socket_id = UWA.Utils.getUUID();
					require(['DS/SNInfraUX/SearchCom'], function(SearchCom) {
						var searchcom_socket = SearchCom.createSocket({
							socket_id: socket_id
						});
						
						var recentTypes = ["Person"];
						var refinementToSnNJSON = SearchUtil.getRefinementToSnN(socket_id,"searchOwner",false,recentTypes);
						// Override the source in refinementToSnNJSON for 3dspace and user groupwin only in case of user group //
						if(!(widget.data.x3dPlatformId == "OnPremise")){
							var source = ["3dspace"];
							refinementToSnNJSON.source = source;
						}
						
						var precondAndResourceIdIn = SearchUtil.getPrecondForOwnerSearch();
						refinementToSnNJSON.precond = precondAndResourceIdIn.precond;
						//refinementToSnNJSON.resourceid_in = getAttendeesIDs(meetnginfo);
						//refinementToSnNJSON.resourceid_not_in = UserGroupMemberModel.getDecisionIDs();
						if (UWA.is(searchcom_socket)) {
							searchcom_socket.dispatchEvent('RegisterContext', refinementToSnNJSON);
							searchcom_socket.addListener('Selected_Objects_search', selected_Objects_search.bind(that,agndaProperties));
							// Dispatch the in context search event
							searchcom_socket.dispatchEvent('InContextSearch', refinementToSnNJSON);
						} else {
							throw new Error('Socket not initialized');
						}
					});
				},
					
				decisionActionUpdate : function(agendadata,decisionCreateProperties,meetnginfo){
					var valName,valTitle =false;
					// validation for Name
					/*if((decisionCreateProperties.elements.name.value == "" || decisionCreateProperties.elements.name.value.trim() == "") && !(decisionCreateProperties.elements.autoNameCheckbox.value) ){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorName,
						    sticky: false
						});
						return;
					}*/
					
					/*// validation for Title
					if(decisionCreateProperties.elements.title.value =="" || decisionCreateProperties.elements.title.value.trim() == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorTitle,
						    sticky: false
						});
						return;
					} 	*/			

					var jsonData = {};
					var dataElements = {};
					var data =[]
					var description, name, title, owner  ='';
					//jsonData.data = data;
					if(decisionCreateProperties.elements.description.value){
						 description = decisionCreateProperties.elements.description.value;
						 jsonData.description = description;
					}
					/*if(decisionCreateProperties.elements.name.value){
						name = decisionCreateProperties.elements.name.value;
						jsonData.name = name;
					}*/
					if(decisionCreateProperties.elements.title.value){
						title = decisionCreateProperties.elements.title.value;
						jsonData.title = title;
							}
					/*if(decisionCreateProperties.elements.owner.value){
						owner = decisionCreateProperties.elements.owner.value;
						jsonData.owner = owner;
						}*/
					if(decisionCreateProperties.elements.owner.options.decisionOwnerActualValue){
						owner = decisionCreateProperties.elements.owner.options.decisionOwnerActualValue;
						jsonData.owner = owner;
						}
					else {
						if (decisionCreateProperties.elements.owner.selectedItems) {
							owner = decisionCreateProperties.elements.owner.selectedItems.options.decisionOwnerActualValue;
							if(owner == undefined || owner == "" && decisionCreateProperties.elements.owner.selectedItems.options.identifier){
								owner = decisionCreateProperties.elements.owner.selectedItems.options.identifier;
							}
						}
						else {
							owner = meetnginfo.model.Owner;
						}
						jsonData.owner = owner;
					}
					if(meetnginfo.model.meetingId){
						jsonData.parentID = meetnginfo.model.meetingId;
					}
					dataElements.dataelements = jsonData
							data.push(dataElements);
					
					
					DecisionController.createDecision(data,meetnginfo).then(
							success => {
								widget.meetingEvent.publish('decision-create-close-click');
								var successMsg = NLS.DecisionCreateSuccessMsg;
								widget.meetingNotify.handler().addNotif({
									level: 'success',
									subtitle: successMsg,
								    sticky: false
								});
					    		DecisionModel.appendRowsforCreate(success);
							},
							failure =>{
								decisionCreateProperties.elements.save.disabled = false;
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
				validateDecision : function(decisionCreateProperties) {
		
					// validation for Title
					if(decisionCreateProperties.elements.title.value =="" || decisionCreateProperties.elements.title.value.trim() == ""){
						widget.meetingNotify.handler().addNotif({
							level: 'error',
							subtitle: NLS.errorTitle,
						    sticky: false
						});
						return false;
					}
					else
						return true;	
			}
		
		};
		
		
		/*let selected_TopicItems_search = function(decisionCreateProperties,data){
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
				decisionCreateProperties.elements.topciItem.options.topciItemId = topicIttemsDisplayId;
				decisionCreateProperties.elements.topciItem.value = topicIttemsDisplayValue;
				decisionCreateProperties.elements.topciItem.options.topciItemType = topicIttemsTypes;
			}
				
		};
*/		
		let selected_Objects_search = function(decisionCreateProperties,data){
			if(data[0]["ds6w:type_value"] == "Person"){
					
				var node = new TreeNodeModel(
								{
									label : data[0]["ds6w:label"].unescapeHTML(),
									value : data[0]["ds6w:identifier"],
									name  : data[0]["ds6w:identifier"],
									identifier:data[0]["ds6w:identifier"],
									type:data[0]["ds6w:type"],
									id: data[0].id
								});
										
				// Person selected //
				decisionCreateProperties.elements.owner._model.removeRoots();
				decisionCreateProperties.elements.owner._model.addChild(node);
				decisionCreateProperties.elements.owner._model.getChildren()[0].select();
				//decisionCreateProperties.elements.owner.value = data[0]["ds6w:label"].unescapeHTML();
				decisionCreateProperties.elements.owner.options.decisionOwnerDisplayValue = data[0]["ds6w:label"].unescapeHTML();
				//decisionCreateProperties.elements.owner.value =data[0]["ds6w:identifier"]
			}
			//decisionCreateProperties.elements.owner.options.speakerId = data[0].id;
			if(data[0]["ds6w:type"].includes("Person")){
				decisionCreateProperties.elements.owner.options.speakerType = data[0]["ds6w:type_value"].unescapeHTML();
			}
			decisionCreateProperties.elements.owner.options.decisionOwnerActualValue  = data[0]["ds6w:identifier"];
			
			
		};
		
		return DecisionCreateViewUtil;
});


/**
 * datagrid view for decision summary page
 */
define('DS/ENXDecisionMgmt/View/Tile/DecisionReferenceDocumentsTileView',
        [   
            'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENXDecisionMgmt/View/Menu/ReferenceDocumentsContextualMenu',            
            "DS/ENXDecisionMgmt/Utilities/DragAndDropManager",
			'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css'
            ], function(
                    WrapperTileView,
                    ReferenceDocumentsContextualMenu,
                    DragAndDropManager
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
        var tileViewDiv = UWA.createElement("div", {id:'DecisionRefDocsTileViewContainer',
        	  styles: {
                  'width': "100%",
                  'height': "calc(100% - 40px)",
                  'position': "relative"
              },        
            'class': "refDocs-tileView-View hideView"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv, true);//true passed to enable drag and drop
        registerDragAndDrop();
        return dataTileViewContainer;
    };  

   let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                    ReferenceDocumentsContextualMenu.refDocsGridRightClick(params.data.event,_model);
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

    let DecisionReferenceDocumentsTileView={
            build : (model) => { return build(model);} ,
            contexualMenuCallback : () =>{return contexualMenuCallback();}

    };

    
    return DecisionReferenceDocumentsTileView;
});

define('DS/ENXDecisionMgmt/View/Facets/DecisionReferenceDocuments', [
	'DS/EditPropWidget/facets/Common/FacetsBase',
	'DS/ENXDecisionMgmt/Controller/DecisionController',
	'DS/ENXDecisionMgmt/Model/DecisionReferenceDocumentsModel',
	'DS/ENXDecisionMgmt/View/Grid/DecisionReferenceDocumentsDataGridView',
	'DS/ENXDecisionMgmt/View/Tile/DecisionReferenceDocumentsTileView',
	'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
	'DS/ENXDecisionMgmt/Utilities/PlaceHolder',
    'DS/ENXDecisionMgmt/Utilities/DragAndDrop',
    'DS/ENXDecisionMgmt/Utilities/DragAndDropManager',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
], function(FacetsBase,DecisionController,DecisionReferenceDocumentsModel,DecisionReferenceDocumentsDataGridView, DecisionReferenceDocumentsTileView, WrapperDataGridView, PlaceHolder, DropZone, DragAndDropManager, NLS){
'use strict';

let _ondrop, access;
let  build =function(data){
	 if(!showView()){
		 access = data.modifyAccess == "TRUE" ? true : false;
		 let containerDiv= UWA.createElement('div', {id: 'decisionRefDocsContainer','class':'decision-refDocuments-container'}); 
		 containerDiv.inject(document.querySelector('.decision-facets-container'));
       	 DropZone.makeDroppable(containerDiv, _ondrop);
		 DecisionController.fetchDecisionRefDocs(data.id).then(function(response) {
			 DecisionReferenceDocumentsModel.destroy();
			 DecisionReferenceDocumentsViewModel(response,data);
			 drawReferenceDocumentsView(containerDiv,data);
		 }); 
	
            //drag and drop initialize to store DecisionReferenceDocuments data
            DragAndDropManager.init(data);
	 }	
};

_ondrop = function(e, target){
    	DragAndDropManager.onDropManager(e, access,"RefDocs");
};

let drawReferenceDocumentsView = function(containerDiv,data){
    let datagridDiv = DecisionReferenceDocumentsDataGridView.build(DecisionReferenceDocumentsModel.getModel(),data);
    let tileViewDiv = DecisionReferenceDocumentsTileView.build(DecisionReferenceDocumentsModel.getModel());
    let refDocsTabToolbar = DecisionReferenceDocumentsDataGridView.getGridViewToolbar();
    
    
    let toolBarContainer = UWA.createElement('div', {id:'dataGridRefDocsDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
    refDocsTabToolbar.inject(toolBarContainer);
    
    tileViewDiv.inject(containerDiv);
    datagridDiv.inject(containerDiv);
    var hideAddbutton = false;
    if(data.modifyAccess != "TRUE") {
    	hideAddbutton = true;
	}
    if (DecisionReferenceDocumentsModel.getModel().getChildren().length ==0 ) {
        PlaceHolder.showEmptyRefDocsPlaceholder(containerDiv,hideAddbutton);
    }
    DecisionReferenceDocumentsTileView.contexualMenuCallback();
    registerListners();

    return containerDiv;
};
let openContextualMenu = function (e, cellInfos) {
	if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
        if (e.button == 2) {
            require(['DS/ENXDecisionMgmt/View/Menu/ReferenceDocumentsContextualMenu'], function (ReferenceDocumentsContextualMenu) {
            	ReferenceDocumentsContextualMenu.refDocsGridRightClick(e,cellInfos.nodeModel.options.grid);
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
	widget.meetingEvent.subscribe('toolbar-Decisiondata-updated', function (data) {
		DecisionReferenceDocumentsModel.getModel().decisionModel = data;
    	if(data.modifyAccess == "TRUE") {
    		showRefAddButton(true);
    		showRefDeleteButton(true);
		}
		else{
			showRefAddButton(false);
			showRefDeleteButton(false);
		} 
    	
	}); 
};

let showRefAddButton = function(flag){
	let refDecisionToolbar = DecisionReferenceDocumentsDataGridView.getGridViewToolbar();
	let addref = refDecisionToolbar.getNodeModelByID("addRefDocs");
    if (addref) {
    	addref.updateOptions({
        visibleFlag: flag
      });
    }
};

let showRefDeleteButton = function(flag){
	let refDecisionToolbar = DecisionReferenceDocumentsDataGridView.getGridViewToolbar();
	let deleteref = refDecisionToolbar.getNodeModelByID("deleteRefDocs");
    if (deleteref) {
    	deleteref.updateOptions({
        visibleFlag: flag
      });
    }
};



let DecisionReferenceDocumentsViewModel = function(serverResponse,model){      
	DecisionReferenceDocumentsModel.createModel(serverResponse);
	DecisionReferenceDocumentsModel.getModel().decisionId = model.id;
	DecisionReferenceDocumentsModel.getModel().decisionModel = model;
};


let hideView= function(){
    if(document.getElementById('decisionRefDocsContainer') != null){
        document.getElementById('decisionRefDocsContainer').style.display = 'none';
    }
};

let showView= function(){
    if(document.querySelector('#decisionRefDocsContainer') != null){
        document.getElementById('decisionRefDocsContainer').style.display = 'block';
		DropZone.makeDroppable(document.getElementById('decisionRefDocsContainer'), _ondrop); 
        return true;
    }
    return false;
};

let destroy= function() {
	document.querySelector('#decisionRefDocsContainer').destroy();
	DecisionReferenceDocumentsModel.destroy();
};

let  DecisionReferenceDocuments =  {
	init : (data) => { return build(data);},        
    hideView: () => {hideView();},
    destroy: () => {destroy();}
};



return DecisionReferenceDocuments;
});


define('DS/ENXDecisionMgmt/Config/DecisionGridViewConfig',
        ['DS/ENXDecisionMgmt/View/Grid/DecisionGridCustomColumns',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'], 
        function(DecisionGridCustomColumns,NLS) {

    'use strict';

  
    
    let DecisionGridViewConfig= [{
              text: NLS.title,
              dataIndex: 'tree',
              editableFlag: false             
            },{
                text: NLS.name,
                dataIndex: 'name',
               // dataIndex: 'tree',
                editableFlag: false             
              },{
            	text: NLS.revision,
				dataIndex: 'revision'
            },{
              text: NLS.creationDate,
              dataIndex: 'creationDate',
              editableFlag: false ,
              'onCellRequest':DecisionGridCustomColumns.onDecisionNodeDateCellRequest           
            },{
                text: NLS.IDcardMaturityState,
                dataIndex: 'Maturity_State',
                editableFlag: false,
                'onCellRequest':DecisionGridCustomColumns.onDecisionNodeStateCellRequest             
              }, {
					text: NLS.description,
					typeRepresentation: "editor",
                  dataIndex: 'description'
             },  {
	             text: NLS.IDcardOwner,
	             dataIndex: 'ownerFullName',
	             editableFlag: false,
	            'onCellRequest':DecisionGridCustomColumns.onDecisionNodeOwnerCellRequest
            }
            ];

    return DecisionGridViewConfig;

});

/**
 * datagrid view for Decision summary page
 */
define('DS/ENXDecisionMgmt/View/Grid/DecisionDataGridView',
		[ 
			'DS/ENXDecisionMgmt/Config/DecisionGridViewConfig',
            'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
            'DS/ENXDecisionMgmt/Config/Toolbar/DecisionTabToolbarConfig',
            "DS/ENXDecisionMgmt/Utilities/DragAndDropManager"                
			], function(
					DecisionGridViewConfig,
                    WrapperDataGridView,
                    DecisionTabToolbarConfig,
					DragAndDropManager 
            	    ) {

	'use strict';	
	let _toolbar, _dataGridInstance, _gridOptions = {};
	let build = function(model){
        var gridViewDiv = UWA.createElement("div", {id:'dataGridViewContainer',
            styles: {
                'width': "100%",
                'height': "calc(100% - 40px)",
                'position': "relative"
            },
            'class': "Decision-gridView-View showView"
        });
        let toolbar = DecisionTabToolbarConfig.writetoolbarDefination(model);
		_gridOptions.cellDragEnabledFlag = true;
        let dataGridViewContainer = WrapperDataGridView.build(model, DecisionGridViewConfig, toolbar, gridViewDiv, _gridOptions);
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

    let DecisionDataGridView={
            build : (model) => { return build(model);},            
            getGridViewToolbar: () => {return getGridViewToolbar();}
    };

    return DecisionDataGridView;
});


define("DS/ENXDecisionMgmt/Config/Toolbar/ToggleViews",
        ['DS/ENXDecisionMgmt/View/Grid/DecisionDataGridView',
        	'DS/ENXDecisionMgmt/View/Grid/DecisionAppliesToDataGridView',
        	'DS/ENXDecisionMgmt/View/Grid/DecisionReferenceDocumentsDataGridView',
         'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
], function(DecisionDataGridView ,DecisionAppliesToDataGridView,DecisionReferenceDocumentsDataGridView,NLS) {
    "use strict";
    let gridViewClassName,tileViewClassName,viewIcon;
    var ToggleViews = {

            /*
             * Method to change view from Grid View to Tile View Layout and vice-versa
             */
            
            doToggleView: function(args) {
                switch(args.curPage){
                    case "DecisionSummary" : 	gridViewClassName=".Decision-gridView-View";
                                            	tileViewClassName=".Decision-tileview-container";
                                            	viewIcon = DecisionDataGridView.getGridViewToolbar().getNodeModelByID("view");
                                            	break;
                                            	
                    case "AppliesToTab"  :  	gridViewClassName=".appliesTo-gridView-View";
						                    	tileViewClassName=".appliesTo-tileView-View";
						                    	viewIcon = DecisionAppliesToDataGridView.getGridViewToolbar().getNodeModelByID("view");
						                    	break;
						                    	
                    case "RefDocsTab" 	 :  	gridViewClassName=".refDocs-gridView-View";
						                    	tileViewClassName=".refDocs-tileView-View";
						                    	viewIcon = DecisionReferenceDocumentsDataGridView.getGridViewToolbar().getNodeModelByID("view");
						                    	break;
						                    	
                    default              :      Console.log("Incorrect arguments in config file.");
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
 * @overview Meetings
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/Services/LifeCycleServices', [
	'DS/ENXDecisionMgmt/Utilities/Utils',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
	], 
	function(Utils, NLS) {
	'use strict';
	let lifeCycle = function(decisionDetails,reqType){
    	require(['DS/LifecycleCmd/MaturityCmd'], function (MaturityCmd) {
    		var arrOfPhysicalIds = [];
    		var decisionId = decisionDetails.id;
    		arrOfPhysicalIds.push({ 'physicalid': decisionId });
    		
    		var maturityCmd = new MaturityCmd();
    		maturityCmd.executeAsync(arrOfPhysicalIds).then(function () {
    			// maturityCmd - object has all the info we get from life cycle. To get status : maturityCmd.maturityWidget.model.objects["583982563644000060336658000B3734"].current; //
    			// On State update, refresh id card, route summary data and tile views //
    			Utils.getDecisionDataUpdated(decisionId);
    			
    			});
			});
    };
	let LifeCycleServices={
			lifeCycle: (decisionDetails,reqType) => {return lifeCycle(decisionDetails,reqType);}
    };
    
    return LifeCycleServices;
});

/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2018 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/View/Dialog/RemoveDecision', [
		'DS/WAFData/WAFData',
		'UWA/Core',
		'DS/Windows/Dialog',
		'DS/Windows/ImmersiveFrame',
		'DS/Controls/Button',
		'DS/ENXDecisionMgmt/Utilities/ParseJSONUtil',
		'DS/ENXDecisionMgmt/Model/DecisionModel',
		'DS/ENXDecisionMgmt/Utilities/Utils',
		'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
		'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
		'DS/ENXDecisionMgmt/View/Grid/DecisionDataGridView',
		'DS/ENXDecisionMgmt/Actions/DecisionActions',
		'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
		'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
	function(WAFData, UWACore, WUXDialog, WUXImmersiveFrame, WUXButton, ParseJSONUtil, DecisionModel, Utils, WrapperTileView, WrapperDataGridView, DataGridView, DecisionActions, NLS) {
	'use strict';
	let RemoveDecisions, dialog;
	let deleteConfirmation = function(removeDetails){
		if(removeDetails.data === undefined){
			removeDetails = DecisionModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorDeleteDecisionSelection,
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
		//var meetingModel = tileView.TreedocModel.meetingModel;
		//var meetingOwner = meetingModel.Owner;
		//var maturityState = meetingModel.Maturity_State;
		
		for(var i=0;i<removeDetails.data.length;i++){
			let deciTitle = removeDetails.data[i].options.grid.title;
			if(!deciTitle || deciTitle=="")
				deciTitle = removeDetails.data[i].options.grid.name;
			if(removeDetails.data[i].options.grid.deleteAccess == "FALSE"){
				idsCannotDelete.push(removeDetails.data[i].options.grid.id);
				ulCannotDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							//"html": "&nbsp;" + removeDetails.data[i].options.grid.title
							"html": "&nbsp;" + deciTitle
						})
						
					]
				}));
			}else{
		var assignee = removeDetails.data[i].options.grid.name;
		  idsToDelete.push(removeDetails.data[i].options.grid.id);
		  ulCanDelete.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{							
							//"html": "&nbsp;" + removeDetails.data[i].options.grid.title
							"html": "&nbsp;" + deciTitle
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
    	if(idsToDelete.length > 0){
    		if(idsToDelete.length == 1){
    			header = NLS.DeleteDecisionHeaderSingle;
    		}else{
    			header = NLS.DeleteDecisionHeader;
    		}
        	header = header.replace("{count}",idsToDelete.length);
        	
        	dialogueContent.appendChild(UWA.createElement('div',{
        				"class":"",
        				"html": NLS.deleteWarning
    				  }));
    				  
           if(idsToDelete.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.deleteDecisionWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.deleteDecisionWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanDelete));
    	}
    	
    	if(idsCannotDelete.length > 0){
    		if(header == ""){
    			header = NLS.DeleteDecisionHeader2;
    		}
    		if(idsCannotDelete.length == 1){
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeDecisionWarningDetail2Single
    			}));
    		}else{
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeDecisionWarningDetail2
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
    		   			label: NLS.DialogDeleteButton,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				deleteConfirmed(idsToDelete);
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
    let removeConfirmation = function(removeDetails){
		if(removeDetails.data === undefined){
			removeDetails = DecisionModel.getSelectedRowsModel();
		}
		if(removeDetails.data.length < 1){
			widget.meetingNotify.handler().addNotif({
				level: 'warning',
				subtitle: NLS.ErrorRemoveDecisionSelection,
			    sticky: false
			});
    		return;
    	}
		// fetch ids here //
		var idsToRemove = [];
		//var idsCannotRemove = [];
		
		var ulCanRemove = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		var ulCannotRemove = UWA.createElement('ul',{
			"class":"",
			"styles":{"list-style-type":"circle"}
		  });
		
		var tileView=WrapperTileView.tileView();
		var meetingId = tileView.TreedocModel.meetingId;
		
		for(var i=0;i<removeDetails.data.length;i++){
			/*if(removeDetails.data[i].options.grid.deleteAccess == "FALSE"){
				idsCannotRemove.push(removeDetails.data[i].options.grid.id);
				ulCannotRemove.appendChild(UWA.createElement('li',{
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
			}else{*/
		  let deciTitle = removeDetails.data[i].options.grid.title;
		  if(!deciTitle || deciTitle=="")
			  deciTitle = removeDetails.data[i].options.grid.name;
		  idsToRemove.push(removeDetails.data[i].options.grid.id);
		  ulCanRemove.appendChild(UWA.createElement('li',{
					"class":"",
					"html": [
						UWA.createElement('span',{
							"class":"wux-ui-3ds wux-ui-3ds-1x "
						}),
						UWA.createElement('span',{
							//"html": "&nbsp;" + removeDetails.data[i].options.grid.title
							"html": "&nbsp;" + deciTitle
						})
						
					]
				}));
			//}
		
		} //end of for loop
		
		let dialogueContent = new UWA.Element('div',{
    			"id":"RemoveMemberWarning",
    			"class":""
    			});
    	var header = "";
    	if(idsToRemove.length > 0){
    		if(idsToRemove.length == 1){
    			header = NLS.RemoveDecisionHeaderSingle;
    		}else{
    			header = NLS.RemoveDecisionHeader;
    		}
        	header = header.replace("{count}",idsToRemove.length);
        	
        /*	dialogueContent.appendChild(UWA.createElement('div',{
        				"class":"",
    					"html": NLS.removeDecisionWarning
    				  }));*/
    				  
           if(idsToRemove.length == 1){
        		dialogueContent.appendChild(UWA.createElement('div',{
	    			"class":"",
					"html": NLS.removeDecisionWarningDetailSingle
        		}));
        	}else{
        		dialogueContent.appendChild(UWA.createElement('div',{
    	    			"class":"",
    					"html": NLS.removeDecisionWarningDetail
    			}));
        	}
        	dialogueContent.appendChild(UWA.createElement('div',{
    	    				"class":""
    				  }).appendChild(ulCanRemove));
    	}
    	
/*    	if(idsCannotRemove.length > 0){
    		if(header == ""){
    			header = NLS.removeDecisionHeader;
    		}
    		if(idsCannotRemove.length == 1){
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeDecisionWarningDetail3Single
    			}));
    		}else{
    			dialogueContent.appendChild(UWA.createElement('div',{
    				"class":"",
    				"html": NLS.removeDecisionWarningDetail3
    			}));
    		}
    		dialogueContent.appendChild(UWA.createElement('div',{
    				"class":""
			  }).appendChild(ulCannotRemove));
    	}*/
    	
        let immersiveFrame = new WUXImmersiveFrame();
        immersiveFrame.inject(document.body); 

    	var confirmDisabled = false;
    	if(idsToRemove.length < 1){
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
    		   			label: NLS.DialogRemoveButton,
    		   			disabled : confirmDisabled,
    		   			onClick: function (e) {
    		   				var button = e.dsModel;
    		   				var myDialog = button.dialog;
    		   				removeConfirmed(idsToRemove);
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
		DecisionActions.removeDecision(meetingId,ids);
		dialog.close();
	}
    
    let deleteConfirmed = function(ids){
        var tileView=WrapperTileView.tileView();
		var meetingId = tileView.TreedocModel.meetingId;
		DecisionActions.deleteDecision(meetingId,ids);
		dialog.close();
	}
    
    RemoveDecisions={
    		deleteConfirmation: (removeDetails) => {return deleteConfirmation(removeDetails);},
    		removeConfirmation: (removeDetails) => {return removeConfirmation(removeDetails);}
    };
    
    return RemoveDecisions;
});

define('DS/ENXDecisionMgmt/View/Form/DecisionCreateView',
[	'DS/Controls/LineEditor',
	'DS/Controls/Editor',
	'DS/Controls/Button',
	'DS/Controls/Toggle',
	'DS/Controls/Accordeon',
	'DS/Controls/ButtonGroup',
	'DS/Controls/ComboBox',
	'DS/Controls/DatePicker',
	'DS/TreeModel/TreeDocument',
	'DS/TreeModel/TreeNodeModel',
	'DS/ENXDecisionMgmt/Utilities/Utils',
	'DS/ENXDecisionMgmt/View/Form/DecisionCreateViewUtil',
	'DS/ENXDecisionMgmt/Utilities/AutoCompleteUtil',
	'DS/ENXDecisionMgmt/Utilities/SearchUtil',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
	"DS/WUXAutoComplete/AutoComplete",	
	'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css'
],
function (WUXLineEditor, WUXEditor, WUXButton, WUXToggle,WUXAccordeon, WUXButtonGroup, WUXComboBox, WUXDatePicker,
		  TreeDocument, TreeNodeModel, Utils, DecisionCreateViewUtil, AutoCompleteUtil, SearchUtil, NLS, WUXAutoComplete) {    
	"use strict";
	let _decisionCreateProperties = {};
	var ownerACModel;
		
	let build= function (container,data,mode) {
		// Create the container in which all Meeting properties details will be rendered //
		_decisionCreateProperties.elements = {};
		
		// Layout - Header Body Footer //
		_decisionCreateProperties.formContainer = new UWA.Element('div', {id: 'DecisionCreatePropertiesContainer','class':'decision-create-prop-container'});
		_decisionCreateProperties.formContainer.inject(container);
		
		_decisionCreateProperties.formHeader = new UWA.Element('div', {id: 'DecisionCreatePropertiesHeader','class':'decision-create-prop-header'});
		_decisionCreateProperties.formHeader.inject(_decisionCreateProperties.formContainer);
		_decisionCreateProperties.formFields = new UWA.Element('div', {id: 'DecisionCreatePropertiesBody','class':'decision-create-prop-body'});
		_decisionCreateProperties.formFields.inject(_decisionCreateProperties.formContainer);
		_decisionCreateProperties.formFooter = new UWA.Element('div', {id: 'DecisionCreatePropertiesFooter','class':'decision-create-prop-footer'});
		_decisionCreateProperties.formFooter.inject(_decisionCreateProperties.formContainer);
		
		var fieldRequired,fieldViewOnly,closeEventName;
		closeEventName = "decision-create-close-click";
		
		// Header //
		// header properties icon //
		UWA.createElement('div',{
			"title" : NLS.CreateDecision,
			"class" : "wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-attributes fonticon-display fonticon-color-display",
			styles : {"font-size": "20px","float":"left","color":"#368ec4"},
		}).inject(_decisionCreateProperties.formHeader);
		
		var decisionPropertiesTitleDiv = new UWA.Element("div", {
			"id": "decisionPropertyTitleId",
			"class": "",
			styles : {"font-size": "20px","float":"left","color":"#368ec4"},
		}).inject(_decisionCreateProperties.formHeader);
		new UWA.Element("h5", {"class":"", text: NLS.CreateDecision}).inject(decisionPropertiesTitleDiv);
		
		// header action - Close // 
		UWA.createElement('div',{
			"id" : "decisionCreatePanelClose",
			"title" : NLS.Close,
			"class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-close fonticon-display fonticon-color-display",
			styles : {"font-size": "20px","float":"right"},
			events: {
                click: function (event) {
                	 widget.meetingEvent.publish(closeEventName);
                	destroy(mode);
                }
			}
		}).inject(_decisionCreateProperties.formHeader);
	
		// Body //
		//Decision Name AutoName
		//_decisionCreateProperties.fields = {};
		/*var NameDiv = new UWA.Element("div", {
			"id": "NameId",
			"class": ""
		}).inject(_decisionCreateProperties.formFields);
		var ownerAttr = new UWA.Element("h5", {"class":"required", text: NLS.name}).inject(NameDiv);
		
		
		
		_decisionCreateProperties.elements.name = new WUXLineEditor({
		      placeholder: NLS.placeholderName,
//		      requiredFlag: true,
		      pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
		      sizeInCharNumber: 45
		    });
		_decisionCreateProperties.elements.name.inject(NameDiv);
		_decisionCreateProperties.elements.name.addEventListener('change', function(e) {				
				widget.meetingEvent.publish('initiate-route-toggle-dialogbuttons', { properties : _decisionCreateProperties});		
		});
		*/
		/*				
		_decisionCreateProperties.elements.autoNameCheckbox = new WUXToggle({ type: "checkbox", label: NLS.autoname, value: false });
	    
		_decisionCreateProperties.elements.autoNameCheckbox.addEventListener("change", function(e) {
			_decisionCreateProperties.elements.name.disabled = !e.dsModel.value
			e.dsModel.value = !e.dsModel.value;				
			widget.meetingEvent.publish('initiate-route-toggle-dialogbuttons', { properties : _decisionCreateProperties});				
	    });
		_decisionCreateProperties.elements.autoNameCheckbox.inject(NameDiv);		
		*/
		
		// Decision Title //
		
		var titleDiv = new UWA.Element("div", {
				"id": "titleId",
				"class": ""
			}).inject(_decisionCreateProperties.formFields);
		if(fieldViewOnly){
			new UWA.Element("h5", {"class":"", text: NLS.title}).inject(titleDiv);
			new UWA.Element("span", {text: data.model.title}).inject(titleDiv);
		}else{
			var labelTitle = new UWA.Element("h5", {"class":fieldRequired, text: NLS.title}).inject(titleDiv);
			UWA.createElement("div", {
				"class": "required-label-decision fonticon fonticon-asterisk-alt"
			}).inject(labelTitle);

			if(!data.model.title){
				data.model.title = "";
			}
			_decisionCreateProperties.elements.title = new WUXLineEditor({
				placeholder: NLS.placeholderTitle,
				pattern: '[^\./#,\\[\\]\\$\\^@\\*\\?%:\'"\\\\<>]+',
				sizeInCharNumber: 55,
				value: data.model.title,
		    }).inject(titleDiv);
		}
		
		// Description //
		var descDiv = new UWA.Element("div", {
			"id": "descId",
			"class": ""
		}).inject(_decisionCreateProperties.formFields);
		var labelDesc = new UWA.Element("h5", {text: NLS.description}).inject(descDiv);
		
			if(!data.model.Description){
				data.model.Description = "";
			}
			_decisionCreateProperties.elements.description = new WUXEditor({
				placeholder: NLS.placeholderDescription,
				widthInCharNumber: 57,
				nbRows: 5,
				newLineMode: 'enter',
				value: data.model.Description
		    }).inject(descDiv);
			
		
		

		
			_decisionCreateProperties.ownerItemField = new UWA.Element('div', {id: 'SearchOwnerItemField', class:"fonticon-chooser-display"});
			var ownerDiv = new UWA.Element("div", {
			"id": "ownerId",
			"class": ""
		}).inject(_decisionCreateProperties.formFields);
			var labelOwner = new UWA.Element("h5", {"class":"", text: NLS.IDcardOwner}).inject(ownerDiv);
		
			
			//typeahead - start
			ownerACModel = new TreeDocument();
			
			let acOptions = {
	    		allowFreeInputFlag: false,
	    		elementsTree: ownerACModel,
	    		multiSearchMode: false,
	    		minLengthBeforeSearch: 3,
	    		keepSearchResultsFlag: false
	    	};
	    	_decisionCreateProperties.elements.owner = AutoCompleteUtil.drawAutoComplete(acOptions);
	    	if (data.model.OwnerFullName) {
	    		let node = new TreeNodeModel({
					label: data.model.OwnerFullName,
					value: data.model.OwnerFullName,
					decisionOwnerDisplayValue: data.model.OwnerFullName,
					decisionOwnerActualValue: data.model.Owner,
				});
				ownerACModel.addRoot(node);
				_decisionCreateProperties.elements.owner.options.isSelected = true;
				_decisionCreateProperties.elements.owner.selectedItems = node;
	    	}
	    	else {
	    		_decisionCreateProperties.elements.owner.elementsTree = asyncModelForOwner;
	    	}
	    	var autocompleteCB = asyncModelForOwner;
	    	_decisionCreateProperties.elements.owner.addEventListener('change', function(e) {
				if (typeof e.dsModel.elementsTree !='function')
					e.dsModel.elementsTree = autocompleteCB;
			});
			
			
			/*_decisionCreateProperties.elements.owner = new WUXLineEditor({
				value: data.model.OwnerFullName,
				sizeInCharNumber: 53,
				displayClearFieldButtonFlag: true,
				decisionOwnerDisplayValue: data.model.OwnerFullName,
				decisionOwnerActualValue: data.model.Owner,
				disabled :true
		    });*/
			_decisionCreateProperties.elements.owner.inject(_decisionCreateProperties.ownerItemField);
			new UWA.Element('div', {html:"&nbsp;"}).inject(_decisionCreateProperties.ownerItemField);
			var decisionCreateItemChooser = new WUXButton({icon: {iconName: "search"}});
			decisionCreateItemChooser.inject(_decisionCreateProperties.ownerItemField);
		
			decisionCreateItemChooser.getContent().addEventListener('buttonclick', function(){			     
				DecisionCreateViewUtil.launchOwnerSearch(event, _decisionCreateProperties, data);
			});
		_decisionCreateProperties.ownerItemField.inject(ownerDiv);
		
		// Footer //

			// Save and Cancel button
			var cancelButtonDiv = new UWA.Element('div', 
					{
						id:"cancelButtonId",
						class:"decision-create-save-float",
						events: {
			                click: function (event) {
			                	 widget.meetingEvent.publish(closeEventName);
			                	destroy(mode);
			                }
						}
					}).inject(_decisionCreateProperties.formFooter);
				_decisionCreateProperties.elements.save = new WUXButton({ label: NLS.cancel }).inject(cancelButtonDiv);
				new UWA.Element('div', {html:"&nbsp;"}).inject(cancelButtonDiv);
				var saveButtonDiv = new UWA.Element('div', 
						{
							id:"saveButtonId",
							class:"decision-create-save-float"
						}).inject(_decisionCreateProperties.formFooter);
					_decisionCreateProperties.elements.save = new WUXButton({ label: NLS.create, emphasize: "primary"}).inject(saveButtonDiv);
					new UWA.Element('div', {html:"&nbsp;"}).inject(saveButtonDiv);
					_decisionCreateProperties.elements.save.disabled = false;
					_decisionCreateProperties.elements.save.getContent().addEventListener('click', function(){
						if(!DecisionCreateViewUtil.validateDecision(_decisionCreateProperties))
							return;
							
						if(_decisionCreateProperties.elements.save.disabled == false) {
							_decisionCreateProperties.elements.save.disabled = true;
							DecisionCreateViewUtil.decisionActionUpdate(data,_decisionCreateProperties,data);
						}																
					});
				
			
				
		
	};
	
	let asyncModelForOwner = function(typeaheadValue) {
		var personRoleArray = {};
					
		let preCondition = SearchUtil.getPrecondForOwnerSearch() || "";
		if (preCondition)
			preCondition = preCondition.precond;
		var queryString = "";
		queryString = "(" + typeaheadValue +" AND "+ preCondition+ ")";
		
		let options = {
			'categoryId': 'decision',
			'queryString': queryString
		};
		
		return new Promise(function(resolve, reject){			
			AutoCompleteUtil.getAutoCompleteList(options, ownerACModel, personRoleArray)
			.then(function(resp){
				ownerACModel = resp;
				resolve(ownerACModel);
			})
			.catch(function(err){
				console.log("ERROR: "+err);
			});
		});
	};

	let destroy = function(){
		_decisionCreateProperties = {};
	};
		
	 let DecisionCreateView={
			build : (container,data,mode) => { return build(container,data,mode);},
			destroy : () => {return destroy();}
	 };
	 return DecisionCreateView;
});

define('DS/ENXDecisionMgmt/View/RightSlideIn/DecisionPropPanelView', [
	 'DS/ENXDecisionMgmt/View/Properties/DecisionIDCardFacets',
	'DS/ENXDecisionMgmt/View/Form/DecisionCreateView'
		], function(DecisionIDCardFacets, DecisionCreateView) {
	'use strict';
	let displayContainer;
	const destroyViews = function() {
		 displayContainer.destroy();

	};
	var DecisionPropPanelView = function(container) {
		this.container = container;
		displayContainer = new UWA.Element('div',{	
													"id":"rightPanelDisplayContainer",
													styles:{"height":"100%"}
												});
	};
	DecisionPropPanelView.prototype.init = function(data,loadFor) {
		destroyViews(); // to destroy any pre-existing views
		if(loadFor == "decisionCreate"){
			DecisionCreateView.build(displayContainer,data,"view");
		}
		else if(loadFor == "decision"){
			let decisionIDCardFacet = new DecisionIDCardFacets(displayContainer,loadFor);
			decisionIDCardFacet.init(data.model,loadFor);
		}
		this.container.appendChild(displayContainer);
	};
	DecisionPropPanelView.prototype.destroy = function() {
		// destroy
		this.container.destroy();
	};

	return DecisionPropPanelView;

});




/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/View/Menu/AppliesToContextualMenu', [
        'DS/Menu/Menu',
        'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
        'DS/ENXDecisionMgmt/View/Dialog/RemoveAppliesToItems',
        'DS/ENXDecisionMgmt/View/Menu/DecisionOpenWithMenu',
        'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
        'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
    function(WUXMenu,DecisionAppliesToModel,RemoveAppliesToItems,DecisionOpenWithMenu,
    		//RemoveAttachment, MeetingAttachmentModel, 
    		NLS){
        'use strict';
        let Menu;

		let decisionAppliesToRightClick = function(event,data){
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
            var selectedDetails = DecisionAppliesToModel.getSelectedRowsModel();
            var menu = [];
            menu = menu.concat(deleteAppliesTo(selectedDetails));
            /*if(selectedDetails.data.length === 1){
            	// Single Selection //
                menu = menu.concat(openMenu(data));
               // TODO GDS5
              //  menu = menu.concat(routeMaturityStateMenus(data.Actions,data.id));
            }
        	menu = menu.concat(deleteMenu(selectedDetails,false));*/
            if(selectedDetails.data && selectedDetails.data.length == 1){
        		var contextOpenWithData = {};
        		contextOpenWithData.Id = selectedDetails.data[0].options.grid.id;
        		contextOpenWithData.Type = selectedDetails.data[0].options.grid.type;
        		contextOpenWithData.Title = selectedDetails.data[0].options.grid.title;
        		getOpenWithMenu(contextOpenWithData).then(function(openWithMenu){
        			menu = menu.concat(openWithMenu);
        			if(menu.length!=0)
        				WUXMenu.show(menu, config);
                	});
        	}else{
        		if(menu.length!=0)
        			WUXMenu.show(menu, config);
        	}
		};
		
		let getOpenWithMenu = function(data){
        	let menu = [];
        	return new Promise(function(resolve, reject) {
        		DecisionOpenWithMenu.getOpenWithMenu(data).then(				
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
		
		let deleteAppliesTo = function(removeDetails){
			// Display menu
			let showDeleteCmd =false;
			/*if(removeDetails.data.length === 1 && removeDetails.data[0].options.grid.DeleteAccess != "TRUE"){
				showDeleteCmd = false;
			}*/			
			if(DecisionAppliesToModel.getModel().decisionModel && DecisionAppliesToModel.getModel().decisionModel.modifyAccess == "TRUE"){
				showDeleteCmd = true;
			}
			var menu = [];
			if(showDeleteCmd){
				 menu.push({
		                name: NLS.RemoveAppliesTo,
		                title: NLS.RemoveAppliesTo,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-trash'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                    	RemoveAppliesToItems.removeConfirmation(removeDetails);
		                    }
		                }
		            });
			}          
           
            return menu;
		};
	
		
        Menu={
			decisionAppliesToRightClick: (event,data) => {return decisionAppliesToRightClick(event,data);}    
            };
        
        return Menu;
    });


/**
 * datagrid view for route summary page
 */
define('DS/ENXDecisionMgmt/View/Tile/DecisionAppliesToTileView',
        [   
            'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENXDecisionMgmt/View/Menu/AppliesToContextualMenu',          
            "DS/ENXDecisionMgmt/Utilities/DragAndDropManager"
            ], function(
                    WrapperTileView,
                    AppliesToContextualMenu,
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
            'class': "appliesTo-tileView-View hideView"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv, true);//true passed to enable drag and drop
        registerDragAndDrop();
        return dataTileViewContainer;
    };  

  let contexualMenuCallback = function(){    
        let _tileView = WrapperTileView.tileView();
        _tileView.onContextualEvent = {
                'callback': function (params) {
                    AppliesToContextualMenu.decisionAppliesToRightClick(params.data.event,_model);
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

    let DecisionAppliesToTileView={
            build : (model) => { return build(model);} ,
            contexualMenuCallback : () =>{return contexualMenuCallback();}

    };
    
    
    return DecisionAppliesToTileView;
});

define('DS/ENXDecisionMgmt/View/Facets/DecisionAppliesTo', [
	'DS/EditPropWidget/facets/Common/FacetsBase',
	'DS/ENXDecisionMgmt/Controller/DecisionController',
	'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
	'DS/ENXDecisionMgmt/View/Grid/DecisionAppliesToDataGridView',
	'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
	'DS/ENXDecisionMgmt/View/Tile/DecisionAppliesToTileView',
	'DS/ENXDecisionMgmt/Utilities/PlaceHolder',
    'DS/ENXDecisionMgmt/Utilities/DragAndDrop',
    'DS/ENXDecisionMgmt/Utilities/DragAndDropManager',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
], function(FacetsBase,DecisionController,DecisionAppliesToModel,DecisionAppliesToDataGridView,WrapperDataGridView,DecisionAppliesToTileView,PlaceHolder,DropZone,DragAndDropManager,NLS){
'use strict';

let _ondrop, access;
let build	= function(data){
	 if(!showView()){
		 access = data.modifyAccess == "TRUE" ? true : false;
		 let containerDiv = UWA.createElement('div', {id: 'decisionAppliesToContainer','class':'decision-appliesTo-container'}); 
		 containerDiv.inject(document.querySelector('.decision-facets-container'));
  		 DropZone.makeDroppable(containerDiv, _ondrop);
		DecisionController.fetchDecisionAppliesTo(data).then(function(response) {
			 DecisionAppliesToModel.destroy();
			 DecisionAppliesToViewModel(response);
			 drawDecisionAppliesView(containerDiv,response.model);
		 }); 
	
            //drag and drop initialize to store DecisionAppliesTo data
            DragAndDropManager.init(data);
	 }
};

_ondrop = function(e, target){
    	DragAndDropManager.onDropManager(e, access, "AppliesTo");
};

let drawDecisionAppliesView = function(containerDiv,data){
    let datagridDiv = DecisionAppliesToDataGridView.build(DecisionAppliesToModel.getModel(),data);
    let tileViewDiv= DecisionAppliesToTileView.build(DecisionAppliesToModel.getModel());
    DecisionAppliesToTileView.contexualMenuCallback();
    let appliesToTabToolbar=DecisionAppliesToDataGridView.getGridViewToolbar();
    
    
    let toolBarContainer = UWA.createElement('div', {id:'dataGridAppliesToDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
    appliesToTabToolbar.inject(toolBarContainer);
    datagridDiv.inject(containerDiv);
    tileViewDiv.inject(containerDiv);
    var hideAddbutton = false;
    if(data.modifyAccess != "TRUE") {
    	hideAddbutton = true;
	}
    if (DecisionAppliesToModel.getModel().getChildren().length ==0 ) {
        PlaceHolder.showEmptyAppliesToPlaceholder(containerDiv,hideAddbutton);
    }
    PlaceHolder.registerListeners();
    registerListners();

    return containerDiv;
};
let registerListners = function(){
	let dataGridView = WrapperDataGridView.dataGridView();
	dataGridView.addEventListener('contextmenu', openContextualMenu);  
	addorRemoveToolbarEventListeners();
};

let addorRemoveToolbarEventListeners = function(){
	widget.meetingEvent.subscribe('toolbar-Decisiondata-updated', function (data) {
		DecisionAppliesToModel.getModel().decisionModel = data;
    	if(data.modifyAccess == "TRUE") {
    		showAppliesToAddButton(true);
    		showAppliesToDeleteButton(true);
		}
		else{
			showAppliesToAddButton(false);
			showAppliesToDeleteButton(false);
		} 
    	
	}); 
};
let DecisionAppliesToViewModel = function(serverResponse){      
	DecisionAppliesToModel.createModel(serverResponse);
	DecisionAppliesToModel.getModel().decisionId = serverResponse.model.id;
	DecisionAppliesToModel.getModel().decisionModel = serverResponse.model;
};
let openContextualMenu = function (e, cellInfos) {
	if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
	      if (e.button == 2) {
	    	  require(['DS/ENXDecisionMgmt/View/Menu/AppliesToContextualMenu'], function (AppliesToContextualMenu) {
	    		  AppliesToContextualMenu.decisionAppliesToRightClick(e,cellInfos.nodeModel);
			});           
	     }
	}
};

let showAppliesToAddButton = function(flag){
	let appliesToDecisionToolbar = DecisionAppliesToDataGridView.getGridViewToolbar();
	let addAppliesTo = appliesToDecisionToolbar.getNodeModelByID("addAppliesTo");
    if (addAppliesTo) {
    	addAppliesTo.updateOptions({
        visibleFlag: flag
      });
    }
};

let showAppliesToDeleteButton = function(flag){
	let appliesToDecisionToolbar = DecisionAppliesToDataGridView.getGridViewToolbar();
	let deleteAppliesTo = appliesToDecisionToolbar.getNodeModelByID("deleteAppliesTo");
    if (deleteAppliesTo) {
    	deleteAppliesTo.updateOptions({
        visibleFlag: flag
      });
    }
};



let hideView= function(){
    if(document.getElementById('decisionAppliesToContainer') != null){
        document.getElementById('decisionAppliesToContainer').style.display = 'none';
    }
};

let showView= function(){
    if(document.querySelector('#decisionAppliesToContainer') != null){
        document.getElementById('decisionAppliesToContainer').style.display = 'block';
		DropZone.makeDroppable(document.getElementById('decisionAppliesToContainer'), _ondrop); 
       return true;
    }
    return false;
};

let destroy= function() {
	document.querySelector('#decisionAppliesToContainer').destroy();
	DecisionAppliesToModel.destroy();
};


	let  DecisionAppliesTo = {
			init : (data) => { return build(data);},
	        hideView: () => {hideView();},
	        destroy: () => {destroy();}
	    
	};
	
	
	return DecisionAppliesTo;
});


define('DS/ENXDecisionMgmt/View/Facets/DecisionApplicability', [
	'DS/EditPropWidget/facets/Common/FacetsBase',
	'DS/ENXDecisionMgmt/Controller/DecisionController',
	'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
	'DS/ENXDecisionMgmt/View/Grid/DecisionAppliesToDataGridView',
	'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
	'DS/ENXDecisionMgmt/View/Tile/DecisionAppliesToTileView',
	'DS/ENXDecisionMgmt/Utilities/PlaceHolder',
	'DS/CfgEvolutionUX/CfgEvolutionLayoutFactory',
	'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt'
], function(FacetsBase,DecisionController,DecisionAppliesToModel,DecisionAppliesToDataGridView,WrapperDataGridView,DecisionAppliesToTileView,PlaceHolder,CfgEvolutionLayoutFactory,NLS){
'use strict';


let build	= function(data){
	 if(!showView()){
		 let containerDiv = UWA.createElement('div', {id: 'decisionApplicabilityContainer','class':'decision-Applicability-container'}); 
		 containerDiv.inject(document.querySelector('.decision-facets-container'));
		 var options = { 'mode': "Applicability", 'objectid': data.id, 'parent': containerDiv, environment: "Dashboard" }
         options.tenant =widget.data.x3dPlatformId;
		 CfgEvolutionLayoutFactory.create(options);
		/* return new Promise(function(resolve, reject) {
				 require(['DS/CfgEvolutionUX/CfgEvolutionLayoutFactory'],function(CfgEvolutionLayoutFactory){
					
					 resolve();
				 });
			 
		 });	*/	 
         
    	 
	 }
};



let hideView= function(){
    if(document.getElementById('decisionApplicabilityContainer') != null){
        document.getElementById('decisionApplicabilityContainer').style.display = 'none';
       
    }
};

let showView= function(){
    if(document.querySelector('#decisionApplicabilityContainer') != null){
        document.getElementById('decisionApplicabilityContainer').style.display = 'block';
        return true;
    }
    return false;
};

let destroy= function() {
	document.querySelector('#decisionApplicabilityContainer').destroy();
	DecisionAppliesToModel.destroy();
};


	let  DecisionApplicability = {
			init : (data) => { return build(data);},
	        hideView: () => {hideView();},
	        destroy: () => {destroy();}
	    
	};
	
	
	return DecisionApplicability;
});


/* global define, widget */
/**
 * @overview Route Management
 * @licence Copyright 2006-2020 Dassault Systemes company. All rights reserved.
 * @version 1.0.
 * @access private
 */
// XSS_CHECKED
define('DS/ENXDecisionMgmt/View/Menu/DecisionContextualMenu', [
		'DS/Menu/Menu',
		'DS/ENXDecisionMgmt/Model/DecisionAppliesToModel',
		'DS/ENXDecisionMgmt/Model/DecisionModel',
		'DS/ENXDecisionMgmt/View/Dialog/RemoveDecision',
		'DS/ENXDecisionMgmt/Utilities/VersionFacetIntegration',
		'DS/ENXDecisionMgmt/View/Dialog/DecisionNewRevision',
		'DS/ENXDecisionMgmt/Services/LifeCycleServices',
		'DS/ENXDecisionMgmt/Services/DecisionWidgetComServices',
		'i18n!DS/ENXDecisionMgmt/assets/nls/ENXDecisionMgmt',
		'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css' ], 
	function(WUXMenu,DecisionAppliesToModel,DecisionModel,RemoveDecision, VersionFacetIntegration, DecisionNewRevision, LifeCycleServices,DecisionWidgetComServices, NLS){
		'use strict';
		let Menu;
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
                    	var decisionModel = {};
                    	//decisionModel.id = "58398256FE30000060744E0900168AB4";
                    	//DecisionView.build(decisionModel);
                    	widget.meetingEvent.publish('decision-preview-click', {model:Details});
                    }
                }
            });
            return menu;
        };
        let deleteMenu = function(removeDetails){
			// Display menu
			let showDeleteCmd =true;
					
			var menu = [];
			if(showDeleteCmd){
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
		                    	RemoveDecision.removeConfirmation(removeDetails);
		                    }
		                }
		            });
		            
		            if( removeDetails.data[0].options.grid.deleteAccess == "TRUE"){
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
			                    	RemoveDecision.deleteConfirmation(removeDetails);
			                    }
			                }
			            });
		            }
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
		                    	DecisionWidgetComServices.openRelationalExplorer(ids);
		                    }
		                }
		            });           
            return menu;
		};
		
		let decisionRightClick = function(event,data){
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
            var selectedDetails = DecisionModel.getSelectedRowsModel();
            var menu = [];
            //menu = menu.concat(openMenu(data));
            if(selectedDetails.data.length === 1){
            	// Single Selection //
                menu = menu.concat(openMenu(data));
                menu = menu.concat(RelationsMenu(selectedDetails));
               //if( selectedDetails.data[0].options.grid.deleteAccess == "TRUE"){
            	   menu = menu.concat(deleteMenu(selectedDetails));
               //}
              //  menu = menu.concat(routeMaturityStateMenus(data.Actions,data.id));
            }else{
            	menu = menu.concat(RelationsMenu(selectedDetails));
            	menu = menu.concat(deleteMenu(selectedDetails));
            }
        	WUXMenu.show(menu, config);
		};
		
		let decisionTileCheveron = function(data){

		    var selectedDetails = DecisionModel.getSelectedRowsModel();
		    var menu = [];
		   
		    if(selectedDetails.data.length === 1){
		        // Single Selection //
		    	menu = menu.concat(openMenu(data));
		    	menu = menu.concat(RelationsMenu(selectedDetails));
		    	 //if( selectedDetails.data[0].options.grid.deleteAccess == "TRUE"){ //IR-1034227-3DEXPERIENCER2023x
	            	   menu = menu.concat(deleteMenu(selectedDetails));
	               //}
		       
		    }else{
		    	menu = menu.concat(RelationsMenu(selectedDetails));
            	menu = menu.concat(deleteMenu(selectedDetails));
            }

		    return menu;     
		};
		
	let newRevisionMenu = function(revisionDetails,actionFromIdCard){
			// Display menu
			let showNewRevisionCmd =true;
		/*	if(revisionDetails.data.length === 1 && revisionDetails.data[0].options.grid.Actions.indexOf("revise")==-1){
				showNewRevisionCmd = false;
			}  */
			var menu = [];
			if(showNewRevisionCmd){
				 menu.push({
		                name: NLS.newRevision,
		                title: NLS.newRevision,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-flow-line-add'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                    	DecisionNewRevision.newRevisionConfirmation(revisionDetails, actionFromIdCard);
		                    }
		                }
		            });
			}
           
            return menu;
		};
		
		let revisionsDecisionMenu = function(revisionDetails,actionFromIdCard){
			// Display menu
			let showNewRevisionCmd =true;
			var menu = [];
			if(showNewRevisionCmd){
				 menu.push({
		                name: NLS.revision,
		                title: NLS.revision,
		                type: 'PushItem',
		                fonticon: {
		                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-flow-branch-list'
		                },
		                data: null,
		                action: {
		                    callback: function () {
		                    	VersionFacetIntegration.launchVersionControlApp(revisionDetails.data[0].options.grid.id);
		                    }
		                }
		            });
			}
			return menu;
		};
		
		let decisionIdCardCheveron = function(decisionDetails){
    		
			var element = UWA.createElement('div', {
			  "class" : "wux-ui-3ds wux-ui-3ds-3x wux-ui-3ds-chevron-down fonticon-display fonticon-color-display",
			  "title" : NLS.idCardHeaderDecisionAction,
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

                    var menu = [];
                    menu = menu.concat(revisionsDecisionMenu(decisionDetails,true));
                    menu = menu.concat(newRevisionMenu(decisionDetails,true));
                   // menu = menu.concat(deleteMenu(decisionDetails,true));                    
                    WUXMenu.show(menu, config);
                }
            }
			});
			return element; 
		};
		
		let decisionIdCardStateCheveron = function(model){
		   /*	if(!model.Actions){
				// No state actions for route. Do not draw the cheveron //
				return "";
			}
			if(model.Actions.findIndex(element => element.includes("promote")) === -1 && model.Actions.findIndex(element => element.includes("demote")) === -1){
				// No state actions for route. Do not draw the cheveron //
				return "";
			}  */
			
			var element = UWA.createElement('div', {
			  "class" : "wux-ui-3ds wux-ui-3ds-2x wux-ui-3ds-chevron-down ",
			  "title" : NLS.idCardHeaderMaturityState, //change tooltip for template
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

                    //var menu = templateMaturityStateMenus(model, true);
                    var menu = maturity(model);
                    WUXMenu.show(menu, config);
                }
            }
			});
			return element;
		};
		
		let maturity = function(data){
			var menu = [];
			menu.push({
                name: NLS.maturity,
                title: NLS.maturity,
                type: 'PushItem',
                fonticon: {
                    content: 'wux-ui-3ds wux-ui-3ds-1x wux-ui-3ds-collaborative-lifecycle-management'
                },
                data: null,
                action: {
                    callback: function () {
                    	LifeCycleServices.lifeCycle(data);
                    }
                }
            });
			return menu;
		};
		
		Menu={
				decisionRightClick: (event,data) => {return decisionRightClick(event,data);},
				decisionIdCardCheveron: (decisionDetails) => {return decisionIdCardCheveron(decisionDetails);},
				decisionTileCheveron: (data) => {return decisionTileCheveron(data);},
				decisionIdCardStateCheveron: (model) => {return decisionIdCardStateCheveron(model);}
	    };
		
		return Menu;
	});


/**
 * datagrid view for decision summary page
 */
define('DS/ENXDecisionMgmt/View/Tile/DecisionTileView',
        [   
            'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
            'DS/ENXDecisionMgmt/View/Menu/DecisionContextualMenu',
            "DS/ENXDecisionMgmt/Utilities/DragAndDropManager",           
            'css!DS/ENXDecisionMgmt/ENXDecisionMgmt.css'
            ], function(
                    WrapperTileView,
                    DecisionContextualMenu,
					DragAndDropManager
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
        var tileViewDiv = UWA.createElement("div", {id:'DecisionTileViewContainer',
        	  styles: {
                  'width': "100%",
                  'height': "calc(100% - 40px)",
                  'position': "relative"
              },        
            'class': "Decision-tileview-container hideView"
        });
        let dataTileViewContainer = WrapperTileView.build(model, tileViewDiv, true);
        registerDragAndDrop();
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
                            var data= selectedNode[0].options.grid;
                           
                            menu = DecisionContextualMenu.decisionTileCheveron(data);
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

    let DecisionTileView={
            build : (model) => { return build(model);} ,
            contexualMenuCallback : () =>{return contexualMenuCallback();}

    };

    return DecisionTileView;
});

/**
 * 
 */
define('DS/ENXDecisionMgmt/View/Facets/DecisionTab',
        [ 'DS/ENXDecisionMgmt/Model/DecisionModel',
          'DS/ENXDecisionMgmt/View/Grid/DecisionDataGridView',
          'DS/ENXDecisionMgmt/View/Tile/DecisionTileView',
          'DS/ENXDecisionMgmt/Components/Wrappers/WrapperDataGridView',
          'DS/ENXDecisionMgmt/Components/Wrappers/WrapperTileView',
          'DS/WAFData/WAFData',
          'DS/ENXDecisionMgmt/Controller/DecisionBootstrap',
          'DS/ENXDecisionMgmt/Collections/CollabStorageCollection',
          'DS/ENXDecisionMgmt/Controller/DecisionController',
          'DS/ENXDecisionMgmt/Components/DecisionEvent',
	         'DS/ENXDecisionMgmt/Components/DecisionNotify',
          'DS/Core/PointerEvents',
          'DS/ENXDecisionMgmt/Utilities/PlaceHolder'], function(
        		 DecisionModel, DecisionDataGridView ,DecisionTileView, WrapperDataGridView,WrapperTileView, WAFData, DecisionBootstrap,CollabStorageCollection, DecisionController,DecisionEvent,DecisionNotify,PointerEvents, PlaceHolder
            ) {

    'use strict';
	
    let DecisionViewModel = function(serverResponse, parentModel){
    	DecisionModel.createModel(serverResponse);
    	DecisionModel.getModel().meetingId = parentModel.id;
    	DecisionModel.getModel().OwnerFullName=DecisionBootstrap.getLoginUserFullName();;
    	DecisionModel.getModel().Owner=DecisionBootstrap.getLoginUser();
    };
    let _storages;
    let  initDecisionBootstrap = function(parentInfoModel,storages){
    	return new Promise(function(resolve, reject) {
    		// If the facet is called from any other widget then we need to create new notification and event handlers //
    		//initialize the Notification to enable the alert messages //
    		
    		if(!widget.meetingNotify){
    			widget.meetingNotify = new DecisionNotify();
    			// need to clean up this //
    			widget.decisionNotify = widget.meetingNotify;
    		}
			
			//initialize the Event to enable interactions among components //
    		if(!widget.meetingEvent){
    			widget.meetingEvent = new DecisionEvent(); 
    			widget.decisionEvent = widget.meetingEvent;
    		}
    		
    		var meetingWRFdata = true;
       		if(!storages) {
       			//_storages = new CollabStorageCollection();
       			meetingWRFdata = false;
       		}
       		else {
       			_storages = storages;
       		}
       		// if we are not getting storages we need to set only data needed //
   			// In case of meeting we pass storages //
   			// In other widget integration we do not have //
   			widget.data.DecisionCredentials = {
   				 securityContext : parentInfoModel.securityContext,
   				 tenant : parentInfoModel.tenant
   			};
   			if(parentInfoModel.tenant){
   				widget.data.x3dPlatformId = parentInfoModel.tenant;
   			}
       		
   			DecisionBootstrap.init({
	                id: widget.id,
	                collection: _storages,
	                overridewrf: meetingWRFdata
	                
	            });
		resolve();
		//});
    	
    	});
    };

    let build = function(_parentInfoModel,containerDiv,storages){
    	return new Promise(function(resolve, reject) {
    		initDecisionBootstrap(_parentInfoModel,storages).then(function(success) {
    			DecisionController.fetchMeetingDecisions(_parentInfoModel.id).then(function(response) {
    				DecisionModel.destroy();
    				DecisionViewModel(response, _parentInfoModel);
    				drawDecisionsView(containerDiv); 
    			});
    		});
		 resolve();
    	});
    };
    
    /*let showView= function(){
        if(document.querySelector('#DecisionContainer') != null){
            document.getElementById('DecisionContainer').style.display = 'block';
            return true;
        }
        return false;
    };
    let hideView= function(){
        if(document.getElementById('DecisionContainer') != null){
             document.getElementById('DecisionContainer').style.display = 'none';
            
         }
     };*/
    
    let drawDecisionsView = function(containerDiv){
        //To add the dataGrid view list
        var model = DecisionModel.getModel();
        let datagridDiv = DecisionDataGridView.build(model);
        let tileViewDiv= DecisionTileView.build(model);
        DecisionTileView.contexualMenuCallback();
        registerListners();
        let decisionTabToolbar = DecisionDataGridView.getGridViewToolbar();
        
        let toolBarContainer = UWA.createElement('div', {id:'dataGridDecisionDivToolbar', 'class':'toolbar-container', styles: {'width': "100%"}}).inject(containerDiv);
        decisionTabToolbar.inject(toolBarContainer);
        datagridDiv.inject(containerDiv);
        tileViewDiv.inject(containerDiv);
        if (model.getChildren().length ==0 ) {
            PlaceHolder.showEmptyDecisionPlaceholder(containerDiv);
        }
        PlaceHolder.registerListeners();
        //registerListners();
        return containerDiv;
    };
    
    let openContextualMenu = function (e, cellInfos) {
        if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
              if (e.button == 2) {
                  require(['DS/ENXDecisionMgmt/View/Menu/DecisionContextualMenu'], function (DecisionContextualMenu) {
                	  DecisionContextualMenu.decisionRightClick(e,cellInfos.nodeModel.options.grid);
                });           
             }
        }  
    };
    
    
    
    let registerListners = function(){
        let dataGridView = WrapperDataGridView.dataGridView();
        dataGridView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);
        dataGridView.addEventListener('contextmenu', openContextualMenu);
        
        let tileView = WrapperTileView.tileView();
        tileView.addEventListener(PointerEvents.POINTERHIT, onDoubleClick);  
        widget.meetingEvent.subscribe('decision-data-updated', function (data) {
			DecisionModel.updateRows(data);		
		}); 
        widget.meetingEvent.subscribe('decision-summary-delete-row-by-ids', function (data) {
			if(data.model.length > 0){				
				DecisionModel.deleteRowModelByIds(data.model);					
			}
		});
    };
    
    let onDoubleClick = function (e, cellInfos) {
		//  that.onItemClick(e, cellInfos);
		if (cellInfos && cellInfos.nodeModel && cellInfos.nodeModel.options.grid) {
		      if (e.multipleHitCount == 2) {
	    			cellInfos.nodeModel.select(true);
	    			widget.meetingEvent.publish('decision-preview-click', {model:cellInfos.nodeModel.options.grid});
	    			//showHomeButton(true);               
		     }
		}
	};
    
    
    let destroy = function() {
    	DecisionModel.destroy();	
    };
    
    let DecisionTab = {
    		init : (_parentInfoModel,containerDiv,storages) => { return build(_parentInfoModel,containerDiv,storages);},
            destroy: () => {destroy();}
    };
    

    return DecisionTab;
});



