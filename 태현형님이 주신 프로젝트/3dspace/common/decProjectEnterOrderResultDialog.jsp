<%--  decProjectEnterOrderResultDialog.jsp   

   Copyright (c) 2003-2020 Dassault Systemes.All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

   decProjectEnterOrderResultDialog.jsp
   Created By thok 2023-08-11
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
  	  document.editForm.submit();
  }
</script>
<%
	try{
    // ----------- set up the url to do the edit and refresh itself.
    StringBuffer editURL = new StringBuffer("decProjectEnterOrderResultProcess.jsp?objectId=");
    
    editURL.append(strSetId);
    
%>
<!-- \\XSSOK -->
<form name="editForm"  target="pagehidden" method="post" onsubmit="doneMethod(); return false" action="<%=editURL.toString()%>">
<table border="0" width="100%" cellpadding="5" cellspacing="2">
  <tr>
    <td class="inputField">
    	<div>
	      <input type="radio" id="Win" name="projectStatus" value="Win"checked>
	      <label for="Win"><emxUtil:i18n localize="i18nId">emxProgramCentral.ProjectSpace.Complete.Bidding</emxUtil:i18n></label>
	    </div>
      	<div>
	      <input type="radio" id="Withdraw" name="projectStatus" value="Withdraw">
	      <label for="Withdraw"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.ProjectStatus.Withdraw</emxUtil:i18n></label>
	    </div>
	    <div>
	      <input type="radio" id="Exclude" name="projectStatus" value="Exclude">
	      <label for="Exclude"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.ProjectStatus.Exclude</emxUtil:i18n></label>
	    </div>
	    <div>
	      <input type="radio" id="Fail" name="projectStatus" value="Fail">
	      <label for="Fail"><emxUtil:i18n localize="i18nId">emxProgramCentral.Label.ProjectStatus.Fail</emxUtil:i18n></label>
	    </div>
	</td>
  </tr>
  <tr>
    <td class="label"><emxUtil:i18n localize="i18nId">emxProgramCentral.ProjectSpace.EnterOrderResult.Reason</emxUtil:i18n></td>
  </tr>
  <tr>
    <td class="inputField"><textarea cols="25" rows="5" onFocus="this.select()" name="reason"></textarea></td>
  </tr>
</table>
</form>
<%	
	} 
	catch(Exception e)
	{
		e.printStackTrace();
		throw e;
	}
%>
<%@include file = "../emxUICommonEndOfPageInclude.inc" %>
