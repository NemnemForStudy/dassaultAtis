<%--  emxEngrBOMCopyToPreProcess.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of Dassault Systemes
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program
--%>
<%@ page import="java.util.HashMap"%>
<%@include file = "../common/emxNavigatorNoDocTypeInclude.inc"%>
<!-- Modified by hslee on 2023.08.21 --- [s] -->
<%-- <jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session"/> --%>
<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.decUITableIndented" scope="session"/>
<!-- Modified by hslee on 2023.08.21 --- [e] -->

<%
String timeStamp = emxGetParameter(request, "timeStamp");

HashMap tableData = indentedTableBean.getTableData(timeStamp);
HashMap requestMap = indentedTableBean.getRequestMap(timeStamp);

requestMap.put("XMLINFO", (String)session.getAttribute("XMLINFO"));
session.removeAttribute("XMLINFO");
request.setAttribute("requestMap", requestMap);

%>






