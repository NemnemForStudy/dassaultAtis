<%--  emxCollectionsEditProcess.jsp  - To edit Collections
 Copyright (c) 2003-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program

   decCreateSafetyStaticsProcess.jsp 
   Created By thok 2023-05-31
--%>
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
        String strSystemGeneratedCollectionLabel  = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", new Locale(request.getHeader("Accept-Language")), "emxFramework.ClipBoardCollection.NameLabel");
        String jsTreeID                           = emxGetParameter(request,"jsTreeID");
        String suiteKey                           = emxGetParameter(request,"suiteKey");
        String reloadURL                          = "";
        
        String objectId                           = emxGetParameter(request,"objId");
        String cutOffDate						  = emxGetParameter(request,"cutOffDate_msvalue");
        String year								  = emxGetParameter(request,"year");
        String month							  = emxGetParameter(request,"month");
        String week								  = emxGetParameter(request,"week");
        
        String engPlan							  = emxGetParameter(request,"engPlan");
        String engActual						  = emxGetParameter(request,"engActual");
        String procPlan							  = emxGetParameter(request,"procPlan");
        String procActual					  	  = emxGetParameter(request,"procActual");
        String conPlan							  = emxGetParameter(request,"conPlan");
        String conActual						  = emxGetParameter(request,"conActual");
        String commPlan							  = emxGetParameter(request,"commPlan");
        String commActual						  = emxGetParameter(request,"commActual");
        String overallPlan						  = emxGetParameter(request,"overallPlan");
        String overallActual					  = emxGetParameter(request,"overallActual");
        
        try(SqlSession sqlSession = decSQLSessionFactory.getSession())
        {
        	ContextUtil.startTransaction(context, true);
        	DomainObject object = new DomainObject(objectId);
        	String objectName = object.getInfo(context,"name");
        	
        	long longDate = Long.parseLong(cutOffDate);  
        	String pattern = "yyyyMMdd";
        	SimpleDateFormat ProjectSpacedateFormat = new SimpleDateFormat(pattern);     
			String formatDate = (String) ProjectSpacedateFormat.format(new Timestamp(longDate));
        	
        	Map insertParamMap = new HashMap();
        	insertParamMap.put("SITE_CD",objectName); 
			insertParamMap.put("CUT_OFF_YEAR",year); 
			insertParamMap.put("CUT_OFF_MONTH",month); 
			insertParamMap.put("CUT_OFF_WEEK",week); 
			insertParamMap.put("CUT_OFF_DATE",formatDate); 

			insertParamMap.put("ENG_PLAN",engPlan); 
			insertParamMap.put("ENG_ACTUAL",engActual); 
			insertParamMap.put("PROC_PLAN",procPlan); 
			insertParamMap.put("PROC_ACTUAL",procActual); 
			insertParamMap.put("CON_PLAN",conPlan); 
			insertParamMap.put("CON_ACTUAL",conActual); 
			insertParamMap.put("COMM_PLAN",commPlan); 
			insertParamMap.put("COMM_ACTUAL",commActual); 
			insertParamMap.put("OVERALL_PLAN",overallPlan); 
			insertParamMap.put("OVERALL_ACTUAL",overallActual); 
			
			int cnt = sqlSession.selectOne("Project.checkProgressDuplication",insertParamMap) == null ? 0 : sqlSession.selectOne("Project.checkProgressDuplication",insertParamMap);
				
			int insertedRow = 0;
			int updatedRow = 0;
			
			if(cnt > 0){
			  updatedRow = sqlSession.update("Project.updateProgress", insertParamMap);
			} else{
				insertedRow = sqlSession.insert("Project.insertProgress",insertParamMap);
			}
			sqlSession.commit();
        	ContextUtil.commitTransaction(context);
%>
        <script language="Javascript">
        	getTopWindow().closeSlideInDialog();
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
