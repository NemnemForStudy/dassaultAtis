<%--  decProjectChangeProjectCodeDialogFS.jsp  
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   decProjectChangeProjectCodeDialogFS.jsp
   Created By thok 2023-07-24
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
  
  String strSetId = emxGetParameter(request, "objectId");
  String objectName = SetUtil.getCollectionName(context, strSetId);
  String sCharSet = Framework.getCharacterEncoding(request);
	 
  // Specify URL to come in middle of frameset
  StringBuffer contentURL = new StringBuffer(100);
  contentURL.append("decProjectChangeProjectCodeDialog.jsp");

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
  
  // Page Heading - Internationalized
  String PageHeading = "emxProgramCentral.Common.Project.ChangeProjectCode";
   
  // Marker to pass into Help Pages
  // icon launches new window with help frameset inside
  String HelpMarker = "emxhelpprojectsummary";

  
  fs.initFrameset(PageHeading,
                  HelpMarker,
                  contentURL.toString(),
                  false,
                  true,
                  false,
                  false);

  fs.setStringResourceFile("emxProgramCentralStringResource");
  
  fs.setObjectId(strSetId);

  String roleList = "role_GlobalUser";
  
  fs.createFooterLink("emxProgramCentral.Common.Change",
          "doneMethod()",
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
<style type="text/css">
	/* 페이지 헤더 제거 */
	#pageHeadDiv>form>div { display:none; }
</style>