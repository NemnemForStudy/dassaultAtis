<%-- emxProgramCentralProjectExportProcess.jsp

  Performs the action that exports a project to the client.

  Copyright (c) 1992-2020 Dassault Systemes.

  All Rights Reserved.
  This program contains proprietary and trade secret information
  of MatrixOne, Inc.  Copyright notice is precautionary only and
  does not evidence any actual or intended publication of such program

  static const char RCSID[] = "$Id: emxProgramCentralProjectExportProcess.jsp.rca 1.27 Wed Oct 22 15:50:35 2008 przemek Experimental przemek $";


<%@include file = "emxProgramGlobals2.inc"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file = "../emxUICommonHeaderBeginInclude.inc"%>

<%@page import = "com.matrixone.apps.program.Task" %>

<head>
<script type="text/javascript" src="../common/scripts/emxUIConstants.js"></script>
<script type="text/javascript" language="JavaScript">
    addStyleSheet("emxUIDialog");
</script>
</head>
--%>
<%@page import="com.matrixone.apps.domain.util.EnoviaBrowserUtility.Browsers"%>
<%@include file = "emxProgramGlobals2.inc"%>
<%@include file = "../emxRequestWrapperMethods.inc"%>

<%
//create context variable for use in pages
matrix.db.Context context = Framework.getFrameContext(session);
%>

<%
  // Gets the parameters from the request.
  String objectId = (String) emxGetParameter(request, "objectId");
  String exportFormat = (String) emxGetParameter(request, "exportFormat");
  String exportSubProject = (String) emxGetParameter(request, "exportSubProject");
  DomainObject selectedProject = new DomainObject(objectId);
  StringList selectable = new StringList();
  selectable.add(ProgramCentralConstants.SELECT_NAME);
  selectable.add(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
  String language = request.getHeader("Accept-Language");
  
  Map selectedProjectInfo = selectedProject.getInfo(context, selectable);
  String fileName = (String)selectedProjectInfo.get(ProgramCentralConstants.SELECT_NAME);
  String isProjectSpace = (String)selectedProjectInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
  
  if(!"True".equalsIgnoreCase(isProjectSpace)){
  String errorMessage = ProgramCentralUtil.getPMCI18nString(context,"emxProgramCentral.Project.SelectProject",language);
%>
<script language="javascript" type="text/javaScript">
alert("<%=XSSUtil.encodeForJavaScript(context,errorMessage)%>");
</script>
<%
return;
	}
  String extension = ".txt";
  boolean isEdge = EnoviaBrowserUtility.is(request,Browsers.EDGE);
  boolean isMoz = EnoviaBrowserUtility.is(request,Browsers.MOZILLAFAMILY);
  if(("CSV".equalsIgnoreCase(exportFormat) || "HTML".equalsIgnoreCase(exportFormat))){
    extension = ".csv";
  }

  try {
		Map paramMap = new HashMap();
		paramMap.put("objectId", objectId);
		paramMap.put("exportFormat", exportFormat);
		paramMap.put("language", language);
		
		if("True".equalsIgnoreCase(exportSubProject)){
			paramMap.put("exportSubProject", exportSubProject);
		}
	
		StringList projectTasks  = JPO.invoke(context, "emxProjectSpace", null, "exportProjectTaskList", JPO.packArgs(paramMap),StringList.class);
					
	 	String fileEncodeType = request.getCharacterEncoding();
	  	if ("".equals(fileEncodeType) || fileEncodeType == null || fileEncodeType == "null"){
			fileEncodeType=UINavigatorUtil.getFileEncoding(context, request);
	  	}
		fileName = (fileName == null || "null".equalsIgnoreCase(fileName))?"":fileName;
		String saveAsFileName = fileName;
		fileName += extension;
		String saveAs = ServletUtil.encodeURL(fileName);
		String tempFileName = fileName;
		if(!isMoz || isEdge) {
			fileName=FrameworkUtil.encodeURL(tempFileName,"UTF-8");
		} else {
			fileName = "=?UTF-8?B?" + new String(FrameworkUtil.encodeBase64(tempFileName.getBytes("UTF-8"),false), "UTF-8") + "?=";
		}
		
		out.clear();
		response.setContentType ("text/plain;charset="+fileEncodeType);
		response.setHeader ("Content-Disposition", "attachment;filename=" + fileName);
		
		Iterator taskItr = projectTasks.iterator();
		while (taskItr.hasNext()) {
		   String thisLine = (String) taskItr.next();
		   out.println(thisLine);
		}
  } catch(Exception ex) {
	  ex.printStackTrace();
  }
 %>

