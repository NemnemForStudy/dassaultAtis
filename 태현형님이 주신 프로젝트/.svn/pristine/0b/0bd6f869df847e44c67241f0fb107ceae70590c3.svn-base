<%@page import="matrix.db.Context"%>
<%@page import="com.matrixone.servlet.Framework"%>
<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.dec.util.DecMatrixUtil"%>

<%
	Context context = Framework.getContext(session);
	String projectId = DecMatrixUtil.getObjectId(context, DomainConstants.TYPE_PROJECT_SPACE, request.getParameter("projectCode"));

	StringBuffer sbURL = new StringBuffer("../../programcentral/decProjectKeyQtyReportHeaderFS.jsp");
	sbURL.append("?suiteKey=ProgramCentral");
	sbURL.append("&isDashboard=").append(request.getParameter("isDashboard"));
	sbURL.append("&mode=").append(request.getParameter("mode"));
	sbURL.append("&pageHeading=").append(request.getParameter("pageHeading"));
	sbURL.append("&projectId=").append(projectId);
	sbURL.append("&objectId=").append(projectId);
%>
<script>
	location.href = "<%=sbURL.toString() %>";
<%-- 	location.href = "../../common/decemxNavigatorDialog4Dashboard.jsp?forwardURL=<%=sbURL.toString() %>"; --%>
</script>
