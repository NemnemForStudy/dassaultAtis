<%--  emxCollectionEditDialogFS.jsp   -   FS page for Editing Collection Details
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   decCreateConstructionKPIDialogFS.jsp
   Created By jhlee 2023-07-06
--%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.domain.util.SetUtil"%>       
<%@include file="../emxUIFramesetUtil.inc"%>
<%@include file="emxCompCommonUtilAppInclude.inc"%>

<%
  framesetObject fs = new framesetObject();

  fs.setDirectory(appDirectory);
  fs.setSubmitMethod(request.getMethod());

  String initSource = emxGetParameter(request,"initSource");
  if (initSource == null){
    initSource = "";
  }
  
  String jsTreeID = emxGetParameter(request,"jsTreeID");
  String suiteKey = emxGetParameter(request,"suiteKey");
  
  String sObjectId = emxGetParameter(request, "objectId");
  String sCharSet = Framework.getCharacterEncoding(request);
	 
  // Specify URL to come in middle of frameset
  StringBuffer contentURL = new StringBuffer(100);
  contentURL.append("decCreateConstructionKPIDialog.jsp");

  // add these parameters to each content URL, and any others the App needs
  contentURL.append("?suiteKey=");
  contentURL.append(suiteKey);
  contentURL.append("&initSource=");
  contentURL.append(initSource);
  contentURL.append("&jsTreeID=");
  contentURL.append(jsTreeID);
  contentURL.append("&objectId=");
  contentURL.append(sObjectId);

  // Page Heading - Internationalized
  String PageHeading = "ProgramCentral.Label.ConstructionKPICreate";
   
  // Marker to pass into Help Pages
  // icon launches new window with help frameset inside
  String HelpMarker = "";

  
  fs.initFrameset(PageHeading,
                  HelpMarker,
                  contentURL.toString(),
                  false,
                  true,
                  false,
                  false);

  fs.setStringResourceFile("emxProgramCentralStringResource");
  
  fs.setObjectId(sObjectId);

  String roleList = "role_GlobalUser";
  
  fs.createFooterLink("emxProgramCentral.Button.Done",
          "doneMethod()",
          roleList,
          false,
          true,
          "common/images/buttonDialogDone.gif",
          0);
  fs.createFooterLink("emxProgramCentral.Common.Apply", 
		  "applyChanges()", 
		  roleList,
          false, 
          true, 
          "common/images/buttonDialogDone.gif", 
          0);
          
  fs.createFooterLink("emxProgramCentral.Common.Cancel",
          "cancelMethod()",
          roleList,
          false,
          true,
          "common/images/buttonDialogCancel.gif",
          0); 

  // ----------------- Do Not Edit Below ------------------------------

  fs.writePage(out);

%>
