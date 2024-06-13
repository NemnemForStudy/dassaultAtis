<%--  Page Name   -   Brief Description
   Copyright (c) 1992-2016 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any
   actual or intended publication of such program

   Description: Disconnects Child objects from Parent
   Parameters : ObjectId-parent objectId
                ChildIds to be Disconnected

   Author     :
   Date       :
   History    :

   static const char RCSID[] = "$Id: emxLibraryCentralObjectRemoveContentsProcess.jsp.rca 1.11 Wed Oct 22 16:02:42 2008 przemek Experimental przemek $"
--%>

<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file = "emxLibraryCentralUtils.inc" %>
<%@ include file = "../common/emxTreeUtilInclude.inc"%>

    <%@ page import    ="matrix.db.ClientTask,
                matrix.db.ClientTaskList,
                com.matrixone.json.JSONObject,
                com.matrixone.apps.domain.util.ContextUtil,
                com.matrixone.apps.framework.ui.UIUtil"%>
                
<%
  String sPart  = PropertyUtil.getSchemaProperty(context,"type_Part");
  String sGenericDocument  = PropertyUtil.getSchemaProperty(context,"type_GenericDocument");
  String sPartFamily = LibraryCentralConstants.TYPE_PART_FAMILY;
  String sGeneralClass   = LibraryCentralConstants.TYPE_GENERAL_CLASS;
  String sRelClassifiedItem =           LibraryCentralConstants.RELATIONSHIP_CLASSIFIED_ITEM;
  String sRelSubclass =   LibraryCentralConstants.RELATIONSHIP_SUBCLASS;
  String  sClassification = LibraryCentralConstants.TYPE_CLASSIFICATION ;
  String  sLibraries = LibraryCentralConstants.TYPE_LIBRARIES ;
  StringBuffer sbRemoveErrorMsg = new StringBuffer();
  Vector vecObjectIds = new Vector();
     //----Getting parameter from request---------------------------

  String parentId = emxGetParameter(request, "objectId");
  String childId = emxGetParameter(request, "childIds");
    
    String sObjId = "";
    String strSearchType = "";
    String childIds[] = null;
    int count=0;
    if(childId!= null) {
    StringTokenizer st   = new StringTokenizer(childId,",");
    int countToken = st.countTokens();
    childIds = new String[countToken];
    while(st != null && st.hasMoreTokens())
    {
      sObjId = (String)st.nextToken();
      childIds[count] = sObjId;
      vecObjectIds.addElement(sObjId);
      count++;
    }
  }
  DomainObject domObj = new DomainObject(sObjId);
  String objType = domObj.getInfo(context,"type");
  String languageStr         = request.getHeader("Accept-Language");
  String objectsNotRemoved = "";
  BusinessType busType = new BusinessType(objType,context.getVault());
  String  strParentType = busType.getParent(context);
  Classification baseObject =(Classification)DomainObject.newInstance(context,sPartFamily,LibraryCentralConstants.LIBRARY);
        try {
  if(objType != null && !objType.equals("") &&
      (strParentType.equals(sClassification))) {  objectsNotRemoved=baseObject.removeObjects(context,childIds,sRelSubclass,parentId,null );


  } else {
      strSearchType = (String)session.getAttribute("LCSearchType");
      objectsNotRemoved=baseObject.removeObjects(context,childIds,sRelClassifiedItem,parentId,strSearchType);
  }
  
  } catch(Exception e) {
    session.setAttribute("error.message",getSystemErrorMessage (e.getMessage()));
  }
        
  //BL
  int blErrIndex = objectsNotRemoved.indexOf("%");
  String blErrMsg = "";
  if(blErrIndex != -1)
  {
    blErrMsg = objectsNotRemoved.substring(blErrIndex+1);
    objectsNotRemoved = objectsNotRemoved.substring(0, blErrIndex);
  }
    
  int index = objectsNotRemoved.indexOf("|");
  String strResult = objectsNotRemoved.substring(index+1);
  objectsNotRemoved = objectsNotRemoved.substring(0,index);
  StringBuffer strObjNotRemovedName =new StringBuffer();
  StringTokenizer st   = new StringTokenizer(objectsNotRemoved,",");
  while(st.hasMoreTokens())
  {
    sObjId = st.nextToken().trim();
    DomainObject dObj = new DomainObject(sObjId);
    vecObjectIds.removeElement(sObjId);
    strObjNotRemovedName.append(dObj.getInfo(context,DomainObject.SELECT_NAME));
    strObjNotRemovedName.append(" ");

  }
  ClientTaskList clientTasks = context.getClientTasks();
    String strAlertMessage = null;
    for(ClientTask ct : clientTasks) {
        String body = ct.getTaskData();
        if(UIUtil.isNotNullAndNotEmpty(body)){
            String[] msgArray = body.split("#FSMP#");
            JSONObject jObject = new JSONObject(msgArray[1]);
            JSONObject msgObject = jObject.getJSONObject("data");
            strAlertMessage = msgObject.getString("message");
        }
    }
 if(strObjNotRemovedName.length() > 0) {
     if(strAlertMessage != null){
            sbRemoveErrorMsg.append("\n").append(strAlertMessage);
        }
     else if(blErrIndex != -1)
         sbRemoveErrorMsg.append(blErrMsg);
     else
         sbRemoveErrorMsg.append(EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource",new Locale(languageStr),"emxDocumentCentral.Message.ObjectsNotRemoved"));
     sbRemoveErrorMsg.append(" \n").append(strObjNotRemovedName.toString().trim());
  }
 context.clearClientTasks();
%>
<script language="javascript" src="../components/emxComponentsTreeUtil.js"></script>
<script language="javascript" src="emxLibraryCentralUtilities.js"></script>
<script language="javascript" type="text/javaScript">
    var vErrorMsg   = "<xss:encodeForJavaScript><%=sbRemoveErrorMsg.toString().trim()%></xss:encodeForJavaScript>";
    try {
        if(vErrorMsg != "") {
            alert(vErrorMsg);
        }
        // Changes added by PSA11 start(IR-536333-3DEXPERIENCER2018x).
        updateCountAndRefreshTreeLBC('<xss:encodeForJavaScript><%=appDirectory%></xss:encodeForJavaScript>',getTopWindow());
        // Changes added by PSA11 end.        
        getTopWindow().refreshTablePage();
    }catch (ex) {
        getTopWindow().refreshTablePage();
    }
</script>
