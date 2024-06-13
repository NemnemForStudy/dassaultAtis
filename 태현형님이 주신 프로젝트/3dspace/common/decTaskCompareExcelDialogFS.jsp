<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@include file="../emxUIFramesetUtil.inc"%>
<%@include file="emxCompCommonUtilAppInclude.inc"%>

<%
    framesetObject fs = new framesetObject();

    fs.setDirectory( appDirectory );

    // ----------------- Do Not Edit Above ------------------------------
	String sParentOID = emxGetParameter(request, "parentOID");
	String sType = emxGetParameter(request, "type");
// 	String contentURL = "decTaskCompareExcelDialog.jsp?parentOID=" + sParentOID + "&type=" + sType;
	String contentURL = "decTaskCompareExcelDialog.jsp?";
	contentURL += emxGetQueryString(request);
    // Page Heading - Internationalized
    String PageHeading = "Excel Import";
	switch (sType) {
	case "KeyQtyMaster":
		PageHeading = "Key Q'ty Master Import";
		fs.setToolbar("decSampleExcelDownloadToolbarKeyQtyMaster");
		break;
	case "KeyQty":
		String cutOff =	emxGetParameter(request, "cutOff");
		PageHeading = "Key Q'ty Excel Import - " + cutOff.replace("_", ". ");
		fs.setToolbar("decSampleExcelDownloadToolbarKeyQty");
		break;
	case "CodeMasterCreate":
		PageHeading = "Code Master Create Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarCodeMasterCreate");
		break;
	case "CodeMasterAdd":
		PageHeading = "Code Master Add Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarCodeMasterAdd");
		break;
	case "KPI":
		DomainObject doProject = DomainObject.newInstance(context, sParentOID);
		String sProjectStartDate = doProject.getAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTARTDATE);
    	if(DecStringUtil.isEmpty(sProjectStartDate)) {
    		// W1 Base Date 안정해서 에러라고 띄우기
    		%>
    		<script>
    			alert("W1 Base Date is Empty.");
    			window.close();
    		</script>
    		<%
    		return;
    	}
		PageHeading = "Construction KPI Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarKPI");
		break;
	case "CWP":
		PageHeading = "CWP Master Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarCWP");
		break;
	case "CWPPlan":
		PageHeading = "CWP Plan Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarCWPPlan");
		break;
	case "IWP":
		PageHeading = "IWP Execution Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarIWP");
		break;
	case "CWPNo":
		PageHeading = "CWP No Excel Import";
		fs.setToolbar("decSampleExcelDownloadToolbarCWPNo");
		break;
	case "BMTracking":
		PageHeading = "BMTracking Excel Import";
		break;
	default:
		break;
	}
	contentURL += "&PageHeading=" + PageHeading;
    // Marker to pass into Help Pages
    String HelpMarker = "emxhelppartcreate";  

    String strRoleList = "role_GlobalUser";

    fs.initFrameset( PageHeading,
                     HelpMarker,
                     contentURL,
                     false,   // show printer friendly icon
                     false,   // is a dialog Page
                     false,   // show pagination icon
                     false ); // show conversion icon

    fs.setStringResourceFile( "emxFrameworkStringResource" );

    // ----------------- Do Not Edit Below ------------------------------
    fs.createFooterLink( "Import",
                         "importExcelData()",
                         "role_GlobalUser",
                         false,
                         true,
                         "common/images/buttonDialogDone.gif",
                         0 );
    fs.createFooterLink( "Cancel",
    					 "top.close()",
			             "role_GlobalUser",
			             false,
			             true,
			             "common/images/buttonDialogCancel.gif",
			             1 );
    
    //fs.enableSpreadSheetPage();
  
    fs.writePage(out); 
%>
