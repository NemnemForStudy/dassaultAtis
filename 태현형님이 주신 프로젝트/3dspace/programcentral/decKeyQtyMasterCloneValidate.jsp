<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
try {
	String objectId = emxGetParameter(request, "objectId");
	
	Map programMap = new HashMap();
	programMap.put("objectId", objectId);
	
	String projectCode = JPO.invoke(context, "decKeyQty", null, "getSITE_CD", JPO.packArgs(programMap), String.class);
	
	MapList resultMapList = JPO.invoke(context, "decKeyQty", null, "getMasterList", JPO.packArgs(programMap), MapList.class);
	
	if ( resultMapList != null && resultMapList.size() >= 1 )
	{
%>
	<script>
		if ( confirm("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.KeyQtyMasterAlreadyExists</emxUtil:i18nScript>") )
		{
			location.href = "../programcentral/decProjectKeyQtyMasterCloneProcess.jsp?projectCode=<%=projectCode %>&mode=reset";
		}
		else
		{
			alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.JobHasBeenCancelled</emxUtil:i18nScript>");
		}
	</script>
<%		
	}
	else
	{
%>
	<script>
		location.href = "../programcentral/decProjectKeyQtyMasterCloneProcess.jsp?projectCode=<%=projectCode %>&mode=set";
	</script>
<%			
	}
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>