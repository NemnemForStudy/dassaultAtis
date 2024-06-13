<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@include file="../emxUIFramesetUtil.inc"%>
<%@include file="../common/emxCompCommonUtilAppInclude.inc"%>

<%
    framesetObject fs = new framesetObject();

    fs.setDirectory( appDirectory );

    // ----------------- Do Not Edit Above ------------------------------
    // Page Heading - Internationalized
    String PageHeading = emxGetParameter(request, "pageHeading");
    String mode = emxGetParameter(request, "mode");
    String projectId = emxGetParameter(request, "projectId");
	String unitId = emxGetParameter(request, "objectId");
	boolean isDashboard = Boolean.valueOf( emxGetParameter(request, "isDashboard") );
	
	boolean isProject = projectId.equals(unitId);
	
	String contentURL = "../programcentral/decProjectKeyQtyReportHeaderDialog.jsp?";
	contentURL += emxGetQueryString(request);
	contentURL += "&isProject=" + String.valueOf(isProject);
	
    // Marker to pass into Help Pages
    String HelpMarker = "emxhelppartcreate";  

    String strRoleList = "role_GlobalUser";

    fs.initFrameset( PageHeading,
                     HelpMarker,
                     contentURL,
                     true,   // show printer friendly icon
                     true,   // is a dialog Page
                     false,   // show pagination icon
                     false ); // show conversion icon

    fs.setStringResourceFile( "emxProgramCentralStringResource" );

    // ----------------- Do Not Edit Below ------------------------------
    
    // Dashboard인 경우 표시하지 않음
    if ( !isDashboard )
    {
		// Unit인 경우에만 저장 처리 수행
		if ( "Summary".equalsIgnoreCase(mode) && !isProject )
		{
		    fs.createFooterLink("Input",
		                      "fnDone()",
		                      "role_GlobalUser",
		                      false,
		                      true,
		                      "common/images/buttonDialogDone.gif",
		                      0);
		}
	    
	    
	    fs.createFooterLink( "Cancel",
	    					 "parent.window.closeWindow()",
				             "role_GlobalUser",
				             false,
				             true,
				             "common/images/buttonDialogCancel.gif",
				             1 );
    	
    }
    
    //fs.enableSpreadSheetPage();
  
    fs.writePage(out); 
%>

<script>
function fnShowHideFilter() {
	window.frames['pagecontent'].fnShowHideFilterImplement();
}
function fnCloseSearchDiv() {
	window.frames['pagecontent'].document.getElementById("filterDiv").style.display = "none";
}
function fnSetURL(url) {
	location.href = url;
}
</script>