<%@page import="com.matrixone.apps.domain.*"%>
<%@page import="matrix.util.*"%>
<%@page import="java.util.*"%>
<%@include file="../emxUITopInclude.inc"%>

<% 
out.clear();
String objectId = emxGetParameter(request,"objectId");

HashMap paramMap = new HashMap();
paramMap.put("objectId", objectId);
String[] methodargs = JPO.packArgs(paramMap);
StringList routeList = (StringList)JPO.invoke(context, "emxRouteBase", null, "getRouteListInCurrentState", methodargs, StringList.class);

String finalRouteId=routeList.get(0);
response.getWriter().write(finalRouteId);
%>









