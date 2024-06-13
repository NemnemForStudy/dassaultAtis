<%--  DSCMCADMultiPromote.jsp

   Copyright (c) 2016-2020 Dassault Systemes. All rights reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes and its subsidiaries. Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>
<%--  IEFObjectsUnlock.jsp   -  Does unlock operation on selected objects.
--%>

<%@ include file = "MCADTopInclude.inc" %>
<%@ include file = "MCADTopErrorInclude.inc" %>
<%@ page import="com.matrixone.apps.domain.util.*" %>
<%@page import="com.matrixone.apps.domain.util.ENOCsrfGuard"%>
//FUN098015
<%@ page import="com.matrixone.MCADIntegration.server.*" %>
<%@ page import="com.matrixone.MCADIntegration.server.beans.*" %>
<%@ page import="com.matrixone.MCADIntegration.server.*" %>
<%@ page import="com.matrixone.MCADIntegration.ui.*" %>
<%@ page import="java.lang.reflect.*" %>
<%@ page import="java.util.List" %>


<%
	String featureName			= MCADGlobalConfigObject.FEATURE_PROMOTE;
	java.util.Enumeration itl	= emxGetParameterNames(request);
	
	String sIntegrationName		=Request.getParameter(request,"tableFilter");
	String sAction				=Request.getParameter(request,"action");
	String sRefreshFrame		=Request.getParameter(request,"refreshFrame");
	String currentObjectId		=Request.getParameter(request,"objectId");

	String actionURL						= "";
	String sObjectId						= "";
	String integrationName					= "";
	String checkoutStatus					= "";
	String objectsInfo						= "";
	String checkoutMessage					= "";
	String errorMessage						= "";
	Context _context						= null;
	String[] objectCheckoutDetails			= null;
	String params							= "";
	String sTargetLocation					= "";
	String selectedObjectIds				= "";
	String isMultiPromote					= "false";
	String restrictMultiPromoteToECOSearch	= "false";
