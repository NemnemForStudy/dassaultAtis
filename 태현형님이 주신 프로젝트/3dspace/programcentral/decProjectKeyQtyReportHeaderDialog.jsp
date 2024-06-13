<%@page import="java.util.Set"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="java.sql.Timestamp"%>
<%@page import="java.time.LocalDate"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="java.util.List"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
try { 
	String projectId = emxGetParameter(request, "projectId");
	String unitId = emxGetParameter(request, "objectId");
	String cutOff = emxGetParameter(request, "cutOff");
	String mode = emxGetParameter(request, "mode");
	boolean isProject = Boolean.valueOf( emxGetParameter(request, "isProject") );
	String pageHeading = emxGetParameter(request, "pageHeading");
	
// 	String projectCode = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", projectId, DomainConstants.SELECT_NAME);
	DomainObject doProject = DomainObject.newInstance(context, projectId);
	StringList slSelect = new StringList();
	slSelect.add(DecConstants.SELECT_NAME);
	slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECSITENAME);
	slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECSITENAME_EN);
	Map projectInfo = doProject.getInfo(context, slSelect);
	
	String projectCode = (String) projectInfo.get(DecConstants.SELECT_NAME);
	
	String siteName = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECSITENAME);	;
	if ( "en".equals(langStr) )
	{
		siteName = (String) projectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECSITENAME_EN);	
	}
	
	String unitCode = null;

	if ( isProject )
	{
		unitCode = projectCode;
	}
	else
	{
		unitCode = MqlUtil.mqlCommand(context, "print bus $1 select $2 dump", unitId, DomainConstants.SELECT_NAME);
	}
	
	if ( StringUtils.isEmpty(cutOff) )
	{
		Map programMap = new HashMap();
		programMap.put("objectId", projectId);
		
		Map resultMap = JPO.invoke(context, "decKeyQty", null, "getDefaultData", JPO.packArgs(programMap), Map.class);
		// jhlee Add 10.25 --[S]
	//  cutOff = resultMap.get("thisYear") + "_" + resultMap.get("thisMonth");
		MapList resultMapList = JPO.invoke(context, "decKeyQty", null, "getProjectKeyQtyList", JPO.packArgs(programMap), MapList.class);
		for(Object o : resultMapList){
			Map mResult = (Map)o;
			String sName = (String)mResult.get("name");
			if(projectCode.equals(sName)){
				Set<String> setKey = mResult.keySet();
				setKey.remove(DecConstants.SELECT_ID);
				setKey.remove(DecConstants.SELECT_NAME);
				setKey.remove(DecConstants.SELECT_TYPE);
				StringList slKey = new StringList();
				slKey.addAll(setKey);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM");
				Date dCutoff = null;
				for(String sKey : slKey){
					Date dKey = sdf.parse(sKey);
					if(dCutoff == null || dKey.after(dCutoff)){
						dCutoff = dKey;
					}
				}
				if(dCutoff != null){
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(dCutoff);
					cutOff = calendar.get(Calendar.YEAR) + "_" + (calendar.get(Calendar.MONTH)+1);
				}
				break;
			}
		}
		if ( StringUtils.isEmpty(cutOff) ){
			cutOff = resultMap.get("thisYear") + "_" + resultMap.get("thisMonth");
		}
		// jhlee Add 10.25 --[E]
	}
	
	String includeURL = null;
	if ( "Overall".equalsIgnoreCase(mode) )
	{
		includeURL = "decProjectKeyQtyOverallDialog.jsp";
	}
	else if ( "Summary".equalsIgnoreCase(mode) )
	{
		includeURL = "decProjectKeyQtySummaryDialog.jsp";
	}
	else if ( "Trend".equalsIgnoreCase(mode) )
	{
		includeURL = "decProjectKeyQtyTrendDialog.jsp";
	}
	else
	{
%>
	<script>
		alert("There is no proper page.");
	</script>
<%		
	}
%>

<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language")%></xss:encodeForHTMLAttribute>' />

<table class="title" id="reportHeader" style="position: sticky; top: 0; background: white;">
	<tr>
		<td width="25%">
			<b>Project : </b><%=siteName %><br/>
			<c:if test="<%=!isProject %>">
				<b>Unit : </b><%=unitCode %><br/>
			</c:if>
			<span id="cutOffSpan"></span>
		</td>
		<td style="text-align: center; font-weight: bolder; font-size: 1.3em">
			TOTAL SUMMARY<br/>
			<emxUtil:i18nScript localize="i18nId"><%=pageHeading %></emxUtil:i18nScript> - 
			<c:choose>
				<c:when test="<%=isProject %>">Project : <%=projectCode %></c:when>
				<c:otherwise>Unit <%=unitCode %></c:otherwise>
			</c:choose>
			
		</td>
		<td width="20%" style="text-align: center;"><img width="250" src="../programcentral/images/daewooenc.png"></img></td>
	</tr>
</table>

<jsp:include page="<%=includeURL %>" flush="true"> 
	<jsp:param name="projectId" value="<%=projectId %>" /> 
	<jsp:param name="unitId" value="<%=unitId %>" />
	<jsp:param name="projectCode" value="<%=projectCode %>" />
	<jsp:param name="unitCode" value="<%=unitCode %>" />
	<jsp:param name="cutOff" value="<%=cutOff %>" />
	<jsp:param name="isProject" value="<%=isProject %>" />
</jsp:include>

<%
} catch(FrameworkException e) {
	// mqlCommand error
	throw e;
} catch(MatrixException e) {
	// invoke error
	throw e;
} 
%>