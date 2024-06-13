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
        String noAccidentHour					  = emxGetParameter(request,"noAccidentHour");
        String death							  = emxGetParameter(request,"death");
        String injury							  = emxGetParameter(request,"injury");
        String nearMiss							  = emxGetParameter(request,"nearMiss");
        String uaUc								  = emxGetParameter(request,"uaUc");
        String peopleInput						  = emxGetParameter(request,"peopleInput");
        
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
			insertParamMap.put("NO_ACCIDENT_HOUR",noAccidentHour); 
			insertParamMap.put("DEATH",death); 
			insertParamMap.put("INJURY",injury); 
			insertParamMap.put("NEAR_MISS",nearMiss); 
			insertParamMap.put("UA_UC",uaUc); 
			insertParamMap.put("PEOPLE_INPUT",peopleInput);
			
			int cnt = sqlSession.selectOne("Project.checkSafetyStaticsDuplication",insertParamMap) == null ? 0 : sqlSession.selectOne("Project.checkSafetyStaticsDuplication",insertParamMap);
				
			int insertedRow = 0;
			int updatedRow = 0;
			
			if(cnt > 0){
			  updatedRow = sqlSession.update("Project.updateSafetyStatics", insertParamMap);
			} else{
				insertedRow = sqlSession.insert("Project.insertSafetyStatics",insertParamMap);
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
