<%@page import="com.dec.util.DecConstants"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file = "../programcentral/decProjectKeyQtyReportHeader.inc"%>

<%!
public String replaceUnitId2UnitCode(String str, MapList unitList) throws Exception{
	try {
		Map unitMap = null;
		String unitId = null;
		String unitCode = null;
		
		for (Object obj : unitList)
		{
			unitMap = (Map) obj;
			unitId = (String) unitMap.get(DecConstants.SELECT_ID);
			unitCode = (String) unitMap.get(DecConstants.SELECT_NAME);
			
			str = str.replace(unitId, unitCode);
		}
		
		return str;
	} catch(Exception e) {
		e.printStackTrace();
		throw e;
	}
}
%>

<%
try {
	List<Map> summaryList = null;
	Map programMap = new HashMap();
	
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
		programMap.put("sqlSession", sqlSession);
		programMap.put("projectId", projectId);
		programMap.put("unitId", unitId);
		programMap.put("cutOff", cutOff);
		programMap.put("REPORT_FLAG", "Y");
		
		summaryList = JPO.invoke(context, "decKeyQty", null, "getKeyQtyReportList", JPO.packArgs(programMap), List.class);
	}
	
	// 권한 체크
	Map SETTINGS = new HashMap();
	SETTINGS.put("hasAccess", "PIM,EM,LE");
	
	programMap.clear();
	programMap.put("objectId", projectId);
	programMap.put("SETTINGS", SETTINGS);
	
	boolean hasAccess = JPO.invoke(context, "decAccess", null, "hasAccess", JPO.packArgs(programMap), Boolean.class);
	
%>

<script type="text/javascript">
function fnDone() {
	turnOnProgress();
	document.dataForm.submit();
}

function fnSearchValidate() {
	let selectedYearVal = $("#tdYear").val();
	if ( selectedYearVal === "" )
	{
		alert("Year must be selected.");
		$("#tdYear").focus();
		return false;
	}
	return true;
}

function fnSearchImplement() {
	if ( fnSearchValidate() )
	{
		let selectedUnitId = $("#unitId").val();
		let selectedCutOff = $("#tdYear").val() + "_" + $("#tdMonthVal").val();
		
		let headerURL = parent.location.href;
		let headerURLArr = headerURL.split("&");
		
		for (let k = 0; k < headerURLArr.length; k++)
		{
			if ( headerURLArr[k].indexOf("projectId") === 0 || headerURLArr[k].indexOf("objectId") === 0 || headerURLArr[k].indexOf("cutOff") === 0 )
			{
				headerURLArr[k] = "";
			}
		}
		
		headerURLArr.push("projectId=<%=projectId %>");
		headerURLArr.push("objectId=" + selectedUnitId);
		headerURLArr.push("cutOff=" + selectedCutOff);
		
		let convertedHeaderURL = headerURLArr.join("&");
		
// 		if ( parent.parent.location.href.indexOf("decemxNavigatorDialog4Dashboard.jsp") > -1 )
// 		{
// 			parent.fnSetURL(convertedHeaderURL);
// 		}
// 		else
// 		{
			parent.fnSetURL(convertedHeaderURL);
// 		}
	}
}

function fnGenerateTableImplement() {
	let htmlExpr = "<table class='form list'>";
	htmlExpr += "<tr>";
		htmlExpr += "<th colspan='2'>Searching</th>";
	htmlExpr += "</tr>";
	htmlExpr += "<tr>";
		htmlExpr += "<td class='label'>Unit</td>";
		htmlExpr += "<td class='field'>";
			htmlExpr += fnGenerateSelectExpr("unitId", <%=unitJsonStr %>, "<%=StringUtils.isEmpty(unitId) ? projectId : unitId %>");
		htmlExpr += "</td>";
	htmlExpr += "</tr>";
	htmlExpr += "<tr>";
		htmlExpr += "<td class='label'>Date</td>";
		htmlExpr += "<td class='field'>";
			htmlExpr += "<div id='calendarDiv' style='box-shadow: none;'></div>";
			htmlExpr += "<input type='hidden' id='tdMonthVal'>";
		htmlExpr += "</td>";
	htmlExpr += "</tr>";
	htmlExpr += "<tr>";
		htmlExpr += "<td colspan='2'>";
			htmlExpr += "<button class='btn-primary floatRight' type='button' onclick='javascript:parent.fnCloseSearchDiv()'>Close</button>";
			htmlExpr += "<button class='btn-primary floatRight' type='button' onclick='javascript:fnSearchImplement()'>Search</button>";
		htmlExpr += "</td>";
	htmlExpr += "</tr>";
	htmlExpr += "</table>";
	return htmlExpr;
}

