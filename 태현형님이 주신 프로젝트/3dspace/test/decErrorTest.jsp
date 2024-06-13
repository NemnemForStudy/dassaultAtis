<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	
	String str2 = emxGetParameter(request, "test");
	System.out.println(str2);
%>
Hello World!
<%	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>