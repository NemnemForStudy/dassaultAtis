<%--  emxGenericDeleteProcess.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxGenericDeleteProcess.jsp.rca 1.7.3.3 Tue Oct 28 22:59:38 2008 przemek Experimental przemek $
--%>
<%@page import="java.util.logging.Logger"%>
<%@ page import="com.matrixone.jdom.*,
                 com.matrixone.jdom.output.*"%>
<%@include file = "emxNavigatorInclude.inc"%>
<%@include file = "emxNavigatorTopErrorInclude.inc"%>
<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session"/>
<jsp:useBean id="tableBean" class="com.matrixone.apps.framework.ui.UITable" scope="session"/>
<jsp:useBean id="lifecycleBeanNew" class="com.matrixone.apps.framework.lifecycle.CalculateSequenceNumber" scope="session"/>
<%
Boolean errorOccured = Boolean.valueOf(false);
String href = "";
String responseXML = "";
String objectName = "";
String oId = "";

try
{
	/*href = "../common/emxTable.jsp?program=emxAEFUtil:getErrorObjectIds&table=AEFGenericDeleteErrorReport&sortColumnName=Type&HelpMarker=emxhelp_deleteerror&header=emxFramework.GenericDelete.ErrorReportHeader&customize=false&Export=true&PrinterFriendly=true&showClipboard=false&multiColumnSort=false&CancelButton=true&CancelLabel=emxFramework.Common.Close&pagination=0&autoFilter=false&TransactionType=update";*/
    	Logger logger=Logger.getLogger(this.getClass().getName());
	boolean isErrorOccured 	= false;
	boolean stopProcess	   	= false;
	boolean rootObject	   	= false;
	String memberIds[] 		= emxGetParameterValues(request,"emxTableRowId");
	/*logger.info(memberIds[]);*/	
	String objectId    		= emxGetParameter(request,"objectId");
	/*logger.info(objectId);*/
	String sbrootId    		= emxGetParameter(request,"rootId");
		
	String language    		= emxGetParameter(request,"Accept-Language");
	String timeStamp   		= emxGetParameter(request,"timeStamp");
	String uiType      		= emxGetParameter(request,"uiType");
        objectName                      = emxGetParameter(request,"objectName");
	logger.info(uiType);	
	/*if(uiType == null)
	    uiType = "Table";*/
	String sPackage = (String)emxGetParameter(request, "packageName");

    	if(sPackage == null || sPackage.trim().length()==0){
        	sPackage = "common";
        }
	for (String strTemp : memberIds){
		oId = strTemp;
             	DomainObject bo = DomainObject.newInstance(context,oId,sPackage);
        	String strKindOfPLMEntity = "type.kindof["+ PropertyUtil.getSchemaProperty(context, "type_PLMEntity") + "]";
        	String strKindOfProjectManagement = "type.kindof[" + PropertyUtil.getSchemaProperty("type_ProjectManagement") + "]";
        	String strKindOfInboxTask = "type.kindof[" + PropertyUtil.getSchemaProperty("type_InboxTask") + "]";
        	String strKindOfRouteTemplate = "type.kindof[" + PropertyUtil.getSchemaProperty("type_RouteTemplate") + "]";
        	StringList selectList = new StringList();
        	selectList.addElement(DomainConstants.SELECT_CURRENT);
        	selectList.addElement(strKindOfPLMEntity);
			selectList.addElement(strKindOfProjectManagement);
			selectList.addElement(strKindOfInboxTask);
			selectList.addElement(strKindOfRouteTemplate);
        	String symbolictype = FrameworkUtil.getAliasForAdmin(context, "type", bo.getInfo(context, bo.SELECT_TYPE), true);

        	Map objectDetails = bo.getInfo(context, selectList);
        	String sIsVPLMEntity  = (String)objectDetails.get(strKindOfPLMEntity); 
        	// This is for validation only. Check if the current state the user is viewing is actually the same as in database.
        	String sActualCurrentStateName = (String)objectDetails.get(DomainConstants.SELECT_CURRENT);
			String sIsKindOfProjectManagement = (String)objectDetails.get(strKindOfProjectManagement);
			String sIsKindOfInboxTask = (String)objectDetails.get(strKindOfInboxTask);
			String sIsKindOfRoteTemplate = (String)objectDetails.get(strKindOfRouteTemplate);
			if( "TRUE".equalsIgnoreCase(sIsKindOfProjectManagement) || "TRUE".equalsIgnoreCase(sIsKindOfInboxTask) || "TRUE".equalsIgnoreCase(sIsKindOfRoteTemplate) ){
				String createStateName = PropertyUtil.getSchemaProperty(context,"state_Create");
				if(!(createStateName.equalsIgnoreCase(sActualCurrentStateName))){
					errorOccured = Boolean.valueOf(true);
					objectName = UINavigatorUtil.getI18nString("delete.delete.cannot","emxENOLifecycleServicesStringResource",request.getHeader("Accept-Language"));
					break;
				}
			}
        	if("TRUE".equalsIgnoreCase(sIsVPLMEntity)){
        		String strCantPromoteType  = UINavigatorUtil.getI18nString("emxFramework.Type.PLMEntity.Engineering","emxFrameworkStringResource",request.getHeader("Accept-Language"));
        		errorOccured = Boolean.valueOf(true);
			objectName = "Operation is not supported for Engineering content. Please use Native apps instead";
		        break;
        	}
    	}

       
        if(!errorOccured.booleanValue()) 
        {
		
	HashMap requestMap 		= UINavigatorUtil.getRequestParameterMap(request);
	HashMap reqValuesMap    = UINavigatorUtil.getRequestParameterValuesMap(request);
	
	requestMap.put("RequestValuesMap", reqValuesMap); 
	requestMap.put("language",language);
	System.out.println("test");
	if(uiType != null && "StructureBrowser".equalsIgnoreCase(uiType) && timeStamp != null)
	{		
            HashMap tableData 	= indentedTableBean.getTableData(timeStamp);	    
	    TreeMap indexedList = (TreeMap)tableData.get("IndexedObjectList");	    
	    requestMap.put("IndexedObjectList",indexedList);	   
	    requestMap.put("uiType",uiType);
	}
	else if(uiType != null && "table".equalsIgnoreCase(uiType) && timeStamp != null)
	{
	    HashMap tableData   = tableBean.getTableData(timeStamp);	    
	    MapList objectList  = new MapList();	   
	    objectList   = (MapList)tableData.get("ObjectList");	 
	    requestMap.put("ObjectList",objectList);	 
	    requestMap.put("uiType",uiType);
	}
 
	String[] methodargs = JPO.packArgs(requestMap);	
	Map resultMap = null;
	         
	try 
	{
	    resultMap = (Map) JPO.invoke(context, "emxAEFUtil", null, "deleteSelectedObjects",methodargs, Map.class);
	} catch (Exception exJPO) 
	{
	     		                   
	    throw (new FrameworkException(exJPO.toString()));
	}  
	
	errorOccured     		= (Boolean) resultMap.get("errorOccured");	
	StringList erroredList  = (StringList) resultMap.get("erroredList");
	
	if(uiType != null && "StructureBrowser".equalsIgnoreCase(uiType))
	{		
	   responseXML	 = (String)resultMap.get("responseXML");
	}
	else if(uiType != null && "table".equalsIgnoreCase(uiType))
	{
	   MapList objectList  = (MapList)resultMap.get("ObjectList");	
	   HashMap tableData   = tableBean.getTableData(timeStamp);	
	   tableData.put("ObjectList",objectList);
	   tableBean.setTableData(timeStamp,tableData);
	   tableBean.setFilteredObjectList(timeStamp,objectList);
	   responseXML = "<mxRoot/>";
	}
	
	/*StringList taskList = lifecycleBeanNew.getClientTasks(context);	
	String xml 			= com.matrixone.apps.domain.util.FrameworkUtil.join(taskList,"");	
	HashMap tempMap 	= lifecycleBeanNew.getErrorMap(xml);	
	String errorxml		= null;
	if(errorOccured.booleanValue()) {
	    errorxml 		= lifecycleBeanNew.createAndSaveErrorXML(context,erroredList,tempMap);
	}
    href += "&errorxml="+errorxml;*/
    if(errorOccured.booleanValue()) {
	    responseXML = "Failed to delete the object";
            objectName = UINavigatorUtil.getI18nString("delete.delete.noright","emxENOLifecycleServicesStringResource",request.getHeader("Accept-Language"));//Error occurred while attempting to delete " + objectName;
    }
    else {
            responseXML = UINavigatorUtil.getI18nString("delete.delete.success","emxENOLifecycleServicesStringResource",request.getHeader("Accept-Language"));//"Successfully deleted the selected object";
    }

    context.clearClientTasks();
    String str = "Sucessfully deleted";
  }
} catch (Exception ex) { 
        	  
	if (ex.toString() != null && (ex.toString().trim()).length() > 0)
    	emxNavErrorObject.addMessage(ex.toString().trim() + " outer catch");		
	
}

