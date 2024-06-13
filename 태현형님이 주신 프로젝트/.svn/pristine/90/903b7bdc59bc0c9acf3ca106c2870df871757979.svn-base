<%--
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxComponentsCreatePeopleDialog.jsp.rca 1.29 Wed Oct 22 16:17:46 2008 przemek Experimental przemek $
--%>
<%@ page import="java.util.Enumeration,java.util.Map,java.util.HashMap,java.util.Hashtable,matrix.db.*" %>
<%@ page import="com.matrixone.apps.domain.util.MapList,com.matrixone.apps.domain.DomainObject,com.matrixone.apps.domain.util.MqlUtil" %>
<%@ page import="matrix.util.MatrixException, matrix.util.StringList" %>
<%@ page import="com.matrixone.apps.domain.util.i18nNow" %>
<%@ page import="com.dec.util.DecConstants" %>

<%@ include file="emxProgramGlobals2.inc" %>
<%@ include file="../emxUICommonAppInclude.inc"%>
<%
	//out.write("<script language=\"javascript\">var response = confirm(\"Do U Want to Proceed?\") </script>");
    
    String languageStr = request.getHeader("Accept-Language");
    String strInvokedFrom   = emxGetParameter(request,"invokedFrom");
	String[] emxTableRowId = emxGetParameterValues(request, "emxTableRowIdActual");// Modified by thok on 2023.08.09; emxTableRowId -> emxTableRowIdActual
	emxTableRowId = ProgramCentralUtil.parseTableRowId(context, emxTableRowId);
	
	//Modified by thok on 2023.05.17 --- [S]
	String mode = emxGetParameter(request,"mode");
	String objectId = "";
	if("Sole".equalsIgnoreCase(mode)){
		emxTableRowId = new String[] {emxGetParameter(request,"objectId")};
		objectId = emxTableRowId[0];
	}
	//Modified by thok on 2023.05.17 --- [E]
	
	String totalNumObjects = emxGetParameter(request,"totalNumObjects");
	String timeStamp = emxGetParameter(request,"timeStamp");
	String SuiteDirectory = emxGetParameter(request,"SuiteDirectory");
	String command = emxGetParameter(request,"switch");
	String program = emxGetParameter(request,"program");
	String languageStr1 = emxGetParameter(request,"Accept-Language");
	
	String[] JPOarr = program.split(":");
	String JPOProgram = JPOarr[0];
	String JPOFunction = JPOarr[1];

	

	Map requestMap = new HashMap();
	requestMap.put("languageStr",languageStr);
	requestMap.put("timeStamp",timeStamp);
	requestMap.put("SuiteDirectory",SuiteDirectory);
	requestMap.put("command",command);
	requestMap.put("emxTableRowId",emxTableRowId);
	
	StringList selectable = new StringList();
	selectable.add(ProgramCentralConstants.SELECT_CURRENT);
	selectable.add(ProgramCentralConstants.SELECT_NAME);
	selectable.add(ProgramCentralConstants.SELECT_ID);
	selectable.add(DecConstants.SELECT_ATTRIBUTE_DECPROJECTTYPE);
	
	MapList selectedObjectInfoList = DomainObject.getInfo(context, emxTableRowId, selectable);
	MapList invalideOperationObjectList = new MapList();
	Iterator selectedObjectInfoListIterator = selectedObjectInfoList.iterator();

	while(selectedObjectInfoListIterator.hasNext())
	{
		Map objectInfo = (Map)selectedObjectInfoListIterator.next();
		String objectState = (String)objectInfo.get(ProgramCentralConstants.SELECT_CURRENT);
		String bidding = (String)objectInfo.get(DecConstants.SELECT_ATTRIBUTE_DECPROJECTTYPE);
		
		//Modified by thok on 2023.05.11 --- [S]
		if(!"bidding".equalsIgnoreCase(bidding) && (!command.equalsIgnoreCase("Hold") && !command.equalsIgnoreCase("Resume"))){//입찰 프로그램이 아닐 경우 && Modified by thok on 2023.07.27 - 중단,재시작이 아닐경우
			String noBiddingMsg = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
	        		"emxProgramCentral.HoldAndCancel.errMsg5", languageStr);
			
			%>
	        <script type="text/javascript" language="javascript">
				alert('<%=XSSUtil.encodeForJavaScript(context,noBiddingMsg)%>');	
			</script>
	          <%
	          return;
		}
		//Modified by thok on 2023.05.12 --- [E]
				
		//Modified by thok on 2023.07.27 --- [S]		
		if(command.equalsIgnoreCase("Hold")){
			objectId = (String)objectInfo.get("id");
			DomainObject object = new DomainObject(objectId);
			object.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_HOLD);
		} else if(command.equalsIgnoreCase("Resume")){
			objectId = (String)objectInfo.get("id");
			DomainObject object = new DomainObject(objectId);
			object.setAttributeValue(context, DecConstants.ATTRIBUTE_DECPROJECTSTATUS,DecConstants.ATTRIBUTE_DECPROJECTSTATUS_RANGE_INPROGRESS);
		}
		//Modified by thok on 2023.07.27 --- [E]
		
		if(ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD.equalsIgnoreCase(command) && (ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD.equalsIgnoreCase(objectState) || ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL.equalsIgnoreCase(objectState))){
			invalideOperationObjectList.add(objectInfo);
			selectedObjectInfoListIterator.remove();
		} else if (ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL.equalsIgnoreCase(command) && ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL.equalsIgnoreCase(objectState)){
			invalideOperationObjectList.add(objectInfo);
			selectedObjectInfoListIterator.remove();
		} else if ("Resume".equalsIgnoreCase(command) && !(ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_HOLD.equalsIgnoreCase(objectState) || ProgramCentralConstants.STATE_PROJECT_SPACE_HOLD_CANCEL_CANCEL.equalsIgnoreCase(objectState))){
			invalideOperationObjectList.add(objectInfo);
			selectedObjectInfoListIterator.remove();
		}
	}
	
	
	
  	try{
        String errMsg1 = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
        		"emxProgramCentral.HoldAndCancel.errMsg1", languageStr);
        String errMsg2 = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
        		"emxProgramCentral.HoldAndCancel.errMsg2", languageStr);
        int size = selectedObjectInfoList.size();
	    	if(size > 0){
	    		String[] objectIds = new String[size];
	    		
	    		for(int i=0;i<size;i++)
	    		{
	    			Map objectInfo = (Map)selectedObjectInfoList.get(i);
	    			String projectId = (String)objectInfo.get(ProgramCentralConstants.SELECT_ID);
	    			objectIds[i] = projectId;
	    		}
	    		requestMap.put("emxTableRowId",objectIds);
	    	
	    	
   		String[] args = JPO.packArgs(requestMap);
    	StringList returnValue = (StringList) JPO.invoke(context,JPOProgram,null,JPOFunction,args,StringList.class);
	    	}
        
    	
    	if(null != invalideOperationObjectList && invalideOperationObjectList.size() > 0){
    	
        StringBuffer msg = new StringBuffer();
          
    		String errMsgCmd = ProgramCentralConstants.EMPTY_STRING;
            if("Hold".equals(command)){
            	errMsgCmd = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
                		"emxProgramCentral.Common.Project.Hold", languageStr);
            }
            else if("Cancel".equals(command)){
            	errMsgCmd = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
                		"emxProgramCentral.Common.Gate.Cancel", languageStr);
            }
            else if("Resume".equals(command)){
                errMsgCmd = EnoviaResourceBundle.getProperty(context, "ProgramCentral", 
                		"emxProgramCentral.Common.Project.Resume", languageStr);
            }
            
    		msg.append(errMsg1 + " " + errMsgCmd + " " + errMsg2);//TODO
    		for(int i=0;i<invalideOperationObjectList.size();i++){
    			Map objectInfo = (Map)invalideOperationObjectList.get(i);
    			String projectName = (String)objectInfo.get(ProgramCentralConstants.SELECT_NAME);
    			if(i<invalideOperationObjectList.size()-1)
    			    msg.append(projectName + ",");
    			else
    				msg.append(projectName);
    		}
    		if(msg.toString().length() > 0) {    	    	   
    	          %>
    	          <script type="text/javascript" language="javascript">
    				alert('<%=XSSUtil.encodeForJavaScript(context,msg.toString())%>');	
				</script>
    	          <%
    	      }
    	}
    	 %>
         <script type="text/javascript" language="javascript">
         if(e.data && e.data.headerOnly){
 			headerOnly=e.data.headerOnly;
 		} 
 		if(imageManagerToolbar == undefined || imageManagerToolbar == null){
 			imageManagerToolbar = "";
 		}
 		if(imageUploadCommand == undefined || imageUploadCommand == null){
 			imageUploadCommand = "";
 		}

 		var url = "../common/emxExtendedPageHeaderAction.jsp?action=refreshHeader&objectId="+oID+"&documentDropRelationship="
 					+documentDropRelationship+"&documentCommand="+documentCommand+"&showStatesInHeader="+showStatesInHeader
 					+"&imageDropRelationship="+imageDropRelationship+"&MCSURL="+sMCSURL+"&imageManagerToolbar="+imageManagerToolbar+"&imageUploadCommand="+imageUploadCommand+"&showDescriptionInHeader="+showDescriptionInHeader;

 		jQuery.ajax({
 		    url : url,
 		    cache: false
 		})
 		.success( function(text){
 			if (text.indexOf("#5000001")>-1) {
 				var wndContent = getTopWindow().findFrame(getTopWindow(), "detailsDisplay");
 				if (wndContent) {
 					var tempURL ="../common/emxTreeNoDisplay.jsp";
 					wndContent.location.href = tempURL;
 				}

 			}else {
 			jQuery('#ExtpageHeadDiv').html(text);
 			if(!headerOnly){
 			getTopWindow().emxUICategoryTab.redrawPanel();
 			}

 			var extpageHeadDiv = jQuery("#ExtpageHeadDiv");
 			if(extpageHeadDiv.hasClass("page-head")){
 				jQuery(".mini").addClass("hide");
 				jQuery(".full").removeClass("hide");
 			}
 			else{


 				jQuery(".full").addClass("hide");
 				jQuery(".mini").removeClass("hide");
 			}
 			adjustNavButtons();
 			if (!headerOnly) {
 				var objStructureFancyTree = getTopWindow().objStructureFancyTree;
 				if(objStructureFancyTree && getTopWindow().bclist && getTopWindow().bclist.getCurrentBC().fancyTreeData){
 					objStructureFancyTree.reInit(getTopWindow().bclist.getCurrentBC().fancyTreeData, true);
 				}else{
 				refreshStructureTree();
 				}
 				var wndContent = getTopWindow().findFrame(getTopWindow(), "detailsDisplay");
 				if (wndContent) {
 					var tempURL = wndContent.location.href;
 					tempURL = tempURL.replace("persist=true","persist=false");
 					if(isIE){
 						for (var property in wndContent)
 						{
 						   if (property != 'name' && wndContent.hasOwnProperty(property))
 								   wndContent[property] = null;
 						}
 						wndContent.document.body.innerHTML = "";
 						wndContent.document.head.innerHTML = "";
 					}
 					wndContent.location.href = tempURL;
 				}
 			}
 			if(headerOnly && getTopWindow().getWindowOpener() && getTopWindow().getWindowOpener() == getTopWindow().opener)
 			{
 				jQuery("div",jQuery("div#divExtendedHeaderNavigation")).not("div.field.previous.button, div.field.next.button,div.field.refresh.button , div.field.resize-Xheader.button, div#collab-space-id").hide();				
 			}

 		}
 		});
		</script>
         <%
    }
    catch(Exception e){
    	   throw new MatrixException(e);
    }
%>
     <script language="javascript" type="text/javaScript">
     parent.window.location.href = parent.window.location.href;
     </script>

<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%>