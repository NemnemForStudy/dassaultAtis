<%--  emxRouteStart.jsp  --  Promote Route Object
  Copyright (c) 1992-2020 Dassault Systemes.
  All Rights Reserved.
  This program contains proprietary and trade secret information of MatrixOne,Inc.
  Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

  static const char RCSID[] = $Id: emxRouteStart.jsp.rca 1.22 Wed Oct 22 16:17:57 2008 przemek Experimental przemek $
 --%>

<%@include file = "../emxUICommonAppInclude.inc"%>
<%-- <%@include file = "emxRouteInclude.inc"%> --%>
<%-- <%@include file = "../common/enoviaCSRFTokenValidation.inc"%> --%>



<script type="text/javascript">

function launchSelectAssigneeModal(routeId){		
	if(parent.window.launchSelectAssigneeModal){
		parent.window.launchSelectAssigneeModal(routeId);
	}
}

launchSelectAssigneeModal('<%=emxGetParameter(request,"objectId")%>');


</script>


