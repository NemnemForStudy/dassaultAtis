<%--  emxCollectionsEditProcess.jsp  - To edit Collections
 Copyright (c) 2003-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program

   decProjectProgressDelete.jsp 
   Created By thok 2023-05-31
--%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@ page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="com.matrixone.apps.domain.DomainObject"%>
<%@ page import="org.apache.ibatis.session.SqlSession"%>
<%@ page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>

<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>
<%@include file = "enoviaCSRFTokenValidation.inc"%>
<script language="JavaScript" src="scripts/emxUICore.js" type="text/javascript"></script>
<!-- Import the java packages -->

<%
        //String strSystemGeneratedCollectionLabel  = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", new Locale(request.getHeader("Accept-Language")), "emxFramework.ClipBoardCollection.NameLabel");
        String jsTreeID                           = emxGetParameter(request,"jsTreeID");
        String suiteKey                           = emxGetParameter(request,"suiteKey");
        String reloadURL                          = "";
        String[] emxTableRowId 					  = emxGetParameterValues(request, "emxTableRowId");
        String objectId                           = emxGetParameter(request,"objectId");
     
        if(emxTableRowId==null){
        	String strMsg = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Common.PleasemakeaselectiontoDelete", context.getSession().getLanguage());
        	%>
			<script type="text/javascript" language="javascript">
				alert('<%=XSSUtil.encodeForJavaScript(context,strMsg)%>');	
			</script>
			<%
            return;
        }
        
        try(SqlSession sqlSession = decSQLSessionFactory.getSession())
        {
        	ContextUtil.startTransaction(context, true);
        	
        	DomainObject object = new DomainObject(objectId);
        	String objectName = object.getInfo(context,"name");
        	for(int i=0;i < emxTableRowId.length;i++){
        		String[] row = emxTableRowId[i].split("\\|");
        		Map insertParamMap = new HashMap();
            	insertParamMap.put("SITE_CD",objectName); 
    			insertParamMap.put("CUT_OFF_WEEK",row[1]); 
    			int deleteRow = 0;
    			deleteRow = sqlSession.delete("Project.deleteProgress", insertParamMap);
        	}
        	
			sqlSession.commit();
        	ContextUtil.commitTransaction(context);
%>
        <script language="Javascript">
        	top.findFrame(top,"detailsDisplay").location.reload();
        </script>
<%
        }
        catch(Exception e)
        {
        	e.printStackTrace();
    		throw e;
        }

%>

<%@include file = "emxNavigatorBottomErrorInclude.inc"%>
