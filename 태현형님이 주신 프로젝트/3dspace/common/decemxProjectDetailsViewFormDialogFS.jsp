<%--  emxCollectionEditDialogFS.jsp   -   FS page for Editing Collection Details
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   decemxProjectDetailsViewFormDialogFS.jsp 
   Created By thok 2023-05-26
--%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
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
  
  String strSetId = emxGetParameter(request, "relId") == null ? emxGetParameter(request, "objectId") : emxGetParameter(request, "relId");
  String objectName = SetUtil.getCollectionName(context, strSetId);
  String sCharSet = Framework.getCharacterEncoding(request);
  
  String mode = emxGetParameter(request,"mode");
  // Specify URL to come in middle of frameset
  StringBuffer contentURL = new StringBuffer(100);
  contentURL.append("decemxProjectDetailsViewFormDialog.jsp");

  // add these parameters to each content URL, and any others the App needs
  contentURL.append("?suiteKey=");
  contentURL.append(suiteKey);
  contentURL.append("&initSource=");
  contentURL.append(initSource);
  contentURL.append("&jsTreeID=");
  contentURL.append(jsTreeID);

  contentURL.append("&objectName=");
  contentURL.append(FrameworkUtil.encodeNonAlphaNumeric(objectName,sCharSet));
  contentURL.append("&relId=");
  contentURL.append(strSetId);
  contentURL.append("&mode=");
  contentURL.append(mode);
  
  // Page Heading - Internationalized
  String PageHeading = "emxProgramCentral.Common.ProjectInfo";
  // Marker to pass into Help Pages
  // icon launches new window with help frameset inside
  String HelpMarker = "";

  
  fs.initFrameset(null,
                  HelpMarker,
                  contentURL.toString(),
                  false,
                  true,
                  false,
                  false);

  fs.setStringResourceFile("emxProgramCentralStringResource");
  
  if(mode.equalsIgnoreCase("view")){
	  fs.setToolbar("decProjectDetailsToolbar");
  }
  fs.setObjectId(strSetId);

  String roleList = "role_GlobalUser";
  
  if(ProgramCentralUtil.isNotNullString(mode) && mode.equalsIgnoreCase("edit")){
	  fs.createFooterLink("emxProgramCentral.Button.Done",
              "doneMethod()",
              roleList,
              false,
              true,
              "common/images/buttonDialogDone.gif",
              0);

              
	fs.createFooterLink("emxProgramCentral.Common.Cancel",
              "pageBack()",
              roleList,
              false,
              true,
              "common/images/buttonDialogCancel.gif",
              0); 
  }

  // ----------------- Do Not Edit Below ------------------------------

  fs.writePage(out);

%>
<style type="text/css">
	/* 페이지 헤더 제거 */
	#pageHeadDiv>form>table {display:none;}
	.separator {display:none;}
</style>