<%@page import="com.dec.util.DecConstants"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="java.util.List"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />

<script src="../common/scripts/emxUICore.js"></script>
<script src="../common/scripts/emxUIModal.js"></script>
<%
try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
	String objectId = emxGetParameter(request, "objectId");
	
	String projectCode = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", objectId, DecConstants.SELECT_NAME);
	
	Map selectParamMap = new HashMap();
	selectParamMap.put("SITE_CD", projectCode);
	
	List<Map> biddingCountList = sqlSession.selectList("IF_Material.selectBMTrackingBiddingCount", selectParamMap);
	String biddingCount = null;
	if ( biddingCountList != null && biddingCountList.size() == 1 )
	{
		biddingCount = String.valueOf( biddingCountList.get(0).get("COUNT") );
	}
%>

<script type="text/javascript">
function fnImport() {
	showModalDialog("../common/decTaskCompareExcelDialogFS.jsp?type=BMTracking&objectId=<%=objectId %>", 1000, 1000);
}
</script>

<%	
	if ( !"0".equals(biddingCount) )
	{
%>
		<script>
		if ( confirm("<emxUtil:i18n localize="i18nId">emxProgramCentral.Msg.BiddingQtyAlreadyExists</emxUtil:i18n>") )
		{
			fnImport();
		}
		else
		{
			alert("<emxUtil:i18n localize="i18nId">emxProgramCentral.Message.JobHasBeenCancelled</emxUtil:i18n>");
		}
		</script>
<%
	}
	else
	{
%>
		<script>
			fnImport();
		</script>
<%
	}
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>