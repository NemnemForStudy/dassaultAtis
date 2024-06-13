<%--  decProjectChangeProjectCodeDialog.jsp   

   Copyright (c) 2003-2020 Dassault Systemes.All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

   decProjectChangeProjectCodeDialog.jsp
   Created By thok 2023-07-24
--%>
   
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "emxCompCommonUtilAppInclude.inc"%>
<%@include file = "emxUIConstantsInclude.inc"%>
<%@page import="com.matrixone.apps.domain.util.SetUtil,
                com.matrixone.apps.domain.util.XSSUtil"
%>
<%@include file = "../emxTagLibInclude.inc" %>

<%@ page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@ page import="com.dec.util.DecConstants"%>

<script language="JavaScript" src="scripts/emxUICollections.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="../common/scripts/emxUICalendar.js"></script>
<%@include file = "../emxUICommonHeaderBeginInclude.inc"%>
<%@include file = "../emxJSValidation.inc" %>

<%
  String languageStr = request.getHeader("Accept-Language");
  String jsTreeID    = emxGetParameter(request,"jsTreeID");
  String suiteKey    = emxGetParameter(request,"suiteKey");
  String strSetId 	 = emxGetParameter(request, "relId");
  String sCharSet    = Framework.getCharacterEncoding(request);
  
  DomainObject object = new DomainObject(strSetId);
  String projectType = object.getAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTTYPE);// Modified by thok 2023.09.18
  String projectCode = object.getName(context);
 %>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script language="Javascript" >

  function cancelMethod()
  {
	  getTopWindow().closeSlideInDialog();
  }
  function doneMethod()
  {
	  var projectCodeValue = document.editForm.projectCode.value;
	  projectCodeValue = projectCodeValue.trim();
	  var projectType = '<%=projectType%>';
	  
	  if(projectCodeValue==null || projectCodeValue=="") {
	        alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.input.decName</emxUtil:i18nScript>");
	        document.editForm.projectCodeValue.focus();
	        return;
	  } else if(projectType=='ongoing' && projectCodeValue.length > 7) {
          alert("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.Error.lessSevenName</emxUtil:i18nScript>");
          document.editForm.projectCodeValue.focus();
          return;
      }
	  
	  var confirmMsg = confirm("<emxUtil:i18nScript localize="i18nId">emxProgramCentral.alarm.changeProjectCode</emxUtil:i18nScript>");
 	  if(confirmMsg){
 		 	document.editForm.submit();
 	  } else{
 		  return;
 	  }
	  
  	  
  }
</script>
<%
    // ----------- set up the url to do the edit and refresh itself.
    StringBuffer editURL = new StringBuffer("decProjectChangeProjectCodeProcess.jsp?objectId=");
    
    editURL.append(strSetId);
    
%>
<!-- \\XSSOK -->
<form name="editForm"  target="pagehidden" method="post" onsubmit="doneMethod(); return false" action="<%=editURL.toString()%>">
<table border="0" width="100%" cellpadding="5" cellspacing="2">
  <tr>
    <td class="labelRequired"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.decName</emxUtil:i18n></td>
    <td class="inputField"><input type="text" onFocus="this.select()" name="projectCode" value="<%=projectCode%>_B"></td>
  </tr>
</table>
</form>

<%@include file = "../emxUICommonEndOfPageInclude.inc" %>
