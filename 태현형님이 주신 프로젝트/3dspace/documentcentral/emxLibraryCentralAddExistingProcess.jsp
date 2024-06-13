<%--  emxLibraryCentralAddExistingProcess.jsp
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

    static const char RCSID[] = $Id: emxLibraryCentralObjectAddContentsProcess.jsp.rca 1.6 Wed Oct 22 16:02:44 2008 przemek Experimental przemek $;

   --%>

<%@include file="../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file="emxLibraryCentralUtils.inc"%>
<%@include file="../common/emxTreeUtilInclude.inc"%>
<%@ include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<script language="JavaScript" src="../common/scripts/emxUIConstants.js"
    type="text/javascript"></script>
<%
    //----Getting parameter from request---------------------------

        String sRelSubclass       = LibraryCentralConstants.RELATIONSHIP_SUBCLASS;
        String parentId           = emxGetParameter(request, "objectId");
        String childIds[]         = getTableRowIDsArray(emxGetParameterValues(request, "emxTableRowId"));
        String folderContentAdd   = emxGetParameter(request,"folderContentAdd");
        String fromAction         = emxGetParameter(request, "fromAction");
        String useMode            = emxGetParameter(request, "useMode");
        boolean bAddStructure     = false;
        boolean bUpdateCount      = false;
        DomainObject parentobj    = new DomainObject(parentId);
        String sParentType        = parentobj.getInfo(context,DomainObject.SELECT_TYPE);
        boolean status            = false;
		boolean refreshPage		  = true;

		// Bad Query Change
		String languageStr      = request.getHeader("Accept-Language");
	    ArrayList<String> childIdsOKList = new ArrayList<String>();
		String sNoConnectMessage = "";
		boolean noConnectMsg = false;
		boolean connectSuccess = false;
		StringBuffer errorMessage = new StringBuffer();
		String[] childIdsOKArray = null;
		// Bad Query Change
	 
        //Getting the Appropriate Bean instance from the Object Id.
        try {

            useMode = UIUtil.isNullOrEmpty(useMode) ? "" : useMode;
            if ("addSubClass".equalsIgnoreCase(useMode)) {
                Classification baseObject = (Classification) DomainObject.newInstance(context,parentId,LibraryCentralConstants.TYPE_CLASSIFICATION);
                baseObject.addSubclass(context, childIds);
                bAddStructure                       = true;
                bUpdateCount                        = true;
            } else if ("addClassiFicationEndItem".equalsIgnoreCase(useMode)) {
                Classification baseObject = (Classification)DomainObject.newInstance(context,parentId,LibraryCentralConstants.TYPE_CLASSIFICATION);
                String strResult = (String) Classification.addEndItems(context, parentId, childIds);
                bUpdateCount                        = true;
            } else if ("addClass".equalsIgnoreCase(useMode)) {
				
				// Bad Query Change
				StringList childInfoSelectable = new StringList();
				childInfoSelectable.add("current.access[toconnect]");
				childInfoSelectable.add("id");
				MapList mlChildInfo = DomainObject.getInfo(context, childIds, childInfoSelectable);
				Iterator itr = mlChildInfo.iterator();
				String access = "";
				String isChildClass = "";
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
				
				childIdsOKArray = new String[childIdsOKList.size()];
				childIdsOKList.toArray(childIdsOKArray);
				// Bad Query Change
			
				if( !childIdsOKList.isEmpty() ){
					if (parentobj.isKindOf(context,LibraryCentralConstants.TYPE_CLASSIFICATION)) {
						Classification baseObject = (Classification)DomainObject.newInstance(context,parentId,LibraryCentralConstants.TYPE_CLASSIFICATION);
						baseObject.addSubclass(context, childIdsOKArray);
						bAddStructure                   = true;
						bUpdateCount                    = true;
					} else {
						Libraries baseObject = (Libraries) DomainObject.newInstance(context, parentId,LibraryCentralConstants.LIBRARY);
						baseObject.addSubclass(context, childIdsOKArray);
					}
					bAddStructure                       = true;
					bUpdateCount                        = true;
					//Duplicate Class HL, if there any errors during add Existing, since the bAddStructure is set
					//to true, the script would add it to the structure node.Hence checking whether the current
					//child that is getting added, is successful or not using the mql, if there is any failure
					//setting the bAddStructure to false
					if (childIdsOKArray != null) {
						for (int i = 0; i < childIdsOKArray.length; i++) {
							//String sObjId               = childIds[i];
							String sObjId               = childIdsOKArray[i];
							String output=MqlUtil.mqlCommand(context,"temp query bus \""+new DomainObject(sObjId).getInfo(context,DomainObject.SELECT_TYPE)+"\" \""+new DomainObject(sObjId).getInfo(context,DomainObject.SELECT_NAME)+"\"" +" * "+"where relationship[Subclass].from.id=="+ parentId +" select id");
							if(output==null || ("").equals(output)){
								bAddStructure           = false;
								bUpdateCount            = false;
							}
						}
					}
					connectSuccess = true;
				}
            } else if ("addToFolder".equalsIgnoreCase(useMode)) {
                String[] folderIds                  = new String[1];
                folderIds[0] = parentId;
                String objNameNotAdded              = DCWorkspaceVault.addToFolders(context, folderIds, childIds);
                bAddStructure                       = true;
            } else if ("addRetentions".equalsIgnoreCase(useMode) || "setRetentionSchedules".equalsIgnoreCase(useMode)) {
                if (childIds != null) {
                    for (int i = 0; i < childIds.length; i++) {
                        String sObjId               = childIds[i];
                        String retainedRel          = LibraryCentralConstants.RELATIONSHIP_RETAINED_RECORD;
                        DomainRelationship domrel   = new DomainRelationship();
                        DomainObject obj1           = new DomainObject(parentId);
                        domrel.connect(context, sObjId, retainedRel,parentId, true);
                    }
                }
            }
            status = true;
        } catch (Exception ex) {
			
            /*session.setAttribute("error.message",
                    getSystemErrorMessage(ex.getMessage()));*/
					
%>
			<script language="javascript">
				alert("<xss:encodeForJavaScript><%=getSystemErrorMessage(ex.getMessage())%></xss:encodeForJavaScript>");
			</script>
<%
			noConnectMsg = false;
        }

        String strChildIds = "";
        String[] addStructureChildId = null;
        if ("addToFolder".equalsIgnoreCase(useMode)) {
            for (int i = 0, j = 0; i < childIds.length; i++) {
                String sChildID     = childIds[i];
                DomainObject domObj = new DomainObject(sChildID);
                if (! (domObj.isKindOf(context, LibraryCentralConstants.TYPE_DOCUMENTS) || domObj.isKindOf(context, PropertyUtil.getSchemaProperty(context,"type_Part")))) {
                    strChildIds    += childIds[i] + ",";
                }
            }
            if(strChildIds.length()>0) {
                    strChildIds             = strChildIds.substring(0,strChildIds.length() - 1);
            }
        } else {
			if("addClass".equalsIgnoreCase(useMode)){
				strChildIds             = getTableRowIDsString(childIdsOKArray);
			} else {
				strChildIds             = getTableRowIDsString(childIds);
			}
        }
