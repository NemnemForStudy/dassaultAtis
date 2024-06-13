<%--
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   Created by thok decProjectComparisonSelectionCheck.jsp 2023-09-06
--%>
<%@page import="com.matrixone.apps.program.ProgramCentralConstants"%>
<%@page import="com.dec.util.DecConstants"%> 
<%@page import="com.matrixone.apps.program.ProgramCentralUtil"%>
<%@include file = "../emxUICommonHeaderBeginInclude.inc"%>
<%@include file = "emxNavigatorInclude.inc"%>
<emxUtil:localize id="i18nId" bundle="emxProgramCentralStringResource" locale='<xss:encodeForHTMLAttribute><%= request.getHeader("Accept-Language") %></xss:encodeForHTMLAttribute>' />
<%
	String languageStr 		= request.getHeader("Accept-Language");
	String[] emxTableRowId 	= emxGetParameterValues(request, "emxTableRowId");
	emxTableRowId 			= ProgramCentralUtil.parseTableRowId(context, emxTableRowId);
	String strMsg 			= DecConstants.EMPTY_STRING;
	String strURL			= DecConstants.EMPTY_STRING;
	
	try{

		if(emxTableRowId==null){
			strMsg = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Alert.ProjectMaterialComparisonNoSelection", context.getSession().getLanguage());
			%>
			<script type="text/javascript" language="javascript">
				alert('<%=XSSUtil.encodeForJavaScript(context,strMsg)%>');	
			</script>
			<%
            return;
		}
		
		if(emxTableRowId.length==1){
			strMsg = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Alert.ProjectMaterialComparisonOneSelection", context.getSession().getLanguage());
			%>
			<script type="text/javascript" language="javascript">
				alert('<%=XSSUtil.encodeForJavaScript(context,strMsg)%>');	
			</script>
			<%
            return;
		} else if(emxTableRowId.length > 3){
			strMsg = EnoviaResourceBundle.getProperty(context, ProgramCentralConstants.PROGRAMCENTRAL,"emxProgramCentral.Alert.ProjectMaterialComparisonOverSelection", context.getSession().getLanguage());
			%>
			<script type="text/javascript" language="javascript">
				alert('<%=XSSUtil.encodeForJavaScript(context,strMsg)%>');	
			</script>
			<%
            return;
		}
		
		StringBuffer projectName = new StringBuffer();
		for(int i=0;i<emxTableRowId.length;i++){
			String id = emxTableRowId[i];
			DomainObject object = new DomainObject(id);
			projectName.append(object.getInfo(context, "name"));
			if(i!=emxTableRowId.length){
				projectName.append("|");
			}
		}

		strURL = "../common/emxPortal.jsp?portal=decProjectComparisonPortal&showPageHeader=true&header=Project Material Comparison";
		strURL+= "&projectName=" + projectName.toString();
		
	}catch(Exception e){
 	   throw new MatrixException(e);
	}
%>
	 <script language="javascript" type="text/javaScript">
		 var strUrl = "<%=strURL%>";
	     showModalDialog(strUrl,2000,1000);
     </script>

<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>