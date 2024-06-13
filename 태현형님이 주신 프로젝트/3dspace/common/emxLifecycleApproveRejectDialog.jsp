<%--  emxLifecycleApprovalRejectDialog.jsp  -   FS page for Approval dialog

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended
   publication of such program.

   static const char RCSID[] = $Id: emxLifecycleApproveRejectDialog.jsp.rca 1.5.3.2 Wed Oct 22 15:48:21 2008 przemek Experimental przemek $
--%>
<%@include file="../common/emxNavigatorInclude.inc"%>
<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonHeaderBeginInclude.inc"%>

<%
String languageStr = request.getHeader("Accept-Language");
String jsTreeID = emxGetParameter(request, "jsTreeID");
String objectId = emxGetParameter(request, "objectId");
String initSource = emxGetParameter(request, "initSource");
String suiteKey = emxGetParameter(request, "suiteKey");
String strSignatureName = emxGetParameter(request, "signatureName");
String strState = emxGetParameter(request, "state");
String strTaskId = emxGetParameter(request, "taskId");
String strRouteTaskUser = emxGetParameter(request, "routeTaskUser");
String strAction = "";
String strSignComment = "";

String sHasApprove = "FALSE";
String sHasReject = "FALSE";
String sHasIgnore = "FALSE";
String sHasComplete = "FALSE";
String sHasAbstain = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.ShowAbstainForTaskApproval");

String tHasApprove = "TRUE";
String tHasReject = "TRUE";
String tHasIgnore = "TRUE";

String strTaskName = "";
String strRouteId = "";
String strExists = "";
DomainObject domainObject = null;
String strUrl = "";
String sStatePolicyName = "";            
String isTaskApprovalCommentsOn = EnoviaResourceBundle.getProperty(context, "emxComponents.Routes.ShowCommentsForTaskApproval");
StringBuffer pageAction = new StringBuffer(); 
String isApprovalCommentRequired = EnoviaResourceBundle.getProperty(context,"emxComponents.Routes.EnforceAssigneeApprovalComments");
String attr_RequiresEsign        = PropertyUtil.getSchemaProperty(context, "attribute_RequiresESign");
String attr_RouteAction			 = PropertyUtil.getSchemaProperty(context, "attribute_RouteAction");
String SELECT_RouteAction		 = "attribute[" + attr_RouteAction + "]";
String SELECT_Requires_Esign     = "from[" + DomainObject.RELATIONSHIP_ROUTE_TASK + "].to.attribute[" + attr_RequiresEsign + "]";
String requiresESign			 = "false";
String SELECT_taskAssignee       = "from[" + DomainConstants.RELATIONSHIP_PROJECT_TASK + "].to.name";
String taskAssigneeUserName 	 = "";
String taskRouteAction 			 = "";
String isAuthRequired 			 = "";
DomainObject taskobj =null;
String  currTenantId = "OnPremise";


	if(!FrameworkUtil.isOnPremise(context)){   
		currTenantId = context.getTenant();
	}


StringList taskSelectList = new StringList(3);
taskSelectList.add(SELECT_Requires_Esign);
taskSelectList.add(SELECT_taskAssignee);
taskSelectList.add(SELECT_RouteAction);
try{
ContextUtil.pushContext(context);
taskobj                          = DomainObject.newInstance(context, strTaskId);
Map taskMap 		   			 = taskobj.getInfo(context,taskSelectList);
requiresESign	                 = (String)taskMap.get(SELECT_Requires_Esign);
taskAssigneeUserName             = (String)taskMap.get(SELECT_taskAssignee);
taskRouteAction 				 = (String)taskMap.get(SELECT_RouteAction);
ContextUtil.popContext(context);
}catch(Exception e){
	e.printStackTrace();
}

if( taskRouteAction.equals("Approve") && requiresESign.equalsIgnoreCase("true") ){
	isAuthRequired = "true";
}


if("true".equalsIgnoreCase(requiresESign)){ 
	pageAction.append("../common/emxLifecycleApproveRejectProcess.jsp?");
	pageAction.append("objectId="+XSSUtil.encodeForJavaScript(context, objectId)).append("&");
	pageAction.append("state="+XSSUtil.encodeForJavaScript(context, strState)).append("&");
	pageAction.append("taskId="+XSSUtil.encodeForJavaScript(context, strTaskId)).append("&");
	pageAction.append("signature="+XSSUtil.encodeForJavaScript(context, strSignatureName));
	if(UIUtil.isNotNullAndNotEmpty(strRouteTaskUser) && strRouteTaskUser.startsWith("role_"))
		pageAction.append("&routeTaskUser="+XSSUtil.encodeForJavaScript(context, strRouteTaskUser));
}

