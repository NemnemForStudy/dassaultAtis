<%--
  ECMCRAffectedItems.jsp
  
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
  try
  {
    String objectId = emxGetParameter(request,"objectId");
    DomainObject rootDom = new DomainObject(objectId);
    strContextID = rootDom.getInfo(context, "physicalid");
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
    #crAffectedItemsParentContainer .content-affectedItems-tile-div, #crAffectedItemsParentContainer .content-affectedItems-grid-div {
      height: calc(100% - 30px) !important;
    }
</style>
<script>

    function loadAffectedItemsContent(){
          
        require(['DS/PlatformAPI/PlatformAPI',
            'DS/ENOChangeActionUX/scripts/CASpinner',
            'DS/ENOChgServices/scripts/services/ChgInfraService',
            'DS/ENOChgServices/scripts/services/ChgServiceGlobalVariable',
            "DS/ENOChgServices/scripts/services/ChgDataService",
            'DS/CoreEvents/ModelEvents',
            'DS/ENOChgGovernanceUX/scripts/view/changeRequest/facets/affectedItems/ChgCRAffectedItemsDataGridLayout'
        ],
        function(PlatformAPI, CASpinner,ChgInfraService,ChgServiceGlobalVariable, ChgDataService, ModelEvents, ChgCRAffectedItemsDataGridLayout){
                 
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
                ChgInfraService.getCSRFToken().then(function (success){
                ChgInfraService.getSearchForbiddenTypes();
                ChgInfraService.getSearchTypes();
								var that = this;
                var physicalID = '<%=strContextID%>';
                
                var crAffectedItemsFullViewContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'crAffectedItemsFullViewContainer',
                  'styles' : {
                    'height' : 'calc(100% - 20px)',
                    'width': '100%'
                  }
                });

                var crAffectedItemsSlideInContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'crAffectedItemsSlideInContainer',
                  'styles': { 'height': '100%', 'width': '0', 'position': 'fixed', 'zIndex': '1', 'top': '0', 'right': '0', 'overflowX': 'hidden', 'transition': '.5s', 'borderLeft': '0 solid #d1d4d4', 'background': 'white' }
                });
                                    
                var maincontainer = document.getElementById('crAffectedItemsParentContainer');
                
                maincontainer.appendChild(crAffectedItemsFullViewContainer);
                maincontainer.appendChild(crAffectedItemsSlideInContainer);
                
                var appChannelOptions = {};
                appChannelOptions.name = "appChannelModleEvent";
                                
                var input = {};
                input.id = physicalID;
								input.contextDetails = {'id': physicalID, isKindOfType: 'ChangeRequest'};
                input.target = crAffectedItemsFullViewContainer;
                input.infoPanelContainer = crAffectedItemsSlideInContainer;
				input.isSelected = true;

                ChgDataService.getChangeRequestUserAccess(physicalID).then(function (resp) {
                    ChgCRAffectedItemsDataGridLayout.createAffectedItemsView(input, new ModelEvents(appChannelOptions));
                                
                    CASpinner.endWait(widget.body);
                    var contextId = physicalID;
                    var type = resp.data[0].type;
                    var accessBits = resp.data[0].dataelements;

                    var processedResponse = {
                      id: contextId,
                      type: type,
                      accessBits: accessBits,
                    };
                    PlatformAPI.publish("CO-AccessBit-Update", processedResponse);
                });
                  
              });
            });
        });
        });
	  }   
</script>
</head>
<body onLoad = "loadAffectedItemsContent();" style="overflow:hidden;">
<div id="crAffectedItemsParentContainer" style="height: 100%; width: 100%; display: flex;"></div>
</body>
</html>  
