
<%@page import="java.time.LocalDate"%>
<%@page import="java.util.List"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@ include file="../emxUICommonAppInclude.inc"%>

<%
	String sProjectName = emxGetParameter(request, "projectName");
	String sUnitOID = emxGetParameter(request, "UnitOID");
	String sConstructionItem = emxGetParameter(request, "ConstructionItem");
	String sDiscipline = emxGetParameter(request, "Discipline");
	String sTarget = emxGetParameter(request, "Target");
	String sActual = emxGetParameter(request, "Actual");
	String sTotal = emxGetParameter(request, "Total");
	String sDate = emxGetParameter(request, "Date");
	String sWeek = emxGetParameter(request, "Week");
	String sCutOffDate = emxGetParameter(request, "cutOffDate");
	sDate = DecDateUtil.changeDateFormat(sDate, DecDateUtil.IF_FORMAT);
	sCutOffDate = DecDateUtil.changeDateFormat(sCutOffDate, DecDateUtil.IF_FORMAT);
	String sToday = DecDateUtil.changeDateFormat(new Date(), DecDateUtil.IF_FORMAT);
	int insertRow = 0;
	List lImportData = new ArrayList();
	try(SqlSession sqlSession = decSQLSessionFactory.getSession()){
		Map mParam = new HashMap();
		mParam.put("SITE_CD", sProjectName);
		mParam.put("UNIT_ID", sUnitOID);
		mParam.put("DISCIPLINE", sDiscipline);
		mParam.put("CONSTRUCTION_ITEM", sConstructionItem);
		mParam.put("TARGET", sTarget);
		mParam.put("ACTUAL", sActual);
		mParam.put("TOTAL", sTotal);
		mParam.put("KPIDATE", sDate);
		mParam.put("KPIWEEK", sWeek);
		mParam.put("CUTOFFDATE", sCutOffDate);
		mParam.put("INPUTDATE", sToday);
		lImportData.add(mParam);
		sqlSession.update("Project.mergeImportConstructionKPI", lImportData);
		sqlSession.commit();
	}catch (Exception e) {
		ContextUtil.abortTransaction(context);
		e.printStackTrace();
		%>
		<script>
		alert("<%=e.getMessage()%>");
		</script>
		<%
	}
		%>
<script language="javascript" src="scripts/emxUICore.js"></script>
		<script>
		getTopWindow().refreshTablePage();
		</script>
		<%
	
%>