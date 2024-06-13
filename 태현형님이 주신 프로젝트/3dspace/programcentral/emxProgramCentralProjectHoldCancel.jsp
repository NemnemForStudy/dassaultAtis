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

<%@ include file="emxProgramGlobals2.inc" %>
<%@ include file="../emxUICommonAppInclude.inc"%>
<%
	//out.write("<script language=\"javascript\">var response = confirm(\"Do U Want to Proceed?\") </script>");
    
    String languageStr = request.getHeader("Accept-Language");
    String strInvokedFrom   = emxGetParameter(request,"invokedFrom");
	String[] emxTableRowId = emxGetParameterValues(request, "emxTableRowId");
	emxTableRowId = ProgramCentralUtil.parseTableRowId(context, emxTableRowId);
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
	
	MapList selectedObjectInfoList = DomainObject.getInfo(context, emxTableRowId, selectable);
	
	MapList invalideOperationObjectList = new MapList();
	Iterator selectedObjectInfoListIterator = selectedObjectInfoList.iterator();
	while(selectedObjectInfoListIterator.hasNext())
	{
		Map objectInfo = (Map)selectedObjectInfoListIterator.next();
		String objectState = (String)objectInfo.get(ProgramCentralConstants.SELECT_CURRENT);
		
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
    }
    catch(Exception e){
    	   throw new MatrixException(e);
    }
%>
     <script language="javascript" type="text/javaScript">
     parent.window.location.href = parent.window.location.href;
     </script>

<%@page import="com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.domain.util.EnoviaResourceBundle"%><html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Insert title here</title>
<script language="javascript" type="text/html">
</script>
</head>
<body>
</body>
</html>
