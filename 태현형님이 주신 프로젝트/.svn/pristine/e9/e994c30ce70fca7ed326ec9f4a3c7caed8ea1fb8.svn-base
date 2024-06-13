<%@page import="com.dec.util.DecMatrixUtil"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	String enoviaURL = DecMatrixUtil.getSystemINIVariable(null, "ENOVIA_URL").toUpperCase();
	System.out.println("enoviaURL : " + enoviaURL);
	DecMatrixUtil.SERVER_TYPE _serverType = null;
	if ( enoviaURL.startsWith("https://epcplatform.".toUpperCase()) )
	{
		_serverType = DecMatrixUtil.SERVER_TYPE.PROD;
	}
	else if ( enoviaURL.startsWith("https://epcplatformdev.".toUpperCase()) ) 
	{
		_serverType = DecMatrixUtil.SERVER_TYPE.DEV;
	}
	else
	{
		_serverType = DecMatrixUtil.SERVER_TYPE.LOCAL;
	}
	System.out.println("_serverType : " + _serverType);
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
}
%>