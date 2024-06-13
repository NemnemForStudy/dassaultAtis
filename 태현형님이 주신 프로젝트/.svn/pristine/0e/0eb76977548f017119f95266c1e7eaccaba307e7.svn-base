<%--  emxLibraryCentralObjectAddEndItems.jsp
   Copyright (c) 1992-2016 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne, Inc.
   Copyright notice is precautionary only and does not evidence any
   actual or intended publication of such program

   Description: Add contents to given Buisness object
   Parameters : childIds
                objectId

   Author     :
   Date       :
   History    :

    static const char RCSID[] = $Id: emxLibraryCentralObjectAddEndItems.jsp.rca 1.9 Wed Oct 22 16:02:16 2008 przemek Experimental przemek $;

   --%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file = "emxLibraryCentralUtils.inc" %>

<%@ page import    ="matrix.db.ClientTask,
                 matrix.db.ClientTaskList,
                 com.matrixone.json.JSONObject,
                 com.matrixone.apps.domain.util.ContextUtil,
                 com.matrixone.apps.framework.ui.UIUtil"%>
<%
    String languageStr      = request.getHeader("Accept-Language");
    String sClassification  = LibraryCentralConstants.TYPE_CLASSIFICATION;
    String parentId         = emxGetParameter(request, "objectId");
    String childIds[]       = getTableRowIDsArray(emxGetParameterValues(request,"emxTableRowId"));
    String folderContentAdd = emxGetParameter(request, "folderContentAdd");
    ArrayList<String> childIdsOKList = new ArrayList<String>();
     String sNoConnectMessage = "";
     boolean noConnectMsg = false;
     boolean connetedEndItems = false;
     StringBuffer errorMessage = new StringBuffer();
    try{
        StringList childInfoSelectable = new StringList();
        childInfoSelectable.add("current.access[toconnect]");
        childInfoSelectable.add("id");
        MapList mlChildInfo = DomainObject.getInfo(context, childIds, childInfoSelectable);
        Iterator itr = mlChildInfo.iterator();
        String access = "";
        String objId = "";
        while(itr.hasNext()){
             Map childInfo = (Map)itr.next();
            access = (String)childInfo.get("current.access[toconnect]");
            objId = (String)childInfo.get("id");
            if(access.equalsIgnoreCase("TRUE"))
                childIdsOKList.add(objId);
            else if(!noConnectMsg)
                noConnectMsg = true;
        }

        String strResult = "";
        if(!childIdsOKList.isEmpty()){
            String[] childIdsOKArray = new String[childIdsOKList.size()];
            childIdsOKList.toArray(childIdsOKArray);
            strResult  = (String)Classification.addEndItems(context,parentId,childIdsOKArray);
            connetedEndItems = true;
        }
    } catch(Exception e) {
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
        String errMsgTemp = e.getMessage();
        if(errMsgTemp != null){
            int blErrIndex = errMsgTemp.indexOf("BL_ERROR%");
            if (blErrIndex != -1) // BL Error
                errMsgTemp = errMsgTemp.substring(blErrIndex+9);
            errMsgTemp = getSystemErrorMessage(errMsgTemp);
            if(errMsgTemp.startsWith("Connect failed for relationship Classified Item from")){
                errMsgTemp = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource", new Locale(languageStr),"emxMultipleClassification.AddExisting.Error");
                errorMessage = new StringBuffer(errMsgTemp);
            }else{
                errorMessage.append("\\n").append(errMsgTemp);
            }
            if(strAlertMessage != null){
                errorMessage.append("\\n").append(strAlertMessage);
            }

      // Changes added by PSA11 start(IR-532768-3DEXPERIENCER2018x).
    if(errorMessage.toString().isEmpty())
          errorMessage.append(EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource", new Locale(languageStr),"emxLibraryCentral.Message.TypeNotClassifiable"));
        // Changes added by PSA11 end.
        }
        noConnectMsg = false;
        context.clearClientTasks();
    }
%>

<script language="JavaScript" src="../components/emxComponentsTreeUtil.js" type="text/javascript"></script>
<script language="JavaScript" src="emxLibraryCentralUtilities.js" type="text/javascript"></script>
<script language="javascript" type="text/javaScript">
<% 
if(noConnectMsg){
    if(connetedEndItems){
        sNoConnectMessage = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource", new Locale(languageStr),"emxLibraryCentral.Message.NoConnectAccess");
        sNoConnectMessage = sNoConnectMessage.replace("{0}", childIds.length-childIdsOKList.size()+"");
    }else
        sNoConnectMessage = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource", new Locale(languageStr),"emxLibraryCentral.Message.CannotConnectObjectAddItem");
%>
    alert("<%=sNoConnectMessage%>");
<%
} else if(!"".equals(errorMessage.toString())){
%>    
    alert("<%=errorMessage.toString()%>");
<%    
} %>     

    try {
     <% if(connetedEndItems){%>
        var vTop         = "";
        if(getTopWindow().getWindowOpener()=='undefined' || getTopWindow().getWindowOpener()==null)//non popup
            vTop = getTopWindow();
        else
            vTop = getTopWindow().getWindowOpener().getTopWindow();
        updateCountAndRefreshTreeLBC("<xss:encodeForJavaScript><%=appDirectory%></xss:encodeForJavaScript>", vTop);
        getTopWindow().closeWindow();
    
    <%}%>
    }catch (ex){
        getTopWindow().closeWindow();
    }
</script>