try {
    if (objectId != null) {                    
            if (strSignatureName != null && !"".equals(strSignatureName)) {
                BusinessObject busObject = new BusinessObject(objectId);
                boolean isObjectValid = true;
                try {
                    busObject.open(context);
                    sStatePolicyName = ((Policy) (busObject.getPolicy(context))).getName();
                } catch (Exception e) {
                    isObjectValid = false;
                }                            
                //Starts Database transaction
                //ContextUtil.startTransaction(context, false);
                if (isObjectValid) {
                    StateList stateList = busObject.getStates(context);
                    StateItr stateItr = new StateItr(stateList);
                    State toState = null;
                    State fromState = null;
                    State state = null;
                    boolean bFound = false;
                    //Loop finds the from state and to state
                    while (stateItr.next()) {
                        state = stateItr.obj();
                        String stateName = state.getName();
                        if (!bFound) {
                            if (strState.equalsIgnoreCase(stateName)) {
                                fromState = state;
                                bFound = true;                                            
                            }
                        } else {                                    	    
                            toState = state;
                            break;
                        }
                    }                                
					String sPackage = "common";
                    DomainObject dmObj = DomainObject.newInstance(context, objectId, sPackage);
                    MapList signatureList = dmObj.getSignaturesDetails(context, fromState, toState);
					//Finds if current signature has the Approve, Reject and Ignore rights
				     if (signatureList != null && signatureList.size() > 0) {
                        Iterator signatureItr = signatureList.iterator();
                        Map signatureMap = null;
                        String sSignName = null;
                        while (signatureItr.hasNext()) {
                            signatureMap = (Map) signatureItr.next();
                            sSignName = (String) signatureMap.get("name");
                            if (sSignName.equalsIgnoreCase(strSignatureName)) {
                                tHasApprove = (String) signatureMap.get("hasapprove");
                                tHasReject = (String) signatureMap.get("hasreject");
                                tHasIgnore = (String) signatureMap.get("hasignore");
                                break;
                            }
                        }
                    }
                }
                //process signature 
                //Show Approve, Reject and Ignore Radio buttons
                sHasApprove = "TRUE";
                sHasReject = "TRUE";
                sHasIgnore = "TRUE";                            
            } else {
                //process task
                 if(strTaskId != null && !"".equals(strTaskId)){	
                    DomainObject taskObject = new DomainObject(strTaskId);
                    //checking for the task is in active state or future task
                    strExists = MqlUtil.mqlCommand(context,"print bus $1 select $2",strTaskId,"exists");
                    
                    strTaskName = taskObject.getInfo(context,taskObject.SELECT_NAME);                               
                    String StrRoute = "from["+ taskObject.RELATIONSHIP_ROUTE_TASK+ "].to.id";
                    strRouteId = taskObject.getInfo(context,StrRoute);                                
                    String selTaskApprovalStatus = "attribute["+ taskObject.ATTRIBUTE_ROUTE_ACTION+ "]";
                    strAction = taskObject.getInfo(context,selTaskApprovalStatus);
                    if (strAction != null && !"".equals(strAction)&& strAction.equalsIgnoreCase("Approve")) {
                        //show only Approve, Reject and Abstain radio buttons
                        sHasApprove = "TRUE";
                        sHasReject = "TRUE";
                      //  sHasAbstain = "TRUE";// For bug 346480
                    } else {
                        //show only Complete radio button
                        sHasComplete = "TRUE";
                        sHasAbstain = "FALSE";
                    }
                } 
            }              
    }
} catch (Exception e) {
    e.printStackTrace();
} 

