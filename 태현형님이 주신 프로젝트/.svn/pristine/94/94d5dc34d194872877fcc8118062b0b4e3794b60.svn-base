<%@include file = "emxNavigatorTopErrorInclude.inc"%>
<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTimerTop.inc"%>
<%@include file = "emxNavigatorCheckReadAccess.inc"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.framework.ui.UINavigatorUtil"%>
<html>
<head>
<title><emxUtil:i18n localize="i18nId">emxFramework.Common.Heading</emxUtil:i18n></title>
<%
String strToolbar =  "ResetToDefaults";
String strHelpMarker = "emxhelptablecreate";
String strUIType = emxGetParameter(request,"uiType");
String table= emxGetParameter(request,"table");
String strMode =emxGetParameter(request,"mode");
String strCustomTable = "";
String curTable="";
if("edit".equalsIgnoreCase(strMode) && strMode!=null){
curTable= emxGetParameter(request,"curTable");
strCustomTable = curTable.substring(0,curTable.lastIndexOf("~"));
}
String freezePane= emxGetParameter(request,"freezePane");
String header= emxGetParameter(request,"header");
String strLanguage = Request.getLanguage(request);
String strObjectId = emxGetParameter(request,"objectId");
String stringResourceFileId  = emxGetParameter(request,"StringResourceFileId");
String suiteKey = emxGetParameter(request,"suiteKey");
header = EnoviaResourceBundle.getProperty(context, stringResourceFileId , new Locale(strLanguage), header);
String subHeader = emxGetParameter(request,"subHeader");
subHeader= EnoviaResourceBundle.getFrameworkStringResourceProperty(context, subHeader, new Locale(strLanguage));
if(subHeader.equalsIgnoreCase("undefined")){
subHeader=null;
}

String strSortColumnName=emxGetParameter(request,"sortColumnName");
if(strSortColumnName.equalsIgnoreCase("undefined")){
strSortColumnName=null;
}
String strSortColumnDirection = emxGetParameter(request,"sortDirection");
if(strSortColumnDirection .equalsIgnoreCase("undefined")){
strSortColumnDirection =null;
}

String availableColumnMap= emxGetParameter(request,"availableColumnMap");
String currentTableVisibleColumns= emxGetParameter(request,"currentTableVisibleColumns");
String currentTableAttributeList = emxGetParameter(request,"currentTableAttributeList");
String iSplit = emxGetParameter(request,"split");

 java.util.List derivedTableNamesList    = com.matrixone.apps.framework.ui.UITableCustom.getDerivedTableNames(context,table);
int iFreezePane = 0;
	if(strMode==null)
	   { strMode="New";
	}
iFreezePane = Integer.parseInt(iSplit);

String strMultiColumnSort = "null";
String strPageHeading =header;
String strSubPageHeading="";
	if(UIUtil.isNotNullAndNotEmpty(strObjectId)){
		//strSubPageHeading = UINavigatorUtil.parseHeader(context, pageContext,strPageHeading, strObjectId, suiteKey, strLanguage);
strSubPageHeading = UINavigatorUtil.parseHeader(context, pageContext,header, strObjectId, suiteKey , strLanguage);
	}
	else if(UIUtil.isNotNullAndNotEmpty(strPageHeading)){
		
		strSubPageHeading  =header;
	}
	if(strSubPageHeading == null){
	    strSubPageHeading = "";
	}

	String strRegName = com.matrixone.apps.domain.util.FrameworkUtil.getAliasForAdmin(context,"Menu", strToolbar,true);
	String strHelpDone = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.FormComponent.Done", new Locale(strLanguage));
	String strHelpCancel = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, "emxFramework.FormComponent.Cancel", new Locale(strLanguage));
	String strProgressImage = "images/utilProgressBlue.gif";
	String strProcessingText = UINavigatorUtil.getProcessingText(context, strLanguage);
%>
<script type="text/javascript" language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUICore.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUICoreMenu.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxUIToolbar.js"></script>
<script type="text/javascript" language="JavaScript" src="../common/scripts/emxNavigatorHelp.js"></script>



<script language="JavaScript" type="text/JavaScript">
	addStyleSheet("emxUIDefault");
	addStyleSheet("emxUIToolbar");
	addStyleSheet("emxUIMenu");
	addStyleSheet("emxUIDOMLayout");
	addStyleSheet("emxUIDialog");

</script>
<script language="JavaScript">
		function resetToDefault()
		{
			var iframeObj = document.getElementById('customTable');
			iframeObj.src = iframeObj.src;
		}
</script>

<script language="Javascript">

	var submitInProgress = false;

    function onSubmit() {
		if(submitInProgress) {
    		return false;
    	} else {
    		submitInProgress = true;
    		hiddenSubmit();
    		return true;
    	}
	}
	
    function hiddenSubmit() {
		var uiType = parent.frames.customTable.document.forms.customtable.uiType.value;
    	parent.frames.customTable.validateNameField(uiType);
    }
    
    function adjustBody(){
    	var phd = document.getElementById("pageHeadDiv");
    	var dpb = document.getElementById("divPageBody");
    	if(phd && dpb){
    		var ht = phd.clientHeight;
    		if(ht <= 0){
    			ht = phd.offsetHeight;
    		}
    		dpb.style.top = ht + "px";
    	}
    }
</script>
<%@include file = "emxNavigatorBottomErrorInclude.inc"%>
</head>
<body  onload="adjustBody();turnOffProgress()" >
<div id="pageHeadDiv" >
<form name="customTableForm">
   <table>
	<tr>
    <td class="page-title">
      <h2><emxUtil:i18nScript localize="i18nId">emxFramework.Common.Heading</emxUtil:i18nScript></h2>
