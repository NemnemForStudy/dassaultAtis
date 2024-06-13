<%--  Page Name   -   Brief Description
   Copyright (c) 1992-2019 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any
   actual or intended publication of such program


   static const char RCSID[] = "$Id: emxLibraryCentralAttributeDeletionProcess.jsp.rca 1.2.3.2 Wed Oct 22 16:02:42 2008 przemek Experimental przemek $";
   --%>

<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file = "emxLibraryCentralUtils.inc" %>

<%
    String objIds[] = emxGetParameterValues(request,"emxTableRowId");
    StringBuffer sbErrorMsg = new StringBuffer();
	String attributeName = null;
	String stringResourceFileId = emxGetParameter(request ,"StringResourceFileId");
    Locale locale = request.getLocale();    
   
    if(objIds != null) {
        String[] aNameArray = getTableRowIDsArray(objIds);
        attributeName = aNameArray[0];
    }
	try {
		if(attributeName != null){
			String errorText = ClassificationAttributesCreationUtil.deleteClassificationAttribute(context, attributeName, stringResourceFileId, locale, false);
			if(errorText != null){
				sbErrorMsg.append(errorText);
			}
		}
	} catch(Exception e) {
	   sbErrorMsg.append(e.getMessage());
	}
%>
<script language=javascript>
    var vErrorMsg   = "<xss:encodeForJavaScript><%=sbErrorMsg.toString().trim()%></xss:encodeForJavaScript>";
    if (vErrorMsg != "") {
        alert(vErrorMsg)
    } else {
        getTopWindow().refreshTablePage();
    }
</script>