//Tree or Property link 
if (strTaskId != null && !"".equals(strTaskId)) {
	if(strExists.indexOf("FALSE")!= -1){
	    strUrl = Framework.encodeURL(response,"../components/emxRouteTaskDetailsFS.jsp?routeId="+ strRouteId + "&taskCreated=yes&taskId="+ strTaskId);
	}    
	else{
	    strUrl = Framework.encodeURL(response,"emxTree.jsp?mode=insert&jsTreeID=" + jsTreeID+ "&objectId=" + strTaskId);
	}
}
%>
<script type="text/javascript" src="../webapps/AmdLoader/AmdLoader.js"></script>
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script language="javascript" src="../common/scripts/emxUIEsignDialog.js"></script>
<script language="javascript" src="../common/scripts/emxUINavigator.js"></script>
<script language="JavaScript">
var isdone=false;
function checkInput() {
	  if(!isdone)
	  {
		var showEsignAuthWindow = "<%=isAuthRequired%>";
		var showTaskApprovalComments = "<%=isTaskApprovalCommentsOn%>";
		var isApprovalCmtRequired ="<%=isApprovalCommentRequired%>";
		var strTaskAction = "<%=strAction%>";
        var bSelected = false;
        var approvalAction;
        for(var i=0 ; i < document.approvalForm.elements.length; i++)
        {
           var obj = document.approvalForm.elements[i];
           if(obj.type == "radio" && obj.checked == true)
           {   bSelected = true;
           	   approvalAction = obj.value;
               break;
           }
        }
        if(!bSelected)
        {
           //XSSOK
           alert("<%=FrameworkUtil.i18nStringNow("emxFramework.Lifecycle.PleaseMakeASelection", lStr)%>");
           return;
        }
        if (document.approvalForm.txtareaCmtApp.value == "" && !(showTaskApprovalComments.toLowerCase() == "false" && strTaskAction == "Approve") && isApprovalCmtRequired.toLowerCase() == "true") {
        	//XSSOK
        	alert("<%=FrameworkUtil.i18nStringNow("emxFramework.Alert.PleaseEnterComments", lStr)%>");
        	document.approvalForm.txtareaCmtApp.focus();
        	return;
        }
        if(showEsignAuthWindow && showEsignAuthWindow!="undefined" && "true"==showEsignAuthWindow){
        	//XSSOK
        	var pageAction = "<%=pageAction.toString()%>";
        	pageAction += "&approvalAction="+approvalAction+"&txtareaCmtApp="+encodeURIComponent(document.approvalForm.txtareaCmtApp.value);  
        	pageAction += "&fromPage=LifecycleApproveRejectDialog";
			var jsonObj = {"taskAssigneeUserName":"<%=taskAssigneeUserName%>", "currTenantId":"<%=currTenantId%>"};
        	navigateLifecycleApproveEsignAuthDialog(pageAction, jsonObj);
        }else{
               document.approvalForm.submit();
			   isdone=true;
		}
      }
  }
function editTaskDetails(Url) {
      emxShowModalDialog(Url, 875, 525);
}

function clearApprovalAndAbstainTaskComments(val) {
	if(val === 'abstain' || val === 'approve'){
	  	document.getElementById("comments").className = 'createLabel';
		document.getElementsByName('txtareaCmtApp')[0].value = "";
		document.getElementsByName('txtareaCmtApp')[0].disabled =true;
	}
	else{
	  	document.getElementById("comments").className = 'labelRequired';
	  	document.getElementsByName('txtareaCmtApp')[0].disabled =false;
	}
		
}
</script>
<%@include file="../emxUICommonHeaderEndInclude.inc"%>
<form name="approvalForm" method="post"
	onsubmit="checkInput(); return false"
	action="emxLifecycleApproveRejectProcess.jsp">

