<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
try {
	StringBuffer sbURL = new StringBuffer();
	sbURL.append("../common/emxIndentedTable.jsp?table=decProjetKeyQtyReportSummary&program=decKeyQty:getProjectKeyQtyList&toolbar=decProjectKeyQtyReportSummaryToolbar");
	sbURL.append("&decProjectKeyQtyFromYearCmd=").append(fromYear);
	sbURL.append("&decProjectKeyQtyFromMonthCmd=").append(fromMonth);
	sbURL.append("&decProjectKeyQtyToYearCmd=").append(toYear);
	sbURL.append("&decProjectKeyQtyToMonthCmd=").append(toMonth);
	sbURL.append("&").append(emxGetQueryString(request));
	
	StringBuffer sbURL = new StringBuffer();
	sbURL.append(url);
	sbURL.append("&objectId=").append( emxGetParameter(request, "objectId") );
	sbURL.append("&decProjectKeyQtyFromYearCmd=").append( emxGetParameter(request, "decProjectKeyQtyFromYearCmd") );
	sbURL.append("&decProjectKeyQtyFromMonthCmd=").append( emxGetParameter(request, "decProjectKeyQtyFromMonthCmd") );
	sbURL.append("&decProjectKeyQtyToYearCmd=").append( emxGetParameter(request, "decProjectKeyQtyToYearCmd") );
	sbURL.append("&decProjectKeyQtyToMonthCmd=").append( emxGetParameter(request, "decProjectKeyQtyToMonthCmd") );
%>	
	<script>
		top.findFrame(top, "detailsDisplay").location.href = "<%= sbURL.toString() %>";
	</script>
<%			
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>