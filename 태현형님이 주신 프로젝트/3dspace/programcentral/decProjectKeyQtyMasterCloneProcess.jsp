<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
	String projectCode = emxGetParameter(request, "projectCode");
	String mode = emxGetParameter(request, "mode");
	
	Map programMap = new HashMap();
	programMap.put("projectCode", projectCode);
	programMap.put("mode", mode);
	programMap.put("sqlSession", sqlSession);
	
	Map resultMap = JPO.invoke(context, "decKeyQty", null, "cloneKeyQtyMaster", JPO.packArgs(programMap), Map.class);
	
	String result = (String) resultMap.get("result");
	if ( "success".equalsIgnoreCase(result) )
	{
		%>
			<script>
				alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.JobHasBeenCompleted</emxUtil:i18nScript>");
				parent.turnOffProgress();
				parent.location.reload();
			</script>
		<%
	}
	else
	{
		%>
		<script>
			alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Message.UnexpectedErrorOccurred</emxUtil:i18nScript>");
			console.err("<%=resultMap.get("error") %>");
		</script>
		<%
	}
	
	sqlSession.commit();
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>