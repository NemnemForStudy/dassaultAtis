
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>

<%@include file = "emxNavigatorTopErrorInclude.inc"%>

<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "emxUIConstantsInclude.inc"%>
<%@include file = "emxCompCommonUtilAppInclude.inc"%>

<%@page import="java.time.DayOfWeek"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="java.time.temporal.TemporalAdjusters"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.text.NumberFormat"%>

<%@ page import="org.apache.ibatis.session.SqlSession"%>
<%@ page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>

<%@include file = "../emxUICommonHeaderEndInclude.inc" %>

<%!
	/**
	 * 파라미터로 전달 된 날짜의 1일의 주차 계산 
	 * 1일이 목요일(5) 보다 클 경우 첫째 주 이므로 0을 반환
	 * 1일이 월 ~ 목 이외의 날짜 일 경우 -1 을 반환.
	 * 1일이 목요일(5) 보다 작으면 첫째 주가 아니므로 1을 반환
	 * @param year
	 * @param month
	 * @param day
	 * @return
	 */
	public int subWeekNumberIsFirstDayAfterThursday(int year, int month, int day)  {
	  Calendar calendar = Calendar.getInstance(Locale.KOREA);
	  calendar.set(year, month - 1, day);
	  calendar.set(Calendar.DAY_OF_MONTH, 1);
	  calendar.setFirstDayOfWeek(Calendar.MONDAY);
	
	  int weekOfDay = calendar.get(Calendar.DAY_OF_WEEK);
	
	  if ((weekOfDay >= Calendar.MONDAY) && (weekOfDay <= Calendar.THURSDAY)) {
	    return 0;
	  } else if (day == 1 && (weekOfDay < Calendar.MONDAY || weekOfDay > Calendar.TUESDAY))  {
	    return -1;
	  } else {
	    return 1;
	  }
	}
	
	/**
	 * 해당 날짜가 마지막 주에 해당하고 마지막주의 마지막날짜가 목요일보다 작으면 
	 * 다음달로 넘겨야 한다 +1
	 * 목요일보다 크거나 같을 경우 이번달로 결정한다 +0
	 * @param year
	 * @param month
	 * @param day
	 * @return
	 */
	public int addMonthIsLastDayBeforeThursday(int year, int month, int day) {
	  Calendar calendar = Calendar.getInstance(Locale.KOREA);
	  calendar.setFirstDayOfWeek(Calendar.MONDAY);
	  calendar.set(year, month - 1, day);
	
	  int currentWeekNumber = calendar.get(Calendar.WEEK_OF_MONTH);
	  int maximumWeekNumber = calendar.getActualMaximum(Calendar.WEEK_OF_MONTH);
	
	  if (currentWeekNumber == maximumWeekNumber) {
	    calendar.set(year, month - 1, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
	    int maximumDayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
	
	    if (maximumDayOfWeek < Calendar.THURSDAY && maximumDayOfWeek > Calendar.SUNDAY) {
	      return 1;
	    } else {
	      return 0;
	    }
	  } else {
	    return 0;
	  }
	}
	
	/**
	 * 해당 날짜의 주차를 반환
	 * @param year
	 * @param month
	 * @param day
	 * @return
	 */
	public int getCurrentWeekOfMonth(int year, int month, int day)  {
	  int subtractFirstWeekNumber = subWeekNumberIsFirstDayAfterThursday(year, month, day);
	  int subtractLastWeekNumber = addMonthIsLastDayBeforeThursday(year, month, day);
	
	  // 마지막 주차에서 다음 달로 넘어갈 경우 다음달의 1일을 기준으로 정해준다. 
	  // 추가로 다음 달 첫째주는 목요일부터 시작하는 과반수의 일자를 포함하기 때문에 한주를 빼지 않는다.
	  if (subtractLastWeekNumber > 0) {
	    day = 1;
	    subtractFirstWeekNumber = 0;
	  }
	
	  if (subtractFirstWeekNumber < 0)  {
	    Calendar calendar = Calendar.getInstance(Locale.KOREA);
	    calendar.set(year, month - 1, day);
	    calendar.add(Calendar.DATE, -1);
	
	    return getCurrentWeekOfMonth(calendar.get(Calendar.YEAR), (calendar.get(Calendar.MONTH) + 1), calendar.get(Calendar.DATE));
	  }
	
	  Calendar calendar = Calendar.getInstance(Locale.KOREA);
	  calendar.setFirstDayOfWeek(Calendar.MONDAY);
	  calendar.setMinimalDaysInFirstWeek(1);
	  calendar.set(year, month - (1 - subtractLastWeekNumber), day);
	
	  int dayOfWeekForFirstDayOfMonth = calendar.get(Calendar.WEEK_OF_MONTH) - subtractFirstWeekNumber;
	
	  return dayOfWeekForFirstDayOfMonth;
	}
%>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
	String sLang = request.getHeader("Accept-Language");
	String sObjectId = DecConstants.EMPTY_STRING;
	String sObjectName = DecConstants.EMPTY_STRING;
	String sProjectCode = emxGetParameter(request,"projectCode");
	StringList slProjectParam = new StringList();
	slProjectParam.add(DecConstants.SELECT_ID);
	slProjectParam.add(DecConstants.SELECT_NAME);
	
	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, "*", DecConstants.SELECT_NAME + "=='" + sProjectCode + "'", slProjectParam);
	MapList mlPhase = new MapList();
	Map mProject = null;
	Map mPhase = null;
	Map mArgs = new HashMap();
	Map paramMap = new HashMap();
	
	String noAccidentHour = "No Data";
	String cutOffDate = "No Data";
	String death = "No Data";
	String death_sum = "No Data";
	String injury = "No Data";
	String injury_sum = "No Data";
	String nearMiss = "No Data";
	String nearMiss_sum = "No Data";
	String uauc = "No Data";
	String uauc_sum = "No Data";
	String peopleInput = "No Data";
	
	//숫자 포맷
	NumberFormat numf = NumberFormat.getInstance(Locale.getDefault());
	
	if(mlProject != null && !mlProject.isEmpty()){
		mProject = (Map)mlProject.get(0);
		sObjectId = (String)mProject.get(DecConstants.SELECT_ID);
		DomainObject doPS = DomainObject.newInstance(context, sObjectId);
		sObjectName = doPS.getInfo(context,"name");
		
		// 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
	    LocalDate now = LocalDate.now();

	    // 연도, 월(문자열, 숫자), 일, 일(year 기준), 요일(문자열, 숫자)
	    int year = now.getYear();
	    int monthValue = now.getMonthValue();
	    int dayOfMonth = now.getDayOfMonth();
	    
	    Calendar calendar = Calendar.getInstance(Locale.KOREA);

	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    // 포맷 적용
	    String today = now.format(formatter);
	    
		int month = calendar.get(Calendar.MONTH) + 1;
		int weekNo = getCurrentWeekOfMonth(year,monthValue,dayOfMonth);
		
		try(SqlSession sqlSession = decSQLSessionFactory.getSession())
	    {
	    	DomainObject object = new DomainObject(sObjectId);
	    	String objectName = object.getInfo(context,"name");
	    	
	    	Map selectParamMap = new HashMap();
	    	selectParamMap.put("SITE_CD",objectName); 
			selectParamMap.put("CUT_OFF_YEAR",year); 
			selectParamMap.put("CUT_OFF_MONTH",month); 
			selectParamMap.put("CUT_OFF_WEEK",weekNo); 
			selectParamMap.put("TODAY",today); 
			
			List<Map> resultSum = sqlSession.selectList("Project.selectDashBoardSafetyStaticsSum", selectParamMap);
			List<Map> resultLatest = sqlSession.selectList("Project.selectDashBoardSafetyStaticsLatest", selectParamMap);
			
			if(!resultSum.isEmpty() && resultSum.get(0) != null){
				HashMap hm = (HashMap) resultSum.get(0);
				if(hm.containsKey("INJURY")){
					injury_sum = String.valueOf(String.valueOf(hm.get("INJURY")));
				}	
				if(hm.containsKey("DEATH")){
					death_sum = String.valueOf(hm.get("DEATH"));
				}
				if(hm.containsKey("UA_UC")){
					uauc_sum = String.valueOf(hm.get("UA_UC"));
				}
				if(hm.containsKey("NEAR_MISS")){
					nearMiss_sum = String.valueOf(hm.get("NEAR_MISS"));
				}
				
			}
			if(!resultLatest.isEmpty()){
				HashMap hm = (HashMap) resultLatest.get(0);
				if(hm.containsKey("CUT_OFF_DATE")){
					String date = String.valueOf(hm.get("CUT_OFF_DATE"));
					date = date.substring(0, 4)+"."+date.substring(5, 7)+"."+date.substring(8, 10);
					cutOffDate = String.valueOf(date);
				}	
				if(hm.containsKey("NO_ACCIDENT_HOUR")){
					noAccidentHour = String.valueOf(hm.get("NO_ACCIDENT_HOUR"));
				}	
				if(hm.containsKey("INJURY")){
					injury = String.valueOf(hm.get("INJURY"));
				}	
				if(hm.containsKey("DEATH")){
					death = String.valueOf(hm.get("DEATH"));
				}
				if(hm.containsKey("UA_UC")){
					uauc = String.valueOf(hm.get("UA_UC"));
				}
				if(hm.containsKey("NEAR_MISS")){
					nearMiss = String.valueOf(hm.get("NEAR_MISS"));
				}
				if(hm.containsKey("PEOPLE_INPUT")){
					peopleInput = String.valueOf(hm.get("PEOPLE_INPUT"));
				}	
			}
	    }catch(Exception e){
	    	e.printStackTrace();
			throw e;
	    }
	}
	String tileHeader1 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Label.death", sLanguage);
	String tileHeader2 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Label.injury", sLanguage);	
	String tileHeader3 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Label.nearMiss", sLanguage);
	String tileHeader4 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Label.uaUc", sLanguage);
	String tileHeader5 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Label.peopleInput", sLanguage);
	
	String tileBody1 = String.valueOf(death=="No Data" ? "No Data" : numf.format(Integer.valueOf(death))) + "/" 
			+String.valueOf(death_sum=="No Data" ? "No Data" : numf.format(Integer.valueOf(death_sum)));
	String tileBody2 = String.valueOf(injury=="No Data" ? "No Data" : numf.format(Integer.valueOf(injury))) + "/" 
			+String.valueOf(injury_sum=="No Data" ? "No Data" : numf.format(Integer.valueOf(injury_sum)));
	String tileBody3 = String.valueOf(nearMiss=="No Data" ? "No Data" : numf.format(Integer.valueOf(nearMiss))) + "/" 
			+String.valueOf(nearMiss_sum=="No Data" ? "No Data" : numf.format(Integer.valueOf(nearMiss_sum)));
	String tileBody4 = String.valueOf(uauc=="No Data" ? "No Data" : numf.format(Integer.valueOf(uauc))) + "/" 
			+String.valueOf(uauc_sum=="No Data" ? "No Data" : numf.format(Integer.valueOf(uauc_sum)));
	String tileBody5 = String.valueOf(peopleInput=="No Data" ? "No Data" : numf.format(Integer.valueOf(peopleInput)));
	
	String tileFooter1 = "["+ EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.ThisWeek", sLanguage) +"/"
			+ EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.TotalSummary", sLanguage) +"]";
	String tileFooter2 = "["+ EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.ThisWeek", sLanguage)+"]";
	
	String leftTitle1 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Label.noAccidentHour", sLanguage)  + " : ";
	String leftTitle2 = String.valueOf(noAccidentHour=="No Data" ? "No Data" : numf.format(Integer.valueOf(noAccidentHour))) + " ";
	String leftTitle3 = noAccidentHour!="No Data" ? EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Effort.Hours", sLanguage) : "";
	
	String leftTitle = leftTitle1 + leftTitle2 + leftTitle3;
	
	String rightTitle1 = EnoviaResourceBundle.getProperty(context, "ProgramCentral","emxProgramCentral.Common.cutOffDate", sLanguage) + " : ";
	String rightTitle2 = String.valueOf(cutOffDate);
	
