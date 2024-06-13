<%@page import="org.hibernate.internal.build.AllowSysOut"%>
<%@page import="java.util.List"%>
<%@page import="matrix.db.Context"%>
<%@page import="org.apache.commons.fileupload.*,java.util.*,java.io.*"%>
<%@page import="matrix.db.Environment"%>
<%@page import="com.matrixone.apps.domain.*"%>
<%@page import="com.matrixone.servlet.Framework"%>

<%@include file = "../emxUIFramesetUtil.inc"%>
<%@include file = "emxCompCommonUtilAppInclude.inc"%>

<jsp:useBean id="domainObject" scope="page" class="com.matrixone.apps.domain.DomainObject"/>
<jsp:useBean id="indentedTableBean" class="com.matrixone.apps.framework.ui.UITableIndented" scope="session" />
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	// 1. parentOID 찾기
	String parentOID = request.getParameter("parentOID");
	String suiteKey = emxGetParameter(request, "suiteKey");
	String jsTreeID = emxGetParameter(request, "jsTreeID");
	
	framesetObject fs = new framesetObject();
	fs.setDirectory(appDirectory);
	
	String initSource = emxGetParameter(request, "initSource");
	if(initSource == null) {
		initSource = "";
	}
	
	StringBuffer contentURLBuf = new StringBuffer();
	// 2. append를 사용해서 jsp파일에 jsp?parnetOID= append ParentOID를 넣는다.
	contentURLBuf.append("poaFileSelect.jsp?parentOID=");
	contentURLBuf.append(parentOID);
	contentURLBuf.append("&jsTreeID=");
	contentURLBuf.append(jsTreeID);
	
	String contentURL = FrameworkUtil.encodeHref(request, contentURLBuf.toString());
	String pageHeader = "emxFramework.Common.RequestFileRegister";
	String helpMarker = "emxhelpcollectioncreate";
	
	fs.setStringResourceFile("emxFrameworkStringResource");
	
	String pageTitle = EnoviaResourceBundle.getFrameworkStringResourceProperty(context, pageHeader, new Locale(request.getHeader("Accept-Language")));
	fs.setPageTitle(pageTitle);
	
	fs.initFrameset(pageHeader,
					"", 
					contentURL,
					false,
					true,
					false,
					false);

	String testList = "testList";
	fs.createFooterLink("emxFramework.Common.CompleteButton",
						"doneMethod()",
						testList,
						false,
						true,
						"common/images/buttonDialogDone.gif",
						0);
	fs.createFooterLink("emxFramework.Common.closeButton",
						"cancelMethod()", 
						testList, 
						false, 
						true, 
						"common/images/buttonDialogCancel.gif",
						0);
	fs.writePage(out);
%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Why So Serious</title>
</body>
</html>