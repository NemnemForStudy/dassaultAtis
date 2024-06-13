<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	ContextUtil.pushContext(context);
	
	String log = MqlUtil.mqlCommand(context, "monitor context");
	
	StringList slLog = FrameworkUtil.splitString(log, "\n");
	
	for (String line : slLog)
	{
		out.println(line + "<br/>");
	}
	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
	ContextUtil.popContext(context);
}
%>