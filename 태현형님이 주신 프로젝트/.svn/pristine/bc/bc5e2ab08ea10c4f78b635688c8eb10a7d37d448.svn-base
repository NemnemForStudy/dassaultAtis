<%--
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@ page import="java.util.Enumeration,java.util.Map,java.util.HashMap,java.util.Hashtable,matrix.db.*" %>
<%@ page import="com.matrixone.apps.domain.util.MapList,com.matrixone.apps.domain.DomainObject,com.matrixone.apps.domain.util.MqlUtil" %>
<%@ page import="matrix.util.MatrixException, matrix.util.StringList" %>
<%@ page import="com.matrixone.apps.domain.util.i18nNow" %>
<%@ page import="com.dec.util.DecConstants" %>

<%@ include file="../emxUICommonAppInclude.inc"%>
<%
    String languageStr 		= request.getHeader("Accept-Language");
    String objectId 		= emxGetParameter(request,"objectId");
    String projectStatus 	= emxGetParameter(request,"projectStatus");
	
  	try{
  		ContextUtil.startTransaction(context, true);
  		
  		DomainObject completeObject = DomainObject.newInstance(context,objectId);
  		StringList allsubTaskCurrent  = completeObject.getInfoList(context,"to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].to.current");

  		if(allsubTaskCurrent != null && (projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WIN) || projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_COMPLETED))){
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
  		
  		if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WIN)){ // 입찰 성공
  			completeObject.setState(context, ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE);
  			completeObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_WIN);
  		} else if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_COMPLETED)){ // 수행 성공
  			completeObject.setState(context, ProgramCentralConstants.STATE_PROJECT_SPACE_COMPLETE);
  			completeObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_COMPLETED);
  		} else if(projectStatus.equalsIgnoreCase(DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_HOLD)){ // 수행 중단
  			completeObject.setPolicy(context, ProgramCentralConstants.POLICY_PROJECT_SPACE_HOLD_CANCEL);
  			completeObject.setState(context, ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD);
  			completeObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_HOLD);
  		} else if(projectStatus.equalsIgnoreCase("Restart")){ // 수행 재시작
  			completeObject.setPolicy(context, ProgramCentralConstants.POLICY_PROJECT_SPACE);
  			completeObject.setState(context, ProgramCentralConstants.STATE_PROJECT_SPACE_CREATE);
  			completeObject.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_INPROGRESS);
  		}
  		
  		ContextUtil.commitTransaction(context);
  	}
    catch(Exception e){
    	   throw new MatrixException(e);
    }
%>
     <script language="javascript" type="text/javaScript">
     	window.open('../common/emxTree.jsp?objectId=<%=objectId%>&mode=replace&AppendParameters=true&reloadAfterChange=true','_self');
     	//top.findFrame(top,"portalDisplay").location.reload();
     </script>

<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>