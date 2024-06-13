<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	String objectId = "22220.15368.25882.32063"; //OPAT1
// 	String objectId = "22220.15368.60083.45540"; //T7
	Map programMap = new HashMap();
	programMap.put("objectId", objectId);
	
	Map resultMap = JPO.invoke(context, "decInterfaceMaterial", null, "interfaceCWPMaterialList", JPO.packArgs(programMap), Map.class);
	/*
	Map programMap = new HashMap();
	programMap.put("orgCd", "OPAT1");
	
	Map resultMap = JPO.invoke(context, "emxProjectSpace", null, "doInterface", JPO.packArgs(programMap), Map.class);
	System.out.println(resultMap);
	*/
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>