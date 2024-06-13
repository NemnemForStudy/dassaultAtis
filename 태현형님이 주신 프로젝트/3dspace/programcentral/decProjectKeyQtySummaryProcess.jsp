<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try ( SqlSession sqlSession = decSQLSessionFactory.getBatchSession() ) {
	String cutOff = emxGetParameter(request, "cutOff");
	StringList slCutOff = FrameworkUtil.splitString(cutOff, "_");
	
	String[] KEY_CDArr = emxGetParameterValues(request, "KEY_CD");
	String[] TYPE2_REMARKArr = emxGetParameterValues(request, "TYPE2_REMARK");
	
	MapList objectList = new MapList();
	Map objectMap = null;
	
	for (int k = 0; k < KEY_CDArr.length; k++)
	{
		objectMap = new HashMap();
		objectMap.put("KEY_CD", KEY_CDArr[k]);
		objectMap.put("TYPE2_REMARK", TYPE2_REMARKArr[k]);
		
		objectList.add(objectMap);
	}
	
	Map programMap = new HashMap();
	programMap.put("sqlSession", sqlSession);
	programMap.put("SITE_CD", emxGetParameter(request, "SITE_CD"));
// 	programMap.put("UNIT_CD", emxGetParameter(request, "UNIT_CD"));
	programMap.put("UNIT_ID", emxGetParameter(request, "UNIT_ID"));
	programMap.put("CUT_OFF_YEAR", slCutOff.get(0));
	programMap.put("CUT_OFF_MONTH", slCutOff.get(1));
	programMap.put("objectList", objectList);
	
	Map resultMap = JPO.invoke(context, "decKeyQty", null, "setKeyQtySummaryData", JPO.packArgs(programMap), Map.class);
	String result = (String) resultMap.get("result");
	
	if ( "Success".equalsIgnoreCase(result) )
	{
%>	
<script>
	top.turnOffProgress();
	alert("<%=result %>");
</script>
<%		
	}
	else
	{
%>	
<script>
top.turnOffProgress();
	alert("<%=resultMap.get("msg") %>");
</script>
<%			
	}
	sqlSession.commit();
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>