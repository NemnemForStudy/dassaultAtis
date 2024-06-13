<%@page import="com.dec.util.DecConstants"%>
<%@page import="com.dec.util.DecStringUtil"%>
<%@page import="com.matrixone.apps.domain.util.XSSUtil"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>
<%@page import="org.apache.commons.fileupload.*,java.util.*,java.io.*"%>
<%@page import="matrix.db.JPO"%>
<%@page import="matrix.db.Environment"%>
<%@page import="com.matrixone.apps.domain.*"%>
<%@page import="com.dec.util.DecExcelUtil"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@page import="java.util.List"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	String sError = null;
	StringBuilder sbReturn = new StringBuilder();
	try{
		String sFolderWIN 	= "c:\\temp\\";
		String sFolderUNIX 	= "/tmp/";
		String sLanguage 	= request.getHeader("Accept-Language");
		String sOSName 		= System.getProperty( "os.name" );
		String sFolder		= sOSName.contains("Windows") ? sFolderWIN : sFolderUNIX ;
		String separator 	= sOSName.contains("Windows") ? "\\" : "/";
		String sTmpDir		= Environment.getValue(context, "TMPDIR");
		String sMCSURL 		= request.getRequestURL().toString();
		
		String sOID				= com.matrixone.apps.domain.util.Request.getParameter(request,"objectId");
		String sImageRelType 	= com.matrixone.apps.domain.util.Request.getParameter(request,"relationship");
		String sImageType		= com.matrixone.apps.domain.util.Request.getParameter(request,"imageType");
		
		if(null != sTmpDir && !sTmpDir.trim().isEmpty())
		{
			sFolder = sTmpDir;
			if(!sFolder.substring(sFolder.length() - 1).equals(separator))
				sFolder = sFolder + separator;
		}
		// Save file on disk
		DiskFileUpload upload	= new DiskFileUpload();
		//List items 				= upload.parseRequest(request);  
		List files = upload.parseRequest(request);
		
		String sFilename = "";
		FileItem file = null;
		File outfile = null;
		Iterator iter = files.iterator();

		int index;
		Map mParam = new HashMap();
		mParam.put("language",sLanguage);
		mParam.put("objectId",sOID);
		mParam.put("folder",sFolder);
		mParam.put("files",files);		
		mParam.put("MCSURL",	sMCSURL.replace("/common/emxExtendedPageHeaderFileUploadImage.jsp", ""));
		mParam.put("relationship",sImageRelType);
		mParam.put("imageType",sImageType);
		
		JPO.invoke(context, "emxDnD", null, "checkInImage", JPO.packArgs(mParam), String.class);
		
	} catch (Exception e) {
		e.printStackTrace();
		sError = e.getMessage();
	}
	sbReturn.append("<script>");
	if(DecStringUtil.isNotEmpty(sError)){
		sbReturn.append("alert(").append(sError).append(");");
	}
	sbReturn.append("window.parent.opener.getTopWindow().location.href = window.parent.opener.getTopWindow().location.href;");
	sbReturn.append("window.parent.closeWindow(true);");
	sbReturn.append("</script>");
	
%><%=sbReturn.toString()%>
