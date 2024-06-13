<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<%@page import="org.hibernate.internal.build.AllowSysOut"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.servlet.Framework"%>
<%@page import="matrix.db.Context"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
Context context = Framework.getContext(session);

String objectId = request.getParameter("objectId");
System.out.println(objectId);

DomainObject obj = new DomainObject(objectId);
String current = obj.getInfo(context, "current");
System.out.println(current);

switch(current.toLowerCase()) {
case "create":
	obj.promote(context);
    break;
case "plan":
    obj.promote(context);
    break;
case "process":
    obj.promote(context);
    break;
case "review":
    obj.promote(context);
    break;
default:
    break;
}

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<script>
window.parent.parent.parent.parent.location.reload();
</script>
</body>
</html>