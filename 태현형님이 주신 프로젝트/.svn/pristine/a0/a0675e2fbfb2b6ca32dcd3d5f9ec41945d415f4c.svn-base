<%--  
  (c) Dassault Systemes, 1993 - 2020.  All rights reserved.
--%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecConstants"%>
<%@include file = "emxNavigatorInclude.inc"%>
<html style="width:100%;height:100%">
<head>
 <script src="scripts/emxUIConstants.js" type="text/javascript"></script>
 
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script src="scripts/emxUICore.js" type="text/javascript"></script>
<%
	String sObjectId = "";
	String sProjectCode = emxGetParameter(request, "projectCode");
	MapList mlProject = DomainObject.findObjects(context, DecConstants.TYPE_PROJECT_SPACE, "*", DecConstants.SELECT_NAME + "=='" + sProjectCode + "'", new StringList("id"));
	
	if(mlProject != null && !mlProject.isEmpty()){
		sObjectId = (String)((Map)mlProject.get(0)).get("id");
	}
	StringBuilder sbURL = new StringBuilder();
	if(DecStringUtil.isNotEmpty(sObjectId)){
		sbURL.append("./decDashboardemxIndentedTable.jsp?tableMenu=PMCWBSTableMenu&expandProgramMenu=PMCWBSListMenu&freezePane=Name&selection=multiple&header=emxProgramCentral.Common.WorkBreakdownStructureSB&HelpMarker=emxhelpwbstasklist&sortColumnName=ID&findMxLink=false&editRelationship=relationship_Subtask&suiteKey=ProgramCentral&SuiteDirectory=programcentral&resequenceRelationship=relationship_Subtask&connectionProgram=emxTask:cutPasteTasksInWBS&postProcessJPO=emxTask:updateScheduleChanges&hideLaunchButton=true&parallelLoading=true&showPageURLIcon=false&cacheEditAccessProgram=true&editLink=false&massPromoteDemote=true&SuiteDirectory=programcentral&showPageHeader=false&treeLabel=Detail&emxSuiteDirectory=programcentral&portalMode=true&StringResourceFileId=emxProgramCentralStringResource&mode=PMCWBS&portalCmdName=PMCWBS&jsTreeID=null&suiteKey=ProgramCentral&portal=PMCSchedule&objectId=");
		sbURL.append(sObjectId);
		sbURL.append("&parentOID=");
		sbURL.append(sObjectId);
	}
%>
<script>
$('.topbar-cmd.extrabtn.fonticon.fullscreen-off-icon.fonticon-resize-fullscreen-off').on('click',function(){
	alert('a');
});

$('.fullscreen-icon.ifwe-action-icon.fonticon.fonticon-resize-fullscreen.clickable').on('click',function(){
	alert('a');
});

</script>

</head>
<body style="width:99%;height:100%">
<iframe frameborder="0" id="content" name="content" width="100%" height="100%" src="<%=sbURL.toString()%>"></iframe>
</body>
</html>