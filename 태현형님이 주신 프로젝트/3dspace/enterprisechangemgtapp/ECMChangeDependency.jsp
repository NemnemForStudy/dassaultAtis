<%--
  ECMChangeDependency.jsp
  
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
    strContextID = "pid:" + strContextID;
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
<link rel="stylesheet" type="text/css" href="../webapps/ENOChangeActionUX/ENOChangeActionUX.css" />
<link rel="stylesheet" type="text/css" href="../webapps/ENOChgActionGridUX/ENOChgActionGridUX.css" />
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
        height:100%;
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
</style>
<script>
    var rootNode;

    function loadDependencyContent()
     {
         if(rootNode)
         {
             getTopWindow().window.close();
         }
         else
         {   
             require(['DS/PlatformAPI/PlatformAPI',
                      'DS/ENOChangeActionUX/scripts/CASpinner',
                      'DS/ENOChgServices/scripts/services/ChgInfraService',
                      'DS/ENOChgServices/scripts/services/ChgServiceGlobalVariable',
                      'DS/ENOChangeActionUX/scripts/Models/CADependencyModel',
                      'DS/ENOChgServices/scripts/services/ChgDependencyServices'
                      ],
                     function(PlatformAPI, CASpinner,
                     ChgInfraService,ChgServiceGlobalVariable, CADependencyModel, ChgDependencyServices){
                 
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
                        //myAppBaseURL = currentTop.x3DPlatformServices[0]['3DCompass'];
                      }

                      var config = {
                        myAppsBaseUrl: myAppBaseURL,
                        userId: userId,
                        lang: language
                      };
                       
                      ChgInfraService.populate3DSpaceURL(config).
                        then(function(success){
                          ChgInfraService.populateSecurityContext()
                            .then(function (securityContextDetails){
								let platform = "WebApp";
								ChgInfraService.getLicenceAccess(platform).then(
								function(response){
									ChgServiceGlobalVariable.getGlobalVariable().isFullLicence=response.data[0].IsFullLicense;
									ChgServiceGlobalVariable.getGlobalVariable().isLiteLicence=response.data[0].IsLiteLicense;
					
									ChgInfraService.fetchSubTypes();
					
									var that = this;

									var physicalID = '<%=strContextID%>';
				  
									caGlobalObject.changeActionDependenciesLoaded = false;
									caGlobalObject.changeActionDependencyModel = null;
					
									that.CADependencyModelObj = new CADependencyModel();
									CADependencyModelObj.fetch(physicalID).then(function () {
										ChgDependencyServices.changeActionDependenciesLoaded = true;
										ChgDependencyServices.changeActionDependencyModel = that.CADependencyModelObj;
					
										var Content = new UWA.createElement('div', {
												  'id': 'main-container',
												  styles: { height: '100%', width: '100%', display: 'flex' },
												  html: [
													{
													  tag: 'div',
													  id: 'skeleton-container',
													  styles: { height: 'calc(100% - 20px)', width: '100%' }
													},
													{
													  tag: 'div',
													  id: 'slidein-container',
													  styles: { height: '100%', width: '0', position: 'fixed', zIndex: '1', top: '0', right: '0', overflowX: 'hidden', transition: '.5s', borderLeft: '0 solid #d1d4d4', background: 'white' }
													}
												  ]
										}); 
										var maincontainer = document.getElementById('maincontainer');
										maincontainer.appendChild(Content);
										var skeletonContainer = Content.getElement("#skeleton-container");
										var realizedViewMainContainerElem = document.getElementById('dependencyViewMainContainer');
										var realizedviewContainerDivelem = UWA.createElement('div', {
													'class' : 'divElem', 
													'id' : 'realizedViewContainer',
													'styles' : {
													  'height' : '100%',
													  'width': '100%'
													}
										});
										skeletonContainer.appendChild(realizedViewMainContainerElem);
										realizedViewMainContainerElem.appendChild(realizedviewContainerDivelem);
					  
										require(['DS/ENOChangeActionUX/scripts/Views/CADependenciesGridView'], function (CADependenciesGridView) {

										  var params = {};
										  params.id = '<%=strContextID%>';
										  params.widgetId = widget.id;
										  params.widgetTitle = widget.title;
										  params.showFlowdown = false;
										  var dependencyView = new CADependenciesGridView(params);
										  //var dependencyView = new CADependenciesGridView('<%=strContextID%>');
										  dependencyView.container = realizedviewContainerDivelem;
										  dependencyView.render();
										  
										  CASpinner.endWait(widget.body);
										});
									});
								
								},
								function(err){
								  reject(err);
								});
                            },
                          function(error){
                              console.log("Populate Security Context failed");
                              CASpinner.endWait(widget.body);
                              return Promise.reject(error);
                          });


                      });
                 
                      
             });
         }
     }
    
</script>
</head>
<body onLoad = "loadDependencyContent();" style="overflow:hidden;">
<div id="maincontainer"></div>
<div id="dependencyViewMainContainer"></div>
</body>
</html>  