%>		
<%@include file="../common/emxNavigatorBottomErrorInclude.inc"%>
<script language="JavaScript" src="../components/emxComponentsTreeUtil.js" type="text/javascript"></script>
<script language="javascript" src="emxLibraryCentralUtilities.js"></script>
<script language="javascript" type="text/javaScript">
<%
		// Bad Query Change
		if(noConnectMsg){
			if(connectSuccess){
				sNoConnectMessage = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource", new Locale(languageStr),"emxLibraryCentral.Message.NoConnectAccessAddExistClass");
				sNoConnectMessage = sNoConnectMessage.replace("{0}", childIds.length-childIdsOKList.size()+"");
			} else {
				sNoConnectMessage = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource", new Locale(languageStr),"emxLibraryCentral.Message.CannotConnectAddExistClass");
				refreshPage = false;
			}
%>
			alert("<xss:encodeForJavaScript><%=sNoConnectMessage%></xss:encodeForJavaScript>");
<% 
		}
if(status && refreshPage){  %>
    try {
		var vTop         = "";
        var vCloseWindow = "";
		if(getTopWindow().getWindowOpener()=='undefined' || getTopWindow().getWindowOpener()==null)//non popup
			vTop = getTopWindow();
		else
			vTop = getTopWindow().getWindowOpener().getTopWindow();

        var vAddStructure = <xss:encodeForJavaScript><%=bAddStructure%></xss:encodeForJavaScript>;
        var vUpdateCount  = <xss:encodeForJavaScript><%=bUpdateCount%></xss:encodeForJavaScript>;
        if(vAddStructure) {
        	var childIds = '<xss:encodeForJavaScript><%=strChildIds%></xss:encodeForJavaScript>';
        	var childIdsArray = childIds.split(',');
        	for(var i=0;i<childIdsArray.length;i++)
        	{	vTop.addStructureTreeNode(childIdsArray[i],"<xss:encodeForJavaScript><%=parentId%></xss:encodeForJavaScript>","<xss:encodeForJavaScript><%=appDirectory%></xss:encodeForJavaScript>",vTop);
        	}
        }
        if (vUpdateCount) {
			 updateCountAndRefreshTreeLBC("<xss:encodeForJavaScript><%=appDirectory%></xss:encodeForJavaScript>",vTop);
        }
      
		vTop.refreshTablePage();
        getTopWindow().closeWindow();
    }catch (ex){
        getTopWindow().closeWindow();
    }
<% } else { %>
    var isFTS = getTopWindow().location.href.indexOf("common/emxFullSearch.jsp") != -1;
    if(isFTS) {
    	findFrame(getTopWindow(),"structure_browser").setSubmitURLRequestCompleted();
    }
<% } %>
</script>
