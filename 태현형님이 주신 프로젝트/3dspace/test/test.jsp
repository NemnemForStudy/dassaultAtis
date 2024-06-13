<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	MapList ml = UITableCustom.getColumns(context, "decCodeDetailTable", null);
	System.out.println(ml);
	String errorMsg = EnoviaResourceBundle.getProperty(context,"emxFrameworkStringResource",context.getLocale(),"emxFramework.Common.decName");  
	System.out.println(errorMsg);
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>