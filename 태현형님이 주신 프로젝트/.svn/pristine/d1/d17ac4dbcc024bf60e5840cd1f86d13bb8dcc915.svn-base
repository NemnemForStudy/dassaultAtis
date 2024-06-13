<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	Map programMap = new HashMap();
	programMap.put("objectId", emxGetParameter(request, "objectId"));
	
	Map defaultDataMap = JPO.invoke(context, "decKeyQty", null, "getDefaultData", JPO.packArgs(programMap), Map.class);
	
	int fromYear = (int) defaultDataMap.get("fromYear");
	int fromMonth = (int) defaultDataMap.get("fromMonth");
	int toYear = (int) defaultDataMap.get("toYear");
	int toMonth = (int) defaultDataMap.get("toMonth");

// 	${COMMON_DIR}/emxIndentedTable.jsp?table=decProjetKeyQtyReportSummary&program=decKeyQty:getProjectKeyQtyList&toolbar=decProjectKeyQtyReportSummaryToolbar
	StringBuffer sbURL = new StringBuffer();
	sbURL.append("../common/emxIndentedTable.jsp?table=decProjectKeyQtyReportSummary&program=decKeyQty:getProjectKeyQtyList&toolbar=decProjectKeyQtyReportSummaryToolbar");
	sbURL.append("&decProjectKeyQtyFromYearCmd=").append(fromYear);
	sbURL.append("&decProjectKeyQtyFromMonthCmd=").append(fromMonth);
	sbURL.append("&decProjectKeyQtyToYearCmd=").append(toYear);
	sbURL.append("&decProjectKeyQtyToMonthCmd=").append(toMonth);
	sbURL.append("&").append(emxGetQueryString(request));
%>	
	<script>
		location.href = "<%=sbURL.toString() %>";
	</script>
<%			
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>