<%--  
  (c) Dassault Systemes, 1993 - 2020.  All rights reserved.
--%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.dec.util.DecMatrixUtil"%>
<%@include file = "emxNavigatorInclude.inc"%>
<html style="width:99%;height:98%">
<head>
 <script src="scripts/emxUIConstants.js" type="text/javascript"></script>

<script type="text/javascript" src="../common/scripts/emxUICore.js"></script>
<script type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../common/scripts/jquery-latest.js"></script>
<script type="text/javascript" src="../common/scripts/decFilter.js"></script>
<script src="scripts/emxUICore.js" type="text/javascript"></script>
<%
	String jspPage = emxGetParameter(request, "jsp");
	String projectCode = emxGetParameter(request, "projectCode");
	String objectId = DecMatrixUtil.getObjectId(context, DecConstants.TYPE_PROJECT_SPACE, projectCode);
	
	StringBuilder sbURL = new StringBuilder();
	if(DecStringUtil.isNotEmpty(objectId)){
		sbURL.append(jspPage);
		sbURL.append("?objectId=").append(objectId);
		sbURL.append("&").append(emxGetQueryString(request));
	}
%>
<script>
$('.topbar-cmd.extrabtn.fonticon.fullscreen-off-icon.fonticon-resize-fullscreen-off').on('click',function(){
	alert('a');
});

$('.fullscreen-icon.ifwe-action-icon.fonticon.fonticon-resize-fullscreen.clickable').on('click',function(){
	alert('a');
});
</script>

</head>
<body style="width:99%;height:97%">
<iframe frameborder="0" id="content" name="content" width="100%" height="100%" src="<%=sbURL.toString()%>" sandbox="allow-modals allow-scripts allow-same-origin allow-popups"></iframe>
</body>
</html>