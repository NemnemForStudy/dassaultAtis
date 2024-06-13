<%--  decProjectChangeProjectCodeProcess.jsp  
 Copyright (c) 2003-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program

   decProjectChangeProjectCodeProcess.jsp 
   Created By thok 2023-07-24
--%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>

<%@include file = "../common/emxNavigatorInclude.inc"%>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />

<script language="JavaScript" src="scripts/emxUICore.js" type="text/javascript"></script>
<!-- Import the java packages -->

<%
        String objectId                          = emxGetParameter(request,"objectId");
        String newProjectCode                    = emxGetParameter(request,"projectCode");
        
        try(SqlSession sqlSession = decSQLSessionFactory.getSession())
        {
        	ContextUtil.startTransaction(context, true);
        	
        	//중복 체크
        	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, "*", DecConstants.SELECT_NAME + "=='" + newProjectCode + "'", null);
        	
        	if(mlProject != null && !mlProject.isEmpty()) { 
  				String strMsg = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,
  	                    "emxProgramCentral.Error.duplicateProjectCode", context.getSession().getLanguage());
  	            MqlUtil.mqlCommand(context, "warning $1", strMsg);
  				throw new Exception();
        	}
        	
        	DomainObject object = new DomainObject(objectId);
        	
        	String OGProjectCode = object.getName(context);
        	
        	object.setName(context, newProjectCode);
        	
        	// DB Update [S]
        	Map updateParamMap = new HashMap();
        	updateParamMap.put("OG_PROJECT_CODE",OGProjectCode);
        	updateParamMap.put("NEW_PROJECT_CODE",newProjectCode);
        	
        	sqlSession.update("Project.changeProjectCodeDecSafetyStataics", updateParamMap);//Dec Safety Static
        	sqlSession.update("Project.changeProjectCodeDecProgress", updateParamMap);//Dec Progress
        	
        	sqlSession.update("Project.changeProjectCodeIFProjectInfo", updateParamMap);//IF Project Info
        	sqlSession.update("Project.changeProjectCodeIFProjectBIzList", updateParamMap);//IF Project Biz List
        	sqlSession.update("Project.changeProjectCodeIFProjectScheduleList", updateParamMap);//IF Project Schedule List
        	sqlSession.update("Project.changeProjectCodeIFDeliverableList", updateParamMap);//IF Deliverable List
        	sqlSession.update("Project.changeProjectCodeIFVendorPrintList", updateParamMap);//IF Vendor Print List
        	
        	sqlSession.update("Project.changeProjectCodeDecCWPChangeRegister", updateParamMap);//Dec CWP Change Register
        	sqlSession.update("Project.changeProjectCodeDecConstructionKPI", updateParamMap);//Dec Contruction KPI
        	sqlSession.update("Project.changeProjectCodeDecKeyQtyProjectSetupFlag", updateParamMap);//Dec Key Qty Project Setup Flag
        	sqlSession.update("Project.changeProjectCodeDecKeyQtyMontlyData", updateParamMap);//Dec Ket Qty Montly Data
        	
        	sqlSession.update("Project.changeProjectCodeDecProjectInfo", updateParamMap);//Dec Project Info List
        	sqlSession.update("Project.changeProjectCodeIFProjectPo", updateParamMap);//IF Project PO
        	sqlSession.update("Project.changeProjectCodeDecIWPChangeRegister", updateParamMap);//Dec IWP Change Register
        	sqlSession.update("Project.changeProjectCodeIFMaterial", updateParamMap);//IF Material 
        	sqlSession.update("Project.changeProjectCodeIFProgressDaily", updateParamMap);//IF Progress Daily
        	
        	sqlSession.commit();
        	// DB Update [E]
        	
        	ContextUtil.commitTransaction(context);
        
%>
        <script language="Javascript">
        	getTopWindow().closeSlideInDialog();
        	alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Common.ChangeProjectCode</emxUtil:i18nScript>");
        	top.findFrame(top,"portalDisplay").location.reload();
        </script>
<%
        }
        catch(Exception e)
        {
        	e.printStackTrace();
    		throw e;
        }
%>