<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	String objectId = emxGetParameter(request, "objectId");
	String projectCode = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DomainConstants.SELECT_NAME);
	
	Map programMap = new HashMap();
	programMap.put("projectCode", projectCode);
	
	Map resultMap = JPO.invoke(context, "emxProjectSpace", null, "doInterfaceProject", JPO.packArgs(programMap), Map.class);
	
	String result = resultMap != null ? (String) resultMap.get("result") : "";
	
	if ( "Success".equalsIgnoreCase(result) )
	{
		%>
		<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
		<script>
			alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.JobHasBeenCompleted</emxUtil:i18nScript>");
			parent.location.reload();
		</script>
		<%
	}
	else
	{
		%>
		<script>
			alert("<%=resultMap.get("error") %>");
		</script>
		<%
	}
	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>