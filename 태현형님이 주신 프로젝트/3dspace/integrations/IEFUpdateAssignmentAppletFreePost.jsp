<%--  MCADUpdateAssignmentAppletFreePost.jsp

   Copyright (c) 2016 Dassault Systemes. All rights reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes and its subsidiaries. Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>


<%@ page import="com.matrixone.MCADIntegration.utils.*,com.matrixone.MCADIntegration.server.managers.IEFBrowserCommandsManager" %>
<%@ page import="java.util.ArrayList" %>
<%@page import = "com.matrixone.apps.domain.util.*" %>
<%@page contentType="text/html; charset=UTF-8"%>

<%@page import = "matrix.db.*, matrix.util.*, com.matrixone.MCADIntegration.utils.*, com.matrixone.MCADIntegration.server.managers.* , com.matrixone.MCADIntegration.server.beans.*,com.matrixone.MCADIntegration.server.managers.IEFBrowserCommandsManager" %>
<%@ page import="java.util.*" %>
<%
MCADIntegrationSessionData integSessionData = (MCADIntegrationSessionData) session.getAttribute("MCADIntegrationSessionDataObject");
Context context								= integSessionData.getClonedContext(session);

String Command			= request.getParameter("Command");
String selectedUser	= request.getParameter("selectedUser");
String selectedUserType			= request.getParameter("selectedUserType");
String assignedIntegrationsGCONames			= request.getParameter("assignedIntegrationsGCONames");

Hashtable paramTable = new Hashtable();

paramTable.put("Command", Command); 
paramTable.put("selectedUser", selectedUser);
paramTable.put("selectedUserType", selectedUserType);
paramTable.put("assignedIntegrationsGCONames", assignedIntegrationsGCONames);

IEFBrowserCommandsManager brwManr = new IEFBrowserCommandsManager(paramTable);

IEFServerResponse  resp =brwManr.updateAssignments(paramTable,  "",  integSessionData);

String respCode =resp.getResponseCode();
String respResult =(String)resp.getOutputObject();	
%>
