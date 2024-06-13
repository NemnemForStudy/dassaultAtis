
<%--  emxTeamMigrationSelectMembersProcess.jsp  -

   Intermediate JSP to update the fields by the object Id of the selected Object

   Copyright (c) 1992-2017 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = "$Id: emxTeamMigrationSelectMembersProcess.jsp.rca 1.17 Wed Oct 22 16:18:42 2008 przemek Experimental przemek $";
--%>

<%@page import="com.matrixone.apps.framework.ui.UIUtil"%>
<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%-- <%@page import="com.matrixone.apps.common.Search"%> --%>
<%@page import="com.matrixone.apps.domain.util.FrameworkException"%> 
<%@page import="com.matrixone.apps.domain.util.i18nNow"%>

<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session"/>

<%!
  private static final String COMPONENT_FRAMEWORK_BUNDLE = "emxComponentsStringResource";
  private static final String ALERT_MSG = "emxComponents.Search.Error.24";
  
%>


<%
try
{

  String strObjname = "";
  String strTableRowId = emxGetParameter(request,"emxTableRowIdActual");
  String id="";
  String name = "";
  String resourceIn = "";
  java.util.StringTokenizer st = new java.util.StringTokenizer(strTableRowId, "|");
    id = st.nextToken();
    name = st.nextToken();
    if(UIUtil.isNotNullAndNotEmpty(name)){
    	java.util.StringTokenizer st1 = new java.util.StringTokenizer(name, ":");
    	name = st1.nextToken();
		if(st1.hasMoreElements()){
	    	resourceIn = st1.nextToken();
		}
    }
   
    String searchString = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", context.getLocale(), "emxFramework.SearchDialog.GetHeader");

%>
<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<script language="javascript" src="../common/scripts/emxUIConstants.js"></script>
<script src="../webapps/AmdLoader/AmdLoader.js"></script>
<script language="javascript">
  function guid() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
  
  function setAndRefresh()
    {
		var searchcom_socket;
		var socket_id = guid();
		var searchheader = "<%=searchString%>";
		require(['UWA/Utils/InterCom'], function(InterCom) {
			var searchcom_socket = new InterCom.Socket(socket_id, {
            dispacthRetryInterval: 0
        });
              
		searchcom_socket.subscribeServer('SearchComServer', getTopWindow().opener.getTopWindow());
		if (searchcom_socket) {
			var command_data = {"app_socket_id":socket_id,"widget_id":socket_id};
			var name = "<%=name %>" ;
			var resourceIn = "<%=resourceIn %>" ;
			var resourceInArray = resourceIn.split(',');
			command_data.resourceid_in = resourceInArray;
			searchcom_socket.dispatchEvent('UpdateInContextSearch', command_data);
		if(getTopWindow().opener.getTopWindow() && getTopWindow().opener.getTopWindow().divSearchHeadDescription){
			getTopWindow().opener.getTopWindow().divSearchHeadDescription.innerText = searchheader+" " + name;
		}
		//make the above and below string internationalized
		if(getTopWindow().opener.getTopWindow().divSearchHeadDescription && getTopWindow().opener.getTopWindow().divSearchHeadDescription[0]){
			getTopWindow().opener.getTopWindow().divSearchHeadDescription[0].innerText = searchheader+" " + name;
		}
			
			}else{
					throw new Error('Socket not initialized');
				}
		setTimeout( function closeWindow(){
			getTopWindow().close();
		  }, 500 );
			});
    }
  
  
</script>

<html>
<body onload=setAndRefresh()>
</body>
</html>

<%
} // End of try
catch(Exception ex) {
   session.putValue("error.message", ex.getMessage());
 } // End of catch
%>

