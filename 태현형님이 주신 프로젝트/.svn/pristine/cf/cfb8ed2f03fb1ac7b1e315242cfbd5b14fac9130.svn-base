<%--  DSCMCADGenericActionsProcess.jsp

   Copyright (c) 2016-2020 Dassault Systemes. All rights reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes and its subsidiaries. Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>
<%--  -  Does unlock operation on selected objects.

--%>

<%@ include file = "MCADTopInclude.inc" %>
<%@ include file = "MCADTopErrorInclude.inc" %>
//commented for FUN098015 :
<%@ page import="com.matrixone.MCADIntegration.server.*" %>
<%@ page import="com.matrixone.MCADIntegration.server.beans.*" %>
<%@ page import="com.matrixone.MCADIntegration.server.*" %>
<%@ page import="com.matrixone.MCADIntegration.ui.*" %>
<%@ page import="java.lang.reflect.*" %>

<script language="JavaScript" src="scripts/IEFUIConstants.js"></script>
<script language="JavaScript" src="scripts/IEFUIModal.js"></script>
<script language="JavaScript" src="scripts/MCADUtilMethods.js"></script>
<script language="JavaScript" src="../common/scripts/emxUIConstants.js" type="text/javascript"></script>
<%@ page import="com.matrixone.apps.domain.util.*,com.matrixone.MCADIntegration.server.MCADServerSettings,matrix.db.JPO,com.matrixone.MCADIntegration.server.beans.*" %>
<%@page import="com.matrixone.apps.domain.util.ENOCsrfGuard"%>
<%@ page import="com.matrixone.apps.domain.*" %>
<%@ page import="matrix.util.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.*" %>
<%
	java.util.Enumeration itl = emxGetParameterNames(request);

	MCADIntegrationSessionData integSessionData = (MCADIntegrationSessionData)session.getAttribute("MCADIntegrationSessionDataObject");
	Context context = integSessionData.getClonedContext(session);
	String sIntegrationName	=Request.getParameter(request,"tableFilter");
	String fromLocation	=Request.getParameter(request,"fromLocation");
	String sAction			=XSSUtil.encodeForJavaScript(integSessionData.getClonedContext(session),Request.getParameter(request,"action"));
	String sRefreshFrame	=Request.getParameter(request,"refreshFrame");
	String currentObjectId	=Request.getParameter(request,"objectId");
	
	String baselineId	=Request.getParameter(request,"baselineId");
	
	String fromBaselineOpen	=Request.getParameter(request,"fromBaselineOpen");
	boolean bEnableAppletFreeUI = MCADMxUtil.IsAppletFreeUI(context);


	
	String launchCADTool	=Request.getParameter(request,"LaunchCADTool");
	// [NDM] QWJ
	String isVersionedObject 	=Request.getParameter(request,"isVersionedObject"); 
	
	String actionURL		= "";
	String sObjectId		= "";
	String sObjectIds		= "";
	String integrationName  = "";
	String checkoutStatus   = "";
	String objectsInfo      = "";
	String checkoutMessage  = "";
	String errorMessage		= "";
	String params			= "";
	String sTargetLocation	= "";
	String errMsg			= "";
	String helpUrl			= "";
	String featureName		= sAction;
	String isFeatureAllowed	= "";
	String isPreSaveAsEnabled = "false";
	String sBaselineOpenDetails = "";
	//commented for FUN098015 :
	String ParentFrame ="";
	String aintegrationName = "";
	boolean isGrayOutMsgRequired = false; //IR-833368

	String showBareboardPage		= "";
	Context _context				= null;
	String[] objectCheckoutDetails	= null;

    StringList selectables = new StringList();
	selectables.add(DomainObject.SELECT_ID);
	selectables.add("physicalid");
	
	String unSupportedCommandErrorMessage		= "";
	String otherCommandActiveErrorMessage		= "";

	if(integSessionData != null)
	{
		unSupportedCommandErrorMessage	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.UnSupportedCommand");
		otherCommandActiveErrorMessage	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.OtherCommandActive");

		String[] objectIds	= emxGetParameterValues(request, "emxTableRowIdActual");
		if (objectIds == null || objectIds.equals("null"))
			objectIds	= emxGetParameterValues(request, "emxTableRowId");		

		sTargetLocation =Request.getParameter(request,"Target Location");

		if (objectIds == null || objectIds.equals("null"))
		{
		    String objectId = (String)Request.getParameter(request,"objectId");
		    if (null != objectId && !objectId.equals("null"))
		    {
				objectIds		= new String[1];
		        objectIds[0]	= XSSUtil.encodeForJavaScript(integSessionData.getClonedContext(session),objectId);
		    }
		}
		else if(objectIds!=null && objectIds.length>0)
		{
			for(int i=0; i < objectIds.length; i++)
			{
			    //If the node is selected from Navigate page relID|objectId or ObjectId combination will come as node value				
                StringList sList = FrameworkUtil.split(objectIds[i],"|");
        
			    if(sList.size() == 1 || sList.size() == 2)
				    objectIds[i] = (String)sList.get(0);

			    //Structure Browser value is obtained in the format relID|objectID|parentID|additionalInformation
                else if(sList.size() == 3) //when relID comes as blank 
				    objectIds[i] = (String)sList.get(0);

				else if(sList.size() == 4)
				    objectIds[i] = (String)sList.get(1);
			}
		}

		if(fromLocation == null || fromLocation.equals("") || fromLocation.equals("null"))
		     fromLocation="Command";
		 
		//IR-670955 : Fix for appletFreeDownloadStructure (Action Button on summary page)
		if(fromLocation.equals("Table")&&sAction.equals("DownloadStructure") || fromLocation.equals("Table")&&sAction.equals("appletFreeDownloadStructure"))  
		{
			//do nothing 
}
		else{
			ENOCsrfGuard.validateRequest(context, session, request, response);	
		}
		MCADMxUtil util	= new MCADMxUtil(context, integSessionData.getLogger(),integSessionData.getResourceBundle(),integSessionData.getGlobalCache());

		if(null == objectIds || objectIds.length <= 0)
		{
			String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.ErrorNoSelection");
			actionURL		= "./MCADMessageFS.jsp?";
			actionURL		+= "&message=" + message;
			errorMessage	= message.trim();
		}
		else if(objectIds.length > 1 && (!sAction.equals("Replace")) && (!sAction.equals("SaveAs")))
		{
			String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.MultipleSelection");
			actionURL		= "./MCADMessageFS.jsp?";
			actionURL		+= "&message=" + message;
			errorMessage	= message.trim();
		}
		else
		{
			if(sAction.equals("SaveAs"))
			{
				HashMap resultMap = util.checkSameIntegrationName(context,integSessionData,objectIds);
				if(resultMap != null && resultMap.size() > 0)
				{
					String message  = (String)resultMap.get("false");					
					if(message != null && message.length() > 0)
					{
						errorMessage = message;
						//break;
					}
				}
			}
			MapList replaceObjectList = new MapList();
			HashMap replaceParamMap = new HashMap();
			//Replace-- Add the current object and the list of objects selected by the user.
			replaceParamMap.put("objectList",replaceObjectList);
			replaceParamMap.put("currentObjectId",currentObjectId);

			if(objectIds!=null){
		        MapList mlObjInfo = DomainObject.getInfo(context, (String[])objectIds, selectables);
		        for(int k=0;k<mlObjInfo.size();k++)
		        {
		        	Map mpEachObj = (Map)mlObjInfo.get(k);
		        	String sEachOid = objectIds[k];
		        	String sPhyId = (String) mpEachObj.get("physicalid");
					if(sPhyId.equals(sEachOid)){
						objectIds[k] = (String) mpEachObj.get(DomainObject.SELECT_ID);
					}	
		        }
			}
			for(int i=0; i < objectIds.length; i++)
			{
				try
				{
					sObjectId			  = objectIds[i];
					HashMap integGCONames = integSessionData.getIntegrationNameGCOTable(context);
					integrationName		  = util.getIntegrationName(context, sObjectId);

					sObjectIds			  += objectIds[i];
					if(i  < objectIds.length -1)
					{
						sObjectIds += ";";
					}

					if(integrationName != null && !integrationName.equals(""))
					{
						BusinessObject bus = new BusinessObject(sObjectId);
						bus.open(context);

						if(!integGCONames.containsKey(integrationName))
						{
							errMsg = UINavigatorUtil.getI18nString("emxIEFDesignCenter.Common.IntegrationUnassigned","emxIEFDesignCenterStringResource", request.getHeader("Accept-Language"));
							String busName = bus.getName();
							throw new Exception(integrationName+" "+errMsg+" "+busName);
						}

						isFeatureAllowed = integSessionData.isFeatureAllowedForIntegration(integrationName, featureName);
						if(!isFeatureAllowed.startsWith("true"))
						{
							errorMessage	= isFeatureAllowed.substring(isFeatureAllowed.indexOf("|")+1, isFeatureAllowed.length()).trim();
							String busName	= bus.getName();
							throw new Exception(errorMessage);
						}

						MCADGlobalConfigObject globalConfigObject = integSessionData.getGlobalConfigObject(integrationName,context);

						String preSaveAsEval = (String)globalConfigObject.getFeatureJPO("PreSaveAsEvaluation");
						if(preSaveAsEval !=  null && preSaveAsEval.length() > 0)
						{
							isPreSaveAsEnabled = "true";
						}
						

						HashMap paramMap		= new HashMap();
						MapList objectList		= new MapList();
						HashMap objectDetails	= new HashMap();
						HashMap gcoMap			= new HashMap();
						String typeNameOrig		= bus.getTypeName();
						String typeName			= typeNameOrig;

						// [NDM] OP6
						/*if(!globalConfigObject.isMajorType(typeName))
						{
							typeName = util.getCorrespondingType(context, typeName);
						}*/

						bus.close(context);

						boolean isOperationAllowed = integSessionData.isOperationAllowed(context,integrationName,typeName,sAction);

                    	if(!isOperationAllowed)
						{
							errorMessage = sAction + " " + UINavigatorUtil.getI18nString("emxIEFDesignCenter.Error.OperationNotAllowed","emxIEFDesignCenterStringResource", request.getHeader("Accept-Language")) + " " + typeNameOrig;
						}

                                             //[NDM] : L86						
                                            /*if(sAction.equals("SaveAs") && integrationName.equals(MCADAppletServletProtocol.SOLIDWORKS_INTEG_NAME))
						{
							Hashtable messageTable = new Hashtable(2);
				            messageTable.put("NAME", integSessionData.getStringResource("mcadIntegration.Server.Feature.SaveAs"));
							messageTable.put("INTEGNAME", integrationName);

							errorMessage = integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.FeatureNotSupported", messageTable);
						}*/ //[NDM] : L86

						if(sAction.equals("checkout") && integrationName.equals(MCADAppletServletProtocol.SOLIDWORKS_INTEG_NAME))
						{
							Hashtable messageTable = new Hashtable(2);
				                        messageTable.put("NAME", integSessionData.getStringResource("mcadIntegration.Server.Feature.checkout"));
							messageTable.put("INTEGNAME", integrationName);

							errorMessage = integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.FeatureNotSupported", messageTable);
						}

						if(sAction.equals("Replace"))
						{
							objectDetails.put("id", objectIds[i]);
							replaceObjectList.add(objectDetails);
							gcoMap.put(integrationName, globalConfigObject);
							replaceParamMap.put("GCOTable", gcoMap);
							replaceParamMap.put("LocaleLanguage", integSessionData.getLanguageName());
						}
                        else
						{
							objectDetails.put("id", objectIds[0]);
							objectList.add(objectDetails);
							gcoMap.put(integrationName, globalConfigObject);
							paramMap.put("objectList", objectList);
							paramMap.put("GCOTable", gcoMap);
							paramMap.put("LocaleLanguage", integSessionData.getLanguageName());
						}

						String[] init		= new String[] {};
						String jpoName		= "DSCShowPurgeLink";
						String jpoMethod	= "getURL";
						if(sAction.equals("checkout")||sAction.equals("QuickCheckout") || sAction.equals("DownloadStructure"))
						{
	
							
							HashMap argumentsMap = new HashMap();

							argumentsMap.put("ObjectIDs", objectIds);
							argumentsMap.put("ObjectIDsDMUSessionNameTable", null);
							argumentsMap.put("LocaleLanguage", integSessionData.getLanguageName());
							argumentsMap.put("GCOTable", integSessionData.getIntegrationNameGCOTable(context));
							argumentsMap.put("LCO",integSessionData.getLocalConfigObject());
							String [] packedArguments = JPO.packArgs(argumentsMap);

							objectCheckoutDetails = util.executeJPOReturnStrArray(context, "IEFMultipleCheckout", "getValidObjIdsForCheckout", packedArguments);
							integrationName		  = objectCheckoutDetails[0];
							checkoutStatus        = objectCheckoutDetails[1];
							objectsInfo			  = objectCheckoutDetails[2];
							checkoutMessage		  = objectCheckoutDetails[3];
							
							

	if(fromBaselineOpen!=null && "true".equals(fromBaselineOpen)){
		StringBuffer sbParamDetails = new StringBuffer(200);
		//sbParamDetails.append("|");
		sbParamDetails.append("fromBaselineOpen");
		sbParamDetails.append("|");
		sbParamDetails.append(baselineId);
		sBaselineOpenDetails = sbParamDetails.toString();
	}
		
							if(objectCheckoutDetails[0] == null || objectCheckoutDetails[0] == "")
							{
				%>
							<script language="JavaScript">
								showIEFModalDialog("IEFIntegrationChooserFS.jsp?keepOpen=false&eventHandler=showCheckoutPage", "300", "325");
							</script>
				<%
							}
						}

						else if(sAction.equals("Replace"))
						{
							jpoName = "DSCShowReplaceLink";

                            if(i== (objectIds.length-1 ) )
							{
								_context = Framework.getFrameContext(session);
								String url = (String)JPO.invoke(_context, jpoName, init, jpoMethod, JPO.packArgs(replaceParamMap), String.class);
								actionURL += url;
								actionURL += "&integrationName=" + integrationName;
							}
						}
						else if(sAction.equalsIgnoreCase("EBOMSynchronize"))
						{
							MCADServerGeneralUtil serverGeneralUtil	= new MCADServerGeneralUtil(context, integSessionData, integrationName);
							//Exsting logic moved up
							BusinessObject busObj = new BusinessObject(objectIds[0]);
							busObj.open(context);
							String cadType = util.getCADTypeForBO(context,busObj);
							String busName = busObj.getName();    	
							String busType = busObj.getTypeName();
							boolean isDrawingLike = serverGeneralUtil.isDrawingLike(context,busType);
							boolean isValidObject = serverGeneralUtil.isValidObjectForEBOM(context,busObj,cadType,globalConfigObject,isDrawingLike);
							busObj.close(context);

							if(globalConfigObject.isTypeOfClass(cadType,MCADAppletServletProtocol.TYPE_FAMILY_LIKE))
							{
								String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.InvalidTypeForEBOMSynch");
								actionURL		= "./MCADMessageFS.jsp?";
								actionURL		+= "&message=" + message;
								errorMessage	= message.trim();
							}
							else if(!isValidObject && isDrawingLike)
							{ 
								//drawing EBOM
								Hashtable msgTable = new Hashtable();
								msgTable.put("NAME", busName);
								msgTable.put("TYPE", busType);
								String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.DesignAssociatedWithDrawingExcludedForEBOMSynch",msgTable);
								actionURL		= "./MCADMessageFS.jsp?";
								actionURL		+= "&message=" + message;
								errorMessage	= message.trim();
							}
							else if(!isValidObject)
							{  
								//drawing Non EBOM
								Hashtable msgTable = new Hashtable();
								msgTable.put("NAME", busName);
								msgTable.put("TYPE", busType);
								String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.DesignExcludedForEBOMSynch",msgTable);
								actionURL		= "./MCADMessageFS.jsp?";
								actionURL		+= "&message=" + message;
								errorMessage	= message.trim();
							}
							/*else if(bEnableAppletFreeUI)
							{
							//FUN106867 Applet Free UI for EBOM (commented to avoid the execution of else part in case of applet free)	
							 String site = " ../integrations/DSCProgressBarForAppletFree.jsp?url=../integrations/DSCEBOMSyncAppletFree.jsp"+"&action=EBOMSynchronize&objectId="+sObjectId+"&integrationName=" + integrationName;
						         response.setStatus(response.SC_MOVED_TEMPORARILY);
						         response.setHeader("Location", site);
							}*/
							else if(!bEnableAppletFreeUI)
							{
								if(util.hasAttributeForBO(context, objectIds[0], "Bareboard Names"))
								{
									showBareboardPage = "true";
									jpoName = "DSCShowSynchronizedEBOMLink";
									jpoMethod	= "getURL";
									_context = Framework.getFrameContext(session);
									String url = (String)JPO.invoke(_context, jpoName, init, jpoMethod, JPO.packArgs(paramMap), String.class);
	
									url +=helpUrl;
									actionURL += url;
									actionURL += "&integrationName=" + integrationName ;
								}
							}
						}

						else
						{
							if (sAction.equals("Rename"))
							{
								jpoName = "DSCShowRenameLink";
								helpUrl += "&help=emxhelpdscrename";
								paramMap.put("refreshFrame", sRefreshFrame);
							}
							else if (sAction.equals("SaveAs"))
							   	jpoName = "DSCShowSaveAsLink";

							else if (sAction.equals("Purge"))
							{
								BusinessObject busObj = new BusinessObject(objectIds[0]);
								busObj.open(context);
								String cadType= util.getCADTypeForBO(context,busObj);
								if(globalConfigObject.isTypeOfClass(cadType,MCADAppletServletProtocol.TYPE_INSTANCE_LIKE))
								{
									String message	= integSessionData.getResourceBundle().getString("mcadIntegration.Server.Message.InvalidTypeForPurge");
									actionURL		= "./MCADMessageFS.jsp?";
									actionURL		+= "&message=" + message;
									errorMessage	= message.trim();
								}
								busObj.close(context);

								jpoName = "DSCShowPurgeLink";
								if(sRefreshFrame==null || sRefreshFrame.equals(""))
								{
									sRefreshFrame = "content";
								}
							}
							else if (sAction.equals("Demote"))
								jpoName = "DSCShowDemoteLink";
							else if(sAction.equalsIgnoreCase("appletFreeDemote"))
							{	
								jpoName = "DSCShowDemoteLink";
								paramMap.put("sAction", sAction);
								paramMap.put("refreshFrame", sRefreshFrame);
								
							}
							/* commented for FUN098015 : removed old call of appletFree command
							else if(sAction.equalsIgnoreCase("appletFreePromote"))
							{
								String site = "  ../integrations/DSCProgressBarForAppletFree.jsp?url=../integrations/DSCpromoteAppletFree.jsp&refreshFrame=content&objectId="+sObjectId+"&integrationName=" + integrationName+"&action=AppletFreePromote";
									
						         response.setStatus(response.SC_MOVED_TEMPORARILY);
						         response.setHeader("Location", site);
							}*/
							else if(sAction.equalsIgnoreCase("appletFreeDownloadStructure"))  //IR-670955 : Call to jsp to fetch Object Ids without expansion
							{
								// IR-877103 : adding call of progress bar jsp for blocking screen while download is in progress
								String url = "../integrations/DSCDownloadStructureAppletFree.jsp&action=download&objectId="+sObjectId+"&integrationName=" + integrationName;
								String site = new String("../integrations/DSCProgressBarForAppletFree.jsp?url=" + url);
								response.setStatus(response.SC_MOVED_TEMPORARILY);
								response.setHeader("Location", site);	
							}

							_context = Framework.getFrameContext(session);

							String url = (String)JPO.invoke(_context, jpoName, init, jpoMethod, JPO.packArgs(paramMap), String.class);

							url +=helpUrl;
							actionURL += url;
							actionURL += "&integrationName=" + integrationName;
							
							if(sAction.equalsIgnoreCase("appletFreeDemote"))
							{
								 String site = " ../integrations/DSCProgressBarForAppletFree.jsp?url="+actionURL+"&action=AppletFreeDemote";
						         response.setStatus(response.SC_MOVED_TEMPORARILY);
						         response.setHeader("Location", site); 
							}
						}
					}
					else
					{
						errMsg = UINavigatorUtil.getI18nString("emxIEFDesignCenter.Common.NotIntegrationSpecific","emxIEFDesignCenterStringResource", request.getHeader("Accept-Language"));
						throw new Exception(errMsg);
					}
					
// commented and for FUN098015 : This block of code is added to call the server side methods without Applet. With this we create finalizationPage (html).
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
					    String acceptLanguage							= request.getHeader("Accept-Language");
						String sessionid 								= "JSESSIONID=" + session.getId();
					//QTP	//////////////////////////////////	

						//String objectId = (String)Request.getParameter(request,"objectId");
						//In case of X-cad powerview page value of currentObjectId is not consistent.
						currentObjectId = sObjectId;
						aintegrationName = util.getIntegrationName(context, currentObjectId);
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
						DSCAppletFreeCmdHandler appletFreeCmdHandler = (DSCAppletFreeCmdHandler)session.getAttribute("preferencehandler");
							if(appletFreeCmdHandler == null){
								/*IR-907816* passing cookies to the appletFreeCmdHandler*/
							appletFreeCmdHandler = new DSCAppletFreeCmdHandler(integSessionData, sProtocol, sPort, sHost, refServer, requestURI, pathWithIntegrationsDir, pathWithAppName, appName, virtualPath, acceptLanguage,sessionid,  mcadIntegrationBundle,keyValuePairList);				
							session.setAttribute("preferencehandler", appletFreeCmdHandler );		    
						}
						
						if(sAction.equalsIgnoreCase("appletFreePromote"))
						{
							IEFFinalizationPage iefFinalizationPage = appletFreeCmdHandler.createPromotePage(aintegrationName, "", currentObjectId);
						}
						else if(sAction.equalsIgnoreCase("SaveAs"))
						{
							// FUN106549 : Save-As Page UI for applet free
							appletFreeCmdHandler.createSaveAsPageAppletFree(aintegrationName, "", currentObjectId);
						}
					    else if(sAction.equalsIgnoreCase("EBOMSynchronize"))
						{
							//FUN106867 Applet Free UI for EBOM
							IEFEBOMSynchPage iefEBOMSynchronizePage = appletFreeCmdHandler.createEBOMSynchronizePage(aintegrationName, "", currentObjectId);
							isGrayOutMsgRequired = iefEBOMSynchronizePage.isGrayOutMsgRequired();// IR-833368
						}
					}
					
				}
				catch(Exception exception)
				{
					//emxNavErrorObject.addMessage(exception.getMessage());
					errorMessage	= exception.getMessage().trim();
				}
			}
		}
	}
	else
	{
		String acceptLanguage							= request.getHeader("Accept-Language");
		MCADServerResourceBundle serverResourceBundle	= new MCADServerResourceBundle(acceptLanguage);

		String message	= serverResourceBundle.getString("mcadIntegration.Server.Message.ServerFailedToRespondSessionTimedOut");
		//emxNavErrorObject.addMessage(message);
		errorMessage	= message.trim();
	}
