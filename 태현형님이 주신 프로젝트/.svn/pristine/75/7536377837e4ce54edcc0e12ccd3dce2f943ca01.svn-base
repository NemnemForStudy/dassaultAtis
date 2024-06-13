<%--  emxLifecycleApproveRejectProcess.jsp   -   The process page for Approve/Reject command functionality on Tasks/Signature tab in adv. lifecycle page

   Dassault Systemes, 1993  2007. All rights reserved.
   This program contains proprietary and trade secret information of MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended
   publication of such program.

   static const char RCSID[] = $Id: emxLifecycleApproveRejectProcess.jsp.rca 1.2.3.2 Wed Oct 22 15:48:21 2008 przemek Experimental przemek $
--%>
<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="javax.json.JsonArray"%>
<%@page import="javax.json.Json"%>
<%@page import="javax.json.JsonObject"%>
<%@page import="javax.json.JsonArrayBuilder"%>
<%@page import="javax.json.JsonObjectBuilder"%>
<%@include file="../common/emxNavigatorInclude.inc"%>
<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonHeaderBeginInclude.inc"%>
<%@page import="com.matrixone.apps.common.*"%>
<%@page import="java.lang.reflect.Method"%>

<%@include file="../emxUICommonHeaderEndInclude.inc"%>

