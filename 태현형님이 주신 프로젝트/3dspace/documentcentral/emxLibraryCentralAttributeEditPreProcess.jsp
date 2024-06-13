<%--  Page Name   -   Brief Description
   Copyright (c) 1992-2019 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any
   actual or intended publication of such program


   static const char RCSID[] = "$Id: emxLibraryCentralAttributeEditPreProcess.jsp.rca 1.2.3.2 Wed Oct 22 16:02:42 2008 przemek Experimental przemek $";
   --%>

<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.classification.ClassificationAttributesCreationUtil"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file = "emxLibraryCentralUtils.inc" %>
<head>
<body>
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
		if(attributeName != null && ClassificationAttributesCreationUtil.isClassificationAttribute(context, attributeName)){
		    StringBuffer strUrl = new StringBuffer();
			strUrl.append("../common/emxForm.jsp?form=LBCAttributeEditForm&postProcessJPO=emxLibraryCentralCreateNewAttributes:updateAttributeData");
		    strUrl.append("&submitAction=refreshCaller&objectBased=false&StringResourceFileId=").append(stringResourceFileId).append("&objectName=");
		    strUrl.append(XSSUtil.encodeForURL(context, attributeName)).append("&findMxLink=false&suiteKey=LibraryCentral");
		    strUrl.append("&formHeader=emxLibraryCentral.Attributes.Edit&HelpMarker=emxhelpclassificationattributecreate&resetForm=true&mode=edit");
%>
		    <script>
		    	getTopWindow().showSlideInDialog('<%=strUrl.toString()%>', 'true');
        	</script>
<%
		}else{
			String messageNCA= EnoviaResourceBundle.getProperty(context, stringResourceFileId, request.getLocale(), "emxLibraryCentral.Attribute.NonCAEdit");
%>
			<script>
			    var vErrorMsg   = "<xss:encodeForJavaScript><%=messageNCA%></xss:encodeForJavaScript>";
			    alert(vErrorMsg);
			    getTopWindow().closeSlideInDialog();
			</script>
<%
		}
	} catch(Exception e) {
		e.printStackTrace();
	   	sbErrorMsg.append(e.getMessage());
	}
%>
</body>
</head>




