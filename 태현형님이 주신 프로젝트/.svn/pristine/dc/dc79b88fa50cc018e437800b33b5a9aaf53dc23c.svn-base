
<%@page import="java.math.RoundingMode"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="com.dec.util.DecMatrixUtil"%>
<%@page import="java.time.temporal.ChronoUnit"%>
<%@page import="java.time.Period"%>
<%@page import="java.time.temporal.WeekFields"%>
<%@page import="java.time.temporal.IsoFields"%>
<%@page import="java.time.LocalDate"%>
<%@page import="java.util.Set"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.List"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecDateUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>
<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>

<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script src="../webapps/ENOAEFStructureBrowser/webroot/common/scripts/decemxUIFreezePane.js"></script>
<%
	String sLang = request.getHeader("Accept-Language");
	String sObjectId = DecConstants.EMPTY_STRING;
	String sWBSType = DecConstants.EMPTY_STRING;
	String sProjectCode = emxGetParameter(request,"projectCode");
	String sDiscipline = emxGetParameter(request,"Discipline");
	String sSubCon = emxGetParameter(request,"Sub-Con");
	String sFrom = emxGetParameter(request,"Select_Date_Start");
	String sTo = emxGetParameter(request,"Select_Date_End");
	String emxTableRowIdExpr = emxGetParameter(request,"emxTableRowIdExpr");
	StringList rowIdList = FrameworkUtil.splitString(emxTableRowIdExpr, ",");
	String sCheckOID = null;
	String sCheckType = null;
	if(!rowIdList.isEmpty()) {
		sCheckOID = rowIdList.get(0);
		DomainObject doCheck = DomainObject.newInstance(context, sCheckOID);
		sCheckType = doCheck.getTypeName(context);
	}
	String sTypePatterns = DecConstants.TYPE_PHASE + "," + DecConstants.TYPE_DECCWPTASK;
	String sWhere = DecConstants.EMPTY_STRING;
	String sPlanStart = DecConstants.EMPTY_STRING;
	String sPlanFinish = DecConstants.EMPTY_STRING;
	String sTaskDiscipline = DecConstants.EMPTY_STRING;
	String sTaskSubConNo = DecConstants.EMPTY_STRING;
	String sIWPCounts = DecConstants.EMPTY_STRING;
    String sType = DecConstants.EMPTY_STRING;
    String sName = DecConstants.EMPTY_STRING;
    String sTaskId = DecConstants.EMPTY_STRING;
	
	StringList slProjectParam = new StringList();
	slProjectParam.add(DecConstants.SELECT_ID);

	StringList slSubTaskParam = new StringList();
	slSubTaskParam.add(DecConstants.SELECT_NAME);
	slSubTaskParam.add(DecConstants.SELECT_TYPE);
	slSubTaskParam.add(DecConstants.SELECT_ID);
	slSubTaskParam.add(DecConstants.SELECT_CURRENT);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_DECWBSTYPE);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_DECSUBCONNO);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_DECRELEASEFORECAST);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_DECRELEASEACTUAL);
	slSubTaskParam.add(DecConstants.SELECT_ATTRIBUTE_DECIWPCOUNTS);
	StringList slDPHierarchy = new StringList();
	DomainObject doCodeMaster = DomainObject.newInstance(context);
	StringList slDPSelect = new StringList();
	slDPSelect.add(DecConstants.SELECT_DESCRIPTION);
	slDPSelect.add(DecConstants.SELECT_NAME);
	
	if(DecStringUtil.isNotEmpty(sProjectCode)){
		sWhere = DecConstants.SELECT_NAME + "=='" + sProjectCode + "'";
	}
	
	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, "*", sWhere, slProjectParam);
	MapList mlSubTask = null;
	MapList mlCWPTask = new MapList();
	MapList mlCodeDetail = new MapList();
	Map mProject = null;
	Map mSubTask = null;
	Map mCodeDetail = null;
	Map<String, String> mDPHierarchy = new HashMap();
	Map<String, Boolean> mHasDPHierarchyCheck = new HashMap();
	Map<String, Integer> mPlanMonthCnt = new HashMap();
	int iYearPlan			 = 0;
	int iMonthPlan			 = 0;
	int iRemainder			 = 0;
	int iCnt				 = 0;
	
	// 이부분 지워야함
	sFrom = DecDateUtil.changeDateFormat(sFrom, DecDateUtil.IF_FORMAT);
	sTo = DecDateUtil.changeDateFormat(sTo, DecDateUtil.IF_FORMAT);
	
	WeekFields wfs = WeekFields.of(Locale.getDefault());
	long lBetweenMonth = 0;
	long lBetweenPlan = 0;
	
	LocalDate ldActualStartDate = null;
	LocalDate ldExpectedDate = null;
	LocalDate ldPlanStart = null;
	LocalDate ldPlanFinish = null;
	Date dActualStartDate = null;
	Date dExpectedDate = null;
	BigDecimal bdDivide = null;
	BigDecimal bdRemainder = null;
	BigDecimal bdIWPCount = null;
	BigDecimal bdBetween = null;
	
	if(mlProject != null && !mlProject.isEmpty()){
		mProject = (Map)mlProject.get(0);
		sObjectId = (String)mProject.get(DecConstants.SELECT_ID);
		DomainObject doPS = DomainObject.newInstance(context, sObjectId);
		doPS.open(context);
// 		doCodeMaster.setId(DecMatrixUtil.getObjectId(context, DecConstants.TYPE_DECCODEMASTER, "DP Hierarchy", doPS.getName()));
		doCodeMaster.setId(DecMatrixUtil.getObjectId(context, DecConstants.TYPE_DECCODEMASTER, "Discipline", doPS.getName())); // Modified by hslee on 2023.07.25
		mlCodeDetail = doCodeMaster.getRelatedObjects(context
				, DecConstants.RELATIONSHIP_DECCODEDETAILREL
				, DecConstants.TYPE_DECCODEDETAIL
				, slDPSelect
				, null
				, false
				, true
				, (short) 1
				, "current == Active"
				, DecConstants.EMPTY_STRING
				, 0);
		for(Object o : mlCodeDetail){
			mCodeDetail = (Map)o;
			slDPHierarchy.add((String)mCodeDetail.get(DecConstants.SELECT_NAME));
			mDPHierarchy.put((String)mCodeDetail.get(DecConstants.SELECT_NAME), (String)mCodeDetail.get(DecConstants.SELECT_DESCRIPTION));
		}
		if(DecStringUtil.equals(DecConstants.TYPE_PHASE, sCheckType)){
			doPS.setId(sCheckOID);
		}
		// 프로젝트에 연결된 SubTask
    	mlSubTask = doPS.getRelatedObjects(context,
										DecConstants.RELATIONSHIP_SUBTASK, //pattern to match relationships
										sTypePatterns, //pattern to match types
										slSubTaskParam, //the eMatrix StringList object that holds the list of select statement pertaining to Business Obejcts.
										null, //the eMatrix StringList object that holds the list of select statement pertaining to Relationships.
										false, //get To relationships
										true, //get From relationships
										(short)0, //the number of levels to expand, 0 equals expand all.
										DecConstants.EMPTY_STRING, //where clause to apply to objects, can be empty ""
										DecConstants.EMPTY_STRING,
										0); //where clause to apply to relationship, can be empty ""
    	for(Object o : mlSubTask) {
	    	mSubTask = (Map)o;
        	sType = (String)mSubTask.get(DecConstants.SELECT_TYPE);
        	sTaskId = (String)mSubTask.get(DecConstants.SELECT_ID);
	    	sName = (String)mSubTask.get(DecConstants.SELECT_NAME);
	    	sWBSType = (String)mSubTask.get(DecConstants.SELECT_ATTRIBUTE_DECWBSTYPE);
	    	sPlanStart = (String)mSubTask.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_START_DATE);
	    	sPlanFinish = (String)mSubTask.get(DecConstants.SELECT_ATTRIBUTE_TASK_ESTIMATED_FINISH_DATE);
	    	sTaskDiscipline = (String)mSubTask.get(DecConstants.SELECT_ATTRIBUTE_DECDISCIPLINE);
	    	sTaskSubConNo = (String)mSubTask.get(DecConstants.SELECT_ATTRIBUTE_DECSUBCONNO);
    		if(DecStringUtil.equals(DecConstants.TYPE_DECCWPTASK, sCheckType) && !DecStringUtil.equals(sCheckOID, sTaskId)){
    			continue;
    		}
	    	if(!DecStringUtil.equals(sType, DecConstants.TYPE_DECCWPTASK)) {
	    		continue;
	    	}
	    	// 검색 조건에 전부 맞는지 체크
	    	if(DecStringUtil.isNotEmpty(sDiscipline) && !DecStringUtil.equals(sTaskDiscipline, sDiscipline)){
	    		continue;
	    	}
	    	if(DecStringUtil.isNotEmpty(sSubCon) && !DecStringUtil.equals(sTaskSubConNo, sSubCon)){
	    		continue;
	    	}
		    // 각 달마다 몇개씩있는지 체크
		    if(DecStringUtil.isNoneBlank(sPlanStart, sPlanFinish)){
		    	ldPlanStart = DecDateUtil.autoChangeLocalDate(sPlanStart);
		    	ldPlanFinish = DecDateUtil.autoChangeLocalDate(sPlanFinish);
		    	lBetweenPlan = ChronoUnit.MONTHS.between(ldPlanStart, ldPlanFinish) + 1;
			    sIWPCounts = (String)mSubTask.getOrDefault(DecConstants.SELECT_ATTRIBUTE_DECIWPCOUNTS, "0");
			    if(!DecStringUtil.isNumericStr(sIWPCounts)){
			    	sIWPCounts = "0";
			    }
			    if(!sIWPCounts.equals("0")){
			    	if(ldActualStartDate == null || ldPlanStart.isBefore(ldActualStartDate)){
			    		ldActualStartDate = ldPlanStart;
			    	}
			    	if(ldExpectedDate == null || ldPlanFinish.isAfter(ldExpectedDate)){
			    		ldExpectedDate = ldPlanFinish;
			    	}
			    }
			    bdIWPCount = new BigDecimal(sIWPCounts);
			    bdBetween = new BigDecimal(lBetweenPlan);
			    bdDivide = bdIWPCount.divide(bdBetween, RoundingMode.DOWN);
			    bdRemainder = bdIWPCount.remainder(bdBetween);
			    mHasDPHierarchyCheck.put(sTaskDiscipline, true);
			    // NO OF IWPs / 기간 > 0
			    if(bdDivide.intValue() > 0){
			    	for(int i=0; i<lBetweenPlan; i++){
						iYearPlan		 = ldPlanStart.getYear();
						iMonthPlan		 = ldPlanStart.getMonthValue();
						iCnt = mPlanMonthCnt.get(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan) == null ? 0 : (int)mPlanMonthCnt.get(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan);
				   		mPlanMonthCnt.put(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan, iCnt + bdDivide.intValue());
				   		ldPlanStart = ldPlanStart.plusMonths(1);
			    	}
				   	iCnt = mPlanMonthCnt.get(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan) == null ? 0 : (int)mPlanMonthCnt.get(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan);
					mPlanMonthCnt.put(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan, iCnt + bdRemainder.intValue());
			    // NO OF IWPs / 기간 < 1 
			    }else {
			    	iRemainder = bdRemainder.intValue();
			    	for(int i=0; i<lBetweenPlan; i++){
						iYearPlan		 = ldPlanStart.getYear();
						iMonthPlan		 = ldPlanStart.getMonthValue();
						iCnt = mPlanMonthCnt.get(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan) == null ? 0 : (int)mPlanMonthCnt.get(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan);
						if(iRemainder > 0){
							mPlanMonthCnt.put(sTaskDiscipline + "_" + iYearPlan + "_" + iMonthPlan, iCnt + 1);
							iRemainder--;
						}
				   		ldPlanStart = ldPlanStart.plusMonths(1);
			    	}
			    }
		    }
    	}
	    if(DecStringUtil.isNotEmpty(sFrom)){
			ldActualStartDate = DecDateUtil.autoChangeLocalDate(sFrom);
	    }
	    if(DecStringUtil.isNotEmpty(sTo)){
			ldExpectedDate = DecDateUtil.autoChangeLocalDate(sTo);
	    }
    	if(ldActualStartDate == null){
    		ldActualStartDate = LocalDate.now();
    	}
    	if(ldExpectedDate == null){
    		ldExpectedDate = LocalDate.now();
    	}

		dActualStartDate = java.sql.Date.valueOf(ldActualStartDate);
		dExpectedDate = java.sql.Date.valueOf(ldExpectedDate);
		
		lBetweenMonth = ChronoUnit.MONTHS.between(ldActualStartDate, ldExpectedDate);
	}
	Map<Integer, Integer> mYearCnt = new HashMap(); // 각 년마다 몇달이 들어가는지 확인하는 맵
	Set<Integer> setYear = new HashSet();
	LocalDate localDate = LocalDate.now();
	int iDayMonth = 0;
	int iDayYear = 0;
	int iDay = 0;
	localDate = ldActualStartDate;
	List<Integer> listMonth = new ArrayList();
	List<String> listMonthDay = new ArrayList();
	for(int i=0; i<=lBetweenMonth; i++){
		iDayYear = localDate.getYear();
		iDayMonth = localDate.getMonthValue();
		iDay = localDate.getDayOfMonth();
		setYear.add(iDayYear); // 화면에 나와야하는 년도를 Set에 저장
		listMonth.add(iDayMonth);
		listMonthDay.add(iDayYear + "_" + iDayMonth);
		iCnt = mYearCnt.getOrDefault(iDayYear, 0);
		mYearCnt.put(iDayYear, iCnt + 1); // 각 년마다 몇주씩 가지고있는지 저장
		localDate = localDate.plusMonths(1); // 1주씩 넘어감
	}
	
	String sYear = null;
	String sMS = null;
	String sMonth = null;
	String sDay = null;
	String[] sArrMS = null;
	localDate = LocalDate.now().withDayOfMonth(1);
