<%--  emxRouteRestart.jsp   -   The page will restart the route in "Resume Process" functionality

   Copyright (c) 1992-2020 Dassault Systemes.All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxRouteRestart.jsp.rca 1.2.3.2 Wed Oct 22 16:17:51 2008 przemek Experimental przemek $
--%>
<%@include file="../common/emxNavigatorInclude.inc"%>
<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file="../emxUICommonHeaderBeginInclude.inc"%>
<%@include file="../emxUICommonHeaderEndInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>

<%
	boolean bDateEmpty              = false;
    String dateAlertMsg = EnoviaResourceBundle.getProperty(context, "emxComponentsStringResource", context.getLocale(),"emxComponents.RouteDetails.AssigneeDueDateAlert");
    try {

		String strRouteId = emxGetParameter(request, "objectId");
		com.matrixone.apps.common.Route rtObj = new com.matrixone.apps.common.Route();
		rtObj.setId(strRouteId);

		String sRelRouteNode = DomainConstants.RELATIONSHIP_ROUTE_NODE;
		String attrDueDateOffset = PropertyUtil.getSchemaProperty(context, "attribute_DueDateOffset");
		String attrAssigneeDueDate = PropertyUtil.getSchemaProperty(context, "attribute_AssigneeSetDueDate");
		String attScheduledCompletionDate = PropertyUtil.getSchemaProperty(context, "attribute_ScheduledCompletionDate");
		String selDueDateOffset = "attribute[" + attrDueDateOffset + "]";
		String selAssigneeDueDate = "attribute[" + attrAssigneeDueDate + "]";
		String selScheduledCompletionDate = "attribute[" + attScheduledCompletionDate + "]";
		DomainObject RouteObject = new DomainObject(strRouteId);
		SelectList routeNodeObjectSelects = new SelectList();
		SelectList routeNodeRelationshipSelects = new SelectList();
		routeNodeRelationshipSelects.addElement(selDueDateOffset);
		routeNodeRelationshipSelects.addElement(selAssigneeDueDate);
		routeNodeRelationshipSelects.addElement(selScheduledCompletionDate);
		MapList routedNodeObjects = RouteObject.getRelatedObjects(context, sRelRouteNode, "*",
				routeNodeObjectSelects, routeNodeRelationshipSelects, false, true, (short) 1, "", "");
		for (int i = 0; i < routedNodeObjects.size(); i++) {
			Map nodeObjectMap = (Map) routedNodeObjects.get(i);
			String strScheduledCompletionDate = (String) nodeObjectMap.get(selScheduledCompletionDate);
			String strDueDateOffset = (String) nodeObjectMap.get(selDueDateOffset);
			String strAssigneeSetDueDate = (String) nodeObjectMap.get(selAssigneeDueDate);
			if ((strScheduledCompletionDate.equals("")) && (strDueDateOffset.equals(""))
					&& (strAssigneeSetDueDate.equals("No"))) {
				bDateEmpty = true;
				break;
			}

		}
		if (bDateEmpty == false) {
			rtObj.reStartRoute(context, rtObj);
		}
	} catch (Exception ex) {
		boolean clientTaskMessagesExists = false;
		clientTaskMessagesExists = MqlNoticeUtil.checkIfClientTaskMessageExists(context);
		ex.printStackTrace();

		if (ex.toString() != null && ex.toString().length() > 0 && !clientTaskMessagesExists) {
			emxNavErrorObject.addMessage(ex.toString());
		}
	}
%>
<% 
if (bDateEmpty == true)
  {
    
%>
<script type="text/javascript">
       alert ("<%=XSSUtil.encodeForJavaScript(context, dateAlertMsg)%>");
</script>
<%      
  }
%>
<%@include file="../common/emxNavigatorBottomErrorInclude.inc"%>
<%@include file="../emxUICommonEndOfPageInclude.inc"%>

<html>
<body>
<script language="JavaScript" src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<script language="javascript">
 
  //Refresh grahical task tab in portal
  var frameContent = emxUICore.findFrame(getTopWindow(), "APPTasksGraphical");
  frameContent = frameContent ?(frameContent.location.href == "about:blank" ? emxUICore.findFrame(getTopWindow(), "APPTask"):frameContent):null;
  if(frameContent != null ){
    frameContent.location.href = frameContent.location.href;        	
  }  
  window.parent.location.href = window.parent.location.href;
  
</script>
</body>
</html>
