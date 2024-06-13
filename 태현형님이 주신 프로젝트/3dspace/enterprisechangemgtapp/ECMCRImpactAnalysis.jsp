<%--
  ECMCRImpactAnalysis.jsp
  
  Copyright (c) 2018-2020 Dassault Systemes.
  All Rights Reserved.
  This program contains proprietary and trade secret information of 
  Dassault Systemes.
  Copyright notice is precautionary only and does not evidence any actual
  or intended publication of such program
--%>

<%-- Common Includes --%>

<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxUIConstantsInclude.inc"%>

<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="com.matrixone.apps.domain.util.MqlUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import = "com.matrixone.apps.domain.DomainConstants"%>


<%
  out.clear();
  String urlStr = "";
  String  strContextID = "";
  String strObjectType = "";
  boolean bIsError = false;
  String contextObjectType = "";
  try
  {
    String objectId = emxGetParameter(request,"objectId");
    DomainObject rootDom = new DomainObject(objectId);
    strContextID = rootDom.getInfo(context, "physicalid");
    contextObjectType = emxGetParameter(request,"contextObjectType");
  }
  catch(Exception e)
  {
    bIsError=true;
    session.putValue("error.message", e.getMessage());
  }// End of main Try-catck block
%>
<html>
<head>
<script type="text/javascript" src="../webapps/AmdLoader/AmdLoader.js"></script>
<link rel="stylesheet" type="text/css" href="../webapps/c/UWA/assets/css/standalone.css" />
<script type="text/javascript" src="../webapps/c/UWA/js/UWA_Standalone_Alone.js"></script>
<script type="text/javascript" src="../webapps/WebappsUtils/WebappsUtils.js"></script>
<script type="text/javascript" src="../webapps/UIKIT/UIKIT.js"></script>
<script language="Javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../webapps/PlatformAPI/PlatformAPI.js"></script>
<script type="text/javascript" src="../webapps/ENOChangeActionUX/ENOChangeActionUX.js"></script>
 
<style type="text/css">
    .tile-title{
        font-size: 15px;
        font-family: '3dsregular' tahoma,serif;
        color: #368ec4;
    }
    .dropdown-menu-wrap {
      text-align: left;
    }
    .module{
        width:100%;
        height:99%;
        margin: 0;
        border: none;
    }
    .moduleWrapper {
        z-index: inherit;
        zoom: 1;
    }
    .module > .moduleHeader {
        display: none;
    }
    .moduleFooter {
        display: none;
    }
    .chg-member-profile-picture {
      border-radius: 80px;
      font-size: 30px;
      vertical-align: middle;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .chg-team-profile-text {
      color: white;
    }
    #crImpactAnalysisParentContainer .content-ImpactAnalysis-tile-div, #crImpactAnalysisParentContainer .content-ImpactAnalysis-grid-div {
      height: calc(100% - 30px) !important;
    }
	
	#crImpactAnalysisBody .datepicker, #crImpactAnalysisBody .select-dropdown, #crImpactAnalysisBody .dropdown-menu {
      z-index: 50000 !important;
    }
	#crImpactAnalysisBody .select-results {
      text-align: left !important;
    }
	
