<%@page import="org.hibernate.internal.build.AllowSysOut"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>
<%@page import="java.util.Map"%>
<%@page import="matrix.util.StringList"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.servlet.Framework"%>
<%@page import="matrix.db.Context"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
Context context = Framework.getContext(session);

String fieldNameOID = request.getParameter("fieldNameOID");
String fieldNameActual = request.getParameter("fieldNameActual");
String fieldNameDisplay = request.getParameter("fieldNameDisplay");
String objectId = request.getParameter("emxTableRowId");

String name, Id;

String[] parts = objectId.split("\\|");
String number = parts[1];

DomainObject sObj = new DomainObject(number);

StringList sList = new StringList();
sList.add("name");
sList.add("id");

Map map = sObj.getInfo(context, sList);

name = String.valueOf(map.get("name"));
Id = String.valueOf(map.get("id"));
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<script>
top.opener.document.forms[0].<%=fieldNameOID%>.value="<%=name%>";
top.opener.document.forms[0].<%=fieldNameDisplay%>.value="<%=name%>";
top.opener.document.forms[0].<%=fieldNameActual%>.value="<%=Id %>"; 
top.self.close();
</script>
</body>
</html>