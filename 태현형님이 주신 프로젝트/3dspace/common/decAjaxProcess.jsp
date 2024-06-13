<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="matrix.util.StringList"%>
<%@page import="com.matrixone.apps.domain.util.FrameworkUtil"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="matrix.db.JPO"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>
<%@page import="java.util.Locale"%>
<%@page import="com.matrixone.servlet.Framework"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="matrix.db.Context"%>
<%@page import="com.dec.webservice.call.decWebserviceUtil"%>
<%@page import="java.time.temporal.ChronoUnit"%>
<%@page import="java.time.LocalDate"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>

<%!
public ChronoUnit replace2ChronoUnit(String unitExpr) throws Exception{
	ChronoUnit unit = null;
	if ( "day".equalsIgnoreCase(unitExpr) ) { unit = ChronoUnit.DAYS; }
	else if ( "week".equalsIgnoreCase(unitExpr) ) { unit = ChronoUnit.WEEKS; }
	else if ( "month".equalsIgnoreCase(unitExpr) ) { unit = ChronoUnit.MONTHS; }
	else if ( "year".equalsIgnoreCase(unitExpr) ) { unit = ChronoUnit.YEARS; }
	return unit;	
}

public Map getDateMap(Context context, String unit, String dateExpr, LocalDate localDate, String amount, Locale locale) throws Exception{
	Map dateMap = null;
	if ( "today".equalsIgnoreCase(unit) )
	{
		dateMap = DecDateUtil.getTodayMap(context, locale);
	}
	else
	{
		ChronoUnit chronoUnit = replace2ChronoUnit(unit);
		long lAmount = Long.parseLong( StringUtils.isEmpty(amount) ? "0" : amount );
		if ( localDate != null )
		{
			dateMap = DecDateUtil.getCalculatedDateMap(context, localDate, chronoUnit, lAmount, locale);
		}
		else
		{
			dateMap = DecDateUtil.getCalculatedDateMap(context, dateExpr, chronoUnit, lAmount, locale);
		}
	}
	return dateMap;
}
%>

<%
try {
	Context context = Framework.getContext(session);
	Locale locale = request.getLocale();
	String mode = request.getParameter("mode");
	Map<String, Object> responseMap = new HashMap<String, Object>();
	String responseStr = null;
	
	if ( "getFromToDate".equalsIgnoreCase(mode) )
	{
		LocalDate today = LocalDate.now();
		
		String fromDate = request.getParameter("fromDate");
		String fromUnitExpr = request.getParameter("fromUnitExpr");
		String fromAmount = request.getParameter("fromAmount");
		String toDate = request.getParameter("toDate");
		String toUnitExpr = request.getParameter("toUnitExpr");
		String toAmount = request.getParameter("toAmount");
		
		Map fromDateMap = getDateMap(context, fromUnitExpr, toDate, null, fromAmount, locale);
		LocalDate fromLocalDate = (LocalDate) fromDateMap.get("localDate");
		
		Map toDateMap = getDateMap(context, toUnitExpr, fromDate, fromLocalDate, toAmount, locale);
		
		// Unable to make field private final int java.time.LocalDate.year accessible 우회 처리
		fromDateMap.remove("localDate");
		toDateMap.remove("localDate");
		
		responseMap.put("from", fromDateMap);
		responseMap.put("to", toDateMap);
		
	}
	else if ( "getDistinctPartCodeAndDescList".equals(mode) )
	{
		Map programMap = new HashMap();
		programMap.put("objectId", request.getParameter("objectId"));
		programMap.put("DCPLN_CD", request.getParameter("DCPLN_CD"));
		programMap.put("PART_CD", request.getParameter("PART_CD"));
		programMap.put("PART_SHORTDESC", request.getParameter("PART_SHORTDESC"));
		
		MapList partList = JPO.invoke(context, "decMaterial", null, "getDistinctPartCodeAndDescList", JPO.packArgs(programMap), MapList.class);
		
		responseMap.put("partList", partList);
	}
	else if ( "getBMTrackingByPartCodeDesc".equals(mode) )
	{
		String partCodeDescExpr = request.getParameter("partCodeDescExpr");
		StringList partCodeDescExprList = FrameworkUtil.splitString(partCodeDescExpr, "|");
		StringList partCodeSplit = null;
		List<Map> partCodeDescList = new ArrayList<Map>();
		Map partCodeDescMap = null;
		
		for ( String partCodeDescTemp : partCodeDescExprList )
		{
			partCodeSplit = FrameworkUtil.splitString(partCodeDescTemp, "@@@");
			
			if ( partCodeSplit.size() >= 2 )
			{
				partCodeDescMap = new HashMap();
				partCodeDescMap.put("partCode", partCodeSplit.get(0));
				partCodeDescMap.put("partDesc", partCodeSplit.get(1));

				partCodeDescList.add(partCodeDescMap);
			}
		}
		
		Map programMap = new HashMap();
		programMap.put("objectId", request.getParameter("objectId"));
		programMap.put("partCodeDescList", partCodeDescList);
		
		Map bmTrackingSummary = JPO.invoke(context, "decMaterial", null, "getBMTrackingByPartCodeDesc", JPO.packArgs(programMap), Map.class);
		
		responseMap.put("summary", bmTrackingSummary);
	}
	
	PrintWriter out2 = response.getWriter();
	
	String json = new com.google.gson.Gson().toJson(responseMap);
// Refactored by hslee on 2023.07.11 --- [s]	
	out2.flush();
	out2.write(json);
	out2.flush();
	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>