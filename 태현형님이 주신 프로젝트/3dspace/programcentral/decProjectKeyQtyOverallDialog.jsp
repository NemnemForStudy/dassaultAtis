<%@include file = "../programcentral/decProjectKeyQtyReportHeader.inc"%>

<%
try {
	List<Map> overallList = null;
	try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ) {
		Map programMap = new HashMap();
		programMap.put("sqlSession", sqlSession);
		programMap.put("projectId", projectId);
		programMap.put("unitId", unitId);
		programMap.put("cutOff", cutOff);
		
		overallList = JPO.invoke(context, "decKeyQty", null, "getKeyQtyReportList", JPO.packArgs(programMap), List.class);
	}
%>

<table class="list" id="contentList">
	<thead>
	<tr>
		<th colspan="6" rowspan="3" class="freezepane"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Description</emxUtil:i18nScript></th>
		<th colspan="9"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ProjectControlQty</emxUtil:i18nScript></th>
		<th colspan="5"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.EngineeringQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Variance</emxUtil:i18nScript></th>
	</tr>
	
	<tr>
		<th colspan="3"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyQtyContract</emxUtil:i18nScript></th>
		<th colspan="6"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyQtyBudget</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.NetPresentQtyKO</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ToGoQtyKO</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.TotalForecastQtyKO</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.PrevTotalForecastQtyKO</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.PeriodDeltaKO</emxUtil:i18nScript></th>
		<th rowspan="2"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.VarianceKO</emxUtil:i18nScript></th>
	</tr>
	
	<tr>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.BiddingQtyKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQtyKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.RevisedContractQtyKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQtyBeforeBudgetKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.VerifiedOverbudgetQtryBeforeBudgetKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.BudgetQtyKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQtyAfterBudgetKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.VerifiedOverbudgetQtryAfterBudgetKO</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.RevisedBudgetQtyKO</emxUtil:i18nScript></th>
	</tr>
	
	<tr dpCode="All">
		<th class="freezepane"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyL1</emxUtil:i18nScript></th>
		<th class="freezepane"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyL2</emxUtil:i18nScript></th>
		<th class="freezepane"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyL3</emxUtil:i18nScript></th>
		<th class="freezepane"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Category</emxUtil:i18nScript></th>
		<th class="freezepane"><%=collapseHTML + expandHTML + " " %><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.KeyItem</emxUtil:i18nScript></th>
		<th class="freezepane"><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Unit</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.BiddingQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.RevisedContractQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQtyBeforeBudget</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.VerifiedOverbudgetQtryBeforeBudget</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.BudgetQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ApprovedVOQtyAfterBudget</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.VerifiedOverbudgetQtryAfterBudget</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.RevisedBudgetQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.NetPresentQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.ToGoQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.TotalForecastQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.PrevTotalForecastQty</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.PeriodDelta</emxUtil:i18nScript></th>
		<th><emxUtil:i18nScript localize="i18nId">emxProgramCentral.Label.Variance</emxUtil:i18nScript></th>
	</tr>
	
	<tr style="text-align: center; background-color: white;">
		<td class="freezepane">1</td>
		<td class="freezepane">2</td>
		<td class="freezepane">3</td>
		<td class="freezepane"></td>
		<td class="freezepane"></td>
		<td class="freezepane"></td>
		<td>A</td>
		<td>B=D+G</td>
		<td>C=A+B</td>
		<td>D</td>
		<td>E</td>
		<td>F=A+D+E</td>
		<td>G</td>
		<td>H</td>
		<td>I=F+G+H</td>
		<td>J</td>
		<td>K</td>
		<td>L=J+K</td>
		<td>M</td>
		<td>N=L-M</td>
		<td>O=L-I</td>
	</tr>
	</thead>
<%
	String collapseExpandHTML = null;
	
	String trClass = null;

	String prevDPCode = "";
	String currentDPCode = "";
	int rowIdx = 0;
	String category = null;
	String keyItem = null;
	String cutOffDateStr = "";
	for ( Map overallMap : overallList )
	{
		if ( rowIdx == 0 )
		{
			cutOffDateStr = getCutOffDateStr(overallMap);
		}
		rowIdx++;
		currentDPCode = (String) overallMap.get("DP_CD");
		category = (String) overallMap.getOrDefault("CATEGORY", "");
		keyItem = (String) overallMap.getOrDefault("KEY_ITEM", "");
		
		if ( !prevDPCode.equals(currentDPCode) )
		{
			trClass = "header";
			prevDPCode = currentDPCode;
			collapseExpandHTML = collapseHTML + expandHTML;
		}
		else
		{
			trClass = "detail";
			collapseExpandHTML = "";
		}
%>
		<tr class="<%=trClass + " " + currentDPCode %>" dpCode="<%=currentDPCode %>" rowIdx="<%=rowIdx %>">
			<td class="center freezepane"><%=overallMap.getOrDefault("KEY_L1", "") %></td>
			<td class="center freezepane"><%=overallMap.getOrDefault("KEY_L2", "") %></td>
			<td class="center freezepane"><%=overallMap.getOrDefault("KEY_L3", "") %></td>
			<td class="category freezepane" mergeValue='<%=currentDPCode + "_" + category %>'><%=category %></td>
			<td class="keyItem freezepane" mergeValue='<%=currentDPCode + "_" + category + "_" + keyItem %>'><%=collapseExpandHTML + " " + keyItem %></td>
			<td><%=overallMap.getOrDefault("UOM", "") %></td>
			<td class="number freezepane"><%=String.valueOf( overallMap.getOrDefault("PRJ_BID_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_APPROVED_VO_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_REVISED_CONT_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_APPROVED_VO_QTY_BEFORE_BUDGET", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_VERIFIED_OVERBUDGET_QTY_BEFORE_BUDGET", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_BUDGET_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_APPROVED_VO_QTY_AFTER_BUDGET", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_VERIFIED_OVERBUDGET_QTY_AFTER_BUDGET", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("PRJ_REVISED_BUDGET_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("ENG_NET_PRESENT_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("ENG_TO_GO_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("ENG_TOTAL_FORECAST_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("ENG_PREV_TOTAL_FORECAST_QTY", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("ENG_PERIOD_DELTA", "") ) %></td>
			<td class="number"><%=String.valueOf( overallMap.getOrDefault("VARIANCE", "") ) %></td>
		</tr>
<%
	}
%>

</table>

<script type="text/javascript">
fnSetCutOffDate("<%=cutOffDateStr %>");

fnMergeCell( ["category", "keyItem"] );

//detail row 숨기기
$("tr.detail").hide();

// hide 버튼 숨기기
$("a.collapseAnchor").hide();

fnHideFSHeader();

// 테이블 컬럼 헤더 고정
fnAdjustStickyOption("contentList", true);

</script>

<%
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>