<%
String strLanguage = request.getHeader("Accept-Language");
String i18NReadAndUnderstand = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(),
		"emxFramework.UserAuthentication.ReadAndUnderstand");


    try {
        // Get the required parameters from the request object.
        // These are busObjId, approvalAction, signature, txtareaCmtApp and taskId.
        // Context is set in request object in table edit process page

        String sBusId = (String) emxGetParameter(request, "objectId");
        String strSignatureName = (String) emxGetParameter(request,"signature");
        String strTaskId = (String) emxGetParameter(request, "taskId");
        String strState = (String)emxGetParameter(request, "state");
        String sApprovalAction = (String) emxGetParameter(request,"approvalAction");
        String sSignComment = (String) emxGetParameter(request,"txtareaCmtApp");
        String sRouteTaskUser = (String) emxGetParameter(request,"routeTaskUser");
		String eSignRecordId=emxGetParameter(request,"eSignRecordId");
        String strAlertMessage = "";

        Lifecycle lifecycle = new Lifecycle();
        lifecycle.completeTaskOrSignature(context,
                                                    sBusId,
                                                    strState,
                                                    strSignatureName,
                                                    strTaskId,
                                                    sApprovalAction,
                                                    sSignComment);
        if (UIUtil.isNotNullAndNotEmpty(strTaskId))
        {
        	String isResponsibleRoleEnabled = DomainConstants.EMPTY_STRING;
        	try{
       			isResponsibleRoleEnabled = EnoviaResourceBundle.getProperty(context,"emxFramework.Routes.ResponsibleRoleForSignatureMeaning.Preserve");
        	}
        	catch(Exception e){
        		isResponsibleRoleEnabled = "false";
        	}
			//Code added for ESign Authentication.
			String attr_RequiresEsign          = PropertyUtil.getSchemaProperty(context, "attribute_RequiresESign");
			String SELECT_Requires_Esign       = "from[" + DomainObject.RELATIONSHIP_ROUTE_TASK + "].to.attribute[" + attr_RequiresEsign + "]";
			String requiresESign			   = "false";
			String taskRouteAction			   = "";
			String taskLatestRevision="";
			DomainObject taskobj =null;
			String taskState="";
			StringList taskSelectList = new StringList(2);
			taskSelectList.add(SELECT_Requires_Esign);
			taskSelectList.add("attribute["+DomainConstants.ATTRIBUTE_ROUTE_ACTION+"]");
			taskSelectList.add(DomainConstants.SELECT_PHYSICAL_ID);
			taskSelectList.add(DomainConstants.SELECT_REVISION);
			try{
			ContextUtil.pushContext(context);
			taskobj = DomainObject.newInstance(context, strTaskId);
			Map taskMap = taskobj.getInfo(context,taskSelectList);
			String eSignTaskId=(String)taskMap.get(DomainConstants.SELECT_PHYSICAL_ID);
			taskState = taskobj.getInfo(context,DomainConstants.SELECT_CURRENT);
			requiresESign =(String)taskMap.get(SELECT_Requires_Esign);
			taskRouteAction = (String) taskMap.get("attribute["+DomainConstants.ATTRIBUTE_ROUTE_ACTION+"]");
			taskLatestRevision=(String)taskMap.get(DomainConstants.SELECT_REVISION);
			if(UIUtil.isNotNullAndNotEmpty(requiresESign) && "True".equals(requiresESign) && taskState.equalsIgnoreCase(DomainObject.STATE_INBOX_TASK_COMPLETE) && UIUtil.isNotNullAndNotEmpty(eSignRecordId)){
				//System.out.println("taskId->"+strTaskId+",taskState ->"+taskState+" Esign reocrd ->"+eSignRecordId);
				
				try{
					JsonObjectBuilder jsonMaturityObj = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder());
					JsonObjectBuilder jsonObjRevision = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder());
					JsonObjectBuilder jsonObj = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder());
					jsonObj.add("before","To Do");
					jsonObj.add("after","Complete");
					jsonObjRevision.add("ObjectRevision",taskLatestRevision);
					jsonObjRevision.build();
					jsonMaturityObj.add("MaturityChange",jsonObj.build());
					jsonMaturityObj.build();
					JsonArrayBuilder jsonArry = Json.createArrayBuilder();
					jsonArry.add(jsonObjRevision);
					jsonArry.add(jsonMaturityObj);
					JsonObjectBuilder actionTakenObj = BPSJsonObjectBuilder.createJsonObjectBuilder(Json.createObjectBuilder());
					actionTakenObj.add("actionType", jsonArry.build());
					String actionTakenString=actionTakenObj.build().toString().replaceAll("\\\\", "");
					final Map<String, String> updates = new HashMap<String, String>(); 
					updates.put("ESignObjectRef",eSignTaskId);
					updates.put("ESignObjectServiceID", "3DSpace"); 
					updates.put("ESignObjectURI", "/v1/resources/task/");
					updates.put("ESignActionTaken", actionTakenString);  
					updates.put("eSignRecordId", eSignRecordId);
					
					Class objectTypeArray[] = new Class[2];
					objectTypeArray[0] =  context.getClass();
					objectTypeArray[1] = Map.class;
					Class<?> c = Class.forName("com.dassault_systemes.enovia.esign.ESignRecordUtil");
					Object eSignRecordUtil = c.newInstance();
					Method updateESignRecord = c.getMethod("UpdateESignRecord", objectTypeArray);
					updateESignRecord.invoke(eSignRecordUtil, context, updates);
				}catch(Exception e){
						System.out.println("Exception in updating eSign"+e.getMessage());
				}
			}
			ContextUtil.popContext(context);
			}catch(Exception e){
				e.printStackTrace();
			}
			

        	if(UIUtil.isNotNullAndNotEmpty(requiresESign) && requiresESign.equalsIgnoreCase("True") && taskRouteAction.equals("Approve"))
        	{
        		if(UIUtil.isNotNullAndNotEmpty(isResponsibleRoleEnabled) && isResponsibleRoleEnabled.equalsIgnoreCase("true") && UIUtil.isNotNullAndNotEmpty(sRouteTaskUser) && sRouteTaskUser.startsWith("role_"))
				{
        		i18NReadAndUnderstand = MessageUtil.getMessage(context, null, "emxFramework.UserAuthentication.ReadAndUnderstandRole", new String[] {
        				  PropertyUtil.getSchemaProperty(context, sRouteTaskUser)}, null, context.getLocale(),
        				  "emxFrameworkStringResource");
        		MqlUtil.mqlCommand(context, "Modify bus $1 add history $2 comment $3",false, strTaskId,sApprovalAction,i18NReadAndUnderstand);
				}
				else
					MqlUtil.mqlCommand(context, "Modify bus $1 add history $2 comment $3",false, strTaskId,sApprovalAction,i18NReadAndUnderstand);
				}
        	
			}
