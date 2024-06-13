<%@ page import="java.sql.Timestamp"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="java.math.BigDecimal"%>

<%@include file="emxNavigatorTopErrorInclude.inc"%>

<%@include file="../emxUICommonHeaderBeginInclude.inc"%>
<%@include file="../emxUICommonAppInclude.inc"%>
<%@include file="emxCompCommonUtilAppInclude.inc"%>
<%@include file="emxUIConstantsInclude.inc"%>

<%@page import="java.time.LocalDate"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="java.util.List"%>

<script language="JavaScript" src="scripts/emxUICollections.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="../common/scripts/emxUICalendar.js"></script>
<script src="../webapps/ENOAEFStructureBrowser/webroot/common/scripts/decemxUIFreezePane.js"></script>

<%@ page import="org.apache.ibatis.session.SqlSession"%>
<%@ page import="com.daewooenc.mybatis.main.decSQLSessionFactory"%>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource"
	locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
	String sLang = request.getHeader("Accept-Language");

	String fromDate = emxGetParameter(request,"Select_Date_Start_msvalue");
	String toDate = emxGetParameter(request,"Select_Date_End_msvalue");
	String dateRangeType = emxGetParameter(request,"DateRangeType");

	if(ProgramCentralUtil.isNullString(fromDate)){
		fromDate = DecConstants.EMPTY_STRING;
	} else {
		long longDate = Long.parseLong(fromDate);  
    	String pattern = "yyyyMMdd";
    	SimpleDateFormat ProjectSpacedateFormat = new SimpleDateFormat(pattern);     
    	fromDate = (String) ProjectSpacedateFormat.format(new Timestamp(longDate));
	}
	if(ProgramCentralUtil.isNullString(toDate)){
		toDate = DecConstants.EMPTY_STRING;
	} else {
		long longDate = Long.parseLong(toDate);  
    	String pattern = "yyyyMMdd";
    	SimpleDateFormat ProjectSpacedateFormat = new SimpleDateFormat(pattern);     
    	toDate = (String) ProjectSpacedateFormat.format(new Timestamp(longDate));
	}
	
	if(ProgramCentralUtil.isNullString(dateRangeType)){
		dateRangeType = DecConstants.EMPTY_STRING;
	}
	
	String sObjectId = DecConstants.EMPTY_STRING;
	String sObjectName = DecConstants.EMPTY_STRING;
	String sProjectCode = emxGetParameter(request,"projectCode");
	String sEPCType = emxGetParameter(request,"EPCType");
	StringList slProjectParam = new StringList();
	slProjectParam.add(DecConstants.SELECT_ID);
	slProjectParam.add(DecConstants.SELECT_NAME);
	
	String button = ProgramCentralUtil.isNotNullString(sEPCType) ? sEPCType : "overall";
	
	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, "*", DecConstants.SELECT_NAME + "=='" + sProjectCode + "'", slProjectParam);
	MapList mlPhase = new MapList();
	Map mProject = null;
	Map mPhase = null;
	Map mArgs = new HashMap();
	Map paramMap = new HashMap();
	
	String EPCType = DecConstants.EMPTY_STRING;
	int thisWeek = 100;
	String today = DecConstants.EMPTY_STRING;
	String objectName = DecConstants.EMPTY_STRING;
	
	String divisionLabel = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Label.division", context.getSession().getLanguage());
	
	if(mlProject != null && !mlProject.isEmpty()){
		mProject = (Map)mlProject.get(0);
		sObjectId = (String)mProject.get(DecConstants.SELECT_ID);
		DomainObject doPS = DomainObject.newInstance(context, sObjectId);
		sObjectName = doPS.getInfo(context,"name");
		
		// 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
	    LocalDate now = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
	    // 포맷 적용
	    today = now.format(formatter);
	    
	    DomainObject object = new DomainObject(sObjectId);
    	objectName = object.getInfo(context,"name");
    	EPCType = object.getAttributeValue(context, "decEPCType");
	    
	}
	
%>
<link rel="stylesheet" href="../common/styles/emxUICalendar.css">
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script>
$(function () { 
	var div = '<%=button%>';
	var today = '<%=today%>';
	var fromDate = '<%=fromDate%>';
	var toDate = '<%=toDate%>';
	var objectName = '<%=objectName%>';
	var dateType = '<%=dateRangeType%>';
	
	$.ajax({
		url : "./decProjectProgressChartDBselect.jsp",
		type : "post",
		data : {"objectName" : objectName, "today" : today, "fromDate" : fromDate, "toDate" : toDate, "div" : div, "dateType" : dateType},
		dataType : "json",
		success : function(result){
			var obj = JSON.parse(JSON.stringify(result.data));

			comparisonLastWeekPlan = obj[0];
			comparisonLastWeekActual = obj[1];
			summaryPlan = obj[2];
			summaryActual = obj[3];
			cutOffDate = obj[4];
			thisWeek = obj[5];
			
			highchart(thisWeek,cutOffDate,comparisonLastWeekPlan,comparisonLastWeekActual,summaryPlan,summaryActual);
		}
	});
});

function highchart(thisWeek,cutOffDate,comparisonLastWeekPlan,comparisonLastWeekActual,summaryPlan,summaryActual){
	Highcharts.chart('container', {
		
        title: {
            text: '',//'Progress Charts',
            x: -20 //center
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: cutOffDate,
			plotBands: [{
						color: 'RGB(250, 240, 240)', // Color value
						from: Number(thisWeek) - 0.4, // Start of the plot band
						to: Number(thisWeek) + 0.4 // End of the plot band
					  }]
        },
        yAxis: [{
			title: {
                text: ''//'Values'
            },
			labels : {
				format: '{value:.2f}%',
			}
        },{
			title: {
                text: ''//'Values'
            },
			labels : {
				format: '{value:.2f}%',
			},
			opposite: true
        }],
        tooltip: {
            valueSuffix: '%',
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name} : </td>' +
				  			   '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
			footerFormat: '</table> ',
			/*shared: true,*/
			useHTML: true,
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom'
        },
        series: [{
			yAxis: 0,
			color:'skyblue',
			type: 'column',
            name: 'W.P',
            data: comparisonLastWeekPlan
        }, {
			yAxis: 0,
			color:'navy',
			type: 'column',
            name: 'W.A',
            data: comparisonLastWeekActual
        }, {
			yAxis: 1,
			color:'green',
            name: 'C.P',
            data: summaryPlan
        },{
			yAxis: 1,
			color:'orange',
            name: 'C.A',
            data: summaryActual
        }]
    });
}

</script>
<body style="height: 85%;">
	<style>
.buttonDiv {
	overflow: visible;
	color: #5b5d5e;
	background-color: #F7F7F7;
	border: 0px;
	overflow: visible;
	border-radius: 1px;
	transition: background-color 2s font-weight 2s;
	margin: 0px 0px;
}
</style>
	<div style="width:100%;text-align:right;">
		<img src="../common/images/iconActionSearchSpyGlass.png" onclick='showFilterSlideinDialog("objectId=<%=sObjectId%>&filterParam=Select_Date:true,DateRangeType:true&showHierarchyFrame=false")' style="cursor: pointer;<!-- width:16px; -->">&emsp;
	</div>
	<div id="container"
		style="min-width: 310px; height: 75vh; margin: 0 0; padding: 0 0; overflow: visible">
	</div>
</body>