// FUN098015
	String ParentFrame ="";
	String aintegrationName = "";

	boolean bEnableAppletFreeUI = false;
	MCADIntegrationSessionData integSessionData		= (MCADIntegrationSessionData)session.getAttribute("MCADIntegrationSessionDataObject");
	String acceptLanguage							= request.getHeader("Accept-Language");
	MCADServerResourceBundle serverResourceBundle	= new MCADServerResourceBundle(acceptLanguage);
	String unSupportedCommandErrorMessage			= "";
	String otherCommandActiveErrorMessage			= "";

	if(integSessionData != null)
	{   		
		Context context = integSessionData.getClonedContext(session);
// FUN098015
		bEnableAppletFreeUI = MCADMxUtil.IsAppletFreeUI(context);
		ENOCsrfGuard.validateRequest(context, session, request, response);
		unSupportedCommandErrorMessage	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.UnSupportedCommand");
		otherCommandActiveErrorMessage	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.OtherCommandActive");
		restrictMultiPromoteToECOSearch	= integSessionData.getPropertyValue("mcadIntegration.RestrictMultiPromoteToECOSearch").toLowerCase();	

		String[] objectIds	= emxGetParameterValues(request, "emxTableRowId");
		sTargetLocation =Request.getParameter(request,"Target Location");
		
		if (objectIds == null || objectIds.equals("null"))
		{
		    String objectId = (String)Request.getParameter(request,"objectId");
		    if (null != objectId)
		    {
		        objectIds = new String[1];
		        objectIds[0] = objectId;         
		    }
		}
		else if(objectIds!=null && objectIds.length>0)
		{
			for(int i=0; i < objectIds.length; i++)
			{
				//emxTableRowId value is obtained in the format relID|rowInfo Or ObjectId. Need to parse the value
				StringList sList = FrameworkUtil.split(objectIds[i],"|");
			
				if(sList.size() == 1 || sList.size() == 2)
				    objectIds[i] = (String)sList.get(0);

			        //StructureBrowser value is obtained in the format relID|objectID|parentID|additionalInformation
				else if(sList.size() == 3)
				    objectIds[i] = (String)sList.get(0);
					
				else if(sList.size() == 4)
				    objectIds[i] = (String)sList.get(1);
			}
		}
		
		if(objectIds.length>1)
			isMultiPromote = "true";
		
		
		MCADMxUtil util	= new MCADMxUtil(context, integSessionData.getLogger(), integSessionData.getResourceBundle(),integSessionData.getGlobalCache());
        
		if (null == objectIds || objectIds.length <= 0)
		{
			 String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.ErrorNoSelection");				 
			 actionURL		= "./MCADMessageFS.jsp?";
			 actionURL		+= "&message=" + message;
			 errorMessage	= message;
		}
		else
		{
			String lastIntegName = "";
			
			boolean errorOccured  = false;
			try
			{
				for(int i=0; i < objectIds.length; i++)
				{
					sObjectId				= objectIds[i];
					integrationName			= util.getIntegrationName(integSessionData.getClonedContext(session),sObjectId);
					MCADGlobalConfigObject globalConfigObject = integSessionData.getGlobalConfigObject(integrationName,context);
				
					
					if(!"".equals(lastIntegName) && lastIntegName != null && !lastIntegName.equals(integrationName))
					{
						String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.ErrorMultipleGCOObjectSelection");
						actionURL		= "./MCADMessageFS.jsp?";
						actionURL		+= "&message=" + message;
						errorMessage	= message;
						errorOccured	= true;
						break;
					}

					lastIntegName		= integrationName;
		
				
					BusinessObject bus = new BusinessObject(sObjectId);
					bus.open(context);
					String typeNameOrig		= bus.getTypeName();
					String typeName			= typeNameOrig;

					//[NDM] OP6
					/*if(!globalConfigObject.isMajorType(typeName))
					{						
						typeName = util.getCorrespondingType(context, typeName);
					}*/
					
					bus.close(context);
				    
					boolean isOperationAllowed = integSessionData.isOperationAllowed(context,integrationName,typeName,sAction);
					
					if(!isOperationAllowed)
					{
						if("".equals(errorMessage))
						{
							errorMessage = sAction + " " + UINavigatorUtil.getI18nString("emxIEFDesignCenter.Error.OperationNotAllowed","emxIEFDesignCenterStringResource", request.getHeader("Accept-Language")) + " " + typeNameOrig;
						}
						else
						{
							errorMessage = errorMessage + " ||| " + sAction + " " + UINavigatorUtil.getI18nString("emxIEFDesignCenter.Error.OperationNotAllowed","emxIEFDesignCenterStringResource", request.getHeader("Accept-Language")) + " " + typeNameOrig;
						}
						
					}
					
					
					if("".equals(selectedObjectIds))
					{
						selectedObjectIds = sObjectId;
					}
					else
					{
						selectedObjectIds = selectedObjectIds + "," + sObjectId;
					}
				}

				String isFeatureAllowed	= integSessionData.isFeatureAllowedForIntegration(integrationName, featureName);
				if(!isFeatureAllowed.startsWith("true"))
				{
					String message	= isFeatureAllowed.substring(isFeatureAllowed.indexOf("|")+1, isFeatureAllowed.length());
					actionURL		= "./MCADMessageFS.jsp?";
					actionURL		+= "&message=" + message;
					errorMessage	= message;
					errorOccured	= true;
				}

				if(lastIntegName != null && !lastIntegName.equals("") && errorOccured == false)
				{
  					MCADGlobalConfigObject globalConfigObject	= integSessionData.getGlobalConfigObject(integrationName,context);
							
					HashMap paramMap		= new HashMap();
					MapList objectList		= new MapList();
					HashMap objectDetails	= new HashMap();
					HashMap gcoMap			= new HashMap();
				   
					objectDetails.put("id", selectedObjectIds);
					objectList.add(objectDetails);
					gcoMap.put(lastIntegName, globalConfigObject);
					paramMap.put("objectList", objectList);
					paramMap.put("GCOTable", gcoMap);
					paramMap.put("LocaleLanguage", integSessionData.getLanguageName());
					
					String[] init		= new String[] {};
					String jpoMethod	= "getURL";
					String jpoName		= "DSCShowPromoteLink";
					
					_context   = Framework.getFrameContext(session);
					
					String url = (String)JPO.invoke(_context, jpoName, init, jpoMethod, 
								   JPO.packArgs(paramMap), String.class);
					actionURL += url; 
					actionURL += "&integrationName=" + lastIntegName;					
				}

				if(sAction.equalsIgnoreCase("AppletFreeMultiPromote"))
				{//FUN098015	
					if(bEnableAppletFreeUI)
					{
						 ParentFrame	=Request.getParameter(request,"refreshFrame");
						String sProtocol, sPort, sHost, refServer;

						//check for forwarded first
						sProtocol = request.getHeader("X-Forwarded-Proto");
						sPort     = request.getHeader("X-Forwarded-Port");
						sHost     = request.getHeader("X-Forwarded-Host");
						//if not forwarded use regular
						if (sProtocol == null) {
							sProtocol = request.getScheme();
						}
						if (sPort == null) {
							sPort = "" + request.getLocalPort();
						}
						if (sHost == null) {
							sHost = request.getServerName();
						} else { //port sometimes comes thru in the X-Forwarded-Host, so clean up
							int portIndex = sHost.indexOf(':');
							if (portIndex != -1) {
								 sPort = sHost.substring(portIndex + 1);
								 sHost = sHost.substring(0, portIndex);
							}
						}
						
						refServer = sProtocol + "://" + sHost;
						if (sPort.length() > 0) {
							refServer += ":"+ sPort;
						}

						String requestURI   = request.getRequestURI();
						
					    String pathWithIntegrationsDir	= requestURI.substring(0, requestURI.lastIndexOf('/'));
					    String pathWithAppName			= pathWithIntegrationsDir.substring(0, pathWithIntegrationsDir.lastIndexOf('/'));
					    String appName = application.getInitParameter("ematrix.page.path");
					    if(appName == null)
							appName = "";

					    String virtualPath								= refServer + appName;
					    java.util.ResourceBundle  mcadIntegrationBundle			= java.util.ResourceBundle.getBundle("ief");
						String sessionid 								= "JSESSIONID=" + session.getId();
					
						aintegrationName = util.getIntegrationName(context, sObjectId);
						
						/*IR-907816* getting cookies from the store*/
						System.out.println("Getting cookies in jsp ===== "+request.getCookies());
						Cookie[] cookies = request.getCookies();
						List keyValuePairList = new ArrayList();
					
					
						if(cookies !=null) {
							for(int j=0; j < cookies.length; j++) {
								Cookie cookie=cookies[j];
								
								String cookieName =cookie.getName();
								String cookieValue = cookie.getValue();
								keyValuePairList.add(cookieName+"="+cookieValue);
								System.out.println("Getting cookies in jsp cookieName ====== "+cookieName);
								System.out.println("Getting cookies in jsp cookieValue ===== "+cookieValue);
								}
							
							}

						if(sAction.equalsIgnoreCase("AppletFreeMultiPromote"))
						{
							DSCAppletFreeCmdHandler appletFreeCmdHandler = (DSCAppletFreeCmdHandler)session.getAttribute("appletFreeCmdHandler");
							if(appletFreeCmdHandler == null){
								appletFreeCmdHandler = new DSCAppletFreeCmdHandler(integSessionData, sProtocol, sPort, sHost, refServer, requestURI, pathWithIntegrationsDir, pathWithAppName, appName, virtualPath, acceptLanguage,sessionid,  mcadIntegrationBundle, keyValuePairList);
								session.setAttribute("preferencehandler", appletFreeCmdHandler );		    
							}
							IEFFinalizationPage iefFinalizationPage = appletFreeCmdHandler.createPromotePage(aintegrationName, "", selectedObjectIds);
						}
				
					
					/* String site = "  ../integrations/DSCProgressBarForAppletFree.jsp?url=../integrations/DSCpromoteAppletFree.jsp&refreshFrame=content&objectIds="+selectedObjectIds+"&integrationName="+lastIntegName+"&action=AppletFreePromote";
									
			        response.setStatus(response.SC_MOVED_TEMPORARILY);
			        response.setHeader("Location", site);  */
				}
				}

			}
			catch(Exception exception)
			{
				emxNavErrorObject.addMessage(exception.getMessage());
			}	
		}
	}
	else
	{
		String message	= serverResourceBundle.getString("mcadIntegration.Server.Message.ServerFailedToRespondSessionTimedOut");	
		emxNavErrorObject.addMessage(message);
		errorMessage	= message;
	}
