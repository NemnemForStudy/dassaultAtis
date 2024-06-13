<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Map"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.math.BigDecimal"%>
<%
  String objectName = (String) request.getParameter("objectName");
  String today = (String) request.getParameter("today");
  String fromDate = (String) request.getParameter("fromDate");//이 jsp 다시 활성화 한다면 fromDate에서 7일 더 빠른 값 입력
  String toDate = (String) request.getParameter("toDate");
  String div = (String) request.getParameter("div");
  String dateType = (String) request.getParameter("dateType");

  /*캘린더 주석 해제 하면 같이 해제
  SimpleDateFormat sdfYMDHms = new SimpleDateFormat("yyyyMMdd");
  SimpleDateFormat sdfYMD = new SimpleDateFormat("yyyy-MM-dd");
  
  fromDate = fromDate.substring(0, 4) + "-" + fromDate.substring(4, 6) + "-" + fromDate.substring(6, 8);
  
  //String을 날짜 연산을 위해 Date 객체로 변경
  Date date = sdfYMD.parse(fromDate); 

  //날짜 연산을 위한 Calendar객체 생성 후 date 대입
  Calendar cal = Calendar.getInstance();
  cal.setTime(date);
  cal.add(Calendar.DATE,-7);
  fromDate = sdfYMDHms.format(cal.getTime());//From 일자 보다 1주일 뒤에서 데이터 뽑기
  */
  
  HashMap map = new HashMap();	
  PrintWriter out2 = response.getWriter();
  
  List<BigDecimal> comparisonLastWeekPlan = new ArrayList();
  List<BigDecimal> comparisonLastWeekActual = new ArrayList();
  List<BigDecimal> normalPlan = new ArrayList();
  List<BigDecimal> normalActual = new ArrayList();
  List<String> cutOffDate = new ArrayList();
  List<Integer> thisWeekList = new ArrayList();
  
  List<List> sendList = new ArrayList();
  
  int thisWeek = 100;
  
  try(SqlSession sqlSession = decSQLSessionFactory.getSession())
  {
  	Map selectParamMap = new HashMap();
  	selectParamMap.put("SITE_CD",objectName);
	selectParamMap.put("TODAY",today);
	
	// Progress 데이터 일자 불러오기 [S]
	if(dateType != null && dateType.equalsIgnoreCase("Monthly")){
		if(fromDate != null && fromDate.length() > 0){
			fromDate = fromDate.substring(0, 6) + "01";
		}
		if(toDate != null && toDate.length() > 0){
			toDate = toDate.substring(0, 6) + "31";
		}
	}
	
	if(fromDate != null && toDate != null){
		if(fromDate.length() == 0 && toDate.length() == 0){
			List<Map> resultMaxMinDate = null;
			if(dateType.equalsIgnoreCase("Monthly")){
				resultMaxMinDate = sqlSession.selectList("Project.selectDashBoardProgressChartMaxMinDateMonthly", selectParamMap);// Progress MAX값 MIN값 fromDate,toDate에 삽입
			} else{
				resultMaxMinDate = sqlSession.selectList("Project.selectDashBoardProgressChartMaxMinDate", selectParamMap);// Progress MAX값 MIN값 fromDate,toDate에 삽입
			}
			
			for(int i=0;i<resultMaxMinDate.size();i++){
				HashMap resultMaxMinDateMap = (HashMap) resultMaxMinDate.get(i);
				if(resultMaxMinDateMap.get("CUT_OFF_DATE") != null){
					if(i==0){
						toDate = String.valueOf(resultMaxMinDateMap.get("CUT_OFF_DATE"));
					} else{
						fromDate = String.valueOf(resultMaxMinDateMap.get("CUT_OFF_DATE"));
					}
				}
			}
		} else if(fromDate.length() > 0 && toDate.length() == 0){
			toDate = "29991231";
		} else if(toDate.length() > 0 && fromDate.length() == 0){
			fromDate  = "19990101";
		}
	}
	System.out.println("fromDate : " + fromDate);
	System.out.println("toDate : " + toDate);
	// Progress 데이터 일자 불러오기 [E]	
			
	selectParamMap.put("FROMDATE",fromDate);
	selectParamMap.put("TODATE",toDate);
	
	List<Map> resultComparisonLastWeek = null;
	List<Map> resultNormal = null;
	List<Map> resultFindThisWeek = null;
	
	if(dateType != null){
		if(dateType.equalsIgnoreCase("Monthly")){
			resultComparisonLastWeek = sqlSession.selectList("Project.selectDashBoardProgressChartComparisonLastWeekMonthly", selectParamMap);
			resultNormal = sqlSession.selectList("Project.selectDashBoardProgressChartNormalMonthly", selectParamMap);
		} else{
			resultComparisonLastWeek = sqlSession.selectList("Project.selectDashBoardProgressChartComparisonLastWeek", selectParamMap);
			resultNormal = sqlSession.selectList("Project.selectDashBoardProgressChartNormal", selectParamMap);
			resultFindThisWeek = sqlSession.selectList("Project.selectDashBoardProgressChartFindThisWeek", selectParamMap);
		}
	}
	
	for(int i=0;i<resultComparisonLastWeek.size();i++){
		HashMap comparisonLastWeek = (HashMap) resultComparisonLastWeek.get(i);
		
		BigDecimal ENG_PLAN = new BigDecimal(String.valueOf(comparisonLastWeek.get("ENG_PLAN")));
		BigDecimal PROC_PLAN = new BigDecimal(String.valueOf(comparisonLastWeek.get("PROC_PLAN")));
		BigDecimal CON_PLAN = new BigDecimal(String.valueOf(comparisonLastWeek.get("CON_PLAN")));
		BigDecimal COMM_PLAN = new BigDecimal(String.valueOf(comparisonLastWeek.get("COMM_PLAN")));
		BigDecimal OVERALL_PLAN = new BigDecimal(String.valueOf(comparisonLastWeek.get("OVERALL_PLAN")));
		
		BigDecimal ENG_ACTUAL = new BigDecimal(String.valueOf(comparisonLastWeek.get("ENG_ACTUAL")));
		BigDecimal PROC_ACTUAL = new BigDecimal(String.valueOf(comparisonLastWeek.get("PROC_ACTUAL")));
		BigDecimal CON_ACTUAL = new BigDecimal(String.valueOf(comparisonLastWeek.get("CON_ACTUAL")));
		BigDecimal COMM_ACTUAL = new BigDecimal(String.valueOf(comparisonLastWeek.get("COMM_ACTUAL")));
		BigDecimal OVERALL_ACTUAL = new BigDecimal(String.valueOf(comparisonLastWeek.get("OVERALL_ACTUAL")));
		
		BigDecimal WP = new BigDecimal(0);
		BigDecimal WA = new BigDecimal(0);
		
		if(div != null){
			if(div.equalsIgnoreCase("eng")){
				WP = ENG_PLAN;
				WA = ENG_ACTUAL;
			} else if(div.equalsIgnoreCase("proc")){
				WP = PROC_PLAN;
				WA = PROC_ACTUAL;
			} else if(div.equalsIgnoreCase("con")){
				WP = CON_PLAN;
				WA = CON_ACTUAL;
			} else if(div.equalsIgnoreCase("comm")){
				WP = COMM_PLAN;
				WA = COMM_ACTUAL;
			} else{
				WP = OVERALL_PLAN;
				WA = OVERALL_ACTUAL;
			}
		}

		comparisonLastWeekPlan.add(WP);
		comparisonLastWeekActual.add(WA);
		cutOffDate.add(String.valueOf(comparisonLastWeek.get("CUT_OFF_DATE")));
	}
	
	for(int i=0;i<resultNormal.size();i++){
		HashMap normal = (HashMap) resultNormal.get(i);

		BigDecimal ENG_PLAN_NOR = new BigDecimal(String.valueOf(normal.get("ENG_PLAN")));
		BigDecimal PROC_PLAN_NOR = new BigDecimal(String.valueOf(normal.get("PROC_PLAN")));
		BigDecimal CON_PLAN_NOR = new BigDecimal(String.valueOf(normal.get("CON_PLAN")));
		BigDecimal COMM_PLAN_NOR = new BigDecimal(String.valueOf(normal.get("COMM_PLAN")));
		BigDecimal OVERALL_PLAN_NOR = new BigDecimal(String.valueOf(normal.get("OVERALL_PLAN")));
		
		BigDecimal ENG_ACTUAL_NOR = new BigDecimal(String.valueOf(normal.get("ENG_ACTUAL")));
		BigDecimal PROC_ACTUAL_NOR = new BigDecimal(String.valueOf(normal.get("PROC_ACTUAL")));
		BigDecimal CON_ACTUAL_NOR = new BigDecimal(String.valueOf(normal.get("CON_ACTUAL")));
		BigDecimal COMM_ACTUAL_NOR = new BigDecimal(String.valueOf(normal.get("COMM_ACTUAL")));
		BigDecimal OVERALL_ACTUAL_NOR = new BigDecimal(String.valueOf(normal.get("OVERALL_ACTUAL")));
		
		BigDecimal CP = new BigDecimal(0);
		BigDecimal CA = new BigDecimal(0);
		
		if(div != null){
			if(div.equalsIgnoreCase("eng")){
				CP = ENG_PLAN_NOR;
				CA = ENG_ACTUAL_NOR;
			} else if(div.equalsIgnoreCase("proc")){
				CP = PROC_PLAN_NOR;
				CA = PROC_ACTUAL_NOR;
			} else if(div.equalsIgnoreCase("con")){
				CP = CON_PLAN_NOR;
				CA = CON_ACTUAL_NOR;
			} else if(div.equalsIgnoreCase("comm")){
				CP = COMM_PLAN_NOR;
				CA = COMM_ACTUAL_NOR;
			} else{
				CP = OVERALL_PLAN_NOR;
				CA = OVERALL_ACTUAL_NOR;
			}
		}
		
		normalPlan.add(CP);
		normalActual.add(CA);
	}
	
	if(resultFindThisWeek == null){
		thisWeekList.add(100);
	} else{
		for(int i=0;i<resultFindThisWeek.size();i++){
			HashMap thisWeekMap = (HashMap) resultFindThisWeek.get(i);
			String thisWeekYN = String.valueOf(thisWeekMap.get("THISWEEK"));
			if(thisWeekYN != null && thisWeekYN.equalsIgnoreCase("Y")){
				thisWeek = Integer.valueOf(String.valueOf(thisWeekMap.get("NUM")));
				thisWeekList.add(thisWeek);
			}
		}
		
		if(thisWeekList != null && thisWeekList.size()<1){
			thisWeekList.add(100);
		}
	}
	
	System.out.println(comparisonLastWeekPlan);
	System.out.println(comparisonLastWeekActual);
	System.out.println(normalPlan);
	System.out.println(normalActual);
	System.out.println(cutOffDate);

	sendList.add(comparisonLastWeekPlan);
	sendList.add(comparisonLastWeekActual);
	sendList.add(normalPlan);
	sendList.add(normalActual);
	sendList.add(cutOffDate);
	sendList.add(thisWeekList);
	System.out.println(sendList);
  }catch(Exception e){
  	e.printStackTrace();
		throw e;
  }
  
  Map jsonMap = new HashMap();
  jsonMap.put("data", sendList);
// out.println(sendList);

//   String json = new com.google.gson.Gson().toJson(sendList);
String json = new com.google.gson.Gson().toJson(jsonMap);
  out2.flush();
  out2.write(json);
  out2.flush();
//   System.out.println("json : "+json);
%>
