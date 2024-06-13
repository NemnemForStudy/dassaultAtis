<%@page import="com.matrixone.apps.domain.DomainRelationship"%>
<%@page import="org.hibernate.internal.build.AllowSysOut"%>
<%@page import="java.util.Map"%>
<%@page import="matrix.util.StringList"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.servlet.Framework"%>
<%@page import="matrix.db.Context"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
Context context = Framework.getContext(session);

//유산2
final String getId = "to[ResolutionRel2024].from.to[simpleRelationship].from.id";
final String getCurrent = "to[ResolutionRel2024].from.to[simpleRelationship].from.current";
final String getRelId = "relationship[ResolutionRel2024].id";

String objectId = request.getParameter("objectId");
DomainObject dom = new DomainObject(objectId);

String checkStatus = "O";

// current, parentId 가져와서 promote시키기.
StringList sList = new StringList();
sList.add(getRelId);
sList.add(getId);
sList.add(getCurrent);

Map objParentInfo = dom.getInfo(context, sList);
String id = (String)objParentInfo.get(getId);
String current = (String)objParentInfo.get(getCurrent);
String relId = (String)objParentInfo.get(getRelId);

DomainObject parentId = new DomainObject(id);
DomainRelationship rId = new DomainRelationship(relId);
rId.setAttributeValue(context, "checkStatus", checkStatus);

if(current.equalsIgnoreCase("Process")) {
	parentId.setState(context, "Review");
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
top.self.close();
</script>
</body>
</html>