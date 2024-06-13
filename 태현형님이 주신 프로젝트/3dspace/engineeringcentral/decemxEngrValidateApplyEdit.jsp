<%--  emxEngrValidateApplyEdit.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of Dassault Systemes
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program
--%>

<%@include file = "../common/emxNavigatorInclude.inc"%>


<%@ page import="com.matrixone.jdom.*,
    com.matrixone.jdom.Document,
    com.matrixone.jdom.input.*,
    com.matrixone.jdom.output.*" %>
<!-- Modified by hslee on 2023.08.21 --- [s] -->
<%-- <jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session"/> --%>
<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.decUITableIndented" scope="session"/>
<!-- Modified by hslee on 2023.08.21 --- [e] -->

<%
	String timeStamp = emxGetParameter(request, "timeStamp");

	HashMap requestMap = (HashMap) request.getAttribute("requestMap");
	Document doc       = (Document) request.getAttribute("XMLDoc");

	requestMap.put("XMLDoc", doc);

	request.setAttribute("requestMap", requestMap);
%>
