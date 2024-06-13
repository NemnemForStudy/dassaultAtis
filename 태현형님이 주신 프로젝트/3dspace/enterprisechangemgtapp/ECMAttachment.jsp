<%--
  ECMAttachment.jsp
  
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
<%@page import="java.util.Map"%>
<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="com.matrixone.apps.domain.util.MqlUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import = "com.matrixone.apps.domain.DomainConstants"%>
<%@page import = "com.dassault_systemes.enovia.enterprisechangemgt.common.ChangeConstants"%>


<%
  out.clear();
  String urlStr = "";
  String  strContextID = "";
  String strObjectType = "";
  boolean bIsError = false;
  String parentType = "";
  try
  {
    String objectId = emxGetParameter(request,"objectId");
    DomainObject rootDom = new DomainObject(objectId);
    strContextID = rootDom.getInfo(context, "physicalid");
    parentType = emxGetParameter(request,"parentType");

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
    /*#attachmentParentContainer .content-attachment-tile-div, #attachmentParentContainer .content-attachment-grid-div {
      height: calc(100% - 30px) !important;
    }*/
</style>
<script>

    function loadAttachmentContent(){
          
        require(['DS/PlatformAPI/PlatformAPI',
            'DS/ENOChangeActionUX/scripts/CASpinner',
            'DS/ENOChgServices/scripts/services/ChgInfraService',
            'DS/ENOChgServices/scripts/services/ChgServiceGlobalVariable',
            'DS/CoreEvents/ModelEvents',
            'DS/ENOChgGovernanceUX/scripts/components/attachmentView/ChgAttachmentView',
            'DS/ENOChgServices/scripts/services/ChgIDCardCommonServices',
            'DS/ENOChgServices/scripts/services/ChgDataService'
        ],
        function(PlatformAPI, CASpinner,ChgInfraService,ChgServiceGlobalVariable, ModelEvents, ChgAttachmentView, ChgIDCardCommonServices, ChgDataService){
               
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
                ChgInfraService.getSearchForbiddenTypes().then(function (success){
                ChgInfraService.getSearchTypes().then(function (success){
					
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
                /*for maturity rmb on grid*/
                Array.prototype.find = function (userFunction) {
                  var bFound = false;
                  for (var i=0; i  < this.length ; i++) {
                    if (userFunction(this[i])) {
                      //bFound = true;
                      return this[i];
                    }
                  }

                  return undefined;
                }

                delete Array.prototype.remove;
                delete Array.prototype.apply;
                var physicalID = '<%=strContextID%>';
                var parentType = '<%=parentType%>';
                var attachmentFullViewContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'attachmentFullViewContainer',
                  'styles' : {
                    'height' : 'calc(100% - 20px)',
                    'width': '100%'
                  }
                });

                                    
                var maincontainer = document.getElementById('attachmentParentContainer');
                
                maincontainer.appendChild(attachmentFullViewContainer);
                var accessBits, readOnly = false;
                if (parentType == "Change Order") {

                  ChgDataService.getChangeOrderUserAccess(physicalID).then(function (resp){
                    accessBits = resp.data[0].dataelements;
                    readOnly = (accessBits.AddReferential == 'false');
                    var option = {
                      id: physicalID,
                      target: attachmentFullViewContainer,
                      parentType: parentType
                    }
                    
                    ChgAttachmentView.create(option, readOnly);
                    
                    CASpinner.endWait(widget.body);
                  });
                } 
                else if (parentType == "Change Request") {
                  
                  ChgDataService.getChangeRequestUserAccess(physicalID).then(function (resp){
                    accessBits = resp.data[0].dataelements;
                    readOnly = (accessBits.AddReferential == 'false');
                    readOnly = false;
                    var option = {
                      id: physicalID,
                      target: attachmentFullViewContainer,
                      parentType: parentType
                    }
                    
                    ChgAttachmentView.create(option, readOnly);
                    
                    CASpinner.endWait(widget.body);
                  });
                }
                else if(parentType == "Change Action"){

                  ChgIDCardCommonServices.getUserAccess("pid:"+physicalID).then(function (resp){
                    accessBits = resp.userAccess;
                    readOnly = (accessBits.AddReferential == 'false');
                    var option = {
                      id: physicalID,
                      target: attachmentFullViewContainer,
                      parentType: parentType
                    }
                    
                    ChgAttachmentView.create(option, readOnly);
                    
                    CASpinner.endWait(widget.body);
                  });
                } 
              });
              });
              });
              });
            });
        });
	  }   
</script>
</head>
<body onLoad = "loadAttachmentContent();" style="overflow:hidden;">
<div id="attachmentParentContainer" style="height: 100%; width: 100%; display: flex;"></div>
</body>
</html>  