%>
<html>
	<head>
		<style>
			* { 
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			body{
				width: 100%;
				height: 100%;
			}
			table{
			    width: 100%;
				height: 80%;
				font-weight:bold;
				font-size:14px;
				color:#5b5d5e;
			}
			div.header{
				height:10px;
				font-size:13px;
				font-weight:bold;
				display:inline-block;
				width:50%;
			}
			.title{
				width:15%;
				text-align:center;
				height:50px;
				font-size:110%;
			}
			.content{
				background : linear-gradient(to bottom,  rgba(240,249,255,1) 0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%);
				border-radius:10px;
				border-bottom:17px solid rgb(111, 188, 75);
			}
			.divContent{
				text-align: center;
			}
			span{
				line-height: 100%;
				font-size:16px;
			}
			span.footer{
				font-size:12px;
			}
			.titleSpacer{
				width:0.5%;
			}
			.contentSpacer{
				width:0.5%;
			}
			.topControl{
				height:5px;
			}
		</style>
	</head>
	<body>
		<table>
			<tr class="topControl"></tr>
			<tr>
				<div class="header" style="text-align:left;">&emsp;<%=leftTitle1%><%=leftTitle2%><%=leftTitle3%></div>
				<div class="header" style="text-align:right;"><%=rightTitle1%><%=rightTitle2%>&emsp;</div>
			</tr>
			<tr class="topControl"></tr>
			<tr>
				<td class="titleSpacer"></td>
				<td class="title"><%=tileHeader1%></td>
				<td class="titleSpacer"></td>
				<td class="title"><%=tileHeader2%></td>
				<td class="titleSpacer"></td>
				<td class="title"><%=tileHeader3%></td>
				<td class="titleSpacer"></td>
				<td class="title"><%=tileHeader4%></td>
				<td class="titleSpacer"></td>
				<td class="title"><%=tileHeader5%></td>
				<td class="titleSpacer"></td>
			</tr>
			<tr>
				<td class="contentSpacer"></td>
				<td class="content" style="border-bottom:17px solid rgb(204, 9, 47);"><div class="divContent"><span><%=tileBody1%><br></span><span class="footer"><%=tileFooter1%></span></div></td>
				<td class="contentSpacer"></td>
				<td class="content"><div class="divContent"><span><%=tileBody2%><br></span><span class="footer"><%=tileFooter1%></span></div></td>
				<td class="contentSpacer"></td>
				<td class="content"><div class="divContent"><span><%=tileBody3%><br></span><span class="footer"><%=tileFooter1%></span></div></td>
				<td class="contentSpacer"></td>
				<td class="content"><div class="divContent"><span><%=tileBody4%><br></span><span class="footer"><%=tileFooter1%></span></td>
				<td class="contentSpacer"></td>
				<td class="content"><div class="divContent"><span><%=tileBody5%><br></span><span class="footer"><%=tileFooter2%></span></td>
				<td class="contentSpacer"></td>
			</tr>
			<tr id="bottomControl"></tr>
		</table>
	</body>
</html>