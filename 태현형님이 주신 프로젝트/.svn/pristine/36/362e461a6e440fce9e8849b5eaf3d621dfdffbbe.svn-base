<%@include file = "../common/emxNavigatorInclude.inc"%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
try {
	ContextUtil.startTransaction(context, true);
	
	Map programMap = new HashMap();
	programMap.put("objectId", emxGetParameter(request, "objectId"));
	programMap.put("masterType", emxGetParameter(request, "masterType"));
	
	Map resultMap = JPO.invoke(context, "decCodeMaster", null, "cloneCodeMaster", JPO.packArgs(programMap), Map.class);
	String result = (String) resultMap.get("result");
	
	if ( "Success".equalsIgnoreCase(result) )
	{
%>
	<script>
	debugger;
		alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.JobHasBeenCompleted</emxUtil:i18nScript>");
		parent.location.reload();
		turnOffProgress();
	</script>
<%		
	}
	else
	{
%>
	<script>
	debugger;
		alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.UnexpectedErrorOccurred</emxUtil:i18nScript>");
		console.err("<%=resultMap.get("msg") %>");
		turnOffProgress();
	</script>
<%	
	}
	
	ContextUtil.commitTransaction(context);
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>