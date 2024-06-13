
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="java.math.BigDecimal"%>

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
<%@page import="java.text.NumberFormat"%>

<%@ page import="org.apache.ibatis.session.SqlSession"%>
<%@ page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>

<%@include file = "../emxUICommonHeaderEndInclude.inc" %>

<%!
	public String ComparisonOpration(String inputNum1,String inputNum2){
		String returnValue = DecConstants.EMPTY_STRING;
	
		try {
			
			BigDecimal BigDecimal1 = new BigDecimal(inputNum1);
			BigDecimal BigDecimal2 = new BigDecimal(inputNum2);
			
			returnValue = String.valueOf(BigDecimal1.subtract(BigDecimal2));
		} catch (NumberFormatException e) {
			returnValue = "No Data";
		}
		
		return returnValue;
	}

	public String ComparisonPreviousThisWeek(String inputNum1,String inputNum2){
		String returnValue = DecConstants.EMPTY_STRING;
	
		if("No Data".equalsIgnoreCase(inputNum1)){
			returnValue = "No Data on This Week";
		} else if("No Data".equalsIgnoreCase(inputNum2)){
			returnValue = "No Data on Previous Week";
		}else{
			try {
				BigDecimal BigDecimal1 = new BigDecimal(inputNum1);
				BigDecimal BigDecimal2 = new BigDecimal(inputNum2);
				
				returnValue = String.valueOf(BigDecimal1.subtract(BigDecimal2));
			} catch (NumberFormatException e) {
				returnValue = "No Data";
			}
		}
		return returnValue;
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
	
	//각 항목 이번주 계획,실적
	String EngPlanThisWeek = "No Data";
	String EngActualThisWeek = "No Data";
	String ProcPlanThisWeek = "No Data";
	String ProcActualThisWeek = "No Data";
	String ConPlanThisWeek = "No Data";
	String ConActualThisWeek = "No Data";
	String CommPlanThisWeek = "No Data";
	String CommActualThisWeek = "No Data";
	String OverallPlanThisWeek = "No Data";
	String OverallActualThisWeek = "No Data";
	
	//각 저번주 실적 항목 
	String EngActualPreviousWeek = "No Data";
	String ProcActualPreviousWeek = "No Data";
	String ConActualPreviousWeek = "No Data";
	String CommActualPreviousWeek = "No Data";
	String OverallActualPreviousWeek = "No Data";
	
	String cutOffDate = "No Data";
	
	//각 이번주 실적-계획 차이
	String diffEngActualPlan = "No Data";
	String diffProcActualPlan = "No Data";
	String diffConActualPlan = "No Data";
	String diffCommActualPlan = "No Data";
	
	//각 실적(이번주-저번주) 차이
	String diffEngPreviousThisWeek = "No Data";
	String diffProcPreviousThisWeek = "No Data";
	String diffConPreviousThisWeek = "No Data";
	String diffCommPreviousThisWeek = "No Data";
	
	//Overall 항목
	String overallPlan = "No Data";
	String overallActual = "No Data";
	String overallDiff = "No Data";
	String overallPreviousComparison = "No Data";
	
	String EPCType = DecConstants.EMPTY_STRING;
	
	if(mlProject != null && !mlProject.isEmpty()){
		mProject = (Map)mlProject.get(0);
		sObjectId = (String)mProject.get(DecConstants.SELECT_ID);
		DomainObject doPS = DomainObject.newInstance(context, sObjectId);
		sObjectName = doPS.getInfo(context,"name");
		
		// 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
	    LocalDate now = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
	    // 포맷 적용
	    String today = now.format(formatter);
		System.out.println("today : " + today);
		try(SqlSession sqlSession = decSQLSessionFactory.getSession())
	    {
	    	DomainObject object = new DomainObject(sObjectId);
	    	String objectName = object.getInfo(context,"name");
	    	EPCType = object.getAttributeValue(context, "decEPCType");
	    	
	    	Map selectParamMap = new HashMap();
	    	selectParamMap.put("SITE_CD",objectName);
			selectParamMap.put("TODAY",today); 
			
			List<Map> resultThisWeek = sqlSession.selectList("Project.selectDashBoardProgressTableThisWeek", selectParamMap);
			List<Map> resultPreviousWeek = sqlSession.selectList("Project.selectDashBoardProgressTablePreviousWeek", selectParamMap);
			
			if(!resultThisWeek.isEmpty()){
				HashMap hm = (HashMap) resultThisWeek.get(0);
				if(hm.containsKey("ENG_PLAN")){
					EngPlanThisWeek = String.valueOf(String.valueOf(hm.get("ENG_PLAN")));
				}	
				if(hm.containsKey("ENG_ACTUAL")){
					EngActualThisWeek = String.valueOf(hm.get("ENG_ACTUAL"));
				}
				if(hm.containsKey("PROC_PLAN")){
					ProcPlanThisWeek = String.valueOf(hm.get("PROC_PLAN"));
				}
				if(hm.containsKey("PROC_ACTUAL")){
					ProcActualThisWeek = String.valueOf(hm.get("PROC_ACTUAL"));
				}
				if(hm.containsKey("CON_PLAN")){
					ConPlanThisWeek = String.valueOf(String.valueOf(hm.get("CON_PLAN")));
				}	
				if(hm.containsKey("CON_ACTUAL")){
					ConActualThisWeek = String.valueOf(hm.get("CON_ACTUAL"));
				}
				if(hm.containsKey("COMM_PLAN")){
					CommPlanThisWeek = String.valueOf(hm.get("COMM_PLAN"));
				}
				if(hm.containsKey("COMM_ACTUAL")){
					CommActualThisWeek = String.valueOf(hm.get("COMM_ACTUAL"));
				}
				if(hm.containsKey("OVERALL_PLAN")){
					OverallPlanThisWeek = String.valueOf(hm.get("OVERALL_PLAN"));
				}
				if(hm.containsKey("OVERALL_ACTUAL")){
					OverallActualThisWeek = String.valueOf(hm.get("OVERALL_ACTUAL"));
				}
				if(hm.containsKey("CUT_OFF_DATE")){
					String date = String.valueOf(hm.get("CUT_OFF_DATE"));
					date = date.substring(0, 4)+"."+date.substring(5, 7)+"."+date.substring(8, 10);
					cutOffDate = String.valueOf(date);
				}	
			}
			if(!resultPreviousWeek.isEmpty()){
				HashMap hm = (HashMap) resultPreviousWeek.get(0);
				if(hm.containsKey("ENG_ACTUAL")){
					EngActualPreviousWeek = String.valueOf(hm.get("ENG_ACTUAL"));
				}	
				if(hm.containsKey("PROC_ACTUAL")){
					ProcActualPreviousWeek = String.valueOf(hm.get("PROC_ACTUAL"));
				}
				if(hm.containsKey("CON_ACTUAL")){
					ConActualPreviousWeek = String.valueOf(hm.get("CON_ACTUAL"));
				}
				if(hm.containsKey("COMM_ACTUAL")){
					CommActualPreviousWeek = String.valueOf(hm.get("COMM_ACTUAL"));
				}
				if(hm.containsKey("OVERALL_ACTUAL")){
					OverallActualPreviousWeek = String.valueOf(hm.get("OVERALL_ACTUAL"));
				}
			}
			
			if(EPCType.contains("E")){
				diffEngActualPlan = ComparisonOpration(EngActualThisWeek,EngPlanThisWeek);
				diffEngPreviousThisWeek = ComparisonPreviousThisWeek(EngActualThisWeek,EngActualPreviousWeek);
			} else{
				EngPlanThisWeek = "No Data";
				EngActualThisWeek = "No Data";
			}
			if(EPCType.contains("P")){
				diffProcActualPlan = ComparisonOpration(ProcActualThisWeek,ProcPlanThisWeek);
				diffProcPreviousThisWeek = ComparisonPreviousThisWeek(ProcActualThisWeek,ProcActualPreviousWeek);
			} else{
				ProcPlanThisWeek = "No Data"; 
				ProcActualThisWeek = "No Data"; 
			}
			if(EPCType.contains("C")){
				diffConActualPlan = ComparisonOpration(ConActualThisWeek,ConPlanThisWeek);
				diffCommActualPlan = ComparisonOpration(CommActualThisWeek,CommPlanThisWeek);
				diffConPreviousThisWeek = ComparisonPreviousThisWeek(ConActualThisWeek,ConActualPreviousWeek);
				diffCommPreviousThisWeek = ComparisonPreviousThisWeek(CommActualThisWeek,CommActualPreviousWeek);
			} else{
				ConPlanThisWeek = "No Data"; 
				ConActualThisWeek = "No Data"; 
				CommPlanThisWeek = "No Data"; 
				CommActualThisWeek = "No Data"; 
			}
			overallPlan = OverallPlanThisWeek;
			overallActual = OverallActualThisWeek;
			overallDiff = ComparisonOpration(OverallActualThisWeek,OverallPlanThisWeek);
			overallPreviousComparison = ComparisonPreviousThisWeek(OverallActualThisWeek,OverallActualPreviousWeek);
			
	    }catch(Exception e){
	    	e.printStackTrace();
			throw e;
	    }
	}
	
	String divLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.division", context.getSession().getLanguage());;
	String blProcessLabel =EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.BLProcessRate", context.getSession().getLanguage());
	String planLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.ProgressPlan", context.getSession().getLanguage());
	String actualLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.ProgressActual", context.getSession().getLanguage());
	String VarianceLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Financial.Variance", context.getSession().getLanguage());
	String comparedPreviousWeekLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.ComparedPreviousWeek", context.getSession().getLanguage());
%>
<script>
</script>
<link rel="stylesheet" href="../webapps/UIKIT/UIKIT.css" type="text/css" />
<body style="width: 100%;height: 100%;">
	<table border="1"> <!--style="position:relative;left:50%;top:50%;transform:translate(-50%, -50%);"  -->
   		<tbody style="height: 95vh;">
   			<tr>
   				<td style="text-align:right;font-weight:bold;color:#5b5d5e;" colspan="5">
   					<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Common.cutOffDate</emxUtil:i18nScript> : <%=cutOffDate%>&nbsp&nbsp&nbsp
   				</td>
   			</tr>
   			<tr>
   				<td class="label" style="text-align:center;width:18%;" rowspan="2">
      				<%=divLabel %>
      			</td>
      			<td class="label" style="text-align:center;width:28%;" colspan="3">
      				<%=blProcessLabel %>
      			</td>
      			<td class="label" style="text-align:center;width:18%;" rowspan="2">
      				<%=comparedPreviousWeekLabel %>
      			</td>
   			</tr>
    		<tr>
      			<td class="label" style="text-align:center;width:18%;">
      				<%=planLabel %>
      			</td>
      			<td class="label" style="text-align:center;width:18%;">
      				<%=actualLabel %>
      			</td>
      			<td class="label" style="text-align:center;width:18%;">
      				<%=VarianceLabel %>
      			</td>
   			</tr>
   			<%if(EPCType.contains("E")){ %>
   			<tr>
      			<td class="label" style="text-align:center;">
      				<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Engineering</emxUtil:i18nScript>
      			</td>
      			<td class="field" style="text-align:center;<%if((EngPlanThisWeek.contains("Data") ? 0 : Double.parseDouble(EngPlanThisWeek)) < 0){%>color:red;<%}%>">
      				<%=EngPlanThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((EngActualThisWeek.contains("Data") ? 0 : Double.parseDouble(EngActualThisWeek)) < 0){%>color:red;<%}%>">
      				<%=EngActualThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffEngActualPlan.contains("Data") ? 0 : Double.parseDouble(diffEngActualPlan)) < 0){%>color:red;<%}%>">
      				<%=diffEngActualPlan%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffEngPreviousThisWeek.contains("Data") ? 0 : Double.parseDouble(diffEngPreviousThisWeek)) < 0){%>color:red;<%}%>">
      				<%=diffEngPreviousThisWeek%>
      			</td>
   			</tr>
   			<%} %>
   			<%if(EPCType.contains("P")){ %>
   			<tr>
      			<td class="label" style="text-align:center;">
      				<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Procurement</emxUtil:i18nScript>
      			</td>
      			<td class="field" style="text-align:center;<%if((ProcPlanThisWeek.contains("Data") ? 0 : Double.parseDouble(ProcPlanThisWeek)) < 0){%>color:red;<%}%>">
      				<%=ProcPlanThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((ProcActualThisWeek.contains("Data") ? 0 : Double.parseDouble(ProcActualThisWeek)) < 0){%>color:red;<%}%>">
      				<%=ProcActualThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffProcActualPlan.contains("Data") ? 0 : Double.parseDouble(diffProcActualPlan)) < 0){%>color:red;<%}%>">
      				<%=diffProcActualPlan%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffProcPreviousThisWeek.contains("Data") ? 0 : Double.parseDouble(diffProcPreviousThisWeek)) < 0){%>color:red;<%}%>">
      				<%=diffProcPreviousThisWeek%>
      			</td>
   			</tr>
   			<%} %>
   			<%if(EPCType.contains("C")){ %>
   			<tr>
      			<td class="label" style="text-align:center;">
      				<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Construction</emxUtil:i18nScript>
      			</td>
      			<td class="field" style="text-align:center;<%if((ConPlanThisWeek.contains("Data") ? 0 : Double.parseDouble(ConPlanThisWeek)) < 0){%>color:red;<%}%>">
      				<%=ConPlanThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((ConActualThisWeek.contains("Data") ? 0 : Double.parseDouble(ConActualThisWeek)) < 0){%>color:red;<%}%>">
      				<%=ConActualThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffConActualPlan.contains("Data") ? 0 : Double.parseDouble(diffConActualPlan)) < 0){%>color:red;<%}%>">
      				<%=diffConActualPlan%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffConPreviousThisWeek.contains("Data") ? 0 : Double.parseDouble(diffConPreviousThisWeek)) < 0){%>color:red;<%}%>">
      				<%=diffConPreviousThisWeek%>
      			</td>
   			</tr>
   			<tr>
      			<td class="label" style="text-align:center;">
      				<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Commissioning</emxUtil:i18nScript>
      			</td>
      			<td class="field" style="text-align:center;<%if((CommPlanThisWeek.contains("Data") ? 0 : Double.parseDouble(CommPlanThisWeek)) < 0){%>color:red;<%}%>">
      				<%=CommPlanThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((CommActualThisWeek.contains("Data") ? 0 : Double.parseDouble(CommActualThisWeek)) < 0){%>color:red;<%}%>">
      				<%=CommActualThisWeek%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffCommActualPlan.contains("Data") ? 0 : Double.parseDouble(diffCommActualPlan)) < 0){%>color:red;<%}%>">
      				<%=diffCommActualPlan%>
      			</td>
      			<td class="field" style="text-align:center;<%if((diffCommPreviousThisWeek.contains("Data") ? 0 : Double.parseDouble(diffCommPreviousThisWeek)) < 0){%>color:red;<%}%>">
      				<%=diffCommPreviousThisWeek%>
      			</td>
   			</tr>
   			<%} %>
   			<tr>
      			<td class="label" style="text-align:center;">
      				<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.overall</emxUtil:i18nScript>
      			</td>
      			<td class="field" style="text-align:center;<%if((overallPlan.contains("Data") ? 0 : Double.parseDouble(overallPlan)) < 0){%>color:red;<%}%>">
      				<%=overallPlan%>
      			</td>
      			<td class="field" style="text-align:center;<%if((overallActual.contains("Data") ? 0 : Double.parseDouble(overallActual)) < 0){%>color:red;<%}%>">
      				<%=overallActual%>
      			</td>
      			<td class="field" style="text-align:center;<%if((overallDiff.contains("Data") ? 0 : Double.parseDouble(overallDiff)) < 0){%>color:red;<%}%>">
      				<%=overallDiff%>
      			</td>
      			<td class="field" style="text-align:center;<%if((overallPreviousComparison.contains("Data") ? 0 : Double.parseDouble(overallPreviousComparison)) < 0){%>color:red;<%}%>">
      				<%=overallPreviousComparison%>
      			</td>
   			</tr>
   		</tbody>
	</table>
</body>