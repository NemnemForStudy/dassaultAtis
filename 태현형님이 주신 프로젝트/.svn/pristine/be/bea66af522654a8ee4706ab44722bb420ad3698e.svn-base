<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@include file="../common/emxNavigatorInclude.inc"%>
<%@include file = "../emxTagLibInclude.inc"%>

<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<script language="javascript" src="../common/scripts/emxUIModal.js"></script>

<%
try {
	String objectId = emxGetParameter(request, "objectId");
	String sRealParentOID = emxGetParameter(request, "realParentOID");
	objectId = StringUtils.isNotEmpty(sRealParentOID) ? sRealParentOID : objectId;
	String sMode = emxGetParameter(request, "mode");
	String sPortalCmdName = emxGetParameter(request, "portalCmdName");
	
	String strSuiteKey = null;
    String tableRowId = null;
    
    String searchTypes = null;
    String searchTable = null;
    String excludeProg = null;
    String includeProg = null;
    String submitHRef = null;
    String strToolbar = null;
    String strRelationship = null;
    String strExpandProgram = null;
    String strDirection = null;
    String modeTypes = null;
    String strSelection = "multiple";
    String strShowSavedQuery = "True";
    String strSearchCollectionEnabled = "True";
    String strCancelLabel = "emxRequirements.Button.Cancel";
    boolean showCancelButton = true;
    boolean showInitialResults = false;
 
    String strShowClipboard = "True";
    String strPrinterFriendly = "True";
    String strObjectCompare = "True";
    //String strCustomize = "True";
    String strExport = "True";
    String strMultiColumnSort = "True";
    String strTriggerValidation = "True";
    String strExpandLevelFilter = "True";
    String strAutoFilter = "True";
	
	if ( "decCodeDetail".equals(sMode) )
	{
		searchTypes = "type_decCodeDetail";
		searchTable = "AEFGeneralSearchResults";
		submitHRef = "../dsk/dskAddExistingProcessUtil.jsp?objectId=" + objectId +
				"&relName=decCodeDetailRel" +
				"&getFrom=true";
	}
	
	if ( StringUtils.isNotEmpty(sPortalCmdName) )
	{
		submitHRef += "&portalCmdName=" + sPortalCmdName;
	}
	
	String dialogUrl = "../common/emxFullSearch.jsp" +
            "?field=TYPES%3D" + searchTypes +
     	    "&sortColumnName=none" + 
            "&table=" + searchTable +
            (excludeProg == null || excludeProg.length() == 0? "": "&excludeOIDprogram=" + excludeProg) +
            "&selection=" + strSelection +
            "&suiteKey=" + strSuiteKey +
            "&cancelButton=" + showCancelButton + 
            "&header=emxRequirements.Heading.SearchResult" + 
            "&cancelLabel=" + strCancelLabel +
            "&showInitialResults=" + showInitialResults + 
            "&HelpMarker=emxhelpfullsearch" +
            "&emxTableRowId=" + tableRowId +
            "&formInclusionList=" + modeTypes + 
            "&includeOIDprogram=" + includeProg + 
            "&submitAction=refreshCaller" + 
            
            (strShowClipboard == null           || strShowClipboard.length()           == 0? "": "&showClipboard=" + strShowClipboard) +
	   		   (strPrinterFriendly == null         || strPrinterFriendly.length()         == 0? "": "&PrinterFriendly=" + strPrinterFriendly) +
	           (strObjectCompare == null           || strObjectCompare.length()           == 0? "": "&objectCompare=" + strObjectCompare) +
	           // (strCustomize == null               || strCustomize.length()               == 0? "": "&customize=" + strCustomize) +
	           (strExport == null                  || strExport.length()                  == 0? "": "&Export=" + strExport) + 
	           (strMultiColumnSort == null         || strMultiColumnSort.length()         == 0? "": "&multiColumnSort=" + strMultiColumnSort) + 
	           (strTriggerValidation == null       || strTriggerValidation.length()       == 0? "": "&triggerValidation=" + strTriggerValidation) + 
	           (strExpandLevelFilter == null       || strExpandLevelFilter.length()       == 0? "": "&expandLevelFilter=" + strExpandLevelFilter) +
	           (strAutoFilter == null       	   || strAutoFilter.length()	          == 0? "": "&autoFilter=" + strAutoFilter) +
	
            (strSearchCollectionEnabled == null || strSearchCollectionEnabled.length() == 0? "": "&searchCollectionEnabled=" + strSearchCollectionEnabled) +
            (strShowSavedQuery == null          || strShowSavedQuery.length()          == 0? "": "&showSavedQuery=" + strShowSavedQuery) +
            (submitHRef == null                 || submitHRef.length()                 == 0? "": "&submitURL=" + submitHRef) +
            (strExpandProgram == null           || strExpandProgram.length()           == 0? "": "&expandProgram=" + strExpandProgram) +
            (strToolbar == null                 || strToolbar.length()                 == 0? "": "&toolbar=" + strToolbar);
%>	
<script type="text/javascript">
showModalDialog("<xss:encodeForJavaScript><%=dialogUrl%></xss:encodeForJavaScript>", 750, 500, true);
</script>
<%
} catch(Exception e) {
	ContextUtil.abortTransaction(context);
	e.printStackTrace();
	throw e;
}
%>