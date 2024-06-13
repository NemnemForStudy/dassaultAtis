<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
try {
	String objectId = emxGetParameter(request, "objectId");
	String cutOff = emxGetParameter(request, "cutOff");
	String hasReport = emxGetParameter(request, "hasReport");
	String projectId = emxGetParameter(request, "projectId");
	
	String url = "../common/decTaskCompareExcelDialogFS.jsp";
	url += "?type=KeyQty&objectId=" + objectId;
	url += "&cutOff=" + cutOff;
	url += "&projectId=" + projectId;
	
	if ( Boolean.valueOf(hasReport) )
	{
%>
	<script>
		if ( confirm("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.KeyQtyAlreadyExists</emxUtil:i18nScript>") )
		{
			top.showModalDialog("<%=url %>", 1000, 1000);
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
	top.showModalDialog("<%=url %>", 1000, 1000);
	</script>
<%			
	}
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>