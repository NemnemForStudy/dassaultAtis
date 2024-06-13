<%--  decTableMaterCloneProcess.jsp

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: AEFSearchUtil.jsp.rca 1.1 Wed Jan 14 05:57:06 2009 ds-smourougayan Experimental przemek $
--%>
<%@include file = "emxNavigatorInclude.inc"%>
<script language="javascript" src="../common/scripts/emxUICore.js"></script>
<script language="javascript" src="../common/scripts/emxUIUtility.js"></script>
<script language="javascript" src="scripts/emxUIConstants.js"></script>
<%
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
String fieldNameActual = emxGetParameter(request, "fieldNameActual");
String uiType = emxGetParameter(request, "uiType");
String typeAhead = emxGetParameter(request, "typeAhead");
String frameName = emxGetParameter(request, "frameName");
String frameNameForField = emxGetParameter(request, "frameNameForField");
String fieldNameDisplay = emxGetParameter(request, "fieldNameDisplay");
String emxTableRowId[] = emxGetParameterValues(request, "emxTableRowId");
StringBuffer actualValue = new StringBuffer();
StringBuffer displayValue = new StringBuffer();
StringBuffer OIDValue = new StringBuffer();
StringBuffer PIDValue = new StringBuffer();
DomainObject doNew = new DomainObject();
String sType = "decCodeMaster";
String sPolicy = "decCodeMaster";
String sdecMasterType ="Table";
for(int i=0;i<emxTableRowId.length;i++) {
    StringTokenizer strTokenizer = new StringTokenizer(emxTableRowId[i] , "|");
    String strObjectId = strTokenizer.nextToken();
    String strProjectId = strTokenizer.nextToken();
    
	System.out.println("strObjectId: " +strObjectId);
	System.out.println("strProjectId: " +strProjectId);

    DomainObject codeMasterDom = new DomainObject(strObjectId);
    String sName = codeMasterDom.getName(context);
    
    DomainObject projectDom = new DomainObject(strProjectId);
    String sRev = projectDom.getName(context);
    
    try {
		ContextUtil.startTransaction(context, true);

		doNew.createObject(context, sType, sName, sRev, sPolicy, "eService Production");
		//doNew.setDescription(context, sDesc);
		doNew.setAttributeValue(context, "decMasterType", sdecMasterType);
		// doNew.setRelationshipValue(context, "Assignees", sAssignees);
		String busId = doNew.getId(context);
		
		DomainRelationship.connect(context, projectDom, "decCodeMasterRel",
							new DomainObject(busId));
		//returnMap.put(ChangeConstants.ID, busId);
		ContextUtil.commitTransaction(context);
	} catch (Exception e) {
		ContextUtil.abortTransaction(context);
		e.printStackTrace();
		throw new FrameworkException(e);
	}
     
}                       
%>

<script language="javascript" type="text/javaScript">
	
	
	getTopWindow().refreshTablePage();
	//const fr = window;
	//  const fr0 = window.top
	
	//fr.location.reload();
		
		
	//	window.parent.location.reload();
	//getTopWindow().closeWindow();
	//parent.opener.parent.location.href = parent.opener.parent.location.href;

</script>