%>
<html>
<head>
<script language="JavaScript" type="text/javascript" src="../common/scripts/emxUICore.js"></script>
<script language="JavaScript" type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
<script language="JavaScript" type="text/javascript" src="../emxUIPageUtility.js"></script>

<script language="javascript" >

var refreshFrame		= getFrameObject(top, '<%=XSSUtil.encodeForJavaScript(integSessionData.getClonedContext(session),sRefreshFrame)%>');
var integrationFrame	= getIntegrationFrame(this);
var isDownloadStructure = false;
var isDownloadStructureBaseline = false;
if(integrationFrame != null)
{
	if(refreshFrame == null)
	{
		//Set the refresh for Full Search
		refreshFrame = getFrameObject(top, "structure_browser");
	}

	if(refreshFrame != null)
	integrationFrame.setActiveRefreshFrame(refreshFrame);
	else
	{
		var appletReturnHiddenFrame = top.findFrame(top,"appletReturnHiddenFrame");

		if(appletReturnHiddenFrame)
			parent.parent.location.href = parent.parent.location.href;
	}
}

function checkout(integrationName, checkoutStatus, objectsInfo, checkoutMessage, mode, launchCADTool)
{
	var integrationFrame = null;
    if (opener == null || opener != "undefined")
    {
	   integrationFrame = getIntegrationFrame(this);
	}
	else
	{
	   integrationFrame = getIntegrationFrame(opener);
	}

	//cannot go ahead if unable to locate integration frame.
	if(integrationFrame == null ||  integrationName == '')
	{
		alert("Integration Applet is not available. Please close the browser and login again.");
		return;
	}
	var mxmcadApplet = integrationFrame.getAppletObject(); 
	checkoutMessage = trim(checkoutMessage);

	if(checkoutStatus == "false")
	{
		var parsedMessage = replaceAll(checkoutMessage, "|", "\n");
		alert(parsedMessage);
	}
	else if (checkoutMessage != null && checkoutMessage != "")
	{
		var parsedMessage = replaceAll(checkoutMessage, '|', '\n');
		var confirmStatus = confirm(parsedMessage);

		if(confirmStatus)
		{
			var checkoutDetails;
			if(mode == "interactive")
			{
				if(isDownloadStructure)
				{
					// [NDM] QWJ
					//XSSOK
					checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + '<%=isVersionedObject%>';
					mxmcadApplet.callCommandHandler(integrationName, "createDownloadStructurePage", checkoutDetails);
				}
				else
				{
				checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + launchCADTool;
			mxmcadApplet.callCommandHandler(integrationName, "createCheckoutPage", checkoutDetails);
		}
			}
			else if(mode == "silent")
			{
				checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + launchCADTool;
				mxmcadApplet.callCommandHandler(integrationName, "doSilentCheckout", checkoutDetails);
			}
		}
	}
	else
	{
		var checkoutDetails;
		if(mode == "interactive")
		{
			if(isDownloadStructure)
			{
				// [NDM] QWJ
				//XSSOK
				if(isDownloadStructureBaseline)
				{
					checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + '<%=isVersionedObject%>' + "@" +'<%=sBaselineOpenDetails%>';
				} else 
				{
				checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + '<%=isVersionedObject%>';
				}

				mxmcadApplet.callCommandHandler(integrationName, "createDownloadStructurePage", checkoutDetails);
			}
			else
			{
			checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + launchCADTool;
		mxmcadApplet.callCommandHandler(integrationName, "createCheckoutPage", checkoutDetails);
	}
		}
		else if(mode == "silent")
		{
			checkoutDetails = integrationName + "|None|" + objectsInfo + "@" + launchCADTool;
			mxmcadApplet.callCommandHandler(integrationName, "doSilentCheckout", checkoutDetails);
		}
	}
       
	if (window && window != 'undefined') 
		window.close();
}