%>
<html>
<head>
<script language="JavaScript" type="text/javascript" src="../common/scripts/emxUICore.js"></script>
<script language="JavaScript" type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
<script language="JavaScript" type="text/javascript" src="../emxUIPageUtility.js"></script>
<script language="JavaScript" src="scripts/IEFUIConstants.js"></script>
<script language="JavaScript" src="scripts/IEFUIModal.js"></script>
<script src="scripts/MCADUtilMethods.js" type="text/javascript"></script>

<script language="javascript" >

var refreshFrame		= getFrameObject(top, '<%=XSSUtil.encodeForJavaScript(_context,sRefreshFrame)%>');
var integrationFrame	= getIntegrationFrame(this);
if(integrationFrame != null)
{
	if(refreshFrame == null) 
	{
		//Set the refresh for Full Search
		refreshFrame = getFrameObject(top, "structure_browser");
	}

	integrationFrame.setActiveRefreshFrame(refreshFrame);
}

function showDialogPopup(url) 
{
//FUN098015	
	if('<%=bEnableAppletFreeUI%>' == "true")
	{
		if('<%=sAction%>' == "AppletFreeMultiPromote")
		{
		
		showIEFModalDialog("./MCADFinalizationFS.jsp?" + "integrationName=" + "<%=aintegrationName%>" + "&ParentFrame=" + "<%=ParentFrame%>", 850, 650);
		}
	}
	else{
	var integrationFrame			= getIntegrationFrame(this);
	//XSSOK
	var integrationName				= '<%=integrationName%>';
	//XSSOK
	var unSupportedCommandErrorMsg	= "<%=unSupportedCommandErrorMessage%>";
	//XSSOK
	var otherCommandActiveErrorMsg	= "<%=otherCommandActiveErrorMessage%>";
	var details						= integrationName;
	
	var commandName = null;
	if(integrationFrame!=null)
	{
		var mxmcadApplet = integrationFrame.getAppletObject(); 
		if(mxmcadApplet!= null)
			commandName = mxmcadApplet.callCommandHandlerSynchronously(integrationName, "getCommandName", details);
	}	
	if(commandName!=null && commandName == 'initiatewsm')
	{
		alert(unSupportedCommandErrorMsg);
	}
	else
	{
		var isCommandActive = integrationFrame.isDSCCommandActive();
        //XSSOK
		if ("<%=errorMessage%>" == '')
		{   //XSSOK
			if(parent != null && parent.location != null && "<%=isMultiPromote%>" == "true" && "<%=restrictMultiPromoteToECOSearch%>"=="true" && parent.location.href.indexOf("table=DSCECOSearch") == -1)
			    //XSSOK
				alert("<%=serverResourceBundle.getString("mcadIntegration.Server.Message.MultiPromoteRestrictedToECOSearch")%>");
			else
			{
				if("<%=XSSUtil.encodeForJavaScript(_context,sAction)%>" == "MultiPromote")
				{
					if(isCommandActive=="true" || isCommandActive==true)
					{
						alert(otherCommandActiveErrorMsg);
					}
					else
					{
						var finalizationDetails = null;
						var stringToEncode;
						//XSSOK
						if("<%=isMultiPromote%>" == "true")
						    //XSSOK
							{
								//FUN098571- Encoding for Tomee8
								stringToEncode = '<%=integrationName%>' + "@" + "isMultiPromote|" ;
								stringToEncode = encodeURI(stringToEncode);
								finalizationDetails = stringToEncode+ '<%=XSSUtil.encodeForJavaScript(_context,selectedObjectIds)%>';
							}
						else
						    //XSSOK
							{
								//FUN098571- Encoding for Tomee8
								stringToEncode = '<%=integrationName%>' + "|";
								stringToEncode = encodeURI(stringToEncode);
								finalizationDetails = stringToEncode + '<%=XSSUtil.encodeForJavaScript(_context,selectedObjectIds)%>';
							}
                            //XSSOK
						showFinalizationPage('<%=integrationName%>', finalizationDetails);
					}
				}
				else
				{
					showIEFModalDialog(url, '500', '500');
				}
			}
		}
	}
	}
}
</script>

</head>

<%@include file = "MCADBottomErrorInclude.inc"%>
<body onLoad="showDialogPopup('<%=actionURL%>')">
    
<script language="javascript" >
        //XSSOK
	if ("<%=errorMessage%>" != '')
	   //XSSOK
	   javascript:alert("<%=errorMessage%>");

</script>
	
</body>
</html>
