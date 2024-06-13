<%-- emxProgramCentralBookmarkConversionProcess.jsp

  Copyright (c) 1992-2020 Dassault Systemes.

  All Rights Reserved.
  This program contains proprietary and trade secret information of MatrixOne,
  Inc.  Copyright notice is precautionary only and does not evidence any actual
  or intended publication of such program.

--%>

<%@include file="emxProgramGlobals2.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>

<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>
<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<%
   ProjectSpace project = (ProjectSpace) DomainObject.newInstance(context, DomainConstants.TYPE_PROJECT_SPACE,DomainConstants.PROGRAM);

   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   //Get parameters from URL
   String projectId = emxGetParameter(request,"objectId");

   project.setId(projectId);
   String newWorkspaceRootId = project.bookmarkConversion(context, projectId);

   String strOld = "objectId="+projectId;
   String strNew = "objectId="+newWorkspaceRootId;

   /*Enumeration requestParams = emxGetParameterNames(request);
   StringBuilder url = new StringBuilder();
   String stringURL = "../common/emxIndentedTable.jsp?Export=false";
   
   if(requestParams != null){
      String param = "";
      String value = "";

      while (requestParams.hasMoreElements()) {
         param = (String) requestParams.nextElement();
         value = emxGetParameter(request, param);
         url.append("&" + param);

         if ("objectId".equals(param))
            url.append("=" + XSSUtil.encodeForURL(context, newWorkspaceRootId));
         else if ("parentOID".equals(param))
            url.append("=" + XSSUtil.encodeForURL(context, newWorkspaceRootId));
         else
            url.append("=" + XSSUtil.encodeForURL(context, value));
      }
      stringURL += url.toString();
   }
        
   stringURL += "&submitURL=../programcentral/emxProgramCentralUtil.jsp&mode=PMCFolder&objectId="+newWorkspaceRootId;
   */
 
%>
  <script language="javascript">
  
	
	var strNewId = "<%=strNew%>";
	var strOldId = "<%=strOld%>";
    //parent.document.location.href = strUrl;
	strUrl = parent.document.location.href;
	strUrl = strUrl.replaceAll(strOldId, strNewId)
    parent.document.location.href = strUrl;
  </script>
<%
  
   
%>

</script>
