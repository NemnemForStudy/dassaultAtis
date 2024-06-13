<%-- (c) Dassault Systemes, 2007, 2020 --%>

<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonAppInclude.inc"%>

<%@page import="matrix.util.StringList"%>

<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>
<%@page import="com.matrixone.apps.domain.util.mxType"%>
<%@page import="com.matrixone.apps.framework.ui.UINavigatorUtil"%>

<%@page import="matrix.db.Context"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>

<%@page import="java.util.Map"%>

<jsp:useBean id="indentedTableBean"
	class="com.matrixone.apps.framework.ui.UITableIndented" scope="session" />

<html>
<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<script language="Javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../productline/TestExePartial.js" ></script>
<head>
<%
	String sMode = emxGetParameter(request, "mode");
	//String ATTRIBUTE_TITLE = "attribute[" + DomainConstants.ATTRIBUTE_TITLE + "]";

	if (sMode.equalsIgnoreCase("chooserMultiple")) {
		String sRowIds[] = emxGetParameterValues(request, "emxTableRowId");
		String[] arrSplitRowId = null;
		StringBuilder sTitle = new StringBuilder();

		// if more than one attribute group is selected
		// use them both separated by "; "
		if (sRowIds != null) {
			String[] objIds = new String[sRowIds.length];
			for (int idx = 0; idx < sRowIds.length; idx++) {
				String objID = sRowIds[idx];
				if (objID.indexOf('|') != -1) {
					arrSplitRowId = objID.split("\\|");
					objID = arrSplitRowId[1];
				}
				objIds[idx] = objID;
			}

			StringList st = new StringList();
			st.add("name");
			MapList objTitles = DomainObject.getInfo(context, objIds, st);

			for (Object ObjMp : objTitles) {
				Map<String, String> objTitleMap = (Map) ObjMp;
				sTitle.append(objTitleMap.get("name"));
				sTitle.append("; ");
			}

			String xmlMsg = emxGetParameter(request, "xmlmsg");
			String sFrm = "emxCreateForm";
			String sFND = "CopyScopeDisplay";
			String sFNA = "CopyScope";
			String stile = sTitle.toString();
%>
<script language="javascript" type="text/javaScript">
    var sFrame = getTopWindow().getWindowOpener();
    var sFrom = <%=XSSUtil.encodeForJavaScript(context,sFrm)%>
    var sFna = <%=XSSUtil.encodeForJavaScript(context,sFNA)%>
    var sFnd = <%=XSSUtil.encodeForJavaScript(context,sFND)%>
    var txtTypeDisplay = sFrame.document.sFrom.sFnd;
    var txtTypeActual  = sFrame.document.sFrom.sFna;
    txtTypeDisplay.value = "<%=XSSUtil.encodeForJavaScript(context,stile)%>";
    txtTypeActual.value = "<%=XSSUtil.encodeForJavaScript(context,xmlMsg)%>";

	getTopWindow().closeWindow();
</script>
<%
	} else {
			String message = null;
			if (message == null || "smaSimulationCentral.Error.NoSelection".equals(message))
				message = "Nothing Selected";
%>
<script type="text/javascript">
        var s="<%=message%>";
    alert(s);
    var sFrame = getTopWindow().getWindowOpener();
</script>
<%
	}
	} else if (sMode.equalsIgnoreCase("rangeRef")) {
		// Obj Id to load the table
		String objectId = emxGetParameter(request, "objectId");
%>
<script type="text/javascript">
            	       
     
	var sFrame = getTopWindow().getWindowOpener();
	var url= "../common/emxIndentedTable.jsp?table=PLCTestCaseList&expandProgram=emxTestExecution:getTestCaseChildren&header=emxProduct.Tree.TestCase&selection=multiple";
	url += "&objectId="+"<%=XSSUtil.encodeForURL(context,objectId)%>";
	url += "&multiColumnSort=false&objectCompare=false&submitLabel=emxFramework.Common.Done&cancelLabel=emxFramework.Common.Cancel&expandLevelFilter=false&displayView=details";
	url += "&submitURL=../productline/TestExePartialCopy.jsp?mode=chooserMultiple&formName=emxCreateForm&freezePane=null&suiteKey=ProductLine&fromTestExe=true";
	getTopWindow().location.href = url;
	//getTopWindow().showModalDialog(url);
</script>
<%
	}
%>
</head>
<body>
</body>
</html>