<table border="0" cellpadding="3" cellspacing="2" width="100%">
	<tr>
		<td width="150" class="label"><emxUtil:i18n localize="i18nId">emxFramework.Lifecycle.Approval</emxUtil:i18n></td>
		<td class="inputField">
		<table border="0">
			<tr>
				<%if (strSignatureName != null && !"".equals(strSignatureName)) {%>
				<td><img alt="*" src="images/iconSmallSignature.gif" /></td>
				<td><span class="object"><%=getSignatureName(context, strSignatureName,languageStr)%></span></td>
				<%} else {
                %>
				<td>
				<!-- //XSSOK -->
				<a href="javascript:editTaskDetails('<%= strUrl %>')" class="object"><img src="../common/images/iconSmallTask16.png" name="imgTask" border="0" id="imgTask" /><%=strTaskName%>&nbsp;</a>
				</td>
				<%}%>

			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td width="150" class="labelRequired"><emxUtil:i18n localize="i18nId">emxFramework.Lifecycle.Action</emxUtil:i18n></td>
		<td class="inputField">
		<table border="0">
			<tr>
				<%if ("TRUE".equalsIgnoreCase(sHasApprove)) {
                %>
				<!-- //XSSOK -->
				<td><input type="radio" name="approvalAction" id="" value="approve" <%= "TRUE".equals(tHasApprove) ? "": "disabled"%> <%= "false".equals(isTaskApprovalCommentsOn) ?"onchange=\"clearApprovalAndAbstainTaskComments('approve')\"":""%>/><emxUtil:i18n localize="i18nId">emxFramework.Lifecycle.Approve</emxUtil:i18n></td>
			</tr>
			<%}
            if ("TRUE".equalsIgnoreCase(sHasReject)) {
                %>
			<tr>
				<!-- //XSSOK -->
				<td><input type="radio" name="approvalAction" id="" value="reject" <%= "TRUE".equals(tHasReject) ? "": "disabled"%> <%= "false".equals(isTaskApprovalCommentsOn) ?"onchange=\"clearApprovalAndAbstainTaskComments('reject')\"":""%>/><emxUtil:i18n localize="i18nId">emxFramework.Lifecycle.Reject</emxUtil:i18n></td>
			</tr>
			<%}
            %>
			<%if ("TRUE".equalsIgnoreCase(sHasIgnore)) {
                %>
			<tr>
				<!-- //XSSOK -->
				<td><input type="radio" name="approvalAction" id="" value="ignore" <%= "TRUE".equals(tHasIgnore) ? "": "disabled"%> <%= "false".equals(isTaskApprovalCommentsOn) ?"onchange=\"clearApprovalAndAbstainTaskComments('ignore')\"":""%> /><emxUtil:i18n localize="i18nId">emxFramework.Lifecycle.Ignore</emxUtil:i18n></td>
			</tr>
			<%}
            %>
			<%if ("TRUE".equalsIgnoreCase(sHasComplete)) {
            %>
			<tr>
				<td><input type="radio" name="approvalAction" id="" value="complete" <%= "false".equals(isTaskApprovalCommentsOn) ?"onchange=\"clearApprovalAndAbstainTaskComments('complete')\"":""%>/><emxUtil:i18n localize="i18nId">emxFramework.Common.Action</emxUtil:i18n></td>
			</tr>
			<%}
            %>
            <!-- Begin code for bug 346480 -->
            <%if ("TRUE".equalsIgnoreCase(sHasAbstain)) {
            %>
			<tr>
				<td><input type="radio" name="approvalAction" id="" value="abstain" <%= "false".equals(isTaskApprovalCommentsOn) ?"onchange=\"clearApprovalAndAbstainTaskComments('abstain')\"":""%>/><emxUtil:i18n localize="i18nId">emxFramework.LifecycleTasks.Abstain</emxUtil:i18n></td>
			</tr>
			<%}
            %>
            <!-- End code for bug 346480 -->
		</table>
		</td>
		<input type="hidden" name="objectId" value="<xss:encodeForHTMLAttribute><%=objectId%></xss:encodeForHTMLAttribute>"/>
		<input type="hidden" name="suiteKey" value="<xss:encodeForHTMLAttribute><%=suiteKey%></xss:encodeForHTMLAttribute>"/>
		<input type="hidden" name="signature" value="<xss:encodeForHTMLAttribute><%=strSignatureName%></xss:encodeForHTMLAttribute>"/>
		<input type="hidden" name="state" value="<xss:encodeForHTMLAttribute><%=strState%></xss:encodeForHTMLAttribute>"/>
		<input type="hidden" name="taskId" value="<xss:encodeForHTMLAttribute><%=strTaskId%></xss:encodeForHTMLAttribute>"/>

	</tr>
	<tr>
			<%
				if ("true".equals(isApprovalCommentRequired)) {
			%>
			<td class="labelRequired" width="150" id="comments">
				<%
					} else {
				%>
			
			<td class="createInputField" width="150" id="comments">
				<%
					}
				%>
			
			<emxUtil:i18n localize="i18nId">emxFramework.Lifecycle.Comments</emxUtil:i18n></td>
		<!-- //XSSOK -->
		<td class="inputField"><textarea cols="25" rows="5"	name="txtareaCmtApp" id=""><%=strSignComment%></textarea></td>
	</tr>
</table>
</form>

<%@include file="emxNavigatorBottomErrorInclude.inc"%>
<%@include file="../emxUICommonEndOfPageInclude.inc"%>


<%!public String getSignatureName(Context context, String sSignName,
            String languageStr) throws Exception {

        boolean isRoleOrGroup = true;
        String userObj = "";
        String displayString = sSignName;

        try {
            Role roleObj = new Role(sSignName);
            roleObj.open(context);
            userObj = "Role";
            roleObj.close(context);
        } catch (MatrixException me) {
            isRoleOrGroup = false;
        }
        if (!isRoleOrGroup) {
            try {
                Group groupObj = new Group(sSignName);
                groupObj.open(context);
                userObj = "Group";
                groupObj.close(context);
                isRoleOrGroup = true;
            } catch (MatrixException me) {
                isRoleOrGroup = false;
            }
        }
        if (isRoleOrGroup) {
            String propertyName = "emxFramework." + userObj + "."
                    + sSignName.replace(' ', '_');
            displayString = FrameworkUtil.i18nStringNow(propertyName, languageStr);
        }
        return displayString;
    }

    %>
