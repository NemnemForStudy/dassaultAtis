<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	StringList sl = new StringList( new String[] {"a","b","c"});
	String[] sarr = sl.toStringArray();
	for (String s : sarr)
	{
		System.out.println(s);
	}
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>