%>
<style>
	table tr td {
		border : 2px solid #ffffff;
	}
	table .header{
		min-width: 155px;
	}
	table .month{
		min-width: 48px;
		max-width: 48px;
	}
    body {
        height: 100%;
    }
	table td{
		height : 30px;
	}
	summary {
		cursor: pointer;
	}
	.todayColumn{
		background-color: skyblue !important; 
	}
</style>
	<%
		List<Integer> listSumCum = new ArrayList();
		List<String> listSumCumKey = new ArrayList();
		int iSumMonth = 0;
		int iSumCum = 0;
	%>
<%if(mlProject != null && !mlProject.isEmpty()){%>
<script>
$(function() {
	var container = document.getElementById('container');
	var scheduleTable = document.getElementById('scheduleTable');
	var tableDivleft = document.getElementById('tableDivleft');
	var tableDivright = document.getElementById('tableDivright');
	var summaryTable = document.getElementById('summaryTable');
	var tableDivBorder = document.getElementById('tableDivBorder');
	var column = document.getElementById('column');
	var popup = document.getElementById('popup');
	var columnWidth = column.clientWidth;
	var summaryTableClientWidth = summaryTable.clientWidth;
	var tableDivBorderWidth = tableDivBorder.clientWidth;
	var tableBaseWidth = tableDivleft.clientWidth;
	var actual = new Date(<%=dActualStartDate != null ? dActualStartDate.getTime() : ""%>);
	var expect = new Date(<%=dExpectedDate != null ? dExpectedDate.getTime() : ""%>);
	var actualTime = actual.getTime();
	var expectTime = expect.getTime();
	var tableDivleftWidth = 0;
	var tableDivRightWidth = 0;
	var todayDate = new Date(<%=localDate.getYear()%>, <%=localDate.getMonthValue()-1%>, <%=localDate.getDayOfMonth()%>);
	<%localDate = localDate.minusDays(15);%>
	tableDivleft.style.width = summaryTableClientWidth + "px";
	tableDivright.style.width = summaryTableClientWidth + "px";
	tableDivleft.style.overflow = "hidden";
	var yearColumn = document.getElementsByClassName('yearColumn');
	var headerYear = document.getElementById('headerYear');
	var dayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var monthArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	tableDivBorder.addEventListener('scroll', () =>{
		setYearColumnPosition();
	});
	function setYearColumnPosition(){
		var bCheck = false;
		for(var i=yearColumn.length-1; i>=0; i--) {
	//	for(var i=0; i<yearColumn.length; i++) {
			var base = tableBaseWidth - tableDivleft.clientWidth - tableBaseWidth + tableDivright.clientWidth;
			if((yearColumn[i].cellIndex)*48<tableDivBorder.scrollLeft+base && !bCheck){
				yearColumn[i].style.position = "absolute";
				yearColumn[i].style.left = headerYear.clientWidth + "px";
				yearColumn[i].style.width = (columnWidth+10) + "px";
				bCheck = true;
			}else{
				yearColumn[i].style.position = "relative";
				yearColumn[i].style.left = "";
			}
		}
	}
	function setContainerHeight(){
		container.style.height = (document.body.clientHeight - popup.clientHeight - 20 - scheduleTable.clientHeight) + "px";
	}
	setContainerHeight();
	const observer1 = new ResizeObserver(entries => {
	//	setContainerHeight();
	});
	observer1.observe(scheduleTable);
    /* chart type은 chart, series안에서도 각각 줄수가 있다. */
     var chart1 = new Highcharts.stockChart({
         rangeSelector: {
             buttons: [
           // week 기준으로 1m는 항상 비활성화
           //{
           //    type: 'month',
           //    count: 1,
           //    text: '1m',
           //    events: {
           //        click: function () {
           //       	 var minDate = new Date().setDate(todayDate.getDate()-15);
           //       	 var maxDate = new Date().setDate(todayDate.getDate()+15);
           //       	 if(actualTime > minDate){
           //       		 minDate = actualTime;
           //       		 maxDate += (actualTime-minDate);
           //       	 }
           //       	 if(expectTime < maxDate){
           //       		 maxDate = expectTime; 
           //       		 minDate -= (maxDate-expectTime);
           //       	 }
           //       	 chart1.xAxis[0].setExtremes(minDate, maxDate);
           //       	 return false;
           //        }
           //    }
           //}, 
             {
                 type: 'month',
                 count: 3,
                 text: '3m',
                 events: {
                     click: function () {
                    	 var minDate = new Date().setDate(todayDate.getDate()-45);
                    	 var maxDate = new Date().setDate(todayDate.getDate()+45);
                    	 if(actualTime > maxDate && expectTime > maxDate){
                    		 return true;
                    	 }else if(actualTime < minDate && expectTime < minDate){
                    		 return true;
                    	 }
                    	 if(actualTime > minDate){
                    		 maxDate += (actualTime-minDate);
                    		 minDate = actualTime;
                    	 }
                    	 if(expectTime < maxDate){
                    		 minDate -= (maxDate-expectTime);
                    		 maxDate = expectTime;
                    	 }
                    	 chart1.xAxis[0].setExtremes(minDate, maxDate);
                    	 return false;
                     }
                 }
             }, {
                 type: 'month',
                 count: 6,
                 text: '6m',
                 events: {
                     click: function () {
                    	 var minDate = new Date(todayDate).setMonth(todayDate.getMonth()-3);
                    	 var maxDate = new Date(todayDate).setMonth(todayDate.getMonth()+3);
                    	 if(actualTime > maxDate && expectTime > maxDate){
                    		 return true;
                    	 }else if(actualTime < minDate && expectTime < minDate){
                    		 return true;
                    	 }
                    	 if(actualTime > minDate){
                    		 maxDate += (actualTime-minDate);
                    		 minDate = actualTime;
                    	 }
                    	 if(expectTime < maxDate){
                    		 minDate -= (maxDate-expectTime);
                    		 maxDate = expectTime;
                    	 }
                    	 chart1.xAxis[0].setExtremes(minDate, maxDate);
                    	 return false;
                     }
                 }
             }, {
                 type: 'year',
                 count: 1,
                 text: '1y',
                 events: {
                     click: function () {
                    	 var minDate = new Date(todayDate).setMonth(todayDate.getMonth()-6);
                    	 var maxDate = new Date(todayDate).setMonth(todayDate.getMonth()+6);
                    	 if(actualTime > maxDate && expectTime > maxDate){
                    		 return true;
                    	 }else if(actualTime < minDate && expectTime < minDate){
                    		 return true;
                    	 }
                    	 if(actualTime > minDate){
                    		 maxDate += (actualTime-minDate);
                    		 minDate = actualTime;
                    	 }
                    	 if(expectTime < maxDate){
                    		 minDate -= (maxDate-expectTime);
                    		 maxDate = expectTime;
                    	 }
                    	 chart1.xAxis[0].setExtremes(minDate, maxDate);
                    	 return false;
                     }
                 }
             }, {
                 type: 'all',
                 text: 'All'
             }]
         },
    	 title:{
         	text : ''
         },
         credits: {
             enabled: false
         },
         chart: {
             renderTo: 'container',
             type: 'spline'

         },
         legend: {
     	    enabled: true,
     	    labelFormatter: function() {
     	        return this.name;
     	    }
         },
         tooltip: {
		     split: false,
		     distance: 30,
		     padding : 5,
		     formatter: function () {
		     	let tipDate = new Date(this.x);
		        return [dayArr[tipDate.getDay()] + ', ' + tipDate.getDate() + " " + monthArr[tipDate.getMonth()]].concat(
		             this.point ? ['<br/>', '<tspan style="color: ' + this.color + '; fill: ' + this.color + ';">&#9679; </tspan>', this.point.series.name + ': <b>' + this.point.series._i + "</b>"] : []
		 	    );
		     }
         },
         xAxis: {
        	 plotBands: [{
        		    color: 'skyblue', // Color value
        		    from: new Date("<%=localDate.getYear()%>/<%=localDate.getMonthValue()%>/<%=localDate.getDayOfMonth()%> 09:00:00").getTime(), // Start of the plot band
        		    <%localDate = localDate.plusMonths(1);%>
        		    to: new Date("<%=localDate.getYear()%>/<%=localDate.getMonthValue()%>/<%=localDate.getDayOfMonth()%> 24:00:00").getTime() // End of the plot band
        	 }],
        	 events: {
                 setExtremes: function(e) {
                	 if(tableDivBorderWidth < summaryTableClientWidth){
	                	 var min = e.min;
	                	 var max = e.max;
	                	 var minDate = new Date(min); 
	                	 var maxDate = new Date(max);
	                	 if(minDate > maxDate){
	                		 minDate = new Date(max);
	                    	 maxDate = new Date(min);
	                	 }
	                	 var changeLeftWidth = 0;
	                	 var changeRightWidth = 0;
	                	 if(minDate > actual){
	                		 changeLeftWidth = Math.floor((minDate - actual) / 604800000) * columnWidth;
	                	 }else{
	                		 changeLeftWidth = 0;
	                	 }
	                	 if(maxDate < expect){
	                		 changeRightWidth = Math.floor((expect - maxDate) / 604800000) * columnWidth;
	                	 }else{
	                		 changeRightWidth = 0;
	                	 }
	            		 tableDivleftWidth = (summaryTableClientWidth - changeLeftWidth - changeRightWidth);
	            		 tableDivRightWidth = (summaryTableClientWidth - changeRightWidth);
	                	 if(tableDivleftWidth < tableDivBorderWidth){
	                		 tableDivleftWidth = tableDivBorderWidth + columnWidth - (tableDivBorderWidth % columnWidth);
	                	 }
	                	 if(tableDivRightWidth < tableDivBorderWidth){
	                		 tableDivRightWidth = tableDivBorderWidth + columnWidth - (tableDivBorderWidth % columnWidth);
	                	 }
	                	 if(tableDivBorderWidth > (tableDivRightWidth - changeLeftWidth)){
	                		 tableDivRightWidth = (tableDivBorderWidth + changeLeftWidth);
	                		 if(tableDivRightWidth > summaryTableClientWidth){
	                			 tableDivRightWidth = summaryTableClientWidth;
	                		 }
	                	 }
	                     tableDivleft.style.width = tableDivleftWidth + "px";
	                     tableDivright.style.width = tableDivRightWidth + "px";
                	 }
		             setYearColumnPosition();
                 }
             }
         },
         yAxis : [{// Primary yAxis
        	 min: 0,
             gridLineWidth: 0,
             labels: {
               format: '{value:1f}',
               style: {
                 color: Highcharts.getOptions().colors[1]
               }
             },
             title: {
               text: 'Values',
               style: {
                 color: Highcharts.getOptions().colors[1]
               }
             },
             opposite: false
         },{ // Secondary yAxis
        	 min: 0,
             gridLineWidth: 0,
             title: {
               text: 'Sum',
               style: {
                 color: Highcharts.getOptions().colors[0]
               }
             },
             labels: {
               format: '{value:1f}',
               style: {
                 color: Highcharts.getOptions().colors[0]
               }
             }
         }],
         series: [
	  		 <%for(String sDPHierarchy : slDPHierarchy){ %>
        	 <%if(mHasDPHierarchyCheck.get(sDPHierarchy) != null){%>
	         {
	             name: '<%=mDPHierarchy.get(sDPHierarchy)%>',
	             showInNavigator: false,
	             data: [
	            	 <%for(int i=0; i<listMonthDay.size(); i++){
	            	 	sMS = listMonthDay.get(i);
	            	 	sArrMS = sMS.split("_");
	            	 	sYear = sArrMS[0];
	            	 	sMonth = sArrMS[1];
	            	 %>
	            	 [new Date("<%=sYear%>/<%=sMonth%>/01 00:00:00").getTime(),<%=mPlanMonthCnt.getOrDefault(sDPHierarchy+"_"+sMS, 0)%>], 
	            	 <%}%>
	             ]
	         },
	         <%}%>
	         <%}%>
	         {
	        	 name: 'Sum per Month',
	             showInNavigator: false,
	        	 data: [
	        		<%for(int i=0; i<listMonthDay.size(); i++){
	         			sMS = listMonthDay.get(i);
		         	 	sArrMS = sMS.split("_");
		         	 	sYear = sArrMS[0];
		         	 	sMonth = sArrMS[1];
	    	   			for(String sDPHierarchy : slDPHierarchy){ 
	    	   				iSumMonth += mPlanMonthCnt.getOrDefault(sDPHierarchy+"_"+sMS, 0);
	    	   			} 
	    	   		%>
	    	   		[new Date("<%=sYear%>/<%=sMonth%>/01 00:00:00").getTime(),<%=iSumMonth%>], 
	    			<%	iSumCum += iSumMonth;
	    				iSumMonth = 0;
	    				listSumCum.add(iSumCum);
	    		 	} %>
	        	 ]
	         },
	         {
	        	 name: 'Sum cum',
	             yAxis: 1,
	             showInNavigator: true,
	        	 data: [
	            	 <%for(int i=0; i<listMonthDay.size(); i++){
		            	 sMS = listMonthDay.get(i);
		            	 sArrMS = sMS.split("_");
		            	 sYear = sArrMS[0];
		            	 sMonth = sArrMS[1];
		             %>
		             [new Date("<%=sYear%>/<%=sMonth%>/01 00:00:00").getTime(),<%=listSumCum.get(i)%>], 
	            	 <%}%>
	        	 ]
	         }
     	 ]
     });
    <%  iSumCum = 0;
    	listSumCum.clear(); 
    %>
     window.onresize = function() {
    	 setContainerHeight();
    	 columnWidth = column.clientWidth;
    	 summaryTableClientWidth = summaryTable.clientWidth;
    	 tableDivBorderWidth = tableDivBorder.clientWidth;
    	 tableDivleft.style.width = summaryTableClientWidth + "px";
    	 tableDivright.style.width = summaryTableClientWidth + "px";
     }
 });
</script>
<link rel="stylesheet" href="../webapps/UIKIT/UIKIT.css" type="text/css" />
<body>
	<div id="popup" style="text-align: right; padding: 10px;">
	<h4 style="margin-top:0px; margin-bottom:0px;">
	CWP Plan&emsp;
	<a href=JavaScript:window.open("emxTree.jsp?DefaultCategory=decCwpPlanList&objectId=<%=sObjectId%>");><img src="images/iconActionNewWindow.png" border="0"></a>
	&emsp;<img src="../common/images/iconActionSearchSpyGlass.png" onclick='showFilterSlideinDialog("objectId=<%=sObjectId%>&filterParam=codeMaster:Discipline,codeMaster:Sub-Con,Select_Date:true")' style="cursor: pointer;">
	</h4>
	</div>
	<div id="container"></div>
   <details id="scheduleTable">
   	<summary>Summary</summary>
   		<div style="float: left;">
		   	<table class="grid">
		   		<tbody>
		   			<tr>
		   				<th id="headerYear" style="height: 29px;"></th>
		   			</tr>
		   			<tr>
		   				<th style="height: 29px;"></th>
		   			</tr>
            	 <%for(String sDPHierarchy : slDPHierarchy){%>
        	 	 <%if(mHasDPHierarchyCheck.get(sDPHierarchy) != null){%>
		   			<tr>
		   				<td><%=mDPHierarchy.get(sDPHierarchy)%></td>
		   			</tr>
            	 <%}%>
            	 <%}%>
            	 	<tr>
            	 		<th>Sum per Month</th>
            	 	</tr>
            	 	<tr>
            	 		<th>Sum cum</th>
            	 	</tr>
		   		</tbody>
		   	</table>
		</div>
   	<div id="tableDivBorder" style="overflow: auto;">
	   	<div id="tableDivleft" style="float:left;">
	   	<div id="tableDivright" style="float:right;">
		   	<table id="summaryTable" class="grid">
		   		<tbody>
		   			<tr><%localDate = LocalDate.now();
		   				  String sTodayKey = localDate.getYear() + "_" + localDate.getMonthValue();%>
		   				<%for(int i : setYear){ 
		   					int iYearCnt = mYearCnt.get(i)-1;%>
		   					<th class="yearColumn" style="border-right:none; border-left:1px solid #959595; z-index: <%=i%>;"><%=i%></th>
		   					<%for(int iYC=0; iYC<iYearCnt; iYC++){ %>
		   					<th style="border-right:none; "></th>
		   				<%} }%>
		   			</tr>
		   			<tr>
		   				<%for(int i : listMonth){ %>
		   				<th id="column" class="month"><%=i%></th>
		   				<%} %>
		   			</tr>
		   			<%	for(String sDPHierarchy : slDPHierarchy){ %>
        	 	 	<%  if(mHasDPHierarchyCheck.get(sDPHierarchy) != null){%>
		   			<tr>
		            	<%	for(int i=0; i<listMonthDay.size(); i++){
		            	 	sMS = listMonthDay.get(i);
		            	 	iCnt = mPlanMonthCnt.getOrDefault(sDPHierarchy+"_"+sMS, 0);
		   						if(DecStringUtil.equals(sTodayKey, sMS)){
	            		%>
			   					<td class="todayColumn">
			   			<%		}else{%>
			   					<td>
			   			<%		}%>
			   			<%=iCnt == 0 ? "-" : iCnt%></td>
			   			<%	}%>
		   			</tr>
		   			<tr>
		   			<%
		   				}}
		   				for(int i=0; i<listMonthDay.size(); i++){
	            	 		sMS = listMonthDay.get(i);
			   				for(String sDPHierarchy : slDPHierarchy){
			   					iSumMonth += mPlanMonthCnt.getOrDefault(sDPHierarchy+"_"+sMS, 0);
			   				} 
		   					if(DecStringUtil.equals(sTodayKey, sMS)){
		   					%>		
			   				<td class="todayColumn">
		   					<%}else{%>
		   					<td>
		   					<%} %>
			   			<%=iSumMonth == 0 ? "-" : iSumMonth %></td>
		   				<%	iSumCum += iSumMonth;
		   					iSumMonth = 0;
		   					listSumCum.add(iSumCum);
		   					listSumCumKey.add(sMS);
		   			 	} %>
		   			</tr>
		   			<tr>
		   			<% 	for(int i=0; i<listSumCumKey.size(); i++){
		   				sMS = listSumCumKey.get(i);
		   				iSumCum = listSumCum.get(i);
			   			if(DecStringUtil.equals(sTodayKey, sMS)){%>
			   				<td class="todayColumn">
		   				<%}else{%>
		   					<td>
		   				<%} %>
		   				<%=iSumCum == 0 ? "-" : iSumCum%></td>
		   			<%	} %>
		   			</tr>
		   		</tbody>
		   	</table>
	   	</div>
	   	</div>
   	</div>
   </details>
</body>
 <%}%>