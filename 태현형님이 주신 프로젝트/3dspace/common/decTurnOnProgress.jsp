<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	String forwardURL = emxGetParameter(request, "forwardURL");
	String queryStr = emxGetQueryString(request);
	StringList queryStrList = FrameworkUtil.splitString(queryStr, "&");
	String tempQueryStr = null; 
	StringList reconfigQueryStrList = new StringList();
	for (int k = 0; k < queryStrList.size(); k++)
	{
		tempQueryStr = queryStrList.get(k);
		if ( !tempQueryStr.contains("forwardURL") )
		{
			reconfigQueryStrList.add(tempQueryStr);
		}
	}
	
	forwardURL += forwardURL.contains("?") ? "&" : "?";
	forwardURL += reconfigQueryStrList.join("&");
%>
<script type="text/javascript">
debugger;
parent.turnOnProgress();
location.href = "<%=forwardURL %>";
</script>
<%
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>