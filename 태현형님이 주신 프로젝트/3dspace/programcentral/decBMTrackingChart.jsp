<%@page import="com.matrixone.apps.framework.ui.UIMenu"%>
<%@page import="com.dec.util.decListUtil"%>
<%@page import="com.dec.util.DecConstants"%>
<%@include file = "../emxUICommonAppInclude.inc"%>

<%
try {
	String objectId = emxGetParameter(request, "objectId");
	
	// FMCS Discipline 조회
	Map programMap = new HashMap();
	programMap.put("projectId", objectId);
	programMap.put("codeMasterName", "FMCS Discipline");
	
	MapList fmcsDisciplineList = JPO.invoke(context, "decCodeMaster", null, "getCodeDetailList", JPO.packArgs(programMap), MapList.class);
	Map<String,Map> fmcsDisciplineSummary = decListUtil.getSelectKeyDataMapForMapList(fmcsDisciplineList, DecConstants.SELECT_ATTRIBUTE_DECCODE);
	
	StringList distinctDisciplineList = JPO.invoke(context, "decMaterial", null, "getDistinctDisciplineFromBMTracking", JPO.packArgs(programMap), StringList.class);
	
	Map commandMap = UIMenu.getCommand(context, "decBMTrackingListLink");
	String bmTrackingListURL = (String) commandMap.get("href");
	bmTrackingListURL = bmTrackingListURL.replace("${COMMON_DIR}", "../common");
	bmTrackingListURL += "&objectId=" + objectId;
	bmTrackingListURL += "&suiteKey=ProgramCentral";
%>

<script src="../common/scripts/hichart/highcharts.js"></script>
<script src="../common/scripts/jquery-latest.js"></script>
<script type="text/javascript">
$(function() {
	// 빈 줄 삽입
	fnSetEmptyRow("");
	
	fnSearchPart();
	
	$(window).on("resize", function() {
		let resizeHeight = ($(this).height() - 50) * 0.98;
		let resizeWidth = Math.min($(this).width() * 0.7, $(this).width() - 350);
		$("#container").css("height", resizeHeight + "px").css("width", resizeWidth + "px");
	});
});

let lastDCPLN_CD = null;
let lastPART_CD = null;
let lastPART_SHORTDESC = null;
let isInit = true;

function fnReset(fieldIdExpr) {
	let fieldIdArr = fieldIdExpr.split("|");
	for (let k = 0; k < fieldIdArr.length; k++)
	{
		document.getElementById(fieldIdArr[k]).value = "";
	}
}

function fnSearchPart() {
	let DCPLN_CD = $("#DCPLN_CD").val();
	let PART_CD = $("#PART_CD").val();
	let PART_SHORTDESC = $("#PART_SHORTDESC").val();
	
	if ( DCPLN_CD !== lastDCPLN_CD || PART_CD !== lastPART_CD || PART_SHORTDESC !== lastPART_SHORTDESC )
	{
		lastDCPLN_CD = DCPLN_CD;
		lastPART_CD = PART_CD;
		lastPART_SHORTDESC = PART_SHORTDESC;
	
// 		if ( isInit || DCPLN_CD !== "" || PART_CD !== "" || PART_SHORTDESC !== "" )
// 		{
// 			if ( isInit )
// 			{
// 				isInit = false;
// 			}
			
			$.ajax({
				url: "../common/decAjaxProcess.jsp",
				method: "POST",
				data: {
					objectId: "<%=objectId %>",
					mode: "getDistinctPartCodeAndDescList",
					DCPLN_CD: DCPLN_CD,
					PART_CD: PART_CD,
					PART_SHORTDESC: PART_SHORTDESC
				},
				success: function(data, status, xhr) {
					let jsonData = JSON.parse(data);
					let partList = jsonData["partList"]; // jsonArr
					
					let partListTable = $("#partListTable > tbody:last");
					let partJson = null;
					let partCode = null;
					let partDesc = null;
					let appendHTML = null;
					
					for (let k = 0; k < partList.length; k++)
					{
						partJson = partList[k];
						partCode = partJson["PART_CD"];
						partDesc = partJson["PART_SHORTDESC"];

						appendHTML += "<tr class='partRow'>";
							appendHTML += "<td class='row'>" + partCode + "</td>";
							appendHTML += "<td class='row'>" + partDesc + "</td>";
							appendHTML += "<td class='row'><input type='button' value='ADD' onclick='fnAddPartToChart(\"" + partCode + "\",\"" + partDesc + "\")' /></td>";
						appendHTML += "</tr>";
					}
					
					// 빈 row를 추가하여 td의 높이를 유지한다.
					let msg = partList.length > 0 ? "" : "No part found.";
					
					// 기존 row 제거
			 		$(".partRow").remove();
					
					appendHTML += fnGetRowHtml(msg);
					
// 					$("#emptyRow").prepend(appendHTML);
					partListTable.append( appendHTML );
				},
				error: function(xhr, status, error) {
					console.log("AJAX ERROR : " + error);
				}
			});
// 		}
	}
}

let selectedPartMap = new Map();
function fnAddPartToChart(partCode, partDesc) {
	let key = partCode+ "@@@" + partDesc;
	key = key.trim();
	
	if ( selectedPartMap.has(key) )
	{
		// 중복 체크
		top.alert("The selected part already exists.");
		return;
	}
	else if ( selectedPartMap.size === 5 )
	{
		// limit 5 체크
		top.alert("You can't select more than 5 parts.");
		return;
	}
	else
	{
		if ( selectedPartMap.size === 0 )
		{
			$("#selectedPartDiv").text("");
		}
		
		selectedPartMap.set(key, partDesc);
		
		let appendHTML = "<span>&nbsp;</span>"; 
		appendHTML += "<button key='" + key + "' onclick='fnRemovePartToChart(this)'>";
		appendHTML += partDesc;
		appendHTML += "</button>";
		$("#selectedPartDiv").append(appendHTML);
		
		fnGetChartData();
	}
}

function fnRemovePartToChart(dom) {
	let keyExpr = dom.getAttribute("key");
	
	let index = 0;
	selectedPartMap.forEach((value, key) => {
		if ( key === keyExpr ) {
			// highchart에서 series의 데이터 제거
			if ( chartObj != null )
			{
				chartObj.series[index].remove();
			}
			return false;
		}
		index++;
	});
	// button map에서 제거
	selectedPartMap.delete( keyExpr );
	
	// span과 button 제거
	$(dom).prev().remove();
	$(dom).remove();
	
	if ( selectedPartMap.size == 0 )
	{
		$("#selectedPartDiv").text("No part added.");
	}
}

function fnGetChartData() {
	let partCodeDescExpr = "";
	
	selectedPartMap.forEach((value, key) => {
		if ( partCodeDescExpr !== "" )
		{
			partCodeDescExpr += "|";
		}
		partCodeDescExpr += key;
	});
	
	$.ajax({
		url: "../common/decAjaxProcess.jsp",
		method: "POST",
		data: {
			mode: "getBMTrackingByPartCodeDesc",
			objectId: "<%=objectId %>",
			partCodeDescExpr: partCodeDescExpr
		},
		success: function(data, status, xhr) {
			let jsonData = JSON.parse(data);
			let summary = jsonData["summary"]; // json
			let yearMonthList = summary["yearMonthList"]; // arr
			let yearMonthCategoryList = summary["yearMonthCategoryList"]; // arr
			let partQtySummary = summary["partQtySummary"]; // json
			let seriesArr = new Array();
			let qtyArr = null;
			
			let partQtyJson = null;
			let PART_CD = null;
			let PART_SHORTDESC = null;
			let yearMonth = null;
			
			// 선택한 Part 순서대로 Summary에 담는다.
			selectedPartMap.forEach((value, key) => {
				partQtyJson = partQtySummary[key];
				PART_CD = partQtyJson["PART_CD"];
				PART_SHORTDESC = partQtyJson["PART_SHORTDESC"];
				
				qtyArr = new Array();
				
				// 데이터 중 맨 앞은 Bidding Qty
				qtyArr.push( partQtyJson["BID_QTY"] );
				
				for (let m = 0; m < yearMonthList.length; m++)
				{
					yearMonth = yearMonthList[m];
					qtyArr.push( partQtyJson["QTY_" + yearMonth] );
				}
				
				seriesArr.push({
					name: PART_SHORTDESC + "(" + PART_CD + ")",
					data: qtyArr
				});
			});
			
			yearMonthCategoryList.unshift("Bidding");
			
			fnRenderChart(yearMonthCategoryList, seriesArr);
		},
		error: function(xhr, status, error) {
			console.log("AJAX ERROR : " + error);
		}
	});
}

let chartObj = null;
function fnRenderChart(categoriesParam, seriesParam) {
	chartObj = Highcharts.chart('container', {

	    title: {
	        text: ''
	    },

	    credits: {
	        enabled: false
	    },
	    xAxis: {
	        categories: categoriesParam,
	        labels: {
	        	formatter: function() {
	        		let labelExpr = null;
	        		let valueArr = this.value.split(" ");
	        		yearExpr = valueArr[0];
	        		if ( this.pos === 0 || prevExpr !== yearExpr )
	        		{
	        			// 첫달 또는 매해 1월만 연도와 함께 표시 ex) ’15 Jan
	        			labelExpr = this.value;
	        			prevExpr = yearExpr;
	        		}
	        		else
	        		{
	        			// 그 외의 경우 연도 없이 월만 표시 ex) Feb
	        			labelExpr = this.value.split(" ")[1];
	        		}
	        		return labelExpr;
	        	}
	        },
	    },
	    
	    yAxis: {
	    	title: {
	            text: null
	        }
	    },

	    plotOptions: {
	        
	    },
	    
	    series: seriesParam
	});

}

function fnGetRowHtml(msg) {
	let rowHtml = '<tr class="partRow" style="height: calc(100% - 26px);" colspan="3">';
		rowHtml += '<td class="center" colspan="3">' + msg + '</td>';
	rowHtml += '</tr>';
	
	return rowHtml;
}

function fnSetEmptyRow(msg) {
	$("#partListTable > tbody:last").append( fnGetRowHtml("") );
}
</script>

<link rel="stylesheet" href="../common/styles/emxUIList.css"/>
<link rel="stylesheet" href="../common/styles/emxUIForm.css"/>
<style type="text/css">
html, body {
	height: calc(100% - 5px);
	width: 99%;
}
body {
	margin: 0;
}
table {
	width: 100%;
	height: 100%;
}
#container {
	height: calc(100% - 50px);
	width: 100%;
}
th.row, td.row {
	height: 26px;
/* 	font-size: 1.5vw; */
}
.center {
	text-align: center;
}
span.center {
	vertical-align: center;
}
div {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
button {
/* 	font-size: 0.5vw; */
}
</style>

<table id="allTable">
	<tr>
		<td width="30%">
			<table id="partTable" class="form">
				<tr>
					<td class="row label">Discipline</td>
					<td class="row field">
						<select id="DCPLN_CD" style="width: 158px;" onchange="fnReset('PART_CD|PART_SHORTDESC');fnSearchPart();">
<%						Map fmcsDisciplineMap = null;
						for (String distinctDiscipline : distinctDisciplineList)
						{
							fmcsDisciplineMap = fmcsDisciplineSummary.get(distinctDiscipline);
%>							<option value="<%=distinctDiscipline %>">
								<%=fmcsDisciplineMap.get(DecConstants.SELECT_DESCRIPTION) %>
							</option>
<%						}
%>						</select>
					</td>
				</tr>
				<tr>
					<td class="row label" style="top: 0; position: sticky;">Part Code</td>
					<td class="row field" style="top: 0; position: sticky;">
						<input type="text" id="PART_CD" onkeyup="fnSearchPart()" style="width: 150px;" />
					</td>
				</tr>
				<tr>
					<td class="row label" style="top: 40px; position: sticky;">Part Desc</td>
					<td class="row field" style="top: 40px; position: sticky;">
						<input type="text" id="PART_SHORTDESC" onkeyup="fnSearchPart()" style="width: 150px;" />
					</td>
				</tr>
				<tr>
					<td colspan="2" style="padding: 0; vertical-align: top;">
						<div id="partListDiv" style="overflow: auto; display:block;"> <!-- 리스트 짤림 현상 수정; display:block 추가 -->
							<table id="partListTable" class="list" style="padding: 0; margin: 0;">
								<tr>
									<th class="row" style="top: 0; position: sticky;">Part Code</th>
									<th class="row" style="top: 0; position: sticky;">Part Description</th>
									<th class="row" style="top: 0; position: sticky;">Select</th>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</td>
		<td>
			<div style="text-align: right; height: 20px; display: block;">
				<h4 style="margin: 0;">
			       	BM Tracking&nbsp;&nbsp;<!-- 문구 수정; 'List' 삭제 -->
			       	<a href=JavaScript:window.open("../common/emxTree.jsp?DefaultCategory=decBMTrackingListLink&objectId=<%=objectId%>");> <!--링크 수정  <%=XSSUtil.encodeForURL(bmTrackingListURL) %> -->
			       		<img src="../common/images/iconActionNewWindow.png" border="0">
			       	</a>
				</h4>
			</div>
			<div id="selectedPartDiv" style="height: 30px;">
				No part added.
			</div>
			<div id="container">
				No data found.
			</div>
		</td>
	</tr>
</table>


<%
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>