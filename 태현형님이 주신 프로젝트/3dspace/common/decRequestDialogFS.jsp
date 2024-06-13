<%--  decRequestDialogFS.jsp   -   FS page for Editing Collection Details
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   decRequestDialogFS.jsp
   Created By thok 2023-06-29
--%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@page import="com.matrixone.apps.domain.util.SetUtil"%>  
<%@page import="com.dec.util.DecConstants"%>     
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
  String openType = emxGetParameter(request,"openType");
  openType = ProgramCentralUtil.isNullString(openType) ? DecConstants.EMPTY_STRING : openType;
  
  String strSetId = emxGetParameter(request,"objectId");
  String openerFrame = emxGetParameter(request,"openerFrame");
  String objectName = "";//SetUtil.getCollectionName(context, strSetId);
  String sCharSet = Framework.getCharacterEncoding(request);
  String mode = emxGetParameter(request,"mode");
  // Specify URL to come in middle of frameset
  StringBuffer contentURL = new StringBuffer(100);
  contentURL.append("decRequestDialog.jsp");
  
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
  contentURL.append("&openerFrame=");
  contentURL.append(openerFrame);
  
  // Page Heading - Internationalized
  String PageHeading = DecConstants.EMPTY_STRING;
  String decRequestOriginator = DecConstants.EMPTY_STRING;
  String decContentResponse = DecConstants.EMPTY_STRING;
  
  if(mode.equalsIgnoreCase("create")){
	  PageHeading = "emxProgramCentral.Label.RequestCreate";
  } else if(mode.equalsIgnoreCase("view")){
	  PageHeading = "emxProgramCentral.Label.RequestView";
  } else if(mode.equalsIgnoreCase("edit")){
	  PageHeading = "emxProgramCentral.Label.RequestEdit";
  } else if(mode.equalsIgnoreCase("response")){
	  PageHeading = "emxProgramCentral.Label.RequestResponse";
  } else if(mode.equalsIgnoreCase("responseEdit")){
	  PageHeading = "emxProgramCentral.Label.RequestResponse";
  }
  
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
  
  if(mode.equalsIgnoreCase("view")){
	  fs.setToolbar("decRequestToolbar"); 
  }
  
  String roleList = "role_GlobalUser";
  
  if(openType.length() == 0){//메일 형식이 아닐때
	  if(mode.equalsIgnoreCase("create") || mode.equalsIgnoreCase("edit") || mode.equalsIgnoreCase("response") || mode.equalsIgnoreCase("responseEdit")){
		  fs.createFooterLink("emxProgramCentral.Button.Confirm",
		          "doneMethod()",
		          roleList,
		          false,
		          true,
		          "common/images/buttonDialogDone.gif",
		          0);
	  }
	  
	  if(mode.equalsIgnoreCase("edit") || mode.equalsIgnoreCase("response") || mode.equalsIgnoreCase("responseEdit")){
		  fs.createFooterLink("emxProgramCentral.Button.Cancel",
		          "pageBack()",
		          roleList,
		          false,
		          true,
		          "common/images/buttonDialogDone.gif",
		          0);
	  } else{
		  fs.createFooterLink("emxProgramCentral.Common.Close",
		          "closeMethod()",
		          roleList,
		          false,
		          true,
		          "common/images/buttonDialogCancel.gif",
		          0);
	  }  
  }
  
  // ----------------- Do Not Edit Below ------------------------------

  fs.writePage(out);
%>
<%if(mode.equalsIgnoreCase("create") || mode.equalsIgnoreCase("edit") || mode.equalsIgnoreCase("complete")) {%>
<style type="text/css">
	/* 페이지 헤더 제거 */
	#pageHeadDiv>form>div { display:none; }
</style>
<%}%>