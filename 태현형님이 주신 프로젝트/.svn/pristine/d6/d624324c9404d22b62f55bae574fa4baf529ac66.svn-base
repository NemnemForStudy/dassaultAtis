<%--  emxGenericDeleteProcess.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxGenericDeleteProcess.jsp.rca 1.7.3.3 Tue Oct 28 22:59:38 2008 przemek Experimental przemek $
--%>

<%@ page import="java.util.*"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@ include file="../emxUICommonAppInclude.inc"%>
<%@ include file="../components/emxMemberListUtilAppInclude.inc"%>
<%@include file="enoviaCSRFTokenValidation.inc"%>

<emxUtil:localize id="i18nId" bundle="emxFrameworkStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />

<%
String actionURL = "";//For refreshing the Table Page.
String objectId = "";//MemberList Object Id

//String memberId = emxGetParameter(request,"memberId");
//com.matrixone.apps.common.MemberList memberlist = (com.matrixone.apps.common.MemberList)DomainObject.newInstance(context,PropertyUtil.getSchemaProperty(context,"type_MemberList"));
String action = request.getParameter("action") == null ? "" : request.getParameter("action"); //action값 들어옴
boolean isRemoved = false; // 이후부터 action 값을 찾아 if 여행을 떠남

String[] objectIds = request.getParameterValues("emxTableRowId");
try {
	// Added by hslee on 2023.07.24 --- [s]
	ContextUtil.startTransaction(context, true);
	
	Map resultMap = JPO.invoke(context, "decCodeMaster", null, "deleteObjects", objectIds, Map.class);
	
	ContextUtil.commitTransaction(context);
	
	String result = (String) resultMap.get("result");
	if ( "success".equalsIgnoreCase(result) )
	{
%>
<script>
	alert("<emxUtil:i18n localize="i18nId">emxFramework.Msg.JobHasBeenDoneSuccessfully</emxUtil:i18n>");
</script>
<%
	}
	else
	{
%>
<script>
	alert("<%=resultMap.get("msg") %>");
</script>
<%
	}
} catch (Exception exJPO) {
	ContextUtil.abortTransaction(context);
	throw (new FrameworkException(exJPO.toString()));
}
%>
<!-- HTML Section Begin -->

<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<script language="javascript" src="../common/scripts/emxUIUtility.js"></script>
<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="javascript" type="text/javaScript">
	//<![CDATA[

	
	const fr = window.parent
	//  const fr0 = window.top

	fr.location.reload();
</script>
<%@include file="../emxUICommonEndOfPageInclude.inc"%>
<%@include file="../common/emxNavigatorBottomErrorInclude.inc"%>


<!-- HTML Section End -->