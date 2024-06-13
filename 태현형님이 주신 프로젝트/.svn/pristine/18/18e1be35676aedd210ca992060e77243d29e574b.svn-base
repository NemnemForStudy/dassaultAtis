<%--  emxProjectManagementUtil.jsp

   Copyright (c) Dassault Systemes, 1992-2020 .All rights reserved

--%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecMatrixUtil"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Datacollections"%> 
<%@page import="com.dassault_systemes.enovia.e6wv2.foundation.jaxb.Dataobject"%>
<%@page import="java.util.Set"%>
<%@page import="com.matrixone.apps.common.TaskDateRollup"%>
<%@page import="javax.json.JsonObjectBuilder"%>
<%@page import="javax.json.Json"%>
<%@page import="javax.json.JsonObject"%>
<%@page import="java.lang.reflect.Method"%>
<%@page import="java.util.List"%>
<%@page import="com.matrixone.apps.common.TaskDateRollup"%>

<%@include file="emxProgramGlobals2.inc"%>
<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonAppInclude.inc"%>
<%@ include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonHeaderEndInclude.inc" %>
<%@include file = "../common/emxUIConstantsInclude.inc"%>


<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.common.Company,matrix.util.StringList" %>

<%@page import="java.util.Enumeration"%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.DomainConstants"%>


<%-- <jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session"/> --%>
<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.decUITableIndented" scope="session"/>
<jsp:useBean id="formBean" scope="session" class="com.matrixone.apps.common.util.FormBean"/>
<SCRIPT language="javascript" src="../common/scripts/emxUICore.js"></SCRIPT>
<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script src="../common/scripts/emxUIModal.js" type="text/javascript"></script>
<script src="../programcentral/emxProgramCentralUIFormValidation.js" type="text/javascript"></script>

<%


	String strMode = emxGetParameter(request, "mode");
	strMode = XSSUtil.encodeURLForServer(context, strMode);
	
	if("getUOM".equalsIgnoreCase(strMode)){
		String sKeyItem = emxGetParameter(request, "keyItem");
		String sProjectOID = emxGetParameter(request, "projectOID");
		String sTaskOID = emxGetParameter(request, "taskOID");
		if(DecStringUtil.equalsIgnoreCase(sProjectOID, "undefined")){
			DomainObject doTask = DomainObject.newInstance(context, sTaskOID);
			sProjectOID = doTask.getInfo(context, "to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
		}
		StringList slDisplay = new StringList();
		StringList slValue = new StringList();

		DomainObject doPS = DomainObject.newInstance(context, sProjectOID);
		doPS.open(context);
    	String sKeyItemOID = DecMatrixUtil.getObjectId(context, DecConstants.TYPE_DECCODEDETAIL, sKeyItem, doPS.getName() + "_BOQ Key Item", "current == Active");
    	DomainObject doKeyItem = DomainObject.newInstance(context, sKeyItemOID);

    	StringList slDesc = doKeyItem.getInfoList(context, "from[" + DecConstants.RELATIONSHIP_DECCODEDETAILRELADD + "].to.description");
    	StringList slCode = doKeyItem.getInfoList(context, "from[" + DecConstants.RELATIONSHIP_DECCODEDETAILRELADD + "].to." + DecConstants.SELECT_ATTRIBUTE_DECCODE);
    	
    	String sDesc = slDesc.join("_");
    	String sCode = slCode.join("_");
    	
		JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
		jsonObjectBuilder.add("display",sDesc);
		jsonObjectBuilder.add("value",sCode);
		
		out.clear();
		out.write(jsonObjectBuilder.build().toString());
		
		return;
	}else if("getBOQKeyItem".equalsIgnoreCase(strMode)){
		String sDiscipline = emxGetParameter(request, "Discipline");
		String sProjectOID = emxGetParameter(request, "projectOID");
		String sTaskOID = emxGetParameter(request, "taskOID");
		if(DecStringUtil.equalsIgnoreCase(sProjectOID, "undefined")){
			DomainObject doTask = DomainObject.newInstance(context, sTaskOID);
			sProjectOID = doTask.getInfo(context, "to[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_KEY + "].from.from[" + DecConstants.RELATIONSHIP_PROJECT_ACCESS_LIST +"].to.id");
		}
		StringList slDisplay = new StringList();
		StringList slValue = new StringList();

		DomainObject doPS = DomainObject.newInstance(context, sProjectOID);
		doPS.open(context);
		
		String sDisciplineDetailOID = DecMatrixUtil.getObjectId(context, DecConstants.TYPE_DECCODEDETAIL, sDiscipline, doPS.getName() + "_Discipline", "current == Active");
		DomainObject doDisciplineDetail = DomainObject.newInstance(context, sDisciplineDetailOID);
		
		StringList slParam = new StringList();
		slParam.add(DecConstants.SELECT_DESCRIPTION);
		slParam.add(DecConstants.SELECT_ATTRIBUTE_DECCODE);
		slParam.add(DecConstants.SELECT_ATTRIBUTE_DECCODEDETAILTYPE);
		
		StringList slDesc = new StringList();
		StringList slCode = new StringList();
		
		MapList mlRelAddInfo = doDisciplineDetail.getRelatedObjects(context
				, DecConstants.RELATIONSHIP_DECCODEDETAILRELADD
				, DecConstants.TYPE_DECCODEDETAIL
				, slParam
				, null
				, false
				, true
				, (short) 1
				, "current == Active"
				, null
				, 0);
		for(Object o : mlRelAddInfo){
			Map mRelAddInfo = (Map)o;
			String sDetailType = (String)mRelAddInfo.get(DecConstants.SELECT_ATTRIBUTE_DECCODEDETAILTYPE);
			if("BOQ Key Item".equals(sDetailType)){
				slDesc.add((String)mRelAddInfo.get(DecConstants.SELECT_DESCRIPTION));
				slCode.add((String)mRelAddInfo.get(DecConstants.SELECT_ATTRIBUTE_DECCODE));
			}
		}
    	String sDesc = slDesc.join("_");
    	String sCode = slCode.join("_");
		JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
		jsonObjectBuilder.add("display",sDesc);
		jsonObjectBuilder.add("value",sCode);

		out.clear();
		out.write(jsonObjectBuilder.build().toString());
		
		return;
	}

%>

<%@include file = "../emxUICommonEndOfPageInclude.inc" %>
<%@include file = "../components/emxComponentsDesignBottomInclude.inc"%>

