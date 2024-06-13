<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@include file="../emxUIFramesetUtil.inc"%>
<%@include file="emxCompCommonUtilAppInclude.inc"%>

<%
    framesetObject fs = new framesetObject();

    fs.setDirectory( appDirectory );

    // ----------------- Do Not Edit Above ------------------------------
    String contentURL = "decCodeMasterImportExcel.jsp";

    // Page Heading - Internationalized
    String PageHeading = "Excel Import";

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
    					 "parent.window.closeWindow()",
			             "role_GlobalUser",
			             false,
			             true,
			             "common/images/buttonDialogCancel.gif",
			             1 );
    
    //fs.enableSpreadSheetPage();
  
    fs.writePage(out); 
%>
