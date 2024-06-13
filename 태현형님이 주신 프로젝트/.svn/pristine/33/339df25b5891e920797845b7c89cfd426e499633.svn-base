<%@include file="emxNavigatorInclude.inc"%>
<%@include file="emxNavigatorTopErrorInclude.inc"%>
<%@include file="emxNavigatorTimerTop.inc"%>
<jsp:useBean id="indentedTableBean"	class="com.matrixone.apps.framework.ui.UITableIndented" scope="session" />
<html>
<head>
<script language="JavaScript" src="../common/scripts/emxUIConstants.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUITableUtil.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUICoreMenu.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUIFreezePane.js" type="text/javascript"></script>


</head>
<body>
<% 
	String selectedTable = emxGetParameter(request,"selectedTable");
	String completeTableData= emxGetParameter(request,"completeTableData");
    String strTableName = selectedTable;
	   	String strNextTableName = indentedTableBean.deleteCurrentTable(context,strTableName);
if(strNextTableName!=null)
	    {
HashMap currentTableMap=indentedTableBean.getTable(context,strNextTableName,UITableCommon.isUserTable(context,strNextTableName));
}
HashMap requestMap = UINavigatorUtil.getRequestParameterMap(pageContext);
%>
<script language="JavaScript">
var completeTableData = JSON.parse('<%=completeTableData%>');
console.log("completeTableData:"+completeTableData);
if(Object.keys(completeTableData).length !== 0){
	for (var  i = 0, size = completeTableData.length; i < size; i++) {
		var completeTableDataList = completeTableData[i];
console.log("completeTableDataList:"+completeTableDataList);

		var strDerivedTable= completeTableDataList.derivedTable;
console.log("strDerivedTable:"+strDerivedTable);
console.log("strNextTableName:"+'<%=strNextTableName%>');
		if(strDerivedTable == '<%=strNextTableName%>' ){
		parent.window.location.href=completeTableDataList.URL;
		}
	}
}
</script>
</body>
</html>
