<%--  emxCollectionsEditProcess.jsp  - To edit Collections
 Copyright (c) 2003-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program

   decProjectEnterOrderResultProcess.jsp 
   Created By thok 2023-05-31
--%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>

<%@include file = "emxNavigatorInclude.inc"%>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />

<script language="JavaScript" src="scripts/emxUICore.js" type="text/javascript"></script>
<!-- Import the java packages -->

<%
		String languageStr 						  = request.getHeader("Accept-Language");
        String objectId                           = emxGetParameter(request,"objectId");
        String reason                       	  = emxGetParameter(request,"reason");
        String projectStatus					  = emxGetParameter(request,"projectStatus");
        
        try
        {
        	ContextUtil.startTransaction(context, true);
        	
        	DomainObject resultObject = new DomainObject(objectId);
        	if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WIN)){ //수주 성공
        		
        		StringList allsubTaskCurrent  = resultObject.getInfoList(context,"to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].to.current");

          		if(allsubTaskCurrent != null && projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WIN)){
          			for(int i=0;i < allsubTaskCurrent.size();i++){
          				if(!ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE.equalsIgnoreCase(allsubTaskCurrent.get(i))){
          					String errMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
          			        		"emxProgramCentral.ProjectSpace.Complete.errMsg", languageStr);
          					
          					%>
          			        <script type="text/javascript" language="javascript">
          						alert('<%=XSSUtil.encodeForJavaScript(context,errMsg)%>');	
          					</script>
          			          <%
          			          return;
          				}
          			}
          		}
        		
        		resultObject.setState(context, ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE); // state - Complete
        		resultObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WIN); //attribute[decProjectStauts] - Win
        		resultObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCANCELREASON, reason);// 사유
        	} else { // 수주 실패
        		resultObject.setPolicy(context, ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL);// policy - Project Space Hold Cancel
            	resultObject.setState(context, ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD);//state - Cancel
            	resultObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECCANCELREASON, reason);// 사유
            	
          		if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WITHDRAW)){//포기
          			resultObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WITHDRAW);
          		} else if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_EXCLUDE)){//배제
          			resultObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_EXCLUDE);
          		} else if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_FAIL)){//탈락
          			resultObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_FAIL);
          		} 
        	}
        	
        	ContextUtil.commitTransaction(context);
%>
        <script language="Javascript">
        	var projectStatus = '<%=projectStatus%>';
        	getTopWindow().closeSlideInDialog();
        	if(projectStatus == 'Win'){
        		alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Alert.BiddingProjectWin</emxUtil:i18nScript>");
        	} else if(projectStatus == 'Withdraw'){
        		alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Alert.BiddingProjectWithdraw</emxUtil:i18nScript>");
        	} else if(projectStatus == 'Exclude'){
        		alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Alert.BiddingProjectExclude</emxUtil:i18nScript>");
        	} else if(projectStatus == 'Fail'){
        		alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Alert.BiddingProjectFail</emxUtil:i18nScript>");
        	}
        	window.open('../common/emxTree.jsp?objectId=<%=objectId%>&mode=replace&AppendParameters=true&reloadAfterChange=true','_self');
        	//top.findFrame(top,"portalDisplay").location.reload();
        </script>
<%
        }
        catch(Exception e)
        {
        	e.printStackTrace();
    		throw e;
        }

%>
