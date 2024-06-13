<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	Map programMap = new HashMap();
	programMap.put("projectId", "22220.15368.30078.55995");
	programMap.put("codeMasterName", "DP Hierarchy");
	programMap.put("groupBySelect", "attribute[decCodeDetailType]");
	programMap.put("groupByValue", "Discipline");
	programMap.put("groupByDetailSelect", "attribute[decCodeDetailType]");
	programMap.put("groupByDetailValue", "FMCS Construction Item");
	
	Map resultMap = JPO.invoke(context, "decCodeMaster", null, "getCodeDetailListGroupBy", JPO.packArgs(programMap), Map.class);
	System.out.println(resultMap);
} catch(Exception e) {
	e.printStackTrace();
	throw e;
} finally {
}
%>