function showCheckoutPage(selectedIntegrationName)
{
        //XSSOK
	if('<%=sAction%>' == "checkout")
	{
	//XSSOK
		 checkout(selectedIntegrationName, '<%=checkoutStatus%>', '<%=objectsInfo%>', '<%=checkoutMessage%>', 'interactive','false');
	}
	//XSSOK
	else if('<%=sAction%>' == "QuickCheckout")
	{
	//XSSOK
		checkout(selectedIntegrationName, '<%=checkoutStatus%>', '<%=objectsInfo%>', '<%=checkoutMessage%>', 'silent','<%=launchCADTool%>');//cHANGE
	}
}

function showDialogPopup(url)
{
if('<%=bEnableAppletFreeUI%>' == "true")
	{
		if ("<%=errorMessage%>" == '')
		{
			if('<%=sAction%>' == "SaveAs")
				{
				// FUN106549
				url="./MCADSaveAsFS.jsp?"+"integrationName="+'<%=integrationName%>'+"&objectId="+'<%=sObjectId%>'+"&refresh=true";
				showIEFModalDialog(url, '900', '600');
				}
			if('<%=sAction%>' == "Rename")
				{
				showIEFModalDialog(url, '500', '500');
				}
			if ('<%=sAction%>' == "Purge")
				{
				showIEFModalDialog(url, '500', '500');
				}
			else if('<%=sAction%>' == "appletFreePromote")
				{
				//commented for FUN098015 :: Call to JSP page to display structure details
				showIEFModalDialog("./MCADFinalizationFS.jsp?" + "integrationName=" + "<%=aintegrationName%>" + "&ParentFrame=" + "<%=ParentFrame%>", 850, 650);
				}
			else if('<%=sAction%>' == "EBOMSynchronize") //FUN106867 Applet Free UI for EBOM
			{
				showIEFModalDialog("./MCADEBOMSynchFS.jsp?" + "integrationName=" + "<%=aintegrationName%>" + "&ParentFrame=" + "<%=ParentFrame%>" + "&isGrayOutMsgRequired="+"<%=isGrayOutMsgRequired%>", 850, 650);
			}
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
		{
                        //XSSOK
			if('<%=sAction%>' == "SaveAs")
			{
				if(isCommandActive=="true" || isCommandActive==true)
				{
					alert(otherCommandActiveErrorMsg);
				}
				else
				{
					if (top.modalDialog && top.modalDialog.contentWindow && !top.modalDialog.contentWindow.closed)
					{
						try
						{
							top.modalDialog.contentWindow.closeModalDialog();
						}
						catch(error)
						{
							top.modalDialog.contentWindow.close();
						}
					}

					var refresh = "false";
					var currentObjectId = '<%=XSSUtil.encodeForJavaScript(integSessionData.getClonedContext(session),currentObjectId)%>';

					//Refresh of parent frame is to be done only if Save-As is invoked from the Where Used or Related Drawings page. 'currentObjectId' is sent from these pages, so it is used to set the refresh flag.
					if(currentObjectId != null && currentObjectId != "" && currentObjectId != "null")
						refresh = "true";
						//XSSOK
					var saveAsDetails = '<%=integrationName%>' + "|" + '<%=sObjectId%>' + "|" + refresh;
					//FUN098571- Encoding for Tomee8					
					saveAsDetails = encodeURI(saveAsDetails);
					//XSSOK
					if('<%=isPreSaveAsEnabled%>' == "true")
					{
							url="./MCADSaveAsOptionFS.jsp?"+"integrationName="+'<%=integrationName%>'+"&objectId="+'<%=sObjectId%>'+"&refresh="+refresh+"&objectIds="+'<%=sObjectIds%>';
							showIEFModalDialog(url, '500', '400');
					}
					else
					{
					showSaveAsPage('<%=integrationName%>', saveAsDetails);
				}
			}
			}
                        //XSSOK
			else if('<%=sAction%>' == "Promote")
			{
				if(isCommandActive=="true" || isCommandActive==true)
				{
					alert(otherCommandActiveErrorMsg);
				}
				else
				{
					if (top.modalDialog && top.modalDialog.contentWindow && !top.modalDialog.contentWindow.closed)
					{
						try
						{
							top.modalDialog.contentWindow.closeModalDialog();
						}
						catch(error)
						{
							top.modalDialog.contentWindow.close();
						}
					}
                    //XSSOK
					var finalizationDetails = '<%=integrationName%>' + "|" + '<%=sObjectId%>';
					//FUN098571- Encoding for Tomee8
					finalizationDetails = encodeURI(finalizationDetails);
                    //XSSOK
					showFinalizationPage('<%=integrationName%>', finalizationDetails);
				}
			}
                        //XSSOK
			else if ('<%=sAction%>' == "checkout")
			{
			    //XSSOK
				if('<%=integrationName%>' != "null" && '<%=integrationName%>'!= "")
				{
				    //XSSOK
					checkout('<%=integrationName%>', '<%=checkoutStatus%>', '<%=objectsInfo%>', '<%=checkoutMessage%>', 'interactive','false');
				}
			}
			//XSSOK
			else if ('<%=sAction%>' == "DownloadStructure")
			{
			    //XSSOK
				if('<%=integrationName%>' != "null" && '<%=integrationName%>'!= "")
				{
					if('<%=fromBaselineOpen%>' != "null" && '<%=fromBaselineOpen%>'== "true")
					{
						isDownloadStructureBaseline = true;
					}
					isDownloadStructure = true;
					//XSSOK
					checkout('<%=integrationName%>', '<%=checkoutStatus%>', '<%=objectsInfo%>', '<%=checkoutMessage%>', 'interactive','false');
				}
			}
			//XSSOK
			else if ('<%=sAction%>' == "QuickCheckout")
			{
			     //XSSOK
				if ('<%=integrationName%>' != "null" && '<%=integrationName%>'!= "")
				{
				    //XSSOK
					checkout('<%=integrationName%>', '<%=checkoutStatus%>', '<%=objectsInfo%>', '<%=checkoutMessage%>', 'silent','<%=launchCADTool%>');//change
				}
			}
			//XSSOK
			else if ('<%=sAction%>' == "EBOMSynchronize")
			{
				if(isCommandActive=="true" || isCommandActive==true)
				{
					alert(otherCommandActiveErrorMsg);
				}
				//XSSOK
				else if('<%=showBareboardPage%>' == "true")
				{
					showIEFModalDialog(url, '500', '500');
				}
				else
				{
					if (top.modalDialog && top.modalDialog.contentWindow && !top.modalDialog.contentWindow.closed)
					{
						try
						{
							top.modalDialog.contentWindow.closeModalDialog();
						}
						catch(error)
						{
							top.modalDialog.contentWindow.close();
						}
					}

					var refresh = "false";
					var currentObjectId = '<%=XSSUtil.encodeForJavaScript(integSessionData.getClonedContext(session),currentObjectId)%>';

					if(currentObjectId != null && currentObjectId != "" && currentObjectId != "null")
					{
						refresh = "true";
					}
                    //XSSOK
					var sEBOMSynchDetails = '<%=integrationName%>' + "|" + '<%=sObjectId%>' + "|" + refresh;
					//FUN098571- Encoding for Tomee8					
					sEBOMSynchDetails = encodeURI(sEBOMSynchDetails);
				    //XSSOK	
					showEBOMSynchPage('<%=integrationName%>', sEBOMSynchDetails);
				}
			}
			//XSSOK
			else if('<%=sAction%>' == "Rename" || '<%=sAction%>' ==  "Demote" || '<%=sAction%>' ==  "Purge")
			{
				if(isCommandActive=="true" || isCommandActive==true)
				{
					alert(otherCommandActiveErrorMsg);
				}
				else
				{
					showIEFModalDialog(url, '500', '500');
				}
			}
			//XSSOK
			else if('<%=sAction%>' == "Replace")
			{
				integrationFrame.showIEFModalDialog(url, '900', '500');
			}
			else
			{
				showIEFModalDialog(url, '500', '500');
			}
		}
	}
}
}
</script>

</head>

<%@include file = "MCADBottomErrorInclude.inc"%>
<!--XSSOK-->
<body onLoad="showDialogPopup('<%=actionURL%>')">

<script language="javascript" >
//XSSOK
	if ("<%=errorMessage%>" != "")
	{
	   javascript:alert("<%=XSSUtil.encodeForJavaScript(context,errorMessage)%>");
	   //XSSOK
	   if('<%=sAction%>' == 'Checkout'||'<%=sAction%>' == 'QuickCheckout')
			window.top.close();
	}

</script>

</body>
</html>

