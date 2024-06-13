<%@page import="com.dec.util.DecMatrixUtil"%>
<%@page import="com.matrixone.servlet.Framework"%>
<%@page import="matrix.db.Context"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="java.util.Enumeration"%>
<%
	Context context = Framework.getFrameContext(session);
	Enumeration<String> eParamName = request.getParameterNames();
	String sParamName = null;
	String sParamValue = null;
	StringBuilder sbURL = new StringBuilder();
	// Modified by hslee on 2023.10.05
// 	String sURL = EnoviaResourceBundle.getProperty(context, "emxFramework.ServerUrl.Used");
	String sURL = DecMatrixUtil.getSystemINIVariable("ENOVIA_URL");
	sbURL.append(sURL);
	sbURL.append("/3dspace/common/decDashBoardProject3D.jsp?");
	while(eParamName.hasMoreElements()){
		sParamName = eParamName.nextElement();
		sbURL.append(sParamName);
		sbURL.append("=");
		sbURL.append(XSSUtil.encodeForURL(request.getParameter(sParamName)));
		sbURL.append("&");
	}
%>
<script>
	document.location.href = "<%=sbURL.toString()%>";
</script>