%>
<%@include file="../emxUICommonEndOfPageInclude.inc"%>       
<%
    } catch (Exception ex) {
         if (ex.toString() != null && ex.toString().length() > 0) {
            emxNavErrorObject.addMessage(ex.toString());
         }
    } finally {
        // Add cleanup statements if required like object close, cleanup session, etc.
    }
%>
<%@include file="../common/emxNavigatorBottomErrorInclude.inc"%>

<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUICore.js"></script>

<%
	String fromPage = (String) emxGetParameter(request,"fromPage");
	String fromFDA = (String) emxGetParameter(request, "fromFDA");
%>
<script language="JavaScript">
console.log("Approve Reject");
		var fromPage = "<%=XSSUtil.encodeForJavaScript(context, fromPage)%>";
    	 var portalFrame = getTopWindow();
     try { 
    		 portalFrame = openerFindFrame(getTopWindow(),"detailsDisplay");
         } catch(e) {}
    	   
		   if(<%="true".equals(fromFDA)%>) { 
		   
			    if(getTopWindow() && getTopWindow().RefreshHeader) {
             getTopWindow().RefreshHeader();
			}
			else if( getTopWindow().getWindowOpener() && getTopWindow().getWindowOpener().getTopWindow() ) {
				if("LifecycleApproveRejectDialog"==fromPage)
				{
					portaldisplay=emxUICore.findFrame(getTopWindow().getWindowOpener().getTopWindow(), "portalDisplay");
					if(portaldisplay !=null)
					{
					 portaldisplay.location.href=portaldisplay.location.href;
					}
				}	 
				
			}
		  
		  }
		   else{
			   
         if(getTopWindow().getWindowOpener().getTopWindow() && getTopWindow().getWindowOpener().getTopWindow().RefreshHeader) {
             getTopWindow().getWindowOpener().getTopWindow().RefreshHeader();
         }else if(getTopWindow().RefreshHeader){
			getTopWindow().RefreshHeader();            
		 }
         else if(getTopWindow().getWindowOpener().getTopWindow().getWindowOpener().getTopWindow() && getTopWindow().getWindowOpener().getTopWindow().getWindowOpener()) {
			 var portaldisplay;
			 if("LifecycleApproveRejectDialog"==fromPage)
			 {
				 portaldisplay=emxUICore.findFrame(getTopWindow().getWindowOpener().getTopWindow().getWindowOpener().getTopWindow(), "portalDisplay");
				 if(portaldisplay !=null)
				 {
					 portaldisplay.location.href=portaldisplay.location.href;
			     }
			 }	 
			 else
			 {
                portaldisplay=emxUICore.findFrame(getTopWindow().getWindowOpener().getTopWindow(), "portalDisplay");
				 if(portaldisplay !=null)
				 {
					 portaldisplay.location.href=portaldisplay.location.href;
			     }
		     }
		 }
		   }
         if(portalFrame!=null) {
           portalFrame.document.location.href = portalFrame.document.location.href;
           if(portalFrame.top.RefreshHeader){
  			  portalFrame.top.RefreshHeader();
  		   }
         } 
        if(getTopWindow() && "LifecycleApproveRejectDialog"==fromPage) {
		getTopWindow().close();
	}  
	else if(getTopWindow().getWindowOpener() && "LifecycleApproveRejectDialog"==fromPage){
		if( getTopWindow().getWindowOpener().getTopWindow()){
		getTopWindow().getWindowOpener().getTopWindow().closeWindow();
		}
	}
	
	if( <%=!"true".equals(fromFDA)%> ){ 
	
		window.closeWindow();
	}
	</script>

