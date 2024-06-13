<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
	
%>

<script src="../common/scripts/jquery-latest.js"></script>

<style type="text/css">
html, body, iframe {
	height: 100%;
	width: 100%;
}
</style>

<form name="filterForm">

	* Table URL : <input type="text" size="150" name="tableURL" value="../common/emxIndentedTable.jsp?table=decProjectKeyQtyReportMgmtSummary&program=decKeyQty:getMasterList&header=emxProgramCentral.Label.KeyQtyReportMgmt&editLink=true&sortDirection=ascending&StringResourceFileId=emxProgramCentralStringResource&toolbar=decProjectKeyQtyReportMgmtSummaryToolbar&selection=multiple" />
	<br/>
<!-- 	* objectId : <input type="text" size="25" name="objectId" value="22220.15368.25882.32063" /> -->OPAT1
<!-- 	* objectId : <input type="text" size="25" name="objectId" value="22220.15368.22138.21632" />OPAE1 -->
	* objectId : <input type="text" size="25" name="objectId" value="22220.15368.34085.5113" />OPAR1
	| * Filter Parameter Type : 
	<select id="filterParameterType" multiple>
		<option value="codeMaster">Code Master</option>
		<option value="decProjectType">decProjectType</option>
		<option value="decCountryCode">decCountryCode</option>
		<option value="Unit">Unit</option>
		<option value="EWP">EWP</option>
		<option value="Material Delay">Material Delay</option>
		<option value="IFC">IFC</option>
		<option value="Doc_StrSearch">Doc_StrSearch</option>
		<option value="Doc_Issued">Doc_Issued</option>
		<option value="PO_No">PO_No</option>
		<option value="Date_StandType">Date_StandType</option>
		<option value="Action">Action</option>
		<option value="Input Type">Input Type</option>
		<option value="Year">Year</option>
		<option value="Month">Month</option>
		<option value="Select_Date">Select_Date</option>
		<option value="CWP_Plan">CWP_Plan</option>
		<option value="Status_Updated">Status_Updated</option>
		<option value="Doc_Issued">Doc_Issued</option>
		<option value="Change_User">Change_User</option>
	</select>
	| * Filter Parameter : 
	<select id="filterParameter" multiple>
		<option value="EPC Category">EPC Category</option>
		<option value="Project Category:1>Project Category:2>Project Category:3">Project Category</option>
		<option value="Discipline">Discipline</option>
		<option value="Discipline>Discipline.BOQ Key Item">BOQ Key Item</option>
		<option value="Group">Group</option>
		<option value="SUBCON">SUBCON</option>
		<option value="Priority Group">Priority Group</option>
		<option value="Priority Number">Priority Number</option>
		<option value="CWP/IWP Stage">CWP/IWP Stage</option>
		<option value="CWP/IWP Status">CWP/IWP Status</option>
		<option value="true">true</option>
	</select>
	<br/>
	* Show Hierarchy Frame : <input type="checkbox" id="showHierarchyFrame" value="true" />
	| * Show Other Frame : <input type="checkbox" id="showOtherFrame" value="true" />
	| * Generate URL : <input type="text" id="generatedURL" size="150" />
	<input type="button" value="Render" onclick="fnRender()" />

</form>

<hr/>

	<iframe frameborder="0" id="tableFrame" name="tableFrame" src="../common/emxBlank.jsp" sandbox="allow-top-navigation"></iframe> 
	
	<script type="text/javascript">
// tableFrame.addEventListener("message", function(event) {
// 	this.location.href = event.data.url; 
// }, false);

function fnRender() {
	let generatedURL = "&slideinFilter=true";
	$("#filterParameterType option:selected").each(function() {
		generatedURL += "&" + $(this).val() + "=" + $("#filterParameter").val();
	});
	
	$("#generatedURL").val(generatedURL);
	
	let renderURL = filterForm.tableURL.value;
	renderURL += "&objectId=" + filterForm.objectId.value;
	renderURL += generatedURL;
	
	if ( $("#showHierarchyFrame").prop("checked") === true )
	{
		
	}
	else
	{
		renderURL += "&showHierarchyFrame=false";
	}
	
	if ( $("#showOtherFrame").prop("checked") === true )
	{
		
	}
	else
	{
		renderURL += "&showOtherFrame=false";
	}
	
	$("#tableFrame").attr("src", renderURL);
// 	tableFrame.postMessage({ url: renderURL }, "*");
	
}
</script>
<%	
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>