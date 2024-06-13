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
		sbURL.append("/3dspace/common/decDashboardemxIndentedTable.jsp?program=decInterfaceDV:findDeliverableObject&table=decDeliverableStatusTable&header=emxFramework.Command.decDeliverableStatusCommand&editLink=false&selection=multiple&sortColumnName=Name&submitAction=refreshCaller&HelpMarker=emxhelpprogramlist&sortDirection=ascending&slideinFilter=true&freezePane=DOC_NO,REVISION&pageSize=300");
		sbURL.append("&parentOID=");
		sbURL.append(sObjectId);
		sbURL.append("&objectId=");
		sbURL.append(sObjectId);
	}
%>

</head>
<body style="width:99%;height:100%">
<iframe frameborder="0" id="content" name="content" width="100%" height="100%" src="<%=sbURL.toString()%>"></iframe>
</body>
</html>