</style>
<script>

    function loadImpactAnalysisContent(){
          
        require(['DS/PlatformAPI/PlatformAPI',
            'DS/ENOChangeActionUX/scripts/CASpinner',
            'DS/ENOChgServices/scripts/services/ChgInfraService',
            'DS/ENOChgServices/scripts/services/ChgServiceGlobalVariable',
            "DS/ENOChgServices/scripts/services/ChgDataService",
            'DS/CoreEvents/ModelEvents',
            'DS/ENOChgGovernanceUX/scripts/view/changeRequest/facets/impactAnalysis/ChgCRImpactAnalysisDataGridLayout',
			"DS/ENOChgServices/scripts/services/ChgCustomAttributeService"
        ],
        function(PlatformAPI, CASpinner,ChgInfraService,ChgServiceGlobalVariable, ChgDataService, ModelEvents, ChgCRImpactAnalysisDataGridLayout,ChgCustomAttributeService){
                 
            ChgInfraService.init();
            var curTenant = "OnPremise";
            <%
                if(!FrameworkUtil.isOnPremise(context)){
            %>
					       curTenant = "<%=XSSUtil.encodeForJavaScript(context, context.getTenant())%>";
            <%
                }
            %>
            
			      window.enoviaServer.tenant = curTenant;
            var caGlobalObject = ChgServiceGlobalVariable.getGlobalVariable();
            caGlobalObject.tenant = curTenant;
            caGlobalObject.is3DSpace = true;    
            var userId = "<%=XSSUtil.encodeForJavaScript(context, context.getUser())%>";
            var language = "<%=XSSUtil.encodeForJavaScript(context, context.getSession().getLanguage())%>";
                    
            var randomName = "wdg_" + new Date().getTime();
            ChgInfraService.setupIntercomConnections.call(this, widget, caGlobalObject, randomName);
            widget.body.setStyle("min-height", "50px");
            CASpinner.set3DSpace(true);
            CASpinner.doWait(widget.body);
            var currentTop = getTopWindow();
            while (currentTop && currentTop.x3DPlatformServices == undefined) {
                if (currentTop.getWindowOpener().getTopWindow()) currentTop = currentTop.getWindowOpener().getTopWindow();
            }
					  
			      caGlobalObject.compassWindow = currentTop;
					 
            var myAppBaseURL=""; 
            if (currentTop && currentTop.x3DPlatformServices) {
                for(var tenantCounter=0 ; tenantCounter < currentTop.x3DPlatformServices.length ; tenantCounter++){
                    var tenantDetails = currentTop.x3DPlatformServices[tenantCounter];
                    if(tenantDetails && tenantDetails.platformId == curTenant){
                        myAppBaseURL = tenantDetails["3DCompass"];
                        break;
                    }
                }
            }

            var config = {
                myAppsBaseUrl: myAppBaseURL,
                userId: userId,
                lang: language
            };
                       
            ChgInfraService.populate3DSpaceURL(config).then(function(success){
              ChgInfraService.populateSecurityContext().then(function (securityContextDetails){
                ChgInfraService.getSearchForbiddenTypes();
                ChgInfraService.getSearchTypes();
				ChgInfraService.getExpressionValue().then(function (success) {
				    ChgInfraService.iaSubTypesFetched()
                              .then(function(success){
                                ChgCustomAttributeService.iaSubTypesFetched()
                                  .then(function(success){
									ChgCustomAttributeService.crSubTypesFetched().then(function(){
									  
						if(ChgServiceGlobalVariable.getGlobalVariable().is3DSpace && !window.x3DPlatformServices && !window.COMPASS_CONFIG) { //IR-836000
						  const div = getTopWindow().document.createElement("div");
						  div.id = "hiddenDivForCompassInNewWindow";
						  div.style.display = "none";

						  getTopWindow().document.body.appendChild(div);
						  window.COMPASS_CONFIG = {
							myAppsBaseUrl: ChgServiceGlobalVariable.getGlobalVariable().baseURL,
							userId: '',
							lang: navigator.language,
							compassTarget: div.id
						  };
						}
						
						var that = this;
                var physicalID = '<%=strContextID%>';
                var contextObjectType = '<%=contextObjectType%>';
                var crImpactAnalysisFullViewContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'crImpactAnalysisFullViewContainer',
                  'styles' : {
                    'height' : 'calc(100% - 20px)',
                    'width': '100%'
                  }
                });

                var crImpactAnalysisSlideInContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'crImpactAnalysisSlideInContainer',
                  'styles': { 'height': '100%', 'width': '0', 'position': 'fixed', 'zIndex': '1', 'top': '0', 'right': '0', 'overflowX': 'hidden', 'transition': '.5s', 'borderLeft': '0 solid #d1d4d4', 'background': 'white' }
                });
                                    
                var maincontainer = document.getElementById('crImpactAnalysisParentContainer');
                
                maincontainer.appendChild(crImpactAnalysisFullViewContainer);
                maincontainer.appendChild(crImpactAnalysisSlideInContainer);
                
                var appChannelOptions = {};
                appChannelOptions.name = "appChannelModleEvent";
                                
                var input = {};
                input.id = physicalID;
				input.isSelected = true;
                
				//input.contextDetails = {'id': physicalID, isKindOfType: contextObjectType};
                input.target = crImpactAnalysisFullViewContainer;
                input.infoPanelContainer = crImpactAnalysisSlideInContainer;

                /*for maturity rmb on grid*/
                Array.prototype.find = function (userFunction) {
                  var bFound = false;
                  for (var i=0; i  < this.length ; i++) {
                    if (userFunction(this[i])) {
                      return this[i];
                    }
                  }
                  return undefined;  
                }

                delete Array.prototype.remove;
                delete Array.prototype.apply;

                //ChgCRImpactAnalysisDataGridLayout.createImpactAnalysisView(input, new ModelEvents(appChannelOptions));
								
                //calling access bits
                if(contextObjectType=='ChangeRequest'){
                  ChgDataService.getChangeRequestUserAccess(physicalID).then(function (resp) {
                    var contextId = physicalID;
                    var type = resp.data[0].type;
                    var accessBits = resp.data[0].dataelements;
                    //input.contextDetails.accessBits = resp.data[0].dataelements; 
					var processedResponse = {
                      id: contextId,
                      type: type,
                      accessBits: accessBits,
                    };
					
					input.contextDetails = {
						'id': physicalID, 
						isKindOfType: contextObjectType,
						access: processedResponse
					};
					
                    ChgCRImpactAnalysisDataGridLayout.createImpactAnalysisView(input, new ModelEvents(appChannelOptions));
					
                    PlatformAPI.publish("CO-AccessBit-Update", processedResponse);
                  });
                }else{
                    ChgCRImpactAnalysisDataGridLayout.createImpactAnalysisView(input, new ModelEvents(appChannelOptions));
                }
					CASpinner.endWait(widget.body);					
									});		
                                  })
                          })    	
							
				},
				function (error) {
					console.log('Expression value check failed');
					return Promise.reject(error);
				});

              },
			  function(error){
				console.log("Populate Security Context failed");
                                CASpinner.endWait(widget.body);  
				return Promise.reject(error);
              });
            },
			function(error){
				console.log('populate 3DSpace URL fails');
                                CASpinner.endWait(widget.body); 
				return Promise.reject(error);
            });
        });
	  }   
</script>
</head>
<body id="crImpactAnalysisBody" onLoad = "loadImpactAnalysisContent();" style="overflow:hidden;">
<div id="crImpactAnalysisParentContainer" style="height: 100%; width: 100%; display: flex;"></div>
</body>
</html>  