let uiCal = null;
function fnShowHideFilterImplement() {
	let filterDivDisplay = $("#filterDiv").css("display");
	
	if ( filterDivDisplay === "none" )
	{
		$("#filterDiv").show();
		
		let calendarContainer = document.getElementsByClassName("calendar-container");
		
		if ( calendarContainer.length === 0 )
		{
			let calDiv = document.getElementById("calendarDiv");
			
			uiCal = new emxUICalendar(window);
			uiCal.draw(calDiv);
			
			uiCal.setMonth = fnOnClickMonth;
			uiCal.setMonth(<%=month %> - 1);
			uiCal.setYear(<%=year %>);
			
			$(".calendarBody").hide();
		}
	}
	else
	{
		$("#filterDiv").hide();
	}
	
}

function fnOnClickMonth(intMonth) {
        if (typeof intMonth != "number") {
                throw new Error("Required parameter intMonth is null or not a number. (emxUICalendar.js::emxUICalendar.prototype.setMonth)");
        } else if (intMonth > 11 || intMonth < 0) {
                throw new Error("Required parameter intMonth must be a value between 0 and 11. (emxUICalendar.js::emxUICalendar.prototype.setMonth)");
        }
        uiCal.curDate.setMonth(intMonth);
//Added:For Enhanced Calendar Control:AEF:nr2:20-11-09
        clickedOnCalIcon = "true";
//End:For Enhanced Calendar Control:AEF:nr2:20-11-09
        uiCal.refresh(true);//Added for performance improvement.
        
        document.getElementById("tdMonthVal").value = intMonth + 1;
}
</script>

<form name="dataForm" method="POST" target="pagehidden" action="../programcentral/decProjectKeyQtySummaryProcess.jsp" >

<input type="hidden" name="SITE_CD" value="<%=projectCode %>" />
<%-- <input type="hidden" name="UNIT_CD" value="<%=unitCode %>" /> --%>
<input type="hidden" name="UNIT_ID" value="<%=unitId %>" />
<input type="hidden" name="cutOff" value="<%=cutOff %>" />

<table class="list" id="contentList">
	<thead>
	<tr dpCode="All">
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.No</emxUtil:i18nScript></th>
		<th rowspan="2"><%=collapseHTML + expandHTML + " " %><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyItems</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.UOM</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.BiddingQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.TotalForecastQty</emxUtil:i18nScript></th>
		<th colspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Variance</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.PrevTotalForecastQty</emxUtil:i18nScript></th>
		<th colspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.PeriodDelta</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ReasonForPeriodDelta</emxUtil:i18nScript></th>
	</tr>
	
	<tr style="text-align: center; background-color: white;">
		<td>(a)</td>
		<td>(b)</td>
		<td>(c)</td>
		<td>(d=c-b)</td>
		<td>(%, d/c)</td>
		<td>(e)</td>
		<td>(f=c-e)</td>
		<td>(%, f/c)</td>
	</tr>
	
	</thead>
	
