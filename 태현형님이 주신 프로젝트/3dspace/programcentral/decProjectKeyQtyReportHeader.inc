<%@page import="java.sql.Timestamp"%>
<%@page import="java.time.LocalDate"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="java.util.List"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.webservice.call.decWebserviceUtil"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />

<%!
public String getCutOffDateStr(Map map) throws Exception{
	try {
		Timestamp tsData = (Timestamp) map.get("CUT_OFF_DATE");
		String cutOffDateStr = "";
		if ( tsData != null )
		{
			Date dData = DecDateUtil.autoChangeDate(tsData.toString());
			cutOffDateStr = DecDateUtil.changeDateFormat(dData, DecDateUtil.DEC_DATE_FORMAT);
		}
		return cutOffDateStr;
	} catch(Exception e) {
		e.printStackTrace();
		throw e;
	}
}
%>

<script src="../common/scripts/emxUIConstants.js"></script>
<script src="../common/scripts/emxUICore.js"></script>
<script src="../common/scripts/emxUICoreMenu.js"></script>
<script src="../common/scripts/emxUIToolbar.js"></script>
<script src="../common/scripts/emxUICalendar.js"></script>
<script src="../common/scripts/jquery-latest.js"></script>
<script src="../common/scripts/decCalendarFilter.js"></script>
<script src="../programcentral/script/decProjectKeyQtyReport.js"></script>

<link rel="stylesheet" href="../common/styles/emxUIDefault.css"/>
<link rel="stylesheet" href="../common/styles/emxUIForm.css"/>
<link rel="stylesheet" href="../common/styles/emxUIList.css"/>
<link rel="stylesheet" href="../common/styles/emxUIMenu.css"/>
<link rel="stylesheet" href="../common/styles/emxUICalendar.css"/>
<link rel="stylesheet" href="../programcentral/styles/decProjectKeyQtyReport.css"/>

<%
//try {
	String projectId = emxGetParameter(request, "projectId");
	String unitId = emxGetParameter(request, "unitId");
	String cutOff = emxGetParameter(request, "cutOff");
	String projectCode = emxGetParameter(request, "projectCode");
	String unitCode = emxGetParameter(request, "unitCode");
	boolean isProject = Boolean.valueOf( emxGetParameter(request, "isProject") );
	boolean isDashboard = Boolean.valueOf( emxGetParameter(request, "isDashboard") );
	
	StringList cutOffList = FrameworkUtil.splitString(cutOff, "_");
	String year = cutOffList.get(0);
	String month = cutOffList.get(1);
	
	String collapseHTML = "<a class='collapseAnchor' href='#' onclick='fnCollapse(this)'><img src='../common/images/iconSectionCollapse.gif'></img></a>";
	String expandHTML = "<a class='expandAnchor' href='#' onclick='fnExpand(this)'><img src='../common/images/iconSectionExpand.gif'></img></a>";
	
	Map includeProgramMap = new HashMap();
	includeProgramMap.put("objectId", projectId);
	includeProgramMap.put("wbsType", "Unit");
	includeProgramMap.put("slSelect", new StringList(DomainConstants.SELECT_NAME));
	
	MapList unitList = JPO.invoke(context, "emxProjectSpace", null, "getActivityListWithWBSType", JPO.packArgs(includeProgramMap), MapList.class);
	
	Map projectMap = new HashMap();
	projectMap.put(DomainConstants.SELECT_ID, projectId);
	projectMap.put(DomainConstants.SELECT_NAME, projectCode);
	
	unitList.add(projectMap);
	
	String unitJsonStr = decWebserviceUtil.convertListToJsonString(unitList);
//} catch(Exception e) {
//	e.printStackTrace();
//	throw e;
//}
%>