<%
      if(strSubPageHeading != null && !"".equals(strSubPageHeading)) {
%>
        <h3><xss:encodeForHTML><%=strSubPageHeading%></xss:encodeForHTML></h3>
<%
        }
%>
	</td>
<%
       String processingText = UINavigatorUtil.getProcessingText(context, langStr);
%>
        <td class="functions">
            <table>
<tr>
                <!-- //XSSOK -->
                <td class="progress-indicator"><div id="imgProgressDiv"><%=processingText%></div></td>
</tr>
</table>
        </td>
        </tr>
        </table>
<!-- //XSSOK -->
</form>
</div>
<%
StringBuffer strbuffParams = new StringBuffer(64);
strbuffParams.append("&uiType=");
strbuffParams.append(XSSUtil.encodeForURL(context, strUIType));
strbuffParams.append("&table=");
strbuffParams.append(XSSUtil.encodeForURL(context, table));
strbuffParams.append("&objectId=");
strbuffParams.append(XSSUtil.encodeForURL(context, strObjectId));
strbuffParams.append("&customTable=");
strbuffParams.append(XSSUtil.encodeForURL(context, strCustomTable));
strbuffParams.append("&sortColumnName=");
strbuffParams.append(XSSUtil.encodeForURL(context, strSortColumnName));
strbuffParams.append("&sortDirection=");
strbuffParams.append(XSSUtil.encodeForURL(context, strSortColumnDirection));
strbuffParams.append("&multiColumnSort=");
strbuffParams.append(XSSUtil.encodeForURL(context, strMultiColumnSort));
strbuffParams.append("&availableColumnMap=");
strbuffParams.append(XSSUtil.encodeForURL(context, availableColumnMap));
strbuffParams.append("&currentTableVisibleColumns=");
strbuffParams.append(XSSUtil.encodeForURL(context, currentTableVisibleColumns));
strbuffParams.append("&currentTableAttributeList=");
strbuffParams.append(XSSUtil.encodeForURL(context, currentTableAttributeList));
strbuffParams.append("&split=");
strbuffParams.append(iFreezePane);
strbuffParams.append("&mode=");
strbuffParams.append(XSSUtil.encodeForURL(context, strMode));
strbuffParams.append("&curTable=");
strbuffParams.append(XSSUtil.encodeForURL(context, curTable)); 
%>
  <!-- //XSSOK -->

  <div id="divPageBody" ><iframe name="customTable" id="customTable" width="100%" height="100%" frameborder="0" border="0"></iframe>
  		<iframe class="hidden-frame" name="customTableHidden" HEIGHT="0" WIDTH="0"></iframe>
<script>
var strCustomTable= "<%=strCustomTable%>";
var curTable = "<%=curTable%>";
var currentTableVisibleColumns = JSON.stringify(<%=(currentTableVisibleColumns)%>);

var currentTableAttributeList =  JSON.stringify(<%=(currentTableAttributeList)%>);
var url ="../common/emxCustomizedDataGrid.jsp?uiType="+'<%=XSSUtil.encodeForURL(context, strUIType)%>'+"&table="+"<%=table%>"+"&objectId="+'<%=XSSUtil.encodeForURL(context, strObjectId)%>'+"&customTable="+strCustomTable+"&sortColumnName="+'<%=XSSUtil.encodeForURL(context, strSortColumnName)%>'+"&sortDirection="+'<%=XSSUtil.encodeForURL(context, strSortColumnDirection)%>'+"&multiColumnSort="+'<%=XSSUtil.encodeForURL(context, strMultiColumnSort)%>'+"&currentTableVisibleColumns="+currentTableVisibleColumns+"&currentTableAttributeList="+currentTableAttributeList+"&split="+'<%=iFreezePane%>'+"&mode="+'<%=XSSUtil.encodeForURL(context, strMode)%>'+"&curTable="+curTable;
var strActionURL = url.substring(0,url.indexOf("?"));
var objForm = createRequestForm(url,"fromDataGrid");
	            		objForm.target =  "customTable";
	            		objForm.action = strActionURL;
	            		objForm.method = "post";
	            		objForm.submit();

var iFrameBlank=document.getElementsByName("submitHiddenFrame");
document.body.removeChild(iFrameBlank[0]);

</script>
  </div>
<div id="divPageFoot">
<table width="100%" border="0" align="center" cellspacing="2" cellpadding="3">
<tr>
<td class="buttons" align="right">
<table border="0" cellspacing="0">
<tr>
<!-- //XSSOK -->
<td><a class="footericon" href="javascript:;" onClick="onSubmit()"><img src="images/buttonDialogDone.gif" border="0" alt="<%=strHelpDone%>" /></a></td>
<!-- //XSSOK -->
<td><a onClick="return onSubmit();" class="button"><button class="btn-primary" type="button"><%=strHelpDone%></button></a></td>
<!-- //XSSOK -->
<td><a class="footericon" href="javascript:getTopWindow().closeWindow()"><img src="images/buttonDialogCancel.gif" border="0" alt="<%=strHelpCancel%>" /></a></td>
<!-- //XSSOK -->
<td><a onClick="javascript:getTopWindow().closeWindow()" class="button"><button class="btn-default" type="button"><%=strHelpCancel%></button></a></td>
</tr>
</table>
</td>
</tr>
</table>
</div>
</body>
</html>
