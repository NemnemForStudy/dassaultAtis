<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	String modified = "1/1/2020";
	
	Map programMap = new HashMap();
	programMap.put("modified", modified);
	
	Map resultMap = JPO.invoke(context, "emxProjectSpace", null, "setProjectInfo2RDB", JPO.packArgs(programMap), Map.class);
	String result = (String) resultMap.get("result");
	
	if ( "Success".equalsIgnoreCase(result) )
	{
%>
<script>
	alert("Success");
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
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
}
%>