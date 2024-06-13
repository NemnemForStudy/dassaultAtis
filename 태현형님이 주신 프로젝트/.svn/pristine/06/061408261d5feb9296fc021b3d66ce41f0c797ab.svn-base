<%--  emxCollectionsDetailsFS.jsp   - FS Detail page for Collections.
   Copyright (c) 2005-2020 Dassault Systemes.All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxCollectionsDetailsFS.jsp.rca 1.18 Wed Oct 22 15:48:50 2008 przemek Experimental przemek $
--%>
<%@page import="com.matrixone.apps.domain.util.SetUtil"%>
<%@include file="../emxUIFramesetUtil.inc"%>
<%@include file="emxCompCommonUtilAppInclude.inc"%>

<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.decUITableIndented" scope="session"/>
   
<%
try {
  framesetObject fs = new framesetObject();
  fs.setDirectory(appDirectory);
  fs.setSubmitMethod(request.getMethod());

  String initSource = emxGetParameter(request,"initSource");
  if (initSource == null){
    initSource = "";
  }
  
  String sCharSet               = Framework.getCharacterEncoding(request);
  String jsTreeID               = emxGetParameter(request,"jsTreeID");
  String suiteKey               = emxGetParameter(request,"suiteKey");
  String objectId               = emxGetParameter(request,"objectId");
  String language               = request.getHeader("Accept-Language");
  

  String PageHeading = XSSUtil.encodeForURL(context, "Searching");
  StringBuffer contentURL = new StringBuffer("../common/decFilterSlideinDialog.jsp");
  //Added for BUG : 346390  
  // add these parameters to each content URL, and any others the App needs
  contentURL.append("?suiteKey=");
  contentURL.append(suiteKey);
  contentURL.append("&" + emxGetQueryString(request));
  
  String finalURL       = contentURL.toString();
  // Marker to pass into Help Pages
  // icon launches new window with help frameset inside
  String HelpMarker     = "emxhelpcollectionproperties";

  fs.useCache(false);
  fs.setObjectId(objectId);
  fs.setOtherParams(UINavigatorUtil.getRequestParameterMap(request));
  fs.initFrameset(PageHeading,HelpMarker,finalURL,true,false,false,false);
  fs.setStringResourceFile("emxFrameworkStringResource");
  
  String roleList = "role_GlobalUser";
  
  fs.createFooterLink("emxFramework.Label.Init",
          "fnInit()",
          roleList,
          false,
          true,
          "common/images/iconActionReset.png",
          0);
  
  fs.createFooterLink("emxFramework.Common.Done",
                      "fnDone()",
                      roleList,
                      false,
                      true,
                      "common/images/buttonDialogDone.gif",
                      0);

                      
  fs.createFooterLink("emxFramework.State.Incident.Close",
                      "fnClose()",
                      roleList,
                      false,
                      true,
                      "common/images/buttonDialogCancel.gif",
                      0);

  fs.writePage(out);
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>

<script>
function fnCloseFromChild() {
	window.close();
}
</script>