<%
	String cutOffDateStr = "";

	if ( summaryList.size() == 0 )
	{
%>
		<tr>
			<td colspan="12" style="text-align: center; line-height: 5em;">There is no imported data.</td>
		</tr>		
<%
	}
	else
	{
		int rowIdx = 0;
		String no = null;
		String trClass = null;
		String totalForecast = null;
		String variance = null;
		String prevTotalForecast = null;
		Long totalForecastLong = 0l;
		Long varianceLong = 0l;
		Long prevTotalForecastLong = 0l;
		String variancePercent = "";
		String periodDeltaPercent = "";
		String dpCode = null;
		String category = null;
		String keyItem = null;
		String keyItemsExpr = null;
		String collapseExpandHTML = null;
		boolean showHeader = false;
		boolean isTotalForecastLong = false;
		boolean isVarianceLong = false;
		boolean isPrevTotalForecastLong = false;
		String type2Remark = null;
		
		for (Map summaryMap : summaryList)
		{
			if ( rowIdx == 0 )
			{
				cutOffDateStr = getCutOffDateStr(summaryMap);
			}
			rowIdx++;
			totalForecast = String.valueOf( summaryMap.getOrDefault("ENG_TOTAL_FORECAST_QTY", "") );
			prevTotalForecast = String.valueOf( summaryMap.getOrDefault("VARIANCE", "") );
			variance = String.valueOf( summaryMap.getOrDefault("ENG_PREV_TOTAL_FORECAST_QTY", "") );
			
			isTotalForecastLong = DecStringUtil.isLong(totalForecast);
			isVarianceLong = DecStringUtil.isLong(variance);
			isPrevTotalForecastLong = DecStringUtil.isLong(prevTotalForecast);
			
			variancePercent = "";
			if ( isTotalForecastLong && isVarianceLong )
			{
				varianceLong = Long.parseLong( variance );
				totalForecastLong = Long.parseLong( totalForecast );
				
				variancePercent = Math.round(varianceLong * 1d / totalForecastLong * 100) + "%";
			}
			
			periodDeltaPercent = "";
			if ( isTotalForecastLong && isPrevTotalForecastLong )
			{
				prevTotalForecastLong = Long.parseLong( prevTotalForecast );
				totalForecastLong = Long.parseLong( totalForecast );
				
				periodDeltaPercent = Math.round(prevTotalForecastLong * 1d / totalForecastLong * 100) + "%";
			}
			
			dpCode = (String) summaryMap.getOrDefault("DP_CD", "");
			category = (String) summaryMap.getOrDefault("CATEGORY", "");
			keyItem = (String) summaryMap.getOrDefault("KEY_ITEM", "");
			
			if ( DecStringUtil.isInteger(category) )
			{
				no = category;
				trClass = "header";
// 				keyItemsExpr = keyItem;
				collapseExpandHTML = collapseHTML + expandHTML;
			}
			else
			{
				no = "";
				trClass = "detail";
// 				keyItemsExpr = category + " " + keyItem;
				collapseExpandHTML = "";
			}
			
			if ( StringUtils.isEmpty(no) && "PP".equals(dpCode) )
			{
				keyItemsExpr = category + " " + keyItem;
			}
			else
			{
				keyItemsExpr = keyItem;
			}
			
			type2Remark = replaceUnitId2UnitCode((String) summaryMap.getOrDefault("TYPE2_REMARK", ""), unitList);
%>
		<tr class="<%=trClass + " " + dpCode %> " dpCode="<%=dpCode %>" rowIdx="<%=rowIdx %>">
			<td><%=no %></td>
			<td class="keyItems" mergeValue='<%=dpCode + "_" + keyItemsExpr %>'><%=collapseExpandHTML + " " + keyItemsExpr %></td>
			<td><%=summaryMap.getOrDefault("UOM", "") %></td>
			<td class="number"><%=String.valueOf( summaryMap.getOrDefault("PRJ_BID_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( summaryMap.getOrDefault("PRJ_APPROVED_VO_QTY", "") ) %></td>
			<td class="number"><%=totalForecast %></td>
			<td class="number"><%=variance %></td>
			<td class="number"><%=variancePercent %></td>
			<td class="number"><%=prevTotalForecast %></td>
			<td class="number"><%=String.valueOf( summaryMap.getOrDefault("ENG_PERIOD_DELTA", "") ) %></td>
			<td class="number"><%=periodDeltaPercent %></td>
			<c:choose>
				<c:when test="<%=!hasAccess || isProject || isDashboard %>">
					<td><input type="hidden" name="KEY_CD" value="<%=summaryMap.get("KEY_CD") %>" /><ul><%=type2Remark %></ul></td>
				</c:when>
				<c:otherwise>
					<td><input type="hidden" name="KEY_CD" value="<%=summaryMap.get("KEY_CD") %>" /><textarea name="TYPE2_REMARK" rows="1" style="min-height: 1em;"><%=type2Remark %></textarea></td>
				</c:otherwise>
			</c:choose>
		</tr>
<%		
		}
	}
%>

</table>

</form>

<script type="text/javascript">
fnSetCutOffDate("<%=cutOffDateStr %>");

fnMergeCell( ["keyItems"] );

//detail row 숨기기
$("tr.detail").hide();

// hide 버튼 숨기기
$("a.collapseAnchor").hide();

setFilterCmd(true);

fnHideFSHeader();

//테이블 컬럼 헤더 고정
fnAdjustStickyOption("contentList", true);
</script>

<%
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>