<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	Map programMap = new HashMap();
	programMap.put("objectId", "22220.15368.25882.32063");
	JPO.invoke(context, "decCodeMaster", null, "exportCodeMaster", JPO.packArgs(programMap), Map.class);
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>