%>

<html>
<head> 
<script language="JavaScript" src="scripts/emxUICore.js"></script> 
<script type="text/javascript" language="javascript">


//XSSOK
var responseXML  = "<%=responseXML%>";

function registerEvent()
{
	var contentWindow = getTopWindow().modalDialog.contentWindow;
 	if(isIE && isMaxIE10 && contentWindow)	
		contentWindow.attachEvent("onunload" , refresh);
	else if(contentWindow)
		contentWindow.addEventListener("unload" , refresh,false);
}

function refresh() 
{

 if(parent.removedeletedRows){
  	  parent.removedeletedRows(responseXML);
	  return;
  }
  
 if(parent.refreshTableData){	 
	  parent.refreshTableData();
	  return;
 }	
 
  if(getTopWindow().refreshTablePage){	 
	  getTopWindow().refreshTablePage();
	  return;
 }	
}
</script>
<script type="text/javascript" language="javascript">
parent.turnOffProgress();
<%if(errorOccured.booleanValue()) { %> 	 
	    alert("<%=objectName%>");	 		
<%	} else { %>  
		alert("Successfully deleted " + "<%=objectName%>");
<%} %>		
	
</script>
</head>
<body>
</body>
<%@include file = "emxNavigatorBottomErrorInclude.inc"%>
</html>
